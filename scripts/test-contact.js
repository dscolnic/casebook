/* The contact form's decisions — server/contact.js.
 *
 * Everything asserted here is a pure function, so it runs with no server, no
 * database and no SMTP credentials. What the file is really for is the shape of
 * failure this route has: a message that is accepted and goes nowhere looks
 * exactly like one that was never sent. Nobody complains, because the person who
 * wrote it believes it arrived.
 *
 * So the cases below are the ones where a wrong decision is invisible:
 *   - a rejected message the sender is told nothing about
 *   - a honeypot that answers 400, which teaches a bot to try another shape
 *   - a required email address, which silently costs us every report from
 *     somebody who did not want to give one
 *   - a rate limit counted against the proxy, which refuses the whole internet
 *     after eight messages and looks fine in testing, because you are the ninth
 *
 *   node scripts/test-contact.js
 */
const { validate, overLimit, compose, clientIp, TOPICS } = require('../server/contact');

let pass = 0;
const fails = [];
const ok = (label, cond) => { if (cond) pass++; else fails.push(label); };

// ---------------------------------------------------------------------------
// 1. What is accepted.

{
  const { value, error, drop } = validate({
    topic: 'question', message: 'Day 9 of Blackout asks for a turns ratio it never gives.',
    name: 'Ines', email: 'ines@example.com', course: 'Blackout, day 9',
  });
  ok('a complete message is accepted', !error && !drop && !!value);
  ok('the topic is kept', value?.topic === 'question');
  ok('the course is kept', value?.course === 'Blackout, day 9');
}

// The one that matters most. A report of a wrong question from somebody who
// will not give an address is still worth having, and a required field is a
// reason not to bother.
{
  const { value, error } = validate({ topic: 'question', message: 'The third option is also right.' });
  ok('a message with no name and no email is accepted',
     !error && value?.email === '' && value?.name === '');
}

// An unknown topic is not a refusal — the four values are this app's own, and a
// stale cached page posting a fifth must not lose the message.
{
  const { value, error } = validate({ topic: 'wildlife', message: 'Have you thought about ecology?' });
  ok('an unknown topic falls back rather than refusing', !error && value?.topic === 'other');
  ok('a missing topic falls back too',
     validate({ message: 'Have you thought about ecology?' }).value?.topic === 'other');
}

ok('every topic the form offers is a topic the server knows',
   ['request', 'question', 'teaching', 'other'].every(t => TOPICS.has(t)));

// ---------------------------------------------------------------------------
// 2. What is refused, and it has to SAY it was refused.

for (const [label, body] of [
  ['an empty message', { message: '' }],
  ['a message of two words', { message: 'it broke' }],
  ['no body at all', null],
  ['a message that is not a string', { message: { text: 'hello' } }],
]) {
  const out = validate(body);
  ok(`${label} is refused with something to read`, !!out.error && !out.value);
}

{
  const out = validate({ message: 'The lift on floor 47 will not open.', email: 'not an address' });
  ok('a mistyped address is refused', !!out.error);
  ok('and the refusal says the field can be left blank', /blank/i.test(out.error));
}

// Loose on purpose: every strict address rule rejects somebody's real address,
// and the only cost of a wrong one is a reply that does not arrive.
for (const addr of ['a+tag@example.co.uk', "o'brien@example.org", 'a@b.io', 'ünïcode@example.com']) {
  ok(`accepts the real address ${addr}`,
     !validate({ message: 'A perfectly ordinary message.', email: addr }).error);
}

// ---------------------------------------------------------------------------
// 3. The honeypot is dropped, not refused.
//
// A 400 tells a bot to try a different shape and it will. The submission has to
// be indistinguishable from a delivered one from the outside, which means no
// error, no stored value, and — asserted in the route, not here — a 200.

{
  const out = validate({ message: 'Buy this thing.', contact_ref: 'http://spam.example' });
  ok('a filled honeypot is dropped', out.drop === true);
  ok('and it is not reported as an error', !out.error);
  ok('and nothing is stored', !out.value);
}
ok('an empty honeypot is not a drop',
   !validate({ message: 'A perfectly ordinary message.', contact_ref: '' }).drop);
ok('a whitespace-only honeypot is not a drop — a browser can autofill one',
   !validate({ message: 'A perfectly ordinary message.', contact_ref: '   ' }).drop);
// The bug that cost an afternoon, kept as a case. The field was called
// "website", which Chrome's autofill and every password manager fill in — so a
// real person's message was dropped as spam behind a Sent card, and from the
// outside that is indistinguishable from a route that does not exist. A page
// cached on somebody's device still posts that field, still autofilled, so it
// must NOT be a trap any more.
ok('a filled "website" field is not a trap — an autofilled cached page still posts it',
   !validate({ message: 'A perfectly ordinary message.', website: 'http://example.com' }).drop);
ok('and that message is stored rather than dropped',
   !!validate({ message: 'A perfectly ordinary message.', website: 'http://example.com' }).value);

// ---------------------------------------------------------------------------
// 4. Caps. A field longer than its column is a 500 from Postgres, which the
//    sender reads as "your message failed" for a message that was fine.

{
  const { value } = validate({
    message: 'x'.repeat(9000), name: 'y'.repeat(500),
    email: 'ines@example.com', course: 'c'.repeat(400),
  });
  ok('the message is capped', value?.message.length <= 4000);
  ok('the name is capped', value?.name.length <= 120);
  ok('the course is capped', value?.course.length <= 80);
}
// An address longer than its column is truncated first and then fails the format
// test, so it is refused rather than stored short — which is right: half an
// address is not an address, and storing one produces a reply that bounces.
{
  const out = validate({ message: 'A perfectly ordinary message.', email: 'z'.repeat(400) + '@example.com' });
  ok('an absurd address is refused, not truncated into the database',
     !!out.error && !out.value);
}

// ---------------------------------------------------------------------------
// 5. The rate limit, and the trap under it.

{
  const ip = '203.0.113.9';
  const t0 = 1_700_000_000_000;
  let refused = 0;
  for (let i = 0; i < 12; i++) if (overLimit(ip, t0 + i * 1000)) refused++;
  ok('a burst is cut off', refused > 0);
  ok('but the first few get through', refused < 12);
  ok('an hour later the same address is allowed again',
     overLimit(ip, t0 + 61 * 60 * 1000) === false);
}
{
  // Two different senders must not share a bucket.
  const t0 = 1_700_000_100_000;
  for (let i = 0; i < 10; i++) overLimit('198.51.100.1', t0 + i);
  ok('a second address is unaffected', overLimit('198.51.100.2', t0 + 20) === false);
}

// THE TRAP. Counting against req.ip on a hosted app counts against the
// platform's proxy: every visitor in the world shares one bucket and the ninth
// message from anybody is refused. It passes every test above, and it works
// perfectly in development, where there is no proxy in front of you.
{
  const req = {
    ip: '10.0.0.7',                                  // the proxy
    get: (h) => (h.toLowerCase() === 'x-forwarded-for' ? '203.0.113.44, 10.0.0.7' : ''),
    socket: { remoteAddress: '10.0.0.7' },
  };
  ok('the client is read from the forwarded chain, not the socket',
     clientIp(req) === '203.0.113.44');
  const bare = { ip: '203.0.113.55', get: () => '', socket: { remoteAddress: '203.0.113.55' } };
  ok('with no proxy in front, the socket is the client', clientIp(bare) === '203.0.113.55');
  const nothing = { get: () => '', socket: {} };
  ok('and a request with neither does not crash', typeof clientIp(nothing) === 'string');
}

// ---------------------------------------------------------------------------
// 6. What lands in the inbox. The subject has to say which of the four this is,
//    and the body has to say whether a reply is possible at all — an answered
//    message and an unanswerable one must not look the same in a list.

{
  const { value } = validate({ topic: 'request', message: 'A course on genetics, please.', name: 'Ruth' });
  const { subject, text } = compose(value || {}, { userId: 'user_123' });
  ok('the subject names the topic', subject.includes(TOPICS.get('request')));
  ok('the subject names the sender', subject.includes('Ruth'));
  ok('the body says there is no address to reply to', /not given/.test(text));
  ok('the body carries the signed-in account', text.includes('user_123'));
  ok('the body carries the message itself', text.includes('A course on genetics, please.'));
}
{
  const { value } = validate({ topic: 'other', message: 'Just saying hello.' });
  const { subject } = compose(value || {}, {});
  ok('a message with no name still has a subject', subject.length > 0 && !subject.endsWith('— '));
}

// ---------------------------------------------------------------------------
console.log(`${pass} passed, ${fails.length} failed`);
if (fails.length) {
  for (const f of fails) console.error('  FAIL ' + f);
  process.exit(1);
}

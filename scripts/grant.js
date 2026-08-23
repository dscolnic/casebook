#!/usr/bin/env node
/* Give somebody access by hand, and take it away.
 *
 * The manual half of server/entitlement.js, and it is not a stopgap: a comp for
 * a teacher trialling the thing, a school on a purchase order, a beta tester,
 * yourself on the production database — none of those arrive through Stripe or
 * Apple, and all of them are ordinary. `source` says which, and a row written
 * here is the same shape as a row written by a webhook, so nothing downstream
 * has to know the difference.
 *
 *   node scripts/grant.js list
 *   node scripts/grant.js list user_2abc...
 *   node scripts/grant.js who dan@example.com          # email -> user id
 *   node scripts/grant.js grant user_2abc... --days 90
 *   node scripts/grant.js grant user_2abc... --forever --source school --plan "Rye High"
 *   node scripts/grant.js revoke user_2abc... --source manual
 *
 * --days and --forever are the same decision stated two ways, and one of them
 * has to be given: a grant with no end that was meant to run a term is the kind
 * of mistake nobody finds, because everything keeps working.
 */
const { pool } = require('../server/db');
const { grant, entitlementsFor, isEntitled } = require('../server/entitlement');

const argv = process.argv.slice(2);
const cmd = argv[0];
const positional = argv.slice(1).filter((a) => !a.startsWith('--'));
const flag = (name, fallback = null) => {
  const i = argv.indexOf('--' + name);
  if (i === -1) return fallback;
  const v = argv[i + 1];
  return v && !v.startsWith('--') ? v : true;
};

function usage(msg) {
  if (msg) console.error('\n  ' + msg + '\n');
  console.error(`  node scripts/grant.js list [userId]
  node scripts/grant.js who <email>
  node scripts/grant.js grant <userId> (--days N | --forever) [--source manual] [--plan NAME] [--status active]
  node scripts/grant.js revoke <userId> [--source manual]
`);
  process.exit(msg ? 1 : 0);
}

async function main() {
  if (!cmd || cmd === 'help' || cmd === '--help') usage();

  if (cmd === 'who') {
    const email = positional[0];
    if (!email) usage('An email address, please.');
    const { rows } = await pool.query(
      'SELECT id, email, first_name, last_name FROM users WHERE lower(email) = lower($1)', [email]);
    if (!rows.length) return console.log('Nobody with that address has signed in.');
    console.table(rows);
    return;
  }

  if (cmd === 'list') {
    const userId = positional[0];
    const { rows } = userId
      ? await pool.query(
          `SELECT e.*, u.email FROM entitlements e LEFT JOIN users u ON u.id = e.user_id
            WHERE e.user_id = $1`, [userId])
      : await pool.query(
          `SELECT e.user_id, u.email, e.source, e.status, e.plan, e.current_period_end
             FROM entitlements e LEFT JOIN users u ON u.id = e.user_id
            ORDER BY e.updated_at DESC LIMIT 100`);
    if (!rows.length) return console.log('No entitlements.');
    console.table(rows.map((r) => ({
      user: r.email || r.user_id, source: r.source, status: r.status,
      plan: r.plan, ends: r.current_period_end || 'never',
      // The point of printing this: a row can look perfectly healthy and not
      // entitle anybody, because the status is not one the app treats as live.
      live: isEntitled([r]).entitled ? 'yes' : 'NO',
    })));
    return;
  }

  if (cmd === 'grant') {
    const userId = positional[0];
    if (!userId) usage('Which user? `who <email>` turns an address into an id.');
    const days = flag('days');
    const forever = !!flag('forever');
    if (!days && !forever) usage('Say how long: --days 90, or --forever.');
    if (days && forever) usage('--days and --forever are the same decision. Pick one.');

    let end = null;
    if (!forever) {
      const n = Number(days);
      if (!Number.isFinite(n) || n <= 0) usage('--days wants a positive number.');
      end = new Date(Date.now() + n * 24 * 60 * 60 * 1000).toISOString();
    }
    // The account has to exist: the row has a foreign key onto it, and the
    // error Postgres gives for a typo'd id is not one anybody reads as a typo.
    const { rows: u } = await pool.query('SELECT id, email FROM users WHERE id = $1', [userId]);
    if (!u.length) usage(`No account with id ${userId}. They have to have signed in at least once.`);

    const out = await grant(userId, {
      source: String(flag('source', 'manual')),
      status: String(flag('status', 'active')),
      plan: flag('plan') === true ? null : flag('plan'),
      currentPeriodEnd: end,
    });
    console.log(`Granted to ${u[0].email || userId}:`);
    console.table([{ ...out, current_period_end: out.current_period_end || 'never' }]);
    return;
  }

  if (cmd === 'revoke') {
    const userId = positional[0];
    if (!userId) usage('Which user?');
    const source = String(flag('source', 'manual'));
    const { rowCount } = await pool.query(
      'DELETE FROM entitlements WHERE user_id = $1 AND source = $2', [userId, source]);
    // Said out loud, because deleting the row and deleting the campaign are
    // exactly the confusion terms.html promises does not happen.
    console.log(rowCount
      ? `Revoked the ${source} entitlement. Their saves, results and account are untouched.`
      : `No ${source} entitlement on that account — nothing to revoke.`);
    const left = await entitlementsFor(userId);
    if (left.length) console.log('Still holds:', left.map((r) => r.source).join(', '));
    return;
  }

  usage(`Unknown command "${cmd}".`);
}

main()
  .then(() => pool.end())
  .catch((err) => { console.error(err.message); pool.end(); process.exit(1); });

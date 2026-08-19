// Diagnosis data pack — Equity market operations.
// Difficulty is DERIVED from the signatures (salient = the loud readings).
//   R1 realnews    = L1 naked single (opening gap is unique)
//   R2 manipulation= L2 one clear line (price drop + thin book — needs both loud readings)
//   R3 glitch      = L3 loud gauges tie (glitch vs genuine broad move share the loud pair)
module.exports = { PACK: {
  id:'market', title:'Market Signal', domain:'Equity market surveillance',
  role:'You are the market-surveillance analyst on duty.',

  system:{
    parts:[
      ['Company and news flow','Earnings, guidance, legal rulings, and other public information can cause investors across the market to reprice a stock at once.'],
      ['Order book','Each venue displays bids and offers. Thin depth means few shares stand between the current price and a larger move.'],
      ['Individual exchanges','The same stock trades on several venues. A problem on one venue can print a strange price without moving the rest of the market.'],
      ['Consolidated tape','A market-wide feed combines eligible trades and quotes from the exchanges, letting surveillance compare one venue with the broader market.'],
      ['Related securities','Sector ETFs and peer companies provide an independent check on whether a move is company-specific, industry-wide, or merely a bad data point.']
    ],
    soWrong:'So a plunging price is not itself a diagnosis. The move may be real information, abusive trading, a bad feed, or an ordinary market-wide selloff. The full panel shows which story reaches beyond the loudest screen.'
  },

  // Loud readings: the local price action and visible liquidity.
  salient:['venuepx','depth'],

  readings:{
    venuepx:{ name:'Monitored-venue price', pin:{x:245,y:190}, zone:'venue',
      purpose:'The latest price pattern on the venue under watch. A news shock can produce an opening gap; manipulation, a real selloff, or a bad feed can all produce a sharp intraday drop.' },
    depth:{ name:'Displayed order-book depth', pin:{x:220,y:260}, zone:'venue',
      purpose:'Shares quoted near the best bid and offer. Around 45,000 shares within 20 cents is typical here; a much thinner book lets modest orders move price farther.' },
    tape:{ name:'Consolidated last sale', pin:{x:410,y:178}, zone:'market-wide',
      purpose:'The market-wide consolidated price. If it confirms the venue move, the move is broadly real; if it stays near the old price, the anomaly is confined to one venue or feed.' },
    peers:{ name:'Sector and peer move', pin:{x:420,y:275}, zone:'market-wide',
      purpose:'The average move in close peers and the sector ETF. A broad risk-off event moves them too; company-specific news or a venue glitch usually does not.' },
    news:{ name:'Verified newswire', pin:{x:88,y:112}, zone:'information',
      purpose:'Timestamped public company news. A confirmed earnings miss or legal ruling can explain a sudden repricing across venues; silence weakens that explanation.' },
    cancels:{ name:'Cancel-to-trade ratio', pin:{x:125,y:285}, zone:'orders',
      purpose:'How many displayed orders are canceled for each executed trade. This stock usually runs near 8:1; a sudden extreme ratio can reveal fleeting orders used to create a false impression of supply or demand.' },
    crossvenue:{ name:'Cross-venue price spread', pin:{x:330,y:110}, zone:'market-wide',
      purpose:'Difference between the monitored venue and other exchanges. Normally only a few cents; a large persistent split points to a local venue or data problem.' },
    volume:{ name:'Consolidated trading volume', pin:{x:330,y:330}, zone:'market-wide',
      purpose:'Shares traded across all venues. Real news and genuine selloffs usually lift total volume; a local feed problem may show dramatic prints without broad participation.' }
  },

  hypotheses:{
    realnews:{ label:'Real company news',
      call:{ title:'Real news shock — treat the repricing as genuine.', arg:'Verified public information is moving the stock across venues. Escalate for news-event monitoring, not market-abuse intervention.' },
      sig:{ venuepx:'gap', depth:'thin', tape:'confirm', peers:'normal', news:'confirmed', cancels:'normal', crossvenue:'tight', volume:'high' } },
    manipulation:{ label:'Layering / spoofing',
      call:{ title:'Potential manipulation — preserve and escalate the order record.', arg:'Fleeting displayed orders are thinning and distorting the book while real trades push price. Refer the pattern for market-abuse review.' },
      sig:{ venuepx:'drop', depth:'thin', tape:'confirm', peers:'normal', news:'none', cancels:'extreme', crossvenue:'tight', volume:'moderate' } },
    glitch:{ label:'Venue data glitch',
      call:{ title:'Data glitch — isolate the bad venue feed.', arg:'The dramatic move exists on one feed but not in the consolidated market. Flag the data source and prevent the bad print from driving decisions.' },
      sig:{ venuepx:'drop', depth:'normal', tape:'steady', peers:'normal', news:'none', cancels:'normal', crossvenue:'wide', volume:'normal' } },
    broadmove:{ label:'Genuine broad selloff',
      call:{ title:'Genuine broad selloff — no market-plumbing fault.', arg:'The stock is falling with its peers across venues. Continue monitoring; the market is stressed, but the feed and venue are functioning.' },
      sig:{ venuepx:'drop', depth:'normal', tape:'confirm', peers:'down', news:'none', cancels:'normal', crossvenue:'tight', volume:'high' } }
  },
  dismissal:'broadmove',
  reassuring:{ lab:'Exchange status', val:'OPEN — no halt in effect',
    note:'Continuous trading only means the venue has not halted the stock. It does not prove the price is genuine or the trading behavior is clean.' },

  rounds:[
    { answer:'realnews', alarm:'venuepx',
      poleA:{ lab:'Stock price', val:'Opened 18% lower', note:'The first eligible trades printed far below the prior close and the book immediately thinned.' },
      hook:'At the opening bell, Halcyon Systems prints nearly one-fifth below yesterday’s close. The exchange is open and functioning, but every terminal is flashing red.',
      riddle:'The venue is operating normally — <span class="q">so what made investors reprice the company before ordinary trading even began?</span>',
      vals:{ venuepx:'$41.10 open, down 18% from $50.12 close', depth:'6,800 shares within 20 cents', tape:'$41.14 consolidated, confirms gap', peers:'sector ETF -0.4%; peers -0.7% average', news:'06:58 ET: verified earnings miss and guidance cut', cancels:'9:1', crossvenue:'4-cent maximum spread', volume:'12.4 million shares in first 10 minutes' },
      reasons:{
        manipulation:'Spoofing can thin the book and help drive an intraday drop, but it does not explain an 18% opening gap simultaneously confirmed across venues immediately after a verified guidance cut. The cancel ratio is also ordinary at 9:1.',
        glitch:'A venue glitch would split the local print from the consolidated tape. Instead, the tape confirms $41.14 and the cross-venue spread is only four cents.',
        broadmove:'A broad selloff would pull peers and the sector down with it. They are nearly flat while this company alone gaps 18% after company-specific news.' },
      resolve:{ title:'Real company news — the market repriced verified information.',
        paras:[
          'A verified earnings miss and guidance cut arrived before the open. The stock then gapped down across venues, consolidated volume surged, and peers remained nearly unchanged. That is a genuine company-specific repricing, not a local feed problem or market-wide panic.',
          'This is a naked single. The opening gap signature is unique among the four causes: the other candidates create an intraday drop, but only a pre-open information shock produces this immediate discontinuity at the bell.' ],
        why:{ loud:'<b>Why one loud reading was enough</b>: an 18% opening gap is the unique loud signature of the news shock in this differential.',
              quiet:'<b>Why the open exchange status misleads</b>: a venue can function perfectly while investors rationally move the price because the company’s prospects changed.' },
        chain:['Verified guidance cut reaches all investors','Orders reprice before the opening auction','Stock gaps lower across venues on heavy volume'],
        take:'A unique price pattern can identify the mechanism: an opening gap points to information arriving before continuous trading.' } },

    { answer:'manipulation', alarm:'depth',
      poleA:{ lab:'Order book', val:'Liquidity repeatedly vanishing', note:'Large sell orders appear above the market, then disappear as the price moves down.' },
      hook:'Midmorning, the stock slides six percent without news. The visible book looks heavy with sellers, yet most of those shares vanish before anyone can trade against them.',
      riddle:'The price is really falling — <span class="q">but are investors selling, or is someone manufacturing the appearance of overwhelming supply?</span>',
      vals:{ venuepx:'$46.80, down 6.1% in 14 minutes', depth:'5,200 shares within 20 cents', tape:'$46.84 consolidated, confirms decline', peers:'sector ETF +0.1%; peers -0.2% average', news:'no verified company announcement', cancels:'214:1 during the decline', crossvenue:'6-cent maximum spread', volume:'1.8 million shares in 14 minutes' },
      reasons:{
        realnews:'Real news can thin liquidity and move price across venues, but there is no verified announcement and there is no opening gap. The extreme 214:1 cancel ratio points to order behavior, not new information.',
        glitch:'A bad local feed would disagree with the consolidated market and create a wide cross-venue split. Here the tape confirms the decline and venues remain within six cents.',
        broadmove:'A genuine broad selloff would usually pull the sector and peers down as well. They are essentially flat while this stock falls and displayed sell orders are canceled at 214 for every trade.' },
      resolve:{ title:'Layering / spoofing — displayed supply is being used as a decoy.',
        paras:[
          'The stock is genuinely trading lower across venues, but the surrounding evidence is not a broad selloff or news response. Liquidity is thin, peers are flat, no news exists, and the cancel-to-trade ratio explodes to 214:1 as large sell orders repeatedly appear and vanish. Preserve the order-level record and escalate the pattern for abuse review.',
          'This takes one clear line formed by both loud readings. A falling price is shared with the glitch and broad selloff; a thin book is shared with the news shock. Only the pair — intraday drop plus thin displayed depth — identifies manipulation before the quiet cancel data confirms it.' ],
        why:{ loud:'<b>Why the loud readings must be combined</b>: neither the drop nor the thin book is unique alone, but their pair leaves only the manipulation hypothesis.',
              quiet:'<b>Why the order record seals it</b>: a 214:1 cancel-to-trade ratio shows that the apparent selling pressure is mostly fleeting display rather than executed supply.' },
        chain:['Large sell orders create apparent supply','Orders are canceled before execution while smaller trades push price down','False pressure distorts the book and triggers surveillance concern'],
        take:'When price and liquidity point toward abuse, test whether displayed intent becomes executed trading or disappears.' } },

    { answer:'glitch', alarm:'venuepx',
      poleA:{ lab:'Stock price', val:'One venue shows a 22% crash', note:'The local feed plunges from $49 to $38 even though the visible book still appears ordinarily populated.' },
      hook:'During an otherwise quiet afternoon, one exchange feed suddenly prints a cascade of trades near $38. The stock had been stable near $49 seconds earlier.',
      riddle:'The loud screen shows a crash with normal-looking depth — <span class="q">did the market truly fall, or did only one venue’s version of the market fall?</span>',
      vals:{ venuepx:'$38.20, down 22% on monitored venue', depth:'47,000 shares within 20 cents', tape:'$48.96 consolidated, essentially steady', peers:'sector ETF +0.2%; peers +0.1% average', news:'no verified company announcement', cancels:'8:1', crossvenue:'$10.78 spread versus other exchanges', volume:'normal pace; no market-wide surge' },
      reasons:{
        broadmove:'A genuine broad selloff shares the loud pattern: a sharp price drop with an otherwise normally populated book. But a real move would appear on the consolidated tape and in related securities. The tape is steady at $48.96 and other venues are nearly eleven dollars higher.',
        realnews:'A news shock would be confirmed across venues, usually on heavy volume, and would have a verified catalyst. Here there is no news, no consolidated move, and no volume surge.',
        manipulation:'Manipulation in this differential requires a thin book and extreme cancellation behavior while actual trades move the consolidated price. Depth is normal at 47,000 shares, cancels are 8:1, and the consolidated market has not fallen.' },
      resolve:{ title:'Venue data glitch — the crash is local to one feed.',
        paras:[
          'The monitored venue shows $38.20, but the consolidated tape remains at $48.96, other exchanges are nearly eleven dollars higher, peers are steady, and total volume has not surged. The company and the broader market did not lose 22% in seconds; one venue or its data path produced bad prints or bad dissemination.',
          'This is where the loud gauges tie. A venue glitch and a genuine broad selloff both show a sharp local price decline with normal displayed depth, so the headline screen cannot decide. The deeper question is geographic: how far did the move travel? It never escaped one venue.' ],
        why:{ loud:'<b>Why the loud gauges cannot decide</b>: both a real crash and a bad venue feed can show a plunging local price while the local book still looks normally populated.',
              quiet:'<b>Why this is a data artifact</b>: the consolidated tape, peer securities, market-wide volume, and other venues remain near their prior levels.' },
        chain:['One venue or feed publishes erroneous low prices','The local screen displays a crash that other markets do not share','Cross-venue and consolidated checks expose the isolated artifact'],
        take:'When a price shock appears, ask how widely it propagated: a real market move travels across venues; a glitch stays local.' } }
  ],

  schematic:{ viewBox:'0 0 520 390', svg:`
  <text x="82" y="28" class="eqlbl" text-anchor="middle" style="fill:#5a7f96">INFORMATION</text>
  <text x="235" y="28" class="eqlbl" text-anchor="middle" style="fill:#5a7f96">VENUE</text>
  <text x="410" y="28" class="eqlbl" text-anchor="middle" style="fill:#5a7f96">MARKET-WIDE</text>
  <rect x="42" y="62" width="100" height="90" rx="14" fill="rgba(112,201,242,.06)" stroke="#385b70" stroke-width="1.5"/>
  <text x="92" y="88" class="lbl" text-anchor="middle">company</text>
  <path d="M66,104 H118 M66,120 H110 M66,136 H102" stroke="#efca72" stroke-width="3"/>
  <rect x="165" y="70" width="145" height="245" rx="18" fill="rgba(112,201,242,.06)" stroke="#385b70" stroke-width="1.5"/>
  <text x="237" y="96" class="lbl" text-anchor="middle">exchange order book</text>
  <path d="M190,128 H235 M190,148 H260 M190,168 H220" stroke="#70c9f2" stroke-width="5"/>
  <path d="M285,128 H245 M285,148 H255 M285,168 H230" stroke="#efca72" stroke-width="5"/>
  <path d="M225,190 L242,172 L258,205 L275,184 L292,238 L300,238" fill="none" stroke="#efca72" stroke-width="3"/>
  <text x="238" y="292" class="lbl" text-anchor="middle">orders → trades</text>
  <rect x="356" y="68" width="124" height="250" rx="18" fill="rgba(112,201,242,.06)" stroke="#385b70" stroke-width="1.5"/>
  <circle cx="410" cy="178" r="42" fill="#173e59" stroke="#70c9f2" stroke-width="2"/>
  <text x="410" y="174" class="lbl" text-anchor="middle">consolidated</text>
  <text x="410" y="190" class="lbl" text-anchor="middle">tape</text>
  <rect x="375" y="248" width="70" height="42" rx="8" fill="#173e59" stroke="#efca72" stroke-width="1.5"/>
  <text x="410" y="274" class="lbl" text-anchor="middle">peers / ETF</text>
  <path d="M142,108 H165" stroke="#70c9f2" stroke-width="3" stroke-dasharray="5 4"/>
  <path d="M310,176 H368" stroke="#70c9f2" stroke-width="3" stroke-dasharray="5 4"/>
  <path d="M310,262 H375" stroke="#70c9f2" stroke-width="3" stroke-dasharray="5 4"/>
  <text x="118" y="330" class="lbl" text-anchor="middle">order behavior</text>
  <path d="M125,285 Q145,285 165,265" fill="none" stroke="#efca72" stroke-width="2"/>
  <path d="M330,110 Q350,110 370,130" fill="none" stroke="#efca72" stroke-width="2"/>
  <path d="M330,330 Q360,330 386,304" fill="none" stroke="#efca72" stroke-width="2"/>` }
}};

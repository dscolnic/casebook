// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"f_crypto", title:"The Cipher at Meridian Bank", discipline:"Cryptography & Information Security",
  teaser:"Millions drained from accounts thought mathematically safe. An unbreakable-code genius? Sheer computing brute force? Or a cipher they were warned to retire?", overclaimTag:"an unbreakable-code genius", truthTag:"a deprecated cipher kept in service",
  venue:"the Meridian Bank cipher inquiry", agent:{name:"Investigator Sol Marchetti", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Cryptography Pioneers",
  dossierName:"CRYPTOGRAPHY PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Meridian Bank cipher inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (an unbreakable-code genius) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"architect", items:[
      {id:"codebreaker", label:"A world-class codebreaking crew"},
      {id:"architect", label:"Lena Marsh — the bank's crypto architect"},
      {id:"auditor", label:"The security auditor"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"vault", label:"The Transaction & Key Vault"},
      {id:"cryptolab", label:"The Cryptography Lab"},
      {id:"office", label:"The Security Architect's Office"} ]},
    what:{ title:"What is happening", truth:"weakcipher", items:[
      {id:"genius", label:"A genius broke unbreakable encryption"},
      {id:"bruteforce", label:"Unstoppable brute-force computing — bad luck of the draw"},
      {id:"weakcipher", label:"A home-rolled, deprecated cipher kept in use against advice"} ]}
  },
  PLACES:{
    vault:{name:"The Transaction & Key Vault", xy:[140,90]},
    cryptolab:{name:"The Cryptography Lab", xy:[330,240]},
    office:{name:"The Security Architect's Office", xy:[520,90]}
  },
  EDGES:[["vault","cryptolab"],["cryptolab","office"]],
  CHARACTERS:{
    cryptographer:{ name:"The Cryptographer", role:"Staff cryptographer", face:"🔐", badge:"Y", legend:"the crypto lab", hint:"Flagged the aging cipher years ago; the replace-it memo was shelved." },
    keykeeper:{ name:"The Key Custodian", role:"Key-management officer", face:"🗝", badge:"K", legend:"the vault", hint:"Handles the keys; the same short key had been reused far past its life." },
    clerk:{ name:"The Clerk", role:"Records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the audit trail — and the risk waiver that kept the old cipher running." }
  },
  TOPICMAP:{
    vault:{ cryptographer:["c_kerck","c_alberti"], keykeeper:["c_vigenere","c_alkindi"], clerk:["c_kasiski","c_otp"] },
    cryptolab:{ cryptographer:["c_cryptanalysis","c_codebreaker"], keykeeper:["c_feistel","c_publickey"], clerk:["c_keyexch","c_hashtree"] },
    office:{ cryptographer:["c_rsa","c_sharing"], keykeeper:["c_rsaalg","c_pgp"], clerk:["c_aes","c_applied"] }
  },
  TOPICS:{
    // cell: The Cryptographer @ The Transaction & Key Vault
    c_kerck:{ sci:"Auguste Kerckhoffs (1835-1903)", topic:"Kerckhoffs's principle of cipher design", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: The Cryptographer @ The Transaction & Key Vault
    c_alberti:{ sci:"Leon Battista Alberti (1404-1472)", topic:"The polyalphabetic cipher & cipher disk", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Key Custodian @ The Transaction & Key Vault
    c_vigenere:{ sci:"Blaise de Vigenère (1523-1596)", topic:"The Vigenère cipher", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Key Custodian @ The Transaction & Key Vault
    c_alkindi:{ sci:"Al-Kindi (c. 801-873)", topic:"Frequency analysis & codebreaking", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Transaction & Key Vault
    c_kasiski:{ sci:"Friedrich Kasiski (1805-1881)", topic:"Breaking the polyalphabetic cipher", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Transaction & Key Vault
    c_otp:{ sci:"Gilbert Vernam (1890-1960)", topic:"The one-time pad", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: The Cryptographer @ The Cryptography Lab
    c_cryptanalysis:{ sci:"William F. Friedman (1891-1969)", topic:"Modern cryptanalysis", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: The Cryptographer @ The Cryptography Lab
    c_codebreaker:{ sci:"Elizebeth Smith Friedman (1892-1980)", topic:"Codebreaking & cipher-cracking", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Key Custodian @ The Cryptography Lab
    c_feistel:{ sci:"Horst Feistel (1915-1990)", topic:"The Feistel cipher & DES", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Key Custodian @ The Cryptography Lab
    c_publickey:{ sci:"Whitfield Diffie (b. 1944)", topic:"Public-key cryptography", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Cryptography Lab
    c_keyexch:{ sci:"Martin Hellman (b. 1945)", topic:"The Diffie-Hellman key exchange", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Cryptography Lab
    c_hashtree:{ sci:"Ralph Merkle (b. 1952)", topic:"Public keys & cryptographic hashing", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: The Cryptographer @ The Security Architect's Office
    c_rsa:{ sci:"Ronald Rivest (b. 1947)", topic:"The RSA cipher", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: The Cryptographer @ The Security Architect's Office
    c_sharing:{ sci:"Adi Shamir (b. 1952)", topic:"RSA & secret sharing", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Key Custodian @ The Security Architect's Office
    c_rsaalg:{ sci:"Leonard Adleman (b. 1945)", topic:"The RSA algorithm", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Key Custodian @ The Security Architect's Office
    c_pgp:{ sci:"Phil Zimmermann (b. 1954)", topic:"PGP & encryption for all", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Security Architect's Office
    c_aes:{ sci:"Joan Daemen (b. 1965)", topic:"The AES / Rijndael cipher", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Security Architect's Office
    c_applied:{ sci:"Bruce Schneier (b. 1963)", topic:"Applied cryptography & security", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    cryptographer:{ vault:"", cryptolab:"", office:"" },
    keykeeper:{ vault:"", cryptolab:"", office:"" },
    clerk:{ vault:"", cryptolab:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"genius", dismissalWhat:"bruteforce",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};
// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"f_ai", title:"The Aegis Model", discipline:"Artificial Intelligence & Machine Learning",
  teaser:"A hiring model quietly rejected thousands who never had a chance. A runaway self-learning intelligence? A handful of rare mistakes? Or a result buried before launch?", overclaimTag:"a runaway self-learning intelligence", truthTag:"biased data and a buried warning",
  venue:"the Aegis model inquiry", agent:{name:"Investigator Wen Astor", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Artificial-Intelligence Pioneers",
  dossierName:"ARTIFICIAL-INTELLIGENCE PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Aegis model inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a runaway self-learning intelligence) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"lead", items:[
      {id:"outsider", label:"An outside data-poisoning crew"},
      {id:"lead", label:"Dr. Priya Sandoval — the model's lead scientist"},
      {id:"auditor", label:"The external auditor"} ]},
    where:{ title:"Where it culminates", truth:"evalroom", items:[
      {id:"datalab", label:"The Training-Data Lab"},
      {id:"evalroom", label:"The Model Evaluation Room"},
      {id:"office", label:"The Project Lead's Office"} ]},
    what:{ title:"What is happening", truth:"biasdata", items:[
      {id:"sentient", label:"A runaway, self-teaching intelligence went rogue"},
      {id:"edgecases", label:"A few rare edge cases — the model works as designed"},
      {id:"biasdata", label:"Biased training data and a validation result buried before launch"} ]}
  },
  PLACES:{
    datalab:{name:"The Training-Data Lab", xy:[140,90]},
    evalroom:{name:"The Model Evaluation Room", xy:[330,240]},
    office:{name:"The Project Lead's Office", xy:[520,90]}
  },
  EDGES:[["datalab","evalroom"],["evalroom","office"]],
  CHARACTERS:{
    dataeng:{ name:"The Data Engineer", role:"Training-data engineer", face:"🗄", badge:"D", legend:"the data lab", hint:"Assembled the training set; knows whole groups were barely in it." },
    validator:{ name:"The Validation Scientist", role:"Model-validation scientist", face:"📊", badge:"V", legend:"the evaluation room", hint:"Ran the fairness test; the failing result was pulled before release." },
    clerk:{ name:"The Clerk", role:"Project records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the sign-off file — and the ship order that overrode the warning." }
  },
  TOPICMAP:{
    datalab:{ dataeng:["a_named","a_limits"], validator:["a_mlearn","a_perceptron"], clerk:["a_neuron","a_netlogic"] },
    evalroom:{ dataeng:["a_hebb","a_backprop"], validator:["a_connect","a_deep"], clerk:["a_convnet","a_repr"] },
    office:{ dataeng:["a_causal","a_svm"], validator:["a_forests","a_imagenet"], clerk:["a_bias","a_datacard"] }
  },
  TOPICS:{
    // cell: The Data Engineer @ The Training-Data Lab
    a_named:{ sci:"John McCarthy (1927-2011)", topic:"Artificial intelligence, named & founded", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: The Data Engineer @ The Training-Data Lab
    a_limits:{ sci:"Marvin Minsky (1927-2016)", topic:"Neural nets & their early limits", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Validation Scientist @ The Training-Data Lab
    a_mlearn:{ sci:"Arthur Samuel (1901-1990)", topic:"Machine learning from data", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Validation Scientist @ The Training-Data Lab
    a_perceptron:{ sci:"Frank Rosenblatt (1928-1971)", topic:"The perceptron", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Training-Data Lab
    a_neuron:{ sci:"Warren McCulloch (1898-1969)", topic:"The artificial neuron", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Training-Data Lab
    a_netlogic:{ sci:"Walter Pitts (1923-1969)", topic:"The logic of neural nets", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: The Data Engineer @ The Model Evaluation Room
    a_hebb:{ sci:"Donald Hebb (1904-1985)", topic:"Hebbian learning", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: The Data Engineer @ The Model Evaluation Room
    a_backprop:{ sci:"Paul Werbos (b. 1947)", topic:"Backpropagation", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Validation Scientist @ The Model Evaluation Room
    a_connect:{ sci:"David Rumelhart (1942-2011)", topic:"Backprop & connectionism", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Validation Scientist @ The Model Evaluation Room
    a_deep:{ sci:"Geoffrey Hinton (b. 1947)", topic:"Deep learning", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Model Evaluation Room
    a_convnet:{ sci:"Yann LeCun (b. 1960)", topic:"Convolutional networks", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Model Evaluation Room
    a_repr:{ sci:"Yoshua Bengio (b. 1964)", topic:"Deep learning & representation", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: The Data Engineer @ The Project Lead's Office
    a_causal:{ sci:"Judea Pearl (b. 1936)", topic:"Bayesian networks & causal inference", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: The Data Engineer @ The Project Lead's Office
    a_svm:{ sci:"Vladimir Vapnik (b. 1936)", topic:"Statistical learning & the support-vector machine", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Validation Scientist @ The Project Lead's Office
    a_forests:{ sci:"Leo Breiman (1928-2005)", topic:"Random forests & the two cultures of modelling", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Validation Scientist @ The Project Lead's Office
    a_imagenet:{ sci:"Fei-Fei Li (b. 1976)", topic:"ImageNet & the data behind vision", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Project Lead's Office
    a_bias:{ sci:"Joy Buolamwini (b. 1989)", topic:"Algorithmic bias in face recognition", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Project Lead's Office
    a_datacard:{ sci:"Timnit Gebru (b. 1983)", topic:"Bias, data & model documentation", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    dataeng:{ datalab:"", evalroom:"", office:"" },
    validator:{ datalab:"", evalroom:"", office:"" },
    clerk:{ datalab:"", evalroom:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"sentient", dismissalWhat:"edgecases",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};
// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"c_psych", title:"The Mimicry Effect", discipline:"Psychology & Research Method",
  teaser:"A dazzling result took the field by storm — then no one could repeat it. A brilliant discovery? A fluke worth forgetting? Or numbers that never came from real people?", overclaimTag:"a landmark discovery", truthTag:"fabricated data",
  venue:"the Mimicry Effect inquiry", agent:{name:"Investigator Dana Pell", role:"Investigator's Notepad"},
  standingLabel:"Panel credibility", readingShort:"Psychologists", readingLabel:"Psychology & Method",
  dossierName:"PSYCHOLOGY & METHOD", enterLabel:"Open the inquiry", subt:"A deduction game inside the Mimicry Effect inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"The brighter the result shines in retrospect, the more closely its participant trail should survive ordinary inspection.",
  CATS:{
    who:{ title:"Who is behind it", truth:"ps_prof", items:[
      {id:"ps_prof", label:"Prof. Adrian Voss — the celebrated lead author"},
      {id:"ps_junior", label:"Dr. Kline — a junior co-author"},
      {id:"ps_editor", label:"The journal editor"} ]},
    where:{ title:"Where it culminates", truth:"ps_dataroom", items:[
      {id:"ps_lab", label:"The Psychology Laboratory"},
      {id:"ps_journal", label:"The Journal's Editorial Office"},
      {id:"ps_dataroom", label:"The Raw-Data Archive"} ]},
    what:{ title:"What is happening", truth:"ps_fabricated", items:[
      {id:"ps_landmark", label:"A landmark, field-defining effect"},
      {id:"ps_noise", label:"A fragile fluke — just noise, best forgotten"},
      {id:"ps_fabricated", label:"Fabricated data behind the famous result"} ]}
  },
  PLACES:{
    ps_lab:{name:"The Psychology Laboratory", xy:[140,90]},
    ps_journal:{name:"The Journal's Editorial Office", xy:[330,240]},
    ps_dataroom:{name:"The Raw-Data Archive", xy:[520,90]}
  },
  EDGES:[["ps_lab","ps_journal"],["ps_journal","ps_dataroom"]],
  CHARACTERS:{
    ps_grad:{ name:"Grad Student Rhee", role:"Doctoral student", face:"🎓", badge:"R", legend:"the laboratory", hint:"Ran the follow-up studies; the 'raw' data are too clean to have come from real subjects." },
    ps_auditor:{ name:"Data Auditor Sol", role:"Statistical auditor", face:"📊", badge:"S", legend:"the data archive", hint:"Re-checks the numbers; the summary statistics are impossible for the sample sizes claimed." },
    ps_replicator:{ name:"Dr. Ives", role:"Replication-team lead", face:"🔁", badge:"I", legend:"the editorial office", hint:"Led the multi-lab replication; the effect vanishes every time it is run honestly." }
  },
  TOPICMAP:{
    ps_lab:{ ps_grad:["ps_wundt","ps_james"], ps_auditor:["ps_galton","ps_pearson"], ps_replicator:["ps_fisher","ps_cohen"] },
    ps_journal:{ ps_grad:["ps_meehl","ps_kahneman"], ps_auditor:["ps_tversky","ps_rosenthal"], ps_replicator:["ps_ioannidis","ps_nosek"] },
    ps_dataroom:{ ps_grad:["ps_simonsohn","ps_gigerenzer"], ps_auditor:["ps_greenwald","ps_bem"], ps_replicator:["ps_stapel","ps_hauser"] }
  },
  TOPICS:{
    // cell: Grad Student Rhee @ The Psychology Laboratory
    ps_wundt:{ sci:"Wilhelm Wundt (1832–1920)", topic:"The first experimental psychology laboratory", lede:"The physiologist who turned attention, reaction time, and sensation into events that could be timed and repeated.", no:1, profile:"Wilhelm Wundt helped establish psychology as an experimental discipline rather than a branch of speculative philosophy. Trained in medicine and physiology, he worked with Hermann von Helmholtz before building his own program around the measurable relation between stimulation and conscious experience. In 1879 at the University of Leipzig, he established the laboratory conventionally recognized as the first formal institute devoted to experimental psychology.\n\nWundt’s laboratory did not study every part of mind. It concentrated on processes that could be presented under controlled conditions: reaction time, sensory discrimination, attention, and the timing of simple decisions. Participants were often highly practiced observers. They reported immediate experience under standardized procedures, a method quite different from casual introspection about one’s personality or memories. Instruments controlled sound, light, and intervals, while repeated trials exposed variation that a single striking response would conceal.\n\nThe Leipzig laboratory also trained researchers who carried experimental methods into other countries. Wundt distinguished this work from the study of language, culture, and social life, which he believed required historical and comparative approaches. That boundary matters: a laboratory can sharpen a narrow question without making every psychological claim experimentally tractable. His achievement was institutional as much as theoretical—a room, apparatus, procedures, records, and a community able to inspect how an observation was produced.\n\nIn the Mimicry Effect inquiry, Wundt’s lesson begins below the published average. Real participants hesitate, misunderstand, tire, and vary across trials. A claimed effect should therefore leave a plausible trail of stimulus timings, individual responses, exclusions, and mistakes. A celebrated graph is not enough, but failed replications alone do not prove fraud. The raw sequence must look like human behavior generated by the stated procedure.",
      frame:"Rhee taps the old reaction timer beside a stack of participant sheets. “Wundt made psychology answer to apparatus and repeated trials. Show me what a real session should leave behind.”", q:[
        { q:"What made Wundt’s Leipzig laboratory historically distinctive?",
          o:[
            { t:"It organized psychology around controlled experiments and dedicated apparatus.", v:"expert", fb:"The institute gave experimental psychology a stable place, procedure, and training program." },
            { t:"It proved that every mental process could be reduced to one reflex.", v:"danger", fb:"Wundt limited laboratory claims and treated culture and language differently." },
            { t:"It replaced repeated trials with unrestricted personal autobiography.", v:"wrong", fb:"His trained observations occurred under controlled, repeatable conditions." },
            { t:"It was the first hospital to treat psychiatric illness with medication.", v:"wrong", fb:"The Leipzig institute focused on experimental psychology, not clinical drug treatment." }
          ] },
        { q:"Why were repeated trials central to early experimental psychology?",
          o:[
            { t:"They revealed response patterns and variability beyond a single observation.", v:"expert", fb:"Replication within a session separates stable tendencies from momentary fluctuation." },
            { t:"They guaranteed that practiced observers would eventually give identical answers.", v:"danger", fb:"Practice can reduce some noise, but human responses never become perfectly identical." },
            { t:"They allowed investigators to discard every response that challenged a theory.", v:"wrong", fb:"Exclusions require stated rules rather than selective removal of inconvenient trials." },
            { t:"They made documentation unnecessary once the average reaction time was known.", v:"wrong", fb:"The trial record is needed to evaluate how the average was produced." }
          ] },
        { q:"Which raw-data pattern would best fit genuine reaction-time sessions?",
          o:[
            { t:"Variable responses, occasional errors, and timestamps tied to actual trials.", v:"expert", fb:"Human performance produces structured variation rather than flawless repeated values." },
            { t:"Every participant giving the same latency to the exact millisecond.", v:"danger", fb:"Such uniformity would be biologically implausible and demands forensic scrutiny." },
            { t:"Only group means, with all participant-level observations permanently absent.", v:"partial", fb:"Means can summarize data but cannot establish that the underlying sessions occurred." },
            { t:"A smooth curve reconstructed later without stimulus or session identifiers.", v:"wrong", fb:"A retrospective curve lacks the provenance needed to verify the experiment." }
          ] }
      ] },
    // cell: Grad Student Rhee @ The Psychology Laboratory
    ps_james:{ sci:"William James (1842–1910)", topic:"The principles of psychology", lede:"He described consciousness as a restless stream and judged theories by what they helped us understand and do.", no:2, profile:"William James approached psychology through physiology, philosophy, and close observation of ordinary mental life. After medical training at Harvard, he began teaching there and helped create facilities for psychological demonstration and experiment. His two-volume Principles of Psychology, published in 1890, surveyed attention, habit, emotion, memory, will, and the sense of self with unusual breadth.\n\nJames rejected the picture of consciousness as a chain of separate mental atoms. He called it a stream: continuous, selective, and always belonging to a person. Attention was not a neutral camera but an active selection from competing possibilities. Habit showed how repeated actions become easier and shape character. His account of emotion, developed alongside ideas associated with Carl Lange, proposed that bodily changes are not merely consequences of feeling; perceiving those changes is part of the emotional experience.\n\nJames valued experiments, but he did not confuse precision with completeness. Some questions required laboratory timing; others demanded observation, comparison, pathology, or reflection. His pragmatism asked what difference an idea makes in experience and action. That openness made his psychology vivid, though it also means his writings contain proposals of differing evidential strength rather than one closed system.\n\nFor this inquiry, James supplies a warning about flattening people into a miraculous group mean. Mimicry, attention, and social response should vary with context, expectation, and individual history. A weak or unstable effect can still be an honest research result. The sharper concern arises when the supposed participants have no believable streams at all—no hesitations, missing answers, order effects, or idiosyncratic patterns. The panel must distinguish psychological complexity from numbers manufactured to look impressively simple.",
      frame:"Rhee turns the participant packets sideways, searching for individual trajectories. “James expected minds to move, select, and differ. These records look as if nobody ever changed course.”", q:[
        { q:"What did James mean by the “stream of consciousness”?",
          o:[
            { t:"Experience is continuous, selective, and lived from a personal point of view.", v:"expert", fb:"James opposed treating consciousness as disconnected mental particles." },
            { t:"Thought consists of identical units that occur in a fixed mechanical order. too", v:"wrong", fb:"The stream metaphor emphasized continuity and change rather than rigid units." },
            { t:"Only unconscious reflexes matter because conscious reports are meaningless.", v:"danger", fb:"James treated conscious experience as a central subject of psychology." },
            { t:"Memory stores a complete recording that can be replayed without alteration.", v:"wrong", fb:"His psychology did not portray memory as a perfect internal recording." }
          ] },
        { q:"How did James treat laboratory measurement?",
          o:[
            { t:"As valuable for some questions but insufficient for the whole of mental life.", v:"expert", fb:"He combined experimental evidence with broader observation and philosophical analysis." },
            { t:"As useless because all psychological knowledge must come from intuition.", v:"wrong", fb:"James supported experimental work while resisting an overly narrow scope." },
            { t:"As conclusive whenever a result reached conventional statistical significance.", v:"danger", fb:"Modern significance testing postdated his major work and never guarantees truth." },
            { t:"As proof that context and personal history cannot affect behavior.", v:"wrong", fb:"James emphasized selection, habit, and the situated character of experience." }
          ] },
        { q:"Which feature would James expect in authentic participant records?",
          o:[
            { t:"Individual variation shaped by attention, habit, and changing circumstances.", v:"expert", fb:"Real psychological responses should carry traces of differing persons and contexts." },
            { t:"Perfectly repeated choices unaffected by order, fatigue, or prior experience.", v:"danger", fb:"That mechanical uniformity conflicts with James’s account of mental life." },
            { t:"Only a polished average because individual sequences have no scientific value.", v:"wrong", fb:"Group summaries cannot replace the behavior from which they were calculated." },
            { t:"Responses edited until every person illustrates the same theoretical narrative.", v:"wrong", fb:"Theory must explain observed variation rather than erase it." }
          ] }
      ] },
    // cell: Data Auditor Sol @ The Psychology Laboratory
    ps_galton:{ sci:"Francis Galton (1822–1911)", topic:"Correlation & the measurement of mind", lede:"He built instruments to measure human differences, then drew lessons both statistically fertile and morally disastrous.", no:3, profile:"Francis Galton pursued the quantitative study of human variation across sensory, physical, and mental traits. A Victorian polymath and cousin of Charles Darwin, he established an anthropometric laboratory in London where thousands of visitors paid to have grip strength, reaction time, height, hearing, and other characteristics measured. The enterprise helped normalize large collections of person-level data and the search for relationships among variables.\n\nStudying heredity and family resemblance, Galton developed ideas that fed into regression and correlation. He noticed that exceptionally tall parents tended to have children closer to the population average, a pattern he described as regression toward mediocrity, now called regression to the mean. He also used graphical methods to examine how two measurements varied together. Later statisticians, especially Karl Pearson, formalized these ideas.\n\nGalton’s scientific legacy cannot be separated from eugenics, a term he coined and a movement he promoted. He sought to rank people and encourage reproduction by those he considered superior. Those assumptions were scientifically crude and ethically destructive, contributing to coercive policies and racial hierarchies. Measurement is not neutral when investigators choose biased categories, treat social outcomes as biological worth, or turn a population association into a judgment about individuals.\n\nThe Mimicry data require the useful part of Galton’s discipline without his determinism. A correlation summarizes how two variables co-vary; it does not prove that one causes the other or that every person follows the trend. Real participant clouds contain scatter, ties, and outliers. A dataset engineered so that every score falls neatly along the published line is not stronger evidence—it may be evidence that the messy people were replaced by arithmetic.",
      frame:"Sol draws a scatterplot, then circles the points that line up too obediently. “Galton helped make variation visible. He also showed, by his gravest errors, how measurement can outrun judgment.”", q:[
        { q:"What is regression to the mean?",
          o:[
            { t:"Extreme observations tend to be followed by values nearer the average.", v:"expert", fb:"The pattern can arise from imperfect correlation without any corrective force." },
            { t:"Every person inevitably becomes average after enough repeated testing. too", v:"danger", fb:"Regression is a statistical tendency, not a law erasing individual differences." },
            { t:"Researchers should replace extreme scores with the sample mean.", v:"wrong", fb:"Altering observed values would destroy rather than explain the data." },
            { t:"A strong correlation proves two variables share one biological cause.", v:"wrong", fb:"Correlation alone cannot establish a common causal mechanism." }
          ] },
        { q:"What does a correlation describe?",
          o:[
            { t:"The direction and strength of association between measured variables.", v:"expert", fb:"Correlation summarizes co-variation but does not by itself identify causation." },
            { t:"The certainty that changing one variable will change the other.", v:"danger", fb:"Causal claims need design and assumptions beyond association." },
            { t:"The percentage of participants whose scores are scientifically valid.", v:"wrong", fb:"Validity is not encoded by a correlation coefficient." },
            { t:"The difference between two group means after all outliers are removed.", v:"wrong", fb:"That is a different calculation and removals require justification." }
          ] },
        { q:"Why is an unnaturally perfect scatterplot suspicious?",
          o:[
            { t:"Human measurements normally contain error, heterogeneity, and imperfect association.", v:"expert", fb:"Exceptional regularity should be checked against instrument precision and raw records." },
            { t:"Any correlation above zero proves that an investigator fabricated observations.", v:"danger", fb:"Strong genuine associations exist, so perfection is a clue rather than a verdict." },
            { t:"Psychological variables cannot have any reproducible relation to one another.", v:"wrong", fb:"Many psychological associations are real even when they are not exact." },
            { t:"Outliers are required in every sample at a fixed numerical percentage. too too", v:"wrong", fb:"Variation is expected, but no universal outlier quota exists." }
          ] }
      ] },
    // cell: Data Auditor Sol @ The Psychology Laboratory
    ps_pearson:{ sci:"Karl Pearson (1857–1936)", topic:"Correlation & statistical method", lede:"He gave correlation its familiar coefficient and built statistical machinery powerful enough to reveal—or conceal—structure.", no:4, profile:"Karl Pearson was a central architect of mathematical statistics. Working at University College London, he developed methods for describing variation, fitting distributions, measuring association, and testing discrepancies between observations and models. The product-moment correlation coefficient commonly written as r bears his name, as does the chi-squared test used to compare observed and expected counts.\n\nPearson’s correlation ranges from minus one to plus one. Its sign indicates direction, while its magnitude describes the strength of a linear association. A value near zero does not rule out a curved or otherwise nonlinear relationship. A value near one does not show that one variable causes the other. The coefficient also depends on the range of observations and can be strongly affected by outliers, making the scatterplot as important as the single number.\n\nPearson founded the journal Biometrika and helped turn statistics into an organized discipline. Like Galton, however, he was deeply involved in eugenics and used statistical authority to support hierarchical ideas about heredity and society. His career therefore demonstrates both the reach of quantitative tools and the danger of treating model choices or prejudiced categories as discoveries forced by mathematics.\n\nSol’s audit of the Mimicry Effect does not stop at recomputing r. He checks whether the reported coefficient is mathematically possible for the stated sample size and rounded values, whether duplicated rows create the association, and whether participant identifiers connect to actual sessions. A correct formula applied to invented numbers remains invented evidence. Conversely, a modest or failed correlation is not proof that no experiment occurred. Pearson’s tools help expose the internal geometry of a dataset; provenance determines whether that geometry came from people.",
      frame:"Sol writes r beside the published claim, then opens the raw table. “A coefficient is a compression. I need to see what was compressed—and whether those rows could produce the number.”", q:[
        { q:"What does Pearson’s r measure most directly?",
          o:[
            { t:"The strength and direction of a linear association between variables.", v:"expert", fb:"The coefficient summarizes linear co-variation on a scale from minus one to one." },
            { t:"The probability that the observed association was caused by manipulation.", v:"wrong", fb:"Causal attribution requires more than a correlation coefficient." },
            { t:"The proportion of every outcome explained by a single predictor.", v:"partial", fb:"Its square has a variance interpretation in limited settings, but r itself is association." },
            { t:"Whether two variables have any relationship of any possible shape.", v:"danger", fb:"A near-zero r can coexist with a strong nonlinear relationship." }
          ] },
        { q:"Why should an auditor inspect the scatterplot as well as r?",
          o:[
            { t:"Outliers, clusters, and curves can produce the same summary coefficient.", v:"expert", fb:"Different point patterns may collapse to similar values of r." },
            { t:"A scatterplot automatically proves every row came from a real participant.", v:"wrong", fb:"Visualization cannot establish provenance or participant existence." },
            { t:"The plotted points remove all effects of rounding and data entry error.", v:"wrong", fb:"Plots display recorded values and may reveal, not erase, such problems." },
            { t:"A smooth line is more persuasive than the underlying observations.", v:"danger", fb:"The observations, not a fitted decoration, are the evidential foundation." }
          ] },
        { q:"What would make a reported correlation mathematically questionable?",
          o:[
            { t:"It cannot be reproduced from the stated rows, rounding, and sample size.", v:"expert", fb:"Internal inconsistency is a concrete signal that summaries or raw data are wrong." },
            { t:"Its magnitude is larger than the investigator expected before collecting data.", v:"partial", fb:"Surprise invites checking but does not create a mathematical impossibility." },
            { t:"It differs from a later study conducted in another population. too", v:"partial", fb:"Heterogeneity can produce different estimates without fabrication." },
            { t:"It supports a theory that received extensive attention in the press.", v:"wrong", fb:"Publicity has no bearing on the arithmetic consistency of r." }
          ] }
      ] },
    // cell: Dr. Ives @ The Psychology Laboratory
    ps_fisher:{ sci:"Ronald A. Fisher (1890–1962)", topic:"Significance testing & experimental design", lede:"He joined randomization, experimental design, and significance tests into a system for learning from noisy variation.", no:5, profile:"Ronald A. Fisher transformed experimental statistics while working at Rothamsted Experimental Station and later at University College London and Cambridge. Agricultural field trials confronted him with variation in soil, weather, and crop response that could not be wished away. He developed analysis of variance, likelihood methods, and principles of experimental design that influenced research far beyond agriculture.\n\nRandomization was crucial. Assigning treatments by chance protects comparisons from systematic differences that investigators know about and from some they do not. Replication estimates variability, while blocking groups similar experimental units so treatment contrasts are not drowned by known gradients. Together these design choices make uncertainty interpretable rather than merely decorative after the results appear.\n\nFisher also popularized significance testing through the p-value: under a specified null model, the probability of obtaining data at least as incompatible with that model as the observations. A small p-value is not the probability that the null hypothesis is true, not the probability that the findings will replicate, and not proof of a large or important effect. Fisher’s own framework was more flexible than the mechanical pass/fail ritual later built around 0.05.\n\nFor the Mimicry Effect, Ives asks whether assignment was genuinely randomized, whether exclusions were chosen before outcomes were seen, and whether the analysis matches the design. Flexible analysis can turn noisy real data into a fragile significant result. Yet fabricated data pose a different problem: their p-values may be internally perfect because the rows were constructed backward from a desired conclusion. Experimental design explains what evidence should exist before the calculation; an audit tests whether it does.",
      frame:"Ives shuffles condition cards in front of the empty testing booths. “Randomization is a procedure, not a word in the methods section. Tell me what evidence it ought to leave.”", q:[
        { q:"What is the main purpose of random assignment?",
          o:[
            { t:"To make treatment groups comparable without choosing who receives each condition.", v:"expert", fb:"Chance assignment limits systematic allocation bias and supports causal comparison." },
            { t:"To guarantee equal outcomes and identical participant characteristics. in practice", v:"danger", fb:"Randomization balances in expectation, not perfectly in every sample." },
            { t:"To ensure the final p-value falls below the chosen threshold.", v:"wrong", fb:"Assignment protects design; it does not guarantee statistical significance." },
            { t:"To let researchers change conditions after observing early responses. too", v:"wrong", fb:"Outcome-driven reassignment would defeat randomization." }
          ] },
        { q:"What does a p-value represent in Fisherian testing?",
          o:[
            { t:"A tail probability for data under a specified null model. too", v:"expert", fb:"It measures incompatibility with the null assumptions, not the truth probability of a hypothesis." },
            { t:"The probability that the null hypothesis is true after seeing the data.", v:"danger", fb:"That posterior probability requires additional assumptions and is not a p-value." },
            { t:"The chance that an independent replication will produce the same result.", v:"wrong", fb:"Replication probability depends on effect size, design, and uncertainty." },
            { t:"The percentage of observations collected without measurement error.", v:"wrong", fb:"Data quality is not summarized by the p-value." }
          ] },
        { q:"Which record most directly supports genuine randomization?",
          o:[
            { t:"A time-stamped assignment sequence linked to enrolled participants.", v:"expert", fb:"The allocation trail can be checked against session order and condition counts." },
            { t:"A methods sentence stating that participants were randomly assigned.", v:"partial", fb:"The statement matters, but the underlying sequence provides stronger verification." },
            { t:"Final groups whose means differ in the theoretically predicted direction.", v:"danger", fb:"Desired outcomes do not demonstrate how assignments were made." },
            { t:"A spreadsheet reordered after analysis so conditions alternate neatly.", v:"wrong", fb:"Post hoc ordering cannot establish the original allocation process." }
          ] }
      ] },
    // cell: Dr. Ives @ The Psychology Laboratory
    ps_cohen:{ sci:"Jacob Cohen (1923–1998)", topic:"Statistical power & effect size", lede:"He showed that “not significant” can mean “not enough information,” and demanded that researchers plan for detectable effects.", no:6, profile:"Jacob Cohen made statistical power and effect size central concerns in behavioral research. Surveying published psychology, he argued that many studies used samples too small to detect effects of plausible magnitude. A non-significant result from such a design could not strongly distinguish the absence of an effect from an insensitive experiment.\n\nPower is the probability that a statistical procedure will reject a false null hypothesis under a specified effect size, sample size, variability, and decision threshold. Larger samples generally increase power. So can more reliable measurement or a stronger manipulation. Cohen also promoted standardized effect sizes, including d for a difference between means, to describe magnitude separately from whether a p-value crossed a conventional line.\n\nHis labels for small, medium, and large effects were rough conventions, not universal facts. Importance depends on context: a small effect can matter when applied to millions of people, while a large laboratory contrast can be trivial outside its artificial setting. Prospective power analysis is most useful before collecting data, when it can guide design. Post hoc calculations based only on an observed p-value often add little.\n\nIves’s replication team therefore does not interpret the vanished Mimicry Effect as instant proof of invention. It asks whether the replications had enough precision to detect the original claim and whether their confidence intervals exclude an effect of that size. If many well-powered laboratories converge near zero, the landmark claim weakens sharply. Fabrication requires further evidence from the original raw archive. Cohen helps the panel avoid both traps: worshiping one significant result and dismissing every failure as meaningless noise.",
      frame:"Ives places the original effect size beside the multi-lab confidence interval. “Failure to cross 0.05 is not the argument. Tell me what effects these studies were capable of seeing.”", q:[
        { q:"What is statistical power?",
          o:[
            { t:"The chance a test detects a specified effect when that effect is present.", v:"expert", fb:"Power depends on effect size, sample size, variability, and the testing rule." },
            { t:"The probability that every significant finding is scientifically important.", v:"wrong", fb:"Statistical detection and practical importance are separate questions." },
            { t:"The percentage of participants who comply perfectly with instructions.", v:"wrong", fb:"Compliance affects data quality but is not the definition of power." },
            { t:"The certainty that a larger sample will reproduce the published estimate exactly.", v:"danger", fb:"Larger samples improve precision but do not guarantee identical estimates." }
          ] },
        { q:"Why report effect size as well as significance?",
          o:[
            { t:"It describes the magnitude of a result apart from a threshold decision.", v:"expert", fb:"A tiny effect can be significant in a large sample, and a meaningful one can miss in a small sample." },
            { t:"It converts an observational association into a proven causal effect. too", v:"wrong", fb:"Effect-size measures do not repair weaknesses in design." },
            { t:"It identifies which investigator entered each participant’s raw data.", v:"wrong", fb:"That is a provenance question, not a magnitude statistic." },
            { t:"It guarantees the result will generalize to every new population.", v:"danger", fb:"Generalization requires evidence across settings and samples." }
          ] },
        { q:"How should the failed replications be interpreted?",
          o:[
            { t:"Compare their precision with the original claimed effect before drawing conclusions.", v:"expert", fb:"Well-powered near-zero results challenge the claim more than imprecise failures do." },
            { t:"Treat every non-significant result as proof that the original data were fabricated. too", v:"danger", fb:"Replication failure alone does not identify misconduct." },
            { t:"Ignore them because only the first published experiment can define an effect.", v:"wrong", fb:"Independent evidence should update confidence in the original claim." },
            { t:"Average only the replications that happened to produce positive estimates. too", v:"wrong", fb:"Selective inclusion would recreate the bias under investigation." }
          ] }
      ] },
    // cell: Grad Student Rhee @ The Journal's Editorial Office
    ps_meehl:{ sci:"Paul Meehl (1920–2003)", topic:"Clinical versus statistical prediction", lede:"He pitted expert intuition against simple prediction rules and repeatedly found that consistency could beat confidence.", no:7, profile:"Paul Meehl changed psychology by asking a practical comparative question: when clinicians and statistical formulas make the same prediction, which performs better? In his 1954 book Clinical Versus Statistical Prediction, he reviewed studies in which professional judgment was compared with mechanical rules that combined measured variables in a fixed way.\n\nMeehl found that actuarial or statistical methods usually matched or outperformed unaided clinical judgment. A formula can be crude, but it applies the same weights every time. Human judges notice nuance, yet they also vary with mood, memorable cases, expectations, and inconsistent weighting. Meehl did not argue that clinicians were useless. Experts choose variables, gather information, identify exceptional circumstances, and decide what outcomes matter. His point was that discretionary combination often performs worse than a transparent rule.\n\nHe later became a fierce critic of weak theory and ritual significance testing in psychology. In fields with many correlated variables and large samples, almost any null hypothesis of exactly zero is likely to be false. Collecting a significant association without a risky numerical prediction therefore offers little theoretical progress. Strong science should expose a theory to outcomes it could genuinely fail.\n\nRhee sees the same problem in the journal’s response to the Mimicry Effect. Editors trusted Voss’s reputation and an elegant narrative over mundane predictive checks. A legitimate participant dataset should let a fixed analysis reproduce every reported summary and should perform sensibly on held-out cases. An explanation improvised after each discrepancy can protect either a brilliant discovery or an innocent fluke forever. Meehl’s discipline is to write the rule down, test it prospectively, and count when it loses.",
      frame:"Rhee sets the editor’s enthusiastic notes beside a blind reanalysis. “Meehl distrusted judgment that changes its weights after every surprise. This inquiry needs a rule that can fail.”", q:[
        { q:"What did Meehl find about clinical versus statistical prediction?",
          o:[
            { t:"Fixed statistical rules often matched or beat unaided professional judgment.", v:"expert", fb:"Consistency can outperform flexible intuition even when experts select useful inputs." },
            { t:"Clinicians always predicted perfectly once given enough biographical detail.", v:"danger", fb:"More detail can increase confidence without improving predictive accuracy." },
            { t:"Mechanical rules were valuable only when they used no human-chosen variables.", v:"wrong", fb:"Experts still help define variables, outcomes, and exceptional cases." },
            { t:"Prediction accuracy cannot be compared because every case is completely unique.", v:"wrong", fb:"Meehl’s work depended on evaluating predictions against observed outcomes." }
          ] },
        { q:"Why can a simple rule outperform an expert?",
          o:[
            { t:"It applies the same weights consistently and avoids case-by-case drift.", v:"expert", fb:"Stable combination limits noise from changing impressions and memorable examples." },
            { t:"It automatically discovers the true causal theory behind every association.", v:"wrong", fb:"Prediction can improve without revealing a complete causal explanation." },
            { t:"It removes all measurement error from the variables entered into it.", v:"wrong", fb:"A formula cannot improve the quality of faulty inputs by itself." },
            { t:"It guarantees fairness because numerical procedures contain no human choices.", v:"danger", fb:"Variables, samples, and objectives still reflect human decisions." }
          ] },
        { q:"Which test best follows Meehl’s methodological advice?",
          o:[
            { t:"Specify the analysis first and assess it on data not used to tune it.", v:"expert", fb:"Prospective, out-of-sample tests expose a rule to genuine failure." },
            { t:"Revise the prediction after each mismatch until every case is explained.", v:"danger", fb:"Unlimited adjustment turns failure into retrospective storytelling." },
            { t:"Accept the lead author’s interpretation because expertise is hard to quantify.", v:"wrong", fb:"Authority should not substitute for comparative predictive performance." },
            { t:"Declare the theory false whenever one participant behaves unexpectedly.", v:"partial", fb:"A risky theory must allow errors while making aggregate predictions." }
          ] }
      ] },
    // cell: Grad Student Rhee @ The Journal's Editorial Office
    ps_kahneman:{ sci:"Daniel Kahneman (1934–2024)", topic:"Heuristics, biases & a warning on reliability", lede:"He mapped the shortcuts of judgment, then publicly warned colleagues that celebrated findings needed sturdier replication.", no:8, profile:"Daniel Kahneman, working for decades with Amos Tversky, helped establish the modern study of judgment and decision-making. Their experiments showed that people often use heuristics—efficient mental shortcuts—when reasoning under uncertainty. These shortcuts can be adaptive, but they also produce systematic errors such as anchoring, neglect of base rates, and sensitivity to how an equivalent choice is framed.\n\nKahneman and Tversky developed prospect theory to describe decisions involving gains and losses. People evaluate outcomes relative to a reference point, often dislike losses more than equivalent gains, and weight probabilities in ways that depart from simple expected-utility models. Kahneman later distinguished fast, automatic operations from slower, effortful reasoning, while emphasizing that the two-system language is a useful organizing metaphor rather than two literal boxes in the brain.\n\nHis later role in psychology’s credibility debate is especially relevant here. In 2012 he wrote an open letter to researchers studying social priming, warning of a looming reputational problem and urging a coordinated replication effort. The appeal was striking because he was sympathetic to the field and had discussed some priming findings favorably. He recognized that confidence, prestige, and a coherent literature can themselves bias scientific judgment.\n\nThe Mimicry Effect was built to exploit those tendencies. A vivid demonstration anchors reviewers; repeated citations create availability; a famous author invites a halo effect. None proves fabrication, and skepticism can suffer its own confirmation bias. Kahneman’s remedy is procedural: slow the judgment, inspect base rates and alternative explanations, preregister decisive tests, and let the raw archive constrain the story. An inquiry into bias must not assume its investigators are exempt from it.",
      frame:"Rhee pins the original press release above the replication reports. “Kahneman studied how a compelling first impression governs everything after it. The panel has one too.”", q:[
        { q:"What is a heuristic in judgment research?",
          o:[
            { t:"A mental shortcut that can be efficient but can also yield systematic error.", v:"expert", fb:"Heuristics reduce effort while creating predictable biases in some settings." },
            { t:"A formal proof that guarantees an objectively correct decision. too as tested", v:"wrong", fb:"A heuristic is a shortcut, not a guarantee of optimality." },
            { t:"A random mistake that cannot recur across people or situations. too", v:"wrong", fb:"Many biases are systematic precisely because the shortcut is shared." },
            { t:"A deliberate attempt to falsify data for personal advantage. too too", v:"danger", fb:"Cognitive bias and research misconduct are different phenomena." }
          ] },
        { q:"Why did Kahneman urge replication of social-priming findings?",
          o:[
            { t:"He feared a fragile literature could suffer a broad loss of credibility. too", v:"expert", fb:"He called for coordinated, credible tests rather than relying on reputation." },
            { t:"He had proven that every priming experiment used fabricated participants.", v:"danger", fb:"His warning concerned reliability, not a universal fraud finding." },
            { t:"He believed replication was unnecessary when theories were psychologically plausible.", v:"wrong", fb:"The letter argued that plausibility and prestige were not enough." },
            { t:"He wanted journals to publish only failures and suppress successful studies.", v:"wrong", fb:"Balanced, rigorous replication—not reverse publication bias—was the goal." }
          ] },
        { q:"Which bias could distort the Mimicry inquiry?",
          o:[
            { t:"Anchoring on the famous first result and underweighting later evidence.", v:"expert", fb:"An initial claim can shape interpretation long after contrary data arrive." },
            { t:"Regression to the mean caused solely by investigators expecting misconduct.", v:"wrong", fb:"Regression is a statistical pattern, not simply an expectation effect." },
            { t:"Random assignment making all reviewers reach the same conclusion.", v:"wrong", fb:"Randomization concerns allocation in experiments, not unanimity in review." },
            { t:"Base-rate neglect proving that Voss must be innocent because fraud is rare.", v:"danger", fb:"A low prior frequency must still be updated by strong case-specific evidence." }
          ] }
      ] },
    // cell: Data Auditor Sol @ The Journal's Editorial Office
    ps_tversky:{ sci:"Amos Tversky (1937–1996)", topic:"Judgment under uncertainty", lede:"He designed spare little problems that exposed how probability judgment bends under framing, resemblance, and memory.", no:9, profile:"Amos Tversky used mathematically precise experiments to study how people make choices and judgments under uncertainty. With Daniel Kahneman, he showed that intuitive answers often depart from probability theory in regular, interpretable ways. The work did not portray people as simply irrational; it identified the shortcuts that make difficult judgments manageable and the conditions under which those shortcuts mislead.\n\nThe representativeness heuristic leads people to judge probability by resemblance to a stereotype, sometimes ignoring base rates or sample size. The availability heuristic makes events easier to recall feel more frequent or likely. Anchoring pulls estimates toward an initial number even when that starting point is arbitrary. Their famous conjunction experiments showed that a detailed combination can feel more plausible than one of its components, although the conjunction cannot be more probable under the laws of probability.\n\nTversky also studied framing and preference. Equivalent options described as gains or losses can elicit different choices. These results undermined the assumption that preferences are always stable and merely revealed by a question. Small changes in description can help construct the response itself.\n\nSol applies this work to evidence rather than consumer choice. The label ‘landmark effect’ makes the result representative of scientific brilliance; ‘replication crisis’ makes every anomaly available as evidence of fraud. The conjunction of an exciting theory, a famous author, and a clean graph may feel stronger than the graph alone, but detail is not probability. Tversky would demand explicit alternatives and numerical consistency. The impossible summaries in Voss’s archive matter because they violate arithmetic, not because they fit a familiar villain story.",
      frame:"Sol removes the words “landmark” and “scandal” from two otherwise identical summaries. “Tversky taught that description alters judgment. The arithmetic must survive either label.”", q:[
        { q:"What is the representativeness heuristic?",
          o:[
            { t:"Judging likelihood by resemblance while sometimes neglecting base rates.", v:"expert", fb:"Similarity can dominate relevant statistical information." },
            { t:"Choosing the option whose numerical probability is always greatest.", v:"wrong", fb:"The heuristic can pull judgment away from probability rules." },
            { t:"Remembering only observations that were entered most recently. too", v:"partial", fb:"Recency can matter, but representativeness concerns resemblance to a model or stereotype." },
            { t:"Fabricating a sample so its members resemble the predicted result.", v:"danger", fb:"That would be misconduct, not a cognitive heuristic." }
          ] },
        { q:"What is the conjunction fallacy?",
          o:[
            { t:"Treating a combined event as more probable than one of its parts.", v:"expert", fb:"A conjunction cannot exceed the probability of either component." },
            { t:"Assuming two independent studies must produce identical sample means.", v:"wrong", fb:"Independent estimates naturally vary across samples." },
            { t:"Combining datasets before checking whether their measures are compatible.", v:"partial", fb:"That can be a methodological error, but it is not the classic fallacy." },
            { t:"Concluding that any detailed scientific explanation is necessarily false.", v:"danger", fb:"Detail can be correct; the fallacy concerns probability ordering." }
          ] },
        { q:"How can framing affect this inquiry?",
          o:[
            { t:"Calling the result a landmark or a scandal can shift judgment before analysis.", v:"expert", fb:"Evaluators should compare the same evidence under neutral descriptions." },
            { t:"It changes the underlying participant records stored in the archive. too", v:"wrong", fb:"Words influence interpretation, not the historical data values themselves." },
            { t:"It makes arithmetic impossibilities acceptable when the narrative is coherent. too", v:"danger", fb:"No framing can repair inconsistent summaries or nonexistent rows." },
            { t:"It proves that every reviewer who liked the paper acted dishonestly. too", v:"wrong", fb:"Bias can occur without intent or misconduct." }
          ] }
      ] },
    // cell: Data Auditor Sol @ The Journal's Editorial Office
    ps_rosenthal:{ sci:"Robert Rosenthal (1933–2024)", topic:"Experimenter effects & the file-drawer problem", lede:"He showed that researchers can shape outcomes through expectation—and that unpublished studies can shape an entire literature.", no:10, profile:"Robert Rosenthal studied how expectations, interpersonal signals, and selective publication influence psychological evidence. In experiments on experimenter expectancy, researchers who believed a particular result was likely sometimes obtained results in that direction, potentially through subtle differences in instruction, tone, timing, or coding. The lesson was not that all experiments are hopelessly contaminated, but that blinding and standardized procedures can reduce channels through which expectation enters the data.\n\nWith Lenore Jacobson, Rosenthal reported the controversial ‘Pygmalion in the Classroom’ study, which examined whether teacher expectations could affect student performance. The work became famous and generated extensive debate over design, interpretation, and effect size. That history itself is instructive: influential findings can be both generative and legitimately contested without being reducible to either revelation or fraud.\n\nRosenthal also helped draw attention to publication bias. The ‘file-drawer problem’ describes the possibility that studies with null or unfavorable results remain unpublished, making the visible literature look more consistently positive than the underlying research. He developed methods for combining evidence and assessing how missing studies might affect conclusions, though no single diagnostic can recover an unknown file drawer perfectly.\n\nIn the Mimicry inquiry, expectancy could explain modest differences if assistants knew conditions, and publication bias could explain why early articles looked unusually consistent. Neither mechanism creates participant records whose means and standard deviations are arithmetically impossible. Sol must first model ordinary bias, because misconduct should not be inferred when design can explain the pattern. Once the raw archive fails basic consistency checks, however, ‘experimenter effect’ becomes an inadequate dismissal rather than a humane alternative.",
      frame:"Sol opens the coding manual beside emails telling assistants what they should find. “Rosenthal gives us ordinary pathways for bias. We test those before invoking invention—and we do not use them to excuse impossible data.”", q:[
        { q:"What is an experimenter-expectancy effect?",
          o:[
            { t:"Researcher expectations subtly influence participants, procedures, or coding.", v:"expert", fb:"Blinding and standardization reduce opportunities for such influence." },
            { t:"Investigators consciously fabricate every result they hope to observe.", v:"danger", fb:"Expectancy effects can operate without deliberate deception." },
            { t:"Participants always guess the hypothesis and respond in the same direction.", v:"wrong", fb:"Demand characteristics vary and do not guarantee a uniform effect." },
            { t:"A p-value becomes smaller whenever the experimenter feels more confident.", v:"wrong", fb:"Confidence has no direct arithmetic operation on the p-value." }
          ] },
        { q:"What is the file-drawer problem?",
          o:[
            { t:"Unpublished null studies make the visible literature look too positive.", v:"expert", fb:"Selective availability can exaggerate apparent consistency and effect size." },
            { t:"Raw data are stored securely and therefore cannot be independently checked.", v:"partial", fb:"Restricted archives can impede checking, but that is not the classic meaning." },
            { t:"Journals deliberately erase every study that contains a statistical error.", v:"wrong", fb:"The problem concerns selective nonpublication, not universal deletion." },
            { t:"A single failed replication proves hundreds of hidden failures exist.", v:"danger", fb:"Missing studies must be investigated rather than assumed from one result." }
          ] },
        { q:"Why test ordinary bias mechanisms before fabrication?",
          o:[
            { t:"Expectation and selective reporting can create distortion without invented data.", v:"expert", fb:"A misconduct finding should exceed explanations supported by design and publication processes." },
            { t:"Because fabrication cannot occur in experiments involving human participants.", v:"wrong", fb:"Human-subject research is not immune to invented records." },
            { t:"Because any plausible bias explanation automatically clears the lead author.", v:"danger", fb:"An alternative must fit the full evidence, including arithmetic and provenance." },
            { t:"Because raw-data inconsistencies disappear once publication bias is modeled.", v:"wrong", fb:"Selection models cannot repair impossible participant-level summaries." }
          ] }
      ] },
    // cell: Dr. Ives @ The Journal's Editorial Office
    ps_ioannidis:{ sci:"John Ioannidis (b. 1965)", topic:"Why most published findings may be false", lede:"He used probability and research incentives to explain why a published claim can be significant yet still be unlikely to hold.", no:11, profile:"John Ioannidis brought wide attention to the reliability of published research with his 2005 essay ‘Why Most Published Research Findings Are False.’ The title was deliberately stark, but the argument was conditional rather than a count of all papers. Using a simple probabilistic framework, he showed how low prior plausibility, small studies, flexible analyses, bias, and many competing teams can make a statistically significant claim more likely to be false than researchers assume.\n\nThe positive predictive value of a finding depends not only on a p-value. It also depends on how many tested hypotheses are genuinely true, the power of the studies, and the extent of bias or selective reporting. In a field testing many speculative ideas with weak designs, even a conventional false-positive rate can produce a literature crowded with apparent discoveries. Larger, preregistered, well-powered, independently replicated studies improve the odds.\n\nIoannidis’s work has sometimes been flattened into ‘science is wrong.’ That is the opposite of its purpose. Reliability varies by design, field, question, and evidence chain. A false published conclusion can result from sampling variation, bias, poor methods, or misconduct; the framework does not identify which mechanism produced an individual paper.\n\nIves uses that distinction here. The Mimicry Effect emerged from a crowded search space, small samples, and a publication system hungry for surprising social effects, so an initial false positive was always plausible. But the archive introduces a case-specific claim: participant-level values do not generate the reported summaries. Ioannidis helps explain why reviewers should have demanded stronger evidence. He does not permit the panel to jump from a low predictive value to an accusation against Voss without reconstructing the data trail.",
      frame:"Ives writes “false claim ≠ fabricated data” on the journal’s decision letter. “Ioannidis tells us why publication is weak proof. He does not tell us who made these rows.”", q:[
        { q:"What factors can lower a finding’s positive predictive value?",
          o:[
            { t:"Low prior odds, weak power, bias, and many tested hypotheses.", v:"expert", fb:"A small p-value is only one part of the reliability calculation." },
            { t:"Large samples, preregistration, and successful independent replication.", v:"wrong", fb:"Those features generally strengthen rather than weaken reliability." },
            { t:"Any use of numerical analysis in a field studying human behavior.", v:"danger", fb:"Quantitative methods vary in quality and are not inherently unreliable." },
            { t:"Publishing a result in a journal with a selective review process.", v:"partial", fb:"Prestige does not guarantee truth, but selectivity alone is not the full framework." }
          ] },
        { q:"Does a false published finding imply fabrication?",
          o:[
            { t:"No; chance, bias, design flaws, or misconduct can each produce false claims.", v:"expert", fb:"Determining fabrication requires evidence about how the data were generated." },
            { t:"Yes; every incorrect conclusion originates in invented participant records.", v:"danger", fb:"Most scientific errors are not findings of deliberate fabrication." },
            { t:"No; publication makes misconduct logically impossible even when data vanish.", v:"wrong", fb:"Published work can still contain honest error or misconduct." },
            { t:"Yes, but only when later studies estimate a smaller effect size.", v:"wrong", fb:"Heterogeneity and sampling error can change estimates without fabrication." }
          ] },
        { q:"Which reform most directly improves evidential reliability?",
          o:[
            { t:"Preregistered, adequately powered tests with independent replication.", v:"expert", fb:"These practices limit flexibility and provide stronger opportunities for correction." },
            { t:"Treating the first significant result as the permanent benchmark.", v:"wrong", fb:"Early estimates are often unstable and should be updated." },
            { t:"Publishing only surprising outcomes to conserve journal space.", v:"danger", fb:"Novelty filtering intensifies selection bias." },
            { t:"Replacing raw-data review with the reputation of the research team.", v:"wrong", fb:"Authority cannot substitute for inspectable evidence." }
          ] }
      ] },
    // cell: Dr. Ives @ The Journal's Editorial Office
    ps_nosek:{ sci:"Brian Nosek (b. 1973)", topic:"The reproducibility project & open science", lede:"He turned a credibility problem into shared infrastructure: preregistrations, open materials, and replications conducted at scale.", no:12, profile:"Brian Nosek is a social psychologist and a leading organizer of open-science reform. His research on implicit cognition was accompanied by a growing concern that ordinary incentives—novelty, clean stories, publication pressure, and flexible analysis—could make the literature less reliable even when researchers intended to be honest. He co-founded the Center for Open Science to build tools and norms that make research more transparent and reproducible.\n\nNosek helped lead the Reproducibility Project: Psychology, a large collaboration that attempted replications of one hundred studies published in prominent psychology journals. The 2015 report found that replication effects were, on average, smaller than the originals and that substantially fewer replications reached statistical significance. The project did not estimate one eternal replication rate for all psychology, and its methods and interpretation prompted serious debate. Its larger achievement was to make systematic replication visible, collaborative, and inspectable.\n\nOpen-science practices address different vulnerabilities. Preregistration records hypotheses and analysis plans before outcomes are known. Registered Reports move peer review before results, reducing publication decisions based on whether findings are positive. Sharing materials and code allows others to reproduce procedures and calculations. Sharing participant data may be constrained by consent and privacy, so transparency also requires ethical governance rather than indiscriminate release.\n\nIves’s team followed these principles in the Mimicry replications: common materials, prospective plans, multiple laboratories, and public deviations. That makes their near-zero result more informative than a lone unpublished failure. Still, openness cannot retroactively create Voss’s missing sessions. The decisive audit compares reported summaries with the preserved participant table and acquisition logs. Nosek’s contribution is a system in which disagreement produces inspectable tests instead of rival press releases.",
      frame:"Ives opens the replication repository and the deviations log side by side. “Transparency does not make a study infallible. It makes the route from plan to result visible enough to challenge.”", q:[
        { q:"What did the Reproducibility Project: Psychology attempt?",
          o:[
            { t:"Coordinated replications of one hundred published psychology studies.", v:"expert", fb:"The collaboration tested a defined sample rather than all of psychology." },
            { t:"A forensic investigation proving that one hundred authors fabricated data.", v:"danger", fb:"Replication outcomes do not by themselves establish misconduct." },
            { t:"A survey asking researchers whether they personally believed their results.", v:"wrong", fb:"The project performed empirical replication attempts." },
            { t:"A ranking of journals based only on citation counts and press attention.", v:"wrong", fb:"Its focus was reproducibility, not popularity." }
          ] },
        { q:"What does preregistration primarily accomplish?",
          o:[
            { t:"Records hypotheses and analysis choices before researchers know the outcomes.", v:"expert", fb:"The time-stamped plan distinguishes confirmatory tests from later exploration." },
            { t:"Guarantees that the planned method is scientifically correct. too", v:"danger", fb:"A transparent plan can still be poorly designed." },
            { t:"Prevents researchers from conducting any exploratory analysis afterward.", v:"wrong", fb:"Exploration remains valuable when clearly labeled as such." },
            { t:"Makes participant consent unnecessary because the protocol is public.", v:"wrong", fb:"Transparency does not remove ethical duties to participants." }
          ] },
        { q:"Why are multi-lab replications useful?",
          o:[
            { t:"They test whether a result survives independent teams and varied settings.", v:"expert", fb:"Distributed evidence can reveal dependence on one laboratory or procedure." },
            { t:"They ensure every site obtains an identical numerical effect estimate.", v:"danger", fb:"Sampling and contextual variation remain even under shared protocols." },
            { t:"They replace the need to inspect the original raw-data archive.", v:"wrong", fb:"Replication and forensic reconstruction answer different questions." },
            { t:"They prove the theory false whenever one participating site reports zero.", v:"wrong", fb:"Inference should use the combined pattern and precision across sites." }
          ] }
      ] },
    // cell: Grad Student Rhee @ The Raw-Data Archive
    ps_simonsohn:{ sci:"Uri Simonsohn (behavioral scientist, p-curve method)", topic:"Detecting p-hacking in results", lede:"He learned to read a literature’s p-values as a distribution, looking for the fingerprints of selective analysis.", no:13, profile:"Uri Simonsohn is a behavioral scientist whose meta-scientific work examines how flexible analysis and selective reporting can distort published evidence. With Leif Nelson and Joseph Simmons, he demonstrated ‘researcher degrees of freedom’: defensible-looking choices about sample size, outcomes, covariates, exclusions, and stopping can greatly increase the chance of finding a publishable result if those choices are made after seeing the data.\n\nSimonsohn and colleagues developed p-curve, a method that examines the distribution of statistically significant p-values from a set of studies. If studies investigate a real effect with reasonable power, significant p-values should generally be right-skewed, with more very small values than values just below .05. A concentration immediately below .05 may suggest selective reporting or analysis. A flat or oddly shaped curve can indicate little evidential value, depending on assumptions and study selection.\n\nP-curve is not a fraud detector for individual authors. Its conclusions depend on collecting comparable tests, avoiding dependent or cherry-picked results, and interpreting the distribution in light of power and publication processes. Selective analysis can occur through motivated reasoning without invented participants. Conversely, a fabricator could manufacture p-values that look convincingly distributed if the method were anticipated.\n\nRhee therefore uses p-curve to understand the Mimicry literature, not to convict Voss. The suspicious pileup of barely significant results suggests that analytic flexibility may have shaped what reached print. The raw-data anomaly is different: exact group summaries cannot be produced from the archived integer responses, and session files are absent. Simonsohn teaches the panel to separate a biased literature-level pattern from direct evidence that one dataset lacks a plausible origin.",
      frame:"Rhee sorts published p-values into narrow bins. “This can show a literature leaning on the threshold. It cannot tell me who typed a participant row that never existed.”", q:[
        { q:"What pattern gives a p-curve evidential value?",
          o:[
            { t:"More very small significant p-values than values clustered just below .05.", v:"expert", fb:"Real effects with adequate power tend to produce a right-skewed significant distribution." },
            { t:"Every included study reporting exactly the same p-value.", v:"danger", fb:"Identical values would be unusual and are not the expected signature of evidence." },
            { t:"An equal number of significant and nonsignificant studies in every journal.", v:"wrong", fb:"P-curve typically analyzes selected significant tests rather than all outcomes." },
            { t:"A single p-value below .05 from the most prestigious laboratory.", v:"wrong", fb:"The method relies on a distribution of comparable tests, not authority." }
          ] },
        { q:"What are researcher degrees of freedom?",
          o:[
            { t:"Flexible analytic choices that can be selected after viewing outcomes.", v:"expert", fb:"Outcome-dependent choices inflate false positives even when each choice seems defensible." },
            { t:"Legal protections allowing investigators to withhold all research records.", v:"wrong", fb:"The term concerns analysis flexibility, not legal privilege." },
            { t:"The number of participants free to leave an experiment at any time.", v:"wrong", fb:"Voluntary participation is ethical consent, not the statistical concept." },
            { t:"Proof that every significant psychology result was deliberately manipulated.", v:"danger", fb:"Flexibility raises risk but does not establish intent or universal invalidity." }
          ] },
        { q:"Can p-curve prove Voss fabricated participant data?",
          o:[
            { t:"No; it diagnoses result patterns, while fabrication needs case-specific provenance.", v:"expert", fb:"A literature-level distribution cannot identify who created an individual record." },
            { t:"Yes; any pileup near .05 uniquely identifies invented observations. too", v:"danger", fb:"Selective analysis, publication bias, and low power can create similar patterns." },
            { t:"No; statistical tools can never contribute to a misconduct inquiry. too", v:"wrong", fb:"Statistics can reveal anomalies when combined with documentary evidence." },
            { t:"Yes, provided the published article has received enough citations. here", v:"wrong", fb:"Citation count does not convert p-curve into an authorship test." }
          ] }
      ] },
    // cell: Grad Student Rhee @ The Raw-Data Archive
    ps_gigerenzer:{ sci:"Gerd Gigerenzer (b. 1947)", topic:"The misuse of null-hypothesis testing", lede:"He attacked the ritual of turning one threshold into a scientific verdict and taught readers to ask what the numbers actually mean.", no:14, profile:"Gerd Gigerenzer studies decision-making, risk communication, and the misuse of statistics. He has criticized what he calls the ‘null ritual’: state a null hypothesis of exactly no effect, seek p below .05, and treat the result as a binary declaration of discovery. That ritual blends ideas from Fisher and Neyman–Pearson testing while often ignoring the assumptions and purposes of both.\n\nGigerenzer emphasizes that a p-value is not the probability that a hypothesis is true, and one minus the p-value is not the probability of successful replication. Statistical significance also says little about effect magnitude or practical importance. He advocates transparent frequencies, effect sizes, confidence intervals, and decision rules suited to the actual problem. In medical risk communication, for example, natural frequencies can make conditional probabilities easier to understand than percentages presented without a reference class.\n\nHe is also known for studying fast-and-frugal heuristics. A simple rule that uses a few cues can perform well in uncertain environments, especially when data are limited and complex models overfit. Simplicity is not the same as carelessness; the rule must be matched to the structure of the environment and tested against alternatives.\n\nThe journal treated the Mimicry paper’s p=.032 as a certificate that the effect existed. Gigerenzer would ask for the effect size, uncertainty, stopping rule, multiplicity, and actual prediction. A later p=.41 does not certify that the effect is absent either. Those cautions prevent bad inference. They cannot reconcile a standard deviation that no combination of the archived scores can produce. Once arithmetic rules out the published summary, statistical literacy directs attention back to data provenance rather than another threshold.",
      frame:"Rhee crosses out “significant = true” in the editor’s notes. “Gigerenzer would make us translate every probability sentence. Start with what p=.032 does not say.”", q:[
        { q:"What is the “null ritual”?",
          o:[
            { t:"Using a fixed p-value threshold as an automatic scientific verdict.", v:"expert", fb:"The ritual substitutes a binary rule for interpretation of design, size, and uncertainty." },
            { t:"Testing a precisely stated null model against a planned alternative.", v:"partial", fb:"Formal testing can be valid; the criticism targets mechanical, confused use." },
            { t:"Refusing to calculate any statistic when the sample is small.", v:"wrong", fb:"Gigerenzer argues for better statistical reasoning, not abandoning calculation." },
            { t:"Deleting all nonsignificant outcomes before submitting an article.", v:"danger", fb:"That is selective reporting, not the full meaning of the null ritual." }
          ] },
        { q:"What does p=.032 not mean?",
          o:[
            { t:"It does not mean there is a 3.2% chance the null is true.", v:"expert", fb:"A p-value conditions on the null rather than assigning it a posterior probability." },
            { t:"It does not depend on the test statistic and null assumptions.", v:"wrong", fb:"Those ingredients define the p-value." },
            { t:"It does not indicate how incompatible the data are with a null model.", v:"wrong", fb:"That incompatibility is precisely its intended role." },
            { t:"It does not require any observations to have been collected.", v:"danger", fb:"A legitimate p-value must derive from data and a specified procedure." }
          ] },
        { q:"What should accompany a significance result?",
          o:[
            { t:"Effect size, uncertainty, design details, and the number of analyses considered.", v:"expert", fb:"Those elements show magnitude and how much analytic opportunity surrounded the test." },
            { t:"Only a stronger adjective in the abstract when p falls below .01. too", v:"wrong", fb:"Rhetorical intensity does not improve evidence." },
            { t:"A guarantee that no later replication may revise the conclusion. too", v:"danger", fb:"Scientific estimates remain open to updating." },
            { t:"The removal of participant-level data to prevent alternative interpretations.", v:"wrong", fb:"Inspectable data and code strengthen rather than weaken evaluation." }
          ] }
      ] },
    // cell: Data Auditor Sol @ The Raw-Data Archive
    ps_greenwald:{ sci:"Anthony Greenwald (b. 1939)", topic:"Implicit measures & the replication debate", lede:"He helped build a reaction-time measure of automatic association, then spent decades defining what that measure can and cannot claim.", no:15, profile:"Anthony Greenwald is a social psychologist whose work has ranged from self and memory to implicit cognition. With Debbie McGhee and Jordan Schwartz, he introduced the Implicit Association Test, or IAT, in 1998. The task compares how quickly people categorize paired concepts—for example, flowers with pleasant words versus insects with pleasant words—under different key assignments.\n\nThe IAT measures relative association strength: performance depends on the contrast between categories and attributes in that particular task. It is not a direct meter of a hidden essence, and an individual score can be influenced by order, familiarity, context, and measurement error. Average differences across groups can be reliable even when person-level test–retest stability or prediction of a particular behavior is modest. Interpretation therefore requires matching the claim to the level and reliability of the measurement.\n\nThe IAT became enormously visible and controversial. Researchers have debated what constructs it captures, how strongly it predicts behavior, whether it should be used for individual diagnosis, and how interventions change scores. Greenwald and colleagues have continued to refine scoring and assess validity rather than treating the first version as beyond revision. That history shows how a real, replicable task can support narrower conclusions than popular summaries imply.\n\nSol applies that distinction to the Mimicry Effect. A weak relationship between an implicit measure and one behavior could reflect noisy measurement, context, or an overstated theory. It would not make the raw participants imaginary. Here, however, the supposedly millisecond-level response files contain repeated blocks with identical timing jitter and no device metadata. Greenwald’s work teaches restraint about psychological interpretation while leaving room for firm conclusions about whether a measurement stream is technically plausible.",
      frame:"Sol magnifies two blocks of reaction times until their last digits align. “An implicit measure can be noisy and still real. These files are not noisy in a way any keyboard produces.”", q:[
        { q:"What does the IAT measure most directly?",
          o:[
            { t:"Relative association strength inferred from differences in categorization speed.", v:"expert", fb:"The score compares performance across paired category arrangements." },
            { t:"A permanent unconscious trait independent of task and social context.", v:"danger", fb:"Scores are relative and influenced by measurement conditions." },
            { t:"A person’s guaranteed behavior in every future real-world situation.", v:"wrong", fb:"Prediction is probabilistic and generally modest at the individual level." },
            { t:"The moral worth of a participant based on one reaction-time session.", v:"wrong", fb:"A psychological measure cannot support that ethical judgment." }
          ] },
        { q:"Why can group reliability and individual diagnosis differ?",
          o:[
            { t:"Stable average differences can coexist with noisy person-level scores.", v:"expert", fb:"Measurement error has larger consequences when classifying one individual." },
            { t:"Groups have no variation, while every individual response is random.", v:"wrong", fb:"Groups contain variation and individual scores can carry some information." },
            { t:"Any significant group mean proves each member has the same association.", v:"danger", fb:"A group estimate does not determine every person’s score." },
            { t:"Individual diagnosis becomes valid whenever a task is widely discussed.", v:"wrong", fb:"Visibility does not establish reliability or validity." }
          ] },
        { q:"What makes the archived timing blocks technically suspicious?",
          o:[
            { t:"Identical jitter patterns recur without the device metadata expected from sessions.", v:"expert", fb:"Copied timing structure and missing acquisition traces challenge the files’ provenance." },
            { t:"Reaction times vary across participants and include occasional slow trials.", v:"wrong", fb:"That is an ordinary feature of human performance." },
            { t:"The mean effect is smaller than the estimate in the published article. too", v:"partial", fb:"A discrepancy merits checking but may arise through analysis or sampling." },
            { t:"Some individual scores change when task order is reversed. for this case", v:"wrong", fb:"Order effects are known and do not imply invented data." }
          ] }
      ] },
    // cell: Data Auditor Sol @ The Raw-Data Archive
    ps_bem:{ sci:"Daryl Bem (b. 1938)", topic:"The 'feeling the future' study that sparked the crisis", lede:"His experiments on “feeling the future” made an extraordinary claim—and exposed how standard methods could manufacture persuasive evidence without fabrication.", no:16, profile:"Daryl Bem is a social psychologist known for work on self-perception and, later, for a controversial set of experiments on precognition. His 2011 paper ‘Feeling the Future’ reported nine experiments in which familiar psychological tasks were reversed in time: a later event was proposed to influence an earlier response. Eight experiments were reported as statistically significant under the paper’s analyses.\n\nThe article was important not because it established psychic ability, but because it used methods that looked familiar in mainstream experimental psychology. Critics and replication teams challenged the evidence, analysis flexibility, stopping rules, and theoretical interpretation. The episode became a catalyst for simulation studies and demonstrations showing how undisclosed analytic choices can make improbable findings appear significant even when no observations are fabricated.\n\nBem made data available for some reanalyses and engaged publicly with critics. Subsequent replication evidence and meta-analyses have been disputed, with conclusions depending on inclusion, methods, and models. The responsible lesson is not that an extraordinary topic licenses ridicule or that significance licenses belief. A claim far from established knowledge needs especially strong, transparent, independently repeatable evidence.\n\nThe Mimicry inquiry resembles the episode at first: a striking claim, conventional p-values, and repeated failures. That pattern could arise from flexible analysis and publication bias. Sol therefore does not infer fabrication merely because the effect sounds implausible. The case turns when the reported group statistics cannot be generated from the supplied participant rows and acquisition logs show no sessions on key dates. Bem’s controversy teaches how weak methods can produce a false claim honestly; the archive tells whether this case went further.",
      frame:"Sol places the Mimicry article beside “Feeling the Future.” “An astonishing result can emerge from ordinary analytic flexibility. We do not call it fabrication until the records force that word.”", q:[
        { q:"Why did Bem’s 2011 paper become methodologically influential?",
          o:[
            { t:"It showed familiar methods could support an extraordinary, disputed conclusion.", v:"expert", fb:"The controversy exposed weaknesses in flexible analysis and publication practices." },
            { t:"It conclusively demonstrated that future events alter all earlier decisions.", v:"danger", fb:"The claimed phenomenon remains unestablished and heavily contested." },
            { t:"It was the first psychology article ever to use a p-value. as tested", v:"wrong", fb:"Significance testing had been standard for many decades." },
            { t:"It contained no experiments and relied entirely on philosophical argument.", v:"wrong", fb:"The paper reported nine experimental studies." }
          ] },
        { q:"What lesson should be drawn from failed replications of an extraordinary claim?",
          o:[
            { t:"Demand transparent analyses and cumulative evidence before accepting the claim.", v:"expert", fb:"Replication updates confidence without by itself diagnosing misconduct." },
            { t:"Assume the original author invented every participant immediately. too", v:"danger", fb:"False positives and analytic flexibility are alternative explanations." },
            { t:"Ignore the failures because unusual effects cannot recur on demand.", v:"wrong", fb:"A scientific claim needs conditions under which it can be tested." },
            { t:"Treat every nonsignificant replication as equivalent regardless of precision.", v:"wrong", fb:"Power and uncertainty determine how informative a failure is." }
          ] },
        { q:"What separates the Mimicry case from ordinary analytic flexibility?",
          o:[
            { t:"The archived rows cannot produce the published summaries or session trail.", v:"expert", fb:"Internal impossibility and missing acquisition records concern data origin itself." },
            { t:"The theory was surprising to reviewers when the article first appeared.", v:"wrong", fb:"Surprise changes evidential demands but does not prove fabrication." },
            { t:"Several replication teams reported effect estimates near zero.", v:"partial", fb:"That weakens the effect but does not establish how original data were created." },
            { t:"The lead author defended the work vigorously in public interviews.", v:"wrong", fb:"Public confidence is not forensic evidence either way." }
          ] }
      ] },
    // cell: Dr. Ives @ The Raw-Data Archive
    ps_stapel:{ sci:"Diederik Stapel (social psychologist, fabricated-data case)", topic:"How fabricated datasets were exposed", lede:"His students kept receiving polished datasets without seeing participants—until the elegance of the numbers became evidence against them.", no:17, profile:"Diederik Stapel was a prominent Dutch social psychologist whose career collapsed after junior researchers raised concerns about data he supplied. Stapel often claimed to collect data through schools or other outside settings, then gave collaborators completed spreadsheets for analysis. Students and co-authors did not necessarily see recruitment, consent, questionnaires, or data entry because the fieldwork was said to occur elsewhere.\n\nIn 2011, whistleblowers at Tilburg University brought suspicious patterns to department leaders. Investigations by multiple Dutch universities concluded that Stapel had fabricated data across many publications and projects. Reports described implausibly neat results, repeated patterns, and datasets created to fit hypotheses. Dozens of papers were eventually retracted. The scale was enabled by centralized control: collaborators could work honestly on analyses and manuscripts while the claimed observations remained inaccessible.\n\nThe case is not a simple story that statistics automatically catch fraud. Fabricated data can look noisy, and genuine data can contain duplicates or strange distributions. The strongest findings combined anomalies with missing source materials, impossible accounts of collection, testimony, and Stapel’s control over the data pipeline. It also exposed a supervisory culture in which elegant results and authority reduced ordinary questions about provenance.\n\nIves recognizes the architecture in Voss’s laboratory. Junior author Kline received a cleaned table but never handled recruitment; participant payments do not match the sample; and the acquisition server lacks the sessions Voss said were run off-site. The Stapel lesson is organizational: ask who could create a dataset without witnesses and who benefited from keeping collection separate from analysis. It also protects collaborators from guilt by association. Responsibility follows evidence of control and knowledge, not merely a name on the paper.",
      frame:"Ives closes the analysis script and asks for the enrollment log instead. “Stapel’s collaborators could rerun every model and still never touch a participant. Follow control of collection.”", q:[
        { q:"What organizational feature enabled Stapel’s fabrication?",
          o:[
            { t:"He supplied finished datasets while keeping collaborators away from collection.", v:"expert", fb:"Centralized, unwitnessed control separated honest analysis from invented observations." },
            { t:"Every co-author personally watched him alter each participant response.", v:"wrong", fb:"Many collaborators lacked direct access to the claimed data collection." },
            { t:"Journals prohibited researchers from requesting raw data from senior authors.", v:"wrong", fb:"Cultural deference mattered, but no universal prohibition created the scheme." },
            { t:"The studies used qualitative interviews that could not produce numerical files.", v:"wrong", fb:"The misconduct involved quantitative datasets presented as collected observations." }
          ] },
        { q:"What evidence made the Stapel finding stronger than statistical suspicion?",
          o:[
            { t:"Anomalies converged with missing sources, false collection accounts, and control.", v:"expert", fb:"Documentary and organizational evidence connected patterns to fabrication." },
            { t:"His results were unusually interesting and received extensive media coverage.", v:"wrong", fb:"Novelty and publicity do not establish misconduct." },
            { t:"Some replications reported smaller effects than the original papers. too", v:"partial", fb:"Replication failure can raise questions but does not identify invention." },
            { t:"A single decimal digit appeared twice in one spreadsheet column. here", v:"danger", fb:"Ordinary datasets contain repetitions; context and broader convergence are required." }
          ] },
        { q:"How should co-author responsibility be assessed?",
          o:[
            { t:"By access, knowledge, decisions, and control rather than authorship alone.", v:"expert", fb:"A byline warrants scrutiny but does not prove participation in fabrication." },
            { t:"Every listed author should receive the same finding regardless of evidence.", v:"danger", fb:"Collective punishment erases differences in conduct and knowledge." },
            { t:"Junior researchers can never bear responsibility for checking supplied data.", v:"wrong", fb:"They have duties, though power and access affect what checks are possible." },
            { t:"Only the journal editor can be responsible once an article is published.", v:"wrong", fb:"Editorial review does not replace author and institutional responsibilities." }
          ] }
      ] },
    // cell: Dr. Ives @ The Raw-Data Archive
    ps_hauser:{ sci:"Marc Hauser (cognitive scientist, misconduct case)", topic:"Data integrity in the lab", lede:"Questions about missing tapes, disputed coding, and laboratory authority showed why raw records must outlive a persuasive summary.", no:18, profile:"Marc Hauser built an influential research program on animal cognition, moral judgment, and the evolution of mind. His laboratory used experiments with primates and other subjects in which behavior was recorded, coded, and interpreted. Such studies can depend heavily on video, trial definitions, observer judgment, and clear links between the original event and the spreadsheet later analyzed.\n\nConcerns raised within the laboratory led Harvard University to investigate research practices. In 2010 the university found Hauser responsible for research misconduct in multiple instances. Papers were retracted or corrected, and federal review later identified misconduct findings involving data fabrication or falsification in supported research. The details varied across studies, but disputes over video records, coding, and the reporting of experiments illustrated how fragile a result becomes when source evidence is unavailable or does not support the published account.\n\nThe case also drew attention to the position of trainees. Junior researchers may be the people closest to day-to-day records yet face substantial risks when challenging a senior laboratory leader. Institutions need retention policies, independent reporting routes, clear coding protocols, and supervision that does not allow one person to control both ambiguous evidence and the final interpretation.\n\nIves applies those safeguards to the Mimicry archive. Some discrepancies could be coding errors; a misplaced condition label can alter a summary without inventing a participant. The audit therefore reconstructs each step from consent and time stamp to response file, coded row, and published table. For the critical sessions, the chain stops before any human response exists. Hauser’s lesson is neither that all disputed coding is fraud nor that ambiguity excuses missing sources. Preserve the source, document transformations, and let independent reviewers trace the claim.",
      frame:"Ives asks for the files before discussing the theory. “Coding disagreements can be honest. A claim with no source recording cannot be resolved by seniority.”", q:[
        { q:"Why are source recordings important in behavior-coding studies?",
          o:[
            { t:"They let independent reviewers compare coded judgments with observed events.", v:"expert", fb:"A preserved source anchors later classifications and resolves disputes." },
            { t:"They guarantee every observer will interpret ambiguous behavior identically.", v:"danger", fb:"Coding can still require rules, training, and reliability checks." },
            { t:"They make participant consent and data-security protections unnecessary.", v:"wrong", fb:"Recordings increase, rather than remove, privacy obligations." },
            { t:"They replace the need to document how trials were selected for analysis.", v:"wrong", fb:"Selection and coding both require transparent records." }
          ] },
        { q:"What institutional safeguard protects data integrity and trainees?",
          o:[
            { t:"Retained source data, independent reporting paths, and explicit coding rules.", v:"expert", fb:"The combination reduces concentrated control and supports review." },
            { t:"Allowing only the laboratory director to view original recordings.", v:"danger", fb:"Exclusive control makes correction and verification harder." },
            { t:"Deleting disputed trials before anyone outside the lab can inspect them.", v:"wrong", fb:"Destruction removes the evidence needed to resolve disagreement." },
            { t:"Treating a senior author’s memory as superior to time-stamped files.", v:"wrong", fb:"Contemporaneous records are generally more reliable than retrospective authority." }
          ] },
        { q:"How should an auditor distinguish coding error from fabrication?",
          o:[
            { t:"Trace each transformation and determine whether any source event existed.", v:"expert", fb:"An incorrect code can be corrected; an absent claimed event raises a deeper issue." },
            { t:"Assume every disagreement over a category is deliberate falsification.", v:"danger", fb:"Ambiguous observations can produce honest coding differences." },
            { t:"Ignore source files whenever the published group mean seems plausible.", v:"wrong", fb:"A plausible summary does not establish a valid evidential chain." },
            { t:"Decide solely by counting how many papers cite the laboratory.", v:"wrong", fb:"Citation influence has no bearing on the provenance of a disputed trial." }
          ] }
      ] }
  },
  STORIES:{
    ps_grad:{ ps_lab:"Rhee stands among unused response pads and numbered cubicles. “I ran the follow-ups exactly as written,” she says. “Real subjects missed keys, asked questions, and left uneven files. Voss’s originals never do.”", ps_journal:"Rhee opens the revision history beside the editor’s praise. “Kline asked to describe the failures,” she says. “Voss removed the paragraph and called the new sample decisive.”", ps_dataroom:"Rhee matches participant codes against payment receipts. “Half these people were supposedly tested on days the building was closed,” she says. “The spreadsheet is crowded; the corridor was empty.”" },
    ps_auditor:{ ps_lab:"Sol checks the keyboard clock against a calibration log. “Human timing has structure and hardware leaves metadata,” he says. “These blocks repeat the same jitter as if someone copied the noise.”", ps_journal:"Sol writes the published means on the office glass and recomputes them from the supplement. “Rounding cannot bridge this gap,” he says. “One of these tables did not come from the other.”", ps_dataroom:"Sol loads the untouched archive in read-only mode. “For the stated sample size, this mean and standard deviation cannot coexist with integer responses,” he says. “That is arithmetic, not taste.”" },
    ps_replicator:{ ps_lab:"Ives sets the preregistered protocol beside three laboratories’ session logs. “The procedure runs,” she says. “The famous effect does not, and our null is precise enough to matter.”", ps_journal:"Ives slides a multi-lab report across the editorial desk. “A failed replication is not a misconduct verdict,” she says. “It is the reason the original evidence must become inspectable.”", ps_dataroom:"Ives traces the acquisition directory to a blank week in the server backup. “Voss said the sessions happened here,” she says. “There are summaries, but no events from which to summarize.”" }
  },
  story:["<b>The Mimicry Effect</b> seemed almost theatrical: a brief cue, a measurable change in behavior, and a graph clean enough to redraw a field around it. Independent laboratories now run the same procedure and watch the celebrated line flatten.","You may question <b>Grad Student Rhee</b>, who performed the follow-up sessions; <b>Data Auditor Sol</b>, who can test whether summaries are mathematically possible; and <b>Dr. Ives</b>, whose replication network recorded every plan, deviation, and result.","Prof. Adrian Voss, Dr. Kline, and the journal editor each controlled a different gate between experiment and fame. The panel is tempted by <b>a landmark, field-defining effect</b> and by <b>a fragile fluke—just noise, best forgotten</b>. Either conclusion can be reached without opening the participant archive.","The journal meets in eight days to decide whether the article remains its flagship result. Before then, backups will rotate and witnesses will disperse; your finding must identify who acted, where the proof converges, and what the evidence supports."],
  endings:{ overclaimWhat:"ps_landmark", dismissalWhat:"ps_noise",
    win:{ expertTitle:"The Participants Who Never Arrived", expert:["You identify <b>Prof. Adrian Voss—the celebrated lead author</b>, <b>the Raw-Data Archive</b>, and <b>fabricated data behind the famous result</b>. The archived rows cannot generate the published means and deviations, copied timing jitter recurs across supposed sessions, payment and building logs contradict enrollment, and the acquisition server contains no source events. Not a landmark effect. Not a fragile fluke.","Your finding also separates bad method from invented evidence. Flexible analyses and publication bias helped the claim flourish, while failed replications justified scrutiny but did not prove misconduct. Voss alone controlled the off-site collection story and supplied the finished table; Kline analyzed what was received, and the editor amplified it without seeing source files. The paper is retracted and the archive preserved for a broader review."], soundTitle:"An Archive That Cannot Balance", sound:["You correctly name Prof. Adrian Voss, the Raw-Data Archive, and fabricated data behind the famous result. Impossible summary statistics, repeated timing patterns, and absent session records establish more than an unstable effect or an ordinary analytical mistake.","The panel accepts the accusation. Your account leaves some editorial and supervisory failures underdeveloped, but it connects the decisive records to Voss’s exclusive control strongly enough for retraction and formal investigation."], namedTitle:"The Right Finding", named:["You name Prof. Adrian Voss, the Raw-Data Archive, and fabricated data behind the famous result. The conclusion is correct, though you do not fully distinguish replication failure, analytic flexibility, and direct evidence that the participants were never recorded.","The journal halts promotion of the paper. Its final decision will need the chain you only outlined, so that a misconduct finding is not mistaken for punishment of a controversial theory."] },
    overclaim:{ title:"The Landmark Built from a Summary Table", body:["You defend the Mimicry Effect as a field-defining discovery. That verdict treats one polished article as stronger than participant arithmetic, copied timing patterns, payment records, and an acquisition directory with no sessions behind the decisive sample.","The journal turns scrutiny into a story about timid science attacking genius. Voss’s table remains the benchmark, honest replications are dismissed as incompetence, and the specific evidence of fabrication loses force beneath a public argument about whether the theory sounds exciting."] },
    dismissal:{ title:"Noise Does Not Invent Participants", body:["You dismiss the result as a fragile fluke best forgotten. Sampling error and flexible analysis can erase an effect, but they cannot create impossible standard deviations, duplicate device jitter, or sessions that leave no enrollment, payment, or acquisition trace.","By calling the case ordinary noise, you spare the journal embarrassment and leave the raw archive unexamined. Junior researchers inherit suspicion, the fabricated article remains citable, and the laboratory learns that nonexistent participants can be excused as a replication problem."] },
    wrongNames:{ title:"The Data, Misassigned", body:["You recognize that the famous result rests on fabricated data, but accuse the wrong person or locate the act outside the Raw-Data Archive. The unresolved link is where nonexistent sessions became participant rows and those rows became the published statistics—"] } },
}};
from pathlib import Path
import re,json
ROOT=Path(__file__).resolve().parent
NAMES=['safety','trial','planetary','changeover','mars','headwater','groundtruth','carrying']
def blocks(s):
 return list(re.finditer(r'^## Stop (\d+) - ([^\n]+)\n(.*?)(?=^## Stop |^## Mission outcome)',s,re.M|re.S))
def field(b,label):
 m=re.search(r'\*\*'+re.escape(label)+r':\*\*\s*(.*?)(?=\n\s*\n|\n\*\*)',b,re.S)
 return re.sub(r'\s+',' ',m.group(1)).strip() if m else ''
import yaml,collections,hashlib
OUT=ROOT
results=[];errors=[]
for k in NAMES:
 p=OUT/f'{k.upper()}_Round13.md';s=p.read_text();ms=blocks(s)
 reasons=[field(m[0],'Stop reason - exact player copy') for m in ms]
 connections=[field(m[0],'Question card story-science connection - exact player copy') for m in ms]
 assert len(ms)==60 and len(set(reasons))==60 and len(set(connections))==60,k
 overlap=[];rails=steps=figures=0
 for m in ms:
  r=field(m[0],'Stop reason - exact player copy');scene=field(m[0],'Question card story setup - exact player copy')
  assert r and scene and field(m[0],'Question card prompt - exact player copy'),(k,m[1])
  if r in scene:overlap.append(m[1])
  ys=re.findall(r'```yaml\n(derive:.*?)```',m[0],re.S)
  if ys:
   d=yaml.safe_load(ys[-1])['derive'];assert 'steps' in d,(k,m[1]);rails+=1
   assert isinstance(d.get('givens'),list) and d['givens'],(k,m[1],'givens')
   for st in d['steps']:
    cs=st['candidates'];assert len(cs)==2 and sum(c.get('correct') is True for c in cs)==1,(k,m[1])
    assert cs[0]['text']!=cs[1]['text'];steps+=1
 assert not overlap,(k,overlap)
 for f in re.finditer(r'\*\*Figure - exact player copy:\*\*\s*```json\s*(.*?)```',s,re.S):
  obj=json.loads(f[1]);kind=obj.get('kind');figures+=1
  if kind=='bars':assert isinstance(obj.get('bars'),list) and all('name' in b and isinstance(b.get('value'),(int,float)) for b in obj['bars']) and 'series' not in obj,(k,'bars')
  if kind in ['line','peaks']:assert isinstance(obj.get('series'),list) and all('points' in a for a in obj['series']),(k,kind)
  assert not any(x in obj for x in ['y2Label','yAxis2','secondaryYAxis']),(k,'axis')
 assert '\u2014' not in s,k
 assert 'other symbols as above' not in s and 'q-hat=1-p-hat; subscripts mark arms' not in s
 results.append({'campaign':k,'stops':60,'unique_reasons':60,'unique_connections':60,'reason_setup_repeats':0,'derive_rails':rails,'two_choice_steps':steps,'figure_blocks':figures,'sha256':hashlib.sha256(s.encode()).hexdigest()})
for k in ['headwater','trial','groundtruth']:
 s=(OUT/f'{k.upper()}_Round13.md').read_text();w=re.search(r'```yaml\n(warmups:.*?)```',s,re.S)
 assert w,k
 entries=yaml.safe_load(w[1])['warmups']
 assert {x['day'] for x in entries}>={4,8,13} and all(x.get('title') and x.get('why') for x in entries)
s=(OUT/'CARRYING_Round13.md').read_text()
for m in blocks(s):
 f=field(m[0],'Format/placement')
 if any(fmt in f for fmt in ['BALLPARK','BALANCE','BELT','VALUE','SCIENCETANK','DERIVE']):assert 'asked by' not in f,(m[1],f)
print(json.dumps(results,indent=2))

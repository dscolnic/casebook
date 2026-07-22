// Rebuilds each ../diagnosis/<id>_playable.html by inlining its data pack.
// Packs (diagnosis_build/pack_*.js) are the source of truth.
// Usage: node diagnosis_build/build_diagnosis.js
const fs=require("fs"),path=require("path");
const DIR=__dirname, DIAG=path.join(DIR,"..","diagnosis");
function span(h){const i=h.indexOf("const PACK=");const a=h.indexOf("{",i);let d=0,q=false,e=false,sc="",end=-1;
  for(let k=a;k<h.length;k++){const c=h[k];if(q){if(e)e=false;else if(c==="\\")e=true;else if(c===sc)q=false;}else{if(c==='"'||c==="'"){q=true;sc=c;}else if(c==="{")d++;else if(c==="}"){d--;if(!d){end=k+1;break;}}}}
  return{start:a,end};}
function build(){
  const manifest=JSON.parse(fs.readFileSync(path.join(DIR,"manifest.json"),"utf8"));
  for(const {id,file} of manifest){
    const P=require(path.join(DIR,"pack_"+id+".js")).PACK;
    const fp=path.join(DIAG,file);let h=fs.readFileSync(fp,"utf8");
    const {start,end}=span(h);
    h=h.slice(0,start)+JSON.stringify(P).replace(/<\//g,"<\\/")+h.slice(end);
    fs.writeFileSync(fp,h);
  }
  console.log("built "+manifest.length+" diagnosis case files from packs");
}
if(require.main===module)build();
module.exports={build};

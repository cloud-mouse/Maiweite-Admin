import{d as C,r as h,ak as w,o as x,c as g,a as m,a0 as k,W as N,_ as U}from"./@vue-pvvZVrFb.js";const v=5*1024*1024,f=navigator.hardwareConcurrency||4;async function y(l,n=v){return new Promise((i,c)=>{try{const t=[],e=Math.ceil(l.size/n),o=Math.ceil(e/f);let p=0;for(let u=0;u<f;u++){const d=new Worker(new URL(""+new URL("../webworker-iBF0DH3R.js",import.meta.url).href,import.meta.url)),a=u*o;let r=a+o;r>e&&(r=e),d.postMessage({file:l,chunkSize:n,startIndex:a,endIndex:r}),d.onmessage=_=>{for(let s=a;s<r;s++)t[s]=_.data[s-a];d.terminate(),p++,p===f&&i(t)}}}catch(t){c(t)}})}const R={class:"bg-#fff p-36px"},B=C({__name:"index",setup(l){const n=h(null),i=t=>{const e=t.target.files[0];n.value=e},c=async()=>{n.value&&await y(n.value)};return(t,e)=>{const o=w("el-button");return x(),g("div",R,[m("input",{type:"file",name:"",onChange:i},null,32),e[1]||(e[1]=m("hr",null,null,-1)),k(o,{onClick:c},{default:N(()=>e[0]||(e[0]=[U(" 点击上传 ")])),_:1})])}}});export{B as default};

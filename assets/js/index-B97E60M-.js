import{_ as x,a as U,b as V}from"./index-C_QSkHYq.js";import{_ as S,a as w}from"./index.vue_vue_type_script_setup_true_lang-B6rtLIgD.js";import{a as c}from"./element-plus-C-DFkfq5.js";import{d as y,r as d,o as I,c as B,a0 as t,W as p,a,k as u,A as r}from"./@vue-pvvZVrFb.js";import"./index.vue_vue_type_script_setup_true_lang-6EwJ9N-Y.js";import"./@iconify-CaxNw4tt.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./lodash-es-l8Yk8yFo.js";import"./@vueuse-T0N5pcum.js";import"./nprogress-D_ytO6nf.js";import"./@imengyu-CJXSuKKD.js";import"./vue-CFNvRKsS.js";import"./@element-plus-B1SGd3PH.js";import"./@sxzz-D9SI2xQl.js";import"./@ctrl-r5W6hzzQ.js";import"./dayjs-BU0tXZvT.js";import"./async-validator-CRbnkQr6.js";import"./memoize-one-BdPwpGay.js";import"./normalize-wheel-es-B6fDCfyv.js";import"./@floating-ui-DiM7Jq06.js";const F={class:"p-10px"},O={class:"py-2"},z={class:"py-2"},C={class:"py-2"},oo=y({name:"FileUpload",__name:"index",setup(E){const s=d(""),f=o=>{o.code===200?s.value=o.data.path:c.warning(o.message)},n=d(["https://picsum.photos/400","https://picsum.photos/600","https://picsum.photos/500"]),_=d([{name:"xxxx文件.zip",url:"http://images.lookbi.com/uploads/apply/96/d8521fc691e472eec91a170201866e7d.zip"}]);function g(o){o.code===200?n.value.push(o.data.path):c.warning(o.message)}function h(o,e,i){o.code===200?_.value.push({name:e.name,url:o.code===200?o.data.path:""}):(i.pop(),c.warning(o.error))}return(o,e)=>{const i=S,b=x,l=w,k=U,v=V;return I(),B("div",F,[t(i,{title:"上传"},{content:p(()=>e[2]||(e[2]=[a("p",null,"ImageUpload / ImagesUpload / FileUpload",-1),a("p",{style:{"margin-bottom":"0"}}," 进行了上传大小的限制 ",-1)])),_:1}),t(l,{title:"单图上传"},{default:p(()=>[a("div",O,[t(b,{modelValue:u(s),"onUpdate:modelValue":e[0]||(e[0]=m=>r(s)?s.value=m:null),action:"https://mock.apipost.net/mock/33b58cb934de000/?apipost_id=3b58d9a4fe6001",name:"image",width:250,height:150,onOnSuccess:f},null,8,["modelValue"])])]),_:1}),t(l,{title:"多图上传（默认最多3张）"},{default:p(()=>[a("div",z,[t(k,{modelValue:u(n),"onUpdate:modelValue":e[1]||(e[1]=m=>r(n)?n.value=m:null),action:"https://mock.apipost.net/mock/33b58cb934de000/?apipost_id=3b58d9a4fe6001",name:"image",onOnSuccess:g},null,8,["modelValue"])])]),_:1}),t(l,{title:"文件上传（默认最多3个）"},{default:p(()=>[a("div",C,[t(v,{files:u(_),action:"https://mock.apipost.net/mock/33b58cb934de000/?apipost_id=3b58d9a4fe6001",onOnSuccess:h},null,8,["files"])])]),_:1})])}}});export{oo as default};

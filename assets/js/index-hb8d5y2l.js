import{_ as U,a as V,b as S}from"./index-C_QSkHYq.js";import{_ as w,a as y}from"./index.vue_vue_type_script_setup_true_lang-B6rtLIgD.js";import{a as c}from"./element-plus-C-DFkfq5.js";import{d as I,r,o as b,c as j,a0 as t,W as s,a,k as u,A as _}from"./@vue-pvvZVrFb.js";import"./index.vue_vue_type_script_setup_true_lang-6EwJ9N-Y.js";import"./@iconify-CaxNw4tt.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./lodash-es-l8Yk8yFo.js";import"./@vueuse-T0N5pcum.js";import"./nprogress-D_ytO6nf.js";import"./@imengyu-CJXSuKKD.js";import"./vue-CFNvRKsS.js";import"./@element-plus-B1SGd3PH.js";import"./@sxzz-D9SI2xQl.js";import"./@ctrl-r5W6hzzQ.js";import"./dayjs-BU0tXZvT.js";import"./async-validator-CRbnkQr6.js";import"./memoize-one-BdPwpGay.js";import"./normalize-wheel-es-B6fDCfyv.js";import"./@floating-ui-DiM7Jq06.js";const B={class:"py-2"},C={class:"py-2"},E={class:"py-2"},Z=I({name:"ComponentExampleUpload",__name:"index",setup(M){const p=r("https://picsum.photos/750/450"),n=r(["https://picsum.photos/400","https://picsum.photos/600","https://picsum.photos/500"]),d=r([{name:"xxxx文件.zip",url:"http://images.lookbi.com/uploads/apply/96/d8521fc691e472eec91a170201866e7d.zip"}]);function f(o){o.error===""?p.value=o.data.path:c.warning(o.error)}function g(o){o.error===""?n.value.push(o.data.path):c.warning(o.error)}function h(o,e,l){o.error===""?d.value.push({name:e.name,url:o.error===""?o.data.path:""}):(l.pop(),c.warning(o.error))}return(o,e)=>{const l=w,k=U,i=y,v=V,x=S;return b(),j("div",null,[t(l,{title:"上传"},{content:s(()=>e[2]||(e[2]=[a("p",null,"ImageUpload / ImagesUpload / FileUpload",-1),a("p",{style:{"margin-bottom":"0"}}," 由于线上演示环境开启了 Mock ，会导致上传功能报错，请在本地运行并查看演示 ",-1)])),_:1}),t(i,{title:"单图上传"},{default:s(()=>[a("div",B,[t(k,{modelValue:u(p),"onUpdate:modelValue":e[0]||(e[0]=m=>_(p)?p.value=m:null),action:"https://console-mock.apipost.cn/app/mock/project/1f50f1da-5189-4282-d3c7-c133a514c5a8/upload/image",name:"image",width:250,height:150,onOnSuccess:f},null,8,["modelValue"])])]),_:1}),t(i,{title:"多图上传（默认最多3张）"},{default:s(()=>[a("div",C,[t(v,{modelValue:u(n),"onUpdate:modelValue":e[1]||(e[1]=m=>_(n)?n.value=m:null),action:"https://console-mock.apipost.cn/app/mock/project/1f50f1da-5189-4282-d3c7-c133a514c5a8/upload/image",name:"image",onOnSuccess:g},null,8,["modelValue"])])]),_:1}),t(i,{title:"文件上传（默认最多3个）"},{default:s(()=>[a("div",E,[t(x,{files:u(d),action:"https://console-mock.apipost.cn/app/mock/project/1f50f1da-5189-4282-d3c7-c133a514c5a8/upload/file",onOnSuccess:h},null,8,["files"])])]),_:1})])}}});export{Z as default};

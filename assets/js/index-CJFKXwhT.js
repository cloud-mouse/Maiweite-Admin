import{d as D,i as r,r as y,b,o as u,c as h,a as l,F,ac as M,q as j,$ as w,a0 as c,W as V,k as s,S as q,X as z,a1 as A}from"./@vue-pvvZVrFb.js";import{d as E}from"./vuedraggable-7fz3Quyg.js";import{p}from"./index-Crd8CkpA.js";import{g as B,f as G}from"./index-CoarhIUY.js";import{_ as I}from"./icon.vue_vue_type_script_setup_true_lang-DMo2cqec.js";import"./@imengyu-CJXSuKKD.js";import"./vue-CFNvRKsS.js";import"./sortablejs-CSbe8mM5.js";import"./floating-vue-4fuRf8vs.js";import"./@floating-ui-DiM7Jq06.js";import"./overlayscrollbars-DIcyBJd7.js";import"./vue-m-message-DjrEUVXL.js";import"./element-plus-C-DFkfq5.js";import"./lodash-es-l8Yk8yFo.js";import"./@vueuse-T0N5pcum.js";import"./nprogress-D_ytO6nf.js";import"./@element-plus-B1SGd3PH.js";import"./@sxzz-D9SI2xQl.js";import"./@ctrl-r5W6hzzQ.js";import"./dayjs-BU0tXZvT.js";import"./async-validator-CRbnkQr6.js";import"./memoize-one-BdPwpGay.js";import"./normalize-wheel-es-B6fDCfyv.js";import"./crypto-js-B0zqdDQ0.js";import"./pinia-DSCqkA4F.js";import"./vue-demi-Dq6ymT-8.js";import"./colord-CrBFWQzZ.js";import"./monaco-editor-Dhhxw_oD.js";import"./vue-router-EGzKxKvl.js";import"./path-browserify-OMgzBbgZ.js";import"./axios-CRnBnh7r.js";import"./@iconify-CaxNw4tt.js";import"./vite-plugin-mock-Bh-DZNsC.js";import"./mockjs-CK6d0B8Y.js";import"./index.vue_vue_type_script_setup_true_lang-6EwJ9N-Y.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const W={class:"elegant-component-view flex flex-col"},X={class:"flex flex-1 overflow-auto"},H={class:"elegant-tabs-box"},J=["title","onClick"],K={class:"box-border h-full flex-1 overflow-auto py-2"},O={class:"elegant-search-box px-10px py-6px"},Q=["onClick"],R={class:"elegant-component-label w-0 flex-1 truncate"},Y={class:"pt-42px text-center text-gray-400"},Fe=D({__name:"index",setup(Z){const L=p.getComponent("input"),g=r("pageSchema"),v=r("designer"),N=r("revoke"),$=r("designerProps"),f=p.getComponentSchemaGroups(),n=y(""),x={title:"全部",list:[]},i=y(x),P=b(()=>[x,...f.value]),m=b(()=>{let o=i.value.list;if(i.value.title==="全部"){const t=f.value.map(e=>e.list);o=[].concat(...t)}return o.filter(t=>{var e;return((e=t.label)==null?void 0:e.includes(n.value))&&(!$.value.formMode||t.type!=="form")})});function T(o){i.value=o}function U(o){var k,C,S;const t=G(g.schemas,((k=v.state.checkedNode)==null?void 0:k.id)??"root");if(!t)return!1;let{list:e,schema:a,index:d}=t;a.children&&!((S=(C=p.getComponentConfingByType(a.type))==null?void 0:C.editConstraints)!=null&&S.childImmovable)&&(e=a.children,d=a.children.length-1);const _=B(o);e.splice(d+1,0,_),v.setCheckedNode(_),N.push(g.schemas,"插入组件")}return(o,t)=>(u(),h("div",W,[l("div",X,[l("div",H,[(u(!0),h(F,null,M(P.value,(e,a)=>(u(),h("div",{key:a,class:j(["elegant-tab cursor-pointer truncate",{checked:i.value.title===e.title}]),title:e.title,onClick:d=>T(e)},w(e.title),11,J))),128))]),l("div",K,[l("div",O,[c(s(L),{modelValue:n.value,"onUpdate:modelValue":t[0]||(t[0]=e=>n.value=e),value:n.value,"onUpdate:value":t[1]||(t[1]=e=>n.value=e),placeholder:"搜索组件",clearable:"","allow-clear":""},{prefix:V(()=>[c(s(I),{class:"text-$elegant-text-helper",name:"icon--elegant--search-rounded"})]),_:1},8,["modelValue","value"])]),c(s(E),q({modelValue:m.value,"onUpdate:modelValue":t[2]||(t[2]=e=>m.value=e)},{group:{name:"edit-draggable",pull:"clone",put:!1},sort:!1,animation:180,ghostClass:"moving"},{clone:s(B),"item-key":"id",class:"grid grid-cols-[auto_auto] gap-2 px-10px"}),{item:V(({element:e})=>[l("div",{class:"elegant-component-item flex items-center truncate",onClick:a=>U(e)},[c(s(I),{name:s(p).getComponentConfingByType(e.type).icon??""},null,8,["name"]),l("div",R,w(e.label),1)],8,Q)]),_:1},16,["modelValue","clone"]),z(l("div",Y," 没有查询到的组件 ",512),[[A,!m.value.length]])])])]))}});export{Fe as default};

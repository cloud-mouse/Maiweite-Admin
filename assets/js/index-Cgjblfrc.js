import{p as b}from"./index-Crd8CkpA.js";import{_ as C}from"./icon.vue_vue_type_script_setup_true_lang-DMo2cqec.js";import{d as y,i as N,o as t,c as s,F as w,ac as $,k as o,Z as u,V as x,a as i,$ as B,a8 as f,r as g,b as S,s as V,a0 as k,q as v,Y as H}from"./@vue-pvvZVrFb.js";import"./floating-vue-4fuRf8vs.js";import"./@floating-ui-DiM7Jq06.js";import"./overlayscrollbars-DIcyBJd7.js";import"./vue-m-message-DjrEUVXL.js";import"./element-plus-C-DFkfq5.js";import"./lodash-es-l8Yk8yFo.js";import"./@vueuse-T0N5pcum.js";import"./nprogress-D_ytO6nf.js";import"./@imengyu-CJXSuKKD.js";import"./vue-CFNvRKsS.js";import"./@element-plus-B1SGd3PH.js";import"./@sxzz-D9SI2xQl.js";import"./@ctrl-r5W6hzzQ.js";import"./dayjs-BU0tXZvT.js";import"./async-validator-CRbnkQr6.js";import"./memoize-one-BdPwpGay.js";import"./normalize-wheel-es-B6fDCfyv.js";import"./crypto-js-B0zqdDQ0.js";import"./pinia-DSCqkA4F.js";import"./vue-demi-Dq6ymT-8.js";import"./colord-CrBFWQzZ.js";import"./monaco-editor-Dhhxw_oD.js";import"./vue-router-EGzKxKvl.js";import"./path-browserify-OMgzBbgZ.js";import"./axios-CRnBnh7r.js";import"./@iconify-CaxNw4tt.js";import"./vite-plugin-mock-Bh-DZNsC.js";import"./mockjs-CK6d0B8Y.js";const R={class:"elegant-breadcrumb h-40px flex items-center truncate py-2 pl-4"},j={key:0,class:"flex items-center"},z={key:0},D=["onClick","onMouseenter"],F=y({__name:"breadcrumb",setup(M){const e=N("designer");function m(l){e.setCheckedNode(l)}return(l,a)=>(t(),s("div",R,[(t(!0),s(w,null,$(o(e).state.matched,(n,c)=>{var p;return t(),s("span",{key:c},[c>o(e).state.matched.length-4?(t(),s("span",j,[o(e).state.matched.length>3&&c===o(e).state.matched.length-3?(t(),s("span",z,"...")):u("",!0),c!==0?(t(),x(o(C),{key:1,class:"m-1",name:"icon--elegant--arrow-forward-ios-rounded"})):u("",!0),i("span",{class:"node-item cursor-pointer",onClick:r=>m(n),onMouseenter:f(r=>o(e).setHoverNode(n),["stop"]),onMouseleave:a[0]||(a[0]=f(r=>o(e).setHoverNode(null),["stop"]))},B((p=o(b).getComponentConfingByType((n==null?void 0:n.type)??""))==null?void 0:p.defaultSchema.label),41,D)])):u("",!0)])}),128))]))}}),q={key:0,class:"elegant-right-sidebar-container relative"},E={class:"w-308px"},I={class:"elegant-actions-container"},L=["title","onClick"],T={class:"elegant-sidebar-content"},be=y({__name:"index",setup(M){var p;const e=g(!1),m=S(()=>b.viewsContainers.rightSidebars.value.filter(r=>r.visible)),l=g(0),a=V(null);a.value=(p=m.value[0])==null?void 0:p.component;function n(){e.value=!e.value}function c(r,d){if(l.value===d)return!1;a.value=r.component,l.value=d}return(r,d)=>a.value?(t(),s("div",q,[i("div",{class:"elegant-right-sidebar-hide-btn absolute left--18px top-80px z-9 h-28px w-28px flex cursor-pointer items-center justify-center rounded-full",onClick:n},[k(o(C),{class:v(["transition-all",{"rotate-180":e.value}]),name:"icon--elegant--arrow-forward-ios-rounded"},null,8,["class"])]),d[0]||(d[0]=i("div",{class:"w-10px"},null,-1)),i("div",{class:v(["elegant-right-sidebar w-308px",{hide:e.value}])},[i("div",E,[k(F),i("ul",I,[(t(!0),s(w,null,$(m.value,(h,_)=>(t(),s("li",{key:_,class:v(["elegant-action-item",{checked:l.value===_}]),title:h.title,onClick:Y=>c(h,_)},B(h.title),11,L))),128))]),i("div",T,[(t(),x(H(a.value)))])])],2)])):u("",!0)}});export{be as default};

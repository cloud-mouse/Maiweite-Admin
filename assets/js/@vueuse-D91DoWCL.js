import{s as B,w as le,t as q,k as ae,v as ce,x as fe,r as y,j as O,y as ge,m as D,e as Q,n as de,b as _,l as J,z as we}from"./@vue-CZYi67Zs.js";import{n as P}from"./nprogress-DpS9lOFt.js";var ye=Object.defineProperty,be=Object.defineProperties,he=Object.getOwnPropertyDescriptors,K=Object.getOwnPropertySymbols,Oe=Object.prototype.hasOwnProperty,_e=Object.prototype.propertyIsEnumerable,U=(e,n,t)=>n in e?ye(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,Se=(e,n)=>{for(var t in n||(n={}))Oe.call(n,t)&&U(e,t,n[t]);if(K)for(var t of K(n))_e.call(n,t)&&U(e,t,n[t]);return e},Ee=(e,n)=>be(e,he(n));function it(e,n){var t;const r=B();return le(()=>{r.value=e()},Ee(Se({},n),{flush:(t=void 0)!=null?t:"sync"})),q(r)}var X;const N=typeof window<"u",Pe=e=>typeof e<"u",V=e=>typeof e=="function",xe=e=>typeof e=="string",T=()=>{},Fe=N&&((X=window==null?void 0:window.navigator)==null?void 0:X.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function I(e){return typeof e=="function"?e():ae(e)}function ve(e,n){function t(...r){return new Promise((o,s)=>{Promise.resolve(e(()=>n.apply(this,r),{fn:n,thisArg:this,args:r})).then(o).catch(s)})}return t}function Ie(e,n={}){let t,r,o=T;const s=u=>{clearTimeout(u),o(),o=T};return u=>{const c=I(e),d=I(n.maxWait);return t&&s(t),c<=0||d!==void 0&&d<=0?(r&&(s(r),r=null),Promise.resolve(u())):new Promise((f,l)=>{o=n.rejectOnCancel?l:f,d&&!r&&(r=setTimeout(()=>{t&&s(t),r=null,f(u())},d)),t=setTimeout(()=>{r&&s(r),r=null,f(u())},c)})}}function Re(e,n=!0,t=!0,r=!1){let o=0,s,i=!0,u=T,c;const d=()=>{s&&(clearTimeout(s),s=void 0,u(),u=T)};return l=>{const a=I(e),v=Date.now()-o,p=()=>c=l();return d(),a<=0?(o=Date.now(),p()):(v>a&&(t||!i)?(o=Date.now(),p()):n&&(c=new Promise((w,g)=>{u=r?g:w,s=setTimeout(()=>{o=Date.now(),i=!0,w(p()),d()},Math.max(0,a-v))})),!t&&!s&&(s=setTimeout(()=>i=!0,a)),i=!1,c)}}function $e(e){return e}function Ce(e,n){let t,r,o;const s=y(!0),i=()=>{s.value=!0,o()};O(e,i,{flush:"sync"});const u=V(n)?n:n.get,c=V(n)?void 0:n.set,d=ge((f,l)=>(r=f,o=l,{get(){return s.value&&(t=u(),s.value=!1),r(),t},set(a){c==null||c(a)}}));return Object.isExtensible(d)&&(d.trigger=i),d}function L(e){return ce()?(fe(e),!0):!1}function Ae(e,n=200,t={}){return ve(Ie(n,t),e)}function ut(e,n=200,t={}){const r=y(e.value),o=Ae(()=>{r.value=e.value},n,t);return O(e,()=>o()),r}function lt(e,n=200,t=!1,r=!0,o=!1){return ve(Re(n,t,r,o),e)}function H(e,n=!0){D()?Q(e):n?e():de(e)}function at(e,n,t={}){const{immediate:r=!0}=t,o=y(!1);let s=null;function i(){s&&(clearTimeout(s),s=null)}function u(){o.value=!1,i()}function c(...d){i(),o.value=!0,s=setTimeout(()=>{o.value=!1,s=null,e(...d)},I(n))}return r&&(o.value=!0,N&&c()),L(u),{isPending:q(o),start:c,stop:u}}function x(e){var n;const t=I(e);return(n=t==null?void 0:t.$el)!=null?n:t}const $=N?window:void 0,Te=N?window.document:void 0;function E(...e){let n,t,r,o;if(xe(e[0])||Array.isArray(e[0])?([t,r,o]=e,n=$):[n,t,r,o]=e,!n)return T;Array.isArray(t)||(t=[t]),Array.isArray(r)||(r=[r]);const s=[],i=()=>{s.forEach(f=>f()),s.length=0},u=(f,l,a,v)=>(f.addEventListener(l,a,v),()=>f.removeEventListener(l,a,v)),c=O(()=>[x(n),I(o)],([f,l])=>{i(),f&&s.push(...t.flatMap(a=>r.map(v=>u(f,a,v,l))))},{immediate:!0,flush:"post"}),d=()=>{c(),i()};return L(d),d}let Y=!1;function ct(e,n,t={}){const{window:r=$,ignore:o=[],capture:s=!0,detectIframe:i=!1}=t;if(!r)return;Fe&&!Y&&(Y=!0,Array.from(r.document.body.children).forEach(a=>a.addEventListener("click",T)));let u=!0;const c=a=>o.some(v=>{if(typeof v=="string")return Array.from(r.document.querySelectorAll(v)).some(p=>p===a.target||a.composedPath().includes(p));{const p=x(v);return p&&(a.target===p||a.composedPath().includes(p))}}),f=[E(r,"click",a=>{const v=x(e);if(!(!v||v===a.target||a.composedPath().includes(v))){if(a.detail===0&&(u=!c(a)),!u){u=!0;return}n(a)}},{passive:!0,capture:s}),E(r,"pointerdown",a=>{const v=x(e);v&&(u=!a.composedPath().includes(v)&&!c(a))},{passive:!0}),i&&E(r,"blur",a=>{var v;const p=x(e);((v=r.document.activeElement)==null?void 0:v.tagName)==="IFRAME"&&!(p!=null&&p.contains(r.document.activeElement))&&n(a)})].filter(Boolean);return()=>f.forEach(a=>a())}function ft(e={}){var n;const{window:t=$}=e,r=(n=e.document)!=null?n:t==null?void 0:t.document,o=Ce(()=>null,()=>r==null?void 0:r.activeElement);return t&&(E(t,"blur",s=>{s.relatedTarget===null&&o.trigger()},!0),E(t,"focus",o.trigger,!0)),o}function pe(e,n=!1){const t=y(),r=()=>t.value=!!e();return r(),H(r,n),t}function Me(e){return JSON.parse(JSON.stringify(e))}const Z=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ee="__vueuse_ssr_handlers__";Z[ee]=Z[ee]||{};function dt(e,n,{window:t=$,initialValue:r=""}={}){const o=y(r),s=_(()=>{var i;return x(n)||((i=t==null?void 0:t.document)==null?void 0:i.documentElement)});return O([s,()=>I(e)],([i,u])=>{var c;if(i&&t){const d=(c=t.getComputedStyle(i).getPropertyValue(u))==null?void 0:c.trim();o.value=d||r}},{immediate:!0}),O(o,i=>{var u;(u=s.value)!=null&&u.style&&s.value.style.setProperty(I(e),i)}),o}function vt({document:e=Te}={}){if(!e)return y("visible");const n=y(e.visibilityState);return E(e,"visibilitychange",()=>{n.value=e.visibilityState}),n}var te=Object.getOwnPropertySymbols,je=Object.prototype.hasOwnProperty,We=Object.prototype.propertyIsEnumerable,ke=(e,n)=>{var t={};for(var r in e)je.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&te)for(var r of te(e))n.indexOf(r)<0&&We.call(e,r)&&(t[r]=e[r]);return t};function ze(e,n,t={}){const r=t,{window:o=$}=r,s=ke(r,["window"]);let i;const u=pe(()=>o&&"ResizeObserver"in o),c=()=>{i&&(i.disconnect(),i=void 0)},d=O(()=>x(e),l=>{c(),u.value&&o&&l&&(i=new ResizeObserver(n),i.observe(l,s))},{immediate:!0,flush:"post"}),f=()=>{c(),d()};return L(f),{isSupported:u,stop:f}}function pt(e,n={}){const{reset:t=!0,windowResize:r=!0,windowScroll:o=!0,immediate:s=!0}=n,i=y(0),u=y(0),c=y(0),d=y(0),f=y(0),l=y(0),a=y(0),v=y(0);function p(){const w=x(e);if(!w){t&&(i.value=0,u.value=0,c.value=0,d.value=0,f.value=0,l.value=0,a.value=0,v.value=0);return}const g=w.getBoundingClientRect();i.value=g.height,u.value=g.bottom,c.value=g.left,d.value=g.right,f.value=g.top,l.value=g.width,a.value=g.x,v.value=g.y}return ze(e,p),O(()=>x(e),w=>!w&&p()),o&&E("scroll",p,{capture:!0,passive:!0}),r&&E("resize",p,{passive:!0}),H(()=>{s&&p()}),{height:i,bottom:u,left:c,right:d,top:f,width:l,x:a,y:v,update:p}}var ne=Object.getOwnPropertySymbols,De=Object.prototype.hasOwnProperty,Ne=Object.prototype.propertyIsEnumerable,Le=(e,n)=>{var t={};for(var r in e)De.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&ne)for(var r of ne(e))n.indexOf(r)<0&&Ne.call(e,r)&&(t[r]=e[r]);return t};function mt(e,n,t={}){const r=t,{window:o=$}=r,s=Le(r,["window"]);let i;const u=pe(()=>o&&"MutationObserver"in o),c=()=>{i&&(i.disconnect(),i=void 0)},d=O(()=>x(e),l=>{c(),u.value&&o&&l&&(i=new MutationObserver(n),i.observe(l,s))},{immediate:!0}),f=()=>{c(),d()};return L(f),{isSupported:u,stop:f}}var re;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(re||(re={}));var Be=Object.defineProperty,oe=Object.getOwnPropertySymbols,Ve=Object.prototype.hasOwnProperty,qe=Object.prototype.propertyIsEnumerable,se=(e,n,t)=>n in e?Be(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,Qe=(e,n)=>{for(var t in n||(n={}))Ve.call(n,t)&&se(e,t,n[t]);if(oe)for(var t of oe(n))qe.call(n,t)&&se(e,t,n[t]);return e};const He={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};Qe({linear:$e},He);function gt(e,n,t,r={}){var o,s,i;const{clone:u=!1,passive:c=!1,eventName:d,deep:f=!1,defaultValue:l}=r,a=D(),v=t||(a==null?void 0:a.emit)||((o=a==null?void 0:a.$emit)==null?void 0:o.bind(a))||((i=(s=a==null?void 0:a.proxy)==null?void 0:s.$emit)==null?void 0:i.bind(a==null?void 0:a.proxy));let p=d;n||(n="modelValue"),p=d||p||`update:${n.toString()}`;const w=m=>u?V(u)?u(m):Me(m):m,g=()=>Pe(e[n])?w(e[n]):l;if(c){const m=g(),b=y(m);return O(()=>e[n],h=>b.value=w(h)),O(b,h=>{(h!==e[n]||f)&&v(p,h)},{deep:f}),b}else return _({get(){return g()},set(m){v(p,m)}})}function wt({window:e=$}={}){if(!e)return y(!1);const n=y(e.document.hasFocus());return E(e,"blur",()=>{n.value=!1}),E(e,"focus",()=>{n.value=!0}),n}function yt(e={}){const{window:n=$,initialWidth:t=1/0,initialHeight:r=1/0,listenOrientation:o=!0,includeScrollbar:s=!0}=e,i=y(t),u=y(r),c=()=>{n&&(s?(i.value=n.innerWidth,u.value=n.innerHeight):(i.value=n.document.documentElement.clientWidth,u.value=n.document.documentElement.clientHeight))};return c(),H(c),E("resize",c,{passive:!0}),o&&E("orientationchange",c,{passive:!0}),{width:i,height:u}}function M(e){return ce()?(fe(e),!0):!1}function R(e){return typeof e=="function"?e():ae(e)}const W=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const Ge=e=>e!=null,Je=Object.prototype.toString,Ke=e=>Je.call(e)==="[object Object]",j=()=>{};function Ue(e){let n;function t(){return n||(n=e()),n}return t.reset=async()=>{const r=n;n=void 0,r&&await r},t}function Xe(e){return D()}function Ye(e,n=!0,t){Xe()?Q(e,t):n?e():de(e)}function Ze(e,n,t={}){const{immediate:r=!0}=t,o=y(!1);let s=null;function i(){s&&(clearTimeout(s),s=null)}function u(){o.value=!1,i()}function c(...d){i(),o.value=!0,s=setTimeout(()=>{o.value=!1,s=null,e(...d)},R(n))}return r&&(o.value=!0,W&&c()),M(u),{isPending:q(o),start:c,stop:u}}function bt(e=null,n){const t=y(e),r=_({set:s=>s?P.start():P.done(),get:()=>typeof t.value=="number"&&t.value<1}),o=P.set;return P.set=s=>(t.value=s,o.call(P,s)),le(()=>{typeof t.value=="number"&&W&&o.call(P,t.value)}),M(P.remove),{isLoading:r,progress:t,start:P.start,done:P.done,remove:()=>{t.value=null,P.remove()}}}const k=W?window:void 0,et=W?window.document:void 0,me=W?window.navigator:void 0;function S(e){var n;const t=R(e);return(n=t==null?void 0:t.$el)!=null?n:t}function F(...e){let n,t,r,o;if(typeof e[0]=="string"||Array.isArray(e[0])?([t,r,o]=e,n=k):[n,t,r,o]=e,!n)return j;Array.isArray(t)||(t=[t]),Array.isArray(r)||(r=[r]);const s=[],i=()=>{s.forEach(f=>f()),s.length=0},u=(f,l,a,v)=>(f.addEventListener(l,a,v),()=>f.removeEventListener(l,a,v)),c=O(()=>[S(n),R(o)],([f,l])=>{if(i(),!f)return;const a=Ke(l)?{...l}:l;s.push(...t.flatMap(v=>r.map(p=>u(f,v,p,a))))},{immediate:!0,flush:"post"}),d=()=>{c(),i()};return M(d),d}function tt(){const e=y(!1),n=D();return n&&Q(()=>{e.value=!0},n),e}function z(e){const n=tt();return _(()=>(n.value,!!e()))}function ie(e,n={}){const{controls:t=!1,navigator:r=me}=n,o=z(()=>r&&"permissions"in r),s=B(),i=typeof e=="string"?{name:e}:e,u=B(),c=()=>{var f,l;u.value=(l=(f=s.value)==null?void 0:f.state)!=null?l:"prompt"};F(s,"change",c);const d=Ue(async()=>{if(o.value){if(!s.value)try{s.value=await r.permissions.query(i)}catch{s.value=void 0}finally{c()}if(t)return we(s.value)}});return d(),t?{state:u,isSupported:o,query:d}:u}function ht(e={}){const{navigator:n=me,read:t=!1,source:r,copiedDuring:o=1500,legacy:s=!1}=e,i=z(()=>n&&"clipboard"in n),u=ie("clipboard-read"),c=ie("clipboard-write"),d=_(()=>i.value||s),f=y(""),l=y(!1),a=Ze(()=>l.value=!1,o);function v(){i.value&&m(u.value)?n.clipboard.readText().then(b=>{f.value=b}):f.value=g()}d.value&&t&&F(["copy","cut"],v);async function p(b=R(r)){d.value&&b!=null&&(i.value&&m(c.value)?await n.clipboard.writeText(b):w(b),f.value=b,l.value=!0,a.start())}function w(b){const h=document.createElement("textarea");h.value=b??"",h.style.position="absolute",h.style.opacity="0",document.body.appendChild(h),h.select(),document.execCommand("copy"),h.remove()}function g(){var b,h,C;return(C=(h=(b=document==null?void 0:document.getSelection)==null?void 0:b.call(document))==null?void 0:h.toString())!=null?C:""}function m(b){return b==="granted"||b==="prompt"}return{isSupported:d,text:f,copied:l,copy:p}}function nt(e,n,t={}){const{window:r=k,...o}=t;let s;const i=z(()=>r&&"ResizeObserver"in r),u=()=>{s&&(s.disconnect(),s=void 0)},c=_(()=>{const l=R(e);return Array.isArray(l)?l.map(a=>S(a)):[S(l)]}),d=O(c,l=>{if(u(),i.value&&r){s=new ResizeObserver(n);for(const a of l)a&&s.observe(a,o)}},{immediate:!0,flush:"post"}),f=()=>{u(),d()};return M(f),{isSupported:i,stop:f}}function Ot(e,n={width:0,height:0},t={}){const{window:r=k,box:o="content-box"}=t,s=_(()=>{var l,a;return(a=(l=S(e))==null?void 0:l.namespaceURI)==null?void 0:a.includes("svg")}),i=y(n.width),u=y(n.height),{stop:c}=nt(e,([l])=>{const a=o==="border-box"?l.borderBoxSize:o==="content-box"?l.contentBoxSize:l.devicePixelContentBoxSize;if(r&&s.value){const v=S(e);if(v){const p=v.getBoundingClientRect();i.value=p.width,u.value=p.height}}else if(a){const v=Array.isArray(a)?a:[a];i.value=v.reduce((p,{inlineSize:w})=>p+w,0),u.value=v.reduce((p,{blockSize:w})=>p+w,0)}else i.value=l.contentRect.width,u.value=l.contentRect.height},t);Ye(()=>{const l=S(e);l&&(i.value="offsetWidth"in l?l.offsetWidth:n.width,u.value="offsetHeight"in l?l.offsetHeight:n.height)});const d=O(()=>S(e),l=>{i.value=l?n.width:0,u.value=l?n.height:0});function f(){c(),d()}return{width:i,height:u,stop:f}}function _t(e,n,t={}){const{root:r,rootMargin:o="0px",threshold:s=0,window:i=k,immediate:u=!0}=t,c=z(()=>i&&"IntersectionObserver"in i),d=_(()=>{const p=R(e);return(Array.isArray(p)?p:[p]).map(S).filter(Ge)});let f=j;const l=y(u),a=c.value?O(()=>[d.value,S(r),l.value],([p,w])=>{if(f(),!l.value||!p.length)return;const g=new IntersectionObserver(n,{root:S(w),rootMargin:o,threshold:s});p.forEach(m=>m&&g.observe(m)),f=()=>{g.disconnect(),f=j}},{immediate:u,flush:"post"}):j,v=()=>{f(),a(),l.value=!1};return M(v),{isSupported:c,isActive:l,pause(){f(),l.value=!1},resume(){l.value=!0},stop:v}}const ue=["fullscreenchange","webkitfullscreenchange","webkitendfullscreen","mozfullscreenchange","MSFullscreenChange"];function St(e,n={}){const{document:t=et,autoExit:r=!1}=n,o=_(()=>{var m;return(m=S(e))!=null?m:t==null?void 0:t.querySelector("html")}),s=y(!1),i=_(()=>["requestFullscreen","webkitRequestFullscreen","webkitEnterFullscreen","webkitEnterFullScreen","webkitRequestFullScreen","mozRequestFullScreen","msRequestFullscreen"].find(m=>t&&m in t||o.value&&m in o.value)),u=_(()=>["exitFullscreen","webkitExitFullscreen","webkitExitFullScreen","webkitCancelFullScreen","mozCancelFullScreen","msExitFullscreen"].find(m=>t&&m in t||o.value&&m in o.value)),c=_(()=>["fullScreen","webkitIsFullScreen","webkitDisplayingFullscreen","mozFullScreen","msFullscreenElement"].find(m=>t&&m in t||o.value&&m in o.value)),d=["fullscreenElement","webkitFullscreenElement","mozFullScreenElement","msFullscreenElement"].find(m=>t&&m in t),f=z(()=>o.value&&t&&i.value!==void 0&&u.value!==void 0&&c.value!==void 0),l=()=>d?(t==null?void 0:t[d])===o.value:!1,a=()=>{if(c.value){if(t&&t[c.value]!=null)return t[c.value];{const m=o.value;if((m==null?void 0:m[c.value])!=null)return!!m[c.value]}}return!1};async function v(){if(!(!f.value||!s.value)){if(u.value)if((t==null?void 0:t[u.value])!=null)await t[u.value]();else{const m=o.value;(m==null?void 0:m[u.value])!=null&&await m[u.value]()}s.value=!1}}async function p(){if(!f.value||s.value)return;a()&&await v();const m=o.value;i.value&&(m==null?void 0:m[i.value])!=null&&(await m[i.value](),s.value=!0)}async function w(){await(s.value?v():p())}const g=()=>{const m=a();(!m||m&&l())&&(s.value=m)};return F(t,ue,g,!1),F(()=>S(o),ue,g,!1),r&&M(v),{isSupported:f,isFullscreen:s,enter:p,exit:v,toggle:w}}const rt={ctrl:"control",command:"meta",cmd:"meta",option:"alt",up:"arrowup",down:"arrowdown",left:"arrowleft",right:"arrowright"};function Et(e={}){const{reactive:n=!1,target:t=k,aliasMap:r=rt,passive:o=!0,onEventFired:s=j}=e,i=J(new Set),u={toJSON(){return{}},current:i},c=n?J(u):u,d=new Set,f=new Set;function l(w,g){w in c&&(n?c[w]=g:c[w].value=g)}function a(){i.clear();for(const w of f)l(w,!1)}function v(w,g){var m,b;const h=(m=w.key)==null?void 0:m.toLowerCase(),G=[(b=w.code)==null?void 0:b.toLowerCase(),h].filter(Boolean);h&&(g?i.add(h):i.delete(h));for(const A of G)f.add(A),l(A,g);h==="meta"&&!g?(d.forEach(A=>{i.delete(A),l(A,!1)}),d.clear()):typeof w.getModifierState=="function"&&w.getModifierState("Meta")&&g&&[...i,...G].forEach(A=>d.add(A))}F(t,"keydown",w=>(v(w,!0),s(w)),{passive:o}),F(t,"keyup",w=>(v(w,!1),s(w)),{passive:o}),F("blur",a,{passive:!0}),F("focus",a,{passive:!0});const p=new Proxy(c,{get(w,g,m){if(typeof g!="string")return Reflect.get(w,g,m);if(g=g.toLowerCase(),g in r&&(g=r[g]),!(g in c))if(/[+_-]/.test(g)){const h=g.split(/[+_-]/g).map(C=>C.trim());c[g]=_(()=>h.every(C=>R(p[C])))}else c[g]=y(!1);const b=Reflect.get(w,g,m);return n?R(b):b}});return p}export{E as a,yt as b,pt as c,ze as d,lt as e,dt as f,at as g,Fe as h,N as i,mt as j,vt as k,wt as l,it as m,gt as n,ct as o,ft as p,bt as q,ut as r,_t as s,L as t,x as u,St as v,Ze as w,Ot as x,ht as y,Et as z};

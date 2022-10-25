"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[646],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(n),d=o,f=m["".concat(s,".").concat(d)]||m[d]||u[d]||a;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6790:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var r=n(7462),o=(n(7294),n(3905));const a={sidebar_position:1,title:"Translations"},i="Translations",l={unversionedId:"contributions/translations",id:"contributions/translations",title:"Translations",description:"We highly encourage you to add new translations. Please follow the steps below:",source:"@site/docs/contributions/translations.md",sourceDirName:"contributions",slug:"/contributions/translations",permalink:"/rn-emoji-keyboard/docs/contributions/translations",draft:!1,editUrl:"https://github.com/TheWidlarzGroup/rn-emoji-keyboard/tree/master/docs/docs/contributions/translations.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Translations"},sidebar:"contributions",next:{title:"Development Workflow",permalink:"/rn-emoji-keyboard/docs/contributions/workflow"}},s={},c=[],p={toc:c};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"translations"},"Translations"),(0,o.kt)("p",null,"We highly encourage you to add new translations. Please follow the steps below:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Create language file in ",(0,o.kt)("inlineCode",{parentName:"li"},"/src/translation/")," directory. ",(0,o.kt)("em",{parentName:"li"},"For example ",(0,o.kt)("inlineCode",{parentName:"em"},"en.ts"))),(0,o.kt)("li",{parentName:"ul"},"Create a translation object following the same format like in other files",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("em",{parentName:"li"},"please make sure to change object name per your language"))))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"export const en: CategoryTranslation = {\n  recently_used: 'Recently used',\n  smileys_emotion: 'Smileys & Emotion',\n  people_body: 'People & Body',\n  animals_nature: 'Animals & Nature',\n  food_drink: 'Food & Drink',\n  travel_places: 'Travel & Places',\n  activities: 'Activities',\n  objects: 'Objects',\n  symbols: 'Symbols',\n  flags: 'Flags',\n  search: 'Search',\n}\nexport default en\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Import and export your translation file in ",(0,o.kt)("inlineCode",{parentName:"p"},"/src/index.tsx")," file.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Add info about a new language to documentation."))))}u.isMDXComponent=!0}}]);
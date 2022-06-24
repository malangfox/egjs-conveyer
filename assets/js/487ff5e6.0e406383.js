"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6848],{3905:function(t,e,n){n.d(e,{Zo:function(){return u},kt:function(){return d}});var r=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var c=r.createContext({}),p=function(t){var e=r.useContext(c),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},u=function(t){var e=p(t.components);return r.createElement(c.Provider,{value:e},t.children)},m={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},s=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,o=t.originalType,c=t.parentName,u=l(t,["components","mdxType","originalType","parentName"]),s=p(n),d=a,f=s["".concat(c,".").concat(d)]||s[d]||m[d]||o;return n?r.createElement(f,i(i({ref:e},u),{},{components:n})):r.createElement(f,i({ref:e},u))}));function d(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var o=n.length,i=new Array(o);i[0]=s;var l={};for(var c in e)hasOwnProperty.call(e,c)&&(l[c]=e[c]);l.originalType=t,l.mdxType="string"==typeof t?t:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},4082:function(t,e,n){n.r(e),n.d(e,{contentTitle:function(){return c},default:function(){return s},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return u}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],l={custom_edit_url:null},c=void 0,p={unversionedId:"api/ScrollIntoViewOptions",id:"version-1.3.0/api/ScrollIntoViewOptions",title:"ScrollIntoViewOptions",description:"Type: TSInterface",source:"@site/versioned_docs/version-1.3.0/api/ScrollIntoViewOptions.mdx",sourceDirName:"api",slug:"/api/ScrollIntoViewOptions",permalink:"/egjs-conveyer/docs/api/ScrollIntoViewOptions",editUrl:null,tags:[],version:"1.3.0",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"FindItemOptions",permalink:"/egjs-conveyer/docs/api/FindItemOptions"},next:{title:"ConveyerItem",permalink:"/egjs-conveyer/docs/api/ConveyerItem"}},u=[],m={toc:u};function s(t){var e=t.components,n=(0,a.Z)(t,i);return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("div",null),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Type"),": TSInterface"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"center"},"PROPERTY"),(0,o.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,o.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"hitTest"),(0,o.kt)("td",{parentName:"tr",align:"center"},"number"),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("p",null,"size ratio to find items. (default: 1) "))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"sibling"),(0,o.kt)("td",{parentName:"tr",align:"center"},"number"),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("p",null,"The number of items next to the item's index to return. (default: 0) "))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"align"),(0,o.kt)("td",{parentName:"tr",align:"center"},'"start" ',"|",' "end" ',"|",' "center"'),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("p",null,"Where to arrange the items in the container. (default: ",'"',"start",'"',") "))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"excludeStand"),(0,o.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("p",null,"Whether to find the next item except sorting it in place. (default: false) "))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"offset"),(0,o.kt)("td",{parentName:"tr",align:"center"},"number"),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("p",null,"The value to scroll further from the sort position. (default: 0) "))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"duration"),(0,o.kt)("td",{parentName:"tr",align:"center"},"number"),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("p",null,"How long to scroll animation time. (default: 0) "))))))}s.isMDXComponent=!0}}]);
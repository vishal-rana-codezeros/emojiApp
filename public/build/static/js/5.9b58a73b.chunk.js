(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{780:function(e,n,a){"use strict";a.r(n);var t=a(53),l=a(54),r=a(56),c=a(55),o=a(57),u=a(1),i=a.n(u),s=a(769),m=a(449),p=a(770),d=a(312),h=a(384),f={items:[{name:"Dashboard",url:"/dashboard",icon:"icon-speedometer"},{name:"Users",url:"/users",icon:"fa fa-user-o"}]},E=i.a.lazy(function(){return Promise.all([a.e(1),a.e(2),a.e(19),a.e(13)]).then(a.bind(null,778))}),b=[{path:"/",exact:!0,name:"Home",component:O},{path:"/dashboard",name:"Dashboard",component:i.a.lazy(function(){return Promise.all([a.e(17),a.e(14)]).then(a.bind(null,777))})},{path:"/users",name:"Users",component:E},{path:"/add-user",name:"Users",component:i.a.lazy(function(){return Promise.all([a.e(1),a.e(2),a.e(3),a.e(15)]).then(a.bind(null,782))})}],g=i.a.lazy(function(){return a.e(10).then(a.bind(null,774))}),y=i.a.lazy(function(){return a.e(11).then(a.bind(null,775))}),v=i.a.lazy(function(){return a.e(12).then(a.bind(null,776))}),k=function(e){function n(){var e,a;Object(t.a)(this,n);for(var l=arguments.length,o=new Array(l),u=0;u<l;u++)o[u]=arguments[u];return(a=Object(r.a)(this,(e=Object(c.a)(n)).call.apply(e,[this].concat(o)))).loading=function(){return i.a.createElement("div",{className:"animated fadeIn pt-1 text-center"},"Loading...")},a}return Object(o.a)(n,e),Object(l.a)(n,[{key:"signOut",value:function(e){e.preventDefault(),this.props.history.push("/login")}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"app"},i.a.createElement(h.d,{fixed:!0},i.a.createElement(u.Suspense,{fallback:this.loading()},i.a.createElement(v,{onLogout:function(n){return e.signOut(n)}}))),i.a.createElement("div",{className:"app-body"},i.a.createElement(h.g,{fixed:!0,display:"lg"},i.a.createElement(h.j,null),i.a.createElement(h.i,null),i.a.createElement(u.Suspense,null,i.a.createElement(h.l,Object.assign({navConfig:f},this.props))),i.a.createElement(h.h,null),i.a.createElement(h.k,null)),i.a.createElement("main",{className:"main"},i.a.createElement(h.b,{appRoutes:b}),i.a.createElement(d.p,{fluid:!0},i.a.createElement(u.Suspense,{fallback:this.loading()},i.a.createElement(s.a,null,b.map(function(e,n){return e.component?i.a.createElement(m.a,{key:n,path:e.path,exact:e.exact,name:e.name,render:function(n){return i.a.createElement(e.component,n)}}):null}),i.a.createElement(p.a,{from:"/",to:"/dashboard"}))))),i.a.createElement(h.a,{fixed:!0},i.a.createElement(u.Suspense,{fallback:this.loading()},i.a.createElement(g,null)))),i.a.createElement(h.c,null,i.a.createElement(u.Suspense,{fallback:this.loading()},i.a.createElement(y,null))))}}]),n}(u.Component),O=n.default=k}}]);
//# sourceMappingURL=5.9b58a73b.chunk.js.map
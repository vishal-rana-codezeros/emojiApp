(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{950:function(e,n,a){"use strict";a.r(n);var t=a(53),l=a(54),r=a(57),o=a(55),c=a(56),s=a(1),u=a.n(s),i=a(935),m=a(513),d=a(936),p=a(324),f=a(423),h={items:[{name:"Dashboard",url:"/dashboard",icon:"icon-speedometer"},{name:"Users",url:"/users",icon:"fa fa-user-o"},{name:"Keyboards",url:"/keyboards",icon:"fa fa-keyboard-o",className:"sideBarcss",children:[{name:"Categories",url:"/Keyboards/Categories",icon:"icon-puzzle"}]},{name:"About Us",url:"/AboutUs",icon:"fa fa-group"},{name:"Contact Us",url:"/ContactUs",icon:"fa fa-volume-control-phone"}]},b=u.a.lazy(function(){return Promise.all([a.e(0),a.e(1),a.e(3),a.e(4),a.e(15)]).then(a.bind(null,949))}),E=[{path:"/",exact:!0,name:"Home",component:z},{path:"/dashboard",name:"Dashboard",component:u.a.lazy(function(){return Promise.all([a.e(0),a.e(1),a.e(23),a.e(16)]).then(a.bind(null,943))})},{path:"/users",name:"Users",component:b},{path:"/add-user",name:"Users",component:u.a.lazy(function(){return Promise.all([a.e(0),a.e(1),a.e(3),a.e(4),a.e(17)]).then(a.bind(null,944))})},{path:"/keyboards",name:"Keyboards",component:u.a.lazy(function(){return Promise.all([a.e(0),a.e(1),a.e(18)]).then(a.bind(null,945))})},{path:"/AboutUs",name:"AboutUs",component:u.a.lazy(function(){return Promise.all([a.e(0),a.e(1),a.e(19)]).then(a.bind(null,946))})},{path:"/ContactUs",name:"ContactUs",component:u.a.lazy(function(){return Promise.all([a.e(0),a.e(1),a.e(20)]).then(a.bind(null,947))})},{path:"/Keyboards/Categories",name:"Categories",component:u.a.lazy(function(){return Promise.all([a.e(0),a.e(1),a.e(21)]).then(a.bind(null,948))})}],y=u.a.lazy(function(){return a.e(12).then(a.bind(null,940))}),g=u.a.lazy(function(){return a.e(13).then(a.bind(null,941))}),k=u.a.lazy(function(){return Promise.all([a.e(0),a.e(3),a.e(5),a.e(14)]).then(a.bind(null,942))}),v=function(e){function n(){var e,a;Object(t.a)(this,n);for(var l=arguments.length,c=new Array(l),s=0;s<l;s++)c[s]=arguments[s];return(a=Object(r.a)(this,(e=Object(o.a)(n)).call.apply(e,[this].concat(c)))).loading=function(){return u.a.createElement("div",{className:"animated fadeIn pt-1 text-center"},"Loading...")},a}return Object(c.a)(n,e),Object(l.a)(n,[{key:"signOut",value:function(e){e.preventDefault(),this.props.history.push("/login")}},{key:"render",value:function(){var e=this;return u.a.createElement("div",{className:"app"},u.a.createElement(f.d,{fixed:!0},u.a.createElement(s.Suspense,{fallback:this.loading()},u.a.createElement(k,{onLogout:function(n){return e.signOut(n)}}))),u.a.createElement("div",{className:"app-body"},u.a.createElement(f.f,{fixed:!0,display:"lg"},u.a.createElement(f.i,null),u.a.createElement(f.h,null),u.a.createElement(s.Suspense,null,u.a.createElement(f.k,Object.assign({navConfig:h},this.props))),u.a.createElement(f.g,null),u.a.createElement(f.j,null)),u.a.createElement("main",{className:"main"},u.a.createElement(f.b,{appRoutes:E}),u.a.createElement(p.n,{fluid:!0},u.a.createElement(s.Suspense,{fallback:this.loading()},u.a.createElement(i.a,null,E.map(function(e,n){return e.component?u.a.createElement(m.a,{key:n,path:e.path,exact:e.exact,name:e.name,render:function(n){return u.a.createElement(e.component,n)}}):null}),u.a.createElement(d.a,{from:"/",to:"/dashboard"}))))),u.a.createElement(f.a,{fixed:!0},u.a.createElement(s.Suspense,{fallback:this.loading()},u.a.createElement(y,null)))),u.a.createElement(f.c,null,u.a.createElement(s.Suspense,{fallback:this.loading()},u.a.createElement(g,null))))}}]),n}(s.Component),z=n.default=v}}]);
//# sourceMappingURL=7.24ffe957.chunk.js.map
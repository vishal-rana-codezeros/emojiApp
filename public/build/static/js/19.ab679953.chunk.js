(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{352:function(t,e,n){"use strict";n.d(e,"e",function(){return r}),n.d(e,"c",function(){return c}),n.d(e,"f",function(){return s}),n.d(e,"h",function(){return u}),n.d(e,"a",function(){return l}),n.d(e,"d",function(){return d}),n.d(e,"b",function(){return f}),n.d(e,"g",function(){return p});var a=n(26),o=n.n(a),i=(n(58),n(59)),r=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return function(a){return o.a.get("".concat(i.a.URL,"/admin/getAllUser?page=").concat(t,"&size=").concat(e,"&filter=").concat(n))}},c=function(t){return function(e){return o.a.put("".concat(i.a.URL,"/admin/deleteUser/").concat(t))}},s=function(t){return function(e){return o.a.get("".concat(i.a.URL,"/admin/getOneUser/").concat(t))}},u=function(t,e){return function(n){return o.a.put("".concat(i.a.URL,"/admin/updateUser/").concat(t),e)}},l=function(t){return function(e){return o.a.put("".concat(i.a.URL,"/admin/activeUser/").concat(t))}},d=function(t){return function(t){return o.a.get("".concat(i.a.URL,"/admin/getAboutusPage"))}},f=function(t){console.log("data in abtus",t);var e=JSON.parse(localStorage.getItem("user"))._id;return console.log("description  in addaboutus=====================",t),function(n){return o.a.post("".concat(i.a.URL,"/admin/addAboutusPage/").concat(e),t)}},p=function(t){return console.log("data in abtus",t.id),function(e){return o.a.put("".concat(i.a.URL,"/admin/updateAboutusPage/").concat(t.id),t)}}},939:function(t,e,n){"use strict";t.exports=n(940)},940:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),e}}(),o=c(n(1)),i=c(n(0)),r=c(n(110));function c(t){return t&&t.__esModule?t:{default:t}}var s=n(941),u=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==typeof e&&"function"!==typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.onLoad=n.onLoad.bind(n),n.state={isScriptLoaded:t.isScriptLoaded},n}return function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,o.default.Component),a(e,[{key:"componentDidMount",value:function(){this.state.isScriptLoaded?this.onLoad():s(this.props.scriptUrl,this.onLoad)}},{key:"componentWillReceiveProps",value:function(t){var e=this.editorInstance;e&&e.getData()!==t.content&&e.setData(t.content)}},{key:"componentWillUnmount",value:function(){this.unmounting=!0}},{key:"onLoad",value:function(){if(!this.unmounting)if(this.setState({isScriptLoaded:!0}),window.CKEDITOR)for(var t in this.editorInstance=window.CKEDITOR.appendTo(r.default.findDOMNode(this),this.props.config,this.props.content),this.props.events){var e=this.props.events[t];this.editorInstance.on(t,e)}else console.error("CKEditor not found")}},{key:"render",value:function(){return o.default.createElement("div",{className:this.props.activeClass})}}]),e}();u.defaultProps={content:"",config:{},isScriptLoaded:!1,scriptUrl:"https://cdn.ckeditor.com/4.6.2/standard/ckeditor.js",activeClass:"",events:{}},u.propTypes={content:i.default.any,config:i.default.object,isScriptLoaded:i.default.bool,scriptUrl:i.default.string,activeClass:i.default.string,events:i.default.object},e.default=u},941:function(t,e){function n(t,e){t.onload=function(){this.onerror=this.onload=null,e(null,t)},t.onerror=function(){this.onerror=this.onload=null,e(new Error("Failed to load "+this.src),t)}}function a(t,e){t.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(this.onreadystatechange=null,e(null,t))}}t.exports=function(t,e,o){var i=document.head||document.getElementsByTagName("head")[0],r=document.createElement("script");"function"===typeof e&&(o=e,e={}),e=e||{},o=o||function(){},r.type=e.type||"text/javascript",r.charset=e.charset||"utf8",r.async=!("async"in e)||!!e.async,r.src=t,e.attrs&&function(t,e){for(var n in e)t.setAttribute(n,e[n])}(r,e.attrs),e.text&&(r.text=""+e.text),("onload"in r?n:a)(r,o),r.onload||n(r,o),i.appendChild(r)}},957:function(t,e,n){"use strict";n.r(e);var a=n(53),o=n(54),i=n(57),r=n(55),c=n(56),s=n(111),u=n(1),l=n.n(u),d=n(939),f=n.n(d),p=n(43),m=n(326),h=n(352),b=(n(355),n(112),function(t){function e(t){var n;return Object(a.a)(this,e),(n=Object(i.a)(this,Object(r.a)(e).call(this,t))).getAbout=function(){console.log("calling about us"),n.props.getAboutusPage().then(function(t){if(console.log(t),200==t.status&&t.data.data){console.log(t.data);var e=t.data.data?t.data.data:{},a=e._id,o=e.title,i=e.description;n.setState({id:a,title:o,description:i})}})},n.onClickToSave=function(t){var e=n.state.id;n.setState({isSubmit:!0}),e?n.props.updateAboutusPage(n.state).then(function(t){n.setState({isSubmit:!1}),n.getAbout()}):(n.state.descption=n.state.editorState,n.props.addAboutusPage(n.state).then(function(t){n.setState({isSubmit:!1}),n.getAbout()}))},n.state={description:"",id:"",errors:{},isValid:!1,isSubmit:!1},n.onDescriptionChange=n.onDescriptionChange.bind(Object(s.a)(Object(s.a)(n))),n.onClickToSave=n.onClickToSave.bind(Object(s.a)(Object(s.a)(n))),n.onReset=n.onReset.bind(Object(s.a)(Object(s.a)(n))),n}return Object(c.a)(e,t),Object(o.a)(e,[{key:"componentWillMount",value:function(){this.getAbout()}},{key:"onDescriptionChange",value:function(t){var e=t.editor.getData();this.setState({description:e})}},{key:"onReset",value:function(t){this.setState({description:""})}},{key:"render",value:function(){this.state.descriptionVal;var t=this.state.errors;return l.a.createElement("div",{className:"aboutUsCss"},l.a.createElement(m.J,null,l.a.createElement(m.m,{xs:"12",md:"12"},l.a.createElement(m.h,null,l.a.createElement(m.l,null,l.a.createElement("strong",null,"About Us")),l.a.createElement(m.i,{className:"aboutUsCss"},l.a.createElement(m.s,{action:"",method:"post",encType:"multipart/form-data",className:"form-horizontal"},l.a.createElement(m.t,{row:!0},l.a.createElement(m.m,{md:"3"},l.a.createElement(m.y,{htmlFor:"textarea-input"},l.a.createElement("strong",null,"Content:"))),l.a.createElement(m.m,{xs:"12",md:"9"},l.a.createElement("div",null,l.a.createElement(f.a,{activeClass:"editorCss",content:this.state.description,events:{change:this.onDescriptionChange}}),t.descriptionVal&&l.a.createElement("em",{className:"has-error"},t.descriptionVal)))))),l.a.createElement(m.j,null,this.state.id&&l.a.createElement(m.e,{type:"submit",size:"sm",color:"success",onClick:this.onClickToSave},l.a.createElement("i",{className:"fa fa-dot-circle-o"})," Update"),!this.state.id&&l.a.createElement(m.e,{type:"submit",size:"sm",color:"success",onClick:this.onClickToSave},l.a.createElement("i",{className:"fa fa-dot-circle-o"})," Save"),l.a.createElement(m.e,{type:"reset",size:"sm",color:"danger",onClick:this.onReset},l.a.createElement("i",{className:"fa fa-ban"})," Reset"))))))}}]),e}(u.Component));e.default=Object(p.connect)(null,{addAboutusPage:h.b,getAboutusPage:h.d,updateAboutusPage:h.g})(b)}}]);
//# sourceMappingURL=19.ab679953.chunk.js.map
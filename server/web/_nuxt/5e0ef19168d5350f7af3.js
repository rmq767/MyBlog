(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{532:function(t,e,n){var content=n(576);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(11).default)("6d82a556",content,!0,{sourceMap:!1})},533:function(t,e,n){var content=n(578);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(11).default)("2ea2a4b1",content,!0,{sourceMap:!1})},575:function(t,e,n){"use strict";var o=n(532);n.n(o).a},576:function(t,e,n){(e=n(10)(!1)).push([t.i,"#panel{height:100vh;width:100%;position:absolute;top:0;left:0;right:0;bottom:0;z-index:0}#panel span{width:10px;height:10px;background:#55b9f3;border-radius:50%;position:absolute;box-shadow:5px 5px 15px #489dcf,-5px -5px 15px #62d5ff;animation:blow 4s linear infinite;-webkit-animation:blow 4s linear infinite}@-webkit-keyframes blow{0%{transform:translate(-50%,-50%);opacity:1;-webkit-filter:hue-rotate(0deg);filter:hue-rotate(0deg);-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%)}to{transform:translate(-50%,-1000%);opacity:0;filter:hue-rotate(4turn);-webkit-transform:translate(-50%,-1000%);-moz-transform:translate(-50%,-1000%);-ms-transform:translate(-50%,-1000%);-o-transform:translate(-50%,-1000%);-webkit-filter:hue-rotate(4turn)}}@keyframes blow{0%{transform:translate(-50%,-50%);opacity:1;-webkit-filter:hue-rotate(0deg);filter:hue-rotate(0deg);-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%)}to{transform:translate(-50%,-1000%);opacity:0;filter:hue-rotate(4turn);-webkit-transform:translate(-50%,-1000%);-moz-transform:translate(-50%,-1000%);-ms-transform:translate(-50%,-1000%);-o-transform:translate(-50%,-1000%);-webkit-filter:hue-rotate(4turn)}}",""]),t.exports=e},577:function(t,e,n){"use strict";var o=n(533);n.n(o).a},578:function(t,e,n){(e=n(10)(!1)).push([t.i,".about[data-v-75ddbd30]{background:url(https://picsum.photos/1920/940?random=);background-size:cover;-webkit-animation:none;animation:none;background-attachment:fixed;height:100vh;position:relative;overflow:hidden;display:flex;justify-content:center;align-items:center}.about .my-info[data-v-75ddbd30]{text-align:center;background:rgba(0,0,0,.4);padding:2rem;width:50%;margin-top:-120px;border-radius:1rem;position:relative;z-index:2}.about .my-info>div[data-v-75ddbd30]{margin:1rem 0}.about .my-info .avatar-pc[data-v-75ddbd30]{display:flex;justify-content:center}.about .my-info .avatar-pc>img[data-v-75ddbd30]{height:5rem;width:5rem;border-radius:50%;margin-right:2rem}.info-item-description>.desc[data-v-75ddbd30]{font-size:18px!important}.about .shine[data-v-75ddbd30]{font-size:14px;background:#fff;cursor:pointer;background-image:-webkit-linear-gradient(left,#fffb00,#91ff00 25%,#0f8 50%,#0ef 75%,#f8df00);-webkit-text-fill-color:transparent;-webkit-background-clip:text;background-clip:text;background-size:200% 200%;-webkit-animation:masked-animation-data-v-75ddbd30 5s linear infinite;animation:masked-animation-data-v-75ddbd30 5s linear infinite}@-webkit-keyframes masked-animation-data-v-75ddbd30{0%{background-position:0 0}50%{background-position:-50% -50%}to{background-position:0 0}}@keyframes masked-animation-data-v-75ddbd30{0%{background-position:0 0}50%{background-position:-50% -50%}to{background-position:0 0}}@media screen and (max-width:960px){.about .my-info[data-v-75ddbd30]{width:100%;height:100%;margin-top:0}}",""]),t.exports=e},677:function(t,e,n){"use strict";n.r(e);n(69);var o=n(23),r={methods:{mouseMove:function(t){var e=document.getElementById("panel"),n=document.createElement("span");t=t||window.Event,n.style.left=t.clientX+"px",n.style.top=t.clientY-50+"px";var o=20*Math.random();n.style.width=5+o+"px",n.style.height=5+o+"px",e.appendChild(n),setTimeout((function(){n.remove()}),1e3)}},mounted:function(){document.addEventListener("mousemove",this.mouseMove)},beforeDestroy:function(){document.removeEventListener("mousemove",this.mouseMove)}},d=(n(575),n(59)),f={data:function(){return{}},asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$axios,e.next=3,n.$get("/informations");case 3:return o=e.sent,e.abrupt("return",{info:o.data});case 5:case"end":return e.stop()}}),e)})))()},methods:{mouseMove:function(){}},components:{mouseMove:Object(d.a)(r,(function(){var t=this.$createElement;return(this._self._c||t)("div",{attrs:{id:"panel"}})}),[],!1,null,null,null).exports}},c=(n(577),Object(d.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about"},[n("div",{staticClass:"my-info"},[t._m(0),t._v(" "),n("div",{staticClass:"info-item-social-contact"},[t.info.my_profile?n("p",{staticClass:"shine profile"},[t._v("个人介绍："+t._s(t.info.my_profile))]):t._e(),t._v(" "),t.info.qq?n("p",{staticClass:"shine"},[t._v("QQ:"+t._s(t.info.qq))]):t._e(),t._v(" "),t.info.wechat?n("p",{staticClass:"shine"},[t._v("WeChat:"+t._s(t.info.wechat))]):t._e(),t._v(" "),t.info.github?n("p",{staticClass:"shine"},[t._v("GitHub:"+t._s(t.info.github))]):t._e(),t._v(" "),t.info.csdn?n("p",{staticClass:"shine"},[t._v("CSDN:"+t._s(t.info.csdn))]):t._e()]),t._v(" "),n("div",{staticClass:"info-item-description"},[n("p",{staticClass:"shine desc"},[t._v(t._s(t.info.description))])])]),t._v(" "),n("mouseMove")],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"avatar-pc"},[e("img",{attrs:{src:"https://picsum.photos/200/200?random",alt:""}})])}],!1,null,"75ddbd30",null));e.default=c.exports}}]);
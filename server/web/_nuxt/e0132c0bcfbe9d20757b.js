(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{340:function(t,e,n){var content=n(359);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(11).default)("0b3c1b6a",content,!0,{sourceMap:!1})},358:function(t,e,n){"use strict";var r=n(340);n.n(r).a},359:function(t,e,n){(e=n(10)(!1)).push([t.i,".v-card--reveal[data-v-3da90739]{align-items:center;bottom:0;justify-content:center;opacity:.5;position:absolute;width:100%}.site__title[data-v-3da90739]{color:#f35626;font-family:微软雅黑;background-image:-webkit-linear-gradient(92deg,#f35626,#feab3a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;-webkit-animation:hue-data-v-3da90739 10s linear infinite}@-webkit-keyframes hue-data-v-3da90739{0%{-webkit-filter:hue-rotate(0deg);-moz-filter:hue-rotate(0deg)}to{-webkit-filter:hue-rotate(-1turn);-moz-filter:hue-rotate(-1turn)}}.life[data-v-3da90739]{height:100%;position:relative;background:linear-gradient(45deg,#77c6ff 10%,#edf9ff 90%);overflow:hidden;background-size:200% 100%;-webkit-animation:move-data-v-3da90739 10s ease infinite;animation:move-data-v-3da90739 10s ease infinite}@-webkit-keyframes move-data-v-3da90739{0%{background-position:0 0}50%{background-position:100% 0}to{background-position:0 0}}@media screen and (min-width:1200px){.life[data-v-3da90739]{background:url(/life.jpg);background-size:cover;-webkit-animation:none;animation:none;background-attachment:fixed}}",""]),t.exports=e},392:function(t,e,n){"use strict";n.r(e);n(86);var r=n(26),o={data:function(){return{}},asyncData:function(t){var e=t.$axios;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$get("/life");case 2:return n=t.sent,t.abrupt("return",{life:n});case 4:case"end":return t.stop()}}),t)})))()}},d=(n(358),n(60)),l=n(87),c=n.n(l),f=n(335),v=n(333),m=n(82),k=n(360),h=n(112),w=n(385),_=n(386),component=Object(d.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"life"},[n("h2",{staticClass:"text-center white--text display-1 site__title font-weight-thin"},[t._v("\n    生活不止眼前的苟且，还有诗和远方\n  ")]),t._v(" "),n("v-timeline",{attrs:{dense:t.$vuetify.breakpoint.smAndDown}},t._l(t.life,(function(e){return n("v-timeline-item",{key:e.id},[n("span",{attrs:{slot:"opposite"},slot:"opposite"},[t._v(t._s(e.date.split("-")[0]))]),t._v(" "),n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(r){var o=r.hover;return[n("v-card",{staticClass:"elevation-2"},[n("v-img",{staticClass:"white--text align-end",attrs:{src:e.image,gradient:"to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)",height:"200px"}},[n("v-expand-transition",[o?n("div",{staticClass:"d-flex transition-fast-in-fast-out white v-card--reveal display-1 black--text",staticStyle:{height:"100%"}},[t._v("\n                "+t._s(e.description)+"\n              ")]):t._e()])],1),t._v(" "),n("v-card-subtitle",{staticClass:"pb-0"},[t._v(t._s(e.date.split("T")[0]))]),t._v(" "),n("v-card-text",[t._v("\n            "+t._s(e.content)+"\n          ")])],1)]}}],null,!0)})],1)})),1)],1)}),[],!1,null,"3da90739",null);e.default=component.exports;c()(component,{VCard:f.a,VCardSubtitle:v.a,VCardText:v.b,VExpandTransition:m.a,VHover:k.a,VImg:h.a,VTimeline:w.a,VTimelineItem:_.a})}}]);
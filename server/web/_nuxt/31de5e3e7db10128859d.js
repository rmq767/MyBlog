(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{333:function(t,r,e){"use strict";e.d(r,"a",(function(){return d})),e.d(r,"b",(function(){return l})),e.d(r,"c",(function(){return v}));var n=e(335),o=e(0),c=Object(o.g)("v-card__actions"),d=Object(o.g)("v-card__subtitle"),l=Object(o.g)("v-card__text"),v=Object(o.g)("v-card__title");n.a},334:function(t,r,e){"use strict";e.d(r,"a",(function(){return o}));e(59),e(7),e(5),e(9);var n=e(2);function o(t){return n.a.extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(r,e){var n=e.props,data=e.data,o=e.children;data.staticClass="".concat(t," ").concat(data.staticClass||"").trim();var c=data.attrs;if(c){data.attrs={};var d=Object.keys(c).filter((function(t){if("slot"===t)return!1;var r=c[t];return t.startsWith("data-")?(data.attrs[t]=r,!1):r||"string"==typeof r}));d.length&&(data.staticClass+=" ".concat(d.join(" ")))}return n.id&&(data.domProps=data.domProps||{},data.domProps.id=n.id),r(n.tag,data,o)}})}},335:function(t,r,e){"use strict";e(12),e(8),e(7),e(5),e(9);var n=e(1),o=(e(14),e(337),e(138)),c=e(140),d=e(57),l=e(3);function v(object,t){var r=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),r.push.apply(r,e)}return r}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(r){Object(n.a)(t,r,source[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(source,r))}))}return t}r.a=Object(l.a)(c.a,d.a,o.a).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},outlined:Boolean,raised:Boolean,shaped:Boolean},computed:{classes:function(){return h({"v-card":!0},d.a.options.computed.classes.call(this),{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--outlined":this.outlined,"v-card--raised":this.raised,"v-card--shaped":this.shaped},o.a.options.computed.classes.call(this))},styles:function(){var style=h({},o.a.options.computed.styles.call(this));return this.img&&(style.background='url("'.concat(this.img,'") center center / cover no-repeat')),style}},methods:{genProgress:function(){var t=c.a.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress"},[t]):null}},render:function(t){var r=this.generateRouteLink(),e=r.tag,data=r.data;return data.style=this.styles,this.isClickable&&(data.attrs=data.attrs||{},data.attrs.tabindex=0),t(e,this.setBackgroundColor(this.color,data),[this.genProgress(),this.$slots.default])}})},337:function(t,r,e){var content=e(338);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(11).default)("e23b7040",content,!0,{sourceMap:!1})},338:function(t,r,e){(r=e(10)(!1)).push([t.i,'.theme--light.v-card{background-color:#fff;color:rgba(0,0,0,.87)}.theme--light.v-card .v-card__subtitle,.theme--light.v-card>.v-card__text{color:rgba(0,0,0,.6)}.theme--light.v-card.v-card--outlined{border:thin solid rgba(0,0,0,.12)}.theme--dark.v-card{background-color:#1e1e1e;color:#fff}.theme--dark.v-card .v-card__subtitle,.theme--dark.v-card>.v-card__text{color:hsla(0,0%,100%,.7)}.theme--dark.v-card.v-card--outlined{border:thin solid hsla(0,0%,100%,.12)}.v-card{display:block;max-width:100%;outline:none;text-decoration:none;transition-property:box-shadow,opacity;word-wrap:break-word;position:relative;white-space:normal;transition:box-shadow .28s cubic-bezier(.4,0,.2,1);will-change:box-shadow;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-card:not(.v-sheet--tile):not(.v-card--shaped){border-radius:4px}.v-card>.v-card__progress+:not(.v-btn):not(.v-chip),.v-card>:first-child:not(.v-btn):not(.v-chip){border-top-left-radius:inherit;border-top-right-radius:inherit}.v-card>:last-child:not(.v-btn):not(.v-chip){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.v-card__progress{top:0;left:0;right:0;overflow:hidden}.v-card__subtitle+.v-card__text{padding-top:0}.v-card__subtitle,.v-card__text{font-size:.875rem;font-weight:400;line-height:1.375rem;letter-spacing:.0071428571em}.v-card__subtitle,.v-card__text,.v-card__title{padding:16px}.v-card__title{align-items:center;display:flex;flex-wrap:wrap;font-size:1.25rem;font-weight:500;letter-spacing:.0125em;line-height:2rem;word-break:break-all}.v-card__title+.v-card__subtitle,.v-card__title+.v-card__text{padding-top:0}.v-card__title+.v-card__subtitle{margin-top:-16px}.v-card__text{width:100%}.v-card__actions{align-items:center;display:flex;padding:8px}.v-card__actions>.v-btn.v-btn{padding:0 8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn+.v-btn{margin-left:8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--left{margin-left:4px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--right{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn+.v-btn{margin-right:8px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--left{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--right{margin-left:4px}.v-card--flat{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.v-card--hover{cursor:pointer;transition:box-shadow .4s cubic-bezier(.25,.8,.25,1)}.v-card--hover:focus,.v-card--hover:hover{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.v-card--link,.v-card--link .v-chip{cursor:pointer}.v-card--link:focus:before{opacity:.08}.v-card--link:before{background:currentColor;bottom:0;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:opacity .2s}.v-card--disabled{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-card--disabled>:not(.v-card__progress){opacity:.6;transition:inherit}.v-card--loading{overflow:hidden}.v-card--outlined{box-shadow:none}.v-card--raised{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.v-card--shaped{border-radius:24px 4px}',""]),t.exports=r},341:function(t,r,e){var content=e(364);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(11).default)("2f704f91",content,!0,{sourceMap:!1})},348:function(t,r,e){"use strict";e(59),e(7),e(5),e(9),e(187),e(139);var n=e(334),o=e(35);r.a=Object(n.a)("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,r){var e,n=r.props,data=r.data,c=r.children,d=data.attrs;return d&&(data.attrs={},e=Object.keys(d).filter((function(t){if("slot"===t)return!1;var r=d[t];return t.startsWith("data-")?(data.attrs[t]=r,!1):r||"string"==typeof r}))),n.id&&(data.domProps=data.domProps||{},data.domProps.id=n.id),t(n.tag,Object(o.a)(data,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(e||[])}),c)}})},360:function(t,r,e){"use strict";var n=e(104),o=e(22),c=e(3),d=e(4);r.a=Object(c.a)(n.a,o.a).extend({name:"v-hover",props:{disabled:{type:Boolean,default:!1},value:{type:Boolean,default:void 0}},methods:{onMouseEnter:function(){this.runDelay("open")},onMouseLeave:function(){this.runDelay("close")}},render:function(){return this.$scopedSlots.default||void 0!==this.value?(this.$scopedSlots.default&&(element=this.$scopedSlots.default({hover:this.isActive})),Array.isArray(element)&&1===element.length&&(element=element[0]),element&&!Array.isArray(element)&&element.tag?(this.disabled||(element.data=element.data||{},this._g(element.data,{mouseenter:this.onMouseEnter,mouseleave:this.onMouseLeave})),element):(Object(d.c)("v-hover should only contain a single element",this),element)):(Object(d.c)("v-hover is missing a default scopedSlot or bound value",this),null);var element}})},363:function(t,r,e){"use strict";var n=e(341);e.n(n).a},364:function(t,r,e){(r=e(10)(!1)).push([t.i,".link[data-v-f5a46b00]{height:100%;background:url(/lib.jpg);background-size:cover}.v-card[data-v-f5a46b00]{transition:opacity .4s ease-in-out}.v-card[data-v-f5a46b00]:not(.on-hover){opacity:.7}",""]),t.exports=r},394:function(t,r,e){"use strict";e.r(r);e(86);var n=e(26),o={data:function(){return{}},asyncData:function(t){var r=t.$axios;return Object(n.a)(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.$get("/links");case 2:return e=t.sent,t.abrupt("return",{links:e});case 4:case"end":return t.stop()}}),t)})))()}},c=(e(363),e(60)),d=e(87),l=e.n(d),v=e(335),h=e(333),f=e(326),x=e(348),_=e(360),m=e(112),y=e(328),component=Object(c.a)(o,(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"link"},[e("v-container",[e("v-row",{staticClass:"overflow-y-auto"},t._l(t.links,(function(link,i){return e("v-col",{key:i,staticClass:"col-xs-12 col-md-6 col-lg-4"},[e("v-hover",{scopedSlots:t._u([{key:"default",fn:function(r){var n=r.hover;return[e("v-card",{class:{"on-hover":n},attrs:{link:"",href:link.link,hover:""}},[e("v-img",{staticClass:"white--text align-end",attrs:{src:link.image,gradient:"to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)",height:"200px"}},[e("v-card-title",{domProps:{textContent:t._s(link.title)}})],1),t._v(" "),e("v-card-text",{staticClass:"text--primary"},[e("div",[t._v(t._s(link.description))])])],1)]}}],null,!0)})],1)})),1)],1)],1)}),[],!1,null,"f5a46b00",null);r.default=component.exports;l()(component,{VCard:v.a,VCardText:h.b,VCardTitle:h.c,VCol:f.a,VContainer:x.a,VHover:_.a,VImg:m.a,VRow:y.a})}}]);
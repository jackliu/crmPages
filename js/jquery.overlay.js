/*
 * jQuery Tools v1.2.5 - The missing UI library for the Web
 * 
 * overlay/overlay.js
 * toolbox/toolbox.expose.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 */
(function(f){f.tools=f.tools||{version:"v1.2.5"},f.tools.overlay={addEffect:function(i,c,j){h[i]=[c,j]},conf:{close:null,closeOnClick:!0,closeOnEsc:!0,closeSpeed:"fast",effect:"default",fixed:!f.browser.msie||f.browser.version>6,left:"center",load:!1,mask:null,oneInstance:!0,speed:"normal",target:null,top:"10%"}};var e=[],h={};f.tools.overlay.addEffect("default",function(a,k){var j=this.getConf(),i=f(window);j.fixed||(a.top+=i.scrollTop(),a.left+=i.scrollLeft()),a.position=j.fixed?"fixed":"absolute",this.getOverlay().css(a).fadeIn(j.speed,k)},function(b){this.getOverlay().fadeOut(this.getConf().closeSpeed,b)});function g(v,u){var t=this,s=v.add(t),r=f(window),q,p,o,c=f.tools.expose&&(u.mask||u.expose),b=Math.random().toString().slice(10);c&&(typeof c=="string"&&(c={color:c}),c.closeOnClick=c.closeOnEsc=!1);var a=u.target||v.attr("rel");p=a?f(a):null||v;if(!p.length){throw"Could not find Overlay: "+a}v&&v.index(p)==-1&&v.click(function(d){t.load(d);return d.preventDefault()}),f.extend(t,{load:function(w){if(t.isOpened()){return t}var j=h[u.effect];if(!j){throw'Overlay: cannot find effect : "'+u.effect+'"'}u.oneInstance&&f.each(e,function(){this.close(w)}),w=w||f.Event(),w.type="onBeforeLoad",s.trigger(w);if(w.isDefaultPrevented()){return t}o=!0,c&&f(p).expose(c);var x=u.top,m=u.left,l=p.outerWidth({margin:!0}),k=p.outerHeight({margin:!0});typeof x=="string"&&(x=x=="center"?Math.max((r.height()-k)/2,0):parseInt(x,10)/100*r.height()),m=="center"&&(m=Math.max((r.width()-l)/2,0)),j[0].call(t,{top:x,left:m},function(){o&&(w.type="onLoad",s.trigger(w))}),c&&u.closeOnClick&&f.mask.getMask().one("click",t.close),u.closeOnClick&&f(document).bind("click."+b,function(d){f(d.target).parents(p).length||t.close(d)}),u.closeOnEsc&&f(document).bind("keydown."+b,function(d){d.keyCode==27&&t.close(d)});return t},close:function(d){if(!t.isOpened()){return t}d=d||f.Event(),d.type="onBeforeClose",s.trigger(d);if(!d.isDefaultPrevented()){o=!1,h[u.effect][1].call(t,function(){d.type="onClose",s.trigger(d)}),f(document).unbind("click."+b).unbind("keydown."+b),c&&f.mask.close();return t}},getOverlay:function(){return p},getTrigger:function(){return v},getClosers:function(){return q},isOpened:function(){return o},getConf:function(){return u}}),f.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(d,i){f.isFunction(u[i])&&f(t).bind(i,u[i]),t[i]=function(j){j&&f(t).bind(i,j);return t}}),q=p.find(u.close||".close"),!q.length&&!u.close&&(q=f('<a class="close"></a>'),p.prepend(q)),q.click(function(d){t.close(d)}),u.load&&t.load()}f.fn.overlay=function(b){var a=this.data("overlay");if(a){return a}f.isFunction(b)&&(b={onBeforeLoad:b}),b=f.extend(!0,{},f.tools.overlay.conf,b),this.each(function(){a=new g(f(this),b),e.push(a),f(this).data("overlay",a)});return b.api?a:this}})(jQuery);(function(r){r.tools=r.tools||{version:"v1.2.5"};var q;q=r.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:!0,closeOnEsc:!0,zIndex:9998,opacity:0.8,startOpacity:0,color:"#fff",onLoad:null,onClose:null}};function p(){if(r.browser.msie){var a=r(document).height(),d=r(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,a-d<20?d:a]}return[r(document).width(),r(document).height()]}function o(a){if(a){return a.call(r.mask)}}var n,m,l,k,j;r.mask={load:function(c,b){if(l){return this}typeof c=="string"&&(c={color:c}),c=c||k,k=c=r.extend(r.extend({},q.conf),c),n=r("#"+c.maskId),n.length||(n=r("<div/>").attr("id",c.maskId),r("body").append(n));var a=p();n.css({position:"absolute",top:0,left:0,width:a[0],height:a[1],display:"none",opacity:c.startOpacity,zIndex:c.zIndex}),c.color&&n.css("backgroundColor",c.color);if(o(c.onBeforeLoad)===!1){return this}c.closeOnEsc&&r(document).bind("keydown.mask",function(d){d.keyCode==27&&r.mask.close(d)}),c.closeOnClick&&n.bind("click.mask",function(d){r.mask.close(d)}),r(window).bind("resize.mask",function(){r.mask.fit()}),b&&b.length&&(j=b.eq(0).css("zIndex"),r.each(b,function(){var d=r(this);/relative|absolute|fixed/i.test(d.css("position"))||d.css("position","relative")}),m=b.css({zIndex:Math.max(c.zIndex+1,j=="auto"?0:j)})),n.css({display:"block"}).fadeTo(c.loadSpeed,c.opacity,function(){r.mask.fit(),o(c.onLoad),l="full"}),l=!0;return this},close:function(){if(l){if(o(k.onBeforeClose)===!1){return this}n.fadeOut(k.closeSpeed,function(){o(k.onClose),m&&m.css({zIndex:j}),l=!1}),r(document).unbind("keydown.mask"),n.unbind("click.mask"),r(window).unbind("resize.mask")}return this},fit:function(){if(l){var b=p();n.css({width:b[0],height:b[1]})}},getMask:function(){return n},isLoaded:function(b){return b?l=="full":l},getConf:function(){return k},getExposed:function(){return m}},r.fn.mask=function(a){r.mask.load(a);return this},r.fn.expose=function(a){r.mask.load(a,this);return this}})(jQuery);
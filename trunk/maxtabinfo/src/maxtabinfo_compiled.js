(function(){function j(a,b){this.label_=a;this.contentNode_=f("div",null,b,null,null);this.navNode_=null}function g(a){a=a||{};this.style_={};this.anchor_=this.map_=null;this.selectedTab_=-1;if(this.maxNode_){google.maps.event.clearInstanceListeners(this.maxNode_);this.maxNode_=null}this.minNode_=f("div",{id:"mincontent"},a.content,this.style_.content);this.maxNode_=f("div",{id:"maxcontent"},null,this.style_.content);var b=a.selectedTab||0;this.style_=i({},l);this.style_=i(this.style_,a.style);this.toggleNode_=
f("div",{id:"tmi_plus"},null,{position:"absolute",width:"12px",height:"12px",top:"-8px",right:"10px",overflow:"hidden",cursor:"pointer"},this.minNode_);this.imgNode_=f("img",{src:m},null,{position:"absolute",left:"-23px",top:"-405px"},this.toggleNode_);google.maps.event.addDomListener(this.toggleNode_,"click",k(this,this.toggle));this.summaryNode_=f("div",null,a.summary,this.style_.summary,this.maxNode_);this.navsNode_=f("div",null,null,this.style_.tabBar,this.maxNode_);this.contentsNode_=f("div",
null,null,null,this.maxNode_);var c=a.tabs||[],d=[];f("span",null,null,this.style_.tabLeft,this.navsNode_);for(var e=0;e<c.length;e++){d.push(new j(c[e].label,c[e].content));if(e===b||d[e].getLabel()===b)this.selectedTab_=e;d[e].navNode_=f("span",null,d[e].getLabel(),this.style_.tabOff,this.navsNode_);f("div",null,d[e].getContentNode(),this.style_.content,this.contentsNode_).style.display="none"}f("span",null,null,this.style_.tabRight,this.navsNode_);this.tabs_=d;google.maps.InfoWindow.call(this,
a);this.setContent(this.minNode_)}var l={tabBar:{background:"#F4F4F4 none repeat scroll 0 0",borderBottom:"1px solid #B0B0B0",padding:"6px 8px 4px",marginRight:"-2px",whiteSpace:"nowrap",verticalAlign:"bottom"},tabLeft:{},tabRight:{},tabOn:{background:"#FFFFFF none repeat scroll 0 0",padding:"6px 8px 4px",borderTop:"1px solid #B0B0B0",borderLeft:"1px solid #B0B0B0",borderRight:"1px solid #B0B0B0",borderBottom:"2px solid #FFFFFF",color:"#000000",textDecoration:"none",fontWeight:"bold"},tabOff:{background:"#F4F4F4 none repeat scroll 0 0",
padding:"6px 8px 4px",color:"#0000FF",border:"none",textDecoration:"underline",fontWeight:"normal"},content:{borderStyle:"none solid solid solid",borderWidth:"1px",borderColor:"#B0B0B0",borderTop:"none",overflow:"auto",padding:"4px 4px 4px"},summary:{overflow:"auto",marginBottom:"5px"}},i=function(a,b){if(a&&b)for(var c in b)if(b.hasOwnProperty(c))a[c]=a[c]&&typeof b[c]==="object"?i(a[c],b[c]):b[c];return a},k=function(a,b,c){return function(){b.call(a,c)}},f=function(a,b,c,d,e){var h=c;if(!c||c&&
typeof c==="string"){h=document.createElement(a);if(c)h.innerHTML=c}d&&i(h.style,d);b&&i(h,b);e&&e.appendChild(h);return h},m="https://maps.gstatic.com/mapfiles/mapcontrols3d7.png";j.prototype.getLabel=function(){return this.label_};j.prototype.getContentNode=function(){return this.contentNode_};g.prototype=new google.maps.InfoWindow;g.prototype.selectTab=function(a){for(var b=false,c=false,d,e=0,h=this.tabs_.length;e<h;e++){d=this.tabs_[e];if(e===a||d.getLabel()===a){if(d.getContentNode().style.display===
"none"){i(d.navNode_.style,this.style_.tabOn);d.getContentNode().style.display="block";this.selectedTab_=e;b=true}c=true}else{i(d.navNode_.style,this.style_.tabOff);d.getContentNode().style.display="none"}}b&&google.maps.event.trigger(this,"selecttab",this.tabs_[this.selectedTab_]);c||this.selectTab(0)};g.prototype.getTab=function(a){for(var b=0,c=this.tabs_.length;b<c;b++)if(b===a||this.tabs_[b].getLabel()===a)return this.tabs_[b]};g.prototype.checkResize=function(){var a=this.getContent();a.style.width=
a.parentNode.style.width;a.style.height=a.parentNode.style.height;var b;for(var c=b=0,d=this.contentsNode_;d&&d!==a.parentNode;){b+=d.offsetLeft;c+=d.offsetTop;d=d.offsetParent}b={left:b,top:c};c=0;for(d=this.tabs_.length;c<d;c++){var e=this.tabs_[c].getContentNode();e.style.width=parseInt(a.style.width,10)-2*parseInt(e.style.padding,10)+"px";e.style.height=parseInt(a.style.height,10)-b.top+"px"}};g.prototype.maximize=function(){this.close();var a=this.map_,b=Math.floor(a.getDiv().offsetHeight*0.8),
c=Math.floor(a.getDiv().offsetWidth*0.8);this.maxNode_.style.height=""+b+"px";this.maxNode_.style.width=""+c+"px";this.setContent(this.maxNode_);this.imgNode_.style.top="-364px";this.maxNode_.appendChild(this.toggleNode_);var d=this;google.maps.event.addListenerOnce(this,"domready",function(){d.checkResize()});b=0;for(c=this.tabs_.length;b<c;b++)google.maps.event.addDomListener(this.tabs_[b].navNode_,"click",k(this,this.selectTab,b));this.selectTab(this.selectedTab_);this.open(a,this.anchor_)};g.prototype.minimize=
function(){google.maps.event.clearInstanceListeners(this.navsNode_);this.close();this.setContent(this.minNode_);this.imgNode_.style.top="-405px";this.minNode_.appendChild(this.toggleNode_);this.open(this.map_,this.anchor_)};g.prototype.toggle=function(){this.getContent()===this.minNode_?this.maximize():this.minimize()};g.prototype.open=function(a,b){this.map_=a;this.anchor_=b;google.maps.InfoWindow.prototype.open.call(this,a,b)};window.MaxTabInfo=g})();

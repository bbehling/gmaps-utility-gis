function F(n){return function(){return this[n]}}
(function(){function n(a,b,c){var d=b===""?0:a.indexOf(b);return a.substring(d+b.length,c===""?a.length:a.indexOf(c,d+b.length))}function G(a){return a&&typeof a==="string"}function r(a){return a&&a.splice}function m(a,b,c){if(a&&b){var d;for(d in a)if(c||!(d in b))b[d]=a[d]}return b}function M(){i.event.trigger.apply(this,arguments)}function t(a,b){a&&b&&b.error&&a(b.error)}function aa(a,b){var c="";if(a)c+=a.getTime()-a.getTimezoneOffset()*6E4;if(b)c+=", "+(b.getTime()-b.getTimezoneOffset()*6E4);
return c}function H(a,b){b=Math.min(Math.max(b,0),1);if(a){var c=a.style;if(typeof c.opacity!=="undefined")c.opacity=b;if(typeof c.filters!=="undefined")c.filters.alpha.opacity=Math.floor(100*b);if(typeof c.filter!=="undefined")c.filter="alpha(opacity:"+Math.floor(b*100)+")"}}function V(a){var b="";for(var c in a)if(a.hasOwnProperty(c)){if(b.length>0)b+=";";b+=c+":"+a[c]}return b}function ka(){if(typeof XMLHttpRequest==="undefined"){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(b){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(c){}throw new Error("This browser does not support XMLHttpRequest.");
}else return new XMLHttpRequest}function S(a){var b=a;if(r(a)&&a.length>0)b=a[0];if(b instanceof i.LatLng||b instanceof i.Marker)return r(a)&&a.length>1?s.MULTIPOINT:s.POINT;else if(b instanceof i.Polyline)return s.POLYLINE;else if(b instanceof i.Polygon)return s.POLYGON;else if(b instanceof i.LatLngBounds)return s.ENVELOPE;else if(b.x!==undefined&&b.y!==undefined)return s.POINT;else if(b.points)return s.MULTIPOINT;else if(b.paths)return s.POLYLINE;else if(b.rings)return s.POLYGON;return null}function W(a){var b=
a;if(r(a)&&a.length>0)b=a[0];if(r(b)&&b.length>0)b=b[0];if(b instanceof i.LatLng||b instanceof i.Marker||b instanceof i.Polyline||b instanceof i.Polygon||b instanceof i.LatLngBounds)return true;return false}function N(a){if(!a)return null;return typeof a==="number"?a:a.wkid?a.wkid:a.toJSON()}function ba(a,b){for(var c=[],d,e=0,f=a.getLength();e<f;e++){d=a.getAt(e);c.push("["+d.lng()+","+d.lat()+"]")}b&&c.length>0&&c.push("["+a.getAt(0).lng()+","+a.getAt(0).lat()+"]");return c.join(",")}function I(a){var b,
c,d,e="{";switch(S(a)){case s.POINT:b=r(a)?a[0]:a;if(b instanceof i.Marker)b=b.getPosition();e+="x:"+b.lng()+",y:"+b.lat();break;case s.MULTIPOINT:d=[];for(c=0;c<a.length;c++){b=a[c]instanceof i.Marker?a[c].getPosition():a[c];d.push("["+b.lng()+","+b.lat()+"]")}e+="points: ["+d.join(",")+"]";break;case s.POLYLINE:d=[];a=r(a)?a:[a];for(c=0;c<a.length;c++)d.push("["+ba(a[c].getPath())+"]");e+="paths:["+d.join(",")+"]";break;case s.POLYGON:d=[];b=r(a)?a[0]:a;a=b.getPaths();for(c=0;c<a.getLength();c++)d.push("["+
ba(a.getAt(c),true)+"]");e+="rings:["+d.join(",")+"]";break;case s.ENVELOPE:b=r(a)?a[0]:a;e+="xmin:"+b.getSouthWest().lng()+",ymin:"+b.getSouthWest().lat()+",xmax:"+b.getNorthEast().lng()+",ymax:"+b.getNorthEast().lat();break}e+=", spatialReference:{wkid:4326}";e+="}";return e}function la(a){function b(e){for(var f=[],g=0,h=e.length;g<h;g++)f.push("["+e[g][0]+","+e[g][1]+"]");return"["+f.join(",")+"]"}function c(e){for(var f=[],g=0,h=e.length;g<h;g++)f.push(b(e[g]));return"["+f.join(",")+"]"}var d=
"{";if(a.x)d+="x:"+a.x+",y:"+a.y;else if(a.xmin)d+="xmin:"+a.xmin+",ymin:"+a.ymin+",xmax:"+a.xmax+",ymax:"+a.ymax;else if(a.points)d+="points:"+b(a.points);else if(a.paths)d+="paths:"+c(a.paths);else if(a.rings)d+="rings:"+c(a.rings);d+="}";return d}function ca(a){var b=z[a.spatialReference.wkid||a.spatialReference.wkt];b=b||J;var c=b.inverse([a.xmin,a.ymin]);a=b.inverse([a.xmax,a.ymax]);return new i.LatLngBounds(new i.LatLng(c[1],c[0]),new i.LatLng(a[1],a[0]))}function K(a,b){var c=null,d,e,f,g,
h,j,O,T;b=b||{};if(a){c=[];if(a.x){d=new i.Marker(m(b.markerOptions||b,{position:new i.LatLng(a.y,a.x)}));c.push(d)}else{h=a.points||a.paths||a.rings;if(!h)return c;var da=[];e=0;for(f=h.length;e<f;e++){j=h[e];if(a.points){d=new i.Marker(m(b.markerOptions||b,{position:new i.LatLng(j[1],j[0])}));c.push(d)}else{T=[];d=0;for(g=j.length;d<g;d++){O=j[d];T.push(new i.LatLng(O[1],O[0]))}if(a.paths){d=new i.Polyline(m(b.polylineOptions||b,{path:T}));c.push(d)}else a.rings&&da.push(T)}}if(a.rings){d=new i.Polygon(m(b.polygonOptions||
b,{paths:da}));c.push(d)}}}return c}function ea(a,b){if(a){var c,d,e;c=0;for(d=a.length;c<d;c++){e=a[c];if(e.geometry)e.geometry=K(e.geometry,b)}}}function X(a){var b;if(typeof a==="object")if(r(a)){b=[];for(var c=0,d=a.length;c<d;c++)b.push(X(a[c]));return"["+b.join(",")+"]"}else if(W(a))return I(a);else if(a.toJSON)return a.toJSON();else{b="";for(c in a)if(a.hasOwnProperty(c)){if(b.length>0)b+=", ";b+=c+":"+X(a[c])}return"{"+b+"}"}return a.toString()}function fa(a){var b,c,d,e=[];b=0;for(c=a.length;b<
c;b++){d=a[b];if(d instanceof i.Marker)d=d.getPosition();e.push({geometry:{x:d.lng(),y:d.lat(),spatialReference:{wkid:4326}}})}return{type:'"features"',features:e,doNotLocateOnRestrictedElements:false}}function ga(a){var b={};if(!a)return null;var c=[],d,e;if(a.geometries&&a.geometries.length>0){d=a.geometries[0];e=W(d);for(var f=0,g=a.geometries.length;f<g;f++)e?c.push(I(a.geometries[f])):c.push(la(a.geometries[f]))}a.geometryType||(a.geometryType=S(d));if(e)b.inSR=J.wkid;else if(a.inSpatialReference)b.inSR=
N(a.inSpatialReference);if(a.outSpatialReference)b.outSR=N(a.outSpatialReference);b.geometries='{geometryType:"'+a.geometryType+'", geometries:['+c.join(",")+"]}";return b}function ha(a){var b="";if(a){a.f=a.f||p.O;for(var c in a)if(a.hasOwnProperty(c)&&a[c]!==null&&a[c]!==undefined){var d=X(a[c]);b+=c+"="+(escape?escape(d):encodeURIComponent(d))+"&"}}return b}function o(a,b,c,d){var e="ags_jsonp"+ma++ +"_"+Math.floor(Math.random()*1E6),f=null;b=ha(b);b+=c+"=ags_jsonp."+e;var g=document.getElementsByTagName("head")[0];
if(!g)throw new Error("document must have header tag");w.ags_jsonp[e]=function(){delete w.ags_jsonp[e];f&&g.removeChild(f);f=null;d.apply(null,arguments);M(B,"jsonpend",e)};if((b+a).length<2E3&&!P.alwaysUseProxy){f=document.createElement("script");f.src=a+(a.indexOf("?")===-1?"?":"&")+b;f.id=e;g.appendChild(f)}else{c=window.location;c=c.protocol+"//"+c.hostname+(!c.port||c.port===80?"":":"+c.port+"/");var h=true;if(a.toLowerCase().indexOf(c.toLowerCase())!==-1)h=false;if(P.alwaysUseProxy)h=true;if(h&&
!P.proxyUrl)throw new Error("No proxyUrl property in Config is defined");var j=ka();j.onreadystatechange=function(){if(j.readyState===4)if(j.status===200)eval(j.responseText);else throw new Error("Error code "+j.status);};j.open("POST",h?P.proxyUrl+"?"+a:a,true);j.setRequestHeader("Content-Type","application/x-www-form-urlencoded");j.send(b)}M(B,"jsonpstart",e);return e}function l(a){a=a||{};this.wkid=a.wkid;this.wkt=a.wkt}function U(a){a=a||{};l.call(this,a)}function u(a){a=a||{};l.call(this,a);
var b=a.inverse_flattening,c=a.standard_parallel_1*k,d=a.standard_parallel_2*k,e=a.latitude_of_origin*k;this.a=a.semi_major/a.unit;this.i=a.central_meridian*k;this.l=a.false_easting;this.m=a.false_northing;a=1/b;b=2*a-a*a;this.h=Math.sqrt(b);a=this.n(c,b);b=this.n(d,b);e=this.A(e,this.h);c=this.A(c,this.h);d=this.A(d,this.h);this.b=Math.log(a/b)/Math.log(c/d);this.I=a/(this.b*Math.pow(c,this.b));this.j=this.u(this.a,this.I,e,this.b)}function C(a){a=a||{};l.call(this,a);this.a=a.semi_major/a.unit;
var b=a.inverse_flattening;this.D=a.scale_factor;var c=a.latitude_of_origin*k;this.i=a.central_meridian*k;this.l=a.false_easting;this.m=a.false_northing;a=1/b;this.e=2*a-a*a;this.C=this.e*this.e;this.J=this.C*this.e;this.q=this.e/(1-this.e);this.L=this.n(c,this.a,this.e,this.C,this.J)}function D(a){a=a||{};l.call(this,a);this.a=(a.semi_major||6378137)/(a.unit||1);this.i=(a.central_meridian||0)*k}function v(a){a=a||{};l.call(this,a);var b=a.inverse_flattening,c=a.standard_parallel_1*k,d=a.standard_parallel_2*
k,e=a.latitude_of_origin*k;this.a=a.semi_major/a.unit;this.i=a.central_meridian*k;this.l=a.false_easting;this.m=a.false_northing;a=1/b;b=2*a-a*a;this.h=Math.sqrt(b);a=this.n(c,b);b=this.n(d,b);c=this.z(c,this.h);d=this.z(d,this.h);e=this.z(e,this.h);this.b=(a*a-b*b)/(d-c);this.H=a*a+this.b*c;this.j=this.u(this.a,this.H,this.b,e)}function E(a){this.url=a;this.definition=null}function q(a){this.url=a;this.loaded=false;var b=a.split("/");this.name=b[b.length-2].replace(/_/g," ");var c=this;o(a,{},p.g,
function(d){c.r(d)})}function Q(a){this.url=a;this.loaded=false;var b=this;o(a,{},p.g,function(c){b.r(c)})}function Y(a){this.url=a}function ia(a){this.url=a;this.loaded=false;var b=this;o(a,{},p.g,function(c){m(c,b);b.loaded=true;i.event.trigger(b,p.load)})}function ja(a){this.url=a}function x(a){this.$=a?a.lods:null;this.s=a?z[a.spatialReference.wkid||a.spatialReference.wkt]:R;if(!this.s)throw new Error("unsupported Spatial Reference");this.T=a?a.lods[0].resolution:156543.033928;this.minZoom=Math.floor(Math.log(this.s.v()/
this.T/256)/Math.LN2+0.5);this.maxZoom=a?this.minZoom+this.$.length-1:20;if(i.Size)this.U=a?new i.Size(a.cols,a.rows):new i.Size(256,256);this.G=Math.pow(2,this.minZoom)*this.T;this.R=a?a.origin.x:-2.0037508342787E7;this.S=a?a.origin.y:2.0037508342787E7;if(a)for(var b,c=0;c<a.lods.length-1;c++){b=a.lods[c].resolution/a.lods[c+1].resolution;if(b>2.001||b<1.999)throw new Error("This type of map cache is not supported in V3. \nScale ratio between zoom levels must be 2");}}function y(a,b){b=b||{};if(b.opacity){this.d=
b.opacity;delete b.opacity}m(b,this);this.c=a instanceof q?a:new q(a);if(b.hosts){var c=n(this.c.url,"","://");this.V=c+"://"+b.hosts+n(this.c.url,c+"://"+n(this.c.url,"://","/"),"");this.Q=parseInt(n(b.hosts,"[","]"),10)}this.name=this.name||this.c.name;this.maxZoom=this.maxZoom||19;this.minZoom=this.minZoom||0;if(this.c.loaded)this.r(b);else{var d=this;i.event.addListenerOnce(this.c,p.load,function(){d.r(b)})}this.k={};this.P=b.map}function L(a,b){b=b||{};var c;if(b.opacity){this.d=b.opacity;delete b.opacity}m(b,
this);var d=a;if(G(a))d=[new y(a,b)];else if(a instanceof q)d=[new y(a,b)];else if(a instanceof y)d=[a];else if(a.length>0&&G(a[0])){d=[];for(c=0;c<a.length;c++)d[c]=new y(a[c],b)}this.w=d;this.k={};if(b.maxZoom!==undefined)this.maxZoom=b.maxZoom;else{var e=0;for(c=0;c<d.length;c++)e=Math.max(e,d[c].maxZoom);this.maxZoom=e}if(d[0].p){this.tileSize=d[0].p.U;this.projection=d[0].p}else this.tileSize=new i.Size(256,256);this.name||(this.name=d[0].name)}function A(a,b){b=b||{};this.c=a instanceof q?a:
new q(a);this.d=b.opacity||1;this.X=b.exportOptions||{};this.F=this.B=false;this.o=null;b.map&&this.setMap(b.map)}var p={O:"json",g:"callback",load:"load"},k=Math.PI/180,ma=0,w=window;w.ags_jsonp=w.ags_jsonp||{};w.gmaps=w.gmaps||{};var i=w.google&&w.google.maps?w.google.maps:{},J,Z,R,$,P={proxyUrl:null,alwaysUseProxy:false},z={},s={POINT:"esriGeometryPoint",MULTIPOINT:"esriGeometryMultipoint",POLYLINE:"esriGeometryPolyline",POLYGON:"esriGeometryPolygon",ENVELOPE:"esriGeometryEnvelope"},B={};B.getJSON=
function(a,b,c,d){o(a,b,c,d)};B.addToMap=function(a,b){if(r(b))for(var c,d=0,e=b.length;d<e;d++){c=b[d];if(r(c))B.addToMap(a,c);else W(c)&&c.setMap(a)}};B.removeFromMap=function(a,b){B.addToMap(null,a);if(b)a.length=0};l.prototype.forward=function(a){return a};l.prototype.inverse=function(a){return a};l.prototype.v=function(){return 360};l.prototype.toJSON=function(){return"{"+(this.wkid?" wkid:"+this.wkid:"wkt: '"+this.wkt+"'")+"}"};U.prototype=new l;u.prototype=new l;u.prototype.n=function(a,b){var c=
Math.sin(a);return Math.cos(a)/Math.sqrt(1-b*c*c)};u.prototype.A=function(a,b){var c=b*Math.sin(a);return Math.tan(Math.PI/4-a/2)/Math.pow((1-c)/(1+c),b/2)};u.prototype.u=function(a,b,c,d){return a*b*Math.pow(c,d)};u.prototype.t=function(a,b,c){c=b*Math.sin(c);return Math.PI/2-2*Math.atan(a*Math.pow((1-c)/(1+c),b/2))};u.prototype.K=function(a,b,c){var d=0;c=c;for(var e=this.t(a,b,c);Math.abs(e-c)>1.0E-9&&d<10;){d++;c=e;e=this.t(a,b,c)}return e};u.prototype.forward=function(a){var b=a[0]*k;a=this.u(this.a,
this.I,this.A(a[1]*k,this.h),this.b);b=this.b*(b-this.i);return[this.l+a*Math.sin(b),this.m+this.j-a*Math.cos(b)]};u.prototype.inverse=function(a){var b=a[0]-this.l,c=a[1]-this.m;a=Math.atan(b/(this.j-c));b=Math.pow((this.b>0?1:-1)*Math.sqrt(b*b+(this.j-c)*(this.j-c))/(this.a*this.I),1/this.b);return[(a/this.b+this.i)/k,this.K(b,this.h,Math.PI/2-2*Math.atan(b))/k]};u.prototype.v=function(){return Math.PI*2*this.a};C.prototype=new l;C.prototype.n=function(a,b,c,d,e){return b*((1-c/4-3*d/64-5*e/256)*
a-(3*c/8+3*d/32+45*e/1024)*Math.sin(2*a)+(15*d/256+45*e/1024)*Math.sin(4*a)-35*e/3072*Math.sin(6*a))};C.prototype.forward=function(a){var b=a[1]*k,c=a[0]*k;a=this.a/Math.sqrt(1-this.e*Math.pow(Math.sin(b),2));var d=Math.pow(Math.tan(b),2),e=this.q*Math.pow(Math.cos(b),2);c=(c-this.i)*Math.cos(b);var f=this.n(b,this.a,this.e,this.C,this.J);return[this.l+this.D*a*(c+(1-d+e)*Math.pow(c,3)/6+(5-18*d+d*d+72*e-58*this.q)*Math.pow(c,5)/120),this.m+this.D*(f-this.L)+a*Math.tan(b)*(c*c/2+(5-d+9*e+4*e*e)*Math.pow(c,
4)/120+(61-58*d+d*d+600*e-330*this.q)*Math.pow(c,6)/720)]};C.prototype.inverse=function(a){var b=a[0],c=a[1];a=(1-Math.sqrt(1-this.e))/(1+Math.sqrt(1-this.e));c=(this.L+(c-this.m)/this.D)/(this.a*(1-this.e/4-3*this.C/64-5*this.J/256));a=c+(3*a/2-27*Math.pow(a,3)/32)*Math.sin(2*c)+(21*a*a/16-55*Math.pow(a,4)/32)*Math.sin(4*c)+151*Math.pow(a,3)/6*Math.sin(6*c)+1097*Math.pow(a,4)/512*Math.sin(8*c);c=this.q*Math.pow(Math.cos(a),2);var d=Math.pow(Math.tan(a),2),e=this.a/Math.sqrt(1-this.e*Math.pow(Math.sin(a),
2)),f=this.a*(1-this.e)/Math.pow(1-this.e*Math.pow(Math.sin(a),2),1.5);b=(b-this.l)/(e*this.D);e=a-e*Math.tan(a)/f*(b*b/2-(5+3*d+10*c-4*c*c-9*this.q)*Math.pow(b,4)/24+(61+90*d+28*c+45*d*d-252*this.q-3*c*c)*Math.pow(b,6)/720);return[(this.i+(b-(1+2*d+c)*Math.pow(b,3)/6+(5-2*c+28*d-3*c*c+8*this.q+24*d*d)*Math.pow(b,5)/120)/Math.cos(a))/k,e/k]};C.prototype.v=function(){return Math.PI*2*this.a};D.prototype=new l;D.prototype.forward=function(a){var b=a[1]*k;return[this.a*(a[0]*k-this.i),this.a/2*Math.log((1+
Math.sin(b))/(1-Math.sin(b)))]};D.prototype.inverse=function(a){return[(a[0]/this.a+this.i)/k,(Math.PI/2-2*Math.atan(Math.exp(-a[1]/this.a)))/k]};v.prototype=new l;v.prototype.n=function(a,b){var c=Math.sin(a);return Math.cos(a)/Math.sqrt(1-b*c*c)};v.prototype.z=function(a,b){var c=b*Math.sin(a);return(1-b*b)*(Math.sin(a)/(1-c*c)-1/(2*b)*Math.log((1-c)/(1+c)))};v.prototype.u=function(a,b,c,d){return a*Math.sqrt(b-c*d)/c};v.prototype.t=function(a,b,c){var d=b*Math.sin(c);return c+(1-d*d)*(1-d*d)/(2*
Math.cos(c))*(a/(1-b*b)-Math.sin(c)/(1-d*d)+Math.log((1-d)/(1+d))/(2*b))};v.prototype.K=function(a,b,c){var d=0;c=c;for(var e=this.t(a,b,c);Math.abs(e-c)>1.0E-8&&d<10;){d++;c=e;e=this.t(a,b,c)}return e};v.prototype.forward=function(a){var b=a[0]*k;a=this.u(this.a,this.H,this.b,this.z(a[1]*k,this.h));b=this.b*(b-this.i);return[this.l+a*Math.sin(b),this.m+this.j-a*Math.cos(b)]};v.prototype.inverse=function(a){var b=a[0]-this.l;a=a[1]-this.m;var c=Math.sqrt(b*b+(this.j-a)*(this.j-a)),d=this.b>0?1:-1;
c=(this.H-c*c*this.b*this.b/(this.a*this.a))/this.b;return[(Math.atan(d*b/(d*this.j-d*a))/this.b+this.i)/k,this.K(c,this.h,Math.asin(c/2))/k]};v.prototype.v=function(){return Math.PI*2*this.a};D.prototype.v=function(){return Math.PI*2*this.a};J=new U({wkid:4326});Z=new U({wkid:4269});R=new D({wkid:102113,semi_major:6378137,central_meridian:0,unit:1});$=new D({wkid:102100,semi_major:6378137,central_meridian:0,unit:1});z={"4326":J,"4269":Z,"102113":R,"102100":$};l.WGS84=J;l.NAD83=Z;l.WEB_MERCATOR=R;
l.WEB_MERCATOR_AUX=$;l.register=function(a,b){var c=z[""+a];if(c)return c;if(b instanceof l)c=z[""+a]=b;else{c=b||a;var d={wkt:a};if(a===parseInt(a,10))d={wkid:a};var e=n(c,'PROJECTION["','"]'),f=n(c,"SPHEROID[","]").split(",");if(e!==""){d.unit=parseFloat(n(n(c,"PROJECTION",""),"UNIT[","]").split(",")[1]);d.semi_major=parseFloat(f[1]);d.inverse_flattening=parseFloat(f[2]);d.latitude_of_origin=parseFloat(n(c,'"Latitude_Of_Origin",',"]"));d.central_meridian=parseFloat(n(c,'"Central_Meridian",',"]"));
d.false_easting=parseFloat(n(c,'"False_Easting",',"]"));d.false_northing=parseFloat(n(c,'"False_Northing",',"]"))}switch(e){case "":c=new l(d);break;case "Lambert_Conformal_Conic":d.standard_parallel_1=parseFloat(n(c,'"Standard_Parallel_1",',"]"));d.standard_parallel_2=parseFloat(n(c,'"Standard_Parallel_2",',"]"));c=new u(d);break;case "Transverse_Mercator":d.scale_factor=parseFloat(n(c,'"Scale_Factor",',"]"));c=new C(d);break;case "Albers":d.standard_parallel_1=parseFloat(n(c,'"Standard_Parallel_1",',
"]"));d.standard_parallel_2=parseFloat(n(c,'"Standard_Parallel_2",',"]"));c=new v(d);break;default:throw new Error(e+"  not supported");}if(c)z[""+a]=c}return c};E.prototype.loadInfo=function(a){var b=this;this.loaded||o(this.url,{},"callback",function(c){m(c,b);b.loaded=true;a&&a()})};E.prototype.isInScale=function(a){if(this.maxScale&&this.maxScale>a)return false;if(this.minScale&&this.minScale<a)return false;return true};E.prototype.query=function(a,b,c){if(a){var d=m(a,{});if(a.geometry&&!G(a.geometry)){d.geometry=
I(a.geometry);d.geometryType=S(a.geometry);d.inSR=4326}if(a.spatialRelationship){d.spatialRel=a.spatialRelationship;delete d.spatialRelationship}if(a.outFields&&!r(a.outFields))d.outFields=a.outFields.join(",");if(a.objectIds)d.objectIds=a.objectIds.join(",");if(a.time)d.time=aa(a.time,a.endTime);d.outSR=4326;d.returnGeometry=a.returnGeometry===false?false:true;d.returnIdsOnly=a.returnIdsOnly===true?true:false;delete d.overlayOptions;o(this.url+"/query",d,"callback",function(e){ea(e.features,a.overlayOptions);
b(e,e.error);t(c,e)})}};E.prototype.queryRelatedRecords=function(a,b,c){if(a){a=m(a,{});a.f=a.f||"json";if(a.outFields&&!G(a.outFields))a.outFields=a.outFields.join(",");a.returnGeometry=a.returnGeometry===false?false:true;o(this.url+"/query",a,p.g,function(d){t(c,d);b(d)})}};q.prototype.r=function(a){var b=this;m(a,this);this.spatialReference=a.spatialReference.wkt?z.aa(a.spatialReference.wkt,a.spatialReference.wkt):z[a.spatialReference.wkid];a.tables!==undefined?o(this.url+"/layers",{},p.g,function(c){b.N(c)}):
this.N(a)};q.prototype.N=function(a){var b=[],c=[],d,e,f,g;e=0;for(f=a.layers.length;e<f;e++){g=a.layers[e];d=new E(this.url+"/"+g.id);m(g,d);d.visible=d.defaultVisibility;b.push(d)}if(a.tables){e=0;for(f=a.tables.length;e<f;e++){g=a.tables[e];d=new E(this.url+"/"+g.id);m(g,d);c.push(d)}}e=0;for(f=b.length;e<f;e++){d=b[e];if(d.subLayerIds){d.subLayers=[];g=0;for(var h=d.subLayerIds.length;g<h;g++){var j=this.getLayer(d.subLayerIds[g]);d.subLayers.push(j);j.parentLayer=d}}}this.layers=b;if(a.tables)this.tables=
c;this.loaded=true;M(this,"load")};q.prototype.getLayer=function(a){var b=this.layers;if(b)for(var c=0,d=b.length;c<d;c++){if(a===b[c].id)return b[c];if(G(a)&&b[c].name.toLowerCase()===a.toLowerCase())return b[c]}return null};q.prototype.Y=function(){var a={};if(this.layers)for(var b=0,c=this.layers.length;b<c;b++){var d=this.layers[b];if(d.definition)a[String(d.id)]=d.definition}return a};q.prototype.Z=function(){var a=[];if(this.layers){var b,c,d;c=0;for(d=this.layers.length;c<d;c++){b=this.layers[c];
if(b.subLayers)for(var e=0,f=b.subLayers.length;e<f;e++)if(b.subLayers[e].visible===false){b.visible=false;break}}c=0;for(d=this.layers.length;c<d;c++){b=this.layers[c];b.visible===true&&a.push(b.id)}}return a};q.prototype.getInitialBounds=function(){if(this.initialExtent)return ca(this.initialExtent);return null};q.prototype.exportMap=function(a,b,c){if(a&&a.bounds){var d={};d.f=a.f;var e=a.bounds;d.bbox=""+e.getSouthWest().lng()+","+e.getSouthWest().lat()+","+e.getNorthEast().lng()+","+e.getNorthEast().lat();
d.size=""+a.width+","+a.height;d.dpi=a.dpi;if(a.imageSR)d.imageSR=a.imageSR.wkid?a.imageSR.wkid:"{wkt:"+a.imageSR.wkt+"}";d.bboxSR="4326";d.format=a.format;e=a.layerDefinitions;if(e===undefined)e=this.Y();d.layerDefs=V(e);e=a.layerIds;var f=a.layerOption||"show";if(e===undefined)e=this.Z();if(e.length>0){d.layers=f+":"+e.join(",");d.transparent=a.transparent===false?false:true;if(a.time)d.time=aa(a.time,a.endTime);d.layerTimeOptions=a.layerTimeOptions;if(d.f==="image")return this.url+"/export?"+ha(d);
else o(this.url+"/export",d,"callback",function(g){if(g.extent){g.bounds=ca(g.extent);delete g.extent;b(g)}else t(c,g.error)})}else b&&b({href:null})}};q.prototype.identify=function(a,b,c){if(a){var d={};d.geometry=I(a.geometry);d.geometryType=S(a.geometry);d.mapExtent=I(a.bounds);d.tolerance=a.tolerance||2;d.sr=4326;d.imageDisplay=""+a.width+","+a.height+","+(a.dpi||96);d.layers=a.layerOption||"all";if(a.layerIds)d.layers+=":"+a.layerIds.join(",");if(a.layerDefs)d.layerDefs=V(a.layerDefs);d.maxAllowableOffset=
a.maxAllowableOffset;d.returnGeometry=a.returnGeometry===false?false:true;o(this.url+"/identify",d,"callback",function(e){var f,g,h;if(e.results)for(f=0;f<e.results.length;f++){g=e.results[f];h=K(g.geometry,a.overlayOptions);g.feature={geometry:h,attributes:g.attributes};delete g.attributes}b(e);t(c,e)})}};q.prototype.find=function(a,b,c){if(a){var d=m(a,{});if(a.layerIds){d.layers=a.layerIds.join(",");delete d.layerIds}if(a.searchFields)d.searchFields=a.searchFields.join(",");d.contains=a.contains===
false?false:true;if(a.layerDefinitions){d.layerDefs=V(a.layerDefinitions);delete d.layerDefinitions}d.sr=4326;d.returnGeometry=a.returnGeometry===false?false:true;o(this.url+"/find",d,p.g,function(e){var f,g,h;if(e.results)for(f=0;f<e.results.length;f++){g=e.results[f];h=K(g.geometry,a.overlayOptions);g.feature={geometry:h,attributes:g.attributes};delete g.attributes}b(e);t(c,e)})}};q.prototype.queryLayer=function(a,b,c,d){(a=this.getLayer(a))&&a.query(b,c,d)};Q.prototype.r=function(a){m(a,this);
if(a.spatialReference)this.spatialReference=z[a.spatialReference.wkid||a.spatialReference.wkt]||J;this.loaded=true;M(this,"load")};Q.prototype.findAddressCandidates=function(a,b,c){a=m(a,{});if(a.inputs){m(a.inputs,a);delete a.inputs}if(r(a.outFields))a.outFields=a.outFields.join(",");a.outSR=4326;var d=this;o(this.url+"/findAddressCandidates",a,p.g,function(e){if(e.candidates)for(var f,g,h=0;h<e.candidates.length;h++){f=e.candidates[h];g=f.location;if(!isNaN(g.x)&&!isNaN(g.y)){g=[g.x,g.y];if(d.spatialReference)g=
d.spatialReference.inverse(g);f.location=new i.LatLng(g[1],g[0])}}b(e);t(c,e)})};Q.prototype.geocode=function(a,b){this.findAddressCandidates(a,b)};Q.prototype.reverseGeocode=function(a,b,c){G(a.location)||(a.location=I(a.location));a.outSR=4326;var d=this;o(this.url+"/reverseGeocode",a,p.g,function(e){if(e.location){var f=e.location;if(!isNaN(f.x)&&!isNaN(f.y)){f=[f.x,f.y];if(d.spatialReference)f=d.spatialReference.inverse(f);e.location=new i.LatLng(f[1],f[0])}}b(e);t(c,e)})};Y.prototype.project=
function(a,b,c){var d=ga(a);o(this.url+"/project",d,"callback",function(e){var f=[];if(a.outSpatialReference===4326||a.outSpatialReference.wkid===4326){for(var g=0,h=e.geometries.length;g<h;g++)f.push(K(e.geometries[g]));e.geometries=f}b(e);t(c,e)})};Y.prototype.buffer=function(a,b,c){var d=ga(a);if(a.bufferSpatialReference)d.bufferSR=N(a.bufferSpatialReference);d.outSR=4326;d.distances=a.distances.join(",");if(a.unit)d.unit=a.unit;o(this.url+"/buffer",d,"callback",function(e){var f=[];if(e.geometries)for(var g=
0,h=e.geometries.length;g<h;g++)f.push(K(e.geometries[g],a.overlayOptions));e.geometries=f;b(e);t(c,e)})};ia.prototype.execute=function(a,b,c){var d={};a.parameters&&m(a.parameters,d);d["env:outSR"]=a.outSpatialReference?N(a.outSpatialReference):4326;if(a.processSpatialReference)d["env:processSR"]=N(a.processSpatialReference);o(this.url+"/execute",d,p.g,function(e){if(e.results)for(var f,g,h=0;h<e.results.length;h++){f=e.results[h];if(f.dataType==="GPFeatureRecordSetLayer")for(var j=0,O=f.value.features.length;j<
O;j++){g=f.value.features[j];if(g.geometry)g.geometry=K(g.geometry,a.overlayOptions)}}b(e);t(c,e)})};ja.prototype.solve=function(a,b,c){if(a){var d=m(a,{});if(r(a.stops))d.stops=fa(a.stops);if(r(a.barriers))if(a.barriers.length>0)d.barriers=fa(a.barriers);else delete d.barriers;d.returnRoutes=a.returnRoutes===false?false:true;d.returnDirections=a.returnDirections===true?true:false;d.returnBarriers=a.returnBarriers===true?true:false;d.returnStops=a.returnStops===true?true:false;o(this.url+"/solve",
d,"callback",function(e){e.routes&&ea(e.routes.features,a.overlayOptions);b(e);t(c,e)})}};x.prototype.fromLatLngToPoint=function(a,b){if(!a||isNaN(a.lat())||isNaN(a.lng()))return null;var c=this.s.forward([a.lng(),a.lat()]),d=b||new i.Point(0,0);d.x=(c[0]-this.R)/this.G;d.y=(this.S-c[1])/this.G;return d};x.prototype.fromPointToLatLng=function(a){if(a===null)return null;a=this.s.inverse([a.x*this.G+this.R,this.S-a.y*this.G]);return new i.LatLng(a[1],a[0])};x.M=new x;y.prototype.r=function(a){if(this.c.tileInfo){this.p=
new x(this.c.tileInfo);this.minZoom=a.minZoom||this.p.minZoom;this.maxZoom=a.maxZoom||this.p.maxZoom}};y.prototype.getTileUrl=function(a,b){var c=b-(this.p?this.p.minZoom:this.minZoom),d="";if(!isNaN(a.x)&&!isNaN(a.y)&&c>=0&&a.x>=0&&a.y>=0){d=this.c.url;if(this.V)d=this.V.replace("["+this.Q+"]",""+(a.y+a.x)%this.Q);if(this.c.ca)d=d+"/tile/"+c+"/"+a.y+"/"+a.x;else{c=this.p||this.P?this.P.getProjection():x.M;if(!c instanceof x)c=x.M;d=c.U;var e=1<<b,f=new i.Point(a.x*d.width/e,(a.y+1)*d.height/e);e=
new i.Point((a.x+1)*d.width/e,a.y*d.height/e);f=new i.LatLngBounds(c.fromPointToLatLng(f),c.fromPointToLatLng(e));e={f:"image"};e.bounds=f;e.width=d.width;e.height=d.height;e.imageSR=c.s;d=this.c.exportMap(e)}}return d};y.prototype.setOpacity=function(a){this.d=a;var b=this.k;for(var c in b)b.hasOwnProperty(c)&&H(b[c],a)};y.prototype.getOpacity=F("d");y.prototype.getMapService=F("c");L.prototype.getTile=function(a,b,c){for(var d=c.createElement("div"),e="_"+a.x+"_"+a.y+"_"+b,f=0;f<this.w.length;f++){var g=
this.w[f];if(b<=g.maxZoom&&b>=g.minZoom){var h=g.getTileUrl(a,b);if(h){var j=c.createElement(document.all?"img":"div");j.style.border="0px none";j.style.margin="0px";j.style.padding="0px";j.style.overflow="hidden";j.style.position="absolute";j.style.top="0px";j.style.left="0px";j.style.width=""+this.tileSize.width+"px";j.style.height=""+this.tileSize.height+"px";if(document.all)j.src=h;else j.style.backgroundImage="url("+h+")";d.appendChild(j);g.k[e]=j;if(g.d!==undefined)H(j,g.d);else this.d!==undefined&&
H(j,this.d)}}}this.k[e]=d;d.setAttribute("tid",e);return d};L.prototype.releaseTile=function(a){if(a.getAttribute("tid")){a=a.getAttribute("tid");this.k[a]&&delete this.k[a];for(var b=0;b<this.w.length;b++){var c=this.w[b];c.k[a]&&delete c.k[a]}}};L.prototype.setOpacity=function(a){this.d=a;var b=this.k;for(var c in b)if(b.hasOwnProperty(c))for(var d=b[c].childNodes,e=0;e<d.length;e++)H(d[e],a)};L.prototype.getOpacity=F("d");L.prototype.getTileLayers=F("w");if(i.OverlayView)A.prototype=new i.OverlayView;
A.prototype.onAdd=function(){var a=document.createElement("div");a.style.position="absolute";a.style.border="none";a.style.position="absolute";this.o=a;this.getPanes().overlayLayer.appendChild(a);this.d&&H(a,this.d);var b=this;this.W=i.event.addListener(this.getMap(),"bounds_changed",function(){b.refresh()})};A.prototype.onRemove=function(){i.event.removeListener(this.W);this.o.parentNode.removeChild(this.o);this.o=null};A.prototype.draw=function(){if(!this.B||this.F===true)this.refresh()};A.prototype.getOpacity=
F("d");A.prototype.setOpacity=function(a){this.d=a=Math.min(Math.max(a,0),1);H(this.o,a)};A.prototype.getMapService=F("c");A.prototype.refresh=function(){if(this.B===true)this.F=true;else{var a=this.getMap(),b=a?a.getBounds():null;if(b){var c=this.X;c.bounds=b;b=R;var d=a.getDiv();c.width=d.offsetWidth;c.height=d.offsetHeight;if((a=a.getProjection())&&a instanceof x)b=a.s;c.imageSR=b;i.event.trigger(this,"drawstart");var e=this;this.B=true;this.o.style.backgroundImage="";this.c.exportMap(c,function(f){e.B=
false;if(e.F===true){e.F=false;e.refresh()}else{if(f.href){var g=e.getProjection(),h=f.bounds,j=g.fromLatLngToDivPixel(h.getSouthWest());g=g.fromLatLngToDivPixel(h.getNorthEast());h=e.o;h.style.left=j.x+"px";h.style.top=g.y+"px";h.style.width=g.x-j.x+"px";h.style.height=j.y-g.y+"px";e.o.style.backgroundImage="url("+f.href+")";e.setOpacity(e.d)}i.event.trigger(e,"drawend")}})}}};w.gmaps.ags={SpatialReference:l,Geographic:U,Albers:v,LambertConformalConic:u,SphereMercator:D,TransverseMercator:C,SpatialRelationship:{INTERSECTS:"esriSpatialRelIntersects",
CONTAINS:"esriSpatialRelContains",CROSSES:"esriSpatialRelCrosses",ENVELOPE_INTERSECTS:"esriSpatialRelEnvelopeIntersects",INDEX_INTERSECTS:"esriSpatialRelIndexIntersects",OVERLAPS:"esriSpatialRelOverlaps",TOUCHES:"esriSpatialRelTouches",WITHIN:"esriSpatialRelWithin"},GeometryType:s,SRUnit:{METER:9001,FOOT:9002,SURVEY_FOOT:9003,SURVEY_MILE:9035,KILLOMETER:9036,RADIAN:9101,DEGREE:9102},Catalog:function(a){this.url=a;var b=this;o(a,{ba:p.O},p.g,function(c){m(c,b);M(b,p.load)})},MapService:q,Layer:E,GeocodeService:Q,
GeometryService:Y,GPService:function(a){this.url=a;this.loaded=false;var b=this;o(a,{},p.g,function(c){m(c,b);b.loaded=true;i.event.trigger(b,p.load)})},GPTask:ia,RouteTask:ja,Util:B,Config:P,Projection:x,TileLayer:y,MapOverlay:A,MapType:L}})();

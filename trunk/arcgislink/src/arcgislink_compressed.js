(function(){var I=function(G){var C,ab,aa;var W=G.split(".");aa=window;for(C=0,ab=W.length;C<ab;C++){aa[W[C]]=aa[W[C]]||{};aa=aa[W[C]]}return aa};var e=window;var q=I("google.maps");var S=function(W,ab,C){var G=(ab==="")?0:W.indexOf(ab);var aa=C===""?W.length:W.indexOf(C,G+ab.length);return W.substring(G+ab.length,aa)};var o=function(C){return typeof C==="string"};var w=function(C){return C&&C.splice};var L=function(aa,C,G){if(aa&&C){var W;for(W in aa){if(G||!(W in C)){C[W]=aa[W]}}}return C};var H=function(C,aa,G){if(C&&aa){if(C.indexOf&&!G){return C.indexOf(aa)}else{for(var W=0,ab=C.length;W<ab;W++){if(C[W]===aa||(G===true&&C[W].toString().toLowerCase()===aa.toString().toLowerCase())){return W}}}}return -1};var P=function(C,W){for(var G=0,aa=W.length;G<aa;G++){C.push(W[G])}return C};var s=function(C,W){var G=H(C,W);if(G!==-1){C.splice(G,1)}};var g=function(W,G){if(typeof W[G]!=="undefined"){return W[G]}for(var C in W){if(W.hasOwnProperty(C)){if(G.toLowerCase()===C.toString().toLowerCase()){return W[C]}}}return null};var R=function(W,G,C){if(q.event){q.event.trigger.apply(this,arguments)}};var K=function(G,W){W=Math.min(Math.max(W,0),1);if(G){var C=G.style;if(typeof C.opacity!=="undefined"){C.opacity=W}if(typeof C.filters!=="undefined"){C.filters.alpha.opacity=Math.floor(100*W)}if(typeof C.filter!=="undefined"){C.filter="alpha(opacity:"+Math.floor(W*100)+")"}}};var l=function(G){if(window.console){console.log(G)}else{var C=document.getElementById("_ags_log");if(C){C.innerHTML=C.innerHTML+G+"<br/>"}}};var Y=Math.PI/180;var d={};var i=0;window.ags_jsonp=window.ags_jsonp||{};var u=window.ags_jsonp;var t={json:"json",callback:"callback"};d.getJSON=function(C,W,ae,ac){var G="ags_jsonp"+(i++)+"_"+Math.floor(Math.random()*1000000);var ab=C+(C.indexOf("?")===-1?"?":"&");if(W){W.f=W.f||"json";for(var ag in W){if(W.hasOwnProperty(ag)&&W[ag]!==null&&W[ag]!==undefined){ab+=(ag+"="+(escape?escape(W[ag]):encodeURIComponent(W[ag]))+"&")}}}var af=document.getElementsByTagName("head")[0];if(!af){throw new Error("document must have header tag")}var ad=document.createElement("script");ad.src=ab+ae+"=ags_jsonp."+G;ad.id=G;var aa=function(){delete u[G];af.removeChild(ad);ad=null;ac.apply(null,arguments);R(d,"jsonpend",G)};u[G]=aa;af.appendChild(ad);R(d,"jsonpstart",G);return G};d.groupResultsByLayer=function(ag){var aa={};var ab,W;var C=ag.results;if(C){for(var G=0,ac=C.length;G<ac;G++){ab=C[G];W=ab.layerName;if(!aa[W]){var af={};for(var ad in ab.attributes){if(ab.attributes.hasOwnProperty(ad)){af[ad]=ad}}var ae={displayFieldName:ab.displayFieldName,spatialReference:ab.geometry?ab.geometry.spatialReference:null,geometryType:ab.geometryType,fieldAliases:af,features:[]};aa[W]=ae}aa[W].features.push(ab)}}return aa};d.getResultSetHtml=function(ae,C){var aa='<table class="ags-resultset">';var W,G,af,ad;C=C||(ae.features.length===1?"v":"h");var ab=[];for(var ag in ae.fieldAliases){if(ae.fieldAliases.hasOwnProperty(ag)){ab.push(ag)}}if(C==="h"){aa+="<tr>";for(W=0,af=ab.length;W<af;W++){aa+='<th class="ags-fieldname">'+ae.fieldAliases[ab[W]]+"</th>"}aa+="</tr>"}for(W=0,af=ae.features.length;W<af;W++){var ac=ae.features[W].attributes;if(C==="h"){aa+="<tr>"}else{if(W>0){aa+='<tr><td colspan="2"><hr/></td></tr>'}}for(G=0,ad=ab.length;G<ad;G++){if(C==="h"){aa+='<td class="ags-fieldvalue">'+ac[ab[G]]+"</td>"}else{aa+='<tr><td class="ags-fieldname">'+ae.fieldAliases[ab[G]]+'</td><td class="ags-fieldvalue">'+ac[ab[G]]+"</td></tr>"}}if(C==="h"){aa+="</tr>"}}aa+="</table>";return aa};var k={maxPolyPoints:1000,style:{icon:null,strokeColor:"#FFFF00",strokeWeight:8,strokeOpacity:0.5,outlineColor:"#FF0000",outlineWeight:2,outlineOpacity:0.5,fillColor:"#FFFF00",fillOpacity:0.5}};var c={};function a(C){C=C||{};this.wkid=C.wkid;this.wkt=C.wkt}a.prototype.getKey=function(){return this.wkid?this.wkid:this.wkt?this.wkt:null};a.prototype.forward=function(C){return C};a.prototype.reverse=function(C){return C};a.prototype.getCircumference=function(){return 360};function B(C){C=C||{};a.call(this,C)}B.prototype=new a();function J(C){C=C||{};a.call(this,C);var ab=C.inverse_flattening;var ae=C.standard_parallel_1*Y;var ad=C.standard_parallel_2*Y;var af=C.latitude_of_origin*Y;this.a_=C.semi_major/C.unit;this.lamdaF_=C.central_meridian*Y;this.FE_=C.false_easting;this.FN_=C.false_northing;var aa=1/ab;var ag=2*aa-aa*aa;this.e_=Math.sqrt(ag);var ai=this.calc_m_(ae,ag);var ah=this.calc_m_(ad,ag);var ac=this.calc_t_(af,this.e_);var W=this.calc_t_(ae,this.e_);var G=this.calc_t_(ad,this.e_);this.n_=Math.log(ai/ah)/Math.log(W/G);this.F_=ai/(this.n_*Math.pow(W,this.n_));this.rF_=this.calc_r_(this.a_,this.F_,ac,this.n_)}J.prototype=new a();J.prototype.calc_m_=function(G,W){var C=Math.sin(G);return Math.cos(G)/Math.sqrt(1-W*C*C)};J.prototype.calc_t_=function(G,W){var C=W*Math.sin(G);return Math.tan(Math.PI/4-G/2)/Math.pow((1-C)/(1+C),W/2)};J.prototype.calc_r_=function(C,W,G,aa){return C*W*Math.pow(G,aa)};J.prototype.calc_phi_=function(C,aa,W){var G=aa*Math.sin(W);return Math.PI/2-2*Math.atan(C*Math.pow((1-G)/(1+G),aa/2))};J.prototype.solve_phi_=function(W,ab,ac){var G=0;var aa=ac;var C=this.calc_phi_(W,ab,aa);while(Math.abs(C-aa)>1e-9&&G<10){G++;aa=C;C=this.calc_phi_(W,ab,aa)}return C};J.prototype.forward=function(C){var ac=C[1]*Y;var G=C[0]*Y;var aa=this.calc_t_(ac,this.e_);var ab=this.calc_r_(this.a_,this.F_,aa,this.n_);var W=this.n_*(G-this.lamdaF_);var ad=this.FE_+ab*Math.sin(W);var ae=this.FN_+this.rF_-ab*Math.cos(W);return[ad,ae]};J.prototype.reverse=function(ad){var ac=ad[0];var ae=ad[1];var W=Math.atan((ac-this.FE_)/(this.rF_-(ae-this.FN_)));var G=(this.n_>0?1:-1)*Math.sqrt((ac-this.FE_)*(ac-this.FE_)+(this.rF_-(ae-this.FN_))*(this.rF_-(ae-this.FN_)));var aa=Math.pow((G/(this.a_*this.F_)),1/this.n_);var ab=this.solve_phi_(aa,this.e_,0);var C=W/this.n_+this.lamdaF_;return[C/Y,ab/Y]};J.prototype.getCircumference=function(){return Math.PI*2*this.a_};function N(aa){aa=aa||{};a.call(this,aa);this.a_=aa.semi_major/aa.unit;var G=aa.inverse_flattening;this.k0_=aa.scale_factor;var C=aa.latitude_of_origin*Y;this.lamdaF_=aa.central_meridian*Y;this.FE_=aa.false_easting;this.FN_=aa.false_northing;var W=1/G;this.es_=2*W-W*W;this.ep4_=this.es_*this.es_;this.ep6_=this.ep4_*this.es_;this.eas_=this.es_/(1-this.es_);this.M0_=this.calc_m_(C,this.a_,this.es_,this.ep4_,this.ep6_)}N.prototype=new a();N.prototype.calc_m_=function(G,C,ab,aa,W){return C*((1-ab/4-3*aa/64-5*W/256)*G-(3*ab/8+3*aa/32+45*W/1024)*Math.sin(2*G)+(15*aa/256+45*W/1024)*Math.sin(4*G)-(35*W/3072)*Math.sin(6*G))};N.prototype.forward=function(ab){var ad=ab[1]*Y;var ah=ab[0]*Y;var af=this.a_/Math.sqrt(1-this.es_*Math.pow(Math.sin(ad),2));var aa=Math.pow(Math.tan(ad),2);var G=this.eas_*Math.pow(Math.cos(ad),2);var W=(ah-this.lamdaF_)*Math.cos(ad);var ae=this.calc_m_(ad,this.a_,this.es_,this.ep4_,this.ep6_);var ag=this.FE_+this.k0_*af*(W+(1-aa+G)*Math.pow(W,3)/6+(5-18*aa+aa*aa+72*G-58*this.eas_)*Math.pow(W,5)/120);var ac=this.FN_+this.k0_*(ae-this.M0_)+af*Math.tan(ad)*(W*W/2+(5-aa+9*G+4*G*G)*Math.pow(W,4)/120+(61-58*aa+aa*aa+600*G-330*this.eas_)*Math.pow(W,6)/720);return[ag,ac]};N.prototype.reverse=function(ah){var ak=ah[0];var ac=ah[1];var af=(1-Math.sqrt(1-this.es_))/(1+Math.sqrt(1-this.es_));var G=this.M0_+(ac-this.FN_)/this.k0_;var ai=G/(this.a_*(1-this.es_/4-3*this.ep4_/64-5*this.ep6_/256));var ag=ai+(3*af/2-27*Math.pow(af,3)/32)*Math.sin(2*ai)+(21*af*af/16-55*Math.pow(af,4)/32)*Math.sin(4*ai)+(151*Math.pow(af,3)/6)*Math.sin(6*ai)+(1097*Math.pow(af,4)/512)*Math.sin(8*ai);var aa=this.eas_*Math.pow(Math.cos(ag),2);var ad=Math.pow(Math.tan(ag),2);var ae=this.a_/Math.sqrt(1-this.es_*Math.pow(Math.sin(ag),2));var W=this.a_*(1-this.es_)/Math.pow((1-this.es_*Math.pow(Math.sin(ag),2)),3/2);var C=(ak-this.FE_)/(ae*this.k0_);var ab=ag-(ae*Math.tan(ag)/W)*(C*C/2-(5+3*ad+10*aa-4*aa*aa-9*this.eas_)*Math.pow(C,4)/24+(61+90*ad+28*aa+45*ad*ad-252*this.eas_-3*aa*aa)*Math.pow(C,6)/720);var aj=this.lamdaF_+(C-(1+2*ad+aa)*Math.pow(C,3)/6+(5-2*aa+28*ad-3*aa*aa+8*this.eas_+24*ad*ad)*Math.pow(C,5)/120)/Math.cos(ag);return[aj/Y,ab/Y]};N.prototype.getCircumference=function(){return Math.PI*2*this.a_};function T(C){C=C||{};a.call(this,C);this.a_=(C.semi_major||6378137)/(C.unit||1);this.lamdaF_=(C.central_meridian||0)*Y}T.prototype=new a();T.prototype.forward=function(C){var W=C[1]*Y;var G=C[0]*Y;var aa=this.a_*(G-this.lamdaF_);var ab=(this.a_/2)*Math.log((1+Math.sin(W))/(1-Math.sin(W)));return[aa,ab]};T.prototype.reverse=function(aa){var W=aa[0];var ab=aa[1];var G=Math.PI/2-2*Math.atan(Math.exp(-ab/this.a_));var C=W/this.a_+this.lamdaF_;return[C/Y,G/Y]};T.prototype.getCircumference=function(){return Math.PI*2*this.a_};function y(C){C=C||{};a.call(this,C);this.lng_=C.latlng.xmin;this.lat_=C.latlng.ymin;this.x_=C.coords.xmin;this.y_=C.coords.ymin;this.xscale_=(C.coords.xmax-C.coords.xmin)/(C.latlng.xmax-C.latlng.xmin);this.yscale_=(C.coords.ymax-C.coords.ymin)/(C.latlng.ymax-C.latlng.ymin)}y.prototype=new a();y.prototype.forward=function(C){var G=this.x_+(C[0]-this.lng_)*this.xscale_;var W=this.y_+(C[1]-this.lat_)*this.yscale_;return[G,W]};y.prototype.reverse=function(G){var C=this.lng_+(G[0]-this.x_)/this.xscale_;var W=this.lat_+(G[1]-this.y_)/this.yscale_;return[C,W]};y.prototype.getCircumference=function(){return this.xscale_*360};var V=new B({wkid:4326});var D=new B({wkid:4269});var F=new T({wkid:102113,semi_major:6378137,central_meridian:0,unit:1});var j=new T({wkid:102100,semi_major:6378137,central_meridian:0,unit:1});c={"4326":V,"4269":D,"102113":F,"102100":j};c.addSpatialReference=function(C,ad){var aa=this[""+C];if(aa){return aa}if(ad instanceof a){this[""+C]=ad;return ad}var ab=ad;var ac={wkt:C};if(C===parseInt(C,10)){ac={wkid:C}}var W=S(ab,'PROJECTION["','"]');var G=S(ab,"SPHEROID[","]").split(",");if(W!==""){ac.unit=parseFloat(S(S(ab,"PROJECTION",""),"UNIT[","]").split(",")[1]);ac.semi_major=parseFloat(G[1]);ac.inverse_flattening=parseFloat(G[2]);ac.latitude_of_origin=parseFloat(S(ab,'"Latitude_Of_Origin",',"]"));ac.central_meridian=parseFloat(S(ab,'"Central_Meridian",',"]"));ac.false_easting=parseFloat(S(ab,'"False_Easting",',"]"));ac.false_northing=parseFloat(S(ab,'"False_Northing",',"]"))}switch(W){case"":aa=new a(ac);break;case"Lambert_Conformal_Conic":ac.standard_parallel_1=parseFloat(S(ab,'"Standard_Parallel_1",',"]"));ac.standard_parallel_2=parseFloat(S(ab,'"Standard_Parallel_2",',"]"));aa=new J(ac);break;case"Transverse_Mercator":ac.scale_factor=parseFloat(S(ab,'"Scale_Factor",',"]"));aa=new N(ac);break;default:}if(aa){this[""+C]=aa}return aa};c.getSpatialReference=function(C){return this[""+C]};var A={POINT:"esriGeometryPoint",MULTIPOINT:"esriGeometryMultipoint",POLYLINE:"esriGeometryPolyline",POLYGON:"esriGeometryPolygon",ENVELOPE:"esriGeometryEnvelope"};var z=function(C){var G=C;if(w(C)&&C.length>0){G=C[0]}if(G instanceof q.LatLng||G instanceof q.Marker){if(w(C)&&C.length>1){return A.MULTIPOINT}else{return A.POINT}}else{if(G instanceof q.Polyline){return A.POLYLINE}else{if(G instanceof q.Polygon){return A.POLYGON}else{if(G instanceof q.LatLngBounds){return A.ENVELOPE}}}}return null};var Q=function(W){var C=[];var ab;for(var G=0,aa=W.getLength();G<aa;G++){ab=W.getAt(G);C.push("["+ab.lng()+","+ab.lat()+"]")}return C.join(",")};var b=function(aa){var ac=z(aa);var ab,C,W,ae;var G="{";switch(ac){case A.POINT:ab=w(aa)?aa[0]:aa;if(ab instanceof q.Marker){ab=ab.getPosition()}G+="x:"+ab.lng()+",y:"+ab.lat();break;case A.MULTIPOINT:ae=[];for(W=0;W<aa.length;W++){if(aa[W] instanceof q.Marker){ab=aa[W].getPosition()}else{ab=aa[W]}ae.push("["+ab.lng()+","+ab.lat()+"]")}G+="points: ["+ae.join(",")+"]";break;case A.POLYLINE:ae=[];C=w(aa)?aa:[aa];for(W=0;W<C.length;W++){ae.push("["+Q(C[W].getPath())+"]")}G+="paths: ["+ae.join(",")+"]";break;case A.POLYGON:ae=[];ab=w(aa)?aa[0]:aa;var ad=ab.getPaths();for(W=0;W<ad.getLength();W++){ae.push("["+Q(ad.getAt(W))+"]")}G+="rings:["+ae.join(",")+"]";break;case A.ENVELOPE:ab=w(aa)?aa[0]:aa;G+="xmin:"+ab.getSouthWest().lng()+",ymin:"+ab.getSouthWest().lat()+",xmax:"+ab.getNorthEast().lng()+",ymax:"+ab.getNorthEast().lat();break}G+=", spatialReference:{wkid:4326}";G+="}";return G};var Z=function(W){var G=c.getSpatialReference(W.spatialReference.wkid||W.spatialReference.wkt);G=G||c.WGS84;var C=G.reverse([W.xmin,W.ymin]);var aa=G.reverse([W.xmax,W.ymax]);return new q.LatLngBounds(new q.LatLng(C[1],C[0]),new q.LatLng(aa[1],aa[0]))};var m=function(aj,G,ai){var aa=[];var W=null;var ad;var am,ah,ac,ag,an,af,ab,ae,C;var al="";G=G||{};if(aj.x){ad=new q.Marker(L(G.marker,{position:new q.LatLng(aj.y,aj.x)}));aa.push(ad)}else{af=aj.points||aj.paths||aj.rings;if(!af){return aa}var ak=[];for(ah=0,ac=af.length;ah<ac;ah++){ab=af[ah];if(aj.points){ad=new q.Marker(L(G.marker,{position:new q.LatLng(ab[1],ab[0])}));aa.push(ad)}else{C=[];for(ag=0,an=ab.length;ag<an;ag++){ae=ab[ag];C.push(new q.LatLng(ae[1],ae[0]))}if(aj.paths){ad=new q.Polyline(L(G.polyline,{path:C}));aa.push(ad)}else{if(aj.rings){ak.push(C)}}}}if(aj.rings){ad=new q.Polygon(L(G.polygon,{paths:ak}));aa.push(ad)}}return aa};function x(C){this.url=C;var G=this;d.getJSON(C,{f:t.json},"callback",function(W){L(W,G);R(G,"load")})}function O(C){this.url=C;this.definition=null}O.prototype.isInScale=function(C){if(this.maxScale&&this.maxScale>C){return false}if(this.minScale&&this.minScale<C){return false}return true};var M={INTERSECTS:"esriSpatialRelIntersects",CONTAINS:"esriSpatialRelContains",CROSSES:"esriSpatialRelCrosses",ENVELOPE_INTERSECTS:"esriSpatialRelEnvelopeIntersects",INDEX_INTERSECTS:"esriSpatialRelIndexIntersects",OVERLAPS:"esriSpatialRelOverlaps",TOUCHES:"esriSpatialRelTouches",WITHIN:"esriSpatialRelWithin"};O.prototype.query=function(W,G){if(!W){return}var C=L(W,{});C.f=C.f||"json";if(C.geometry&&!o(C.geometry)){C.geometry=b(C.geometry)}if(C.geometry){C.spatialRel=C.spatialRel||"esriSpatialRelIntersects"}if(C.outFields&&!o(C.outFields)){C.outFields=C.outFields.join(",")}C.returnGeometry=C.returnGeometry===false?false:true;d.getJSON(this.url+"/query",C,"callback",G)};O.prototype.queryRelatedRecords=function(W,G){if(!W){return}var C=L(W,{});C.f=C.f||"json";if(C.outFields&&!o(C.outFields)){C.outFields=C.outFields.join(",")}C.returnGeometry=C.returnGeometry===false?false:true;d.getJSON(this.url+"/query",C,"callback",G)};function h(C){this.url=C;this.loaded=false;var W=C.split("/");this.name=W[W.length-2].replace(/_/g," ");var G=this;d.getJSON(C,{f:"json"},t.callback,function(aa){G.init_(aa)})}h.prototype.init_=function(C){var G=this;L(C,this);if(C.spatialReference.wkt){this.spatialReference=c.addSpatialReference(C.spatialReference.wkt,C.spatialReference.wkt)}else{this.spatialReference=c.getSpatialReference(C.spatialReference.wkid)}if(C.tables!==undefined){d.getJSON(this.url+"/layers",{f:t.json},t.callback,function(W){G.initLayers_(W)})}else{this.initLayers_(C)}};h.prototype.initLayers_=function(ac){var aa=[];var ag=[];var ad,ab,ae,C;for(ab=0,ae=ac.layers.length;ab<ae;ab++){C=ac.layers[ab];ad=new O(this.url+"/"+C.id);L(C,ad);ad.visible=ad.defaultVisibility;aa.push(ad)}if(ac.tables){for(ab=0,ae=ac.tables.length;ab<ae;ab++){C=ac.tables[ab];ad=new O(this.url+"/"+C.id);L(C,ad);ag.push(ad)}}for(ab=0,ae=aa.length;ab<ae;ab++){ad=aa[ab];if(ad.subLayerIds){ad.subLayers=[];for(var W=0,af=ad.subLayerIds.length;W<af;W++){var G=this.getLayer(ad.subLayerIds[W]);ad.subLayers.push(G);G.parentLayer=ad}}}this.layers=aa;if(ac.tables){this.tables=ag}this.loaded=true;R(this,"load")};h.prototype.getLayer=function(G){var W=this.layers;if(W){for(var C=0,aa=W.length;C<aa;C++){if(G===W[C].id){return W[C]}if(o(G)&&W[C].name.toLowerCase()===G.toLowerCase()){return W[C]}}}return null};h.prototype.getLayerDefs=function(){var C={};if(this.layers){for(var W=0,aa=this.layers.length;W<aa;W++){var G=this.layers[W];if(G.definition){C[String(G.id)]=G.definition}}}return C};h.prototype.getVisibleLayerIds=function(){var W=[];if(this.layers){var ab;var aa,ac;for(aa=0,ac=this.layers.length;aa<ac;aa++){ab=this.layers[aa];if(ab.subLayers){for(var G=0,C=ab.subLayers.length;G<C;G++){if(ab.subLayers[G].visible===false){ab.visible=false;break}}}}for(aa=0,ac=this.layers.length;aa<ac;aa++){ab=this.layers[aa];if(ab.visible===true){W.push(ab.id)}}}return W};h.prototype.getInitialBounds=function(){if(this.initialExtent){return Z(this.initialExtent)}return null};h.prototype.exportMap=function(G,ae){if(!G||!G.bounds){return}var W={f:"json"};var ac=G.bounds;W.bbox=""+ac.getSouthWest().lng()+","+ac.getSouthWest().lat()+","+ac.getNorthEast().lng()+","+ac.getNorthEast().lat();W.size=""+G.width+","+G.height;W.dpi=G.dpi;if(G.imageSR){if(G.imageSR.wkid){W.imageSR=G.imageSR.wkid}else{W.imageSR="{wkt:"+G.imageSR.wkt+"}"}}W.bboxSR="4326";W.format=G.format;var aa=G.layerDefinitions;if(aa===undefined){aa=this.getLayerDefs()}var af="";for(var ad in aa){if(aa.hasOwnProperty(ad)){if(af.length>0){af+=";"}af+=(ad+":"+aa[ad])}}W.layerDefs=af;var ab=G.layerIds;var C=G.layerOption||"show";if(ab===undefined){ab=this.getVisibleLayerIds()}if(ab.length>0){W.layers=C+":"+ab.join(",")}else{ae({href:null});return}W.transparent=(G.transparent===false?false:true);if(G.time){W.time=""+(G.time.getTime()-G.time.getTimezoneOffset()*60000)}if(G.endTime){W.time=W.time+", "+(G.endTime.getTime()-G.endTime.getTimezoneOffset()*60000)}W.layerTimeOptions=G.layerTimeOptions;d.getJSON(this.url+"/export",W,"callback",function(ag){ag.bounds=Z(ag.extent);delete ag.extent;ae(ag)})};h.prototype.identify=function(C,W){if(!C){return}var G={};G.geometry=b(C.geometry);G.geometryType=z(C.geometry);G.mapExtent=b(C.bounds);G.tolerance=C.tolerance||2;G.sr=4326;G.imageDisplay=""+C.width+","+C.height+","+(C.dpi||96);G.layers=(C.layerOption||"all")+":"+(C.layerIds||this.getLayerIds()).join(",");if(C.layerDefs){G.layerDefs=C.layerDefs}G.maxAllowableOffset=C.maxAllowableOffset;G.returnGeometry=(C.returnGeometry===false?false:true);d.getJSON(this.url+"/identify",G,"callback",function(ab){var af=[];var aa,ae,ad,ac;if(ab.results){for(aa=0;aa<ab.results.length;aa++){ae=ab.results[aa];ac=m(ae.geometry,C.overlayOptions);af.push({feature:{geometry:ac,attributes:ae.attributes},displayFieldName:ae.displayFieldName,layerId:ae.layerId,layerName:ae.layerName,value:ae.value})}}W({results:af},ab.error)})};h.prototype.find=function(C,W){if(!C){return}var G=L(C,{});G.f=G.f||"json";if(G.layers&&!o(G.layers)){G.layers=this.getLayerIds(G.layers).join(",")}if(G.searchFields&&!o(G.searchFields)){G.searchFields=G.searchFields.join(",")}G.contains=(G.contains===false?false:true);if(!G.layerDefs){G.layerDefs=this.getLayerDefs()}G.returnGeometry=(G.returnGeometry===false?false:true);d.getJSON(this.url+"/find",G,"callback",W)};h.prototype.queryLayer=function(C,W,aa){var G=this.getLayer(C);if(G){G.query(W,aa)}};function X(C){this.url=C}X.prototype.project=function(ab,ad){if(!ab){return}ab.f=ab.f||"json";if(!o(ab.geometries)){var C=t.esriGeometryPoint;var W=[];for(var G=0,ac=ab.geometries.length;G<ac;G++){var aa=ab.geometries[G];if(G===0){if(aa.points){C=t.esriGeometryMultipoint}else{if(aa.paths){C=t.esriGeometryPolyline}else{if(aa.rings){C=t.esriGeometryPolygon}else{if(aa.xmin){C=t.esriGeometryEnvelope}}}}}W.push(d.fromOverlaysToJSON(aa,false))}ab.geometries="{ geometryType:"+C+", geometries:["+W.join(",")+"]}"}d.getJSON(this.url+"/project",ab,"callback",ad)};function n(C){this.url=C;this.loaded=false;var G=this;d.getJSON(C,{f:"json"},"callback",function(W){G.init_(W)})}n.prototype.init_=function(C){L(C,this);this.loaded=true;R(this,"load")};n.prototype.findAddressCandidates=function(C,W){var G=L(C,{});G.f=G.f||"json";if(G.inputs){L(G.inputs,G);delete G.inputs}if(w(G.outFields)){G.outFields=G.outFields.join(",")}d.getJSON(this.url+"/findAddressCandidates",G,"callback",W)};n.prototype.geocode=function(C,G){this.findAddressCandidates(C,G)};n.prototype.reverseGeocode=function(C,G){C.f=C.f||"json";if(!o(C.location)){C.location=b(C.location)}d.getJSON(this.url+"/reverseGeocode",C,"callback",G)};function r(C){if(!C){throw new Error("map service is not tiled")}this.tileInfo_=C;this.spatialReference=c.getSpatialReference(C.spatialReference.wkid||C.spatialReference.wkt);if(!this.spatialReference){throw new Error("unsupported Spatial Reference")}this.resolution0_=this.tileInfo_.lods[0].resolution;this.minZoom=Math.floor(Math.log(this.spatialReference.getCircumference()/this.resolution0_/256)/Math.LN2+0.5);this.maxZoom=this.minZoom+this.tileInfo_.lods.length-1;this.tileSize=new q.Size(this.tileInfo_.cols,this.tileInfo_.rows);this.scale_=Math.pow(2,this.minZoom)*this.resolution0_;this.originX_=this.tileInfo_.origin.x;this.originY_=this.tileInfo_.origin.y;var W;for(var G=0;G<C.lods.length-1;G++){W=C.lods[G].resolution/C.lods[G+1].resolution;if(W>2.001||W<1.999){throw new Error("This type of map cache is not supported in V3. \nScale ratio between zoom levels must be 2")}}}r.prototype.fromLatLngToPoint=function(aa,G){if(!aa||isNaN(aa.lat())||isNaN(aa.lng())){return null}var W=this.spatialReference.forward([aa.lng(),aa.lat()]);var C=G||new q.Point(0,0);C.x=(W[0]-this.originX_)/this.scale_;C.y=(this.originY_-W[1])/this.scale_;return C};r.prototype.fromPointToLatLng=function(G,ab){if(G===null){return null}var C=G.x*this.scale_+this.originX_;var aa=this.originY_-G.y*this.scale_;var W=this.spatialReference.reverse([C,aa]);return new q.LatLng(W[1],W[0])};r.prototype.getScale=function(G){var W=G-this.minZoom;var C=0;if(this.tileInfo_.lods[W]){C=this.tileInfo_.lods[W].scale}return C};function p(C,aa){aa=aa||{};if(aa.opacity){this.opacity_=aa.opacity;delete aa.opacity}L(aa,this);this.mapService=(C instanceof h)?C:new h(C);if(aa.hosts){var ac=S(this.mapService.url,"","://");var W=S(this.mapService.url,"://","/");var ab=S(this.mapService.url,ac+"://"+W,"");this.urlTemplate_=ac+"://"+aa.hosts+ab;this.numOfHosts_=parseInt(S(aa.hosts,"[","]"),10)}this.name=this.name||this.mapService.name;this.maxZoom=this.maxZoom||19;this.minZoom=this.minZoom||0;if(this.mapService.loaded){this.init_(aa)}else{var G=this;q.event.addListenerOnce(this.mapService,"load",function(){G.init_(aa)})}this.tiles={}}p.prototype.init_=function(C){this.projection=new r(this.mapService.tileInfo);this.minZoom=C.minZoom||this.projection.minZoom;this.maxZoom=C.maxZoom||this.projection.maxZoom};p.prototype.getTileUrl=function(aa,W){var ab=W-(this.projection?this.projection.minZoom:this.minZoom);var G="";if(!isNaN(aa.x)&&!isNaN(aa.y)&&ab>=0&&aa.x>=0&&aa.y>=0){var C=this.mapService.url;if(this.urlTemplate_){C=this.urlTemplate_.replace("["+this.numOfHosts_+"]",""+((aa.y+aa.x)%this.numOfHosts_))}G=C+"/tile/"+ab+"/"+aa.y+"/"+aa.x}return G};p.prototype.setOpacity=function(W){this.opacity_=W;var G=this.tiles;for(var C in G){if(G.hasOwnProperty(C)){K(G[C],W)}}};p.prototype.getOpacity=function(){return this.opacity_};function v(ab,aa){aa=aa||{};var C;if(aa.opacity){this.opacity_=aa.opacity;delete aa.opacity}L(aa,this);var W=ab;if(o(ab)){W=[new p(ab)]}else{if(ab instanceof p){W=[ab]}else{if(ab.length>0&&o(ab[0])){W=[];for(C=0;C<ab.length;C++){W[C]=new p(ab[C])}}}}this.tileLayers=W;this.tiles={};if(aa.maxZoom!==undefined){this.maxZoom=aa.maxZoom}else{var G=0;for(C=0;C<W.length;C++){G=Math.max(G,W[C].maxZoom)}this.maxZoom=G}if(W[0].projection){this.tileSize=W[0].projection.tileSize;this.projection=W[0].projection}else{this.tileSize=new q.Size(256,256)}if(!this.name){this.name=W[0].name}}v.prototype.getTile=function(W,ad,af){var C=af.createElement("div");var ac="_"+W.x+"_"+W.y+"_"+ad;for(var ab=0;ab<this.tileLayers.length;ab++){var ae=this.tileLayers[ab];if(ad<=ae.maxZoom&&ad>=ae.minZoom){var G=ae.getTileUrl(W,ad);if(G){var aa=af.createElement(document.all?"img":"div");aa.style.border="0px none";aa.style.margin="0px";aa.style.padding="0px";aa.style.overflow="hidden";aa.style.position="absolute";aa.style.top="0px";aa.style.left="0px";aa.style.width=""+this.tileSize.width+"px";aa.style.height=""+this.tileSize.height+"px";if(document.all){aa.src=G}else{aa.style.backgroundImage="url("+G+")"}C.appendChild(aa);ae.tiles[ac]=aa;if(ae.opacity_!==undefined){K(aa,ae.opacity_)}else{if(this.opacity_!==undefined){K(aa,this.opacity_)}}}else{}}}C.setAttribute("tid",ac);this.tiles[ac]=C;return C};v.prototype.releaseTile=function(W){var aa=W.getAttribute("tid");if(aa){if(this.tiles[aa]){delete this.tiles[aa]}for(var G=0;G<this.tileLayers.length;G++){var C=this.tileLayers[G];if(C.tiles[aa]){delete C.tiles[aa]}}}};v.prototype.setOpacity=function(ab){this.opacity_=ab;var W=this.tiles;for(var C in W){if(W.hasOwnProperty(C)){var G=W[C].childNodes;for(var aa=0;aa<G.length;aa++){K(G[aa],ab)}}}};v.prototype.getOpacity=function(){return this.opacity_};function U(G,C){C=C||{};this.mapService=(G instanceof h)?G:new h(G);this.minZoom=C.minZoom;this.maxZoom=C.maxZoom;this.opacity_=C.opacity||1;this.exportOptions_=C.exportOptions||{};this.drawing_=false;this.needsNewRefresh_=false;this.div_=null;if(C.map){this.setMap(C.map)}}U.prototype=new q.OverlayView();U.prototype.onAdd=function(){var W=document.createElement("div");W.style.position="absolute";W.style.border="none";W.style.position="absolute";this.div_=W;var C=this.getPanes();C.overlayLayer.appendChild(W);if(this.opacity_){K(W,this.opacity_)}var G=this;this.boundsChangedListener_=q.event.addListener(this.getMap(),"bounds_changed",function(){G.refresh()})};U.prototype.onRemove=function(){q.event.removeListener(this.boundsChangedListener_);this.div_.parentNode.removeChild(this.div_);this.div_=null};U.prototype.draw=function(){if(!this.drawing_||this.needsNewRefresh_===true){this.refresh()}};U.prototype.getOpacity=function(){return this.opacity_};U.prototype.setOpacity=function(G){var W=Math.min(Math.max(G,0),1);this.opacity_=W;var C=this.div_;K(C,W)};U.prototype.refresh=function(){if(this.drawing_===true){this.needsNewRefresh_=true;return}var C=this.getMap();var ad=C?C.getBounds():null;if(!ad){return}var ac=this.exportOptions_;ac.bounds=ad;var aa=F;var W=C.getDiv();ac.width=W.offsetWidth;ac.height=W.offsetHeight;var G=C.getProjection();if(G&&G instanceof r){aa=G.spatialReference}ac.imageSR=aa;q.event.trigger(this,"drawstart");var ab=this;this.drawing_=true;this.div_.style.backgroundImage="";this.mapService.exportMap(ac,function(ag){ab.drawing_=false;if(ab.needsNewRefresh_===true){ab.needsNewRefresh_=false;ab.refresh();return}if(ag.href){var af=ab.getProjection();var ah=ag.bounds;var ae=af.fromLatLngToDivPixel(ah.getSouthWest());var ai=af.fromLatLngToDivPixel(ah.getNorthEast());var aj=ab.div_;aj.style.left=ae.x+"px";aj.style.top=ai.y+"px";aj.style.width=(ai.x-ae.x)+"px";aj.style.height=(ae.y-ai.y)+"px";ab.div_.style.backgroundImage="url("+ag.href+")";ab.setOpacity(ab.opacity_)}q.event.trigger(ab,"drawend")})};U.prototype.getFullBounds=function(){this.fullBounds_=this.fullBounds_||Z(this.mapService.fullExtent);return this.fullBounds_};U.prototype.getInitialBounds=function(){this.initialBounds_=this.initialBounds_||Z(this.mapService.initialExtent);return this.initialBounds_};U.prototype.isHidden=function(){return !(this.visible_&&this.isInZoomRange_())};U.prototype.isInZoomRange_=function(){var C=this.getMap().getZoom();if((this.minZoom!==undefined&&C<this.minZoom)||(this.maxZoom!==undefined&&C>this.maxZoom)){return false}return true};U.prototype.show=function(){this.visible_=true;this.div_.style.visibility="visible";this.refresh()};U.prototype.hide=function(){this.visible_=false;this.div_.style.visibility="hidden"};var f={SpatialReference:a,Geographic:B,LambertConformalConic:J,SphereMercator:T,TransverseMercator:N,FlatSpatialReference:y,SpatialReferences:c,SpatialRelationship:M,GeometryType:A,Catalog:x,MapService:h,Layer:O,GeocodeService:n,GeometryService:X,Util:d,Config:k,Projection:r,TileLayer:p,MapOverlay:U,MapType:v};var E=I("gmaps");E.ags=f})();
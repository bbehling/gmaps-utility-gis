/** built on 2012-02-02 */ 
dojo.provide("agsjs.dijit.TOC");dojo.require("dijit._Widget");dojo.require("dijit._Templated");dojo.require("dijit.form.Slider");dojo.require("dojo.fx");(function(){var a=dojo.create("link",{type:"text/css",rel:"stylesheet",href:dojo.moduleUrl("agsjs.dijit","css/TOC.css")});dojo.doc.getElementsByTagName("head")[0].appendChild(a)})();
dojo.declare("agsjs.dijit._TOCNode",[dijit._Widget,dijit._Templated],{templateString:'<div class="agsjsTOCNode"><div data-dojo-attach-point="rowNode" data-dojo-attach-event="onclick:_onClick"><span data-dojo-attach-point="contentNode" class="agsjsTOCContent"><span data-dojo-attach-point="checkContainerNode"></span><img src="${_blankGif}" alt="" data-dojo-attach-point="iconNode" /><span data-dojo-attach-point="labelNode"></span></span></div><div data-dojo-attach-point="containerNode" style="display: none;"> </div></div>',rootLayer:null,
layer:null,legend:null,rootLayerTOC:null,data:null,_childTOCNodes:[],constructor:function(a){dojo.mixin(this,a)},postCreate:function(){dojo.style(this.rowNode,"paddingLeft",""+this.rootLayerTOC.toc.indentSize*this.rootLayerTOC._currentIndent+"px");this.data=this.legend||this.layer||this.rootLayer;this.blank=this.iconNode.src;if(this.legend)this._createLegendNode(this.legend);else if(this.layer)this._createLayerNode(this.layer);else this.rootLayer&&this._createRootLayerNode(this.rootLayer);if(this.containerNode)this.toggler=
new dojo.fx.Toggler({node:this.containerNode,showFunc:dojo.fx.wipeIn,hideFunc:dojo.fx.wipeOut});if(!this._noCheckNode){var a;if(dijit.form&&dijit.form.CheckBox){a=new dijit.form.CheckBox({checked:this.data.visible});a.placeAt(this.checkContainerNode);a.startup()}else a=dojo.create("input",{type:"checkbox",checked:this.data.visible},this.checkContainerNode);this.checkNode=a}a=this.data.visible;if(this.data._subLayerInfos){var b=true;dojo.every(this.data._subLayerInfos,function(d){if(d.visible)return b=
false;return true});if(b)a=false}if(this.data.collapsed)a=false;if(this.iconNode&&this.iconNode.src==this.blank){dojo.addClass(this.iconNode,"dijitTreeExpando");dojo.addClass(this.iconNode,a?"dijitTreeExpandoOpened":"dijitTreeExpandoClosed")}if(this.containerNode)dojo.style(this.containerNode,"display",a?"block":"none");if(this.rootLayerTOC.toc.style=="standard"&&this.iconNode&&this.checkNode)dojo.place(this.iconNode,this.checkNode.domNode||this.checkNode,"before")},_createRootLayerNode:function(a){dojo.addClass(this.rowNode,
"agsjsTOCRootLayer");dojo.addClass(this.labelNode,"agsjsTOCRootLayerLabel");var b=this.rootLayerTOC.info.title;if(b===""){esri.hide(this.rowNode);a.show();this.rootLayerTOC._currentIndent--}a.collapsed=this.rootLayerTOC.info.collapsed;if(this.rootLayerTOC.info.slider){this.sliderNode=dojo.create("div",{"class":"agsjsTOCSlider"},this.rowNode,"last");this.slider=new dijit.form.HorizontalSlider({showButtons:false,value:a.opacity*100,intermediateChanges:true,tooltip:"adjust transparency",onChange:function(d){a.setOpacity(d/
100)},layoutAlign:"right"});this.slider.placeAt(this.sliderNode);dojo.connect(a,"onOpacityChange",this,function(d){this.slider.setValue(d*100)})}this.rootLayerTOC.info.noLegend?dojo.style(this.iconNode,"visibility","hidden"):this._createChildrenNodes(a._tocInfos,"layer");this.labelNode.innerHTML=b;dojo.attr(this.rowNode,"title",b)},_createLayerNode:function(a){this.labelNode.innerHTML=a.name;if(a._subLayerInfos){dojo.addClass(this.rowNode,"agsjsTOCGroupLayer");dojo.addClass(this.labelNode,"agsjsTOCGroupLayerLabel");
if(this.rootLayerTOC.info.showGroupCount)this.labelNode.innerHTML=a.name+" ("+a._subLayerInfos.length+")";this._createChildrenNodes(a._subLayerInfos,"layer")}else{dojo.addClass(this.rowNode,"agsjsTOCLayer");dojo.addClass(this.labelNode,"agsjsTOCLayerLabel");if(this.rootLayer.tileInfo)this._noCheckNode=true;if(a.renderer&&!this.rootLayerTOC.info.noLegend&&this.rootLayerTOC.info.mode!="legend")if(this.rootLayerTOC.toc.style=="inline"&&a.renderer.symbol){this._setIconNode(a.renderer,this.iconNode,this);
dojo.destroy(this.containerNode);this.containerNode=null}else if(a.renderer instanceof esri.renderer.SimpleRenderer)this._createChildrenNodes([a.renderer],"legend");else{var b=a.renderer.infos;if(a.renderer.defaultSymbol)b=[{symbol:a.renderer.defaultSymbol,label:a.renderer.defaultLabel,isDefault:true,url:a.renderer.url,imageData:a.renderer.imageData,value:"*"}].concat(b);this._createChildrenNodes(b,"legend")}else if(a.legends&&!this.rootLayerTOC.info.noLegend)if(this.rootLayerTOC.toc.style=="inline"&&
a.legends.length==1){this.iconNode.src=this._getLegendIconUrl(a.legends[0]);dojo.destroy(this.containerNode);this.containerNode=null}else this._createChildrenNodes(a.legends,"legend");else{dojo.destroy(this.iconNode);this.iconNode=null;dojo.destroy(this.containerNode);this.containerNode=null}}},_createLegendNode:function(a){a.visible=false;if(this.layer&&this.layer.definitionExpression)if(this.layer.renderer&&this.layer.renderer instanceof esri.renderer.UniqueValueRenderer&&!this.layer.renderer.attributeField2)if(!a.isDefault&&
this.rootLayerTOC.toc.style=="inline"&&this.rootLayerTOC.info.mode!="legend")a.visible=true;if(!a.visible)this._noCheckNode=true;dojo.destroy(this.containerNode);dojo.addClass(this.labelNode,"agsjsTOCLegendLabel");this._setIconNode(a,this.iconNode,this);this.labelNode.appendChild(document.createTextNode(a.label))},_setIconNode:function(a,b,d){var c=this._getLegendIconUrl(a);if(!c||this.rootLayerTOC.info.mode=="layers"){if(a.symbol){a=this._createSymbol(a.symbol);dojo.place(a,b,"replace");d.iconNode=
a}}else{b.src=c;if(a.symbol&&a.symbol.width&&a.symbol.height){b.width=a.symbol.width;b.height=a.symbol.height}}},_createSymbol:function(a){var b=this.rootLayerTOC.toc.swatchSize[0],d=this.rootLayerTOC.toc.swatchSize[1];if(a.width&&a.height){b=a.width;d=a.height}var c=dojo.create("span",{style:"width:"+b+";height:"+d}),e=dojox.gfx.createSurface(c,b,d);(a=esri.symbol.getShapeDescriptors(a))&&e.createShape(a.defaultShape).setFill(a.fill).setStroke(a.stroke).applyTransform({dx:b/2,dy:d/2});return c},
_getLegendIconUrl:function(a){var b=a.url;if(b!=null&&b.indexOf("data")==-1)if(!dojo.isIE&&a.imageData&&a.imageData.length>0)b="data:image/png;base64,"+a.imageData;else if(b.indexOf("http")!==0)b=this.rootLayer.url+"/"+this.layer.id+"/images/"+b;return b},_createChildrenNodes:function(a,b){this.rootLayerTOC._currentIndent++;for(var d=[],c=0,e=a.length;c<e;c++){var g=a[c],f={rootLayerTOC:this.rootLayerTOC,rootLayer:this.rootLayer,layer:this.layer,legend:this.legend};f[b]=g;f.data=g;g=new agsjs.dijit._TOCNode(f);
g.placeAt(this.containerNode);d.push(g)}this._childTOCNodes=d;this.rootLayerTOC._currentIndent--},_toggleContainer:function(a){if(dojo.hasClass(this.iconNode,"dijitTreeExpandoClosed")||dojo.hasClass(this.iconNode,"dijitTreeExpandoOpened")){if(a){dojo.removeClass(this.iconNode,"dijitTreeExpandoClosed");dojo.addClass(this.iconNode,"dijitTreeExpandoOpened")}else if(a===false){dojo.removeClass(this.iconNode,"dijitTreeExpandoOpened");dojo.addClass(this.iconNode,"dijitTreeExpandoClosed")}else{dojo.toggleClass(this.iconNode,
"dijitTreeExpandoClosed");dojo.toggleClass(this.iconNode,"dijitTreeExpandoOpened")}if(this.toggler)dojo.hasClass(this.iconNode,"dijitTreeExpandoOpened")?this.toggler.show():this.toggler.hide()}},_adjustToState:function(){if(this.checkNode){var a=this.legend?this.legend.visible:this.layer?this.layer.visible:this.rootLayer?this.rootLayer.visible:false;if(this.checkNode.set)this.checkNode.set("checked",a);else this.checkNode.checked=a}if(this.layer){a=esri.geometry.getScale(this.rootLayerTOC.toc.map);
(a=this.layer.maxScale!=0&&a<this.layer.maxScale||this.layer.minScale!=0&&a>this.layer.minScale)?dojo.addClass(this.domNode,"agsjsTOCOutOfScale"):dojo.removeClass(this.domNode,"agsjsTOCOutOfScale");if(this.checkNode)if(this.checkNode.set)this.checkNode.set("disabled",a);else this.checkNode.disabled=a}this._childTOCNodes.length>0&&dojo.forEach(this._childTOCNodes,function(b){b._adjustToState()})},_onClick:function(a){a=a.target;if(a==this.checkNode||dijit.getEnclosingWidget(a)==this.checkNode){if(this.legend){var b=
this.layer.renderer;this.legend.visible=this.checkNode.checked;var d=[];if(b instanceof esri.renderer.UniqueValueRenderer){var c="";this.layer.fields&&dojo.forEach(this.layer.fields,function(e){if(e.name.toLowerCase()==b.attributeField.toLowerCase())switch(e.type){case "esriFieldTypeString":c="'"}});dojo.forEach(b.infos,function(e){e.visible&&d.push(c+e.value+c)},this);if(d.length==b.infos.length)this.layer._definitionExpression="";else if(d.length==0)this.layer.visible=false;else{this.layer.visible=
true;this.layer._definitionExpression=b.attributeField+" IN ("+d.join(",")+")"}}this.rootLayer.setVisibleLayers(this._getVisibleLayers(),true);this.rootLayer.setLayerDefinitions(this._getLayerDefs(),true);this.rootLayerTOC._refreshLayer()}else if(this.layer){this.layer.visible=this.checkNode&&this.checkNode.checked;if(this.layer._parentLayerInfo&&!this.layer._parentLayerInfo.visible)this.layer._parentLayerInfo.visible=true;this.layer.visible&&!this.rootLayer.visible&&this.rootLayer.show();this.layer._subLayerInfos&&
dojo.forEach(this.layer._subLayerInfos,function(e){e.visible=this.layer.visible},this);if(this.layer.renderer){dojo.forEach(this.layer.renderer.infos,function(e){e.visible=this.layer.visible},this);this.layer._definitionExpression=""}this.rootLayer.setLayerDefinitions(this._getLayerDefs(),true);this.rootLayer.setVisibleLayers(this._getVisibleLayers(),true);this.rootLayerTOC._refreshLayer()}else this.rootLayer&&this.rootLayer.setVisibility(this.checkNode&&this.checkNode.checked);this.rootLayerTOC.toc.style==
"inline"&&this._toggleContainer(this.checkNode&&this.checkNode.checked);this.rootLayerTOC._adjustToState()}else a==this.iconNode&&this._toggleContainer()},_getVisibleLayers:function(){var a=[];dojo.forEach(this.rootLayer.layerInfos,function(b){b.subLayerIds||b.visible&&a.push(b.id)});if(a.length===0)a.push(-1);else this.rootLayer.visible||this.rootLayer.show();return a},_getLayerDefs:function(){var a=[];dojo.forEach(this.rootLayer.layerInfos,function(b,d){if(b._definitionExpression)a[d]=b._definitionExpression});
return a}});
dojo.declare("agsjs.dijit._RootLayerTOC",[dijit._Widget],{_currentIndent:0,rootLayer:null,toc:null,constructor:function(a){this.rootLayer=a.rootLayer;this.toc=a.toc;this.info=a.info||{}},postCreate:function(){this._getLayerInfos()},_getLayerInfos:function(){if(this.rootLayer instanceof esri.layers.ArcGISDynamicMapServiceLayer||this.rootLayer instanceof esri.layers.ArcGISTiledMapServiceLayer){if(this.info.title===undefined){var a=this.rootLayer.url.toLowerCase().indexOf("/rest/services/"),b=this.rootLayer.url.toLowerCase().indexOf("/mapserver",
a);this.info.title=this.rootLayer.url.substring(a+15,b)}}else this.info.noLayers=true;if(!this.rootLayer.url||this.info.noLegend||this.info.noLayers)this._createRootLayerTOC();else if(this.info.mode=="legend")this._getLegendInfo();else if(this.info.mode=="layers")this._getLayersInfo();else{this._getLayersInfo();this._getLegendInfo()}},_getLegendInfo:function(){var a="";if(this.rootLayer.version>=10.01)a=this.rootLayer.url+"/legend";else{a="http://www.arcgis.com/sharing/tools/legend";var b=this.rootLayer.url.toLowerCase().indexOf("/rest/");
b=this.rootLayer.url.substring(0,b)+this.rootLayer.url.substring(b+5);a=a+"?soapUrl="+escape(b)}esri.request({url:a,content:{f:"json"},callbackParamName:"callback",handleAs:"json",load:dojo.hitch(this,this._processLegendInfo),error:dojo.hitch(this,this._createRootLayerTOC)})},_getLayersInfo:function(){esri.request({url:this.rootLayer.url+"/layers",content:{f:"json"},callbackParamName:"callback",handleAs:"json",load:dojo.hitch(this,this._processLayersInfo),error:dojo.hitch(this,this._createRootLayerTOC)})},
_processLegendError:function(a){console.log(a);this._createRootLayerTOC()},_processLegendInfo:function(a){this.rootLayer._legendResponse=a;if(this.info.mode=="legend"||this.rootLayer._layersResponse)this._createRootLayerTOC()},_processLayersInfo:function(a){this.rootLayer._layersResponse=a;if(this.info.mode=="layers"||this.rootLayer._legendResponse)this._createRootLayerTOC()},_createRootLayerTOC:function(){var a=this.rootLayer;if(!a._tocInfos){var b={};dojo.forEach(a.layerInfos,function(c){b[""+c.id]=
c;c.visible=c.defaultVisibility});a._layersResponse&&dojo.forEach(a._layersResponse.layers,function(c){var e=b[""+c.id];if(e){dojo.mixin(e,c);e.definitionExpression=c.definitionExpression;if(c.drawingInfo&&c.drawingInfo.renderer)e.renderer=esri.renderer.fromJson(c.drawingInfo.renderer)}});a._legendResponse&&dojo.forEach(a._legendResponse.layers,function(c){var e=b[""+c.layerId];if(e&&c.legend){e.legends=c.legend;if(e.renderer)if(e.renderer.infos){var g={};dojo.forEach(c.legend,function(f){g[f.label]=
f});e.renderer.defaultSymbol&&dojo.mixin(e.renderer,c.legend[0]);dojo.forEach(e.renderer.infos,function(f){var h=g[f.label];h&&dojo.mixin(f,h)})}else dojo.mixin(e.renderer,c.legend[0])}});dojo.forEach(a.layerInfos,function(c){if(c.subLayerIds){var e=[];dojo.forEach(c.subLayerIds,function(g,f){e[f]=b[g];e[f]._parentLayerInfo=c});c._subLayerInfos=e}});var d=[];dojo.forEach(a.layerInfos,function(c){c.parentLayerId==-1&&d.push(c)});a._tocInfos=d}this._rootLayerNode=new agsjs.dijit._TOCNode({rootLayerTOC:this,
rootLayer:a});this._rootLayerNode.placeAt(this.domNode);this._visHandler=dojo.connect(a,"onVisibilityChange",this,"_adjustToState");this._visLayerHandler=dojo.connect(a,"setVisibleLayers",this,"_adjustToState");this._adjustToState()},_refreshLayer:function(){var a=this.rootLayer;if(this._refreshTimer){window.clearTimeout(this._refreshTimer);this._refreshTimer=null}this._refreshTimer=window.setTimeout(function(){a.setVisibleLayers(a.visibleLayers)},500)},_adjustToState:function(){this._rootLayerNode._adjustToState()},
destroy:function(){dojo.disconnect(this._visHandler);dojo.disconnect(this._visLayerHandler);dojo.disconnect(this._maptypeIdHandler)}});
dojo.declare("agsjs.dijit.TOC",[dijit._Widget],{indentSize:18,swatchSize:[30,30],refreshDelay:500,style:"inline",layerInfos:null,slider:false,constructor:function(a){a=a||{};if(!a.map)throw new Error("no map defined in params for TOC");dojo.mixin(this,a);this._rootLayerTOCs=[];if(!this.layerInfos){this.layerInfos=[];for(a=this.map.layerIds.length-1;a>=0;a--){var b=this.map.getLayer(this.map.layerIds[a]);!b._isBaseMap&&!b._isReference&&this.layerInfos.push({layer:b})}dojo.connect(this.map,"onLayerAdd",
this,function(d){this.layerInfos.push({layer:d});this.refresh()});dojo.connect(this.map,"onLayerRemove",this,function(d){for(var c=0;c<this.layerInfos.length;c++)if(this.layerInfos[c]==d){this.layerInfos.splice(c,1);break}this.refresh()})}},postCreate:function(){var a=[];dojo.forEach(this.layerInfos,function(d){if(!d.layer){d.layer=this._createRootLayer(d);a.push(d.layer)}},this);if(a.length==0)this._createTOC();else{var b=dojo.connect(this.map,"onLayersAddResult",this,function(){dojo.disconnect(b);
this._createTOC()});this.map.addLayers(a)}},_createRootLayer:function(a){var b=null;switch(a.type||"ArcGISDynamic"){case "ArcGISDynamic":b=new esri.layers.ArcGISDynamicMapServiceLayer(a.url,a);break}return b},_createTOC:function(){dojo.empty(this.domNode);for(var a=0,b=this.layerInfos.length;a<b;a++){var d=new agsjs.dijit._RootLayerTOC({rootLayer:this.layerInfos[a].layer,info:this.layerInfos[a],toc:this});this._rootLayerTOCs.push(d);d.placeAt(this.domNode)}if(!this._zoomHandler)this._zoomHandler=
dojo.connect(this.map,"onZoomEnd",this,"_adjustToState")},_adjustToState:function(){dojo.forEach(this._rootLayerTOCs,function(a){a._adjustToState()})},refresh:function(){this._createTOC()},destroy:function(){dojo.disconnect(this._zoomHandler);this._zoomHandler=null}});

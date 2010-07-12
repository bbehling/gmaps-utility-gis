function E(o) {
  return function() {
    return this[o]
  }
}
(function() {
  function o(a, b, c) {
    var d = b === "" ? 0 : a.indexOf(b);
    return a.substring(d + b.length, c === "" ? a.length : a.indexOf(c, d + b.length))
  }
  function F(a) {
    return a && typeof a === "string"
  }
  function r(a) {
    return a && a.splice
  }
  function k(a, b, c) {
    if(a && b) {
      var d;
      for(d in a) {
        if(c || !(d in b)) {
          b[d] = a[d]
        }
      }
    }
    return b
  }
  function L() {
    i.event.trigger.apply(this, arguments)
  }
  function v(a, b) {
    a && b && b.error && a(b.error)
  }
  function $(a, b) {
    var c = "";
    if(a) {
      c += a.getTime() - a.getTimezoneOffset() * 6E4
    }
    if(b) {
      c += ", " + (b.getTime() - b.getTimezoneOffset() * 6E4)
    }
    return c
  }
  function G(a, b) {
    b = Math.min(Math.max(b, 0), 1);
    if(a) {
      var c = a.style;
      if(typeof c.opacity !== "undefined") {
        c.opacity = b
      }
      if(typeof c.filters !== "undefined") {
        c.filters.alpha.opacity = Math.floor(100 * b)
      }
      if(typeof c.filter !== "undefined") {
        c.filter = "alpha(opacity:" + Math.floor(b * 100) + ")"
      }
    }
  }
  function T(a) {
    var b = "";
    for(var c in a) {
      if(a.hasOwnProperty(c)) {
        if(b.length > 0) {
          b += ";"
        }
        b += c + ":" + a[c]
      }
    }
    return b
  }
  function ja() {
    if(typeof XMLHttpRequest === "undefined") {
      try {
        return new ActiveXObject("Msxml2.XMLHTTP.6.0")
      }catch(a) {
      }
      try {
        return new ActiveXObject("Msxml2.XMLHTTP.3.0")
      }catch(b) {
      }
      try {
        return new ActiveXObject("Msxml2.XMLHTTP")
      }catch(c) {
      }
      throw new Error("This browser does not support XMLHttpRequest.");
    }else {
      return new XMLHttpRequest
    }
  }
  function Q(a) {
    var b = a;
    if(r(a) && a.length > 0) {
      b = a[0]
    }
    if(b instanceof i.LatLng || b instanceof i.Marker) {
      return r(a) && a.length > 1 ? s.MULTIPOINT : s.POINT
    }else {
      if(b instanceof i.Polyline) {
        return s.POLYLINE
      }else {
        if(b instanceof i.Polygon) {
          return s.POLYGON
        }else {
          if(b instanceof i.LatLngBounds) {
            return s.ENVELOPE
          }else {
            if(b.x !== undefined && b.y !== undefined) {
              return s.POINT
            }else {
              if(b.points) {
                return s.MULTIPOINT
              }else {
                if(b.paths) {
                  return s.POLYLINE
                }else {
                  if(b.rings) {
                    return s.POLYGON
                  }
                }
              }
            }
          }
        }
      }
    }
    return null
  }
  function U(a) {
    var b = a;
    if(r(a) && a.length > 0) {
      b = a[0]
    }
    if(r(b) && b.length > 0) {
      b = b[0]
    }
    if(b instanceof i.LatLng || b instanceof i.Marker || b instanceof i.Polyline || b instanceof i.Polygon || b instanceof i.LatLngBounds) {
      return true
    }
    return false
  }
  function M(a) {
    if(!a) {
      return null
    }
    return typeof a === "number" ? a : a.wkid ? a.wkid : a.toJSON()
  }
  function aa(a, b) {
    for(var c = [], d, e = 0, f = a.getLength();e < f;e++) {
      d = a.getAt(e);
      c.push("[" + d.lng() + "," + d.lat() + "]")
    }
    b && c.length > 0 && c.push("[" + a.getAt(0).lng() + "," + a.getAt(0).lat() + "]");
    return c.join(",")
  }
  function H(a) {
    var b, c, d, e = "{";
    switch(Q(a)) {
      case s.POINT:
        b = r(a) ? a[0] : a;
        if(b instanceof i.Marker) {
          b = b.getPosition()
        }
        e += "x:" + b.lng() + ",y:" + b.lat();
        break;
      case s.MULTIPOINT:
        d = [];
        for(c = 0;c < a.length;c++) {
          b = a[c] instanceof i.Marker ? a[c].getPosition() : a[c];
          d.push("[" + b.lng() + "," + b.lat() + "]")
        }
        e += "points: [" + d.join(",") + "]";
        break;
      case s.POLYLINE:
        d = [];
        a = r(a) ? a : [a];
        for(c = 0;c < a.length;c++) {
          d.push("[" + aa(a[c].getPath()) + "]")
        }
        e += "paths:[" + d.join(",") + "]";
        break;
      case s.POLYGON:
        d = [];
        b = r(a) ? a[0] : a;
        a = b.getPaths();
        for(c = 0;c < a.getLength();c++) {
          d.push("[" + aa(a.getAt(c), true) + "]")
        }
        e += "rings:[" + d.join(",") + "]";
        break;
      case s.ENVELOPE:
        b = r(a) ? a[0] : a;
        e += "xmin:" + b.getSouthWest().lng() + ",ymin:" + b.getSouthWest().lat() + ",xmax:" + b.getNorthEast().lng() + ",ymax:" + b.getNorthEast().lat();
        break
    }
    e += ", spatialReference:{wkid:4326}";
    e += "}";
    return e
  }
  function ka(a) {
    function b(e) {
      for(var f = [], g = 0, h = e.length;g < h;g++) {
        f.push("[" + e[g][0] + "," + e[g][1] + "]")
      }
      return"[" + f.join(",") + "]"
    }
    function c(e) {
      for(var f = [], g = 0, h = e.length;g < h;g++) {
        f.push(b(e[g]))
      }
      return"[" + f.join(",") + "]"
    }
    var d = "{";
    if(a.x) {
      d += "x:" + a.x + ",y:" + a.y
    }else {
      if(a.xmin) {
        d += "xmin:" + a.xmin + ",ymin:" + a.ymin + ",xmax:" + a.xmax + ",ymax:" + a.ymax
      }else {
        if(a.points) {
          d += "points:" + b(a.points)
        }else {
          if(a.paths) {
            d += "paths:" + c(a.paths)
          }else {
            if(a.rings) {
              d += "rings:" + c(a.rings)
            }
          }
        }
      }
    }
    d += "}";
    return d
  }
  function ba(a) {
    var b = x[a.spatialReference.wkid || a.spatialReference.wkt];
    b = b || I;
    var c = b.reverse([a.xmin, a.ymin]);
    a = b.reverse([a.xmax, a.ymax]);
    return new i.LatLngBounds(new i.LatLng(c[1], c[0]), new i.LatLng(a[1], a[0]))
  }
  function J(a, b) {
    var c = null, d, e, f, g, h, j, y, t;
    b = b || {};
    if(a) {
      c = [];
      if(a.x) {
        d = new i.Marker(k(b.markerOptions || b, {position:new i.LatLng(a.y, a.x)}));
        c.push(d)
      }else {
        h = a.points || a.paths || a.rings;
        if(!h) {
          return c
        }
        var ca = [];
        e = 0;
        for(f = h.length;e < f;e++) {
          j = h[e];
          if(a.points) {
            d = new i.Marker(k(b.markerOptions || b, {position:new i.LatLng(j[1], j[0])}));
            c.push(d)
          }else {
            t = [];
            d = 0;
            for(g = j.length;d < g;d++) {
              y = j[d];
              t.push(new i.LatLng(y[1], y[0]))
            }
            if(a.paths) {
              d = new i.Polyline(k(b.polylineOptions || b, {path:t}));
              c.push(d)
            }else {
              a.rings && ca.push(t)
            }
          }
        }
        if(a.rings) {
          d = new i.Polygon(k(b.polygonOptions || b, {paths:ca}));
          c.push(d)
        }
      }
    }
    return c
  }
  function da(a, b) {
    if(a) {
      var c, d, e;
      c = 0;
      for(d = a.length;c < d;c++) {
        e = a[c];
        if(e.geometry) {
          e.geometry = J(e.geometry, b)
        }
      }
    }
  }
  function V(a) {
    var b;
    if(typeof a === "object") {
      if(r(a)) {
        b = [];
        for(var c = 0, d = a.length;c < d;c++) {
          b.push(V(a[c]))
        }
        return"[" + b.join(",") + "]"
      }else {
        if(U(a)) {
          return H(a)
        }else {
          if(a.toJSON) {
            return a.toJSON()
          }else {
            b = "";
            for(c in a) {
              if(a.hasOwnProperty(c)) {
                if(b.length > 0) {
                  b += ", "
                }
                b += c + ":" + V(a[c])
              }
            }
            return"{" + b + "}"
          }
        }
      }
    }
    return a.toString()
  }
  function m(a, b, c, d) {
    var e = "ags_jsonp" + la++ + "_" + Math.floor(Math.random() * 1E6), f = null, g = "";
    if(b) {
      b.f = b.f || p.K;
      for(var h in b) {
        if(b.hasOwnProperty(h) && b[h] !== null && b[h] !== undefined) {
          var j = V(b[h]);
          g += h + "=" + (escape ? escape(j) : encodeURIComponent(j)) + "&"
        }
      }
    }
    g += c + "=ags_jsonp." + e;
    var y = document.getElementsByTagName("head")[0];
    if(!y) {
      throw new Error("document must have header tag");
    }
    ea[e] = function() {
      delete ea[e];
      f && y.removeChild(f);
      f = null;
      d.apply(null, arguments);
      L(A, "jsonpend", e)
    };
    if((g + a).length < 2E3 && !N.alwaysUseProxy) {
      f = document.createElement("script");
      f.src = a + (a.indexOf("?") === -1 ? "?" : "&") + g;
      f.id = e;
      y.appendChild(f)
    }else {
      b = window.location;
      b = b.protocol + "//" + b.hostname + (!b.port || b.port === 80 ? "" : ":" + b.port + "/");
      c = true;
      if(a.toLowerCase().indexOf(b.toLowerCase()) !== -1) {
        c = false
      }
      if(N.alwaysUseProxy) {
        c = true
      }
      if(c && !N.proxyUrl) {
        throw new Error("No proxyUrl property in gmaps.ags.Config is defined");
      }
      var t = ja();
      t.onreadystatechange = function() {
        if(t.readyState === 4) {
          if(t.status === 200) {
            eval(t.responseText)
          }else {
            throw new Error("Error code " + t.status);
          }
        }
      };
      t.open("POST", c ? N.proxyUrl + "?" + a : a, true);
      t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      t.send(g)
    }
    L(A, "jsonpstart", e);
    return e
  }
  function l(a) {
    a = a || {};
    this.wkid = a.wkid;
    this.wkt = a.wkt
  }
  function R(a) {
    a = a || {};
    l.call(this, a)
  }
  function u(a) {
    a = a || {};
    l.call(this, a);
    var b = a.inverse_flattening, c = a.standard_parallel_1 * n, d = a.standard_parallel_2 * n, e = a.latitude_of_origin * n;
    this.a = a.semi_major / a.unit;
    this.i = a.central_meridian * n;
    this.k = a.false_easting;
    this.l = a.false_northing;
    a = 1 / b;
    b = 2 * a - a * a;
    this.q = Math.sqrt(b);
    a = this.p(c, b);
    b = this.p(d, b);
    e = this.s(e, this.q);
    c = this.s(c, this.q);
    d = this.s(d, this.q);
    this.j = Math.log(a / b) / Math.log(c / d);
    this.D = a / (this.j * Math.pow(c, this.j));
    this.A = this.I(this.a, this.D, e, this.j)
  }
  function B(a) {
    a = a || {};
    l.call(this, a);
    this.a = a.semi_major / a.unit;
    var b = a.inverse_flattening;
    this.w = a.scale_factor;
    var c = a.latitude_of_origin * n;
    this.i = a.central_meridian * n;
    this.k = a.false_easting;
    this.l = a.false_northing;
    a = 1 / b;
    this.c = 2 * a - a * a;
    this.u = this.c * this.c;
    this.F = this.u * this.c;
    this.m = this.c / (1 - this.c);
    this.G = this.p(c, this.a, this.c, this.u, this.F)
  }
  function C(a) {
    a = a || {};
    l.call(this, a);
    this.a = (a.semi_major || 6378137) / (a.unit || 1);
    this.i = (a.central_meridian || 0) * n
  }
  function D(a) {
    this.url = a;
    this.definition = null
  }
  function q(a) {
    this.url = a;
    this.loaded = false;
    var b = a.split("/");
    this.name = b[b.length - 2].replace(/_/g, " ");
    var c = this;
    m(a, {}, p.e, function(d) {
      c.o(d)
    })
  }
  function O(a) {
    if(!a) {
      throw new Error("map service is not tiled");
    }
    this.L = a.lods;
    this.C = x[a.spatialReference.wkid || a.spatialReference.wkt];
    if(!this.C) {
      throw new Error("unsupported Spatial Reference");
    }
    this.P = this.L[0].resolution;
    this.minZoom = Math.floor(Math.log(this.C.v() / this.P / 256) / Math.LN2 + 0.5);
    this.maxZoom = this.minZoom + this.L.length - 1;
    this.tileSize = new i.Size(a.cols, a.rows);
    this.B = Math.pow(2, this.minZoom) * this.P;
    this.N = a.origin.x;
    this.O = a.origin.y;
    for(var b, c = 0;c < a.lods.length - 1;c++) {
      b = a.lods[c].resolution / a.lods[c + 1].resolution;
      if(b > 2.001 || b < 1.999) {
        throw new Error("This type of map cache is not supported in V3. \nScale ratio between zoom levels must be 2");
      }
    }
  }
  function w(a, b) {
    b = b || {};
    if(b.opacity) {
      this.b = b.opacity;
      delete b.opacity
    }
    k(b, this);
    this.d = a instanceof q ? a : new q(a);
    if(b.hosts) {
      var c = o(this.d.url, "", "://");
      this.Q = c + "://" + b.hosts + o(this.d.url, c + "://" + o(this.d.url, "://", "/"), "");
      this.M = parseInt(o(b.hosts, "[", "]"), 10)
    }
    this.name = this.name || this.d.name;
    this.maxZoom = this.maxZoom || 19;
    this.minZoom = this.minZoom || 0;
    if(this.d.loaded) {
      this.o(b)
    }else {
      var d = this;
      i.event.addListenerOnce(this.d, p.load, function() {
        d.o(b)
      })
    }
    this.g = {}
  }
  function K(a, b) {
    b = b || {};
    var c;
    if(b.opacity) {
      this.b = b.opacity;
      delete b.opacity
    }
    k(b, this);
    var d = a;
    if(F(a)) {
      d = [new w(a)]
    }else {
      if(a instanceof q) {
        d = [new w(a)]
      }else {
        if(a instanceof w) {
          d = [a]
        }else {
          if(a.length > 0 && F(a[0])) {
            d = [];
            for(c = 0;c < a.length;c++) {
              d[c] = new w(a[c])
            }
          }
        }
      }
    }
    this.r = d;
    this.g = {};
    if(b.maxZoom !== undefined) {
      this.maxZoom = b.maxZoom
    }else {
      var e = 0;
      for(c = 0;c < d.length;c++) {
        e = Math.max(e, d[c].maxZoom)
      }
      this.maxZoom = e
    }
    if(d[0].n) {
      this.tileSize = d[0].n.tileSize;
      this.projection = d[0].n
    }else {
      this.tileSize = new i.Size(256, 256)
    }
    this.name || (this.name = d[0].name)
  }
  function z(a, b) {
    b = b || {};
    this.d = a instanceof q ? a : new q(a);
    this.minZoom = b.minZoom;
    this.maxZoom = b.maxZoom;
    this.b = b.opacity || 1;
    this.S = b.exportOptions || {};
    this.z = this.t = false;
    this.h = null;
    b.map && this.setMap(b.map)
  }
  function P(a) {
    this.url = a;
    this.loaded = false;
    var b = this;
    m(a, {}, p.e, function(c) {
      b.o(c)
    })
  }
  function W(a) {
    this.url = a
  }
  function fa(a) {
    var b = {};
    if(!a) {
      return null
    }
    var c = [], d, e;
    if(a.geometries && a.geometries.length > 0) {
      d = a.geometries[0];
      e = U(d);
      for(var f = 0, g = a.geometries.length;f < g;f++) {
        e ? c.push(H(a.geometries[f])) : c.push(ka(a.geometries[f]))
      }
    }
    a.geometryType || (a.geometryType = Q(d));
    if(e) {
      b.inSR = I.wkid
    }else {
      if(a.inSpatialReference) {
        b.inSR = M(a.inSpatialReference)
      }
    }
    if(a.outSpatialReference) {
      b.outSR = M(a.outSpatialReference)
    }
    b.geometries = '{geometryType:"' + a.geometryType + '", geometries:[' + c.join(",") + "]}";
    return b
  }
  function ga(a) {
    this.url = a;
    this.loaded = false;
    var b = this;
    m(a, {}, p.e, function(c) {
      k(c, b);
      b.loaded = true;
      i.event.trigger(b, p.load)
    })
  }
  function ha(a) {
    this.url = a
  }
  function ia(a) {
    var b, c, d, e = [];
    b = 0;
    for(c = a.length;b < c;b++) {
      d = a[b];
      if(d instanceof i.Marker) {
        d = d.getPosition()
      }
      e.push({geometry:{x:d.lng(), y:d.lat(), spatialReference:{wkid:4326}}})
    }
    return{type:'"features"', features:e, doNotLocateOnRestrictedElements:false}
  }
  var p = {K:"json", e:"callback", load:"load"}, n = Math.PI / 180, la = 0;
  window.ags_jsonp = window.ags_jsonp || {};
  var ea = window.ags_jsonp, X = window, i = google.maps, I, Y, S, Z, N = {proxyUrl:null, alwaysUseProxy:false}, x = {}, s = {POINT:"esriGeometryPoint", MULTIPOINT:"esriGeometryMultipoint", POLYLINE:"esriGeometryPolyline", POLYGON:"esriGeometryPolygon", ENVELOPE:"esriGeometryEnvelope"}, A = {};
  A.getJSON = m;
  A.addToMap = function(a, b) {
    if(r(b)) {
      for(var c, d = 0, e = b.length;d < e;d++) {
        c = b[d];
        if(r(c)) {
          A.addToMap(a, c)
        }else {
          U(c) && c.setMap(a)
        }
      }
    }
  };
  A.removeFromMap = function(a, b) {
    A.addToMap(null, a);
    if(b) {
      a.length = 0
    }
  };
  l.prototype.forward = function(a) {
    return a
  };
  l.prototype.reverse = function(a) {
    return a
  };
  l.prototype.v = function() {
    return 360
  };
  l.prototype.toJSON = function() {
    return"{" + (this.wkid ? " wkid:" + this.wkid : "wkt: '" + this.wkt + "'") + "}"
  };
  R.prototype = new l;
  u.prototype = new l;
  u.prototype.p = function(a, b) {
    var c = Math.sin(a);
    return Math.cos(a) / Math.sqrt(1 - b * c * c)
  };
  u.prototype.s = function(a, b) {
    var c = b * Math.sin(a);
    return Math.tan(Math.PI / 4 - a / 2) / Math.pow((1 - c) / (1 + c), b / 2)
  };
  u.prototype.I = function(a, b, c, d) {
    return a * b * Math.pow(c, d)
  };
  u.prototype.H = function(a, b, c) {
    c = b * Math.sin(c);
    return Math.PI / 2 - 2 * Math.atan(a * Math.pow((1 - c) / (1 + c), b / 2))
  };
  u.prototype.V = function(a, b, c) {
    var d = 0;
    c = c;
    for(var e = this.H(a, b, c);Math.abs(e - c) > 1.0E-9 && d < 10;) {
      d++;
      c = e;
      e = this.H(a, b, c)
    }
    return e
  };
  u.prototype.forward = function(a) {
    var b = a[0] * n;
    a = this.I(this.a, this.D, this.s(a[1] * n, this.q), this.j);
    b = this.j * (b - this.i);
    return[this.k + a * Math.sin(b), this.l + this.A - a * Math.cos(b)]
  };
  u.prototype.reverse = function(a) {
    var b = a[0];
    a = a[1];
    return[(Math.atan((b - this.k) / (this.A - (a - this.l))) / this.j + this.i) / n, this.V(Math.pow((this.j > 0 ? 1 : -1) * Math.sqrt((b - this.k) * (b - this.k) + (this.A - (a - this.l)) * (this.A - (a - this.l))) / (this.a * this.D), 1 / this.j), this.q, 0) / n]
  };
  u.prototype.v = function() {
    return Math.PI * 2 * this.a
  };
  B.prototype = new l;
  B.prototype.p = function(a, b, c, d, e) {
    return b * ((1 - c / 4 - 3 * d / 64 - 5 * e / 256) * a - (3 * c / 8 + 3 * d / 32 + 45 * e / 1024) * Math.sin(2 * a) + (15 * d / 256 + 45 * e / 1024) * Math.sin(4 * a) - 35 * e / 3072 * Math.sin(6 * a))
  };
  B.prototype.forward = function(a) {
    var b = a[1] * n, c = a[0] * n;
    a = this.a / Math.sqrt(1 - this.c * Math.pow(Math.sin(b), 2));
    var d = Math.pow(Math.tan(b), 2), e = this.m * Math.pow(Math.cos(b), 2);
    c = (c - this.i) * Math.cos(b);
    var f = this.p(b, this.a, this.c, this.u, this.F);
    return[this.k + this.w * a * (c + (1 - d + e) * Math.pow(c, 3) / 6 + (5 - 18 * d + d * d + 72 * e - 58 * this.m) * Math.pow(c, 5) / 120), this.l + this.w * (f - this.G) + a * Math.tan(b) * (c * c / 2 + (5 - d + 9 * e + 4 * e * e) * Math.pow(c, 4) / 120 + (61 - 58 * d + d * d + 600 * e - 330 * this.m) * Math.pow(c, 6) / 720)]
  };
  B.prototype.reverse = function(a) {
    var b = a[0], c = a[1];
    a = (1 - Math.sqrt(1 - this.c)) / (1 + Math.sqrt(1 - this.c));
    c = (this.G + (c - this.l) / this.w) / (this.a * (1 - this.c / 4 - 3 * this.u / 64 - 5 * this.F / 256));
    a = c + (3 * a / 2 - 27 * Math.pow(a, 3) / 32) * Math.sin(2 * c) + (21 * a * a / 16 - 55 * Math.pow(a, 4) / 32) * Math.sin(4 * c) + 151 * Math.pow(a, 3) / 6 * Math.sin(6 * c) + 1097 * Math.pow(a, 4) / 512 * Math.sin(8 * c);
    c = this.m * Math.pow(Math.cos(a), 2);
    var d = Math.pow(Math.tan(a), 2), e = this.a / Math.sqrt(1 - this.c * Math.pow(Math.sin(a), 2)), f = this.a * (1 - this.c) / Math.pow(1 - this.c * Math.pow(Math.sin(a), 2), 1.5);
    b = (b - this.k) / (e * this.w);
    e = a - e * Math.tan(a) / f * (b * b / 2 - (5 + 3 * d + 10 * c - 4 * c * c - 9 * this.m) * Math.pow(b, 4) / 24 + (61 + 90 * d + 28 * c + 45 * d * d - 252 * this.m - 3 * c * c) * Math.pow(b, 6) / 720);
    return[(this.i + (b - (1 + 2 * d + c) * Math.pow(b, 3) / 6 + (5 - 2 * c + 28 * d - 3 * c * c + 8 * this.m + 24 * d * d) * Math.pow(b, 5) / 120) / Math.cos(a)) / n, e / n]
  };
  B.prototype.v = function() {
    return Math.PI * 2 * this.a
  };
  C.prototype = new l;
  C.prototype.forward = function(a) {
    var b = a[1] * n;
    return[this.a * (a[0] * n - this.i), this.a / 2 * Math.log((1 + Math.sin(b)) / (1 - Math.sin(b)))]
  };
  C.prototype.reverse = function(a) {
    return[(a[0] / this.a + this.i) / n, (Math.PI / 2 - 2 * Math.atan(Math.exp(-a[1] / this.a))) / n]
  };
  C.prototype.v = function() {
    return Math.PI * 2 * this.a
  };
  I = new R({wkid:4326});
  Y = new R({wkid:4269});
  S = new C({wkid:102113, semi_major:6378137, central_meridian:0, unit:1});
  Z = new C({wkid:102100, semi_major:6378137, central_meridian:0, unit:1});
  x = {"4326":I, "4269":Y, "102113":S, "102100":Z};
  l.WGS84 = I;
  l.NAD83 = Y;
  l.WEB_MERCATOR = S;
  l.WEB_MERCATOR_AUX = Z;
  l.register = function(a, b) {
    var c = x["" + a];
    if(c) {
      return c
    }
    if(b instanceof l) {
      c = x["" + a] = b
    }else {
      c = b || a;
      var d = {wkt:a};
      if(a === parseInt(a, 10)) {
        d = {wkid:a}
      }
      var e = o(c, 'PROJECTION["', '"]'), f = o(c, "SPHEROID[", "]").split(",");
      if(e !== "") {
        d.unit = parseFloat(o(o(c, "PROJECTION", ""), "UNIT[", "]").split(",")[1]);
        d.semi_major = parseFloat(f[1]);
        d.inverse_flattening = parseFloat(f[2]);
        d.latitude_of_origin = parseFloat(o(c, '"Latitude_Of_Origin",', "]"));
        d.central_meridian = parseFloat(o(c, '"Central_Meridian",', "]"));
        d.false_easting = parseFloat(o(c, '"False_Easting",', "]"));
        d.false_northing = parseFloat(o(c, '"False_Northing",', "]"))
      }
      switch(e) {
        case "":
          c = new l(d);
          break;
        case "Lambert_Conformal_Conic":
          d.standard_parallel_1 = parseFloat(o(c, '"Standard_Parallel_1",', "]"));
          d.standard_parallel_2 = parseFloat(o(c, '"Standard_Parallel_2",', "]"));
          c = new u(d);
          break;
        case "Transverse_Mercator":
          d.scale_factor = parseFloat(o(c, '"Scale_Factor",', "]"));
          c = new B(d);
          break;
        default:
          throw new Error(e + "  not supported");
      }
      if(c) {
        x["" + a] = c
      }
    }
    return c
  };
  D.prototype.loadInfo = function(a) {
    var b = this;
    this.loaded || m(this.url, {}, "callback", function(c) {
      k(c, b);
      b.loaded = true;
      a && a()
    })
  };
  D.prototype.isInScale = function(a) {
    if(this.maxScale && this.maxScale > a) {
      return false
    }
    if(this.minScale && this.minScale < a) {
      return false
    }
    return true
  };
  D.prototype.query = function(a, b, c) {
    if(a) {
      var d = k(a, {});
      if(a.geometry && !F(a.geometry)) {
        d.geometry = H(a.geometry);
        d.geometryType = Q(a.geometry);
        d.inSR = 4326
      }
      if(a.spatialRelationship) {
        d.spatialRel = a.spatialRelationship;
        delete d.spatialRelationship
      }
      if(a.outFields && !r(a.outFields)) {
        d.outFields = a.outFields.join(",")
      }
      if(a.objectIds) {
        d.objectIds = a.objectIds.join(",")
      }
      if(a.time) {
        d.time = $(a.time, a.endTime)
      }
      d.outSR = 4326;
      d.returnGeometry = a.returnGeometry === false ? false : true;
      d.returnIdsOnly = a.returnIdsOnly === true ? true : false;
      delete d.overlayOptions;
      m(this.url + "/query", d, "callback", function(e) {
        da(e.features, a.overlayOptions);
        b(e, e.error);
        v(c, e)
      })
    }
  };
  D.prototype.queryRelatedRecords = function(a, b, c) {
    if(a) {
      a = k(a, {});
      a.f = a.f || "json";
      if(a.outFields && !F(a.outFields)) {
        a.outFields = a.outFields.join(",")
      }
      a.returnGeometry = a.returnGeometry === false ? false : true;
      m(this.url + "/query", a, p.e, function(d) {
        v(c, d);
        b(d)
      })
    }
  };
  q.prototype.o = function(a) {
    var b = this;
    k(a, this);
    this.spatialReference = a.spatialReference.wkt ? x.W(a.spatialReference.wkt, a.spatialReference.wkt) : x[a.spatialReference.wkid];
    a.tables !== undefined ? m(this.url + "/layers", {}, p.e, function(c) {
      b.J(c)
    }) : this.J(a)
  };
  q.prototype.J = function(a) {
    var b = [], c = [], d, e, f, g;
    e = 0;
    for(f = a.layers.length;e < f;e++) {
      g = a.layers[e];
      d = new D(this.url + "/" + g.id);
      k(g, d);
      d.visible = d.defaultVisibility;
      b.push(d)
    }
    if(a.tables) {
      e = 0;
      for(f = a.tables.length;e < f;e++) {
        g = a.tables[e];
        d = new D(this.url + "/" + g.id);
        k(g, d);
        c.push(d)
      }
    }
    e = 0;
    for(f = b.length;e < f;e++) {
      d = b[e];
      if(d.subLayerIds) {
        d.subLayers = [];
        g = 0;
        for(var h = d.subLayerIds.length;g < h;g++) {
          var j = this.getLayer(d.subLayerIds[g]);
          d.subLayers.push(j);
          j.parentLayer = d
        }
      }
    }
    this.layers = b;
    if(a.tables) {
      this.tables = c
    }
    this.loaded = true;
    L(this, "load")
  };
  q.prototype.getLayer = function(a) {
    var b = this.layers;
    if(b) {
      for(var c = 0, d = b.length;c < d;c++) {
        if(a === b[c].id) {
          return b[c]
        }
        if(F(a) && b[c].name.toLowerCase() === a.toLowerCase()) {
          return b[c]
        }
      }
    }
    return null
  };
  q.prototype.T = function() {
    var a = {};
    if(this.layers) {
      for(var b = 0, c = this.layers.length;b < c;b++) {
        var d = this.layers[b];
        if(d.definition) {
          a[String(d.id)] = d.definition
        }
      }
    }
    return a
  };
  q.prototype.U = function() {
    var a = [];
    if(this.layers) {
      var b, c, d;
      c = 0;
      for(d = this.layers.length;c < d;c++) {
        b = this.layers[c];
        if(b.subLayers) {
          for(var e = 0, f = b.subLayers.length;e < f;e++) {
            if(b.subLayers[e].visible === false) {
              b.visible = false;
              break
            }
          }
        }
      }
      c = 0;
      for(d = this.layers.length;c < d;c++) {
        b = this.layers[c];
        b.visible === true && a.push(b.id)
      }
    }
    return a
  };
  q.prototype.getInitialBounds = function() {
    if(this.initialExtent) {
      return ba(this.initialExtent)
    }
    return null
  };
  q.prototype.exportMap = function(a, b) {
    if(a && a.bounds) {
      var c = {}, d = a.bounds;
      c.bbox = "" + d.getSouthWest().lng() + "," + d.getSouthWest().lat() + "," + d.getNorthEast().lng() + "," + d.getNorthEast().lat();
      c.size = "" + a.width + "," + a.height;
      c.dpi = a.dpi;
      if(a.imageSR) {
        c.imageSR = a.imageSR.wkid ? a.imageSR.wkid : "{wkt:" + a.imageSR.wkt + "}"
      }
      c.bboxSR = "4326";
      c.format = a.format;
      d = a.layerDefinitions;
      if(d === undefined) {
        d = this.T()
      }
      c.layerDefs = T(d);
      d = a.layerIds;
      var e = a.layerOption || "show";
      if(d === undefined) {
        d = this.U()
      }
      if(d.length > 0) {
        c.layers = e + ":" + d.join(",");
        c.transparent = a.transparent === false ? false : true;
        if(a.time) {
          c.time = $(a.time, a.endTime)
        }
        c.layerTimeOptions = a.layerTimeOptions;
        m(this.url + "/export", c, "callback", function(f) {
          f.bounds = ba(f.extent);
          delete f.extent;
          b(f)
        })
      }else {
        b({href:null})
      }
    }
  };
  q.prototype.identify = function(a, b, c) {
    if(a) {
      var d = {};
      d.geometry = H(a.geometry);
      d.geometryType = Q(a.geometry);
      d.mapExtent = H(a.bounds);
      d.tolerance = a.tolerance || 2;
      d.sr = 4326;
      d.imageDisplay = "" + a.width + "," + a.height + "," + (a.dpi || 96);
      d.layers = a.layerOption || "all";
      if(a.layerIds) {
        d.layers += ":" + a.layerIds.join(",")
      }
      if(a.layerDefs) {
        d.layerDefs = T(a.layerDefs)
      }
      d.maxAllowableOffset = a.maxAllowableOffset;
      d.returnGeometry = a.returnGeometry === false ? false : true;
      m(this.url + "/identify", d, "callback", function(e) {
        var f, g, h;
        if(e.results) {
          for(f = 0;f < e.results.length;f++) {
            g = e.results[f];
            h = J(g.geometry, a.overlayOptions);
            g.feature = {geometry:h, attributes:g.attributes};
            delete g.attributes
          }
        }
        b(e);
        v(c, e)
      })
    }
  };
  q.prototype.find = function(a, b, c) {
    if(a) {
      var d = k(a, {});
      if(a.layerIds) {
        d.layers = a.layerIds.join(",");
        delete d.layerIds
      }
      if(a.searchFields) {
        d.searchFields = a.searchFields.join(",")
      }
      d.contains = a.contains === false ? false : true;
      if(a.layerDefinitions) {
        d.layerDefs = T(a.layerDefinitions);
        delete d.layerDefinitions
      }
      d.sr = 4326;
      d.returnGeometry = a.returnGeometry === false ? false : true;
      m(this.url + "/find", d, p.e, function(e) {
        var f, g, h;
        if(e.results) {
          for(f = 0;f < e.results.length;f++) {
            g = e.results[f];
            h = J(g.geometry, a.overlayOptions);
            g.feature = {geometry:h, attributes:g.attributes};
            delete g.attributes
          }
        }
        b(e);
        v(c, e)
      })
    }
  };
  q.prototype.queryLayer = function(a, b, c, d) {
    (a = this.getLayer(a)) && a.query(b, c, d)
  };
  O.prototype.fromLatLngToPoint = function(a, b) {
    if(!a || isNaN(a.lat()) || isNaN(a.lng())) {
      return null
    }
    var c = this.C.forward([a.lng(), a.lat()]), d = b || new i.Point(0, 0);
    d.x = (c[0] - this.N) / this.B;
    d.y = (this.O - c[1]) / this.B;
    return d
  };
  O.prototype.fromPointToLatLng = function(a) {
    if(a === null) {
      return null
    }
    a = this.C.reverse([a.x * this.B + this.N, this.O - a.y * this.B]);
    return new i.LatLng(a[1], a[0])
  };
  w.prototype.o = function(a) {
    this.n = new O(this.d.tileInfo);
    this.minZoom = a.minZoom || this.n.minZoom;
    this.maxZoom = a.maxZoom || this.n.maxZoom
  };
  w.prototype.getTileUrl = function(a, b) {
    var c = b - (this.n ? this.n.minZoom : this.minZoom), d = "";
    if(!isNaN(a.x) && !isNaN(a.y) && c >= 0 && a.x >= 0 && a.y >= 0) {
      d = this.d.url;
      if(this.Q) {
        d = this.Q.replace("[" + this.M + "]", "" + (a.y + a.x) % this.M)
      }
      d = d + "/tile/" + c + "/" + a.y + "/" + a.x
    }
    return d
  };
  w.prototype.setOpacity = function(a) {
    this.b = a;
    var b = this.g;
    for(var c in b) {
      b.hasOwnProperty(c) && G(b[c], a)
    }
  };
  w.prototype.getOpacity = E("b");
  w.prototype.getMapService = E("d");
  K.prototype.getTile = function(a, b, c) {
    for(var d = c.createElement("div"), e = "_" + a.x + "_" + a.y + "_" + b, f = 0;f < this.r.length;f++) {
      var g = this.r[f];
      if(b <= g.maxZoom && b >= g.minZoom) {
        var h = g.getTileUrl(a, b);
        if(h) {
          var j = c.createElement(document.all ? "img" : "div");
          j.style.border = "0px none";
          j.style.margin = "0px";
          j.style.padding = "0px";
          j.style.overflow = "hidden";
          j.style.position = "absolute";
          j.style.top = "0px";
          j.style.left = "0px";
          j.style.width = "" + this.tileSize.width + "px";
          j.style.height = "" + this.tileSize.height + "px";
          if(document.all) {
            j.src = h
          }else {
            j.style.backgroundImage = "url(" + h + ")"
          }
          d.appendChild(j);
          g.g[e] = j;
          if(g.b !== undefined) {
            G(j, g.b)
          }else {
            this.b !== undefined && G(j, this.b)
          }
        }
      }
    }
    this.g[e] = d;
    d.setAttribute("tid", e);
    return d
  };
  K.prototype.releaseTile = function(a) {
    if(a.getAttribute("tid")) {
      a = a.getAttribute("tid");
      this.g[a] && delete this.g[a];
      for(var b = 0;b < this.r.length;b++) {
        var c = this.r[b];
        c.g[a] && delete c.g[a]
      }
    }
  };
  K.prototype.setOpacity = function(a) {
    this.b = a;
    var b = this.g;
    for(var c in b) {
      if(b.hasOwnProperty(c)) {
        for(var d = b[c].childNodes, e = 0;e < d.length;e++) {
          G(d[e], a)
        }
      }
    }
  };
  K.prototype.getOpacity = E("b");
  K.prototype.getTileLayers = E("r");
  z.prototype = new i.OverlayView;
  z.prototype.onAdd = function() {
    var a = document.createElement("div");
    a.style.position = "absolute";
    a.style.border = "none";
    a.style.position = "absolute";
    this.h = a;
    this.getPanes().overlayLayer.appendChild(a);
    this.b && G(a, this.b);
    var b = this;
    this.R = i.event.addListener(this.getMap(), "bounds_changed", function() {
      b.refresh()
    })
  };
  z.prototype.onRemove = function() {
    i.event.removeListener(this.R);
    this.h.parentNode.removeChild(this.h);
    this.h = null
  };
  z.prototype.draw = function() {
    if(!this.t || this.z === true) {
      this.refresh()
    }
  };
  z.prototype.getOpacity = E("b");
  z.prototype.setOpacity = function(a) {
    this.b = a = Math.min(Math.max(a, 0), 1);
    G(this.h, a)
  };
  z.prototype.getMapService = E("d");
  z.prototype.refresh = function() {
    if(this.t === true) {
      this.z = true
    }else {
      var a = this.getMap(), b = a ? a.getBounds() : null;
      if(b) {
        var c = this.S;
        c.bounds = b;
        b = S;
        var d = a.getDiv();
        c.width = d.offsetWidth;
        c.height = d.offsetHeight;
        if((a = a.getProjection()) && a instanceof O) {
          b = a.spatialReference
        }
        c.imageSR = b;
        i.event.trigger(this, "drawstart");
        var e = this;
        this.t = true;
        this.h.style.backgroundImage = "";
        this.d.exportMap(c, function(f) {
          e.t = false;
          if(e.z === true) {
            e.z = false;
            e.refresh()
          }else {
            if(f.href) {
              var g = e.getProjection(), h = f.bounds, j = g.fromLatLngToDivPixel(h.getSouthWest());
              g = g.fromLatLngToDivPixel(h.getNorthEast());
              h = e.h;
              h.style.left = j.x + "px";
              h.style.top = g.y + "px";
              h.style.width = g.x - j.x + "px";
              h.style.height = j.y - g.y + "px";
              e.h.style.backgroundImage = "url(" + f.href + ")";
              e.setOpacity(e.b)
            }
            i.event.trigger(e, "drawend")
          }
        })
      }
    }
  };
  P.prototype.o = function(a) {
    k(a, this);
    if(a.spatialReference) {
      this.spatialReference = x[a.spatialReference.wkid || a.spatialReference.wkt] || I
    }
    this.loaded = true;
    L(this, "load")
  };
  P.prototype.findAddressCandidates = function(a, b, c) {
    a = k(a, {});
    if(a.inputs) {
      k(a.inputs, a);
      delete a.inputs
    }
    if(r(a.outFields)) {
      a.outFields = a.outFields.join(",")
    }
    a.outSR = 4326;
    var d = this;
    m(this.url + "/findAddressCandidates", a, p.e, function(e) {
      if(e.candidates) {
        for(var f, g, h = 0;h < e.candidates.length;h++) {
          f = e.candidates[h];
          g = f.location;
          if(!isNaN(g.x) && !isNaN(g.y)) {
            g = [g.x, g.y];
            if(d.spatialReference) {
              g = d.spatialReference.reverse(g)
            }
            f.location = new i.LatLng(g[1], g[0])
          }
        }
      }
      b(e);
      v(c, e)
    })
  };
  P.prototype.geocode = function(a, b) {
    this.findAddressCandidates(a, b)
  };
  P.prototype.reverseGeocode = function(a, b, c) {
    F(a.location) || (a.location = H(a.location));
    a.outSR = 4326;
    var d = this;
    m(this.url + "/reverseGeocode", a, p.e, function(e) {
      if(e.location) {
        var f = e.location;
        if(!isNaN(f.x) && !isNaN(f.y)) {
          f = [f.x, f.y];
          if(d.spatialReference) {
            f = d.spatialReference.reverse(f)
          }
          e.location = new i.LatLng(f[1], f[0])
        }
      }
      b(e);
      v(c, e)
    })
  };
  W.prototype.project = function(a, b, c) {
    var d = fa(a);
    m(this.url + "/project", d, "callback", function(e) {
      var f = [];
      if(a.outSpatialReference === 4326 || a.outSpatialReference.wkid === 4326) {
        for(var g = 0, h = e.geometries.length;g < h;g++) {
          f.push(J(e.geometries[g]))
        }
        e.geometries = f
      }
      b(e);
      v(c, e)
    })
  };
  W.prototype.buffer = function(a, b, c) {
    var d = fa(a);
    if(a.bufferSpatialReference) {
      d.bufferSR = M(a.bufferSpatialReference)
    }
    d.outSR = 4326;
    d.distances = a.distances.join(",");
    if(a.unit) {
      d.unit = a.unit
    }
    m(this.url + "/buffer", d, "callback", function(e) {
      var f = [];
      if(e.geometries) {
        for(var g = 0, h = e.geometries.length;g < h;g++) {
          f.push(J(e.geometries[g], a.overlayOptions))
        }
      }
      e.geometries = f;
      b(e);
      v(c, e)
    })
  };
  ga.prototype.execute = function(a, b, c) {
    var d = {};
    a.parameters && k(a.parameters, d);
    d["env:outSR"] = a.outSpatialReference ? M(a.outSpatialReference) : 4326;
    if(a.processSpatialReference) {
      d["env:processSR"] = M(a.processSpatialReference)
    }
    m(this.url + "/execute", d, p.e, function(e) {
      if(e.results) {
        for(var f, g, h = 0;h < e.results.length;h++) {
          f = e.results[h];
          if(f.dataType === "GPFeatureRecordSetLayer") {
            for(var j = 0, y = f.value.features.length;j < y;j++) {
              g = f.value.features[j];
              if(g.geometry) {
                g.geometry = J(g.geometry, a.overlayOptions)
              }
            }
          }
        }
      }
      b(e);
      v(c, e)
    })
  };
  ha.prototype.solve = function(a, b, c) {
    if(a) {
      var d = k(a, {});
      if(r(a.stops)) {
        d.stops = ia(a.stops)
      }
      if(r(a.barriers)) {
        if(a.barriers.length > 0) {
          d.barriers = ia(a.barriers)
        }else {
          delete d.barriers
        }
      }
      d.returnRoutes = a.returnRoutes === false ? false : true;
      d.returnDirections = a.returnDirections === true ? true : false;
      d.returnBarriers = a.returnBarriers === true ? true : false;
      d.returnStops = a.returnStops === true ? true : false;
      m(this.url + "/solve", d, "callback", function(e) {
        e.routes && da(e.routes.features, a.overlayOptions);
        b(e);
        v(c, e)
      })
    }
  };
  X.gmaps = X.gmaps || {};
  X.gmaps.ags = {SpatialReference:l, Geographic:R, LambertConformalConic:u, SphereMercator:C, TransverseMercator:B, SpatialRelationship:{INTERSECTS:"esriSpatialRelIntersects", CONTAINS:"esriSpatialRelContains", CROSSES:"esriSpatialRelCrosses", ENVELOPE_INTERSECTS:"esriSpatialRelEnvelopeIntersects", INDEX_INTERSECTS:"esriSpatialRelIndexIntersects", OVERLAPS:"esriSpatialRelOverlaps", TOUCHES:"esriSpatialRelTouches", WITHIN:"esriSpatialRelWithin"}, GeometryType:s, SRUnit:{METER:9001, FOOT:9002, SURVEY_FOOT:9003, 
  SURVEY_MILE:9035, KILLOMETER:9036, RADIAN:9101, DEGREE:9102}, Catalog:function(a) {
    this.url = a;
    var b = this;
    m(a, {X:p.K}, p.e, function(c) {
      k(c, b);
      L(b, p.load)
    })
  }, MapService:q, Layer:D, GeocodeService:P, GeometryService:W, GPService:function(a) {
    this.url = a;
    this.loaded = false;
    var b = this;
    m(a, {}, p.e, function(c) {
      k(c, b);
      b.loaded = true;
      i.event.trigger(b, p.load)
    })
  }, GPTask:ga, RouteTask:ha, Util:A, Config:N, Projection:O, TileLayer:w, MapOverlay:z, MapType:K}
})();

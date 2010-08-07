(function(){/*
 http://google-maps-utility-library-v3.googlecode.com
*/
var i = Math.PI / 180, k = 0, l = google.maps, n, o, q, r = {Z:null, T:false}, s = {}, t = {};
function u(a, b, c) {
  var d = b === "" ? 0 : a.indexOf(b);
  return a.substring(d + b.length, c === "" ? a.length : a.indexOf(c, d + b.length))
}
function v(a) {
  return a && typeof a === "string"
}
function w(a, b, c) {
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
function x() {
  l.event.trigger.apply(this, arguments)
}
function aa(a, b) {
  var c = "";
  if(a) {
    c += a.getTime() - a.getTimezoneOffset() * 6E4
  }
  if(b) {
    c += ", " + (b.getTime() - b.getTimezoneOffset() * 6E4)
  }
  return c
}
function y(a, b) {
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
function ba(a) {
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
function ca() {
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
var z = "esriGeometryPoint", A = "esriGeometryMultipoint", B = "esriGeometryPolyline", C = "esriGeometryPolygon", D = "esriGeometryEnvelope";
function da(a) {
  var b = a;
  if(a && a.splice && a.length > 0) {
    b = a[0]
  }
  if(b instanceof l.LatLng || b instanceof l.Marker) {
    return a && a.splice && a.length > 1 ? A : z
  }else {
    if(b instanceof l.Polyline) {
      return B
    }else {
      if(b instanceof l.Polygon) {
        return C
      }else {
        if(b instanceof l.LatLngBounds) {
          return D
        }else {
          if(b.x !== undefined && b.y !== undefined) {
            return z
          }else {
            if(b.points) {
              return A
            }else {
              if(b.paths) {
                return B
              }else {
                if(b.rings) {
                  return C
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
function E(a) {
  var b = a;
  if(a && a.splice && a.length > 0) {
    b = a[0]
  }
  if(b && b.splice && b.length > 0) {
    b = b[0]
  }
  if(b instanceof l.LatLng || b instanceof l.Marker || b instanceof l.Polyline || b instanceof l.Polygon || b instanceof l.LatLngBounds) {
    return true
  }
  return false
}
function F(a, b) {
  for(var c = [], d, e = 0, f = a.getLength();e < f;e++) {
    d = a.getAt(e);
    c.push("[" + d.lng() + "," + d.lat() + "]")
  }
  b && c.length > 0 && c.push("[" + a.getAt(0).lng() + "," + a.getAt(0).lat() + "]");
  return c.join(",")
}
function G(a) {
  var b;
  if(typeof a === "object") {
    if(a && a.splice) {
      b = [];
      for(var c = 0, d = a.length;c < d;c++) {
        b.push(G(a[c]))
      }
      return"[" + b.join(",") + "]"
    }else {
      if(E(a)) {
        var e;
        d = "{";
        switch(da(a)) {
          case z:
            e = a && a.splice ? a[0] : a;
            if(e instanceof l.Marker) {
              e = e.getPosition()
            }
            d += "x:" + e.lng() + ",y:" + e.lat();
            break;
          case A:
            c = [];
            for(b = 0;b < a.length;b++) {
              e = a[b] instanceof l.Marker ? a[b].getPosition() : a[b];
              c.push("[" + e.lng() + "," + e.lat() + "]")
            }
            d += "points: [" + c.join(",") + "]";
            break;
          case B:
            c = [];
            a = a && a.splice ? a : [a];
            for(b = 0;b < a.length;b++) {
              c.push("[" + F(a[b].getPath()) + "]")
            }
            d += "paths:[" + c.join(",") + "]";
            break;
          case C:
            c = [];
            e = a && a.splice ? a[0] : a;
            a = e.getPaths();
            for(b = 0;b < a.getLength();b++) {
              c.push("[" + F(a.getAt(b), true) + "]")
            }
            d += "rings:[" + c.join(",") + "]";
            break;
          case D:
            e = a && a.splice ? a[0] : a;
            d += "xmin:" + e.getSouthWest().lng() + ",ymin:" + e.getSouthWest().lat() + ",xmax:" + e.getNorthEast().lng() + ",ymax:" + e.getNorthEast().lat();
            break
        }
        d += ", spatialReference:{wkid:4326}";
        d += "}";
        return d
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
              b += c + ":" + G(a[c])
            }
          }
          return"{" + b + "}"
        }
      }
    }
  }
  return a.toString()
}
function H(a) {
  var b = "";
  if(a) {
    a.f = a.f || "json";
    for(var c in a) {
      if(a.hasOwnProperty(c) && a[c] !== null && a[c] !== undefined) {
        var d = G(a[c]);
        b += c + "=" + (escape ? escape(d) : encodeURIComponent(d)) + "&"
      }
    }
  }
  return b
}
function I(a, b, c, d) {
  var e = "ags_jsonp_" + k++ + "_" + Math.floor(Math.random() * 1E6), f = null;
  b = b || {};
  b[c || "callback"] = e + " && " + e;
  b = H(b);
  var j = document.getElementsByTagName("head")[0];
  if(!j) {
    throw new Error("document must have header tag");
  }
  window[e] = function() {
    delete window[e];
    f && j.removeChild(f);
    f = null;
    d.apply(null, arguments);
    x(t, "jsonpend", e)
  };
  if((b + a).length < 2E3 && !r.T) {
    f = document.createElement("script");
    f.src = a + (a.indexOf("?") === -1 ? "?" : "&") + b;
    f.id = e;
    j.appendChild(f)
  }else {
    c = window.location;
    c = c.protocol + "//" + c.hostname + (!c.port || c.port === 80 ? "" : ":" + c.port + "/");
    var h = true;
    if(a.toLowerCase().indexOf(c.toLowerCase()) !== -1) {
      h = false
    }
    if(r.T) {
      h = true
    }
    if(h && !r.Z) {
      throw new Error("No proxyUrl property in Config is defined");
    }
    var g = ca();
    g.onreadystatechange = function() {
      if(g.readyState === 4) {
        if(g.status === 200) {
          eval(g.responseText)
        }else {
          throw new Error("Error code " + g.status);
        }
      }
    };
    g.open("POST", h ? r.Z + "?" + a : a, true);
    g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    g.send(b)
  }
  x(t, "jsonpstart", e);
  return e
}
t.oa = function(a, b, c, d) {
  I(a, b, c, d)
};
t.S = function(a, b) {
  if(b && b.splice) {
    for(var c, d = 0, e = b.length;d < e;d++) {
      if((c = b[d]) && c.splice) {
        t.S(a, c)
      }else {
        E(c) && c.setMap(a)
      }
    }
  }
};
t.qa = function(a, b) {
  t.S(null, a);
  if(b) {
    a.length = 0
  }
};
function J(a) {
  a = a || {};
  this.wkid = a.wkid;
  this.wkt = a.wkt
}
J.prototype.l = function(a) {
  return a
};
J.prototype.o = function() {
  return 360
};
J.prototype.toJSON = function() {
  return"{" + (this.wkid ? " wkid:" + this.wkid : "wkt: '" + this.wkt + "'") + "}"
};
function K(a) {
  a = a || {};
  J.call(this, a)
}
K.prototype = new J;
function L(a) {
  a = a || {};
  J.call(this, a);
  var b = a.K, c = a.O * i, d = a.P * i, e = a.L * i;
  this.a = a.B / a.F;
  this.m = a.t * i;
  this.p = a.I;
  this.q = a.J;
  a = 1 / b;
  b = 2 * a - a * a;
  this.g = Math.sqrt(b);
  a = this.k(c, b);
  b = this.k(d, b);
  e = M(this, e, this.g);
  c = M(this, c, this.g);
  d = M(this, d, this.g);
  this.b = Math.log(a / b) / Math.log(c / d);
  this.R = a / (this.b * Math.pow(c, this.b));
  this.n = this.G(this.a, this.R, e, this.b)
}
L.prototype = new J;
L.prototype.k = function(a, b) {
  var c = Math.sin(a);
  return Math.cos(a) / Math.sqrt(1 - b * c * c)
};
function M(a, b, c) {
  a = c * Math.sin(b);
  return Math.tan(Math.PI / 4 - b / 2) / Math.pow((1 - a) / (1 + a), c / 2)
}
L.prototype.G = function(a, b, c, d) {
  return a * b * Math.pow(c, d)
};
L.prototype.r = function(a, b, c) {
  c = b * Math.sin(c);
  return Math.PI / 2 - 2 * Math.atan(a * Math.pow((1 - c) / (1 + c), b / 2))
};
L.prototype.N = function(a, b, c) {
  var d = 0;
  c = c;
  for(var e = this.r(a, b, c);Math.abs(e - c) > 1.0E-9 && d < 10;) {
    d++;
    c = e;
    e = this.r(a, b, c)
  }
  return e
};
L.prototype.l = function(a) {
  var b = a[0] - this.p, c = a[1] - this.q;
  a = Math.atan(b / (this.n - c));
  b = Math.pow((this.b > 0 ? 1 : -1) * Math.sqrt(b * b + (this.n - c) * (this.n - c)) / (this.a * this.R), 1 / this.b);
  return[(a / this.b + this.m) / i, this.N(b, this.g, Math.PI / 2 - 2 * Math.atan(b)) / i]
};
L.prototype.o = function() {
  return Math.PI * 2 * this.a
};
function N(a) {
  a = a || {};
  J.call(this, a);
  this.a = a.B / a.F;
  var b = a.K;
  this.W = a.ka;
  var c = a.L * i;
  this.m = a.t * i;
  this.p = a.I;
  this.q = a.J;
  a = 1 / b;
  this.d = 2 * a - a * a;
  this.H = this.d * this.d;
  this.U = this.H * this.d;
  this.v = this.d / (1 - this.d);
  this.da = this.k(c, this.a, this.d, this.H, this.U)
}
N.prototype = new J;
N.prototype.k = function(a, b, c, d, e) {
  return b * ((1 - c / 4 - 3 * d / 64 - 5 * e / 256) * a - (3 * c / 8 + 3 * d / 32 + 45 * e / 1024) * Math.sin(2 * a) + (15 * d / 256 + 45 * e / 1024) * Math.sin(4 * a) - 35 * e / 3072 * Math.sin(6 * a))
};
N.prototype.l = function(a) {
  var b = a[0], c = a[1];
  a = (1 - Math.sqrt(1 - this.d)) / (1 + Math.sqrt(1 - this.d));
  c = (this.da + (c - this.q) / this.W) / (this.a * (1 - this.d / 4 - 3 * this.H / 64 - 5 * this.U / 256));
  a = c + (3 * a / 2 - 27 * Math.pow(a, 3) / 32) * Math.sin(2 * c) + (21 * a * a / 16 - 55 * Math.pow(a, 4) / 32) * Math.sin(4 * c) + 151 * Math.pow(a, 3) / 6 * Math.sin(6 * c) + 1097 * Math.pow(a, 4) / 512 * Math.sin(8 * c);
  c = this.v * Math.pow(Math.cos(a), 2);
  var d = Math.pow(Math.tan(a), 2), e = this.a / Math.sqrt(1 - this.d * Math.pow(Math.sin(a), 2)), f = this.a * (1 - this.d) / Math.pow(1 - this.d * Math.pow(Math.sin(a), 2), 1.5);
  b = (b - this.p) / (e * this.W);
  e = a - e * Math.tan(a) / f * (b * b / 2 - (5 + 3 * d + 10 * c - 4 * c * c - 9 * this.v) * Math.pow(b, 4) / 24 + (61 + 90 * d + 28 * c + 45 * d * d - 252 * this.v - 3 * c * c) * Math.pow(b, 6) / 720);
  return[(this.m + (b - (1 + 2 * d + c) * Math.pow(b, 3) / 6 + (5 - 2 * c + 28 * d - 3 * c * c + 8 * this.v + 24 * d * d) * Math.pow(b, 5) / 120) / Math.cos(a)) / i, e / i]
};
N.prototype.o = function() {
  return Math.PI * 2 * this.a
};
function O(a) {
  a = a || {};
  J.call(this, a);
  this.a = (a.B || 6378137) / (a.F || 1);
  this.m = (a.t || 0) * i
}
O.prototype = new J;
O.prototype.l = function(a) {
  return[(a[0] / this.a + this.m) / i, (Math.PI / 2 - 2 * Math.atan(Math.exp(-a[1] / this.a))) / i]
};
O.prototype.o = function() {
  return Math.PI * 2 * this.a
};
function P(a) {
  a = a || {};
  J.call(this, a);
  var b = a.K, c = a.O * i, d = a.P * i, e = a.L * i;
  this.a = a.B / a.F;
  this.m = a.t * i;
  this.p = a.I;
  this.q = a.J;
  a = 1 / b;
  b = 2 * a - a * a;
  this.g = Math.sqrt(b);
  a = this.k(c, b);
  b = this.k(d, b);
  c = Q(this, c, this.g);
  d = Q(this, d, this.g);
  e = Q(this, e, this.g);
  this.b = (a * a - b * b) / (d - c);
  this.Q = a * a + this.b * c;
  this.n = this.G(this.a, this.Q, this.b, e)
}
P.prototype = new J;
P.prototype.k = function(a, b) {
  var c = Math.sin(a);
  return Math.cos(a) / Math.sqrt(1 - b * c * c)
};
function Q(a, b, c) {
  a = c * Math.sin(b);
  return(1 - c * c) * (Math.sin(b) / (1 - a * a) - 1 / (2 * c) * Math.log((1 - a) / (1 + a)))
}
P.prototype.G = function(a, b, c, d) {
  return a * Math.sqrt(b - c * d) / c
};
P.prototype.r = function(a, b, c) {
  var d = b * Math.sin(c);
  return c + (1 - d * d) * (1 - d * d) / (2 * Math.cos(c)) * (a / (1 - b * b) - Math.sin(c) / (1 - d * d) + Math.log((1 - d) / (1 + d)) / (2 * b))
};
P.prototype.N = function(a, b, c) {
  var d = 0;
  c = c;
  for(var e = this.r(a, b, c);Math.abs(e - c) > 1.0E-8 && d < 10;) {
    d++;
    c = e;
    e = this.r(a, b, c)
  }
  return e
};
P.prototype.l = function(a) {
  var b = a[0] - this.p;
  a = a[1] - this.q;
  var c = Math.sqrt(b * b + (this.n - a) * (this.n - a)), d = this.b > 0 ? 1 : -1;
  c = (this.Q - c * c * this.b * this.b / (this.a * this.a)) / this.b;
  return[(Math.atan(d * b / (d * this.n - d * a)) / this.b + this.m) / i, this.N(c, this.g, Math.asin(c / 2)) / i]
};
P.prototype.o = function() {
  return Math.PI * 2 * this.a
};
P.prototype.o = function() {
  return Math.PI * 2 * this.a
};
n = new K({wkid:4326});
o = new K({wkid:4269});
q = new O({wkid:102113, semi_major:6378137, central_meridian:0, unit:1});
s = {"4326":n, "4269":o, "102113":q, "102100":new O({wkid:102100, semi_major:6378137, central_meridian:0, unit:1})};
function ea(a, b) {
  var c = s["" + a];
  if(c) {
    return c
  }
  if(b instanceof J) {
    c = s["" + a] = b
  }else {
    c = b || a;
    var d = {wkt:a};
    if(a === parseInt(a, 10)) {
      d = {wkid:a}
    }
    var e = u(c, 'PROJECTION["', '"]'), f = u(c, "SPHEROID[", "]").split(",");
    if(e !== "") {
      d.F = parseFloat(u(u(c, "PROJECTION", ""), "UNIT[", "]").split(",")[1]);
      d.B = parseFloat(f[1]);
      d.K = parseFloat(f[2]);
      d.L = parseFloat(u(c, '"Latitude_Of_Origin",', "]"));
      d.t = parseFloat(u(c, '"Central_Meridian",', "]"));
      d.I = parseFloat(u(c, '"False_Easting",', "]"));
      d.J = parseFloat(u(c, '"False_Northing",', "]"))
    }
    switch(e) {
      case "":
        c = new J(d);
        break;
      case "Lambert_Conformal_Conic":
        d.O = parseFloat(u(c, '"Standard_Parallel_1",', "]"));
        d.P = parseFloat(u(c, '"Standard_Parallel_2",', "]"));
        c = new L(d);
        break;
      case "Transverse_Mercator":
        d.ka = parseFloat(u(c, '"Scale_Factor",', "]"));
        c = new N(d);
        break;
      case "Albers":
        d.O = parseFloat(u(c, '"Standard_Parallel_1",', "]"));
        d.P = parseFloat(u(c, '"Standard_Parallel_2",', "]"));
        c = new P(d);
        break;
      default:
        throw new Error(e + "  not supported");
    }
    if(c) {
      s["" + a] = c
    }
  }
  return c
}
function R(a) {
  this.url = a;
  this.definition = null
}
R.prototype.load = function() {
  var a = this;
  this.z || I(this.url, {}, "", function(b) {
    w(b, a);
    a.z = true;
    x(a, "load")
  })
};
function S(a, b) {
  this.url = a;
  this.z = false;
  var c = a.split("/");
  this.name = c[c.length - 2].replace(/_/g, " ");
  b = b || {};
  b.la || this.load()
}
S.prototype.load = function() {
  var a = this;
  I(this.url, {}, "", function(b) {
    a.w(b)
  })
};
S.prototype.w = function(a) {
  var b = this;
  w(a, this);
  this.spatialReference = a.spatialReference.wkt ? ea(a.spatialReference.wkt) : s[a.spatialReference.wkid];
  a.tables !== undefined ? I(this.url + "/layers", {}, "", function(c) {
    T(b, c)
  }) : T(b, a)
};
function T(a, b) {
  var c = [], d = [];
  a.layers = c;
  if(b.tables) {
    a.tables = d
  }
  var e, f, j, h;
  f = 0;
  for(j = b.layers.length;f < j;f++) {
    h = b.layers[f];
    e = new R(a.url + "/" + h.id);
    w(h, e);
    e.visible = e.defaultVisibility;
    c.push(e)
  }
  if(b.tables) {
    f = 0;
    for(j = b.tables.length;f < j;f++) {
      h = b.tables[f];
      e = new R(a.url + "/" + h.id);
      w(h, e);
      d.push(e)
    }
  }
  f = 0;
  for(j = c.length;f < j;f++) {
    e = c[f];
    if(e.subLayerIds) {
      e.C = [];
      d = 0;
      for(h = e.subLayerIds.length;d < h;d++) {
        var g;
        a: {
          g = e.subLayerIds[d];
          var m = a.layers;
          if(m) {
            for(var p = 0, fa = m.length;p < fa;p++) {
              if(g === m[p].id) {
                g = m[p];
                break a
              }
              if(v(g) && m[p].name.toLowerCase() === g.toLowerCase()) {
                g = m[p];
                break a
              }
            }
          }
          g = null
        }
        e.C.push(g);
        g.pa = e
      }
    }
  }
  a.z = true;
  x(a, "load")
}
function ga(a) {
  var b = {};
  if(a.layers) {
    for(var c = 0, d = a.layers.length;c < d;c++) {
      var e = a.layers[c];
      if(e.definition) {
        b[String(e.id)] = e.definition
      }
    }
  }
  return b
}
function ha(a) {
  var b = [];
  if(a.layers) {
    var c, d, e;
    d = 0;
    for(e = a.layers.length;d < e;d++) {
      c = a.layers[d];
      if(c.C) {
        for(var f = 0, j = c.C.length;f < j;f++) {
          if(c.C[f].visible === false) {
            c.visible = false;
            break
          }
        }
      }
    }
    d = 0;
    for(e = a.layers.length;d < e;d++) {
      c = a.layers[d];
      c.visible === true && b.push(c.id)
    }
  }
  return b
}
function U(a, b, c, d) {
  if(b && b.bounds) {
    var e = {};
    e.f = b.f;
    var f = b.bounds;
    e.bbox = "" + f.getSouthWest().lng() + "," + f.getSouthWest().lat() + "," + f.getNorthEast().lng() + "," + f.getNorthEast().lat();
    e.size = "" + b.width + "," + b.height;
    e.dpi = b.dpi;
    if(b.imageSR) {
      e.imageSR = b.imageSR.wkid ? b.imageSR.wkid : "{wkt:" + b.imageSR.wkt + "}"
    }
    e.bboxSR = "4326";
    e.format = b.format;
    f = b.layerDefinitions;
    if(f === undefined) {
      f = ga(a)
    }
    e.layerDefs = ba(f);
    f = b.layerIds;
    var j = b.layerOption || "show";
    if(f === undefined) {
      f = ha(a)
    }
    if(f.length > 0) {
      e.layers = j + ":" + f.join(",")
    }else {
      if(a.z && c) {
        c({href:null});
        return
      }
    }
    e.transparent = b.transparent === false ? false : true;
    if(b.time) {
      e.time = aa(b.time, b.ma)
    }
    e.ga = b.ga;
    if(e.f === "image") {
      return a.url + "/export?" + H(e)
    }else {
      I(a.url + "/export", e, "", function(h) {
        if(h.extent) {
          var g, m = h.extent, p = s[m.spatialReference.wkid || m.spatialReference.wkt];
          p = p || n;
          g = p.l([m.xmin, m.ymin]);
          m = p.l([m.xmax, m.ymax]);
          g = new l.LatLngBounds(new l.LatLng(g[1], g[0]), new l.LatLng(m[1], m[0]));
          h.bounds = g;
          delete h.extent;
          c(h)
        }else {
          h = h.error;
          d && h && h.error && d(h.error)
        }
      })
    }
  }
}
function V(a) {
  this.ha = a ? a.lods : null;
  this.s = a ? s[a.spatialReference.wkid || a.spatialReference.wkt] : q;
  if(!this.s) {
    throw new Error("unsupported Spatial Reference");
  }
  this.$ = a ? a.lods[0].resolution : 156543.033928;
  this.minZoom = Math.floor(Math.log(this.s.o() / this.$ / 256) / Math.LN2 + 0.5);
  this.maxZoom = a ? this.minZoom + this.ha.length - 1 : 20;
  if(l.Size) {
    this.ba = a ? new l.Size(a.cols, a.rows) : new l.Size(256, 256)
  }
  this.aa = Math.pow(2, this.minZoom) * this.$;
  this.ia = a ? a.origin.x : -2.0037508342787E7;
  this.ja = a ? a.origin.y : 2.0037508342787E7;
  if(a) {
    for(var b, c = 0;c < a.lods.length - 1;c++) {
      b = a.lods[c].resolution / a.lods[c + 1].resolution;
      if(b > 2.001 || b < 1.999) {
        throw new Error("This type of map cache is not supported in V3. \nScale ratio between zoom levels must be 2");
      }
    }
  }
}
V.prototype.fromPointToLatLng = function(a) {
  if(a === null) {
    return null
  }
  a = this.s.l([a.x * this.aa + this.ia, this.ja - a.y * this.aa]);
  return new l.LatLng(a[1], a[0])
};
var W = new V;
function X(a, b) {
  b = b || {};
  if(b.opacity) {
    this.e = b.opacity;
    delete b.opacity
  }
  w(b, this);
  this.c = a instanceof S ? a : new S(a);
  if(b.V) {
    var c = u(this.c.url, "", "://");
    this.ca = c + "://" + b.V + u(this.c.url, c + "://" + u(this.c.url, "://", "/"), "");
    this.Y = parseInt(u(b.V, "[", "]"), 10)
  }
  this.name = this.name || this.c.name;
  this.maxZoom = this.maxZoom || 19;
  this.minZoom = this.minZoom || 0;
  if(this.c.loaded) {
    this.w(b)
  }else {
    var d = this;
    l.event.addListenerOnce(this.c, "load", function() {
      d.w(b)
    })
  }
  this.h = {};
  this.X = b.map
}
X.prototype.w = function(a) {
  if(this.c.tileInfo) {
    this.j = new V(this.c.tileInfo);
    this.minZoom = a.minZoom || this.j.minZoom;
    this.maxZoom = a.maxZoom || this.j.maxZoom
  }
};
X.prototype.getTileUrl = function(a, b) {
  var c = b - (this.j ? this.j.minZoom : this.minZoom), d = "";
  if(!isNaN(a.x) && !isNaN(a.y) && c >= 0 && a.x >= 0 && a.y >= 0) {
    d = this.c.url;
    if(this.ca) {
      d = this.ca.replace("[" + this.Y + "]", "" + (a.y + a.x) % this.Y)
    }
    if(this.c.singleFusedMapCache === false) {
      c = this.j || this.X ? this.X.getProjection() : W;
      if(!c instanceof V) {
        c = W
      }
      d = c.ba;
      var e = 1 << b, f = new l.Point(a.x * d.width / e, (a.y + 1) * d.height / e);
      e = new l.Point((a.x + 1) * d.width / e, a.y * d.height / e);
      f = new l.LatLngBounds(c.fromPointToLatLng(f), c.fromPointToLatLng(e));
      e = {f:"image"};
      e.bounds = f;
      e.width = d.width;
      e.height = d.height;
      e.imageSR = c.s;
      d = U(this.c, e)
    }else {
      d = d + "/tile/" + c + "/" + a.y + "/" + a.x
    }
  }
  return d
};
X.prototype.M = function(a) {
  this.e = a;
  var b = this.h;
  for(var c in b) {
    b.hasOwnProperty(c) && y(b[c], a)
  }
};
function Y(a, b) {
  b = b || {};
  var c;
  if(b.opacity) {
    this.e = b.opacity;
    delete b.opacity
  }
  w(b, this);
  var d = a;
  if(v(a)) {
    d = [new X(a, b)]
  }else {
    if(a instanceof S) {
      d = [new X(a, b)]
    }else {
      if(a instanceof X) {
        d = [a]
      }else {
        if(a.length > 0 && v(a[0])) {
          d = [];
          for(c = 0;c < a.length;c++) {
            d[c] = new X(a[c], b)
          }
        }
      }
    }
  }
  this.D = d;
  this.h = {};
  if(b.maxZoom !== undefined) {
    this.maxZoom = b.maxZoom
  }else {
    var e = 0;
    for(c = 0;c < d.length;c++) {
      e = Math.max(e, d[c].maxZoom)
    }
    this.maxZoom = e
  }
  if(d[0].j) {
    this.tileSize = d[0].j.ba;
    this.projection = d[0].j
  }else {
    this.tileSize = new l.Size(256, 256)
  }
  if(!this.name) {
    this.name = d[0].name
  }
}
Y.prototype.getTile = function(a, b, c) {
  for(var d = c.createElement("div"), e = "_" + a.x + "_" + a.y + "_" + b, f = 0;f < this.D.length;f++) {
    var j = this.D[f];
    if(b <= j.maxZoom && b >= j.minZoom) {
      var h = j.getTileUrl(a, b);
      if(h) {
        var g = c.createElement(document.all ? "img" : "div");
        g.style.border = "0px none";
        g.style.margin = "0px";
        g.style.padding = "0px";
        g.style.overflow = "hidden";
        g.style.position = "absolute";
        g.style.top = "0px";
        g.style.left = "0px";
        g.style.width = "" + this.tileSize.width + "px";
        g.style.height = "" + this.tileSize.height + "px";
        if(document.all) {
          g.src = h
        }else {
          g.style.backgroundImage = "url(" + h + ")"
        }
        d.appendChild(g);
        j.h[e] = g;
        if(j.e !== undefined) {
          y(g, j.e)
        }else {
          this.e !== undefined && y(g, this.e)
        }
      }
    }
  }
  this.h[e] = d;
  d.setAttribute("tid", e);
  return d
};
Y.prototype.getTile = Y.prototype.getTile;
Y.prototype.releaseTile = function(a) {
  if(a.getAttribute("tid")) {
    a = a.getAttribute("tid");
    this.h[a] && delete this.h[a];
    for(var b = 0;b < this.D.length;b++) {
      var c = this.D[b];
      c.h[a] && delete c.h[a]
    }
  }
};
Y.prototype.releaseTile = Y.prototype.releaseTile;
Y.prototype.M = function(a) {
  this.e = a;
  var b = this.h;
  for(var c in b) {
    if(b.hasOwnProperty(c)) {
      for(var d = b[c].childNodes, e = 0;e < d.length;e++) {
        y(d[e], a)
      }
    }
  }
};
function Z(a, b) {
  b = b || {};
  this.c = a instanceof S ? a : new S(a);
  this.e = b.opacity || 1;
  this.fa = b.na || {};
  this.A = this.u = false;
  this.i = null;
  b.map && this.setMap(b.map)
}
Z.prototype = new l.OverlayView;
Z.prototype.onAdd = function() {
  var a = document.createElement("div");
  a.style.position = "absolute";
  a.style.border = "none";
  this.i = a;
  this.getPanes().overlayLayer.appendChild(a);
  this.e && y(a, this.e);
  var b = this;
  this.ea = l.event.addListener(this.getMap(), "bounds_changed", function() {
    $(b)
  })
};
Z.prototype.onAdd = Z.prototype.onAdd;
Z.prototype.onRemove = function() {
  l.event.removeListener(this.ea);
  this.i.parentNode.removeChild(this.i);
  this.i = null
};
Z.prototype.onRemove = Z.prototype.onRemove;
Z.prototype.draw = function() {
  if(!this.u || this.A === true) {
    $(this)
  }
};
Z.prototype.draw = Z.prototype.draw;
Z.prototype.M = function(a) {
  this.e = a = Math.min(Math.max(a, 0), 1);
  y(this.i, a)
};
function $(a) {
  if(a.u === true) {
    a.A = true
  }else {
    var b = a.getMap(), c = b ? b.getBounds() : null;
    if(c) {
      var d = a.fa;
      d.bounds = c;
      c = q;
      var e = b.getDiv();
      d.width = e.offsetWidth;
      d.height = e.offsetHeight;
      if((b = b.getProjection()) && b instanceof V) {
        c = b.s
      }
      d.imageSR = c;
      x(a, "drawstart");
      a.u = true;
      a.i.style.backgroundImage = "";
      U(a.c, d, function(f) {
        a.u = false;
        if(a.A === true) {
          a.A = false;
          $(a)
        }else {
          if(f.href) {
            var j = a.getProjection(), h = f.bounds, g = j.fromLatLngToDivPixel(h.getSouthWest());
            j = j.fromLatLngToDivPixel(h.getNorthEast());
            h = a.i;
            h.style.left = g.x + "px";
            h.style.top = j.y + "px";
            h.style.width = j.x - g.x + "px";
            h.style.height = g.y - j.y + "px";
            a.i.style.backgroundImage = "url(" + f.href + ")";
            a.M(a.e)
          }
          x(a, "drawend")
        }
      })
    }
  }
}
;window.onload = function() {
  var a = {zoom:13, center:new google.maps.LatLng(45.5, -122.7), mapTypeId:"arcgis", mapTypeControlOptions:{mapTypeIds:["arcgis", google.maps.MapTypeId.ROADMAP]}, streetViewControl:true};
  a = new google.maps.Map(document.getElementById("map_canvas"), a);
  var b = new Y("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Portland/ESRI_LandBase_WebMercator/MapServer", {name:"ArcGIS"});
  a.mapTypes.set("arcgis", b);
  (new Z("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer")).setMap(a)
};})()

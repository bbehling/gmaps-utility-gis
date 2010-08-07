(function(){/*
 http://google-maps-utility-library-v3.googlecode.com
*/
var i = Math.PI / 180, k = 0, m = google.maps, n, p, q, r = {Q:null, N:false}, s = {}, t = {};
function u(a, b, c) {
  var d = b === "" ? 0 : a.indexOf(b);
  return a.substring(d + b.length, c === "" ? a.length : a.indexOf(c, d + b.length))
}
function v(a, b, c) {
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
function w() {
  m.event.trigger.apply(this, arguments)
}
function x(a, b) {
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
function z(a) {
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
function A() {
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
var B = "esriGeometryPoint", C = "esriGeometryMultipoint", D = "esriGeometryPolyline", E = "esriGeometryPolygon", F = "esriGeometryEnvelope";
function G(a) {
  var b = a;
  if(a && a.splice && a.length > 0) {
    b = a[0]
  }
  if(b instanceof m.LatLng || b instanceof m.Marker) {
    return a && a.splice && a.length > 1 ? C : B
  }else {
    if(b instanceof m.Polyline) {
      return D
    }else {
      if(b instanceof m.Polygon) {
        return E
      }else {
        if(b instanceof m.LatLngBounds) {
          return F
        }else {
          if(b.x !== undefined && b.y !== undefined) {
            return B
          }else {
            if(b.points) {
              return C
            }else {
              if(b.paths) {
                return D
              }else {
                if(b.rings) {
                  return E
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
function H(a) {
  var b = a;
  if(a && a.splice && a.length > 0) {
    b = a[0]
  }
  if(b && b.splice && b.length > 0) {
    b = b[0]
  }
  if(b instanceof m.LatLng || b instanceof m.Marker || b instanceof m.Polyline || b instanceof m.Polygon || b instanceof m.LatLngBounds) {
    return true
  }
  return false
}
function I(a, b) {
  for(var c = [], d, e = 0, f = a.getLength();e < f;e++) {
    d = a.getAt(e);
    c.push("[" + d.lng() + "," + d.lat() + "]")
  }
  b && c.length > 0 && c.push("[" + a.getAt(0).lng() + "," + a.getAt(0).lat() + "]");
  return c.join(",")
}
function J(a) {
  var b;
  if(typeof a === "object") {
    if(a && a.splice) {
      b = [];
      for(var c = 0, d = a.length;c < d;c++) {
        b.push(J(a[c]))
      }
      return"[" + b.join(",") + "]"
    }else {
      if(H(a)) {
        var e;
        d = "{";
        switch(G(a)) {
          case B:
            e = a && a.splice ? a[0] : a;
            if(e instanceof m.Marker) {
              e = e.getPosition()
            }
            d += "x:" + e.lng() + ",y:" + e.lat();
            break;
          case C:
            c = [];
            for(b = 0;b < a.length;b++) {
              e = a[b] instanceof m.Marker ? a[b].getPosition() : a[b];
              c.push("[" + e.lng() + "," + e.lat() + "]")
            }
            d += "points: [" + c.join(",") + "]";
            break;
          case D:
            c = [];
            a = a && a.splice ? a : [a];
            for(b = 0;b < a.length;b++) {
              c.push("[" + I(a[b].getPath()) + "]")
            }
            d += "paths:[" + c.join(",") + "]";
            break;
          case E:
            c = [];
            e = a && a.splice ? a[0] : a;
            a = e.getPaths();
            for(b = 0;b < a.getLength();b++) {
              c.push("[" + I(a.getAt(b), true) + "]")
            }
            d += "rings:[" + c.join(",") + "]";
            break;
          case F:
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
              b += c + ":" + J(a[c])
            }
          }
          return"{" + b + "}"
        }
      }
    }
  }
  return a.toString()
}
function K(a) {
  var b = "";
  if(a) {
    a.f = a.f || "json";
    for(var c in a) {
      if(a.hasOwnProperty(c) && a[c] !== null && a[c] !== undefined) {
        var d = J(a[c]);
        b += c + "=" + (escape ? escape(d) : encodeURIComponent(d)) + "&"
      }
    }
  }
  return b
}
function L(a, b, c, d) {
  var e = "ags_jsonp_" + k++ + "_" + Math.floor(Math.random() * 1E6), f = null;
  b = b || {};
  b[c || "callback"] = e + " && " + e;
  b = K(b);
  var j = document.getElementsByTagName("head")[0];
  if(!j) {
    throw new Error("document must have header tag");
  }
  window[e] = function() {
    delete window[e];
    f && j.removeChild(f);
    f = null;
    d.apply(null, arguments);
    w(t, "jsonpend", e)
  };
  if((b + a).length < 2E3 && !r.N) {
    f = document.createElement("script");
    f.src = a + (a.indexOf("?") === -1 ? "?" : "&") + b;
    f.id = e;
    j.appendChild(f)
  }else {
    c = window.location;
    c = c.protocol + "//" + c.hostname + (!c.port || c.port === 80 ? "" : ":" + c.port + "/");
    var g = true;
    if(a.toLowerCase().indexOf(c.toLowerCase()) !== -1) {
      g = false
    }
    if(r.N) {
      g = true
    }
    if(g && !r.Q) {
      throw new Error("No proxyUrl property in Config is defined");
    }
    var h = A();
    h.onreadystatechange = function() {
      if(h.readyState === 4) {
        if(h.status === 200) {
          eval(h.responseText)
        }else {
          throw new Error("Error code " + h.status);
        }
      }
    };
    h.open("POST", g ? r.Q + "?" + a : a, true);
    h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    h.send(b)
  }
  w(t, "jsonpstart", e);
  return e
}
t.ba = function(a, b, c, d) {
  L(a, b, c, d)
};
t.M = function(a, b) {
  if(b && b.splice) {
    for(var c, d = 0, e = b.length;d < e;d++) {
      if((c = b[d]) && c.splice) {
        t.M(a, c)
      }else {
        H(c) && c.setMap(a)
      }
    }
  }
};
t.fa = function(a, b) {
  t.M(null, a);
  if(b) {
    a.length = 0
  }
};
function M(a) {
  a = a || {};
  this.wkid = a.wkid;
  this.wkt = a.wkt
}
M.prototype.k = function(a) {
  return a
};
M.prototype.j = function() {
  return 360
};
M.prototype.toJSON = function() {
  return"{" + (this.wkid ? " wkid:" + this.wkid : "wkt: '" + this.wkt + "'") + "}"
};
function N(a) {
  a = a || {};
  M.call(this, a)
}
N.prototype = new M;
function O(a) {
  a = a || {};
  M.call(this, a);
  var b = a.D, c = a.I * i, d = a.J * i, e = a.F * i;
  this.a = a.u / a.w;
  this.h = a.o * i;
  this.l = a.B;
  this.m = a.C;
  a = 1 / b;
  b = 2 * a - a * a;
  this.d = Math.sqrt(b);
  a = this.g(c, b);
  b = this.g(d, b);
  e = P(this, e, this.d);
  c = P(this, c, this.d);
  d = P(this, d, this.d);
  this.b = Math.log(a / b) / Math.log(c / d);
  this.L = a / (this.b * Math.pow(c, this.b));
  this.i = this.z(this.a, this.L, e, this.b)
}
O.prototype = new M;
O.prototype.g = function(a, b) {
  var c = Math.sin(a);
  return Math.cos(a) / Math.sqrt(1 - b * c * c)
};
function P(a, b, c) {
  a = c * Math.sin(b);
  return Math.tan(Math.PI / 4 - b / 2) / Math.pow((1 - a) / (1 + a), c / 2)
}
O.prototype.z = function(a, b, c, d) {
  return a * b * Math.pow(c, d)
};
O.prototype.n = function(a, b, c) {
  c = b * Math.sin(c);
  return Math.PI / 2 - 2 * Math.atan(a * Math.pow((1 - c) / (1 + c), b / 2))
};
O.prototype.G = function(a, b, c) {
  var d = 0;
  c = c;
  for(var e = this.n(a, b, c);Math.abs(e - c) > 1.0E-9 && d < 10;) {
    d++;
    c = e;
    e = this.n(a, b, c)
  }
  return e
};
O.prototype.k = function(a) {
  var b = a[0] - this.l, c = a[1] - this.m;
  a = Math.atan(b / (this.i - c));
  b = Math.pow((this.b > 0 ? 1 : -1) * Math.sqrt(b * b + (this.i - c) * (this.i - c)) / (this.a * this.L), 1 / this.b);
  return[(a / this.b + this.h) / i, this.G(b, this.d, Math.PI / 2 - 2 * Math.atan(b)) / i]
};
O.prototype.j = function() {
  return Math.PI * 2 * this.a
};
function Q(a) {
  a = a || {};
  M.call(this, a);
  this.a = a.u / a.w;
  var b = a.D;
  this.P = a.Y;
  var c = a.F * i;
  this.h = a.o * i;
  this.l = a.B;
  this.m = a.C;
  a = 1 / b;
  this.c = 2 * a - a * a;
  this.A = this.c * this.c;
  this.O = this.A * this.c;
  this.q = this.c / (1 - this.c);
  this.S = this.g(c, this.a, this.c, this.A, this.O)
}
Q.prototype = new M;
Q.prototype.g = function(a, b, c, d, e) {
  return b * ((1 - c / 4 - 3 * d / 64 - 5 * e / 256) * a - (3 * c / 8 + 3 * d / 32 + 45 * e / 1024) * Math.sin(2 * a) + (15 * d / 256 + 45 * e / 1024) * Math.sin(4 * a) - 35 * e / 3072 * Math.sin(6 * a))
};
Q.prototype.k = function(a) {
  var b = a[0], c = a[1];
  a = (1 - Math.sqrt(1 - this.c)) / (1 + Math.sqrt(1 - this.c));
  c = (this.S + (c - this.m) / this.P) / (this.a * (1 - this.c / 4 - 3 * this.A / 64 - 5 * this.O / 256));
  a = c + (3 * a / 2 - 27 * Math.pow(a, 3) / 32) * Math.sin(2 * c) + (21 * a * a / 16 - 55 * Math.pow(a, 4) / 32) * Math.sin(4 * c) + 151 * Math.pow(a, 3) / 6 * Math.sin(6 * c) + 1097 * Math.pow(a, 4) / 512 * Math.sin(8 * c);
  c = this.q * Math.pow(Math.cos(a), 2);
  var d = Math.pow(Math.tan(a), 2), e = this.a / Math.sqrt(1 - this.c * Math.pow(Math.sin(a), 2)), f = this.a * (1 - this.c) / Math.pow(1 - this.c * Math.pow(Math.sin(a), 2), 1.5);
  b = (b - this.l) / (e * this.P);
  e = a - e * Math.tan(a) / f * (b * b / 2 - (5 + 3 * d + 10 * c - 4 * c * c - 9 * this.q) * Math.pow(b, 4) / 24 + (61 + 90 * d + 28 * c + 45 * d * d - 252 * this.q - 3 * c * c) * Math.pow(b, 6) / 720);
  return[(this.h + (b - (1 + 2 * d + c) * Math.pow(b, 3) / 6 + (5 - 2 * c + 28 * d - 3 * c * c + 8 * this.q + 24 * d * d) * Math.pow(b, 5) / 120) / Math.cos(a)) / i, e / i]
};
Q.prototype.j = function() {
  return Math.PI * 2 * this.a
};
function R(a) {
  a = a || {};
  M.call(this, a);
  this.a = (a.u || 6378137) / (a.w || 1);
  this.h = (a.o || 0) * i
}
R.prototype = new M;
R.prototype.k = function(a) {
  return[(a[0] / this.a + this.h) / i, (Math.PI / 2 - 2 * Math.atan(Math.exp(-a[1] / this.a))) / i]
};
R.prototype.j = function() {
  return Math.PI * 2 * this.a
};
function S(a) {
  a = a || {};
  M.call(this, a);
  var b = a.D, c = a.I * i, d = a.J * i, e = a.F * i;
  this.a = a.u / a.w;
  this.h = a.o * i;
  this.l = a.B;
  this.m = a.C;
  a = 1 / b;
  b = 2 * a - a * a;
  this.d = Math.sqrt(b);
  a = this.g(c, b);
  b = this.g(d, b);
  c = T(this, c, this.d);
  d = T(this, d, this.d);
  e = T(this, e, this.d);
  this.b = (a * a - b * b) / (d - c);
  this.K = a * a + this.b * c;
  this.i = this.z(this.a, this.K, this.b, e)
}
S.prototype = new M;
S.prototype.g = function(a, b) {
  var c = Math.sin(a);
  return Math.cos(a) / Math.sqrt(1 - b * c * c)
};
function T(a, b, c) {
  a = c * Math.sin(b);
  return(1 - c * c) * (Math.sin(b) / (1 - a * a) - 1 / (2 * c) * Math.log((1 - a) / (1 + a)))
}
S.prototype.z = function(a, b, c, d) {
  return a * Math.sqrt(b - c * d) / c
};
S.prototype.n = function(a, b, c) {
  var d = b * Math.sin(c);
  return c + (1 - d * d) * (1 - d * d) / (2 * Math.cos(c)) * (a / (1 - b * b) - Math.sin(c) / (1 - d * d) + Math.log((1 - d) / (1 + d)) / (2 * b))
};
S.prototype.G = function(a, b, c) {
  var d = 0;
  c = c;
  for(var e = this.n(a, b, c);Math.abs(e - c) > 1.0E-8 && d < 10;) {
    d++;
    c = e;
    e = this.n(a, b, c)
  }
  return e
};
S.prototype.k = function(a) {
  var b = a[0] - this.l;
  a = a[1] - this.m;
  var c = Math.sqrt(b * b + (this.i - a) * (this.i - a)), d = this.b > 0 ? 1 : -1;
  c = (this.K - c * c * this.b * this.b / (this.a * this.a)) / this.b;
  return[(Math.atan(d * b / (d * this.i - d * a)) / this.b + this.h) / i, this.G(c, this.d, Math.asin(c / 2)) / i]
};
S.prototype.j = function() {
  return Math.PI * 2 * this.a
};
S.prototype.j = function() {
  return Math.PI * 2 * this.a
};
n = new N({wkid:4326});
p = new N({wkid:4269});
q = new R({wkid:102113, semi_major:6378137, central_meridian:0, unit:1});
s = {"4326":n, "4269":p, "102113":q, "102100":new R({wkid:102100, semi_major:6378137, central_meridian:0, unit:1})};
function U(a, b) {
  var c = s["" + a];
  if(c) {
    return c
  }
  if(b instanceof M) {
    c = s["" + a] = b
  }else {
    c = b || a;
    var d = {wkt:a};
    if(a === parseInt(a, 10)) {
      d = {wkid:a}
    }
    var e = u(c, 'PROJECTION["', '"]'), f = u(c, "SPHEROID[", "]").split(",");
    if(e !== "") {
      d.w = parseFloat(u(u(c, "PROJECTION", ""), "UNIT[", "]").split(",")[1]);
      d.u = parseFloat(f[1]);
      d.D = parseFloat(f[2]);
      d.F = parseFloat(u(c, '"Latitude_Of_Origin",', "]"));
      d.o = parseFloat(u(c, '"Central_Meridian",', "]"));
      d.B = parseFloat(u(c, '"False_Easting",', "]"));
      d.C = parseFloat(u(c, '"False_Northing",', "]"))
    }
    switch(e) {
      case "":
        c = new M(d);
        break;
      case "Lambert_Conformal_Conic":
        d.I = parseFloat(u(c, '"Standard_Parallel_1",', "]"));
        d.J = parseFloat(u(c, '"Standard_Parallel_2",', "]"));
        c = new O(d);
        break;
      case "Transverse_Mercator":
        d.Y = parseFloat(u(c, '"Scale_Factor",', "]"));
        c = new Q(d);
        break;
      case "Albers":
        d.I = parseFloat(u(c, '"Standard_Parallel_1",', "]"));
        d.J = parseFloat(u(c, '"Standard_Parallel_2",', "]"));
        c = new S(d);
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
function V(a) {
  this.url = a;
  this.definition = null
}
V.prototype.load = function() {
  var a = this;
  this.r || L(this.url, {}, "", function(b) {
    v(b, a);
    a.r = true;
    w(a, "load")
  })
};
function W(a, b) {
  this.url = a;
  this.r = false;
  var c = a.split("/");
  this.name = c[c.length - 2].replace(/_/g, " ");
  b = b || {};
  b.Z || this.load()
}
W.prototype.load = function() {
  var a = this;
  L(this.url, {}, "", function(b) {
    aa(a, b)
  })
};
function aa(a, b) {
  v(b, a);
  a.spatialReference = b.spatialReference.wkt ? U(b.spatialReference.wkt) : s[b.spatialReference.wkid];
  b.tables !== undefined ? L(a.url + "/layers", {}, "", function(c) {
    X(a, c)
  }) : X(a, b)
}
function X(a, b) {
  var c = [], d = [];
  a.layers = c;
  if(b.tables) {
    a.tables = d
  }
  var e, f, j, g;
  f = 0;
  for(j = b.layers.length;f < j;f++) {
    g = b.layers[f];
    e = new V(a.url + "/" + g.id);
    v(g, e);
    e.visible = e.defaultVisibility;
    c.push(e)
  }
  if(b.tables) {
    f = 0;
    for(j = b.tables.length;f < j;f++) {
      g = b.tables[f];
      e = new V(a.url + "/" + g.id);
      v(g, e);
      d.push(e)
    }
  }
  f = 0;
  for(j = c.length;f < j;f++) {
    e = c[f];
    if(e.subLayerIds) {
      e.v = [];
      d = 0;
      for(g = e.subLayerIds.length;d < g;d++) {
        var h;
        a: {
          h = e.subLayerIds[d];
          var l = a.layers;
          if(l) {
            for(var o = 0, ba = l.length;o < ba;o++) {
              if(h === l[o].id) {
                h = l[o];
                break a
              }
              if(h && typeof h === "string" && l[o].name.toLowerCase() === h.toLowerCase()) {
                h = l[o];
                break a
              }
            }
          }
          h = null
        }
        e.v.push(h);
        h.ea = e
      }
    }
  }
  a.r = true;
  w(a, "load")
}
function ca(a) {
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
function da(a) {
  var b = [];
  if(a.layers) {
    var c, d, e;
    d = 0;
    for(e = a.layers.length;d < e;d++) {
      c = a.layers[d];
      if(c.v) {
        for(var f = 0, j = c.v.length;f < j;f++) {
          if(c.v[f].visible === false) {
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
function ea(a, b, c, d) {
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
      f = ca(a)
    }
    e.layerDefs = z(f);
    f = b.layerIds;
    var j = b.layerOption || "show";
    if(f === undefined) {
      f = da(a)
    }
    if(f.length > 0) {
      e.layers = j + ":" + f.join(",")
    }else {
      if(a.r && c) {
        c({href:null});
        return
      }
    }
    e.transparent = b.transparent === false ? false : true;
    if(b.time) {
      e.time = x(b.time, b.$)
    }
    e.V = b.V;
    if(e.f === "image") {
      return a.url + "/export?" + K(e)
    }else {
      L(a.url + "/export", e, "", function(g) {
        if(g.extent) {
          var h, l = g.extent, o = s[l.spatialReference.wkid || l.spatialReference.wkt];
          o = o || n;
          h = o.k([l.xmin, l.ymin]);
          l = o.k([l.xmax, l.ymax]);
          h = new m.LatLngBounds(new m.LatLng(h[1], h[0]), new m.LatLng(l[1], l[0]));
          g.bounds = h;
          delete g.extent;
          c(g)
        }else {
          g = g.error;
          d && g && g.error && d(g.error)
        }
      })
    }
  }
}
function Y(a) {
  this.W = a ? a.lods : null;
  this.H = a ? s[a.spatialReference.wkid || a.spatialReference.wkt] : q;
  if(!this.H) {
    throw new Error("unsupported Spatial Reference");
  }
  this.R = a ? a.lods[0].resolution : 156543.033928;
  this.minZoom = Math.floor(Math.log(this.H.j() / this.R / 256) / Math.LN2 + 0.5);
  this.maxZoom = a ? this.minZoom + this.W.length - 1 : 20;
  if(m.Size) {
    this.ha = a ? new m.Size(a.cols, a.rows) : new m.Size(256, 256)
  }
  this.ga = Math.pow(2, this.minZoom) * this.R;
  this.ca = a ? a.origin.x : -2.0037508342787E7;
  this.da = a ? a.origin.y : 2.0037508342787E7;
  if(a) {
    for(var b, c = 0;c < a.lods.length - 1;c++) {
      b = a.lods[c].resolution / a.lods[c + 1].resolution;
      if(b > 2.001 || b < 1.999) {
        throw new Error("This type of map cache is not supported in V3. \nScale ratio between zoom levels must be 2");
      }
    }
  }
}
new Y;
function Z(a, b) {
  b = b || {};
  this.X = a instanceof W ? a : new W(a);
  this.t = b.opacity || 1;
  this.U = b.aa || {};
  this.s = this.p = false;
  this.e = null;
  b.map && this.setMap(b.map)
}
Z.prototype = new m.OverlayView;
Z.prototype.onAdd = function() {
  var a = document.createElement("div");
  a.style.position = "absolute";
  a.style.border = "none";
  this.e = a;
  this.getPanes().overlayLayer.appendChild(a);
  this.t && y(a, this.t);
  var b = this;
  this.T = m.event.addListener(this.getMap(), "bounds_changed", function() {
    $(b)
  })
};
Z.prototype.onAdd = Z.prototype.onAdd;
Z.prototype.onRemove = function() {
  m.event.removeListener(this.T);
  this.e.parentNode.removeChild(this.e);
  this.e = null
};
Z.prototype.onRemove = Z.prototype.onRemove;
Z.prototype.draw = function() {
  if(!this.p || this.s === true) {
    $(this)
  }
};
Z.prototype.draw = Z.prototype.draw;
function $(a) {
  if(a.p === true) {
    a.s = true
  }else {
    var b = a.getMap(), c = b ? b.getBounds() : null;
    if(c) {
      var d = a.U;
      d.bounds = c;
      c = q;
      var e = b.getDiv();
      d.width = e.offsetWidth;
      d.height = e.offsetHeight;
      if((b = b.getProjection()) && b instanceof Y) {
        c = b.H
      }
      d.imageSR = c;
      w(a, "drawstart");
      a.p = true;
      a.e.style.backgroundImage = "";
      ea(a.X, d, function(f) {
        a.p = false;
        if(a.s === true) {
          a.s = false;
          $(a)
        }else {
          if(f.href) {
            var j = a.getProjection(), g = f.bounds, h = j.fromLatLngToDivPixel(g.getSouthWest());
            j = j.fromLatLngToDivPixel(g.getNorthEast());
            g = a.e;
            g.style.left = h.x + "px";
            g.style.top = j.y + "px";
            g.style.width = j.x - h.x + "px";
            g.style.height = h.y - j.y + "px";
            a.e.style.backgroundImage = "url(" + f.href + ")";
            f = Math.min(Math.max(a.t, 0), 1);
            a.t = f;
            y(a.e, f)
          }
          w(a, "drawend")
        }
      })
    }
  }
}
;window.onload = function() {
  var a = {zoom:4, center:new google.maps.LatLng(40, -100), mapTypeId:google.maps.MapTypeId.ROADMAP, streetViewControl:true};
  a = new google.maps.Map(document.getElementById("map_canvas"), a);
  (new Z("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer")).setMap(a)
};})()

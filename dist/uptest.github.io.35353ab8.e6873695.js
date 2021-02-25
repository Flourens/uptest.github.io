// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"147cbb8ff972880d7683346f6de03848":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "e68736951adc6acc417fa8da0b5385ae";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"e19e331ef1f0b227ca95cc1a8d421045":[function(require,module,exports) {
!function () {
  var t,
      e = !1;

  function r() {
    var r, n;
    return e || (e = !0,
    /*!
     * ScrollMagic v2.0.8 (2020-08-14)
     * The javascript library for magical scroll interactions.
     * (c) 2020 Jan Paepke (@janpaepke)
     * Project Website: http://scrollmagic.io
     * 
     * @version 2.0.8
     * @license Dual licensed under MIT license and GPL.
     * @author Jan Paepke - e-mail@janpaepke.de
     *
     * @file ScrollMagic main library.
     */
    r = t = {}, n = function () {
      var t = function () {
        n.log(2, "(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use 'new ScrollMagic.Controller()' to create a new controller instance. Use 'new ScrollMagic.Scene()' to instance a scene.");
      };

      t.version = "2.0.8", "undefined" != typeof window && window.addEventListener("mousewheel", void 0), t.Controller = function (r) {
        var i,
            o,
            s = "ScrollMagic.Controller",
            a = e.defaults,
            l = this,
            u = n.extend({}, a, r),
            c = [],
            f = !1,
            h = 0,
            d = "PAUSED",
            p = !0,
            g = 0,
            m = !0,
            _ = function () {
          u.refreshInterval > 0 && (o = window.setTimeout(S, u.refreshInterval));
        },
            v = function () {
          return u.vertical ? n.get.scrollTop(u.container) : n.get.scrollLeft(u.container);
        },
            y = function () {
          return u.vertical ? n.get.height(u.container) : n.get.width(u.container);
        },
            w = this._setScrollPos = function (t) {
          u.vertical ? p ? window.scrollTo(n.get.scrollLeft(), t) : u.container.scrollTop = t : p ? window.scrollTo(t, n.get.scrollTop()) : u.container.scrollLeft = t;
        },
            b = function () {
          if (m && f) {
            var t = n.type.Array(f) ? f : c.slice(0);
            f = !1;
            var e = h,
                r = (h = l.scrollPos()) - e;
            0 !== r && (d = r > 0 ? "FORWARD" : "REVERSE"), "REVERSE" === d && t.reverse(), t.forEach(function (e, r) {
              C(3, "updating Scene " + (r + 1) + "/" + t.length + " (" + c.length + " total)"), e.update(!0);
            }), 0 === t.length && u.loglevel >= 3 && C(3, "updating 0 Scenes (nothing added to controller)");
          }
        },
            T = function () {
          i = n.rAF(b);
        },
            x = function (t) {
          C(3, "event fired causing an update:", t.type), "resize" == t.type && (g = y(), d = "PAUSED"), !0 !== f && (f = !0, T());
        },
            S = function () {
          if (!p && g != y()) {
            var t;

            try {
              t = new Event("resize", {
                bubbles: !1,
                cancelable: !1
              });
            } catch (e) {
              (t = document.createEvent("Event")).initEvent("resize", !1, !1);
            }

            u.container.dispatchEvent(t);
          }

          c.forEach(function (t, e) {
            t.refresh();
          }), _();
        },
            C = this._log = function (t, e) {
          u.loglevel >= t && (Array.prototype.splice.call(arguments, 1, 0, "(" + s + ") ->"), n.log.apply(window, arguments));
        };

        this._options = u;

        var E = function (t) {
          if (t.length <= 1) return t;
          var e = t.slice(0);
          return e.sort(function (t, e) {
            return t.scrollOffset() > e.scrollOffset() ? 1 : -1;
          }), e;
        };

        return this.addScene = function (e) {
          if (n.type.Array(e)) e.forEach(function (t, e) {
            l.addScene(t);
          });else if (e instanceof t.Scene) {
            if (e.controller() !== l) e.addTo(l);else if (c.indexOf(e) < 0) {
              for (var r in c.push(e), c = E(c), e.on("shift.controller_sort", function () {
                c = E(c);
              }), u.globalSceneOptions) e[r] && e[r].call(e, u.globalSceneOptions[r]);

              C(3, "adding Scene (now " + c.length + " total)");
            }
          } else C(1, "ERROR: invalid argument supplied for '.addScene()'");
          return l;
        }, this.removeScene = function (t) {
          if (n.type.Array(t)) t.forEach(function (t, e) {
            l.removeScene(t);
          });else {
            var e = c.indexOf(t);
            e > -1 && (t.off("shift.controller_sort"), c.splice(e, 1), C(3, "removing Scene (now " + c.length + " left)"), t.remove());
          }
          return l;
        }, this.updateScene = function (e, r) {
          return n.type.Array(e) ? e.forEach(function (t, e) {
            l.updateScene(t, r);
          }) : r ? e.update(!0) : !0 !== f && e instanceof t.Scene && (-1 == (f = f || []).indexOf(e) && f.push(e), f = E(f), T()), l;
        }, this.update = function (t) {
          return x({
            type: "resize"
          }), t && b(), l;
        }, this.scrollTo = function (e, r) {
          if (n.type.Number(e)) w.call(u.container, e, r);else if (e instanceof t.Scene) e.controller() === l ? l.scrollTo(e.scrollOffset(), r) : C(2, "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.", e);else if (n.type.Function(e)) w = e;else {
            var i = n.get.elements(e)[0];

            if (i) {
              for (; i.parentNode.hasAttribute("data-scrollmagic-pin-spacer");) i = i.parentNode;

              var o = u.vertical ? "top" : "left",
                  s = n.get.offset(u.container),
                  a = n.get.offset(i);
              p || (s[o] -= l.scrollPos()), l.scrollTo(a[o] - s[o], r);
            } else C(2, "scrollTo(): The supplied argument is invalid. Scroll cancelled.", e);
          }
          return l;
        }, this.scrollPos = function (t) {
          return arguments.length ? (n.type.Function(t) ? v = t : C(2, "Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'."), l) : v.call(l);
        }, this.info = function (t) {
          var e = {
            size: g,
            vertical: u.vertical,
            scrollPos: h,
            scrollDirection: d,
            container: u.container,
            isDocument: p
          };
          return arguments.length ? void 0 !== e[t] ? e[t] : void C(1, 'ERROR: option "' + t + '" is not available') : e;
        }, this.loglevel = function (t) {
          return arguments.length ? (u.loglevel != t && (u.loglevel = t), l) : u.loglevel;
        }, this.enabled = function (t) {
          return arguments.length ? (m != t && (m = !!t, l.updateScene(c, !0)), l) : m;
        }, this.destroy = function (t) {
          window.clearTimeout(o);

          for (var e = c.length; e--;) c[e].destroy(t);

          return u.container.removeEventListener("resize", x), u.container.removeEventListener("scroll", x), n.cAF(i), C(3, "destroyed " + s + " (reset: " + (t ? "true" : "false") + ")"), null;
        }, function () {
          for (var e in u) a.hasOwnProperty(e) || (C(2, 'WARNING: Unknown option "' + e + '"'), delete u[e]);

          if (u.container = n.get.elements(u.container)[0], !u.container) throw C(1, "ERROR creating object " + s + ": No valid scroll container supplied"), s + " init failed.";
          (p = u.container === window || u.container === document.body || !document.body.contains(u.container)) && (u.container = window), g = y(), u.container.addEventListener("resize", x), u.container.addEventListener("scroll", x);
          var r = parseInt(u.refreshInterval, 10);
          u.refreshInterval = n.type.Number(r) ? r : a.refreshInterval, _(), C(3, "added new " + s + " controller (v" + t.version + ")");
        }(), l;
      };
      var e = {
        defaults: {
          container: window,
          vertical: !0,
          globalSceneOptions: {},
          loglevel: 2,
          refreshInterval: 100
        }
      };
      t.Controller.addOption = function (t, r) {
        e.defaults[t] = r;
      }, t.Controller.extend = function (e) {
        var r = this;
        t.Controller = function () {
          return r.apply(this, arguments), this.$super = n.extend({}, this), e.apply(this, arguments) || this;
        }, n.extend(t.Controller, r), t.Controller.prototype = r.prototype, t.Controller.prototype.constructor = t.Controller;
      }, t.Scene = function (e) {
        var i,
            o,
            s = "ScrollMagic.Scene",
            a = r.defaults,
            l = this,
            u = n.extend({}, a, e),
            c = "BEFORE",
            f = 0,
            h = {
          start: 0,
          end: 0
        },
            d = 0,
            p = !0,
            g = {};
        this.on = function (t, e) {
          return n.type.Function(e) ? (t = t.trim().split(" ")).forEach(function (t) {
            var r = t.split("."),
                n = r[0],
                i = r[1];
            "*" != n && (g[n] || (g[n] = []), g[n].push({
              namespace: i || "",
              callback: e
            }));
          }) : m(1, "ERROR when calling '.on()': Supplied callback for '" + t + "' is not a valid function!"), l;
        }, this.off = function (t, e) {
          return t ? ((t = t.trim().split(" ")).forEach(function (t, r) {
            var n = t.split("."),
                i = n[0],
                o = n[1] || "";
            ("*" === i ? Object.keys(g) : [i]).forEach(function (t) {
              for (var r = g[t] || [], n = r.length; n--;) {
                var i = r[n];
                !i || o !== i.namespace && "*" !== o || e && e != i.callback || r.splice(n, 1);
              }

              r.length || delete g[t];
            });
          }), l) : (m(1, "ERROR: Invalid event name supplied."), l);
        }, this.trigger = function (e, r) {
          if (e) {
            var n = e.trim().split("."),
                i = n[0],
                o = n[1],
                s = g[i];
            m(3, "event fired:", i, r ? "->" : "", r || ""), s && s.forEach(function (e, n) {
              o && o !== e.namespace || e.callback.call(l, new t.Event(i, e.namespace, l, r));
            });
          } else m(1, "ERROR: Invalid event name supplied.");

          return l;
        }, l.on("change.internal", function (t) {
          "loglevel" !== t.what && "tweenChanges" !== t.what && ("triggerElement" === t.what ? b() : "reverse" === t.what && l.update());
        }).on("shift.internal", function (t) {
          y(), l.update();
        });

        var m = this._log = function (t, e) {
          u.loglevel >= t && (Array.prototype.splice.call(arguments, 1, 0, "(" + s + ") ->"), n.log.apply(window, arguments));
        };

        this.addTo = function (e) {
          return e instanceof t.Controller ? o != e && (o && o.removeScene(l), o = e, S(), w(!0), b(!0), y(), o.info("container").addEventListener("resize", T), e.addScene(l), l.trigger("add", {
            controller: o
          }), m(3, "added " + s + " to controller"), l.update()) : m(1, "ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller"), l;
        }, this.enabled = function (t) {
          return arguments.length ? (p != t && (p = !!t, l.update(!0)), l) : p;
        }, this.remove = function () {
          if (o) {
            o.info("container").removeEventListener("resize", T);
            var t = o;
            o = void 0, t.removeScene(l), l.trigger("remove"), m(3, "removed " + s + " from controller");
          }

          return l;
        }, this.destroy = function (t) {
          return l.trigger("destroy", {
            reset: t
          }), l.remove(), l.off("*.*"), m(3, "destroyed " + s + " (reset: " + (t ? "true" : "false") + ")"), null;
        }, this.update = function (t) {
          if (o) if (t) {
            if (o.enabled() && p) {
              var e,
                  r = o.info("scrollPos");
              e = u.duration > 0 ? (r - h.start) / (h.end - h.start) : r >= h.start ? 1 : 0, l.trigger("update", {
                startPos: h.start,
                endPos: h.end,
                scrollPos: r
              }), l.progress(e);
            } else _ && "DURING" === c && O(!0);
          } else o.updateScene(l, !1);
          return l;
        }, this.refresh = function () {
          return w(), b(), l;
        }, this.progress = function (t) {
          if (arguments.length) {
            var e = !1,
                r = c,
                n = o ? o.info("scrollDirection") : "PAUSED",
                i = u.reverse || t >= f;

            if (0 === u.duration ? (e = f != t, c = 0 == (f = t < 1 && i ? 0 : 1) ? "BEFORE" : "DURING") : t < 0 && "BEFORE" !== c && i ? (f = 0, c = "BEFORE", e = !0) : t >= 0 && t < 1 && i ? (f = t, c = "DURING", e = !0) : t >= 1 && "AFTER" !== c ? (f = 1, c = "AFTER", e = !0) : "DURING" !== c || i || O(), e) {
              var s = {
                progress: f,
                state: c,
                scrollDirection: n
              },
                  a = c != r,
                  h = function (t) {
                l.trigger(t, s);
              };

              a && "DURING" !== r && (h("enter"), h("BEFORE" === r ? "start" : "end")), h("progress"), a && "DURING" !== c && (h("BEFORE" === c ? "start" : "end"), h("leave"));
            }

            return l;
          }

          return f;
        };

        var _,
            v,
            y = function () {
          h = {
            start: d + u.offset
          }, o && u.triggerElement && (h.start -= o.info("size") * u.triggerHook), h.end = h.start + u.duration;
        },
            w = function (t) {
          i && C("duration", i.call(l)) && !t && (l.trigger("change", {
            what: "duration",
            newval: u.duration
          }), l.trigger("shift", {
            reason: "duration"
          }));
        },
            b = function (t) {
          var e = 0,
              r = u.triggerElement;

          if (o && (r || d > 0)) {
            if (r) if (r.parentNode) {
              for (var i = o.info(), s = n.get.offset(i.container), a = i.vertical ? "top" : "left"; r.parentNode.hasAttribute("data-scrollmagic-pin-spacer");) r = r.parentNode;

              var c = n.get.offset(r);
              i.isDocument || (s[a] -= o.scrollPos()), e = c[a] - s[a];
            } else m(2, "WARNING: triggerElement was removed from DOM and will be reset to", void 0), l.triggerElement(void 0);
            var f = e != d;
            d = e, f && !t && l.trigger("shift", {
              reason: "triggerElementPosition"
            });
          }
        },
            T = function (t) {
          u.triggerHook > 0 && l.trigger("shift", {
            reason: "containerResize"
          });
        },
            x = n.extend(r.validate, {
          duration: function (t) {
            if (n.type.String(t) && t.match(/^(\.|\d)*\d+%$/)) {
              var e = parseFloat(t) / 100;

              t = function () {
                return o ? o.info("size") * e : 0;
              };
            }

            if (n.type.Function(t)) {
              i = t;

              try {
                t = parseFloat(i.call(l));
              } catch (e) {
                t = -1;
              }
            }

            if (t = parseFloat(t), !n.type.Number(t) || t < 0) throw i ? (i = void 0, ['Invalid return value of supplied function for option "duration":', t]) : ['Invalid value for option "duration":', t];
            return t;
          }
        }),
            S = function (t) {
          (t = arguments.length ? [t] : Object.keys(x)).forEach(function (t, e) {
            var r;
            if (x[t]) try {
              r = x[t](u[t]);
            } catch (e) {
              r = a[t];
              var i = n.type.String(e) ? [e] : e;
              n.type.Array(i) ? (i[0] = "ERROR: " + i[0], i.unshift(1), m.apply(this, i)) : m(1, "ERROR: Problem executing validation callback for option '" + t + "':", e.message);
            } finally {
              u[t] = r;
            }
          });
        },
            C = function (t, e) {
          var r = !1,
              n = u[t];
          return u[t] != e && (u[t] = e, S(t), r = n != u[t]), r;
        },
            E = function (t) {
          l[t] || (l[t] = function (e) {
            return arguments.length ? ("duration" === t && (i = void 0), C(t, e) && (l.trigger("change", {
              what: t,
              newval: u[t]
            }), r.shifts.indexOf(t) > -1 && l.trigger("shift", {
              reason: t
            })), l) : u[t];
          });
        };

        this.controller = function () {
          return o;
        }, this.state = function () {
          return c;
        }, this.scrollOffset = function () {
          return h.start;
        }, this.triggerPosition = function () {
          var t = u.offset;
          return o && (u.triggerElement ? t += d : t += o.info("size") * l.triggerHook()), t;
        }, l.on("shift.internal", function (t) {
          var e = "duration" === t.reason;
          ("AFTER" === c && e || "DURING" === c && 0 === u.duration) && O(), e && R();
        }).on("progress.internal", function (t) {
          O();
        }).on("add.internal", function (t) {
          R();
        }).on("destroy.internal", function (t) {
          l.removePin(t.reset);
        });

        var O = function (t) {
          if (_ && o) {
            var e = o.info(),
                r = v.spacer.firstChild;

            if (t || "DURING" !== c) {
              var i = {
                position: v.inFlow ? "relative" : "absolute",
                top: 0,
                left: 0
              },
                  s = n.css(r, "position") != i.position;
              v.pushFollowers ? u.duration > 0 && ("AFTER" === c && 0 === parseFloat(n.css(v.spacer, "padding-top")) || "BEFORE" === c && 0 === parseFloat(n.css(v.spacer, "padding-bottom"))) && (s = !0) : i[e.vertical ? "top" : "left"] = u.duration * f, n.css(r, i), s && R();
            } else {
              "fixed" != n.css(r, "position") && (n.css(r, {
                position: "fixed"
              }), R());
              var a = n.get.offset(v.spacer, !0),
                  l = u.reverse || 0 === u.duration ? e.scrollPos - h.start : Math.round(f * u.duration * 10) / 10;
              a[e.vertical ? "top" : "left"] += l, n.css(v.spacer.firstChild, {
                top: a.top,
                left: a.left
              });
            }
          }
        },
            R = function () {
          if (_ && o && v.inFlow) {
            var t = "DURING" === c,
                e = o.info("vertical"),
                r = v.spacer.firstChild,
                i = n.isMarginCollapseType(n.css(v.spacer, "display")),
                s = {};
            v.relSize.width || v.relSize.autoFullWidth ? t ? n.css(_, {
              width: n.get.width(v.spacer)
            }) : n.css(_, {
              width: "100%"
            }) : (s["min-width"] = n.get.width(e ? _ : r, !0, !0), s.width = t ? s["min-width"] : "auto"), v.relSize.height ? t ? n.css(_, {
              height: n.get.height(v.spacer) - (v.pushFollowers ? u.duration : 0)
            }) : n.css(_, {
              height: "100%"
            }) : (s["min-height"] = n.get.height(e ? r : _, !0, !i), s.height = t ? s["min-height"] : "auto"), v.pushFollowers && (s["padding" + (e ? "Top" : "Left")] = u.duration * f, s["padding" + (e ? "Bottom" : "Right")] = u.duration * (1 - f)), n.css(v.spacer, s);
          }
        },
            k = function () {
          o && _ && "DURING" === c && !o.info("isDocument") && O();
        },
            M = function () {
          o && _ && "DURING" === c && ((v.relSize.width || v.relSize.autoFullWidth) && n.get.width(window) != n.get.width(v.spacer.parentNode) || v.relSize.height && n.get.height(window) != n.get.height(v.spacer.parentNode)) && R();
        },
            A = function (t) {
          o && _ && "DURING" === c && !o.info("isDocument") && (t.preventDefault(), o._setScrollPos(o.info("scrollPos") - ((t.wheelDelta || t[o.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -t.detail)));
        };

        this.setPin = function (t, e) {
          var r = e && e.hasOwnProperty("pushFollowers");
          if (e = n.extend({}, {
            pushFollowers: !0,
            spacerClass: "scrollmagic-pin-spacer"
          }, e), !(t = n.get.elements(t)[0])) return m(1, "ERROR calling method 'setPin()': Invalid pin element supplied."), l;
          if ("fixed" === n.css(t, "position")) return m(1, "ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'."), l;

          if (_) {
            if (_ === t) return l;
            l.removePin();
          }

          var i = (_ = t).parentNode.style.display,
              o = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
          _.parentNode.style.display = "none";
          var s = "absolute" != n.css(_, "position"),
              a = n.css(_, o.concat(["display"])),
              c = n.css(_, ["width", "height"]);
          _.parentNode.style.display = i, !s && e.pushFollowers && (m(2, "WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled."), e.pushFollowers = !1), window.setTimeout(function () {
            _ && 0 === u.duration && r && e.pushFollowers && m(2, "WARNING: pushFollowers =", !0, "has no effect, when scene duration is 0.");
          }, 0);

          var f = _.parentNode.insertBefore(document.createElement("div"), _),
              h = n.extend(a, {
            position: s ? "relative" : "absolute",
            boxSizing: "content-box",
            mozBoxSizing: "content-box",
            webkitBoxSizing: "content-box"
          });

          if (s || n.extend(h, n.css(_, ["width", "height"])), n.css(f, h), f.setAttribute("data-scrollmagic-pin-spacer", ""), n.addClass(f, e.spacerClass), v = {
            spacer: f,
            relSize: {
              width: "%" === c.width.slice(-1),
              height: "%" === c.height.slice(-1),
              autoFullWidth: "auto" === c.width && s && n.isMarginCollapseType(a.display)
            },
            pushFollowers: e.pushFollowers,
            inFlow: s
          }, !_.___origStyle) {
            _.___origStyle = {};
            var d = _.style;
            o.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]).forEach(function (t) {
              _.___origStyle[t] = d[t] || "";
            });
          }

          return v.relSize.width && n.css(f, {
            width: c.width
          }), v.relSize.height && n.css(f, {
            height: c.height
          }), f.appendChild(_), n.css(_, {
            position: s ? "relative" : "absolute",
            margin: "auto",
            top: "auto",
            left: "auto",
            bottom: "auto",
            right: "auto"
          }), (v.relSize.width || v.relSize.autoFullWidth) && n.css(_, {
            boxSizing: "border-box",
            mozBoxSizing: "border-box",
            webkitBoxSizing: "border-box"
          }), window.addEventListener("scroll", k), window.addEventListener("resize", k), window.addEventListener("resize", M), _.addEventListener("mousewheel", A), _.addEventListener("DOMMouseScroll", A), m(3, "added pin"), O(), l;
        }, this.removePin = function (t) {
          if (_) {
            if ("DURING" === c && O(!0), t || !o) {
              var e = v.spacer.firstChild;

              if (e.hasAttribute("data-scrollmagic-pin-spacer")) {
                var r = v.spacer.style,
                    i = {};
                ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"].forEach(function (t) {
                  i[t] = r[t] || "";
                }), n.css(e, i);
              }

              v.spacer.parentNode.insertBefore(e, v.spacer), v.spacer.parentNode.removeChild(v.spacer), _.parentNode.hasAttribute("data-scrollmagic-pin-spacer") || (n.css(_, _.___origStyle), delete _.___origStyle);
            }

            window.removeEventListener("scroll", k), window.removeEventListener("resize", k), window.removeEventListener("resize", M), _.removeEventListener("mousewheel", A), _.removeEventListener("DOMMouseScroll", A), _ = void 0, m(3, "removed pin (reset: " + (t ? "true" : "false") + ")");
          }

          return l;
        };
        var P,
            D = [];
        return l.on("destroy.internal", function (t) {
          l.removeClassToggle(t.reset);
        }), this.setClassToggle = function (t, e) {
          var r = n.get.elements(t);
          return 0 !== r.length && n.type.String(e) ? (D.length > 0 && l.removeClassToggle(), P = e, D = r, l.on("enter.internal_class leave.internal_class", function (t) {
            var e = "enter" === t.type ? n.addClass : n.removeClass;
            D.forEach(function (t, r) {
              e(t, P);
            });
          }), l) : (m(1, "ERROR calling method 'setClassToggle()': Invalid " + (0 === r.length ? "element" : "classes") + " supplied."), l);
        }, this.removeClassToggle = function (t) {
          return t && D.forEach(function (t, e) {
            n.removeClass(t, P);
          }), l.off("start.internal_class end.internal_class"), P = void 0, D = [], l;
        }, function () {
          for (var t in u) a.hasOwnProperty(t) || (m(2, 'WARNING: Unknown option "' + t + '"'), delete u[t]);

          for (var e in a) E(e);

          S();
        }(), l;
      };
      var r = {
        defaults: {
          duration: 0,
          offset: 0,
          triggerElement: void 0,
          triggerHook: .5,
          reverse: !0,
          loglevel: 2
        },
        validate: {
          offset: function (t) {
            if (t = parseFloat(t), !n.type.Number(t)) throw ['Invalid value for option "offset":', t];
            return t;
          },
          triggerElement: function (t) {
            if (t = t || void 0) {
              var e = n.get.elements(t)[0];
              if (!e || !e.parentNode) throw ['Element defined in option "triggerElement" was not found:', t];
              t = e;
            }

            return t;
          },
          triggerHook: function (t) {
            var e = {
              onCenter: .5,
              onEnter: 1,
              onLeave: 0
            };
            if (n.type.Number(t)) t = Math.max(0, Math.min(parseFloat(t), 1));else {
              if (!(t in e)) throw ['Invalid value for option "triggerHook": ', t];
              t = e[t];
            }
            return t;
          },
          reverse: function (t) {
            return !!t;
          },
          loglevel: function (t) {
            if (t = parseInt(t), !n.type.Number(t) || t < 0 || t > 3) throw ['Invalid value for option "loglevel":', t];
            return t;
          }
        },
        shifts: ["duration", "offset", "triggerHook"]
      };
      t.Scene.addOption = function (e, n, i, o) {
        e in r.defaults ? t._util.log(1, "[static] ScrollMagic.Scene -> Cannot add Scene option '" + e + "', because it already exists.") : (r.defaults[e] = n, r.validate[e] = i, o && r.shifts.push(e));
      }, t.Scene.extend = function (e) {
        var r = this;
        t.Scene = function () {
          return r.apply(this, arguments), this.$super = n.extend({}, this), e.apply(this, arguments) || this;
        }, n.extend(t.Scene, r), t.Scene.prototype = r.prototype, t.Scene.prototype.constructor = t.Scene;
      }, t.Event = function (t, e, r, n) {
        for (var i in n = n || {}) this[i] = n[i];

        return this.type = t, this.target = this.currentTarget = r, this.namespace = e || "", this.timeStamp = this.timestamp = Date.now(), this;
      };

      var n = t._util = function (t) {
        var e,
            r = {},
            n = function (t) {
          return parseFloat(t) || 0;
        },
            i = function (e) {
          return e.currentStyle ? e.currentStyle : t.getComputedStyle(e);
        },
            o = function (e, r, o, s) {
          if ((r = r === document ? t : r) === t) s = !1;else if (!p.DomElement(r)) return 0;
          e = e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
          var a = (o ? r["offset" + e] || r["outer" + e] : r["client" + e] || r["inner" + e]) || 0;

          if (o && s) {
            var l = i(r);
            a += "Height" === e ? n(l.marginTop) + n(l.marginBottom) : n(l.marginLeft) + n(l.marginRight);
          }

          return a;
        },
            s = function (t) {
          return t.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function (t) {
            return t[1].toUpperCase();
          });
        };

        r.extend = function (t) {
          for (t = t || {}, e = 1; e < arguments.length; e++) if (arguments[e]) for (var r in arguments[e]) arguments[e].hasOwnProperty(r) && (t[r] = arguments[e][r]);

          return t;
        }, r.isMarginCollapseType = function (t) {
          return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(t) > -1;
        };
        var a = 0,
            l = ["ms", "moz", "webkit", "o"],
            u = t.requestAnimationFrame,
            c = t.cancelAnimationFrame;

        for (e = 0; !u && e < l.length; ++e) u = t[l[e] + "RequestAnimationFrame"], c = t[l[e] + "CancelAnimationFrame"] || t[l[e] + "CancelRequestAnimationFrame"];

        u || (u = function (e) {
          var r = new Date().getTime(),
              n = Math.max(0, 16 - (r - a)),
              i = t.setTimeout(function () {
            e(r + n);
          }, n);
          return a = r + n, i;
        }), c || (c = function (e) {
          t.clearTimeout(e);
        }), r.rAF = u.bind(t), r.cAF = c.bind(t);
        var f = ["error", "warn", "log"],
            h = t.console || {};

        for (h.log = h.log || function () {}, e = 0; e < f.length; e++) {
          var d = f[e];
          h[d] || (h[d] = h.log);
        }

        r.log = function (t) {
          (t > f.length || t <= 0) && (t = f.length);
          var e = new Date(),
              r = ("0" + e.getHours()).slice(-2) + ":" + ("0" + e.getMinutes()).slice(-2) + ":" + ("0" + e.getSeconds()).slice(-2) + ":" + ("00" + e.getMilliseconds()).slice(-3),
              n = f[t - 1],
              i = Array.prototype.splice.call(arguments, 1),
              o = Function.prototype.bind.call(h[n], h);
          i.unshift(r), o.apply(h, i);
        };

        var p = r.type = function (t) {
          return Object.prototype.toString.call(t).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
        };

        p.String = function (t) {
          return "string" === p(t);
        }, p.Function = function (t) {
          return "function" === p(t);
        }, p.Array = function (t) {
          return Array.isArray(t);
        }, p.Number = function (t) {
          return !p.Array(t) && t - parseFloat(t) + 1 >= 0;
        }, p.DomElement = function (t) {
          return "object" == typeof HTMLElement || "function" == typeof HTMLElement ? t instanceof HTMLElement || t instanceof SVGElement : t && "object" == typeof t && null !== t && 1 === t.nodeType && "string" == typeof t.nodeName;
        };
        var g = r.get = {};
        return g.elements = function (e) {
          var r = [];
          if (p.String(e)) try {
            e = document.querySelectorAll(e);
          } catch (t) {
            return r;
          }
          if ("nodelist" === p(e) || p.Array(e) || e instanceof NodeList) for (var n = 0, i = r.length = e.length; n < i; n++) {
            var o = e[n];
            r[n] = p.DomElement(o) ? o : g.elements(o);
          } else (p.DomElement(e) || e === document || e === t) && (r = [e]);
          return r;
        }, g.scrollTop = function (e) {
          return e && "number" == typeof e.scrollTop ? e.scrollTop : t.pageYOffset || 0;
        }, g.scrollLeft = function (e) {
          return e && "number" == typeof e.scrollLeft ? e.scrollLeft : t.pageXOffset || 0;
        }, g.width = function (t, e, r) {
          return o("width", t, e, r);
        }, g.height = function (t, e, r) {
          return o("height", t, e, r);
        }, g.offset = function (t, e) {
          var r = {
            top: 0,
            left: 0
          };

          if (t && t.getBoundingClientRect) {
            var n = t.getBoundingClientRect();
            r.top = n.top, r.left = n.left, e || (r.top += g.scrollTop(), r.left += g.scrollLeft());
          }

          return r;
        }, r.addClass = function (t, e) {
          e && (t.classList ? t.classList.add(e) : t.className += " " + e);
        }, r.removeClass = function (t, e) {
          e && (t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " "));
        }, r.css = function (t, e) {
          if (p.String(e)) return i(t)[s(e)];

          if (p.Array(e)) {
            var r = {},
                n = i(t);
            return e.forEach(function (t, e) {
              r[t] = n[s(t)];
            }), r;
          }

          for (var o in e) {
            var a = e[o];
            a == parseFloat(a) && (a += "px"), t.style[s(o)] = a;
          }
        }, r;
      }(window || {});

      return t.Scene.prototype.addIndicators = function () {
        return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"), this;
      }, t.Scene.prototype.removeIndicators = function () {
        return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"), this;
      }, t.Scene.prototype.setTween = function () {
        return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"), this;
      }, t.Scene.prototype.removeTween = function () {
        return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"), this;
      }, t.Scene.prototype.setVelocity = function () {
        return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"), this;
      }, t.Scene.prototype.removeVelocity = function () {
        return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"), this;
      }, t;
    }, "object" == typeof t ? t = n() : r.ScrollMagic = n()), t;
  }

  function n(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
    }
  }

  r();

  var i = function () {
    function t(e) {
      !function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, t), this.table = e, this.groups = $(this.table).find("div[data-group]"), this.targetGroup = null;
    }

    var e, r, i;
    return e = t, (r = [{
      key: "getGroup",
      value: function (t) {
        return $(this.table).find("div[data-group=".concat(t, "]"));
      }
    }, {
      key: "selectGroup",
      value: function (t) {
        for (var e = 0; e < t.length; e++) this.targetGroup = this.getGroup(t[e]), this.targetGroup.toggleClass("active");
      }
    }]) && n(e.prototype, r), i && n(e, i), t;
  }();

  function o(t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }

  function s(t, e) {
    t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;
  }
  /*!
   * GSAP 3.6.0
   * https://greensock.com
   *
   * @license Copyright 2008-2021, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  */


  var a,
      l,
      u,
      c,
      f,
      h,
      d,
      p,
      g,
      m,
      _,
      v,
      y,
      w,
      b,
      T,
      x,
      S,
      C,
      E,
      O,
      R,
      k,
      M,
      A,
      P,
      D,
      z,
      F = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  },
      I = {
    duration: .5,
    overwrite: !1,
    delay: 0
  },
      L = 2 * Math.PI,
      G = L / 4,
      N = 0,
      B = Math.sqrt,
      U = Math.cos,
      j = Math.sin,
      H = function (t) {
    return "string" == typeof t;
  },
      Y = function (t) {
    return "function" == typeof t;
  },
      X = function (t) {
    return "number" == typeof t;
  },
      q = function (t) {
    return void 0 === t;
  },
      V = function (t) {
    return "object" == typeof t;
  },
      W = function (t) {
    return !1 !== t;
  },
      Q = function () {
    return "undefined" != typeof window;
  },
      Z = function (t) {
    return Y(t) || H(t);
  },
      J = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function () {},
      K = Array.isArray,
      tt = /(?:-?\.?\d|\.)+/gi,
      et = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
      rt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
      nt = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
      it = /[+-]=-?[.\d]+/,
      ot = /[#\-+.]*\b[a-z\d-=+%.]+/gi,
      st = /[\d.+\-=]+(?:e[-+]\d*)*/i,
      at = {},
      lt = {},
      ut = function (t) {
    return (lt = Ft(t, at)) && mr;
  },
      ct = function (t, e) {
    return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
  },
      ft = function (t, e) {
    return !e && console.warn(t);
  },
      ht = function (t, e) {
    return t && (at[t] = e) && lt && (lt[t] = e) || at;
  },
      dt = function () {
    return 0;
  },
      pt = {},
      gt = [],
      mt = {},
      _t = {},
      vt = {},
      yt = 30,
      wt = [],
      bt = "",
      Tt = function (t) {
    var e,
        r,
        n = t[0];

    if (V(n) || Y(n) || (t = [t]), !(e = (n._gsap || {}).harness)) {
      for (r = wt.length; r-- && !wt[r].targetTest(n););

      e = wt[r];
    }

    for (r = t.length; r--;) t[r] && (t[r]._gsap || (t[r]._gsap = new Ue(t[r], e))) || t.splice(r, 1);

    return t;
  },
      xt = function (t) {
    return t._gsap || Tt(ae(t))[0]._gsap;
  },
      St = function (t, e, r) {
    return (r = t[e]) && Y(r) ? t[e]() : q(r) && t.getAttribute && t.getAttribute(e) || r;
  },
      Ct = function (t, e) {
    return (t = t.split(",")).forEach(e) || t;
  },
      Et = function (t) {
    return Math.round(1e5 * t) / 1e5 || 0;
  },
      Ot = function (t, e) {
    for (var r = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < r;);

    return n < r;
  },
      Rt = function (t, e, r) {
    var n,
        i = X(t[1]),
        o = (i ? 2 : 1) + (e < 2 ? 0 : 1),
        s = t[o];

    if (i && (s.duration = t[1]), s.parent = r, e) {
      for (n = s; r && !("immediateRender" in n);) n = r.vars.defaults || {}, r = W(r.vars.inherit) && r.parent;

      s.immediateRender = W(n.immediateRender), e < 2 ? s.runBackwards = 1 : s.startAt = t[o - 1];
    }

    return s;
  },
      kt = function () {
    var t,
        e,
        r = gt.length,
        n = gt.slice(0);

    for (mt = {}, gt.length = 0, t = 0; t < r; t++) (e = n[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
  },
      Mt = function (t, e, r, n) {
    gt.length && kt(), t.render(e, r, n), gt.length && kt();
  },
      At = function (t) {
    var e = parseFloat(t);
    return (e || 0 === e) && (t + "").match(ot).length < 2 ? e : H(t) ? t.trim() : t;
  },
      Pt = function (t) {
    return t;
  },
      Dt = function (t, e) {
    for (var r in e) r in t || (t[r] = e[r]);

    return t;
  },
      zt = function (t, e) {
    for (var r in e) r in t || "duration" === r || "ease" === r || (t[r] = e[r]);
  },
      Ft = function (t, e) {
    for (var r in e) t[r] = e[r];

    return t;
  },
      It = function t(e, r) {
    for (var n in r) "__proto__" !== n && "constructor" !== n && "prototype" !== n && (e[n] = V(r[n]) ? t(e[n] || (e[n] = {}), r[n]) : r[n]);

    return e;
  },
      Lt = function (t, e) {
    var r,
        n = {};

    for (r in t) r in e || (n[r] = t[r]);

    return n;
  },
      Gt = function (t) {
    var e = t.parent || l,
        r = t.keyframes ? zt : Dt;
    if (W(t.inherit)) for (; e;) r(t, e.vars.defaults), e = e.parent || e._dp;
    return t;
  },
      Nt = function (t, e, r, n) {
    void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
    var i = e._prev,
        o = e._next;
    i ? i._next = o : t[r] === e && (t[r] = o), o ? o._prev = i : t[n] === e && (t[n] = i), e._next = e._prev = e.parent = null;
  },
      Bt = function (t, e) {
    t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t), t._act = 0;
  },
      Ut = function (t, e) {
    if (t && (!e || e._end > t._dur || e._start < 0)) for (var r = t; r;) r._dirty = 1, r = r.parent;
    return t;
  },
      $t = function (t) {
    for (var e = t.parent; e && e.parent;) e._dirty = 1, e.totalDuration(), e = e.parent;

    return t;
  },
      jt = function (t) {
    return t._repeat ? Ht(t._tTime, t = t.duration() + t._rDelay) * t : 0;
  },
      Ht = function (t, e) {
    var r = Math.floor(t /= e);
    return t && r === t ? r - 1 : r;
  },
      Yt = function (t, e) {
    return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
  },
      Xt = function (t) {
    return t._end = Et(t._start + (t._tDur / Math.abs(t._ts || t._rts || 1e-8) || 0));
  },
      qt = function (t, e) {
    var r = t._dp;
    return r && r.smoothChildTiming && t._ts && (t._start = Et(r._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Xt(t), r._dirty || Ut(r, t)), t;
  },
      Vt = function (t, e) {
    var r;

    if ((e._time || e._initted && !e._dur) && (r = Yt(t.rawTime(), e), (!e._dur || ne(0, e.totalDuration(), r) - e._tTime > 1e-8) && e.render(r, !0)), Ut(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
      if (t._dur < t.duration()) for (r = t; r._dp;) r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
      t._zTime = -1e-8;
    }
  },
      Wt = function (t, e, r, n) {
    return e.parent && Bt(e), e._start = Et(r + e._delay), e._end = Et(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), function (t, e, r, n, i) {
      void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
      var o,
          s = t[n];
      if (i) for (o = e[i]; s && s[i] > o;) s = s._prev;
      s ? (e._next = s._next, s._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[n] = e, e._prev = s, e.parent = e._dp = t;
    }(t, e, "_first", "_last", t._sort ? "_start" : 0), t._recent = e, n || Vt(t, e), t;
  },
      Qt = function (t, e) {
    return (at.ScrollTrigger || ct("scrollTrigger", e)) && at.ScrollTrigger.create(e, t);
  },
      Zt = function (t, e, r, n) {
    return Ve(t, e), t._initted ? !r && t._pt && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && d !== Re.frame ? (gt.push(t), t._lazy = [e, n], 1) : void 0 : 1;
  },
      Jt = function (t, e, r, n) {
    var i = t._repeat,
        o = Et(e) || 0,
        s = t._tTime / t._tDur;
    return s && !n && (t._time *= o / t._dur), t._dur = o, t._tDur = i ? i < 0 ? 1e10 : Et(o * (i + 1) + t._rDelay * i) : o, s && !n ? qt(t, t._tTime = t._tDur * s) : t.parent && Xt(t), r || Ut(t.parent, t), t;
  },
      Kt = function (t) {
    return t instanceof je ? Ut(t) : Jt(t, t._dur);
  },
      te = {
    _start: 0,
    endTime: dt
  },
      ee = function t(e, r) {
    var n,
        i,
        o = e.labels,
        s = e._recent || te,
        a = e.duration() >= 1e8 ? s.endTime(!1) : e._dur;
    return H(r) && (isNaN(r) || r in o) ? "<" === (n = r.charAt(0)) || ">" === n ? ("<" === n ? s._start : s.endTime(s._repeat >= 0)) + (parseFloat(r.substr(1)) || 0) : (n = r.indexOf("=")) < 0 ? (r in o || (o[r] = a), o[r]) : (i = +(r.charAt(n - 1) + r.substr(n + 1)), n > 1 ? t(e, r.substr(0, n - 1)) + i : a + i) : null == r ? a : +r;
  },
      re = function (t, e) {
    return t || 0 === t ? e(t) : e;
  },
      ne = function (t, e, r) {
    return r < t ? t : r > e ? e : r;
  },
      ie = function (t) {
    if ("string" != typeof t) return "";
    var e = st.exec(t);
    return e ? t.substr(e.index + e[0].length) : "";
  },
      oe = [].slice,
      se = function (t, e) {
    return t && V(t) && "length" in t && (!e && !t.length || t.length - 1 in t && V(t[0])) && !t.nodeType && t !== u;
  },
      ae = function (t, e) {
    return !H(t) || e || !c && ke() ? K(t) ? function (t, e, r) {
      return void 0 === r && (r = []), t.forEach(function (t) {
        var n;
        return H(t) && !e || se(t, 1) ? (n = r).push.apply(n, ae(t)) : r.push(t);
      }) || r;
    }(t, e) : se(t) ? oe.call(t, 0) : t ? [t] : [] : oe.call(f.querySelectorAll(t), 0);
  },
      le = function (t) {
    return t.sort(function () {
      return .5 - Math.random();
    });
  },
      ue = function (t) {
    if (Y(t)) return t;
    var e = V(t) ? t : {
      each: t
    },
        r = Ie(e.ease),
        n = e.from || 0,
        i = parseFloat(e.base) || 0,
        o = {},
        s = n > 0 && n < 1,
        a = isNaN(n) || s,
        l = e.axis,
        u = n,
        c = n;
    return H(n) ? u = c = {
      center: .5,
      edges: .5,
      end: 1
    }[n] || 0 : !s && a && (u = n[0], c = n[1]), function (t, s, f) {
      var h,
          d,
          p,
          g,
          m,
          _,
          v,
          y,
          w,
          b = (f || e).length,
          T = o[b];

      if (!T) {
        if (!(w = "auto" === e.grid ? 0 : (e.grid || [1, 1e8])[1])) {
          for (v = -1e8; v < (v = f[w++].getBoundingClientRect().left) && w < b;);

          w--;
        }

        for (T = o[b] = [], h = a ? Math.min(w, b) * u - .5 : n % w, d = a ? b * c / w - .5 : n / w | 0, v = 0, y = 1e8, _ = 0; _ < b; _++) p = _ % w - h, g = d - (_ / w | 0), T[_] = m = l ? Math.abs("y" === l ? g : p) : B(p * p + g * g), m > v && (v = m), m < y && (y = m);

        "random" === n && le(T), T.max = v - y, T.min = y, T.v = b = (parseFloat(e.amount) || parseFloat(e.each) * (w > b ? b - 1 : l ? "y" === l ? b / w : w : Math.max(w, b / w)) || 0) * ("edges" === n ? -1 : 1), T.b = b < 0 ? i - b : i, T.u = ie(e.amount || e.each) || 0, r = r && b < 0 ? ze(r) : r;
      }

      return b = (T[t] - T.min) / T.max || 0, Et(T.b + (r ? r(b) : b) * T.v) + T.u;
    };
  },
      ce = function (t) {
    var e = t < 1 ? Math.pow(10, (t + "").length - 2) : 1;
    return function (r) {
      var n = Math.round(parseFloat(r) / t) * t * e;
      return (n - n % 1) / e + (X(r) ? 0 : ie(r));
    };
  },
      fe = function (t, e) {
    var r,
        n,
        i = K(t);
    return !i && V(t) && (r = i = t.radius || 1e8, t.values ? (t = ae(t.values), (n = !X(t[0])) && (r *= r)) : t = ce(t.increment)), re(e, i ? Y(t) ? function (e) {
      return n = t(e), Math.abs(n - e) <= r ? n : e;
    } : function (e) {
      for (var i, o, s = parseFloat(n ? e.x : e), a = parseFloat(n ? e.y : 0), l = 1e8, u = 0, c = t.length; c--;) (i = n ? (i = t[c].x - s) * i + (o = t[c].y - a) * o : Math.abs(t[c] - s)) < l && (l = i, u = c);

      return u = !r || l <= r ? t[u] : e, n || u === e || X(e) ? u : u + ie(e);
    } : ce(t));
  },
      he = function (t, e, r, n) {
    return re(K(t) ? !e : !0 === r ? !!(r = 0) : !n, function () {
      return K(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + .99 * r)) / r) * r * n) / n;
    });
  },
      de = function (t, e, r) {
    return re(r, function (r) {
      return t[~~e(r)];
    });
  },
      pe = function (t) {
    for (var e, r, n, i, o = 0, s = ""; ~(e = t.indexOf("random(", o));) n = t.indexOf(")", e), i = "[" === t.charAt(e + 7), r = t.substr(e + 7, n - e - 7).match(i ? ot : tt), s += t.substr(o, e - o) + he(i ? r : +r[0], i ? 0 : +r[1], +r[2] || 1e-5), o = n + 1;

    return s + t.substr(o, t.length - o);
  },
      ge = function (t, e, r, n, i) {
    var o = e - t,
        s = n - r;
    return re(i, function (e) {
      return r + ((e - t) / o * s || 0);
    });
  },
      me = function (t, e, r) {
    var n,
        i,
        o,
        s = t.labels,
        a = 1e8;

    for (n in s) (i = s[n] - e) < 0 == !!r && i && a > (i = Math.abs(i)) && (o = n, a = i);

    return o;
  },
      _e = function (t, e, r) {
    var n,
        i,
        o = t.vars,
        s = o[e];
    if (s) return n = o[e + "Params"], i = o.callbackScope || t, r && gt.length && kt(), n ? s.apply(i, n) : s.call(i);
  },
      ve = function (t) {
    return Bt(t), t.progress() < 1 && _e(t, "onInterrupt"), t;
  },
      ye = function (t) {
    var e = (t = !t.name && t.default || t).name,
        r = Y(t),
        n = e && !r && t.init ? function () {
      this._props = [];
    } : t,
        i = {
      init: dt,
      render: ar,
      add: Xe,
      kill: ur,
      modifier: lr,
      rawVars: 0
    },
        o = {
      targetTest: 0,
      get: 0,
      getSetter: nr,
      aliases: {},
      register: 0
    };

    if (ke(), t !== n) {
      if (_t[e]) return;
      Dt(n, Dt(Lt(t, i), o)), Ft(n.prototype, Ft(i, Lt(t, o))), _t[n.prop = e] = n, t.targetTest && (wt.push(n), pt[e] = 1), e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
    }

    ht(e, n), t.register && t.register(mr, n, hr);
  },
      we = {
    aqua: [0, 255, 255],
    lime: [0, 255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, 255],
    navy: [0, 0, 128],
    white: [255, 255, 255],
    olive: [128, 128, 0],
    yellow: [255, 255, 0],
    orange: [255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [255, 0, 0],
    pink: [255, 192, 203],
    cyan: [0, 255, 255],
    transparent: [255, 255, 255, 0]
  },
      be = function (t, e, r) {
    return 255 * (6 * (t = t < 0 ? t + 1 : t > 1 ? t - 1 : t) < 1 ? e + (r - e) * t * 6 : t < .5 ? r : 3 * t < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) + .5 | 0;
  },
      Te = function (t, e, r) {
    var n,
        i,
        o,
        s,
        a,
        l,
        u,
        c,
        f,
        h,
        d = t ? X(t) ? [t >> 16, t >> 8 & 255, 255 & t] : 0 : we.black;

    if (!d) {
      if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), we[t]) d = we[t];else if ("#" === t.charAt(0)) {
        if (t.length < 6 && (n = t.charAt(1), i = t.charAt(2), o = t.charAt(3), t = "#" + n + n + i + i + o + o + (5 === t.length ? t.charAt(4) + t.charAt(4) : "")), 9 === t.length) return [(d = parseInt(t.substr(1, 6), 16)) >> 16, d >> 8 & 255, 255 & d, parseInt(t.substr(7), 16) / 255];
        d = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & 255, 255 & t];
      } else if ("hsl" === t.substr(0, 3)) {
        if (d = h = t.match(tt), e) {
          if (~t.indexOf("=")) return d = t.match(et), r && d.length < 4 && (d[3] = 1), d;
        } else s = +d[0] % 360 / 360, a = +d[1] / 100, n = 2 * (l = +d[2] / 100) - (i = l <= .5 ? l * (a + 1) : l + a - l * a), d.length > 3 && (d[3] *= 1), d[0] = be(s + 1 / 3, n, i), d[1] = be(s, n, i), d[2] = be(s - 1 / 3, n, i);
      } else d = t.match(tt) || we.transparent;
      d = d.map(Number);
    }

    return e && !h && (n = d[0] / 255, i = d[1] / 255, o = d[2] / 255, l = ((u = Math.max(n, i, o)) + (c = Math.min(n, i, o))) / 2, u === c ? s = a = 0 : (f = u - c, a = l > .5 ? f / (2 - u - c) : f / (u + c), s = u === n ? (i - o) / f + (i < o ? 6 : 0) : u === i ? (o - n) / f + 2 : (n - i) / f + 4, s *= 60), d[0] = ~~(s + .5), d[1] = ~~(100 * a + .5), d[2] = ~~(100 * l + .5)), r && d.length < 4 && (d[3] = 1), d;
  },
      xe = function (t) {
    var e = [],
        r = [],
        n = -1;
    return t.split(Ce).forEach(function (t) {
      var i = t.match(rt) || [];
      e.push.apply(e, i), r.push(n += i.length + 1);
    }), e.c = r, e;
  },
      Se = function (t, e, r) {
    var n,
        i,
        o,
        s,
        a = "",
        l = (t + a).match(Ce),
        u = e ? "hsla(" : "rgba(",
        c = 0;
    if (!l) return t;
    if (l = l.map(function (t) {
      return (t = Te(t, e, 1)) && u + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")";
    }), r && (o = xe(t), (n = r.c).join(a) !== o.c.join(a))) for (s = (i = t.replace(Ce, "1").split(rt)).length - 1; c < s; c++) a += i[c] + (~n.indexOf(c) ? l.shift() || u + "0,0,0,0)" : (o.length ? o : l.length ? l : r).shift());
    if (!i) for (s = (i = t.split(Ce)).length - 1; c < s; c++) a += i[c] + l[c];
    return a + i[s];
  },
      Ce = function () {
    var t,
        e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";

    for (t in we) e += "|" + t + "\\b";

    return new RegExp(e + ")", "gi");
  }(),
      Ee = /hsl[a]?\(/,
      Oe = function (t) {
    var e,
        r = t.join(" ");
    if (Ce.lastIndex = 0, Ce.test(r)) return e = Ee.test(r), t[1] = Se(t[1], e), t[0] = Se(t[0], e, xe(t[1])), !0;
  },
      Re = (T = Date.now, x = 500, S = 33, C = T(), E = C, R = O = 1e3 / 240, M = function t(e) {
    var r,
        n,
        i,
        o,
        s = T() - E,
        a = !0 === e;
    if (s > x && (C += s - S), ((r = (i = (E += s) - C) - R) > 0 || a) && (o = ++y.frame, w = i - 1e3 * y.time, y.time = i /= 1e3, R += r + (r >= O ? 4 : O - r), n = 1), a || (m = _(t)), n) for (b = 0; b < k.length; b++) k[b](i, w, o, e);
  }, y = {
    time: 0,
    frame: 0,
    tick: function () {
      M(!0);
    },
    deltaRatio: function (t) {
      return w / (1e3 / (t || 60));
    },
    wake: function () {
      h && (!c && Q() && (u = c = window, f = u.document || {}, at.gsap = mr, (u.gsapVersions || (u.gsapVersions = [])).push(mr.version), ut(lt || u.GreenSockGlobals || !u.gsap && u || {}), v = u.requestAnimationFrame), m && y.sleep(), _ = v || function (t) {
        return setTimeout(t, R - 1e3 * y.time + 1 | 0);
      }, g = 1, M(2));
    },
    sleep: function () {
      (v ? u.cancelAnimationFrame : clearTimeout)(m), g = 0, _ = dt;
    },
    lagSmoothing: function (t, e) {
      x = t || 1 / 1e-8, S = Math.min(e, x, 0);
    },
    fps: function (t) {
      O = 1e3 / (t || 240), R = 1e3 * y.time + O;
    },
    add: function (t) {
      k.indexOf(t) < 0 && k.push(t), ke();
    },
    remove: function (t) {
      var e;
      ~(e = k.indexOf(t)) && k.splice(e, 1) && b >= e && b--;
    },
    _listeners: k = []
  }),
      ke = function () {
    return !g && Re.wake();
  },
      Me = {},
      Ae = /^[\d.\-M][\d.\-,\s]/,
      Pe = /["']/g,
      De = function (t) {
    for (var e, r, n, i = {}, o = t.substr(1, t.length - 3).split(":"), s = o[0], a = 1, l = o.length; a < l; a++) r = o[a], e = a !== l - 1 ? r.lastIndexOf(",") : r.length, n = r.substr(0, e), i[s] = isNaN(n) ? n.replace(Pe, "").trim() : +n, s = r.substr(e + 1).trim();

    return i;
  },
      ze = function (t) {
    return function (e) {
      return 1 - t(1 - e);
    };
  },
      Fe = function t(e, r) {
    for (var n, i = e._first; i;) i instanceof je ? t(i, r) : !i.vars.yoyoEase || i._yoyo && i._repeat || i._yoyo === r || (i.timeline ? t(i.timeline, r) : (n = i._ease, i._ease = i._yEase, i._yEase = n, i._yoyo = r)), i = i._next;
  },
      Ie = function (t, e) {
    return t && (Y(t) ? t : Me[t] || function (t) {
      var e,
          r,
          n,
          i,
          o = (t + "").split("("),
          s = Me[o[0]];
      return s && o.length > 1 && s.config ? s.config.apply(null, ~t.indexOf("{") ? [De(o[1])] : (e = t, r = e.indexOf("(") + 1, n = e.indexOf(")"), i = e.indexOf("(", r), e.substring(r, ~i && i < n ? e.indexOf(")", n + 1) : n)).split(",").map(At)) : Me._CE && Ae.test(t) ? Me._CE("", t) : s;
    }(t)) || e;
  },
      Le = function (t, e, r, n) {
    void 0 === r && (r = function (t) {
      return 1 - e(1 - t);
    }), void 0 === n && (n = function (t) {
      return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
    });
    var i,
        o = {
      easeIn: e,
      easeOut: r,
      easeInOut: n
    };
    return Ct(t, function (t) {
      for (var e in Me[t] = at[t] = o, Me[i = t.toLowerCase()] = r, o) Me[i + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = Me[t + "." + e] = o[e];
    }), o;
  },
      Ge = function (t) {
    return function (e) {
      return e < .5 ? (1 - t(1 - 2 * e)) / 2 : .5 + t(2 * (e - .5)) / 2;
    };
  },
      Ne = function t(e, r, n) {
    var i = r >= 1 ? r : 1,
        o = (n || (e ? .3 : .45)) / (r < 1 ? r : 1),
        s = o / L * (Math.asin(1 / i) || 0),
        a = function (t) {
      return 1 === t ? 1 : i * Math.pow(2, -10 * t) * j((t - s) * o) + 1;
    },
        l = "out" === e ? a : "in" === e ? function (t) {
      return 1 - a(1 - t);
    } : Ge(a);

    return o = L / o, l.config = function (r, n) {
      return t(e, r, n);
    }, l;
  },
      Be = function t(e, r) {
    void 0 === r && (r = 1.70158);

    var n = function (t) {
      return t ? --t * t * ((r + 1) * t + r) + 1 : 0;
    },
        i = "out" === e ? n : "in" === e ? function (t) {
      return 1 - n(1 - t);
    } : Ge(n);

    return i.config = function (r) {
      return t(e, r);
    }, i;
  };

  Ct("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
    var r = e < 5 ? e + 1 : e;
    Le(t + ",Power" + (r - 1), e ? function (t) {
      return Math.pow(t, r);
    } : function (t) {
      return t;
    }, function (t) {
      return 1 - Math.pow(1 - t, r);
    }, function (t) {
      return t < .5 ? Math.pow(2 * t, r) / 2 : 1 - Math.pow(2 * (1 - t), r) / 2;
    });
  }), Me.Linear.easeNone = Me.none = Me.Linear.easeIn, Le("Elastic", Ne("in"), Ne("out"), Ne()), A = 7.5625, D = 1 / (P = 2.75), Le("Bounce", function (t) {
    return 1 - z(1 - t);
  }, z = function (t) {
    return t < D ? A * t * t : t < .7272727272727273 ? A * Math.pow(t - 1.5 / P, 2) + .75 : t < .9090909090909092 ? A * (t -= 2.25 / P) * t + .9375 : A * Math.pow(t - 2.625 / P, 2) + .984375;
  }), Le("Expo", function (t) {
    return t ? Math.pow(2, 10 * (t - 1)) : 0;
  }), Le("Circ", function (t) {
    return -(B(1 - t * t) - 1);
  }), Le("Sine", function (t) {
    return 1 === t ? 1 : 1 - U(t * G);
  }), Le("Back", Be("in"), Be("out"), Be()), Me.SteppedEase = Me.steps = at.SteppedEase = {
    config: function (t, e) {
      void 0 === t && (t = 1);
      var r = 1 / t,
          n = t + (e ? 0 : 1),
          i = e ? 1 : 0;
      return function (t) {
        return ((n * ne(0, 1 - 1e-8, t) | 0) + i) * r;
      };
    }
  }, I.ease = Me["quad.out"], Ct("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (t) {
    return bt += t + "," + t + "Params,";
  });

  var Ue = function (t, e) {
    this.id = N++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : St, this.set = e ? e.getSetter : nr;
  },
      $e = function () {
    function t(t, e) {
      var r = t.parent || l;
      this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Jt(this, +t.duration, 1, 1), this.data = t.data, g || Re.wake(), r && Wt(r, this, e || 0 === e ? e : r._time, 1), t.reversed && this.reverse(), t.paused && this.paused(!0);
    }

    var e = t.prototype;
    return e.delay = function (t) {
      return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), this._delay = t, this) : this._delay;
    }, e.duration = function (t) {
      return arguments.length ? this.totalDuration(this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur;
    }, e.totalDuration = function (t) {
      return arguments.length ? (this._dirty = 0, Jt(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
    }, e.totalTime = function (t, e) {
      if (ke(), !arguments.length) return this._tTime;
      var r = this._dp;

      if (r && r.smoothChildTiming && this._ts) {
        for (qt(this, t), !r._dp || r.parent || Vt(r, this); r.parent;) r.parent._time !== r._start + (r._ts >= 0 ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0), r = r.parent;

        !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && t < this._tDur || this._ts < 0 && t > 0 || !this._tDur && !t) && Wt(this._dp, this, this._start - this._delay);
      }

      return (this._tTime !== t || !this._dur && !e || this._initted && 1e-8 === Math.abs(this._zTime) || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t), Mt(this, t, e)), this;
    }, e.time = function (t, e) {
      return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + jt(this)) % this._dur || (t ? this._dur : 0), e) : this._time;
    }, e.totalProgress = function (t, e) {
      return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
    }, e.progress = function (t, e) {
      return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + jt(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
    }, e.iteration = function (t, e) {
      var r = this.duration() + this._rDelay;

      return arguments.length ? this.totalTime(this._time + (t - 1) * r, e) : this._repeat ? Ht(this._tTime, r) + 1 : 1;
    }, e.timeScale = function (t) {
      if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
      if (this._rts === t) return this;
      var e = this.parent && this._ts ? Yt(this.parent._time, this) : this._tTime;
      return this._rts = +t || 0, this._ts = this._ps || -1e-8 === t ? 0 : this._rts, $t(this.totalTime(ne(-this._delay, this._tDur, e), !0));
    }, e.paused = function (t) {
      return arguments.length ? (this._ps !== t && (this._ps = t, t ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (ke(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && (this._tTime -= 1e-8) && 1e-8 !== Math.abs(this._zTime)))), this) : this._ps;
    }, e.startTime = function (t) {
      if (arguments.length) {
        this._start = t;
        var e = this.parent || this._dp;
        return e && (e._sort || !this.parent) && Wt(e, this, t - this._delay), this;
      }

      return this._start;
    }, e.endTime = function (t) {
      return this._start + (W(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts);
    }, e.rawTime = function (t) {
      var e = this.parent || this._dp;
      return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Yt(e.rawTime(t), this) : this._tTime : this._tTime;
    }, e.globalTime = function (t) {
      for (var e = this, r = arguments.length ? t : e.rawTime(); e;) r = e._start + r / (e._ts || 1), e = e._dp;

      return r;
    }, e.repeat = function (t) {
      return arguments.length ? (this._repeat = t === 1 / 0 ? -2 : t, Kt(this)) : -2 === this._repeat ? 1 / 0 : this._repeat;
    }, e.repeatDelay = function (t) {
      return arguments.length ? (this._rDelay = t, Kt(this)) : this._rDelay;
    }, e.yoyo = function (t) {
      return arguments.length ? (this._yoyo = t, this) : this._yoyo;
    }, e.seek = function (t, e) {
      return this.totalTime(ee(this, t), W(e));
    }, e.restart = function (t, e) {
      return this.play().totalTime(t ? -this._delay : 0, W(e));
    }, e.play = function (t, e) {
      return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
    }, e.reverse = function (t, e) {
      return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1);
    }, e.pause = function (t, e) {
      return null != t && this.seek(t, e), this.paused(!0);
    }, e.resume = function () {
      return this.paused(!1);
    }, e.reversed = function (t) {
      return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -1e-8 : 0)), this) : this._rts < 0;
    }, e.invalidate = function () {
      return this._initted = this._act = 0, this._zTime = -1e-8, this;
    }, e.isActive = function () {
      var t,
          e = this.parent || this._dp,
          r = this._start;
      return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= r && t < this.endTime(!0) - 1e-8));
    }, e.eventCallback = function (t, e, r) {
      var n = this.vars;
      return arguments.length > 1 ? (e ? (n[t] = e, r && (n[t + "Params"] = r), "onUpdate" === t && (this._onUpdate = e)) : delete n[t], this) : n[t];
    }, e.then = function (t) {
      var e = this;
      return new Promise(function (r) {
        var n = Y(t) ? t : Pt,
            i = function () {
          var t = e.then;
          e.then = null, Y(n) && (n = n(e)) && (n.then || n === e) && (e.then = t), r(n), e.then = t;
        };

        e._initted && 1 === e.totalProgress() && e._ts >= 0 || !e._tTime && e._ts < 0 ? i() : e._prom = i;
      });
    }, e.kill = function () {
      ve(this);
    }, t;
  }();

  Dt($e.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -1e-8,
    _prom: 0,
    _ps: !1,
    _rts: 1
  });

  var je = function (t) {
    function e(e, r) {
      var n;
      return void 0 === e && (e = {}), (n = t.call(this, e, r) || this).labels = {}, n.smoothChildTiming = !!e.smoothChildTiming, n.autoRemoveChildren = !!e.autoRemoveChildren, n._sort = W(e.sortChildren), n.parent && Vt(n.parent, o(n)), e.scrollTrigger && Qt(o(n), e.scrollTrigger), n;
    }

    s(e, t);
    var r = e.prototype;
    return r.to = function (t, e, r) {
      return new Je(t, Rt(arguments, 0, this), ee(this, X(e) ? arguments[3] : r)), this;
    }, r.from = function (t, e, r) {
      return new Je(t, Rt(arguments, 1, this), ee(this, X(e) ? arguments[3] : r)), this;
    }, r.fromTo = function (t, e, r, n) {
      return new Je(t, Rt(arguments, 2, this), ee(this, X(e) ? arguments[4] : n)), this;
    }, r.set = function (t, e, r) {
      return e.duration = 0, e.parent = this, Gt(e).repeatDelay || (e.repeat = 0), e.immediateRender = !!e.immediateRender, new Je(t, e, ee(this, r), 1), this;
    }, r.call = function (t, e, r) {
      return Wt(this, Je.delayedCall(0, t, e), ee(this, r));
    }, r.staggerTo = function (t, e, r, n, i, o, s) {
      return r.duration = e, r.stagger = r.stagger || n, r.onComplete = o, r.onCompleteParams = s, r.parent = this, new Je(t, r, ee(this, i)), this;
    }, r.staggerFrom = function (t, e, r, n, i, o, s) {
      return r.runBackwards = 1, Gt(r).immediateRender = W(r.immediateRender), this.staggerTo(t, e, r, n, i, o, s);
    }, r.staggerFromTo = function (t, e, r, n, i, o, s, a) {
      return n.startAt = r, Gt(n).immediateRender = W(n.immediateRender), this.staggerTo(t, e, n, i, o, s, a);
    }, r.render = function (t, e, r) {
      var n,
          i,
          o,
          s,
          a,
          u,
          c,
          f,
          h,
          d,
          p,
          g,
          m = this._time,
          _ = this._dirty ? this.totalDuration() : this._tDur,
          v = this._dur,
          y = this !== l && t > _ - 1e-8 && t >= 0 ? _ : t < 1e-8 ? 0 : t,
          w = this._zTime < 0 != t < 0 && (this._initted || !v);

      if (y !== this._tTime || r || w) {
        if (m !== this._time && v && (y += this._time - m, t += this._time - m), n = y, h = this._start, u = !(f = this._ts), w && (v || (m = this._zTime), (t || !e) && (this._zTime = t)), this._repeat) {
          if (p = this._yoyo, a = v + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * a + t, e, r);

          if (n = Et(y % a), y === _ ? (s = this._repeat, n = v) : ((s = ~~(y / a)) && s === y / a && (n = v, s--), n > v && (n = v)), d = Ht(this._tTime, a), !m && this._tTime && d !== s && (d = s), p && 1 & s && (n = v - n, g = 1), s !== d && !this._lock) {
            var b = p && 1 & d,
                T = b === (p && 1 & s);
            if (s < d && (b = !b), m = b ? 0 : v, this._lock = 1, this.render(m || (g ? 0 : Et(s * a)), e, !v)._lock = 0, !e && this.parent && _e(this, "onRepeat"), this.vars.repeatRefresh && !g && (this.invalidate()._lock = 1), m !== this._time || u !== !this._ts) return this;
            if (v = this._dur, _ = this._tDur, T && (this._lock = 2, m = b ? v : -1e-4, this.render(m, !0), this.vars.repeatRefresh && !g && this.invalidate()), this._lock = 0, !this._ts && !u) return this;
            Fe(this, g);
          }
        }

        if (this._hasPause && !this._forcing && this._lock < 2 && (c = function (t, e, r) {
          var n;
          if (r > e) for (n = t._first; n && n._start <= r;) {
            if (!n._dur && "isPause" === n.data && n._start > e) return n;
            n = n._next;
          } else for (n = t._last; n && n._start >= r;) {
            if (!n._dur && "isPause" === n.data && n._start < e) return n;
            n = n._prev;
          }
        }(this, Et(m), Et(n))) && (y -= n - (n = c._start)), this._tTime = y, this._time = n, this._act = !f, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = t, m = 0), !m && (n || !v && t >= 0) && !e && _e(this, "onStart"), n >= m && t >= 0) for (i = this._first; i;) {
          if (o = i._next, (i._act || n >= i._start) && i._ts && c !== i) {
            if (i.parent !== this) return this.render(t, e, r);

            if (i.render(i._ts > 0 ? (n - i._start) * i._ts : (i._dirty ? i.totalDuration() : i._tDur) + (n - i._start) * i._ts, e, r), n !== this._time || !this._ts && !u) {
              c = 0, o && (y += this._zTime = -1e-8);
              break;
            }
          }

          i = o;
        } else {
          i = this._last;

          for (var x = t < 0 ? t : n; i;) {
            if (o = i._prev, (i._act || x <= i._end) && i._ts && c !== i) {
              if (i.parent !== this) return this.render(t, e, r);

              if (i.render(i._ts > 0 ? (x - i._start) * i._ts : (i._dirty ? i.totalDuration() : i._tDur) + (x - i._start) * i._ts, e, r), n !== this._time || !this._ts && !u) {
                c = 0, o && (y += this._zTime = x ? -1e-8 : 1e-8);
                break;
              }
            }

            i = o;
          }
        }
        if (c && !e && (this.pause(), c.render(n >= m ? 0 : -1e-8)._zTime = n >= m ? 1 : -1, this._ts)) return this._start = h, Xt(this), this.render(t, e, r);
        this._onUpdate && !e && _e(this, "onUpdate", !0), (y === _ && _ >= this.totalDuration() || !y && m) && (h !== this._start && Math.abs(f) === Math.abs(this._ts) || this._lock || ((t || !v) && (y === _ && this._ts > 0 || !y && this._ts < 0) && Bt(this, 1), e || t < 0 && !m || !y && !m || (_e(this, y === _ ? "onComplete" : "onReverseComplete", !0), this._prom && !(y < _ && this.timeScale() > 0) && this._prom())));
      }

      return this;
    }, r.add = function (t, e) {
      var r = this;

      if (X(e) || (e = ee(this, e)), !(t instanceof $e)) {
        if (K(t)) return t.forEach(function (t) {
          return r.add(t, e);
        }), this;
        if (H(t)) return this.addLabel(t, e);
        if (!Y(t)) return this;
        t = Je.delayedCall(0, t);
      }

      return this !== t ? Wt(this, t, e) : this;
    }, r.getChildren = function (t, e, r, n) {
      void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === r && (r = !0), void 0 === n && (n = -1e8);

      for (var i = [], o = this._first; o;) o._start >= n && (o instanceof Je ? e && i.push(o) : (r && i.push(o), t && i.push.apply(i, o.getChildren(!0, e, r)))), o = o._next;

      return i;
    }, r.getById = function (t) {
      for (var e = this.getChildren(1, 1, 1), r = e.length; r--;) if (e[r].vars.id === t) return e[r];
    }, r.remove = function (t) {
      return H(t) ? this.removeLabel(t) : Y(t) ? this.killTweensOf(t) : (Nt(this, t), t === this._recent && (this._recent = this._last), Ut(this));
    }, r.totalTime = function (e, r) {
      return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Et(Re.time - (this._ts > 0 ? e / this._ts : (this.totalDuration() - e) / -this._ts))), t.prototype.totalTime.call(this, e, r), this._forcing = 0, this) : this._tTime;
    }, r.addLabel = function (t, e) {
      return this.labels[t] = ee(this, e), this;
    }, r.removeLabel = function (t) {
      return delete this.labels[t], this;
    }, r.addPause = function (t, e, r) {
      var n = Je.delayedCall(0, e || dt, r);
      return n.data = "isPause", this._hasPause = 1, Wt(this, n, ee(this, t));
    }, r.removePause = function (t) {
      var e = this._first;

      for (t = ee(this, t); e;) e._start === t && "isPause" === e.data && Bt(e), e = e._next;
    }, r.killTweensOf = function (t, e, r) {
      for (var n = this.getTweensOf(t, r), i = n.length; i--;) He !== n[i] && n[i].kill(t, e);

      return this;
    }, r.getTweensOf = function (t, e) {
      for (var r, n = [], i = ae(t), o = this._first, s = X(e); o;) o instanceof Je ? Ot(o._targets, i) && (s ? (!He || o._initted && o._ts) && o.globalTime(0) <= e && o.globalTime(o.totalDuration()) > e : !e || o.isActive()) && n.push(o) : (r = o.getTweensOf(i, e)).length && n.push.apply(n, r), o = o._next;

      return n;
    }, r.tweenTo = function (t, e) {
      e = e || {};
      var r = this,
          n = ee(r, t),
          i = e,
          o = i.startAt,
          s = i.onStart,
          a = i.onStartParams,
          l = i.immediateRender,
          u = Je.to(r, Dt({
        ease: "none",
        lazy: !1,
        immediateRender: !1,
        time: n,
        overwrite: "auto",
        duration: e.duration || Math.abs((n - (o && "time" in o ? o.time : r._time)) / r.timeScale()) || 1e-8,
        onStart: function () {
          r.pause();
          var t = e.duration || Math.abs((n - r._time) / r.timeScale());
          u._dur !== t && Jt(u, t, 0, 1).render(u._time, !0, !0), s && s.apply(u, a || []);
        }
      }, e));
      return l ? u.render(0) : u;
    }, r.tweenFromTo = function (t, e, r) {
      return this.tweenTo(e, Dt({
        startAt: {
          time: ee(this, t)
        }
      }, r));
    }, r.recent = function () {
      return this._recent;
    }, r.nextLabel = function (t) {
      return void 0 === t && (t = this._time), me(this, ee(this, t));
    }, r.previousLabel = function (t) {
      return void 0 === t && (t = this._time), me(this, ee(this, t), 1);
    }, r.currentLabel = function (t) {
      return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + 1e-8);
    }, r.shiftChildren = function (t, e, r) {
      void 0 === r && (r = 0);

      for (var n, i = this._first, o = this.labels; i;) i._start >= r && (i._start += t, i._end += t), i = i._next;

      if (e) for (n in o) o[n] >= r && (o[n] += t);
      return Ut(this);
    }, r.invalidate = function () {
      var e = this._first;

      for (this._lock = 0; e;) e.invalidate(), e = e._next;

      return t.prototype.invalidate.call(this);
    }, r.clear = function (t) {
      void 0 === t && (t = !0);

      for (var e, r = this._first; r;) e = r._next, this.remove(r), r = e;

      return this._dp && (this._time = this._tTime = this._pTime = 0), t && (this.labels = {}), Ut(this);
    }, r.totalDuration = function (t) {
      var e,
          r,
          n,
          i = 0,
          o = this,
          s = o._last,
          a = 1e8;
      if (arguments.length) return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -t : t));

      if (o._dirty) {
        for (n = o.parent; s;) e = s._prev, s._dirty && s.totalDuration(), (r = s._start) > a && o._sort && s._ts && !o._lock ? (o._lock = 1, Wt(o, s, r - s._delay, 1)._lock = 0) : a = r, r < 0 && s._ts && (i -= r, (!n && !o._dp || n && n.smoothChildTiming) && (o._start += r / o._ts, o._time -= r, o._tTime -= r), o.shiftChildren(-r, !1, -Infinity), a = 0), s._end > i && s._ts && (i = s._end), s = e;

        Jt(o, o === l && o._time > i ? o._time : i, 1, 1), o._dirty = 0;
      }

      return o._tDur;
    }, e.updateRoot = function (t) {
      if (l._ts && (Mt(l, Yt(t, l)), d = Re.frame), Re.frame >= yt) {
        yt += F.autoSleep || 120;
        var e = l._first;

        if ((!e || !e._ts) && F.autoSleep && Re._listeners.length < 2) {
          for (; e && !e._ts;) e = e._next;

          e || Re.sleep();
        }
      }
    }, e;
  }($e);

  Dt(je.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
  });

  var He,
      Ye = function (t, e, r, n, i, o, s) {
    var a,
        l,
        u,
        c,
        f,
        h,
        d,
        p,
        g = new hr(this._pt, t, e, 0, 1, sr, null, i),
        m = 0,
        _ = 0;

    for (g.b = r, g.e = n, r += "", (d = ~(n += "").indexOf("random(")) && (n = pe(n)), o && (o(p = [r, n], t, e), r = p[0], n = p[1]), l = r.match(nt) || []; a = nt.exec(n);) c = a[0], f = n.substring(m, a.index), u ? u = (u + 1) % 5 : "rgba(" === f.substr(-5) && (u = 1), c !== l[_++] && (h = parseFloat(l[_ - 1]) || 0, g._pt = {
      _next: g._pt,
      p: f || 1 === _ ? f : ",",
      s: h,
      c: "=" === c.charAt(1) ? parseFloat(c.substr(2)) * ("-" === c.charAt(0) ? -1 : 1) : parseFloat(c) - h,
      m: u && u < 4 ? Math.round : 0
    }, m = nt.lastIndex);

    return g.c = m < n.length ? n.substring(m, n.length) : "", g.fp = s, (it.test(n) || d) && (g.e = 0), this._pt = g, g;
  },
      Xe = function (t, e, r, n, i, o, s, a, l) {
    Y(n) && (n = n(i || 0, t, o));
    var u,
        c = t[e],
        f = "get" !== r ? r : Y(c) ? l ? t[e.indexOf("set") || !Y(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : c,
        h = Y(c) ? l ? er : tr : Ke;
    if (H(n) && (~n.indexOf("random(") && (n = pe(n)), "=" === n.charAt(1) && (n = parseFloat(f) + parseFloat(n.substr(2)) * ("-" === n.charAt(0) ? -1 : 1) + (ie(f) || 0))), f !== n) return isNaN(f * n) ? (!c && !(e in t) && ct(e, n), Ye.call(this, t, e, f, n, h, a || F.stringFilter, l)) : (u = new hr(this._pt, t, e, +f || 0, n - (f || 0), "boolean" == typeof c ? or : ir, 0, h), l && (u.fp = l), s && u.modifier(s, this, t), this._pt = u);
  },
      qe = function (t, e, r, n, i, o) {
    var s, a, l, u;
    if (_t[t] && !1 !== (s = new _t[t]()).init(i, s.rawVars ? e[t] : function (t, e, r, n, i) {
      if (Y(t) && (t = We(t, i, e, r, n)), !V(t) || t.style && t.nodeType || K(t) || J(t)) return H(t) ? We(t, i, e, r, n) : t;
      var o,
          s = {};

      for (o in t) s[o] = We(t[o], i, e, r, n);

      return s;
    }(e[t], n, i, o, r), r, n, o) && (r._pt = a = new hr(r._pt, i, t, 0, 1, s.render, s, 0, s.priority), r !== p)) for (l = r._ptLookup[r._targets.indexOf(i)], u = s._props.length; u--;) l[s._props[u]] = a;
    return s;
  },
      Ve = function t(e, r) {
    var n,
        i,
        o,
        s,
        u,
        c,
        f,
        h,
        d,
        p,
        g,
        m,
        _,
        v = e.vars,
        y = v.ease,
        w = v.startAt,
        b = v.immediateRender,
        T = v.lazy,
        x = v.onUpdate,
        S = v.onUpdateParams,
        C = v.callbackScope,
        E = v.runBackwards,
        O = v.yoyoEase,
        R = v.keyframes,
        k = v.autoRevert,
        M = e._dur,
        A = e._startAt,
        P = e._targets,
        D = e.parent,
        z = D && "nested" === D.data ? D.parent._targets : P,
        F = "auto" === e._overwrite && !a,
        L = e.timeline;

    if (L && (!R || !y) && (y = "none"), e._ease = Ie(y, I.ease), e._yEase = O ? ze(Ie(!0 === O ? y : O, I.ease)) : 0, O && e._yoyo && !e._repeat && (O = e._yEase, e._yEase = e._ease, e._ease = O), !L) {
      if (m = (h = P[0] ? xt(P[0]).harness : 0) && v[h.prop], n = Lt(v, pt), A && A.render(-1, !0).kill(), w) {
        if (Bt(e._startAt = Je.set(P, Dt({
          data: "isStart",
          overwrite: !1,
          parent: D,
          immediateRender: !0,
          lazy: W(T),
          startAt: null,
          delay: 0,
          onUpdate: x,
          onUpdateParams: S,
          callbackScope: C,
          stagger: 0
        }, w))), b) if (r > 0) k || (e._startAt = 0);else if (M && !(r < 0 && A)) return void (r && (e._zTime = r));
      } else if (E && M) if (A) !k && (e._startAt = 0);else if (r && (b = !1), o = Dt({
        overwrite: !1,
        data: "isFromStart",
        lazy: b && W(T),
        immediateRender: b,
        stagger: 0,
        parent: D
      }, n), m && (o[h.prop] = m), Bt(e._startAt = Je.set(P, o)), b) {
        if (!r) return;
      } else t(e._startAt, 1e-8);

      for (e._pt = 0, T = M && W(T) || T && !M, i = 0; i < P.length; i++) {
        if (f = (u = P[i])._gsap || Tt(P)[i]._gsap, e._ptLookup[i] = p = {}, mt[f.id] && gt.length && kt(), g = z === P ? i : z.indexOf(u), h && !1 !== (d = new h()).init(u, m || n, e, g, z) && (e._pt = s = new hr(e._pt, u, d.name, 0, 1, d.render, d, 0, d.priority), d._props.forEach(function (t) {
          p[t] = s;
        }), d.priority && (c = 1)), !h || m) for (o in n) _t[o] && (d = qe(o, n, e, g, u, z)) ? d.priority && (c = 1) : p[o] = s = Xe.call(e, u, o, "get", n[o], g, z, 0, v.stringFilter);
        e._op && e._op[i] && e.kill(u, e._op[i]), F && e._pt && (He = e, l.killTweensOf(u, p, e.globalTime(0)), _ = !e.parent, He = 0), e._pt && T && (mt[f.id] = 1);
      }

      c && fr(e), e._onInit && e._onInit(e);
    }

    e._from = !L && !!v.runBackwards, e._onUpdate = x, e._initted = (!e._op || e._pt) && !_;
  },
      We = function (t, e, r, n, i) {
    return Y(t) ? t.call(e, r, n, i) : H(t) && ~t.indexOf("random(") ? pe(t) : t;
  },
      Qe = bt + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
      Ze = (Qe + ",id,stagger,delay,duration,paused,scrollTrigger").split(","),
      Je = function (t) {
    function e(e, r, n, i) {
      var s;
      "number" == typeof r && (n.duration = r, r = n, n = null);
      var u,
          c,
          f,
          h,
          d,
          p,
          g,
          m,
          _ = (s = t.call(this, i ? r : Gt(r), n) || this).vars,
          v = _.duration,
          y = _.delay,
          w = _.immediateRender,
          b = _.stagger,
          T = _.overwrite,
          x = _.keyframes,
          S = _.defaults,
          C = _.scrollTrigger,
          E = _.yoyoEase,
          O = s.parent,
          R = (K(e) || J(e) ? X(e[0]) : "length" in r) ? [e] : ae(e);

      if (s._targets = R.length ? Tt(R) : ft("GSAP target " + e + " not found. https://greensock.com", !F.nullTargetWarn) || [], s._ptLookup = [], s._overwrite = T, x || b || Z(v) || Z(y)) {
        if (r = s.vars, (u = s.timeline = new je({
          data: "nested",
          defaults: S || {}
        })).kill(), u.parent = u._dp = o(s), u._start = 0, x) Dt(u.vars.defaults, {
          ease: "none"
        }), x.forEach(function (t) {
          return u.to(R, t, ">");
        });else {
          if (h = R.length, g = b ? ue(b) : dt, V(b)) for (d in b) ~Qe.indexOf(d) && (m || (m = {}), m[d] = b[d]);

          for (c = 0; c < h; c++) {
            for (d in f = {}, r) Ze.indexOf(d) < 0 && (f[d] = r[d]);

            f.stagger = 0, E && (f.yoyoEase = E), m && Ft(f, m), p = R[c], f.duration = +We(v, o(s), c, p, R), f.delay = (+We(y, o(s), c, p, R) || 0) - s._delay, !b && 1 === h && f.delay && (s._delay = y = f.delay, s._start += y, f.delay = 0), u.to(p, f, g(c, p, R));
          }

          u.duration() ? v = y = 0 : s.timeline = 0;
        }
        v || s.duration(v = u.duration());
      } else s.timeline = 0;

      return !0 !== T || a || (He = o(s), l.killTweensOf(R), He = 0), O && Vt(O, o(s)), (w || !v && !x && s._start === Et(O._time) && W(w) && function t(e) {
        return !e || e._ts && t(e.parent);
      }(o(s)) && "nested" !== O.data) && (s._tTime = -1e-8, s.render(Math.max(0, -y))), C && Qt(o(s), C), s;
    }

    s(e, t);
    var r = e.prototype;
    return r.render = function (t, e, r) {
      var n,
          i,
          o,
          s,
          a,
          l,
          u,
          c,
          f,
          h = this._time,
          d = this._tDur,
          p = this._dur,
          g = t > d - 1e-8 && t >= 0 ? d : t < 1e-8 ? 0 : t;

      if (p) {
        if (g !== this._tTime || !t || r || !this._initted && this._tTime || this._startAt && this._zTime < 0 != t < 0) {
          if (n = g, c = this.timeline, this._repeat) {
            if (s = p + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * s + t, e, r);
            if (n = Et(g % s), g === d ? (o = this._repeat, n = p) : ((o = ~~(g / s)) && o === g / s && (n = p, o--), n > p && (n = p)), (l = this._yoyo && 1 & o) && (f = this._yEase, n = p - n), a = Ht(this._tTime, s), n === h && !r && this._initted) return this;
            o !== a && (c && this._yEase && Fe(c, l), !this.vars.repeatRefresh || l || this._lock || (this._lock = r = 1, this.render(Et(s * o), !0).invalidate()._lock = 0));
          }

          if (!this._initted) {
            if (Zt(this, t < 0 ? t : n, r, e)) return this._tTime = 0, this;
            if (p !== this._dur) return this.render(t, e, r);
          }

          for (this._tTime = g, this._time = n, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = u = (f || this._ease)(n / p), this._from && (this.ratio = u = 1 - u), n && !h && !e && _e(this, "onStart"), i = this._pt; i;) i.r(u, i.d), i = i._next;

          c && c.render(t < 0 ? t : !n && l ? -1e-8 : c._dur * u, e, r) || this._startAt && (this._zTime = t), this._onUpdate && !e && (t < 0 && this._startAt && this._startAt.render(t, !0, r), _e(this, "onUpdate")), this._repeat && o !== a && this.vars.onRepeat && !e && this.parent && _e(this, "onRepeat"), g !== this._tDur && g || this._tTime !== g || (t < 0 && this._startAt && !this._onUpdate && this._startAt.render(t, !0, !0), (t || !p) && (g === this._tDur && this._ts > 0 || !g && this._ts < 0) && Bt(this, 1), e || t < 0 && !h || !g && !h || (_e(this, g === d ? "onComplete" : "onReverseComplete", !0), this._prom && !(g < d && this.timeScale() > 0) && this._prom()));
        }
      } else !function (t, e, r, n) {
        var i,
            o,
            s,
            a = t.ratio,
            l = e < 0 || !e && (!t._start && function t(e) {
          var r = e.parent;
          return r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || t(r));
        }(t) || (t._ts < 0 || t._dp._ts < 0) && "isFromStart" !== t.data && "isStart" !== t.data) ? 0 : 1,
            u = t._rDelay,
            c = 0;

        if (u && t._repeat && (c = ne(0, t._tDur, e), o = Ht(c, u), s = Ht(t._tTime, u), t._yoyo && 1 & o && (l = 1 - l), o !== s && (a = 1 - l, t.vars.repeatRefresh && t._initted && t.invalidate())), l !== a || n || 1e-8 === t._zTime || !e && t._zTime) {
          if (!t._initted && Zt(t, e, n, r)) return;

          for (s = t._zTime, t._zTime = e || (r ? 1e-8 : 0), r || (r = e && !s), t.ratio = l, t._from && (l = 1 - l), t._time = 0, t._tTime = c, r || _e(t, "onStart"), i = t._pt; i;) i.r(l, i.d), i = i._next;

          t._startAt && e < 0 && t._startAt.render(e, !0, !0), t._onUpdate && !r && _e(t, "onUpdate"), c && t._repeat && !r && t.parent && _e(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === l && (l && Bt(t, 1), r || (_e(t, l ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
        } else t._zTime || (t._zTime = e);
      }(this, t, e, r);

      return this;
    }, r.targets = function () {
      return this._targets;
    }, r.invalidate = function () {
      return this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(), t.prototype.invalidate.call(this);
    }, r.kill = function (t, e) {
      if (void 0 === e && (e = "all"), !(t || e && "all" !== e)) return this._lazy = this._pt = 0, this.parent ? ve(this) : this;

      if (this.timeline) {
        var r = this.timeline.totalDuration();
        return this.timeline.killTweensOf(t, e, He && !0 !== He.vars.overwrite)._first || ve(this), this.parent && r !== this.timeline.totalDuration() && Jt(this, this._dur * this.timeline._tDur / r, 0, 1), this;
      }

      var n,
          i,
          o,
          s,
          a,
          l,
          u,
          c = this._targets,
          f = t ? ae(t) : c,
          h = this._ptLookup,
          d = this._pt;
      if ((!e || "all" === e) && function (t, e) {
        for (var r = t.length, n = r === e.length; n && r-- && t[r] === e[r];);

        return r < 0;
      }(c, f)) return "all" === e && (this._pt = 0), ve(this);

      for (n = this._op = this._op || [], "all" !== e && (H(e) && (a = {}, Ct(e, function (t) {
        return a[t] = 1;
      }), e = a), e = function (t, e) {
        var r,
            n,
            i,
            o,
            s = t[0] ? xt(t[0]).harness : 0,
            a = s && s.aliases;
        if (!a) return e;

        for (n in r = Ft({}, e), a) if ((n in r)) for (i = (o = a[n].split(",")).length; i--;) r[o[i]] = r[n];

        return r;
      }(c, e)), u = c.length; u--;) if (~f.indexOf(c[u])) for (a in i = h[u], "all" === e ? (n[u] = e, s = i, o = {}) : (o = n[u] = n[u] || {}, s = e), s) (l = i && i[a]) && ("kill" in l.d && !0 !== l.d.kill(a) || Nt(this, l, "_pt"), delete i[a]), "all" !== o && (o[a] = 1);

      return this._initted && !this._pt && d && ve(this), this;
    }, e.to = function (t, r) {
      return new e(t, r, arguments[2]);
    }, e.from = function (t, r) {
      return new e(t, Rt(arguments, 1));
    }, e.delayedCall = function (t, r, n, i) {
      return new e(r, 0, {
        immediateRender: !1,
        lazy: !1,
        overwrite: !1,
        delay: t,
        onComplete: r,
        onReverseComplete: r,
        onCompleteParams: n,
        onReverseCompleteParams: n,
        callbackScope: i
      });
    }, e.fromTo = function (t, r, n) {
      return new e(t, Rt(arguments, 2));
    }, e.set = function (t, r) {
      return r.duration = 0, r.repeatDelay || (r.repeat = 0), new e(t, r);
    }, e.killTweensOf = function (t, e, r) {
      return l.killTweensOf(t, e, r);
    }, e;
  }($e);

  Dt(Je.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
  }), Ct("staggerTo,staggerFrom,staggerFromTo", function (t) {
    Je[t] = function () {
      var e = new je(),
          r = oe.call(arguments, 0);
      return r.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, r);
    };
  });

  var Ke = function (t, e, r) {
    return t[e] = r;
  },
      tr = function (t, e, r) {
    return t[e](r);
  },
      er = function (t, e, r, n) {
    return t[e](n.fp, r);
  },
      rr = function (t, e, r) {
    return t.setAttribute(e, r);
  },
      nr = function (t, e) {
    return Y(t[e]) ? tr : q(t[e]) && t.setAttribute ? rr : Ke;
  },
      ir = function (t, e) {
    return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4, e);
  },
      or = function (t, e) {
    return e.set(e.t, e.p, !!(e.s + e.c * t), e);
  },
      sr = function (t, e) {
    var r = e._pt,
        n = "";
    if (!t && e.b) n = e.b;else if (1 === t && e.e) n = e.e;else {
      for (; r;) n = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round(1e4 * (r.s + r.c * t)) / 1e4) + n, r = r._next;

      n += e.c;
    }
    e.set(e.t, e.p, n, e);
  },
      ar = function (t, e) {
    for (var r = e._pt; r;) r.r(t, r.d), r = r._next;
  },
      lr = function (t, e, r, n) {
    for (var i, o = this._pt; o;) i = o._next, o.p === n && o.modifier(t, e, r), o = i;
  },
      ur = function (t) {
    for (var e, r, n = this._pt; n;) r = n._next, n.p === t && !n.op || n.op === t ? Nt(this, n, "_pt") : n.dep || (e = 1), n = r;

    return !e;
  },
      cr = function (t, e, r, n) {
    n.mSet(t, e, n.m.call(n.tween, r, n.mt), n);
  },
      fr = function (t) {
    for (var e, r, n, i, o = t._pt; o;) {
      for (e = o._next, r = n; r && r.pr > o.pr;) r = r._next;

      (o._prev = r ? r._prev : i) ? o._prev._next = o : n = o, (o._next = r) ? r._prev = o : i = o, o = e;
    }

    t._pt = n;
  },
      hr = function () {
    function t(t, e, r, n, i, o, s, a, l) {
      this.t = e, this.s = n, this.c = i, this.p = r, this.r = o || ir, this.d = s || this, this.set = a || Ke, this.pr = l || 0, this._next = t, t && (t._prev = this);
    }

    return t.prototype.modifier = function (t, e, r) {
      this.mSet = this.mSet || this.set, this.set = cr, this.m = t, this.mt = r, this.tween = e;
    }, t;
  }();

  Ct(bt + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (t) {
    return pt[t] = 1;
  }), at.TweenMax = at.TweenLite = Je, at.TimelineLite = at.TimelineMax = je, l = new je({
    sortChildren: !1,
    defaults: I,
    autoRemoveChildren: !0,
    id: "root",
    smoothChildTiming: !0
  }), F.stringFilter = Oe;
  var dr = {
    registerPlugin: function () {
      for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];

      e.forEach(function (t) {
        return ye(t);
      });
    },
    timeline: function (t) {
      return new je(t);
    },
    getTweensOf: function (t, e) {
      return l.getTweensOf(t, e);
    },
    getProperty: function (t, e, r, n) {
      H(t) && (t = ae(t)[0]);
      var i = xt(t || {}).get,
          o = r ? Pt : At;
      return "native" === r && (r = ""), t ? e ? o((_t[e] && _t[e].get || i)(t, e, r, n)) : function (e, r, n) {
        return o((_t[e] && _t[e].get || i)(t, e, r, n));
      } : t;
    },
    quickSetter: function (t, e, r) {
      if ((t = ae(t)).length > 1) {
        var n = t.map(function (t) {
          return mr.quickSetter(t, e, r);
        }),
            i = n.length;
        return function (t) {
          for (var e = i; e--;) n[e](t);
        };
      }

      t = t[0] || {};
      var o = _t[e],
          s = xt(t),
          a = s.harness && (s.harness.aliases || {})[e] || e,
          l = o ? function (e) {
        var n = new o();
        p._pt = 0, n.init(t, r ? e + r : e, p, 0, [t]), n.render(1, n), p._pt && ar(1, p);
      } : s.set(t, a);
      return o ? l : function (e) {
        return l(t, a, r ? e + r : e, s, 1);
      };
    },
    isTweening: function (t) {
      return l.getTweensOf(t, !0).length > 0;
    },
    defaults: function (t) {
      return t && t.ease && (t.ease = Ie(t.ease, I.ease)), It(I, t || {});
    },
    config: function (t) {
      return It(F, t || {});
    },
    registerEffect: function (t) {
      var e = t.name,
          r = t.effect,
          n = t.plugins,
          i = t.defaults,
          o = t.extendTimeline;
      (n || "").split(",").forEach(function (t) {
        return t && !_t[t] && !at[t] && ft(e + " effect requires " + t + " plugin.");
      }), vt[e] = function (t, e, n) {
        return r(ae(t), Dt(e || {}, i), n);
      }, o && (je.prototype[e] = function (t, r, n) {
        return this.add(vt[e](t, V(r) ? r : (n = r) && {}, this), n);
      });
    },
    registerEase: function (t, e) {
      Me[t] = Ie(e);
    },
    parseEase: function (t, e) {
      return arguments.length ? Ie(t, e) : Me;
    },
    getById: function (t) {
      return l.getById(t);
    },
    exportRoot: function (t, e) {
      void 0 === t && (t = {});
      var r,
          n,
          i = new je(t);

      for (i.smoothChildTiming = W(t.smoothChildTiming), l.remove(i), i._dp = 0, i._time = i._tTime = l._time, r = l._first; r;) n = r._next, !e && !r._dur && r instanceof Je && r.vars.onComplete === r._targets[0] || Wt(i, r, r._start - r._delay), r = n;

      return Wt(l, i, 0), i;
    },
    utils: {
      wrap: function t(e, r, n) {
        var i = r - e;
        return K(e) ? de(e, t(0, e.length), r) : re(n, function (t) {
          return (i + (t - e) % i) % i + e;
        });
      },
      wrapYoyo: function t(e, r, n) {
        var i = r - e,
            o = 2 * i;
        return K(e) ? de(e, t(0, e.length - 1), r) : re(n, function (t) {
          return e + ((t = (o + (t - e) % o) % o || 0) > i ? o - t : t);
        });
      },
      distribute: ue,
      random: he,
      snap: fe,
      normalize: function (t, e, r) {
        return ge(t, e, 0, 1, r);
      },
      getUnit: ie,
      clamp: function (t, e, r) {
        return re(r, function (r) {
          return ne(t, e, r);
        });
      },
      splitColor: Te,
      toArray: ae,
      mapRange: ge,
      pipe: function () {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];

        return function (t) {
          return e.reduce(function (t, e) {
            return e(t);
          }, t);
        };
      },
      unitize: function (t, e) {
        return function (r) {
          return t(parseFloat(r)) + (e || ie(r));
        };
      },
      interpolate: function t(e, r, n, i) {
        var o = isNaN(e + r) ? 0 : function (t) {
          return (1 - t) * e + t * r;
        };

        if (!o) {
          var s,
              a,
              l,
              u,
              c,
              f = H(e),
              h = {};
          if (!0 === n && (i = 1) && (n = null), f) e = {
            p: e
          }, r = {
            p: r
          };else if (K(e) && !K(r)) {
            for (l = [], u = e.length, c = u - 2, a = 1; a < u; a++) l.push(t(e[a - 1], e[a]));

            u--, o = function (t) {
              t *= u;
              var e = Math.min(c, ~~t);
              return l[e](t - e);
            }, n = r;
          } else i || (e = Ft(K(e) ? [] : {}, e));

          if (!l) {
            for (s in r) Xe.call(h, e, s, "get", r[s]);

            o = function (t) {
              return ar(t, h) || (f ? e.p : e);
            };
          }
        }

        return re(n, o);
      },
      shuffle: le
    },
    install: ut,
    effects: vt,
    ticker: Re,
    updateRoot: je.updateRoot,
    plugins: _t,
    globalTimeline: l,
    core: {
      PropTween: hr,
      globals: ht,
      Tween: Je,
      Timeline: je,
      Animation: $e,
      getCache: xt,
      _removeLinkedListItem: Nt,
      suppressOverwrites: function (t) {
        return a = t;
      }
    }
  };
  Ct("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
    return dr[t] = Je[t];
  }), Re.add(je.updateRoot), p = dr.to({}, {
    duration: 0
  });

  var pr = function (t, e) {
    for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e;) r = r._next;

    return r;
  },
      gr = function (t, e) {
    return {
      name: t,
      rawVars: 1,
      init: function (t, r, n) {
        n._onInit = function (t) {
          var n, i;

          if (H(r) && (n = {}, Ct(r, function (t) {
            return n[t] = 1;
          }), r = n), e) {
            for (i in n = {}, r) n[i] = e(r[i]);

            r = n;
          }

          !function (t, e) {
            var r,
                n,
                i,
                o = t._targets;

            for (r in e) for (n = o.length; n--;) (i = t._ptLookup[n][r]) && (i = i.d) && (i._pt && (i = pr(i, r)), i && i.modifier && i.modifier(e[r], t, o[n], r));
          }(t, r);
        };
      }
    };
  },
      mr = dr.registerPlugin({
    name: "attr",
    init: function (t, e, r, n, i) {
      var o, s;

      for (o in e) (s = this.add(t, "setAttribute", (t.getAttribute(o) || 0) + "", e[o], n, i, 0, 0, o)) && (s.op = o), this._props.push(o);
    }
  }, {
    name: "endArray",
    init: function (t, e) {
      for (var r = e.length; r--;) this.add(t, r, t[r] || 0, e[r]);
    }
  }, gr("roundProps", ce), gr("modifiers"), gr("snap", fe)) || dr;

  Je.version = je.version = mr.version = "3.6.0", h = 1, Q() && ke();
  Me.Power0, Me.Power1, Me.Power2, Me.Power3, Me.Power4, Me.Linear, Me.Quad, Me.Cubic, Me.Quart, Me.Quint, Me.Strong, Me.Elastic, Me.Back, Me.SteppedEase, Me.Bounce, Me.Sine, Me.Expo, Me.Circ;

  var _r,
      vr,
      yr,
      wr,
      br,
      Tr,
      xr,
      Sr,
      Cr = {},
      Er = 180 / Math.PI,
      Or = Math.PI / 180,
      Rr = Math.atan2,
      kr = /([A-Z])/g,
      Mr = /(?:left|right|width|margin|padding|x)/i,
      Ar = /[\s,\(]\S/,
      Pr = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
  },
      Dr = function (t, e) {
    return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
  },
      zr = function (t, e) {
    return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
  },
      Fr = function (t, e) {
    return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e);
  },
      Ir = function (t, e) {
    var r = e.s + e.c * t;
    e.set(e.t, e.p, ~~(r + (r < 0 ? -.5 : .5)) + e.u, e);
  },
      Lr = function (t, e) {
    return e.set(e.t, e.p, t ? e.e : e.b, e);
  },
      Gr = function (t, e) {
    return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
  },
      Nr = function (t, e, r) {
    return t.style[e] = r;
  },
      Br = function (t, e, r) {
    return t.style.setProperty(e, r);
  },
      Ur = function (t, e, r) {
    return t._gsap[e] = r;
  },
      $r = function (t, e, r) {
    return t._gsap.scaleX = t._gsap.scaleY = r;
  },
      jr = function (t, e, r, n, i) {
    var o = t._gsap;
    o.scaleX = o.scaleY = r, o.renderTransform(i, o);
  },
      Hr = function (t, e, r, n, i) {
    var o = t._gsap;
    o[e] = r, o.renderTransform(i, o);
  },
      Yr = "transform",
      Xr = Yr + "Origin",
      qr = function (t, e) {
    var r = vr.createElementNS ? vr.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : vr.createElement(t);
    return r.style ? r : vr.createElement(t);
  },
      Vr = function t(e, r, n) {
    var i = getComputedStyle(e);
    return i[r] || i.getPropertyValue(r.replace(kr, "-$1").toLowerCase()) || i.getPropertyValue(r) || !n && t(e, Qr(r) || r, 1) || "";
  },
      Wr = "O,Moz,ms,Ms,Webkit".split(","),
      Qr = function (t, e, r) {
    var n = (e || br).style,
        i = 5;
    if (t in n && !r) return t;

    for (t = t.charAt(0).toUpperCase() + t.substr(1); i-- && !(Wr[i] + t in n););

    return i < 0 ? null : (3 === i ? "ms" : i >= 0 ? Wr[i] : "") + t;
  },
      Zr = function () {
    "undefined" != typeof window && window.document && (_r = window, vr = _r.document, yr = vr.documentElement, br = qr("div") || {
      style: {}
    }, Tr = qr("div"), Yr = Qr(Yr), Xr = Yr + "Origin", br.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Sr = !!Qr("perspective"), wr = 1);
  },
      Jr = function t(e) {
    var r,
        n = qr("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
        i = this.parentNode,
        o = this.nextSibling,
        s = this.style.cssText;
    if (yr.appendChild(n), n.appendChild(this), this.style.display = "block", e) try {
      r = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = t;
    } catch (t) {} else this._gsapBBox && (r = this._gsapBBox());
    return i && (o ? i.insertBefore(this, o) : i.appendChild(this)), yr.removeChild(n), this.style.cssText = s, r;
  },
      Kr = function (t, e) {
    for (var r = e.length; r--;) if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
  },
      tn = function (t) {
    var e;

    try {
      e = t.getBBox();
    } catch (r) {
      e = Jr.call(t, !0);
    }

    return e && (e.width || e.height) || t.getBBox === Jr || (e = Jr.call(t, !0)), !e || e.width || e.x || e.y ? e : {
      x: +Kr(t, ["x", "cx", "x1"]) || 0,
      y: +Kr(t, ["y", "cy", "y1"]) || 0,
      width: 0,
      height: 0
    };
  },
      en = function (t) {
    return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !tn(t));
  },
      rn = function (t, e) {
    if (e) {
      var r = t.style;
      e in Cr && e !== Xr && (e = Yr), r.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e), r.removeProperty(e.replace(kr, "-$1").toLowerCase())) : r.removeAttribute(e);
    }
  },
      nn = function (t, e, r, n, i, o) {
    var s = new hr(t._pt, e, r, 0, 1, o ? Gr : Lr);
    return t._pt = s, s.b = n, s.e = i, t._props.push(r), s;
  },
      on = {
    deg: 1,
    rad: 1,
    turn: 1
  },
      sn = function t(e, r, n, i) {
    var o,
        s,
        a,
        l,
        u = parseFloat(n) || 0,
        c = (n + "").trim().substr((u + "").length) || "px",
        f = br.style,
        h = Mr.test(r),
        d = "svg" === e.tagName.toLowerCase(),
        p = (d ? "client" : "offset") + (h ? "Width" : "Height"),
        g = "px" === i,
        m = "%" === i;
    return i === c || !u || on[i] || on[c] ? u : ("px" !== c && !g && (u = t(e, r, n, "px")), l = e.getCTM && en(e), !m && "%" !== c || !Cr[r] && !~r.indexOf("adius") ? (f[h ? "width" : "height"] = 100 + (g ? c : i), s = ~r.indexOf("adius") || "em" === i && e.appendChild && !d ? e : e.parentNode, l && (s = (e.ownerSVGElement || {}).parentNode), s && s !== vr && s.appendChild || (s = vr.body), (a = s._gsap) && m && a.width && h && a.time === Re.time ? Et(u / a.width * 100) : ((m || "%" === c) && (f.position = Vr(e, "position")), s === e && (f.position = "static"), s.appendChild(br), o = br[p], s.removeChild(br), f.position = "absolute", h && m && ((a = xt(s)).time = Re.time, a.width = s[p]), Et(g ? o * u / 100 : o && u ? 100 / o * u : 0))) : (o = l ? e.getBBox()[h ? "width" : "height"] : e[p], Et(m ? u / o * 100 : u / 100 * o)));
  },
      an = function (t, e, r, n) {
    var i;
    return wr || Zr(), e in Pr && "transform" !== e && ~(e = Pr[e]).indexOf(",") && (e = e.split(",")[0]), Cr[e] && "transform" !== e ? (i = vn(t, n), i = "transformOrigin" !== e ? i[e] : yn(Vr(t, Xr)) + " " + i.zOrigin + "px") : (!(i = t.style[e]) || "auto" === i || n || ~(i + "").indexOf("calc(")) && (i = fn[e] && fn[e](t, e, r) || Vr(t, e) || St(t, e) || ("opacity" === e ? 1 : 0)), r && !~(i + "").trim().indexOf(" ") ? sn(t, e, i, r) + r : i;
  },
      ln = function (t, e, r, n) {
    if (!r || "none" === r) {
      var i = Qr(e, t, 1),
          o = i && Vr(t, i, 1);
      o && o !== r ? (e = i, r = o) : "borderColor" === e && (r = Vr(t, "borderTopColor"));
    }

    var s,
        a,
        l,
        u,
        c,
        f,
        h,
        d,
        p,
        g,
        m,
        _,
        v = new hr(this._pt, t.style, e, 0, 1, sr),
        y = 0,
        w = 0;

    if (v.b = r, v.e = n, r += "", "auto" === (n += "") && (t.style[e] = n, n = Vr(t, e) || n, t.style[e] = r), Oe(s = [r, n]), n = s[1], l = (r = s[0]).match(rt) || [], (n.match(rt) || []).length) {
      for (; a = rt.exec(n);) h = a[0], p = n.substring(y, a.index), c ? c = (c + 1) % 5 : "rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5) || (c = 1), h !== (f = l[w++] || "") && (u = parseFloat(f) || 0, m = f.substr((u + "").length), (_ = "=" === h.charAt(1) ? +(h.charAt(0) + "1") : 0) && (h = h.substr(2)), d = parseFloat(h), g = h.substr((d + "").length), y = rt.lastIndex - g.length, g || (g = g || F.units[e] || m, y === n.length && (n += g, v.e += g)), m !== g && (u = sn(t, e, f, g) || 0), v._pt = {
        _next: v._pt,
        p: p || 1 === w ? p : ",",
        s: u,
        c: _ ? _ * d : d - u,
        m: c && c < 4 || "zIndex" === e ? Math.round : 0
      });

      v.c = y < n.length ? n.substring(y, n.length) : "";
    } else v.r = "display" === e && "none" === n ? Gr : Lr;

    return it.test(n) && (v.e = 0), this._pt = v, v;
  },
      un = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
  },
      cn = function (t, e) {
    if (e.tween && e.tween._time === e.tween._dur) {
      var r,
          n,
          i,
          o = e.t,
          s = o.style,
          a = e.u,
          l = o._gsap;
      if ("all" === a || !0 === a) s.cssText = "", n = 1;else for (i = (a = a.split(",")).length; --i > -1;) r = a[i], Cr[r] && (n = 1, r = "transformOrigin" === r ? Xr : Yr), rn(o, r);
      n && (rn(o, Yr), l && (l.svg && o.removeAttribute("transform"), vn(o, 1), l.uncache = 1));
    }
  },
      fn = {
    clearProps: function (t, e, r, n, i) {
      if ("isFromStart" !== i.data) {
        var o = t._pt = new hr(t._pt, e, r, 0, 0, cn);
        return o.u = n, o.pr = -10, o.tween = i, t._props.push(r), 1;
      }
    }
  },
      hn = [1, 0, 0, 1, 0, 0],
      dn = {},
      pn = function (t) {
    return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
  },
      gn = function (t) {
    var e = Vr(t, Yr);
    return pn(e) ? hn : e.substr(7).match(et).map(Et);
  },
      mn = function (t, e) {
    var r,
        n,
        i,
        o,
        s = t._gsap || xt(t),
        a = t.style,
        l = gn(t);
    return s.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (l = [(i = t.transform.baseVal.consolidate().matrix).a, i.b, i.c, i.d, i.e, i.f]).join(",") ? hn : l : (l !== hn || t.offsetParent || t === yr || s.svg || (i = a.display, a.display = "block", (r = t.parentNode) && t.offsetParent || (o = 1, n = t.nextSibling, yr.appendChild(t)), l = gn(t), i ? a.display = i : rn(t, "display"), o && (n ? r.insertBefore(t, n) : r ? r.appendChild(t) : yr.removeChild(t))), e && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l);
  },
      _n = function (t, e, r, n, i, o) {
    var s,
        a,
        l,
        u = t._gsap,
        c = i || mn(t, !0),
        f = u.xOrigin || 0,
        h = u.yOrigin || 0,
        d = u.xOffset || 0,
        p = u.yOffset || 0,
        g = c[0],
        m = c[1],
        _ = c[2],
        v = c[3],
        y = c[4],
        w = c[5],
        b = e.split(" "),
        T = parseFloat(b[0]) || 0,
        x = parseFloat(b[1]) || 0;
    r ? c !== hn && (a = g * v - m * _) && (l = T * (-m / a) + x * (g / a) - (g * w - m * y) / a, T = T * (v / a) + x * (-_ / a) + (_ * w - v * y) / a, x = l) : (T = (s = tn(t)).x + (~b[0].indexOf("%") ? T / 100 * s.width : T), x = s.y + (~(b[1] || b[0]).indexOf("%") ? x / 100 * s.height : x)), n || !1 !== n && u.smooth ? (y = T - f, w = x - h, u.xOffset = d + (y * g + w * _) - y, u.yOffset = p + (y * m + w * v) - w) : u.xOffset = u.yOffset = 0, u.xOrigin = T, u.yOrigin = x, u.smooth = !!n, u.origin = e, u.originIsAbsolute = !!r, t.style[Xr] = "0px 0px", o && (nn(o, u, "xOrigin", f, T), nn(o, u, "yOrigin", h, x), nn(o, u, "xOffset", d, u.xOffset), nn(o, u, "yOffset", p, u.yOffset)), t.setAttribute("data-svg-origin", T + " " + x);
  },
      vn = function (t, e) {
    var r = t._gsap || new Ue(t);
    if ("x" in r && !e && !r.uncache) return r;

    var n,
        i,
        o,
        s,
        a,
        l,
        u,
        c,
        f,
        h,
        d,
        p,
        g,
        m,
        _,
        v,
        y,
        w,
        b,
        T,
        x,
        S,
        C,
        E,
        O,
        R,
        k,
        M,
        A,
        P,
        D,
        z,
        I = t.style,
        L = r.scaleX < 0,
        G = Vr(t, Xr) || "0";

    return n = i = o = l = u = c = f = h = d = 0, s = a = 1, r.svg = !(!t.getCTM || !en(t)), m = mn(t, r.svg), r.svg && (E = !r.uncache && t.getAttribute("data-svg-origin"), _n(t, E || G, !!E || r.originIsAbsolute, !1 !== r.smooth, m)), p = r.xOrigin || 0, g = r.yOrigin || 0, m !== hn && (w = m[0], b = m[1], T = m[2], x = m[3], n = S = m[4], i = C = m[5], 6 === m.length ? (s = Math.sqrt(w * w + b * b), a = Math.sqrt(x * x + T * T), l = w || b ? Rr(b, w) * Er : 0, (f = T || x ? Rr(T, x) * Er + l : 0) && (a *= Math.cos(f * Or)), r.svg && (n -= p - (p * w + g * T), i -= g - (p * b + g * x))) : (z = m[6], P = m[7], k = m[8], M = m[9], A = m[10], D = m[11], n = m[12], i = m[13], o = m[14], u = (_ = Rr(z, A)) * Er, _ && (E = S * (v = Math.cos(-_)) + k * (y = Math.sin(-_)), O = C * v + M * y, R = z * v + A * y, k = S * -y + k * v, M = C * -y + M * v, A = z * -y + A * v, D = P * -y + D * v, S = E, C = O, z = R), c = (_ = Rr(-T, A)) * Er, _ && (v = Math.cos(-_), D = x * (y = Math.sin(-_)) + D * v, w = E = w * v - k * y, b = O = b * v - M * y, T = R = T * v - A * y), l = (_ = Rr(b, w)) * Er, _ && (E = w * (v = Math.cos(_)) + b * (y = Math.sin(_)), O = S * v + C * y, b = b * v - w * y, C = C * v - S * y, w = E, S = O), u && Math.abs(u) + Math.abs(l) > 359.9 && (u = l = 0, c = 180 - c), s = Et(Math.sqrt(w * w + b * b + T * T)), a = Et(Math.sqrt(C * C + z * z)), _ = Rr(S, C), f = Math.abs(_) > 2e-4 ? _ * Er : 0, d = D ? 1 / (D < 0 ? -D : D) : 0), r.svg && (E = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !pn(Vr(t, Yr)), E && t.setAttribute("transform", E))), Math.abs(f) > 90 && Math.abs(f) < 270 && (L ? (s *= -1, f += l <= 0 ? 180 : -180, l += l <= 0 ? 180 : -180) : (a *= -1, f += f <= 0 ? 180 : -180)), r.x = n - ((r.xPercent = n && (r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + "px", r.y = i - ((r.yPercent = i && (r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-i) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + "px", r.z = o + "px", r.scaleX = Et(s), r.scaleY = Et(a), r.rotation = Et(l) + "deg", r.rotationX = Et(u) + "deg", r.rotationY = Et(c) + "deg", r.skewX = f + "deg", r.skewY = h + "deg", r.transformPerspective = d + "px", (r.zOrigin = parseFloat(G.split(" ")[2]) || 0) && (I[Xr] = yn(G)), r.xOffset = r.yOffset = 0, r.force3D = F.force3D, r.renderTransform = r.svg ? xn : Sr ? Tn : bn, r.uncache = 0, r;
  },
      yn = function (t) {
    return (t = t.split(" "))[0] + " " + t[1];
  },
      wn = function (t, e, r) {
    var n = ie(e);
    return Et(parseFloat(e) + parseFloat(sn(t, "x", r + "px", n))) + n;
  },
      bn = function (t, e) {
    e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Tn(t, e);
  },
      Tn = function (t, e) {
    var r = e || this,
        n = r.xPercent,
        i = r.yPercent,
        o = r.x,
        s = r.y,
        a = r.z,
        l = r.rotation,
        u = r.rotationY,
        c = r.rotationX,
        f = r.skewX,
        h = r.skewY,
        d = r.scaleX,
        p = r.scaleY,
        g = r.transformPerspective,
        m = r.force3D,
        _ = r.target,
        v = r.zOrigin,
        y = "",
        w = "auto" === m && t && 1 !== t || !0 === m;

    if (v && ("0deg" !== c || "0deg" !== u)) {
      var b,
          T = parseFloat(u) * Or,
          x = Math.sin(T),
          S = Math.cos(T);
      T = parseFloat(c) * Or, b = Math.cos(T), o = wn(_, o, x * b * -v), s = wn(_, s, -Math.sin(T) * -v), a = wn(_, a, S * b * -v + v);
    }

    "0px" !== g && (y += "perspective(" + g + ") "), (n || i) && (y += "translate(" + n + "%, " + i + "%) "), (w || "0px" !== o || "0px" !== s || "0px" !== a) && (y += "0px" !== a || w ? "translate3d(" + o + ", " + s + ", " + a + ") " : "translate(" + o + ", " + s + ") "), "0deg" !== l && (y += "rotate(" + l + ") "), "0deg" !== u && (y += "rotateY(" + u + ") "), "0deg" !== c && (y += "rotateX(" + c + ") "), "0deg" === f && "0deg" === h || (y += "skew(" + f + ", " + h + ") "), 1 === d && 1 === p || (y += "scale(" + d + ", " + p + ") "), _.style[Yr] = y || "translate(0, 0)";
  },
      xn = function (t, e) {
    var r,
        n,
        i,
        o,
        s,
        a = e || this,
        l = a.xPercent,
        u = a.yPercent,
        c = a.x,
        f = a.y,
        h = a.rotation,
        d = a.skewX,
        p = a.skewY,
        g = a.scaleX,
        m = a.scaleY,
        _ = a.target,
        v = a.xOrigin,
        y = a.yOrigin,
        w = a.xOffset,
        b = a.yOffset,
        T = a.forceCSS,
        x = parseFloat(c),
        S = parseFloat(f);
    h = parseFloat(h), d = parseFloat(d), (p = parseFloat(p)) && (d += p = parseFloat(p), h += p), h || d ? (h *= Or, d *= Or, r = Math.cos(h) * g, n = Math.sin(h) * g, i = Math.sin(h - d) * -m, o = Math.cos(h - d) * m, d && (p *= Or, s = Math.tan(d - p), i *= s = Math.sqrt(1 + s * s), o *= s, p && (s = Math.tan(p), r *= s = Math.sqrt(1 + s * s), n *= s)), r = Et(r), n = Et(n), i = Et(i), o = Et(o)) : (r = g, o = m, n = i = 0), (x && !~(c + "").indexOf("px") || S && !~(f + "").indexOf("px")) && (x = sn(_, "x", c, "px"), S = sn(_, "y", f, "px")), (v || y || w || b) && (x = Et(x + v - (v * r + y * i) + w), S = Et(S + y - (v * n + y * o) + b)), (l || u) && (s = _.getBBox(), x = Et(x + l / 100 * s.width), S = Et(S + u / 100 * s.height)), s = "matrix(" + r + "," + n + "," + i + "," + o + "," + x + "," + S + ")", _.setAttribute("transform", s), T && (_.style[Yr] = s);
  },
      Sn = function (t, e, r, n, i, o) {
    var s,
        a,
        l = H(i),
        u = parseFloat(i) * (l && ~i.indexOf("rad") ? Er : 1),
        c = o ? u * o : u - n,
        f = n + c + "deg";
    return l && ("short" === (s = i.split("_")[1]) && (c %= 360) !== c % 180 && (c += c < 0 ? 360 : -360), "cw" === s && c < 0 ? c = (c + 36e9) % 360 - 360 * ~~(c / 360) : "ccw" === s && c > 0 && (c = (c - 36e9) % 360 - 360 * ~~(c / 360))), t._pt = a = new hr(t._pt, e, r, n, c, zr), a.e = f, a.u = "deg", t._props.push(r), a;
  },
      Cn = function (t, e, r) {
    var n,
        i,
        o,
        s,
        a,
        l,
        u,
        c = Tr.style,
        f = r._gsap;

    for (i in c.cssText = getComputedStyle(r).cssText + ";position:absolute;display:block;", c[Yr] = e, vr.body.appendChild(Tr), n = vn(Tr, 1), Cr) (o = f[i]) !== (s = n[i]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(i) < 0 && (a = ie(o) !== (u = ie(s)) ? sn(r, i, o, u) : parseFloat(o), l = parseFloat(s), t._pt = new hr(t._pt, f, i, a, l - a, Dr), t._pt.u = u || 0, t._props.push(i));

    vr.body.removeChild(Tr);
  };

  Ct("padding,margin,Width,Radius", function (t, e) {
    var r = "Top",
        n = "Right",
        i = "Bottom",
        o = "Left",
        s = (e < 3 ? [r, n, i, o] : [r + o, r + n, i + n, i + o]).map(function (r) {
      return e < 2 ? t + r : "border" + r + t;
    });

    fn[e > 1 ? "border" + t : t] = function (t, e, r, n, i) {
      var o, a;
      if (arguments.length < 4) return o = s.map(function (e) {
        return an(t, e, r);
      }), 5 === (a = o.join(" ")).split(o[0]).length ? o[0] : a;
      o = (n + "").split(" "), a = {}, s.forEach(function (t, e) {
        return a[t] = o[e] = o[e] || o[(e - 1) / 2 | 0];
      }), t.init(e, a, i);
    };
  });
  var En,
      On,
      Rn = {
    name: "css",
    register: Zr,
    targetTest: function (t) {
      return t.style && t.nodeType;
    },
    init: function (t, e, r, n, i) {
      var o,
          s,
          a,
          l,
          u,
          c,
          f,
          h,
          d,
          p,
          g,
          m,
          _,
          v,
          y,
          w,
          b,
          T,
          x,
          S = this._props,
          C = t.style,
          E = r.vars.startAt;

      for (f in wr || Zr(), e) if ("autoRound" !== f && (s = e[f], !_t[f] || !qe(f, e, r, n, t, i))) if (u = typeof s, c = fn[f], "function" === u && (u = typeof (s = s.call(r, n, t, i))), "string" === u && ~s.indexOf("random(") && (s = pe(s)), c) c(this, t, f, s, r) && (y = 1);else if ("--" === f.substr(0, 2)) o = (getComputedStyle(t).getPropertyValue(f) + "").trim(), s += "", h = ie(o), (d = ie(s)) ? h !== d && (o = sn(t, f, o, d) + d) : h && (s += h), this.add(C, "setProperty", o, s, n, i, 0, 0, f);else if ("undefined" !== u) {
        if (E && f in E ? (o = "function" == typeof E[f] ? E[f].call(r, n, t, i) : E[f], f in F.units && !ie(o) && (o += F.units[f]), "=" === (o + "").charAt(1) && (o = an(t, f))) : o = an(t, f), l = parseFloat(o), (p = "string" === u && "=" === s.charAt(1) ? +(s.charAt(0) + "1") : 0) && (s = s.substr(2)), a = parseFloat(s), f in Pr && ("autoAlpha" === f && (1 === l && "hidden" === an(t, "visibility") && a && (l = 0), nn(this, C, "visibility", l ? "inherit" : "hidden", a ? "inherit" : "hidden", !a)), "scale" !== f && "transform" !== f && ~(f = Pr[f]).indexOf(",") && (f = f.split(",")[0])), g = f in Cr) {
          if (m || ((_ = t._gsap).renderTransform && !e.parseTransform || vn(t, e.parseTransform), v = !1 !== e.smoothOrigin && _.smooth, (m = this._pt = new hr(this._pt, C, Yr, 0, 1, _.renderTransform, _, 0, -1)).dep = 1), "scale" === f) this._pt = new hr(this._pt, _, "scaleY", _.scaleY, p ? p * a : a - _.scaleY), S.push("scaleY", f), f += "X";else {
            if ("transformOrigin" === f) {
              b = void 0, T = void 0, x = void 0, b = (w = s).split(" "), T = b[0], x = b[1] || "50%", "top" !== T && "bottom" !== T && "left" !== x && "right" !== x || (w = T, T = x, x = w), b[0] = un[T] || T, b[1] = un[x] || x, s = b.join(" "), _.svg ? _n(t, s, 0, v, 0, this) : ((d = parseFloat(s.split(" ")[2]) || 0) !== _.zOrigin && nn(this, _, "zOrigin", _.zOrigin, d), nn(this, C, f, yn(o), yn(s)));
              continue;
            }

            if ("svgOrigin" === f) {
              _n(t, s, 1, v, 0, this);

              continue;
            }

            if (f in dn) {
              Sn(this, _, f, l, s, p);
              continue;
            }

            if ("smoothOrigin" === f) {
              nn(this, _, "smooth", _.smooth, s);
              continue;
            }

            if ("force3D" === f) {
              _[f] = s;
              continue;
            }

            if ("transform" === f) {
              Cn(this, s, t);
              continue;
            }
          }
        } else f in C || (f = Qr(f) || f);
        if (g || (a || 0 === a) && (l || 0 === l) && !Ar.test(s) && f in C) a || (a = 0), (h = (o + "").substr((l + "").length)) !== (d = ie(s) || (f in F.units ? F.units[f] : h)) && (l = sn(t, f, o, d)), this._pt = new hr(this._pt, g ? _ : C, f, l, p ? p * a : a - l, g || "px" !== d && "zIndex" !== f || !1 === e.autoRound ? Dr : Ir), this._pt.u = d || 0, h !== d && (this._pt.b = o, this._pt.r = Fr);else if (f in C) ln.call(this, t, f, o, s);else {
          if (!(f in t)) {
            ct(f, s);
            continue;
          }

          this.add(t, f, t[f], s, n, i);
        }
        S.push(f);
      }

      y && fr(this);
    },
    get: an,
    aliases: Pr,
    getSetter: function (t, e, r) {
      var n = Pr[e];
      return n && n.indexOf(",") < 0 && (e = n), e in Cr && e !== Xr && (t._gsap.x || an(t, "x")) ? r && xr === r ? "scale" === e ? $r : Ur : (xr = r || {}) && ("scale" === e ? jr : Hr) : t.style && !q(t.style[e]) ? Nr : ~e.indexOf("-") ? Br : nr(t, e);
    },
    core: {
      _removeProperty: rn,
      _getMatrix: mn
    }
  };
  mr.utils.checkPrefix = Qr, On = Ct("x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + (En = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", function (t) {
    Cr[t] = 1;
  }), Ct(En, function (t) {
    F.units[t] = "deg", dn[t] = 1;
  }), Pr[On[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + En, Ct("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", function (t) {
    var e = t.split(":");
    Pr[e[1]] = On[e[0]];
  }), Ct("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (t) {
    F.units[t] = "px";
  }), mr.registerPlugin(Rn);
  var kn,
      Mn = (mr.registerPlugin(Rn) || mr).core.Tween;
  kn = {
    ScrollMagicPluginGsap: function (t, e, r) {
      var n = e,
          i = "animation.gsap",
          o = window.console || {},
          s = Function.prototype.bind.call(o.error || o.log || function () {}, o);
      t || s("(" + i + ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs."), n || s("(" + i + ") -> ERROR: TweenLite or TweenMax could not be found. Please make sure GSAP is loaded before ScrollMagic or use an asynchronous loader like requirejs."), t.Scene.addOption("tweenChanges", !1, function (t) {
        return !!t;
      }), t.Scene.extend(function () {
        var t,
            e = this,
            o = function () {
          e._log && (Array.prototype.splice.call(arguments, 1, 0, "(" + i + ")", "->"), e._log.apply(this, arguments));
        };

        e.on("progress.plugin_gsap", function () {
          s();
        }), e.on("destroy.plugin_gsap", function (t) {
          e.removeTween(t.reset);
        });

        var s = function () {
          if (t) {
            var r = e.progress(),
                n = e.state();
            t.repeat && -1 === t.repeat() ? "DURING" === n && t.paused() ? t.play() : "DURING" === n || t.paused() || t.pause() : r != t.progress() && (0 === e.duration() ? r > 0 ? t.play() : t.reverse() : e.tweenChanges() && t.tweenTo ? t.tweenTo(r * t.duration()) : t.progress(r).pause());
          }
        };

        e.setTween = function (i, a, l) {
          var u;
          arguments.length > 1 && (arguments.length < 3 && (l = a, a = 1), i = n.to(i, a, l));

          try {
            (u = r ? new r({
              smoothChildTiming: !0
            }).add(i) : i).pause();
          } catch (t) {
            return o(1, "ERROR calling method 'setTween()': Supplied argument is not a valid TweenObject"), e;
          }

          if (t && e.removeTween(), t = u, i.repeat && -1 === i.repeat() && (t.repeat(-1), t.yoyo(i.yoyo())), e.tweenChanges() && !t.tweenTo && o(2, "WARNING: tweenChanges will only work if the TimelineMax object is available for ScrollMagic."), t && e.controller() && e.triggerElement() && e.loglevel() >= 2) {
            var c = n.getTweensOf(e.triggerElement()),
                f = e.controller().info("vertical");
            c.forEach(function (t, e) {
              var r = t.vars.css || t.vars;
              if (f ? void 0 !== r.top || void 0 !== r.bottom : void 0 !== r.left || void 0 !== r.right) return o(2, "WARNING: Tweening the position of the trigger element affects the scene timing and should be avoided!"), !1;
            });
          }

          if (parseFloat(n.version) >= 1.14) for (var h, d, p = t.getChildren ? t.getChildren(!0, !0, !1) : [t], g = function () {
            o(2, "WARNING: tween was overwritten by another. To learn how to avoid this issue see here: https://github.com/janpaepke/ScrollMagic/wiki/WARNING:-tween-was-overwritten-by-another");
          }, m = 0; m < p.length; m++) h = p[m], d !== g && (d = h.vars.onOverwrite, h.vars.onOverwrite = function () {
            d && d.apply(this, arguments), g.apply(this, arguments);
          });
          return o(3, "added tween"), s(), e;
        }, e.removeTween = function (r) {
          return t && (r && t.progress(0).pause(), t.kill(), t = void 0, o(3, "removed tween (reset: " + (r ? "true" : "false") + ")")), e;
        };
      });
    }
  };
  var An,
      Pn = {};

  function Dn(t) {
    return (Dn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t;
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    })(t);
  }

  An = Pn, function (t) {
    var e = "0.85em",
        r = "9999",
        n = t._util,
        i = 0;
    t.Scene.extend(function () {
      var t,
          e = this;
      e.addIndicators = function (r) {
        var s;
        return t || (s = {
          name: "",
          indent: 0,
          parent: void 0,
          colorStart: "green",
          colorEnd: "red",
          colorTrigger: "blue"
        }, r = n.extend({}, s, r), i++, t = new o(e, r), e.on("add.plugin_addIndicators", t.add), e.on("remove.plugin_addIndicators", t.remove), e.on("destroy.plugin_addIndicators", e.removeIndicators), e.controller() && t.add()), e;
      }, e.removeIndicators = function () {
        return t && (t.remove(), this.off("*.plugin_addIndicators"), t = void 0), e;
      };
    }), t.Controller.addOption("addIndicators", !1), t.Controller.extend(function () {
      var e = this,
          r = e.info(),
          i = r.container,
          o = r.isDocument,
          s = r.vertical,
          a = {
        groups: []
      };

      function l() {
        a.updateBoundsPositions();
      }

      function u() {
        a.updateTriggerGroupPositions();
      }

      return this._indicators = a, i.addEventListener("resize", u), o || (window.addEventListener("resize", u), window.addEventListener("scroll", u)), i.addEventListener("resize", l), i.addEventListener("scroll", l), this._indicators.updateBoundsPositions = function (t) {
        for (var e, r, o, l = t ? [n.extend({}, t.triggerGroup, {
          members: [t]
        })] : a.groups, u = l.length, c = {}, f = s ? "left" : "top", h = s ? "width" : "height", d = s ? n.get.scrollLeft(i) + n.get.width(i) - 15 : n.get.scrollTop(i) + n.get.height(i) - 15; u--;) for (e = (o = l[u]).members.length, r = n.get[h](o.element.firstChild); e--;) c[f] = d - r, n.css(o.members[e].bounds, c);
      }, this._indicators.updateTriggerGroupPositions = function (t) {
        for (var r, l, u, c, f = t ? [t] : a.groups, h = f.length, d = o ? document.body : i, p = o ? {
          top: 0,
          left: 0
        } : n.get.offset(d, !0), g = s ? n.get.width(i) - 15 : n.get.height(i) - 15, m = s ? "width" : "height", _ = s ? "Y" : "X"; h--;) l = (r = f[h]).element, u = r.triggerHook * e.info("size"), c = n.get[m](l.firstChild.firstChild) < u ? "translate" + _ + "(-100%)" : "", n.css(l, {
          top: p.top + (s ? u : g - r.members[0].options.indent),
          left: p.left + (s ? g - r.members[0].options.indent : u)
        }), n.css(l.firstChild.firstChild, {
          "-ms-transform": c,
          "-webkit-transform": c,
          transform: c
        });
      }, this._indicators.updateTriggerGroupLabel = function (t) {
        var e = "trigger" + (1 < t.members.length ? "" : " " + t.members[0].options.name),
            r = t.element.firstChild.firstChild;
        r.textContent !== e && (r.textContent = e, s && a.updateBoundsPositions());
      }, this.addScene = function (r) {
        this._options.addIndicators && r instanceof t.Scene && r.controller() === e && r.addIndicators(), this.$super.addScene.apply(this, arguments);
      }, this.destroy = function () {
        i.removeEventListener("resize", u), o || (window.removeEventListener("resize", u), window.removeEventListener("scroll", u)), i.removeEventListener("resize", l), i.removeEventListener("scroll", l), this.$super.destroy.apply(this, arguments);
      }, e;
    });

    var o = function (t, e) {
      var r,
          o,
          a = this,
          l = s.bounds(),
          u = s.start(e.colorStart),
          c = s.end(e.colorEnd),
          f = e.parent && n.get.elements(e.parent)[0];
      e.name = e.name || i, u.firstChild.textContent += " " + e.name, c.textContent += " " + e.name, l.appendChild(u), l.appendChild(c), a.options = e, a.bounds = l, a.triggerGroup = void 0, this.add = function () {
        o = t.controller(), r = o.info("vertical");
        var e = o.info("isDocument");
        f = f || (e ? document.body : o.info("container")), e || "static" !== n.css(f, "position") || n.css(f, {
          position: "relative"
        }), t.on("change.plugin_addIndicators", d), t.on("shift.plugin_addIndicators", h), _(), g(), setTimeout(function () {
          o._indicators.updateBoundsPositions(a);
        }, 0);
      }, this.remove = function () {
        var e;
        a.triggerGroup && (t.off("change.plugin_addIndicators", d), t.off("shift.plugin_addIndicators", h), 1 < a.triggerGroup.members.length ? ((e = a.triggerGroup).members.splice(e.members.indexOf(a), 1), o._indicators.updateTriggerGroupLabel(e), o._indicators.updateTriggerGroupPositions(e), a.triggerGroup = void 0) : m(), p());
      };

      var h = function () {
        g();
      },
          d = function (t) {
        "triggerHook" === t.what && _();
      },
          p = function () {
        l.parentNode.removeChild(l);
      },
          g = function () {
        var i;
        l.parentNode !== f && (i = o.info("vertical"), n.css(u.firstChild, {
          "border-bottom-width": i ? 1 : 0,
          "border-right-width": i ? 0 : 1,
          bottom: i ? -1 : e.indent,
          right: i ? e.indent : -1,
          padding: i ? "0 8px" : "2px 4px"
        }), n.css(c, {
          "border-top-width": i ? 1 : 0,
          "border-left-width": i ? 0 : 1,
          top: i ? "100%" : "",
          right: i ? e.indent : "",
          bottom: i ? "" : e.indent,
          left: i ? "" : "100%",
          padding: i ? "0 8px" : "2px 4px"
        }), f.appendChild(l));
        var s = {};
        s[r ? "top" : "left"] = t.triggerPosition(), s[r ? "height" : "width"] = t.duration(), n.css(l, s), n.css(c, {
          display: 0 < t.duration() ? "" : "none"
        });
      },
          m = function () {
        o._indicators.groups.splice(o._indicators.groups.indexOf(a.triggerGroup), 1), a.triggerGroup.element.parentNode.removeChild(a.triggerGroup.element), a.triggerGroup = void 0;
      },
          _ = function () {
        var i = t.triggerHook();

        if (!(a.triggerGroup && Math.abs(a.triggerGroup.triggerHook - i) < 1e-4)) {
          for (var l, u = o._indicators.groups, c = u.length; c--;) if (l = u[c], Math.abs(l.triggerHook - i) < 1e-4) return a.triggerGroup && (1 === a.triggerGroup.members.length ? m() : (a.triggerGroup.members.splice(a.triggerGroup.members.indexOf(a), 1), o._indicators.updateTriggerGroupLabel(a.triggerGroup), o._indicators.updateTriggerGroupPositions(a.triggerGroup))), l.members.push(a), a.triggerGroup = l, void o._indicators.updateTriggerGroupLabel(l);

          if (a.triggerGroup) {
            if (1 === a.triggerGroup.members.length) return a.triggerGroup.triggerHook = i, void o._indicators.updateTriggerGroupPositions(a.triggerGroup);
            a.triggerGroup.members.splice(a.triggerGroup.members.indexOf(a), 1), o._indicators.updateTriggerGroupLabel(a.triggerGroup), o._indicators.updateTriggerGroupPositions(a.triggerGroup), a.triggerGroup = void 0;
          }

          !function () {
            var i = s.trigger(e.colorTrigger),
                l = {};
            l[r ? "right" : "bottom"] = 0, l[r ? "border-top-width" : "border-left-width"] = 1, n.css(i.firstChild, l), n.css(i.firstChild.firstChild, {
              padding: r ? "0 8px 3px 8px" : "3px 4px"
            }), document.body.appendChild(i);
            var u = {
              triggerHook: t.triggerHook(),
              element: i,
              members: [a]
            };
            o._indicators.groups.push(u), a.triggerGroup = u, o._indicators.updateTriggerGroupLabel(u), o._indicators.updateTriggerGroupPositions(u);
          }();
        }
      };
    },
        s = {
      start: function (t) {
        var e = document.createElement("div");
        e.textContent = "start", n.css(e, {
          position: "absolute",
          overflow: "visible",
          "border-width": 0,
          "border-style": "solid",
          color: t,
          "border-color": t
        });
        var r = document.createElement("div");
        return n.css(r, {
          position: "absolute",
          overflow: "visible",
          width: 0,
          height: 0
        }), r.appendChild(e), r;
      },
      end: function (t) {
        var e = document.createElement("div");
        return e.textContent = "end", n.css(e, {
          position: "absolute",
          overflow: "visible",
          "border-width": 0,
          "border-style": "solid",
          color: t,
          "border-color": t
        }), e;
      },
      bounds: function () {
        var t = document.createElement("div");
        return n.css(t, {
          position: "absolute",
          overflow: "visible",
          "white-space": "nowrap",
          "pointer-events": "none",
          "font-size": e
        }), t.style.zIndex = r, t;
      },
      trigger: function (t) {
        var i = document.createElement("div");
        i.textContent = "trigger", n.css(i, {
          position: "relative"
        });
        var o = document.createElement("div");
        n.css(o, {
          position: "absolute",
          overflow: "visible",
          "border-width": 0,
          "border-style": "solid",
          color: t,
          "border-color": t
        }), o.appendChild(i);
        var s = document.createElement("div");
        return n.css(s, {
          position: "fixed",
          overflow: "visible",
          "white-space": "nowrap",
          "pointer-events": "none",
          "font-size": e
        }), s.style.zIndex = r, s.appendChild(o), s;
      }
    };
  }("object" == typeof Pn ? r() : An.ScrollMagic || An.jQuery && An.jQuery.ScrollMagic);
  var zn,
      Fn = (zn = t) && zn.__esModule ? zn.default : zn;
  kn.ScrollMagicPluginGsap(Fn, Mn, je), $(window).on("load", function () {
    var t,
        e,
        r,
        n = $(".js-menu-trigger"),
        o = $(".section__sub"),
        s = $(".js-main-nav-item"),
        a = $(".sub-nav"),
        l = "";

    function u(t) {
      return ".sub-nav__icon--".concat(t + 1);
    }

    "agencies" === (l = function (t) {
      var e,
          r,
          n = window.location.search.substring(1).split("&");

      for (r = 0; r < n.length; r++) if ((e = n[r].split("="))[0] === t) return void 0 === Dn(e[1]) || decodeURIComponent(e[1]);

      return !1;
    }("from")) && console.log(l), "pharma" === l && console.log(l), function () {
      var t = new Fn.Controller();
      new Fn.Scene({
        triggerElement: ".js-float-start",
        triggerHook: .6,
        offset: 0
      }).on("enter", function () {
        a.addClass("sub-nav--active");
      }).on("leave", function () {
        a.removeClass("sub-nav--active");
      }).addTo(t), new Fn.Scene({
        triggerElement: ".js-float-end",
        triggerHook: .5
      }).on("enter", function () {
        a.removeClass("sub-nav--active");
      }).on("leave", function () {
        a.addClass("sub-nav--active");
      }).addTo(t);

      for (var e = function (e) {
        new Fn.Scene({
          triggerElement: n[e],
          triggerHook: .6,
          duration: n[e].scrollHeight
        }).on("enter", function () {
          $(s[e]).addClass("active");
        }).on("leave", function () {
          $(s[e]).removeClass("active");
        }).addTo(t);
      }, r = 0; r < n.length; r++) e(r);

      for (var i = function (e) {
        new Fn.Scene({
          triggerElement: o[e],
          triggerHook: .8,
          duration: o[e].scrollHeight
        }).on("enter", function () {
          var t;
          t = u(e), $(t).addClass("active");
        }).on("leave", function () {
          var t;
          t = u(e), $(t).removeClass("active");
        }).addTo(t);
      }, l = 0; l < o.length; l++) i(l);
    }(), (t = $(".main-nav__burger")).on("click", function () {
      $(this).toggleClass("open"), $(".main-nav__menu").toggleClass("main-nav__menu--open");
    }), $(".table-1__btns").on("click", function () {
      $(".table-1__btns").toggleClass("table-1__btns--open");
    }), $("a[href^='#']").click(function (e) {
      e.preventDefault(), t.removeClass("open"), $(".main-nav__menu").removeClass("main-nav__menu--open");
      var r = $(this).attr("href");
      $("html,body").animate({
        scrollTop: $(r).offset().top
      }, "slow");
    }), $(".bottles__item").hover(function () {
      $(this).addClass("active");
    }, function () {
      $(this).removeClass("active");
    }), e = document.querySelector("#variantsTable"), (r = new i(e)).selectGroup([1, 2]), $(".table-1__btn").click(function (t) {
      t.preventDefault();
      var e = $(this).attr("data-targetgroup");
      $(this).toggleClass("table-1__btn--active"), r.selectGroup(e);
    });
  });
}();
},{}]},{},["147cbb8ff972880d7683346f6de03848","e19e331ef1f0b227ca95cc1a8d421045"], null)

//# sourceMappingURL=uptest.github.io.35353ab8.e6873695.js.map

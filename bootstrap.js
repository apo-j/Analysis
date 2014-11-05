/**
 * Created by xyj on 05/11/2014.
 */
function getIndexTopology(a, b, c) {
    resource.getResources(["scriptLoader", "BrowserUtils", "ExperimentsList"], function (d) {
        function e(a, b, c, d, e) {
            function h(a) {
                if (a = g(a), b.aliases)for (var c in b.aliases) {
                    var d = b.aliases[c], e = c;
                    e !== d && void 0 !== a[e] && (a[d] = a[e], delete a[e])
                }
                return a
            }

            function i(a) {
                if (a = g(a), b.baseUrls)for (var c in a)void 0 !== b.baseUrls[c] && (a[c] = b.baseUrls[c]);
                return a
            }

            function j(a, b) {
                var c = [];
                for (var e in a)if (!l(e)) {
                    var f = d.debug || d.debugModeArtifacts && d.debugModeArtifacts[e], g = b(f);
                    c.push(a[e] + "/" + g)
                }
                return c
            }

            function l(a) {
                return b.exclude && void 0 !== b.exclude[a] || b.baseUrls && void 0 !== b.baseUrls[a]
            }

            var m = h(a);
            m = i(m), m = f(m), m = k(m, b), e({manifestsUrls: j(m, c), all: m})
        }

        function f(a) {
            return Object.keys(a).reduce(function (b, c) {
                return b[c] = a[c].replace(/\/$/, ""), b
            }, {})
        }

        function g(a) {
            var b = {};
            for (var c in a)b[c] = a[c];
            return b
        }

        function h(a) {
            return a ? "index.debug.json" : "index.json"
        }

        function i(a, b, c) {
            var d = j();
            e(d, b, h, a, c)
        }

        function j() {
            var a = m(), b = n(), c = serviceTopology.scriptsLocationMap;
            return l(c, a, b)
        }

        function k(a, b) {
            var c = {};
            if (b["main-artifacts"]) {
                var e = d.ExperimentsList.getExperimentsList();
                return Object.keys(a).forEach(function (d) {
                    (e[d] || b["main-artifacts"].lastIndexOf(d) > -1) && (c[d] = a[d])
                }), c
            }
            return a
        }

        function l(a, b, c) {
            try {
                Object.keys(b).forEach(function (c) {
                    a[c] = b[c]
                }), Object.keys(c).forEach(function (b) {
                    "string" == typeof a[b] && (a[b] = a[b].replace(/\b\d+\.\d+\.\d+(?=\/|$)/, c[b]))
                })
            } catch (d) {
            }
            return a
        }

        function m() {
            try {
                var a = d.BrowserUtils.getQueryParams().override_map;
                if (a)return JSON.parse(a)
            } catch (b) {
            }
            return{}
        }

        function n() {
            var a = {};
            try {
                var b = d.BrowserUtils.getQueryParams().override_versions || [];
                b.forEach(function (b) {
                    for (var c, d = /([^:]+):([^,]+),?/g; c = d.exec(b);)a[c[1]] = c[2]
                });
                var c = a["html-client"];
                c && (delete a["html-client"], a.bootstrap = a.core = a.web = a.skins = c)
            } catch (e) {
            }
            return a
        }

        i(a, b, c)
    })
}
function Logger(a) {
    this.setSettings(a)
}
function Define(a) {
    this._id = Define._id ? ++Define._id : 1, this._definitions = {}, this._addArrayOfDefinitions(a)
}
!function (a) {
    "function" == typeof define ? define(a) : "function" == typeof YUI ? YUI.add("es5-sham", a) : a()
}(function () {
    function a(a) {
        try {
            return Object.defineProperty(a, "sentinel", {}), "sentinel"in a
        } catch (b) {
        }
    }

    if (Object.getPrototypeOf || (Object.getPrototypeOf = function (a) {
        return a.__proto__ || (a.constructor ? a.constructor.prototype : prototypeOfObject)
    }), Object.getOwnPropertyDescriptor || (Object.getOwnPropertyDescriptor = function (a, b) {
        if ("object" != typeof a && "function" != typeof a || null === a)throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: " + a);
        if (owns(a, b)) {
            var c = {enumerable: !0, configurable: !0};
            if (supportsAccessors) {
                var d = a.__proto__;
                a.__proto__ = prototypeOfObject;
                var e = lookupGetter(a, b), f = lookupSetter(a, b);
                if (a.__proto__ = d, e || f)return e && (c.get = e), f && (c.set = f), c
            }
            return c.value = a[b], c
        }
    }), Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function (a) {
        return Object.keys(a)
    }), !Object.create) {
        var b;
        if (null === Object.prototype.__proto__ || "undefined" == typeof document)b = function () {
            return{__proto__: null}
        }; else {
            var c = function () {
            }, d = document.createElement("iframe"), e = document.body || document.documentElement;
            d.style.display = "none", e.appendChild(d), d.src = "javascript:";
            var f = d.contentWindow.Object.prototype;
            e.removeChild(d), d = null, delete f.constructor, delete f.hasOwnProperty, delete f.propertyIsEnumerable, delete f.isPrototypeOf, delete f.toLocaleString, delete f.toString, delete f.valueOf, f.__proto__ = null, c.prototype = f, b = function () {
                return new c
            }
        }
        Object.create = function (a, c) {
            function d() {
            }

            var e;
            if (null === a)e = b(); else {
                if ("object" != typeof a && "function" != typeof a)throw new TypeError("Object prototype may only be an Object or null");
                d.prototype = a, e = new d, e.__proto__ = a
            }
            return void 0 !== c && Object.defineProperties(e, c), e
        }
    }
    if (Object.defineProperty && (d = a({}), e = "undefined" == typeof document || a(document.createElement("div")), !d || !e))var g = Object.defineProperty, h = Object.defineProperties;
    (!Object.defineProperty || g) && (Object.defineProperty = function (a, b, c) {
        if ("object" != typeof a && "function" != typeof a || null === a)throw new TypeError("Object.defineProperty called on non-object: " + a);
        if ("object" != typeof c && "function" != typeof c || null === c)throw new TypeError("Property description must be an object: " + c);
        if (g)try {
            return g.call(Object, a, b, c)
        } catch (d) {
        }
        if (owns(c, "value"))if (supportsAccessors && (lookupGetter(a, b) || lookupSetter(a, b))) {
            var e = a.__proto__;
            a.__proto__ = prototypeOfObject, delete a[b], a[b] = c.value, a.__proto__ = e
        } else a[b] = c.value; else {
            if (!supportsAccessors)throw new TypeError("getters & setters can not be defined on this javascript engine");
            owns(c, "get") && defineGetter(a, b, c.get), owns(c, "set") && defineSetter(a, b, c.set)
        }
        return a
    }), (!Object.defineProperties || h) && (Object.defineProperties = function (a, b) {
        if (h)try {
            return h.call(Object, a, b)
        } catch (c) {
        }
        for (var d in b)owns(b, d) && "__proto__" != d && Object.defineProperty(a, d, b[d]);
        return a
    }), Object.seal || (Object.seal = function (a) {
        return a
    }), Object.freeze || (Object.freeze = function (a) {
        return a
    });
    try {
        Object.freeze(function () {
        })
    } catch (i) {
        var j = Object.freeze;
        Object.freeze = function (a) {
            return"function" == typeof a ? a : j(a)
        }
    }
    Object.preventExtensions || (Object.preventExtensions = function (a) {
        return a
    }), Object.isSealed || (Object.isSealed = function () {
        return!1
    }), Object.isFrozen || (Object.isFrozen = function () {
        return!1
    }), Object.isExtensible || (Object.isExtensible = function (a) {
        if (Object(a) !== a)throw new TypeError;
        for (var b = ""; owns(a, b);)b += "?";
        a[b] = !0;
        var c = owns(a, b);
        return delete a[b], c
    })
}), function (a) {
    "function" == typeof define ? define(a) : "function" == typeof YUI ? YUI.add("es5", a) : a()
}(function () {
    function a(a) {
        return a = +a, a !== a ? a = 0 : 0 !== a && a !== 1 / 0 && a !== -(1 / 0) && (a = (a > 0 || -1) * Math.floor(Math.abs(a))), a
    }

    function b(a) {
        var b = typeof a;
        return null === a || "undefined" === b || "boolean" === b || "number" === b || "string" === b
    }

    Function.prototype.bind || (Function.prototype.bind = function (a) {
        var b = this;
        if ("function" != typeof b)throw new TypeError("Function.prototype.bind called on incompatible " + b);
        var c = e.call(arguments, 1), d = function () {
            if (this instanceof d) {
                var f = b.apply(this, c.concat(e.call(arguments)));
                return Object(f) === f ? f : this
            }
            return b.apply(a, c.concat(e.call(arguments)))
        };
        return b.prototype && (d.prototype = Object.create(b.prototype)), d
    });
    var c = Function.prototype.call, d = Object.prototype, e = Array.prototype.slice, f = c.bind(d.toString), g = c.bind(d.hasOwnProperty);
    if (g(d, "__defineGetter__") && (c.bind(d.__defineGetter__), c.bind(d.__defineSetter__), c.bind(d.__lookupGetter__), c.bind(d.__lookupSetter__)), 2 != [1, 2].splice(0).length) {
        var h = Array.prototype.splice;
        Array.prototype.splice = function (a, b) {
            return arguments.length ? h.apply(this, [void 0 === a ? 0 : a, void 0 === b ? this.length - a : b].concat(e.call(arguments, 2))) : []
        }
    }
    if (1 != [].unshift(0)) {
        var i = Array.prototype.unshift;
        Array.prototype.unshift = function () {
            return i.apply(this, arguments), this.length
        }
    }
    Array.isArray || (Array.isArray = function (a) {
        return"[object Array]" == f(a)
    });
    var c = Object("a"), j = "a" != c[0] || !(0 in c);
    if (Array.prototype.forEach || (Array.prototype.forEach = function (a, b) {
        var c = z(this), d = j && "[object String]" == f(this) ? this.split("") : c, e = -1, g = d.length >>> 0;
        if ("[object Function]" != f(a))throw new TypeError;
        for (; ++e < g;)e in d && a.call(b, d[e], e, c)
    }), Array.prototype.map || (Array.prototype.map = function (a, b) {
        var c = z(this), d = j && "[object String]" == f(this) ? this.split("") : c, e = d.length >>> 0, g = Array(e);
        if ("[object Function]" != f(a))throw new TypeError(a + " is not a function");
        for (var h = 0; e > h; h++)h in d && (g[h] = a.call(b, d[h], h, c));
        return g
    }), Array.prototype.filter || (Array.prototype.filter = function (a, b) {
        var c, d = z(this), e = j && "[object String]" == f(this) ? this.split("") : d, g = e.length >>> 0, h = [];
        if ("[object Function]" != f(a))throw new TypeError(a + " is not a function");
        for (var i = 0; g > i; i++)i in e && (c = e[i], a.call(b, c, i, d) && h.push(c));
        return h
    }), Array.prototype.every || (Array.prototype.every = function (a, b) {
        var c = z(this), d = j && "[object String]" == f(this) ? this.split("") : c, e = d.length >>> 0;
        if ("[object Function]" != f(a))throw new TypeError(a + " is not a function");
        for (var g = 0; e > g; g++)if (g in d && !a.call(b, d[g], g, c))return!1;
        return!0
    }), Array.prototype.some || (Array.prototype.some = function (a, b) {
        var c = z(this), d = j && "[object String]" == f(this) ? this.split("") : c, e = d.length >>> 0;
        if ("[object Function]" != f(a))throw new TypeError(a + " is not a function");
        for (var g = 0; e > g; g++)if (g in d && a.call(b, d[g], g, c))return!0;
        return!1
    }), Array.prototype.reduce || (Array.prototype.reduce = function (a) {
        var b = z(this), c = j && "[object String]" == f(this) ? this.split("") : b, d = c.length >>> 0;
        if ("[object Function]" != f(a))throw new TypeError(a + " is not a function");
        if (!d && 1 == arguments.length)throw new TypeError("reduce of empty array with no initial value");
        var e, g = 0;
        if (arguments.length >= 2)e = arguments[1]; else for (; ;) {
            if (g in c) {
                e = c[g++];
                break
            }
            if (++g >= d)throw new TypeError("reduce of empty array with no initial value")
        }
        for (; d > g; g++)g in c && (e = a.call(void 0, e, c[g], g, b));
        return e
    }), Array.prototype.reduceRight || (Array.prototype.reduceRight = function (a) {
        var b = z(this), c = j && "[object String]" == f(this) ? this.split("") : b, d = c.length >>> 0;
        if ("[object Function]" != f(a))throw new TypeError(a + " is not a function");
        if (!d && 1 == arguments.length)throw new TypeError("reduceRight of empty array with no initial value");
        var e, d = d - 1;
        if (arguments.length >= 2)e = arguments[1]; else for (; ;) {
            if (d in c) {
                e = c[d--];
                break
            }
            if (--d < 0)throw new TypeError("reduceRight of empty array with no initial value")
        }
        do d in this && (e = a.call(void 0, e, c[d], d, b)); while (d--);
        return e
    }), Array.prototype.indexOf && -1 == [0, 1].indexOf(1, 2) || (Array.prototype.indexOf = function (b) {
        var c = j && "[object String]" == f(this) ? this.split("") : z(this), d = c.length >>> 0;
        if (!d)return-1;
        var e = 0;
        for (arguments.length > 1 && (e = a(arguments[1])), e = e >= 0 ? e : Math.max(0, d + e); d > e; e++)if (e in c && c[e] === b)return e;
        return-1
    }), Array.prototype.lastIndexOf && -1 == [0, 1].lastIndexOf(0, -3) || (Array.prototype.lastIndexOf = function (b) {
        var c = j && "[object String]" == f(this) ? this.split("") : z(this), d = c.length >>> 0;
        if (!d)return-1;
        var e = d - 1;
        for (arguments.length > 1 && (e = Math.min(e, a(arguments[1]))), e = e >= 0 ? e : d - Math.abs(e); e >= 0; e--)if (e in c && b === c[e])return e;
        return-1
    }), !Object.keys) {
        var k, l = !0, m = "toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "), n = m.length;
        for (k in{toString: null})l = !1;
        Object.keys = function (a) {
            if ("object" != typeof a && "function" != typeof a || null === a)throw new TypeError("Object.keys called on a non-object");
            var b, c = [];
            for (b in a)g(a, b) && c.push(b);
            if (l)for (b = 0; n > b; b++) {
                var d = m[b];
                g(a, d) && c.push(d)
            }
            return c
        }
    }
    Date.prototype.toISOString && -1 !== new Date(-621987552e5).toISOString().indexOf("-000001") || (Date.prototype.toISOString = function () {
        var a, b, c, d;
        if (!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");
        for (d = this.getUTCFullYear(), a = this.getUTCMonth(), d += Math.floor(a / 12), a = [(a % 12 + 12) % 12 + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()], d = (0 > d ? "-" : d > 9999 ? "+" : "") + ("00000" + Math.abs(d)).slice(d >= 0 && 9999 >= d ? -4 : -6), b = a.length; b--;)c = a[b], 10 > c && (a[b] = "0" + c);
        return d + "-" + a.slice(0, 2).join("-") + "T" + a.slice(2).join(":") + "." + ("000" + this.getUTCMilliseconds()).slice(-3) + "Z"
    }), k = !1;
    try {
        k = Date.prototype.toJSON && null === new Date(0 / 0).toJSON() && -1 !== new Date(-621987552e5).toJSON().indexOf("-000001") && Date.prototype.toJSON.call({toISOString: function () {
            return!0
        }})
    } catch (o) {
    }
    k || (Date.prototype.toJSON = function () {
        var a, c = Object(this);
        a:{
            if (!b(c)) {
                if (a = c.valueOf, "function" == typeof a && (a = a.call(c), b(a)))break a;
                if (a = c.toString, "function" == typeof a && (a = a.call(c), b(a)))break a;
                throw new TypeError
            }
            a = c
        }
        if ("number" == typeof a && !isFinite(a))return null;
        if (a = c.toISOString, "function" != typeof a)throw new TypeError("toISOString property is not callable");
        return a.call(c)
    });
    var p, q = Date, r = function (a, b, c, d, e, f, g) {
        var h = arguments.length;
        return this instanceof q ? (h = 1 == h && String(a) === a ? new q(r.parse(a)) : h >= 7 ? new q(a, b, c, d, e, f, g) : h >= 6 ? new q(a, b, c, d, e, f) : h >= 5 ? new q(a, b, c, d, e) : h >= 4 ? new q(a, b, c, d) : h >= 3 ? new q(a, b, c) : h >= 2 ? new q(a, b) : h >= 1 ? new q(a) : new q, h.constructor = r, h) : q.apply(this, arguments)
    }, s = function (a, b) {
        var c = b > 1 ? 1 : 0;
        return u[b] + Math.floor((a - 1969 + c) / 4) - Math.floor((a - 1901 + c) / 100) + Math.floor((a - 1601 + c) / 400) + 365 * (a - 1970)
    }, t = RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"), u = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
    for (p in q)r[p] = q[p];
    if (r.now = q.now, r.UTC = q.UTC, r.prototype = q.prototype, r.prototype.constructor = r, r.parse = function (a) {
        var b = t.exec(a);
        if (b) {
            var c = Number(b[1]), d = Number(b[2] || 1) - 1, e = Number(b[3] || 1) - 1, f = Number(b[4] || 0), g = Number(b[5] || 0), h = Number(b[6] || 0), i = Number(b[7] || 0), j = !b[4] || b[8] ? 0 : Number(new q(1970, 0)), k = "-" === b[9] ? 1 : -1, l = Number(b[10] || 0), b = Number(b[11] || 0);
            return(g > 0 || h > 0 || i > 0 ? 24 : 25) > f && 60 > g && 60 > h && 1e3 > i && d > -1 && 12 > d && 24 > l && 60 > b && e > -1 && e < s(c, d + 1) - s(c, d) && (c = 60 * (24 * (s(c, d) + e) + f + l * k), c = 1e3 * (60 * (c + g + b * k) + h) + i + j, c >= -864e13 && 864e13 >= c) ? c : 0 / 0
        }
        return q.parse.apply(this, arguments)
    }, Date = r, Date.now || (Date.now = function () {
        return(new Date).getTime()
    }), "0".split(void 0, 0).length) {
        var v = String.prototype.split;
        String.prototype.split = function (a, b) {
            return void 0 === a && 0 === b ? [] : v.apply(this, arguments)
        }
    }
    if ("".substr && "b" !== "0b".substr(-1)) {
        var w = String.prototype.substr;
        String.prototype.substr = function (a, b) {
            return w.call(this, 0 > a ? (a = this.length + a) < 0 ? 0 : a : a, b)
        }
    }
    if (p = "	\n\f\r   ᠎             　\u2028\u2029﻿", !String.prototype.trim || p.trim()) {
        p = "[" + p + "]";
        var x = RegExp("^" + p + p + "*"), y = RegExp(p + p + "*$");
        String.prototype.trim = function () {
            if (void 0 === this || null === this)throw new TypeError("can't convert " + this + " to object");
            return String(this).replace(x, "").replace(y, "")
        }
    }
    var z = function (a) {
        if (null == a)throw new TypeError("can't convert " + a + " to object");
        return Object(a)
    }
}), function () {
    "use strict";
    var a = function (a) {
        a = a || {};
        var b = a.windowScope;
        this._getModel = function () {
            return b.editorModel || b.rendererModel || {}
        }, this._getRunningExperiments = function () {
            return this._getModel().runningExperiments || {}
        }, this._clone = function (a) {
            return void 0 === a ? void 0 : JSON.parse(JSON.stringify(a))
        }, this._saveOldScriptsLocationMap = function () {
            var a = b.serviceTopology || {};
            b.__original_serviceTopology_scriptsLocationMap__ = this._clone(a.scriptsLocationMap)
        }, this._overrideServiceTopologyScriptsLocationMap = function (a) {
            var c, d = b.serviceTopology = b.serviceTopology || {}, e = d.scriptsLocationMap = d.scriptsLocationMap || {};
            for (var f in a)a.hasOwnProperty(f) && (c = a[f], "none" === c ? delete e[f] : e[f] = c)
        }, this._replaceServiceTopologyScriptsLocationMap = function (a) {
            var c = b.serviceTopology = b.serviceTopology || {};
            c.scriptsLocationMap = a
        }, this._replaceRunningExperiments = function (a) {
            b.__original_runningExperiments__ = this._clone(this._getRunningExperiments()), a && (this._getModel().runningExperiments = a)
        }, this._isInEditor = function () {
            return"editor" === b.viewMode
        }, this._fakeDeployment = function () {
            this._isInEditor() || (b.define && b.define.resource ? b.define.resource("status.structure.loaded", !0) : setTimeout(this._fakeDeployment.bind(this), 100))
        }, this.execute = function () {
            var b = a.statemapOrTopology || {}, c = b.topology || a.statemapOrTopology, d = b.experiments;
            this._saveOldScriptsLocationMap(), b.replaceTopology ? this._replaceServiceTopologyScriptsLocationMap(c) : this._overrideServiceTopologyScriptsLocationMap(c), this._replaceRunningExperiments(d), this._fakeDeployment()
        }
    };
    if (window.W)if (window.W.isUnitTestMode)window.WT = window.WT || {}, window.WT.InitialStatemapOrTopologyHandlerClass = a; else if (window.W.statemapOrTopology) {
        var b = new a({statemapOrTopology: window.W.statemapOrTopology, windowScope: window});
        b.execute()
    }
}(), "undefined" == typeof document || "classList"in document.createElement("a") || !function (a) {
    "use strict";
    if ("HTMLElement"in a || "Element"in a) {
        var b = "classList", c = "prototype", d = (a.HTMLElement || a.Element)[c], e = Object, f = String[c].trim || function () {
            return this.replace(/^\s+|\s+$/g, "")
        }, g = Array[c].indexOf || function (a) {
            for (var b = 0, c = this.length; c > b; b++)if (b in this && this[b] === a)return b;
            return-1
        }, h = function (a, b) {
            this.name = a, this.code = DOMException[a], this.message = b
        }, i = function (a, b) {
            if ("" === b)throw new h("SYNTAX_ERR", "An invalid or illegal string was specified");
            if (/\s/.test(b))throw new h("INVALID_CHARACTER_ERR", "String contains an invalid character");
            return g.call(a, b)
        }, j = function (a) {
            for (var b = f.call(a.className), c = b ? b.split(/\s+/) : [], d = 0, e = c.length; e > d; d++)this.push(c[d]);
            this._updateClassName = function () {
                a.className = this.toString()
            }
        }, k = j[c] = [], l = function () {
            return new j(this)
        };
        if (h[c] = Error[c], k.item = function (a) {
            return this[a] || null
        }, k.contains = function (a) {
            return a += "", -1 !== i(this, a)
        }, k.add = function () {
            var a, b = arguments, c = 0, d = b.length, e = !1;
            do a = b[c] + "", -1 === i(this, a) && (this.push(a), e = !0); while (++c < d);
            e && this._updateClassName()
        }, k.remove = function () {
            var a, b = arguments, c = 0, d = b.length, e = !1;
            do {
                a = b[c] + "";
                var f = i(this, a);
                -1 !== f && (this.splice(f, 1), e = !0)
            } while (++c < d);
            e && this._updateClassName()
        }, k.toggle = function (a, b) {
            a += "";
            var c = this.contains(a), d = c ? b !== !0 && "remove" : b !== !1 && "add";
            return d && this[d](a), !c
        }, k.toString = function () {
            return this.join(" ")
        }, e.defineProperty) {
            var m = {get: l, enumerable: !0, configurable: !0};
            try {
                e.defineProperty(d, b, m)
            } catch (n) {
                -2146823252 === n.number && (m.enumerable = !1, e.defineProperty(d, b, m))
            }
        } else e[c].__defineGetter__ && d.__defineGetter__(b, l)
    }
}(window), window.W = window.W || {}, function (a) {
    var b = a.isExperimentOpen = function (a) {
        function c() {
            return Object.create && Object.create(null) || {}
        }

        function d(a) {
            a = a || window.location.search;
            for (var b, d, e, f = /[&?]experiment=([^&:]+)(?:[:]([^&]+))?/gi, g = c(); b = f.exec(a);)d = b[1].toLowerCase(), e = b[2], g[d] = !e || "new" === e.toLowerCase();
            return g
        }

        function e(a) {
            var b, d = c();
            for (var e in a)a.hasOwnProperty(e) && (b = a[e], "string" == typeof b && "new" === b.toLowerCase() && (d[e.toLowerCase()] = !0));
            return d
        }

        function f() {
            var a = window.rendererModel || window.editorModel || {};
            return e(a.runningExperiments)
        }

        if ("string" != typeof a)throw new Error("experimentName argument must be a string, received: " + JSON.stringify(a));
        if (window.W && window.W.Experiments)return window.W.Experiments.isDeployed(a);
        b.queryStringExperiments = b.queryStringExperiments || d(), a = a.toLowerCase();
        var g = b.queryStringExperiments[a];
        return void 0 !== g ? g === !0 : (b.modelExperiments = b.modelExperiments || f(), !!b.modelExperiments[a])
    }
}(window.W), function () {
    "use strict";
    var a = function (b, c, d, e) {
        function f(a) {
            if (b && b.apply(null, arguments), c && d) {
                var e = c[a], f = Array.prototype.slice.call(arguments, 1), h = typeof e;
                if ("function" === h || i && "object" === h)return g(c, e, f)
            }
        }

        function g(a, b, c) {
            try {
                return Function.prototype.call.apply(b, [a].concat(c))
            } catch (d) {
                "function" == typeof e.onLogException && e.onLogException(d)
            }
        }

        e = e || {}, this._isWConsole = !0, c && (this._oldConsole = c), b = "function" == typeof b && b;
        var h = e.consoleFunctionNames || a.CONSOLE_FUNCTION_NAMES, i = /MSIE [89]/.test(e.userAgent);
        h.forEach(function (a) {
            this[a] = f.bind(this, a)
        }, this)
    };
    a.CONSOLE_FUNCTION_NAMES = ["debug", "error", "info", "log", "warn", "dir", "dirxml", "trace", "assert", "count", "markTimeline", "profile", "profileEnd", "time", "timeEnd", "timeStamp", "group", "groupCollapsed", "groupEnd"];
    var b = function (a) {
        a = a || {}, a.Date = a.Date || window.Date;
        var b = [];
        this.add = function () {
            var c = Array.prototype.slice.call(arguments);
            c.unshift(new a.Date), b.push(c)
        }, this.get = function () {
            return b
        }, this.clear = function () {
            b = []
        }, this.pop = function () {
            var a = this.get();
            return this.clear(), a
        }
    }, c = function () {
        b.apply(this, arguments)
    }, d = function (a) {
        a = a || {}, b.apply(this, arguments);
        var c = a.window = a.window || window, d = !1, e = null, f = this;
        this.start = function () {
            d || (d = !0, e = c.onerror, c.onerror = function () {
                return f.add.apply(f, arguments), e ? e.apply(this, arguments) : !1
            })
        }, this.stop = function () {
            d && (c.onerror = e, e = null, d = !1)
        }
    }, e = function (a) {
        function b(a) {
            var b = document.createElement("div");
            return b.innerHTML = a, b.childNodes
        }

        for (var c = "http://www.wix.com/support/forum/html5/error-messages-and-known-bugs/live-website-errors/known-issue-when-i-view-my-site", d = '<div id="logTextAreaContainer" style="position:fixed;top:40px;left:40px;width:80%;height:80%;background:yellow;border:1px;z-index:2000;"><div style="font-size: 16px; padding: 10px; color: black;">Please copy the following (click in the text box, then CTRL+A and CTRL+C) and paste it <a href="' + c + '" target="_blank">here</a> (you can use CTRL+V to paste)</div><textarea id="logTextArea" style="width:100%;height:100%;" value=""></textarea></div>', e = b(d); e[0];)a.appendChild(e[0]);
        var f = a.querySelector("#logTextArea");
        this.getTextAreaNode = function () {
            return f
        }, this.addLogLine = function (a) {
            f.value += a + "\n"
        }, this._formatConsoleCall = function (a) {
            var b = Array.prototype.slice.call(arguments, 1);
            return"" + a + ": " + b
        }, this.logConsoleCall = function () {
            var a = this._formatConsoleCall.apply(this, arguments);
            this.addLogLine(a)
        }
    };
    e.isAppendableDom = function (a) {
        return"object" == typeof HTMLElement ? a instanceof HTMLElement : a && "string" == typeof a.nodeName && -1 !== [1, 11].indexOf(a.nodeType) && -1 !== ["function", "object"].indexOf(typeof a.appendChild)
    };
    var f = function (b) {
        function d(a, b) {
            var c = [];
            for (var d in a)if (a.hasOwnProperty(d)) {
                var e = b(a[d], d);
                e && c.push(e)
            }
            return c
        }

        this._isUrlParamSpecified = function (a) {
            var c = new RegExp("[?&]" + a + "($|&)", "i");
            return c.test(b.urlQuery)
        };
        var f = this._isUrlParamSpecified("log(bi)?=true"), g = this._isUrlParamSpecified("wconsole=store"), h = "string" == typeof b.userAgent && -1 !== b.userAgent.indexOf("MSIE");
        this._shouldEnableWConsole = function () {
            var a = b.serviceTopology, c = a && !a.developerMode || f || g || this._isUrlParamSpecified("wconsole=true") || h;
            if (!c)return!1;
            var d = this._isUrlParamSpecified("wconsole=false");
            return!d
        }, this._getInitialLogLines = function () {
            function a(a, b) {
                return"" + b + ": " + ("string" == typeof a ? a : JSON.stringify(a))
            }

            function c(b, c) {
                return b ? a(b, c) : null
            }

            var e = b.initialLog || {};
            return d(e.alwaysPrint || {}, a).concat(d(e.printOnlyIfNonNull || {}, c))
        }, this._shouldAlsoCallOriginalConsole = function () {
            return f || g || ["mode=debug", "debugartifacts?(=[^&]+)?"].some(this._isUrlParamSpecified)
        }, this._shouldLogTextAreaBeEnabled = function () {
            return this._isUrlParamSpecified("log=true") && b.popupContainer && e.isAppendableDom(b.popupContainer)
        }, this._getLoggerFunc = function () {
            var a = b.logStoreContainer;
            if (g && a && 2 === a.length) {
                var d = new c, f = a[0], h = a[1];
                return f[h] = d, d.add.bind(d)
            }
            if (this._shouldLogTextAreaBeEnabled()) {
                var i = new e(b.popupContainer);
                return this._getInitialLogLines().forEach(i.addLogLine, i), i.logConsoleCall.bind(i)
            }
        }, this.build = function () {
            var c = b.originalConsole;
            if (!this._shouldEnableWConsole())return c;
            var d = this._getLoggerFunc(), e = this._shouldAlsoCallOriginalConsole();
            return new a(d, c, e, {userAgent: b.userAgent, onLogException: b.onLogException})
        }, this.startCapturingWindowErrorsIfSpecified = function () {
            var a = b.windowErrorsStoreContainer, c = b.WindowErrorsStoreClass;
            if (g && a && 2 === a.length && "function" == typeof c) {
                var d = new c, e = a[0], f = a[1];
                e[f] = d, d.start()
            }
        }
    };
    if (f._WConsoleClass = a, f._PopupLoggerClass = e, f._ConsoleStoreClass = c, f._WindowErrorsStoreClass = d, window.W && window.W.isUnitTestMode)window.W.WConsoleBuilderClass = f, window.WT = window.WT || {}, window.WT.WConsoleBuilderClass = f; else {
        var g = new f({urlQuery: window.location.search, userAgent: window.navigator.userAgent, serviceTopology: window.serviceTopology, popupContainer: document.body, logStoreContainer: [window, "_consoleLogStore"], windowErrorsStoreContainer: [window, "_windowErrorsStore"], WindowErrorsStoreClass: f._WindowErrorsStoreClass, originalConsole: window.console, initialLog: {alwaysPrint: {"User Agent (Browser)": navigator.userAgent, "Site ID": window.siteHeader && window.siteHeader.userId, "User ID": window.siteId}, printOnlyIfNonNull: {rendererModel: window.rendererModel, editorModel: window.editorModel, publicModel: window.publicModel, serviceTopology: window.serviceTopology}}});
        window.console = g.build(), g.startCapturingWindowErrorsIfSpecified()
    }
}();
var WixGoogleAnalytics = function (a, b, c, d, e, f, g) {
    if (this._wixAccounts = a, this._userAccounts = b, this._version = c, this._userType = d, this._userLanguage = e, this._sendPageTrackToUser = f, this._sendPageTrackToWix = g, !window._gaq) {
        var h = document.createElement("script");
        h.type = "text/javascript", h.async = !0, h.src = ("https:" == document.location.protocol ? "https://" : "http://") + "stats.g.doubleclick.net/dc.js";
        var i = document.getElementsByTagName("script")[0];
        i.parentNode.insertBefore(h, i)
    }
};
WixGoogleAnalytics.prototype.sendEvent = function (a, b) {
    var c = wixLogLegend.getKey("type", a.type), d = a.desc, e = b.label || (b.c1 ? "c1: " + b.c1 + "|" : "") + (b.g1 ? "g1: " + b.g1 + "|" : "") + (b.i1 ? "i1: " + b.i1 : ""), f = b.value || b.time;
    this._sendAnalyticEvent(c, d, e, f)
}, WixGoogleAnalytics.prototype.sendError = function (a, b, c, d) {
    var e = wixLogLegend.getKey("type", a.type), f = a.desc, g = b + "." + c + " : " + d.label, h = d.value || d.time;
    this._sendAnalyticEvent(e, f, g, h)
}, WixGoogleAnalytics.prototype.sendPageEvent = function (a) {
    window._gaq = window._gaq || [];
    var b = function (a, b, c) {
        for (var d = 0; d < a.length; ++d)if (a[d].length > 0) {
            var e = 0 === d ? "" : "t" + d + ".";
            window._gaq.push([e + "_setAccount", a[d]]), window._gaq.push([e + "_setAllowAnchor", !0]), c && (window._gaq.push([e + "_setCustomVar", 1, "version", this._version, 1]), window._gaq.push([e + "_setCustomVar", 2, "language", this._userLanguage, 1]), window._gaq.push([e + "_setCustomVar", 3, "userType", this._userType, 1])), window._gaq.push([e + "_trackPageview", b])
        }
    }.bind(this);
    this._sendPageTrackToUser ? b(this._userAccounts, a, !1) : this._sendPageTrackToWix && b(this._wixAccounts, a, !0)
}, WixGoogleAnalytics.prototype._sendAnalyticEvent = function (a, b, c, d) {
    a = a || "", b = b || "", c = c || "", d = d || 0;
    var e = function (a, b, c, d, e, f) {
        window._gaq = window._gaq || [], window._gaq.push([a + "_setAccount", b]), window._gaq.push([a + "_setCustomVar", 1, "version", this._version, 1]), window._gaq.push([a + "_setCustomVar", 2, "language", this._userLanguage, 1]), window._gaq.push([a + "_setCustomVar", 3, "userType", this._userType, 1]), window._gaq.push([a + "_trackEvent", c, d, e, f])
    };
    if (this._wixAccounts)for (var f = 0; f < this._wixAccounts.length; ++f) {
        var g = 0 === f ? "" : "t" + f + ".";
        e(g, this._wixAccounts[f], a, b, c, d)
    }
}, function (a) {
    a.wixLogLegend = function () {
        var a = function () {
        }, b = {};
        b.type = {error: 10, timing: 20, funnel: 30, userAction: 40}, b.category = {editor: 1, viewer: 2, core: 3, server: 4}, b.issue = {defaultVal: 0, components: 1, managers: 2, modal: 4, timing: 5, skins: 6}, b.severity = {recoverable: 10, warning: 20, error: 30, fatal: 40};
        for (var c in b)a[c] = b[c];
        return a.getKey = function (a, c) {
            a = b[a] || {};
            for (var d in a)if (c == a[d])return d;
            return""
        }, a
    }();
    var b = wixLogLegend;
    a.wixEvents = {EDITOR_FLOW_OPEN_NEW: {desc: "FLOW: Mobile editor launch with new site", type: b.type.funnel, category: b.category.editor, biEventId: 100, timerId: "main", callLimit: 1}, EDITOR_FLOW_OPEN_EDIT: {desc: "FLOW: Mobile editor launch with existing site", type: b.type.funnel, category: b.category.editor, biEventId: 107, timerId: "main", callLimit: 1}, EDITOR_FLOW_TEMPLATE_CHOSEN: {desc: "FLOW: Mobile editor template chosen", type: b.type.funnel, category: b.category.editor, biEventId: 102, timerId: "main", callLimit: 1}, EDITOR_FLOW_CATEGORY_CHOSEN: {desc: "FLOW: Mobile editor category chosen", type: b.type.funnel, category: b.category.editor, biEventId: 103, timerId: "main", callLimit: 1}, EDITOR_FLOW_EDIT_PAGE: {desc: "FLOW: Mobile editor edit page step from new site", type: b.type.funnel, category: b.category.editor, biEventId: 105, timerId: "main", callLimit: 1}, EDITOR_FLOW_PUBLISH_PAGE: {desc: "FLOW: Mobile editor publish page step", type: b.type.funnel, category: b.category.editor, biEventId: 104, timerId: "main", callLimit: 1}, EDITOR_FLOW_CONGRATS_PAGE: {desc: "FLOW: Mobile editor congrats page step", type: b.type.funnel, category: b.category.editor, biEventId: 101, timerId: "main", callLimit: 1}, EDITOR_ENTER_PAGE: {desc: "Mobile editor page change", type: b.type.funnel, category: b.category.editor}, EDITOR_SWITCH_TO_MOBILE_MODE: {desc: "FLOW: Editor switched to Mobile mode.", type: b.type.userAction, category: b.category.editor, biEventId: 401, biAdapter: "hed"}, EDITOR_SWITCH_TO_DESKTOP_MODE: {desc: "FLOW: Editor switched to Desktop mode.", type: b.type.userAction, category: b.category.editor, biEventId: 402, biAdapter: "hed"}, MOBILE_EDITOR_RESET_LAYOUT_CLICKED: {desc: "FLOW: Mobile editor reset layout button clicked", type: b.type.userAction, category: b.category.editor, biEventId: 411, biAdapter: "hed"}, MOBILE_EDITOR_RESET_LAYOUT_CONFIRM: {desc: "FLOW: Mobile editor reset layout action confirmed", type: b.type.userAction, category: b.category.editor, biEventId: 412, biAdapter: "hed"}, MOBILE_EDITOR_RESET_LAYOUT_CANCELED: {desc: "FLOW: Mobile editor reset layout action canceled", type: b.type.userAction, category: b.category.editor, biEventId: 413, biAdapter: "hed"}, MOBILE_EDITOR_MOBILE_VIEW_PANEL_SHOW: {desc: "FLOW: Mobile editor shows Mobile View panel.", type: b.type.userAction, category: b.category.editor, biEventId: 421, biAdapter: "hed"}, MOBILE_EDITOR_MOBILE_VIEW_ON: {desc: "FLOW: Mobile editor, Mobile View is optimized (On).", type: b.type.userAction, category: b.category.editor, biEventId: 422, biAdapter: "hed"}, MOBILE_EDITOR_MOBILE_VIEW_OFF: {desc: "FLOW: Mobile editor, Mobile View is not-optimized (Off).", type: b.type.userAction, category: b.category.editor, biEventId: 423, biAdapter: "hed"}, MOBILE_EDITOR_REORDER_LAYOUT: {desc: "FLOW: Mobile editor re-ordering the mobile page layout.", type: b.type.userAction, category: b.category.editor, biEventId: 431, biAdapter: "hed"}, MOBILE_EDITOR_RESTORE_DELETED_COMPONENT: {desc: "FLOW: Mobile editor restoring/reshowing removed/hidden component from the stage.", type: b.type.userAction, category: b.category.editor, biEventId: 441, biAdapter: "hed"}, MOBILE_EDITOR_HIDE_COMPONENT: {desc: "FLOW: Mobile editor hide component from the stage.", type: b.type.userAction, category: b.category.editor, biEventId: 442, biAdapter: "hed"}, MOBILE_FIRST_PROPS_SPLIT_DIALOG_APPROVED: {desc: "Mobile editor property split panel - approved", type: b.type.userAction, category: b.category.editor, biEventId: 100, biAdapter: "hed-mobile"}, MOBILE_FIRST_PROPS_SPLIT_DIALOG_CANCEL: {desc: "Mobile editor property split panel - canceled", type: b.type.userAction, category: b.category.editor, biEventId: 101, biAdapter: "hed-mobile"}, MOBILE_FIRST_PROPS_RESET_DIALOG_APPROVED: {desc: "Mobile editor property reset panel - approved", type: b.type.userAction, category: b.category.editor, biEventId: 102, biAdapter: "hed-mobile"}, MOBILE_FIRST_PROPS_RESET_DIALOG_CANCEL: {desc: "Mobile editor property reset panel - canceled", type: b.type.userAction, category: b.category.editor, biEventId: 103, biAdapter: "hed-mobile"}, MOBILE_PROPS_SPLIT: {desc: "Mobile editor property split", type: b.type.userAction, category: b.category.editor, biEventId: 104, biAdapter: "hed-mobile"}, MOBILE_PROPS_RESET: {desc: "Mobile editor reset item button clicked", type: b.type.userAction, category: b.category.editor, biEventId: 105, biAdapter: "hed-mobile"}, MOBILE_TEXT_SCALING_CHANGED: {desc: "Mobile editor text scaling changed via slider", type: b.type.userAction, category: b.category.editor, biEventId: 113, biAdapter: "hed-mobile"}, MOBILE_TEXT_BRIGHTNESS_CHANGED: {desc: "Mobile editor text brightness changed via slider", type: b.type.userAction, category: b.category.editor, biEventId: 114, biAdapter: "hed-mobile"}, TINY_MENU_FIXED_POSITION: {desc: "Mobile editor tiny menu fixed position changed", type: b.type.userAction, category: b.category.editor, biEventId: 449, biAdapter: "hed"}, TINY_MENU_UNCHECK_FIXED: {desc: "Mobile editor tiny menu fixed position unchecked from popup", type: b.type.userAction, category: b.category.editor, biEventId: 450, biAdapter: "hed"}, NO_INDEX_FOR_PAGE: {desc: " User checked the the noindex checkbox for a specific page. {c1: pageId, i1: boolean (checked/unchecked)}", type: b.type.userAction, category: b.category.editor, biEventId: 522, biAdapter: "hed"}, SEND_NEWSLETTER_PRESSED: {desc: "User pressed Send Newsletters button in SubscribeForm settings panel", biEventId: 109, biAdapter: "hed-misc"}, EMAIL_SEND: {desc: "Site url sent to mail", type: b.type.userAction, category: b.category.editor}, BACK_TO_EDIT_FROM_CONGRATS: {desc: "Back to edit page from congrats page", type: b.type.userAction, category: b.category.editor}, ADD_PAGE: {desc: "Page added", type: b.type.userAction, category: b.category.editor}, ADD_LINK_TO_MENU: {desc: "Link added to menu", type: b.type.userAction, category: b.category.editor, biEventId: 110, biAdapter: "hed-comp"}, ADD_HEADER_TO_MENU: {desc: "Header added to menu", type: b.type.userAction, category: b.category.editor, biEventId: 111, biAdapter: "hed-comp"}, REMOVE_PAGE: {desc: "Page removed. i1 = 1 if it is a TPA page, 0 otherwise. c1 is the page Id", type: b.type.userAction, category: b.category.editor, biEventId: 285, biAdapter: "hed"}, REMOVE_LINK_FROM_MENU: {desc: "Link removed from menu", type: b.type.userAction, category: b.category.editor, biEventId: 112, biAdapter: "hed-comp"}, REMOVE_HEADER_FROM_MENU: {desc: "Header removed from menu", type: b.type.userAction, category: b.category.editor, biEventId: 113, biAdapter: "hed-comp"}, USER_REQUESTED_PAGE_DUPLICATE: {desc: "User initiated duplicate page.", type: b.type.userAction, category: b.category.editor, biEventId: 284, biAdapter: "hed"}, ADD_COMPONENT: {desc: "Component added", type: b.type.userAction, category: b.category.editor}, REMOVE_COMPONENT: {desc: "Component removed", type: b.type.userAction, category: b.category.editor}, REORDER_COMPONENT: {desc: "Component reorder", type: b.type.userAction, category: b.category.editor}, SITE_READY: {desc: "site ready - viewer or preview. c1=isNewPublishSite, c2=state hash", type: b.type.timing, category: b.category.viewer, timerId: "load", thresholdTime: 1e4, thresholdError: "SITE_READY_DELAY", biEventId: 303, biAdapter: "mlt", sampleRatio: 10}, LOADING_STEPS: {desc: "loading steps", type: b.type.timing, category: b.category.editor, timerId: "load", thresholdTime: 25e3, thresholdError: "SITE_DOM_DELAY", biEventId: 304, biAdapter: "hed"}, SITE_DOM_LOADED: {desc: "Mobile site DOM loaded", type: b.type.timing, category: b.category.viewer, timerId: "load", thresholdTime: 1e4, thresholdError: "SITE_DOM_DELAY", biEventId: 301, biAdapter: "mlt", sampleRatio: 10}, PREVIEW_READY: {desc: "Mobile preview ready", type: b.type.timing, category: b.category.viewer, timerId: "load", thresholdTime: 1e4, thresholdError: "PREVIEW_READY_DELAY"}, PREVIEW_DOM_LOADED: {desc: "Mobile preview DOM loaded", type: b.type.timing, category: b.category.viewer, timerId: "load", thresholdTime: 3e3, thresholdError: "PREVIEW_DOM_DELAY", sampleRatio: 10}, EDITOR_READY: {desc: "Editor ready (c2: state hash)", type: b.type.timing, category: b.category.editor, timerId: "load", thresholdTime: 8e3, thresholdError: "EDITOR_READY_DELAY", biEventId: 302, biAdapter: "mlt"}, EDITOR_DOM_LOADED: {desc: "Mobile editor DOM loaded (g1 holds the list of running experiments)", type: b.type.timing, category: b.category.editor, timerId: "load", thresholdTime: 1e4, thresholdError: "EDITOR_DOM_DELAY", biEventId: 300, biAdapter: "mlt"}, SUSPECTED_MALWARE: {desc: "One of the source URLs for an img/script/link(css) object in the DOM is not in our whitelist. (g1=hostname, c1=suspicious url, c2=tag (img/script/link), i1=num of loaded phases (should be 9)", type: b.type.error, category: b.category.editor, biEventId: 106, biAdapter: "hed-misc"}, RT_COLOR_CLICKED: {desc: "click more color in rich text color selector", type: b.type.userAction, category: b.category.editor, biEventId: 199, biAdapter: "hed"}, MORE_COLOR_CLICKED: {desc: "click more color in rich text color selector", type: b.type.userAction, category: b.category.editor, biEventId: 200, biAdapter: "hed"}, SAVE_BUTTON_CLICKED_IN_MAIN_WINDOW: {desc: "Save button was clicked in main window. g1: template ID (GUID)", type: b.type.userAction, category: b.category.editor, timerId: "load", biEventId: 201, biAdapter: "hed"}, CLOSE_SAVE_DIALOG_CLICKED: {desc: "click close in save dialog", type: b.type.userAction, category: b.category.editor, biEventId: 202, biAdapter: "hed"}, SAVE_CLICKED_IN_SAVE_DIALOG: {desc: "click save in save dialog", type: b.type.userAction, category: b.category.editor, timerId: "load", biEventId: 203, biAdapter: "hed"}, SAVE_START: {desc: "starting the actual save process with the server (i1 is 0 when first save, 1 when other save. i2 is true when coming from publish (always ? on first save!). c1 is the site lable, when this is a first save)", type: b.type.userAction, category: b.category.editor, biEventId: 270, biAdapter: "hed", timerId: "save"}, SAVE_SUCCESS: {desc: "successfuly saved document (i1 is 0 when first save, 1 when other save. i2 is true when coming from publish. c1 is the site lable, when this is a first save)", type: b.type.userAction, category: b.category.editor, biEventId: 271, biAdapter: "hed", timerId: "save"}, PROVISION_START: {desc: "starting the provision process, which is part of the save process (both metasite and wixapps together)", type: b.type.userAction, category: b.category.editor, biEventId: 228, biAdapter: "hed"}, PROVISION_SUCCESS: {desc: "successfuly completed the provisioning process", type: b.type.userAction, category: b.category.editor, biEventId: 229, biAdapter: "hed"}, PUBLISH_BUTTON_CLICKED_IN_MAIN_WINDOW: {desc: "click on publish button in main window", type: b.type.userAction, category: b.category.editor, timerId: "load", biEventId: 204, biAdapter: "hed"}, PUBLISH_BUTTON_CLICKED_IN_PUBLISH_DIALOG: {desc: "click publish in first publish dialog", type: b.type.userAction, category: b.category.editor, timerId: "load", biEventId: 207, biAdapter: "hed"}, UPDATE_BUTTON_CLICKED_IN_PUBLISH_DIALOG: {desc: "click update in publish dialog", type: b.type.userAction, category: b.category.editor, biEventId: 208, biAdapter: "hed"}, POST_IN_FB_CLICKED_IN_PUBLISH_SHARE_DIALOG: {desc: "click on post to FB in publish dialog", type: b.type.userAction, category: b.category.editor, biEventId: 209, biAdapter: "hed"}, POST_IN_TWITTER_CLICKED_IN_PUBLISH_SHARE_DIALOG: {desc: "click on post to FB in publish dialog", type: b.type.userAction, category: b.category.editor, biEventId: 210, biAdapter: "hed"}, PREVIEW_BUTTON_CLICKED_IN_MAIN_WINDOW: {desc: "click on preview button in main window. g1: template ID (GUID)", type: b.type.userAction, category: b.category.editor, biEventId: 211, biAdapter: "hed"}, BACK_TO_EDITOR_MODE_BUTTON_CLICKED: {desc: 'click on "back to editor mode" button from preview mode in main window', type: b.type.userAction, category: b.category.editor, biEventId: 212, biAdapter: "hed"}, COMPONENT_ADDED: {desc: "add component", type: b.type.userAction, category: b.category.editor, biEventId: 214, biAdapter: "hed"}, COMPONENT_REMOVED: {desc: "remove component", type: b.type.userAction, category: b.category.editor, biEventId: 215, biAdapter: "hed"}, BACKGROUND_CHANGED: {desc: "some change was made in the background ", type: b.type.userAction, category: b.category.editor, biEventId: 219, biAdapter: "hed"}, COLOR_PRESET_CHANGED: {desc: "a color preset was selected", type: b.type.userAction, category: b.category.editor, biEventId: 220, biAdapter: "hed"}, FONT_PRESET_CHANGED: {desc: "a font preset was selected", type: b.type.userAction, category: b.category.editor, biEventId: 221, biAdapter: "hed"}, ADVANCED_SEO_SETTINGS_OPENED: {desc: "Advanced SEO settings was opened", type: b.type.userAction, category: b.category.editor, biEventId: 194, biAdapter: "hed"}, PAGE_SETTINGS_VIEW_PAGE_CLICKED: {desc: "User clicked on the View Page link in the Page Settings Panel", type: b.type.userAction, category: b.category.editor, biEventId: 107, biAdapter: "hed-misc"}, PAGE_SETTINGS_TOGGLE_SEO_GROUP: {desc: "User clicked on SEO settings in the Page Settings Panel to toggle it open/closed. {i1: toggleOn/Off}", type: b.type.userAction, category: b.category.editor, biEventId: 108, biAdapter: "hed-misc"}, REDIRECT_301_OPENED_CLOSED: {desc: "Redirect 301 panel was (opened i1=1) or (closed i1=0)", type: b.type.userAction, category: b.category.editor, biEventId: 130, biAdapter: "hed-misc"}, REDIRECT_301_LEARN_MORE: {desc: "Redirect 301 - learn more link was clicked", type: b.type.userAction, category: b.category.editor, biEventId: 131, biAdapter: "hed-misc"}, REDIRECT_301_DOMAIN: {desc: "Redirect 301 - (i1=1 click on domain if premium) or (i1=0 connect domain if not)", type: b.type.userAction, category: b.category.editor, biEventId: 132, biAdapter: "hed-misc"}, REDIRECT_301_INVALID_CHAR: {desc: "Redirect 301 - user insert invalid char", type: b.type.userAction, category: b.category.editor, biEventId: 133, biAdapter: "hed-misc"}, REDIRECT_301_INVALID_CHAR_LEARN_MORE_CLICKED: {desc: "Redirect 301 - user clicked on learn more link when he get invalid char error", type: b.type.userAction, category: b.category.editor, biEventId: 134, biAdapter: "hed-misc"}, REDIRECT_301_ADD_NEW_ROW: {desc: "Redirect 301 - added new row, c1 = the destination page id", type: b.type.userAction, category: b.category.editor, biEventId: 135, biAdapter: "hed-misc"}, REDIRECT_301_DELETE_ROW: {desc: "Redirect 301 - delete existed row", type: b.type.userAction, category: b.category.editor, biEventId: 136, biAdapter: "hed-misc"}, REDIRECT_301_EDIT_ROW: {desc: "Redirect 301 - edit row", type: b.type.userAction, category: b.category.editor, biEventId: 137, biAdapter: "hed-misc"}, REDIRECT_301_APPLY_EDITED_ROW: {desc: "Redirect 301 - apply edited row, c1 = the destination page id", type: b.type.userAction, category: b.category.editor, biEventId: 138, biAdapter: "hed-misc"}, REDIRECT_301_APPLY_CHANGES: {desc: "Redirect 301 - apply changes, i1 = count of defined redirect pairs", type: b.type.userAction, category: b.category.editor, biEventId: 139, biAdapter: "hed-misc"}, USER_HEADER_METATAGS_APPLIED: {desc: "User header meta tags was applied", type: b.type.userAction, category: b.category.editor, biEventId: 195, biAdapter: "hed"}, LOCK_COMPONENT: {desc: "Click on lock/unlock component/s", type: b.type.userAction, category: b.category.editor, biEventId: 191, biAdapter: "hed"}, ADD_IMAGE_BUTTON_CLICK: {desc: "Click on add image button", type: b.type.userAction, category: b.category.editor, biEventId: 500, biAdapter: "hed"}, IMAGE_ADDED_VIA_MEDIA_GALLERY: {desc: "Image successfully added after user chooses it via Media Gallery", type: b.type.userAction, category: b.category.editor, biEventId: 501, biAdapter: "hed"}, CHANGE_IMAGE_CLICK: {desc: "Change Image click from the Image (all of the ways this can happen: FPP, Settings, Double Click)", type: b.type.userAction, category: b.category.editor, biEventId: 502, biAdapter: "hed"}, CHANGE_IMAGE_CLICK_SUCCESS: {desc: "Event when Image is successfully Changed after clicking Change Image", type: b.type.userAction, category: b.category.editor, biEventId: 503, biAdapter: "hed"}, CUSTOMIZE_BACKGROUND_OPENED: {desc: "customize background panel was opened", type: b.type.userAction, category: b.category.editor, biEventId: 292, biAdapter: "hed"}, CUSTOMIZE_FONTS_OPENED: {desc: "customize font panel was opened", type: b.type.userAction, category: b.category.editor, biEventId: 223, biAdapter: "hed"}, CUSTOMIZE_COLORS_OPENED: {desc: "customize colors panel was opened", type: b.type.userAction, category: b.category.editor, biEventId: 224, biAdapter: "hed"}, COLOR_PALETTE_INVERTED: {desc: "User initiated color palette invert.", type: b.type.userAction, category: b.category.editor, biEventId: 283, biAdapter: "hed"}, PAGE_ADDED: {desc: "a page was added by the user (c1=name of the page type. e.g. services1, c2=page type group. e.g. SERVICES, g1=ugc page name, i1=true if this is a sub page, blank if not)", type: b.type.userAction, category: b.category.editor, biEventId: 222, biAdapter: "hed"}, SEO_PANEL_OPENED: {desc: "seo panel was opened", type: b.type.userAction, category: b.category.editor, biEventId: 225, biAdapter: "hed"}, SEO_CHECKED_IN_SEO_PANEL: {desc: '"allow search engines to find my site" was selected in either SEO panel or Publish dialog. {c1: source, i1: boolean value}', type: b.type.userAction, category: b.category.editor, biEventId: 226, biAdapter: "hed"}, SHOW_IN_ALL_PAGES_SELECTED: {desc: '"show in all pages" was selected', type: b.type.userAction, category: b.category.editor, biEventId: 227, biAdapter: "hed"}, HELP_CENTER_CLOSED: {desc: "help center popup closed", type: b.type.userAction, category: b.category.editor, biEventId: 230, biAdapter: "hed"}, INTRO_VIDEO_CLOSED: {desc: "user closed intro video", type: b.type.userAction, category: b.category.editor, biEventId: 217, biAdapter: "hed"}, FROM_INTRO_VIDEO_TO_HELP_CENTER: {desc: "user pressed link to help center from intro video", type: b.type.userAction, category: b.category.editor, biEventId: 218, biAdapter: "hed"}, UNDO_REDO: {desc: "undo clicked. c1=action, c2=source", type: b.type.userAction, category: b.category.editor, biEventId: 310, biAdapter: "hed"}, MOVE_FORWARD_BACK_TOP_BOTTOM: {desc: "move forward/back/top/bottom was clicked. c1=action, c2=source", type: b.type.userAction, category: b.category.editor, biEventId: 311, biAdapter: "hed"}, APPS_FLOW_APP_BUTTON_CLICKED: {desc: "FLOW: Apps - TPA Application button clicked", type: b.type.funnel, category: b.category.editor, biEventId: 232, timerId: "main", biAdapter: "hed"}, APPS_FLOW_SLIDESHOW_INTERACTION: {desc: "FLOW: Apps - TPA Add dialog - interaction with slideshow", type: b.type.funnel, category: b.category.editor, biEventId: 233, timerId: "main", biAdapter: "hed"}, APPS_FLOW_ADD_AS_TO_PAGE_BUTTON: {desc: "FLOW: Apps - TPA Add dialog - Add as/to page clicked", type: b.type.funnel, category: b.category.editor, biEventId: 234, timerId: "main", biAdapter: "hed"}, APPS_FLOW_ADD_DIALOG_CANCELED: {desc: "FLOW: Apps - TPA Add dialog - Add dialog canceled", type: b.type.funnel, category: b.category.editor, biEventId: 235, timerId: "main", biAdapter: "hed"}, APPS_FLOW_APP_ADDED_TO_STAGE: {desc: "FLOW: Apps - TPA Add dialog - App added to stage", type: b.type.funnel, category: b.category.editor, biEventId: 236, timerId: "main", biAdapter: "hed"}, APPS_FLOW_APP_REMOVED_FROM_STAGE: {desc: "FLOW: Apps - TPA - App removed from stage", type: b.type.funnel, category: b.category.editor, biEventId: 231, timerId: "main", biAdapter: "hed"}, APPS_FLOW_APP_SETTINGS_OPEN: {desc: "FLOW: Apps - TPA App settings opened", type: b.type.funnel, category: b.category.editor, biEventId: 237, timerId: "main", biAdapter: "hed"}, APPS_FLOW_APP_SETTINGS_CLOSE: {desc: "FLOW: Apps - TPA App settings closed", type: b.type.funnel, category: b.category.editor, biEventId: 238, timerId: "main", biAdapter: "hed"}, APPS_FLOW_APP_LOADED_ON_VIEWER: {desc: "FLOW: Apps - TPA App loaded on viewer", type: b.type.funnel, category: b.category.editor, biEventId: 239, timerId: "main", biAdapter: "hed"}, EU_COOKIE_CHECKBOX_CLICKED: {desc: "eu cookie checkbox clicked", type: b.type.userAction, category: b.category.editor, biEventId: 240, biAdapter: "hed"}, WALK_ME_LOADED: {desc: "WalkMe loaded", type: b.type.timing, category: b.category.editor, biEventId: 241, biAdapter: "hed"}, FIRST_TIME_WALK_ME_PRESENTED: {desc: "Splash screen for first time WalkMe shown to user", type: b.type.timing, category: b.category.editor, biEventId: 242, biAdapter: "hed"}, WALK_ME_BUTTON_CLICKED: {desc: "WalkMe button was clicked", type: b.type.userAction, category: b.category.editor, biEventId: 243, biAdapter: "hed"}, WALK_ME_CLOSED: {desc: "WalkThru closed by user", type: b.type.userAction, category: b.category.editor, biEventId: 244, biAdapter: "hed"}, WALK_ME_STEP_BEGUN: {desc: "WalkThru step was begun by user", type: b.type.userAction, category: b.category.editor, biEventId: 245, biAdapter: "hed"}, WALK_ME_STEP_SHOWN: {desc: "WalkThru step is shown", type: b.type.userAction, category: b.category.editor, biEventId: 247, biAdapter: "hed"}, WALK_ME_HELP_CLICKED: {desc: 'User closed walkme by clicking "help"', type: b.type.userAction, category: b.category.editor, biEventId: 248, biAdapter: "hed"}, WALK_ME_MENU_CLOSED: {desc: "WalkMe main menu closed by user", type: b.type.userAction, category: b.category.editor, biEventId: 249, biAdapter: "hed"}, WELCOME_SCREEN_HELP_CENTER_CLOSED: {desc: "first time welcome screen help center closed", type: b.type.userAction, category: b.category.editor, biEventId: 246, biAdapter: "hed"}, WIXADS_CLICKED_IN_PREVIEW: {desc: "user clicked the wix ad in preview", type: b.type.userAction, category: b.category.viewer, biEventId: 250, biAdapter: "hed"}, UPGRADE_BUTTON_CLICKED: {desc: "The Upgrade button was clicked. c1 specified which actual button (top bar, publish dialog, favicon, statistics), i1 will be 1 if the site has been saved before, 0 if not", type: b.type.userAction, category: b.category.editor, timerId: "load", biEventId: 251, biAdapter: "hed"}, TPA_UPGRADE_BUTTON_CLICKED: {desc: "user clicked the TPA upgrade button", type: b.type.userAction, category: b.category.viewer, biEventId: 252, biAdapter: "hed"}, SETTINGS_CONNECT_DOMAIN_CLICKED: {desc: 'The "Connect a domain to this Wix site" ad on the "Site address" tab in settings was clicked. i1 will be 0 if the site is unsaved, 1 if it is, 2 if premium', type: b.type.userAction, category: b.category.editor, timerId: "load", biEventId: 253, biAdapter: "hed"}, BI_USER_COOKIES_INITIALIZED: {desc: "User cookies were initialized. i1=firstTime. i.e., it will be 1 if there we no cookies, and 0 if there was either of them (session or persistent)", type: b.type.funnel, category: b.category.core, biEventId: 254, biAdapter: "hed"}, ADD_COMPONENT_CATEGORY_CLICKED: {desc: "Clicked a Component Category from the Add Component menu", type: b.type.funnel, category: b.category.editor, biEventId: 255, timerId: "main", biAdapter: "hed"}, DEPLOY_PHASE_COMPLETE: {desc: "Fired for each deployment phase that completes loading", type: b.type.funnel, category: b.category.editor, biEventId: 331, timerId: "main", biAdapter: "mlt", sampleRatio: 10}, DEPLOY_PHASE_COMPLETE_BOOTSTRAP: {desc: "Fired for each deployment phase that completes loading", type: b.type.funnel, category: b.category.editor, biEventId: 332, timerId: "main", biAdapter: "mlt", sampleRatio: 10}, DEPLOY_PHASE_COMPLETE_LIBS: {desc: "Fired for each deployment phase that completes loading", type: b.type.funnel, category: b.category.editor, biEventId: 333, timerId: "main", biAdapter: "mlt", sampleRatio: 10}, DEPLOY_PHASE_COMPLETE_CLASSMANAGER: {desc: "Fired for each deployment phase that completes loading", type: b.type.funnel, category: b.category.editor, biEventId: 334, timerId: "main", biAdapter: "mlt", sampleRatio: 10}, DEPLOY_PHASE_COMPLETE_UTILS: {desc: "Fired for each deployment phase that completes loading", type: b.type.funnel, category: b.category.editor, biEventId: 335, timerId: "main", biAdapter: "mlt", sampleRatio: 10}, DEPLOY_PHASE_COMPLETE_MANAGERS: {desc: "Fired for each deployment phase that completes loading", type: b.type.funnel, category: b.category.editor, biEventId: 336, timerId: "main", biAdapter: "mlt", sampleRatio: 10}, DEPLOY_PHASE_COMPLETE_INIT: {desc: "Fired for each deployment phase that completes loading", type: b.type.funnel, category: b.category.editor, biEventId: 337, timerId: "main", biAdapter: "mlt", sampleRatio: 10}, DEPLOY_PHASE_COMPLETE_POST_DEPLOY: {desc: "Fired for each deployment phase that completes loading", type: b.type.funnel, category: b.category.editor, biEventId: 338, timerId: "main", biAdapter: "mlt", sampleRatio: 10}, DEPLOY_PHASE_COMPLETE_TEST: {desc: "Fired for each deployment phase that completes loading", type: b.type.funnel, category: b.category.editor, biEventId: 339, timerId: "main", biAdapter: "mlt", sampleRatio: 10}, LOAD_PAGE_DATA: {desc: "page loading data after 10 and 20 seconds. c1 holds the data as a json, c2 holds the 10 files that took longest to load (download and parse), i1 holds the number of seconds (10 or 20)", type: b.type.timing, category: b.category.viewer, biEventId: 340, biAdapter: "mlt", sampleRatio: 10}, LOAD_IMAGES_DATA: {desc: "images loading data after 10 seconds, c1 has json string with extra data", type: b.type.timing, category: b.category.viewer, biEventId: 341, biAdapter: "mlt", sampleRatio: 10}, FAKE_PREMIUM: {desc: "Site removed the wix ads manually, this is a fake premium. {uid: userId, did: siteId, g1: siteLocationUrl}", type: b.type.error, category: b.category.viewer, biEventId: 342, biAdapter: "mlt"}, EMBEDDED_SITE: {desc: "This site is embedded, and does not have premium domain rights. {uid: userId, did: siteId, g1: siteLocationUrl}", type: b.type.error, category: b.category.viewer, biEventId: 343, biAdapter: "mlt"}, USER_MOVED_BETWEEN_PAGES: {desc: "User initiated page transition, by clicking the menu in the preview, or moving to another page in the editor. (c1 will have the page URL)", type: b.type.userAction, category: b.category.core, biEventId: 257, biAdapter: "hed"}, OPEN_HELP_CENTER_FRAME: {desc: "Open help center popup (either initiated by the user, or for example in FirstTimeInEditor). (c1 is the origin. E.g.: TopBar, COMPONENT_PANEL_PagesContainer, FirstTimeInEditor)", type: b.type.userAction, category: b.category.editor, biEventId: 258, biAdapter: "hed"}, PERSONALIZE_COMP_STYLE_CLICK: {desc: "User clicked on 'Personalize this <component>' in the Change Style dialog box. (c1 is comp class name)", type: b.type.userAction, category: b.category.editor, biEventId: 259, biAdapter: "hed"}, EDIT_PRESET_STYLE_CLICK: {desc: "User clicked on 'Edit Style' on one of the preset styles in the Change Style dialog box. (c1 is comp class name)", type: b.type.userAction, category: b.category.editor, biEventId: 256, biAdapter: "hed"}, EDITOR_QUICK_ACTIONS_MODIFIED: {desc: "User modified QuickActions data. (g1: modified field; c1:new value, c2: old value)", type: b.type.userAction, category: b.category.editor, biEventId: 260, biAdapter: "hed"}, EDITOR_CONTACT_INFORMATION_MODIFIED: {desc: "User modified ContactInformation data. (g1: modified field; c1:new value, c2: old value)", type: b.type.userAction, category: b.category.editor, biEventId: 261, biAdapter: "hed"}, EDITOR_SOCIAL_LINKS_MODIFIED: {desc: "User modified SocialLinks data. (g1: modified field; c1:new value, c2: old value)", type: b.type.userAction, category: b.category.editor, biEventId: 262, biAdapter: "hed"}, EDITOR_PUBLISH_EDIT_SEO_CLICKED: {desc: "In publish dialog, user clicked the 'edit seo' link", type: b.type.userAction, category: b.category.editor, biEventId: 268, biAdapter: "hed"}, EDITOR_PUBLISH_EDIT_CONTACT_INFORMATION_CLICKED: {desc: "In publish dialog, user clicked the 'edit contact information' link", type: b.type.userAction, category: b.category.editor, biEventId: 269, biAdapter: "hed"}, EDITOR_PUBLISH_EDIT_QUICK_ACTIONS_CLICKED: {desc: "In publish dialog, user clicked the 'simplify usage for mobile visitors' link", type: b.type.userAction, category: b.category.editor, biEventId: 272, biAdapter: "hed"}, AVIARY_EDIT_IMAGE: {desc: 'Report that the user clicked on "Edit Image" in the image Property Panel.', type: b.type.userAction, category: b.category.editor, biEventId: 1, biAdapter: "aviary"}, AVIARY_SAVE_CHANGES: {desc: "Report that the user clicked the Save button after making some changes to the image, should be followed by an image upload.", type: b.type.userAction, category: b.category.editor, biEventId: 2, biAdapter: "aviary"}, AVIARY_SAVE_NO_CHANGE: {desc: "Report that the user clicked the Save button without making changes to the image, there should be no upload afterwards.", type: b.type.userAction, category: b.category.editor, biEventId: 3, biAdapter: "aviary"}, AVIARY_SAVE_SUCCESS: {desc: "Report that a full cycle of image upload the statics and to the private media was completed successfully.", type: b.type.userAction, category: b.category.editor, biEventId: 4, biAdapter: "aviary"}, AVIARY_CANCEL: {desc: "Report that the user closed the aviary dialog without saving his work.", type: b.type.userAction, category: b.category.editor, biEventId: 5, biAdapter: "aviary"}, AVIARY_REVERT_IMAGE: {desc: 'Report that the user clicked on "Revert" in the image Property Panel.', type: b.type.userAction, category: b.category.editor, biEventId: 6, biAdapter: "aviary"}, AVIARY_CANCEL_WHILE_SAVE: {desc: "Report that the user closed the aviary dialog after clicking save, while aviary saves his work.", type: b.type.userAction, category: b.category.editor, biEventId: 7, biAdapter: "aviary"}, MEDIA_DIALOG_OPEN: {desc: "Media dialog opened", type: b.type.userAction, category: b.category.editor, biEventId: 263, biAdapter: "hed"}, MEDIA_DIALOG_CANCEL: {desc: "Media dialog canceled ci: selected file name, c2: selected tab id ==> list id, c3: selected file type", type: b.type.userAction, category: b.category.editor, biEventId: 264, biAdapter: "hed"}, MEDIA_DIALOG_OK: {desc: "Media dialog closed with ok c1: selected file name, c2: selected tab id ==> list id, c3: selected file type", type: b.type.userAction, category: b.category.editor, biEventId: 265, biAdapter: "hed"}, DIALOG_CLOSED: {desc: "Dialog closed c1: dialogId or dialog name, c2: if dialog is help dialog it should be URL of help, c3: the reason that user closed dialog, cancel for example", type: b.type.userAction, category: b.category.editor, biEventId: 280, biAdapter: "hed"}, UPLOAD_BUTTON_PRESSED: {desc: "User pressed the upload button", type: b.type.userAction, category: b.category.editor, biEventId: 266, biAdapter: "hed"}, UPLOAD_SELECTED_FILES: {desc: "Files selected for upload c1:first file name ,c2: first file extension, i1: number of files to upload", type: b.type.userAction, category: b.category.editor, biEventId: 267, biAdapter: "hed"}, MOVED_PAGE_TO_BE_SUB_PAGE: {desc: "User dragged a page to be a subpage of another page", type: b.type.userAction, category: b.category.editor, biEventId: 273, biAdapter: "hed"}, RULERS_TURNED_ON: {desc: "User clicked on the rulers toggle button to turn them on", type: b.type.userAction, category: b.category.editor, biEventId: 274, biAdapter: "hed"}, RULERS_TURNED_OFF: {desc: "User clicked on the rulers toggle button to turn them off", type: b.type.userAction, category: b.category.editor, biEventId: 275, biAdapter: "hed"}, RULERS_GUIDE_ADDED: {desc: "User added a guide on a ruler (c1: left if it's a vertical guide and top if it's a horizontal one, i1: value)", type: b.type.userAction, category: b.category.editor, biEventId: 276, biAdapter: "hed"}, RULERS_GUIDE_DELETED: {desc: "User deleted a guide", type: b.type.userAction, category: b.category.editor, biEventId: 277, biAdapter: "hed"}, RULERS_GUIDE_DRAGGED: {desc: "User dragged a guide on the ruler", type: b.type.userAction, category: b.category.editor, biEventId: 278, biAdapter: "hed"}, RULERS_GUIDE_CLICKED: {desc: "User clicked on a guide handle and got the popup about the delete", type: b.type.userAction, category: b.category.editor, biEventId: 279, biAdapter: "hed"}, MEDIA_GALLERY_OPEN: {desc: "User triggered MediaGallery", type: b.type.userAction, category: b.category.editor, biEventId: 281, biAdapter: "hed"}, MEDIA_GALLERY_CLOSE: {desc: "User closed MediaGallery", type: b.type.userAction, category: b.category.editor, biEventId: 282, biAdapter: "hed"}, MEDIA_GALLERY_SUCCESSFULLY_OPENED: {desc: "User closed MediaGallery", type: b.type.userAction, category: b.category.editor, biEventId: 290, biAdapter: "hed"}, CHARACTER_SET_ADDED: {desc: "User added character set to site. c1 : the added language", type: b.type.userAction, category: b.category.editor, biEventId: 293, biAdapter: "hed"}, CHARACTER_SET_REMOVED: {desc: "User removed character set from site.c1 : the removed language", type: b.type.userAction, category: b.category.editor, biEventId: 294, biAdapter: "hed"}, LANGUAGE_SUPPORT_OPENED: {desc: "Opened language support panel. c1 = source", type: b.type.userAction, category: b.category.editor, biEventId: 100, biAdapter: "hed-fonts"}, FONTS_USED_ON_SITE: {desc: "Fonts used on site", type: b.type.userAction, category: b.category.editor, biEventId: 198, biAdapter: "hed"}, RENAME_PAGES_FROM_FPP: {desc: "BI event that will be sent upon clicking on the rename pages link, from Floating PP", type: b.type.userAction, category: b.category.editor, biEventId: 197, biAdapter: "hed"}, FIXED_POSITION_TOGGLED: {desc: "BI event that will be sent upon toggling the fixed position for components that allow it", type: b.type.userAction, category: b.category.editor, biEventId: 196, biAdapter: "hed"}, TPA_UPGRADE_MODAL_OPENED: {desc: "user clicked the TPA upgrade button from TPA settings", type: b.type.userAction, category: b.category.editor, biEventId: 286, biAdapter: "hed"}, APP_MARKET_OPENED: {desc: "The app market was opened", type: b.type.userAction, category: b.category.editor, biEventId: 287, biAdapter: "hed"}, COMPONENT_ROTATED: {desc: "Rotated a component with mouse.  c1=componentType; c2=page_id;", type: b.type.userAction, category: b.category.editor, biEventId: 296, biAdapter: "hed"}, ROTATION_RESET: {desc: "Reset rotation angle of component. c1=componentType; c2=page_id;", type: b.type.userAction, category: b.category.editor, biEventId: 297, biAdapter: "hed"}, CHANGE_ANGLE_THROUGH_PANEL: {desc: "User change component angle through panel. c1=componentType; c2=page_id; i1=angle", type: b.type.userAction, category: b.category.editor, biEventId: 298, biAdapter: "hed"}, EFFECTS_MENU_OPEN: {desc: "rich text effect menu opened", type: b.type.userAction, category: b.category.editor, biEventId: 192, biAdapter: "hed"}, TEXT_EFFECT_SELECT: {desc: "rich text effect was selected", type: b.type.userAction, category: b.category.editor, biEventId: 193, biAdapter: "hed"}, SNAP_TO_TOGGLE: {desc: "snap to toggle button", type: b.type.userAction, category: b.category.editor, biEventId: 190, biAdapter: "hed"}, ANIMATIONS_DIALOG_OPENED: {desc: "Animation dialog opened ( c1: compType, c2: Animation Type )", type: b.type.userAction, category: b.category.editor, biEventId: 100, biAdapter: "ants"}, ANIMATIONS_GALLERY_ANIMATION_SELECTED: {desc: "Animation dialog - animation selected ( c1: compType, c2: Animation Type )", type: b.type.userAction, category: b.category.editor, biEventId: 101, biAdapter: "ants"}, ANIMATIONS_DIALOG_SAVED: {desc: "Animation dialog - animation saved ( c1: compType, c2: Animation Type )", type: b.type.userAction, category: b.category.editor, biEventId: 102, biAdapter: "ants"}, ANIMATIONS_GALLERY_ANIMATION_DELETED: {desc: "Animation dialog - animation deleted ( c1: compType, c2: Animation Type )", type: b.type.userAction, category: b.category.editor, biEventId: 103, biAdapter: "ants"}, ANIMATIONS_GALLERY_QUICK_PREVIEW_BUTTON: {desc: "Animation dialog - preview button clicked ( c1: compType, c2: Animation Type )", type: b.type.userAction, category: b.category.editor, biEventId: 104, biAdapter: "ants"}, OPEN_FEEDBACK_PANEL: {desc: "Click on feedback Icon", type: b.type.userAction, biEventId: 100, biAdapter: "fdbk"}, CLOSE_FEEDBACK_PANEL: {desc: "close feedback panel", type: b.type.userAction, biEventId: 101, biAdapter: "fdbk"}, SHARE_BUTTON_CLICKED: {desc: "Click on share feedback button", type: b.type.userAction, biEventId: 102, biAdapter: "fdbk"}, EXIT_COMMENTS_VIEW_MODE: {desc: "Hide comments button in editor", type: b.type.userAction, biEventId: 103, biAdapter: "fdbk"}, FEEDBACK_COMMENT_SELECTED_EDITOR: {desc: "Comment selected in editor. c1 is the origin of selection- comment or panel.", type: b.type.userAction, biEventId: 104, biAdapter: "fdbk"}, FEEDBACK_COMMENT_DELETED_EDITOR: {desc: "Comment deleted in editor", type: b.type.userAction, biEventId: 105, biAdapter: "fdbk"}, FEEDBACK_SHOW_COMMENTS_COMBO_PRESSED: {desc: "User pressed the comments show or hide combo box. i1 = 1 if set to show, 0 otherwise", type: b.type.userAction, biEventId: 106, biAdapter: "fdbk"}, FEEDBACK_ADD_COMMENT_PREVIEW: {desc: "user click on add comment in preview", type: b.type.userAction, biEventId: 201, biAdapter: "fdbk"}, FEEDBACK_COMMENT_DELETED_PREVIEW: {desc: "Comment deleted in preview", type: b.type.userAction, biEventId: 202, biAdapter: "fdbk"}, FEEDBACK_SUBMIT_COMMENTS_PREVIEW: {desc: "User click on submit panel in preview", type: b.type.userAction, biEventId: 203, biAdapter: "fdbk"}, FEEDBACK_SEND_COMMENTS: {desc: "User click on send button in preview. i1 is the number of comments sent. i2=1 if submitter name exists, 0 otherwise", type: b.type.userAction, biEventId: 204, biAdapter: "fdbk"}, FEEDBACK_COMMENT_EMOTION_SELECTED: {desc: "User selected emotion on comment. i1 = 1 if emotion is happy, 0 otherwise", type: b.type.userAction, biEventId: 205, biAdapter: "fdbk"}, FEEDBACK_USER_CLICKED_FEEDBACK_QUICKTOUR_GOT_IT: {desc: "User clicked on got it button in the feedback quick tour screen", type: b.type.userAction, biEventId: 206, biAdapter: "fdbk"}, FEEDBACK_USER_CLICKED_WIX_ADS: {desc: "User of user clicked on wix ads while creating feedback. c1 - the ad that was clicked", type: b.type.userAction, biEventId: 207, biAdapter: "fdbk"}, HIDDEN_ELEMENT_MENU_OPENED: {desc: "Hidden components list was displayed", type: b.type.userAction, biEventId: 101, biAdapter: "hed-comp"}, HIDDEN_ELEMENT_SELECTED: {desc: 'User clicked on an hidden component from the list {c1: componentId, c2: componentScope (possible values: "CURRENT_PAGE", "MASTER_PAGE"), g1: viewDevice (possible values: "MOBILE", "DESKTOP"")}', type: b.type.userAction, biEventId: 102, biAdapter: "hed-comp"}, APP_MARKET_TOOLTIP_DISPLAYED: {desc: "App Market tooltip is displayed", type: b.type.userAction, category: b.category.editor, biEventId: 510, biAdapter: "hed"}, SET_EDITOR: {desc: "setEditor", type: b.type.timing, category: b.category.editor, biEventId: 345, biAdapter: "mlt"}, EDITOR_COMPONENTS_READY: {desc: "Editor components", type: b.type.timing, category: b.category.editor, biEventId: 346, biAdapter: "mlt"}, COMPONENT_READY: {desc: "Editor components", type: b.type.timing, category: b.category.editor, biEventId: 347, biAdapter: "mlt"}, OPEN_EDITOR_PANEL: {desc: "Open editor panel on first level", type: b.type.userAction, category: b.category.editor, biEventId: 511, biAdapter: "hed"}, OPEN_EDITOR_SUB_PANEL: {desc: "Open editor panel on second level or more", type: b.type.userAction, category: b.category.editor, biEventId: 512, biAdapter: "hed"}, OPEN_PAGES_NAVIGATOR: {desc: "Open pages navigation dropdown on editor top bar", type: b.type.userAction, category: b.category.editor, biEventId: 513, biAdapter: "hed"}, PAGE_NAVIGATION_COMPLETED_EDITOR: {desc: "User navigated to a page in editor (c1=page_id, c2=viewer_name)", type: b.type.userAction, category: b.category.editor, biEventId: 140, biAdapter: "hed-misc"}, DESKTOP_PREVIEW_DOM_LOADED: {desc: "Fired when the live-preview DOM is loaded. params: c1-a json string with the following properties 'pages'-number of pages in the editor, 'comps'-number of components in the editor (counted up to 1000)", type: b.type.timing, category: b.category.editor, biEventId: 144, biAdapter: "hed-misc"}, COPY_COMMAND: {desc: "Copy", type: b.type.userAction, category: b.category.editor, biEventId: 515, biAdapter: "hed"}, PASTE_COMMAND: {desc: "Paste", type: b.type.userAction, category: b.category.editor, biEventId: 516, biAdapter: "hed"}, TOGGLE_GRIDLINES_FROM_TOPBAR: {desc: "Toggle grid lines from editor top bar", type: b.type.userAction, category: b.category.editor, biEventId: 517, biAdapter: "hed"}, ADD_PAGE_ITEM_PREVIEW: {desc: "User clicks on a page template in Add Page dialog", type: b.type.userAction, category: b.category.editor, biEventId: 519, biAdapter: "hed"}, CHANGE_COMP_STYLE_BUTTON: {desc: "User clicked on Change Style button in Property Panel", type: b.type.userAction, category: b.category.editor, biEventId: 514, biAdapter: "hed"}, CLICK_ON_WIX_LOGO: {desc: "User clicks on Wix Logo", type: b.type.userAction, category: b.category.editor, biEventId: 518, biAdapter: "hed"}, ADD_PAGE_VIA_PAGES_PANEL: {desc: "User clicks Add Page in Pages Panel", type: b.type.userAction, category: b.category.editor, biEventId: 511, biAdapter: "hed"}, WEBMASTER_LOGIN_SUCCESS: {desc: "User successfully logged in", type: b.type.userAction, category: b.category.editor, biEventId: 520, biAdapter: "hed"}, ORGANIZE_IMAGES_CLICKED: {desc: "User clicked on Organize Images", type: b.type.userAction, category: b.category.editor, biEventId: 521, biAdapter: "hed"}, USER_CLICK_HIDE_PAGE: {desc: "User clicks on hide/unhide from menu checkbox in page settings panel", type: b.type.userAction, category: b.category.editor, biEventId: 523, biAdapter: "hed"}, QUICK_TOUR_MOBILE_TUTORIAL_AUTO_START: {desc: "Tour started automatically", type: b.type.userAction, category: b.category.editor, biEventId: 106, biAdapter: "hed-mobile"}, QUICK_TOUR_MOBILE_TUTORIAL_STARTED_FROM_HELP_CENTER: {desc: "Tour started from Editor Help Center", type: b.type.userAction, category: b.category.editor, biEventId: 107, biAdapter: "hed-mobile"}, QUICK_TOUR_MOBILE_TUTORIAL_NEXT_STEP_CLICKED: {desc: "Next step button clicked. param - current step number", type: b.type.userAction, category: b.category.editor, biEventId: 108, biAdapter: "hed-mobile"}, QUICK_TOUR_MOBILE_TUTORIAL_SPECIFIC_STEP_CLICKED: {desc: "Specific step circle clicked. params - current step, requested step", type: b.type.userAction, category: b.category.editor, biEventId: 109, biAdapter: "hed-mobile"}, QUICK_TOUR_MOBILE_TUTORIAL_SKIP_CLICKED: {desc: "Skip tutorial link pressed", type: b.type.userAction, category: b.category.editor, biEventId: 110, biAdapter: "hed-mobile"}, QUICK_TOUR_MOBILE_TUTORIAL_FINISH_CLICKED: {desc: "Tutorial finished (last OK button clicked)", type: b.type.userAction, category: b.category.editor, biEventId: 111, biAdapter: "hed-mobile"}, MOBILE_BACK_TO_TOP_BUTTON_OPEN_PANEL: {desc: "Panel - User clicked to open the panel", type: b.type.userAction, category: b.category.editor, biEventId: 115, biAdapter: "hed-mobile"}, MOBILE_BACK_TO_TOP_BUTTON_TOGGLE: {desc: "Panel - Back top top switch toggled", type: b.type.userAction, category: b.category.editor, biEventId: 116, biAdapter: "hed-mobile"}, MOBILE_BACK_TO_TOP_BUTTON_PREVIEW_CLICK: {desc: "Panel - Preview link clicked", type: b.type.userAction, category: b.category.editor, biEventId: 117, biAdapter: "hed-mobile"}, MOBILE_EXIT_MOBILE_MODE_BUTTON_ADD_COMPONENT: {desc: "Exit mobile button has been added to site - Not published yet", type: b.type.userAction, category: b.category.editor, biEventId: 118, biAdapter: "hed-mobile"}, LAYOUT_DIRTY_AFTER_ENFORCE_ANCHORS: {desc: "there are still dirty comps after enforce anchors, probably wrong y order.", type: b.type.userAction, category: b.category.viewer, biEventId: 534, biAdapter: "hed"}, USER_CLICK_MOVE_TO_FOOTER_BUTTON: {desc: 'User clicked on "move component to footer" button', type: b.type.userAction, category: b.category.editor, biEventId: 100, biAdapter: "hed-comp"}, CHANGE_GALLERY: {desc: "User changed gallery type", type: b.type.userAction, category: b.category.editor, biEventId: 123, biAdapter: "mg"}, LANDING_PAGE_TOGGLED_IN_PAGE_SETTINGS: {desc: "User toggled the landing page option for a page", type: b.type.userAction, category: b.category.editor, biEventId: 105, biAdapter: "hed-misc"}, BGPP_ADD_TO_OTHER_PAGES_LINK: {desc: "User clicks the link to add background to other pages", type: b.type.userAction, category: b.category.editor, biEventId: 120, biAdapter: "hed-misc"}, BGPP_ADD_TO_ALL_PAGES: {desc: "User checks the Add to All Pages checkbox", type: b.type.userAction, category: b.category.editor, biEventId: 121, biAdapter: "hed-misc"}, BGPP_ADD_TO_OTHER_PAGES_CANCEL_DIALOG: {desc: "User cancels the BGPP 'Add to Other Pages' dialog operation. (c1='cancel-button'/'X-button'/esc-key')", type: b.type.userAction, category: b.category.editor, biEventId: 122, biAdapter: "hed-misc"}, BGPP_ADD_TO_OTHER_PAGES_OK_DIALOG: {desc: "User clicks OK on the BGPP 'Add to Other Pages' dialog.(i1=total of selected pages, i2=total of unselected pages)", type: b.type.userAction, category: b.category.editor, biEventId: 123, biAdapter: "hed-misc"}, BGPP_DATA_CLEANUP: {desc: "Cleans up BGPP Data from site for users in editor that dont have BGPP experiment opened.", type: b.type.userAction, category: b.category.editor, biEventId: 323, biAdapter: "hed-misc"}, TXT_EDITOR_FONT_SELECTION_OPEN: {desc: "User opened font selection drop down", type: b.type.userAction, biEventId: 100, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_FONT_SELECTED: {desc: "User selected font from drop down", type: b.type.userAction, biEventId: 101, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_STYLES_SELECTION_OPEN: {desc: "User opened styles selection drop down", type: b.type.userAction, biEventId: 102, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_STYLE_SELECTED: {desc: "User selected new style", type: b.type.userAction, biEventId: 103, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_FONT_SIZE_OPEN: {desc: "User opened font size drop down", type: b.type.userAction, biEventId: 104, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_FONT_COLOR_OPEN: {desc: "User opened font color", type: b.type.userAction, biEventId: 105, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_BACKGROUND_FONT_COLOR: {desc: "User opened background color", type: b.type.userAction, biEventId: 106, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_BOLD: {desc: "User toggled bold", type: b.type.userAction, biEventId: 107, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_UNDERLINE: {desc: "User toggled underline", type: b.type.userAction, biEventId: 108, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_ITALIC: {desc: "User toggled italic", type: b.type.userAction, biEventId: 109, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_REMOVE_TEXT_FORMAT: {desc: "User removed text formatting", type: b.type.userAction, biEventId: 110, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_LINE_HEIGHT_OPEN: {desc: "User opened line height drop down", type: b.type.userAction, biEventId: 111, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_CHARACTER_SPACING: {desc: "User opened character spacing drop down", type: b.type.userAction, biEventId: 112, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_INCREASE_INDENT: {desc: "User pressed increase indent", type: b.type.userAction, biEventId: 113, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_DECREASE_INDENT: {desc: "User pressed decrease indent", type: b.type.userAction, biEventId: 114, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_TEXT_ALIGNMENT_OPEN: {desc: "User opened text alignment drop down", type: b.type.userAction, biEventId: 115, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_TEXT_ALIGNMENT_CHOSEN: {desc: "User aligned the text {c1: alignment direction}", type: b.type.userAction, biEventId: 124, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_BULLETS: {desc: "User pressed bulltes list", type: b.type.userAction, biEventId: 116, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_NUMBERRING: {desc: "User pressed numbers list", type: b.type.userAction, biEventId: 117, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_LEFT_TO_RIGHT: {desc: "User set text direction left to right", type: b.type.userAction, biEventId: 118, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_RIGHT_TO_LEFT: {desc: "User set text direction right to left", type: b.type.userAction, biEventId: 119, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_LINK: {desc: "User started edit link", type: b.type.userAction, biEventId: 120, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_REMOVE_LINK: {desc: "User removed link", type: b.type.userAction, biEventId: 121, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_CLOSE_PANEL: {desc: 'Text editor close {c1: close source "x" or clicked outside the text}', type: b.type.userAction, biEventId: 122, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_OPEN_PANEL: {desc: "Text editor open {c1: open source fpp or double click}", type: b.type.userAction, biEventId: 123, biAdapter: "hed-ck", sampleRatio: 10}, TXT_EDITOR_REMOVE_EMPTY_BOX: {desc: "Text editor Removed Empty Box", type: b.type.userAction, biEventId: 125, biAdapter: "hed-ck", sampleRatio: 1}, VIDEO_SEARCH_BUTTON: {desc: "user clicks the (search videos) button", biEventId: 103, biAdapter: "hed-comp"}, VIDEO_VIDEOURL_UPDATED: {desc: "video url field is updated", biEventId: 104, biAdapter: "hed-comp"}, VIDEO_SEARCHING: {desc: "user clicks the (search) button on popup", biEventId: 105, biAdapter: "hed-comp"}, VIDEO_UPDATE_BUTTON: {desc: "user clicks the (update) button on settings panel", biEventId: 106, biAdapter: "hed-comp"}, ORGIMAGES_CLICK_CLOSE: {desc: "organize images -> user clicks x", biEventId: 201, biAdapter: "mg"}, ORGIMAGES_CLICK_CANCEL: {desc: "organize images -> user clicks cancel", biEventId: 202, biAdapter: "mg"}, ORGIMAGES_CLICK_CONFIRMATION: {desc: "organize images -> user clicks on confirmation message (+parameter for yes/no)", biEventId: 203, biAdapter: "mg"}, ORGIMAGES_CLICK_REPLACE: {desc: "organize images -> user clicks replace image", biEventId: 204, biAdapter: "mg"}, ORGIMAGES_CLICK_ADD_IMAGES: {desc: "organize images -> user clicks add images", biEventId: 205, biAdapter: "mg"}, ORGIMAGES_START_REORDERING: {desc: "organize images -> user reorders images (only first event)", biEventId: 206, biAdapter: "mg"}, ORGIMAGES_CLICK_DELETE: {desc: "organize images -> user clicks delete on image (+parameter for is_default = 0/1)", biEventId: 207, biAdapter: "mg"}, ORGIMAGES_DIALOG_LOADED: {desc: "organize images -> successful loading of the dialog", biEventId: 208, biAdapter: "mg"}, ORGIMAGES_EDIT_TITLE: {desc: "organize images -> user edits title field (first event)", biEventId: 210, biAdapter: "mg"}, ORGIMAGES_EDIT_DESCRIPTION: {desc: "organize images -> user edits description field (only first event)", biEventId: 211, biAdapter: "mg"}, ORGIMAGES_ADD_LINK: {desc: "organize images -> user add a link (only first event)", biEventId: 212, biAdapter: "mg"}, FORM_SUBMIT: {desc: "Form submit started", biEventId: 100, biAdapter: "ugc-viewer"}, FORM_SUBMIT_SUCCESS: {desc: "Form was succefuly submitted", biEventId: 101, biAdapter: "ugc-viewer"}, SAVE_SUCCESS_DONT_SHOW_AGAIN_CHECKED: {desc: "Save success dialog: dont show again checkbox clicked", biAdapter: "hed-misc", biEventId: 150}, PROMOTE_DIAOLOG_DONT_SHOW_AGAIN_CHECKED: {desc: "Promote your site dialog: dont show again checkbox clicked", biAdapter: "hed-misc", biEventId: 151}, CLICK_SITE_LINK_PUBLISH_SUCCESS: {desc: "Publish success dialog: site link clicked", biAdapter: "hed-misc", biEventId: 152}, PUBLISH_NOW_SAVE_SUCCESS: {desc: "Save success dialog: publish button clicked", biAdapter: "hed-misc", biEventId: 153}, SAVE_NOW_REGULAR: {desc: "First save dialog: save button clicked", biAdapter: "hed-misc", biEventId: 154}, SAVE_NOW_BEFORE_EDITING: {desc: "Save before editing dialog: save button clicked [e.g. trying to edit blog page]", biAdapter: "hed-misc", biEventId: 155}, UPGRADE_NOW_PUBLISH_SUCCESS: {desc: "Publish success dialog: upgrade button clicked", biAdapter: "hed-misc", biEventId: 156}, MAYBE_LATER_PROMOTE_DIALOG: {desc: "Promote dialog: maybe later button clicked", biAdapter: "hed-misc", biEventId: 157}, DIALOG_CLOSED_OK: {desc: "Dialog was closed by clicking on OK button", biAdapter: "hed-misc", biEventId: 158}, DIALOG_CLOSED_X: {desc: "Dialog was closed by clicking on X button", biAdapter: "hed-misc", biEventId: 159}, BACKGROUND_PANEL_SCROLL: {desc: "to which point the user scrolled the thumbnails list in Background Design Panel", type: b.type.userAction, category: b.category.editor, biEventId: 125, biAdapter: "hed"}}, a.wixErrors = {USER_MANAGER_NOT_FOUND: {errorCode: 46001, desc: "UserManager is missing", type: b.type.error, category: b.category.viewer, issue: b.issue.defaultVal, severity: b.severity.error}, SERVER_NAME_VALIDATION_FAILED: {errorCode: 33001, desc: "site name validation failed", type: b.type.error, category: b.category.server, issue: b.issue.defaultVal, severity: b.severity.error}, SERVER_NAME_VALIDATION_DEAD: {errorCode: 33002, desc: "site name validation failed to many times", type: b.type.error, category: b.category.server, issue: b.issue.defaultVal, severity: b.severity.fatal}, EDITOR_DOM_DELAY: {errorCode: 24001, desc: "Editor DOM not ready in time", type: b.type.timing, category: b.category.editor, issue: b.issue.timing, severity: b.severity.warning}, SITE_DOM_DELAY: {errorCode: 14001, desc: "Site DOM not ready in time", type: b.type.timing, category: b.category.viewer, issue: b.issue.timing, severity: b.severity.warning}, PREVIEW_DOM_DELAY: {errorCode: 14003, desc: "Preview DOM not ready in time", type: b.type.timing, category: b.category.viewer, issue: b.issue.timing, severity: b.severity.warning}, PREVIEW_MANAGER_PREVIEW_TOO_LONG: {errorCode: 14005, desc: "Site preview took too long", type: b.type.error, category: b.category.core, issue: b.issue.defaultVal, severity: b.severity.error, callLimit: 1}, RESOURCE_NOT_LOADED: {errorCode: 14006, desc: "Resource not loaded in time (c1: Resource Name)", type: b.type.error, category: b.category.editor, issue: b.issue.defaultVal, severity: b.severity.fatal, callLimit: 5, sampleRatio: 10}, PREVIEW_NOT_FOUND: {errorCode: 14007, desc: "Preview iframe missing", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, EDITOR_READY_DELAY: {errorCode: 24002, desc: "Editor not ready in time", type: b.type.timing, category: b.category.editor, issue: b.issue.timing, severity: b.severity.warning}, SITE_READY_DELAY: {errorCode: 14002, desc: "Site not ready in time", type: b.type.timing, category: b.category.viewer, issue: b.issue.timing, severity: b.severity.warning, sampleRatio: 10}, PREVIEW_READY_DELAY: {errorCode: 14004, desc: "Preview not ready in time", type: b.type.timing, category: b.category.viewer, issue: b.issue.timing, severity: b.severity.warning, sampleRatio: 10}, UNKNOWN_ERROR: {errorCode: 1e4, desc: "Unknown error", type: b.type.error, category: b.category.viewer, issue: b.issue.components, severity: b.severity.fatal}, NO_SKIN: {errorCode: 2, desc: "No skin Found", type: b.type.error, category: b.category.viewer, issue: b.issue.components, severity: b.severity.fatal}, SKIN_PARAM_REF_NOT_FOUND: {errorCode: 150001, desc: "No param ref found for param", type: b.type.error, category: b.category.core, issue: b.issue.skins, severity: b.severity.warning}, SKIN_PARAM_MUTATOR_FUNC_NOT_FOUND: {errorCode: 150002, desc: "Mutator function was not found on value", type: b.type.error, category: b.category.core, issue: b.issue.skins, severity: b.severity.error}, SKIN_PART_MISSING: {errorCode: 150003, desc: "Skin did not supply required skinPart (c1: Component Name, c2: Skin Name:Part Name)", type: b.type.error, category: b.category.core, issue: b.issue.skins, severity: b.severity.error}, SKIN_CLASS_RULE_ERROR: {errorCode: 150004, desc: "Skin rule write to browser failed", type: b.type.error, category: b.category.viewer, issue: b.issue.skins, severity: b.severity.error}, COMPONENT_ERROR: {errorCode: 110001, desc: "Component uncaught error", type: b.type.error, category: b.category.viewer, issue: b.issue.components, severity: b.severity.error}, MISSING_METHOD: {errorCode: 3, desc: "Method not defined", type: b.type.error, category: b.category.core, issue: b.issue.components, severity: b.severity.fatal}, MANAGERS_INVALID_NAME: {errorCode: 1201, desc: "Invalid manager name", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, MANAGERS_INVALID_CLASS: {errorCode: 12002, desc: "Invalid manager class: check script loading order", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, MANAGERS_INVALID: {errorCode: 12012, desc: "invalid manager", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, PM_SITE_LOAD_FAILED: {errorCode: 12110, desc: "site did not load due to an error in the page manager (dsc should contain the specific error message)", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, PM_PAGE_FAILED_BEFORE_WIXIFY: {errorCode: 12111, desc: "the page manager failed to load the page due to an exception (dsc contains stack trace)", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, PM_RENDER_PAGE_FAILED: {errorCode: 12113, desc: "the page manager failed to wixify/render the page (dsc contains stack trace)", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, PM_RENDER_FILED_COMPS: {errorCode: 12114, desc: "some components didn't render correctly", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.recoverable}, PM_FOUND_FAILED_COMP_WITH_ANCHORS: {errorCode: 12115, desc: "found anchors on a filed component", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.warning}, PM_LOAD_PAGE_FIXED: {errorCode: 12112, desc: "the site previously failed to load due to a missing resource, and this issue has been fixed", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.recoverable}, PAGE_NAVIGATION_FAILED: {errorCode: 12116, desc: "there was an exception while navigating pages", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.recoverable}, CLASS_INVALID_TYPE: {errorCode: 12021, desc: "Invalid class data for", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, CLASS_INVALID_NAME: {errorCode: 12025, desc: "Invalid class name (must start with a capital letter, followed by alphanumeric): ", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, CLASS_NAME_ALREADY_EXIST: {errorCode: 12026, desc: "Invalid class name - a class with the same name already exist: ", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, CLASS_DOUBLE_TRAIT_NAME: {errorCode: 12027, desc: "Invalid trait name - a trait with the same name already exist: ", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, CLASS_INVALID_PENDING_OBJECT: {errorCode: 12028, desc: "Invalid object found on pending list for class", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, CM_NAME_ALREADY_EXIST: {errorCode: 12031, desc: "Invalid component: component already exist", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.recoverable}, CM_NO_EXTEND: {errorCode: 12032, desc: "Invalid component extend: no component extend found", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, CM_LOGIC_TYPE: {errorCode: 12033, desc: "logic type was not supplied", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, CM_SKIN_TYPE: {errorCode: 12034, desc: "skin type was not supplied", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, CM_NO_SKINPART: {errorCode: 12035, desc: "couldn't find skinPart", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, CM_NO_PART: {errorCode: 12036, desc: "missing part id or type", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, CM_NO_NEW_SKIN: {errorCode: 12037, desc: "we currently don't support applying new skins", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, CM_NO_DATA: {errorCode: 12038, desc: "data is unavailable for skinPart", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, EXPERIMENT_INVALID_MODIFY: {errorCode: 12101, desc: "Invalid use of modify in experiment class", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, CM_UNKNOWN_STATE_GROUP: {errorCode: 11003, desc: "Unknown component state group", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.warning}, CM_MALFORMED_STATES: {errorCode: 11004, desc: "Malformed state data in component definition", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.warning}, CM_UNKNOWN_STATE_NAME: {errorCode: 11006, desc: "Unknown state name", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.warning}, CM_DUPLICATE_STATE_NAME: {errorCode: 11013, desc: "duplicate state name", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, IMG_SIZE_ZERO: {errorCode: 11007, desc: "image size is zero", type: b.type.error, category: b.category.core, issue: b.issue.components, severity: b.severity.warning}, IMG_VALID_SIZE_AFTER_ZERO: {errorCode: 11008, desc: "image size is changed from zero to visible size", type: b.type.error, category: b.category.core, issue: b.issue.components, severity: b.severity.recoverable, sampleRatio: 100}, IMG_INVALID_SETTINGS: {errorCode: 11009, desc: "set invalid image settings", type: b.type.error, category: b.category.core, issue: b.issue.components, severity: b.severity.error}, COMPONENT_PROPERTIES_PROP_NOT_FOUND: {errorCode: 11010, desc: "component property not found", type: b.type.error, category: b.category.core, issue: b.issue.components, severity: b.severity.warning}, COMPONENT_PROPERTIES_BAD_PROP_DEF: {errorCode: 11011, desc: "bad property definition in component property schema", type: b.type.error, category: b.category.core, issue: b.issue.components, severity: b.severity.warning}, COMPONENT_PROPERTIES_PROP_NOT_VALID: {errorCode: 11012, desc: "Invalid property values", type: b.type.error, category: b.category.core, issue: b.issue.components, severity: b.severity.warning}, SAVE_ERROR_FROM_SERVER_10104: {errorCode: 10104, desc: "User failed to save due to error 10104", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, SAVE_ERROR_FROM_SERVER_10104_FIXED: {errorCode: 10105, desc: "Site was automatically fixed after a failed save", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.recoverable}, SAVE_ERROR_FROM_SERVER_10104_NONFATAL_FIXED: {errorCode: 10106, desc: "Site was automatically fixed after a failed save", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.recoverable}, UNFIXABLE_10104_DUPLICATE_SIBLINGS: {errorCode: 10107, desc: "User failed to save due to error 10104, and this could not be fixed", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, UNFIXABLE_10104_INVALID_PARENTS: {errorCode: 10108, desc: "User failed to save due to error 10104, and this could not be fixed", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, SAVE_ERROR_10104_MISSING_PAGES_CONTAINER: {errorCode: 10109, desc: "User failed to save due to error 10104, and this could not be fixed", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, INVALID_DATAQUERY_BOTH_STRUCTURES: {errorCode: 10110, desc: "Validation error. A component exists in both structures, but has a reference to data which is missing or of the wrong type.", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, INVALID_DATAQUERY_ONLY_MOBILE: {errorCode: 10111, desc: "Validation error. A component exists in both structures, but only the MOBILE version has an invalid reference to data.", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, INVALID_DATAQUERY_ONLY_DESKTOP: {errorCode: 10112, desc: "Validation error. A component exists in both structures, but only the DESKTOP version has an invalid reference to data.", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, COMP_IN_MOBILE_BUT_NOT_DESKTOP: {errorCode: 10113, desc: "Validation error. A component exists in MOBILE only, and also has an invalid reference to data", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, COMP_IN_DESKTOP_BUT_NOT_MOBILE: {errorCode: 10114, desc: "Validation error. A component exists in DESKTOP only, and also has an invalid reference to data", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, MERGE_FIXED_ERROR_10104: {errorCode: 10115, desc: "running merge after an error 10104 due to dataReferenceMismatches has fixed the problem", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.recoverable}, CORRUPT_SITE_PAGEGROUP_HAS_NONPAGE_CHILDREN_DURING_THIS_SESSION: {errorCode: 10117, desc: "The page group has a component (child) which is not a page", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.recoverable}, CORRUPT_SITE_PAGEGROUP_WAS_SAVED_WITH_NONPAGE_CHILDREN: {errorCode: 10118, desc: "The page group has a component (child) which is not a page", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.recoverable}, CORRUPT_SITE_NONPAGE_CHILD_ADDED_TO_PAGEGROUP: {errorCode: 10119, desc: "The page group has a component (child) which is not a page", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.recoverable}, INCORRECT_PAGESCONTAINER_HEIGHT: {errorCode: 10120, desc: "There is a gap that shouldn't exist between the pagescontainer, and the sitepages. It was adjusted and the anchors were updated. (p1: LOAD/SAVE, p2: DESKTOP/MOBILE, p3: 1-bug WOH-9687 0-old bug, p4: size of the gap found)", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.recoverable}, ERROR_WHILE_DELETING_PAGES: {errorCode: 10121, desc: "There was an error while deleting a page", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.recoverable}, INVALID_COMPONENT_ATTEMPT_TO_BE_FIXEDPOSITION: {errorCode: 10122, desc: "Somehow a user tried to set a component to be fixed position, which is not header or footer", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.warning}, DATAQUERY_TO_DATA_BUT_NOT_DIRTY: {errorCode: 10124, desc: "A site was saved with a reference to some data, but the data itself was not marked dirty to be saved", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.warning}, INVALID_DATAQUERY_MISSING_DATA_FROM_REFLIST: {errorCode: 10125, desc: "A reflist (such as an imagelist) has a reference to a dataItem which does not exist", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.warning}, LT_LINK_UNKNOWN: {errorCode: 12041, desc: "LinkTypesManager unknown link subtype", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, LT_INVALID_LINK_TYPE: {errorCode: 12042, desc: "LinkTypesManager.getNewLink - invalid linkType:", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, SKIN_ALREADY_EXIST: {errorCode: 12051, desc: "Invalid skin: skin name already exist", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.recoverable}, SKIN_PARAM_NOT_PROVIDED: {errorCode: 12053, desc: "Skin param error: param not provided for skin with tags", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, SKIN_PROBLEM_WITH_RULE: {errorCode: 12054, desc: "problem with creating rule", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, SKIN_ALREADY_IN_USE: {errorCode: 12055, desc: "Skin already in use", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, VM_INVALID_SITE_NODE: {errorCode: 12061, desc: "Invalid site node", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, VM_INVALID_SITE_DATA: {errorCode: 12062, desc: "Invalid site node", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, TRAIT_INVALID: {errorCode: 12071, desc: "Invalid trait data", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, TRAIT_DOUBLE_NAME: {errorCode: 12073, desc: "Invalid trait name - a trait with the same name already exist: ", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, TRAIT_DOUBLE_CLASS_NAME: {errorCode: 12074, desc: "Invalid trait name - a class with the same name already exist: ", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, UTILS_RULE_ALREADY_EXIST: {errorCode: 12081, desc: "Error creating a rule that already exist", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, UTILS_ERR_CREATE_STYLE: {errorCode: 12082, desc: "Utils.createStyleSheet(styles.js) error creating stylesheet!", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, UTILS_STYLE_NOT_FOUND: {errorCode: 12083, desc: "stylesheet not found on style node in setup", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, CONFIG_MANAGER_NO_PARAM: {errorCode: 12090, desc: "required param not supplied", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, UPLOAD_FAIL: {errorCode: 21011, desc: "upload error", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.fatal}, EM_ERROR_CLONE_SITE: {errorCode: 22021, desc: "Error cloning site error", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, NO_DEFAULT_SKIN_FOUND: {errorCode: 25001, desc: "Default skin not found for component", type: b.type.error, category: b.category.editor, issue: b.issue.skins, severity: b.severity.fatal}, STYLE_EXTRA_PARAM_DEFINITION_MISSING: {errorCode: 25002, desc: "No extra param definition found for style property", type: b.type.error, category: b.category.editor, issue: b.issue.skins, severity: b.severity.error}, STYLE_PROP_SRC_UNKNOWN: {errorCode: 25003, desc: "style property source unknown", type: b.type.error, category: b.category.editor, issue: b.issue.skins, severity: b.severity.error}, DIRTIFY_DOCUMENT_FAIL: {errorCode: 25004, desc: "mark document dirty failure", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.error}, UNDO_RETURNED_ERROR_WHILE_TRYING_TO_APPLY_CHANGE: {desc: "c1=command, c2=type", errorCode: 25005, type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.error}, PREVIEW_NOT_READY: {errorCode: 22031, desc: "Preview error: Preview not ready", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.warning}, PREVIEW_INVALID_ID: {errorCode: 22032, desc: "Preview error: invalid div id", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, PREVIEW_COMP_NOT_READY: {errorCode: 22033, desc: "Preview component not ready", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, PREVIEW_ATTEMPT_LOAD_3_TIMES: {errorCode: 22034, desc: "Preview was not loaded after 3 attempts, W is undefined", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, MEDIA_ERR_GETTING_LIST: {errorCode: 22043, desc: "Error getting media list", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, NO_ACCESS_TO_LOCAL_STORAGE: {errorCode: 23001, desc: 'Accessing window.localStorage throws an error. window.sessionStorage is used instead. p1 is a string indicating the environment it is fired from (can be "topframe" or "iframe")', type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.recoverable, sampleRatio: 10}, NO_ACCESS_TO_LOCAL_AND_SESSION_STORAGE: {errorCode: 23002, desc: 'Accessing both localStorage and sessionStorage throws an error. LocalStorageUtils API will be accessing a mock object and will not actually work. p1 is a string indicating the environment it is fired from (can be "topframe" or "iframe")', type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.warning}, WCLASS_CLASS_EMPTY_STRING: {errorCode: 23090, desc: "className must be a non empty string", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, WCLASS_CLASS_RESERVED: {errorCode: 23091, desc: "is reserved for WClass", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, WCLASS_INVALID_BIND: {errorCode: 23092, desc: "is not a function", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.warning}, WCLASS_CLASS_MUST_USE_NEW_OP: {errorCode: 23093, desc: 'Class must be used with the "new" operator', type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, WCLASS_CLASS_DATA_INVALID: {errorCode: 23094, desc: "Invalid class data", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, INVALID_TRAIT_USAGE: {errorCode: 23095, desc: "Invalid trait usage", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, CLASS_ALREADY_EXIST: {errorCode: 23096, desc: "Class already exist", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.warning}, SERVER_RETURNED_ERROR: {errorCode: 3e4, desc: "Server returned an error (p1 is the full URL that we called on the server, p2 is just the part of the URL up to the ?)", type: b.type.error, category: b.category.server, issue: b.issue.defaultVal, severity: b.severity.fatal}, SERVER_CONNECTION: {errorCode: 30011, desc: "Server connection error", type: b.type.error, category: b.category.server, issue: b.issue.defaultVal, severity: b.severity.fatal}, SERVER_INVALID_CALLBACK: {errorCode: 30001, desc: "Invalid callbacks: both onComplete and onError must be defined", type: b.type.error, category: b.category.server, issue: b.issue.defaultVal, severity: b.severity.fatal}, SERVER_INVALID_SITE_ID_STRING: {errorCode: 30002, desc: "Invalid site id: must be a non-empty string", type: b.type.error, category: b.category.server, issue: b.issue.defaultVal, severity: b.severity.fatal}, SERVER_INVALID_SITE_ID_GUID: {errorCode: 30003, desc: "Invalid site id: must be a valid GUID", type: b.type.error, category: b.category.server, issue: b.issue.defaultVal, severity: b.severity.fatal}, SERVER_INVALID_SITE_NAME_STRING: {errorCode: 30004, desc: "Invalid site name: must be a non-empty string", type: b.type.error, category: b.category.server, issue: b.issue.defaultVal, severity: b.severity.fatal}, SERVER_INVALID_SITE_NAME_VALID: {errorCode: 30005, desc: "Invalid site name: use only small letters, digits, _ and -", type: b.type.error, category: b.category.server, issue: b.issue.defaultVal, severity: b.severity.fatal}, SERVER_INVALID_SERVICE_URL: {errorCode: 30006, desc: "invalid serviceBaseUrl", type: b.type.error, category: b.category.server, issue: b.issue.defaultVal, severity: b.severity.fatal}, SERVER_INVALID_BASE_URL: {errorCode: 30007, desc: "Invalid services base url", type: b.type.error, category: b.category.server, issue: b.issue.defaultVal, severity: b.severity.fatal}, FEEDBACK_SERVER_SUBMIT_COMMENTS_ERROR: {errorCode: 30010, desc: "User of user tried to send feedback and got request error. Owner: GuyR", type: b.type.error, category: b.category.server, issue: b.issue.defaultVal, severity: b.severity.error}, USER_PREF_ENTITY_TOO_LARGE: {errorCode: 31001, desc: "http 413 - tried to post a blob larger than 4kb", type: b.type.error, category: b.category.server, issue: b.issue.defaultVal, severity: b.severity.warning}, USER_PREF_BAD_REQUEST: {errorCode: 31002, desc: "http 500 - either an internal server error, or a bad request made by the client", type: b.type.error, category: b.category.server, issue: b.issue.defaultVal, severity: b.severity.warning}, USER_PREF_UNKNOWN_ERROR: {errorCode: 31003, desc: "we received a response from the server which we did not expect", type: b.type.error, category: b.category.server, issue: b.issue.defaultVal, severity: b.severity.warning}, BULK_INVALID_TARGET: {errorCode: 13001, desc: "Invalid targets list: must be an array or Elements", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, BULK_TIMEOUT: {errorCode: 13002, desc: "Bulk operation has timed out after", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, BULK_NO_METHOD: {errorCode: 13003, desc: "No such method on target", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, SCHEMA_MISSING_KEY: {errorCode: 12001, desc: "value request for key which is not in schema: [key, data, schema]", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, SCHEMA_MISSING: {errorCode: 12099, desc: "data was inserted with type that does not exist: [schema]", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, SCHEMA_UNIMPLEMENTED_RESET: {errorCode: 12003, desc: "re-set of data is not implemented yet", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, EDITOR_NO_SKIN: {errorCode: 21001, desc: "no skin provided for item", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, EDITOR_MANAGER_MISSING_SITE_HEADER: {errorCode: 22001, desc: "Can't find global var 'siteHeader' on window", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.error}, EDITOR_MANAGER_INVALID_FLOW_EVENT: {errorCode: 22002, desc: "Invalid flow event", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.error}, EDITOR_MANAGER_NO_TEMPLATE_CHANGE_PAGE: {errorCode: 22003, desc: "No site template selected and trying to change page", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.error}, EDITOR_MANAGER_CLONING_SITE: {errorCode: 22004, desc: "Error cloning site", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.error}, EDITOR_MANAGER_SAVE_SITE: {errorCode: 22005, desc: "Trying to save a site with no id or template or site is not loaded", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.error}, RESOURCE_MANAGER_BUNDLE_NOT_FOUND: {errorCode: 22006, desc: "Bundle not found", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.error}, FOOTER_DELETED: {errorCode: 22011, desc: "footer is deleted", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.error}, GENERAL_FOOTER_ERROR: {errorCode: 22012, desc: "unknown footer check error", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.error}, FOOTER_HIGHER_THAN_HEADER: {errorCode: 22013, desc: "footer is higher than header", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.error}, SITE_STRUCTURE_NO_SITE_PAGES: {errorCode: 11001, desc: "No SITE_PAGES node found in site", type: b.type.error, category: b.category.core, issue: b.issue.components, severity: b.severity.error}, IMAGE_LOAD_ERROR: {ignore: !0, errorCode: 11002, desc: "Image failed to load", type: b.type.error, category: b.category.core, issue: b.issue.components, severity: b.severity.error}, THEME_MANAGER_UNKNOWN_PROPERTY: {errorCode: 12004, desc: "Unknown property", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, THEME_MANAGER_INVALID_PROPERTY: {errorCode: 12005, desc: "Invalid property name", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, SKIN_MANAGER_NO_DATA_FOR_SKIN: {errorCode: 12006, desc: "no skin data found for skin", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, SKIN_MANAGER_MISSING_ARGUMENTS: {errorCode: 12007, desc: "missing arguments for skin", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, SKIN_MANAGER_RE_REGISTER: {errorCode: 12008, desc: "can not re-register skin for component", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, SKIN_MANAGER_METHOD_CALLED_AGAIN: {errorCode: 12009, desc: "method cannot be called more than once", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, SKIN_MANAGER_NO_INLINE_CONTENT_SKINPART_FOUND: {errorCode: 12010, desc: "component has inline content, but is missing the inlineContent skinPart", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, VIEW_MANAGER_INVALID_PAGE: {errorCode: 12011, desc: "invalid pageId and/or URL", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, WIXIFY_INVALID_DATA_TYPE: {errorCode: 13004, desc: "data type provided didn't match component acceptable data types", type: b.type.error, category: b.category.core, issue: b.issue.defaultVal, severity: b.severity.error}, WIXIFY_MISSING_DATA_TYPE: {errorCode: 13012, desc: "The provided data object does not contain a data type", type: b.type.error, category: b.category.core, issue: b.issue.defaultVal, severity: b.severity.warning}, WIXIFY_NO_COMP: {errorCode: 13005, desc: "no comp attribute found", type: b.type.error, category: b.category.core, issue: b.issue.defaultVal, severity: b.severity.error}, WIXIFY_NO_SKIN: {errorCode: 13006, desc: "no skin attribute found", type: b.type.error, category: b.category.core, issue: b.issue.defaultVal, severity: b.severity.error}, WIXIFY_ALREADY_WIXIFIED: {errorCode: 13007, desc: "node has already been wixified", type: b.type.error, category: b.category.core, issue: b.issue.defaultVal, severity: b.severity.error}, WIXIFY_TIMEOUT: {ignore: !0, errorCode: 13008, desc: "node was not wixified on time", type: b.type.error, category: b.category.core, issue: b.issue.defaultVal, severity: b.severity.error}, WIXIFY_FINISHED_AFTER_TIMEOUT: {ignore: !0, errorCode: 13020, desc: "node was wixified after timeout", type: b.type.error, category: b.category.core, issue: b.issue.defaultVal, severity: b.severity.warning}, SITE_NAME_NO_SELECTED_CATEGORY: {errorCode: 21002, desc: "no category selected", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, EDITOR_INDEX_OUT_OF_RANGE: {errorCode: 21003, desc: "The index provided was out of range", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.recoverable}, COMMAND_DUPLICATE: {errorCode: 13009, desc: "command is already defined", type: b.type.error, category: b.category.core, issue: b.issue.components, severity: b.severity.error}, BAD_COMMAND: {errorCode: 13010, desc: "command is neither string nor a Command object", type: b.type.error, category: b.category.core, issue: b.issue.components, severity: b.severity.error}, MISSING_COMMAND: {errorCode: 13011, desc: "A command with this name was not found", type: b.type.error, category: b.category.core, issue: b.issue.components, severity: b.severity.error}, COMMAND_EXECUTE_EXCEPTION: {errorCode: 13013, desc: "Exception while processing command", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error, sampleRatio: 100}, SAVE_COMMAND_EXECUTE_EXCEPTION: {errorCode: 13014, desc: "Exception while processing save command", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, INVALID_EDITOR_META_DATA: {errorCode: 21006, desc: "The EDITOR_META_DATA object of this component is missing or defective", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, DM_MALFORMED_QUERY: {errorCode: 12013, desc: "Malformed data query", type: b.type.error, category: b.category.core, issue: b.issue.components, severity: b.severity.error}, CM_NO_DICTIONARY_DATA: {errorCode: 12039, desc: "dictionary data is unavailable for skinPart", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, INVALID_METADATA_FIELD: {errorCode: 12015, desc: "invalid metadata field name", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.recoverable}, DATA_MISSING_SNAPSHOT: {errorCode: 12016, desc: "Missing snapshot for data item", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.recoverable}, GET_ALPHA_OF_NOT_COLOR_PROPERTY: {errorCode: 12017, desc: "Attempt to access opacity of a property that is not of type color", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.recoverable}, SET_ALPHA_OF_NOT_COLOR_PROPERTY: {errorCode: 12018, desc: "Attempt to set opacity of a property that is not of type color", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.recoverable}, SET_BOX_SHADOW_TOGGLE_OF_NOT_BOX_SHADOW_PROPERTY: {errorCode: 12019, desc: "Attempt to set box shadow toggle on of a property that is not of type box shadow", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.recoverable}, DRAGGABLE_COMPONENT_MISSING_HANDLE_ERROR: {errorCode: 11020, desc: "Draggable component don't define a drag handle skin part", type: b.type.error, category: b.category.core, issue: b.issue.components, severity: b.severity.error}, MEDIA_GALLERY_MISSING_CONFIG: {errorCode: 21004, desc: "Media Dialog opened without config", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, MEDIA_GALLERY_FAILED_TO_OPEN: {errorCode: 21009, desc: "Media Dialog failed to open within 15 seconds", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, STYLE_ALREADY_EXISTS: {errorCode: 21005, desc: "Attempt to create a style that already exists", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, MENU_CORRUPTION_UNKNOWN_PAGE: {errorCode: 22007, desc: "MAIN_MENU has unknown page (doesnt exist), and the editor would not load", type: b.type.error, category: b.category.viewer, issue: b.issue.modal, severity: b.severity.recoverable}, MENU_CORRUPTION_MISSING_PAGE: {errorCode: 22008, desc: "MAIN_MENU is missing a page", type: b.type.error, category: b.category.viewer, issue: b.issue.modal, severity: b.severity.recoverable}, MENU_CORRUPTION_NULL_PAGE: {errorCode: 22009, desc: "MAIN_MENU has a pointer to a page with a value of null in the docData, and the editor wont load.", type: b.type.error, category: b.category.viewer, issue: b.issue.modal, severity: b.severity.fatal}, MENU_CORRUPTION_BLANK_ID: {errorCode: 22010, desc: "MAIN_MENU has blank refIds, and the editor wont load", type: b.type.error, category: b.category.viewer, issue: b.issue.modal, severity: b.severity.fatal}, APPS_PROVISION_FAILED: {errorCode: 220080, desc: "App provision failed - app store service returned error", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, APPS_OPEN_TIMEOUT: {errorCode: 220090, desc: "App timeout - application failed to call the init() method", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, APPS_UNABLE_TO_COMPLETE_PROVISION_POST_SAVE: {errorCode: 220091, desc: "Unable to complete the provisioning of apps after metasite save", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.recoverable}, APPS_UNABLE_TO_LOAD_APP_DEFINITIONS: {errorCode: 220092, desc: "Unable to load apps definitions", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.recoverable}, EXPERIMENT_UNKNOWN: {errorCode: 220093, desc: "Experiment id is missing from the ordered list of experiments", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.warning}, EXPERIMENT_IN_CONFLICT: {errorCode: 220094, desc: "Experiment id is in conflict with another open experiment", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, EXPERIMENT_MISSING_DEPENDENCY: {errorCode: 220095, desc: "Experiment id requires another experiment to operate, but that depency was not opened", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal, sampleRatio: 10}, EXPERIMENT_INVALID_DEFINITION: {errorCode: 220103, desc: "Experiment has an invalid definition", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, EXPERIMENT_CYCLIC_DEPENDENCY: {errorCode: 220104, desc: "Cyclic dependency in experiment definition", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, EXPERIMENT_ID_NOT_IN_LOWER_CASE_IN_LIST: {errorCode: 220105, desc: "Experiment in model should have an all-lowercase id", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, EXPERIMENT_ID_NOT_IN_LOWER_CASE_IN_DESCRIPTORS: {errorCode: 220106, desc: "Experiment in descriptors should have an all-lowercase id", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, EXPERIMENT_DEPLOYMENT_TIMEOUT: {errorCode: 220099, desc: "Timeout while waiting for all marked experiments to deploy", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal, timeoutThreshold: 2e4, sampleRatio: 10}, HTML_SCRIPTS_LOADER_UNABLE_TO_LOAD_INDEX: {errorCode: 220096, desc: "unable to load index.json", type: b.type.error, category: b.category.editor, issue: b.issue.defaultVal, severity: b.severity.fatal}, HTML_SCRIPTS_LOADER_INVALID_INDEX: {errorCode: 220097, desc: "Invalid index.json format", type: b.type.error, category: b.category.editor, issue: b.issue.defaultVal, severity: b.severity.fatal}, WALK_ME_FAILED_TO_LOAD: {errorCode: 220098, desc: "Walk Me failed to load", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.warning}, LINK_DATA_ITEM_DOESNT_EXIST: {errorCode: 220100, desc: "Link data item does not exsit", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.warning}, COMPONENT_ALREADY_REGISTERED_IN_LIFECYCLE: {errorCode: 220101, desc: "failed to register component, component already registered to licycle.", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.warning}, COMPONENT_NOT_REGISTERED_IN_LIFECYCLE: {errorCode: 220102, desc: "cannot update component state - component not registered.", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.warning}, FIRST_RELOADED_AFTER_CRASH: {errorCode: 121e3, desc: "editor loaded after crash", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error, sampleRatio: 10}, SITE_RESTORED_AFTER_CRASH: {errorCode: 121001, desc: "user restore the locally saved site after crash", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, SITE_CRASHED_IN_PREVIOUS_SESSION: {errorCode: 121003, desc: "site crashed in previous session", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, PAGE_FETCHING_ERROR: {errorCode: 12014, desc: "general fatal error in page loading mechanism", type: b.type.error, category: b.category.viewer, issue: b.issue.defaultVal, severity: b.severity.fatal}, DUPLICATE_METASITE_NAME: {errorCode: 121051, desc: "attempt to save a site with an existing metaise name", type: b.type.error, category: b.category.viewer, issue: b.issue.defaultVal, severity: b.severity.warning}, SITE_RESTORATION_AFTER_CRASH_FAILED: {errorCode: 121002, desc: "site restoration from user local storage failed", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, ALL_PAGE_RETRIEVAL_ATTEMPTS_FAILED: {errorCode: 11101, desc: "page could not be retrieved from the server", type: b.type.error, category: b.category.viewer, issue: b.issue.managers, severity: b.severity.fatal}, SINGLE_PAGE_RETRIEVAL_ATTEMPT_FAILED: {errorCode: 11102, desc: "This is fired on every failed attempt to get the page JSON from one of the fallbacks (p1:domain, p2:pageId, p3:fallback num, p4:cycle num)", type: b.type.error, category: b.category.viewer, issue: b.issue.managers, severity: b.severity.warning}, FAILED_TO_RETRIEVE_SITE_REVISION: {errorCode: 11103, desc: "failed to retrieve site revision, server returned an error", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, ALL_PAGE_RETRIEVAL_ATTEMPTS_FAILED_FOR_LAZY_PAGE_LOAD: {errorCode: 11104, desc: "page could not be retrieved (lazily) from the server", type: b.type.error, category: b.category.viewer, issue: b.issue.managers, severity: b.severity.fatal}, INVALID_INPUT_BIND: {errorCode: 26001, desc: "Invalid input field bind", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, STYLES_DO_NOT_EXIST: {errorCode: 26002, desc: "Styles were not retrieved from editor data", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, COMPONENT_STYLES_DO_NOT_EXIST: {errorCode: 26003, desc: "Component styles were not retrieved from editor data", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, AUTOPANEL_SKIN_DOES_NOT_EXIST: {errorCode: 26004, desc: "Skin defined in generator does not exist", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, AUTOPANEL_SKIN_STYLES_DOES_NOT_EXIST: {errorCode: 26005, desc: "Skin collection defined in generator does not exist", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, CKEDITOR__FAILED_DESTROY: {errorCode: 26006, desc: "ck-editor destroy failed, entered catch block", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.warning}, LANGUAGE_PACK_FAILED_TO_LOAD: {errorCode: 26007, desc: "the language from the html-client-lang project failed to load; c1=bundle, c2=the url of the lang resource, language=two-letter lang code", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, AVIARY_MISSING_ID_IN_SKIN: {errorCode: 21030, desc: "Missing an id on this._skinParts.content, it is required for Aviary to work", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, AVIARY_DIALOG_WRONG_DATA_TYPE: {errorCode: 21031, desc: "Data is missing or Data Type is not an Image Data", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, AVIARY_NOT_LOADED: {errorCode: 21032, desc: "Aviary.js was not loaded after 5000ms", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, AVIARY_FORCE_CLOSED: {errorCode: 21033, desc: "Aviary dialog was not closed on first try, forced it to close on second try", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.warning}, AVIARY_UPLOAD_GET_TICKET_FAILED: {errorCode: 21034, desc: "Failed on getting ticket for upload. c1 is the error message", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, AVIARY_UPLOAD_TO_STATIC_FAILED: {errorCode: 21035, desc: "Uploading image to statics failed. c1 is the error message", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, AVIARY_UPLOAD_UPDATE_MEDIA_FAILED: {errorCode: 21036, desc: "Updating private media with uploaded file failed. c1 is the error message", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, AVIARY_RETURNED_AN_ERROR: {errorCode: 21037, desc: "Aviary editor failed on external script error. i1 is the error code and c1 is the error message", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, AVIARY_REACHED_INNER_SAVE_FUNCTION: {errorCode: 21038, desc: "Aviary somehow called its inner save function, this does not supposed to happen.", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.warning}, DATA_ITEM_INVALID_TYPE: {errorCode: 21039, desc: "Attempt to assign dataItem with inacceptable type. c1: improper type and stack trace", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, FAILED_COMPONENT_SERIALIZATION: {errorCode: 21040, desc: "Failed validation of component during serialization. c1: id=id+component+skin, errors=list of failed validations, caller=where it failed", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, DUPLICATED_COMPONENT_ID: {errorCode: 21041, desc: "Duplicated component id. c1: id=id,comp=[componentsType1, componentType2,...]", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, INVALID_STATICS_PARAM: {errorCode: 21042, desc: "class statics cannot receive a function as a parameter", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, INVALID_FIELDS_PARAM: {errorCode: 21043, desc: "class fields cannot receive a function as a parameter", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, INVALID_METHODS_PARAM: {errorCode: 21044, desc: "class methods cannot receive a function as a parameter", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, TEXT_MIGRATION_EMPTY_BLOCK_ELEMENT: {errorCode: 21045, desc: "text before migration contains blocks with no child nodes", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.warning}, TEXT_MIGRATION_DEFAULT_VALUES_NOT_PROVIDED: {errorCode: 21047, desc: "text before migration contains blocks with unstyled text, and no default class or tag were provided", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, FONT_LOAD_TIME_GREATER_THAN_30_SECONDS: {errorCode: 21048, desc: "Selected font didnt load for 30 seconds. Font is probably missing", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, MISSING_FONT_IN_USE: {errorCode: 21072, desc: "font is used in site but doesnt exist in fonts list", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, TEXT_MIGRATION_MISSED_STYLED_SPANS: {errorCode: 21049, desc: "after migration there is a span with style class, (has been changed to inline style)", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.warning}, RICH_TEXT_UKNOWN_FAILURE: {errorCode: 21050, desc: "An unknown failure in rich text editor", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, WINDOW_ON_ERROR: {errorCode: 21051, desc: "A fatal error happened in the JS and stopped execution. (c1=error description, c2=url, i1=line number)", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal, sampleRatio: 100}, CONTACT_FORM_EMAIL_DECRYPT_FAILURE: {errorCode: 21052, desc: "Failed to decrypt contact form email", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.warning}, TEXT_RESTORE_SELECTION_FAIL: {errorCode: 21053, desc: "failed to restore text selection in rich text editor", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.warning}, RICH_TEXT_RESET_CONTROLLER_FAIL: {errorCode: 21054, desc: "Reset rich text controller failed", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.warning}, RICH_TEXT_LOADING_TIMEOUT: {errorCode: 21055, desc: "Rich Text failed to start edit text after 2 seconds, c1=the problematic text", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal, sampleRatio: 10}, MOBILE_STRUCTURE_NOT_SAVED_DUE_TO_CORRUPTION: {errorCode: 21056, desc: "mobile structure was not saved with site due to a corruption in site structure - missing header, footer or pages container", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, PAGE_EXISTS_IN_MOBILE_BUT_NOT_IN_DESKTOP: {errorCode: 21102, desc: "page that exists in mobile structure doesn't exist in desktop structure", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, DELETED_PAGES_NOT_DELETED_BY_USER: {errorCode: 21103, desc: "some pages were deleted from current structure without the user deleting them", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, NO_COMPONENT_WITH_GIVEN_ID: {errorCode: 21057, desc: "trying to retreive a component by id, however there is no such component", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal, sampleRatio: 10}, CORRUPTED_ELEMENT_WITH_ID_AND_NOT_SUCH_COMPOENENT: {errorCode: 21058, desc: "trying to get a component by id, however there is no such component and there is some element with the component is", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.warning, sampleRatio: 10}, CORRUPTED_ELEMENT_WITH_COMPONENT_ID: {errorCode: 21059, desc: "trying to get a component by id, and there is at least one more element with the same id, this element is corrupted", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal, sampleRatio: 10}, DID_NOT_SWITCH_TO_MOBILE_DUE_TO_CORRUPTION: {errorCode: 21060, desc: "did not switch to mobile editor due to a corruption in site structure - missing header, footer or pages container", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, DID_NOT_SWITCH_TO_MOBILE_DUE_TO_UNKNOWN_MERGE_ALGO_ISSUE: {errorCode: 21061, desc: "did not switch to mobile editor due to an exception thrown from the merge algorithm", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, DID_NOT_SWITCH_TO_MOBILE_DUE_TO_UNKNOWN_CONVERSION_ALGO_ISSUE: {errorCode: 21062, desc: "did not switch to mobile editor due to an exception thrown from the conversion algorithm", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, UNKNOWN_MERGE_ALGO_CRASH_WHILE_SAVING: {errorCode: 21063, desc: "merge algorithm crashed while saving", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, UNKNOWN_CONVERSION_ALGO_CRASH_WHILE_SAVING: {errorCode: 21064, desc: "conversion algorithm crashed while saving", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, MOBILE_ALGO_EFFECTIVE_TEXT_CALCULATOR_FAILED: {errorCode: 21065, desc: "effective text calculator failed", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.error}, MOBILE_ALGO_EFFECTIVE_TEXT_CALCULATOR_RETURNED_NULL: {errorCode: 21066, desc: "effective text calculator returned null", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.error}, UNHANDLED_LINK_TYPE: {errorCode: 21067, desc: "Failed to convert link to new type", type: b.type.error, category: b.category.viewer, issue: b.issue.managers, severity: b.severity.error}, LINK_RENDERING_FAILED: {errorCode: 21068, desc: "Failed to render link", type: b.type.error, category: b.category.viewer, issue: b.issue.components, severity: b.severity.error}, UNKNOWN_MERGE_ALGO_CRASH_WHILE_SWITCHING_TO_MOBILE: {errorCode: 21069, desc: "did not switch to mobile editor due to an unknown exception during the merge algorithm", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, SITE_SEGMENT_HAS_TYPE_COMPONENT: {errorCode: 21070, desc: "A site segment component was serialized with component type component, and it should be container", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.fatal}, MOBILE_ALGO_FIXES_2_RESEARCH1: {errorCode: 21071, desc: "try to track cause for 21063 when mergeAlgoFixes 2 exp is on, c1=container, i=blockNumber", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.error}, SCRIPTLOADER_FAILED_TO_LOAD_SCRIPT_RETRY: {errorCode: 21100, desc: "failed to load a JS file in the scriptloader. this is fired on every try. in the dsc field, i write which attempt this is. there are 3. the dsc field will also say which file failed to load", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.warning}, SCRIPTLOADER_FAILED_TO_LOAD_SCRIPT_GAVE_UP: {errorCode: 21101, desc: "ultimately failed to load a JS file in the scriptloader. there were 3 attempts, and they all failed. dsc field will say which file failed to load", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.fatal}, INVALID_IMAGE_DIMENSIONS: {errorCode: 110011, desc: "an image request with a zero or negative size", type: b.type.error, category: b.category.viewer, issue: b.issue.components, severity: b.severity.error, sampleRatio: 10}, SITE_FONTS_LIST_COMPUTATION_FAILED: {errorCode: 101010, desc: "a general failure in site used fonts list computation", type: b.type.error, category: b.category.editor, issue: b.issue.managers, severity: b.severity.error}, THEME_MANAGER_MISSING_PROPERTY: {errorCode: 101012, desc: "value request for an unknown theme property: [key, data, schema]", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, NO_MOBILE_IN_EDITOR: {errorCode: 101013, desc: "invalid access to mobile from editor", type: b.type.error, category: b.category.core, issue: b.issue.managers, severity: b.severity.error}, SM_LOGOUT_FAILED: {errorCode: 101020, desc: "failed logging out from site members", type: b.type.error, category: b.category.viewer, issue: b.issue.defaultVal, severity: b.severity.error}, HTML_CAPTURE_FAILURE: {errorCode: 101021, desc: "The capturing of static html failed because of one or more components were never ready for dom display", type: b.type.error, category: b.category.viewer, issue: b.issue.components, severity: b.severity.error}, ANIMATIONS_REGISTER_CORRUPTED_DATA: {errorCode: 101022, desc: "JSON.parse failed. Component data is corrupted", type: b.type.error, category: b.category.viewer, issue: b.issue.components, severity: b.severity.error}, ANIMATIONS_REGISTER_INVALID_DATA: {errorCode: 101023, desc: "Invalid data structure", type: b.type.error, category: b.category.viewer, issue: b.issue.components, severity: b.severity.error}, ANIMATIONS_FUNCTION_IS_NOT_IMPLEMENTED: {errorCode: 101024, desc: "Function is not implemented", type: b.type.error, category: b.category.viewer, issue: b.issue.components, severity: b.severity.error}, STATIC_HTML_REPLACEMENT_DELAY: {errorCode: 101025, desc: "The static html replacement into the real site was timed out because of one or more components were never ready for dom display", type: b.type.timing, category: b.category.viewer, issue: b.issue.components, severity: b.severity.warning}, STATIC_HTML_REPLACEMENT_FAILURE: {errorCode: 101026, desc: "The static html replacement into the real site has failed", type: b.type.error, category: b.category.viewer, issue: b.issue.managers, severity: b.severity.error}, CONTACT_FORM_SUBMIT_FAILURE: {errorCode: 101027, desc: "Contact form: Unspecified error occurred, possibly a connection problem, fallback activated", type: b.type.error, category: b.category.viewer, issue: b.issue.components, severity: b.severity.warning}, CONTACT_FORM_SUBMIT_FINAL_FALLBACK: {errorCode: 101028, desc: "Contact form: Error occurred in Fallback Request", type: b.type.error, category: b.category.viewer, issue: b.issue.components, severity: b.severity.error}, SUBSCRIBE_FORM_SUBMIT_FAILURE: {errorCode: 101029, desc: "Subscribe form: Unspecified error occurred, possibly a connection problem, fallback activated", type: b.type.error, category: b.category.viewer, issue: b.issue.components, severity: b.severity.warning}, SUBSCRIBE_FORM_SUBMIT_FINAL_FALLBACK: {errorCode: 101030, desc: "Subscribe Form: Error occurred in Fallback Request", type: b.type.error, category: b.category.viewer, issue: b.issue.components, severity: b.severity.error}, ANGULAR_EXCEPTION: {errorCode: 50001, desc: "Angular caught an exception", type: b.type.error, category: b.category.editor, issue: b.issue.components, severity: b.severity.error}, TPA_RESERVED_ERROR_28000: {errorCode: 28e3}, TPA_RESERVED_ERROR_28001: {errorCode: 28001}, TPA_RESERVED_ERROR_28002: {errorCode: 28002}, TPA_RESERVED_ERROR_28003: {errorCode: 28003}, TPA_RESERVED_ERROR_28004: {errorCode: 28004}, TPA_RESERVED_ERROR_28005: {errorCode: 28005}, TPA_RESERVED_ERROR_28006: {errorCode: 28006}, TPA_RESERVED_ERROR_28007: {errorCode: 28007}, TPA_RESERVED_ERROR_28008: {errorCode: 28008}, TPA_RESERVED_ERROR_28009: {errorCode: 28009}, TPA_RESERVED_ERROR_28010: {errorCode: 28010}, TPA_RESERVED_ERROR_28011: {errorCode: 28011}, TPA_RESERVED_ERROR_28012: {errorCode: 28012}, TPA_RESERVED_ERROR_28013: {errorCode: 28013}, TPA_RESERVED_ERROR_28014: {errorCode: 28014}, TPA_RESERVED_ERROR_28015: {errorCode: 28015}, TPA_RESERVED_ERROR_28016: {errorCode: 28016}, TPA_RESERVED_ERROR_28017: {errorCode: 28017}, TPA_RESERVED_ERROR_28018: {errorCode: 28018}, TPA_RESERVED_ERROR_28019: {errorCode: 28019}, TPA_RESERVED_ERROR_28020: {errorCode: 28020}, TPA_RESERVED_ERROR_28021: {errorCode: 28021}, TPA_RESERVED_ERROR_28022: {errorCode: 28022}, TPA_RESERVED_ERROR_28023: {errorCode: 28023}, TPA_RESERVED_ERROR_28024: {errorCode: 28024}, TPA_RESERVED_ERROR_28025: {errorCode: 28025}, TPA_RESERVED_ERROR_28026: {errorCode: 28026}, TPA_RESERVED_ERROR_28027: {errorCode: 28027}, TPA_RESERVED_ERROR_28028: {errorCode: 28028}, TPA_RESERVED_ERROR_28029: {errorCode: 28029}, TPA_RESERVED_ERROR_28030: {errorCode: 28030}, TPA_RESERVED_ERROR_28031: {errorCode: 28031}, TPA_RESERVED_ERROR_28032: {errorCode: 28032}, TPA_RESERVED_ERROR_28033: {errorCode: 28033}, TPA_RESERVED_ERROR_28034: {errorCode: 28034}, TPA_RESERVED_ERROR_28035: {errorCode: 28035}, TPA_RESERVED_ERROR_28036: {errorCode: 28036}, TPA_RESERVED_ERROR_28037: {errorCode: 28037}, TPA_RESERVED_ERROR_28038: {errorCode: 28038}, TPA_RESERVED_ERROR_28039: {errorCode: 28039}, TPA_RESERVED_ERROR_28040: {errorCode: 28040}, TPA_RESERVED_ERROR_28041: {errorCode: 28041}, TPA_RESERVED_ERROR_28042: {errorCode: 28042}, TPA_RESERVED_ERROR_28043: {errorCode: 28043}, TPA_RESERVED_ERROR_28044: {errorCode: 28044}, TPA_RESERVED_ERROR_28045: {errorCode: 28045}, TPA_RESERVED_ERROR_28046: {errorCode: 28046}, TPA_RESERVED_ERROR_28047: {errorCode: 28047}, TPA_RESERVED_ERROR_28048: {errorCode: 28048}, TPA_RESERVED_ERROR_28049: {errorCode: 28049}, TPA_RESERVED_ERROR_28999: {errorCode: 28999}}
}(window);
var WixBILogger = function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    this._wixLogger = a, this._beatVersion = 2, this._beatEventTypes = {START: 1, RESET: 2, FINISH: 3}, this._beatSiteTypes = {WixSite: 1, UGC: 2, Template: 3}, this._beatTimestamps = {}, this._pageNumberInSession = 0, k = encodeURIComponent(k), l = l ? l : 3, this.logScript = null, this._floggerServerURL = "/" !== b.charAt(b.length - 1) ? b + "/" : b, this._commonFieldsFiltersByAdapter = {hed: ["src", "did", "msid", "evid", "majorVer", "ver", "ts", "esi", "server", "viewMode", "vsi"], trg: ["src", "did", "msid", "uid", "gsi", "cid", "majorVer", "ver", "lng", "evid", "ts", "esi", "cat", "errc", "iss", "sev", "errscp", "trgt", "dsc", "server", "viewMode", "vsi"]}, this._common = {src: l, uid: g, gsi: "" != i ? i : this.generateGUID(), cid: j, majorVer: c, ver: d, lng: "en-US", evid: 0, ts: 0, server: m, esi: n, viewMode: window.viewMode, vsi: "site" == window.viewMode ? this.generateGUID() : null}, "site" === window.viewMode.toLowerCase() && (this._common.tsp = window.publicModel && window.publicModel.timeSincePublish ? window.publicModel.timeSincePublish : -1), this._keyArray = {errorKeys: ["errc", "iss", "sev", "dsc"], funnelKeys: ["g1", "g2", "i1", "i2", "c1", "c2"]}
};
WixBILogger.prototype.generateGUID = function () {
    var a = function () {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    };
    return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
}, WixBILogger.prototype.setSrc = function (a) {
    this._common.src = a
}, WixBILogger.prototype.setDocId = function (a) {
    this._common.did = a
}, WixBILogger.prototype.setMetaSiteId = function (a) {
    this._common.msid = a
}, WixBILogger.prototype.setEditorSessionId = function (a) {
    this._common.esi = a
}, WixBILogger.prototype.sendError = function (a, b, c, d, e) {
    if (a) {
        if (this.isInAutomationMode()) {
            if (!this.leaveOnlyImportantErrors(a))return;
            try {
                throw">>>>>>>>ERROR " + a.errorCode + ": " + a.desc
            } catch (f) {
            }
        }
        this._common.evid = a.type || 10, this._common.cat = a.category, this._common.ts = this._wixLogger.getSessionTime();
        var g, h = (e || a.httpResponse || 0, a.errorCode), i = this._common, j = null;
        delete d.time, "string" == typeof d ? g = d : d instanceof Array ? g = JSON.stringify(d) : "object" == typeof d && (d.hasOwnProperty("src") || d.hasOwnProperty("desc") ? (i = Object.clone(this._common), i.src = d.src || 44, g = d.desc || "") : (g = "", j = this._collectAndMapExtraParams(d))), g = encodeURI(g).slice(0, 512), c = c ? c.toString().slice(0, 64) : "";
        var k = {errc: h, iss: a.issue, sev: a.severity, errscp: b, trgt: c, dsc: g};
        if (j)for (var l in j)k[l] = j[l];
        var m = this._combineObjectToString(k);
        this._createReport("trg", m, i)
    }
}, WixBILogger.prototype._collectAndMapExtraParams = function (a) {
    for (var b = {}, c = ["p1", "p2", "p3", "p4"], d = ["i1", "i2", "c1", "c2", "g1", "g2"], e = 1, f = 4, g = 0; g < d.length && f >= e; g++)a.hasOwnProperty(d[g]) && (b["p" + e] = a[d[g]], e++);
    for (var g = 0; g < c.length; g++)a.hasOwnProperty(c[g]) && (b[c[g]] = a[c[g]]);
    return"object" != typeof b || 0 === Object.keys(b).length ? null : b
}, WixBILogger.prototype.sendEvent = function (a, b) {
    if (this.isInAutomationMode()) {
        if (!this.leaveOnlyTimingEvents(a))return;
        try {
            throw">>>>>>>>EVENT " + a.biEventId + ": " + a.desc
        } catch (c) {
        }
    }
    var d = this.generateEventString(a, b), e = a.biAdapter ? a.biAdapter : "mee", f = this._common;
    "object" == typeof b && b.hasOwnProperty("src") && (f = Object.clone(this._common), f.src = b.src), this._createReport(e, d, f)
}, WixBILogger.prototype.isInAutomationMode = function () {
    return/[?&]automation=true\b/i.test(window.location.search)
}, WixBILogger.prototype.leaveOnlyImportantErrors = function (a) {
    var b = window.wixLogLegend || {};
    return a.severity >= b.severity.error ? !0 : !1
}, WixBILogger.prototype.leaveOnlyTimingEvents = function (a) {
    var b = window.wixLogLegend || {};
    return a.type == b.type.timing ? !0 : !1
}, WixBILogger.prototype.initNewBeatPage = function () {
    this._pageNumberInSession++, this._beatTimestamps[this._pageNumberInSession] = this._getTimestamp()
}, WixBILogger.prototype.sendBeatStartEvent = function (a) {
    if (a) {
        var b = a.isFromReset ? this._beatEventTypes.RESET : this._beatEventTypes.START;
        this.initNewBeatPage(), this._sendBeatEvent(b, a.pageId, this._pageNumberInSession)
    }
}, WixBILogger.prototype.sendBeatFinishEvent = function (a) {
    if (a) {
        var b = this._getTimestamp() - this._beatTimestamps[this._pageNumberInSession];
        this._sendBeatEvent(this._beatEventTypes.FINISH, a.pageId, this._pageNumberInSession, b)
    }
}, WixBILogger.prototype._sendBeatEvent = function (a, b, c, d) {
    var e = this._floggerServerURL + "bt?", f = this._getBeatParams(a, b, c, d);
    this._createHit(e + this._getBeatQueryString(f))
}, WixBILogger.prototype._getBeatQueryString = function (a) {
    for (var b = [], c = 0; c < a.length; c += 2) {
        var d = a[c], e = a[c + 1];
        ("undefined" == typeof e || null == e) && (e = ""), b.push(d + "=" + e)
    }
    return b.join("&")
}, WixBILogger.prototype._getBeatParams = function (a, b, c, d) {
    var e = window.rendererModel || {}, f = window.serviceTopology || {}, g = window.W || {}, h = g.Config || {}, i = "function" == typeof h.getSvSession ? h.getSvSession() : "", j = "function" == typeof h.isPremiumUser ? h.isPremiumUser() : "", k = this._beatVersion + "|" + this._common.ver;
    d = d || 0, "boolean" == typeof j && (j = j ? 1 : 0);
    var l = ["src", 29, "evid", 3, "uuid", this._common.uid, "sid", window.siteId, "msid", e.metaSiteId, "dc", f.serverName, "pid", this._encodeURIComponent(b || ""), "vid", i || this._getCookie("svSession"), "vsi", this._common.vsi, "sr", this._getDesktopSize(), "wr", this._getWindowSize(), "st", this._beatSiteTypes[e.documentType] || -1, "isjp", null, "isp", j, "vuuid", this._getVisitorUuid(), "et", a, "ts", d, "pn", c, "v", this._encodeURIComponent(k), "c", this._getTimestamp(), "url", this._encodeURIComponent(this._trimUrl(document.location.href)), "ref", this._encodeURIComponent(this._trimUrl(document.referrer))];
    return l
}, WixBILogger.prototype.generateEventString = function (a, b) {
    if (!a)return"";
    b = b || {};
    var c = [b.g1, b.g2, b.i1, b.i2, b.c1, b.c2];
    return this._common.evid = a.biEventId, this._common.ts = this._wixLogger.getSessionTime(), this._combineArraysToString(this._keyArray.funnelKeys, c)
}, WixBILogger.prototype._getRelevantModelWithFallbackEmptyObject = function () {
    return window.editorModel || window.rendererModel || {}
}, WixBILogger.prototype._createReport = function (a, b, c) {
    var d = "did=" + window.siteId + "&msid=" + this._getRelevantModelWithFallbackEmptyObject().metaSiteId + "&" + this._objToURLParamsStringWithFilter(c, this._commonFieldsFiltersByAdapter[a]);
    this._createHit(this._floggerServerURL + a + "?" + d + b)
}, WixBILogger.prototype._createHit = function (a) {
    var b = new Image(0, 0);
    b.src = a, -1 !== window.location.search.search(/[?&]log[^=]*?=true/i) && console.log(">>>>LOG " + a.replace("http://", "").replace(/[&?]/g, " "))
}, WixBILogger.prototype._combineArraysToString = function (a, b) {
    for (var c, d = "", e = 0; e < a.length; e++)c = b[e] || 0 === b[e] || b[e] === !1 ? b[e] : "", d = d + a[e] + "=" + c + "&";
    return d
}, WixBILogger.prototype._combineObjectToString = function (a) {
    var b = [];
    for (var c in a)b.push(c + "=" + a[c]);
    return b.join("&")
}, WixBILogger.prototype._objToURLParamsStringWithFilter = function (a, b) {
    var c = "";
    for (var d in a)if (!b || -1 != b.indexOf(d)) {
        var e = a[d] || 0 === a[d] ? a[d] : "";
        c += d + "=" + e + "&"
    }
    return c
}, WixBILogger.prototype._getDesktopSize = function () {
    var a = window.screen && window.screen.width || 0, b = window.screen && window.screen.height || 0;
    return a + "x" + b
}, WixBILogger.prototype._getWindowSize = function () {
    var a = 0, b = 0;
    return window.innerWidth ? (a = window.innerWidth, b = window.innerHeight) : window.document && (document.documentElement && document.documentElement.clientWidth ? (a = document.documentElement.clientWidth, b = document.documentElement.clientHeight) : document.body && document.body.clientWidth && (a = document.body.clientWidth, b = document.body.clientHeight)), a + "x" + b
}, WixBILogger.prototype._getVisitorUuid = function () {
    var a = this._getCookie("_wixUIDX").split("|");
    return(a[1] || "").replace("null", "")
}, WixBILogger.prototype._getCookie = function (a) {
    for (var b = document.cookie.split(";"), c = 0; c < b.length; c++) {
        var d = b[c].split("=");
        if (d.length >= 2 && d[0].replace(/^\s+|\s+$/g, "") == a)return d.slice(1).join("=").replace(/^\s+|\s+$/g, "")
    }
    return""
}, WixBILogger.prototype._trimUrl = function (a) {
    return a ? a.replace(/^http(s)*:\/\/(www\.)*/, "") : ""
}, WixBILogger.prototype._getTimestamp = function () {
    return"function" == typeof Date.now ? Date.now() : (new Date).getTime()
}, WixBILogger.prototype._encodeURIComponent = function (a) {
    return encodeURIComponent(a || "").replace(/\|/g, "%7C")
}, WixBILogger.prototype.sendCustomEvent = function (a, b) {
    if (this.isInAutomationMode()) {
        if (!this.leaveOnlyTimingEvents(a))return;
        try {
            throw">>>>>>>>EVENT " + a.biEventId + ": " + a.desc
        } catch (c) {
        }
    }
    var d = this.generateCustomEventString(a, b), e = a.biAdapter ? a.biAdapter : "mee", f = this._common;
    "object" == typeof b && b.hasOwnProperty("src") && (f = Object.clone(this._common), f.src = b.src), this._createReport(e, d, f)
}, WixBILogger.prototype.generateCustomEventString = function (a, b) {
    if (!a)return"";
    b = b || {}, this._common.evid = a.biEventId, this._common.ts = this._wixLogger.getSessionTime();
    var c = [];
    return _.each(b, function (a, b) {
        c.push(encodeURI(b) + "=" + encodeURI(a))
    }), c.join("&")
}, Logger.prototype = {constructor: Logger, init: function (a) {
    this.setSettings(a)
}, getArtifactVersion: function (a) {
    var b = window.serviceTopology ? window.serviceTopology.scriptsLocationMap : {}, c = window.define && define._definitions && define._definitions.resource && define._definitions.resource.topology ? define._definitions.resource.topology.value : b;
    "html-client" === a && (a = "bootstrap");
    var d = c[a];
    if ("string" != typeof d)return"unknown";
    var e = d.split("/").filter(function (a) {
        return a.length > 0
    });
    return e.length ? e[e.length - 1] : "invalid"
}, getAllArtifactsVersions: function (a, b) {
    var c = ["html-client", "ck-editor", "langs", "wixapps", "tpa", "ecommerce"], d = {};
    if (b) {
        for (var e = 0; e < c.length; e++)d[c[e]] = this.getArtifactVersion(c[e]);
        return d
    }
    var f = c.map(this.getArtifactVersion);
    return f.join(a || "|")
}, setSettings: function (a) {
    this.reset(), this._settings = a, this._dontSendReports = window.location.search.search(/[?&]suppressbi=true/i) > -1, this.setDebugMode(a.debugMode || !1), this._initGoogleAnalytics(a);
    try {
        var b, c = a.version;
        window.serviceTopology && (b = window.serviceTopology.editorServerName ? window.serviceTopology.editorServerName.split(".")[0] : window.serviceTopology.serverName ? window.serviceTopology.serverName.split(".")[0] : "?", c = this.getAllArtifactsVersions()), this._wixBI = new WixBILogger(this, a.floggerServerURL, a.majorVer, c, a.siteId, a.metaSiteId, a.userId, a.userType, a.wixGlobalSessionId, a.computerId, a.creationSource, a.wixAppId, b, a.editingSessionId)
    } catch (d) {
        this._wixBI = {setDocId: function () {
        }, sendError: function () {
        }, sendEvent: function () {
        }}
    }
    this.reportEditorLoadingEvent("LOGGER STARTED", 110)
}, doNotSendReports: function () {
    this._dontSendReports = !0
}, isReady: function () {
    return!0
}, clone: function () {
    return this
}, _initGoogleAnalytics: function (a) {
    var b = a.enableGoogleAnalytics !== !1, c = {sendError: function () {
    }, sendEvent: function () {
    }, sendPageEvent: function () {
    }};
    if (b)try {
        this._analytics = new WixGoogleAnalytics(a.wixAnalytics, a.userAnalytics, a.version, a.userType, a.userLanguage, a.sendPageTrackToUser, a.sendPageTrackToWix)
    } catch (d) {
        this._analytics = c
    } else this._analytics = c
}, reset: function () {
    this._logList = [], this._timeData = {}, this._initTime = (new Date).getTime()
}, getSessionTime: function () {
    return(new Date).getTime() - this._initTime
}, updateSetting: function (a, b) {
    var c = this._settings || {};
    switch (c[a] = b, a) {
        case"siteId":
            this._wixBI.setDocId(b);
            break;
        case"wixAppId":
            this._wixBI.setSrc(b);
            break;
        case"editorSessionId":
            this._wixBI.setEditorSessionId(b);
            break;
        case"metaSiteId":
            this._wixBI.setMetaSiteId(b)
    }
}, getLog: function () {
    return this._logList.concat()
}, clearLog: function () {
    this._logList = []
}, setDebugMode: function (a) {
    this._debugMode = a
}, reportError: function (a, b, c, d) {
    return a ? a.ignore ? function () {
    } : (d = d || {}, this._handleLogObj("reportError", a, d, {className: b, methodName: c}) ? (this._dontSendReports || (this._wixBI.sendError(a, b, c, d), this._analytics.sendError(a, b, c, d)), this._settings.onError && this._settings.onError(a, b, c, d), this._debugMode ? null : function () {
    }) : function () {
    }) : null
}, reportEvent: function (a, b) {
    return b = b || {}, this._handleLogObj("reportEvent", a, b) ? (this._dontSendReports || (a.biEventId && this._wixBI.sendEvent(a, b), this._analytics.sendEvent(a, b)), this._settings.onEvent && this._settings.onEvent(a, b), function () {
    }) : function () {
    }
}, reportCustomEvent: function (a, b) {
    return b = b || {}, this._handleLogObj("reportEvent", a, b) ? (this._dontSendReports || (a.biEventId && this._wixBI.sendCustomEvent(a, b), this._analytics.sendEvent(a, b)), this._settings.onEvent && this._settings.onEvent(a, b), function () {
    }) : function () {
    }
}, initNewBeatPage: function () {
    this._wixBI.initNewBeatPage()
}, reportBeatStartEvent: function (a) {
    this._wixBI.sendBeatStartEvent(a)
}, reportBeatFinishEvent: function (a) {
    this._wixBI.sendBeatFinishEvent(a)
}, reportEditorLoadingEvent: function (a, b) {
    var c = window.viewMode;
    "site" != c && this.reportEvent(wixEvents.LOADING_STEPS, {c1: b + ":" + c + ": " + a})
}, reportPageEvent: function (a) {
    this._debugMode || this._dontSendReports || this._analytics.sendPageEvent(this._sanitizePageUrl(a, window.viewMode))
}, _sanitizePageUrl: function (a, b) {
    return"editor" == b && (a = this._sanitizeUrlForWixBI(a)), a
}, _sanitizeUrlForWixBI: function (a) {
    return a
}, isUniqueErrorCode: function (a) {
    return Object.every(this._settings.errors, function (b) {
        return a !== b.errorCode
    })
}, _handleLogObj: function (a, b, c, d) {
    if (!b)return!1;
    if (b.sampleRatio && b.sampleRatio > 1 && !this.isThisSiteInEventSampleRatio(b.sampleRatio))return!1;
    if (b.callCount = b.callCount || 0, b.callLimit && b.callLimit <= b.callCount)return!1;
    if (this._checkTime(b, c), this._logLog(a, b, c, d), (b.thresholdTime || 0 === b.thresholdTime) && c.time >= b.thresholdTime && b.thresholdError) {
        var e = this._settings.errors[b.thresholdError];
        this.reportError(e)
    }
    return b.callCount++, !0
}, _logLog: function () {
    this._logList.push(arguments)
}, _checkTime: function (a, b) {
    b = b || {}, b.time = this._getTime(a.timerId)
}, _getTime: function (a) {
    a = a || "initTime";
    var b = this._initTime, c = (new Date).getTime();
    return"initTime" != a && (b = this._timeData[a] || this._initTime, this._timeData[a] = c), c - b
}, isThisSiteInEventSampleRatio: function (a) {
    if (this._debugMode) {
        if (-1 == window.location.search.search(/[?&]forcesampleratio/i))return!0
    } else if (-1 !== window.location.search.search(/[?logg&]nosampleratio/i))return!0;
    var b = window.siteHeader && siteHeader.userId || window.siteId;
    if (b) {
        var c = b.substr(-4);
        return parseInt(c, 16) % a === 0
    }
    return 0 === Math.floor(Math.random() * a)
}}, function (a, b) {
    function c(a) {
        for (var b = document.cookie.split(";"), c = a, d = 0; d < b.length; d++) {
            for (var e = b[d]; " " === e.charAt(0);)e = e.substring(1, e.length);
            if (0 === e.indexOf(c))return e = e.substring(c.length, e.length), e.replace("=", "")
        }
        return""
    }

    function d(c, d) {
        var e = d ? "i" : "", f = new RegExp("[?&]" + c + "=([^&]+)", e), g = a.location.search.match(f);
        return g ? g[1] : b
    }

    function e() {
        return a.editorModel && a.editorModel.mode || a.rendererModel && a.rendererModel.debugMode
    }

    function f() {
        return a.editorModel || a.rendererModel || {}
    }

    function g() {
        return"debug" === e() || /[?&]debugArtifacts?\b/i.test(a.location.search)
    }

    var h = "http://m.wix.com";
    if (a.siteHeader && a.siteHeader.creationSource)switch (a.siteHeader.creationSource.toLocaleLowerCase()) {
        case"web":
            h = "http://www.wix.com";
            break;
        case"standalone":
            h = "http://mobile.wix.com"
    }
    var i = "";
    a.googleAnalytics && (i = 0 === a.googleAnalytics.length ? "" : a.googleAnalytics);
    var j = !(a.publicModel && a.publicModel.suppressTrackingCookies), k = a.rendererModel && "UGC" === rendererModel.documentType ? "UA-2117194-61" : "", l = {errors: a.wixErrors, events: a.wixEvents, wixAnalytics: "editor" === a.viewMode ? ["UA-2117194-45"] : [], userAnalytics: [k, i], enableGoogleAnalytics: j, floggerServerURL: a.serviceTopology && a.serviceTopology.biServerUrl || "http://frog.wixpress.com/", majorVer: 2, version: ("editor" != a.viewMode ? "VR" : "ER") + a.client_version, siteId: a.siteId ? siteId : "", metaSiteId: f().metaSiteId, userId: a.siteHeader && a.siteHeader.userId || "00000000-0000-0000-0000-000000000000", userType: c("userType"), userLanguage: c("wixLanguage") || "unknown", wixGlobalSessionId: c("_wix_browser_sess"), editingSessionId: d("editorSessionId", !0), computerId: c("_wixCIDX") || "00000000-0000-0000-0000-000000000000", creationSource: h, wixAppId: 42, sendPageTrackToWix: "editor" == a.viewMode, sendPageTrackToUser: "site" == a.viewMode, debugMode: g(), onEvent: function () {
    }, onError: function (b, c, d, f) {
        (g() || "unit_test" == e()) && a.console && a.console.error && console.error(b.desc, b, c, d, f)
    }}, m = f(), n = m.runningExperiments || {};
    "new" === n.nougcanalytics && m.premiumFeatures && m.premiumFeatures.indexOf("HasDomain") > -1 && l.userAnalytics.splice(0, 1), a.LOG = new Logger(l), -1 !== a.location.search.search(/[?&]suppressbi=true/i) && (LOG.reportEvent = function () {
    }, LOG.reportBeatStartEvent = function () {
    }, LOG.reportBeatFinishEvent = function () {
    }, LOG.reportError = function () {
    }, LOG.reportEditorLoadingEvent = function () {
    }, LOG.reportPageEvent = function () {
    })
}(window), function () {
    function a(a, b, d) {
        c || (c = !0, LOG.reportError(wixErrors.WINDOW_ON_ERROR, {c1: a, c2: b, i1: d}), console && console.error && console.error("An error occurred in the code: ", a, b, d))
    }

    try {
        var b = window.editorModel || window.rendererModel;
        if (b && b.runningExperiments && b.runningExperiments.windowonerror && "new" === b.runningExperiments.windowonerror.toLowerCase()) {
            var c = !1, d = window.onerror;
            window.onerror = function (b, c, e) {
                a(b, c, e), "function" == typeof d && d.apply(this, arguments)
            }
        }
    } catch (e) {
    }
}(), function () {
    function a() {
        var a = window.__profiler;
        a.runTime = a.runTime || {}, a.runtimeCallStack = a.runtimeCallStack || [], a.rtCanon = a.rtCanon || {}
    }

    function b(a, b, d) {
        return function () {
            if (!c() || e())return a.apply(this, arguments);
            var h = window.__profiler, i = d + "::" + b, j = g(i);
            h.runtimeCallStack.push(j), h.runTime[i] || (h.runTime[i] = f());
            var k = h.runTime[i];
            j.selfTimeCalls.push(0);
            var l = performance.now(), m = a.apply(this, arguments), n = performance.now(), o = n - l;
            j.totalTime += o, j.counter++, k.runs.push(o), k.selfRuns.push([j.selfTimeCalls[j.selfTimeCalls.length - 1] + o, arguments]), k.totalTime += o;
            var p;
            if (h.runtimeCallStack.length > 1) {
                var q = h.runtimeCallStack[h.runtimeCallStack.length - 2], r = q.ref;
                p = h.runTime[r], q.childrenTime += o, p.childrenTotalTime += o, q === j ? q.selfTimeCalls[q.selfTimeCalls.length - 2] -= o : q.selfTimeCalls[q.selfTimeCalls.length - 1] -= o
            }
            return j.selfTimeCalls.pop(), h.runtimeCallStack.pop(), m
        }
    }

    function c() {
        return window.__profiler._isProfiling || (window.__profiler._isProfiling = location.href.indexOf("profiler=true") > -1), window.__profiler._isProfiling
    }

    function d() {
        return"site" === window.viewMode ? window.W && window.W.Viewer && window.W.Viewer._activeViewer_ && window.W.Viewer._activeViewer_._isSiteReady : "editor" === window.viewMode ? window.W && window.W.Preview && window.W.Preview._previewReady : void 0
    }

    function e() {
        return window._stopProfiling ? !0 : d() ? (window._stopProfiling = !0, !0) : !1
    }

    function f() {
        return{totalTime: 0, childrenTotalTime: 0, runs: [], selfRuns: []}
    }

    window.__profiler = window.__profiler || {};
    window.__profiler.___profileFunction = function (d, e, f) {
        if (!c())return d;
        a();
        var g = null;
        return d && (g = b(d, e, f), d.$wrapperFunction = g), g
    };
    var g = function (a) {
        var b, c = window.__profiler;
        if (0 === c.runtimeCallStack.length)b = c.rtCanon[a] ? c.rtCanon[a] : c.rtCanon[a] = h(a); else {
            var d = c.runtimeCallStack[c.runtimeCallStack.length - 1];
            b = d.next[a] ? d.next[a] : d.next[a] = h(a)
        }
        return b
    }, h = function (a) {
        return{ref: a, totalTime: 0, childrenTime: 0, counter: 0, next: {}, selfTimeCalls: []}
    }, i = {filterAbove: function (a) {
        var b = window.__profiler, c = {};
        for (var d in b.rtCanon)b.rtCanon[d].totalTime > a && (c[d] = b.rtCanon[d]);
        return c
    }, findBiggestRootFrom: function (a) {
        if (!a)return null;
        for (var b = 0, c = -1, d = !0, e = [a]; a && d;) {
            d = !1, b++;
            var f = null, g = null;
            for (g in a.next)d = !0, g && a.next[g] && a.next[g].totalTime > c && (c = a.next[g].totalTime, f = g);
            var c = -1;
            g && (e.push(a), a = a.next[f])
        }
        return[b, e, a]
    }, getPathFromNode: function (a, b) {
        function c(a, b, d) {
            if (!a || !b)return"Not Found";
            if (d.push(a), a.ref === b)return d;
            var e;
            for (var f in a.next) {
                if (e = c(a.next[f], b, d))return e;
                d.pop()
            }
            return null
        }

        return c(a, b, [])
    }, getMethodPerformance: function (a) {
        var b = [], c = window.__profiler;
        for (var d in c.rtCanon) {
            var e = c.getPathFromNode(c.rtCanon[d], a);
            e && b.push(e)
        }
        return b
    }, getManualStatistics: function () {
        var a = function (a) {
            return window.statistics[a] && 0 !== window.statistics[a].length ? window.statistics[a].map(function (a) {
                return a[1]
            }).reduce(function (a, b) {
                return Number.isNaN(a) || Number.isNaN(b) ? Number.isNaN(a) ? Number.isNaN(b) ? 0 : b : Number.isNaN(b) ? Number.isNaN(a) ? 0 : a : 0 : a + b
            }, 0) : 0
        }, b = "";
        for (var c in window.statistics)b += c + " = " + a(c), window.statistics[c].length > 0 && window.statistics[c][0].length >= 3 && (b += ", parent: " + window.statistics[c][0][2]), b += ";";
        return b.split(";").sort().join("\n"), b
    }, getSortedMethodsBySelf: function () {
        var a = window.__profiler, b = [];
        for (var c in a.runTime)b.push([c, a.runTime[c].totalTime, a.runTime[c].childrenTotalTime, a.runTime[c].runs]);
        return _.sortBy(b, function (a) {
            return a ? a[1] - a[2] : 0
        })
    }, getSortedMethodsByCount: function () {
        var a = window.__profiler, b = [];
        for (var c in a.runTime)b.push([c, a.runTime[c].totalTime, a.runTime[c].childrenTotalTime, a.runTime[c].runs]);
        return _.sortBy(b, function (a) {
            return a[3].length || 0
        })
    }, getSortedMethodsByAvg: function () {
        var a = window.__profiler, b = [];
        for (var c in a.runTime) {
            var d = a.runTime[c];
            b.push([c, d.totalTime, d.childrenTotalTime, d.runs, d.selfRuns])
        }
        return _.sortBy(b, function (a) {
            var b = 0 === a[4][0] ? 0 : a[4].reduce(function (a, b) {
                return[a[0] + b[0], ""]
            }, [0, ""])[0] / a[4].length;
            return a.averageSelfTime = b, b
        })
    }, getSortedMethodsByLargestSelfRuntime: function () {
        var a = this.getSortedMethodsByAvg(), b = {totalTime: 0, coll: []}, c = function (a) {
            var c = a[0], d = a.averageSelfTime, e = a[3].length, f = {name: c, average: d, count: e, totalTime: d * e};
            b.coll.push(f), b.totalTime += f.totalTime
        };
        return _.forEach(a, c), b.coll.reverse(), b
    }};
    if (c()) {
        var j = window.__profiler;
        j.filterAbove = i.filterAbove, j.findBiggestRootFrom = i.findBiggestRootFrom, j.getPathFromNode = i.getPathFromNode, j.getMethodPerformance = i.getMethodPerformance, j.getManualStatistics = i.getManualStatistics, j.getSortedMethodsBySelf = i.getSortedMethodsBySelf, j.getSortedMethodsByCount = i.getSortedMethodsByCount, j.getSortedMethodsByAvg = i.getSortedMethodsByAvg, j.getSortedMethodsByLargestSelfRuntime = i.getSortedMethodsByLargestSelfRuntime
    }
}(), Function.prototype.extendPrototype = function (a) {
    var b, c, d, e, f = arguments;
    e = "function" == typeof this ? this.prototype : this, e.constructor = this, "string" == typeof a && (f = [].slice.call(arguments, 1), e = e[a] = e[a] || {});
    var g = window.__profiler && window.__profiler._isProfiling;
    for (b = 0; b < f.length; b++) {
        d = f[b];
        for (c in d)if (d.hasOwnProperty(c)) {
            var h = d[c];
            e[c] = g && "function" == typeof d[c] ? window.__profiler.___profileFunction(h, c, this.name) : h
        }
    }
};
var nsUtil = function () {
    "use strict";
    return{
        /*define property b to object a, c is the value of the last level
        * Ex1: a = {name : 'aa'}, b = 'deployment', c = {age:15}, result : a = {name:'aa', deployment:{age:15}}
        * Ex2: a = {name : 'aa'}, b = 'level1.level2.level3', c = {age:15}, result : a = {name:'aa', level1:{level2:{level3:{age:15}}}}
        * */
        setNameSpace: function (a, b, c) {
        var d, e, f = b.split("."), g = f.length - 1;
        for (e = 0; g > e; e++){
            d = f[e];
            a[d] = a[d] || {};
            a = a[d];
        }
        a[f[g]] = c;
        return a
    }, getNameSpace: function (a, b) {
        for (var c = (b || "").split("."), d = c[0], e = a, f = 0; d;) {
            if (!e || !e[d])return void 0;
            e = e[d], d = c[++f]
        }
        return e
    }, getNamespacesAsStrings: function (a, b) {
        var c = [], d = function (a, b) {
            c.push(b)
        };
        return b ? this.forEachNode(a, d) : this.forEachLeaf(a, d), c
    }, forEachNode: function (a, b, c) {//a: obj, b:callback for each node, c:nodename
        if (c = c || "", b(a, c), "object" == typeof a && !(a instanceof Array || a instanceof Function))for (var d in a)if (a.hasOwnProperty(d)) {
            var e = "" === c ? d : c + "." + d;
            this.forEachNode(a[d], b, e)
        }
    }, forEachLeaf: function (a, b, c, d) {
        if (c = c || "", a && "object" == typeof a && !a.define) {
            for (var e in a)if (a.hasOwnProperty(e)) {
                var f = "" === c ? e : c + "." + e;
                this.forEachLeaf(a[e], b, f, d)
            }
        } else d && -1 !== d.indexOf(c) || b(a, c)
    }}
}();
Define.extendPrototype({getDefinition: function (a, b, c, d) {
    b && (a = a + "." + b);
    var e = nsUtil.getNameSpace(this._definitions, a);
    return e instanceof Function ? ((c || !e.hasOwnProperty("$cachedValue")) && (e.$cachedValue = e(d || this)), e.$cachedValue) : e
}, getBootstrapClass: function (a) {
    var b = this.getDefinition("bootstrapClass", a);
    if (b)return b;
    throw new Error("Undefined bootstrapClass requested: " + a)
}, createBootstrapClassInstance: function (a, b) {
    var c = this.getBootstrapClass(a), d = new c;
    return d.define = this, d.resource = this.getResourceFetcher(), b && d.init.apply(d, b), d
}, getResourceFetcher: function () {
    return this.resource && this.resource._instance_ ? this.resource._instance_ : define.resource._instance_
}, _addArrayOfDefinitions: function (a) {
    if (a && a.length)for (var b = 0; b < a.length; b++)this.addDefinition(a[b])
}, addDefinition: function (a) {
    var b, c, d = this;
    if (!this._isValidNameSpace(a))throw new Error("your namespace: " + a + " is not valid or already exists");

    b = this.getDefinition(a) || {};
    nsUtil.setNameSpace(this._definitions, a, b);
    c = function (e, f) {
        return d._skipDefinition(a, e) ? void 0 : (c.definitionModifier && (f = c.definitionModifier.apply(b, arguments)), c.nameModifier && (e = c.nameModifier.apply(b, arguments)), nsUtil.setNameSpace(b, e, f), f)
    };
    c.multi = this._createMultiDefinitionMethod(c);
    c.overrideName = this._createOverrideNameMethod(c);
    nsUtil.setNameSpace(this, a, c);
    return this
}, _skipDefinition: function (a, b) {
    return 0 !== a.indexOf("experiment.") ? !1 : this._getExperimentListResource().isMergedExperimentResource(b)
}, _getExperimentListResource: function () {
    var a = {isMergedExperimentResource: function () {
        return!1
    }}, b = this.getDefinition("resource", "ExperimentsList");
    return b ? b.value : a
}, _createOverrideNameMethod: function (a) {
    a.$nameOverrides = {};
    var b = function (b, c) {
        a.$nameOverrides[b] = c
    };
    return b.multi = function (a) {
        for (var c in a)b(c, a[c])
    }, b
}, _createMultiDefinitionMethod: function (a) {
    return function (b) {
        if ("array" == typeof b)for (var c = 0; c < b.length; ++c)a(b[c]); else for (var d in b)a(d, b[d])
    }
}, addDefinitions: function (a) {
    if (a) {
        var b = this;
        nsUtil.forEachLeaf(a, function (a, c) {
            b.addDefinition(c)
        })
    }
    return this
}, _isValidNameSpace: function (a) {
    return!(this._definitions[a] || this[a] || nsUtil.getNameSpace(this._definitions, a) || nsUtil.getNameSpace(this, a))
}}), window.deployStatus = function (a, b) {
    window.deployStatus._logAll_ && (window.deployStatus.logs[a] = window.deployStatus.logs[a] || [], window.deployStatus.logs[a].push(b))
}, window.deployStatus._logAll_ = !0, window.deployStatus.logs = {}, window.deployStatus.files = {}, window.deployStatus.notReady = function () {
    try {
        return window.deployStatus.logs.phases[deployStatus.logs.phases.length - 1].phaseExecuter._deployedInstances.filter(function (a) {
            return!a.isReady()
        })
    } catch (a) {
        throw"phases are not started yet."
    }
}, window.deployStatus.notRequsted = function () {
    return deployStatus.logs.addDefinition.slice().filter(function (a) {
        return!~deployStatus.logs.callDefinition.indexOf(a)
    })
}, window.deployStatus.getLoadedScripts = function (a) {
    return"string" == typeof a && (a = new RegExp(a)), [].filter.call(document.querySelectorAll("script"), function (b) {
        return a.test(b.src)
    })
};
var define = new Define;
define.addDefinitions({deployment: function () {
}, bootstrapClass: function () {
}, Class: function () {
}, oldClass: function () {
}, oldComponent: function () {
}, oldSkin: function () {
}, oldTrait: function () {
}, Const: function () {
}, utils: function () {
}, component: function () {
}, skin: function () {
}, dataItem: function () {
}, dataThemeItem: function () {
}, dataPropertyItem: function () {
}, dataSchema: function () {
}, experimentPlugin: function () {
}, animation: function () {
}, animationEditorPart: function () {
}, transition: function () {
}, experiment: {Class: function () {
}, newClass: function () {
}, component: function () {
}, newComponent: function () {
}, Const: function () {
}, newConst: function () {
}, skin: function () {
}, newSkin: function () {
}, dataSchema: function () {
}, newDataSchema: function () {
}, dataItem: function () {
}, newDataItem: function () {
}, dataThemeItem: function () {
}, newDataThemeItem: function () {
}, dataPropertyItem: function () {
}, newDataPropertyItem: function () {
}, newAnimation: function () {
}, animation: function () {
}, newAnimationEditorPart: function () {
}, animationEditorPart: function () {
}, newTransition: function () {
}, transition: function () {
}}, resource: function () {
}, activity: function () {
}})

define.bootstrapClass("bootstrap.bootstrap.resource.ResourceWrapper", function () {
    "use strict";
    function a() {
    }

    return a.extendPrototype({init: function (a, b, c) {
        return this.id = a, this.trials = 1, this.timeBetween = 0, this._successPendingCallbacks = [], this._errorPendingCallbacks = [], this.setContent(b, c), this._loading = !1, this
    }, setContent: function (a, b) {
        return this.value = a, this.url = b || this.url, this.callPendingCallbacksIfReady(), this
    }, getResourceValue: function (a, b) {
        void 0 !== this.value ? a(this.value, this.id) : (this.addPendingCallback(a, b), this.loadContentFromUrl())
    }, onLoad: function (a) {
        this.setContent(a)
    }, onFailed: function () {
        this._loading = !1, this.callErrorPendingCallbacks()
    }, loadContentFromUrl: function () {
        if (this.url && !this._loading && void 0 === this.value) {
            var a = this;
            this._loading = !0, this.resource.getResourceValue("scriptLoader", function (b) {
                a.url && "string" != typeof a.url ? b.loadResourceWithRetryPolicy(a) : b.loadResource(a, a)
            })
        }
    }, addPendingCallback: function (a, b) {
        "function" == typeof a && this._successPendingCallbacks.push(a), "function" == typeof b && this._errorPendingCallbacks.push(b)
    }, callPendingCallbacksIfReady: function () {
        void 0 !== this.value && (this._successPendingCallbacks.forEach(function (a) {
            a(this.value, this.id)
        }, this), this.clearPendingCallbacks())
    }, callErrorPendingCallbacks: function () {
        this._errorPendingCallbacks.forEach(function (a) {
            setTimeout(a.bind(this, this.value, this.id), 0)
        }, this), this.clearPendingCallbacks()
    }, clearPendingCallbacks: function () {
        this._errorPendingCallbacks = [], this._successPendingCallbacks = []
    }, withUrls: function (a) {
        return this.url = a, this
    }, withTrials: function (a) {
        return this.trials = a > 0 ? a : 1, this
    }, withTrialFailNotification: function (a) {
        return this.trialFailNotification = a, this
    }, withTimeBetween: function (a) {
        return this.timeBetween = a > -1 ? a : 0, this
    }, clone: function (b) {
        var c = this.value;
        return c && c.clone && "function" == typeof c.clone && (c = c.clone(b)), (new a).init(this.id, c, this.url)
    }, value: void 0, url: void 0, id: void 0, timeout: 3e4}), a
});

define.bootstrapClass("bootstrap.bootstrap.resource.Resource", function () {
    "use strict";
    function a() {
    }

    return a.extendPrototype({init: function () {
        return this._validateResource(), this.define.resource._instance_ = this, this.define.resource.definitionModifier = this._handleNewResourceDefinition.bind(this), this.pendingResourceLoadRequests = [], this.RESOURCE_LOAD_REQUEST_TIMEOUT = 1e4, this.MIN_INTERVAL_FOR_CHECKING_RESOURCE_LOAD_REQUESTS = 2500, this
    }, checkForTimedOutResourceLoadRequests: function () {
        for (var a = (new Date).getTime(); this.pendingResourceLoadRequests.length > 0;) {
            var b = this.pendingResourceLoadRequests[0], c = b.time + this.RESOURCE_LOAD_REQUEST_TIMEOUT;
            if (c > a)break;
            b.loaded || (console.error("Resource " + b.name + " Not found/loaded after " + this.RESOURCE_LOAD_REQUEST_TIMEOUT + " ms"), LOG.reportError(wixErrors.RESOURCE_NOT_LOADED, b.name)), this.pendingResourceLoadRequests.splice(0, 1)
        }
        this.pendingResourceLoadRequests.length > 0 && this.scheduleNextCheckForTimedOutResourceLoadRequests(a)
    }, scheduleNextCheckForTimedOutResourceLoadRequests: function (a) {
        var b = this.pendingResourceLoadRequests[0].time + this.RESOURCE_LOAD_REQUEST_TIMEOUT, c = b - a;
        c = Math.max(c, this.MIN_INTERVAL_FOR_CHECKING_RESOURCE_LOAD_REQUESTS), setTimeout(this.checkForTimedOutResourceLoadRequests.bind(this), c)
    }, getResourceValue: function (a, b, c) {
        var d = (new Date).getTime();
        deployStatus("getResourceValue", a, d);
        var e = this.define.getDefinition("resource", a), f = {name: a, time: d, loaded: !1}, g = function () {
            return f.loaded = !0, b.apply(e, arguments)
        };
        e ? e.getResourceValue && e.getResourceValue(g, c) : (e = this.define.createBootstrapClassInstance("bootstrap.bootstrap.resource.ResourceWrapper").init(a), this.define.resource(a, e), e.addPendingCallback(g, c)), this.pendingResourceLoadRequests.push(f), 1 === this.pendingResourceLoadRequests.length && this.scheduleNextCheckForTimedOutResourceLoadRequests(d)
    }, getResources: function (a, b) {
        function c(c, f) {
            nsUtil.setNameSpace(d, f, c), e.push(f), e.length === a.length && b(d)
        }

        var d = {}, e = [];
        a.forEach(function (a) {
            this.getResourceValue(a, c)
        }, this)
    }, _handleNewResourceDefinition: function (a, b, c) {
        var d = this.define.getBootstrapClass("bootstrap.bootstrap.resource.ResourceWrapper");
        if (b instanceof d)return b;
        var e = this.define.getDefinition("resource", a);
        return e && e instanceof d ? c && e.url !== c && (e.setContent(b, c), e.loadContentFromUrl()) : e = this.define.createBootstrapClassInstance("bootstrap.bootstrap.resource.ResourceWrapper").init(a), e.setContent(b, c)
    }, _validateResource: function () {
        if (this.define.resource._instance_)throw window.deployStatus("definedResourcesError", this.define.resource), new Error("Resource is already defined");
        if (this.define.resource.definitionModifier)throw window.deployStatus("definitionModifierError", this.define.resource), new Error("define.resource already has some other definitionModifier")
    }, url: function (a, b, c) {
        return a = a || "", b = b || "cors", c = !!c, {url: a, method: b, once: c}
    }}), a
});
var resource = define.createBootstrapClassInstance("bootstrap.bootstrap.resource.Resource").init(), PHASES = {BOOTSTRAP: 0, LIBS: 1, CLASSMANAGER: 2, UTILS: 3, MANAGERS: 4, INIT_ANGULAR: 5, LOAD_ANGULAR: 6, INIT: 7, POST_DEPLOY: 8, TEST: 9};
PHASES.getPhaseFormIndex = function (a) {
    for (var b in this)if (this[b] === a)return b
}, PHASES.isPhaseExist = function (a) {
    return this[a.split("PHASES.").pop()] >= 0
}, PHASES.lastPhaseIndex = function () {
    var a = 0;
    for (var b in this)a = this[b] > a ? this[b] : a;
    return a
}, define.bootstrapClass("bootstrap.bootstrap.deploy.DeploymentDefinition", function () {
    function a() {
        this._phases_ = []
    }

    return a.extendPrototype({atPhase: function (a, b) {
        if (!(a >= 0))throw new Error("the phase that you are trying to load [" + a + "] is not exist.\n Available Phases" + JSON.stringify(PHASES, null, 4));
        this._phases_[a] = this._phases_[a] || [], this._phases_[a].push(b)
    }}), a
}), define.bootstrapClass("bootstrap.bootstrap.deploy.DeploymentPhaseExecutor", function () {
    function a() {
    }

    function b(a, b) {
        this.className = b, this.target = a, this.isReady = function () {
            return!1
        }
    }

    return a.extendPrototype({init: function (a, b, c, d) {
        return this.id = (+new Date % 1e4).toString(36), this.timeToTimeout = d || 3e3, this.phase = PHASES.getPhaseFormIndex(a), this._async = [], this._deployed = b, this._deployedInstances = [], this.log = c, this
    }, run: function (a, b, c) {
        this.log(this.phase + "[" + this.id + "] run: " + a), a.apply(b, c)
    }, publishBootstrapClass: function (a, b) {
        this.log(this.phase + "[" + this.id + "] publish: " + a + "." + b);
        var c = this._getDefinitionValue("bootstrapClass", b);
        nsUtil.setNameSpace(this._deployed, a, c)
    }, createBootstrapClassInstance: function (a, b, c) {
        this.log(this.phase + "[" + this.id + "] createBootstrapClassInstance: " + a + "." + b);
        var d = this.define.createBootstrapClassInstance(b);
        return c && d.init.apply(d, c), this._deployedInstances.push(d), nsUtil.setNameSpace(this._deployed, a, d), this.define.resource(a, d), d
    }, createClassInstance: function (a, b) {
        this.log(this.phase + "[" + this.id + "] createClassInstance: " + a + " : " + b);
        var c = this.getClassManagerInstance();
        if (!c)throw new Error("Class manager not deployed");
        var d = this._setPendingStatus(a, b);
        c.getClass(b, function (b) {
            var c = new b, e = this._deployedInstances.indexOf(d);
            this._deployedInstances[e] = c, nsUtil.setNameSpace(this._deployed, a, c), this.define.resource(a, c)
        }.bind(this))
    }, getClassManagerInstance: function () {
        return nsUtil.getNameSpace(this._deployed, "W.Classes")
    }, copyNamespace: function (a, b, c) {
        this.log(this.phase + "[" + this.id + "] copyNamespace: " + a + " : " + b);
        var d = this._getDefinitionValue(b, c);
        nsUtil.setNameSpace(this._deployed, a, d)
    }, loadResource: function (a) {
        "string" == typeof a && (a = {url: a, id: "Loaded_at_phase_" + this.phase + (4294967295 * Math.random()).toString(2)});
        var b = {};
        b.isReady = function () {
            return!1
        }, b.onLoad = function () {
            b.isReady = function () {
                return!0
            }
        }, b.onFailed = function (a, c, d) {
            b.isReady = function () {
                throw new Error("Error loading: " + c, d)
            }
        }, this._deployedInstances.push(b), this.resource.getResourceValue("scriptLoader", function (c) {
            c.loadResource(a, b)
        })
    }, loadManifest: function (a, b, c, d) {
        function e() {
            return b
        }

        function f() {
            h.isReady = function () {
                return!0
            }
        }

        function g() {
            h.isReady = function () {
                if (c)throw new Error("Some manifest resources failed to load", h);
                return!1
            }
        }

        var h = {isReady: e, context: "Loading not started"};
        this._deployedInstances.push(h), "string" == typeof a ? this.resource.getResources([a, "scriptLoader"], function (b) {
            var c = nsUtil.getNameSpace(b, a);
            h.context = b.scriptLoader.loadManifest(c, f, g, d)
        }) : this.resource.getResourceValue("scriptLoader", function (b) {
            h.context = b.loadManifest(a, f, g)
        }), setTimeout(this.phaseTimeout.bind(this), this.timeToTimeout)
    }, phaseTimeout: function () {
        if (!this.isPhaseReady())throw window.deployStatus("timeout", {executer: this}), new Error("Deployment Phase is taking too long at " + this.phase + " phase")
    }, async: function (a, b) {
        var c = this._async, d = c.length;
        return this._async.push({timeout: (new Date).getTime() + a, message: b || "Async phase " + this.phase + " timed out after " + a + "mSec"}), function () {
            c[d] = !0
        }
    }, isPhaseReady: function () {
        var a = !0;
        return this._deployedInstances.forEach(function (b) {
            b.isReady() || (a = !1)
        }), a && this._async.every(function (a) {
            if (a.timeout && a.timeout < (new Date).getTime())throw new Error(a.message);
            return a === !0
        })
    }, _setPendingStatus: function (a, c) {
        var d = new b(a, c);
        return this._deployedInstances.push(d), d
    }, _getDefinitionValue: function (a, b) {
        var c = this.define.getDefinition(a, b);
        if (!c)throw new Error("Missing definition or namespace: " + a + "." + b);
        return c
    }}), a
}), define.bootstrapClass("bootstrap.bootstrap.deploy.Deploy", function () {
    function a() {
        this._log = [], this._onDeploymentCompleteCallbacks = []
    }

    return a.extendPrototype({_deployed: void 0, init: function (a) {
        return console.groupCollapsed && console.groupCollapsed("Deployment log"), this.log("Deployment started. Instances will be deployed on:", a), this._deployed = a, this._deploymentsDef = this._getDeploymentsDefinition(), this._phases = this._deploymentsDef._phases_, this._deployingPhase = PHASES.BOOTSTRAP, window.MooTools || (window.$ = null), this._deployPhase(this._deployingPhase), this
    }, _deployNextPhase: function (a) {
        void 0 === a || a.isPhaseReady() ? (a ? console.log("Done deploying phase: " + PHASES.getPhaseFormIndex(this._deployingPhase)) : console.log("Phase: " + PHASES.getPhaseFormIndex(this._deployingPhase) + " had no content"), ++this._deployingPhase <= PHASES.lastPhaseIndex() ? (console.log("Deploying phase: " + PHASES.getPhaseFormIndex(this._deployingPhase)), this._deployPhase(this._deployingPhase)) : (console.log("Deployment complete"), console.groupEnd && console.groupEnd(), _.forEach(this._onDeploymentCompleteCallbacks, function (a) {
            a()
        }))) : setTimeout(this._deployNextPhase.bind(this, a), 30)
    }, _loadAllManifestsForPhase: function (a, b) {
        this.resource.getResources(["scriptLoader", "loadAtPhase"], function (c) {
            var d = PHASES.getPhaseFormIndex(a), e = c.loadAtPhase[d];
            e && e.length ? (console.log("Loading scripts for phase " + PHASES.getPhaseFormIndex(a), c.loadAtPhase[d]), c.scriptLoader.loadManifest("", e, function () {
                b()
            })) : b()
        })
    }, _deployPhase: function (a) {
        var b = this;
        this._loadAllManifestsForPhase(a, function () {
            var c;
            b._phases[a] && b._phases[a].length > 0 && (b.log("Deploying phase " + PHASES.getPhaseFormIndex(a)), c = b.define.createBootstrapClassInstance("bootstrap.bootstrap.deploy.DeploymentPhaseExecutor").init(a, b._deployed, b.log.bind(b)), b._phases[a].forEach(function (a) {
                a(c)
            })), window.deployStatus("phases", {phaseExecuter: c, phase: b._phases[a], deploy: b, time: LOG && LOG.getSessionTime() || 0});
            var d = [wixEvents.DEPLOY_PHASE_COMPLETE_BOOTSTRAP, wixEvents.DEPLOY_PHASE_COMPLETE_LIBS, wixEvents.DEPLOY_PHASE_COMPLETE_CLASSMANAGER, wixEvents.DEPLOY_PHASE_COMPLETE_UTILS, wixEvents.DEPLOY_PHASE_COMPLETE_MANAGERS, wixEvents.DEPLOY_PHASE_COMPLETE_INIT, wixEvents.DEPLOY_PHASE_COMPLETE_POST_DEPLOY, wixEvents.DEPLOY_PHASE_COMPLETE_TEST], e = d[a];
            LOG.reportEvent(e, {i1: a, c1: PHASES.getPhaseFormIndex(a)}), b._deployNextPhase(c)
        })
    }, _runDeployments: function (a, b) {
        nsUtil.forEachLeaf(b, function (b) {
            b instanceof Function && b(a)
        })
    }, _getDeploymentsDefinition: function () {
        var a = this.define.createBootstrapClassInstance("bootstrap.bootstrap.deploy.DeploymentDefinition");
        return this._runDeployments(a, this.define.getDefinition("deployment")), a
    }, log: function () {
        var a = Array.prototype.splice.call(arguments, 0);
        a.forEach(this._log.push.bind(this._log))
    }, addOnDeploymentComplete: function (a) {
        this._onDeploymentCompleteCallbacks.push(a)
    }}), a
}), define.bootstrapClass("bootstrap.bootstrap.scriptloader.ManifestContext", function () {
    "use strict";
    function a() {
    }

    function b(a) {
        if (a.id && a.id === this.id)throw new Error("Invalid manifest: contains duplicate ids: " + this.id, a, this);
        if (a.url == this.url)throw new Error("Invalid manifest: contains duplicate urls: " + this.url, a, this)
    }

    function c(a) {
        return a.replace(/\.$/, "").replace(/\.\./g, ".")
    }

    function d(a, b) {
        return!b || a.indexOf("://") >= 3 && a.indexOf("://") < 10 || 0 === a.indexOf("/") || (a = b + "/" + a), a.replace(/\/+/g, "/").replace(/\/$/, "").replace(":/", "://")
    }

    return a.extendPrototype({init: function (a, b, c, d, e) {
        var f = this;
        return this.validateManifest(b), this.baseUrl = a, this.manifest = b, this.loaded = [], this.failed = [], this.filter = e, this.requested = e ? this.getManifestUrls(a, b).filter(e) : this.getManifestUrls(a, b), this.onAllScriptsLoaded = c || function () {
        }, this.onSomeScriptsFailed = d || function () {
            clearTimeout(f.timeoutForError), f.timeoutForError = setTimeout(function () {
                var a = f.manifest.map(function (a) {
                    return a.id
                });
                throw new Error('A manifest with id`s: ["' + a.join('","') + '"] failed to load these scripts: ' + JSON.stringify(f.failed, null, 4) + '\n from this base url: "' + f.baseUrl + '"')
            }, 300)
        }, window.W && window.W.isExperimentOpen && window.W.isExperimentOpen("UseJsonpForManifests") && (this.useJsonp = !0), this
    }, onLoad: function (a, b) {
        this.loaded.push(b), b.id && this.define.resource(b.id, a), deployStatus("ManifestContext.onLoad", this.loaded.length + " / " + this.requested.length + " " + b.url), this.loaded.length >= this.requested.length && this.onAllScriptsLoaded(this)
    }, onFailed: function (a, b) {
        this.failed.push(b), deployStatus("ManifestContext.onFailed", this.failed.length + " / " + this.loaded.length + " / " + this.requested.length), this.onSomeScriptsFailed(this), this.onSomeScriptsFailed = function () {
        }
    }, getManifestUrls: function (a, b) {
        var c = [], d = this._addUrl;
        return b.forEach(function (b) {
            return b.resources ? (b.resources.forEach(function (e) {
                d(a, c, b, e)
            }), void 0) : d(a, c, b)
        }), c
    }, _addUrl: function (a, e, f, g) {
        g = g || {url: ""};
        var h = d(f.url, a), i = {url: d(g.url, h)};
        g && g.id && (i.id = f.id ? c(f.id + "." + g.id) : c(g.id)), f.id && !g && (i.id = c(f.id)), e.forEach(b, i), e.push(i)
    }, validateManifest: function (a) {
        if (!(a instanceof Array))throw new Error("Invalid manifest: must be an array");
        a.forEach(function (a) {
            if ("string" != typeof a.url)throw new Error('Invalid manifest: "url" not defined (must be a string), ID: ' + a.id);
            if (a.resources && a.resources.forEach(function (b) {
                if ("string" != typeof b.url)throw new Error("Invalid manifest: some resources of " + a.id + ' have no "url" field (must be a string), ID: ' + a.id)
            }), a.atPhase) {
                var b = a.atPhase.replace("PHASES.", "");
                if (!(b in PHASES) && "immediate" !== b)throw new Error("atPhase is not defined with a known PHASE its current value is " + a.atPhase)
            }
        })
    }}), a
}), define.bootstrapClass("bootstrap.bootstrap.scriptloader.ScriptLoaderPlugin", function () {
    "use strict";
    function a() {
    }

    return a.extendPrototype({init: function (a, b, c) {
        return this.name = a, this.isMatch = b, this.exec = c, this
    }, isMatch: function () {
        throw new Error("Invalid ScriptLoaderPlugin: isMath and exec methods not set. Use init to override them", this)
    }, exec: function () {
        throw new Error("Invalid ScriptLoaderPlugin: isMath and exec methods not set. Use init to override them", this)
    }}), a
}), define.resource("BrowserUtils", {getQueryParams: function () {
    try {
        for (var a, b = {}, c = this._getQueryString(), d = /([^&=]+)=([^&]*)/g; a = d.exec(c);) {
            var e = decodeURIComponent(a[1]).toLowerCase(), f = decodeURIComponent(a[2]);
            b[e] || (b[e] = []), b[e].push(f)
        }
        return b
    } catch (g) {
        return{}
    }
}, _getQueryString: function () {
    return location.search.substring(1)
}}), resource.getResources(["BrowserUtils"], function (a) {
    define.resource("ExperimentsList", {getExperimentsList: function () {
        var a = this._isInEditor() ? this._getEditorExperiments() : this._getRendererExperiments(), b = this._getExperimentsFromQuery(), c = function (a) {
            return Array.prototype.slice.call(arguments).splice(1).reduce(function (a, b) {
                return Object.keys(b).forEach(function (c) {
                    a[c] = b[c]
                }), a
            }, a)
        };
        return c({}, a, b)
    }, _isInEditor: function () {
        return"editor" === viewMode
    }, _getExperimentsFromQuery: function () {
        var b = {}, c = a.BrowserUtils.getQueryParams().experiment;
        if (c)for (; exp = c.pop();) {
            var d = exp.split(":"), e = d[0].toLowerCase();
            b[e] = d.length > 1 ? d[1].toLowerCase() : "new"
        }
        return this._addAggregatedExperimentsFromQuery(b), b
    }, _addAggregatedExperimentsFromQuery: function (b) {
        var c = a.BrowserUtils.getQueryParams().experiments;
        if (c && 1 === c.length)for (var d = c[0].split(","); exp = d.pop();) {
            var e = exp.split(":"), f = e[0].toLowerCase();
            b[f] = e.length > 1 ? e[1].toLowerCase() : "new"
        }
    }, _getEditorExperiments: function () {
        return editorModel ? this._experimentsToLowerCase(editorModel.runningExperiments) : {}
    }, _getRendererExperiments: function () {
        return rendererModel ? this._experimentsToLowerCase(rendererModel.runningExperiments) : {}
    }, _experimentsToLowerCase: function (a) {
        var b = {};
        for (var c in a)b[c.toLowerCase()] = a[c].toLowerCase();
        return b
    }, isExperimentMerged: function (a, b) {
        var c = this.getMergedExperimentResource(a);
        return!!c[b.toLowerCase()]
    }, getMergedExperimentResource: function (a) {
        var b = define.getDefinition("resource", "web.experiments.merged");
        return this._lowerCaseExperimentsObject = this._lowerCaseExperimentsObject || {}, !this._lowerCaseExperimentsObject[a] && b && (this._lowerCaseExperimentsObject[a] = this._updateKeysToLowerCase(b.value)), this._lowerCaseExperimentsObject[a] || {}
    }, getArtifactName: function (a) {
        var b = a.split("."), c = function (a) {
            return"core" === a[0] || "mobile" === a[0] && "core" === a[1]
        };
        return c(b) ? "core" : -1 !== ["bootstrap", "skins", "ecommerce", "wixapps"].indexOf(b[0]) ? b[0] : "web"
    }, getExperimentName: function (a) {
        var b = a.split("."), c = "new" === b[b.length - 1].toLowerCase() ? b[b.length - 2] : b[b.length - 1];
        return c.toLowerCase()
    }, isMergedExperimentResource: function (a) {
        var b = this.getArtifactName(a), c = this.getExperimentName(a) || "", d = this.getMergedExperimentResource(b);
        return!!d[c.toLowerCase()]
    }, _updateKeysToLowerCase: function (a) {
        var b, c = {};
        for (b in a)a.hasOwnProperty(b) && (c[b.toLowerCase()] = a[b]);
        return c
    }})
}), define.resource("fnvHash", function () {
    "use strict";
    var a = function (b, c) {
        var d, e = 16777619, f = 2166136261, g = b.length, h = f;
        for (d = 0; g > d; d++) {
            var i = 255 & b.charCodeAt(d);
            h = (h ^ i) * e
        }
        return a.reduceHash(h, c).toString(36)
    };
    return a.reduceHash = function (a, b) {
        if (b = b || 20, 16 > b || b > 32)throw new Error("Invalid reduceToXBits value: must be in the 16-32 range");
        if (32 === b)return a;
        var c = 32 - b, d = (1 << c) - 1, e = a & d, f = a >>> c;
        return e ^ f
    }, {hash: function (b, c) {
        return a(b, c || 28)
    }}
}()), define.bootstrapClass("bootstrap.bootstrap.scriptloader.WixBlob", function () {
    "use strict";
    function a(b, c) {
        var d = Math.ceil(b.length / c);
        return b.length ? [b.slice(0, d)].concat(a(b.slice(d), c - 1)) : []
    }

    function b() {
    }

    function c(a, c, d) {
        this.url = a, this.onLoad = c || b, this.onFail = d || b, this.responseId = null, a || d()
    }

    function d(a, b, c) {
        this.base = a, this.files = b, this.ns = c || "loaded", this.requestStartTime = Date.now(), this.requestEndTime = null, this.elapse = null
    }

    function e() {
    }

    var f = document.createElement("a"), g = document.getElementsByTagName("head")[0];
    return d.prototype.getFilesResourceId = function () {
        return this.files.map(function (a) {
            return this.ns + "." + this.base + a
        }, this)
    }, e.extendPrototype({init: function (a, b, c, d) {
        var e = this;
        return this.requested = [], this._requestsBuffer = [], this.throttleTimeout = 60, this.maxUrlLength = 1024, this.sep = c || 3, this.hashMethod = d, this.blobUrl = a || "http://static.wix.com/wix_blob", this._clearBuffer(), b = b || [], this._supportedServers = b.map(function (a) {
            return"/" === a[a.length - 1] ? a.substr(0, a.length - 1) : a
        }), resource.getResources(["topology", "scriptLoader"], function (a) {
            e._topology = a.topology, e._scriptLoader = a.scriptLoader, e._throttle()
        }), this
    }, _getGzipQueryValue: function () {
        return"&zip=1"
    }, addRequest: function (a, b, d) {
        a = a.split("?").shift(), this._requestsBuffer.push(new c(a, b, d)), this._throttle()
    }, cancel: function () {
        clearTimeout(this._throttle.timeoutId), this._throttle.timeoutId = void 0, this._requestsBuffer = []
    }, _throttle: function () {
        var a = this;
        this._requestsBuffer.length && (clearTimeout(this._throttle.timeoutId), this._throttle.timeoutId = setTimeout(function () {
            a._sendBlobRequest()
        }, this.throttleTimeout))
    }, _extractFiles: function (a, b) {
        return this._requestsBuffer.filter(this._isRequestInSupportedServer.bind(this, a)).map(this._setResponseId.bind(this, a, b))
    }, _isRequestInSupportedServer: function (a, b) {
        return-1 !== b.url.indexOf(a)
    }, _setResponseId: function (a, b, c) {
        f.href = c.url;
        var d = f.href.replace(a + b, "");
        return d = this.hashMethod ? this.hashMethod(d) : d, c.responseId = "loaded." + b + d, d
    }, _getServerRootPath: function (a) {
        return"/" !== a[a.length - 1] && (a += "/"), f.href = a, a = f.pathname, "/" !== a[0] && (a = "/" + a), a
    }, _createGroupForServers: function (a) {
        var b = this._getServerRootPath(a), c = this._extractFiles(a, b);
        return c.length ? new d(b, c.sort()) : (deployStatus("blob dose not find any files for supportedServerUrl", a), void 0)
    }, _buildUrl: function (a) {
        return(this.blobUrl + "?base=" + a.base + "&flist=" + a.files.join() + "&sep=" + this.sep + this._getGzipQueryValue()).replace(/\/\//g, "/").replace(/(https?):\//g, "$1://")
    }, _createBlobGroups: function () {
        if (this._scriptLoader && this._supportedServers.length && this._requestsBuffer.length) {
            var a, b, c = this._supportedServers, d = [];
            for (a = 0; a < c.length; a++) {
                var e = this._createGroupForServers(c[a]);
                if (e) {
                    var f = this._splitToSubGroups(e);
                    for (b = 0; b < f.length; b++)d.push(f[b])
                }
            }
            return d
        }
    }, _splitToFixedNumberOfSubGroups: function (b, c) {
        var e = a(b.files, c), f = e.map(function (a) {
            return new d(b.base, a)
        });
        return f
    }, _isSubGroupsUrlIsTooLong: function (a) {
        return this._buildUrl(a).length > this.maxUrlLength
    }, _splitToSubGroups: function (a) {
        for (var b = 1, c = this._splitToFixedNumberOfSubGroups(a, b); c.some(this._isSubGroupsUrlIsTooLong, this);)b++, c = this._splitToFixedNumberOfSubGroups(a, b);
        return c
    }, _handleLoadedScriptAsString: function (a) {
        var b = document.createElement("script");
        try {
            b.appendChild(document.createTextNode(a))
        } catch (c) {
            b.text = a
        }
        g.appendChild(b), setTimeout(function () {
            b.parentNode && b.parentNode.removeChild(b)
        }, 0)
    }, _handleGroupLoad: function (a) {
        if (!this._scriptLoader)throw new Error("WixBlob has no scriptLoader");
        var b = (document.createElement("script"), this), c = b._buildUrl(a), d = function () {
            a.requestEndTime = Date.now(), a.elapse = a.requestEndTime - a.requestStartTime, deployStatus("blob_group_elapse", c + " (elapse time: " + a.elapse + ")"), LOG.reportError(wixErrors.BLOB_TIME_REPORT, c, {elapse: a.elapse})
        };
        LOG.reportError(wixErrors.BLOB_TIME_REPORT, c, {requestStartTime: a.requestStartTime}), this._scriptLoader.loadScript({url: c}, {onLoad: d, onFailed: d})
    }, _clearBuffer: function () {
        this.requested.push.apply(this.requested, this._requestsBuffer), this._requestsBuffer = []
    }, _getRequested: function (a) {
        for (var b = 0; b < this.requested.length; b++) {
            var c = this.requested[b];
            if (c.url === a || c.responseId === a)return c
        }
    }, _getExtension: function (a) {
        return a.split("?").shift().split(".").pop().toLowerCase()
    }, _evaluateContent: function (a, b) {
        var c = this._getRequested(a), d = this._getExtension(a);
        if (b.size > 0)try {
            if ("json" === d)c.onLoad(b.code()); else if ("js" === d) {
                var e = b.code.toString();
                e = this._removeFunctionWrapper(e), window._onBlobParseSuccess = c.onLoad, window._onBlobParseError = c.onFail, e = "try{" + e + '; window._onBlobParseSuccess();}catch(err){ LOG.reportError(wixErrors.BLOB_TIME_REPORT, "' + a + '", {message: "blob failed to eval: ' + a + '" + " " + err}); window._onBlobParseError();}', this._handleLoadedScriptAsString(e.toString())
            }
        } catch (f) {
            LOG.reportError(wixErrors.BLOB_TIME_REPORT, a, {message: "Eval Error"}), c.onFail(f)
        } else LOG.reportError(wixErrors.BLOB_TIME_REPORT, a, {message: "content loaded with no size"})
    }, _removeFunctionWrapper: function (a) {
        return a = a.replace(/\s*function\s*\(\s*\)\s*\{/, ""), a.substr(0, a.length - 1)
    }, _attachLoadHandler: function (a) {
        a.getFilesResourceId().forEach(function (a) {
            deployStatus("blob_handler", a), resource.getResourceValue(a, this._evaluateContent.bind(this, a))
        }, this)
    }, _sendBlobRequest: function () {
        var a = this._createBlobGroups();
        a && (this._clearBuffer(), a.forEach(this._attachLoadHandler, this), a.forEach(this._handleGroupLoad, this))
    }}), e
}), resource.getResources(["mode", "tags", "fnvHash"], function (a) {
    function b() {
        "use strict";
        function b() {
            this._docHead = document.getElementsByTagName("head")[0]
        }

        return b.extendPrototype({init: function () {
            return this.mode = a.mode, this.tags = a.tags, this
        }, loadManifest: function (a, b, c, d, e) {
            var f = this, g = this.define.createBootstrapClassInstance("bootstrap.bootstrap.scriptloader.ManifestContext");
            return this.resource.getResourceValue("tags", function (d) {
                var h = b.filter(f._manifestsWithMatchingTags(d));
                g.init(a, h, c, null, e), g.requested.forEach(function (a) {
                    var b = window.editorModel || window.rendererModel || {}, c = b.runningExperiments || {};
                    if ("new" === c.scriptloaderjsretries) {
                        var d = g.onFailed, e = function (b, c, h) {
                            LOG.reportError(wixErrors.SCRIPTLOADER_FAILED_TO_LOAD_SCRIPT_RETRY, "ScriptLoader", "loadResource", "times left=" + b + "; url=" + h.url), g.onFailed = 0 === b ? function (a, b) {
                                LOG.reportError(wixErrors.SCRIPTLOADER_FAILED_TO_LOAD_SCRIPT_GAVE_UP, "ScriptLoader", "loadResource", "url=" + b.url), d(a, b)
                            } : e.bind(f, b - 1), window.setTimeout(f.loadResource.bind(f, a, g), 200)
                        };
                        g.onFailed = e.bind(f, 2)
                    }
                    f.loadResource(a, g)
                })
            }), g
        }, _manifestsWithMatchingTags: function (a) {
            var b = this;
            return function (c) {
                return c.tags ? c.tags.some(function (c) {
                    return b._isTagExpressionTruthy(c, a)
                }) : !1
            }
        }, _splitOnFirstExclemation: function (a) {
            var b = a.indexOf("!"), c = b >= 0 ? a.substring(0, b) : a, d = b >= 0 ? a.substring(b) : "";
            if (d.indexOf("&") >= 0)throw new Error("malformed tag expression, there shouldn't be & after !. in tag " + a);
            return{include: c, exclude: d}
        }, _isTagExpressionTruthy: function (a, b) {
            var c = this._splitOnFirstExclemation(a), d = this._isAllTagsActive(c.include, b), e = this._isAllTagsInactive(c.exclude, b);
            return d && e
        }, _isAllTagsActive: function (a, b) {
            if (!a || "" === a)return!0;
            var c = a.split("&");
            return c.every(function (a) {
                return b.indexOf(a) >= 0
            })
        }, _isAllTagsInactive: function (a, b) {
            if (!a || "" === a)return!0;
            var c = a.split("!");
            return c.every(function (a) {
                return b.indexOf(a) < 0
            })
        }, loadManifestFromUrl: function (a, b, c, d) {
            var e = this, f = a.split("/");
            f.pop(), f = f.join("/"), this.resource.getResourceValue("tags", function (g) {
                e.loadResource({url: a}, {onLoad: function (a) {
                    if (a.descriptor) {
                        var h = a.descriptor;
                        a = a.files, h.id && e.define.resource("experimentDescriptors." + h.id.toLowerCase(), h)
                    }
                    var i = [], j = e.define.getDefinition("resource.loadAtPhase") && e.define.getDefinition("resource.loadAtPhase").value || {};
                    e.define.resource("loadAtPhase", j), a.filter(e._manifestsWithMatchingTags(g)).forEach(e._loadAggregation.bind(this, i, j, f)), i.length ? e.loadManifest(f, i, b, c, d) : b()
                }, onFailed: function () {
                    c && c.apply(e, arguments)
                }, useJsonp: window.W && window.W.isExperimentOpen && window.W.isExperimentOpen("UseJsonpForManifests")})
            })
        }, removeScript: function (a) {
            a && a.parentNode && a.parentNode.removeChild(a)
        }, _loadAggregation: function (a, b, c, d) {
            if ("immediate" === d.atPhase)return a.push(d), void 0;
            if (void 0 === d.atPhase)return a.push(d), void 0;
            var e = d.atPhase.replace("PHASES.", "");
            if (!(e in PHASES) && "immediate" !== e)throw new Error('Invalid phase name "' + e + '" in aggregation ' + d.id);
            b[e] = b[e] || [], d.url = c + "/" + d.url, b[e].push(d), console.log("Postponing aggregation loading to phase " + e, b[e])
        }, loadAllIndexes: function (a, b) {
            function c(c) {
                d++, deployStatus("manifestLoadingProgress", "(" + d + " / " + a.length + ") masifest loaded: " + c), d === a.length && (deployStatus("manifestLoadingProgress", "all indexes loaded { " + d + " }"), b.apply(this, arguments))
            }

            var d = 0, e = this;
            a.forEach(function (a) {
                var b = !1;
                e.loadManifestFromUrl(a, c.bind(null, a), function () {
                    if (!b) {
                        b = !0;
                        var d = ~a.indexOf("?") ? "&" : "?", f = d + "ck=" + (1e7 * Math.random() << 0).toString(36);
                        e.loadManifestFromUrl(a + f, c.bind(null, a + f), function () {
                            console.error(a + f + " Not loaded after retry!")
                        })
                    }
                })
            })
        }, loadResource: function (a, b) {
            var c = this._getPlugin(a, b);
            return c && c.exec(a, b, this)
        }, _getPlugin: function (a, b) {
            var c, d = a.usePlugin;
            if (d) {
                if (c = this.pluginsMap[d])return c;
                throw new Error("ScriptLoader:: Unable to find plugin: [" + d + "], please make sure a plugin with that name exists.")
            }
            for (var e = 0; e < this.plugins.length; e++)if (c = this.plugins[e], c.isMatch(a, this, b))return c;
            throw new Error("Unable to handle resource type of: " + a.url + " try to add a plugin in order to load this kind of file")
        }, plugins: [], pluginsMap: {}, IsIE8Browser: function () {
            var a = -1, b = navigator.userAgent, c = new RegExp("Trident/([0-9]{1,}[.0-9]{0,})");
            return null != c.exec(b) && (a = parseFloat(RegExp.$1)), 4 == a
        }(), addPlugin: function (a) {
            this.plugins.push(a), this.pluginsMap[a.name] = a
        }, initPlugin: function (a, b, c) {
            return this.addPlugin(this.define.createBootstrapClassInstance("bootstrap.bootstrap.scriptloader.ScriptLoaderPlugin").init(a, b, c))
        }, createTagWithInfo: function (a, b, c, d) {
            function e(a) {
                return c.indexOf(a.url) >= 0
            }

            var f, g, h = document.createElement(a);
            for (f in b)h[f] = b[f];
            if ((this.mode.debug || this.mode.test) && d && d.manifest) {
                for (g = 0; g < d.manifest.length; g++)if (d.manifest[g].resources.some(e)) {
                    h.setAttribute("data-manifest-id", d.manifest[g].id);
                    break
                }
                h.setAttribute("data-loaded-timestamp", Date.now())
            }
            return h
        }, getWithCORS: function (a, b) {
            var c = null, d = this;
            d.logStartLoading(a.url), window.XDomainRequest ? (c = new XDomainRequest, c.open("get", a.url + "?ctype=text/plain"), c.setRequestHeader = c.setRequestHeader || function () {
            }) : (c = new XMLHttpRequest, c.open("GET", a.url, !0)), c.onerror = c.ontimeout = c.onabort = function (e) {
                d.logEndLoading(a.url, !0), b.onFailed && b.onFailed(c, a, e)
            }, c.onprogress = function () {
            }, c.onload = function (e) {
                var f;
                try {
                    f = JSON.parse(c.responseText)
                } catch (g) {
                    return d.logEndLoading(a.url, !0), b.onFailed && b.onFailed(e), void 0
                }
                d.logEndLoading(a.url, !1), f && b.onLoad && b.onLoad(f, a, e)
            }, c.send()
        }, getWithJSONP: function (b, c, d) {
            var e, f, g, h = this, i = "r_" + a.fnvHash.hash(b.url, 32).replace("-", "_");
            d = "string" == typeof d ? d : "jsonp", h.logStartLoading(b.url), window.jsonpCallbacks = window.jsonpCallbacks || {}, window.jsonpCallbacks[i] = function (a) {
                h.logEndLoading(b.url, !1), c && c.onLoad && c.onLoad(a, b), delete window.jsonpCallbacks[i], h.removeScript(e)
            }, f = ~b.url.indexOf("?") ? "&" : "?", g = b.url + f + d + "=jsonpCallbacks." + i, e = this.createTagWithInfo("script", {type: "text/javascript", src: g}, b.url, c), e.onerror = function () {
                h.logEndLoading(b.url, !0), c && c.onFailed && c.onFailed(e, b)
            }, document.getElementsByTagName("head")[0].appendChild(e)
        }, loadScript: function (a, b) {
            var c = this;
            c.logStartLoading(a.url);
            var d = this.createTagWithInfo("script", {type: "text/javascript", src: a.url}, a.url, b);
            this.IsIE8Browser ? d.onreadystatechange = function () {
                ("complete" == d.readyState || "loaded" == d.readyState) && (c.logEndLoading(a.url, !1), b && b.onLoad && b.onLoad(d, a), c.removeScript(d))
            } : d.onload = function () {
                c.logEndLoading(a.url, !1), b && b.onLoad && b.onLoad(d, a), c.removeScript(d)
            }, d.onerror = function (e) {
                c.logEndLoading(a.url, !0), b && b.onFailed && b.onFailed(d, a, e)
            }, this._docHead.appendChild(d)
        }, _scriptLoadingError: function (a) {
            this.$scriptLoader.logEndLoading(this.$resource.url, !0), this.$context && this.$context.onFailed && this.$context.onFailed(this, this.$resource, a)
        }, getUrl: function (a, b, d, e) {
            var f = c();
            f.open("GET", a, !0), f.onreadystatechange = function () {
                if (4 == f.readyState)if (200 != f.status && 304 != f.status)d && d(f, new Error("General XHR Error: " + f.status)); else if ("json" === e)try {
                    var a = JSON.parse(f.responseText);
                    b && b(f, a)
                } catch (c) {
                    d && d(f, c)
                } else b && b(f)
            }, f.send()
        }, ajaxGet: function (a, b, c) {
            var d = new XMLHttpRequest, e = this;
            e.logStartLoading(a), d.open("GET", a), d.onerror = d.ontimeout = d.onabort = c, d.onload = function () {
                return 200 == d.status || 301 == d.status ? (e.logEndLoading(a, !1), b.apply(this, arguments), void 0) : (e.logEndLoading(a, !0), c.apply(this, arguments), void 0)
            }, d.send()
        }, ajaxPost: function (a, b, c, d) {
            var e = new XMLHttpRequest, f = this;
            f.logStartLoading(a), e.open("POST", a), e.onerror = e.ontimeout = e.onabort = d, e.onload = function () {
                return 200 == e.status || 301 == e.status ? (f.logEndLoading(a, !1), c.apply(this, arguments), void 0) : (f.logEndLoading(a, !0), d.apply(this, arguments), void 0)
            }, e.send(b)
        }, loadResourceWithRetryPolicy: function (a) {
            var b = 0, c = 0, d = function () {
                if (b > a.trials || 0 === a.url.length)return a.onFailed("fatal!!!");
                if (c >= a.url.length)return c = 0, b += 1, a.timeBetween ? setTimeout(d, a.timeBetween) : d();
                var f = a.url[c];
                return c += 1, b > 0 && f.once && f.beenHere ? d() : (f.beenHere = !0, e(f.url, f.method || "cors", function () {
                    return W.isExperimentOpen("SendBiOnPageJsonTrialFail") && a.trialFailNotification && a.trialFailNotification(f.url, c, b), d()
                }, function (b) {
                    a.onLoad(b)
                }), void 0)
            }, e = function (a, b, c, d) {
                "cors" === b ? this.getWithCORS({url: a}, {onLoad: d, onFailed: c}) : "jsonp" === b && this.getWithJSONP({url: a}, {onLoad: d, onFailed: c})
            }.bind(this);
            d()
        }, logStartLoading: function (a) {
            window.deployStatus && (deployStatus.files[a] = {start: LOG.getSessionTime()})
        }, logEndLoading: function (a, b) {
            window.deployStatus && (deployStatus.files[a].end = LOG.getSessionTime(), b && (deployStatus.files[a].isFailed = !0))
        }}), b
    }

    var c = function () {
        for (var a = [function () {
            return new XMLHttpRequest
        }, function () {
            return new ActiveXObject("Msxml2.XMLHTTP")
        }, function () {
            return new ActiveXObject("Msxml3.XMLHTTP")
        }, function () {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }], b = !1, c = 0; c < a.length; c++) {
            try {
                return b = a[c], b(), b
            } catch (d) {
                continue
            }
            break
        }
        return b
    }();
    define.bootstrapClass("bootstrap.bootstrap.scriptloader.ScriptLoader", b), define.resource("scriptLoader", define.createBootstrapClassInstance("bootstrap.bootstrap.scriptloader.ScriptLoader").init())
}), resource.getResources(["scriptLoader", "fnvHash"], function (a) {
    function b(a) {
        return a.split(".").pop().split("?")[0]
    }

    function c(a, b, c) {
        if (a.noBlob || i.debug || !n)return!1;
        var d = blobSupportedServers.some(function (b) {
            return 0 === a.url.indexOf(b)
        });
        if (!d)return!1;
        for (var e = 0; e < l.length; e++) {
            var f = l[e];
            if (~a.url.indexOf(f))return!1
        }
        return b || (b = {onLoad: function () {
            console.log("blob resource is loaded without context", a)
        }, onFailed: function () {
            console.log("blob resource failed to load without context", a)
        }}), "js" === c ? m.addRequest(a.url, b.onLoad.bind(b, a, a), b.onFailed.bind(b, a, a)) : m.addRequest(a.url, b.onLoad.bind(b), b.onFailed.bind(b)), !0
    }

    function d(a, b) {
        c(a, b, "js") || h.loadScript(a, b)
    }

    function e(a) {
        if (!f && resource.getResourceValue("topology", function (a) {
            f = a
        }), !f)throw'You are trying to load a class before the topology is defined you need to create a bootstrap class in order to be alive in this phase PATH:"' + a + '"';
        var b;
        "mobile" === a[0] && console.warn('mobile package is deprecated: "' + a.join(".") + '"');
        var c = a.indexOf("skins") > 0, d = a.indexOf("components") > 0;
        return b = "wysiwyg" === a[0] && c && !d ? f.skins : f[a[0]], b || "" === b ? b.url || b : (console.log("Unknown Topology for " + a.join(".")), !1)
    }

    var f, g, h = a.scriptLoader, i = h.mode, j = function () {
        return window.editorModel && "unit_test" === window.editorModel.mode
    };
    if (j()) {
        var k = i.debug || 0 === window.location.host.indexOf("wysiwyg") ? "http://wysiwyg.pita.wixpress.com/" : serviceTopology.staticServerUrl;
        g = k + "wix_blob", blobSupportedServers = i.debug || i.test ? ["http://wysiwyg.pita.wixpress.com"] : [serviceTopology.staticServerUrl]
    } else g = serviceTopology.blobUrl, splitedBlobUrl = g.replace("/wix_blob", ""), blobSupportedServers = i.debug || i.test ? ["http://wysiwyg.pita.wixpress.com"] : [splitedBlobUrl];
    var l = ["ckeditor.js"], m = define.createBootstrapClassInstance("bootstrap.bootstrap.scriptloader.WixBlob").init(g, blobSupportedServers, 4), n = !j() && (window.W && window.W.isExperimentOpen && window.W.isExperimentOpen("UseBlob") || /[&?]UseBlob=true\b/.test(window.location.search)), o = /[&?]jsonpOverride=true\b/.test(window.location.search);
    h.initPlugin("js", function (a) {
        return"js" === b(a.url)
    }, function (a, b) {
        d(a, b)
    }), h.initPlugin("json", function (a) {
        return"json" === b(a.url)
    }, function (a, b) {
        if (b.useJsonp || h.IsIE8Browser || o)h.getWithJSONP(a, b); else {
            var d = c(a, b);
            if (!d) {
                var e = {onLoad: b.onLoad, onFailed: h.getWithJSONP.bind(h, a, b)};
                h.getWithCORS(a, e)
            }
        }
    }), h.initPlugin("css", function (a) {
        return"css" === b(a.url)
    }, function (a, b) {
        function c(c) {
            d.$called || (d.$called = !0, b && b.onLoad && b.onLoad(d, a, c))
        }

        var d = h.createTagWithInfo("link", {type: "text/css", href: a.url, rel: "stylesheet"}, a.url, b);
        d.$called = !1, d.onload = c, d.onerror = function (c) {
            b && b.onFailed && b.onFailed(d, a, c)
        }, document.getElementsByTagName("head")[0].appendChild(d), c({})
    }), h.initPlugin("svgShape", function (a) {
        var b = a.url.replace(/^.*\//, "").split("."), c = function (a, b) {
            return 0 === a.indexOf(b)
        };
        return c(a.url, "svgshape.") && 4 === b.length
    }, function (a, b) {
        var c = a.url.replace(/^.*\//, "").split("."), e = c[2].replace("svg_", "") + "_svgshape." + c[1] + "." + c[3] + ".js", f = function () {
            var a = window.serviceTopology.staticServerUrl;
            return"/" === a[a.length - 1] ? a : a + "/"
        }() + "shapes/", g = {url: f + e + "?t=" + Math.random().toString(), id: a.id};
        d(g, b)
    }), h.initPlugin("class", function (a, b, c) {
        var d = a.url.replace(/^.*\//, "").split("."), f = d.pop();
        return e(d, b) && f.test(/^([A-Z][\w\d_]*)+$/) && d.every(function (a) {
            return a.test(/^[a-z][a-z_\d]+$/)
        }, c)
    }, function (a, b) {
        var c = a.url.replace(/^.*\//, "").split("."), f = e(c);
        c.unshift("javascript"), c.unshift(f);
        var g = {url: c.join("/") + ".js", id: a.id};
        d(g, b)
    }), h.initPlugin("external", function () {
        return!1
    }, function (a, b) {
        a.noBlob = !0, d(a, b)
    })
}), function () {
    function a() {
        r ? d() : c(!0), o("end loading", "failed")
    }

    function b(a) {
        o("end loading"), window.loadedFromStatic = !0, e(), f(document.head, a.headHtml), c(!1), f(document.body, a.bodyHtml), window.onload = h, window.onhashchange = n, j(a.tpaGalleriesData), o("dom ready", null, !!a.tpaGalleriesData)
    }

    function c(a) {
        var b = !1;
        if ((!a || MobileUtils.isMobile() && MobileUtils.isViewportOpen()) && (b = !0), b) {
            var c = document.createElement("div");
            c.setAttribute("id", s + u), c.classList.add("fixed_position_preloader"), document.body.appendChild(c)
        }
    }

    function d() {
        if (MobileUtils.isMobile() && MobileUtils.isViewportOpen()) {
            var a = document.getElementById(u);
            a && (a.style.display = "block")
        }
    }

    function e() {
        MobileUtils.fixViewportScale(), window.addEventListener("orientationchange", MobileUtils.fixViewportScale, !1)
    }

    function f(a, b) {
        var c = document.createElement("div");
        c.innerHTML = b;
        for (var d, e = a.firstChild; c.hasChildNodes();)d = g(c), a.insertBefore(d, e)
    }

    function g(a) {
        var b = a.removeChild(a.firstChild);
        if ("script" !== b.nodeName.toLowerCase())return b;
        for (var c = document.createElement("script"), d = b.attributes, e = 0; e < d.length; e++) {
            var f = d[e];
            c.setAttribute(f.name, f.value)
        }
        return c
    }

    function h() {
        window.onload = null;
        var a = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        a += "px";
        var b = document.getElementById(s + "mobile_bgNode");
        b ? b.style.height = a : (b = document.getElementById(s + "mobileBgNode"), i(b, a))
    }

    function i(a, b) {
        if (a)for (var c = ["bgViewPort", "primary", "secondary"], d = 0; d < c.length; d++) {
            var e = a.querySelector("[skinpart='" + c[d] + "']");
            e && (e.style.height = b)
        }
    }

    function j(a) {
        if (a)for (var b in a) {
            var c = document.getElementById(b), d = c.querySelector("iframe"), e = {intent: "addEventListener", eventType: "", params: {}};
            e.params = a[b], e.eventType = "SETTINGS_UPDATED";
            try {
                var f = JSON.stringify(e);
                d.addEventListener("load", function (a) {
                    return function (b) {
                        b.srcElement.contentWindow.postMessage(a, "*")
                    }
                }(f))
            } catch (g) {
                return
            }
        }
    }

    function k(a) {
        for (var b = window.location.search, c = b.split("&"), d = 0; d < c.length; d++) {
            var e = c[d].replace("?", "");
            if (0 === e.indexOf(a))return decodeURIComponent(e.split("=")[1])
        }
        return null
    }

    function l() {
        var a = window.publicModel.pageList.mainPageId, b = m();
        if (b !== a)return null;
        var c, d, e = window.publicModel.pageList.pages;
        for (d = 0; d < e.length; d++)if (e[d].pageId === a) {
            c = e[d].urls[0];
            break
        }
        var f = c.split("/"), g = "";
        for (d = 0; d < f.length - 1; d++)g += f[d] + "/";
        g = g.replace("sites", "rendered-pages");
        var h = f[f.length - 1].split("?")[0].split(".")[0], i = publicModel.pageList.masterPage[0].split("/"), j = i[i.length - 1].split("?")[0];
        return g + h + "-" + j
    }

    function m() {
        var a = window.location.hash;
        if (!a)return window.publicModel.pageList.mainPageId;
        for (var b = [], c = a.split("|"), d = 0; d < c.length; d++)b = b.concat(c[d].split("/"));
        return b[1]
    }

    function n() {
        var a = m();
        if (w !== a) {
            var b = document.getElementById(t + w);
            b && -1 === b.className.indexOf(" hidden") && (b.className += " hidden", w = a)
        }
    }

    function o(a, b, c) {
        deployStatus("loadStaticHtml", {step: a, time: LOG.getSessionTime(), errorDesc: b, hasGalleries: c})
    }

    if (window.publicModel && window.rendererModel && window.MobileUtils) {
        var p = k("showMobileView") || MobileUtils.isMobile();
        if (p) {
            var q = window.publicModel.adaptiveMobileOn, r = window.rendererModel.siteMetaData && window.rendererModel.siteMetaData.preloader && window.rendererModel.siteMetaData.preloader.enabled;
            if (q && (!q || void 0 !== r)) {
                var s = "static_", t = s + "mobile_", u = "viewer_preloader", v = k("staticdocur");
                if (v || (v = l()), !v)return r ? d() : c(!0), void 0;
                var w = m(), x = v && v.indexOf("wysiwyg") >= 0;
                resource.getResourceValue("scriptLoader", function (c) {
                    o("start loading"), x ? c.getWithJSONP({url: v}, {onLoad: b, onFailed: a}) : c.getWithCORS({url: v}, {onLoad: b, onFailed: a})
                }), resource.getResourceValue("W.Utils", function (a) {
                    var b = a.hash, c = setInterval(function () {
                        b = a.hash, b && (window.clearInterval(c), b.addEvent("change", n))
                    }, 50)
                }), resource.getResourceValue("W.Viewer", function (a) {
                    a.addEvent("SiteReady", function () {
                        W.Utils.hash.removeEvent("change", n), window.removeEventListener("orientationchange", MobileUtils.fixViewportScale)
                    })
                })
            }
        }
    }
}(), define.resource("web.experiments.merged", {publishpanelicons: !0, slideshowgallerycentermode: !0, mediazoomkeyboardshortcuts: !0, statichtmlcompurlchange: !0, EditorEasterEggs: !0, blurrypng: !0, YouTubeSubscribeButton: !0, MediaGalleryExperimentsReport: !0, EditorUIRefactorPhase1: !0, EditorUIRefactorLegacyLayer: !0, NaiveGrid: !0, EditorUIRefactorPhase2: !0, BackOfficeText: !0, SpotifyFollow: !0, MatrixGalleryTextAlignment: !0, MatrixGalleryShowMorwButtonEdit: !0, SkypeCallButton: !0, texteffects: !0, snaptoobject: !0, SelectionFix: !0, consoleRecruitment: !0, nbc_WPhotoFullScreenMode: !0, fixsaveerror10104: !0, fixsaveerror10104part2: !0, AddImageComponentBI: !0, DomainSearchBar: !0, ImageNewZoom: !0, FirstSaveNextUrl: !0, AddPageIdToComponents: !0, AnimationPhase1: !0, AnimationEditorPhase1: !0, feedme: !0, ImageButton: !0, AreaTooltip: !0, SingleAudioPlayer: !0, PackagePicker: !0, AddComponentViaMediaGallery: !0, PinItPinWidget: !0, FacebookLikeBox: !0, Anchor: !0, BasicMenu: !0, VerticalMenu: !0, ImageInputNew: !0, NumericStepper: !0, ClipArtAspectRatio: !0, MobileQuickTour: !0, BackToTopButton: !0, "wix-insta-template": !0, SubscribeForm: !0, ResetPasswordFromEmail: !0, AddMediaGalleryBI: !0, TextOnCenterSkin: !0, NewSeparateTextBoxSkin: !0, StylesUR: !0, CanClickUR: !0});
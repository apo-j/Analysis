/**
 * Created by xyj on 05/11/2014.
 */

function Define(a) {
    this._id = Define._id ? ++Define._id : 1, this._definitions = {}, this._addArrayOfDefinitions(a)
}

/***************** Begin logger ***********************/
//
function Logger(a) {
    this.setSettings(a)
}

Logger.prototype = {constructor: Logger, init: function (a) {
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
}}
//
/***************** End logger ***********************/



/******************* Start Define native type prototype method is not available **************************/
//

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
})

!function (a) {
    "function" == typeof define ? define(a) : "function" == typeof YUI ? YUI.add("es5", a) : a()//TODO no yui
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
})
//
/******************* End Define native type prototype method is not available **************************/


/**
 * Created by xyj on 05/11/2014.
 */

var nsUtil = function () {
    "use strict";
    return {
        /*define property b to object a, c is the value of the last level
         * Ex1: a = {name : 'aa'}, b = 'deployment', c = {age:15}, result : a = {name:'aa', deployment:{age:15}}
         * Ex2: a = {name : 'aa'}, b = 'level1.level2.level3', c = {age:15}, result : a = {name:'aa', level1:{level2:{level3:{age:15}}}}
         * */
        setNameSpace: function (a, b, c) {
            var d, e, f = b.split("."), g = f.length - 1;
            for (e = 0; g > e; e++)d = f[e], a[d] = a[d] || {}, a = a[d];
            return a[f[g]] = c, a
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
        }, forEachNode: function (a, b, c) {
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
        }
    }
}();


Function.prototype.extendPrototype = function (a) {
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
}
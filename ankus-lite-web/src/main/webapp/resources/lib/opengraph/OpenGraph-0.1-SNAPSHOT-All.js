/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function (a, b) {
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }

    function cu(a) {
        if (!cj[a]) {
            var b = c.body, d = f("<" + a + ">").appendTo(b), e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                ck || (ck = c.createElement("iframe"), ck.frameBorder = ck.width = ck.height = 0), b.appendChild(ck);
                if (!cl || !ck.createElement)cl = (ck.contentWindow || ck.contentDocument).document, cl.write((f.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), cl.close();
                d = cl.createElement(a), cl.body.appendChild(d), e = f.css(d, "display"), b.removeChild(ck)
            }
            cj[a] = e
        }
        return cj[a]
    }

    function ct(a, b) {
        var c = {};
        f.each(cp.concat.apply([], cp.slice(0, b)), function () {
            c[this] = a
        });
        return c
    }

    function cs() {
        cq = b
    }

    function cr() {
        setTimeout(cs, 0);
        return cq = f.now()
    }

    function ci() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    }

    function ch() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }

    function cb(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1)for (h in a.converters)typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*")k = l; else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break
                            }
                        }
                    }
                }
                !n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }

    function ca(a, c, d) {
        var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
        for (i in g)i in d && (c[g[i]] = d[i]);
        while (f[0] === "*")f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h)for (i in e)if (e[i] && e[i].test(h)) {
            f.unshift(i);
            break
        }
        if (f[0]in d)j = f[0]; else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }

    function b_(a, b, c, d) {
        if (f.isArray(b))f.each(b, function (b, e) {
            c || bD.test(a) ? d(a, e) : b_(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
        }); else if (!c && f.type(b) === "object")for (var e in b)b_(a + "[" + e + "]", b[e], c, d); else d(a, b)
    }

    function b$(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c)c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e)
    }

    function bZ(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f], i = 0, j = h ? h.length : 0, k = a === bS, l;
        for (; i < j && (k || !l); i++)l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bZ(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = bZ(a, c, d, e, "*", g));
        return l
    }

    function bY(a) {
        return function (b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bO), e = 0, g = d.length, h, i, j;
                for (; e < g; e++)h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
            }
        }
    }

    function bB(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = b === "width" ? 1 : 0, g = 4;
        if (d > 0) {
            if (c !== "border")for (; e < g; e += 2)c || (d -= parseFloat(f.css(a, "padding" + bx[e])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + bx[e])) || 0 : d -= parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0;
            return d + "px"
        }
        d = by(a, b);
        if (d < 0 || d == null)d = a.style[b];
        if (bt.test(d))return d;
        d = parseFloat(d) || 0;
        if (c)for (; e < g; e += 2)d += parseFloat(f.css(a, "padding" + bx[e])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + bx[e])) || 0);
        return d + "px"
    }

    function bo(a) {
        var b = c.createElement("div");
        bh.appendChild(b), b.innerHTML = a.outerHTML;
        return b.firstChild
    }

    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
    }

    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio")a.defaultChecked = a.checked
    }

    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }

    function bk(a, b) {
        var c;
        b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? b.outerHTML = a.outerHTML : c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(f.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached"))
    }

    function bj(a, b) {
        if (b.nodeType === 1 && !!f.hasData(a)) {
            var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
            if (i) {
                delete h.handle, h.events = {};
                for (c in i)for (d = 0, e = i[c].length; d < e; d++)f.event.add(b, c, i[c][d])
            }
            h.data && (h.data = f.extend({}, h.data))
        }
    }

    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function U(a) {
        var b = V.split("|"), c = a.createDocumentFragment();
        if (c.createElement)while (b.length)c.createElement(b.pop());
        return c
    }

    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b))return f.grep(a, function (a, d) {
            var e = !!b.call(a, d, a);
            return e === c
        });
        if (b.nodeType)return f.grep(a, function (a, d) {
            return a === b === c
        });
        if (typeof b == "string") {
            var d = f.grep(a, function (a) {
                return a.nodeType === 1
            });
            if (O.test(b))return f.filter(b, d, !c);
            b = f.filter(b, d)
        }
        return f.grep(a, function (a, d) {
            return f.inArray(a, b) >= 0 === c
        })
    }

    function S(a) {
        return!a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function K() {
        return!0
    }

    function J() {
        return!1
    }

    function n(a, b, c) {
        var d = b + "defer", e = b + "queue", g = b + "mark", h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
        }, 0)
    }

    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b]))continue;
            if (b !== "toJSON")return!1
        }
        return!0
    }

    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? +d : j.test(d) ? f.parseJSON(d) : d
                } catch (g) {
                }
                f.data(a, c, d)
            } else d = b
        }
        return d
    }

    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++)b[a[c]] = !0;
        return b
    }

    var c = a.document, d = a.navigator, e = a.location, f = function () {
        function J() {
            if (!e.isReady) {
                try {
                    c.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(J, 1);
                    return
                }
                e.ready()
            }
        }

        var e = function (a, b) {
            return new e.fn.init(a, b, h)
        }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/, m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g, r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/, u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function (a, b) {
            return(b + "").toUpperCase()
        }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty, E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf, I = {};
        e.fn = e.prototype = {constructor: e, init: function (a, d, f) {
            var g, h, j, k;
            if (!a)return this;
            if (a.nodeType) {
                this.context = this[0] = a, this.length = 1;
                return this
            }
            if (a === "body" && !d && c.body) {
                this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
                return this
            }
            if (typeof a == "string") {
                a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                if (g && (g[1] || !d)) {
                    if (g[1]) {
                        d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                        return e.merge(this, a)
                    }
                    h = c.getElementById(g[2]);
                    if (h && h.parentNode) {
                        if (h.id !== g[2])return f.find(a);
                        this.length = 1, this[0] = h
                    }
                    this.context = c, this.selector = a;
                    return this
                }
                return!d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
            }
            if (e.isFunction(a))return f.ready(a);
            a.selector !== b && (this.selector = a.selector, this.context = a.context);
            return e.makeArray(a, this)
        }, selector: "", jquery: "1.7.2", length: 0, size: function () {
            return this.length
        }, toArray: function () {
            return F.call(this, 0)
        }, get: function (a) {
            return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
        }, pushStack: function (a, b, c) {
            var d = this.constructor();
            e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
            return d
        }, each: function (a, b) {
            return e.each(this, a, b)
        }, ready: function (a) {
            e.bindReady(), A.add(a);
            return this
        }, eq: function (a) {
            a = +a;
            return a === -1 ? this.slice(a) : this.slice(a, a + 1)
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, slice: function () {
            return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
        }, map: function (a) {
            return this.pushStack(e.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: E, sort: [].sort, splice: [].splice}, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
            var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
            typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
            for (; j < k; j++)if ((a = arguments[j]) != null)for (c in a) {
                d = i[c], f = a[c];
                if (i === f)continue;
                l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
            }
            return i
        }, e.extend({noConflict: function (b) {
            a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
            return e
        }, isReady: !1, readyWait: 1, holdReady: function (a) {
            a ? e.readyWait++ : e.ready(!0)
        }, ready: function (a) {
            if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                if (!c.body)return setTimeout(e.ready, 1);
                e.isReady = !0;
                if (a !== !0 && --e.readyWait > 0)return;
                A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
            }
        }, bindReady: function () {
            if (!A) {
                A = e.Callbacks("once memory");
                if (c.readyState === "complete")return setTimeout(e.ready, 1);
                if (c.addEventListener)c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1); else if (c.attachEvent) {
                    c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                    var b = !1;
                    try {
                        b = a.frameElement == null
                    } catch (d) {
                    }
                    c.documentElement.doScroll && b && J()
                }
            }
        }, isFunction: function (a) {
            return e.type(a) === "function"
        }, isArray: Array.isArray || function (a) {
            return e.type(a) === "array"
        }, isWindow: function (a) {
            return a != null && a == a.window
        }, isNumeric: function (a) {
            return!isNaN(parseFloat(a)) && isFinite(a)
        }, type: function (a) {
            return a == null ? String(a) : I[C.call(a)] || "object"
        }, isPlainObject: function (a) {
            if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a))return!1;
            try {
                if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf"))return!1
            } catch (c) {
                return!1
            }
            var d;
            for (d in a);
            return d === b || D.call(a, d)
        }, isEmptyObject: function (a) {
            for (var b in a)return!1;
            return!0
        }, error: function (a) {
            throw new Error(a)
        }, parseJSON: function (b) {
            if (typeof b != "string" || !b)return null;
            b = e.trim(b);
            if (a.JSON && a.JSON.parse)return a.JSON.parse(b);
            if (n.test(b.replace(o, "@").replace(p, "]").replace(q, "")))return(new Function("return " + b))();
            e.error("Invalid JSON: " + b)
        }, parseXML: function (c) {
            if (typeof c != "string" || !c)return null;
            var d, f;
            try {
                a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
            } catch (g) {
                d = b
            }
            (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
            return d
        }, noop: function () {
        }, globalEval: function (b) {
            b && j.test(b) && (a.execScript || function (b) {
                a.eval.call(a, b)
            })(b)
        }, camelCase: function (a) {
            return a.replace(w, "ms-").replace(v, x)
        }, nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
        }, each: function (a, c, d) {
            var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
            if (d) {
                if (i) {
                    for (f in a)if (c.apply(a[f], d) === !1)break
                } else for (; g < h;)if (c.apply(a[g++], d) === !1)break
            } else if (i) {
                for (f in a)if (c.call(a[f], f, a[f]) === !1)break
            } else for (; g < h;)if (c.call(a[g], g, a[g++]) === !1)break;
            return a
        }, trim: G ? function (a) {
            return a == null ? "" : G.call(a)
        } : function (a) {
            return a == null ? "" : (a + "").replace(k, "").replace(l, "")
        }, makeArray: function (a, b) {
            var c = b || [];
            if (a != null) {
                var d = e.type(a);
                a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
            }
            return c
        }, inArray: function (a, b, c) {
            var d;
            if (b) {
                if (H)return H.call(b, a, c);
                d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                for (; c < d; c++)if (c in b && b[c] === a)return c
            }
            return-1
        }, merge: function (a, c) {
            var d = a.length, e = 0;
            if (typeof c.length == "number")for (var f = c.length; e < f; e++)a[d++] = c[e]; else while (c[e] !== b)a[d++] = c[e++];
            a.length = d;
            return a
        }, grep: function (a, b, c) {
            var d = [], e;
            c = !!c;
            for (var f = 0, g = a.length; f < g; f++)e = !!b(a[f], f), c !== e && d.push(a[f]);
            return d
        }, map: function (a, c, d) {
            var f, g, h = [], i = 0, j = a.length, k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
            if (k)for (; i < j; i++)f = c(a[i], i, d), f != null && (h[h.length] = f); else for (g in a)f = c(a[g], g, d), f != null && (h[h.length] = f);
            return h.concat.apply([], h)
        }, guid: 1, proxy: function (a, c) {
            if (typeof c == "string") {
                var d = a[c];
                c = a, a = d
            }
            if (!e.isFunction(a))return b;
            var f = F.call(arguments, 2), g = function () {
                return a.apply(c, f.concat(F.call(arguments)))
            };
            g.guid = a.guid = a.guid || g.guid || e.guid++;
            return g
        }, access: function (a, c, d, f, g, h, i) {
            var j, k = d == null, l = 0, m = a.length;
            if (d && typeof d == "object") {
                for (l in d)e.access(a, c, l, d[l], 1, h, f);
                g = 1
            } else if (f !== b) {
                j = i === b && e.isFunction(f), k && (j ? (j = c, c = function (a, b, c) {
                    return j.call(e(a), c)
                }) : (c.call(a, f), c = null));
                if (c)for (; l < m; l++)c(a[l], d, j ? f.call(a[l], l, c(a[l], d)) : f, i);
                g = 1
            }
            return g ? a : k ? c.call(a) : m ? c(a[0], d) : h
        }, now: function () {
            return(new Date).getTime()
        }, uaMatch: function (a) {
            a = a.toLowerCase();
            var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
            return{browser: b[1] || "", version: b[2] || "0"}
        }, sub: function () {
            function a(b, c) {
                return new a.fn.init(b, c)
            }

            e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
                f && f instanceof e && !(f instanceof a) && (f = a(f));
                return e.fn.init.call(this, d, f, b)
            }, a.fn.init.prototype = a.fn;
            var b = a(c);
            return a
        }, browser: {}}), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
            I["[object " + b + "]"] = b.toLowerCase()
        }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
            c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
        } : c.attachEvent && (B = function () {
            c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
        });
        return e
    }(), g = {};
    f.Callbacks = function (a) {
        a = a ? g[a] || h(a) : {};
        var c = [], d = [], e, i, j, k, l, m, n = function (b) {
            var d, e, g, h, i;
            for (d = 0, e = b.length; d < e; d++)g = b[d], h = f.type(g), h === "array" ? n(g) : h === "function" && (!a.unique || !p.has(g)) && c.push(g)
        }, o = function (b, f) {
            f = f || [], e = !a.memory || [b, f], i = !0, j = !0, m = k || 0, k = 0, l = c.length;
            for (; c && m < l; m++)if (c[m].apply(b, f) === !1 && a.stopOnFalse) {
                e = !0;
                break
            }
            j = !1, c && (a.once ? e === !0 ? p.disable() : c = [] : d && d.length && (e = d.shift(), p.fireWith(e[0], e[1])))
        }, p = {add: function () {
            if (c) {
                var a = c.length;
                n(arguments), j ? l = c.length : e && e !== !0 && (k = a, o(e[0], e[1]))
            }
            return this
        }, remove: function () {
            if (c) {
                var b = arguments, d = 0, e = b.length;
                for (; d < e; d++)for (var f = 0; f < c.length; f++)if (b[d] === c[f]) {
                    j && f <= l && (l--, f <= m && m--), c.splice(f--, 1);
                    if (a.unique)break
                }
            }
            return this
        }, has: function (a) {
            if (c) {
                var b = 0, d = c.length;
                for (; b < d; b++)if (a === c[b])return!0
            }
            return!1
        }, empty: function () {
            c = [];
            return this
        }, disable: function () {
            c = d = e = b;
            return this
        }, disabled: function () {
            return!c
        }, lock: function () {
            d = b, (!e || e === !0) && p.disable();
            return this
        }, locked: function () {
            return!d
        }, fireWith: function (b, c) {
            d && (j ? a.once || d.push([b, c]) : (!a.once || !e) && o(b, c));
            return this
        }, fire: function () {
            p.fireWith(this, arguments);
            return this
        }, fired: function () {
            return!!i
        }};
        return p
    };
    var i = [].slice;
    f.extend({Deferred: function (a) {
        var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"), e = "pending", g = {resolve: b, reject: c, notify: d}, h = {done: b.add, fail: c.add, progress: d.add, state: function () {
            return e
        }, isResolved: b.fired, isRejected: c.fired, then: function (a, b, c) {
            i.done(a).fail(b).progress(c);
            return this
        }, always: function () {
            i.done.apply(i, arguments).fail.apply(i, arguments);
            return this
        }, pipe: function (a, b, c) {
            return f.Deferred(function (d) {
                f.each({done: [a, "resolve"], fail: [b, "reject"], progress: [c, "notify"]}, function (a, b) {
                    var c = b[0], e = b[1], g;
                    f.isFunction(c) ? i[a](function () {
                        g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                    }) : i[a](d[e])
                })
            }).promise()
        }, promise: function (a) {
            if (a == null)a = h; else for (var b in h)a[b] = h[b];
            return a
        }}, i = h.promise({}), j;
        for (j in g)i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
        i.done(function () {
            e = "resolved"
        }, c.disable, d.lock).fail(function () {
                e = "rejected"
            }, b.disable, d.lock), a && a.call(i, i);
        return i
    }, when: function (a) {
        function m(a) {
            return function (b) {
                e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
            }
        }

        function l(a) {
            return function (c) {
                b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
            }
        }

        var b = i.call(arguments, 0), c = 0, d = b.length, e = Array(d), g = d, h = d, j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(), k = j.promise();
        if (d > 1) {
            for (; c < d; c++)b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
            g || j.resolveWith(j, b)
        } else j !== a && j.resolveWith(j, d ? [a] : []);
        return k
    }}), f.support = function () {
        var b, d, e, g, h, i, j, k, l, m, n, o, p = c.createElement("div"), q = c.documentElement;
        p.setAttribute("className", "t"), p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = p.getElementsByTagName("*"), e = p.getElementsByTagName("a")[0];
        if (!d || !d.length || !e)return{};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = p.getElementsByTagName("input")[0], b = {leadingWhitespace: p.firstChild.nodeType === 3, tbody: !p.getElementsByTagName("tbody").length, htmlSerialize: !!p.getElementsByTagName("link").length, style: /top/.test(e.getAttribute("style")), hrefNormalized: e.getAttribute("href") === "/a", opacity: /^0.55/.test(e.style.opacity), cssFloat: !!e.style.cssFloat, checkOn: i.value === "on", optSelected: h.selected, getSetAttribute: p.className !== "t", enctype: !!c.createElement("form").enctype, html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>", submitBubbles: !0, changeBubbles: !0, focusinBubbles: !1, deleteExpando: !0, noCloneEvent: !0, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1, reliableMarginRight: !0, pixelMargin: !0}, f.boxModel = b.boxModel = c.compatMode === "CSS1Compat", i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete p.test
        } catch (r) {
            b.deleteExpando = !1
        }
        !p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function () {
            b.noCloneEvent = !1
        }), p.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), p.appendChild(i), j = c.createDocumentFragment(), j.appendChild(p.lastChild), b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, j.removeChild(i), j.appendChild(p);
        if (p.attachEvent)for (n in{submit: 1, change: 1, focusin: 1})m = "on" + n, o = m in p, o || (p.setAttribute(m, "return;"), o = typeof p[m] == "function"), b[n + "Bubbles"] = o;
        j.removeChild(p), j = g = h = p = i = null, f(function () {
            var d, e, g, h, i, j, l, m, n, q, r, s, t, u = c.getElementsByTagName("body")[0];
            !u || (m = 1, t = "padding:0;margin:0;border:", r = "position:absolute;top:0;left:0;width:1px;height:1px;", s = t + "0;visibility:hidden;", n = "style='" + r + t + "5px solid #000;", q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div>" + "<table " + n + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", d = c.createElement("div"), d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px", u.insertBefore(d, u.firstChild), p = c.createElement("div"), d.appendChild(p), p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>", k = p.getElementsByTagName("td"), o = k[0].offsetHeight === 0, k[0].style.display = "", k[1].style.display = "none", b.reliableHiddenOffsets = o && k[0].offsetHeight === 0, a.getComputedStyle && (p.innerHTML = "", l = c.createElement("div"), l.style.width = "0", l.style.marginRight = "0", p.style.width = "2px", p.appendChild(l), b.reliableMarginRight = (parseInt((a.getComputedStyle(l, null) || {marginRight: 0}).marginRight, 10) || 0) === 0), typeof p.style.zoom != "undefined" && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, b.inlineBlockNeedsLayout = p.offsetWidth === 3, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", b.shrinkWrapBlocks = p.offsetWidth !== 3), p.style.cssText = r + s, p.innerHTML = q, e = p.firstChild, g = e.firstChild, i = e.nextSibling.firstChild.firstChild, j = {doesNotAddBorder: g.offsetTop !== 5, doesAddBorderForTableAndCells: i.offsetTop === 5}, g.style.position = "fixed", g.style.top = "20px", j.fixedPosition = g.offsetTop === 20 || g.offsetTop === 15, g.style.position = g.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", j.subtractsBorderForOverflowNotVisible = g.offsetTop === -5, j.doesNotIncludeMarginInBodyOffset = u.offsetTop !== m, a.getComputedStyle && (p.style.marginTop = "1%", b.pixelMargin = (a.getComputedStyle(p, null) || {marginTop: 0}).marginTop !== "1%"), typeof d.style.zoom != "undefined" && (d.style.zoom = 1), u.removeChild(d), l = p = d = null, f.extend(b, j))
        });
        return b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/, k = /([A-Z])/g;
    f.extend({cache: {}, uuid: 0, expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""), noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0}, hasData: function (a) {
        a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
        return!!a && !m(a)
    }, data: function (a, c, d, e) {
        if (!!f.acceptData(a)) {
            var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a, n = l ? a[j] : a[j] && j, o = c === "events";
            if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b)return;
            n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
            if (typeof c == "object" || typeof c == "function")e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
            g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
            if (o && !h[c])return g.events;
            k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
            return i
        }
    }, removeData: function (a, b, c) {
        if (!!f.acceptData(a)) {
            var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
            if (!j[k])return;
            if (b) {
                d = c ? j[k] : j[k].data;
                if (d) {
                    f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                    for (e = 0, g = b.length; e < g; e++)delete d[b[e]];
                    if (!(c ? m : f.isEmptyObject)(d))return
                }
            }
            if (!c) {
                delete j[k].data;
                if (!m(j[k]))return
            }
            f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
        }
    }, _data: function (a, b, c) {
        return f.data(a, b, c, !0)
    }, acceptData: function (a) {
        if (a.nodeName) {
            var b = f.noData[a.nodeName.toLowerCase()];
            if (b)return b !== !0 && a.getAttribute("classid") === b
        }
        return!0
    }}), f.fn.extend({data: function (a, c) {
        var d, e, g, h, i, j = this[0], k = 0, m = null;
        if (a === b) {
            if (this.length) {
                m = f.data(j);
                if (j.nodeType === 1 && !f._data(j, "parsedAttrs")) {
                    g = j.attributes;
                    for (i = g.length; k < i; k++)h = g[k].name, h.indexOf("data-") === 0 && (h = f.camelCase(h.substring(5)), l(j, h, m[h]));
                    f._data(j, "parsedAttrs", !0)
                }
            }
            return m
        }
        if (typeof a == "object")return this.each(function () {
            f.data(this, a)
        });
        d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!";
        return f.access(this, function (c) {
            if (c === b) {
                m = this.triggerHandler("getData" + e, [d[0]]), m === b && j && (m = f.data(j, a), m = l(j, a, m));
                return m === b && d[1] ? this.data(d[0]) : m
            }
            d[1] = c, this.each(function () {
                var b = f(this);
                b.triggerHandler("setData" + e, d), f.data(this, a, c), b.triggerHandler("changeData" + e, d)
            })
        }, null, c, arguments.length > 1, null, !1)
    }, removeData: function (a) {
        return this.each(function () {
            f.removeData(this, a)
        })
    }}), f.extend({_mark: function (a, b) {
        a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
    }, _unmark: function (a, b, c) {
        a !== !0 && (c = b, b = a, a = !1);
        if (b) {
            c = c || "fx";
            var d = c + "mark", e = a ? 0 : (f._data(b, d) || 1) - 1;
            e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
        }
    }, queue: function (a, b, c) {
        var d;
        if (a) {
            b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
            return d || []
        }
    }, dequeue: function (a, b) {
        b = b || "fx";
        var c = f.queue(a, b), d = c.shift(), e = {};
        d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
            f.dequeue(a, b)
        }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
    }}), f.fn.extend({queue: function (a, c) {
        var d = 2;
        typeof a != "string" && (c = a, a = "fx", d--);
        if (arguments.length < d)return f.queue(this[0], a);
        return c === b ? this : this.each(function () {
            var b = f.queue(this, a, c);
            a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
        })
    }, dequeue: function (a) {
        return this.each(function () {
            f.dequeue(this, a)
        })
    }, delay: function (a, b) {
        a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
        return this.queue(b, function (b, c) {
            var d = setTimeout(b, a);
            c.stop = function () {
                clearTimeout(d)
            }
        })
    }, clearQueue: function (a) {
        return this.queue(a || "fx", [])
    }, promise: function (a, c) {
        function m() {
            --h || d.resolveWith(e, [e])
        }

        typeof a != "string" && (c = a, a = b), a = a || "fx";
        var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
        while (g--)if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0))h++, l.add(m);
        m();
        return d.promise(c)
    }});
    var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i, s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i, u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, v = f.support.getSetAttribute, w, x, y;
    f.fn.extend({attr: function (a, b) {
        return f.access(this, f.attr, a, b, arguments.length > 1)
    }, removeAttr: function (a) {
        return this.each(function () {
            f.removeAttr(this, a)
        })
    }, prop: function (a, b) {
        return f.access(this, f.prop, a, b, arguments.length > 1)
    }, removeProp: function (a) {
        a = f.propFix[a] || a;
        return this.each(function () {
            try {
                this[a] = b, delete this[a]
            } catch (c) {
            }
        })
    }, addClass: function (a) {
        var b, c, d, e, g, h, i;
        if (f.isFunction(a))return this.each(function (b) {
            f(this).addClass(a.call(this, b, this.className))
        });
        if (a && typeof a == "string") {
            b = a.split(p);
            for (c = 0, d = this.length; c < d; c++) {
                e = this[c];
                if (e.nodeType === 1)if (!e.className && b.length === 1)e.className = a; else {
                    g = " " + e.className + " ";
                    for (h = 0, i = b.length; h < i; h++)~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                    e.className = f.trim(g)
                }
            }
        }
        return this
    }, removeClass: function (a) {
        var c, d, e, g, h, i, j;
        if (f.isFunction(a))return this.each(function (b) {
            f(this).removeClass(a.call(this, b, this.className))
        });
        if (a && typeof a == "string" || a === b) {
            c = (a || "").split(p);
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                if (g.nodeType === 1 && g.className)if (a) {
                    h = (" " + g.className + " ").replace(o, " ");
                    for (i = 0, j = c.length; i < j; i++)h = h.replace(" " + c[i] + " ", " ");
                    g.className = f.trim(h)
                } else g.className = ""
            }
        }
        return this
    }, toggleClass: function (a, b) {
        var c = typeof a, d = typeof b == "boolean";
        if (f.isFunction(a))return this.each(function (c) {
            f(this).toggleClass(a.call(this, c, this.className, b), b)
        });
        return this.each(function () {
            if (c === "string") {
                var e, g = 0, h = f(this), i = b, j = a.split(p);
                while (e = j[g++])i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
            } else if (c === "undefined" || c === "boolean")this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
        })
    }, hasClass: function (a) {
        var b = " " + a + " ", c = 0, d = this.length;
        for (; c < d; c++)if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1)return!0;
        return!1
    }, val: function (a) {
        var c, d, e, g = this[0];
        {
            if (!!arguments.length) {
                e = f.isFunction(a);
                return this.each(function (d) {
                    var g = f(this), h;
                    if (this.nodeType === 1) {
                        e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                            return a == null ? "" : a + ""
                        })), c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];
                        if (!c || !("set"in c) || c.set(this, h, "value") === b)this.value = h
                    }
                })
            }
            if (g) {
                c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()];
                if (c && "get"in c && (d = c.get(g, "value")) !== b)return d;
                d = g.value;
                return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
            }
        }
    }}), f.extend({valHooks: {option: {get: function (a) {
        var b = a.attributes.value;
        return!b || b.specified ? a.value : a.text
    }}, select: {get: function (a) {
        var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
        if (g < 0)return null;
        c = j ? g : 0, d = j ? g + 1 : i.length;
        for (; c < d; c++) {
            e = i[c];
            if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                b = f(e).val();
                if (j)return b;
                h.push(b)
            }
        }
        if (j && !h.length && i.length)return f(i[g]).val();
        return h
    }, set: function (a, b) {
        var c = f.makeArray(b);
        f(a).find("option").each(function () {
            this.selected = f.inArray(f(this).val(), c) >= 0
        }), c.length || (a.selectedIndex = -1);
        return c
    }}}, attrFn: {val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0}, attr: function (a, c, d, e) {
        var g, h, i, j = a.nodeType;
        if (!!a && j !== 3 && j !== 8 && j !== 2) {
            if (e && c in f.attrFn)return f(a)[c](d);
            if (typeof a.getAttribute == "undefined")return f.prop(a, c, d);
            i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
            if (d !== b) {
                if (d === null) {
                    f.removeAttr(a, c);
                    return
                }
                if (h && "set"in h && i && (g = h.set(a, d, c)) !== b)return g;
                a.setAttribute(c, "" + d);
                return d
            }
            if (h && "get"in h && i && (g = h.get(a, c)) !== null)return g;
            g = a.getAttribute(c);
            return g === null ? b : g
        }
    }, removeAttr: function (a, b) {
        var c, d, e, g, h, i = 0;
        if (b && a.nodeType === 1) {
            d = b.toLowerCase().split(p), g = d.length;
            for (; i < g; i++)e = d[i], e && (c = f.propFix[e] || e, h = u.test(e), h || f.attr(a, e, ""), a.removeAttribute(v ? e : c), h && c in a && (a[c] = !1))
        }
    }, attrHooks: {type: {set: function (a, b) {
        if (r.test(a.nodeName) && a.parentNode)f.error("type property can't be changed"); else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
            var c = a.value;
            a.setAttribute("type", b), c && (a.value = c);
            return b
        }
    }}, value: {get: function (a, b) {
        if (w && f.nodeName(a, "button"))return w.get(a, b);
        return b in a ? a.value : null
    }, set: function (a, b, c) {
        if (w && f.nodeName(a, "button"))return w.set(a, b, c);
        a.value = b
    }}}, propFix: {tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable"}, prop: function (a, c, d) {
        var e, g, h, i = a.nodeType;
        if (!!a && i !== 3 && i !== 8 && i !== 2) {
            h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
            return d !== b ? g && "set"in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get"in g && (e = g.get(a, c)) !== null ? e : a[c]
        }
    }, propHooks: {tabIndex: {get: function (a) {
        var c = a.getAttributeNode("tabindex");
        return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
    }}}}), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {get: function (a, c) {
        var d, e = f.prop(a, c);
        return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
    }, set: function (a, b, c) {
        var d;
        b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
        return c
    }}, v || (y = {name: !0, id: !0, coords: !0}, w = f.valHooks.button = {get: function (a, c) {
        var d;
        d = a.getAttributeNode(c);
        return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
    }, set: function (a, b, d) {
        var e = a.getAttributeNode(d);
        e || (e = c.createAttribute(d), a.setAttributeNode(e));
        return e.nodeValue = b + ""
    }}, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {set: function (a, c) {
            if (c === "") {
                a.setAttribute(b, "auto");
                return c
            }
        }})
    }), f.attrHooks.contenteditable = {get: w.get, set: function (a, b, c) {
        b === "" && (b = "false"), w.set(a, b, c)
    }}), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {get: function (a) {
            var d = a.getAttribute(c, 2);
            return d === null ? b : d
        }})
    }), f.support.style || (f.attrHooks.style = {get: function (a) {
        return a.style.cssText.toLowerCase() || b
    }, set: function (a, b) {
        return a.style.cssText = "" + b
    }}), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {get: function (a) {
        var b = a.parentNode;
        b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
        return null
    }})), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = {get: function (a) {
            return a.getAttribute("value") === null ? "on" : a.value
        }}
    }), f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = f.extend(f.valHooks[this], {set: function (a, b) {
            if (f.isArray(b))return a.checked = f.inArray(f(a).val(), b) >= 0
        }})
    });
    var z = /^(?:textarea|input|select)$/i, A = /^([^\.]*)?(?:\.(.+))?$/, B = /(?:^|\s)hover(\.\S+)?\b/, C = /^key/, D = /^(?:mouse|contextmenu)|click/, E = /^(?:focusinfocus|focusoutblur)$/, F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, G = function (a) {
        var b = F.exec(a);
        b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
        return b
    }, H = function (a, b) {
        var c = a.attributes || {};
        return(!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
    }, I = function (a) {
        return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
    };
    f.event = {add: function (a, c, d, e, g) {
        var h, i, j, k, l, m, n, o, p, q, r, s;
        if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
            d.handler && (p = d, d = p.handler, g = p.selector), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
                return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
            }, i.elem = a), c = f.trim(I(c)).split(" ");
            for (k = 0; k < c.length; k++) {
                l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({type: m, origType: l[1], data: e, handler: d, guid: d.guid, selector: g, quick: g && G(g), namespace: n.join(".")}, p), r = j[m];
                if (!r) {
                    r = j[m] = [], r.delegateCount = 0;
                    if (!s.setup || s.setup.call(a, e, n, i) === !1)a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                }
                s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
            }
            a = null
        }
    }, global: {}, remove: function (a, b, c, d, e) {
        var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
        if (!!g && !!(o = g.events)) {
            b = f.trim(I(b || "")).split(" ");
            for (h = 0; h < b.length; h++) {
                i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                if (!j) {
                    for (j in o)f.event.remove(a, j + b[h], c, d, !0);
                    continue
                }
                p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                for (n = 0; n < r.length; n++)s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
            }
            f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
        }
    }, customEvent: {getData: !0, setData: !0, changeData: !0}, trigger: function (c, d, e, g) {
        if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
            var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
            if (E.test(h + f.event.triggered))return;
            h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
            if ((!e || f.event.customEvent[h]) && !f.event.global[h])return;
            c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
            if (!e) {
                j = f.cache;
                for (l in j)j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                return
            }
            c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
            if (p.trigger && p.trigger.apply(e, d) === !1)return;
            r = [
                [e, p.bindType || h]
            ];
            if (!g && !p.noBubble && !f.isWindow(e)) {
                s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                for (; m; m = m.parentNode)r.push([m, s]), n = m;
                n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
            }
            for (l = 0; l < r.length && !c.isPropagationStopped(); l++)m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
            c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
            return c.result
        }
    }, dispatch: function (c) {
        c = f.event.fix(c || a.event);
        var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0), h = !c.exclusive && !c.namespace, i = f.event.special[c.type] || {}, j = [], k, l, m, n, o, p, q, r, s, t, u;
        g[0] = c, c.delegateTarget = this;
        if (!i.preDispatch || i.preDispatch.call(this, c) !== !1) {
            if (e && (!c.button || c.type !== "click")) {
                n = f(this), n.context = this.ownerDocument || this;
                for (m = c.target; m != this; m = m.parentNode || this)if (m.disabled !== !0) {
                    p = {}, r = [], n[0] = m;
                    for (k = 0; k < e; k++)s = d[k], t = s.selector, p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)), p[t] && r.push(s);
                    r.length && j.push({elem: m, matches: r})
                }
            }
            d.length > e && j.push({elem: this, matches: d.slice(e)});
            for (k = 0; k < j.length && !c.isPropagationStopped(); k++) {
                q = j[k], c.currentTarget = q.elem;
                for (l = 0; l < q.matches.length && !c.isImmediatePropagationStopped(); l++) {
                    s = q.matches[l];
                    if (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace))c.data = s.data, c.handleObj = s, o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem, g), o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation()))
                }
            }
            i.postDispatch && i.postDispatch.call(this, c);
            return c.result
        }
    }, props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: {props: "char charCode key keyCode".split(" "), filter: function (a, b) {
        a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
        return a
    }}, mouseHooks: {props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (a, d) {
        var e, f, g, h = d.button, i = d.fromElement;
        a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
        return a
    }}, fix: function (a) {
        if (a[f.expando])return a;
        var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
        a = f.Event(g);
        for (d = i.length; d;)e = i[--d], a[e] = g[e];
        a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
        return h.filter ? h.filter(a, g) : a
    }, special: {ready: {setup: f.bindReady}, load: {noBubble: !0}, focus: {delegateType: "focusin"}, blur: {delegateType: "focusout"}, beforeunload: {setup: function (a, b, c) {
        f.isWindow(this) && (this.onbeforeunload = c)
    }, teardown: function (a, b) {
        this.onbeforeunload === b && (this.onbeforeunload = null)
    }}}, simulate: function (a, b, c, d) {
        var e = f.extend(new f.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
        d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
    }}, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, f.Event = function (a, b) {
        if (!(this instanceof f.Event))return new f.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
    }, f.Event.prototype = {preventDefault: function () {
        this.isDefaultPrevented = K;
        var a = this.originalEvent;
        !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
    }, stopPropagation: function () {
        this.isPropagationStopped = K;
        var a = this.originalEvent;
        !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
    }, stopImmediatePropagation: function () {
        this.isImmediatePropagationStopped = K, this.stopPropagation()
    }, isDefaultPrevented: J, isPropagationStopped: J, isImmediatePropagationStopped: J}, f.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
        f.event.special[a] = {delegateType: b, bindType: b, handle: function (a) {
            var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
            if (!d || d !== c && !f.contains(c, d))a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
            return h
        }}
    }), f.support.submitBubbles || (f.event.special.submit = {setup: function () {
        if (f.nodeName(this, "form"))return!1;
        f.event.add(this, "click._submit keypress._submit", function (a) {
            var c = a.target, d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
            d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                a._submit_bubble = !0
            }), d._submit_attached = !0)
        })
    }, postDispatch: function (a) {
        a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0))
    }, teardown: function () {
        if (f.nodeName(this, "form"))return!1;
        f.event.remove(this, "._submit")
    }}), f.support.changeBubbles || (f.event.special.change = {setup: function () {
        if (z.test(this.nodeName)) {
            if (this.type === "checkbox" || this.type === "radio")f.event.add(this, "propertychange._change", function (a) {
                a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
            }), f.event.add(this, "click._change", function (a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
            });
            return!1
        }
        f.event.add(this, "beforeactivate._change", function (a) {
            var b = a.target;
            z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
            }), b._change_attached = !0)
        })
    }, handle: function (a) {
        var b = a.target;
        if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox")return a.handleObj.handler.apply(this, arguments)
    }, teardown: function () {
        f.event.remove(this, "._change");
        return z.test(this.nodeName)
    }}), f.support.focusinBubbles || f.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var d = 0, e = function (a) {
            f.event.simulate(b, a.target, f.event.fix(a), !0)
        };
        f.event.special[b] = {setup: function () {
            d++ === 0 && c.addEventListener(a, e, !0)
        }, teardown: function () {
            --d === 0 && c.removeEventListener(a, e, !0)
        }}
    }), f.fn.extend({on: function (a, c, d, e, g) {
        var h, i;
        if (typeof a == "object") {
            typeof c != "string" && (d = d || c, c = b);
            for (i in a)this.on(i, c, d, a[i], g);
            return this
        }
        d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
        if (e === !1)e = J; else if (!e)return this;
        g === 1 && (h = e, e = function (a) {
            f().off(a);
            return h.apply(this, arguments)
        }, e.guid = h.guid || (h.guid = f.guid++));
        return this.each(function () {
            f.event.add(this, a, e, d, c)
        })
    }, one: function (a, b, c, d) {
        return this.on(a, b, c, d, 1)
    }, off: function (a, c, d) {
        if (a && a.preventDefault && a.handleObj) {
            var e = a.handleObj;
            f(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler);
            return this
        }
        if (typeof a == "object") {
            for (var g in a)this.off(g, c, a[g]);
            return this
        }
        if (c === !1 || typeof c == "function")d = c, c = b;
        d === !1 && (d = J);
        return this.each(function () {
            f.event.remove(this, a, d, c)
        })
    }, bind: function (a, b, c) {
        return this.on(a, null, b, c)
    }, unbind: function (a, b) {
        return this.off(a, null, b)
    }, live: function (a, b, c) {
        f(this.context).on(a, this.selector, b, c);
        return this
    }, die: function (a, b) {
        f(this.context).off(a, this.selector || "**", b);
        return this
    }, delegate: function (a, b, c, d) {
        return this.on(b, a, c, d)
    }, undelegate: function (a, b, c) {
        return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
    }, trigger: function (a, b) {
        return this.each(function () {
            f.event.trigger(a, b, this)
        })
    }, triggerHandler: function (a, b) {
        if (this[0])return f.event.trigger(a, b, this[0], !0)
    }, toggle: function (a) {
        var b = arguments, c = a.guid || f.guid++, d = 0, e = function (c) {
            var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
            f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
            return b[e].apply(this, arguments) || !1
        };
        e.guid = c;
        while (d < b.length)b[d++].guid = c;
        return this.click(e)
    }, hover: function (a, b) {
        return this.mouseenter(a).mouseleave(b || a)
    }}), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        f.fn[b] = function (a, c) {
            c == null && (c = a, a = null);
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
    }), function () {
        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else if (m.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, d = "sizcache" + (Math.random() + "").replace(".", ""), e = 0, g = Object.prototype.toString, h = !1, i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
        [0, 0].sort(function () {
            i = !1;
            return 0
        });
        var m = function (b, d, e, f) {
            e = e || [], d = d || c;
            var h = d;
            if (d.nodeType !== 1 && d.nodeType !== 9)return[];
            if (!b || typeof b != "string")return e;
            var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
            do {
                a.exec(""), i = a.exec(x);
                if (i) {
                    x = i[3], w.push(i[1]);
                    if (i[2]) {
                        l = i[3];
                        break
                    }
                }
            } while (i);
            if (w.length > 1 && p.exec(b))if (w.length === 2 && o.relative[w[0]])j = y(w[0] + w[1], d, f); else {
                j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                while (w.length)b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
            } else {
                !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                if (d) {
                    n = f ? {expr: w.pop(), set: s(f)} : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                    while (w.length)q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
                } else k = w = []
            }
            k || (k = j), k || m.error(q || b);
            if (g.call(k) === "[object Array]")if (!u)e.push.apply(e, k); else if (d && d.nodeType === 1)for (t = 0; k[t] != null; t++)k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]); else for (t = 0; k[t] != null; t++)k[t] && k[t].nodeType === 1 && e.push(j[t]); else s(k, e);
            l && (m(l, h, e, f), m.uniqueSort(e));
            return e
        };
        m.uniqueSort = function (a) {
            if (u) {
                h = i, a.sort(u);
                if (h)for (var b = 1; b < a.length; b++)a[b] === a[b - 1] && a.splice(b--, 1)
            }
            return a
        }, m.matches = function (a, b) {
            return m(a, null, null, b)
        }, m.matchesSelector = function (a, b) {
            return m(b, null, null, [a]).length > 0
        }, m.find = function (a, b, c) {
            var d, e, f, g, h, i;
            if (!a)return[];
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break
                        }
                    }
                }
            }
            d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
            return{set: d, expr: a}
        }, m.filter = function (a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter)if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                    k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                    if (l.substr(l.length - 1) === "\\")continue;
                    s === r && (r = []);
                    if (o.preFilter[h]) {
                        f = o.preFilter[h](f, s, d, r, e, t);
                        if (!f)g = i = !0; else if (f === !0)continue
                    }
                    if (f)for (n = 0; (j = s[n]) != null; n++)j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                    if (i !== b) {
                        d || (s = r), a = a.replace(o.match[h], "");
                        if (!g)return[];
                        break
                    }
                }
                if (a === q)if (g == null)m.error(a); else break;
                q = a
            }
            return s
        }, m.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        };
        var n = m.getText = function (a) {
            var b, c, d = a.nodeType, e = "";
            if (d) {
                if (d === 1 || d === 9 || d === 11) {
                    if (typeof a.textContent == "string")return a.textContent;
                    if (typeof a.innerText == "string")return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling)e += n(a)
                } else if (d === 3 || d === 4)return a.nodeValue
            } else for (b = 0; c = a[b]; b++)c.nodeType !== 8 && (e += n(c));
            return e
        }, o = m.selectors = {order: ["ID", "NAME", "TAG"], match: {ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/, ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/, TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/, CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/, POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/, PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/}, leftMatch: {}, attrMap: {"class": "className", "for": "htmlFor"}, attrHandle: {href: function (a) {
            return a.getAttribute("href")
        }, type: function (a) {
            return a.getAttribute("type")
        }}, relative: {"+": function (a, b) {
            var c = typeof b == "string", d = c && !l.test(b), e = c && !d;
            d && (b = b.toLowerCase());
            for (var f = 0, g = a.length, h; f < g; f++)if (h = a[f]) {
                while ((h = h.previousSibling) && h.nodeType !== 1);
                a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
            }
            e && m.filter(b, a, !0)
        }, ">": function (a, b) {
            var c, d = typeof b == "string", e = 0, f = a.length;
            if (d && !l.test(b)) {
                b = b.toLowerCase();
                for (; e < f; e++) {
                    c = a[e];
                    if (c) {
                        var g = c.parentNode;
                        a[e] = g.nodeName.toLowerCase() === b ? g : !1
                    }
                }
            } else {
                for (; e < f; e++)c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                d && m.filter(b, a, !0)
            }
        }, "": function (a, b, c) {
            var d, f = e++, g = x;
            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
        }, "~": function (a, b, c) {
            var d, f = e++, g = x;
            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
        }}, find: {ID: function (a, b, c) {
            if (typeof b.getElementById != "undefined" && !c) {
                var d = b.getElementById(a[1]);
                return d && d.parentNode ? [d] : []
            }
        }, NAME: function (a, b) {
            if (typeof b.getElementsByName != "undefined") {
                var c = [], d = b.getElementsByName(a[1]);
                for (var e = 0, f = d.length; e < f; e++)d[e].getAttribute("name") === a[1] && c.push(d[e]);
                return c.length === 0 ? null : c
            }
        }, TAG: function (a, b) {
            if (typeof b.getElementsByTagName != "undefined")return b.getElementsByTagName(a[1])
        }}, preFilter: {CLASS: function (a, b, c, d, e, f) {
            a = " " + a[1].replace(j, "") + " ";
            if (f)return a;
            for (var g = 0, h; (h = b[g]) != null; g++)h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
            return!1
        }, ID: function (a) {
            return a[1].replace(j, "")
        }, TAG: function (a, b) {
            return a[1].replace(j, "").toLowerCase()
        }, CHILD: function (a) {
            if (a[1] === "nth") {
                a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
            } else a[2] && m.error(a[0]);
            a[0] = e++;
            return a
        }, ATTR: function (a, b, c, d, e, f) {
            var g = a[1] = a[1].replace(j, "");
            !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
            return a
        }, PSEUDO: function (b, c, d, e, f) {
            if (b[1] === "not")if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3]))b[3] = m(b[3], null, null, c); else {
                var g = m.filter(b[3], c, d, !0 ^ f);
                d || e.push.apply(e, g);
                return!1
            } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0]))return!0;
            return b
        }, POS: function (a) {
            a.unshift(!0);
            return a
        }}, filters: {enabled: function (a) {
            return a.disabled === !1 && a.type !== "hidden"
        }, disabled: function (a) {
            return a.disabled === !0
        }, checked: function (a) {
            return a.checked === !0
        }, selected: function (a) {
            a.parentNode && a.parentNode.selectedIndex;
            return a.selected === !0
        }, parent: function (a) {
            return!!a.firstChild
        }, empty: function (a) {
            return!a.firstChild
        }, has: function (a, b, c) {
            return!!m(c[3], a).length
        }, header: function (a) {
            return/h\d/i.test(a.nodeName)
        }, text: function (a) {
            var b = a.getAttribute("type"), c = a.type;
            return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
        }, radio: function (a) {
            return a.nodeName.toLowerCase() === "input" && "radio" === a.type
        }, checkbox: function (a) {
            return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
        }, file: function (a) {
            return a.nodeName.toLowerCase() === "input" && "file" === a.type
        }, password: function (a) {
            return a.nodeName.toLowerCase() === "input" && "password" === a.type
        }, submit: function (a) {
            var b = a.nodeName.toLowerCase();
            return(b === "input" || b === "button") && "submit" === a.type
        }, image: function (a) {
            return a.nodeName.toLowerCase() === "input" && "image" === a.type
        }, reset: function (a) {
            var b = a.nodeName.toLowerCase();
            return(b === "input" || b === "button") && "reset" === a.type
        }, button: function (a) {
            var b = a.nodeName.toLowerCase();
            return b === "input" && "button" === a.type || b === "button"
        }, input: function (a) {
            return/input|select|textarea|button/i.test(a.nodeName)
        }, focus: function (a) {
            return a === a.ownerDocument.activeElement
        }}, setFilters: {first: function (a, b) {
            return b === 0
        }, last: function (a, b, c, d) {
            return b === d.length - 1
        }, even: function (a, b) {
            return b % 2 === 0
        }, odd: function (a, b) {
            return b % 2 === 1
        }, lt: function (a, b, c) {
            return b < c[3] - 0
        }, gt: function (a, b, c) {
            return b > c[3] - 0
        }, nth: function (a, b, c) {
            return c[3] - 0 === b
        }, eq: function (a, b, c) {
            return c[3] - 0 === b
        }}, filter: {PSEUDO: function (a, b, c, d) {
            var e = b[1], f = o.filters[e];
            if (f)return f(a, c, b, d);
            if (e === "contains")return(a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
            if (e === "not") {
                var g = b[3];
                for (var h = 0, i = g.length; h < i; h++)if (g[h] === a)return!1;
                return!0
            }
            m.error(e)
        }, CHILD: function (a, b) {
            var c, e, f, g, h, i, j, k = b[1], l = a;
            switch (k) {
                case"only":
                case"first":
                    while (l = l.previousSibling)if (l.nodeType === 1)return!1;
                    if (k === "first")return!0;
                    l = a;
                case"last":
                    while (l = l.nextSibling)if (l.nodeType === 1)return!1;
                    return!0;
                case"nth":
                    c = b[2], e = b[3];
                    if (c === 1 && e === 0)return!0;
                    f = b[0], g = a.parentNode;
                    if (g && (g[d] !== f || !a.nodeIndex)) {
                        i = 0;
                        for (l = g.firstChild; l; l = l.nextSibling)l.nodeType === 1 && (l.nodeIndex = ++i);
                        g[d] = f
                    }
                    j = a.nodeIndex - e;
                    return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
            }
        }, ID: function (a, b) {
            return a.nodeType === 1 && a.getAttribute("id") === b
        }, TAG: function (a, b) {
            return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
        }, CLASS: function (a, b) {
            return(" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
        }, ATTR: function (a, b) {
            var c = b[1], d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c), e = d + "", f = b[2], g = b[4];
            return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
        }, POS: function (a, b, c, d) {
            var e = b[2], f = o.setFilters[e];
            if (f)return f(a, c, b, d)
        }}}, p = o.match.POS, q = function (a, b) {
            return"\\" + (b - 0 + 1)
        };
        for (var r in o.match)o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        o.match.globalPOS = p;
        var s = function (a, b) {
            a = Array.prototype.slice.call(a, 0);
            if (b) {
                b.push.apply(b, a);
                return b
            }
            return a
        };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
        } catch (t) {
            s = function (a, b) {
                var c = 0, d = b || [];
                if (g.call(a) === "[object Array]")Array.prototype.push.apply(d, a); else if (typeof a.length == "number")for (var e = a.length; c < e; c++)d.push(a[c]); else for (; a[c]; c++)d.push(a[c]);
                return d
            }
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (!a.compareDocumentPosition || !b.compareDocumentPosition)return a.compareDocumentPosition ? -1 : 1;
            return a.compareDocumentPosition(b) & 4 ? -1 : 1
        } : (u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (a.sourceIndex && b.sourceIndex)return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
            if (g === i)return v(a, b);
            if (!g)return-1;
            if (!i)return 1;
            while (j)e.unshift(j), j = j.parentNode;
            j = i;
            while (j)f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++)if (e[k] !== f[k])return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
        }, v = function (a, b, c) {
            if (a === b)return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b)return-1;
                d = d.nextSibling
            }
            return 1
        }), function () {
            var a = c.createElement("div"), d = "script" + (new Date).getTime(), e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }, o.filter.ID = function (a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b
            }), e.removeChild(a), e = a = null
        }(), function () {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++)c[e].nodeType === 1 && d.push(c[e]);
                    c = d
                }
                return c
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                return a.getAttribute("href", 2)
            }), a = null
        }(), c.querySelectorAll && function () {
            var a = m, b = c.createElement("div"), d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                m = function (b, e, f, g) {
                    e = e || c;
                    if (!g && !m.isXML(e)) {
                        var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                        if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                            if (h[1])return s(e.getElementsByTagName(b), f);
                            if (h[2] && o.find.CLASS && e.getElementsByClassName)return s(e.getElementsByClassName(h[2]), f)
                        }
                        if (e.nodeType === 9) {
                            if (b === "body" && e.body)return s([e.body], f);
                            if (h && h[3]) {
                                var i = e.getElementById(h[3]);
                                if (!i || !i.parentNode)return s([], f);
                                if (i.id === h[3])return s([i], f)
                            }
                            try {
                                return s(e.querySelectorAll(b), f)
                            } catch (j) {
                            }
                        } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                            var k = e, l = e.getAttribute("id"), n = l || d, p = e.parentNode, q = /^\s*[+~]/.test(b);
                            l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                            try {
                                if (!q || p)return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                            } catch (r) {
                            } finally {
                                l || k.removeAttribute("id")
                            }
                        }
                    }
                    return a(b, e, f, g)
                };
                for (var e in a)m[e] = a[e];
                b = null
            }
        }(), function () {
            var a = c.documentElement, b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div"), e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle")
                } catch (f) {
                    e = !0
                }
                m.matchesSelector = function (a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a))try {
                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                            var f = b.call(a, c);
                            if (f || !d || a.document && a.document.nodeType !== 11)return f
                        }
                    } catch (g) {
                    }
                    return m(c, null, null, [a]).length > 0
                }
            }
        }(), function () {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                a.lastChild.className = "e";
                if (a.getElementsByClassName("e").length === 1)return;
                o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                    if (typeof b.getElementsByClassName != "undefined" && !c)return b.getElementsByClassName(a[1])
                }, a = null
            }
        }(), c.documentElement.contains ? m.contains = function (a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        } : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
            return!!(a.compareDocumentPosition(b) & 16)
        } : m.contains = function () {
            return!1
        }, m.isXML = function (a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        };
        var y = function (a, b, c) {
            var d, e = [], f = "", g = b.nodeType ? [b] : b;
            while (d = o.match.PSEUDO.exec(a))f += d[0], a = a.replace(o.match.PSEUDO, "");
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++)m(a, g[h], e, c);
            return m.filter(f, e)
        };
        m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
    }();
    var L = /Until$/, M = /^(?:parents|prevUntil|prevAll)/, N = /,/, O = /^.[^:#\[\.,]*$/, P = Array.prototype.slice, Q = f.expr.match.globalPOS, R = {children: !0, contents: !0, next: !0, prev: !0};
    f.fn.extend({find: function (a) {
        var b = this, c, d;
        if (typeof a != "string")return f(a).filter(function () {
            for (c = 0, d = b.length; c < d; c++)if (f.contains(b[c], this))return!0
        });
        var e = this.pushStack("", "find", a), g, h, i;
        for (c = 0, d = this.length; c < d; c++) {
            g = e.length, f.find(a, this[c], e);
            if (c > 0)for (h = g; h < e.length; h++)for (i = 0; i < g; i++)if (e[i] === e[h]) {
                e.splice(h--, 1);
                break
            }
        }
        return e
    }, has: function (a) {
        var b = f(a);
        return this.filter(function () {
            for (var a = 0, c = b.length; a < c; a++)if (f.contains(this, b[a]))return!0
        })
    }, not: function (a) {
        return this.pushStack(T(this, a, !1), "not", a)
    }, filter: function (a) {
        return this.pushStack(T(this, a, !0), "filter", a)
    }, is: function (a) {
        return!!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
    }, closest: function (a, b) {
        var c = [], d, e, g = this[0];
        if (f.isArray(a)) {
            var h = 1;
            while (g && g.ownerDocument && g !== b) {
                for (d = 0; d < a.length; d++)f(g).is(a[d]) && c.push({selector: a[d], elem: g, level: h});
                g = g.parentNode, h++
            }
            return c
        }
        var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
        for (d = 0, e = this.length; d < e; d++) {
            g = this[d];
            while (g) {
                if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                    c.push(g);
                    break
                }
                g = g.parentNode;
                if (!g || !g.ownerDocument || g === b || g.nodeType === 11)break
            }
        }
        c = c.length > 1 ? f.unique(c) : c;
        return this.pushStack(c, "closest", a)
    }, index: function (a) {
        if (!a)return this[0] && this[0].parentNode ? this.prevAll().length : -1;
        if (typeof a == "string")return f.inArray(this[0], f(a));
        return f.inArray(a.jquery ? a[0] : a, this)
    }, add: function (a, b) {
        var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a), d = f.merge(this.get(), c);
        return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
    }, andSelf: function () {
        return this.add(this.prevObject)
    }}), f.each({parent: function (a) {
        var b = a.parentNode;
        return b && b.nodeType !== 11 ? b : null
    }, parents: function (a) {
        return f.dir(a, "parentNode")
    }, parentsUntil: function (a, b, c) {
        return f.dir(a, "parentNode", c)
    }, next: function (a) {
        return f.nth(a, 2, "nextSibling")
    }, prev: function (a) {
        return f.nth(a, 2, "previousSibling")
    }, nextAll: function (a) {
        return f.dir(a, "nextSibling")
    }, prevAll: function (a) {
        return f.dir(a, "previousSibling")
    }, nextUntil: function (a, b, c) {
        return f.dir(a, "nextSibling", c)
    }, prevUntil: function (a, b, c) {
        return f.dir(a, "previousSibling", c)
    }, siblings: function (a) {
        return f.sibling((a.parentNode || {}).firstChild, a)
    }, children: function (a) {
        return f.sibling(a.firstChild)
    }, contents: function (a) {
        return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
    }}, function (a, b) {
        f.fn[a] = function (c, d) {
            var e = f.map(this, b, c);
            L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
            return this.pushStack(e, a, P.call(arguments).join(","))
        }
    }), f.extend({filter: function (a, b, c) {
        c && (a = ":not(" + a + ")");
        return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
    }, dir: function (a, c, d) {
        var e = [], g = a[c];
        while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d)))g.nodeType === 1 && e.push(g), g = g[c];
        return e
    }, nth: function (a, b, c, d) {
        b = b || 1;
        var e = 0;
        for (; a; a = a[c])if (a.nodeType === 1 && ++e === b)break;
        return a
    }, sibling: function (a, b) {
        var c = [];
        for (; a; a = a.nextSibling)a.nodeType === 1 && a !== b && c.push(a);
        return c
    }});
    var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", W = / jQuery\d+="(?:\d+|null)"/g, X = /^\s+/, Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Z = /<([\w:]+)/, $ = /<tbody/i, _ = /<|&#?\w+;/, ba = /<(?:script|style)/i, bb = /<(?:script|object|embed|option|style)/i, bc = new RegExp("<(?:" + V + ")[\\s/>]", "i"), bd = /checked\s*(?:[^=]|=\s*.checked.)/i, be = /\/(java|ecma)script/i, bf = /^\s*<!(?:\[CDATA\[|\-\-)/, bg = {option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""]}, bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({text: function (a) {
        return f.access(this, function (a) {
            return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
        }, null, a, arguments.length)
    }, wrapAll: function (a) {
        if (f.isFunction(a))return this.each(function (b) {
            f(this).wrapAll(a.call(this, b))
        });
        if (this[0]) {
            var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                var a = this;
                while (a.firstChild && a.firstChild.nodeType === 1)a = a.firstChild;
                return a
            }).append(this)
        }
        return this
    }, wrapInner: function (a) {
        if (f.isFunction(a))return this.each(function (b) {
            f(this).wrapInner(a.call(this, b))
        });
        return this.each(function () {
            var b = f(this), c = b.contents();
            c.length ? c.wrapAll(a) : b.append(a)
        })
    }, wrap: function (a) {
        var b = f.isFunction(a);
        return this.each(function (c) {
            f(this).wrapAll(b ? a.call(this, c) : a)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
        }).end()
    }, append: function () {
        return this.domManip(arguments, !0, function (a) {
            this.nodeType === 1 && this.appendChild(a)
        })
    }, prepend: function () {
        return this.domManip(arguments, !0, function (a) {
            this.nodeType === 1 && this.insertBefore(a, this.firstChild)
        })
    }, before: function () {
        if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (a) {
            this.parentNode.insertBefore(a, this)
        });
        if (arguments.length) {
            var a = f
                .clean(arguments);
            a.push.apply(a, this.toArray());
            return this.pushStack(a, "before", arguments)
        }
    }, after: function () {
        if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (a) {
            this.parentNode.insertBefore(a, this.nextSibling)
        });
        if (arguments.length) {
            var a = this.pushStack(this, "after", arguments);
            a.push.apply(a, f.clean(arguments));
            return a
        }
    }, remove: function (a, b) {
        for (var c = 0, d; (d = this[c]) != null; c++)if (!a || f.filter(a, [d]).length)!b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
        return this
    }, empty: function () {
        for (var a = 0, b; (b = this[a]) != null; a++) {
            b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
            while (b.firstChild)b.removeChild(b.firstChild)
        }
        return this
    }, clone: function (a, b) {
        a = a == null ? !1 : a, b = b == null ? a : b;
        return this.map(function () {
            return f.clone(this, a, b)
        })
    }, html: function (a) {
        return f.access(this, function (a) {
            var c = this[0] || {}, d = 0, e = this.length;
            if (a === b)return c.nodeType === 1 ? c.innerHTML.replace(W, "") : null;
            if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(Y, "<$1></$2>");
                try {
                    for (; d < e; d++)c = this[d] || {}, c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
                    c = 0
                } catch (g) {
                }
            }
            c && this.empty().append(a)
        }, null, a, arguments.length)
    }, replaceWith: function (a) {
        if (this[0] && this[0].parentNode) {
            if (f.isFunction(a))return this.each(function (b) {
                var c = f(this), d = c.html();
                c.replaceWith(a.call(this, b, d))
            });
            typeof a != "string" && (a = f(a).detach());
            return this.each(function () {
                var b = this.nextSibling, c = this.parentNode;
                f(this).remove(), b ? f(b).before(a) : f(c).append(a)
            })
        }
        return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
    }, detach: function (a) {
        return this.remove(a, !0)
    }, domManip: function (a, c, d) {
        var e, g, h, i, j = a[0], k = [];
        if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j))return this.each(function () {
            f(this).domManip(a, c, d, !0)
        });
        if (f.isFunction(j))return this.each(function (e) {
            var g = f(this);
            a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
        });
        if (this[0]) {
            i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {fragment: i} : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
            if (g) {
                c = c && f.nodeName(g, "tr");
                for (var l = 0, m = this.length, n = m - 1; l < m; l++)d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
            }
            k.length && f.each(k, function (a, b) {
                b.src ? f.ajax({type: "GET", global: !1, url: b.src, async: !1, dataType: "script"}) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
            })
        }
        return this
    }}), f.buildFragment = function (a, b, d) {
        var e, g, h, i, j = a[0];
        b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
        return{fragment: e, cacheable: g}
    }, f.fragments = {}, f.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (a, b) {
        f.fn[a] = function (c) {
            var d = [], e = f(c), g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                e[b](this[0]);
                return this
            }
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), f.extend({clone: function (a, b, c) {
        var d, e, g, h = f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : bo(a);
        if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
            bk(a, h), d = bl(a), e = bl(h);
            for (g = 0; d[g]; ++g)e[g] && bk(d[g], e[g])
        }
        if (b) {
            bj(a, h);
            if (c) {
                d = bl(a), e = bl(h);
                for (g = 0; d[g]; ++g)bj(d[g], e[g])
            }
        }
        d = e = null;
        return h
    }, clean: function (a, b, d, e) {
        var g, h, i, j = [];
        b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
        for (var k = 0, l; (l = a[k]) != null; k++) {
            typeof l == "number" && (l += "");
            if (!l)continue;
            if (typeof l == "string")if (!_.test(l))l = b.createTextNode(l); else {
                l = l.replace(Y, "<$1></$2>");
                var m = (Z.exec(l) || ["", ""])[1].toLowerCase(), n = bg[m] || bg._default, o = n[0], p = b.createElement("div"), q = bh.childNodes, r;
                b === c ? bh.appendChild(p) : U(b).appendChild(p), p.innerHTML = n[1] + l + n[2];
                while (o--)p = p.lastChild;
                if (!f.support.tbody) {
                    var s = $.test(l), t = m === "table" && !s ? p.firstChild && p.firstChild.childNodes : n[1] === "<table>" && !s ? p.childNodes : [];
                    for (i = t.length - 1; i >= 0; --i)f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i])
                }
                !f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild), l = p.childNodes, p && (p.parentNode.removeChild(p), q.length > 0 && (r = q[q.length - 1], r && r.parentNode && r.parentNode.removeChild(r)))
            }
            var u;
            if (!f.support.appendChecked)if (l[0] && typeof (u = l.length) == "number")for (i = 0; i < u; i++)bn(l[i]); else bn(l);
            l.nodeType ? j.push(l) : j = f.merge(j, l)
        }
        if (d) {
            g = function (a) {
                return!a.type || be.test(a.type)
            };
            for (k = 0; j[k]; k++) {
                h = j[k];
                if (e && f.nodeName(h, "script") && (!h.type || be.test(h.type)))e.push(h.parentNode ? h.parentNode.removeChild(h) : h); else {
                    if (h.nodeType === 1) {
                        var v = f.grep(h.getElementsByTagName("script"), g);
                        j.splice.apply(j, [k + 1, 0].concat(v))
                    }
                    d.appendChild(h)
                }
            }
        }
        return j
    }, cleanData: function (a) {
        var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
        for (var h = 0, i; (i = a[h]) != null; h++) {
            if (i.nodeName && f.noData[i.nodeName.toLowerCase()])continue;
            c = i[f.expando];
            if (c) {
                b = d[c];
                if (b && b.events) {
                    for (var j in b.events)e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                    b.handle && (b.handle.elem = null)
                }
                g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
            }
        }
    }});
    var bp = /alpha\([^)]*\)/i, bq = /opacity=([^)]*)/, br = /([A-Z]|^ms)/g, bs = /^[\-+]?(?:\d*\.)?\d+$/i, bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i, bu = /^([\-+])=([\-+.\de]+)/, bv = /^margin/, bw = {position: "absolute", visibility: "hidden", display: "block"}, bx = ["Top", "Right", "Bottom", "Left"], by, bz, bA;
    f.fn.css = function (a, c) {
        return f.access(this, function (a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        }, a, c, arguments.length > 1)
    }, f.extend({cssHooks: {opacity: {get: function (a, b) {
        if (b) {
            var c = by(a, "opacity");
            return c === "" ? "1" : c
        }
        return a.style.opacity
    }}}, cssNumber: {fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0}, cssProps: {"float": f.support.cssFloat ? "cssFloat" : "styleFloat"}, style: function (a, c, d, e) {
        if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
            var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
            c = f.cssProps[i] || i;
            if (d === b) {
                if (k && "get"in k && (g = k.get(a, !1, e)) !== b)return g;
                return j[c]
            }
            h = typeof d, h === "string" && (g = bu.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
            if (d == null || h === "number" && isNaN(d))return;
            h === "number" && !f.cssNumber[i] && (d += "px");
            if (!k || !("set"in k) || (d = k.set(a, d)) !== b)try {
                j[c] = d
            } catch (l) {
            }
        }
    }, css: function (a, c, d) {
        var e, g;
        c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
        if (g && "get"in g && (e = g.get(a, !0, d)) !== b)return e;
        if (by)return by(a, c)
    }, swap: function (a, b, c) {
        var d = {}, e, f;
        for (f in b)d[f] = a.style[f], a.style[f] = b[f];
        e = c.call(a);
        for (f in b)a.style[f] = d[f];
        return e
    }}), f.curCSS = f.css, c.defaultView && c.defaultView.getComputedStyle && (bz = function (a, b) {
        var c, d, e, g, h = a.style;
        b = b.replace(br, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), !f.support.pixelMargin && e && bv.test(b) && bt.test(c) && (g = h.width, h.width = c, c = e.width, h.width = g);
        return c
    }), c.documentElement.currentStyle && (bA = function (a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
        f == null && g && (e = g[b]) && (f = e), bt.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
        return f === "" ? "auto" : f
    }), by = bz || bA, f.each(["height", "width"], function (a, b) {
        f.cssHooks[b] = {get: function (a, c, d) {
            if (c)return a.offsetWidth !== 0 ? bB(a, b, d) : f.swap(a, bw, function () {
                return bB(a, b, d)
            })
        }, set: function (a, b) {
            return bs.test(b) ? b + "px" : b
        }}
    }), f.support.opacity || (f.cssHooks.opacity = {get: function (a, b) {
        return bq.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
    }, set: function (a, b) {
        var c = a.style, d = a.currentStyle, e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", g = d && d.filter || c.filter || "";
        c.zoom = 1;
        if (b >= 1 && f.trim(g.replace(bp, "")) === "") {
            c.removeAttribute("filter");
            if (d && !d.filter)return
        }
        c.filter = bp.test(g) ? g.replace(bp, e) : g + " " + e
    }}), f(function () {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {get: function (a, b) {
            return f.swap(a, {display: "inline-block"}, function () {
                return b ? by(a, "margin-right") : a.style.marginRight
            })
        }})
    }), f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
    }, f.expr.filters.visible = function (a) {
        return!f.expr.filters.hidden(a)
    }), f.each({margin: "", padding: "", border: "Width"}, function (a, b) {
        f.cssHooks[a + b] = {expand: function (c) {
            var d, e = typeof c == "string" ? c.split(" ") : [c], f = {};
            for (d = 0; d < 4; d++)f[a + bx[d] + b] = e[d] || e[d - 2] || e[0];
            return f
        }}
    });
    var bC = /%20/g, bD = /\[\]$/, bE = /\r?\n/g, bF = /#.*$/, bG = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, bH = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, bI = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bJ = /^(?:GET|HEAD)$/, bK = /^\/\//, bL = /\?/, bM = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bN = /^(?:select|textarea)/i, bO = /\s+/, bP = /([?&])_=[^&]*/, bQ = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bR = f.fn.load, bS = {}, bT = {}, bU, bV, bW = ["*/"] + ["*"];
    try {
        bU = e.href
    } catch (bX) {
        bU = c.createElement("a"), bU.href = "", bU = bU.href
    }
    bV = bQ.exec(bU.toLowerCase()) || [], f.fn.extend({load: function (a, c, d) {
        if (typeof a != "string" && bR)return bR.apply(this, arguments);
        if (!this.length)return this;
        var e = a.indexOf(" ");
        if (e >= 0) {
            var g = a.slice(e, a.length);
            a = a.slice(0, e)
        }
        var h = "GET";
        c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
        var i = this;
        f.ajax({url: a, type: h, dataType: "html", data: c, complete: function (a, b, c) {
            c = a.responseText, a.isResolved() && (a.done(function (a) {
                c = a
            }), i.html(g ? f("<div>").append(c.replace(bM, "")).find(g) : c)), d && i.each(d, [c, b, a])
        }});
        return this
    }, serialize: function () {
        return f.param(this.serializeArray())
    }, serializeArray: function () {
        return this.map(function () {
            return this.elements ? f.makeArray(this.elements) : this
        }).filter(function () {
                return this.name && !this.disabled && (this.checked || bN.test(this.nodeName) || bH.test(this.type))
            }).map(function (a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                    return{name: b.name, value: a.replace(bE, "\r\n")}
                }) : {name: b.name, value: c.replace(bE, "\r\n")}
            }).get()
    }}), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        f.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), f.each(["get", "post"], function (a, c) {
        f[c] = function (a, d, e, g) {
            f.isFunction(d) && (g = g || e, e = d, d = b);
            return f.ajax({type: c, url: a, data: d, success: e, dataType: g})
        }
    }), f.extend({getScript: function (a, c) {
        return f.get(a, b, c, "script")
    }, getJSON: function (a, b, c) {
        return f.get(a, b, c, "json")
    }, ajaxSetup: function (a, b) {
        b ? b$(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b$(a, b);
        return a
    }, ajaxSettings: {url: bU, isLocal: bI.test(bV[1]), global: !0, type: "GET", contentType: "application/x-www-form-urlencoded; charset=UTF-8", processData: !0, async: !0, accepts: {xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", "*": bW}, contents: {xml: /xml/, html: /html/, json: /json/}, responseFields: {xml: "responseXML", text: "responseText"}, converters: {"* text": a.String, "text html": !0, "text json": f.parseJSON, "text xml": f.parseXML}, flatOptions: {context: !0, url: !0}}, ajaxPrefilter: bY(bS), ajaxTransport: bY(bT), ajax: function (a, c) {
        function w(a, c, l, m) {
            if (s !== 2) {
                s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                var o, r, u, w = c, x = l ? ca(d, v, l) : b, y, z;
                if (a >= 200 && a < 300 || a === 304) {
                    if (d.ifModified) {
                        if (y = v.getResponseHeader("Last-Modified"))f.lastModified[k] = y;
                        if (z = v.getResponseHeader("Etag"))f.etag[k] = z
                    }
                    if (a === 304)w = "notmodified", o = !0; else try {
                        r = cb(d, x), w = "success", o = !0
                    } catch (A) {
                        w = "parsererror", u = A
                    }
                } else {
                    u = w;
                    if (!w || a)w = "error", a < 0 && (a = 0)
                }
                v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
            }
        }

        typeof a == "object" && (c = a, a = b), c = c || {};
        var d = f.ajaxSetup({}, c), e = d.context || d, g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(), i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u, v = {readyState: 0, setRequestHeader: function (a, b) {
            if (!s) {
                var c = a.toLowerCase();
                a = m[c] = m[c] || a, l[a] = b
            }
            return this
        }, getAllResponseHeaders: function () {
            return s === 2 ? n : null
        }, getResponseHeader: function (a) {
            var c;
            if (s === 2) {
                if (!o) {
                    o = {};
                    while (c = bG.exec(n))o[c[1].toLowerCase()] = c[2]
                }
                c = o[a.toLowerCase()]
            }
            return c === b ? null : c
        }, overrideMimeType: function (a) {
            s || (d.mimeType = a);
            return this
        }, abort: function (a) {
            a = a || "abort", p && p.abort(a), w(0, a);
            return this
        }};
        h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
            if (a) {
                var b;
                if (s < 2)for (b in a)j[b] = [j[b], a[b]]; else b = a[v.status], v.then(b, b)
            }
            return this
        }, d.url = ((a || d.url) + "").replace(bF, "").replace(bK, bV[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bO), d.crossDomain == null && (r = bQ.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bV[1] && r[2] == bV[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bV[3] || (bV[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), bZ(bS, d, c, v);
        if (s === 2)return!1;
        t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bJ.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
        if (!d.hasContent) {
            d.data && (d.url += (bL.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
            if (d.cache === !1) {
                var x = f.now(), y = d.url.replace(bP, "$1_=" + x);
                d.url = y + (y === d.url ? (bL.test(d.url) ? "&" : "?") + "_=" + x : "")
            }
        }
        (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bW + "; q=0.01" : "") : d.accepts["*"]);
        for (u in d.headers)v.setRequestHeader(u, d.headers[u]);
        if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
            v.abort();
            return!1
        }
        for (u in{success: 1, error: 1, complete: 1})v[u](d[u]);
        p = bZ(bT, d, c, v);
        if (!p)w(-1, "No Transport"); else {
            v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
                v.abort("timeout")
            }, d.timeout));
            try {
                s = 1, p.send(l, w)
            } catch (z) {
                if (s < 2)w(-1, z); else throw z
            }
        }
        return v
    }, param: function (a, c) {
        var d = [], e = function (a, b) {
            b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        c === b && (c = f.ajaxSettings.traditional);
        if (f.isArray(a) || a.jquery && !f.isPlainObject(a))f.each(a, function () {
            e(this.name, this.value)
        }); else for (var g in a)b_(g, a[g], c, e);
        return d.join("&").replace(bC, "+")
    }}), f.extend({active: 0, lastModified: {}, etag: {}});
    var cc = f.now(), cd = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({jsonp: "callback", jsonpCallback: function () {
        return f.expando + "_" + cc++
    }}), f.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e = typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cd.test(b.url) || e && cd.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h], j = b.url, k = b.data, l = "$1" + h + "$2";
            b.jsonp !== !1 && (j = j.replace(cd, l), b.url === j && (e && (k = k.replace(cd, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
                g = [a]
            }, d.always(function () {
                a[h] = i, g && f.isFunction(i) && a[h](g[0])
            }), b.converters["script json"] = function () {
                g || f.error(h + " was not called");
                return g[0]
            }, b.dataTypes[0] = "json";
            return"script"
        }
    }), f.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents: {script: /javascript|ecmascript/}, converters: {"text script": function (a) {
        f.globalEval(a);
        return a
    }}}), f.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), f.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return{send: function (f, g) {
                d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
                    if (c || !d.readyState || /loaded|complete/.test(d.readyState))d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                }, e.insertBefore(d, e.firstChild)
            }, abort: function () {
                d && d.onload(0, 1)
            }}
        }
    });
    var ce = a.ActiveXObject ? function () {
        for (var a in cg)cg[a](0, 1)
    } : !1, cf = 0, cg;
    f.ajaxSettings.xhr = a.ActiveXObject ? function () {
        return!this.isLocal && ch() || ci()
    } : ch, function (a) {
        f.extend(f.support, {ajax: !!a, cors: !!a && "withCredentials"in a})
    }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return{send: function (e, g) {
                var h = c.xhr(), i, j;
                c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                if (c.xhrFields)for (j in c.xhrFields)h[j] = c.xhrFields[j];
                c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                try {
                    for (j in e)h.setRequestHeader(j, e[j])
                } catch (k) {
                }
                h.send(c.hasContent && c.data || null), d = function (a, e) {
                    var j, k, l, m, n;
                    try {
                        if (d && (e || h.readyState === 4)) {
                            d = b, i && (h.onreadystatechange = f.noop, ce && delete cg[i]);
                            if (e)h.readyState !== 4 && h.abort(); else {
                                j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n);
                                try {
                                    m.text = h.responseText
                                } catch (a) {
                                }
                                try {
                                    k = h.statusText
                                } catch (o) {
                                    k = ""
                                }
                                !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                            }
                        }
                    } catch (p) {
                        e || g(-1, p)
                    }
                    m && g(j, k, m, l)
                }, !c.async || h.readyState === 4 ? d() : (i = ++cf, ce && (cg || (cg = {}, f(a).unload(ce)), cg[i] = d), h.onreadystatechange = d)
            }, abort: function () {
                d && d(0, 1)
            }}
        }
    });
    var cj = {}, ck, cl, cm = /^(?:toggle|show|hide)$/, cn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, co, cp = [
        ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
        ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
        ["opacity"]
    ], cq;
    f.fn.extend({show: function (a, b, c) {
        var d, e;
        if (a || a === 0)return this.animate(ct("show", 3), a, b, c);
        for (var g = 0, h = this.length; g < h; g++)d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), (e === "" && f.css(d, "display") === "none" || !f.contains(d.ownerDocument.documentElement, d)) && f._data(d, "olddisplay", cu(d.nodeName)));
        for (g = 0; g < h; g++) {
            d = this[g];
            if (d.style) {
                e = d.style.display;
                if (e === "" || e === "none")d.style.display = f._data(d, "olddisplay") || ""
            }
        }
        return this
    }, hide: function (a, b, c) {
        if (a || a === 0)return this.animate(ct("hide", 3), a, b, c);
        var d, e, g = 0, h = this.length;
        for (; g < h; g++)d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
        for (g = 0; g < h; g++)this[g].style && (this[g].style.display = "none");
        return this
    }, _toggle: f.fn.toggle, toggle: function (a, b, c) {
        var d = typeof a == "boolean";
        f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
            var b = d ? a : f(this).is(":hidden");
            f(this)[b ? "show" : "hide"]()
        }) : this.animate(ct("toggle", 3), a, b, c);
        return this
    }, fadeTo: function (a, b, c, d) {
        return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
    }, animate: function (a, b, c, d) {
        function g() {
            e.queue === !1 && f._mark(this);
            var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m, n, o, p, q;
            b.animatedProperties = {};
            for (i in a) {
                g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]);
                if ((k = f.cssHooks[g]) && "expand"in k) {
                    l = k.expand(a[g]), delete a[g];
                    for (i in l)i in a || (a[i] = l[i])
                }
            }
            for (g in a) {
                h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                if (h === "hide" && d || h === "show" && !d)return b.complete.call(this);
                c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cu(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
            }
            b.overflow != null && (this.style.overflow = "hidden");
            for (i in a)j = new f.fx(this, b, i), h = a[i], cm.test(h) ? (q = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), q ? (f._data(this, "toggle" + i, q === "show" ? "hide" : "show"), j[q]()) : j[h]()) : (m = cn.exec(h), n = j.cur(), m ? (o = parseFloat(m[2]), p = m[3] || (f.cssNumber[i] ? "" : "px"), p !== "px" && (f.style(this, i, (o || 1) + p), n = (o || 1) / j.cur() * n, f.style(this, i, n + p)), m[1] && (o = (m[1] === "-=" ? -1 : 1) * o + n), j.custom(n, o, p)) : j.custom(n, h, ""));
            return!0
        }

        var e = f.speed(b, c, d);
        if (f.isEmptyObject(a))return this.each(e.complete, [!1]);
        a = f.extend({}, a);
        return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
    }, stop: function (a, c, d) {
        typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
        return this.each(function () {
            function h(a, b, c) {
                var e = b[c];
                f.removeData(a, c, !0), e.stop(d)
            }

            var b, c = !1, e = f.timers, g = f._data(this);
            d || f._unmark(!0, this);
            if (a == null)for (b in g)g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b); else g[b = a + ".run"] && g[b].stop && h(this, g, b);
            for (b = e.length; b--;)e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
            (!d || !c) && f.dequeue(this, a)
        })
    }}), f.each({slideDown: ct("show", 1), slideUp: ct("hide", 1), slideToggle: ct("toggle", 1), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"}, fadeToggle: {opacity: "toggle"}}, function (a, b) {
        f.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), f.extend({speed: function (a, b, c) {
        var d = a && typeof a == "object" ? f.extend({}, a) : {complete: c || !c && b || f.isFunction(a) && a, duration: a, easing: c && b || b && !f.isFunction(b) && b};
        d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
        if (d.queue == null || d.queue === !0)d.queue = "fx";
        d.old = d.complete, d.complete = function (a) {
            f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
        };
        return d
    }, easing: {linear: function (a) {
        return a
    }, swing: function (a) {
        return-Math.cos(a * Math.PI) / 2 + .5
    }}, timers: [], fx: function (a, b, c) {
        this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
    }}), f.fx.prototype = {update: function () {
        this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
    }, cur: function () {
        if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null))return this.elem[this.prop];
        var a, b = f.css(this.elem, this.prop);
        return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
    }, custom: function (a, c, d) {
        function h(a) {
            return e.step(a)
        }

        var e = this, g = f.fx;
        this.startTime = cq || cr(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
            f._data(e.elem, "fxshow" + e.prop) === b && (e.options.hide ? f._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && f._data(e.elem, "fxshow" + e.prop, e.end))
        }, h() && f.timers.push(h) && !co && (co = setInterval(g.tick, g.interval))
    }, show: function () {
        var a = f._data(this.elem, "fxshow" + this.prop);
        this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
    }, hide: function () {
        this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
    }, step: function (a) {
        var b, c, d, e = cq || cr(), g = !0, h = this.elem, i = this.options;
        if (a || e >= i.duration + this.startTime) {
            this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
            for (b in i.animatedProperties)i.animatedProperties[b] !== !0 && (g = !1);
            if (g) {
                i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                    h.style["overflow" + b] = i.overflow[a]
                }), i.hide && f(h).hide();
                if (i.hide || i.show)for (b in i.animatedProperties)f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                d = i.complete, d && (i.complete = !1, d.call(h))
            }
            return!1
        }
        i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
        return!0
    }}, f.extend(f.fx, {tick: function () {
        var a, b = f.timers, c = 0;
        for (; c < b.length; c++)a = b[c], !a() && b[c] === a && b.splice(c--, 1);
        b.length || f.fx.stop()
    }, interval: 13, stop: function () {
        clearInterval(co), co = null
    }, speeds: {slow: 600, fast: 200, _default: 400}, step: {opacity: function (a) {
        f.style(a.elem, "opacity", a.now)
    }, _default: function (a) {
        a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
    }}}), f.each(cp.concat.apply([], cp), function (a, b) {
        b.indexOf("margin") && (f.fx.step[b] = function (a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        })
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
        return f.grep(f.timers,function (b) {
            return a === b.elem
        }).length
    });
    var cv, cw = /^t(?:able|d|h)$/i, cx = /^(?:body|html)$/i;
    "getBoundingClientRect"in c.documentElement ? cv = function (a, b, c, d) {
        try {
            d = a.getBoundingClientRect()
        } catch (e) {
        }
        if (!d || !f.contains(c, a))return d ? {top: d.top, left: d.left} : {top: 0, left: 0};
        var g = b.body, h = cy(b), i = c.clientTop || g.clientTop || 0, j = c.clientLeft || g.clientLeft || 0, k = h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop, l = h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft, m = d.top + k - i, n = d.left + l - j;
        return{top: m, left: n}
    } : cv = function (a, b, c) {
        var d, e = a.offsetParent, g = a, h = b.body, i = b.defaultView, j = i ? i.getComputedStyle(a, null) : a.currentStyle, k = a.offsetTop, l = a.offsetLeft;
        while ((a = a.parentNode) && a !== h && a !== c) {
            if (f.support.fixedPosition && j.position === "fixed")break;
            d = i ? i.getComputedStyle(a, null) : a.currentStyle, k -= a.scrollTop, l -= a.scrollLeft, a === e && (k += a.offsetTop, l += a.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), g = e, e = a.offsetParent), f.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), j = d
        }
        if (j.position === "relative" || j.position === "static")k += h.offsetTop, l += h.offsetLeft;
        f.support.fixedPosition && j.position === "fixed" && (k += Math.max(c.scrollTop, h.scrollTop), l += Math.max(c.scrollLeft, h.scrollLeft));
        return{top: k, left: l}
    }, f.fn.offset = function (a) {
        if (arguments.length)return a === b ? this : this.each(function (b) {
            f.offset.setOffset(this, a, b)
        });
        var c = this[0], d = c && c.ownerDocument;
        if (!d)return null;
        if (c === d.body)return f.offset.bodyOffset(c);
        return cv(c, d, d.documentElement)
    }, f.offset = {bodyOffset: function (a) {
        var b = a.offsetTop, c = a.offsetLeft;
        f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
        return{top: b, left: c}
    }, setOffset: function (a, b, c) {
        var d = f.css(a, "position");
        d === "static" && (a.style.position = "relative");
        var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"), j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1, k = {}, l = {}, m, n;
        j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using"in b ? b.using.call(a, k) : e.css(k)
    }}, f.fn.extend({position: function () {
        if (!this[0])return null;
        var a = this[0], b = this.offsetParent(), c = this.offset(), d = cx.test(b[0].nodeName) ? {top: 0, left: 0} : b.offset();
        c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
        return{top: c.top - d.top, left: c.left - d.left}
    }, offsetParent: function () {
        return this.map(function () {
            var a = this.offsetParent || c.body;
            while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static")a = a.offsetParent;
            return a
        })
    }}), f.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, c) {
        var d = /Y/.test(c);
        f.fn[a] = function (e) {
            return f.access(this, function (a, e, g) {
                var h = cy(a);
                if (g === b)return h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e];
                h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g : f(h).scrollTop()) : a[e] = g
            }, a, e, arguments.length, null)
        }
    }), f.each({Height: "height", Width: "width"}, function (a, c) {
        var d = "client" + a, e = "scroll" + a, g = "offset" + a;
        f.fn["inner" + a] = function () {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]() : null
        }, f.fn["outer" + a] = function (a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, c, a ? "margin" : "border")) : this[c]() : null
        }, f.fn[c] = function (a) {
            return f.access(this, function (a, c, h) {
                var i, j, k, l;
                if (f.isWindow(a)) {
                    i = a.document, j = i.documentElement[d];
                    return f.support.boxModel && j || i.body && i.body[d] || j
                }
                if (a.nodeType === 9) {
                    i = a.documentElement;
                    if (i[d] >= i[e])return i[d];
                    return Math.max(a.body[e], i[e], a.body[g], i[g])
                }
                if (h === b) {
                    k = f.css(a, c), l = parseFloat(k);
                    return f.isNumeric(l) ? l : k
                }
                f(a).css(c, h)
            }, c, a, arguments.length, null)
        }
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return f
    })
})(window);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.core.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    function c(b, c) {
        var e = b.nodeName.toLowerCase();
        if ("area" === e) {
            var f = b.parentNode, g = f.name, h;
            return!b.href || !g || f.nodeName.toLowerCase() !== "map" ? !1 : (h = a("img[usemap=#" + g + "]")[0], !!h && d(h))
        }
        return(/input|select|textarea|button|object/.test(e) ? !b.disabled : "a" == e ? b.href || c : c) && d(b)
    }

    function d(b) {
        return!a(b).parents().andSelf().filter(function () {
            return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
        }).length
    }

    a.ui = a.ui || {};
    if (a.ui.version)return;
    a.extend(a.ui, {version: "1.8.19", keyCode: {ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91}}), a.fn.extend({propAttr: a.fn.prop || a.fn.attr, _focus: a.fn.focus, focus: function (b, c) {
        return typeof b == "number" ? this.each(function () {
            var d = this;
            setTimeout(function () {
                a(d).focus(), c && c.call(d)
            }, b)
        }) : this._focus.apply(this, arguments)
    }, scrollParent: function () {
        var b;
        return a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function () {
            return/(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
        }).eq(0) : b = this.parents().filter(function () {
            return/(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
        }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b
    }, zIndex: function (c) {
        if (c !== b)return this.css("zIndex", c);
        if (this.length) {
            var d = a(this[0]), e, f;
            while (d.length && d[0] !== document) {
                e = d.css("position");
                if (e === "absolute" || e === "relative" || e === "fixed") {
                    f = parseInt(d.css("zIndex"), 10);
                    if (!isNaN(f) && f !== 0)return f
                }
                d = d.parent()
            }
        }
        return 0
    }, disableSelection: function () {
        return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (a) {
            a.preventDefault()
        })
    }, enableSelection: function () {
        return this.unbind(".ui-disableSelection")
    }}), a.each(["Width", "Height"], function (c, d) {
        function h(b, c, d, f) {
            return a.each(e, function () {
                c -= parseFloat(a.curCSS(b, "padding" + this, !0)) || 0, d && (c -= parseFloat(a.curCSS(b, "border" + this + "Width", !0)) || 0), f && (c -= parseFloat(a.curCSS(b, "margin" + this, !0)) || 0)
            }), c
        }

        var e = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], f = d.toLowerCase(), g = {innerWidth: a.fn.innerWidth, innerHeight: a.fn.innerHeight, outerWidth: a.fn.outerWidth, outerHeight: a.fn.outerHeight};
        a.fn["inner" + d] = function (c) {
            return c === b ? g["inner" + d].call(this) : this.each(function () {
                a(this).css(f, h(this, c) + "px")
            })
        }, a.fn["outer" + d] = function (b, c) {
            return typeof b != "number" ? g["outer" + d].call(this, b) : this.each(function () {
                a(this).css(f, h(this, b, !0, c) + "px")
            })
        }
    }), a.extend(a.expr[":"], {data: function (b, c, d) {
        return!!a.data(b, d[3])
    }, focusable: function (b) {
        return c(b, !isNaN(a.attr(b, "tabindex")))
    }, tabbable: function (b) {
        var d = a.attr(b, "tabindex"), e = isNaN(d);
        return(e || d >= 0) && c(b, !e)
    }}), a(function () {
        var b = document.body, c = b.appendChild(c = document.createElement("div"));
        c.offsetHeight, a.extend(c.style, {minHeight: "100px", height: "auto", padding: 0, borderWidth: 0}), a.support.minHeight = c.offsetHeight === 100, a.support.selectstart = "onselectstart"in c, b.removeChild(c).style.display = "none"
    }), a.extend(a.ui, {plugin: {add: function (b, c, d) {
        var e = a.ui[b].prototype;
        for (var f in d)e.plugins[f] = e.plugins[f] || [], e.plugins[f].push([c, d[f]])
    }, call: function (a, b, c) {
        var d = a.plugins[b];
        if (!d || !a.element[0].parentNode)return;
        for (var e = 0; e < d.length; e++)a.options[d[e][0]] && d[e][1].apply(a.element, c)
    }}, contains: function (a, b) {
        return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
    }, hasScroll: function (b, c) {
        if (a(b).css("overflow") === "hidden")return!1;
        var d = c && c === "left" ? "scrollLeft" : "scrollTop", e = !1;
        return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
    }, isOverAxis: function (a, b, c) {
        return a > b && a < b + c
    }, isOver: function (b, c, d, e, f, g) {
        return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g)
    }})
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.widget.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    if (a.cleanData) {
        var c = a.cleanData;
        a.cleanData = function (b) {
            for (var d = 0, e; (e = b[d]) != null; d++)try {
                a(e).triggerHandler("remove")
            } catch (f) {
            }
            c(b)
        }
    } else {
        var d = a.fn.remove;
        a.fn.remove = function (b, c) {
            return this.each(function () {
                return c || (!b || a.filter(b, [this]).length) && a("*", this).add([this]).each(function () {
                    try {
                        a(this).triggerHandler("remove")
                    } catch (b) {
                    }
                }), d.call(a(this), b, c)
            })
        }
    }
    a.widget = function (b, c, d) {
        var e = b.split(".")[0], f;
        b = b.split(".")[1], f = e + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][f] = function (c) {
            return!!a.data(c, b)
        }, a[e] = a[e] || {}, a[e][b] = function (a, b) {
            arguments.length && this._createWidget(a, b)
        };
        var g = new c;
        g.options = a.extend(!0, {}, g.options), a[e][b].prototype = a.extend(!0, g, {namespace: e, widgetName: b, widgetEventPrefix: a[e][b].prototype.widgetEventPrefix || b, widgetBaseClass: f}, d), a.widget.bridge(b, a[e][b])
    }, a.widget.bridge = function (c, d) {
        a.fn[c] = function (e) {
            var f = typeof e == "string", g = Array.prototype.slice.call(arguments, 1), h = this;
            return e = !f && g.length ? a.extend.apply(null, [!0, e].concat(g)) : e, f && e.charAt(0) === "_" ? h : (f ? this.each(function () {
                var d = a.data(this, c), f = d && a.isFunction(d[e]) ? d[e].apply(d, g) : d;
                if (f !== d && f !== b)return h = f, !1
            }) : this.each(function () {
                var b = a.data(this, c);
                b ? b.option(e || {})._init() : a.data(this, c, new d(e, this))
            }), h)
        }
    }, a.Widget = function (a, b) {
        arguments.length && this._createWidget(a, b)
    }, a.Widget.prototype = {widgetName: "widget", widgetEventPrefix: "", options: {disabled: !1}, _createWidget: function (b, c) {
        a.data(c, this.widgetName, this), this.element = a(c), this.options = a.extend(!0, {}, this.options, this._getCreateOptions(), b);
        var d = this;
        this.element.bind("remove." + this.widgetName, function () {
            d.destroy()
        }), this._create(), this._trigger("create"), this._init()
    }, _getCreateOptions: function () {
        return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
    }, _create: function () {
    }, _init: function () {
    }, destroy: function () {
        this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
    }, widget: function () {
        return this.element
    }, option: function (c, d) {
        var e = c;
        if (arguments.length === 0)return a.extend({}, this.options);
        if (typeof c == "string") {
            if (d === b)return this.options[c];
            e = {}, e[c] = d
        }
        return this._setOptions(e), this
    }, _setOptions: function (b) {
        var c = this;
        return a.each(b, function (a, b) {
            c._setOption(a, b)
        }), this
    }, _setOption: function (a, b) {
        return this.options[a] = b, a === "disabled" && this.widget()[b ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", b), this
    }, enable: function () {
        return this._setOption("disabled", !1)
    }, disable: function () {
        return this._setOption("disabled", !0)
    }, _trigger: function (b, c, d) {
        var e, f, g = this.options[b];
        d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent;
        if (f)for (e in f)e in c || (c[e] = f[e]);
        return this.element.trigger(c, d), !(a.isFunction(g) && g.call(this.element[0], c, d) === !1 || c.isDefaultPrevented())
    }}
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.mouse.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    var c = !1;
    a(document).mouseup(function (a) {
        c = !1
    }), a.widget("ui.mouse", {options: {cancel: ":input,option", distance: 1, delay: 0}, _mouseInit: function () {
        var b = this;
        this.element.bind("mousedown." + this.widgetName,function (a) {
            return b._mouseDown(a)
        }).bind("click." + this.widgetName, function (c) {
                if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent"))return a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1
            }), this.started = !1
    }, _mouseDestroy: function () {
        this.element.unbind("." + this.widgetName), a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
    }, _mouseDown: function (b) {
        if (c)return;
        this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
        var d = this, e = b.which == 1, f = typeof this.options.cancel == "string" && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
        if (!e || f || !this._mouseCapture(b))return!0;
        this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
            d.mouseDelayMet = !0
        }, this.options.delay));
        if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
            this._mouseStarted = this._mouseStart(b) !== !1;
            if (!this._mouseStarted)return b.preventDefault(), !0
        }
        return!0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (a) {
            return d._mouseMove(a)
        }, this._mouseUpDelegate = function (a) {
            return d._mouseUp(a)
        }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), c = !0, !0
    }, _mouseMove: function (b) {
        return!a.browser.msie || document.documentMode >= 9 || !!b.button ? this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted) : this._mouseUp(b)
    }, _mouseUp: function (b) {
        return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target == this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), !1
    }, _mouseDistanceMet: function (a) {
        return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
    }, _mouseDelayMet: function (a) {
        return this.mouseDelayMet
    }, _mouseStart: function (a) {
    }, _mouseDrag: function (a) {
    }, _mouseStop: function (a) {
    }, _mouseCapture: function (a) {
        return!0
    }})
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.position.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.ui = a.ui || {};
    var c = /left|center|right/, d = /top|center|bottom/, e = "center", f = {}, g = a.fn.position, h = a.fn.offset;
    a.fn.position = function (b) {
        if (!b || !b.of)return g.apply(this, arguments);
        b = a.extend({}, b);
        var h = a(b.of), i = h[0], j = (b.collision || "flip").split(" "), k = b.offset ? b.offset.split(" ") : [0, 0], l, m, n;
        return i.nodeType === 9 ? (l = h.width(), m = h.height(), n = {top: 0, left: 0}) : i.setTimeout ? (l = h.width(), m = h.height(), n = {top: h.scrollTop(), left: h.scrollLeft()}) : i.preventDefault ? (b.at = "left top", l = m = 0, n = {top: b.of.pageY, left: b.of.pageX}) : (l = h.outerWidth(), m = h.outerHeight(), n = h.offset()), a.each(["my", "at"], function () {
            var a = (b[this] || "").split(" ");
            a.length === 1 && (a = c.test(a[0]) ? a.concat([e]) : d.test(a[0]) ? [e].concat(a) : [e, e]), a[0] = c.test(a[0]) ? a[0] : e, a[1] = d.test(a[1]) ? a[1] : e, b[this] = a
        }), j.length === 1 && (j[1] = j[0]), k[0] = parseInt(k[0], 10) || 0, k.length === 1 && (k[1] = k[0]), k[1] = parseInt(k[1], 10) || 0, b.at[0] === "right" ? n.left += l : b.at[0] === e && (n.left += l / 2), b.at[1] === "bottom" ? n.top += m : b.at[1] === e && (n.top += m / 2), n.left += k[0], n.top += k[1], this.each(function () {
            var c = a(this), d = c.outerWidth(), g = c.outerHeight(), h = parseInt(a.curCSS(this, "marginLeft", !0)) || 0, i = parseInt(a.curCSS(this, "marginTop", !0)) || 0, o = d + h + (parseInt(a.curCSS(this, "marginRight", !0)) || 0), p = g + i + (parseInt(a.curCSS(this, "marginBottom", !0)) || 0), q = a.extend({}, n), r;
            b.my[0] === "right" ? q.left -= d : b.my[0] === e && (q.left -= d / 2), b.my[1] === "bottom" ? q.top -= g : b.my[1] === e && (q.top -= g / 2), f.fractions || (q.left = Math.round(q.left), q.top = Math.round(q.top)), r = {left: q.left - h, top: q.top - i}, a.each(["left", "top"], function (c, e) {
                a.ui.position[j[c]] && a.ui.position[j[c]][e](q, {targetWidth: l, targetHeight: m, elemWidth: d, elemHeight: g, collisionPosition: r, collisionWidth: o, collisionHeight: p, offset: k, my: b.my, at: b.at})
            }), a.fn.bgiframe && c.bgiframe(), c.offset(a.extend(q, {using: b.using}))
        })
    }, a.ui.position = {fit: {left: function (b, c) {
        var d = a(window), e = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft();
        b.left = e > 0 ? b.left - e : Math.max(b.left - c.collisionPosition.left, b.left)
    }, top: function (b, c) {
        var d = a(window), e = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop();
        b.top = e > 0 ? b.top - e : Math.max(b.top - c.collisionPosition.top, b.top)
    }}, flip: {left: function (b, c) {
        if (c.at[0] === e)return;
        var d = a(window), f = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft(), g = c.my[0] === "left" ? -c.elemWidth : c.my[0] === "right" ? c.elemWidth : 0, h = c.at[0] === "left" ? c.targetWidth : -c.targetWidth, i = -2 * c.offset[0];
        b.left += c.collisionPosition.left < 0 ? g + h + i : f > 0 ? g + h + i : 0
    }, top: function (b, c) {
        if (c.at[1] === e)return;
        var d = a(window), f = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop(), g = c.my[1] === "top" ? -c.elemHeight : c.my[1] === "bottom" ? c.elemHeight : 0, h = c.at[1] === "top" ? c.targetHeight : -c.targetHeight, i = -2 * c.offset[1];
        b.top += c.collisionPosition.top < 0 ? g + h + i : f > 0 ? g + h + i : 0
    }}}, a.offset.setOffset || (a.offset.setOffset = function (b, c) {
        /static/.test(a.curCSS(b, "position")) && (b.style.position = "relative");
        var d = a(b), e = d.offset(), f = parseInt(a.curCSS(b, "top", !0), 10) || 0, g = parseInt(a.curCSS(b, "left", !0), 10) || 0, h = {top: c.top - e.top + f, left: c.left - e.left + g};
        "using"in c ? c.using.call(b, h) : d.css(h)
    }, a.fn.offset = function (b) {
        var c = this[0];
        return!c || !c.ownerDocument ? null : b ? this.each(function () {
            a.offset.setOffset(this, b)
        }) : h.call(this)
    }), function () {
        var b = document.getElementsByTagName("body")[0], c = document.createElement("div"), d, e, g, h, i;
        d = document.createElement(b ? "div" : "body"), g = {visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none"}, b && a.extend(g, {position: "absolute", left: "-1000px", top: "-1000px"});
        for (var j in g)d.style[j] = g[j];
        d.appendChild(c), e = b || document.documentElement, e.insertBefore(d, e.firstChild), c.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", h = a(c).offset(function (a, b) {
            return b
        }).offset(), d.innerHTML = "", e.removeChild(d), i = h.top + h.left + (b ? 2e3 : 0), f.fractions = i > 21 && i < 22
    }()
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.draggable.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.widget("ui.draggable", a.ui.mouse, {widgetEventPrefix: "drag", options: {addClasses: !0, appendTo: "parent", axis: !1, connectToSortable: !1, containment: !1, cursor: "auto", cursorAt: !1, grid: !1, handle: !1, helper: "original", iframeFix: !1, opacity: !1, refreshPositions: !1, revert: !1, revertDuration: 500, scope: "default", scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, snap: !1, snapMode: "both", snapTolerance: 20, stack: !1, zIndex: !1}, _create: function () {
        this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
    }, destroy: function () {
        if (!this.element.data("draggable"))return;
        return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this
    }, _mouseCapture: function (b) {
        var c = this.options;
        return this.helper || c.disabled || a(b.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(b), this.handle ? (c.iframeFix && a(c.iframeFix === !0 ? "iframe" : c.iframeFix).each(function () {
            a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width: this.offsetWidth + "px", height: this.offsetHeight + "px", position: "absolute", opacity: "0.001", zIndex: 1e3}).css(a(this).offset()).appendTo("body")
        }), !0) : !1)
    }, _mouseStart: function (b) {
        var c = this.options;
        return this.helper = this._createHelper(b), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left}, a.extend(this.offset, {click: {left: b.pageX - this.offset.left, top: b.pageY - this.offset.top}, parent: this._getParentOffset(), relative: this._getRelativeOffset()}), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), c.containment && this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.helper.addClass("ui-draggable-dragging"), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
    }, _mouseDrag: function (b, c) {
        this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute");
        if (!c) {
            var d = this._uiHash();
            if (this._trigger("drag", b, d) === !1)return this._mouseUp({}), !1;
            this.position = d.position
        }
        if (!this.options.axis || this.options.axis != "y")this.helper[0].style.left = this.position.left + "px";
        if (!this.options.axis || this.options.axis != "x")this.helper[0].style.top = this.position.top + "px";
        return a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
    }, _mouseStop: function (b) {
        var c = !1;
        a.ui.ddmanager && !this.options.dropBehaviour && (c = a.ui.ddmanager.drop(this, b)), this.dropped && (c = this.dropped, this.dropped = !1);
        if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original")return!1;
        if (this.options.revert == "invalid" && !c || this.options.revert == "valid" && c || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
            var d = this;
            a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                d._trigger("stop", b) !== !1 && d._clear()
            })
        } else this._trigger("stop", b) !== !1 && this._clear();
        return!1
    }, _mouseUp: function (b) {
        return this.options.iframeFix === !0 && a("div.ui-draggable-iframeFix").each(function () {
            this.parentNode.removeChild(this)
        }), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), a.ui.mouse.prototype._mouseUp.call(this, b)
    }, cancel: function () {
        return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
    }, _getHandle: function (b) {
        var c = !this.options.handle || !a(this.options.handle, this.element).length ? !0 : !1;
        return a(this.options.handle, this.element).find("*").andSelf().each(function () {
            this == b.target && (c = !0)
        }), c
    }, _createHelper: function (b) {
        var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : c.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
        return d.parents("body").length || d.appendTo(c.appendTo == "parent" ? this.element[0].parentNode : c.appendTo), d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css("position")) && d.css("position", "absolute"), d
    }, _adjustOffsetFromHelper: function (b) {
        typeof b == "string" && (b = b.split(" ")), a.isArray(b) && (b = {left: +b[0], top: +b[1] || 0}), "left"in b && (this.offset.click.left = b.left + this.margins.left), "right"in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top"in b && (this.offset.click.top = b.top + this.margins.top), "bottom"in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
    }, _getParentOffset: function () {
        this.offsetParent = this.helper.offsetParent();
        var b = this.offsetParent.offset();
        this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
        if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)b = {top: 0, left: 0};
        return{top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
    }, _getRelativeOffset: function () {
        if (this.cssPosition == "relative") {
            var a = this.element.position();
            return{top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
        }
        return{top: 0, left: 0}
    }, _cacheMargins: function () {
        this.margins = {left: parseInt(this.element.css("marginLeft"), 10) || 0, top: parseInt(this.element.css("marginTop"), 10) || 0, right: parseInt(this.element.css("marginRight"), 10) || 0, bottom: parseInt(this.element.css("marginBottom"), 10) || 0}
    }, _cacheHelperProportions: function () {
        this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
    }, _setContainment: function () {
        var b = this.options;
        b.containment == "parent" && (b.containment = this.helper[0].parentNode);
        if (b.containment == "document" || b.containment == "window")this.containment = [b.containment == "document" ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, b.containment == "document" ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (b.containment == "document" ? 0 : a(window).scrollLeft()) + a(b.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (b.containment == "document" ? 0 : a(window).scrollTop()) + (a(b.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
        if (!/^(document|window|parent)$/.test(b.containment) && b.containment.constructor != Array) {
            var c = a(b.containment), d = c[0];
            if (!d)return;
            var e = c.offset(), f = a(d).css("overflow") != "hidden";
            this.containment = [(parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0), (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0), (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = c
        } else b.containment.constructor == Array && (this.containment = b.containment)
    }, _convertPositionTo: function (b, c) {
        c || (c = this.position);
        var d = b == "absolute" ? 1 : -1, e = this.options, f = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = /(html|body)/i.test(f[0].tagName);
        return{top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d), left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)}
    }, _generatePosition: function (b) {
        var c = this.options, d = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, e = /(html|body)/i.test(d[0].tagName), f = b.pageX, g = b.pageY;
        if (this.originalPosition) {
            var h;
            if (this.containment) {
                if (this.relative_container) {
                    var i = this.relative_container.offset();
                    h = [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]
                } else h = this.containment;
                b.pageX - this.offset.click.left < h[0] && (f = h[0] + this.offset.click.left), b.pageY - this.offset.click.top < h[1] && (g = h[1] + this.offset.click.top), b.pageX - this.offset.click.left > h[2] && (f = h[2] + this.offset.click.left), b.pageY - this.offset.click.top > h[3] && (g = h[3] + this.offset.click.top)
            }
            if (c.grid) {
                var j = c.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
                g = h ? j - this.offset.click.top < h[1] || j - this.offset.click.top > h[3] ? j - this.offset.click.top < h[1] ? j + c.grid[1] : j - c.grid[1] : j : j;
                var k = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
                f = h ? k - this.offset.click.left < h[0] || k - this.offset.click.left > h[2] ? k - this.offset.click.left < h[0] ? k + c.grid[0] : k - c.grid[0] : k : k
            }
        }
        return{top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()), left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())}
    }, _clear: function () {
        this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
    }, _trigger: function (b, c, d) {
        return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d]), b == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), a.Widget.prototype._trigger.call(this, b, c, d)
    }, plugins: {}, _uiHash: function (a) {
        return{helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs}
    }}), a.extend(a.ui.draggable, {version: "1.8.19"}), a.ui.plugin.add("draggable", "connectToSortable", {start: function (b, c) {
        var d = a(this).data("draggable"), e = d.options, f = a.extend({}, c, {item: d.element});
        d.sortables = [], a(e.connectToSortable).each(function () {
            var c = a.data(this, "sortable");
            c && !c.options.disabled && (d.sortables.push({instance: c, shouldRevert: c.options.revert}), c.refreshPositions(), c._trigger("activate", b, f))
        })
    }, stop: function (b, c) {
        var d = a(this).data("draggable"), e = a.extend({}, c, {item: d.element});
        a.each(d.sortables, function () {
            this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, d.options.helper == "original" && this.instance.currentItem.css({top: "auto", left: "auto"})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e))
        })
    }, drag: function (b, c) {
        var d = a(this).data("draggable"), e = this, f = function (b) {
            var c = this.offset.click.top, d = this.offset.click.left, e = this.positionAbs.top, f = this.positionAbs.left, g = b.height, h = b.width, i = b.top, j = b.left;
            return a.ui.isOver(e + c, f + d, i, j, g, h)
        };
        a.each(d.sortables, function (f) {
            this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
                return c.helper[0]
            }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
        })
    }}), a.ui.plugin.add("draggable", "cursor", {start: function (b, c) {
        var d = a("body"), e = a(this).data("draggable").options;
        d.css("cursor") && (e._cursor = d.css("cursor")), d.css("cursor", e.cursor)
    }, stop: function (b, c) {
        var d = a(this).data("draggable").options;
        d._cursor && a("body").css("cursor", d._cursor)
    }}), a.ui.plugin.add("draggable", "opacity", {start: function (b, c) {
        var d = a(c.helper), e = a(this).data("draggable").options;
        d.css("opacity") && (e._opacity = d.css("opacity")), d.css("opacity", e.opacity)
    }, stop: function (b, c) {
        var d = a(this).data("draggable").options;
        d._opacity && a(c.helper).css("opacity", d._opacity)
    }}), a.ui.plugin.add("draggable", "scroll", {start: function (b, c) {
        var d = a(this).data("draggable");
        d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML" && (d.overflowOffset = d.scrollParent.offset())
    }, drag: function (b, c) {
        var d = a(this).data("draggable"), e = d.options, f = !1;
        if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
            if (!e.axis || e.axis != "x")d.overflowOffset.top + d.scrollParent[0].offsetHeight - b.pageY < e.scrollSensitivity ? d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop - e.scrollSpeed);
            if (!e.axis || e.axis != "y")d.overflowOffset.left + d.scrollParent[0].offsetWidth - b.pageX < e.scrollSensitivity ? d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft - e.scrollSpeed)
        } else {
            if (!e.axis || e.axis != "x")b.pageY - a(document).scrollTop() < e.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < e.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed));
            if (!e.axis || e.axis != "y")b.pageX - a(document).scrollLeft() < e.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < e.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed))
        }
        f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
    }}), a.ui.plugin.add("draggable", "snap", {start: function (b, c) {
        var d = a(this).data("draggable"), e = d.options;
        d.snapElements = [], a(e.snap.constructor != String ? e.snap.items || ":data(draggable)" : e.snap).each(function () {
            var b = a(this), c = b.offset();
            this != d.element[0] && d.snapElements.push({item: this, width: b.outerWidth(), height: b.outerHeight(), top: c.top, left: c.left})
        })
    }, drag: function (b, c) {
        var d = a(this).data("draggable"), e = d.options, f = e.snapTolerance, g = c.offset.left, h = g + d.helperProportions.width, i = c.offset.top, j = i + d.helperProportions.height;
        for (var k = d.snapElements.length - 1; k >= 0; k--) {
            var l = d.snapElements[k].left, m = l + d.snapElements[k].width, n = d.snapElements[k].top, o = n + d.snapElements[k].height;
            if (!(l - f < g && g < m + f && n - f < i && i < o + f || l - f < g && g < m + f && n - f < j && j < o + f || l - f < h && h < m + f && n - f < i && i < o + f || l - f < h && h < m + f && n - f < j && j < o + f)) {
                d.snapElements[k].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {snapItem: d.snapElements[k].item})), d.snapElements[k].snapping = !1;
                continue
            }
            if (e.snapMode != "inner") {
                var p = Math.abs(n - j) <= f, q = Math.abs(o - i) <= f, r = Math.abs(l - h) <= f, s = Math.abs(m - g) <= f;
                p && (c.position.top = d._convertPositionTo("relative", {top: n - d.helperProportions.height, left: 0}).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {top: o, left: 0}).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {top: 0, left: l - d.helperProportions.width}).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {top: 0, left: m}).left - d.margins.left)
            }
            var t = p || q || r || s;
            if (e.snapMode != "outer") {
                var p = Math.abs(n - i) <= f, q = Math.abs(o - j) <= f, r = Math.abs(l - g) <= f, s = Math.abs(m - h) <= f;
                p && (c.position.top = d._convertPositionTo("relative", {top: n, left: 0}).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {top: o - d.helperProportions.height, left: 0}).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {top: 0, left: l}).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {top: 0, left: m - d.helperProportions.width}).left - d.margins.left)
            }
            !d.snapElements[k].snapping && (p || q || r || s || t) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {snapItem: d.snapElements[k].item})), d.snapElements[k].snapping = p || q || r || s || t
        }
    }}), a.ui.plugin.add("draggable", "stack", {start: function (b, c) {
        var d = a(this).data("draggable").options, e = a.makeArray(a(d.stack)).sort(function (b, c) {
            return(parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
        });
        if (!e.length)return;
        var f = parseInt(e[0].style.zIndex) || 0;
        a(e).each(function (a) {
            this.style.zIndex = f + a
        }), this[0].style.zIndex = f + e.length
    }}), a.ui.plugin.add("draggable", "zIndex", {start: function (b, c) {
        var d = a(c.helper), e = a(this).data("draggable").options;
        d.css("zIndex") && (e._zIndex = d.css("zIndex")), d.css("zIndex", e.zIndex)
    }, stop: function (b, c) {
        var d = a(this).data("draggable").options;
        d._zIndex && a(c.helper).css("zIndex", d._zIndex)
    }})
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.droppable.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.widget("ui.droppable", {widgetEventPrefix: "drop", options: {accept: "*", activeClass: !1, addClasses: !0, greedy: !1, hoverClass: !1, scope: "default", tolerance: "intersect"}, _create: function () {
        var b = this.options, c = b.accept;
        this.isover = 0, this.isout = 1, this.accept = a.isFunction(c) ? c : function (a) {
            return a.is(c)
        }, this.proportions = {width: this.element[0].offsetWidth, height: this.element[0].offsetHeight}, a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [], a.ui.ddmanager.droppables[b.scope].push(this), b.addClasses && this.element.addClass("ui-droppable")
    }, destroy: function () {
        var b = a.ui.ddmanager.droppables[this.options.scope];
        for (var c = 0; c < b.length; c++)b[c] == this && b.splice(c, 1);
        return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), this
    }, _setOption: function (b, c) {
        b == "accept" && (this.accept = a.isFunction(c) ? c : function (a) {
            return a.is(c)
        }), a.Widget.prototype._setOption.apply(this, arguments)
    }, _activate: function (b) {
        var c = a.ui.ddmanager.current;
        this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c))
    }, _deactivate: function (b) {
        var c = a.ui.ddmanager.current;
        this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c))
    }, _over: function (b) {
        var c = a.ui.ddmanager.current;
        if (!c || (c.currentItem || c.element)[0] == this.element[0])return;
        this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)))
    }, _out: function (b) {
        var c = a.ui.ddmanager.current;
        if (!c || (c.currentItem || c.element)[0] == this.element[0])return;
        this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
    }, _drop: function (b, c) {
        var d = c || a.ui.ddmanager.current;
        if (!d || (d.currentItem || d.element)[0] == this.element[0])return!1;
        var e = !1;
        return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
            var b = a.data(this, "droppable");
            if (b.options.greedy && !b.options.disabled && b.options.scope == d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, {offset: b.element.offset()}), b.options.tolerance))return e = !0, !1
        }), e ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element) : !1
    }, ui: function (a) {
        return{draggable: a.currentItem || a.element, helper: a.helper, position: a.position, offset: a.positionAbs}
    }}), a.extend(a.ui.droppable, {version: "1.8.19"}), a.ui.intersect = function (b, c, d) {
        if (!c.offset)return!1;
        var e = (b.positionAbs || b.position.absolute).left, f = e + b.helperProportions.width, g = (b.positionAbs || b.position.absolute).top, h = g + b.helperProportions.height, i = c.offset.left, j = i + c.proportions.width, k = c.offset.top, l = k + c.proportions.height;
        switch (d) {
            case"fit":
                return i <= e && f <= j && k <= g && h <= l;
            case"intersect":
                return i < e + b.helperProportions.width / 2 && f - b.helperProportions.width / 2 < j && k < g + b.helperProportions.height / 2 && h - b.helperProportions.height / 2 < l;
            case"pointer":
                var m = (b.positionAbs || b.position.absolute).left + (b.clickOffset || b.offset.click).left, n = (b.positionAbs || b.position.absolute).top + (b.clickOffset || b.offset.click).top, o = a.ui.isOver(n, m, k, i, c.proportions.height, c.proportions.width);
                return o;
            case"touch":
                return(g >= k && g <= l || h >= k && h <= l || g < k && h > l) && (e >= i && e <= j || f >= i && f <= j || e < i && f > j);
            default:
                return!1
        }
    }, a.ui.ddmanager = {current: null, droppables: {"default": []}, prepareOffsets: function (b, c) {
        var d = a.ui.ddmanager.droppables[b.options.scope] || [], e = c ? c.type : null, f = (b.currentItem || b.element).find(":data(droppable)").andSelf();
        g:for (var h = 0; h < d.length; h++) {
            if (d[h].options.disabled || b && !d[h].accept.call(d[h].element[0], b.currentItem || b.element))continue;
            for (var i = 0; i < f.length; i++)if (f[i] == d[h].element[0]) {
                d[h].proportions.height = 0;
                continue g
            }
            d[h].visible = d[h].element.css("display") != "none";
            if (!d[h].visible)continue;
            e == "mousedown" && d[h]._activate.call(d[h], c), d[h].offset = d[h].element.offset(), d[h].proportions = {width: d[h].element[0].offsetWidth, height: d[h].element[0].offsetHeight}
        }
    }, drop: function (b, c) {
        var d = !1;
        return a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
            if (!this.options)return;
            !this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, c))
        }), d
    }, dragStart: function (b, c) {
        b.element.parents(":not(body,html)").bind("scroll.droppable", function () {
            b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
        })
    }, drag: function (b, c) {
        b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
            if (this.options.disabled || this.greedyChild || !this.visible)return;
            var d = a.ui.intersect(b, this, this.options.tolerance), e = !d && this.isover == 1 ? "isout" : d && this.isover == 0 ? "isover" : null;
            if (!e)return;
            var f;
            if (this.options.greedy) {
                var g = this.element.parents(":data(droppable):eq(0)");
                g.length && (f = a.data(g[0], "droppable"), f.greedyChild = e == "isover" ? 1 : 0)
            }
            f && e == "isover" && (f.isover = 0, f.isout = 1, f._out.call(f, c)), this[e] = 1, this[e == "isout" ? "isover" : "isout"] = 0, this[e == "isover" ? "_over" : "_out"].call(this, c), f && e == "isout" && (f.isout = 0, f.isover = 1, f._over.call(f, c))
        })
    }, dragStop: function (b, c) {
        b.element.parents(":not(body,html)").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
    }}
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.resizable.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.widget("ui.resizable", a.ui.mouse, {widgetEventPrefix: "resize", options: {alsoResize: !1, animate: !1, animateDuration: "slow", animateEasing: "swing", aspectRatio: !1, autoHide: !1, containment: !1, ghost: !1, grid: !1, handles: "e,s,se", helper: !1, maxHeight: null, maxWidth: null, minHeight: 10, minWidth: 10, zIndex: 1e3}, _create: function () {
        var b = this, c = this.options;
        this.element.addClass("ui-resizable"), a.extend(this, {_aspectRatio: !!c.aspectRatio, aspectRatio: c.aspectRatio, originalElement: this.element, _proportionallyResizeElements: [], _helper: c.helper || c.ghost || c.animate ? c.helper || "ui-resizable-helper" : null}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position: this.element.css("position"), width: this.element.outerWidth(), height: this.element.outerHeight(), top: this.element.css("top"), left: this.element.css("left")})), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({marginLeft: this.originalElement.css("marginLeft"), marginTop: this.originalElement.css("marginTop"), marginRight: this.originalElement.css("marginRight"), marginBottom: this.originalElement.css("marginBottom")}), this.originalElement.css({marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({position: "static", zoom: 1, display: "block"})), this.originalElement.css({margin: this.originalElement.css("margin")}), this._proportionallyResize()), this.handles = c.handles || (a(".ui-resizable-handle", this.element).length ? {n: ".ui-resizable-n", e: ".ui-resizable-e", s: ".ui-resizable-s", w: ".ui-resizable-w", se: ".ui-resizable-se", sw: ".ui-resizable-sw", ne: ".ui-resizable-ne", nw: ".ui-resizable-nw"} : "e,s,se");
        if (this.handles.constructor == String) {
            this.handles == "all" && (this.handles = "n,e,s,w,se,sw,ne,nw");
            var d = this.handles.split(",");
            this.handles = {};
            for (var e = 0; e < d.length; e++) {
                var f = a.trim(d[e]), g = "ui-resizable-" + f, h = a('<div class="ui-resizable-handle ' + g + '"></div>');
                /sw|se|ne|nw/.test(f) && h.css({zIndex: ++c.zIndex}), "se" == f && h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[f] = ".ui-resizable-" + f, this.element.append(h)
            }
        }
        this._renderAxis = function (b) {
            b = b || this.element;
            for (var c in this.handles) {
                this.handles[c].constructor == String && (this.handles[c] = a(this.handles[c], this.element).show());
                if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                    var d = a(this.handles[c], this.element), e = 0;
                    e = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth();
                    var f = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join("");
                    b.css(f, e), this._proportionallyResize()
                }
                if (!a(this.handles[c]).length)continue
            }
        }, this._renderAxis(this.element), this._handles = a(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () {
            if (!b.resizing) {
                if (this.className)var a = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                b.axis = a && a[1] ? a[1] : "se"
            }
        }), c.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").hover(function () {
            if (c.disabled)return;
            a(this).removeClass("ui-resizable-autohide"), b._handles.show()
        }, function () {
            if (c.disabled)return;
            b.resizing || (a(this).addClass("ui-resizable-autohide"), b._handles.hide())
        })), this._mouseInit()
    }, destroy: function () {
        this._mouseDestroy();
        var b = function (b) {
            a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
        };
        if (this.elementIsWrapper) {
            b(this.element);
            var c = this.element;
            c.after(this.originalElement.css({position: c.css("position"), width: c.outerWidth(), height: c.outerHeight(), top: c.css("top"), left: c.css("left")})).remove()
        }
        return this.originalElement.css("resize", this.originalResizeStyle), b(this.originalElement), this
    }, _mouseCapture: function (b) {
        var c = !1;
        for (var d in this.handles)a(this.handles[d])[0] == b.target && (c = !0);
        return!this.options.disabled && c
    }, _mouseStart: function (b) {
        var d = this.options, e = this.element.position(), f = this.element;
        this.resizing = !0, this.documentScroll = {top: a(document).scrollTop(), left: a(document).scrollLeft()}, (f.is(".ui-draggable") || /absolute/.test(f.css("position"))) && f.css({position: "absolute", top: e.top, left: e.left}), this._renderProxy();
        var g = c(this.helper.css("left")), h = c(this.helper.css("top"));
        d.containment && (g += a(d.containment).scrollLeft() || 0, h += a(d.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {left: g, top: h}, this.size = this._helper ? {width: f.outerWidth(), height: f.outerHeight()} : {width: f.width(), height: f.height()}, this.originalSize = this._helper ? {width: f.outerWidth(), height: f.outerHeight()} : {width: f.width(), height: f.height()}, this.originalPosition = {left: g, top: h}, this.sizeDiff = {width: f.outerWidth() - f.width(), height: f.outerHeight() - f.height()}, this.originalMousePosition = {left: b.pageX, top: b.pageY}, this.aspectRatio = typeof d.aspectRatio == "number" ? d.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
        var i = a(".ui-resizable-" + this.axis).css("cursor");
        return a("body").css("cursor", i == "auto" ? this.axis + "-resize" : i), f.addClass("ui-resizable-resizing"), this._propagate("start", b), !0
    }, _mouseDrag: function (b) {
        var c = this.helper, d = this.options, e = {}, f = this, g = this.originalMousePosition, h = this.axis, i = b.pageX - g.left || 0, j = b.pageY - g.top || 0, k = this._change[h];
        if (!k)return!1;
        var l = k.apply(this, [b, i, j]), m = a.browser.msie && a.browser.version < 7, n = this.sizeDiff;
        this._updateVirtualBoundaries(b.shiftKey);
        if (this._aspectRatio || b.shiftKey)l = this._updateRatio(l, b);
        return l = this._respectSize(l, b), this._propagate("resize", b), c.css({top: this.position.top + "px", left: this.position.left + "px", width: this.size.width + "px", height: this.size.height + "px"}), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(l), this._trigger("resize", b, this.ui()), !1
    }, _mouseStop: function (b) {
        this.resizing = !1;
        var c = this.options, d = this;
        if (this._helper) {
            var e = this._proportionallyResizeElements, f = e.length && /textarea/i.test(e[0].nodeName), g = f && a.ui.hasScroll(e[0], "left") ? 0 : d.sizeDiff.height, h = f ? 0 : d.sizeDiff.width, i = {width: d.helper.width() - h, height: d.helper.height() - g}, j = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null, k = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
            c.animate || this.element.css(a.extend(i, {top: k, left: j})), d.helper.height(d.size.height), d.helper.width(d.size.width), this._helper && !c.animate && this._proportionallyResize()
        }
        return a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove(), !1
    }, _updateVirtualBoundaries: function (a) {
        var b = this.options, c, e, f, g, h;
        h = {minWidth: d(b.minWidth) ? b.minWidth : 0, maxWidth: d(b.maxWidth) ? b.maxWidth : Infinity, minHeight: d(b.minHeight) ? b.minHeight : 0, maxHeight: d(b.maxHeight) ? b.maxHeight : Infinity};
        if (this._aspectRatio || a)c = h.minHeight * this.aspectRatio, f = h.minWidth / this.aspectRatio, e = h.maxHeight * this.aspectRatio, g = h.maxWidth / this.aspectRatio, c > h.minWidth && (h.minWidth = c), f > h.minHeight && (h.minHeight = f), e < h.maxWidth && (h.maxWidth = e), g < h.maxHeight && (h.maxHeight = g);
        this._vBoundaries = h
    }, _updateCache: function (a) {
        var b = this.options;
        this.offset = this.helper.offset(), d(a.left) && (this.position.left = a.left), d(a.top) && (this.position.top = a.top), d(a.height) && (this.size.height = a.height), d(a.width) && (this.size.width = a.width)
    }, _updateRatio: function (a, b) {
        var c = this.options, e = this.position, f = this.size, g = this.axis;
        return d(a.height) ? a.width = a.height * this.aspectRatio : d(a.width) && (a.height = a.width / this.aspectRatio), g == "sw" && (a.left = e.left + (f.width - a.width), a.top = null), g == "nw" && (a.top = e.top + (f.height - a.height), a.left = e.left + (f.width - a.width)), a
    }, _respectSize: function (a, b) {
        var c = this.helper, e = this._vBoundaries, f = this._aspectRatio || b.shiftKey, g = this.axis, h = d(a.width) && e.maxWidth && e.maxWidth < a.width, i = d(a.height) && e.maxHeight && e.maxHeight < a.height, j = d(a.width) && e.minWidth && e.minWidth > a.width, k = d(a.height) && e.minHeight && e.minHeight > a.height;
        j && (a.width = e.minWidth), k && (a.height = e.minHeight), h && (a.width = e.maxWidth), i && (a.height = e.maxHeight);
        var l = this.originalPosition.left + this.originalSize.width, m = this.position.top + this.size.height, n = /sw|nw|w/.test(g), o = /nw|ne|n/.test(g);
        j && n && (a.left = l - e.minWidth), h && n && (a.left = l - e.maxWidth), k && o && (a.top = m - e.minHeight), i && o && (a.top = m - e.maxHeight);
        var p = !a.width && !a.height;
        return p && !a.left && a.top ? a.top = null : p && !a.top && a.left && (a.left = null), a
    }, _proportionallyResize: function () {
        var b = this.options;
        if (!this._proportionallyResizeElements.length)return;
        var c = this.helper || this.element;
        for (var d = 0; d < this._proportionallyResizeElements.length; d++) {
            var e = this._proportionallyResizeElements[d];
            if (!this.borderDif) {
                var f = [e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth")], g = [e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft")];
                this.borderDif = a.map(f, function (a, b) {
                    var c = parseInt(a, 10) || 0, d = parseInt(g[b], 10) || 0;
                    return c + d
                })
            }
            if (!a.browser.msie || !a(c).is(":hidden") && !a(c).parents(":hidden").length)e.css({height: c.height() - this.borderDif[0] - this.borderDif[2] || 0, width: c.width() - this.borderDif[1] - this.borderDif[3] || 0}); else continue
        }
    }, _renderProxy: function () {
        var b = this.element, c = this.options;
        this.elementOffset = b.offset();
        if (this._helper) {
            this.helper = this.helper || a('<div style="overflow:hidden;"></div>');
            var d = a.browser.msie && a.browser.version < 7, e = d ? 1 : 0, f = d ? 2 : -1;
            this.helper.addClass(this._helper).css({width: this.element.outerWidth() + f, height: this.element.outerHeight() + f, position: "absolute", left: this.elementOffset.left - e + "px", top: this.elementOffset.top - e + "px", zIndex: ++c.zIndex}), this.helper.appendTo("body").disableSelection()
        } else this.helper = this.element
    }, _change: {e: function (a, b, c) {
        return{width: this.originalSize.width + b}
    }, w: function (a, b, c) {
        var d = this.options, e = this.originalSize, f = this.originalPosition;
        return{left: f.left + b, width: e.width - b}
    }, n: function (a, b, c) {
        var d = this.options, e = this.originalSize, f = this.originalPosition;
        return{top: f.top + c, height: e.height - c}
    }, s: function (a, b, c) {
        return{height: this.originalSize.height + c}
    }, se: function (b, c, d) {
        return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
    }, sw: function (b, c, d) {
        return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
    }, ne: function (b, c, d) {
        return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
    }, nw: function (b, c, d) {
        return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
    }}, _propagate: function (b, c) {
        a.ui.plugin.call(this, b, [c, this.ui()]), b != "resize" && this._trigger(b, c, this.ui())
    }, plugins: {}, ui: function () {
        return{originalElement: this.originalElement, element: this.element, helper: this.helper, position: this.position, size: this.size, originalSize: this.originalSize, originalPosition: this.originalPosition}
    }}), a.extend(a.ui.resizable, {version: "1.8.19"}), a.ui.plugin.add("resizable", "alsoResize", {start: function (b, c) {
        var d = a(this).data("resizable"), e = d.options, f = function (b) {
            a(b).each(function () {
                var b = a(this);
                b.data("resizable-alsoresize", {width: parseInt(b.width(), 10), height: parseInt(b.height(), 10), left: parseInt(b.css("left"), 10), top: parseInt(b.css("top"), 10)})
            })
        };
        typeof e.alsoResize == "object" && !e.alsoResize.parentNode ? e.alsoResize.length ? (e.alsoResize = e.alsoResize[0], f(e.alsoResize)) : a.each(e.alsoResize, function (a) {
            f(a)
        }) : f(e.alsoResize)
    }, resize: function (b, c) {
        var d = a(this).data("resizable"), e = d.options, f = d.originalSize, g = d.originalPosition, h = {height: d.size.height - f.height || 0, width: d.size.width - f.width || 0, top: d.position.top - g.top || 0, left: d.position.left - g.left || 0}, i = function (b, d) {
            a(b).each(function () {
                var b = a(this), e = a(this).data("resizable-alsoresize"), f = {}, g = d && d.length ? d : b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                a.each(g, function (a, b) {
                    var c = (e[b] || 0) + (h[b] || 0);
                    c && c >= 0 && (f[b] = c || null)
                }), b.css(f)
            })
        };
        typeof e.alsoResize == "object" && !e.alsoResize.nodeType ? a.each(e.alsoResize, function (a, b) {
            i(a, b)
        }) : i(e.alsoResize)
    }, stop: function (b, c) {
        a(this).removeData("resizable-alsoresize")
    }}), a.ui.plugin.add("resizable", "animate", {stop: function (b, c) {
        var d = a(this).data("resizable"), e = d.options, f = d._proportionallyResizeElements, g = f.length && /textarea/i.test(f[0].nodeName), h = g && a.ui.hasScroll(f[0], "left") ? 0 : d.sizeDiff.height, i = g ? 0 : d.sizeDiff.width, j = {width: d.size.width - i, height: d.size.height - h}, k = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null, l = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
        d.element.animate(a.extend(j, l && k ? {top: l, left: k} : {}), {duration: e.animateDuration, easing: e.animateEasing, step: function () {
            var c = {width: parseInt(d.element.css("width"), 10), height: parseInt(d.element.css("height"), 10), top: parseInt(d.element.css("top"), 10), left: parseInt(d.element.css("left"), 10)};
            f && f.length && a(f[0]).css({width: c.width, height: c.height}), d._updateCache(c), d._propagate("resize", b)
        }})
    }}), a.ui.plugin.add("resizable", "containment", {start: function (b, d) {
        var e = a(this).data("resizable"), f = e.options, g = e.element, h = f.containment, i = h instanceof a ? h.get(0) : /parent/.test(h) ? g.parent().get(0) : h;
        if (!i)return;
        e.containerElement = a(i);
        if (/document/.test(h) || h == document)e.containerOffset = {left: 0, top: 0}, e.containerPosition = {left: 0, top: 0}, e.parentData = {element: a(document), left: 0, top: 0, width: a(document).width(), height: a(document).height() || document.body.parentNode.scrollHeight}; else {
            var j = a(i), k = [];
            a(["Top", "Right", "Left", "Bottom"]).each(function (a, b) {
                k[a] = c(j.css("padding" + b))
            }), e.containerOffset = j.offset(), e.containerPosition = j.position(), e.containerSize = {height: j.innerHeight() - k[3], width: j.innerWidth() - k[1]};
            var l = e.containerOffset, m = e.containerSize.height, n = e.containerSize.width, o = a.ui.hasScroll(i, "left") ? i.scrollWidth : n, p = a.ui.hasScroll(i) ? i.scrollHeight : m;
            e.parentData = {element: i, left: l.left, top: l.top, width: o, height: p}
        }
    }, resize: function (b, c) {
        var d = a(this).data("resizable"), e = d.options, f = d.containerSize, g = d.containerOffset, h = d.size, i = d.position, j = d._aspectRatio || b.shiftKey, k = {top: 0, left: 0}, l = d.containerElement;
        l[0] != document && /static/.test(l.css("position")) && (k = g), i.left < (d._helper ? g.left : 0) && (d.size.width = d.size.width + (d._helper ? d.position.left - g.left : d.position.left - k.left), j && (d.size.height = d.size.width / d.aspectRatio), d.position.left = e.helper ? g.left : 0), i.top < (d._helper ? g.top : 0) && (d.size.height = d.size.height + (d._helper ? d.position.top - g.top : d.position.top), j && (d.size.width = d.size.height * d.aspectRatio), d.position.top = d._helper ? g.top : 0), d.offset.left = d.parentData.left + d.position.left, d.offset.top = d.parentData.top + d.position.top;
        var m = Math.abs((d._helper ? d.offset.left - k.left : d.offset.left - k.left) + d.sizeDiff.width), n = Math.abs((d._helper ? d.offset.top - k.top : d.offset.top - g.top) + d.sizeDiff.height), o = d.containerElement.get(0) == d.element.parent().get(0), p = /relative|absolute/.test(d.containerElement.css("position"));
        o && p && (m -= d.parentData.left), m + d.size.width >= d.parentData.width && (d.size.width = d.parentData.width - m, j && (d.size.height = d.size.width / d.aspectRatio)), n + d.size.height >= d.parentData.height && (d.size.height = d.parentData.height - n, j && (d.size.width = d.size.height * d.aspectRatio))
    }, stop: function (b, c) {
        var d = a(this).data("resizable"), e = d.options, f = d.position, g = d.containerOffset, h = d.containerPosition, i = d.containerElement, j = a(d.helper), k = j.offset(), l = j.outerWidth() - d.sizeDiff.width, m = j.outerHeight() - d.sizeDiff.height;
        d._helper && !e.animate && /relative/.test(i.css("position")) && a(this).css({left: k.left - h.left - g.left, width: l, height: m}), d._helper && !e.animate && /static/.test(i.css("position")) && a(this).css({left: k.left - h.left - g.left, width: l, height: m})
    }}), a.ui.plugin.add("resizable", "ghost", {start: function (b, c) {
        var d = a(this).data("resizable"), e = d.options, f = d.size;
        d.ghost = d.originalElement.clone(), d.ghost.css({opacity: .25, display: "block", position: "relative", height: f.height, width: f.width, margin: 0, left: 0, top: 0}).addClass("ui-resizable-ghost").addClass(typeof e.ghost == "string" ? e.ghost : ""), d.ghost.appendTo(d.helper)
    }, resize: function (b, c) {
        var d = a(this).data("resizable"), e = d.options;
        d.ghost && d.ghost.css({position: "relative", height: d.size.height, width: d.size.width})
    }, stop: function (b, c) {
        var d = a(this).data("resizable"), e = d.options;
        d.ghost && d.helper && d.helper.get(0).removeChild(d.ghost.get(0))
    }}), a.ui.plugin.add("resizable", "grid", {resize: function (b, c) {
        var d = a(this).data("resizable"), e = d.options, f = d.size, g = d.originalSize, h = d.originalPosition, i = d.axis, j = e._aspectRatio || b.shiftKey;
        e.grid = typeof e.grid == "number" ? [e.grid, e.grid] : e.grid;
        var k = Math.round((f.width - g.width) / (e.grid[0] || 1)) * (e.grid[0] || 1), l = Math.round((f.height - g.height) / (e.grid[1] || 1)) * (e.grid[1] || 1);
        /^(se|s|e)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l) : /^(ne)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l) : /^(sw)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.left = h.left - k) : (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l, d.position.left = h.left - k)
    }});
    var c = function (a) {
        return parseInt(a, 10) || 0
    }, d = function (a) {
        return!isNaN(parseInt(a, 10))
    }
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.selectable.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.widget("ui.selectable", a.ui.mouse, {options: {appendTo: "body", autoRefresh: !0, distance: 0, filter: "*", tolerance: "touch"}, _create: function () {
        var b = this;
        this.element.addClass("ui-selectable"), this.dragged = !1;
        var c;
        this.refresh = function () {
            c = a(b.options.filter, b.element[0]), c.addClass("ui-selectee"), c.each(function () {
                var b = a(this), c = b.offset();
                a.data(this, "selectable-item", {element: this, $element: b, left: c.left, top: c.top, right: c.left + b.outerWidth(), bottom: c.top + b.outerHeight(), startselected: !1, selected: b.hasClass("ui-selected"), selecting: b.hasClass("ui-selecting"), unselecting: b.hasClass("ui-unselecting")})
            })
        }, this.refresh(), this.selectees = c.addClass("ui-selectee"), this._mouseInit(), this.helper = a("<div class='ui-selectable-helper'></div>")
    }, destroy: function () {
        return this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"), this._mouseDestroy(), this
    }, _mouseStart: function (b) {
        var c = this;
        this.opos = [b.pageX, b.pageY];
        if (this.options.disabled)return;
        var d = this.options;
        this.selectees = a(d.filter, this.element[0]), this._trigger("start", b), a(d.appendTo).append(this.helper), this.helper.css({left: b.clientX, top: b.clientY, width: 0, height: 0}), d.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
            var d = a.data(this, "selectable-item");
            d.startselected = !0, !b.metaKey && !b.ctrlKey && (d.$element.removeClass("ui-selected"), d.selected = !1, d.$element.addClass("ui-unselecting"), d.unselecting = !0, c._trigger("unselecting", b, {unselecting: d.element}))
        }), a(b.target).parents().andSelf().each(function () {
            var d = a.data(this, "selectable-item");
            if (d) {
                var e = !b.metaKey && !b.ctrlKey || !d.$element.hasClass("ui-selected");
                return d.$element.removeClass(e ? "ui-unselecting" : "ui-selected").addClass(e ? "ui-selecting" : "ui-unselecting"), d.unselecting = !e, d.selecting = e, d.selected = e, e ? c._trigger("selecting", b, {selecting: d.element}) : c._trigger("unselecting", b, {unselecting: d.element}), !1
            }
        })
    }, _mouseDrag: function (b) {
        var c = this;
        this.dragged = !0;
        if (this.options.disabled)return;
        var d = this.options, e = this.opos[0], f = this.opos[1], g = b.pageX, h = b.pageY;
        if (e > g) {
            var i = g;
            g = e, e = i
        }
        if (f > h) {
            var i = h;
            h = f, f = i
        }
        return this.helper.css({left: e, top: f, width: g - e, height: h - f}), this.selectees.each(function () {
            var i = a.data(this, "selectable-item");
            if (!i || i.element == c.element[0])return;
            var j = !1;
            d.tolerance == "touch" ? j = !(i.left > g || i.right < e || i.top > h || i.bottom < f) : d.tolerance == "fit" && (j = i.left > e && i.right < g && i.top > f && i.bottom < h), j ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, c._trigger("selecting", b, {selecting: i.element}))) : (i.selecting && ((b.metaKey || b.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), c._trigger("unselecting", b, {unselecting: i.element}))), i.selected && !b.metaKey && !b.ctrlKey && !i.startselected && (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, c._trigger("unselecting", b, {unselecting: i.element})))
        }), !1
    }, _mouseStop: function (b) {
        var c = this;
        this.dragged = !1;
        var d = this.options;
        return a(".ui-unselecting", this.element[0]).each(function () {
            var d = a.data(this, "selectable-item");
            d.$element.removeClass("ui-unselecting"), d.unselecting = !1, d.startselected = !1, c._trigger("unselected", b, {unselected: d.element})
        }), a(".ui-selecting", this.element[0]).each(function () {
            var d = a.data(this, "selectable-item");
            d.$element.removeClass("ui-selecting").addClass("ui-selected"), d.selecting = !1, d.selected = !0, d.startselected = !0, c._trigger("selected", b, {selected: d.element})
        }), this._trigger("stop", b), this.helper.remove(), !1
    }}), a.extend(a.ui.selectable, {version: "1.8.19"})
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.sortable.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.widget("ui.sortable", a.ui.mouse, {widgetEventPrefix: "sort", ready: !1, options: {appendTo: "parent", axis: !1, connectWith: !1, containment: !1, cursor: "auto", cursorAt: !1, dropOnEmpty: !0, forcePlaceholderSize: !1, forceHelperSize: !1, grid: !1, handle: !1, helper: "original", items: "> *", opacity: !1, placeholder: !1, revert: !1, scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, scope: "default", tolerance: "intersect", zIndex: 1e3}, _create: function () {
        var a = this.options;
        this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? a.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
    }, destroy: function () {
        a.Widget.prototype.destroy.call(this), this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
        for (var b = this.items.length - 1; b >= 0; b--)this.items[b].item.removeData(this.widgetName + "-item");
        return this
    }, _setOption: function (b, c) {
        b === "disabled" ? (this.options[b] = c, this.widget()[c ? "addClass" : "removeClass"]("ui-sortable-disabled")) : a.Widget.prototype._setOption.apply(this, arguments)
    }, _mouseCapture: function (b, c) {
        var d = this;
        if (this.reverting)return!1;
        if (this.options.disabled || this.options.type == "static")return!1;
        this._refreshItems(b);
        var e = null, f = this, g = a(b.target).parents().each(function () {
            if (a.data(this, d.widgetName + "-item") == f)return e = a(this), !1
        });
        a.data(b.target, d.widgetName + "-item") == f && (e = a(b.target));
        if (!e)return!1;
        if (this.options.handle && !c) {
            var h = !1;
            a(this.options.handle, e).find("*").andSelf().each(function () {
                this == b.target && (h = !0)
            });
            if (!h)return!1
        }
        return this.currentItem = e, this._removeCurrentsFromItems(), !0
    }, _mouseStart: function (b, c, d) {
        var e = this.options, f = this;
        this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left}, this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), a.extend(this.offset, {click: {left: b.pageX - this.offset.left, top: b.pageY - this.offset.top}, parent: this._getParentOffset(), relative: this._getRelativeOffset()}), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt), this.domPosition = {prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0]}, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), e.containment && this._setContainment(), e.cursor && (a("body").css("cursor") && (this._storedCursor = a("body").css("cursor")), a("body").css("cursor", e.cursor)), e.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", e.opacity)), e.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", e.zIndex)), this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions();
        if (!d)for (var g = this.containers.length - 1; g >= 0; g--)this.containers[g]._trigger("activate", b, f._uiHash(this));
        return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(b), !0
    }, _mouseDrag: function (b) {
        this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
        if (this.options.scroll) {
            var c = this.options, d = !1;
            this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < c.scrollSensitivity ? this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop + c.scrollSpeed : b.pageY - this.overflowOffset.top < c.scrollSensitivity && (this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop - c.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < c.scrollSensitivity ? this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft + c.scrollSpeed : b.pageX - this.overflowOffset.left < c.scrollSensitivity && (this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft - c.scrollSpeed)) : (b.pageY - a(document).scrollTop() < c.scrollSensitivity ? d = a(document).scrollTop(a(document).scrollTop() - c.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < c.scrollSensitivity && (d = a(document).scrollTop(a(document).scrollTop() + c.scrollSpeed)), b.pageX - a(document).scrollLeft() < c.scrollSensitivity ? d = a(document).scrollLeft(a(document).scrollLeft() - c.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < c.scrollSensitivity && (d = a(document).scrollLeft(a(document).scrollLeft() + c.scrollSpeed))), d !== !1 && a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)
        }
        this.positionAbs = this._convertPositionTo("absolute");
        if (!this.options.axis || this.options.axis != "y")this.helper[0].style.left = this.position.left + "px";
        if (!this.options.axis || this.options.axis != "x")this.helper[0].style.top = this.position.top + "px";
        for (var e = this.items.length - 1; e >= 0; e--) {
            var f = this.items[e], g = f.item[0], h = this._intersectsWithPointer(f);
            if (!h)continue;
            if (g != this.currentItem[0] && this.placeholder[h == 1 ? "next" : "prev"]()[0] != g && !a.ui.contains(this.placeholder[0], g) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], g) : !0)) {
                this.direction = h == 1 ? "down" : "up";
                if (this.options.tolerance == "pointer" || this._intersectsWithSides(f))this._rearrange(b, f); else break;
                this._trigger("change", b, this._uiHash());
                break
            }
        }
        return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
    }, _mouseStop: function (b, c) {
        if (!b)return;
        a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b);
        if (this.options.revert) {
            var d = this, e = d.placeholder.offset();
            d.reverting = !0, a(this.helper).animate({left: e.left - this.offset.parent.left - d.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft), top: e.top - this.offset.parent.top - d.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)}, parseInt(this.options.revert, 10) || 500, function () {
                d._clear(b)
            })
        } else this._clear(b, c);
        return!1
    }, cancel: function () {
        var b = this;
        if (this.dragging) {
            this._mouseUp({target: null}), this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
            for (var c = this.containers.length - 1; c >= 0; c--)this.containers[c]._trigger("deactivate", null, b._uiHash(this)), this.containers[c].containerCache.over && (this.containers[c]._trigger("out", null, b._uiHash(this)), this.containers[c].containerCache.over = 0)
        }
        return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {helper: null, dragging: !1, reverting: !1, _noFinalSort: null}), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this
    }, serialize: function (b) {
        var c = this._getItemsAsjQuery(b && b.connected), d = [];
        return b = b || {}, a(c).each(function () {
            var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[-=_](.+)/);
            c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]))
        }), !d.length && b.key && d.push(b.key + "="), d.join("&")
    }, toArray: function (b) {
        var c = this._getItemsAsjQuery(b && b.connected), d = [];
        return b = b || {}, c.each(function () {
            d.push(a(b.item || this).attr(b.attribute || "id") || "")
        }), d
    }, _intersectsWith: function (a) {
        var b = this.positionAbs.left, c = b + this.helperProportions.width, d = this.positionAbs.top, e = d + this.helperProportions.height, f = a.left, g = f + a.width, h = a.top, i = h + a.height, j = this.offset.click.top, k = this.offset.click.left, l = d + j > h && d + j < i && b + k > f && b + k < g;
        return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? l : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i
    }, _intersectsWithPointer: function (b) {
        var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top, b.height), d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left, b.width), e = c && d, f = this._getDragVerticalDirection(), g = this._getDragHorizontalDirection();
        return e ? this.floating ? g && g == "right" || f == "down" ? 2 : 1 : f && (f == "down" ? 2 : 1) : !1
    }, _intersectsWithSides: function (b) {
        var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top + b.height / 2, b.height), d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left + b.width / 2, b.width), e = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
        return this.floating && f ? f == "right" && d || f == "left" && !d : e && (e == "down" && c || e == "up" && !c)
    }, _getDragVerticalDirection: function () {
        var a = this.positionAbs.top - this.lastPositionAbs.top;
        return a != 0 && (a > 0 ? "down" : "up")
    }, _getDragHorizontalDirection: function () {
        var a = this.positionAbs.left - this.lastPositionAbs.left;
        return a != 0 && (a > 0 ? "right" : "left")
    }, refresh: function (a) {
        return this._refreshItems(a), this.refreshPositions(), this
    }, _connectWith: function () {
        var a = this.options;
        return a.connectWith.constructor == String ? [a.connectWith] : a.connectWith
    }, _getItemsAsjQuery: function (b) {
        var c = this, d = [], e = [], f = this._connectWith();
        if (f && b)for (var g = f.length - 1; g >= 0; g--) {
            var h = a(f[g]);
            for (var i = h.length - 1; i >= 0; i--) {
                var j = a.data(h[i], this.widgetName);
                j && j != this && !j.options.disabled && e.push([a.isFunction(j.options.items) ? j.options.items.call(j.element) : a(j.options.items, j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), j])
            }
        }
        e.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {options: this.options, item: this.currentItem}) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
        for (var g = e.length - 1; g >= 0; g--)e[g][0].each(function () {
            d.push(this)
        });
        return a(d)
    }, _removeCurrentsFromItems: function () {
        var a = this.currentItem.find(":data(" + this.widgetName + "-item)");
        for (var b = 0; b < this.items.length; b++)for (var c = 0; c < a.length; c++)a[c] == this.items[b].item[0] && this.items.splice(b, 1)
    }, _refreshItems: function (b) {
        this.items = [], this.containers = [this];
        var c = this.items, d = this, e = [
            [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {item: this.currentItem}) : a(this.options.items, this.element), this]
        ], f = this._connectWith();
        if (f && this.ready)for (var g = f.length - 1; g >= 0; g--) {
            var h = a(f[g]);
            for (var i = h.length - 1; i >= 0; i--) {
                var j = a.data(h[i], this.widgetName);
                j && j != this && !j.options.disabled && (e.push([a.isFunction(j.options.items) ? j.options.items.call(j.element[0], b, {item: this.currentItem}) : a(j.options.items, j.element), j]), this.containers.push(j))
            }
        }
        for (var g = e.length - 1; g >= 0; g--) {
            var k = e[g][1], l = e[g][0];
            for (var i = 0, m = l.length; i < m; i++) {
                var n = a(l[i]);
                n.data(this.widgetName + "-item", k), c.push({item: n, instance: k, width: 0, height: 0, left: 0, top: 0})
            }
        }
    }, refreshPositions: function (b) {
        this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
        for (var c = this.items.length - 1; c >= 0; c--) {
            var d = this.items[c];
            if (d.instance != this.currentContainer && this.currentContainer && d.item[0] != this.currentItem[0])continue;
            var e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item;
            b || (d.width = e.outerWidth(), d.height = e.outerHeight());
            var f = e.offset();
            d.left = f.left, d.top = f.top
        }
        if (this.options.custom && this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this); else for (var c = this.containers.length - 1; c >= 0; c--) {
            var f = this.containers[c].element.offset();
            this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight()
        }
        return this
    }, _createPlaceholder: function (b) {
        var c = b || this, d = c.options;
        if (!d.placeholder || d.placeholder.constructor == String) {
            var e = d.placeholder;
            d.placeholder = {element: function () {
                var b = a(document.createElement(c.currentItem[0].nodeName)).addClass(e || c.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper").html("&nbsp;")[0];
                return e || (b.style.visibility = "hidden"), b
            }, update: function (a, b) {
                if (e && !d.forcePlaceholderSize)return;
                b.height() || b.height(c.currentItem.innerHeight() - parseInt(c.currentItem.css("paddingTop") || 0, 10) - parseInt(c.currentItem.css("paddingBottom") || 0, 10)), b.width() || b.width(c.currentItem.innerWidth() - parseInt(c.currentItem.css("paddingLeft") || 0, 10) - parseInt(c.currentItem.css("paddingRight") || 0, 10))
            }}
        }
        c.placeholder = a(d.placeholder.element.call(c.element, c.currentItem)), c.currentItem.after(c.placeholder), d.placeholder.update(c, c.placeholder)
    }, _contactContainers: function (b) {
        var c = null, d = null;
        for (var e = this.containers.length - 1; e >= 0; e--) {
            if (a.ui.contains(this.currentItem[0], this.containers[e].element[0]))continue;
            if (this._intersectsWith(this.containers[e].containerCache)) {
                if (c && a.ui.contains(this.containers[e].element[0], c.element[0]))continue;
                c = this.containers[e], d = e
            } else this.containers[e].containerCache.over && (this.containers[e]._trigger("out", b, this._uiHash(this)), this.containers[e].containerCache.over = 0)
        }
        if (!c)return;
        if (this.containers.length === 1)this.containers[d]._trigger("over", b, this._uiHash(this)), this.containers[d].containerCache.over = 1; else if (this.currentContainer != this.containers[d]) {
            var f = 1e4, g = null, h = this.positionAbs[this.containers[d].floating ? "left" : "top"];
            for (var i = this.items.length - 1; i >= 0; i--) {
                if (!a.ui.contains(this.containers[d].element[0], this.items[i].item[0]))continue;
                var j = this.items[i][this.containers[d].floating ? "left" : "top"];
                Math.abs(j - h) < f && (f = Math.abs(j - h), g = this.items[i])
            }
            if (!g && !this.options.dropOnEmpty)return;
            this.currentContainer = this.containers[d], g ? this._rearrange(b, g, null, !0) : this._rearrange(b, null, this.containers[d].element, !0), this._trigger("change", b, this._uiHash()), this.containers[d]._trigger("change", b, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[d]._trigger("over", b, this._uiHash(this)), this.containers[d].containerCache.over = 1
        }
    }, _createHelper: function (b) {
        var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : c.helper == "clone" ? this.currentItem.clone() : this.currentItem;
        return d.parents("body").length || a(c.appendTo != "parent" ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] == this.currentItem[0] && (this._storedCSS = {width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left")}), (d[0].style.width == "" || c.forceHelperSize) && d.width(this.currentItem.width()), (d[0].style.height == "" || c.forceHelperSize) && d.height(this.currentItem.height()), d
    }, _adjustOffsetFromHelper: function (b) {
        typeof b == "string" && (b = b.split(" ")), a.isArray(b) && (b = {left: +b[0], top: +b[1] || 0}), "left"in b && (this.offset.click.left = b.left + this.margins.left), "right"in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top"in b && (this.offset.click.top = b.top + this.margins.top), "bottom"in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
    }, _getParentOffset: function () {
        this.offsetParent = this.helper.offsetParent();
        var b = this.offsetParent.offset();
        this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
        if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)b = {top: 0, left: 0};
        return{top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
    }, _getRelativeOffset: function () {
        if (this.cssPosition == "relative") {
            var a = this.currentItem.position();
            return{top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
        }
        return{top: 0, left: 0}
    }, _cacheMargins: function () {
        this.margins = {left: parseInt(this.currentItem.css("marginLeft"), 10) || 0, top: parseInt(this.currentItem.css("marginTop"), 10) || 0}
    }, _cacheHelperProportions: function () {
        this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
    }, _setContainment: function () {
        var b = this.options;
        b.containment == "parent" && (b.containment = this.helper[0].parentNode);
        if (b.containment == "document" || b.containment == "window")this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(b.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(b.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
        if (!/^(document|window|parent)$/.test(b.containment)) {
            var c = a(b.containment)[0], d = a(b.containment).offset(), e = a(c).css("overflow") != "hidden";
            this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (e ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (e ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
        }
    }, _convertPositionTo: function (b, c) {
        c || (c = this.position);
        var d = b == "absolute" ? 1 : -1, e = this.options, f = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = /(html|body)/i.test(f[0].tagName);
        return{top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d), left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)}
    }, _generatePosition: function (b) {
        var c = this.options, d = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, e = /(html|body)/i.test(d[0].tagName);
        this.cssPosition == "relative" && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
        var f = b.pageX, g = b.pageY;
        if (this.originalPosition) {
            this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top));
            if (c.grid) {
                var h = this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1];
                g = this.containment ? h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3] ? h - this.offset.click.top < this.containment[1] ? h + c.grid[1] : h - c.grid[1] : h : h;
                var i = this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0];
                f = this.containment ? i - this.offset.click.left < this.containment[0] || i - this.offset.click.left > this.containment[2] ? i - this.offset.click.left < this.containment[0] ? i + c.grid[0] : i - c.grid[0] : i : i
            }
        }
        return{top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()), left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())}
    }, _rearrange: function (a, b, c, d) {
        c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
        var e = this, f = this.counter;
        window.setTimeout(function () {
            f == e.counter && e.refreshPositions(!d)
        }, 0)
    }, _clear: function (b, c) {
        this.reverting = !1;
        var d = [], e = this;
        !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null;
        if (this.helper[0] == this.currentItem[0]) {
            for (var f in this._storedCSS)if (this._storedCSS[f] == "auto" || this._storedCSS[f] == "static")this._storedCSS[f] = "";
            this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
        } else this.currentItem.show();
        this.fromOutside && !c && d.push(function (a) {
            this._trigger("receive", a, this._uiHash(this.fromOutside))
        }), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !c && d.push(function (a) {
            this._trigger("update", a, this._uiHash())
        });
        if (!a.ui.contains(this.element[0], this.currentItem[0])) {
            c || d.push(function (a) {
                this._trigger("remove", a, this._uiHash())
            });
            for (var f = this.containers.length - 1; f >= 0; f--)a.ui.contains(this.containers[f].element[0], this.currentItem[0]) && !c && (d.push(function (a) {
                return function (b) {
                    a._trigger("receive", b, this._uiHash(this))
                }
            }.call(this, this.containers[f])), d.push(function (a) {
                return function (b) {
                    a._trigger("update", b, this._uiHash(this))
                }
            }.call(this, this.containers[f])))
        }
        for (var f = this.containers.length - 1; f >= 0; f--)c || d.push(function (a) {
            return function (b) {
                a._trigger("deactivate", b, this._uiHash(this))
            }
        }.call(this, this.containers[f])), this.containers[f].containerCache.over && (d.push(function (a) {
            return function (b) {
                a._trigger("out", b, this._uiHash(this))
            }
        }.call(this, this.containers[f])), this.containers[f].containerCache.over = 0);
        this._storedCursor && a("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex), this.dragging = !1;
        if (this.cancelHelperRemoval) {
            if (!c) {
                this._trigger("beforeStop", b, this._uiHash());
                for (var f = 0; f < d.length; f++)d[f].call(this, b);
                this._trigger("stop", b, this._uiHash())
            }
            return!1
        }
        c || this._trigger("beforeStop", b, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null;
        if (!c) {
            for (var f = 0; f < d.length; f++)d[f].call(this, b);
            this._trigger("stop", b, this._uiHash())
        }
        return this.fromOutside = !1, !0
    }, _trigger: function () {
        a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
    }, _uiHash: function (b) {
        var c = b || this;
        return{helper: c.helper, placeholder: c.placeholder || a([]), position: c.position, originalPosition: c.originalPosition, offset: c.positionAbs, item: c.currentItem, sender: b ? b.element : null}
    }}), a.extend(a.ui.sortable, {version: "1.8.19"})
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.accordion.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.widget("ui.accordion", {options: {active: 0, animated: "slide", autoHeight: !0, clearStyle: !1, collapsible: !1, event: "click", fillSpace: !1, header: "> li > :first-child,> :not(li):even", icons: {header: "ui-icon-triangle-1-e", headerSelected: "ui-icon-triangle-1-s"}, navigation: !1, navigationFilter: function () {
        return this.href.toLowerCase() === location.href.toLowerCase()
    }}, _create: function () {
        var b = this, c = b.options;
        b.running = 0, b.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"), b.headers = b.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function () {
            if (c.disabled)return;
            a(this).addClass("ui-state-hover")
        }).bind("mouseleave.accordion",function () {
                if (c.disabled)return;
                a(this).removeClass("ui-state-hover")
            }).bind("focus.accordion",function () {
                if (c.disabled)return;
                a(this).addClass("ui-state-focus")
            }).bind("blur.accordion", function () {
                if (c.disabled)return;
                a(this).removeClass("ui-state-focus")
            }), b.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
        if (c.navigation) {
            var d = b.element.find("a").filter(c.navigationFilter).eq(0);
            if (d.length) {
                var e = d.closest(".ui-accordion-header");
                e.length ? b.active = e : b.active = d.closest(".ui-accordion-content").prev()
            }
        }
        b.active = b._findActive(b.active || c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"), b.active.next().addClass("ui-accordion-content-active"), b._createIcons(), b.resize(), b.element.attr("role", "tablist"), b.headers.attr("role", "tab").bind("keydown.accordion",function (a) {
            return b._keydown(a)
        }).next().attr("role", "tabpanel"), b.headers.not(b.active || "").attr({"aria-expanded": "false", "aria-selected": "false", tabIndex: -1}).next().hide(), b.active.length ? b.active.attr({"aria-expanded": "true", "aria-selected": "true", tabIndex: 0}) : b.headers.eq(0).attr("tabIndex", 0), a.browser.safari || b.headers.find("a").attr("tabIndex", -1), c.event && b.headers.bind(c.event.split(" ").join(".accordion ") + ".accordion", function (a) {
            b._clickHandler.call(b, a, this), a.preventDefault()
        })
    }, _createIcons: function () {
        var b = this.options;
        b.icons && (a("<span></span>").addClass("ui-icon " + b.icons.header).prependTo(this.headers), this.active.children(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected), this.element.addClass("ui-accordion-icons"))
    }, _destroyIcons: function () {
        this.headers.children(".ui-icon").remove(), this.element.removeClass("ui-accordion-icons")
    }, destroy: function () {
        var b = this.options;
        this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"), this.headers.find("a").removeAttr("tabIndex"), this._destroyIcons();
        var c = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
        return(b.autoHeight || b.fillHeight) && c.css("height", ""), a.Widget.prototype.destroy.call(this)
    }, _setOption: function (b, c) {
        a.Widget.prototype._setOption.apply(this, arguments), b == "active" && this.activate(c), b == "icons" && (this._destroyIcons(), c && this._createIcons()), b == "disabled" && this.headers.add(this.headers.next())[c ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
    }, _keydown: function (b) {
        if (this.options.disabled || b.altKey || b.ctrlKey)return;
        var c = a.ui.keyCode, d = this.headers.length, e = this.headers.index(b.target), f = !1;
        switch (b.keyCode) {
            case c.RIGHT:
            case c.DOWN:
                f = this.headers[(e + 1) % d];
                break;
            case c.LEFT:
            case c.UP:
                f = this.headers[(e - 1 + d) % d];
                break;
            case c.SPACE:
            case c.ENTER:
                this._clickHandler({target: b.target}, b.target), b.preventDefault()
        }
        return f ? (a(b.target).attr("tabIndex", -1), a(f).attr("tabIndex", 0), f.focus(), !1) : !0
    }, resize: function () {
        var b = this.options, c;
        if (b.fillSpace) {
            if (a.browser.msie) {
                var d = this.element.parent().css("overflow");
                this.element.parent().css("overflow", "hidden")
            }
            c = this.element.parent().height(), a.browser.msie && this.element.parent().css("overflow", d), this.headers.each(function () {
                c -= a(this).outerHeight(!0)
            }), this.headers.next().each(function () {
                a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()))
            }).css("overflow", "auto")
        } else b.autoHeight && (c = 0, this.headers.next().each(function () {
            c = Math.max(c, a(this).height("").height())
        }).height(c));
        return this
    }, activate: function (a) {
        this.options.active = a;
        var b = this._findActive(a)[0];
        return this._clickHandler({target: b}, b), this
    }, _findActive: function (b) {
        return b ? typeof b == "number" ? this.headers.filter(":eq(" + b + ")") : this.headers.not(this.headers.not(b)) : b === !1 ? a([]) : this.headers.filter(":eq(0)")
    }, _clickHandler: function (b, c) {
        var d = this.options;
        if (d.disabled)return;
        if (!b.target) {
            if (!d.collapsible)return;
            this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header), this.active.next().addClass("ui-accordion-content-active");
            var e = this.active.next(), f = {options: d, newHeader: a([]), oldHeader: d.active, newContent: a([]), oldContent: e}, g = this.active = a([]);
            this._toggle(g, e, f);
            return
        }
        var h = a(b.currentTarget || c), i = h[0] === this.active[0];
        d.active = d.collapsible && i ? !1 : this.headers.index(h);
        if (this.running || !d.collapsible && i)return;
        var j = this.active, g = h.next(), e = this.active.next(), f = {options: d, newHeader: i && d.collapsible ? a([]) : h, oldHeader: this.active, newContent: i && d.collapsible ? a([]) : g, oldContent: e}, k = this.headers.index(this.active[0]) > this.headers.index(h[0]);
        this.active = i ? a([]) : h, this._toggle(g, e, f, i, k), j.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header), i || (h.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected), h.next().addClass("ui-accordion-content-active"));
        return
    }, _toggle: function (b, c, d, e, f) {
        var g = this, h = g.options;
        g.toShow = b, g.toHide = c, g.data = d;
        var i = function () {
            if (!g)return;
            return g._completed.apply(g, arguments)
        };
        g._trigger("changestart", null, g.data), g.running = c.size() === 0 ? b.size() : c.size();
        if (h.animated) {
            var j = {};
            h.collapsible && e ? j = {toShow: a([]), toHide: c, complete: i, down: f, autoHeight: h.autoHeight || h.fillSpace} : j = {toShow: b, toHide: c, complete: i, down: f, autoHeight: h.autoHeight || h.fillSpace}, h.proxied || (h.proxied = h.animated), h.proxiedDuration || (h.proxiedDuration = h.duration), h.animated = a.isFunction(h.proxied) ? h.proxied(j) : h.proxied, h.duration = a.isFunction(h.proxiedDuration) ? h.proxiedDuration(j) : h.proxiedDuration;
            var k = a.ui.accordion.animations, l = h.duration, m = h.animated;
            m && !k[m] && !a.easing[m] && (m = "slide"), k[m] || (k[m] = function (a) {
                this.slide(a, {easing: m, duration: l || 700})
            }), k[m](j)
        } else h.collapsible && e ? b.toggle() : (c.hide(), b.show()), i(!0);
        c.prev().attr({"aria-expanded": "false", "aria-selected": "false", tabIndex: -1}).blur(), b.prev().attr({"aria-expanded": "true", "aria-selected": "true", tabIndex: 0}).focus()
    }, _completed: function (a) {
        this.running = a ? 0 : --this.running;
        if (this.running)return;
        this.options.clearStyle && this.toShow.add(this.toHide).css({height: "", overflow: ""}), this.toHide.removeClass("ui-accordion-content-active"), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), this._trigger("change", null, this.data)
    }}), a.extend(a.ui.accordion, {version: "1.8.19", animations: {slide: function (b, c) {
        b = a.extend({easing: "swing", duration: 300}, b, c);
        if (!b.toHide.size()) {
            b.toShow.animate({height: "show", paddingTop: "show", paddingBottom: "show"}, b);
            return
        }
        if (!b.toShow.size()) {
            b.toHide.animate({height: "hide", paddingTop: "hide", paddingBottom: "hide"}, b);
            return
        }
        var d = b.toShow.css("overflow"), e = 0, f = {}, g = {}, h = ["height", "paddingTop", "paddingBottom"], i, j = b.toShow;
        i = j[0].style.width, j.width(j.parent().width() - parseFloat(j.css("paddingLeft")) - parseFloat(j.css("paddingRight")) - (parseFloat(j.css("borderLeftWidth")) || 0) - (parseFloat(j.css("borderRightWidth")) || 0)), a.each(h, function (c, d) {
            g[d] = "hide";
            var e = ("" + a.css(b.toShow[0], d)).match(/^([\d+-.]+)(.*)$/);
            f[d] = {value: e[1], unit: e[2] || "px"}
        }), b.toShow.css({height: 0, overflow: "hidden"}).show(), b.toHide.filter(":hidden").each(b.complete).end().filter(":visible").animate(g, {step: function (a, c) {
            c.prop == "height" && (e = c.end - c.start === 0 ? 0 : (c.now - c.start) / (c.end - c.start)), b.toShow[0].style[c.prop] = e * f[c.prop].value + f[c.prop].unit
        }, duration: b.duration, easing: b.easing, complete: function () {
            b.autoHeight || b.toShow.css("height", ""), b.toShow.css({width: i, overflow: d}), b.complete()
        }})
    }, bounceslide: function (a) {
        this.slide(a, {easing: a.down ? "easeOutBounce" : "swing", duration: a.down ? 1e3 : 200})
    }}})
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.autocomplete.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    var c = 0;
    a.widget("ui.autocomplete", {options: {appendTo: "body", autoFocus: !1, delay: 300, minLength: 1, position: {my: "left top", at: "left bottom", collision: "none"}, source: null}, pending: 0, _create: function () {
        var b = this, c = this.element[0].ownerDocument, d;
        this.isMultiLine = this.element.is("textarea"), this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({role: "textbox", "aria-autocomplete": "list", "aria-haspopup": "true"}).bind("keydown.autocomplete",function (c) {
            if (b.options.disabled || b.element.propAttr("readOnly"))return;
            d = !1;
            var e = a.ui.keyCode;
            switch (c.keyCode) {
                case e.PAGE_UP:
                    b._move("previousPage", c);
                    break;
                case e.PAGE_DOWN:
                    b._move("nextPage", c);
                    break;
                case e.UP:
                    b._keyEvent("previous", c);
                    break;
                case e.DOWN:
                    b._keyEvent("next", c);
                    break;
                case e.ENTER:
                case e.NUMPAD_ENTER:
                    b.menu.active && (d = !0, c.preventDefault());
                case e.TAB:
                    if (!b.menu.active)return;
                    b.menu.select(c);
                    break;
                case e.ESCAPE:
                    b.element.val(b.term), b.close(c);
                    break;
                default:
                    clearTimeout(b.searching), b.searching = setTimeout(function () {
                        b.term != b.element.val() && (b.selectedItem = null, b.search(null, c))
                    }, b.options.delay)
            }
        }).bind("keypress.autocomplete",function (a) {
                d && (d = !1, a.preventDefault())
            }).bind("focus.autocomplete",function () {
                if (b.options.disabled)return;
                b.selectedItem = null, b.previous = b.element.val()
            }).bind("blur.autocomplete", function (a) {
                if (b.options.disabled)return;
                clearTimeout(b.searching), b.closing = setTimeout(function () {
                    b.close(a), b._change(a)
                }, 150)
            }), this._initSource(), this.menu = a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo || "body", c)[0]).mousedown(function (c) {
            var d = b.menu.element[0];
            a(c.target).closest(".ui-menu-item").length || setTimeout(function () {
                a(document).one("mousedown", function (c) {
                    c.target !== b.element[0] && c.target !== d && !a.ui.contains(d, c.target) && b.close()
                })
            }, 1), setTimeout(function () {
                clearTimeout(b.closing)
            }, 13)
        }).menu({focus: function (a, c) {
                var d = c.item.data("item.autocomplete");
                !1 !== b._trigger("focus", a, {item: d}) && /^key/.test(a.originalEvent.type) && b.element.val(d.value)
            }, selected: function (a, d) {
                var e = d.item.data("item.autocomplete"), f = b.previous;
                b.element[0] !== c.activeElement && (b.element.focus(), b.previous = f, setTimeout(function () {
                    b.previous = f, b.selectedItem = e
                }, 1)), !1 !== b._trigger("select", a, {item: e}) && b.element.val(e.value), b.term = b.element.val(), b.close(a), b.selectedItem = e
            }, blur: function (a, c) {
                b.menu.element.is(":visible") && b.element.val() !== b.term && b.element.val(b.term)
            }}).zIndex(this.element.zIndex() + 1).css({top: 0, left: 0}).hide().data("menu"), a.fn.bgiframe && this.menu.element.bgiframe(), b.beforeunloadHandler = function () {
            b.element.removeAttr("autocomplete")
        }, a(window).bind("beforeunload", b.beforeunloadHandler)
    }, destroy: function () {
        this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"), this.menu.element.remove(), a(window).unbind("beforeunload", this.beforeunloadHandler), a.Widget.prototype.destroy.call(this)
    }, _setOption: function (b, c) {
        a.Widget.prototype._setOption.apply(this, arguments), b === "source" && this._initSource(), b === "appendTo" && this.menu.element.appendTo(a(c || "body", this.element[0].ownerDocument)[0]), b === "disabled" && c && this.xhr && this.xhr.abort()
    }, _initSource: function () {
        var b = this, c, d;
        a.isArray(this.options.source) ? (c = this.options.source, this.source = function (b, d) {
            d(a.ui.autocomplete.filter(c, b.term))
        }) : typeof this.options.source == "string" ? (d = this.options.source, this.source = function (c, e) {
            b.xhr && b.xhr.abort(), b.xhr = a.ajax({url: d, data: c, dataType: "json", success: function (a, b) {
                e(a)
            }, error: function () {
                e([])
            }})
        }) : this.source = this.options.source
    }, search: function (a, b) {
        a = a != null ? a : this.element.val(), this.term = this.element.val();
        if (a.length < this.options.minLength)return this.close(b);
        clearTimeout(this.closing);
        if (this._trigger("search", b) === !1)return;
        return this._search(a)
    }, _search: function (a) {
        this.pending++, this.element.addClass("ui-autocomplete-loading"), this.source({term: a}, this._response())
    }, _response: function () {
        var a = this, b = ++c;
        return function (d) {
            b === c && a.__response(d), a.pending--, a.pending || a.element.removeClass("ui-autocomplete-loading")
        }
    }, __response: function (a) {
        !this.options.disabled && a && a.length ? (a = this._normalize(a), this._suggest(a), this._trigger("open")) : this.close()
    }, close: function (a) {
        clearTimeout(this.closing), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.deactivate(), this._trigger("close", a))
    }, _change: function (a) {
        this.previous !== this.element.val() && this._trigger("change", a, {item: this.selectedItem})
    }, _normalize: function (b) {
        return b.length && b[0].label && b[0].value ? b : a.map(b, function (b) {
            return typeof b == "string" ? {label: b, value: b} : a.extend({label: b.label || b.value, value: b.value || b.label}, b)
        })
    }, _suggest: function (b) {
        var c = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
        this._renderMenu(c, b), this.menu.deactivate(), this.menu.refresh(), c.show(), this._resizeMenu(), c.position(a.extend({of: this.element}, this.options.position)), this.options.autoFocus && this.menu.next(new a.Event("mouseover"))
    }, _resizeMenu: function () {
        var a = this.menu.element;
        a.outerWidth(Math.max(a.width("").outerWidth() + 1, this.element.outerWidth()))
    }, _renderMenu: function (b, c) {
        var d = this;
        a.each(c, function (a, c) {
            d._renderItem(b, c)
        })
    }, _renderItem: function (b, c) {
        return a("<li></li>").data("item.autocomplete", c).append(a("<a></a>").text(c.label)).appendTo(b)
    }, _move: function (a, b) {
        if (!this.menu.element.is(":visible")) {
            this.search(null, b);
            return
        }
        if (this.menu.first() && /^previous/.test(a) || this.menu.last() && /^next/.test(a)) {
            this.element.val(this.term), this.menu.deactivate();
            return
        }
        this.menu[a](b)
    }, widget: function () {
        return this.menu.element
    }, _keyEvent: function (a, b) {
        if (!this.isMultiLine || this.menu.element.is(":visible"))this._move(a, b), b.preventDefault()
    }}), a.extend(a.ui.autocomplete, {escapeRegex: function (a) {
        return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    }, filter: function (b, c) {
        var d = new RegExp(a.ui.autocomplete.escapeRegex(c), "i");
        return a.grep(b, function (a) {
            return d.test(a.label || a.value || a)
        })
    }})
})(jQuery), function (a) {
    a.widget("ui.menu", {_create: function () {
        var b = this;
        this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role: "listbox", "aria-activedescendant": "ui-active-menuitem"}).click(function (c) {
            if (!a(c.target).closest(".ui-menu-item a").length)return;
            c.preventDefault(), b.select(c)
        }), this.refresh()
    }, refresh: function () {
        var b = this, c = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
        c.children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function (c) {
            b.activate(c, a(this).parent())
        }).mouseleave(function () {
                b.deactivate()
            })
    }, activate: function (a, b) {
        this.deactivate();
        if (this.hasScroll()) {
            var c = b.offset().top - this.element.offset().top, d = this.element.scrollTop(), e = this.element.height();
            c < 0 ? this.element.scrollTop(d + c) : c >= e && this.element.scrollTop(d + c - e + b.height())
        }
        this.active = b.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(), this._trigger("focus", a, {item: b})
    }, deactivate: function () {
        if (!this.active)return;
        this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), this._trigger("blur"), this.active = null
    }, next: function (a) {
        this.move("next", ".ui-menu-item:first", a)
    }, previous: function (a) {
        this.move("prev", ".ui-menu-item:last", a)
    }, first: function () {
        return this.active && !this.active.prevAll(".ui-menu-item").length
    }, last: function () {
        return this.active && !this.active.nextAll(".ui-menu-item").length
    }, move: function (a, b, c) {
        if (!this.active) {
            this.activate(c, this.element.children(b));
            return
        }
        var d = this.active[a + "All"](".ui-menu-item").eq(0);
        d.length ? this.activate(c, d) : this.activate(c, this.element.children(b))
    }, nextPage: function (b) {
        if (this.hasScroll()) {
            if (!this.active || this.last()) {
                this.activate(b, this.element.children(".ui-menu-item:first"));
                return
            }
            var c = this.active.offset().top, d = this.element.height(), e = this.element.children(".ui-menu-item").filter(function () {
                var b = a(this).offset().top - c - d + a(this).height();
                return b < 10 && b > -10
            });
            e.length || (e = this.element.children(".ui-menu-item:last")), this.activate(b, e)
        } else this.activate(b, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
    }, previousPage: function (b) {
        if (this.hasScroll()) {
            if (!this.active || this.first()) {
                this.activate(b, this.element.children(".ui-menu-item:last"));
                return
            }
            var c = this.active.offset().top, d = this.element.height(), e = this.element.children(".ui-menu-item").filter(function () {
                var b = a(this).offset().top - c + d - a(this).height();
                return b < 10 && b > -10
            });
            e.length || (e = this.element.children(".ui-menu-item:first")), this.activate(b, e)
        } else this.activate(b, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
    }, hasScroll: function () {
        return this.element.height() < this.element[a.fn.prop ? "prop" : "attr"]("scrollHeight")
    }, select: function (a) {
        this._trigger("selected", a, {item: this.active})
    }})
}(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.button.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    var c, d, e, f, g = "ui-button ui-widget ui-state-default ui-corner-all", h = "ui-state-hover ui-state-active ", i = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", j = function () {
        var b = a(this).find(":ui-button");
        setTimeout(function () {
            b.button("refresh")
        }, 1)
    }, k = function (b) {
        var c = b.name, d = b.form, e = a([]);
        return c && (d ? e = a(d).find("[name='" + c + "']") : e = a("[name='" + c + "']", b.ownerDocument).filter(function () {
            return!this.form
        })), e
    };
    a.widget("ui.button", {options: {disabled: null, text: !0, label: null, icons: {primary: null, secondary: null}}, _create: function () {
        this.element.closest("form").unbind("reset.button").bind("reset.button", j), typeof this.options.disabled != "boolean" ? this.options.disabled = !!this.element.propAttr("disabled") : this.element.propAttr("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
        var b = this, h = this.options, i = this.type === "checkbox" || this.type === "radio", l = "ui-state-hover" + (i ? "" : " ui-state-active"), m = "ui-state-focus";
        h.label === null && (h.label = this.buttonElement.html()), this.buttonElement.addClass(g).attr("role", "button").bind("mouseenter.button",function () {
            if (h.disabled)return;
            a(this).addClass("ui-state-hover"), this === c && a(this).addClass("ui-state-active")
        }).bind("mouseleave.button",function () {
                if (h.disabled)return;
                a(this).removeClass(l)
            }).bind("click.button", function (a) {
                h.disabled && (a.preventDefault(), a.stopImmediatePropagation())
            }), this.element.bind("focus.button",function () {
            b.buttonElement.addClass(m)
        }).bind("blur.button", function () {
                b.buttonElement.removeClass(m)
            }), i && (this.element.bind("change.button", function () {
            if (f)return;
            b.refresh()
        }), this.buttonElement.bind("mousedown.button",function (a) {
            if (h.disabled)return;
            f = !1, d = a.pageX, e = a.pageY
        }).bind("mouseup.button", function (a) {
                if (h.disabled)return;
                if (d !== a.pageX || e !== a.pageY)f = !0
            })), this.type === "checkbox" ? this.buttonElement.bind("click.button", function () {
            if (h.disabled || f)return!1;
            a(this).toggleClass("ui-state-active"), b.buttonElement.attr("aria-pressed", b.element[0].checked)
        }) : this.type === "radio" ? this.buttonElement.bind("click.button", function () {
            if (h.disabled || f)return!1;
            a(this).addClass("ui-state-active"), b.buttonElement.attr("aria-pressed", "true");
            var c = b.element[0];
            k(c).not(c).map(function () {
                return a(this).button("widget")[0]
            }).removeClass("ui-state-active").attr("aria-pressed", "false")
        }) : (this.buttonElement.bind("mousedown.button",function () {
            if (h.disabled)return!1;
            a(this).addClass("ui-state-active"), c = this, a(document).one("mouseup", function () {
                c = null
            })
        }).bind("mouseup.button",function () {
                if (h.disabled)return!1;
                a(this).removeClass("ui-state-active")
            }).bind("keydown.button",function (b) {
                if (h.disabled)return!1;
                (b.keyCode == a.ui.keyCode.SPACE || b.keyCode == a.ui.keyCode.ENTER) && a(this).addClass("ui-state-active")
            }).bind("keyup.button", function () {
                a(this).removeClass("ui-state-active")
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function (b) {
            b.keyCode === a.ui.keyCode.SPACE && a(this).click()
        })), this._setOption("disabled", h.disabled), this._resetButton()
    }, _determineButtonType: function () {
        this.element.is(":checkbox") ? this.type = "checkbox" : this.element.is(":radio") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button";
        if (this.type === "checkbox" || this.type === "radio") {
            var a = this.element.parents().filter(":last"), b = "label[for='" + this.element.attr("id") + "']";
            this.buttonElement = a.find(b), this.buttonElement.length || (a = a.length ? a.siblings() : this.element.siblings(), this.buttonElement = a.filter(b), this.buttonElement.length || (this.buttonElement = a.find(b))), this.element.addClass("ui-helper-hidden-accessible");
            var c = this.element.is(":checked");
            c && this.buttonElement.addClass("ui-state-active"), this.buttonElement.attr("aria-pressed", c)
        } else this.buttonElement = this.element
    }, widget: function () {
        return this.buttonElement
    }, destroy: function () {
        this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(g + " " + h + " " + i).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title"), a.Widget.prototype.destroy.call(this)
    }, _setOption: function (b, c) {
        a.Widget.prototype._setOption.apply(this, arguments);
        if (b === "disabled") {
            c ? this.element.propAttr("disabled", !0) : this.element.propAttr("disabled", !1);
            return
        }
        this._resetButton()
    }, refresh: function () {
        var b = this.element.is(":disabled");
        b !== this.options.disabled && this._setOption("disabled", b), this.type === "radio" ? k(this.element[0]).each(function () {
            a(this).is(":checked") ? a(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
        }) : this.type === "checkbox" && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
    }, _resetButton: function () {
        if (this.type === "input") {
            this.options.label && this.element.val(this.options.label);
            return
        }
        var b = this.buttonElement.removeClass(i), c = a("<span></span>", this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(), d = this.options.icons, e = d.primary && d.secondary, f = [];
        d.primary || d.secondary ? (this.options.text && f.push("ui-button-text-icon" + (e ? "s" : d.primary ? "-primary" : "-secondary")), d.primary && b.prepend("<span class='ui-button-icon-primary ui-icon " + d.primary + "'></span>"), d.secondary && b.append("<span class='ui-button-icon-secondary ui-icon " + d.secondary + "'></span>"), this.options.text || (f.push(e ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || b.attr("title", c))) : f.push("ui-button-text-only"), b.addClass(f.join(" "))
    }}), a.widget("ui.buttonset", {options: {items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"}, _create: function () {
        this.element.addClass("ui-buttonset")
    }, _init: function () {
        this.refresh()
    }, _setOption: function (b, c) {
        b === "disabled" && this.buttons.button("option", b, c), a.Widget.prototype._setOption.apply(this, arguments)
    }, refresh: function () {
        var b = this.element.css("direction") === "rtl";
        this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
            return a(this).button("widget")[0]
        }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(b ? "ui-corner-left" : "ui-corner-right").end().end()
    }, destroy: function () {
        this.element.removeClass("ui-buttonset"), this.buttons.map(function () {
            return a(this).button("widget")[0]
        }).removeClass("ui-corner-left ui-corner-right").end().button("destroy"), a.Widget.prototype.destroy.call(this)
    }})
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.dialog.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    var c = "ui-dialog ui-widget ui-widget-content ui-corner-all ", d = {buttons: !0, height: !0, maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0, width: !0}, e = {maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0}, f = a.attrFn || {val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0, click: !0};
    a.widget("ui.dialog", {options: {autoOpen: !0, buttons: {}, closeOnEscape: !0, closeText: "close", dialogClass: "", draggable: !0, hide: null, height: "auto", maxHeight: !1, maxWidth: !1, minHeight: 150, minWidth: 150, modal: !1, position: {my: "center", at: "center", collision: "fit", using: function (b) {
        var c = a(this).css(b).offset().top;
        c < 0 && a(this).css("top", b.top - c)
    }}, resizable: !0, show: null, stack: !0, title: "", width: 300, zIndex: 1e3}, _create: function () {
        this.originalTitle = this.element.attr("title"), typeof this.originalTitle != "string" && (this.originalTitle = ""), this.options.title = this.options.title || this.originalTitle;
        var b = this, d = b.options, e = d.title || "&#160;", f = a.ui.dialog.getTitleId(b.element), g = (b.uiDialog = a("<div></div>")).appendTo(document.body).hide().addClass(c + d.dialogClass).css({zIndex: d.zIndex}).attr("tabIndex", -1).css("outline", 0).keydown(function (c) {
            d.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault())
        }).attr({role: "dialog", "aria-labelledby": f}).mousedown(function (a) {
                b.moveToTop(!1, a)
            }), h = b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g), i = (b.uiDialogTitlebar = a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g), j = a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
            j.addClass("ui-state-hover")
        },function () {
            j.removeClass("ui-state-hover")
        }).focus(function () {
                j.addClass("ui-state-focus")
            }).blur(function () {
                j.removeClass("ui-state-focus")
            }).click(function (a) {
                return b.close(a), !1
            }).appendTo(i), k = (b.uiDialogTitlebarCloseText = a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j), l = a("<span></span>").addClass("ui-dialog-title").attr("id", f).html(e).prependTo(i);
        a.isFunction(d.beforeclose) && !a.isFunction(d.beforeClose) && (d.beforeClose = d.beforeclose), i.find("*").add(i).disableSelection(), d.draggable && a.fn.draggable && b._makeDraggable(), d.resizable && a.fn.resizable && b._makeResizable(), b._createButtons(d.buttons), b._isOpen = !1, a.fn.bgiframe && g.bgiframe()
    }, _init: function () {
        this.options.autoOpen && this.open()
    }, destroy: function () {
        var a = this;
        return a.overlay && a.overlay.destroy(), a.uiDialog.hide(), a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), a.uiDialog.remove(), a.originalTitle && a.element.attr("title", a.originalTitle), a
    }, widget: function () {
        return this.uiDialog
    }, close: function (b) {
        var c = this, d, e;
        if (!1 === c._trigger("beforeClose", b))return;
        return c.overlay && c.overlay.destroy(), c.uiDialog.unbind("keypress.ui-dialog"), c._isOpen = !1, c.options.hide ? c.uiDialog.hide(c.options.hide, function () {
            c._trigger("close", b)
        }) : (c.uiDialog.hide(), c._trigger("close", b)), a.ui.dialog.overlay.resize(), c.options.modal && (d = 0, a(".ui-dialog").each(function () {
            this !== c.uiDialog[0] && (e = a(this).css("z-index"), isNaN(e) || (d = Math.max(d, e)))
        }), a.ui.dialog.maxZ = d), c
    }, isOpen: function () {
        return this._isOpen
    }, moveToTop: function (b, c) {
        var d = this, e = d.options, f;
        return e.modal && !b || !e.stack && !e.modal ? d._trigger("focus", c) : (e.zIndex > a.ui.dialog.maxZ && (a.ui.dialog.maxZ = e.zIndex), d.overlay && (a.ui.dialog.maxZ += 1, d.overlay.$el.css("z-index", a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ)), f = {scrollTop: d.element.scrollTop(), scrollLeft: d.element.scrollLeft()}, a.ui.dialog.maxZ += 1, d.uiDialog.css("z-index", a.ui.dialog.maxZ), d.element.attr(f), d._trigger("focus", c), d)
    }, open: function () {
        if (this._isOpen)return;
        var b = this, c = b.options, d = b.uiDialog;
        return b.overlay = c.modal ? new a.ui.dialog.overlay(b) : null, b._size(), b._position(c.position), d.show(c.show), b.moveToTop(!0), c.modal && d.bind("keydown.ui-dialog", function (b) {
            if (b.keyCode !== a.ui.keyCode.TAB)return;
            var c = a(":tabbable", this), d = c.filter(":first"), e = c.filter(":last");
            if (b.target === e[0] && !b.shiftKey)return d.focus(1), !1;
            if (b.target === d[0] && b.shiftKey)return e.focus(1), !1
        }), a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(), b._isOpen = !0, b._trigger("open"), b
    }, _createButtons: function (b) {
        var c = this, d = !1, e = a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), g = a("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);
        c.uiDialog.find(".ui-dialog-buttonpane").remove(), typeof b == "object" && b !== null && a.each(b, function () {
            return!(d = !0)
        }), d && (a.each(b, function (b, d) {
            d = a.isFunction(d) ? {click: d, text: b} : d;
            var e = a('<button type="button"></button>').click(function () {
                d.click.apply(c.element[0], arguments)
            }).appendTo(g);
            a.each(d, function (a, b) {
                if (a === "click")return;
                a in f ? e[a](b) : e.attr(a, b)
            }), a.fn.button && e.button()
        }), e.appendTo(c.uiDialog))
    }, _makeDraggable: function () {
        function f(a) {
            return{position: a.position, offset: a.offset}
        }

        var b = this, c = b.options, d = a(document), e;
        b.uiDialog.draggable({cancel: ".ui-dialog-content, .ui-dialog-titlebar-close", handle: ".ui-dialog-titlebar", containment: "document", start: function (d, g) {
            e = c.height === "auto" ? "auto" : a(this).height(), a(this).height(a(this).height()).addClass("ui-dialog-dragging"), b._trigger("dragStart", d, f(g))
        }, drag: function (a, c) {
            b._trigger("drag", a, f(c))
        }, stop: function (g, h) {
            c.position = [h.position.left - d.scrollLeft(), h.position.top - d.scrollTop()], a(this).removeClass("ui-dialog-dragging").height(e), b._trigger("dragStop", g, f(h)), a.ui.dialog.overlay.resize()
        }})
    }, _makeResizable: function (c) {
        function h(a) {
            return{originalPosition: a.originalPosition, originalSize: a.originalSize, position: a.position, size: a.size}
        }

        c = c === b ? this.options.resizable : c;
        var d = this, e = d.options, f = d.uiDialog.css("position"), g = typeof c == "string" ? c : "n,e,s,w,se,sw,ne,nw";
        d.uiDialog.resizable({cancel: ".ui-dialog-content", containment: "document", alsoResize: d.element, maxWidth: e.maxWidth, maxHeight: e.maxHeight, minWidth: e.minWidth, minHeight: d._minHeight(), handles: g, start: function (b, c) {
            a(this).addClass("ui-dialog-resizing"), d._trigger("resizeStart", b, h(c))
        }, resize: function (a, b) {
            d._trigger("resize", a, h(b))
        }, stop: function (b, c) {
            a(this).removeClass("ui-dialog-resizing"), e.height = a(this).height(), e.width = a(this).width(), d._trigger("resizeStop", b, h(c)), a.ui.dialog.overlay.resize()
        }}).css("position", f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
    }, _minHeight: function () {
        var a = this.options;
        return a.height === "auto" ? a.minHeight : Math.min(a.minHeight, a.height)
    }, _position: function (b) {
        var c = [], d = [0, 0], e;
        if (b) {
            if (typeof b == "string" || typeof b == "object" && "0"in b)c = b.split ? b.split(" ") : [b[0], b[1]], c.length === 1 && (c[1] = c[0]), a.each(["left", "top"], function (a, b) {
                +c[a] === c[a] && (d[a] = c[a], c[a] = b)
            }), b = {my: c.join(" "), at: c.join(" "), offset: d.join(" ")};
            b = a.extend({}, a.ui.dialog.prototype.options.position, b)
        } else b = a.ui.dialog.prototype.options.position;
        e = this.uiDialog.is(":visible"), e || this.uiDialog.show(), this.uiDialog.css({top: 0, left: 0}).position(a.extend({of: window}, b)), e || this.uiDialog.hide()
    }, _setOptions: function (b) {
        var c = this, f = {}, g = !1;
        a.each(b, function (a, b) {
            c._setOption(a, b), a in d && (g = !0), a in e && (f[a] = b)
        }), g && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", f)
    }, _setOption: function (b, d) {
        var e = this, f = e.uiDialog;
        switch (b) {
            case"beforeclose":
                b = "beforeClose";
                break;
            case"buttons":
                e._createButtons(d);
                break;
            case"closeText":
                e.uiDialogTitlebarCloseText.text("" + d);
                break;
            case"dialogClass":
                f.removeClass(e.options.dialogClass).addClass(c + d);
                break;
            case"disabled":
                d ? f.addClass("ui-dialog-disabled") : f.removeClass("ui-dialog-disabled");
                break;
            case"draggable":
                var g = f.is(":data(draggable)");
                g && !d && f.draggable("destroy"), !g && d && e._makeDraggable();
                break;
            case"position":
                e._position(d);
                break;
            case"resizable":
                var h = f.is(":data(resizable)");
                h && !d && f.resizable("destroy"), h && typeof d == "string" && f.resizable("option", "handles", d), !h && d !== !1 && e._makeResizable(d);
                break;
            case"title":
                a(".ui-dialog-title", e.uiDialogTitlebar).html("" + (d || "&#160;"))
        }
        a.Widget.prototype._setOption.apply(e, arguments)
    }, _size: function () {
        var b = this.options, c, d, e = this.uiDialog.is(":visible");
        this.element.show().css({width: "auto", minHeight: 0, height: 0}), b.minWidth > b.width && (b.width = b.minWidth), c = this.uiDialog.css({height: "auto", width: b.width}).height(), d = Math.max(0, b.minHeight - c);
        if (b.height === "auto")if (a.support.minHeight)this.element.css({minHeight: d, height: "auto"}); else {
            this.uiDialog.show();
            var f = this.element.css("height", "auto").height();
            e || this.uiDialog.hide(), this.element.height(Math.max(f, d))
        } else this.element.height(Math.max(b.height - c, 0));
        this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
    }}), a.extend(a.ui.dialog, {version: "1.8.19", uuid: 0, maxZ: 0, getTitleId: function (a) {
        var b = a.attr("id");
        return b || (this.uuid += 1, b = this.uuid), "ui-dialog-title-" + b
    }, overlay: function (b) {
        this.$el = a.ui.dialog.overlay.create(b)
    }}), a.extend(a.ui.dialog.overlay, {instances: [], oldInstances: [], maxZ: 0, events: a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function (a) {
        return a + ".dialog-overlay"
    }).join(" "), create: function (b) {
        this.instances.length === 0 && (setTimeout(function () {
            a.ui.dialog.overlay.instances.length && a(document).bind(a.ui.dialog.overlay.events, function (b) {
                if (a(b.target).zIndex() < a.ui.dialog.overlay.maxZ)return!1
            })
        }, 1), a(document).bind("keydown.dialog-overlay", function (c) {
            b.options.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault())
        }), a(window).bind("resize.dialog-overlay", a.ui.dialog.overlay.resize));
        var c = (this.oldInstances.pop() || a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width: this.width(), height: this.height()});
        return a.fn.bgiframe && c.bgiframe(), this.instances.push(c), c
    }, destroy: function (b) {
        var c = a.inArray(b, this.instances);
        c != -1 && this.oldInstances.push(this.instances.splice(c, 1)[0]), this.instances.length === 0 && a([document, window]).unbind(".dialog-overlay"), b.remove();
        var d = 0;
        a.each(this.instances, function () {
            d = Math.max(d, this.css("z-index"))
        }), this.maxZ = d
    }, height: function () {
        var b, c;
        return a.browser.msie && a.browser.version < 7 ? (b = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), b < c ? a(window).height() + "px" : b + "px") : a(document).height() + "px"
    }, width: function () {
        var b, c;
        return a.browser.msie ? (b = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), c = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), b < c ? a(window).width() + "px" : b + "px") : a(document).width() + "px"
    }, resize: function () {
        var b = a([]);
        a.each(a.ui.dialog.overlay.instances, function () {
            b = b.add(this)
        }), b.css({width: 0, height: 0}).css({width: a.ui.dialog.overlay.width(), height: a.ui.dialog.overlay.height()})
    }}), a.extend(a.ui.dialog.overlay.prototype, {destroy: function () {
        a.ui.dialog.overlay.destroy(this.$el)
    }})
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.slider.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    var c = 5;
    a.widget("ui.slider", a.ui.mouse, {widgetEventPrefix: "slide", options: {animate: !1, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null}, _create: function () {
        var b = this, d = this.options, e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), f = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>", g = d.values && d.values.length || 1, h = [];
        this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all" + (d.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = a([]), d.range && (d.range === !0 && (d.values || (d.values = [this._valueMin(), this._valueMin()]), d.values.length && d.values.length !== 2 && (d.values = [d.values[0], d.values[0]])), this.range = a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (d.range === "min" || d.range === "max" ? " ui-slider-range-" + d.range : "")));
        for (var i = e.length; i < g; i += 1)h.push(f);
        this.handles = e.add(a(h.join("")).appendTo(b.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function (a) {
            a.preventDefault()
        }).hover(function () {
                d.disabled || a(this).addClass("ui-state-hover")
            },function () {
                a(this).removeClass("ui-state-hover")
            }).focus(function () {
                d.disabled ? a(this).blur() : (a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), a(this).addClass("ui-state-focus"))
            }).blur(function () {
                a(this).removeClass("ui-state-focus")
            }), this.handles.each(function (b) {
            a(this).data("index.ui-slider-handle", b)
        }), this.handles.keydown(function (d) {
            var e = a(this).data("index.ui-slider-handle"), f, g, h, i;
            if (b.options.disabled)return;
            switch (d.keyCode) {
                case a.ui.keyCode.HOME:
                case a.ui.keyCode.END:
                case a.ui.keyCode.PAGE_UP:
                case a.ui.keyCode.PAGE_DOWN:
                case a.ui.keyCode.UP:
                case a.ui.keyCode.RIGHT:
                case a.ui.keyCode.DOWN:
                case a.ui.keyCode.LEFT:
                    d.preventDefault();
                    if (!b._keySliding) {
                        b._keySliding = !0, a(this).addClass("ui-state-active"), f = b._start(d, e);
                        if (f === !1)return
                    }
            }
            i = b.options.step, b.options.values && b.options.values.length ? g = h = b.values(e) : g = h = b.value();
            switch (d.keyCode) {
                case a.ui.keyCode.HOME:
                    h = b._valueMin();
                    break;
                case a.ui.keyCode.END:
                    h = b._valueMax();
                    break;
                case a.ui.keyCode.PAGE_UP:
                    h = b._trimAlignValue(g + (b._valueMax() - b._valueMin()) / c);
                    break;
                case a.ui.keyCode.PAGE_DOWN:
                    h = b._trimAlignValue(g - (b._valueMax() - b._valueMin()) / c);
                    break;
                case a.ui.keyCode.UP:
                case a.ui.keyCode.RIGHT:
                    if (g === b._valueMax())return;
                    h = b._trimAlignValue(g + i);
                    break;
                case a.ui.keyCode.DOWN:
                case a.ui.keyCode.LEFT:
                    if (g === b._valueMin())return;
                    h = b._trimAlignValue(g - i)
            }
            b._slide(d, e, h)
        }).keyup(function (c) {
                var d = a(this).data("index.ui-slider-handle");
                b._keySliding && (b._keySliding = !1, b._stop(c, d), b._change(c, d), a(this).removeClass("ui-state-active"))
            }), this._refreshValue(), this._animateOff = !1
    }, destroy: function () {
        return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), this._mouseDestroy(), this
    }, _mouseCapture: function (b) {
        var c = this.options, d, e, f, g, h, i, j, k, l;
        return c.disabled ? !1 : (this.elementSize = {width: this.element.outerWidth(), height: this.element.outerHeight()}, this.elementOffset = this.element.offset(), d = {x: b.pageX, y: b.pageY}, e = this._normValueFromMouse(d), f = this._valueMax() - this._valueMin() + 1, h = this, this.handles.each(function (b) {
            var c = Math.abs(e - h.values(b));
            f > c && (f = c, g = a(this), i = b)
        }), c.range === !0 && this.values(1) === c.min && (i += 1, g = a(this.handles[i])), j = this._start(b, i), j === !1 ? !1 : (this._mouseSliding = !0, h._handleIndex = i, g.addClass("ui-state-active").focus(), k = g.offset(), l = !a(b.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = l ? {left: 0, top: 0} : {left: b.pageX - k.left - g.width() / 2, top: b.pageY - k.top - g.height() / 2 - (parseInt(g.css("borderTopWidth"), 10) || 0) - (parseInt(g.css("borderBottomWidth"), 10) || 0) + (parseInt(g.css("marginTop"), 10) || 0)}, this.handles.hasClass("ui-state-hover") || this._slide(b, i, e), this._animateOff = !0, !0))
    }, _mouseStart: function (a) {
        return!0
    }, _mouseDrag: function (a) {
        var b = {x: a.pageX, y: a.pageY}, c = this._normValueFromMouse(b);
        return this._slide(a, this._handleIndex, c), !1
    }, _mouseStop: function (a) {
        return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
    }, _detectOrientation: function () {
        this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
    }, _normValueFromMouse: function (a) {
        var b, c, d, e, f;
        return this.orientation === "horizontal" ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), d < 0 && (d = 0), this.orientation === "vertical" && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f)
    }, _start: function (a, b) {
        var c = {handle: this.handles[b], value: this.value()};
        return this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("start", a, c)
    }, _slide: function (a, b, c) {
        var d, e, f;
        this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (b === 0 && c > d || b === 1 && c < d) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {handle: this.handles[b], value: c, values: e}), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c, !0))) : c !== this.value() && (f = this._trigger("slide", a, {handle: this.handles[b], value: c}), f !== !1 && this.value(c))
    }, _stop: function (a, b) {
        var c = {handle: this.handles[b], value: this.value()};
        this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("stop", a, c)
    }, _change: function (a, b) {
        if (!this._keySliding && !this._mouseSliding) {
            var c = {handle: this.handles[b], value: this.value()};
            this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("change", a, c)
        }
    }, value: function (a) {
        if (arguments.length) {
            this.options.value = this._trimAlignValue(a), this._refreshValue(), this._change(null, 0);
            return
        }
        return this._value()
    }, values: function (b, c) {
        var d, e, f;
        if (arguments.length > 1) {
            this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), this._change(null, b);
            return
        }
        if (!arguments.length)return this._values();
        if (!a.isArray(arguments[0]))return this.options.values && this.options.values.length ? this._values(b) : this.value();
        d = this.options.values, e = arguments[0];
        for (f = 0; f < d.length; f += 1)d[f] = this._trimAlignValue(e[f]), this._change(null, f);
        this._refreshValue()
    }, _setOption: function (b, c) {
        var d, e = 0;
        a.isArray(this.options.values) && (e = this.options.values.length), a.Widget.prototype._setOption.apply(this, arguments);
        switch (b) {
            case"disabled":
                c ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.propAttr("disabled", !1), this.element.removeClass("ui-disabled"));
                break;
            case"orientation":
                this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                break;
            case"value":
                this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                break;
            case"values":
                this._animateOff = !0, this._refreshValue();
                for (d = 0; d < e; d += 1)this._change(null, d);
                this._animateOff = !1
        }
    }, _value: function () {
        var a = this.options.value;
        return a = this._trimAlignValue(a), a
    }, _values: function (a) {
        var b, c, d;
        if (arguments.length)return b = this.options.values[a], b = this._trimAlignValue(b), b;
        c = this.options.values.slice();
        for (d = 0; d < c.length; d += 1)c[d] = this._trimAlignValue(c[d]);
        return c
    }, _trimAlignValue: function (a) {
        if (a <= this._valueMin())return this._valueMin();
        if (a >= this._valueMax())return this._valueMax();
        var b = this.options.step > 0 ? this.options.step : 1, c = (a - this._valueMin()) % b, d = a - c;
        return Math.abs(c) * 2 >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5))
    }, _valueMin: function () {
        return this.options.min
    }, _valueMax: function () {
        return this.options.max
    }, _refreshValue: function () {
        var b = this.options.range, c = this.options, d = this, e = this._animateOff ? !1 : c.animate, f, g = {}, h, i, j, k;
        this.options.values && this.options.values.length ? this.handles.each(function (b, i) {
            f = (d.values(b) - d._valueMin()) / (d._valueMax() - d._valueMin()) * 100, g[d.orientation === "horizontal" ? "left" : "bottom"] = f + "%", a(this).stop(1, 1)[e ? "animate" : "css"](g, c.animate), d.options.range === !0 && (d.orientation === "horizontal" ? (b === 0 && d.range.stop(1, 1)[e ? "animate" : "css"]({left: f + "%"}, c.animate), b === 1 && d.range[e ? "animate" : "css"]({width: f - h + "%"}, {queue: !1, duration: c.animate})) : (b === 0 && d.range.stop(1, 1)[e ? "animate" : "css"]({bottom: f + "%"}, c.animate), b === 1 && d.range[e ? "animate" : "css"]({height: f - h + "%"}, {queue: !1, duration: c.animate}))), h = f
        }) : (i = this.value(), j = this._valueMin(), k = this._valueMax(), f = k !== j ? (i - j) / (k - j) * 100 : 0, g[d.orientation === "horizontal" ? "left" : "bottom"] = f + "%", this.handle.stop(1, 1)[e ? "animate" : "css"](g, c.animate), b === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[e ? "animate" : "css"]({width: f + "%"}, c.animate), b === "max" && this.orientation === "horizontal" && this.range[e ? "animate" : "css"]({width: 100 - f + "%"}, {queue: !1, duration: c.animate}), b === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[e ? "animate" : "css"]({height: f + "%"}, c.animate), b === "max" && this.orientation === "vertical" && this.range[e ? "animate" : "css"]({height: 100 - f + "%"}, {queue: !1, duration: c.animate}))
    }}), a.extend(a.ui.slider, {version: "1.8.19"})
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.tabs.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    function e() {
        return++c
    }

    function f() {
        return++d
    }

    var c = 0, d = 0;
    a.widget("ui.tabs", {options: {add: null, ajaxOptions: null, cache: !1, cookie: null, collapsible: !1, disable: null, disabled: [], enable: null, event: "click", fx: null, idPrefix: "ui-tabs-", load: null, panelTemplate: "<div></div>", remove: null, select: null, show: null, spinner: "<em>Loading&#8230;</em>", tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"}, _create: function () {
        this._tabify(!0)
    }, _setOption: function (a, b) {
        if (a == "selected") {
            if (this.options.collapsible && b == this.options.selected)return;
            this.select(b)
        } else this.options[a] = b, this._tabify()
    }, _tabId: function (a) {
        return a.title && a.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + e()
    }, _sanitizeSelector: function (a) {
        return a.replace(/:/g, "\\:")
    }, _cookie: function () {
        var b = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + f());
        return a.cookie.apply(null, [b].concat(a.makeArray(arguments)))
    }, _ui: function (a, b) {
        return{tab: a, panel: b, index: this.anchors.index(a)}
    }, _cleanup: function () {
        this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
            var b = a(this);
            b.html(b.data("label.tabs")).removeData("label.tabs")
        })
    }, _tabify: function (c) {
        function m(b, c) {
            b.css("display", ""), !a.support.opacity && c.opacity && b[0].style.removeAttribute("filter")
        }

        var d = this, e = this.options, f = /^#.+/;
        this.list = this.element.find("ol,ul").eq(0), this.lis = a(" > li:has(a[href])", this.list), this.anchors = this.lis.map(function () {
            return a("a", this)[0]
        }), this.panels = a([]), this.anchors.each(function (b, c) {
            var g = a(c).attr("href"), h = g.split("#")[0], i;
            h && (h === location.toString().split("#")[0] || (i = a("base")[0]) && h === i.href) && (g = c.hash, c.href = g);
            if (f.test(g))d.panels = d.panels.add(d.element.find(d._sanitizeSelector(g))); else if (g && g !== "#") {
                a.data(c, "href.tabs", g), a.data(c, "load.tabs", g.replace(/#.*$/, ""));
                var j = d._tabId(c);
                c.href = "#" + j;
                var k = d.element.find("#" + j);
                k.length || (k = a(e.panelTemplate).attr("id", j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(d.panels[b - 1] || d.list), k.data("destroy.tabs", !0)), d.panels = d.panels.add(k)
            } else e.disabled.push(b)
        }), c ? (this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"), this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.lis.addClass("ui-state-default ui-corner-top"), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"), e.selected === b ? (location.hash && this.anchors.each(function (a, b) {
            if (b.hash == location.hash)return e.selected = a, !1
        }), typeof e.selected != "number" && e.cookie && (e.selected = parseInt(d._cookie(), 10)), typeof e.selected != "number" && this.lis.filter(".ui-tabs-selected").length && (e.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))), e.selected = e.selected || (this.lis.length ? 0 : -1)) : e.selected === null && (e.selected = -1), e.selected = e.selected >= 0 && this.anchors[e.selected] || e.selected < 0 ? e.selected : 0, e.disabled = a.unique(e.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"), function (a, b) {
            return d.lis.index(a)
        }))).sort(), a.inArray(e.selected, e.disabled) != -1 && e.disabled.splice(a.inArray(e.selected, e.disabled), 1), this.panels.addClass("ui-tabs-hide"), this.lis.removeClass("ui-tabs-selected ui-state-active"), e.selected >= 0 && this.anchors.length && (d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash)).removeClass("ui-tabs-hide"), this.lis.eq(e.selected).addClass("ui-tabs-selected ui-state-active"), d.element.queue("tabs", function () {
            d._trigger("show", null, d._ui(d.anchors[e.selected], d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash))[0]))
        }), this.load(e.selected)), a(window).bind("unload", function () {
            d.lis.add(d.anchors).unbind(".tabs"), d.lis = d.anchors = d.panels = null
        })) : e.selected = this.lis.index(this.lis.filter(".ui-tabs-selected")), this.element[e.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible"), e.cookie && this._cookie(e.selected, e.cookie);
        for (var g = 0, h; h = this.lis[g]; g++)a(h)[a.inArray(g, e.disabled) != -1 && !a(h).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled");
        e.cache === !1 && this.anchors.removeData("cache.tabs"), this.lis.add(this.anchors).unbind(".tabs");
        if (e.event !== "mouseover") {
            var i = function (a, b) {
                b.is(":not(.ui-state-disabled)") && b.addClass("ui-state-" + a)
            }, j = function (a, b) {
                b.removeClass("ui-state-" + a)
            };
            this.lis.bind("mouseover.tabs", function () {
                i("hover", a(this))
            }), this.lis.bind("mouseout.tabs", function () {
                j("hover", a(this))
            }), this.anchors.bind("focus.tabs", function () {
                i("focus", a(this).closest("li"))
            }), this.anchors.bind("blur.tabs", function () {
                j("focus", a(this).closest("li"))
            })
        }
        var k, l;
        e.fx && (a.isArray(e.fx) ? (k = e.fx[0], l = e.fx[1]) : k = l = e.fx);
        var n = l ? function (b, c) {
            a(b).closest("li").addClass("ui-tabs-selected ui-state-active"), c.hide().removeClass("ui-tabs-hide").animate(l, l.duration || "normal", function () {
                m(c, l), d._trigger("show", null, d._ui(b, c[0]))
            })
        } : function (b, c) {
            a(b).closest("li").addClass("ui-tabs-selected ui-state-active"), c.removeClass("ui-tabs-hide"), d._trigger("show", null, d._ui(b, c[0]))
        }, o = k ? function (a, b) {
            b.animate(k, k.duration || "normal", function () {
                d.lis.removeClass("ui-tabs-selected ui-state-active"), b.addClass("ui-tabs-hide"), m(b, k), d.element.dequeue("tabs")
            })
        } : function (a, b, c) {
            d.lis.removeClass("ui-tabs-selected ui-state-active"), b.addClass("ui-tabs-hide"), d.element.dequeue("tabs")
        };
        this.anchors.bind(e.event + ".tabs", function () {
            var b = this, c = a(b).closest("li"), f = d.panels.filter(":not(.ui-tabs-hide)"), g = d.element.find(d._sanitizeSelector(b.hash));
            if (c.hasClass("ui-tabs-selected") && !e.collapsible || c.hasClass("ui-state-disabled") || c.hasClass("ui-state-processing") || d.panels.filter(":animated").length || d._trigger("select", null, d._ui(this, g[0])) === !1)return this.blur(), !1;
            e.selected = d.anchors.index(this), d.abort();
            if (e.collapsible) {
                if (c.hasClass("ui-tabs-selected"))return e.selected = -1, e.cookie && d._cookie(e.selected, e.cookie), d.element.queue("tabs",function () {
                    o(b, f)
                }).dequeue("tabs"), this.blur(), !1;
                if (!f.length)return e.cookie && d._cookie(e.selected, e.cookie), d.element.queue("tabs", function () {
                    n(b, g)
                }), d.load(d.anchors.index(this)), this.blur(), !1
            }
            e.cookie && d._cookie(e.selected, e.cookie);
            if (g.length)f.length && d.element.queue("tabs", function () {
                o(b, f)
            }), d.element.queue("tabs", function () {
                n(b, g)
            }), d.load(d.anchors.index(this)); else throw"jQuery UI Tabs: Mismatching fragment identifier.";
            a.browser.msie && this.blur()
        }), this.anchors.bind("click.tabs", function () {
            return!1
        })
    }, _getIndex: function (a) {
        return typeof a == "string" && (a = this.anchors.index(this.anchors.filter("[href$='" + a + "']"))), a
    }, destroy: function () {
        var b = this.options;
        return this.abort(), this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"), this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.anchors.each(function () {
            var b = a.data(this, "href.tabs");
            b && (this.href = b);
            var c = a(this).unbind(".tabs");
            a.each(["href", "load", "cache"], function (a, b) {
                c.removeData(b + ".tabs")
            })
        }), this.lis.unbind(".tabs").add(this.panels).each(function () {
            a.data(this, "destroy.tabs") ? a(this).remove() : a(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "))
        }), b.cookie && this._cookie(null, b.cookie), this
    }, add: function (c, d, e) {
        e === b && (e = this.anchors.length);
        var f = this, g = this.options, h = a(g.tabTemplate.replace(/#\{href\}/g, c).replace(/#\{label\}/g, d)), i = c.indexOf("#") ? this._tabId(a("a", h)[0]) : c.replace("#", "");
        h.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0);
        var j = f.element.find("#" + i);
        return j.length || (j = a(g.panelTemplate).attr("id", i).data("destroy.tabs", !0)), j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"), e >= this.lis.length ? (h.appendTo(this.list), j.appendTo(this.list[0].parentNode)) : (h.insertBefore(this.lis[e]), j.insertBefore(this.panels[e])), g.disabled = a.map(g.disabled, function (a, b) {
            return a >= e ? ++a : a
        }), this._tabify(), this.anchors.length == 1 && (g.selected = 0, h.addClass("ui-tabs-selected ui-state-active"), j.removeClass("ui-tabs-hide"), this.element.queue("tabs", function () {
            f._trigger("show", null, f._ui(f.anchors[0], f.panels[0]))
        }), this.load(0)), this._trigger("add", null, this._ui(this.anchors[e], this.panels[e])), this
    }, remove: function (b) {
        b = this._getIndex(b);
        var c = this.options, d = this.lis.eq(b).remove(), e = this.panels.eq(b).remove();
        return d.hasClass("ui-tabs-selected") && this.anchors.length > 1 && this.select(b + (b + 1 < this.anchors.length ? 1 : -1)), c.disabled = a.map(a.grep(c.disabled, function (a, c) {
            return a != b
        }), function (a, c) {
            return a >= b ? --a : a
        }), this._tabify(), this._trigger("remove", null, this._ui(d.find("a")[0], e[0])), this
    }, enable: function (b) {
        b = this._getIndex(b);
        var c = this.options;
        if (a.inArray(b, c.disabled) == -1)return;
        return this.lis.eq(b).removeClass("ui-state-disabled"), c.disabled = a.grep(c.disabled, function (a, c) {
            return a != b
        }), this._trigger("enable", null, this._ui(this.anchors[b], this.panels[b])), this
    }, disable: function (a) {
        a = this._getIndex(a);
        var b = this, c = this.options;
        return a != c.selected && (this.lis.eq(a).addClass("ui-state-disabled"), c.disabled.push(a), c.disabled.sort(), this._trigger("disable", null, this._ui(this.anchors[a], this.panels[a]))), this
    }, select: function (a) {
        a = this._getIndex(a);
        if (a == -1)if (this.options.collapsible && this.options.selected != -1)a = this.options.selected; else return this;
        return this.anchors.eq(a).trigger(this.options.event + ".tabs"), this
    }, load: function (b) {
        b = this._getIndex(b);
        var c = this, d = this.options, e = this.anchors.eq(b)[0], f = a.data(e, "load.tabs");
        this.abort();
        if (!f || this.element.queue("tabs").length !== 0 && a.data(e, "cache.tabs")) {
            this.element.dequeue("tabs");
            return
        }
        this.lis.eq(b).addClass("ui-state-processing");
        if (d.spinner) {
            var g = a("span", e);
            g.data("label.tabs", g.html()).html(d.spinner)
        }
        return this.xhr = a.ajax(a.extend({}, d.ajaxOptions, {url: f, success: function (f, g) {
            c.element.find(c._sanitizeSelector(e.hash)).html(f), c._cleanup(), d.cache && a.data(e, "cache.tabs", !0), c._trigger("load", null, c._ui(c.anchors[b], c.panels[b]));
            try {
                d.ajaxOptions.success(f, g)
            } catch (h) {
            }
        }, error: function (a, f, g) {
            c._cleanup(), c._trigger("load", null, c._ui(c.anchors[b], c.panels[b]));
            try {
                d.ajaxOptions.error(a, f, b, e)
            } catch (g) {
            }
        }})), c.element.dequeue("tabs"), this
    }, abort: function () {
        return this.element.queue([]), this.panels.stop(!1, !0), this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2)), this.xhr && (this.xhr.abort(), delete this.xhr), this._cleanup(), this
    }, url: function (a, b) {
        return this.anchors.eq(a).removeData("cache.tabs").data("load.tabs", b), this
    }, length: function () {
        return this.anchors.length
    }}), a.extend(a.ui.tabs, {version: "1.8.19"}), a.extend(a.ui.tabs.prototype, {rotation: null, rotate: function (a, b) {
        var c = this, d = this.options, e = c._rotate || (c._rotate = function (b) {
            clearTimeout(c.rotation), c.rotation = setTimeout(function () {
                var a = d.selected;
                c.select(++a < c.anchors.length ? a : 0)
            }, a), b && b.stopPropagation()
        }), f = c._unrotate || (c._unrotate = b ? function (a) {
            e()
        } : function (a) {
            a.clientX && c.rotate(null)
        });
        return a ? (this.element.bind("tabsshow", e), this.anchors.bind(d.event + ".tabs", f), e()) : (clearTimeout(c.rotation), this.element.unbind("tabsshow", e), this.anchors.unbind(d.event + ".tabs", f), delete this._rotate, delete this._unrotate), this
    }})
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.datepicker.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function ($, undefined) {
    function Datepicker() {
        this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {closeText: "Done", prevText: "Prev", nextText: "Next", currentText: "Today", monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], weekHeader: "Wk", dateFormat: "mm/dd/yy", firstDay: 0, isRTL: !1, showMonthAfterYear: !1, yearSuffix: ""}, this._defaults = {showOn: "focus", showAnim: "fadeIn", showOptions: {}, defaultDate: null, appendText: "", buttonText: "...", buttonImage: "", buttonImageOnly: !1, hideIfNoPrevNext: !1, navigationAsDateFormat: !1, gotoCurrent: !1, changeMonth: !1, changeYear: !1, yearRange: "c-10:c+10", showOtherMonths: !1, selectOtherMonths: !1, showWeek: !1, calculateWeek: this.iso8601Week, shortYearCutoff: "+10", minDate: null, maxDate: null, duration: "fast", beforeShowDay: null, beforeShow: null, onSelect: null, onChangeMonthYear: null, onClose: null, numberOfMonths: 1, showCurrentAtPos: 0, stepMonths: 1, stepBigMonths: 12, altField: "", altFormat: "", constrainInput: !0, showButtonPanel: !1, autoSize: !1, disabled: !1}, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
    }

    function bindHover(a) {
        var b = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return a.bind("mouseout",function (a) {
            var c = $(a.target).closest(b);
            if (!c.length)return;
            c.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
        }).bind("mouseover", function (c) {
                var d = $(c.target).closest(b);
                if ($.datepicker._isDisabledDatepicker(instActive.inline ? a.parent()[0] : instActive.input[0]) || !d.length)return;
                d.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), d.addClass("ui-state-hover"), d.hasClass("ui-datepicker-prev") && d.addClass("ui-datepicker-prev-hover"), d.hasClass("ui-datepicker-next") && d.addClass("ui-datepicker-next-hover")
            })
    }

    function extendRemove(a, b) {
        $.extend(a, b);
        for (var c in b)if (b[c] == null || b[c] == undefined)a[c] = b[c];
        return a
    }

    function isArray(a) {
        return a && ($.browser.safari && typeof a == "object" && a.length || a.constructor && a.constructor.toString().match(/\Array\(\)/))
    }

    $.extend($.ui, {datepicker: {version: "1.8.19"}});
    var PROP_NAME = "datepicker", dpuuid = (new Date).getTime(), instActive;
    $.extend(Datepicker.prototype, {markerClassName: "hasDatepicker", maxRows: 4, log: function () {
        this.debug && console.log.apply("", arguments)
    }, _widgetDatepicker: function () {
        return this.dpDiv
    }, setDefaults: function (a) {
        return extendRemove(this._defaults, a || {}), this
    }, _attachDatepicker: function (target, settings) {
        var inlineSettings = null;
        for (var attrName in this._defaults) {
            var attrValue = target.getAttribute("date:" + attrName);
            if (attrValue) {
                inlineSettings = inlineSettings || {};
                try {
                    inlineSettings[attrName] = eval(attrValue)
                } catch (err) {
                    inlineSettings[attrName] = attrValue
                }
            }
        }
        var nodeName = target.nodeName.toLowerCase(), inline = nodeName == "div" || nodeName == "span";
        target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
        var inst = this._newInst($(target), inline);
        inst.settings = $.extend({}, settings || {}, inlineSettings || {}), nodeName == "input" ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
    }, _newInst: function (a, b) {
        var c = a[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
        return{id: c, input: a, selectedDay: 0, selectedMonth: 0, selectedYear: 0, drawMonth: 0, drawYear: 0, inline: b, dpDiv: b ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv}
    }, _connectDatepicker: function (a, b) {
        var c = $(a);
        b.append = $([]), b.trigger = $([]);
        if (c.hasClass(this.markerClassName))return;
        this._attachments(c, b), c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function (a, c, d) {
            b.settings[c] = d
        }).bind("getData.datepicker", function (a, c) {
                return this._get(b, c)
            }), this._autoSize(b), $.data(a, PROP_NAME, b), b.settings.disabled && this._disableDatepicker(a)
    }, _attachments: function (a, b) {
        var c = this._get(b, "appendText"), d = this._get(b, "isRTL");
        b.append && b.append.remove(), c && (b.append = $('<span class="' + this._appendClass + '">' + c + "</span>"), a[d ? "before" : "after"](b.append)), a.unbind("focus", this._showDatepicker), b.trigger && b.trigger.remove();
        var e = this._get(b, "showOn");
        (e == "focus" || e == "both") && a.focus(this._showDatepicker);
        if (e == "button" || e == "both") {
            var f = this._get(b, "buttonText"), g = this._get(b, "buttonImage");
            b.trigger = $(this._get(b, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({src: g, alt: f, title: f}) : $('<button type="button"></button>').addClass(this._triggerClass).html(g == "" ? f : $("<img/>").attr({src: g, alt: f, title: f}))), a[d ? "before" : "after"](b.trigger), b.trigger.click(function () {
                return $.datepicker._datepickerShowing && $.datepicker._lastInput == a[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != a[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(a[0])) : $.datepicker._showDatepicker(a[0]), !1
            })
        }
    }, _autoSize: function (a) {
        if (this._get(a, "autoSize") && !a.inline) {
            var b = new Date(2009, 11, 20), c = this._get(a, "dateFormat");
            if (c.match(/[DM]/)) {
                var d = function (a) {
                    var b = 0, c = 0;
                    for (var d = 0; d < a.length; d++)a[d].length > b && (b = a[d].length, c = d);
                    return c
                };
                b.setMonth(d(this._get(a, c.match(/MM/) ? "monthNames" : "monthNamesShort"))), b.setDate(d(this._get(a, c.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - b.getDay())
            }
            a.input.attr("size", this._formatDate(a, b).length)
        }
    }, _inlineDatepicker: function (a, b) {
        var c = $(a);
        if (c.hasClass(this.markerClassName))return;
        c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function (a, c, d) {
            b.settings[c] = d
        }).bind("getData.datepicker", function (a, c) {
                return this._get(b, c)
            }), $.data(a, PROP_NAME, b), this._setDate(b, this._getDefaultDate(b), !0), this._updateDatepicker(b), this._updateAlternate(b), b.settings.disabled && this._disableDatepicker(a), b.dpDiv.css("display", "block")
    }, _dialogDatepicker: function (a, b, c, d, e) {
        var f = this._dialogInst;
        if (!f) {
            this.uuid += 1;
            var g = "dp" + this.uuid;
            this._dialogInput = $('<input type="text" id="' + g + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), f = this._dialogInst = this._newInst(this._dialogInput, !1), f.settings = {}, $.data(this._dialogInput[0], PROP_NAME, f)
        }
        extendRemove(f.settings, d || {}), b = b && b.constructor == Date ? this._formatDate(f, b) : b, this._dialogInput.val(b), this._pos = e ? e.length ? e : [e.pageX, e.pageY] : null;
        if (!this._pos) {
            var h = document.documentElement.clientWidth, i = document.documentElement.clientHeight, j = document.documentElement.scrollLeft || document.body.scrollLeft, k = document.documentElement.scrollTop || document.body.scrollTop;
            this._pos = [h / 2 - 100 + j, i / 2 - 150 + k]
        }
        return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), f.settings.onSelect = c, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, f), this
    }, _destroyDatepicker: function (a) {
        var b = $(a), c = $.data(a, PROP_NAME);
        if (!b.hasClass(this.markerClassName))return;
        var d = a.nodeName.toLowerCase();
        $.removeData(a, PROP_NAME), d == "input" ? (c.append.remove(), c.trigger.remove(), b.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (d == "div" || d == "span") && b.removeClass(this.markerClassName).empty()
    }, _enableDatepicker: function (a) {
        var b = $(a), c = $.data(a, PROP_NAME);
        if (!b.hasClass(this.markerClassName))return;
        var d = a.nodeName.toLowerCase();
        if (d == "input")a.disabled = !1, c.trigger.filter("button").each(function () {
            this.disabled = !1
        }).end().filter("img").css({opacity: "1.0", cursor: ""}); else if (d == "div" || d == "span") {
            var e = b.children("." + this._inlineClass);
            e.children().removeClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
        }
        this._disabledInputs = $.map(this._disabledInputs, function (b) {
            return b == a ? null : b
        })
    }, _disableDatepicker: function (a) {
        var b = $(a), c = $.data(a, PROP_NAME);
        if (!b.hasClass(this.markerClassName))return;
        var d = a.nodeName.toLowerCase();
        if (d == "input")a.disabled = !0, c.trigger.filter("button").each(function () {
            this.disabled = !0
        }).end().filter("img").css({opacity: "0.5", cursor: "default"}); else if (d == "div" || d == "span") {
            var e = b.children("." + this._inlineClass);
            e.children().addClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
        }
        this._disabledInputs = $.map(this._disabledInputs, function (b) {
            return b == a ? null : b
        }), this._disabledInputs[this._disabledInputs.length] = a
    }, _isDisabledDatepicker: function (a) {
        if (!a)return!1;
        for (var b = 0; b < this._disabledInputs.length; b++)if (this._disabledInputs[b] == a)return!0;
        return!1
    }, _getInst: function (a) {
        try {
            return $.data(a, PROP_NAME)
        } catch (b) {
            throw"Missing instance data for this datepicker"
        }
    }, _optionDatepicker: function (a, b, c) {
        var d = this._getInst(a);
        if (arguments.length == 2 && typeof b == "string")return b == "defaults" ? $.extend({}, $.datepicker._defaults) : d ? b == "all" ? $.extend({}, d.settings) : this._get(d, b) : null;
        var e = b || {};
        typeof b == "string" && (e = {}, e[b] = c);
        if (d) {
            this._curInst == d && this._hideDatepicker();
            var f = this._getDateDatepicker(a, !0), g = this._getMinMaxDate(d, "min"), h = this._getMinMaxDate(d, "max");
            extendRemove(d.settings, e), g !== null && e.dateFormat !== undefined && e.minDate === undefined && (d.settings.minDate = this._formatDate(d, g)), h !== null && e.dateFormat !== undefined && e.maxDate === undefined && (d.settings.maxDate = this._formatDate(d, h)), this._attachments($(a), d), this._autoSize(d), this._setDate(d, f), this._updateAlternate(d), this._updateDatepicker(d)
        }
    }, _changeDatepicker: function (a, b, c) {
        this._optionDatepicker(a, b, c)
    }, _refreshDatepicker: function (a) {
        var b = this._getInst(a);
        b && this._updateDatepicker(b)
    }, _setDateDatepicker: function (a, b) {
        var c = this._getInst(a);
        c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c))
    }, _getDateDatepicker: function (a, b) {
        var c = this._getInst(a);
        return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null
    }, _doKeyDown: function (a) {
        var b = $.datepicker._getInst(a.target), c = !0, d = b.dpDiv.is(".ui-datepicker-rtl");
        b._keyEvent = !0;
        if ($.datepicker._datepickerShowing)switch (a.keyCode) {
            case 9:
                $.datepicker._hideDatepicker(), c = !1;
                break;
            case 13:
                var e = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", b.dpDiv);
                e[0] && $.datepicker._selectDay(a.target, b.selectedMonth, b.selectedYear, e[0]);
                var f = $.datepicker._get(b, "onSelect");
                if (f) {
                    var g = $.datepicker._formatDate(b);
                    f.apply(b.input ? b.input[0] : null, [g, b])
                } else $.datepicker._hideDatepicker();
                return!1;
            case 27:
                $.datepicker._hideDatepicker();
                break;
            case 33:
                $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M");
                break;
            case 34:
                $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
                break;
            case 35:
                (a.ctrlKey || a.metaKey) && $.datepicker._clearDate(a.target), c = a.ctrlKey || a.metaKey;
                break;
            case 36:
                (a.ctrlKey || a.metaKey) && $.datepicker._gotoToday(a.target), c = a.ctrlKey || a.metaKey;
                break;
            case 37:
                (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? 1 : -1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M");
                break;
            case 38:
                (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, -7, "D"), c = a.ctrlKey || a.metaKey;
                break;
            case 39:
                (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? -1 : 1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
                break;
            case 40:
                (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, 7, "D"), c = a.ctrlKey || a.metaKey;
                break;
            default:
                c = !1
        } else a.keyCode == 36 && a.ctrlKey ? $.datepicker._showDatepicker(this) : c = !1;
        c && (a.preventDefault(), a.stopPropagation())
    }, _doKeyPress: function (a) {
        var b = $.datepicker._getInst(a.target);
        if ($.datepicker._get(b, "constrainInput")) {
            var c = $.datepicker._possibleChars($.datepicker._get(b, "dateFormat")), d = String.fromCharCode(a.charCode == undefined ? a.keyCode : a.charCode);
            return a.ctrlKey || a.metaKey || d < " " || !c || c.indexOf(d) > -1
        }
    }, _doKeyUp: function (a) {
        var b = $.datepicker._getInst(a.target);
        if (b.input.val() != b.lastVal)try {
            var c = $.datepicker.parseDate($.datepicker._get(b, "dateFormat"), b.input ? b.input.val() : null, $.datepicker._getFormatConfig(b));
            c && ($.datepicker._setDateFromField(b), $.datepicker._updateAlternate(b), $.datepicker._updateDatepicker(b))
        } catch (d) {
            $.datepicker.log(d)
        }
        return!0
    }, _showDatepicker: function (a) {
        a = a.target || a, a.nodeName.toLowerCase() != "input" && (a = $("input", a.parentNode)[0]);
        if ($.datepicker._isDisabledDatepicker(a) || $.datepicker._lastInput == a)return;
        var b = $.datepicker._getInst(a);
        $.datepicker._curInst && $.datepicker._curInst != b && ($.datepicker._curInst.dpDiv.stop(!0, !0), b && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
        var c = $.datepicker._get(b, "beforeShow"), d = c ? c.apply(a, [a, b]) : {};
        if (d === !1)return;
        extendRemove(b.settings, d), b.lastVal = null, $.datepicker._lastInput = a, $.datepicker._setDateFromField(b), $.datepicker._inDialog && (a.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(a), $.datepicker._pos[1] += a.offsetHeight);
        var e = !1;
        $(a).parents().each(function () {
            return e |= $(this).css("position") == "fixed", !e
        }), e && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop);
        var f = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
        $.datepicker._pos = null, b.dpDiv.empty(), b.dpDiv.css({position: "absolute", display: "block", top: "-1000px"}), $.datepicker._updateDatepicker(b), f = $.datepicker._checkOffset(b, f, e), b.dpDiv.css({position: $.datepicker._inDialog && $.blockUI ? "static" : e ? "fixed" : "absolute", display: "none", left: f.left + "px", top: f.top + "px"});
        if (!b.inline) {
            var g = $.datepicker._get(b, "showAnim"), h = $.datepicker._get(b, "duration"), i = function () {
                var a = b.dpDiv.find("iframe.ui-datepicker-cover");
                if (!!a.length) {
                    var c = $.datepicker._getBorders(b.dpDiv);
                    a.css({left: -c[0], top: -c[1], width: b.dpDiv.outerWidth(), height: b.dpDiv.outerHeight()})
                }
            };
            b.dpDiv.zIndex($(a).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects[g] ? b.dpDiv.show(g, $.datepicker._get(b, "showOptions"), h, i) : b.dpDiv[g || "show"](g ? h : null, i), (!g || !h) && i(), b.input.is(":visible") && !b.input.is(":disabled") && b.input.focus(), $.datepicker._curInst = b
        }
    }, _updateDatepicker: function (a) {
        var b = this;
        b.maxRows = 4;
        var c = $.datepicker._getBorders(a.dpDiv);
        instActive = a, a.dpDiv.empty().append(this._generateHTML(a));
        var d = a.dpDiv.find("iframe.ui-datepicker-cover");
        !d.length || d.css({left: -c[0], top: -c[1], width: a.dpDiv.outerWidth(), height: a.dpDiv.outerHeight()}), a.dpDiv.find("." + this._dayOverClass + " a").mouseover();
        var e = this._getNumberOfMonths(a), f = e[1], g = 17;
        a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), f > 1 && a.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", g * f + "em"), a.dpDiv[(e[0] != 1 || e[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"), a.dpDiv[(this._get(a, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), a == $.datepicker._curInst && $.datepicker._datepickerShowing && a.input && a.input.is(":visible") && !a.input.is(":disabled") && a.input[0] != document.activeElement && a.input.focus();
        if (a.yearshtml) {
            var h = a.yearshtml;
            setTimeout(function () {
                h === a.yearshtml && a.yearshtml && a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml), h = a.yearshtml = null
            }, 0)
        }
    }, _getBorders: function (a) {
        var b = function (a) {
            return{thin: 1, medium: 2, thick: 3}[a] || a
        };
        return[parseFloat(b(a.css("border-left-width"))), parseFloat(b(a.css("border-top-width")))]
    }, _checkOffset: function (a, b, c) {
        var d = a.dpDiv.outerWidth(), e = a.dpDiv.outerHeight(), f = a.input ? a.input.outerWidth() : 0, g = a.input ? a.input.outerHeight() : 0, h = document.documentElement.clientWidth + $(document).scrollLeft(), i = document.documentElement.clientHeight + $(document).scrollTop();
        return b.left -= this._get(a, "isRTL") ? d - f : 0, b.left -= c && b.left == a.input.offset().left ? $(document).scrollLeft() : 0, b.top -= c && b.top == a.input.offset().top + g ? $(document).scrollTop() : 0, b.left -= Math.min(b.left, b.left + d > h && h > d ? Math.abs(b.left + d - h) : 0), b.top -= Math.min(b.top, b.top + e > i && i > e ? Math.abs(e + g) : 0), b
    }, _findPos: function (a) {
        var b = this._getInst(a), c = this._get(b, "isRTL");
        while (a && (a.type == "hidden" || a.nodeType != 1 || $.expr.filters.hidden(a)))a = a[c ? "previousSibling" : "nextSibling"];
        var d = $(a).offset();
        return[d.left, d.top]
    }, _hideDatepicker: function (a) {
        var b = this._curInst;
        if (!b || a && b != $.data(a, PROP_NAME))return;
        if (this._datepickerShowing) {
            var c = this._get(b, "showAnim"), d = this._get(b, "duration"), e = function () {
                $.datepicker._tidyDialog(b)
            };
            $.effects && $.effects[c] ? b.dpDiv.hide(c, $.datepicker._get(b, "showOptions"), d, e) : b.dpDiv[c == "slideDown" ? "slideUp" : c == "fadeIn" ? "fadeOut" : "hide"](c ? d : null, e), c || e(), this._datepickerShowing = !1;
            var f = this._get(b, "onClose");
            f && f.apply(b.input ? b.input[0] : null, [b.input ? b.input.val() : "", b]), this._lastInput = null, this._inDialog && (this._dialogInput.css({position: "absolute", left: "0", top: "-100px"}), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1
        }
    }, _tidyDialog: function (a) {
        a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
    }, _checkExternalClick: function (a) {
        if (!$.datepicker._curInst)return;
        var b = $(a.target), c = $.datepicker._getInst(b[0]);
        (b[0].id != $.datepicker._mainDivId && b.parents("#" + $.datepicker._mainDivId).length == 0 && !b.hasClass($.datepicker.markerClassName) && !b.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || b.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != c) && $.datepicker._hideDatepicker()
    }, _adjustDate: function (a, b, c) {
        var d = $(a), e = this._getInst(d[0]);
        if (this._isDisabledDatepicker(d[0]))return;
        this._adjustInstDate(e, b + (c == "M" ? this._get(e, "showCurrentAtPos") : 0), c), this._updateDatepicker(e)
    }, _gotoToday: function (a) {
        var b = $(a), c = this._getInst(b[0]);
        if (this._get(c, "gotoCurrent") && c.currentDay)c.selectedDay = c.currentDay, c.drawMonth = c.selectedMonth = c.currentMonth, c.drawYear = c.selectedYear = c.currentYear; else {
            var d = new Date;
            c.selectedDay = d.getDate(), c.drawMonth = c.selectedMonth = d.getMonth(), c.drawYear = c.selectedYear = d.getFullYear()
        }
        this._notifyChange(c), this._adjustDate(b)
    }, _selectMonthYear: function (a, b, c) {
        var d = $(a), e = this._getInst(d[0]);
        e["selected" + (c == "M" ? "Month" : "Year")] = e["draw" + (c == "M" ? "Month" : "Year")] = parseInt(b.options[b.selectedIndex].value, 10), this._notifyChange(e), this._adjustDate(d)
    }, _selectDay: function (a, b, c, d) {
        var e = $(a);
        if ($(d).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0]))return;
        var f = this._getInst(e[0]);
        f.selectedDay = f.currentDay = $("a", d).html(), f.selectedMonth = f.currentMonth = b, f.selectedYear = f.currentYear = c, this._selectDate(a, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear))
    }, _clearDate: function (a) {
        var b = $(a), c = this._getInst(b[0]);
        this._selectDate(b, "")
    }, _selectDate: function (a, b) {
        var c = $(a), d = this._getInst(c[0]);
        b = b != null ? b : this._formatDate(d), d.input && d.input.val(b), this._updateAlternate(d);
        var e = this._get(d, "onSelect");
        e ? e.apply(d.input ? d.input[0] : null, [b, d]) : d.input && d.input.trigger("change"), d.inline ? this._updateDatepicker(d) : (this._hideDatepicker(), this._lastInput = d.input[0], typeof d.input[0] != "object" && d.input.focus(), this._lastInput = null)
    }, _updateAlternate: function (a) {
        var b = this._get(a, "altField");
        if (b) {
            var c = this._get(a, "altFormat") || this._get(a, "dateFormat"), d = this._getDate(a), e = this.formatDate(c, d, this._getFormatConfig(a));
            $(b).each(function () {
                $(this).val(e)
            })
        }
    }, noWeekends: function (a) {
        var b = a.getDay();
        return[b > 0 && b < 6, ""]
    }, iso8601Week: function (a) {
        var b = new Date(a.getTime());
        b.setDate(b.getDate() + 4 - (b.getDay() || 7));
        var c = b.getTime();
        return b.setMonth(0), b.setDate(1), Math.floor(Math.round((c - b) / 864e5) / 7) + 1
    }, parseDate: function (a, b, c) {
        if (a == null || b == null)throw"Invalid arguments";
        b = typeof b == "object" ? b.toString() : b + "";
        if (b == "")return null;
        var d = (c ? c.shortYearCutoff : null) || this._defaults.shortYearCutoff;
        d = typeof d != "string" ? d : (new Date).getFullYear() % 100 + parseInt(d, 10);
        var e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, f = (c ? c.dayNames : null) || this._defaults.dayNames, g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, h = (c ? c.monthNames : null) || this._defaults.monthNames, i = -1, j = -1, k = -1, l = -1, m = !1, n = function (b) {
            var c = s + 1 < a.length && a.charAt(s + 1) == b;
            return c && s++, c
        }, o = function (a) {
            var c = n(a), d = a == "@" ? 14 : a == "!" ? 20 : a == "y" && c ? 4 : a == "o" ? 3 : 2, e = new RegExp("^\\d{1," + d + "}"), f = b.substring(r).match(e);
            if (!f)throw"Missing number at position " + r;
            return r += f[0].length, parseInt(f[0], 10)
        }, p = function (a, c, d) {
            var e = $.map(n(a) ? d : c,function (a, b) {
                return[
                    [b, a]
                ]
            }).sort(function (a, b) {
                    return-(a[1].length - b[1].length)
                }), f = -1;
            $.each(e, function (a, c) {
                var d = c[1];
                if (b.substr(r, d.length).toLowerCase() == d.toLowerCase())return f = c[0], r += d.length, !1
            });
            if (f != -1)return f + 1;
            throw"Unknown name at position " + r
        }, q = function () {
            if (b.charAt(r) != a.charAt(s))throw"Unexpected literal at position " + r;
            r++
        }, r = 0;
        for (var s = 0; s < a.length; s++)if (m)a.charAt(s) == "'" && !n("'") ? m = !1 : q(); else switch (a.charAt(s)) {
            case"d":
                k = o("d");
                break;
            case"D":
                p("D", e, f);
                break;
            case"o":
                l = o("o");
                break;
            case"m":
                j = o("m");
                break;
            case"M":
                j = p("M", g, h);
                break;
            case"y":
                i = o("y");
                break;
            case"@":
                var t = new Date(o("@"));
                i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
                break;
            case"!":
                var t = new Date((o("!") - this._ticksTo1970) / 1e4);
                i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
                break;
            case"'":
                n("'") ? q() : m = !0;
                break;
            default:
                q()
        }
        if (r < b.length)throw"Extra/unparsed characters found in date: " + b.substring(r);
        i == -1 ? i = (new Date).getFullYear() : i < 100 && (i += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (i <= d ? 0 : -100));
        if (l > -1) {
            j = 1, k = l;
            do {
                var u = this._getDaysInMonth(i, j - 1);
                if (k <= u)break;
                j++, k -= u
            } while (!0)
        }
        var t = this._daylightSavingAdjust(new Date(i, j - 1, k));
        if (t.getFullYear() != i || t.getMonth() + 1 != j || t.getDate() != k)throw"Invalid date";
        return t
    }, ATOM: "yy-mm-dd", COOKIE: "D, dd M yy", ISO_8601: "yy-mm-dd", RFC_822: "D, d M y", RFC_850: "DD, dd-M-y", RFC_1036: "D, d M y", RFC_1123: "D, d M yy", RFC_2822: "D, d M yy", RSS: "D, d M y", TICKS: "!", TIMESTAMP: "@", W3C: "yy-mm-dd", _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1e7, formatDate: function (a, b, c) {
        if (!b)return"";
        var d = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, e = (c ? c.dayNames : null) || this._defaults.dayNames, f = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, g = (c ? c.monthNames : null) || this._defaults.monthNames, h = function (b) {
            var c = m + 1 < a.length && a.charAt(m + 1) == b;
            return c && m++, c
        }, i = function (a, b, c) {
            var d = "" + b;
            if (h(a))while (d.length < c)d = "0" + d;
            return d
        }, j = function (a, b, c, d) {
            return h(a) ? d[b] : c[b]
        }, k = "", l = !1;
        if (b)for (var m = 0; m < a.length; m++)if (l)a.charAt(m) == "'" && !h("'") ? l = !1 : k += a.charAt(m); else switch (a.charAt(m)) {
            case"d":
                k += i("d", b.getDate(), 2);
                break;
            case"D":
                k += j("D", b.getDay(), d, e);
                break;
            case"o":
                k += i("o", Math.round(((new Date(b.getFullYear(), b.getMonth(), b.getDate())).getTime() - (new Date(b.getFullYear(), 0, 0)).getTime()) / 864e5), 3);
                break;
            case"m":
                k += i("m", b.getMonth() + 1, 2);
                break;
            case"M":
                k += j("M", b.getMonth(), f, g);
                break;
            case"y":
                k += h("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
                break;
            case"@":
                k += b.getTime();
                break;
            case"!":
                k += b.getTime() * 1e4 + this._ticksTo1970;
                break;
            case"'":
                h("'") ? k += "'" : l = !0;
                break;
            default:
                k += a.charAt(m)
        }
        return k
    }, _possibleChars: function (a) {
        var b = "", c = !1, d = function (b) {
            var c = e + 1 < a.length && a.charAt(e + 1) == b;
            return c && e++, c
        };
        for (var e = 0; e < a.length; e++)if (c)a.charAt(e) == "'" && !d("'") ? c = !1 : b += a.charAt(e); else switch (a.charAt(e)) {
            case"d":
            case"m":
            case"y":
            case"@":
                b += "0123456789";
                break;
            case"D":
            case"M":
                return null;
            case"'":
                d("'") ? b += "'" : c = !0;
                break;
            default:
                b += a.charAt(e)
        }
        return b
    }, _get: function (a, b) {
        return a.settings[b] !== undefined ? a.settings[b] : this._defaults[b]
    }, _setDateFromField: function (a, b) {
        if (a.input.val() == a.lastVal)return;
        var c = this._get(a, "dateFormat"), d = a.lastVal = a.input ? a.input.val() : null, e, f;
        e = f = this._getDefaultDate(a);
        var g = this._getFormatConfig(a);
        try {
            e = this.parseDate(c, d, g) || f
        } catch (h) {
            this.log(h), d = b ? "" : d
        }
        a.selectedDay = e.getDate(), a.drawMonth = a.selectedMonth = e.getMonth(), a.drawYear = a.selectedYear = e.getFullYear(), a.currentDay = d ? e.getDate() : 0, a.currentMonth = d ? e.getMonth() : 0, a.currentYear = d ? e.getFullYear() : 0, this._adjustInstDate(a)
    }, _getDefaultDate: function (a) {
        return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
    }, _determineDate: function (a, b, c) {
        var d = function (a) {
            var b = new Date;
            return b.setDate(b.getDate() + a), b
        }, e = function (b) {
            try {
                return $.datepicker.parseDate($.datepicker._get(a, "dateFormat"), b, $.datepicker._getFormatConfig(a))
            } catch (c) {
            }
            var d = (b.toLowerCase().match(/^c/) ? $.datepicker._getDate(a) : null) || new Date, e = d.getFullYear(), f = d.getMonth(), g = d.getDate(), h = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, i = h.exec(b);
            while (i) {
                switch (i[2] || "d") {
                    case"d":
                    case"D":
                        g += parseInt(i[1], 10);
                        break;
                    case"w":
                    case"W":
                        g += parseInt(i[1], 10) * 7;
                        break;
                    case"m":
                    case"M":
                        f += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f));
                        break;
                    case"y":
                    case"Y":
                        e += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f))
                }
                i = h.exec(b)
            }
            return new Date(e, f, g)
        }, f = b == null || b === "" ? c : typeof b == "string" ? e(b) : typeof b == "number" ? isNaN(b) ? c : d(b) : new Date(b.getTime());
        return f = f && f.toString() == "Invalid Date" ? c : f, f && (f.setHours(0), f.setMinutes(0), f.setSeconds(0), f.setMilliseconds(0)), this._daylightSavingAdjust(f)
    }, _daylightSavingAdjust: function (a) {
        return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null
    }, _setDate: function (a, b, c) {
        var d = !b, e = a.selectedMonth, f = a.selectedYear, g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
        a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), (e != a.selectedMonth || f != a.selectedYear) && !c && this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a))
    }, _getDate: function (a) {
        var b = !a.currentYear || a.input && a.input.val() == "" ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
        return b
    }, _generateHTML: function (a) {
        var b = new Date;
        b = this._daylightSavingAdjust(new Date(b.getFullYear(), b.getMonth(), b.getDate()));
        var c = this._get(a, "isRTL"), d = this._get(a, "showButtonPanel"), e = this._get(a, "hideIfNoPrevNext"), f = this._get(a, "navigationAsDateFormat"), g = this._getNumberOfMonths(a), h = this._get(a, "showCurrentAtPos"), i = this._get(a, "stepMonths"), j = g[0] != 1 || g[1] != 1, k = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)), l = this._getMinMaxDate(a, "min"), m = this._getMinMaxDate(a, "max"), n = a.drawMonth - h, o = a.drawYear;
        n < 0 && (n += 12, o--);
        if (m) {
            var p = this._daylightSavingAdjust(new Date(m.getFullYear(), m.getMonth() - g[0] * g[1] + 1, m.getDate()));
            p = l && p < l ? l : p;
            while (this._daylightSavingAdjust(new Date(o, n, 1)) > p)n--, n < 0 && (n = 11, o--)
        }
        a.drawMonth = n, a.drawYear = o;
        var q = this._get(a, "prevText");
        q = f ? this.formatDate(q, this._daylightSavingAdjust(new Date(o, n - i, 1)), this._getFormatConfig(a)) : q;
        var r = this._canAdjustMonth(a, -1, o, n) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + a.id + "', -" + i + ", 'M');\"" + ' title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>" : e ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>", s = this._get(a, "nextText");
        s = f ? this.formatDate(s, this._daylightSavingAdjust(new Date(o, n + i, 1)), this._getFormatConfig(a)) : s;
        var t = this._canAdjustMonth(a, 1, o, n) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + a.id + "', +" + i + ", 'M');\"" + ' title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>" : e ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>", u = this._get(a, "currentText"), v = this._get(a, "gotoCurrent") && a.currentDay ? k : b;
        u = f ? this.formatDate(u, v, this._getFormatConfig(a)) : u;
        var w = a.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._hideDatepicker();">' + this._get(a, "closeText") + "</button>", x = d ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (c ? w : "") + (this._isInRange(a, v) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._gotoToday('#" + a.id + "');\"" + ">" + u + "</button>" : "") + (c ? "" : w) + "</div>" : "", y = parseInt(this._get(a, "firstDay"), 10);
        y = isNaN(y) ? 0 : y;
        var z = this._get(a, "showWeek"), A = this._get(a, "dayNames"), B = this._get(a, "dayNamesShort"), C = this._get(a, "dayNamesMin"), D = this._get(a, "monthNames"), E = this._get(a, "monthNamesShort"), F = this._get(a, "beforeShowDay"), G = this._get(a, "showOtherMonths"), H = this._get(a, "selectOtherMonths"), I = this._get(a, "calculateWeek") || this.iso8601Week, J = this._getDefaultDate(a), K = "";
        for (var L = 0; L < g[0]; L++) {
            var M = "";
            this.maxRows = 4;
            for (var N = 0; N < g[1]; N++) {
                var O = this._daylightSavingAdjust(new Date(o, n, a.selectedDay)), P = " ui-corner-all", Q = "";
                if (j) {
                    Q += '<div class="ui-datepicker-group';
                    if (g[1] > 1)switch (N) {
                        case 0:
                            Q += " ui-datepicker-group-first", P = " ui-corner-" + (c ? "right" : "left");
                            break;
                        case g[1] - 1:
                            Q += " ui-datepicker-group-last", P = " ui-corner-" + (c ? "left" : "right");
                            break;
                        default:
                            Q += " ui-datepicker-group-middle", P = ""
                    }
                    Q += '">'
                }
                Q += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + P + '">' + (/all|left/.test(P) && L == 0 ? c ? t : r : "") + (/all|right/.test(P) && L == 0 ? c ? r : t : "") + this._generateMonthYearHeader(a, n, o, l, m, L > 0 || N > 0, D, E) + '</div><table class="ui-datepicker-calendar"><thead>' + "<tr>";
                var R = z ? '<th class="ui-datepicker-week-col">' + this._get(a, "weekHeader") + "</th>" : "";
                for (var S = 0; S < 7; S++) {
                    var T = (S + y) % 7;
                    R += "<th" + ((S + y + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + ">" + '<span title="' + A[T] + '">' + C[T] + "</span></th>"
                }
                Q += R + "</tr></thead><tbody>";
                var U = this._getDaysInMonth(o, n);
                o == a.selectedYear && n == a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, U));
                var V = (this._getFirstDayOfMonth(o, n) - y + 7) % 7, W = Math.ceil((V + U) / 7), X = j ? this.maxRows > W ? this.maxRows : W : W;
                this.maxRows = X;
                var Y = this._daylightSavingAdjust(new Date(o, n, 1 - V));
                for (var Z = 0; Z < X; Z++) {
                    Q += "<tr>";
                    var _ = z ? '<td class="ui-datepicker-week-col">' + this._get(a, "calculateWeek")(Y) + "</td>" : "";
                    for (var S = 0; S < 7; S++) {
                        var ba = F ? F.apply(a.input ? a.input[0] : null, [Y]) : [!0, ""], bb = Y.getMonth() != n, bc = bb && !H || !ba[0] || l && Y < l || m && Y > m;
                        _ += '<td class="' + ((S + y + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (bb ? " ui-datepicker-other-month" : "") + (Y.getTime() == O.getTime() && n == a.selectedMonth && a._keyEvent || J.getTime() == Y.getTime() && J.getTime() == O.getTime() ? " " + this._dayOverClass : "") + (bc ? " " + this._unselectableClass + " ui-state-disabled" : "") + (bb && !G ? "" : " " + ba[1] + (Y.getTime() == k.getTime() ? " " + this._currentClass : "") + (Y.getTime() == b.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!bb || G) && ba[2] ? ' title="' + ba[2] + '"' : "") + (bc ? "" : ' onclick="DP_jQuery_' + dpuuid + ".datepicker._selectDay('#" + a.id + "'," + Y.getMonth() + "," + Y.getFullYear() + ', this);return false;"') + ">" + (bb && !G ? "&#xa0;" : bc ? '<span class="ui-state-default">' + Y.getDate() + "</span>" : '<a class="ui-state-default' + (Y.getTime() == b.getTime() ? " ui-state-highlight" : "") + (Y.getTime() == k.getTime() ? " ui-state-active" : "") + (bb ? " ui-priority-secondary" : "") + '" href="#">' + Y.getDate() + "</a>") + "</td>", Y.setDate(Y.getDate() + 1), Y = this._daylightSavingAdjust(Y)
                    }
                    Q += _ + "</tr>"
                }
                n++, n > 11 && (n = 0, o++), Q += "</tbody></table>" + (j ? "</div>" + (g[0] > 0 && N == g[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""), M += Q
            }
            K += M
        }
        return K += x + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !a.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), a._keyEvent = !1, K
    }, _generateMonthYearHeader: function (a, b, c, d, e, f, g, h) {
        var i = this._get(a, "changeMonth"), j = this._get(a, "changeYear"), k = this._get(a, "showMonthAfterYear"), l = '<div class="ui-datepicker-title">', m = "";
        if (f || !i)m += '<span class="ui-datepicker-month">' + g[b] + "</span>"; else {
            var n = d && d.getFullYear() == c, o = e && e.getFullYear() == c;
            m += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + a.id + "', this, 'M');\" " + ">";
            for (var p = 0; p < 12; p++)(!n || p >= d.getMonth()) && (!o || p <= e.getMonth()) && (m += '<option value="' + p + '"' + (p == b ? ' selected="selected"' : "") + ">" + h[p] + "</option>");
            m += "</select>"
        }
        k || (l += m + (f || !i || !j ? "&#xa0;" : ""));
        if (!a.yearshtml) {
            a.yearshtml = "";
            if (f || !j)l += '<span class="ui-datepicker-year">' + c + "</span>"; else {
                var q = this._get(a, "yearRange").split(":"), r = (new Date).getFullYear(), s = function (a) {
                    var b = a.match(/c[+-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+-].*/) ? r + parseInt(a, 10) : parseInt(a, 10);
                    return isNaN(b) ? r : b
                }, t = s(q[0]), u = Math.max(t, s(q[1] || ""));
                t = d ? Math.max(t, d.getFullYear()) : t, u = e ? Math.min(u, e.getFullYear()) : u, a.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + a.id + "', this, 'Y');\" " + ">";
                for (; t <= u; t++)a.yearshtml += '<option value="' + t + '"' + (t == c ? ' selected="selected"' : "") + ">" + t + "</option>";
                a.yearshtml += "</select>", l += a.yearshtml, a.yearshtml = null
            }
        }
        return l += this._get(a, "yearSuffix"), k && (l += (f || !i || !j ? "&#xa0;" : "") + m), l += "</div>", l
    }, _adjustInstDate: function (a, b, c) {
        var d = a.drawYear + (c == "Y" ? b : 0), e = a.drawMonth + (c == "M" ? b : 0), f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + (c == "D" ? b : 0), g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
        a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), (c == "M" || c == "Y") && this._notifyChange(a)
    }, _restrictMinMax: function (a, b) {
        var c = this._getMinMaxDate(a, "min"), d = this._getMinMaxDate(a, "max"), e = c && b < c ? c : b;
        return e = d && e > d ? d : e, e
    }, _notifyChange: function (a) {
        var b = this._get(a, "onChangeMonthYear");
        b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
    }, _getNumberOfMonths: function (a) {
        var b = this._get(a, "numberOfMonths");
        return b == null ? [1, 1] : typeof b == "number" ? [1, b] : b
    }, _getMinMaxDate: function (a, b) {
        return this._determineDate(a, this._get(a, b + "Date"), null)
    }, _getDaysInMonth: function (a, b) {
        return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
    }, _getFirstDayOfMonth: function (a, b) {
        return(new Date(a, b, 1)).getDay()
    }, _canAdjustMonth: function (a, b, c, d) {
        var e = this._getNumberOfMonths(a), f = this._daylightSavingAdjust(new Date(c, d + (b < 0 ? b : e[0] * e[1]), 1));
        return b < 0 && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f)
    }, _isInRange: function (a, b) {
        var c = this._getMinMaxDate(a, "min"), d = this._getMinMaxDate(a, "max");
        return(!c || b.getTime() >= c.getTime()) && (!d || b.getTime() <= d.getTime())
    }, _getFormatConfig: function (a) {
        var b = this._get(a, "shortYearCutoff");
        return b = typeof b != "string" ? b : (new Date).getFullYear() % 100 + parseInt(b, 10), {shortYearCutoff: b, dayNamesShort: this._get(a, "dayNamesShort"), dayNames: this._get(a, "dayNames"), monthNamesShort: this._get(a, "monthNamesShort"), monthNames: this._get(a, "monthNames")}
    }, _formatDate: function (a, b, c, d) {
        b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
        var e = b ? typeof b == "object" ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
        return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a))
    }}), $.fn.datepicker = function (a) {
        if (!this.length)return this;
        $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), $.datepicker.initialized = !0);
        var b = Array.prototype.slice.call(arguments, 1);
        return typeof a != "string" || a != "isDisabled" && a != "getDate" && a != "widget" ? a == "option" && arguments.length == 2 && typeof arguments[1] == "string" ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b)) : this.each(function () {
            typeof a == "string" ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this].concat(b)) : $.datepicker._attachDatepicker(this, a)
        }) : $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b))
    }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "@VERSION", window["DP_jQuery_" + dpuuid] = $
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.progressbar.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.widget("ui.progressbar", {options: {value: 0, max: 100}, min: 0, _create: function () {
        this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role: "progressbar", "aria-valuemin": this.min, "aria-valuemax": this.options.max, "aria-valuenow": this._value()}), this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this.oldValue = this._value(), this._refreshValue()
    }, destroy: function () {
        this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove(), a.Widget.prototype.destroy.apply(this, arguments)
    }, value: function (a) {
        return a === b ? this._value() : (this._setOption("value", a), this)
    }, _setOption: function (b, c) {
        b === "value" && (this.options.value = c, this._refreshValue(), this._value() === this.options.max && this._trigger("complete")), a.Widget.prototype._setOption.apply(this, arguments)
    }, _value: function () {
        var a = this.options.value;
        return typeof a != "number" && (a = 0), Math.min(this.options.max, Math.max(this.min, a))
    }, _percentage: function () {
        return 100 * this._value() / this.options.max
    }, _refreshValue: function () {
        var a = this.value(), b = this._percentage();
        this.oldValue !== a && (this.oldValue = a, this._trigger("change")), this.valueDiv.toggle(a > this.min).toggleClass("ui-corner-right", a === this.options.max).width(b.toFixed(0) + "%"), this.element.attr("aria-valuenow", a)
    }}), a.extend(a.ui.progressbar, {version: "1.8.19"})
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.core.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
jQuery.effects || function (a, b) {
    function c(b) {
        var c;
        return b && b.constructor == Array && b.length == 3 ? b : (c = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b)) ? [parseInt(c[1], 10), parseInt(c[2], 10), parseInt(c[3], 10)] : (c = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b)) ? [parseFloat(c[1]) * 2.55, parseFloat(c[2]) * 2.55, parseFloat(c[3]) * 2.55] : (c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b)) ? [parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16)] : (c = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b)) ? [parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16)] : (c = /rgba\(0, 0, 0, 0\)/.exec(b)) ? e.transparent : e[a.trim(b).toLowerCase()]
    }

    function d(b, d) {
        var e;
        do {
            e = a.curCSS(b, d);
            if (e != "" && e != "transparent" || a.nodeName(b, "body"))break;
            d = "backgroundColor"
        } while (b = b.parentNode);
        return c(e)
    }

    function h() {
        var a = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle, b = {}, c, d;
        if (a && a.length && a[0] && a[a[0]]) {
            var e = a.length;
            while (e--)c = a[e], typeof a[c] == "string" && (d = c.replace(/\-(\w)/g, function (a, b) {
                return b.toUpperCase()
            }), b[d] = a[c])
        } else for (c in a)typeof a[c] == "string" && (b[c] = a[c]);
        return b
    }

    function i(b) {
        var c, d;
        for (c in b)d = b[c], (d == null || a.isFunction(d) || c in g || /scrollbar/.test(c) || !/color/i.test(c) && isNaN(parseFloat(d))) && delete b[c];
        return b
    }

    function j(a, b) {
        var c = {_: 0}, d;
        for (d in b)a[d] != b[d] && (c[d] = b[d]);
        return c
    }

    function k(b, c, d, e) {
        typeof b == "object" && (e = c, d = null, c = b, b = c.effect), a.isFunction(c) && (e = c, d = null, c = {});
        if (typeof c == "number" || a.fx.speeds[c])e = d, d = c, c = {};
        return a.isFunction(d) && (e = d, d = null), c = c || {}, d = d || c.duration, d = a.fx.off ? 0 : typeof d == "number" ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, e = e || c.complete, [b, c, d, e]
    }

    function l(b) {
        return!b || typeof b == "number" || a.fx.speeds[b] ? !0 : typeof b == "string" && !a.effects[b] ? !0 : !1
    }

    a.effects = {}, a.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function (b, e) {
        a.fx.step[e] = function (a) {
            a.colorInit || (a.start = d(a.elem, e), a.end = c(a.end), a.colorInit = !0), a.elem.style[e] = "rgb(" + Math.max(Math.min(parseInt(a.pos * (a.end[0] - a.start[0]) + a.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[1] - a.start[1]) + a.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[2] - a.start[2]) + a.start[2], 10), 255), 0) + ")"
        }
    });
    var e = {aqua: [0, 255, 255], azure: [240, 255, 255], beige: [245, 245, 220], black: [0, 0, 0], blue: [0, 0, 255], brown: [165, 42, 42], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgrey: [169, 169, 169], darkgreen: [0, 100, 0], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkviolet: [148, 0, 211], fuchsia: [255, 0, 255], gold: [255, 215, 0], green: [0, 128, 0], indigo: [75, 0, 130], khaki: [240, 230, 140], lightblue: [173, 216, 230], lightcyan: [224, 255, 255], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightyellow: [255, 255, 224], lime: [0, 255, 0], magenta: [255, 0, 255], maroon: [128, 0, 0], navy: [0, 0, 128], olive: [128, 128, 0], orange: [255, 165, 0], pink: [255, 192, 203], purple: [128, 0, 128], violet: [128, 0, 128], red: [255, 0, 0], silver: [192, 192, 192], white: [255, 255, 255], yellow: [255, 255, 0], transparent: [255, 255, 255]}, f = ["add", "remove", "toggle"], g = {border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1, borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1};
    a.effects.animateClass = function (b, c, d, e) {
        return a.isFunction(d) && (e = d, d = null), this.queue(function () {
            var g = a(this), k = g.attr("style") || " ", l = i(h.call(this)), m, n = g.attr("class") || "";
            a.each(f, function (a, c) {
                b[c] && g[c + "Class"](b[c])
            }), m = i(h.call(this)), g.attr("class", n), g.animate(j(l, m), {queue: !1, duration: c, easing: d, complete: function () {
                a.each(f, function (a, c) {
                    b[c] && g[c + "Class"](b[c])
                }), typeof g.attr("style") == "object" ? (g.attr("style").cssText = "", g.attr("style").cssText = k) : g.attr("style", k), e && e.apply(this, arguments), a.dequeue(this)
            }})
        })
    }, a.fn.extend({_addClass: a.fn.addClass, addClass: function (b, c, d, e) {
        return c ? a.effects.animateClass.apply(this, [
            {add: b},
            c,
            d,
            e
        ]) : this._addClass(b)
    }, _removeClass: a.fn.removeClass, removeClass: function (b, c, d, e) {
        return c ? a.effects.animateClass.apply(this, [
            {remove: b},
            c,
            d,
            e
        ]) : this._removeClass(b)
    }, _toggleClass: a.fn.toggleClass, toggleClass: function (c, d, e, f, g) {
        return typeof d == "boolean" || d === b ? e ? a.effects.animateClass.apply(this, [d ? {add: c} : {remove: c}, e, f, g]) : this._toggleClass(c, d) : a.effects.animateClass.apply(this, [
            {toggle: c},
            d,
            e,
            f
        ])
    }, switchClass: function (b, c, d, e, f) {
        return a.effects.animateClass.apply(this, [
            {add: c, remove: b},
            d,
            e,
            f
        ])
    }}), a.extend(a.effects, {version: "1.8.19", save: function (a, b) {
        for (var c = 0; c < b.length; c++)b[c] !== null && a.data("ec.storage." + b[c], a[0].style[b[c]])
    }, restore: function (a, b) {
        for (var c = 0; c < b.length; c++)b[c] !== null && a.css(b[c], a.data("ec.storage." + b[c]))
    }, setMode: function (a, b) {
        return b == "toggle" && (b = a.is(":hidden") ? "show" : "hide"), b
    }, getBaseline: function (a, b) {
        var c, d;
        switch (a[0]) {
            case"top":
                c = 0;
                break;
            case"middle":
                c = .5;
                break;
            case"bottom":
                c = 1;
                break;
            default:
                c = a[0] / b.height
        }
        switch (a[1]) {
            case"left":
                d = 0;
                break;
            case"center":
                d = .5;
                break;
            case"right":
                d = 1;
                break;
            default:
                d = a[1] / b.width
        }
        return{x: d, y: c}
    }, createWrapper: function (b) {
        if (b.parent().is(".ui-effects-wrapper"))return b.parent();
        var c = {width: b.outerWidth(!0), height: b.outerHeight(!0), "float": b.css("float")}, d = a("<div></div>").addClass("ui-effects-wrapper").css({fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0}), e = document.activeElement;
        return b.wrap(d), (b[0] === e || a.contains(b[0], e)) && a(e).focus(), d = b.parent(), b.css("position") == "static" ? (d.css({position: "relative"}), b.css({position: "relative"})) : (a.extend(c, {position: b.css("position"), zIndex: b.css("z-index")}), a.each(["top", "left", "bottom", "right"], function (a, d) {
            c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
        }), b.css({position: "relative", top: 0, left: 0, right: "auto", bottom: "auto"})), d.css(c).show()
    }, removeWrapper: function (b) {
        var c, d = document.activeElement;
        return b.parent().is(".ui-effects-wrapper") ? (c = b.parent().replaceWith(b), (b[0] === d || a.contains(b[0], d)) && a(d).focus(), c) : b
    }, setTransition: function (b, c, d, e) {
        return e = e || {}, a.each(c, function (a, c) {
            var f = b.cssUnit(c);
            f[0] > 0 && (e[c] = f[0] * d + f[1])
        }), e
    }}), a.fn.extend({effect: function (b, c, d, e) {
        var f = k.apply(this, arguments), g = {options: f[1], duration: f[2], callback: f[3]}, h = g.options.mode, i = a.effects[b];
        return a.fx.off || !i ? h ? this[h](g.duration, g.callback) : this.each(function () {
            g.callback && g.callback.call(this)
        }) : i.call(this, g)
    }, _show: a.fn.show, show: function (a) {
        if (l(a))return this._show.apply(this, arguments);
        var b = k.apply(this, arguments);
        return b[1].mode = "show", this.effect.apply(this, b)
    }, _hide: a.fn.hide, hide: function (a) {
        if (l(a))return this._hide.apply(this, arguments);
        var b = k.apply(this, arguments);
        return b[1].mode = "hide", this.effect.apply(this, b)
    }, __toggle: a.fn.toggle, toggle: function (b) {
        if (l(b) || typeof b == "boolean" || a.isFunction(b))return this.__toggle.apply(this, arguments);
        var c = k.apply(this, arguments);
        return c[1].mode = "toggle", this.effect.apply(this, c)
    }, cssUnit: function (b) {
        var c = this.css(b), d = [];
        return a.each(["em", "px", "%", "pt"], function (a, b) {
            c.indexOf(b) > 0 && (d = [parseFloat(c), b])
        }), d
    }}), a.easing.jswing = a.easing.swing, a.extend(a.easing, {def: "easeOutQuad", swing: function (b, c, d, e, f) {
        return a.easing[a.easing.def](b, c, d, e, f)
    }, easeInQuad: function (a, b, c, d, e) {
        return d * (b /= e) * b + c
    }, easeOutQuad: function (a, b, c, d, e) {
        return-d * (b /= e) * (b - 2) + c
    }, easeInOutQuad: function (a, b, c, d, e) {
        return(b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
    }, easeInCubic: function (a, b, c, d, e) {
        return d * (b /= e) * b * b + c
    }, easeOutCubic: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b + 1) + c
    }, easeInOutCubic: function (a, b, c, d, e) {
        return(b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
    }, easeInQuart: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b + c
    }, easeOutQuart: function (a, b, c, d, e) {
        return-d * ((b = b / e - 1) * b * b * b - 1) + c
    }, easeInOutQuart: function (a, b, c, d, e) {
        return(b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
    }, easeInQuint: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b * b + c
    }, easeOutQuint: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b * b * b + 1) + c
    }, easeInOutQuint: function (a, b, c, d, e) {
        return(b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
    }, easeInSine: function (a, b, c, d, e) {
        return-d * Math.cos(b / e * (Math.PI / 2)) + d + c
    }, easeOutSine: function (a, b, c, d, e) {
        return d * Math.sin(b / e * (Math.PI / 2)) + c
    }, easeInOutSine: function (a, b, c, d, e) {
        return-d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
    }, easeInExpo: function (a, b, c, d, e) {
        return b == 0 ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
    }, easeOutExpo: function (a, b, c, d, e) {
        return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
    }, easeInOutExpo: function (a, b, c, d, e) {
        return b == 0 ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
    }, easeInCirc: function (a, b, c, d, e) {
        return-d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
    }, easeOutCirc: function (a, b, c, d, e) {
        return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
    }, easeInOutCirc: function (a, b, c, d, e) {
        return(b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
    }, easeInElastic: function (a, b, c, d, e) {
        var f = 1.70158, g = 0, h = d;
        if (b == 0)return c;
        if ((b /= e) == 1)return c + d;
        g || (g = e * .3);
        if (h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return-(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c
    }, easeOutElastic: function (a, b, c, d, e) {
        var f = 1.70158, g = 0, h = d;
        if (b == 0)return c;
        if ((b /= e) == 1)return c + d;
        g || (g = e * .3);
        if (h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
    }, easeInOutElastic: function (a, b, c, d, e) {
        var f = 1.70158, g = 0, h = d;
        if (b == 0)return c;
        if ((b /= e / 2) == 2)return c + d;
        g || (g = e * .3 * 1.5);
        if (h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return b < 1 ? -0.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) * .5 + d + c
    }, easeInBack: function (a, c, d, e, f, g) {
        return g == b && (g = 1.70158), e * (c /= f) * c * ((g + 1) * c - g) + d
    }, easeOutBack: function (a, c, d, e, f, g) {
        return g == b && (g = 1.70158), e * ((c = c / f - 1) * c * ((g + 1) * c + g) + 1) + d
    }, easeInOutBack: function (a, c, d, e, f, g) {
        return g == b && (g = 1.70158), (c /= f / 2) < 1 ? e / 2 * c * c * (((g *= 1.525) + 1) * c - g) + d : e / 2 * ((c -= 2) * c * (((g *= 1.525) + 1) * c + g) + 2) + d
    }, easeInBounce: function (b, c, d, e, f) {
        return e - a.easing.easeOutBounce(b, f - c, 0, e, f) + d
    }, easeOutBounce: function (a, b, c, d, e) {
        return(b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
    }, easeInOutBounce: function (b, c, d, e, f) {
        return c < f / 2 ? a.easing.easeInBounce(b, c * 2, 0, e, f) * .5 + d : a.easing.easeOutBounce(b, c * 2 - f, 0, e, f) * .5 + e * .5 + d
    }})
}(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.blind.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.effects.blind = function (b) {
        return this.queue(function () {
            var c = a(this), d = ["position", "top", "bottom", "left", "right"], e = a.effects.setMode(c, b.options.mode || "hide"), f = b.options.direction || "vertical";
            a.effects.save(c, d), c.show();
            var g = a.effects.createWrapper(c).css({overflow: "hidden"}), h = f == "vertical" ? "height" : "width", i = f == "vertical" ? g.height() : g.width();
            e == "show" && g.css(h, 0);
            var j = {};
            j[h] = e == "show" ? i : 0, g.animate(j, b.duration, b.options.easing, function () {
                e == "hide" && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(c[0], arguments), c.dequeue()
            })
        })
    }
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.bounce.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.effects.bounce = function (b) {
        return this.queue(function () {
            var c = a(this), d = ["position", "top", "bottom", "left", "right"], e = a.effects.setMode(c, b.options.mode || "effect"), f = b.options.direction || "up", g = b.options.distance || 20, h = b.options.times || 5, i = b.duration || 250;
            /show|hide/.test(e) && d.push("opacity"), a.effects.save(c, d), c.show(), a.effects.createWrapper(c);
            var j = f == "up" || f == "down" ? "top" : "left", k = f == "up" || f == "left" ? "pos" : "neg", g = b.options.distance || (j == "top" ? c.outerHeight({margin: !0}) / 3 : c.outerWidth({margin: !0}) / 3);
            e == "show" && c.css("opacity", 0).css(j, k == "pos" ? -g : g), e == "hide" && (g = g / (h * 2)), e != "hide" && h--;
            if (e == "show") {
                var l = {opacity: 1};
                l[j] = (k == "pos" ? "+=" : "-=") + g, c.animate(l, i / 2, b.options.easing), g = g / 2, h--
            }
            for (var m = 0; m < h; m++) {
                var n = {}, p = {};
                n[j] = (k == "pos" ? "-=" : "+=") + g, p[j] = (k == "pos" ? "+=" : "-=") + g, c.animate(n, i / 2, b.options.easing).animate(p, i / 2, b.options.easing), g = e == "hide" ? g * 2 : g / 2
            }
            if (e == "hide") {
                var l = {opacity: 0};
                l[j] = (k == "pos" ? "-=" : "+=") + g, c.animate(l, i / 2, b.options.easing, function () {
                    c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments)
                })
            } else {
                var n = {}, p = {};
                n[j] = (k == "pos" ? "-=" : "+=") + g, p[j] = (k == "pos" ? "+=" : "-=") + g, c.animate(n, i / 2, b.options.easing).animate(p, i / 2, b.options.easing, function () {
                    a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments)
                })
            }
            c.queue("fx", function () {
                c.dequeue()
            }), c.dequeue()
        })
    }
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.clip.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.effects.clip = function (b) {
        return this.queue(function () {
            var c = a(this), d = ["position", "top", "bottom", "left", "right", "height", "width"], e = a.effects.setMode(c, b.options.mode || "hide"), f = b.options.direction || "vertical";
            a.effects.save(c, d), c.show();
            var g = a.effects.createWrapper(c).css({overflow: "hidden"}), h = c[0].tagName == "IMG" ? g : c, i = {size: f == "vertical" ? "height" : "width", position: f == "vertical" ? "top" : "left"}, j = f == "vertical" ? h.height() : h.width();
            e == "show" && (h.css(i.size, 0), h.css(i.position, j / 2));
            var k = {};
            k[i.size] = e == "show" ? j : 0, k[i.position] = e == "show" ? 0 : j / 2, h.animate(k, {queue: !1, duration: b.duration, easing: b.options.easing, complete: function () {
                e == "hide" && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(c[0], arguments), c.dequeue()
            }})
        })
    }
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.drop.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.effects.drop = function (b) {
        return this.queue(function () {
            var c = a(this), d = ["position", "top", "bottom", "left", "right", "opacity"], e = a.effects.setMode(c, b.options.mode || "hide"), f = b.options.direction || "left";
            a.effects.save(c, d), c.show(), a.effects.createWrapper(c);
            var g = f == "up" || f == "down" ? "top" : "left", h = f == "up" || f == "left" ? "pos" : "neg", i = b.options.distance || (g == "top" ? c.outerHeight({margin: !0}) / 2 : c.outerWidth({margin: !0}) / 2);
            e == "show" && c.css("opacity", 0).css(g, h == "pos" ? -i : i);
            var j = {opacity: e == "show" ? 1 : 0};
            j[g] = (e == "show" ? h == "pos" ? "+=" : "-=" : h == "pos" ? "-=" : "+=") + i, c.animate(j, {queue: !1, duration: b.duration, easing: b.options.easing, complete: function () {
                e == "hide" && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue()
            }})
        })
    }
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.explode.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.effects.explode = function (b) {
        return this.queue(function () {
            var c = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3, d = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3;
            b.options.mode = b.options.mode == "toggle" ? a(this).is(":visible") ? "hide" : "show" : b.options.mode;
            var e = a(this).show().css("visibility", "hidden"), f = e.offset();
            f.top -= parseInt(e.css("marginTop"), 10) || 0, f.left -= parseInt(e.css("marginLeft"), 10) || 0;
            var g = e.outerWidth(!0), h = e.outerHeight(!0);
            for (var i = 0; i < c; i++)for (var j = 0; j < d; j++)e.clone().appendTo("body").wrap("<div></div>").css({position: "absolute", visibility: "visible", left: -j * (g / d), top: -i * (h / c)}).parent().addClass("ui-effects-explode").css({position: "absolute", overflow: "hidden", width: g / d, height: h / c, left: f.left + j * (g / d) + (b.options.mode == "show" ? (j - Math.floor(d / 2)) * (g / d) : 0), top: f.top + i * (h / c) + (b.options.mode == "show" ? (i - Math.floor(c / 2)) * (h / c) : 0), opacity: b.options.mode == "show" ? 0 : 1}).animate({left: f.left + j * (g / d) + (b.options.mode == "show" ? 0 : (j - Math.floor(d / 2)) * (g / d)), top: f.top + i * (h / c) + (b.options.mode == "show" ? 0 : (i - Math.floor(c / 2)) * (h / c)), opacity: b.options.mode == "show" ? 1 : 0}, b.duration || 500);
            setTimeout(function () {
                b.options.mode == "show" ? e.css({visibility: "visible"}) : e.css({visibility: "visible"}).hide(), b.callback && b.callback.apply(e[0]), e.dequeue(), a("div.ui-effects-explode").remove()
            }, b.duration || 500)
        })
    }
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.fade.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.effects.fade = function (b) {
        return this.queue(function () {
            var c = a(this), d = a.effects.setMode(c, b.options.mode || "hide");
            c.animate({opacity: d}, {queue: !1, duration: b.duration, easing: b.options.easing, complete: function () {
                b.callback && b.callback.apply(this, arguments), c.dequeue()
            }})
        })
    }
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.fold.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.effects.fold = function (b) {
        return this.queue(function () {
            var c = a(this), d = ["position", "top", "bottom", "left", "right"], e = a.effects.setMode(c, b.options.mode || "hide"), f = b.options.size || 15, g = !!b.options.horizFirst, h = b.duration ? b.duration / 2 : a.fx.speeds._default / 2;
            a.effects.save(c, d), c.show();
            var i = a.effects.createWrapper(c).css({overflow: "hidden"}), j = e == "show" != g, k = j ? ["width", "height"] : ["height", "width"], l = j ? [i.width(), i.height()] : [i.height(), i.width()], m = /([0-9]+)%/.exec(f);
            m && (f = parseInt(m[1], 10) / 100 * l[e == "hide" ? 0 : 1]), e == "show" && i.css(g ? {height: 0, width: f} : {height: f, width: 0});
            var n = {}, p = {};
            n[k[0]] = e == "show" ? l[0] : f, p[k[1]] = e == "show" ? l[1] : 0, i.animate(n, h, b.options.easing).animate(p, h, b.options.easing, function () {
                e == "hide" && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(c[0], arguments), c.dequeue()
            })
        })
    }
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.highlight.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.effects.highlight = function (b) {
        return this.queue(function () {
            var c = a(this), d = ["backgroundImage", "backgroundColor", "opacity"], e = a.effects.setMode(c, b.options.mode || "show"), f = {backgroundColor: c.css("backgroundColor")};
            e == "hide" && (f.opacity = 0), a.effects.save(c, d), c.show().css({backgroundImage: "none", backgroundColor: b.options.color || "#ffff99"}).animate(f, {queue: !1, duration: b.duration, easing: b.options.easing, complete: function () {
                e == "hide" && c.hide(), a.effects.restore(c, d), e == "show" && !a.support.opacity && this.style.removeAttribute("filter"), b.callback && b.callback.apply(this, arguments), c.dequeue()
            }})
        })
    }
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.pulsate.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.effects.pulsate = function (b) {
        return this.queue(function () {
            var c = a(this), d = a.effects.setMode(c, b.options.mode || "show"), e = (b.options.times || 5) * 2 - 1, f = b.duration ? b.duration / 2 : a.fx.speeds._default / 2, g = c.is(":visible"), h = 0;
            g || (c.css("opacity", 0).show(), h = 1), (d == "hide" && g || d == "show" && !g) && e--;
            for (var i = 0; i < e; i++)c.animate({opacity: h}, f, b.options.easing), h = (h + 1) % 2;
            c.animate({opacity: h}, f, b.options.easing, function () {
                h == 0 && c.hide(), b.callback && b.callback.apply(this, arguments)
            }), c.queue("fx",function () {
                c.dequeue()
            }).dequeue()
        })
    }
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.scale.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.effects.puff = function (b) {
        return this.queue(function () {
            var c = a(this), d = a.effects.setMode(c, b.options.mode || "hide"), e = parseInt(b.options.percent, 10) || 150, f = e / 100, g = {height: c.height(), width: c.width()};
            a.extend(b.options, {fade: !0, mode: d, percent: d == "hide" ? e : 100, from: d == "hide" ? g : {height: g.height * f, width: g.width * f}}), c.effect("scale", b.options, b.duration, b.callback), c.dequeue()
        })
    }, a.effects.scale = function (b) {
        return this.queue(function () {
            var c = a(this), d = a.extend(!0, {}, b.options), e = a.effects.setMode(c, b.options.mode || "effect"), f = parseInt(b.options.percent, 10) || (parseInt(b.options.percent, 10) == 0 ? 0 : e == "hide" ? 0 : 100), g = b.options.direction || "both", h = b.options.origin;
            e != "effect" && (d.origin = h || ["middle", "center"], d.restore = !0);
            var i = {height: c.height(), width: c.width()};
            c.from = b.options.from || (e == "show" ? {height: 0, width: 0} : i);
            var j = {y: g != "horizontal" ? f / 100 : 1, x: g != "vertical" ? f / 100 : 1};
            c.to = {height: i.height * j.y, width: i.width * j.x}, b.options.fade && (e == "show" && (c.from.opacity = 0, c.to.opacity = 1), e == "hide" && (c.from.opacity = 1, c.to.opacity = 0)), d.from = c.from, d.to = c.to, d.mode = e, c.effect("size", d, b.duration, b.callback), c.dequeue()
        })
    }, a.effects.size = function (b) {
        return this.queue(function () {
            var c = a(this), d = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"], e = ["position", "top", "bottom", "left", "right", "overflow", "opacity"], f = ["width", "height", "overflow"], g = ["fontSize"], h = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], i = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], j = a.effects.setMode(c, b.options.mode || "effect"), k = b.options.restore || !1, l = b.options.scale || "both", m = b.options.origin, n = {height: c.height(), width: c.width()};
            c.from = b.options.from || n, c.to = b.options.to || n;
            if (m) {
                var p = a.effects.getBaseline(m, n);
                c.from.top = (n.height - c.from.height) * p.y, c.from.left = (n.width - c.from.width) * p.x, c.to.top = (n.height - c.to.height) * p.y, c.to.left = (n.width - c.to.width) * p.x
            }
            var q = {from: {y: c.from.height / n.height, x: c.from.width / n.width}, to: {y: c.to.height / n.height, x: c.to.width / n.width}};
            if (l == "box" || l == "both")q.from.y != q.to.y && (d = d.concat(h), c.from = a.effects.setTransition(c, h, q.from.y, c.from), c.to = a.effects.setTransition(c, h, q.to.y, c.to)), q.from.x != q.to.x && (d = d.concat(i), c.from = a.effects.setTransition(c, i, q.from.x, c.from), c.to = a.effects.setTransition(c, i, q.to.x, c.to));
            (l == "content" || l == "both") && q.from.y != q.to.y && (d = d.concat(g), c.from = a.effects.setTransition(c, g, q.from.y, c.from), c.to = a.effects.setTransition(c, g, q.to.y, c.to)), a.effects.save(c, k ? d : e), c.show(), a.effects.createWrapper(c), c.css("overflow", "hidden").css(c.from);
            if (l == "content" || l == "both")h = h.concat(["marginTop", "marginBottom"]).concat(g), i = i.concat(["marginLeft", "marginRight"]), f = d.concat(h).concat(i), c.find("*[width]").each(function () {
                var c = a(this);
                k && a.effects.save(c, f);
                var d = {height: c.height(), width: c.width()};
                c.from = {height: d.height * q.from.y, width: d.width * q.from.x}, c.to = {height: d.height * q.to.y, width: d.width * q.to.x}, q.from.y != q.to.y && (c.from = a.effects.setTransition(c, h, q.from.y, c.from), c.to = a.effects.setTransition(c, h, q.to.y, c.to)), q.from.x != q.to.x && (c.from = a.effects.setTransition(c, i, q.from.x, c.from), c.to = a.effects.setTransition(c, i, q.to.x, c.to)), c.css(c.from), c.animate(c.to, b.duration, b.options.easing, function () {
                    k && a.effects.restore(c, f)
                })
            });
            c.animate(c.to, {queue: !1, duration: b.duration, easing: b.options.easing, complete: function () {
                c.to.opacity === 0 && c.css("opacity", c.from.opacity), j == "hide" && c.hide(), a.effects.restore(c, k ? d : e), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue()
            }})
        })
    }
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.shake.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.effects.shake = function (b) {
        return this.queue(function () {
            var c = a(this), d = ["position", "top", "bottom", "left", "right"], e = a.effects.setMode(c, b.options.mode || "effect"), f = b.options.direction || "left", g = b.options.distance || 20, h = b.options.times || 3, i = b.duration || b.options.duration || 140;
            a.effects.save(c, d), c.show(), a.effects.createWrapper(c);
            var j = f == "up" || f == "down" ? "top" : "left", k = f == "up" || f == "left" ? "pos" : "neg", l = {}, m = {}, n = {};
            l[j] = (k == "pos" ? "-=" : "+=") + g, m[j] = (k == "pos" ? "+=" : "-=") + g * 2, n[j] = (k == "pos" ? "-=" : "+=") + g * 2, c.animate(l, i, b.options.easing);
            for (var p = 1; p < h; p++)c.animate(m, i, b.options.easing).animate(n, i, b.options.easing);
            c.animate(m, i, b.options.easing).animate(l, i / 2, b.options.easing, function () {
                a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments)
            }), c.queue("fx", function () {
                c.dequeue()
            }), c.dequeue()
        })
    }
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.slide.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.effects.slide = function (b) {
        return this.queue(function () {
            var c = a(this), d = ["position", "top", "bottom", "left", "right"], e = a.effects.setMode(c, b.options.mode || "show"), f = b.options.direction || "left";
            a.effects.save(c, d), c.show(), a.effects.createWrapper(c).css({overflow: "hidden"});
            var g = f == "up" || f == "down" ? "top" : "left", h = f == "up" || f == "left" ? "pos" : "neg", i = b.options.distance || (g == "top" ? c.outerHeight({margin: !0}) : c.outerWidth({margin: !0}));
            e == "show" && c.css(g, h == "pos" ? isNaN(i) ? "-" + i : -i : i);
            var j = {};
            j[g] = (e == "show" ? h == "pos" ? "+=" : "-=" : h == "pos" ? "-=" : "+=") + i, c.animate(j, {queue: !1, duration: b.duration, easing: b.options.easing, complete: function () {
                e == "hide" && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue()
            }})
        })
    }
})(jQuery);
/*! jQuery UI - v1.8.19 - 2012-04-16
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.transfer.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    a.effects.transfer = function (b) {
        return this.queue(function () {
            var c = a(this), d = a(b.options.to), e = d.offset(), f = {top: e.top, left: e.left, height: d.innerHeight(), width: d.innerWidth()}, g = c.offset(), h = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({top: g.top, left: g.left, height: c.innerHeight(), width: c.innerWidth(), position: "absolute"}).animate(f, b.duration, b.options.easing, function () {
                h.remove(), b.callback && b.callback.apply(c[0], arguments), c.dequeue()
            })
        })
    }
})(jQuery);
/*!
 * jQuery contextMenu - Plugin for simple contextMenu handling
 *
 * Version: 1.5.25
 *
 * Authors: Rodney Rehm, Addy Osmani (patches for FF)
 * Web: http://medialize.github.com/jQuery-contextMenu/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */
(function (k, f) {
    k.support.htmlMenuitem = ("HTMLMenuItemElement" in window);
    k.support.htmlCommand = ("HTMLCommandElement" in window);
    k.support.eventSelectstart = ("onselectstart" in document.documentElement);
    var i = null, g = false, d = k(window), a = 0, b = {}, j = {}, n = {}, h = {selector: null, appendTo: null, trigger: "right", autoHide: false, delay: 200, determinePosition: function (r) {
        if (k.ui && k.ui.position) {
            r.css("display", "block").position({my: "center top", at: "center bottom", of: this, offset: "0 5", collision: "fit"}).css("display", "none")
        } else {
            var s = this.offset();
            s.top += this.outerHeight();
            s.left += this.outerWidth() / 2 - r.outerWidth() / 2;
            r.css(s)
        }
    }, position: function (t, A, w) {
        var v = this, u;
        if (!A && !w) {
            t.determinePosition.call(this, t.$menu);
            return
        } else {
            if (A === "maintain" && w === "maintain") {
                u = t.$menu.position()
            } else {
                var z = t.$trigger.parents().andSelf().filter(function () {
                    return k(this).css("position") == "fixed"
                }).length;
                if (z) {
                    w -= d.scrollTop();
                    A -= d.scrollLeft()
                }
                u = {top: w, left: A}
            }
        }
        var r = d.scrollTop() + d.height(), B = d.scrollLeft() + d.width(), C = t.$menu.height(), s = t.$menu.width();
        if (u.top + C > r) {
            u.top -= C
        }
        if (u.left + s > B) {
            u.left -= s
        }
        t.$menu.css(u)
    }, positionSubmenu: function (r) {
        if (k.ui && k.ui.position) {
            r.css("display", "block").position({my: "left top", at: "right top", of: this, collision: "fit"}).css("display", "")
        } else {
            var s = {top: 0, left: this.outerWidth()};
            r.css(s)
        }
    }, zIndex: 1, animation: {duration: 50, show: "slideDown", hide: "slideUp"}, events: {show: k.noop, hide: k.noop}, callback: null, items: {}}, o = {timer: null, pageX: null, pageY: null}, q = function (t) {
        var s = 0, r = t;
        while (true) {
            s = Math.max(s, parseInt(r.css("z-index"), 10) || 0);
            r = r.parent();
            if (!r || !r.length || "html body".indexOf(r.prop("nodeName").toLowerCase()) > -1) {
                break
            }
        }
        return s
    }, m = {abortevent: function (r) {
        r.preventDefault();
        r.stopImmediatePropagation()
    }, contextmenu: function (t) {
        var s = k(this);
        t.preventDefault();
        t.stopImmediatePropagation();
        if (t.data.trigger != "right" && t.originalEvent) {
            return
        }
        if (!s.hasClass("context-menu-disabled")) {
            i = s;
            if (t.data.build) {
                var r = t.data.build(i, t);
                if (r === false) {
                    return
                }
                t.data = k.extend(true, {}, h, t.data, r || {});
                if (!t.data.items || k.isEmptyObject(t.data.items)) {
                    if (window.console) {
                        (console.error || console.log)("No items specified to show in contextMenu")
                    }
                    throw new Error("No Items sepcified")
                }
                t.data.$trigger = i;
                l.create(t.data)
            }
            l.show.call(s, t.data, t.pageX, t.pageY)
        }
    }, click: function (r) {
        r.preventDefault();
        r.stopImmediatePropagation();
        k(this).trigger(k.Event("contextmenu", {data: r.data, pageX: r.pageX, pageY: r.pageY}))
    }, mousedown: function (s) {
        var r = k(this);
        if (i && i.length && !i.is(r)) {
            i.data("contextMenu").$menu.trigger("contextmenu:hide")
        }
        if (s.button == 2) {
            i = r.data("contextMenuActive", true)
        }
    }, mouseup: function (s) {
        var r = k(this);
        if (r.data("contextMenuActive") && i && i.length && i.is(r) && !r.hasClass("context-menu-disabled")) {
            s.preventDefault();
            s.stopImmediatePropagation();
            i = r;
            r.trigger(k.Event("contextmenu", {data: s.data, pageX: s.pageX, pageY: s.pageY}))
        }
        r.removeData("contextMenuActive")
    }, mouseenter: function (t) {
        var s = k(this), r = k(t.relatedTarget), u = k(document);
        if (r.is(".context-menu-list") || r.closest(".context-menu-list").length) {
            return
        }
        if (i && i.length) {
            return
        }
        o.pageX = t.pageX;
        o.pageY = t.pageY;
        o.data = t.data;
        u.on("mousemove.contextMenuShow", m.mousemove);
        o.timer = setTimeout(function () {
            o.timer = null;
            u.off("mousemove.contextMenuShow");
            i = s;
            s.trigger(k.Event("contextmenu", {data: o.data, pageX: o.pageX, pageY: o.pageY}))
        }, t.data.delay)
    }, mousemove: function (r) {
        o.pageX = r.pageX;
        o.pageY = r.pageY
    }, mouseleave: function (s) {
        var r = k(s.relatedTarget);
        if (r.is(".context-menu-list") || r.closest(".context-menu-list").length) {
            return
        }
        try {
            clearTimeout(o.timer)
        } catch (s) {
        }
        o.timer = null
    }, layerClick: function (u) {
        var w = k(this), A = w.data("contextMenuRoot"), s = false, t = u.button, B = u.pageX, z = u.pageY, v, r, C;
        u.preventDefault();
        u.stopImmediatePropagation();
        w.on("mouseup", function () {
            s = true
        });
        setTimeout(function () {
            var D, y;
            if ((A.trigger == "left" && t == 0) || (A.trigger == "right" && t == 2)) {
                if (document.elementFromPoint) {
                    A.$layer.hide();
                    v = document.elementFromPoint(B - d.scrollLeft(), z - d.scrollTop());
                    A.$layer.show();
                    C = [];
                    for (var x in b) {
                        C.push(x)
                    }
                    v = k(v).closest(C.join(", "));
                    if (v.length) {
                        if (v.is(A.$trigger[0])) {
                            A.position.call(A.$trigger, A, B, z);
                            return
                        }
                    }
                } else {
                    r = A.$trigger.offset();
                    D = k(window);
                    r.top += D.scrollTop();
                    if (r.top <= u.pageY) {
                        r.left += D.scrollLeft();
                        if (r.left <= u.pageX) {
                            r.bottom = r.top + A.$trigger.outerHeight();
                            if (r.bottom >= u.pageY) {
                                r.right = r.left + A.$trigger.outerWidth();
                                if (r.right >= u.pageX) {
                                    A.position.call(A.$trigger, A, B, z);
                                    return
                                }
                            }
                        }
                    }
                }
            }
            y = function (E) {
                if (E) {
                    E.preventDefault();
                    E.stopImmediatePropagation()
                }
                A.$menu.trigger("contextmenu:hide");
                if (v && v.length) {
                    setTimeout(function () {
                        v.contextMenu({x: B, y: z})
                    }, 50)
                }
            };
            if (s) {
                y()
            } else {
                w.on("mouseup", y)
            }
        }, 50)
    }, keyStop: function (s, r) {
        if (!r.isInput) {
            s.preventDefault()
        }
        s.stopPropagation()
    }, key: function (w) {
        var u = i.data("contextMenu") || {}, s = u.$menu.children(), x;
        switch (w.keyCode) {
            case 9:
            case 38:
                m.keyStop(w, u);
                if (u.isInput) {
                    if (w.keyCode == 9 && w.shiftKey) {
                        w.preventDefault();
                        u.$selected && u.$selected.find("input, textarea, select").blur();
                        u.$menu.trigger("prevcommand");
                        return
                    } else {
                        if (w.keyCode == 38 && u.$selected.find("input, textarea, select").prop("type") == "checkbox") {
                            w.preventDefault();
                            return
                        }
                    }
                } else {
                    if (w.keyCode != 9 || w.shiftKey) {
                        u.$menu.trigger("prevcommand");
                        return
                    }
                }
            case 40:
                m.keyStop(w, u);
                if (u.isInput) {
                    if (w.keyCode == 9) {
                        w.preventDefault();
                        u.$selected && u.$selected.find("input, textarea, select").blur();
                        u.$menu.trigger("nextcommand");
                        return
                    } else {
                        if (w.keyCode == 40 && u.$selected.find("input, textarea, select").prop("type") == "checkbox") {
                            w.preventDefault();
                            return
                        }
                    }
                } else {
                    u.$menu.trigger("nextcommand");
                    return
                }
                break;
            case 37:
                m.keyStop(w, u);
                if (u.isInput || !u.$selected || !u.$selected.length) {
                    break
                }
                if (!u.$selected.parent().hasClass("context-menu-root")) {
                    var v = u.$selected.parent().parent();
                    u.$selected.trigger("contextmenu:blur");
                    u.$selected = v;
                    return
                }
                break;
            case 39:
                m.keyStop(w, u);
                if (u.isInput || !u.$selected || !u.$selected.length) {
                    break
                }
                var t = u.$selected.data("contextMenu") || {};
                if (t.$menu && u.$selected.hasClass("context-menu-submenu")) {
                    u.$selected = null;
                    t.$selected = null;
                    t.$menu.trigger("nextcommand");
                    return
                }
                break;
            case 35:
            case 36:
                if (u.$selected && u.$selected.find("input, textarea, select").length) {
                    return
                } else {
                    (u.$selected && u.$selected.parent() || u.$menu).children(":not(.disabled, .not-selectable)")[w.keyCode == 36 ? "first" : "last"]().trigger("contextmenu:focus");
                    w.preventDefault();
                    return
                }
                break;
            case 13:
                m.keyStop(w, u);
                if (u.isInput) {
                    if (u.$selected && !u.$selected.is("textarea, select")) {
                        w.preventDefault();
                        return
                    }
                    break
                }
                u.$selected && u.$selected.trigger("mouseup");
                return;
            case 32:
            case 33:
            case 34:
                m.keyStop(w, u);
                return;
            case 27:
                m.keyStop(w, u);
                u.$menu.trigger("contextmenu:hide");
                return;
            default:
                var r = (String.fromCharCode(w.keyCode)).toUpperCase();
                if (u.accesskeys[r]) {
                    u.accesskeys[r].$node.trigger(u.accesskeys[r].$menu ? "contextmenu:focus" : "mouseup");
                    return
                }
                break
        }
        w.stopPropagation();
        u.$selected && u.$selected.trigger(w)
    }, prevItem: function (v) {
        v.stopPropagation();
        var u = k(this).data("contextMenu") || {};
        if (u.$selected) {
            var r = u.$selected;
            u = u.$selected.parent().data("contextMenu") || {};
            u.$selected = r
        }
        var t = u.$menu.children(), s = !u.$selected || !u.$selected.prev().length ? t.last() : u.$selected.prev(), x = s;
        while (s.hasClass("disabled") || s.hasClass("not-selectable")) {
            if (s.prev().length) {
                s = s.prev()
            } else {
                s = t.last()
            }
            if (s.is(x)) {
                return
            }
        }
        if (u.$selected) {
            m.itemMouseleave.call(u.$selected.get(0), v)
        }
        m.itemMouseenter.call(s.get(0), v);
        var w = s.find("input, textarea, select");
        if (w.length) {
            w.focus()
        }
    }, nextItem: function (v) {
        v.stopPropagation();
        var u = k(this).data("contextMenu") || {};
        if (u.$selected) {
            var r = u.$selected;
            u = u.$selected.parent().data("contextMenu") || {};
            u.$selected = r
        }
        var t = u.$menu.children(), s = !u.$selected || !u.$selected.next().length ? t.first() : u.$selected.next(), x = s;
        while (s.hasClass("disabled") || s.hasClass("not-selectable")) {
            if (s.next().length) {
                s = s.next()
            } else {
                s = t.first()
            }
            if (s.is(x)) {
                return
            }
        }
        if (u.$selected) {
            m.itemMouseleave.call(u.$selected.get(0), v)
        }
        m.itemMouseenter.call(s.get(0), v);
        var w = s.find("input, textarea, select");
        if (w.length) {
            w.focus()
        }
    }, focusInput: function (v) {
        var u = k(this).closest(".context-menu-item"), t = u.data(), s = t.contextMenu, r = t.contextMenuRoot;
        r.$selected = s.$selected = u;
        r.isInput = s.isInput = true
    }, blurInput: function (v) {
        var u = k(this).closest(".context-menu-item"), t = u.data(), s = t.contextMenu, r = t.contextMenuRoot;
        r.isInput = s.isInput = false
    }, menuMouseenter: function (s) {
        var r = k(this).data().contextMenuRoot;
        r.hovering = true
    }, menuMouseleave: function (s) {
        var r = k(this).data().contextMenuRoot;
        if (r.$layer && r.$layer.is(s.relatedTarget)) {
            r.hovering = false
        }
    }, itemMouseenter: function (v) {
        var u = k(this), t = u.data(), s = t.contextMenu, r = t.contextMenuRoot;
        r.hovering = true;
        if (v && r.$layer && r.$layer.is(v.relatedTarget)) {
            v.preventDefault();
            v.stopImmediatePropagation()
        }
        (s.$menu ? s : r).$menu.children(".hover").trigger("contextmenu:blur");
        if (u.hasClass("disabled") || u.hasClass("not-selectable")) {
            s.$selected = null;
            return
        }
        u.trigger("contextmenu:focus")
    }, itemMouseleave: function (v) {
        var u = k(this), t = u.data(), s = t.contextMenu, r = t.contextMenuRoot;
        if (r !== s && r.$layer && r.$layer.is(v.relatedTarget)) {
            r.$selected && r.$selected.trigger("contextmenu:blur");
            v.preventDefault();
            v.stopImmediatePropagation();
            r.$selected = s.$selected = s.$node;
            return
        }
        u.trigger("contextmenu:blur")
    }, itemClick: function (w) {
        var v = k(this), u = v.data(), t = u.contextMenu, r = u.contextMenuRoot, s = u.contextMenuKey, x;
        if (!t.items[s] || v.hasClass("disabled") || v.hasClass("context-menu-submenu")) {
            return
        }
        w.preventDefault();
        w.stopImmediatePropagation();
        if (k.isFunction(r.callbacks[s])) {
            x = r.callbacks[s]
        } else {
            if (k.isFunction(r.callback)) {
                x = r.callback
            } else {
                return
            }
        }
        if (x.call(r.$trigger, s, r) !== false) {
            r.$menu.trigger("contextmenu:hide")
        } else {
            if (r.$menu.parent().length) {
                l.update.call(r.$trigger, r)
            }
        }
    }, inputClick: function (r) {
        r.stopImmediatePropagation()
    }, hideMenu: function (t, s) {
        var r = k(this).data("contextMenuRoot");
        l.hide.call(r.$trigger, r, s && s.force)
    }, focusItem: function (v) {
        v.stopPropagation();
        var u = k(this), t = u.data(), s = t.contextMenu, r = t.contextMenuRoot;
        u.addClass("hover").siblings(".hover").trigger("contextmenu:blur");
        s.$selected = r.$selected = u;
        if (s.$node) {
            r.positionSubmenu.call(s.$node, s.$menu)
        }
    }, blurItem: function (v) {
        v.stopPropagation();
        var u = k(this), t = u.data(), s = t.contextMenu, r = t.contextMenuRoot;
        u.removeClass("hover");
        s.$selected = null
    }}, l = {show: function (t, r, z) {
        var u = k(this), v, s = {};
        k("#context-menu-layer").trigger("mousedown");
        t.$trigger = u;
        if (t.events.show.call(u, t) === false) {
            i = null;
            return
        }
        l.update.call(u, t);
        t.position.call(u, t, r, z);
        if (t.zIndex) {
            s.zIndex = q(u) + t.zIndex
        }
        l.layer.call(t.$menu, t, s.zIndex);
        t.$menu.find("ul").css("zIndex", s.zIndex + 1);
        t.$menu.css(s)[t.animation.show](t.animation.duration);
        u.data("contextMenu", t);
        k(document).off("keydown.contextMenu").on("keydown.contextMenu", m.key);
        if (t.autoHide) {
            var w = u.position();
            w.right = w.left + u.outerWidth();
            w.bottom = w.top + this.outerHeight();
            k(document).on("mousemove.contextMenuAutoHide", function (x) {
                if (t.$layer && !t.hovering && (!(x.pageX >= w.left && x.pageX <= w.right) || !(x.pageY >= w.top && x.pageY <= w.bottom))) {
                    t.$menu.trigger("contextmenu:hide")
                }
            })
        }
    }, hide: function (r, s) {
        var u = k(this);
        if (!r) {
            r = u.data("contextMenu") || {}
        }
        if (!s && r.events && r.events.hide.call(u, r) === false) {
            return
        }
        if (r.$layer) {
            setTimeout((function (v) {
                return function () {
                    v.remove()
                }
            })(r.$layer), 10);
            try {
                delete r.$layer
            } catch (t) {
                r.$layer = null
            }
        }
        i = null;
        r.$menu.find(".hover").trigger("contextmenu:blur");
        r.$selected = null;
        k(document).off(".contextMenuAutoHide").off("keydown.contextMenu");
        r.$menu && r.$menu[r.animation.hide](r.animation.duration, function () {
            if (r.build) {
                r.$menu.remove();
                k.each(r, function (v, w) {
                    switch (v) {
                        case"ns":
                        case"selector":
                        case"build":
                        case"trigger":
                            return true;
                        default:
                            r[v] = f;
                            try {
                                delete r[v]
                            } catch (x) {
                            }
                            return true
                    }
                })
            }
        })
    }, create: function (s, r) {
        if (r === f) {
            r = s
        }
        s.$menu = k('<ul class="context-menu-list ' + (s.className || "") + '"></ul>').data({contextMenu: s, contextMenuRoot: r});
        k.each(["callbacks", "commands", "inputs"], function (u, t) {
            s[t] = {};
            if (!r[t]) {
                r[t] = {}
            }
        });
        r.accesskeys || (r.accesskeys = {});
        k.each(s.items, function (v, w) {
            var A = k('<li class="context-menu-item ' + (w.className || "") + '"></li>'), t = null, z = null;
            w.$node = A.data({contextMenu: s, contextMenuRoot: r, contextMenuKey: v});
            if (w.accesskey) {
                var x = c(w.accesskey);
                for (var u = 0, y; y = x[u]; u++) {
                    if (!r.accesskeys[y]) {
                        r.accesskeys[y] = w;
                        w._name = w.name.replace(new RegExp("(" + y + ")", "i"), '<span class="context-menu-accesskey">$1</span>');
                        break
                    }
                }
            }
            if (typeof w == "string") {
                A.addClass("context-menu-separator not-selectable")
            } else {
                if (w.type && n[w.type]) {
                    n[w.type].call(A, w, s, r);
                    k.each([s, r], function (C, B) {
                        B.commands[v] = w;
                        if (k.isFunction(w.callback)) {
                            B.callbacks[v] = w.callback
                        }
                    })
                } else {
                    if (w.type == "html") {
                        A.addClass("context-menu-html not-selectable")
                    } else {
                        if (w.type) {
                            t = k("<label></label>").appendTo(A);
                            k("<span></span>").html(w._name || w.name).appendTo(t);
                            A.addClass("context-menu-input");
                            s.hasTypes = true;
                            k.each([s, r], function (C, B) {
                                B.commands[v] = w;
                                B.inputs[v] = w
                            })
                        } else {
                            if (w.items) {
                                w.type = "sub"
                            }
                        }
                    }
                    switch (w.type) {
                        case"text":
                            z = k('<input type="text" value="1" name="context-menu-input-' + v + '" value="">').val(w.value || "").appendTo(t);
                            break;
                        case"textarea":
                            z = k('<textarea name="context-menu-input-' + v + '"></textarea>').val(w.value || "").appendTo(t);
                            if (w.height) {
                                z.height(w.height)
                            }
                            break;
                        case"checkbox":
                            z = k('<input type="checkbox" value="1" name="context-menu-input-' + v + '" value="">').val(w.value || "").prop("checked", !!w.selected).prependTo(t);
                            break;
                        case"radio":
                            z = k('<input type="radio" value="1" name="context-menu-input-' + w.radio + '" value="">').val(w.value || "").prop("checked", !!w.selected).prependTo(t);
                            break;
                        case"select":
                            z = k('<select name="context-menu-input-' + v + '">').appendTo(t);
                            if (w.options) {
                                k.each(w.options, function (B, C) {
                                    k("<option></option>").val(B).text(C).appendTo(z)
                                });
                                z.val(w.selected)
                            }
                            break;
                        case"sub":
                            k("<span></span>").html(w._name || w.name).appendTo(A);
                            w.appendTo = w.$node;
                            l.create(w, r);
                            A.data("contextMenu", w).addClass("context-menu-submenu");
                            w.callback = null;
                            break;
                        case"html":
                            k(w.html).appendTo(A);
                            break;
                        default:
                            k.each([s, r], function (C, B) {
                                B.commands[v] = w;
                                if (k.isFunction(w.callback)) {
                                    B.callbacks[v] = w.callback
                                }
                            });
                            k("<span></span>").html(w._name || w.name || "").appendTo(A);
                            break
                    }
                    if (w.type && w.type != "sub" && w.type != "html") {
                        z.on("focus", m.focusInput).on("blur", m.blurInput);
                        if (w.events) {
                            z.on(w.events, s)
                        }
                    }
                    if (w.icon) {
                        A.addClass("icon icon-" + w.icon)
                    }
                }
            }
            w.$input = z;
            w.$label = t;
            A.appendTo(s.$menu);
            if (!s.hasTypes && k.support.eventSelectstart) {
                A.on("selectstart.disableTextSelect", m.abortevent)
            }
        });
        if (!s.$node) {
            s.$menu.css("display", "none").addClass("context-menu-root")
        }
        s.$menu.appendTo(s.appendTo || document.body)
    }, update: function (s, r) {
        var t = this;
        if (r === f) {
            r = s;
            s.$menu.find("ul").andSelf().css({position: "static", display: "block"}).each(function () {
                var u = k(this);
                u.width(u.css("position", "absolute").width()).css("position", "static")
            }).css({position: "", display: ""})
        }
        s.$menu.children().each(function () {
            var u = k(this), v = u.data("contextMenuKey"), x = s.items[v], w = (k.isFunction(x.disabled) && x.disabled.call(t, v, r)) || x.disabled === true;
            u[w ? "addClass" : "removeClass"]("disabled");
            if (x.type) {
                u.find("input, select, textarea").prop("disabled", w);
                switch (x.type) {
                    case"text":
                    case"textarea":
                        x.$input.val(x.value || "");
                        break;
                    case"checkbox":
                    case"radio":
                        x.$input.val(x.value || "").prop("checked", !!x.selected);
                        break;
                    case"select":
                        x.$input.val(x.selected || "");
                        break
                }
            }
            if (x.$menu) {
                l.update.call(t, x, r)
            }
        })
    }, layer: function (s, t) {
        var r = s.$layer = k('<div id="context-menu-layer" style="position:fixed; z-index:' + t + '; top:0; left:0; opacity: 0; filter: alpha(opacity=0); background-color: #000;"></div>').css({height: d.height(), width: d.width(), display: "block"}).data("contextMenuRoot", s).insertBefore(this).on("contextmenu", m.abortevent).on("mousedown", m.layerClick);
        if (!k.support.fixedPosition) {
            r.css({position: "absolute", height: k(document).height()})
        }
        return r
    }};

    function c(w) {
        var u = w.split(/\s+/), v = [];
        for (var s = 0, r; r = u[s]; s++) {
            r = r[0].toUpperCase();
            v.push(r)
        }
        return v
    }

    k.fn.contextMenu = function (r) {
        if (r === f) {
            this.first().trigger("contextmenu")
        } else {
            if (r.x && r.y) {
                this.first().trigger(k.Event("contextmenu", {pageX: r.x, pageY: r.y}))
            } else {
                if (r === "hide") {
                    var s = this.data("contextMenu").$menu;
                    s && s.trigger("contextmenu:hide")
                } else {
                    if (r) {
                        this.removeClass("context-menu-disabled")
                    } else {
                        if (!r) {
                            this.addClass("context-menu-disabled")
                        }
                    }
                }
            }
        }
        return this
    };
    k.contextMenu = function (r, s) {
        if (typeof r != "string") {
            s = r;
            r = "create"
        }
        if (typeof s == "string") {
            s = {selector: s}
        } else {
            if (s === f) {
                s = {}
            }
        }
        var w = k.extend(true, {}, h, s || {}), v = k(document);
        switch (r) {
            case"create":
                if (!w.selector) {
                    throw new Error("No selector specified")
                }
                if (w.selector.match(/.context-menu-(list|item|input)($|\s)/)) {
                    throw new Error('Cannot bind to selector "' + w.selector + '" as it contains a reserved className')
                }
                if (!w.build && (!w.items || k.isEmptyObject(w.items))) {
                    throw new Error("No Items sepcified")
                }
                a++;
                w.ns = ".contextMenu" + a;
                b[w.selector] = w.ns;
                j[w.ns] = w;
                if (!w.trigger) {
                    w.trigger = "right"
                }
                if (!g) {
                    v.on({"contextmenu:hide.contextMenu": m.hideMenu, "prevcommand.contextMenu": m.prevItem, "nextcommand.contextMenu": m.nextItem, "contextmenu.contextMenu": m.abortevent, "mouseenter.contextMenu": m.menuMouseenter, "mouseleave.contextMenu": m.menuMouseleave}, ".context-menu-list").on("mouseup.contextMenu", ".context-menu-input", m.inputClick).on({"mouseup.contextMenu": m.itemClick, "contextmenu:focus.contextMenu": m.focusItem, "contextmenu:blur.contextMenu": m.blurItem, "contextmenu.contextMenu": m.abortevent, "mouseenter.contextMenu": m.itemMouseenter, "mouseleave.contextMenu": m.itemMouseleave}, ".context-menu-item");
                    g = true
                }
                v.on("contextmenu" + w.ns, w.selector, w, m.contextmenu);
                switch (w.trigger) {
                    case"hover":
                        v.on("mouseenter" + w.ns, w.selector, w, m.mouseenter).on("mouseleave" + w.ns, w.selector, w, m.mouseleave);
                        break;
                    case"left":
                        v.on("click" + w.ns, w.selector, w, m.click);
                        break
                }
                if (!w.build) {
                    l.create(w)
                }
                break;
            case"destroy":
                if (!w.selector) {
                    v.off(".contextMenu .contextMenuAutoHide");
                    k.each(b, function (x, y) {
                        v.off(y)
                    });
                    b = {};
                    j = {};
                    a = 0;
                    g = false;
                    k("#context-menu-layer, .context-menu-list").remove()
                } else {
                    if (b[w.selector]) {
                        var t = k(".context-menu-list").filter(":visible");
                        if (t.length && t.data().contextMenuRoot.$trigger.is(w.selector)) {
                            t.trigger("contextmenu:hide", {force: true})
                        }
                        try {
                            if (j[b[w.selector]].$menu) {
                                j[b[w.selector]].$menu.remove()
                            }
                            delete j[b[w.selector]]
                        } catch (u) {
                            j[b[w.selector]] = null
                        }
                        v.off(b[w.selector])
                    }
                }
                break;
            case"html5":
                if ((!k.support.htmlCommand && !k.support.htmlMenuitem) || (typeof s == "boolean" && s)) {
                    k('menu[type="context"]').each(function () {
                        if (this.id) {
                            k.contextMenu({selector: "[contextmenu=" + this.id + "]", items: k.contextMenu.fromMenu(this)})
                        }
                    }).css("display", "none")
                }
                break;
            default:
                throw new Error('Unknown operation "' + r + '"')
        }
        return this
    };
    k.contextMenu.setInputValues = function (r, s) {
        if (s === f) {
            s = {}
        }
        k.each(r.inputs, function (t, u) {
            switch (u.type) {
                case"text":
                case"textarea":
                    u.value = s[t] || "";
                    break;
                case"checkbox":
                    u.selected = s[t] ? true : false;
                    break;
                case"radio":
                    u.selected = (s[u.radio] || "") == u.value ? true : false;
                    break;
                case"select":
                    u.selected = s[t] || "";
                    break
            }
        })
    };
    k.contextMenu.getInputValues = function (r, s) {
        if (s === f) {
            s = {}
        }
        k.each(r.inputs, function (t, u) {
            switch (u.type) {
                case"text":
                case"textarea":
                case"select":
                    s[t] = u.$input.val();
                    break;
                case"checkbox":
                    s[t] = u.$input.prop("checked");
                    break;
                case"radio":
                    if (u.$input.prop("checked")) {
                        s[u.radio] = u.value
                    }
                    break
            }
        });
        return s
    };
    function e(r) {
        return(r.id && k('label[for="' + r.id + '"]').val()) || r.name
    }

    function p(t, s, r) {
        if (!r) {
            r = 0
        }
        s.each(function () {
            var u = k(this), x = this, y = this.nodeName.toLowerCase(), v, w;
            if (y == "label" && u.find("input, textarea, select").length) {
                v = u.text();
                u = u.children().first();
                x = u.get(0);
                y = x.nodeName.toLowerCase()
            }
            switch (y) {
                case"menu":
                    w = {name: u.attr("label"), items: {}};
                    r = p(w.items, u.children(), r);
                    break;
                case"a":
                case"button":
                    w = {name: u.text(), disabled: !!u.attr("disabled"), callback: (function () {
                        return function () {
                            u.click()
                        }
                    })()};
                    break;
                case"menuitem":
                case"command":
                    switch (u.attr("type")) {
                        case f:
                        case"command":
                        case"menuitem":
                            w = {name: u.attr("label"), disabled: !!u.attr("disabled"), callback: (function () {
                                return function () {
                                    u.click()
                                }
                            })()};
                            break;
                        case"checkbox":
                            w = {type: "checkbox", disabled: !!u.attr("disabled"), name: u.attr("label"), selected: !!u.attr("checked")};
                            break;
                        case"radio":
                            w = {type: "radio", disabled: !!u.attr("disabled"), name: u.attr("label"), radio: u.attr("radiogroup"), value: u.attr("id"), selected: !!u.attr("checked")};
                            break;
                        default:
                            w = f
                    }
                    break;
                case"hr":
                    w = "-------";
                    break;
                case"input":
                    switch (u.attr("type")) {
                        case"text":
                            w = {type: "text", name: v || e(x), disabled: !!u.attr("disabled"), value: u.val()};
                            break;
                        case"checkbox":
                            w = {type: "checkbox", name: v || e(x), disabled: !!u.attr("disabled"), selected: !!u.attr("checked")};
                            break;
                        case"radio":
                            w = {type: "radio", name: v || e(x), disabled: !!u.attr("disabled"), radio: !!u.attr("name"), value: u.val(), selected: !!u.attr("checked")};
                            break;
                        default:
                            w = f;
                            break
                    }
                    break;
                case"select":
                    w = {type: "select", name: v || e(x), disabled: !!u.attr("disabled"), selected: u.val(), options: {}};
                    u.children().each(function () {
                        w.options[this.value] = k(this).text()
                    });
                    break;
                case"textarea":
                    w = {type: "textarea", name: v || e(x), disabled: !!u.attr("disabled"), value: u.val()};
                    break;
                case"label":
                    break;
                default:
                    w = {type: "html", html: u.clone(true)};
                    break
            }
            if (w) {
                r++;
                t["key" + r] = w
            }
        });
        return r
    }

    k.contextMenu.fromMenu = function (s) {
        var t = k(s), r = {};
        p(r, t.children());
        return r
    };
    k.contextMenu.defaults = h;
    k.contextMenu.types = n
})(jQuery);
(function (i) {
    var e = "0.3.4", j = "hasOwnProperty", b = /[\.\/]/, a = "*", g = function () {
    }, f = function (m, l) {
        return m - l
    }, d, h, k = {n: {}}, c = function (m, C) {
        var v = k, s = h, w = Array.prototype.slice.call(arguments, 2), y = c.listeners(m), x = 0, u = false, p, o = [], t = {}, q = [], n = d, A = [];
        d = m;
        h = 0;
        for (var r = 0, B = y.length; r < B; r++) {
            if ("zIndex" in y[r]) {
                o.push(y[r].zIndex);
                if (y[r].zIndex < 0) {
                    t[y[r].zIndex] = y[r]
                }
            }
        }
        o.sort(f);
        while (o[x] < 0) {
            p = t[o[x++]];
            q.push(p.apply(C, w));
            if (h) {
                h = s;
                return q
            }
        }
        for (r = 0; r < B; r++) {
            p = y[r];
            if ("zIndex" in p) {
                if (p.zIndex == o[x]) {
                    q.push(p.apply(C, w));
                    if (h) {
                        break
                    }
                    do {
                        x++;
                        p = t[o[x]];
                        p && q.push(p.apply(C, w));
                        if (h) {
                            break
                        }
                    } while (p)
                } else {
                    t[p.zIndex] = p
                }
            } else {
                q.push(p.apply(C, w));
                if (h) {
                    break
                }
            }
        }
        h = s;
        d = n;
        return q.length ? q : null
    };
    c.listeners = function (l) {
        var t = l.split(b), r = k, x, s, m, p, w, o, q, u, v = [r], n = [];
        for (p = 0, w = t.length; p < w; p++) {
            u = [];
            for (o = 0, q = v.length; o < q; o++) {
                r = v[o].n;
                s = [r[t[p]], r[a]];
                m = 2;
                while (m--) {
                    x = s[m];
                    if (x) {
                        u.push(x);
                        n = n.concat(x.f || [])
                    }
                }
            }
            v = u
        }
        return n
    };
    c.on = function (l, o) {
        var q = l.split(b), p = k;
        for (var m = 0, n = q.length; m < n; m++) {
            p = p.n;
            !p[q[m]] && (p[q[m]] = {n: {}});
            p = p[q[m]]
        }
        p.f = p.f || [];
        for (m = 0, n = p.f.length; m < n; m++) {
            if (p.f[m] == o) {
                return g
            }
        }
        p.f.push(o);
        return function (r) {
            if (+r == +r) {
                o.zIndex = +r
            }
        }
    };
    c.stop = function () {
        h = 1
    };
    c.nt = function (l) {
        if (l) {
            return new RegExp("(?:\\.|\\/|^)" + l + "(?:\\.|\\/|$)").test(d)
        }
        return d
    };
    c.off = c.unbind = function (m, r) {
        var t = m.split(b), s, v, n, p, w, o, q, u = [k];
        for (p = 0, w = t.length; p < w; p++) {
            for (o = 0; o < u.length; o += n.length - 2) {
                n = [o, 1];
                s = u[o].n;
                if (t[p] != a) {
                    if (s[t[p]]) {
                        n.push(s[t[p]])
                    }
                } else {
                    for (v in s) {
                        if (s[j](v)) {
                            n.push(s[v])
                        }
                    }
                }
                u.splice.apply(u, n)
            }
        }
        for (p = 0, w = u.length; p < w; p++) {
            s = u[p];
            while (s.n) {
                if (r) {
                    if (s.f) {
                        for (o = 0, q = s.f.length; o < q; o++) {
                            if (s.f[o] == r) {
                                s.f.splice(o, 1);
                                break
                            }
                        }
                        !s.f.length && delete s.f
                    }
                    for (v in s.n) {
                        if (s.n[j](v) && s.n[v].f) {
                            var l = s.n[v].f;
                            for (o = 0, q = l.length; o < q; o++) {
                                if (l[o] == r) {
                                    l.splice(o, 1);
                                    break
                                }
                            }
                            !l.length && delete s.n[v].f
                        }
                    }
                } else {
                    delete s.f;
                    for (v in s.n) {
                        if (s.n[j](v) && s.n[v].f) {
                            delete s.n[v].f
                        }
                    }
                }
                s = s.n
            }
        }
    };
    c.once = function (l, m) {
        var n = function () {
            var o = m.apply(this, arguments);
            c.unbind(l, n);
            return o
        };
        return c.on(l, n)
    };
    c.version = e;
    c.toString = function () {
        return"You are running Eve " + e
    };
    (typeof module != "undefined" && module.exports) ? (module.exports = c) : (typeof define != "undefined" ? (define("eve", [], function () {
        return c
    })) : (i.eve = c))
})(this);
(function () {
    function aR(g) {
        if (aR.is(g, "function")) {
            return ao ? g() : eve.on("raphael.DOMload", g)
        } else {
            if (aR.is(g, bd)) {
                return aR._engine.create[bG](aR, g.splice(0, 3 + aR.is(g[0], aL))).add(g)
            } else {
                var b = Array.prototype.slice.call(arguments, 0);
                if (aR.is(b[b.length - 1], "function")) {
                    var d = b.pop();
                    return ao ? d.call(aR._engine.create[bG](aR, b)) : eve.on("raphael.DOMload", function () {
                        d.call(aR._engine.create[bG](aR, b))
                    })
                } else {
                    return aR._engine.create[bG](aR, arguments)
                }
            }
        }
    }

    aR.version = "2.1.0";
    aR.eve = eve;
    var ao, a = /[, ]+/, bw = {circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1}, br = /\{(\d+)\}/g, bJ = "prototype", ak = "hasOwnProperty", aA = {doc: document, win: window}, s = {was: Object.prototype[ak].call(aA.win, "Raphael"), is: aA.win.Raphael}, bF = function () {
        this.ca = this.customAttributes = {}
    }, a4, bo = "appendChild", bG = "apply", bE = "concat", Z = "createTouch" in aA.doc, aX = "", aQ = " ", bH = String, F = "split", Q = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[F](aQ), bx = {mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend"}, bK = bH.prototype.toLowerCase, au = Math, m = au.max, bm = au.min, aw = au.abs, bp = au.pow, aV = au.PI, aL = "number", aj = "string", bd = "array", a5 = "toString", a9 = "fill", a1 = Object.prototype.toString, bz = {}, j = "push", f = aR._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, A = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i, av = {"NaN": 1, "Infinity": 1, "-Infinity": 1}, c = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, ah = au.round, z = "setAttribute", an = parseFloat, U = parseInt, bt = bH.prototype.toUpperCase, r = aR._availableAttrs = {"arrow-end": "none", "arrow-start": "none", blur: 0, "clip-rect": "0 0 1e9 1e9", cursor: "default", cx: 0, cy: 0, fill: "#fff", "fill-opacity": 1, font: '10px "Arial"', "font-family": '"Arial"', "font-size": "10", "font-style": "normal", "font-weight": 400, gradient: 0, height: 0, href: "http://raphaeljs.com/", "letter-spacing": 0, opacity: 1, path: "M0,0", r: 0, rx: 0, ry: 0, src: "", stroke: "#000", "stroke-dasharray": "", "stroke-linecap": "butt", "stroke-linejoin": "butt", "stroke-miterlimit": 0, "stroke-opacity": 1, "stroke-width": 1, target: "_blank", "text-anchor": "middle", title: "Raphael", transform: "", width: 0, x: 0, y: 0, "shape-rendering": "crispEdges"}, ar = aR._availableAnimAttrs = {blur: aL, "clip-rect": "csv", cx: aL, cy: aL, fill: "colour", "fill-opacity": aL, "font-size": aL, height: aL, opacity: aL, path: "path", r: aL, rx: aL, ry: aL, stroke: "colour", "stroke-opacity": aL, "stroke-width": aL, transform: "transform", width: aL, x: aL, y: aL}, ac = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g, bi = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, n = {hs: 1, rg: 1}, bg = /,?([achlmqrstvxz]),?/gi, a0 = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig, ai = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig, aP = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig, aW = aR._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, aU = {}, bq = function (g, d) {
        return g.key - d.key
    }, u = function (g, d) {
        return an(g) - an(d)
    }, I = function () {
    }, bB = function (b) {
        return b
    }, az = aR._rectPath = function (b, E, d, g, i) {
        if (i) {
            return[
                ["M", b + i, E],
                ["l", d - i * 2, 0],
                ["a", i, i, 0, 0, 1, i, i],
                ["l", 0, g - i * 2],
                ["a", i, i, 0, 0, 1, -i, i],
                ["l", i * 2 - d, 0],
                ["a", i, i, 0, 0, 1, -i, -i],
                ["l", 0, i * 2 - g],
                ["a", i, i, 0, 0, 1, i, -i],
                ["z"]
            ]
        }
        return[
            ["M", b, E],
            ["l", d, 0],
            ["l", 0, g],
            ["l", -d, 0],
            ["z"]
        ]
    }, K = function (b, i, g, d) {
        if (d == null) {
            d = g
        }
        return[
            ["M", b, i],
            ["m", 0, -d],
            ["a", g, d, 0, 1, 1, 0, 2 * d],
            ["a", g, d, 0, 1, 1, 0, -2 * d],
            ["z"]
        ]
    }, N = aR._getPath = {group: function (b) {
        throw new TypeError("Not support for group element!")
    }, path: function (b) {
        return b.attr("path")
    }, circle: function (d) {
        var b = d.attrs;
        return K(b.cx, b.cy, b.r)
    }, ellipse: function (d) {
        var b = d.attrs;
        return K(b.cx, b.cy, b.rx, b.ry)
    }, rect: function (d) {
        var b = d.attrs;
        return az(b.x, b.y, b.width, b.height, b.r)
    }, image: function (d) {
        var b = d.attrs;
        return az(b.x, b.y, b.width, b.height)
    }, text: function (b) {
        var d = b._getBBox();
        return az(d.x, d.y, d.width, d.height)
    }, foreignObject: function (d) {
        var b = d.attrs;
        return az(b.x, b.y, b.width, b.height)
    }}, L = aR.mapPath = function (bN, S) {
        if (!S) {
            return bN
        }
        var bL, R, g, b, bM, E, d;
        bN = W(bN);
        for (g = 0, bM = bN.length; g < bM; g++) {
            d = bN[g];
            for (b = 1, E = d.length; b < E; b += 2) {
                bL = S.x(d[b], d[b + 1]);
                R = S.y(d[b], d[b + 1]);
                d[b] = bL;
                d[b + 1] = R
            }
        }
        return bN
    };
    aR._g = aA;
    aR.type = (aA.win.SVGAngle || aA.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
    if (aR.type == "VML") {
        var aE = aA.doc.createElement("div"), aH;
        aE.innerHTML = '<v:shape adj="1"/>';
        aH = aE.firstChild;
        aH.style.behavior = "url(#default#VML)";
        if (!(aH && typeof aH.adj == "object")) {
            return(aR.type = aX)
        }
        aE = null
    }
    aR.svg = !(aR.vml = aR.type == "VML");
    aR._Paper = bF;
    aR.fn = a4 = bF.prototype = aR.prototype;
    aR._id = 0;
    aR._oid = 0;
    aR.is = function (d, b) {
        b = bK.call(b);
        if (b == "finite") {
            return !av[ak](+d)
        }
        if (b == "array") {
            return d instanceof Array
        }
        return(b == "null" && d === null) || (b == typeof d && d !== null) || (b == "object" && d === Object(d)) || (b == "array" && Array.isArray && Array.isArray(d)) || a1.call(d).slice(8, -1).toLowerCase() == b
    };
    function X(g) {
        if (Object(g) !== g) {
            return g
        }
        var d = new g.constructor;
        for (var b in g) {
            if (g[ak](b)) {
                d[b] = X(g[b])
            }
        }
        return d
    }

    aR.angle = function (E, S, g, R, d, i) {
        if (d == null) {
            var b = E - g, bL = S - R;
            if (!b && !bL) {
                return 0
            }
            return(180 + au.atan2(-bL, -b) * 180 / aV + 360) % 360
        } else {
            return aR.angle(E, S, d, i) - aR.angle(g, R, d, i)
        }
    };
    aR.rad = function (b) {
        return b % 360 * aV / 180
    };
    aR.deg = function (b) {
        return b * 180 / aV % 360
    };
    aR.snapTo = function (d, E, b) {
        b = aR.is(b, "finite") ? b : 10;
        if (aR.is(d, bd)) {
            var g = d.length;
            while (g--) {
                if (aw(d[g] - E) <= b) {
                    return d[g]
                }
            }
        } else {
            d = +d;
            var R = E % d;
            if (R < b) {
                return E - R
            }
            if (R > d - b) {
                return E - R + d
            }
        }
        return E
    };
    var h = aR.createUUID = (function (b, d) {
        return function () {
            return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(b, d).toUpperCase()
        }
    })(/[xy]/g, function (g) {
        var d = au.random() * 16 | 0, b = g == "x" ? d : (d & 3 | 8);
        return b.toString(16)
    });
    aR.setWindow = function (b) {
        eve("raphael.setWindow", aR, aA.win, b);
        aA.win = b;
        aA.doc = aA.win.document;
        if (aR._engine.initWin) {
            aR._engine.initWin(aA.win)
        }
    };
    var bf = function (g) {
        if (aR.vml) {
            var b = /^\s+|\s+$/g;
            var R;
            try {
                var S = new ActiveXObject("htmlfile");
                S.write("<body>");
                S.close();
                R = S.body
            } catch (bL) {
                R = createPopup().document.body
            }
            var d = R.createTextRange();
            bf = aG(function (i) {
                try {
                    R.style.color = bH(i).replace(b, aX);
                    var bM = d.queryCommandValue("ForeColor");
                    bM = ((bM & 255) << 16) | (bM & 65280) | ((bM & 16711680) >>> 16);
                    return"#" + ("000000" + bM.toString(16)).slice(-6)
                } catch (bN) {
                    return"none"
                }
            })
        } else {
            var E = aA.doc.createElement("i");
            E.title = "Rapha\xebl Colour Picker";
            E.style.display = "none";
            aA.doc.body.appendChild(E);
            bf = aG(function (i) {
                E.style.color = i;
                return aA.doc.defaultView.getComputedStyle(E, aX).getPropertyValue("color")
            })
        }
        return bf(g)
    }, aI = function () {
        return"hsb(" + [this.h, this.s, this.b] + ")"
    }, M = function () {
        return"hsl(" + [this.h, this.s, this.l] + ")"
    }, x = function () {
        return this.hex
    }, aY = function (R, E, d) {
        if (E == null && aR.is(R, "object") && "r" in R && "g" in R && "b" in R) {
            d = R.b;
            E = R.g;
            R = R.r
        }
        if (E == null && aR.is(R, aj)) {
            var i = aR.getRGB(R);
            R = i.r;
            E = i.g;
            d = i.b
        }
        if (R > 1 || E > 1 || d > 1) {
            R /= 255;
            E /= 255;
            d /= 255
        }
        return[R, E, d]
    }, a2 = function (R, E, d, S) {
        R *= 255;
        E *= 255;
        d *= 255;
        var i = {r: R, g: E, b: d, hex: aR.rgb(R, E, d), toString: x};
        aR.is(S, "finite") && (i.opacity = S);
        return i
    };
    aR.color = function (b) {
        var d;
        if (aR.is(b, "object") && "h" in b && "s" in b && "b" in b) {
            d = aR.hsb2rgb(b);
            b.r = d.r;
            b.g = d.g;
            b.b = d.b;
            b.hex = d.hex
        } else {
            if (aR.is(b, "object") && "h" in b && "s" in b && "l" in b) {
                d = aR.hsl2rgb(b);
                b.r = d.r;
                b.g = d.g;
                b.b = d.b;
                b.hex = d.hex
            } else {
                if (aR.is(b, "string")) {
                    b = aR.getRGB(b)
                }
                if (aR.is(b, "object") && "r" in b && "g" in b && "b" in b) {
                    d = aR.rgb2hsl(b);
                    b.h = d.h;
                    b.s = d.s;
                    b.l = d.l;
                    d = aR.rgb2hsb(b);
                    b.v = d.b
                } else {
                    b = {hex: "none"};
                    b.r = b.g = b.b = b.h = b.s = b.v = b.l = -1
                }
            }
        }
        b.toString = x;
        return b
    };
    aR.hsb2rgb = function (S, bN, bL, i) {
        if (this.is(S, "object") && "h" in S && "s" in S && "b" in S) {
            bL = S.b;
            bN = S.s;
            S = S.h;
            i = S.o
        }
        S *= 360;
        var E, bM, d, g, b;
        S = (S % 360) / 60;
        b = bL * bN;
        g = b * (1 - aw(S % 2 - 1));
        E = bM = d = bL - b;
        S = ~~S;
        E += [b, g, 0, 0, g, b][S];
        bM += [g, b, b, g, 0, 0][S];
        d += [0, 0, g, b, b, g][S];
        return a2(E, bM, d, i)
    };
    aR.hsl2rgb = function (bL, bN, E, i) {
        if (this.is(bL, "object") && "h" in bL && "s" in bL && "l" in bL) {
            E = bL.l;
            bN = bL.s;
            bL = bL.h
        }
        if (bL > 1 || bN > 1 || E > 1) {
            bL /= 360;
            bN /= 100;
            E /= 100
        }
        bL *= 360;
        var S, bM, d, g, b;
        bL = (bL % 360) / 60;
        b = 2 * bN * (E < 0.5 ? E : 1 - E);
        g = b * (1 - aw(bL % 2 - 1));
        S = bM = d = E - b / 2;
        bL = ~~bL;
        S += [b, g, 0, 0, g, b][bL];
        bM += [g, b, b, g, 0, 0][bL];
        d += [0, 0, g, b, b, g][bL];
        return a2(S, bM, d, i)
    };
    aR.rgb2hsb = function (bM, bL, d) {
        d = aY(bM, bL, d);
        bM = d[0];
        bL = d[1];
        d = d[2];
        var R, E, i, bN;
        i = m(bM, bL, d);
        bN = i - bm(bM, bL, d);
        R = (bN == 0 ? null : i == bM ? (bL - d) / bN : i == bL ? (d - bM) / bN + 2 : (bM - bL) / bN + 4);
        R = ((R + 360) % 6) * 60 / 360;
        E = bN == 0 ? 0 : bN / i;
        return{h: R, s: E, b: i, toString: aI}
    };
    aR.rgb2hsl = function (d, bL, bO) {
        bO = aY(d, bL, bO);
        d = bO[0];
        bL = bO[1];
        bO = bO[2];
        var bP, R, bN, bM, E, i;
        bM = m(d, bL, bO);
        E = bm(d, bL, bO);
        i = bM - E;
        bP = (i == 0 ? null : bM == d ? (bL - bO) / i : bM == bL ? (bO - d) / i + 2 : (d - bL) / i + 4);
        bP = ((bP + 360) % 6) * 60 / 360;
        bN = (bM + E) / 2;
        R = (i == 0 ? 0 : bN < 0.5 ? i / (2 * bN) : i / (2 - 2 * bN));
        return{h: bP, s: R, l: bN, toString: M}
    };
    aR._path2string = function () {
        return this.join(",").replace(bg, "$1")
    };
    function bk(E, g) {
        for (var b = 0, d = E.length; b < d; b++) {
            if (E[b] === g) {
                return E.push(E.splice(b, 1)[0])
            }
        }
    }

    function aG(i, d, b) {
        function g() {
            var E = Array.prototype.slice.call(arguments, 0), S = E.join("\u2400"), R = g.cache = g.cache || {}, bL = g.count = g.count || [];
            if (R[ak](S)) {
                bk(bL, S);
                return b ? b(R[S]) : R[S]
            }
            bL.length >= 1000 && delete R[bL.shift()];
            bL.push(S);
            R[S] = i[bG](d, E);
            return b ? b(R[S]) : R[S]
        }

        return g
    }

    var bv = aR._preload = function (g, d) {
        var b = aA.doc.createElement("img");
        b.style.cssText = "position:absolute;left:-9999em;top:-9999em";
        b.onload = function () {
            d.call(this);
            this.onload = null;
            aA.doc.body.removeChild(this)
        };
        b.onerror = function () {
            aA.doc.body.removeChild(this)
        };
        aA.doc.body.appendChild(b);
        b.src = g
    };

    function aq() {
        return this.hex
    }

    aR.getRGB = aG(function (b) {
        if (!b || !!((b = bH(b)).indexOf("-") + 1)) {
            return{r: -1, g: -1, b: -1, hex: "none", error: 1, toString: aq}
        }
        if (b == "none") {
            return{r: -1, g: -1, b: -1, hex: "none", toString: aq}
        }
        !(n[ak](b.toLowerCase().substring(0, 2)) || b.charAt() == "#") && (b = bf(b));
        var E, d, g, S, i, bM, bL, R = b.match(A);
        if (R) {
            if (R[2]) {
                S = U(R[2].substring(5), 16);
                g = U(R[2].substring(3, 5), 16);
                d = U(R[2].substring(1, 3), 16)
            }
            if (R[3]) {
                S = U((bM = R[3].charAt(3)) + bM, 16);
                g = U((bM = R[3].charAt(2)) + bM, 16);
                d = U((bM = R[3].charAt(1)) + bM, 16)
            }
            if (R[4]) {
                bL = R[4][F](bi);
                d = an(bL[0]);
                bL[0].slice(-1) == "%" && (d *= 2.55);
                g = an(bL[1]);
                bL[1].slice(-1) == "%" && (g *= 2.55);
                S = an(bL[2]);
                bL[2].slice(-1) == "%" && (S *= 2.55);
                R[1].toLowerCase().slice(0, 4) == "rgba" && (i = an(bL[3]));
                bL[3] && bL[3].slice(-1) == "%" && (i /= 100)
            }
            if (R[5]) {
                bL = R[5][F](bi);
                d = an(bL[0]);
                bL[0].slice(-1) == "%" && (d *= 2.55);
                g = an(bL[1]);
                bL[1].slice(-1) == "%" && (g *= 2.55);
                S = an(bL[2]);
                bL[2].slice(-1) == "%" && (S *= 2.55);
                (bL[0].slice(-3) == "deg" || bL[0].slice(-1) == "\xb0") && (d /= 360);
                R[1].toLowerCase().slice(0, 4) == "hsba" && (i = an(bL[3]));
                bL[3] && bL[3].slice(-1) == "%" && (i /= 100);
                return aR.hsb2rgb(d, g, S, i)
            }
            if (R[6]) {
                bL = R[6][F](bi);
                d = an(bL[0]);
                bL[0].slice(-1) == "%" && (d *= 2.55);
                g = an(bL[1]);
                bL[1].slice(-1) == "%" && (g *= 2.55);
                S = an(bL[2]);
                bL[2].slice(-1) == "%" && (S *= 2.55);
                (bL[0].slice(-3) == "deg" || bL[0].slice(-1) == "\xb0") && (d /= 360);
                R[1].toLowerCase().slice(0, 4) == "hsla" && (i = an(bL[3]));
                bL[3] && bL[3].slice(-1) == "%" && (i /= 100);
                return aR.hsl2rgb(d, g, S, i)
            }
            R = {r: d, g: g, b: S, toString: aq};
            R.hex = "#" + (16777216 | S | (g << 8) | (d << 16)).toString(16).slice(1);
            aR.is(i, "finite") && (R.opacity = i);
            return R
        }
        return{r: -1, g: -1, b: -1, hex: "none", error: 1, toString: aq}
    }, aR);
    aR.hsb = aG(function (i, g, d) {
        return aR.hsb2rgb(i, g, d).hex
    });
    aR.hsl = aG(function (g, d, b) {
        return aR.hsl2rgb(g, d, b).hex
    });
    aR.rgb = aG(function (E, i, d) {
        return"#" + (16777216 | d | (i << 8) | (E << 16)).toString(16).slice(1)
    });
    aR.getColor = function (d) {
        var g = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: d || 0.75}, b = this.hsb2rgb(g.h, g.s, g.b);
        g.h += 0.075;
        if (g.h > 1) {
            g.h = 0;
            g.s -= 0.2;
            g.s <= 0 && (this.getColor.start = {h: 0, s: 1, b: g.b})
        }
        return b.hex
    };
    aR.getColor.reset = function () {
        delete this.start
    };
    function bb(E, bL) {
        var S = [];
        for (var g = 0, b = E.length; b - 2 * !bL > g; g += 2) {
            var R = [
                {x: +E[g - 2], y: +E[g - 1]},
                {x: +E[g], y: +E[g + 1]},
                {x: +E[g + 2], y: +E[g + 3]},
                {x: +E[g + 4], y: +E[g + 5]}
            ];
            if (bL) {
                if (!g) {
                    R[0] = {x: +E[b - 2], y: +E[b - 1]}
                } else {
                    if (b - 4 == g) {
                        R[3] = {x: +E[0], y: +E[1]}
                    } else {
                        if (b - 2 == g) {
                            R[2] = {x: +E[0], y: +E[1]};
                            R[3] = {x: +E[2], y: +E[3]}
                        }
                    }
                }
            } else {
                if (b - 4 == g) {
                    R[3] = R[2]
                } else {
                    if (!g) {
                        R[0] = {x: +E[g], y: +E[g + 1]}
                    }
                }
            }
            S.push(["C", (-R[0].x + 6 * R[1].x + R[2].x) / 6, (-R[0].y + 6 * R[1].y + R[2].y) / 6, (R[1].x + 6 * R[2].x - R[3].x) / 6, (R[1].y + 6 * R[2].y - R[3].y) / 6, R[2].x, R[2].y])
        }
        return S
    }

    aR.parsePathString = function (b) {
        if (!b) {
            return null
        }
        var g = Y(b);
        if (g.arr) {
            return aZ(g.arr)
        }
        var i = {a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0}, d = [];
        if (aR.is(b, bd) && aR.is(b[0], bd)) {
            d = aZ(b)
        }
        if (!d.length) {
            bH(b).replace(a0, function (R, E, bM) {
                var bL = [], S = E.toLowerCase();
                bM.replace(aP, function (bO, bN) {
                    bN && bL.push(+bN)
                });
                if (S == "m" && bL.length > 2) {
                    d.push([E][bE](bL.splice(0, 2)));
                    S = "l";
                    E = E == "m" ? "l" : "L"
                }
                if (S == "r") {
                    d.push([E][bE](bL))
                } else {
                    while (bL.length >= i[S]) {
                        d.push([E][bE](bL.splice(0, i[S])));
                        if (!i[S]) {
                            break
                        }
                    }
                }
            })
        }
        d.toString = aR._path2string;
        g.arr = aZ(d);
        return d
    };
    aR.parseTransformString = aG(function (d) {
        if (!d) {
            return null
        }
        var g = {r: 3, s: 4, t: 2, m: 6}, b = [];
        if (aR.is(d, bd) && aR.is(d[0], bd)) {
            b = aZ(d)
        }
        if (!b.length) {
            bH(d).replace(ai, function (E, i, bL) {
                var S = [], R = bK.call(i);
                bL.replace(aP, function (bN, bM) {
                    bM && S.push(+bM)
                });
                b.push([i][bE](S))
            })
        }
        b.toString = aR._path2string;
        return b
    });
    var Y = function (d) {
        var b = Y.ps = Y.ps || {};
        if (b[d]) {
            b[d].sleep = 100
        } else {
            b[d] = {sleep: 100}
        }
        setTimeout(function () {
            for (var g in b) {
                if (b[ak](g) && g != d) {
                    b[g].sleep--;
                    !b[g].sleep && delete b[g]
                }
            }
        });
        return b[d]
    };
    aR.findDotsAtSegment = function (d, b, b2, b0, S, E, bN, bL, bV) {
        var bS = 1 - bV, bX = bp(bS, 3), bY = bp(bS, 2), bP = bV * bV, bM = bP * bV, bR = bX * d + bY * 3 * bV * b2 + bS * 3 * bV * bV * S + bM * bN, bO = bX * b + bY * 3 * bV * b0 + bS * 3 * bV * bV * E + bM * bL, bW = d + 2 * bV * (b2 - d) + bP * (S - 2 * b2 + d), bU = b + 2 * bV * (b0 - b) + bP * (E - 2 * b0 + b), b1 = b2 + 2 * bV * (S - b2) + bP * (bN - 2 * S + b2), bZ = b0 + 2 * bV * (E - b0) + bP * (bL - 2 * E + b0), bT = bS * d + bV * b2, bQ = bS * b + bV * b0, i = bS * S + bV * bN, g = bS * E + bV * bL, R = (90 - au.atan2(bW - b1, bU - bZ) * 180 / aV);
        (bW > b1 || bU < bZ) && (R += 180);
        return{x: bR, y: bO, m: {x: bW, y: bU}, n: {x: b1, y: bZ}, start: {x: bT, y: bQ}, end: {x: i, y: g}, alpha: R}
    };
    aR.bezierBBox = function (d, b, i, g, bM, S, R, E) {
        if (!aR.is(d, "array")) {
            d = [d, b, i, g, bM, S, R, E]
        }
        var bL = ba.apply(null, d);
        return{x: bL.min.x, y: bL.min.y, x2: bL.max.x, y2: bL.max.y, width: bL.max.x - bL.min.x, height: bL.max.y - bL.min.y}
    };
    aR.isPointInsideBBox = function (d, b, g) {
        return b >= d.x && b <= d.x2 && g >= d.y && g <= d.y2
    };
    aR.isBBoxIntersect = function (g, d) {
        var b = aR.isPointInsideBBox;
        return b(d, g.x, g.y) || b(d, g.x2, g.y) || b(d, g.x, g.y2) || b(d, g.x2, g.y2) || b(g, d.x, d.y) || b(g, d.x2, d.y) || b(g, d.x, d.y2) || b(g, d.x2, d.y2) || (g.x < d.x2 && g.x > d.x || d.x < g.x2 && d.x > g.x) && (g.y < d.y2 && g.y > d.y || d.y < g.y2 && d.y > g.y)
    };
    function bj(b, S, R, E, i) {
        var g = -3 * S + 9 * R - 9 * E + 3 * i, d = b * g + 6 * S - 12 * R + 6 * E;
        return b * d - 3 * S + 3 * R
    }

    function q(bW, R, bV, g, bU, d, bR, b, bO) {
        if (bO == null) {
            bO = 1
        }
        bO = bO > 1 ? 1 : bO < 0 ? 0 : bO;
        var bP = bO / 2, bQ = 12, bL = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816], bT = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472], E = 0;
        for (var bS = 0; bS < bQ; bS++) {
            var bM = bP * bL[bS] + bP, bN = bj(bM, bW, bV, bU, bR), bX = bj(bM, R, g, d, b), S = bN * bN + bX * bX;
            E += bT[bS] * au.sqrt(S)
        }
        return bP * E
    }

    function C(g, bP, d, bO, b, bM, bR, bL, bN) {
        if (bN < 0 || q(g, bP, d, bO, b, bM, bR, bL) < bN) {
            return
        }
        var bQ = 1, i = bQ / 2, R = bQ - i, E, S = 0.01;
        E = q(g, bP, d, bO, b, bM, bR, bL, R);
        while (aw(E - bN) > S) {
            i /= 2;
            R += (E < bN ? 1 : -1) * i;
            E = q(g, bP, d, bO, b, bM, bR, bL, R)
        }
        return R
    }

    function O(i, bQ, g, bO, b, bN, bS, bM) {
        if (m(i, g) < bm(b, bS) || bm(i, g) > m(b, bS) || m(bQ, bO) < bm(bN, bM) || bm(bQ, bO) > m(bN, bM)) {
            return
        }
        var bL = (i * bO - bQ * g) * (b - bS) - (i - g) * (b * bM - bN * bS), S = (i * bO - bQ * g) * (bN - bM) - (bQ - bO) * (b * bM - bN * bS), E = (i - g) * (bN - bM) - (bQ - bO) * (b - bS);
        if (!E) {
            return
        }
        var bR = bL / E, bP = S / E, R = +bR.toFixed(2), d = +bP.toFixed(2);
        if (R < +bm(i, g).toFixed(2) || R > +m(i, g).toFixed(2) || R < +bm(b, bS).toFixed(2) || R > +m(b, bS).toFixed(2) || d < +bm(bQ, bO).toFixed(2) || d > +m(bQ, bO).toFixed(2) || d < +bm(bN, bM).toFixed(2) || d > +m(bN, bM).toFixed(2)) {
            return
        }
        return{x: bR, y: bP}
    }

    function ay(d, b) {
        return af(d, b)
    }

    function t(d, b) {
        return af(d, b, 1)
    }

    function af(b2, b1, b0) {
        var E = aR.bezierBBox(b2), d = aR.bezierBBox(b1);
        if (!aR.isBBoxIntersect(E, d)) {
            return b0 ? 0 : []
        }
        var bV = q.apply(0, b2), bU = q.apply(0, b1), bM = ~~(bV / 5), bL = ~~(bU / 5), bS = [], bR = [], g = {}, b3 = b0 ? 0 : [];
        for (var bX = 0; bX < bM + 1; bX++) {
            var bT = aR.findDotsAtSegment.apply(aR, b2.concat(bX / bM));
            bS.push({x: bT.x, y: bT.y, t: bX / bM})
        }
        for (bX = 0; bX < bL + 1; bX++) {
            bT = aR.findDotsAtSegment.apply(aR, b1.concat(bX / bL));
            bR.push({x: bT.x, y: bT.y, t: bX / bL})
        }
        for (bX = 0; bX < bM; bX++) {
            for (var bW = 0; bW < bL; bW++) {
                var bZ = bS[bX], b = bS[bX + 1], bY = bR[bW], S = bR[bW + 1], bQ = aw(b.x - bZ.x) < 0.001 ? "y" : "x", bP = aw(S.x - bY.x) < 0.001 ? "y" : "x", R = O(bZ.x, bZ.y, b.x, b.y, bY.x, bY.y, S.x, S.y);
                if (R) {
                    if (g[R.x.toFixed(4)] == R.y.toFixed(4)) {
                        continue
                    }
                    g[R.x.toFixed(4)] = R.y.toFixed(4);
                    var bO = bZ.t + aw((R[bQ] - bZ[bQ]) / (b[bQ] - bZ[bQ])) * (b.t - bZ.t), bN = bY.t + aw((R[bP] - bY[bP]) / (S[bP] - bY[bP])) * (S.t - bY.t);
                    if (bO >= 0 && bO <= 1 && bN >= 0 && bN <= 1) {
                        if (b0) {
                            b3++
                        } else {
                            b3.push({x: R.x, y: R.y, t1: bO, t2: bN})
                        }
                    }
                }
            }
        }
        return b3
    }

    aR.pathIntersection = function (d, b) {
        return D(d, b)
    };
    aR.pathIntersectionNumber = function (d, b) {
        return D(d, b, 1)
    };
    function D(g, b, bW) {
        g = aR._path2curve(g);
        b = aR._path2curve(b);
        var bU, S, bT, E, bR, bL, d, bO, b0, bZ, b1 = bW ? 0 : [];
        for (var bS = 0, bM = g.length; bS < bM; bS++) {
            var bY = g[bS];
            if (bY[0] == "M") {
                bU = bR = bY[1];
                S = bL = bY[2]
            } else {
                if (bY[0] == "C") {
                    b0 = [bU, S].concat(bY.slice(1));
                    bU = b0[6];
                    S = b0[7]
                } else {
                    b0 = [bU, S, bU, S, bR, bL, bR, bL];
                    bU = bR;
                    S = bL
                }
                for (var bQ = 0, bV = b.length; bQ < bV; bQ++) {
                    var bX = b[bQ];
                    if (bX[0] == "M") {
                        bT = d = bX[1];
                        E = bO = bX[2]
                    } else {
                        if (bX[0] == "C") {
                            bZ = [bT, E].concat(bX.slice(1));
                            bT = bZ[6];
                            E = bZ[7]
                        } else {
                            bZ = [bT, E, bT, E, d, bO, d, bO];
                            bT = d;
                            E = bO
                        }
                        var bN = af(b0, bZ, bW);
                        if (bW) {
                            b1 += bN
                        } else {
                            for (var bP = 0, R = bN.length; bP < R; bP++) {
                                bN[bP].segment1 = bS;
                                bN[bP].segment2 = bQ;
                                bN[bP].bez1 = b0;
                                bN[bP].bez2 = bZ
                            }
                            b1 = b1.concat(bN)
                        }
                    }
                }
            }
        }
        return b1
    }

    aR.isPointInsidePath = function (d, b, i) {
        var g = aR.pathBBox(d);
        return aR.isPointInsideBBox(g, b, i) && D(d, [
            ["M", b, i],
            ["H", g.x2 + 10]
        ], 1) % 2 == 1
    };
    aR._removedFactory = function (b) {
        return function () {
            eve("raphael.log", null, "Rapha\xebl: you are calling to method \u201c" + b + "\u201d of removed object", b)
        }
    };
    var am = aR.pathBBox = function (bT) {
        var bN = Y(bT);
        if (bN.bbox) {
            return bN.bbox
        }
        if (!bT) {
            return{x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0}
        }
        bT = W(bT);
        var bQ = 0, bP = 0, R = [], d = [], g;
        for (var bL = 0, bS = bT.length; bL < bS; bL++) {
            g = bT[bL];
            if (g[0] == "M") {
                bQ = g[1];
                bP = g[2];
                R.push(bQ);
                d.push(bP)
            } else {
                var bM = ba(bQ, bP, g[1], g[2], g[3], g[4], g[5], g[6]);
                R = R[bE](bM.min.x, bM.max.x);
                d = d[bE](bM.min.y, bM.max.y);
                bQ = g[5];
                bP = g[6]
            }
        }
        var b = bm[bG](0, R), bR = bm[bG](0, d), S = m[bG](0, R), E = m[bG](0, d), bO = {x: b, y: bR, x2: S, y2: E, width: S - b, height: E - bR};
        bN.bbox = X(bO);
        return bO
    }, aZ = function (d) {
        var b = X(d);
        b.toString = aR._path2string;
        return b
    }, aC = aR._pathToRelative = function (E) {
        var bM = Y(E);
        if (bM.rel) {
            return aZ(bM.rel)
        }
        if (!aR.is(E, bd) || !aR.is(E && E[0], bd)) {
            E = aR.parsePathString(E)
        }
        var bP = [], bR = 0, bQ = 0, bU = 0, bT = 0, g = 0;
        if (E[0][0] == "M") {
            bR = E[0][1];
            bQ = E[0][2];
            bU = bR;
            bT = bQ;
            g++;
            bP.push(["M", bR, bQ])
        }
        for (var bL = g, bV = E.length; bL < bV; bL++) {
            var b = bP[bL] = [], bS = E[bL];
            if (bS[0] != bK.call(bS[0])) {
                b[0] = bK.call(bS[0]);
                switch (b[0]) {
                    case"a":
                        b[1] = bS[1];
                        b[2] = bS[2];
                        b[3] = bS[3];
                        b[4] = bS[4];
                        b[5] = bS[5];
                        b[6] = +(bS[6] - bR).toFixed(3);
                        b[7] = +(bS[7] - bQ).toFixed(3);
                        break;
                    case"v":
                        b[1] = +(bS[1] - bQ).toFixed(3);
                        break;
                    case"m":
                        bU = bS[1];
                        bT = bS[2];
                    default:
                        for (var S = 1, bN = bS.length; S < bN; S++) {
                            b[S] = +(bS[S] - ((S % 2) ? bR : bQ)).toFixed(3)
                        }
                }
            } else {
                b = bP[bL] = [];
                if (bS[0] == "m") {
                    bU = bS[1] + bR;
                    bT = bS[2] + bQ
                }
                for (var R = 0, d = bS.length; R < d; R++) {
                    bP[bL][R] = bS[R]
                }
            }
            var bO = bP[bL].length;
            switch (bP[bL][0]) {
                case"z":
                    bR = bU;
                    bQ = bT;
                    break;
                case"h":
                    bR += +bP[bL][bO - 1];
                    break;
                case"v":
                    bQ += +bP[bL][bO - 1];
                    break;
                default:
                    bR += +bP[bL][bO - 2];
                    bQ += +bP[bL][bO - 1]
            }
        }
        bP.toString = aR._path2string;
        bM.rel = aZ(bP);
        return bP
    }, w = aR._pathToAbsolute = function (bQ) {
        var g = Y(bQ);
        if (g.abs) {
            return aZ(g.abs)
        }
        if (!aR.is(bQ, bd) || !aR.is(bQ && bQ[0], bd)) {
            bQ = aR.parsePathString(bQ)
        }
        if (!bQ || !bQ.length) {
            return[
                ["M", 0, 0]
            ]
        }
        var bW = [], bL = 0, S = 0, bO = 0, bN = 0, E = 0;
        if (bQ[0][0] == "M") {
            bL = +bQ[0][1];
            S = +bQ[0][2];
            bO = bL;
            bN = S;
            E++;
            bW[0] = ["M", bL, S]
        }
        var bV = bQ.length == 3 && bQ[0][0] == "M" && bQ[1][0].toUpperCase() == "R" && bQ[2][0].toUpperCase() == "Z";
        for (var bP, b, bT = E, bM = bQ.length; bT < bM; bT++) {
            bW.push(bP = []);
            b = bQ[bT];
            if (b[0] != bt.call(b[0])) {
                bP[0] = bt.call(b[0]);
                switch (bP[0]) {
                    case"A":
                        bP[1] = b[1];
                        bP[2] = b[2];
                        bP[3] = b[3];
                        bP[4] = b[4];
                        bP[5] = b[5];
                        bP[6] = +(b[6] + bL);
                        bP[7] = +(b[7] + S);
                        break;
                    case"V":
                        bP[1] = +b[1] + S;
                        break;
                    case"H":
                        bP[1] = +b[1] + bL;
                        break;
                    case"R":
                        var R = [bL, S][bE](b.slice(1));
                        for (var bS = 2, bU = R.length; bS < bU; bS++) {
                            R[bS] = +R[bS] + bL;
                            R[++bS] = +R[bS] + S
                        }
                        bW.pop();
                        bW = bW[bE](bb(R, bV));
                        break;
                    case"M":
                        bO = +b[1] + bL;
                        bN = +b[2] + S;
                    default:
                        for (bS = 1, bU = b.length; bS < bU; bS++) {
                            bP[bS] = +b[bS] + ((bS % 2) ? bL : S)
                        }
                }
            } else {
                if (b[0] == "R") {
                    R = [bL, S][bE](b.slice(1));
                    bW.pop();
                    bW = bW[bE](bb(R, bV));
                    bP = ["R"][bE](b.slice(-2))
                } else {
                    for (var bR = 0, d = b.length; bR < d; bR++) {
                        bP[bR] = b[bR]
                    }
                }
            }
            switch (bP[0]) {
                case"Z":
                    bL = bO;
                    S = bN;
                    break;
                case"H":
                    bL = bP[1];
                    break;
                case"V":
                    S = bP[1];
                    break;
                case"M":
                    bO = bP[bP.length - 2];
                    bN = bP[bP.length - 1];
                default:
                    bL = bP[bP.length - 2];
                    S = bP[bP.length - 1]
            }
        }
        bW.toString = aR._path2string;
        g.abs = aZ(bW);
        return bW
    }, bI = function (d, i, b, g) {
        return[d, i, b, g, b, g]
    }, bn = function (d, i, S, E, b, g) {
        var R = 1 / 3, bL = 2 / 3;
        return[R * d + bL * S, R * i + bL * E, R * b + bL * S, R * g + bL * E, b, g]
    }, ae = function (bS, cn, b1, bZ, bT, bN, E, bR, cm, bU) {
        var bY = aV * 120 / 180, b = aV / 180 * (+bT || 0), b5 = [], b2, cj = aG(function (co, cr, i) {
            var cq = co * au.cos(i) - cr * au.sin(i), cp = co * au.sin(i) + cr * au.cos(i);
            return{x: cq, y: cp}
        });
        if (!bU) {
            b2 = cj(bS, cn, -b);
            bS = b2.x;
            cn = b2.y;
            b2 = cj(bR, cm, -b);
            bR = b2.x;
            cm = b2.y;
            var d = au.cos(aV / 180 * bT), bP = au.sin(aV / 180 * bT), b7 = (bS - bR) / 2, b6 = (cn - cm) / 2;
            var ch = (b7 * b7) / (b1 * b1) + (b6 * b6) / (bZ * bZ);
            if (ch > 1) {
                ch = au.sqrt(ch);
                b1 = ch * b1;
                bZ = ch * bZ
            }
            var g = b1 * b1, ca = bZ * bZ, cc = (bN == E ? -1 : 1) * au.sqrt(aw((g * ca - g * b6 * b6 - ca * b7 * b7) / (g * b6 * b6 + ca * b7 * b7))), bW = cc * b1 * b6 / bZ + (bS + bR) / 2, bV = cc * -bZ * b7 / b1 + (cn + cm) / 2, bM = au.asin(((cn - bV) / bZ).toFixed(9)), bL = au.asin(((cm - bV) / bZ).toFixed(9));
            bM = bS < bW ? aV - bM : bM;
            bL = bR < bW ? aV - bL : bL;
            bM < 0 && (bM = aV * 2 + bM);
            bL < 0 && (bL = aV * 2 + bL);
            if (E && bM > bL) {
                bM = bM - aV * 2
            }
            if (!E && bL > bM) {
                bL = bL - aV * 2
            }
        } else {
            bM = bU[0];
            bL = bU[1];
            bW = bU[2];
            bV = bU[3]
        }
        var bQ = bL - bM;
        if (aw(bQ) > bY) {
            var bX = bL, b0 = bR, bO = cm;
            bL = bM + bY * (E && bL > bM ? 1 : -1);
            bR = bW + b1 * au.cos(bL);
            cm = bV + bZ * au.sin(bL);
            b5 = ae(bR, cm, b1, bZ, bT, 0, E, b0, bO, [bL, bX, bW, bV])
        }
        bQ = bL - bM;
        var S = au.cos(bM), cl = au.sin(bM), R = au.cos(bL), ck = au.sin(bL), b8 = au.tan(bQ / 4), cb = 4 / 3 * b1 * b8, b9 = 4 / 3 * bZ * b8, ci = [bS, cn], cg = [bS + cb * cl, cn - b9 * S], cf = [bR + cb * ck, cm - b9 * R], cd = [bR, cm];
        cg[0] = 2 * ci[0] - cg[0];
        cg[1] = 2 * ci[1] - cg[1];
        if (bU) {
            return[cg, cf, cd][bE](b5)
        } else {
            b5 = [cg, cf, cd][bE](b5).join()[F](",");
            var b3 = [];
            for (var ce = 0, b4 = b5.length; ce < b4; ce++) {
                b3[ce] = ce % 2 ? cj(b5[ce - 1], b5[ce], b).y : cj(b5[ce], b5[ce + 1], b).x
            }
            return b3
        }
    }, ag = function (d, b, i, g, bM, bL, S, R, bN) {
        var E = 1 - bN;
        return{x: bp(E, 3) * d + bp(E, 2) * 3 * bN * i + E * 3 * bN * bN * bM + bp(bN, 3) * S, y: bp(E, 3) * b + bp(E, 2) * 3 * bN * g + E * 3 * bN * bN * bL + bp(bN, 3) * R}
    }, ba = aG(function (i, d, R, E, bU, bT, bQ, bN) {
        var bS = (bU - 2 * R + i) - (bQ - 2 * bU + R), bP = 2 * (R - i) - 2 * (bU - R), bM = i - R, bL = (-bP + au.sqrt(bP * bP - 4 * bS * bM)) / 2 / bS, S = (-bP - au.sqrt(bP * bP - 4 * bS * bM)) / 2 / bS, bO = [d, bN], bR = [i, bQ], g;
        aw(bL) > "1e12" && (bL = 0.5);
        aw(S) > "1e12" && (S = 0.5);
        if (bL > 0 && bL < 1) {
            g = ag(i, d, R, E, bU, bT, bQ, bN, bL);
            bR.push(g.x);
            bO.push(g.y)
        }
        if (S > 0 && S < 1) {
            g = ag(i, d, R, E, bU, bT, bQ, bN, S);
            bR.push(g.x);
            bO.push(g.y)
        }
        bS = (bT - 2 * E + d) - (bN - 2 * bT + E);
        bP = 2 * (E - d) - 2 * (bT - E);
        bM = d - E;
        bL = (-bP + au.sqrt(bP * bP - 4 * bS * bM)) / 2 / bS;
        S = (-bP - au.sqrt(bP * bP - 4 * bS * bM)) / 2 / bS;
        aw(bL) > "1e12" && (bL = 0.5);
        aw(S) > "1e12" && (S = 0.5);
        if (bL > 0 && bL < 1) {
            g = ag(i, d, R, E, bU, bT, bQ, bN, bL);
            bR.push(g.x);
            bO.push(g.y)
        }
        if (S > 0 && S < 1) {
            g = ag(i, d, R, E, bU, bT, bQ, bN, S);
            bR.push(g.x);
            bO.push(g.y)
        }
        return{min: {x: bm[bG](0, bR), y: bm[bG](0, bO)}, max: {x: m[bG](0, bR), y: m[bG](0, bO)}}
    }), W = aR._path2curve = aG(function (bU, bP) {
        var bN = !bP && Y(bU);
        if (!bP && bN.curve) {
            return aZ(bN.curve)
        }
        var E = w(bU), bQ = bP && w(bP), bR = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, d = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, S = function (bV, bW) {
            var i, bX;
            if (!bV) {
                return["C", bW.x, bW.y, bW.x, bW.y, bW.x, bW.y]
            }
            !(bV[0] in {T: 1, Q: 1}) && (bW.qx = bW.qy = null);
            switch (bV[0]) {
                case"M":
                    bW.X = bV[1];
                    bW.Y = bV[2];
                    break;
                case"A":
                    bV = ["C"][bE](ae[bG](0, [bW.x, bW.y][bE](bV.slice(1))));
                    break;
                case"S":
                    i = bW.x + (bW.x - (bW.bx || bW.x));
                    bX = bW.y + (bW.y - (bW.by || bW.y));
                    bV = ["C", i, bX][bE](bV.slice(1));
                    break;
                case"T":
                    bW.qx = bW.x + (bW.x - (bW.qx || bW.x));
                    bW.qy = bW.y + (bW.y - (bW.qy || bW.y));
                    bV = ["C"][bE](bn(bW.x, bW.y, bW.qx, bW.qy, bV[1], bV[2]));
                    break;
                case"Q":
                    bW.qx = bV[1];
                    bW.qy = bV[2];
                    bV = ["C"][bE](bn(bW.x, bW.y, bV[1], bV[2], bV[3], bV[4]));
                    break;
                case"L":
                    bV = ["C"][bE](bI(bW.x, bW.y, bV[1], bV[2]));
                    break;
                case"H":
                    bV = ["C"][bE](bI(bW.x, bW.y, bV[1], bW.y));
                    break;
                case"V":
                    bV = ["C"][bE](bI(bW.x, bW.y, bW.x, bV[1]));
                    break;
                case"Z":
                    bV = ["C"][bE](bI(bW.x, bW.y, bW.X, bW.Y));
                    break
            }
            return bV
        }, b = function (bV, bW) {
            if (bV[bW].length > 7) {
                bV[bW].shift();
                var bX = bV[bW];
                while (bX.length) {
                    bV.splice(bW++, 0, ["C"][bE](bX.splice(0, 6)))
                }
                bV.splice(bW, 1);
                bS = m(E.length, bQ && bQ.length || 0)
            }
        }, g = function (bZ, bY, bW, bV, bX) {
            if (bZ && bY && bZ[bX][0] == "M" && bY[bX][0] != "M") {
                bY.splice(bX, 0, ["M", bV.x, bV.y]);
                bW.bx = 0;
                bW.by = 0;
                bW.x = bZ[bX][1];
                bW.y = bZ[bX][2];
                bS = m(E.length, bQ && bQ.length || 0)
            }
        };
        for (var bM = 0, bS = m(E.length, bQ && bQ.length || 0); bM < bS; bM++) {
            E[bM] = S(E[bM], bR);
            b(E, bM);
            bQ && (bQ[bM] = S(bQ[bM], d));
            bQ && b(bQ, bM);
            g(E, bQ, bR, d, bM);
            g(bQ, E, d, bR, bM);
            var bL = E[bM], bT = bQ && bQ[bM], R = bL.length, bO = bQ && bT.length;
            bR.x = bL[R - 2];
            bR.y = bL[R - 1];
            bR.bx = an(bL[R - 4]) || bR.x;
            bR.by = an(bL[R - 3]) || bR.y;
            d.bx = bQ && (an(bT[bO - 4]) || d.x);
            d.by = bQ && (an(bT[bO - 3]) || d.y);
            d.x = bQ && bT[bO - 2];
            d.y = bQ && bT[bO - 1]
        }
        if (!bQ) {
            bN.curve = aZ(E)
        }
        return bQ ? [E, bQ] : E
    }, null, aZ), v = aR._parseDots = aG(function (bO) {
        var bN = [];
        for (var S = 0, bP = bO.length; S < bP; S++) {
            var b = {}, bM = bO[S].match(/^([^:]*):?([\d\.]*)/);
            b.color = aR.getRGB(bM[1]);
            if (b.color.error) {
                return null
            }
            b.color = b.color.hex;
            bM[2] && (b.offset = bM[2] + "%");
            bN.push(b)
        }
        for (S = 1, bP = bN.length - 1; S < bP; S++) {
            if (!bN[S].offset) {
                var g = an(bN[S - 1].offset || 0), E = 0;
                for (var R = S + 1; R < bP; R++) {
                    if (bN[R].offset) {
                        E = bN[R].offset;
                        break
                    }
                }
                if (!E) {
                    E = 100;
                    R = bP
                }
                E = an(E);
                var bL = (E - g) / (R - S + 1);
                for (; S < R; S++) {
                    g += bL;
                    bN[S].offset = g + "%"
                }
            }
        }
        return bN
    }), aK = aR._tear = function (b, d) {
        b == d.top && (d.top = b.prev);
        b == d.bottom && (d.bottom = b.next);
        b.next && (b.next.prev = b.prev);
        b.prev && (b.prev.next = b.next)
    }, ap = aR._tofront = function (b, d) {
        if (d.top === b) {
            return
        }
        aK(b, d);
        b.next = null;
        b.prev = d.top;
        d.top.next = b;
        d.top = b
    }, p = aR._toback = function (b, d) {
        if (d.bottom === b) {
            return
        }
        aK(b, d);
        b.next = d.bottom;
        b.prev = null;
        d.bottom.prev = b;
        d.bottom = b
    }, G = aR._insertafter = function (d, b, g) {
        aK(d, g);
        b == g.top && (g.top = d);
        b.next && (b.next.prev = d);
        d.next = b.next;
        d.prev = b;
        b.next = d
    }, aT = aR._insertbefore = function (d, b, g) {
        aK(d, g);
        b == g.bottom && (g.bottom = d);
        b.prev && (b.prev.next = d);
        d.prev = b.prev;
        b.prev = d;
        d.next = b
    }, bl = aR.toMatrix = function (g, b) {
        var i = am(g), d = {_: {transform: aX}, getBBox: function () {
            return i
        }};
        aO(d, b);
        return d.matrix
    }, T = aR.transformPath = function (d, b) {
        return L(d, bl(d, b))
    }, aO = aR._extractTransform = function (d, bZ) {
        if (bZ == null) {
            return d._.transform
        }
        bZ = bH(bZ).replace(/\.{3}|\u2026/g, d._.transform || aX);
        var bR = aR.parseTransformString(bZ), bP = 0, bN = 0, bM = 0, bT = 1, bS = 1, b0 = d._, bU = new aF;
        b0.transform = bR || [];
        if (bR) {
            for (var bV = 0, bO = bR.length; bV < bO; bV++) {
                var bQ = bR[bV], b = bQ.length, R = bH(bQ[0]).toLowerCase(), bY = bQ[0] != R, bL = bY ? bU.invert() : 0, bX, E, bW, g, S;
                if (R == "t" && b == 3) {
                    if (bY) {
                        bX = bL.x(0, 0);
                        E = bL.y(0, 0);
                        bW = bL.x(bQ[1], bQ[2]);
                        g = bL.y(bQ[1], bQ[2]);
                        bU.translate(bW - bX, g - E)
                    } else {
                        bU.translate(bQ[1], bQ[2])
                    }
                } else {
                    if (R == "r") {
                        if (b == 2) {
                            S = S || d.getBBox(1);
                            bU.rotate(bQ[1], S.x + S.width / 2, S.y + S.height / 2);
                            bP += bQ[1]
                        } else {
                            if (b == 4) {
                                if (bY) {
                                    bW = bL.x(bQ[2], bQ[3]);
                                    g = bL.y(bQ[2], bQ[3]);
                                    bU.rotate(bQ[1], bW, g)
                                } else {
                                    bU.rotate(bQ[1], bQ[2], bQ[3])
                                }
                                bP += bQ[1]
                            }
                        }
                    } else {
                        if (R == "s") {
                            if (b == 2 || b == 3) {
                                S = S || d.getBBox(1);
                                bU.scale(bQ[1], bQ[b - 1], S.x + S.width / 2, S.y + S.height / 2);
                                bT *= bQ[1];
                                bS *= bQ[b - 1]
                            } else {
                                if (b == 5) {
                                    if (bY) {
                                        bW = bL.x(bQ[3], bQ[4]);
                                        g = bL.y(bQ[3], bQ[4]);
                                        bU.scale(bQ[1], bQ[2], bW, g)
                                    } else {
                                        bU.scale(bQ[1], bQ[2], bQ[3], bQ[4])
                                    }
                                    bT *= bQ[1];
                                    bS *= bQ[2]
                                }
                            }
                        } else {
                            if (R == "m" && b == 7) {
                                bU.add(bQ[1], bQ[2], bQ[3], bQ[4], bQ[5], bQ[6])
                            }
                        }
                    }
                }
                b0.dirtyT = 1;
                d.matrix = bU
            }
        }
        d.matrix = bU;
        b0.sx = bT;
        b0.sy = bS;
        b0.deg = bP;
        b0.dx = bN = bU.e;
        b0.dy = bM = bU.f;
        if (bT == 1 && bS == 1 && !bP && b0.bbox) {
            b0.bbox.x += +bN;
            b0.bbox.y += +bM
        } else {
            b0.dirtyT = 1
        }
    }, l = function (d) {
        var b = d[0];
        switch (b.toLowerCase()) {
            case"t":
                return[b, 0, 0];
            case"m":
                return[b, 1, 0, 0, 1, 0, 0];
            case"r":
                if (d.length == 4) {
                    return[b, 0, d[2], d[3]]
                } else {
                    return[b, 0]
                }
            case"s":
                if (d.length == 5) {
                    return[b, 1, 1, d[3], d[4]]
                } else {
                    if (d.length == 3) {
                        return[b, 1, 1]
                    } else {
                        return[b, 1]
                    }
                }
        }
    }, aB = aR._equaliseTransform = function (R, E) {
        E = bH(E).replace(/\.{3}|\u2026/g, R);
        R = aR.parseTransformString(R) || [];
        E = aR.parseTransformString(E) || [];
        var b = m(R.length, E.length), bN = [], bO = [], g = 0, d, S, bM, bL;
        for (; g < b; g++) {
            bM = R[g] || l(E[g]);
            bL = E[g] || l(bM);
            if ((bM[0] != bL[0]) || (bM[0].toLowerCase() == "r" && (bM[2] != bL[2] || bM[3] != bL[3])) || (bM[0].toLowerCase() == "s" && (bM[3] != bL[3] || bM[4] != bL[4]))) {
                return
            }
            bN[g] = [];
            bO[g] = [];
            for (d = 0, S = m(bM.length, bL.length); d < S; d++) {
                d in bM && (bN[g][d] = bM[d]);
                d in bL && (bO[g][d] = bL[d])
            }
        }
        return{from: bN, to: bO}
    };
    aR._getContainer = function (b, E, g, i) {
        var d;
        d = i == null && !aR.is(b, "object") ? aA.doc.getElementById(b) : b;
        if (d == null) {
            return
        }
        if (d.tagName) {
            if (E == null) {
                return{container: d, width: d.style.pixelWidth || d.offsetWidth, height: d.style.pixelHeight || d.offsetHeight}
            } else {
                return{container: d, width: E, height: g}
            }
        }
        return{container: 1, x: b, y: E, width: g, height: i}
    };
    aR.pathToRelative = aC;
    aR._engine = {};
    aR.path2curve = W;
    aR.matrix = function (i, g, bL, S, R, E) {
        return new aF(i, g, bL, S, R, E)
    };
    function aF(i, g, bL, S, R, E) {
        if (i != null) {
            this.a = +i;
            this.b = +g;
            this.c = +bL;
            this.d = +S;
            this.e = +R;
            this.f = +E
        } else {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0
        }
    }

    (function (g) {
        g.add = function (bT, bQ, bO, bM, S, R) {
            var E = [
                [],
                [],
                []
            ], i = [
                [this.a, this.c, this.e],
                [this.b, this.d, this.f],
                [0, 0, 1]
            ], bS = [
                [bT, bO, S],
                [bQ, bM, R],
                [0, 0, 1]
            ], bR, bP, bN, bL;
            if (bT && bT instanceof aF) {
                bS = [
                    [bT.a, bT.c, bT.e],
                    [bT.b, bT.d, bT.f],
                    [0, 0, 1]
                ]
            }
            for (bR = 0; bR < 3; bR++) {
                for (bP = 0; bP < 3; bP++) {
                    bL = 0;
                    for (bN = 0; bN < 3; bN++) {
                        bL += i[bR][bN] * bS[bN][bP]
                    }
                    E[bR][bP] = bL
                }
            }
            this.a = E[0][0];
            this.b = E[1][0];
            this.c = E[0][1];
            this.d = E[1][1];
            this.e = E[0][2];
            this.f = E[1][2]
        };
        g.invert = function () {
            var E = this, i = E.a * E.d - E.b * E.c;
            return new aF(E.d / i, -E.b / i, -E.c / i, E.a / i, (E.c * E.f - E.d * E.e) / i, (E.b * E.e - E.a * E.f) / i)
        };
        g.clone = function () {
            return new aF(this.a, this.b, this.c, this.d, this.e, this.f)
        };
        g.translate = function (i, E) {
            this.add(1, 0, 0, 1, i, E)
        };
        g.scale = function (E, S, i, R) {
            S == null && (S = E);
            (i || R) && this.add(1, 0, 0, 1, i, R);
            this.add(E, 0, 0, S, 0, 0);
            (i || R) && this.add(1, 0, 0, 1, -i, -R)
        };
        g.rotate = function (E, i, bL) {
            E = aR.rad(E);
            i = i || 0;
            bL = bL || 0;
            var S = +au.cos(E).toFixed(9), R = +au.sin(E).toFixed(9);
            this.add(S, R, -R, S, i, bL);
            this.add(1, 0, 0, 1, -i, -bL)
        };
        g.x = function (i, E) {
            return i * this.a + E * this.c + this.e
        };
        g.y = function (i, E) {
            return i * this.b + E * this.d + this.f
        };
        g.get = function (E) {
            return +this[bH.fromCharCode(97 + E)].toFixed(4)
        };
        g.toString = function () {
            return aR.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
        };
        g.toFilter = function () {
            return"progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
        };
        g.offset = function () {
            return[this.e.toFixed(4), this.f.toFixed(4)]
        };
        function d(i) {
            return i[0] * i[0] + i[1] * i[1]
        }

        function b(i) {
            var E = au.sqrt(d(i));
            i[0] && (i[0] /= E);
            i[1] && (i[1] /= E)
        }

        g.split = function () {
            var E = {};
            E.dx = this.e;
            E.dy = this.f;
            var S = [
                [this.a, this.c],
                [this.b, this.d]
            ];
            E.scalex = au.sqrt(d(S[0]));
            b(S[0]);
            E.shear = S[0][0] * S[1][0] + S[0][1] * S[1][1];
            S[1] = [S[1][0] - S[0][0] * E.shear, S[1][1] - S[0][1] * E.shear];
            E.scaley = au.sqrt(d(S[1]));
            b(S[1]);
            E.shear /= E.scaley;
            var i = -S[0][1], R = S[1][1];
            if (R < 0) {
                E.rotate = aR.deg(au.acos(R));
                if (i < 0) {
                    E.rotate = 360 - E.rotate
                }
            } else {
                E.rotate = aR.deg(au.asin(i))
            }
            E.isSimple = !+E.shear.toFixed(9) && (E.scalex.toFixed(9) == E.scaley.toFixed(9) || !E.rotate);
            E.isSuperSimple = !+E.shear.toFixed(9) && E.scalex.toFixed(9) == E.scaley.toFixed(9) && !E.rotate;
            E.noRotation = !+E.shear.toFixed(9) && !E.rotate;
            return E
        };
        g.toTransformString = function (i) {
            var E = i || this[F]();
            if (E.isSimple) {
                E.scalex = +E.scalex.toFixed(4);
                E.scaley = +E.scaley.toFixed(4);
                E.rotate = +E.rotate.toFixed(4);
                return(E.dx || E.dy ? "t" + [E.dx, E.dy] : aX) + (E.scalex != 1 || E.scaley != 1 ? "s" + [E.scalex, E.scaley, 0, 0] : aX) + (E.rotate ? "r" + [E.rotate, 0, 0] : aX)
            } else {
                return"m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
            }
        }
    })(aF.prototype);
    var V = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    if ((navigator.vendor == "Apple Computer, Inc.") && (V && V[1] < 4 || navigator.platform.slice(0, 2) == "iP") || (navigator.vendor == "Google Inc." && V && V[1] < 8)) {
        a4.safari = function () {
            var b = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke: "none"});
            setTimeout(function () {
                b.remove()
            })
        }
    } else {
        a4.safari = I
    }
    var P = function () {
        this.returnValue = false
    }, bD = function () {
        return this.originalEvent.preventDefault()
    }, a8 = function () {
        this.cancelBubble = true
    }, aJ = function () {
        return this.originalEvent.stopPropagation()
    }, aD = (function () {
        if (aA.doc.addEventListener) {
            return function (R, i, g, d) {
                var b = Z && bx[i] ? bx[i] : i, E = function (bP) {
                    var bO = aA.doc.documentElement.scrollTop || aA.doc.body.scrollTop, bQ = aA.doc.documentElement.scrollLeft || aA.doc.body.scrollLeft, S = bP.clientX + bQ, bR = bP.clientY + bO;
                    if (Z && bx[ak](i)) {
                        for (var bM = 0, bN = bP.targetTouches && bP.targetTouches.length; bM < bN; bM++) {
                            if (bP.targetTouches[bM].target == R) {
                                var bL = bP;
                                bP = bP.targetTouches[bM];
                                bP.originalEvent = bL;
                                bP.preventDefault = bD;
                                bP.stopPropagation = aJ;
                                break
                            }
                        }
                    }
                    return g.call(d, bP, S, bR)
                };
                R.addEventListener(b, E, false);
                return function () {
                    R.removeEventListener(b, E, false);
                    return true
                }
            }
        } else {
            if (aA.doc.attachEvent) {
                return function (R, i, g, d) {
                    var E = function (bM) {
                        bM = bM || aA.win.event;
                        var bL = aA.doc.documentElement.scrollTop || aA.doc.body.scrollTop, bN = aA.doc.documentElement.scrollLeft || aA.doc.body.scrollLeft, S = bM.clientX + bN, bO = bM.clientY + bL;
                        bM.preventDefault = bM.preventDefault || P;
                        bM.stopPropagation = bM.stopPropagation || a8;
                        return g.call(d, bM, S, bO)
                    };
                    R.attachEvent("on" + i, E);
                    var b = function () {
                        R.detachEvent("on" + i, E);
                        return true
                    };
                    return b
                }
            }
        }
    })(), be = [], by = function (bM) {
        var bP = bM.clientX, bO = bM.clientY, bR = aA.doc.documentElement.scrollTop || aA.doc.body.scrollTop, bS = aA.doc.documentElement.scrollLeft || aA.doc.body.scrollLeft, g, E = be.length;
        while (E--) {
            g = be[E];
            if (Z) {
                var S = bM.touches.length, R;
                while (S--) {
                    R = bM.touches[S];
                    if (R.identifier == g.el._drag.id) {
                        bP = R.clientX;
                        bO = R.clientY;
                        (bM.originalEvent ? bM.originalEvent : bM).preventDefault();
                        break
                    }
                }
            } else {
                bM.preventDefault()
            }
            var d = g.el.node, b, bL = d.nextSibling, bQ = d.parentNode, bN = d.style.display;
            aA.win.opera && bQ.removeChild(d);
            d.style.display = "none";
            b = g.el.paper.getElementByPoint(bP, bO);
            d.style.display = bN;
            aA.win.opera && (bL ? bQ.insertBefore(d, bL) : bQ.appendChild(d));
            b && eve("raphael.drag.over." + g.el.id, g.el, b);
            bP += bS;
            bO += bR;
            eve("raphael.drag.move." + g.el.id, g.move_scope || g.el, bP - g.el._drag.x, bO - g.el._drag.y, bP, bO, bM)
        }
    }, e = function (g) {
        aR.unmousemove(by).unmouseup(e);
        var d = be.length, b;
        while (d--) {
            b = be[d];
            b.el._drag = {};
            eve("raphael.drag.end." + b.el.id, b.end_scope || b.start_scope || b.move_scope || b.el, g)
        }
        be = []
    }, bh = aR.el = {};
    for (var ax = Q.length; ax--;) {
        (function (b) {
            aR[b] = bh[b] = function (g, d) {
                if (aR.is(g, "function")) {
                    this.events = this.events || [];
                    this.events.push({name: b, f: g, unbind: aD(this.shape || this.node || aA.doc, b, g, d || this)})
                }
                return this
            };
            aR["un" + b] = bh["un" + b] = function (i) {
                var g = this.events || [], d = g.length;
                while (d--) {
                    if (g[d].name == b && g[d].f == i) {
                        g[d].unbind();
                        g.splice(d, 1);
                        !g.length && delete this.events;
                        return this
                    }
                }
                return this
            }
        })(Q[ax])
    }
    bh.data = function (d, E) {
        var g = aU[this.id] = aU[this.id] || {};
        if (arguments.length == 1) {
            if (aR.is(d, "object")) {
                for (var b in d) {
                    if (d[ak](b)) {
                        this.data(b, d[b])
                    }
                }
                return this
            }
            eve("raphael.data.get." + this.id, this, g[d], d);
            return g[d]
        }
        g[d] = E;
        eve("raphael.data.set." + this.id, this, E, d);
        return this
    };
    bh.removeData = function (b) {
        if (b == null) {
            aU[this.id] = {}
        } else {
            aU[this.id] && delete aU[this.id][b]
        }
        return this
    };
    bh.hover = function (i, b, g, d) {
        return this.mouseover(i, g).mouseout(b, d || g)
    };
    bh.unhover = function (d, b) {
        return this.unmouseover(d).unmouseout(b)
    };
    var bu = [];
    bh.drag = function (d, R, E, b, g, i) {
        function S(bM) {
            (bM.originalEvent || bM).preventDefault();
            var bL = aA.doc.documentElement.scrollTop || aA.doc.body.scrollTop, bN = aA.doc.documentElement.scrollLeft || aA.doc.body.scrollLeft;
            this._drag.x = bM.clientX + bN;
            this._drag.y = bM.clientY + bL;
            this._drag.id = bM.identifier;
            !be.length && aR.mousemove(by).mouseup(e);
            be.push({el: this, move_scope: b, start_scope: g, end_scope: i});
            R && eve.on("raphael.drag.start." + this.id, R);
            d && eve.on("raphael.drag.move." + this.id, d);
            E && eve.on("raphael.drag.end." + this.id, E);
            eve("raphael.drag.start." + this.id, g || b || this, bM.clientX + bN, bM.clientY + bL, bM)
        }

        this._drag = {};
        bu.push({el: this, start: S});
        this.mousedown(S);
        return this
    };
    bh.onDragOver = function (b) {
        b ? eve.on("raphael.drag.over." + this.id, b) : eve.unbind("raphael.drag.over." + this.id)
    };
    bh.undrag = function () {
        var b = bu.length;
        while (b--) {
            if (bu[b].el == this) {
                this.unmousedown(bu[b].start);
                bu.splice(b, 1);
                eve.unbind("raphael.drag.*." + this.id)
            }
        }
        !bu.length && aR.unmousemove(by).unmouseup(e)
    };
    a4.group = function (b, g) {
        var d = aR._engine.group(this, b || 0, g || 0);
        this.__set__ && this.__set__.push(d);
        return d
    };
    a4.circle = function (b, i, g) {
        var d = aR._engine.circle(this, b || 0, i || 0, g || 0);
        this.__set__ && this.__set__.push(d);
        return d
    };
    a4.rect = function (b, R, d, i, E) {
        var g = aR._engine.rect(this, b || 0, R || 0, d || 0, i || 0, E || 0);
        this.__set__ && this.__set__.push(g);
        return g
    };
    a4.ellipse = function (b, E, i, g) {
        var d = aR._engine.ellipse(this, b || 0, E || 0, i || 0, g || 0);
        this.__set__ && this.__set__.push(d);
        return d
    };
    a4.path = function (b) {
        b && !aR.is(b, aj) && !aR.is(b[0], bd) && (b += aX);
        var d = aR._engine.path(aR.format[bG](aR, arguments), this);
        this.__set__ && this.__set__.push(d);
        return d
    };
    a4.image = function (E, b, R, d, i) {
        var g = aR._engine.image(this, E || "about:blank", b || 0, R || 0, d || 0, i || 0);
        this.__set__ && this.__set__.push(g);
        return g
    };
    a4.text = function (b, i, g) {
        var d = aR._engine.text(this, b || 0, i || 0, bH(g));
        this.__set__ && this.__set__.push(d);
        return d
    };
    a4.foreignObject = function (E, b, R, d, i) {
        var g = aR._engine.foreignObject(this, b || 0, R || 0, d || 0, i || 0, E);
        this.__set__ && this.__set__.push(g);
        return g
    };
    a4.set = function (d) {
        !aR.is(d, "array") && (d = Array.prototype.splice.call(arguments, 0, arguments.length));
        var b = new al(d);
        this.__set__ && this.__set__.push(b);
        return b
    };
    a4.setStart = function (b) {
        this.__set__ = b || this.set()
    };
    a4.setFinish = function (d) {
        var b = this.__set__;
        delete this.__set__;
        return b
    };
    a4.setSize = function (d, b) {
        return aR._engine.setSize.call(this, d, b)
    };
    a4.setViewBox = function (b, E, d, i, g) {
        return aR._engine.setViewBox.call(this, b, E, d, i, g)
    };
    a4.top = a4.bottom = null;
    a4.raphael = aR;
    var bs = function (g) {
        var E = g.getBoundingClientRect(), bM = g.ownerDocument, R = bM.body, b = bM.documentElement, i = b.clientTop || R.clientTop || 0, S = b.clientLeft || R.clientLeft || 0, bL = E.top + (aA.win.pageYOffset || b.scrollTop || R.scrollTop) - i, d = E.left + (aA.win.pageXOffset || b.scrollLeft || R.scrollLeft) - S;
        return{y: bL, x: d}
    };
    a4.getElementByPoint = function (d, bL) {
        var S = this, g = S.canvas, R = aA.doc.elementFromPoint(d, bL);
        if (aA.win.opera && R.tagName == "svg") {
            var E = bs(g), i = g.createSVGRect();
            i.x = d - E.x;
            i.y = bL - E.y;
            i.width = i.height = 1;
            var b = g.getIntersectionList(i, null);
            if (b.length) {
                R = b[b.length - 1]
            }
        }
        if (!R) {
            return null
        }
        while (R.parentNode && R != g.parentNode && !R.raphael) {
            R = R.parentNode
        }
        R == S.canvas.parentNode && (R = g);
        R = R && R.raphael ? S.getById(R.raphaelid) : null;
        return R
    };
    a4.getById = function (d) {
        var b = this.bottom;
        while (b) {
            if (b.id == d) {
                return b
            }
            b = b.next
        }
        return null
    };
    a4.forEach = function (g, b) {
        var d = this.bottom;
        while (d) {
            if (g.call(b, d) === false) {
                return this
            }
            d = d.next
        }
        return this
    };
    a4.getElementsByPoint = function (b, g) {
        var d = this.set();
        this.forEach(function (i) {
            if (i.isPointInside(b, g)) {
                d.push(i)
            }
        });
        return d
    };
    function y() {
        return this.x + aQ + this.y
    }

    function at() {
        return this.x + aQ + this.y + aQ + this.width + " \xd7 " + this.height
    }

    bh.isPointInside = function (b, g) {
        var d = this.realPath = this.realPath || N[this.type](this);
        return aR.isPointInsidePath(d, b, g)
    };
    bh.getBBox = function (d) {
        if (this.removed) {
            return{}
        }
        var b = this._;
        if (d) {
            if (b.dirty || !b.bboxwt) {
                this.realPath = N[this.type](this);
                b.bboxwt = am(this.realPath);
                b.bboxwt.toString = at;
                b.dirty = 0
            }
            return b.bboxwt
        }
        if (b.dirty || b.dirtyT || !b.bbox) {
            if (b.dirty || !this.realPath) {
                b.bboxwt = 0;
                this.realPath = N[this.type](this)
            }
            b.bbox = am(L(this.realPath, this.matrix));
            b.bbox.toString = at;
            b.dirty = b.dirtyT = 0
        }
        return b.bbox
    };
    bh.clone = function () {
        if (this.removed) {
            return null
        }
        var b = this.paper[this.type]().attr(this.attr());
        this.__set__ && this.__set__.push(b);
        return b
    };
    bh.glow = function (bL) {
        if (this.type == "text") {
            return null
        }
        bL = bL || {};
        var g = {width: (bL.width || 10) + (+this.attr("stroke-width") || 1), fill: bL.fill || false, opacity: bL.opacity || 0.5, offsetx: bL.offsetx || 0, offsety: bL.offsety || 0, color: bL.color || "#000"}, S = g.width / 2, E = this.paper, b = E.set(), R = this.realPath || N[this.type](this);
        R = this.matrix ? L(R, this.matrix) : R;
        for (var d = 1; d < S + 1; d++) {
            b.push(E.path(R).attr({stroke: g.color, fill: g.fill ? g.color : "none", "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-width": +(g.width / S * d).toFixed(3), opacity: +(g.opacity / S).toFixed(3)}))
        }
        return b.insertBefore(this).translate(g.offsetx, g.offsety)
    };
    var a7 = {}, k = function (d, b, E, i, bM, bL, S, R, g) {
        if (g == null) {
            return q(d, b, E, i, bM, bL, S, R)
        } else {
            return aR.findDotsAtSegment(d, b, E, i, bM, bL, S, R, C(d, b, E, i, bM, bL, S, R, g))
        }
    }, a6 = function (b, d) {
        return function (bT, R, S) {
            bT = W(bT);
            var bP, bO, g, bL, E = "", bS = {}, bQ, bN = 0;
            for (var bM = 0, bR = bT.length; bM < bR; bM++) {
                g = bT[bM];
                if (g[0] == "M") {
                    bP = +g[1];
                    bO = +g[2]
                } else {
                    bL = k(bP, bO, g[1], g[2], g[3], g[4], g[5], g[6]);
                    if (bN + bL > R) {
                        if (d && !bS.start) {
                            bQ = k(bP, bO, g[1], g[2], g[3], g[4], g[5], g[6], R - bN);
                            E += ["C" + bQ.start.x, bQ.start.y, bQ.m.x, bQ.m.y, bQ.x, bQ.y];
                            if (S) {
                                return E
                            }
                            bS.start = E;
                            E = ["M" + bQ.x, bQ.y + "C" + bQ.n.x, bQ.n.y, bQ.end.x, bQ.end.y, g[5], g[6]].join();
                            bN += bL;
                            bP = +g[5];
                            bO = +g[6];
                            continue
                        }
                        if (!b && !d) {
                            bQ = k(bP, bO, g[1], g[2], g[3], g[4], g[5], g[6], R - bN);
                            return{x: bQ.x, y: bQ.y, alpha: bQ.alpha}
                        }
                    }
                    bN += bL;
                    bP = +g[5];
                    bO = +g[6]
                }
                E += g.shift() + g
            }
            bS.end = E;
            bQ = b ? bN : d ? bS : aR.findDotsAtSegment(bP, bO, g[0], g[1], g[2], g[3], g[4], g[5], 1);
            bQ.alpha && (bQ = {x: bQ.x, y: bQ.y, alpha: bQ.alpha});
            return bQ
        }
    };
    var aS = a6(1), J = a6(), ad = a6(0, 1);
    aR.getTotalLength = aS;
    aR.getPointAtLength = J;
    aR.getSubpath = function (d, i, g) {
        if (this.getTotalLength(d) - g < 0.000001) {
            return ad(d, i).end
        }
        var b = ad(d, g, 1);
        return i ? ad(b, i).end : b
    };
    bh.getTotalLength = function () {
        if (this.type != "path") {
            return
        }
        if (this.node.getTotalLength) {
            return this.node.getTotalLength()
        }
        return aS(this.attrs.path)
    };
    bh.getPointAtLength = function (b) {
        if (this.type != "path") {
            return
        }
        return J(this.attrs.path, b)
    };
    bh.getSubpath = function (d, b) {
        if (this.type != "path") {
            return
        }
        return aR.getSubpath(this.attrs.path, d, b)
    };
    var o = aR.easing_formulas = {linear: function (b) {
        return b
    }, "<": function (b) {
        return bp(b, 1.7)
    }, ">": function (b) {
        return bp(b, 0.48)
    }, "<>": function (bL) {
        var i = 0.48 - bL / 1.04, g = au.sqrt(0.1734 + i * i), b = g - i, S = bp(aw(b), 1 / 3) * (b < 0 ? -1 : 1), R = -g - i, E = bp(aw(R), 1 / 3) * (R < 0 ? -1 : 1), d = S + E + 0.5;
        return(1 - d) * 3 * d * d + d * d * d
    }, backIn: function (d) {
        var b = 1.70158;
        return d * d * ((b + 1) * d - b)
    }, backOut: function (d) {
        d = d - 1;
        var b = 1.70158;
        return d * d * ((b + 1) * d + b) + 1
    }, elastic: function (b) {
        if (b == !!b) {
            return b
        }
        return bp(2, -10 * b) * au.sin((b - 0.075) * (2 * aV) / 0.3) + 1
    }, bounce: function (i) {
        var d = 7.5625, g = 2.75, b;
        if (i < (1 / g)) {
            b = d * i * i
        } else {
            if (i < (2 / g)) {
                i -= (1.5 / g);
                b = d * i * i + 0.75
            } else {
                if (i < (2.5 / g)) {
                    i -= (2.25 / g);
                    b = d * i * i + 0.9375
                } else {
                    i -= (2.625 / g);
                    b = d * i * i + 0.984375
                }
            }
        }
        return b
    }};
    o.easeIn = o["ease-in"] = o["<"];
    o.easeOut = o["ease-out"] = o[">"];
    o.easeInOut = o["ease-in-out"] = o["<>"];
    o["back-in"] = o.backIn;
    o["back-out"] = o.backOut;
    var ab = [], aN = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (b) {
        setTimeout(b, 16)
    }, bC = function () {
        var bL = +new Date, bT = 0;
        for (; bT < ab.length; bT++) {
            var bZ = ab[bT];
            if (bZ.el.removed || bZ.paused) {
                continue
            }
            var E = bL - bZ.start, bR = bZ.ms, bQ = bZ.easing, bU = bZ.from, bO = bZ.diff, d = bZ.to, bN = bZ.t, S = bZ.el, bP = {}, b, bX = {}, b1;
            if (bZ.initstatus) {
                E = (bZ.initstatus * bZ.anim.top - bZ.prev) / (bZ.percent - bZ.prev) * bR;
                bZ.status = bZ.initstatus;
                delete bZ.initstatus;
                bZ.stop && ab.splice(bT--, 1)
            } else {
                bZ.status = (bZ.prev + (bZ.percent - bZ.prev) * (E / bR)) / bZ.anim.top
            }
            if (E < 0) {
                continue
            }
            if (E < bR) {
                var g = bQ(E / bR);
                for (var bS in bU) {
                    if (bU[ak](bS)) {
                        switch (ar[bS]) {
                            case aL:
                                b = +bU[bS] + g * bR * bO[bS];
                                break;
                            case"colour":
                                b = "rgb(" + [H(ah(bU[bS].r + g * bR * bO[bS].r)), H(ah(bU[bS].g + g * bR * bO[bS].g)), H(ah(bU[bS].b + g * bR * bO[bS].b))].join(",") + ")";
                                break;
                            case"path":
                                b = [];
                                for (var bW = 0, bM = bU[bS].length; bW < bM; bW++) {
                                    b[bW] = [bU[bS][bW][0]];
                                    for (var bV = 1, bY = bU[bS][bW].length; bV < bY; bV++) {
                                        b[bW][bV] = +bU[bS][bW][bV] + g * bR * bO[bS][bW][bV]
                                    }
                                    b[bW] = b[bW].join(aQ)
                                }
                                b = b.join(aQ);
                                break;
                            case"transform":
                                if (bO[bS].real) {
                                    b = [];
                                    for (bW = 0, bM = bU[bS].length; bW < bM; bW++) {
                                        b[bW] = [bU[bS][bW][0]];
                                        for (bV = 1, bY = bU[bS][bW].length; bV < bY; bV++) {
                                            b[bW][bV] = bU[bS][bW][bV] + g * bR * bO[bS][bW][bV]
                                        }
                                    }
                                } else {
                                    var b0 = function (b2) {
                                        return +bU[bS][b2] + g * bR * bO[bS][b2]
                                    };
                                    b = [
                                        ["m", b0(0), b0(1), b0(2), b0(3), b0(4), b0(5)]
                                    ]
                                }
                                break;
                            case"csv":
                                if (bS == "clip-rect") {
                                    b = [];
                                    bW = 4;
                                    while (bW--) {
                                        b[bW] = +bU[bS][bW] + g * bR * bO[bS][bW]
                                    }
                                }
                                break;
                            default:
                                var R = [][bE](bU[bS]);
                                b = [];
                                bW = S.paper.customAttributes[bS].length;
                                while (bW--) {
                                    b[bW] = +R[bW] + g * bR * bO[bS][bW]
                                }
                                break
                        }
                        bP[bS] = b
                    }
                }
                S.attr(bP);
                (function (b3, i, b2) {
                    setTimeout(function () {
                        eve("raphael.anim.frame." + b3, i, b2)
                    })
                })(S.id, S, bZ.anim)
            } else {
                (function (b3, b2, i) {
                    setTimeout(function () {
                        eve("raphael.anim.frame." + b2.id, b2, i);
                        eve("raphael.anim.finish." + b2.id, b2, i);
                        aR.is(b3, "function") && b3.call(b2)
                    })
                })(bZ.callback, S, bZ.anim);
                S.attr(d);
                ab.splice(bT--, 1);
                if (bZ.repeat > 1 && !bZ.next) {
                    for (b1 in d) {
                        if (d[ak](b1)) {
                            bX[b1] = bZ.totalOrigin[b1]
                        }
                    }
                    bZ.el.attr(bX);
                    aM(bZ.anim, bZ.el, bZ.anim.percents[0], null, bZ.totalOrigin, bZ.repeat - 1)
                }
                if (bZ.next && !bZ.stop) {
                    aM(bZ.anim, bZ.el, bZ.next, null, bZ.totalOrigin, bZ.repeat)
                }
            }
        }
        aR.svg && S && S.paper && S.paper.safari();
        ab.length && aN(bC)
    }, H = function (b) {
        return b > 255 ? 255 : b < 0 ? 0 : b
    };
    bh.animateWith = function (d, E, g, b, bL, bQ) {
        var S = this;
        if (S.removed) {
            bQ && bQ.call(S);
            return S
        }
        var bO = g instanceof bA ? g : aR.animation(g, b, bL, bQ), bN, bM;
        aM(bO, S, bO.percents[0], null, S.attr());
        for (var R = 0, bP = ab.length; R < bP; R++) {
            if (ab[R].anim == E && ab[R].el == d) {
                ab[bP - 1].start = ab[R].start;
                break
            }
        }
        return S
    };
    function a3(bR, i, d, bQ, bP, bL) {
        var bM = 3 * i, bO = 3 * (bQ - i) - bM, b = 1 - bM - bO, S = 3 * d, bN = 3 * (bP - d) - S, bS = 1 - S - bN;

        function R(bT) {
            return((b * bT + bO) * bT + bM) * bT
        }

        function g(bT, bV) {
            var bU = E(bT, bV);
            return((bS * bU + bN) * bU + S) * bU
        }

        function E(bT, b0) {
            var bZ, bY, bW, bU, bX, bV;
            for (bW = bT, bV = 0; bV < 8; bV++) {
                bU = R(bW) - bT;
                if (aw(bU) < b0) {
                    return bW
                }
                bX = (3 * b * bW + 2 * bO) * bW + bM;
                if (aw(bX) < 0.000001) {
                    break
                }
                bW = bW - bU / bX
            }
            bZ = 0;
            bY = 1;
            bW = bT;
            if (bW < bZ) {
                return bZ
            }
            if (bW > bY) {
                return bY
            }
            while (bZ < bY) {
                bU = R(bW);
                if (aw(bU - bT) < b0) {
                    return bW
                }
                if (bT > bU) {
                    bZ = bW
                } else {
                    bY = bW
                }
                bW = (bY - bZ) / 2 + bZ
            }
            return bW
        }

        return g(bR, 1 / (200 * bL))
    }

    bh.onAnimation = function (b) {
        b ? eve.on("raphael.anim.frame." + this.id, b) : eve.unbind("raphael.anim.frame." + this.id);
        return this
    };
    function bA(E, g) {
        var d = [], i = {};
        this.ms = g;
        this.times = 1;
        if (E) {
            for (var b in E) {
                if (E[ak](b)) {
                    i[an(b)] = E[b];
                    d.push(an(b))
                }
            }
            d.sort(u)
        }
        this.anim = i;
        this.top = d[d.length - 1];
        this.percents = d
    }

    bA.prototype.delay = function (d) {
        var b = new bA(this.anim, this.ms);
        b.times = this.times;
        b.del = +d || 0;
        return b
    };
    bA.prototype.repeat = function (d) {
        var b = new bA(this.anim, this.ms);
        b.del = this.del;
        b.times = au.floor(m(d, 0)) || 1;
        return b
    };
    function aM(b3, g, b, b1, bL, bP) {
        b = an(b);
        var ca, S, bO, cb = [], bV, bU, R, bX = b3.ms, b2 = {}, E = {}, bR = {};
        if (b1) {
            for (b6 = 0, bQ = ab.length; b6 < bQ; b6++) {
                var b8 = ab[b6];
                if (b8.el.id == g.id && b8.anim == b3) {
                    if (b8.percent != b) {
                        ab.splice(b6, 1);
                        bO = 1
                    } else {
                        S = b8
                    }
                    g.attr(b8.totalOrigin);
                    break
                }
            }
        } else {
            b1 = +E
        }
        for (var b6 = 0, bQ = b3.percents.length; b6 < bQ; b6++) {
            if (b3.percents[b6] == b || b3.percents[b6] > b1 * b3.top) {
                b = b3.percents[b6];
                bU = b3.percents[b6 - 1] || 0;
                bX = bX / b3.top * (b - bU);
                bV = b3.percents[b6 + 1];
                ca = b3.anim[b];
                break
            } else {
                if (b1) {
                    g.attr(b3.anim[b3.percents[b6]])
                }
            }
        }
        if (!ca) {
            return
        }
        if (!S) {
            for (var bZ in ca) {
                if (ca[ak](bZ)) {
                    if (ar[ak](bZ) || g.paper.customAttributes[ak](bZ)) {
                        b2[bZ] = g.attr(bZ);
                        (b2[bZ] == null) && (b2[bZ] = r[bZ]);
                        E[bZ] = ca[bZ];
                        switch (ar[bZ]) {
                            case aL:
                                bR[bZ] = (E[bZ] - b2[bZ]) / bX;
                                break;
                            case"colour":
                                b2[bZ] = aR.getRGB(b2[bZ]);
                                var b0 = aR.getRGB(E[bZ]);
                                bR[bZ] = {r: (b0.r - b2[bZ].r) / bX, g: (b0.g - b2[bZ].g) / bX, b: (b0.b - b2[bZ].b) / bX};
                                break;
                            case"path":
                                var bM = W(b2[bZ], E[bZ]), bT = bM[1];
                                b2[bZ] = bM[0];
                                bR[bZ] = [];
                                for (b6 = 0, bQ = b2[bZ].length; b6 < bQ; b6++) {
                                    bR[bZ][b6] = [0];
                                    for (var b5 = 1, b7 = b2[bZ][b6].length; b5 < b7; b5++) {
                                        bR[bZ][b6][b5] = (bT[b6][b5] - b2[bZ][b6][b5]) / bX
                                    }
                                }
                                break;
                            case"transform":
                                var cd = g._, cc = aB(cd[bZ], E[bZ]);
                                if (cc) {
                                    b2[bZ] = cc.from;
                                    E[bZ] = cc.to;
                                    bR[bZ] = [];
                                    bR[bZ].real = true;
                                    for (b6 = 0, bQ = b2[bZ].length; b6 < bQ; b6++) {
                                        bR[bZ][b6] = [b2[bZ][b6][0]];
                                        for (b5 = 1, b7 = b2[bZ][b6].length; b5 < b7; b5++) {
                                            bR[bZ][b6][b5] = (E[bZ][b6][b5] - b2[bZ][b6][b5]) / bX
                                        }
                                    }
                                } else {
                                    var bY = (g.matrix || new aF), b9 = {_: {transform: cd.transform}, getBBox: function () {
                                        return g.getBBox(1)
                                    }};
                                    b2[bZ] = [bY.a, bY.b, bY.c, bY.d, bY.e, bY.f];
                                    aO(b9, E[bZ]);
                                    E[bZ] = b9._.transform;
                                    bR[bZ] = [(b9.matrix.a - bY.a) / bX, (b9.matrix.b - bY.b) / bX, (b9.matrix.c - bY.c) / bX, (b9.matrix.d - bY.d) / bX, (b9.matrix.e - bY.e) / bX, (b9.matrix.f - bY.f) / bX]
                                }
                                break;
                            case"csv":
                                var d = bH(ca[bZ])[F](a), bN = bH(b2[bZ])[F](a);
                                if (bZ == "clip-rect") {
                                    b2[bZ] = bN;
                                    bR[bZ] = [];
                                    b6 = bN.length;
                                    while (b6--) {
                                        bR[bZ][b6] = (d[b6] - b2[bZ][b6]) / bX
                                    }
                                }
                                E[bZ] = d;
                                break;
                            default:
                                d = [][bE](ca[bZ]);
                                bN = [][bE](b2[bZ]);
                                bR[bZ] = [];
                                b6 = g.paper.customAttributes[bZ].length;
                                while (b6--) {
                                    bR[bZ][b6] = ((d[b6] || 0) - (bN[b6] || 0)) / bX
                                }
                                break
                        }
                    }
                }
            }
            var bW = ca.easing, b4 = aR.easing_formulas[bW];
            if (!b4) {
                b4 = bH(bW).match(c);
                if (b4 && b4.length == 5) {
                    var bS = b4;
                    b4 = function (i) {
                        return a3(i, +bS[1], +bS[2], +bS[3], +bS[4], bX)
                    }
                } else {
                    b4 = bB
                }
            }
            R = ca.start || b3.start || +new Date;
            b8 = {anim: b3, percent: b, timestamp: R, start: R + (b3.del || 0), status: 0, initstatus: b1 || 0, stop: false, ms: bX, easing: b4, from: b2, diff: bR, to: E, el: g, callback: ca.callback, prev: bU, next: bV, repeat: bP || b3.times, origin: g.attr(), totalOrigin: bL};
            ab.push(b8);
            if (b1 && !S && !bO) {
                b8.stop = true;
                b8.start = new Date - bX * b1;
                if (ab.length == 1) {
                    return bC()
                }
            }
            if (bO) {
                b8.start = new Date - b8.ms * b1
            }
            ab.length == 1 && aN(bC)
        } else {
            S.initstatus = b1;
            S.start = new Date - S.ms * b1
        }
        eve("raphael.anim.start." + g.id, g, b3)
    }

    aR.animation = function (E, d, S, R) {
        if (E instanceof bA) {
            return E
        }
        if (aR.is(S, "function") || !S) {
            R = R || S || null;
            S = null
        }
        E = Object(E);
        d = +d || 0;
        var i = {}, g, b;
        for (b in E) {
            if (E[ak](b) && an(b) != b && an(b) + "%" != b) {
                g = true;
                i[b] = E[b]
            }
        }
        if (!g) {
            return new bA(E, d)
        } else {
            S && (i.easing = S);
            R && (i.callback = R);
            return new bA({100: i}, d)
        }
    };
    bh.animate = function (i, b, R, E) {
        var d = this;
        if (d.removed) {
            E && E.call(d);
            return d
        }
        var g = i instanceof bA ? i : aR.animation(i, b, R, E);
        aM(g, d, g.percents[0], null, d.attr());
        return d
    };
    bh.setTime = function (d, b) {
        if (d && b != null) {
            this.status(d, bm(b, d.ms) / d.ms)
        }
        return this
    };
    bh.status = function (R, E) {
        var d = [], g = 0, b, S;
        if (E != null) {
            aM(R, this, -1, bm(E, 1));
            return this
        } else {
            b = ab.length;
            for (; g < b; g++) {
                S = ab[g];
                if (S.el.id == this.id && (!R || S.anim == R)) {
                    if (R) {
                        return S.status
                    }
                    d.push({anim: S.anim, status: S.status})
                }
            }
            if (R) {
                return 0
            }
            return d
        }
    };
    bh.pause = function (d) {
        for (var b = 0; b < ab.length; b++) {
            if (ab[b].el.id == this.id && (!d || ab[b].anim == d)) {
                if (eve("raphael.anim.pause." + this.id, this, ab[b].anim) !== false) {
                    ab[b].paused = true
                }
            }
        }
        return this
    };
    bh.resume = function (d) {
        for (var b = 0; b < ab.length; b++) {
            if (ab[b].el.id == this.id && (!d || ab[b].anim == d)) {
                var g = ab[b];
                if (eve("raphael.anim.resume." + this.id, this, g.anim) !== false) {
                    delete g.paused;
                    this.status(g.anim, g.status)
                }
            }
        }
        return this
    };
    bh.stop = function (d) {
        for (var b = 0; b < ab.length; b++) {
            if (ab[b].el.id == this.id && (!d || ab[b].anim == d)) {
                if (eve("raphael.anim.stop." + this.id, this, ab[b].anim) !== false) {
                    ab.splice(b--, 1)
                }
            }
        }
        return this
    };
    function aa(d) {
        for (var b = 0; b < ab.length; b++) {
            if (ab[b].el.paper == d) {
                ab.splice(b--, 1)
            }
        }
    }

    eve.on("raphael.remove", aa);
    eve.on("raphael.clear", aa);
    bh.toString = function () {
        return"Rapha\xebl\u2019s object"
    };
    var al = function (b) {
        this.items = [];
        this.length = 0;
        this.type = "set";
        if (b) {
            for (var d = 0, g = b.length; d < g; d++) {
                if (b[d] && (b[d].constructor == bh.constructor || b[d].constructor == al)) {
                    this[this.items.length] = this.items[this.items.length] = b[d];
                    this.length++
                }
            }
        }
    }, bc = al.prototype;
    bc.push = function () {
        var E, b;
        for (var d = 0, g = arguments.length; d < g; d++) {
            E = arguments[d];
            if (E && (E.constructor == bh.constructor || E.constructor == al)) {
                b = this.items.length;
                this[b] = this.items[b] = E;
                this.length++
            }
        }
        return this
    };
    bc.pop = function () {
        this.length && delete this[this.length--];
        return this.items.pop()
    };
    bc.forEach = function (E, b) {
        for (var d = 0, g = this.items.length; d < g; d++) {
            if (E.call(b, this.items[d], d) === false) {
                return this
            }
        }
        return this
    };
    for (var B in bh) {
        if (bh[ak](B)) {
            bc[B] = (function (b) {
                return function () {
                    var d = arguments;
                    return this.forEach(function (g) {
                        g[b][bG](g, d)
                    })
                }
            })(B)
        }
    }
    bc.attr = function (d, S) {
        if (d && aR.is(d, bd) && aR.is(d[0], "object")) {
            for (var b = 0, R = d.length; b < R; b++) {
                this.items[b].attr(d[b])
            }
        } else {
            for (var g = 0, E = this.items.length; g < E; g++) {
                this.items[g].attr(d, S)
            }
        }
        return this
    };
    bc.clear = function () {
        while (this.length) {
            this.pop()
        }
    };
    bc.splice = function (E, bL, bM) {
        E = E < 0 ? m(this.length + E, 0) : E;
        bL = m(0, bm(this.length - E, bL));
        var g = [], b = [], d = [], R;
        for (R = 2; R < arguments.length; R++) {
            d.push(arguments[R])
        }
        for (R = 0; R < bL; R++) {
            b.push(this[E + R])
        }
        for (; R < this.length - E; R++) {
            g.push(this[E + R])
        }
        var S = d.length;
        for (R = 0; R < S + g.length; R++) {
            this.items[E + R] = this[E + R] = R < S ? d[R] : g[R - S]
        }
        R = this.items.length = this.length -= bL - S;
        while (this[R]) {
            delete this[R++]
        }
        return new al(b)
    };
    bc.exclude = function (g) {
        for (var b = 0, d = this.length; b < d; b++) {
            if (this[b] == g) {
                this.splice(b, 1);
                return true
            }
        }
    };
    bc.animate = function (g, b, bL, bN) {
        (aR.is(bL, "function") || !bL) && (bN = bL || null);
        var S = this.items.length, E = S, bO, bM = this, R;
        if (!S) {
            return this
        }
        bN && (R = function () {
            !--S && bN.call(bM)
        });
        bL = aR.is(bL, aj) ? bL : R;
        var d = aR.animation(g, b, bL, R);
        bO = this.items[--E].animate(d);
        while (E--) {
            this.items[E] && !this.items[E].removed && this.items[E].animateWith(bO, d, d)
        }
        return this
    };
    bc.insertAfter = function (d) {
        var b = this.items.length;
        while (b--) {
            this.items[b].insertAfter(d)
        }
        return this
    };
    bc.getBBox = function () {
        var b = [], S = [], d = [], E = [];
        for (var g = this.items.length; g--;) {
            if (!this.items[g].removed) {
                var R = this.items[g].getBBox();
                b.push(R.x);
                S.push(R.y);
                d.push(R.x + R.width);
                E.push(R.y + R.height)
            }
        }
        b = bm[bG](0, b);
        S = bm[bG](0, S);
        d = m[bG](0, d);
        E = m[bG](0, E);
        return{x: b, y: S, x2: d, y2: E, width: d - b, height: E - S}
    };
    bc.clone = function (g) {
        g = new al;
        for (var b = 0, d = this.items.length; b < d; b++) {
            g.push(this.items[b].clone())
        }
        return g
    };
    bc.toString = function () {
        return"Rapha\xebl\u2018s set"
    };
    aR.registerFont = function (d) {
        if (!d.face) {
            return d
        }
        this.fonts = this.fonts || {};
        var i = {w: d.w, face: {}, glyphs: {}}, g = d.face["font-family"];
        for (var S in d.face) {
            if (d.face[ak](S)) {
                i.face[S] = d.face[S]
            }
        }
        if (this.fonts[g]) {
            this.fonts[g].push(i)
        } else {
            this.fonts[g] = [i]
        }
        if (!d.svg) {
            i.face["units-per-em"] = U(d.face["units-per-em"], 10);
            for (var E in d.glyphs) {
                if (d.glyphs[ak](E)) {
                    var R = d.glyphs[E];
                    i.glyphs[E] = {w: R.w, k: {}, d: R.d && "M" + R.d.replace(/[mlcxtrv]/g, function (bL) {
                        return{l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[bL] || "M"
                    }) + "z"};
                    if (R.k) {
                        for (var b in R.k) {
                            if (R[ak](b)) {
                                i.glyphs[E].k[b] = R.k[b]
                            }
                        }
                    }
                }
            }
        }
        return d
    };
    a4.getFont = function (bM, bN, d, E) {
        E = E || "normal";
        d = d || "normal";
        bN = +bN || {normal: 400, bold: 700, lighter: 300, bolder: 800}[bN] || 400;
        if (!aR.fonts) {
            return
        }
        var R = aR.fonts[bM];
        if (!R) {
            var g = new RegExp("(^|\\s)" + bM.replace(/[^\w\d\s+!~.:_-]/g, aX) + "(\\s|$)", "i");
            for (var b in aR.fonts) {
                if (aR.fonts[ak](b)) {
                    if (g.test(b)) {
                        R = aR.fonts[b];
                        break
                    }
                }
            }
        }
        var S;
        if (R) {
            for (var bL = 0, bO = R.length; bL < bO; bL++) {
                S = R[bL];
                if (S.face["font-weight"] == bN && (S.face["font-style"] == d || !S.face["font-style"]) && S.face["font-stretch"] == E) {
                    break
                }
            }
        }
        return S
    };
    a4.print = function (bL, S, b, bO, bP, bY, d) {
        bY = bY || "middle";
        d = m(bm(d || 0, 1), -1);
        var bX = bH(b)[F](aX), bU = 0, bW = 0, bS = aX, bZ;
        aR.is(bO, b) && (bO = this.getFont(bO));
        if (bO) {
            bZ = (bP || 16) / bO.face["units-per-em"];
            var E = bO.face.bbox[F](a), bN = +E[0], g = E[3] - E[1], R = 0, bQ = +E[1] + (bY == "baseline" ? g + (+bO.face.descent) : g / 2);
            for (var bT = 0, bM = bX.length; bT < bM; bT++) {
                if (bX[bT] == "\n") {
                    bU = 0;
                    bV = 0;
                    bW = 0;
                    R += g
                } else {
                    var bR = bW && bO.glyphs[bX[bT - 1]] || {}, bV = bO.glyphs[bX[bT]];
                    bU += bW ? (bR.w || bO.w) + (bR.k && bR.k[bX[bT]] || 0) + (bO.w * d) : 0;
                    bW = 1
                }
                if (bV && bV.d) {
                    bS += aR.transformPath(bV.d, ["t", bU * bZ, R * bZ, "s", bZ, bZ, bN, bQ, "t", (bL - bN) / bZ, (S - bQ) / bZ])
                }
            }
        }
        return this.path(bS).attr({fill: "#000", stroke: "none"})
    };
    a4.add = function (E) {
        if (aR.is(E, "array")) {
            var g = this.set(), d = 0, R = E.length, b;
            for (; d < R; d++) {
                b = E[d] || {};
                bw[ak](b.type) && g.push(this[b.type]().attr(b))
            }
        }
        return g
    };
    aR.format = function (d, g) {
        var b = aR.is(g, bd) ? [0][bE](g) : arguments;
        d && aR.is(d, aj) && b.length - 1 && (d = d.replace(br, function (R, E) {
            return b[++E] == null ? aX : b[E]
        }));
        return d || aX
    };
    aR.fullfill = (function () {
        var g = /\{([^\}]+)\}/g, b = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, d = function (R, E, S) {
            var i = S;
            E.replace(b, function (bN, bM, bL, bP, bO) {
                bM = bM || bP;
                if (i) {
                    if (bM in i) {
                        i = i[bM]
                    }
                    typeof i == "function" && bO && (i = i())
                }
            });
            i = (i == null || i == S ? R : i) + "";
            return i
        };
        return function (E, i) {
            return String(E).replace(g, function (S, R) {
                return d(S, R, i)
            })
        }
    })();
    aR.ninja = function () {
        s.was ? (aA.win.Raphael = s.is) : delete Raphael;
        return aR
    };
    aR.st = bc;
    (function (i, d, g) {
        if (i.readyState == null && i.addEventListener) {
            i.addEventListener(d, g = function () {
                i.removeEventListener(d, g, false);
                i.readyState = "complete"
            }, false);
            i.readyState = "loading"
        }
        function b() {
            (/in/).test(i.readyState) ? setTimeout(b, 9) : aR.eve("raphael.DOMload")
        }

        b()
    })(document, "DOMContentLoaded");
    s.was ? (aA.win.Raphael = aR) : (Raphael = aR);
    eve.on("raphael.DOMload", function () {
        ao = true
    })
})();
window.Raphael.svg && function (l) {
    var d = "hasOwnProperty", B = String, n = parseFloat, q = parseInt, f = Math, C = f.max, s = f.abs, h = f.pow, g = /[, ]+/, z = l.eve, r = "", j = " ";
    var o = "http://www.w3.org/1999/xlink", y = {block: "M5,0 0,2.5 5,5z", open_block: "M5,0 0,2.5 5,5z", classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z", diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z", open_diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z", open: "M6,1 1,3.5 6,6", oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z", open_oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"}, u = {};
    l.toString = function () {
        return"Your browser supports SVG.\nYou are running Rapha\xebl " + this.version
    };
    var i = function (F, D) {
        if (D) {
            if (typeof F == "string") {
                F = i(F)
            }
            for (var E in D) {
                if (D[d](E)) {
                    if (E.substring(0, 6) == "xlink:") {
                        F.setAttributeNS(o, E.substring(6), B(D[E]))
                    } else {
                        F.setAttribute(E, B(D[E]))
                    }
                }
            }
        } else {
            F = l._g.doc.createElementNS("http://www.w3.org/2000/svg", F);
            F.style && (F.style.webkitTapHighlightColor = "rgba(0,0,0,0)")
        }
        return F
    }, a = function (M, Q) {
        var O = "linear", E = M.id + Q, K = 0.5, I = 0.5, G = M.node, D = M.paper, S = G.style, F = l._g.doc.getElementById(E);
        if (!F) {
            Q = B(Q).replace(l._radial_gradient, function (V, T, W) {
                O = "radial";
                if (T && W) {
                    K = n(T);
                    I = n(W);
                    var U = ((I > 0.5) * 2 - 1);
                    h(K - 0.5, 2) + h(I - 0.5, 2) > 0.25 && (I = f.sqrt(0.25 - h(K - 0.5, 2)) * U + 0.5) && I != 0.5 && (I = I.toFixed(5) - 0.00001 * U)
                }
                return r
            });
            Q = Q.split(/\s*\-\s*/);
            if (O == "linear") {
                var J = Q.shift();
                J = -n(J);
                if (isNaN(J)) {
                    return null
                }
                var H = [0, 0, f.cos(l.rad(J)), f.sin(l.rad(J))], P = 1 / (C(s(H[2]), s(H[3])) || 1);
                H[2] *= P;
                H[3] *= P;
                if (H[2] < 0) {
                    H[0] = -H[2];
                    H[2] = 0
                }
                if (H[3] < 0) {
                    H[1] = -H[3];
                    H[3] = 0
                }
            }
            var N = l._parseDots(Q);
            if (!N) {
                return null
            }
            E = E.replace(/[\(\)\s,\xb0#]/g, "_");
            if (M.gradient && E != M.gradient.id) {
                D.defs.removeChild(M.gradient);
                delete M.gradient
            }
            if (!M.gradient) {
                F = i(O + "Gradient", {id: E});
                M.gradient = F;
                i(F, O == "radial" ? {fx: K, fy: I} : {x1: H[0], y1: H[1], x2: H[2], y2: H[3], gradientTransform: M.matrix.invert()});
                D.defs.appendChild(F);
                for (var L = 0, R = N.length; L < R; L++) {
                    F.appendChild(i("stop", {offset: N[L].offset ? N[L].offset : L ? "100%" : "0%", "stop-color": N[L].color || "#fff"}))
                }
            }
        }
        i(G, {fill: "url(#" + E + ")", opacity: 1, "fill-opacity": 1});
        S.fill = r;
        S.opacity = 1;
        S.fillOpacity = 1;
        return 1
    }, b = function (E) {
        var D = E.getBBox(1);
        i(E.pattern, {patternTransform: E.matrix.invert() + " translate(" + D.x + "," + D.y + ")"})
    }, c = function (O, Q, J) {
        if (O.type == "path") {
            var D = B(Q).toLowerCase().split("-"), N = O.paper, ac = J ? "end" : "start", S = O.node, P = O.attrs, I = P["stroke-width"], X = D.length, G = "classic", V, F, L, T, R, W = I / 2, K = 7, Y = 7, M = 5;
            while (X--) {
                switch (D[X]) {
                    case"block":
                    case"open_block":
                    case"classic":
                    case"oval":
                    case"open_oval":
                    case"diamond":
                    case"open_diamond":
                    case"open":
                    case"none":
                        G = D[X];
                        break;
                    case"wide":
                        Y = 10;
                        break;
                    case"narrow":
                        Y = 5;
                        break;
                    case"long":
                        K = 10;
                        break;
                    case"short":
                        K = 5;
                        break
                }
            }
            if (G == "open") {
                K += 2;
                Y += 2;
                M += 2;
                L = 1;
                T = J ? K - 2 : 1;
                R = {fill: "none", stroke: P.stroke, "stroke-dasharray": 0}
            } else {
                if (G == "open_block" || G == "open_diamond" || G == "open_oval") {
                    T = L = K / 2;
                    R = {fill: "white", "fill-opacity": 1, stroke: P.stroke, "stroke-dasharray": 0}
                } else {
                    T = L = K / 2;
                    R = {fill: P.stroke, stroke: "none"}
                }
            }
            if (O._.arrows) {
                if (J) {
                    O._.arrows.endPath && u[O._.arrows.endPath]--;
                    O._.arrows.endMarker && u[O._.arrows.endMarker]--
                } else {
                    O._.arrows.startPath && u[O._.arrows.startPath]--;
                    O._.arrows.startMarker && u[O._.arrows.startMarker]--
                }
            } else {
                O._.arrows = {}
            }
            if (G != "none") {
                var E = "raphael-marker-" + G, ab = "raphael-marker-" + ac + G + K + Y;
                if (!l._g.doc.getElementById(E)) {
                    N.defs.appendChild(i(i("path"), {"stroke-linecap": "round", d: y[G], id: E}));
                    u[E] = 1
                } else {
                    u[E]++
                }
                var H = l._g.doc.getElementById(ab), U;
                if (!H) {
                    H = i(i("marker"), {id: ab, markerHeight: Y, markerWidth: K, orient: "auto", refX: T, refY: Y / 2});
                    U = i(i("use"), {"xlink:href": "#" + E, transform: (J ? "rotate(180 " + K / 2 + " " + Y / 2 + ") " : r) + "scale(" + K / M + "," + Y / M + ")", "stroke-width": (1 / ((K / M + Y / M) / 2)).toFixed(4)});
                    H.appendChild(U);
                    N.defs.appendChild(H);
                    u[ab] = 1
                } else {
                    u[ab]++;
                    U = H.getElementsByTagName("use")[0]
                }
                i(U, R);
                var aa = L;
                if (J) {
                    V = O._.arrows.startdx * I || 0;
                    F = l.getTotalLength(P.path) - aa * I
                } else {
                    V = aa * I;
                    F = l.getTotalLength(P.path) - (O._.arrows.enddx * I || 0)
                }
                R = {};
                R["marker-" + ac] = "url(#" + ab + ")";
                if (F || V) {
                    R.d = Raphael.getSubpath(P.path, V, F)
                }
                i(S, R);
                O._.arrows[ac + "Path"] = E;
                O._.arrows[ac + "Marker"] = ab;
                O._.arrows[ac + "dx"] = aa;
                O._.arrows[ac + "Type"] = G;
                O._.arrows[ac + "String"] = Q
            } else {
                if (J) {
                    V = O._.arrows.startdx * I || 0;
                    F = l.getTotalLength(P.path) - V
                } else {
                    V = 0;
                    F = l.getTotalLength(P.path) - (O._.arrows.enddx * I || 0)
                }
                O._.arrows[ac + "Path"] && i(S, {d: Raphael.getSubpath(P.path, V, F)});
                delete O._.arrows[ac + "Path"];
                delete O._.arrows[ac + "Marker"];
                delete O._.arrows[ac + "dx"];
                delete O._.arrows[ac + "Type"];
                delete O._.arrows[ac + "String"]
            }
            for (R in u) {
                if (u[d](R) && !u[R]) {
                    var Z = l._g.doc.getElementById(R);
                    Z && Z.parentNode.removeChild(Z)
                }
            }
        }
    }, v = {"": [0], none: [0], "-": [3, 1], ".": [1, 1], "-.": [3, 1, 1, 1], "-..": [3, 1, 1, 1, 1, 1], ". ": [1, 3], "- ": [4, 3], "--": [8, 3], "- .": [4, 3, 1, 3], "--.": [8, 3, 1, 3], "--..": [8, 3, 1, 3, 1, 3]}, k = function (J, H, I) {
        H = v[B(H).toLowerCase()];
        if (H) {
            var F = J.attrs["stroke-width"] || "1", D = {round: F, square: F, butt: 0}[J.attrs["stroke-linecap"] || I["stroke-linecap"]] || 0, G = [], E = H.length;
            while (E--) {
                G[E] = H[E] * F + ((E % 2) ? 1 : -1) * D
            }
            i(J.node, {"stroke-dasharray": G.join(",")})
        }
    }, w = function (O, W) {
        var S = O.node, P = O.attrs, M = S.style.visibility;
        S.style.visibility = "hidden";
        for (var R in W) {
            if (W[d](R)) {
                if (!l._availableAttrs[d](R)) {
                    continue
                }
                var Q = W[R];
                P[R] = Q;
                switch (R) {
                    case"blur":
                        O.blur(Q);
                        break;
                    case"href":
                    case"title":
                    case"target":
                        var U = S.parentNode;
                        if (U.tagName.toLowerCase() != "a") {
                            var H = i("a");
                            U.insertBefore(H, S);
                            H.appendChild(S);
                            U = H
                        }
                        if (R == "target") {
                            U.setAttributeNS(o, "show", Q == "blank" ? "new" : Q)
                        } else {
                            U.setAttributeNS(o, R, Q)
                        }
                        break;
                    case"cursor":
                        S.style.cursor = Q;
                        break;
                    case"transform":
                        O.transform(Q);
                        break;
                    case"arrow-start":
                        c(O, Q);
                        break;
                    case"arrow-end":
                        c(O, Q, 1);
                        break;
                    case"clip-rect":
                        var E = B(Q).split(g);
                        if (E.length == 4) {
                            O.clip && O.clip.parentNode.parentNode.removeChild(O.clip.parentNode);
                            var F = i("clipPath"), T = i("rect");
                            F.id = l.createUUID();
                            i(T, {x: E[0], y: E[1], width: E[2], height: E[3]});
                            F.appendChild(T);
                            O.paper.defs.appendChild(F);
                            i(S, {"clip-path": "url(#" + F.id + ")"});
                            O.clip = T
                        }
                        if (!Q) {
                            var N = S.getAttribute("clip-path");
                            if (N) {
                                var V = l._g.doc.getElementById(N.replace(/(^url\(#|\)$)/g, r));
                                V && V.parentNode.removeChild(V);
                                i(S, {"clip-path": r});
                                delete O.clip
                            }
                        }
                        break;
                    case"path":
                        if (O.type == "path") {
                            i(S, {d: Q ? P.path = l._pathToAbsolute(Q) : "M0,0"});
                            O._.dirty = 1;
                            if (O._.arrows) {
                                "startString" in O._.arrows && c(O, O._.arrows.startString);
                                "endString" in O._.arrows && c(O, O._.arrows.endString, 1)
                            }
                        }
                        break;
                    case"width":
                        S.setAttribute(R, Q);
                        O._.dirty = 1;
                        if (P.fx) {
                            R = "x";
                            Q = P.x
                        } else {
                            break
                        }
                    case"x":
                        if (P.fx) {
                            Q = -P.x - (P.width || 0)
                        }
                    case"rx":
                        if (R == "rx" && O.type == "rect") {
                            break
                        }
                    case"cx":
                        S.setAttribute(R, Q);
                        O.pattern && b(O);
                        O._.dirty = 1;
                        break;
                    case"height":
                        S.setAttribute(R, Q);
                        O._.dirty = 1;
                        if (P.fy) {
                            R = "y";
                            Q = P.y
                        } else {
                            break
                        }
                    case"y":
                        if (P.fy) {
                            Q = -P.y - (P.height || 0)
                        }
                    case"ry":
                        if (R == "ry" && O.type == "rect") {
                            break
                        }
                    case"cy":
                        S.setAttribute(R, Q);
                        O.pattern && b(O);
                        O._.dirty = 1;
                        break;
                    case"r":
                        if (O.type == "rect") {
                            i(S, {rx: Q, ry: Q})
                        } else {
                            S.setAttribute(R, Q)
                        }
                        O._.dirty = 1;
                        break;
                    case"src":
                        if (O.type == "image") {
                            S.setAttributeNS(o, "href", Q)
                        }
                        break;
                    case"stroke-width":
                        if (O._.sx != 1 || O._.sy != 1) {
                            Q /= C(s(O._.sx), s(O._.sy)) || 1
                        }
                        if (O.paper._vbSize) {
                            Q *= O.paper._vbSize
                        }
                        S.setAttribute(R, Q);
                        if (P["stroke-dasharray"]) {
                            k(O, P["stroke-dasharray"], W)
                        }
                        if (O._.arrows) {
                            "startString" in O._.arrows && c(O, O._.arrows.startString);
                            "endString" in O._.arrows && c(O, O._.arrows.endString, 1)
                        }
                        break;
                    case"stroke-dasharray":
                        k(O, Q, W);
                        break;
                    case"fill":
                        var I = B(Q).match(l._ISURL);
                        if (I) {
                            F = i("pattern");
                            var L = i("image");
                            F.id = l.createUUID();
                            i(F, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1});
                            i(L, {x: 0, y: 0, "xlink:href": I[1]});
                            F.appendChild(L);
                            (function (X) {
                                l._preload(I[1], function () {
                                    var Y = this.offsetWidth, Z = this.offsetHeight;
                                    i(X, {width: Y, height: Z});
                                    i(L, {width: Y, height: Z});
                                    O.paper.safari()
                                })
                            })(F);
                            O.paper.defs.appendChild(F);
                            i(S, {fill: "url(#" + F.id + ")"});
                            O.pattern = F;
                            O.pattern && b(O);
                            break
                        }
                        var G = l.getRGB(Q);
                        if (!G.error) {
                            delete W.gradient;
                            delete P.gradient;
                            !l.is(P.opacity, "undefined") && l.is(W.opacity, "undefined") && i(S, {opacity: P.opacity});
                            !l.is(P["fill-opacity"], "undefined") && l.is(W["fill-opacity"], "undefined") && i(S, {"fill-opacity": P["fill-opacity"]})
                        } else {
                            if ((O.type == "circle" || O.type == "ellipse" || B(Q).charAt() != "r") && a(O, Q)) {
                                if ("opacity" in P || "fill-opacity" in P) {
                                    var D = l._g.doc.getElementById(S.getAttribute("fill").replace(/^url\(#|\)$/g, r));
                                    if (D) {
                                        var J = D.getElementsByTagName("stop");
                                        i(J[J.length - 1], {"stop-opacity": ("opacity" in P ? P.opacity : 1) * ("fill-opacity" in P ? P["fill-opacity"] : 1)})
                                    }
                                }
                                P.gradient = Q;
                                P.fill = "none";
                                break
                            }
                        }
                        G[d]("opacity") && i(S, {"fill-opacity": G.opacity > 1 ? G.opacity / 100 : G.opacity});
                    case"stroke":
                        G = l.getRGB(Q);
                        S.setAttribute(R, G.hex);
                        R == "stroke" && G[d]("opacity") && i(S, {"stroke-opacity": G.opacity > 1 ? G.opacity / 100 : G.opacity});
                        if (R == "stroke" && O._.arrows) {
                            "startString" in O._.arrows && c(O, O._.arrows.startString);
                            "endString" in O._.arrows && c(O, O._.arrows.endString, 1)
                        }
                        break;
                    case"gradient":
                        (O.type == "circle" || O.type == "ellipse" || B(Q).charAt() != "r") && a(O, Q);
                        break;
                    case"opacity":
                        if (P.gradient && !P[d]("stroke-opacity")) {
                            i(S, {"stroke-opacity": Q > 1 ? Q / 100 : Q})
                        }
                    case"fill-opacity":
                        if (P.gradient) {
                            D = l._g.doc.getElementById(S.getAttribute("fill").replace(/^url\(#|\)$/g, r));
                            if (D) {
                                J = D.getElementsByTagName("stop");
                                i(J[J.length - 1], {"stop-opacity": Q})
                            }
                            break
                        }
                    case"shape-rendering":
                        S.setAttribute(R, Q);
                        break;
                    default:
                        R == "font-size" && (Q = q(Q, 10) + "px");
                        var K = R.replace(/(\-.)/g, function (X) {
                            return X.substring(1).toUpperCase()
                        });
                        S.style[K] = Q;
                        O._.dirty = 1;
                        S.setAttribute(R, Q);
                        break
                }
            }
        }
        p(O, W);
        S.style.visibility = M
    }, A = 1.2, p = function (D, H) {
        if (D.type != "text" || !(H[d]("text") || H[d]("font") || H[d]("font-size") || H[d]("x") || H[d]("y"))) {
            return
        }
        var M = D.attrs, F = D.node, O = F.firstChild ? q(l._g.doc.defaultView.getComputedStyle(F.firstChild, r).getPropertyValue("font-size"), 10) : 10;
        if (H[d]("text")) {
            M.text = H.text;
            while (F.firstChild) {
                F.removeChild(F.firstChild)
            }
            var G = B(H.text).split("\n"), E = [], K;
            for (var I = 0, N = G.length; I < N; I++) {
                K = i("tspan");
                I && i(K, {dy: O * A, x: M.x});
                K.appendChild(l._g.doc.createTextNode(G[I]));
                F.appendChild(K);
                E[I] = K
            }
        } else {
            E = F.getElementsByTagName("tspan");
            for (I = 0, N = E.length; I < N; I++) {
                if (I) {
                    i(E[I], {dy: O * A, x: M.x})
                } else {
                    i(E[0], {dy: 0})
                }
            }
        }
        i(F, {x: M.x, y: M.y});
        D._.dirty = 1;
        var J = D._getBBox(), L = M.y - (J.y + J.height / 2);
        L && l.is(L, "finite") && i(E[0], {dy: L})
    }, t = function (E, D) {
        var G = 0, F = 0;
        this[0] = this.node = E;
        E.raphael = true;
        this.id = l._oid++;
        E.raphaelid = this.id;
        this.matrix = l.matrix();
        this.realPath = null;
        this.paper = D;
        this.attrs = this.attrs || {};
        this._ = {transform: [], sx: 1, sy: 1, deg: 0, dx: 0, dy: 0, dirty: 1};
        !D.bottom && (D.bottom = this);
        this.prev = D.top;
        D.top && (D.top.next = this);
        D.top = this;
        this.next = null
    }, m = l.el;
    t.prototype = m;
    m.constructor = t;
    l._engine.path = function (D, G) {
        var E = i("path");
        G.canvas && G.canvas.appendChild(E);
        var F = new t(E, G);
        F.type = "path";
        w(F, {fill: "none", stroke: "#000", path: D});
        return F
    };
    m.rotate = function (E, D, G) {
        if (this.removed) {
            return this
        }
        E = B(E).split(g);
        if (E.length - 1) {
            D = n(E[1]);
            G = n(E[2])
        }
        E = n(E[0]);
        (G == null) && (D = G);
        if (D == null || G == null) {
            var F = this.getBBox(1);
            D = F.x + F.width / 2;
            G = F.y + F.height / 2
        }
        this.transform(this._.transform.concat([
            ["r", E, D, G]
        ]));
        return this
    };
    m.scale = function (H, F, D, G) {
        if (this.removed) {
            return this
        }
        H = B(H).split(g);
        if (H.length - 1) {
            F = n(H[1]);
            D = n(H[2]);
            G = n(H[3])
        }
        H = n(H[0]);
        (F == null) && (F = H);
        (G == null) && (D = G);
        if (D == null || G == null) {
            var E = this.getBBox(1)
        }
        D = D == null ? E.x + E.width / 2 : D;
        G = G == null ? E.y + E.height / 2 : G;
        this.transform(this._.transform.concat([
            ["s", H, F, D, G]
        ]));
        return this
    };
    m.translate = function (E, D) {
        if (this.removed) {
            return this
        }
        E = B(E).split(g);
        if (E.length - 1) {
            D = n(E[1])
        }
        E = n(E[0]) || 0;
        D = +D || 0;
        this.transform(this._.transform.concat([
            ["t", E, D]
        ]));
        return this
    };
    m.transform = function (E) {
        var F = this._;
        if (E == null) {
            return F.transform
        }
        l._extractTransform(this, E);
        this.clip && i(this.clip, {transform: this.matrix.invert()});
        this.pattern && b(this);
        this.node && i(this.node, {transform: this.matrix});
        if (F.sx != 1 || F.sy != 1) {
            var D = this.attrs[d]("stroke-width") ? this.attrs["stroke-width"] : 1;
            this.attr({"stroke-width": D})
        }
        return this
    };
    m.hide = function () {
        !this.removed && this.paper.safari(this.node.style.display = "none");
        return this
    };
    m.show = function () {
        !this.removed && this.paper.safari(this.node.style.display = "");
        return this
    };
    m.remove = function () {
        if (this.removed || !this.node.parentNode) {
            return
        }
        var E = this.paper;
        E.__set__ && E.__set__.exclude(this);
        z.unbind("raphael.*.*." + this.id);
        if (this.gradient) {
            E.defs.removeChild(this.gradient)
        }
        l._tear(this, E);
        if (this.node.parentNode.tagName.toLowerCase() == "a") {
            this.node.parentNode.parentNode.removeChild(this.node.parentNode)
        } else {
            this.node.parentNode.removeChild(this.node)
        }
        for (var D in this) {
            this[D] = typeof this[D] == "function" ? l._removedFactory(D) : null
        }
        this.removed = true
    };
    m._getBBox = function () {
        if (this.node.style.display == "none") {
            this.show();
            var D = true
        }
        var F = {};
        try {
            F = this.node.getBBox()
        } catch (E) {
        } finally {
            F = F || {}
        }
        D && this.hide();
        return F
    };
    m.attr = function (D, M) {
        if (this.removed) {
            return this
        }
        if (D == null) {
            var J = {};
            for (var L in this.attrs) {
                if (this.attrs[d](L)) {
                    J[L] = this.attrs[L]
                }
            }
            J.gradient && J.fill == "none" && (J.fill = J.gradient) && delete J.gradient;
            J.transform = this._.transform;
            return J
        }
        if (M == null && l.is(D, "string")) {
            if (D == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient
            }
            if (D == "transform") {
                return this._.transform
            }
            var K = D.split(g), G = {};
            for (var H = 0, O = K.length; H < O; H++) {
                D = K[H];
                if (D in this.attrs) {
                    G[D] = this.attrs[D]
                } else {
                    if (l.is(this.paper.customAttributes[D], "function")) {
                        G[D] = this.paper.customAttributes[D].def
                    } else {
                        G[D] = l._availableAttrs[D]
                    }
                }
            }
            return O - 1 ? G : G[K[0]]
        }
        if (M == null && l.is(D, "array")) {
            G = {};
            for (H = 0, O = D.length; H < O; H++) {
                G[D[H]] = this.attr(D[H])
            }
            return G
        }
        if (M != null) {
            var E = {};
            E[D] = M
        } else {
            if (D != null && l.is(D, "object")) {
                E = D
            }
        }
        for (var N in E) {
            z("raphael.attr." + N + "." + this.id, this, E[N])
        }
        for (N in this.paper.customAttributes) {
            if (this.paper.customAttributes[d](N) && E[d](N) && l.is(this.paper.customAttributes[N], "function")) {
                var I = this.paper.customAttributes[N].apply(this, [].concat(E[N]));
                this.attrs[N] = E[N];
                for (var F in I) {
                    if (I[d](F)) {
                        E[F] = I[F]
                    }
                }
            }
        }
        w(this, E);
        return this
    };
    m.toFront = function () {
        if (this.removed) {
            return this
        }
        if (this.node.parentNode.tagName.toLowerCase() == "a") {
            this.node.parentNode.parentNode.appendChild(this.node.parentNode)
        } else {
            this.node.parentNode.appendChild(this.node)
        }
        var D = this.paper;
        D.top != this && l._tofront(this, D);
        return this
    };
    m.toBack = function () {
        if (this.removed) {
            return this
        }
        var E = this.node.parentNode;
        if (E.tagName.toLowerCase() == "a") {
            E.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild)
        } else {
            if (E.firstChild != this.node) {
                E.insertBefore(this.node, this.node.parentNode.firstChild)
            }
        }
        l._toback(this, this.paper);
        var D = this.paper;
        return this
    };
    m.appendChild = function (D) {
        if (this.removed) {
            return this
        }
        if (this.type !== "group") {
            throw new TypeError("appendChild function supports only the group type!")
        }
        var E = D.node || D[D.length - 1].node;
        this.node.appendChild(E);
        return this
    };
    m.insertAfter = function (D) {
        if (this.removed) {
            return this
        }
        var E = D.node || D[D.length - 1].node;
        if (E.nextSibling) {
            E.parentNode.insertBefore(this.node, E.nextSibling)
        } else {
            E.parentNode.appendChild(this.node)
        }
        l._insertafter(this, D, this.paper);
        return this
    };
    m.insertBefore = function (D) {
        if (this.removed) {
            return this
        }
        var E = D.node || D[0].node;
        E.parentNode.insertBefore(this.node, E);
        l._insertbefore(this, D, this.paper);
        return this
    };
    m.blur = function (E) {
        var D = this;
        if (+E !== 0) {
            var F = i("filter"), G = i("feGaussianBlur");
            D.attrs.blur = E;
            F.id = l.createUUID();
            i(G, {stdDeviation: +E || 1.5});
            F.appendChild(G);
            D.paper.defs.appendChild(F);
            D._blur = F;
            i(D.node, {filter: "url(#" + F.id + ")"})
        } else {
            if (D._blur) {
                D._blur.parentNode.removeChild(D._blur);
                delete D._blur;
                delete D.attrs.blur
            }
            D.node.removeAttribute("filter")
        }
    };
    l._engine.group = function (E, D, H) {
        var G = i("g");
        if (D && H) {
            G.setAttributeNS(null, "transform", "translate(" + D + ", " + H + ")")
        }
        E.canvas && E.canvas.appendChild(G);
        var F = new t(G, E);
        F.attrs = {x: D, y: H, fill: "none", stroke: "#000"};
        F.type = "group";
        i(G, F.attrs);
        return F
    };
    l._engine.circle = function (E, D, I, H) {
        var G = i("circle");
        E.canvas && E.canvas.appendChild(G);
        var F = new t(G, E);
        F.attrs = {cx: D, cy: I, r: H, fill: "none", stroke: "#000"};
        F.type = "circle";
        i(G, F.attrs);
        return F
    };
    l._engine.rect = function (F, D, K, E, I, J) {
        var H = i("rect");
        F.canvas && F.canvas.appendChild(H);
        var G = new t(H, F);
        G.attrs = {x: D, y: K, width: E, height: I, r: J || 0, rx: J || 0, ry: J || 0, fill: "none", stroke: "#000"};
        G.type = "rect";
        i(H, G.attrs);
        return G
    };
    l._engine.ellipse = function (E, D, J, I, H) {
        var G = i("ellipse");
        E.canvas && E.canvas.appendChild(G);
        var F = new t(G, E);
        F.attrs = {cx: D, cy: J, rx: I, ry: H, fill: "none", stroke: "#000"};
        F.type = "ellipse";
        i(G, F.attrs);
        return F
    };
    l._engine.image = function (F, J, D, K, E, I) {
        var H = i("image");
        i(H, {x: D, y: K, width: E, height: I, preserveAspectRatio: "none"});
        H.setAttributeNS(o, "href", J);
        F.canvas && F.canvas.appendChild(H);
        var G = new t(H, F);
        G.attrs = {x: D, y: K, width: E, height: I, src: J};
        G.type = "image";
        return G
    };
    l._engine.text = function (E, D, I, H) {
        var G = i("text");
        E.canvas && E.canvas.appendChild(G);
        var F = new t(G, E);
        F.attrs = {x: D, y: I, "text-anchor": "middle", text: H, font: l._availableAttrs.font, stroke: "none", fill: "#000"};
        F.type = "text";
        w(F, F.attrs);
        return F
    };
    l._engine.foreignObject = function (H, K, J, L, G, F) {
        if ((typeof L) !== "number") {
            F = L;
            L = F.offsetWidth;
            G = F.offsetHeight
        }
        var I;
        if ((/msie 9/).test(navigator.userAgent.toLowerCase()) || document.documentMode === 9) {
            var E = i("div");
            E.style.cssText = ["position:absolute", "left:" + (K - L / 2) + "px", "top:" + (J - G / 2) + "px", "width:" + L + "px", "height:" + G + "px"].join(";") + ";";
            H.canvas && H.canvas.appendChild(E);
            I = new t(E, H);
            I.attrs = {x: K, y: J, width: L, height: G};
            I.type = "foreignObject";
            i(E, I.attrs);
            if (F) {
                var D = document.createElement("div");
                D.innerHTML = F;
                I.node.appendChild(D)
            }
        } else {
            var E = i("foreignObject");
            H.canvas && H.canvas.appendChild(E);
            I = new t(E, H);
            I.attrs = {x: K, y: J, width: L, height: G};
            I.type = "foreignObject";
            i(E, I.attrs);
            if (F) {
                var D = document.createElement("div");
                D.innerHTML = F;
                I.node.appendChild(D)
            }
        }
        return I
    };
    l._engine.setSize = function (E, D) {
        this.width = E || this.width;
        this.height = D || this.height;
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);
        if (this._viewBox) {
            this.setViewBox.apply(this, this._viewBox)
        }
        return this
    };
    l._engine.create = function () {
        var G = l._getContainer.apply(0, arguments), E = G && G.container, K = G.x, J = G.y, F = G.width, L = G.height;
        if (!E) {
            throw new Error("SVG container not found.")
        }
        var D = i("svg"), I = "overflow:hidden;", H;
        K = K || 0;
        J = J || 0;
        F = F || 512;
        L = L || 342;
        i(D, {height: L, version: 1.1, width: F, xmlns: "http://www.w3.org/2000/svg"});
        if (E == 1) {
            D.style.cssText = I + "position:absolute;left:" + K + "px;top:" + J + "px";
            l._g.doc.body.appendChild(D);
            H = 1
        } else {
            D.style.cssText = I + "position:relative";
            if (E.firstChild) {
                E.insertBefore(D, E.firstChild)
            } else {
                E.appendChild(D)
            }
        }
        E = new l._Paper;
        E.width = F;
        E.height = L;
        E.canvas = D;
        E.clear();
        E._left = E._top = 0;
        H && (E.renderfix = function () {
        });
        E.renderfix();
        return E
    };
    l._engine.setViewBox = function (I, G, K, D, E) {
        z("raphael.setViewBox", this, this._viewBox, [I, G, K, D, E]);
        var M = C(K / this.width, D / this.height), H = this.top, L = E ? "meet" : "xMinYMin", F, J;
        if (I == null) {
            if (this._vbSize) {
                M = 1
            }
            delete this._vbSize;
            F = "0 0 " + this.width + j + this.height
        } else {
            this._vbSize = M;
            F = I + j + G + j + K + j + D
        }
        i(this.canvas, {viewBox: F, preserveAspectRatio: L});
        while (M && H) {
            J = "stroke-width" in H.attrs ? H.attrs["stroke-width"] : 1;
            H.attr({"stroke-width": J});
            H._.dirty = 1;
            H._.dirtyT = 1;
            H = H.prev
        }
        this._viewBox = [I, G, K, D, !!E];
        return this
    };
    l.prototype.renderfix = function () {
        var I = this.canvas, D = I.style, H;
        try {
            H = I.getScreenCTM() || I.createSVGMatrix()
        } catch (G) {
            H = I.createSVGMatrix()
        }
        var F = -H.e % 1, E = -H.f % 1;
        if (F || E) {
            if (F) {
                this._left = (this._left + F) % 1;
                D.left = this._left + "px"
            }
            if (E) {
                this._top = (this._top + E) % 1;
                D.top = this._top + "px"
            }
        }
    };
    l.prototype.clear = function () {
        l.eve("raphael.clear", this);
        var D = this.canvas;
        while (D.firstChild) {
            D.removeChild(D.firstChild)
        }
        this.bottom = this.top = null;
        (this.desc = i("desc")).appendChild(l._g.doc.createTextNode("Created with Rapha\xebl " + l.version));
        D.appendChild(this.desc);
        D.appendChild(this.defs = i("defs"))
    };
    l.prototype.remove = function () {
        z("raphael.remove", this);
        this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
        for (var D in this) {
            this[D] = typeof this[D] == "function" ? l._removedFactory(D) : null
        }
    };
    var x = l.st;
    for (var e in m) {
        if (m[d](e) && !x[d](e)) {
            x[e] = (function (D) {
                return function () {
                    var E = arguments;
                    return this.forEach(function (F) {
                        F[D].apply(F, E)
                    })
                }
            })(e)
        }
    }
}(window.Raphael);
window.Raphael.vml && function (l) {
    var e = "hasOwnProperty", F = String, n = parseFloat, h = Math, B = h.round, I = h.max, C = h.min, s = h.abs, v = "fill", i = /[, ]+/, A = l.eve, w = " progid:DXImageTransform.Microsoft", k = " ", q = "", D = {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"}, j = /([clmz]),?([^clmz]*)/gi, t = / progid:\S+Blur\([^\)]+\)/g, H = /-?[^,\s-]+/g, d = "position:absolute;left:0;top:0;width:1px;height:1px", b = 21600, z = {path: 1, rect: 1, image: 1}, r = {circle: 1, ellipse: 1}, f = function (S) {
        var P = /[ahqstv]/ig, K = l._pathToAbsolute;
        F(S).match(P) && (K = l._path2curve);
        P = /[clmz]/g;
        if (K == l._pathToAbsolute && !F(S).match(P)) {
            var O = F(S).replace(j, function (W, Y, U) {
                var X = [], T = Y.toLowerCase() == "m", V = D[Y];
                U.replace(H, function (Z) {
                    if (T && X.length == 2) {
                        V += X + D[Y == "m" ? "l" : "L"];
                        X = []
                    }
                    X.push(B(Z * b))
                });
                return V + X
            });
            return O
        }
        var Q = K(S), J, E;
        O = [];
        for (var M = 0, R = Q.length; M < R; M++) {
            J = Q[M];
            E = Q[M][0].toLowerCase();
            E == "z" && (E = "x");
            for (var L = 1, N = J.length; L < N; L++) {
                E += B(J[L] * b) + (L != N - 1 ? "," : q)
            }
            O.push(E)
        }
        return O.join(k)
    }, o = function (L, K, J) {
        var E = l.matrix();
        E.rotate(-L, 0.5, 0.5);
        return{dx: E.x(K, J), dy: E.y(K, J)}
    }, p = function (R, Q, P, M, L, N) {
        var Z = R._, T = R.matrix, E = Z.fillpos, S = R.node, O = S.style, K = 1, J = "", V, X = b / Q, W = b / P;
        O.visibility = "hidden";
        if (!Q || !P) {
            return
        }
        S.coordsize = s(X) + k + s(W);
        O.rotation = N * (Q * P < 0 ? -1 : 1);
        if (N) {
            var Y = o(N, M, L);
            M = Y.dx;
            L = Y.dy
        }
        Q < 0 && (J += "x");
        P < 0 && (J += " y") && (K = -1);
        O.flip = J;
        S.coordorigin = (M * -X) + k + (L * -W);
        if (E || Z.fillsize) {
            var U = S.getElementsByTagName(v);
            U = U && U[0];
            S.removeChild(U);
            if (E) {
                Y = o(N, T.x(E[0], E[1]), T.y(E[0], E[1]));
                U.position = Y.dx * K + k + Y.dy * K
            }
            if (Z.fillsize) {
                U.size = Z.fillsize[0] * s(Q) + k + Z.fillsize[1] * s(P)
            }
            S.appendChild(U)
        }
        O.visibility = "visible"
    };
    l.toString = function () {
        return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version
    };
    var c = function (E, O, J) {
        var Q = F(O).toLowerCase().split("-"), M = J ? "end" : "start", K = Q.length, N = "classic", P = "medium", L = "medium";
        while (K--) {
            switch (Q[K]) {
                case"block":
                case"classic":
                case"oval":
                case"diamond":
                case"open":
                case"none":
                    N = Q[K];
                    break;
                case"open_block":
                    N = "block";
                    break;
                case"open_oval":
                    N = "oval";
                    break;
                case"open_diamond":
                    N = "diamond";
                    break;
                case"wide":
                case"narrow":
                    L = Q[K];
                    break;
                case"long":
                case"short":
                    P = Q[K];
                    break
            }
        }
        var R = E.node.getElementsByTagName("stroke")[0];
        R[M + "arrow"] = N;
        R[M + "arrowlength"] = P;
        R[M + "arrowwidth"] = L
    }, x = function (Z, aj) {
        Z.attrs = Z.attrs || {};
        var ae = Z.node, an = Z.attrs, V = ae.style, R, ah = z[Z.type] && (aj.x != an.x || aj.y != an.y || aj.width != an.width || aj.height != an.height || aj.cx != an.cx || aj.cy != an.cy || aj.rx != an.rx || aj.ry != an.ry || aj.r != an.r), Y = r[Z.type] && (an.cx != aj.cx || an.cy != aj.cy || an.r != aj.r || an.rx != aj.rx || an.ry != aj.ry), aq = Z;
        for (var W in aj) {
            if (aj[e](W)) {
                an[W] = aj[W]
            }
        }
        if (ah) {
            an.path = l._getPath[Z.type](Z);
            Z._.dirty = 1
        }
        aj.href && (ae.href = aj.href);
        aj.title && (ae.title = aj.title);
        aj.target && (ae.target = aj.target);
        aj.cursor && (V.cursor = aj.cursor);
        "blur" in aj && Z.blur(aj.blur);
        if (aj.path && Z.type == "path" || ah) {
            ae.path = f(~F(an.path).toLowerCase().indexOf("r") ? l._pathToAbsolute(an.path) : an.path);
            if (Z.type == "image") {
                Z._.fillpos = [an.x, an.y];
                Z._.fillsize = [an.width, an.height];
                p(Z, 1, 1, 0, 0, 0)
            }
        }
        "transform" in aj && Z.transform(aj.transform);
        if (Y) {
            var M = +an.cx, K = +an.cy, Q = +an.rx || +an.r || 0, P = +an.ry || +an.r || 0;
            ae.path = l.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", B((M - Q) * b), B((K - P) * b), B((M + Q) * b), B((K + P) * b), B(M * b))
        }
        if ("clip-rect" in aj) {
            var J = F(aj["clip-rect"]).split(i);
            if (J.length == 4) {
                J[2] = +J[2] + (+J[0]);
                J[3] = +J[3] + (+J[1]);
                var X = ae.clipRect || l._g.doc.createElement("div"), ap = X.style;
                ap.clip = l.format("rect({1}px {2}px {3}px {0}px)", J);
                if (!ae.clipRect) {
                    ap.position = "absolute";
                    ap.top = 0;
                    ap.left = 0;
                    ap.width = Z.paper.width + "px";
                    ap.height = Z.paper.height + "px";
                    ae.parentNode.insertBefore(X, ae);
                    X.appendChild(ae);
                    ae.clipRect = X
                }
            }
            if (!aj["clip-rect"]) {
                ae.clipRect && (ae.clipRect.style.clip = "auto")
            }
        }
        if (Z.textpath) {
            var al = Z.textpath.style;
            aj.font && (al.font = aj.font);
            aj["font-family"] && (al.fontFamily = '"' + aj["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, q) + '"');
            aj["font-size"] && (al.fontSize = aj["font-size"]);
            aj["font-weight"] && (al.fontWeight = aj["font-weight"]);
            aj["font-style"] && (al.fontStyle = aj["font-style"])
        }
        if ("arrow-start" in aj) {
            c(aq, aj["arrow-start"])
        }
        if ("arrow-end" in aj) {
            c(aq, aj["arrow-end"], 1)
        }
        if (aj.opacity != null || aj["stroke-width"] != null || aj.fill != null || aj.src != null || aj.stroke != null || aj["stroke-width"] != null || aj["stroke-opacity"] != null || aj["fill-opacity"] != null || aj["stroke-dasharray"] != null || aj["stroke-miterlimit"] != null || aj["stroke-linejoin"] != null || aj["stroke-linecap"] != null) {
            var af = ae.getElementsByTagName(v), am = false;
            af = af && af[0];
            !af && (am = af = G(v));
            if (Z.type == "image" && aj.src) {
                af.src = aj.src
            }
            aj.fill && (af.on = true);
            if (af.on == null || aj.fill == "none" || aj.fill === null) {
                af.on = false
            }
            if (af.on && aj.fill) {
                var O = F(aj.fill).match(l._ISURL);
                if (O) {
                    af.parentNode == ae && ae.removeChild(af);
                    af.rotate = true;
                    af.src = O[1];
                    af.type = "tile";
                    var E = Z.getBBox(1);
                    af.position = E.x + k + E.y;
                    Z._.fillpos = [E.x, E.y];
                    l._preload(O[1], function () {
                        Z._.fillsize = [this.offsetWidth, this.offsetHeight]
                    })
                } else {
                    af.color = l.getRGB(aj.fill).hex;
                    af.src = q;
                    af.type = "solid";
                    if (l.getRGB(aj.fill).error && (aq.type in {circle: 1, ellipse: 1} || F(aj.fill).charAt() != "r") && a(aq, aj.fill, af)) {
                        an.fill = "none";
                        an.gradient = aj.fill;
                        af.rotate = false
                    }
                }
            }
            if ("fill-opacity" in aj || "opacity" in aj) {
                var N = ((+an["fill-opacity"] + 1 || 2) - 1) * ((+an.opacity + 1 || 2) - 1) * ((+l.getRGB(aj.fill).o + 1 || 2) - 1);
                N = C(I(N, 0), 1);
                af.opacity = N;
                if (af.src) {
                    af.color = "none"
                }
            }
            ae.appendChild(af);
            var S = (ae.getElementsByTagName("stroke") && ae.getElementsByTagName("stroke")[0]), ao = false;
            !S && (ao = S = G("stroke"));
            if ((aj.stroke && aj.stroke != "none") || aj["stroke-width"] || aj["stroke-opacity"] != null || aj["stroke-dasharray"] || aj["stroke-miterlimit"] || aj["stroke-linejoin"] || aj["stroke-linecap"]) {
                S.on = true
            }
            (aj.stroke == "none" || aj.stroke === null || S.on == null || aj.stroke == 0 || aj["stroke-width"] == 0) && (S.on = false);
            var ad = l.getRGB(aj.stroke);
            S.on && aj.stroke && (S.color = ad.hex);
            N = ((+an["stroke-opacity"] + 1 || 2) - 1) * ((+an.opacity + 1 || 2) - 1) * ((+ad.o + 1 || 2) - 1);
            var aa = (n(aj["stroke-width"]) || 1) * 0.75;
            N = C(I(N, 0), 1);
            aj["stroke-width"] == null && (aa = an["stroke-width"]);
            aj["stroke-width"] && (S.weight = aa);
            aa && aa < 1 && (N *= aa) && (S.weight = 1);
            S.opacity = N;
            aj["stroke-linejoin"] && (S.joinstyle = aj["stroke-linejoin"] || "miter");
            S.miterlimit = aj["stroke-miterlimit"] || 8;
            aj["stroke-linecap"] && (S.endcap = aj["stroke-linecap"] == "butt" ? "flat" : aj["stroke-linecap"] == "square" ? "square" : "round");
            if (aj["stroke-dasharray"]) {
                var ac = {"-": "shortdash", ".": "shortdot", "-.": "shortdashdot", "-..": "shortdashdotdot", ". ": "dot", "- ": "dash", "--": "longdash", "- .": "dashdot", "--.": "longdashdot", "--..": "longdashdotdot"};
                S.dashstyle = ac[e](aj["stroke-dasharray"]) ? ac[aj["stroke-dasharray"]] : q
            }
            ao && ae.appendChild(S)
        }
        if (aq.type == "text") {
            aq.paper.canvas.style.display = q;
            var ag = aq.paper.span, ab = 100, L = an.font && an.font.match(/\d+(?:\.\d*)?(?=px)/);
            V = ag.style;
            an.font && (V.font = an.font);
            an["font-family"] && (V.fontFamily = an["font-family"]);
            an["font-weight"] && (V.fontWeight = an["font-weight"]);
            an["font-style"] && (V.fontStyle = an["font-style"]);
            L = n(an["font-size"] || L && L[0]) || 10;
            V.fontSize = L * ab + "px";
            aq.textpath.string && (ag.innerHTML = F(aq.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
            var U = ag.getBoundingClientRect();
            aq.W = an.w = (U.right - U.left) / ab;
            aq.H = an.h = (U.bottom - U.top) / ab;
            aq.X = an.x;
            aq.Y = an.y + aq.H / 2;
            ("x" in aj || "y" in aj) && (aq.path.v = l.format("m{0},{1}l{2},{1}", B(an.x * b), B(an.y * b), B(an.x * b) + 1));
            var T = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
            for (var ai = 0, ak = T.length; ai < ak; ai++) {
                if (T[ai] in aj) {
                    aq._.dirty = 1;
                    break
                }
            }
            switch (an["text-anchor"]) {
                case"start":
                    aq.textpath.style["v-text-align"] = "left";
                    aq.bbx = aq.W / 2;
                    break;
                case"end":
                    aq.textpath.style["v-text-align"] = "right";
                    aq.bbx = -aq.W / 2;
                    break;
                default:
                    aq.textpath.style["v-text-align"] = "center";
                    aq.bbx = 0;
                    break
            }
            aq.textpath.style["v-text-kern"] = true
        }
        if ("shape-rendering" in aj) {
        }
    }, a = function (E, R, U) {
        E.attrs = E.attrs || {};
        var S = E.attrs, L = Math.pow, M, N, P = "linear", Q = ".5 .5";
        E.attrs.gradient = R;
        R = F(R).replace(l._radial_gradient, function (X, Y, W) {
            P = "radial";
            if (Y && W) {
                Y = n(Y);
                W = n(W);
                L(Y - 0.5, 2) + L(W - 0.5, 2) > 0.25 && (W = h.sqrt(0.25 - L(Y - 0.5, 2)) * ((W > 0.5) * 2 - 1) + 0.5);
                Q = Y + k + W
            }
            return q
        });
        R = R.split(/\s*\-\s*/);
        if (P == "linear") {
            var J = R.shift();
            J = -n(J);
            if (isNaN(J)) {
                return null
            }
        }
        var O = l._parseDots(R);
        if (!O) {
            return null
        }
        E = E.shape || E.node;
        if (O.length) {
            E.removeChild(U);
            U.on = true;
            U.method = "none";
            U.color = O[0].color;
            U.color2 = O[O.length - 1].color;
            var V = [];
            for (var K = 0, T = O.length; K < T; K++) {
                O[K].offset && V.push(O[K].offset + k + O[K].color)
            }
            U.colors = V.length ? V.join() : "0% " + U.color;
            if (P == "radial") {
                U.type = "gradientTitle";
                U.focus = "100%";
                U.focussize = "0 0";
                U.focusposition = Q;
                U.angle = 0
            } else {
                U.type = "gradient";
                U.angle = (270 - J) % 360
            }
            E.appendChild(U)
        }
        return 1
    }, u = function (J, E) {
        this[0] = this.node = J;
        J.raphael = true;
        this.id = l._oid++;
        J.raphaelid = this.id;
        this.X = 0;
        this.Y = 0;
        this.attrs = {};
        this.paper = E;
        this.matrix = l.matrix();
        this._ = {transform: [], sx: 1, sy: 1, dx: 0, dy: 0, deg: 0, dirty: 1, dirtyT: 1};
        !E.bottom && (E.bottom = this);
        this.prev = E.top;
        E.top && (E.top.next = this);
        E.top = this;
        this.next = null
    };
    var m = l.el;
    u.prototype = m;
    m.constructor = u;
    m.transform = function (M) {
        if (M == null) {
            return this._.transform
        }
        var O = this.paper._viewBoxShift, N = O ? "s" + [O.scale, O.scale] + "-1-1t" + [O.dx, O.dy] : q, R;
        if (O) {
            R = M = F(M).replace(/\.{3}|\u2026/g, this._.transform || q)
        }
        l._extractTransform(this, N + M);
        var S = this.matrix.clone(), U = this.skew, K = this.node, Q, L = ~F(this.attrs.fill).indexOf("-"), E = !F(this.attrs.fill).indexOf("url(");
        S.translate(-0.5, -0.5);
        if (E || L || this.type == "image") {
            U.matrix = "1 0 0 1";
            U.offset = "0 0";
            Q = S.split();
            if ((L && Q.noRotation) || !Q.isSimple) {
                K.style.filter = S.toFilter();
                var P = this.getBBox(), J = this.getBBox(1), V = P.x - J.x, T = P.y - J.y;
                K.coordorigin = (V * -b) + k + (T * -b);
                p(this, 1, 1, V, T, 0)
            } else {
                K.style.filter = q;
                p(this, Q.scalex, Q.scaley, Q.dx, Q.dy, Q.rotate)
            }
        } else {
            K.style.filter = q;
            U.matrix = F(S);
            U.offset = S.offset()
        }
        R && (this._.transform = R);
        return this
    };
    m.rotate = function (J, E, L) {
        if (this.removed) {
            return this
        }
        if (J == null) {
            return
        }
        J = F(J).split(i);
        if (J.length - 1) {
            E = n(J[1]);
            L = n(J[2])
        }
        J = n(J[0]);
        (L == null) && (E = L);
        if (E == null || L == null) {
            var K = this.getBBox(1);
            E = K.x + K.width / 2;
            L = K.y + K.height / 2
        }
        this._.dirtyT = 1;
        this.transform(this._.transform.concat([
            ["r", J, E, L]
        ]));
        return this
    };
    m.translate = function (J, E) {
        if (this.removed) {
            return this
        }
        J = F(J).split(i);
        if (J.length - 1) {
            E = n(J[1])
        }
        J = n(J[0]) || 0;
        E = +E || 0;
        if (this._.bbox) {
            this._.bbox.x += J;
            this._.bbox.y += E
        }
        this.transform(this._.transform.concat([
            ["t", J, E]
        ]));
        return this
    };
    m.scale = function (M, K, E, L) {
        if (this.removed) {
            return this
        }
        M = F(M).split(i);
        if (M.length - 1) {
            K = n(M[1]);
            E = n(M[2]);
            L = n(M[3]);
            isNaN(E) && (E = null);
            isNaN(L) && (L = null)
        }
        M = n(M[0]);
        (K == null) && (K = M);
        (L == null) && (E = L);
        if (E == null || L == null) {
            var J = this.getBBox(1)
        }
        E = E == null ? J.x + J.width / 2 : E;
        L = L == null ? J.y + J.height / 2 : L;
        this.transform(this._.transform.concat([
            ["s", M, K, E, L]
        ]));
        this._.dirtyT = 1;
        return this
    };
    m.hide = function () {
        !this.removed && (this.node.style.display = "none");
        return this
    };
    m.show = function () {
        !this.removed && (this.node.style.display = q);
        return this
    };
    m._getBBox = function () {
        if (this.removed) {
            return{}
        }
        return{x: this.X + (this.bbx || 0) - this.W / 2, y: this.Y - this.H, width: this.W, height: this.H}
    };
    m.remove = function () {
        if (this.removed || !this.node.parentNode) {
            return
        }
        this.paper.__set__ && this.paper.__set__.exclude(this);
        l.eve.unbind("raphael.*.*." + this.id);
        l._tear(this, this.paper);
        this.node.parentNode.removeChild(this.node);
        this.shape && this.shape.parentNode.removeChild(this.shape);
        for (var E in this) {
            this[E] = typeof this[E] == "function" ? l._removedFactory(E) : null
        }
        this.removed = true
    };
    m.attr = function (E, R) {
        if (this.removed) {
            return this
        }
        if (E == null) {
            var O = {};
            for (var Q in this.attrs) {
                if (this.attrs[e](Q)) {
                    O[Q] = this.attrs[Q]
                }
            }
            O.gradient && O.fill == "none" && (O.fill = O.gradient) && delete O.gradient;
            O.transform = this._.transform;
            return O
        }
        if (R == null && l.is(E, "string")) {
            if (E == v && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient
            }
            var P = E.split(i), L = {};
            for (var M = 0, T = P.length; M < T; M++) {
                E = P[M];
                if (E in this.attrs) {
                    L[E] = this.attrs[E]
                } else {
                    if (l.is(this.paper.customAttributes[E], "function")) {
                        L[E] = this.paper.customAttributes[E].def
                    } else {
                        L[E] = l._availableAttrs[E]
                    }
                }
            }
            return T - 1 ? L : L[P[0]]
        }
        if (this.attrs && R == null && l.is(E, "array")) {
            L = {};
            for (M = 0, T = E.length; M < T; M++) {
                L[E[M]] = this.attr(E[M])
            }
            return L
        }
        var J;
        if (R != null) {
            J = {};
            J[E] = R
        }
        R == null && l.is(E, "object") && (J = E);
        for (var S in J) {
            A("raphael.attr." + S + "." + this.id, this, J[S])
        }
        if (J) {
            for (S in this.paper.customAttributes) {
                if (this.paper.customAttributes[e](S) && J[e](S) && l.is(this.paper.customAttributes[S], "function")) {
                    var N = this.paper.customAttributes[S].apply(this, [].concat(J[S]));
                    this.attrs[S] = J[S];
                    for (var K in N) {
                        if (N[e](K)) {
                            J[K] = N[K]
                        }
                    }
                }
            }
            if (J.text && this.type == "text") {
                this.textpath.string = J.text
            }
            x(this, J)
        }
        return this
    };
    m.toFront = function () {
        !this.removed && this.node.parentNode.appendChild(this.node);
        this.paper && this.paper.top != this && l._tofront(this, this.paper);
        return this
    };
    m.toBack = function () {
        if (this.removed) {
            return this
        }
        if (this.node.parentNode.firstChild != this.node) {
            this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
            l._toback(this, this.paper)
        }
        return this
    };
    m.appendChild = function (E) {
        if (this.removed) {
            return this
        }
        if (this.type !== "group") {
            throw new TypeError("appendChild function supports only the group type!")
        }
        var J = E.node || E[E.length - 1].node;
        this.node.appendChild(J);
        return this
    };
    m.insertAfter = function (E) {
        if (this.removed) {
            return this
        }
        if (E.constructor == l.st.constructor) {
            E = E[E.length - 1]
        }
        if (E.node.nextSibling) {
            E.node.parentNode.insertBefore(this.node, E.node.nextSibling)
        } else {
            E.node.parentNode.appendChild(this.node)
        }
        l._insertafter(this, E, this.paper);
        return this
    };
    m.insertBefore = function (E) {
        if (this.removed) {
            return this
        }
        if (E.constructor == l.st.constructor) {
            E = E[0]
        }
        E.node.parentNode.insertBefore(this.node, E.node);
        l._insertbefore(this, E, this.paper);
        return this
    };
    m.blur = function (E) {
        var J = this.node.runtimeStyle, K = J.filter;
        K = K.replace(t, q);
        if (+E !== 0) {
            this.attrs.blur = E;
            J.filter = K + k + w + ".Blur(pixelradius=" + (+E || 1.5) + ")";
            J.margin = l.format("-{0}px 0 0 -{0}px", B(+E || 1.5))
        } else {
            J.filter = K;
            J.margin = 0;
            delete this.attrs.blur
        }
    };
    l._engine.group = function (K, J, N) {
        var L = G("group");
        L.coordsize = b + k + b;
        if (J && N) {
            L.coordorigin = J + " " + N
        }
        var M = new u(L, K), E = {x: J, y: N, fill: "none", stroke: "#000"};
        x(M, E);
        K.canvas.appendChild(L);
        M.type = "group";
        return M
    };
    l._engine.path = function (L, J) {
        var M = G("shape");
        M.style.cssText = d;
        M.coordsize = b + k + b;
        M.coordorigin = J.coordorigin;
        var N = new u(M, J), E = {fill: "none", stroke: "#000"};
        L && (E.path = L);
        N.type = "path";
        N.path = [];
        N.Path = q;
        x(N, E);
        J.canvas.appendChild(M);
        var K = G("skew");
        K.on = true;
        M.appendChild(K);
        N.skew = K;
        N.transform(q);
        return N
    };
    l._engine.rect = function (J, O, M, P, K, E) {
        var Q = l._rectPath(O, M, P, K, E), L = J.path(Q), N = L.attrs;
        L.X = N.x = O;
        L.Y = N.y = M;
        L.W = N.width = P;
        L.H = N.height = K;
        N.r = E;
        N.path = Q;
        L.type = "rect";
        return L
    };
    l._engine.ellipse = function (J, E, O, N, M) {
        var L = J.path(), K = L.attrs;
        L.X = E - N;
        L.Y = O - M;
        L.W = N * 2;
        L.H = M * 2;
        L.type = "ellipse";
        x(L, {cx: E, cy: O, rx: N, ry: M});
        return L
    };
    l._engine.circle = function (J, E, N, M) {
        var L = J.path(), K = L.attrs;
        L.X = E - M;
        L.Y = N - M;
        L.W = L.H = M * 2;
        L.type = "circle";
        x(L, {cx: E, cy: N, r: M});
        return L
    };
    l._engine.image = function (J, E, P, N, Q, L) {
        var S = l._rectPath(P, N, Q, L), M = J.path(S).attr({stroke: "none"}), O = M.attrs, K = M.node, R = K.getElementsByTagName(v)[0];
        O.src = E;
        M.X = O.x = P;
        M.Y = O.y = N;
        M.W = O.width = Q;
        M.H = O.height = L;
        O.path = S;
        M.type = "image";
        R.parentNode == K && K.removeChild(R);
        R.rotate = true;
        R.src = E;
        R.type = "tile";
        M._.fillpos = [P, N];
        M._.fillsize = [Q, L];
        K.appendChild(R);
        p(M, 1, 1, 0, 0, 0);
        return M
    };
    l._engine.text = function (E, O, N, P) {
        var L = G("shape"), R = G("path"), K = G("textpath");
        O = O || 0;
        N = N || 0;
        P = P || "";
        R.v = l.format("m{0},{1}l{2},{1}", B(O * b), B(N * b), B(O * b) + 1);
        R.textpathok = true;
        K.string = F(P);
        K.on = true;
        L.style.cssText = d;
        L.coordsize = b + k + b;
        L.coordorigin = "0 0";
        var J = new u(L, E), M = {fill: "#000", stroke: "none", font: l._availableAttrs.font, text: P};
        J.shape = L;
        J.path = R;
        J.textpath = K;
        J.type = "text";
        J.attrs.text = F(P);
        J.attrs.x = O;
        J.attrs.y = N;
        J.attrs.w = 1;
        J.attrs.h = 1;
        x(J, M);
        L.appendChild(K);
        L.appendChild(R);
        E.canvas.appendChild(L);
        var Q = G("skew");
        Q.on = true;
        L.appendChild(Q);
        J.skew = Q;
        J.transform(q);
        return J
    };
    l._engine.foreignObject = function (E, P, O, Q, L, K) {
        if ((typeof Q) !== "number") {
            K = Q;
            Q = K.offsetWidth;
            L = K.offsetHeight
        }
        var M = G("group");
        M.style.cssText = ["position:absolute", "left:" + (P - Q / 2) + "px", "top:" + (O - L / 2) + "px", "width:" + Q + "px", "height:" + L + "px"].join(";") + ";";
        M.coordsize = b + k + b;
        M.coordorigin = "0 0";
        var J = document.createElement("div");
        J.innerHTML = K;
        M.appendChild(J);
        var N = new u(M, E);
        N.type = "foreignObject";
        N.X = N.attrs.x = P;
        N.Y = N.attrs.y = O;
        N.W = N.attrs.width = Q;
        N.H = N.attrs.height = L;
        E.canvas.appendChild(M);
        return N
    };
    l._engine.setSize = function (K, E) {
        var J = this.canvas.style;
        this.width = K;
        this.height = E;
        K == +K && (K += "px");
        E == +E && (E += "px");
        J.width = K;
        J.height = E;
        J.clip = "rect(0 " + K + " " + E + " 0)";
        if (this._viewBox) {
            l._engine.setViewBox.apply(this, this._viewBox)
        }
        return this
    };
    l._engine.setViewBox = function (N, M, O, K, L) {
        l.eve("raphael.setViewBox", this, this._viewBox, [N, M, O, K, L]);
        var E = this.width, Q = this.height, R = 1 / I(O / E, K / Q), P, J;
        if (L) {
            P = Q / K;
            J = E / O;
            if (O * P < E) {
                N -= (E - O * P) / 2 / P
            }
            if (K * J < Q) {
                M -= (Q - K * J) / 2 / J
            }
        }
        this._viewBox = [N, M, O, K, !!L];
        this._viewBoxShift = {dx: -N, dy: -M, scale: R};
        this.forEach(function (S) {
            S.transform("...")
        });
        return this
    };
    var G;
    l._engine.initWin = function (K) {
        var J = K.document;
        J.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            !J.namespaces.rvml && J.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
            G = function (L) {
                return J.createElement("<rvml:" + L + ' class="rvml">')
            }
        } catch (E) {
            G = function (L) {
                return J.createElement("<" + L + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
            }
        }
    };
    l._engine.initWin(l._g.win);
    l._engine.create = function () {
        var K = l._getContainer.apply(0, arguments), E = K.container, Q = K.height, R, J = K.width, P = K.x, O = K.y;
        if (!E) {
            throw new Error("VML container not found.")
        }
        var M = new l._Paper, N = M.canvas = l._g.doc.createElement("div"), L = N.style;
        P = P || 0;
        O = O || 0;
        J = J || 512;
        Q = Q || 342;
        M.width = J;
        M.height = Q;
        J == +J && (J += "px");
        Q == +Q && (Q += "px");
        M.coordsize = b * 1000 + k + b * 1000;
        M.coordorigin = "0 0";
        M.span = l._g.doc.createElement("span");
        M.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
        N.appendChild(M.span);
        L.cssText = l.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", J, Q);
        if (E == 1) {
            l._g.doc.body.appendChild(N);
            L.left = P + "px";
            L.top = O + "px";
            L.position = "absolute"
        } else {
            if (E.firstChild) {
                E.insertBefore(N, E.firstChild)
            } else {
                E.appendChild(N)
            }
        }
        M.renderfix = function () {
        };
        return M
    };
    l.prototype.clear = function () {
        l.eve("raphael.clear", this);
        this.canvas.innerHTML = q;
        this.span = l._g.doc.createElement("span");
        this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
        this.canvas.appendChild(this.span);
        this.bottom = this.top = null
    };
    l.prototype.remove = function () {
        l.eve("raphael.remove", this);
        this.canvas.parentNode.removeChild(this.canvas);
        for (var E in this) {
            this[E] = typeof this[E] == "function" ? l._removedFactory(E) : null
        }
        return true
    };
    var y = l.st;
    for (var g in m) {
        if (m[e](g) && !y[e](g)) {
            y[g] = (function (E) {
                return function () {
                    var J = arguments;
                    return this.forEach(function (K) {
                        K[E].apply(K, J)
                    })
                }
            })(g)
        }
    }
}(window.Raphael);
var OG = window.OG || {};
OG.common = {};
OG.geometry = {};
OG.graph = {};
OG.handler = {};
OG.layout = {};
OG.renderer = {};
OG.shape = {};
OG.shape.bpmn = {};
OG.common.Constants = {GEOM_TYPE: {NULL: 0, POINT: 1, LINE: 2, POLYLINE: 3, POLYGON: 4, RECTANGLE: 5, CIRCLE: 6, ELLIPSE: 7, CURVE: 8, BEZIER_CURVE: 9, COLLECTION: 10}, GEOM_NAME: ["", "Point", "Line", "PolyLine", "Polygon", "Rectangle", "Circle", "Ellipse", "Curve", "BezierCurve", "Collection"], NUM_PRECISION: 0, NODE_TYPE: {ROOT: "ROOT", SHAPE: "SHAPE", ETC: "ETC"}, SHAPE_TYPE: {GEOM: "GEOM", TEXT: "TEXT", HTML: "HTML", IMAGE: "IMAGE", EDGE: "EDGE", GROUP: "GROUP"}, EDGE_TYPE: {STRAIGHT: "straight", PLAIN: "plain", BEZIER: "bezier"}, LABEL_SUFFIX: "_LABEL", LABEL_EDITOR_SUFFIX: "_LABEL_EDITOR", FROM_LABEL_SUFFIX: "_FROMLABEL", TO_LABEL_SUFFIX: "_TOLABEL", RUBBER_BAND_ID: "OG_R_BAND", GUIDE_SUFFIX: {GUIDE: "_GUIDE", BBOX: "_GUIDE_BBOX", UL: "_GUIDE_UL", UR: "_GUIDE_UR", LL: "_GUIDE_LL", LR: "_GUIDE_LR", LC: "_GUIDE_LC", UC: "_GUIDE_UC", RC: "_GUIDE_RC", LWC: "_GUIDE_LWC", FROM: "_GUIDE_FROM", TO: "_GUIDE_TO", CTL: "_GUIDE_CTL_", CTL_H: "_GUIDE_CTL_H_", CTL_V: "_GUIDE_CTL_V_"}, COLLAPSE_SUFFIX: "_COLLAPSE", COLLAPSE_BBOX_SUFFIX: "_COLLAPSE_BBOX", MOVE_SNAP_SIZE: 5, DROP_OVER_BBOX_SUFFIX: "_DROP_OVER", TERMINAL_SUFFIX: {GROUP: "_TERMINAL", BOX: "_TERMINAL_BOX"}, TERMINAL_TYPE: {C: "C", E: "E", W: "W", S: "S", N: "N", IN: "IN", OUT: "OUT", INOUT: "INOUT"}};
OG.Constants = OG.common.Constants;
if (typeof KeyEvent === "undefined") {
    var KeyEvent = {DOM_VK_CANCEL: 3, DOM_VK_HELP: 6, DOM_VK_BACK_SPACE: 8, DOM_VK_TAB: 9, DOM_VK_CLEAR: 12, DOM_VK_RETURN: 13, DOM_VK_ENTER: 14, DOM_VK_SHIFT: 16, DOM_VK_CONTROL: 17, DOM_VK_ALT: 18, DOM_VK_PAUSE: 19, DOM_VK_CAPS_LOCK: 20, DOM_VK_ESCAPE: 27, DOM_VK_SPACE: 32, DOM_VK_PAGE_UP: 33, DOM_VK_PAGE_DOWN: 34, DOM_VK_END: 35, DOM_VK_HOME: 36, DOM_VK_LEFT: 37, DOM_VK_UP: 38, DOM_VK_RIGHT: 39, DOM_VK_DOWN: 40, DOM_VK_PRINTSCREEN: 44, DOM_VK_INSERT: 45, DOM_VK_DELETE: 46, DOM_VK_0: 48, DOM_VK_1: 49, DOM_VK_2: 50, DOM_VK_3: 51, DOM_VK_4: 52, DOM_VK_5: 53, DOM_VK_6: 54, DOM_VK_7: 55, DOM_VK_8: 56, DOM_VK_9: 57, DOM_VK_SEMICOLON: 59, DOM_VK_EQUALS: 61, DOM_VK_A: 65, DOM_VK_B: 66, DOM_VK_C: 67, DOM_VK_D: 68, DOM_VK_E: 69, DOM_VK_F: 70, DOM_VK_G: 71, DOM_VK_H: 72, DOM_VK_I: 73, DOM_VK_J: 74, DOM_VK_K: 75, DOM_VK_L: 76, DOM_VK_M: 77, DOM_VK_N: 78, DOM_VK_O: 79, DOM_VK_P: 80, DOM_VK_Q: 81, DOM_VK_R: 82, DOM_VK_S: 83, DOM_VK_T: 84, DOM_VK_U: 85, DOM_VK_V: 86, DOM_VK_W: 87, DOM_VK_X: 88, DOM_VK_Y: 89, DOM_VK_Z: 90, DOM_VK_COMMAND: 91, DOM_VK_CONTEXT_MENU: 93, DOM_VK_NUMPAD0: 96, DOM_VK_NUMPAD1: 97, DOM_VK_NUMPAD2: 98, DOM_VK_NUMPAD3: 99, DOM_VK_NUMPAD4: 100, DOM_VK_NUMPAD5: 101, DOM_VK_NUMPAD6: 102, DOM_VK_NUMPAD7: 103, DOM_VK_NUMPAD8: 104, DOM_VK_NUMPAD9: 105, DOM_VK_MULTIPLY: 106, DOM_VK_ADD: 107, DOM_VK_SEPARATOR: 108, DOM_VK_SUBTRACT: 109, DOM_VK_DECIMAL: 110, DOM_VK_DIVIDE: 111, DOM_VK_F1: 112, DOM_VK_F2: 113, DOM_VK_F3: 114, DOM_VK_F4: 115, DOM_VK_F5: 116, DOM_VK_F6: 117, DOM_VK_F7: 118, DOM_VK_F8: 119, DOM_VK_F9: 120, DOM_VK_F10: 121, DOM_VK_F11: 122, DOM_VK_F12: 123, DOM_VK_F13: 124, DOM_VK_F14: 125, DOM_VK_F15: 126, DOM_VK_F16: 127, DOM_VK_F17: 128, DOM_VK_F18: 129, DOM_VK_F19: 130, DOM_VK_F20: 131, DOM_VK_F21: 132, DOM_VK_F22: 133, DOM_VK_F23: 134, DOM_VK_F24: 135, DOM_VK_NUM_LOCK: 144, DOM_VK_SCROLL_LOCK: 145, DOM_VK_COMMA: 188, DOM_VK_PERIOD: 190, DOM_VK_SLASH: 191, DOM_VK_BACK_QUOTE: 192, DOM_VK_OPEN_BRACKET: 219, DOM_VK_BACK_SLASH: 220, DOM_VK_CLOSE_BRACKET: 221, DOM_VK_QUOTE: 222, DOM_VK_META: 224}
}
;
OG.common.Util = {isEmpty: function (b, a) {
    return b === null || b === undefined || ((OG.Util.isArray(b) && !b.length)) || (!a ? b === "" : false)
}, isArray: function (a) {
    return Object.prototype.toString.apply(a) === "[object Array]"
}, isDate: function (a) {
    return Object.prototype.toString.apply(a) === "[object Date]"
}, isObject: function (a) {
    return !!a && Object.prototype.toString.call(a) === "[object Object]"
}, isPrimitive: function (a) {
    return OG.Util.isString(a) || OG.Util.isNumber(a) || OG.Util.isBoolean(a)
}, isFunction: function (a) {
    return Object.prototype.toString.apply(a) === "[object Function]"
}, isNumber: function (a) {
    return typeof a === "number" && isFinite(a)
}, isString: function (a) {
    return typeof a === "string"
}, isBoolean: function (a) {
    return typeof a === "boolean"
}, isElement: function (a) {
    return !!a && a.tagName ? true : false
}, isDefined: function (a) {
    return typeof a !== "undefined"
}, isWebKit: function () {
    return(/webkit/).test(navigator.userAgent.toLowerCase())
}, isGecko: function () {
    return !OG.Util.isWebKit() && (/gecko/).test(navigator.userAgent.toLowerCase())
}, isOpera: function () {
    return(/opera/).test(navigator.userAgent.toLowerCase())
}, isChrome: function () {
    return(/\bchrome\b/).test(navigator.userAgent.toLowerCase())
}, isSafari: function () {
    return !OG.Util.isChrome() && (/safari/).test(navigator.userAgent.toLowerCase())
}, isFirefox: function () {
    return(/firefox/).test(navigator.userAgent.toLowerCase())
}, isIE: function () {
    return !OG.Util.isOpera() && (/msie/).test(navigator.userAgent.toLowerCase())
}, isIE6: function () {
    return OG.Util.isIE() && (/msie 6/).test(navigator.userAgent.toLowerCase())
}, isIE7: function () {
    return OG.Util.isIE() && ((/msie 7/).test(navigator.userAgent.toLowerCase()) || document.documentMode === 7)
}, isIE8: function () {
    return OG.Util.isIE() && ((/msie 8/).test(navigator.userAgent.toLowerCase()) || document.documentMode === 8)
}, isIE9: function () {
    return OG.Util.isIE() && ((/msie 9/).test(navigator.userAgent.toLowerCase()) || document.documentMode === 9)
}, isWindows: function () {
    return(/windows|win32/).test(navigator.userAgent.toLowerCase())
}, isMac: function () {
    return(/macintosh|mac os x/).test(navigator.userAgent.toLowerCase())
}, isLinux: function () {
    return(/linux/).test(navigator.userAgent.toLowerCase())
}, trim: function (a) {
    return a === null || a === undefined ? a : a.replace(/^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g, "")
}, clone: function (g) {
    if (g === null || g === undefined) {
        return g
    }
    if (g.nodeType && g.cloneNode) {
        return g.cloneNode(true)
    }
    var e, c, b, h, d, f = Object.prototype.toString.call(g), a = ["hasOwnProperty", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "constructor"];
    if (f === "[object Date]") {
        return new Date(g.getTime())
    }
    if (f === "[object Array]") {
        e = g.length;
        h = [];
        while (e--) {
            h[e] = this.clone(g[e])
        }
    } else {
        if (f === "[object Object]" && g.constructor === Object) {
            h = {};
            for (d in g) {
                h[d] = this.clone(g[d])
            }
            if (a) {
                for (c = a.length; c--;) {
                    b = a[c];
                    h[b] = g[b]
                }
            }
        }
    }
    return h || g
}, round: function (a) {
    return this.roundPrecision(a, OG.Constants.NUM_PRECISION)
}, roundPrecision: function (c, a) {
    var b = Math.pow(10, a);
    return Math.round(c * b) / b
}, roundGrid: function (a, b) {
    b = b || OG.Constants.MOVE_SNAP_SIZE;
    return OG.Util.round(a / b) * b
}, apply: function (d, a, c) {
    var b;
    if (c) {
        this.apply(d, c)
    }
    if (d && a && typeof a === "object") {
        for (b in a) {
            d[b] = a[b]
        }
    }
    return d
}, extend: (function () {
    var b = function (d) {
        var c;
        for (c in d) {
            this[c] = d[c]
        }
    }, a = Object.prototype.constructor;
    return function (h, e, g) {
        if (OG.Util.isObject(e)) {
            g = e;
            e = h;
            h = g.constructor !== a ? g.constructor : function () {
                e.apply(this, arguments)
            }
        }
        var d = function () {
        }, f, c = e.prototype;
        d.prototype = c;
        f = h.prototype = new d();
        f.constructor = h;
        h.superclass = c;
        if (c.constructor === a) {
            c.constructor = e
        }
        h.override = function (i) {
            OG.Util.override(h, i)
        };
        f.superclass = f.supr = (function () {
            return c
        }());
        f.override = b;
        OG.Util.override(h, g);
        h.extend = function (i) {
            return OG.Util.extend(h, i)
        };
        return h
    }
}()), override: function (a, c) {
    if (c) {
        var b = a.prototype;
        OG.Util.apply(b, c);
        if ((/msie/).test(navigator.userAgent.toLowerCase()) && c.hasOwnProperty("toString")) {
            b.toString = c.toString
        }
    }
}, xmlToJson: function (c) {
    var b = {}, a = function (f) {
        var e = {};
        for (var g in f) {
            if (f.hasOwnProperty(g)) {
                e[g] = f[g]
            }
        }
        return e
    }, d = function (g, m, r) {
        if (g.nodeType === 3) {
            if (!g.nodeValue.match(/[\S]+/)) {
                return
            }
            if (m["$"] instanceof Array) {
                m["$"].push(g.nodeValue)
            } else {
                if (m["$"] instanceof Object) {
                    m["$"] = [m["$"], g.nodeValue]
                } else {
                    m["$"] = g.nodeValue
                }
            }
        } else {
            if (g.nodeType === 1) {
                var f = {};
                var s = g.nodeName;
                for (var n = 0; g.attributes && n < g.attributes.length; n++) {
                    var q = g.attributes[n];
                    var e = q.nodeName;
                    var t = q.nodeValue;
                    if (e === "xmlns") {
                        r["$"] = t
                    } else {
                        if (e.indexOf("xmlns:") === 0) {
                            r[e.substr(e.indexOf(":") + 1)] = t
                        } else {
                            f["@" + e] = t
                        }
                    }
                }
                for (var o in r) {
                    if (r.hasOwnProperty(o)) {
                        f["@xmlns"] = f["@xmlns"] || {};
                        f["@xmlns"][o] = r[o]
                    }
                }
                if (m[s] instanceof Array) {
                    m[s].push(f)
                } else {
                    if (m[s] instanceof Object) {
                        m[s] = [m[s], f]
                    } else {
                        m[s] = f
                    }
                }
                for (var l = 0; l < g.childNodes.length; l++) {
                    d(g.childNodes[l], f, a(r))
                }
            } else {
                if (g.nodeType === 9) {
                    for (var h = 0; h < g.childNodes.length; h++) {
                        d(g.childNodes[h], m, a(r))
                    }
                }
            }
        }
    };
    d(c, b, {});
    return b
}, jsonToXml: function (d) {
    if (typeof d !== "object") {
        return null
    }
    var b = function (f) {
        var e = {};
        for (var g in f) {
            if (f.hasOwnProperty(g)) {
                e[g] = f[g]
            }
        }
        return e
    };
    var c = function (n, e, o) {
        var m = "";
        if (e instanceof Array) {
            for (var k = 0; k < e.length; k++) {
                m += c(n, e[k], b(o))
            }
            return m
        } else {
            if (typeof e === "object") {
                var f = "<" + n;
                var h = "";
                var q = "";
                if (e["@xmlns"]) {
                    var g = e["@xmlns"];
                    for (var l in g) {
                        if (g.hasOwnProperty(l)) {
                            if (l === "$") {
                                if (o[l] !== g[l]) {
                                    h += ' xmlns="' + g[l] + '"';
                                    o[l] = g[l]
                                }
                            } else {
                                if (!o[l] || (o[l] !== g[l])) {
                                    h += " xmlns:" + l + '="' + g[l] + '"';
                                    o[l] = g[l]
                                }
                            }
                        }
                    }
                }
                for (var p in e) {
                    if (e.hasOwnProperty(p) && p !== "@xmlns") {
                        var j = e[p];
                        if (p === "$") {
                            q += j
                        } else {
                            if (p.indexOf("@") === 0) {
                                h += " " + p.substring(1) + '="' + j + '"'
                            } else {
                                m += c(p, j, b(o))
                            }
                        }
                    }
                }
                m = q + m;
                return(m !== "") ? f + h + ">" + m + "</" + n + ">" : f + h + "/>"
            }
        }
    };
    for (var a in d) {
        if (d.hasOwnProperty(a) && a.indexOf("@") == -1) {
            return'<?xml version="1.0" encoding="UTF-8"?>' + c(a, d[a], {})
        }
    }
    return null
}, parseXML: function (b) {
    var a, c;
    if (window.ActiveXObject) {
        a = new ActiveXObject("Microsoft.XMLDOM");
        a.async = "false";
        a.loadXML(b)
    } else {
        c = new DOMParser();
        a = c.parseFromString(b, "text/xml")
    }
    return a
}};
OG.Util = OG.common.Util;
OG.common.CurveUtil = {CatmullRomSpline: function (c) {
    var b = [], e, f = {}, d = {}, a = function (g) {
        return function (j, i) {
            var h = c.length, k, l;
            if (h < 2) {
                return NaN
            }
            j = j - 1;
            if (!i && b[g]) {
                i = true
            }
            if (!i) {
                f[g] = 2 * c[0][g] - c[1][g];
                d[g] = 2 * c[h - 1][g] - c[h - 2][g];
                e = [f].concat(c, [d]);
                b[g] = [];
                for (k = 0; k < h - 1; k++) {
                    b[g][k] = [2 * e[k + 1][g], -e[k][g] + e[k + 2][g], 2 * e[k][g] - 5 * e[k + 1][g] + 4 * e[k + 2][g] - e[k + 3][g], -e[k][g] + 3 * e[k + 1][g] - 3 * e[k + 2][g] + e[k + 3][g]]
                }
            }
            h += 2;
            if (isNaN(j)) {
                return NaN
            }
            if (j < 0) {
                return e[1][g]
            } else {
                if (j >= h - 3) {
                    return e[h - 2][g]
                }
            }
            k = Math.floor(j);
            if (k === j) {
                return e[k][g]
            }
            j -= k;
            l = b[g][k];
            return 0.5 * (((l[3] * j + l[2]) * j + l[1]) * j + l[0])
        }
    };
    return{getX: a(0), getY: a(1), maxT: c.length + 1}
}, Bezier: function (c) {
    var a, b = function (d) {
        return function (f, e) {
            var i = Math.floor(f) * 3, h = f, g = 1 - h;
            if (!e && a) {
                e = true
            }
            if (!e) {
                a = Math.floor(c.length / 3)
            }
            if (f < 0) {
                return c[0][d]
            }
            if (f >= a) {
                return c[c.length - 1][d]
            }
            if (isNaN(f)) {
                return NaN
            }
            return g * g * (g * c[i][d] + 3 * h * c[i + 1][d]) + (3 * g * c[i + 2][d] + h * c[i + 3][d]) * h * h
        }
    };
    return{getX: b(0), getY: b(1), maxT: Math.floor(c.length / 3) + 0.01}
}, BSpline: function (d, a) {
    var e, g = [], f = function (m, h) {
        var i, l = [];
        for (i = 0; i < m + h + 1; i++) {
            if (i < h) {
                l[i] = 0
            } else {
                if (i <= m) {
                    l[i] = i - h + 1
                } else {
                    l[i] = m - h + 2
                }
            }
        }
        return l
    }, c = function (v, x, h, l, w) {
        var o, m, r, q, u, p = [];
        if (x[w] <= v && v < x[w + 1]) {
            p[w] = 1
        } else {
            p[w] = 0
        }
        for (o = 2; o <= l; o++) {
            for (m = w - o + 1; m <= w; m++) {
                if (m <= w - o + 1 || m < 0) {
                    r = 0
                } else {
                    r = p[m]
                }
                if (m >= w) {
                    q = 0
                } else {
                    q = p[m + 1]
                }
                u = x[m + o - 1] - x[m];
                if (u === 0) {
                    p[m] = 0
                } else {
                    p[m] = (v - x[m]) / u * r
                }
                u = x[m + o] - x[m + 1];
                if (u !== 0) {
                    p[m] += (x[m + o] - v) / u * q
                }
            }
        }
        return p
    }, b = function (h) {
        return function (p, l) {
            var i = d.length, u, o, q, r = i - 1, m = a;
            if (r <= 0) {
                return NaN
            }
            if (r + 2 <= m) {
                m = r + 1
            }
            if (p <= 0) {
                return d[0][h]
            }
            if (p >= r - m + 2) {
                return d[r][h]
            }
            e = f(r, m);
            q = Math.floor(p) + m - 1;
            g = c(p, e, r, m, q);
            u = 0;
            for (o = q - m + 1; o <= q; o++) {
                if (o < i && o >= 0) {
                    u += d[o][h] * g[o]
                }
            }
            return u
        }
    };
    return{getX: b(0), getY: b(1), maxT: d.length - 2}
}};
OG.CurveUtil = OG.common.CurveUtil;
OG.common.NotSupportedException = function (a) {
    this.name = "OG.NotSupportedException";
    this.message = a || "Not Supported!"
};
OG.NotSupportedException = OG.common.NotSupportedException;
OG.common.NotImplementedException = function (a) {
    this.name = "OG.NotImplementedException";
    this.message = a || "Not Implemented!"
};
OG.NotImplementedException = OG.common.NotImplementedException;
OG.common.ParamError = function (a) {
    this.name = "OG.ParamError";
    this.message = a || "Invalid Parameter Error!"
};
OG.ParamError = OG.common.ParamError;
OG.common.HashMap = function (a) {
    this.map = a || {}
};
OG.common.HashMap.prototype = {put: function (a, b) {
    this.map[a] = b
}, get: function (a) {
    return this.map[a]
}, containsKey: function (a) {
    return this.map.hasOwnProperty(a)
}, containsValue: function (a) {
    var b;
    for (b in this.map) {
        if (this.map[b] === a) {
            return true
        }
    }
    return false
}, isEmpty: function () {
    return this.size() === 0
}, clear: function () {
    var a;
    for (a in this.map) {
        delete this.map[a]
    }
}, remove: function (a) {
    if (this.map[a]) {
        delete this.map[a]
    }
}, keys: function () {
    var a = [], b;
    for (b in this.map) {
        a.push(b)
    }
    return a
}, values: function () {
    var a = [], b;
    for (b in this.map) {
        a.push(this.map[b])
    }
    return a
}, size: function () {
    var a = 0, b;
    for (b in this.map) {
        a++
    }
    return a
}, toString: function () {
    var a = [], b;
    for (b in this.map) {
        a.push("'" + b + "':'" + this.map[b] + "'")
    }
    return"{" + a.join() + "}"
}};
OG.common.HashMap.prototype.constructor = OG.common.HashMap;
OG.HashMap = OG.common.HashMap;
OG.common.JSON = new (function () {
    var useHasOwn = !!{}.hasOwnProperty, USE_NATIVE_JSON = false, isNative = (function () {
        var useNative = null;
        return function () {
            if (useNative === null) {
                useNative = USE_NATIVE_JSON && window.JSON && JSON.toString() === "[object JSON]"
            }
            return useNative
        }
    }()), m = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, pad = function (n) {
        return n < 10 ? "0" + n : n
    }, doDecode = function (json) {
        return eval("(" + json + ")")
    }, encodeString = function (s) {
        if (/["\\\x00-\x1f]/.test(s)) {
            return'"' + s.replace(/([\x00-\x1f\\"])/g, function (a, b) {
                var c = m[b];
                if (c) {
                    return c
                }
                c = b.charCodeAt();
                return"\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
            }) + '"'
        }
        return'"' + s + '"'
    }, encodeArray = function (o) {
        var a = ["["], b, i, l = o.length, v;
        for (i = 0; i < l; i += 1) {
            v = o[i];
            switch (typeof v) {
                case"undefined":
                case"function":
                case"unknown":
                    break;
                default:
                    if (b) {
                        a.push(",")
                    }
                    a.push(v === null ? "null" : OG.common.JSON.encode(v));
                    b = true
            }
        }
        a.push("]");
        return a.join("")
    }, doEncode = function (o) {
        if (!OG.Util.isDefined(o) || o === null) {
            return"null"
        } else {
            if (OG.Util.isArray(o)) {
                return encodeArray(o)
            } else {
                if (OG.Util.isDate(o)) {
                    return OG.common.JSON.encodeDate(o)
                } else {
                    if (OG.Util.isString(o)) {
                        return encodeString(o)
                    } else {
                        if (typeof o === "number") {
                            return isFinite(o) ? String(o) : "null"
                        } else {
                            if (OG.Util.isBoolean(o)) {
                                return String(o)
                            } else {
                                var a = ["{"], b, i, v;
                                for (i in o) {
                                    if (!o.getElementsByTagName) {
                                        if (!useHasOwn || o.hasOwnProperty(i)) {
                                            v = o[i];
                                            switch (typeof v) {
                                                case"undefined":
                                                case"function":
                                                case"unknown":
                                                    break;
                                                default:
                                                    if (b) {
                                                        a.push(",")
                                                    }
                                                    a.push(doEncode(i), ":", v === null ? "null" : doEncode(v));
                                                    b = true
                                            }
                                        }
                                    }
                                }
                                a.push("}");
                                return a.join("")
                            }
                        }
                    }
                }
            }
        }
    };
    this.encodeDate = function (o) {
        return'"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-" + pad(o.getDate()) + "T" + pad(o.getHours()) + ":" + pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"'
    };
    this.encode = (function () {
        var ec;
        return function (o) {
            if (!ec) {
                ec = isNative() ? JSON.stringify : doEncode
            }
            return ec(o)
        }
    }());
    this.decode = (function () {
        var dc;
        return function (json) {
            if (!dc) {
                dc = isNative() ? JSON.parse : doDecode
            }
            return dc(json)
        }
    }())
})();
OG.JSON = OG.common.JSON;
OG.geometry.Style = function (c) {
    var b = {}, a = {};
    OG.Util.apply(a, c, b);
    OG.geometry.Style.superclass.call(this, a)
};
OG.geometry.Style.prototype = new OG.common.HashMap();
OG.geometry.Style.superclass = OG.common.HashMap;
OG.geometry.Style.prototype.constructor = OG.geometry.Style;
OG.Style = OG.geometry.Style;
OG.geometry.Coordinate = function (a, b) {
    this.x = undefined;
    this.y = undefined;
    if (arguments.length === 1 && a.constructor === Array) {
        this.x = a[0];
        this.y = a[1]
    } else {
        if (arguments.length === 2 && typeof a === "number" && typeof b === "number") {
            this.x = a;
            this.y = b
        } else {
            if (arguments.length !== 0) {
                throw new OG.ParamError()
            }
        }
    }
};
OG.geometry.Coordinate.prototype = {distance: function (c) {
    if (c.constructor === Array) {
        c = new OG.geometry.Coordinate(c[0], c[1])
    }
    var b = this.x - c.x, a = this.y - c.y;
    return OG.Util.round(Math.sqrt(Math.pow(b, 2) + Math.pow(a, 2)))
}, move: function (a, b) {
    this.x += a;
    this.y += b;
    return this
}, rotate: function (d, b) {
    if (b.constructor === Array) {
        b = new OG.geometry.Coordinate(b[0], b[1])
    }
    d *= Math.PI / 180;
    var a = this.distance(b), c = d + Math.atan2(this.y - b.y, this.x - b.x);
    this.x = OG.Util.round(b.x + (a * Math.cos(c)));
    this.y = OG.Util.round(b.y + (a * Math.sin(c)));
    return this
}, isEquals: function (a) {
    if (a.constructor === Array) {
        a = new OG.geometry.Coordinate(a[0], a[1])
    }
    if (a && a instanceof OG.geometry.Coordinate) {
        if (this.x === a.x && this.y === a.y) {
            return true
        }
    }
    return false
}, toString: function () {
    var a = [];
    a.push(this.x);
    a.push(this.y);
    return"[" + a.join() + "]"
}};
OG.geometry.Coordinate.prototype.constructor = OG.geometry.Coordinate;
OG.Coordinate = OG.geometry.Coordinate;
OG.geometry.Envelope = function (b, c, a) {
    this._upperLeft = null;
    this._width = c;
    this._height = a;
    this._upperRight = null;
    this._lowerLeft = null;
    this._lowerRight = null;
    this._leftCenter = null;
    this._leftCenter = null;
    this._upperCenter = null;
    this._rightCenter = null;
    this._lowerCenter = null;
    this._centroid = null;
    if (b) {
        if (b.constructor === Array) {
            this._upperLeft = new OG.geometry.Coordinate(b)
        } else {
            this._upperLeft = new OG.geometry.Coordinate(b.x, b.y)
        }
    }
};
OG.geometry.Envelope.prototype = {getUpperLeft: function () {
    return this._upperLeft
}, setUpperLeft: function (a) {
    if (a.constructor === Array) {
        a = new OG.geometry.Coordinate(a[0], a[1])
    }
    this._upperLeft = a;
    this._reset()
}, getUpperRight: function () {
    if (!this._upperRight) {
        this._upperRight = new OG.geometry.Coordinate(this._upperLeft.x + this._width, this._upperLeft.y)
    }
    return this._upperRight
}, getLowerRight: function () {
    if (!this._lowerRight) {
        this._lowerRight = new OG.geometry.Coordinate(this._upperLeft.x + this._width, this._upperLeft.y + this._height)
    }
    return this._lowerRight
}, getLowerLeft: function () {
    if (!this._lowerLeft) {
        this._lowerLeft = new OG.geometry.Coordinate(this._upperLeft.x, this._upperLeft.y + this._height)
    }
    return this._lowerLeft
}, getLeftCenter: function () {
    if (!this._leftCenter) {
        this._leftCenter = new OG.geometry.Coordinate(this._upperLeft.x, OG.Util.round(this._upperLeft.y + this._height / 2))
    }
    return this._leftCenter
}, getUpperCenter: function () {
    if (!this._upperCenter) {
        this._upperCenter = new OG.geometry.Coordinate(OG.Util.round(this._upperLeft.x + this._width / 2), this._upperLeft.y)
    }
    return this._upperCenter
}, getRightCenter: function () {
    if (!this._rightCenter) {
        this._rightCenter = new OG.geometry.Coordinate(this._upperLeft.x + this._width, OG.Util.round(this._upperLeft.y + this._height / 2))
    }
    return this._rightCenter
}, getLowerCenter: function () {
    if (!this._lowerCenter) {
        this._lowerCenter = new OG.geometry.Coordinate(OG.Util.round(this._upperLeft.x + this._width / 2), this._upperLeft.y + this._height)
    }
    return this._lowerCenter
}, getCentroid: function () {
    if (!this._centroid) {
        this._centroid = new OG.geometry.Coordinate(OG.Util.round(this._upperLeft.x + this._width / 2), OG.Util.round(this._upperLeft.y + this._height / 2))
    }
    return this._centroid
}, setCentroid: function (a) {
    if (a.constructor === Array) {
        a = new OG.geometry.Coordinate(a[0], a[1])
    }
    this.move(a.x - this.getCentroid().x, a.y - this.getCentroid().y)
}, getWidth: function () {
    return this._width
}, setWidth: function (a) {
    this._width = a;
    this._reset()
}, getHeight: function () {
    return this._height
}, setHeight: function (a) {
    this._height = a;
    this._reset()
}, getVertices: function () {
    var a = [];
    a.push(this.getUpperLeft());
    a.push(this.getUpperCenter());
    a.push(this.getUpperRight());
    a.push(this.getRightCenter());
    a.push(this.getLowerRight());
    a.push(this.getLowerCenter());
    a.push(this.getLowerLeft());
    a.push(this.getLeftCenter());
    a.push(this.getUpperLeft());
    return a
}, isContains: function (a) {
    if (a.constructor === Array) {
        return a[0] >= this._upperLeft.x && a[0] <= this.getLowerRight().x && a[1] >= this._upperLeft.y && a[1] <= this.getLowerRight().y
    } else {
        return a.x >= this._upperLeft.x && a.x <= this.getLowerRight().x && a.y >= this._upperLeft.y && a.y <= this.getLowerRight().y
    }
}, isContainsAll: function (b) {
    var a;
    for (a = 0; a < b.length; a++) {
        if (!this.isContains(b[a])) {
            return false
        }
    }
    return true
}, move: function (a, b) {
    this._upperLeft.move(a, b);
    this._reset();
    return this
}, resize: function (c, a, d, b) {
    c = c || 0;
    a = a || 0;
    d = d || 0;
    b = b || 0;
    if (this._width + (d + b) < 0 || this._height + (c + a) < 0) {
        throw new OG.ParamError()
    }
    this._upperLeft.move(-1 * d, -1 * c);
    this._width += (d + b);
    this._height += (c + a);
    this._reset();
    return this
}, isEquals: function (a) {
    if (a && a instanceof OG.geometry.Envelope) {
        if (this.getUpperLeft().isEquals(a.getUpperLeft()) && this.getWidth() === a.getWidth() && this.getHeight() === a.getHeight()) {
            return true
        }
    }
    return false
}, toString: function () {
    var a = [];
    a.push("upperLeft:" + this.getUpperLeft());
    a.push("width:" + this.getWidth());
    a.push("height:" + this.getHeight());
    a.push("upperRight:" + this.getUpperRight());
    a.push("lowerLeft:" + this.getLowerLeft());
    a.push("lowerRight:" + this.getLowerRight());
    a.push("leftCenter:" + this.getLeftCenter());
    a.push("upperCenter:" + this.getUpperCenter());
    a.push("rightCenter:" + this.getRightCenter());
    a.push("lowerCenter:" + this.getLowerCenter());
    a.push("centroid:" + this.getCentroid());
    return"{" + a.join() + "}"
}, _reset: function () {
    this._upperRight = null;
    this._lowerLeft = null;
    this._lowerRight = null;
    this._leftCenter = null;
    this._upperCenter = null;
    this._rightCenter = null;
    this._lowerCenter = null;
    this._centroid = null
}};
OG.geometry.Envelope.prototype.constructor = OG.geometry.Envelope;
OG.Envelope = OG.geometry.Envelope;
OG.geometry.Geometry = function () {
    this.TYPE = OG.Constants.GEOM_TYPE.NULL;
    this.IS_CLOSED = false;
    this.style = null;
    this.boundary = null
};
OG.geometry.Geometry.prototype = {isEquals: function (a) {
    return a && a.toString() === this.toString()
}, isContains: function (a) {
    throw new OG.NotImplementedException()
}, isWithin: function (a) {
    throw new OG.NotImplementedException()
}, getBoundary: function () {
    if (this.boundary === null) {
        var f, e, c, a, b, d, j, h = this.getVertices(), g;
        for (g = 0; g < h.length; g++) {
            if (g === 0) {
                f = c = h[g].x;
                e = a = h[g].y
            }
            f = h[g].x < f ? h[g].x : f;
            e = h[g].y < e ? h[g].y : e;
            c = h[g].x > c ? h[g].x : c;
            a = h[g].y > a ? h[g].y : a
        }
        b = new OG.geometry.Coordinate(f, e);
        d = c - f;
        j = a - e;
        this.boundary = new OG.geometry.Envelope(b, d, j)
    }
    return this.boundary
}, getCentroid: function () {
    return this.getBoundary().getCentroid()
}, getVertices: function () {
    throw new OG.NotImplementedException()
}, minDistance: function (c) {
    var d = Number.MAX_VALUE, e = 0, a = this.getVertices(), b;
    c = this.convertCoordinate(c);
    if (a.length === 1) {
        return c.distance(a[0])
    }
    for (b = 0; b < a.length - 1; b++) {
        e = this.distanceToLine(c, [a[b], a[b + 1]]);
        if (e < d) {
            d = e
        }
    }
    return d
}, distance: function (a) {
    return this.getCentroid().distance(a.getCentroid())
}, getLength: function () {
    var c = 0, a = this.getVertices(), b;
    for (b = 0; b < a.length - 1; b++) {
        c += a[b].distance(a[b + 1])
    }
    return c
}, move: function (a, b) {
    throw new OG.NotImplementedException()
}, moveCentroid: function (b) {
    var a = this.getCentroid();
    b = new OG.geometry.Coordinate(b);
    this.move(b.x - a.x, b.y - a.y)
}, resize: function (c, a, d, b) {
    throw new OG.NotImplementedException()
}, resizeBox: function (d, a) {
    var e = this.getBoundary(), c = OG.Util.round((d - e.getWidth()) / 2), b = OG.Util.round((a - e.getHeight()) / 2);
    this.resize(b, b, c, c);
    return this
}, rotate: function (b, a) {
    throw new OG.NotImplementedException()
}, fitToBoundary: function (e) {
    var f = this.getBoundary(), c = f.getUpperCenter().y - e.getUpperCenter().y, a = e.getLowerCenter().y - f.getLowerCenter().y, d = f.getLeftCenter().x - e.getLeftCenter().x, b = e.getRightCenter().x - f.getRightCenter().x;
    this.resize(c, a, d, b);
    return this
}, convertCoordinate: function (a) {
    if (a) {
        if (a.constructor === Array) {
            return new OG.geometry.Coordinate(a)
        } else {
            if (a instanceof OG.geometry.Coordinate) {
                return new OG.geometry.Coordinate(a.x, a.y)
            } else {
                throw new OG.ParamError()
            }
        }
    } else {
        return undefined
    }
}, distanceToLine: function (e, b) {
    var a = this.convertCoordinate(b[0]), f = this.convertCoordinate(b[1]), d, c;
    e = this.convertCoordinate(e);
    if (a.isEquals(f)) {
        return e.distance(a)
    }
    d = ((e.x - a.x) * (f.x - a.x) + (e.y - a.y) * (f.y - a.y)) / ((f.x - a.x) * (f.x - a.x) + (f.y - a.y) * (f.y - a.y));
    if (d <= 0) {
        return e.distance(a)
    }
    if (d >= 1) {
        return e.distance(f)
    }
    c = ((a.y - e.y) * (f.x - a.x) - (a.x - e.x) * (f.y - a.y)) / ((f.x - a.x) * (f.x - a.x) + (f.y - a.y) * (f.y - a.y));
    return OG.Util.round(Math.abs(c) * Math.sqrt(((f.x - a.x) * (f.x - a.x) + (f.y - a.y) * (f.y - a.y))))
}, distanceLineToLine: function (i, g) {
    var f = this.convertCoordinate(i[0]), e = this.convertCoordinate(i[1]), d = this.convertCoordinate(g[0]), b = this.convertCoordinate(g[1]), c, k, j, h, l, a;
    if (f.isEquals(e)) {
        return this.distanceToLine(f, [d, b])
    }
    if (d.isEquals(b)) {
        return this.distanceToLine(b, [f, e])
    }
    c = (f.y - d.y) * (b.x - d.x) - (f.x - d.x) * (b.y - d.y);
    k = (e.x - f.x) * (b.y - d.y) - (e.y - f.y) * (b.x - d.x);
    j = (f.y - d.y) * (e.x - f.x) - (f.x - d.x) * (e.y - f.y);
    h = (e.x - f.x) * (b.y - d.y) - (e.y - f.y) * (b.x - d.x);
    if ((k === 0) || (h === 0)) {
        return Math.min(this.distanceToLine(f, [d, b]), Math.min(this.distanceToLine(e, [d, b]), Math.min(this.distanceToLine(d, [f, e]), this.distanceToLine(b, [f, e]))))
    }
    l = j / h;
    a = c / k;
    if ((a < 0) || (a > 1) || (l < 0) || (l > 1)) {
        return Math.min(this.distanceToLine(f, [d, b]), Math.min(this.distanceToLine(e, [d, b]), Math.min(this.distanceToLine(d, [f, e]), this.distanceToLine(b, [f, e]))))
    }
    return 0
}, intersectToLine: function (c) {
    var d = this.getVertices(), b = [], a, f, e = function (h, i) {
        var g;
        for (g = 0; g < h.length; g++) {
            if (h[g].isEquals(i)) {
                return true
            }
        }
        return false
    };
    for (f = 0; f < d.length - 1; f++) {
        a = this.intersectLineToLine(c, [d[f], d[f + 1]]);
        if (a && !e(b, a)) {
            b.push(a)
        }
    }
    return b
}, intersectLineToLine: function (j, h) {
    var f = this.convertCoordinate(j[0]), e = this.convertCoordinate(j[1]), d = this.convertCoordinate(h[0]), c = this.convertCoordinate(h[1]), n, g, b, l, k, i, a, m;
    if (f.isEquals(e)) {
        return this.distanceToLine(f, [d, c]) === 0 ? f : undefined
    }
    if (d.isEquals(c)) {
        return this.distanceToLine(d, [f, e]) === 0 ? d : undefined
    }
    b = (f.y - d.y) * (c.x - d.x) - (f.x - d.x) * (c.y - d.y);
    l = (e.x - f.x) * (c.y - d.y) - (e.y - f.y) * (c.x - d.x);
    k = (f.y - d.y) * (e.x - f.x) - (f.x - d.x) * (e.y - f.y);
    i = (e.x - f.x) * (c.y - d.y) - (e.y - f.y) * (c.x - d.x);
    if (l !== 0 && i !== 0) {
        a = b / l;
        m = k / i;
        if (0 <= a && a <= 1 && 0 <= m && m <= 1) {
            g = "Intersection";
            n = new OG.Coordinate(OG.Util.round(f.x + a * (e.x - f.x)), OG.Util.round(f.y + a * (e.y - f.y)))
        } else {
            g = "No Intersection"
        }
    } else {
        if (b === 0 || k === 0) {
            g = "Coincident"
        } else {
            g = "Parallel"
        }
    }
    return n
}, intersectCircleToLine: function (c, j, o, p) {
    var q = [], n = (p.x - o.x) * (p.x - o.x) + (p.y - o.y) * (p.y - o.y), m = 2 * ((p.x - o.x) * (o.x - c.x) + (p.y - o.y) * (o.y - c.y)), i = c.x * c.x + c.y * c.y + o.x * o.x + o.y * o.y - 2 * (c.x * o.x + c.y * o.y) - j * j, d = m * m - 4 * n * i, l, h = function (e, b, a) {
        return new OG.Coordinate(OG.Util.round(e.x + (b.x - e.x) * a), OG.Util.round(e.y + (b.y - e.y) * a))
    }, k, g, f;
    if (d < 0) {
        l = "Outside"
    } else {
        if (d === 0) {
            l = "Tangent"
        } else {
            k = Math.sqrt(d);
            g = (-m + k) / (2 * n);
            f = (-m - k) / (2 * n);
            if ((g < 0 || g > 1) && (f < 0 || f > 1)) {
                if ((g < 0 && f < 0) || (g > 1 && f > 1)) {
                    l = "Outside"
                } else {
                    l = "Inside"
                }
            } else {
                l = "Intersection";
                if (0 <= g && g <= 1) {
                    q.push(h(o, p, g))
                }
                if (0 <= f && f <= 1) {
                    q.push(h(o, p, f))
                }
            }
        }
    }
    return q
}, reset: function () {
    this.boundary = null
}};
OG.geometry.Geometry.prototype.constructor = OG.geometry.Geometry;
OG.geometry.GeometryCollection = function (a) {
    this.TYPE = OG.Constants.GEOM_TYPE.COLLECTION;
    this.style = new OG.geometry.Style();
    this.geometries = a
};
OG.geometry.GeometryCollection.prototype = new OG.geometry.Geometry();
OG.geometry.GeometryCollection.superclass = OG.geometry.Geometry;
OG.geometry.GeometryCollection.prototype.constructor = OG.geometry.GeometryCollection;
OG.GeometryCollection = OG.geometry.GeometryCollection;
OG.geometry.GeometryCollection.prototype.getVertices = function () {
    var b = [], d, c, a;
    for (c = 0; c < this.geometries.length; c++) {
        d = this.geometries[c].getVertices();
        for (a = 0; a < d.length; a++) {
            b.push(d[a])
        }
    }
    return b
};
OG.geometry.GeometryCollection.prototype.move = function (a, c) {
    var b;
    this.getBoundary().move(a, c);
    for (b = 0; b < this.geometries.length; b++) {
        this.geometries[b].move(a, c);
        this.geometries[b].reset()
    }
    return this
};
OG.geometry.GeometryCollection.prototype.resize = function (o, h, d, p) {
    var c = this.getBoundary(), k = d + p, g = o + h, b = c.getWidth() + k, q = c.getHeight() + g, n = c.getWidth() === 0 ? 1 : b / c.getWidth(), m = c.getHeight() === 0 ? 1 : q / c.getHeight(), a = c.getUpperLeft(), l, f, e;
    if (b < 0 || q < 0) {
        throw new OG.ParamError()
    }
    for (f = 0; f < this.geometries.length; f++) {
        l = this.geometries[f].vertices;
        for (e = 0; e < l.length; e++) {
            l[e].x = OG.Util.round((a.x - d) + (l[e].x - a.x) * n);
            l[e].y = OG.Util.round((a.y - o) + (l[e].y - a.y) * m)
        }
        this.geometries[f].reset()
    }
    c.resize(o, h, d, p);
    return this
};
OG.geometry.GeometryCollection.prototype.resizeBox = function (d, a) {
    var e = this.getBoundary(), c = OG.Util.round((d - e.getWidth()) / 2), b = OG.Util.round((a - e.getHeight()) / 2);
    this.resize(b, b, c, c);
    return this
};
OG.geometry.GeometryCollection.prototype.rotate = function (c, a) {
    var b;
    a = a || this.getCentroid();
    for (b = 0; b < this.geometries.length; b++) {
        this.geometries[b].rotate(c, a);
        this.geometries[b].reset()
    }
    this.reset();
    return this
};
OG.geometry.GeometryCollection.prototype.fitToBoundary = function (e) {
    var f = this.getBoundary(), c = f.getUpperCenter().y - e.getUpperCenter().y, a = e.getLowerCenter().y - f.getLowerCenter().y, d = f.getLeftCenter().x - e.getLeftCenter().x, b = e.getRightCenter().x - f.getRightCenter().x;
    this.resize(c, a, d, b);
    return this
};
OG.geometry.GeometryCollection.prototype.toString = function () {
    var b = [], a;
    for (a = 0; a < this.geometries.length; a++) {
        b.push(this.geometries[a].toString())
    }
    return"{type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "',geometries:[" + b.join() + "]}"
};
OG.geometry.PolyLine = function (a) {
    var b;
    this.TYPE = OG.Constants.GEOM_TYPE.POLYLINE;
    this.style = new OG.geometry.Style();
    this.vertices = [];
    if (a && a.length > 0) {
        for (b = 0; b < a.length; b++) {
            this.vertices.push(this.convertCoordinate(a[b]))
        }
    }
};
OG.geometry.PolyLine.prototype = new OG.geometry.Geometry();
OG.geometry.PolyLine.superclass = OG.geometry.Geometry;
OG.geometry.PolyLine.prototype.constructor = OG.geometry.PolyLine;
OG.PolyLine = OG.geometry.PolyLine;
OG.geometry.PolyLine.prototype.getVertices = function () {
    return this.vertices
};
OG.geometry.PolyLine.prototype.move = function (a, c) {
    var b;
    this.getBoundary().move(a, c);
    for (b = 0; b < this.vertices.length; b++) {
        this.vertices[b].move(a, c)
    }
    return this
};
OG.geometry.PolyLine.prototype.resize = function (l, g, d, m) {
    var c = this.getBoundary(), h = d + m, f = l + g, b = c.getWidth() + h, n = c.getHeight() + f, k = c.getWidth() === 0 ? 1 : b / c.getWidth(), j = c.getHeight() === 0 ? 1 : n / c.getHeight(), a = c.getUpperLeft(), e;
    if (b < 0 || n < 0) {
        throw new OG.ParamError()
    }
    for (e = 0; e < this.vertices.length; e++) {
        this.vertices[e].x = OG.Util.round((a.x - d) + (this.vertices[e].x - a.x) * k);
        this.vertices[e].y = OG.Util.round((a.y - l) + (this.vertices[e].y - a.y) * j)
    }
    c.resize(l, g, d, m);
    return this
};
OG.geometry.PolyLine.prototype.rotate = function (c, a) {
    var b;
    a = a || this.getCentroid();
    for (b = 0; b < this.vertices.length; b++) {
        this.vertices[b].rotate(c, a)
    }
    this.reset();
    return this
};
OG.geometry.PolyLine.prototype.toString = function () {
    var a = [];
    a.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
    a.push("vertices:[" + this.vertices + "]");
    return"{" + a.join() + "}"
};
OG.geometry.Curve = function (controlPoints) {
    OG.geometry.Curve.superclass.call(this, controlPoints);
    var t, cmRomSpline = OG.CurveUtil.CatmullRomSpline(eval("[" + this.vertices.toString() + "]"));
    this.vertices = [];
    for (t = 0; t <= cmRomSpline.maxT; t += 0.1) {
        this.vertices.push(new OG.geometry.Coordinate(OG.Util.round(cmRomSpline.getX(t)), OG.Util.round(cmRomSpline.getY(t))))
    }
    this.TYPE = OG.Constants.GEOM_TYPE.CURVE;
    this.style = new OG.geometry.Style()
};
OG.geometry.Curve.prototype = new OG.geometry.PolyLine();
OG.geometry.Curve.superclass = OG.geometry.PolyLine;
OG.geometry.Curve.prototype.constructor = OG.geometry.Curve;
OG.Curve = OG.geometry.Curve;
OG.geometry.Curve.prototype.getControlPoints = function () {
    var a = [], b;
    for (b = 10; b <= this.vertices.length - 10; b += 10) {
        a.push(this.vertices[b])
    }
    return a
};
OG.geometry.Curve.prototype.getVertices = function () {
    var a = [], b;
    for (b = 10; b <= this.vertices.length - 10; b++) {
        a.push(this.vertices[b])
    }
    return a
};
OG.geometry.Curve.prototype.toString = function () {
    var a = [];
    a.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
    a.push("vertices:[" + this.getVertices() + "]");
    a.push("controlPoints:[" + this.getControlPoints() + "]");
    return"{" + a.join() + "}"
};
OG.geometry.Ellipse = function (a, c, b, e) {
    var g = e || 0, h = this.convertCoordinate(a), j = [], d, f;
    if (h) {
        for (f = -45; f <= 405; f += 45) {
            d = Math.PI / 180 * f;
            j.push((new OG.geometry.Coordinate(OG.Util.round(h.x + c * Math.cos(d)), OG.Util.round(h.y + b * Math.sin(d)))).rotate(g, h))
        }
    }
    OG.geometry.Ellipse.superclass.call(this, j);
    this.TYPE = OG.Constants.GEOM_TYPE.ELLIPSE;
    this.IS_CLOSED = true;
    this.style = new OG.geometry.Style()
};
OG.geometry.Ellipse.prototype = new OG.geometry.Curve();
OG.geometry.Ellipse.superclass = OG.geometry.Curve;
OG.geometry.Ellipse.prototype.constructor = OG.geometry.Ellipse;
OG.Ellipse = OG.geometry.Ellipse;
OG.geometry.Ellipse.prototype.getVertices = function () {
    var a = [], b;
    for (b = 20; b < this.vertices.length - 20; b++) {
        a.push(this.vertices[b])
    }
    return a
};
OG.geometry.Ellipse.prototype.getControlPoints = function () {
    var a = [], b;
    for (b = 10; b <= this.vertices.length - 10; b += 10) {
        a.push(this.vertices[b])
    }
    return a
};
OG.geometry.Ellipse.prototype.getLength = function () {
    var b = this.getControlPoints(), a = this.getCentroid(), d = a.distance(b[1]), c = a.distance(b[3]);
    return Math.PI * (5 * (d + c) / 4 - d * c / (d + c))
};
OG.geometry.Ellipse.prototype.toString = function () {
    var c = [], b = this.getControlPoints(), a = this.getCentroid(), f = a.distance(b[1]), d = a.distance(b[3]), e = OG.Util.round(Math.atan2(b[1].y - a.y, b[1].x - a.x) * 180 / Math.PI);
    c.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
    c.push("center:" + a);
    c.push("radiusX:" + f);
    c.push("radiusY:" + d);
    c.push("angle:" + e);
    return"{" + c.join() + "}"
};
OG.geometry.BezierCurve = function (controlPoints) {
    var bezier, t, i;
    if (!controlPoints && controlPoints.length !== 4) {
        throw new OG.ParamError()
    }
    this.controlPoints = [];
    if (controlPoints && controlPoints.length > 0) {
        for (i = 0; i < controlPoints.length; i++) {
            this.controlPoints.push(this.convertCoordinate(controlPoints[i]))
        }
    }
    bezier = OG.CurveUtil.Bezier(eval("[" + this.controlPoints.toString() + "]"));
    this.vertices = [];
    for (t = 0; t <= bezier.maxT; t += 0.02) {
        this.vertices.push(new OG.geometry.Coordinate(OG.Util.round(bezier.getX(t)), OG.Util.round(bezier.getY(t))))
    }
    this.TYPE = OG.Constants.GEOM_TYPE.BEZIER_CURVE;
    this.style = new OG.geometry.Style()
};
OG.geometry.BezierCurve.prototype = new OG.geometry.PolyLine();
OG.geometry.BezierCurve.superclass = OG.geometry.PolyLine;
OG.geometry.BezierCurve.prototype.constructor = OG.geometry.BezierCurve;
OG.BezierCurve = OG.geometry.BezierCurve;
OG.geometry.BezierCurve.prototype.getControlPoints = function () {
    return this.controlPoints
};
OG.geometry.BezierCurve.prototype.getVertices = function () {
    var bezier, t, i;
    if (!this.vertices) {
        bezier = OG.CurveUtil.Bezier(eval("[" + this.controlPoints.toString() + "]"));
        this.vertices = [];
        for (t = 0; t <= bezier.maxT; t += 0.02) {
            this.vertices.push(new OG.geometry.Coordinate(OG.Util.round(bezier.getX(t)), OG.Util.round(bezier.getY(t))))
        }
    }
    return this.vertices
};
OG.geometry.BezierCurve.prototype.move = function (a, c) {
    var b;
    for (b = 0; b < this.controlPoints.length; b++) {
        this.controlPoints[b].move(a, c)
    }
    this.reset();
    return this
};
OG.geometry.BezierCurve.prototype.resize = function (c, a, d, b) {
    throw new OG.NotSupportedException("OG.geometry.BezierCurve.resize() Not Supported!")
};
OG.geometry.BezierCurve.prototype.rotate = function (c, a) {
    var b;
    a = a || this.getCentroid();
    for (b = 0; b < this.controlPoints.length; b++) {
        this.controlPoints[b].rotate(c, a)
    }
    this.reset();
    return this
};
OG.geometry.BezierCurve.prototype.toString = function () {
    var a = [];
    a.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
    a.push("vertices:[" + this.getVertices() + "]");
    a.push("controlPoints:[" + this.getControlPoints() + "]");
    return"{" + a.join() + "}"
};
OG.geometry.BezierCurve.prototype.reset = function () {
    this.boundary = null;
    this.vertices = null
};
OG.geometry.Circle = function (b, a) {
    OG.geometry.Circle.superclass.call(this, b, a, a, 0);
    this.TYPE = OG.Constants.GEOM_TYPE.CIRCLE;
    this.style = new OG.geometry.Style()
};
OG.geometry.Circle.prototype = new OG.geometry.Ellipse();
OG.geometry.Circle.superclass = OG.geometry.Ellipse;
OG.geometry.Circle.prototype.constructor = OG.geometry.Circle;
OG.Circle = OG.geometry.Circle;
OG.geometry.Circle.prototype.getLength = function () {
    var b = this.getControlPoints(), a = this.getCentroid(), c = a.distance(b[1]);
    return 2 * Math.PI * c
};
OG.geometry.Circle.prototype.toString = function () {
    var c = [], b = this.getControlPoints(), a = this.getCentroid(), f = a.distance(b[1]), d = a.distance(b[3]), e = OG.Util.round(Math.atan2(b[1].y - a.y, b[1].x - a.x) * 180 / Math.PI);
    if (f === d) {
        c.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
        c.push("center:" + a);
        c.push("radius:" + f)
    } else {
        c.push("type:'" + OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.ELLIPSE] + "'");
        c.push("center:" + a);
        c.push("radiusX:" + f);
        c.push("radiusY:" + d);
        c.push("angle:" + e)
    }
    return"{" + c.join() + "}"
};
OG.geometry.Line = function (d, c) {
    var b = this.convertCoordinate(d), a = this.convertCoordinate(c);
    OG.geometry.Line.superclass.call(this, [
        [b.x, b.y],
        [a.x, a.y]
    ]);
    this.TYPE = OG.Constants.GEOM_TYPE.LINE;
    this.style = new OG.geometry.Style()
};
OG.geometry.Line.prototype = new OG.geometry.PolyLine();
OG.geometry.Line.superclass = OG.geometry.PolyLine;
OG.geometry.Line.prototype.constructor = OG.geometry.Line;
OG.Line = OG.geometry.Line;
OG.geometry.Line.prototype.toString = function () {
    var a = [];
    a.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
    a.push("from:" + this.vertices[0]);
    a.push("to:" + this.vertices[1]);
    return"{" + a.join() + "}"
};
OG.geometry.Point = function (a) {
    this.TYPE = OG.Constants.GEOM_TYPE.POINT;
    this.style = new OG.geometry.Style();
    this.coordinate = this.convertCoordinate(a);
    this.vertices = [this.coordinate]
};
OG.geometry.Point.prototype = new OG.geometry.Geometry();
OG.geometry.Point.superclass = OG.geometry.Geometry;
OG.geometry.Point.prototype.constructor = OG.geometry.Point;
OG.Point = OG.geometry.Point;
OG.geometry.Point.prototype.getVertices = function () {
    return this.vertices
};
OG.geometry.Point.prototype.move = function (a, b) {
    this.getBoundary().move(a, b);
    this.coordinate.move(a, b);
    this.vertices = [this.coordinate];
    return this
};
OG.geometry.Point.prototype.moveCentroid = function (a) {
    this.getBoundary().setUpperLeft(a);
    this.coordinate = new OG.geometry.Coordinate(a);
    this.vertices = [this.coordinate]
};
OG.geometry.Point.prototype.resize = function (c, a, d, b) {
    var e = this.getBoundary();
    e.resize(c, a, d, b);
    this.coordinate = e.getCentroid();
    this.vertices = [this.coordinate];
    this.boundary = new OG.Envelope(this.coordinate, 0, 0);
    return this
};
OG.geometry.Point.prototype.resizeBox = function (b, a) {
    return this
};
OG.geometry.Point.prototype.rotate = function (b, a) {
    a = a || this.getCentroid();
    this.coordinate.rotate(b, a);
    this.vertices = [this.coordinate];
    this.reset();
    return this
};
OG.geometry.Point.prototype.fitToBoundary = function (a) {
    this.coordinate = a.getCentroid();
    this.vertices = [this.coordinate];
    this.boundary = new OG.Envelope(this.coordinate, 0, 0);
    return this
};
OG.geometry.Point.prototype.toString = function () {
    var a = [];
    a.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
    a.push("coordinate:" + this.coordinate);
    return"{" + a.join() + "}"
};
OG.geometry.Polygon = function (a) {
    OG.geometry.Polygon.superclass.call(this, a);
    if (this.vertices.length > 0 && !this.vertices[0].isEquals(this.vertices[this.vertices.length - 1])) {
        this.vertices.push(new OG.geometry.Coordinate(this.vertices[0].x, this.vertices[0].y))
    }
    this.TYPE = OG.Constants.GEOM_TYPE.POLYGON;
    this.IS_CLOSED = true;
    this.style = new OG.geometry.Style()
};
OG.geometry.Polygon.prototype = new OG.geometry.PolyLine();
OG.geometry.Polygon.superclass = OG.geometry.PolyLine;
OG.geometry.Polygon.prototype.constructor = OG.geometry.Polygon;
OG.Polygon = OG.geometry.Polygon;
OG.geometry.Rectangle = function (c, d, a) {
    var b = this.convertCoordinate(c), e = this.convertCoordinate([b.x + d, b.y + a]);
    if (b.x > e.x || b.y > e.y) {
        throw new OG.ParamError()
    }
    OG.geometry.Rectangle.superclass.call(this, [
        [b.x, b.y],
        [b.x + (e.x - b.x), b.y],
        [e.x, e.y],
        [b.x, b.y + (e.y - b.y)],
        [b.x, b.y]
    ]);
    this.TYPE = OG.Constants.GEOM_TYPE.RECTANGLE;
    this.style = new OG.geometry.Style()
};
OG.geometry.Rectangle.prototype = new OG.geometry.Polygon();
OG.geometry.Rectangle.superclass = OG.geometry.Polygon;
OG.geometry.Rectangle.prototype.constructor = OG.geometry.Rectangle;
OG.Rectangle = OG.geometry.Rectangle;
OG.geometry.Rectangle.prototype.toString = function () {
    var a = [], b = OG.Util.round(Math.atan2(this.vertices[1].y - this.vertices[0].y, this.vertices[1].x - this.vertices[0].x) * 180 / Math.PI);
    a.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
    a.push("upperLeft:" + this.vertices[0]);
    a.push("width:" + (this.vertices[0].distance(this.vertices[1])));
    a.push("height:" + (this.vertices[0].distance(this.vertices[3])));
    a.push("angle:" + b);
    return"{" + a.join() + "}"
};
OG.shape.IShape = function () {
    this.TYPE = null;
    this.SHAPE_ID = null;
    this.geom = null;
    this.label = null;
    this.isCollapsed = false;
    this.SELECTABLE = true;
    this.MOVABLE = true;
    this.RESIZABLE = true;
    this.CONNECTABLE = true;
    this.SELF_CONNECTABLE = true;
    this.CONNECT_CLONEABLE = true;
    this.CONNECT_REQUIRED = true;
    this.LABEL_EDITABLE = true
};
OG.shape.IShape.prototype = {createTerminal: function () {
    if (!this.geom) {
        return[]
    }
    var a = this.geom.getBoundary();
    return[new OG.Terminal(a.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.INOUT), new OG.Terminal(a.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.INOUT), new OG.Terminal(a.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.INOUT), new OG.Terminal(a.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.INOUT), new OG.Terminal(a.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.INOUT)]
}, createShape: function () {
    throw new OG.NotImplementedException("OG.shape.IShape.createShape")
}, clone: function () {
    throw new OG.NotImplementedException("OG.shape.IShape.clone")
}};
OG.shape.IShape.prototype.constructor = OG.shape.IShape;
OG.IShape = OG.shape.IShape;
OG.shape.Terminal = function (a, c, b) {
    this.position = a;
    this.direction = c || OG.Constants.TERMINAL_TYPE.E;
    this.inout = b || OG.Constants.TERMINAL_TYPE.INOUT
};
OG.shape.Terminal.prototype = new OG.shape.Terminal();
OG.shape.Terminal.prototype.constructor = OG.shape.Terminal;
OG.Terminal = OG.shape.Terminal;
OG.shape.GeomShape = function () {
    OG.shape.GeomShape.superclass.call(this);
    this.TYPE = OG.Constants.SHAPE_TYPE.GEOM
};
OG.shape.GeomShape.prototype = new OG.shape.IShape();
OG.shape.GeomShape.superclass = OG.shape.IShape;
OG.shape.GeomShape.prototype.constructor = OG.shape.GeomShape;
OG.GeomShape = OG.shape.GeomShape;
OG.shape.GeomShape.prototype.clone = function () {
    var shape = eval("new " + this.SHAPE_ID + "()");
    shape.label = this.label;
    return shape
};
OG.shape.TextShape = function (a) {
    OG.shape.TextShape.superclass.call(this);
    this.TYPE = OG.Constants.SHAPE_TYPE.TEXT;
    this.SHAPE_ID = "OG.shape.TextShape";
    this.text = a || "Text Here";
    this.angle = 0
};
OG.shape.TextShape.prototype = new OG.shape.IShape();
OG.shape.TextShape.superclass = OG.shape.IShape;
OG.shape.TextShape.prototype.constructor = OG.shape.TextShape;
OG.TextShape = OG.shape.TextShape;
OG.shape.TextShape.prototype.createShape = function () {
    return this.text
};
OG.shape.TextShape.prototype.createTerminal = function () {
    return[]
};
OG.shape.TextShape.prototype.clone = function () {
    var shape = eval("new " + this.SHAPE_ID + "()");
    shape.text = this.text;
    shape.angle = this.angle;
    return shape
};
OG.shape.ImageShape = function (b, a) {
    OG.shape.ImageShape.superclass.call(this);
    this.TYPE = OG.Constants.SHAPE_TYPE.IMAGE;
    this.SHAPE_ID = "OG.shape.ImageShape";
    this.label = a;
    this.image = b;
    this.angle = 0
};
OG.shape.ImageShape.prototype = new OG.shape.IShape();
OG.shape.ImageShape.superclass = OG.shape.IShape;
OG.shape.ImageShape.prototype.constructor = OG.shape.ImageShape;
OG.ImageShape = OG.shape.ImageShape;
OG.shape.ImageShape.prototype.createShape = function () {
    return this.image
};
OG.shape.ImageShape.prototype.clone = function () {
    var shape = eval("new " + this.SHAPE_ID + "()");
    shape.image = this.image;
    shape.label = this.label;
    shape.angle = this.angle;
    return shape
};
OG.shape.EdgeShape = function (e, d, a, b, c) {
    OG.shape.EdgeShape.superclass.call(this);
    this.TYPE = OG.Constants.SHAPE_TYPE.EDGE;
    this.SHAPE_ID = "OG.shape.EdgeShape";
    this.from = e;
    this.to = d;
    this.label = a;
    this.fromLabel = b;
    this.toLabel = c
};
OG.shape.EdgeShape.prototype = new OG.shape.IShape();
OG.shape.EdgeShape.superclass = OG.shape.IShape;
OG.shape.EdgeShape.prototype.constructor = OG.shape.EdgeShape;
OG.EdgeShape = OG.shape.EdgeShape;
OG.shape.EdgeShape.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.Line(this.from, this.to);
    return this.geom
};
OG.shape.EdgeShape.prototype.createTerminal = function () {
    return[]
};
OG.shape.EdgeShape.prototype.clone = function () {
    var shape = eval("new " + this.SHAPE_ID + "()");
    shape.from = this.from;
    shape.to = this.to;
    shape.label = this.label;
    shape.fromLabel = this.fromLabel;
    shape.toLabel = this.toLabel;
    return shape
};
OG.shape.CircleShape = function (a) {
    OG.shape.CircleShape.superclass.call(this);
    this.SHAPE_ID = "OG.shape.CircleShape";
    this.label = a
};
OG.shape.CircleShape.prototype = new OG.shape.GeomShape();
OG.shape.CircleShape.superclass = OG.shape.GeomShape;
OG.shape.CircleShape.prototype.constructor = OG.shape.CircleShape;
OG.CircleShape = OG.shape.CircleShape;
OG.shape.CircleShape.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.geometry.Circle([50, 50], 50);
    return this.geom
};
OG.shape.EllipseShape = function (a) {
    OG.shape.EllipseShape.superclass.call(this);
    this.SHAPE_ID = "OG.shape.EllipseShape";
    this.label = a
};
OG.shape.EllipseShape.prototype = new OG.shape.GeomShape();
OG.shape.EllipseShape.superclass = OG.shape.GeomShape;
OG.shape.EllipseShape.prototype.constructor = OG.shape.EllipseShape;
OG.EllipseShape = OG.shape.EllipseShape;
OG.shape.EllipseShape.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.geometry.Ellipse([50, 50], 50, 30);
    return this.geom
};
OG.shape.GroupShape = function (a) {
    OG.shape.GroupShape.superclass.call(this);
    this.TYPE = OG.Constants.SHAPE_TYPE.GROUP;
    this.SHAPE_ID = "OG.shape.GroupShape";
    this.label = a;
    this.CONNECTABLE = false;
    this.SELF_CONNECTABLE = false;
    this.GROUP_DROPABLE = true;
    this.GROUP_COLLAPSIBLE = true
};
OG.shape.GroupShape.prototype = new OG.shape.IShape();
OG.shape.GroupShape.superclass = OG.shape.IShape;
OG.shape.GroupShape.prototype.constructor = OG.shape.GroupShape;
OG.GroupShape = OG.shape.GroupShape;
OG.shape.GroupShape.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    this.geom.style = new OG.geometry.Style({stroke: "none"});
    return this.geom
};
OG.shape.GroupShape.prototype.clone = function () {
    var shape = eval("new " + this.SHAPE_ID + "()");
    shape.label = this.label;
    return shape
};
OG.shape.HorizontalLaneShape = function (a) {
    OG.shape.HorizontalLaneShape.superclass.call(this, a);
    this.SHAPE_ID = "OG.shape.HorizontalLaneShape"
};
OG.shape.HorizontalLaneShape.prototype = new OG.shape.GroupShape();
OG.shape.HorizontalLaneShape.superclass = OG.shape.GroupShape;
OG.shape.HorizontalLaneShape.prototype.constructor = OG.shape.HorizontalLaneShape;
OG.HorizontalLaneShape = OG.shape.HorizontalLaneShape;
OG.shape.HorizontalLaneShape.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    this.geom.style = new OG.geometry.Style({"label-direction": "vertical", "vertical-align": "top"});
    return this.geom
};
OG.shape.HtmlShape = function (b, a) {
    OG.shape.HtmlShape.superclass.call(this);
    this.TYPE = OG.Constants.SHAPE_TYPE.HTML;
    this.SHAPE_ID = "OG.shape.HtmlShape";
    this.label = a;
    this.html = b || "";
    this.angle = 0
};
OG.shape.HtmlShape.prototype = new OG.shape.IShape();
OG.shape.HtmlShape.superclass = OG.shape.IShape;
OG.shape.HtmlShape.prototype.constructor = OG.shape.HtmlShape;
OG.HtmlShape = OG.shape.HtmlShape;
OG.shape.HtmlShape.prototype.createShape = function () {
    return this.html
};
OG.shape.HtmlShape.prototype.clone = function () {
    var shape = eval("new " + this.SHAPE_ID + "()");
    shape.html = this.html;
    shape.label = this.label;
    shape.angle = this.angle;
    return shape
};
OG.shape.RectangleShape = function (a) {
    OG.shape.RectangleShape.superclass.call(this);
    this.SHAPE_ID = "OG.shape.RectangleShape";
    this.label = a
};
OG.shape.RectangleShape.prototype = new OG.shape.GeomShape();
OG.shape.RectangleShape.superclass = OG.shape.GeomShape;
OG.shape.RectangleShape.prototype.constructor = OG.shape.RectangleShape;
OG.RectangleShape = OG.shape.RectangleShape;
OG.shape.RectangleShape.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    return this.geom
};
OG.shape.VerticalLaneShape = function (a) {
    OG.shape.VerticalLaneShape.superclass.call(this, a);
    this.SHAPE_ID = "OG.shape.VerticalLaneShape"
};
OG.shape.VerticalLaneShape.prototype = new OG.shape.GroupShape();
OG.shape.VerticalLaneShape.superclass = OG.shape.GroupShape;
OG.shape.VerticalLaneShape.prototype.constructor = OG.shape.VerticalLaneShape;
OG.VerticalLaneShape = OG.shape.VerticalLaneShape;
OG.shape.VerticalLaneShape.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    this.geom.style = new OG.geometry.Style({"label-direction": "horizontal", "vertical-align": "top"});
    return this.geom
};
OG.shape.bpmn.A_Subprocess = function (a) {
    OG.shape.bpmn.A_Subprocess.superclass.call(this, a);
    this.SHAPE_ID = "OG.shape.bpmn.A_Subprocess"
};
OG.shape.bpmn.A_Subprocess.prototype = new OG.shape.GroupShape();
OG.shape.bpmn.A_Subprocess.superclass = OG.shape.GroupShape;
OG.shape.bpmn.A_Subprocess.prototype.constructor = OG.shape.bpmn.A_Subprocess;
OG.A_Subprocess = OG.shape.bpmn.A_Subprocess;
OG.shape.bpmn.A_Subprocess.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    this.geom.style = new OG.geometry.Style({stroke: "black", r: 6});
    return this.geom
};
OG.shape.bpmn.A_Task = function (a) {
    OG.shape.bpmn.A_Task.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.A_Task";
    this.label = a
};
OG.shape.bpmn.A_Task.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.A_Task.superclass = OG.shape.GeomShape;
OG.shape.bpmn.A_Task.prototype.constructor = OG.shape.bpmn.A_Task;
OG.A_Task = OG.shape.bpmn.A_Task;
OG.shape.bpmn.A_Task.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    this.geom.style = new OG.geometry.Style({r: 6});
    return this.geom
};
OG.shape.bpmn.C_Association = function (c, b, a) {
    OG.shape.bpmn.C_Association.superclass.call(this, c, b, a);
    this.SHAPE_ID = "OG.shape.bpmn.C_Association"
};
OG.shape.bpmn.C_Association.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_Association.superclass = OG.shape.EdgeShape;
OG.shape.bpmn.C_Association.prototype.constructor = OG.shape.bpmn.C_Association;
OG.C_Association = OG.shape.bpmn.C_Association;
OG.shape.bpmn.C_Association.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.Line(this.from || [0, 0], this.to || [70, 0]);
    this.geom.style = new OG.geometry.Style({"edge-type": "straight", "arrow-start": "none", "arrow-end": "none", "stroke-dasharray": "."});
    return this.geom
};
OG.shape.bpmn.C_Conditional = function (c, b, a) {
    OG.shape.bpmn.C_Conditional.superclass.call(this, c, b, a);
    this.SHAPE_ID = "OG.shape.bpmn.C_Conditional"
};
OG.shape.bpmn.C_Conditional.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_Conditional.superclass = OG.shape.EdgeShape;
OG.shape.bpmn.C_Conditional.prototype.constructor = OG.shape.bpmn.C_Conditional;
OG.C_Conditional = OG.shape.bpmn.C_Conditional;
OG.shape.bpmn.C_Conditional.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.Line(this.from || [0, 0], this.to || [70, 0]);
    this.geom.style = new OG.geometry.Style({"edge-type": "straight", "arrow-start": "open_diamond-wide-long", "arrow-end": "open_block-wide-long"});
    return this.geom
};
OG.shape.bpmn.C_DataAssociation = function (c, b, a) {
    OG.shape.bpmn.C_DataAssociation.superclass.call(this, c, b, a);
    this.SHAPE_ID = "OG.shape.bpmn.C_DataAssociation"
};
OG.shape.bpmn.C_DataAssociation.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_DataAssociation.superclass = OG.shape.EdgeShape;
OG.shape.bpmn.C_DataAssociation.prototype.constructor = OG.shape.bpmn.C_DataAssociation;
OG.C_DataAssociation = OG.shape.bpmn.C_DataAssociation;
OG.shape.bpmn.C_DataAssociation.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.Line(this.from || [0, 0], this.to || [70, 0]);
    this.geom.style = new OG.geometry.Style({"edge-type": "straight", "arrow-start": "none", "arrow-end": "classic-wide-long", "stroke-dasharray": "."});
    return this.geom
};
OG.shape.bpmn.C_Message = function (c, b, a) {
    OG.shape.bpmn.C_Message.superclass.call(this, c, b, a);
    this.SHAPE_ID = "OG.shape.bpmn.C_Message"
};
OG.shape.bpmn.C_Message.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_Message.superclass = OG.shape.EdgeShape;
OG.shape.bpmn.C_Message.prototype.constructor = OG.shape.bpmn.C_Message;
OG.C_Message = OG.shape.bpmn.C_Message;
OG.shape.bpmn.C_Message.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.Line(this.from || [0, 0], this.to || [80, 0]);
    this.geom.style = new OG.geometry.Style({"edge-type": "straight", "arrow-start": "open_oval-wide-long", "arrow-end": "open_block-wide-long", "stroke-dasharray": "."});
    return this.geom
};
OG.shape.bpmn.C_Sequence = function (c, b, a) {
    OG.shape.bpmn.C_Sequence.superclass.call(this, c, b, a);
    this.SHAPE_ID = "OG.shape.bpmn.C_Sequence"
};
OG.shape.bpmn.C_Sequence.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_Sequence.superclass = OG.shape.EdgeShape;
OG.shape.bpmn.C_Sequence.prototype.constructor = OG.shape.bpmn.C_Sequence;
OG.C_Sequence = OG.shape.bpmn.C_Sequence;
OG.shape.bpmn.C_Sequence.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.Line(this.from || [0, 0], this.to || [80, 0]);
    this.geom.style = new OG.geometry.Style({"edge-type": "plain", "arrow-start": "none", "arrow-end": "classic-wide-long"});
    return this.geom
};
OG.shape.bpmn.D_Data = function (a) {
    OG.shape.bpmn.D_Data.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.D_Data";
    this.label = a
};
OG.shape.bpmn.D_Data.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.D_Data.superclass = OG.shape.GeomShape;
OG.shape.bpmn.D_Data.prototype.constructor = OG.shape.bpmn.D_Data;
OG.D_Data = OG.shape.bpmn.D_Data;
OG.shape.bpmn.D_Data.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.PolyLine([
        [0, 0],
        [0, 100],
        [100, 100],
        [100, 20],
        [80, 0],
        [0, 0],
        [80, 0],
        [80, 20],
        [100, 20]
    ]);
    return this.geom
};
OG.shape.bpmn.D_Store = function (a) {
    OG.shape.bpmn.D_Store.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.D_Store";
    this.label = a
};
OG.shape.bpmn.D_Store.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.D_Store.superclass = OG.shape.GeomShape;
OG.shape.bpmn.D_Store.prototype.constructor = OG.shape.bpmn.D_Store;
OG.D_Store = OG.shape.bpmn.D_Store;
OG.shape.bpmn.D_Store.prototype.createShape = function () {
    var f, e, d, c, a, b = [];
    if (this.geom) {
        return this.geom
    }
    f = new OG.geometry.Ellipse([50, 10], 50, 10);
    e = new OG.geometry.Line([0, 10], [0, 90]);
    d = new OG.geometry.Line([100, 10], [100, 90]);
    c = new OG.geometry.Curve([
        [100, 90],
        [96, 94],
        [85, 97],
        [50, 100],
        [15, 97],
        [4, 94],
        [0, 90]
    ]);
    a = new OG.geometry.Rectangle([0, 10], 100, 80);
    a.style = new OG.geometry.Style({stroke: "none"});
    b.push(f);
    b.push(e);
    b.push(d);
    b.push(c);
    b.push(a);
    this.geom = new OG.geometry.GeometryCollection(b);
    return this.geom
};
OG.shape.bpmn.E_End = function (a) {
    OG.shape.bpmn.E_End.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_End";
    this.label = a
};
OG.shape.bpmn.E_End.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_End.prototype.constructor = OG.shape.bpmn.E_End;
OG.E_End = OG.shape.bpmn.E_End;
OG.shape.bpmn.E_End.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.geometry.Circle([50, 50], 50);
    this.geom.style = new OG.geometry.Style({"stroke-width": 3, "label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_End.prototype.createTerminal = function () {
    if (!this.geom) {
        return[]
    }
    var a = this.geom.getBoundary();
    return[new OG.Terminal(a.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.IN), new OG.Terminal(a.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.IN), new OG.Terminal(a.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.IN), new OG.Terminal(a.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.IN), new OG.Terminal(a.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.IN)]
};
OG.shape.bpmn.E_End_Cancel = function (a) {
    OG.shape.bpmn.E_End_Cancel.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_End_Cancel";
    this.label = a
};
OG.shape.bpmn.E_End_Cancel.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Cancel.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_End_Cancel.prototype.constructor = OG.shape.bpmn.E_End_Cancel;
OG.E_End_Cancel = OG.shape.bpmn.E_End_Cancel;
OG.shape.bpmn.E_End_Cancel.prototype.createShape = function () {
    var d, c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    d = new OG.geometry.Circle([50, 50], 50);
    d.style = new OG.geometry.Style({"stroke-width": 3});
    c = new OG.geometry.Line([25, 25], [75, 75]);
    c.style = new OG.geometry.Style({"stroke-width": 5});
    b = new OG.geometry.Line([25, 75], [75, 25]);
    b.style = new OG.geometry.Style({"stroke-width": 5});
    a.push(d);
    a.push(c);
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_End_Compensation = function (a) {
    OG.shape.bpmn.E_End_Compensation.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_End_Compensation";
    this.label = a
};
OG.shape.bpmn.E_End_Compensation.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Compensation.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_End_Compensation.prototype.constructor = OG.shape.bpmn.E_End_Compensation;
OG.E_End_Compensation = OG.shape.bpmn.E_End_Compensation;
OG.shape.bpmn.E_End_Compensation.prototype.createShape = function () {
    var d, c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    d = new OG.geometry.Circle([50, 50], 50);
    d.style = new OG.geometry.Style({"stroke-width": 3});
    c = new OG.geometry.Polygon([
        [15, 50],
        [45, 70],
        [45, 30]
    ]);
    c.style = new OG.geometry.Style({fill: "black", "fill-opacity": 1});
    b = new OG.geometry.Polygon([
        [45, 50],
        [75, 70],
        [75, 30]
    ]);
    b.style = new OG.geometry.Style({fill: "black", "fill-opacity": 1});
    a.push(d);
    a.push(c);
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_End_Error = function (a) {
    OG.shape.bpmn.E_End_Error.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_End_Error";
    this.label = a
};
OG.shape.bpmn.E_End_Error.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Error.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_End_Error.prototype.constructor = OG.shape.bpmn.E_End_Error;
OG.E_End_Error = OG.shape.bpmn.E_End_Error;
OG.shape.bpmn.E_End_Error.prototype.createShape = function () {
    var c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    c = new OG.geometry.Circle([50, 50], 50);
    c.style = new OG.geometry.Style({"stroke-width": 3});
    b = new OG.geometry.PolyLine([
        [20, 75],
        [40, 40],
        [60, 60],
        [80, 20]
    ]);
    b.style = new OG.geometry.Style({"stroke-width": 2});
    a.push(c);
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_End_Link = function (a) {
    OG.shape.bpmn.E_End_Link.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_End_Link";
    this.label = a
};
OG.shape.bpmn.E_End_Link.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Link.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_End_Link.prototype.constructor = OG.shape.bpmn.E_End_Link;
OG.E_End_Link = OG.shape.bpmn.E_End_Link;
OG.shape.bpmn.E_End_Link.prototype.createShape = function () {
    var c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    c = new OG.geometry.Circle([50, 50], 50);
    c.style = new OG.geometry.Style({"stroke-width": 3});
    b = new OG.geometry.Polygon([
        [20, 40],
        [20, 60],
        [60, 60],
        [60, 80],
        [85, 50],
        [60, 20],
        [60, 40]
    ]);
    b.style = new OG.geometry.Style({fill: "black", "fill-opacity": 1});
    a.push(c);
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_End_Message = function (a) {
    OG.shape.bpmn.E_End_Message.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_End_Message";
    this.label = a
};
OG.shape.bpmn.E_End_Message.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Message.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_End_Message.prototype.constructor = OG.shape.bpmn.E_End_Message;
OG.E_End_Message = OG.shape.bpmn.E_End_Message;
OG.shape.bpmn.E_End_Message.prototype.createShape = function () {
    var c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    c = new OG.geometry.Circle([50, 50], 50);
    c.style = new OG.geometry.Style({"stroke-width": 3});
    b = new OG.geometry.PolyLine([
        [20, 30],
        [20, 70],
        [80, 70],
        [80, 30],
        [20, 30],
        [50, 50],
        [80, 30]
    ]);
    a.push(c);
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_End_Multiple = function (a) {
    OG.shape.bpmn.E_End_Multiple.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_End_Multiple";
    this.label = a
};
OG.shape.bpmn.E_End_Multiple.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Multiple.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_End_Multiple.prototype.constructor = OG.shape.bpmn.E_End_Multiple;
OG.E_End_Multiple = OG.shape.bpmn.E_End_Multiple;
OG.shape.bpmn.E_End_Multiple.prototype.createShape = function () {
    var c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    c = new OG.geometry.Circle([50, 50], 50);
    c.style = new OG.geometry.Style({"stroke-width": 3});
    b = new OG.geometry.Polygon([
        [50, 15],
        [39, 33],
        [20, 33],
        [29, 50],
        [19, 67],
        [40, 67],
        [50, 85],
        [60, 68],
        [80, 68],
        [70, 50],
        [79, 33],
        [60, 33]
    ]);
    b.style = new OG.geometry.Style({fill: "black", "fill-opacity": 1});
    a.push(c);
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_Intermediate = function (a) {
    OG.shape.bpmn.E_Intermediate.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_Intermediate";
    this.label = a
};
OG.shape.bpmn.E_Intermediate.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate.prototype.constructor = OG.shape.bpmn.E_Intermediate;
OG.E_Intermediate = OG.shape.bpmn.E_Intermediate;
OG.shape.bpmn.E_Intermediate.prototype.createShape = function () {
    var a = [];
    if (this.geom) {
        return this.geom
    }
    a.push(new OG.geometry.Circle([50, 50], 50));
    a.push(new OG.geometry.Circle([50, 50], 42));
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_Intermediate_Compensation = function (a) {
    OG.shape.bpmn.E_Intermediate_Compensation.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_Intermediate_Compensation";
    this.label = a
};
OG.shape.bpmn.E_Intermediate_Compensation.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Compensation.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate_Compensation.prototype.constructor = OG.shape.bpmn.E_Intermediate_Compensation;
OG.E_Intermediate_Compensation = OG.shape.bpmn.E_Intermediate_Compensation;
OG.shape.bpmn.E_Intermediate_Compensation.prototype.createShape = function () {
    var c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    c = new OG.geometry.Polygon([
        [15, 50],
        [45, 70],
        [45, 30]
    ]);
    b = new OG.geometry.Polygon([
        [45, 50],
        [75, 70],
        [75, 30]
    ]);
    a.push(new OG.geometry.Circle([50, 50], 50));
    a.push(new OG.geometry.Circle([50, 50], 42));
    a.push(c);
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_Intermediate_Error = function (a) {
    OG.shape.bpmn.E_Intermediate_Error.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_Intermediate_Error";
    this.label = a
};
OG.shape.bpmn.E_Intermediate_Error.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Error.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate_Error.prototype.constructor = OG.shape.bpmn.E_Intermediate_Error;
OG.E_Intermediate_Error = OG.shape.bpmn.E_Intermediate_Error;
OG.shape.bpmn.E_Intermediate_Error.prototype.createShape = function () {
    var b, a = [];
    if (this.geom) {
        return this.geom
    }
    b = new OG.geometry.PolyLine([
        [20, 75],
        [40, 40],
        [60, 60],
        [80, 20]
    ]);
    a.push(new OG.geometry.Circle([50, 50], 50));
    a.push(new OG.geometry.Circle([50, 50], 42));
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_Intermediate_Link = function (a) {
    OG.shape.bpmn.E_Intermediate_Link.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_Intermediate_Link";
    this.label = a
};
OG.shape.bpmn.E_Intermediate_Link.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Link.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate_Link.prototype.constructor = OG.shape.bpmn.E_Intermediate_Link;
OG.E_Intermediate_Link = OG.shape.bpmn.E_Intermediate_Link;
OG.shape.bpmn.E_Intermediate_Link.prototype.createShape = function () {
    var b, a = [];
    if (this.geom) {
        return this.geom
    }
    b = new OG.geometry.Polygon([
        [20, 40],
        [20, 60],
        [60, 60],
        [60, 80],
        [85, 50],
        [60, 20],
        [60, 40]
    ]);
    a.push(new OG.geometry.Circle([50, 50], 50));
    a.push(new OG.geometry.Circle([50, 50], 42));
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_Intermediate_Message = function (a) {
    OG.shape.bpmn.E_Intermediate_Message.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_Intermediate_Message";
    this.label = a
};
OG.shape.bpmn.E_Intermediate_Message.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Message.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate_Message.prototype.constructor = OG.shape.bpmn.E_Intermediate_Message;
OG.E_Intermediate_Message = OG.shape.bpmn.E_Intermediate_Message;
OG.shape.bpmn.E_Intermediate_Message.prototype.createShape = function () {
    var b, a = [];
    if (this.geom) {
        return this.geom
    }
    b = new OG.geometry.PolyLine([
        [20, 30],
        [20, 70],
        [80, 70],
        [80, 30],
        [20, 30],
        [50, 50],
        [80, 30]
    ]);
    a.push(new OG.geometry.Circle([50, 50], 50));
    a.push(new OG.geometry.Circle([50, 50], 42));
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_Intermediate_Multiple = function (a) {
    OG.shape.bpmn.E_Intermediate_Multiple.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_Intermediate_Multiple";
    this.label = a
};
OG.shape.bpmn.E_Intermediate_Multiple.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Multiple.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate_Multiple.prototype.constructor = OG.shape.bpmn.E_Intermediate_Multiple;
OG.E_Intermediate_Multiple = OG.shape.bpmn.E_Intermediate_Multiple;
OG.shape.bpmn.E_Intermediate_Multiple.prototype.createShape = function () {
    var b, a = [];
    if (this.geom) {
        return this.geom
    }
    b = new OG.geometry.Polygon([
        [50, 15],
        [39, 33],
        [20, 33],
        [29, 50],
        [19, 67],
        [40, 67],
        [50, 85],
        [60, 68],
        [80, 68],
        [70, 50],
        [79, 33],
        [60, 33]
    ]);
    a.push(new OG.geometry.Circle([50, 50], 50));
    a.push(new OG.geometry.Circle([50, 50], 42));
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_Intermediate_Rule = function (a) {
    OG.shape.bpmn.E_Intermediate_Rule.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_Intermediate_Rule";
    this.label = a
};
OG.shape.bpmn.E_Intermediate_Rule.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Rule.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate_Rule.prototype.constructor = OG.shape.bpmn.E_Intermediate_Rule;
OG.E_Intermediate_Rule = OG.shape.bpmn.E_Intermediate_Rule;
OG.shape.bpmn.E_Intermediate_Rule.prototype.createShape = function () {
    var b, a = [];
    if (this.geom) {
        return this.geom
    }
    b = new OG.geometry.Rectangle([25, 20], 50, 60);
    a.push(new OG.geometry.Circle([50, 50], 50));
    a.push(new OG.geometry.Circle([50, 50], 42));
    a.push(b);
    a.push(new OG.geometry.Line([30, 30], [70, 30]));
    a.push(new OG.geometry.Line([30, 45], [70, 45]));
    a.push(new OG.geometry.Line([30, 60], [70, 60]));
    a.push(new OG.geometry.Line([30, 70], [70, 70]));
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_Intermediate_Timer = function (a) {
    OG.shape.bpmn.E_Intermediate_Timer.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_Intermediate_Timer";
    this.label = a
};
OG.shape.bpmn.E_Intermediate_Timer.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Timer.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate_Timer.prototype.constructor = OG.shape.bpmn.E_Intermediate_Timer;
OG.E_Intermediate_Timer = OG.shape.bpmn.E_Intermediate_Timer;
OG.shape.bpmn.E_Intermediate_Timer.prototype.createShape = function () {
    var c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    c = new OG.geometry.Circle([50, 50], 32);
    b = new OG.geometry.PolyLine([
        [50, 30],
        [50, 50],
        [70, 50]
    ]);
    a.push(new OG.geometry.Circle([50, 50], 50));
    a.push(new OG.geometry.Circle([50, 50], 42));
    a.push(c);
    a.push(new OG.geometry.Line([50, 18], [50, 25]));
    a.push(new OG.geometry.Line([50, 82], [50, 75]));
    a.push(new OG.geometry.Line([18, 50], [25, 50]));
    a.push(new OG.geometry.Line([82, 50], [75, 50]));
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_Start = function (a) {
    OG.shape.bpmn.E_Start.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_Start";
    this.label = a
};
OG.shape.bpmn.E_Start.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Start.prototype.constructor = OG.shape.bpmn.E_Start;
OG.E_Start = OG.shape.bpmn.E_Start;
OG.shape.bpmn.E_Start.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.geometry.Circle([50, 50], 50);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_Start.prototype.createTerminal = function () {
    if (!this.geom) {
        return[]
    }
    var a = this.geom.getBoundary();
    return[new OG.Terminal(a.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.OUT), new OG.Terminal(a.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.OUT), new OG.Terminal(a.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.OUT), new OG.Terminal(a.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.OUT), new OG.Terminal(a.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.OUT)]
};
OG.shape.bpmn.E_Start_Link = function (a) {
    OG.shape.bpmn.E_Start_Link.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_Start_Link";
    this.label = a
};
OG.shape.bpmn.E_Start_Link.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start_Link.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Start_Link.prototype.constructor = OG.shape.bpmn.E_Start_Link;
OG.E_Start_Link = OG.shape.bpmn.E_Start_Link;
OG.shape.bpmn.E_Start_Link.prototype.createShape = function () {
    var c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    c = new OG.geometry.Circle([50, 50], 50);
    c.style = new OG.geometry.Style({"stroke-width": 1});
    b = new OG.geometry.Polygon([
        [20, 40],
        [20, 60],
        [60, 60],
        [60, 80],
        [85, 50],
        [60, 20],
        [60, 40]
    ]);
    a.push(c);
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_Start_Message = function (a) {
    OG.shape.bpmn.E_Start_Message.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_Start_Message";
    this.label = a
};
OG.shape.bpmn.E_Start_Message.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start_Message.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Start_Message.prototype.constructor = OG.shape.bpmn.E_Start_Message;
OG.E_Start_Message = OG.shape.bpmn.E_Start_Message;
OG.shape.bpmn.E_Start_Message.prototype.createShape = function () {
    var c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    c = new OG.geometry.Circle([50, 50], 50);
    b = new OG.geometry.PolyLine([
        [20, 30],
        [20, 70],
        [80, 70],
        [80, 30],
        [20, 30],
        [50, 50],
        [80, 30]
    ]);
    a.push(c);
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_Start_Multiple = function (a) {
    OG.shape.bpmn.E_Start_Multiple.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_Start_Multiple";
    this.label = a
};
OG.shape.bpmn.E_Start_Multiple.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start_Multiple.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Start_Multiple.prototype.constructor = OG.shape.bpmn.E_Start_Multiple;
OG.E_Start_Multiple = OG.shape.bpmn.E_Start_Multiple;
OG.shape.bpmn.E_Start_Multiple.prototype.createShape = function () {
    var c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    c = new OG.geometry.Circle([50, 50], 50);
    b = new OG.geometry.Polygon([
        [50, 15],
        [39, 33],
        [20, 33],
        [29, 50],
        [19, 67],
        [40, 67],
        [50, 85],
        [60, 68],
        [80, 68],
        [70, 50],
        [79, 33],
        [60, 33]
    ]);
    a.push(c);
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_Start_Rule = function (a) {
    OG.shape.bpmn.E_Start_Rule.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_Start_Rule";
    this.label = a
};
OG.shape.bpmn.E_Start_Rule.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start_Rule.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Start_Rule.prototype.constructor = OG.shape.bpmn.E_Start_Rule;
OG.E_Start_Rule = OG.shape.bpmn.E_Start_Rule;
OG.shape.bpmn.E_Start_Rule.prototype.createShape = function () {
    var c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    c = new OG.geometry.Circle([50, 50], 50);
    c.style = new OG.geometry.Style({"stroke-width": 1});
    b = new OG.geometry.Rectangle([25, 20], 50, 60);
    a.push(c);
    a.push(b);
    a.push(new OG.geometry.Line([30, 30], [70, 30]));
    a.push(new OG.geometry.Line([30, 45], [70, 45]));
    a.push(new OG.geometry.Line([30, 60], [70, 60]));
    a.push(new OG.geometry.Line([30, 70], [70, 70]));
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_Start_Timer = function (a) {
    OG.shape.bpmn.E_Start_Timer.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.E_Start_Timer";
    this.label = a
};
OG.shape.bpmn.E_Start_Timer.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start_Timer.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Start_Timer.prototype.constructor = OG.shape.bpmn.E_Start_Timer;
OG.E_Start_Timer = OG.shape.bpmn.E_Start_Timer;
OG.shape.bpmn.E_Start_Timer.prototype.createShape = function () {
    var d, c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    d = new OG.geometry.Circle([50, 50], 50);
    d.style = new OG.geometry.Style({"stroke-width": 1});
    c = new OG.geometry.Circle([50, 50], 32);
    b = new OG.geometry.PolyLine([
        [50, 30],
        [50, 50],
        [70, 50]
    ]);
    a.push(d);
    a.push(c);
    a.push(new OG.geometry.Line([50, 18], [50, 25]));
    a.push(new OG.geometry.Line([50, 82], [50, 75]));
    a.push(new OG.geometry.Line([18, 50], [25, 50]));
    a.push(new OG.geometry.Line([82, 50], [75, 50]));
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.E_Terminate = function (a) {
    OG.shape.bpmn.E_Terminate.superclass.call(this, a);
    this.SHAPE_ID = "OG.shape.bpmn.E_Terminate"
};
OG.shape.bpmn.E_Terminate.prototype = new OG.shape.bpmn.E_End();
OG.shape.bpmn.E_Terminate.superclass = OG.shape.bpmn.E_End;
OG.shape.bpmn.E_Terminate.prototype.constructor = OG.shape.bpmn.E_Terminate;
OG.E_Terminate = OG.shape.bpmn.E_Terminate;
OG.shape.bpmn.E_Terminate.prototype.createShape = function () {
    var c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    c = new OG.geometry.Circle([50, 50], 50);
    c.style = new OG.geometry.Style({"stroke-width": 3});
    b = new OG.geometry.Circle([50, 50], 30);
    b.style = new OG.geometry.Style({fill: "black", "fill-opacity": 1});
    a.push(c);
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({"label-position": "bottom"});
    return this.geom
};
OG.shape.bpmn.G_Complex = function (a) {
    OG.shape.bpmn.G_Complex.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.G_Complex";
    this.label = a
};
OG.shape.bpmn.G_Complex.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Complex.superclass = OG.shape.GeomShape;
OG.shape.bpmn.G_Complex.prototype.constructor = OG.shape.bpmn.G_Complex;
OG.G_Complex = OG.shape.bpmn.G_Complex;
OG.shape.bpmn.G_Complex.prototype.createShape = function () {
    var f, e, d, c, a, b = [];
    if (this.geom) {
        return this.geom
    }
    f = new OG.geometry.Polygon([
        [0, 50],
        [50, 100],
        [100, 50],
        [50, 0]
    ]);
    e = new OG.geometry.Line([30, 30], [70, 70]);
    e.style = new OG.geometry.Style({"stroke-width": 3});
    d = new OG.geometry.Line([30, 70], [70, 30]);
    d.style = new OG.geometry.Style({"stroke-width": 3});
    c = new OG.geometry.Line([20, 50], [80, 50]);
    c.style = new OG.geometry.Style({"stroke-width": 3});
    a = new OG.geometry.Line([50, 20], [50, 80]);
    a.style = new OG.geometry.Style({"stroke-width": 3});
    b.push(f);
    b.push(e);
    b.push(d);
    b.push(c);
    b.push(a);
    this.geom = new OG.geometry.GeometryCollection(b);
    return this.geom
};
OG.shape.bpmn.G_Exclusive = function (a) {
    OG.shape.bpmn.G_Exclusive.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.G_Exclusive";
    this.label = a
};
OG.shape.bpmn.G_Exclusive.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Exclusive.superclass = OG.shape.GeomShape;
OG.shape.bpmn.G_Exclusive.prototype.constructor = OG.shape.bpmn.G_Exclusive;
OG.G_Exclusive = OG.shape.bpmn.G_Exclusive;
OG.shape.bpmn.G_Exclusive.prototype.createShape = function () {
    var d, c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    d = new OG.geometry.Polygon([
        [0, 50],
        [50, 100],
        [100, 50],
        [50, 0]
    ]);
    c = new OG.geometry.Line([30, 30], [70, 70]);
    c.style = new OG.geometry.Style({"stroke-width": 5});
    b = new OG.geometry.Line([30, 70], [70, 30]);
    b.style = new OG.geometry.Style({"stroke-width": 5});
    a.push(d);
    a.push(c);
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    return this.geom
};
OG.shape.bpmn.G_Gateway = function (a) {
    OG.shape.bpmn.G_Gateway.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.G_Gateway";
    this.label = a
};
OG.shape.bpmn.G_Gateway.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Gateway.superclass = OG.shape.GeomShape;
OG.shape.bpmn.G_Gateway.prototype.constructor = OG.shape.bpmn.G_Gateway;
OG.G_Gateway = OG.shape.bpmn.G_Gateway;
OG.shape.bpmn.G_Gateway.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.geometry.Polygon([
        [0, 50],
        [50, 100],
        [100, 50],
        [50, 0]
    ]);
    return this.geom
};
OG.shape.bpmn.G_Inclusive = function (a) {
    OG.shape.bpmn.G_Inclusive.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.G_Inclusive";
    this.label = a
};
OG.shape.bpmn.G_Inclusive.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Inclusive.superclass = OG.shape.GeomShape;
OG.shape.bpmn.G_Inclusive.prototype.constructor = OG.shape.bpmn.G_Inclusive;
OG.G_Inclusive = OG.shape.bpmn.G_Inclusive;
OG.shape.bpmn.G_Inclusive.prototype.createShape = function () {
    var c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    c = new OG.geometry.Polygon([
        [0, 50],
        [50, 100],
        [100, 50],
        [50, 0]
    ]);
    b = new OG.geometry.Circle([50, 50], 25);
    b.style = new OG.geometry.Style({"stroke-width": 3});
    a.push(c);
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    return this.geom
};
OG.shape.bpmn.G_Parallel = function (a) {
    OG.shape.bpmn.G_Parallel.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.G_Parallel";
    this.label = a
};
OG.shape.bpmn.G_Parallel.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Parallel.superclass = OG.shape.GeomShape;
OG.shape.bpmn.G_Parallel.prototype.constructor = OG.shape.bpmn.G_Parallel;
OG.G_Parallel = OG.shape.bpmn.G_Parallel;
OG.shape.bpmn.G_Parallel.prototype.createShape = function () {
    var d, c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    d = new OG.geometry.Polygon([
        [0, 50],
        [50, 100],
        [100, 50],
        [50, 0]
    ]);
    c = new OG.geometry.Line([20, 50], [80, 50]);
    c.style = new OG.geometry.Style({"stroke-width": 5});
    b = new OG.geometry.Line([50, 20], [50, 80]);
    b.style = new OG.geometry.Style({"stroke-width": 5});
    a.push(d);
    a.push(c);
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    return this.geom
};
OG.shape.bpmn.M_Annotation = function (a) {
    OG.shape.bpmn.M_Annotation.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.M_Annotation";
    this.label = a || "Annotation"
};
OG.shape.bpmn.M_Annotation.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.M_Annotation.superclass = OG.shape.GeomShape;
OG.shape.bpmn.M_Annotation.prototype.constructor = OG.shape.bpmn.M_Annotation;
OG.M_Annotation = OG.shape.bpmn.M_Annotation;
OG.shape.bpmn.M_Annotation.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    var c, b, a = [];
    if (this.geom) {
        return this.geom
    }
    c = new OG.geometry.Rectangle([0, 0], 100, 100);
    c.style = new OG.geometry.Style({stroke: "none"});
    b = new OG.geometry.PolyLine([
        [10, 0],
        [0, 0],
        [0, 100],
        [10, 100]
    ]);
    b.style = new OG.geometry.Style({stroke: "black"});
    a.push(c);
    a.push(b);
    this.geom = new OG.geometry.GeometryCollection(a);
    this.geom.style = new OG.geometry.Style({});
    return this.geom
};
OG.shape.bpmn.M_Group = function (a) {
    OG.shape.bpmn.M_Group.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.M_Group";
    this.label = a
};
OG.shape.bpmn.M_Group.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.M_Group.superclass = OG.shape.GeomShape;
OG.shape.bpmn.M_Group.prototype.constructor = OG.shape.bpmn.M_Group;
OG.M_Group = OG.shape.bpmn.M_Group;
OG.shape.bpmn.M_Group.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    this.geom.style = new OG.geometry.Style({"stroke-dasharray": "-", r: 6});
    return this.geom
};
OG.shape.bpmn.M_Text = function (a) {
    OG.shape.bpmn.M_Text.superclass.call(this);
    this.SHAPE_ID = "OG.shape.bpmn.M_Text";
    this.label = a || "Text"
};
OG.shape.bpmn.M_Text.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.M_Text.superclass = OG.shape.GeomShape;
OG.shape.bpmn.M_Text.prototype.constructor = OG.shape.bpmn.M_Text;
OG.M_Text = OG.shape.bpmn.M_Text;
OG.shape.bpmn.M_Text.prototype.createShape = function () {
    if (this.geom) {
        return this.geom
    }
    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    this.geom.style = new OG.geometry.Style({stroke: "none"});
    return this.geom
};
OG.renderer.IRenderer = function (a, e, b, d, c) {
    this._CONFIG = null;
    this._PAPER = null;
    this._ROOT_GROUP = null;
    this._ETC_GROUP = null;
    this._ID_PREFIX = Math.round(Math.random() * 10000);
    this._LAST_ID = 0;
    this._ELE_MAP = new OG.HashMap()
};
OG.renderer.IRenderer.prototype = {_genId: function () {
    var a = "OG_" + this._ID_PREFIX + "_" + this._LAST_ID;
    this._LAST_ID++;
    return a
}, _bezierCurve: function (j, k, i, d) {
    var e = 100, g = [1, 0], f = [-1, 0], c, b, a, h = [];
    c = Math.sqrt(Math.pow(j[0] - k[0], 2) + Math.pow(j[1] - k[1], 2));
    if (c < e) {
        e = c / 2
    }
    switch (i.toLowerCase()) {
        case"e":
            g = [1, 0];
            break;
        case"w":
            g = [-1, 0];
            break;
        case"s":
            g = [0, 1];
            break;
        case"n":
            g = [0, -1];
            break;
        default:
            g = [1, 0];
            break
    }
    switch (d.toLowerCase()) {
        case"e":
            f = [1, 0];
            break;
        case"w":
            f = [-1, 0];
            break;
        case"s":
            f = [0, 1];
            break;
        case"n":
            f = [0, -1];
            break;
        default:
            f = [-1, 0];
            break
    }
    b = [g[0] * e, g[1] * e];
    a = [f[0] * e, f[1] * e];
    h[0] = j;
    h[1] = [j[0] + b[0], j[1] + b[1]];
    h[2] = [k[0] + a[0], k[1] + a[1]];
    h[3] = k;
    return h
}, _adjustEdgeDirection: function (c, b, f, e) {
    var a = {x: f[0], y: f[1]}, d = {x: e[0], y: e[1]};
    if (c === "c" && b === "c") {
        if (a.x <= d.x && a.y <= d.y) {
            if (Math.abs(d.x - a.x) > Math.abs(d.y - a.y)) {
                c = "e";
                b = "w"
            } else {
                c = "s";
                b = "n"
            }
        } else {
            if (a.x <= d.x && a.y > d.y) {
                if (Math.abs(d.x - a.x) > Math.abs(d.y - a.y)) {
                    c = "e";
                    b = "w"
                } else {
                    c = "n";
                    b = "s"
                }
            } else {
                if (a.x > d.x && a.y <= d.y) {
                    if (Math.abs(d.x - a.x) > Math.abs(d.y - a.y)) {
                        c = "w";
                        b = "e"
                    } else {
                        c = "s";
                        b = "n"
                    }
                } else {
                    if (a.x > d.x && a.y > d.y) {
                        if (Math.abs(d.x - a.x) > Math.abs(d.y - a.y)) {
                            c = "w";
                            b = "e"
                        } else {
                            c = "n";
                            b = "s"
                        }
                    }
                }
            }
        }
    } else {
        if (c === "c" && b !== "c") {
            if (a.x <= d.x && a.y <= d.y) {
                if (Math.abs(d.x - a.x) > Math.abs(d.y - a.y)) {
                    c = "e"
                } else {
                    c = "s"
                }
            } else {
                if (a.x <= d.x && a.y > d.y) {
                    if (Math.abs(d.x - a.x) > Math.abs(d.y - a.y)) {
                        c = "e"
                    } else {
                        c = "n"
                    }
                } else {
                    if (a.x > d.x && a.y <= d.y) {
                        if (Math.abs(d.x - a.x) > Math.abs(d.y - a.y)) {
                            c = "w"
                        } else {
                            c = "s"
                        }
                    } else {
                        if (a.x > d.x && a.y > d.y) {
                            if (Math.abs(d.x - a.x) > Math.abs(d.y - a.y)) {
                                c = "w"
                            } else {
                                c = "n"
                            }
                        }
                    }
                }
            }
        } else {
            if (c !== "c" && b === "c") {
                if (a.x <= d.x && a.y <= d.y) {
                    if (Math.abs(d.x - a.x) > Math.abs(d.y - a.y)) {
                        b = "w"
                    } else {
                        b = "n"
                    }
                } else {
                    if (a.x <= d.x && a.y > d.y) {
                        if (Math.abs(d.x - a.x) > Math.abs(d.y - a.y)) {
                            b = "w"
                        } else {
                            b = "s"
                        }
                    } else {
                        if (a.x > d.x && a.y <= d.y) {
                            if (Math.abs(d.x - a.x) > Math.abs(d.y - a.y)) {
                                b = "e"
                            } else {
                                b = "n"
                            }
                        } else {
                            if (a.x > d.x && a.y > d.y) {
                                if (Math.abs(d.x - a.x) > Math.abs(d.y - a.y)) {
                                    b = "e"
                                } else {
                                    b = "s"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return c + " " + b
}, _findFromTerminal: function (c, h, j) {
    var f = {x: h[0], y: h[1]}, a = {x: j[0], y: j[1]}, k = this.drawTerminal(c), d = k.terminal.childNodes, g, e, b;
    if (Math.abs(a.x - f.x) > Math.abs(a.y - f.y)) {
        if (a.x > f.x) {
            g = "e"
        } else {
            g = "w"
        }
    } else {
        if (a.y > f.y) {
            g = "s"
        } else {
            g = "n"
        }
    }
    e = d[0];
    for (b = 0; b < d.length; b++) {
        if (d[b].terminal && d[b].terminal.direction.toLowerCase() === g) {
            e = d[b];
            break
        }
    }
    return e
}, _findToTerminal: function (c, g, h) {
    var f = {x: g[0], y: g[1]}, a = {x: h[0], y: h[1]}, j = this.drawTerminal(c), d = j.terminal.childNodes, e, k, b;
    if (Math.abs(a.x - f.x) > Math.abs(a.y - f.y)) {
        if (a.x > f.x) {
            e = "w"
        } else {
            e = "e"
        }
    } else {
        if (a.y > f.y) {
            e = "n"
        } else {
            e = "s"
        }
    }
    k = d[0];
    for (b = 0; b < d.length; b++) {
        if (d[b].terminal && d[b].terminal.direction.toLowerCase() === e) {
            k = d[b];
            break
        }
    }
    return k
}, _getShapeFromTerminal: function (a) {
    var b = OG.Util.isElement(a) ? a.id : a;
    if (b) {
        return this.getElementById(b.substring(0, b.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP)))
    } else {
        return null
    }
}, drawShape: function (a, b, c, d, e) {
    throw new OG.NotImplementedException()
}, drawGeom: function (b, a, c) {
    throw new OG.NotImplementedException()
}, drawText: function (a, d, b, c, e) {
    throw new OG.NotImplementedException()
}, drawImage: function (a, d, b, c, e) {
    throw new OG.NotImplementedException()
}, drawEdge: function (a, c, d, b) {
    throw new OG.NotImplementedException()
}, drawLabel: function (a, c, b) {
    throw new OG.NotImplementedException()
}, drawEdgeLabel: function (a, c, b) {
    throw new OG.NotImplementedException()
}, redrawShape: function (a, b) {
    throw new OG.NotImplementedException()
}, redrawEdge: function (a) {
    throw new OG.NotImplementedException()
}, redrawConnectedEdge: function (a, b) {
    throw new OG.NotImplementedException()
}, connect: function (e, d, c, b, a) {
    throw new OG.NotImplementedException()
}, disconnect: function (a) {
    throw new OG.NotImplementedException()
}, drawDropOverGuide: function (a) {
    throw new OG.NotImplementedException()
}, drawGuide: function (a) {
    throw new OG.NotImplementedException()
}, removeGuide: function (a) {
    throw new OG.NotImplementedException()
}, removeAllGuide: function () {
    throw new OG.NotImplementedException()
}, drawEdgeGuide: function (a) {
    throw new OG.NotImplementedException()
}, drawRubberBand: function (a, b, c) {
    throw new OG.NotImplementedException()
}, removeRubberBand: function (a) {
    throw new OG.NotImplementedException()
}, drawTerminal: function (a, b) {
    throw new OG.NotImplementedException()
}, removeTerminal: function (a) {
    throw new OG.NotImplementedException()
}, removeAllTerminal: function () {
    throw new OG.NotImplementedException()
}, drawCollapseGuide: function (a) {
    throw new OG.NotImplementedException()
}, removeCollapseGuide: function (a) {
    throw new OG.NotImplementedException()
}, group: function (a) {
    throw new OG.NotImplementedException()
}, ungroup: function (a) {
    throw new OG.NotImplementedException()
}, addToGroup: function (a, b) {
    throw new OG.NotImplementedException()
}, collapse: function (a) {
    throw new OG.NotImplementedException()
}, expand: function (a) {
    throw new OG.NotImplementedException()
}, clear: function () {
    throw new OG.NotImplementedException()
}, removeShape: function (a) {
    throw new OG.NotImplementedException()
}, remove: function (a) {
    throw new OG.NotImplementedException()
}, removeChild: function (a) {
    throw new OG.NotImplementedException()
}, getRootElement: function () {
    throw new OG.NotImplementedException()
}, getRootGroup: function () {
    return this._ROOT_GROUP.node
}, getElementByPoint: function (a) {
    throw new OG.NotImplementedException()
}, getElementsByBBox: function (b) {
    var a = [];
    $(this.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "]").each(function (c, d) {
        if (d.shape.geom && b.isContainsAll(d.shape.geom.getVertices())) {
            a.push(d)
        }
    });
    return a
}, setAttr: function (a, b) {
    throw new OG.NotImplementedException()
}, getAttr: function (b, a) {
    throw new OG.NotImplementedException()
}, setShapeStyle: function (a, b) {
    throw new OG.NotImplementedException()
}, toFront: function (a) {
    throw new OG.NotImplementedException()
}, toBack: function (a) {
    throw new OG.NotImplementedException()
}, getCanvasSize: function () {
    throw new OG.NotImplementedException()
}, setCanvasSize: function (a) {
    throw new OG.NotImplementedException()
}, fitCanvasSize: function (b, a) {
    throw new OG.NotImplementedException()
}, setViewBox: function (a, b, c) {
    throw new OG.NotImplementedException()
}, getScale: function () {
    throw new OG.NotImplementedException()
}, setScale: function (a) {
    throw new OG.NotImplementedException()
}, show: function (a) {
    throw new OG.NotImplementedException()
}, hide: function (a) {
    throw new OG.NotImplementedException()
}, appendChild: function (a, b) {
    throw new OG.NotImplementedException()
}, insertAfter: function (a, b) {
    throw new OG.NotImplementedException()
}, insertBefore: function (a, b) {
    throw new OG.NotImplementedException()
}, move: function (a, b) {
    throw new OG.NotImplementedException()
}, moveCentroid: function (b, a) {
    throw new OG.NotImplementedException()
}, rotate: function (a, b) {
    throw new OG.NotImplementedException()
}, resize: function (a, b) {
    throw new OG.NotImplementedException()
}, resizeBox: function (b, a) {
    throw new OG.NotImplementedException()
}, intersectionEdge: function (f, b, j, c, l) {
    var q = this, n, s, p, o, k, g = Number.MAX_VALUE, d, e, r, a, h, m;
    if (b) {
        e = $(b).parents("[_collapsed=true]");
        if (e.length !== 0) {
            r = e[e.length - 1].shape.geom.getBoundary();
            a = r.getUpperLeft();
            h = new OG.geometry.Rectangle(a, q._CONFIG.COLLAPSE_SIZE * 3, q._CONFIG.COLLAPSE_SIZE * 2)
        }
    }
    switch (f) {
        case OG.Constants.EDGE_TYPE.PLAIN:
        case OG.Constants.EDGE_TYPE.BEZIER:
            n = l ? this._findFromTerminal(b, j, c) : this._findToTerminal(b, j, c);
            s = [n.terminal.position.x, n.terminal.position.y];
            p = n.terminal.direction.toLowerCase();
            if (h) {
                switch (n.terminal.direction) {
                    case OG.Constants.TERMINAL_TYPE.E:
                        m = h.getBoundary().getRightCenter();
                        break;
                    case OG.Constants.TERMINAL_TYPE.W:
                        m = h.getBoundary().getLeftCenter();
                        break;
                    case OG.Constants.TERMINAL_TYPE.S:
                        m = h.getBoundary().getLowerCenter();
                        break;
                    case OG.Constants.TERMINAL_TYPE.N:
                        m = h.getBoundary().getUpperCenter();
                        break
                }
                if (m) {
                    s = [m.x, m.y]
                }
            }
            break;
        case OG.Constants.EDGE_TYPE.STRAIGHT:
            if (h) {
                m = h.getBoundary().getCentroid();
                if (l === true) {
                    j = [m.x, m.y]
                } else {
                    c = [m.x, m.y]
                }
                o = h.intersectToLine([j, c])
            } else {
                o = b.shape.geom.intersectToLine([j, c])
            }
            s = l ? j : c;
            p = "c";
            for (k = 0; k < o.length; k++) {
                d = o[k].distance(l ? c : j);
                if (d < g) {
                    g = d;
                    s = [o[k].x, o[k].y];
                    p = "c"
                }
            }
            break;
        default:
            break
    }
    return{position: s, direction: p}
}, clone: function (a) {
    throw new OG.NotImplementedException()
}, getElementById: function (a) {
    throw new OG.NotImplementedException()
}, getElementsByType: function (c, a) {
    var b = this.getRootGroup();
    if (c && a) {
        return $(b).find("[_type=SHAPE][_shape=" + c + "][_shape!=" + a + "]")
    } else {
        if (c) {
            return $(b).find("[_type=SHAPE][_shape=" + c + "]")
        } else {
            if (a) {
                return $(b).find("[_type=SHAPE][_shape!=" + a + "]")
            } else {
                return $(b).find("[_type=SHAPE]")
            }
        }
    }
}, getBBox: function (a) {
    throw new OG.NotImplementedException()
}, getRootBBox: function () {
    throw new OG.NotImplementedException()
}, getRealRootBBox: function () {
    var f = Number.MAX_VALUE, d = Number.MAX_VALUE, c = Number.MIN_VALUE, a = Number.MIN_VALUE, e = this.getElementsByType(), j, k, b, h, g, l = {width: 0, height: 0, x: 0, y: 0, x2: 0, y2: 0};
    for (g = 0; g < e.length; g++) {
        j = e[g].shape;
        if (j && j.geom) {
            k = j.geom.getBoundary();
            b = k.getUpperLeft();
            h = k.getLowerRight();
            f = f > b.x ? b.x : f;
            d = d > b.y ? b.y : d;
            c = c < h.x ? h.x : c;
            a = a < h.y ? h.y : a;
            l = {width: c - f, height: a - d, x: f, y: d, x2: c, y2: a}
        }
    }
    return l
}, getContainer: function () {
    throw new OG.NotImplementedException()
}, isSVG: function () {
    throw new OG.NotImplementedException()
}, isVML: function () {
    throw new OG.NotImplementedException()
}, getPrevEdges: function (c) {
    var e = $(c).attr("_fromedge"), a = [], f, d, b;
    if (e) {
        f = e.split(",");
        for (b = 0; b < f.length; b++) {
            d = this.getElementById(f[b]);
            if (d) {
                a.push(d)
            }
        }
    }
    return a
}, getNextEdges: function (c) {
    var f = $(c).attr("_toedge"), a = [], e, d, b;
    if (f) {
        e = f.split(",");
        for (b = 0; b < e.length; b++) {
            d = this.getElementById(e[b]);
            if (d) {
                a.push(d)
            }
        }
    }
    return a
}, getPrevShapes: function (e) {
    var c = this.getPrevEdges(e), a = [], f, b, d;
    for (d = 0; d < c.length; d++) {
        f = $(c[d]).attr("_from");
        if (f) {
            f = f.substring(0, f.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP));
            b = this.getElementById(f);
            if (b) {
                a.push(b)
            }
        }
    }
    return a
}, getPrevShapeIds: function (d) {
    var b = this.getPrevEdges(d), a = [], e, c;
    for (c = 0; c < b.length; c++) {
        e = $(b[c]).attr("_from");
        if (e) {
            e = e.substring(0, e.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP));
            a.push(e)
        }
    }
    return a
}, getNextShapes: function (e) {
    var f = this.getNextEdges(e), a = [], b, c, d;
    for (d = 0; d < f.length; d++) {
        b = $(f[d]).attr("_to");
        if (b) {
            b = b.substring(0, b.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP));
            c = this.getElementById(b);
            if (c) {
                a.push(c)
            }
        }
    }
    return a
}, getNextShapeIds: function (d) {
    var e = this.getNextEdges(d), a = [], b, c;
    for (c = 0; c < e.length; c++) {
        b = $(e[c]).attr("_to");
        if (b) {
            b = b.substring(0, b.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP));
            a.push(b)
        }
    }
    return a
}};
OG.renderer.IRenderer.prototype.constructor = OG.renderer.IRenderer;
OG.renderer.RaphaelRenderer = function (a, e, b, d, c) {
    OG.renderer.RaphaelRenderer.superclass.call(this, arguments);
    this._CONFIG = c;
    this._PAPER = new Raphael(a, e ? e[0] : null, e ? e[1] : null);
    this._ROOT_GROUP = this._add(this._PAPER.group(), null, OG.Constants.NODE_TYPE.ROOT);
    this._ETC_GROUP = this._add(this._PAPER.group(), null, OG.Constants.NODE_TYPE.ETC);
    this._PAPER.id = "OG_" + this._ID_PREFIX;
    this._PAPER.canvas.id = "OG_" + this._ID_PREFIX;
    this._CANVAS_COLOR = b || this._CONFIG.CANVAS_BACKGROUND;
    $(this._PAPER.canvas).css({"background-color": this._CANVAS_COLOR, "user-select": "none", "-o-user-select": "none", "-moz-user-select": "none", "-khtml-user-select": "none", "-webkit-user-select": "none"});
    if (d) {
        $(this._PAPER.canvas).css({"background-image": d})
    }
    $(this._PAPER.canvas.parentNode).attr("tabindex", "0");
    $(this._PAPER.canvas.parentNode).css({outline: "none"});
    if ($(this._PAPER.canvas.parentNode).css("position") === "static") {
        $(this._PAPER.canvas.parentNode).css({position: "relative", left: "0", top: "0"})
    }
};
OG.renderer.RaphaelRenderer.prototype = new OG.renderer.IRenderer();
OG.renderer.RaphaelRenderer.superclass = OG.renderer.IRenderer;
OG.renderer.RaphaelRenderer.prototype.constructor = OG.renderer.RaphaelRenderer;
OG.RaphaelRenderer = OG.renderer.RaphaelRenderer;
OG.renderer.RaphaelRenderer.prototype._add = function (b, d, a, c) {
    b.id = d || this._genId();
    b.node.id = b.id;
    b.node.raphaelid = b.id;
    if (a) {
        $(b.node).attr("_type", a)
    }
    if (c) {
        $(b.node).attr("_shape", c)
    }
    this._ELE_MAP.put(b.id, b);
    return b
};
OG.renderer.RaphaelRenderer.prototype._remove = function (a) {
    var c, b;
    if (a) {
        c = a.node.childNodes;
        for (b = c.length - 1; b >= 0; b--) {
            this._remove(this._getREleById(c[b].id))
        }
        this._ELE_MAP.remove(a.id);
        a.remove()
    }
};
OG.renderer.RaphaelRenderer.prototype._removeChild = function (a) {
    var c, b;
    if (a) {
        c = a.node.childNodes;
        for (b = c.length - 1; b >= 0; b--) {
            this._remove(this._getREleById(c[b].id))
        }
    }
};
OG.renderer.RaphaelRenderer.prototype._getREleById = function (a) {
    return this._ELE_MAP.get(a)
};
OG.renderer.RaphaelRenderer.prototype._drawGeometry = function (g, k, a, l) {
    var j = this, e = 0, m = "", h, d, b, c = {}, f = function (u, r) {
        var q, p, n, i, o, s = [], t = function (y, x, w) {
            var v = Math.PI / 180 * w;
            return new OG.geometry.Coordinate(OG.Util.round(y.x + x * Math.cos(v)), OG.Util.round(y.y + x * Math.sin(v)))
        };
        q = OG.JSON.decode(u.toString());
        p = u.getVertices();
        o = q.angle;
        n = t(p[0], r, 90 + o);
        i = t(p[0], r, o);
        s = s.concat(["M", n.x, n.y, "Q", p[0].x, p[0].y, i.x, i.y]);
        n = t(p[1], r, 180 + o);
        i = t(p[1], r, 90 + o);
        s = s.concat(["L", n.x, n.y, "Q", p[1].x, p[1].y, i.x, i.y]);
        n = t(p[2], r, 270 + o);
        i = t(p[2], r, 180 + o);
        s = s.concat(["L", n.x, n.y, "Q", p[2].x, p[2].y, i.x, i.y]);
        n = t(p[3], r, o);
        i = t(p[3], r, 270 + o);
        s = s.concat(["L", n.x, n.y, "Q", p[3].x, p[3].y, i.x, i.y, "Z"]);
        return s.toString()
    };
    if (l) {
        OG.Util.apply(c, (a instanceof OG.geometry.Style) ? a.map : a || {}, OG.Util.apply({}, k.style.map, OG.Util.apply({}, l, j._CONFIG.DEFAULT_STYLE.GEOM)))
    } else {
        OG.Util.apply(c, (a instanceof OG.geometry.Style) ? a.map : a || {}, OG.Util.apply({}, k.style.map, j._CONFIG.DEFAULT_STYLE.GEOM))
    }
    k.style.map = c;
    switch (k.TYPE) {
        case OG.Constants.GEOM_TYPE.POINT:
            d = this._PAPER.circle(k.coordinate.x, k.coordinate.y, 0.5);
            d.attr(c);
            break;
        case OG.Constants.GEOM_TYPE.LINE:
        case OG.Constants.GEOM_TYPE.POLYLINE:
        case OG.Constants.GEOM_TYPE.POLYGON:
            m = "";
            h = k.getVertices();
            for (e = 0; e < h.length; e++) {
                if (e === 0) {
                    m = "M" + h[e].x + " " + h[e].y
                } else {
                    m += "L" + h[e].x + " " + h[e].y
                }
            }
            d = this._PAPER.path(m);
            d.attr(c);
            break;
        case OG.Constants.GEOM_TYPE.RECTANGLE:
            if ((c.r || 0) === 0) {
                m = "";
                h = k.getVertices();
                for (e = 0; e < h.length; e++) {
                    if (e === 0) {
                        m = "M" + h[e].x + " " + h[e].y
                    } else {
                        m += "L" + h[e].x + " " + h[e].y
                    }
                }
            } else {
                m = f(k, c.r || 0)
            }
            d = this._PAPER.path(m);
            d.attr(c);
            break;
        case OG.Constants.GEOM_TYPE.CIRCLE:
            b = OG.JSON.decode(k.toString());
            if (b.type === OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.CIRCLE]) {
                d = this._PAPER.circle(b.center[0], b.center[1], b.radius)
            } else {
                if (b.type === OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.ELLIPSE]) {
                    if (b.angle === 0) {
                        d = this._PAPER.ellipse(b.center[0], b.center[1], b.radiusX, b.radiusY)
                    } else {
                        m = "";
                        h = k.getControlPoints();
                        m = "M" + h[1].x + " " + h[1].y + "A" + b.radiusX + " " + b.radiusY + " " + b.angle + " 1 0 " + h[5].x + " " + h[5].y;
                        m += "M" + h[1].x + " " + h[1].y + "A" + b.radiusX + " " + b.radiusY + " " + b.angle + " 1 1 " + h[5].x + " " + h[5].y;
                        d = this._PAPER.path(m)
                    }
                }
            }
            d.attr(c);
            break;
        case OG.Constants.GEOM_TYPE.ELLIPSE:
            b = OG.JSON.decode(k.toString());
            if (b.angle === 0) {
                d = this._PAPER.ellipse(b.center[0], b.center[1], b.radiusX, b.radiusY)
            } else {
                m = "";
                h = k.getControlPoints();
                m = "M" + h[1].x + " " + h[1].y + "A" + b.radiusX + " " + b.radiusY + " " + b.angle + " 1 0 " + h[5].x + " " + h[5].y;
                m += "M" + h[1].x + " " + h[1].y + "A" + b.radiusX + " " + b.radiusY + " " + b.angle + " 1 1 " + h[5].x + " " + h[5].y;
                d = this._PAPER.path(m)
            }
            d.attr(c);
            break;
        case OG.Constants.GEOM_TYPE.CURVE:
            m = "";
            h = k.getControlPoints();
            for (e = 0; e < h.length; e++) {
                if (e === 0) {
                    m = "M" + h[e].x + " " + h[e].y
                } else {
                    if (e === 1) {
                        m += "R" + h[e].x + " " + h[e].y
                    } else {
                        m += " " + h[e].x + " " + h[e].y
                    }
                }
            }
            d = this._PAPER.path(m);
            d.attr(c);
            break;
        case OG.Constants.GEOM_TYPE.BEZIER_CURVE:
            m = "";
            h = k.getControlPoints();
            for (e = 0; e < h.length; e++) {
                if (e === 0) {
                    m = "M" + h[e].x + " " + h[e].y
                } else {
                    if (e === 1) {
                        m += "C" + h[e].x + " " + h[e].y
                    } else {
                        m += " " + h[e].x + " " + h[e].y
                    }
                }
            }
            d = this._PAPER.path(m);
            d.attr(c);
            break;
        case OG.Constants.GEOM_TYPE.COLLECTION:
            for (e = 0; e < k.geometries.length; e++) {
                this._drawGeometry(g, k.geometries[e], a, k.style.map)
            }
            break
    }
    if (d) {
        this._add(d);
        g.appendChild(d.node);
        return d.node
    } else {
        return g
    }
};
OG.renderer.RaphaelRenderer.prototype._drawLabel = function (v, l, n, s, p, e) {
    var u = this, d = u._CONFIG.LABEL_PADDING, q = n ? n[0] - d * 2 : null, o = n ? n[1] - d * 2 : null, t = n ? n[2] || 0 : 0, h, b, a, g = {}, i, r, f, c, m, k, j;
    OG.Util.apply(g, (s instanceof OG.geometry.Style) ? s.map : s || {}, u._CONFIG.DEFAULT_STYLE.TEXT);
    if (p === 0 || p) {
        h = this._getREleById(p);
        if (h) {
            this._removeChild(h)
        } else {
            h = this._PAPER.group();
            this._add(h, p)
        }
    } else {
        h = this._PAPER.group();
        this._add(h, p)
    }
    i = g["text-anchor"] || "middle";
    g["text-anchor"] = "middle";
    b = this._PAPER.text(v[0], v[1], l);
    b.attr(g);
    f = b.getBBox();
    q = q ? (q > f.width ? q : f.width) : f.width;
    o = o ? (o > f.height ? o : f.height) : f.height;
    c = OG.Util.round(v[0] - q / 2);
    m = OG.Util.round(v[1] - o / 2);
    r = new OG.Rectangle([c, m], q, o);
    if (g["label-direction"] === "vertical") {
        switch (i) {
            case"start":
                j = r.getBoundary().getLowerCenter().y;
                break;
            case"end":
                j = r.getBoundary().getUpperCenter().y;
                break;
            case"middle":
                j = r.getBoundary().getCentroid().y;
                break;
            default:
                j = r.getBoundary().getCentroid().y;
                break
        }
        switch (g["vertical-align"]) {
            case"top":
                k = OG.Util.round(r.getBoundary().getLeftCenter().x + f.height / 2);
                break;
            case"bottom":
                k = OG.Util.round(r.getBoundary().getRightCenter().x - f.height / 2);
                break;
            case"middle":
                k = r.getBoundary().getCentroid().x;
                break;
            default:
                k = r.getBoundary().getCentroid().x;
                break
        }
        t = -90
    } else {
        switch (i) {
            case"start":
                k = r.getBoundary().getLeftCenter().x;
                break;
            case"end":
                k = r.getBoundary().getRightCenter().x;
                break;
            case"middle":
                k = r.getBoundary().getCentroid().x;
                break;
            default:
                k = r.getBoundary().getCentroid().x;
                break
        }
        switch (g["vertical-align"]) {
            case"top":
                j = OG.Util.round(r.getBoundary().getUpperCenter().y + f.height / 2);
                break;
            case"bottom":
                j = OG.Util.round(r.getBoundary().getLowerCenter().y - f.height / 2);
                break;
            case"middle":
                j = r.getBoundary().getCentroid().y;
                break;
            default:
                j = r.getBoundary().getCentroid().y;
                break
        }
    }
    b.attr({x: k, y: j, stroke: "none", fill: g["font-color"] || u._CONFIG.DEFAULT_STYLE.LABEL["font-color"], "font-size": g["font-size"] || u._CONFIG.DEFAULT_STYLE.LABEL["font-size"], "fill-opacity": 1});
    if (t || g["label-angle"]) {
        if (t === 0) {
            t = parseInt(g["label-angle"], 10)
        }
        b.rotate(t)
    }
    b.attr({"text-anchor": i});
    if (e && l) {
        f = b.getBBox();
        a = this._PAPER.rect(f.x - d / 2, f.y - d / 2, f.width + d, f.height + d);
        a.attr({stroke: "none", fill: this._CANVAS_COLOR, "fill-opacity": 1});
        this._add(a);
        h.node.appendChild(a.node)
    }
    this._add(b);
    h.node.appendChild(b.node);
    return h.node
};
OG.renderer.RaphaelRenderer.prototype.drawShape = function (g, h, l, a, b) {
    var c = l ? l[0] : 100, k = l ? l[1] : 100, d, i, j, e, f;
    if (h instanceof OG.shape.GeomShape) {
        i = h.createShape();
        i.moveCentroid(g);
        i.resizeBox(c, k);
        d = this.drawGeom(i, a, b);
        h.geom = d.geom
    } else {
        if (h instanceof OG.shape.TextShape) {
            j = h.createShape();
            d = this.drawText(g, j, l, a, b);
            h.text = d.text;
            h.angle = d.angle;
            h.geom = d.geom
        } else {
            if (h instanceof OG.shape.ImageShape) {
                e = h.createShape();
                d = this.drawImage(g, e, l, a, b);
                h.image = d.image;
                h.angle = d.angle;
                h.geom = d.geom
            } else {
                if (h instanceof OG.shape.HtmlShape) {
                    f = h.createShape();
                    d = this.drawHtml(g, f, l, a, b);
                    h.html = d.html;
                    h.angle = d.angle;
                    h.geom = d.geom
                } else {
                    if (h instanceof OG.shape.EdgeShape) {
                        i = h.geom || h.createShape();
                        d = this.drawEdge(i, a, b);
                        h.geom = d.geom
                    } else {
                        if (h instanceof OG.shape.GroupShape) {
                            i = h.createShape();
                            i.moveCentroid(g);
                            i.resizeBox(c, k);
                            d = this.drawGroup(i, a, b);
                            h.geom = d.geom
                        }
                    }
                }
            }
        }
    }
    if (h.geom) {
        d.shape = h
    }
    d.shapeStyle = (a instanceof OG.geometry.Style) ? a.map : a;
    $(d).attr("_shape_id", h.SHAPE_ID);
    if (!(h instanceof OG.shape.TextShape)) {
        this.drawLabel(d);
        if (h instanceof OG.shape.EdgeShape) {
            this.drawEdgeLabel(d, null, "FROM");
            this.drawEdgeLabel(d, null, "TO")
        }
    }
    if (d.geom) {
        if (OG.Util.isIE7()) {
            d.removeAttribute("geom")
        } else {
            delete d.geom
        }
    }
    if (d.text) {
        if (OG.Util.isIE7()) {
            d.removeAttribute("text")
        } else {
            delete d.text
        }
    }
    if (d.image) {
        if (OG.Util.isIE7()) {
            d.removeAttribute("image")
        } else {
            delete d.image
        }
    }
    if (d.angle) {
        if (OG.Util.isIE7()) {
            d.removeAttribute("angle")
        } else {
            delete d.angle
        }
    }
    $(this._PAPER.canvas).trigger("drawShape", [d]);
    return d
};
OG.renderer.RaphaelRenderer.prototype.drawGeom = function (e, b, f) {
    var c = this, d, a = {};
    OG.Util.apply(a, (b instanceof OG.geometry.Style) ? b.map : b || {});
    if (f === 0 || f) {
        d = this._getREleById(f);
        if (d) {
            this._removeChild(d)
        } else {
            d = this._PAPER.group();
            this._add(d, f, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.GEOM);
            this._ROOT_GROUP.node.appendChild(d.node)
        }
    } else {
        d = this._PAPER.group();
        this._add(d, f, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.GEOM);
        this._ROOT_GROUP.node.appendChild(d.node)
    }
    this._drawGeometry(d.node, e, a);
    d.node.geom = e;
    d.attr(c._CONFIG.DEFAULT_STYLE.SHAPE);
    if (d.node.shape) {
        d.node.shape.geom = e;
        if (d.node.geom) {
            if (OG.Util.isIE7()) {
                d.node.removeAttribute("geom")
            } else {
                delete d.node.geom
            }
        }
    }
    return d.node
};
OG.renderer.RaphaelRenderer.prototype.drawText = function (r, h, j, o, l) {
    var q = this, m = j ? j[0] : null, k = j ? j[1] : null, p = j ? j[2] || 0 : 0, e, a, d = {}, n, c, b, i, g, f;
    OG.Util.apply(d, (o instanceof OG.geometry.Style) ? o.map : o || {}, q._CONFIG.DEFAULT_STYLE.TEXT);
    if (l === 0 || l) {
        e = this._getREleById(l);
        if (e) {
            this._removeChild(e)
        } else {
            e = this._PAPER.group();
            this._add(e, l, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.TEXT);
            this._ROOT_GROUP.node.appendChild(e.node)
        }
    } else {
        e = this._PAPER.group();
        this._add(e, l, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.TEXT);
        this._ROOT_GROUP.node.appendChild(e.node)
    }
    a = this._PAPER.text(r[0], r[1], h);
    a.attr(d);
    c = a.getBBox();
    m = m ? (m > c.width ? m : c.width) : c.width;
    k = k ? (k > c.height ? k : c.height) : c.height;
    b = OG.Util.round(r[0] - m / 2);
    i = OG.Util.round(r[1] - k / 2);
    n = new OG.Rectangle([b, i], m, k);
    n.style.map = d;
    switch (d["text-anchor"]) {
        case"start":
            g = n.getBoundary().getLeftCenter().x;
            break;
        case"end":
            g = n.getBoundary().getRightCenter().x;
            break;
        case"middle":
            g = n.getBoundary().getCentroid().x;
            break;
        default:
            g = n.getBoundary().getCentroid().x;
            break
    }
    switch (d["vertical-align"]) {
        case"top":
            f = OG.Util.round(n.getBoundary().getUpperCenter().y + c.height / 2);
            break;
        case"bottom":
            f = OG.Util.round(n.getBoundary().getLowerCenter().y - c.height / 2);
            break;
        case"middle":
            f = n.getBoundary().getCentroid().y;
            break;
        default:
            f = n.getBoundary().getCentroid().y;
            break
    }
    a.attr({x: g, y: f});
    a.attr({stroke: "none", fill: d["font-color"] || q._CONFIG.DEFAULT_STYLE.LABEL["font-color"], "font-size": d["font-size"] || q._CONFIG.DEFAULT_STYLE.LABEL["font-size"]});
    if (p) {
        a.rotate(p)
    }
    this._add(a);
    e.node.appendChild(a.node);
    e.node.text = h;
    e.node.angle = p;
    e.node.geom = n;
    e.attr(q._CONFIG.DEFAULT_STYLE.SHAPE);
    if (e.node.shape) {
        e.node.shape.text = h;
        e.node.shape.angle = p;
        e.node.shape.geom = n;
        if (e.node.text) {
            if (OG.Util.isIE7()) {
                e.node.removeAttribute("text")
            } else {
                delete e.node.text
            }
        }
        if (e.node.angle) {
            if (OG.Util.isIE7()) {
                e.node.removeAttribute("angle")
            } else {
                delete e.node.angle
            }
        }
        if (e.node.geom) {
            if (OG.Util.isIE7()) {
                e.node.removeAttribute("geom")
            } else {
                delete e.node.geom
            }
        }
    }
    return e.node
};
OG.renderer.RaphaelRenderer.prototype.drawHtml = function (i, h, p, a, b) {
    var j = this, c = p ? p[0] : null, n = p ? p[1] : null, f = p ? p[2] || 0 : 0, m, g, e = {}, o, l, d, k;
    OG.Util.apply(e, (a instanceof OG.geometry.Style) ? a.map : a || {}, j._CONFIG.DEFAULT_STYLE.HTML);
    if (b === 0 || b) {
        m = this._getREleById(b);
        if (m) {
            this._removeChild(m)
        } else {
            m = this._PAPER.group();
            this._add(m, b, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.HTML);
            this._ROOT_GROUP.node.appendChild(m.node)
        }
    } else {
        m = this._PAPER.group();
        this._add(m, b, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.HTML);
        this._ROOT_GROUP.node.appendChild(m.node)
    }
    g = this._PAPER.foreignObject(h, i[0], i[1], c, n);
    g.attr(e);
    o = g.getBBox();
    c = c || o.width;
    n = n || o.height;
    d = OG.Util.round(i[0] - c / 2);
    k = OG.Util.round(i[1] - n / 2);
    g.attr({x: d, y: k});
    l = new OG.Rectangle([d, k], c, n);
    if (f) {
        g.rotate(f)
    }
    l.style.map = e;
    this._add(g);
    m.node.appendChild(g.node);
    m.node.html = h;
    m.node.angle = f;
    m.node.geom = l;
    m.attr(j._CONFIG.DEFAULT_STYLE.SHAPE);
    if (m.node.shape) {
        m.node.shape.html = h;
        m.node.shape.angle = f;
        m.node.shape.geom = l;
        if (m.node.html) {
            if (OG.Util.isIE7()) {
                m.node.removeAttribute("html")
            } else {
                delete m.node.html
            }
        }
        if (m.node.angle) {
            if (OG.Util.isIE7()) {
                m.node.removeAttribute("angle")
            } else {
                delete m.node.angle
            }
        }
        if (m.node.geom) {
            if (OG.Util.isIE7()) {
                m.node.removeAttribute("geom")
            } else {
                delete m.node.geom
            }
        }
    }
    return m.node
};
OG.renderer.RaphaelRenderer.prototype.drawImage = function (h, o, p, a, b) {
    var i = this, c = p ? p[0] : null, m = p ? p[1] : null, f = p ? p[2] || 0 : 0, l, g, e = {}, n, k, d, j;
    OG.Util.apply(e, (a instanceof OG.geometry.Style) ? a.map : a || {}, i._CONFIG.DEFAULT_STYLE.IMAGE);
    if (b === 0 || b) {
        l = this._getREleById(b);
        if (l) {
            this._removeChild(l)
        } else {
            l = this._PAPER.group();
            this._add(l, b, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.IMAGE);
            this._ROOT_GROUP.node.appendChild(l.node)
        }
    } else {
        l = this._PAPER.group();
        this._add(l, b, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.IMAGE);
        this._ROOT_GROUP.node.appendChild(l.node)
    }
    g = this._PAPER.image(o, h[0], h[1], c, m);
    g.attr(e);
    n = g.getBBox();
    c = c || n.width;
    m = m || n.height;
    d = OG.Util.round(h[0] - c / 2);
    j = OG.Util.round(h[1] - m / 2);
    g.attr({x: d, y: j});
    k = new OG.Rectangle([d, j], c, m);
    if (f) {
        g.rotate(f)
    }
    k.style.map = e;
    this._add(g);
    l.node.appendChild(g.node);
    l.node.image = o;
    l.node.angle = f;
    l.node.geom = k;
    l.attr(i._CONFIG.DEFAULT_STYLE.SHAPE);
    if (l.node.shape) {
        l.node.shape.image = o;
        l.node.shape.angle = f;
        l.node.shape.geom = k;
        if (l.node.image) {
            if (OG.Util.isIE7()) {
                l.node.removeAttribute("image")
            } else {
                delete l.node.image
            }
        }
        if (l.node.angle) {
            if (OG.Util.isIE7()) {
                l.node.removeAttribute("angle")
            } else {
                delete l.node.angle
            }
        }
        if (l.node.geom) {
            if (OG.Util.isIE7()) {
                l.node.removeAttribute("geom")
            } else {
                delete l.node.geom
            }
        }
    }
    return l.node
};
OG.renderer.RaphaelRenderer.prototype.drawEdge = function (o, a, b, e) {
    var g = this, m, d = {}, f = o.getVertices(), j = f[0], i = f[f.length - 1], l = [], c, h, n = function (r, q, p) {
        if (p) {
            return[
                [r[0], r[1]],
                [q[0], r[1]],
                [q[0], q[1]]
            ]
        } else {
            return[
                [r[0], r[1]],
                [r[0], q[1]],
                [q[0], q[1]]
            ]
        }
    }, k = function (r, q, p) {
        if (p) {
            return[
                [r[0], r[1]],
                [OG.Util.round((r[0] + q[0]) / 2), r[1]],
                [OG.Util.round((r[0] + q[0]) / 2), q[1]],
                [q[0], q[1]]
            ]
        } else {
            return[
                [r[0], r[1]],
                [r[0], OG.Util.round((r[1] + q[1]) / 2)],
                [q[0], OG.Util.round((r[1] + q[1]) / 2)],
                [q[0], q[1]]
            ]
        }
    };
    OG.Util.apply(d, (a instanceof OG.geometry.Style) ? a.map : a || {}, OG.Util.apply({}, o.style.map, g._CONFIG.DEFAULT_STYLE.EDGE));
    if (b === 0 || b) {
        m = this._getREleById(b);
        if (m) {
            this._removeChild(m)
        } else {
            m = this._PAPER.group();
            this._add(m, b, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.EDGE);
            this._ROOT_GROUP.node.appendChild(m.node)
        }
    } else {
        m = this._PAPER.group();
        this._add(m, b, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.EDGE);
        this._ROOT_GROUP.node.appendChild(m.node)
    }
    if (e) {
        l = [
            [j.x, j.y - g._CONFIG.GUIDE_RECT_SIZE / 2],
            [j.x + g._CONFIG.GUIDE_RECT_SIZE * 2, j.y - g._CONFIG.GUIDE_RECT_SIZE],
            [j.x + g._CONFIG.GUIDE_RECT_SIZE * 2, j.y + g._CONFIG.GUIDE_RECT_SIZE],
            [j.x, j.y + g._CONFIG.GUIDE_RECT_SIZE / 2]
        ]
    } else {
        if (o instanceof OG.geometry.Line) {
            switch (d["edge-type"].toLowerCase()) {
                case OG.Constants.EDGE_TYPE.STRAIGHT:
                    l = [j, i];
                    break;
                case OG.Constants.EDGE_TYPE.PLAIN:
                    h = d["edge-direction"].toLowerCase().split(" ");
                    if (h[0] === "c" || h[1] === "c") {
                        h = this._adjustEdgeDirection(h[0], h[1], [j.x, j.y], [i.x, i.y]).split(" ")
                    }
                    if (h[0] === "e") {
                        switch (h[1]) {
                            case"e":
                                if (j.x <= i.x) {
                                    l = n([j.x, j.y], [i.x + g._CONFIG.EDGE_PADDING, i.y], true);
                                    l.push([i.x, i.y])
                                } else {
                                    l = [
                                        [j.x, j.y]
                                    ];
                                    l = l.concat(n([j.x + g._CONFIG.EDGE_PADDING, j.y], [i.x, i.y], false))
                                }
                                break;
                            case"w":
                                if (j.x <= i.x) {
                                    l = k([j.x, j.y], [i.x, i.y], true)
                                } else {
                                    l = [
                                        [j.x, j.y]
                                    ];
                                    l = l.concat(k([j.x + g._CONFIG.EDGE_PADDING, j.y], [i.x - g._CONFIG.EDGE_PADDING, i.y], false));
                                    l.push([i.x, i.y])
                                }
                                break;
                            case"s":
                                if (j.x <= i.x && j.y <= i.y) {
                                    l = k([j.x, j.y], [i.x, i.y + g._CONFIG.EDGE_PADDING], true);
                                    l.push([i.x, i.y])
                                } else {
                                    if (j.x <= i.x && j.y > i.y) {
                                        l = n([j.x, j.y], [i.x, i.y], true)
                                    } else {
                                        if (j.x > i.x && j.y <= i.y) {
                                            l = [
                                                [j.x, j.y]
                                            ];
                                            l = l.concat(n([j.x + g._CONFIG.EDGE_PADDING, j.y], [i.x, i.y + g._CONFIG.EDGE_PADDING], false));
                                            l.push([i.x, i.y])
                                        } else {
                                            if (j.x > i.x && j.y > i.y) {
                                                l = [
                                                    [j.x, j.y]
                                                ];
                                                l = l.concat(k([j.x + g._CONFIG.EDGE_PADDING, j.y], [i.x, i.y], false))
                                            }
                                        }
                                    }
                                }
                                break;
                            case"n":
                                if (j.x <= i.x && j.y <= i.y) {
                                    l = n([j.x, j.y], [i.x, i.y], true)
                                } else {
                                    if (j.x <= i.x && j.y > i.y) {
                                        l = [
                                            [j.x, j.y]
                                        ];
                                        l = l.concat(n([j.x + g._CONFIG.EDGE_PADDING, j.y], [i.x, i.y - g._CONFIG.EDGE_PADDING], false));
                                        l.push([i.x, i.y])
                                    } else {
                                        if (j.x > i.x && j.y <= i.y) {
                                            l = [
                                                [j.x, j.y]
                                            ];
                                            l = l.concat(k([j.x + g._CONFIG.EDGE_PADDING, j.y], [i.x, i.y], false))
                                        } else {
                                            if (j.x > i.x && j.y > i.y) {
                                                l = [
                                                    [j.x, j.y]
                                                ];
                                                l = l.concat(n([j.x + g._CONFIG.EDGE_PADDING, j.y], [i.x, i.y - g._CONFIG.EDGE_PADDING], false));
                                                l.push([i.x, i.y])
                                            }
                                        }
                                    }
                                }
                                break
                        }
                    } else {
                        if (h[0] === "w") {
                            switch (h[1]) {
                                case"e":
                                    if (j.x <= i.x) {
                                        l = [
                                            [j.x, j.y]
                                        ];
                                        l = l.concat(k([j.x - g._CONFIG.EDGE_PADDING, j.y], [i.x + g._CONFIG.EDGE_PADDING, i.y], false));
                                        l.push([i.x, i.y])
                                    } else {
                                        l = k([j.x, j.y], [i.x, i.y], true)
                                    }
                                    break;
                                case"w":
                                    if (j.x <= i.x) {
                                        l = [
                                            [j.x, j.y]
                                        ];
                                        l = l.concat(n([j.x - g._CONFIG.EDGE_PADDING, j.y], [i.x, i.y], false))
                                    } else {
                                        l = n([j.x, j.y], [i.x - g._CONFIG.EDGE_PADDING, i.y], true);
                                        l.push([i.x, i.y])
                                    }
                                    break;
                                case"s":
                                    if (j.x <= i.x && j.y <= i.y) {
                                        l = [
                                            [j.x, j.y]
                                        ];
                                        l = l.concat(n([j.x - g._CONFIG.EDGE_PADDING, j.y], [i.x, i.y + g._CONFIG.EDGE_PADDING], false));
                                        l.push([i.x, i.y])
                                    } else {
                                        if (j.x <= i.x && j.y > i.y) {
                                            l = [
                                                [j.x, j.y]
                                            ];
                                            l = l.concat(k([j.x - g._CONFIG.EDGE_PADDING, j.y], [i.x, i.y], false))
                                        } else {
                                            if (j.x > i.x && j.y <= i.y) {
                                                l = k([j.x, j.y], [i.x, i.y + g._CONFIG.EDGE_PADDING], true);
                                                l.push([i.x, i.y])
                                            } else {
                                                if (j.x > i.x && j.y > i.y) {
                                                    l = n([j.x, j.y], [i.x, i.y], true)
                                                }
                                            }
                                        }
                                    }
                                    break;
                                case"n":
                                    if (j.x <= i.x && j.y <= i.y) {
                                        l = [
                                            [j.x, j.y]
                                        ];
                                        l = l.concat(k([j.x - g._CONFIG.EDGE_PADDING, j.y], [i.x, i.y], false))
                                    } else {
                                        if (j.x <= i.x && j.y > i.y) {
                                            l = [
                                                [j.x, j.y]
                                            ];
                                            l = l.concat(n([j.x - g._CONFIG.EDGE_PADDING, j.y], [i.x, i.y - g._CONFIG.EDGE_PADDING], false));
                                            l.push([i.x, i.y])
                                        } else {
                                            if (j.x > i.x && j.y <= i.y) {
                                                l = l.concat(n([j.x, j.y], [i.x, i.y], true))
                                            } else {
                                                if (j.x > i.x && j.y > i.y) {
                                                    l = k([j.x, j.y], [i.x, i.y - g._CONFIG.EDGE_PADDING], true);
                                                    l.push([i.x, i.y])
                                                }
                                            }
                                        }
                                    }
                                    break
                            }
                        } else {
                            if (h[0] === "s") {
                                switch (h[1]) {
                                    case"e":
                                        if (j.x <= i.x && j.y <= i.y) {
                                            l = k([j.x, j.y], [i.x + g._CONFIG.EDGE_PADDING, i.y], false);
                                            l.push([i.x, i.y])
                                        } else {
                                            if (j.x <= i.x && j.y > i.y) {
                                                l = [
                                                    [j.x, j.y]
                                                ];
                                                l = l.concat(n([j.x, j.y + g._CONFIG.EDGE_PADDING], [i.x + g._CONFIG.EDGE_PADDING, i.y], true));
                                                l.push([i.x, i.y])
                                            } else {
                                                if (j.x > i.x && j.y <= i.y) {
                                                    l = n([j.x, j.y], [i.x, i.y], false)
                                                } else {
                                                    if (j.x > i.x && j.y > i.y) {
                                                        l = [
                                                            [j.x, j.y]
                                                        ];
                                                        l = l.concat(k([j.x, j.y + g._CONFIG.EDGE_PADDING], [i.x, i.y], true))
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                    case"w":
                                        if (j.x <= i.x && j.y <= i.y) {
                                            l = n([j.x, j.y], [i.x, i.y], false)
                                        } else {
                                            if (j.x <= i.x && j.y > i.y) {
                                                l = [
                                                    [j.x, j.y]
                                                ];
                                                l = l.concat(k([j.x, j.y + g._CONFIG.EDGE_PADDING], [i.x, i.y], true))
                                            } else {
                                                if (j.x > i.x && j.y <= i.y) {
                                                    l = k([j.x, j.y], [i.x - g._CONFIG.EDGE_PADDING, i.y], false);
                                                    l.push([i.x, i.y])
                                                } else {
                                                    if (j.x > i.x && j.y > i.y) {
                                                        l = [
                                                            [j.x, j.y]
                                                        ];
                                                        l = l.concat(n([j.x, j.y + g._CONFIG.EDGE_PADDING], [i.x - g._CONFIG.EDGE_PADDING, i.y], true));
                                                        l.push([i.x, i.y])
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                    case"s":
                                        if (j.y <= i.y) {
                                            l = n([j.x, j.y], [i.x, i.y + g._CONFIG.EDGE_PADDING], false);
                                            l.push([i.x, i.y])
                                        } else {
                                            l = [
                                                [j.x, j.y]
                                            ];
                                            l = l.concat(n([j.x, j.y + g._CONFIG.EDGE_PADDING], [i.x, i.y], true))
                                        }
                                        break;
                                    case"n":
                                        if (j.y <= i.y) {
                                            l = k([j.x, j.y], [i.x, i.y], false)
                                        } else {
                                            l = [
                                                [j.x, j.y]
                                            ];
                                            l = l.concat(k([j.x, j.y + g._CONFIG.EDGE_PADDING], [i.x, i.y - g._CONFIG.EDGE_PADDING], true));
                                            l.push([i.x, i.y])
                                        }
                                        break
                                }
                            } else {
                                if (h[0] === "n") {
                                    switch (h[1]) {
                                        case"e":
                                            if (j.x <= i.x && j.y <= i.y) {
                                                l = [
                                                    [j.x, j.y]
                                                ];
                                                l = l.concat(n([j.x, j.y - g._CONFIG.EDGE_PADDING], [i.x + g._CONFIG.EDGE_PADDING, i.y], true));
                                                l.push([i.x, i.y])
                                            } else {
                                                if (j.x <= i.x && j.y > i.y) {
                                                    l = k([j.x, j.y], [i.x + g._CONFIG.EDGE_PADDING, i.y], false);
                                                    l.push([i.x, i.y])
                                                } else {
                                                    if (j.x > i.x && j.y <= i.y) {
                                                        l = [
                                                            [j.x, j.y]
                                                        ];
                                                        l = l.concat(k([j.x, j.y - g._CONFIG.EDGE_PADDING], [i.x, i.y], true))
                                                    } else {
                                                        if (j.x > i.x && j.y > i.y) {
                                                            l = n([j.x, j.y], [i.x, i.y], false)
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        case"w":
                                            if (j.x <= i.x && j.y <= i.y) {
                                                l = [
                                                    [j.x, j.y]
                                                ];
                                                l = l.concat(k([j.x, j.y - g._CONFIG.EDGE_PADDING], [i.x, i.y], true))
                                            } else {
                                                if (j.x <= i.x && j.y > i.y) {
                                                    l = n([j.x, j.y], [i.x, i.y], false)
                                                } else {
                                                    if (j.x > i.x && j.y <= i.y) {
                                                        l = [
                                                            [j.x, j.y]
                                                        ];
                                                        l = l.concat(n([j.x, j.y - g._CONFIG.EDGE_PADDING], [i.x - g._CONFIG.EDGE_PADDING, i.y], true));
                                                        l.push([i.x, i.y])
                                                    } else {
                                                        if (j.x > i.x && j.y > i.y) {
                                                            l = k([j.x, j.y], [i.x - g._CONFIG.EDGE_PADDING, i.y], false);
                                                            l.push([i.x, i.y])
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        case"s":
                                            if (j.y <= i.y) {
                                                l = [
                                                    [j.x, j.y]
                                                ];
                                                l = l.concat(k([j.x, j.y - g._CONFIG.EDGE_PADDING], [i.x, i.y + g._CONFIG.EDGE_PADDING], true));
                                                l.push([i.x, i.y])
                                            } else {
                                                l = k([j.x, j.y], [i.x, i.y], false)
                                            }
                                            break;
                                        case"n":
                                            if (j.y <= i.y) {
                                                l = [
                                                    [j.x, j.y]
                                                ];
                                                l = l.concat(n([j.x, j.y - g._CONFIG.EDGE_PADDING], [i.x, i.y], true))
                                            } else {
                                                l = n([j.x, j.y], [i.x, i.y - g._CONFIG.EDGE_PADDING], false);
                                                l.push([i.x, i.y])
                                            }
                                            break
                                    }
                                }
                            }
                        }
                    }
                    break;
                case OG.Constants.EDGE_TYPE.BEZIER:
                    h = d["edge-direction"].toLowerCase().split(" ");
                    if (h[0] === "c" || h[1] === "c") {
                        h = this._adjustEdgeDirection(h[0], h[1], [j.x, j.y], [i.x, i.y]).split(" ")
                    }
                    l = this._bezierCurve([j.x, j.y], [i.x, i.y], h[0], h[1]);
                    break
            }
        } else {
            if (o instanceof OG.geometry.Curve) {
                l = o.getControlPoints()
            } else {
                if (o instanceof OG.geometry.BezierCurve) {
                    l = o.getControlPoints()
                } else {
                    l = f
                }
            }
        }
    }
    if (e) {
        c = new OG.Curve(l)
    } else {
        if (o instanceof OG.geometry.Curve) {
            c = new OG.Curve(l)
        } else {
            if (o instanceof OG.geometry.BezierCurve) {
                c = new OG.BezierCurve(l)
            } else {
                if (d["edge-type"].toLowerCase() === OG.Constants.EDGE_TYPE.BEZIER) {
                    c = new OG.BezierCurve(l)
                } else {
                    c = new OG.PolyLine(l)
                }
            }
        }
    }
    this._drawGeometry(m.node, c, g._CONFIG.DEFAULT_STYLE.EDGE_HIDDEN);
    this._drawGeometry(m.node, c, d);
    m.node.geom = c;
    m.attr(g._CONFIG.DEFAULT_STYLE.SHAPE);
    if (m.node.shape) {
        m.node.shape.geom = c;
        if (m.node.geom) {
            if (OG.Util.isIE7()) {
                m.node.removeAttribute("geom")
            } else {
                delete m.node.geom
            }
        }
    }
    return m.node
};
OG.renderer.RaphaelRenderer.prototype.drawGroup = function (j, b, c) {
    var h = this, k, m, e = {}, l, f, d, a, g = {};
    OG.Util.apply(e, (b instanceof OG.geometry.Style) ? b.map : b || {});
    if (c === 0 || c) {
        k = this._getREleById(c);
        if (k) {
            l = k.node.childNodes;
            for (f = l.length - 1; f >= 0; f--) {
                if ($(l[f]).attr("_type") !== OG.Constants.NODE_TYPE.SHAPE) {
                    this._remove(this._getREleById(l[f].id))
                }
            }
        } else {
            k = this._PAPER.group();
            this._add(k, c, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.GROUP);
            this._ROOT_GROUP.node.appendChild(k.node)
        }
    } else {
        k = this._PAPER.group();
        this._add(k, c, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.GROUP);
        this._ROOT_GROUP.node.appendChild(k.node)
    }
    m = this._drawGeometry(k.node, j, e);
    k.node.geom = j;
    k.attr(h._CONFIG.DEFAULT_STYLE.SHAPE);
    OG.Util.apply(g, j.style.map, e);
    if (g["label-direction"] && g["vertical-align"] === "top") {
        d = j.getBoundary();
        if (g["label-direction"] === "vertical") {
            a = new OG.geometry.Line([d.getUpperLeft().x + 20, d.getUpperLeft().y], [d.getLowerLeft().x + 20, d.getLowerLeft().y])
        } else {
            a = new OG.geometry.Line([d.getUpperLeft().x, d.getUpperLeft().y + 20], [d.getUpperRight().x, d.getUpperRight().y + 20])
        }
        this._drawGeometry(k.node, a, e)
    }
    if (m.id !== k.node.firstChild.id) {
        k.node.insertBefore(m, k.node.firstChild)
    }
    if (k.node.shape) {
        if (!k.node.shape.isCollapsed || k.node.shape.isCollapsed === false) {
            k.node.shape.geom = j
        }
        if (k.node.geom) {
            if (OG.Util.isIE7()) {
                k.node.removeAttribute("geom")
            } else {
                delete k.node.geom
            }
        }
    }
    return k.node
};
OG.renderer.RaphaelRenderer.prototype.drawLabel = function (j, m, b) {
    var g = this._getREleById(OG.Util.isElement(j) ? j.id : j), e, h, i, c = {}, f, n, d, l, k = function (s) {
        var q, v, u, o, t = 0, r, p;
        if (s.shape.geom.style.get("edge-type") === OG.Constants.EDGE_TYPE.BEZIER) {
            q = s.shape.geom.getControlPoints();
            v = q[0];
            u = q[q.length - 1];
            return new OG.geometry.Coordinate(OG.Util.round((v.x + u.x) / 2), OG.Util.round((v.y + u.y) / 2))
        } else {
            q = s.shape.geom.getVertices();
            o = s.shape.geom.getLength();
            for (r = 0; r < q.length - 1; r++) {
                t += q[r].distance(q[r + 1]);
                if (t > o / 2) {
                    p = s.shape.geom.intersectCircleToLine(q[r + 1], t - o / 2, q[r + 1], q[r]);
                    break
                }
            }
            return p[0]
        }
    }, a;
    OG.Util.apply(c, (b instanceof OG.geometry.Style) ? b.map : b || {});
    if (g && g.node.shape) {
        m = OG.Util.trim(m);
        e = g.node;
        i = e.shape.geom.getBoundary();
        d = e.shape.label;
        if (m !== undefined && m !== d) {
            l = jQuery.Event("beforeLabelChange", {element: e, afterText: m, beforeText: d});
            $(this._PAPER.canvas).trigger(l);
            if (l.isPropagationStopped()) {
                return false
            }
            m = l.afterText
        }
        OG.Util.apply(e.shape.geom.style.map, c);
        e.shape.label = m === undefined ? e.shape.label : m;
        if (e.shape.label !== undefined) {
            if (e.shape instanceof OG.shape.EdgeShape) {
                a = k(e);
                f = [a.x, a.y];
                n = [0, 0]
            } else {
                switch (e.shape.geom.style.get("label-position")) {
                    case"left":
                        f = [i.getCentroid().x - i.getWidth(), i.getCentroid().y];
                        break;
                    case"right":
                        f = [i.getCentroid().x + i.getWidth(), i.getCentroid().y];
                        break;
                    case"top":
                        f = [i.getCentroid().x, i.getCentroid().y - i.getHeight()];
                        break;
                    case"bottom":
                        f = [i.getCentroid().x, i.getCentroid().y + i.getHeight()];
                        break;
                    default:
                        f = [i.getCentroid().x, i.getCentroid().y];
                        break
                }
                n = [i.getWidth(), i.getHeight()]
            }
            h = this._drawLabel(f, e.shape.label, n, e.shape.geom.style, e.id + OG.Constants.LABEL_SUFFIX, e.shape instanceof OG.shape.EdgeShape);
            e.appendChild(h);
            if (m !== undefined) {
                $(this._PAPER.canvas).trigger("drawLabel", [e, m])
            }
            if (m !== undefined && m !== d) {
                $(this._PAPER.canvas).trigger("labelChanged", [e, m, d])
            }
        }
    }
    return h
};
OG.renderer.RaphaelRenderer.prototype.drawEdgeLabel = function (i, k, h) {
    var g = this, d = this._getREleById(OG.Util.isElement(i) ? i.id : i), b, e, f, c, a, j;
    if (d && d.node.shape) {
        k = OG.Util.trim(k);
        b = d.node;
        if (b.shape instanceof OG.shape.EdgeShape) {
            e = b.shape.geom.getVertices();
            if (h === "FROM") {
                c = [e[0].x, e[0].y + g._CONFIG.FROMTO_LABEL_OFFSET_TOP];
                b.shape.fromLabel = k || b.shape.fromLabel;
                a = b.shape.fromLabel;
                j = OG.Constants.FROM_LABEL_SUFFIX
            } else {
                c = [e[e.length - 1].x, e[e.length - 1].y + g._CONFIG.FROMTO_LABEL_OFFSET_TOP];
                b.shape.toLabel = k || b.shape.toLabel;
                a = b.shape.toLabel;
                j = OG.Constants.TO_LABEL_SUFFIX
            }
            if (a) {
                f = this._drawLabel(c, a, [0, 0], b.shape.geom.style, b.id + j, false);
                b.appendChild(f)
            }
        }
    }
    return f
};
OG.renderer.RaphaelRenderer.prototype.redrawShape = function (e, h) {
    var g = this, f, b, c, i, a, d;
    d = function (s, n) {
        var t, r, p, l = n.childNodes, k, q, o, m;
        for (q = l.length - 1; q >= 0; q--) {
            if ($(l[q]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
                d(s, l[q]);
                m = false;
                t = $(l[q]).attr("_fromedge");
                if (t) {
                    t = t.split(",");
                    for (o = 0; o < t.length; o++) {
                        r = g.getElementById(t[o]);
                        if (r) {
                            k = g._getShapeFromTerminal($(r).attr("_from"));
                            if ($(k).parents("#" + s.id).length === 0) {
                                m = true
                            }
                        }
                    }
                }
                t = $(l[q]).attr("_toedge");
                if (t) {
                    t = t.split(",");
                    for (o = 0; o < t.length; o++) {
                        p = g.getElementById(t[o]);
                        if (p) {
                            k = g._getShapeFromTerminal($(p).attr("_to"));
                            if ($(k).parents("#" + s.id).length === 0) {
                                m = true
                            }
                        }
                    }
                }
                if (m === true) {
                    g.redrawConnectedEdge(l[q])
                }
            }
        }
    };
    if (e && e.shape.geom) {
        switch ($(e).attr("_shape")) {
            case OG.Constants.SHAPE_TYPE.GEOM:
                e = this.drawGeom(e.shape.geom, {}, e.id);
                this.redrawConnectedEdge(e, h);
                this.drawLabel(e);
                break;
            case OG.Constants.SHAPE_TYPE.TEXT:
                f = e.shape.geom.getBoundary();
                b = f.getCentroid();
                c = f.getWidth();
                i = f.getHeight();
                e = this.drawText([b.x, b.y], e.shape.text, [c, i, e.shape.angle], e.shape.geom.style, e.id);
                this.redrawConnectedEdge(e, h);
                break;
            case OG.Constants.SHAPE_TYPE.IMAGE:
                f = e.shape.geom.getBoundary();
                b = f.getCentroid();
                c = f.getWidth();
                i = f.getHeight();
                e = this.drawImage([b.x, b.y], e.shape.image, [c, i, e.shape.angle], e.shape.geom.style, e.id);
                this.redrawConnectedEdge(e, h);
                this.drawLabel(e);
                break;
            case OG.Constants.SHAPE_TYPE.HTML:
                f = e.shape.geom.getBoundary();
                b = f.getCentroid();
                c = f.getWidth();
                i = f.getHeight();
                e = this.drawHtml([b.x, b.y], e.shape.html, [c, i, e.shape.angle], e.shape.geom.style, e.id);
                this.redrawConnectedEdge(e, h);
                this.drawLabel(e);
                break;
            case OG.Constants.SHAPE_TYPE.EDGE:
                e = this.drawEdge(e.shape.geom, e.shape.geom.style, e.id);
                this.drawLabel(e);
                this.drawEdgeLabel(e, null, "FROM");
                this.drawEdgeLabel(e, null, "TO");
                break;
            case OG.Constants.SHAPE_TYPE.GROUP:
                if (e.shape.isCollapsed === true) {
                    f = e.shape.geom.getBoundary();
                    a = f.getUpperLeft();
                    e = this.drawGroup(new OG.geometry.Rectangle(a, g._CONFIG.COLLAPSE_SIZE * 3, g._CONFIG.COLLAPSE_SIZE * 2), e.shape.geom.style, e.id);
                    d(e, e);
                    this.redrawConnectedEdge(e, h)
                } else {
                    e = this.drawGroup(e.shape.geom, e.shape.geom.style, e.id);
                    this.redrawConnectedEdge(e, h);
                    this.drawLabel(e)
                }
                break
        }
    }
    $(this._PAPER.canvas).trigger("redrawShape", [e]);
    return e
};
OG.renderer.RaphaelRenderer.prototype.redrawEdge = function (b) {
    var z = this, f, w, r, A, n, h, m, o, d, g, x, c, s, t, i, k, j, u, l, q, e, y, a, p, v;
    f = OG.Util.isElement(b) ? b : this.getElementById(b);
    w = $(f).attr("_from");
    r = $(f).attr("_to");
    if (w) {
        A = this._getShapeFromTerminal(w);
        h = parseInt(w.substring(w.lastIndexOf("_") + 1), 10);
        o = A.shape.createTerminal()[h];
        x = o.direction.toLowerCase();
        s = o.position
    } else {
        g = f.shape.geom.getVertices();
        x = "c";
        s = g[0]
    }
    if (r) {
        n = this._getShapeFromTerminal(r);
        m = parseInt(r.substring(r.lastIndexOf("_") + 1), 10);
        d = n.shape.createTerminal()[m];
        c = d.direction.toLowerCase();
        t = d.position
    } else {
        g = f.shape.geom.getVertices();
        c = "c";
        t = g[g.length - 1]
    }
    i = s;
    k = t;
    j = x;
    u = c;
    if (A && x === "c") {
        l = this.intersectionEdge(f.shape.geom.style.get("edge-type"), A, [i.x, i.y], [k.x, k.y], true);
        s = l.position;
        x = l.direction
    }
    if (n && c === "c") {
        l = this.intersectionEdge(f.shape.geom.style.get("edge-type"), n, [i.x, i.y], [k.x, k.y], false);
        t = l.position;
        c = l.direction
    }
    q = A && n && A.id === n.id;
    if (q) {
        s = t = A.shape.geom.getBoundary().getRightCenter()
    } else {
        if (A) {
            e = $(A).parents("[_collapsed=true]");
            if (e.length !== 0 || $(A).attr("_collapsed") === "true") {
                if (e.length === 0) {
                    y = A.shape.geom.getBoundary()
                } else {
                    y = e[e.length - 1].shape.geom.getBoundary()
                }
                a = y.getUpperLeft();
                p = new OG.geometry.Rectangle(a, z._CONFIG.COLLAPSE_SIZE * 3, z._CONFIG.COLLAPSE_SIZE * 2);
                switch (x.toUpperCase()) {
                    case OG.Constants.TERMINAL_TYPE.E:
                        v = p.getBoundary().getRightCenter();
                        break;
                    case OG.Constants.TERMINAL_TYPE.W:
                        v = p.getBoundary().getLeftCenter();
                        break;
                    case OG.Constants.TERMINAL_TYPE.S:
                        v = p.getBoundary().getLowerCenter();
                        break;
                    case OG.Constants.TERMINAL_TYPE.N:
                        v = p.getBoundary().getUpperCenter();
                        break
                }
                if (v) {
                    s = [v.x, v.y]
                }
            }
        }
        if (n) {
            e = $(n).parents("[_collapsed=true]");
            if (e.length !== 0 || $(n).attr("_collapsed") === "true") {
                if (e.length === 0) {
                    y = n.shape.geom.getBoundary()
                } else {
                    y = e[e.length - 1].shape.geom.getBoundary()
                }
                a = y.getUpperLeft();
                p = new OG.geometry.Rectangle(a, z._CONFIG.COLLAPSE_SIZE * 3, z._CONFIG.COLLAPSE_SIZE * 2);
                switch (c.toUpperCase()) {
                    case OG.Constants.TERMINAL_TYPE.E:
                        v = p.getBoundary().getRightCenter();
                        break;
                    case OG.Constants.TERMINAL_TYPE.W:
                        v = p.getBoundary().getLeftCenter();
                        break;
                    case OG.Constants.TERMINAL_TYPE.S:
                        v = p.getBoundary().getLowerCenter();
                        break;
                    case OG.Constants.TERMINAL_TYPE.N:
                        v = p.getBoundary().getUpperCenter();
                        break
                }
                if (v) {
                    t = [v.x, v.y]
                }
            }
        }
    }
    f = this.drawEdge(new OG.Line(s, t), OG.Util.apply(f.shape.geom.style.map, {"edge-direction": x + " " + c}), f.id, q);
    this.drawLabel(f);
    this.drawEdgeLabel(f, null, "FROM");
    this.drawEdgeLabel(f, null, "TO");
    OG.Util.apply(f.shape.geom.style.map, {"edge-direction": j + " " + u})
};
OG.renderer.RaphaelRenderer.prototype.redrawConnectedEdge = function (a, c) {
    var b = this, d;
    d = $(a).attr("_fromedge");
    if (d) {
        $.each(d.split(","), function (e, f) {
            if (!c || c.toString().indexOf(f) < 0) {
                b.redrawEdge(f)
            }
        })
    }
    d = $(a).attr("_toedge");
    if (d) {
        $.each(d.split(","), function (e, f) {
            if (!c || c.toString().indexOf(f) < 0) {
                b.redrawEdge(f)
            }
        })
    }
    this.removeAllTerminal()
};
OG.renderer.RaphaelRenderer.prototype.connect = function (o, a, e, r, j) {
    var t = this, i = {}, u, l, k, n, p, f, g, s, b, h, q, m, d, c = function (x, w, y) {
        var z = $(x).attr(w), A = z ? z.split(",") : [], v = [];
        $.each(A, function (B, C) {
            if (C !== y) {
                v.push(C)
            }
        });
        v.push(y);
        $(x).attr(w, v.toString());
        return x
    };
    OG.Util.apply(i, (r instanceof OG.geometry.Style) ? r.map : r || {}, t._CONFIG.DEFAULT_STYLE.EDGE);
    if (OG.Util.isElement(o)) {
        u = this._getShapeFromTerminal(o);
        n = [o.terminal.position.x, o.terminal.position.y];
        s = o.terminal.direction.toLowerCase()
    } else {
        n = o;
        s = "c"
    }
    if (OG.Util.isElement(a)) {
        l = this._getShapeFromTerminal(a);
        p = [a.terminal.position.x, a.terminal.position.y];
        b = a.terminal.direction.toLowerCase()
    } else {
        p = a;
        b = "c"
    }
    if (u && l) {
        d = jQuery.Event("beforeConnectShape", {edge: e, fromShape: u, toShape: l});
        $(this._PAPER.canvas).trigger(d);
        if (d.isPropagationStopped()) {
            this.remove(e);
            return false
        }
    }
    f = n;
    g = p;
    h = s;
    q = b;
    if (u && s === "c") {
        k = this.intersectionEdge(i["edge-type"], u, f, g, true);
        n = k.position;
        s = k.direction
    }
    if (l && b === "c") {
        k = this.intersectionEdge(i["edge-type"], l, f, g, false);
        p = k.position;
        b = k.direction
    }
    m = u && l && u.id === l.id;
    if (m) {
        n = p = u.shape.geom.getBoundary().getRightCenter()
    }
    e = this.drawEdge(new OG.Line(n, p), OG.Util.apply(i, {"edge-direction": s + " " + b}), e ? e.id : null, m);
    this.drawLabel(e, j);
    this.drawEdgeLabel(e, null, "FROM");
    this.drawEdgeLabel(e, null, "TO");
    OG.Util.apply(e.shape.geom.style.map, {"edge-direction": h + " " + q});
    e.shapeStyle = e.shape.geom.style.map;
    this.disconnect(e);
    if (OG.Util.isElement(o)) {
        $(e).attr("_from", o.id);
        c(u, "_toedge", e.id)
    }
    if (OG.Util.isElement(a)) {
        $(e).attr("_to", a.id);
        c(l, "_fromedge", e.id)
    }
    this.removeAllTerminal();
    if (u && l) {
        $(this._PAPER.canvas).trigger("connectShape", [e, u, l])
    }
    return e
};
OG.renderer.RaphaelRenderer.prototype.disconnect = function (f) {
    var i = this, j, g, k, d, b, a, h, e, c = function (n, m, o) {
        var p = $(n).attr(m), q = p ? p.split(",") : [], l = [];
        $.each(q, function (r, s) {
            if (s !== o) {
                l.push(s)
            }
        });
        $(n).attr(m, l.toString());
        return n
    };
    if (f) {
        if ($(f).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
            j = $(f).attr("_from");
            g = $(f).attr("_to");
            if (j) {
                k = this._getShapeFromTerminal(j);
                c(k, "_toedge", f.id);
                $(f).removeAttr("_from")
            }
            if (g) {
                d = this._getShapeFromTerminal(g);
                c(d, "_fromedge", f.id);
                $(f).removeAttr("_to")
            }
            if (k && d) {
                $(this._PAPER.canvas).trigger("disconnectShape", [f, k, d])
            }
        } else {
            b = $(f).attr("_fromedge");
            a = $(f).attr("_toedge");
            if (b) {
                $.each(b.split(","), function (l, m) {
                    h = i.getElementById(m);
                    j = $(h).attr("_from");
                    if (j) {
                        k = i._getShapeFromTerminal(j);
                        c(k, "_toedge", m)
                    }
                    if (k && f) {
                        $(i._PAPER.canvas).trigger("disconnectShape", [h, k, f])
                    }
                    i.remove(h)
                })
            }
            if (a) {
                $.each(a.split(","), function (l, m) {
                    e = i.getElementById(m);
                    g = $(e).attr("_to");
                    if (g) {
                        d = i._getShapeFromTerminal(g);
                        c(d, "_fromedge", m)
                    }
                    if (f && d) {
                        $(i._PAPER.canvas).trigger("disconnectShape", [e, f, d])
                    }
                    i.remove(e)
                })
            }
        }
    }
};
OG.renderer.RaphaelRenderer.prototype.drawDropOverGuide = function (b) {
    var f = this, d = this._getREleById(OG.Util.isElement(b) ? b.id : b), g = d ? d.node.shape.geom : null, e, i, a, h = f._CONFIG.GUIDE_RECT_SIZE / 2, c = h / 2;
    if (d && g && $(b).attr("_shape") !== OG.Constants.SHAPE_TYPE.EDGE && !this._getREleById(d.id + OG.Constants.DROP_OVER_BBOX_SUFFIX)) {
        e = g.getBoundary();
        i = e.getUpperLeft();
        a = this._PAPER.rect(i.x - c, i.y - c, e.getWidth() + h, e.getHeight() + h);
        a.attr(OG.Util.apply({"stroke-width": h}, f._CONFIG.DEFAULT_STYLE.DROP_OVER_BBOX));
        this._add(a, d.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
        a.insertAfter(d)
    }
};
OG.renderer.RaphaelRenderer.prototype.drawGuide = function (c) {
    var w = this, s = this._getREleById(OG.Util.isElement(c) ? c.id : c), i = s ? s.node.shape.geom : null, b, l, x, k, o, e, g, p, n, v, z, f, t, m, r, j, a, d, u, y, h = w._CONFIG.GUIDE_RECT_SIZE, q = OG.Util.round(h / 2);
    if (s && i) {
        if ($(c).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
            return this.drawEdgeGuide(c)
        } else {
            b = i.getBoundary();
            o = b.getUpperLeft();
            e = b.getUpperRight();
            g = b.getLowerLeft();
            p = b.getLowerRight();
            n = b.getLeftCenter();
            v = b.getUpperCenter();
            z = b.getRightCenter();
            f = b.getLowerCenter();
            if (this._getREleById(s.id + OG.Constants.GUIDE_SUFFIX.GUIDE)) {
                this._remove(this._getREleById(s.id + OG.Constants.GUIDE_SUFFIX.BBOX));
                k = this._PAPER.rect(o.x, o.y, b.getWidth(), b.getHeight());
                k.attr(w._CONFIG.DEFAULT_STYLE.GUIDE_BBOX);
                this._add(k, s.id + OG.Constants.GUIDE_SUFFIX.BBOX);
                k.insertBefore(s);
                t = this._getREleById(s.id + OG.Constants.GUIDE_SUFFIX.UL);
                m = this._getREleById(s.id + OG.Constants.GUIDE_SUFFIX.UR);
                r = this._getREleById(s.id + OG.Constants.GUIDE_SUFFIX.LL);
                j = this._getREleById(s.id + OG.Constants.GUIDE_SUFFIX.LR);
                a = this._getREleById(s.id + OG.Constants.GUIDE_SUFFIX.LC);
                d = this._getREleById(s.id + OG.Constants.GUIDE_SUFFIX.UC);
                u = this._getREleById(s.id + OG.Constants.GUIDE_SUFFIX.RC);
                y = this._getREleById(s.id + OG.Constants.GUIDE_SUFFIX.LWC);
                t.attr({x: o.x - q, y: o.y - q});
                m.attr({x: e.x - q, y: e.y - q});
                r.attr({x: g.x - q, y: g.y - q});
                j.attr({x: p.x - q, y: p.y - q});
                a.attr({x: n.x - q, y: n.y - q});
                d.attr({x: v.x - q, y: v.y - q});
                u.attr({x: z.x - q, y: z.y - q});
                y.attr({x: f.x - q, y: f.y - q});
                return null
            }
            l = this._getREleById(s.id + OG.Constants.GUIDE_SUFFIX.GUIDE);
            if (l) {
                this._remove(l);
                this._remove(this._getREleById(s.id + OG.Constants.GUIDE_SUFFIX.BBOX))
            }
            l = this._PAPER.group();
            k = this._PAPER.rect(o.x, o.y, b.getWidth(), b.getHeight());
            t = this._PAPER.rect(o.x - q, o.y - q, h, h);
            m = this._PAPER.rect(e.x - q, e.y - q, h, h);
            r = this._PAPER.rect(g.x - q, g.y - q, h, h);
            j = this._PAPER.rect(p.x - q, p.y - q, h, h);
            a = this._PAPER.rect(n.x - q, n.y - q, h, h);
            d = this._PAPER.rect(v.x - q, v.y - q, h, h);
            u = this._PAPER.rect(z.x - q, z.y - q, h, h);
            y = this._PAPER.rect(f.x - q, f.y - q, h, h);
            k.attr(w._CONFIG.DEFAULT_STYLE.GUIDE_BBOX);
            t.attr(w._CONFIG.DEFAULT_STYLE.GUIDE_UL);
            m.attr(w._CONFIG.DEFAULT_STYLE.GUIDE_UR);
            r.attr(w._CONFIG.DEFAULT_STYLE.GUIDE_LL);
            j.attr(w._CONFIG.DEFAULT_STYLE.GUIDE_LR);
            a.attr(w._CONFIG.DEFAULT_STYLE.GUIDE_LC);
            d.attr(w._CONFIG.DEFAULT_STYLE.GUIDE_UC);
            u.attr(w._CONFIG.DEFAULT_STYLE.GUIDE_RC);
            y.attr(w._CONFIG.DEFAULT_STYLE.GUIDE_LWC);
            l.appendChild(t);
            l.appendChild(m);
            l.appendChild(r);
            l.appendChild(j);
            l.appendChild(a);
            l.appendChild(d);
            l.appendChild(u);
            l.appendChild(y);
            this._add(l, s.id + OG.Constants.GUIDE_SUFFIX.GUIDE);
            this._add(k, s.id + OG.Constants.GUIDE_SUFFIX.BBOX);
            this._add(t, s.id + OG.Constants.GUIDE_SUFFIX.UL);
            this._add(m, s.id + OG.Constants.GUIDE_SUFFIX.UR);
            this._add(r, s.id + OG.Constants.GUIDE_SUFFIX.LL);
            this._add(j, s.id + OG.Constants.GUIDE_SUFFIX.LR);
            this._add(a, s.id + OG.Constants.GUIDE_SUFFIX.LC);
            this._add(d, s.id + OG.Constants.GUIDE_SUFFIX.UC);
            this._add(u, s.id + OG.Constants.GUIDE_SUFFIX.RC);
            this._add(y, s.id + OG.Constants.GUIDE_SUFFIX.LWC);
            x = {bBox: k.node, group: l.node, ul: t.node, ur: m.node, ll: r.node, lr: j.node, lc: a.node, uc: d.node, rc: u.node, lwc: y.node};
            k.insertBefore(s);
            l.insertAfter(s);
            $(s.node).attr("_selected", "true");
            return x
        }
    }
    return null
};
OG.renderer.RaphaelRenderer.prototype.removeGuide = function (c) {
    var b = this._getREleById(OG.Util.isElement(c) ? c.id : c), a = this._getREleById(b.id + OG.Constants.GUIDE_SUFFIX.GUIDE), d = this._getREleById(b.id + OG.Constants.GUIDE_SUFFIX.BBOX);
    b.node.removeAttribute("_selected");
    this._remove(a);
    this._remove(d)
};
OG.renderer.RaphaelRenderer.prototype.removeAllGuide = function () {
    var a = this;
    $(a.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (b, c) {
        if (OG.Util.isElement(c) && c.id) {
            a.removeGuide(c)
        }
    })
};
OG.renderer.RaphaelRenderer.prototype.drawEdgeGuide = function (a) {
    var q = this, k = this._getREleById(OG.Util.isElement(a) ? a.id : a), c = k ? k.node.shape.geom : null, d, m, f, s, n, o, r, g, h, l = [], b = q._CONFIG.GUIDE_RECT_SIZE, j = OG.Util.round(b / 2), e = {}, p;
    if (k && c) {
        OG.Util.apply(e, c.style.map, q._CONFIG.DEFAULT_STYLE.EDGE);
        d = e["edge-type"] === OG.Constants.EDGE_TYPE.BEZIER ? c.getControlPoints() : c.getVertices();
        m = $(a).attr("_from") && $(a).attr("_to") && $(a).attr("_from") === $(a).attr("_to");
        if (this._getREleById(k.id + OG.Constants.GUIDE_SUFFIX.GUIDE)) {
            this._remove(this._getREleById(k.id + OG.Constants.GUIDE_SUFFIX.BBOX));
            n = "";
            if (e["edge-type"] === OG.Constants.EDGE_TYPE.BEZIER) {
                for (p = 0; p < d.length; p++) {
                    if (p === 0) {
                        n = "M" + d[p].x + " " + d[p].y
                    } else {
                        if (p === 1) {
                            n += "C" + d[p].x + " " + d[p].y
                        } else {
                            n += " " + d[p].x + " " + d[p].y
                        }
                    }
                }
            } else {
                for (p = 0; p < d.length; p++) {
                    if (p === 0) {
                        n = "M" + d[p].x + " " + d[p].y
                    } else {
                        n += "L" + d[p].x + " " + d[p].y
                    }
                }
            }
            o = this._PAPER.path(n);
            o.attr(q._CONFIG.DEFAULT_STYLE.GUIDE_BBOX);
            this._add(o, k.id + OG.Constants.GUIDE_SUFFIX.BBOX);
            o.insertBefore(k);
            r = this._getREleById(k.id + OG.Constants.GUIDE_SUFFIX.FROM);
            r.attr({x: d[0].x - j, y: d[0].y - j});
            g = this._getREleById(k.id + OG.Constants.GUIDE_SUFFIX.TO);
            g.attr({x: d[d.length - 1].x - j, y: d[d.length - 1].y - j});
            if (!m && e["edge-type"] !== OG.Constants.EDGE_TYPE.BEZIER) {
                for (p = 1; p < d.length - 2; p++) {
                    if (d[p].x === d[p + 1].x) {
                        h = this._getREleById(k.id + OG.Constants.GUIDE_SUFFIX.CTL_H + p);
                        if (h) {
                            h.attr({x: d[p].x - j, y: OG.Util.round((d[p].y + d[p + 1].y) / 2) - j})
                        }
                    } else {
                        h = this._getREleById(k.id + OG.Constants.GUIDE_SUFFIX.CTL_V + p);
                        if (h) {
                            h.attr({x: OG.Util.round((d[p].x + d[p + 1].x) / 2) - j, y: d[p].y - j})
                        }
                    }
                }
            }
            return null
        }
        f = this._getREleById(k.id + OG.Constants.GUIDE_SUFFIX.GUIDE);
        if (f) {
            this._remove(f);
            this._remove(this._getREleById(k.id + OG.Constants.GUIDE_SUFFIX.BBOX))
        }
        f = this._PAPER.group();
        n = "";
        if (e["edge-type"] === OG.Constants.EDGE_TYPE.BEZIER) {
            for (p = 0; p < d.length; p++) {
                if (p === 0) {
                    n = "M" + d[p].x + " " + d[p].y
                } else {
                    if (p === 1) {
                        n += "C" + d[p].x + " " + d[p].y
                    } else {
                        n += " " + d[p].x + " " + d[p].y
                    }
                }
            }
        } else {
            for (p = 0; p < d.length; p++) {
                if (p === 0) {
                    n = "M" + d[p].x + " " + d[p].y
                } else {
                    n += "L" + d[p].x + " " + d[p].y
                }
            }
        }
        o = this._PAPER.path(n);
        o.attr(q._CONFIG.DEFAULT_STYLE.GUIDE_BBOX);
        r = this._PAPER.rect(d[0].x - j, d[0].y - j, b, b);
        r.attr(q._CONFIG.DEFAULT_STYLE.GUIDE_FROM);
        f.appendChild(r);
        this._add(r, k.id + OG.Constants.GUIDE_SUFFIX.FROM);
        g = this._PAPER.rect(d[d.length - 1].x - j, d[d.length - 1].y - j, b, b);
        g.attr(q._CONFIG.DEFAULT_STYLE.GUIDE_TO);
        f.appendChild(g);
        this._add(g, k.id + OG.Constants.GUIDE_SUFFIX.TO);
        if (!m && e["edge-type"] !== OG.Constants.EDGE_TYPE.BEZIER) {
            for (p = 1; p < d.length - 2; p++) {
                if (d[p].x === d[p + 1].x) {
                    h = this._PAPER.rect(d[p].x - j, OG.Util.round((d[p].y + d[p + 1].y) / 2) - j, b, b);
                    h.attr(q._CONFIG.DEFAULT_STYLE.GUIDE_CTL_H);
                    this._add(h, k.id + OG.Constants.GUIDE_SUFFIX.CTL_H + p)
                } else {
                    h = this._PAPER.rect(OG.Util.round((d[p].x + d[p + 1].x) / 2) - j, d[p].y - j, b, b);
                    h.attr(q._CONFIG.DEFAULT_STYLE.GUIDE_CTL_V);
                    this._add(h, k.id + OG.Constants.GUIDE_SUFFIX.CTL_V + p)
                }
                f.appendChild(h);
                l.push(h.node)
            }
        }
        this._add(o, k.id + OG.Constants.GUIDE_SUFFIX.BBOX);
        this._add(f, k.id + OG.Constants.GUIDE_SUFFIX.GUIDE);
        s = {bBox: o.node, group: f.node, from: r.node, to: g.node, controls: l};
        o.insertBefore(k);
        f.insertAfter(k);
        $(k.node).attr("_selected", "true");
        return s
    }
    return null
};
OG.renderer.RaphaelRenderer.prototype.drawRubberBand = function (d, j, a) {
    var e = this, h = d ? d[0] : 0, g = d ? d[1] : 0, b = j ? j[0] : 0, i = j ? j[1] : 0, f = this._getREleById(OG.Constants.RUBBER_BAND_ID), c = {};
    if (f) {
        f.attr({x: h, y: g, width: Math.abs(b), height: Math.abs(i)});
        return f
    }
    OG.Util.apply(c, (a instanceof OG.geometry.Style) ? a.map : a || {}, e._CONFIG.DEFAULT_STYLE.RUBBER_BAND);
    f = this._PAPER.rect(h, g, b, i).attr(c);
    this._add(f, OG.Constants.RUBBER_BAND_ID);
    this._ETC_GROUP.node.appendChild(f.node);
    return f.node
};
OG.renderer.RaphaelRenderer.prototype.removeRubberBand = function (a) {
    this.setAttr(OG.Constants.RUBBER_BAND_ID, {x: 0, y: 0, width: 0, height: 0});
    $(a).removeData("dragBox_first");
    $(a).removeData("rubberBand")
};
OG.renderer.RaphaelRenderer.prototype.drawTerminal = function (a, b) {
    var f = this, c = this._getREleById(OG.Util.isElement(a) ? a.id : a), l = c ? c.node.shape.createTerminal() : null, e = c ? c.node.shape.geom.getBoundary() : null, k, j, h, i, g, m = f._CONFIG.TERMINAL_SIZE, d = m * 2;
    if (c && l && l.length > 0) {
        k = this._getREleById(c.id + OG.Constants.TERMINAL_SUFFIX.GROUP);
        h = this._getREleById(c.id + OG.Constants.TERMINAL_SUFFIX.BOX);
        if (k || h) {
            return{bBox: h.node, terminal: k.node}
        }
        k = this._PAPER.group();
        h = this._PAPER.rect(e.getUpperLeft().x - d, e.getUpperLeft().y - d, e.getWidth() + d * 2, e.getHeight() + d * 2);
        h.attr(f._CONFIG.DEFAULT_STYLE.TERMINAL_BBOX);
        this._add(h, c.id + OG.Constants.TERMINAL_SUFFIX.BOX);
        $.each(l, function (n, o) {
            if (!b || o.inout.indexOf(b) >= 0) {
                i = o.position.x;
                g = o.position.y;
                j = f._PAPER.circle(i, g, m);
                j.attr(f._CONFIG.DEFAULT_STYLE.TERMINAL);
                j.node.terminal = o;
                k.appendChild(j);
                f._add(j, c.id + OG.Constants.TERMINAL_SUFFIX.GROUP + "_" + o.direction + "_" + o.inout + "_" + n)
            }
        });
        this._add(k, c.id + OG.Constants.TERMINAL_SUFFIX.GROUP);
        h.insertBefore(c);
        k.insertAfter(c);
        return{bBox: h.node, terminal: k.node}
    }
    return null
};
OG.renderer.RaphaelRenderer.prototype.removeTerminal = function (b) {
    var a = this._getREleById(OG.Util.isElement(b) ? b.id : b), d, c;
    if (a) {
        d = this._getREleById(a.id + OG.Constants.TERMINAL_SUFFIX.GROUP);
        if (d) {
            this._remove(d)
        }
        c = this._getREleById(a.id + OG.Constants.TERMINAL_SUFFIX.BOX);
        if (c) {
            this._remove(c)
        }
    }
};
OG.renderer.RaphaelRenderer.prototype.removeAllTerminal = function () {
    var a = this;
    $.each(this._ELE_MAP.keys(), function (b, c) {
        a.removeTerminal(c)
    })
};
OG.renderer.RaphaelRenderer.prototype.drawCollapseGuide = function (b) {
    var g = this, e = this._getREleById(OG.Util.isElement(b) ? b.id : b), i = e ? e.node.shape.geom : null, f, j, a, d, h = g._CONFIG.COLLAPSE_SIZE, c = h / 2;
    if (e && i && $(b).attr("_shape") === OG.Constants.SHAPE_TYPE.GROUP) {
        a = this._getREleById(e.id + OG.Constants.COLLAPSE_BBOX_SUFFIX);
        if (a) {
            this._remove(a)
        }
        d = this._getREleById(e.id + OG.Constants.COLLAPSE_SUFFIX);
        if (d) {
            this._remove(d)
        }
        f = i.getBoundary();
        j = f.getUpperLeft();
        a = this._PAPER.rect(f.getUpperLeft().x - h, f.getUpperLeft().y - h, f.getWidth() + h * 2, f.getHeight() + h * 2);
        a.attr(g._CONFIG.DEFAULT_STYLE.COLLAPSE_BBOX);
        this._add(a, e.id + OG.Constants.COLLAPSE_BBOX_SUFFIX);
        if (e.node.shape.isCollapsed === true) {
            d = this._PAPER.path("M" + (j.x + c) + " " + (j.y + c) + "h" + h + "v" + h + "h" + (-1 * h) + "v" + (-1 * h) + "m1 " + c + "h" + (h - 2) + "M" + (j.x + c) + " " + (j.y + c) + "m" + c + " 1v" + (h - 2))
        } else {
            d = this._PAPER.path("M" + (j.x + c) + " " + (j.y + c) + "h" + h + "v" + h + "h" + (-1 * h) + "v" + (-1 * h) + "m1 " + c + "h" + (h - 2))
        }
        d.attr(g._CONFIG.DEFAULT_STYLE.COLLAPSE);
        this._add(d, e.id + OG.Constants.COLLAPSE_SUFFIX);
        a.insertBefore(e);
        d.insertAfter(e);
        return{bBox: a.node, collapse: d.node}
    }
    return null
};
OG.renderer.RaphaelRenderer.prototype.removeCollapseGuide = function (c) {
    var a = this._getREleById(OG.Util.isElement(c) ? c.id : c), d, b;
    if (a) {
        d = this._getREleById(a.id + OG.Constants.COLLAPSE_BBOX_SUFFIX);
        if (d) {
            this._remove(d)
        }
        b = this._getREleById(a.id + OG.Constants.COLLAPSE_SUFFIX);
        if (b) {
            this._remove(b)
        }
    }
};
OG.renderer.RaphaelRenderer.prototype.group = function (a) {
    var c, b = [], g, h, e, f, j, d;
    if (a && a.length > 1) {
        for (d = 0; d < a.length; d++) {
            b.push(a[d].shape.geom)
        }
        g = new OG.GeometryCollection(b);
        h = g.getBoundary();
        e = [h.getCentroid().x, h.getCentroid().y];
        f = new OG.GroupShape();
        j = [h.getWidth(), h.getHeight()];
        c = this.drawShape(e, f, j);
        for (d = 0; d < a.length; d++) {
            c.appendChild(a[d])
        }
        $(this._PAPER.canvas).trigger("group", [c])
    }
    return c
};
OG.renderer.RaphaelRenderer.prototype.ungroup = function (d) {
    var e = [], c, b, a;
    if (d && d.length > 0) {
        for (b = 0; b < d.length; b++) {
            c = $(d[b]).children("[_type='" + OG.Constants.NODE_TYPE.SHAPE + "']");
            for (a = 0; a < c.length; a++) {
                d[b].parentNode.appendChild(c[a]);
                e.push(c[a])
            }
            this.removeShape(d[b])
        }
        $(this._PAPER.canvas).trigger("ungroup", [e])
    }
    return e
};
OG.renderer.RaphaelRenderer.prototype.addToGroup = function (b, c) {
    var a;
    for (a = 0; a < c.length; a++) {
        b.appendChild(c[a])
    }
};
OG.renderer.RaphaelRenderer.prototype.collapse = function (c) {
    var d = this, e, b, a;
    a = function (p, k) {
        var q, o, m, g = k.childNodes, f, n, l, h;
        for (n = g.length - 1; n >= 0; n--) {
            if ($(g[n]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
                a(p, g[n]);
                h = false;
                q = $(g[n]).attr("_fromedge");
                if (q) {
                    q = q.split(",");
                    for (l = 0; l < q.length; l++) {
                        o = d.getElementById(q[l]);
                        if (o) {
                            f = d._getShapeFromTerminal($(o).attr("_from"));
                            if ($(f).parents("#" + p.id).length !== 0) {
                                d.hide(o)
                            } else {
                                h = true
                            }
                        }
                    }
                }
                q = $(g[n]).attr("_toedge");
                if (q) {
                    q = q.split(",");
                    for (l = 0; l < q.length; l++) {
                        m = d.getElementById(q[l]);
                        if (m) {
                            f = d._getShapeFromTerminal($(m).attr("_to"));
                            if ($(f).parents("#" + p.id).length !== 0) {
                                d.hide(m)
                            } else {
                                h = true
                            }
                        }
                    }
                }
                if (h === true) {
                    d.redrawConnectedEdge(g[n])
                }
            }
        }
    };
    if (c.shape) {
        e = c.childNodes;
        for (b = e.length - 1; b >= 0; b--) {
            if ($(e[b]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
                this.hide(e[b])
            }
        }
        c.shape.isCollapsed = true;
        $(c).attr("_collapsed", true);
        a(c, c);
        this.redrawShape(c);
        $(this._PAPER.canvas).trigger("collapsed", [c])
    }
};
OG.renderer.RaphaelRenderer.prototype.expand = function (c) {
    var d = this, e, b, a;
    a = function (p, k) {
        var q, o, m, g = k.childNodes, f, n, l, h;
        for (n = g.length - 1; n >= 0; n--) {
            if ($(g[n]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
                a(p, g[n]);
                h = false;
                q = $(g[n]).attr("_fromedge");
                if (q) {
                    q = q.split(",");
                    for (l = 0; l < q.length; l++) {
                        o = d.getElementById(q[l]);
                        if (o) {
                            f = d._getShapeFromTerminal($(o).attr("_from"));
                            if ($(f).parents("#" + p.id).length !== 0) {
                                d.show(o)
                            } else {
                                h = true
                            }
                        }
                    }
                }
                q = $(g[n]).attr("_toedge");
                if (q) {
                    q = q.split(",");
                    for (l = 0; l < q.length; l++) {
                        m = d.getElementById(q[l]);
                        if (m) {
                            f = d._getShapeFromTerminal($(m).attr("_to"));
                            if ($(f).parents("#" + p.id).length !== 0) {
                                d.show(m)
                            } else {
                                h = true
                            }
                        }
                    }
                }
                if (h === true) {
                    d.redrawConnectedEdge(g[n])
                }
            }
        }
    };
    if (c.shape) {
        e = c.childNodes;
        for (b = e.length - 1; b >= 0; b--) {
            if ($(e[b]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
                this.show(e[b])
            }
        }
        c.shape.isCollapsed = false;
        $(c).attr("_collapsed", false);
        a(c, c);
        this.redrawShape(c);
        $(this._PAPER.canvas).trigger("expanded", [c])
    }
};
OG.renderer.RaphaelRenderer.prototype.clear = function () {
    this._PAPER.clear();
    this._ELE_MAP.clear();
    this._ID_PREFIX = Math.round(Math.random() * 10000);
    this._LAST_ID = 0;
    this._ROOT_GROUP = this._add(this._PAPER.group(), null, OG.Constants.NODE_TYPE.ROOT);
    this._ETC_GROUP = this._add(this._PAPER.group(), null, OG.Constants.NODE_TYPE.ETC)
};
OG.renderer.RaphaelRenderer.prototype.removeShape = function (d) {
    var a = this._getREleById(OG.Util.isElement(d) ? d.id : d), f, c, b, e;
    f = a.node.childNodes;
    c = jQuery.Event("beforeRemoveShape", {element: a.node});
    $(this._PAPER.canvas).trigger(c);
    if (c.isPropagationStopped()) {
        return false
    }
    for (b = f.length - 1; b >= 0; b--) {
        if ($(f[b]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
            this.removeShape(f[b])
        }
    }
    this.disconnect(a.node);
    this.removeTerminal(a.node);
    this.removeGuide(a.node);
    this.removeCollapseGuide(a.node);
    e = OG.Util.clone(a.node);
    this.remove(a.node);
    $(this._PAPER.canvas).trigger("removeShape", [e])
};
OG.renderer.RaphaelRenderer.prototype.remove = function (b) {
    var c = OG.Util.isElement(b) ? b.id : b, a = this._getREleById(c);
    this._remove(a)
};
OG.renderer.RaphaelRenderer.prototype.removeChild = function (b) {
    var c = OG.Util.isElement(b) ? b.id : b, a = this._getREleById(c);
    this._removeChild(a)
};
OG.renderer.RaphaelRenderer.prototype.getRootElement = function () {
    return this._PAPER.canvas
};
OG.renderer.RaphaelRenderer.prototype.getElementByPoint = function (a) {
    var b = this._PAPER.getElementByPoint(a[0], a[1]);
    return b ? b.node.parentNode : null
};
OG.renderer.RaphaelRenderer.prototype.setAttr = function (b, c) {
    var a = this._getREleById(OG.Util.isElement(b) ? b.id : b);
    if (a) {
        a.attr(c)
    }
};
OG.renderer.RaphaelRenderer.prototype.getAttr = function (c, b) {
    var a = this._getREleById(OG.Util.isElement(c) ? c.id : c);
    if (a) {
        return a.attr(b)
    }
    return null
};
OG.renderer.RaphaelRenderer.prototype.setShapeStyle = function (b, c) {
    var a = this._getREleById(OG.Util.isElement(b) ? b.id : b);
    if (a && b.shape && b.shape.geom) {
        OG.Util.apply(b.shape.geom.style.map, c || {});
        b.shapeStyle = b.shapeStyle || {};
        OG.Util.apply(b.shapeStyle, c || {});
        this.redrawShape(b)
    }
};
OG.renderer.RaphaelRenderer.prototype.toFront = function (b) {
    var a = this._getREleById(OG.Util.isElement(b) ? b.id : b);
    if (a) {
        a.toFront()
    }
};
OG.renderer.RaphaelRenderer.prototype.toBack = function (b) {
    var a = this._getREleById(OG.Util.isElement(b) ? b.id : b);
    if (a) {
        a.toBack()
    }
};
OG.renderer.RaphaelRenderer.prototype.getCanvasSize = function () {
    return[this._PAPER.width, this._PAPER.height]
};
OG.renderer.RaphaelRenderer.prototype.setCanvasSize = function (a) {
    this._PAPER.setSize(a[0], a[1])
};
OG.renderer.RaphaelRenderer.prototype.fitCanvasSize = function (a, c) {
    var g = this, h = this.getRealRootBBox(), f, e, d = 1, b = h.width + g._CONFIG.FIT_CANVAS_PADDING * 2, i = h.height + g._CONFIG.FIT_CANVAS_PADDING * 2;
    if (h.width !== 0 && h.height !== 0) {
        f = h.x > g._CONFIG.FIT_CANVAS_PADDING ? -1 * (h.x - g._CONFIG.FIT_CANVAS_PADDING) : g._CONFIG.FIT_CANVAS_PADDING - h.x;
        e = h.y > g._CONFIG.FIT_CANVAS_PADDING ? -1 * (h.y - g._CONFIG.FIT_CANVAS_PADDING) : g._CONFIG.FIT_CANVAS_PADDING - h.y;
        this.move(this.getRootGroup(), [f, e]);
        this.removeAllGuide();
        if (a && a.length === 2) {
            if (OG.Util.isDefined(c) && c === true) {
                d = a[0] / b > a[1] / i ? a[1] / i : a[0] / b
            }
            b = b < a[0] ? a[0] : b;
            i = i < a[1] ? a[1] : i
        }
        this.setScale(OG.Util.roundPrecision(d, 1));
        this.setCanvasSize([b, i])
    }
};
OG.renderer.RaphaelRenderer.prototype.setViewBox = function (a, b, c) {
    this._PAPER.setViewBox(a[0], a[1], b[0], b[1], c)
};
OG.renderer.RaphaelRenderer.prototype.getScale = function (b) {
    var a = this;
    return a._CONFIG.SCALE
};
OG.renderer.RaphaelRenderer.prototype.setScale = function (b) {
    var a = this;
    if (a._CONFIG.SCALE_MIN <= b && b <= a._CONFIG.SCALE_MAX) {
        if (this.isVML()) {
            $(this._ROOT_GROUP.node).css({width: 21600 / b, height: 21600 / b});
            $(this._ROOT_GROUP.node).find("[_type=SHAPE]").each(function (c, d) {
                $(d).css({width: 21600, height: 21600})
            })
        } else {
            $(this._ROOT_GROUP.node).attr("transform", "scale(" + b + ")");
            $(this._ETC_GROUP.node).attr("transform", "scale(" + b + ")")
        }
        this._PAPER.setSize(OG.Util.roundGrid(this._PAPER.width / a._CONFIG.SCALE * b, a._CONFIG.MOVE_SNAP_SIZE), OG.Util.roundGrid(this._PAPER.height / a._CONFIG.SCALE * b, a._CONFIG.MOVE_SNAP_SIZE));
        a._CONFIG.SCALE = b
    }
};
OG.renderer.RaphaelRenderer.prototype.show = function (b) {
    var a = this._getREleById(OG.Util.isElement(b) ? b.id : b);
    if (a) {
        a.show()
    }
};
OG.renderer.RaphaelRenderer.prototype.hide = function (b) {
    var a = this._getREleById(OG.Util.isElement(b) ? b.id : b);
    if (a) {
        a.hide()
    }
};
OG.renderer.RaphaelRenderer.prototype.appendChild = function (a, b) {
    var c = this._getREleById(OG.Util.isElement(a) ? a.id : a), d = this._getREleById(OG.Util.isElement(b) ? b.id : b);
    d.appendChild(c);
    return c
};
OG.renderer.RaphaelRenderer.prototype.insertAfter = function (a, b) {
    var c = this._getREleById(OG.Util.isElement(a) ? a.id : a), d = this._getREleById(OG.Util.isElement(b) ? b.id : b);
    c.insertAfter(d);
    return c
};
OG.renderer.RaphaelRenderer.prototype.insertBefore = function (a, b) {
    var c = this._getREleById(OG.Util.isElement(a) ? a.id : a), d = this._getREleById(OG.Util.isElement(b) ? b.id : b);
    c.insertBefore(d);
    return c
};
OG.renderer.RaphaelRenderer.prototype.move = function (b, g, e) {
    var d = this, a = this._getREleById(OG.Util.isElement(b) ? b.id : b), c = a ? a.node.getAttribute("_type") : null, f;
    this.removeCollapseGuide(b);
    if (a && c) {
        $(a.node).children("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=EDGE]").each(function (h, i) {
            d.move(i, g, e)
        });
        $(a.node).children("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape!=EDGE]").each(function (h, i) {
            d.move(i, g, e)
        });
        if (c !== OG.Constants.NODE_TYPE.ROOT && a.node.shape) {
            f = a.node.shape.geom;
            f.move(g[0], g[1]);
            this.redrawShape(a.node, e);
            $(this._PAPER.canvas).trigger("moveShape", [a.node, g]);
            return a.node
        } else {
            return b
        }
    } else {
        if (a) {
            a.transform("...t" + g[0] + "," + g[1]);
            $(this._PAPER.canvas).trigger("moveShape", [a.node, g]);
            return a.node
        }
    }
    return null
};
OG.renderer.RaphaelRenderer.prototype.moveCentroid = function (d, b, f) {
    var c = this._getREleById(OG.Util.isElement(d) ? d.id : d), g = c ? c.node.shape.geom : null, e, a = {};
    if (c && g) {
        a = g.getCentroid();
        return this.move(d, [b[0] - a.x, b[1] - a.y], f)
    } else {
        if (c) {
            e = c.getBBox();
            a.x = e.x + OG.Util.round(e.width / 2);
            a.y = e.y + OG.Util.round(e.height / 2);
            return this.move(d, [b[0] - a.x, b[1] - a.y])
        }
    }
    this.removeCollapseGuide(d);
    return null
};
OG.renderer.RaphaelRenderer.prototype.rotate = function (d, c, j) {
    var e = this._getREleById(OG.Util.isElement(d) ? d.id : d), h = e ? e.node.getAttribute("_shape") : null, i = e ? e.node.shape.geom : null, f, g, a, b, k;
    if (e && h && i) {
        if (h === OG.Constants.SHAPE_TYPE.IMAGE || h === OG.Constants.SHAPE_TYPE.TEXT || h === OG.Constants.SHAPE_TYPE.HTML) {
            f = e.node.shape.clone();
            g = i.getBoundary();
            a = g.getCentroid();
            b = g.getWidth();
            k = g.getHeight();
            this.drawShape([a.x, a.y], f, [b, k, c], e.node.shapeStyle, e.node.id)
        } else {
            if (e.node.shape.angle) {
                i.rotate(-1 * e.node.shape.angle)
            }
            i.rotate(c);
            e.node.shape.angle = c;
            this.redrawShape(e.node, j)
        }
        $(this._PAPER.canvas).trigger("rotateShape", [e.node, c]);
        return e.node
    } else {
        if (e) {
            e.rotate(c);
            $(this._PAPER.canvas).trigger("rotateShape", [e.node, c]);
            return e.node
        }
    }
    return null
};
OG.renderer.RaphaelRenderer.prototype.resize = function (d, b, j) {
    var f = this._getREleById(OG.Util.isElement(d) ? d.id : d), h = f ? f.node.getAttribute("_shape") : null, i = f ? f.node.shape.geom : null, m, e, c, a, l, k, g;
    this.removeCollapseGuide(d);
    if (f && h && i) {
        i.resize(b[0], b[1], b[2], b[3]);
        this.redrawShape(f.node, j);
        $(this._PAPER.canvas).trigger("resizeShape", [f.node, b]);
        return f.node
    } else {
        if (f) {
            m = f.getBBox();
            e = b[2] + b[3];
            c = b[0] + b[1];
            a = m.width + e;
            l = m.height + c;
            k = m.width === 0 ? 1 : a / m.width;
            g = m.height === 0 ? 1 : l / m.height;
            f.transform("...t" + (-1 * b[2]) + "," + (-1 * b[0]));
            f.transform("...s" + k + "," + g + "," + m.x + "," + m.y);
            $(this._PAPER.canvas).trigger("resizeShape", [f.node, b]);
            return f.node
        }
    }
    return null
};
OG.renderer.RaphaelRenderer.prototype.resizeBox = function (d, c) {
    var b = this._getREleById(OG.Util.isElement(d) ? d.id : d), g = b ? b.node.shape.geom : null, h, f, e, a;
    this.removeCollapseGuide(d);
    if (b && g) {
        h = g.getBoundary();
        e = OG.Util.round((c[0] - h.getWidth()) / 2);
        a = OG.Util.round((c[1] - h.getHeight()) / 2);
        return this.resize(d, [a, a, e, e])
    } else {
        if (b) {
            f = b.getBBox();
            e = OG.Util.round((c[0] - f.width) / 2);
            a = OG.Util.round((c[1] - f.height) / 2);
            return this.resize(d, [a, a, e, e])
        }
    }
    return null
};
OG.renderer.RaphaelRenderer.prototype.clone = function (b) {
    var a = this._getREleById(OG.Util.isElement(b) ? b.id : b), c;
    c = a.clone();
    this._add(c);
    this._ROOT_GROUP.node.appendChild(c.node);
    return c.node
};
OG.renderer.RaphaelRenderer.prototype.getElementById = function (b) {
    var a = this._getREleById(b);
    return a ? a.node : null
};
OG.renderer.RaphaelRenderer.prototype.getBBox = function (b) {
    var a = this._getREleById(OG.Util.isElement(b) ? b.id : b);
    return a.getBBox()
};
OG.renderer.RaphaelRenderer.prototype.getRootBBox = function () {
    var c = this._PAPER.canvas.parentNode, d = OG.Util.isFirefox() ? this._PAPER.canvas.width.baseVal.value : this._PAPER.canvas.scrollWidth, b = OG.Util.isFirefox() ? this._PAPER.canvas.height.baseVal.value : this._PAPER.canvas.scrollHeight, a = c.offsetLeft, e = c.offsetTop;
    return{width: d, height: b, x: a, y: e, x2: a + d, y2: e + b}
};
OG.renderer.RaphaelRenderer.prototype.getContainer = function () {
    return this._PAPER.canvas.parentNode
};
OG.renderer.RaphaelRenderer.prototype.isSVG = function () {
    return Raphael.svg
};
OG.renderer.RaphaelRenderer.prototype.isVML = function () {
    return Raphael.vml
};
OG.handler.EventHandler = function (b, a) {
    this._RENDERER = b;
    this._CONFIG = a
};
OG.handler.EventHandler.prototype = {enableEditLabel: function (a) {
    var b = this;
    $(a).bind({dblclick: function (f) {
        var g = b._RENDERER.getContainer(), m = a.shape.geom.getBoundary(), e = m.getUpperLeft(), q, k = (e.x - 1) * b._CONFIG.SCALE, o = (e.y - 1) * b._CONFIG.SCALE, i = m.getWidth() * b._CONFIG.SCALE, p = m.getHeight() * b._CONFIG.SCALE, j = a.id + OG.Constants.LABEL_EDITOR_SUFFIX, d, h = "center", r, l, n = function (w) {
            var u, z, y, s, x = 0, v, t;
            if (w.shape.geom.style.get("edge-type") === OG.Constants.EDGE_TYPE.BEZIER) {
                u = w.shape.geom.getControlPoints();
                z = u[0];
                y = u[u.length - 1];
                return new OG.geometry.Coordinate(OG.Util.round((z.x + y.x) / 2), OG.Util.round((z.y + y.y) / 2))
            } else {
                u = w.shape.geom.getVertices();
                s = w.shape.geom.getLength();
                for (v = 0; v < u.length - 1; v++) {
                    x += u[v].distance(u[v + 1]);
                    if (x > s / 2) {
                        t = w.shape.geom.intersectCircleToLine(u[v + 1], x - s / 2, u[v + 1], u[v]);
                        break
                    }
                }
                return t[0]
            }
        }, c;
        if (a.shape.isCollapsed === false) {
            $(g).append("<textarea id='" + a.id + OG.Constants.LABEL_EDITOR_SUFFIX + "'></textarea>");
            d = $("#" + j);
            switch (a.shape.geom.style.get("text-anchor")) {
                case"start":
                    h = "left";
                    break;
                case"middle":
                    h = "center";
                    break;
                case"end":
                    h = "right";
                    break;
                default:
                    h = "center";
                    break
            }
            if ($(a).attr("_shape") === OG.Constants.SHAPE_TYPE.HTML) {
                $(d).css(OG.Util.apply(b._CONFIG.DEFAULT_STYLE.LABEL_EDITOR, {left: k, top: o, width: i, height: p, "text-align": "left", overflow: "hidden", resize: "none"}));
                $(d).focus();
                $(d).val(a.shape.html);
                $(d).bind({focusout: function () {
                    a.shape.html = this.value;
                    if (a.shape.html) {
                        b._RENDERER.redrawShape(a);
                        this.parentNode.removeChild(this)
                    } else {
                        b._RENDERER.removeShape(a);
                        this.parentNode.removeChild(this)
                    }
                }})
            } else {
                if ($(a).attr("_shape") === OG.Constants.SHAPE_TYPE.TEXT) {
                    $(d).css(OG.Util.apply(b._CONFIG.DEFAULT_STYLE.LABEL_EDITOR, {left: k, top: o, width: i, height: p, "text-align": h, overflow: "hidden", resize: "none"}));
                    $(d).focus();
                    $(d).val(a.shape.text);
                    $(d).bind({focusout: function () {
                        a.shape.text = this.value;
                        if (a.shape.text) {
                            b._RENDERER.redrawShape(a);
                            this.parentNode.removeChild(this)
                        } else {
                            b._RENDERER.removeShape(a);
                            this.parentNode.removeChild(this)
                        }
                    }})
                } else {
                    if ($(a).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
                        if (a.shape.label && b._RENDERER.isSVG()) {
                            $(a).children("[id$=_LABEL]").each(function (s, t) {
                                $(t).find("text").each(function (v, u) {
                                    q = b._RENDERER.getBBox(u);
                                    k = q.x - 10;
                                    o = q.y;
                                    i = q.width + 20;
                                    p = q.height
                                })
                            })
                        } else {
                            c = n(a);
                            k = c.x - b._CONFIG.LABEL_EDITOR_WIDTH / 2;
                            o = c.y - b._CONFIG.LABEL_EDITOR_HEIGHT / 2;
                            i = b._CONFIG.LABEL_EDITOR_WIDTH;
                            p = b._CONFIG.LABEL_EDITOR_HEIGHT
                        }
                        $(f.srcElement).parents("[id$=_FROMLABEL]").each(function (s, t) {
                            $(t).find("text").each(function (v, u) {
                                q = b._RENDERER.getBBox(u);
                                k = q.x - 10;
                                o = q.y;
                                i = q.width + 20;
                                p = q.height;
                                r = a.shape.fromLabel
                            })
                        });
                        $(f.srcElement).parents("[id$=_TOLABEL]").each(function (s, t) {
                            $(t).find("text").each(function (v, u) {
                                q = b._RENDERER.getBBox(u);
                                k = q.x - 10;
                                o = q.y;
                                i = q.width + 20;
                                p = q.height;
                                l = a.shape.toLabel
                            })
                        });
                        $(d).css(OG.Util.apply(b._CONFIG.DEFAULT_STYLE.LABEL_EDITOR, {left: k * b._CONFIG.SCALE, top: o * b._CONFIG.SCALE, width: i * b._CONFIG.SCALE, height: p * b._CONFIG.SCALE, overflow: "hidden", resize: "none"}));
                        $(d).focus();
                        if (r || l) {
                            $(d).val(r ? a.shape.fromLabel : a.shape.toLabel)
                        } else {
                            $(d).val(a.shape.label)
                        }
                        $(d).bind({focusout: function () {
                            if (r) {
                                b._RENDERER.drawEdgeLabel(a, this.value, "FROM")
                            } else {
                                if (l) {
                                    b._RENDERER.drawEdgeLabel(a, this.value, "TO")
                                } else {
                                    b._RENDERER.drawLabel(a, this.value)
                                }
                            }
                            this.parentNode.removeChild(this)
                        }})
                    } else {
                        $(d).css(OG.Util.apply(b._CONFIG.DEFAULT_STYLE.LABEL_EDITOR, {left: k, top: o, width: i, height: p, "text-align": h, overflow: "hidden", resize: "none"}));
                        $(d).focus();
                        $(d).val(a.shape.label);
                        $(d).bind({focusout: function () {
                            b._RENDERER.drawLabel(a, this.value);
                            this.parentNode.removeChild(this)
                        }})
                    }
                }
            }
        }
    }})
}, enableConnect: function (b) {
    var c = this, d, a = c._RENDERER.getRootGroup();
    $(b).bind({mouseover: function () {
        if (b.shape.isCollapsed === false) {
            d = c._RENDERER.drawTerminal(b, $(a).data("dragged_guide") === "to" ? OG.Constants.TERMINAL_TYPE.IN : OG.Constants.TERMINAL_TYPE.OUT);
            if (d && d.terminal && d.terminal.childNodes.length > 0) {
                if ($(a).data("edge")) {
                    $.each(d.terminal.childNodes, function (e, h) {
                        var i = $(a).data("from_terminal"), g = i && OG.Util.isElement(i) ? c._getShapeFromTerminal(i) : null, f = b && g && b.id === g.id;
                        if (h.terminal && h.terminal.direction.toLowerCase() === "c" && (($(a).data("dragged_guide") === "to" && h.terminal.inout.indexOf(OG.Constants.TERMINAL_TYPE.IN) >= 0) || ($(a).data("dragged_guide") === "from" && h.terminal.inout.indexOf(OG.Constants.TERMINAL_TYPE.OUT) >= 0)) && (!f || c._isSelfConnectable(b.shape))) {
                            c._RENDERER.drawDropOverGuide(b);
                            $(a).data("edge_terminal", h);
                            return false
                        }
                    })
                }
                $(d.bBox).bind({mouseout: function () {
                    if (!$(a).data("edge")) {
                        c._RENDERER.removeTerminal(b)
                    }
                }});
                $.each(d.terminal.childNodes, function (e, f) {
                    if (f.terminal) {
                        $(f).bind({mouseover: function (i) {
                            var j = $(a).data("from_terminal"), h = j && OG.Util.isElement(j) ? c._getShapeFromTerminal(j) : null, g = b && h && b.id === h.id;
                            if ((($(a).data("dragged_guide") === "to" && f.terminal.inout.indexOf(OG.Constants.TERMINAL_TYPE.IN) >= 0) || ($(a).data("dragged_guide") === "from" && f.terminal.inout.indexOf(OG.Constants.TERMINAL_TYPE.OUT) >= 0) || (!$(a).data("dragged_guide") && f.terminal.inout.indexOf(OG.Constants.TERMINAL_TYPE.OUT) >= 0)) && (!g || c._isSelfConnectable(b.shape))) {
                                c._RENDERER.setAttr(f, c._CONFIG.DEFAULT_STYLE.TERMINAL_OVER);
                                $(a).data("edge_terminal", f)
                            }
                        }, mouseout: function () {
                            c._RENDERER.setAttr(f, c._CONFIG.DEFAULT_STYLE.TERMINAL);
                            $(a).removeData("edge_terminal")
                        }});
                        $(f).draggable({start: function (i) {
                            var g = f.terminal.position.x, j = f.terminal.position.y, h = c._RENDERER.drawShape(null, new OG.EdgeShape([g, j], [g, j]), null, c._CONFIG.DEFAULT_STYLE.EDGE_SHADOW);
                            $(a).data("edge", h);
                            $(a).data("from_terminal", f);
                            $(a).data("dragged_guide", "to");
                            c._RENDERER.removeRubberBand(c._RENDERER.getRootElement());
                            $(c._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (l, k) {
                                if (k.id) {
                                    c._RENDERER.removeGuide(k)
                                }
                            })
                        }, drag: function (g) {
                            var k = c._getOffset(g), i = $(a).data("edge"), p = $(a).data("from_terminal"), t = $(a).data("edge_terminal"), q = [p.terminal.position.x, p.terminal.position.y], m = t ? [t.terminal.position.x, t.terminal.position.y] : [k.x, k.y], r = p.terminal.direction.toLowerCase(), n = t ? t.terminal.direction.toLowerCase() : "c", l = t ? c._getShapeFromTerminal(t) : null, h, s, j, o;
                            $(this).css({position: "", left: "", top: ""});
                            h = q;
                            s = m;
                            if (!b.shape.geom.getBoundary().isContains(m) && r === "c") {
                                j = c._RENDERER.intersectionEdge(i.shape.geom.style.get("edge-type"), b, [h[0], h[1]], [s[0], s[1]], true);
                                q = j.position;
                                r = j.direction
                            }
                            if (l && n === "c") {
                                j = c._RENDERER.intersectionEdge(i.shape.geom.style.get("edge-type"), l, [h[0], h[1]], [s[0], s[1]], false);
                                m = j.position;
                                n = j.direction
                            }
                            o = b && l && b.id === l.id;
                            if (o) {
                                q = m = b.shape.geom.getBoundary().getRightCenter()
                            }
                            if (!o || c._isSelfConnectable(b.shape)) {
                                c._RENDERER.drawEdge(new OG.Line(q, m), OG.Util.apply(i.shape.geom.style.map, {"edge-direction": r + " " + n}), i.id, o)
                            }
                        }, stop: function (g) {
                            var s = c._getOffset(g), k = $(a).data("edge"), q = $(a).data("from_terminal"), t = $(a).data("edge_terminal") || [s.x, s.y], l = OG.Util.isElement(t) ? c._getShapeFromTerminal(t) : null, j, m, r, o, h, n, p;
                            $(this).css({position: "absolute", left: "0px", top: "0px"});
                            if (!$(a).data("edge_terminal") && c._isConnectCloneable(b.shape)) {
                                j = b.shape.geom.getBoundary();
                                m = c._RENDERER.drawShape([s.x, s.y], b.shape.clone(), [j.getWidth(), j.getHeight()], b.shapeStyle);
                                c.setClickSelectable(m, c._isSelectable(m.shape));
                                c.setMovable(m, c._isMovable(m.shape));
                                if (c._CONFIG.GROUP_DROPABLE && m.shape.GROUP_DROPABLE) {
                                    c.enableDragAndDropGroup(m)
                                }
                                if (c._CONFIG.GROUP_COLLAPSIBLE && m.shape.GROUP_COLLAPSIBLE) {
                                    c.enableCollapse(m)
                                }
                                if (c._isConnectable(m.shape)) {
                                    c.enableConnect(m)
                                }
                                if (c._isLabelEditable(m.shape)) {
                                    c.enableEditLabel(m)
                                }
                                r = c._RENDERER.drawTerminal(m, OG.Constants.TERMINAL_TYPE.IN);
                                o = r.terminal.childNodes;
                                t = o[0];
                                for (n = 0; n < o.length; n++) {
                                    if (o[n].terminal && o[n].terminal.direction.toLowerCase() === "c") {
                                        t = o[n];
                                        break
                                    }
                                }
                            }
                            p = b && l && b.id === l.id;
                            if (t && (OG.Util.isElement(t) || !c._isConnectRequired(b.shape)) && (!p || c._isSelfConnectable(b.shape))) {
                                k = c._RENDERER.connect(q, t, k);
                                if (k) {
                                    h = c._RENDERER.drawGuide(k);
                                    if (k && h) {
                                        c.setClickSelectable(k, c._isSelectable(k.shape));
                                        c.setMovable(k, c._isMovable(k.shape));
                                        c.setResizable(k, h, c._isResizable(k.shape));
                                        if (c._isLabelEditable(k.shape)) {
                                            c.enableEditLabel(k)
                                        }
                                        c._RENDERER.toFront(h.group)
                                    }
                                }
                            } else {
                                c._RENDERER.removeShape(k)
                            }
                            $(a).removeData("edge");
                            $(a).removeData("from_terminal");
                            $(a).removeData("edge_terminal");
                            $(a).removeData("dragged_guide");
                            if (l) {
                                c._RENDERER.remove(l.id + OG.Constants.DROP_OVER_BBOX_SUFFIX)
                            }
                        }})
                    }
                })
            } else {
                c._RENDERER.removeTerminal(b)
            }
        }
    }, mouseout: function (e) {
        if ($(b).attr("_shape") !== OG.Constants.SHAPE_TYPE.EDGE && $(a).data("edge")) {
            c._RENDERER.remove(b.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
            $(a).removeData("edge_terminal")
        }
    }})
}, enableDragAndDropGroup: function (c) {
    var d = this, a = d._RENDERER.getRootGroup(), b;
    if (c && $(c).attr("_shape") === OG.Constants.SHAPE_TYPE.GROUP) {
        $(c).bind({mouseover: function () {
            if (c.shape.isCollapsed === false) {
                if ($(a).data("bBoxArray")) {
                    b = false;
                    $.each($(a).data("bBoxArray"), function (e, f) {
                        if (c.id === f.id) {
                            b = true
                        }
                    });
                    if (!b) {
                        $(a).data("groupTarget", c);
                        d._RENDERER.drawDropOverGuide(c)
                    }
                }
            }
        }, mouseout: function (e) {
            d._RENDERER.remove(c.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
            $(a).removeData("groupTarget")
        }})
    }
}, enableCollapse: function (c) {
    var d = this, b, a;
    a = function (e, f) {
        if (f && f.bBox && f.collapse) {
            $(f.collapse).bind("click", function (g) {
                if (e.shape.isCollapsed === true) {
                    d._RENDERER.expand(e);
                    f = d._RENDERER.drawCollapseGuide(e);
                    a(e, f)
                } else {
                    d._RENDERER.collapse(e);
                    f = d._RENDERER.drawCollapseGuide(e);
                    a(e, f)
                }
            });
            $(f.bBox).bind("mouseout", function (g) {
                d._RENDERER.remove(e.id + OG.Constants.COLLAPSE_BBOX);
                d._RENDERER.remove(e.id + OG.Constants.COLLAPSE_SUFFIX)
            })
        }
    };
    if (c && $(c).attr("_shape") === OG.Constants.SHAPE_TYPE.GROUP) {
        $(c).bind({mouseover: function () {
            b = d._RENDERER.drawCollapseGuide(this);
            if (b && b.bBox && b.collapse) {
                a(c, b)
            }
        }})
    }
}, setMovable: function (c, b) {
    var d = this, a = d._RENDERER.getRootGroup();
    if (!c) {
        return
    }
    if (b === true) {
        $(c).draggable({start: function (f) {
            var g = d._getOffset(f), e;
            if (d._RENDERER.getElementById(c.id + OG.Constants.GUIDE_SUFFIX.GUIDE) === null) {
                $(d._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (h, i) {
                    if (OG.Util.isElement(i) && i.id) {
                        d._RENDERER.removeGuide(i)
                    }
                });
                d._RENDERER.removeAllTerminal()
            }
            d._RENDERER.removeGuide(c);
            e = d._RENDERER.drawGuide(c);
            $(this).data("start", {x: g.x, y: g.y});
            $(this).data("offset", {x: g.x - d._num(d._RENDERER.getAttr(e.bBox, "x")), y: g.y - d._num(d._RENDERER.getAttr(e.bBox, "y"))});
            $(a).data("bBoxArray", d._getMoveTargets());
            d._RENDERER.removeRubberBand(d._RENDERER.getRootElement());
            d._RENDERER.removeAllTerminal()
        }, drag: function (g) {
            var h = d._getOffset(g), j = $(this).data("start"), i = $(a).data("bBoxArray"), f = d._grid(h.x - j.x), e = d._grid(h.y - j.y);
            d._autoExtend(h.x, h.y);
            $(this).css({position: "", left: "", top: ""});
            $.each(i, function (l, m) {
                d._RENDERER.setAttr(m.box, {transform: "t" + f + "," + e})
            });
            d._RENDERER.removeAllTerminal()
        }, stop: function (e) {
            var h = d._getOffset(e), f = $(this).data("start"), k = $(a).data("bBoxArray"), m = d._grid(h.x - f.x), l = d._grid(h.y - f.y), i = $(a).data("groupTarget"), j, g;
            $(this).css({position: "", left: "", top: ""});
            j = d._moveElements(k, m, l);
            if (i && OG.Util.isElement(i)) {
                d._RENDERER.addToGroup(i, j);
                $.each(j, function (n, o) {
                    d._RENDERER.removeGuide(o)
                });
                g = d._RENDERER.drawGuide(i);
                d.setResizable(i, g, d._isResizable(i.shape));
                d._RENDERER.toFront(g.group);
                d._RENDERER.remove(i.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
                $(a).removeData("groupTarget")
            } else {
                d._RENDERER.addToGroup(a, j);
                $.each(j, function (n, o) {
                    d._RENDERER.removeGuide(o);
                    g = d._RENDERER.drawGuide(o);
                    d.setResizable(o, g, d._isResizable(o.shape));
                    d._RENDERER.toFront(g.group)
                })
            }
            $(a).removeData("bBoxArray")
        }});
        d._RENDERER.setAttr(c, {cursor: "move"});
        OG.Util.apply(c.shape.geom.style.map, {cursor: "move"})
    } else {
        $(c).draggable("destroy");
        d._RENDERER.setAttr(c, {cursor: d._isSelectable(c.shape) ? "pointer" : d._CONFIG.DEFAULT_STYLE.SHAPE.cursor});
        OG.Util.apply(c.shape.geom.style.map, {cursor: d._isSelectable(c.shape) ? "pointer" : d._CONFIG.DEFAULT_STYLE.SHAPE.cursor})
    }
}, setResizable: function (c, a, e) {
    var d = this, b = d._RENDERER.getRootGroup();
    if (!c || !a) {
        return
    }
    if (e === true) {
        if ($(c).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
            $(a.from).draggable({start: function (l) {
                var k, i, f = {}, g = $(c).attr("_to"), m, h, j;
                f = OG.Util.apply(f, d._CONFIG.DEFAULT_STYLE.EDGE_SHADOW, c.shape.geom.style.map);
                k = f["edge-type"].toLowerCase() === OG.Constants.EDGE_TYPE.BEZIER;
                i = k ? c.shape.geom.getControlPoints() : c.shape.geom.getVertices();
                j = d._RENDERER.drawEdge(k ? new OG.BezierCurve(i) : new OG.PolyLine(i), f);
                h = [i[i.length - 1].x, i[i.length - 1].y];
                if (g) {
                    m = d._getShapeFromTerminal(g);
                    d._RENDERER.drawTerminal(m);
                    h = d._RENDERER.getElementById(g)
                }
                $(b).data("to_terminal", h);
                $(b).data("edge", j);
                $(b).data("dragged_guide", "from");
                d._RENDERER.removeRubberBand(d._RENDERER.getRootElement());
                $(d._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (p, o) {
                    if (o.id && $(o).attr("_shape") !== OG.Constants.SHAPE_TYPE.EDGE) {
                        d._RENDERER.removeGuide(o)
                    }
                })
            }, drag: function (f) {
                var j = d._getOffset(f), h = $(b).data("edge"), o = $(b).data("edge_terminal"), t = $(b).data("to_terminal"), p = o ? [o.terminal.position.x, o.terminal.position.y] : [j.x, j.y], l = OG.Util.isElement(t) ? [t.terminal.position.x, t.terminal.position.y] : t, q = o ? o.terminal.direction.toLowerCase() : "c", m = OG.Util.isElement(t) ? t.terminal.direction.toLowerCase() : "c", r = o ? d._getShapeFromTerminal(o) : null, k = OG.Util.isElement(t) ? d._getShapeFromTerminal(t) : null, g, s, i, n;
                $(this).css({position: "", left: "", top: ""});
                g = p;
                s = l;
                if (r && q === "c") {
                    i = d._RENDERER.intersectionEdge(h.geom.style.get("edge-type"), r, [g[0], g[1]], [s[0], s[1]], true);
                    p = i.position;
                    q = i.direction
                }
                if (k && m === "c") {
                    i = d._RENDERER.intersectionEdge(h.geom.style.get("edge-type"), k, [g[0], g[1]], [s[0], s[1]], false);
                    l = i.position;
                    m = i.direction
                }
                n = r && k && r.id === k.id;
                if (n) {
                    p = l = r.shape.geom.getBoundary().getRightCenter()
                }
                if (!n || d._isSelfConnectable(r.shape)) {
                    d._RENDERER.drawEdge(new OG.Line(p, l), OG.Util.apply(h.geom.style.map, {"edge-direction": q + " " + m}), h.id, n)
                }
            }, stop: function (j) {
                var m = d._getOffset(j), l = $(b).data("edge_terminal") || [m.x, m.y], f = $(b).data("to_terminal"), h = OG.Util.isElement(l) ? d._getShapeFromTerminal(l) : null, k = OG.Util.isElement(f) ? d._getShapeFromTerminal(f) : null, i = $(b).data("edge"), g;
                $(this).css({position: "absolute", left: "0px", top: "0px"});
                $(b).removeData("to_terminal");
                $(b).removeData("edge");
                $(b).removeData("edge_terminal");
                $(b).removeData("dragged_guide");
                d._RENDERER.remove(i);
                d._RENDERER.removeGuide(c);
                if (h) {
                    d._RENDERER.remove(h.id + OG.Constants.DROP_OVER_BBOX_SUFFIX)
                }
                g = h && k && h.id === k.id;
                if (!g || d._isSelfConnectable(h.shape)) {
                    c = d._RENDERER.connect(l, f, c, c.shape.geom.style);
                    if (c) {
                        a = d._RENDERER.drawGuide(c);
                        if (c && a) {
                            d.setResizable(c, a, true);
                            d._RENDERER.toFront(a.group)
                        }
                    }
                }
            }});
            $(a.to).draggable({start: function (l) {
                var k, h, g = {}, f = $(c).attr("_from"), i, m, j;
                g = OG.Util.apply(g, d._CONFIG.DEFAULT_STYLE.EDGE_SHADOW, c.shape.geom.style.map);
                k = g["edge-type"].toLowerCase() === OG.Constants.EDGE_TYPE.BEZIER;
                h = k ? c.shape.geom.getControlPoints() : c.shape.geom.getVertices();
                j = d._RENDERER.drawEdge(k ? new OG.BezierCurve(h) : new OG.PolyLine(h), g);
                m = [h[0].x, h[0].y];
                if (f) {
                    i = d._getShapeFromTerminal(f);
                    d._RENDERER.drawTerminal(i);
                    m = d._RENDERER.getElementById(f)
                }
                $(b).data("from_terminal", m);
                $(b).data("edge", j);
                $(b).data("dragged_guide", "to");
                d._RENDERER.removeRubberBand(d._RENDERER.getRootElement());
                $(d._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (p, o) {
                    if (o.id && $(o).attr("_shape") !== OG.Constants.SHAPE_TYPE.EDGE) {
                        d._RENDERER.removeGuide(o)
                    }
                })
            }, drag: function (f) {
                var j = d._getOffset(f), h = $(b).data("edge"), o = $(b).data("from_terminal"), t = $(b).data("edge_terminal"), p = OG.Util.isElement(o) ? [o.terminal.position.x, o.terminal.position.y] : o, l = t ? [t.terminal.position.x, t.terminal.position.y] : [j.x, j.y], q = OG.Util.isElement(o) ? o.terminal.direction.toLowerCase() : "c", m = t ? t.terminal.direction.toLowerCase() : "c", r = OG.Util.isElement(o) ? d._getShapeFromTerminal(o) : null, k = t ? d._getShapeFromTerminal(t) : null, g, s, i, n;
                $(this).css({position: "", left: "", top: ""});
                g = p;
                s = l;
                if (r && q === "c") {
                    i = d._RENDERER.intersectionEdge(h.geom.style.get("edge-type"), r, [g[0], g[1]], [s[0], s[1]], true);
                    p = i.position;
                    q = i.direction
                }
                if (k && m === "c") {
                    i = d._RENDERER.intersectionEdge(h.geom.style.get("edge-type"), k, [g[0], g[1]], [s[0], s[1]], false);
                    l = i.position;
                    m = i.direction
                }
                n = (r !== null) && (k !== null) && r.id === k.id;
                if (n) {
                    p = l = k.shape.geom.getBoundary().getRightCenter()
                }
                if (!n || d._isSelfConnectable(k.shape)) {
                    d._RENDERER.drawEdge(new OG.Line(p, l), OG.Util.apply(h.geom.style.map, {"edge-direction": q + " " + m}), h.id, n)
                }
            }, stop: function (j) {
                var m = d._getOffset(j), l = $(b).data("from_terminal"), f = $(b).data("edge_terminal") || [m.x, m.y], h = OG.Util.isElement(l) ? d._getShapeFromTerminal(l) : null, k = OG.Util.isElement(f) ? d._getShapeFromTerminal(f) : null, i = $(b).data("edge"), g;
                $(this).css({position: "absolute", left: "0px", top: "0px"});
                $(b).removeData("from_terminal");
                $(b).removeData("edge");
                $(b).removeData("edge_terminal");
                $(b).removeData("dragged_guide");
                d._RENDERER.remove(i);
                d._RENDERER.removeGuide(c);
                if (k) {
                    d._RENDERER.remove(k.id + OG.Constants.DROP_OVER_BBOX_SUFFIX)
                }
                g = h && k && h.id === k.id;
                if (!g || d._isSelfConnectable(k.shape)) {
                    c = d._RENDERER.connect(l, f, c, c.shape.geom.style);
                    if (c) {
                        a = d._RENDERER.drawGuide(c);
                        if (a) {
                            d.setResizable(c, a, true);
                            d._RENDERER.toFront(a.group)
                        }
                    }
                }
            }});
            $.each(a.controls, function (f, g) {
                $(g).draggable({start: function (h) {
                    var i = d._getOffset(h);
                    $(this).data("start", {x: i.x, y: i.y});
                    $(this).data("offset", {x: i.x - d._num(d._RENDERER.getAttr(g, "x")), y: i.y - d._num(d._RENDERER.getAttr(g, "y"))});
                    d._RENDERER.remove(a.bBox);
                    d._RENDERER.removeRubberBand(d._RENDERER.getRootElement())
                }, drag: function (i) {
                    var k = d._getOffset(i), j = $(this).data("start"), l = $(this).data("offset"), h = k.x - l.x, p = k.y - l.y, n = c.shape.geom.getVertices(), o = g.id.indexOf(OG.Constants.GUIDE_SUFFIX.CTL_H) >= 0, m = o ? parseInt(g.id.replace(c.id + OG.Constants.GUIDE_SUFFIX.CTL_H, ""), 10) : parseInt(g.id.replace(c.id + OG.Constants.GUIDE_SUFFIX.CTL_V, ""), 10);
                    $(this).css({position: "", left: "", top: ""});
                    if (o) {
                        n[m].x = h;
                        n[m + 1].x = h
                    } else {
                        n[m].y = p;
                        n[m + 1].y = p
                    }
                    c = d._RENDERER.drawEdge(new OG.PolyLine(n), c.shape.geom.style, c.id);
                    d._RENDERER.drawGuide(c);
                    d._RENDERER.removeAllTerminal();
                    d._RENDERER.drawLabel(c);
                    d._RENDERER.drawEdgeLabel(c, null, "FROM");
                    d._RENDERER.drawEdgeLabel(c, null, "TO")
                }, stop: function (i) {
                    var k = d._getOffset(i), j = $(this).data("start"), l = $(this).data("offset"), h = k.x - l.x, p = k.y - l.y, n = c.shape.geom.getVertices(), o = g.id.indexOf(OG.Constants.GUIDE_SUFFIX.CTL_H) >= 0, m = o ? parseInt(g.id.replace(c.id + OG.Constants.GUIDE_SUFFIX.CTL_H, ""), 10) : parseInt(g.id.replace(c.id + OG.Constants.GUIDE_SUFFIX.CTL_V, ""), 10);
                    $(this).css({position: "absolute", left: "0px", top: "0px"});
                    if (o) {
                        n[m].x = h;
                        n[m + 1].x = h
                    } else {
                        n[m].y = p;
                        n[m + 1].y = p
                    }
                    c = d._RENDERER.drawEdge(new OG.PolyLine(n), c.shape.geom.style, c.id);
                    d._RENDERER.drawGuide(c);
                    d._RENDERER.drawLabel(c);
                    d._RENDERER.drawEdgeLabel(c, null, "FROM");
                    d._RENDERER.drawEdgeLabel(c, null, "TO")
                }})
            })
        } else {
            $(a.rc).draggable({start: function (f) {
                var g = d._getOffset(f);
                $(this).data("start", {x: g.x, y: g.y});
                $(this).data("offset", {x: g.x - d._num(d._RENDERER.getAttr(a.rc, "x")), y: g.y - d._num(d._RENDERER.getAttr(a.rc, "y"))});
                d._RENDERER.removeRubberBand(d._RENDERER.getRootElement())
            }, drag: function (g) {
                var h = d._getOffset(g), k = $(this).data("start"), j = $(this).data("offset"), i = d._grid(h.x - j.x), f = d._grid(i - d._num(d._RENDERER.getAttr(a.lc, "x")));
                $(this).css({position: "", left: "", top: ""});
                if (f >= d._CONFIG.GUIDE_MIN_SIZE) {
                    d._RENDERER.setAttr(a.rc, {x: i});
                    d._RENDERER.setAttr(a.ur, {x: i});
                    d._RENDERER.setAttr(a.lr, {x: i});
                    d._RENDERER.setAttr(a.uc, {x: OG.Util.round((d._num(d._RENDERER.getAttr(a.lc, "x")) + i) / 2)});
                    d._RENDERER.setAttr(a.lwc, {x: OG.Util.round((d._num(d._RENDERER.getAttr(a.lc, "x")) + i) / 2)});
                    d._RENDERER.setAttr(a.bBox, {width: f})
                }
                d._RENDERER.removeAllTerminal()
            }, stop: function (g) {
                var h = d._getOffset(g), i = $(this).data("start"), f = h.x - i.x;
                $(this).css({position: "absolute", left: "0px", top: "0px"});
                if (c && c.shape.geom) {
                    if (c.shape.geom.getBoundary().getWidth() + f < d._CONFIG.GUIDE_MIN_SIZE) {
                        f = d._CONFIG.GUIDE_MIN_SIZE - c.shape.geom.getBoundary().getWidth()
                    }
                    d._RENDERER.resize(c, [0, 0, 0, d._grid(f)]);
                    d._RENDERER.drawGuide(c)
                }
            }});
            $(a.lwc).draggable({start: function (f) {
                var g = d._getOffset(f);
                $(this).data("start", {x: g.x, y: g.y});
                $(this).data("offset", {x: g.x - d._num(d._RENDERER.getAttr(a.lwc, "x")), y: g.y - d._num(d._RENDERER.getAttr(a.lwc, "y"))});
                d._RENDERER.removeRubberBand(d._RENDERER.getRootElement())
            }, drag: function (g) {
                var h = d._getOffset(g), k = $(this).data("start"), j = $(this).data("offset"), i = d._grid(h.y - j.y), f = d._grid(i - d._num(d._RENDERER.getAttr(a.uc, "y")));
                $(this).css({position: "", left: "", top: ""});
                if (f >= d._CONFIG.GUIDE_MIN_SIZE) {
                    d._RENDERER.setAttr(a.lwc, {y: i});
                    d._RENDERER.setAttr(a.ll, {y: i});
                    d._RENDERER.setAttr(a.lr, {y: i});
                    d._RENDERER.setAttr(a.lc, {y: OG.Util.round((d._num(d._RENDERER.getAttr(a.uc, "y")) + i) / 2)});
                    d._RENDERER.setAttr(a.rc, {y: OG.Util.round((d._num(d._RENDERER.getAttr(a.uc, "y")) + i) / 2)});
                    d._RENDERER.setAttr(a.bBox, {height: f})
                }
                d._RENDERER.removeAllTerminal()
            }, stop: function (g) {
                var h = d._getOffset(g), i = $(this).data("start"), f = h.y - i.y;
                $(this).css({position: "absolute", left: "0px", top: "0px"});
                if (c && c.shape.geom) {
                    if (c.shape.geom.getBoundary().getHeight() + f < d._CONFIG.GUIDE_MIN_SIZE) {
                        f = d._CONFIG.GUIDE_MIN_SIZE - c.shape.geom.getBoundary().getHeight()
                    }
                    d._RENDERER.resize(c, [0, d._grid(f), 0, 0]);
                    d._RENDERER.drawGuide(c)
                }
            }});
            $(a.lr).draggable({start: function (f) {
                var g = d._getOffset(f);
                $(this).data("start", {x: g.x, y: g.y});
                $(this).data("offset", {x: g.x - d._num(d._RENDERER.getAttr(a.lr, "x")), y: g.y - d._num(d._RENDERER.getAttr(a.lr, "y"))});
                d._RENDERER.removeRubberBand(d._RENDERER.getRootElement())
            }, drag: function (h) {
                var i = d._getOffset(h), m = $(this).data("start"), l = $(this).data("offset"), k = d._grid(i.x - l.x), g = d._grid(k - d._num(d._RENDERER.getAttr(a.lc, "x"))), j = d._grid(i.y - l.y), f = d._grid(j - d._num(d._RENDERER.getAttr(a.uc, "y")));
                $(this).css({position: "", left: "", top: ""});
                if (g >= d._CONFIG.GUIDE_MIN_SIZE) {
                    d._RENDERER.setAttr(a.rc, {x: k});
                    d._RENDERER.setAttr(a.ur, {x: k});
                    d._RENDERER.setAttr(a.lr, {x: k});
                    d._RENDERER.setAttr(a.uc, {x: OG.Util.round((d._num(d._RENDERER.getAttr(a.lc, "x")) + k) / 2)});
                    d._RENDERER.setAttr(a.lwc, {x: OG.Util.round((d._num(d._RENDERER.getAttr(a.lc, "x")) + k) / 2)});
                    d._RENDERER.setAttr(a.bBox, {width: g})
                }
                if (f >= d._CONFIG.GUIDE_MIN_SIZE) {
                    d._RENDERER.setAttr(a.lwc, {y: j});
                    d._RENDERER.setAttr(a.ll, {y: j});
                    d._RENDERER.setAttr(a.lr, {y: j});
                    d._RENDERER.setAttr(a.lc, {y: OG.Util.round((d._num(d._RENDERER.getAttr(a.uc, "y")) + j) / 2)});
                    d._RENDERER.setAttr(a.rc, {y: OG.Util.round((d._num(d._RENDERER.getAttr(a.uc, "y")) + j) / 2)});
                    d._RENDERER.setAttr(a.bBox, {height: f})
                }
                d._RENDERER.removeAllTerminal()
            }, stop: function (h) {
                var i = d._getOffset(h), j = $(this).data("start"), g = i.x - j.x, f = i.y - j.y;
                $(this).css({position: "absolute", left: "0px", top: "0px"});
                if (c && c.shape.geom) {
                    if (c.shape.geom.getBoundary().getWidth() + g < d._CONFIG.GUIDE_MIN_SIZE) {
                        g = d._CONFIG.GUIDE_MIN_SIZE - c.shape.geom.getBoundary().getWidth()
                    }
                    if (c.shape.geom.getBoundary().getHeight() + f < d._CONFIG.GUIDE_MIN_SIZE) {
                        f = d._CONFIG.GUIDE_MIN_SIZE - c.shape.geom.getBoundary().getHeight()
                    }
                    d._RENDERER.resize(c, [0, d._grid(f), 0, d._grid(g)]);
                    d._RENDERER.drawGuide(c)
                }
                d._RENDERER.removeAllTerminal()
            }});
            $(a.lc).draggable({start: function (f) {
                var g = d._getOffset(f);
                $(this).data("start", {x: g.x, y: g.y});
                $(this).data("offset", {x: g.x - d._num(d._RENDERER.getAttr(a.lc, "x")), y: g.y - d._num(d._RENDERER.getAttr(a.lc, "y"))});
                d._RENDERER.removeRubberBand(d._RENDERER.getRootElement())
            }, drag: function (g) {
                var h = d._getOffset(g), k = $(this).data("start"), j = $(this).data("offset"), i = d._grid(h.x - j.x), f = d._grid(d._num(d._RENDERER.getAttr(a.rc, "x")) - i);
                $(this).css({position: "", left: "", top: ""});
                if (f >= d._CONFIG.GUIDE_MIN_SIZE) {
                    d._RENDERER.setAttr(a.lc, {x: i});
                    d._RENDERER.setAttr(a.ul, {x: i});
                    d._RENDERER.setAttr(a.ll, {x: i});
                    d._RENDERER.setAttr(a.uc, {x: OG.Util.round((d._num(d._RENDERER.getAttr(a.rc, "x")) + i) / 2)});
                    d._RENDERER.setAttr(a.lwc, {x: OG.Util.round((d._num(d._RENDERER.getAttr(a.rc, "x")) + i) / 2)});
                    d._RENDERER.setAttr(a.bBox, {x: OG.Util.round(i + d._num(d._RENDERER.getAttr(a.lc, "width")) / 2), width: f})
                }
                d._RENDERER.removeAllTerminal()
            }, stop: function (g) {
                var h = d._getOffset(g), i = $(this).data("start"), f = i.x - h.x;
                $(this).css({position: "absolute", left: "0px", top: "0px"});
                if (c && c.shape.geom) {
                    if (c.shape.geom.getBoundary().getWidth() + f < d._CONFIG.GUIDE_MIN_SIZE) {
                        f = d._CONFIG.GUIDE_MIN_SIZE - c.shape.geom.getBoundary().getWidth()
                    }
                    d._RENDERER.resize(c, [0, 0, d._grid(f), 0]);
                    d._RENDERER.drawGuide(c)
                }
            }});
            $(a.ll).draggable({start: function (f) {
                var g = d._getOffset(f);
                $(this).data("start", {x: g.x, y: g.y});
                $(this).data("offset", {x: g.x - d._num(d._RENDERER.getAttr(a.ll, "x")), y: g.y - d._num(d._RENDERER.getAttr(a.ll, "y"))});
                d._RENDERER.removeRubberBand(d._RENDERER.getRootElement())
            }, drag: function (h) {
                var i = d._getOffset(h), m = $(this).data("start"), l = $(this).data("offset"), k = d._grid(i.x - l.x), j = d._grid(i.y - l.y), g = d._grid(d._num(d._RENDERER.getAttr(a.rc, "x")) - k), f = d._grid(j - d._num(d._RENDERER.getAttr(a.uc, "y")));
                $(this).css({position: "", left: "", top: ""});
                if (g >= d._CONFIG.GUIDE_MIN_SIZE) {
                    d._RENDERER.setAttr(a.lc, {x: k});
                    d._RENDERER.setAttr(a.ul, {x: k});
                    d._RENDERER.setAttr(a.ll, {x: k});
                    d._RENDERER.setAttr(a.uc, {x: OG.Util.round((d._num(d._RENDERER.getAttr(a.rc, "x")) + k) / 2)});
                    d._RENDERER.setAttr(a.lwc, {x: OG.Util.round((d._num(d._RENDERER.getAttr(a.rc, "x")) + k) / 2)});
                    d._RENDERER.setAttr(a.bBox, {x: OG.Util.round(k + d._num(d._RENDERER.getAttr(a.lc, "width")) / 2), width: g})
                }
                if (f >= d._CONFIG.GUIDE_MIN_SIZE) {
                    d._RENDERER.setAttr(a.lwc, {y: j});
                    d._RENDERER.setAttr(a.ll, {y: j});
                    d._RENDERER.setAttr(a.lr, {y: j});
                    d._RENDERER.setAttr(a.lc, {y: OG.Util.round((d._num(d._RENDERER.getAttr(a.uc, "y")) + j) / 2)});
                    d._RENDERER.setAttr(a.rc, {y: OG.Util.round((d._num(d._RENDERER.getAttr(a.uc, "y")) + j) / 2)});
                    d._RENDERER.setAttr(a.bBox, {height: f})
                }
                d._RENDERER.removeAllTerminal()
            }, stop: function (h) {
                var i = d._getOffset(h), j = $(this).data("start"), g = j.x - i.x, f = i.y - j.y;
                $(this).css({position: "absolute", left: "0px", top: "0px"});
                if (c && c.shape.geom) {
                    if (c.shape.geom.getBoundary().getWidth() + g < d._CONFIG.GUIDE_MIN_SIZE) {
                        g = d._CONFIG.GUIDE_MIN_SIZE - c.shape.geom.getBoundary().getWidth()
                    }
                    if (c.shape.geom.getBoundary().getHeight() + f < d._CONFIG.GUIDE_MIN_SIZE) {
                        f = d._CONFIG.GUIDE_MIN_SIZE - c.shape.geom.getBoundary().getHeight()
                    }
                    d._RENDERER.resize(c, [0, d._grid(f), d._grid(g), 0]);
                    d._RENDERER.drawGuide(c)
                }
            }});
            $(a.uc).draggable({start: function (f) {
                var g = d._getOffset(f);
                $(this).data("start", {x: g.x, y: g.y});
                $(this).data("offset", {x: g.x - d._num(d._RENDERER.getAttr(a.uc, "x")), y: g.y - d._num(d._RENDERER.getAttr(a.uc, "y"))});
                d._RENDERER.removeRubberBand(d._RENDERER.getRootElement())
            }, drag: function (g) {
                var h = d._getOffset(g), k = $(this).data("start"), j = $(this).data("offset"), i = d._grid(h.y - j.y), f = d._grid(d._num(d._RENDERER.getAttr(a.lwc, "y")) - i);
                $(this).css({position: "", left: "", top: ""});
                if (f >= d._CONFIG.GUIDE_MIN_SIZE) {
                    d._RENDERER.setAttr(a.uc, {y: i});
                    d._RENDERER.setAttr(a.ul, {y: i});
                    d._RENDERER.setAttr(a.ur, {y: i});
                    d._RENDERER.setAttr(a.lc, {y: OG.Util.round((d._num(d._RENDERER.getAttr(a.lwc, "y")) + i) / 2)});
                    d._RENDERER.setAttr(a.rc, {y: OG.Util.round((d._num(d._RENDERER.getAttr(a.lwc, "y")) + i) / 2)});
                    d._RENDERER.setAttr(a.bBox, {y: OG.Util.round(i + d._num(d._RENDERER.getAttr(a.uc, "width")) / 2), height: f})
                }
                d._RENDERER.removeAllTerminal()
            }, stop: function (g) {
                var h = d._getOffset(g), i = $(this).data("start"), f = i.y - h.y;
                $(this).css({position: "absolute", left: "0px", top: "0px"});
                if (c && c.shape.geom) {
                    if (c.shape.geom.getBoundary().getHeight() + f < d._CONFIG.GUIDE_MIN_SIZE) {
                        f = d._CONFIG.GUIDE_MIN_SIZE - c.shape.geom.getBoundary().getHeight()
                    }
                    d._RENDERER.resize(c, [d._grid(f), 0, 0, 0]);
                    d._RENDERER.drawGuide(c)
                }
            }});
            $(a.ul).draggable({start: function (f) {
                var g = d._getOffset(f);
                $(this).data("start", {x: g.x, y: g.y});
                $(this).data("offset", {x: g.x - d._num(d._RENDERER.getAttr(a.ul, "x")), y: g.y - d._num(d._RENDERER.getAttr(a.ul, "y"))});
                d._RENDERER.removeRubberBand(d._RENDERER.getRootElement())
            }, drag: function (h) {
                var i = d._getOffset(h), m = $(this).data("start"), l = $(this).data("offset"), k = d._grid(i.x - l.x), j = d._grid(i.y - l.y), g = d._grid(d._num(d._RENDERER.getAttr(a.rc, "x")) - k), f = d._grid(d._num(d._RENDERER.getAttr(a.lwc, "y")) - j);
                $(this).css({position: "", left: "", top: ""});
                if (g >= d._CONFIG.GUIDE_MIN_SIZE) {
                    d._RENDERER.setAttr(a.lc, {x: k});
                    d._RENDERER.setAttr(a.ul, {x: k});
                    d._RENDERER.setAttr(a.ll, {x: k});
                    d._RENDERER.setAttr(a.uc, {x: OG.Util.round((d._num(d._RENDERER.getAttr(a.rc, "x")) + k) / 2)});
                    d._RENDERER.setAttr(a.lwc, {x: OG.Util.round((d._num(d._RENDERER.getAttr(a.rc, "x")) + k) / 2)});
                    d._RENDERER.setAttr(a.bBox, {x: OG.Util.round(k + d._num(d._RENDERER.getAttr(a.lc, "width")) / 2), width: g})
                }
                if (f >= d._CONFIG.GUIDE_MIN_SIZE) {
                    d._RENDERER.setAttr(a.uc, {y: j});
                    d._RENDERER.setAttr(a.ul, {y: j});
                    d._RENDERER.setAttr(a.ur, {y: j});
                    d._RENDERER.setAttr(a.lc, {y: OG.Util.round((d._num(d._RENDERER.getAttr(a.lwc, "y")) + j) / 2)});
                    d._RENDERER.setAttr(a.rc, {y: OG.Util.round((d._num(d._RENDERER.getAttr(a.lwc, "y")) + j) / 2)});
                    d._RENDERER.setAttr(a.bBox, {y: OG.Util.round(j + d._num(d._RENDERER.getAttr(a.uc, "height")) / 2), height: f})
                }
                d._RENDERER.removeAllTerminal()
            }, stop: function (h) {
                var i = d._getOffset(h), j = $(this).data("start"), g = j.x - i.x, f = j.y - i.y;
                $(this).css({position: "absolute", left: "0px", top: "0px"});
                if (c && c.shape.geom) {
                    if (c.shape.geom.getBoundary().getWidth() + g < d._CONFIG.GUIDE_MIN_SIZE) {
                        g = d._CONFIG.GUIDE_MIN_SIZE - c.shape.geom.getBoundary().getWidth()
                    }
                    if (c.shape.geom.getBoundary().getHeight() + f < d._CONFIG.GUIDE_MIN_SIZE) {
                        f = d._CONFIG.GUIDE_MIN_SIZE - c.shape.geom.getBoundary().getHeight()
                    }
                    d._RENDERER.resize(c, [d._grid(f), 0, d._grid(g), 0]);
                    d._RENDERER.drawGuide(c)
                }
            }});
            $(a.ur).draggable({start: function (f) {
                var g = d._getOffset(f);
                $(this).data("start", {x: g.x, y: g.y});
                $(this).data("offset", {x: g.x - d._num(d._RENDERER.getAttr(a.ur, "x")), y: g.y - d._num(d._RENDERER.getAttr(a.ur, "y"))});
                d._RENDERER.removeRubberBand(d._RENDERER.getRootElement())
            }, drag: function (h) {
                var i = d._getOffset(h), m = $(this).data("start"), l = $(this).data("offset"), k = d._grid(i.x - l.x), j = d._grid(i.y - l.y), g = d._grid(k - d._num(d._RENDERER.getAttr(a.lc, "x"))), f = d._grid(d._num(d._RENDERER.getAttr(a.lwc, "y")) - j);
                $(this).css({position: "", left: "", top: ""});
                if (g >= d._CONFIG.GUIDE_MIN_SIZE) {
                    d._RENDERER.setAttr(a.rc, {x: k});
                    d._RENDERER.setAttr(a.ur, {x: k});
                    d._RENDERER.setAttr(a.lr, {x: k});
                    d._RENDERER.setAttr(a.uc, {x: OG.Util.round((d._num(d._RENDERER.getAttr(a.lc, "x")) + k) / 2)});
                    d._RENDERER.setAttr(a.lwc, {x: OG.Util.round((d._num(d._RENDERER.getAttr(a.lc, "x")) + k) / 2)});
                    d._RENDERER.setAttr(a.bBox, {width: g})
                }
                if (f >= d._CONFIG.GUIDE_MIN_SIZE) {
                    d._RENDERER.setAttr(a.uc, {y: j});
                    d._RENDERER.setAttr(a.ul, {y: j});
                    d._RENDERER.setAttr(a.ur, {y: j});
                    d._RENDERER.setAttr(a.lc, {y: OG.Util.round((d._num(d._RENDERER.getAttr(a.lwc, "y")) + j) / 2)});
                    d._RENDERER.setAttr(a.rc, {y: OG.Util.round((d._num(d._RENDERER.getAttr(a.lwc, "y")) + j) / 2)});
                    d._RENDERER.setAttr(a.bBox, {y: OG.Util.round(j + d._num(d._RENDERER.getAttr(a.uc, "width")) / 2), height: f})
                }
                d._RENDERER.removeAllTerminal()
            }, stop: function (h) {
                var i = d._getOffset(h), j = $(this).data("start"), g = i.x - j.x, f = j.y - i.y;
                $(this).css({position: "absolute", left: "0px", top: "0px"});
                if (c && c.shape.geom) {
                    if (c.shape.geom.getBoundary().getWidth() + g < d._CONFIG.GUIDE_MIN_SIZE) {
                        g = d._CONFIG.GUIDE_MIN_SIZE - c.shape.geom.getBoundary().getWidth()
                    }
                    if (c.shape.geom.getBoundary().getHeight() + f < d._CONFIG.GUIDE_MIN_SIZE) {
                        f = d._CONFIG.GUIDE_MIN_SIZE - c.shape.geom.getBoundary().getHeight()
                    }
                    d._RENDERER.resize(c, [d._grid(f), 0, 0, d._grid(g)]);
                    d._RENDERER.drawGuide(c)
                }
            }})
        }
    } else {
        if ($(c).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
            d._RENDERER.setAttr(a.from, {cursor: "default"});
            d._RENDERER.setAttr(a.to, {cursor: "default"});
            $.each(a.controls, function (f, g) {
                d._RENDERER.setAttr(g, {cursor: "default"})
            })
        } else {
            d._RENDERER.setAttr(a.ul, {cursor: "default"});
            d._RENDERER.setAttr(a.ur, {cursor: "default"});
            d._RENDERER.setAttr(a.ll, {cursor: "default"});
            d._RENDERER.setAttr(a.lr, {cursor: "default"});
            d._RENDERER.setAttr(a.lc, {cursor: "default"});
            d._RENDERER.setAttr(a.uc, {cursor: "default"});
            d._RENDERER.setAttr(a.rc, {cursor: "default"});
            d._RENDERER.setAttr(a.lwc, {cursor: "default"})
        }
    }
}, setClickSelectable: function (b, a) {
    var c = this;
    if (a === true) {
        $(b).bind("click", function (e) {
            var d;
            $(c._RENDERER.getContainer()).focus();
            if (b.shape) {
                if (!e.shiftKey && !e.ctrlKey) {
                    $(c._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (f, g) {
                        if (g.id) {
                            c._RENDERER.removeGuide(g)
                        }
                    })
                }
                if ($(b).attr("_selected") === "true") {
                    if (e.shiftKey || e.ctrlKey) {
                        c._RENDERER.removeGuide(b)
                    }
                } else {
                    c._deselectChildren(b);
                    if (!c._isParentSelected(b)) {
                        d = c._RENDERER.drawGuide(b);
                        if (d) {
                            c.setResizable(b, d, c._isResizable(b.shape));
                            c._RENDERER.removeAllTerminal();
                            c._RENDERER.toFront(d.group)
                        }
                    }
                }
                return false
            }
        });
        if (c._CONFIG.ENABLE_CONTEXTMENU) {
            $(b).bind("contextmenu", function (e) {
                var d;
                if (b.shape) {
                    if ($(b).attr("_selected") !== "true") {
                        $(c._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (f, g) {
                            if (g.id) {
                                c._RENDERER.removeGuide(g)
                            }
                        });
                        c._deselectChildren(b);
                        if (!c._isParentSelected(b)) {
                            d = c._RENDERER.drawGuide(b);
                            if (d) {
                                c.setResizable(b, d, c._isResizable(b.shape));
                                c._RENDERER.removeAllTerminal();
                                c._RENDERER.toFront(d.group)
                            }
                        }
                    }
                    return true
                }
            })
        }
        if (a && c._isMovable(b.shape)) {
            c._RENDERER.setAttr(b, {cursor: "move"});
            OG.Util.apply(b.shape.geom.style.map, {cursor: "move"})
        } else {
            c._RENDERER.setAttr(b, {cursor: "pointer"});
            OG.Util.apply(b.shape.geom.style.map, {cursor: "pointer"})
        }
    } else {
        $(b).unbind("click");
        c._RENDERER.setAttr(b, {cursor: c._CONFIG.DEFAULT_STYLE.SHAPE.cursor});
        OG.Util.apply(b.shape.geom.style.map, {cursor: c._CONFIG.DEFAULT_STYLE.SHAPE.cursor})
    }
}, setDragSelectable: function (a) {
    var c = this, b = c._RENDERER.getRootElement();
    $(b).bind("click", function (e) {
        var d = $(this).data("dragBox");
        $(c._RENDERER.getContainer()).focus();
        if (!d || (d && d.width < 1 && d.height < 1)) {
            $(c._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (f, g) {
                if (OG.Util.isElement(g) && g.id) {
                    c._RENDERER.removeGuide(g)
                }
            });
            c._RENDERER.removeAllTerminal()
        }
    });
    if (a === true) {
        $(b).bind("mousedown", function (d) {
            var e = c._getOffset(d);
            $(this).data("dragBox_first", {x: e.x, y: e.y});
            c._RENDERER.drawRubberBand([e.x, e.y])
        });
        $(b).bind("mousemove", function (g) {
            var i = $(this).data("dragBox_first"), h, f, e, d, j;
            if (i) {
                h = c._getOffset(g);
                f = h.x - i.x;
                e = h.y - i.y;
                d = f <= 0 ? i.x + f : i.x;
                j = e <= 0 ? i.y + e : i.y;
                c._RENDERER.drawRubberBand([d, j], [Math.abs(f), Math.abs(e)])
            }
        });
        $(b).bind("mouseup", function (d) {
            var h = $(this).data("dragBox_first"), g, e, l, k, j, i, f;
            c._RENDERER.removeRubberBand(b);
            if (h) {
                g = c._getOffset(d);
                e = g.x - h.x;
                l = g.y - h.y;
                k = e <= 0 ? h.x + e : h.x;
                j = l <= 0 ? h.y + l : h.y;
                i = new OG.Envelope([k, j], Math.abs(e), Math.abs(l));
                $(c._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "]").each(function (m, n) {
                    if (n.shape.geom && i.isContainsAll(n.shape.geom.getVertices())) {
                        c._deselectChildren(n);
                        if (!c._isParentSelected(n)) {
                            f = c._RENDERER.drawGuide(n);
                            if (f) {
                                c.setResizable(n, f, c._isResizable(n.shape));
                                c._RENDERER.removeAllTerminal()
                            }
                        }
                    }
                });
                $(this).data("dragBox", {width: e, height: l, x: k, y: j})
            }
        });
        $(b).bind("contextmenu", function (d) {
            c._RENDERER.removeRubberBand(b)
        })
    } else {
        $(b).unbind("mousedown");
        $(b).unbind("mousemove");
        $(b).unbind("mouseup");
        $(b).unbind("contextmenu")
    }
}, setEnableHotKey: function (b) {
    var a = this;
    if (b === true) {
        $(a._RENDERER.getContainer()).bind("keydown", function (c) {
            if (!/^textarea$/i.test(c.srcElement.tagName) && !/^input$/i.test(c.srcElement.tagName)) {
                if (a._CONFIG.ENABLE_HOTKEY_DELETE && c.keyCode === KeyEvent.DOM_VK_DELETE) {
                    c.preventDefault();
                    a.deleteSelectedShape()
                }
                if (a._CONFIG.ENABLE_HOTKEY_CTRL_A && a._CONFIG.SELECTABLE && (c.ctrlKey || c.metaKey) && c.keyCode === KeyEvent.DOM_VK_A) {
                    c.preventDefault();
                    a.selectAll()
                }
                if (a._CONFIG.ENABLE_HOTKEY_CTRL_C && (c.ctrlKey || c.metaKey) && c.keyCode === KeyEvent.DOM_VK_C) {
                    c.preventDefault();
                    a.copySelectedShape()
                }
                if (a._CONFIG.ENABLE_HOTKEY_CTRL_C && (c.ctrlKey || c.metaKey) && c.keyCode === KeyEvent.DOM_VK_X) {
                    c.preventDefault();
                    a.cutSelectedShape()
                }
                if (a._CONFIG.ENABLE_HOTKEY_CTRL_V && (c.ctrlKey || c.metaKey) && c.keyCode === KeyEvent.DOM_VK_V) {
                    c.preventDefault();
                    a.pasteSelectedShape()
                }
                if (a._CONFIG.ENABLE_HOTKEY_CTRL_D && (c.ctrlKey || c.metaKey) && c.keyCode === KeyEvent.DOM_VK_D) {
                    c.preventDefault();
                    a.duplicateSelectedShape()
                }
                if (a._CONFIG.ENABLE_HOTKEY_CTRL_G && (c.ctrlKey || c.metaKey) && c.keyCode === KeyEvent.DOM_VK_G) {
                    c.preventDefault();
                    a.groupSelectedShape()
                }
                if (a._CONFIG.ENABLE_HOTKEY_CTRL_U && (c.ctrlKey || c.metaKey) && c.keyCode === KeyEvent.DOM_VK_U) {
                    c.preventDefault();
                    a.ungroupSelectedShape()
                }
                if (a._CONFIG.ENABLE_HOTKEY_SHIFT_ARROW) {
                    if (c.shiftKey && c.keyCode === KeyEvent.DOM_VK_LEFT) {
                        c.preventDefault();
                        a._moveElements(a._getMoveTargets(), -1 * (a._CONFIG.DRAG_GRIDABLE ? a._CONFIG.MOVE_SNAP_SIZE : 1), 0)
                    }
                    if (c.shiftKey && c.keyCode === KeyEvent.DOM_VK_RIGHT) {
                        c.preventDefault();
                        a._moveElements(a._getMoveTargets(), (a._CONFIG.DRAG_GRIDABLE ? a._CONFIG.MOVE_SNAP_SIZE : 1), 0)
                    }
                    if (c.shiftKey && c.keyCode === KeyEvent.DOM_VK_UP) {
                        c.preventDefault();
                        a._moveElements(a._getMoveTargets(), 0, -1 * (a._CONFIG.DRAG_GRIDABLE ? a._CONFIG.MOVE_SNAP_SIZE : 1))
                    }
                    if (c.shiftKey && c.keyCode === KeyEvent.DOM_VK_DOWN) {
                        c.preventDefault();
                        a._moveElements(a._getMoveTargets(), 0, (a._CONFIG.DRAG_GRIDABLE ? a._CONFIG.MOVE_SNAP_SIZE : 1))
                    }
                }
                if (a._CONFIG.ENABLE_HOTKEY_ARROW) {
                    if (!c.shiftKey && c.keyCode === KeyEvent.DOM_VK_LEFT) {
                        c.preventDefault();
                        a._moveElements(a._getMoveTargets(), -1 * a._CONFIG.MOVE_SNAP_SIZE, 0)
                    }
                    if (!c.shiftKey && c.keyCode === KeyEvent.DOM_VK_RIGHT) {
                        c.preventDefault();
                        a._moveElements(a._getMoveTargets(), a._CONFIG.MOVE_SNAP_SIZE, 0)
                    }
                    if (!c.shiftKey && c.keyCode === KeyEvent.DOM_VK_UP) {
                        c.preventDefault();
                        a._moveElements(a._getMoveTargets(), 0, -1 * a._CONFIG.MOVE_SNAP_SIZE)
                    }
                    if (!c.shiftKey && c.keyCode === KeyEvent.DOM_VK_DOWN) {
                        c.preventDefault();
                        a._moveElements(a._getMoveTargets(), 0, a._CONFIG.MOVE_SNAP_SIZE)
                    }
                }
            }
        })
    } else {
        $(a._RENDERER.getContainer()).unbind("keydown")
    }
}, enableRootContextMenu: function () {
    var a = this;
    $.contextMenu({selector: "#" + a._RENDERER.getRootElement().id, build: function (b, f) {
        var d = a._RENDERER.getRootGroup(), c = $(d).data("copied");
        $(a._RENDERER.getContainer()).focus();
        return{items: {selectAll: {name: "Select All", callback: function () {
            a.selectAll()
        }}, sep1: "---------", paste: {name: "Paste", callback: function () {
            a.pasteSelectedShape()
        }, disabled: (c ? false : true)}, sep2: "---------", view: {name: "View", items: {view_actualSize: {name: "Actual Size", callback: function () {
            a._RENDERER.setScale(1)
        }}, sep2_1: "---------", view_fitWindow: {name: "Fit Window", callback: function () {
            a.fitWindow()
        }}, sep2_2: "---------", view_25: {name: "25%", callback: function () {
            a._RENDERER.setScale(0.25)
        }}, view_50: {name: "50%", callback: function () {
            a._RENDERER.setScale(0.5)
        }}, view_75: {name: "75%", callback: function () {
            a._RENDERER.setScale(0.75)
        }}, view_100: {name: "100%", callback: function () {
            a._RENDERER.setScale(1)
        }}, view_150: {name: "150%", callback: function () {
            a._RENDERER.setScale(1.5)
        }}, view_200: {name: "200%", callback: function () {
            a._RENDERER.setScale(2)
        }}, view_300: {name: "300%", callback: function () {
            a._RENDERER.setScale(3)
        }}, view_400: {name: "400%", callback: function () {
            a._RENDERER.setScale(4)
        }}, sep2_3: "---------", view_zoomin: {name: "Zoom In", callback: function () {
            a.zoomIn()
        }}, view_zoomout: {name: "Zoom Out", callback: function () {
            a.zoomOut()
        }}}}}}
    }})
}, enableShapeContextMenu: function () {
    var a = this;
    $.contextMenu({selector: "#" + a._RENDERER.getRootElement().id + " [_type=SHAPE]", build: function (b, c) {
        $(a._RENDERER.getContainer()).focus();
        return{items: {"delete": {name: "Delete", callback: function () {
            a.deleteSelectedShape()
        }}, sep1: "---------", cut: {name: "Cut", callback: function () {
            a.cutSelectedShape()
        }}, copy: {name: "Copy", callback: function () {
            a.copySelectedShape()
        }}, sep2: "---------", duplicate: {name: "Duplicate", callback: function () {
            a.duplicateSelectedShape()
        }}, sep3: "---------", group: {name: "Group", callback: function () {
            a.groupSelectedShape()
        }}, unGroup: {name: "UnGroup", callback: function () {
            a.ungroupSelectedShape()
        }}, sep4: "---------", shapeRotate: {name: "Rotate", items: {rotate_select: {name: "Select", type: "select", options: {"0": "0", "45": "45", "90": "90", "135": "135", "180": "180", "-45": "-45", "-90": "-90", "-135": "-135", "-180": "-180"}, selected: "0", events: {change: function (d) {
            a.rotateSelectedShape(d.target.value)
        }}}, sep5_6_1: "---------", rotate_custom: {name: "Custom", type: "text", events: {keyup: function (d) {
            if (d.target.value !== "") {
                a.rotateSelectedShape(d.target.value)
            }
        }}}}}, sep5: "---------", format: {name: "Format", items: {fillColor: {name: "Fill Color", items: {fillColor_select: {name: "Select", type: "select", options: {"": "", white: "white", gray: "gray", blue: "blue", red: "red", yellow: "yellow", orange: "orange", green: "green", black: "black"}, selected: "", events: {change: function (d) {
            if (d.target.value !== "") {
                a.setFillColorSelectedShape(d.target.value)
            }
        }}}, sep5_1_1: "---------", fillColor_custom: {name: "Custom", type: "text", events: {keyup: function (d) {
            if (d.target.value !== "") {
                a.setFillColorSelectedShape(d.target.value)
            }
        }}}}}, fillOpacity: {name: "Fill Opacity", items: {fillOpacity_select: {name: "Select", type: "select", options: {"": "", "0.0": "0%", "0.1": "10%", "0.2": "20%", "0.3": "30%", "0.4": "40%", "0.5": "50%", "0.6": "60%", "0.7": "70%", "0.8": "80%", "0.9": "90%", "1.0": "100%"}, selected: "", events: {change: function (d) {
            if (d.target.value !== "") {
                a.setFillOpacitySelectedShape(d.target.value)
            }
        }}}}}, sep5_1: "---------", lineType: {name: "Line Type", items: {lineType_straight: {name: "Straight", type: "radio", radio: "lineType", value: "straight", events: {change: function (d) {
            a.setLineTypeSelectedShape(d.target.value)
        }}}, lineType_plain: {name: "Plain", type: "radio", radio: "lineType", value: "plain", events: {change: function (d) {
            a.setLineTypeSelectedShape(d.target.value)
        }}}, lineType_bezier: {name: "Curve", type: "radio", radio: "lineType", value: "bezier", events: {change: function (d) {
            a.setLineTypeSelectedShape(d.target.value)
        }}}}}, lineStyle: {name: "Line Style", items: {lineStyle_1: {name: "──────", type: "radio", radio: "lineStyle", value: "", events: {change: function (d) {
            a.setLineStyleSelectedShape(d.target.value)
        }}}, lineStyle_2: {name: "---------", type: "radio", radio: "lineStyle", value: "-", events: {change: function (d) {
            a.setLineStyleSelectedShape(d.target.value)
        }}}, lineStyle_3: {name: "············", type: "radio", radio: "lineStyle", value: ".", events: {change: function (d) {
            a.setLineStyleSelectedShape(d.target.value)
        }}}, lineStyle_4: {name: "-·-·-·-·-·", type: "radio", radio: "lineStyle", value: "-.", events: {change: function (d) {
            a.setLineStyleSelectedShape(d.target.value)
        }}}, lineStyle_5: {name: "-··-··-··-", type: "radio", radio: "lineStyle", value: "-..", events: {change: function (d) {
            a.setLineStyleSelectedShape(d.target.value)
        }}}, lineStyle_6: {name: "· · · · · ·", type: "radio", radio: "lineStyle", value: ". ", events: {change: function (d) {
            a.setLineStyleSelectedShape(d.target.value)
        }}}, lineStyle_7: {name: "- - - - -", type: "radio", radio: "lineStyle", value: "- ", events: {change: function (d) {
            a.setLineStyleSelectedShape(d.target.value)
        }}}, lineStyle_8: {name: "─ ─ ─ ─", type: "radio", radio: "lineStyle", value: "--", events: {change: function (d) {
            a.setLineStyleSelectedShape(d.target.value)
        }}}, lineStyle_9: {name: "- ·- ·- ·-", type: "radio", radio: "lineStyle", value: "- .", events: {change: function (d) {
            a.setLineStyleSelectedShape(d.target.value)
        }}}, lineStyle_10: {name: "--·--·--·-", type: "radio", radio: "lineStyle", value: "--.", events: {change: function (d) {
            a.setLineStyleSelectedShape(d.target.value)
        }}}, lineStyle_11: {name: "--··--··--", type: "radio", radio: "lineStyle", value: "--..", events: {change: function (d) {
            a.setLineStyleSelectedShape(d.target.value)
        }}}}}, lineColor: {name: "Line Color", items: {lineColor_select: {name: "Select", type: "select", options: {"": "", white: "white", gray: "gray", blue: "blue", red: "red", yellow: "yellow", orange: "orange", green: "green", black: "black"}, selected: "", events: {change: function (d) {
            if (d.target.value !== "") {
                a.setLineColorSelectedShape(d.target.value)
            }
        }}}, sep5_4_1: "---------", lineColor_custom: {name: "Custom", type: "text", events: {keyup: function (d) {
            if (d.target.value !== "") {
                a.setLineColorSelectedShape(d.target.value)
            }
        }}}}}, lineWidth: {name: "Line Width", items: {lineWidth_select: {name: "Select", type: "select", options: {0: "", 1: "1px", 2: "2px", 3: "3px", 4: "4px", 5: "5px", 6: "6px", 8: "8px", 10: "10px", 12: "12px", 16: "16px", 24: "24px"}, selected: 0, events: {change: function (d) {
            if (d.target.value !== 0) {
                a.setLineWidthSelectedShape(d.target.value)
            }
        }}}, sep5_5_1: "---------", lineWidth_custom: {name: "Custom", type: "text", events: {keyup: function (d) {
            if (d.target.value !== "") {
                a.setLineWidthSelectedShape(d.target.value)
            }
        }}}}}}}, sep6: "---------", text: {name: "Text", items: {fontFamily: {name: "Font Family", items: {fontFamily_1: {name: '<span style="font-family: Arial">Arial</span>', type: "radio", radio: "fontFamily", value: "Arial", events: {change: function (d) {
            a.setFontFamilySelectedShape(d.target.value)
        }}}, fontFamily_2: {name: "<span style=\"font-family: 'Comic Sans MS'\">Comic Sans MS</span>", type: "radio", radio: "fontFamily", value: "Comic Sans MS", events: {change: function (d) {
            a.setFontFamilySelectedShape(d.target.value)
        }}}, fontFamily_3: {name: "<span style=\"font-family: 'Courier New'\">Courier New</span>", type: "radio", radio: "fontFamily", value: "Courier New", events: {change: function (d) {
            a.setFontFamilySelectedShape(d.target.value)
        }}}, fontFamily_4: {name: '<span style="font-family: Garamond">Garamond</span>', type: "radio", radio: "fontFamily", value: "Garamond", events: {change: function (d) {
            a.setFontFamilySelectedShape(d.target.value)
        }}}, fontFamily_5: {name: '<span style="font-family: Georgia">Georgia</span>', type: "radio", radio: "fontFamily", value: "Georgia", events: {change: function (d) {
            a.setFontFamilySelectedShape(d.target.value)
        }}}, fontFamily_6: {name: "<span style=\"font-family: 'Lucida Console'\">Lucida Console</span>", type: "radio", radio: "fontFamily", value: "Lucida Console", events: {change: function (d) {
            a.setFontFamilySelectedShape(d.target.value)
        }}}, fontFamily_7: {name: "<span style=\"font-family: 'MS Gothic'\">MS Gothic</span>", type: "radio", radio: "fontFamily", value: "MS Gothic", events: {change: function (d) {
            a.setFontFamilySelectedShape(d.target.value)
        }}}, fontFamily_8: {name: "<span style=\"font-family: 'MS Sans Serif'\">MS Sans Serif</span>", type: "radio", radio: "fontFamily", value: "MS Sans Serif", events: {change: function (d) {
            a.setFontFamilySelectedShape(d.target.value)
        }}}, fontFamily_9: {name: '<span style="font-family: Verdana">Verdana</span>', type: "radio", radio: "fontFamily", value: "Verdana", events: {change: function (d) {
            a.setFontFamilySelectedShape(d.target.value)
        }}}, fontFamily_10: {name: "<span style=\"font-family: 'Times New Roman'\">Times New Roman</span>", type: "radio", radio: "fontFamily", value: "Times New Roman", events: {change: function (d) {
            a.setFontFamilySelectedShape(d.target.value)
        }}}, sep6_1_1: "---------", fontFamily_custom: {name: "Custom", type: "text", events: {keyup: function (d) {
            if (d.target.value !== "") {
                a.setFontFamilySelectedShape(d.target.value)
            }
        }}}}}, fontColor: {name: "Font Color", items: {fontColor_select: {name: "Select", type: "select", options: {"": "", white: "white", gray: "gray", blue: "blue", red: "red", yellow: "yellow", orange: "orange", green: "green", black: "black"}, selected: "", events: {change: function (d) {
            if (d.target.value !== "") {
                a.setFontColorSelectedShape(d.target.value)
            }
        }}}, sep6_1_2: "---------", fontColor_custom: {name: "Custom", type: "text", events: {keyup: function (d) {
            if (d.target.value !== "") {
                a.setFontColorSelectedShape(d.target.value)
            }
        }}}}}, fontSize: {name: "Font Size", items: {fontSize_select: {name: "Select", type: "select", options: {"": "", "6": "6", "8": "8", "9": "9", "10": "10", "11": "11", "12": "12", "14": "14", "18": "18", "24": "24", "36": "36", "48": "48", "72": "72"}, selected: "", events: {change: function (d) {
            if (d.target.value !== "") {
                a.setFontSizeSelectedShape(d.target.value)
            }
        }}}, sep6_1_3: "---------", fontSize_custom: {name: "Custom", type: "text", events: {keyup: function (d) {
            if (d.target.value !== "") {
                a.setFontSizeSelectedShape(d.target.value)
            }
        }}}}}, sep6_1: "---------", fontWeight_bold: {name: '<span style="font-weight: bold">Bold</span>', type: "checkbox", events: {change: function (d) {
            if (d.target.checked) {
                a.setFontWeightSelectedShape("bold")
            } else {
                a.setFontWeightSelectedShape("normal")
            }
        }}}, fontWeight_italic: {name: '<span style="font-style: italic">Italic</span>', type: "checkbox", events: {change: function (d) {
            if (d.target.checked) {
                a.setFontStyleSelectedShape("italic")
            } else {
                a.setFontStyleSelectedShape("normal")
            }
        }}}, sep6_2: "---------", position: {name: "Text Position", items: {position_left: {name: "Left", type: "radio", radio: "position", value: "left", events: {change: function (d) {
            a.setLabelPositionSelectedShape(d.target.value)
        }}}, position_center: {name: "Center", type: "radio", radio: "position", value: "center", events: {change: function (d) {
            a.setLabelPositionSelectedShape(d.target.value)
        }}}, position_right: {name: "Right", type: "radio", radio: "position", value: "right", events: {change: function (d) {
            a.setLabelPositionSelectedShape(d.target.value)
        }}}, position_top: {name: "Top", type: "radio", radio: "position", value: "top", events: {change: function (d) {
            a.setLabelPositionSelectedShape(d.target.value)
        }}}, position_bottom: {name: "Bottom", type: "radio", radio: "position", value: "bottom", events: {change: function (d) {
            a.setLabelPositionSelectedShape(d.target.value)
        }}}}}, vertical: {name: "Vertical Align", items: {vertical_top: {name: "Top", type: "radio", radio: "vertical", value: "top", events: {change: function (d) {
            a.setLabelVerticalSelectedShape(d.target.value)
        }}}, vertical_middle: {name: "Middle", type: "radio", radio: "vertical", value: "middle", events: {change: function (d) {
            a.setLabelVerticalSelectedShape(d.target.value)
        }}}, vertical_bottom: {name: "Bottom", type: "radio", radio: "vertical", value: "bottom", events: {change: function (d) {
            a.setLabelVerticalSelectedShape(d.target.value)
        }}}}}, horizontal: {name: "Horizontal Align", items: {vertical_start: {name: "Left", type: "radio", radio: "horizontal", value: "start", events: {change: function (d) {
            a.setLabelHorizontalSelectedShape(d.target.value)
        }}}, horizontal_middle: {name: "Middle", type: "radio", radio: "horizontal", value: "middle", events: {change: function (d) {
            a.setLabelHorizontalSelectedShape(d.target.value)
        }}}, horizontal_end: {name: "Right", type: "radio", radio: "horizontal", value: "end", events: {change: function (d) {
            a.setLabelHorizontalSelectedShape(d.target.value)
        }}}}}, sep6_5: "---------", textRotate: {name: "Text Rotate", items: {textRotate_select: {name: "Select", type: "select", options: {"0": "0", "45": "45", "90": "90", "135": "135", "180": "180", "-45": "-45", "-90": "-90", "-135": "-135", "-180": "-180"}, selected: "0", events: {change: function (d) {
            a.setLabelAngleSelectedShape(d.target.value)
        }}}, sep6_6_1: "---------", textRotate_custom: {name: "Custom", type: "text", events: {keyup: function (d) {
            if (d.target.value !== "") {
                a.setLabelAngleSelectedShape(d.target.value)
            }
        }}}}}}}, sep7: "---------", label: {name: "Label", items: {label_shape: {name: "Cell Label", type: "text", events: {keyup: function (d) {
            a.setLabelSelectedShape(d.target.value)
        }}}, sep7_1: "---------", label_from: {name: "Edge From", type: "text", events: {keyup: function (d) {
            a.setEdgeFromLabelSelectedShape(d.target.value)
        }}}, label_to: {name: "Edge To", type: "text", events: {keyup: function (d) {
            a.setEdgeToLabelSelectedShape(d.target.value)
        }}}}}}}
    }})
}, selectShape: function (b) {
    var c = this, a;
    if ($(b.parentNode).attr("_shape") !== OG.Constants.SHAPE_TYPE.GROUP && c._isSelectable(b.shape)) {
        a = c._RENDERER.drawGuide(b);
        if (a) {
            c.setResizable(b, a, c._isResizable(b.shape));
            c._RENDERER.removeTerminal(b)
        }
    }
}, deleteSelectedShape: function () {
    var a = this;
    $(a._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=EDGE][_selected=true]").each(function (b, c) {
        if (c.id) {
            a._RENDERER.removeShape(c)
        }
    });
    $(a._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (b, c) {
        if (c.id) {
            a._RENDERER.removeShape(c)
        }
    })
}, selectAll: function () {
    var a = this;
    $(a._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "]").each(function (b, c) {
        a.selectShape(c)
    })
}, copySelectedShape: function () {
    var b = this, a = b._RENDERER.getRootGroup(), c = [];
    $(b._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (d, e) {
        c.push(e)
    });
    $(a).data("copied", c)
}, cutSelectedShape: function () {
    var a = this;
    a.copySelectedShape();
    a.deleteSelectedShape()
}, pasteSelectedShape: function () {
    var c = this, b = c._RENDERER.getRootGroup(), a = $(b).data("copied"), d = [];
    if (a) {
        $(c._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (e, f) {
            if (f.id) {
                c._RENDERER.removeGuide(f)
            }
        });
        $.each(a, function (e, h) {
            var j = h.shape.geom.getBoundary(), g, i, f;
            g = h.shape.clone();
            if ($(h).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
                if (h.shape.geom instanceof OG.geometry.BezierCurve) {
                    g.geom = new OG.BezierCurve(h.shape.geom.getControlPoints())
                } else {
                    g.geom = new OG.PolyLine(h.shape.geom.getVertices())
                }
                g.geom.style = h.shape.geom.style;
                g.geom.move(c._CONFIG.COPY_PASTE_PADDING, c._CONFIG.COPY_PASTE_PADDING);
                i = c._RENDERER.drawShape(null, g, null, h.shapeStyle)
            } else {
                i = c._RENDERER.drawShape([j.getCentroid().x + c._CONFIG.COPY_PASTE_PADDING, j.getCentroid().y + c._CONFIG.COPY_PASTE_PADDING], g, [j.getWidth(), j.getHeight()], h.shapeStyle)
            }
            i.data = h.data;
            f = c._RENDERER.drawGuide(i);
            c.setClickSelectable(i, c._isSelectable(i.shape));
            c.setMovable(i, c._isMovable(i.shape));
            c.setResizable(i, f, c._isResizable(i.shape));
            if (c._CONFIG.GROUP_DROPABLE && i.shape.GROUP_DROPABLE) {
                c.enableDragAndDropGroup(i)
            }
            if (c._CONFIG.GROUP_COLLAPSIBLE && i.shape.GROUP_COLLAPSIBLE) {
                c.enableCollapse(i)
            }
            if (c._isConnectable(i.shape)) {
                c.enableConnect(i)
            }
            if (c._isLabelEditable(i.shape)) {
                c.enableEditLabel(i)
            }
            c._copyChildren(h, i);
            d.push(i)
        });
        $(b).data("copied", d)
    }
}, duplicateSelectedShape: function () {
    var a = this;
    a.copySelectedShape();
    a.pasteSelectedShape()
}, groupSelectedShape: function () {
    var c = this, a, b = c._RENDERER.group($(c._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]"));
    if (b) {
        $(c._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (d, e) {
            c._RENDERER.removeGuide(e)
        });
        a = c._RENDERER.drawGuide(b);
        if (a) {
            c.setClickSelectable(b, c._isSelectable(b.shape));
            c.setMovable(b, c._isMovable(b.shape));
            c.setResizable(b, a, c._isResizable(b.shape));
            if (c._CONFIG.GROUP_DROPABLE && b.shape.GROUP_DROPABLE) {
                c.enableDragAndDropGroup(b)
            }
            c._RENDERER.removeAllTerminal();
            c._RENDERER.toFront(a.group)
        }
    }
}, ungroupSelectedShape: function () {
    var b = this, a, c = b._RENDERER.ungroup($(b._RENDERER.getRootElement()).find("[_shape=" + OG.Constants.SHAPE_TYPE.GROUP + "][_selected=true]"));
    $.each(c, function (d, e) {
        a = b._RENDERER.drawGuide(e);
        if (a) {
            b._RENDERER.removeAllTerminal();
            b._RENDERER.toFront(a.group)
        }
    })
}, rotateSelectedShape: function (c) {
    var b = this, a;
    $(b._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=" + OG.Constants.SHAPE_TYPE.EDGE + "][_selected=true]").each(function (d, e) {
        b._RENDERER.removeGuide(e)
    });
    $(b._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (d, e) {
        if (e.shape && e.shape.TYPE !== OG.Constants.SHAPE_TYPE.EDGE && e.shape.TYPE !== OG.Constants.SHAPE_TYPE.GROUP) {
            b._RENDERER.rotate(e, c);
            b._RENDERER.removeGuide(e);
            a = b._RENDERER.drawGuide(e);
            b.setResizable(e, a, b._isResizable(e.shape));
            b._RENDERER.toFront(a.group)
        }
    })
}, setLineWidthSelectedShape: function (a) {
    var b = this;
    $(b._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        b._RENDERER.setShapeStyle(d, {"stroke-width": a})
    })
}, setLineColorSelectedShape: function (b) {
    var a = this;
    $(a._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        a._RENDERER.setShapeStyle(d, {stroke: b})
    })
}, setLineTypeSelectedShape: function (c) {
    var b = this, a;
    $(b._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=" + OG.Constants.SHAPE_TYPE.EDGE + "][_selected=true]").each(function (d, e) {
        OG.Util.apply(e.shape.geom.style.map, {"edge-type": c});
        e.shapeStyle = e.shapeStyle || {};
        OG.Util.apply(e.shapeStyle, {"edge-type": c});
        b._RENDERER.redrawEdge(e);
        b._RENDERER.removeGuide(e);
        a = b._RENDERER.drawGuide(e);
        b.setResizable(e, a, b._isResizable(e.shape));
        b._RENDERER.toFront(a.group)
    })
}, setLineStyleSelectedShape: function (a) {
    var b = this;
    $(b._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        b._RENDERER.setShapeStyle(d, {"stroke-dasharray": a})
    })
}, setArrowStartSelectedShape: function (b) {
    var a = this;
    $(a._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        a._RENDERER.setShapeStyle(d, {"arrow-start": b + "-wide-long"})
    })
}, setArrowEndSelectedShape: function (b) {
    var a = this;
    $(a._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        a._RENDERER.setShapeStyle(d, {"arrow-end": b + "-wide-long"})
    })
}, setFillColorSelectedShape: function (b) {
    var a = this;
    $(a._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        a._RENDERER.setShapeStyle(d, {fill: b, "fill-opacity": 1})
    })
}, setFillOpacitySelectedShape: function (a) {
    var b = this;
    $(b._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        b._RENDERER.setShapeStyle(d, {"fill-opacity": a})
    })
}, setFontFamilySelectedShape: function (a) {
    var b = this;
    $(b._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        b._RENDERER.setShapeStyle(d, {"font-family": a})
    })
}, setFontSizeSelectedShape: function (b) {
    var a = this;
    $(a._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        a._RENDERER.setShapeStyle(d, {"font-size": b})
    })
}, setFontColorSelectedShape: function (b) {
    var a = this;
    $(a._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        a._RENDERER.setShapeStyle(d, {"font-color": b})
    })
}, setFontWeightSelectedShape: function (a) {
    var b = this;
    $(b._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        b._RENDERER.setShapeStyle(d, {"font-weight": a})
    })
}, setFontStyleSelectedShape: function (b) {
    var a = this;
    $(a._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        a._RENDERER.setShapeStyle(d, {"font-style": b})
    })
}, setTextDecorationSelectedShape: function (b) {
    var a = this;
    $(a._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        a._RENDERER.setShapeStyle(d, {"text-decoration": b})
    })
}, setLabelDirectionSelectedShape: function (b) {
    var a = this;
    $(a._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        a._RENDERER.setShapeStyle(d, {"label-direction": b})
    })
}, setLabelAngleSelectedShape: function (a) {
    var b = this;
    $(b._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        b._RENDERER.setShapeStyle(d, {"label-angle": a})
    })
}, setLabelPositionSelectedShape: function (b) {
    var a = this;
    $(a._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        if (b === "top") {
            a._RENDERER.setShapeStyle(d, {"label-position": b, "text-anchor": "middle", "vertical-align": "bottom"})
        } else {
            if (b === "bottom") {
                a._RENDERER.setShapeStyle(d, {"label-position": b, "text-anchor": "middle", "vertical-align": "top"})
            } else {
                if (b === "left") {
                    a._RENDERER.setShapeStyle(d, {"label-position": b, "text-anchor": "end", "vertical-align": "center"})
                } else {
                    if (b === "right") {
                        a._RENDERER.setShapeStyle(d, {"label-position": b, "text-anchor": "start", "vertical-align": "center"})
                    } else {
                        if (b === "center") {
                            a._RENDERER.setShapeStyle(d, {"label-position": b, "text-anchor": "middle", "vertical-align": "center"})
                        }
                    }
                }
            }
        }
    })
}, setLabelVerticalSelectedShape: function (b) {
    var a = this;
    $(a._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        a._RENDERER.setShapeStyle(d, {"vertical-align": b})
    })
}, setLabelHorizontalSelectedShape: function (a) {
    var b = this;
    $(b._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        b._RENDERER.setShapeStyle(d, {"text-anchor": a})
    })
}, setLabelSelectedShape: function (a) {
    var b = this;
    $(b._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (c, d) {
        b._RENDERER.drawLabel(d, a)
    })
}, setEdgeFromLabelSelectedShape: function (a) {
    var b = this;
    $(b._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=" + OG.Constants.SHAPE_TYPE.EDGE + "][_selected=true]").each(function (c, d) {
        b._RENDERER.drawEdgeLabel(d, a, "FROM")
    })
}, setEdgeToLabelSelectedShape: function (a) {
    var b = this;
    $(b._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=" + OG.Constants.SHAPE_TYPE.EDGE + "][_selected=true]").each(function (c, d) {
        b._RENDERER.drawEdgeLabel(d, a, "TO")
    })
}, zoomIn: function () {
    var a = this;
    if (a._CONFIG.SCALE + a._CONFIG.SCALE * 0.1 <= a._CONFIG.SCALE_MAX) {
        a._RENDERER.setScale(a._CONFIG.SCALE + a._CONFIG.SCALE * 0.1)
    }
}, zoomOut: function () {
    var a = this;
    if (a._CONFIG.SCALE - a._CONFIG.SCALE * 0.1 >= a._CONFIG.SCALE_MIN) {
        a._RENDERER.setScale(a._CONFIG.SCALE - a._CONFIG.SCALE * 0.1)
    }
}, fitWindow: function () {
    var b = this, a = b._RENDERER.getContainer();
    b._RENDERER.fitCanvasSize([a.clientWidth, a.clientHeight], true)
}, _isContainsConnectedShape: function (a, k) {
    var g = this, h, e, j, b, f = false, d = false, c;
    h = $(a).attr("_from");
    e = $(a).attr("_to");
    if (h) {
        j = g._getShapeFromTerminal(h)
    }
    if (e) {
        b = g._getShapeFromTerminal(e)
    }
    for (c = 0; c < k.length; c++) {
        if (j && k[c].id === j.id) {
            f = true
        }
        if (b && k[c].id === b.id) {
            d = true
        }
    }
    return{none: !f && !d, all: f && d, any: f || d, either: (f && !d) || (!f && d), attrEither: (h && !e) || (!h && e)}
}, _getShapeFromTerminal: function (a) {
    var c = this, b = OG.Util.isElement(a) ? a.id : a;
    return c._RENDERER.getElementById(b.substring(0, b.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP)))
}, _getOffset: function (c) {
    var b = this, a = b._RENDERER.getContainer();
    return{x: (c.pageX - $(a).offset().left + a.scrollLeft) / b._CONFIG.SCALE, y: (c.pageY - $(a).offset().top + a.scrollTop) / b._CONFIG.SCALE}
}, _getMoveTargets: function () {
    var c = this, d = [], b, a = [];
    $(c._RENDERER.getRootElement()).find("[id$=" + OG.Constants.GUIDE_SUFFIX.BBOX + "]").each(function (e, f) {
        if (f.id) {
            b = c._RENDERER.clone(f);
            c._RENDERER.setAttr(b, c._CONFIG.DEFAULT_STYLE.GUIDE_SHADOW);
            d.push({id: f.id.replace(OG.Constants.GUIDE_SUFFIX.BBOX, ""), box: b})
        }
    });
    $.each(d, function (f, g) {
        var h = c._RENDERER.getElementById(g.id), e;
        if ($(h).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
            e = c._isContainsConnectedShape(h, d);
            if (e.all || e.none || (e.either && e.attrEither)) {
                a.push(g)
            } else {
                c._RENDERER.remove(g.box);
                c._RENDERER.removeGuide(h)
            }
        }
    });
    $.each(d, function (e, f) {
        var g = c._RENDERER.getElementById(f.id);
        if ($(g).attr("_shape") !== OG.Constants.SHAPE_TYPE.EDGE) {
            a.push(f)
        }
    });
    return a
}, _moveElements: function (f, b, a) {
    var c = this, e = [], d = [];
    $.each(f, function (g, h) {
        var i = c._RENDERER.getElementById(h.id);
        if ($(i).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
            e.push(h.id)
        }
    });
    $.each(f, function (g, h) {
        var i = c._RENDERER.getElementById(h.id);
        c._RENDERER.remove(h.box);
        c._RENDERER.move(i, [b, a], e);
        c._RENDERER.drawGuide(i);
        if ($(i).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
            if (c._isContainsConnectedShape(i, f).none) {
                c._RENDERER.disconnect(i)
            }
        }
        d.push(i)
    });
    return d
}, _autoExtend: function (c, b) {
    var d = this, a = d._RENDERER.getRootBBox();
    if (d._CONFIG.AUTO_EXTENSIONAL && a.width < c * d._CONFIG.SCALE) {
        d._RENDERER.setCanvasSize([a.width + d._CONFIG.AUTO_EXTENSION_SIZE, a.height])
    }
    if (d._CONFIG.AUTO_EXTENSIONAL && a.height < b * d._CONFIG.SCALE) {
        d._RENDERER.setCanvasSize([a.width, a.height + d._CONFIG.AUTO_EXTENSION_SIZE])
    }
}, _copyChildren: function (b, d) {
    var c = this, a = b.childNodes;
    $.each(a, function (e, h) {
        if ($(h).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
            var j = h.shape.geom.getBoundary(), g, i, f;
            g = h.shape.clone();
            if ($(h).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
                g.geom = new OG.PolyLine(h.shape.geom.getVertices());
                g.geom.style = h.shape.geom.style;
                g.geom.move(c._CONFIG.COPY_PASTE_PADDING, c._CONFIG.COPY_PASTE_PADDING);
                i = c._RENDERER.drawShape(null, g, null, h.shapeStyle)
            } else {
                i = c._RENDERER.drawShape([j.getCentroid().x + c._CONFIG.COPY_PASTE_PADDING, j.getCentroid().y + c._CONFIG.COPY_PASTE_PADDING], g, [j.getWidth(), j.getHeight()], h.shapeStyle)
            }
            i.data = h.data;
            d.appendChild(i);
            c.setClickSelectable(i, c._isSelectable(i.shape));
            c.setMovable(i, c._isMovable(i.shape));
            if (c._CONFIG.GROUP_DROPABLE && i.shape.GROUP_DROPABLE) {
                c.enableDragAndDropGroup(i)
            }
            if (c._CONFIG.GROUP_COLLAPSIBLE && i.shape.GROUP_COLLAPSIBLE) {
                c.enableCollapse(i)
            }
            if (c._isConnectable(i.shape)) {
                c.enableConnect(i)
            }
            if (c._isLabelEditable(i.shape)) {
                c.enableEditLabel(i)
            }
            if (h.childNodes.length > 0) {
                c._copyChildren(h, i)
            }
        }
    })
}, _deselectChildren: function (b) {
    var c = this, a = b.childNodes;
    $.each(a, function (d, e) {
        if ($(e).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
            if (e.childNodes.length > 0) {
                c._deselectChildren(e)
            }
            if ($(e).attr("_selected") === "true") {
                c._RENDERER.removeGuide(e);
                $(e).draggable("destroy")
            }
        }
    })
}, _isParentSelected: function (b) {
    var c = this, a = b.parentNode;
    if (a) {
        if (c._isParentSelected(a)) {
            return true
        }
        if ($(a).attr("_type") === OG.Constants.NODE_TYPE.SHAPE && $(a).attr("_selected") === "true") {
            return true
        }
    }
    return false
}, _num: function (a) {
    return parseInt(a, 10)
}, _grid: function (b) {
    var a = this;
    return a._CONFIG.DRAG_GRIDABLE ? OG.Util.roundGrid(b, a._CONFIG.MOVE_SNAP_SIZE) : b
}, _isSelectable: function (a) {
    var b = this;
    return b._CONFIG.SELECTABLE && a.SELECTABLE
}, _isConnectable: function (a) {
    var b = this;
    return b._CONFIG.CONNECTABLE && a.CONNECTABLE
}, _isSelfConnectable: function (a) {
    var b = this;
    return b._CONFIG.SELF_CONNECTABLE && a.SELF_CONNECTABLE
}, _isConnectCloneable: function (a) {
    var b = this;
    return b._CONFIG.CONNECT_CLONEABLE && a.CONNECT_CLONEABLE
}, _isConnectRequired: function (a) {
    var b = this;
    return b._CONFIG.CONNECT_REQUIRED && a.CONNECT_REQUIRED
}, _isMovable: function (a) {
    var b = this;
    return(b._CONFIG.SELECTABLE && a.SELECTABLE) && (b._CONFIG.MOVABLE && b._CONFIG.MOVABLE_[a.TYPE] && a.MOVABLE)
}, _isResizable: function (a) {
    var b = this;
    return(b._CONFIG.SELECTABLE && a.SELECTABLE) && (b._CONFIG.RESIZABLE && b._CONFIG.RESIZABLE_[a.TYPE] && a.RESIZABLE)
}, _isLabelEditable: function (a) {
    var b = this;
    return b._CONFIG.LABEL_EDITABLE && b._CONFIG.LABEL_EDITABLE_[a.TYPE] && a.LABEL_EDITABLE
}};
OG.handler.EventHandler.prototype.constructor = OG.handler.EventHandler;
OG.EventHandler = OG.handler.EventHandler;
OG.graph.Canvas = function (a, d, b, c) {
    this._CONFIG = {SELECTABLE: true, DRAG_SELECTABLE: true, MOVABLE: true, MOVABLE_: {GEOM: true, TEXT: true, HTML: true, IMAGE: true, EDGE: true, GROUP: true}, RESIZABLE: true, RESIZABLE_: {GEOM: true, TEXT: true, HTML: true, IMAGE: true, EDGE: true, GROUP: true}, CONNECTABLE: true, SELF_CONNECTABLE: true, CONNECT_CLONEABLE: true, CONNECT_REQUIRED: true, LABEL_EDITABLE: true, LABEL_EDITABLE_: {GEOM: true, TEXT: true, HTML: true, IMAGE: true, EDGE: true, GROUP: true}, GROUP_DROPABLE: true, GROUP_COLLAPSIBLE: true, DRAG_GRIDABLE: true, ENABLE_HOTKEY: true, ENABLE_HOTKEY_DELETE: true, ENABLE_HOTKEY_CTRL_A: true, ENABLE_HOTKEY_CTRL_C: true, ENABLE_HOTKEY_CTRL_V: true, ENABLE_HOTKEY_CTRL_D: true, ENABLE_HOTKEY_CTRL_G: true, ENABLE_HOTKEY_CTRL_U: true, ENABLE_HOTKEY_ARROW: true, ENABLE_HOTKEY_SHIFT_ARROW: true, ENABLE_CONTEXTMENU: true, SCALE: 1, SCALE_MIN: 0.1, SCALE_MAX: 10, EDGE_PADDING: 20, LABEL_PADDING: 5, LABEL_EDITOR_WIDTH: 70, LABEL_EDITOR_HEIGHT: 16, FROMTO_LABEL_OFFSET_TOP: 15, GUIDE_RECT_SIZE: 8, GUIDE_MIN_SIZE: 18, COLLAPSE_SIZE: 10, MOVE_SNAP_SIZE: 5, TERMINAL_SIZE: 3, COPY_PASTE_PADDING: 20, FIT_CANVAS_PADDING: 20, AUTO_EXTENSIONAL: true, AUTO_EXTENSION_SIZE: 100, CANVAS_BACKGROUND: "#f9f9f9", DEFAULT_STYLE: {SHAPE: {cursor: "default"}, GEOM: {stroke: "black", fill: "white", "fill-opacity": 0, "label-position": "center"}, TEXT: {stroke: "none", "text-anchor": "middle"}, HTML: {"label-position": "bottom", "text-anchor": "middle", "vertical-align": "top"}, IMAGE: {"label-position": "bottom", "text-anchor": "middle", "vertical-align": "top"}, EDGE: {stroke: "black", fill: "none", "fill-opacity": 0, "stroke-width": 1, "stroke-opacity": 1, "edge-type": "plain", "edge-direction": "c c", "arrow-start": "none", "arrow-end": "classic-wide-long", "stroke-dasharray": "", "label-position": "center"}, EDGE_SHADOW: {stroke: "#00FF00", fill: "none", "fill-opacity": 0, "stroke-width": 1, "stroke-opacity": 1, "arrow-start": "none", "arrow-end": "none", "stroke-dasharray": "- "}, EDGE_HIDDEN: {stroke: "white", fill: "none", "fill-opacity": 0, "stroke-width": 5, "stroke-opacity": 0}, GROUP: {stroke: "none", fill: "white", "fill-opacity": 0, "label-position": "bottom", "text-anchor": "middle", "vertical-align": "top"}, GUIDE_BBOX: {stroke: "#00FF00", fill: "none", "stroke-dasharray": "- ", "shape-rendering": "crispEdges"}, GUIDE_UL: {stroke: "black", fill: "#00FF00", cursor: "nwse-resize", "shape-rendering": "crispEdges"}, GUIDE_UR: {stroke: "black", fill: "#00FF00", cursor: "nesw-resize", "shape-rendering": "crispEdges"}, GUIDE_LL: {stroke: "black", fill: "#00FF00", cursor: "nesw-resize", "shape-rendering": "crispEdges"}, GUIDE_LR: {stroke: "black", fill: "#00FF00", cursor: "nwse-resize", "shape-rendering": "crispEdges"}, GUIDE_LC: {stroke: "black", fill: "#00FF00", cursor: "ew-resize", "shape-rendering": "crispEdges"}, GUIDE_UC: {stroke: "black", fill: "#00FF00", cursor: "ns-resize", "shape-rendering": "crispEdges"}, GUIDE_RC: {stroke: "black", fill: "#00FF00", cursor: "ew-resize", "shape-rendering": "crispEdges"}, GUIDE_LWC: {stroke: "black", fill: "#00FF00", cursor: "ns-resize", "shape-rendering": "crispEdges"}, GUIDE_FROM: {stroke: "black", fill: "#00FF00", cursor: "move", "shape-rendering": "crispEdges"}, GUIDE_TO: {stroke: "black", fill: "#00FF00", cursor: "move", "shape-rendering": "crispEdges"}, GUIDE_CTL_H: {stroke: "black", fill: "#00FF00", cursor: "ew-resize", "shape-rendering": "crispEdges"}, GUIDE_CTL_V: {stroke: "black", fill: "#00FF00", cursor: "ns-resize", "shape-rendering": "crispEdges"}, GUIDE_SHADOW: {stroke: "black", fill: "none", "stroke-dasharray": "- ", "shape-rendering": "crispEdges"}, RUBBER_BAND: {stroke: "#0000FF", opacity: 0.2, fill: "#0077FF"}, TERMINAL: {stroke: "#808080", "stroke-width": 1, fill: "r(0.5, 0.5)#FFFFFF-#808080", "fill-opacity": 0.5, cursor: "pointer"}, TERMINAL_OVER: {stroke: "#0077FF", "stroke-width": 4, fill: "r(0.5, 0.5)#FFFFFF-#0077FF", "fill-opacity": 1, cursor: "pointer"}, TERMINAL_BBOX: {stroke: "none", fill: "white", "fill-opacity": 0}, DROP_OVER_BBOX: {stroke: "#0077FF", fill: "none", opacity: 0.6, "shape-rendering": "crispEdges"}, LABEL: {"font-size": 12, "font-color": "black"}, LABEL_EDITOR: {position: "absolute", overflow: "visible", resize: "none", "text-align": "center", display: "block", padding: 0}, COLLAPSE: {stroke: "black", fill: "white", "fill-opacity": 0, cursor: "pointer", "shape-rendering": "crispEdges"}, COLLAPSE_BBOX: {stroke: "none", fill: "white", "fill-opacity": 0}}};
    this._RENDERER = a ? new OG.RaphaelRenderer(a, d, b, c, this._CONFIG) : null;
    this._HANDLER = new OG.EventHandler(this._RENDERER, this._CONFIG);
    this._CONTAINER = OG.Util.isElement(a) ? a : document.getElementById(a)
};
OG.graph.Canvas.prototype = {initConfig: function (a) {
    if (a) {
        this._CONFIG.SELECTABLE = a.selectable === undefined ? this._CONFIG.SELECTABLE : a.selectable;
        this._CONFIG.DRAG_SELECTABLE = a.dragSelectable === undefined ? this._CONFIG.DRAG_SELECTABLE : a.dragSelectable;
        this._CONFIG.MOVABLE = a.movable === undefined ? this._CONFIG.MOVABLE : a.movable;
        this._CONFIG.RESIZABLE = a.resizable === undefined ? this._CONFIG.RESIZABLE : a.resizable;
        this._CONFIG.CONNECTABLE = a.connectable === undefined ? this._CONFIG.CONNECTABLE : a.connectable;
        this._CONFIG.SELF_CONNECTABLE = a.selfConnectable === undefined ? this._CONFIG.SELF_CONNECTABLE : a.selfConnectable;
        this._CONFIG.CONNECT_CLONEABLE = a.connectCloneable === undefined ? this._CONFIG.CONNECT_CLONEABLE : a.connectCloneable;
        this._CONFIG.CONNECT_REQUIRED = a.connectRequired === undefined ? this._CONFIG.CONNECT_REQUIRED : a.connectRequired;
        this._CONFIG.LABEL_EDITABLE = a.labelEditable === undefined ? this._CONFIG.LABEL_EDITABLE : a.labelEditable;
        this._CONFIG.GROUP_DROPABLE = a.groupDropable === undefined ? this._CONFIG.GROUP_DROPABLE : a.groupDropable;
        this._CONFIG.GROUP_COLLAPSIBLE = a.collapsible === undefined ? this._CONFIG.GROUP_COLLAPSIBLE : a.collapsible;
        this._CONFIG.ENABLE_HOTKEY = a.enableHotKey === undefined ? this._CONFIG.ENABLE_HOTKEY : a.enableHotKey;
        this._CONFIG.ENABLE_CONTEXTMENU = a.enableContextMenu === undefined ? this._CONFIG.ENABLE_CONTEXTMENU : a.enableContextMenu
    }
    this._HANDLER.setDragSelectable(this._CONFIG.SELECTABLE && this._CONFIG.DRAG_SELECTABLE);
    this._HANDLER.setEnableHotKey(this._CONFIG.ENABLE_HOTKEY);
    if (this._CONFIG.ENABLE_CONTEXTMENU) {
        this._HANDLER.enableRootContextMenu();
        this._HANDLER.enableShapeContextMenu()
    }
    this.CONFIG_INITIALIZED = true
}, getRenderer: function () {
    return this._RENDERER
}, getContainer: function () {
    return this._CONTAINER
}, getEventHandler: function () {
    return this._HANDLER
}, drawShape: function (a, b, e, f, h, g, c) {
    if (this._CONFIG.DRAG_GRIDABLE && (!OG.Util.isDefined(c) || c === true)) {
        if (a) {
            a[0] = OG.Util.roundGrid(a[0], this._CONFIG.MOVE_SNAP_SIZE);
            a[1] = OG.Util.roundGrid(a[1], this._CONFIG.MOVE_SNAP_SIZE)
        }
        if (e) {
            e[0] = OG.Util.roundGrid(e[0], this._CONFIG.MOVE_SNAP_SIZE * 2);
            e[1] = OG.Util.roundGrid(e[1], this._CONFIG.MOVE_SNAP_SIZE * 2)
        }
    }
    var d = this._RENDERER.drawShape(a, b, e, f, h);
    if (a && (b.TYPE === OG.Constants.SHAPE_TYPE.EDGE)) {
        d = this._RENDERER.move(d, a)
    }
    if (g && this._RENDERER.getElementById(g)) {
        this._RENDERER.appendChild(d, g)
    }
    if (!this.CONFIG_INITIALIZED) {
        this.initConfig()
    }
    this._HANDLER.setClickSelectable(d, this._HANDLER._isSelectable(d.shape));
    this._HANDLER.setMovable(d, this._HANDLER._isMovable(d.shape));
    if (this._HANDLER._isConnectable(d.shape)) {
        this._HANDLER.enableConnect(d)
    }
    if (this._HANDLER._isLabelEditable(d.shape)) {
        this._HANDLER.enableEditLabel(d)
    }
    if (this._CONFIG.GROUP_DROPABLE && d.shape.GROUP_DROPABLE) {
        this._HANDLER.enableDragAndDropGroup(d)
    }
    if (this._CONFIG.GROUP_COLLAPSIBLE && d.shape.GROUP_COLLAPSIBLE) {
        this._HANDLER.enableCollapse(d)
    }
    return d
}, setShapeStyle: function (a, b) {
    this._RENDERER.setShapeStyle(a, b)
}, drawLabel: function (a, c, b) {
    return this._RENDERER.drawLabel(a, c, b)
}, redrawConnectedEdge: function (a, b) {
    this._RENDERER.redrawConnectedEdge(a, b)
}, connect: function (h, d, a, j) {
    var k, f, g, l, e, c, b;
    k = this._RENDERER.drawTerminal(h, OG.Constants.TERMINAL_TYPE.OUT);
    f = k.terminal.childNodes;
    g = f[0];
    for (e = 0; e < f.length; e++) {
        if (f[e].terminal && f[e].terminal.direction.toLowerCase() === "c") {
            g = f[e];
            break
        }
    }
    this._RENDERER.removeTerminal(h);
    k = this._RENDERER.drawTerminal(d, OG.Constants.TERMINAL_TYPE.IN);
    f = k.terminal.childNodes;
    l = f[0];
    for (e = 0; e < f.length; e++) {
        if (f[e].terminal && f[e].terminal.direction.toLowerCase() === "c") {
            l = f[e];
            break
        }
    }
    this._RENDERER.removeTerminal(d);
    c = this._RENDERER.drawShape(null, new OG.EdgeShape(g.terminal.position, l.terminal.position));
    c = this._RENDERER.connect(g, l, c, a, j);
    if (c) {
        b = this._RENDERER.drawGuide(c);
        if (c && b) {
            this._HANDLER.setClickSelectable(c, c.shape.SELECTABLE);
            this._HANDLER.setMovable(c, c.shape.SELECTABLE && c.shape.MOVABLE);
            this._HANDLER.setResizable(c, b, c.shape.SELECTABLE && c.shape.RESIZABLE);
            if (c.shape.LABEL_EDITABLE) {
                this._HANDLER.enableEditLabel(c)
            }
            this._RENDERER.toFront(b.group)
        }
    }
    return c
}, disconnect: function (a) {
    this._RENDERER.disconnect(a)
}, group: function (a) {
    var b = this._RENDERER.group(a);
    this._HANDLER.setClickSelectable(b, b.shape.SELECTABLE);
    this._HANDLER.setMovable(b, b.shape.SELECTABLE && b.shape.MOVABLE);
    if (b.shape.LABEL_EDITABLE) {
        this._HANDLER.enableEditLabel(b)
    }
    return b
}, ungroup: function (a) {
    return this._RENDERER.ungroup(a)
}, addToGroup: function (a, b) {
    this._RENDERER.addToGroup(a, b)
}, collapse: function (a) {
    this._RENDERERDERER.collapse(a)
}, expand: function (a) {
    this._RENDERER.expand(a)
}, clear: function () {
    this._RENDERER.clear()
}, removeShape: function (a) {
    this._RENDERER.removeShape(a)
}, removeChild: function (a) {
    this._RENDERER.removeChild(a)
}, removeGuide: function (a) {
    this._RENDERER.removeGuide(a)
}, removeAllGuide: function () {
    this._RENDERER.removeAllGuide()
}, getRootElement: function () {
    return this._RENDERER.getRootElement()
}, getRootGroup: function () {
    return this._RENDERER.getRootGroup()
}, getElementByPoint: function (a) {
    return this._RENDERER.getElementByPoint(a)
}, getElementsByBBox: function (a) {
    return this._RENDERER.getElementsByBBox(a)
}, setAttr: function (a, b) {
    this._RENDERER.setAttr(a, b)
}, getAttr: function (b, a) {
    return this._RENDERER.getAttr(b, a)
}, toFront: function (a) {
    this._RENDERER.toFront(a)
}, toBack: function (a) {
    this._RENDERER.toBack(a)
}, getCanvasSize: function () {
    this._RENDERER.getCanvasSize()
}, setCanvasSize: function (a) {
    this._RENDERER.setCanvasSize(a)
}, fitCanvasSize: function (b, a) {
    this._RENDERER.fitCanvasSize(b, a)
}, setViewBox: function (a, b, c) {
    this._RENDERER.setViewBox(a, b, c)
}, getScale: function () {
    return this._RENDERER.getScale()
}, setScale: function (a) {
    this._RENDERER.setScale(a)
}, show: function (a) {
    this._RENDERER.show(a)
}, hide: function (a) {
    this._RENDERER.hide(a)
}, appendChild: function (a, b) {
    return this._RENDERER.appendChild(a, b)
}, insertAfter: function (a, b) {
    return this._RENDERER.insertAfter(a, b)
}, insertBefore: function (a, b) {
    return this._RENDERER.insertBefore(a, b)
}, move: function (a, c, b) {
    return this._RENDERER.move(a, c, b)
}, moveCentroid: function (b, a, c) {
    return this._RENDERER.moveCentroid(b, a, c)
}, rotate: function (a, c, b) {
    return this._RENDERER.rotate(a, c, b)
}, resize: function (a, c, b) {
    return this._RENDERER.resize(a, c, b)
}, resizeBox: function (b, a) {
    return this._RENDERER.resizeBox(b, a)
}, clone: function (a) {
    return this._RENDERER.clone(a)
}, getElementById: function (a) {
    return this._RENDERER.getElementById(a)
}, getElementsByType: function (b, a) {
    return this._RENDERER.getElementsByType(b, a)
}, getElementsByShapeId: function (b) {
    var a = this.getRootGroup();
    return $(a).find("[_type=SHAPE][_shape_id='" + b + "']")
}, getRelatedElementsFromEdge: function (b) {
    var d = this, c = OG.Util.isElement(b) ? b : this.getElementById(b), a = function (e) {
        var f = OG.Util.isElement(e) ? e.id : e;
        if (f) {
            return d._RENDERER.getElementById(f.substring(0, f.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP)))
        } else {
            return null
        }
    };
    if ($(c).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
        return{from: a($(b).attr("_from")), to: a($(b).attr("_to"))}
    } else {
        return{from: null, to: null}
    }
}, getBBox: function (a) {
    return this._RENDERER.getBBox(a)
}, getRootBBox: function () {
    return this._RENDERER.getRootBBox()
}, getRealRootBBox: function () {
    return this._RENDERER.getRealRootBBox()
}, isSVG: function () {
    return this._RENDERER.isSVG()
}, isVML: function () {
    return this._RENDERER.isVML()
}, setCustomData: function (b, c) {
    var a = OG.Util.isElement(b) ? b : document.getElementById(b);
    a.data = c
}, getCustomData: function (b) {
    var a = OG.Util.isElement(b) ? b : document.getElementById(b);
    return a.data
}, toXML: function () {
    return OG.Util.jsonToXml(this.toJSON())
}, toJSON: function () {
    var a = this, b = this._RENDERER.getRootBBox(), c = this._RENDERER.getRootGroup(), e = {opengraph: {"@width": b.width, "@height": b.height, cell: []}}, d;
    d = function (g, f) {
        $(g).children("[_type=SHAPE]").each(function (q, s) {
            var k = s.shape, h = s.shapeStyle, m = k.geom, l = m.getBoundary(), r = {}, j, p, o, i, n;
            r["@id"] = $(s).attr("id");
            if (!f) {
                r["@parent"] = $(g).attr("id")
            }
            r["@shapeType"] = k.TYPE;
            r["@shapeId"] = k.SHAPE_ID;
            r["@x"] = l.getCentroid().x;
            r["@y"] = l.getCentroid().y;
            r["@width"] = l.getWidth();
            r["@height"] = l.getHeight();
            if (h) {
                r["@style"] = escape(OG.JSON.encode(h))
            }
            if (k.TYPE === OG.Constants.SHAPE_TYPE.EDGE) {
                if ($(s).attr("_from")) {
                    r["@from"] = $(s).attr("_from")
                }
                if ($(s).attr("_to")) {
                    r["@to"] = $(s).attr("_to")
                }
            } else {
                i = a.getPrevShapeIds(s);
                n = a.getNextShapeIds(s);
                if (i.length > 0) {
                    r["@from"] = i.toString()
                }
                if (n.length > 0) {
                    r["@to"] = n.toString()
                }
            }
            if ($(s).attr("_fromedge")) {
                r["@fromEdge"] = $(s).attr("_fromedge")
            }
            if ($(s).attr("_toedge")) {
                r["@toEdge"] = $(s).attr("_toedge")
            }
            if (k.label) {
                r["@label"] = escape(k.label)
            }
            if (k.fromLabel) {
                r["@fromLabel"] = escape(k.fromLabel)
            }
            if (k.toLabel) {
                r["@toLabel"] = escape(k.toLabel)
            }
            if (k.angle && k.angle !== 0) {
                r["@angle"] = k.angle
            }
            if (k instanceof OG.shape.ImageShape) {
                r["@value"] = k.image
            } else {
                if (k instanceof OG.shape.HtmlShape) {
                    r["@value"] = escape(k.html)
                } else {
                    if (k instanceof OG.shape.TextShape) {
                        r["@value"] = escape(k.text)
                    } else {
                        if (k instanceof OG.shape.EdgeShape) {
                            j = m.getVertices();
                            p = j[0];
                            o = j[j.length - 1];
                            r["@value"] = p + "," + o
                        }
                    }
                }
            }
            if (m) {
                r["@geom"] = escape(m.toString())
            }
            if (s.data) {
                r["@data"] = escape(OG.JSON.encode(s.data))
            }
            e.opengraph.cell.push(r);
            d(s, false)
        })
    };
    if (c.data) {
        e.opengraph["@data"] = escape(OG.JSON.encode(c.data))
    }
    d(c, true);
    return e
}, loadXML: function (a) {
    if (!OG.Util.isElement(a)) {
        a = OG.Util.parseXML(a)
    }
    return this.loadJSON(OG.Util.xmlToJson(a))
}, loadJSON: function (json) {
    var canvasWidth, canvasHeight, rootGroup, minX = Number.MAX_VALUE, minY = Number.MAX_VALUE, maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE, i, cell, shape, id, parent, shapeType, shapeId, x, y, width, height, style, geom, from, to, fromEdge, toEdge, label, fromLabel, toLabel, angle, value, data, element;
    this._RENDERER.clear();
    if (json && json.opengraph && json.opengraph.cell && OG.Util.isArray(json.opengraph.cell)) {
        canvasWidth = json.opengraph["@width"];
        canvasHeight = json.opengraph["@height"];
        data = json.opengraph["@data"];
        if (data) {
            rootGroup = this.getRootGroup();
            rootGroup.data = OG.JSON.decode(unescape(data))
        }
        cell = json.opengraph.cell;
        for (i = 0; i < cell.length; i++) {
            id = cell[i]["@id"];
            parent = cell[i]["@parent"];
            shapeType = cell[i]["@shapeType"];
            shapeId = cell[i]["@shapeId"];
            x = parseInt(cell[i]["@x"], 10);
            y = parseInt(cell[i]["@y"], 10);
            width = parseInt(cell[i]["@width"], 10);
            height = parseInt(cell[i]["@height"], 10);
            style = unescape(cell[i]["@style"]);
            geom = unescape(cell[i]["@geom"]);
            from = cell[i]["@from"];
            to = cell[i]["@to"];
            fromEdge = cell[i]["@fromEdge"];
            toEdge = cell[i]["@toEdge"];
            label = cell[i]["@label"];
            fromLabel = cell[i]["@fromLabel"];
            toLabel = cell[i]["@toLabel"];
            angle = cell[i]["@angle"];
            value = cell[i]["@value"];
            data = cell[i]["@data"];
            label = label ? unescape(label) : label;
            minX = (minX > (x - width / 2)) ? (x - width / 2) : minX;
            minY = (minY > (y - height / 2)) ? (y - height / 2) : minY;
            maxX = (maxX < (x + width / 2)) ? (x + width / 2) : maxX;
            maxY = (maxY < (y + height / 2)) ? (y + height / 2) : maxY;
            switch (shapeType) {
                case OG.Constants.SHAPE_TYPE.GEOM:
                case OG.Constants.SHAPE_TYPE.GROUP:
                    shape = eval("new " + shapeId + "()");
                    if (label) {
                        shape.label = label
                    }
                    element = this.drawShape([x, y], shape, [width, height], OG.JSON.decode(style), id, parent, false);
                    break;
                case OG.Constants.SHAPE_TYPE.EDGE:
                    shape = eval("new " + shapeId + "(" + value + ")");
                    if (label) {
                        shape.label = label
                    }
                    if (fromLabel) {
                        shape.fromLabel = unescape(fromLabel)
                    }
                    if (toLabel) {
                        shape.toLabel = unescape(toLabel)
                    }
                    if (geom) {
                        geom = OG.JSON.decode(geom);
                        if (geom.type === OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.POLYLINE]) {
                            geom = new OG.geometry.PolyLine(geom.vertices);
                            shape.geom = geom
                        } else {
                            if (geom.type === OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.CURVE]) {
                                geom = new OG.geometry.Curve(geom.controlPoints);
                                shape.geom = geom
                            }
                        }
                    }
                    element = this.drawShape(null, shape, null, OG.JSON.decode(style), id, parent, false);
                    break;
                case OG.Constants.SHAPE_TYPE.HTML:
                    shape = eval("new " + shapeId + "()");
                    if (value) {
                        shape.html = unescape(value)
                    }
                    if (label) {
                        shape.label = label
                    }
                    element = this.drawShape([x, y], shape, [width, height, angle], OG.JSON.decode(style), id, parent, false);
                    break;
                case OG.Constants.SHAPE_TYPE.IMAGE:
                    shape = eval("new " + shapeId + "('" + value + "')");
                    if (label) {
                        shape.label = label
                    }
                    element = this.drawShape([x, y], shape, [width, height, angle], OG.JSON.decode(style), id, parent, false);
                    break;
                case OG.Constants.SHAPE_TYPE.TEXT:
                    shape = eval("new " + shapeId + "()");
                    if (value) {
                        shape.text = unescape(value)
                    }
                    element = this.drawShape([x, y], shape, [width, height, angle], OG.JSON.decode(style), id, parent, false);
                    break
            }
            if (from) {
                $(element).attr("_from", from)
            }
            if (to) {
                $(element).attr("_to", to)
            }
            if (fromEdge) {
                $(element).attr("_fromedge", fromEdge)
            }
            if (toEdge) {
                $(element).attr("_toedge", toEdge)
            }
            if (data) {
                element.data = OG.JSON.decode(unescape(data))
            }
        }
        this.setCanvasSize([canvasWidth, canvasHeight]);
        return{width: maxX - minX, height: maxY - minY, x: minX, y: minY, x2: maxX, y2: maxY}
    }
    return{width: 0, height: 0, x: 0, y: 0, x2: 0, y2: 0}
}, getPrevEdges: function (a) {
    return this._RENDERER.getPrevEdges(a)
}, getNextEdges: function (a) {
    return this._RENDERER.getNextEdges(a)
}, getPrevShapes: function (a) {
    return this._RENDERER.getPrevShapes(a)
}, getPrevShapeIds: function (a) {
    return this._RENDERER.getPrevShapeIds(a)
}, getNextShapes: function (a) {
    return this._RENDERER.getNextShapes(a)
}, getNextShapeIds: function (a) {
    return this._RENDERER.getNextShapeIds(a)
}, onDrawShape: function (a) {
    $(this.getRootElement()).bind("drawShape", function (c, b) {
        a(c, b)
    })
}, onDrawLabel: function (a) {
    $(this.getRootElement()).bind("drawLabel", function (d, b, c) {
        a(d, b, c)
    })
}, onLabelChanged: function (a) {
    $(this.getRootElement()).bind("labelChanged", function (e, c, b, d) {
        a(e, c, b, d)
    })
}, onBeforeLabelChange: function (a) {
    $(this.getRootElement()).bind("beforeLabelChange", function (b) {
        if (a(b, b.element, b.afterText, b.beforeText) === false) {
            b.stopPropagation()
        }
    })
}, onRedrawShape: function (a) {
    $(this.getRootElement()).bind("redrawShape", function (c, b) {
        a(c, b)
    })
}, onRemoveShape: function (a) {
    $(this.getRootElement()).bind("removeShape", function (c, b) {
        a(c, b)
    })
}, onRotateShape: function (a) {
    $(this.getRootElement()).bind("rotateShape", function (c, b, d) {
        a(c, b, d)
    })
}, onMoveShape: function (a) {
    $(this.getRootElement()).bind("moveShape", function (c, b, d) {
        a(c, b, d)
    })
}, onResizeShape: function (a) {
    $(this.getRootElement()).bind("resizeShape", function (c, b, d) {
        a(c, b, d)
    })
}, onBeforeConnectShape: function (a) {
    $(this.getRootElement()).bind("beforeConnectShape", function (b) {
        if (a(b, b.edge, b.fromShape, b.toShape) === false) {
            b.stopPropagation()
        }
    })
}, onBeforeRemoveShape: function (a) {
    $(this.getRootElement()).bind("beforeRemoveShape", function (b) {
        if (a(b, b.element) === false) {
            b.stopPropagation()
        }
    })
}, onConnectShape: function (a) {
    $(this.getRootElement()).bind("connectShape", function (d, c, e, b) {
        a(d, c, e, b)
    })
}, onDisconnectShape: function (a) {
    $(this.getRootElement()).bind("disconnectShape", function (d, c, e, b) {
        a(d, c, e, b)
    })
}, onGroup: function (a) {
    $(this.getRootElement()).bind("group", function (c, b) {
        a(c, b)
    })
}, onUnGroup: function (a) {
    $(this.getRootElement()).bind("ungroup", function (b, c) {
        a(b, c)
    })
}, onCollapsed: function (a) {
    $(this.getRootElement()).bind("collapsed", function (c, b) {
        a(c, b)
    })
}, onExpanded: function (a) {
    $(this.getRootElement()).bind("expanded", function (c, b) {
        a(c, b)
    })
}};
OG.graph.Canvas.prototype.constructor = OG.graph.Canvas;
OG.Canvas = OG.graph.Canvas;
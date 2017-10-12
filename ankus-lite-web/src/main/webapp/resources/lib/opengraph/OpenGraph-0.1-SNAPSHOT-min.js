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
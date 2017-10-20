// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël 2.1.0 - JavaScript Vector Library                          │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
// └────────────────────────────────────────────────────────────────────┘ \\

/* group 기능 추가 (by 이승백, 2012-04-17)
 @example
 var paper = new Raphael('canvas', 800, 600);
 var group = paper.group();
 var ele1 = paper.circle(50, 50, 50);
 var ele2 = paper.rect(0, 0, 50, 50, 5);

 group.appendChild(ele1);
 group.appendChild(ele2);

 group.rotate(45, 50, 50);
 */

/* foreignObject 기능 추가 (by 이승백 2012-09-18)
 @example
 var paper = new Raphael('canvas', 800, 600);
 paper.foreignObject('<div>test</div>', 100, 100, 50, 50);
 */

// ┌──────────────────────────────────────────────────────────────────────────────────────┐ \\
// │ Eve 0.3.4 - JavaScript Events Library                                                │ \\
// ├──────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://dmitry.baranovskiy.com/)          │ \\
// │ Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license. │ \\
// └──────────────────────────────────────────────────────────────────────────────────────┘ \\

(function (glob) {
    var version = "0.3.4",
        has = "hasOwnProperty",
        separator = /[\.\/]/,
        wildcard = "*",
        fun = function () {
        },
        numsort = function (a, b) {
            return a - b;
        },
        current_event,
        stop,
        events = {n: {}},

        eve = function (name, scope) {
            var e = events,
                oldstop = stop,
                args = Array.prototype.slice.call(arguments, 2),
                listeners = eve.listeners(name),
                z = 0,
                f = false,
                l,
                indexed = [],
                queue = {},
                out = [],
                ce = current_event,
                errors = [];
            current_event = name;
            stop = 0;
            for (var i = 0, ii = listeners.length; i < ii; i++) if ("zIndex" in listeners[i]) {
                indexed.push(listeners[i].zIndex);
                if (listeners[i].zIndex < 0) {
                    queue[listeners[i].zIndex] = listeners[i];
                }
            }
            indexed.sort(numsort);
            while (indexed[z] < 0) {
                l = queue[indexed[z++]];
                out.push(l.apply(scope, args));
                if (stop) {
                    stop = oldstop;
                    return out;
                }
            }
            for (i = 0; i < ii; i++) {
                l = listeners[i];
                if ("zIndex" in l) {
                    if (l.zIndex == indexed[z]) {
                        out.push(l.apply(scope, args));
                        if (stop) {
                            break;
                        }
                        do {
                            z++;
                            l = queue[indexed[z]];
                            l && out.push(l.apply(scope, args));
                            if (stop) {
                                break;
                            }
                        } while (l)
                    } else {
                        queue[l.zIndex] = l;
                    }
                } else {
                    out.push(l.apply(scope, args));
                    if (stop) {
                        break;
                    }
                }
            }
            stop = oldstop;
            current_event = ce;
            return out.length ? out : null;
        };

    eve.listeners = function (name) {
        var names = name.split(separator),
            e = events,
            item,
            items,
            k,
            i,
            ii,
            j,
            jj,
            nes,
            es = [e],
            out = [];
        for (i = 0, ii = names.length; i < ii; i++) {
            nes = [];
            for (j = 0, jj = es.length; j < jj; j++) {
                e = es[j].n;
                items = [e[names[i]], e[wildcard]];
                k = 2;
                while (k--) {
                    item = items[k];
                    if (item) {
                        nes.push(item);
                        out = out.concat(item.f || []);
                    }
                }
            }
            es = nes;
        }
        return out;
    };


    eve.on = function (name, f) {
        var names = name.split(separator),
            e = events;
        for (var i = 0, ii = names.length; i < ii; i++) {
            e = e.n;
            !e[names[i]] && (e[names[i]] = {n: {}});
            e = e[names[i]];
        }
        e.f = e.f || [];
        for (i = 0, ii = e.f.length; i < ii; i++) if (e.f[i] == f) {
            return fun;
        }
        e.f.push(f);
        return function (zIndex) {
            if (+zIndex == +zIndex) {
                f.zIndex = +zIndex;
            }
        };
    };

    eve.stop = function () {
        stop = 1;
    };

    eve.nt = function (subname) {
        if (subname) {
            return new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)").test(current_event);
        }
        return current_event;
    };


    eve.off = eve.unbind = function (name, f) {
        var names = name.split(separator),
            e,
            key,
            splice,
            i, ii, j, jj,
            cur = [events];
        for (i = 0, ii = names.length; i < ii; i++) {
            for (j = 0; j < cur.length; j += splice.length - 2) {
                splice = [j, 1];
                e = cur[j].n;
                if (names[i] != wildcard) {
                    if (e[names[i]]) {
                        splice.push(e[names[i]]);
                    }
                } else {
                    for (key in e) if (e[has](key)) {
                        splice.push(e[key]);
                    }
                }
                cur.splice.apply(cur, splice);
            }
        }
        for (i = 0, ii = cur.length; i < ii; i++) {
            e = cur[i];
            while (e.n) {
                if (f) {
                    if (e.f) {
                        for (j = 0, jj = e.f.length; j < jj; j++) if (e.f[j] == f) {
                            e.f.splice(j, 1);
                            break;
                        }
                        !e.f.length && delete e.f;
                    }
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        var funcs = e.n[key].f;
                        for (j = 0, jj = funcs.length; j < jj; j++) if (funcs[j] == f) {
                            funcs.splice(j, 1);
                            break;
                        }
                        !funcs.length && delete e.n[key].f;
                    }
                } else {
                    delete e.f;
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        delete e.n[key].f;
                    }
                }
                e = e.n;
            }
        }
    };

    eve.once = function (name, f) {
        var f2 = function () {
            var res = f.apply(this, arguments);
            eve.unbind(name, f2);
            return res;
        };
        return eve.on(name, f2);
    };

    eve.version = version;
    eve.toString = function () {
        return "You are running Eve " + version;
    };
    (typeof module != "undefined" && module.exports) ? (module.exports = eve) : (typeof define != "undefined" ? (define("eve", [], function () {
        return eve;
    })) : (glob.eve = eve));
})(this);


// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ "Raphaël 2.1.0" - JavaScript Vector Library                         │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
(function () {

    function R(first) {
        if (R.is(first, "function")) {
            return loaded ? first() : eve.on("raphael.DOMload", first);
        } else if (R.is(first, array)) {
            return R._engine.create[apply](R, first.splice(0, 3 + R.is(first[0], nu))).add(first);
        } else {
            var args = Array.prototype.slice.call(arguments, 0);
            if (R.is(args[args.length - 1], "function")) {
                var f = args.pop();
                return loaded ? f.call(R._engine.create[apply](R, args)) : eve.on("raphael.DOMload", function () {
                    f.call(R._engine.create[apply](R, args));
                });
            } else {
                return R._engine.create[apply](R, arguments);
            }
        }
    }

    R.version = "2.1.0";
    R.eve = eve;
    var loaded,
        separator = /[, ]+/,
        elements = {circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1},
        formatrg = /\{(\d+)\}/g,
        proto = "prototype",
        has = "hasOwnProperty",
        g = {
            doc: document,
            win: window
        },
        oldRaphael = {
            was: Object.prototype[has].call(g.win, "Raphael"),
            is: g.win.Raphael
        },
        Paper = function () {


            this.ca = this.customAttributes = {};
        },
        paperproto,
        appendChild = "appendChild",
        apply = "apply",
        concat = "concat",
        supportsTouch = "createTouch" in g.doc,
        E = "",
        S = " ",
        Str = String,
        split = "split",
        events = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[split](S),
        touchMap = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        },
        lowerCase = Str.prototype.toLowerCase,
        math = Math,
        mmax = math.max,
        mmin = math.min,
        abs = math.abs,
        pow = math.pow,
        PI = math.PI,
        nu = "number",
        string = "string",
        array = "array",
        toString = "toString",
        fillString = "fill",
        objectToString = Object.prototype.toString,
        paper = {},
        push = "push",
        ISURL = R._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,
        colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
        isnan = {"NaN": 1, "Infinity": 1, "-Infinity": 1},
        bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        round = math.round,
        setAttribute = "setAttribute",
        toFloat = parseFloat,
        toInt = parseInt,
        upperCase = Str.prototype.toUpperCase,
        availableAttrs = R._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0,
            // 추가 ("shape-rendering": "crispEdges")
            "shape-rendering": "crispEdges"
        },
        availableAnimAttrs = R._availableAnimAttrs = {
            blur: nu,
            "clip-rect": "csv",
            cx: nu,
            cy: nu,
            fill: "colour",
            "fill-opacity": nu,
            "font-size": nu,
            height: nu,
            opacity: nu,
            path: "path",
            r: nu,
            rx: nu,
            ry: nu,
            stroke: "colour",
            "stroke-opacity": nu,
            "stroke-width": nu,
            transform: "transform",
            width: nu,
            x: nu,
            y: nu
        },
        whitespace = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
        commaSpaces = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
        hsrg = {hs: 1, rg: 1},
        p2s = /,?([achlmqrstvxz]),?/gi,
        pathCommand = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        tCommand = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,
        radial_gradient = R._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
        eldata = {},
        sortByKey = function (a, b) {
            return a.key - b.key;
        },
        sortByNumber = function (a, b) {
            return toFloat(a) - toFloat(b);
        },
        fun = function () {
        },
        pipe = function (x) {
            return x;
        },
        rectPath = R._rectPath = function (x, y, w, h, r) {
            if (r) {
                return [
                    ["M", x + r, y],
                    ["l", w - r * 2, 0],
                    ["a", r, r, 0, 0, 1, r, r],
                    ["l", 0, h - r * 2],
                    ["a", r, r, 0, 0, 1, -r, r],
                    ["l", r * 2 - w, 0],
                    ["a", r, r, 0, 0, 1, -r, -r],
                    ["l", 0, r * 2 - h],
                    ["a", r, r, 0, 0, 1, r, -r],
                    ["z"]
                ];
            }
            return [
                ["M", x, y],
                ["l", w, 0],
                ["l", 0, h],
                ["l", -w, 0],
                ["z"]
            ];
        },
        ellipsePath = function (x, y, rx, ry) {
            if (ry == null) {
                ry = rx;
            }
            return [
                ["M", x, y],
                ["m", 0, -ry],
                ["a", rx, ry, 0, 1, 1, 0, 2 * ry],
                ["a", rx, ry, 0, 1, 1, 0, -2 * ry],
                ["z"]
            ];
        },
        getPath = R._getPath = {
            // 추가(for group 기능)
            group: function (el) {
                throw new TypeError("Not support for group element!");
            },
            path: function (el) {
                return el.attr("path");
            },
            circle: function (el) {
                var a = el.attrs;
                return ellipsePath(a.cx, a.cy, a.r);
            },
            ellipse: function (el) {
                var a = el.attrs;
                return ellipsePath(a.cx, a.cy, a.rx, a.ry);
            },
            rect: function (el) {
                var a = el.attrs;
                return rectPath(a.x, a.y, a.width, a.height, a.r);
            },
            image: function (el) {
                var a = el.attrs;
                return rectPath(a.x, a.y, a.width, a.height);
            },
            text: function (el) {
                var bbox = el._getBBox();
                return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
            },
            foreignObject: function (el) {
                var a = el.attrs;
                return rectPath(a.x, a.y, a.width, a.height);
            }
        },

        mapPath = R.mapPath = function (path, matrix) {
            if (!matrix) {
                return path;
            }
            var x, y, i, j, ii, jj, pathi;
            path = path2curve(path);
            for (i = 0, ii = path.length; i < ii; i++) {
                pathi = path[i];
                for (j = 1, jj = pathi.length; j < jj; j += 2) {
                    x = matrix.x(pathi[j], pathi[j + 1]);
                    y = matrix.y(pathi[j], pathi[j + 1]);
                    pathi[j] = x;
                    pathi[j + 1] = y;
                }
            }
            return path;
        };

    R._g = g;

    R.type = (g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
    if (R.type == "VML") {
        var d = g.doc.createElement("div"),
            b;
        d.innerHTML = '<v:shape adj="1"/>';
        b = d.firstChild;
        b.style.behavior = "url(#default#VML)";
        if (!(b && typeof b.adj == "object")) {
            return (R.type = E);
        }
        d = null;
    }


    R.svg = !(R.vml = R.type == "VML");
    R._Paper = Paper;

    R.fn = paperproto = Paper.prototype = R.prototype;
    R._id = 0;
    R._oid = 0;

    R.is = function (o, type) {
        type = lowerCase.call(type);
        if (type == "finite") {
            return !isnan[has](+o);
        }
        if (type == "array") {
            return o instanceof Array;
        }
        return  (type == "null" && o === null) ||
            (type == typeof o && o !== null) ||
            (type == "object" && o === Object(o)) ||
            (type == "array" && Array.isArray && Array.isArray(o)) ||
            objectToString.call(o).slice(8, -1).toLowerCase() == type;
    };

    function clone(obj) {
        if (Object(obj) !== obj) {
            return obj;
        }
        var res = new obj.constructor;
        for (var key in obj) if (obj[has](key)) {
            res[key] = clone(obj[key]);
        }
        return res;
    }


    R.angle = function (x1, y1, x2, y2, x3, y3) {
        if (x3 == null) {
            var x = x1 - x2,
                y = y1 - y2;
            if (!x && !y) {
                return 0;
            }
            return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360;
        } else {
            return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3);
        }
    };

    R.rad = function (deg) {
        return deg % 360 * PI / 180;
    };

    R.deg = function (rad) {
        return rad * 180 / PI % 360;
    };

    R.snapTo = function (values, value, tolerance) {
        tolerance = R.is(tolerance, "finite") ? tolerance : 10;
        if (R.is(values, array)) {
            var i = values.length;
            while (i--) if (abs(values[i] - value) <= tolerance) {
                return values[i];
            }
        } else {
            values = +values;
            var rem = value % values;
            if (rem < tolerance) {
                return value - rem;
            }
            if (rem > values - tolerance) {
                return value - rem + values;
            }
        }
        return value;
    };


    var createUUID = R.createUUID = (function (uuidRegEx, uuidReplacer) {
        return function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
        };
    })(/[xy]/g, function (c) {
        var r = math.random() * 16 | 0,
            v = c == "x" ? r : (r & 3 | 8);
        return v.toString(16);
    });


    R.setWindow = function (newwin) {
        eve("raphael.setWindow", R, g.win, newwin);
        g.win = newwin;
        g.doc = g.win.document;
        if (R._engine.initWin) {
            R._engine.initWin(g.win);
        }
    };
    var toHex = function (color) {
            if (R.vml) {
                // http://dean.edwards.name/weblog/2009/10/convert-any-colour-value-to-hex-in-msie/
                var trim = /^\s+|\s+$/g;
                var bod;
                try {
                    var docum = new ActiveXObject("htmlfile");
                    docum.write("<body>");
                    docum.close();
                    bod = docum.body;
                } catch (e) {
                    bod = createPopup().document.body;
                }
                var range = bod.createTextRange();
                toHex = cacher(function (color) {
                    try {
                        bod.style.color = Str(color).replace(trim, E);
                        var value = range.queryCommandValue("ForeColor");
                        value = ((value & 255) << 16) | (value & 65280) | ((value & 16711680) >>> 16);
                        return "#" + ("000000" + value.toString(16)).slice(-6);
                    } catch (e) {
                        return "none";
                    }
                });
            } else {
                var i = g.doc.createElement("i");
                i.title = "Rapha\xebl Colour Picker";
                i.style.display = "none";
                g.doc.body.appendChild(i);
                toHex = cacher(function (color) {
                    i.style.color = color;
                    return g.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color");
                });
            }
            return toHex(color);
        },
        hsbtoString = function () {
            return "hsb(" + [this.h, this.s, this.b] + ")";
        },
        hsltoString = function () {
            return "hsl(" + [this.h, this.s, this.l] + ")";
        },
        rgbtoString = function () {
            return this.hex;
        },
        prepareRGB = function (r, g, b) {
            if (g == null && R.is(r, "object") && "r" in r && "g" in r && "b" in r) {
                b = r.b;
                g = r.g;
                r = r.r;
            }
            if (g == null && R.is(r, string)) {
                var clr = R.getRGB(r);
                r = clr.r;
                g = clr.g;
                b = clr.b;
            }
            if (r > 1 || g > 1 || b > 1) {
                r /= 255;
                g /= 255;
                b /= 255;
            }

            return [r, g, b];
        },
        packageRGB = function (r, g, b, o) {
            r *= 255;
            g *= 255;
            b *= 255;
            var rgb = {
                r: r,
                g: g,
                b: b,
                hex: R.rgb(r, g, b),
                toString: rgbtoString
            };
            R.is(o, "finite") && (rgb.opacity = o);
            return rgb;
        };


    R.color = function (clr) {
        var rgb;
        if (R.is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
            rgb = R.hsb2rgb(clr);
            clr.r = rgb.r;
            clr.g = rgb.g;
            clr.b = rgb.b;
            clr.hex = rgb.hex;
        } else if (R.is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
            rgb = R.hsl2rgb(clr);
            clr.r = rgb.r;
            clr.g = rgb.g;
            clr.b = rgb.b;
            clr.hex = rgb.hex;
        } else {
            if (R.is(clr, "string")) {
                clr = R.getRGB(clr);
            }
            if (R.is(clr, "object") && "r" in clr && "g" in clr && "b" in clr) {
                rgb = R.rgb2hsl(clr);
                clr.h = rgb.h;
                clr.s = rgb.s;
                clr.l = rgb.l;
                rgb = R.rgb2hsb(clr);
                clr.v = rgb.b;
            } else {
                clr = {hex: "none"};
                clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1;
            }
        }
        clr.toString = rgbtoString;
        return clr;
    };

    R.hsb2rgb = function (h, s, v, o) {
        if (this.is(h, "object") && "h" in h && "s" in h && "b" in h) {
            v = h.b;
            s = h.s;
            h = h.h;
            o = h.o;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = v * s;
        X = C * (1 - abs(h % 2 - 1));
        R = G = B = v - C;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return packageRGB(R, G, B, o);
    };

    R.hsl2rgb = function (h, s, l, o) {
        if (this.is(h, "object") && "h" in h && "s" in h && "l" in h) {
            l = h.l;
            s = h.s;
            h = h.h;
        }
        if (h > 1 || s > 1 || l > 1) {
            h /= 360;
            s /= 100;
            l /= 100;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = 2 * s * (l < .5 ? l : 1 - l);
        X = C * (1 - abs(h % 2 - 1));
        R = G = B = l - C / 2;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return packageRGB(R, G, B, o);
    };

    R.rgb2hsb = function (r, g, b) {
        b = prepareRGB(r, g, b);
        r = b[0];
        g = b[1];
        b = b[2];

        var H, S, V, C;
        V = mmax(r, g, b);
        C = V - mmin(r, g, b);
        H = (C == 0 ? null :
            V == r ? (g - b) / C :
                V == g ? (b - r) / C + 2 :
                    (r - g) / C + 4
            );
        H = ((H + 360) % 6) * 60 / 360;
        S = C == 0 ? 0 : C / V;
        return {h: H, s: S, b: V, toString: hsbtoString};
    };

    R.rgb2hsl = function (r, g, b) {
        b = prepareRGB(r, g, b);
        r = b[0];
        g = b[1];
        b = b[2];

        var H, S, L, M, m, C;
        M = mmax(r, g, b);
        m = mmin(r, g, b);
        C = M - m;
        H = (C == 0 ? null :
            M == r ? (g - b) / C :
                M == g ? (b - r) / C + 2 :
                    (r - g) / C + 4);
        H = ((H + 360) % 6) * 60 / 360;
        L = (M + m) / 2;
        S = (C == 0 ? 0 :
            L < .5 ? C / (2 * L) :
                C / (2 - 2 * L));
        return {h: H, s: S, l: L, toString: hsltoString};
    };
    R._path2string = function () {
        return this.join(",").replace(p2s, "$1");
    };
    function repush(array, item) {
        for (var i = 0, ii = array.length; i < ii; i++) if (array[i] === item) {
            return array.push(array.splice(i, 1)[0]);
        }
    }

    function cacher(f, scope, postprocessor) {
        function newf() {
            var arg = Array.prototype.slice.call(arguments, 0),
                args = arg.join("\u2400"),
                cache = newf.cache = newf.cache || {},
                count = newf.count = newf.count || [];
            if (cache[has](args)) {
                repush(count, args);
                return postprocessor ? postprocessor(cache[args]) : cache[args];
            }
            count.length >= 1e3 && delete cache[count.shift()];
            count.push(args);
            cache[args] = f[apply](scope, arg);
            return postprocessor ? postprocessor(cache[args]) : cache[args];
        }

        return newf;
    }

    var preload = R._preload = function (src, f) {
        var img = g.doc.createElement("img");
        img.style.cssText = "position:absolute;left:-9999em;top:-9999em";
        img.onload = function () {
            f.call(this);
            this.onload = null;
            g.doc.body.removeChild(this);
        };
        img.onerror = function () {
            g.doc.body.removeChild(this);
        };
        g.doc.body.appendChild(img);
        img.src = src;
    };

    function clrToString() {
        return this.hex;
    }


    R.getRGB = cacher(function (colour) {
        if (!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
            return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString};
        }
        if (colour == "none") {
            return {r: -1, g: -1, b: -1, hex: "none", toString: clrToString};
        }
        !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
        var res,
            red,
            green,
            blue,
            opacity,
            t,
            values,
            rgb = colour.match(colourRegExp);
        if (rgb) {
            if (rgb[2]) {
                blue = toInt(rgb[2].substring(5), 16);
                green = toInt(rgb[2].substring(3, 5), 16);
                red = toInt(rgb[2].substring(1, 3), 16);
            }
            if (rgb[3]) {
                blue = toInt((t = rgb[3].charAt(3)) + t, 16);
                green = toInt((t = rgb[3].charAt(2)) + t, 16);
                red = toInt((t = rgb[3].charAt(1)) + t, 16);
            }
            if (rgb[4]) {
                values = rgb[4][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
            }
            if (rgb[5]) {
                values = rgb[5][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                return R.hsb2rgb(red, green, blue, opacity);
            }
            if (rgb[6]) {
                values = rgb[6][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                return R.hsl2rgb(red, green, blue, opacity);
            }
            rgb = {r: red, g: green, b: blue, toString: clrToString};
            rgb.hex = "#" + (16777216 | blue | (green << 8) | (red << 16)).toString(16).slice(1);
            R.is(opacity, "finite") && (rgb.opacity = opacity);
            return rgb;
        }
        return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString};
    }, R);

    R.hsb = cacher(function (h, s, b) {
        return R.hsb2rgb(h, s, b).hex;
    });

    R.hsl = cacher(function (h, s, l) {
        return R.hsl2rgb(h, s, l).hex;
    });

    R.rgb = cacher(function (r, g, b) {
        return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1);
    });

    R.getColor = function (value) {
        var start = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: value || .75},
            rgb = this.hsb2rgb(start.h, start.s, start.b);
        start.h += .075;
        if (start.h > 1) {
            start.h = 0;
            start.s -= .2;
            start.s <= 0 && (this.getColor.start = {h: 0, s: 1, b: start.b});
        }
        return rgb.hex;
    };

    R.getColor.reset = function () {
        delete this.start;
    };

    // http://schepers.cc/getting-to-the-point
    function catmullRom2bezier(crp, z) {
        var d = [];
        for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
            var p = [
                {x: +crp[i - 2], y: +crp[i - 1]},
                {x: +crp[i], y: +crp[i + 1]},
                {x: +crp[i + 2], y: +crp[i + 3]},
                {x: +crp[i + 4], y: +crp[i + 5]}
            ];
            if (z) {
                if (!i) {
                    p[0] = {x: +crp[iLen - 2], y: +crp[iLen - 1]};
                } else if (iLen - 4 == i) {
                    p[3] = {x: +crp[0], y: +crp[1]};
                } else if (iLen - 2 == i) {
                    p[2] = {x: +crp[0], y: +crp[1]};
                    p[3] = {x: +crp[2], y: +crp[3]};
                }
            } else {
                if (iLen - 4 == i) {
                    p[3] = p[2];
                } else if (!i) {
                    p[0] = {x: +crp[i], y: +crp[i + 1]};
                }
            }
            d.push(["C",
                (-p[0].x + 6 * p[1].x + p[2].x) / 6,
                (-p[0].y + 6 * p[1].y + p[2].y) / 6,
                (p[1].x + 6 * p[2].x - p[3].x) / 6,
                (p[1].y + 6 * p[2].y - p[3].y) / 6,
                p[2].x,
                p[2].y
            ]);
        }

        return d;
    }

    R.parsePathString = function (pathString) {
        if (!pathString) {
            return null;
        }
        var pth = paths(pathString);
        if (pth.arr) {
            return pathClone(pth.arr);
        }

        var paramCounts = {a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0},
            data = [];
        if (R.is(pathString, array) && R.is(pathString[0], array)) { // rough assumption
            data = pathClone(pathString);
        }
        if (!data.length) {
            Str(pathString).replace(pathCommand, function (a, b, c) {
                var params = [],
                    name = b.toLowerCase();
                c.replace(pathValues, function (a, b) {
                    b && params.push(+b);
                });
                if (name == "m" && params.length > 2) {
                    data.push([b][concat](params.splice(0, 2)));
                    name = "l";
                    b = b == "m" ? "l" : "L";
                }
                if (name == "r") {
                    data.push([b][concat](params));
                } else while (params.length >= paramCounts[name]) {
                    data.push([b][concat](params.splice(0, paramCounts[name])));
                    if (!paramCounts[name]) {
                        break;
                    }
                }
            });
        }
        data.toString = R._path2string;
        pth.arr = pathClone(data);
        return data;
    };

    R.parseTransformString = cacher(function (TString) {
        if (!TString) {
            return null;
        }
        var paramCounts = {r: 3, s: 4, t: 2, m: 6},
            data = [];
        if (R.is(TString, array) && R.is(TString[0], array)) { // rough assumption
            data = pathClone(TString);
        }
        if (!data.length) {
            Str(TString).replace(tCommand, function (a, b, c) {
                var params = [],
                    name = lowerCase.call(b);
                c.replace(pathValues, function (a, b) {
                    b && params.push(+b);
                });
                data.push([b][concat](params));
            });
        }
        data.toString = R._path2string;
        return data;
    });
    // PATHS
    var paths = function (ps) {
        var p = paths.ps = paths.ps || {};
        if (p[ps]) {
            p[ps].sleep = 100;
        } else {
            p[ps] = {
                sleep: 100
            };
        }
        setTimeout(function () {
            for (var key in p) if (p[has](key) && key != ps) {
                p[key].sleep--;
                !p[key].sleep && delete p[key];
            }
        });
        return p[ps];
    };

    R.findDotsAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
        var t1 = 1 - t,
            t13 = pow(t1, 3),
            t12 = pow(t1, 2),
            t2 = t * t,
            t3 = t2 * t,
            x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
            y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
            mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
            my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
            nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
            ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
            ax = t1 * p1x + t * c1x,
            ay = t1 * p1y + t * c1y,
            cx = t1 * c2x + t * p2x,
            cy = t1 * c2y + t * p2y,
            alpha = (90 - math.atan2(mx - nx, my - ny) * 180 / PI);
        (mx > nx || my < ny) && (alpha += 180);
        return {
            x: x,
            y: y,
            m: {x: mx, y: my},
            n: {x: nx, y: ny},
            start: {x: ax, y: ay},
            end: {x: cx, y: cy},
            alpha: alpha
        };
    };

    R.bezierBBox = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
        if (!R.is(p1x, "array")) {
            p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
        }
        var bbox = curveDim.apply(null, p1x);
        return {
            x: bbox.min.x,
            y: bbox.min.y,
            x2: bbox.max.x,
            y2: bbox.max.y,
            width: bbox.max.x - bbox.min.x,
            height: bbox.max.y - bbox.min.y
        };
    };

    R.isPointInsideBBox = function (bbox, x, y) {
        return x >= bbox.x && x <= bbox.x2 && y >= bbox.y && y <= bbox.y2;
    };

    R.isBBoxIntersect = function (bbox1, bbox2) {
        var i = R.isPointInsideBBox;
        return i(bbox2, bbox1.x, bbox1.y)
            || i(bbox2, bbox1.x2, bbox1.y)
            || i(bbox2, bbox1.x, bbox1.y2)
            || i(bbox2, bbox1.x2, bbox1.y2)
            || i(bbox1, bbox2.x, bbox2.y)
            || i(bbox1, bbox2.x2, bbox2.y)
            || i(bbox1, bbox2.x, bbox2.y2)
            || i(bbox1, bbox2.x2, bbox2.y2)
            || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x)
            && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
    };
    function base3(t, p1, p2, p3, p4) {
        var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
            t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
        return t * t2 - 3 * p1 + 3 * p2;
    }

    function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
        if (z == null) {
            z = 1;
        }
        z = z > 1 ? 1 : z < 0 ? 0 : z;
        var z2 = z / 2,
            n = 12,
            Tvalues = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816],
            Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472],
            sum = 0;
        for (var i = 0; i < n; i++) {
            var ct = z2 * Tvalues[i] + z2,
                xbase = base3(ct, x1, x2, x3, x4),
                ybase = base3(ct, y1, y2, y3, y4),
                comb = xbase * xbase + ybase * ybase;
            sum += Cvalues[i] * math.sqrt(comb);
        }
        return z2 * sum;
    }

    function getTatLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
        if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
            return;
        }
        var t = 1,
            step = t / 2,
            t2 = t - step,
            l,
            e = .01;
        l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
        while (abs(l - ll) > e) {
            step /= 2;
            t2 += (l < ll ? 1 : -1) * step;
            l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
        }
        return t2;
    }

    function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        if (
            mmax(x1, x2) < mmin(x3, x4) ||
                mmin(x1, x2) > mmax(x3, x4) ||
                mmax(y1, y2) < mmin(y3, y4) ||
                mmin(y1, y2) > mmax(y3, y4)
            ) {
            return;
        }
        var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
            ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
            denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (!denominator) {
            return;
        }
        var px = nx / denominator,
            py = ny / denominator,
            px2 = +px.toFixed(2),
            py2 = +py.toFixed(2);
        if (
            px2 < +mmin(x1, x2).toFixed(2) ||
                px2 > +mmax(x1, x2).toFixed(2) ||
                px2 < +mmin(x3, x4).toFixed(2) ||
                px2 > +mmax(x3, x4).toFixed(2) ||
                py2 < +mmin(y1, y2).toFixed(2) ||
                py2 > +mmax(y1, y2).toFixed(2) ||
                py2 < +mmin(y3, y4).toFixed(2) ||
                py2 > +mmax(y3, y4).toFixed(2)
            ) {
            return;
        }
        return {x: px, y: py};
    }

    function inter(bez1, bez2) {
        return interHelper(bez1, bez2);
    }

    function interCount(bez1, bez2) {
        return interHelper(bez1, bez2, 1);
    }

    function interHelper(bez1, bez2, justCount) {
        var bbox1 = R.bezierBBox(bez1),
            bbox2 = R.bezierBBox(bez2);
        if (!R.isBBoxIntersect(bbox1, bbox2)) {
            return justCount ? 0 : [];
        }
        var l1 = bezlen.apply(0, bez1),
            l2 = bezlen.apply(0, bez2),
            n1 = ~~(l1 / 5),
            n2 = ~~(l2 / 5),
            dots1 = [],
            dots2 = [],
            xy = {},
            res = justCount ? 0 : [];
        for (var i = 0; i < n1 + 1; i++) {
            var p = R.findDotsAtSegment.apply(R, bez1.concat(i / n1));
            dots1.push({x: p.x, y: p.y, t: i / n1});
        }
        for (i = 0; i < n2 + 1; i++) {
            p = R.findDotsAtSegment.apply(R, bez2.concat(i / n2));
            dots2.push({x: p.x, y: p.y, t: i / n2});
        }
        for (i = 0; i < n1; i++) {
            for (var j = 0; j < n2; j++) {
                var di = dots1[i],
                    di1 = dots1[i + 1],
                    dj = dots2[j],
                    dj1 = dots2[j + 1],
                    ci = abs(di1.x - di.x) < .001 ? "y" : "x",
                    cj = abs(dj1.x - dj.x) < .001 ? "y" : "x",
                    is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
                if (is) {
                    if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
                        continue;
                    }
                    xy[is.x.toFixed(4)] = is.y.toFixed(4);
                    var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
                        t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
                    if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
                        if (justCount) {
                            res++;
                        } else {
                            res.push({
                                x: is.x,
                                y: is.y,
                                t1: t1,
                                t2: t2
                            });
                        }
                    }
                }
            }
        }
        return res;
    }

    R.pathIntersection = function (path1, path2) {
        return interPathHelper(path1, path2);
    };
    R.pathIntersectionNumber = function (path1, path2) {
        return interPathHelper(path1, path2, 1);
    };
    function interPathHelper(path1, path2, justCount) {
        path1 = R._path2curve(path1);
        path2 = R._path2curve(path2);
        var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2,
            res = justCount ? 0 : [];
        for (var i = 0, ii = path1.length; i < ii; i++) {
            var pi = path1[i];
            if (pi[0] == "M") {
                x1 = x1m = pi[1];
                y1 = y1m = pi[2];
            } else {
                if (pi[0] == "C") {
                    bez1 = [x1, y1].concat(pi.slice(1));
                    x1 = bez1[6];
                    y1 = bez1[7];
                } else {
                    bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
                    x1 = x1m;
                    y1 = y1m;
                }
                for (var j = 0, jj = path2.length; j < jj; j++) {
                    var pj = path2[j];
                    if (pj[0] == "M") {
                        x2 = x2m = pj[1];
                        y2 = y2m = pj[2];
                    } else {
                        if (pj[0] == "C") {
                            bez2 = [x2, y2].concat(pj.slice(1));
                            x2 = bez2[6];
                            y2 = bez2[7];
                        } else {
                            bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
                            x2 = x2m;
                            y2 = y2m;
                        }
                        var intr = interHelper(bez1, bez2, justCount);
                        if (justCount) {
                            res += intr;
                        } else {
                            for (var k = 0, kk = intr.length; k < kk; k++) {
                                intr[k].segment1 = i;
                                intr[k].segment2 = j;
                                intr[k].bez1 = bez1;
                                intr[k].bez2 = bez2;
                            }
                            res = res.concat(intr);
                        }
                    }
                }
            }
        }
        return res;
    }

    R.isPointInsidePath = function (path, x, y) {
        var bbox = R.pathBBox(path);
        return R.isPointInsideBBox(bbox, x, y) &&
            interPathHelper(path, [
                ["M", x, y],
                ["H", bbox.x2 + 10]
            ], 1) % 2 == 1;
    };
    R._removedFactory = function (methodname) {
        return function () {
            eve("raphael.log", null, "Rapha\xebl: you are calling to method \u201c" + methodname + "\u201d of removed object", methodname);
        };
    };

    var pathDimensions = R.pathBBox = function (path) {
            var pth = paths(path);
            if (pth.bbox) {
                return pth.bbox;
            }
            if (!path) {
                return {x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0};
            }
            path = path2curve(path);
            var x = 0,
                y = 0,
                X = [],
                Y = [],
                p;
            for (var i = 0, ii = path.length; i < ii; i++) {
                p = path[i];
                if (p[0] == "M") {
                    x = p[1];
                    y = p[2];
                    X.push(x);
                    Y.push(y);
                } else {
                    var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                    X = X[concat](dim.min.x, dim.max.x);
                    Y = Y[concat](dim.min.y, dim.max.y);
                    x = p[5];
                    y = p[6];
                }
            }
            var xmin = mmin[apply](0, X),
                ymin = mmin[apply](0, Y),
                xmax = mmax[apply](0, X),
                ymax = mmax[apply](0, Y),
                bb = {
                    x: xmin,
                    y: ymin,
                    x2: xmax,
                    y2: ymax,
                    width: xmax - xmin,
                    height: ymax - ymin
                };
            pth.bbox = clone(bb);
            return bb;
        },
        pathClone = function (pathArray) {
            var res = clone(pathArray);
            res.toString = R._path2string;
            return res;
        },
        pathToRelative = R._pathToRelative = function (pathArray) {
            var pth = paths(pathArray);
            if (pth.rel) {
                return pathClone(pth.rel);
            }
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
                pathArray = R.parsePathString(pathArray);
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0;
            if (pathArray[0][0] == "M") {
                x = pathArray[0][1];
                y = pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res.push(["M", x, y]);
            }
            for (var i = start, ii = pathArray.length; i < ii; i++) {
                var r = res[i] = [],
                    pa = pathArray[i];
                if (pa[0] != lowerCase.call(pa[0])) {
                    r[0] = lowerCase.call(pa[0]);
                    switch (r[0]) {
                        case "a":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +(pa[6] - x).toFixed(3);
                            r[7] = +(pa[7] - y).toFixed(3);
                            break;
                        case "v":
                            r[1] = +(pa[1] - y).toFixed(3);
                            break;
                        case "m":
                            mx = pa[1];
                            my = pa[2];
                        default:
                            for (var j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3);
                            }
                    }
                } else {
                    r = res[i] = [];
                    if (pa[0] == "m") {
                        mx = pa[1] + x;
                        my = pa[2] + y;
                    }
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        res[i][k] = pa[k];
                    }
                }
                var len = res[i].length;
                switch (res[i][0]) {
                    case "z":
                        x = mx;
                        y = my;
                        break;
                    case "h":
                        x += +res[i][len - 1];
                        break;
                    case "v":
                        y += +res[i][len - 1];
                        break;
                    default:
                        x += +res[i][len - 2];
                        y += +res[i][len - 1];
                }
            }
            res.toString = R._path2string;
            pth.rel = pathClone(res);
            return res;
        },
        pathToAbsolute = R._pathToAbsolute = function (pathArray) {
            var pth = paths(pathArray);
            if (pth.abs) {
                return pathClone(pth.abs);
            }
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
                pathArray = R.parsePathString(pathArray);
            }
            if (!pathArray || !pathArray.length) {
                return [
                    ["M", 0, 0]
                ];
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0;
            if (pathArray[0][0] == "M") {
                x = +pathArray[0][1];
                y = +pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res[0] = ["M", x, y];
            }
            var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";
            for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
                res.push(r = []);
                pa = pathArray[i];
                if (pa[0] != upperCase.call(pa[0])) {
                    r[0] = upperCase.call(pa[0]);
                    switch (r[0]) {
                        case "A":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +(pa[6] + x);
                            r[7] = +(pa[7] + y);
                            break;
                        case "V":
                            r[1] = +pa[1] + y;
                            break;
                        case "H":
                            r[1] = +pa[1] + x;
                            break;
                        case "R":
                            var dots = [x, y][concat](pa.slice(1));
                            for (var j = 2, jj = dots.length; j < jj; j++) {
                                dots[j] = +dots[j] + x;
                                dots[++j] = +dots[j] + y;
                            }
                            res.pop();
                            res = res[concat](catmullRom2bezier(dots, crz));
                            break;
                        case "M":
                            mx = +pa[1] + x;
                            my = +pa[2] + y;
                        default:
                            for (j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +pa[j] + ((j % 2) ? x : y);
                            }
                    }
                } else if (pa[0] == "R") {
                    dots = [x, y][concat](pa.slice(1));
                    res.pop();
                    res = res[concat](catmullRom2bezier(dots, crz));
                    r = ["R"][concat](pa.slice(-2));
                } else {
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        r[k] = pa[k];
                    }
                }
                switch (r[0]) {
                    case "Z":
                        x = mx;
                        y = my;
                        break;
                    case "H":
                        x = r[1];
                        break;
                    case "V":
                        y = r[1];
                        break;
                    case "M":
                        mx = r[r.length - 2];
                        my = r[r.length - 1];
                    default:
                        x = r[r.length - 2];
                        y = r[r.length - 1];
                }
            }
            res.toString = R._path2string;
            pth.abs = pathClone(res);
            return res;
        },
        l2c = function (x1, y1, x2, y2) {
            return [x1, y1, x2, y2, x2, y2];
        },
        q2c = function (x1, y1, ax, ay, x2, y2) {
            var _13 = 1 / 3,
                _23 = 2 / 3;
            return [
                _13 * x1 + _23 * ax,
                _13 * y1 + _23 * ay,
                _13 * x2 + _23 * ax,
                _13 * y2 + _23 * ay,
                x2,
                y2
            ];
        },
        a2c = function (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
            // for more information of where this math came from visit:
            // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
            var _120 = PI * 120 / 180,
                rad = PI / 180 * (+angle || 0),
                res = [],
                xy,
                rotate = cacher(function (x, y, rad) {
                    var X = x * math.cos(rad) - y * math.sin(rad),
                        Y = x * math.sin(rad) + y * math.cos(rad);
                    return {x: X, y: Y};
                });
            if (!recursive) {
                xy = rotate(x1, y1, -rad);
                x1 = xy.x;
                y1 = xy.y;
                xy = rotate(x2, y2, -rad);
                x2 = xy.x;
                y2 = xy.y;
                var cos = math.cos(PI / 180 * angle),
                    sin = math.sin(PI / 180 * angle),
                    x = (x1 - x2) / 2,
                    y = (y1 - y2) / 2;
                var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
                if (h > 1) {
                    h = math.sqrt(h);
                    rx = h * rx;
                    ry = h * ry;
                }
                var rx2 = rx * rx,
                    ry2 = ry * ry,
                    k = (large_arc_flag == sweep_flag ? -1 : 1) *
                        math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
                    cx = k * rx * y / ry + (x1 + x2) / 2,
                    cy = k * -ry * x / rx + (y1 + y2) / 2,
                    f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
                    f2 = math.asin(((y2 - cy) / ry).toFixed(9));

                f1 = x1 < cx ? PI - f1 : f1;
                f2 = x2 < cx ? PI - f2 : f2;
                f1 < 0 && (f1 = PI * 2 + f1);
                f2 < 0 && (f2 = PI * 2 + f2);
                if (sweep_flag && f1 > f2) {
                    f1 = f1 - PI * 2;
                }
                if (!sweep_flag && f2 > f1) {
                    f2 = f2 - PI * 2;
                }
            } else {
                f1 = recursive[0];
                f2 = recursive[1];
                cx = recursive[2];
                cy = recursive[3];
            }
            var df = f2 - f1;
            if (abs(df) > _120) {
                var f2old = f2,
                    x2old = x2,
                    y2old = y2;
                f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
                x2 = cx + rx * math.cos(f2);
                y2 = cy + ry * math.sin(f2);
                res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
            }
            df = f2 - f1;
            var c1 = math.cos(f1),
                s1 = math.sin(f1),
                c2 = math.cos(f2),
                s2 = math.sin(f2),
                t = math.tan(df / 4),
                hx = 4 / 3 * rx * t,
                hy = 4 / 3 * ry * t,
                m1 = [x1, y1],
                m2 = [x1 + hx * s1, y1 - hy * c1],
                m3 = [x2 + hx * s2, y2 - hy * c2],
                m4 = [x2, y2];
            m2[0] = 2 * m1[0] - m2[0];
            m2[1] = 2 * m1[1] - m2[1];
            if (recursive) {
                return [m2, m3, m4][concat](res);
            } else {
                res = [m2, m3, m4][concat](res).join()[split](",");
                var newres = [];
                for (var i = 0, ii = res.length; i < ii; i++) {
                    newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
                }
                return newres;
            }
        },
        findDotAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
            var t1 = 1 - t;
            return {
                x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
                y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
            };
        },
        curveDim = cacher(function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
            var a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x),
                b = 2 * (c1x - p1x) - 2 * (c2x - c1x),
                c = p1x - c1x,
                t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a,
                t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a,
                y = [p1y, p2y],
                x = [p1x, p2x],
                dot;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                x.push(dot.x);
                y.push(dot.y);
            }
            if (t2 > 0 && t2 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                x.push(dot.x);
                y.push(dot.y);
            }
            a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y);
            b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
            c = p1y - c1y;
            t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
            t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                x.push(dot.x);
                y.push(dot.y);
            }
            if (t2 > 0 && t2 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                x.push(dot.x);
                y.push(dot.y);
            }
            return {
                min: {x: mmin[apply](0, x), y: mmin[apply](0, y)},
                max: {x: mmax[apply](0, x), y: mmax[apply](0, y)}
            };
        }),
        path2curve = R._path2curve = cacher(function (path, path2) {
            var pth = !path2 && paths(path);
            if (!path2 && pth.curve) {
                return pathClone(pth.curve);
            }
            var p = pathToAbsolute(path),
                p2 = path2 && pathToAbsolute(path2),
                attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                attrs2 = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                processPath = function (path, d) {
                    var nx, ny;
                    if (!path) {
                        return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
                    }
                    !(path[0] in {T: 1, Q: 1}) && (d.qx = d.qy = null);
                    switch (path[0]) {
                        case "M":
                            d.X = path[1];
                            d.Y = path[2];
                            break;
                        case "A":
                            path = ["C"][concat](a2c[apply](0, [d.x, d.y][concat](path.slice(1))));
                            break;
                        case "S":
                            nx = d.x + (d.x - (d.bx || d.x));
                            ny = d.y + (d.y - (d.by || d.y));
                            path = ["C", nx, ny][concat](path.slice(1));
                            break;
                        case "T":
                            d.qx = d.x + (d.x - (d.qx || d.x));
                            d.qy = d.y + (d.y - (d.qy || d.y));
                            path = ["C"][concat](q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
                            break;
                        case "Q":
                            d.qx = path[1];
                            d.qy = path[2];
                            path = ["C"][concat](q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
                            break;
                        case "L":
                            path = ["C"][concat](l2c(d.x, d.y, path[1], path[2]));
                            break;
                        case "H":
                            path = ["C"][concat](l2c(d.x, d.y, path[1], d.y));
                            break;
                        case "V":
                            path = ["C"][concat](l2c(d.x, d.y, d.x, path[1]));
                            break;
                        case "Z":
                            path = ["C"][concat](l2c(d.x, d.y, d.X, d.Y));
                            break;
                    }
                    return path;
                },
                fixArc = function (pp, i) {
                    if (pp[i].length > 7) {
                        pp[i].shift();
                        var pi = pp[i];
                        while (pi.length) {
                            pp.splice(i++, 0, ["C"][concat](pi.splice(0, 6)));
                        }
                        pp.splice(i, 1);
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                },
                fixM = function (path1, path2, a1, a2, i) {
                    if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                        path2.splice(i, 0, ["M", a2.x, a2.y]);
                        a1.bx = 0;
                        a1.by = 0;
                        a1.x = path1[i][1];
                        a1.y = path1[i][2];
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                };
            for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
                p[i] = processPath(p[i], attrs);
                fixArc(p, i);
                p2 && (p2[i] = processPath(p2[i], attrs2));
                p2 && fixArc(p2, i);
                fixM(p, p2, attrs, attrs2, i);
                fixM(p2, p, attrs2, attrs, i);
                var seg = p[i],
                    seg2 = p2 && p2[i],
                    seglen = seg.length,
                    seg2len = p2 && seg2.length;
                attrs.x = seg[seglen - 2];
                attrs.y = seg[seglen - 1];
                attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
                attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
                attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
                attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
                attrs2.x = p2 && seg2[seg2len - 2];
                attrs2.y = p2 && seg2[seg2len - 1];
            }
            if (!p2) {
                pth.curve = pathClone(p);
            }
            return p2 ? [p, p2] : p;
        }, null, pathClone),
        parseDots = R._parseDots = cacher(function (gradient) {
            var dots = [];
            for (var i = 0, ii = gradient.length; i < ii; i++) {
                var dot = {},
                    par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
                dot.color = R.getRGB(par[1]);
                if (dot.color.error) {
                    return null;
                }
                dot.color = dot.color.hex;
                par[2] && (dot.offset = par[2] + "%");
                dots.push(dot);
            }
            for (i = 1, ii = dots.length - 1; i < ii; i++) {
                if (!dots[i].offset) {
                    var start = toFloat(dots[i - 1].offset || 0),
                        end = 0;
                    for (var j = i + 1; j < ii; j++) {
                        if (dots[j].offset) {
                            end = dots[j].offset;
                            break;
                        }
                    }
                    if (!end) {
                        end = 100;
                        j = ii;
                    }
                    end = toFloat(end);
                    var d = (end - start) / (j - i + 1);
                    for (; i < j; i++) {
                        start += d;
                        dots[i].offset = start + "%";
                    }
                }
            }
            return dots;
        }),
        tear = R._tear = function (el, paper) {
            el == paper.top && (paper.top = el.prev);
            el == paper.bottom && (paper.bottom = el.next);
            el.next && (el.next.prev = el.prev);
            el.prev && (el.prev.next = el.next);
        },
        tofront = R._tofront = function (el, paper) {
            if (paper.top === el) {
                return;
            }
            tear(el, paper);
            el.next = null;
            el.prev = paper.top;
            paper.top.next = el;
            paper.top = el;
        },
        toback = R._toback = function (el, paper) {
            if (paper.bottom === el) {
                return;
            }
            tear(el, paper);
            el.next = paper.bottom;
            el.prev = null;
            paper.bottom.prev = el;
            paper.bottom = el;
        },
        insertafter = R._insertafter = function (el, el2, paper) {
            tear(el, paper);
            el2 == paper.top && (paper.top = el);
            el2.next && (el2.next.prev = el);
            el.next = el2.next;
            el.prev = el2;
            el2.next = el;
        },
        insertbefore = R._insertbefore = function (el, el2, paper) {
            tear(el, paper);
            el2 == paper.bottom && (paper.bottom = el);
            el2.prev && (el2.prev.next = el);
            el.prev = el2.prev;
            el2.prev = el;
            el.next = el2;
        },

        toMatrix = R.toMatrix = function (path, transform) {
            var bb = pathDimensions(path),
                el = {
                    _: {
                        transform: E
                    },
                    getBBox: function () {
                        return bb;
                    }
                };
            extractTransform(el, transform);
            return el.matrix;
        },

        transformPath = R.transformPath = function (path, transform) {
            return mapPath(path, toMatrix(path, transform));
        },
        extractTransform = R._extractTransform = function (el, tstr) {
            if (tstr == null) {
                return el._.transform;
            }
            tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || E);
            var tdata = R.parseTransformString(tstr),
                deg = 0,
                dx = 0,
                dy = 0,
                sx = 1,
                sy = 1,
                _ = el._,
                m = new Matrix;
            _.transform = tdata || [];
            if (tdata) {
                for (var i = 0, ii = tdata.length; i < ii; i++) {
                    var t = tdata[i],
                        tlen = t.length,
                        command = Str(t[0]).toLowerCase(),
                        absolute = t[0] != command,
                        inver = absolute ? m.invert() : 0,
                        x1,
                        y1,
                        x2,
                        y2,
                        bb;
                    if (command == "t" && tlen == 3) {
                        if (absolute) {
                            x1 = inver.x(0, 0);
                            y1 = inver.y(0, 0);
                            x2 = inver.x(t[1], t[2]);
                            y2 = inver.y(t[1], t[2]);
                            m.translate(x2 - x1, y2 - y1);
                        } else {
                            m.translate(t[1], t[2]);
                        }
                    } else if (command == "r") {
                        if (tlen == 2) {
                            bb = bb || el.getBBox(1);
                            m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            deg += t[1];
                        } else if (tlen == 4) {
                            if (absolute) {
                                x2 = inver.x(t[2], t[3]);
                                y2 = inver.y(t[2], t[3]);
                                m.rotate(t[1], x2, y2);
                            } else {
                                m.rotate(t[1], t[2], t[3]);
                            }
                            deg += t[1];
                        }
                    } else if (command == "s") {
                        if (tlen == 2 || tlen == 3) {
                            bb = bb || el.getBBox(1);
                            m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            sx *= t[1];
                            sy *= t[tlen - 1];
                        } else if (tlen == 5) {
                            if (absolute) {
                                x2 = inver.x(t[3], t[4]);
                                y2 = inver.y(t[3], t[4]);
                                m.scale(t[1], t[2], x2, y2);
                            } else {
                                m.scale(t[1], t[2], t[3], t[4]);
                            }
                            sx *= t[1];
                            sy *= t[2];
                        }
                    } else if (command == "m" && tlen == 7) {
                        m.add(t[1], t[2], t[3], t[4], t[5], t[6]);
                    }
                    _.dirtyT = 1;
                    el.matrix = m;
                }
            }


            el.matrix = m;

            _.sx = sx;
            _.sy = sy;
            _.deg = deg;
            _.dx = dx = m.e;
            _.dy = dy = m.f;

            if (sx == 1 && sy == 1 && !deg && _.bbox) {
                _.bbox.x += +dx;
                _.bbox.y += +dy;
            } else {
                _.dirtyT = 1;
            }
        },
        getEmpty = function (item) {
            var l = item[0];
            switch (l.toLowerCase()) {
                case "t":
                    return [l, 0, 0];
                case "m":
                    return [l, 1, 0, 0, 1, 0, 0];
                case "r":
                    if (item.length == 4) {
                        return [l, 0, item[2], item[3]];
                    } else {
                        return [l, 0];
                    }
                case "s":
                    if (item.length == 5) {
                        return [l, 1, 1, item[3], item[4]];
                    } else if (item.length == 3) {
                        return [l, 1, 1];
                    } else {
                        return [l, 1];
                    }
            }
        },
        equaliseTransform = R._equaliseTransform = function (t1, t2) {
            t2 = Str(t2).replace(/\.{3}|\u2026/g, t1);
            t1 = R.parseTransformString(t1) || [];
            t2 = R.parseTransformString(t2) || [];
            var maxlength = mmax(t1.length, t2.length),
                from = [],
                to = [],
                i = 0, j, jj,
                tt1, tt2;
            for (; i < maxlength; i++) {
                tt1 = t1[i] || getEmpty(t2[i]);
                tt2 = t2[i] || getEmpty(tt1);
                if ((tt1[0] != tt2[0]) ||
                    (tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3])) ||
                    (tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4]))
                    ) {
                    return;
                }
                from[i] = [];
                to[i] = [];
                for (j = 0, jj = mmax(tt1.length, tt2.length); j < jj; j++) {
                    j in tt1 && (from[i][j] = tt1[j]);
                    j in tt2 && (to[i][j] = tt2[j]);
                }
            }
            return {
                from: from,
                to: to
            };
        };
    R._getContainer = function (x, y, w, h) {
        var container;
        container = h == null && !R.is(x, "object") ? g.doc.getElementById(x) : x;
        if (container == null) {
            return;
        }
        if (container.tagName) {
            if (y == null) {
                return {
                    container: container,
                    width: container.style.pixelWidth || container.offsetWidth,
                    height: container.style.pixelHeight || container.offsetHeight
                };
            } else {
                return {
                    container: container,
                    width: y,
                    height: w
                };
            }
        }
        return {
            container: 1,
            x: x,
            y: y,
            width: w,
            height: h
        };
    };

    R.pathToRelative = pathToRelative;
    R._engine = {};

    R.path2curve = path2curve;

    R.matrix = function (a, b, c, d, e, f) {
        return new Matrix(a, b, c, d, e, f);
    };
    function Matrix(a, b, c, d, e, f) {
        if (a != null) {
            this.a = +a;
            this.b = +b;
            this.c = +c;
            this.d = +d;
            this.e = +e;
            this.f = +f;
        } else {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0;
        }
    }

    (function (matrixproto) {

        matrixproto.add = function (a, b, c, d, e, f) {
            var out = [
                    [],
                    [],
                    []
                ],
                m = [
                    [this.a, this.c, this.e],
                    [this.b, this.d, this.f],
                    [0, 0, 1]
                ],
                matrix = [
                    [a, c, e],
                    [b, d, f],
                    [0, 0, 1]
                ],
                x, y, z, res;

            if (a && a instanceof Matrix) {
                matrix = [
                    [a.a, a.c, a.e],
                    [a.b, a.d, a.f],
                    [0, 0, 1]
                ];
            }

            for (x = 0; x < 3; x++) {
                for (y = 0; y < 3; y++) {
                    res = 0;
                    for (z = 0; z < 3; z++) {
                        res += m[x][z] * matrix[z][y];
                    }
                    out[x][y] = res;
                }
            }
            this.a = out[0][0];
            this.b = out[1][0];
            this.c = out[0][1];
            this.d = out[1][1];
            this.e = out[0][2];
            this.f = out[1][2];
        };

        matrixproto.invert = function () {
            var me = this,
                x = me.a * me.d - me.b * me.c;
            return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
        };

        matrixproto.clone = function () {
            return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
        };

        matrixproto.translate = function (x, y) {
            this.add(1, 0, 0, 1, x, y);
        };

        matrixproto.scale = function (x, y, cx, cy) {
            y == null && (y = x);
            (cx || cy) && this.add(1, 0, 0, 1, cx, cy);
            this.add(x, 0, 0, y, 0, 0);
            (cx || cy) && this.add(1, 0, 0, 1, -cx, -cy);
        };

        matrixproto.rotate = function (a, x, y) {
            a = R.rad(a);
            x = x || 0;
            y = y || 0;
            var cos = +math.cos(a).toFixed(9),
                sin = +math.sin(a).toFixed(9);
            this.add(cos, sin, -sin, cos, x, y);
            this.add(1, 0, 0, 1, -x, -y);
        };

        matrixproto.x = function (x, y) {
            return x * this.a + y * this.c + this.e;
        };

        matrixproto.y = function (x, y) {
            return x * this.b + y * this.d + this.f;
        };
        matrixproto.get = function (i) {
            return +this[Str.fromCharCode(97 + i)].toFixed(4);
        };
        matrixproto.toString = function () {
            return R.svg ?
                "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" :
                [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
        };
        matrixproto.toFilter = function () {
            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) +
                ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) +
                ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
        };
        matrixproto.offset = function () {
            return [this.e.toFixed(4), this.f.toFixed(4)];
        };
        function norm(a) {
            return a[0] * a[0] + a[1] * a[1];
        }

        function normalize(a) {
            var mag = math.sqrt(norm(a));
            a[0] && (a[0] /= mag);
            a[1] && (a[1] /= mag);
        }

        matrixproto.split = function () {
            var out = {};
            // translation
            out.dx = this.e;
            out.dy = this.f;

            // scale and shear
            var row = [
                [this.a, this.c],
                [this.b, this.d]
            ];
            out.scalex = math.sqrt(norm(row[0]));
            normalize(row[0]);

            out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
            row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

            out.scaley = math.sqrt(norm(row[1]));
            normalize(row[1]);
            out.shear /= out.scaley;

            // rotation
            var sin = -row[0][1],
                cos = row[1][1];
            if (cos < 0) {
                out.rotate = R.deg(math.acos(cos));
                if (sin < 0) {
                    out.rotate = 360 - out.rotate;
                }
            } else {
                out.rotate = R.deg(math.asin(sin));
            }

            out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
            out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
            out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
            return out;
        };

        matrixproto.toTransformString = function (shorter) {
            var s = shorter || this[split]();
            if (s.isSimple) {
                s.scalex = +s.scalex.toFixed(4);
                s.scaley = +s.scaley.toFixed(4);
                s.rotate = +s.rotate.toFixed(4);
                return  (s.dx || s.dy ? "t" + [s.dx, s.dy] : E) +
                    (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E) +
                    (s.rotate ? "r" + [s.rotate, 0, 0] : E);
            } else {
                return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
            }
        };
    })(Matrix.prototype);

    // WebKit rendering bug workaround method
    var version = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    if ((navigator.vendor == "Apple Computer, Inc.") && (version && version[1] < 4 || navigator.platform.slice(0, 2) == "iP") ||
        (navigator.vendor == "Google Inc." && version && version[1] < 8)) {

        paperproto.safari = function () {
            var rect = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke: "none"});
            setTimeout(function () {
                rect.remove();
            });
        };
    } else {
        paperproto.safari = fun;
    }

    var preventDefault = function () {
            this.returnValue = false;
        },
        preventTouch = function () {
            return this.originalEvent.preventDefault();
        },
        stopPropagation = function () {
            this.cancelBubble = true;
        },
        stopTouch = function () {
            return this.originalEvent.stopPropagation();
        },
        addEvent = (function () {
            if (g.doc.addEventListener) {
                return function (obj, type, fn, element) {
                    var realName = supportsTouch && touchMap[type] ? touchMap[type] : type,
                        f = function (e) {
                            var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                                scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                                x = e.clientX + scrollX,
                                y = e.clientY + scrollY;
                            if (supportsTouch && touchMap[has](type)) {
                                for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
                                    if (e.targetTouches[i].target == obj) {
                                        var olde = e;
                                        e = e.targetTouches[i];
                                        e.originalEvent = olde;
                                        e.preventDefault = preventTouch;
                                        e.stopPropagation = stopTouch;
                                        break;
                                    }
                                }
                            }
                            return fn.call(element, e, x, y);
                        };
                    obj.addEventListener(realName, f, false);
                    return function () {
                        obj.removeEventListener(realName, f, false);
                        return true;
                    };
                };
            } else if (g.doc.attachEvent) {
                return function (obj, type, fn, element) {
                    var f = function (e) {
                        e = e || g.win.event;
                        var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                            scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                            x = e.clientX + scrollX,
                            y = e.clientY + scrollY;
                        e.preventDefault = e.preventDefault || preventDefault;
                        e.stopPropagation = e.stopPropagation || stopPropagation;
                        return fn.call(element, e, x, y);
                    };
                    obj.attachEvent("on" + type, f);
                    var detacher = function () {
                        obj.detachEvent("on" + type, f);
                        return true;
                    };
                    return detacher;
                };
            }
        })(),
        drag = [],
        dragMove = function (e) {
            var x = e.clientX,
                y = e.clientY,
                scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                dragi,
                j = drag.length;
            while (j--) {
                dragi = drag[j];
                if (supportsTouch) {
                    var i = e.touches.length,
                        touch;
                    while (i--) {
                        touch = e.touches[i];
                        if (touch.identifier == dragi.el._drag.id) {
                            x = touch.clientX;
                            y = touch.clientY;
                            (e.originalEvent ? e.originalEvent : e).preventDefault();
                            break;
                        }
                    }
                } else {
                    e.preventDefault();
                }
                var node = dragi.el.node,
                    o,
                    next = node.nextSibling,
                    parent = node.parentNode,
                    display = node.style.display;
                g.win.opera && parent.removeChild(node);
                node.style.display = "none";
                o = dragi.el.paper.getElementByPoint(x, y);
                node.style.display = display;
                g.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
                o && eve("raphael.drag.over." + dragi.el.id, dragi.el, o);
                x += scrollX;
                y += scrollY;
                eve("raphael.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
            }
        },
        dragUp = function (e) {
            R.unmousemove(dragMove).unmouseup(dragUp);
            var i = drag.length,
                dragi;
            while (i--) {
                dragi = drag[i];
                dragi.el._drag = {};
                eve("raphael.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
            }
            drag = [];
        },

        elproto = R.el = {};


    for (var i = events.length; i--;) {
        (function (eventName) {
            R[eventName] = elproto[eventName] = function (fn, scope) {
                if (R.is(fn, "function")) {
                    this.events = this.events || [];
                    this.events.push({name: eventName, f: fn, unbind: addEvent(this.shape || this.node || g.doc, eventName, fn, scope || this)});
                }
                return this;
            };
            R["un" + eventName] = elproto["un" + eventName] = function (fn) {
                var events = this.events || [],
                    l = events.length;
                while (l--) if (events[l].name == eventName && events[l].f == fn) {
                    events[l].unbind();
                    events.splice(l, 1);
                    !events.length && delete this.events;
                    return this;
                }
                return this;
            };
        })(events[i]);
    }


    elproto.data = function (key, value) {
        var data = eldata[this.id] = eldata[this.id] || {};
        if (arguments.length == 1) {
            if (R.is(key, "object")) {
                for (var i in key) if (key[has](i)) {
                    this.data(i, key[i]);
                }
                return this;
            }
            eve("raphael.data.get." + this.id, this, data[key], key);
            return data[key];
        }
        data[key] = value;
        eve("raphael.data.set." + this.id, this, value, key);
        return this;
    };

    elproto.removeData = function (key) {
        if (key == null) {
            eldata[this.id] = {};
        } else {
            eldata[this.id] && delete eldata[this.id][key];
        }
        return this;
    };

    elproto.hover = function (f_in, f_out, scope_in, scope_out) {
        return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
    };

    elproto.unhover = function (f_in, f_out) {
        return this.unmouseover(f_in).unmouseout(f_out);
    };
    var draggable = [];

    elproto.drag = function (onmove, onstart, onend, move_scope, start_scope, end_scope) {
        function start(e) {
            (e.originalEvent || e).preventDefault();
            var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
            this._drag.x = e.clientX + scrollX;
            this._drag.y = e.clientY + scrollY;
            this._drag.id = e.identifier;
            !drag.length && R.mousemove(dragMove).mouseup(dragUp);
            drag.push({el: this, move_scope: move_scope, start_scope: start_scope, end_scope: end_scope});
            onstart && eve.on("raphael.drag.start." + this.id, onstart);
            onmove && eve.on("raphael.drag.move." + this.id, onmove);
            onend && eve.on("raphael.drag.end." + this.id, onend);
            eve("raphael.drag.start." + this.id, start_scope || move_scope || this, e.clientX + scrollX, e.clientY + scrollY, e);
        }

        this._drag = {};
        draggable.push({el: this, start: start});
        this.mousedown(start);
        return this;
    };

    elproto.onDragOver = function (f) {
        f ? eve.on("raphael.drag.over." + this.id, f) : eve.unbind("raphael.drag.over." + this.id);
    };

    elproto.undrag = function () {
        var i = draggable.length;
        while (i--) if (draggable[i].el == this) {
            this.unmousedown(draggable[i].start);
            draggable.splice(i, 1);
            eve.unbind("raphael.drag.*." + this.id);
        }
        !draggable.length && R.unmousemove(dragMove).unmouseup(dragUp);
    };

    // 추가(for group 기능)
    paperproto.group = function (x, y) {
        var out = R._engine.group(this, x || 0, y || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };

    paperproto.circle = function (x, y, r) {
        var out = R._engine.circle(this, x || 0, y || 0, r || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };

    paperproto.rect = function (x, y, w, h, r) {
        var out = R._engine.rect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };

    paperproto.ellipse = function (x, y, rx, ry) {
        var out = R._engine.ellipse(this, x || 0, y || 0, rx || 0, ry || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };

    paperproto.path = function (pathString) {
        pathString && !R.is(pathString, string) && !R.is(pathString[0], array) && (pathString += E);
        var out = R._engine.path(R.format[apply](R, arguments), this);
        this.__set__ && this.__set__.push(out);
        return out;
    };

    paperproto.image = function (src, x, y, w, h) {
        var out = R._engine.image(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };

    paperproto.text = function (x, y, text) {
        var out = R._engine.text(this, x || 0, y || 0, Str(text));
        this.__set__ && this.__set__.push(out);
        return out;
    };

    // 추가(for foreignObject 기능)
    paperproto.foreignObject = function (obj, x, y, w, h) {
        var out = R._engine.foreignObject(this, x || 0, y || 0, w || 0, h || 0, obj);
        this.__set__ && this.__set__.push(out);
        return out;
    };

    paperproto.set = function (itemsArray) {
        !R.is(itemsArray, "array") && (itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length));
        var out = new Set(itemsArray);
        this.__set__ && this.__set__.push(out);
        return out;
    };

    paperproto.setStart = function (set) {
        this.__set__ = set || this.set();
    };

    paperproto.setFinish = function (set) {
        var out = this.__set__;
        delete this.__set__;
        return out;
    };

    paperproto.setSize = function (width, height) {
        return R._engine.setSize.call(this, width, height);
    };

    paperproto.setViewBox = function (x, y, w, h, fit) {
        return R._engine.setViewBox.call(this, x, y, w, h, fit);
    };


    paperproto.top = paperproto.bottom = null;

    paperproto.raphael = R;
    var getOffset = function (elem) {
        var box = elem.getBoundingClientRect(),
            doc = elem.ownerDocument,
            body = doc.body,
            docElem = doc.documentElement,
            clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
            top = box.top + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop ) - clientTop,
            left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
        return {
            y: top,
            x: left
        };
    };

    paperproto.getElementByPoint = function (x, y) {
        var paper = this,
            svg = paper.canvas,
            target = g.doc.elementFromPoint(x, y);
        if (g.win.opera && target.tagName == "svg") {
            var so = getOffset(svg),
                sr = svg.createSVGRect();
            sr.x = x - so.x;
            sr.y = y - so.y;
            sr.width = sr.height = 1;
            var hits = svg.getIntersectionList(sr, null);
            if (hits.length) {
                target = hits[hits.length - 1];
            }
        }
        if (!target) {
            return null;
        }
        while (target.parentNode && target != svg.parentNode && !target.raphael) {
            target = target.parentNode;
        }
        target == paper.canvas.parentNode && (target = svg);
        target = target && target.raphael ? paper.getById(target.raphaelid) : null;
        return target;
    };

    paperproto.getById = function (id) {
        var bot = this.bottom;
        while (bot) {
            if (bot.id == id) {
                return bot;
            }
            bot = bot.next;
        }
        return null;
    };

    paperproto.forEach = function (callback, thisArg) {
        var bot = this.bottom;
        while (bot) {
            if (callback.call(thisArg, bot) === false) {
                return this;
            }
            bot = bot.next;
        }
        return this;
    };

    paperproto.getElementsByPoint = function (x, y) {
        var set = this.set();
        this.forEach(function (el) {
            if (el.isPointInside(x, y)) {
                set.push(el);
            }
        });
        return set;
    };
    function x_y() {
        return this.x + S + this.y;
    }

    function x_y_w_h() {
        return this.x + S + this.y + S + this.width + " \xd7 " + this.height;
    }

    elproto.isPointInside = function (x, y) {
        var rp = this.realPath = this.realPath || getPath[this.type](this);
        return R.isPointInsidePath(rp, x, y);
    };

    elproto.getBBox = function (isWithoutTransform) {
        if (this.removed) {
            return {};
        }
        var _ = this._;
        if (isWithoutTransform) {
            if (_.dirty || !_.bboxwt) {
                this.realPath = getPath[this.type](this);
                _.bboxwt = pathDimensions(this.realPath);
                _.bboxwt.toString = x_y_w_h;
                _.dirty = 0;
            }
            return _.bboxwt;
        }
        if (_.dirty || _.dirtyT || !_.bbox) {
            if (_.dirty || !this.realPath) {
                _.bboxwt = 0;
                this.realPath = getPath[this.type](this);
            }
            _.bbox = pathDimensions(mapPath(this.realPath, this.matrix));
            _.bbox.toString = x_y_w_h;
            _.dirty = _.dirtyT = 0;
        }
        return _.bbox;
    };

    elproto.clone = function () {
        if (this.removed) {
            return null;
        }
        var out = this.paper[this.type]().attr(this.attr());
        this.__set__ && this.__set__.push(out);
        return out;
    };

    elproto.glow = function (glow) {
        if (this.type == "text") {
            return null;
        }
        glow = glow || {};
        var s = {
                width: (glow.width || 10) + (+this.attr("stroke-width") || 1),
                fill: glow.fill || false,
                opacity: glow.opacity || .5,
                offsetx: glow.offsetx || 0,
                offsety: glow.offsety || 0,
                color: glow.color || "#000"
            },
            c = s.width / 2,
            r = this.paper,
            out = r.set(),
            path = this.realPath || getPath[this.type](this);
        path = this.matrix ? mapPath(path, this.matrix) : path;
        for (var i = 1; i < c + 1; i++) {
            out.push(r.path(path).attr({
                stroke: s.color,
                fill: s.fill ? s.color : "none",
                "stroke-linejoin": "round",
                "stroke-linecap": "round",
                "stroke-width": +(s.width / c * i).toFixed(3),
                opacity: +(s.opacity / c).toFixed(3)
            }));
        }
        return out.insertBefore(this).translate(s.offsetx, s.offsety);
    };
    var curveslengths = {},
        getPointAtSegmentLength = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
            if (length == null) {
                return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
            } else {
                return R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTatLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
            }
        },
        getLengthFactory = function (istotal, subpath) {
            return function (path, length, onlystart) {
                path = path2curve(path);
                var x, y, p, l, sp = "", subpaths = {}, point,
                    len = 0;
                for (var i = 0, ii = path.length; i < ii; i++) {
                    p = path[i];
                    if (p[0] == "M") {
                        x = +p[1];
                        y = +p[2];
                    } else {
                        l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                        if (len + l > length) {
                            if (subpath && !subpaths.start) {
                                point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                                sp += ["C" + point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y];
                                if (onlystart) {
                                    return sp;
                                }
                                subpaths.start = sp;
                                sp = ["M" + point.x, point.y + "C" + point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]].join();
                                len += l;
                                x = +p[5];
                                y = +p[6];
                                continue;
                            }
                            if (!istotal && !subpath) {
                                point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                                return {x: point.x, y: point.y, alpha: point.alpha};
                            }
                        }
                        len += l;
                        x = +p[5];
                        y = +p[6];
                    }
                    sp += p.shift() + p;
                }
                subpaths.end = sp;
                point = istotal ? len : subpath ? subpaths : R.findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
                point.alpha && (point = {x: point.x, y: point.y, alpha: point.alpha});
                return point;
            };
        };
    var getTotalLength = getLengthFactory(1),
        getPointAtLength = getLengthFactory(),
        getSubpathsAtLength = getLengthFactory(0, 1);

    R.getTotalLength = getTotalLength;

    R.getPointAtLength = getPointAtLength;

    R.getSubpath = function (path, from, to) {
        if (this.getTotalLength(path) - to < 1e-6) {
            return getSubpathsAtLength(path, from).end;
        }
        var a = getSubpathsAtLength(path, to, 1);
        return from ? getSubpathsAtLength(a, from).end : a;
    };

    elproto.getTotalLength = function () {
        if (this.type != "path") {
            return;
        }
        if (this.node.getTotalLength) {
            return this.node.getTotalLength();
        }
        return getTotalLength(this.attrs.path);
    };

    elproto.getPointAtLength = function (length) {
        if (this.type != "path") {
            return;
        }
        return getPointAtLength(this.attrs.path, length);
    };

    elproto.getSubpath = function (from, to) {
        if (this.type != "path") {
            return;
        }
        return R.getSubpath(this.attrs.path, from, to);
    };

    var ef = R.easing_formulas = {
        linear: function (n) {
            return n;
        },
        "<": function (n) {
            return pow(n, 1.7);
        },
        ">": function (n) {
            return pow(n, .48);
        },
        "<>": function (n) {
            var q = .48 - n / 1.04,
                Q = math.sqrt(.1734 + q * q),
                x = Q - q,
                X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1),
                y = -Q - q,
                Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1),
                t = X + Y + .5;
            return (1 - t) * 3 * t * t + t * t * t;
        },
        backIn: function (n) {
            var s = 1.70158;
            return n * n * ((s + 1) * n - s);
        },
        backOut: function (n) {
            n = n - 1;
            var s = 1.70158;
            return n * n * ((s + 1) * n + s) + 1;
        },
        elastic: function (n) {
            if (n == !!n) {
                return n;
            }
            return pow(2, -10 * n) * math.sin((n - .075) * (2 * PI) / .3) + 1;
        },
        bounce: function (n) {
            var s = 7.5625,
                p = 2.75,
                l;
            if (n < (1 / p)) {
                l = s * n * n;
            } else {
                if (n < (2 / p)) {
                    n -= (1.5 / p);
                    l = s * n * n + .75;
                } else {
                    if (n < (2.5 / p)) {
                        n -= (2.25 / p);
                        l = s * n * n + .9375;
                    } else {
                        n -= (2.625 / p);
                        l = s * n * n + .984375;
                    }
                }
            }
            return l;
        }
    };
    ef.easeIn = ef["ease-in"] = ef["<"];
    ef.easeOut = ef["ease-out"] = ef[">"];
    ef.easeInOut = ef["ease-in-out"] = ef["<>"];
    ef["back-in"] = ef.backIn;
    ef["back-out"] = ef.backOut;

    var animationElements = [],
        requestAnimFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                setTimeout(callback, 16);
            },
        animation = function () {
            var Now = +new Date,
                l = 0;
            for (; l < animationElements.length; l++) {
                var e = animationElements[l];
                if (e.el.removed || e.paused) {
                    continue;
                }
                var time = Now - e.start,
                    ms = e.ms,
                    easing = e.easing,
                    from = e.from,
                    diff = e.diff,
                    to = e.to,
                    t = e.t,
                    that = e.el,
                    set = {},
                    now,
                    init = {},
                    key;
                if (e.initstatus) {
                    time = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * ms;
                    e.status = e.initstatus;
                    delete e.initstatus;
                    e.stop && animationElements.splice(l--, 1);
                } else {
                    e.status = (e.prev + (e.percent - e.prev) * (time / ms)) / e.anim.top;
                }
                if (time < 0) {
                    continue;
                }
                if (time < ms) {
                    var pos = easing(time / ms);
                    for (var attr in from) if (from[has](attr)) {
                        switch (availableAnimAttrs[attr]) {
                            case nu:
                                now = +from[attr] + pos * ms * diff[attr];
                                break;
                            case "colour":
                                now = "rgb(" + [
                                    upto255(round(from[attr].r + pos * ms * diff[attr].r)),
                                    upto255(round(from[attr].g + pos * ms * diff[attr].g)),
                                    upto255(round(from[attr].b + pos * ms * diff[attr].b))
                                ].join(",") + ")";
                                break;
                            case "path":
                                now = [];
                                for (var i = 0, ii = from[attr].length; i < ii; i++) {
                                    now[i] = [from[attr][i][0]];
                                    for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                        now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j];
                                    }
                                    now[i] = now[i].join(S);
                                }
                                now = now.join(S);
                                break;
                            case "transform":
                                if (diff[attr].real) {
                                    now = [];
                                    for (i = 0, ii = from[attr].length; i < ii; i++) {
                                        now[i] = [from[attr][i][0]];
                                        for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                            now[i][j] = from[attr][i][j] + pos * ms * diff[attr][i][j];
                                        }
                                    }
                                } else {
                                    var get = function (i) {
                                        return +from[attr][i] + pos * ms * diff[attr][i];
                                    };
                                    // now = [["r", get(2), 0, 0], ["t", get(3), get(4)], ["s", get(0), get(1), 0, 0]];
                                    now = [
                                        ["m", get(0), get(1), get(2), get(3), get(4), get(5)]
                                    ];
                                }
                                break;
                            case "csv":
                                if (attr == "clip-rect") {
                                    now = [];
                                    i = 4;
                                    while (i--) {
                                        now[i] = +from[attr][i] + pos * ms * diff[attr][i];
                                    }
                                }
                                break;
                            default:
                                var from2 = [][concat](from[attr]);
                                now = [];
                                i = that.paper.customAttributes[attr].length;
                                while (i--) {
                                    now[i] = +from2[i] + pos * ms * diff[attr][i];
                                }
                                break;
                        }
                        set[attr] = now;
                    }
                    that.attr(set);
                    (function (id, that, anim) {
                        setTimeout(function () {
                            eve("raphael.anim.frame." + id, that, anim);
                        });
                    })(that.id, that, e.anim);
                } else {
                    (function (f, el, a) {
                        setTimeout(function () {
                            eve("raphael.anim.frame." + el.id, el, a);
                            eve("raphael.anim.finish." + el.id, el, a);
                            R.is(f, "function") && f.call(el);
                        });
                    })(e.callback, that, e.anim);
                    that.attr(to);
                    animationElements.splice(l--, 1);
                    if (e.repeat > 1 && !e.next) {
                        for (key in to) if (to[has](key)) {
                            init[key] = e.totalOrigin[key];
                        }
                        e.el.attr(init);
                        runAnimation(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1);
                    }
                    if (e.next && !e.stop) {
                        runAnimation(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat);
                    }
                }
            }
            R.svg && that && that.paper && that.paper.safari();
            animationElements.length && requestAnimFrame(animation);
        },
        upto255 = function (color) {
            return color > 255 ? 255 : color < 0 ? 0 : color;
        };

    elproto.animateWith = function (el, anim, params, ms, easing, callback) {
        var element = this;
        if (element.removed) {
            callback && callback.call(element);
            return element;
        }
        var a = params instanceof Animation ? params : R.animation(params, ms, easing, callback),
            x, y;
        runAnimation(a, element, a.percents[0], null, element.attr());
        for (var i = 0, ii = animationElements.length; i < ii; i++) {
            if (animationElements[i].anim == anim && animationElements[i].el == el) {
                animationElements[ii - 1].start = animationElements[i].start;
                break;
            }
        }
        return element;
        //
        //
        // var a = params ? R.animation(params, ms, easing, callback) : anim,
        //     status = element.status(anim);
        // return this.animate(a).status(a, status * anim.ms / a.ms);
    };
    function CubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
        var cx = 3 * p1x,
            bx = 3 * (p2x - p1x) - cx,
            ax = 1 - cx - bx,
            cy = 3 * p1y,
            by = 3 * (p2y - p1y) - cy,
            ay = 1 - cy - by;

        function sampleCurveX(t) {
            return ((ax * t + bx) * t + cx) * t;
        }

        function solve(x, epsilon) {
            var t = solveCurveX(x, epsilon);
            return ((ay * t + by) * t + cy) * t;
        }

        function solveCurveX(x, epsilon) {
            var t0, t1, t2, x2, d2, i;
            for (t2 = x, i = 0; i < 8; i++) {
                x2 = sampleCurveX(t2) - x;
                if (abs(x2) < epsilon) {
                    return t2;
                }
                d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
                if (abs(d2) < 1e-6) {
                    break;
                }
                t2 = t2 - x2 / d2;
            }
            t0 = 0;
            t1 = 1;
            t2 = x;
            if (t2 < t0) {
                return t0;
            }
            if (t2 > t1) {
                return t1;
            }
            while (t0 < t1) {
                x2 = sampleCurveX(t2);
                if (abs(x2 - x) < epsilon) {
                    return t2;
                }
                if (x > x2) {
                    t0 = t2;
                } else {
                    t1 = t2;
                }
                t2 = (t1 - t0) / 2 + t0;
            }
            return t2;
        }

        return solve(t, 1 / (200 * duration));
    }

    elproto.onAnimation = function (f) {
        f ? eve.on("raphael.anim.frame." + this.id, f) : eve.unbind("raphael.anim.frame." + this.id);
        return this;
    };
    function Animation(anim, ms) {
        var percents = [],
            newAnim = {};
        this.ms = ms;
        this.times = 1;
        if (anim) {
            for (var attr in anim) if (anim[has](attr)) {
                newAnim[toFloat(attr)] = anim[attr];
                percents.push(toFloat(attr));
            }
            percents.sort(sortByNumber);
        }
        this.anim = newAnim;
        this.top = percents[percents.length - 1];
        this.percents = percents;
    }

    Animation.prototype.delay = function (delay) {
        var a = new Animation(this.anim, this.ms);
        a.times = this.times;
        a.del = +delay || 0;
        return a;
    };

    Animation.prototype.repeat = function (times) {
        var a = new Animation(this.anim, this.ms);
        a.del = this.del;
        a.times = math.floor(mmax(times, 0)) || 1;
        return a;
    };
    function runAnimation(anim, element, percent, status, totalOrigin, times) {
        percent = toFloat(percent);
        var params,
            isInAnim,
            isInAnimSet,
            percents = [],
            next,
            prev,
            timestamp,
            ms = anim.ms,
            from = {},
            to = {},
            diff = {};
        if (status) {
            for (i = 0, ii = animationElements.length; i < ii; i++) {
                var e = animationElements[i];
                if (e.el.id == element.id && e.anim == anim) {
                    if (e.percent != percent) {
                        animationElements.splice(i, 1);
                        isInAnimSet = 1;
                    } else {
                        isInAnim = e;
                    }
                    element.attr(e.totalOrigin);
                    break;
                }
            }
        } else {
            status = +to; // NaN
        }
        for (var i = 0, ii = anim.percents.length; i < ii; i++) {
            if (anim.percents[i] == percent || anim.percents[i] > status * anim.top) {
                percent = anim.percents[i];
                prev = anim.percents[i - 1] || 0;
                ms = ms / anim.top * (percent - prev);
                next = anim.percents[i + 1];
                params = anim.anim[percent];
                break;
            } else if (status) {
                element.attr(anim.anim[anim.percents[i]]);
            }
        }
        if (!params) {
            return;
        }
        if (!isInAnim) {
            for (var attr in params) if (params[has](attr)) {
                if (availableAnimAttrs[has](attr) || element.paper.customAttributes[has](attr)) {
                    from[attr] = element.attr(attr);
                    (from[attr] == null) && (from[attr] = availableAttrs[attr]);
                    to[attr] = params[attr];
                    switch (availableAnimAttrs[attr]) {
                        case nu:
                            diff[attr] = (to[attr] - from[attr]) / ms;
                            break;
                        case "colour":
                            from[attr] = R.getRGB(from[attr]);
                            var toColour = R.getRGB(to[attr]);
                            diff[attr] = {
                                r: (toColour.r - from[attr].r) / ms,
                                g: (toColour.g - from[attr].g) / ms,
                                b: (toColour.b - from[attr].b) / ms
                            };
                            break;
                        case "path":
                            var pathes = path2curve(from[attr], to[attr]),
                                toPath = pathes[1];
                            from[attr] = pathes[0];
                            diff[attr] = [];
                            for (i = 0, ii = from[attr].length; i < ii; i++) {
                                diff[attr][i] = [0];
                                for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                    diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms;
                                }
                            }
                            break;
                        case "transform":
                            var _ = element._,
                                eq = equaliseTransform(_[attr], to[attr]);
                            if (eq) {
                                from[attr] = eq.from;
                                to[attr] = eq.to;
                                diff[attr] = [];
                                diff[attr].real = true;
                                for (i = 0, ii = from[attr].length; i < ii; i++) {
                                    diff[attr][i] = [from[attr][i][0]];
                                    for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                        diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms;
                                    }
                                }
                            } else {
                                var m = (element.matrix || new Matrix),
                                    to2 = {
                                        _: {transform: _.transform},
                                        getBBox: function () {
                                            return element.getBBox(1);
                                        }
                                    };
                                from[attr] = [
                                    m.a,
                                    m.b,
                                    m.c,
                                    m.d,
                                    m.e,
                                    m.f
                                ];
                                extractTransform(to2, to[attr]);
                                to[attr] = to2._.transform;
                                diff[attr] = [
                                    (to2.matrix.a - m.a) / ms,
                                    (to2.matrix.b - m.b) / ms,
                                    (to2.matrix.c - m.c) / ms,
                                    (to2.matrix.d - m.d) / ms,
                                    (to2.matrix.e - m.e) / ms,
                                    (to2.matrix.f - m.f) / ms
                                ];
                                // from[attr] = [_.sx, _.sy, _.deg, _.dx, _.dy];
                                // var to2 = {_:{}, getBBox: function () { return element.getBBox(); }};
                                // extractTransform(to2, to[attr]);
                                // diff[attr] = [
                                //     (to2._.sx - _.sx) / ms,
                                //     (to2._.sy - _.sy) / ms,
                                //     (to2._.deg - _.deg) / ms,
                                //     (to2._.dx - _.dx) / ms,
                                //     (to2._.dy - _.dy) / ms
                                // ];
                            }
                            break;
                        case "csv":
                            var values = Str(params[attr])[split](separator),
                                from2 = Str(from[attr])[split](separator);
                            if (attr == "clip-rect") {
                                from[attr] = from2;
                                diff[attr] = [];
                                i = from2.length;
                                while (i--) {
                                    diff[attr][i] = (values[i] - from[attr][i]) / ms;
                                }
                            }
                            to[attr] = values;
                            break;
                        default:
                            values = [][concat](params[attr]);
                            from2 = [][concat](from[attr]);
                            diff[attr] = [];
                            i = element.paper.customAttributes[attr].length;
                            while (i--) {
                                diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms;
                            }
                            break;
                    }
                }
            }
            var easing = params.easing,
                easyeasy = R.easing_formulas[easing];
            if (!easyeasy) {
                easyeasy = Str(easing).match(bezierrg);
                if (easyeasy && easyeasy.length == 5) {
                    var curve = easyeasy;
                    easyeasy = function (t) {
                        return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms);
                    };
                } else {
                    easyeasy = pipe;
                }
            }
            timestamp = params.start || anim.start || +new Date;
            e = {
                anim: anim,
                percent: percent,
                timestamp: timestamp,
                start: timestamp + (anim.del || 0),
                status: 0,
                initstatus: status || 0,
                stop: false,
                ms: ms,
                easing: easyeasy,
                from: from,
                diff: diff,
                to: to,
                el: element,
                callback: params.callback,
                prev: prev,
                next: next,
                repeat: times || anim.times,
                origin: element.attr(),
                totalOrigin: totalOrigin
            };
            animationElements.push(e);
            if (status && !isInAnim && !isInAnimSet) {
                e.stop = true;
                e.start = new Date - ms * status;
                if (animationElements.length == 1) {
                    return animation();
                }
            }
            if (isInAnimSet) {
                e.start = new Date - e.ms * status;
            }
            animationElements.length == 1 && requestAnimFrame(animation);
        } else {
            isInAnim.initstatus = status;
            isInAnim.start = new Date - isInAnim.ms * status;
        }
        eve("raphael.anim.start." + element.id, element, anim);
    }

    R.animation = function (params, ms, easing, callback) {
        if (params instanceof Animation) {
            return params;
        }
        if (R.is(easing, "function") || !easing) {
            callback = callback || easing || null;
            easing = null;
        }
        params = Object(params);
        ms = +ms || 0;
        var p = {},
            json,
            attr;
        for (attr in params) if (params[has](attr) && toFloat(attr) != attr && toFloat(attr) + "%" != attr) {
            json = true;
            p[attr] = params[attr];
        }
        if (!json) {
            return new Animation(params, ms);
        } else {
            easing && (p.easing = easing);
            callback && (p.callback = callback);
            return new Animation({100: p}, ms);
        }
    };

    elproto.animate = function (params, ms, easing, callback) {
        var element = this;
        if (element.removed) {
            callback && callback.call(element);
            return element;
        }
        var anim = params instanceof Animation ? params : R.animation(params, ms, easing, callback);
        runAnimation(anim, element, anim.percents[0], null, element.attr());
        return element;
    };

    elproto.setTime = function (anim, value) {
        if (anim && value != null) {
            this.status(anim, mmin(value, anim.ms) / anim.ms);
        }
        return this;
    };

    elproto.status = function (anim, value) {
        var out = [],
            i = 0,
            len,
            e;
        if (value != null) {
            runAnimation(anim, this, -1, mmin(value, 1));
            return this;
        } else {
            len = animationElements.length;
            for (; i < len; i++) {
                e = animationElements[i];
                if (e.el.id == this.id && (!anim || e.anim == anim)) {
                    if (anim) {
                        return e.status;
                    }
                    out.push({
                        anim: e.anim,
                        status: e.status
                    });
                }
            }
            if (anim) {
                return 0;
            }
            return out;
        }
    };

    elproto.pause = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            if (eve("raphael.anim.pause." + this.id, this, animationElements[i].anim) !== false) {
                animationElements[i].paused = true;
            }
        }
        return this;
    };

    elproto.resume = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            var e = animationElements[i];
            if (eve("raphael.anim.resume." + this.id, this, e.anim) !== false) {
                delete e.paused;
                this.status(e.anim, e.status);
            }
        }
        return this;
    };

    elproto.stop = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            if (eve("raphael.anim.stop." + this.id, this, animationElements[i].anim) !== false) {
                animationElements.splice(i--, 1);
            }
        }
        return this;
    };
    function stopAnimation(paper) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.paper == paper) {
            animationElements.splice(i--, 1);
        }
    }

    eve.on("raphael.remove", stopAnimation);
    eve.on("raphael.clear", stopAnimation);
    elproto.toString = function () {
        return "Rapha\xebl\u2019s object";
    };

    // Set
    var Set = function (items) {
            this.items = [];
            this.length = 0;
            this.type = "set";
            if (items) {
                for (var i = 0, ii = items.length; i < ii; i++) {
                    if (items[i] && (items[i].constructor == elproto.constructor || items[i].constructor == Set)) {
                        this[this.items.length] = this.items[this.items.length] = items[i];
                        this.length++;
                    }
                }
            }
        },
        setproto = Set.prototype;

    setproto.push = function () {
        var item,
            len;
        for (var i = 0, ii = arguments.length; i < ii; i++) {
            item = arguments[i];
            if (item && (item.constructor == elproto.constructor || item.constructor == Set)) {
                len = this.items.length;
                this[len] = this.items[len] = item;
                this.length++;
            }
        }
        return this;
    };

    setproto.pop = function () {
        this.length && delete this[this.length--];
        return this.items.pop();
    };

    setproto.forEach = function (callback, thisArg) {
        for (var i = 0, ii = this.items.length; i < ii; i++) {
            if (callback.call(thisArg, this.items[i], i) === false) {
                return this;
            }
        }
        return this;
    };
    for (var method in elproto) if (elproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname][apply](el, arg);
                });
            };
        })(method);
    }
    setproto.attr = function (name, value) {
        if (name && R.is(name, array) && R.is(name[0], "object")) {
            for (var j = 0, jj = name.length; j < jj; j++) {
                this.items[j].attr(name[j]);
            }
        } else {
            for (var i = 0, ii = this.items.length; i < ii; i++) {
                this.items[i].attr(name, value);
            }
        }
        return this;
    };

    setproto.clear = function () {
        while (this.length) {
            this.pop();
        }
    };

    setproto.splice = function (index, count, insertion) {
        index = index < 0 ? mmax(this.length + index, 0) : index;
        count = mmax(0, mmin(this.length - index, count));
        var tail = [],
            todel = [],
            args = [],
            i;
        for (i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        for (i = 0; i < count; i++) {
            todel.push(this[index + i]);
        }
        for (; i < this.length - index; i++) {
            tail.push(this[index + i]);
        }
        var arglen = args.length;
        for (i = 0; i < arglen + tail.length; i++) {
            this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen];
        }
        i = this.items.length = this.length -= count - arglen;
        while (this[i]) {
            delete this[i++];
        }
        return new Set(todel);
    };

    setproto.exclude = function (el) {
        for (var i = 0, ii = this.length; i < ii; i++) if (this[i] == el) {
            this.splice(i, 1);
            return true;
        }
    };
    setproto.animate = function (params, ms, easing, callback) {
        (R.is(easing, "function") || !easing) && (callback = easing || null);
        var len = this.items.length,
            i = len,
            item,
            set = this,
            collector;
        if (!len) {
            return this;
        }
        callback && (collector = function () {
            !--len && callback.call(set);
        });
        easing = R.is(easing, string) ? easing : collector;
        var anim = R.animation(params, ms, easing, collector);
        item = this.items[--i].animate(anim);
        while (i--) {
            this.items[i] && !this.items[i].removed && this.items[i].animateWith(item, anim, anim);
        }
        return this;
    };
    setproto.insertAfter = function (el) {
        var i = this.items.length;
        while (i--) {
            this.items[i].insertAfter(el);
        }
        return this;
    };
    setproto.getBBox = function () {
        var x = [],
            y = [],
            x2 = [],
            y2 = [];
        for (var i = this.items.length; i--;) if (!this.items[i].removed) {
            var box = this.items[i].getBBox();
            x.push(box.x);
            y.push(box.y);
            x2.push(box.x + box.width);
            y2.push(box.y + box.height);
        }
        x = mmin[apply](0, x);
        y = mmin[apply](0, y);
        x2 = mmax[apply](0, x2);
        y2 = mmax[apply](0, y2);
        return {
            x: x,
            y: y,
            x2: x2,
            y2: y2,
            width: x2 - x,
            height: y2 - y
        };
    };
    setproto.clone = function (s) {
        s = new Set;
        for (var i = 0, ii = this.items.length; i < ii; i++) {
            s.push(this.items[i].clone());
        }
        return s;
    };
    setproto.toString = function () {
        return "Rapha\xebl\u2018s set";
    };


    R.registerFont = function (font) {
        if (!font.face) {
            return font;
        }
        this.fonts = this.fonts || {};
        var fontcopy = {
                w: font.w,
                face: {},
                glyphs: {}
            },
            family = font.face["font-family"];
        for (var prop in font.face) if (font.face[has](prop)) {
            fontcopy.face[prop] = font.face[prop];
        }
        if (this.fonts[family]) {
            this.fonts[family].push(fontcopy);
        } else {
            this.fonts[family] = [fontcopy];
        }
        if (!font.svg) {
            fontcopy.face["units-per-em"] = toInt(font.face["units-per-em"], 10);
            for (var glyph in font.glyphs) if (font.glyphs[has](glyph)) {
                var path = font.glyphs[glyph];
                fontcopy.glyphs[glyph] = {
                    w: path.w,
                    k: {},
                    d: path.d && "M" + path.d.replace(/[mlcxtrv]/g, function (command) {
                        return {l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[command] || "M";
                    }) + "z"
                };
                if (path.k) {
                    for (var k in path.k) if (path[has](k)) {
                        fontcopy.glyphs[glyph].k[k] = path.k[k];
                    }
                }
            }
        }
        return font;
    };

    paperproto.getFont = function (family, weight, style, stretch) {
        stretch = stretch || "normal";
        style = style || "normal";
        weight = +weight || {normal: 400, bold: 700, lighter: 300, bolder: 800}[weight] || 400;
        if (!R.fonts) {
            return;
        }
        var font = R.fonts[family];
        if (!font) {
            var name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i");
            for (var fontName in R.fonts) if (R.fonts[has](fontName)) {
                if (name.test(fontName)) {
                    font = R.fonts[fontName];
                    break;
                }
            }
        }
        var thefont;
        if (font) {
            for (var i = 0, ii = font.length; i < ii; i++) {
                thefont = font[i];
                if (thefont.face["font-weight"] == weight && (thefont.face["font-style"] == style || !thefont.face["font-style"]) && thefont.face["font-stretch"] == stretch) {
                    break;
                }
            }
        }
        return thefont;
    };

    paperproto.print = function (x, y, string, font, size, origin, letter_spacing) {
        origin = origin || "middle"; // baseline|middle
        letter_spacing = mmax(mmin(letter_spacing || 0, 1), -1);
        var letters = Str(string)[split](E),
            shift = 0,
            notfirst = 0,
            path = E,
            scale;
        R.is(font, string) && (font = this.getFont(font));
        if (font) {
            scale = (size || 16) / font.face["units-per-em"];
            var bb = font.face.bbox[split](separator),
                top = +bb[0],
                lineHeight = bb[3] - bb[1],
                shifty = 0,
                height = +bb[1] + (origin == "baseline" ? lineHeight + (+font.face.descent) : lineHeight / 2);
            for (var i = 0, ii = letters.length; i < ii; i++) {
                if (letters[i] == "\n") {
                    shift = 0;
                    curr = 0;
                    notfirst = 0;
                    shifty += lineHeight;
                } else {
                    var prev = notfirst && font.glyphs[letters[i - 1]] || {},
                        curr = font.glyphs[letters[i]];
                    shift += notfirst ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + (font.w * letter_spacing) : 0;
                    notfirst = 1;
                }
                if (curr && curr.d) {
                    path += R.transformPath(curr.d, ["t", shift * scale, shifty * scale, "s", scale, scale, top, height, "t", (x - top) / scale, (y - height) / scale]);
                }
            }
        }
        return this.path(path).attr({
            fill: "#000",
            stroke: "none"
        });
    };


    paperproto.add = function (json) {
        if (R.is(json, "array")) {
            var res = this.set(),
                i = 0,
                ii = json.length,
                j;
            for (; i < ii; i++) {
                j = json[i] || {};
                elements[has](j.type) && res.push(this[j.type]().attr(j));
            }
        }
        return res;
    };


    R.format = function (token, params) {
        var args = R.is(params, array) ? [0][concat](params) : arguments;
        token && R.is(token, string) && args.length - 1 && (token = token.replace(formatrg, function (str, i) {
            return args[++i] == null ? E : args[i];
        }));
        return token || E;
    };

    R.fullfill = (function () {
        var tokenRegex = /\{([^\}]+)\}/g,
            objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, // matches .xxxxx or ["xxxxx"] to run over object properties
            replacer = function (all, key, obj) {
                var res = obj;
                key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
                    name = name || quotedName;
                    if (res) {
                        if (name in res) {
                            res = res[name];
                        }
                        typeof res == "function" && isFunc && (res = res());
                    }
                });
                res = (res == null || res == obj ? all : res) + "";
                return res;
            };
        return function (str, obj) {
            return String(str).replace(tokenRegex, function (all, key) {
                return replacer(all, key, obj);
            });
        };
    })();

    R.ninja = function () {
        oldRaphael.was ? (g.win.Raphael = oldRaphael.is) : delete Raphael;
        return R;
    };

    R.st = setproto;
    // Firefox <3.6 fix: http://webreflection.blogspot.com/2009/11/195-chars-to-help-lazy-loading.html
    (function (doc, loaded, f) {
        if (doc.readyState == null && doc.addEventListener) {
            doc.addEventListener(loaded, f = function () {
                doc.removeEventListener(loaded, f, false);
                doc.readyState = "complete";
            }, false);
            doc.readyState = "loading";
        }
        function isLoaded() {
            (/in/).test(doc.readyState) ? setTimeout(isLoaded, 9) : R.eve("raphael.DOMload");
        }

        isLoaded();
    })(document, "DOMContentLoaded");

    oldRaphael.was ? (g.win.Raphael = R) : (Raphael = R);

    eve.on("raphael.DOMload", function () {
        loaded = true;
    });
})();


// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël - JavaScript Vector Library                                 │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ SVG Module                                                          │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
window.Raphael.svg && function (R) {
    var has = "hasOwnProperty",
        Str = String,
        toFloat = parseFloat,
        toInt = parseInt,
        math = Math,
        mmax = math.max,
        abs = math.abs,
        pow = math.pow,
        separator = /[, ]+/,
        eve = R.eve,
        E = "",
        S = " ";
    var xlink = "http://www.w3.org/1999/xlink",
        markers = {
            block: "M5,0 0,2.5 5,5z",
            open_block: "M5,0 0,2.5 5,5z",
            classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
            diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
            open_diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
            open: "M6,1 1,3.5 6,6",
            oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z",
            open_oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
        },
        markerCounter = {};
    R.toString = function () {
        return  "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version;
    };
    var $ = function (el, attr) {
            if (attr) {
                if (typeof el == "string") {
                    el = $(el);
                }
                for (var key in attr) if (attr[has](key)) {
                    if (key.substring(0, 6) == "xlink:") {
                        el.setAttributeNS(xlink, key.substring(6), Str(attr[key]));
                    } else {
                        el.setAttribute(key, Str(attr[key]));
                    }
                }
            } else {
                el = R._g.doc.createElementNS("http://www.w3.org/2000/svg", el);
                el.style && (el.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
            }
            return el;
        },
        addGradientFill = function (element, gradient) {
            var type = "linear",
                id = element.id + gradient,
                fx = .5, fy = .5,
                o = element.node,
                SVG = element.paper,
                s = o.style,
                el = R._g.doc.getElementById(id);
            if (!el) {
                gradient = Str(gradient).replace(R._radial_gradient, function (all, _fx, _fy) {
                    type = "radial";
                    if (_fx && _fy) {
                        fx = toFloat(_fx);
                        fy = toFloat(_fy);
                        var dir = ((fy > .5) * 2 - 1);
                        pow(fx - .5, 2) + pow(fy - .5, 2) > .25 &&
                            (fy = math.sqrt(.25 - pow(fx - .5, 2)) * dir + .5) &&
                            fy != .5 &&
                        (fy = fy.toFixed(5) - 1e-5 * dir);
                    }
                    return E;
                });
                gradient = gradient.split(/\s*\-\s*/);
                if (type == "linear") {
                    var angle = gradient.shift();
                    angle = -toFloat(angle);
                    if (isNaN(angle)) {
                        return null;
                    }
                    var vector = [0, 0, math.cos(R.rad(angle)), math.sin(R.rad(angle))],
                        max = 1 / (mmax(abs(vector[2]), abs(vector[3])) || 1);
                    vector[2] *= max;
                    vector[3] *= max;
                    if (vector[2] < 0) {
                        vector[0] = -vector[2];
                        vector[2] = 0;
                    }
                    if (vector[3] < 0) {
                        vector[1] = -vector[3];
                        vector[3] = 0;
                    }
                }
                var dots = R._parseDots(gradient);
                if (!dots) {
                    return null;
                }
                id = id.replace(/[\(\)\s,\xb0#]/g, "_");

                if (element.gradient && id != element.gradient.id) {
                    SVG.defs.removeChild(element.gradient);
                    delete element.gradient;
                }

                if (!element.gradient) {
                    el = $(type + "Gradient", {id: id});
                    element.gradient = el;
                    $(el, type == "radial" ? {
                        fx: fx,
                        fy: fy
                    } : {
                        x1: vector[0],
                        y1: vector[1],
                        x2: vector[2],
                        y2: vector[3],
                        gradientTransform: element.matrix.invert()
                    });
                    SVG.defs.appendChild(el);
                    for (var i = 0, ii = dots.length; i < ii; i++) {
                        el.appendChild($("stop", {
                            offset: dots[i].offset ? dots[i].offset : i ? "100%" : "0%",
                            "stop-color": dots[i].color || "#fff"
                        }));
                    }
                }
            }
            $(o, {
                fill: "url(#" + id + ")",
                opacity: 1,
                "fill-opacity": 1
            });
            s.fill = E;
            s.opacity = 1;
            s.fillOpacity = 1;
            return 1;
        },
        updatePosition = function (o) {
            var bbox = o.getBBox(1);
            $(o.pattern, {patternTransform: o.matrix.invert() + " translate(" + bbox.x + "," + bbox.y + ")"});
        },
        addArrow = function (o, value, isEnd) {
            if (o.type == "path") {
                var values = Str(value).toLowerCase().split("-"),
                    p = o.paper,
                    se = isEnd ? "end" : "start",
                    node = o.node,
                    attrs = o.attrs,
                    stroke = attrs["stroke-width"],
                    i = values.length,
                    type = "classic",
                    from,
                    to,
                    dx,
                    refX,
                    attr,
                    marker_stroke_width = stroke / 2 ,
                    w = 7,
                    h = 7,
                    t = 5;
                while (i--) {
                    switch (values[i]) {
                        case "block":
                        case "open_block":
                        case "classic":
                        case "oval":
                        case "open_oval":
                        case "diamond":
                        case "open_diamond":
                        case "open":
                        case "none":
                            type = values[i];
                            break;
                        case "wide":
                            h = 10;
                            break;
                        case "narrow":
                            h = 5;
                            break;
                        case "long":
                            w = 10;
                            break;
                        case "short":
                            w = 5;
                            break;
                    }
                }
                if (type == "open") {
                    w += 2;
                    h += 2;
                    t += 2;
                    dx = 1;
                    refX = isEnd ? w - 2 : 1;
                    attr = {
                        fill: "none",
                        stroke: attrs.stroke,
                        'stroke-dasharray': 0
                    };
                } else if (type == 'open_block' || type == 'open_diamond' || type == 'open_oval') {
                    refX = dx = w / 2;
                    attr = {
                        fill: 'white',
                        'fill-opacity': 1,
                        stroke: attrs.stroke,
                        'stroke-dasharray': 0
                    };
                } else {
                    refX = dx = w / 2;
                    attr = {
                        fill: attrs.stroke,
                        stroke: "none"
                    };
                }
                if (o._.arrows) {
                    if (isEnd) {
                        o._.arrows.endPath && markerCounter[o._.arrows.endPath]--;
                        o._.arrows.endMarker && markerCounter[o._.arrows.endMarker]--;
                    } else {
                        o._.arrows.startPath && markerCounter[o._.arrows.startPath]--;
                        o._.arrows.startMarker && markerCounter[o._.arrows.startMarker]--;
                    }
                } else {
                    o._.arrows = {};
                }
                if (type != "none") {
                    var pathId = "raphael-marker-" + type,
                        markerId = "raphael-marker-" + se + type + w + h;
                    if (!R._g.doc.getElementById(pathId)) {
                        p.defs.appendChild($($("path"), {
                            "stroke-linecap": "round",
                            d: markers[type],
                            id: pathId
                        }));
                        markerCounter[pathId] = 1;
                    } else {
                        markerCounter[pathId]++;
                    }
                    var marker = R._g.doc.getElementById(markerId),
                        use;
                    if (!marker) {
                        marker = $($("marker"), {
                            id: markerId,
                            markerHeight: h,
                            markerWidth: w,
                            orient: "auto",
                            refX: refX,
                            refY: h / 2
                        });
                        use = $($("use"), {
                            "xlink:href": "#" + pathId,
                            transform: (isEnd ? "rotate(180 " + w / 2 + " " + h / 2 + ") " : E) + "scale(" + w / t + "," + h / t + ")",
//                        transform: (isEnd ? "rotate(180 " + (w-marker_stroke_width) / 2 + " " + (h-marker_stroke_width) / 2 + ") " : E) + "scale(" + (w-stroke*2) / t + "," + (h-stroke*2) / t + ")" + " translate(" + marker_stroke_width + "," + marker_stroke_width +")",
                            "stroke-width": (1 / ((w / t + h / t) / 2)).toFixed(4)
//                        "stroke-width": marker_stroke_width
                        });
                        marker.appendChild(use);
                        p.defs.appendChild(marker);
                        markerCounter[markerId] = 1;
                    } else {
                        markerCounter[markerId]++;
                        use = marker.getElementsByTagName("use")[0];
                    }
                    $(use, attr);
//                var delta = dx * (type != "diamond" && type != "oval" && type != "open_diamond" && type != "open_oval");
//                var delta = dx * (type != "diamond" && type != "oval");
                    var delta = dx;
                    if (isEnd) {
                        from = o._.arrows.startdx * stroke || 0;
                        to = R.getTotalLength(attrs.path) - delta * stroke;
                    } else {
                        from = delta * stroke;
                        to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                    }
                    attr = {};
                    attr["marker-" + se] = "url(#" + markerId + ")";
                    if (to || from) {
                        attr.d = Raphael.getSubpath(attrs.path, from, to);
                    }
                    $(node, attr);
                    o._.arrows[se + "Path"] = pathId;
                    o._.arrows[se + "Marker"] = markerId;
                    o._.arrows[se + "dx"] = delta;
                    o._.arrows[se + "Type"] = type;
                    o._.arrows[se + "String"] = value;
                } else {
                    if (isEnd) {
                        from = o._.arrows.startdx * stroke || 0;
                        to = R.getTotalLength(attrs.path) - from;
                    } else {
                        from = 0;
                        to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                    }
                    o._.arrows[se + "Path"] && $(node, {d: Raphael.getSubpath(attrs.path, from, to)});
                    delete o._.arrows[se + "Path"];
                    delete o._.arrows[se + "Marker"];
                    delete o._.arrows[se + "dx"];
                    delete o._.arrows[se + "Type"];
                    delete o._.arrows[se + "String"];
                }
                for (attr in markerCounter) if (markerCounter[has](attr) && !markerCounter[attr]) {
                    var item = R._g.doc.getElementById(attr);
                    item && item.parentNode.removeChild(item);
                }
            }
        },
        dasharray = {
            "": [0],
            "none": [0],
            "-": [3, 1],
            ".": [1, 1],
            "-.": [3, 1, 1, 1],
            "-..": [3, 1, 1, 1, 1, 1],
            ". ": [1, 3],
            "- ": [4, 3],
            "--": [8, 3],
            "- .": [4, 3, 1, 3],
            "--.": [8, 3, 1, 3],
            "--..": [8, 3, 1, 3, 1, 3]
        },
        addDashes = function (o, value, params) {
            value = dasharray[Str(value).toLowerCase()];
            if (value) {
                var width = o.attrs["stroke-width"] || "1",
                    butt = {round: width, square: width, butt: 0}[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
                    dashes = [],
                    i = value.length;
                while (i--) {
                    dashes[i] = value[i] * width + ((i % 2) ? 1 : -1) * butt;
                }
                $(o.node, {"stroke-dasharray": dashes.join(",")});
            }
        },
        setFillAndStroke = function (o, params) {
            var node = o.node,
                attrs = o.attrs,
                vis = node.style.visibility;
            node.style.visibility = "hidden";
            for (var att in params) {
                if (params[has](att)) {
                    if (!R._availableAttrs[has](att)) {
                        continue;
                    }
                    var value = params[att];
                    attrs[att] = value;
                    switch (att) {
                        case "blur":
                            o.blur(value);
                            break;
                        case "href":
                        case "title":
                        case "target":
                            var pn = node.parentNode;
                            if (pn.tagName.toLowerCase() != "a") {
                                var hl = $("a");
                                pn.insertBefore(hl, node);
                                hl.appendChild(node);
                                pn = hl;
                            }
                            if (att == "target") {
                                pn.setAttributeNS(xlink, "show", value == "blank" ? "new" : value);
                            } else {
                                pn.setAttributeNS(xlink, att, value);
                            }
                            break;
                        case "cursor":
                            node.style.cursor = value;
                            break;
                        case "transform":
                            o.transform(value);
                            break;
                        case "arrow-start":
                            addArrow(o, value);
                            break;
                        case "arrow-end":
                            addArrow(o, value, 1);
                            break;
                        case "clip-rect":
                            var rect = Str(value).split(separator);
                            if (rect.length == 4) {
                                o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
                                var el = $("clipPath"),
                                    rc = $("rect");
                                el.id = R.createUUID();
                                $(rc, {
                                    x: rect[0],
                                    y: rect[1],
                                    width: rect[2],
                                    height: rect[3]
                                });
                                el.appendChild(rc);
                                o.paper.defs.appendChild(el);
                                $(node, {"clip-path": "url(#" + el.id + ")"});
                                o.clip = rc;
                            }
                            if (!value) {
                                var path = node.getAttribute("clip-path");
                                if (path) {
                                    var clip = R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g, E));
                                    clip && clip.parentNode.removeChild(clip);
                                    $(node, {"clip-path": E});
                                    delete o.clip;
                                }
                            }
                            break;
                        case "path":
                            if (o.type == "path") {
                                $(node, {d: value ? attrs.path = R._pathToAbsolute(value) : "M0,0"});
                                o._.dirty = 1;
                                if (o._.arrows) {
                                    "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                    "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                                }
                            }
                            break;
                        case "width":
                            node.setAttribute(att, value);
                            o._.dirty = 1;
                            if (attrs.fx) {
                                att = "x";
                                value = attrs.x;
                            } else {
                                break;
                            }
                        case "x":
                            if (attrs.fx) {
                                value = -attrs.x - (attrs.width || 0);
                            }
                        case "rx":
                            if (att == "rx" && o.type == "rect") {
                                break;
                            }
                        case "cx":
                            node.setAttribute(att, value);
                            o.pattern && updatePosition(o);
                            o._.dirty = 1;
                            break;
                        case "height":
                            node.setAttribute(att, value);
                            o._.dirty = 1;
                            if (attrs.fy) {
                                att = "y";
                                value = attrs.y;
                            } else {
                                break;
                            }
                        case "y":
                            if (attrs.fy) {
                                value = -attrs.y - (attrs.height || 0);
                            }
                        case "ry":
                            if (att == "ry" && o.type == "rect") {
                                break;
                            }
                        case "cy":
                            node.setAttribute(att, value);
                            o.pattern && updatePosition(o);
                            o._.dirty = 1;
                            break;
                        case "r":
                            if (o.type == "rect") {
                                $(node, {rx: value, ry: value});
                            } else {
                                node.setAttribute(att, value);
                            }
                            o._.dirty = 1;
                            break;
                        case "src":
                            if (o.type == "image") {
                                node.setAttributeNS(xlink, "href", value);
                            }
                            break;
                        case "stroke-width":
                            if (o._.sx != 1 || o._.sy != 1) {
                                value /= mmax(abs(o._.sx), abs(o._.sy)) || 1;
                            }
                            if (o.paper._vbSize) {
                                value *= o.paper._vbSize;
                            }
                            node.setAttribute(att, value);
                            if (attrs["stroke-dasharray"]) {
                                addDashes(o, attrs["stroke-dasharray"], params);
                            }
                            if (o._.arrows) {
                                "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                            }
                            break;
                        case "stroke-dasharray":
                            addDashes(o, value, params);
                            break;
                        case "fill":
                            var isURL = Str(value).match(R._ISURL);
                            if (isURL) {
                                el = $("pattern");
                                var ig = $("image");
                                el.id = R.createUUID();
                                $(el, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1});
                                $(ig, {x: 0, y: 0, "xlink:href": isURL[1]});
                                el.appendChild(ig);

                                (function (el) {
                                    R._preload(isURL[1], function () {
                                        var w = this.offsetWidth,
                                            h = this.offsetHeight;
                                        $(el, {width: w, height: h});
                                        $(ig, {width: w, height: h});
                                        o.paper.safari();
                                    });
                                })(el);
                                o.paper.defs.appendChild(el);
                                $(node, {fill: "url(#" + el.id + ")"});
                                o.pattern = el;
                                o.pattern && updatePosition(o);
                                break;
                            }
                            var clr = R.getRGB(value);
                            if (!clr.error) {
                                delete params.gradient;
                                delete attrs.gradient;
                                !R.is(attrs.opacity, "undefined") &&
                                    R.is(params.opacity, "undefined") &&
                                $(node, {opacity: attrs.opacity});
                                !R.is(attrs["fill-opacity"], "undefined") &&
                                    R.is(params["fill-opacity"], "undefined") &&
                                $(node, {"fill-opacity": attrs["fill-opacity"]});
                            } else if ((o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value)) {
                                if ("opacity" in attrs || "fill-opacity" in attrs) {
                                    var gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                                    if (gradient) {
                                        var stops = gradient.getElementsByTagName("stop");
                                        $(stops[stops.length - 1], {"stop-opacity": ("opacity" in attrs ? attrs.opacity : 1) * ("fill-opacity" in attrs ? attrs["fill-opacity"] : 1)});
                                    }
                                }
                                attrs.gradient = value;
                                attrs.fill = "none";
                                break;
                            }
                            clr[has]("opacity") && $(node, {"fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
                        case "stroke":
                            clr = R.getRGB(value);
                            node.setAttribute(att, clr.hex);
                            att == "stroke" && clr[has]("opacity") && $(node, {"stroke-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
                            if (att == "stroke" && o._.arrows) {
                                "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                            }
                            break;
                        case "gradient":
                            (o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value);
                            break;
                        case "opacity":
                            if (attrs.gradient && !attrs[has]("stroke-opacity")) {
                                $(node, {"stroke-opacity": value > 1 ? value / 100 : value});
                            }
                        // fall
                        case "fill-opacity":
                            if (attrs.gradient) {
                                gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                                if (gradient) {
                                    stops = gradient.getElementsByTagName("stop");
                                    $(stops[stops.length - 1], {"stop-opacity": value});
                                }
                                break;
                            }
                        // 추가 ("shape-rendering": "crispEdges")
                        case "shape-rendering":
                            node.setAttribute(att, value);
                            break;
                        default:
                            att == "font-size" && (value = toInt(value, 10) + "px");
                            var cssrule = att.replace(/(\-.)/g, function (w) {
                                return w.substring(1).toUpperCase();
                            });
                            node.style[cssrule] = value;
                            o._.dirty = 1;
                            node.setAttribute(att, value);
                            break;
                    }
                }
            }

            tuneText(o, params);
            node.style.visibility = vis;
        },
        leading = 1.2,
        tuneText = function (el, params) {
            if (el.type != "text" || !(params[has]("text") || params[has]("font") || params[has]("font-size") || params[has]("x") || params[has]("y"))) {
                return;
            }
            var a = el.attrs,
                node = el.node,
                fontSize = node.firstChild ? toInt(R._g.doc.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) : 10;

            if (params[has]("text")) {
                a.text = params.text;
                while (node.firstChild) {
                    node.removeChild(node.firstChild);
                }
                var texts = Str(params.text).split("\n"),
                    tspans = [],
                    tspan;
                for (var i = 0, ii = texts.length; i < ii; i++) {
                    tspan = $("tspan");
                    i && $(tspan, {dy: fontSize * leading, x: a.x});
                    tspan.appendChild(R._g.doc.createTextNode(texts[i]));
                    node.appendChild(tspan);
                    tspans[i] = tspan;
                }
            } else {
                tspans = node.getElementsByTagName("tspan");
                for (i = 0, ii = tspans.length; i < ii; i++) if (i) {
                    $(tspans[i], {dy: fontSize * leading, x: a.x});
                } else {
                    $(tspans[0], {dy: 0});
                }
            }
            $(node, {x: a.x, y: a.y});
            el._.dirty = 1;
            var bb = el._getBBox(),
                dif = a.y - (bb.y + bb.height / 2);
            dif && R.is(dif, "finite") && $(tspans[0], {dy: dif});
        },
        Element = function (node, svg) {
            var X = 0,
                Y = 0;

            this[0] = this.node = node;

            node.raphael = true;

            this.id = R._oid++;
            node.raphaelid = this.id;
            this.matrix = R.matrix();
            this.realPath = null;

            this.paper = svg;
            this.attrs = this.attrs || {};
            this._ = {
                transform: [],
                sx: 1,
                sy: 1,
                deg: 0,
                dx: 0,
                dy: 0,
                dirty: 1
            };
            !svg.bottom && (svg.bottom = this);

            this.prev = svg.top;
            svg.top && (svg.top.next = this);
            svg.top = this;

            this.next = null;
        },
        elproto = R.el;

    Element.prototype = elproto;
    elproto.constructor = Element;

    R._engine.path = function (pathString, SVG) {
        var el = $("path");
        SVG.canvas && SVG.canvas.appendChild(el);
        var p = new Element(el, SVG);
        p.type = "path";
        setFillAndStroke(p, {
            fill: "none",
            stroke: "#000",
            path: pathString
        });
        return p;
    };

    elproto.rotate = function (deg, cx, cy) {
        if (this.removed) {
            return this;
        }
        deg = Str(deg).split(separator);
        if (deg.length - 1) {
            cx = toFloat(deg[1]);
            cy = toFloat(deg[2]);
        }
        deg = toFloat(deg[0]);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
            cx = bbox.x + bbox.width / 2;
            cy = bbox.y + bbox.height / 2;
        }
        this.transform(this._.transform.concat([
            ["r", deg, cx, cy]
        ]));
        return this;
    };

    elproto.scale = function (sx, sy, cx, cy) {
        if (this.removed) {
            return this;
        }
        sx = Str(sx).split(separator);
        if (sx.length - 1) {
            sy = toFloat(sx[1]);
            cx = toFloat(sx[2]);
            cy = toFloat(sx[3]);
        }
        sx = toFloat(sx[0]);
        (sy == null) && (sy = sx);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
        }
        cx = cx == null ? bbox.x + bbox.width / 2 : cx;
        cy = cy == null ? bbox.y + bbox.height / 2 : cy;
        this.transform(this._.transform.concat([
            ["s", sx, sy, cx, cy]
        ]));
        return this;
    };

    elproto.translate = function (dx, dy) {
        if (this.removed) {
            return this;
        }
        dx = Str(dx).split(separator);
        if (dx.length - 1) {
            dy = toFloat(dx[1]);
        }
        dx = toFloat(dx[0]) || 0;
        dy = +dy || 0;
        this.transform(this._.transform.concat([
            ["t", dx, dy]
        ]));
        return this;
    };

    elproto.transform = function (tstr) {
        var _ = this._;
        if (tstr == null) {
            return _.transform;
        }
        R._extractTransform(this, tstr);

        this.clip && $(this.clip, {transform: this.matrix.invert()});
        this.pattern && updatePosition(this);
        this.node && $(this.node, {transform: this.matrix});

        if (_.sx != 1 || _.sy != 1) {
            var sw = this.attrs[has]("stroke-width") ? this.attrs["stroke-width"] : 1;
            this.attr({"stroke-width": sw});
        }

        return this;
    };

    elproto.hide = function () {
        !this.removed && this.paper.safari(this.node.style.display = "none");
        return this;
    };

    elproto.show = function () {
        !this.removed && this.paper.safari(this.node.style.display = "");
        return this;
    };

    elproto.remove = function () {
        if (this.removed || !this.node.parentNode) {
            return;
        }
        var paper = this.paper;
        paper.__set__ && paper.__set__.exclude(this);
        eve.unbind("raphael.*.*." + this.id);
        if (this.gradient) {
            paper.defs.removeChild(this.gradient);
        }
        R._tear(this, paper);
        if (this.node.parentNode.tagName.toLowerCase() == "a") {
            this.node.parentNode.parentNode.removeChild(this.node.parentNode);
        } else {
            this.node.parentNode.removeChild(this.node);
        }
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        this.removed = true;
    };
    elproto._getBBox = function () {
        if (this.node.style.display == "none") {
            this.show();
            var hide = true;
        }
        var bbox = {};
        try {
            bbox = this.node.getBBox();
        } catch (e) {
            // Firefox 3.0.x plays badly here
        } finally {
            bbox = bbox || {};
        }
        hide && this.hide();
        return bbox;
    };

    elproto.attr = function (name, value) {
        if (this.removed) {
            return this;
        }
        if (name == null) {
            var res = {};
            for (var a in this.attrs) if (this.attrs[has](a)) {
                res[a] = this.attrs[a];
            }
            res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
            res.transform = this._.transform;
            return res;
        }
        if (value == null && R.is(name, "string")) {
            if (name == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient;
            }
            if (name == "transform") {
                return this._.transform;
            }
            var names = name.split(separator),
                out = {};
            for (var i = 0, ii = names.length; i < ii; i++) {
                name = names[i];
                if (name in this.attrs) {
                    out[name] = this.attrs[name];
                } else if (R.is(this.paper.customAttributes[name], "function")) {
                    out[name] = this.paper.customAttributes[name].def;
                } else {
                    out[name] = R._availableAttrs[name];
                }
            }
            return ii - 1 ? out : out[names[0]];
        }
        if (value == null && R.is(name, "array")) {
            out = {};
            for (i = 0, ii = name.length; i < ii; i++) {
                out[name[i]] = this.attr(name[i]);
            }
            return out;
        }
        if (value != null) {
            var params = {};
            params[name] = value;
        } else if (name != null && R.is(name, "object")) {
            params = name;
        }
        for (var key in params) {
            eve("raphael.attr." + key + "." + this.id, this, params[key]);
        }
        for (key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
            var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
            this.attrs[key] = params[key];
            for (var subkey in par) if (par[has](subkey)) {
                params[subkey] = par[subkey];
            }
        }
        setFillAndStroke(this, params);
        return this;
    };

    elproto.toFront = function () {
        if (this.removed) {
            return this;
        }
        if (this.node.parentNode.tagName.toLowerCase() == "a") {
            this.node.parentNode.parentNode.appendChild(this.node.parentNode);
        } else {
            this.node.parentNode.appendChild(this.node);
        }
        var svg = this.paper;
        svg.top != this && R._tofront(this, svg);
        return this;
    };

    elproto.toBack = function () {
        if (this.removed) {
            return this;
        }
        var parent = this.node.parentNode;
        if (parent.tagName.toLowerCase() == "a") {
            parent.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild);
        } else if (parent.firstChild != this.node) {
            parent.insertBefore(this.node, this.node.parentNode.firstChild);
        }
        R._toback(this, this.paper);
        var svg = this.paper;
        return this;
    };

    // 추가(for group 기능)
    elproto.appendChild = function (element) {
        if (this.removed) {
            return this;
        }
        if (this.type !== 'group') {
            throw new TypeError('appendChild function supports only the group type!');
        }
        var node = element.node || element[element.length - 1].node;
        this.node.appendChild(node);
        return this;
    };

    elproto.insertAfter = function (element) {
        if (this.removed) {
            return this;
        }
        var node = element.node || element[element.length - 1].node;
        if (node.nextSibling) {
            node.parentNode.insertBefore(this.node, node.nextSibling);
        } else {
            node.parentNode.appendChild(this.node);
        }
        R._insertafter(this, element, this.paper);
        return this;
    };

    elproto.insertBefore = function (element) {
        if (this.removed) {
            return this;
        }
        var node = element.node || element[0].node;
        node.parentNode.insertBefore(this.node, node);
        R._insertbefore(this, element, this.paper);
        return this;
    };
    elproto.blur = function (size) {
        // Experimental. No Safari support. Use it on your own risk.
        var t = this;
        if (+size !== 0) {
            var fltr = $("filter"),
                blur = $("feGaussianBlur");
            t.attrs.blur = size;
            fltr.id = R.createUUID();
            $(blur, {stdDeviation: +size || 1.5});
            fltr.appendChild(blur);
            t.paper.defs.appendChild(fltr);
            t._blur = fltr;
            $(t.node, {filter: "url(#" + fltr.id + ")"});
        } else {
            if (t._blur) {
                t._blur.parentNode.removeChild(t._blur);
                delete t._blur;
                delete t.attrs.blur;
            }
            t.node.removeAttribute("filter");
        }
    };
    // 추가(for group 기능)
    R._engine.group = function (svg, x, y) {
        var el = $("g");
        if (x && y) {
            el.setAttributeNS(null, "transform", "translate(" + x + ", " + y + ")");
        }
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {x: x, y: y, fill: "none", stroke: "#000"};
        res.type = "group";
        $(el, res.attrs);
        return res;
    };
    R._engine.circle = function (svg, x, y, r) {
        var el = $("circle");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {cx: x, cy: y, r: r, fill: "none", stroke: "#000"};
        res.type = "circle";
        $(el, res.attrs);
        return res;
    };
    R._engine.rect = function (svg, x, y, w, h, r) {
        var el = $("rect");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {x: x, y: y, width: w, height: h, r: r || 0, rx: r || 0, ry: r || 0, fill: "none", stroke: "#000"};
        res.type = "rect";
        $(el, res.attrs);
        return res;
    };
    R._engine.ellipse = function (svg, x, y, rx, ry) {
        var el = $("ellipse");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {cx: x, cy: y, rx: rx, ry: ry, fill: "none", stroke: "#000"};
        res.type = "ellipse";
        $(el, res.attrs);
        return res;
    };
    R._engine.image = function (svg, src, x, y, w, h) {
        var el = $("image");
        $(el, {x: x, y: y, width: w, height: h, preserveAspectRatio: "none"});
        el.setAttributeNS(xlink, "href", src);
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {x: x, y: y, width: w, height: h, src: src};
        res.type = "image";
        return res;
    };
    R._engine.text = function (svg, x, y, text) {
        var el = $("text");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {
            x: x,
            y: y,
            "text-anchor": "middle",
            text: text,
            font: R._availableAttrs.font,
            stroke: "none",
            fill: "#000"
        };
        res.type = "text";
        setFillAndStroke(res, res.attrs);
        return res;
    };
    // 추가(for foreignObject 기능)
    R._engine.foreignObject = function (svg, x, y, w, h, obj) {
        if ((typeof w) !== 'number') {
            obj = w;
            w = obj.offsetWidth;
            h = obj.offsetHeight;
        }
        var res;
        if ((/msie 9/).test(navigator.userAgent.toLowerCase()) || document.documentMode === 9) {
            // TODO : 개선필요
            var el = $("div");
            el.style.cssText = [
                "position:absolute",
                "left:" + (x - w / 2) + "px",
                "top:" + (y - h / 2) + "px",
                "width:" + w + "px",
                "height:" + h + "px"
            ].join(";") + ";";

            svg.canvas && svg.canvas.appendChild(el);
            res = new Element(el, svg);
            res.attrs = {x: x, y: y, width: w, height: h};
            res.type = "foreignObject";
            $(el, res.attrs);
            if (obj) {
                var div = document.createElement('div');
                div.innerHTML = obj;
                res.node.appendChild(div);
            }
        } else {
            var el = $("foreignObject");
            svg.canvas && svg.canvas.appendChild(el);
            res = new Element(el, svg);
            res.attrs = {x: x, y: y, width: w, height: h};
            res.type = "foreignObject";
            $(el, res.attrs);
            if (obj) {
                var div = document.createElement('div');
                div.innerHTML = obj;
                res.node.appendChild(div);
            }
        }

        return res;
    };
    R._engine.setSize = function (width, height) {
        this.width = width || this.width;
        this.height = height || this.height;
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);
        if (this._viewBox) {
            this.setViewBox.apply(this, this._viewBox);
        }
        return this;
    };
    R._engine.create = function () {
        var con = R._getContainer.apply(0, arguments),
            container = con && con.container,
            x = con.x,
            y = con.y,
            width = con.width,
            height = con.height;
        if (!container) {
            throw new Error("SVG container not found.");
        }
        var cnvs = $("svg"),
            css = "overflow:hidden;",
            isFloating;
        x = x || 0;
        y = y || 0;
        width = width || 512;
        height = height || 342;
        $(cnvs, {
            height: height,
            version: 1.1,
            width: width,
            xmlns: "http://www.w3.org/2000/svg"
        });
        if (container == 1) {
            cnvs.style.cssText = css + "position:absolute;left:" + x + "px;top:" + y + "px";
            R._g.doc.body.appendChild(cnvs);
            isFloating = 1;
        } else {
            cnvs.style.cssText = css + "position:relative";
            if (container.firstChild) {
                container.insertBefore(cnvs, container.firstChild);
            } else {
                container.appendChild(cnvs);
            }
        }
        container = new R._Paper;
        container.width = width;
        container.height = height;
        container.canvas = cnvs;
        container.clear();
        container._left = container._top = 0;
        isFloating && (container.renderfix = function () {
        });
        container.renderfix();
        return container;
    };
    R._engine.setViewBox = function (x, y, w, h, fit) {
        eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
        var size = mmax(w / this.width, h / this.height),
            top = this.top,
            aspectRatio = fit ? "meet" : "xMinYMin",
            vb,
            sw;
        if (x == null) {
            if (this._vbSize) {
                size = 1;
            }
            delete this._vbSize;
            vb = "0 0 " + this.width + S + this.height;
        } else {
            this._vbSize = size;
            vb = x + S + y + S + w + S + h;
        }
        $(this.canvas, {
            viewBox: vb,
            preserveAspectRatio: aspectRatio
        });
        while (size && top) {
            sw = "stroke-width" in top.attrs ? top.attrs["stroke-width"] : 1;
            top.attr({"stroke-width": sw});
            top._.dirty = 1;
            top._.dirtyT = 1;
            top = top.prev;
        }
        this._viewBox = [x, y, w, h, !!fit];
        return this;
    };

    R.prototype.renderfix = function () {
        var cnvs = this.canvas,
            s = cnvs.style,
            pos;
        try {
            pos = cnvs.getScreenCTM() || cnvs.createSVGMatrix();
        } catch (e) {
            pos = cnvs.createSVGMatrix();
        }
        var left = -pos.e % 1,
            top = -pos.f % 1;
        if (left || top) {
            if (left) {
                this._left = (this._left + left) % 1;
                s.left = this._left + "px";
            }
            if (top) {
                this._top = (this._top + top) % 1;
                s.top = this._top + "px";
            }
        }
    };

    R.prototype.clear = function () {
        R.eve("raphael.clear", this);
        var c = this.canvas;
        while (c.firstChild) {
            c.removeChild(c.firstChild);
        }
        this.bottom = this.top = null;
        (this.desc = $("desc")).appendChild(R._g.doc.createTextNode("Created with Rapha\xebl " + R.version));
        c.appendChild(this.desc);
        c.appendChild(this.defs = $("defs"));
    };

    R.prototype.remove = function () {
        eve("raphael.remove", this);
        this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
    };
    var setproto = R.st;
    for (var method in elproto) if (elproto[has](method) && !setproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname].apply(el, arg);
                });
            };
        })(method);
    }
}(window.Raphael);

// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël - JavaScript Vector Library                                 │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ VML Module                                                          │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
window.Raphael.vml && function (R) {
    var has = "hasOwnProperty",
        Str = String,
        toFloat = parseFloat,
        math = Math,
        round = math.round,
        mmax = math.max,
        mmin = math.min,
        abs = math.abs,
        fillString = "fill",
        separator = /[, ]+/,
        eve = R.eve,
        ms = " progid:DXImageTransform.Microsoft",
        S = " ",
        E = "",
        map = {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"},
        bites = /([clmz]),?([^clmz]*)/gi,
        blurregexp = / progid:\S+Blur\([^\)]+\)/g,
        val = /-?[^,\s-]+/g,
        cssDot = "position:absolute;left:0;top:0;width:1px;height:1px",
        zoom = 21600,
        pathTypes = {path: 1, rect: 1, image: 1},
        ovalTypes = {circle: 1, ellipse: 1},
        path2vml = function (path) {
            var total = /[ahqstv]/ig,
                command = R._pathToAbsolute;
            Str(path).match(total) && (command = R._path2curve);
            total = /[clmz]/g;
            if (command == R._pathToAbsolute && !Str(path).match(total)) {
                var res = Str(path).replace(bites, function (all, command, args) {
                    var vals = [],
                        isMove = command.toLowerCase() == "m",
                        res = map[command];
                    args.replace(val, function (value) {
                        if (isMove && vals.length == 2) {
                            res += vals + map[command == "m" ? "l" : "L"];
                            vals = [];
                        }
                        vals.push(round(value * zoom));
                    });
                    return res + vals;
                });
                return res;
            }
            var pa = command(path), p, r;
            res = [];
            for (var i = 0, ii = pa.length; i < ii; i++) {
                p = pa[i];
                r = pa[i][0].toLowerCase();
                r == "z" && (r = "x");
                for (var j = 1, jj = p.length; j < jj; j++) {
                    r += round(p[j] * zoom) + (j != jj - 1 ? "," : E);
                }
                res.push(r);
            }
            return res.join(S);
        },
        compensation = function (deg, dx, dy) {
            var m = R.matrix();
            m.rotate(-deg, .5, .5);
            return {
                dx: m.x(dx, dy),
                dy: m.y(dx, dy)
            };
        },
        setCoords = function (p, sx, sy, dx, dy, deg) {
            var _ = p._,
                m = p.matrix,
                fillpos = _.fillpos,
                o = p.node,
                s = o.style,
                y = 1,
                flip = "",
                dxdy,
                kx = zoom / sx,
                ky = zoom / sy;
            s.visibility = "hidden";
            if (!sx || !sy) {
                return;
            }
            o.coordsize = abs(kx) + S + abs(ky);
            s.rotation = deg * (sx * sy < 0 ? -1 : 1);
            if (deg) {
                var c = compensation(deg, dx, dy);
                dx = c.dx;
                dy = c.dy;
            }
            sx < 0 && (flip += "x");
            sy < 0 && (flip += " y") && (y = -1);
            s.flip = flip;
            o.coordorigin = (dx * -kx) + S + (dy * -ky);
            if (fillpos || _.fillsize) {
                var fill = o.getElementsByTagName(fillString);
                fill = fill && fill[0];
                o.removeChild(fill);
                if (fillpos) {
                    c = compensation(deg, m.x(fillpos[0], fillpos[1]), m.y(fillpos[0], fillpos[1]));
                    fill.position = c.dx * y + S + c.dy * y;
                }
                if (_.fillsize) {
                    fill.size = _.fillsize[0] * abs(sx) + S + _.fillsize[1] * abs(sy);
                }
                o.appendChild(fill);
            }
            s.visibility = "visible";
        };
    R.toString = function () {
        return  "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version;
    };
    var addArrow = function (o, value, isEnd) {
            var values = Str(value).toLowerCase().split("-"),
                se = isEnd ? "end" : "start",
                i = values.length,
                type = "classic",
                w = "medium",
                h = "medium";
            while (i--) {
                switch (values[i]) {
                    case "block":
                    case "classic":
                    case "oval":
                    case "diamond":
                    case "open":
                    case "none":
                        type = values[i];
                        break;
                    case "open_block":
                        type = 'block';
                        break;
                    case "open_oval":
                        type = 'oval';
                        break;
                    case "open_diamond":
                        type = 'diamond';
                        break;
                    case "wide":
                    case "narrow":
                        h = values[i];
                        break;
                    case "long":
                    case "short":
                        w = values[i];
                        break;
                }
            }
            var stroke = o.node.getElementsByTagName("stroke")[0];
            stroke[se + "arrow"] = type;
            stroke[se + "arrowlength"] = w;
            stroke[se + "arrowwidth"] = h;
        },
        setFillAndStroke = function (o, params) {
            // o.paper.canvas.style.display = "none";
            o.attrs = o.attrs || {};
            var node = o.node,
                a = o.attrs,
                s = node.style,
                xy,
                newpath = pathTypes[o.type] && (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.cx != a.cx || params.cy != a.cy || params.rx != a.rx || params.ry != a.ry || params.r != a.r),
                isOval = ovalTypes[o.type] && (a.cx != params.cx || a.cy != params.cy || a.r != params.r || a.rx != params.rx || a.ry != params.ry),
                res = o;


            for (var par in params) if (params[has](par)) {
                a[par] = params[par];
            }
            if (newpath) {
                a.path = R._getPath[o.type](o);
                o._.dirty = 1;
            }
            params.href && (node.href = params.href);
            params.title && (node.title = params.title);
            params.target && (node.target = params.target);
            params.cursor && (s.cursor = params.cursor);
            "blur" in params && o.blur(params.blur);
            if (params.path && o.type == "path" || newpath) {
                node.path = path2vml(~Str(a.path).toLowerCase().indexOf("r") ? R._pathToAbsolute(a.path) : a.path);
                if (o.type == "image") {
                    o._.fillpos = [a.x, a.y];
                    o._.fillsize = [a.width, a.height];
                    setCoords(o, 1, 1, 0, 0, 0);
                }
            }
            "transform" in params && o.transform(params.transform);
            if (isOval) {
                var cx = +a.cx,
                    cy = +a.cy,
                    rx = +a.rx || +a.r || 0,
                    ry = +a.ry || +a.r || 0;
                node.path = R.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", round((cx - rx) * zoom), round((cy - ry) * zoom), round((cx + rx) * zoom), round((cy + ry) * zoom), round(cx * zoom));
            }
            if ("clip-rect" in params) {
                var rect = Str(params["clip-rect"]).split(separator);
                if (rect.length == 4) {
                    rect[2] = +rect[2] + (+rect[0]);
                    rect[3] = +rect[3] + (+rect[1]);
                    var div = node.clipRect || R._g.doc.createElement("div"),
                        dstyle = div.style;
                    dstyle.clip = R.format("rect({1}px {2}px {3}px {0}px)", rect);
                    if (!node.clipRect) {
                        dstyle.position = "absolute";
                        dstyle.top = 0;
                        dstyle.left = 0;
                        dstyle.width = o.paper.width + "px";
                        dstyle.height = o.paper.height + "px";
                        node.parentNode.insertBefore(div, node);
                        div.appendChild(node);
                        node.clipRect = div;
                    }
                }
                if (!params["clip-rect"]) {
                    node.clipRect && (node.clipRect.style.clip = "auto");
                }
            }
            if (o.textpath) {
                var textpathStyle = o.textpath.style;
                params.font && (textpathStyle.font = params.font);
                params["font-family"] && (textpathStyle.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, E) + '"');
                params["font-size"] && (textpathStyle.fontSize = params["font-size"]);
                params["font-weight"] && (textpathStyle.fontWeight = params["font-weight"]);
                params["font-style"] && (textpathStyle.fontStyle = params["font-style"]);
            }
            if ("arrow-start" in params) {
                addArrow(res, params["arrow-start"]);
            }
            if ("arrow-end" in params) {
                addArrow(res, params["arrow-end"], 1);
            }
            if (params.opacity != null ||
                params["stroke-width"] != null ||
                params.fill != null ||
                params.src != null ||
                params.stroke != null ||
                params["stroke-width"] != null ||
                params["stroke-opacity"] != null ||
                params["fill-opacity"] != null ||
                params["stroke-dasharray"] != null ||
                params["stroke-miterlimit"] != null ||
                params["stroke-linejoin"] != null ||
                params["stroke-linecap"] != null) {
                var fill = node.getElementsByTagName(fillString),
                    newfill = false;
                fill = fill && fill[0];
                !fill && (newfill = fill = createNode(fillString));
                if (o.type == "image" && params.src) {
                    fill.src = params.src;
                }
                params.fill && (fill.on = true);
                if (fill.on == null || params.fill == "none" || params.fill === null) {
                    fill.on = false;
                }
                if (fill.on && params.fill) {
                    var isURL = Str(params.fill).match(R._ISURL);
                    if (isURL) {
                        fill.parentNode == node && node.removeChild(fill);
                        fill.rotate = true;
                        fill.src = isURL[1];
                        fill.type = "tile";
                        var bbox = o.getBBox(1);
                        fill.position = bbox.x + S + bbox.y;
                        o._.fillpos = [bbox.x, bbox.y];

                        R._preload(isURL[1], function () {
                            o._.fillsize = [this.offsetWidth, this.offsetHeight];
                        });
                    } else {
                        fill.color = R.getRGB(params.fill).hex;
                        fill.src = E;
                        fill.type = "solid";
                        if (R.getRGB(params.fill).error && (res.type in {circle: 1, ellipse: 1} || Str(params.fill).charAt() != "r") && addGradientFill(res, params.fill, fill)) {
                            a.fill = "none";
                            a.gradient = params.fill;
                            fill.rotate = false;
                        }
                    }
                }
                if ("fill-opacity" in params || "opacity" in params) {
                    var opacity = ((+a["fill-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+R.getRGB(params.fill).o + 1 || 2) - 1);
                    opacity = mmin(mmax(opacity, 0), 1);
                    fill.opacity = opacity;
                    if (fill.src) {
                        fill.color = "none";
                    }
                }
                node.appendChild(fill);
                var stroke = (node.getElementsByTagName("stroke") && node.getElementsByTagName("stroke")[0]),
                    newstroke = false;
                !stroke && (newstroke = stroke = createNode("stroke"));
                if ((params.stroke && params.stroke != "none") ||
                    params["stroke-width"] ||
                    params["stroke-opacity"] != null ||
                    params["stroke-dasharray"] ||
                    params["stroke-miterlimit"] ||
                    params["stroke-linejoin"] ||
                    params["stroke-linecap"]) {
                    stroke.on = true;
                }
                (params.stroke == "none" || params.stroke === null || stroke.on == null || params.stroke == 0 || params["stroke-width"] == 0) && (stroke.on = false);
                var strokeColor = R.getRGB(params.stroke);
                stroke.on && params.stroke && (stroke.color = strokeColor.hex);
                opacity = ((+a["stroke-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
                var width = (toFloat(params["stroke-width"]) || 1) * .75;
                opacity = mmin(mmax(opacity, 0), 1);
                params["stroke-width"] == null && (width = a["stroke-width"]);
                params["stroke-width"] && (stroke.weight = width);
                width && width < 1 && (opacity *= width) && (stroke.weight = 1);
                stroke.opacity = opacity;

                params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
                stroke.miterlimit = params["stroke-miterlimit"] || 8;
                params["stroke-linecap"] && (stroke.endcap = params["stroke-linecap"] == "butt" ? "flat" : params["stroke-linecap"] == "square" ? "square" : "round");
                if (params["stroke-dasharray"]) {
                    var dasharray = {
                        "-": "shortdash",
                        ".": "shortdot",
                        "-.": "shortdashdot",
                        "-..": "shortdashdotdot",
                        ". ": "dot",
                        "- ": "dash",
                        "--": "longdash",
                        "- .": "dashdot",
                        "--.": "longdashdot",
                        "--..": "longdashdotdot"
                    };
                    stroke.dashstyle = dasharray[has](params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] : E;
                }
                newstroke && node.appendChild(stroke);
            }
            if (res.type == "text") {
                res.paper.canvas.style.display = E;
                var span = res.paper.span,
                    m = 100,
                    fontSize = a.font && a.font.match(/\d+(?:\.\d*)?(?=px)/);
                s = span.style;
                a.font && (s.font = a.font);
                a["font-family"] && (s.fontFamily = a["font-family"]);
                a["font-weight"] && (s.fontWeight = a["font-weight"]);
                a["font-style"] && (s.fontStyle = a["font-style"]);
                fontSize = toFloat(a["font-size"] || fontSize && fontSize[0]) || 10;
                s.fontSize = fontSize * m + "px";
                res.textpath.string && (span.innerHTML = Str(res.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                var brect = span.getBoundingClientRect();
                res.W = a.w = (brect.right - brect.left) / m;
                res.H = a.h = (brect.bottom - brect.top) / m;
                // res.paper.canvas.style.display = "none";
                res.X = a.x;
                res.Y = a.y + res.H / 2;

                ("x" in params || "y" in params) && (res.path.v = R.format("m{0},{1}l{2},{1}", round(a.x * zoom), round(a.y * zoom), round(a.x * zoom) + 1));
                var dirtyattrs = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
                for (var d = 0, dd = dirtyattrs.length; d < dd; d++) if (dirtyattrs[d] in params) {
                    res._.dirty = 1;
                    break;
                }

                // text-anchor emulation
                switch (a["text-anchor"]) {
                    case "start":
                        res.textpath.style["v-text-align"] = "left";
                        res.bbx = res.W / 2;
                        break;
                    case "end":
                        res.textpath.style["v-text-align"] = "right";
                        res.bbx = -res.W / 2;
                        break;
                    default:
                        res.textpath.style["v-text-align"] = "center";
                        res.bbx = 0;
                        break;
                }
                res.textpath.style["v-text-kern"] = true;
            }
            // 추가 ("shape-rendering": "crispEdges")
            if ("shape-rendering" in params) {
                // TODO : VML 에 대해 처리 필요
            }
            // res.paper.canvas.style.display = E;
        },
        addGradientFill = function (o, gradient, fill) {
            o.attrs = o.attrs || {};
            var attrs = o.attrs,
                pow = Math.pow,
                opacity,
                oindex,
                type = "linear",
                fxfy = ".5 .5";
            o.attrs.gradient = gradient;
            gradient = Str(gradient).replace(R._radial_gradient, function (all, fx, fy) {
                type = "radial";
                if (fx && fy) {
                    fx = toFloat(fx);
                    fy = toFloat(fy);
                    pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = math.sqrt(.25 - pow(fx - .5, 2)) * ((fy > .5) * 2 - 1) + .5);
                    fxfy = fx + S + fy;
                }
                return E;
            });
            gradient = gradient.split(/\s*\-\s*/);
            if (type == "linear") {
                var angle = gradient.shift();
                angle = -toFloat(angle);
                if (isNaN(angle)) {
                    return null;
                }
            }
            var dots = R._parseDots(gradient);
            if (!dots) {
                return null;
            }
            o = o.shape || o.node;
            if (dots.length) {
                o.removeChild(fill);
                fill.on = true;
                fill.method = "none";
                fill.color = dots[0].color;
                fill.color2 = dots[dots.length - 1].color;
                var clrs = [];
                for (var i = 0, ii = dots.length; i < ii; i++) {
                    dots[i].offset && clrs.push(dots[i].offset + S + dots[i].color);
                }
                fill.colors = clrs.length ? clrs.join() : "0% " + fill.color;
                if (type == "radial") {
                    fill.type = "gradientTitle";
                    fill.focus = "100%";
                    fill.focussize = "0 0";
                    fill.focusposition = fxfy;
                    fill.angle = 0;
                } else {
                    // fill.rotate= true;
                    fill.type = "gradient";
                    fill.angle = (270 - angle) % 360;
                }
                o.appendChild(fill);
            }
            return 1;
        },
        Element = function (node, vml) {
            this[0] = this.node = node;
            node.raphael = true;
            this.id = R._oid++;
            node.raphaelid = this.id;
            this.X = 0;
            this.Y = 0;
            this.attrs = {};
            this.paper = vml;
            this.matrix = R.matrix();
            this._ = {
                transform: [],
                sx: 1,
                sy: 1,
                dx: 0,
                dy: 0,
                deg: 0,
                dirty: 1,
                dirtyT: 1
            };
            !vml.bottom && (vml.bottom = this);
            this.prev = vml.top;
            vml.top && (vml.top.next = this);
            vml.top = this;
            this.next = null;
        };
    var elproto = R.el;

    Element.prototype = elproto;
    elproto.constructor = Element;
    elproto.transform = function (tstr) {
        if (tstr == null) {
            return this._.transform;
        }
        var vbs = this.paper._viewBoxShift,
            vbt = vbs ? "s" + [vbs.scale, vbs.scale] + "-1-1t" + [vbs.dx, vbs.dy] : E,
            oldt;
        if (vbs) {
            oldt = tstr = Str(tstr).replace(/\.{3}|\u2026/g, this._.transform || E);
        }
        R._extractTransform(this, vbt + tstr);
        var matrix = this.matrix.clone(),
            skew = this.skew,
            o = this.node,
            split,
            isGrad = ~Str(this.attrs.fill).indexOf("-"),
            isPatt = !Str(this.attrs.fill).indexOf("url(");
        matrix.translate(-.5, -.5);
        if (isPatt || isGrad || this.type == "image") {
            skew.matrix = "1 0 0 1";
            skew.offset = "0 0";
            split = matrix.split();
            if ((isGrad && split.noRotation) || !split.isSimple) {
                o.style.filter = matrix.toFilter();
                var bb = this.getBBox(),
                    bbt = this.getBBox(1),
                    dx = bb.x - bbt.x,
                    dy = bb.y - bbt.y;
                o.coordorigin = (dx * -zoom) + S + (dy * -zoom);
                setCoords(this, 1, 1, dx, dy, 0);
            } else {
                o.style.filter = E;
                setCoords(this, split.scalex, split.scaley, split.dx, split.dy, split.rotate);
            }
        } else {
            o.style.filter = E;
            skew.matrix = Str(matrix);
            skew.offset = matrix.offset();
        }
        oldt && (this._.transform = oldt);
        return this;
    };
    elproto.rotate = function (deg, cx, cy) {
        if (this.removed) {
            return this;
        }
        if (deg == null) {
            return;
        }
        deg = Str(deg).split(separator);
        if (deg.length - 1) {
            cx = toFloat(deg[1]);
            cy = toFloat(deg[2]);
        }
        deg = toFloat(deg[0]);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
            cx = bbox.x + bbox.width / 2;
            cy = bbox.y + bbox.height / 2;
        }
        this._.dirtyT = 1;
        this.transform(this._.transform.concat([
            ["r", deg, cx, cy]
        ]));
        return this;
    };
    elproto.translate = function (dx, dy) {
        if (this.removed) {
            return this;
        }
        dx = Str(dx).split(separator);
        if (dx.length - 1) {
            dy = toFloat(dx[1]);
        }
        dx = toFloat(dx[0]) || 0;
        dy = +dy || 0;
        if (this._.bbox) {
            this._.bbox.x += dx;
            this._.bbox.y += dy;
        }
        this.transform(this._.transform.concat([
            ["t", dx, dy]
        ]));
        return this;
    };
    elproto.scale = function (sx, sy, cx, cy) {
        if (this.removed) {
            return this;
        }
        sx = Str(sx).split(separator);
        if (sx.length - 1) {
            sy = toFloat(sx[1]);
            cx = toFloat(sx[2]);
            cy = toFloat(sx[3]);
            isNaN(cx) && (cx = null);
            isNaN(cy) && (cy = null);
        }
        sx = toFloat(sx[0]);
        (sy == null) && (sy = sx);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
        }
        cx = cx == null ? bbox.x + bbox.width / 2 : cx;
        cy = cy == null ? bbox.y + bbox.height / 2 : cy;

        this.transform(this._.transform.concat([
            ["s", sx, sy, cx, cy]
        ]));
        this._.dirtyT = 1;
        return this;
    };
    elproto.hide = function () {
        !this.removed && (this.node.style.display = "none");
        return this;
    };
    elproto.show = function () {
        !this.removed && (this.node.style.display = E);
        return this;
    };
    elproto._getBBox = function () {
        if (this.removed) {
            return {};
        }
        return {
            x: this.X + (this.bbx || 0) - this.W / 2,
            y: this.Y - this.H,
            width: this.W,
            height: this.H
        };
    };
    elproto.remove = function () {
        if (this.removed || !this.node.parentNode) {
            return;
        }
        this.paper.__set__ && this.paper.__set__.exclude(this);
        R.eve.unbind("raphael.*.*." + this.id);
        R._tear(this, this.paper);
        this.node.parentNode.removeChild(this.node);
        this.shape && this.shape.parentNode.removeChild(this.shape);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        this.removed = true;
    };
    elproto.attr = function (name, value) {
        if (this.removed) {
            return this;
        }
        if (name == null) {
            var res = {};
            for (var a in this.attrs) if (this.attrs[has](a)) {
                res[a] = this.attrs[a];
            }
            res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
            res.transform = this._.transform;
            return res;
        }
        if (value == null && R.is(name, "string")) {
            if (name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient;
            }
            var names = name.split(separator),
                out = {};
            for (var i = 0, ii = names.length; i < ii; i++) {
                name = names[i];
                if (name in this.attrs) {
                    out[name] = this.attrs[name];
                } else if (R.is(this.paper.customAttributes[name], "function")) {
                    out[name] = this.paper.customAttributes[name].def;
                } else {
                    out[name] = R._availableAttrs[name];
                }
            }
            return ii - 1 ? out : out[names[0]];
        }
        if (this.attrs && value == null && R.is(name, "array")) {
            out = {};
            for (i = 0, ii = name.length; i < ii; i++) {
                out[name[i]] = this.attr(name[i]);
            }
            return out;
        }
        var params;
        if (value != null) {
            params = {};
            params[name] = value;
        }
        value == null && R.is(name, "object") && (params = name);
        for (var key in params) {
            eve("raphael.attr." + key + "." + this.id, this, params[key]);
        }
        if (params) {
            for (key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
                var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
                this.attrs[key] = params[key];
                for (var subkey in par) if (par[has](subkey)) {
                    params[subkey] = par[subkey];
                }
            }
            // this.paper.canvas.style.display = "none";
            if (params.text && this.type == "text") {
                this.textpath.string = params.text;
            }
            setFillAndStroke(this, params);
            // this.paper.canvas.style.display = E;
        }
        return this;
    };
    elproto.toFront = function () {
        !this.removed && this.node.parentNode.appendChild(this.node);
        this.paper && this.paper.top != this && R._tofront(this, this.paper);
        return this;
    };
    elproto.toBack = function () {
        if (this.removed) {
            return this;
        }
        if (this.node.parentNode.firstChild != this.node) {
            this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
            R._toback(this, this.paper);
        }
        return this;
    };
    // 추가(for group 기능)
    elproto.appendChild = function (element) {
        if (this.removed) {
            return this;
        }
        if (this.type !== 'group') {
            throw new TypeError('appendChild function supports only the group type!');
        }
        var node = element.node || element[element.length - 1].node;
        this.node.appendChild(node);
        return this;
    };
    elproto.insertAfter = function (element) {
        if (this.removed) {
            return this;
        }
        if (element.constructor == R.st.constructor) {
            element = element[element.length - 1];
        }
        if (element.node.nextSibling) {
            element.node.parentNode.insertBefore(this.node, element.node.nextSibling);
        } else {
            element.node.parentNode.appendChild(this.node);
        }
        R._insertafter(this, element, this.paper);
        return this;
    };
    elproto.insertBefore = function (element) {
        if (this.removed) {
            return this;
        }
        if (element.constructor == R.st.constructor) {
            element = element[0];
        }
        element.node.parentNode.insertBefore(this.node, element.node);
        R._insertbefore(this, element, this.paper);
        return this;
    };
    elproto.blur = function (size) {
        var s = this.node.runtimeStyle,
            f = s.filter;
        f = f.replace(blurregexp, E);
        if (+size !== 0) {
            this.attrs.blur = size;
            s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
            s.margin = R.format("-{0}px 0 0 -{0}px", round(+size || 1.5));
        } else {
            s.filter = f;
            s.margin = 0;
            delete this.attrs.blur;
        }
    };

    // 추가(for group 기능)
    R._engine.group = function (vml, x, y) {
        var el = createNode("group");
        el.coordsize = zoom + S + zoom;
        if (x && y) {
            el.coordorigin = x + " " + y;
        }
        var p = new Element(el, vml),
            attr = {x: x, y: y, fill: "none", stroke: "#000"};
        setFillAndStroke(p, attr);
        vml.canvas.appendChild(el);
        p.type = "group";

        return p;
    };
    R._engine.path = function (pathString, vml) {
        var el = createNode("shape");
        el.style.cssText = cssDot;
        el.coordsize = zoom + S + zoom;
        el.coordorigin = vml.coordorigin;
        var p = new Element(el, vml),
            attr = {fill: "none", stroke: "#000"};
        pathString && (attr.path = pathString);
        p.type = "path";
        p.path = [];
        p.Path = E;
        setFillAndStroke(p, attr);
        vml.canvas.appendChild(el);
        var skew = createNode("skew");
        skew.on = true;
        el.appendChild(skew);
        p.skew = skew;
        p.transform(E);
        return p;
    };
    R._engine.rect = function (vml, x, y, w, h, r) {
        var path = R._rectPath(x, y, w, h, r),
            res = vml.path(path),
            a = res.attrs;
        res.X = a.x = x;
        res.Y = a.y = y;
        res.W = a.width = w;
        res.H = a.height = h;
        a.r = r;
        a.path = path;
        res.type = "rect";
        return res;
    };
    R._engine.ellipse = function (vml, x, y, rx, ry) {
        var res = vml.path(),
            a = res.attrs;
        res.X = x - rx;
        res.Y = y - ry;
        res.W = rx * 2;
        res.H = ry * 2;
        res.type = "ellipse";
        setFillAndStroke(res, {
            cx: x,
            cy: y,
            rx: rx,
            ry: ry
        });
        return res;
    };
    R._engine.circle = function (vml, x, y, r) {
        var res = vml.path(),
            a = res.attrs;
        res.X = x - r;
        res.Y = y - r;
        res.W = res.H = r * 2;
        res.type = "circle";
        setFillAndStroke(res, {
            cx: x,
            cy: y,
            r: r
        });
        return res;
    };
    R._engine.image = function (vml, src, x, y, w, h) {
        var path = R._rectPath(x, y, w, h),
            res = vml.path(path).attr({stroke: "none"}),
            a = res.attrs,
            node = res.node,
            fill = node.getElementsByTagName(fillString)[0];
        a.src = src;
        res.X = a.x = x;
        res.Y = a.y = y;
        res.W = a.width = w;
        res.H = a.height = h;
        a.path = path;
        res.type = "image";
        fill.parentNode == node && node.removeChild(fill);
        fill.rotate = true;
        fill.src = src;
        fill.type = "tile";
        res._.fillpos = [x, y];
        res._.fillsize = [w, h];
        node.appendChild(fill);
        setCoords(res, 1, 1, 0, 0, 0);
        return res;
    };
    R._engine.text = function (vml, x, y, text) {
        var el = createNode("shape"),
            path = createNode("path"),
            o = createNode("textpath");
        x = x || 0;
        y = y || 0;
        text = text || "";
        path.v = R.format("m{0},{1}l{2},{1}", round(x * zoom), round(y * zoom), round(x * zoom) + 1);
        path.textpathok = true;
        o.string = Str(text);
        o.on = true;
        el.style.cssText = cssDot;
        el.coordsize = zoom + S + zoom;
        el.coordorigin = "0 0";
        var p = new Element(el, vml),
            attr = {
                fill: "#000",
                stroke: "none",
                font: R._availableAttrs.font,
                text: text
            };
        p.shape = el;
        p.path = path;
        p.textpath = o;
        p.type = "text";
        p.attrs.text = Str(text);
        p.attrs.x = x;
        p.attrs.y = y;
        p.attrs.w = 1;
        p.attrs.h = 1;
        setFillAndStroke(p, attr);
        el.appendChild(o);
        el.appendChild(path);
        vml.canvas.appendChild(el);
        var skew = createNode("skew");
        skew.on = true;
        el.appendChild(skew);
        p.skew = skew;
        p.transform(E);
        return p;
    };
    // 추가(for foreignObject 기능)
    R._engine.foreignObject = function (vml, x, y, w, h, obj) {
        if ((typeof w) !== 'number') {
            obj = w;
            w = obj.offsetWidth;
            h = obj.offsetHeight;
        }
        var g = createNode("group");
        g.style.cssText = [
            "position:absolute",
            "left:" + (x - w / 2) + "px",
            "top:" + (y - h / 2) + "px",
            "width:" + w + "px",
            "height:" + h + "px"
        ].join(";") + ";";
        g.coordsize = zoom + S + zoom;
        g.coordorigin = "0 0";

        var div = document.createElement('div');
        div.innerHTML = obj;

        g.appendChild(div);

        var res = new Element(g, vml);
        res.type = "foreignObject";
        res.X = res.attrs.x = x;
        res.Y = res.attrs.y = y;
        res.W = res.attrs.width = w;
        res.H = res.attrs.height = h;

        vml.canvas.appendChild(g);

        return res;
    };
    R._engine.setSize = function (width, height) {
        var cs = this.canvas.style;
        this.width = width;
        this.height = height;
        width == +width && (width += "px");
        height == +height && (height += "px");
        cs.width = width;
        cs.height = height;
        cs.clip = "rect(0 " + width + " " + height + " 0)";
        if (this._viewBox) {
            R._engine.setViewBox.apply(this, this._viewBox);
        }
        return this;
    };
    R._engine.setViewBox = function (x, y, w, h, fit) {
        R.eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
        var width = this.width,
            height = this.height,
            size = 1 / mmax(w / width, h / height),
            H, W;
        if (fit) {
            H = height / h;
            W = width / w;
            if (w * H < width) {
                x -= (width - w * H) / 2 / H;
            }
            if (h * W < height) {
                y -= (height - h * W) / 2 / W;
            }
        }
        this._viewBox = [x, y, w, h, !!fit];
        this._viewBoxShift = {
            dx: -x,
            dy: -y,
            scale: size
        };
        this.forEach(function (el) {
            el.transform("...");
        });
        return this;
    };
    var createNode;
    R._engine.initWin = function (win) {
        var doc = win.document;
        doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            !doc.namespaces.rvml && doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
            createNode = function (tagName) {
                return doc.createElement('<rvml:' + tagName + ' class="rvml">');
            };
        } catch (e) {
            createNode = function (tagName) {
                return doc.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
            };
        }
    };
    R._engine.initWin(R._g.win);
    R._engine.create = function () {
        var con = R._getContainer.apply(0, arguments),
            container = con.container,
            height = con.height,
            s,
            width = con.width,
            x = con.x,
            y = con.y;
        if (!container) {
            throw new Error("VML container not found.");
        }
        var res = new R._Paper,
            c = res.canvas = R._g.doc.createElement("div"),
            cs = c.style;
        x = x || 0;
        y = y || 0;
        width = width || 512;
        height = height || 342;
        res.width = width;
        res.height = height;
        width == +width && (width += "px");
        height == +height && (height += "px");
        res.coordsize = zoom * 1e3 + S + zoom * 1e3;
        res.coordorigin = "0 0";
        res.span = R._g.doc.createElement("span");
        res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
        c.appendChild(res.span);
        cs.cssText = R.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
        if (container == 1) {
            R._g.doc.body.appendChild(c);
            cs.left = x + "px";
            cs.top = y + "px";
            cs.position = "absolute";
        } else {
            if (container.firstChild) {
                container.insertBefore(c, container.firstChild);
            } else {
                container.appendChild(c);
            }
        }
        res.renderfix = function () {
        };
        return res;
    };
    R.prototype.clear = function () {
        R.eve("raphael.clear", this);
        this.canvas.innerHTML = E;
        this.span = R._g.doc.createElement("span");
        this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
        this.canvas.appendChild(this.span);
        this.bottom = this.top = null;
    };
    R.prototype.remove = function () {
        R.eve("raphael.remove", this);
        this.canvas.parentNode.removeChild(this.canvas);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        return true;
    };

    var setproto = R.st;
    for (var method in elproto) if (elproto[has](method) && !setproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname].apply(el, arg);
                });
            };
        })(method);
    }
}(window.Raphael);
/** @namespace */
var OG = window.OG || {};

/** @namespace */
OG.common = {};

/** @namespace */
OG.geometry = {};

/** @namespace */
OG.graph = {};

/** @namespace */
OG.handler = {};

/** @namespace */
OG.layout = {};

/** @namespace */
OG.renderer = {};

/** @namespace */
OG.shape = {};

/** @namespace */
OG.shape.bpmn = {};

/**
 * 공통 상수 정의 Javascript 클래스
 *
 * @class
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.Constants = {

    /**
     * 공간 기하 객체 타입 정의
     */
    GEOM_TYPE: {
        NULL: 0,
        POINT: 1,
        LINE: 2,
        POLYLINE: 3,
        POLYGON: 4,
        RECTANGLE: 5,
        CIRCLE: 6,
        ELLIPSE: 7,
        CURVE: 8,
        BEZIER_CURVE: 9,
        COLLECTION: 10
    },

    /**
     * 공간 기하 객체 타입-이름 매핑
     */
    GEOM_NAME: ["", "Point", "Line", "PolyLine", "Polygon", "Rectangle", "Circle", "Ellipse", "Curve", "BezierCurve", "Collection"],

    /**
     * 숫자 반올림 소숫점 자리수
     */
    NUM_PRECISION: 0,

    /**
     * 캔버스 노드 타입 정의
     */
    NODE_TYPE: {
        ROOT: "ROOT",
        SHAPE: "SHAPE",
        ETC: "ETC"
    },

    /**
     * Shape 타입 정의
     */
    SHAPE_TYPE: {
        GEOM: "GEOM",
        TEXT: "TEXT",
        HTML: "HTML",
        IMAGE: "IMAGE",
        EDGE: "EDGE",
        GROUP: "GROUP"
    },

    /**
     * Edge 타입 정의
     */
    EDGE_TYPE: {
        STRAIGHT: "straight",
        PLAIN: "plain",
        BEZIER: "bezier"
    },

    /**
     * 라벨 ID의 suffix 정의
     */
    LABEL_SUFFIX: "_LABEL",

    /**
     * 라벨 에디터 ID의 suffix 정의
     */
    LABEL_EDITOR_SUFFIX: "_LABEL_EDITOR",

    /**
     * 시작점 라벨 ID의 suffix 정의
     */
    FROM_LABEL_SUFFIX: '_FROMLABEL',

    /**
     * 끝점 라벨 ID의 suffix 정의
     */
    TO_LABEL_SUFFIX: '_TOLABEL',

    /**
     * Rectangle 모양의 마우스 드래그 선택 박스 영역
     */
    RUBBER_BAND_ID: "OG_R_BAND",

    /**
     * Move & Resize 용 가이드 ID 의 suffix 정의
     */
    GUIDE_SUFFIX: {
        GUIDE: "_GUIDE",
        BBOX: "_GUIDE_BBOX",
        UL: "_GUIDE_UL",
        UR: "_GUIDE_UR",
        LL: "_GUIDE_LL",
        LR: "_GUIDE_LR",
        LC: "_GUIDE_LC",
        UC: "_GUIDE_UC",
        RC: "_GUIDE_RC",
        LWC: "_GUIDE_LWC",
        FROM: "_GUIDE_FROM",
        TO: "_GUIDE_TO",
        CTL: "_GUIDE_CTL_",
        CTL_H: "_GUIDE_CTL_H_",
        CTL_V: "_GUIDE_CTL_V_"
    },

    /**
     * Collapse & Expand 용 가이드 ID의 suffix 정의
     */
    COLLAPSE_SUFFIX: "_COLLAPSE",
    COLLAPSE_BBOX_SUFFIX: "_COLLAPSE_BBOX",

    /**
     * Shape Move & Resize 시 이동 간격
     */
    MOVE_SNAP_SIZE: 5,

    /**
     * Edge 연결할때 Drop Over 가이드 ID의 suffix 정의
     */
    DROP_OVER_BBOX_SUFFIX: "_DROP_OVER",

    /**
     * Shape - Edge 와의 연결 포인트 터미널 ID의 suffix 정의
     */
    TERMINAL_SUFFIX: {
        GROUP: "_TERMINAL",
        BOX: "_TERMINAL_BOX"
    },

    /**
     * Shape - Edge 와의 연결 포인트 터미널 유형 정의
     */
    TERMINAL_TYPE: {
        C: "C",
        E: "E",
        W: "W",
        S: "S",
        N: "N",
        IN: "IN",
        OUT: "OUT",
        INOUT: "INOUT"
    }
};
OG.Constants = OG.common.Constants;

// keyCode Definition
if (typeof KeyEvent === "undefined") {
    var KeyEvent = {
        DOM_VK_CANCEL: 3,
        DOM_VK_HELP: 6,
        DOM_VK_BACK_SPACE: 8,
        DOM_VK_TAB: 9,
        DOM_VK_CLEAR: 12,
        DOM_VK_RETURN: 13,
        DOM_VK_ENTER: 14,
        DOM_VK_SHIFT: 16,
        DOM_VK_CONTROL: 17,
        DOM_VK_ALT: 18,
        DOM_VK_PAUSE: 19,
        DOM_VK_CAPS_LOCK: 20,
        DOM_VK_ESCAPE: 27,
        DOM_VK_SPACE: 32,
        DOM_VK_PAGE_UP: 33,
        DOM_VK_PAGE_DOWN: 34,
        DOM_VK_END: 35,
        DOM_VK_HOME: 36,
        DOM_VK_LEFT: 37,
        DOM_VK_UP: 38,
        DOM_VK_RIGHT: 39,
        DOM_VK_DOWN: 40,
        DOM_VK_PRINTSCREEN: 44,
        DOM_VK_INSERT: 45,
        DOM_VK_DELETE: 46,
        DOM_VK_0: 48,
        DOM_VK_1: 49,
        DOM_VK_2: 50,
        DOM_VK_3: 51,
        DOM_VK_4: 52,
        DOM_VK_5: 53,
        DOM_VK_6: 54,
        DOM_VK_7: 55,
        DOM_VK_8: 56,
        DOM_VK_9: 57,
        DOM_VK_SEMICOLON: 59,
        DOM_VK_EQUALS: 61,
        DOM_VK_A: 65,
        DOM_VK_B: 66,
        DOM_VK_C: 67,
        DOM_VK_D: 68,
        DOM_VK_E: 69,
        DOM_VK_F: 70,
        DOM_VK_G: 71,
        DOM_VK_H: 72,
        DOM_VK_I: 73,
        DOM_VK_J: 74,
        DOM_VK_K: 75,
        DOM_VK_L: 76,
        DOM_VK_M: 77,
        DOM_VK_N: 78,
        DOM_VK_O: 79,
        DOM_VK_P: 80,
        DOM_VK_Q: 81,
        DOM_VK_R: 82,
        DOM_VK_S: 83,
        DOM_VK_T: 84,
        DOM_VK_U: 85,
        DOM_VK_V: 86,
        DOM_VK_W: 87,
        DOM_VK_X: 88,
        DOM_VK_Y: 89,
        DOM_VK_Z: 90,
        DOM_VK_COMMAND: 91,
        DOM_VK_CONTEXT_MENU: 93,
        DOM_VK_NUMPAD0: 96,
        DOM_VK_NUMPAD1: 97,
        DOM_VK_NUMPAD2: 98,
        DOM_VK_NUMPAD3: 99,
        DOM_VK_NUMPAD4: 100,
        DOM_VK_NUMPAD5: 101,
        DOM_VK_NUMPAD6: 102,
        DOM_VK_NUMPAD7: 103,
        DOM_VK_NUMPAD8: 104,
        DOM_VK_NUMPAD9: 105,
        DOM_VK_MULTIPLY: 106,
        DOM_VK_ADD: 107,
        DOM_VK_SEPARATOR: 108,
        DOM_VK_SUBTRACT: 109,
        DOM_VK_DECIMAL: 110,
        DOM_VK_DIVIDE: 111,
        DOM_VK_F1: 112,
        DOM_VK_F2: 113,
        DOM_VK_F3: 114,
        DOM_VK_F4: 115,
        DOM_VK_F5: 116,
        DOM_VK_F6: 117,
        DOM_VK_F7: 118,
        DOM_VK_F8: 119,
        DOM_VK_F9: 120,
        DOM_VK_F10: 121,
        DOM_VK_F11: 122,
        DOM_VK_F12: 123,
        DOM_VK_F13: 124,
        DOM_VK_F14: 125,
        DOM_VK_F15: 126,
        DOM_VK_F16: 127,
        DOM_VK_F17: 128,
        DOM_VK_F18: 129,
        DOM_VK_F19: 130,
        DOM_VK_F20: 131,
        DOM_VK_F21: 132,
        DOM_VK_F22: 133,
        DOM_VK_F23: 134,
        DOM_VK_F24: 135,
        DOM_VK_NUM_LOCK: 144,
        DOM_VK_SCROLL_LOCK: 145,
        DOM_VK_COMMA: 188,
        DOM_VK_PERIOD: 190,
        DOM_VK_SLASH: 191,
        DOM_VK_BACK_QUOTE: 192,
        DOM_VK_OPEN_BRACKET: 219,
        DOM_VK_BACK_SLASH: 220,
        DOM_VK_CLOSE_BRACKET: 221,
        DOM_VK_QUOTE: 222,
        DOM_VK_META: 224
    };
}
/**
 * 공통 유틸리티 Javascript 클래스
 *
 * @class
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.Util = {

    isEmpty: function (v, allowBlank) {
        return v === null || v === undefined || ((OG.Util.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
    },
    isArray: function (v) {
        return Object.prototype.toString.apply(v) === '[object Array]';
    },
    isDate: function (v) {
        return Object.prototype.toString.apply(v) === '[object Date]';
    },
    isObject: function (v) {
        return !!v && Object.prototype.toString.call(v) === '[object Object]';
    },
    isPrimitive: function (v) {
        return OG.Util.isString(v) || OG.Util.isNumber(v) || OG.Util.isBoolean(v);
    },
    isFunction: function (v) {
        return Object.prototype.toString.apply(v) === '[object Function]';
    },
    isNumber: function (v) {
        return typeof v === 'number' && isFinite(v);
    },
    isString: function (v) {
        return typeof v === 'string';
    },
    isBoolean: function (v) {
        return typeof v === 'boolean';
    },
    isElement: function (v) {
        return !!v && v.tagName ? true : false;
    },
    isDefined: function (v) {
        return typeof v !== 'undefined';
    },

    isWebKit: function () {
        return (/webkit/).test(navigator.userAgent.toLowerCase());
    },
    isGecko: function () {
        return !OG.Util.isWebKit() && (/gecko/).test(navigator.userAgent.toLowerCase());
    },
    isOpera: function () {
        return (/opera/).test(navigator.userAgent.toLowerCase());
    },
    isChrome: function () {
        return (/\bchrome\b/).test(navigator.userAgent.toLowerCase());
    },
    isSafari: function () {
        return !OG.Util.isChrome() && (/safari/).test(navigator.userAgent.toLowerCase());
    },
    isFirefox: function () {
        return (/firefox/).test(navigator.userAgent.toLowerCase());
    },
    isIE: function () {
        return !OG.Util.isOpera() && (/msie/).test(navigator.userAgent.toLowerCase());
    },
    isIE6: function () {
        return OG.Util.isIE() && (/msie 6/).test(navigator.userAgent.toLowerCase());
    },
    isIE7: function () {
        return OG.Util.isIE() && ((/msie 7/).test(navigator.userAgent.toLowerCase()) || document.documentMode === 7);
    },
    isIE8: function () {
        return OG.Util.isIE() && ((/msie 8/).test(navigator.userAgent.toLowerCase()) || document.documentMode === 8);
    },
    isIE9: function () {
        return OG.Util.isIE() && ((/msie 9/).test(navigator.userAgent.toLowerCase()) || document.documentMode === 9);
    },
    isWindows: function () {
        return (/windows|win32/).test(navigator.userAgent.toLowerCase());
    },
    isMac: function () {
        return (/macintosh|mac os x/).test(navigator.userAgent.toLowerCase());
    },
    isLinux: function () {
        return (/linux/).test(navigator.userAgent.toLowerCase());
    },

    trim: function (string) {
        return string === null || string === undefined ?
            string :
            string.replace(/^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g, "");
    },

    /**
     * Object 를 복사한다.
     *
     * @param {Object} obj 복사할 Object
     * @return {Object} 복사된 Object
     * @static
     */
    clone: function (obj) {
        if (obj === null || obj === undefined) {
            return obj;
        }

        // DOM nodes
        if (obj.nodeType && obj.cloneNode) {
            return obj.cloneNode(true);
        }

        var i, j, k, clone, key,
            type = Object.prototype.toString.call(obj),
            enumerables = ["hasOwnProperty", "valueOf", "isPrototypeOf", "propertyIsEnumerable",
                "toLocaleString", "toString", "constructor"];

        // Date
        if (type === "[object Date]") {
            return new Date(obj.getTime());
        }

        // Array, Object
        if (type === "[object Array]") {
            i = obj.length;

            clone = [];

            while (i--) {
                clone[i] = this.clone(obj[i]);
            }
        } else if (type === "[object Object]" && obj.constructor === Object) {
            // TODO : 보완필요
            clone = {};

            for (key in obj) {
                clone[key] = this.clone(obj[key]);
            }

            if (enumerables) {
                for (j = enumerables.length; j--;) {
                    k = enumerables[j];
                    clone[k] = obj[k];
                }
            }
        }

        return clone || obj;
    },

    /**
     * 디폴트로 지정된 소숫점 자리수로 Round 한 값을 반환한다.
     *
     * @param {Number} val 반올림할 값
     * @return {Number} 지정한 소숫점 자리수에 따른 반올림 값
     */
    round: function (val) {
        return this.roundPrecision(val, OG.Constants.NUM_PRECISION);
    },

    /**
     * 입력된 숫자값을 지정된 소숫점 자릿수로 Round해서 값을 리턴한다.
     * @example
     * OG.Util.roundPrecision(300.12345678, 3);
     * Result ) 300.123
     *
     * @param {Number} val 반올림할 값
     * @param {Number} precision 소숫점 자리수
     * @return {Number} 지정한 소숫점 자리수에 따른 반올림 값
     */
    roundPrecision: function (val, precision) {
        var p = Math.pow(10, precision);
        return Math.round(val * p) / p;
    },

    /**
     *  Shape Move & Resize 이동 간격으로 Round 한 값을 반환한다.
     *
     * @param {Number} val 반올림할 값
     * @param {Number} snapSize 이동간격
     * @return {Number} 지정한 간격으로 반올림 값
     */
    roundGrid: function (val, snapSize) {
        snapSize = snapSize || OG.Constants.MOVE_SNAP_SIZE;
        return OG.Util.round(val / snapSize) * snapSize;
    },

    /**
     * Copies all the properties of config to obj.
     *
     * @param {Object} obj The receiver of the properties
     * @param {Object} config The source of the properties
     * @param {Object} defaults A different object that will also be applied for default values
     * @return {Object} returns obj
     */
    apply: function (obj, config, defaults) {
        // no "this" reference for friendly out of scope calls
        var p;
        if (defaults) {
            this.apply(obj, defaults);
        }
        if (obj && config && typeof config === 'object') {
            for (p in config) {
                obj[p] = config[p];
            }
        }
        return obj;
    },

    /**
     * <p>Extends one class to create a subclass and optionally overrides members with the passed literal. This method
     * also adds the function "override()" to the subclass that can be used to override members of the class.</p>
     * For example, to create a subclass of Ext GridPanel:
     * <pre><code>
     MyGridPanel = Ext.extend(Ext.grid.GridPanel, {
	 constructor: function(config) {

	 //      Create configuration for this Grid.
	 var store = new Ext.data.Store({...});
	 var colModel = new Ext.grid.ColumnModel({...});

	 //      Create a new config object containing our computed properties
	 //      *plus* whatever was in the config parameter.
	 config = Ext.apply({
	 store: store,
	 colModel: colModel
	 }, config);

	 MyGridPanel.superclass.constructor.call(this, config);

	 //      Your postprocessing here
	 },

	 yourMethod: function() {
	 // etc.
	 }
	 });
     </code></pre>
     *
     * <p>This function also supports a 3-argument call in which the subclass's constructor is
     * passed as an argument. In this form, the parameters are as follows:</p>
     * <div class="mdetail-params"><ul>
     * <li><code>subclass</code> : Function <div class="sub-desc">The subclass constructor.</div></li>
     * <li><code>superclass</code> : Function <div class="sub-desc">The constructor of class being extended</div></li>
     * <li><code>overrides</code> : Object <div class="sub-desc">A literal with members which are copied into the subclass's
     * prototype, and are therefore shared among all instances of the new class.</div></li>
     * </ul></div>
     *
     * @param {Function} superclass The constructor of class being extended.
     * @param {Object} overrides <p>A literal with members which are copied into the subclass's
     * prototype, and are therefore shared between all instances of the new class.</p>
     * <p>This may contain a special member named <tt><b>constructor</b></tt>. This is used
     * to define the constructor of the new class, and is returned. If this property is
     * <i>not</i> specified, a constructor is generated and returned which just calls the
     * superclass's constructor passing on its parameters.</p>
     * <p><b>It is essential that you call the superclass constructor in any provided constructor. See example code.</b></p>
     * @return {Function} The subclass constructor from the <code>overrides</code> parameter, or a generated one if not provided.
     */
    extend: (function () {
        // inline overrides
        var io = function (o) {
                var m;
                for (m in o) {
                    this[m] = o[m];
                }
            },
            oc = Object.prototype.constructor;

        return function (sb, sp, overrides) {
            if (OG.Util.isObject(sp)) {
                overrides = sp;
                sp = sb;
                sb = overrides.constructor !== oc ? overrides.constructor : function () {
                    sp.apply(this, arguments);
                };
            }
            var F = function () {
                },
                sbp,
                spp = sp.prototype;

            F.prototype = spp;
            sbp = sb.prototype = new F();
            sbp.constructor = sb;
            sb.superclass = spp;
            if (spp.constructor === oc) {
                spp.constructor = sp;
            }
            sb.override = function (o) {
                OG.Util.override(sb, o);
            };
            sbp.superclass = sbp.supr = (function () {
                return spp;
            }());
            sbp.override = io;
            OG.Util.override(sb, overrides);
            sb.extend = function (o) {
                return OG.Util.extend(sb, o);
            };
            return sb;
        };
    }()),

    /**
     * Adds a list of functions to the prototype of an existing class, overwriting any existing methods with the same name.
     * Usage:<pre><code>
     Ext.override(MyClass, {
	 newMethod1: function(){
	 // etc.
	 },
	 newMethod2: function(foo){
	 // etc.
	 }
	 });
     </code></pre>
     * @param {Object} origclass The class to override
     * @param {Object} overrides The list of functions to add to origClass.  This should be specified as an object literal
     * containing one or more methods.
     * @method override
     */
    override: function (origclass, overrides) {
        if (overrides) {
            var p = origclass.prototype;
            OG.Util.apply(p, overrides);
            if ((/msie/).test(navigator.userAgent.toLowerCase()) && overrides.hasOwnProperty('toString')) {
                p.toString = overrides.toString;
            }
        }
    },

    xmlToJson: function (node) {
        var json = {},
            cloneNS = function (ns) {
                var nns = {};
                for (var n in ns) {
                    if (ns.hasOwnProperty(n)) {
                        nns[n] = ns[n];
                    }
                }
                return nns;
            },
            process = function (node, obj, ns) {
                if (node.nodeType === 3) {
                    if (!node.nodeValue.match(/[\S]+/)) return;
                    if (obj["$"] instanceof Array) {
                        obj["$"].push(node.nodeValue);
                    } else if (obj["$"] instanceof Object) {
                        obj["$"] = [obj["$"], node.nodeValue];
                    } else {
                        obj["$"] = node.nodeValue;
                    }
                } else if (node.nodeType === 1) {
                    var p = {};
                    var nodeName = node.nodeName;
                    for (var i = 0; node.attributes && i < node.attributes.length; i++) {
                        var attr = node.attributes[i];
                        var name = attr.nodeName;
                        var value = attr.nodeValue;
                        if (name === "xmlns") {
                            ns["$"] = value;
                        } else if (name.indexOf("xmlns:") === 0) {
                            ns[name.substr(name.indexOf(":") + 1)] = value;
                        } else {
                            p["@" + name] = value;
                        }
                    }
                    for (var prefix in ns) {
                        if (ns.hasOwnProperty(prefix)) {
                            p["@xmlns"] = p["@xmlns"] || {};
                            p["@xmlns"][prefix] = ns[prefix];
                        }
                    }
                    if (obj[nodeName] instanceof Array) {
                        obj[nodeName].push(p);
                    } else if (obj[nodeName] instanceof Object) {
                        obj[nodeName] = [obj[nodeName], p];
                    } else {
                        obj[nodeName] = p;
                    }
                    for (var j = 0; j < node.childNodes.length; j++) {
                        process(node.childNodes[j], p, cloneNS(ns));
                    }
                } else if (node.nodeType === 9) {
                    for (var k = 0; k < node.childNodes.length; k++) {
                        process(node.childNodes[k], obj, cloneNS(ns));
                    }
                }
            };
        process(node, json, {});
        return json;
    },

    jsonToXml: function (json) {
        if (typeof json !== "object") return null;
        var cloneNS = function (ns) {
            var nns = {};
            for (var n in ns) {
                if (ns.hasOwnProperty(n)) {
                    nns[n] = ns[n];
                }
            }
            return nns;
        };

        var processLeaf = function (lname, child, ns) {
            var body = "";
            if (child instanceof Array) {
                for (var i = 0; i < child.length; i++) {
                    body += processLeaf(lname, child[i], cloneNS(ns));
                }
                return body;
            } else if (typeof child === "object") {
                var el = "<" + lname;
                var attributes = "";
                var text = "";
                if (child["@xmlns"]) {
                    var xmlns = child["@xmlns"];
                    for (var prefix in xmlns) {
                        if (xmlns.hasOwnProperty(prefix)) {
                            if (prefix === "$") {
                                if (ns[prefix] !== xmlns[prefix]) {
                                    attributes += " " + "xmlns=\"" + xmlns[prefix] + "\"";
                                    ns[prefix] = xmlns[prefix];
                                }
                            } else if (!ns[prefix] || (ns[prefix] !== xmlns[prefix])) {
                                attributes += " xmlns:" + prefix + "=\"" + xmlns[prefix] + "\"";
                                ns[prefix] = xmlns[prefix];
                            }
                        }
                    }
                }
                for (var key in child) {
                    if (child.hasOwnProperty(key) && key !== "@xmlns") {
                        var obj = child[key];
                        if (key === "$") {
                            text += obj;
                        } else if (key.indexOf("@") === 0) {
                            attributes += " " + key.substring(1) + "=\"" + obj + "\"";
                        } else {
                            body += processLeaf(key, obj, cloneNS(ns));
                        }
                    }
                }
                body = text + body;
                return (body !== "") ? el + attributes + ">" + body + "</" + lname + ">" : el + attributes + "/>"
            }
        };
        for (var lname in json) {
            if (json.hasOwnProperty(lname) && lname.indexOf("@") == -1) {
                return '<?xml version="1.0" encoding="UTF-8"?>' + processLeaf(lname, json[lname], {});
            }
        }
        return null;
    },

    parseXML: function (xmlString) {
        var doc, parser;
        if (window.ActiveXObject) {
            doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.async = 'false';
            doc.loadXML(xmlString);
        } else {
            parser = new DOMParser();
            doc = parser.parseFromString(xmlString, 'text/xml');
        }

        return doc;
    }
};
OG.Util = OG.common.Util;
/**
 * 곡선(Curve) 알고리즘을 구현한 Javascript 클래스
 *
 * @class
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.CurveUtil = {
    /**
     * 주어진 좌표 Array 에 대해 Cubic Catmull-Rom spline Curve 좌표를 계산하는 함수를 반환한다.
     * 모든 좌표를 지나는 커브를 계산한다.
     *
     * @example
     * var points = [[2, 2], [2, -2], [-2, 2], [-2, -2]],
     *     cmRomSpline = OG.CurveUtil.CatmullRomSpline(points), t, curve = [];
     *
     * // t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 Curve 를 그린다.
     * for(t = 0; t <= cmRomSpline.maxT; t += 0.1) {
	 *     curve.push([cmRomSpline.getX(t), cmRomSpline.getY(t)]);
	 * }
     *
     * @param {Array} points 좌표 Array (예, [[x1,y1], [x2,y2], [x3,y3], [x4,y4]])
     * @return {Object} t 값에 의해 X, Y 좌표를 구하는 함수와 maxT 값을 반환
     * @static
     */
    CatmullRomSpline: function (points) {
        var coeffs = [], p,
            first = {},
            last = {}, // control point at the beginning and at the end

            makeFct = function (which) {

                return function (t, suspendedUpdate) {

                    var len = points.length, s, c;

                    if (len < 2) {
                        return NaN;
                    }

                    t = t - 1;

                    if (!suspendedUpdate && coeffs[which]) {
                        suspendedUpdate = true;
                    }

                    if (!suspendedUpdate) {
                        first[which] = 2 * points[0][which] - points[1][which];
                        last[which] = 2 * points[len - 1][which] - points[len - 2][which];
                        p = [first].concat(points, [last]);

                        coeffs[which] = [];
                        for (s = 0; s < len - 1; s++) {
                            coeffs[which][s] = [
                                2 * p[s + 1][which],
                                -p[s][which] + p[s + 2][which],
                                2 * p[s][which] - 5 * p[s + 1][which] + 4 * p[s + 2][which] - p[s + 3][which],
                                -p[s][which] + 3 * p[s + 1][which] - 3 * p[s + 2][which] + p[s + 3][which]
                            ];
                        }
                    }
                    len += 2;  // add the two control points
                    if (isNaN(t)) {
                        return NaN;
                    }
                    // This is necessay for our advanced plotting algorithm:
                    if (t < 0) {
                        return p[1][which];
                    } else if (t >= len - 3) {
                        return p[len - 2][which];
                    }

                    s = Math.floor(t);
                    if (s === t) {
                        return p[s][which];
                    }
                    t -= s;
                    c = coeffs[which][s];
                    return 0.5 * (((c[3] * t + c[2]) * t + c[1]) * t + c[0]);
                };
            };

        return {
            getX: makeFct(0),
            getY: makeFct(1),
            maxT: points.length + 1
        };
    },

    /**
     * 주어진 좌표 Array (좌표1, 콘트롤포인트1, 콘트롤포인트2, 좌표2 ...) 에 대해 Cubic Bezier Curve 좌표를 계산하는 함수를 반환한다.
     * Array 갯수는 3 * K + 1 이어야 한다.
     * 예) 좌표1, 콘트롤포인트1, 콘트롤포인트2, 좌표2, 콘트롤포인트1, 콘트롤포인트2, 좌표3 ...
     *
     * @example
     * var points = [[2, 1], [1, 3], [-1, -1], [-2, 1]],
     *     bezier = OG.CurveUtil.Bezier(points), t, curve = [];
     *
     * // t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 Curve 를 그린다.
     * for(t = 0; t <= bezier.maxT; t += 0.1) {
	 *     curve.push([bezier.getX(t), bezier.getY(t)]);
	 * }
     *
     * @param {Array} points 좌표 Array (예, [[x1,y1], [cp_x1,cp_y1], [cp_x2,cp_y2], [x2,y4]])
     * @return {Object} t 값에 의해 X, Y 좌표를 구하는 함수와 maxT 값을 반환
     * @static
     */
    Bezier: function (points) {
        var len,
            makeFct = function (which) {
                return function (t, suspendedUpdate) {
                    var z = Math.floor(t) * 3,
                        t0 = t,
                        t1 = 1 - t0;

                    if (!suspendedUpdate && len) {
                        suspendedUpdate = true;
                    }

                    if (!suspendedUpdate) {
                        len = Math.floor(points.length / 3);
                    }

                    if (t < 0) {
                        return points[0][which];
                    }
                    if (t >= len) {
                        return points[points.length - 1][which];
                    }
                    if (isNaN(t)) {
                        return NaN;
                    }
                    return t1 * t1 * (t1 * points[z][which] + 3 * t0 * points[z + 1][which]) +
                        (3 * t1 * points[z + 2][which] + t0 * points[z + 3][which]) * t0 * t0;
                };
            };

        return {
            getX: makeFct(0),
            getY: makeFct(1),
            maxT: Math.floor(points.length / 3) + 0.01
        };
    },

    /**
     * 주어진 좌표 Array (시작좌표, 콘트롤포인트1, 콘트롤포인트2, ..., 끝좌표) 에 대해 B-Spline Curve 좌표를 계산하는 함수를 반환한다.
     *
     * @example
     * var points = [[2, 1], [1, 3], [-1, -1], [-2, 1]],
     *     bspline = OG.CurveUtil.BSpline(points), t, curve = [];
     *
     * // t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 Curve 를 그린다.
     * for(t = 0; t <= bspline.maxT; t += 0.1) {
	 *     curve.push([bspline.getX(t), bspline.getY(t)]);
	 * }
     *
     * @param {Array} points 좌표 Array (예, [[x1,y1], [x2,y2], [x3,y3], [x4,y4]])
     * @param {Number} order Order of the B-spline curve.
     * @return {Object} t 값에 의해 X, Y 좌표를 구하는 함수와 maxT 값을 반환
     * @static
     */
    BSpline: function (points, order) {
        var knots, N = [],
            _knotVector = function (n, k) {
                var j, kn = [];
                for (j = 0; j < n + k + 1; j++) {
                    if (j < k) {
                        kn[j] = 0.0;
                    } else if (j <= n) {
                        kn[j] = j - k + 1;
                    } else {
                        kn[j] = n - k + 2;
                    }
                }
                return kn;
            },

            _evalBasisFuncs = function (t, kn, n, k, s) {
                var i, j, a, b, den,
                    N = [];

                if (kn[s] <= t && t < kn[s + 1]) {
                    N[s] = 1;
                } else {
                    N[s] = 0;
                }
                for (i = 2; i <= k; i++) {
                    for (j = s - i + 1; j <= s; j++) {
                        if (j <= s - i + 1 || j < 0) {
                            a = 0.0;
                        } else {
                            a = N[j];
                        }
                        if (j >= s) {
                            b = 0.0;
                        } else {
                            b = N[j + 1];
                        }
                        den = kn[j + i - 1] - kn[j];
                        if (den === 0) {
                            N[j] = 0;
                        } else {
                            N[j] = (t - kn[j]) / den * a;
                        }
                        den = kn[j + i] - kn[j + 1];
                        if (den !== 0) {
                            N[j] += (kn[j + i] - t) / den * b;
                        }
                    }
                }
                return N;
            },
            makeFct = function (which) {
                return function (t, suspendedUpdate) {
                    var len = points.length, y, j, s,
                        n = len - 1,
                        k = order;

                    if (n <= 0) {
                        return NaN;
                    }
                    if (n + 2 <= k) {
                        k = n + 1;
                    }
                    if (t <= 0) {
                        return points[0][which];
                    }
                    if (t >= n - k + 2) {
                        return points[n][which];
                    }

                    knots = _knotVector(n, k);
                    s = Math.floor(t) + k - 1;
                    N = _evalBasisFuncs(t, knots, n, k, s);

                    y = 0.0;
                    for (j = s - k + 1; j <= s; j++) {
                        if (j < len && j >= 0) {
                            y += points[j][which] * N[j];
                        }
                    }
                    return y;
                };
            };

        return {
            getX: makeFct(0),
            getY: makeFct(1),
            maxT: points.length - 2
        };
    }
};
OG.CurveUtil = OG.common.CurveUtil;
/**
 * 사용자 정의 예외 클래스 NotSupportedException
 *
 * @class
 *
 * @param {String} message 메시지
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.NotSupportedException = function (message) {
    /**
     * 예외명
     * @type String
     */
    this.name = "OG.NotSupportedException";

    /**
     * 메시지
     * @type String
     */
    this.message = message || "Not Supported!";
};
OG.NotSupportedException = OG.common.NotSupportedException;

/**
 * 사용자 정의 예외 클래스 NotImplementedException
 *
 * @class
 *
 * @param {String} message 메시지
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.NotImplementedException = function (message) {
    /**
     * 예외명
     * @type String
     */
    this.name = "OG.NotImplementedException";

    /**
     * 메시지
     * @type String
     */
    this.message = message || "Not Implemented!";
};
OG.NotImplementedException = OG.common.NotImplementedException;

/**
 * 사용자 정의 예외 클래스 ParamError
 *
 * @class
 *
 * @param {String} message 메시지
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.ParamError = function (message) {
    /**
     * 예외명
     * @type String
     */
    this.name = "OG.ParamError";

    /**
     * 메시지
     * @type String
     */
    this.message = message || "Invalid Parameter Error!";
};
OG.ParamError = OG.common.ParamError;
/**
 * HashMap 구현 Javascript 클래스
 *
 * @class
 *
 * @example
 * var map1 = new OG.common.HashMap({
 *     'key1': 'value1',
 *     'key2': 'value2'
 * });
 *
 * console.log(map1.get('key1'));
 *
 * var map2 = new OG.common.HashMap();
 * map2.put('key1', 'value1');
 * map2.put('key2', 'value2');
 *
 * console.log(map2.get('key1'));
 *
 * @param {Object} jsonObject key:value 매핑 JSON 오브젝트
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.HashMap = function (jsonObject) {
    /**
     * key:value 매핑 JSON 오브젝트
     * @type Object
     */
    this.map = jsonObject || {};
};
OG.common.HashMap.prototype = {
    /**
     * key : value 를 매핑한다.
     *
     * @param {String} key 키
     * @param {Object} value 값
     */
    put: function (key, value) {
        this.map[key] = value;
    },

    /**
     * key 에 대한 value 를 반환한다.
     *
     * @param {String} key 키
     * @return {Object} 값
     */
    get: function (key) {
        return this.map[key];
    },

    /**
     * 주어진 key 를 포함하는지 여부를 반환한다.
     *
     * @param {String} key 키
     * @return {Boolean}
     */
    containsKey: function (key) {
        return this.map.hasOwnProperty(key);
    },

    /**
     * 주어진 value 를 포함하는지 여부를 반환한다.
     *
     * @param {Object} value 값
     * @return {Boolean}
     */
    containsValue: function (value) {
        var prop;
        for (prop in this.map) {
            if (this.map[prop] === value) {
                return true;
            }
        }
        return false;
    },

    /**
     * Empty 여부를 반환한다.
     *
     * @return {Boolean}
     */
    isEmpty: function () {
        return this.size() === 0;
    },

    /**
     * 매핑정보를 클리어한다.
     */
    clear: function () {
        var prop;
        for (prop in this.map) {
            delete this.map[prop];
        }
    },

    /**
     * 주어진 key 의 매핑정보를 삭제한다.
     *
     * @param {String} key 키
     */
    remove: function (key) {
        if (this.map[key]) {
            delete this.map[key];
        }
    },

    /**
     * key 목록을 반환한다.
     *
     * @return {String[]} 키목록
     */
    keys: function () {
        var keys = [], prop;
        for (prop in this.map) {
            keys.push(prop);
        }
        return keys;
    },

    /**
     * value 목록을 반환한다.
     *
     * @return {Object[]} 값목록
     */
    values: function () {
        var values = [], prop;
        for (prop in this.map) {
            values.push(this.map[prop]);
        }
        return values;
    },

    /**
     * 매핑된 key:value 갯수를 반환한다.
     *
     * @return {Number}
     */
    size: function () {
        var count = 0, prop;
        for (prop in this.map) {
            count++;
        }
        return count;
    },

    /**
     * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
     *
     * @return {String} 프라퍼티 정보
     * @override
     */
    toString: function () {
        var s = [], prop;
        for (prop in this.map) {
            s.push("'" + prop + "':'" + this.map[prop] + "'");
        }

        return "{" + s.join() + "}";
    }
};
OG.common.HashMap.prototype.constructor = OG.common.HashMap;
OG.HashMap = OG.common.HashMap;
/**
 * Modified version of Douglas Crockford"s json.js that doesn"t
 * mess with the Object prototype
 * http://www.json.org/js.html
 *
 * @class
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.JSON = new (function () {
    var useHasOwn = !!{}.hasOwnProperty,
        USE_NATIVE_JSON = false,
        isNative = (function () {
            var useNative = null;

            return function () {
                if (useNative === null) {
                    useNative = USE_NATIVE_JSON && window.JSON && JSON.toString() === '[object JSON]';
                }

                return useNative;
            };
        }()),
        m = {
            "\b": '\\b',
            "\t": '\\t',
            "\n": '\\n',
            "\f": '\\f',
            "\r": '\\r',
            '"': '\\"',
            "\\": '\\\\'
        },
        pad = function (n) {
            return n < 10 ? "0" + n : n;
        },
        doDecode = function (json) {
            return eval("(" + json + ')');
        },
        encodeString = function (s) {
            if (/["\\\x00-\x1f]/.test(s)) {
                return '"' + s.replace(/([\x00-\x1f\\"])/g, function (a, b) {
                    var c = m[b];
                    if (c) {
                        return c;
                    }
                    c = b.charCodeAt();
                    return "\\u00" +
                        Math.floor(c / 16).toString(16) +
                        (c % 16).toString(16);
                }) + '"';
            }
            return '"' + s + '"';
        },
        encodeArray = function (o) {
            var a = ["["], b, i, l = o.length, v;
            for (i = 0; i < l; i += 1) {
                v = o[i];
                switch (typeof v) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        if (b) {
                            a.push(',');
                        }
                        a.push(v === null ? "null" : OG.common.JSON.encode(v));
                        b = true;
                }
            }
            a.push("]");
            return a.join("");
        },
        doEncode = function (o) {
            if (!OG.Util.isDefined(o) || o === null) {
                return "null";
            } else if (OG.Util.isArray(o)) {
                return encodeArray(o);
            } else if (OG.Util.isDate(o)) {
                return OG.common.JSON.encodeDate(o);
            } else if (OG.Util.isString(o)) {
                return encodeString(o);
            } else if (typeof o === "number") {
                //don't use isNumber here, since finite checks happen inside isNumber
                return isFinite(o) ? String(o) : "null";
            } else if (OG.Util.isBoolean(o)) {
                return String(o);
            } else {
                var a = ["{"], b, i, v;
                for (i in o) {
                    // don't encode DOM objects
                    if (!o.getElementsByTagName) {
                        if (!useHasOwn || o.hasOwnProperty(i)) {
                            v = o[i];
                            switch (typeof v) {
                                case "undefined":
                                case "function":
                                case "unknown":
                                    break;
                                default:
                                    if (b) {
                                        a.push(',');
                                    }
                                    a.push(doEncode(i), ":",
                                        v === null ? "null" : doEncode(v));
                                    b = true;
                            }
                        }
                    }
                }
                a.push("}");
                return a.join("");
            }
        };

    /**
     * <p>Encodes a Date. This returns the actual string which is inserted into the JSON string as the literal expression.
     * <b>The returned value includes enclosing double quotation marks.</b></p>
     * <p>The default return format is "yyyy-mm-ddThh:mm:ss".</p>
     * <p>To override this:</p><pre><code>
     OG.common.JSON.encodeDate = function(d) {
	 return d.format('"Y-m-d"');
	 };
     </code></pre>
     * @param {Date} d The Date to encode
     * @return {String} The string literal to use in a JSON string.
     */
    this.encodeDate = function (o) {
        return '"' + o.getFullYear() + "-" +
            pad(o.getMonth() + 1) + "-" +
            pad(o.getDate()) + "T" +
            pad(o.getHours()) + ":" +
            pad(o.getMinutes()) + ":" +
            pad(o.getSeconds()) + '"';
    };

    /**
     * Encodes an Object, Array or other value
     * @param {Mixed} o The variable to encode
     * @return {String} The JSON string
     */
    this.encode = (function () {
        var ec;
        return function (o) {
            if (!ec) {
                // setup encoding function on first access
                ec = isNative() ? JSON.stringify : doEncode;
            }
            return ec(o);
        };
    }());


    /**
     * Decodes (parses) a JSON string to an object. If the JSON is invalid, this function throws a SyntaxError unless the safe option is set.
     * @param {String} json The JSON string
     * @return {Object} The resulting object
     */
    this.decode = (function () {
        var dc;
        return function (json) {
            if (!dc) {
                // setup decoding function on first access
                dc = isNative() ? JSON.parse : doDecode;
            }
            return dc(json);
        };
    }());

})();
OG.JSON = OG.common.JSON;

/**
 * 스타일(StyleSheet) Property 정보 클래스
 *
 * @class
 * @extends OG.common.HashMap
 *
 * @example
 * var style = new OG.geometry.Style({
 *     'cursor': 'default',
 *     'stroke': 'black'
 * });
 *
 * @param {Object} style 키:값 매핑된 스타일 프라퍼티 정보
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Style = function (style) {
    var DEFAULT_STYLE = {}, _style = {};

    OG.Util.apply(_style, style, DEFAULT_STYLE);

    OG.geometry.Style.superclass.call(this, _style);
};
OG.geometry.Style.prototype = new OG.common.HashMap();
OG.geometry.Style.superclass = OG.common.HashMap;
OG.geometry.Style.prototype.constructor = OG.geometry.Style;
OG.Style = OG.geometry.Style;
/**
 * 2차원 좌표계에서의 좌표값
 *
 * @example
 * var coordinate1 = new OG.geometry.Coordinate(10, 10);
 * or
 * var coordinate2 = new OG.geometry.Coordinate([20, 20]);
 *
 * @class
 *
 * @param {Number} x x좌표
 * @param {Number} y y좌표
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Coordinate = function (x, y) {

    /**
     * x좌표
     * @type Number
     */
    this.x = undefined;

    /**
     * y좌표
     * @type Number
     */
    this.y = undefined;

    // Array 좌표를 OG.geometry.Coordinate 로 변환
    if (arguments.length === 1 && x.constructor === Array) {
        this.x = x[0];
        this.y = x[1];
    } else if (arguments.length === 2 && typeof x === "number" && typeof y === "number") {
        this.x = x;
        this.y = y;
    } else if (arguments.length !== 0) {
        throw new OG.ParamError();
    }
};
OG.geometry.Coordinate.prototype = {

    /**
     * 주어진 좌표와의 거리를 계산한다.
     *
     * @example
     * coordinate.distance([10, 10]);
     * or
     * coordinate.distance(new OG.Coordinate(10, 10));
     *
     *
     * @param {OG.geometry.Coordinate,Number[]} coordinate 좌표값
     * @return {Number} 좌표간의 거리값
     */
    distance: function (coordinate) {
        if (coordinate.constructor === Array) {
            coordinate = new OG.geometry.Coordinate(coordinate[0], coordinate[1]);
        }

        var dx = this.x - coordinate.x, dy = this.y - coordinate.y;
        return OG.Util.round(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
    },

    /**
     * 가로, 세로 Offset 만큼 좌표를 이동한다.
     *
     * @param {Number} offsetX 가로 Offset
     * @param {Number} offsetY 세로 Offset
     * @return {OG.geometry.Coordinate} 이동된 좌표
     */
    move: function (offsetX, offsetY) {
        this.x += offsetX;
        this.y += offsetY;

        return this;
    },

    /**
     * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
     *
     * @example
     * coordinate.rotate(90, [10,10]);
     * or
     * coordinate.rotate(90, new OG.Coordinate(10, 10));
     *
     * @param {Number} angle 회전 각도
     * @param {OG.geometry.Coordinate,Number[]} origin 기준 좌표
     * @return {OG.geometry.Coordinate} 회전된 좌표
     */
    rotate: function (angle, origin) {
        if (origin.constructor === Array) {
            origin = new OG.geometry.Coordinate(origin[0], origin[1]);
        }

        angle *= Math.PI / 180;
        var radius = this.distance(origin),
            theta = angle + Math.atan2(this.y - origin.y, this.x - origin.x);
        this.x = OG.Util.round(origin.x + (radius * Math.cos(theta)));
        this.y = OG.Util.round(origin.y + (radius * Math.sin(theta)));

        return this;
    },

    /**
     * 주어진 좌표값과 같은지 비교한다.
     *
     * @example
     * coordinate.isEquals([10, 10]);
     * or
     * coordinate.isEquals(new OG.Coordinate(10, 10));
     *
     * @param {OG.geometry.Coordinate,Number[]} coordinate 좌표값
     * @return {Boolean} true:같음, false:다름
     */
    isEquals: function (coordinate) {
        if (coordinate.constructor === Array) {
            coordinate = new OG.geometry.Coordinate(coordinate[0], coordinate[1]);
        }

        if (coordinate && coordinate instanceof OG.geometry.Coordinate) {
            if (this.x === coordinate.x && this.y === coordinate.y) {
                return true;
            }
        }

        return false;
    },

    /**
     * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
     *
     * @return {String} 프라퍼티 정보
     * @override
     */
    toString: function () {
        var s = [];
        s.push(this.x);
        s.push(this.y);

        return "[" + s.join() + "]";
    }
};
OG.geometry.Coordinate.prototype.constructor = OG.geometry.Coordinate;
OG.Coordinate = OG.geometry.Coordinate;
/**
 * 2차원 좌표계에서 Envelope 영역을 정의
 *
 * @class
 * @requires OG.geometry.Coordinate
 *
 * @example
 * var boundingBox = new OG.geometry.Envelope([50, 50], 200, 100);
 *
 * @param {OG.geometry.Coordinate,Number[]} upperLeft 기준 좌상단 좌표
 * @param {Number} width 너비
 * @param {Number} height 높이
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Envelope = function (upperLeft, width, height) {

    /**
     * @type OG.geometry.Coordinate
     * @private
     */
    this._upperLeft = null;

    /**
     * @type Number
     * @private
     */
    this._width = width;

    /**
     * @type Number
     * @private
     */
    this._height = height;

    /**
     * @type OG.geometry.Coordinate
     * @private
     */
    this._upperRight = null;

    /**
     * @type OG.geometry.Coordinate
     * @private
     */
    this._lowerLeft = null;

    /**
     * @type OG.geometry.Coordinate
     * @private
     */
    this._lowerRight = null;

    /**
     * @type OG.geometry.Coordinate
     * @private
     */
    this._leftCenter = null;

    /**
     * @type OG.geometry.Coordinate
     * @private
     */
    this._leftCenter = null;

    /**
     * @type OG.geometry.Coordinate
     * @private
     */
    this._upperCenter = null;

    /**
     * @type OG.geometry.Coordinate
     * @private
     */
    this._rightCenter = null;

    /**
     * @type OG.geometry.Coordinate
     * @private
     */
    this._lowerCenter = null;

    /**
     * @type OG.geometry.Coordinate
     * @private
     */
    this._centroid = null;

    // Array 좌표를 OG.geometry.Coordinate 로 변환
    if (upperLeft) {
        if (upperLeft.constructor === Array) {
            this._upperLeft = new OG.geometry.Coordinate(upperLeft);
        } else {
            this._upperLeft = new OG.geometry.Coordinate(upperLeft.x, upperLeft.y);
        }
    }
};
OG.geometry.Envelope.prototype = {
    /**
     * 기준 좌상단 좌표를 반환한다.
     *
     * @return {OG.geometry.Coordinate} 좌상단 좌표
     */
    getUpperLeft: function () {
        return this._upperLeft;
    },

    /**
     * 주어진 좌표로 기준 좌상단 좌표를 설정한다. 새로 설정된 값으로 이동된다.
     *
     * @param {OG.geometry.Coordinate,Number[]} upperLeft 좌상단 좌표
     */
    setUpperLeft: function (upperLeft) {
        if (upperLeft.constructor === Array) {
            upperLeft = new OG.geometry.Coordinate(upperLeft[0], upperLeft[1]);
        }

        this._upperLeft = upperLeft;
        this._reset();
    },

    /**
     * 우상단 좌표를 반환한다.
     *
     * @return {OG.geometry.Coordinate} 우상단 좌표
     */
    getUpperRight: function () {
        if (!this._upperRight) {
            this._upperRight = new OG.geometry.Coordinate(this._upperLeft.x + this._width, this._upperLeft.y);
        }
        return this._upperRight;
    },

    /**
     * 우하단 좌표를 반환한다.
     *
     * @return {OG.geometry.Coordinate} 우하단 좌표
     */
    getLowerRight: function () {
        if (!this._lowerRight) {
            this._lowerRight = new OG.geometry.Coordinate(this._upperLeft.x + this._width, this._upperLeft.y + this._height);
        }
        return this._lowerRight;
    },

    /**
     * 좌하단 좌표를 반환한다.
     *
     * @return {OG.geometry.Coordinate} 좌하단 좌표
     */
    getLowerLeft: function () {
        if (!this._lowerLeft) {
            this._lowerLeft = new OG.geometry.Coordinate(this._upperLeft.x, this._upperLeft.y + this._height);
        }
        return this._lowerLeft;
    },

    /**
     * 좌중간 좌표를 반환한다.
     *
     * @return {OG.geometry.Coordinate} 좌중간 좌표
     */
    getLeftCenter: function () {
        if (!this._leftCenter) {
            this._leftCenter = new OG.geometry.Coordinate(this._upperLeft.x, OG.Util.round(this._upperLeft.y + this._height / 2));
        }
        return this._leftCenter;
    },

    /**
     * 상단중간 좌표를 반환한다.
     *
     * @return {OG.geometry.Coordinate} 상단중간 좌표
     */
    getUpperCenter: function () {
        if (!this._upperCenter) {
            this._upperCenter = new OG.geometry.Coordinate(OG.Util.round(this._upperLeft.x + this._width / 2), this._upperLeft.y);
        }
        return this._upperCenter;
    },

    /**
     * 우중간 좌표를 반환한다.
     *
     * @return {OG.geometry.Coordinate} 우중간 좌표
     */
    getRightCenter: function () {
        if (!this._rightCenter) {
            this._rightCenter = new OG.geometry.Coordinate(this._upperLeft.x + this._width, OG.Util.round(this._upperLeft.y + this._height / 2));
        }
        return this._rightCenter;
    },

    /**
     * 하단중간 좌표를 반환한다.
     *
     * @return {OG.geometry.Coordinate} 하단중간 좌표
     */
    getLowerCenter: function () {
        if (!this._lowerCenter) {
            this._lowerCenter = new OG.geometry.Coordinate(OG.Util.round(this._upperLeft.x + this._width / 2), this._upperLeft.y + this._height);
        }
        return this._lowerCenter;
    },

    /**
     * Envelope 의 중심좌표를 반환한다.
     *
     * @return {OG.geometry.Coordinate} 중심좌표
     */
    getCentroid: function () {
        if (!this._centroid) {
            this._centroid = new OG.geometry.Coordinate(OG.Util.round(this._upperLeft.x + this._width / 2),
                OG.Util.round(this._upperLeft.y + this._height / 2));
        }

        return this._centroid;
    },

    /**
     * 주어진 좌표로 중심 좌표를 설정한다. 새로 설정된 값으로 이동된다.
     *
     * @param {OG.geometry.Coordinate,Number[]} centroid 중심좌표
     */
    setCentroid: function (centroid) {
        if (centroid.constructor === Array) {
            centroid = new OG.geometry.Coordinate(centroid[0], centroid[1]);
        }

        this.move(centroid.x - this.getCentroid().x, centroid.y - this.getCentroid().y);
    },

    /**
     * Envelope 의 가로 사이즈를 반환한다.
     *
     * @return {Number} 너비
     */
    getWidth: function () {
        return this._width;
    },

    /**
     * 주어진 값으로 Envelope 의 가로 사이즈를 설정한다.
     *
     * @param {Number} width 너비
     */
    setWidth: function (width) {
        this._width = width;
        this._reset();
    },

    /**
     * Envelope 의 세로 사이즈를 반환한다.
     *
     * @return {Number} 높이
     */
    getHeight: function () {
        return this._height;
    },

    /**
     * 주어진 값으로 Envelope 의 세로 사이즈를 설정한다.
     *
     * @param {Number} height 높이
     */
    setHeight: function (height) {
        this._height = height;
        this._reset();
    },

    /**
     * Envelope 모든 꼭지점을 반환한다.
     * 좌상단좌표부터 시계방향으로 꼭지점 Array 를 반환한다.
     *
     * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array : [좌상단, 상단중간, 우상단, 우중간, 우하단, 하단중간, 좌하단, 좌중간, 좌상단]
     */
    getVertices: function () {
        var vertices = [];

        vertices.push(this.getUpperLeft());
        vertices.push(this.getUpperCenter());
        vertices.push(this.getUpperRight());
        vertices.push(this.getRightCenter());
        vertices.push(this.getLowerRight());
        vertices.push(this.getLowerCenter());
        vertices.push(this.getLowerLeft());
        vertices.push(this.getLeftCenter());
        vertices.push(this.getUpperLeft());

        return vertices;
    },

    /**
     * 주어진 좌표값이 Envelope 영역에 포함되는지 비교한다.
     *
     * @param {OG.geometry.Coordinate,Number[]} coordinate 좌표값
     * @return {Boolean} true:포함, false:비포함
     */
    isContains: function (coordinate) {
        if (coordinate.constructor === Array) {
            return coordinate[0] >= this._upperLeft.x && coordinate[0] <= this.getLowerRight().x &&
                coordinate[1] >= this._upperLeft.y && coordinate[1] <= this.getLowerRight().y;
        } else {
            return coordinate.x >= this._upperLeft.x && coordinate.x <= this.getLowerRight().x &&
                coordinate.y >= this._upperLeft.y && coordinate.y <= this.getLowerRight().y;
        }
    },

    /**
     * 주어진 모든 좌표값이 Envelope 영역에 포함되는지 비교한다.
     *
     * @param {OG.geometry.Coordinate[]} coordinateArray 좌표값 Array
     * @return {Boolean} true:포함, false:비포함
     */
    isContainsAll: function (coordinateArray) {
        var i;
        for (i = 0; i < coordinateArray.length; i++) {
            if (!this.isContains(coordinateArray[i])) {
                return false;
            }
        }

        return true;
    },

    /**
     * 크기는 고정한 채 가로, 세로 Offset 만큼 Envelope 을 이동한다.
     *
     * @param {Number} offsetX 가로 Offset
     * @param {Number} offsetY 세로 Offset
     * @return {OG.geometry.Envelope} 이동된 Envelope
     */
    move: function (offsetX, offsetY) {
        this._upperLeft.move(offsetX, offsetY);
        this._reset();

        return this;
    },

    /**
     * 상, 하, 좌, 우 외곽선을 이동하여 Envelope 을 리사이즈 한다.
     *
     * @param {Number} upper 상단 라인 이동 Offset(위 방향으로 +)
     * @param {Number} lower 하단 라인 이동 Offset(아래 방향으로 +)
     * @param {Number} left 좌측 라인 이동 Offset(좌측 방향으로 +)
     * @param {Number} right 우측 라인 이동 Offset(우측 방향으로 +)
     * @return {OG.geometry.Envelope} 리사이즈된 Envelope
     */
    resize: function (upper, lower, left, right) {
        upper = upper || 0;
        lower = lower || 0;
        left = left || 0;
        right = right || 0;

        if (this._width + (left + right) < 0 || this._height + (upper + lower) < 0) {
            throw new OG.ParamError();
        }

        this._upperLeft.move(-1 * left, -1 * upper);
        this._width += (left + right);
        this._height += (upper + lower);
        this._reset();

        return this;
    },

    /**
     * 주어진 Envelope 영역과 같은지 비교한다.
     *
     * @param {OG.geometry.Envelope} Envelope 영역
     * @return {Boolean} true:같음, false:다름
     */
    isEquals: function (envelope) {
        if (envelope && envelope instanceof OG.geometry.Envelope) {
            if (this.getUpperLeft().isEquals(envelope.getUpperLeft()) &&
                this.getWidth() === envelope.getWidth() &&
                this.getHeight() === envelope.getHeight()) {
                return true;
            }
        }

        return false;
    },

    /**
     * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
     *
     * @return {String} 프라퍼티 정보
     * @override
     */
    toString: function () {
        var s = [];
        s.push("upperLeft:" + this.getUpperLeft());
        s.push("width:" + this.getWidth());
        s.push("height:" + this.getHeight());
        s.push("upperRight:" + this.getUpperRight());
        s.push("lowerLeft:" + this.getLowerLeft());
        s.push("lowerRight:" + this.getLowerRight());
        s.push("leftCenter:" + this.getLeftCenter());
        s.push("upperCenter:" + this.getUpperCenter());
        s.push("rightCenter:" + this.getRightCenter());
        s.push("lowerCenter:" + this.getLowerCenter());
        s.push("centroid:" + this.getCentroid());

        return "{" + s.join() + "}";
    },

    /**
     * _upperLeft, _width, _height 를 제외한 private 멤버 변수의 값을 리셋한다.
     *
     * @private
     */
    _reset: function () {
        this._upperRight = null;
        this._lowerLeft = null;
        this._lowerRight = null;
        this._leftCenter = null;
        this._upperCenter = null;
        this._rightCenter = null;
        this._lowerCenter = null;
        this._centroid = null;
    }
};
OG.geometry.Envelope.prototype.constructor = OG.geometry.Envelope;
OG.Envelope = OG.geometry.Envelope;
/**
 * 공간 기하 객체(Spatial Geometry Object)의 최상위 추상 클래스
 *
 * @class
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Geometry = function () {

    /**
     * 공간 기하 객체 타입
     * @type Number
     */
    this.TYPE = OG.Constants.GEOM_TYPE.NULL;

    /**
     * 닫힌 기하 객체 인지 여부
     * @type Boolean
     */
    this.IS_CLOSED = false;

    /**
     * 스타일 속성
     * @type OG.geometry.Style
     */
    this.style = null;

    /**
     * 공간기하객체를 포함하는 사각형의 Boundary 영역
     * @type OG.geometry.Envelope
     */
    this.boundary = null;
};
OG.geometry.Geometry.prototype = {

    // 다른 Geometry 객체와의 Spatial Relation 을 테스트하는 함수들

    /**
     * 주어진 Geometry 객체와 같은지 비교한다.
     *
     * @param {OG.geometry.Geometry} _geometry Geometry 객체
     * @return {Boolean} true:같음, false:다름
     */
    isEquals: function (_geometry) {
        return _geometry && _geometry.toString() === this.toString();
    },

    /**
     * 주어진 공간기하객체를 포함하는지 비교한다.
     *
     * @param {OG.geometry.Geometry} _geometry Geometry 객체
     * @return {Boolean} 포함하면 true
     */
    isContains: function (_geometry) {
        throw new OG.NotImplementedException();
    },

    /**
     * 주어진 공간기하객체에 포함되는지 비교한다.
     *
     * @param {OG.geometry.Geometry} _geometry Geometry 객체
     * @return {Boolean} 포함되면 true
     */
    isWithin: function (_geometry) {
        throw new OG.NotImplementedException();
    },

//	isDisjoint: function (_geometry) {
//		throw new OG.NotImplementedException();
//	},
//
//	isIntersects: function (_geometry) {
//		throw new OG.NotImplementedException();
//	},
//
//	isOverlaps: function (_geometry) {
//		throw new OG.NotImplementedException();
//	},
//
//	isTouches: function (_geometry) {
//		throw new OG.NotImplementedException();
//	},

    // 현 Geometry 객체의 Spatial Analysis 를 지원하는 함수들

    /**
     * 공간기하객체를 포함하는 사각형의 Boundary 영역을 반환한다.
     *
     * @return {OG.geometry.Envelope} Envelope 영역
     */
    getBoundary: function () {
        if (this.boundary === null) {
            var minX, minY, maxX, maxY, upperLeft, width, height,
                vertices = this.getVertices(), i;
            for (i = 0; i < vertices.length; i++) {
                if (i === 0) {
                    minX = maxX = vertices[i].x;
                    minY = maxY = vertices[i].y;
                }
                minX = vertices[i].x < minX ? vertices[i].x : minX;
                minY = vertices[i].y < minY ? vertices[i].y : minY;
                maxX = vertices[i].x > maxX ? vertices[i].x : maxX;
                maxY = vertices[i].y > maxY ? vertices[i].y : maxY;
            }
            upperLeft = new OG.geometry.Coordinate(minX, minY);
            width = maxX - minX;
            height = maxY - minY;

            this.boundary = new OG.geometry.Envelope(upperLeft, width, height);
        }

        return this.boundary;
    },

    /**
     * 공간기하객체의 중심좌표를 반환한다.
     *
     * @return {OG.geometry.Coordinate} 중심좌표
     */
    getCentroid: function () {
        return this.getBoundary().getCentroid();
    },

    /**
     * 공간기하객체의 모든 꼭지점을 반환한다.
     *
     * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
     * @abstract
     */
    getVertices: function () {
        throw new OG.NotImplementedException();
    },

    /**
     * 주어진 좌표와의 최단거리를 반환한다.
     *
     * @param {OG.geometry.Coordinate} _coordinate 좌표
     * @return {Number} 최단거리
     */
    minDistance: function (_coordinate) {
        var minDistance = Number.MAX_VALUE,
            distance = 0,
            vertices = this.getVertices(),
            i;

        _coordinate = this.convertCoordinate(_coordinate);

        if (vertices.length === 1) {
            return _coordinate.distance(vertices[0]);
        }

        for (i = 0; i < vertices.length - 1; i++) {
            distance = this.distanceToLine(_coordinate, [vertices[i], vertices[i + 1]]);
            if (distance < minDistance) {
                minDistance = distance;
            }
        }

        return minDistance;
    },

    /**
     * 주어진 공간기하객체와의 중심점 간의 거리를 반환한다.
     *
     * @param {OG.geometry.Geometry} _geometry 공간 기하 객체
     * @return {Number} 거리
     */
    distance: function (_geometry) {
        return this.getCentroid().distance(_geometry.getCentroid());
    },

    /**
     * 공간기하객체의 길이를 반환한다.
     *
     * @return {Number} 길이
     */
    getLength: function () {
        var length = 0,
            vertices = this.getVertices(),
            i;
        for (i = 0; i < vertices.length - 1; i++) {
            length += vertices[i].distance(vertices[i + 1]);
        }

        return length;
    },

//	intersect : function (_geometry) {
//		throw new OG.NotImplementedException();
//	},
//
//	union : function (_geometry) {
//		throw new OG.NotImplementedException();
//	},

    // 현 Geometry 객체의 Spatial Transform 를 지원하는 함수들

    /**
     * 가로, 세로 Offset 만큼 좌표를 이동한다.
     *
     * @param {Number} offsetX 가로 Offset
     * @param {Number} offsetY 세로 Offset
     * @return {OG.geometry.Geometry} 이동된 공간 기하 객체
     * @abstract
     */
    move: function (offsetX, offsetY) {
        throw new OG.NotImplementedException();
    },

    /**
     * 주어진 중심좌표로 공간기하객체를 이동한다.
     *
     * @param {OG.geometry.Coordinate} 중심 좌표
     */
    moveCentroid: function (target) {
        var origin = this.getCentroid();
        target = new OG.geometry.Coordinate(target);

        this.move(target.x - origin.x, target.y - origin.y);
    },

    /**
     * 상, 하, 좌, 우 외곽선을 이동하여 Envelope 을 리사이즈 한다.
     *
     * @param {Number} upper 상단 라인 이동 Offset(위 방향으로 +)
     * @param {Number} lower 하단 라인 이동 Offset(아래 방향으로 +)
     * @param {Number} left 좌측 라인 이동 Offset(좌측 방향으로 +)
     * @param {Number} right 우측 라인 이동 Offset(우측 방향으로 +)
     * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
     * @abstract
     */
    resize: function (upper, lower, left, right) {
        throw new OG.NotImplementedException();
    },

    /**
     * 중심좌표는 고정한 채 Bounding Box 의 width, height 를 리사이즈 한다.
     *
     * @param {Number} width 너비
     * @param {Number} height 높이
     * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
     */
    resizeBox: function (width, height) {
        var boundary = this.getBoundary(),
            offsetWidth = OG.Util.round((width - boundary.getWidth()) / 2),
            offsetHeight = OG.Util.round((height - boundary.getHeight()) / 2);

        this.resize(offsetHeight, offsetHeight, offsetWidth, offsetWidth);

        return this;
    },

    /**
     * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
     *
     * @param {Number} angle 회전 각도
     * @param {OG.geometry.Coordinate} origin 기준 좌표(default:중심좌표)
     * @return {OG.geometry.Geometry} 회전된 공간 기하 객체
     * @abstract
     */
    rotate: function (angle, origin) {
        throw new OG.NotImplementedException();
    },

    /**
     * 주어진 Boundary 영역 안으로 공간 기하 객체를 적용한다.(이동 & 리사이즈)
     *
     * @param {OG.geometry.Envelope} envelope Envelope 영역
     * @return {OG.geometry.Geometry} 적용된 공간 기하 객체
     */
    fitToBoundary: function (envelope) {
        var boundary = this.getBoundary(),
            upper = boundary.getUpperCenter().y - envelope.getUpperCenter().y,
            lower = envelope.getLowerCenter().y - boundary.getLowerCenter().y,
            left = boundary.getLeftCenter().x - envelope.getLeftCenter().x,
            right = envelope.getRightCenter().x - boundary.getRightCenter().x;

        this.resize(upper, lower, left, right);

        return this;
    },

    // 유틸리티 함수들

    /**
     * 파라미터가 [x, y] 형식의 좌표 Array 이면 OG.geometry.Coordinate 인스턴스를 new 하여 반환한다.
     *
     * @param {OG.geometry.Coordinate,Number[]} coordinate [x, y] 형식의 좌표 Array 또는 OG.geometry.Coordinate 인스턴스
     * @return {OG.geometry.Coordinate}
     */
    convertCoordinate: function (coordinate) {
        // Array 좌표를 OG.geometry.Coordinate 로 변환
        if (coordinate) {
            if (coordinate.constructor === Array) {
                return new OG.geometry.Coordinate(coordinate);
            } else if (coordinate instanceof OG.geometry.Coordinate) {
                return new OG.geometry.Coordinate(coordinate.x, coordinate.y);
            } else {
                throw new OG.ParamError();
            }
        } else {
            return undefined;
        }
    },

    /**
     * 포인트 P 로부터 라인 AB의 거리를 계산한다.
     * Note: NON-ROBUST!
     *
     * @param {OG.geometry.Coordinate,Number[]} p 기준좌표
     * @param {OG.geometry.Coordinate[]} line 라인 시작좌표, 끝좌표 Array
     * @return {Number} 거리
     */
    distanceToLine: function (p, line) {
        var A = this.convertCoordinate(line[0]),
            B = this.convertCoordinate(line[1]),
            r, s;
        p = this.convertCoordinate(p);

        // if start==end, then use pt distance
        if (A.isEquals(B)) {
            return p.distance(A);
        }

        // otherwise use comp.graphics.algorithms Frequently Asked Questions method
        //	(1)				AC dot AB
        //			   r = -----------
        //					||AB||^2
        //	r has the following meaning:
        //	r=0 P = A
        //	r=1 P = B
        //	r<0 P is on the backward extension of AB
        //	r>1 P is on the forward extension of AB
        //	0<r<1 P is interior to AB

        r = ((p.x - A.x) * (B.x - A.x) + (p.y - A.y) * (B.y - A.y)) /
            ((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y));

        if (r <= 0.0) {
            return p.distance(A);
        }
        if (r >= 1.0) {
            return p.distance(B);
        }

        // (2)
        //		 (Ay-Cy)(Bx-Ax)-(Ax-Cx)(By-Ay)
        //	s = -----------------------------
        //					L^2
        //
        //	Then the distance from C to P = |s|*L.

        s = ((A.y - p.y) * (B.x - A.x) - (A.x - p.x) * (B.y - A.y)) /
            ((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y));

        return OG.Util.round(Math.abs(s) *
            Math.sqrt(((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y))));
    },

    /**
     * 라인1 로부터 라인2 의 거리를 계산한다.
     * Note: NON-ROBUST!
     *
     * @param {OG.geometry.Coordinate[]} line1 line1 라인 시작좌표, 끝좌표 Array
     * @param {OG.geometry.Coordinate[]} line2 line2 라인 시작좌표, 끝좌표 Array
     * @return {Number} 거리
     */
    distanceLineToLine: function (line1, line2) {
        var A = this.convertCoordinate(line1[0]),
            B = this.convertCoordinate(line1[1]),
            C = this.convertCoordinate(line2[0]),
            D = this.convertCoordinate(line2[1]),
            r_top, r_bot, s_top, s_bot, s, r;

        // check for zero-length segments
        if (A.isEquals(B)) {
            return this.distanceToLine(A, [C, D]);
        }
        if (C.isEquals(D)) {
            return this.distanceToLine(D, [A, B]);
        }

        // AB and CD are line segments
        //   from comp.graphics.algo
        //
        //  Solving the above for r and s yields
        //				(Ay-Cy)(Dx-Cx)-(Ax-Cx)(Dy-Cy)
        //			r = ----------------------------- (eqn 1)
        //				(Bx-Ax)(Dy-Cy)-(By-Ay)(Dx-Cx)
        //
        //			(Ay-Cy)(Bx-Ax)-(Ax-Cx)(By-Ay)
        //		s = ----------------------------- (eqn 2)
        //			(Bx-Ax)(Dy-Cy)-(By-Ay)(Dx-Cx)
        //	Let P be the position vector of the intersection point, then
        //		P=A+r(B-A) or
        //		Px=Ax+r(Bx-Ax)
        //		Py=Ay+r(By-Ay)
        //	By examining the values of r & s, you can also determine some other
        //	limiting conditions:
        //		If 0<=r<=1 & 0<=s<=1, intersection exists
        //		r<0 or r>1 or s<0 or s>1 line segments do not intersect
        //		If the denominator in eqn 1 is zero, AB & CD are parallel
        //		If the numerator in eqn 1 is also zero, AB & CD are collinear.
        r_top = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y);
        r_bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
        s_top = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y);
        s_bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);

        if ((r_bot === 0) || (s_bot === 0)) {
            return Math.min(this.distanceToLine(A, [C, D]),
                Math.min(this.distanceToLine(B, [C, D]),
                    Math.min(this.distanceToLine(C, [A, B]), this.distanceToLine(D, [A, B]))));

        }
        s = s_top / s_bot;
        r = r_top / r_bot;

        if ((r < 0) || (r > 1) || (s < 0) || (s > 1)) {
            //no intersection
            return Math.min(this.distanceToLine(A, [C, D]),
                Math.min(this.distanceToLine(B, [C, D]),
                    Math.min(this.distanceToLine(C, [A, B]), this.distanceToLine(D, [A, B]))));
        }

        //intersection exists
        return 0;
    },

    /**
     * 주어진 라인과 교차하는 좌표를 반환한다.
     *
     * @param {OG.geometry.Coordinate[]} line 라인 시작좌표, 끝좌표 Array
     * @return {OG.geometry.Coordinate[]}
     */
    intersectToLine: function (line) {
        var vertices = this.getVertices(), result = [], point, i,
            contains = function (coordinateArray, coordinate) {
                var k;
                for (k = 0; k < coordinateArray.length; k++) {
                    if (coordinateArray[k].isEquals(coordinate)) {
                        return true;
                    }
                }
                return false;
            };

        for (i = 0; i < vertices.length - 1; i++) {
            point = this.intersectLineToLine(line, [vertices[i], vertices[i + 1]]);
            if (point && !contains(result, point)) {
                result.push(point);
            }
        }

        return result;
    },

    /**
     * 라인1 로부터 라인2 의 교차점을 계산한다.
     *
     * @param {OG.geometry.Coordinate[]} line1 line1 라인 시작좌표, 끝좌표 Array
     * @param {OG.geometry.Coordinate[]} line2 line2 라인 시작좌표, 끝좌표 Array
     * @return {OG.geometry.Coordinate} 교차점
     */
    intersectLineToLine: function (line1, line2) {
        var A = this.convertCoordinate(line1[0]),
            B = this.convertCoordinate(line1[1]),
            C = this.convertCoordinate(line2[0]),
            D = this.convertCoordinate(line2[1]),
            result,
            resultText,
            r_top, r_bot, s_top, s_bot, r, s;

        // check for zero-length segments
        if (A.isEquals(B)) {
            return this.distanceToLine(A, [C, D]) === 0 ? A : undefined;
        }
        if (C.isEquals(D)) {
            return this.distanceToLine(C, [A, B]) === 0 ? C : undefined;
        }

        // AB and CD are line segments
        //   from comp.graphics.algo
        //
        //  Solving the above for r and s yields
        //				(Ay-Cy)(Dx-Cx)-(Ax-Cx)(Dy-Cy)
        //			r = ----------------------------- (eqn 1)
        //				(Bx-Ax)(Dy-Cy)-(By-Ay)(Dx-Cx)
        //
        //			(Ay-Cy)(Bx-Ax)-(Ax-Cx)(By-Ay)
        //		s = ----------------------------- (eqn 2)
        //			(Bx-Ax)(Dy-Cy)-(By-Ay)(Dx-Cx)
        //	Let P be the position vector of the intersection point, then
        //		P=A+r(B-A) or
        //		Px=Ax+r(Bx-Ax)
        //		Py=Ay+r(By-Ay)
        //	By examining the values of r & s, you can also determine some other
        //	limiting conditions:
        //		If 0<=r<=1 & 0<=s<=1, intersection exists
        //		r<0 or r>1 or s<0 or s>1 line segments do not intersect
        //		If the denominator in eqn 1 is zero, AB & CD are parallel
        //		If the numerator in eqn 1 is also zero, AB & CD are collinear.
        r_top = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y);
        r_bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
        s_top = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y);
        s_bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);

        if (r_bot !== 0 && s_bot !== 0) {
            r = r_top / r_bot;
            s = s_top / s_bot;
            if (0 <= r && r <= 1 && 0 <= s && s <= 1) {
                resultText = "Intersection";
                result = new OG.Coordinate(OG.Util.round(A.x + r * (B.x - A.x)), OG.Util.round(A.y + r * (B.y - A.y)));
            } else {
                resultText = "No Intersection";
            }
        } else {
            if (r_top === 0 || s_top === 0) {
                resultText = "Coincident";
            } else {
                resultText = "Parallel";
            }
        }

        return result;
    },

    /**
     * 라인1 로부터 라인2 의 교차점을 계산한다.
     *
     * @param {OG.geometry.Coordinate} center 중심점
     * @param {Number} radius 반경
     * @param {OG.geometry.Coordinate} from line 라인 시작좌표
     * @param {OG.geometry.Coordinate} to line 라인 끝좌표
     * @return {OG.geometry.Coordinate[]} 교차점
     */
    intersectCircleToLine: function (center, radius, from, to) {
        var result = [],
            a = (to.x - from.x) * (to.x - from.x) +
                (to.y - from.y) * (to.y - from.y),
            b = 2 * ( (to.x - from.x) * (from.x - center.x) +
                (to.y - from.y) * (from.y - center.y)   ),
            cc = center.x * center.x + center.y * center.y + from.x * from.x + from.y * from.y -
                2 * (center.x * from.x + center.y * from.y) - radius * radius,
            deter = b * b - 4 * a * cc,
            resultText,
            lerp = function (from, to, t) {
                return new OG.Coordinate(
                    OG.Util.round(from.x + (to.x - from.x) * t),
                    OG.Util.round(from.y + (to.y - from.y) * t)
                );
            },
            e, u1, u2;

        if (deter < 0) {
            resultText = "Outside";
        } else if (deter === 0) {
            resultText = "Tangent";
            // NOTE: should calculate this point
        } else {
            e = Math.sqrt(deter);
            u1 = (-b + e) / (2 * a);
            u2 = (-b - e) / (2 * a);

            if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
                if ((u1 < 0 && u2 < 0) || (u1 > 1 && u2 > 1)) {
                    resultText = "Outside";
                } else {
                    resultText = "Inside";
                }
            } else {
                resultText = "Intersection";

                if (0 <= u1 && u1 <= 1) {
                    result.push(lerp(from, to, u1));
                }

                if (0 <= u2 && u2 <= 1) {
                    result.push(lerp(from, to, u2));
                }
            }
        }

        return result;
    },

    /**
     * 저장된 boundary 를 클리어하여 새로 계산하도록 한다.
     */
    reset: function () {
        this.boundary = null;
    }
};
OG.geometry.Geometry.prototype.constructor = OG.geometry.Geometry;
/**
 * PolyLine 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Geometry
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @example
 * var geom = new OG.geometry.PolyLine([[20, 5], [30, 15], [40, 25], [50, 15]]);
 *
 * @param {OG.geometry.Coordinate[]} vertices Line Vertex 좌표 Array
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.PolyLine = function (vertices) {

    var i;

    this.TYPE = OG.Constants.GEOM_TYPE.POLYLINE;
    this.style = new OG.geometry.Style();

    /**
     * Line Vertex 좌표 Array
     * @type OG.geometry.Coordinate[]
     */
    this.vertices = [];

    // Array 좌표를 OG.geometry.Coordinate 로 변환
    if (vertices && vertices.length > 0) {
        for (i = 0; i < vertices.length; i++) {
            this.vertices.push(this.convertCoordinate(vertices[i]));
        }
    }
};
OG.geometry.PolyLine.prototype = new OG.geometry.Geometry();
OG.geometry.PolyLine.superclass = OG.geometry.Geometry;
OG.geometry.PolyLine.prototype.constructor = OG.geometry.PolyLine;
OG.PolyLine = OG.geometry.PolyLine;

/**
 * 공간기하객체의 모든 꼭지점을 반환한다.
 *
 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
 * @override
 */
OG.geometry.PolyLine.prototype.getVertices = function () {
    return this.vertices;
};

/**
 * 가로, 세로 Offset 만큼 좌표를 이동한다.
 *
 * @param {Number} offsetX 가로 Offset
 * @param {Number} offsetY 세로 Offset
 * @return {OG.geometry.Geometry} 이동된 공간 기하 객체
 * @override
 */
OG.geometry.PolyLine.prototype.move = function (offsetX, offsetY) {
    var i;
    this.getBoundary().move(offsetX, offsetY);
    for (i = 0; i < this.vertices.length; i++) {
        this.vertices[i].move(offsetX, offsetY);
    }

    return this;
};

/**
 * 상, 하, 좌, 우 외곽선을 이동하여 Envelope 을 리사이즈 한다.
 *
 * @param {Number} upper 상단 라인 이동 Offset(위 방향으로 +)
 * @param {Number} lower 하단 라인 이동 Offset(아래 방향으로 +)
 * @param {Number} left 좌측 라인 이동 Offset(좌측 방향으로 +)
 * @param {Number} right 우측 라인 이동 Offset(우측 방향으로 +)
 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
 * @override
 */
OG.geometry.PolyLine.prototype.resize = function (upper, lower, left, right) {
    var boundary = this.getBoundary(),
        offsetX = left + right,
        offsetY = upper + lower,
        width = boundary.getWidth() + offsetX,
        height = boundary.getHeight() + offsetY,
        rateWidth = boundary.getWidth() === 0 ? 1 : width / boundary.getWidth(),
        rateHeight = boundary.getHeight() === 0 ? 1 : height / boundary.getHeight(),
        upperLeft = boundary.getUpperLeft(),
        i;

    if (width < 0 || height < 0) {
        throw new OG.ParamError();
    }

    for (i = 0; i < this.vertices.length; i++) {
        this.vertices[i].x = OG.Util.round((upperLeft.x - left) + (this.vertices[i].x - upperLeft.x) * rateWidth);
        this.vertices[i].y = OG.Util.round((upperLeft.y - upper) + (this.vertices[i].y - upperLeft.y) * rateHeight);
    }
    boundary.resize(upper, lower, left, right);

    return this;
};

/**
 * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
 *
 * @param {Number} angle 회전 각도
 * @param {OG.geometry.Coordinate} origin 기준 좌표
 * @return {OG.geometry.Geometry} 회전된 공간 기하 객체
 * @override
 */
OG.geometry.PolyLine.prototype.rotate = function (angle, origin) {
    var i;
    origin = origin || this.getCentroid();
    for (i = 0; i < this.vertices.length; i++) {
        this.vertices[i].rotate(angle, origin);
    }
    this.reset();

    return this;
};

/**
 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
 *
 * @return {String} 프라퍼티 정보
 * @override
 */
OG.geometry.PolyLine.prototype.toString = function () {
    var s = [];
    s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
    s.push("vertices:[" + this.vertices + "]");

    return "{" + s.join() + "}";
};
/**
 * Catmull-Rom Spline Curve 공간 기하 객체(Spatial Geometry Object)
 * 모든 콘트롤포인트를 지나는 곡선을 나타낸다.
 *
 * @class
 * @extends OG.geometry.PolyLine
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry, OG.common.CurveUtil
 *
 * @example
 * var geom = new OG.geometry.Curve([[200, 100], [100, 300], [-100, -100], [-200, 100]]);
 *
 * @param {OG.geometry.Coordinate[]} controlPoints Curve Vertex 좌표 Array
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Curve = function (controlPoints) {

    OG.geometry.Curve.superclass.call(this, controlPoints);

    var t, cmRomSpline = OG.CurveUtil.CatmullRomSpline(eval("[" + this.vertices.toString() + "]"));

    // t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 Curve 를 그린다.
    this.vertices = [];
    for (t = 0; t <= cmRomSpline.maxT; t += 0.1) {
        this.vertices.push(new OG.geometry.Coordinate(
            OG.Util.round(cmRomSpline.getX(t)),
            OG.Util.round(cmRomSpline.getY(t))
        ));
    }

    this.TYPE = OG.Constants.GEOM_TYPE.CURVE;
    this.style = new OG.geometry.Style();
};
OG.geometry.Curve.prototype = new OG.geometry.PolyLine();
OG.geometry.Curve.superclass = OG.geometry.PolyLine;
OG.geometry.Curve.prototype.constructor = OG.geometry.Curve;
OG.Curve = OG.geometry.Curve;

/**
 * 콘트롤 포인트 목록을 반환한다.
 *
 * @return {OG.geometry.Coordinate[]} controlPoints Array
 */
OG.geometry.Curve.prototype.getControlPoints = function () {
    var controlPoints = [], i;
    for (i = 10; i <= this.vertices.length - 10; i += 10) {
        controlPoints.push(this.vertices[i]);
    }

    return controlPoints;
};

/**
 * 공간기하객체의 모든 꼭지점을 반환한다.
 *
 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
 * @override
 */
OG.geometry.Curve.prototype.getVertices = function () {
    var vertices = [], i;
    for (i = 10; i <= this.vertices.length - 10; i++) {
        vertices.push(this.vertices[i]);
    }

    return vertices;
};

/**
 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
 *
 * @return {String} 프라퍼티 정보
 * @override
 */
OG.geometry.Curve.prototype.toString = function () {
    var s = [];
    s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
    s.push("vertices:[" + this.getVertices() + "]");
    s.push("controlPoints:[" + this.getControlPoints() + "]");

    return "{" + s.join() + "}";
};
/**
 * Ellipse 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Curve
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @example
 * var geom = new OG.geometry.Ellipse([10, 10], 10, 5);
 *
 * @param {OG.geometry.Coordinate} center Ellipse 중심 좌표
 * @param {Number} radiusX X축 반경
 * @param {Number} radiusY Y축 반경
 * @param {Number} angle X축 기울기
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Ellipse = function (center, radiusX, radiusY, angle) {

    var _angle = angle || 0, _center = this.convertCoordinate(center), controlPoints = [], theta, i;

    if (_center) {
        for (i = -45; i <= 405; i += 45) {
            theta = Math.PI / 180 * i;
            controlPoints.push((new OG.geometry.Coordinate(
                OG.Util.round(_center.x + radiusX * Math.cos(theta)),
                OG.Util.round(_center.y + radiusY * Math.sin(theta))
            )).rotate(_angle, _center));
        }
    }

    OG.geometry.Ellipse.superclass.call(this, controlPoints);

    this.TYPE = OG.Constants.GEOM_TYPE.ELLIPSE;
    this.IS_CLOSED = true;
    this.style = new OG.geometry.Style();
};
OG.geometry.Ellipse.prototype = new OG.geometry.Curve();
OG.geometry.Ellipse.superclass = OG.geometry.Curve;
OG.geometry.Ellipse.prototype.constructor = OG.geometry.Ellipse;
OG.Ellipse = OG.geometry.Ellipse;

/**
 * 공간기하객체의 모든 꼭지점을 반환한다.
 *
 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
 * @override
 */
OG.geometry.Ellipse.prototype.getVertices = function () {
    var vertices = [], i;
    for (i = 20; i < this.vertices.length - 20; i++) {
        vertices.push(this.vertices[i]);
    }

    return vertices;
};

/**
 * 콘트롤 포인트 목록을 반환한다.
 *
 * @return {OG.geometry.Coordinate[]} controlPoints Array
 * @override
 */
OG.geometry.Ellipse.prototype.getControlPoints = function () {
    var controlPoints = [], i;
    for (i = 10; i <= this.vertices.length - 10; i += 10) {
        controlPoints.push(this.vertices[i]);
    }

    return controlPoints;
};

/**
 * 공간기하객체의 길이를 반환한다.
 *
 * @return {Number} 길이
 * @override
 */
OG.geometry.Ellipse.prototype.getLength = function () {
    // π{5(a+b)/4 - ab/(a+b)}
    var controlPoints = this.getControlPoints(),
        center = this.getCentroid(),
        radiusX = center.distance(controlPoints[1]),
        radiusY = center.distance(controlPoints[3]);
    return Math.PI * (5 * (radiusX + radiusY) / 4 - radiusX * radiusY / (radiusX + radiusY));
};

/**
 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
 *
 * @return {String} 프라퍼티 정보
 * @override
 */
OG.geometry.Ellipse.prototype.toString = function () {
    var s = [],
        controlPoints = this.getControlPoints(),
        center = this.getCentroid(),
        radiusX = center.distance(controlPoints[1]),
        radiusY = center.distance(controlPoints[3]),
        angle = OG.Util.round(Math.atan2(controlPoints[1].y - center.y, controlPoints[1].x - center.x) * 180 / Math.PI);

    s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
    s.push("center:" + center);
    s.push("radiusX:" + radiusX);
    s.push("radiusY:" + radiusY);
    s.push("angle:" + angle);

    return "{" + s.join() + "}";
};
/**
 * Cubic Bezier Curve 공간 기하 객체(Spatial Geometry Object)
 * 콘트롤포인트1, 콘트롤포인트2에 의해 시작좌표, 끝좌표를 지나는 곡선을 나타낸다.
 *
 * @class
 * @extends OG.geometry.PolyLine
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry, OG.common.CurveUtil
 *
 * @example
 * var geom = new OG.geometry.BezierCurve([[200, 100], [100, 300], [-100, -100], [-200, 100]]);
 *
 * @param {OG.geometry.Coordinate[]} controlPoints [from, control_point1, control_point2, to]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.BezierCurve = function (controlPoints) {
    var bezier, t, i;

    if (!controlPoints && controlPoints.length !== 4) {
        throw new OG.ParamError();
    }

    /**
     * Bezier Curve 콘트롤 좌표 Array
     * @type OG.geometry.Coordinate[]
     */
    this.controlPoints = [];

    // Array 좌표를 OG.geometry.Coordinate 로 변환
    if (controlPoints && controlPoints.length > 0) {
        for (i = 0; i < controlPoints.length; i++) {
            this.controlPoints.push(this.convertCoordinate(controlPoints[i]));
        }
    }

    // Bezier Curve
    bezier = OG.CurveUtil.Bezier(eval("[" + this.controlPoints.toString() + "]"));

    // t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 BezierCurve 를 그린다.
    this.vertices = [];
    for (t = 0; t <= bezier.maxT; t += 0.02) {
        this.vertices.push(new OG.geometry.Coordinate(
            OG.Util.round(bezier.getX(t)),
            OG.Util.round(bezier.getY(t))
        ));
    }

    this.TYPE = OG.Constants.GEOM_TYPE.BEZIER_CURVE;
    this.style = new OG.geometry.Style();
};
OG.geometry.BezierCurve.prototype = new OG.geometry.PolyLine();
OG.geometry.BezierCurve.superclass = OG.geometry.PolyLine;
OG.geometry.BezierCurve.prototype.constructor = OG.geometry.BezierCurve;
OG.BezierCurve = OG.geometry.BezierCurve;

/**
 * 콘트롤 포인트 목록을 반환한다.
 *
 * @return {OG.geometry.Coordinate[]} controlPoints Array
 */
OG.geometry.BezierCurve.prototype.getControlPoints = function () {
    return this.controlPoints;
};

/**
 * 공간기하객체의 모든 꼭지점을 반환한다.
 *
 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
 * @override
 */
OG.geometry.BezierCurve.prototype.getVertices = function () {
    var bezier, t, i;
    if (!this.vertices) {
        // Bezier Curve
        bezier = OG.CurveUtil.Bezier(eval("[" + this.controlPoints.toString() + "]"));

        // t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 BezierCurve 를 그린다.
        this.vertices = [];
        for (t = 0; t <= bezier.maxT; t += 0.02) {
            this.vertices.push(new OG.geometry.Coordinate(
                OG.Util.round(bezier.getX(t)),
                OG.Util.round(bezier.getY(t))
            ));
        }
    }

    return this.vertices;
};

/**
 * 가로, 세로 Offset 만큼 좌표를 이동한다.
 *
 * @param {Number} offsetX 가로 Offset
 * @param {Number} offsetY 세로 Offset
 * @return {OG.geometry.Geometry} 이동된 공간 기하 객체
 * @override
 */
OG.geometry.BezierCurve.prototype.move = function (offsetX, offsetY) {
    var i;
    for (i = 0; i < this.controlPoints.length; i++) {
        this.controlPoints[i].move(offsetX, offsetY);
    }
    this.reset();

    return this;
};

/**
 * 상, 하, 좌, 우 외곽선을 이동하여 Envelope 을 리사이즈 한다.
 *
 * @param {Number} upper 상단 라인 이동 Offset(위 방향으로 +)
 * @param {Number} lower 하단 라인 이동 Offset(아래 방향으로 +)
 * @param {Number} left 좌측 라인 이동 Offset(좌측 방향으로 +)
 * @param {Number} right 우측 라인 이동 Offset(우측 방향으로 +)
 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
 * @override
 */
OG.geometry.BezierCurve.prototype.resize = function (upper, lower, left, right) {
    throw new OG.NotSupportedException('OG.geometry.BezierCurve.resize() Not Supported!');
};

/**
 * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
 *
 * @param {Number} angle 회전 각도
 * @param {OG.geometry.Coordinate} origin 기준 좌표
 * @return {OG.geometry.Geometry} 회전된 공간 기하 객체
 * @override
 */
OG.geometry.BezierCurve.prototype.rotate = function (angle, origin) {
    var i;
    origin = origin || this.getCentroid();
    for (i = 0; i < this.controlPoints.length; i++) {
        this.controlPoints[i].rotate(angle, origin);
    }
    this.reset();

    return this;
};

/**
 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
 *
 * @return {String} 프라퍼티 정보
 * @override
 */
OG.geometry.BezierCurve.prototype.toString = function () {
    var s = [];
    s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
    s.push("vertices:[" + this.getVertices() + "]");
    s.push("controlPoints:[" + this.getControlPoints() + "]");

    return "{" + s.join() + "}";
};

/**
 * 저장된 boundary 를 클리어하여 새로 계산하도록 한다.
 * @override
 */
OG.geometry.BezierCurve.prototype.reset = function () {
    this.boundary = null;
    this.vertices = null;
};
/**
 * Circle 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Ellipse
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @example
 * var geom = new OG.geometry.Circle([10, 10], 5);
 *
 * @param {OG.geometry.Coordinate} center Circle 중심 좌표
 * @param {Number} radius radius 반경
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Circle = function (center, radius) {

    OG.geometry.Circle.superclass.call(this, center, radius, radius, 0);

    this.TYPE = OG.Constants.GEOM_TYPE.CIRCLE;
    this.style = new OG.geometry.Style();
};
OG.geometry.Circle.prototype = new OG.geometry.Ellipse();
OG.geometry.Circle.superclass = OG.geometry.Ellipse;
OG.geometry.Circle.prototype.constructor = OG.geometry.Circle;
OG.Circle = OG.geometry.Circle;

/**
 * 공간기하객체의 길이를 반환한다.
 *
 * @return {Number} 길이
 * @override
 */
OG.geometry.Circle.prototype.getLength = function () {
    var controlPoints = this.getControlPoints(),
        center = this.getCentroid(),
        radiusX = center.distance(controlPoints[1]);
    return 2 * Math.PI * radiusX;
};

/**
 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
 *
 * @return {String} 프라퍼티 정보
 * @override
 */
OG.geometry.Circle.prototype.toString = function () {
    var s = [],
        controlPoints = this.getControlPoints(),
        center = this.getCentroid(),
        radiusX = center.distance(controlPoints[1]),
        radiusY = center.distance(controlPoints[3]),
        angle = OG.Util.round(Math.atan2(controlPoints[1].y - center.y, controlPoints[1].x - center.x) * 180 / Math.PI);

    if (radiusX === radiusY) {
        s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
        s.push("center:" + center);
        s.push("radius:" + radiusX);
    } else {
        s.push("type:'" + OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.ELLIPSE] + "'");
        s.push("center:" + center);
        s.push("radiusX:" + radiusX);
        s.push("radiusY:" + radiusY);
        s.push("angle:" + angle);
    }

    return "{" + s.join() + "}";
};
/**
 * 공간 기하 객체(Spatial Geometry Object) Collection
 *
 * @class
 * @extends OG.geometry.Geometry
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @example
 * var geom1 = new OG.geometry.Point([20, 5]),
 *     geom2 = new OG.geometry.Line([20, 5], [30, 15]),
 *     geom3 = new OG.geometry.PolyLine([[20, 5], [30, 15], [40, 25], [50, 15]]);
 *
 * var collection = new OG.geometry.GeometryCollection([geom1, geom2, geom3]);
 *
 * @param geometries {OG.geometry.Geometry[]} 공간 기하 객체 Array
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.GeometryCollection = function (geometries) {

    this.TYPE = OG.Constants.GEOM_TYPE.COLLECTION;
    this.style = new OG.geometry.Style();

    /**
     * 공간 기하 객체 Array
     * @type OG.geometry.Geometry[]
     */
    this.geometries = geometries;
};
OG.geometry.GeometryCollection.prototype = new OG.geometry.Geometry();
OG.geometry.GeometryCollection.superclass = OG.geometry.Geometry;
OG.geometry.GeometryCollection.prototype.constructor = OG.geometry.GeometryCollection;
OG.GeometryCollection = OG.geometry.GeometryCollection;

/**
 * 공간기하객체의 모든 꼭지점을 반환한다.
 *
 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
 * @override
 */
OG.geometry.GeometryCollection.prototype.getVertices = function () {
    var vertices = [], _vertices, i, j;
    for (i = 0; i < this.geometries.length; i++) {
        _vertices = this.geometries[i].getVertices();
        for (j = 0; j < _vertices.length; j++) {
            vertices.push(_vertices[j]);
        }
    }

    return vertices;
};

/**
 * 가로, 세로 Offset 만큼 좌표를 이동한다.
 *
 * @param {Number} offsetX 가로 Offset
 * @param {Number} offsetY 세로 Offset
 * @return {OG.geometry.Geometry} 이동된 공간 기하 객체
 * @override
 */
OG.geometry.GeometryCollection.prototype.move = function (offsetX, offsetY) {
    var i;
    this.getBoundary().move(offsetX, offsetY);
    for (i = 0; i < this.geometries.length; i++) {
        this.geometries[i].move(offsetX, offsetY);
        this.geometries[i].reset();
    }

    return this;
};

/**
 * 상, 하, 좌, 우 외곽선을 이동하여 Envelope 을 리사이즈 한다.
 *
 * @param {Number} upper 상단 라인 이동 Offset(위 방향으로 +)
 * @param {Number} lower 하단 라인 이동 Offset(아래 방향으로 +)
 * @param {Number} left 좌측 라인 이동 Offset(좌측 방향으로 +)
 * @param {Number} right 우측 라인 이동 Offset(우측 방향으로 +)
 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
 * @override
 */
OG.geometry.GeometryCollection.prototype.resize = function (upper, lower, left, right) {
    var boundary = this.getBoundary(),
        offsetX = left + right,
        offsetY = upper + lower,
        width = boundary.getWidth() + offsetX,
        height = boundary.getHeight() + offsetY,
        rateWidth = boundary.getWidth() === 0 ? 1 : width / boundary.getWidth(),
        rateHeight = boundary.getHeight() === 0 ? 1 : height / boundary.getHeight(),
        upperLeft = boundary.getUpperLeft(),
        vertices, i, j;

    if (width < 0 || height < 0) {
        throw new OG.ParamError();
    }

    for (i = 0; i < this.geometries.length; i++) {
        vertices = this.geometries[i].vertices;
        for (j = 0; j < vertices.length; j++) {
            vertices[j].x = OG.Util.round((upperLeft.x - left) + (vertices[j].x - upperLeft.x) * rateWidth);
            vertices[j].y = OG.Util.round((upperLeft.y - upper) + (vertices[j].y - upperLeft.y) * rateHeight);
        }
        this.geometries[i].reset();
    }
    boundary.resize(upper, lower, left, right);

    return this;
};

/**
 * 중심좌표는 고정한 채 Bounding Box 의 width, height 를 리사이즈 한다.
 *
 * @param {Number} width 너비
 * @param {Number} height 높이
 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
 * @override
 */
OG.geometry.GeometryCollection.prototype.resizeBox = function (width, height) {
    var boundary = this.getBoundary(),
        offsetWidth = OG.Util.round((width - boundary.getWidth()) / 2),
        offsetHeight = OG.Util.round((height - boundary.getHeight()) / 2);

    this.resize(offsetHeight, offsetHeight, offsetWidth, offsetWidth);

    return this;
};

/**
 * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
 *
 * @param {Number} angle 회전 각도
 * @param {OG.geometry.Coordinate} origin 기준 좌표(default:중심좌표)
 * @return {OG.geometry.Geometry} 회전된 공간 기하 객체
 * @override
 */
OG.geometry.GeometryCollection.prototype.rotate = function (angle, origin) {
    var i;
    origin = origin || this.getCentroid();
    for (i = 0; i < this.geometries.length; i++) {
        this.geometries[i].rotate(angle, origin);
        this.geometries[i].reset();
    }
    this.reset();

    return this;
};

/**
 * 주어진 Boundary 영역 안으로 공간 기하 객체를 적용한다.(이동 & 리사이즈)
 *
 * @param {OG.geometry.Envelope} envelope Envelope 영역
 * @return {OG.geometry.Geometry} 적용된 공간 기하 객체
 * @override
 */
OG.geometry.GeometryCollection.prototype.fitToBoundary = function (envelope) {
    var boundary = this.getBoundary(),
        upper = boundary.getUpperCenter().y - envelope.getUpperCenter().y,
        lower = envelope.getLowerCenter().y - boundary.getLowerCenter().y,
        left = boundary.getLeftCenter().x - envelope.getLeftCenter().x,
        right = envelope.getRightCenter().x - boundary.getRightCenter().x;

    this.resize(upper, lower, left, right);

    return this;
};

/**
 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
 *
 * @return {String} 프라퍼티 정보
 * @override
 */
OG.geometry.GeometryCollection.prototype.toString = function () {
    var s = [], i;

    for (i = 0; i < this.geometries.length; i++) {
        s.push(this.geometries[i].toString());
    }

    return "{type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "',geometries:[" + s.join() + "]}";
};
/**
 * Line 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.PolyLine
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @example
 * var geom = new OG.geometry.Line([20, 5], [30, 15]);
 *
 * @param {OG.geometry.Coordinate} from 라인 시작 좌표값
 * @param {OG.geometry.Coordinate} to 라인 끝 좌표값
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Line = function (from, to) {

    var _from = this.convertCoordinate(from),
        _to = this.convertCoordinate(to);

    OG.geometry.Line.superclass.call(this, [
        [_from.x, _from.y],
        [_to.x, _to.y]
    ]);

    this.TYPE = OG.Constants.GEOM_TYPE.LINE;
    this.style = new OG.geometry.Style();
};
OG.geometry.Line.prototype = new OG.geometry.PolyLine();
OG.geometry.Line.superclass = OG.geometry.PolyLine;
OG.geometry.Line.prototype.constructor = OG.geometry.Line;
OG.Line = OG.geometry.Line;


/**
 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
 *
 * @return {String} 프라퍼티 정보
 * @override
 */
OG.geometry.Line.prototype.toString = function () {
    var s = [];
    s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
    s.push("from:" + this.vertices[0]);
    s.push("to:" + this.vertices[1]);

    return "{" + s.join() + "}";
};
/**
 * Point 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Geometry
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @example
 * var geom = new OG.geometry.Point([20, 5]);
 *
 * @param {OG.geometry.Coordinate} coordinate 좌표값
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Point = function (coordinate) {

    this.TYPE = OG.Constants.GEOM_TYPE.POINT;
    this.style = new OG.geometry.Style();

    /**
     * 좌표값
     * @type OG.geometry.Coordinate
     */
    this.coordinate = this.convertCoordinate(coordinate);

    /**
     * Line Vertex 좌표 Array
     * @type OG.geometry.Coordinate[]
     */
    this.vertices = [this.coordinate];
};
OG.geometry.Point.prototype = new OG.geometry.Geometry();
OG.geometry.Point.superclass = OG.geometry.Geometry;
OG.geometry.Point.prototype.constructor = OG.geometry.Point;
OG.Point = OG.geometry.Point;

/**
 * 공간기하객체의 모든 꼭지점을 반환한다.
 *
 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
 * @override
 */
OG.geometry.Point.prototype.getVertices = function () {
    return this.vertices;
};

/**
 * 가로, 세로 Offset 만큼 좌표를 이동한다.
 *
 * @param {Number} offsetX 가로 Offset
 * @param {Number} offsetY 세로 Offset
 * @return {OG.geometry.Geometry} 이동된 공간 기하 객체
 * @override
 */
OG.geometry.Point.prototype.move = function (offsetX, offsetY) {
    this.getBoundary().move(offsetX, offsetY);
    this.coordinate.move(offsetX, offsetY);
    this.vertices = [this.coordinate];

    return this;
};

/**
 * 주어진 중심좌표로 공간기하객체를 이동한다.
 *
 * @param {OG.geometry.Coordinate} 중심 좌표
 * @override
 */
OG.geometry.Point.prototype.moveCentroid = function (target) {
    this.getBoundary().setUpperLeft(target);
    this.coordinate = new OG.geometry.Coordinate(target);
    this.vertices = [this.coordinate];
};

/**
 * 상, 하, 좌, 우 외곽선을 이동하여 Envelope 을 리사이즈 한다.
 *
 * @param {Number} upper 상단 라인 이동 Offset(위 방향으로 +)
 * @param {Number} lower 하단 라인 이동 Offset(아래 방향으로 +)
 * @param {Number} left 좌측 라인 이동 Offset(좌측 방향으로 +)
 * @param {Number} right 우측 라인 이동 Offset(우측 방향으로 +)
 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
 * @override
 */
OG.geometry.Point.prototype.resize = function (upper, lower, left, right) {
    var boundary = this.getBoundary();
    boundary.resize(upper, lower, left, right);

    this.coordinate = boundary.getCentroid();
    this.vertices = [this.coordinate];
    this.boundary = new OG.Envelope(this.coordinate, 0, 0);

    return this;
};

/**
 * 중심좌표는 고정한 채 Bounding Box 의 width, height 를 리사이즈 한다.
 *
 * @param {Number} width 너비
 * @param {Number} height 높이
 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
 * @override
 */
OG.geometry.Point.prototype.resizeBox = function (width, height) {
    return this;
};

/**
 * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
 *
 * @param {Number} angle 회전 각도
 * @param {OG.geometry.Coordinate} origin 기준 좌표
 * @return {OG.geometry.Geometry} 회전된 공간 기하 객체
 * @override
 */
OG.geometry.Point.prototype.rotate = function (angle, origin) {
    origin = origin || this.getCentroid();

    this.coordinate.rotate(angle, origin);
    this.vertices = [this.coordinate];
    this.reset();

    return this;
};

/**
 * 주어진 Boundary 영역 안으로 공간 기하 객체를 적용한다.(이동 & 리사이즈)
 *
 * @param {OG.geometry.Envelope} envelope Envelope 영역
 * @return {OG.geometry.Geometry} 적용된 공간 기하 객체
 * @override
 */
OG.geometry.Point.prototype.fitToBoundary = function (envelope) {
    this.coordinate = envelope.getCentroid();
    this.vertices = [this.coordinate];
    this.boundary = new OG.Envelope(this.coordinate, 0, 0);

    return this;
};

/**
 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
 *
 * @return {String} 프라퍼티 정보
 * @override
 */
OG.geometry.Point.prototype.toString = function () {
    var s = [];
    s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
    s.push("coordinate:" + this.coordinate);

    return "{" + s.join() + "}";
};
/**
 * Polygon 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.PolyLine
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @example
 * var geom = new OG.geometry.Polygon([[20, 5], [30, 15], [40, 25], [50, 15], [60, 5], [20, 5]]);
 *
 * @param {OG.geometry.Coordinate[]} vertices Line Vertex 좌표 Array
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Polygon = function (vertices) {

    OG.geometry.Polygon.superclass.call(this, vertices);

    // Polygon 은 첫번째 좌표와 마지막 좌표가 같음
    if (this.vertices.length > 0 && !this.vertices[0].isEquals(this.vertices[this.vertices.length - 1])) {
        this.vertices.push(new OG.geometry.Coordinate(this.vertices[0].x, this.vertices[0].y));
    }

    this.TYPE = OG.Constants.GEOM_TYPE.POLYGON;
    this.IS_CLOSED = true;
    this.style = new OG.geometry.Style();
};
OG.geometry.Polygon.prototype = new OG.geometry.PolyLine();
OG.geometry.Polygon.superclass = OG.geometry.PolyLine;
OG.geometry.Polygon.prototype.constructor = OG.geometry.Polygon;
OG.Polygon = OG.geometry.Polygon;
/**
 * Rectangle 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Polygon
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @example
 * var geom = new OG.geometry.Rectangle([20, 5], 10, 10);
 *
 * @param {OG.geometry.Coordinate} upperLeft 좌상단좌표
 * @param {Number} width 너비
 * @param {Number} height 높이
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Rectangle = function (upperLeft, width, height) {

    var _upperLeft = this.convertCoordinate(upperLeft),
        _lowerRight = this.convertCoordinate([_upperLeft.x + width, _upperLeft.y + height]);

    // 파라미터 유효성 체크
    if (_upperLeft.x > _lowerRight.x || _upperLeft.y > _lowerRight.y) {
        throw new OG.ParamError();
    }

    OG.geometry.Rectangle.superclass.call(this, [
        [_upperLeft.x, _upperLeft.y],
        [_upperLeft.x + (_lowerRight.x - _upperLeft.x), _upperLeft.y],
        [_lowerRight.x, _lowerRight.y],
        [_upperLeft.x, _upperLeft.y + (_lowerRight.y - _upperLeft.y)],
        [_upperLeft.x, _upperLeft.y]
    ]);

    this.TYPE = OG.Constants.GEOM_TYPE.RECTANGLE;
    this.style = new OG.geometry.Style();
};
OG.geometry.Rectangle.prototype = new OG.geometry.Polygon();
OG.geometry.Rectangle.superclass = OG.geometry.Polygon;
OG.geometry.Rectangle.prototype.constructor = OG.geometry.Rectangle;
OG.Rectangle = OG.geometry.Rectangle;

/**
 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
 *
 * @return {String} 프라퍼티 정보
 * @override
 */
OG.geometry.Rectangle.prototype.toString = function () {
    var s = [],
        angle = OG.Util.round(Math.atan2(this.vertices[1].y - this.vertices[0].y,
            this.vertices[1].x - this.vertices[0].x) * 180 / Math.PI);

    s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
    s.push("upperLeft:" + this.vertices[0]);
    s.push("width:" + (this.vertices[0].distance(this.vertices[1])));
    s.push("height:" + (this.vertices[0].distance(this.vertices[3])));
    s.push("angle:" + angle);

    return "{" + s.join() + "}";
};
/**
 * 도형, 텍스트, 이미지 등의 드로잉 될 Object 의 정보를 저장하는 Shape 정보 최상위 인터페이스
 *
 * @class
 * @requires OG.common.*, OG.geometry.*
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.IShape = function () {
    /**
     * Shape 유형(GEOM, TEXT, HTML, IMAGE, EDGE, GROUP)
     * @type String
     */
    this.TYPE = null;

    /**
     * Shape 을 구분하는 Shape ID(Shape 클래스명과 일치)
     * @type String
     */
    this.SHAPE_ID = null;

    /**
     * Shape 모양을 나타내는 공간기하객체(Geometry)
     * @type OG.geometry.Geometry
     */
    this.geom = null;

    /**
     * Shape 라벨 텍스트
     * @type String
     */
    this.label = null;

    /**
     * Shape 의 Collapse 여부
     * @type Boolean
     */
    this.isCollapsed = false;

//	 이벤트 속성
    /**
     * 선택 가능여부
     * @type Boolean
     */
    this.SELECTABLE = true;

    /**
     * 이동 가능여부
     * @type Boolean
     */
    this.MOVABLE = true;

    /**
     * 리사이즈 가능여부
     * @type Boolean
     */
    this.RESIZABLE = true;

    /**
     * 연결 가능여부
     * @type Boolean
     */
    this.CONNECTABLE = true;

    /**
     * Self 연결 가능여부
     * @type Boolean
     */
    this.SELF_CONNECTABLE = true;

    /**
     * 드래그하여 연결시 대상 없을 경우 자동으로 Shape 복사하여 연결 처리 여부
     * @type Boolean
     */
    this.CONNECT_CLONEABLE = true;

    /**
     * 드래그하여 연결시 연결대상 있는 경우에만 Edge 드로잉 처리 여부
     * @type Boolean
     */
    this.CONNECT_REQUIRED = true;

    /**
     * 라벨 수정여부
     * @type Boolean
     */
    this.LABEL_EDITABLE = true;
};
OG.shape.IShape.prototype = {
    /**
     * Shape 간의 연결을 위한 Terminal 을 반환한다.
     *
     * @return {OG.Terminal[]} Terminal
     */
    createTerminal: function () {
        if (!this.geom) {
            return [];
        }

        var envelope = this.geom.getBoundary();

        return [
            new OG.Terminal(envelope.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.INOUT),
            new OG.Terminal(envelope.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.INOUT),
            new OG.Terminal(envelope.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.INOUT),
            new OG.Terminal(envelope.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.INOUT),
            new OG.Terminal(envelope.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.INOUT)
        ];
    },

    /**
     * 드로잉할 Shape 를 생성하여 반환한다.
     *
     * @return {*} Shape 정보
     * @abstract
     */
    createShape: function () {
        throw new OG.NotImplementedException("OG.shape.IShape.createShape");
    },

    /**
     * Shape 을 복사하여 새로인 인스턴스로 반환한다.
     *
     * @return {OG.shape.IShape} 복사된 인스턴스
     * @abstract
     */
    clone: function () {
        throw new OG.NotImplementedException("OG.shape.IShape.clone");
    }
};
OG.shape.IShape.prototype.constructor = OG.shape.IShape;
OG.IShape = OG.shape.IShape;
/**
 * Shape 의 Edge 연결 포인트 정보
 *
 * @class
 * @requires OG.common.*, OG.geometry.*
 *
 * @param position {OG.geometry.Coordinate} 위치좌표값
 * @param direction {String} 연결위치 (C:Center, E:East, W:West, S:South, N:North)
 * @param inout {String} 연결모드 (IN, OUT, INOUT)
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.Terminal = function (position, direction, inout) {
    /**
     * 위치좌표값
     * @type OG.geometry.Coordinate
     */
    this.position = position;

    /**
     * 연결위치 (C:Center, E:East, W:West, S:South, N:North)
     * @type String
     */
    this.direction = direction || OG.Constants.TERMINAL_TYPE.E;

    /**
     * 연결모드 (IN, OUT, INOUT)
     * @type String
     */
    this.inout = inout || OG.Constants.TERMINAL_TYPE.INOUT;
};
OG.shape.Terminal.prototype = new OG.shape.Terminal();
OG.shape.Terminal.prototype.constructor = OG.shape.Terminal;
OG.Terminal = OG.shape.Terminal;
/**
 * Geometry Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.GeomShape = function () {
    OG.shape.GeomShape.superclass.call(this);

    this.TYPE = OG.Constants.SHAPE_TYPE.GEOM;
};
OG.shape.GeomShape.prototype = new OG.shape.IShape();
OG.shape.GeomShape.superclass = OG.shape.IShape;
OG.shape.GeomShape.prototype.constructor = OG.shape.GeomShape;
OG.GeomShape = OG.shape.GeomShape;

/**
 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
 *
 * @return {OG.shape.IShape} 복사된 인스턴스
 * @override
 */
OG.shape.GeomShape.prototype.clone = function () {
    var shape = eval('new ' + this.SHAPE_ID + '()');
    shape.label = this.label;

    return shape;
};
/**
 * Text Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} text 텍스트
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.TextShape = function (text) {
    OG.shape.TextShape.superclass.call(this);

    this.TYPE = OG.Constants.SHAPE_TYPE.TEXT;
    this.SHAPE_ID = 'OG.shape.TextShape';

    /**
     * 드로잉할 텍스트
     * @type String
     */
    this.text = text || "Text Here";

    /**
     * 회전각도
     * @type Number
     */
    this.angle = 0;
};
OG.shape.TextShape.prototype = new OG.shape.IShape();
OG.shape.TextShape.superclass = OG.shape.IShape;
OG.shape.TextShape.prototype.constructor = OG.shape.TextShape;
OG.TextShape = OG.shape.TextShape;

/**
 * 드로잉할 텍스트를 반환한다.
 *
 * @return {String} 텍스트
 * @override
 */
OG.shape.TextShape.prototype.createShape = function () {
    return this.text;
};

/**
 * Shape 간의 연결을 위한 Terminal 을 반환한다.
 *
 * @return {OG.Terminal[]} Terminal
 * @override
 */
OG.shape.TextShape.prototype.createTerminal = function () {
    return [];
};

/**
 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
 *
 * @return {OG.shape.IShape} 복사된 인스턴스
 * @override
 */
OG.shape.TextShape.prototype.clone = function () {
    var shape = eval('new ' + this.SHAPE_ID + '()');
    shape.text = this.text;
    shape.angle = this.angle;

    return shape;
};
/**
 * Image Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} image 이미지 URL
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.ImageShape = function (image, label) {
    OG.shape.ImageShape.superclass.call(this);

    this.TYPE = OG.Constants.SHAPE_TYPE.IMAGE;
    this.SHAPE_ID = 'OG.shape.ImageShape';
    this.label = label;

    /**
     * 드로잉할 이미지 URL
     * @type String
     */
    this.image = image;

    /**
     * 회전각도
     * @type Number
     */
    this.angle = 0;
};
OG.shape.ImageShape.prototype = new OG.shape.IShape();
OG.shape.ImageShape.superclass = OG.shape.IShape;
OG.shape.ImageShape.prototype.constructor = OG.shape.ImageShape;
OG.ImageShape = OG.shape.ImageShape;

/**
 * 드로잉할 이미지 URL을 반환한다.
 *
 * @return {String} 이미지 URL
 * @override
 */
OG.shape.ImageShape.prototype.createShape = function () {
    return this.image;
};

/**
 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
 *
 * @return {OG.shape.IShape} 복사된 인스턴스
 * @override
 */
OG.shape.ImageShape.prototype.clone = function () {
    var shape = eval('new ' + this.SHAPE_ID + '()');
    shape.image = this.image;
    shape.label = this.label;
    shape.angle = this.angle;

    return shape;
};
/**
 * Edge Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {Number[]} from 와이어 시작 좌표
 * @param {Number[]} to 와이어 끝 좌표
 * @param {String} label 라벨 [Optional]
 * @param {String} fromLabel 시작점 라벨 [Optional]
 * @param {String} toLabel 끝점 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.EdgeShape = function (from, to, label, fromLabel, toLabel) {
    OG.shape.EdgeShape.superclass.call(this);

    this.TYPE = OG.Constants.SHAPE_TYPE.EDGE;
    this.SHAPE_ID = 'OG.shape.EdgeShape';

    /**
     * Edge 시작 좌표
     * @type Number[]
     */
    this.from = from;

    /**
     * Edge 끝 좌표
     * @type Number[]
     */
    this.to = to;

    this.label = label;

    /**
     * Edge 시작점 라벨
     * @type String
     */
    this.fromLabel = fromLabel;

    /**
     * Edge 끝점 라벨
     * @type String
     */
    this.toLabel = toLabel;
};
OG.shape.EdgeShape.prototype = new OG.shape.IShape();
OG.shape.EdgeShape.superclass = OG.shape.IShape;
OG.shape.EdgeShape.prototype.constructor = OG.shape.EdgeShape;
OG.EdgeShape = OG.shape.EdgeShape;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.EdgeShape.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.Line(this.from, this.to);
    return this.geom;
};

/**
 * Shape 간의 연결을 위한 Terminal 을 반환한다.
 *
 * @return {OG.Terminal[]} Terminal
 * @override
 */
OG.shape.EdgeShape.prototype.createTerminal = function () {
    return [];
};

/**
 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
 *
 * @return {OG.shape.IShape} 복사된 인스턴스
 * @override
 */
OG.shape.EdgeShape.prototype.clone = function () {
    var shape = eval('new ' + this.SHAPE_ID + '()');
    shape.from = this.from;
    shape.to = this.to;
    shape.label = this.label;
    shape.fromLabel = this.fromLabel;
    shape.toLabel = this.toLabel;

    return shape;
};
/**
 * Circle Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.CircleShape = function (label) {
    OG.shape.CircleShape.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.CircleShape';
    this.label = label;
};
OG.shape.CircleShape.prototype = new OG.shape.GeomShape();
OG.shape.CircleShape.superclass = OG.shape.GeomShape;
OG.shape.CircleShape.prototype.constructor = OG.shape.CircleShape;
OG.CircleShape = OG.shape.CircleShape;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.CircleShape.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.geometry.Circle([50, 50], 50);
    return this.geom;
};
/**
 * Ellipse Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.EllipseShape = function (label) {
    OG.shape.EllipseShape.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.EllipseShape';
    this.label = label;
};
OG.shape.EllipseShape.prototype = new OG.shape.GeomShape();
OG.shape.EllipseShape.superclass = OG.shape.GeomShape;
OG.shape.EllipseShape.prototype.constructor = OG.shape.EllipseShape;
OG.EllipseShape = OG.shape.EllipseShape;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.EllipseShape.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.geometry.Ellipse([50, 50], 50, 30);
    return this.geom;
};
/**
 * Group Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.GroupShape = function (label) {
    OG.shape.GroupShape.superclass.call(this);

    this.TYPE = OG.Constants.SHAPE_TYPE.GROUP;
    this.SHAPE_ID = 'OG.shape.GroupShape';
    this.label = label;

    this.CONNECTABLE = false;
    this.SELF_CONNECTABLE = false;

    /**
     * 그룹핑 가능여부
     * @type Boolean
     */
    this.GROUP_DROPABLE = true;

    /**
     * 최소화 가능여부
     * @type Boolean
     */
    this.GROUP_COLLAPSIBLE = true;
};
OG.shape.GroupShape.prototype = new OG.shape.IShape();
OG.shape.GroupShape.superclass = OG.shape.IShape;
OG.shape.GroupShape.prototype.constructor = OG.shape.GroupShape;
OG.GroupShape = OG.shape.GroupShape;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.GroupShape.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    this.geom.style = new OG.geometry.Style({
        'stroke': 'none'
    });

    return this.geom;
};

/**
 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
 *
 * @return {OG.shape.IShape} 복사된 인스턴스
 * @override
 */
OG.shape.GroupShape.prototype.clone = function () {
    var shape = eval('new ' + this.SHAPE_ID + '()');
    shape.label = this.label;

    return shape;
};
/**
 * Horizontal Swimlane Shape
 *
 * @class
 * @extends OG.shape.GroupShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.HorizontalLaneShape = function (label) {
    OG.shape.HorizontalLaneShape.superclass.call(this, label);

    this.SHAPE_ID = 'OG.shape.HorizontalLaneShape';
};
OG.shape.HorizontalLaneShape.prototype = new OG.shape.GroupShape();
OG.shape.HorizontalLaneShape.superclass = OG.shape.GroupShape;
OG.shape.HorizontalLaneShape.prototype.constructor = OG.shape.HorizontalLaneShape;
OG.HorizontalLaneShape = OG.shape.HorizontalLaneShape;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.HorizontalLaneShape.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    this.geom.style = new OG.geometry.Style({
        'label-direction': 'vertical',
        'vertical-align': 'top'
    });

    return this.geom;
};
/**
 * ForeignObject HTML Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} html 임베드 HTML String
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.HtmlShape = function (html, label) {
    OG.shape.HtmlShape.superclass.call(this);

    this.TYPE = OG.Constants.SHAPE_TYPE.HTML;
    this.SHAPE_ID = 'OG.shape.HtmlShape';
    this.label = label;

    /**
     * 드로잉할 임베드 HTML String
     * @type String
     */
    this.html = html || "";

    /**
     * 회전각도
     * @type Number
     */
    this.angle = 0;
};
OG.shape.HtmlShape.prototype = new OG.shape.IShape();
OG.shape.HtmlShape.superclass = OG.shape.IShape;
OG.shape.HtmlShape.prototype.constructor = OG.shape.HtmlShape;
OG.HtmlShape = OG.shape.HtmlShape;

/**
 * 드로잉할 임베드 HTML String을 반환한다.
 *
 * @return {String} 임베드 HTML String
 * @override
 */
OG.shape.HtmlShape.prototype.createShape = function () {
    return this.html;
};

/**
 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
 *
 * @return {OG.shape.IShape} 복사된 인스턴스
 * @override
 */
OG.shape.HtmlShape.prototype.clone = function () {
    var shape = eval('new ' + this.SHAPE_ID + '()');
    shape.html = this.html;
    shape.label = this.label;
    shape.angle = this.angle;

    return shape;
};
/**
 * Rectangle Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.RectangleShape = function (label) {
    OG.shape.RectangleShape.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.RectangleShape';
    this.label = label;
};
OG.shape.RectangleShape.prototype = new OG.shape.GeomShape();
OG.shape.RectangleShape.superclass = OG.shape.GeomShape;
OG.shape.RectangleShape.prototype.constructor = OG.shape.RectangleShape;
OG.RectangleShape = OG.shape.RectangleShape;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.RectangleShape.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    return this.geom;
};
/**
 * Vertical Swimlane Shape
 *
 * @class
 * @extends OG.shape.GroupShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.VerticalLaneShape = function (label) {
    OG.shape.VerticalLaneShape.superclass.call(this, label);

    this.SHAPE_ID = 'OG.shape.VerticalLaneShape';
};
OG.shape.VerticalLaneShape.prototype = new OG.shape.GroupShape();
OG.shape.VerticalLaneShape.superclass = OG.shape.GroupShape;
OG.shape.VerticalLaneShape.prototype.constructor = OG.shape.VerticalLaneShape;
OG.VerticalLaneShape = OG.shape.VerticalLaneShape;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.VerticalLaneShape.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    this.geom.style = new OG.geometry.Style({
        'label-direction': 'horizontal',
        'vertical-align': 'top'
    });

    return this.geom;
};
/**
 * BPMN : Subprocess Activity Shape
 *
 * @class
 * @extends OG.shape.GroupShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.A_Subprocess = function (label) {
    OG.shape.bpmn.A_Subprocess.superclass.call(this, label);

    this.SHAPE_ID = 'OG.shape.bpmn.A_Subprocess';
};
OG.shape.bpmn.A_Subprocess.prototype = new OG.shape.GroupShape();
OG.shape.bpmn.A_Subprocess.superclass = OG.shape.GroupShape;
OG.shape.bpmn.A_Subprocess.prototype.constructor = OG.shape.bpmn.A_Subprocess;
OG.A_Subprocess = OG.shape.bpmn.A_Subprocess;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.A_Subprocess.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    this.geom.style = new OG.geometry.Style({
        'stroke': 'black',
        "r": 6
    });

    return this.geom;
};
/**
 * BPMN : Task Activity Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.A_Task = function (label) {
    OG.shape.bpmn.A_Task.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.A_Task';
    this.label = label;
};
OG.shape.bpmn.A_Task.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.A_Task.superclass = OG.shape.GeomShape;
OG.shape.bpmn.A_Task.prototype.constructor = OG.shape.bpmn.A_Task;
OG.A_Task = OG.shape.bpmn.A_Task;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.A_Task.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    this.geom.style = new OG.geometry.Style({
        "r": 6
    });

    return this.geom;
};
/**
 * BPMN : Annotation Association Connector Shape
 *
 * @class
 * @extends OG.shape.EdgeShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {Number[]} from 와이어 시작 좌표
 * @param {Number[]} to 와이어 끝 좌표
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.C_Association = function (from, to, label) {
    OG.shape.bpmn.C_Association.superclass.call(this, from, to, label);

    this.SHAPE_ID = 'OG.shape.bpmn.C_Association';
};
OG.shape.bpmn.C_Association.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_Association.superclass = OG.shape.EdgeShape;
OG.shape.bpmn.C_Association.prototype.constructor = OG.shape.bpmn.C_Association;
OG.C_Association = OG.shape.bpmn.C_Association;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.C_Association.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.Line(this.from || [0, 0], this.to || [70, 0]);
    this.geom.style = new OG.geometry.Style({
        "edge-type": "straight",
        "arrow-start": "none",
        "arrow-end": "none",
        'stroke-dasharray': '.'
    });

    return this.geom;
};
/**
 * BPMN : Conditional Connector Shape
 *
 * @class
 * @extends OG.shape.EdgeShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {Number[]} from 와이어 시작 좌표
 * @param {Number[]} to 와이어 끝 좌표
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.C_Conditional = function (from, to, label) {
    OG.shape.bpmn.C_Conditional.superclass.call(this, from, to, label);

    this.SHAPE_ID = 'OG.shape.bpmn.C_Conditional';
};
OG.shape.bpmn.C_Conditional.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_Conditional.superclass = OG.shape.EdgeShape;
OG.shape.bpmn.C_Conditional.prototype.constructor = OG.shape.bpmn.C_Conditional;
OG.C_Conditional = OG.shape.bpmn.C_Conditional;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.C_Conditional.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.Line(this.from || [0, 0], this.to || [70, 0]);
    this.geom.style = new OG.geometry.Style({
        "edge-type": "straight",
        "arrow-start": "open_diamond-wide-long",
        "arrow-end": "open_block-wide-long"
    });

    return this.geom;
};
/**
 * BPMN : Data Association Connector Shape
 *
 * @class
 * @extends OG.shape.EdgeShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {Number[]} from 와이어 시작 좌표
 * @param {Number[]} to 와이어 끝 좌표
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.C_DataAssociation = function (from, to, label) {
    OG.shape.bpmn.C_DataAssociation.superclass.call(this, from, to, label);

    this.SHAPE_ID = 'OG.shape.bpmn.C_DataAssociation';
};
OG.shape.bpmn.C_DataAssociation.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_DataAssociation.superclass = OG.shape.EdgeShape;
OG.shape.bpmn.C_DataAssociation.prototype.constructor = OG.shape.bpmn.C_DataAssociation;
OG.C_DataAssociation = OG.shape.bpmn.C_DataAssociation;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.C_DataAssociation.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.Line(this.from || [0, 0], this.to || [70, 0]);
    this.geom.style = new OG.geometry.Style({
        "edge-type": "straight",
        "arrow-start": "none",
        "arrow-end": "classic-wide-long",
        'stroke-dasharray': '.'
    });

    return this.geom;
};
/**
 * BPMN : Message Connector Shape
 *
 * @class
 * @extends OG.shape.EdgeShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {Number[]} from 와이어 시작 좌표
 * @param {Number[]} to 와이어 끝 좌표
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.C_Message = function (from, to, label) {
    OG.shape.bpmn.C_Message.superclass.call(this, from, to, label);

    this.SHAPE_ID = 'OG.shape.bpmn.C_Message';
};
OG.shape.bpmn.C_Message.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_Message.superclass = OG.shape.EdgeShape;
OG.shape.bpmn.C_Message.prototype.constructor = OG.shape.bpmn.C_Message;
OG.C_Message = OG.shape.bpmn.C_Message;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.C_Message.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.Line(this.from || [0, 0], this.to || [80, 0]);
    this.geom.style = new OG.geometry.Style({
        "edge-type": "straight",
        "arrow-start": "open_oval-wide-long",
        "arrow-end": "open_block-wide-long",
        'stroke-dasharray': '.'
    });

    return this.geom;
};
/**
 * BPMN : Sequence Connector Shape
 *
 * @class
 * @extends OG.shape.EdgeShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {Number[]} from 와이어 시작 좌표
 * @param {Number[]} to 와이어 끝 좌표
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.C_Sequence = function (from, to, label) {
    OG.shape.bpmn.C_Sequence.superclass.call(this, from, to, label);

    this.SHAPE_ID = 'OG.shape.bpmn.C_Sequence';
};
OG.shape.bpmn.C_Sequence.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_Sequence.superclass = OG.shape.EdgeShape;
OG.shape.bpmn.C_Sequence.prototype.constructor = OG.shape.bpmn.C_Sequence;
OG.C_Sequence = OG.shape.bpmn.C_Sequence;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.C_Sequence.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.Line(this.from || [0, 0], this.to || [80, 0]);
    this.geom.style = new OG.geometry.Style({
        "edge-type": "plain",
        "arrow-start": "none",
        "arrow-end": "classic-wide-long"
    });

    return this.geom;
};
/**
 * BPMN : Data Object Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.D_Data = function (label) {
    OG.shape.bpmn.D_Data.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.D_Data';
    this.label = label;
};
OG.shape.bpmn.D_Data.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.D_Data.superclass = OG.shape.GeomShape;
OG.shape.bpmn.D_Data.prototype.constructor = OG.shape.bpmn.D_Data;
OG.D_Data = OG.shape.bpmn.D_Data;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.D_Data.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
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

    return this.geom;
};
/**
 * BPMN : Data Store Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.D_Store = function (label) {
    OG.shape.bpmn.D_Store.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.D_Store';
    this.label = label;
};
OG.shape.bpmn.D_Store.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.D_Store.superclass = OG.shape.GeomShape;
OG.shape.bpmn.D_Store.prototype.constructor = OG.shape.bpmn.D_Store;
OG.D_Store = OG.shape.bpmn.D_Store;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.D_Store.prototype.createShape = function () {
    var geom1, geom2, geom3, geom4, geom5, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Ellipse([50, 10], 50, 10);
    geom2 = new OG.geometry.Line([0, 10], [0, 90]);
    geom3 = new OG.geometry.Line([100, 10], [100, 90]);
    geom4 = new OG.geometry.Curve([
        [100, 90],
        [96, 94],
        [85, 97],
        [50, 100],
        [15, 97],
        [4, 94],
        [0, 90]
    ]);
    geom5 = new OG.geometry.Rectangle([0, 10], 100, 80);
    geom5.style = new OG.geometry.Style({
        "stroke": 'none'
    });

    geomCollection.push(geom1);
    geomCollection.push(geom2);
    geomCollection.push(geom3);
    geomCollection.push(geom4);
    geomCollection.push(geom5);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);

    return this.geom;
};
/**
 * BPMN : End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End = function (label) {
    OG.shape.bpmn.E_End.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_End';
    this.label = label;
};
OG.shape.bpmn.E_End.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_End.prototype.constructor = OG.shape.bpmn.E_End;
OG.E_End = OG.shape.bpmn.E_End;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_End.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.geometry.Circle([50, 50], 50);
    this.geom.style = new OG.geometry.Style({
        "stroke-width": 3,
        'label-position': 'bottom'
    });

    return this.geom;
};

/**
 * Shape 간의 연결을 위한 Terminal 을 반환한다.
 *
 * @return {OG.Terminal[]} Terminal
 * @override
 */
OG.shape.bpmn.E_End.prototype.createTerminal = function () {
    if (!this.geom) {
        return [];
    }

    var envelope = this.geom.getBoundary();

    return [
        new OG.Terminal(envelope.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.IN),
        new OG.Terminal(envelope.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.IN),
        new OG.Terminal(envelope.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.IN),
        new OG.Terminal(envelope.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.IN),
        new OG.Terminal(envelope.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.IN)
    ];
};
/**
 * BPMN : Cancel End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End_Cancel = function (label) {
    OG.shape.bpmn.E_End_Cancel.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_End_Cancel';
    this.label = label;
};
OG.shape.bpmn.E_End_Cancel.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Cancel.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_End_Cancel.prototype.constructor = OG.shape.bpmn.E_End_Cancel;
OG.E_End_Cancel = OG.shape.bpmn.E_End_Cancel;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_End_Cancel.prototype.createShape = function () {
    var geom1, geom2, geom3, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Circle([50, 50], 50);
    geom1.style = new OG.geometry.Style({
        "stroke-width": 3
    });

    geom2 = new OG.geometry.Line([25, 25], [75, 75]);
    geom2.style = new OG.geometry.Style({
        "stroke-width": 5
    });

    geom3 = new OG.geometry.Line([25, 75], [75, 25]);
    geom3.style = new OG.geometry.Style({
        "stroke-width": 5
    });

    geomCollection.push(geom1);
    geomCollection.push(geom2);
    geomCollection.push(geom3);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Compensation End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End_Compensation = function (label) {
    OG.shape.bpmn.E_End_Compensation.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_End_Compensation';
    this.label = label;
};
OG.shape.bpmn.E_End_Compensation.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Compensation.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_End_Compensation.prototype.constructor = OG.shape.bpmn.E_End_Compensation;
OG.E_End_Compensation = OG.shape.bpmn.E_End_Compensation;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_End_Compensation.prototype.createShape = function () {
    var geom1, geom2, geom3, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Circle([50, 50], 50);
    geom1.style = new OG.geometry.Style({
        "stroke-width": 3
    });

    geom2 = new OG.geometry.Polygon([
        [15, 50],
        [45, 70],
        [45, 30]
    ]);
    geom2.style = new OG.geometry.Style({
        "fill": "black",
        "fill-opacity": 1
    });

    geom3 = new OG.geometry.Polygon([
        [45, 50],
        [75, 70],
        [75, 30]
    ]);
    geom3.style = new OG.geometry.Style({
        "fill": "black",
        "fill-opacity": 1
    });

    geomCollection.push(geom1);
    geomCollection.push(geom2);
    geomCollection.push(geom3);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Error End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End_Error = function (label) {
    OG.shape.bpmn.E_End_Error.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_End_Error';
    this.label = label;
};
OG.shape.bpmn.E_End_Error.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Error.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_End_Error.prototype.constructor = OG.shape.bpmn.E_End_Error;
OG.E_End_Error = OG.shape.bpmn.E_End_Error;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_End_Error.prototype.createShape = function () {
    var geom1, geom2, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Circle([50, 50], 50);
    geom1.style = new OG.geometry.Style({
        "stroke-width": 3
    });

    geom2 = new OG.geometry.PolyLine([
        [20, 75],
        [40, 40],
        [60, 60],
        [80, 20]
    ]);
    geom2.style = new OG.geometry.Style({
        "stroke-width": 2
    });

    geomCollection.push(geom1);
    geomCollection.push(geom2);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Link End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End_Link = function (label) {
    OG.shape.bpmn.E_End_Link.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_End_Link';
    this.label = label;
};
OG.shape.bpmn.E_End_Link.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Link.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_End_Link.prototype.constructor = OG.shape.bpmn.E_End_Link;
OG.E_End_Link = OG.shape.bpmn.E_End_Link;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_End_Link.prototype.createShape = function () {
    var geom1, geom2, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Circle([50, 50], 50);
    geom1.style = new OG.geometry.Style({
        "stroke-width": 3
    });

    geom2 = new OG.geometry.Polygon([
        [20, 40],
        [20, 60],
        [60, 60],
        [60, 80],
        [85, 50],
        [60, 20],
        [60, 40]
    ]);
    geom2.style = new OG.geometry.Style({
        "fill": "black",
        "fill-opacity": 1
    });

    geomCollection.push(geom1);
    geomCollection.push(geom2);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Message End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End_Message = function (label) {
    OG.shape.bpmn.E_End_Message.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_End_Message';
    this.label = label;
};
OG.shape.bpmn.E_End_Message.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Message.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_End_Message.prototype.constructor = OG.shape.bpmn.E_End_Message;
OG.E_End_Message = OG.shape.bpmn.E_End_Message;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_End_Message.prototype.createShape = function () {
    var geom1, geom2, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Circle([50, 50], 50);
    geom1.style = new OG.geometry.Style({
        "stroke-width": 3
    });

    geom2 = new OG.geometry.PolyLine([
        [20, 30],
        [20, 70],
        [80, 70],
        [80, 30],
        [20, 30],
        [50, 50],
        [80, 30]
    ]);

    geomCollection.push(geom1);
    geomCollection.push(geom2);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Multiple End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End_Multiple = function (label) {
    OG.shape.bpmn.E_End_Multiple.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_End_Multiple';
    this.label = label;
};
OG.shape.bpmn.E_End_Multiple.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Multiple.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_End_Multiple.prototype.constructor = OG.shape.bpmn.E_End_Multiple;
OG.E_End_Multiple = OG.shape.bpmn.E_End_Multiple;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_End_Multiple.prototype.createShape = function () {
    var geom1, geom2, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Circle([50, 50], 50);
    geom1.style = new OG.geometry.Style({
        "stroke-width": 3
    });

    geom2 = new OG.geometry.Polygon([
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
    geom2.style = new OG.geometry.Style({
        "fill": "black",
        "fill-opacity": 1
    });

    geomCollection.push(geom1);
    geomCollection.push(geom2);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate = function (label) {
    OG.shape.bpmn.E_Intermediate.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate';
    this.label = label;
};
OG.shape.bpmn.E_Intermediate.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate.prototype.constructor = OG.shape.bpmn.E_Intermediate;
OG.E_Intermediate = OG.shape.bpmn.E_Intermediate;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_Intermediate.prototype.createShape = function () {
    var geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geomCollection.push(new OG.geometry.Circle([50, 50], 50));
    geomCollection.push(new OG.geometry.Circle([50, 50], 42));

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Compensation Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate_Compensation = function (label) {
    OG.shape.bpmn.E_Intermediate_Compensation.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate_Compensation';
    this.label = label;
};
OG.shape.bpmn.E_Intermediate_Compensation.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Compensation.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate_Compensation.prototype.constructor = OG.shape.bpmn.E_Intermediate_Compensation;
OG.E_Intermediate_Compensation = OG.shape.bpmn.E_Intermediate_Compensation;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_Intermediate_Compensation.prototype.createShape = function () {
    var geom1, geom2, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Polygon([
        [15, 50],
        [45, 70],
        [45, 30]
    ]);

    geom2 = new OG.geometry.Polygon([
        [45, 50],
        [75, 70],
        [75, 30]
    ]);

    geomCollection.push(new OG.geometry.Circle([50, 50], 50));
    geomCollection.push(new OG.geometry.Circle([50, 50], 42));
    geomCollection.push(geom1);
    geomCollection.push(geom2);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Error Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate_Error = function (label) {
    OG.shape.bpmn.E_Intermediate_Error.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate_Error';
    this.label = label;
};
OG.shape.bpmn.E_Intermediate_Error.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Error.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate_Error.prototype.constructor = OG.shape.bpmn.E_Intermediate_Error;
OG.E_Intermediate_Error = OG.shape.bpmn.E_Intermediate_Error;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_Intermediate_Error.prototype.createShape = function () {
    var geom1, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.PolyLine([
        [20, 75],
        [40, 40],
        [60, 60],
        [80, 20]
    ]);

    geomCollection.push(new OG.geometry.Circle([50, 50], 50));
    geomCollection.push(new OG.geometry.Circle([50, 50], 42));
    geomCollection.push(geom1);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Link Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate_Link = function (label) {
    OG.shape.bpmn.E_Intermediate_Link.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate_Link';
    this.label = label;
};
OG.shape.bpmn.E_Intermediate_Link.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Link.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate_Link.prototype.constructor = OG.shape.bpmn.E_Intermediate_Link;
OG.E_Intermediate_Link = OG.shape.bpmn.E_Intermediate_Link;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_Intermediate_Link.prototype.createShape = function () {
    var geom1, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Polygon([
        [20, 40],
        [20, 60],
        [60, 60],
        [60, 80],
        [85, 50],
        [60, 20],
        [60, 40]
    ]);

    geomCollection.push(new OG.geometry.Circle([50, 50], 50));
    geomCollection.push(new OG.geometry.Circle([50, 50], 42));
    geomCollection.push(geom1);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Message Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate_Message = function (label) {
    OG.shape.bpmn.E_Intermediate_Message.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate_Message';
    this.label = label;
};
OG.shape.bpmn.E_Intermediate_Message.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Message.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate_Message.prototype.constructor = OG.shape.bpmn.E_Intermediate_Message;
OG.E_Intermediate_Message = OG.shape.bpmn.E_Intermediate_Message;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_Intermediate_Message.prototype.createShape = function () {
    var geom1, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.PolyLine([
        [20, 30],
        [20, 70],
        [80, 70],
        [80, 30],
        [20, 30],
        [50, 50],
        [80, 30]
    ]);

    geomCollection.push(new OG.geometry.Circle([50, 50], 50));
    geomCollection.push(new OG.geometry.Circle([50, 50], 42));
    geomCollection.push(geom1);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Multiple Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate_Multiple = function (label) {
    OG.shape.bpmn.E_Intermediate_Multiple.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate_Multiple';
    this.label = label;
};
OG.shape.bpmn.E_Intermediate_Multiple.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Multiple.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate_Multiple.prototype.constructor = OG.shape.bpmn.E_Intermediate_Multiple;
OG.E_Intermediate_Multiple = OG.shape.bpmn.E_Intermediate_Multiple;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_Intermediate_Multiple.prototype.createShape = function () {
    var geom1, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Polygon([
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

    geomCollection.push(new OG.geometry.Circle([50, 50], 50));
    geomCollection.push(new OG.geometry.Circle([50, 50], 42));
    geomCollection.push(geom1);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Rule Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate_Rule = function (label) {
    OG.shape.bpmn.E_Intermediate_Rule.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate_Rule';
    this.label = label;
};
OG.shape.bpmn.E_Intermediate_Rule.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Rule.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate_Rule.prototype.constructor = OG.shape.bpmn.E_Intermediate_Rule;
OG.E_Intermediate_Rule = OG.shape.bpmn.E_Intermediate_Rule;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_Intermediate_Rule.prototype.createShape = function () {
    var geom1, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Rectangle([25, 20], 50, 60);

    geomCollection.push(new OG.geometry.Circle([50, 50], 50));
    geomCollection.push(new OG.geometry.Circle([50, 50], 42));
    geomCollection.push(geom1);
    geomCollection.push(new OG.geometry.Line([30, 30], [70, 30]));
    geomCollection.push(new OG.geometry.Line([30, 45], [70, 45]));
    geomCollection.push(new OG.geometry.Line([30, 60], [70, 60]));
    geomCollection.push(new OG.geometry.Line([30, 70], [70, 70]));

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Timer Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate_Timer = function (label) {
    OG.shape.bpmn.E_Intermediate_Timer.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate_Timer';
    this.label = label;
};
OG.shape.bpmn.E_Intermediate_Timer.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Timer.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Intermediate_Timer.prototype.constructor = OG.shape.bpmn.E_Intermediate_Timer;
OG.E_Intermediate_Timer = OG.shape.bpmn.E_Intermediate_Timer;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_Intermediate_Timer.prototype.createShape = function () {
    var geom1, geom2, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Circle([50, 50], 32);

    geom2 = new OG.geometry.PolyLine([
        [50, 30],
        [50, 50],
        [70, 50]
    ]);

    geomCollection.push(new OG.geometry.Circle([50, 50], 50));
    geomCollection.push(new OG.geometry.Circle([50, 50], 42));
    geomCollection.push(geom1);
    geomCollection.push(new OG.geometry.Line([50, 18], [50, 25]));
    geomCollection.push(new OG.geometry.Line([50, 82], [50, 75]));
    geomCollection.push(new OG.geometry.Line([18, 50], [25, 50]));
    geomCollection.push(new OG.geometry.Line([82, 50], [75, 50]));
    geomCollection.push(geom2);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Start Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Start = function (label) {
    OG.shape.bpmn.E_Start.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_Start';
    this.label = label;
};
OG.shape.bpmn.E_Start.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Start.prototype.constructor = OG.shape.bpmn.E_Start;
OG.E_Start = OG.shape.bpmn.E_Start;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_Start.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.geometry.Circle([50, 50], 50);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};

/**
 * Shape 간의 연결을 위한 Terminal 을 반환한다.
 *
 * @return {OG.Terminal[]} Terminal
 * @override
 */
OG.shape.bpmn.E_Start.prototype.createTerminal = function () {
    if (!this.geom) {
        return [];
    }

    var envelope = this.geom.getBoundary();

    return [
        new OG.Terminal(envelope.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.OUT),
        new OG.Terminal(envelope.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.OUT),
        new OG.Terminal(envelope.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.OUT),
        new OG.Terminal(envelope.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.OUT),
        new OG.Terminal(envelope.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.OUT)
    ];
};
/**
 * BPMN : Link Start Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Start_Link = function (label) {
    OG.shape.bpmn.E_Start_Link.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_Start_Link';
    this.label = label;
};
OG.shape.bpmn.E_Start_Link.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start_Link.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Start_Link.prototype.constructor = OG.shape.bpmn.E_Start_Link;
OG.E_Start_Link = OG.shape.bpmn.E_Start_Link;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_Start_Link.prototype.createShape = function () {
    var geom1, geom2, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Circle([50, 50], 50);
    geom1.style = new OG.geometry.Style({
        "stroke-width": 1
    });

    geom2 = new OG.geometry.Polygon([
        [20, 40],
        [20, 60],
        [60, 60],
        [60, 80],
        [85, 50],
        [60, 20],
        [60, 40]
    ]);

    geomCollection.push(geom1);
    geomCollection.push(geom2);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Message Start Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Start_Message = function (label) {
    OG.shape.bpmn.E_Start_Message.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_Start_Message';
    this.label = label;
};
OG.shape.bpmn.E_Start_Message.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start_Message.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Start_Message.prototype.constructor = OG.shape.bpmn.E_Start_Message;
OG.E_Start_Message = OG.shape.bpmn.E_Start_Message;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_Start_Message.prototype.createShape = function () {
    var geom1, geom2, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Circle([50, 50], 50);

    geom2 = new OG.geometry.PolyLine([
        [20, 30],
        [20, 70],
        [80, 70],
        [80, 30],
        [20, 30],
        [50, 50],
        [80, 30]
    ]);

    geomCollection.push(geom1);
    geomCollection.push(geom2);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Multiple Start Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Start_Multiple = function (label) {
    OG.shape.bpmn.E_Start_Multiple.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_Start_Multiple';
    this.label = label;
};
OG.shape.bpmn.E_Start_Multiple.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start_Multiple.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Start_Multiple.prototype.constructor = OG.shape.bpmn.E_Start_Multiple;
OG.E_Start_Multiple = OG.shape.bpmn.E_Start_Multiple;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_Start_Multiple.prototype.createShape = function () {
    var geom1, geom2, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Circle([50, 50], 50);

    geom2 = new OG.geometry.Polygon([
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

    geomCollection.push(geom1);
    geomCollection.push(geom2);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Rule Start Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Start_Rule = function (label) {
    OG.shape.bpmn.E_Start_Rule.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_Start_Rule';
    this.label = label;
};
OG.shape.bpmn.E_Start_Rule.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start_Rule.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Start_Rule.prototype.constructor = OG.shape.bpmn.E_Start_Rule;
OG.E_Start_Rule = OG.shape.bpmn.E_Start_Rule;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_Start_Rule.prototype.createShape = function () {
    var geom1, geom2, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Circle([50, 50], 50);
    geom1.style = new OG.geometry.Style({
        "stroke-width": 1
    });

    geom2 = new OG.geometry.Rectangle([25, 20], 50, 60);

    geomCollection.push(geom1);
    geomCollection.push(geom2);
    geomCollection.push(new OG.geometry.Line([30, 30], [70, 30]));
    geomCollection.push(new OG.geometry.Line([30, 45], [70, 45]));
    geomCollection.push(new OG.geometry.Line([30, 60], [70, 60]));
    geomCollection.push(new OG.geometry.Line([30, 70], [70, 70]));

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Timer Start Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Start_Timer = function (label) {
    OG.shape.bpmn.E_Start_Timer.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.E_Start_Timer';
    this.label = label;
};
OG.shape.bpmn.E_Start_Timer.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start_Timer.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_Start_Timer.prototype.constructor = OG.shape.bpmn.E_Start_Timer;
OG.E_Start_Timer = OG.shape.bpmn.E_Start_Timer;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_Start_Timer.prototype.createShape = function () {
    var geom1, geom2, geom3, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Circle([50, 50], 50);
    geom1.style = new OG.geometry.Style({
        "stroke-width": 1
    });

    geom2 = new OG.geometry.Circle([50, 50], 32);

    geom3 = new OG.geometry.PolyLine([
        [50, 30],
        [50, 50],
        [70, 50]
    ]);

    geomCollection.push(geom1);
    geomCollection.push(geom2);
    geomCollection.push(new OG.geometry.Line([50, 18], [50, 25]));
    geomCollection.push(new OG.geometry.Line([50, 82], [50, 75]));
    geomCollection.push(new OG.geometry.Line([18, 50], [25, 50]));
    geomCollection.push(new OG.geometry.Line([82, 50], [75, 50]));
    geomCollection.push(geom3);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Terminate Event Shape
 *
 * @class
 * @extends OG.shape.bpmn.E_End
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Terminate = function (label) {
    OG.shape.bpmn.E_Terminate.superclass.call(this, label);

    this.SHAPE_ID = 'OG.shape.bpmn.E_Terminate';
};
OG.shape.bpmn.E_Terminate.prototype = new OG.shape.bpmn.E_End();
OG.shape.bpmn.E_Terminate.superclass = OG.shape.bpmn.E_End;
OG.shape.bpmn.E_Terminate.prototype.constructor = OG.shape.bpmn.E_Terminate;
OG.E_Terminate = OG.shape.bpmn.E_Terminate;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_Terminate.prototype.createShape = function () {
    var geom1, geom2, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Circle([50, 50], 50);
    geom1.style = new OG.geometry.Style({
        "stroke-width": 3
    });

    geom2 = new OG.geometry.Circle([50, 50], 30);
    geom2.style = new OG.geometry.Style({
        "fill": "black",
        "fill-opacity": 1
    });

    geomCollection.push(geom1);
    geomCollection.push(geom2);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
        'label-position': 'bottom'
    });

    return this.geom;
};
/**
 * BPMN : Complex Gateway Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.G_Complex = function (label) {
    OG.shape.bpmn.G_Complex.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.G_Complex';
    this.label = label;
};
OG.shape.bpmn.G_Complex.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Complex.superclass = OG.shape.GeomShape;
OG.shape.bpmn.G_Complex.prototype.constructor = OG.shape.bpmn.G_Complex;
OG.G_Complex = OG.shape.bpmn.G_Complex;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.G_Complex.prototype.createShape = function () {
    var geom1, geom2, geom3, geom4, geom5, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Polygon([
        [0, 50],
        [50, 100],
        [100, 50],
        [50, 0]
    ]);

    geom2 = new OG.geometry.Line([30, 30], [70, 70]);
    geom2.style = new OG.geometry.Style({
        "stroke-width": 3
    });

    geom3 = new OG.geometry.Line([30, 70], [70, 30]);
    geom3.style = new OG.geometry.Style({
        "stroke-width": 3
    });

    geom4 = new OG.geometry.Line([20, 50], [80, 50]);
    geom4.style = new OG.geometry.Style({
        "stroke-width": 3
    });

    geom5 = new OG.geometry.Line([50, 20], [50, 80]);
    geom5.style = new OG.geometry.Style({
        "stroke-width": 3
    });

    geomCollection.push(geom1);
    geomCollection.push(geom2);
    geomCollection.push(geom3);
    geomCollection.push(geom4);
    geomCollection.push(geom5);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);

    return this.geom;
};
/**
 * BPMN : Exclusive Gateway Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.G_Exclusive = function (label) {
    OG.shape.bpmn.G_Exclusive.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.G_Exclusive';
    this.label = label;
};
OG.shape.bpmn.G_Exclusive.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Exclusive.superclass = OG.shape.GeomShape;
OG.shape.bpmn.G_Exclusive.prototype.constructor = OG.shape.bpmn.G_Exclusive;
OG.G_Exclusive = OG.shape.bpmn.G_Exclusive;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.G_Exclusive.prototype.createShape = function () {
    var geom1, geom2, geom3, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Polygon([
        [0, 50],
        [50, 100],
        [100, 50],
        [50, 0]
    ]);

    geom2 = new OG.geometry.Line([30, 30], [70, 70]);
    geom2.style = new OG.geometry.Style({
        "stroke-width": 5
    });

    geom3 = new OG.geometry.Line([30, 70], [70, 30]);
    geom3.style = new OG.geometry.Style({
        "stroke-width": 5
    });

    geomCollection.push(geom1);
    geomCollection.push(geom2);
    geomCollection.push(geom3);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);

    return this.geom;
};
/**
 * BPMN : Gateway Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.G_Gateway = function (label) {
    OG.shape.bpmn.G_Gateway.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.G_Gateway';
    this.label = label;
};
OG.shape.bpmn.G_Gateway.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Gateway.superclass = OG.shape.GeomShape;
OG.shape.bpmn.G_Gateway.prototype.constructor = OG.shape.bpmn.G_Gateway;
OG.G_Gateway = OG.shape.bpmn.G_Gateway;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.G_Gateway.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.geometry.Polygon([
        [0, 50],
        [50, 100],
        [100, 50],
        [50, 0]
    ]);

    return this.geom;
};
/**
 * BPMN : Inclusive Gateway Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.G_Inclusive = function (label) {
    OG.shape.bpmn.G_Inclusive.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.G_Inclusive';
    this.label = label;
};
OG.shape.bpmn.G_Inclusive.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Inclusive.superclass = OG.shape.GeomShape;
OG.shape.bpmn.G_Inclusive.prototype.constructor = OG.shape.bpmn.G_Inclusive;
OG.G_Inclusive = OG.shape.bpmn.G_Inclusive;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.G_Inclusive.prototype.createShape = function () {
    var geom1, geom2, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Polygon([
        [0, 50],
        [50, 100],
        [100, 50],
        [50, 0]
    ]);

    geom2 = new OG.geometry.Circle([50, 50], 25);
    geom2.style = new OG.geometry.Style({
        "stroke-width": 3
    });

    geomCollection.push(geom1);
    geomCollection.push(geom2);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);

    return this.geom;
};
/**
 * BPMN : Parallel Gateway Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.G_Parallel = function (label) {
    OG.shape.bpmn.G_Parallel.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.G_Parallel';
    this.label = label;
};
OG.shape.bpmn.G_Parallel.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Parallel.superclass = OG.shape.GeomShape;
OG.shape.bpmn.G_Parallel.prototype.constructor = OG.shape.bpmn.G_Parallel;
OG.G_Parallel = OG.shape.bpmn.G_Parallel;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.G_Parallel.prototype.createShape = function () {
    var geom1, geom2, geom3, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Polygon([
        [0, 50],
        [50, 100],
        [100, 50],
        [50, 0]
    ]);

    geom2 = new OG.geometry.Line([20, 50], [80, 50]);
    geom2.style = new OG.geometry.Style({
        "stroke-width": 5
    });

    geom3 = new OG.geometry.Line([50, 20], [50, 80]);
    geom3.style = new OG.geometry.Style({
        "stroke-width": 5
    });

    geomCollection.push(geom1);
    geomCollection.push(geom2);
    geomCollection.push(geom3);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);

    return this.geom;
};
/**
 * BPMN : Annotation Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.M_Annotation = function (label) {
    OG.shape.bpmn.M_Annotation.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.M_Annotation';
    this.label = label || 'Annotation';
};
OG.shape.bpmn.M_Annotation.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.M_Annotation.superclass = OG.shape.GeomShape;
OG.shape.bpmn.M_Annotation.prototype.constructor = OG.shape.bpmn.M_Annotation;
OG.M_Annotation = OG.shape.bpmn.M_Annotation;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.M_Annotation.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    var geom1, geom2, geomCollection = [];
    if (this.geom) {
        return this.geom;
    }

    geom1 = new OG.geometry.Rectangle([0, 0], 100, 100);
    geom1.style = new OG.geometry.Style({
        "stroke": 'none'
    });

    geom2 = new OG.geometry.PolyLine([
        [10, 0],
        [0, 0],
        [0, 100],
        [10, 100]
    ]);
    geom2.style = new OG.geometry.Style({
        "stroke": 'black'
    });

    geomCollection.push(geom1);
    geomCollection.push(geom2);

    this.geom = new OG.geometry.GeometryCollection(geomCollection);
    this.geom.style = new OG.geometry.Style({
    });

    return this.geom;
};
/**
 * BPMN : Group Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.M_Group = function (label) {
    OG.shape.bpmn.M_Group.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.M_Group';
    this.label = label;
};
OG.shape.bpmn.M_Group.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.M_Group.superclass = OG.shape.GeomShape;
OG.shape.bpmn.M_Group.prototype.constructor = OG.shape.bpmn.M_Group;
OG.M_Group = OG.shape.bpmn.M_Group;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.M_Group.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    this.geom.style = new OG.geometry.Style({
        'stroke-dasharray': '-',
        "r": 6
    });

    return this.geom;
};
/**
 * BPMN : Text Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.M_Text = function (label) {
    OG.shape.bpmn.M_Text.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.bpmn.M_Text';
    this.label = label || 'Text';
};
OG.shape.bpmn.M_Text.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.M_Text.superclass = OG.shape.GeomShape;
OG.shape.bpmn.M_Text.prototype.constructor = OG.shape.bpmn.M_Text;
OG.M_Text = OG.shape.bpmn.M_Text;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.M_Text.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    this.geom.style = new OG.geometry.Style({
        stroke: "none"
    });

    return this.geom;
};
/**
 * 도형의 Style 과 Shape 정보를 통해 캔버스에 렌더링 기능을 정의한 인터페이스
 *
 * @class
 * @requires OG.common.*, OG.geometry.*, OG.shape.*
 *
 * @param {HTMLElement,String} container 컨테이너 DOM element or ID
 * @param {Number[]} containerSize 컨테이너 Width, Height
 * @param {String} backgroundColor 캔버스 배경색
 * @param {String} backgroundImage 캔버스 배경이미지
 * @param {Object} config Configuration
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.renderer.IRenderer = function (container, containerSize, backgroundColor, backgroundImage, config) {
    this._CONFIG = null;
    this._PAPER = null;
    this._ROOT_GROUP = null;
    this._ETC_GROUP = null;
    this._ID_PREFIX = Math.round(Math.random() * 10000);
    this._LAST_ID = 0;
    this._ELE_MAP = new OG.HashMap();
};

OG.renderer.IRenderer.prototype = {

    /**
     * ID를 generate 한다.
     *
     * @return {String} ID
     * @private
     */
    _genId: function () {
        var id = "OG_" + this._ID_PREFIX + "_" + this._LAST_ID;
        this._LAST_ID++;
        return id;
    },

    /**
     * 시작좌표, 끝좌표를 연결하는 베지어 곡선의 콘트롤 포인트를 반환한다.
     *
     * @param {Number[]} from 시작좌표
     * @param {Number[]} to 끝좌표
     * @param {String} fromDirection 방향(E,W,S,N)
     * @param {String} toDirection 방향(E,W,S,N)
     * @return {Number[][]} [시작좌표, 콘트롤포인트1, 콘트롤포인트2, 끝좌표]
     * @private
     */
    _bezierCurve: function (from, to, fromDirection, toDirection) {
        var coefficient = 100, direction1 = [1, 0], direction2 = [-1, 0],
            distance, d1, d2, bezierPoints = [];

        distance = Math.sqrt(Math.pow(from[0] - to[0], 2) + Math.pow(from[1] - to[1], 2));
        if (distance < coefficient) {
            coefficient = distance / 2;
        }

        switch (fromDirection.toLowerCase()) {
            case "e":
                direction1 = [1, 0];
                break;
            case "w":
                direction1 = [-1, 0];
                break;
            case "s":
                direction1 = [0, 1];
                break;
            case "n":
                direction1 = [0, -1];
                break;
            default:
                direction1 = [1, 0];
                break;
        }

        switch (toDirection.toLowerCase()) {
            case "e":
                direction2 = [1, 0];
                break;
            case "w":
                direction2 = [-1, 0];
                break;
            case "s":
                direction2 = [0, 1];
                break;
            case "n":
                direction2 = [0, -1];
                break;
            default:
                direction2 = [-1, 0];
                break;
        }

        // Calculating the direction vectors d1 and d2
        d1 = [direction1[0] * coefficient, direction1[1] * coefficient];
        d2 = [direction2[0] * coefficient, direction2[1] * coefficient];

        // Bezier Curve Poinsts(from, control_point1, control_point2, to)
        bezierPoints[0] = from;
        bezierPoints[1] = [from[0] + d1[0], from[1] + d1[1]];
        bezierPoints[2] = [to[0] + d2[0], to[1] + d2[1]];
        bezierPoints[3] = to;

        return bezierPoints;
    },

    /**
     * 한쪽이상 끊긴 경우 Edge Direction 을 보정한다.
     *
     * @param {String} fromDrct 시작방향
     * @param {String} toDrct 끝방향
     * @param {Number[]} from 시작위치
     * @param {Number[]} to 끝위치
     * @return {String} edge-direction 보정된 edge-direction
     * @private
     */
    _adjustEdgeDirection: function (fromDrct, toDrct, from, to) {
        var fromXY = {x: from[0], y: from[1]}, toXY = {x: to[0], y: to[1]};
        // 한쪽이 끊긴 경우 방향 보정
        if (fromDrct === "c" && toDrct === "c") {
            if (fromXY.x <= toXY.x && fromXY.y <= toXY.y) {
                if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
                    fromDrct = "e";
                    toDrct = "w";
                } else {
                    fromDrct = "s";
                    toDrct = "n";
                }
            } else if (fromXY.x <= toXY.x && fromXY.y > toXY.y) {
                if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
                    fromDrct = "e";
                    toDrct = "w";
                } else {
                    fromDrct = "n";
                    toDrct = "s";
                }
            } else if (fromXY.x > toXY.x && fromXY.y <= toXY.y) {
                if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
                    fromDrct = "w";
                    toDrct = "e";
                } else {
                    fromDrct = "s";
                    toDrct = "n";
                }
            } else if (fromXY.x > toXY.x && fromXY.y > toXY.y) {
                if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
                    fromDrct = "w";
                    toDrct = "e";
                } else {
                    fromDrct = "n";
                    toDrct = "s";
                }
            }
        } else if (fromDrct === "c" && toDrct !== "c") {
            if (fromXY.x <= toXY.x && fromXY.y <= toXY.y) {
                if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
                    fromDrct = "e";
                } else {
                    fromDrct = "s";
                }
            } else if (fromXY.x <= toXY.x && fromXY.y > toXY.y) {
                if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
                    fromDrct = "e";
                } else {
                    fromDrct = "n";
                }
            } else if (fromXY.x > toXY.x && fromXY.y <= toXY.y) {
                if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
                    fromDrct = "w";
                } else {
                    fromDrct = "s";
                }
            } else if (fromXY.x > toXY.x && fromXY.y > toXY.y) {
                if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
                    fromDrct = "w";
                } else {
                    fromDrct = "n";
                }
            }
        } else if (fromDrct !== "c" && toDrct === "c") {
            if (fromXY.x <= toXY.x && fromXY.y <= toXY.y) {
                if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
                    toDrct = "w";
                } else {
                    toDrct = "n";
                }
            } else if (fromXY.x <= toXY.x && fromXY.y > toXY.y) {
                if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
                    toDrct = "w";
                } else {
                    toDrct = "s";
                }
            } else if (fromXY.x > toXY.x && fromXY.y <= toXY.y) {
                if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
                    toDrct = "e";
                } else {
                    toDrct = "n";
                }
            } else if (fromXY.x > toXY.x && fromXY.y > toXY.y) {
                if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
                    toDrct = "e";
                } else {
                    toDrct = "s";
                }
            }
        }

        return fromDrct + " " + toDrct;
    },


    /**
     * 시작, 끝 좌표에 따라 적절한 시작 터미널을 찾아 반환한다.
     *
     * @param {Element} element Shape 엘리먼트
     * @param {Number[]} from 시작자표
     * @param {Number[]} to 끝자표
     * @return {Element} 터미널 엘리먼트
     * @private
     */
    _findFromTerminal: function (element, from, to) {
        // 적절한 연결 터미널 찾기
        var fromXY = {x: from[0], y: from[1]}, toXY = {x: to[0], y: to[1]},
            terminalGroup = this.drawTerminal(element),
            childTerminals = terminalGroup.terminal.childNodes, fromDrct, fromTerminal, i;
        if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
            if (toXY.x > fromXY.x) {
                fromDrct = "e";
            } else {
                fromDrct = "w";
            }
        } else {
            if (toXY.y > fromXY.y) {
                fromDrct = "s";
            } else {
                fromDrct = "n";
            }
        }

        fromTerminal = childTerminals[0];
        for (i = 0; i < childTerminals.length; i++) {
            if (childTerminals[i].terminal && childTerminals[i].terminal.direction.toLowerCase() === fromDrct) {
                fromTerminal = childTerminals[i];
                break;
            }
        }

        return fromTerminal;
    },

    /**
     * 시작, 끝 좌표에 따라 적절한 끝 터미널을 찾아 반환한다.
     *
     * @param {Element} element Shape 엘리먼트
     * @param {Number[]} from 시작자표
     * @param {Number[]} to 끝자표
     * @return {Element} 터미널 엘리먼트
     * @private
     */
    _findToTerminal: function (element, from, to) {
        // 적절한 연결 터미널 찾기
        var fromXY = {x: from[0], y: from[1]}, toXY = {x: to[0], y: to[1]},
            terminalGroup = this.drawTerminal(element),
            childTerminals = terminalGroup.terminal.childNodes, toDrct, toTerminal, i;
        if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
            if (toXY.x > fromXY.x) {
                toDrct = "w";
            } else {
                toDrct = "e";
            }
        } else {
            if (toXY.y > fromXY.y) {
                toDrct = "n";
            } else {
                toDrct = "s";
            }
        }

        toTerminal = childTerminals[0];
        for (i = 0; i < childTerminals.length; i++) {
            if (childTerminals[i].terminal && childTerminals[i].terminal.direction.toLowerCase() === toDrct) {
                toTerminal = childTerminals[i];
                break;
            }
        }

        return toTerminal;
    },

    /**
     * 터미널로부터 부모 Shape element 를 찾아 반환한다.
     *
     * @param {Element,String} terminal 터미널 Element or ID
     * @return {Element} Shape element
     * @private
     */
    _getShapeFromTerminal: function (terminal) {
        var terminalId = OG.Util.isElement(terminal) ? terminal.id : terminal;
        if (terminalId) {
            return this.getElementById(terminalId.substring(0, terminalId.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP)));
        } else {
            return null;
        }
    },

    /**
     * Shape 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
     *
     * @example
     * renderer.drawShape([100, 100], new OG.CircleShape(), [50, 50], {stroke:'red'});
     *
     * @param {Number[]} position 드로잉할 위치 좌표(중앙 기준)
     * @param {OG.shape.IShape} shape Shape
     * @param {Number[]} size Shape Width, Height
     * @param {OG.geometry.Style,Object} style 스타일
     * @param {String} id Element ID 지정
     * @return {Element} Group DOM Element with geometry
     */
    drawShape: function (position, shape, size, style, id) {
        throw new OG.NotImplementedException();
    },

    /**
     * Geometry 를 캔버스에 드로잉한다.
     *
     * @param {OG.geometry.Geometry} geometry 기하 객체
     * @param {OG.geometry.Style,Object} style 스타일
     * @return {Element} Group DOM Element with geometry
     */
    drawGeom: function (geometry, style, id) {
        throw new OG.NotImplementedException();
    },

    /**
     * Text 를 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
     * (스타일 'text-anchor': 'start' or 'middle' or 'end' 에 따라 위치 기준이 다름)
     *
     * @example
     * renderer.drawText([100, 100], 'Hello', null, {'text-anchor':'start'});
     *
     * @param {Number[]} position 드로잉할 위치 좌표(스타일 'text-anchor': 'start' or 'middle' or 'end' 에 따라 기준이 다름)
     * @param {String} text 텍스트
     * @param {Number[]} size Text Width, Height, Angle
     * @param {OG.geometry.Style,Object} style 스타일
     * @param {String} id Element ID 지정
     * @return {Element} DOM Element
     */
    drawText: function (position, text, size, style, id) {
        throw new OG.NotImplementedException();
    },

    /**
     * Image 를 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
     *
     * @example
     * renderer.drawImage([100, 100], 'img.jpg', [50, 50]);
     *
     * @param {Number[]} position 드로잉할 위치 좌표(좌상단 기준)
     * @param {String} imgSrc 이미지경로
     * @param {Number[]} size Image Width, Height, Angle
     * @param {OG.geometry.Style,Object} style 스타일
     * @param {String} id Element ID 지정
     * @return {Element} DOM Element
     */
    drawImage: function (position, imgSrc, size, style, id) {
        throw new OG.NotImplementedException();
    },

    /**
     * 라인을 캔버스에 드로잉한다.
     *
     * @param {OG.geometry.Line} line 라인
     * @param {OG.geometry.Style,Object} style 스타일
     * @param {String} id Element ID 지정
     * @param {Boolean} isSelf 셀프 연결 여부
     * @return {Element} Group DOM Element with geometry
     */
    drawEdge: function (line, style, id, isSelf) {
        throw new OG.NotImplementedException();
    },

    /**
     * Shape 의 Label 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
     *
     * @param {Element,String} shapeElement Shape DOM element or ID
     * @param {String} text 텍스트
     * @param {Object} style 스타일
     * @return {Element} DOM Element
     */
    drawLabel: function (shapeElement, text, style) {
        throw new OG.NotImplementedException();
    },

    /**
     * Edge 의 from, to Label 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
     *
     * @param {Element,String} shapeElement Shape DOM element or ID
     * @param {String} text 텍스트
     * @param {String} type 유형(FROM or TO)
     * @return {Element} DOM Element
     */
    drawEdgeLabel: function (shapeElement, text, type) {
        throw new OG.NotImplementedException();
    },

    /**
     * Element 에 저장된 geom, angle, image, text 정보로 shape 을 redraw 한다.
     *
     * @param {Element} element Shape 엘리먼트
     * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
     */
    redrawShape: function (element, excludeEdgeId) {
        throw new OG.NotImplementedException();
    },

    /**
     * Edge Element 에 저장된 geom, style 정보로 Edge 를 redraw 한다.
     * Edge 타입(straight, plain) 에 따른 경로를 새로 계산한다.
     *
     * @param {Element} edgeElement Edge Shape 엘리먼트
     */
    redrawEdge: function (edgeElement) {
        throw new OG.NotImplementedException();
    },

    /**
     * Shape 의 연결된 Edge 를 redraw 한다.(이동 또는 리사이즈시)
     *
     * @param {Element} element
     * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
     */
    redrawConnectedEdge: function (element, excludeEdgeId) {
        throw new OG.NotImplementedException();
    },

    /**
     * 두개의 터미널을 연결하고, 속성정보에 추가한다.
     *
     * @param {Element,Number[]} from 시작점
     * @param {Element,Number[]} to 끝점
     * @param {Element} edge Edge Shape
     * @param {OG.geometry.Style,Object} style 스타일
     * @param {String} label Label
     * @return {Element} 연결된 Edge 엘리먼트
     */
    connect: function (from, to, edge, style, label) {
        throw new OG.NotImplementedException();
    },

    /**
     * 연결속성정보를 삭제한다. Edge 인 경우는 라인만 삭제하고, 일반 Shape 인 경우는 연결된 모든 Edge 를 삭제한다.
     *
     * @param {Element} element
     */
    disconnect: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * ID에 해당하는 Element 의 Edge 연결시 Drop Over 가이드를 드로잉한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    drawDropOverGuide: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * ID에 해당하는 Element 의 Move & Resize 용 가이드를 드로잉한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {Object}
     */
    drawGuide: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * ID에 해당하는 Element 의 Move & Resize 용 가이드를 제거한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    removeGuide: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * 모든 Move & Resize 용 가이드를 제거한다.
     */
    removeAllGuide: function () {
        throw new OG.NotImplementedException();
    },

    /**
     * ID에 해당하는 Edge Element 의 Move & Resize 용 가이드를 드로잉한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {Object}
     */
    drawEdgeGuide: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * Rectangle 모양의 마우스 드래그 선택 박스 영역을 드로잉한다.
     *
     * @param {Number[]} position 드로잉할 위치 좌표(좌상단)
     * @param {Number[]} size Text Width, Height, Angle
     * @param {OG.geometry.Style,Object} style 스타일
     * @return {Element} DOM Element
     */
    drawRubberBand: function (position, size, style) {
        throw new OG.NotImplementedException();
    },

    /**
     * Rectangle 모양의 마우스 드래그 선택 박스 영역을 제거한다.
     *
     * @param {Element} root first, rubberBand 정보를 저장한 엘리먼트
     */
    removeRubberBand: function (root) {
        throw new OG.NotImplementedException();
    },

    /**
     * Edge 연결용 터미널을 드로잉한다.
     *
     * @param {Element} element DOM Element
     * @param {String} terminalType 터미널 연결 유형(IN or OUT or INOUT)
     * @return {Element} terminal group element
     */
    drawTerminal: function (element, terminalType) {
        throw new OG.NotImplementedException();
    },

    /**
     *  Edge 연결용 터미널을 remove 한다.
     *
     * @param {Element} element DOM Element
     */
    removeTerminal: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     *  모든 Edge 연결용 터미널을 remove 한다.
     */
    removeAllTerminal: function () {
        throw new OG.NotImplementedException();
    },

    /**
     * ID에 해당하는 Element 의 Collapse 가이드를 드로잉한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {Element}
     */
    drawCollapseGuide: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * ID에 해당하는 Element 의 Collapse 가이드를 제거한다.
     *
     * @param {Element} element
     */
    removeCollapseGuide: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * 주어진 Shape 들을 그룹핑한다.
     *
     * @param {Element[]} elements
     * @return {Element} Group Shape Element
     */
    group: function (elements) {
        throw new OG.NotImplementedException();
    },

    /**
     * 주어진 그룹들을 그룹해제한다.
     *
     * @param {Element[]} groupElements
     * @return {Element[]} ungrouped Elements
     */
    ungroup: function (groupElements) {
        throw new OG.NotImplementedException();
    },

    /**
     * 주어진 Shape 들을 그룹에 추가한다.
     *
     * @param {Element} groupElement
     * @param {Element[]} elements
     */
    addToGroup: function (groupElement, elements) {
        throw new OG.NotImplementedException();
    },

    /**
     * 주어진 Shape 이 그룹인 경우 collapse 한다.
     *
     * @param {Element} element
     */
    collapse: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * 주어진 Shape 이 그룹인 경우 expand 한다.
     *
     * @param {Element} element
     */
    expand: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * 드로잉된 모든 오브젝트를 클리어한다.
     */
    clear: function () {
        throw new OG.NotImplementedException();
    },

    /**
     * Shape 을 캔버스에서 관련된 모두를 삭제한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    removeShape: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * ID에 해당하는 Element 를 캔버스에서 제거한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    remove: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * 하위 엘리먼트만 제거한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    removeChild: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * 랜더러 캔버스 Root Element 를 반환한다.
     *
     * @return {Element} Element
     */
    getRootElement: function () {
        throw new OG.NotImplementedException();
    },

    /**
     * 랜더러 캔버스 Root Group Element 를 반환한다.
     *
     * @return {Element} Element
     */
    getRootGroup: function () {
        return this._ROOT_GROUP.node;
    },

    /**
     * 주어진 지점을 포함하는 Top Element 를 반환한다.
     *
     * @param {Number[]} position 위치 좌표
     * @return {Element} Element
     */
    getElementByPoint: function (position) {
        throw new OG.NotImplementedException();
    },

    /**
     * 주어진 Boundary Box 영역에 포함되는 Shape(GEOM, TEXT, IMAGE) Element 를 반환한다.
     *
     * @param {OG.geometry.Envelope} envelope Boundary Box 영역
     * @return {Element[]} Element
     */
    getElementsByBBox: function (envelope) {
        var elements = [];
        $(this.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "]").each(function (index, element) {
            if (element.shape.geom && envelope.isContainsAll(element.shape.geom.getVertices())) {
                elements.push(element);
            }
        });

        return elements;
    },

    /**
     * 엘리먼트에 속성값을 설정한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @param {Object} attribute 속성값
     */
    setAttr: function (element, attribute) {
        throw new OG.NotImplementedException();
    },

    /**
     * 엘리먼트 속성값을 반환한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @param {String} attrName 속성이름
     * @return {Object} attribute 속성값
     */
    getAttr: function (element, attrName) {
        throw new OG.NotImplementedException();
    },

    /**
     * Shape 의 스타일을 변경한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @param {Object} style 스타일
     */
    setShapeStyle: function (element, style) {
        throw new OG.NotImplementedException();
    },

    /**
     * ID에 해당하는 Element 를 최상단 레이어로 이동한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    toFront: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * ID에 해당하는 Element 를 최하단 레이어로 이동한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    toBack: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * 랜더러 캔버스의 사이즈(Width, Height)를 반환한다.
     *
     * @return {Number[]} Canvas Width, Height
     */
    getCanvasSize: function () {
        throw new OG.NotImplementedException();
    },

    /**
     * 랜더러 캔버스의 사이즈(Width, Height)를 변경한다.
     *
     * @param {Number[]} size Canvas Width, Height
     */
    setCanvasSize: function (size) {
        throw new OG.NotImplementedException();
    },

    /**
     * 랜더러 캔버스의 사이즈(Width, Height)를 실제 존재하는 Shape 의 영역에 맞게 변경한다.
     *
     * @param {Number[]} minSize Canvas 최소 Width, Height
     * @param {Boolean} fitScale 주어진 minSize 에 맞게 fit 여부(Default:false)
     */
    fitCanvasSize: function (minSize, fitScale) {
        throw new OG.NotImplementedException();
    },

    /**
     * 새로운 View Box 영역을 설정한다. (ZoomIn & ZoomOut 가능)
     *
     * @param {Number[]} position 위치 좌표(좌상단 기준)
     * @param {Number[]} size Canvas Width, Height
     * @param {Boolean} isFit Fit 여부
     */
    setViewBox: function (position, size, isFit) {
        throw new OG.NotImplementedException();
    },

    /**
     * Scale 을 반환한다. (리얼 사이즈 : Scale = 1)
     *
     * @return {Number} 스케일값
     */
    getScale: function () {
        throw new OG.NotImplementedException();
    },

    /**
     * Scale 을 설정한다. (리얼 사이즈 : Scale = 1)
     *
     * @param {Number} scale 스케일값
     */
    setScale: function (scale) {
        throw new OG.NotImplementedException();
    },

    /**
     * ID에 해당하는 Element 를 캔버스에서 show 한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    show: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * ID에 해당하는 Element 를 캔버스에서 hide 한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    hide: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * Source Element 를 Target Element 아래에 append 한다.
     *
     * @param {Element,String} srcElement Element 또는 ID
     * @param {Element,String} targetElement Element 또는 ID
     * @return {Element} Source Element
     */
    appendChild: function (srcElement, targetElement) {
        throw new OG.NotImplementedException();
    },

    /**
     * Source Element 를 Target Element 이후에 insert 한다.
     *
     * @param {Element,String} srcElement Element 또는 ID
     * @param {Element,String} targetElement Element 또는 ID
     * @return {Element} Source Element
     */
    insertAfter: function (srcElement, targetElement) {
        throw new OG.NotImplementedException();
    },

    /**
     * Source Element 를 Target Element 이전에 insert 한다.
     *
     * @param {Element,String} srcElement Element 또는 ID
     * @param {Element,String} targetElement Element 또는 ID
     * @return {Element} Source Element
     */
    insertBefore: function (srcElement, targetElement) {
        throw new OG.NotImplementedException();
    },

    /**
     * 해당 Element 를 가로, 세로 Offset 만큼 이동한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @param {Number[]} offset [가로, 세로]
     * @return {Element} Element
     */
    move: function (element, offset) {
        throw new OG.NotImplementedException();
    },

    /**
     * 주어진 중심좌표로 해당 Element 를 이동한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @param {Number[]} position [x, y]
     * @return {Element} Element
     */
    moveCentroid: function (element, position) {
        throw new OG.NotImplementedException();
    },

    /**
     * 중심 좌표를 기준으로 주어진 각도 만큼 회전한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @param {Number} angle 각도
     * @return {Element} Element
     */
    rotate: function (element, angle) {
        throw new OG.NotImplementedException();
    },

    /**
     * 상, 하, 좌, 우 외곽선을 이동한 만큼 리사이즈 한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @param {Number[]} offset [상, 하, 좌, 우] 각 방향으로 + 값
     * @return {Element} Element
     */
    resize: function (element, offset) {
        throw new OG.NotImplementedException();
    },

    /**
     * 중심좌표는 고정한 채 Bounding Box 의 width, height 를 리사이즈 한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @param {Number[]} size [Width, Height]
     * @return {Element} Element
     */
    resizeBox: function (element, size) {
        throw new OG.NotImplementedException();
    },

    /**
     * Edge 유형에 따라 Shape 과의 연결 지점을 찾아 반환한다.
     *
     * @param {String} edgeType Edge 유형(straight, plain..)
     * @param {Element} element 연결할 Shape 엘리먼트
     * @param {Number[]} from 시작좌표
     * @param {Number[]} to 끝좌표
     * @param {Boolean} 시작 연결지점 여부
     * @return {Object} {position, direction}
     */
    intersectionEdge: function (edgeType, element, from, to, isFrom) {
        var me = this, terminal, position, direction, intersectPoints, i, minDistance = Number.MAX_VALUE, distance,
            collapsedParents, collapsedEnvelope, collapsedUpperLeft, collapsedGeom, collapsedPosition;

        // element 가 collapsed 인지 체크
        if (element) {
            collapsedParents = $(element).parents("[_collapsed=true]");
            if (collapsedParents.length !== 0) {
                // collapsed 인 경우
                collapsedEnvelope = collapsedParents[collapsedParents.length - 1].shape.geom.getBoundary();
                collapsedUpperLeft = collapsedEnvelope.getUpperLeft();
                collapsedGeom = new OG.geometry.Rectangle(
                    collapsedUpperLeft, me._CONFIG.COLLAPSE_SIZE * 3, me._CONFIG.COLLAPSE_SIZE * 2);
            }
        }

        switch (edgeType) {
            case OG.Constants.EDGE_TYPE.PLAIN:
            case OG.Constants.EDGE_TYPE.BEZIER:
                terminal = isFrom ? this._findFromTerminal(element, from, to) : this._findToTerminal(element, from, to);
                position = [terminal.terminal.position.x, terminal.terminal.position.y];
                direction = terminal.terminal.direction.toLowerCase();

                if (collapsedGeom) {
                    switch (terminal.terminal.direction) {
                        case OG.Constants.TERMINAL_TYPE.E:
                            collapsedPosition = collapsedGeom.getBoundary().getRightCenter();
                            break;
                        case OG.Constants.TERMINAL_TYPE.W:
                            collapsedPosition = collapsedGeom.getBoundary().getLeftCenter();
                            break;
                        case OG.Constants.TERMINAL_TYPE.S:
                            collapsedPosition = collapsedGeom.getBoundary().getLowerCenter();
                            break;
                        case OG.Constants.TERMINAL_TYPE.N:
                            collapsedPosition = collapsedGeom.getBoundary().getUpperCenter();
                            break;
                    }
                    if (collapsedPosition) {
                        position = [collapsedPosition.x, collapsedPosition.y];
                    }
                }

                break;
            case OG.Constants.EDGE_TYPE.STRAIGHT:
                if (collapsedGeom) {
                    collapsedPosition = collapsedGeom.getBoundary().getCentroid();
                    if (isFrom === true) {
                        from = [collapsedPosition.x, collapsedPosition.y];
                    } else {
                        to = [collapsedPosition.x, collapsedPosition.y];
                    }
                    intersectPoints = collapsedGeom.intersectToLine([from, to]);
                } else {
                    intersectPoints = element.shape.geom.intersectToLine([from, to]);
                }
                position = isFrom ? from : to;
                direction = "c";
                for (i = 0; i < intersectPoints.length; i++) {
                    distance = intersectPoints[i].distance(isFrom ? to : from);
                    if (distance < minDistance) {
                        minDistance = distance;
                        position = [intersectPoints[i].x, intersectPoints[i].y];
                        direction = "c";
                    }
                }
                break;
            default:
                break;
        }

        return {
            position: position,
            direction: direction
        };
    },

    /**
     * 노드 Element 를 복사한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {Element} Element
     */
    clone: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * ID로 Node Element 를 반환한다.
     *
     * @param {String} id
     * @return {Element} Element
     */
    getElementById: function (id) {
        throw new OG.NotImplementedException();
    },

    /**
     * Shape 타입에 해당하는 Node Element 들을 반환한다.
     *
     * @param {String} shapeType Shape 타입(GEOM, HTML, IMAGE, EDGE, GROUP), Null 이면 모든 타입
     * @param {String} excludeType 제외 할 타입
     * @return {Element[]} Element's Array
     */
    getElementsByType: function (shapeType, excludeType) {
        var root = this.getRootGroup();
        if (shapeType && excludeType) {
            return $(root).find("[_type=SHAPE][_shape=" + shapeType + "][_shape!=" + excludeType + "]");
        } else if (shapeType) {
            return $(root).find("[_type=SHAPE][_shape=" + shapeType + "]");
        } else if (excludeType) {
            return $(root).find("[_type=SHAPE][_shape!=" + excludeType + "]");
        } else {
            return $(root).find("[_type=SHAPE]");
        }
    },

    /**
     * 해당 엘리먼트의 BoundingBox 영역 정보를 반환한다.
     *
     * @param {Element,String} element
     * @return {Object} {width, height, x, y, x2, y2}
     */
    getBBox: function (element) {
        throw new OG.NotImplementedException();
    },

    /**
     * 부모노드기준으로 캔버스 루트 엘리먼트의 BoundingBox 영역 정보를 반환한다.
     *
     * @return {Object} {width, height, x, y, x2, y2}
     */
    getRootBBox: function () {
        throw new OG.NotImplementedException();
    },

    /**
     * 부모노드기준으로 캔버스 루트 엘리먼트의 실제 Shape 이 차지하는 BoundingBox 영역 정보를 반환한다.
     *
     * @return {Object} {width, height, x, y, x2, y2}
     */
    getRealRootBBox: function () {
        var minX = Number.MAX_VALUE, minY = Number.MAX_VALUE, maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE,
            shapeElements = this.getElementsByType(), shape, envelope, upperLeft, lowerRight, i,
            rootBBox = {
                width: 0,
                height: 0,
                x: 0,
                y: 0,
                x2: 0,
                y2: 0
            };

        for (i = 0; i < shapeElements.length; i++) {
            shape = shapeElements[i].shape;
            if (shape && shape.geom) {
                envelope = shape.geom.getBoundary();
                upperLeft = envelope.getUpperLeft();
                lowerRight = envelope.getLowerRight();

                minX = minX > upperLeft.x ? upperLeft.x : minX;
                minY = minY > upperLeft.y ? upperLeft.y : minY;
                maxX = maxX < lowerRight.x ? lowerRight.x : maxX;
                maxY = maxY < lowerRight.y ? lowerRight.y : maxY;

                rootBBox = {
                    width: maxX - minX,
                    height: maxY - minY,
                    x: minX,
                    y: minY,
                    x2: maxX,
                    y2: maxY
                };
            }
        }

        return rootBBox;
    },

    /**
     * 캔버스의 컨테이너 DOM element 를 반환한다.
     *
     * @return {Element} 컨테이너
     */
    getContainer: function () {
        throw new OG.NotImplementedException();
    },


    /**
     * SVG 인지 여부를 반환한다.
     *
     * @return {Boolean} svg 여부
     */
    isSVG: function () {
        throw new OG.NotImplementedException();
    },

    /**
     * VML 인지 여부를 반환한다.
     *
     * @return {Boolean} vml 여부
     */
    isVML: function () {
        throw new OG.NotImplementedException();
    },

    /**
     * 연결된 이전 Edge Element 들을 반환한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {Element[]} Previous Element's Array
     */
    getPrevEdges: function (element) {
        var prevEdgeIds = $(element).attr('_fromedge'),
            edgeArray = [],
            edgeIds, edge, i;

        if (prevEdgeIds) {
            edgeIds = prevEdgeIds.split(',');
            for (i = 0; i < edgeIds.length; i++) {
                edge = this.getElementById(edgeIds[i]);
                if (edge) {
                    edgeArray.push(edge);
                }
            }
        }

        return edgeArray;
    },

    /**
     * 연결된 이후 Edge Element 들을 반환한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {Element[]} Previous Element's Array
     */
    getNextEdges: function (element) {
        var nextEdgeIds = $(element).attr('_toedge'),
            edgeArray = [],
            edgeIds, edge, i;

        if (nextEdgeIds) {
            edgeIds = nextEdgeIds.split(',');
            for (i = 0; i < edgeIds.length; i++) {
                edge = this.getElementById(edgeIds[i]);
                if (edge) {
                    edgeArray.push(edge);
                }
            }
        }

        return edgeArray;
    },

    /**
     * 연결된 이전 노드 Element 들을 반환한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {Element[]} Previous Element's Array
     */
    getPrevShapes: function (element) {
        var prevEdges = this.getPrevEdges(element),
            shapeArray = [],
            prevShapeId, shape, i;

        for (i = 0; i < prevEdges.length; i++) {
            prevShapeId = $(prevEdges[i]).attr('_from');
            if (prevShapeId) {
                prevShapeId = prevShapeId.substring(0, prevShapeId.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP));
                shape = this.getElementById(prevShapeId);
                if (shape) {
                    shapeArray.push(shape);
                }
            }
        }

        return shapeArray;
    },

    /**
     * 연결된 이전 노드 Element ID들을 반환한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {String[]} Previous Element Id's Array
     */
    getPrevShapeIds: function (element) {
        var prevEdges = this.getPrevEdges(element),
            shapeArray = [],
            prevShapeId, i;

        for (i = 0; i < prevEdges.length; i++) {
            prevShapeId = $(prevEdges[i]).attr('_from');
            if (prevShapeId) {
                prevShapeId = prevShapeId.substring(0, prevShapeId.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP));
                shapeArray.push(prevShapeId);
            }
        }

        return shapeArray;
    },

    /**
     * 연결된 이후 노드 Element 들을 반환한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {Element[]} Previous Element's Array
     */
    getNextShapes: function (element) {
        var nextEdges = this.getNextEdges(element),
            shapeArray = [],
            nextShapeId, shape, i;

        for (i = 0; i < nextEdges.length; i++) {
            nextShapeId = $(nextEdges[i]).attr('_to');
            if (nextShapeId) {
                nextShapeId = nextShapeId.substring(0, nextShapeId.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP));
                shape = this.getElementById(nextShapeId);
                if (shape) {
                    shapeArray.push(shape);
                }
            }
        }

        return shapeArray;
    },

    /**
     * 연결된 이후 노드 Element ID들을 반환한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {String[]} Previous Element Id's Array
     */
    getNextShapeIds: function (element) {
        var nextEdges = this.getNextEdges(element),
            shapeArray = [],
            nextShapeId, i;

        for (i = 0; i < nextEdges.length; i++) {
            nextShapeId = $(nextEdges[i]).attr('_to');
            if (nextShapeId) {
                nextShapeId = nextShapeId.substring(0, nextShapeId.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP));
                shapeArray.push(nextShapeId);
            }
        }

        return shapeArray;
    }
};
OG.renderer.IRenderer.prototype.constructor = OG.renderer.IRenderer;
/**
 * Raphael 라이브러리를 이용하여 구현한 랜더러 캔버스 클래스
 * - 노드에 추가되는 속성 : _type, _shape, _selected, _from, _to, _fromedge, _toedge
 * - 노드에 저장되는 값 : shape : { geom, angle, image, text }, data : 커스텀 Object
 *
 * @class
 * @extends OG.renderer.IRenderer
 * @requires OG.common.*, OG.geometry.*, OG.shape.*, raphael-2.1.0
 *
 * @param {HTMLElement,String} container 컨테이너 DOM element or ID
 * @param {Number[]} containerSize 컨테이너 Width, Height
 * @param {String} backgroundColor 캔버스 배경색
 * @param {String} backgroundImage 캔버스 배경이미지
 * @param {Object} config Configuration
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.renderer.RaphaelRenderer = function (container, containerSize, backgroundColor, backgroundImage, config) {
    OG.renderer.RaphaelRenderer.superclass.call(this, arguments);

    this._CONFIG = config;
    this._PAPER = new Raphael(container, containerSize ? containerSize[0] : null, containerSize ? containerSize[1] : null);

    // 최상위 그룹 엘리먼트 초기화
    this._ROOT_GROUP = this._add(this._PAPER.group(), null, OG.Constants.NODE_TYPE.ROOT);
    this._ETC_GROUP = this._add(this._PAPER.group(), null, OG.Constants.NODE_TYPE.ETC);
    this._PAPER.id = "OG_" + this._ID_PREFIX;
    this._PAPER.canvas.id = "OG_" + this._ID_PREFIX;
    this._CANVAS_COLOR = backgroundColor || this._CONFIG.CANVAS_BACKGROUND;

    $(this._PAPER.canvas).css({
        "background-color": this._CANVAS_COLOR,
        "user-select": "none",
        "-o-user-select": "none",
        "-moz-user-select": "none",
        "-khtml-user-select": "none",
        "-webkit-user-select": "none"
    });
    if (backgroundImage) {
        $(this._PAPER.canvas).css({"background-image": backgroundImage});
    }

    // container 에 keydown 이벤트 가능하도록
    $(this._PAPER.canvas.parentNode).attr("tabindex", "0");
    $(this._PAPER.canvas.parentNode).css({"outline": "none"});

    // container 의 position 을 static 인 경우 offset 이 깨지므로 relative 로 보정
    if ($(this._PAPER.canvas.parentNode).css('position') === 'static') {
        $(this._PAPER.canvas.parentNode).css({
            position: 'relative',
            left: '0',
            top: '0'
        });
    }
};
OG.renderer.RaphaelRenderer.prototype = new OG.renderer.IRenderer();
OG.renderer.RaphaelRenderer.superclass = OG.renderer.IRenderer;
OG.renderer.RaphaelRenderer.prototype.constructor = OG.renderer.RaphaelRenderer;
OG.RaphaelRenderer = OG.renderer.RaphaelRenderer;

/**
 * ID를 발급하고 ID:rElement 해쉬맵에 추가한다.
 *
 * @param {Raphael.Element} rElement 라파엘 엘리먼트
 * @param {String} id 지정ID
 * @param {String} nodeType Node 유형(ROOT, SHAPE ...)
 * @param {String} shapeType Shape 유형(GEOM, TEXT, IMAGE, EDGE, GROUP ...)
 * @return {Raphael.Element} rElement 라파엘 엘리먼트
 * @private
 */
OG.renderer.RaphaelRenderer.prototype._add = function (rElement, id, nodeType, shapeType) {
    rElement.id = id || this._genId();
    rElement.node.id = rElement.id;
    rElement.node.raphaelid = rElement.id;
    if (nodeType) {
        $(rElement.node).attr("_type", nodeType);
    }
    if (shapeType) {
        $(rElement.node).attr("_shape", shapeType);
    }
    this._ELE_MAP.put(rElement.id, rElement);

    return rElement;
};

/**
 * 라파엘 엘리먼트를 하위 엘리먼트 포함하여 제거한다.
 *
 * @param {Raphael.Element} rElement 라파엘 엘리먼트
 * @private
 */
OG.renderer.RaphaelRenderer.prototype._remove = function (rElement) {
    var childNodes, i;
    if (rElement) {
        childNodes = rElement.node.childNodes;
        for (i = childNodes.length - 1; i >= 0; i--) {
            this._remove(this._getREleById(childNodes[i].id));
        }
        this._ELE_MAP.remove(rElement.id);
        rElement.remove();
    }
};

/**
 * 하위 엘리먼트만 제거한다.
 *
 * @param {Raphael.Element} rElement 라파엘 엘리먼트
 * @private
 */
OG.renderer.RaphaelRenderer.prototype._removeChild = function (rElement) {
    var childNodes, i;
    if (rElement) {
        childNodes = rElement.node.childNodes;
        for (i = childNodes.length - 1; i >= 0; i--) {
            this._remove(this._getREleById(childNodes[i].id));
        }
    }
};

/**
 * ID에 해당하는 RaphaelElement 를 반환한다.
 *
 * @param {String} id ID
 * @return {Raphael.Element} RaphaelElement
 * @private
 */
OG.renderer.RaphaelRenderer.prototype._getREleById = function (id) {
    return this._ELE_MAP.get(id);
};

/**
 * Geometry 를 캔버스에 드로잉한다.(Recursive)
 *
 * @param {Element} groupElement Group DOM Element
 * @param {OG.geometry.Geometry} geometry 기하 객체
 * @param {OG.geometry.Style,Object} style 스타일
 * @param {Object} parentStyle Geometry Collection 인 경우 상위 Geometry 스타일
 * @return {Element}
 * @private
 */
OG.renderer.RaphaelRenderer.prototype._drawGeometry = function (groupElement, geometry, style, parentStyle) {
    var me = this, i = 0, pathStr = "", vertices, element, geomObj, _style = {},
        getRoundedPath = function (rectangle, radius) {
            var rectObj, rectVert, offset1, offset2, angle, array = [],
                getRoundedOffset = function (coord, dist, deg) {
                    var theta = Math.PI / 180 * deg;
                    return new OG.geometry.Coordinate(
                        OG.Util.round(coord.x + dist * Math.cos(theta)),
                        OG.Util.round(coord.y + dist * Math.sin(theta))
                    );
                };

            rectObj = OG.JSON.decode(rectangle.toString());
            rectVert = rectangle.getVertices();
            angle = rectObj.angle;

            offset1 = getRoundedOffset(rectVert[0], radius, 90 + angle);
            offset2 = getRoundedOffset(rectVert[0], radius, angle);
            array = array.concat(["M", offset1.x, offset1.y, "Q", rectVert[0].x, rectVert[0].y, offset2.x, offset2.y]);

            offset1 = getRoundedOffset(rectVert[1], radius, 180 + angle);
            offset2 = getRoundedOffset(rectVert[1], radius, 90 + angle);
            array = array.concat(["L", offset1.x, offset1.y, "Q", rectVert[1].x, rectVert[1].y, offset2.x, offset2.y]);

            offset1 = getRoundedOffset(rectVert[2], radius, 270 + angle);
            offset2 = getRoundedOffset(rectVert[2], radius, 180 + angle);
            array = array.concat(["L", offset1.x, offset1.y, "Q", rectVert[2].x, rectVert[2].y, offset2.x, offset2.y]);

            offset1 = getRoundedOffset(rectVert[3], radius, angle);
            offset2 = getRoundedOffset(rectVert[3], radius, 270 + angle);
            array = array.concat(["L", offset1.x, offset1.y, "Q", rectVert[3].x, rectVert[3].y, offset2.x, offset2.y, "Z"]);

            return array.toString();
        };
    if (parentStyle) {
        OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {},
            OG.Util.apply({}, geometry.style.map, OG.Util.apply({}, parentStyle, me._CONFIG.DEFAULT_STYLE.GEOM)));
    } else {
        OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {},
            OG.Util.apply({}, geometry.style.map, me._CONFIG.DEFAULT_STYLE.GEOM));
    }

    geometry.style.map = _style;

    // 타입에 따라 드로잉
    switch (geometry.TYPE) {
        case OG.Constants.GEOM_TYPE.POINT:
            element = this._PAPER.circle(geometry.coordinate.x, geometry.coordinate.y, 0.5);
            element.attr(_style);
            break;

        case OG.Constants.GEOM_TYPE.LINE:
        case OG.Constants.GEOM_TYPE.POLYLINE:
        case OG.Constants.GEOM_TYPE.POLYGON:
            pathStr = "";
            vertices = geometry.getVertices();
            for (i = 0; i < vertices.length; i++) {
                if (i === 0) {
                    pathStr = "M" + vertices[i].x + " " + vertices[i].y;
                } else {
                    pathStr += "L" + vertices[i].x + " " + vertices[i].y;
                }
            }
            element = this._PAPER.path(pathStr);
            element.attr(_style);
            break;
        case OG.Constants.GEOM_TYPE.RECTANGLE:
            if ((_style.r || 0) === 0) {
                pathStr = "";
                vertices = geometry.getVertices();
                for (i = 0; i < vertices.length; i++) {
                    if (i === 0) {
                        pathStr = "M" + vertices[i].x + " " + vertices[i].y;
                    } else {
                        pathStr += "L" + vertices[i].x + " " + vertices[i].y;
                    }
                }
            } else {
                pathStr = getRoundedPath(geometry, _style.r || 0);
            }

            element = this._PAPER.path(pathStr);
            element.attr(_style);
            break;

        case OG.Constants.GEOM_TYPE.CIRCLE:
            geomObj = OG.JSON.decode(geometry.toString());
            if (geomObj.type === OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.CIRCLE]) {
                element = this._PAPER.circle(geomObj.center[0], geomObj.center[1], geomObj.radius);
            } else if (geomObj.type === OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.ELLIPSE]) {
                if (geomObj.angle === 0) {
                    element = this._PAPER.ellipse(geomObj.center[0], geomObj.center[1], geomObj.radiusX, geomObj.radiusY);
                } else {
                    pathStr = "";
                    vertices = geometry.getControlPoints();
                    pathStr = "M" + vertices[1].x + " " + vertices[1].y + "A" + geomObj.radiusX + " " + geomObj.radiusY
                        + " " + geomObj.angle + " 1 0 " + vertices[5].x + " " + vertices[5].y;
                    pathStr += "M" + vertices[1].x + " " + vertices[1].y + "A" + geomObj.radiusX + " " + geomObj.radiusY
                        + " " + geomObj.angle + " 1 1 " + vertices[5].x + " " + vertices[5].y;
                    element = this._PAPER.path(pathStr);
                }
            }
            element.attr(_style);
            break;

        case OG.Constants.GEOM_TYPE.ELLIPSE:
            geomObj = OG.JSON.decode(geometry.toString());
            if (geomObj.angle === 0) {
                element = this._PAPER.ellipse(geomObj.center[0], geomObj.center[1], geomObj.radiusX, geomObj.radiusY);
            } else {
                pathStr = "";
                vertices = geometry.getControlPoints();
                pathStr = "M" + vertices[1].x + " " + vertices[1].y + "A" + geomObj.radiusX + " " + geomObj.radiusY
                    + " " + geomObj.angle + " 1 0 " + vertices[5].x + " " + vertices[5].y;
                pathStr += "M" + vertices[1].x + " " + vertices[1].y + "A" + geomObj.radiusX + " " + geomObj.radiusY
                    + " " + geomObj.angle + " 1 1 " + vertices[5].x + " " + vertices[5].y;
                element = this._PAPER.path(pathStr);
            }
            element.attr(_style);
            break;

        case OG.Constants.GEOM_TYPE.CURVE:
            pathStr = "";
            vertices = geometry.getControlPoints();
            for (i = 0; i < vertices.length; i++) {
                if (i === 0) {
                    pathStr = "M" + vertices[i].x + " " + vertices[i].y;
                } else if (i === 1) {
                    pathStr += "R" + vertices[i].x + " " + vertices[i].y;
                } else {
                    pathStr += " " + vertices[i].x + " " + vertices[i].y;
                }
            }
            element = this._PAPER.path(pathStr);
            element.attr(_style);
            break;

        case OG.Constants.GEOM_TYPE.BEZIER_CURVE:
            pathStr = "";
            vertices = geometry.getControlPoints();
            for (i = 0; i < vertices.length; i++) {
                if (i === 0) {
                    pathStr = "M" + vertices[i].x + " " + vertices[i].y;
                } else if (i === 1) {
                    pathStr += "C" + vertices[i].x + " " + vertices[i].y;
                } else {
                    pathStr += " " + vertices[i].x + " " + vertices[i].y;
                }
            }
            element = this._PAPER.path(pathStr);
            element.attr(_style);
            break;

        case OG.Constants.GEOM_TYPE.COLLECTION:
            for (i = 0; i < geometry.geometries.length; i++) {
                // recursive call
                this._drawGeometry(groupElement, geometry.geometries[i], style, geometry.style.map);
            }
            break;
    }

    if (element) {
        this._add(element);
        groupElement.appendChild(element.node);

        return element.node;
    } else {
        return groupElement;
    }
};

/**
 * Shape 의 Label 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
 *
 * @param {Number[]} position 드로잉할 위치 좌표(중앙 기준)
 * @param {String} text 텍스트
 * @param {Number[]} size Text Width, Height, Angle
 * @param {OG.geometry.Style,Object} style 스타일
 * @param {String} id Element ID 지정
 * @param {Boolean} isEdge 라인여부(라인인 경우 라벨이 가려지지 않도록)
 * @return {Element} DOM Element
 * @private
 */
OG.renderer.RaphaelRenderer.prototype._drawLabel = function (position, text, size, style, id, isEdge) {
    var me = this, LABEL_PADDING = me._CONFIG.LABEL_PADDING,
        width = size ? size[0] - LABEL_PADDING * 2 : null,
        height = size ? size[1] - LABEL_PADDING * 2 : null,
        angle = size ? size[2] || 0 : 0,
        group, element, rect, _style = {}, text_anchor, geom,
        bBox, left, top, x, y;
    OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {}, me._CONFIG.DEFAULT_STYLE.TEXT);

    // ID 지정된 경우 존재하면 하위 노드 제거
    if (id === 0 || id) {
        group = this._getREleById(id);
        if (group) {
            this._removeChild(group);
        } else {
            group = this._PAPER.group();
            this._add(group, id);
        }
    } else {
        group = this._PAPER.group();
        this._add(group, id);
    }

    // text-anchor 리셋
    text_anchor = _style["text-anchor"] || 'middle';
    _style["text-anchor"] = 'middle';

    // Draw text
    element = this._PAPER.text(position[0], position[1], text);
    element.attr(_style);

    // real size
    bBox = element.getBBox();

    // calculate width, height, left, top
    width = width ? (width > bBox.width ? width : bBox.width) : bBox.width;
    height = height ? (height > bBox.height ? height : bBox.height) : bBox.height;
    left = OG.Util.round(position[0] - width / 2);
    top = OG.Util.round(position[1] - height / 2);

    // Boundary Box
    geom = new OG.Rectangle([left, top], width, height);

    if (_style["label-direction"] === 'vertical') {
        // Text Horizontal Align
        switch (text_anchor) {
            case "start":
                y = geom.getBoundary().getLowerCenter().y;
                break;
            case "end":
                y = geom.getBoundary().getUpperCenter().y;
                break;
            case "middle":
                y = geom.getBoundary().getCentroid().y;
                break;
            default:
                y = geom.getBoundary().getCentroid().y;
                break;
        }

        // Text Vertical Align
        switch (_style["vertical-align"]) {
            case "top":
                x = OG.Util.round(geom.getBoundary().getLeftCenter().x + bBox.height / 2);
                break;
            case "bottom":
                x = OG.Util.round(geom.getBoundary().getRightCenter().x - bBox.height / 2);
                break;
            case "middle":
                x = geom.getBoundary().getCentroid().x;
                break;
            default:
                x = geom.getBoundary().getCentroid().x;
                break;
        }

        angle = -90;
    } else {
        // Text Horizontal Align
        switch (text_anchor) {
            case "start":
                x = geom.getBoundary().getLeftCenter().x;
                break;
            case "end":
                x = geom.getBoundary().getRightCenter().x;
                break;
            case "middle":
                x = geom.getBoundary().getCentroid().x;
                break;
            default:
                x = geom.getBoundary().getCentroid().x;
                break;
        }

        // Text Vertical Align
        switch (_style["vertical-align"]) {
            case "top":
                y = OG.Util.round(geom.getBoundary().getUpperCenter().y + bBox.height / 2);
                break;
            case "bottom":
                y = OG.Util.round(geom.getBoundary().getLowerCenter().y - bBox.height / 2);
                break;
            case "middle":
                y = geom.getBoundary().getCentroid().y;
                break;
            default:
                y = geom.getBoundary().getCentroid().y;
                break;
        }
    }

    // text align, font-color, font-size 적용
    element.attr({
        x: x,
        y: y,
        stroke: "none",
        fill: _style["font-color"] || me._CONFIG.DEFAULT_STYLE.LABEL["font-color"],
        "font-size": _style["font-size"] || me._CONFIG.DEFAULT_STYLE.LABEL["font-size"],
        "fill-opacity": 1
    });

    // angle 적용
    if (angle || _style["label-angle"]) {
        if (angle === 0) {
            angle = parseInt(_style["label-angle"], 10);
        }
        element.rotate(angle);
    }

    // text-anchor 적용
    element.attr({
        'text-anchor': text_anchor
    });

    // 라인인 경우 overwrap 용 rectangle
    if (isEdge && text) {
        // real size
        bBox = element.getBBox();

        rect = this._PAPER.rect(bBox.x - LABEL_PADDING / 2, bBox.y - LABEL_PADDING / 2,
            bBox.width + LABEL_PADDING, bBox.height + LABEL_PADDING);
        rect.attr({stroke: "none", fill: this._CANVAS_COLOR, 'fill-opacity': 1});
        this._add(rect);
        group.node.appendChild(rect.node);
    }

    // Add to group
    this._add(element);
    group.node.appendChild(element.node);

    return group.node;
};

/**
 * Shape 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
 *
 * @example
 * renderer.drawShape([100, 100], new OG.CircleShape(), [50, 50], {stroke:'red'});
 *
 * @param {Number[]} position 드로잉할 위치 좌표(중앙 기준)
 * @param {OG.shape.IShape} shape Shape
 * @param {Number[]} size Shape Width, Height
 * @param {OG.geometry.Style,Object} style 스타일
 * @param {String} id Element ID 지정
 * @return {Element} Group DOM Element with geometry
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.drawShape = function (position, shape, size, style, id) {
    var width = size ? size[0] : 100,
        height = size ? size[1] : 100,
        groupNode, geometry, text, image, html;

    if (shape instanceof OG.shape.GeomShape) {
        geometry = shape.createShape();

        // 좌상단으로 이동 및 크기 조정
        geometry.moveCentroid(position);
        geometry.resizeBox(width, height);

        groupNode = this.drawGeom(geometry, style, id);
        shape.geom = groupNode.geom;
    } else if (shape instanceof OG.shape.TextShape) {
        text = shape.createShape();

        groupNode = this.drawText(position, text, size, style, id);
        shape.text = groupNode.text;
        shape.angle = groupNode.angle;
        shape.geom = groupNode.geom;
    } else if (shape instanceof OG.shape.ImageShape) {
        image = shape.createShape();

        groupNode = this.drawImage(position, image, size, style, id);
        shape.image = groupNode.image;
        shape.angle = groupNode.angle;
        shape.geom = groupNode.geom;
    } else if (shape instanceof OG.shape.HtmlShape) {
        html = shape.createShape();

        groupNode = this.drawHtml(position, html, size, style, id);
        shape.html = groupNode.html;
        shape.angle = groupNode.angle;
        shape.geom = groupNode.geom;
    } else if (shape instanceof OG.shape.EdgeShape) {
        geometry = shape.geom || shape.createShape();

        groupNode = this.drawEdge(geometry, style, id);
        shape.geom = groupNode.geom;
    } else if (shape instanceof OG.shape.GroupShape) {
        geometry = shape.createShape();

        // 좌상단으로 이동 및 크기 조정
        geometry.moveCentroid(position);
        geometry.resizeBox(width, height);

        groupNode = this.drawGroup(geometry, style, id);

        shape.geom = groupNode.geom;
    }

    if (shape.geom) {
        groupNode.shape = shape;
    }
    groupNode.shapeStyle = (style instanceof OG.geometry.Style) ? style.map : style;

    $(groupNode).attr("_shape_id", shape.SHAPE_ID);

    // Draw Label
    if (!(shape instanceof OG.shape.TextShape)) {
        this.drawLabel(groupNode);

        if (shape instanceof  OG.shape.EdgeShape) {
            this.drawEdgeLabel(groupNode, null, 'FROM');
            this.drawEdgeLabel(groupNode, null, 'TO');
        }
    }
    if (groupNode.geom) {
        if (OG.Util.isIE7()) {
            groupNode.removeAttribute("geom");
        } else {
            delete groupNode.geom;
        }
    }
    if (groupNode.text) {
        if (OG.Util.isIE7()) {
            groupNode.removeAttribute("text");
        } else {
            delete groupNode.text;
        }
    }
    if (groupNode.image) {
        if (OG.Util.isIE7()) {
            groupNode.removeAttribute("image");
        } else {
            delete groupNode.image;
        }
    }
    if (groupNode.angle) {
        if (OG.Util.isIE7()) {
            groupNode.removeAttribute("angle");
        } else {
            delete groupNode.angle;
        }
    }

    // drawShape event fire
    $(this._PAPER.canvas).trigger('drawShape', [groupNode]);

    return groupNode;
};

/**
 * Geometry 를 캔버스에 드로잉한다.
 *
 * @param {OG.geometry.Geometry} geometry 기하 객체
 * @param {OG.geometry.Style,Object} style 스타일
 * @return {Element} Group DOM Element with geometry
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.drawGeom = function (geometry, style, id) {
    var me = this, group, _style = {};

    OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {});

    // ID 지정된 경우 존재하면 하위 노드 제거
    if (id === 0 || id) {
        group = this._getREleById(id);
        if (group) {
            this._removeChild(group);
        } else {
            group = this._PAPER.group();
            this._add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.GEOM);
            this._ROOT_GROUP.node.appendChild(group.node);
        }
    } else {
        group = this._PAPER.group();
        this._add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.GEOM);
        this._ROOT_GROUP.node.appendChild(group.node);
    }

    // Draw geometry
    this._drawGeometry(group.node, geometry, _style);
    group.node.geom = geometry;
    group.attr(me._CONFIG.DEFAULT_STYLE.SHAPE);

    if (group.node.shape) {
        group.node.shape.geom = geometry;

        if (group.node.geom) {
            if (OG.Util.isIE7()) {
                group.node.removeAttribute("geom");
            } else {
                delete group.node.geom;
            }
        }
    }

    return group.node;
};

/**
 * Text 를 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
 *
 * @param {Number[]} position 드로잉할 위치 좌표(중앙 기준)
 * @param {String} text 텍스트
 * @param {Number[]} size Text Width, Height, Angle
 * @param {OG.geometry.Style,Object} style 스타일
 * @param {String} id Element ID 지정
 * @return {Element} DOM Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.drawText = function (position, text, size, style, id) {
    var me = this, width = size ? size[0] : null,
        height = size ? size[1] : null,
        angle = size ? size[2] || 0 : 0,
        group, element, _style = {}, geom,
        bBox, left, top, x, y;
    OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {}, me._CONFIG.DEFAULT_STYLE.TEXT);

    // ID 지정된 경우 존재하면 하위 노드 제거
    if (id === 0 || id) {
        group = this._getREleById(id);
        if (group) {
            this._removeChild(group);
        } else {
            group = this._PAPER.group();
            this._add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.TEXT);
            this._ROOT_GROUP.node.appendChild(group.node);
        }
    } else {
        group = this._PAPER.group();
        this._add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.TEXT);
        this._ROOT_GROUP.node.appendChild(group.node);
    }

    // Draw text
    element = this._PAPER.text(position[0], position[1], text);
    element.attr(_style);

    // real size
    bBox = element.getBBox();

    // calculate width, height, left, top
    width = width ? (width > bBox.width ? width : bBox.width) : bBox.width;
    height = height ? (height > bBox.height ? height : bBox.height) : bBox.height;
    left = OG.Util.round(position[0] - width / 2);
    top = OG.Util.round(position[1] - height / 2);

    // Boundary Box
    geom = new OG.Rectangle([left, top], width, height);
    geom.style.map = _style;

    // Text Horizontal Align
    switch (_style["text-anchor"]) {
        case "start":
            x = geom.getBoundary().getLeftCenter().x;
            break;
        case "end":
            x = geom.getBoundary().getRightCenter().x;
            break;
        case "middle":
            x = geom.getBoundary().getCentroid().x;
            break;
        default:
            x = geom.getBoundary().getCentroid().x;
            break;
    }

    // Text Vertical Align
    switch (_style["vertical-align"]) {
        case "top":
            y = OG.Util.round(geom.getBoundary().getUpperCenter().y + bBox.height / 2);
            break;
        case "bottom":
            y = OG.Util.round(geom.getBoundary().getLowerCenter().y - bBox.height / 2);
            break;
        case "middle":
            y = geom.getBoundary().getCentroid().y;
            break;
        default:
            y = geom.getBoundary().getCentroid().y;
            break;
    }

    // text align 적용
    element.attr({x: x, y: y});

    // font-color, font-size 적용
    element.attr({
        stroke: "none",
        fill: _style["font-color"] || me._CONFIG.DEFAULT_STYLE.LABEL["font-color"],
        "font-size": _style["font-size"] || me._CONFIG.DEFAULT_STYLE.LABEL["font-size"]
    });

    // angle 적용
    if (angle) {
        element.rotate(angle);
    }

    // Add to group
    this._add(element);
    group.node.appendChild(element.node);
    group.node.text = text;
    group.node.angle = angle;
    group.node.geom = geom;
    group.attr(me._CONFIG.DEFAULT_STYLE.SHAPE);

    if (group.node.shape) {
        group.node.shape.text = text;
        group.node.shape.angle = angle;
        group.node.shape.geom = geom;

        if (group.node.text) {
            if (OG.Util.isIE7()) {
                group.node.removeAttribute("text");
            } else {
                delete group.node.text;
            }
        }
        if (group.node.angle) {
            if (OG.Util.isIE7()) {
                group.node.removeAttribute("angle");
            } else {
                delete group.node.angle;
            }
        }
        if (group.node.geom) {
            if (OG.Util.isIE7()) {
                group.node.removeAttribute("geom");
            } else {
                delete group.node.geom;
            }
        }
    }

    return group.node;
};

/**
 * 임베드 HTML String 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
 *
 * @param {Number[]} position 드로잉할 위치 좌표(중앙 기준)
 * @param {String} html 임베드 HTML String
 * @param {Number[]} size Image Width, Height, Angle
 * @param {OG.geometry.Style,Object} style 스타일
 * @param {String} id Element ID 지정
 * @return {Element} DOM Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.drawHtml = function (position, html, size, style, id) {
    var me = this, width = size ? size[0] : null,
        height = size ? size[1] : null,
        angle = size ? size[2] || 0 : 0,
        group, element, _style = {}, bBox, geom, left, top;
    OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {}, me._CONFIG.DEFAULT_STYLE.HTML);

    // ID 지정된 경우 존재하면 하위 노드 제거
    if (id === 0 || id) {
        group = this._getREleById(id);
        if (group) {
            this._removeChild(group);
        } else {
            group = this._PAPER.group();
            this._add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.HTML);
            this._ROOT_GROUP.node.appendChild(group.node);
        }
    } else {
        group = this._PAPER.group();
        this._add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.HTML);
        this._ROOT_GROUP.node.appendChild(group.node);
    }

    // Draw foreign object
    element = this._PAPER.foreignObject(html, position[0], position[1], width, height);
    element.attr(_style);

    // real size
    bBox = element.getBBox();

    // calculate width, height, left, top
    width = width || bBox.width;
    height = height || bBox.height;
    left = OG.Util.round(position[0] - width / 2);
    top = OG.Util.round(position[1] - height / 2);

    // text align 적용
    element.attr({x: left, y: top});

    geom = new OG.Rectangle([left, top], width, height);
    if (angle) {
        element.rotate(angle);
    }
    geom.style.map = _style;

    // Add to group
    this._add(element);
    group.node.appendChild(element.node);
    group.node.html = html;
    group.node.angle = angle;
    group.node.geom = geom;
    group.attr(me._CONFIG.DEFAULT_STYLE.SHAPE);

    if (group.node.shape) {
        group.node.shape.html = html;
        group.node.shape.angle = angle;
        group.node.shape.geom = geom;

        if (group.node.html) {
            if (OG.Util.isIE7()) {
                group.node.removeAttribute("html");
            } else {
                delete group.node.html;
            }
        }
        if (group.node.angle) {
            if (OG.Util.isIE7()) {
                group.node.removeAttribute("angle");
            } else {
                delete group.node.angle;
            }
        }
        if (group.node.geom) {
            if (OG.Util.isIE7()) {
                group.node.removeAttribute("geom");
            } else {
                delete group.node.geom;
            }
        }
    }

    return group.node;
};

/**
 * Image 를 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
 *
 * @param {Number[]} position 드로잉할 위치 좌표(중앙 기준)
 * @param {String} imgSrc 이미지경로
 * @param {Number[]} size Image Width, Height, Angle
 * @param {OG.geometry.Style,Object} style 스타일
 * @param {String} id Element ID 지정
 * @return {Element} DOM Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.drawImage = function (position, imgSrc, size, style, id) {
    var me = this, width = size ? size[0] : null,
        height = size ? size[1] : null,
        angle = size ? size[2] || 0 : 0,
        group, element, _style = {}, bBox, geom, left, top;
    OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {}, me._CONFIG.DEFAULT_STYLE.IMAGE);

    // ID 지정된 경우 존재하면 하위 노드 제거
    if (id === 0 || id) {
        group = this._getREleById(id);
        if (group) {
            this._removeChild(group);
        } else {
            group = this._PAPER.group();
            this._add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.IMAGE);
            this._ROOT_GROUP.node.appendChild(group.node);
        }
    } else {
        group = this._PAPER.group();
        this._add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.IMAGE);
        this._ROOT_GROUP.node.appendChild(group.node);
    }

    // Draw image
    element = this._PAPER.image(imgSrc, position[0], position[1], width, height);
    element.attr(_style);

    // real size
    bBox = element.getBBox();

    // calculate width, height, left, top
    width = width || bBox.width;
    height = height || bBox.height;
    left = OG.Util.round(position[0] - width / 2);
    top = OG.Util.round(position[1] - height / 2);

    // text align 적용
    element.attr({x: left, y: top});

    geom = new OG.Rectangle([left, top], width, height);
    if (angle) {
        element.rotate(angle);
    }
    geom.style.map = _style;

    // Add to group
    this._add(element);
    group.node.appendChild(element.node);
    group.node.image = imgSrc;
    group.node.angle = angle;
    group.node.geom = geom;
    group.attr(me._CONFIG.DEFAULT_STYLE.SHAPE);

    if (group.node.shape) {
        group.node.shape.image = imgSrc;
        group.node.shape.angle = angle;
        group.node.shape.geom = geom;

        if (group.node.image) {
            if (OG.Util.isIE7()) {
                group.node.removeAttribute("image");
            } else {
                delete group.node.image;
            }
        }
        if (group.node.angle) {
            if (OG.Util.isIE7()) {
                group.node.removeAttribute("angle");
            } else {
                delete group.node.angle;
            }
        }
        if (group.node.geom) {
            if (OG.Util.isIE7()) {
                group.node.removeAttribute("geom");
            } else {
                delete group.node.geom;
            }
        }
    }

    return group.node;
};

/**
 * 라인을 캔버스에 드로잉한다.
 * OG.geometry.Line 타입인 경우 EdgeType 에 따라 Path 를 자동으로 계산하며,
 * OG.geometry.PolyLine 인 경우는 주어진 Path 그대로 drawing 한다.
 *
 * @param {OG.geometry.Line,OG.geometry.PolyLine} line 또는 polyLine
 * @param {OG.geometry.Style,Object} style 스타일
 * @param {String} id Element ID 지정
 * @param {Boolean} isSelf 셀프 연결 여부
 * @return {Element} Group DOM Element with geometry
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.drawEdge = function (line, style, id, isSelf) {
    var me = this, group, _style = {},
        vertices = line.getVertices(),
        from = vertices[0], to = vertices[vertices.length - 1],
        points = [], edge, edge_direction,
        getArrayOfOrthogonal_1 = function (from, to, isHorizontal) {
            if (isHorizontal) {
                return [
                    [from[0], from[1]],
                    [to[0], from[1]],
                    [to[0], to[1]]
                ];
            } else {
                return [
                    [from[0], from[1]],
                    [from[0], to[1]],
                    [to[0], to[1]]
                ];
            }
        },
        getArrayOfOrthogonal_2 = function (from, to, isHorizontal) {
            if (isHorizontal) {
                return [
                    [from[0], from[1]],
                    [OG.Util.round((from[0] + to[0]) / 2), from[1]],
                    [OG.Util.round((from[0] + to[0]) / 2), to[1]],
                    [to[0], to[1]]
                ];
            } else {
                return [
                    [from[0], from[1]],
                    [from[0], OG.Util.round((from[1] + to[1]) / 2)],
                    [to[0], OG.Util.round((from[1] + to[1]) / 2)],
                    [to[0], to[1]]
                ];
            }
        };

    OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {},
        OG.Util.apply({}, line.style.map, me._CONFIG.DEFAULT_STYLE.EDGE));

    // ID 지정된 경우 존재하면 하위 노드 제거
    if (id === 0 || id) {
        group = this._getREleById(id);
        if (group) {
            this._removeChild(group);
        } else {
            group = this._PAPER.group();
            this._add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.EDGE);
            this._ROOT_GROUP.node.appendChild(group.node);
        }
    } else {
        group = this._PAPER.group();
        this._add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.EDGE);
        this._ROOT_GROUP.node.appendChild(group.node);
    }

    if (isSelf) {
        points = [
            [from.x, from.y - me._CONFIG.GUIDE_RECT_SIZE / 2],
            [from.x + me._CONFIG.GUIDE_RECT_SIZE * 2, from.y - me._CONFIG.GUIDE_RECT_SIZE],
            [from.x + me._CONFIG.GUIDE_RECT_SIZE * 2, from.y + me._CONFIG.GUIDE_RECT_SIZE],
            [from.x, from.y + me._CONFIG.GUIDE_RECT_SIZE / 2]
        ];
    } else if (line instanceof OG.geometry.Line) {
        // edgeType
        switch (_style["edge-type"].toLowerCase()) {
            case OG.Constants.EDGE_TYPE.STRAIGHT:
                points = [from, to];
                break;
            case OG.Constants.EDGE_TYPE.PLAIN:
                edge_direction = _style["edge-direction"].toLowerCase().split(" ");

                // 'c' 인 경우 위치 보정
                if (edge_direction[0] === "c" || edge_direction[1] === "c") {
                    edge_direction = this._adjustEdgeDirection(edge_direction[0], edge_direction[1], [from.x, from.y], [to.x, to.y]).split(" ");
                }

                if (edge_direction[0] === "e") {
                    switch (edge_direction[1]) {
                        case "e":
                            if (from.x <= to.x) {
                                points = getArrayOfOrthogonal_1(
                                    [from.x, from.y],
                                    [to.x + me._CONFIG.EDGE_PADDING, to.y],
                                    true
                                );
                                points.push([to.x, to.y]);
                            } else {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_1(
                                    [from.x + me._CONFIG.EDGE_PADDING, from.y],
                                    [to.x, to.y],
                                    false
                                ));
                            }
                            break;
                        case "w":
                            if (from.x <= to.x) {
                                points = getArrayOfOrthogonal_2(
                                    [from.x, from.y],
                                    [to.x, to.y],
                                    true
                                );
                            } else {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_2(
                                    [from.x + me._CONFIG.EDGE_PADDING, from.y],
                                    [to.x - me._CONFIG.EDGE_PADDING, to.y],
                                    false
                                ));
                                points.push([to.x, to.y]);
                            }
                            break;
                        case "s":
                            if (from.x <= to.x && from.y <= to.y) {
                                points = getArrayOfOrthogonal_2(
                                    [from.x, from.y],
                                    [to.x, to.y + me._CONFIG.EDGE_PADDING],
                                    true
                                );
                                points.push([to.x, to.y]);
                            } else if (from.x <= to.x && from.y > to.y) {
                                points = getArrayOfOrthogonal_1(
                                    [from.x, from.y],
                                    [to.x, to.y],
                                    true
                                );
                            } else if (from.x > to.x && from.y <= to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_1(
                                    [from.x + me._CONFIG.EDGE_PADDING, from.y],
                                    [to.x, to.y + me._CONFIG.EDGE_PADDING],
                                    false
                                ));
                                points.push([to.x, to.y]);
                            } else if (from.x > to.x && from.y > to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_2(
                                    [from.x + me._CONFIG.EDGE_PADDING, from.y],
                                    [to.x, to.y],
                                    false
                                ));
                            }
                            break;
                        case "n":
                            if (from.x <= to.x && from.y <= to.y) {
                                points = getArrayOfOrthogonal_1(
                                    [from.x, from.y],
                                    [to.x, to.y],
                                    true
                                );
                            } else if (from.x <= to.x && from.y > to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_1(
                                    [from.x + me._CONFIG.EDGE_PADDING, from.y],
                                    [to.x, to.y - me._CONFIG.EDGE_PADDING],
                                    false
                                ));
                                points.push([to.x, to.y]);
                            } else if (from.x > to.x && from.y <= to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_2(
                                    [from.x + me._CONFIG.EDGE_PADDING, from.y],
                                    [to.x, to.y],
                                    false
                                ));
                            } else if (from.x > to.x && from.y > to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_1(
                                    [from.x + me._CONFIG.EDGE_PADDING, from.y],
                                    [to.x, to.y - me._CONFIG.EDGE_PADDING],
                                    false
                                ));
                                points.push([to.x, to.y]);
                            }
                            break;
                    }
                } else if (edge_direction[0] === "w") {
                    switch (edge_direction[1]) {
                        case "e":
                            if (from.x <= to.x) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_2(
                                    [from.x - me._CONFIG.EDGE_PADDING, from.y],
                                    [to.x + me._CONFIG.EDGE_PADDING, to.y],
                                    false
                                ));
                                points.push([to.x, to.y]);
                            } else {
                                points = getArrayOfOrthogonal_2(
                                    [from.x, from.y],
                                    [to.x, to.y],
                                    true
                                );
                            }
                            break;
                        case "w":
                            if (from.x <= to.x) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_1(
                                    [from.x - me._CONFIG.EDGE_PADDING, from.y],
                                    [to.x, to.y],
                                    false
                                ));

                            } else {
                                points = getArrayOfOrthogonal_1(
                                    [from.x, from.y],
                                    [to.x - me._CONFIG.EDGE_PADDING, to.y],
                                    true
                                );
                                points.push([to.x, to.y]);
                            }
                            break;
                        case "s":
                            if (from.x <= to.x && from.y <= to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_1(
                                    [from.x - me._CONFIG.EDGE_PADDING, from.y],
                                    [to.x, to.y + me._CONFIG.EDGE_PADDING],
                                    false
                                ));
                                points.push([to.x, to.y]);
                            } else if (from.x <= to.x && from.y > to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_2(
                                    [from.x - me._CONFIG.EDGE_PADDING, from.y],
                                    [to.x, to.y],
                                    false
                                ));
                            } else if (from.x > to.x && from.y <= to.y) {
                                points = getArrayOfOrthogonal_2(
                                    [from.x, from.y],
                                    [to.x, to.y + me._CONFIG.EDGE_PADDING],
                                    true
                                );
                                points.push([to.x, to.y]);
                            } else if (from.x > to.x && from.y > to.y) {
                                points = getArrayOfOrthogonal_1(
                                    [from.x, from.y],
                                    [to.x, to.y],
                                    true
                                );
                            }
                            break;
                        case "n":
                            if (from.x <= to.x && from.y <= to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_2(
                                    [from.x - me._CONFIG.EDGE_PADDING, from.y],
                                    [to.x, to.y],
                                    false
                                ));
                            } else if (from.x <= to.x && from.y > to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_1(
                                    [from.x - me._CONFIG.EDGE_PADDING, from.y],
                                    [to.x, to.y - me._CONFIG.EDGE_PADDING],
                                    false
                                ));
                                points.push([to.x, to.y]);
                            } else if (from.x > to.x && from.y <= to.y) {
                                points = points.concat(getArrayOfOrthogonal_1(
                                    [from.x, from.y],
                                    [to.x, to.y],
                                    true
                                ));
                            } else if (from.x > to.x && from.y > to.y) {
                                points = getArrayOfOrthogonal_2(
                                    [from.x, from.y],
                                    [to.x, to.y - me._CONFIG.EDGE_PADDING],
                                    true
                                );
                                points.push([to.x, to.y]);
                            }
                            break;
                    }
                } else if (edge_direction[0] === "s") {
                    switch (edge_direction[1]) {
                        case "e":
                            if (from.x <= to.x && from.y <= to.y) {
                                points = getArrayOfOrthogonal_2(
                                    [from.x, from.y],
                                    [to.x + me._CONFIG.EDGE_PADDING, to.y],
                                    false
                                );
                                points.push([to.x, to.y]);
                            } else if (from.x <= to.x && from.y > to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_1(
                                    [from.x, from.y + me._CONFIG.EDGE_PADDING],
                                    [to.x + me._CONFIG.EDGE_PADDING, to.y],
                                    true
                                ));
                                points.push([to.x, to.y]);
                            } else if (from.x > to.x && from.y <= to.y) {
                                points = getArrayOfOrthogonal_1(
                                    [from.x, from.y],
                                    [to.x, to.y],
                                    false
                                );
                            } else if (from.x > to.x && from.y > to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_2(
                                    [from.x, from.y + me._CONFIG.EDGE_PADDING],
                                    [to.x, to.y],
                                    true
                                ));
                            }
                            break;
                        case "w":
                            if (from.x <= to.x && from.y <= to.y) {
                                points = getArrayOfOrthogonal_1(
                                    [from.x, from.y],
                                    [to.x, to.y],
                                    false
                                );
                            } else if (from.x <= to.x && from.y > to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_2(
                                    [from.x, from.y + me._CONFIG.EDGE_PADDING],
                                    [to.x, to.y],
                                    true
                                ));
                            } else if (from.x > to.x && from.y <= to.y) {
                                points = getArrayOfOrthogonal_2(
                                    [from.x, from.y],
                                    [to.x - me._CONFIG.EDGE_PADDING, to.y],
                                    false
                                );
                                points.push([to.x, to.y]);
                            } else if (from.x > to.x && from.y > to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_1(
                                    [from.x, from.y + me._CONFIG.EDGE_PADDING],
                                    [to.x - me._CONFIG.EDGE_PADDING, to.y],
                                    true
                                ));
                                points.push([to.x, to.y]);
                            }
                            break;
                        case "s":
                            if (from.y <= to.y) {
                                points = getArrayOfOrthogonal_1(
                                    [from.x, from.y],
                                    [to.x, to.y + me._CONFIG.EDGE_PADDING],
                                    false
                                );
                                points.push([to.x, to.y]);
                            } else {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_1(
                                    [from.x, from.y + me._CONFIG.EDGE_PADDING],
                                    [to.x, to.y],
                                    true
                                ));
                            }
                            break;
                        case "n":
                            if (from.y <= to.y) {
                                points = getArrayOfOrthogonal_2(
                                    [from.x, from.y],
                                    [to.x, to.y],
                                    false
                                );
                            } else {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_2(
                                    [from.x, from.y + me._CONFIG.EDGE_PADDING],
                                    [to.x, to.y - me._CONFIG.EDGE_PADDING],
                                    true
                                ));
                                points.push([to.x, to.y]);
                            }
                            break;
                    }
                } else if (edge_direction[0] === "n") {
                    switch (edge_direction[1]) {
                        case "e":
                            if (from.x <= to.x && from.y <= to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_1(
                                    [from.x, from.y - me._CONFIG.EDGE_PADDING],
                                    [to.x + me._CONFIG.EDGE_PADDING, to.y],
                                    true
                                ));
                                points.push([to.x, to.y]);
                            } else if (from.x <= to.x && from.y > to.y) {
                                points = getArrayOfOrthogonal_2(
                                    [from.x, from.y],
                                    [to.x + me._CONFIG.EDGE_PADDING, to.y],
                                    false
                                );
                                points.push([to.x, to.y]);
                            } else if (from.x > to.x && from.y <= to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_2(
                                    [from.x, from.y - me._CONFIG.EDGE_PADDING],
                                    [to.x, to.y],
                                    true
                                ));
                            } else if (from.x > to.x && from.y > to.y) {
                                points = getArrayOfOrthogonal_1(
                                    [from.x, from.y],
                                    [to.x, to.y],
                                    false
                                );
                            }
                            break;
                        case "w":
                            if (from.x <= to.x && from.y <= to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_2(
                                    [from.x, from.y - me._CONFIG.EDGE_PADDING],
                                    [to.x, to.y],
                                    true
                                ));
                            } else if (from.x <= to.x && from.y > to.y) {
                                points = getArrayOfOrthogonal_1(
                                    [from.x, from.y],
                                    [to.x, to.y],
                                    false
                                );
                            } else if (from.x > to.x && from.y <= to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_1(
                                    [from.x, from.y - me._CONFIG.EDGE_PADDING],
                                    [to.x - me._CONFIG.EDGE_PADDING, to.y],
                                    true
                                ));
                                points.push([to.x, to.y]);
                            } else if (from.x > to.x && from.y > to.y) {
                                points = getArrayOfOrthogonal_2(
                                    [from.x, from.y],
                                    [to.x - me._CONFIG.EDGE_PADDING, to.y],
                                    false
                                );
                                points.push([to.x, to.y]);
                            }
                            break;
                        case "s":
                            if (from.y <= to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_2(
                                    [from.x, from.y - me._CONFIG.EDGE_PADDING],
                                    [to.x, to.y + me._CONFIG.EDGE_PADDING],
                                    true
                                ));
                                points.push([to.x, to.y]);
                            } else {
                                points = getArrayOfOrthogonal_2(
                                    [from.x, from.y],
                                    [to.x, to.y],
                                    false
                                );
                            }
                            break;
                        case "n":
                            if (from.y <= to.y) {
                                points = [
                                    [from.x, from.y]
                                ];
                                points = points.concat(getArrayOfOrthogonal_1(
                                    [from.x, from.y - me._CONFIG.EDGE_PADDING],
                                    [to.x, to.y],
                                    true
                                ));
                            } else {
                                points = getArrayOfOrthogonal_1(
                                    [from.x, from.y],
                                    [to.x, to.y - me._CONFIG.EDGE_PADDING],
                                    false
                                );
                                points.push([to.x, to.y]);
                            }
                            break;
                    }
                }
                break;
            case OG.Constants.EDGE_TYPE.BEZIER:
                edge_direction = _style["edge-direction"].toLowerCase().split(" ");

                // 'c' 인 경우 위치 보정
                if (edge_direction[0] === "c" || edge_direction[1] === "c") {
                    edge_direction = this._adjustEdgeDirection(edge_direction[0], edge_direction[1], [from.x, from.y], [to.x, to.y]).split(" ");
                }

                points = this._bezierCurve([from.x, from.y], [to.x, to.y], edge_direction[0], edge_direction[1]);
                break;
        }
    } else if (line instanceof OG.geometry.Curve) {
        points = line.getControlPoints();
    } else if (line instanceof OG.geometry.BezierCurve) {
        points = line.getControlPoints();
    } else {
        points = vertices;
    }

    // Draw geometry
    if (isSelf) {
        edge = new OG.Curve(points);
    } else if (line instanceof OG.geometry.Curve) {
        edge = new OG.Curve(points);
    } else if (line instanceof OG.geometry.BezierCurve) {
        edge = new OG.BezierCurve(points);
    } else {
        if (_style["edge-type"].toLowerCase() === OG.Constants.EDGE_TYPE.BEZIER) {
            edge = new OG.BezierCurve(points);
        } else {
            edge = new OG.PolyLine(points);
        }
    }

    // draw hidden edge
    this._drawGeometry(group.node, edge, me._CONFIG.DEFAULT_STYLE.EDGE_HIDDEN);

    // draw Edge
    this._drawGeometry(group.node, edge, _style);
    group.node.geom = edge;
    group.attr(me._CONFIG.DEFAULT_STYLE.SHAPE);

    if (group.node.shape) {
        group.node.shape.geom = edge;

        if (group.node.geom) {
            if (OG.Util.isIE7()) {
                group.node.removeAttribute("geom");
            } else {
                delete group.node.geom;
            }
        }
    }

    return group.node;
};

/**
 * 그룹 Geometry 를 캔버스에 드로잉한다.
 *
 * @param {OG.geometry.Geometry} geometry 기하 객체
 * @param {OG.geometry.Style,Object} style 스타일
 * @return {Element} Group DOM Element with geometry
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.drawGroup = function (geometry, style, id) {
    var me = this, group, geomElement, _style = {}, childNodes, i, boundary, titleLine, _tempStyle = {};

    OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {});

    // ID 지정된 경우 존재하면 하위 노드 제거, 하위에 Shape 은 삭제하지 않도록
    if (id === 0 || id) {
        group = this._getREleById(id);
        if (group) {
            childNodes = group.node.childNodes;
            for (i = childNodes.length - 1; i >= 0; i--) {
                if ($(childNodes[i]).attr("_type") !== OG.Constants.NODE_TYPE.SHAPE) {
                    this._remove(this._getREleById(childNodes[i].id));
                }
            }
        } else {
            group = this._PAPER.group();
            this._add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.GROUP);
            this._ROOT_GROUP.node.appendChild(group.node);
        }
    } else {
        group = this._PAPER.group();
        this._add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.GROUP);
        this._ROOT_GROUP.node.appendChild(group.node);
    }

    // Draw geometry
    geomElement = this._drawGeometry(group.node, geometry, _style);
    group.node.geom = geometry;
    group.attr(me._CONFIG.DEFAULT_STYLE.SHAPE);

    // 타이틀 라인 Drawing
    OG.Util.apply(_tempStyle, geometry.style.map, _style);
    if (_tempStyle['label-direction'] && _tempStyle['vertical-align'] === 'top') {
        boundary = geometry.getBoundary();
        if (_tempStyle['label-direction'] === 'vertical') {
            titleLine = new OG.geometry.Line(
                [boundary.getUpperLeft().x + 20, boundary.getUpperLeft().y],
                [boundary.getLowerLeft().x + 20, boundary.getLowerLeft().y]
            );
        } else {
            titleLine = new OG.geometry.Line(
                [boundary.getUpperLeft().x, boundary.getUpperLeft().y + 20],
                [boundary.getUpperRight().x, boundary.getUpperRight().y + 20]
            );
        }
        this._drawGeometry(group.node, titleLine, _style);
    }

    // 위치조정
    if (geomElement.id !== group.node.firstChild.id) {
        group.node.insertBefore(geomElement, group.node.firstChild);
    }

    if (group.node.shape) {
        if (!group.node.shape.isCollapsed || group.node.shape.isCollapsed === false) {
            group.node.shape.geom = geometry;
        }

        if (group.node.geom) {
            if (OG.Util.isIE7()) {
                group.node.removeAttribute("geom");
            } else {
                delete group.node.geom;
            }
        }
    }

    return group.node;
};

/**
 * Shape 의 Label 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
 *
 * @param {Element,String} shapeElement Shape DOM element or ID
 * @param {String} text 텍스트
 * @param {OG.geometry.Style,Object} style 스타일
 * @return {Element} DOM Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.drawLabel = function (shapeElement, text, style) {
    var rElement = this._getREleById(OG.Util.isElement(shapeElement) ? shapeElement.id : shapeElement),
        element, labelElement, envelope, _style = {}, position, size, beforeText, beforeEvent,
        /**
         * 라인(꺽은선)의 중심위치를 반환한다.
         *
         * @param {Element} element Edge 엘리먼트
         * @return {OG.Coordinate}
         */
            getCenterOfEdge = function (element) {
            var vertices, from, to, lineLength, distance = 0, i, intersectArray;

            if (element.shape.geom.style.get("edge-type") === OG.Constants.EDGE_TYPE.BEZIER) {
                vertices = element.shape.geom.getControlPoints();
                from = vertices[0];
                to = vertices[vertices.length - 1];
                return new OG.geometry.Coordinate(OG.Util.round((from.x + to.x) / 2), OG.Util.round((from.y + to.y) / 2));
            } else {
                // Edge Shape 인 경우 라인의 중간 지점 찾기
                vertices = element.shape.geom.getVertices();
                lineLength = element.shape.geom.getLength();

                for (i = 0; i < vertices.length - 1; i++) {
                    distance += vertices[i].distance(vertices[i + 1]);
                    if (distance > lineLength / 2) {
                        intersectArray = element.shape.geom.intersectCircleToLine(
                            vertices[i + 1], distance - lineLength / 2, vertices[i + 1], vertices[i]
                        );

                        break;
                    }
                }

                return intersectArray[0];
            }
        },
        centerOfEdge;

    OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {});

    if (rElement && rElement.node.shape) {
        text = OG.Util.trim(text);
        element = rElement.node;
        envelope = element.shape.geom.getBoundary();
        beforeText = element.shape.label;

        // beforeLabelChange event fire
        if (text !== undefined && text !== beforeText) {
            beforeEvent = jQuery.Event("beforeLabelChange", {element: element, afterText: text, beforeText: beforeText});
            $(this._PAPER.canvas).trigger(beforeEvent);
            if (beforeEvent.isPropagationStopped()) {
                return false;
            }
            text = beforeEvent.afterText;
        }

        OG.Util.apply(element.shape.geom.style.map, _style);
        element.shape.label = text === undefined ? element.shape.label : text;

        if (element.shape.label !== undefined) {
            if (element.shape instanceof OG.shape.EdgeShape) {
                centerOfEdge = getCenterOfEdge(element);
                position = [centerOfEdge.x, centerOfEdge.y];
                size = [0, 0];
            } else {
                // label-position 에 따라 위치 조정
                switch (element.shape.geom.style.get("label-position")) {
                    case "left":
                        position = [envelope.getCentroid().x - envelope.getWidth(), envelope.getCentroid().y];
                        break;
                    case "right":
                        position = [envelope.getCentroid().x + envelope.getWidth(), envelope.getCentroid().y];
                        break;
                    case "top":
                        position = [envelope.getCentroid().x, envelope.getCentroid().y - envelope.getHeight()];
                        break;
                    case "bottom":
                        position = [envelope.getCentroid().x, envelope.getCentroid().y + envelope.getHeight()];
                        break;
                    default:
                        position = [envelope.getCentroid().x, envelope.getCentroid().y];
                        break;
                }
                size = [envelope.getWidth(), envelope.getHeight()];
            }

            labelElement = this._drawLabel(
                position,
                element.shape.label,
                size,
                element.shape.geom.style,
                element.id + OG.Constants.LABEL_SUFFIX,
                element.shape instanceof OG.shape.EdgeShape
            );
            element.appendChild(labelElement);

            // drawLabel event fire
            if (text !== undefined) {
                $(this._PAPER.canvas).trigger('drawLabel', [element, text]);
            }

            if (text !== undefined && text !== beforeText) {
                // labelChanged event fire
                $(this._PAPER.canvas).trigger('labelChanged', [element, text, beforeText]);
            }
        }
    }

    return labelElement;
};

/**
 * Edge 의 from, to Label 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
 *
 * @param {Element,String} shapeElement Shape DOM element or ID
 * @param {String} text 텍스트
 * @param {String} type 유형(FROM or TO)
 * @return {Element} DOM Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.drawEdgeLabel = function (shapeElement, text, type) {
    var me = this, rElement = this._getREleById(OG.Util.isElement(shapeElement) ? shapeElement.id : shapeElement),
        element, vertices, labelElement, position, edgeLabel, suffix;

    if (rElement && rElement.node.shape) {
        text = OG.Util.trim(text);
        element = rElement.node;

        if (element.shape instanceof OG.shape.EdgeShape) {
            vertices = element.shape.geom.getVertices();
            if (type === 'FROM') {
                position = [vertices[0].x, vertices[0].y + me._CONFIG.FROMTO_LABEL_OFFSET_TOP];
                element.shape.fromLabel = text || element.shape.fromLabel;
                edgeLabel = element.shape.fromLabel;
                suffix = OG.Constants.FROM_LABEL_SUFFIX;
            } else {
                position = [vertices[vertices.length - 1].x, vertices[vertices.length - 1].y + me._CONFIG.FROMTO_LABEL_OFFSET_TOP];
                element.shape.toLabel = text || element.shape.toLabel;
                edgeLabel = element.shape.toLabel;
                suffix = OG.Constants.TO_LABEL_SUFFIX;
            }

            if (edgeLabel) {
                labelElement = this._drawLabel(
                    position,
                    edgeLabel,
                    [0, 0],
                    element.shape.geom.style,
                    element.id + suffix,
                    false
                );
                element.appendChild(labelElement);
            }
        }
    }

    return labelElement;
};

/**
 * Element 에 저장된 geom, angle, image, text 정보로 shape 을 redraw 한다.
 *
 * @param {Element} element Shape 엘리먼트
 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.redrawShape = function (element, excludeEdgeId) {
    var me = this, envelope, center, width, height, upperLeft,
        redrawChildConnectedEdge;

    redrawChildConnectedEdge = function (_collapseRootElement, _element) {
        var edgeIdArray, fromEdge, toEdge, _childNodes = _element.childNodes, otherShape, i, j, isNeedToRedraw;
        for (i = _childNodes.length - 1; i >= 0; i--) {
            if ($(_childNodes[i]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
                redrawChildConnectedEdge(_collapseRootElement, _childNodes[i]);

                isNeedToRedraw = false;
                edgeIdArray = $(_childNodes[i]).attr("_fromedge");
                if (edgeIdArray) {
                    edgeIdArray = edgeIdArray.split(",");
                    for (j = 0; j < edgeIdArray.length; j++) {
                        fromEdge = me.getElementById(edgeIdArray[j]);
                        if (fromEdge) {
                            otherShape = me._getShapeFromTerminal($(fromEdge).attr("_from"));

                            // otherShape 이 같은 collapse 범위내에 있는지 체크
                            if ($(otherShape).parents("#" + _collapseRootElement.id).length === 0) {
                                isNeedToRedraw = true;
                            }
                        }
                    }
                }

                edgeIdArray = $(_childNodes[i]).attr("_toedge");
                if (edgeIdArray) {
                    edgeIdArray = edgeIdArray.split(",");
                    for (j = 0; j < edgeIdArray.length; j++) {
                        toEdge = me.getElementById(edgeIdArray[j]);
                        if (toEdge) {
                            otherShape = me._getShapeFromTerminal($(toEdge).attr("_to"));

                            // otherShape 이 같은 collapse 범위내에 있는지 체크
                            if ($(otherShape).parents("#" + _collapseRootElement.id).length === 0) {
                                isNeedToRedraw = true;
                            }
                        }
                    }
                }

                // group 영역 밖의 연결된 otherShape 이 있는 경우 redrawConnectedEdge
                if (isNeedToRedraw === true) {
                    me.redrawConnectedEdge(_childNodes[i]);
                }
            }
        }
    };

    if (element && element.shape.geom) {
        switch ($(element).attr("_shape")) {
            case OG.Constants.SHAPE_TYPE.GEOM:
                element = this.drawGeom(element.shape.geom, {}, element.id);
                this.redrawConnectedEdge(element, excludeEdgeId);
                this.drawLabel(element);
                break;
            case OG.Constants.SHAPE_TYPE.TEXT:
                envelope = element.shape.geom.getBoundary();
                center = envelope.getCentroid();
                width = envelope.getWidth();
                height = envelope.getHeight();
                element = this.drawText([center.x, center.y], element.shape.text,
                    [width, height, element.shape.angle], element.shape.geom.style, element.id);
                this.redrawConnectedEdge(element, excludeEdgeId);
                break;
            case OG.Constants.SHAPE_TYPE.IMAGE:
                envelope = element.shape.geom.getBoundary();
                center = envelope.getCentroid();
                width = envelope.getWidth();
                height = envelope.getHeight();
                element = this.drawImage([center.x, center.y], element.shape.image,
                    [width, height, element.shape.angle], element.shape.geom.style, element.id);
                this.redrawConnectedEdge(element, excludeEdgeId);
                this.drawLabel(element);
                break;
            case OG.Constants.SHAPE_TYPE.HTML:
                envelope = element.shape.geom.getBoundary();
                center = envelope.getCentroid();
                width = envelope.getWidth();
                height = envelope.getHeight();
                element = this.drawHtml([center.x, center.y], element.shape.html,
                    [width, height, element.shape.angle], element.shape.geom.style, element.id);
                this.redrawConnectedEdge(element, excludeEdgeId);
                this.drawLabel(element);
                break;
            case OG.Constants.SHAPE_TYPE.EDGE:
                element = this.drawEdge(element.shape.geom, element.shape.geom.style, element.id);
                this.drawLabel(element);
                this.drawEdgeLabel(element, null, 'FROM');
                this.drawEdgeLabel(element, null, 'TO');
                break;
            case OG.Constants.SHAPE_TYPE.GROUP:
                if (element.shape.isCollapsed === true) {
                    envelope = element.shape.geom.getBoundary();
                    upperLeft = envelope.getUpperLeft();
                    element = this.drawGroup(new OG.geometry.Rectangle(
                        upperLeft, me._CONFIG.COLLAPSE_SIZE * 3, me._CONFIG.COLLAPSE_SIZE * 2),
                        element.shape.geom.style, element.id);
                    redrawChildConnectedEdge(element, element);
                    this.redrawConnectedEdge(element, excludeEdgeId);
                } else {
                    element = this.drawGroup(element.shape.geom, element.shape.geom.style, element.id);
                    this.redrawConnectedEdge(element, excludeEdgeId);
                    this.drawLabel(element);
                }
                break;
        }
    }

    // redrawShape event fire
    $(this._PAPER.canvas).trigger('redrawShape', [element]);

    return element;
};

/**
 * Edge Element 에 저장된 geom, style 정보로 Edge 를 redraw 한다.
 * Edge 타입(straight, plain) 에 따른 경로를 새로 계산한다.
 *
 * @param {Element,String} edgeElement Element 또는 ID
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.redrawEdge = function (edgeElement) {
    var me = this, edge, fromTerminalId, toTerminalId, fromShape, toShape, fromTerminalNum, toTerminalNum,
        fromTerminal, toTerminal, vertices, fromDrct, toDrct, fromXY, toXY,
        orgFromXY, orgToXY, orgFromDrct, orgToDrct, intersectionInfo, isSelf,
        collapsedParents, collapsedEnvelope, collapsedUpperLeft, collapsedGeom, collapsedPosition;

    edge = OG.Util.isElement(edgeElement) ? edgeElement : this.getElementById(edgeElement);

    // ex) OG_3312_1_TERMINAL_E_INOUT_0
    fromTerminalId = $(edge).attr("_from");
    toTerminalId = $(edge).attr("_to");

    if (fromTerminalId) {
        fromShape = this._getShapeFromTerminal(fromTerminalId);
        fromTerminalNum = parseInt(fromTerminalId.substring(fromTerminalId.lastIndexOf("_") + 1), 10);
        fromTerminal = fromShape.shape.createTerminal()[fromTerminalNum];
        fromDrct = fromTerminal.direction.toLowerCase();
        fromXY = fromTerminal.position;
    } else {
        vertices = edge.shape.geom.getVertices();
        fromDrct = "c";
        fromXY = vertices[0];
    }

    if (toTerminalId) {
        toShape = this._getShapeFromTerminal(toTerminalId);
        toTerminalNum = parseInt(toTerminalId.substring(toTerminalId.lastIndexOf("_") + 1), 10);
        toTerminal = toShape.shape.createTerminal()[toTerminalNum];
        toDrct = toTerminal.direction.toLowerCase();
        toXY = toTerminal.position;
    } else {
        vertices = edge.shape.geom.getVertices();
        toDrct = "c";
        toXY = vertices[vertices.length - 1];
    }

    // backup edge-direction
    orgFromXY = fromXY;
    orgToXY = toXY;
    orgFromDrct = fromDrct;
    orgToDrct = toDrct;

    // direction 이 c 인 경우에 대한 처리(센터 연결)
    if (fromShape && fromDrct === "c") {
        intersectionInfo = this.intersectionEdge(
            edge.shape.geom.style.get("edge-type"), fromShape, [orgFromXY.x, orgFromXY.y], [orgToXY.x, orgToXY.y], true
        );
        fromXY = intersectionInfo.position;
        fromDrct = intersectionInfo.direction;
    }
    if (toShape && toDrct === "c") {
        intersectionInfo = this.intersectionEdge(
            edge.shape.geom.style.get("edge-type"), toShape, [orgFromXY.x, orgFromXY.y], [orgToXY.x, orgToXY.y], false
        );
        toXY = intersectionInfo.position;
        toDrct = intersectionInfo.direction;
    }

    isSelf = fromShape && toShape && fromShape.id === toShape.id;
    if (isSelf) {
        fromXY = toXY = fromShape.shape.geom.getBoundary().getRightCenter();
    } else {
        // fromShape 이 collapsed 인지 체크
        if (fromShape) {
            collapsedParents = $(fromShape).parents("[_collapsed=true]");
            if (collapsedParents.length !== 0 || $(fromShape).attr('_collapsed') === 'true') {
                // collapsed 인 경우
                if (collapsedParents.length === 0) {
                    collapsedEnvelope = fromShape.shape.geom.getBoundary();
                } else {
                    collapsedEnvelope = collapsedParents[collapsedParents.length - 1].shape.geom.getBoundary();
                }
                collapsedUpperLeft = collapsedEnvelope.getUpperLeft();
                collapsedGeom = new OG.geometry.Rectangle(
                    collapsedUpperLeft, me._CONFIG.COLLAPSE_SIZE * 3, me._CONFIG.COLLAPSE_SIZE * 2);

                switch (fromDrct.toUpperCase()) {
                    case OG.Constants.TERMINAL_TYPE.E:
                        collapsedPosition = collapsedGeom.getBoundary().getRightCenter();
                        break;
                    case OG.Constants.TERMINAL_TYPE.W:
                        collapsedPosition = collapsedGeom.getBoundary().getLeftCenter();
                        break;
                    case OG.Constants.TERMINAL_TYPE.S:
                        collapsedPosition = collapsedGeom.getBoundary().getLowerCenter();
                        break;
                    case OG.Constants.TERMINAL_TYPE.N:
                        collapsedPosition = collapsedGeom.getBoundary().getUpperCenter();
                        break;
                }
                if (collapsedPosition) {
                    fromXY = [collapsedPosition.x, collapsedPosition.y];
                }
            }
        }

        // toShape 이 collapsed 인지 체크
        if (toShape) {
            collapsedParents = $(toShape).parents("[_collapsed=true]");
            if (collapsedParents.length !== 0 || $(toShape).attr('_collapsed') === 'true') {
                // collapsed 인 경우
                if (collapsedParents.length === 0) {
                    collapsedEnvelope = toShape.shape.geom.getBoundary();
                } else {
                    collapsedEnvelope = collapsedParents[collapsedParents.length - 1].shape.geom.getBoundary();
                }
                collapsedUpperLeft = collapsedEnvelope.getUpperLeft();
                collapsedGeom = new OG.geometry.Rectangle(
                    collapsedUpperLeft, me._CONFIG.COLLAPSE_SIZE * 3, me._CONFIG.COLLAPSE_SIZE * 2);

                switch (toDrct.toUpperCase()) {
                    case OG.Constants.TERMINAL_TYPE.E:
                        collapsedPosition = collapsedGeom.getBoundary().getRightCenter();
                        break;
                    case OG.Constants.TERMINAL_TYPE.W:
                        collapsedPosition = collapsedGeom.getBoundary().getLeftCenter();
                        break;
                    case OG.Constants.TERMINAL_TYPE.S:
                        collapsedPosition = collapsedGeom.getBoundary().getLowerCenter();
                        break;
                    case OG.Constants.TERMINAL_TYPE.N:
                        collapsedPosition = collapsedGeom.getBoundary().getUpperCenter();
                        break;
                }
                if (collapsedPosition) {
                    toXY = [collapsedPosition.x, collapsedPosition.y];
                }
            }
        }
    }

    // redraw edge
    edge = this.drawEdge(new OG.Line(fromXY, toXY),
        OG.Util.apply(edge.shape.geom.style.map, {"edge-direction": fromDrct + " " + toDrct}), edge.id, isSelf);

    // Draw Label
    this.drawLabel(edge);
    this.drawEdgeLabel(edge, null, 'FROM');
    this.drawEdgeLabel(edge, null, 'TO');

    // restore edge-direction
    OG.Util.apply(edge.shape.geom.style.map, {"edge-direction": orgFromDrct + " " + orgToDrct});
};

/**
 * Shape 의 연결된 Edge 를 redraw 한다.(이동 또는 리사이즈시)
 *
 * @param {Element} element
 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.redrawConnectedEdge = function (element, excludeEdgeId) {
    var me = this, edgeId;

    edgeId = $(element).attr("_fromedge");
    if (edgeId) {
        $.each(edgeId.split(","), function (idx, item) {
            if (!excludeEdgeId || excludeEdgeId.toString().indexOf(item) < 0) {
                me.redrawEdge(item);
            }
        });
    }

    edgeId = $(element).attr("_toedge");
    if (edgeId) {
        $.each(edgeId.split(","), function (idx, item) {
            if (!excludeEdgeId || excludeEdgeId.toString().indexOf(item) < 0) {
                me.redrawEdge(item);
            }
        });
    }

    this.removeAllTerminal();
};

/**
 * 두개의 터미널을 연결하고, 속성정보에 추가한다.
 *
 * @param {Element,Number[]} from 시작점
 * @param {Element,Number[]} to 끝점
 * @param {Element} edge Edge Shape
 * @param {OG.geometry.Style,Object} style 스타일
 * @param {String} label Label
 * @return {Element} 연결된 Edge 엘리먼트
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.connect = function (from, to, edge, style, label) {
    var me = this, _style = {}, fromShape, toShape, intersectionInfo, fromXY, toXY,
        orgFromXY, orgToXY, fromDrct, toDrct, orgFromDrct, orgToDrct, isSelf, beforeEvent,
        addAttrValues = function (element, name, value) {
            var attrValue = $(element).attr(name),
                array = attrValue ? attrValue.split(",") : [],
                newArray = [];
            $.each(array, function (idx, item) {
                if (item !== value) {
                    newArray.push(item);
                }
            });
            newArray.push(value);

            $(element).attr(name, newArray.toString());
            return element;
        };

    OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {}, me._CONFIG.DEFAULT_STYLE.EDGE);

    // 연결 시작, 끝 Shape
    if (OG.Util.isElement(from)) {
        fromShape = this._getShapeFromTerminal(from);
        fromXY = [from.terminal.position.x, from.terminal.position.y];
        fromDrct = from.terminal.direction.toLowerCase();
    } else {
        fromXY = from;
        fromDrct = "c";
    }
    if (OG.Util.isElement(to)) {
        toShape = this._getShapeFromTerminal(to);
        toXY = [to.terminal.position.x, to.terminal.position.y];
        toDrct = to.terminal.direction.toLowerCase();
    } else {
        toXY = to;
        toDrct = "c";
    }

    if (fromShape && toShape) {
        beforeEvent = jQuery.Event("beforeConnectShape", {edge: edge, fromShape: fromShape, toShape: toShape});
        $(this._PAPER.canvas).trigger(beforeEvent);
        if (beforeEvent.isPropagationStopped()) {
            this.remove(edge);
            return false;
        }
    }

    // backup edge-direction
    orgFromXY = fromXY;
    orgToXY = toXY;
    orgFromDrct = fromDrct;
    orgToDrct = toDrct;

    // direction 이 c 인 경우에 대한 처리(센터 연결)
    if (fromShape && fromDrct === "c") {
        intersectionInfo = this.intersectionEdge(_style["edge-type"], fromShape, orgFromXY, orgToXY, true);
        fromXY = intersectionInfo.position;
        fromDrct = intersectionInfo.direction;
    }
    if (toShape && toDrct === "c") {
        intersectionInfo = this.intersectionEdge(_style["edge-type"], toShape, orgFromXY, orgToXY, false);
        toXY = intersectionInfo.position;
        toDrct = intersectionInfo.direction;
    }

    isSelf = fromShape && toShape && fromShape.id === toShape.id;
    if (isSelf) {
        fromXY = toXY = fromShape.shape.geom.getBoundary().getRightCenter();
    }

    // 라인 드로잉
    edge = this.drawEdge(new OG.Line(fromXY, toXY),
        OG.Util.apply(_style, {"edge-direction": fromDrct + " " + toDrct}), edge ? edge.id : null, isSelf);

    // Draw Label
    this.drawLabel(edge, label);
    this.drawEdgeLabel(edge, null, 'FROM');
    this.drawEdgeLabel(edge, null, 'TO');

    // restore edge-direction
    OG.Util.apply(edge.shape.geom.style.map, {"edge-direction": orgFromDrct + " " + orgToDrct});
    edge.shapeStyle = edge.shape.geom.style.map;

    // 이전 연결속성정보 삭제
    this.disconnect(edge);

    // 연결 노드 정보 설정
    if (OG.Util.isElement(from)) {
        $(edge).attr("_from", from.id);
        addAttrValues(fromShape, "_toedge", edge.id);
    }

    if (OG.Util.isElement(to)) {
        $(edge).attr("_to", to.id);
        addAttrValues(toShape, "_fromedge", edge.id);
    }

    this.removeAllTerminal();

    if (fromShape && toShape) {
        // connectShape event fire
        $(this._PAPER.canvas).trigger('connectShape', [edge, fromShape, toShape]);
    }

    return edge;
};

/**
 * 연결속성정보를 삭제한다. Edge 인 경우는 연결 속성정보만 삭제하고, 일반 Shape 인 경우는 연결된 모든 Edge 를 삭제한다.
 *
 * @param {Element} element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.disconnect = function (element) {
    var me = this, fromTerminalId, toTerminalId, fromShape, toShape, fromEdgeId, toEdgeId, fromEdge, toEdge,
        removeAttrValue = function (element, name, value) {
            var attrValue = $(element).attr(name),
                array = attrValue ? attrValue.split(",") : [],
                newArray = [];
            $.each(array, function (idx, item) {
                if (item !== value) {
                    newArray.push(item);
                }
            });

            $(element).attr(name, newArray.toString());
            return element;
        };

    if (element) {
        if ($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
            // Edge 인 경우 연결된 Shape 의 연결 속성 정보를 삭제
            fromTerminalId = $(element).attr("_from");
            toTerminalId = $(element).attr("_to");

            if (fromTerminalId) {
                fromShape = this._getShapeFromTerminal(fromTerminalId);
                removeAttrValue(fromShape, "_toedge", element.id);
                $(element).removeAttr("_from");
            }

            if (toTerminalId) {
                toShape = this._getShapeFromTerminal(toTerminalId);
                removeAttrValue(toShape, "_fromedge", element.id);
                $(element).removeAttr("_to");
            }

            // disconnectShape event fire
            if (fromShape && toShape) {
                $(this._PAPER.canvas).trigger('disconnectShape', [element, fromShape, toShape]);
            }
        } else {
            // 일반 Shape 인 경우 연결된 모든 Edge 와 속성 정보를 삭제
            fromEdgeId = $(element).attr("_fromedge");
            toEdgeId = $(element).attr("_toedge");

            if (fromEdgeId) {
                $.each(fromEdgeId.split(","), function (idx, item) {
                    fromEdge = me.getElementById(item);

                    fromTerminalId = $(fromEdge).attr("_from");
                    if (fromTerminalId) {
                        fromShape = me._getShapeFromTerminal(fromTerminalId);
                        removeAttrValue(fromShape, "_toedge", item);
                    }

                    // disconnectShape event fire
                    if (fromShape && element) {
                        $(me._PAPER.canvas).trigger('disconnectShape', [fromEdge, fromShape, element]);
                    }

                    me.remove(fromEdge);
                });
            }

            if (toEdgeId) {
                $.each(toEdgeId.split(","), function (idx, item) {
                    toEdge = me.getElementById(item);

                    toTerminalId = $(toEdge).attr("_to");
                    if (toTerminalId) {
                        toShape = me._getShapeFromTerminal(toTerminalId);
                        removeAttrValue(toShape, "_fromedge", item);
                    }

                    // disconnectShape event fire
                    if (element && toShape) {
                        $(me._PAPER.canvas).trigger('disconnectShape', [toEdge, element, toShape]);
                    }

                    me.remove(toEdge);
                });
            }
        }
    }
};

/**
 * ID에 해당하는 Element 의 Edge 연결시 Drop Over 가이드를 드로잉한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.drawDropOverGuide = function (element) {
    var me = this, rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element),
        geometry = rElement ? rElement.node.shape.geom : null,
        envelope, _upperLeft, _bBoxRect,
        _size = me._CONFIG.GUIDE_RECT_SIZE / 2,
        _hSize = _size / 2;

    if (rElement && geometry && $(element).attr("_shape") !== OG.Constants.SHAPE_TYPE.EDGE && !this._getREleById(rElement.id + OG.Constants.DROP_OVER_BBOX_SUFFIX)) {
        envelope = geometry.getBoundary();
        _upperLeft = envelope.getUpperLeft();

        // guide line 랜더링
        _bBoxRect = this._PAPER.rect(_upperLeft.x - _hSize, _upperLeft.y - _hSize, envelope.getWidth() + _size, envelope.getHeight() + _size);
        _bBoxRect.attr(OG.Util.apply({'stroke-width': _size}, me._CONFIG.DEFAULT_STYLE.DROP_OVER_BBOX));
        this._add(_bBoxRect, rElement.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);

        // layer 위치 조정
        _bBoxRect.insertAfter(rElement);
    }
};

/**
 * ID에 해당하는 Element 의 Move & Resize 용 가이드를 드로잉한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @return {Object}
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.drawGuide = function (element) {
    var me = this, rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element),
        geometry = rElement ? rElement.node.shape.geom : null,
        envelope,
        group, guide,
        _bBoxRect,
        _upperLeft, _upperRight, _lowerLeft, _lowerRight, _leftCenter, _upperCenter, _rightCenter, _lowerCenter,
        _ulRect, _urRect, _llRect, _lrRect, _lcRect, _ucRect, _rcRect, _lwcRect,
        _size = me._CONFIG.GUIDE_RECT_SIZE, _hSize = OG.Util.round(_size / 2);

    if (rElement && geometry) {
        // Edge 인 경우 따로 처리
        if ($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
            return this.drawEdgeGuide(element);
        } else {
            envelope = geometry.getBoundary();
            _upperLeft = envelope.getUpperLeft();
            _upperRight = envelope.getUpperRight();
            _lowerLeft = envelope.getLowerLeft();
            _lowerRight = envelope.getLowerRight();
            _leftCenter = envelope.getLeftCenter();
            _upperCenter = envelope.getUpperCenter();
            _rightCenter = envelope.getRightCenter();
            _lowerCenter = envelope.getLowerCenter();

            if (this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.GUIDE)) {
                // 가이드가 이미 존재하는 경우에는 bBox 만 삭제후 새로 draw
                // bBox remove -> redraw
                this._remove(this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX));
                _bBoxRect = this._PAPER.rect(_upperLeft.x, _upperLeft.y, envelope.getWidth(), envelope.getHeight());
                _bBoxRect.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_BBOX);
                this._add(_bBoxRect, rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX);
                _bBoxRect.insertBefore(rElement);

                _ulRect = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.UL);
                _urRect = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.UR);
                _llRect = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.LL);
                _lrRect = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.LR);
                _lcRect = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.LC);
                _ucRect = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.UC);
                _rcRect = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.RC);
                _lwcRect = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.LWC);

                _ulRect.attr({x: _upperLeft.x - _hSize, y: _upperLeft.y - _hSize});
                _urRect.attr({x: _upperRight.x - _hSize, y: _upperRight.y - _hSize});
                _llRect.attr({x: _lowerLeft.x - _hSize, y: _lowerLeft.y - _hSize});
                _lrRect.attr({x: _lowerRight.x - _hSize, y: _lowerRight.y - _hSize});
                _lcRect.attr({x: _leftCenter.x - _hSize, y: _leftCenter.y - _hSize});
                _ucRect.attr({x: _upperCenter.x - _hSize, y: _upperCenter.y - _hSize});
                _rcRect.attr({x: _rightCenter.x - _hSize, y: _rightCenter.y - _hSize});
                _lwcRect.attr({x: _lowerCenter.x - _hSize, y: _lowerCenter.y - _hSize});

                return null;
            }

            // group
            group = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.GUIDE);
            if (group) {
                this._remove(group);
                this._remove(this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX));
            }
            group = this._PAPER.group();

            // guide line 랜더링
            _bBoxRect = this._PAPER.rect(_upperLeft.x, _upperLeft.y, envelope.getWidth(), envelope.getHeight());
            _ulRect = this._PAPER.rect(_upperLeft.x - _hSize, _upperLeft.y - _hSize, _size, _size);
            _urRect = this._PAPER.rect(_upperRight.x - _hSize, _upperRight.y - _hSize, _size, _size);
            _llRect = this._PAPER.rect(_lowerLeft.x - _hSize, _lowerLeft.y - _hSize, _size, _size);
            _lrRect = this._PAPER.rect(_lowerRight.x - _hSize, _lowerRight.y - _hSize, _size, _size);
            _lcRect = this._PAPER.rect(_leftCenter.x - _hSize, _leftCenter.y - _hSize, _size, _size);
            _ucRect = this._PAPER.rect(_upperCenter.x - _hSize, _upperCenter.y - _hSize, _size, _size);
            _rcRect = this._PAPER.rect(_rightCenter.x - _hSize, _rightCenter.y - _hSize, _size, _size);
            _lwcRect = this._PAPER.rect(_lowerCenter.x - _hSize, _lowerCenter.y - _hSize, _size, _size);

            _bBoxRect.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_BBOX);
            _ulRect.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_UL);
            _urRect.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_UR);
            _llRect.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_LL);
            _lrRect.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_LR);
            _lcRect.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_LC);
            _ucRect.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_UC);
            _rcRect.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_RC);
            _lwcRect.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_LWC);

            // add to Group
            group.appendChild(_ulRect);
            group.appendChild(_urRect);
            group.appendChild(_llRect);
            group.appendChild(_lrRect);
            group.appendChild(_lcRect);
            group.appendChild(_ucRect);
            group.appendChild(_rcRect);
            group.appendChild(_lwcRect);

            this._add(group, rElement.id + OG.Constants.GUIDE_SUFFIX.GUIDE);
            this._add(_bBoxRect, rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX);
            this._add(_ulRect, rElement.id + OG.Constants.GUIDE_SUFFIX.UL);
            this._add(_urRect, rElement.id + OG.Constants.GUIDE_SUFFIX.UR);
            this._add(_llRect, rElement.id + OG.Constants.GUIDE_SUFFIX.LL);
            this._add(_lrRect, rElement.id + OG.Constants.GUIDE_SUFFIX.LR);
            this._add(_lcRect, rElement.id + OG.Constants.GUIDE_SUFFIX.LC);
            this._add(_ucRect, rElement.id + OG.Constants.GUIDE_SUFFIX.UC);
            this._add(_rcRect, rElement.id + OG.Constants.GUIDE_SUFFIX.RC);
            this._add(_lwcRect, rElement.id + OG.Constants.GUIDE_SUFFIX.LWC);

            // guide 정의
            guide = {
                bBox: _bBoxRect.node,
                group: group.node,
                ul: _ulRect.node,
                ur: _urRect.node,
                ll: _llRect.node,
                lr: _lrRect.node,
                lc: _lcRect.node,
                uc: _ucRect.node,
                rc: _rcRect.node,
                lwc: _lwcRect.node
            };

            // layer 위치 조정
            _bBoxRect.insertBefore(rElement);
            group.insertAfter(rElement);

            // selected 속성값 설정
            $(rElement.node).attr("_selected", "true");

            return guide;
        }
    }

    return null;
};

/**
 * ID에 해당하는 Element 의 Move & Resize 용 가이드를 제거한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.removeGuide = function (element) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element),
        guide = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.GUIDE),
        bBox = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX);

    rElement.node.removeAttribute("_selected");
    this._remove(guide);
    this._remove(bBox);
};

/**
 * 모든 Move & Resize 용 가이드를 제거한다.
 *
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.removeAllGuide = function () {
    var me = this;
    $(me.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, item) {
        if (OG.Util.isElement(item) && item.id) {
            me.removeGuide(item);
        }
    });
};

/**
 * ID에 해당하는 Edge Element 의 Move & Resize 용 가이드를 드로잉한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @return {Object}
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.drawEdgeGuide = function (element) {
    var me = this, rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element),
        geometry = rElement ? rElement.node.shape.geom : null,
        vertices, isSelf,
        group, guide, pathStr,
        _bBoxLine, _fromRect, _toRect, _controlRect, controlNode = [],
        _size = me._CONFIG.GUIDE_RECT_SIZE, _hSize = OG.Util.round(_size / 2), _style = {},
        i;

    if (rElement && geometry) {
        OG.Util.apply(_style, geometry.style.map, me._CONFIG.DEFAULT_STYLE.EDGE);

        vertices = _style["edge-type"] === OG.Constants.EDGE_TYPE.BEZIER ? geometry.getControlPoints() : geometry.getVertices();

        isSelf = $(element).attr("_from") && $(element).attr("_to") && $(element).attr("_from") === $(element).attr("_to");

        if (this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.GUIDE)) {
            // 가이드가 이미 존재하는 경우에는 bBoxLine 만 삭제후 새로 draw 하고 나머지 guide 는 Update 한다.
            // bBoxLine remove -> redraw
            this._remove(this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX));
            pathStr = "";
            if (_style["edge-type"] === OG.Constants.EDGE_TYPE.BEZIER) {
                for (i = 0; i < vertices.length; i++) {
                    if (i === 0) {
                        pathStr = "M" + vertices[i].x + " " + vertices[i].y;
                    } else if (i === 1) {
                        pathStr += "C" + vertices[i].x + " " + vertices[i].y;
                    } else {
                        pathStr += " " + vertices[i].x + " " + vertices[i].y;
                    }
                }
            } else {
                for (i = 0; i < vertices.length; i++) {
                    if (i === 0) {
                        pathStr = "M" + vertices[i].x + " " + vertices[i].y;
                    } else {
                        pathStr += "L" + vertices[i].x + " " + vertices[i].y;
                    }
                }
            }

            _bBoxLine = this._PAPER.path(pathStr);
            _bBoxLine.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_BBOX);
            this._add(_bBoxLine, rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX);
            _bBoxLine.insertBefore(rElement);

            // 시작지점 가이드 Update
            _fromRect = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.FROM);
            _fromRect.attr({x: vertices[0].x - _hSize, y: vertices[0].y - _hSize});

            // 종료지점 가이드 Update
            _toRect = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.TO);
            _toRect.attr({x: vertices[vertices.length - 1].x - _hSize, y: vertices[vertices.length - 1].y - _hSize});

            // 콘트롤 가이드 Update
            if (!isSelf && _style["edge-type"] !== OG.Constants.EDGE_TYPE.BEZIER) {
                for (i = 1; i < vertices.length - 2; i++) {
                    if (vertices[i].x === vertices[i + 1].x) {
                        _controlRect = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.CTL_H + i);
                        if (_controlRect) {
                            _controlRect.attr({
                                x: vertices[i].x - _hSize,
                                y: OG.Util.round((vertices[i].y + vertices[i + 1].y) / 2) - _hSize
                            });
                        }
                    } else {
                        _controlRect = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.CTL_V + i);
                        if (_controlRect) {
                            _controlRect.attr({
                                x: OG.Util.round((vertices[i].x + vertices[i + 1].x) / 2) - _hSize,
                                y: vertices[i].y - _hSize
                            });
                        }
                    }
                }
            }

            return null;
        }

        // group
        group = this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.GUIDE);
        if (group) {
            this._remove(group);
            this._remove(this._getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX));
        }
        group = this._PAPER.group();

        // 쉐도우 가이드
        pathStr = "";
        if (_style["edge-type"] === OG.Constants.EDGE_TYPE.BEZIER) {
            for (i = 0; i < vertices.length; i++) {
                if (i === 0) {
                    pathStr = "M" + vertices[i].x + " " + vertices[i].y;
                } else if (i === 1) {
                    pathStr += "C" + vertices[i].x + " " + vertices[i].y;
                } else {
                    pathStr += " " + vertices[i].x + " " + vertices[i].y;
                }
            }
        } else {
            for (i = 0; i < vertices.length; i++) {
                if (i === 0) {
                    pathStr = "M" + vertices[i].x + " " + vertices[i].y;
                } else {
                    pathStr += "L" + vertices[i].x + " " + vertices[i].y;
                }
            }
        }
        _bBoxLine = this._PAPER.path(pathStr);
        _bBoxLine.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_BBOX);

        // 시작지점 가이드
        _fromRect = this._PAPER.rect(vertices[0].x - _hSize, vertices[0].y - _hSize, _size, _size);
        _fromRect.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_FROM);
        group.appendChild(_fromRect);
        this._add(_fromRect, rElement.id + OG.Constants.GUIDE_SUFFIX.FROM);

        // 종료지점 가이드
        _toRect = this._PAPER.rect(vertices[vertices.length - 1].x - _hSize, vertices[vertices.length - 1].y - _hSize, _size, _size);
        _toRect.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_TO);
        group.appendChild(_toRect);
        this._add(_toRect, rElement.id + OG.Constants.GUIDE_SUFFIX.TO);

        // 콘트롤 가이드
        if (!isSelf && _style["edge-type"] !== OG.Constants.EDGE_TYPE.BEZIER) {
            for (i = 1; i < vertices.length - 2; i++) {
                if (vertices[i].x === vertices[i + 1].x) {
                    _controlRect = this._PAPER.rect(vertices[i].x - _hSize,
                        OG.Util.round((vertices[i].y + vertices[i + 1].y) / 2) - _hSize, _size, _size);
                    _controlRect.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_CTL_H);
                    this._add(_controlRect, rElement.id + OG.Constants.GUIDE_SUFFIX.CTL_H + i);
                } else {
                    _controlRect = this._PAPER.rect(OG.Util.round((vertices[i].x + vertices[i + 1].x) / 2) - _hSize,
                        vertices[i].y - _hSize, _size, _size);
                    _controlRect.attr(me._CONFIG.DEFAULT_STYLE.GUIDE_CTL_V);
                    this._add(_controlRect, rElement.id + OG.Constants.GUIDE_SUFFIX.CTL_V + i);
                }
                group.appendChild(_controlRect);
                controlNode.push(_controlRect.node);
            }
        }
        this._add(_bBoxLine, rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX);
        this._add(group, rElement.id + OG.Constants.GUIDE_SUFFIX.GUIDE);

        // guide 정의
        guide = {
            bBox: _bBoxLine.node,
            group: group.node,
            from: _fromRect.node,
            to: _toRect.node,
            controls: controlNode
        };

        // layer 위치 조정
        _bBoxLine.insertBefore(rElement);
        group.insertAfter(rElement);

        // selected 속성값 설정
        $(rElement.node).attr("_selected", "true");

        return guide;
    }

    return null;
};

/**
 * Rectangle 모양의 마우스 드래그 선택 박스 영역을 드로잉한다.
 *
 * @param {Number[]} position 드로잉할 위치 좌표(좌상단)
 * @param {Number[]} size Text Width, Height, Angle
 * @param {OG.geometry.Style,Object} style 스타일
 * @return {Element} DOM Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.drawRubberBand = function (position, size, style) {
    var me = this, x = position ? position[0] : 0,
        y = position ? position[1] : 0,
        width = size ? size[0] : 0,
        height = size ? size[1] : 0,
        rect = this._getREleById(OG.Constants.RUBBER_BAND_ID),
        _style = {};
    if (rect) {
        rect.attr({
            x: x,
            y: y,
            width: Math.abs(width),
            height: Math.abs(height)
        });
        return rect;
    }
    OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {}, me._CONFIG.DEFAULT_STYLE.RUBBER_BAND);
    rect = this._PAPER.rect(x, y, width, height).attr(_style);
    this._add(rect, OG.Constants.RUBBER_BAND_ID);
    this._ETC_GROUP.node.appendChild(rect.node);

    return rect.node;
};

/**
 * Rectangle 모양의 마우스 드래그 선택 박스 영역을 제거한다.
 *
 * @param {Element} root first, rubberBand 정보를 저장한 엘리먼트
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.removeRubberBand = function (root) {
    this.setAttr(OG.Constants.RUBBER_BAND_ID, {x: 0, y: 0, width: 0, height: 0});
    $(root).removeData("dragBox_first");
    $(root).removeData("rubberBand");
};

/**
 * Edge 연결용 터미널을 드로잉한다.
 *
 * @param {Element} element DOM Element
 * @param {String} terminalType 터미널 연결 유형(IN or OUT or INOUT)
 * @return {Element} terminal group element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.drawTerminal = function (element, terminalType) {
    var me = this, rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element),
        terminals = rElement ? rElement.node.shape.createTerminal() : null,
        envelope = rElement ? rElement.node.shape.geom.getBoundary() : null,
        group, cross, rect, x, y, size = me._CONFIG.TERMINAL_SIZE, rect_gap = size * 2;

    if (rElement && terminals && terminals.length > 0) {
        group = this._getREleById(rElement.id + OG.Constants.TERMINAL_SUFFIX.GROUP);
        rect = this._getREleById(rElement.id + OG.Constants.TERMINAL_SUFFIX.BOX);
        if (group || rect) {
            return {
                bBox: rect.node,
                terminal: group.node
            };
        }

        // group
        group = this._PAPER.group();

        // hidden box
        rect = this._PAPER.rect(envelope.getUpperLeft().x - rect_gap, envelope.getUpperLeft().y - rect_gap,
            envelope.getWidth() + rect_gap * 2, envelope.getHeight() + rect_gap * 2);
        rect.attr(me._CONFIG.DEFAULT_STYLE.TERMINAL_BBOX);
        this._add(rect, rElement.id + OG.Constants.TERMINAL_SUFFIX.BOX);

        // terminal
        $.each(terminals, function (idx, item) {
            if (!terminalType || item.inout.indexOf(terminalType) >= 0) {
                x = item.position.x;
                y = item.position.y;

                cross = me._PAPER.circle(x, y, size);
                cross.attr(me._CONFIG.DEFAULT_STYLE.TERMINAL);
                cross.node.terminal = item;

                group.appendChild(cross);
                me._add(cross, rElement.id + OG.Constants.TERMINAL_SUFFIX.GROUP + "_" + item.direction + "_" + item.inout + "_" + idx);
            }
        });

        this._add(group, rElement.id + OG.Constants.TERMINAL_SUFFIX.GROUP);

        // layer 위치 조정
        rect.insertBefore(rElement);
        group.insertAfter(rElement);

        return {
            bBox: rect.node,
            terminal: group.node
        };
    }

    return null;
};

/**
 *  Edge 연결용 터미널을 remove 한다.
 *
 * @param {Element} element DOM Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.removeTerminal = function (element) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element),
        group, rect;

    if (rElement) {
        // group
        group = this._getREleById(rElement.id + OG.Constants.TERMINAL_SUFFIX.GROUP);
        if (group) {
            this._remove(group);
        }
        rect = this._getREleById(rElement.id + OG.Constants.TERMINAL_SUFFIX.BOX);
        if (rect) {
            this._remove(rect);
        }
    }
};

/**
 *  모든 Edge 연결용 터미널을 remove 한다.
 *
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.removeAllTerminal = function () {
    var me = this;
    $.each(this._ELE_MAP.keys(), function (idx, item) {
        me.removeTerminal(item);
    });
};

/**
 * ID에 해당하는 Element 의 Collapse 가이드를 드로잉한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @return {Element}
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.drawCollapseGuide = function (element) {
    var me = this, rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element),
        geometry = rElement ? rElement.node.shape.geom : null,
        envelope, _upperLeft, _bBoxRect, _rect,
        _size = me._CONFIG.COLLAPSE_SIZE,
        _hSize = _size / 2;

    if (rElement && geometry && $(element).attr("_shape") === OG.Constants.SHAPE_TYPE.GROUP) {
        _bBoxRect = this._getREleById(rElement.id + OG.Constants.COLLAPSE_BBOX_SUFFIX);
        if (_bBoxRect) {
            this._remove(_bBoxRect);
        }
        _rect = this._getREleById(rElement.id + OG.Constants.COLLAPSE_SUFFIX);
        if (_rect) {
            this._remove(_rect);
        }

        envelope = geometry.getBoundary();
        _upperLeft = envelope.getUpperLeft();

        // hidden box
        _bBoxRect = this._PAPER.rect(envelope.getUpperLeft().x - _size, envelope.getUpperLeft().y - _size,
            envelope.getWidth() + _size * 2, envelope.getHeight() + _size * 2);
        _bBoxRect.attr(me._CONFIG.DEFAULT_STYLE.COLLAPSE_BBOX);
        this._add(_bBoxRect, rElement.id + OG.Constants.COLLAPSE_BBOX_SUFFIX);

        if (rElement.node.shape.isCollapsed === true) {
            // expand 랜더링
            _rect = this._PAPER.path(
                "M" + (_upperLeft.x + _hSize) + " " + (_upperLeft.y + _hSize) +
                    "h" + _size + "v" + _size + "h" + (-1 * _size) + "v" + (-1 * _size) +
                    "m1 " + _hSize + "h" + (_size - 2) + "M" +
                    (_upperLeft.x + _hSize) + " " + (_upperLeft.y + _hSize) +
                    "m" + _hSize + " 1v" + (_size - 2)
            );
        } else {
            // collapse 랜더링
            _rect = this._PAPER.path("M" + (_upperLeft.x + _hSize) + " " +
                (_upperLeft.y + _hSize) + "h" + _size + "v" + _size + "h" + (-1 * _size) + "v" + (-1 * _size) +
                "m1 " + _hSize + "h" + (_size - 2));
        }

        _rect.attr(me._CONFIG.DEFAULT_STYLE.COLLAPSE);
        this._add(_rect, rElement.id + OG.Constants.COLLAPSE_SUFFIX);

        // layer 위치 조정
        _bBoxRect.insertBefore(rElement);
        _rect.insertAfter(rElement);

        return {
            bBox: _bBoxRect.node,
            collapse: _rect.node
        };
    }

    return null;
};

/**
 * ID에 해당하는 Element 의 Collapse 가이드를 제거한다.
 *
 * @param {Element} element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.removeCollapseGuide = function (element) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element),
        _bBoxRect, _rect;

    if (rElement) {
        _bBoxRect = this._getREleById(rElement.id + OG.Constants.COLLAPSE_BBOX_SUFFIX);
        if (_bBoxRect) {
            this._remove(_bBoxRect);
        }
        _rect = this._getREleById(rElement.id + OG.Constants.COLLAPSE_SUFFIX);
        if (_rect) {
            this._remove(_rect);
        }
    }
};

/**
 * 주어진 Shape 들을 그룹핑한다.
 *
 * @param {Element[]} elements
 * @return {Element} Group Shape Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.group = function (elements) {
    var groupShapeEle, geometryArray = [], geometryCollection, envelope, position, shape, size, i;

    if (elements && elements.length > 1) {
        // 그룹핑할 Shape 의 전체 영역 계산
        for (i = 0; i < elements.length; i++) {
            geometryArray.push(elements[i].shape.geom);
        }
        geometryCollection = new OG.GeometryCollection(geometryArray);
        envelope = geometryCollection.getBoundary();

        // 위치 및 사이즈 설정
        position = [envelope.getCentroid().x, envelope.getCentroid().y];
        shape = new OG.GroupShape();
        size = [envelope.getWidth(), envelope.getHeight()];

        // draw group
        groupShapeEle = this.drawShape(position, shape, size);

        // append child
        for (i = 0; i < elements.length; i++) {
            groupShapeEle.appendChild(elements[i]);
        }

        // group event fire
        $(this._PAPER.canvas).trigger('group', [groupShapeEle]);
    }

    return groupShapeEle;
};

/**
 * 주어진 그룹들을 그룹해제한다.
 *
 * @param {Element[]} groupElements
 * @return {Element[]} ungrouped Elements
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.ungroup = function (groupElements) {
    var ungroupElements = [], children, i, j;
    if (groupElements && groupElements.length > 0) {
        for (i = 0; i < groupElements.length; i++) {
            children = $(groupElements[i]).children("[_type='" + OG.Constants.NODE_TYPE.SHAPE + "']");
            for (j = 0; j < children.length; j++) {
                groupElements[i].parentNode.appendChild(children[j]);
                ungroupElements.push(children[j]);
            }
            this.removeShape(groupElements[i]);
        }

        // ungroup event fire
        $(this._PAPER.canvas).trigger('ungroup', [ungroupElements]);
    }

    return ungroupElements;
};

/**
 * 주어진 Shape 들을 그룹에 추가한다.
 *
 * @param {Element} groupElement
 * @param {Element[]} elements
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.addToGroup = function (groupElement, elements) {
    var i;
    for (i = 0; i < elements.length; i++) {
        groupElement.appendChild(elements[i]);
    }
};

/**
 * 주어진 Shape 이 그룹인 경우 collapse 한다.
 *
 * @param {Element} element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.collapse = function (element) {
    var me = this, childNodes, i, hideChildEdge;

    hideChildEdge = function (_collapseRootElement, _element) {
        var edgeIdArray, fromEdge, toEdge, _childNodes = _element.childNodes, otherShape, i, j, isNeedToRedraw;
        for (i = _childNodes.length - 1; i >= 0; i--) {
            if ($(_childNodes[i]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
                hideChildEdge(_collapseRootElement, _childNodes[i]);

                isNeedToRedraw = false;
                edgeIdArray = $(_childNodes[i]).attr("_fromedge");
                if (edgeIdArray) {
                    edgeIdArray = edgeIdArray.split(",");
                    for (j = 0; j < edgeIdArray.length; j++) {
                        fromEdge = me.getElementById(edgeIdArray[j]);
                        if (fromEdge) {
                            otherShape = me._getShapeFromTerminal($(fromEdge).attr("_from"));

                            // otherShape 이 같은 collapse 범위내에 있는지 체크
                            if ($(otherShape).parents("#" + _collapseRootElement.id).length !== 0) {
                                me.hide(fromEdge);
                            } else {
                                isNeedToRedraw = true;
                            }
                        }
                    }
                }

                edgeIdArray = $(_childNodes[i]).attr("_toedge");
                if (edgeIdArray) {
                    edgeIdArray = edgeIdArray.split(",");
                    for (j = 0; j < edgeIdArray.length; j++) {
                        toEdge = me.getElementById(edgeIdArray[j]);
                        if (toEdge) {
                            otherShape = me._getShapeFromTerminal($(toEdge).attr("_to"));

                            // otherShape 이 같은 collapse 범위내에 있는지 체크
                            if ($(otherShape).parents("#" + _collapseRootElement.id).length !== 0) {
                                me.hide(toEdge);
                            } else {
                                isNeedToRedraw = true;
                            }
                        }
                    }
                }

                // group 영역 밖의 연결된 otherShape 이 있는 경우 redrawConnectedEdge
                if (isNeedToRedraw === true) {
                    me.redrawConnectedEdge(_childNodes[i]);
                }
            }
        }
    };

    if (element.shape) {
        childNodes = element.childNodes;
        for (i = childNodes.length - 1; i >= 0; i--) {
            if ($(childNodes[i]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
                this.hide(childNodes[i]);
            }
        }
        element.shape.isCollapsed = true;
        $(element).attr("_collapsed", true);

        hideChildEdge(element, element);
        this.redrawShape(element);

        // collapsed event fire
        $(this._PAPER.canvas).trigger('collapsed', [element]);
    }
};

/**
 * 주어진 Shape 이 그룹인 경우 expand 한다.
 *
 * @param {Element} element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.expand = function (element) {
    var me = this, childNodes, i, showChildEdge;

    showChildEdge = function (_collapseRootElement, _element) {
        var edgeIdArray, fromEdge, toEdge, _childNodes = _element.childNodes, otherShape, i, j, isNeedToRedraw;
        for (i = _childNodes.length - 1; i >= 0; i--) {
            if ($(_childNodes[i]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
                showChildEdge(_collapseRootElement, _childNodes[i]);

                isNeedToRedraw = false;
                edgeIdArray = $(_childNodes[i]).attr("_fromedge");
                if (edgeIdArray) {
                    edgeIdArray = edgeIdArray.split(",");
                    for (j = 0; j < edgeIdArray.length; j++) {
                        fromEdge = me.getElementById(edgeIdArray[j]);
                        if (fromEdge) {
                            otherShape = me._getShapeFromTerminal($(fromEdge).attr("_from"));

                            // otherShape 이 같은 collapse 범위내에 있는지 체크
                            if ($(otherShape).parents("#" + _collapseRootElement.id).length !== 0) {
                                me.show(fromEdge);
                            } else {
                                isNeedToRedraw = true;
                            }
                        }
                    }
                }

                edgeIdArray = $(_childNodes[i]).attr("_toedge");
                if (edgeIdArray) {
                    edgeIdArray = edgeIdArray.split(",");
                    for (j = 0; j < edgeIdArray.length; j++) {
                        toEdge = me.getElementById(edgeIdArray[j]);
                        if (toEdge) {
                            otherShape = me._getShapeFromTerminal($(toEdge).attr("_to"));

                            // otherShape 이 같은 collapse 범위내에 있는지 체크
                            if ($(otherShape).parents("#" + _collapseRootElement.id).length !== 0) {
                                me.show(toEdge);
                            } else {
                                isNeedToRedraw = true;
                            }
                        }
                    }
                }

                // group 영역 밖의 연결된 otherShape 이 있는 경우 redrawConnectedEdge
                if (isNeedToRedraw === true) {
                    me.redrawConnectedEdge(_childNodes[i]);
                }
            }
        }
    };

    if (element.shape) {
        childNodes = element.childNodes;
        for (i = childNodes.length - 1; i >= 0; i--) {
            if ($(childNodes[i]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
                this.show(childNodes[i]);
            }
        }
        element.shape.isCollapsed = false;
        $(element).attr("_collapsed", false);

        showChildEdge(element, element);
        this.redrawShape(element);

        // expanded event fire
        $(this._PAPER.canvas).trigger('expanded', [element]);
    }
};

/**
 * 드로잉된 모든 오브젝트를 클리어한다.
 *
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.clear = function () {
    this._PAPER.clear();
    this._ELE_MAP.clear();
    this._ID_PREFIX = Math.round(Math.random() * 10000);
    this._LAST_ID = 0;
    this._ROOT_GROUP = this._add(this._PAPER.group(), null, OG.Constants.NODE_TYPE.ROOT);
    this._ETC_GROUP = this._add(this._PAPER.group(), null, OG.Constants.NODE_TYPE.ETC);
};

/**
 * Shape 을 캔버스에서 관련된 모두를 삭제한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.removeShape = function (element) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element),
        childNodes, beforeEvent, i, removedElement;
    childNodes = rElement.node.childNodes;

    beforeEvent = jQuery.Event("beforeRemoveShape", {element: rElement.node});
    $(this._PAPER.canvas).trigger(beforeEvent);
    if (beforeEvent.isPropagationStopped()) {
        return false;
    }

    for (i = childNodes.length - 1; i >= 0; i--) {
        if ($(childNodes[i]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
            this.removeShape(childNodes[i]);
        }
    }

    this.disconnect(rElement.node);
    this.removeTerminal(rElement.node);
    this.removeGuide(rElement.node);
    this.removeCollapseGuide(rElement.node);

    removedElement = OG.Util.clone(rElement.node);

    this.remove(rElement.node);

    // removeShape event fire
    $(this._PAPER.canvas).trigger('removeShape', [removedElement]);
};

/**
 * ID에 해당하는 Element 를 캔버스에서 제거한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.remove = function (element) {
    var id = OG.Util.isElement(element) ? element.id : element,
        rElement = this._getREleById(id);
    this._remove(rElement);
};

/**
 * 하위 엘리먼트만 제거한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.removeChild = function (element) {
    var id = OG.Util.isElement(element) ? element.id : element,
        rElement = this._getREleById(id);
    this._removeChild(rElement);
};

/**
 * 랜더러 캔버스 Root Element 를 반환한다.
 *
 * @return {Element} Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.getRootElement = function () {
    return this._PAPER.canvas;
};

/**
 * 주어진 지점을 포함하는 Top Element 를 반환한다.
 *
 * @param {Number[]} position 위치 좌표
 * @return {Element} Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.getElementByPoint = function (position) {
    var element = this._PAPER.getElementByPoint(position[0], position[1]);
    return element ? element.node.parentNode : null;
};

/**
 * 엘리먼트에 속성값을 설정한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @param {Object} attribute 속성값
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.setAttr = function (element, attribute) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element);
    if (rElement) {
        rElement.attr(attribute);
    }
};

/**
 * 엘리먼트 속성값을 반환한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @param {String} attrName 속성이름
 * @return {Object} attribute 속성값
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.getAttr = function (element, attrName) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element);
    if (rElement) {
        return rElement.attr(attrName);
    }
    return null;
};

/**
 * Shape 의 스타일을 변경한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @param {Object} style 스타일
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.setShapeStyle = function (element, style) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element);
    if (rElement && element.shape && element.shape.geom) {
        OG.Util.apply(element.shape.geom.style.map, style || {});
        element.shapeStyle = element.shapeStyle || {};
        OG.Util.apply(element.shapeStyle, style || {});
        this.redrawShape(element);
    }
};

/**
 * ID에 해당하는 Element 를 최상단 레이어로 이동한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.toFront = function (element) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element);
    if (rElement) {
        rElement.toFront();
    }
};

/**
 * ID에 해당하는 Element 를 최하단 레이어로 이동한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.toBack = function (element) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element);
    if (rElement) {
        rElement.toBack();
    }
};

/**
 * 랜더러 캔버스의 사이즈(Width, Height)를 반환한다.
 *
 * @return {Number[]} Canvas Width, Height
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.getCanvasSize = function () {
    return [this._PAPER.width, this._PAPER.height];
};

/**
 * 랜더러 캔버스의 사이즈(Width, Height)를 변경한다.
 *
 * @param {Number[]} size Canvas Width, Height
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.setCanvasSize = function (size) {
    this._PAPER.setSize(size[0], size[1]);
};

/**
 * 랜더러 캔버스의 사이즈(Width, Height)를 실제 존재하는 Shape 의 영역에 맞게 변경한다.
 *
 * @param {Number[]} minSize Canvas 최소 Width, Height
 * @param {Boolean} fitScale 주어진 minSize 에 맞게 fit 여부(Default:false)
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.fitCanvasSize = function (minSize, fitScale) {
    var me = this, realRootBBox = this.getRealRootBBox(), offsetX, offsetY, scale = 1,
        width = realRootBBox.width + me._CONFIG.FIT_CANVAS_PADDING * 2,
        height = realRootBBox.height + me._CONFIG.FIT_CANVAS_PADDING * 2;
    if (realRootBBox.width !== 0 && realRootBBox.height !== 0) {
        offsetX = realRootBBox.x > me._CONFIG.FIT_CANVAS_PADDING ?
            -1 * (realRootBBox.x - me._CONFIG.FIT_CANVAS_PADDING) : me._CONFIG.FIT_CANVAS_PADDING - realRootBBox.x;
        offsetY = realRootBBox.y > me._CONFIG.FIT_CANVAS_PADDING ?
            -1 * (realRootBBox.y - me._CONFIG.FIT_CANVAS_PADDING) : me._CONFIG.FIT_CANVAS_PADDING - realRootBBox.y;

        this.move(this.getRootGroup(), [offsetX, offsetY]);
        this.removeAllGuide();

        if (minSize && minSize.length === 2) {
            if (OG.Util.isDefined(fitScale) && fitScale === true) {
                scale = minSize[0] / width > minSize[1] / height ? minSize[1] / height : minSize[0] / width;
            }

            width = width < minSize[0] ? minSize[0] : width;
            height = height < minSize[1] ? minSize[1] : height;
        }
        this.setScale(OG.Util.roundPrecision(scale, 1));
        this.setCanvasSize([width, height]);
    }
};

/**
 * 새로운 View Box 영역을 설정한다. (ZoomIn & ZoomOut 가능)
 *
 * @param {Number[]} position 위치 좌표(좌상단 기준)
 * @param {Number[]} size Canvas Width, Height
 * @param {Boolean} isFit Fit 여부
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.setViewBox = function (position, size, isFit) {
    this._PAPER.setViewBox(position[0], position[1], size[0], size[1], isFit);
};

/**
 * Scale 을 반환한다. (리얼 사이즈 : Scale = 1)
 *
 * @return {Number} 스케일값
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.getScale = function (scale) {
    var me = this;
    return me._CONFIG.SCALE;
};

/**
 * Scale 을 설정한다. (리얼 사이즈 : Scale = 1)
 *
 * @param {Number} scale 스케일값
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.setScale = function (scale) {
    var me = this;
    if (me._CONFIG.SCALE_MIN <= scale && scale <= me._CONFIG.SCALE_MAX) {
        if (this.isVML()) {
            // TODO : VML 인 경우 처리
            $(this._ROOT_GROUP.node).css({
                'width': 21600 / scale,
                'height': 21600 / scale
            });

            $(this._ROOT_GROUP.node).find('[_type=SHAPE]').each(function (idx, item) {
                $(item).css({
                    'width': 21600,
                    'height': 21600
                });
            });
        } else {
            $(this._ROOT_GROUP.node).attr('transform', 'scale(' + scale + ')');
            $(this._ETC_GROUP.node).attr('transform', 'scale(' + scale + ')');
        }

        this._PAPER.setSize(
            OG.Util.roundGrid(this._PAPER.width / me._CONFIG.SCALE * scale, me._CONFIG.MOVE_SNAP_SIZE),
            OG.Util.roundGrid(this._PAPER.height / me._CONFIG.SCALE * scale, me._CONFIG.MOVE_SNAP_SIZE)
        );

        me._CONFIG.SCALE = scale;
    }
};

/**
 * ID에 해당하는 Element 를 캔버스에서 show 한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.show = function (element) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element);
    if (rElement) {
        rElement.show();
    }
};

/**
 * ID에 해당하는 Element 를 캔버스에서 hide 한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.hide = function (element) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element);
    if (rElement) {
        rElement.hide();
    }
};

/**
 * Source Element 를 Target Element 아래에 append 한다.
 *
 * @param {Element,String} srcElement Element 또는 ID
 * @param {Element,String} targetElement Element 또는 ID
 * @return {Element} Source Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.appendChild = function (srcElement, targetElement) {
    var srcRElement = this._getREleById(OG.Util.isElement(srcElement) ? srcElement.id : srcElement),
        targetRElement = this._getREleById(OG.Util.isElement(targetElement) ? targetElement.id : targetElement);

    targetRElement.appendChild(srcRElement);

    return srcRElement;
};

/**
 * Source Element 를 Target Element 이후에 insert 한다.
 *
 * @param {Element,String} srcElement Element 또는 ID
 * @param {Element,String} targetElement Element 또는 ID
 * @return {Element} Source Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.insertAfter = function (srcElement, targetElement) {
    var srcRElement = this._getREleById(OG.Util.isElement(srcElement) ? srcElement.id : srcElement),
        targetRElement = this._getREleById(OG.Util.isElement(targetElement) ? targetElement.id : targetElement);

    srcRElement.insertAfter(targetRElement);

    return srcRElement;
};

/**
 * Source Element 를 Target Element 이전에 insert 한다.
 *
 * @param {Element,String} srcElement Element 또는 ID
 * @param {Element,String} targetElement Element 또는 ID
 * @return {Element} Source Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.insertBefore = function (srcElement, targetElement) {
    var srcRElement = this._getREleById(OG.Util.isElement(srcElement) ? srcElement.id : srcElement),
        targetRElement = this._getREleById(OG.Util.isElement(targetElement) ? targetElement.id : targetElement);

    srcRElement.insertBefore(targetRElement);

    return srcRElement;
};

/**
 * 해당 Element 를 가로, 세로 Offset 만큼 이동한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @param {Number[]} offset [가로, 세로]
 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
 * @return {Element} Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.move = function (element, offset, excludeEdgeId) {
    var me = this, rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element),
        type = rElement ? rElement.node.getAttribute("_type") : null,
        geometry;

    this.removeCollapseGuide(element);
    if (rElement && type) {
        $(rElement.node).children("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=EDGE]").each(function (idx, item) {
            // recursive
            me.move(item, offset, excludeEdgeId);
        });
        $(rElement.node).children("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape!=EDGE]").each(function (idx, item) {
            // recursive
            me.move(item, offset, excludeEdgeId);
        });

        if (type !== OG.Constants.NODE_TYPE.ROOT && rElement.node.shape) {
            geometry = rElement.node.shape.geom;
            geometry.move(offset[0], offset[1]);

            this.redrawShape(rElement.node, excludeEdgeId);

            // moveShape event fire
            $(this._PAPER.canvas).trigger('moveShape', [rElement.node, offset]);

            return rElement.node;
        } else {
            return element;
        }
    } else if (rElement) {
        rElement.transform("...t" + offset[0] + "," + offset[1]);

        // moveShape event fire
        $(this._PAPER.canvas).trigger('moveShape', [rElement.node, offset]);

        return rElement.node;
    }

    return null;
};

/**
 * 주어진 중심좌표로 해당 Element 를 이동한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @param {Number[]} position [x, y]
 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
 * @return {Element} Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.moveCentroid = function (element, position, excludeEdgeId) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element),
        geometry = rElement ? rElement.node.shape.geom : null,
        bBox, center = {};

    if (rElement && geometry) {
        center = geometry.getCentroid();

        return this.move(element, [position[0] - center.x, position[1] - center.y], excludeEdgeId);
    } else if (rElement) {
        bBox = rElement.getBBox();
        center.x = bBox.x + OG.Util.round(bBox.width / 2);
        center.y = bBox.y + OG.Util.round(bBox.height / 2);

        return this.move(element, [position[0] - center.x, position[1] - center.y]);
    }
    this.removeCollapseGuide(element);

    return null;
};

/**
 * 중심 좌표를 기준으로 주어진 각도 만큼 회전한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @param {Number} angle 각도
 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
 * @return {Element} Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.rotate = function (element, angle, excludeEdgeId) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element),
        type = rElement ? rElement.node.getAttribute("_shape") : null,
        geometry = rElement ? rElement.node.shape.geom : null,
        shape, envelope, center, width, height;

    if (rElement && type && geometry) {
        if (type === OG.Constants.SHAPE_TYPE.IMAGE ||
            type === OG.Constants.SHAPE_TYPE.TEXT ||
            type === OG.Constants.SHAPE_TYPE.HTML) {
            shape = rElement.node.shape.clone();
            envelope = geometry.getBoundary();
            center = envelope.getCentroid();
            width = envelope.getWidth();
            height = envelope.getHeight();

            this.drawShape([center.x, center.y], shape, [width, height, angle], rElement.node.shapeStyle, rElement.node.id);
        } else {
            if (rElement.node.shape.angle) {
                geometry.rotate(-1 * rElement.node.shape.angle);
            }
            geometry.rotate(angle);
            rElement.node.shape.angle = angle;

            this.redrawShape(rElement.node, excludeEdgeId);
        }

        // rotateShape event fire
        $(this._PAPER.canvas).trigger('rotateShape', [rElement.node, angle]);

        return rElement.node;
    } else if (rElement) {
        rElement.rotate(angle);

        // rotateShape event fire
        $(this._PAPER.canvas).trigger('rotateShape', [rElement.node, angle]);

        return rElement.node;
    }

    return null;
};

/**
 * 상, 하, 좌, 우 외곽선을 이동한 만큼 리사이즈 한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @param {Number[]} offset [상, 하, 좌, 우] 각 방향으로 + 값
 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
 * @return {Element} Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.resize = function (element, offset, excludeEdgeId) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element),
        type = rElement ? rElement.node.getAttribute("_shape") : null,
        geometry = rElement ? rElement.node.shape.geom : null,
        bBox, offsetX, offsetY, width, height, hRate, vRate;

    this.removeCollapseGuide(element);
    if (rElement && type && geometry) {
        geometry.resize(offset[0], offset[1], offset[2], offset[3]);

        this.redrawShape(rElement.node, excludeEdgeId);

        // resizeShape event fire
        $(this._PAPER.canvas).trigger('resizeShape', [rElement.node, offset]);

        return rElement.node;
    } else if (rElement) {
        bBox = rElement.getBBox();

        offsetX = offset[2] + offset[3];
        offsetY = offset[0] + offset[1];
        width = bBox.width + offsetX;
        height = bBox.height + offsetY;
        hRate = bBox.width === 0 ? 1 : width / bBox.width;
        vRate = bBox.height === 0 ? 1 : height / bBox.height;

        rElement.transform("...t" + (-1 * offset[2]) + "," + (-1 * offset[0]));
        rElement.transform("...s" + hRate + "," + vRate + "," + bBox.x + "," + bBox.y);

        // resizeShape event fire
        $(this._PAPER.canvas).trigger('resizeShape', [rElement.node, offset]);

        return rElement.node;
    }

    return null;
};

/**
 * 중심좌표는 고정한 채 Bounding Box 의 width, height 를 리사이즈 한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @param {Number[]} size [Width, Height]
 * @return {Element} Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.resizeBox = function (element, size) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element),
        geometry = rElement ? rElement.node.shape.geom : null,
        boundary, bBox, offsetWidth, offsetHeight;

    this.removeCollapseGuide(element);
    if (rElement && geometry) {
        boundary = geometry.getBoundary();
        offsetWidth = OG.Util.round((size[0] - boundary.getWidth()) / 2);
        offsetHeight = OG.Util.round((size[1] - boundary.getHeight()) / 2);

        return this.resize(element, [offsetHeight, offsetHeight, offsetWidth, offsetWidth]);
    } else if (rElement) {
        bBox = rElement.getBBox();
        offsetWidth = OG.Util.round((size[0] - bBox.width) / 2);
        offsetHeight = OG.Util.round((size[1] - bBox.height) / 2);

        return this.resize(element, [offsetHeight, offsetHeight, offsetWidth, offsetWidth]);
    }

    return null;
};

/**
 * 노드 Element 를 복사한다.
 *
 * @param {Element,String} element Element 또는 ID
 * @return {Element} Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.clone = function (element) {
    // TODO : 오류 - group 인 경우 clone 처리 필요
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element), newElement;
    newElement = rElement.clone();
    this._add(newElement);
    this._ROOT_GROUP.node.appendChild(newElement.node);

    return newElement.node;
};

/**
 * ID로 Node Element 를 반환한다.
 *
 * @param {String} id
 * @return {Element} Element
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.getElementById = function (id) {
    var rElement = this._getREleById(id);
    return rElement ? rElement.node : null;
};

/**
 * 해당 엘리먼트의 BoundingBox 영역 정보를 반환한다.
 *
 * @param {Element,String} element
 * @return {Object} {width, height, x, y, x2, y2}
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.getBBox = function (element) {
    var rElement = this._getREleById(OG.Util.isElement(element) ? element.id : element);
    return rElement.getBBox();
};

/**
 * 부모노드기준으로 캔버스 루트 엘리먼트의 BoundingBox 영역 정보를 반환한다.
 *
 * @return {Object} {width, height, x, y, x2, y2}
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.getRootBBox = function () {
    var container = this._PAPER.canvas.parentNode,
        width = OG.Util.isFirefox() ? this._PAPER.canvas.width.baseVal.value : this._PAPER.canvas.scrollWidth,
        height = OG.Util.isFirefox() ? this._PAPER.canvas.height.baseVal.value : this._PAPER.canvas.scrollHeight,
        x = container.offsetLeft,
        y = container.offsetTop;

    return {
        width: width,
        height: height,
        x: x,
        y: y,
        x2: x + width,
        y2: y + height
    };
};

/**
 * 캔버스의 컨테이너 DOM element 를 반환한다.
 *
 * @return {Element} 컨테이너
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.getContainer = function () {
    return this._PAPER.canvas.parentNode;
};

/**
 * SVG 인지 여부를 반환한다.
 *
 * @return {Boolean} svg 여부
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.isSVG = function () {
    return Raphael.svg;
};

/**
 * VML 인지 여부를 반환한다.
 *
 * @return {Boolean} vml 여부
 * @override
 */
OG.renderer.RaphaelRenderer.prototype.isVML = function () {
    return Raphael.vml;
};

/**
 * Event Handler
 *
 * @class
 * @requires OG.renderer.*
 *
 * @param {OG.renderer.IRenderer} renderer 렌더러
 * @param {Object} config Configuration
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.handler.EventHandler = function (renderer, config) {
    this._RENDERER = renderer;
    this._CONFIG = config;
};

OG.handler.EventHandler.prototype = {
    /**
     * 주어진 Shape Element 의 라벨을 수정 가능하도록 한다.
     *
     * @param {Element} element Shape Element
     */
    enableEditLabel: function (element) {
        var me = this;

        $(element).bind({
            dblclick: function (event) {
                var container = me._RENDERER.getContainer(),
                    envelope = element.shape.geom.getBoundary(),
                    upperLeft = envelope.getUpperLeft(),
                    bBox,
                    left = (upperLeft.x - 1) * me._CONFIG.SCALE,
                    top = (upperLeft.y - 1) * me._CONFIG.SCALE,
                    width = envelope.getWidth() * me._CONFIG.SCALE,
                    height = envelope.getHeight() * me._CONFIG.SCALE,
                    editorId = element.id + OG.Constants.LABEL_EDITOR_SUFFIX,
                    labelEditor,
                    textAlign = "center",
                    fromLabel,
                    toLabel,
                    /**
                     * 라인(꺽은선)의 중심위치를 반환한다.
                     *
                     * @param {Element} element Edge 엘리먼트
                     * @return {OG.Coordinate}
                     */
                        getCenterOfEdge = function (element) {
                        var vertices, from, to, lineLength, distance = 0, i, intersectArray;

                        if (element.shape.geom.style.get("edge-type") === OG.Constants.EDGE_TYPE.BEZIER) {
                            vertices = element.shape.geom.getControlPoints();
                            from = vertices[0];
                            to = vertices[vertices.length - 1];
                            return new OG.geometry.Coordinate(OG.Util.round((from.x + to.x) / 2), OG.Util.round((from.y + to.y) / 2));
                        } else {

                            // Edge Shape 인 경우 라인의 중간 지점 찾기
                            vertices = element.shape.geom.getVertices();
                            lineLength = element.shape.geom.getLength();

                            for (i = 0; i < vertices.length - 1; i++) {
                                distance += vertices[i].distance(vertices[i + 1]);
                                if (distance > lineLength / 2) {
                                    intersectArray = element.shape.geom.intersectCircleToLine(
                                        vertices[i + 1], distance - lineLength / 2, vertices[i + 1], vertices[i]
                                    );

                                    break;
                                }
                            }

                            return intersectArray[0];
                        }
                    },
                    centerOfEdge;

                if (element.shape.isCollapsed === false) {
                    // textarea
                    $(container).append("<textarea id='" + element.id + OG.Constants.LABEL_EDITOR_SUFFIX + "'></textarea>");
                    labelEditor = $("#" + editorId);

                    // text-align 스타일 적용
                    switch (element.shape.geom.style.get("text-anchor")) {
                        case "start":
                            textAlign = "left";
                            break;
                        case "middle":
                            textAlign = "center";
                            break;
                        case "end":
                            textAlign = "right";
                            break;
                        default:
                            textAlign = "center";
                            break;
                    }

                    if ($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.HTML) {
                        // Html Shape
                        $(labelEditor).css(OG.Util.apply(me._CONFIG.DEFAULT_STYLE.LABEL_EDITOR, {
                            left: left, top: top, width: width, height: height, "text-align": 'left', overflow: "hidden", resize: "none"
                        }));
                        $(labelEditor).focus();
                        $(labelEditor).val(element.shape.html);

                        $(labelEditor).bind({
                            focusout: function () {
                                element.shape.html = this.value;
                                if (element.shape.html) {
                                    me._RENDERER.redrawShape(element);
                                    this.parentNode.removeChild(this);
                                } else {
                                    me._RENDERER.removeShape(element);
                                    this.parentNode.removeChild(this);
                                }
                            }
                        });
                    } else if ($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.TEXT) {
                        // Text Shape
                        $(labelEditor).css(OG.Util.apply(me._CONFIG.DEFAULT_STYLE.LABEL_EDITOR, {
                            left: left, top: top, width: width, height: height, "text-align": textAlign, overflow: "hidden", resize: "none"
                        }));
                        $(labelEditor).focus();
                        $(labelEditor).val(element.shape.text);

                        $(labelEditor).bind({
                            focusout: function () {
                                element.shape.text = this.value;
                                if (element.shape.text) {
                                    me._RENDERER.redrawShape(element);
                                    this.parentNode.removeChild(this);
                                } else {
                                    me._RENDERER.removeShape(element);
                                    this.parentNode.removeChild(this);
                                }
                            }
                        });
                    } else if ($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
                        // Edge Shape
                        if (element.shape.label && me._RENDERER.isSVG()) {
                            $(element).children('[id$=_LABEL]').each(function (idx, item) {
                                $(item).find("text").each(function (idx2, item2) {
                                    bBox = me._RENDERER.getBBox(item2);
                                    left = bBox.x - 10;
                                    top = bBox.y;
                                    width = bBox.width + 20;
                                    height = bBox.height;
                                });
                            });
                        } else {
                            centerOfEdge = getCenterOfEdge(element);
                            left = centerOfEdge.x - me._CONFIG.LABEL_EDITOR_WIDTH / 2;
                            top = centerOfEdge.y - me._CONFIG.LABEL_EDITOR_HEIGHT / 2;
                            width = me._CONFIG.LABEL_EDITOR_WIDTH;
                            height = me._CONFIG.LABEL_EDITOR_HEIGHT;
                        }

                        // 시작점 라벨인 경우
                        $(event.srcElement).parents('[id$=_FROMLABEL]').each(function (idx, item) {
                            $(item).find("text").each(function (idx2, item2) {
                                bBox = me._RENDERER.getBBox(item2);
                                left = bBox.x - 10;
                                top = bBox.y;
                                width = bBox.width + 20;
                                height = bBox.height;
                                fromLabel = element.shape.fromLabel;
                            });
                        });

                        // 끝점 라벨인 경우
                        $(event.srcElement).parents('[id$=_TOLABEL]').each(function (idx, item) {
                            $(item).find("text").each(function (idx2, item2) {
                                bBox = me._RENDERER.getBBox(item2);
                                left = bBox.x - 10;
                                top = bBox.y;
                                width = bBox.width + 20;
                                height = bBox.height;
                                toLabel = element.shape.toLabel;
                            });
                        });

                        $(labelEditor).css(OG.Util.apply(me._CONFIG.DEFAULT_STYLE.LABEL_EDITOR, {
                            left: left * me._CONFIG.SCALE,
                            top: top * me._CONFIG.SCALE,
                            width: width * me._CONFIG.SCALE,
                            height: height * me._CONFIG.SCALE,
                            overflow: "hidden",
                            resize: "none"
                        }));
                        $(labelEditor).focus();

                        if (fromLabel || toLabel) {
                            $(labelEditor).val(fromLabel ? element.shape.fromLabel : element.shape.toLabel);
                        } else {
                            $(labelEditor).val(element.shape.label);
                        }

                        $(labelEditor).bind({
                            focusout: function () {
                                if (fromLabel) {
                                    me._RENDERER.drawEdgeLabel(element, this.value, 'FROM');
                                } else if (toLabel) {
                                    me._RENDERER.drawEdgeLabel(element, this.value, 'TO');
                                } else {
                                    me._RENDERER.drawLabel(element, this.value);
                                }

                                this.parentNode.removeChild(this);
                            }
                        });
                    } else {
                        $(labelEditor).css(OG.Util.apply(me._CONFIG.DEFAULT_STYLE.LABEL_EDITOR, {
                            left: left, top: top, width: width, height: height, "text-align": textAlign, overflow: "hidden", resize: "none"
                        }));
                        $(labelEditor).focus();
                        $(labelEditor).val(element.shape.label);

                        $(labelEditor).bind({
                            focusout: function () {
                                me._RENDERER.drawLabel(element, this.value);
                                this.parentNode.removeChild(this);
                            }
                        });
                    }
                }
            }
        });
    },

    /**
     * 주어진 Shape Element 를 연결가능하도록 한다.
     *
     * @param {Element} element Shape Element
     */
    enableConnect: function (element) {
        var me = this, terminalGroup, root = me._RENDERER.getRootGroup();

        $(element).bind({
            mouseover: function () {
                if (element.shape.isCollapsed === false) {
                    terminalGroup = me._RENDERER.drawTerminal(element,
                        $(root).data("dragged_guide") === "to" ? OG.Constants.TERMINAL_TYPE.IN : OG.Constants.TERMINAL_TYPE.OUT);

                    if (terminalGroup && terminalGroup.terminal && terminalGroup.terminal.childNodes.length > 0) {
                        // 센터 연결 터미널 찾기
                        if ($(root).data("edge")) {
                            $.each(terminalGroup.terminal.childNodes, function (idx, item) {
                                var fromTerminal = $(root).data("from_terminal"),
                                    fromShape = fromTerminal && OG.Util.isElement(fromTerminal) ? me._getShapeFromTerminal(fromTerminal) : null,
                                    isSelf = element && fromShape && element.id === fromShape.id;

                                if (item.terminal && item.terminal.direction.toLowerCase() === "c"
                                    && (($(root).data("dragged_guide") === "to" && item.terminal.inout.indexOf(OG.Constants.TERMINAL_TYPE.IN) >= 0) ||
                                    ($(root).data("dragged_guide") === "from" && item.terminal.inout.indexOf(OG.Constants.TERMINAL_TYPE.OUT) >= 0))
                                    && (!isSelf || me._isSelfConnectable(element.shape))) {
                                    me._RENDERER.drawDropOverGuide(element);
                                    $(root).data("edge_terminal", item);
                                    return false;
                                }
                            });
                        }

                        $(terminalGroup.bBox).bind({
                            mouseout: function () {
                                if (!$(root).data("edge")) {
                                    me._RENDERER.removeTerminal(element);
                                }
                            }
                        });

                        $.each(terminalGroup.terminal.childNodes, function (idx, item) {
                            if (item.terminal) {
                                $(item).bind({
                                    mouseover: function (event) {
                                        var fromTerminal = $(root).data("from_terminal"),
                                            fromShape = fromTerminal && OG.Util.isElement(fromTerminal) ? me._getShapeFromTerminal(fromTerminal) : null,
                                            isSelf = element && fromShape && element.id === fromShape.id;

                                        if ((($(root).data("dragged_guide") === "to" && item.terminal.inout.indexOf(OG.Constants.TERMINAL_TYPE.IN) >= 0) ||
                                            ($(root).data("dragged_guide") === "from" && item.terminal.inout.indexOf(OG.Constants.TERMINAL_TYPE.OUT) >= 0) ||
                                            (!$(root).data("dragged_guide") && item.terminal.inout.indexOf(OG.Constants.TERMINAL_TYPE.OUT) >= 0))
                                            && (!isSelf || me._isSelfConnectable(element.shape))) {
                                            me._RENDERER.setAttr(item, me._CONFIG.DEFAULT_STYLE.TERMINAL_OVER);
                                            $(root).data("edge_terminal", item);
                                        }
                                    },
                                    mouseout: function () {
                                        me._RENDERER.setAttr(item, me._CONFIG.DEFAULT_STYLE.TERMINAL);
                                        $(root).removeData("edge_terminal");
                                    }
                                });

                                $(item).draggable({
                                    start: function (event) {
                                        var x = item.terminal.position.x, y = item.terminal.position.y,
                                            edge = me._RENDERER.drawShape(null, new OG.EdgeShape([x, y], [x, y]), null,
                                                me._CONFIG.DEFAULT_STYLE.EDGE_SHADOW);

                                        $(root).data("edge", edge);
                                        $(root).data("from_terminal", item);
                                        $(root).data("dragged_guide", "to");

                                        me._RENDERER.removeRubberBand(me._RENDERER.getRootElement());
                                        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (n, selectedItem) {
                                            if (selectedItem.id) {
                                                me._RENDERER.removeGuide(selectedItem);
                                            }
                                        });
                                    },
                                    drag: function (event) {
                                        var eventOffset = me._getOffset(event),
                                            edge = $(root).data("edge"),
                                            fromTerminal = $(root).data("from_terminal"),
                                            toTerminal = $(root).data("edge_terminal"),
                                            fromXY = [fromTerminal.terminal.position.x, fromTerminal.terminal.position.y],
                                            toXY = toTerminal ?
                                                [toTerminal.terminal.position.x, toTerminal.terminal.position.y] :
                                                [eventOffset.x, eventOffset.y],
                                            fromDrct = fromTerminal.terminal.direction.toLowerCase(),
                                            toDrct = toTerminal ? toTerminal.terminal.direction.toLowerCase() : "c",
                                            toShape = toTerminal ? me._getShapeFromTerminal(toTerminal) : null,
                                            orgFromXY, orgToXY, intersectionInfo, isSelf;

                                        $(this).css({"position": "", "left": "", "top": ""});

                                        // backup edge-direction
                                        orgFromXY = fromXY;
                                        orgToXY = toXY;

                                        // direction 이 c 인 경우에 대한 처리(센터 연결)
                                        if (!element.shape.geom.getBoundary().isContains(toXY) && fromDrct === "c") {
                                            intersectionInfo = me._RENDERER.intersectionEdge(
                                                edge.shape.geom.style.get("edge-type"), element, [orgFromXY[0], orgFromXY[1]], [orgToXY[0], orgToXY[1]], true
                                            );
                                            fromXY = intersectionInfo.position;
                                            fromDrct = intersectionInfo.direction;
                                        }
                                        if (toShape && toDrct === "c") {
                                            intersectionInfo = me._RENDERER.intersectionEdge(
                                                edge.shape.geom.style.get("edge-type"), toShape, [orgFromXY[0], orgFromXY[1]], [orgToXY[0], orgToXY[1]], false
                                            );
                                            toXY = intersectionInfo.position;
                                            toDrct = intersectionInfo.direction;
                                        }

                                        isSelf = element && toShape && element.id === toShape.id;
                                        if (isSelf) {
                                            fromXY = toXY = element.shape.geom.getBoundary().getRightCenter();
                                        }

                                        if (!isSelf || me._isSelfConnectable(element.shape)) {
                                            me._RENDERER.drawEdge(new OG.Line(fromXY, toXY),
                                                OG.Util.apply(edge.shape.geom.style.map, {"edge-direction": fromDrct + " " + toDrct}), edge.id, isSelf);
                                        }
                                    },
                                    stop: function (event) {
                                        var to = me._getOffset(event),
                                            edge = $(root).data("edge"),
                                            fromTerminal = $(root).data("from_terminal"),
                                            toTerminal = $(root).data("edge_terminal") || [to.x, to.y],
                                            toShape = OG.Util.isElement(toTerminal) ? me._getShapeFromTerminal(toTerminal) : null,
                                            boundary, clonedElement, terminalGroup, childTerminals, guide, i, isSelf;

                                        $(this).css({"position": "absolute", "left": "0px", "top": "0px"});

                                        // 연결대상이 없으면 복사후 연결
                                        if (!$(root).data("edge_terminal") && me._isConnectCloneable(element.shape)) {
                                            boundary = element.shape.geom.getBoundary();
                                            clonedElement = me._RENDERER.drawShape([to.x, to.y], element.shape.clone(),
                                                [boundary.getWidth(), boundary.getHeight()], element.shapeStyle);

                                            // enable event
                                            me.setClickSelectable(clonedElement, me._isSelectable(clonedElement.shape));
                                            me.setMovable(clonedElement, me._isMovable(clonedElement.shape));
                                            if (me._CONFIG.GROUP_DROPABLE && clonedElement.shape.GROUP_DROPABLE) {
                                                me.enableDragAndDropGroup(clonedElement);
                                            }
                                            if (me._CONFIG.GROUP_COLLAPSIBLE && clonedElement.shape.GROUP_COLLAPSIBLE) {
                                                me.enableCollapse(clonedElement);
                                            }
                                            if (me._isConnectable(clonedElement.shape)) {
                                                me.enableConnect(clonedElement);
                                            }
                                            if (me._isLabelEditable(clonedElement.shape)) {
                                                me.enableEditLabel(clonedElement);
                                            }

                                            // 센터 연결 터미널 찾기
                                            terminalGroup = me._RENDERER.drawTerminal(clonedElement, OG.Constants.TERMINAL_TYPE.IN);
                                            childTerminals = terminalGroup.terminal.childNodes;
                                            toTerminal = childTerminals[0];
                                            for (i = 0; i < childTerminals.length; i++) {
                                                if (childTerminals[i].terminal && childTerminals[i].terminal.direction.toLowerCase() === "c") {
                                                    toTerminal = childTerminals[i];
                                                    break;
                                                }
                                            }
                                        }

                                        isSelf = element && toShape && element.id === toShape.id;

                                        if (toTerminal && (OG.Util.isElement(toTerminal) || !me._isConnectRequired(element.shape))
                                            && (!isSelf || me._isSelfConnectable(element.shape))) {
                                            // connect
                                            edge = me._RENDERER.connect(fromTerminal, toTerminal, edge);
                                            if (edge) {
                                                guide = me._RENDERER.drawGuide(edge);

                                                if (edge && guide) {
                                                    // enable event
                                                    me.setClickSelectable(edge, me._isSelectable(edge.shape));
                                                    me.setMovable(edge, me._isMovable(edge.shape));
                                                    me.setResizable(edge, guide, me._isResizable(edge.shape));
                                                    if (me._isLabelEditable(edge.shape)) {
                                                        me.enableEditLabel(edge);
                                                    }

                                                    me._RENDERER.toFront(guide.group);
                                                }
                                            }
                                        } else {
                                            me._RENDERER.removeShape(edge);
                                        }

                                        // clear
                                        $(root).removeData("edge");
                                        $(root).removeData("from_terminal");
                                        $(root).removeData("edge_terminal");
                                        $(root).removeData("dragged_guide");
                                        if (toShape) {
                                            me._RENDERER.remove(toShape.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
                                        }
                                    }
                                });
                            }
                        });
                    } else {
                        me._RENDERER.removeTerminal(element);
                    }
                }
            },
            mouseout: function (event) {
                if ($(element).attr("_shape") !== OG.Constants.SHAPE_TYPE.EDGE && $(root).data("edge")) {
                    me._RENDERER.remove(element.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
                    $(root).removeData("edge_terminal");
                }
            }
        });
    },

    /**
     * 주어진 Shape Element 를 Drag & Drop 으로 그룹핑 가능하도록 한다.
     *
     * @param {Element} element Shape Element
     */
    enableDragAndDropGroup: function (element) {
        var me = this, root = me._RENDERER.getRootGroup(), isSelf;
        if (element && $(element).attr("_shape") === OG.Constants.SHAPE_TYPE.GROUP) {
            $(element).bind({
                mouseover: function () {
                    if (element.shape.isCollapsed === false) {
                        // Drag & Drop 하여 그룹핑하는 경우 가이드 표시
                        if ($(root).data("bBoxArray")) {
                            isSelf = false;
                            $.each($(root).data("bBoxArray"), function (idx, item) {
                                if (element.id === item.id) {
                                    isSelf = true;
                                }
                            });

                            if (!isSelf) {
                                $(root).data("groupTarget", element);
                                me._RENDERER.drawDropOverGuide(element);
                            }
                        }
                    }
                },
                mouseout: function (event) {
                    // Drag & Drop 하여 그룹핑하는 경우 가이드 제거
                    me._RENDERER.remove(element.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
                    $(root).removeData("groupTarget");
                }
            });
        }
    },

    /**
     * 주어진 Shape Element 를 Collapse/Expand 가능하도록 한다.
     *
     * @param {Element} element Shape Element
     */
    enableCollapse: function (element) {
        var me = this, collapseObj, clickHandle;

        clickHandle = function (_element, _collapsedOjb) {
            if (_collapsedOjb && _collapsedOjb.bBox && _collapsedOjb.collapse) {
                $(_collapsedOjb.collapse).bind("click", function (event) {
                    if (_element.shape.isCollapsed === true) {
                        me._RENDERER.expand(_element);
                        _collapsedOjb = me._RENDERER.drawCollapseGuide(_element);
                        clickHandle(_element, _collapsedOjb);
                    } else {
                        me._RENDERER.collapse(_element);
                        _collapsedOjb = me._RENDERER.drawCollapseGuide(_element);
                        clickHandle(_element, _collapsedOjb);
                    }
                });

                $(_collapsedOjb.bBox).bind("mouseout", function (event) {
                    me._RENDERER.remove(_element.id + OG.Constants.COLLAPSE_BBOX);
                    me._RENDERER.remove(_element.id + OG.Constants.COLLAPSE_SUFFIX);
                });
            }
        };

        if (element && $(element).attr("_shape") === OG.Constants.SHAPE_TYPE.GROUP) {
            $(element).bind({
                mouseover: function () {
                    collapseObj = me._RENDERER.drawCollapseGuide(this);
                    if (collapseObj && collapseObj.bBox && collapseObj.collapse) {
                        clickHandle(element, collapseObj);
                    }
                }
            });
        }
    },

    /**
     * Shape 엘리먼트의 이동 가능여부를 설정한다.
     *
     * @param {Element} element Shape 엘리먼트
     * @param {Boolean} isMovable 가능여부
     */
    setMovable: function (element, isMovable) {
        var me = this, root = me._RENDERER.getRootGroup();

        if (!element) {
            return;
        }
        if (isMovable === true) {
            // move handle
            $(element).draggable({
                start: function (event) {
                    var eventOffset = me._getOffset(event), guide;

                    // 선택되지 않은 Shape 을 drag 시 다른 모든 Shape 은 deselect 처리
                    if (me._RENDERER.getElementById(element.id + OG.Constants.GUIDE_SUFFIX.GUIDE) === null) {
                        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, item) {
                            if (OG.Util.isElement(item) && item.id) {
                                me._RENDERER.removeGuide(item);
                            }
                        });
                        me._RENDERER.removeAllTerminal();
                    }

                    // redraw guide
                    me._RENDERER.removeGuide(element);
                    guide = me._RENDERER.drawGuide(element);

                    $(this).data("start", {x: eventOffset.x, y: eventOffset.y});
                    $(this).data("offset", {
                        x: eventOffset.x - me._num(me._RENDERER.getAttr(guide.bBox, "x")),
                        y: eventOffset.y - me._num(me._RENDERER.getAttr(guide.bBox, "y"))
                    });

                    $(root).data("bBoxArray", me._getMoveTargets());
                    me._RENDERER.removeRubberBand(me._RENDERER.getRootElement());
                    me._RENDERER.removeAllTerminal();
                },
                drag: function (event) {
                    var eventOffset = me._getOffset(event),
                        start = $(this).data("start"),
                        bBoxArray = $(root).data("bBoxArray"),
                        dx = me._grid(eventOffset.x - start.x),
                        dy = me._grid(eventOffset.y - start.y);

                    // Canvas 영역을 벗어나서 드래그되는 경우 Canvas 확장
                    me._autoExtend(eventOffset.x, eventOffset.y);

                    $(this).css({"position": "", "left": "", "top": ""});
                    $.each(bBoxArray, function (k, item) {
                        me._RENDERER.setAttr(item.box, {transform: "t" + dx + "," + dy});
                    });
                    me._RENDERER.removeAllTerminal();
                },
                stop: function (event) {
                    var eventOffset = me._getOffset(event),
                        start = $(this).data("start"),
                        bBoxArray = $(root).data("bBoxArray"),
                        dx = me._grid(eventOffset.x - start.x),
                        dy = me._grid(eventOffset.y - start.y),
                        groupTarget = $(root).data("groupTarget"),
                        eleArray,
                        guide;

                    // 이동 처리
                    $(this).css({"position": "", "left": "", "top": ""});
                    eleArray = me._moveElements(bBoxArray, dx, dy);

                    // group target 이 있는 경우 grouping 처리
                    if (groupTarget && OG.Util.isElement(groupTarget)) {
                        // grouping
                        me._RENDERER.addToGroup(groupTarget, eleArray);

                        // guide
                        $.each(eleArray, function (k, item) {
                            me._RENDERER.removeGuide(item);
                        });
                        guide = me._RENDERER.drawGuide(groupTarget);
                        // enable event
                        me.setResizable(groupTarget, guide, me._isResizable(groupTarget.shape));
                        me._RENDERER.toFront(guide.group);

                        me._RENDERER.remove(groupTarget.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
                        $(root).removeData("groupTarget");
                    } else {
                        // ungrouping
                        me._RENDERER.addToGroup(root, eleArray);

                        // guide
                        $.each(eleArray, function (k, item) {
                            me._RENDERER.removeGuide(item);
                            guide = me._RENDERER.drawGuide(item);
                            // enable event
                            me.setResizable(item, guide, me._isResizable(item.shape));
                            me._RENDERER.toFront(guide.group);
                        });
                    }

                    $(root).removeData("bBoxArray");
                }
            });
            me._RENDERER.setAttr(element, {cursor: 'move'});
            OG.Util.apply(element.shape.geom.style.map, {cursor: 'move'});
        } else {
            $(element).draggable("destroy");
            me._RENDERER.setAttr(element, {cursor: me._isSelectable(element.shape) ? 'pointer' : me._CONFIG.DEFAULT_STYLE.SHAPE.cursor});
            OG.Util.apply(element.shape.geom.style.map, {cursor: me._isSelectable(element.shape) ? 'pointer' : me._CONFIG.DEFAULT_STYLE.SHAPE.cursor});
        }
    },

    /**
     * Shape 엘리먼트의 리사이즈 가능여부를 설정한다.
     *
     * @param {Element} element Shape 엘리먼트
     * @param {Object} guide JSON 포맷 가이드 정보
     * @param {Boolean} isResizable 가능여부
     */
    setResizable: function (element, guide, isResizable) {
        var me = this, root = me._RENDERER.getRootGroup();

        if (!element || !guide) {
            return;
        }

        if (isResizable === true) {
            if ($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
                // resize handle
                $(guide.from).draggable({
                    start: function (event) {
                        var isBezier, vertices, _style = {},
                            toTerminalId = $(element).attr("_to"), toShape, toTerminal, edge;

                        _style = OG.Util.apply(_style, me._CONFIG.DEFAULT_STYLE.EDGE_SHADOW, element.shape.geom.style.map);
                        isBezier = _style["edge-type"].toLowerCase() === OG.Constants.EDGE_TYPE.BEZIER;

                        vertices = isBezier ? element.shape.geom.getControlPoints() : element.shape.geom.getVertices();
                        edge = me._RENDERER.drawEdge(isBezier ? new OG.BezierCurve(vertices) : new OG.PolyLine(vertices), _style);

                        toTerminal = [vertices[vertices.length - 1].x, vertices[vertices.length - 1].y];

                        if (toTerminalId) {
                            toShape = me._getShapeFromTerminal(toTerminalId);
                            me._RENDERER.drawTerminal(toShape);
                            toTerminal = me._RENDERER.getElementById(toTerminalId);
                        }

                        $(root).data("to_terminal", toTerminal);
                        $(root).data("edge", edge);
                        $(root).data("dragged_guide", "from");

                        me._RENDERER.removeRubberBand(me._RENDERER.getRootElement());
                        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (n, selectedItem) {
                            if (selectedItem.id && $(selectedItem).attr("_shape") !== OG.Constants.SHAPE_TYPE.EDGE) {
                                me._RENDERER.removeGuide(selectedItem);
                            }
                        });
                    },
                    drag: function (event) {
                        var eventOffset = me._getOffset(event),
                            edge = $(root).data("edge"),
                            fromTerminal = $(root).data("edge_terminal"),
                            toTerminal = $(root).data("to_terminal"),
                            fromXY = fromTerminal ?
                                [fromTerminal.terminal.position.x, fromTerminal.terminal.position.y] : [eventOffset.x, eventOffset.y],
                            toXY = OG.Util.isElement(toTerminal) ?
                                [toTerminal.terminal.position.x, toTerminal.terminal.position.y] : toTerminal,
                            fromDrct = fromTerminal ? fromTerminal.terminal.direction.toLowerCase() : "c",
                            toDrct = OG.Util.isElement(toTerminal) ? toTerminal.terminal.direction.toLowerCase() : "c",
                            fromShape = fromTerminal ? me._getShapeFromTerminal(fromTerminal) : null,
                            toShape = OG.Util.isElement(toTerminal) ? me._getShapeFromTerminal(toTerminal) : null,
                            orgFromXY, orgToXY, intersectionInfo, isSelf;

                        $(this).css({"position": "", "left": "", "top": ""});

                        // backup edge-direction
                        orgFromXY = fromXY;
                        orgToXY = toXY;

                        // direction 이 c 인 경우에 대한 처리(센터 연결)
                        if (fromShape && fromDrct === "c") {
                            intersectionInfo = me._RENDERER.intersectionEdge(
                                edge.geom.style.get("edge-type"), fromShape, [orgFromXY[0], orgFromXY[1]], [orgToXY[0], orgToXY[1]], true
                            );
                            fromXY = intersectionInfo.position;
                            fromDrct = intersectionInfo.direction;
                        }
                        if (toShape && toDrct === "c") {
                            intersectionInfo = me._RENDERER.intersectionEdge(
                                edge.geom.style.get("edge-type"), toShape, [orgFromXY[0], orgFromXY[1]], [orgToXY[0], orgToXY[1]], false
                            );
                            toXY = intersectionInfo.position;
                            toDrct = intersectionInfo.direction;
                        }

                        isSelf = fromShape && toShape && fromShape.id === toShape.id;
                        if (isSelf) {
                            fromXY = toXY = fromShape.shape.geom.getBoundary().getRightCenter();
                        }

                        if (!isSelf || me._isSelfConnectable(fromShape.shape)) {
                            me._RENDERER.drawEdge(new OG.Line(fromXY, toXY),
                                OG.Util.apply(edge.geom.style.map, {"edge-direction": fromDrct + " " + toDrct}), edge.id, isSelf);
                        }
                    },
                    stop: function (event) {
                        var eventOffset = me._getOffset(event),
                            fromTerminal = $(root).data("edge_terminal") || [eventOffset.x, eventOffset.y],
                            toTerminal = $(root).data("to_terminal"),
                            fromShape = OG.Util.isElement(fromTerminal) ? me._getShapeFromTerminal(fromTerminal) : null,
                            toShape = OG.Util.isElement(toTerminal) ? me._getShapeFromTerminal(toTerminal) : null,
                            edge = $(root).data("edge"), isSelf;

                        $(this).css({"position": "absolute", "left": "0px", "top": "0px"});

                        // clear
                        $(root).removeData("to_terminal");
                        $(root).removeData("edge");
                        $(root).removeData("edge_terminal");
                        $(root).removeData("dragged_guide");
                        me._RENDERER.remove(edge);
                        me._RENDERER.removeGuide(element);
                        if (fromShape) {
                            me._RENDERER.remove(fromShape.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
                        }

                        isSelf = fromShape && toShape && fromShape.id === toShape.id;

                        if (!isSelf || me._isSelfConnectable(fromShape.shape)) {
                            // draw
                            element = me._RENDERER.connect(fromTerminal, toTerminal, element, element.shape.geom.style);
                            if (element) {
                                guide = me._RENDERER.drawGuide(element);
                                if (element && guide) {
                                    me.setResizable(element, guide, true);
                                    me._RENDERER.toFront(guide.group);
                                }
                            }
                        }
                    }
                });

                $(guide.to).draggable({
                    start: function (event) {
                        var isBezier, vertices, _style = {},
                            fromTerminalId = $(element).attr("_from"), fromShape, fromTerminal, edge;

                        _style = OG.Util.apply(_style, me._CONFIG.DEFAULT_STYLE.EDGE_SHADOW, element.shape.geom.style.map);
                        isBezier = _style["edge-type"].toLowerCase() === OG.Constants.EDGE_TYPE.BEZIER;

                        vertices = isBezier ? element.shape.geom.getControlPoints() : element.shape.geom.getVertices();
                        edge = me._RENDERER.drawEdge(isBezier ? new OG.BezierCurve(vertices) : new OG.PolyLine(vertices), _style);

                        fromTerminal = [vertices[0].x, vertices[0].y];

                        if (fromTerminalId) {
                            fromShape = me._getShapeFromTerminal(fromTerminalId);
                            me._RENDERER.drawTerminal(fromShape);
                            fromTerminal = me._RENDERER.getElementById(fromTerminalId);
                        }

                        $(root).data("from_terminal", fromTerminal);
                        $(root).data("edge", edge);
                        $(root).data("dragged_guide", "to");

                        me._RENDERER.removeRubberBand(me._RENDERER.getRootElement());
                        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (n, selectedItem) {
                            if (selectedItem.id && $(selectedItem).attr("_shape") !== OG.Constants.SHAPE_TYPE.EDGE) {
                                me._RENDERER.removeGuide(selectedItem);
                            }
                        });
                    },
                    drag: function (event) {
                        var eventOffset = me._getOffset(event),
                            edge = $(root).data("edge"),
                            fromTerminal = $(root).data("from_terminal"),
                            toTerminal = $(root).data("edge_terminal"),
                            fromXY = OG.Util.isElement(fromTerminal) ?
                                [fromTerminal.terminal.position.x, fromTerminal.terminal.position.y] : fromTerminal,
                            toXY = toTerminal ?
                                [toTerminal.terminal.position.x, toTerminal.terminal.position.y] : [eventOffset.x, eventOffset.y],
                            fromDrct = OG.Util.isElement(fromTerminal) ? fromTerminal.terminal.direction.toLowerCase() : "c",
                            toDrct = toTerminal ? toTerminal.terminal.direction.toLowerCase() : "c",
                            fromShape = OG.Util.isElement(fromTerminal) ? me._getShapeFromTerminal(fromTerminal) : null,
                            toShape = toTerminal ? me._getShapeFromTerminal(toTerminal) : null,
                            orgFromXY, orgToXY, intersectionInfo, isSelf;

                        $(this).css({"position": "", "left": "", "top": ""});

                        // backup edge-direction
                        orgFromXY = fromXY;
                        orgToXY = toXY;

                        // direction 이 c 인 경우에 대한 처리(센터 연결)
                        if (fromShape && fromDrct === "c") {
                            intersectionInfo = me._RENDERER.intersectionEdge(
                                edge.geom.style.get("edge-type"), fromShape, [orgFromXY[0], orgFromXY[1]], [orgToXY[0], orgToXY[1]], true
                            );
                            fromXY = intersectionInfo.position;
                            fromDrct = intersectionInfo.direction;
                        }
                        if (toShape && toDrct === "c") {
                            intersectionInfo = me._RENDERER.intersectionEdge(
                                edge.geom.style.get("edge-type"), toShape, [orgFromXY[0], orgFromXY[1]], [orgToXY[0], orgToXY[1]], false
                            );
                            toXY = intersectionInfo.position;
                            toDrct = intersectionInfo.direction;
                        }

                        isSelf = (fromShape !== null) && (toShape !== null) && fromShape.id === toShape.id;
                        if (isSelf) {
                            fromXY = toXY = toShape.shape.geom.getBoundary().getRightCenter();
                        }

                        if (!isSelf || me._isSelfConnectable(toShape.shape)) {
                            me._RENDERER.drawEdge(new OG.Line(fromXY, toXY),
                                OG.Util.apply(edge.geom.style.map, {"edge-direction": fromDrct + " " + toDrct}), edge.id, isSelf);
                        }
                    },
                    stop: function (event) {
                        var eventOffset = me._getOffset(event),
                            fromTerminal = $(root).data("from_terminal"),
                            toTerminal = $(root).data("edge_terminal") || [eventOffset.x, eventOffset.y],
                            fromShape = OG.Util.isElement(fromTerminal) ? me._getShapeFromTerminal(fromTerminal) : null,
                            toShape = OG.Util.isElement(toTerminal) ? me._getShapeFromTerminal(toTerminal) : null,
                            edge = $(root).data("edge"), isSelf;

                        $(this).css({"position": "absolute", "left": "0px", "top": "0px"});

                        // clear
                        $(root).removeData("from_terminal");
                        $(root).removeData("edge");
                        $(root).removeData("edge_terminal");
                        $(root).removeData("dragged_guide");
                        me._RENDERER.remove(edge);
                        me._RENDERER.removeGuide(element);
                        if (toShape) {
                            me._RENDERER.remove(toShape.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
                        }

                        isSelf = fromShape && toShape && fromShape.id === toShape.id;

                        if (!isSelf || me._isSelfConnectable(toShape.shape)) {
                            // draw
                            element = me._RENDERER.connect(fromTerminal, toTerminal, element, element.shape.geom.style);
                            if (element) {
                                guide = me._RENDERER.drawGuide(element);
                                if (guide) {
                                    me.setResizable(element, guide, true);
                                    me._RENDERER.toFront(guide.group);
                                }
                            }
                        }
                    }
                });

                $.each(guide.controls, function (idx, item) {
                    $(item).draggable({
                        start: function (event) {
                            var eventOffset = me._getOffset(event);
                            $(this).data("start", {x: eventOffset.x, y: eventOffset.y});
                            $(this).data("offset", {
                                x: eventOffset.x - me._num(me._RENDERER.getAttr(item, "x")),
                                y: eventOffset.y - me._num(me._RENDERER.getAttr(item, "y"))
                            });
                            me._RENDERER.remove(guide.bBox);
                            me._RENDERER.removeRubberBand(me._RENDERER.getRootElement());
                        },
                        drag: function (event) {
                            var eventOffset = me._getOffset(event),
                                start = $(this).data("start"),
                                offset = $(this).data("offset"),
                                newX = eventOffset.x - offset.x,
                                newY = eventOffset.y - offset.y,
                                vertices = element.shape.geom.getVertices(),
                                isHorizontal = item.id.indexOf(OG.Constants.GUIDE_SUFFIX.CTL_H) >= 0,
                                num = isHorizontal ?
                                    parseInt(item.id.replace(element.id + OG.Constants.GUIDE_SUFFIX.CTL_H, ""), 10) :
                                    parseInt(item.id.replace(element.id + OG.Constants.GUIDE_SUFFIX.CTL_V, ""), 10);

                            $(this).css({"position": "", "left": "", "top": ""});

                            if (isHorizontal) {
                                vertices[num].x = newX;
                                vertices[num + 1].x = newX;
                            } else {
                                vertices[num].y = newY;
                                vertices[num + 1].y = newY;
                            }

                            element = me._RENDERER.drawEdge(new OG.PolyLine(vertices), element.shape.geom.style, element.id);
                            me._RENDERER.drawGuide(element);

                            me._RENDERER.removeAllTerminal();

                            // Draw Label
                            me._RENDERER.drawLabel(element);
                            me._RENDERER.drawEdgeLabel(element, null, 'FROM');
                            me._RENDERER.drawEdgeLabel(element, null, 'TO');
                        },
                        stop: function (event) {
                            var eventOffset = me._getOffset(event),
                                start = $(this).data("start"),
                                offset = $(this).data("offset"),
                                newX = eventOffset.x - offset.x,
                                newY = eventOffset.y - offset.y,
                                vertices = element.shape.geom.getVertices(),
                                isHorizontal = item.id.indexOf(OG.Constants.GUIDE_SUFFIX.CTL_H) >= 0,
                                num = isHorizontal ?
                                    parseInt(item.id.replace(element.id + OG.Constants.GUIDE_SUFFIX.CTL_H, ""), 10) :
                                    parseInt(item.id.replace(element.id + OG.Constants.GUIDE_SUFFIX.CTL_V, ""), 10);

                            $(this).css({"position": "absolute", "left": "0px", "top": "0px"});

                            if (isHorizontal) {
                                vertices[num].x = newX;
                                vertices[num + 1].x = newX;
                            } else {
                                vertices[num].y = newY;
                                vertices[num + 1].y = newY;
                            }

                            element = me._RENDERER.drawEdge(new OG.PolyLine(vertices), element.shape.geom.style, element.id);
                            me._RENDERER.drawGuide(element);

                            // Draw Label
                            me._RENDERER.drawLabel(element);
                            me._RENDERER.drawEdgeLabel(element, null, 'FROM');
                            me._RENDERER.drawEdgeLabel(element, null, 'TO');
                        }
                    });
                });
            } else {
                // resize handle
                $(guide.rc).draggable({
                    start: function (event) {
                        var eventOffset = me._getOffset(event);
                        $(this).data("start", {x: eventOffset.x, y: eventOffset.y});
                        $(this).data("offset", {
                            x: eventOffset.x - me._num(me._RENDERER.getAttr(guide.rc, "x")),
                            y: eventOffset.y - me._num(me._RENDERER.getAttr(guide.rc, "y"))
                        });
                        me._RENDERER.removeRubberBand(me._RENDERER.getRootElement());
                    },
                    drag: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            offset = $(this).data("offset"),
                            newX = me._grid(eventOffset.x - offset.x),
                            newWidth = me._grid(newX - me._num(me._RENDERER.getAttr(guide.lc, "x")));
                        $(this).css({"position": "", "left": "", "top": ""});
                        if (newWidth >= me._CONFIG.GUIDE_MIN_SIZE) {
                            me._RENDERER.setAttr(guide.rc, {x: newX});
                            me._RENDERER.setAttr(guide.ur, {x: newX});
                            me._RENDERER.setAttr(guide.lr, {x: newX});
                            me._RENDERER.setAttr(guide.uc, {x: OG.Util.round((me._num(me._RENDERER.getAttr(guide.lc, "x")) + newX) / 2)});
                            me._RENDERER.setAttr(guide.lwc, {x: OG.Util.round((me._num(me._RENDERER.getAttr(guide.lc, "x")) + newX) / 2)});
                            me._RENDERER.setAttr(guide.bBox, {width: newWidth});
                        }
                        me._RENDERER.removeAllTerminal();
                    },
                    stop: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            dx = eventOffset.x - start.x;
                        $(this).css({"position": "absolute", "left": "0px", "top": "0px"});
                        if (element && element.shape.geom) {
                            // resizing
                            if (element.shape.geom.getBoundary().getWidth() + dx < me._CONFIG.GUIDE_MIN_SIZE) {
                                dx = me._CONFIG.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getWidth();
                            }
                            me._RENDERER.resize(element, [0, 0, 0, me._grid(dx)]);
                            me._RENDERER.drawGuide(element);
                        }
                    }
                });

                $(guide.lwc).draggable({
                    start: function (event) {
                        var eventOffset = me._getOffset(event);
                        $(this).data("start", {x: eventOffset.x, y: eventOffset.y});
                        $(this).data("offset", {
                            x: eventOffset.x - me._num(me._RENDERER.getAttr(guide.lwc, "x")),
                            y: eventOffset.y - me._num(me._RENDERER.getAttr(guide.lwc, "y"))
                        });
                        me._RENDERER.removeRubberBand(me._RENDERER.getRootElement());
                    },
                    drag: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            offset = $(this).data("offset"),
                            newY = me._grid(eventOffset.y - offset.y),
                            newHeight = me._grid(newY - me._num(me._RENDERER.getAttr(guide.uc, "y")));
                        $(this).css({"position": "", "left": "", "top": ""});
                        if (newHeight >= me._CONFIG.GUIDE_MIN_SIZE) {
                            me._RENDERER.setAttr(guide.lwc, {y: newY});
                            me._RENDERER.setAttr(guide.ll, {y: newY});
                            me._RENDERER.setAttr(guide.lr, {y: newY});
                            me._RENDERER.setAttr(guide.lc, {y: OG.Util.round((me._num(me._RENDERER.getAttr(guide.uc, "y")) + newY) / 2)});
                            me._RENDERER.setAttr(guide.rc, {y: OG.Util.round((me._num(me._RENDERER.getAttr(guide.uc, "y")) + newY) / 2)});
                            me._RENDERER.setAttr(guide.bBox, {height: newHeight});
                        }
                        me._RENDERER.removeAllTerminal();
                    },
                    stop: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            dy = eventOffset.y - start.y;
                        $(this).css({"position": "absolute", "left": "0px", "top": "0px"});
                        if (element && element.shape.geom) {
                            // resizing
                            if (element.shape.geom.getBoundary().getHeight() + dy < me._CONFIG.GUIDE_MIN_SIZE) {
                                dy = me._CONFIG.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getHeight();
                            }
                            me._RENDERER.resize(element, [0, me._grid(dy), 0, 0]);
                            me._RENDERER.drawGuide(element);
                        }
                    }
                });

                $(guide.lr).draggable({
                    start: function (event) {
                        var eventOffset = me._getOffset(event);
                        $(this).data("start", {x: eventOffset.x, y: eventOffset.y});
                        $(this).data("offset", {
                            x: eventOffset.x - me._num(me._RENDERER.getAttr(guide.lr, "x")),
                            y: eventOffset.y - me._num(me._RENDERER.getAttr(guide.lr, "y"))
                        });
                        me._RENDERER.removeRubberBand(me._RENDERER.getRootElement());
                    },
                    drag: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            offset = $(this).data("offset"),
                            newX = me._grid(eventOffset.x - offset.x),
                            newWidth = me._grid(newX - me._num(me._RENDERER.getAttr(guide.lc, "x"))),
                            newY = me._grid(eventOffset.y - offset.y),
                            newHeight = me._grid(newY - me._num(me._RENDERER.getAttr(guide.uc, "y")));
                        $(this).css({"position": "", "left": "", "top": ""});
                        if (newWidth >= me._CONFIG.GUIDE_MIN_SIZE) {
                            me._RENDERER.setAttr(guide.rc, {x: newX});
                            me._RENDERER.setAttr(guide.ur, {x: newX});
                            me._RENDERER.setAttr(guide.lr, {x: newX});
                            me._RENDERER.setAttr(guide.uc, {x: OG.Util.round((me._num(me._RENDERER.getAttr(guide.lc, "x")) + newX) / 2)});
                            me._RENDERER.setAttr(guide.lwc, {x: OG.Util.round((me._num(me._RENDERER.getAttr(guide.lc, "x")) + newX) / 2)});
                            me._RENDERER.setAttr(guide.bBox, {width: newWidth});
                        }
                        if (newHeight >= me._CONFIG.GUIDE_MIN_SIZE) {
                            me._RENDERER.setAttr(guide.lwc, {y: newY});
                            me._RENDERER.setAttr(guide.ll, {y: newY});
                            me._RENDERER.setAttr(guide.lr, {y: newY});
                            me._RENDERER.setAttr(guide.lc, {y: OG.Util.round((me._num(me._RENDERER.getAttr(guide.uc, "y")) + newY) / 2)});
                            me._RENDERER.setAttr(guide.rc, {y: OG.Util.round((me._num(me._RENDERER.getAttr(guide.uc, "y")) + newY) / 2)});
                            me._RENDERER.setAttr(guide.bBox, {height: newHeight});
                        }
                        me._RENDERER.removeAllTerminal();
                    },
                    stop: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            dx = eventOffset.x - start.x,
                            dy = eventOffset.y - start.y;
                        $(this).css({"position": "absolute", "left": "0px", "top": "0px"});
                        if (element && element.shape.geom) {
                            // resizing
                            if (element.shape.geom.getBoundary().getWidth() + dx < me._CONFIG.GUIDE_MIN_SIZE) {
                                dx = me._CONFIG.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getWidth();
                            }
                            if (element.shape.geom.getBoundary().getHeight() + dy < me._CONFIG.GUIDE_MIN_SIZE) {
                                dy = me._CONFIG.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getHeight();
                            }
                            me._RENDERER.resize(element, [0, me._grid(dy), 0, me._grid(dx)]);
                            me._RENDERER.drawGuide(element);
                        }
                        me._RENDERER.removeAllTerminal();
                    }
                });

                $(guide.lc).draggable({
                    start: function (event) {
                        var eventOffset = me._getOffset(event);
                        $(this).data("start", {x: eventOffset.x, y: eventOffset.y});
                        $(this).data("offset", {
                            x: eventOffset.x - me._num(me._RENDERER.getAttr(guide.lc, "x")),
                            y: eventOffset.y - me._num(me._RENDERER.getAttr(guide.lc, "y"))
                        });
                        me._RENDERER.removeRubberBand(me._RENDERER.getRootElement());
                    },
                    drag: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            offset = $(this).data("offset"),
                            newX = me._grid(eventOffset.x - offset.x),
                            newWidth = me._grid(me._num(me._RENDERER.getAttr(guide.rc, "x")) - newX);
                        $(this).css({"position": "", "left": "", "top": ""});
                        if (newWidth >= me._CONFIG.GUIDE_MIN_SIZE) {
                            me._RENDERER.setAttr(guide.lc, {x: newX});
                            me._RENDERER.setAttr(guide.ul, {x: newX});
                            me._RENDERER.setAttr(guide.ll, {x: newX});
                            me._RENDERER.setAttr(guide.uc, {x: OG.Util.round((me._num(me._RENDERER.getAttr(guide.rc, "x")) + newX) / 2)});
                            me._RENDERER.setAttr(guide.lwc, {x: OG.Util.round((me._num(me._RENDERER.getAttr(guide.rc, "x")) + newX) / 2)});
                            me._RENDERER.setAttr(guide.bBox, {x: OG.Util.round(newX + me._num(me._RENDERER.getAttr(guide.lc, "width")) / 2), width: newWidth});
                        }
                        me._RENDERER.removeAllTerminal();
                    },
                    stop: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            dx = start.x - eventOffset.x;
                        $(this).css({"position": "absolute", "left": "0px", "top": "0px"});
                        if (element && element.shape.geom) {
                            // resizing
                            if (element.shape.geom.getBoundary().getWidth() + dx < me._CONFIG.GUIDE_MIN_SIZE) {
                                dx = me._CONFIG.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getWidth();
                            }
                            me._RENDERER.resize(element, [0, 0, me._grid(dx), 0]);
                            me._RENDERER.drawGuide(element);
                        }
                    }
                });

                $(guide.ll).draggable({
                    start: function (event) {
                        var eventOffset = me._getOffset(event);
                        $(this).data("start", {x: eventOffset.x, y: eventOffset.y});
                        $(this).data("offset", {
                            x: eventOffset.x - me._num(me._RENDERER.getAttr(guide.ll, "x")),
                            y: eventOffset.y - me._num(me._RENDERER.getAttr(guide.ll, "y"))
                        });

                        me._RENDERER.removeRubberBand(me._RENDERER.getRootElement());
                    },
                    drag: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            offset = $(this).data("offset"),
                            newX = me._grid(eventOffset.x - offset.x),
                            newY = me._grid(eventOffset.y - offset.y),
                            newWidth = me._grid(me._num(me._RENDERER.getAttr(guide.rc, "x")) - newX),
                            newHeight = me._grid(newY - me._num(me._RENDERER.getAttr(guide.uc, "y")));
                        $(this).css({"position": "", "left": "", "top": ""});
                        if (newWidth >= me._CONFIG.GUIDE_MIN_SIZE) {
                            me._RENDERER.setAttr(guide.lc, {x: newX});
                            me._RENDERER.setAttr(guide.ul, {x: newX});
                            me._RENDERER.setAttr(guide.ll, {x: newX});
                            me._RENDERER.setAttr(guide.uc, {x: OG.Util.round((me._num(me._RENDERER.getAttr(guide.rc, "x")) + newX) / 2)});
                            me._RENDERER.setAttr(guide.lwc, {x: OG.Util.round((me._num(me._RENDERER.getAttr(guide.rc, "x")) + newX) / 2)});
                            me._RENDERER.setAttr(guide.bBox, {x: OG.Util.round(newX + me._num(me._RENDERER.getAttr(guide.lc, "width")) / 2), width: newWidth});
                        }
                        if (newHeight >= me._CONFIG.GUIDE_MIN_SIZE) {
                            me._RENDERER.setAttr(guide.lwc, {y: newY});
                            me._RENDERER.setAttr(guide.ll, {y: newY});
                            me._RENDERER.setAttr(guide.lr, {y: newY});
                            me._RENDERER.setAttr(guide.lc, {y: OG.Util.round((me._num(me._RENDERER.getAttr(guide.uc, "y")) + newY) / 2)});
                            me._RENDERER.setAttr(guide.rc, {y: OG.Util.round((me._num(me._RENDERER.getAttr(guide.uc, "y")) + newY) / 2)});
                            me._RENDERER.setAttr(guide.bBox, {height: newHeight});
                        }
                        me._RENDERER.removeAllTerminal();
                    },
                    stop: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            dx = start.x - eventOffset.x,
                            dy = eventOffset.y - start.y;
                        $(this).css({"position": "absolute", "left": "0px", "top": "0px"});
                        if (element && element.shape.geom) {
                            // resizing
                            if (element.shape.geom.getBoundary().getWidth() + dx < me._CONFIG.GUIDE_MIN_SIZE) {
                                dx = me._CONFIG.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getWidth();
                            }
                            if (element.shape.geom.getBoundary().getHeight() + dy < me._CONFIG.GUIDE_MIN_SIZE) {
                                dy = me._CONFIG.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getHeight();
                            }
                            me._RENDERER.resize(element, [0, me._grid(dy), me._grid(dx), 0]);
                            me._RENDERER.drawGuide(element);
                        }
                    }
                });

                $(guide.uc).draggable({
                    start: function (event) {
                        var eventOffset = me._getOffset(event);
                        $(this).data("start", {x: eventOffset.x, y: eventOffset.y});
                        $(this).data("offset", {
                            x: eventOffset.x - me._num(me._RENDERER.getAttr(guide.uc, "x")),
                            y: eventOffset.y - me._num(me._RENDERER.getAttr(guide.uc, "y"))
                        });

                        me._RENDERER.removeRubberBand(me._RENDERER.getRootElement());
                    },
                    drag: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            offset = $(this).data("offset"),
                            newY = me._grid(eventOffset.y - offset.y),
                            newHeight = me._grid(me._num(me._RENDERER.getAttr(guide.lwc, "y")) - newY);
                        $(this).css({"position": "", "left": "", "top": ""});
                        if (newHeight >= me._CONFIG.GUIDE_MIN_SIZE) {
                            me._RENDERER.setAttr(guide.uc, {y: newY});
                            me._RENDERER.setAttr(guide.ul, {y: newY});
                            me._RENDERER.setAttr(guide.ur, {y: newY});
                            me._RENDERER.setAttr(guide.lc, {y: OG.Util.round((me._num(me._RENDERER.getAttr(guide.lwc, "y")) + newY) / 2)});
                            me._RENDERER.setAttr(guide.rc, {y: OG.Util.round((me._num(me._RENDERER.getAttr(guide.lwc, "y")) + newY) / 2)});
                            me._RENDERER.setAttr(guide.bBox, {y: OG.Util.round(newY + me._num(me._RENDERER.getAttr(guide.uc, "width")) / 2), height: newHeight});
                        }
                        me._RENDERER.removeAllTerminal();
                    },
                    stop: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            dy = start.y - eventOffset.y;
                        $(this).css({"position": "absolute", "left": "0px", "top": "0px"});
                        if (element && element.shape.geom) {
                            // resizing
                            if (element.shape.geom.getBoundary().getHeight() + dy < me._CONFIG.GUIDE_MIN_SIZE) {
                                dy = me._CONFIG.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getHeight();
                            }
                            me._RENDERER.resize(element, [me._grid(dy), 0, 0, 0]);
                            me._RENDERER.drawGuide(element);
                        }
                    }
                });

                $(guide.ul).draggable({
                    start: function (event) {
                        var eventOffset = me._getOffset(event);
                        $(this).data("start", {x: eventOffset.x, y: eventOffset.y});
                        $(this).data("offset", {
                            x: eventOffset.x - me._num(me._RENDERER.getAttr(guide.ul, "x")),
                            y: eventOffset.y - me._num(me._RENDERER.getAttr(guide.ul, "y"))
                        });

                        me._RENDERER.removeRubberBand(me._RENDERER.getRootElement());
                    },
                    drag: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            offset = $(this).data("offset"),
                            newX = me._grid(eventOffset.x - offset.x),
                            newY = me._grid(eventOffset.y - offset.y),
                            newWidth = me._grid(me._num(me._RENDERER.getAttr(guide.rc, "x")) - newX),
                            newHeight = me._grid(me._num(me._RENDERER.getAttr(guide.lwc, "y")) - newY);
                        $(this).css({"position": "", "left": "", "top": ""});
                        if (newWidth >= me._CONFIG.GUIDE_MIN_SIZE) {
                            me._RENDERER.setAttr(guide.lc, {x: newX});
                            me._RENDERER.setAttr(guide.ul, {x: newX});
                            me._RENDERER.setAttr(guide.ll, {x: newX});
                            me._RENDERER.setAttr(guide.uc, {x: OG.Util.round((me._num(me._RENDERER.getAttr(guide.rc, "x")) + newX) / 2)});
                            me._RENDERER.setAttr(guide.lwc, {x: OG.Util.round((me._num(me._RENDERER.getAttr(guide.rc, "x")) + newX) / 2)});
                            me._RENDERER.setAttr(guide.bBox, {x: OG.Util.round(newX + me._num(me._RENDERER.getAttr(guide.lc, "width")) / 2), width: newWidth});
                        }
                        if (newHeight >= me._CONFIG.GUIDE_MIN_SIZE) {
                            me._RENDERER.setAttr(guide.uc, {y: newY});
                            me._RENDERER.setAttr(guide.ul, {y: newY});
                            me._RENDERER.setAttr(guide.ur, {y: newY});
                            me._RENDERER.setAttr(guide.lc, {y: OG.Util.round((me._num(me._RENDERER.getAttr(guide.lwc, "y")) + newY) / 2)});
                            me._RENDERER.setAttr(guide.rc, {y: OG.Util.round((me._num(me._RENDERER.getAttr(guide.lwc, "y")) + newY) / 2)});
                            me._RENDERER.setAttr(guide.bBox, {y: OG.Util.round(newY + me._num(me._RENDERER.getAttr(guide.uc, "height")) / 2), height: newHeight});
                        }
                        me._RENDERER.removeAllTerminal();
                    },
                    stop: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            dx = start.x - eventOffset.x,
                            dy = start.y - eventOffset.y;
                        $(this).css({"position": "absolute", "left": "0px", "top": "0px"});
                        if (element && element.shape.geom) {
                            // resizing
                            if (element.shape.geom.getBoundary().getWidth() + dx < me._CONFIG.GUIDE_MIN_SIZE) {
                                dx = me._CONFIG.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getWidth();
                            }
                            if (element.shape.geom.getBoundary().getHeight() + dy < me._CONFIG.GUIDE_MIN_SIZE) {
                                dy = me._CONFIG.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getHeight();
                            }
                            me._RENDERER.resize(element, [me._grid(dy), 0, me._grid(dx), 0]);
                            me._RENDERER.drawGuide(element);
                        }
                    }
                });

                $(guide.ur).draggable({
                    start: function (event) {
                        var eventOffset = me._getOffset(event);
                        $(this).data("start", {x: eventOffset.x, y: eventOffset.y});
                        $(this).data("offset", {
                            x: eventOffset.x - me._num(me._RENDERER.getAttr(guide.ur, "x")),
                            y: eventOffset.y - me._num(me._RENDERER.getAttr(guide.ur, "y"))
                        });

                        me._RENDERER.removeRubberBand(me._RENDERER.getRootElement());
                    },
                    drag: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            offset = $(this).data("offset"),
                            newX = me._grid(eventOffset.x - offset.x),
                            newY = me._grid(eventOffset.y - offset.y),
                            newWidth = me._grid(newX - me._num(me._RENDERER.getAttr(guide.lc, "x"))),
                            newHeight = me._grid(me._num(me._RENDERER.getAttr(guide.lwc, "y")) - newY);
                        $(this).css({"position": "", "left": "", "top": ""});
                        if (newWidth >= me._CONFIG.GUIDE_MIN_SIZE) {
                            me._RENDERER.setAttr(guide.rc, {x: newX});
                            me._RENDERER.setAttr(guide.ur, {x: newX});
                            me._RENDERER.setAttr(guide.lr, {x: newX});
                            me._RENDERER.setAttr(guide.uc, {x: OG.Util.round((me._num(me._RENDERER.getAttr(guide.lc, "x")) + newX) / 2)});
                            me._RENDERER.setAttr(guide.lwc, {x: OG.Util.round((me._num(me._RENDERER.getAttr(guide.lc, "x")) + newX) / 2)});
                            me._RENDERER.setAttr(guide.bBox, {width: newWidth});
                        }
                        if (newHeight >= me._CONFIG.GUIDE_MIN_SIZE) {
                            me._RENDERER.setAttr(guide.uc, {y: newY});
                            me._RENDERER.setAttr(guide.ul, {y: newY});
                            me._RENDERER.setAttr(guide.ur, {y: newY});
                            me._RENDERER.setAttr(guide.lc, {y: OG.Util.round((me._num(me._RENDERER.getAttr(guide.lwc, "y")) + newY) / 2)});
                            me._RENDERER.setAttr(guide.rc, {y: OG.Util.round((me._num(me._RENDERER.getAttr(guide.lwc, "y")) + newY) / 2)});
                            me._RENDERER.setAttr(guide.bBox, {y: OG.Util.round(newY + me._num(me._RENDERER.getAttr(guide.uc, "width")) / 2), height: newHeight});
                        }
                        me._RENDERER.removeAllTerminal();
                    },
                    stop: function (event) {
                        var eventOffset = me._getOffset(event),
                            start = $(this).data("start"),
                            dx = eventOffset.x - start.x,
                            dy = start.y - eventOffset.y;
                        $(this).css({"position": "absolute", "left": "0px", "top": "0px"});
                        if (element && element.shape.geom) {
                            // resizing
                            if (element.shape.geom.getBoundary().getWidth() + dx < me._CONFIG.GUIDE_MIN_SIZE) {
                                dx = me._CONFIG.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getWidth();
                            }
                            if (element.shape.geom.getBoundary().getHeight() + dy < me._CONFIG.GUIDE_MIN_SIZE) {
                                dy = me._CONFIG.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getHeight();
                            }
                            me._RENDERER.resize(element, [me._grid(dy), 0, 0, me._grid(dx)]);
                            me._RENDERER.drawGuide(element);
                        }
                    }
                });
            }
        } else {
            if ($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
                me._RENDERER.setAttr(guide.from, {cursor: 'default'});
                me._RENDERER.setAttr(guide.to, {cursor: 'default'});
                $.each(guide.controls, function (idx, item) {
                    me._RENDERER.setAttr(item, {cursor: 'default'});
                });
            } else {
                me._RENDERER.setAttr(guide.ul, {cursor: 'default'});
                me._RENDERER.setAttr(guide.ur, {cursor: 'default'});
                me._RENDERER.setAttr(guide.ll, {cursor: 'default'});
                me._RENDERER.setAttr(guide.lr, {cursor: 'default'});
                me._RENDERER.setAttr(guide.lc, {cursor: 'default'});
                me._RENDERER.setAttr(guide.uc, {cursor: 'default'});
                me._RENDERER.setAttr(guide.rc, {cursor: 'default'});
                me._RENDERER.setAttr(guide.lwc, {cursor: 'default'});
            }
        }
    },

    /**
     * 주어진 Shape Element 를 마우스 클릭하여 선택가능하도록 한다.
     * 선택가능해야 리사이즈가 가능하다.
     *
     * @param {Element} element Shape Element
     * @param {Boolean} isSelectable 선택가능여부
     */
    setClickSelectable: function (element, isSelectable) {
        var me = this;
        if (isSelectable === true) {
            // 마우스 클릭하여 선택 처리
            $(element).bind("click", function (event) {
                var guide;

                $(me._RENDERER.getContainer()).focus();

                if (element.shape) {
                    if (!event.shiftKey && !event.ctrlKey) {
                        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, item) {
                            if (item.id) {
                                me._RENDERER.removeGuide(item);
                            }
                        });
                    }

                    if ($(element).attr("_selected") === "true") {
                        if (event.shiftKey || event.ctrlKey) {
                            me._RENDERER.removeGuide(element);
                        }
                    } else {
                        me._deselectChildren(element);
                        if (!me._isParentSelected(element)) {
                            guide = me._RENDERER.drawGuide(element);
                            if (guide) {
                                // enable event
                                me.setResizable(element, guide, me._isResizable(element.shape));
                                me._RENDERER.removeAllTerminal();
                                me._RENDERER.toFront(guide.group);
                            }
                        }
                    }

                    return false;
                }
            });

            // 마우스 우클릭하여 선택 처리
            if (me._CONFIG.ENABLE_CONTEXTMENU) {
                $(element).bind("contextmenu", function (event) {
                    var guide;
                    if (element.shape) {
                        if ($(element).attr("_selected") !== "true") {
                            $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, item) {
                                if (item.id) {
                                    me._RENDERER.removeGuide(item);
                                }
                            });

                            me._deselectChildren(element);
                            if (!me._isParentSelected(element)) {
                                guide = me._RENDERER.drawGuide(element);
                                if (guide) {
                                    // enable event
                                    me.setResizable(element, guide, me._isResizable(element.shape));
                                    me._RENDERER.removeAllTerminal();
                                    me._RENDERER.toFront(guide.group);
                                }
                            }
                        }

                        return true;
                    }
                });
            }

            if (isSelectable && me._isMovable(element.shape)) {
                me._RENDERER.setAttr(element, {cursor: 'move'});
                OG.Util.apply(element.shape.geom.style.map, {cursor: 'move'});
            } else {
                me._RENDERER.setAttr(element, {cursor: 'pointer'});
                OG.Util.apply(element.shape.geom.style.map, {cursor: 'pointer'});
            }
        } else {
            $(element).unbind('click');
            me._RENDERER.setAttr(element, {cursor: me._CONFIG.DEFAULT_STYLE.SHAPE.cursor});
            OG.Util.apply(element.shape.geom.style.map, {cursor: me._CONFIG.DEFAULT_STYLE.SHAPE.cursor});
        }
    },

    /**
     * 마우스 드래그 영역지정 선택가능여부를 설정한다.
     * 선택가능해야 리사이즈가 가능하다.
     *
     * @param {Boolean} isSelectable 선택가능여부
     */
    setDragSelectable: function (isSelectable) {
        var me = this, rootEle = me._RENDERER.getRootElement();

        // 배경클릭한 경우 deselect 하도록
        $(rootEle).bind("click", function (event) {
            var dragBox = $(this).data("dragBox");
            $(me._RENDERER.getContainer()).focus();
            if (!dragBox || (dragBox && dragBox.width < 1 && dragBox.height < 1)) {
                $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, item) {
                    if (OG.Util.isElement(item) && item.id) {
                        me._RENDERER.removeGuide(item);
                    }
                });
                me._RENDERER.removeAllTerminal();
            }
        });

        if (isSelectable === true) {
            // 마우스 영역 드래그하여 선택 처리
            $(rootEle).bind("mousedown", function (event) {
                var eventOffset = me._getOffset(event);
                $(this).data("dragBox_first", { x: eventOffset.x, y: eventOffset.y});
                me._RENDERER.drawRubberBand([eventOffset.x, eventOffset.y]);
            });
            $(rootEle).bind("mousemove", function (event) {
                var first = $(this).data("dragBox_first"),
                    eventOffset, width, height, x, y;
                if (first) {
                    eventOffset = me._getOffset(event);
                    width = eventOffset.x - first.x;
                    height = eventOffset.y - first.y;
                    x = width <= 0 ? first.x + width : first.x;
                    y = height <= 0 ? first.y + height : first.y;
                    me._RENDERER.drawRubberBand([x, y], [Math.abs(width), Math.abs(height)]);
                }
            });
            $(rootEle).bind("mouseup", function (event) {
                var first = $(this).data("dragBox_first"),
                    eventOffset, width, height, x, y, envelope, guide;
                me._RENDERER.removeRubberBand(rootEle);
                if (first) {
                    eventOffset = me._getOffset(event);
                    width = eventOffset.x - first.x;
                    height = eventOffset.y - first.y;
                    x = width <= 0 ? first.x + width : first.x;
                    y = height <= 0 ? first.y + height : first.y;
                    envelope = new OG.Envelope([x, y], Math.abs(width), Math.abs(height));
                    $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "]").each(function (index, element) {
                        if (element.shape.geom && envelope.isContainsAll(element.shape.geom.getVertices())) {
                            me._deselectChildren(element);
                            if (!me._isParentSelected(element)) {
                                guide = me._RENDERER.drawGuide(element);
                                if (guide) {
                                    // enable event
                                    me.setResizable(element, guide, me._isResizable(element.shape));
                                    me._RENDERER.removeAllTerminal();
                                }
                            }
                        }
                    });

                    $(this).data("dragBox", {width: width, height: height, x: x, y: y});
                }
            });

            $(rootEle).bind("contextmenu", function (event) {
                me._RENDERER.removeRubberBand(rootEle);
            });
        } else {
            $(rootEle).unbind("mousedown");
            $(rootEle).unbind("mousemove");
            $(rootEle).unbind("mouseup");
            $(rootEle).unbind("contextmenu");
        }
    },

    /**
     * HotKey 사용 가능여부를 설정한다. (Delete, Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+G, Ctrl+U)
     *
     * @param {Boolean} isEnableHotKey 핫키가능여부
     */
    setEnableHotKey: function (isEnableHotKey) {
        var me = this;
        if (isEnableHotKey === true) {
            // delete, ctrl+A
            $(me._RENDERER.getContainer()).bind("keydown", function (event) {
                // 라벨수정중엔 keydown 이벤트무시
                if (!/^textarea$/i.test(event.srcElement.tagName) && !/^input$/i.test(event.srcElement.tagName)) {
                    // Delete : 삭제
                    if (me._CONFIG.ENABLE_HOTKEY_DELETE && event.keyCode === KeyEvent.DOM_VK_DELETE) {
                        event.preventDefault();
                        me.deleteSelectedShape();
                    }

                    // Ctrl+A : 전체선택
                    if (me._CONFIG.ENABLE_HOTKEY_CTRL_A && me._CONFIG.SELECTABLE && (event.ctrlKey || event.metaKey) && event.keyCode === KeyEvent.DOM_VK_A) {
                        event.preventDefault();
                        me.selectAll();
                    }

                    // Ctrl+C : 복사
                    if (me._CONFIG.ENABLE_HOTKEY_CTRL_C && (event.ctrlKey || event.metaKey) && event.keyCode === KeyEvent.DOM_VK_C) {
                        event.preventDefault();
                        me.copySelectedShape();
                    }

                    // Ctrl+X : 잘라내기
                    if (me._CONFIG.ENABLE_HOTKEY_CTRL_C && (event.ctrlKey || event.metaKey) && event.keyCode === KeyEvent.DOM_VK_X) {
                        event.preventDefault();
                        me.cutSelectedShape();
                    }

                    // Ctrl+V: 붙여넣기
                    if (me._CONFIG.ENABLE_HOTKEY_CTRL_V && (event.ctrlKey || event.metaKey) && event.keyCode === KeyEvent.DOM_VK_V) {
                        event.preventDefault();
                        me.pasteSelectedShape();
                    }

                    // Ctrl+D: 복제하기
                    if (me._CONFIG.ENABLE_HOTKEY_CTRL_D && (event.ctrlKey || event.metaKey) && event.keyCode === KeyEvent.DOM_VK_D) {
                        event.preventDefault();
                        me.duplicateSelectedShape();
                    }

                    // Ctrl+G : 그룹
                    if (me._CONFIG.ENABLE_HOTKEY_CTRL_G && (event.ctrlKey || event.metaKey) && event.keyCode === KeyEvent.DOM_VK_G) {
                        event.preventDefault();
                        me.groupSelectedShape();
                    }

                    // Ctrl+U : 언그룹
                    if (me._CONFIG.ENABLE_HOTKEY_CTRL_U && (event.ctrlKey || event.metaKey) && event.keyCode === KeyEvent.DOM_VK_U) {
                        event.preventDefault();
                        me.ungroupSelectedShape();
                    }

                    if (me._CONFIG.ENABLE_HOTKEY_SHIFT_ARROW) {
                        // Shift+화살표 : 이동
                        if (event.shiftKey && event.keyCode === KeyEvent.DOM_VK_LEFT) {
                            event.preventDefault();
                            me._moveElements(me._getMoveTargets(), -1 * (me._CONFIG.DRAG_GRIDABLE ? me._CONFIG.MOVE_SNAP_SIZE : 1), 0);
                        }
                        if (event.shiftKey && event.keyCode === KeyEvent.DOM_VK_RIGHT) {
                            event.preventDefault();
                            me._moveElements(me._getMoveTargets(), (me._CONFIG.DRAG_GRIDABLE ? me._CONFIG.MOVE_SNAP_SIZE : 1), 0);
                        }
                        if (event.shiftKey && event.keyCode === KeyEvent.DOM_VK_UP) {
                            event.preventDefault();
                            me._moveElements(me._getMoveTargets(), 0, -1 * (me._CONFIG.DRAG_GRIDABLE ? me._CONFIG.MOVE_SNAP_SIZE : 1));
                        }
                        if (event.shiftKey && event.keyCode === KeyEvent.DOM_VK_DOWN) {
                            event.preventDefault();
                            me._moveElements(me._getMoveTargets(), 0, (me._CONFIG.DRAG_GRIDABLE ? me._CONFIG.MOVE_SNAP_SIZE : 1));
                        }
                    }
                    if (me._CONFIG.ENABLE_HOTKEY_ARROW) {
                        // 화살표 : 이동
                        if (!event.shiftKey && event.keyCode === KeyEvent.DOM_VK_LEFT) {
                            event.preventDefault();
                            me._moveElements(me._getMoveTargets(), -1 * me._CONFIG.MOVE_SNAP_SIZE, 0);
                        }
                        if (!event.shiftKey && event.keyCode === KeyEvent.DOM_VK_RIGHT) {
                            event.preventDefault();
                            me._moveElements(me._getMoveTargets(), me._CONFIG.MOVE_SNAP_SIZE, 0);
                        }
                        if (!event.shiftKey && event.keyCode === KeyEvent.DOM_VK_UP) {
                            event.preventDefault();
                            me._moveElements(me._getMoveTargets(), 0, -1 * me._CONFIG.MOVE_SNAP_SIZE);
                        }
                        if (!event.shiftKey && event.keyCode === KeyEvent.DOM_VK_DOWN) {
                            event.preventDefault();
                            me._moveElements(me._getMoveTargets(), 0, me._CONFIG.MOVE_SNAP_SIZE);
                        }
                    }
                }
            });
        } else {
            $(me._RENDERER.getContainer()).unbind("keydown");
        }
    },

    /**
     * 캔버스에 마우스 우클릭 메뉴를 가능하게 한다.
     */
    enableRootContextMenu: function () {
        var me = this;
        $.contextMenu({
            selector: '#' + me._RENDERER.getRootElement().id,
            build: function ($trigger, e) {
                var root = me._RENDERER.getRootGroup(), copiedElement = $(root).data("copied");
                $(me._RENDERER.getContainer()).focus();
                return {
                    items: {
                        'selectAll': {
                            name: MSG.OPENGRAPH_SELECT_ALL, callback: function () {
                                me.selectAll();
                            }
                        },
                        'sep1': '---------',
                        'paste': {
                            name: MSG.OPENGRAPH_PASTE, callback: function () {
                                me.pasteSelectedShape();
                            },
                            disabled: (copiedElement ? false : true)
                        },
                        'sep2': '---------',
                        'view': {
                            name: MSG.OPENGRAPH_VIEW,
                            items: {
                                'view_actualSize': {
                                    name: MSG.OPENGRAPH_ACTUAL_SIZE, callback: function () {
                                        me._RENDERER.setScale(1);
                                    }
                                },
                                'sep2_1': '---------',
                                'view_fitWindow': {
                                    name: MSG.OPENGRAPH_FIT_WINDOW, callback: function () {
                                        me.fitWindow();
                                    }
                                },
                                'sep2_2': '---------',
                                'view_25': {
                                    name: '25%', callback: function () {
                                        me._RENDERER.setScale(0.25);
                                    }
                                },
                                'view_50': {
                                    name: '50%', callback: function () {
                                        me._RENDERER.setScale(0.5);
                                    }
                                },
                                'view_75': {
                                    name: '75%', callback: function () {
                                        me._RENDERER.setScale(0.75);
                                    }
                                },
                                'view_100': {
                                    name: '100%', callback: function () {
                                        me._RENDERER.setScale(1);
                                    }
                                },
                                'view_150': {
                                    name: '150%', callback: function () {
                                        me._RENDERER.setScale(1.5);
                                    }
                                },
                                'view_200': {
                                    name: '200%', callback: function () {
                                        me._RENDERER.setScale(2);
                                    }
                                },
                                'view_300': {
                                    name: '300%', callback: function () {
                                        me._RENDERER.setScale(3);
                                    }
                                },
                                'view_400': {
                                    name: '400%', callback: function () {
                                        me._RENDERER.setScale(4);
                                    }
                                },
                                'sep2_3': '---------',
                                'view_zoomin': {
                                    name: MSG.OPENGRAPH_ZOOM_IN, callback: function () {
                                        me.zoomIn();
                                    }
                                },
                                'view_zoomout': {
                                    name: MSG.OPENGRAPH_ZOOM_OUT, callback: function () {
                                        me.zoomOut();
                                    }
                                }
                            }
                        }
                    }
                };
            }
        });
    },

    /**
     * Shape 에 마우스 우클릭 메뉴를 가능하게 한다.
     */
    enableShapeContextMenu: function () {
        var me = this;
        $.contextMenu({
            selector: '#' + me._RENDERER.getRootElement().id + ' [_type=SHAPE]',
            build: function ($trigger, e) {
                $(me._RENDERER.getContainer()).focus();
                return {
                    items: {
                        'delete': {
                            name: MSG.OPENGRAPH_DELETE, callback: function () {
                                me.deleteSelectedShape();
                            }
                        },
                        'sep1': '---------',
                        'cut': {
                            name: MSG.OPENGRAPH_CUT, callback: function () {
                                me.cutSelectedShape();
                            }
                        },
                        'copy': {
                            name: MSG.OPENGRAPH_COPY, callback: function () {
                                me.copySelectedShape();
                            }
                        },
                        'sep2': '---------',
                        'duplicate': {
                            name: MSG.OPENGRAPH_DUPLICATE, callback: function () {
                                me.duplicateSelectedShape();
                            }
                        },
                        'sep3': '---------',
                        'group': {
                            name: MSG.OPENGRAPH_GROUP, callback: function () {
                                me.groupSelectedShape();
                            }
                        },
                        'unGroup': {
                            name: MSG.OPENGRAPH_UNGROUP, callback: function () {
                                me.ungroupSelectedShape();
                            }
                        },
                        'sep4': '---------',
                        'shapeRotate': {
                            name: MSG.OPENGRAPH_ROTATE,
                            items: {
                                'rotate_select': {
                                    name: MSG.OPENGRAPH_SELECT,
                                    type: 'select',
                                    options: {'0': '0', '45': '45', '90': '90', '135': '135', '180': '180', '-45': '-45', '-90': '-90', '-135': '-135', '-180': '-180'},
                                    selected: '0',
                                    events: {
                                        change: function (e) {
                                            me.rotateSelectedShape(e.target.value);
                                        }
                                    }
                                },
                                'sep5_6_1': '---------',
                                'rotate_custom': {
                                    name: MSG.OPENGRAPH_CUSTOM,
                                    type: 'text',
                                    events: {
                                        keyup: function (e) {
                                            if (e.target.value !== '') {
                                                me.rotateSelectedShape(e.target.value);
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        'sep5': '---------',
                        'format': {
                            name: MSG.OPENGRAPH_FORMAT,
                            items: {
                                'fillColor': {
                                    name: MSG.OPENGRAPH_FILL_COLOR,
                                    items: {
                                        'fillColor_select': {
                                            name: MSG.OPENGRAPH_SELECT,
                                            type: 'select',
                                            options: {'': '', 'white': 'white', 'gray': 'gray', 'blue': 'blue', 'red': 'red', 'yellow': 'yellow', 'orange': 'orange', 'green': 'green', 'black': 'black'},
                                            selected: '',
                                            events: {
                                                change: function (e) {
                                                    if (e.target.value !== '') {
                                                        me.setFillColorSelectedShape(e.target.value);
                                                    }
                                                }
                                            }
                                        },
                                        'sep5_1_1': '---------',
                                        'fillColor_custom': {
                                            name: MSG.OPENGRAPH_CUSTOM,
                                            type: 'text',
                                            events: {
                                                keyup: function (e) {
                                                    if (e.target.value !== '') {
                                                        me.setFillColorSelectedShape(e.target.value);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                'fillOpacity': {
                                    name: MSG.OPENGRAPH_FILL_OPACITY,
                                    items: {
                                        'fillOpacity_select': {
                                            name: MSG.OPENGRAPH_SELECT,
                                            type: 'select',
                                            options: {'': '', '0.0': '0%', '0.1': '10%', '0.2': '20%', '0.3': '30%', '0.4': '40%', '0.5': '50%', '0.6': '60%', '0.7': '70%', '0.8': '80%', '0.9': '90%', '1.0': '100%'},
                                            selected: '',
                                            events: {
                                                change: function (e) {
                                                    if (e.target.value !== '') {
                                                        me.setFillOpacitySelectedShape(e.target.value);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                'sep5_1': '---------',
                                'lineType': {
                                    name: MSG.OPENGRAPH_LINE_TYPE,
                                    items: {
                                        'lineType_straight': {
                                            name: 'Straight',
                                            type: 'radio',
                                            radio: 'lineType',
                                            value: 'straight',
                                            events: {
                                                change: function (e) {
                                                    me.setLineTypeSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'lineType_plain': {
                                            name: 'Plain',
                                            type: 'radio',
                                            radio: 'lineType',
                                            value: 'plain',
                                            events: {
                                                change: function (e) {
                                                    me.setLineTypeSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'lineType_bezier': {
                                            name: 'Curve',
                                            type: 'radio',
                                            radio: 'lineType',
                                            value: 'bezier',
                                            events: {
                                                change: function (e) {
                                                    me.setLineTypeSelectedShape(e.target.value);
                                                }
                                            }
                                        }
                                    }
                                },
                                'lineStyle': {
                                    name: MSG.OPENGRAPH_LINE_STYLE,
                                    items: {
                                        'lineStyle_1': {
                                            name: '──────',
                                            type: 'radio',
                                            radio: 'lineStyle',
                                            value: '',
                                            events: {
                                                change: function (e) {
                                                    me.setLineStyleSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'lineStyle_2': {
                                            name: '---------',
                                            type: 'radio',
                                            radio: 'lineStyle',
                                            value: '-',
                                            events: {
                                                change: function (e) {
                                                    me.setLineStyleSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'lineStyle_3': {
                                            name: '············',
                                            type: 'radio',
                                            radio: 'lineStyle',
                                            value: '.',
                                            events: {
                                                change: function (e) {
                                                    me.setLineStyleSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'lineStyle_4': {
                                            name: '-·-·-·-·-·',
                                            type: 'radio',
                                            radio: 'lineStyle',
                                            value: '-.',
                                            events: {
                                                change: function (e) {
                                                    me.setLineStyleSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'lineStyle_5': {
                                            name: '-··-··-··-',
                                            type: 'radio',
                                            radio: 'lineStyle',
                                            value: '-..',
                                            events: {
                                                change: function (e) {
                                                    me.setLineStyleSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'lineStyle_6': {
                                            name: '· · · · · ·',
                                            type: 'radio',
                                            radio: 'lineStyle',
                                            value: '. ',
                                            events: {
                                                change: function (e) {
                                                    me.setLineStyleSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'lineStyle_7': {
                                            name: '- - - - -',
                                            type: 'radio',
                                            radio: 'lineStyle',
                                            value: '- ',
                                            events: {
                                                change: function (e) {
                                                    me.setLineStyleSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'lineStyle_8': {
                                            name: '─ ─ ─ ─',
                                            type: 'radio',
                                            radio: 'lineStyle',
                                            value: '--',
                                            events: {
                                                change: function (e) {
                                                    me.setLineStyleSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'lineStyle_9': {
                                            name: '- ·- ·- ·-',
                                            type: 'radio',
                                            radio: 'lineStyle',
                                            value: '- .',
                                            events: {
                                                change: function (e) {
                                                    me.setLineStyleSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'lineStyle_10': {
                                            name: '--·--·--·-',
                                            type: 'radio',
                                            radio: 'lineStyle',
                                            value: '--.',
                                            events: {
                                                change: function (e) {
                                                    me.setLineStyleSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'lineStyle_11': {
                                            name: '--··--··--',
                                            type: 'radio',
                                            radio: 'lineStyle',
                                            value: '--..',
                                            events: {
                                                change: function (e) {
                                                    me.setLineStyleSelectedShape(e.target.value);
                                                }
                                            }
                                        }
                                    }
                                },
                                'lineColor': {
                                    name: MSG.OPENGRAPH_LINE_COLOR,
                                    items: {
                                        'lineColor_select': {
                                            name: MSG.OPENGRAPH_SELECT,
                                            type: 'select',
                                            options: {'': '', 'white': 'white', 'gray': 'gray', 'blue': 'blue', 'red': 'red', 'yellow': 'yellow', 'orange': 'orange', 'green': 'green', 'black': 'black'},
                                            selected: '',
                                            events: {
                                                change: function (e) {
                                                    if (e.target.vadlue !== '') {
                                                        me.setLineColorSelectedShape(e.target.value);
                                                    }
                                                }
                                            }
                                        },
                                        'sep5_4_1': '---------',
                                        'lineColor_custom': {
                                            name: MSG.OPENGRAPH_CUSTOM,
                                            type: 'text',
                                            events: {
                                                keyup: function (e) {
                                                    if (e.target.value !== '') {
                                                        me.setLineColorSelectedShape(e.target.value);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                'lineWidth': {
                                    name: MSG.OPENGRAPH_LINE_WIDTH,
                                    items: {
                                        'lineWidth_select': {
                                            name: MSG.OPENGRAPH_SELECT,
                                            type: 'select',
                                            options: {0: '', 1: '1px', 2: '2px', 3: '3px', 4: '4px', 5: '5px', 6: '6px', 8: '8px', 10: '10px', 12: '12px', 16: '16px', 24: '24px'},
                                            selected: 0,
                                            events: {
                                                change: function (e) {
                                                    if (e.target.value !== 0) {
                                                        me.setLineWidthSelectedShape(e.target.value);
                                                    }
                                                }
                                            }
                                        },
                                        'sep5_5_1': '---------',
                                        'lineWidth_custom': {
                                            name: MSG.OPENGRAPH_CUSTOM,
                                            type: 'text',
                                            events: {
                                                keyup: function (e) {
                                                    if (e.target.value !== '') {
                                                        me.setLineWidthSelectedShape(e.target.value);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        'sep6': '---------',
                        'text': {
                            name: MSG.OPENGRAPH_TEXT,
                            items: {
                                'fontFamily': {
                                    name: 'Font Family',
                                    items: {
                                        'fontFamily_1': {
                                            name: '<span style="font-family: Arial">Arial</span>',
                                            type: 'radio',
                                            radio: 'fontFamily',
                                            value: 'Arial',
                                            events: {
                                                change: function (e) {
                                                    me.setFontFamilySelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'fontFamily_2': {
                                            name: '<span style="font-family: \'Comic Sans MS\'">Comic Sans MS</span>',
                                            type: 'radio',
                                            radio: 'fontFamily',
                                            value: 'Comic Sans MS',
                                            events: {
                                                change: function (e) {
                                                    me.setFontFamilySelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'fontFamily_3': {
                                            name: '<span style="font-family: \'Courier New\'">Courier New</span>',
                                            type: 'radio',
                                            radio: 'fontFamily',
                                            value: 'Courier New',
                                            events: {
                                                change: function (e) {
                                                    me.setFontFamilySelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'fontFamily_4': {
                                            name: '<span style="font-family: Garamond">Garamond</span>',
                                            type: 'radio',
                                            radio: 'fontFamily',
                                            value: 'Garamond',
                                            events: {
                                                change: function (e) {
                                                    me.setFontFamilySelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'fontFamily_5': {
                                            name: '<span style="font-family: Georgia">Georgia</span>',
                                            type: 'radio',
                                            radio: 'fontFamily',
                                            value: 'Georgia',
                                            events: {
                                                change: function (e) {
                                                    me.setFontFamilySelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'fontFamily_6': {
                                            name: '<span style="font-family: \'Lucida Console\'">Lucida Console</span>',
                                            type: 'radio',
                                            radio: 'fontFamily',
                                            value: 'Lucida Console',
                                            events: {
                                                change: function (e) {
                                                    me.setFontFamilySelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'fontFamily_7': {
                                            name: '<span style="font-family: \'MS Gothic\'">MS Gothic</span>',
                                            type: 'radio',
                                            radio: 'fontFamily',
                                            value: 'MS Gothic',
                                            events: {
                                                change: function (e) {
                                                    me.setFontFamilySelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'fontFamily_8': {
                                            name: '<span style="font-family: \'MS Sans Serif\'">MS Sans Serif</span>',
                                            type: 'radio',
                                            radio: 'fontFamily',
                                            value: 'MS Sans Serif',
                                            events: {
                                                change: function (e) {
                                                    me.setFontFamilySelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'fontFamily_9': {
                                            name: '<span style="font-family: Verdana">Verdana</span>',
                                            type: 'radio',
                                            radio: 'fontFamily',
                                            value: 'Verdana',
                                            events: {
                                                change: function (e) {
                                                    me.setFontFamilySelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'fontFamily_10': {
                                            name: '<span style="font-family: \'Times New Roman\'">Times New Roman</span>',
                                            type: 'radio',
                                            radio: 'fontFamily',
                                            value: 'Times New Roman',
                                            events: {
                                                change: function (e) {
                                                    me.setFontFamilySelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'sep6_1_1': '---------',
                                        'fontFamily_custom': {
                                            name: 'Custom',
                                            type: 'text',
                                            events: {
                                                keyup: function (e) {
                                                    if (e.target.value !== '') {
                                                        me.setFontFamilySelectedShape(e.target.value);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                'fontColor': {
                                    name: 'Font Color',
                                    items: {
                                        'fontColor_select': {
                                            name: 'Select',
                                            type: 'select',
                                            options: {'': '', 'white': 'white', 'gray': 'gray', 'blue': 'blue', 'red': 'red', 'yellow': 'yellow', 'orange': 'orange', 'green': 'green', 'black': 'black'},
                                            selected: '',
                                            events: {
                                                change: function (e) {
                                                    if (e.target.value !== '') {
                                                        me.setFontColorSelectedShape(e.target.value);
                                                    }
                                                }
                                            }
                                        },
                                        'sep6_1_2': '---------',
                                        'fontColor_custom': {
                                            name: 'Custom',
                                            type: 'text',
                                            events: {
                                                keyup: function (e) {
                                                    if (e.target.value !== '') {
                                                        me.setFontColorSelectedShape(e.target.value);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                'fontSize': {
                                    name: 'Font Size',
                                    items: {
                                        'fontSize_select': {
                                            name: 'Select',
                                            type: 'select',
                                            options: {'': '', '6': '6', '8': '8', '9': '9', '10': '10', '11': '11', '12': '12', '14': '14', '18': '18', '24': '24', '36': '36', '48': '48', '72': '72'},
                                            selected: '',
                                            events: {
                                                change: function (e) {
                                                    if (e.target.value !== '') {
                                                        me.setFontSizeSelectedShape(e.target.value);
                                                    }
                                                }
                                            }
                                        },
                                        'sep6_1_3': '---------',
                                        'fontSize_custom': {
                                            name: 'Custom',
                                            type: 'text',
                                            events: {
                                                keyup: function (e) {
                                                    if (e.target.value !== '') {
                                                        me.setFontSizeSelectedShape(e.target.value);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                'sep6_1': '---------',
                                'fontWeight_bold': {
                                    name: '<span style="font-weight: bold">Bold</span>',
                                    type: 'checkbox',
                                    events: {
                                        change: function (e) {
                                            if (e.target.checked) {
                                                me.setFontWeightSelectedShape('bold');
                                            } else {
                                                me.setFontWeightSelectedShape('normal');
                                            }
                                        }
                                    }
                                },
                                'fontWeight_italic': {
                                    name: '<span style="font-style: italic">Italic</span>',
                                    type: 'checkbox',
                                    events: {
                                        change: function (e) {
                                            if (e.target.checked) {
                                                me.setFontStyleSelectedShape('italic');
                                            } else {
                                                me.setFontStyleSelectedShape('normal');
                                            }
                                        }
                                    }
                                },
//								// TODO : 라파엘이 text-decoration 을 지원안함
//								'fontWeight_underline': {
//									name  : '<span style="text-decoration: underline">Underline</span>',
//									type  : 'checkbox',
//									events: {
//										change: function (e) {
//											if (e.target.checked) {
//												me.setTextDecorationSelectedShape('underline');
//											} else {
//												me.setTextDecorationSelectedShape('none');
//											}
//										}
//									}
//								},
                                'sep6_2': '---------',
                                'position': {
                                    name: 'Text Position',
                                    items: {
                                        'position_left': {
                                            name: 'Left',
                                            type: 'radio',
                                            radio: 'position',
                                            value: 'left',
                                            events: {
                                                change: function (e) {
                                                    me.setLabelPositionSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'position_center': {
                                            name: 'Center',
                                            type: 'radio',
                                            radio: 'position',
                                            value: 'center',
                                            events: {
                                                change: function (e) {
                                                    me.setLabelPositionSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'position_right': {
                                            name: 'Right',
                                            type: 'radio',
                                            radio: 'position',
                                            value: 'right',
                                            events: {
                                                change: function (e) {
                                                    me.setLabelPositionSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'position_top': {
                                            name: 'Top',
                                            type: 'radio',
                                            radio: 'position',
                                            value: 'top',
                                            events: {
                                                change: function (e) {
                                                    me.setLabelPositionSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'position_bottom': {
                                            name: 'Bottom',
                                            type: 'radio',
                                            radio: 'position',
                                            value: 'bottom',
                                            events: {
                                                change: function (e) {
                                                    me.setLabelPositionSelectedShape(e.target.value);
                                                }
                                            }
                                        }
                                    }
                                },
                                'vertical': {
                                    name: 'Vertical Align',
                                    items: {
                                        'vertical_top': {
                                            name: 'Top',
                                            type: 'radio',
                                            radio: 'vertical',
                                            value: 'top',
                                            events: {
                                                change: function (e) {
                                                    me.setLabelVerticalSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'vertical_middle': {
                                            name: 'Middle',
                                            type: 'radio',
                                            radio: 'vertical',
                                            value: 'middle',
                                            events: {
                                                change: function (e) {
                                                    me.setLabelVerticalSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'vertical_bottom': {
                                            name: 'Bottom',
                                            type: 'radio',
                                            radio: 'vertical',
                                            value: 'bottom',
                                            events: {
                                                change: function (e) {
                                                    me.setLabelVerticalSelectedShape(e.target.value);
                                                }
                                            }
                                        }
                                    }
                                },
                                'horizontal': {
                                    name: 'Horizontal Align',
                                    items: {
                                        'vertical_start': {
                                            name: 'Left',
                                            type: 'radio',
                                            radio: 'horizontal',
                                            value: 'start',
                                            events: {
                                                change: function (e) {
                                                    me.setLabelHorizontalSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'horizontal_middle': {
                                            name: 'Middle',
                                            type: 'radio',
                                            radio: 'horizontal',
                                            value: 'middle',
                                            events: {
                                                change: function (e) {
                                                    me.setLabelHorizontalSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'horizontal_end': {
                                            name: 'Right',
                                            type: 'radio',
                                            radio: 'horizontal',
                                            value: 'end',
                                            events: {
                                                change: function (e) {
                                                    me.setLabelHorizontalSelectedShape(e.target.value);
                                                }
                                            }
                                        }
                                    }
                                },
                                'sep6_5': '---------',
                                'textRotate': {
                                    name: 'Text Rotate',
                                    items: {
                                        'textRotate_select': {
                                            name: 'Select',
                                            type: 'select',
                                            options: {'0': '0', '45': '45', '90': '90', '135': '135', '180': '180', '-45': '-45', '-90': '-90', '-135': '-135', '-180': '-180'},
                                            selected: '0',
                                            events: {
                                                change: function (e) {
                                                    me.setLabelAngleSelectedShape(e.target.value);
                                                }
                                            }
                                        },
                                        'sep6_6_1': '---------',
                                        'textRotate_custom': {
                                            name: 'Custom',
                                            type: 'text',
                                            events: {
                                                keyup: function (e) {
                                                    if (e.target.value !== '') {
                                                        me.setLabelAngleSelectedShape(e.target.value);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        'sep7': '---------',
                        'label': {
                            name: MSG.OPENGRAPH_LABEL,
                            items: {
                                'label_shape': {
                                    name: 'Cell Label',
                                    type: 'text',
                                    events: {
                                        keyup: function (e) {
                                            me.setLabelSelectedShape(e.target.value);
                                        }
                                    }
                                },
                                'sep7_1': '---------',
                                'label_from': {
                                    name: 'Edge From',
                                    type: 'text',
                                    events: {
                                        keyup: function (e) {
                                            me.setEdgeFromLabelSelectedShape(e.target.value);
                                        }
                                    }
                                },
                                'label_to': {
                                    name: 'Edge To',
                                    type: 'text',
                                    events: {
                                        keyup: function (e) {
                                            me.setEdgeToLabelSelectedShape(e.target.value);
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
            }
        });
    },

    /**
     * 주어진 Shape Element 를 선택된 상태로 되게 한다.
     *
     * @param {Element} element Shape 엘리먼트
     */
    selectShape: function (element) {
        var me = this, guide;
        if ($(element.parentNode).attr("_shape") !== OG.Constants.SHAPE_TYPE.GROUP && me._isSelectable(element.shape)) {
            guide = me._RENDERER.drawGuide(element);
            if (guide) {
                // enable event
                me.setResizable(element, guide, me._isResizable(element.shape));
                me._RENDERER.removeTerminal(element);
            }
        }
    },

    /**
     * 메뉴 : 선택된 Shape 들을 삭제한다.
     */
    deleteSelectedShape: function () {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=EDGE][_selected=true]").each(function (index, item) {
            if (item.id) {
                me._RENDERER.removeShape(item);
            }
        });
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, item) {
            if (item.id) {
                me._RENDERER.removeShape(item);
            }
        });
    },

    /**
     * 메뉴 : 모든 Shape 들을 선택한다.
     */
    selectAll: function () {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "]").each(function (index, element) {
            me.selectShape(element);
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들을 복사한다.
     */
    copySelectedShape: function () {
        var me = this, root = me._RENDERER.getRootGroup(), selectedElement = [];
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, element) {
            selectedElement.push(element);
        });
        $(root).data("copied", selectedElement);
    },

    /**
     * 메뉴 : 선택된 Shape 들을 잘라내기한다.
     */
    cutSelectedShape: function () {
        var me = this;
        me.copySelectedShape();
        me.deleteSelectedShape();
    },

    /**
     * 메뉴 : 선택된 Shape 들을 붙여넣기 한다.
     */
    pasteSelectedShape: function () {
        var me = this, root = me._RENDERER.getRootGroup(),
            copiedElement = $(root).data("copied"),
            selectedElement = [];
        if (copiedElement) {
            $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, item) {
                if (item.id) {
                    me._RENDERER.removeGuide(item);
                }
            });

            // TODO : 연결된 Shape 인 경우 연결성 유지토록
            $.each(copiedElement, function (idx, item) {
                // copy
                var boundary = item.shape.geom.getBoundary(), newShape, newElement, newGuide;
                newShape = item.shape.clone();

                if ($(item).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
                    if (item.shape.geom instanceof OG.geometry.BezierCurve) {
                        newShape.geom = new OG.BezierCurve(item.shape.geom.getControlPoints());
                    } else {
                        newShape.geom = new OG.PolyLine(item.shape.geom.getVertices());
                    }
                    newShape.geom.style = item.shape.geom.style;
                    newShape.geom.move(me._CONFIG.COPY_PASTE_PADDING, me._CONFIG.COPY_PASTE_PADDING);
                    newElement = me._RENDERER.drawShape(
                        null, newShape,
                        null, item.shapeStyle
                    );

                } else {
                    newElement = me._RENDERER.drawShape(
                        [ boundary.getCentroid().x + me._CONFIG.COPY_PASTE_PADDING, boundary.getCentroid().y + me._CONFIG.COPY_PASTE_PADDING ],
                        newShape, [boundary.getWidth(), boundary.getHeight()], item.shapeStyle
                    );
                }

                // custom data
                newElement.data = item.data;

                // enable event
                newGuide = me._RENDERER.drawGuide(newElement);
                me.setClickSelectable(newElement, me._isSelectable(newElement.shape));
                me.setMovable(newElement, me._isMovable(newElement.shape));
                me.setResizable(newElement, newGuide, me._isResizable(newElement.shape));
                if (me._CONFIG.GROUP_DROPABLE && newElement.shape.GROUP_DROPABLE) {
                    me.enableDragAndDropGroup(newElement);
                }
                if (me._CONFIG.GROUP_COLLAPSIBLE && newElement.shape.GROUP_COLLAPSIBLE) {
                    me.enableCollapse(newElement);
                }
                if (me._isConnectable(newElement.shape)) {
                    me.enableConnect(newElement);
                }
                if (me._isLabelEditable(newElement.shape)) {
                    me.enableEditLabel(newElement);
                }

                // copy children
                me._copyChildren(item, newElement);

                selectedElement.push(newElement);
            });
            $(root).data("copied", selectedElement);
        }
    },

    /**
     * 메뉴 : 선택된 Shape 들을 복제한다.
     */
    duplicateSelectedShape: function () {
        var me = this;
        me.copySelectedShape();
        me.pasteSelectedShape();
    },

    /**
     * 메뉴 : 선택된 Shape 들을 그룹핑한다.
     */
    groupSelectedShape: function () {
        var me = this, guide,
            groupElement = me._RENDERER.group($(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]"));

        if (groupElement) {
            $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
                me._RENDERER.removeGuide(item);
            });

            guide = me._RENDERER.drawGuide(groupElement);
            if (guide) {
                // enable event
                me.setClickSelectable(groupElement, me._isSelectable(groupElement.shape));
                me.setMovable(groupElement, me._isMovable(groupElement.shape));
                me.setResizable(groupElement, guide, me._isResizable(groupElement.shape));
                if (me._CONFIG.GROUP_DROPABLE && groupElement.shape.GROUP_DROPABLE) {
                    me.enableDragAndDropGroup(groupElement);
                }

                me._RENDERER.removeAllTerminal();
                me._RENDERER.toFront(guide.group);
            }
        }
    },

    /**
     * 메뉴 : 선택된 Shape 들을 그룹해제한다.
     */
    ungroupSelectedShape: function () {
        var me = this, guide,
            ungroupedElements = me._RENDERER.ungroup($(me._RENDERER.getRootElement()).find("[_shape=" + OG.Constants.SHAPE_TYPE.GROUP + "][_selected=true]"));
        $.each(ungroupedElements, function (idx, item) {
            guide = me._RENDERER.drawGuide(item);
            if (guide) {
                me._RENDERER.removeAllTerminal();
                me._RENDERER.toFront(guide.group);
            }
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들을 회전한다.
     *
     * @param {Number} angle 회전각도
     */
    rotateSelectedShape: function (angle) {
        var me = this, guide;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=" + OG.Constants.SHAPE_TYPE.EDGE + "][_selected=true]").each(function (idx, edge) {
            me._RENDERER.removeGuide(edge);
        });
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            if (item.shape && item.shape.TYPE !== OG.Constants.SHAPE_TYPE.EDGE &&
                item.shape.TYPE !== OG.Constants.SHAPE_TYPE.GROUP) {
                me._RENDERER.rotate(item, angle);

                me._RENDERER.removeGuide(item);
                guide = me._RENDERER.drawGuide(item);
                me.setResizable(item, guide, me._isResizable(item.shape));
                me._RENDERER.toFront(guide.group);
            }
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 Line Width 를 설정한다.
     *
     * @param {Number} lineWidth
     */
    setLineWidthSelectedShape: function (lineWidth) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"stroke-width": lineWidth});
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 Line Color 를 설정한다.
     *
     * @param {String} lineColor
     */
    setLineColorSelectedShape: function (lineColor) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"stroke": lineColor});
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 Line Type 을 설정한다.
     *
     * @param {String} lineType ['straight' | 'plain' | 'bezier']
     */
    setLineTypeSelectedShape: function (lineType) {
        var me = this, guide;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=" + OG.Constants.SHAPE_TYPE.EDGE + "][_selected=true]").each(function (idx, edge) {
            OG.Util.apply(edge.shape.geom.style.map, {"edge-type": lineType});
            edge.shapeStyle = edge.shapeStyle || {};
            OG.Util.apply(edge.shapeStyle, {"edge-type": lineType});

            me._RENDERER.redrawEdge(edge);

            me._RENDERER.removeGuide(edge);
            guide = me._RENDERER.drawGuide(edge);
            me.setResizable(edge, guide, me._isResizable(edge.shape));
            me._RENDERER.toFront(guide.group);
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 Line Style 을 설정한다.
     *
     * @param {String} lineStyle ['' | '-' | '.' | '-.' | '-..' | '. ' | '- ' | '--' | '- .' | '--.' | '--..']
     */
    setLineStyleSelectedShape: function (lineStyle) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"stroke-dasharray": lineStyle});
        });
    },

    /**
     * 메뉴 : 선택된 Edge Shape 들의 시작점 화살표 스타일을 설정한다.
     *
     * @param {String} arrowType ['block' | 'open_block' | 'classic' | 'diamond' | 'open_diamond' | 'open' | 'oval' | 'open_oval']
     */
    setArrowStartSelectedShape: function (arrowType) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"arrow-start": arrowType + '-wide-long'});
        });
    },

    /**
     * 메뉴 : 선택된 Edge Shape 들의 끝점 화살표 스타일을 설정한다.
     *
     * @param {String} arrowType [] ['block' | 'open_block' | 'classic' | 'diamond' | 'open_diamond' | 'open' | 'oval' | 'open_oval']
     */
    setArrowEndSelectedShape: function (arrowType) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"arrow-end": arrowType + '-wide-long'});
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 Fill Color 를 설정한다.
     *
     * @param {String} fillColor
     */
    setFillColorSelectedShape: function (fillColor) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"fill": fillColor, "fill-opacity": 1});
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 Fill Opacity 를 설정한다.
     *
     * @param {Number} fillOpacity [0 ~ 1]
     */
    setFillOpacitySelectedShape: function (fillOpacity) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"fill-opacity": fillOpacity});
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 Font Family 를 설정한다.
     *
     * @param {String} fontFamily
     */
    setFontFamilySelectedShape: function (fontFamily) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"font-family": fontFamily});
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 Font Size 를 설정한다.
     *
     * @param {Number} fontSize
     */
    setFontSizeSelectedShape: function (fontSize) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"font-size": fontSize});
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 Font Color 를 설정한다.
     *
     * @param {String} fontColor
     */
    setFontColorSelectedShape: function (fontColor) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"font-color": fontColor});
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 Font Weight 를 설정한다.
     *
     * @param {String} fontWeight ['bold' | 'normal']
     */
    setFontWeightSelectedShape: function (fontWeight) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"font-weight": fontWeight});
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 Font Style 을 설정한다.
     *
     * @param {String} fontStyle ['italic' | 'normal']
     */
    setFontStyleSelectedShape: function (fontStyle) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"font-style": fontStyle});
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 Text Decoration 을 설정한다.
     *
     * @param {String} textDecoration ['underline' | 'none']
     */
    setTextDecorationSelectedShape: function (textDecoration) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"text-decoration": textDecoration});
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 Label Direction 을 설정한다.
     *
     * @param {String} labelDirection ['vertical' | 'horizontal']
     */
    setLabelDirectionSelectedShape: function (labelDirection) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"label-direction": labelDirection});
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 Label Angle 을 설정한다.
     *
     * @param {Number} labelAngle
     */
    setLabelAngleSelectedShape: function (labelAngle) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"label-angle": labelAngle});
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 Label Position 을 설정한다.
     *
     * @param {String} labelPosition ['top' | 'bottom' | 'left' | 'right' | 'center']
     */
    setLabelPositionSelectedShape: function (labelPosition) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            if (labelPosition === 'top') {
                me._RENDERER.setShapeStyle(item, {
                    "label-position": labelPosition,
                    "text-anchor": "middle",
                    "vertical-align": "bottom"
                });
            } else if (labelPosition === 'bottom') {
                me._RENDERER.setShapeStyle(item, {
                    "label-position": labelPosition,
                    "text-anchor": "middle",
                    "vertical-align": "top"
                });
            } else if (labelPosition === 'left') {
                me._RENDERER.setShapeStyle(item, {
                    "label-position": labelPosition,
                    "text-anchor": "end",
                    "vertical-align": "center"
                });
            } else if (labelPosition === 'right') {
                me._RENDERER.setShapeStyle(item, {
                    "label-position": labelPosition,
                    "text-anchor": "start",
                    "vertical-align": "center"
                });
            } else if (labelPosition === 'center') {
                me._RENDERER.setShapeStyle(item, {
                    "label-position": labelPosition,
                    "text-anchor": "middle",
                    "vertical-align": "center"
                });
            }
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 라벨 Vertical Align 를 설정한다.
     *
     * @param {String} verticalAlign ['top' | 'middle' | 'bottom']
     */
    setLabelVerticalSelectedShape: function (verticalAlign) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"vertical-align": verticalAlign});
        });
    },

    /**
     * 메뉴 : 선택된 Shape 들의 라벨 Horizontal Align 를 설정한다.
     *
     * @param {String} horizontalAlign ['start' | 'middle' | 'end']
     */
    setLabelHorizontalSelectedShape: function (horizontalAlign) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.setShapeStyle(item, {"text-anchor": horizontalAlign});
        });
    },

    /**
     * 메뉴 : 선택된 Shape 의 라벨을 설정한다.
     *
     * @param {String} label
     */
    setLabelSelectedShape: function (label) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.drawLabel(item, label);
        });
    },

    /**
     * 메뉴 : 선택된 Edge Shape 의 시작점 라벨을 설정한다.
     *
     * @param {String} label
     */
    setEdgeFromLabelSelectedShape: function (label) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=" + OG.Constants.SHAPE_TYPE.EDGE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.drawEdgeLabel(item, label, 'FROM');
        });
    },

    /**
     * 메뉴 : 선택된 Edge Shape 의 끝점 라벨을 설정한다.
     *
     * @param {String} label
     */
    setEdgeToLabelSelectedShape: function (label) {
        var me = this;
        $(me._RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=" + OG.Constants.SHAPE_TYPE.EDGE + "][_selected=true]").each(function (idx, item) {
            me._RENDERER.drawEdgeLabel(item, label, 'TO');
        });
    },

    /**
     * 메뉴 : Zoom In
     */
    zoomIn: function () {
        var me = this;
        if (me._CONFIG.SCALE + me._CONFIG.SCALE * 0.1 <= me._CONFIG.SCALE_MAX) {
            me._RENDERER.setScale(me._CONFIG.SCALE + me._CONFIG.SCALE * 0.1);
        }
    },

    /**
     * 메뉴 : Zoom Out
     */
    zoomOut: function () {
        var me = this;
        if (me._CONFIG.SCALE - me._CONFIG.SCALE * 0.1 >= me._CONFIG.SCALE_MIN) {
            me._RENDERER.setScale(me._CONFIG.SCALE - me._CONFIG.SCALE * 0.1);
        }
    },

    /**
     * 메뉴 : 그려진 Shape 들을 캔버스 사이즈에 맞게 조절한다.
     */
    fitWindow: function () {
        var me = this, container = me._RENDERER.getContainer();
        me._RENDERER.fitCanvasSize([container.clientWidth, container.clientHeight], true);
    },

    /**
     * Edge 와 선택된 Shape 정보들과의 시작, 끝점 연결 정보를 반환한다.
     *
     * @param {Element} edgeEle
     * @param {Array} bBoxArray
     * @return {Object} 연결 정보. {none, all, either, attrEither}
     * @private
     */
    _isContainsConnectedShape: function (edgeEle, bBoxArray) {
        var me = this, fromTerminalId, toTerminalId, fromShape, toShape, isContainsFrom = false, isContainsTo = false, i;

        fromTerminalId = $(edgeEle).attr("_from");
        toTerminalId = $(edgeEle).attr("_to");
        if (fromTerminalId) {
            fromShape = me._getShapeFromTerminal(fromTerminalId);
        }
        if (toTerminalId) {
            toShape = me._getShapeFromTerminal(toTerminalId);
        }

        for (i = 0; i < bBoxArray.length; i++) {
            if (fromShape && bBoxArray[i].id === fromShape.id) {
                isContainsFrom = true;
            }
            if (toShape && bBoxArray[i].id === toShape.id) {
                isContainsTo = true;
            }
        }

        return {
            none: !isContainsFrom && !isContainsTo,
            all: isContainsFrom && isContainsTo,
            any: isContainsFrom || isContainsTo,
            either: (isContainsFrom && !isContainsTo) || (!isContainsFrom && isContainsTo),
            attrEither: (fromTerminalId && !toTerminalId) || (!fromTerminalId && toTerminalId)
        };
    },

    /**
     * 주어진 터미널 정보로 이를 포함하는 Shape 엘리먼트를 반환한다.
     *
     * @param {OG.shape.Terminal} terminal 연결 터미널
     * @return {Element} Shape 엘리먼트
     * @private
     */
    _getShapeFromTerminal: function (terminal) {
        var me = this, terminalId = OG.Util.isElement(terminal) ? terminal.id : terminal;
        return me._RENDERER.getElementById(terminalId.substring(0, terminalId.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP)));
    },

    /**
     * Page 및 Scroll offset 과 Scale 을 반영한 이벤트의 실제 offset 좌표를 반환한다.
     *
     * @param {Event} event
     * @return {Object} offset 정보. {x, y}
     * @private
     */
    _getOffset: function (event) {
        var me = this, container = me._RENDERER.getContainer();

        return {
            x: (event.pageX - $(container).offset().left + container.scrollLeft) / me._CONFIG.SCALE,
            y: (event.pageY - $(container).offset().top + container.scrollTop) / me._CONFIG.SCALE
        };
    },

    /**
     * 이동할 대상 즉, 선택된 Shape 정보를 반환한다.
     *
     * @return {Array} 선택된 Shape 정보. {id, box}' Array
     * @private
     */
    _getMoveTargets: function () {
        var me = this, bBoxArray = [], box, newBBoxArray = [];
        $(me._RENDERER.getRootElement()).find("[id$=" + OG.Constants.GUIDE_SUFFIX.BBOX + "]").each(function (index, item) {
            if (item.id) {
                box = me._RENDERER.clone(item);
                me._RENDERER.setAttr(box, me._CONFIG.DEFAULT_STYLE.GUIDE_SHADOW);

                bBoxArray.push({
                    id: item.id.replace(OG.Constants.GUIDE_SUFFIX.BBOX, ""),
                    box: box
                });
            }
        });

        // Edge 인 경우 먼저 등록, 연결된 Shape 이 있는 경우 목록에서 제거
        $.each(bBoxArray, function (k, item) {
            var ele = me._RENDERER.getElementById(item.id), isContainsResult;
            if ($(ele).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
                isContainsResult = me._isContainsConnectedShape(ele, bBoxArray);
                if (isContainsResult.all || isContainsResult.none || (isContainsResult.either && isContainsResult.attrEither)) {
                    newBBoxArray.push(item);
                } else {
                    me._RENDERER.remove(item.box);
                    me._RENDERER.removeGuide(ele);
                }
            }
        });

        // Edge 이외 목록에 등록
        $.each(bBoxArray, function (k, item) {
            var ele = me._RENDERER.getElementById(item.id);
            if ($(ele).attr("_shape") !== OG.Constants.SHAPE_TYPE.EDGE) {
                newBBoxArray.push(item);
            }
        });

        return newBBoxArray;
    },

    /**
     * 가로, 세로 Offset 만큼 주어진 Shape을 이동한다.
     *
     * @param {Array} bBoxArray 선택된 Shape 정보. {id, box}' Array
     * @param {Number} dx 가로 Offset
     * @param {Number} dy 세로 Offset
     * @return {Array} 이동된 Shape 정보. {id, box}' Array
     * @private
     */
    _moveElements: function (bBoxArray, dx, dy) {
        var me = this, excludeEdgeId = [], eleArray = [];

        $.each(bBoxArray, function (k, item) {
            var ele = me._RENDERER.getElementById(item.id);
            if ($(ele).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
                excludeEdgeId.push(item.id);
            }
        });

        $.each(bBoxArray, function (k, item) {
            var ele = me._RENDERER.getElementById(item.id);

            // cloned box 삭제
            me._RENDERER.remove(item.box);

            // 이동
            me._RENDERER.move(ele, [dx, dy], excludeEdgeId);
            me._RENDERER.drawGuide(ele);

            // Edge 인 경우 disconnect 처리(연결된 Shape 이 없는 경우)
            if ($(ele).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
                if (me._isContainsConnectedShape(ele, bBoxArray).none) {
                    me._RENDERER.disconnect(ele);
                }
            }

            eleArray.push(ele);
        });

        return eleArray;
    },

    /**
     * Canvas 영역을 벗어나서 드래그되는 경우 Canvas 확장한다.
     *
     * @param {Number} currentX
     * @param {Number} currentY
     * @private
     */
    _autoExtend: function (currentX, currentY) {
        var me = this, rootBBox = me._RENDERER.getRootBBox();

        // Canvas 영역을 벗어나서 드래그되는 경우 Canvas 확장
        if (me._CONFIG.AUTO_EXTENSIONAL && rootBBox.width < currentX * me._CONFIG.SCALE) {
            me._RENDERER.setCanvasSize([ rootBBox.width + me._CONFIG.AUTO_EXTENSION_SIZE, rootBBox.height]);
        }
        if (me._CONFIG.AUTO_EXTENSIONAL && rootBBox.height < currentY * me._CONFIG.SCALE) {
            me._RENDERER.setCanvasSize([ rootBBox.width, rootBBox.height + me._CONFIG.AUTO_EXTENSION_SIZE]);
        }
    },

    /**
     * 그룹 Shape 인 경우 포함된 하위 Shape 들을 복사한다.
     *
     * @param {Element} element 원본 부모 Shape 엘리먼트
     * @param {Element} newCopiedElement 복사된 부모 Shape 엘리먼트
     * @private
     */
    _copyChildren: function (element, newCopiedElement) {
        var me = this, children = element.childNodes;
        $.each(children, function (idx, item) {
            if ($(item).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
                // copy
                var boundary = item.shape.geom.getBoundary(), newShape, newElement, newGuide;
                newShape = item.shape.clone();

                if ($(item).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
                    newShape.geom = new OG.PolyLine(item.shape.geom.getVertices());
                    newShape.geom.style = item.shape.geom.style;
                    newShape.geom.move(me._CONFIG.COPY_PASTE_PADDING, me._CONFIG.COPY_PASTE_PADDING);
                    newElement = me._RENDERER.drawShape(
                        null, newShape,
                        null, item.shapeStyle
                    );

                } else {
                    newElement = me._RENDERER.drawShape(
                        [ boundary.getCentroid().x + me._CONFIG.COPY_PASTE_PADDING, boundary.getCentroid().y + me._CONFIG.COPY_PASTE_PADDING ],
                        newShape, [boundary.getWidth(), boundary.getHeight()], item.shapeStyle
                    );
                }

                // custom data
                newElement.data = item.data;

                // append child
                newCopiedElement.appendChild(newElement);

                // enable event
                me.setClickSelectable(newElement, me._isSelectable(newElement.shape));
                me.setMovable(newElement, me._isMovable(newElement.shape));
                if (me._CONFIG.GROUP_DROPABLE && newElement.shape.GROUP_DROPABLE) {
                    me.enableDragAndDropGroup(newElement);
                }
                if (me._CONFIG.GROUP_COLLAPSIBLE && newElement.shape.GROUP_COLLAPSIBLE) {
                    me.enableCollapse(newElement);
                }
                if (me._isConnectable(newElement.shape)) {
                    me.enableConnect(newElement);
                }
                if (me._isLabelEditable(newElement.shape)) {
                    me.enableEditLabel(newElement);
                }

                // recursive call
                if (item.childNodes.length > 0) {
                    me._copyChildren(item, newElement);
                }
            }
        });
    },

    /**
     * 하위 Shape 자식노드를 모두 deselect 처리한다.
     *
     * @param {Element} element
     * @private
     */
    _deselectChildren: function (element) {
        var me = this, children = element.childNodes;
        $.each(children, function (idx, item) {
            if ($(item).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
                if (item.childNodes.length > 0) {
                    me._deselectChildren(item);
                }

                if ($(item).attr("_selected") === "true") {
                    me._RENDERER.removeGuide(item);
                    $(item).draggable("destroy");
                }
            }
        });
    },

    /**
     * 선택되어진 Shape 부모노드가 하나라도 있다면 true 를 반환한다.
     *
     * @param {Element} element
     * @return {Boolean}
     * @private
     */
    _isParentSelected: function (element) {
        var me = this, parentNode = element.parentNode;
        if (parentNode) {
            if (me._isParentSelected(parentNode)) {
                return true;
            }

            if ($(parentNode).attr("_type") === OG.Constants.NODE_TYPE.SHAPE &&
                $(parentNode).attr("_selected") === "true") {
                return true;
            }
        }

        return false;
    },

    _num: function (str) {
        return parseInt(str, 10);
    },

    _grid: function (value) {
        var me = this;
        return me._CONFIG.DRAG_GRIDABLE ? OG.Util.roundGrid(value, me._CONFIG.MOVE_SNAP_SIZE) : value;
    },

    _isSelectable: function (shape) {
        var me = this;
        return me._CONFIG.SELECTABLE && shape.SELECTABLE;
    },

    _isConnectable: function (shape) {
        var me = this;
        return me._CONFIG.CONNECTABLE && shape.CONNECTABLE;
    },

    _isSelfConnectable: function (shape) {
        var me = this;
        return me._CONFIG.SELF_CONNECTABLE && shape.SELF_CONNECTABLE;
    },

    _isConnectCloneable: function (shape) {
        var me = this;
        return me._CONFIG.CONNECT_CLONEABLE && shape.CONNECT_CLONEABLE;
    },

    _isConnectRequired: function (shape) {
        var me = this;
        return me._CONFIG.CONNECT_REQUIRED && shape.CONNECT_REQUIRED;
    },

    _isMovable: function (shape) {
        var me = this;
        return (me._CONFIG.SELECTABLE && shape.SELECTABLE) &&
            (me._CONFIG.MOVABLE && me._CONFIG.MOVABLE_[shape.TYPE] && shape.MOVABLE);
    },

    _isResizable: function (shape) {
        var me = this;
        return (me._CONFIG.SELECTABLE && shape.SELECTABLE) &&
            (me._CONFIG.RESIZABLE && me._CONFIG.RESIZABLE_[shape.TYPE] && shape.RESIZABLE);
    },

    _isLabelEditable: function (shape) {
        var me = this;
        return me._CONFIG.LABEL_EDITABLE && me._CONFIG.LABEL_EDITABLE_[shape.TYPE] && shape.LABEL_EDITABLE;
    }
};
OG.handler.EventHandler.prototype.constructor = OG.handler.EventHandler;
OG.EventHandler = OG.handler.EventHandler;
/**
 * OpenGraph 캔버스 클래스
 *
 * @class
 * @requires OG.common.*, OG.geometry.*, OG.shape.*, OG.renderer.*, OG.handler.*, OG.layout.*, raphael-2.1.0
 *
 * @example
 * var canvas = new OG.Canvas('canvas', [1000, 800], 'white', 'url(./images/grid.gif)');
 *
 * var circleShape = canvas.drawShape([100, 100], new OG.CircleShape(), [100, 100]);
 * var ellipseShape = canvas.drawShape([300, 200], new OG.EllipseShape('label'), [100, 50]);
 *
 * var edge = canvas.connect(circleShape, ellipseShape);
 *
 * @param {HTMLElement,String} container 컨테이너 DOM element or ID
 * @param {Number[]} containerSize 컨테이너 Width, Height
 * @param {String} backgroundColor 캔버스 배경색
 * @param {String} backgroundImage 캔버스 배경이미지
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.graph.Canvas = function (container, containerSize, backgroundColor, backgroundImage) {

    this._CONFIG = {
        /**
         * 클릭선택 가능여부
         */
        SELECTABLE: true,

        /**
         * 마우스드래그선택 가능여부
         */
        DRAG_SELECTABLE: true,

        /**
         * 이동 가능여부
         */
        MOVABLE: true,
        MOVABLE_: {
            GEOM: true,
            TEXT: true,
            HTML: true,
            IMAGE: true,
            EDGE: true,
            GROUP: true
        },

        /**
         * 리사이즈 가능여부
         */
        RESIZABLE: true,
        RESIZABLE_: {
            GEOM: true,
            TEXT: true,
            HTML: true,
            IMAGE: true,
            EDGE: true,
            GROUP: true
        },

        /**
         * 연결 가능여부
         */
        CONNECTABLE: true,

        /**
         * Self 연결 가능여부
         */
        SELF_CONNECTABLE: true,

        /**
         * 드래그하여 연결시 대상 없을 경우 자동으로 Shape 복사하여 연결 처리 여부
         */
        CONNECT_CLONEABLE: true,

        /**
         * 드래그하여 연결시 연결대상 있는 경우에만 Edge 드로잉 처리 여부
         */
        CONNECT_REQUIRED: true,

        /**
         * 라벨 수정여부
         */
        LABEL_EDITABLE: true,
        LABEL_EDITABLE_: {
            GEOM: true,
            TEXT: true,
            HTML: true,
            IMAGE: true,
            EDGE: true,
            GROUP: true
        },

        /**
         * 그룹핑 가능여부
         */
        GROUP_DROPABLE: true,

        /**
         * 최소화 가능여부
         */
        GROUP_COLLAPSIBLE: true,

        /**
         * 이동, 리사이즈 드래그시 MOVE_SNAP_SIZE 적용 여부
         */
        DRAG_GRIDABLE: true,

        /**
         * 핫키 가능여부
         */
        ENABLE_HOTKEY: true,

        /**
         * 핫키 : DELETE 삭제 키 가능여부
         */
        ENABLE_HOTKEY_DELETE: true,

        /**
         * 핫키 : Ctrl+A 전체선택 키 가능여부
         */
        ENABLE_HOTKEY_CTRL_A: true,

        /**
         * 핫키 : Ctrl+C 복사 키 가능여부
         */
        ENABLE_HOTKEY_CTRL_C: true,

        /**
         * 핫키 : Ctrl+V 붙여넣기 키 가능여부
         */
        ENABLE_HOTKEY_CTRL_V: true,

        /**
         * 핫키 : Ctrl+D 복제하기 키 가능여부
         */
        ENABLE_HOTKEY_CTRL_D: true,

        /**
         * 핫키 : Ctrl+G 그룹 키 가능여부
         */
        ENABLE_HOTKEY_CTRL_G: true,

        /**
         * 핫키 : Ctrl+U 언그룹 키 가능여부
         */
        ENABLE_HOTKEY_CTRL_U: true,

        /**
         * 핫키 : 방향키 가능여부
         */
        ENABLE_HOTKEY_ARROW: true,

        /**
         * 핫키 : Shift + 방향키 가능여부
         */
        ENABLE_HOTKEY_SHIFT_ARROW: true,

        /**
         * 마우스 우클릭 메뉴 가능여부
         */
        ENABLE_CONTEXTMENU: true,

        /**
         * 캔버스 스케일(리얼 사이즈 : Scale = 1)
         */
        SCALE: 1,

        /**
         * 캔버스 최소 스케일
         */
        SCALE_MIN: 0.1,

        /**
         * 캔버스 최대 스케일
         */
        SCALE_MAX: 10,

        /**
         * Edge 꺽은선 패딩 사이즈
         */
        EDGE_PADDING: 20,

        /**
         * 라벨의 패딩 사이즈
         */
        LABEL_PADDING: 5,

        /**
         * 라벨 에디터(textarea)의 디폴트 width
         */
        LABEL_EDITOR_WIDTH: 70,

        /**
         * 라벨 에디터(textarea)의 디폴트 height
         */
        LABEL_EDITOR_HEIGHT: 16,

        /**
         * 시작, 끝점 라벨의 offsetTop 값
         */
        FROMTO_LABEL_OFFSET_TOP: 15,

        /**
         * Move & Resize 용 가이드 콘트롤 Rect 사이즈
         */
        GUIDE_RECT_SIZE: 8,

        /**
         * Move & Resize 용 가이드 가로, 세로 최소 사이즈
         */
        GUIDE_MIN_SIZE: 18,

        /**
         * Collapse & Expand 용 가이드 Rect 사이즈
         */
        COLLAPSE_SIZE: 10,

        /**
         * Shape Move & Resize 시 이동 간격
         */
        MOVE_SNAP_SIZE: 5,

        /**
         * 터미널 cross 사이즈
         */
        TERMINAL_SIZE: 3,

        /**
         * Shape 복사시 패딩 사이즈
         */
        COPY_PASTE_PADDING: 20,

        /**
         * Fit Canvas 시 패딩 사이즈
         */
        FIT_CANVAS_PADDING: 20,

        /**
         * 캔버스 영역 자동 확장 여부
         */
        AUTO_EXTENSIONAL: true,

        /**
         * 캔버스 영역 자동 확장시 증가 사이즈
         */
        AUTO_EXTENSION_SIZE: 100,

        /**
         * 캔버스 배경색
         */
        CANVAS_BACKGROUND: "#f9f9f9",

        /**
         * 디폴트 스타일 정의
         */
        DEFAULT_STYLE: {
            SHAPE: { cursor: "default" },
            GEOM: { stroke: "black", fill: "white", "fill-opacity": 0, "label-position": "center" },
            TEXT: { stroke: "none", "text-anchor": "middle" },
            HTML: { "label-position": "bottom", "text-anchor": "middle", "vertical-align": "top" },
            IMAGE: { "label-position": "bottom", "text-anchor": "middle", "vertical-align": "top" },
            EDGE: { stroke: "black", fill: "none", "fill-opacity": 0, "stroke-width": 1, "stroke-opacity": 1, "edge-type": "plain", "edge-direction": "c c", "arrow-start": "none", "arrow-end": "classic-wide-long", "stroke-dasharray": "", "label-position": "center" },
            EDGE_SHADOW: { stroke: "#00FF00", fill: "none", "fill-opacity": 0, "stroke-width": 1, "stroke-opacity": 1, "arrow-start": "none", "arrow-end": "none", "stroke-dasharray": "- " },
            EDGE_HIDDEN: { stroke: "white", fill: "none", "fill-opacity": 0, "stroke-width": 5, "stroke-opacity": 0 },
            GROUP: { stroke: "none", fill: "white", "fill-opacity": 0, "label-position": "bottom", "text-anchor": "middle", "vertical-align": "top" },
            GUIDE_BBOX: { stroke: "#00FF00", fill: "none", "stroke-dasharray": "- ", "shape-rendering": "crispEdges" },
            GUIDE_UL: { stroke: "black", fill: "#00FF00", cursor: "nwse-resize", "shape-rendering": "crispEdges" },
            GUIDE_UR: { stroke: "black", fill: "#00FF00", cursor: "nesw-resize", "shape-rendering": "crispEdges" },
            GUIDE_LL: { stroke: "black", fill: "#00FF00", cursor: "nesw-resize", "shape-rendering": "crispEdges" },
            GUIDE_LR: { stroke: "black", fill: "#00FF00", cursor: "nwse-resize", "shape-rendering": "crispEdges" },
            GUIDE_LC: { stroke: "black", fill: "#00FF00", cursor: "ew-resize", "shape-rendering": "crispEdges" },
            GUIDE_UC: { stroke: "black", fill: "#00FF00", cursor: "ns-resize", "shape-rendering": "crispEdges" },
            GUIDE_RC: { stroke: "black", fill: "#00FF00", cursor: "ew-resize", "shape-rendering": "crispEdges" },
            GUIDE_LWC: { stroke: "black", fill: "#00FF00", cursor: "ns-resize", "shape-rendering": "crispEdges" },
            GUIDE_FROM: { stroke: "black", fill: "#00FF00", cursor: "move", "shape-rendering": "crispEdges" },
            GUIDE_TO: { stroke: "black", fill: "#00FF00", cursor: "move", "shape-rendering": "crispEdges" },
            GUIDE_CTL_H: { stroke: "black", fill: "#00FF00", cursor: "ew-resize", "shape-rendering": "crispEdges" },
            GUIDE_CTL_V: { stroke: "black", fill: "#00FF00", cursor: "ns-resize", "shape-rendering": "crispEdges" },
            GUIDE_SHADOW: { stroke: "black", fill: "none", "stroke-dasharray": "- ", "shape-rendering": "crispEdges" },
            RUBBER_BAND: { stroke: "#0000FF", opacity: 0.2, fill: "#0077FF" },
            TERMINAL: { stroke: "#808080", "stroke-width": 1, fill: "r(0.5, 0.5)#FFFFFF-#808080", "fill-opacity": 0.5, cursor: "pointer" },
            TERMINAL_OVER: { stroke: "#0077FF", "stroke-width": 4, fill: "r(0.5, 0.5)#FFFFFF-#0077FF", "fill-opacity": 1, cursor: "pointer" },
            TERMINAL_BBOX: { stroke: "none", fill: "white", "fill-opacity": 0 },
            DROP_OVER_BBOX: { stroke: "#0077FF", fill: "none", opacity: 0.6, "shape-rendering": "crispEdges" },
            LABEL: { "font-size": 12, "font-color": "black" },
            LABEL_EDITOR: { position: "absolute", overflow: "visible", resize: "none", "text-align": "center", display: "block", padding: 0 },
            COLLAPSE: { stroke: "black", fill: "white", "fill-opacity": 0, cursor: "pointer", "shape-rendering": "crispEdges" },
            COLLAPSE_BBOX: { stroke: "none", fill: "white", "fill-opacity": 0 }
        }
    };

    this._RENDERER = container ? new OG.RaphaelRenderer(container, containerSize, backgroundColor, backgroundImage, this._CONFIG) : null;
    this._HANDLER = new OG.EventHandler(this._RENDERER, this._CONFIG);
    this._CONTAINER = OG.Util.isElement(container) ? container : document.getElementById(container);
};

OG.graph.Canvas.prototype = {

    /**
     * Canvas 의 설정값을 초기화한다.
     *
     * <pre>
     * - selectable         : 클릭선택 가능여부(디폴트 true)
     * - dragSelectable     : 마우스드래그선택 가능여부(디폴트 true)
     * - movable            : 이동 가능여부(디폴트 true)
     * - resizable          : 리사이즈 가능여부(디폴트 true)
     * - connectable        : 연결 가능여부(디폴트 true)
     * - selfConnectable    : Self 연결 가능여부(디폴트 true)
     * - connectCloneable   : 드래그하여 연결시 대상 없을 경우 자동으로 Shape 복사하여 연결 처리 여부(디폴트 true)
     * - connectRequired    : 드래그하여 연결시 연결대상 있는 경우에만 Edge 드로잉 처리 여부(디폴트 true)
     * - labelEditable      : 라벨 수정여부(디폴트 true)
     * - groupDropable      : 그룹핑 가능여부(디폴트 true)
     * - collapsible        : 최소화 가능여부(디폴트 true)
     * - enableHotKey       : 핫키 가능여부(디폴트 true)
     * - enableContextMenu  : 마우스 우클릭 메뉴 가능여부(디폴트 true)
     * </pre>
     *
     * @param {Object} config JSON 포맷의 configuration
     */
    initConfig: function (config) {
        if (config) {
            this._CONFIG.SELECTABLE = config.selectable === undefined ? this._CONFIG.SELECTABLE : config.selectable;
            this._CONFIG.DRAG_SELECTABLE = config.dragSelectable === undefined ? this._CONFIG.DRAG_SELECTABLE : config.dragSelectable;
            this._CONFIG.MOVABLE = config.movable === undefined ? this._CONFIG.MOVABLE : config.movable;
            this._CONFIG.RESIZABLE = config.resizable === undefined ? this._CONFIG.RESIZABLE : config.resizable;
            this._CONFIG.CONNECTABLE = config.connectable === undefined ? this._CONFIG.CONNECTABLE : config.connectable;
            this._CONFIG.SELF_CONNECTABLE = config.selfConnectable === undefined ? this._CONFIG.SELF_CONNECTABLE : config.selfConnectable;
            this._CONFIG.CONNECT_CLONEABLE = config.connectCloneable === undefined ? this._CONFIG.CONNECT_CLONEABLE : config.connectCloneable;
            this._CONFIG.CONNECT_REQUIRED = config.connectRequired === undefined ? this._CONFIG.CONNECT_REQUIRED : config.connectRequired;
            this._CONFIG.LABEL_EDITABLE = config.labelEditable === undefined ? this._CONFIG.LABEL_EDITABLE : config.labelEditable;
            this._CONFIG.GROUP_DROPABLE = config.groupDropable === undefined ? this._CONFIG.GROUP_DROPABLE : config.groupDropable;
            this._CONFIG.GROUP_COLLAPSIBLE = config.collapsible === undefined ? this._CONFIG.GROUP_COLLAPSIBLE : config.collapsible;
            this._CONFIG.ENABLE_HOTKEY = config.enableHotKey === undefined ? this._CONFIG.ENABLE_HOTKEY : config.enableHotKey;
            this._CONFIG.ENABLE_CONTEXTMENU = config.enableContextMenu === undefined ? this._CONFIG.ENABLE_CONTEXTMENU : config.enableContextMenu;
        }

        this._HANDLER.setDragSelectable(this._CONFIG.SELECTABLE && this._CONFIG.DRAG_SELECTABLE);
        this._HANDLER.setEnableHotKey(this._CONFIG.ENABLE_HOTKEY);
        if (this._CONFIG.ENABLE_CONTEXTMENU) {
            this._HANDLER.enableRootContextMenu();
            this._HANDLER.enableShapeContextMenu();
        }

        this.CONFIG_INITIALIZED = true;
    },

    /**
     * 랜더러를 반환한다.
     *
     * @return {OG.RaphaelRenderer}
     */
    getRenderer: function () {
        return this._RENDERER;
    },

    /**
     * 컨테이너 DOM element 를 반환한다.
     *
     * @return {HTMLElement}
     */
    getContainer: function () {
        return this._CONTAINER;
    },

    /**
     * 이벤트 핸들러를 반환한다.
     *
     * @return {OG.EventHandler}
     */
    getEventHandler: function () {
        return this._HANDLER;
    },

    /**
     * Shape 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
     *
     * @example
     * canvas.drawShape([100, 100], new OG.CircleShape(), [50, 50], {stroke:'red'});
     *
     * @param {Number[]} position 드로잉할 위치 좌표(중앙 기준)
     * @param {OG.shape.IShape} shape Shape
     * @param {Number[]} size Shape Width, Height
     * @param {OG.geometry.Style,Object} style 스타일 (Optional)
     * @param {String} id Element ID 지정 (Optional)
     * @param {String} parentId 부모 Element ID 지정 (Optional)
     * @return {Element} Group DOM Element with geometry
     */
    drawShape: function (position, shape, size, style, id, parentId, gridable) {
        // MOVE_SNAP_SIZE 적용
        if (this._CONFIG.DRAG_GRIDABLE && (!OG.Util.isDefined(gridable) || gridable === true)) {
            if (position) {
                position[0] = OG.Util.roundGrid(position[0], this._CONFIG.MOVE_SNAP_SIZE);
                position[1] = OG.Util.roundGrid(position[1], this._CONFIG.MOVE_SNAP_SIZE);
            }
            if (size) {
                size[0] = OG.Util.roundGrid(size[0], this._CONFIG.MOVE_SNAP_SIZE * 2);
                size[1] = OG.Util.roundGrid(size[1], this._CONFIG.MOVE_SNAP_SIZE * 2);
            }
        }

        var element = this._RENDERER.drawShape(position, shape, size, style, id);

        if (position && (shape.TYPE === OG.Constants.SHAPE_TYPE.EDGE)) {
            element = this._RENDERER.move(element, position);
        }

        if (parentId && this._RENDERER.getElementById(parentId)) {
            this._RENDERER.appendChild(element, parentId);
        }

        if (!this.CONFIG_INITIALIZED) {
            this.initConfig();
        }

        this._HANDLER.setClickSelectable(element, this._HANDLER._isSelectable(element.shape));
        this._HANDLER.setMovable(element, this._HANDLER._isMovable(element.shape));

        if (this._HANDLER._isConnectable(element.shape)) {
            this._HANDLER.enableConnect(element);
        }

        if (this._HANDLER._isLabelEditable(element.shape)) {
            this._HANDLER.enableEditLabel(element);
        }

        if (this._CONFIG.GROUP_DROPABLE && element.shape.GROUP_DROPABLE) {
            this._HANDLER.enableDragAndDropGroup(element);
        }

        if (this._CONFIG.GROUP_COLLAPSIBLE && element.shape.GROUP_COLLAPSIBLE) {
            this._HANDLER.enableCollapse(element);
        }

        return element;
    },

    /**
     * Shape 의 스타일을 변경한다.
     *
     * @param {Element} shapeElement Shape DOM element
     * @param {Object} style 스타일
     */
    setShapeStyle: function (shapeElement, style) {
        this._RENDERER.setShapeStyle(shapeElement, style);
    },

    /**
     * Shape 의 Label 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
     *
     * @param {Element,String} shapeElement Shape DOM element or ID
     * @param {String} text 텍스트
     * @param {OG.geometry.Style,Object} style 스타일
     * @return {Element} DOM Element
     * @override
     */
    drawLabel: function (shapeElement, text, style) {
        return this._RENDERER.drawLabel(shapeElement, text, style);
    },

    /**
     * Shape 의 연결된 Edge 를 redraw 한다.(이동 또는 리사이즈시)
     *
     * @param {Element} element
     * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
     */
    redrawConnectedEdge: function (element, excludeEdgeId) {
        this._RENDERER.redrawConnectedEdge(element, excludeEdgeId);
    },

    /**
     * 두개의 Shape 을 Edge 로 연결한다.
     *
     * @param {Element} fromElement from Shape Element
     * @param {Element} toElement to Shape Element
     * @param {OG.geometry.Style,Object} style 스타일
     * @param {String} label Label
     * @return {Element} 연결된 Edge 엘리먼트
     */
    connect: function (fromElement, toElement, style, label) {
        var terminalGroup, childTerminals, fromTerminal, toTerminal, i, edge, guide;

        // from Shape 센터 연결 터미널 찾기
        terminalGroup = this._RENDERER.drawTerminal(fromElement, OG.Constants.TERMINAL_TYPE.OUT);
        childTerminals = terminalGroup.terminal.childNodes;
        fromTerminal = childTerminals[0];
        for (i = 0; i < childTerminals.length; i++) {
            if (childTerminals[i].terminal && childTerminals[i].terminal.direction.toLowerCase() === "c") {
                fromTerminal = childTerminals[i];
                break;
            }
        }
        this._RENDERER.removeTerminal(fromElement);

        // to Shape 센터 연결 터미널 찾기
        terminalGroup = this._RENDERER.drawTerminal(toElement, OG.Constants.TERMINAL_TYPE.IN);
        childTerminals = terminalGroup.terminal.childNodes;
        toTerminal = childTerminals[0];
        for (i = 0; i < childTerminals.length; i++) {
            if (childTerminals[i].terminal && childTerminals[i].terminal.direction.toLowerCase() === "c") {
                toTerminal = childTerminals[i];
                break;
            }
        }
        this._RENDERER.removeTerminal(toElement);

        // draw edge
        edge = this._RENDERER.drawShape(null, new OG.EdgeShape(fromTerminal.terminal.position, toTerminal.terminal.position));

        // connect
        edge = this._RENDERER.connect(fromTerminal, toTerminal, edge, style, label);

        if (edge) {
            guide = this._RENDERER.drawGuide(edge);

            if (edge && guide) {
                // enable event
                this._HANDLER.setClickSelectable(edge, edge.shape.SELECTABLE);
                this._HANDLER.setMovable(edge, edge.shape.SELECTABLE && edge.shape.MOVABLE);
                this._HANDLER.setResizable(edge, guide, edge.shape.SELECTABLE && edge.shape.RESIZABLE);
                if (edge.shape.LABEL_EDITABLE) {
                    this._HANDLER.enableEditLabel(edge);
                }
                this._RENDERER.toFront(guide.group);
            }
        }

        return edge;
    },

    /**
     * 연결속성정보를 삭제한다. Edge 인 경우는 라인만 삭제하고, 일반 Shape 인 경우는 연결된 모든 Edge 를 삭제한다.
     *
     * @param {Element} element
     */
    disconnect: function (element) {
        this._RENDERER.disconnect(element);
    },

    /**
     * 주어진 Shape 들을 그룹핑한다.
     *
     * @param {Element[]} elements
     * @return {Element} Group Shape Element
     */
    group: function (elements) {
        var group = this._RENDERER.group(elements);

        // enable event
        this._HANDLER.setClickSelectable(group, group.shape.SELECTABLE);
        this._HANDLER.setMovable(group, group.shape.SELECTABLE && group.shape.MOVABLE);
        if (group.shape.LABEL_EDITABLE) {
            this._HANDLER.enableEditLabel(group);
        }

        return group;
    },

    /**
     * 주어진 그룹들을 그룹해제한다.
     *
     * @param {Element[]} groupElements
     * @return {Element[]} ungrouped Elements
     */
    ungroup: function (groupElements) {
        return this._RENDERER.ungroup(groupElements);
    },

    /**
     * 주어진 Shape 들을 그룹에 추가한다.
     *
     * @param {Element} groupElement
     * @param {Element[]} elements
     */
    addToGroup: function (groupElement, elements) {
        this._RENDERER.addToGroup(groupElement, elements);
    },

    /**
     * 주어진 Shape 이 그룹인 경우 collapse 한다.
     *
     * @param {Element} element
     */
    collapse: function (element) {
        this._RENDERERDERER.collapse(element);
    },

    /**
     * 주어진 Shape 이 그룹인 경우 expand 한다.
     *
     * @param {Element} element
     */
    expand: function (element) {
        this._RENDERER.expand(element);
    },

    /**
     * 드로잉된 모든 오브젝트를 클리어한다.
     */
    clear: function () {
        this._RENDERER.clear();
    },

    /**
     * Shape 을 캔버스에서 관련된 모두를 삭제한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    removeShape: function (element) {
        this._RENDERER.removeShape(element);
    },

    /**
     * 하위 엘리먼트만 제거한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    removeChild: function (element) {
        this._RENDERER.removeChild(element);
    },

    /**
     * ID에 해당하는 Element 의 Move & Resize 용 가이드를 제거한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    removeGuide: function (element) {
        this._RENDERER.removeGuide(element);
    },

    /**
     * 모든 Move & Resize 용 가이드를 제거한다.
     */
    removeAllGuide: function () {
        this._RENDERER.removeAllGuide();
    },

    /**
     * 랜더러 캔버스 Root Element 를 반환한다.
     *
     * @return {Element} Element
     */
    getRootElement: function () {
        return this._RENDERER.getRootElement();
    },

    /**
     * 랜더러 캔버스 Root Group Element 를 반환한다.
     *
     * @return {Element} Element
     */
    getRootGroup: function () {
        return this._RENDERER.getRootGroup();
    },

    /**
     * 주어진 지점을 포함하는 Top Element 를 반환한다.
     *
     * @param {Number[]} position 위치 좌표
     * @return {Element} Element
     */
    getElementByPoint: function (position) {
        return this._RENDERER.getElementByPoint(position);
    },

    /**
     * 주어진 Boundary Box 영역에 포함되는 Shape(GEOM, TEXT, IMAGE) Element 를 반환한다.
     *
     * @param {OG.geometry.Envelope} envelope Boundary Box 영역
     * @return {Element[]} Element
     */
    getElementsByBBox: function (envelope) {
        return this._RENDERER.getElementsByBBox(envelope);
    },

    /**
     * 엘리먼트에 속성값을 설정한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @param {Object} attribute 속성값
     */
    setAttr: function (element, attribute) {
        this._RENDERER.setAttr(element, attribute);
    },

    /**
     * 엘리먼트 속성값을 반환한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @param {String} attrName 속성이름
     * @return {Object} attribute 속성값
     */
    getAttr: function (element, attrName) {
        return this._RENDERER.getAttr(element, attrName);
    },

    /**
     * ID에 해당하는 Element 를 최상단 레이어로 이동한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    toFront: function (element) {
        this._RENDERER.toFront(element);
    },

    /**
     * ID에 해당하는 Element 를 최하단 레이어로 이동한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    toBack: function (element) {
        this._RENDERER.toBack(element);
    },

    /**
     * 랜더러 캔버스의 사이즈(Width, Height)를 반환한다.
     *
     * @return {Number[]} Canvas Width, Height
     */
    getCanvasSize: function () {
        this._RENDERER.getCanvasSize();
    },

    /**
     * 랜더러 캔버스의 사이즈(Width, Height)를 변경한다.
     *
     * @param {Number[]} size Canvas Width, Height
     */
    setCanvasSize: function (size) {
        this._RENDERER.setCanvasSize(size);
    },

    /**
     * 랜더러 캔버스의 사이즈(Width, Height)를 실제 존재하는 Shape 의 영역에 맞게 변경한다.
     *
     * @param {Number[]} minSize Canvas 최소 Width, Height
     * @param {Boolean} fitScale 주어진 minSize 에 맞게 fit 여부(Default:false)
     */
    fitCanvasSize: function (minSize, fitScale) {
        this._RENDERER.fitCanvasSize(minSize, fitScale);
    },

    /**
     * 새로운 View Box 영역을 설정한다. (ZoomIn & ZoomOut 가능)
     *
     * @param {Number[]} position 위치 좌표(좌상단 기준)
     * @param {Number[]} size Canvas Width, Height
     * @param {Boolean} isFit Fit 여부
     */
    setViewBox: function (position, size, isFit) {
        this._RENDERER.setViewBox(position, size, isFit);
    },

    /**
     * Scale 을 반환한다. (리얼 사이즈 : Scale = 1)
     *
     * @return {Number} 스케일값
     */
    getScale: function () {
        return this._RENDERER.getScale();
    },

    /**
     * Scale 을 설정한다. (리얼 사이즈 : Scale = 1)
     *
     * @param {Number} scale 스케일값
     */
    setScale: function (scale) {
        this._RENDERER.setScale(scale);
    },

    /**
     * ID에 해당하는 Element 를 캔버스에서 show 한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    show: function (element) {
        this._RENDERER.show(element);
    },

    /**
     * ID에 해당하는 Element 를 캔버스에서 hide 한다.
     *
     * @param {Element,String} element Element 또는 ID
     */
    hide: function (element) {
        this._RENDERER.hide(element);
    },

    /**
     * Source Element 를 Target Element 아래에 append 한다.
     *
     * @param {Element,String} srcElement Element 또는 ID
     * @param {Element,String} targetElement Element 또는 ID
     * @return {Element} Source Element
     */
    appendChild: function (srcElement, targetElement) {
        return this._RENDERER.appendChild(srcElement, targetElement);
    },

    /**
     * Source Element 를 Target Element 이후에 insert 한다.
     *
     * @param {Element,String} srcElement Element 또는 ID
     * @param {Element,String} targetElement Element 또는 ID
     * @return {Element} Source Element
     */
    insertAfter: function (srcElement, targetElement) {
        return this._RENDERER.insertAfter(srcElement, targetElement);
    },

    /**
     * Source Element 를 Target Element 이전에 insert 한다.
     *
     * @param {Element,String} srcElement Element 또는 ID
     * @param {Element,String} targetElement Element 또는 ID
     * @return {Element} Source Element
     */
    insertBefore: function (srcElement, targetElement) {
        return this._RENDERER.insertBefore(srcElement, targetElement);
    },

    /**
     * 해당 Element 를 가로, 세로 Offset 만큼 이동한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @param {Number[]} offset [가로, 세로]
     * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
     * @return {Element} Element
     */
    move: function (element, offset, excludeEdgeId) {
        return this._RENDERER.move(element, offset, excludeEdgeId);
    },

    /**
     * 주어진 중심좌표로 해당 Element 를 이동한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @param {Number[]} position [x, y]
     * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
     * @return {Element} Element
     */
    moveCentroid: function (element, position, excludeEdgeId) {
        return this._RENDERER.moveCentroid(element, position, excludeEdgeId);
    },

    /**
     * 중심 좌표를 기준으로 주어진 각도 만큼 회전한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @param {Number} angle 각도
     * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
     * @return {Element} Element
     */
    rotate: function (element, angle, excludeEdgeId) {
        return this._RENDERER.rotate(element, angle, excludeEdgeId);
    },

    /**
     * 상, 하, 좌, 우 외곽선을 이동한 만큼 리사이즈 한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @param {Number[]} offset [상, 하, 좌, 우] 각 방향으로 + 값
     * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
     * @return {Element} Element
     */
    resize: function (element, offset, excludeEdgeId) {
        return this._RENDERER.resize(element, offset, excludeEdgeId);
    },

    /**
     * 중심좌표는 고정한 채 Bounding Box 의 width, height 를 리사이즈 한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @param {Number[]} size [Width, Height]
     * @return {Element} Element
     */
    resizeBox: function (element, size) {
        return this._RENDERER.resizeBox(element, size);
    },

    /**
     * 노드 Element 를 복사한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {Element} Element
     */
    clone: function (element) {
        return this._RENDERER.clone(element);
    },

    /**
     * ID로 Node Element 를 반환한다.
     *
     * @param {String} id
     * @return {Element} Element
     */
    getElementById: function (id) {
        return this._RENDERER.getElementById(id);
    },

    /**
     * Shape 타입에 해당하는 Node Element 들을 반환한다.
     *
     * @param {String} shapeType Shape 타입(GEOM, HTML, IMAGE, EDGE, GROUP), Null 이면 모든 타입
     * @param {String} excludeType 제외 할 타입
     * @return {Element[]} Element's Array
     */
    getElementsByType: function (shapeType, excludeType) {
        return this._RENDERER.getElementsByType(shapeType, excludeType);
    },

    /**
     * Shape ID에 해당하는 Node Element 들을 반환한다.
     *
     * @param {String} shapeId Shape ID
     * @return {Element[]} Element's Array
     */
    getElementsByShapeId: function (shapeId) {
        var root = this.getRootGroup();
        return $(root).find("[_type=SHAPE][_shape_id='" + shapeId + "']");
    },

    /**
     * Edge 엘리먼트와 연결된 fromShape, toShape 엘리먼트를 반환한다.
     *
     * @param {Element,String} edgeElement Element 또는 ID
     * @return {Object}
     */
    getRelatedElementsFromEdge: function (edgeElement) {
        var me = this,
            edge = OG.Util.isElement(edgeElement) ? edgeElement : this.getElementById(edgeElement),
            getShapeFromTerminal = function (terminal) {
                var terminalId = OG.Util.isElement(terminal) ? terminal.id : terminal;
                if (terminalId) {
                    return me._RENDERER.getElementById(terminalId.substring(0, terminalId.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP)));
                } else {
                    return null;
                }
            };


        if ($(edge).attr('_shape') === OG.Constants.SHAPE_TYPE.EDGE) {
            return {
                from: getShapeFromTerminal($(edgeElement).attr('_from')),
                to: getShapeFromTerminal($(edgeElement).attr('_to'))
            };
        } else {
            return {
                from: null,
                to: null
            };
        }
    },

    /**
     * 해당 엘리먼트의 BoundingBox 영역 정보를 반환한다.
     *
     * @param {Element,String} element
     * @return {Object} {width, height, x, y, x2, y2}
     */
    getBBox: function (element) {
        return this._RENDERER.getBBox(element);
    },

    /**
     * 부모노드기준으로 캔버스 루트 엘리먼트의 BoundingBox 영역 정보를 반환한다.
     *
     * @return {Object} {width, height, x, y, x2, y2}
     */
    getRootBBox: function () {
        return this._RENDERER.getRootBBox();
    },

    /**
     * 부모노드기준으로 캔버스 루트 엘리먼트의 실제 Shape 이 차지하는 BoundingBox 영역 정보를 반환한다.
     *
     * @return {Object} {width, height, x, y, x2, y2}
     */
    getRealRootBBox: function () {
        return this._RENDERER.getRealRootBBox();
    },

    /**
     * SVG 인지 여부를 반환한다.
     *
     * @return {Boolean} svg 여부
     */
    isSVG: function () {
        return this._RENDERER.isSVG();
    },

    /**
     * VML 인지 여부를 반환한다.
     *
     * @return {Boolean} vml 여부
     */
    isVML: function () {
        return this._RENDERER.isVML();
    },

    /**
     * 주어진 Shape 엘리먼트에 커스텀 데이타를 저장한다.
     *
     * @param {Element,String} shapeElement Shape DOM Element or ID
     * @param {Object} data JSON 포맷의 Object
     */
    setCustomData: function (shapeElement, data) {
        var element = OG.Util.isElement(shapeElement) ? shapeElement : document.getElementById(shapeElement);
        element.data = data;
    },

    /**
     * 주어진 Shape 엘리먼트에 저장된 커스텀 데이터를 반환한다.
     *
     * @param {Element,String} shapeElement Shape DOM Element or ID
     * @return {Object} JSON 포맷의 Object
     */
    getCustomData: function (shapeElement) {
        var element = OG.Util.isElement(shapeElement) ? shapeElement : document.getElementById(shapeElement);
        return element.data;
    },

    /**
     *    Canvas 에 그려진 Shape 들을 OpenGraph XML 문자열로 export 한다.
     *
     * @return {String} XML 문자열
     */
    toXML: function () {
        return OG.Util.jsonToXml(this.toJSON());
    },

    /**
     * Canvas 에 그려진 Shape 들을 OpenGraph JSON 객체로 export 한다.
     *
     * @return {Object} JSON 포맷의 Object
     */
    toJSON: function () {
        var CANVAS = this,
            rootBBox = this._RENDERER.getRootBBox(),
            rootGroup = this._RENDERER.getRootGroup(),
            jsonObj = { opengraph: {
                '@width': rootBBox.width,
                '@height': rootBBox.height,
                cell: []
            }},
            childShape;

        childShape = function (node, isRoot) {
            $(node).children("[_type=SHAPE]").each(function (idx, item) {
                var shape = item.shape,
                    style = item.shapeStyle,
                    geom = shape.geom,
                    envelope = geom.getBoundary(),
                    cell = {},
                    vertices,
                    from,
                    to,
                    prevShapeIds,
                    nextShapeIds;

                cell['@id'] = $(item).attr('id');
                if (!isRoot) {
                    cell['@parent'] = $(node).attr('id');
                }
                cell['@shapeType'] = shape.TYPE;
                cell['@shapeId'] = shape.SHAPE_ID;
                cell['@x'] = envelope.getCentroid().x;
                cell['@y'] = envelope.getCentroid().y;
                cell['@width'] = envelope.getWidth();
                cell['@height'] = envelope.getHeight();
                if (style) {
                    cell['@style'] = escape(OG.JSON.encode(style));
                }

                if (shape.TYPE === OG.Constants.SHAPE_TYPE.EDGE) {
                    if ($(item).attr('_from')) {
                        cell['@from'] = $(item).attr('_from');
                    }
                    if ($(item).attr('_to')) {
                        cell['@to'] = $(item).attr('_to');
                    }
                } else {
                    prevShapeIds = CANVAS.getPrevShapeIds(item);
                    nextShapeIds = CANVAS.getNextShapeIds(item);
                    if (prevShapeIds.length > 0) {
                        cell['@from'] = prevShapeIds.toString();
                    }
                    if (nextShapeIds.length > 0) {
                        cell['@to'] = nextShapeIds.toString();
                    }
                }

                if ($(item).attr('_fromedge')) {
                    cell['@fromEdge'] = $(item).attr('_fromedge');
                }
                if ($(item).attr('_toedge')) {
                    cell['@toEdge'] = $(item).attr('_toedge');
                }
                if (shape.label) {
                    cell['@label'] = escape(shape.label);
                }
                if (shape.fromLabel) {
                    cell['@fromLabel'] = escape(shape.fromLabel);
                }
                if (shape.toLabel) {
                    cell['@toLabel'] = escape(shape.toLabel);
                }
                if (shape.angle && shape.angle !== 0) {
                    cell['@angle'] = shape.angle;
                }
                if (shape instanceof OG.shape.ImageShape) {
                    cell['@value'] = shape.image;
                } else if (shape instanceof OG.shape.HtmlShape) {
                    cell['@value'] = escape(shape.html);
                } else if (shape instanceof OG.shape.TextShape) {
                    cell['@value'] = escape(shape.text);
                } else if (shape instanceof OG.shape.EdgeShape) {
                    vertices = geom.getVertices();
                    from = vertices[0];
                    to = vertices[vertices.length - 1];
                    cell['@value'] = from + ',' + to;
                }
                if (geom) {
                    cell['@geom'] = escape(geom.toString());
                }
                if (item.data) {
                    cell['@data'] = escape(OG.JSON.encode(item.data));
                }

                jsonObj.opengraph.cell.push(cell);

                childShape(item, false);
            });
        };

        if (rootGroup.data) {
            jsonObj.opengraph['@data'] = escape(OG.JSON.encode(rootGroup.data));
        }

        childShape(rootGroup, true);

        return jsonObj;
    },

    /**
     * OpenGraph XML 문자열로 부터 Shape 을 드로잉한다.
     *
     * @param {String, Element} xml XML 문자열 또는 DOM Element
     * @return {Object} {width, height, x, y, x2, y2}
     */
    loadXML: function (xml) {
        if (!OG.Util.isElement(xml)) {
            xml = OG.Util.parseXML(xml);
        }
        return this.loadJSON(OG.Util.xmlToJson(xml));
    },

    /**
     * JSON 객체로 부터 Shape 을 드로잉한다.
     *
     * @param {Object} json JSON 포맷의 Object
     * @return {Object} {width, height, x, y, x2, y2}
     */
    loadJSON: function (json) {
        var canvasWidth, canvasHeight, rootGroup,
            minX = Number.MAX_VALUE, minY = Number.MAX_VALUE, maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE,
            i, cell, shape, id, parent, shapeType, shapeId, x, y, width, height, style, geom, from, to,
            fromEdge, toEdge, label, fromLabel, toLabel, angle, value, data, element;

        this._RENDERER.clear();

        if (json && json.opengraph && json.opengraph.cell && OG.Util.isArray(json.opengraph.cell)) {
            canvasWidth = json.opengraph['@width'];
            canvasHeight = json.opengraph['@height'];

            data = json.opengraph['@data'];
            if (data) {
                rootGroup = this.getRootGroup();
                rootGroup.data = OG.JSON.decode(unescape(data));
            }

            cell = json.opengraph.cell;
            for (i = 0; i < cell.length; i++) {
                id = cell[i]['@id'];
                parent = cell[i]['@parent'];
                shapeType = cell[i]['@shapeType'];
                shapeId = cell[i]['@shapeId'];
                x = parseInt(cell[i]['@x'], 10);
                y = parseInt(cell[i]['@y'], 10);
                width = parseInt(cell[i]['@width'], 10);
                height = parseInt(cell[i]['@height'], 10);
                style = unescape(cell[i]['@style']);
                geom = unescape(cell[i]['@geom']);

                from = cell[i]['@from'];
                to = cell[i]['@to'];
                fromEdge = cell[i]['@fromEdge'];
                toEdge = cell[i]['@toEdge'];
                label = cell[i]['@label'];
                fromLabel = cell[i]['@fromLabel'];
                toLabel = cell[i]['@toLabel'];
                angle = cell[i]['@angle'];
                value = cell[i]['@value'];
                data = cell[i]['@data'];

                label = label ? unescape(label) : label;

                minX = (minX > (x - width / 2)) ? (x - width / 2) : minX;
                minY = (minY > (y - height / 2)) ? (y - height / 2) : minY;
                maxX = (maxX < (x + width / 2)) ? (x + width / 2) : maxX;
                maxY = (maxY < (y + height / 2)) ? (y + height / 2) : maxY;

                switch (shapeType) {
                    case OG.Constants.SHAPE_TYPE.GEOM:
                    case OG.Constants.SHAPE_TYPE.GROUP:
                        shape = eval('new ' + shapeId + '()');
                        if (label) {
                            shape.label = label;
                        }
                        element = this.drawShape([x, y], shape, [width, height], OG.JSON.decode(style), id, parent, false);
                        break;
                    case OG.Constants.SHAPE_TYPE.EDGE:
                        shape = eval('new ' + shapeId + '(' + value + ')');
                        if (label) {
                            shape.label = label;
                        }
                        if (fromLabel) {
                            shape.fromLabel = unescape(fromLabel);
                        }
                        if (toLabel) {
                            shape.toLabel = unescape(toLabel);
                        }
                        if (geom) {
                            geom = OG.JSON.decode(geom);
                            if (geom.type === OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.POLYLINE]) {
                                geom = new OG.geometry.PolyLine(geom.vertices);
                                shape.geom = geom;
                            } else if (geom.type === OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.CURVE]) {
                                geom = new OG.geometry.Curve(geom.controlPoints);
                                shape.geom = geom;
                            }
                        }
                        element = this.drawShape(null, shape, null, OG.JSON.decode(style), id, parent, false);
                        break;
                    case OG.Constants.SHAPE_TYPE.HTML:
                        shape = eval('new ' + shapeId + '()');
                        if (value) {
                            shape.html = unescape(value);
                        }
                        if (label) {
                            shape.label = label;
                        }
                        element = this.drawShape([x, y], shape, [width, height, angle], OG.JSON.decode(style), id, parent, false);
                        break;
                    case OG.Constants.SHAPE_TYPE.IMAGE:
                        shape = eval('new ' + shapeId + '(\'' + value + '\')');
                        if (label) {
                            shape.label = label;
                        }
                        element = this.drawShape([x, y], shape, [width, height, angle], OG.JSON.decode(style), id, parent, false);
                        break;
                    case OG.Constants.SHAPE_TYPE.TEXT:
                        shape = eval('new ' + shapeId + '()');
                        if (value) {
                            shape.text = unescape(value);
                        }
                        element = this.drawShape([x, y], shape, [width, height, angle], OG.JSON.decode(style), id, parent, false);
                        break;
                }

                if (from) {
                    $(element).attr('_from', from);
                }
                if (to) {
                    $(element).attr('_to', to);
                }
                if (fromEdge) {
                    $(element).attr('_fromedge', fromEdge);
                }
                if (toEdge) {
                    $(element).attr('_toedge', toEdge);
                }
                if (data) {
                    element.data = OG.JSON.decode(unescape(data));
                }
            }

            this.setCanvasSize([canvasWidth, canvasHeight]);

            return {
                width: maxX - minX,
                height: maxY - minY,
                x: minX,
                y: minY,
                x2: maxX,
                y2: maxY
            };
        }

        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            x2: 0,
            y2: 0
        };
    },

    /**
     * 연결된 이전 Edge Element 들을 반환한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {Element[]} Previous Element's Array
     */
    getPrevEdges: function (element) {
        return this._RENDERER.getPrevEdges(element);
    },

    /**
     * 연결된 이후 Edge Element 들을 반환한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {Element[]} Previous Element's Array
     */
    getNextEdges: function (element) {
        return this._RENDERER.getNextEdges(element);
    },

    /**
     * 연결된 이전 노드 Element 들을 반환한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {Element[]} Previous Element's Array
     */
    getPrevShapes: function (element) {
        return this._RENDERER.getPrevShapes(element);
    },

    /**
     * 연결된 이전 노드 Element ID들을 반환한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {String[]} Previous Element Id's Array
     */
    getPrevShapeIds: function (element) {
        return this._RENDERER.getPrevShapeIds(element);
    },

    /**
     * 연결된 이후 노드 Element 들을 반환한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {Element[]} Previous Element's Array
     */
    getNextShapes: function (element) {
        return this._RENDERER.getNextShapes(element);
    },

    /**
     * 연결된 이후 노드 Element ID들을 반환한다.
     *
     * @param {Element,String} element Element 또는 ID
     * @return {String[]} Previous Element Id's Array
     */
    getNextShapeIds: function (element) {
        return this._RENDERER.getNextShapeIds(element);
    },

    /**
     * Shape 이 처음 Draw 되었을 때의 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, shapeElement)
     */
    onDrawShape: function (callbackFunc) {
        $(this.getRootElement()).bind('drawShape', function (event, shapeElement) {
            callbackFunc(event, shapeElement);
        });
    },

    /**
     * 라벨이 Draw 되었을 때의 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, shapeElement, labelText)
     */
    onDrawLabel: function (callbackFunc) {
        $(this.getRootElement()).bind('drawLabel', function (event, shapeElement, labelText) {
            callbackFunc(event, shapeElement, labelText);
        });
    },

    /**
     * 라벨이 Change 되었을 때의 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, shapeElement, afterText, beforeText)
     */
    onLabelChanged: function (callbackFunc) {
        $(this.getRootElement()).bind('labelChanged', function (event, shapeElement, afterText, beforeText) {
            callbackFunc(event, shapeElement, afterText, beforeText);
        });
    },

    /**
     * 라벨이 Change 되기전 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, shapeElement, afterText, beforeText)
     */
    onBeforeLabelChange: function (callbackFunc) {
        $(this.getRootElement()).bind('beforeLabelChange', function (event) {
            if (callbackFunc(event, event.element, event.afterText, event.beforeText) === false) {
                event.stopPropagation();
            }
        });
    },

    /**
     * Shape 이 Redraw 되었을 때의 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, shapeElement)
     */
    onRedrawShape: function (callbackFunc) {
        $(this.getRootElement()).bind('redrawShape', function (event, shapeElement) {
            callbackFunc(event, shapeElement);
        });
    },

    /**
     * Shape 이 Remove 될 때의 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, shapeElement)
     */
    onRemoveShape: function (callbackFunc) {
        $(this.getRootElement()).bind('removeShape', function (event, shapeElement) {
            callbackFunc(event, shapeElement);
        });
    },

    /**
     * Shape 이 Rotate 될 때의 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, element, angle)
     */
    onRotateShape: function (callbackFunc) {
        $(this.getRootElement()).bind('rotateShape', function (event, element, angle) {
            callbackFunc(event, element, angle);
        });
    },

    /**
     * Shape 이 Move 되었을 때의 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, shapeElement, offset)
     */
    onMoveShape: function (callbackFunc) {
        $(this.getRootElement()).bind('moveShape', function (event, shapeElement, offset) {
            callbackFunc(event, shapeElement, offset);
        });
    },

    /**
     * Shape 이 Resize 되었을 때의 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, shapeElement, offset)
     */
    onResizeShape: function (callbackFunc) {
        $(this.getRootElement()).bind('resizeShape', function (event, shapeElement, offset) {
            callbackFunc(event, shapeElement, offset);
        });
    },

    /**
     * Shape 이 Connect 되기전 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, edgeElement, fromElement, toElement)
     */
    onBeforeConnectShape: function (callbackFunc) {
        $(this.getRootElement()).bind('beforeConnectShape', function (event) {
            if (callbackFunc(event, event.edge, event.fromShape, event.toShape) === false) {
                event.stopPropagation();
            }
        });
    },

    /**
     * Shape 이 Remove 되기전 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, element)
     */
    onBeforeRemoveShape: function (callbackFunc) {
        $(this.getRootElement()).bind('beforeRemoveShape', function (event) {
            if (callbackFunc(event, event.element) === false) {
                event.stopPropagation();
            }
        });
    },

    /**
     * Shape 이 Connect 되었을 때의 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, edgeElement, fromElement, toElement)
     */
    onConnectShape: function (callbackFunc) {
        $(this.getRootElement()).bind('connectShape', function (event, edgeElement, fromElement, toElement) {
            callbackFunc(event, edgeElement, fromElement, toElement);
        });
    },

    /**
     * Shape 이 Disconnect 되었을 때의 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, edgeElement, fromElement, toElement)
     */
    onDisconnectShape: function (callbackFunc) {
        $(this.getRootElement()).bind('disconnectShape', function (event, edgeElement, fromElement, toElement) {
            callbackFunc(event, edgeElement, fromElement, toElement);
        });
    },

    /**
     * Shape 이 Grouping 되었을 때의 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, groupElement)
     */
    onGroup: function (callbackFunc) {
        $(this.getRootElement()).bind('group', function (event, groupElement) {
            callbackFunc(event, groupElement);
        });
    },

    /**
     * Shape 이 UnGrouping 되었을 때의 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, ungroupedElements)
     */
    onUnGroup: function (callbackFunc) {
        $(this.getRootElement()).bind('ungroup', function (event, ungroupedElements) {
            callbackFunc(event, ungroupedElements);
        });
    },

    /**
     * Group 이 Collapse 되었을 때의 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, element)
     */
    onCollapsed: function (callbackFunc) {
        $(this.getRootElement()).bind('collapsed', function (event, element) {
            callbackFunc(event, element);
        });
    },

    /**
     * Group 이 Expand 되었을 때의 이벤트 리스너
     *
     * @param {Function} callbackFunc 콜백함수(event, element)
     */
    onExpanded: function (callbackFunc) {
        $(this.getRootElement()).bind('expanded', function (event, element) {
            callbackFunc(event, element);
        });
    }
};
OG.graph.Canvas.prototype.constructor = OG.graph.Canvas;
OG.Canvas = OG.graph.Canvas;

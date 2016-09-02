later = function () {
	var e = {version: "1.1.6"};
	return Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
		"use strict";
		if (null == this)throw new TypeError;
		var t = Object(this), n = t.length >>> 0;
		if (0 === n)return -1;
		var r = 0;
		if (arguments.length > 1 && (r = Number(arguments[1]), r != r ? r = 0 : 0 != r && 1 / 0 != r && r != -1 / 0 && (r = (r > 0 || -1) * Math.floor(Math.abs(r)))), r >= n)return -1;
		for (var a = r >= 0 ? r : Math.max(n - Math.abs(r), 0); n > a; a++)if (a in t && t[a] === e)return a;
		return -1
	}), String.prototype.trim || (String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, "")
	}), e.array = {}, e.array.sort = function (e, t) {
		e.sort(function (e, t) {
			return +e - +t
		}), t && 0 === e[0] && e.push(e.shift())
	}, e.array.next = function (e, t, n) {
		for (var r, a = 0 !== n[0], i = 0, u = t.length - 1; u > -1; --u) {
			if (r = t[u], r === e)return r;
			if (!(r > e || 0 === r && a && n[1] > e))break;
			i = u
		}
		return t[i]
	}, e.array.nextInvalid = function (e, t, n) {
		for (var r = n[0], a = n[1], i = t.length, u = 0 === t[i - 1] && 0 !== r ? a : 0, o = e, f = t.indexOf(e), d = o; o === (t[f] || u);)if (o++, o > a && (o = r), f++, f === i && (f = 0), o === d)return void 0;
		return o
	}, e.array.prev = function (e, t, n) {
		for (var r, a = t.length, i = 0 !== n[0], u = a - 1, o = 0; a > o; o++) {
			if (r = t[o], r === e)return r;
			if (!(e > r || 0 === r && i && n[1] < e))break;
			u = o
		}
		return t[u]
	}, e.array.prevInvalid = function (e, t, n) {
		for (var r = n[0], a = n[1], i = t.length, u = 0 === t[i - 1] && 0 !== r ? a : 0, o = e, f = t.indexOf(e), d = o; o === (t[f] || u);)if (o--, r > o && (o = a), f--, -1 === f && (f = i - 1), o === d)return void 0;
		return o
	}, e.day = e.D = {
		name: "day", range: 86400, val: function (t) {
			return t.D || (t.D = e.date.getDate.call(t))
		}, isValid: function (t, n) {
			return e.D.val(t) === (n || e.D.extent(t)[1])
		}, extent: function (t) {
			if (t.DExtent)return t.DExtent;
			var n = e.M.val(t), r = e.DAYS_IN_MONTH[n - 1];
			return 2 === n && 366 === e.dy.extent(t)[1] && (r += 1), t.DExtent = [1, r]
		}, start: function (t) {
			return t.DStart || (t.DStart = e.date.next(e.Y.val(t), e.M.val(t), e.D.val(t)))
		}, end: function (t) {
			return t.DEnd || (t.DEnd = e.date.prev(e.Y.val(t), e.M.val(t), e.D.val(t)))
		}, next: function (t, n) {
			n = n > e.D.extent(t)[1] ? 1 : n;
			var r = e.date.nextRollover(t, n, e.D, e.M), a = e.D.extent(r)[1];
			return n = n > a ? 1 : n || a, e.date.next(e.Y.val(r), e.M.val(r), n)
		}, prev: function (t, n) {
			var r = e.date.prevRollover(t, n, e.D, e.M), a = e.D.extent(r)[1];
			return e.date.prev(e.Y.val(r), e.M.val(r), n > a ? a : n || a)
		}
	}, e.dayOfWeekCount = e.dc = {
		name: "day of week count",
		range: 604800,
		val: function (t) {
			return t.dc || (t.dc = Math.floor((e.D.val(t) - 1) / 7) + 1)
		},
		isValid: function (t, n) {
			return e.dc.val(t) === n || 0 === n && e.D.val(t) > e.D.extent(t)[1] - 7
		},
		extent: function (t) {
			return t.dcExtent || (t.dcExtent = [1, Math.ceil(e.D.extent(t)[1] / 7)])
		},
		start: function (t) {
			return t.dcStart || (t.dcStart = e.date.next(e.Y.val(t), e.M.val(t), Math.max(1, 7 * (e.dc.val(t) - 1) + 1 || 1)))
		},
		end: function (t) {
			return t.dcEnd || (t.dcEnd = e.date.prev(e.Y.val(t), e.M.val(t), Math.min(7 * e.dc.val(t), e.D.extent(t)[1])))
		},
		next: function (t, n) {
			n = n > e.dc.extent(t)[1] ? 1 : n;
			var r = e.date.nextRollover(t, n, e.dc, e.M), a = e.dc.extent(r)[1];
			n = n > a ? 1 : n;
			var i = e.date.next(e.Y.val(r), e.M.val(r), 0 === n ? e.D.extent(r)[1] - 6 : 1 + 7 * (n - 1));
			return i.getTime() <= t.getTime() ? (r = e.M.next(t, e.M.val(t) + 1), e.date.next(e.Y.val(r), e.M.val(r), 0 === n ? e.D.extent(r)[1] - 6 : 1 + 7 * (n - 1))) : i
		},
		prev: function (t, n) {
			var r = e.date.prevRollover(t, n, e.dc, e.M), a = e.dc.extent(r)[1];
			return n = n > a ? a : n || a, e.dc.end(e.date.prev(e.Y.val(r), e.M.val(r), 1 + 7 * (n - 1)))
		}
	}, e.dayOfWeek = e.dw = e.d = {
		name: "day of week",
		range: 86400,
		val: function (t) {
			return t.dw || (t.dw = e.date.getDay.call(t) + 1)
		},
		isValid: function (t, n) {
			return e.dw.val(t) === (n || 7)
		},
		extent: function () {
			return [1, 7]
		},
		start: function (t) {
			return e.D.start(t)
		},
		end: function (t) {
			return e.D.end(t)
		},
		next: function (t, n) {
			return n = n > 7 ? 1 : n || 7, e.date.next(e.Y.val(t), e.M.val(t), e.D.val(t) + (n - e.dw.val(t)) + (n <= e.dw.val(t) ? 7 : 0))
		},
		prev: function (t, n) {
			return n = n > 7 ? 7 : n || 7, e.date.prev(e.Y.val(t), e.M.val(t), e.D.val(t) + (n - e.dw.val(t)) + (n >= e.dw.val(t) ? -7 : 0))
		}
	}, e.dayOfYear = e.dy = {
		name: "day of year",
		range: 86400,
		val: function (t) {
			return t.dy || (t.dy = Math.ceil(1 + (e.D.start(t).getTime() - e.Y.start(t).getTime()) / e.DAY))
		},
		isValid: function (t, n) {
			return e.dy.val(t) === (n || e.dy.extent(t)[1])
		},
		extent: function (t) {
			var n = e.Y.val(t);
			return t.dyExtent || (t.dyExtent = [1, n % 4 ? 365 : 366])
		},
		start: function (t) {
			return e.D.start(t)
		},
		end: function (t) {
			return e.D.end(t)
		},
		next: function (t, n) {
			n = n > e.dy.extent(t)[1] ? 1 : n;
			var r = e.date.nextRollover(t, n, e.dy, e.Y), a = e.dy.extent(r)[1];
			return n = n > a ? 1 : n || a, e.date.next(e.Y.val(r), e.M.val(r), n)
		},
		prev: function (t, n) {
			var r = e.date.prevRollover(t, n, e.dy, e.Y), a = e.dy.extent(r)[1];
			return n = n > a ? a : n || a, e.date.prev(e.Y.val(r), e.M.val(r), n)
		}
	}, e.hour = e.h = {
		name: "hour", range: 3600, val: function (t) {
			return t.h || (t.h = e.date.getHour.call(t))
		}, isValid: function (t, n) {
			return e.h.val(t) === n
		}, extent: function () {
			return [0, 23]
		}, start: function (t) {
			return t.hStart || (t.hStart = e.date.next(e.Y.val(t), e.M.val(t), e.D.val(t), e.h.val(t)))
		}, end: function (t) {
			return t.hEnd || (t.hEnd = e.date.prev(e.Y.val(t), e.M.val(t), e.D.val(t), e.h.val(t)))
		}, next: function (t, n) {
			n = n > 23 ? 0 : n;
			var r = e.date.next(e.Y.val(t), e.M.val(t), e.D.val(t) + (n <= e.h.val(t) ? 1 : 0), n);
			return !e.date.isUTC && r.getTime() <= t.getTime() && (r = e.date.next(e.Y.val(r), e.M.val(r), e.D.val(r), n + 1)), r
		}, prev: function (t, n) {
			return n = n > 23 ? 23 : n, e.date.prev(e.Y.val(t), e.M.val(t), e.D.val(t) + (n >= e.h.val(t) ? -1 : 0), n)
		}
	}, e.minute = e.m = {
		name: "minute", range: 60, val: function (t) {
			return t.m || (t.m = e.date.getMin.call(t))
		}, isValid: function (t, n) {
			return e.m.val(t) === n
		}, extent: function () {
			return [0, 59]
		}, start: function (t) {
			return t.mStart || (t.mStart = e.date.next(e.Y.val(t), e.M.val(t), e.D.val(t), e.h.val(t), e.m.val(t)))
		}, end: function (t) {
			return t.mEnd || (t.mEnd = e.date.prev(e.Y.val(t), e.M.val(t), e.D.val(t), e.h.val(t), e.m.val(t)))
		}, next: function (t, n) {
			var r = e.m.val(t), a = e.s.val(t), i = n > 59 ? 60 - r : r >= n ? 60 - r + n : n - r, u = new Date(t.getTime() + i * e.MIN - a * e.SEC);
			return !e.date.isUTC && u.getTime() <= t.getTime() && (u = new Date(t.getTime() + (i + 120) * e.MIN - a * e.SEC)), u
		}, prev: function (t, n) {
			return n = n > 59 ? 59 : n, e.date.prev(e.Y.val(t), e.M.val(t), e.D.val(t), e.h.val(t) + (n >= e.m.val(t) ? -1 : 0), n)
		}
	}, e.month = e.M = {
		name: "month", range: 2629740, val: function (t) {
			return t.M || (t.M = e.date.getMonth.call(t) + 1)
		}, isValid: function (t, n) {
			return e.M.val(t) === (n || 12)
		}, extent: function () {
			return [1, 12]
		}, start: function (t) {
			return t.MStart || (t.MStart = e.date.next(e.Y.val(t), e.M.val(t)))
		}, end: function (t) {
			return t.MEnd || (t.MEnd = e.date.prev(e.Y.val(t), e.M.val(t)))
		}, next: function (t, n) {
			return n = n > 12 ? 1 : n || 12, e.date.next(e.Y.val(t) + (n > e.M.val(t) ? 0 : 1), n)
		}, prev: function (t, n) {
			return n = n > 12 ? 12 : n || 12, e.date.prev(e.Y.val(t) - (n >= e.M.val(t) ? 1 : 0), n)
		}
	}, e.second = e.s = {
		name: "second", range: 1, val: function (t) {
			return t.s || (t.s = e.date.getSec.call(t))
		}, isValid: function (t, n) {
			return e.s.val(t) === n
		}, extent: function () {
			return [0, 59]
		}, start: function (e) {
			return e
		}, end: function (e) {
			return e
		}, next: function (t, n) {
			var r = e.s.val(t), a = n > 59 ? 60 - r : r >= n ? 60 - r + n : n - r, i = new Date(t.getTime() + a * e.SEC);
			return !e.date.isUTC && i.getTime() <= t.getTime() && (i = new Date(t.getTime() + (a + 7200) * e.SEC)), i
		}, prev: function (t, n) {
			return n = n > 59 ? 59 : n, e.date.prev(e.Y.val(t), e.M.val(t), e.D.val(t), e.h.val(t), e.m.val(t) + (n >= e.s.val(t) ? -1 : 0), n)
		}
	}, e.time = e.t = {
		name: "time", range: 1, val: function (t) {
			return t.t || (t.t = 3600 * e.h.val(t) + 60 * e.m.val(t) + e.s.val(t))
		}, isValid: function (t, n) {
			return e.t.val(t) === n
		}, extent: function () {
			return [0, 86399]
		}, start: function (e) {
			return e
		}, end: function (e) {
			return e
		}, next: function (t, n) {
			n = n > 86399 ? 0 : n;
			var r = e.date.next(e.Y.val(t), e.M.val(t), e.D.val(t) + (n <= e.t.val(t) ? 1 : 0), 0, 0, n);
			return !e.date.isUTC && r.getTime() < t.getTime() && (r = e.date.next(e.Y.val(r), e.M.val(r), e.D.val(r), e.h.val(r), e.m.val(r), n + 7200)), r
		}, prev: function (t, n) {
			return n = n > 86399 ? 86399 : n, e.date.next(e.Y.val(t), e.M.val(t), e.D.val(t) + (n >= e.t.val(t) ? -1 : 0), 0, 0, n)
		}
	}, e.weekOfMonth = e.wm = {
		name: "week of month",
		range: 604800,
		val: function (t) {
			return t.wm || (t.wm = (e.D.val(t) + (e.dw.val(e.M.start(t)) - 1) + (7 - e.dw.val(t))) / 7)
		},
		isValid: function (t, n) {
			return e.wm.val(t) === (n || e.wm.extent(t)[1])
		},
		extent: function (t) {
			return t.wmExtent || (t.wmExtent = [1, (e.D.extent(t)[1] + (e.dw.val(e.M.start(t)) - 1) + (7 - e.dw.val(e.M.end(t)))) / 7])
		},
		start: function (t) {
			return t.wmStart || (t.wmStart = e.date.next(e.Y.val(t), e.M.val(t), Math.max(e.D.val(t) - e.dw.val(t) + 1, 1)))
		},
		end: function (t) {
			return t.wmEnd || (t.wmEnd = e.date.prev(e.Y.val(t), e.M.val(t), Math.min(e.D.val(t) + (7 - e.dw.val(t)), e.D.extent(t)[1])))
		},
		next: function (t, n) {
			n = n > e.wm.extent(t)[1] ? 1 : n;
			var r = e.date.nextRollover(t, n, e.wm, e.M), a = e.wm.extent(r)[1];
			return n = n > a ? 1 : n || a, e.date.next(e.Y.val(r), e.M.val(r), Math.max(1, 7 * (n - 1) - (e.dw.val(r) - 2)))
		},
		prev: function (t, n) {
			var r = e.date.prevRollover(t, n, e.wm, e.M), a = e.wm.extent(r)[1];
			return n = n > a ? a : n || a, e.wm.end(e.date.next(e.Y.val(r), e.M.val(r), Math.max(1, 7 * (n - 1) - (e.dw.val(r) - 2))))
		}
	}, e.weekOfYear = e.wy = {
		name: "week of year (ISO)",
		range: 604800,
		val: function (t) {
			if (t.wy)return t.wy;
			var n = e.dw.next(e.wy.start(t), 5), r = e.dw.next(e.Y.prev(n, e.Y.val(n) - 1), 5);
			return t.wy = 1 + Math.ceil((n.getTime() - r.getTime()) / e.WEEK)
		},
		isValid: function (t, n) {
			return e.wy.val(t) === (n || e.wy.extent(t)[1])
		},
		extent: function (t) {
			if (t.wyExtent)return t.wyExtent;
			var n = e.dw.next(e.wy.start(t), 5), r = e.dw.val(e.Y.start(n)), a = e.dw.val(e.Y.end(n));
			return t.wyExtent = [1, 5 === r || 5 === a ? 53 : 52]
		},
		start: function (t) {
			return t.wyStart || (t.wyStart = e.date.next(e.Y.val(t), e.M.val(t), e.D.val(t) - (e.dw.val(t) > 1 ? e.dw.val(t) - 2 : 6)))
		},
		end: function (t) {
			return t.wyEnd || (t.wyEnd = e.date.prev(e.Y.val(t), e.M.val(t), e.D.val(t) + (e.dw.val(t) > 1 ? 8 - e.dw.val(t) : 0)))
		},
		next: function (t, n) {
			n = n > e.wy.extent(t)[1] ? 1 : n;
			var r = e.dw.next(e.wy.start(t), 5), a = e.date.nextRollover(r, n, e.wy, e.Y);
			1 !== e.wy.val(a) && (a = e.dw.next(a, 2));
			var i = e.wy.extent(a)[1], u = e.wy.start(a);
			return n = n > i ? 1 : n || i, e.date.next(e.Y.val(u), e.M.val(u), e.D.val(u) + 7 * (n - 1))
		},
		prev: function (t, n) {
			var r = e.dw.next(e.wy.start(t), 5), a = e.date.prevRollover(r, n, e.wy, e.Y);
			1 !== e.wy.val(a) && (a = e.dw.next(a, 2));
			var i = e.wy.extent(a)[1], u = e.wy.end(a);
			return n = n > i ? i : n || i, e.wy.end(e.date.next(e.Y.val(u), e.M.val(u), e.D.val(u) + 7 * (n - 1)))
		}
	}, e.year = e.Y = {
		name: "year", range: 31556900, val: function (t) {
			return t.Y || (t.Y = e.date.getYear.call(t))
		}, isValid: function (t, n) {
			return e.Y.val(t) === n
		}, extent: function () {
			return [1970, 2099]
		}, start: function (t) {
			return t.YStart || (t.YStart = e.date.next(e.Y.val(t)))
		}, end: function (t) {
			return t.YEnd || (t.YEnd = e.date.prev(e.Y.val(t)))
		}, next: function (t, n) {
			return n > e.Y.val(t) && n <= e.Y.extent()[1] ? e.date.next(n) : e.NEVER
		}, prev: function (t, n) {
			return n < e.Y.val(t) && n >= e.Y.extent()[0] ? e.date.prev(n) : e.NEVER
		}
	}, e.fullDate = e.fd = {
		name: "full date", range: 1, val: function (e) {
			return e.fd || (e.fd = e.getTime())
		}, isValid: function (t, n) {
			return e.fd.val(t) === n
		}, extent: function () {
			return [0, 3250368e7]
		}, start: function (e) {
			return e
		}, end: function (e) {
			return e
		}, next: function (t, n) {
			return e.fd.val(t) < n ? new Date(n) : e.NEVER
		}, prev: function (t, n) {
			return e.fd.val(t) > n ? new Date(n) : e.NEVER
		}
	}, e.modifier = {}, e.modifier.after = e.modifier.a = function (e, t) {
		var n = t[0];
		return {
			name: "after " + e.name,
			range: (e.extent(new Date)[1] - n) * e.range,
			val: e.val,
			isValid: function (e) {
				return this.val(e) >= n
			},
			extent: e.extent,
			start: e.start,
			end: e.end,
			next: function (t, r) {
				return r != n && (r = e.extent(t)[0]), e.next(t, r)
			},
			prev: function (t, r) {
				return r = r === n ? e.extent(t)[1] : n - 1, e.prev(t, r)
			}
		}
	}, e.modifier.before = e.modifier.b = function (e, t) {
		var n = t[t.length - 1];
		return {
			name: "before " + e.name,
			range: e.range * (n - 1),
			val: e.val,
			isValid: function (e) {
				return this.val(e) < n
			},
			extent: e.extent,
			start: e.start,
			end: e.end,
			next: function (t, r) {
				return r = r === n ? e.extent(t)[0] : n, e.next(t, r)
			},
			prev: function (t, r) {
				return r = r === n ? n - 1 : e.extent(t)[1], e.prev(t, r)
			}
		}
	}, e.compile = function (t) {
		function n(e) {
			return "next" === e ? function (e, t) {
				return e.getTime() > t.getTime()
			} : function (e, t) {
				return t.getTime() > e.getTime()
			}
		}

		var r, a = [], i = 0;
		for (var u in t) {
			var o = u.split("_"), f = o[0], d = o[1], v = t[u], l = d ? e.modifier[d](e[f], v) : e[f];
			a.push({constraint: l, vals: v}), i++
		}
		return a.sort(function (e, t) {
			var n = e.constraint.range, r = t.constraint.range;
			return n > r ? -1 : r > n ? 1 : 0
		}), r = a[i - 1].constraint, {
			start: function (t, n) {
				for (var u, o = n, f = e.array[t], d = 1e3; d-- && !u && o;) {
					u = !0;
					for (var v = 0; i > v; v++) {
						var l = a[v].constraint, c = l.val(o), s = l.extent(o), m = f(c, a[v].vals, s);
						if (!l.isValid(o, m)) {
							o = l[t](o, m), u = !1;
							break
						}
					}
				}
				return o !== e.NEVER && (o = "next" === t ? r.start(o) : r.end(o)), o
			}, end: function (t, r) {
				for (var u, o = e.array[t + "Invalid"], f = n(t), d = i - 1; d >= 0; d--) {
					var v, l = a[d].constraint, c = l.val(r), s = l.extent(r), m = o(c, a[d].vals, s);
					void 0 !== m && (v = l[t](r, m), !v || u && !f(u, v) || (u = v))
				}
				return u
			}, tick: function (t, n) {
				return new Date("next" === t ? r.end(n).getTime() + e.SEC : r.start(n).getTime() - e.SEC)
			}, tickStart: function (e) {
				return r.start(e)
			}
		}
	}, e.schedule = function (t) {
		function n(t, n, x, g, p) {
			var M, D, b, Y = s(t), k = n, E = 1e3, T = [], O = [], S = [], N = "next" === t, R = N ? 0 : 1, C = N ? 1 : 0;
			if (x = x ? new Date(x) : new Date, !x || !x.getTime())throw new Error("Invalid start date.");
			for (a(t, h, T, x), u(t, w, O, x); E-- && k && (M = m(T, Y)) && (!g || !Y(M, g));)if (y && (o(t, w, O, M), D = v(t, O, M)))i(t, h, T, D); else {
				if (p) {
					var V = l(O, Y);
					if (D = c(t, h, T, M, V), r = N ? [new Date(Math.max(x, M)), D ? new Date(g ? Math.min(D, g) : D) : void 0] : [D ? new Date(g ? Math.max(g, D.getTime() + e.SEC) : D.getTime() + e.SEC) : void 0, new Date(Math.min(x, M.getTime() + e.SEC))], b && r[R].getTime() === b[C].getTime() ? (b[C] = r[C], k++) : (b = r, S.push(b)), !D)break;
					i(t, h, T, D)
				} else S.push(N ? new Date(Math.max(x, M)) : d(h, T, M, g)), f(t, h, T, M);
				k--
			}
			return 0 === S.length ? e.NEVER : 1 === n ? S[0] : S
		}

		function a(e, t, n, r) {
			for (var a = 0, i = t.length; i > a; a++)n[a] = t[a].start(e, r)
		}

		function i(e, t, n, r) {
			for (var a = s(e), i = 0, u = t.length; u > i; i++)n[i] && !a(n[i], r) && (n[i] = t[i].start(e, r))
		}

		function u(t, n, r, a) {
			s(t);
			for (var i = 0, u = n.length; u > i; i++) {
				var o = n[i].start(t, a);
				r[i] = o ? [o, n[i].end(t, o)] : e.NEVER
			}
		}

		function o(t, n, r, a) {
			for (var i = s(t), u = 0, o = n.length; o > u; u++)if (r[u] && !i(r[u][0], a)) {
				var f = n[u].start(t, a);
				r[u] = f ? [f, n[u].end(t, f)] : e.NEVER
			}
		}

		function f(e, t, n, r) {
			for (var a = 0, i = t.length; i > a; a++)n[a] && n[a].getTime() === r.getTime() && (n[a] = t[a].start(e, t[a].tick(e, r)))
		}

		function d(e, t, n, r) {
			for (var a, i = 0, u = t.length; u > i; i++)if (t[i] && t[i].getTime() === n.getTime()) {
				var o = e[i].tickStart(n);
				if (r && r > o)return r;
				(!a || o > a) && (a = o)
			}
			return a
		}

		function v(e, t, n) {
			for (var r, a = s(e), i = 0, u = t.length; u > i; i++) {
				var o = t[i];
				!o || a(o[0], n) || o[1] && !a(o[1], n) || (!r || a(o[1], r)) && (r = o[1])
			}
			return r
		}

		function l(e, t) {
			for (var n, r = 0, a = e.length; a > r; r++)!e[r] || n && !t(n, e[r][0]) || (n = e[r][0]);
			return n
		}

		function c(e, t, n, r, a) {
			for (var i, u = s(e), o = 0, f = t.length; f > o; o++) {
				var d = n[o];
				if (d && d.getTime() === r.getTime()) {
					var v = t[o].end(e, d);
					if (a && (!v || u(v, a)))return a;
					(!i || u(v, i)) && (i = v)
				}
			}
			return i
		}

		function s(e) {
			return "next" === e ? function (e, t) {
				return !t || e.getTime() > t.getTime()
			} : function (e, t) {
				return !e || t.getTime() > e.getTime()
			}
		}

		function m(e, t) {
			for (var n = e[0], r = 1, a = e.length; a > r; r++)e[r] && t(n, e[r]) && (n = e[r]);
			return n
		}

		if (!t)throw new Error("Missing schedule definition.");
		if (!t.schedules)throw new Error("Definition must include at least one schedule.");
		for (var h = [], x = t.schedules.length, w = [], y = t.exceptions ? t.exceptions.length : 0, g = 0; x > g; g++)h.push(e.compile(t.schedules[g]));
		for (var p = 0; y > p; p++)w.push(e.compile(t.exceptions[p]));
		return {
			isValid: function (t) {
				return n("next", 1, t, t) !== e.NEVER
			}, next: function (e, t, r) {
				return n("next", e || 1, t, r)
			}, prev: function (e, t, r) {
				return n("prev", e || 1, t, r)
			}, nextRange: function (e, t, r) {
				return n("next", e || 1, t, r, !0)
			}, prevRange: function (e, t, r) {
				return n("prev", e || 1, t, r, !0)
			}
		}
	}, e.setTimeout = function (t, n) {
		function r() {
			var e = Date.now(), n = i.next(2, e), u = n[0].getTime() - e;
			1e3 > u && (u = n[1].getTime() - e), a = 2147483647 > u ? setTimeout(t, u) : setTimeout(r, 2147483647)
		}

		var a, i = e.schedule(n);
		return r(), {
			clear: function () {
				clearTimeout(a)
			}
		}
	}, e.setInterval = function (t, n) {
		function r() {
			i || (t(), a = e.setTimeout(r, n))
		}

		var a = e.setTimeout(r, n), i = !1;
		return {
			clear: function () {
				i = !0, a.clear()
			}
		}
	}, e.date = {}, e.date.timezone = function (t) {
		e.date.build = t ? function (e, t, n, r, a, i) {
			return new Date(e, t, n, r, a, i)
		} : function (e, t, n, r, a, i) {
			return new Date(Date.UTC(e, t, n, r, a, i))
		};
		var n = t ? "get" : "getUTC", r = Date.prototype;
		e.date.getYear = r[n + "FullYear"], e.date.getMonth = r[n + "Month"], e.date.getDate = r[n + "Date"], e.date.getDay = r[n + "Day"], e.date.getHour = r[n + "Hours"], e.date.getMin = r[n + "Minutes"], e.date.getSec = r[n + "Seconds"], e.date.isUTC = !t
	}, e.date.UTC = function () {
		e.date.timezone(!1)
	}, e.date.localTime = function () {
		e.date.timezone(!0)
	}, e.date.UTC(), e.SEC = 1e3, e.MIN = 60 * e.SEC, e.HOUR = 60 * e.MIN, e.DAY = 24 * e.HOUR, e.WEEK = 7 * e.DAY, e.DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], e.NEVER = 0, e.date.next = function (t, n, r, a, i, u) {
		return e.date.build(t, void 0 !== n ? n - 1 : 0, void 0 !== r ? r : 1, a || 0, i || 0, u || 0)
	}, e.date.nextRollover = function (t, n, r, a) {
		var i = r.val(t), u = r.extent(t)[1];
		return i >= (n || u) || n > u ? new Date(a.end(t).getTime() + e.SEC) : a.start(t)
	}, e.date.prev = function (t, n, r, a, i, u) {
		var o = arguments.length;
		return n = 2 > o ? 11 : n - 1, r = 3 > o ? e.D.extent(e.date.next(t, n + 1))[1] : r, a = 4 > o ? 23 : a, i = 5 > o ? 59 : i, u = 6 > o ? 59 : u, e.date.build(t, n, r, a, i, u)
	}, e.date.prevRollover = function (e, t, n, r) {
		var a = n.val(e);
		return t >= a || !t ? r.start(r.prev(e, r.val(e) - 1)) : r.start(e)
	}, e.parse = {}, e.parse.cron = function (e, t) {
		function n(e, t) {
			return isNaN(e) ? c[e] || null : +e + (t || 0)
		}

		function r(e) {
			var t, n = {};
			for (t in e)"dc" !== t && "d" !== t && (n[t] = e[t].slice(0));
			return n
		}

		function a(e, t, n, r, a) {
			var i = n;
			for (e[t] || (e[t] = []); r >= i;)e[t].indexOf(i) < 0 && e[t].push(i), i += a || 1
		}

		function i(e, t, n, i) {
			(t.d && !t.dc || t.dc && t.dc.indexOf(i) < 0) && (e.push(r(t)), t = e[e.length - 1]), a(t, "d", n, n), a(t, "dc", i, i)
		}

		function u(e, t, n) {
			var r = {}, i = {};
			1 === n ? (a(t, "D", 1, 3), a(t, "d", c.MON, c.FRI), a(r, "D", 2, 2), a(r, "d", c.TUE, c.FRI), a(i, "D", 3, 3), a(i, "d", c.TUE, c.FRI)) : (a(t, "D", n - 1, n + 1), a(t, "d", c.MON, c.FRI), a(r, "D", n - 1, n - 1), a(r, "d", c.MON, c.THU), a(i, "D", n + 1, n + 1), a(i, "d", c.TUE, c.FRI)), e.exceptions.push(r), e.exceptions.push(i)
		}

		function o(e, t, r, i, u, o) {
			var f = e.split("/"), d = +f[1], v = f[0];
			if ("*" !== v && "0" !== v) {
				var l = v.split("-");
				i = n(l[0], o), u = n(l[1], o) || u
			}
			a(t, r, i, u, d)
		}

		function f(e, t, r, f, d, v) {
			var l, c, s = t.schedules, m = s[s.length - 1];
			"L" === e && (e = f - 1), null !== (l = n(e, v)) ? a(m, r, l, l) : null !== (l = n(e.replace("W", ""), v)) ? u(t, m, l) : null !== (l = n(e.replace("L", ""), v)) ? i(s, m, l, f - 1) : 2 === (c = e.split("#")).length ? (l = n(c[0], v), i(s, m, l, n(c[1]))) : o(e, m, r, f, d, v)
		}

		function d(e) {
			return e.indexOf("#") > -1 || e.indexOf("L") > 0
		}

		function v(e, t) {
			return d(e) && !d(t) ? 1 : 0
		}

		function l(e) {
			"* * * * * *" === e && (e = "0/1 * * * * *");
			var t, n, r, a, i = {
				schedules: [{}],
				exceptions: []
			}, u = e.split(" ");
			for (t in s)if (n = s[t], r = u[n[0]], r && "*" !== r && "?" !== r) {
				a = r.split(",").sort(v);
				var o, d = a.length;
				for (o = 0; d > o; o++)f(a[o], i, t, n[1], n[2], n[3])
			}
			return i
		}

		var c = {
			JAN: 1,
			FEB: 2,
			MAR: 3,
			APR: 4,
			MAY: 5,
			JUN: 6,
			JUL: 7,
			AUG: 8,
			SEP: 9,
			OCT: 10,
			NOV: 11,
			DEC: 12,
			SUN: 1,
			MON: 2,
			TUE: 3,
			WED: 4,
			THU: 5,
			FRI: 6,
			SAT: 7
		}, s = {
			s: [0, 0, 59],
			m: [1, 0, 59],
			h: [2, 0, 23],
			D: [3, 1, 31],
			M: [4, 1, 12],
			Y: [6, 1970, 2099],
			d: [5, 1, 7, 1]
		}, m = e.toUpperCase();
		return l(t ? m : "0 " + m)
	}, e.parse.recur = function () {
		function t(e, t, l) {
			if (e = u ? e + "_" + u : e, n || (s.push({}), n = s[0]), n[e] || (n[e] = []), r = n[e], i) {
				for (a = [], d = t; l >= d; d += i)a.push(d);
				v = {n: e, x: i, c: r.length, m: l}
			}
			a = o ? [t] : f ? [l] : a;
			var c = a.length;
			for (d = 0; c > d; d += 1) {
				var m = a[d];
				r.indexOf(m) < 0 && r.push(m)
			}
			a = i = u = o = f = 0
		}

		var n, r, a, i, u, o, f, d, v, l = [], c = [], s = l;
		return {
			schedules: l, exceptions: c, on: function () {
				return a = arguments[0]instanceof Array ? arguments[0] : arguments, this
			}, every: function (e) {
				return i = e || 1, this
			}, after: function (e) {
				return u = "a", a = [e], this
			}, before: function (e) {
				return u = "b", a = [e], this
			}, first: function () {
				return o = 1, this
			}, last: function () {
				return f = 1, this
			}, time: function () {
				for (var e = 0, n = a.length; n > e; e++) {
					var r = a[e].split(":");
					r.length < 3 && r.push(0), a[e] = 3600 * +r[0] + 60 * +r[1] + +r[2]
				}
				return t("t"), this
			}, second: function () {
				return t("s", 0, 59), this
			}, minute: function () {
				return t("m", 0, 59), this
			}, hour: function () {
				return t("h", 0, 23), this
			}, dayOfMonth: function () {
				return t("D", 1, f ? 0 : 31), this
			}, dayOfWeek: function () {
				return t("d", 1, 7), this
			}, onWeekend: function () {
				return a = [1, 7], this.dayOfWeek()
			}, onWeekday: function () {
				return a = [2, 3, 4, 5, 6], this.dayOfWeek()
			}, dayOfWeekCount: function () {
				return t("dc", 1, f ? 0 : 5), this
			}, dayOfYear: function () {
				return t("dy", 1, f ? 0 : 366), this
			}, weekOfMonth: function () {
				return t("wm", 1, f ? 0 : 5), this
			}, weekOfYear: function () {
				return t("wy", 1, f ? 0 : 53), this
			}, month: function () {
				return t("M", 1, 12), this
			}, year: function () {
				return t("Y", 1970, 2450), this
			}, fullDate: function () {
				for (var e = 0, n = a.length; n > e; e++)a[e] = a[e].getTime();
				return t("fd"), this
			}, customModifier: function (t) {
				var n = e.modifier[t];
				if (!n)throw new Error("Custom modifier " + t + " not recognized!");
				return u = t, a = arguments[1]instanceof Array ? arguments[1] : [arguments[1]], this
			}, customPeriod: function (n) {
				var r = e[n];
				if (!r)throw new Error("Custom time period " + n + " not recognized!");
				return t(n, r.extent(new Date)[0], r.extent(new Date)[1]), this
			}, startingOn: function (e) {
				return this.between(e, v.m)
			}, between: function (e, r) {
				return n[v.n] = n[v.n].splice(0, v.c), i = v.x, t(v.n, e, r), this
			}, and: function () {
				return n = s[s.push({}) - 1], this
			}, except: function () {
				return s = c, n = null, this
			}
		}
	}, e.parse.text = function (t) {
		function n(e, t, n, r) {
			return {startPos: e, endPos: t, text: n, type: r}
		}

		function r(e) {
			var t, r, a, i, u, o, f = e instanceof Array ? e : [e], d = /\s+/;
			for (f.push(d), u = w; !t || t.type === d;) {
				o = -1, r = y.substring(u), t = n(u, u, y.split(d)[0]);
				var v, l = f.length;
				for (v = 0; l > v; v++)i = f[v], a = i.exec(r), a && 0 === a.index && a[0].length > o && (o = a[0].length, t = n(u, u + o, r.substring(0, o), i));
				t.type === d && (u = t.endPos)
			}
			return t
		}

		function a(e) {
			var t = r(e);
			return w = t.endPos, t
		}

		function i(e) {
			for (var t = +s(e), n = l(g.through) ? +s(e) : t, r = [], a = t; n >= a; a++)r.push(a);
			return r
		}

		function u(e) {
			for (var t = i(e); l(g.and);)t = t.concat(i(e));
			return t
		}

		function o(e) {
			var t, n, r, a;
			l(g.weekend) ? e.on(p.sun, p.sat).dayOfWeek() : l(g.weekday) ? e.on(p.mon, p.tue, p.wed, p.thu, p.fri).dayOfWeek() : (t = s(g.rank), e.every(t), n = v(e), l(g.start) ? (t = s(g.rank), e.startingOn(t), c(n.type)) : l(g.between) && (r = s(g.rank), l(g.and) && (a = s(g.rank), e.between(r, a))))
		}

		function f(e) {
			l(g.first) ? e.first() : l(g.last) ? e.last() : e.on(u(g.rank)), v(e)
		}

		function d(e) {
			w = 0, y = e, h = -1;
			for (var t = x(); w < y.length && 0 > h;) {
				var n = c([g.every, g.after, g.before, g.onthe, g.on, g.of, g["in"], g.at, g.and, g.except, g.also]);
				switch (n.type) {
					case g.every:
						o(t);
						break;
					case g.after:
						void 0 !== r(g.time).type ? (t.after(s(g.time)), t.time()) : (t.after(s(g.rank)), v(t));
						break;
					case g.before:
						void 0 !== r(g.time).type ? (t.before(s(g.time)), t.time()) : (t.before(s(g.rank)), v(t));
						break;
					case g.onthe:
						f(t);
						break;
					case g.on:
						t.on(u(g.dayName)).dayOfWeek();
						break;
					case g.of:
						t.on(u(g.monthName)).month();
						break;
					case g["in"]:
						t.on(u(g.yearIndex)).year();
						break;
					case g.at:
						for (t.on(s(g.time)).time(); l(g.and);)t.on(s(g.time)).time();
						break;
					case g.and:
						break;
					case g.also:
						t.and();
						break;
					case g.except:
						t.except();
						break;
					default:
						h = w
				}
			}
			return {schedules: t.schedules, exceptions: t.exceptions, error: h}
		}

		function v(e) {
			var t = c([g.second, g.minute, g.hour, g.dayOfYear, g.dayOfWeek, g.dayInstance, g.day, g.month, g.year, g.weekOfMonth, g.weekOfYear]);
			switch (t.type) {
				case g.second:
					e.second();
					break;
				case g.minute:
					e.minute();
					break;
				case g.hour:
					e.hour();
					break;
				case g.dayOfYear:
					e.dayOfYear();
					break;
				case g.dayOfWeek:
					e.dayOfWeek();
					break;
				case g.dayInstance:
					e.dayOfWeekCount();
					break;
				case g.day:
					e.dayOfMonth();
					break;
				case g.weekOfMonth:
					e.weekOfMonth();
					break;
				case g.weekOfYear:
					e.weekOfYear();
					break;
				case g.month:
					e.month();
					break;
				case g.year:
					e.year();
					break;
				default:
					h = w
			}
			return t
		}

		function l(e) {
			var t = r(e).type === e;
			return t && a(e), t
		}

		function c(e) {
			var t = a(e);
			return t.type ? t.text = m(t.text, e) : h = w, t
		}

		function s(e) {
			return c(e).text
		}

		function m(e, t) {
			var n = e;
			switch (t) {
				case g.time:
					var r = e.split(/(:|am|pm)/), a = "pm" === r[3] && r[0] < 12 ? parseInt(r[0], 10) + 12 : r[0], i = r[2].trim();
					n = (1 === a.length ? "0" : "") + a + ":" + i;
					break;
				case g.rank:
					n = parseInt(/^\d+/.exec(e)[0], 10);
					break;
				case g.monthName:
				case g.dayName:
					n = p[e.substring(0, 3)]
			}
			return n
		}

		var h, x = e.parse.recur, w = 0, y = "", g = {
			eof: /^$/,
			rank: /^((\d\d\d\d)|([2-5]?1(st)?|[2-5]?2(nd)?|[2-5]?3(rd)?|(0|[1-5]?[4-9]|[1-5]0|1[1-3])(th)?))\b/,
			time: /^((([0]?[1-9]|1[0-2]):[0-5]\d(\s)?(am|pm))|(([0]?\d|1\d|2[0-3]):[0-5]\d))\b/,
			dayName: /^((sun|mon|tue(s)?|wed(nes)?|thu(r(s)?)?|fri|sat(ur)?)(day)?)\b/,
			monthName: /^(jan(uary)?|feb(ruary)?|ma((r(ch)?)?|y)|apr(il)?|ju(ly|ne)|aug(ust)?|oct(ober)?|(sept|nov|dec)(ember)?)\b/,
			yearIndex: /^(\d\d\d\d)\b/,
			every: /^every\b/,
			after: /^after\b/,
			before: /^before\b/,
			second: /^(s|sec(ond)?(s)?)\b/,
			minute: /^(m|min(ute)?(s)?)\b/,
			hour: /^(h|hour(s)?)\b/,
			day: /^(day(s)?( of the month)?)\b/,
			dayInstance: /^day instance\b/,
			dayOfWeek: /^day(s)? of the week\b/,
			dayOfYear: /^day(s)? of the year\b/,
			weekOfYear: /^week(s)?( of the year)?\b/,
			weekOfMonth: /^week(s)? of the month\b/,
			weekday: /^weekday\b/,
			weekend: /^weekend\b/,
			month: /^month(s)?\b/,
			year: /^year(s)?\b/,
			between: /^between (the)?\b/,
			start: /^(start(ing)? (at|on( the)?)?)\b/,
			at: /^(at|@)\b/,
			and: /^(,|and\b)/,
			except: /^(except\b)/,
			also: /(also)\b/,
			first: /^(first)\b/,
			last: /^last\b/,
			"in": /^in\b/,
			of: /^of\b/,
			onthe: /^on the\b/,
			on: /^on\b/,
			through: /(-|^(to|through)\b)/
		}, p = {
			jan: 1,
			feb: 2,
			mar: 3,
			apr: 4,
			may: 5,
			jun: 6,
			jul: 7,
			aug: 8,
			sep: 9,
			oct: 10,
			nov: 11,
			dec: 12,
			sun: 1,
			mon: 2,
			tue: 3,
			wed: 4,
			thu: 5,
			fri: 6,
			sat: 7,
			"1st": 1,
			fir: 1,
			"2nd": 2,
			sec: 2,
			"3rd": 3,
			thi: 3,
			"4th": 4,
			"for": 4
		};
		return d(t.toLowerCase())
	}, e
}();
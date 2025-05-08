(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports =  factory() :
  typeof define === 'function' && define.amd ? define([], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.NanoScan = factory()));
})(this, function() {
"use strict";

//#region node_modules/zxing-wasm/dist/es/share.js
const m = [
	["Aztec", "M"],
	["Codabar", "L"],
	["Code39", "L"],
	["Code93", "L"],
	["Code128", "L"],
	["DataBar", "L"],
	["DataBarExpanded", "L"],
	["DataMatrix", "M"],
	["EAN-8", "L"],
	["EAN-13", "L"],
	["ITF", "L"],
	["MaxiCode", "M"],
	["PDF417", "M"],
	["QRCode", "M"],
	["UPC-A", "L"],
	["UPC-E", "L"],
	["MicroQRCode", "M"],
	["rMQRCode", "M"],
	["DXFilmEdge", "L"],
	["DataBarLimited", "L"]
], O = m.map(([e]) => e), L = O.filter((e, t) => m[t][1] === "L"), b = O.filter((e, t) => m[t][1] === "M");
function l(e) {
	switch (e) {
		case "Linear-Codes": return L.reduce((t, r) => t | l(r), 0);
		case "Matrix-Codes": return b.reduce((t, r) => t | l(r), 0);
		case "Any": return (1 << m.length) - 1;
		case "None": return 0;
		default: return 1 << O.indexOf(e);
	}
}
function w(e) {
	if (e === 0) return "None";
	const t = 31 - Math.clz32(e);
	return O[t];
}
function E(e) {
	return e.reduce((t, r) => t | l(r), 0);
}
const M = [
	"LocalAverage",
	"GlobalHistogram",
	"FixedThreshold",
	"BoolCast"
];
function x(e) {
	return M.indexOf(e);
}
const h = [
	"Unknown",
	"ASCII",
	"ISO8859_1",
	"ISO8859_2",
	"ISO8859_3",
	"ISO8859_4",
	"ISO8859_5",
	"ISO8859_6",
	"ISO8859_7",
	"ISO8859_8",
	"ISO8859_9",
	"ISO8859_10",
	"ISO8859_11",
	"ISO8859_13",
	"ISO8859_14",
	"ISO8859_15",
	"ISO8859_16",
	"Cp437",
	"Cp1250",
	"Cp1251",
	"Cp1252",
	"Cp1256",
	"Shift_JIS",
	"Big5",
	"GB2312",
	"GB18030",
	"EUC_JP",
	"EUC_KR",
	"UTF16BE",
	"UTF16BE",
	"UTF8",
	"UTF16LE",
	"UTF32BE",
	"UTF32LE",
	"BINARY"
];
function B(e) {
	return e === "UnicodeBig" ? h.indexOf("UTF16BE") : h.indexOf(e);
}
const F = [
	"Text",
	"Binary",
	"Mixed",
	"GS1",
	"ISO15434",
	"UnknownECI"
];
function T(e) {
	return F[e];
}
const A = [
	"Ignore",
	"Read",
	"Require"
];
function U(e) {
	return A.indexOf(e);
}
const R = [
	"Plain",
	"ECI",
	"HRI",
	"Hex",
	"Escaped"
];
function p(e) {
	return R.indexOf(e);
}
const u = {
	formats: [],
	tryHarder: !0,
	tryRotate: !0,
	tryInvert: !0,
	tryDownscale: !0,
	tryDenoise: !1,
	binarizer: "LocalAverage",
	isPure: !1,
	downscaleFactor: 3,
	downscaleThreshold: 500,
	minLineCount: 2,
	maxNumberOfSymbols: 255,
	tryCode39ExtendedMode: !0,
	returnErrors: !1,
	eanAddOnSymbol: "Ignore",
	textMode: "HRI",
	characterSet: "Unknown"
};
function I(e) {
	return {
		...e,
		formats: E(e.formats),
		binarizer: x(e.binarizer),
		eanAddOnSymbol: U(e.eanAddOnSymbol),
		textMode: p(e.textMode),
		characterSet: B(e.characterSet)
	};
}
const y = {
	format: "QRCode",
	readerInit: !1,
	forceSquareDataMatrix: !1,
	ecLevel: "",
	scale: 0,
	sizeHint: 0,
	rotate: 0,
	withHRT: !1,
	withQuietZones: !0
};
function z(e) {
	return {
		...e,
		format: w(e.format),
		contentType: T(e.contentType),
		eccLevel: e.ecLevel
	};
}
const H = "2.1.2", N = "a1516b34167cff504bf3c83698ea841e13a8f7f1", W = { locateFile: (e, t) => {
	const r = e.match(/_(.+?)\.wasm$/);
	return r ? `https://fastly.jsdelivr.net/npm/zxing-wasm@2.1.2/dist/${r[1]}/${e}` : t + e;
} }, f = /* @__PURE__ */ new WeakMap();
function D(e, t) {
	return Object.is(e, t) || Object.keys(e).length === Object.keys(t).length && Object.keys(e).every((r) => Object.prototype.hasOwnProperty.call(t, r) && e[r] === t[r]);
}
function S(e, { overrides: t, equalityFn: r = D, fireImmediately: d = !1 } = {}) {
	var a;
	const [o, s] = (a = f.get(e)) != null ? a : [W], n = t != null ? t : o;
	let i;
	if (d) {
		if (s && (i = r(o, n))) return s;
		const c = e({ ...n });
		return f.set(e, [n, c]), c;
	}
	(i != null ? i : r(o, n)) || f.set(e, [n]);
}
async function Z(e, t, r = u) {
	const d = {
		...u,
		...r
	}, o = await S(e, { fireImmediately: !0 });
	let s, n;
	if ("width" in t && "height" in t && "data" in t) {
		const { data: a, data: { byteLength: c }, width: g, height: C } = t;
		n = o._malloc(c), o.HEAPU8.set(a, n), s = o.readBarcodesFromPixmap(n, g, C, I(d));
	} else {
		let a, c;
		if ("buffer" in t) [a, c] = [t.byteLength, t];
		else if ("byteLength" in t) [a, c] = [t.byteLength, new Uint8Array(t)];
		else if ("size" in t) [a, c] = [t.size, new Uint8Array(await t.arrayBuffer())];
		else throw new TypeError("Invalid input type");
		n = o._malloc(a), o.HEAPU8.set(c, n), s = o.readBarcodesFromImage(n, a, I(d));
	}
	o._free(n);
	const i = [];
	for (let a = 0; a < s.size(); ++a) i.push(z(s.get(a)));
	return i;
}
const j = {
	...u,
	formats: [...u.formats]
}, G = { ...y };

//#endregion
//#region node_modules/zxing-wasm/dist/es/reader/index.js
var Mr = async function(F$1 = {}) {
	var V, c = F$1, xr, yr, $e = new Promise((e, r) => {
		xr = e, yr = r;
	}), be = typeof window == "object", we = typeof Bun < "u", mr = typeof WorkerGlobalScope < "u";
	typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type;
	var Ir = "./this.program", j$1 = "";
	function Ce(e) {
		return c.locateFile ? c.locateFile(e, j$1) : j$1 + e;
	}
	var Vr, $r;
	(be || mr || we) && (mr ? j$1 = self.location.href : typeof document < "u" && document.currentScript && (j$1 = document.currentScript.src), j$1.startsWith("blob:") ? j$1 = "" : j$1 = j$1.slice(0, j$1.replace(/[?#].*/, "").lastIndexOf("/") + 1), mr && ($r = (e) => {
		var r = new XMLHttpRequest();
		return r.open("GET", e, !1), r.responseType = "arraybuffer", r.send(null), new Uint8Array(r.response);
	}), Vr = async (e) => {
		var r = await fetch(e, { credentials: "same-origin" });
		if (r.ok) return r.arrayBuffer();
		throw new Error(r.status + " : " + r.url);
	});
	var Ur = console.log.bind(console), z$1 = console.error.bind(console), Y, ir, Hr = !1, U$1, E$1, K, ar, G$1, $, Br, Nr;
	function Zr() {
		var e = ir.buffer;
		U$1 = new Int8Array(e), K = new Int16Array(e), c.HEAPU8 = E$1 = new Uint8Array(e), ar = new Uint16Array(e), G$1 = new Int32Array(e), $ = new Uint32Array(e), Br = new Float32Array(e), Nr = new Float64Array(e);
	}
	function Pe() {
		if (c.preRun) for (typeof c.preRun == "function" && (c.preRun = [c.preRun]); c.preRun.length;) xe(c.preRun.shift());
		zr(Lr);
	}
	function Te() {
		b$1.ya();
	}
	function Ae() {
		if (c.postRun) for (typeof c.postRun == "function" && (c.postRun = [c.postRun]); c.postRun.length;) Me(c.postRun.shift());
		zr(Gr);
	}
	var H$1 = 0, J = null;
	function Re(e) {
		var r;
		H$1++, (r = c.monitorRunDependencies) === null || r === void 0 || r.call(c, H$1);
	}
	function Fe(e) {
		var r;
		if (H$1--, (r = c.monitorRunDependencies) === null || r === void 0 || r.call(c, H$1), H$1 == 0 && J) {
			var t = J;
			J = null, t();
		}
	}
	function br(e) {
		var r;
		(r = c.onAbort) === null || r === void 0 || r.call(c, e), e = "Aborted(" + e + ")", z$1(e), Hr = !0, e += ". Build with -sASSERTIONS for more info.";
		var t = new WebAssembly.RuntimeError(e);
		throw yr(t), t;
	}
	var L$1;
	function Ee() {
		return Ce("zxing_reader.wasm");
	}
	function ke(e) {
		if (e == L$1 && Y) return new Uint8Array(Y);
		if ($r) return $r(e);
		throw "both async and sync fetching of the wasm failed";
	}
	async function Se(e) {
		if (!Y) try {
			var r = await Vr(e);
			return new Uint8Array(r);
		} catch {}
		return ke(e);
	}
	async function Oe(e, r) {
		try {
			var t = await Se(e), n = await WebAssembly.instantiate(t, r);
			return n;
		} catch (i) {
			z$1(`failed to asynchronously prepare wasm: ${i}`), br(i);
		}
	}
	async function je(e, r, t) {
		if (!e && typeof WebAssembly.instantiateStreaming == "function") try {
			var n = fetch(r, { credentials: "same-origin" }), i = await WebAssembly.instantiateStreaming(n, t);
			return i;
		} catch (a) {
			z$1(`wasm streaming compile failed: ${a}`), z$1("falling back to ArrayBuffer instantiation");
		}
		return Oe(r, t);
	}
	function De() {
		return { a: mn };
	}
	async function We() {
		function e(a, s) {
			return b$1 = a.exports, ir = b$1.xa, Zr(), ne = b$1.Ba, Fe(), b$1;
		}
		Re();
		function r(a) {
			return e(a.instance);
		}
		var t = De();
		if (c.instantiateWasm) return new Promise((a, s) => {
			c.instantiateWasm(t, (o, u$1) => {
				a(e(o));
			});
		});
		L$1 ??= Ee();
		try {
			var n = await je(Y, L$1, t), i = r(n);
			return i;
		} catch (a) {
			return yr(a), Promise.reject(a);
		}
	}
	var zr = (e) => {
		for (; e.length > 0;) e.shift()(c);
	}, Gr = [], Me = (e) => Gr.push(e), Lr = [], xe = (e) => Lr.push(e), p$1 = (e) => Cn(e), h$1 = () => Pn(), or = [], sr = 0, Ie = (e) => {
		var r = new wr(e);
		return r.get_caught() || (r.set_caught(!0), sr--), r.set_rethrown(!1), or.push(r), An(e), bn(e);
	}, D$1 = 0, Ve = () => {
		d(0, 0);
		var e = or.pop();
		Tn(e.excPtr), D$1 = 0;
	};
	class wr {
		constructor(r) {
			this.excPtr = r, this.ptr = r - 24;
		}
		set_type(r) {
			$[this.ptr + 4 >> 2] = r;
		}
		get_type() {
			return $[this.ptr + 4 >> 2];
		}
		set_destructor(r) {
			$[this.ptr + 8 >> 2] = r;
		}
		get_destructor() {
			return $[this.ptr + 8 >> 2];
		}
		set_caught(r) {
			r = r ? 1 : 0, U$1[this.ptr + 12] = r;
		}
		get_caught() {
			return U$1[this.ptr + 12] != 0;
		}
		set_rethrown(r) {
			r = r ? 1 : 0, U$1[this.ptr + 13] = r;
		}
		get_rethrown() {
			return U$1[this.ptr + 13] != 0;
		}
		init(r, t) {
			this.set_adjusted_ptr(0), this.set_type(r), this.set_destructor(t);
		}
		set_adjusted_ptr(r) {
			$[this.ptr + 16 >> 2] = r;
		}
		get_adjusted_ptr() {
			return $[this.ptr + 16 >> 2];
		}
	}
	var ur = (e) => wn(e), Cr = (e) => {
		var r = D$1;
		if (!r) return ur(0), 0;
		var t = new wr(r);
		t.set_adjusted_ptr(r);
		var n = t.get_type();
		if (!n) return ur(0), r;
		for (var i of e) {
			if (i === 0 || i === n) break;
			var a = t.ptr + 16;
			if (Rn(i, n, a)) return ur(i), r;
		}
		return ur(n), r;
	}, Ue = () => Cr([]), He = (e) => Cr([e]), Be = (e, r) => Cr([e, r]), Ne = () => {
		var e = or.pop();
		e || br("no exception to throw");
		var r = e.excPtr;
		throw e.get_rethrown() || (or.push(e), e.set_rethrown(!0), e.set_caught(!1), sr++), D$1 = r, D$1;
	}, Ze = (e, r, t) => {
		var n = new wr(e);
		throw n.init(r, t), D$1 = e, sr++, D$1;
	}, ze = () => sr, Ge = (e) => {
		throw D$1 || (D$1 = e), D$1;
	}, Le = () => br(""), fr = {}, Pr = (e) => {
		for (; e.length;) {
			var r = e.pop(), t = e.pop();
			t(r);
		}
	};
	function Q(e) {
		return this.fromWireType($[e >> 2]);
	}
	var X = {}, B$1 = {}, lr = {}, Xe = c.InternalError = class extends Error {
		constructor(r) {
			super(r), this.name = "InternalError";
		}
	}, cr = (e) => {
		throw new Xe(e);
	}, N$1 = (e, r, t) => {
		e.forEach((o) => lr[o] = r);
		function n(o) {
			var u$1 = t(o);
			u$1.length !== e.length && cr("Mismatched type converter count");
			for (var f$1 = 0; f$1 < e.length; ++f$1) O$1(e[f$1], u$1[f$1]);
		}
		var i = new Array(r.length), a = [], s = 0;
		r.forEach((o, u$1) => {
			B$1.hasOwnProperty(o) ? i[u$1] = B$1[o] : (a.push(o), X.hasOwnProperty(o) || (X[o] = []), X[o].push(() => {
				i[u$1] = B$1[o], ++s, s === a.length && n(i);
			}));
		}), a.length === 0 && n(i);
	}, qe = (e) => {
		var r = fr[e];
		delete fr[e];
		var t = r.rawConstructor, n = r.rawDestructor, i = r.fields, a = i.map((s) => s.getterReturnType).concat(i.map((s) => s.setterArgumentType));
		N$1([e], a, (s) => {
			var o = {};
			return i.forEach((u$1, f$1) => {
				var l$1 = u$1.fieldName, v = s[f$1], g = s[f$1].optional, y$1 = u$1.getter, w$1 = u$1.getterContext, P = s[f$1 + i.length], C = u$1.setter, T$1 = u$1.setterContext;
				o[l$1] = {
					read: (I$1) => v.fromWireType(y$1(w$1, I$1)),
					write: (I$1, R$1) => {
						var k = [];
						C(T$1, I$1, P.toWireType(k, R$1)), Pr(k);
					},
					optional: g
				};
			}), [{
				name: r.name,
				fromWireType: (u$1) => {
					var f$1 = {};
					for (var l$1 in o) f$1[l$1] = o[l$1].read(u$1);
					return n(u$1), f$1;
				},
				toWireType: (u$1, f$1) => {
					for (var l$1 in o) if (!(l$1 in f$1) && !o[l$1].optional) throw new TypeError(`Missing field: "${l$1}"`);
					var v = t();
					for (l$1 in o) o[l$1].write(v, f$1[l$1]);
					return u$1 !== null && u$1.push(n, v), v;
				},
				argPackAdvance: W$1,
				readValueFromPointer: Q,
				destructorFunction: n
			}];
		});
	}, Ye = (e, r, t, n, i) => {}, Ke = () => {
		for (var e = new Array(256), r = 0; r < 256; ++r) e[r] = String.fromCharCode(r);
		Xr = e;
	}, Xr, A$1 = (e) => {
		for (var r = "", t = e; E$1[t];) r += Xr[E$1[t++]];
		return r;
	}, rr = c.BindingError = class extends Error {
		constructor(r) {
			super(r), this.name = "BindingError";
		}
	}, m$1 = (e) => {
		throw new rr(e);
	};
	function Je(e, r) {
		let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
		var n = r.name;
		if (e || m$1(`type "${n}" must have a positive integer typeid pointer`), B$1.hasOwnProperty(e)) {
			if (t.ignoreDuplicateRegistrations) return;
			m$1(`Cannot register type '${n}' twice`);
		}
		if (B$1[e] = r, delete lr[e], X.hasOwnProperty(e)) {
			var i = X[e];
			delete X[e], i.forEach((a) => a());
		}
	}
	function O$1(e, r) {
		let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
		return Je(e, r, t);
	}
	var W$1 = 8, Qe = (e, r, t, n) => {
		r = A$1(r), O$1(e, {
			name: r,
			fromWireType: function(i) {
				return !!i;
			},
			toWireType: function(i, a) {
				return a ? t : n;
			},
			argPackAdvance: W$1,
			readValueFromPointer: function(i) {
				return this.fromWireType(E$1[i]);
			},
			destructorFunction: null
		});
	}, rt = (e) => ({
		count: e.count,
		deleteScheduled: e.deleteScheduled,
		preservePointerOnDelete: e.preservePointerOnDelete,
		ptr: e.ptr,
		ptrType: e.ptrType,
		smartPtr: e.smartPtr,
		smartPtrType: e.smartPtrType
	}), Tr = (e) => {
		function r(t) {
			return t.$$.ptrType.registeredClass.name;
		}
		m$1(r(e) + " instance already deleted");
	}, Ar = !1, qr = (e) => {}, et = (e) => {
		e.smartPtr ? e.smartPtrType.rawDestructor(e.smartPtr) : e.ptrType.registeredClass.rawDestructor(e.ptr);
	}, Yr = (e) => {
		e.count.value -= 1;
		var r = e.count.value === 0;
		r && et(e);
	}, er = (e) => typeof FinalizationRegistry > "u" ? (er = (r) => r, e) : (Ar = new FinalizationRegistry((r) => {
		Yr(r.$$);
	}), er = (r) => {
		var t = r.$$, n = !!t.smartPtr;
		if (n) {
			var i = { $$: t };
			Ar.register(r, i, r);
		}
		return r;
	}, qr = (r) => Ar.unregister(r), er(e)), tt = () => {
		let e = vr.prototype;
		Object.assign(e, {
			isAliasOf(t) {
				if (!(this instanceof vr) || !(t instanceof vr)) return !1;
				var n = this.$$.ptrType.registeredClass, i = this.$$.ptr;
				t.$$ = t.$$;
				for (var a = t.$$.ptrType.registeredClass, s = t.$$.ptr; n.baseClass;) i = n.upcast(i), n = n.baseClass;
				for (; a.baseClass;) s = a.upcast(s), a = a.baseClass;
				return n === a && i === s;
			},
			clone() {
				if (this.$$.ptr || Tr(this), this.$$.preservePointerOnDelete) return this.$$.count.value += 1, this;
				var t = er(Object.create(Object.getPrototypeOf(this), { $$: { value: rt(this.$$) } }));
				return t.$$.count.value += 1, t.$$.deleteScheduled = !1, t;
			},
			delete() {
				this.$$.ptr || Tr(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && m$1("Object already scheduled for deletion"), qr(this), Yr(this.$$), this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0, this.$$.ptr = void 0);
			},
			isDeleted() {
				return !this.$$.ptr;
			},
			deleteLater() {
				return this.$$.ptr || Tr(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && m$1("Object already scheduled for deletion"), this.$$.deleteScheduled = !0, this;
			}
		});
		const r = Symbol.dispose;
		r && (e[r] = e.delete);
	};
	function vr() {}
	var Rr = (e, r) => Object.defineProperty(r, "name", { value: e }), Kr = {}, Jr = (e, r, t) => {
		if (e[r].overloadTable === void 0) {
			var n = e[r];
			e[r] = function() {
				for (var i = arguments.length, a = new Array(i), s = 0; s < i; s++) a[s] = arguments[s];
				return e[r].overloadTable.hasOwnProperty(a.length) || m$1(`Function '${t}' called with an invalid number of arguments (${a.length}) - expects one of (${e[r].overloadTable})!`), e[r].overloadTable[a.length].apply(this, a);
			}, e[r].overloadTable = [], e[r].overloadTable[n.argCount] = n;
		}
	}, Qr = (e, r, t) => {
		c.hasOwnProperty(e) ? ((t === void 0 || c[e].overloadTable !== void 0 && c[e].overloadTable[t] !== void 0) && m$1(`Cannot register public name '${e}' twice`), Jr(c, e, e), c[e].overloadTable.hasOwnProperty(t) && m$1(`Cannot register multiple overloads of a function with the same number of arguments (${t})!`), c[e].overloadTable[t] = r) : (c[e] = r, c[e].argCount = t);
	}, nt = 48, it = 57, at = (e) => {
		e = e.replace(/[^a-zA-Z0-9_]/g, "$");
		var r = e.charCodeAt(0);
		return r >= nt && r <= it ? `_${e}` : e;
	};
	function ot(e, r, t, n, i, a, s, o) {
		this.name = e, this.constructor = r, this.instancePrototype = t, this.rawDestructor = n, this.baseClass = i, this.getActualType = a, this.upcast = s, this.downcast = o, this.pureVirtualFunctions = [];
	}
	var Fr = (e, r, t) => {
		for (; r !== t;) r.upcast || m$1(`Expected null or instance of ${t.name}, got an instance of ${r.name}`), e = r.upcast(e), r = r.baseClass;
		return e;
	};
	function st(e, r) {
		if (r === null) return this.isReference && m$1(`null is not a valid ${this.name}`), 0;
		r.$$ || m$1(`Cannot pass "${embindRepr(r)}" as a ${this.name}`), r.$$.ptr || m$1(`Cannot pass deleted object as a pointer of type ${this.name}`);
		var t = r.$$.ptrType.registeredClass, n = Fr(r.$$.ptr, t, this.registeredClass);
		return n;
	}
	function ut(e, r) {
		var t;
		if (r === null) return this.isReference && m$1(`null is not a valid ${this.name}`), this.isSmartPointer ? (t = this.rawConstructor(), e !== null && e.push(this.rawDestructor, t), t) : 0;
		(!r || !r.$$) && m$1(`Cannot pass "${embindRepr(r)}" as a ${this.name}`), r.$$.ptr || m$1(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.isConst && r.$$.ptrType.isConst && m$1(`Cannot convert argument of type ${r.$$.smartPtrType ? r.$$.smartPtrType.name : r.$$.ptrType.name} to parameter type ${this.name}`);
		var n = r.$$.ptrType.registeredClass;
		if (t = Fr(r.$$.ptr, n, this.registeredClass), this.isSmartPointer) switch (r.$$.smartPtr === void 0 && m$1("Passing raw pointer to smart pointer is illegal"), this.sharingPolicy) {
			case 0:
				r.$$.smartPtrType === this ? t = r.$$.smartPtr : m$1(`Cannot convert argument of type ${r.$$.smartPtrType ? r.$$.smartPtrType.name : r.$$.ptrType.name} to parameter type ${this.name}`);
				break;
			case 1:
				t = r.$$.smartPtr;
				break;
			case 2:
				if (r.$$.smartPtrType === this) t = r.$$.smartPtr;
				else {
					var i = r.clone();
					t = this.rawShare(t, x$1.toHandle(() => i.delete())), e !== null && e.push(this.rawDestructor, t);
				}
				break;
			default: m$1("Unsupporting sharing policy");
		}
		return t;
	}
	function ft(e, r) {
		if (r === null) return this.isReference && m$1(`null is not a valid ${this.name}`), 0;
		r.$$ || m$1(`Cannot pass "${embindRepr(r)}" as a ${this.name}`), r.$$.ptr || m$1(`Cannot pass deleted object as a pointer of type ${this.name}`), r.$$.ptrType.isConst && m$1(`Cannot convert argument of type ${r.$$.ptrType.name} to parameter type ${this.name}`);
		var t = r.$$.ptrType.registeredClass, n = Fr(r.$$.ptr, t, this.registeredClass);
		return n;
	}
	var re = (e, r, t) => {
		if (r === t) return e;
		if (t.baseClass === void 0) return null;
		var n = re(e, r, t.baseClass);
		return n === null ? null : t.downcast(n);
	}, lt = {}, ct = (e, r) => {
		for (r === void 0 && m$1("ptr should not be undefined"); e.baseClass;) r = e.upcast(r), e = e.baseClass;
		return r;
	}, vt = (e, r) => (r = ct(e, r), lt[r]), dr = (e, r) => {
		(!r.ptrType || !r.ptr) && cr("makeClassHandle requires ptr and ptrType");
		var t = !!r.smartPtrType, n = !!r.smartPtr;
		return t !== n && cr("Both smartPtrType and smartPtr must be specified"), r.count = { value: 1 }, er(Object.create(e, { $$: {
			value: r,
			writable: !0
		} }));
	};
	function dt(e) {
		var r = this.getPointee(e);
		if (!r) return this.destructor(e), null;
		var t = vt(this.registeredClass, r);
		if (t !== void 0) {
			if (t.$$.count.value === 0) return t.$$.ptr = r, t.$$.smartPtr = e, t.clone();
			var n = t.clone();
			return this.destructor(e), n;
		}
		function i() {
			return this.isSmartPointer ? dr(this.registeredClass.instancePrototype, {
				ptrType: this.pointeeType,
				ptr: r,
				smartPtrType: this,
				smartPtr: e
			}) : dr(this.registeredClass.instancePrototype, {
				ptrType: this,
				ptr: e
			});
		}
		var a = this.registeredClass.getActualType(r), s = Kr[a];
		if (!s) return i.call(this);
		var o;
		this.isConst ? o = s.constPointerType : o = s.pointerType;
		var u$1 = re(r, this.registeredClass, o.registeredClass);
		return u$1 === null ? i.call(this) : this.isSmartPointer ? dr(o.registeredClass.instancePrototype, {
			ptrType: o,
			ptr: u$1,
			smartPtrType: this,
			smartPtr: e
		}) : dr(o.registeredClass.instancePrototype, {
			ptrType: o,
			ptr: u$1
		});
	}
	var pt = () => {
		Object.assign(pr.prototype, {
			getPointee(e) {
				return this.rawGetPointee && (e = this.rawGetPointee(e)), e;
			},
			destructor(e) {
				var r;
				(r = this.rawDestructor) === null || r === void 0 || r.call(this, e);
			},
			argPackAdvance: W$1,
			readValueFromPointer: Q,
			fromWireType: dt
		});
	};
	function pr(e, r, t, n, i, a, s, o, u$1, f$1, l$1) {
		this.name = e, this.registeredClass = r, this.isReference = t, this.isConst = n, this.isSmartPointer = i, this.pointeeType = a, this.sharingPolicy = s, this.rawGetPointee = o, this.rawConstructor = u$1, this.rawShare = f$1, this.rawDestructor = l$1, !i && r.baseClass === void 0 ? n ? (this.toWireType = st, this.destructorFunction = null) : (this.toWireType = ft, this.destructorFunction = null) : this.toWireType = ut;
	}
	var ee = (e, r, t) => {
		c.hasOwnProperty(e) || cr("Replacing nonexistent public symbol"), c[e].overloadTable !== void 0 && t !== void 0 ? c[e].overloadTable[t] = r : (c[e] = r, c[e].argCount = t);
	}, te = [], ne, _ = (e) => {
		var r = te[e];
		return r || (te[e] = r = ne.get(e)), r;
	}, ht = function(e, r) {
		let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
		if (e.includes("j")) return dynCallLegacy(e, r, t);
		var n = _(r), i = n(...t);
		return i;
	}, _t = function(e, r) {
		let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
		return function() {
			for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
			return ht(e, r, i, t);
		};
	}, S$1 = function(e, r) {
		e = A$1(e);
		function t() {
			if (e.includes("j")) return _t(e, r);
			var i = _(r);
			return i;
		}
		var n = t();
		return typeof n != "function" && m$1(`unknown function pointer with signature ${e}: ${r}`), n;
	};
	class gt extends Error {}
	var ie = (e) => {
		var r = $n(e), t = A$1(r);
		return Z$1(r), t;
	}, hr = (e, r) => {
		var t = [], n = {};
		function i(a) {
			if (!n[a] && !B$1[a]) {
				if (lr[a]) {
					lr[a].forEach(i);
					return;
				}
				t.push(a), n[a] = !0;
			}
		}
		throw r.forEach(i), new gt(`${e}: ` + t.map(ie).join([", "]));
	}, yt = (e, r, t, n, i, a, s, o, u$1, f$1, l$1, v, g) => {
		l$1 = A$1(l$1), a = S$1(i, a), o && (o = S$1(s, o)), f$1 && (f$1 = S$1(u$1, f$1)), g = S$1(v, g);
		var y$1 = at(l$1);
		Qr(y$1, function() {
			hr(`Cannot construct ${l$1} due to unbound types`, [n]);
		}), N$1([
			e,
			r,
			t
		], n ? [n] : [], (w$1) => {
			w$1 = w$1[0];
			var P, C;
			n ? (P = w$1.registeredClass, C = P.instancePrototype) : C = vr.prototype;
			var T$1 = Rr(l$1, function() {
				if (Object.getPrototypeOf(this) !== I$1) throw new rr(`Use 'new' to construct ${l$1}`);
				if (R$1.constructor_body === void 0) throw new rr(`${l$1} has no accessible constructor`);
				for (var _e = arguments.length, _r = new Array(_e), gr = 0; gr < _e; gr++) _r[gr] = arguments[gr];
				var ge = R$1.constructor_body[_r.length];
				if (ge === void 0) throw new rr(`Tried to invoke ctor of ${l$1} with invalid number of parameters (${_r.length}) - expected (${Object.keys(R$1.constructor_body).toString()}) parameters instead!`);
				return ge.apply(this, _r);
			}), I$1 = Object.create(C, { constructor: { value: T$1 } });
			T$1.prototype = I$1;
			var R$1 = new ot(l$1, T$1, I$1, g, P, a, o, f$1);
			if (R$1.baseClass) {
				var k, nr;
				(nr = (k = R$1.baseClass).__derivedClasses) !== null && nr !== void 0 || (k.__derivedClasses = []), R$1.baseClass.__derivedClasses.push(R$1);
			}
			var vi = new pr(l$1, R$1, !0, !1, !1), pe = new pr(l$1 + "*", R$1, !1, !1, !1), he = new pr(l$1 + " const*", R$1, !1, !0, !1);
			return Kr[e] = {
				pointerType: pe,
				constPointerType: he
			}, ee(y$1, T$1), [
				vi,
				pe,
				he
			];
		});
	}, Er = (e, r) => {
		for (var t = [], n = 0; n < e; n++) t.push($[r + n * 4 >> 2]);
		return t;
	};
	function mt(e) {
		for (var r = 1; r < e.length; ++r) if (e[r] !== null && e[r].destructorFunction === void 0) return !0;
		return !1;
	}
	function kr(e, r, t, n, i, a) {
		var s = r.length;
		s < 2 && m$1("argTypes array size mismatch! Must at least get return value and 'this' types!");
		var o = r[1] !== null && t !== null, u$1 = mt(r), f$1 = r[0].name !== "void", l$1 = s - 2, v = new Array(l$1), g = [], y$1 = [], w$1 = function() {
			y$1.length = 0;
			var P;
			g.length = o ? 2 : 1, g[0] = i, o && (P = r[1].toWireType(y$1, this), g[1] = P);
			for (var C = 0; C < l$1; ++C) v[C] = r[C + 2].toWireType(y$1, C < 0 || arguments.length <= C ? void 0 : arguments[C]), g.push(v[C]);
			var T$1 = n(...g);
			function I$1(R$1) {
				if (u$1) Pr(y$1);
				else for (var k = o ? 1 : 2; k < r.length; k++) {
					var nr = k === 1 ? P : v[k - 2];
					r[k].destructorFunction !== null && r[k].destructorFunction(nr);
				}
				if (f$1) return r[0].fromWireType(R$1);
			}
			return I$1(T$1);
		};
		return Rr(e, w$1);
	}
	var $t = (e, r, t, n, i, a) => {
		var s = Er(r, t);
		i = S$1(n, i), N$1([], [e], (o) => {
			o = o[0];
			var u$1 = `constructor ${o.name}`;
			if (o.registeredClass.constructor_body === void 0 && (o.registeredClass.constructor_body = []), o.registeredClass.constructor_body[r - 1] !== void 0) throw new rr(`Cannot register multiple constructors with identical number of parameters (${r - 1}) for class '${o.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
			return o.registeredClass.constructor_body[r - 1] = () => {
				hr(`Cannot construct ${o.name} due to unbound types`, s);
			}, N$1([], s, (f$1) => (f$1.splice(1, 0, null), o.registeredClass.constructor_body[r - 1] = kr(u$1, f$1, null, i, a), [])), [];
		});
	}, ae = (e) => {
		e = e.trim();
		const r = e.indexOf("(");
		return r === -1 ? e : e.slice(0, r);
	}, bt = (e, r, t, n, i, a, s, o, u$1, f$1) => {
		var l$1 = Er(t, n);
		r = A$1(r), r = ae(r), a = S$1(i, a), N$1([], [e], (v) => {
			v = v[0];
			var g = `${v.name}.${r}`;
			r.startsWith("@@") && (r = Symbol[r.substring(2)]), o && v.registeredClass.pureVirtualFunctions.push(r);
			function y$1() {
				hr(`Cannot call ${g} due to unbound types`, l$1);
			}
			var w$1 = v.registeredClass.instancePrototype, P = w$1[r];
			return P === void 0 || P.overloadTable === void 0 && P.className !== v.name && P.argCount === t - 2 ? (y$1.argCount = t - 2, y$1.className = v.name, w$1[r] = y$1) : (Jr(w$1, r, g), w$1[r].overloadTable[t - 2] = y$1), N$1([], l$1, (C) => {
				var T$1 = kr(g, C, v, a, s);
				return w$1[r].overloadTable === void 0 ? (T$1.argCount = t - 2, w$1[r] = T$1) : w$1[r].overloadTable[t - 2] = T$1, [];
			}), [];
		});
	}, Sr = [], M$1 = [], Or = (e) => {
		e > 9 && --M$1[e + 1] === 0 && (M$1[e] = void 0, Sr.push(e));
	}, wt = () => M$1.length / 2 - 5 - Sr.length, Ct = () => {
		M$1.push(0, 1, void 0, 1, null, 1, !0, 1, !1, 1), c.count_emval_handles = wt;
	}, x$1 = {
		toValue: (e) => (e || m$1(`Cannot use deleted val. handle = ${e}`), M$1[e]),
		toHandle: (e) => {
			switch (e) {
				case void 0: return 2;
				case null: return 4;
				case !0: return 6;
				case !1: return 8;
				default: {
					const r = Sr.pop() || M$1.length;
					return M$1[r] = e, M$1[r + 1] = 1, r;
				}
			}
		}
	}, oe = {
		name: "emscripten::val",
		fromWireType: (e) => {
			var r = x$1.toValue(e);
			return Or(e), r;
		},
		toWireType: (e, r) => x$1.toHandle(r),
		argPackAdvance: W$1,
		readValueFromPointer: Q,
		destructorFunction: null
	}, Pt = (e) => O$1(e, oe), Tt = (e, r) => {
		switch (r) {
			case 4: return function(t) {
				return this.fromWireType(Br[t >> 2]);
			};
			case 8: return function(t) {
				return this.fromWireType(Nr[t >> 3]);
			};
			default: throw new TypeError(`invalid float width (${r}): ${e}`);
		}
	}, At = (e, r, t) => {
		r = A$1(r), O$1(e, {
			name: r,
			fromWireType: (n) => n,
			toWireType: (n, i) => i,
			argPackAdvance: W$1,
			readValueFromPointer: Tt(r, t),
			destructorFunction: null
		});
	}, Rt = (e, r, t, n, i, a, s, o) => {
		var u$1 = Er(r, t);
		e = A$1(e), e = ae(e), i = S$1(n, i), Qr(e, function() {
			hr(`Cannot call ${e} due to unbound types`, u$1);
		}, r - 1), N$1([], u$1, (f$1) => {
			var l$1 = [f$1[0], null].concat(f$1.slice(1));
			return ee(e, kr(e, l$1, null, i, a), r - 1), [];
		});
	}, Ft = (e, r, t) => {
		switch (r) {
			case 1: return t ? (n) => U$1[n] : (n) => E$1[n];
			case 2: return t ? (n) => K[n >> 1] : (n) => ar[n >> 1];
			case 4: return t ? (n) => G$1[n >> 2] : (n) => $[n >> 2];
			default: throw new TypeError(`invalid integer width (${r}): ${e}`);
		}
	}, Et = (e, r, t, n, i) => {
		r = A$1(r);
		var a = (l$1) => l$1;
		if (n === 0) {
			var s = 32 - 8 * t;
			a = (l$1) => l$1 << s >>> s;
		}
		var o = r.includes("unsigned"), u$1 = (l$1, v) => {}, f$1;
		o ? f$1 = function(l$1, v) {
			return u$1(v, this.name), v >>> 0;
		} : f$1 = function(l$1, v) {
			return u$1(v, this.name), v;
		}, O$1(e, {
			name: r,
			fromWireType: a,
			toWireType: f$1,
			argPackAdvance: W$1,
			readValueFromPointer: Ft(r, t, n !== 0),
			destructorFunction: null
		});
	}, kt = (e, r, t) => {
		var n = [
			Int8Array,
			Uint8Array,
			Int16Array,
			Uint16Array,
			Int32Array,
			Uint32Array,
			Float32Array,
			Float64Array
		], i = n[r];
		function a(s) {
			var o = $[s >> 2], u$1 = $[s + 4 >> 2];
			return new i(U$1.buffer, u$1, o);
		}
		t = A$1(t), O$1(e, {
			name: t,
			fromWireType: a,
			argPackAdvance: W$1,
			readValueFromPointer: a
		}, { ignoreDuplicateRegistrations: !0 });
	}, St = Object.assign({ optional: !0 }, oe), Ot = (e, r) => {
		O$1(e, St);
	}, jt = (e, r, t, n) => {
		if (!(n > 0)) return 0;
		for (var i = t, a = t + n - 1, s = 0; s < e.length; ++s) {
			var o = e.charCodeAt(s);
			if (o >= 55296 && o <= 57343) {
				var u$1 = e.charCodeAt(++s);
				o = 65536 + ((o & 1023) << 10) | u$1 & 1023;
			}
			if (o <= 127) {
				if (t >= a) break;
				r[t++] = o;
			} else if (o <= 2047) {
				if (t + 1 >= a) break;
				r[t++] = 192 | o >> 6, r[t++] = 128 | o & 63;
			} else if (o <= 65535) {
				if (t + 2 >= a) break;
				r[t++] = 224 | o >> 12, r[t++] = 128 | o >> 6 & 63, r[t++] = 128 | o & 63;
			} else {
				if (t + 3 >= a) break;
				r[t++] = 240 | o >> 18, r[t++] = 128 | o >> 12 & 63, r[t++] = 128 | o >> 6 & 63, r[t++] = 128 | o & 63;
			}
		}
		return r[t] = 0, t - i;
	}, q = (e, r, t) => jt(e, E$1, r, t), se = (e) => {
		for (var r = 0, t = 0; t < e.length; ++t) {
			var n = e.charCodeAt(t);
			n <= 127 ? r++ : n <= 2047 ? r += 2 : n >= 55296 && n <= 57343 ? (r += 4, ++t) : r += 3;
		}
		return r;
	}, ue = typeof TextDecoder < "u" ? new TextDecoder() : void 0, fe = function(e) {
		let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : NaN;
		for (var n = r + t, i = r; e[i] && !(i >= n);) ++i;
		if (i - r > 16 && e.buffer && ue) return ue.decode(e.subarray(r, i));
		for (var a = ""; r < i;) {
			var s = e[r++];
			if (!(s & 128)) {
				a += String.fromCharCode(s);
				continue;
			}
			var o = e[r++] & 63;
			if ((s & 224) == 192) {
				a += String.fromCharCode((s & 31) << 6 | o);
				continue;
			}
			var u$1 = e[r++] & 63;
			if ((s & 240) == 224 ? s = (s & 15) << 12 | o << 6 | u$1 : s = (s & 7) << 18 | o << 12 | u$1 << 6 | e[r++] & 63, s < 65536) a += String.fromCharCode(s);
			else {
				var f$1 = s - 65536;
				a += String.fromCharCode(55296 | f$1 >> 10, 56320 | f$1 & 1023);
			}
		}
		return a;
	}, Dt = (e, r) => e ? fe(E$1, e, r) : "", Wt = (e, r) => {
		r = A$1(r), O$1(e, {
			name: r,
			fromWireType(t) {
				for (var n = $[t >> 2], i = t + 4, a, s, o = i, s = 0; s <= n; ++s) {
					var u$1 = i + s;
					if (s == n || E$1[u$1] == 0) {
						var f$1 = u$1 - o, l$1 = Dt(o, f$1);
						a === void 0 ? a = l$1 : (a += "\0", a += l$1), o = u$1 + 1;
					}
				}
				return Z$1(t), a;
			},
			toWireType(t, n) {
				n instanceof ArrayBuffer && (n = new Uint8Array(n));
				var i, a = typeof n == "string";
				a || ArrayBuffer.isView(n) && n.BYTES_PER_ELEMENT == 1 || m$1("Cannot pass non-string to std::string"), a ? i = se(n) : i = n.length;
				var s = de(4 + i + 1), o = s + 4;
				return $[s >> 2] = i, a ? q(n, o, i + 1) : E$1.set(n, o), t !== null && t.push(Z$1, s), s;
			},
			argPackAdvance: W$1,
			readValueFromPointer: Q,
			destructorFunction(t) {
				Z$1(t);
			}
		});
	}, le = typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0, Mt = (e, r) => {
		for (var t = e, n = t >> 1, i = n + r / 2; !(n >= i) && ar[n];) ++n;
		if (t = n << 1, t - e > 32 && le) return le.decode(E$1.subarray(e, t));
		for (var a = "", s = 0; !(s >= r / 2); ++s) {
			var o = K[e + s * 2 >> 1];
			if (o == 0) break;
			a += String.fromCharCode(o);
		}
		return a;
	}, xt = (e, r, t) => {
		if (t ??= 2147483647, t < 2) return 0;
		t -= 2;
		for (var n = r, i = t < e.length * 2 ? t / 2 : e.length, a = 0; a < i; ++a) {
			var s = e.charCodeAt(a);
			K[r >> 1] = s, r += 2;
		}
		return K[r >> 1] = 0, r - n;
	}, It = (e) => e.length * 2, Vt = (e, r) => {
		for (var t = 0, n = ""; !(t >= r / 4);) {
			var i = G$1[e + t * 4 >> 2];
			if (i == 0) break;
			if (++t, i >= 65536) {
				var a = i - 65536;
				n += String.fromCharCode(55296 | a >> 10, 56320 | a & 1023);
			} else n += String.fromCharCode(i);
		}
		return n;
	}, Ut = (e, r, t) => {
		if (t ??= 2147483647, t < 4) return 0;
		for (var n = r, i = n + t - 4, a = 0; a < e.length; ++a) {
			var s = e.charCodeAt(a);
			if (s >= 55296 && s <= 57343) {
				var o = e.charCodeAt(++a);
				s = 65536 + ((s & 1023) << 10) | o & 1023;
			}
			if (G$1[r >> 2] = s, r += 4, r + 4 > i) break;
		}
		return G$1[r >> 2] = 0, r - n;
	}, Ht = (e) => {
		for (var r = 0, t = 0; t < e.length; ++t) {
			var n = e.charCodeAt(t);
			n >= 55296 && n <= 57343 && ++t, r += 4;
		}
		return r;
	}, Bt = (e, r, t) => {
		t = A$1(t);
		var n, i, a, s;
		r === 2 ? (n = Mt, i = xt, s = It, a = (o) => ar[o >> 1]) : r === 4 && (n = Vt, i = Ut, s = Ht, a = (o) => $[o >> 2]), O$1(e, {
			name: t,
			fromWireType: (o) => {
				for (var u$1 = $[o >> 2], f$1, l$1 = o + 4, v = 0; v <= u$1; ++v) {
					var g = o + 4 + v * r;
					if (v == u$1 || a(g) == 0) {
						var y$1 = g - l$1, w$1 = n(l$1, y$1);
						f$1 === void 0 ? f$1 = w$1 : (f$1 += "\0", f$1 += w$1), l$1 = g + r;
					}
				}
				return Z$1(o), f$1;
			},
			toWireType: (o, u$1) => {
				typeof u$1 != "string" && m$1(`Cannot pass non-string to C++ string type ${t}`);
				var f$1 = s(u$1), l$1 = de(4 + f$1 + r);
				return $[l$1 >> 2] = f$1 / r, i(u$1, l$1 + 4, f$1 + r), o !== null && o.push(Z$1, l$1), l$1;
			},
			argPackAdvance: W$1,
			readValueFromPointer: Q,
			destructorFunction(o) {
				Z$1(o);
			}
		});
	}, Nt = (e, r, t, n, i, a) => {
		fr[e] = {
			name: A$1(r),
			rawConstructor: S$1(t, n),
			rawDestructor: S$1(i, a),
			fields: []
		};
	}, Zt = (e, r, t, n, i, a, s, o, u$1, f$1) => {
		fr[e].fields.push({
			fieldName: A$1(r),
			getterReturnType: t,
			getter: S$1(n, i),
			getterContext: a,
			setterArgumentType: s,
			setter: S$1(o, u$1),
			setterContext: f$1
		});
	}, zt = (e, r) => {
		r = A$1(r), O$1(e, {
			isVoid: !0,
			name: r,
			argPackAdvance: 0,
			fromWireType: () => {},
			toWireType: (t, n) => {}
		});
	}, jr = [], Gt = (e, r, t, n) => (e = jr[e], r = x$1.toValue(r), e(null, r, t, n)), Lt = {}, Xt = (e) => {
		var r = Lt[e];
		return r === void 0 ? A$1(e) : r;
	}, ce = () => {
		if (typeof globalThis == "object") return globalThis;
		function e(r) {
			r.$$$embind_global$$$ = r;
			var t = typeof $$$embind_global$$$ == "object" && r.$$$embind_global$$$ == r;
			return t || delete r.$$$embind_global$$$, t;
		}
		if (typeof $$$embind_global$$$ == "object" || (typeof global == "object" && e(global) ? $$$embind_global$$$ = global : typeof self == "object" && e(self) && ($$$embind_global$$$ = self), typeof $$$embind_global$$$ == "object")) return $$$embind_global$$$;
		throw Error("unable to get global object.");
	}, qt = (e) => e === 0 ? x$1.toHandle(ce()) : (e = Xt(e), x$1.toHandle(ce()[e])), Yt = (e) => {
		var r = jr.length;
		return jr.push(e), r;
	}, ve = (e, r) => {
		var t = B$1[e];
		return t === void 0 && m$1(`${r} has unknown type ${ie(e)}`), t;
	}, Kt = (e, r) => {
		for (var t = new Array(e), n = 0; n < e; ++n) t[n] = ve($[r + n * 4 >> 2], `parameter ${n}`);
		return t;
	}, Jt = (e, r, t) => {
		var n = [], i = e.toWireType(n, t);
		return n.length && ($[r >> 2] = x$1.toHandle(n)), i;
	}, Qt = Reflect.construct, rn = (e, r, t) => {
		var n = Kt(e, r), i = n.shift();
		e--;
		var a = new Array(e), s = (u$1, f$1, l$1, v) => {
			for (var g = 0, y$1 = 0; y$1 < e; ++y$1) a[y$1] = n[y$1].readValueFromPointer(v + g), g += n[y$1].argPackAdvance;
			var w$1 = t === 1 ? Qt(f$1, a) : f$1.apply(u$1, a);
			return Jt(i, l$1, w$1);
		}, o = `methodCaller<(${n.map((u$1) => u$1.name).join(", ")}) => ${i.name}>`;
		return Yt(Rr(o, s));
	}, en = (e) => {
		e > 9 && (M$1[e + 1] += 1);
	}, tn = (e) => {
		var r = x$1.toValue(e);
		Pr(r), Or(e);
	}, nn = (e, r) => {
		e = ve(e, "_emval_take_value");
		var t = e.readValueFromPointer(r);
		return x$1.toHandle(t);
	}, an = (e, r, t, n) => {
		var i = (/* @__PURE__ */ new Date()).getFullYear(), a = new Date(i, 0, 1), s = new Date(i, 6, 1), o = a.getTimezoneOffset(), u$1 = s.getTimezoneOffset(), f$1 = Math.max(o, u$1);
		$[e >> 2] = f$1 * 60, G$1[r >> 2] = +(o != u$1);
		var l$1 = (y$1) => {
			var w$1 = y$1 >= 0 ? "-" : "+", P = Math.abs(y$1), C = String(Math.floor(P / 60)).padStart(2, "0"), T$1 = String(P % 60).padStart(2, "0");
			return `UTC${w$1}${C}${T$1}`;
		}, v = l$1(o), g = l$1(u$1);
		u$1 < o ? (q(v, t, 17), q(g, n, 17)) : (q(v, n, 17), q(g, t, 17));
	}, on = () => 2147483648, sn = (e, r) => Math.ceil(e / r) * r, un = (e) => {
		var r = ir.buffer, t = (e - r.byteLength + 65535) / 65536 | 0;
		try {
			return ir.grow(t), Zr(), 1;
		} catch {}
	}, fn = (e) => {
		var r = E$1.length;
		e >>>= 0;
		var t = on();
		if (e > t) return !1;
		for (var n = 1; n <= 4; n *= 2) {
			var i = r * (1 + .2 / n);
			i = Math.min(i, e + 100663296);
			var a = Math.min(t, sn(Math.max(e, i), 65536)), s = un(a);
			if (s) return !0;
		}
		return !1;
	}, Dr = {}, ln = () => Ir || "./this.program", tr = () => {
		if (!tr.strings) {
			var e = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", r = {
				USER: "web_user",
				LOGNAME: "web_user",
				PATH: "/",
				PWD: "/",
				HOME: "/home/web_user",
				LANG: e,
				_: ln()
			};
			for (var t in Dr) Dr[t] === void 0 ? delete r[t] : r[t] = Dr[t];
			var n = [];
			for (var t in r) n.push(`${t}=${r[t]}`);
			tr.strings = n;
		}
		return tr.strings;
	}, cn = (e, r) => {
		var t = 0, n = 0;
		for (var i of tr()) {
			var a = r + t;
			$[e + n >> 2] = a, t += q(i, a, Infinity) + 1, n += 4;
		}
		return 0;
	}, vn = (e, r) => {
		var t = tr();
		$[e >> 2] = t.length;
		var n = 0;
		for (var i of t) n += se(i) + 1;
		return $[r >> 2] = n, 0;
	}, dn = (e) => 52;
	function pn(e, r, t, n, i) {
		return 70;
	}
	var hn = [
		null,
		[],
		[]
	], _n = (e, r) => {
		var t = hn[e];
		r === 0 || r === 10 ? ((e === 1 ? Ur : z$1)(fe(t)), t.length = 0) : t.push(r);
	}, gn = (e, r, t, n) => {
		for (var i = 0, a = 0; a < t; a++) {
			var s = $[r >> 2], o = $[r + 4 >> 2];
			r += 8;
			for (var u$1 = 0; u$1 < o; u$1++) _n(e, E$1[s + u$1]);
			i += o;
		}
		return $[n >> 2] = i, 0;
	}, yn = (e) => e;
	Ke(), tt(), pt(), Ct(), c.noExitRuntime && c.noExitRuntime, c.print && (Ur = c.print), c.printErr && (z$1 = c.printErr), c.wasmBinary && (Y = c.wasmBinary), c.arguments && c.arguments, c.thisProgram && (Ir = c.thisProgram);
	var mn = {
		s: Ie,
		w: Ve,
		a: Ue,
		j: He,
		m: Be,
		N: Ne,
		p: Ze,
		da: ze,
		d: Ge,
		_: Le,
		sa: qe,
		Z: Ye,
		na: Qe,
		qa: yt,
		pa: $t,
		F: bt,
		la: Pt,
		R: At,
		S: Rt,
		y: Et,
		t: kt,
		ra: Ot,
		ma: Wt,
		O: Bt,
		K: Nt,
		ta: Zt,
		oa: zt,
		V: Gt,
		ua: Or,
		wa: qt,
		$: rn,
		T: en,
		va: tn,
		ka: nn,
		aa: an,
		ea: fn,
		ba: cn,
		ca: vn,
		fa: dn,
		X: pn,
		Q: gn,
		I: Kn,
		C: Qn,
		U: Wn,
		P: oi,
		q: Ln,
		b: Sn,
		D: Yn,
		ia: ei,
		c: jn,
		ha: ti,
		h: Dn,
		i: Un,
		r: Bn,
		M: qn,
		v: Zn,
		E: Gn,
		J: Xn,
		A: ri,
		H: si,
		W: li,
		k: xn,
		f: Mn,
		e: On,
		g: kn,
		L: ai,
		l: Vn,
		ja: Jn,
		o: Nn,
		x: Hn,
		u: zn,
		ga: ii,
		B: ni,
		n: In,
		G: ui,
		Y: fi,
		z: yn
	}, b$1 = await We();
	b$1.ya;
	var $n = b$1.za, Z$1 = c._free = b$1.Aa, de = c._malloc = b$1.Ca, bn = b$1.Da, d = b$1.Ea, wn = b$1.Fa, Cn = b$1.Ga, Pn = b$1.Ha, Tn = b$1.Ia, An = b$1.Ja, Rn = b$1.Ka;
	c.dynCall_viijii = b$1.La;
	var Fn = c.dynCall_vij = b$1.Ma;
	c.dynCall_jiji = b$1.Na;
	var En = c.dynCall_jiiii = b$1.Oa;
	c.dynCall_iiiiij = b$1.Pa, c.dynCall_iiiiijj = b$1.Qa, c.dynCall_iiiiiijj = b$1.Ra;
	function kn(e, r, t, n) {
		var i = h$1();
		try {
			_(e)(r, t, n);
		} catch (a) {
			if (p$1(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function Sn(e, r) {
		var t = h$1();
		try {
			return _(e)(r);
		} catch (n) {
			if (p$1(t), n !== n + 0) throw n;
			d(1, 0);
		}
	}
	function On(e, r, t) {
		var n = h$1();
		try {
			_(e)(r, t);
		} catch (i) {
			if (p$1(n), i !== i + 0) throw i;
			d(1, 0);
		}
	}
	function jn(e, r, t) {
		var n = h$1();
		try {
			return _(e)(r, t);
		} catch (i) {
			if (p$1(n), i !== i + 0) throw i;
			d(1, 0);
		}
	}
	function Dn(e, r, t, n) {
		var i = h$1();
		try {
			return _(e)(r, t, n);
		} catch (a) {
			if (p$1(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function Wn(e, r, t, n, i) {
		var a = h$1();
		try {
			return _(e)(r, t, n, i);
		} catch (s) {
			if (p$1(a), s !== s + 0) throw s;
			d(1, 0);
		}
	}
	function Mn(e, r) {
		var t = h$1();
		try {
			_(e)(r);
		} catch (n) {
			if (p$1(t), n !== n + 0) throw n;
			d(1, 0);
		}
	}
	function xn(e) {
		var r = h$1();
		try {
			_(e)();
		} catch (t) {
			if (p$1(r), t !== t + 0) throw t;
			d(1, 0);
		}
	}
	function In(e, r, t, n, i, a, s, o, u$1, f$1, l$1) {
		var v = h$1();
		try {
			_(e)(r, t, n, i, a, s, o, u$1, f$1, l$1);
		} catch (g) {
			if (p$1(v), g !== g + 0) throw g;
			d(1, 0);
		}
	}
	function Vn(e, r, t, n, i) {
		var a = h$1();
		try {
			_(e)(r, t, n, i);
		} catch (s) {
			if (p$1(a), s !== s + 0) throw s;
			d(1, 0);
		}
	}
	function Un(e, r, t, n, i) {
		var a = h$1();
		try {
			return _(e)(r, t, n, i);
		} catch (s) {
			if (p$1(a), s !== s + 0) throw s;
			d(1, 0);
		}
	}
	function Hn(e, r, t, n, i, a, s) {
		var o = h$1();
		try {
			_(e)(r, t, n, i, a, s);
		} catch (u$1) {
			if (p$1(o), u$1 !== u$1 + 0) throw u$1;
			d(1, 0);
		}
	}
	function Bn(e, r, t, n, i, a) {
		var s = h$1();
		try {
			return _(e)(r, t, n, i, a);
		} catch (o) {
			if (p$1(s), o !== o + 0) throw o;
			d(1, 0);
		}
	}
	function Nn(e, r, t, n, i, a) {
		var s = h$1();
		try {
			_(e)(r, t, n, i, a);
		} catch (o) {
			if (p$1(s), o !== o + 0) throw o;
			d(1, 0);
		}
	}
	function Zn(e, r, t, n, i, a, s) {
		var o = h$1();
		try {
			return _(e)(r, t, n, i, a, s);
		} catch (u$1) {
			if (p$1(o), u$1 !== u$1 + 0) throw u$1;
			d(1, 0);
		}
	}
	function zn(e, r, t, n, i, a, s, o) {
		var u$1 = h$1();
		try {
			_(e)(r, t, n, i, a, s, o);
		} catch (f$1) {
			if (p$1(u$1), f$1 !== f$1 + 0) throw f$1;
			d(1, 0);
		}
	}
	function Gn(e, r, t, n, i, a, s, o) {
		var u$1 = h$1();
		try {
			return _(e)(r, t, n, i, a, s, o);
		} catch (f$1) {
			if (p$1(u$1), f$1 !== f$1 + 0) throw f$1;
			d(1, 0);
		}
	}
	function Ln(e) {
		var r = h$1();
		try {
			return _(e)();
		} catch (t) {
			if (p$1(r), t !== t + 0) throw t;
			d(1, 0);
		}
	}
	function Xn(e, r, t, n, i, a, s, o, u$1) {
		var f$1 = h$1();
		try {
			return _(e)(r, t, n, i, a, s, o, u$1);
		} catch (l$1) {
			if (p$1(f$1), l$1 !== l$1 + 0) throw l$1;
			d(1, 0);
		}
	}
	function qn(e, r, t, n, i, a, s) {
		var o = h$1();
		try {
			return _(e)(r, t, n, i, a, s);
		} catch (u$1) {
			if (p$1(o), u$1 !== u$1 + 0) throw u$1;
			d(1, 0);
		}
	}
	function Yn(e, r, t, n) {
		var i = h$1();
		try {
			return _(e)(r, t, n);
		} catch (a) {
			if (p$1(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function Kn(e, r, t, n) {
		var i = h$1();
		try {
			return _(e)(r, t, n);
		} catch (a) {
			if (p$1(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function Jn(e, r, t, n, i, a, s, o) {
		var u$1 = h$1();
		try {
			_(e)(r, t, n, i, a, s, o);
		} catch (f$1) {
			if (p$1(u$1), f$1 !== f$1 + 0) throw f$1;
			d(1, 0);
		}
	}
	function Qn(e, r, t, n, i, a) {
		var s = h$1();
		try {
			return _(e)(r, t, n, i, a);
		} catch (o) {
			if (p$1(s), o !== o + 0) throw o;
			d(1, 0);
		}
	}
	function ri(e, r, t, n, i, a, s, o, u$1, f$1) {
		var l$1 = h$1();
		try {
			return _(e)(r, t, n, i, a, s, o, u$1, f$1);
		} catch (v) {
			if (p$1(l$1), v !== v + 0) throw v;
			d(1, 0);
		}
	}
	function ei(e, r, t) {
		var n = h$1();
		try {
			return _(e)(r, t);
		} catch (i) {
			if (p$1(n), i !== i + 0) throw i;
			d(1, 0);
		}
	}
	function ti(e, r, t, n, i) {
		var a = h$1();
		try {
			return _(e)(r, t, n, i);
		} catch (s) {
			if (p$1(a), s !== s + 0) throw s;
			d(1, 0);
		}
	}
	function ni(e, r, t, n, i, a, s, o, u$1, f$1) {
		var l$1 = h$1();
		try {
			_(e)(r, t, n, i, a, s, o, u$1, f$1);
		} catch (v) {
			if (p$1(l$1), v !== v + 0) throw v;
			d(1, 0);
		}
	}
	function ii(e, r, t, n, i, a, s, o, u$1) {
		var f$1 = h$1();
		try {
			_(e)(r, t, n, i, a, s, o, u$1);
		} catch (l$1) {
			if (p$1(f$1), l$1 !== l$1 + 0) throw l$1;
			d(1, 0);
		}
	}
	function ai(e, r, t, n, i, a, s) {
		var o = h$1();
		try {
			_(e)(r, t, n, i, a, s);
		} catch (u$1) {
			if (p$1(o), u$1 !== u$1 + 0) throw u$1;
			d(1, 0);
		}
	}
	function oi(e, r, t, n) {
		var i = h$1();
		try {
			return _(e)(r, t, n);
		} catch (a) {
			if (p$1(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function si(e, r, t, n, i, a, s, o, u$1, f$1, l$1, v) {
		var g = h$1();
		try {
			return _(e)(r, t, n, i, a, s, o, u$1, f$1, l$1, v);
		} catch (y$1) {
			if (p$1(g), y$1 !== y$1 + 0) throw y$1;
			d(1, 0);
		}
	}
	function ui(e, r, t, n, i, a, s, o, u$1, f$1, l$1, v, g, y$1, w$1, P) {
		var C = h$1();
		try {
			_(e)(r, t, n, i, a, s, o, u$1, f$1, l$1, v, g, y$1, w$1, P);
		} catch (T$1) {
			if (p$1(C), T$1 !== T$1 + 0) throw T$1;
			d(1, 0);
		}
	}
	function fi(e, r, t, n) {
		var i = h$1();
		try {
			Fn(e, r, t, n);
		} catch (a) {
			if (p$1(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function li(e, r, t, n, i) {
		var a = h$1();
		try {
			return En(e, r, t, n, i);
		} catch (s) {
			if (p$1(a), s !== s + 0) throw s;
			d(1, 0);
		}
	}
	function Wr() {
		if (H$1 > 0) {
			J = Wr;
			return;
		}
		if (Pe(), H$1 > 0) {
			J = Wr;
			return;
		}
		function e() {
			var r;
			c.calledRun = !0, !Hr && (Te(), xr(c), (r = c.onRuntimeInitialized) === null || r === void 0 || r.call(c), Ae());
		}
		c.setStatus ? (c.setStatus("Running..."), setTimeout(() => {
			setTimeout(() => c.setStatus(""), 1), e();
		}, 1)) : e();
	}
	function ci() {
		if (c.preInit) for (typeof c.preInit == "function" && (c.preInit = [c.preInit]); c.preInit.length > 0;) c.preInit.shift()();
	}
	return ci(), Wr(), V = $e, V;
};
function ye(F$1) {
	return S(Mr, F$1);
}
async function me(F$1, V) {
	return Z(Mr, F$1, V);
}

//#endregion
//#region lib/utils.ts
function checkCameraConstraintsCapabilities(video, key) {
	const videoTracks = video.srcObject.getVideoTracks();
	const track = videoTracks[0];
	const capabilities = track?.getCapabilities();
	return !!capabilities?.[key];
}
function getCameraCapabilitiesZoomRange(video) {
	const videoTracks = video.srcObject.getVideoTracks();
	const track = videoTracks[0];
	const capabilities = track?.getCapabilities();
	const ret = {
		min: 1,
		max: 1
	};
	if ("zoom" in capabilities) {
		ret.min = capabilities["zoom"]["min"];
		ret.max = capabilities["zoom"]["max"];
	}
	return ret;
}
async function applyVideoZoom(video, zoom) {
	const track = video.srcObject.getVideoTracks()[0];
	const constraints = { advanced: [{ zoom }] };
	await track.applyConstraints(constraints);
}
function closeStream(stream) {
	if (stream) {
		const tracks = stream.getTracks();
		for (let i = 0; i < tracks.length; i++) {
			const track = tracks[i];
			track.stop();
		}
	}
}
async function requestCameraPermission() {
	try {
		const constraints = {
			video: true,
			audio: false,
			facingMode: "environment"
		};
		const stream = await navigator.mediaDevices.getUserMedia(constraints);
		closeStream(stream);
	} catch (error) {
		console.log(error);
		throw error;
	}
}
async function openCamera({ width, height, video }) {
	const videoConstraints = {
		video: {
			width,
			height,
			zoom: true,
			facingMode: "environment"
		},
		audio: false
	};
	try {
		const cameraStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
		video.srcObject = cameraStream;
		await video.play();
	} catch (error) {
		alert(error);
	}
}
async function closeCamera(video) {
	const stream = video.srcObject;
	if (stream) {
		stream.getTracks().forEach((track) => track.stop());
		video.srcObject = null;
	}
}
async function scanCanvas(ctx, readerOptions) {
	if (!ctx) throw new Error("Canvas context not found");
	const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	const imageDataReadResults = await me(imageData, readerOptions);
	return imageDataReadResults[0];
}
function drawTargetRectangle(ctx, position) {
	if (!position) return;
	const { topLeft, topRight, bottomLeft, bottomRight } = position;
	ctx.strokeStyle = position.color || "rgba(0, 255, 0, 0.5)";
	ctx.beginPath();
	ctx.moveTo(topLeft.x, topLeft.y);
	ctx.lineTo(topRight.x, topRight.y);
	ctx.lineTo(bottomRight.x, bottomRight.y);
	ctx.lineTo(bottomLeft.x, bottomLeft.y);
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = position.color || "rgba(0, 255, 0, 0.5)";
	ctx.fill();
}
function drawTargetRectangleRotated(ctx, position) {
	if (!position) return;
	const { topLeft, topRight, bottomLeft, bottomRight, color } = position;
	const degree = position.degree || 0;
	const centerX = ctx.canvas.width / 2;
	const centerY = ctx.canvas.height / 2;
	const angle = degree * Math.PI / 180;
	const rotatePoint = (x$1, y$1) => {
		const dx = x$1 - centerX;
		const dy = y$1 - centerY;
		const rotatedX = centerX + dx * Math.cos(angle) - dy * Math.sin(angle);
		const rotatedY = centerY + dx * Math.sin(angle) + dy * Math.cos(angle);
		return {
			x: rotatedX,
			y: rotatedY
		};
	};
	const rotatedTopLeft = rotatePoint(topLeft.x, topLeft.y);
	const rotatedTopRight = rotatePoint(topRight.x, topRight.y);
	const rotatedBottomRight = rotatePoint(bottomRight.x, bottomRight.y);
	const rotatedBottomLeft = rotatePoint(bottomLeft.x, bottomLeft.y);
	drawTargetRectangle(ctx, {
		topLeft: rotatedTopLeft,
		topRight: rotatedTopRight,
		bottomLeft: rotatedBottomLeft,
		bottomRight: rotatedBottomRight,
		color
	});
}
function drawCameraFrame(ctx, { size = .8, length = .1, color = "rgba(255, 255, 255, 0.8)" }) {
	const width = ctx.canvas.width;
	const height = ctx.canvas.height;
	const frameWidth = width * size;
	const frameHeight = height * size;
	const startX = (width - frameWidth) / 2;
	const startY = (height - frameHeight) / 2;
	ctx.strokeStyle = color;
	ctx.lineWidth = window.devicePixelRatio * 4;
	ctx.beginPath();
	const frameLength = width * length;
	ctx.moveTo(startX, startY + frameLength);
	ctx.lineTo(startX, startY);
	ctx.lineTo(startX + frameLength, startY);
	ctx.moveTo(startX + frameWidth - frameLength, startY);
	ctx.lineTo(startX + frameWidth, startY);
	ctx.lineTo(startX + frameWidth, startY + frameLength);
	ctx.moveTo(startX + frameWidth, startY + frameHeight - frameLength);
	ctx.lineTo(startX + frameWidth, startY + frameHeight);
	ctx.lineTo(startX + frameWidth - frameLength, startY + frameHeight);
	ctx.moveTo(startX + frameLength, startY + frameHeight);
	ctx.lineTo(startX, startY + frameHeight);
	ctx.lineTo(startX, startY + frameHeight - frameLength);
	ctx.stroke();
}
const fixedFPSCall = (call, fps = 60) => {
	let now;
	let then = Date.now();
	let interval = 1e3 / fps;
	let delta;
	let raf_id = 0;
	function tick() {
		raf_id = requestAnimationFrame(tick);
		now = Date.now();
		delta = now - then;
		if (delta > interval) {
			then = now - delta % interval;
			call();
		}
	}
	tick();
	return () => {
		cancelAnimationFrame(raf_id);
	};
};
const noop = () => {};

//#endregion
//#region lib/index.ts
const TRICK_DEGREE = 30;
var NanoScan = class {
	zoom = 1;
	cancelLoop = noop;
	videoNode;
	cameraCanvasNode;
	offscreenCanvasNode;
	onScan;
	onError;
	supportNativeZoom = null;
	zoomRange = null;
	options = {
		container: null,
		marker: true,
		frame: true,
		zxingOptions: {
			tryHarder: true,
			formats: ["QRCode"],
			maxNumberOfSymbols: 1
		},
		fps: 30,
		zoom: 1,
		trick: true,
		resolution: {
			width: 1080,
			height: 1080
		}
	};
	constructor(options) {
		this.options = {
			...this.options,
			...options
		};
		this.onScan = options.onScan || noop;
		this.onError = options.onError || noop;
		this.videoNode = document.createElement("video");
		this.cameraCanvasNode = document.createElement("canvas");
		this.offscreenCanvasNode = document.createElement("canvas");
		this.cameraCanvasNode.style.width = `100%`;
		this.offscreenCanvasNode.style.width = `100%`;
		if (this.options.zxingWASMUrl) {
			const wasm_url = this.options.zxingWASMUrl;
			ye({ overrides: { locateFile: (path, prefix) => {
				if (path.endsWith(".wasm")) return wasm_url;
				return prefix + path;
			} } });
		}
		if (!this.options.container) throw new Error("Container is required");
		this.options.container.appendChild(this.cameraCanvasNode);
	}
	async startScan() {
		this.cancelLoop();
		await requestCameraPermission();
		const video = this.videoNode;
		const cameraCanvas = this.cameraCanvasNode;
		const offscreenCanvas = this.offscreenCanvasNode;
		const offscreenCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true });
		const cameraCtx = cameraCanvas.getContext("2d", { willReadFrequently: true });
		await openCamera({
			width: this.options.resolution.width,
			height: this.options.resolution.height,
			video
		});
		this.supportNativeZoom = checkCameraConstraintsCapabilities(this.videoNode, "zoom");
		this.zoomRange = this.supportNativeZoom ? getCameraCapabilitiesZoomRange(this.videoNode) : {
			min: 1,
			max: 10
		};
		cameraCanvas.width = video.videoWidth;
		cameraCanvas.height = video.videoHeight;
		offscreenCanvas.width = video.videoWidth;
		offscreenCanvas.height = video.videoHeight;
		if (this.options.trick) {
			offscreenCtx.translate(offscreenCanvas.width / 2, offscreenCanvas.height / 2);
			offscreenCtx.rotate(TRICK_DEGREE * Math.PI / 180);
			offscreenCtx.translate(-offscreenCanvas.width / 2, -offscreenCanvas.height / 2);
		}
		const drawCanvas = async () => {
			let scanCanvasCtx = cameraCtx;
			const scaledWidth = video?.videoWidth * this.zoom;
			const scaledHeight = video?.videoHeight * this.zoom;
			const scaledX = (video?.videoWidth - scaledWidth) / 2;
			const scaledY = (video?.videoHeight - scaledHeight) / 2;
			cameraCtx?.drawImage(video, 0, 0, video?.videoWidth, video?.videoHeight, scaledX, scaledY, scaledWidth, scaledHeight);
			if (this.options.frame) drawCameraFrame(cameraCtx, {
				size: .8,
				length: .1,
				color: "rgba(255, 255, 255, 0.8)"
			});
			if (this.options.trick) {
				offscreenCtx.drawImage(video, 0, 0, video?.videoWidth, video?.videoHeight, scaledX, scaledY, scaledWidth, scaledHeight);
				scanCanvasCtx = offscreenCtx;
			}
			const decoded = await scanCanvas(scanCanvasCtx);
			if (!decoded || !decoded.text) return;
			this.onScan(decoded.text);
			if (this.options.marker) if (this.options.trick) {
				decoded.position.degree = -TRICK_DEGREE;
				drawTargetRectangleRotated(cameraCtx, decoded.position);
			} else drawTargetRectangle(cameraCtx, decoded.position);
		};
		this.zoomTo(this.options.zoom || 1);
		this.cancelLoop = fixedFPSCall(drawCanvas, this.options.fps);
	}
	stopScan() {
		this.cancelLoop();
		closeCamera(this.videoNode);
	}
	zoomIn(step = .1) {
		this.zoomTo(this.zoom + step);
	}
	zoomOut(step = .1) {
		this.zoomTo(this.zoom - step);
	}
	zoomTo(zoom) {
		const _zoom = Math.min(Math.max(zoom, this.zoomRange?.min || 1), this.zoomRange?.max || 1);
		if (this.supportNativeZoom) {
			this.zoom = 1;
			applyVideoZoom(this.videoNode, _zoom);
			return;
		}
		this.zoom = _zoom;
	}
};

//#endregion
return NanoScan;
});
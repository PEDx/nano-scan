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
const y = [
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
	return e === "UnicodeBig" ? y.indexOf("UTF16BE") : y.indexOf(e);
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
function P(e) {
	return {
		...e,
		format: w(e.format),
		contentType: T(e.contentType),
		eccLevel: e.ecLevel
	};
}
const h = {
	format: "QRCode",
	readerInit: !1,
	forceSquareDataMatrix: !1,
	ecLevel: "",
	scale: 0,
	sizeHint: 0,
	rotate: 0,
	withHRT: !1,
	withQuietZones: !0,
	options: ""
};
const H = "2.2.0", N = "0a3797f698b339c1c01c487a7a43f1368610f503", W = { locateFile: (e, t) => {
	const r = e.match(/_(.+?)\.wasm$/);
	return r ? `https://fastly.jsdelivr.net/npm/zxing-wasm@2.2.0/dist/${r[1]}/${e}` : t + e;
} }, f = /* @__PURE__ */ new WeakMap();
function D(e, t) {
	return Object.is(e, t) || Object.keys(e).length === Object.keys(t).length && Object.keys(e).every((r) => Object.hasOwn(t, r) && e[r] === t[r]);
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
	for (let a = 0; a < s.size(); ++a) i.push(P(s.get(a)));
	return i;
}
const j = {
	...u,
	formats: [...u.formats]
}, G = { ...h };

//#endregion
//#region node_modules/zxing-wasm/dist/es/reader/index.js
var Mr = async function(F$1 = {}) {
	var x$1, gr, l$1 = F$1, xr, yr, we = new Promise((e, r) => {
		xr = e, yr = r;
	}), Ce = typeof window == "object", Pe = typeof Bun < "u", Ir = typeof WorkerGlobalScope < "u";
	typeof process == "object" && !((gr = process.versions) === null || gr === void 0) && gr.node && process.type;
	var Ur = "./this.program", Te, mr = "";
	function Ae(e) {
		return l$1.locateFile ? l$1.locateFile(e, mr) : mr + e;
	}
	var Vr, $r;
	if (Ce || Ir || Pe) {
		try {
			mr = new URL(".", Te).href;
		} catch {}
		Ir && ($r = (e) => {
			var r = new XMLHttpRequest();
			return r.open("GET", e, !1), r.responseType = "arraybuffer", r.send(null), new Uint8Array(r.response);
		}), Vr = async (e) => {
			var r = await fetch(e, { credentials: "same-origin" });
			if (r.ok) return r.arrayBuffer();
			throw new Error(r.status + " : " + r.url);
		};
	}
	var Hr = console.log.bind(console), Z$1 = console.error.bind(console), Y, nr, Br = !1, I$1, E$1, ir, z, L$1, $, Nr, Zr;
	function zr() {
		var e = nr.buffer;
		I$1 = new Int8Array(e), ir = new Int16Array(e), l$1.HEAPU8 = E$1 = new Uint8Array(e), z = new Uint16Array(e), L$1 = new Int32Array(e), $ = new Uint32Array(e), Nr = new Float32Array(e), Zr = new Float64Array(e);
	}
	function Re() {
		if (l$1.preRun) for (typeof l$1.preRun == "function" && (l$1.preRun = [l$1.preRun]); l$1.preRun.length;) Ve(l$1.preRun.shift());
		Lr(Xr);
	}
	function Fe() {
		b$1.ya();
	}
	function ke() {
		if (l$1.postRun) for (typeof l$1.postRun == "function" && (l$1.postRun = [l$1.postRun]); l$1.postRun.length;) Ue(l$1.postRun.shift());
		Lr(Gr);
	}
	var U$1 = 0, K = null;
	function Ee(e) {
		var r;
		U$1++, (r = l$1.monitorRunDependencies) === null || r === void 0 || r.call(l$1, U$1);
	}
	function Se(e) {
		var r;
		if (U$1--, (r = l$1.monitorRunDependencies) === null || r === void 0 || r.call(l$1, U$1), U$1 == 0 && K) {
			var t = K;
			K = null, t();
		}
	}
	function br(e) {
		var r;
		(r = l$1.onAbort) === null || r === void 0 || r.call(l$1, e), e = "Aborted(" + e + ")", Z$1(e), Br = !0, e += ". Build with -sASSERTIONS for more info.";
		var t = new WebAssembly.RuntimeError(e);
		throw yr(t), t;
	}
	var G$1;
	function je() {
		return Ae("zxing_reader.wasm");
	}
	function Oe(e) {
		if (e == G$1 && Y) return new Uint8Array(Y);
		if ($r) return $r(e);
		throw "both async and sync fetching of the wasm failed";
	}
	async function De(e) {
		if (!Y) try {
			var r = await Vr(e);
			return new Uint8Array(r);
		} catch {}
		return Oe(e);
	}
	async function We(e, r) {
		try {
			var t = await De(e), n = await WebAssembly.instantiate(t, r);
			return n;
		} catch (i) {
			Z$1(`failed to asynchronously prepare wasm: ${i}`), br(i);
		}
	}
	async function Me(e, r, t) {
		if (!e && typeof WebAssembly.instantiateStreaming == "function") try {
			var n = fetch(r, { credentials: "same-origin" }), i = await WebAssembly.instantiateStreaming(n, t);
			return i;
		} catch (a) {
			Z$1(`wasm streaming compile failed: ${a}`), Z$1("falling back to ArrayBuffer instantiation");
		}
		return We(r, t);
	}
	function xe() {
		return { a: $n };
	}
	async function Ie() {
		function e(a, s) {
			return b$1 = a.exports, nr = b$1.xa, zr(), ie = b$1.Ba, Se(), b$1;
		}
		Ee();
		function r(a) {
			return e(a.instance);
		}
		var t = xe();
		if (l$1.instantiateWasm) return new Promise((a, s) => {
			l$1.instantiateWasm(t, (o, u$1) => {
				a(e(o));
			});
		});
		G$1 ??= je();
		try {
			var n = await Me(Y, G$1, t), i = r(n);
			return i;
		} catch (a) {
			return yr(a), Promise.reject(a);
		}
	}
	var Lr = (e) => {
		for (; e.length > 0;) e.shift()(l$1);
	}, Gr = [], Ue = (e) => Gr.push(e), Xr = [], Ve = (e) => Xr.push(e), p$1 = (e) => Pn(e), h$1 = () => Tn(), ar = [], or = 0, He = (e) => {
		var r = new wr(e);
		return r.get_caught() || (r.set_caught(!0), or--), r.set_rethrown(!1), ar.push(r), Rn(e), wn(e);
	}, O$1 = 0, Be = () => {
		d(0, 0);
		var e = ar.pop();
		An(e.excPtr), O$1 = 0;
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
			r = r ? 1 : 0, I$1[this.ptr + 12] = r;
		}
		get_caught() {
			return I$1[this.ptr + 12] != 0;
		}
		set_rethrown(r) {
			r = r ? 1 : 0, I$1[this.ptr + 13] = r;
		}
		get_rethrown() {
			return I$1[this.ptr + 13] != 0;
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
	var sr = (e) => Cn(e), Cr = (e) => {
		var r = O$1;
		if (!r) return sr(0), 0;
		var t = new wr(r);
		t.set_adjusted_ptr(r);
		var n = t.get_type();
		if (!n) return sr(0), r;
		for (var i of e) {
			if (i === 0 || i === n) break;
			var a = t.ptr + 16;
			if (Fn(i, n, a)) return sr(i), r;
		}
		return sr(n), r;
	}, Ne = () => Cr([]), Ze = (e) => Cr([e]), ze = (e, r) => Cr([e, r]), Le = () => {
		var e = ar.pop();
		e || br("no exception to throw");
		var r = e.excPtr;
		throw e.get_rethrown() || (ar.push(e), e.set_rethrown(!0), e.set_caught(!1), or++), O$1 = r, O$1;
	}, Ge = (e, r, t) => {
		var n = new wr(e);
		throw n.init(r, t), O$1 = e, or++, O$1;
	}, Xe = () => or, qe = (e) => {
		throw O$1 || (O$1 = e), O$1;
	}, Ye = () => br(""), ur = {}, Pr = (e) => {
		for (; e.length;) {
			var r = e.pop(), t = e.pop();
			t(r);
		}
	};
	function J(e) {
		return this.fromWireType($[e >> 2]);
	}
	var X = {}, V = {}, fr = {}, Ke = class extends Error {
		constructor(r) {
			super(r), this.name = "InternalError";
		}
	}, lr = (e) => {
		throw new Ke(e);
	}, H$1 = (e, r, t) => {
		e.forEach((o) => fr[o] = r);
		function n(o) {
			var u$1 = t(o);
			u$1.length !== e.length && lr("Mismatched type converter count");
			for (var f$1 = 0; f$1 < e.length; ++f$1) j$1(e[f$1], u$1[f$1]);
		}
		var i = new Array(r.length), a = [], s = 0;
		r.forEach((o, u$1) => {
			V.hasOwnProperty(o) ? i[u$1] = V[o] : (a.push(o), X.hasOwnProperty(o) || (X[o] = []), X[o].push(() => {
				i[u$1] = V[o], ++s, s === a.length && n(i);
			}));
		}), a.length === 0 && n(i);
	}, Je = (e) => {
		var r = ur[e];
		delete ur[e];
		var t = r.rawConstructor, n = r.rawDestructor, i = r.fields, a = i.map((s) => s.getterReturnType).concat(i.map((s) => s.setterArgumentType));
		H$1([e], a, (s) => {
			var o = {};
			return i.forEach((u$1, f$1) => {
				var c = u$1.fieldName, v$1 = s[f$1], g = s[f$1].optional, y$1 = u$1.getter, w$1 = u$1.getterContext, P$1 = s[f$1 + i.length], C = u$1.setter, T$1 = u$1.setterContext;
				o[c] = {
					read: (M$1) => v$1.fromWireType(y$1(w$1, M$1)),
					write: (M$1, R$1) => {
						var k = [];
						C(T$1, M$1, P$1.toWireType(k, R$1)), Pr(k);
					},
					optional: g
				};
			}), [{
				name: r.name,
				fromWireType: (u$1) => {
					var f$1 = {};
					for (var c in o) f$1[c] = o[c].read(u$1);
					return n(u$1), f$1;
				},
				toWireType: (u$1, f$1) => {
					for (var c in o) if (!(c in f$1) && !o[c].optional) throw new TypeError(`Missing field: "${c}"`);
					var v$1 = t();
					for (c in o) o[c].write(v$1, f$1[c]);
					return u$1 !== null && u$1.push(n, v$1), v$1;
				},
				argPackAdvance: D$1,
				readValueFromPointer: J,
				destructorFunction: n
			}];
		});
	}, Qe = (e, r, t, n, i) => {}, rt = () => {
		for (var e = new Array(256), r = 0; r < 256; ++r) e[r] = String.fromCharCode(r);
		qr = e;
	}, qr, A$1 = (e) => {
		for (var r = "", t = e; E$1[t];) r += qr[E$1[t++]];
		return r;
	}, Q = class extends Error {
		constructor(r) {
			super(r), this.name = "BindingError";
		}
	}, m$1 = (e) => {
		throw new Q(e);
	};
	function et(e, r) {
		let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
		var n = r.name;
		if (e || m$1(`type "${n}" must have a positive integer typeid pointer`), V.hasOwnProperty(e)) {
			if (t.ignoreDuplicateRegistrations) return;
			m$1(`Cannot register type '${n}' twice`);
		}
		if (V[e] = r, delete fr[e], X.hasOwnProperty(e)) {
			var i = X[e];
			delete X[e], i.forEach((a) => a());
		}
	}
	function j$1(e, r) {
		let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
		return et(e, r, t);
	}
	var D$1 = 8, tt = (e, r, t, n) => {
		r = A$1(r), j$1(e, {
			name: r,
			fromWireType: function(i) {
				return !!i;
			},
			toWireType: function(i, a) {
				return a ? t : n;
			},
			argPackAdvance: D$1,
			readValueFromPointer: function(i) {
				return this.fromWireType(E$1[i]);
			},
			destructorFunction: null
		});
	}, nt = (e) => ({
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
	}, Ar = !1, Yr = (e) => {}, it = (e) => {
		e.smartPtr ? e.smartPtrType.rawDestructor(e.smartPtr) : e.ptrType.registeredClass.rawDestructor(e.ptr);
	}, Kr = (e) => {
		e.count.value -= 1;
		var r = e.count.value === 0;
		r && it(e);
	}, rr = (e) => typeof FinalizationRegistry > "u" ? (rr = (r) => r, e) : (Ar = new FinalizationRegistry((r) => {
		Kr(r.$$);
	}), rr = (r) => {
		var t = r.$$, n = !!t.smartPtr;
		if (n) {
			var i = { $$: t };
			Ar.register(r, i, r);
		}
		return r;
	}, Yr = (r) => Ar.unregister(r), rr(e)), at = () => {
		let e = cr.prototype;
		Object.assign(e, {
			isAliasOf(t) {
				if (!(this instanceof cr) || !(t instanceof cr)) return !1;
				var n = this.$$.ptrType.registeredClass, i = this.$$.ptr;
				t.$$ = t.$$;
				for (var a = t.$$.ptrType.registeredClass, s = t.$$.ptr; n.baseClass;) i = n.upcast(i), n = n.baseClass;
				for (; a.baseClass;) s = a.upcast(s), a = a.baseClass;
				return n === a && i === s;
			},
			clone() {
				if (this.$$.ptr || Tr(this), this.$$.preservePointerOnDelete) return this.$$.count.value += 1, this;
				var t = rr(Object.create(Object.getPrototypeOf(this), { $$: { value: nt(this.$$) } }));
				return t.$$.count.value += 1, t.$$.deleteScheduled = !1, t;
			},
			delete() {
				this.$$.ptr || Tr(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && m$1("Object already scheduled for deletion"), Yr(this), Kr(this.$$), this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0, this.$$.ptr = void 0);
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
	function cr() {}
	var Rr = (e, r) => Object.defineProperty(r, "name", { value: e }), Jr = {}, Qr = (e, r, t) => {
		if (e[r].overloadTable === void 0) {
			var n = e[r];
			e[r] = function() {
				for (var i = arguments.length, a = new Array(i), s = 0; s < i; s++) a[s] = arguments[s];
				return e[r].overloadTable.hasOwnProperty(a.length) || m$1(`Function '${t}' called with an invalid number of arguments (${a.length}) - expects one of (${e[r].overloadTable})!`), e[r].overloadTable[a.length].apply(this, a);
			}, e[r].overloadTable = [], e[r].overloadTable[n.argCount] = n;
		}
	}, re = (e, r, t) => {
		l$1.hasOwnProperty(e) ? ((t === void 0 || l$1[e].overloadTable !== void 0 && l$1[e].overloadTable[t] !== void 0) && m$1(`Cannot register public name '${e}' twice`), Qr(l$1, e, e), l$1[e].overloadTable.hasOwnProperty(t) && m$1(`Cannot register multiple overloads of a function with the same number of arguments (${t})!`), l$1[e].overloadTable[t] = r) : (l$1[e] = r, l$1[e].argCount = t);
	}, ot = 48, st = 57, ut = (e) => {
		e = e.replace(/[^a-zA-Z0-9_]/g, "$");
		var r = e.charCodeAt(0);
		return r >= ot && r <= st ? `_${e}` : e;
	};
	function ft(e, r, t, n, i, a, s, o) {
		this.name = e, this.constructor = r, this.instancePrototype = t, this.rawDestructor = n, this.baseClass = i, this.getActualType = a, this.upcast = s, this.downcast = o, this.pureVirtualFunctions = [];
	}
	var Fr = (e, r, t) => {
		for (; r !== t;) r.upcast || m$1(`Expected null or instance of ${t.name}, got an instance of ${r.name}`), e = r.upcast(e), r = r.baseClass;
		return e;
	}, kr = (e) => {
		if (e === null) return "null";
		var r = typeof e;
		return r === "object" || r === "array" || r === "function" ? e.toString() : "" + e;
	};
	function lt(e, r) {
		if (r === null) return this.isReference && m$1(`null is not a valid ${this.name}`), 0;
		r.$$ || m$1(`Cannot pass "${kr(r)}" as a ${this.name}`), r.$$.ptr || m$1(`Cannot pass deleted object as a pointer of type ${this.name}`);
		var t = r.$$.ptrType.registeredClass, n = Fr(r.$$.ptr, t, this.registeredClass);
		return n;
	}
	function ct(e, r) {
		var t;
		if (r === null) return this.isReference && m$1(`null is not a valid ${this.name}`), this.isSmartPointer ? (t = this.rawConstructor(), e !== null && e.push(this.rawDestructor, t), t) : 0;
		(!r || !r.$$) && m$1(`Cannot pass "${kr(r)}" as a ${this.name}`), r.$$.ptr || m$1(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.isConst && r.$$.ptrType.isConst && m$1(`Cannot convert argument of type ${r.$$.smartPtrType ? r.$$.smartPtrType.name : r.$$.ptrType.name} to parameter type ${this.name}`);
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
					t = this.rawShare(t, W$1.toHandle(() => i.delete())), e !== null && e.push(this.rawDestructor, t);
				}
				break;
			default: m$1("Unsupporting sharing policy");
		}
		return t;
	}
	function vt(e, r) {
		if (r === null) return this.isReference && m$1(`null is not a valid ${this.name}`), 0;
		r.$$ || m$1(`Cannot pass "${kr(r)}" as a ${this.name}`), r.$$.ptr || m$1(`Cannot pass deleted object as a pointer of type ${this.name}`), r.$$.ptrType.isConst && m$1(`Cannot convert argument of type ${r.$$.ptrType.name} to parameter type ${this.name}`);
		var t = r.$$.ptrType.registeredClass, n = Fr(r.$$.ptr, t, this.registeredClass);
		return n;
	}
	var ee = (e, r, t) => {
		if (r === t) return e;
		if (t.baseClass === void 0) return null;
		var n = ee(e, r, t.baseClass);
		return n === null ? null : t.downcast(n);
	}, dt = {}, pt = (e, r) => {
		for (r === void 0 && m$1("ptr should not be undefined"); e.baseClass;) r = e.upcast(r), e = e.baseClass;
		return r;
	}, ht = (e, r) => (r = pt(e, r), dt[r]), vr = (e, r) => {
		(!r.ptrType || !r.ptr) && lr("makeClassHandle requires ptr and ptrType");
		var t = !!r.smartPtrType, n = !!r.smartPtr;
		return t !== n && lr("Both smartPtrType and smartPtr must be specified"), r.count = { value: 1 }, rr(Object.create(e, { $$: {
			value: r,
			writable: !0
		} }));
	};
	function _t(e) {
		var r = this.getPointee(e);
		if (!r) return this.destructor(e), null;
		var t = ht(this.registeredClass, r);
		if (t !== void 0) {
			if (t.$$.count.value === 0) return t.$$.ptr = r, t.$$.smartPtr = e, t.clone();
			var n = t.clone();
			return this.destructor(e), n;
		}
		function i() {
			return this.isSmartPointer ? vr(this.registeredClass.instancePrototype, {
				ptrType: this.pointeeType,
				ptr: r,
				smartPtrType: this,
				smartPtr: e
			}) : vr(this.registeredClass.instancePrototype, {
				ptrType: this,
				ptr: e
			});
		}
		var a = this.registeredClass.getActualType(r), s = Jr[a];
		if (!s) return i.call(this);
		var o;
		this.isConst ? o = s.constPointerType : o = s.pointerType;
		var u$1 = ee(r, this.registeredClass, o.registeredClass);
		return u$1 === null ? i.call(this) : this.isSmartPointer ? vr(o.registeredClass.instancePrototype, {
			ptrType: o,
			ptr: u$1,
			smartPtrType: this,
			smartPtr: e
		}) : vr(o.registeredClass.instancePrototype, {
			ptrType: o,
			ptr: u$1
		});
	}
	var gt = () => {
		Object.assign(dr.prototype, {
			getPointee(e) {
				return this.rawGetPointee && (e = this.rawGetPointee(e)), e;
			},
			destructor(e) {
				var r;
				(r = this.rawDestructor) === null || r === void 0 || r.call(this, e);
			},
			argPackAdvance: D$1,
			readValueFromPointer: J,
			fromWireType: _t
		});
	};
	function dr(e, r, t, n, i, a, s, o, u$1, f$1, c) {
		this.name = e, this.registeredClass = r, this.isReference = t, this.isConst = n, this.isSmartPointer = i, this.pointeeType = a, this.sharingPolicy = s, this.rawGetPointee = o, this.rawConstructor = u$1, this.rawShare = f$1, this.rawDestructor = c, !i && r.baseClass === void 0 ? n ? (this.toWireType = lt, this.destructorFunction = null) : (this.toWireType = vt, this.destructorFunction = null) : this.toWireType = ct;
	}
	var te = (e, r, t) => {
		l$1.hasOwnProperty(e) || lr("Replacing nonexistent public symbol"), l$1[e].overloadTable !== void 0 && t !== void 0 ? l$1[e].overloadTable[t] = r : (l$1[e] = r, l$1[e].argCount = t);
	}, ne = [], ie, _ = (e) => {
		var r = ne[e];
		return r || (ne[e] = r = ie.get(e)), r;
	}, yt = function(e, r) {
		let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
		if (e.includes("j")) return dynCallLegacy(e, r, t);
		var n = _(r), i = n(...t);
		function a(s) {
			return s;
		}
		return i;
	}, mt = function(e, r) {
		let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
		return function() {
			for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
			return yt(e, r, i, t);
		};
	}, S$1 = function(e, r) {
		e = A$1(e);
		function t() {
			if (e.includes("j")) return mt(e, r);
			var i = _(r);
			return i;
		}
		var n = t();
		return typeof n != "function" && m$1(`unknown function pointer with signature ${e}: ${r}`), n;
	};
	class $t extends Error {}
	var ae = (e) => {
		var r = bn(e), t = A$1(r);
		return N$1(r), t;
	}, pr = (e, r) => {
		var t = [], n = {};
		function i(a) {
			if (!n[a] && !V[a]) {
				if (fr[a]) {
					fr[a].forEach(i);
					return;
				}
				t.push(a), n[a] = !0;
			}
		}
		throw r.forEach(i), new $t(`${e}: ` + t.map(ae).join([", "]));
	}, bt = (e, r, t, n, i, a, s, o, u$1, f$1, c, v$1, g) => {
		c = A$1(c), a = S$1(i, a), o && (o = S$1(s, o)), f$1 && (f$1 = S$1(u$1, f$1)), g = S$1(v$1, g);
		var y$1 = ut(c);
		re(y$1, function() {
			pr(`Cannot construct ${c} due to unbound types`, [n]);
		}), H$1([
			e,
			r,
			t
		], n ? [n] : [], (w$1) => {
			w$1 = w$1[0];
			var P$1, C;
			n ? (P$1 = w$1.registeredClass, C = P$1.instancePrototype) : C = cr.prototype;
			var T$1 = Rr(c, function() {
				if (Object.getPrototypeOf(this) !== M$1) throw new Q(`Use 'new' to construct ${c}`);
				if (R$1.constructor_body === void 0) throw new Q(`${c} has no accessible constructor`);
				for (var ye = arguments.length, hr = new Array(ye), _r = 0; _r < ye; _r++) hr[_r] = arguments[_r];
				var me = R$1.constructor_body[hr.length];
				if (me === void 0) throw new Q(`Tried to invoke ctor of ${c} with invalid number of parameters (${hr.length}) - expected (${Object.keys(R$1.constructor_body).toString()}) parameters instead!`);
				return me.apply(this, hr);
			}), M$1 = Object.create(C, { constructor: { value: T$1 } });
			T$1.prototype = M$1;
			var R$1 = new ft(c, T$1, M$1, g, P$1, a, o, f$1);
			if (R$1.baseClass) {
				var k, tr;
				(tr = (k = R$1.baseClass).__derivedClasses) !== null && tr !== void 0 || (k.__derivedClasses = []), R$1.baseClass.__derivedClasses.push(R$1);
			}
			var di = new dr(c, R$1, !0, !1, !1), _e = new dr(c + "*", R$1, !1, !1, !1), ge = new dr(c + " const*", R$1, !1, !0, !1);
			return Jr[e] = {
				pointerType: _e,
				constPointerType: ge
			}, te(y$1, T$1), [
				di,
				_e,
				ge
			];
		});
	}, Er = (e, r) => {
		for (var t = [], n = 0; n < e; n++) t.push($[r + n * 4 >> 2]);
		return t;
	};
	function wt(e) {
		for (var r = 1; r < e.length; ++r) if (e[r] !== null && e[r].destructorFunction === void 0) return !0;
		return !1;
	}
	function Sr(e, r, t, n, i, a) {
		var s = r.length;
		s < 2 && m$1("argTypes array size mismatch! Must at least get return value and 'this' types!");
		var o = r[1] !== null && t !== null, u$1 = wt(r), f$1 = r[0].name !== "void", c = s - 2, v$1 = new Array(c), g = [], y$1 = [], w$1 = function() {
			y$1.length = 0;
			var P$1;
			g.length = o ? 2 : 1, g[0] = i, o && (P$1 = r[1].toWireType(y$1, this), g[1] = P$1);
			for (var C = 0; C < c; ++C) v$1[C] = r[C + 2].toWireType(y$1, C < 0 || arguments.length <= C ? void 0 : arguments[C]), g.push(v$1[C]);
			var T$1 = n(...g);
			function M$1(R$1) {
				if (u$1) Pr(y$1);
				else for (var k = o ? 1 : 2; k < r.length; k++) {
					var tr = k === 1 ? P$1 : v$1[k - 2];
					r[k].destructorFunction !== null && r[k].destructorFunction(tr);
				}
				if (f$1) return r[0].fromWireType(R$1);
			}
			return M$1(T$1);
		};
		return Rr(e, w$1);
	}
	var Ct = (e, r, t, n, i, a) => {
		var s = Er(r, t);
		i = S$1(n, i), H$1([], [e], (o) => {
			o = o[0];
			var u$1 = `constructor ${o.name}`;
			if (o.registeredClass.constructor_body === void 0 && (o.registeredClass.constructor_body = []), o.registeredClass.constructor_body[r - 1] !== void 0) throw new Q(`Cannot register multiple constructors with identical number of parameters (${r - 1}) for class '${o.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
			return o.registeredClass.constructor_body[r - 1] = () => {
				pr(`Cannot construct ${o.name} due to unbound types`, s);
			}, H$1([], s, (f$1) => (f$1.splice(1, 0, null), o.registeredClass.constructor_body[r - 1] = Sr(u$1, f$1, null, i, a), [])), [];
		});
	}, oe = (e) => {
		e = e.trim();
		const r = e.indexOf("(");
		return r === -1 ? e : e.slice(0, r);
	}, Pt = (e, r, t, n, i, a, s, o, u$1, f$1) => {
		var c = Er(t, n);
		r = A$1(r), r = oe(r), a = S$1(i, a), H$1([], [e], (v$1) => {
			v$1 = v$1[0];
			var g = `${v$1.name}.${r}`;
			r.startsWith("@@") && (r = Symbol[r.substring(2)]), o && v$1.registeredClass.pureVirtualFunctions.push(r);
			function y$1() {
				pr(`Cannot call ${g} due to unbound types`, c);
			}
			var w$1 = v$1.registeredClass.instancePrototype, P$1 = w$1[r];
			return P$1 === void 0 || P$1.overloadTable === void 0 && P$1.className !== v$1.name && P$1.argCount === t - 2 ? (y$1.argCount = t - 2, y$1.className = v$1.name, w$1[r] = y$1) : (Qr(w$1, r, g), w$1[r].overloadTable[t - 2] = y$1), H$1([], c, (C) => {
				var T$1 = Sr(g, C, v$1, a, s);
				return w$1[r].overloadTable === void 0 ? (T$1.argCount = t - 2, w$1[r] = T$1) : w$1[r].overloadTable[t - 2] = T$1, [];
			}), [];
		});
	}, se = [], B$1 = [
		0,
		1,
		,
		1,
		null,
		1,
		!0,
		1,
		!1,
		1
	], jr = (e) => {
		e > 9 && --B$1[e + 1] === 0 && (B$1[e] = void 0, se.push(e));
	}, W$1 = {
		toValue: (e) => (e || m$1(`Cannot use deleted val. handle = ${e}`), B$1[e]),
		toHandle: (e) => {
			switch (e) {
				case void 0: return 2;
				case null: return 4;
				case !0: return 6;
				case !1: return 8;
				default: {
					const r = se.pop() || B$1.length;
					return B$1[r] = e, B$1[r + 1] = 1, r;
				}
			}
		}
	}, ue = {
		name: "emscripten::val",
		fromWireType: (e) => {
			var r = W$1.toValue(e);
			return jr(e), r;
		},
		toWireType: (e, r) => W$1.toHandle(r),
		argPackAdvance: D$1,
		readValueFromPointer: J,
		destructorFunction: null
	}, Tt = (e) => j$1(e, ue), At = (e, r) => {
		switch (r) {
			case 4: return function(t) {
				return this.fromWireType(Nr[t >> 2]);
			};
			case 8: return function(t) {
				return this.fromWireType(Zr[t >> 3]);
			};
			default: throw new TypeError(`invalid float width (${r}): ${e}`);
		}
	}, Rt = (e, r, t) => {
		r = A$1(r), j$1(e, {
			name: r,
			fromWireType: (n) => n,
			toWireType: (n, i) => i,
			argPackAdvance: D$1,
			readValueFromPointer: At(r, t),
			destructorFunction: null
		});
	}, Ft = (e, r, t, n, i, a, s, o) => {
		var u$1 = Er(r, t);
		e = A$1(e), e = oe(e), i = S$1(n, i), re(e, function() {
			pr(`Cannot call ${e} due to unbound types`, u$1);
		}, r - 1), H$1([], u$1, (f$1) => {
			var c = [f$1[0], null].concat(f$1.slice(1));
			return te(e, Sr(e, c, null, i, a), r - 1), [];
		});
	}, kt = (e, r, t) => {
		switch (r) {
			case 1: return t ? (n) => I$1[n] : (n) => E$1[n];
			case 2: return t ? (n) => ir[n >> 1] : (n) => z[n >> 1];
			case 4: return t ? (n) => L$1[n >> 2] : (n) => $[n >> 2];
			default: throw new TypeError(`invalid integer width (${r}): ${e}`);
		}
	}, Et = (e, r, t, n, i) => {
		r = A$1(r);
		const a = n === 0;
		let s = (u$1) => u$1;
		if (a) {
			var o = 32 - 8 * t;
			s = (u$1) => u$1 << o >>> o, i = s(i);
		}
		j$1(e, {
			name: r,
			fromWireType: s,
			toWireType: (u$1, f$1) => f$1,
			argPackAdvance: D$1,
			readValueFromPointer: kt(r, t, n !== 0),
			destructorFunction: null
		});
	}, St = (e, r, t) => {
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
			return new i(I$1.buffer, u$1, o);
		}
		t = A$1(t), j$1(e, {
			name: t,
			fromWireType: a,
			argPackAdvance: D$1,
			readValueFromPointer: a
		}, { ignoreDuplicateRegistrations: !0 });
	}, jt = Object.assign({ optional: !0 }, ue), Ot = (e, r) => {
		j$1(e, jt);
	}, Dt = (e, r, t, n) => {
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
	}, q = (e, r, t) => Dt(e, E$1, r, t), fe = (e) => {
		for (var r = 0, t = 0; t < e.length; ++t) {
			var n = e.charCodeAt(t);
			n <= 127 ? r++ : n <= 2047 ? r += 2 : n >= 55296 && n <= 57343 ? (r += 4, ++t) : r += 3;
		}
		return r;
	}, le = typeof TextDecoder < "u" ? new TextDecoder() : void 0, ce = function(e) {
		let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : NaN;
		for (var n = r + t, i = r; e[i] && !(i >= n);) ++i;
		if (i - r > 16 && e.buffer && le) return le.decode(e.subarray(r, i));
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
	}, Wt = (e, r) => e ? ce(E$1, e, r) : "", Mt = (e, r) => {
		r = A$1(r), j$1(e, {
			name: r,
			fromWireType(t) {
				for (var n = $[t >> 2], i = t + 4, a, s, o = i, s = 0; s <= n; ++s) {
					var u$1 = i + s;
					if (s == n || E$1[u$1] == 0) {
						var f$1 = u$1 - o, c = Wt(o, f$1);
						a === void 0 ? a = c : (a += "\0", a += c), o = u$1 + 1;
					}
				}
				return N$1(t), a;
			},
			toWireType(t, n) {
				n instanceof ArrayBuffer && (n = new Uint8Array(n));
				var i, a = typeof n == "string";
				a || ArrayBuffer.isView(n) && n.BYTES_PER_ELEMENT == 1 || m$1("Cannot pass non-string to std::string"), a ? i = fe(n) : i = n.length;
				var s = he(4 + i + 1), o = s + 4;
				return $[s >> 2] = i, a ? q(n, o, i + 1) : E$1.set(n, o), t !== null && t.push(N$1, s), s;
			},
			argPackAdvance: D$1,
			readValueFromPointer: J,
			destructorFunction(t) {
				N$1(t);
			}
		});
	}, ve = typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0, xt = (e, r) => {
		for (var t = e >> 1, n = t + r / 2, i = t; !(i >= n) && z[i];) ++i;
		if (i - t > 16 && ve) return ve.decode(z.subarray(t, i));
		for (var a = "", s = t; !(s >= n); ++s) {
			var o = z[s];
			if (o == 0) break;
			a += String.fromCharCode(o);
		}
		return a;
	}, It = (e, r, t) => {
		if (t ??= 2147483647, t < 2) return 0;
		t -= 2;
		for (var n = r, i = t < e.length * 2 ? t / 2 : e.length, a = 0; a < i; ++a) {
			var s = e.charCodeAt(a);
			ir[r >> 1] = s, r += 2;
		}
		return ir[r >> 1] = 0, r - n;
	}, Ut = (e) => e.length * 2, Vt = (e, r) => {
		for (var t = 0, n = ""; !(t >= r / 4);) {
			var i = L$1[e + t * 4 >> 2];
			if (i == 0) break;
			if (++t, i >= 65536) {
				var a = i - 65536;
				n += String.fromCharCode(55296 | a >> 10, 56320 | a & 1023);
			} else n += String.fromCharCode(i);
		}
		return n;
	}, Ht = (e, r, t) => {
		if (t ??= 2147483647, t < 4) return 0;
		for (var n = r, i = n + t - 4, a = 0; a < e.length; ++a) {
			var s = e.charCodeAt(a);
			if (s >= 55296 && s <= 57343) {
				var o = e.charCodeAt(++a);
				s = 65536 + ((s & 1023) << 10) | o & 1023;
			}
			if (L$1[r >> 2] = s, r += 4, r + 4 > i) break;
		}
		return L$1[r >> 2] = 0, r - n;
	}, Bt = (e) => {
		for (var r = 0, t = 0; t < e.length; ++t) {
			var n = e.charCodeAt(t);
			n >= 55296 && n <= 57343 && ++t, r += 4;
		}
		return r;
	}, Nt = (e, r, t) => {
		t = A$1(t);
		var n, i, a, s;
		r === 2 ? (n = xt, i = It, s = Ut, a = (o) => z[o >> 1]) : r === 4 && (n = Vt, i = Ht, s = Bt, a = (o) => $[o >> 2]), j$1(e, {
			name: t,
			fromWireType: (o) => {
				for (var u$1 = $[o >> 2], f$1, c = o + 4, v$1 = 0; v$1 <= u$1; ++v$1) {
					var g = o + 4 + v$1 * r;
					if (v$1 == u$1 || a(g) == 0) {
						var y$1 = g - c, w$1 = n(c, y$1);
						f$1 === void 0 ? f$1 = w$1 : (f$1 += "\0", f$1 += w$1), c = g + r;
					}
				}
				return N$1(o), f$1;
			},
			toWireType: (o, u$1) => {
				typeof u$1 != "string" && m$1(`Cannot pass non-string to C++ string type ${t}`);
				var f$1 = s(u$1), c = he(4 + f$1 + r);
				return $[c >> 2] = f$1 / r, i(u$1, c + 4, f$1 + r), o !== null && o.push(N$1, c), c;
			},
			argPackAdvance: D$1,
			readValueFromPointer: J,
			destructorFunction(o) {
				N$1(o);
			}
		});
	}, Zt = (e, r, t, n, i, a) => {
		ur[e] = {
			name: A$1(r),
			rawConstructor: S$1(t, n),
			rawDestructor: S$1(i, a),
			fields: []
		};
	}, zt = (e, r, t, n, i, a, s, o, u$1, f$1) => {
		ur[e].fields.push({
			fieldName: A$1(r),
			getterReturnType: t,
			getter: S$1(n, i),
			getterContext: a,
			setterArgumentType: s,
			setter: S$1(o, u$1),
			setterContext: f$1
		});
	}, Lt = (e, r) => {
		r = A$1(r), j$1(e, {
			isVoid: !0,
			name: r,
			argPackAdvance: 0,
			fromWireType: () => {},
			toWireType: (t, n) => {}
		});
	}, Or = [], Gt = (e, r, t, n) => (e = Or[e], r = W$1.toValue(r), e(null, r, t, n)), Xt = {}, qt = (e) => {
		var r = Xt[e];
		return r === void 0 ? A$1(e) : r;
	}, de = () => {
		if (typeof globalThis == "object") return globalThis;
		function e(r) {
			r.$$$embind_global$$$ = r;
			var t = typeof $$$embind_global$$$ == "object" && r.$$$embind_global$$$ == r;
			return t || delete r.$$$embind_global$$$, t;
		}
		if (typeof $$$embind_global$$$ == "object" || (typeof global == "object" && e(global) ? $$$embind_global$$$ = global : typeof self == "object" && e(self) && ($$$embind_global$$$ = self), typeof $$$embind_global$$$ == "object")) return $$$embind_global$$$;
		throw Error("unable to get global object.");
	}, Yt = (e) => e === 0 ? W$1.toHandle(de()) : (e = qt(e), W$1.toHandle(de()[e])), Kt = (e) => {
		var r = Or.length;
		return Or.push(e), r;
	}, pe = (e, r) => {
		var t = V[e];
		return t === void 0 && m$1(`${r} has unknown type ${ae(e)}`), t;
	}, Jt = (e, r) => {
		for (var t = new Array(e), n = 0; n < e; ++n) t[n] = pe($[r + n * 4 >> 2], `parameter ${n}`);
		return t;
	}, Qt = (e, r, t) => {
		var n = [], i = e.toWireType(n, t);
		return n.length && ($[r >> 2] = W$1.toHandle(n)), i;
	}, rn = Reflect.construct, en = (e, r, t) => {
		var n = Jt(e, r), i = n.shift();
		e--;
		var a = new Array(e), s = (u$1, f$1, c, v$1) => {
			for (var g = 0, y$1 = 0; y$1 < e; ++y$1) a[y$1] = n[y$1].readValueFromPointer(v$1 + g), g += n[y$1].argPackAdvance;
			var w$1 = t === 1 ? rn(f$1, a) : f$1.apply(u$1, a);
			return Qt(i, c, w$1);
		}, o = `methodCaller<(${n.map((u$1) => u$1.name).join(", ")}) => ${i.name}>`;
		return Kt(Rr(o, s));
	}, tn = (e) => {
		e > 9 && (B$1[e + 1] += 1);
	}, nn = (e) => {
		var r = W$1.toValue(e);
		Pr(r), jr(e);
	}, an = (e, r) => {
		e = pe(e, "_emval_take_value");
		var t = e.readValueFromPointer(r);
		return W$1.toHandle(t);
	}, on = (e, r, t, n) => {
		var i = (/* @__PURE__ */ new Date()).getFullYear(), a = new Date(i, 0, 1), s = new Date(i, 6, 1), o = a.getTimezoneOffset(), u$1 = s.getTimezoneOffset(), f$1 = Math.max(o, u$1);
		$[e >> 2] = f$1 * 60, L$1[r >> 2] = +(o != u$1);
		var c = (y$1) => {
			var w$1 = y$1 >= 0 ? "-" : "+", P$1 = Math.abs(y$1), C = String(Math.floor(P$1 / 60)).padStart(2, "0"), T$1 = String(P$1 % 60).padStart(2, "0");
			return `UTC${w$1}${C}${T$1}`;
		}, v$1 = c(o), g = c(u$1);
		u$1 < o ? (q(v$1, t, 17), q(g, n, 17)) : (q(v$1, n, 17), q(g, t, 17));
	}, sn = () => 2147483648, un = (e, r) => Math.ceil(e / r) * r, fn = (e) => {
		var r = nr.buffer, t = (e - r.byteLength + 65535) / 65536 | 0;
		try {
			return nr.grow(t), zr(), 1;
		} catch {}
	}, ln = (e) => {
		var r = E$1.length;
		e >>>= 0;
		var t = sn();
		if (e > t) return !1;
		for (var n = 1; n <= 4; n *= 2) {
			var i = r * (1 + .2 / n);
			i = Math.min(i, e + 100663296);
			var a = Math.min(t, un(Math.max(e, i), 65536)), s = fn(a);
			if (s) return !0;
		}
		return !1;
	}, Dr = {}, cn = () => Ur || "./this.program", er = () => {
		if (!er.strings) {
			var e = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", r = {
				USER: "web_user",
				LOGNAME: "web_user",
				PATH: "/",
				PWD: "/",
				HOME: "/home/web_user",
				LANG: e,
				_: cn()
			};
			for (var t in Dr) Dr[t] === void 0 ? delete r[t] : r[t] = Dr[t];
			var n = [];
			for (var t in r) n.push(`${t}=${r[t]}`);
			er.strings = n;
		}
		return er.strings;
	}, vn = (e, r) => {
		var t = 0, n = 0;
		for (var i of er()) {
			var a = r + t;
			$[e + n >> 2] = a, t += q(i, a, Infinity) + 1, n += 4;
		}
		return 0;
	}, dn = (e, r) => {
		var t = er();
		$[e >> 2] = t.length;
		var n = 0;
		for (var i of t) n += fe(i) + 1;
		return $[r >> 2] = n, 0;
	}, pn = (e) => 52;
	function hn(e, r, t, n, i) {
		return 70;
	}
	var _n = [
		null,
		[],
		[]
	], gn = (e, r) => {
		var t = _n[e];
		r === 0 || r === 10 ? ((e === 1 ? Hr : Z$1)(ce(t)), t.length = 0) : t.push(r);
	}, yn = (e, r, t, n) => {
		for (var i = 0, a = 0; a < t; a++) {
			var s = $[r >> 2], o = $[r + 4 >> 2];
			r += 8;
			for (var u$1 = 0; u$1 < o; u$1++) gn(e, E$1[s + u$1]);
			i += o;
		}
		return $[n >> 2] = i, 0;
	}, mn = (e) => e;
	rt(), at(), gt(), l$1.noExitRuntime && l$1.noExitRuntime, l$1.print && (Hr = l$1.print), l$1.printErr && (Z$1 = l$1.printErr), l$1.wasmBinary && (Y = l$1.wasmBinary), l$1.arguments && l$1.arguments, l$1.thisProgram && (Ur = l$1.thisProgram);
	var $n = {
		s: He,
		w: Be,
		a: Ne,
		j: Ze,
		m: ze,
		P: Le,
		p: Ge,
		ga: Xe,
		d: qe,
		ba: Ye,
		ua: Je,
		aa: Qe,
		pa: tt,
		sa: bt,
		ra: Ct,
		H: Pt,
		na: Tt,
		V: Rt,
		W: Ft,
		x: Et,
		t: St,
		ta: Ot,
		oa: Mt,
		Q: Nt,
		I: Zt,
		va: zt,
		qa: Lt,
		da: Gt,
		wa: jr,
		D: Yt,
		ma: en,
		X: tn,
		Y: nn,
		U: an,
		ca: on,
		ha: ln,
		ea: vn,
		fa: dn,
		ia: pn,
		_: hn,
		S: yn,
		K: ri,
		C: ti,
		M: On,
		R: ui,
		q: Yn,
		b: Mn,
		E: Qn,
		ka: ii,
		c: xn,
		ja: ai,
		h: jn,
		i: Hn,
		r: zn,
		O: Jn,
		v: Gn,
		F: qn,
		L: Kn,
		z: ni,
		J: fi,
		$: li,
		Z: ci,
		k: In,
		f: Sn,
		e: Wn,
		g: Dn,
		N: si,
		l: Vn,
		la: ei,
		o: Ln,
		B: Bn,
		u: Xn,
		T: Zn,
		A: oi,
		n: Un,
		G: Nn,
		y: mn
	}, b$1 = await Ie();
	b$1.ya;
	var bn = b$1.za, N$1 = l$1._free = b$1.Aa, he = l$1._malloc = b$1.Ca, wn = b$1.Da, d = b$1.Ea, Cn = b$1.Fa, Pn = b$1.Ga, Tn = b$1.Ha, An = b$1.Ia, Rn = b$1.Ja, Fn = b$1.Ka;
	l$1.dynCall_viijii = b$1.La;
	var kn = l$1.dynCall_iiijj = b$1.Ma;
	l$1.dynCall_jiji = b$1.Na;
	var En = l$1.dynCall_jiiii = b$1.Oa;
	l$1.dynCall_iiiiij = b$1.Pa, l$1.dynCall_iiiiijj = b$1.Qa, l$1.dynCall_iiiiiijj = b$1.Ra;
	function Sn(e, r) {
		var t = h$1();
		try {
			_(e)(r);
		} catch (n) {
			if (p$1(t), n !== n + 0) throw n;
			d(1, 0);
		}
	}
	function jn(e, r, t, n) {
		var i = h$1();
		try {
			return _(e)(r, t, n);
		} catch (a) {
			if (p$1(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function On(e, r, t, n, i) {
		var a = h$1();
		try {
			return _(e)(r, t, n, i);
		} catch (s) {
			if (p$1(a), s !== s + 0) throw s;
			d(1, 0);
		}
	}
	function Dn(e, r, t, n) {
		var i = h$1();
		try {
			_(e)(r, t, n);
		} catch (a) {
			if (p$1(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function Wn(e, r, t) {
		var n = h$1();
		try {
			_(e)(r, t);
		} catch (i) {
			if (p$1(n), i !== i + 0) throw i;
			d(1, 0);
		}
	}
	function Mn(e, r) {
		var t = h$1();
		try {
			return _(e)(r);
		} catch (n) {
			if (p$1(t), n !== n + 0) throw n;
			d(1, 0);
		}
	}
	function xn(e, r, t) {
		var n = h$1();
		try {
			return _(e)(r, t);
		} catch (i) {
			if (p$1(n), i !== i + 0) throw i;
			d(1, 0);
		}
	}
	function In(e) {
		var r = h$1();
		try {
			_(e)();
		} catch (t) {
			if (p$1(r), t !== t + 0) throw t;
			d(1, 0);
		}
	}
	function Un(e, r, t, n, i, a, s, o, u$1, f$1, c) {
		var v$1 = h$1();
		try {
			_(e)(r, t, n, i, a, s, o, u$1, f$1, c);
		} catch (g) {
			if (p$1(v$1), g !== g + 0) throw g;
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
	function Hn(e, r, t, n, i) {
		var a = h$1();
		try {
			return _(e)(r, t, n, i);
		} catch (s) {
			if (p$1(a), s !== s + 0) throw s;
			d(1, 0);
		}
	}
	function Bn(e, r, t, n, i, a, s) {
		var o = h$1();
		try {
			_(e)(r, t, n, i, a, s);
		} catch (u$1) {
			if (p$1(o), u$1 !== u$1 + 0) throw u$1;
			d(1, 0);
		}
	}
	function Nn(e, r, t, n, i, a, s, o, u$1, f$1, c, v$1, g, y$1, w$1, P$1) {
		var C = h$1();
		try {
			_(e)(r, t, n, i, a, s, o, u$1, f$1, c, v$1, g, y$1, w$1, P$1);
		} catch (T$1) {
			if (p$1(C), T$1 !== T$1 + 0) throw T$1;
			d(1, 0);
		}
	}
	function Zn(e, r, t, n, i, a, s, o, u$1) {
		var f$1 = h$1();
		try {
			_(e)(r, t, n, i, a, s, o, u$1);
		} catch (c) {
			if (p$1(f$1), c !== c + 0) throw c;
			d(1, 0);
		}
	}
	function zn(e, r, t, n, i, a) {
		var s = h$1();
		try {
			return _(e)(r, t, n, i, a);
		} catch (o) {
			if (p$1(s), o !== o + 0) throw o;
			d(1, 0);
		}
	}
	function Ln(e, r, t, n, i, a) {
		var s = h$1();
		try {
			_(e)(r, t, n, i, a);
		} catch (o) {
			if (p$1(s), o !== o + 0) throw o;
			d(1, 0);
		}
	}
	function Gn(e, r, t, n, i, a, s) {
		var o = h$1();
		try {
			return _(e)(r, t, n, i, a, s);
		} catch (u$1) {
			if (p$1(o), u$1 !== u$1 + 0) throw u$1;
			d(1, 0);
		}
	}
	function Xn(e, r, t, n, i, a, s, o) {
		var u$1 = h$1();
		try {
			_(e)(r, t, n, i, a, s, o);
		} catch (f$1) {
			if (p$1(u$1), f$1 !== f$1 + 0) throw f$1;
			d(1, 0);
		}
	}
	function qn(e, r, t, n, i, a, s, o) {
		var u$1 = h$1();
		try {
			return _(e)(r, t, n, i, a, s, o);
		} catch (f$1) {
			if (p$1(u$1), f$1 !== f$1 + 0) throw f$1;
			d(1, 0);
		}
	}
	function Yn(e) {
		var r = h$1();
		try {
			return _(e)();
		} catch (t) {
			if (p$1(r), t !== t + 0) throw t;
			d(1, 0);
		}
	}
	function Kn(e, r, t, n, i, a, s, o, u$1) {
		var f$1 = h$1();
		try {
			return _(e)(r, t, n, i, a, s, o, u$1);
		} catch (c) {
			if (p$1(f$1), c !== c + 0) throw c;
			d(1, 0);
		}
	}
	function Jn(e, r, t, n, i, a, s) {
		var o = h$1();
		try {
			return _(e)(r, t, n, i, a, s);
		} catch (u$1) {
			if (p$1(o), u$1 !== u$1 + 0) throw u$1;
			d(1, 0);
		}
	}
	function Qn(e, r, t, n) {
		var i = h$1();
		try {
			return _(e)(r, t, n);
		} catch (a) {
			if (p$1(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function ri(e, r, t, n) {
		var i = h$1();
		try {
			return _(e)(r, t, n);
		} catch (a) {
			if (p$1(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function ei(e, r, t, n, i, a, s, o) {
		var u$1 = h$1();
		try {
			_(e)(r, t, n, i, a, s, o);
		} catch (f$1) {
			if (p$1(u$1), f$1 !== f$1 + 0) throw f$1;
			d(1, 0);
		}
	}
	function ti(e, r, t, n, i, a) {
		var s = h$1();
		try {
			return _(e)(r, t, n, i, a);
		} catch (o) {
			if (p$1(s), o !== o + 0) throw o;
			d(1, 0);
		}
	}
	function ni(e, r, t, n, i, a, s, o, u$1, f$1) {
		var c = h$1();
		try {
			return _(e)(r, t, n, i, a, s, o, u$1, f$1);
		} catch (v$1) {
			if (p$1(c), v$1 !== v$1 + 0) throw v$1;
			d(1, 0);
		}
	}
	function ii(e, r, t) {
		var n = h$1();
		try {
			return _(e)(r, t);
		} catch (i) {
			if (p$1(n), i !== i + 0) throw i;
			d(1, 0);
		}
	}
	function ai(e, r, t, n, i) {
		var a = h$1();
		try {
			return _(e)(r, t, n, i);
		} catch (s) {
			if (p$1(a), s !== s + 0) throw s;
			d(1, 0);
		}
	}
	function oi(e, r, t, n, i, a, s, o, u$1, f$1) {
		var c = h$1();
		try {
			_(e)(r, t, n, i, a, s, o, u$1, f$1);
		} catch (v$1) {
			if (p$1(c), v$1 !== v$1 + 0) throw v$1;
			d(1, 0);
		}
	}
	function si(e, r, t, n, i, a, s) {
		var o = h$1();
		try {
			_(e)(r, t, n, i, a, s);
		} catch (u$1) {
			if (p$1(o), u$1 !== u$1 + 0) throw u$1;
			d(1, 0);
		}
	}
	function ui(e, r, t, n) {
		var i = h$1();
		try {
			return _(e)(r, t, n);
		} catch (a) {
			if (p$1(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function fi(e, r, t, n, i, a, s, o, u$1, f$1, c, v$1) {
		var g = h$1();
		try {
			return _(e)(r, t, n, i, a, s, o, u$1, f$1, c, v$1);
		} catch (y$1) {
			if (p$1(g), y$1 !== y$1 + 0) throw y$1;
			d(1, 0);
		}
	}
	function li(e, r, t, n, i, a, s) {
		var o = h$1();
		try {
			return kn(e, r, t, n, i, a, s);
		} catch (u$1) {
			if (p$1(o), u$1 !== u$1 + 0) throw u$1;
			d(1, 0);
		}
	}
	function ci(e, r, t, n, i) {
		var a = h$1();
		try {
			return En(e, r, t, n, i);
		} catch (s) {
			if (p$1(a), s !== s + 0) throw s;
			d(1, 0);
		}
	}
	function Wr() {
		if (U$1 > 0) {
			K = Wr;
			return;
		}
		if (Re(), U$1 > 0) {
			K = Wr;
			return;
		}
		function e() {
			var r;
			l$1.calledRun = !0, !Br && (Fe(), xr(l$1), (r = l$1.onRuntimeInitialized) === null || r === void 0 || r.call(l$1), ke());
		}
		l$1.setStatus ? (l$1.setStatus("Running..."), setTimeout(() => {
			setTimeout(() => l$1.setStatus(""), 1), e();
		}, 1)) : e();
	}
	function vi() {
		if (l$1.preInit) for (typeof l$1.preInit == "function" && (l$1.preInit = [l$1.preInit]); l$1.preInit.length > 0;) l$1.preInit.shift()();
	}
	return vi(), Wr(), x$1 = we, x$1;
};
function $e(F$1) {
	return S(Mr, F$1);
}
async function be(F$1, x$1) {
	return Z(Mr, F$1, x$1);
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
async function applyVideoTorch(video, torch) {
	const track = video.srcObject.getVideoTracks()[0];
	const constraints = { advanced: [{ torch }] };
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
	const imageDataReadResults = await be(imageData, readerOptions);
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
			$e({ overrides: { locateFile: (path, prefix) => {
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
			this.zoom = _zoom;
			applyVideoZoom(this.videoNode, _zoom);
			return;
		}
		this.zoom = _zoom;
	}
	toggleTorch(bool) {
		applyVideoTorch(this.videoNode, bool);
	}
};

//#endregion
export { NanoScan as default };
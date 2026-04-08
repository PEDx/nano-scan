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
	return O[31 - Math.clz32(e)];
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
}, W = { locateFile: (e, t) => {
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
({ ...u }), [...u.formats];
({ ...h });
//#endregion
//#region node_modules/zxing-wasm/dist/es/reader/index.js
var Mr = async function(F = {}) {
	var x, gr, l = F, xr, yr, we = new Promise((e, r) => {
		xr = e, yr = r;
	}), Ce = typeof window == "object", Pe = typeof Bun < "u", Ir = typeof WorkerGlobalScope < "u";
	typeof process == "object" && !((gr = process.versions) === null || gr === void 0) && gr.node && process.type;
	var Ur = "./this.program", Te, mr = "";
	function Ae(e) {
		return l.locateFile ? l.locateFile(e, mr) : mr + e;
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
	var Hr = console.log.bind(console), Z = console.error.bind(console), Y, nr, Br = !1, I, E, ir, z, L, $, Nr, Zr;
	function zr() {
		var e = nr.buffer;
		I = new Int8Array(e), ir = new Int16Array(e), l.HEAPU8 = E = new Uint8Array(e), z = new Uint16Array(e), L = new Int32Array(e), $ = new Uint32Array(e), Nr = new Float32Array(e), Zr = new Float64Array(e);
	}
	function Re() {
		if (l.preRun) for (typeof l.preRun == "function" && (l.preRun = [l.preRun]); l.preRun.length;) Ve(l.preRun.shift());
		Lr(Xr);
	}
	function Fe() {
		b.ya();
	}
	function ke() {
		if (l.postRun) for (typeof l.postRun == "function" && (l.postRun = [l.postRun]); l.postRun.length;) Ue(l.postRun.shift());
		Lr(Gr);
	}
	var U = 0, K = null;
	function Ee(e) {
		var r;
		U++, (r = l.monitorRunDependencies) === null || r === void 0 || r.call(l, U);
	}
	function Se(e) {
		var r;
		if (U--, (r = l.monitorRunDependencies) === null || r === void 0 || r.call(l, U), U == 0 && K) {
			var t = K;
			K = null, t();
		}
	}
	function br(e) {
		var r;
		(r = l.onAbort) === null || r === void 0 || r.call(l, e), e = "Aborted(" + e + ")", Z(e), Br = !0, e += ". Build with -sASSERTIONS for more info.";
		var t = new WebAssembly.RuntimeError(e);
		throw yr(t), t;
	}
	var G;
	function je() {
		return Ae("zxing_reader.wasm");
	}
	function Oe(e) {
		if (e == G && Y) return new Uint8Array(Y);
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
			var t = await De(e);
			return await WebAssembly.instantiate(t, r);
		} catch (i) {
			Z(`failed to asynchronously prepare wasm: ${i}`), br(i);
		}
	}
	async function Me(e, r, t) {
		if (!e && typeof WebAssembly.instantiateStreaming == "function") try {
			var n = fetch(r, { credentials: "same-origin" });
			return await WebAssembly.instantiateStreaming(n, t);
		} catch (a) {
			Z(`wasm streaming compile failed: ${a}`), Z("falling back to ArrayBuffer instantiation");
		}
		return We(r, t);
	}
	function xe() {
		return { a: $n };
	}
	async function Ie() {
		function e(a, s) {
			return b = a.exports, nr = b.xa, zr(), ie = b.Ba, Se(), b;
		}
		Ee();
		function r(a) {
			return e(a.instance);
		}
		var t = xe();
		if (l.instantiateWasm) return new Promise((a, s) => {
			l.instantiateWasm(t, (o, u) => {
				a(e(o));
			});
		});
		G ??= je();
		try {
			return r(await Me(Y, G, t));
		} catch (a) {
			return yr(a), Promise.reject(a);
		}
	}
	var Lr = (e) => {
		for (; e.length > 0;) e.shift()(l);
	}, Gr = [], Ue = (e) => Gr.push(e), Xr = [], Ve = (e) => Xr.push(e), p = (e) => Pn(e), h = () => Tn(), ar = [], or = 0, He = (e) => {
		var r = new wr(e);
		return r.get_caught() || (r.set_caught(!0), or--), r.set_rethrown(!1), ar.push(r), Rn(e), wn(e);
	}, O = 0, Be = () => {
		d(0, 0);
		An(ar.pop().excPtr), O = 0;
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
			r = r ? 1 : 0, I[this.ptr + 12] = r;
		}
		get_caught() {
			return I[this.ptr + 12] != 0;
		}
		set_rethrown(r) {
			r = r ? 1 : 0, I[this.ptr + 13] = r;
		}
		get_rethrown() {
			return I[this.ptr + 13] != 0;
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
		var r = O;
		if (!r) return sr(0), 0;
		var t = new wr(r);
		t.set_adjusted_ptr(r);
		var n = t.get_type();
		if (!n) return sr(0), r;
		for (var i of e) {
			if (i === 0 || i === n) break;
			if (Fn(i, n, t.ptr + 16)) return sr(i), r;
		}
		return sr(n), r;
	}, Ne = () => Cr([]), Ze = (e) => Cr([e]), ze = (e, r) => Cr([e, r]), Le = () => {
		var e = ar.pop();
		e || br("no exception to throw");
		var r = e.excPtr;
		throw e.get_rethrown() || (ar.push(e), e.set_rethrown(!0), e.set_caught(!1), or++), O = r, O;
	}, Ge = (e, r, t) => {
		throw new wr(e).init(r, t), O = e, or++, O;
	}, Xe = () => or, qe = (e) => {
		throw O || (O = e), O;
	}, Ye = () => br(""), ur = {}, Pr = (e) => {
		for (; e.length;) {
			var r = e.pop();
			e.pop()(r);
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
	}, H = (e, r, t) => {
		e.forEach((o) => fr[o] = r);
		function n(o) {
			var u = t(o);
			u.length !== e.length && lr("Mismatched type converter count");
			for (var f = 0; f < e.length; ++f) j(e[f], u[f]);
		}
		var i = new Array(r.length), a = [], s = 0;
		r.forEach((o, u) => {
			V.hasOwnProperty(o) ? i[u] = V[o] : (a.push(o), X.hasOwnProperty(o) || (X[o] = []), X[o].push(() => {
				i[u] = V[o], ++s, s === a.length && n(i);
			}));
		}), a.length === 0 && n(i);
	}, Je = (e) => {
		var r = ur[e];
		delete ur[e];
		var t = r.rawConstructor, n = r.rawDestructor, i = r.fields, a = i.map((s) => s.getterReturnType).concat(i.map((s) => s.setterArgumentType));
		H([e], a, (s) => {
			var o = {};
			return i.forEach((u, f) => {
				var c = u.fieldName, v = s[f], g = s[f].optional, y = u.getter, w = u.getterContext, P = s[f + i.length], C = u.setter, T = u.setterContext;
				o[c] = {
					read: (M) => v.fromWireType(y(w, M)),
					write: (M, R) => {
						var k = [];
						C(T, M, P.toWireType(k, R)), Pr(k);
					},
					optional: g
				};
			}), [{
				name: r.name,
				fromWireType: (u) => {
					var f = {};
					for (var c in o) f[c] = o[c].read(u);
					return n(u), f;
				},
				toWireType: (u, f) => {
					for (var c in o) if (!(c in f) && !o[c].optional) throw new TypeError(`Missing field: "${c}"`);
					var v = t();
					for (c in o) o[c].write(v, f[c]);
					return u !== null && u.push(n, v), v;
				},
				argPackAdvance: D,
				readValueFromPointer: J,
				destructorFunction: n
			}];
		});
	}, Qe = (e, r, t, n, i) => {}, rt = () => {
		for (var e = new Array(256), r = 0; r < 256; ++r) e[r] = String.fromCharCode(r);
		qr = e;
	}, qr, A = (e) => {
		for (var r = "", t = e; E[t];) r += qr[E[t++]];
		return r;
	}, Q = class extends Error {
		constructor(r) {
			super(r), this.name = "BindingError";
		}
	}, m = (e) => {
		throw new Q(e);
	};
	function et(e, r) {
		let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
		var n = r.name;
		if (e || m(`type "${n}" must have a positive integer typeid pointer`), V.hasOwnProperty(e)) {
			if (t.ignoreDuplicateRegistrations) return;
			m(`Cannot register type '${n}' twice`);
		}
		if (V[e] = r, delete fr[e], X.hasOwnProperty(e)) {
			var i = X[e];
			delete X[e], i.forEach((a) => a());
		}
	}
	function j(e, r) {
		return et(e, r, arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {});
	}
	var D = 8, tt = (e, r, t, n) => {
		r = A(r), j(e, {
			name: r,
			fromWireType: function(i) {
				return !!i;
			},
			toWireType: function(i, a) {
				return a ? t : n;
			},
			argPackAdvance: D,
			readValueFromPointer: function(i) {
				return this.fromWireType(E[i]);
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
		m(r(e) + " instance already deleted");
	}, Ar = !1, Yr = (e) => {}, it = (e) => {
		e.smartPtr ? e.smartPtrType.rawDestructor(e.smartPtr) : e.ptrType.registeredClass.rawDestructor(e.ptr);
	}, Kr = (e) => {
		e.count.value -= 1;
		e.count.value === 0 && it(e);
	}, rr = (e) => typeof FinalizationRegistry > "u" ? (rr = (r) => r, e) : (Ar = new FinalizationRegistry((r) => {
		Kr(r.$$);
	}), rr = (r) => {
		var t = r.$$;
		if (!!t.smartPtr) {
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
				this.$$.ptr || Tr(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && m("Object already scheduled for deletion"), Yr(this), Kr(this.$$), this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0, this.$$.ptr = void 0);
			},
			isDeleted() {
				return !this.$$.ptr;
			},
			deleteLater() {
				return this.$$.ptr || Tr(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && m("Object already scheduled for deletion"), this.$$.deleteScheduled = !0, this;
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
				return e[r].overloadTable.hasOwnProperty(a.length) || m(`Function '${t}' called with an invalid number of arguments (${a.length}) - expects one of (${e[r].overloadTable})!`), e[r].overloadTable[a.length].apply(this, a);
			}, e[r].overloadTable = [], e[r].overloadTable[n.argCount] = n;
		}
	}, re = (e, r, t) => {
		l.hasOwnProperty(e) ? ((t === void 0 || l[e].overloadTable !== void 0 && l[e].overloadTable[t] !== void 0) && m(`Cannot register public name '${e}' twice`), Qr(l, e, e), l[e].overloadTable.hasOwnProperty(t) && m(`Cannot register multiple overloads of a function with the same number of arguments (${t})!`), l[e].overloadTable[t] = r) : (l[e] = r, l[e].argCount = t);
	}, ot = 48, st = 57, ut = (e) => {
		e = e.replace(/[^a-zA-Z0-9_]/g, "$");
		var r = e.charCodeAt(0);
		return r >= ot && r <= st ? `_${e}` : e;
	};
	function ft(e, r, t, n, i, a, s, o) {
		this.name = e, this.constructor = r, this.instancePrototype = t, this.rawDestructor = n, this.baseClass = i, this.getActualType = a, this.upcast = s, this.downcast = o, this.pureVirtualFunctions = [];
	}
	var Fr = (e, r, t) => {
		for (; r !== t;) r.upcast || m(`Expected null or instance of ${t.name}, got an instance of ${r.name}`), e = r.upcast(e), r = r.baseClass;
		return e;
	}, kr = (e) => {
		if (e === null) return "null";
		var r = typeof e;
		return r === "object" || r === "array" || r === "function" ? e.toString() : "" + e;
	};
	function lt(e, r) {
		if (r === null) return this.isReference && m(`null is not a valid ${this.name}`), 0;
		r.$$ || m(`Cannot pass "${kr(r)}" as a ${this.name}`), r.$$.ptr || m(`Cannot pass deleted object as a pointer of type ${this.name}`);
		var t = r.$$.ptrType.registeredClass;
		return Fr(r.$$.ptr, t, this.registeredClass);
	}
	function ct(e, r) {
		var t;
		if (r === null) return this.isReference && m(`null is not a valid ${this.name}`), this.isSmartPointer ? (t = this.rawConstructor(), e !== null && e.push(this.rawDestructor, t), t) : 0;
		(!r || !r.$$) && m(`Cannot pass "${kr(r)}" as a ${this.name}`), r.$$.ptr || m(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.isConst && r.$$.ptrType.isConst && m(`Cannot convert argument of type ${r.$$.smartPtrType ? r.$$.smartPtrType.name : r.$$.ptrType.name} to parameter type ${this.name}`);
		var n = r.$$.ptrType.registeredClass;
		if (t = Fr(r.$$.ptr, n, this.registeredClass), this.isSmartPointer) switch (r.$$.smartPtr === void 0 && m("Passing raw pointer to smart pointer is illegal"), this.sharingPolicy) {
			case 0:
				r.$$.smartPtrType === this ? t = r.$$.smartPtr : m(`Cannot convert argument of type ${r.$$.smartPtrType ? r.$$.smartPtrType.name : r.$$.ptrType.name} to parameter type ${this.name}`);
				break;
			case 1:
				t = r.$$.smartPtr;
				break;
			case 2:
				if (r.$$.smartPtrType === this) t = r.$$.smartPtr;
				else {
					var i = r.clone();
					t = this.rawShare(t, W.toHandle(() => i.delete())), e !== null && e.push(this.rawDestructor, t);
				}
				break;
			default: m("Unsupporting sharing policy");
		}
		return t;
	}
	function vt(e, r) {
		if (r === null) return this.isReference && m(`null is not a valid ${this.name}`), 0;
		r.$$ || m(`Cannot pass "${kr(r)}" as a ${this.name}`), r.$$.ptr || m(`Cannot pass deleted object as a pointer of type ${this.name}`), r.$$.ptrType.isConst && m(`Cannot convert argument of type ${r.$$.ptrType.name} to parameter type ${this.name}`);
		var t = r.$$.ptrType.registeredClass;
		return Fr(r.$$.ptr, t, this.registeredClass);
	}
	var ee = (e, r, t) => {
		if (r === t) return e;
		if (t.baseClass === void 0) return null;
		var n = ee(e, r, t.baseClass);
		return n === null ? null : t.downcast(n);
	}, dt = {}, pt = (e, r) => {
		for (r === void 0 && m("ptr should not be undefined"); e.baseClass;) r = e.upcast(r), e = e.baseClass;
		return r;
	}, ht = (e, r) => (r = pt(e, r), dt[r]), vr = (e, r) => {
		(!r.ptrType || !r.ptr) && lr("makeClassHandle requires ptr and ptrType");
		return !!r.smartPtrType !== !!r.smartPtr && lr("Both smartPtrType and smartPtr must be specified"), r.count = { value: 1 }, rr(Object.create(e, { $$: {
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
		var s = Jr[this.registeredClass.getActualType(r)];
		if (!s) return i.call(this);
		var o;
		this.isConst ? o = s.constPointerType : o = s.pointerType;
		var u = ee(r, this.registeredClass, o.registeredClass);
		return u === null ? i.call(this) : this.isSmartPointer ? vr(o.registeredClass.instancePrototype, {
			ptrType: o,
			ptr: u,
			smartPtrType: this,
			smartPtr: e
		}) : vr(o.registeredClass.instancePrototype, {
			ptrType: o,
			ptr: u
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
			argPackAdvance: D,
			readValueFromPointer: J,
			fromWireType: _t
		});
	};
	function dr(e, r, t, n, i, a, s, o, u, f, c) {
		this.name = e, this.registeredClass = r, this.isReference = t, this.isConst = n, this.isSmartPointer = i, this.pointeeType = a, this.sharingPolicy = s, this.rawGetPointee = o, this.rawConstructor = u, this.rawShare = f, this.rawDestructor = c, !i && r.baseClass === void 0 ? n ? (this.toWireType = lt, this.destructorFunction = null) : (this.toWireType = vt, this.destructorFunction = null) : this.toWireType = ct;
	}
	var te = (e, r, t) => {
		l.hasOwnProperty(e) || lr("Replacing nonexistent public symbol"), l[e].overloadTable !== void 0 && t !== void 0 ? l[e].overloadTable[t] = r : (l[e] = r, l[e].argCount = t);
	}, ne = [], ie, _ = (e) => {
		var r = ne[e];
		return r || (ne[e] = r = ie.get(e)), r;
	}, yt = function(e, r) {
		let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
		if (e.includes("j")) return dynCallLegacy(e, r, t);
		return _(r)(...t);
	}, mt = function(e, r) {
		let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
		return function() {
			for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
			return yt(e, r, i, t);
		};
	}, S = function(e, r) {
		e = A(e);
		function t() {
			if (e.includes("j")) return mt(e, r);
			return _(r);
		}
		var n = t();
		return typeof n != "function" && m(`unknown function pointer with signature ${e}: ${r}`), n;
	};
	class $t extends Error {}
	var ae = (e) => {
		var r = bn(e), t = A(r);
		return N(r), t;
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
	}, bt = (e, r, t, n, i, a, s, o, u, f, c, v, g) => {
		c = A(c), a = S(i, a), o && (o = S(s, o)), f && (f = S(u, f)), g = S(v, g);
		var y = ut(c);
		re(y, function() {
			pr(`Cannot construct ${c} due to unbound types`, [n]);
		}), H([
			e,
			r,
			t
		], n ? [n] : [], (w) => {
			w = w[0];
			var P, C;
			n ? (P = w.registeredClass, C = P.instancePrototype) : C = cr.prototype;
			var T = Rr(c, function() {
				if (Object.getPrototypeOf(this) !== M) throw new Q(`Use 'new' to construct ${c}`);
				if (R.constructor_body === void 0) throw new Q(`${c} has no accessible constructor`);
				for (var ye = arguments.length, hr = new Array(ye), _r = 0; _r < ye; _r++) hr[_r] = arguments[_r];
				var me = R.constructor_body[hr.length];
				if (me === void 0) throw new Q(`Tried to invoke ctor of ${c} with invalid number of parameters (${hr.length}) - expected (${Object.keys(R.constructor_body).toString()}) parameters instead!`);
				return me.apply(this, hr);
			}), M = Object.create(C, { constructor: { value: T } });
			T.prototype = M;
			var R = new ft(c, T, M, g, P, a, o, f);
			if (R.baseClass) {
				var k, tr;
				(tr = (k = R.baseClass).__derivedClasses) !== null && tr !== void 0 || (k.__derivedClasses = []), R.baseClass.__derivedClasses.push(R);
			}
			var di = new dr(c, R, !0, !1, !1), _e = new dr(c + "*", R, !1, !1, !1), ge = new dr(c + " const*", R, !1, !0, !1);
			return Jr[e] = {
				pointerType: _e,
				constPointerType: ge
			}, te(y, T), [
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
		s < 2 && m("argTypes array size mismatch! Must at least get return value and 'this' types!");
		var o = r[1] !== null && t !== null, u = wt(r), f = r[0].name !== "void", c = s - 2, v = new Array(c), g = [], y = [], w = function() {
			y.length = 0;
			var P;
			g.length = o ? 2 : 1, g[0] = i, o && (P = r[1].toWireType(y, this), g[1] = P);
			for (var C = 0; C < c; ++C) v[C] = r[C + 2].toWireType(y, C < 0 || arguments.length <= C ? void 0 : arguments[C]), g.push(v[C]);
			var T = n(...g);
			function M(R) {
				if (u) Pr(y);
				else for (var k = o ? 1 : 2; k < r.length; k++) {
					var tr = k === 1 ? P : v[k - 2];
					r[k].destructorFunction !== null && r[k].destructorFunction(tr);
				}
				if (f) return r[0].fromWireType(R);
			}
			return M(T);
		};
		return Rr(e, w);
	}
	var Ct = (e, r, t, n, i, a) => {
		var s = Er(r, t);
		i = S(n, i), H([], [e], (o) => {
			o = o[0];
			var u = `constructor ${o.name}`;
			if (o.registeredClass.constructor_body === void 0 && (o.registeredClass.constructor_body = []), o.registeredClass.constructor_body[r - 1] !== void 0) throw new Q(`Cannot register multiple constructors with identical number of parameters (${r - 1}) for class '${o.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
			return o.registeredClass.constructor_body[r - 1] = () => {
				pr(`Cannot construct ${o.name} due to unbound types`, s);
			}, H([], s, (f) => (f.splice(1, 0, null), o.registeredClass.constructor_body[r - 1] = Sr(u, f, null, i, a), [])), [];
		});
	}, oe = (e) => {
		e = e.trim();
		const r = e.indexOf("(");
		return r === -1 ? e : e.slice(0, r);
	}, Pt = (e, r, t, n, i, a, s, o, u, f) => {
		var c = Er(t, n);
		r = A(r), r = oe(r), a = S(i, a), H([], [e], (v) => {
			v = v[0];
			var g = `${v.name}.${r}`;
			r.startsWith("@@") && (r = Symbol[r.substring(2)]), o && v.registeredClass.pureVirtualFunctions.push(r);
			function y() {
				pr(`Cannot call ${g} due to unbound types`, c);
			}
			var w = v.registeredClass.instancePrototype, P = w[r];
			return P === void 0 || P.overloadTable === void 0 && P.className !== v.name && P.argCount === t - 2 ? (y.argCount = t - 2, y.className = v.name, w[r] = y) : (Qr(w, r, g), w[r].overloadTable[t - 2] = y), H([], c, (C) => {
				var T = Sr(g, C, v, a, s);
				return w[r].overloadTable === void 0 ? (T.argCount = t - 2, w[r] = T) : w[r].overloadTable[t - 2] = T, [];
			}), [];
		});
	}, se = [], B = [
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
		e > 9 && --B[e + 1] === 0 && (B[e] = void 0, se.push(e));
	}, W = {
		toValue: (e) => (e || m(`Cannot use deleted val. handle = ${e}`), B[e]),
		toHandle: (e) => {
			switch (e) {
				case void 0: return 2;
				case null: return 4;
				case !0: return 6;
				case !1: return 8;
				default: {
					const r = se.pop() || B.length;
					return B[r] = e, B[r + 1] = 1, r;
				}
			}
		}
	}, ue = {
		name: "emscripten::val",
		fromWireType: (e) => {
			var r = W.toValue(e);
			return jr(e), r;
		},
		toWireType: (e, r) => W.toHandle(r),
		argPackAdvance: D,
		readValueFromPointer: J,
		destructorFunction: null
	}, Tt = (e) => j(e, ue), At = (e, r) => {
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
		r = A(r), j(e, {
			name: r,
			fromWireType: (n) => n,
			toWireType: (n, i) => i,
			argPackAdvance: D,
			readValueFromPointer: At(r, t),
			destructorFunction: null
		});
	}, Ft = (e, r, t, n, i, a, s, o) => {
		var u = Er(r, t);
		e = A(e), e = oe(e), i = S(n, i), re(e, function() {
			pr(`Cannot call ${e} due to unbound types`, u);
		}, r - 1), H([], u, (f) => {
			var c = [f[0], null].concat(f.slice(1));
			return te(e, Sr(e, c, null, i, a), r - 1), [];
		});
	}, kt = (e, r, t) => {
		switch (r) {
			case 1: return t ? (n) => I[n] : (n) => E[n];
			case 2: return t ? (n) => ir[n >> 1] : (n) => z[n >> 1];
			case 4: return t ? (n) => L[n >> 2] : (n) => $[n >> 2];
			default: throw new TypeError(`invalid integer width (${r}): ${e}`);
		}
	}, Et = (e, r, t, n, i) => {
		r = A(r);
		const a = n === 0;
		let s = (u) => u;
		if (a) {
			var o = 32 - 8 * t;
			s = (u) => u << o >>> o, i = s(i);
		}
		j(e, {
			name: r,
			fromWireType: s,
			toWireType: (u, f) => f,
			argPackAdvance: D,
			readValueFromPointer: kt(r, t, n !== 0),
			destructorFunction: null
		});
	}, St = (e, r, t) => {
		var i = [
			Int8Array,
			Uint8Array,
			Int16Array,
			Uint16Array,
			Int32Array,
			Uint32Array,
			Float32Array,
			Float64Array
		][r];
		function a(s) {
			var o = $[s >> 2], u = $[s + 4 >> 2];
			return new i(I.buffer, u, o);
		}
		t = A(t), j(e, {
			name: t,
			fromWireType: a,
			argPackAdvance: D,
			readValueFromPointer: a
		}, { ignoreDuplicateRegistrations: !0 });
	}, jt = Object.assign({ optional: !0 }, ue), Ot = (e, r) => {
		j(e, jt);
	}, Dt = (e, r, t, n) => {
		if (!(n > 0)) return 0;
		for (var i = t, a = t + n - 1, s = 0; s < e.length; ++s) {
			var o = e.charCodeAt(s);
			if (o >= 55296 && o <= 57343) {
				var u = e.charCodeAt(++s);
				o = 65536 + ((o & 1023) << 10) | u & 1023;
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
	}, q = (e, r, t) => Dt(e, E, r, t), fe = (e) => {
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
			var u = e[r++] & 63;
			if ((s & 240) == 224 ? s = (s & 15) << 12 | o << 6 | u : s = (s & 7) << 18 | o << 12 | u << 6 | e[r++] & 63, s < 65536) a += String.fromCharCode(s);
			else {
				var f = s - 65536;
				a += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023);
			}
		}
		return a;
	}, Wt = (e, r) => e ? ce(E, e, r) : "", Mt = (e, r) => {
		r = A(r), j(e, {
			name: r,
			fromWireType(t) {
				for (var n = $[t >> 2], i = t + 4, a, s, o = i, s = 0; s <= n; ++s) {
					var u = i + s;
					if (s == n || E[u] == 0) {
						var f = u - o, c = Wt(o, f);
						a === void 0 ? a = c : (a += "\0", a += c), o = u + 1;
					}
				}
				return N(t), a;
			},
			toWireType(t, n) {
				n instanceof ArrayBuffer && (n = new Uint8Array(n));
				var i, a = typeof n == "string";
				a || ArrayBuffer.isView(n) && n.BYTES_PER_ELEMENT == 1 || m("Cannot pass non-string to std::string"), a ? i = fe(n) : i = n.length;
				var s = he(4 + i + 1), o = s + 4;
				return $[s >> 2] = i, a ? q(n, o, i + 1) : E.set(n, o), t !== null && t.push(N, s), s;
			},
			argPackAdvance: D,
			readValueFromPointer: J,
			destructorFunction(t) {
				N(t);
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
			var i = L[e + t * 4 >> 2];
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
			if (L[r >> 2] = s, r += 4, r + 4 > i) break;
		}
		return L[r >> 2] = 0, r - n;
	}, Bt = (e) => {
		for (var r = 0, t = 0; t < e.length; ++t) {
			var n = e.charCodeAt(t);
			n >= 55296 && n <= 57343 && ++t, r += 4;
		}
		return r;
	}, Nt = (e, r, t) => {
		t = A(t);
		var n, i, a, s;
		r === 2 ? (n = xt, i = It, s = Ut, a = (o) => z[o >> 1]) : r === 4 && (n = Vt, i = Ht, s = Bt, a = (o) => $[o >> 2]), j(e, {
			name: t,
			fromWireType: (o) => {
				for (var u = $[o >> 2], f, c = o + 4, v = 0; v <= u; ++v) {
					var g = o + 4 + v * r;
					if (v == u || a(g) == 0) {
						var y = g - c, w = n(c, y);
						f === void 0 ? f = w : (f += "\0", f += w), c = g + r;
					}
				}
				return N(o), f;
			},
			toWireType: (o, u) => {
				typeof u != "string" && m(`Cannot pass non-string to C++ string type ${t}`);
				var f = s(u), c = he(4 + f + r);
				return $[c >> 2] = f / r, i(u, c + 4, f + r), o !== null && o.push(N, c), c;
			},
			argPackAdvance: D,
			readValueFromPointer: J,
			destructorFunction(o) {
				N(o);
			}
		});
	}, Zt = (e, r, t, n, i, a) => {
		ur[e] = {
			name: A(r),
			rawConstructor: S(t, n),
			rawDestructor: S(i, a),
			fields: []
		};
	}, zt = (e, r, t, n, i, a, s, o, u, f) => {
		ur[e].fields.push({
			fieldName: A(r),
			getterReturnType: t,
			getter: S(n, i),
			getterContext: a,
			setterArgumentType: s,
			setter: S(o, u),
			setterContext: f
		});
	}, Lt = (e, r) => {
		r = A(r), j(e, {
			isVoid: !0,
			name: r,
			argPackAdvance: 0,
			fromWireType: () => {},
			toWireType: (t, n) => {}
		});
	}, Or = [], Gt = (e, r, t, n) => (e = Or[e], r = W.toValue(r), e(null, r, t, n)), Xt = {}, qt = (e) => {
		var r = Xt[e];
		return r === void 0 ? A(e) : r;
	}, de = () => {
		if (typeof globalThis == "object") return globalThis;
		function e(r) {
			r.$$$embind_global$$$ = r;
			var t = typeof $$$embind_global$$$ == "object" && r.$$$embind_global$$$ == r;
			return t || delete r.$$$embind_global$$$, t;
		}
		if (typeof $$$embind_global$$$ == "object" || (typeof global == "object" && e(global) ? $$$embind_global$$$ = global : typeof self == "object" && e(self) && ($$$embind_global$$$ = self), typeof $$$embind_global$$$ == "object")) return $$$embind_global$$$;
		throw Error("unable to get global object.");
	}, Yt = (e) => e === 0 ? W.toHandle(de()) : (e = qt(e), W.toHandle(de()[e])), Kt = (e) => {
		var r = Or.length;
		return Or.push(e), r;
	}, pe = (e, r) => {
		var t = V[e];
		return t === void 0 && m(`${r} has unknown type ${ae(e)}`), t;
	}, Jt = (e, r) => {
		for (var t = new Array(e), n = 0; n < e; ++n) t[n] = pe($[r + n * 4 >> 2], `parameter ${n}`);
		return t;
	}, Qt = (e, r, t) => {
		var n = [], i = e.toWireType(n, t);
		return n.length && ($[r >> 2] = W.toHandle(n)), i;
	}, rn = Reflect.construct, en = (e, r, t) => {
		var n = Jt(e, r), i = n.shift();
		e--;
		var a = new Array(e), s = (u, f, c, v) => {
			for (var g = 0, y = 0; y < e; ++y) a[y] = n[y].readValueFromPointer(v + g), g += n[y].argPackAdvance;
			return Qt(i, c, t === 1 ? rn(f, a) : f.apply(u, a));
		};
		return Kt(Rr(`methodCaller<(${n.map((u) => u.name).join(", ")}) => ${i.name}>`, s));
	}, tn = (e) => {
		e > 9 && (B[e + 1] += 1);
	}, nn = (e) => {
		Pr(W.toValue(e)), jr(e);
	}, an = (e, r) => {
		e = pe(e, "_emval_take_value");
		var t = e.readValueFromPointer(r);
		return W.toHandle(t);
	}, on = (e, r, t, n) => {
		var i = (/* @__PURE__ */ new Date()).getFullYear(), a = new Date(i, 0, 1), s = new Date(i, 6, 1), o = a.getTimezoneOffset(), u = s.getTimezoneOffset(), f = Math.max(o, u);
		$[e >> 2] = f * 60, L[r >> 2] = +(o != u);
		var c = (y) => {
			var w = y >= 0 ? "-" : "+", P = Math.abs(y);
			return `UTC${w}${String(Math.floor(P / 60)).padStart(2, "0")}${String(P % 60).padStart(2, "0")}`;
		}, v = c(o), g = c(u);
		u < o ? (q(v, t, 17), q(g, n, 17)) : (q(v, n, 17), q(g, t, 17));
	}, sn = () => 2147483648, un = (e, r) => Math.ceil(e / r) * r, fn = (e) => {
		var t = (e - nr.buffer.byteLength + 65535) / 65536 | 0;
		try {
			return nr.grow(t), zr(), 1;
		} catch {}
	}, ln = (e) => {
		var r = E.length;
		e >>>= 0;
		var t = sn();
		if (e > t) return !1;
		for (var n = 1; n <= 4; n *= 2) {
			var i = r * (1 + .2 / n);
			i = Math.min(i, e + 100663296);
			if (fn(Math.min(t, un(Math.max(e, i), 65536)))) return !0;
		}
		return !1;
	}, Dr = {}, cn = () => Ur || "./this.program", er = () => {
		if (!er.strings) {
			var r = {
				USER: "web_user",
				LOGNAME: "web_user",
				PATH: "/",
				PWD: "/",
				HOME: "/home/web_user",
				LANG: (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
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
		r === 0 || r === 10 ? ((e === 1 ? Hr : Z)(ce(t)), t.length = 0) : t.push(r);
	}, yn = (e, r, t, n) => {
		for (var i = 0, a = 0; a < t; a++) {
			var s = $[r >> 2], o = $[r + 4 >> 2];
			r += 8;
			for (var u = 0; u < o; u++) gn(e, E[s + u]);
			i += o;
		}
		return $[n >> 2] = i, 0;
	}, mn = (e) => e;
	rt(), at(), gt(), l.noExitRuntime && l.noExitRuntime, l.print && (Hr = l.print), l.printErr && (Z = l.printErr), l.wasmBinary && (Y = l.wasmBinary), l.arguments && l.arguments, l.thisProgram && (Ur = l.thisProgram);
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
	}, b = await Ie();
	b.ya;
	var bn = b.za, N = l._free = b.Aa, he = l._malloc = b.Ca, wn = b.Da, d = b.Ea, Cn = b.Fa, Pn = b.Ga, Tn = b.Ha, An = b.Ia, Rn = b.Ja, Fn = b.Ka;
	l.dynCall_viijii = b.La;
	var kn = l.dynCall_iiijj = b.Ma;
	l.dynCall_jiji = b.Na;
	var En = l.dynCall_jiiii = b.Oa;
	l.dynCall_iiiiij = b.Pa, l.dynCall_iiiiijj = b.Qa, l.dynCall_iiiiiijj = b.Ra;
	function Sn(e, r) {
		var t = h();
		try {
			_(e)(r);
		} catch (n) {
			if (p(t), n !== n + 0) throw n;
			d(1, 0);
		}
	}
	function jn(e, r, t, n) {
		var i = h();
		try {
			return _(e)(r, t, n);
		} catch (a) {
			if (p(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function On(e, r, t, n, i) {
		var a = h();
		try {
			return _(e)(r, t, n, i);
		} catch (s) {
			if (p(a), s !== s + 0) throw s;
			d(1, 0);
		}
	}
	function Dn(e, r, t, n) {
		var i = h();
		try {
			_(e)(r, t, n);
		} catch (a) {
			if (p(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function Wn(e, r, t) {
		var n = h();
		try {
			_(e)(r, t);
		} catch (i) {
			if (p(n), i !== i + 0) throw i;
			d(1, 0);
		}
	}
	function Mn(e, r) {
		var t = h();
		try {
			return _(e)(r);
		} catch (n) {
			if (p(t), n !== n + 0) throw n;
			d(1, 0);
		}
	}
	function xn(e, r, t) {
		var n = h();
		try {
			return _(e)(r, t);
		} catch (i) {
			if (p(n), i !== i + 0) throw i;
			d(1, 0);
		}
	}
	function In(e) {
		var r = h();
		try {
			_(e)();
		} catch (t) {
			if (p(r), t !== t + 0) throw t;
			d(1, 0);
		}
	}
	function Un(e, r, t, n, i, a, s, o, u, f, c) {
		var v = h();
		try {
			_(e)(r, t, n, i, a, s, o, u, f, c);
		} catch (g) {
			if (p(v), g !== g + 0) throw g;
			d(1, 0);
		}
	}
	function Vn(e, r, t, n, i) {
		var a = h();
		try {
			_(e)(r, t, n, i);
		} catch (s) {
			if (p(a), s !== s + 0) throw s;
			d(1, 0);
		}
	}
	function Hn(e, r, t, n, i) {
		var a = h();
		try {
			return _(e)(r, t, n, i);
		} catch (s) {
			if (p(a), s !== s + 0) throw s;
			d(1, 0);
		}
	}
	function Bn(e, r, t, n, i, a, s) {
		var o = h();
		try {
			_(e)(r, t, n, i, a, s);
		} catch (u) {
			if (p(o), u !== u + 0) throw u;
			d(1, 0);
		}
	}
	function Nn(e, r, t, n, i, a, s, o, u, f, c, v, g, y, w, P) {
		var C = h();
		try {
			_(e)(r, t, n, i, a, s, o, u, f, c, v, g, y, w, P);
		} catch (T) {
			if (p(C), T !== T + 0) throw T;
			d(1, 0);
		}
	}
	function Zn(e, r, t, n, i, a, s, o, u) {
		var f = h();
		try {
			_(e)(r, t, n, i, a, s, o, u);
		} catch (c) {
			if (p(f), c !== c + 0) throw c;
			d(1, 0);
		}
	}
	function zn(e, r, t, n, i, a) {
		var s = h();
		try {
			return _(e)(r, t, n, i, a);
		} catch (o) {
			if (p(s), o !== o + 0) throw o;
			d(1, 0);
		}
	}
	function Ln(e, r, t, n, i, a) {
		var s = h();
		try {
			_(e)(r, t, n, i, a);
		} catch (o) {
			if (p(s), o !== o + 0) throw o;
			d(1, 0);
		}
	}
	function Gn(e, r, t, n, i, a, s) {
		var o = h();
		try {
			return _(e)(r, t, n, i, a, s);
		} catch (u) {
			if (p(o), u !== u + 0) throw u;
			d(1, 0);
		}
	}
	function Xn(e, r, t, n, i, a, s, o) {
		var u = h();
		try {
			_(e)(r, t, n, i, a, s, o);
		} catch (f) {
			if (p(u), f !== f + 0) throw f;
			d(1, 0);
		}
	}
	function qn(e, r, t, n, i, a, s, o) {
		var u = h();
		try {
			return _(e)(r, t, n, i, a, s, o);
		} catch (f) {
			if (p(u), f !== f + 0) throw f;
			d(1, 0);
		}
	}
	function Yn(e) {
		var r = h();
		try {
			return _(e)();
		} catch (t) {
			if (p(r), t !== t + 0) throw t;
			d(1, 0);
		}
	}
	function Kn(e, r, t, n, i, a, s, o, u) {
		var f = h();
		try {
			return _(e)(r, t, n, i, a, s, o, u);
		} catch (c) {
			if (p(f), c !== c + 0) throw c;
			d(1, 0);
		}
	}
	function Jn(e, r, t, n, i, a, s) {
		var o = h();
		try {
			return _(e)(r, t, n, i, a, s);
		} catch (u) {
			if (p(o), u !== u + 0) throw u;
			d(1, 0);
		}
	}
	function Qn(e, r, t, n) {
		var i = h();
		try {
			return _(e)(r, t, n);
		} catch (a) {
			if (p(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function ri(e, r, t, n) {
		var i = h();
		try {
			return _(e)(r, t, n);
		} catch (a) {
			if (p(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function ei(e, r, t, n, i, a, s, o) {
		var u = h();
		try {
			_(e)(r, t, n, i, a, s, o);
		} catch (f) {
			if (p(u), f !== f + 0) throw f;
			d(1, 0);
		}
	}
	function ti(e, r, t, n, i, a) {
		var s = h();
		try {
			return _(e)(r, t, n, i, a);
		} catch (o) {
			if (p(s), o !== o + 0) throw o;
			d(1, 0);
		}
	}
	function ni(e, r, t, n, i, a, s, o, u, f) {
		var c = h();
		try {
			return _(e)(r, t, n, i, a, s, o, u, f);
		} catch (v) {
			if (p(c), v !== v + 0) throw v;
			d(1, 0);
		}
	}
	function ii(e, r, t) {
		var n = h();
		try {
			return _(e)(r, t);
		} catch (i) {
			if (p(n), i !== i + 0) throw i;
			d(1, 0);
		}
	}
	function ai(e, r, t, n, i) {
		var a = h();
		try {
			return _(e)(r, t, n, i);
		} catch (s) {
			if (p(a), s !== s + 0) throw s;
			d(1, 0);
		}
	}
	function oi(e, r, t, n, i, a, s, o, u, f) {
		var c = h();
		try {
			_(e)(r, t, n, i, a, s, o, u, f);
		} catch (v) {
			if (p(c), v !== v + 0) throw v;
			d(1, 0);
		}
	}
	function si(e, r, t, n, i, a, s) {
		var o = h();
		try {
			_(e)(r, t, n, i, a, s);
		} catch (u) {
			if (p(o), u !== u + 0) throw u;
			d(1, 0);
		}
	}
	function ui(e, r, t, n) {
		var i = h();
		try {
			return _(e)(r, t, n);
		} catch (a) {
			if (p(i), a !== a + 0) throw a;
			d(1, 0);
		}
	}
	function fi(e, r, t, n, i, a, s, o, u, f, c, v) {
		var g = h();
		try {
			return _(e)(r, t, n, i, a, s, o, u, f, c, v);
		} catch (y) {
			if (p(g), y !== y + 0) throw y;
			d(1, 0);
		}
	}
	function li(e, r, t, n, i, a, s) {
		var o = h();
		try {
			return kn(e, r, t, n, i, a, s);
		} catch (u) {
			if (p(o), u !== u + 0) throw u;
			d(1, 0);
		}
	}
	function ci(e, r, t, n, i) {
		var a = h();
		try {
			return En(e, r, t, n, i);
		} catch (s) {
			if (p(a), s !== s + 0) throw s;
			d(1, 0);
		}
	}
	function Wr() {
		if (U > 0) {
			K = Wr;
			return;
		}
		if (Re(), U > 0) {
			K = Wr;
			return;
		}
		function e() {
			var r;
			l.calledRun = !0, !Br && (Fe(), xr(l), (r = l.onRuntimeInitialized) === null || r === void 0 || r.call(l), ke());
		}
		l.setStatus ? (l.setStatus("Running..."), setTimeout(() => {
			setTimeout(() => l.setStatus(""), 1), e();
		}, 1)) : e();
	}
	function vi() {
		if (l.preInit) for (typeof l.preInit == "function" && (l.preInit = [l.preInit]); l.preInit.length > 0;) l.preInit.shift()();
	}
	return vi(), Wr(), x = we, x;
};
function $e(F) {
	return S(Mr, F);
}
async function be(F, x) {
	return Z(Mr, F, x);
}
//#endregion
//#region lib/utils.ts
function checkCameraConstraintsCapabilities(video, key) {
	return !!((video.srcObject?.getVideoTracks() || [])[0]?.getCapabilities())?.[key];
}
function getCameraCapabilitiesZoomRange(video) {
	const capabilities = (video.srcObject?.getVideoTracks() || [])[0]?.getCapabilities() || {};
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
	const track = video.srcObject?.getVideoTracks()[0];
	if (!track) throw new Error("Camera track not found");
	const constraints = { advanced: [{ zoom }] };
	await track.applyConstraints(constraints);
}
async function applyVideoTorch(video, torch) {
	const track = video.srcObject?.getVideoTracks()[0];
	if (!track) throw new Error("Camera track not found");
	const constraints = { advanced: [{ torch }] };
	await track.applyConstraints(constraints);
}
function closeStream(stream) {
	if (stream) {
		const tracks = stream.getTracks();
		for (let i = 0; i < tracks.length; i++) tracks[i].stop();
	}
}
async function requestCameraPermission() {
	try {
		closeStream(await navigator.mediaDevices.getUserMedia({
			video: { facingMode: "environment" },
			audio: false
		}));
	} catch (error) {
		throw error;
	}
}
async function openCamera({ width, height, video }) {
	const isPortrait = window.screen.availHeight > window.screen.availWidth;
	const videoConstraints = {
		video: {
			width: isPortrait ? height : width,
			height: isPortrait ? width : height,
			zoom: true,
			facingMode: "environment"
		},
		audio: false
	};
	const cameraStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
	video.srcObject = cameraStream;
	try {
		await video.play();
	} catch (error) {
		closeStream(cameraStream);
		if (video.srcObject === cameraStream) video.srcObject = null;
		throw error;
	}
	return cameraStream;
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
	return (await be(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height), readerOptions))[0];
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
	const rotatePoint = (x, y) => {
		const dx = x - centerX;
		const dy = y - centerY;
		return {
			x: centerX + dx * Math.cos(angle) - dy * Math.sin(angle),
			y: centerY + dx * Math.sin(angle) + dy * Math.cos(angle)
		};
	};
	const rotatedTopLeft = rotatePoint(topLeft.x, topLeft.y);
	const rotatedTopRight = rotatePoint(topRight.x, topRight.y);
	const rotatedBottomRight = rotatePoint(bottomRight.x, bottomRight.y);
	drawTargetRectangle(ctx, {
		topLeft: rotatedTopLeft,
		topRight: rotatedTopRight,
		bottomLeft: rotatePoint(bottomLeft.x, bottomLeft.y),
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
			Promise.resolve(call()).catch(noop);
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
	constructor(options) {
		this.zoom = 1;
		this.cancelLoop = noop;
		this.scanSession = 0;
		this.isDecodingFrame = false;
		this.supportNativeZoom = null;
		this.zoomRange = null;
		this.options = {
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
	reportError(error) {
		const normalized = error instanceof Error ? error : new Error(String(error));
		this.onError(normalized);
		return normalized;
	}
	async startScan() {
		const session = ++this.scanSession;
		this.cancelLoop();
		await closeCamera(this.videoNode);
		let cameraStream = null;
		try {
			await requestCameraPermission();
			cameraStream = await openCamera({
				width: this.options.resolution.width,
				height: this.options.resolution.height,
				video: this.videoNode
			});
		} catch (error) {
			throw this.reportError(error);
		}
		if (session !== this.scanSession) {
			if (cameraStream) {
				closeStream(cameraStream);
				if (this.videoNode.srcObject === cameraStream) this.videoNode.srcObject = null;
			}
			return;
		}
		const video = this.videoNode;
		const cameraCanvas = this.cameraCanvasNode;
		const offscreenCanvas = this.offscreenCanvasNode;
		const offscreenCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true });
		const cameraCtx = cameraCanvas.getContext("2d", { willReadFrequently: true });
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
			if (session !== this.scanSession || this.isDecodingFrame) return;
			this.isDecodingFrame = true;
			try {
				if (session !== this.scanSession) return;
				if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
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
				const decoded = await scanCanvas(scanCanvasCtx, this.options.zxingOptions);
				if (session !== this.scanSession || !decoded || !decoded.text) return;
				this.onScan(decoded.text);
				if (this.options.marker) if (this.options.trick) {
					decoded.position.degree = -TRICK_DEGREE;
					drawTargetRectangleRotated(cameraCtx, decoded.position);
				} else drawTargetRectangle(cameraCtx, decoded.position);
			} catch (error) {
				this.reportError(error);
			} finally {
				this.isDecodingFrame = false;
			}
		};
		this.zoomTo(this.options.zoom || 1);
		this.cancelLoop = fixedFPSCall(drawCanvas, this.options.fps);
	}
	stopScan() {
		this.scanSession += 1;
		this.cancelLoop();
		closeCamera(this.videoNode);
		this.isDecodingFrame = false;
	}
	zoomIn(step = .1) {
		this.zoomTo(this.zoom + step);
	}
	zoomOut(step = .1) {
		this.zoomTo(this.zoom - step);
	}
	zoomTo(zoom) {
		const _zoom = Math.min(Math.max(zoom, this.zoomRange?.min || 1), this.zoomRange?.max || 1);
		this.zoom = _zoom;
		if (this.supportNativeZoom) {
			applyVideoZoom(this.videoNode, _zoom).catch((error) => {
				this.reportError(error);
			});
			return;
		}
	}
	toggleTorch(bool) {
		applyVideoTorch(this.videoNode, bool).catch((error) => {
			this.reportError(error);
		});
	}
};
//#endregion
export { NanoScan as default };

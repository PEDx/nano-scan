//#region node_modules/zxing-wasm/dist/es/share.js
var e = [
	[
		"All",
		"*",
		"*",
		"     ",
		0,
		"All"
	],
	[
		"AllReadable",
		"*",
		"r",
		"     ",
		0,
		"All Readable"
	],
	[
		"AllCreatable",
		"*",
		"w",
		"     ",
		0,
		"All Creatable"
	],
	[
		"AllLinear",
		"*",
		"l",
		"     ",
		0,
		"All Linear"
	],
	[
		"AllMatrix",
		"*",
		"m",
		"     ",
		0,
		"All Matrix"
	],
	[
		"AllGS1",
		"*",
		"G",
		"     ",
		0,
		"All GS1"
	],
	[
		"AllRetail",
		"*",
		"R",
		"     ",
		0,
		"All Retail"
	],
	[
		"AllIndustrial",
		"*",
		"I",
		"     ",
		0,
		"All Industrial"
	],
	[
		"Codabar",
		"F",
		" ",
		"lrw  ",
		18,
		"Codabar"
	],
	[
		"Code39",
		"A",
		" ",
		"lrw I",
		8,
		"Code 39"
	],
	[
		"Code39Std",
		"A",
		"s",
		"lrw I",
		8,
		"Code 39 Standard"
	],
	[
		"Code39Ext",
		"A",
		"e",
		"lr  I",
		9,
		"Code 39 Extended"
	],
	[
		"Code32",
		"A",
		"2",
		"lr  I",
		129,
		"Code 32"
	],
	[
		"PZN",
		"A",
		"p",
		"lr  I",
		52,
		"Pharmazentralnummer"
	],
	[
		"Code93",
		"G",
		" ",
		"lrw I",
		25,
		"Code 93"
	],
	[
		"Code128",
		"C",
		" ",
		"lrwGI",
		20,
		"Code 128"
	],
	[
		"ITF",
		"I",
		" ",
		"lrw I",
		3,
		"ITF"
	],
	[
		"ITF14",
		"I",
		"4",
		"lr  I",
		89,
		"ITF-14"
	],
	[
		"DataBar",
		"e",
		" ",
		"lr GR",
		29,
		"DataBar"
	],
	[
		"DataBarOmni",
		"e",
		"o",
		"lr GR",
		29,
		"DataBar Omni"
	],
	[
		"DataBarStk",
		"e",
		"s",
		"lr GR",
		79,
		"DataBar Stacked"
	],
	[
		"DataBarStkOmni",
		"e",
		"O",
		"lr GR",
		80,
		"DataBar Stacked Omni"
	],
	[
		"DataBarLtd",
		"e",
		"l",
		"lr GR",
		30,
		"DataBar Limited"
	],
	[
		"DataBarExp",
		"e",
		"e",
		"lr GR",
		31,
		"DataBar Expanded"
	],
	[
		"DataBarExpStk",
		"e",
		"E",
		"lr GR",
		81,
		"DataBar Expanded Stacked"
	],
	[
		"EANUPC",
		"E",
		" ",
		"lr  R",
		15,
		"EAN/UPC"
	],
	[
		"EAN13",
		"E",
		"1",
		"lrw R",
		15,
		"EAN-13"
	],
	[
		"EAN8",
		"E",
		"8",
		"lrw R",
		10,
		"EAN-8"
	],
	[
		"EAN5",
		"E",
		"5",
		"l   R",
		12,
		"EAN-5"
	],
	[
		"EAN2",
		"E",
		"2",
		"l   R",
		11,
		"EAN-2"
	],
	[
		"ISBN",
		"E",
		"i",
		"lr  R",
		69,
		"ISBN"
	],
	[
		"UPCA",
		"E",
		"a",
		"lrw R",
		34,
		"UPC-A"
	],
	[
		"UPCE",
		"E",
		"e",
		"lrw R",
		37,
		"UPC-E"
	],
	[
		"Telepen",
		"B",
		" ",
		"lr  I",
		32,
		"Telepen"
	],
	[
		"TelepenAlpha",
		"B",
		"0",
		"lr  I",
		32,
		"Telepen Alpha"
	],
	[
		"TelepenNumeric",
		"B",
		"1",
		"lr  I",
		87,
		"Telepen Numeric"
	],
	[
		"OtherBarcode",
		"X",
		" ",
		" r   ",
		0,
		"Other barcode"
	],
	[
		"DXFilmEdge",
		"X",
		"x",
		"lr   ",
		147,
		"DX Film Edge"
	],
	[
		"PDF417",
		"L",
		" ",
		"mrw  ",
		55,
		"PDF417"
	],
	[
		"CompactPDF417",
		"L",
		"c",
		"mr   ",
		56,
		"Compact PDF417"
	],
	[
		"MicroPDF417",
		"L",
		"m",
		"mr   ",
		84,
		"MicroPDF417"
	],
	[
		"Aztec",
		"z",
		" ",
		"mr G ",
		92,
		"Aztec"
	],
	[
		"AztecCode",
		"z",
		"c",
		"mrwG ",
		92,
		"Aztec Code"
	],
	[
		"AztecRune",
		"z",
		"r",
		"mr   ",
		128,
		"Aztec Rune"
	],
	[
		"QRCode",
		"Q",
		" ",
		"mrwG ",
		58,
		"QR Code"
	],
	[
		"QRCodeModel1",
		"Q",
		"1",
		"mr   ",
		0,
		"QR Code Model 1"
	],
	[
		"QRCodeModel2",
		"Q",
		"2",
		"mr   ",
		58,
		"QR Code Model 2"
	],
	[
		"MicroQRCode",
		"Q",
		"m",
		"mr   ",
		97,
		"Micro QR Code"
	],
	[
		"RMQRCode",
		"Q",
		"r",
		"mr G ",
		145,
		"rMQR Code"
	],
	[
		"DataMatrix",
		"d",
		" ",
		"mrwG ",
		71,
		"Data Matrix"
	],
	[
		"MaxiCode",
		"U",
		" ",
		"mr   ",
		57,
		"MaxiCode"
	]
];
var t = {
	DataBarExpanded: "DataBarExp",
	DataBarLimited: "DataBarLtd",
	"Linear-Codes": "AllLinear",
	"Matrix-Codes": "AllMatrix",
	Any: "All",
	rMQRCode: "RMQRCode"
};
e.map((e) => e[5]);
e.filter((e) => e[1] === "*").map((e) => e[0]);
e.filter((e) => e[1] !== "*").map((e) => e[0]);
e.filter((e) => e[2] === " ").map((e) => e[0]);
e.filter((e) => e[3][0] === "l").map((e) => e[0]);
e.filter((e) => e[3][0] === "m").map((e) => e[0]);
e.filter((e) => e[3][1] === "r").map((e) => e[0]);
e.filter((e) => e[3][2] === "w" || e[4] !== 0).map((e) => e[0]);
e.filter((e) => e[3][3] === "G").map((e) => e[0]);
e.filter((e) => e[3][4] === "R").map((e) => e[0]);
e.filter((e) => e[3][4] === "I").map((e) => e[0]);
function y(e) {
	var n;
	return (n = t[e]) == null ? e : n;
}
function b(e) {
	return e.map(y).join(",");
}
var x$1 = [
	"LocalAverage",
	"GlobalHistogram",
	"FixedThreshold",
	"BoolCast"
];
function C(e) {
	return x$1.indexOf(e);
}
var w = /* @__PURE__ */ "Unknown.ASCII.ISO8859_1.ISO8859_2.ISO8859_3.ISO8859_4.ISO8859_5.ISO8859_6.ISO8859_7.ISO8859_8.ISO8859_9.ISO8859_10.ISO8859_11.ISO8859_13.ISO8859_14.ISO8859_15.ISO8859_16.Cp437.Cp1250.Cp1251.Cp1252.Cp1256.Shift_JIS.Big5.GB2312.GB18030.EUC_JP.EUC_KR.UTF16BE.UTF8.UTF16LE.UTF32BE.UTF32LE.BINARY".split(".");
function E(e) {
	return e === "UnicodeBig" ? w.indexOf("UTF16BE") : w.indexOf(e);
}
var D = [
	"Text",
	"Binary",
	"Mixed",
	"GS1",
	"ISO15434",
	"UnknownECI"
];
function k(e) {
	return D[e];
}
var A = [
	"Ignore",
	"Read",
	"Require"
];
function M(e) {
	return A.indexOf(e);
}
var N = [
	"Plain",
	"ECI",
	"HRI",
	"Escaped",
	"Hex",
	"HexECI"
];
function F(e) {
	return N.indexOf(e);
}
var I = {
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
	validateOptionalChecksum: !1,
	returnErrors: !1,
	eanAddOnSymbol: "Ignore",
	textMode: "HRI",
	characterSet: "Unknown",
	tryCode39ExtendedMode: !0
};
function L(e) {
	var t;
	return {
		...e,
		formats: b(e.formats),
		binarizer: C(e.binarizer),
		eanAddOnSymbol: M(e.eanAddOnSymbol),
		textMode: F(e.textMode),
		characterSet: E(e.characterSet),
		tryCode39ExtendedMode: (t = e.tryCode39ExtendedMode) == null || t
	};
}
function R(e) {
	return {
		...e,
		format: e.format,
		symbology: e.symbology,
		contentType: k(e.contentType)
	};
}
var B = {
	format: "QRCode",
	readerInit: !1,
	forceSquareDataMatrix: !1,
	ecLevel: "",
	scale: 1,
	sizeHint: 0,
	rotate: 0,
	invert: !1,
	withHRT: !1,
	withQuietZones: !0,
	addHRT: !1,
	addQuietZones: !0,
	options: ""
};
var W = { locateFile: (e, t) => {
	let n = e.match(/_(.+?)\.wasm$/);
	return n ? `https://fastly.jsdelivr.net/npm/zxing-wasm@3.1.2/dist/${n[1]}/${e}` : t + e;
} };
var G = /* @__PURE__ */ new WeakMap();
function K(e, t) {
	return Object.is(e, t) || Object.keys(e).length === Object.keys(t).length && Object.keys(e).every((n) => Object.hasOwn(t, n) && e[n] === t[n]);
}
function q(e, { overrides: t, equalityFn: n = K, fireImmediately: r = !1 } = {}) {
	var i, a;
	let [o, s] = (i = G.get(e)) == null ? [W] : i, c = t == null ? o : t, l;
	if (r) {
		if (s && (l = n(o, c))) return s;
		let t = e({ ...c });
		return G.set(e, [c, t]), t;
	}
	((a = l) == null ? n(o, c) : a) || G.set(e, [c]);
}
function Y(e) {
	let t = e.byteLength >> 2, n = new Uint8Array(t);
	for (let r = 0; r < t; r++) {
		let t = r << 2;
		n[r] = 306 * e[t] + 601 * e[t + 1] + 117 * e[t + 2] + 512 >> 10;
	}
	return n;
}
async function X(e, t, n = I) {
	let r = {
		...I,
		...n
	}, i = await q(e, { fireImmediately: !0 }), a, o;
	if ("width" in t && "height" in t && "data" in t) {
		let { data: e, width: n, height: s } = t, c = Y(e), l = c.byteLength;
		if (o = i._malloc(l), !o) throw Error(`Failed to allocate ${l} bytes in WASM memory`);
		try {
			i.HEAPU8.set(c, o), a = i.readBarcodesFromPixmap(o, n, s, L(r));
		} finally {
			i._free(o);
		}
	} else {
		let e, n;
		if ("buffer" in t) [e, n] = [t.byteLength, t];
		else if ("byteLength" in t) [e, n] = [t.byteLength, new Uint8Array(t)];
		else if ("size" in t) [e, n] = [t.size, new Uint8Array(await t.arrayBuffer())];
		else throw TypeError("Invalid input type");
		if (o = i._malloc(e), !o) throw Error(`Failed to allocate ${e} bytes in WASM memory`);
		try {
			i.HEAPU8.set(n, o), a = i.readBarcodesFromImage(o, e, L(r));
		} finally {
			i._free(o);
		}
	}
	let s = [];
	for (let e = 0; e < a.size(); ++e) s.push(R(a.get(e)));
	return s;
}
({ ...I }), [...I.formats];
({ ...B });
//#endregion
//#region node_modules/zxing-wasm/dist/es/reader/index.js
async function x(e = {}) {
	var t, n, r, i = e, a = !!globalThis.window, o = typeof Bun < "u", s = !!globalThis.WorkerGlobalScope;
	!((n = globalThis.process) == null || (n = n.versions) == null) && n.node && ((r = globalThis.process) == null || r.type);
	var c = "./this.program", l, u = "";
	function d(e) {
		return i.locateFile ? i.locateFile(e, u) : u + e;
	}
	var f, p;
	if (a || s || o) {
		try {
			u = new URL(".", l).href;
		} catch {}
		s && (p = (e) => {
			var t = new XMLHttpRequest();
			return t.open("GET", e, !1), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
		}), f = async (e) => {
			var t = await fetch(e, { credentials: "same-origin" });
			if (t.ok) return t.arrayBuffer();
			throw Error(t.status + " : " + t.url);
		};
	}
	console.log.bind(console);
	var m = console.error.bind(console), h, g = !1, _, ee, te = !1;
	function ne() {
		var e = Wn.buffer;
		x = new Int8Array(e), y = new Int16Array(e), i.HEAPU8 = T = new Uint8Array(e), C = new Uint16Array(e), b = new Int32Array(e), w = new Uint32Array(e), S = new Float32Array(e), me = new Float64Array(e);
	}
	function re() {
		if (i.preRun) for (typeof i.preRun == "function" && (i.preRun = [i.preRun]); i.preRun.length;) ye(i.preRun.shift());
		he(ve);
	}
	function ie() {
		te = !0, $.ya();
	}
	function ae() {
		if (i.postRun) for (typeof i.postRun == "function" && (i.postRun = [i.postRun]); i.postRun.length;) _e(i.postRun.shift());
		he(ge);
	}
	function oe(e) {
		var t, n;
		(t = i.onAbort) == null || t.call(i, e), e = "Aborted(" + e + ")", m(e), g = !0, e += ". Build with -sASSERTIONS for more info.";
		var r = new WebAssembly.RuntimeError(e);
		throw (n = ee) == null || n(r), r;
	}
	var v;
	function se() {
		return d("zxing_reader.wasm");
	}
	function ce(e) {
		if (e == v && h) return new Uint8Array(h);
		if (p) return p(e);
		throw "both async and sync fetching of the wasm failed";
	}
	async function le(e) {
		if (!h) try {
			var t = await f(e);
			return new Uint8Array(t);
		} catch {}
		return ce(e);
	}
	async function ue(e, t) {
		try {
			var n = await le(e);
			return await WebAssembly.instantiate(n, t);
		} catch (e) {
			m(`failed to asynchronously prepare wasm: ${e}`), oe(e);
		}
	}
	async function de(e, t, n) {
		if (!e && WebAssembly.instantiateStreaming) try {
			var r = fetch(t, { credentials: "same-origin" });
			return await WebAssembly.instantiateStreaming(r, n);
		} catch (e) {
			m(`wasm streaming compile failed: ${e}`), m("falling back to ArrayBuffer instantiation");
		}
		return ue(t, n);
	}
	function fe() {
		return { a: qn };
	}
	async function pe() {
		function e(e, t) {
			return $ = e.exports, Kn($), ne(), $;
		}
		function t(t) {
			return e(t.instance);
		}
		var n = fe();
		return i.instantiateWasm ? new Promise((t, r) => {
			i.instantiateWasm(n, (n, r) => {
				t(e(n, r));
			});
		}) : (v ??= se(), t(await de(h, v, n)));
	}
	var y, b, x, S, me, C, w, T, he = (e) => {
		for (; e.length > 0;) e.shift()(i);
	}, ge = [], _e = (e) => ge.push(e), ve = [], ye = (e) => ve.push(e), E = (e) => In(e), D = () => Ln(), O = [], be = 0, xe = (e) => {
		var t = new Ce(e);
		return t.get_caught() || (t.set_caught(!0), be--), t.set_rethrown(!1), O.push(t), Pn(e);
	}, k = 0, Se = () => {
		Q(0, 0);
		var e = O.pop();
		Rn(e.excPtr), k = 0;
	};
	class Ce {
		constructor(e) {
			this.excPtr = e, this.ptr = e - 24;
		}
		set_type(e) {
			w[this.ptr + 4 >> 2] = e;
		}
		get_type() {
			return w[this.ptr + 4 >> 2];
		}
		set_destructor(e) {
			w[this.ptr + 8 >> 2] = e;
		}
		get_destructor() {
			return w[this.ptr + 8 >> 2];
		}
		set_caught(e) {
			e = +!!e, x[this.ptr + 12] = e;
		}
		get_caught() {
			return x[this.ptr + 12] != 0;
		}
		set_rethrown(e) {
			e = +!!e, x[this.ptr + 13] = e;
		}
		get_rethrown() {
			return x[this.ptr + 13] != 0;
		}
		init(e, t) {
			this.set_adjusted_ptr(0), this.set_type(e), this.set_destructor(t);
		}
		set_adjusted_ptr(e) {
			w[this.ptr + 16 >> 2] = e;
		}
		get_adjusted_ptr() {
			return w[this.ptr + 16 >> 2];
		}
	}
	var A = (e) => Fn(e), we = (e) => {
		var t = k;
		if (!t) return A(0), 0;
		var n = new Ce(t);
		n.set_adjusted_ptr(t);
		var r = n.get_type();
		if (!r) return A(0), t;
		for (var i of e) {
			if (i === 0 || i === r) break;
			var a = n.ptr + 16;
			if (Bn(i, r, a)) return A(i), t;
		}
		return A(r), t;
	}, Te = () => we([]), Ee = (e) => we([e]), De = (e, t) => we([e, t]), Oe = () => {
		var e = O.pop();
		e || oe("no exception to throw");
		var t = e.excPtr;
		throw e.get_rethrown() || (O.push(e), e.set_rethrown(!0), e.set_caught(!1), be++), zn(t), k = t, k;
	}, ke = (e, t, n) => {
		throw new Ce(e).init(t, n), zn(e), k = e, be++, k;
	}, Ae = () => be, je = (e) => {
		throw k || (k = e), k;
	}, Me = () => oe(""), Ne = {}, Pe = (e) => {
		for (; e.length;) {
			var t = e.pop();
			e.pop()(t);
		}
	};
	function j(e) {
		return this.fromWireType(w[e >> 2]);
	}
	var M = {}, N = {}, Fe = {}, Ie = class extends Error {
		constructor(e) {
			super(e), this.name = "InternalError";
		}
	}, Le = (e) => {
		throw new Ie(e);
	}, P = (e, t, n) => {
		e.forEach((e) => Fe[e] = t);
		function r(t) {
			var r = n(t);
			r.length !== e.length && Le("Mismatched type converter count");
			for (var i = 0; i < e.length; ++i) R(e[i], r[i]);
		}
		var i = Array(t.length), a = [], o = 0;
		{
			let e = t;
			for (let t = 0; t < e.length; ++t) {
				let n = e[t];
				N.hasOwnProperty(n) ? i[t] = N[n] : (a.push(n), M.hasOwnProperty(n) || (M[n] = []), M[n].push(() => {
					i[t] = N[n], ++o, o === a.length && r(i);
				}));
			}
		}
		a.length === 0 && r(i);
	}, Re = (e) => {
		var t = Ne[e];
		delete Ne[e];
		var n = t.rawConstructor, r = t.rawDestructor, i = t.fields, a = i.map((e) => e.getterReturnType).concat(i.map((e) => e.setterArgumentType));
		P([e], a, (e) => {
			var a = {};
			{
				let t = i;
				for (let n = 0; n < t.length; ++n) {
					let r = t[n], o = e[n], s = r.getter, c = r.getterContext, l = e[n + i.length], u = r.setter, d = r.setterContext;
					a[r.fieldName] = {
						read: (e) => o.fromWireType(s(c, e)),
						write: (e, t) => {
							var n = [];
							u(d, e, l.toWireType(n, t)), Pe(n);
						},
						optional: o.optional
					};
				}
			}
			return [{
				name: t.name,
				fromWireType: (e) => {
					var t = {};
					for (var n in a) t[n] = a[n].read(e);
					return r(e), t;
				},
				toWireType: (e, t) => {
					for (var i in a) if (!(i in t) && !a[i].optional) throw TypeError(`Missing field: "${i}"`);
					var o = n();
					for (i in a) a[i].write(o, t[i]);
					return e !== null && e.push(r, o), o;
				},
				readValueFromPointer: j,
				destructorFunction: r
			}];
		});
	}, ze = (e, t, n, r, i) => {}, F = (e) => {
		for (var t = "";;) {
			var n = T[e++];
			if (!n) return t;
			t += String.fromCharCode(n);
		}
	}, I = class extends Error {
		constructor(e) {
			super(e), this.name = "BindingError";
		}
	}, L = (e) => {
		throw new I(e);
	};
	function Be(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
		var r = t.name;
		if (e || L(`type "${r}" must have a positive integer typeid pointer`), N.hasOwnProperty(e)) {
			if (n.ignoreDuplicateRegistrations) return;
			L(`Cannot register type '${r}' twice`);
		}
		if (N[e] = t, delete Fe[e], M.hasOwnProperty(e)) {
			var i = M[e];
			delete M[e], i.forEach((e) => e());
		}
	}
	function R(e, t) {
		return Be(e, t, arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {});
	}
	var Ve = (e, t, n, r) => {
		t = F(t), R(e, {
			name: t,
			fromWireType: function(e) {
				return !!e;
			},
			toWireType: function(e, t) {
				return t ? n : r;
			},
			readValueFromPointer: function(e) {
				return this.fromWireType(T[e]);
			},
			destructorFunction: null
		});
	}, He = (e) => ({
		count: e.count,
		deleteScheduled: e.deleteScheduled,
		preservePointerOnDelete: e.preservePointerOnDelete,
		ptr: e.ptr,
		ptrType: e.ptrType,
		smartPtr: e.smartPtr,
		smartPtrType: e.smartPtrType
	}), Ue = (e) => {
		function t(e) {
			return e.$$.ptrType.registeredClass.name;
		}
		L(t(e) + " instance already deleted");
	}, We = !1, Ge = (e) => {}, Ke = (e) => {
		e.smartPtr ? e.smartPtrType.rawDestructor(e.smartPtr) : e.ptrType.registeredClass.rawDestructor(e.ptr);
	}, qe = (e) => {
		--e.count.value, e.count.value === 0 && Ke(e);
	}, z = (e) => globalThis.FinalizationRegistry ? (We = new FinalizationRegistry((e) => {
		qe(e.$$);
	}), z = (e) => {
		var t = e.$$;
		if (t.smartPtr) {
			var n = { $$: t };
			We.register(e, n, e);
		}
		return e;
	}, Ge = (e) => We.unregister(e), z(e)) : (z = (e) => e, e), B = [], Je = () => {
		for (; B.length;) {
			var e = B.pop();
			e.$$.deleteScheduled = !1, e.delete();
		}
	}, Ye, Xe = () => {
		let e = V.prototype;
		Object.assign(e, {
			isAliasOf(e) {
				if (!(this instanceof V) || !(e instanceof V)) return !1;
				var t = this.$$.ptrType.registeredClass, n = this.$$.ptr;
				e.$$ = e.$$;
				for (var r = e.$$.ptrType.registeredClass, i = e.$$.ptr; t.baseClass;) n = t.upcast(n), t = t.baseClass;
				for (; r.baseClass;) i = r.upcast(i), r = r.baseClass;
				return t === r && n === i;
			},
			clone() {
				if (this.$$.ptr || Ue(this), this.$$.preservePointerOnDelete) return this.$$.count.value += 1, this;
				var e = z(Object.create(Object.getPrototypeOf(this), { $$: { value: He(this.$$) } }));
				return e.$$.count.value += 1, e.$$.deleteScheduled = !1, e;
			},
			delete() {
				this.$$.ptr || Ue(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && L("Object already scheduled for deletion"), Ge(this), qe(this.$$), this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0, this.$$.ptr = void 0);
			},
			isDeleted() {
				return !this.$$.ptr;
			},
			deleteLater() {
				return this.$$.ptr || Ue(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && L("Object already scheduled for deletion"), B.push(this), B.length === 1 && Ye && Ye(Je), this.$$.deleteScheduled = !0, this;
			}
		});
		let t = Symbol.dispose;
		t && (e[t] = e.delete);
	};
	function V() {}
	var Ze = (e, t) => Object.defineProperty(t, "name", { value: e }), Qe = {}, $e = (e, t, n) => {
		if (e[t].overloadTable === void 0) {
			var r = e[t];
			e[t] = function() {
				var r = [...arguments];
				return e[t].overloadTable.hasOwnProperty(r.length) || L(`Function '${n}' called with an invalid number of arguments (${r.length}) - expects one of (${e[t].overloadTable})!`), e[t].overloadTable[r.length].apply(this, r);
			}, e[t].overloadTable = [], e[t].overloadTable[r.argCount] = r;
		}
	}, et = (e, t, n) => {
		i.hasOwnProperty(e) ? ((n === void 0 || i[e].overloadTable !== void 0 && i[e].overloadTable[n] !== void 0) && L(`Cannot register public name '${e}' twice`), $e(i, e, e), i[e].overloadTable.hasOwnProperty(n) && L(`Cannot register multiple overloads of a function with the same number of arguments (${n})!`), i[e].overloadTable[n] = t) : (i[e] = t, i[e].argCount = n);
	}, tt = 48, nt = 57, rt = (e) => {
		e = e.replace(/[^a-zA-Z0-9_]/g, "$");
		var t = e.charCodeAt(0);
		return t >= tt && t <= nt ? `_${e}` : e;
	};
	function it(e, t, n, r, i, a, o, s) {
		this.name = e, this.constructor = t, this.instancePrototype = n, this.rawDestructor = r, this.baseClass = i, this.getActualType = a, this.upcast = o, this.downcast = s, this.pureVirtualFunctions = [];
	}
	var at = (e, t, n) => {
		for (; t !== n;) t.upcast || L(`Expected null or instance of ${n.name}, got an instance of ${t.name}`), e = t.upcast(e), t = t.baseClass;
		return e;
	}, ot = (e) => {
		if (e === null) return "null";
		var t = typeof e;
		return t === "object" || t === "array" || t === "function" ? e.toString() : "" + e;
	};
	function st(e, t) {
		if (t === null) return this.isReference && L(`null is not a valid ${this.name}`), 0;
		t.$$ || L(`Cannot pass "${ot(t)}" as a ${this.name}`), t.$$.ptr || L(`Cannot pass deleted object as a pointer of type ${this.name}`);
		var n = t.$$.ptrType.registeredClass;
		return at(t.$$.ptr, n, this.registeredClass);
	}
	function ct(e, t) {
		var n;
		if (t === null) return this.isReference && L(`null is not a valid ${this.name}`), this.isSmartPointer ? (n = this.rawConstructor(), e !== null && e.push(this.rawDestructor, n), n) : 0;
		(!t || !t.$$) && L(`Cannot pass "${ot(t)}" as a ${this.name}`), t.$$.ptr || L(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.isConst && t.$$.ptrType.isConst && L(`Cannot convert argument of type ${t.$$.smartPtrType ? t.$$.smartPtrType.name : t.$$.ptrType.name} to parameter type ${this.name}`);
		var r = t.$$.ptrType.registeredClass;
		if (n = at(t.$$.ptr, r, this.registeredClass), this.isSmartPointer) switch (t.$$.smartPtr === void 0 && L("Passing raw pointer to smart pointer is illegal"), this.sharingPolicy) {
			case 0:
				t.$$.smartPtrType === this ? n = t.$$.smartPtr : L(`Cannot convert argument of type ${t.$$.smartPtrType ? t.$$.smartPtrType.name : t.$$.ptrType.name} to parameter type ${this.name}`);
				break;
			case 1:
				n = t.$$.smartPtr;
				break;
			case 2:
				if (t.$$.smartPtrType === this) n = t.$$.smartPtr;
				else {
					var i = t.clone();
					n = this.rawShare(n, J.toHandle(() => i.delete())), e !== null && e.push(this.rawDestructor, n);
				}
				break;
			default: L("Unsupported sharing policy");
		}
		return n;
	}
	function lt(e, t) {
		if (t === null) return this.isReference && L(`null is not a valid ${this.name}`), 0;
		t.$$ || L(`Cannot pass "${ot(t)}" as a ${this.name}`), t.$$.ptr || L(`Cannot pass deleted object as a pointer of type ${this.name}`), t.$$.ptrType.isConst && L(`Cannot convert argument of type ${t.$$.ptrType.name} to parameter type ${this.name}`);
		var n = t.$$.ptrType.registeredClass;
		return at(t.$$.ptr, n, this.registeredClass);
	}
	var ut = (e, t, n) => {
		if (t === n) return e;
		if (n.baseClass === void 0) return null;
		var r = ut(e, t, n.baseClass);
		return r === null ? null : n.downcast(r);
	}, dt = {}, ft = (e, t) => {
		for (t === void 0 && L("ptr should not be undefined"); e.baseClass;) t = e.upcast(t), e = e.baseClass;
		return t;
	}, pt = (e, t) => (t = ft(e, t), dt[t]), H = (e, t) => ((!t.ptrType || !t.ptr) && Le("makeClassHandle requires ptr and ptrType"), !!t.smartPtrType != !!t.smartPtr && Le("Both smartPtrType and smartPtr must be specified"), t.count = { value: 1 }, z(Object.create(e, { $$: {
		value: t,
		writable: !0
	} })));
	function mt(e) {
		var t = this.getPointee(e);
		if (!t) return this.destructor(e), null;
		var n = pt(this.registeredClass, t);
		if (n !== void 0) {
			if (n.$$.count.value === 0) return n.$$.ptr = t, n.$$.smartPtr = e, n.clone();
			var r = n.clone();
			return this.destructor(e), r;
		}
		function i() {
			return this.isSmartPointer ? H(this.registeredClass.instancePrototype, {
				ptrType: this.pointeeType,
				ptr: t,
				smartPtrType: this,
				smartPtr: e
			}) : H(this.registeredClass.instancePrototype, {
				ptrType: this,
				ptr: e
			});
		}
		var a = Qe[this.registeredClass.getActualType(t)];
		if (!a) return i.call(this);
		var o = this.isConst ? a.constPointerType : a.pointerType, s = ut(t, this.registeredClass, o.registeredClass);
		return s === null ? i.call(this) : this.isSmartPointer ? H(o.registeredClass.instancePrototype, {
			ptrType: o,
			ptr: s,
			smartPtrType: this,
			smartPtr: e
		}) : H(o.registeredClass.instancePrototype, {
			ptrType: o,
			ptr: s
		});
	}
	var ht = () => {
		Object.assign(U.prototype, {
			getPointee(e) {
				return this.rawGetPointee && (e = this.rawGetPointee(e)), e;
			},
			destructor(e) {
				var t;
				(t = this.rawDestructor) == null || t.call(this, e);
			},
			readValueFromPointer: j,
			fromWireType: mt
		});
	};
	function U(e, t, n, r, i, a, o, s, c, l, u) {
		this.name = e, this.registeredClass = t, this.isReference = n, this.isConst = r, this.isSmartPointer = i, this.pointeeType = a, this.sharingPolicy = o, this.rawGetPointee = s, this.rawConstructor = c, this.rawShare = l, this.rawDestructor = u, !i && t.baseClass === void 0 ? r ? (this.toWireType = st, this.destructorFunction = null) : (this.toWireType = lt, this.destructorFunction = null) : this.toWireType = ct;
	}
	var gt = (e, t, n) => {
		i.hasOwnProperty(e) || Le("Replacing nonexistent public symbol"), i[e].overloadTable !== void 0 && n !== void 0 ? i[e].overloadTable[n] = t : (i[e] = t, i[e].argCount = n);
	}, W = {}, _t = (e, t, n) => {
		e = e.replace(/p/g, "i");
		var r = W[e];
		return r(t, ...n);
	}, vt = [], G = (e) => {
		var t = vt[e];
		return t || (vt[e] = t = Gn.get(e)), t;
	}, yt = function(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
		if (arguments.length > 3 && arguments[3] !== void 0 && arguments[3], e.includes("j")) return _t(e, t, n);
		var r = G(t)(...n);
		function i(e) {
			return e;
		}
		return i(r);
	}, bt = function(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
		return function() {
			return yt(e, t, [...arguments], n);
		};
	}, K = function(e, t) {
		arguments.length > 2 && arguments[2] !== void 0 && arguments[2], e = F(e);
		function n() {
			return e.includes("j") ? bt(e, t) : G(t);
		}
		var r = n();
		return typeof r != "function" && L(`unknown function pointer with signature ${e}: ${t}`), r;
	};
	class xt extends Error {}
	var St = (e) => {
		var t = Mn(e), n = F(t);
		return Z(t), n;
	}, Ct = (e, t) => {
		var n = [], r = {};
		function i(e) {
			if (!r[e] && !N[e]) {
				if (Fe[e]) {
					Fe[e].forEach(i);
					return;
				}
				n.push(e), r[e] = !0;
			}
		}
		throw t.forEach(i), new xt(`${e}: ` + n.map(St).join([", "]));
	}, wt = (e, t, n, r, i, a, o, s, c, l, u, d, f) => {
		u = F(u), a = K(i, a), s && (s = K(o, s)), l && (l = K(c, l)), f = K(d, f);
		var p = rt(u);
		et(p, function() {
			Ct(`Cannot construct ${u} due to unbound types`, [r]);
		}), P([
			e,
			t,
			n
		], r ? [r] : [], (t) => {
			t = t[0];
			var n, i;
			r ? (n = t.registeredClass, i = n.instancePrototype) : i = V.prototype;
			var o = Ze(u, function() {
				if (Object.getPrototypeOf(this) !== c) throw new I(`Use 'new' to construct ${u}`);
				if (d.constructor_body === void 0) throw new I(`${u} has no accessible constructor`);
				var e = [...arguments], t = d.constructor_body[e.length];
				if (t === void 0) throw new I(`Tried to invoke ctor of ${u} with invalid number of parameters (${e.length}) - expected (${Object.keys(d.constructor_body).toString()}) parameters instead!`);
				return t.apply(this, e);
			}), c = Object.create(i, { constructor: { value: o } });
			o.prototype = c;
			var d = new it(u, o, c, f, n, a, s, l);
			if (d.baseClass) {
				var m;
				(m = d.baseClass).__derivedClasses ?? (m.__derivedClasses = []), d.baseClass.__derivedClasses.push(d);
			}
			var h = new U(u, d, !0, !1, !1), g = new U(u + "*", d, !1, !1, !1), _ = new U(u + " const*", d, !1, !0, !1);
			return Qe[e] = {
				pointerType: g,
				constPointerType: _
			}, gt(p, o), [
				h,
				g,
				_
			];
		});
	}, Tt = (e, t) => {
		for (var n = [], r = 0; r < e; r++) n.push(w[t + r * 4 >> 2]);
		return n;
	};
	function Et(e) {
		for (var t = 1; t < e.length; ++t) if (e[t] !== null && e[t].destructorFunction === void 0) return !0;
		return !1;
	}
	function Dt(e, t, n, r, i, a) {
		var o = t.length;
		o < 2 && L("argTypes array size mismatch! Must at least get return value and 'this' types!");
		var s = t[1] !== null && n !== null, c = Et(t), l = !t[0].isVoid, u = o - 2, d = Array(u), f = [], p = [];
		return Ze(e, function() {
			p.length = 0;
			var e;
			f.length = s ? 2 : 1, f[0] = i, s && (e = t[1].toWireType(p, this), f[1] = e);
			for (var n = 0; n < u; ++n) d[n] = t[n + 2].toWireType(p, n < 0 || arguments.length <= n ? void 0 : arguments[n]), f.push(d[n]);
			var a = r(...f);
			function o(n) {
				if (c) Pe(p);
				else for (var r = s ? 1 : 2; r < t.length; r++) {
					var i = r === 1 ? e : d[r - 2];
					t[r].destructorFunction !== null && t[r].destructorFunction(i);
				}
				if (l) return t[0].fromWireType(n);
			}
			return o(a);
		});
	}
	var Ot = (e, t, n, r, i, a) => {
		var o = Tt(t, n);
		i = K(r, i), P([], [e], (e) => {
			e = e[0];
			var n = `constructor ${e.name}`;
			if (e.registeredClass.constructor_body === void 0 && (e.registeredClass.constructor_body = []), e.registeredClass.constructor_body[t - 1] !== void 0) throw new I(`Cannot register multiple constructors with identical number of parameters (${t - 1}) for class '${e.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
			return e.registeredClass.constructor_body[t - 1] = () => {
				Ct(`Cannot construct ${e.name} due to unbound types`, o);
			}, P([], o, (r) => (r.splice(1, 0, null), e.registeredClass.constructor_body[t - 1] = Dt(n, r, null, i, a), [])), [];
		});
	}, kt = (e) => {
		e = e.trim();
		let t = e.indexOf("(");
		return t === -1 ? e : e.slice(0, t);
	}, At = (e, t, n, r, i, a, o, s, c, l) => {
		var u = Tt(n, r);
		t = F(t), t = kt(t), a = K(i, a, c), P([], [e], (e) => {
			e = e[0];
			var r = `${e.name}.${t}`;
			t.startsWith("@@") && (t = Symbol[t.substring(2)]), s && e.registeredClass.pureVirtualFunctions.push(t);
			function i() {
				Ct(`Cannot call ${r} due to unbound types`, u);
			}
			var l = e.registeredClass.instancePrototype, d = l[t];
			return d === void 0 || d.overloadTable === void 0 && d.className !== e.name && d.argCount === n - 2 ? (i.argCount = n - 2, i.className = e.name, l[t] = i) : ($e(l, t, r), l[t].overloadTable[n - 2] = i), P([], u, (i) => {
				var s = Dt(r, i, e, a, o, c);
				return l[t].overloadTable === void 0 ? (s.argCount = n - 2, l[t] = s) : l[t].overloadTable[n - 2] = s, [];
			}), [];
		});
	}, jt = [], q = [
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
	], Mt = (e) => {
		e > 9 && --q[e + 1] === 0 && (q[e] = void 0, jt.push(e));
	}, J = {
		toValue: (e) => (e || L(`Cannot use deleted val. handle = ${e}`), q[e]),
		toHandle: (e) => {
			switch (e) {
				case void 0: return 2;
				case null: return 4;
				case !0: return 6;
				case !1: return 8;
				default: {
					let t = jt.pop() || q.length;
					return q[t] = e, q[t + 1] = 1, t;
				}
			}
		}
	}, Nt = {
		name: "emscripten::val",
		fromWireType: (e) => {
			var t = J.toValue(e);
			return Mt(e), t;
		},
		toWireType: (e, t) => J.toHandle(t),
		readValueFromPointer: j,
		destructorFunction: null
	}, Pt = (e) => R(e, Nt), Ft = (e, t) => {
		switch (t) {
			case 4: return function(e) {
				return this.fromWireType(S[e >> 2]);
			};
			case 8: return function(e) {
				return this.fromWireType(me[e >> 3]);
			};
			default: throw TypeError(`invalid float width (${t}): ${e}`);
		}
	}, It = (e, t, n) => {
		t = F(t), R(e, {
			name: t,
			fromWireType: (e) => e,
			toWireType: (e, t) => t,
			readValueFromPointer: Ft(t, n),
			destructorFunction: null
		});
	}, Lt = (e, t, n, r, i, a, o, s) => {
		var c = Tt(t, n);
		e = F(e), e = kt(e), i = K(r, i, o), et(e, function() {
			Ct(`Cannot call ${e} due to unbound types`, c);
		}, t - 1), P([], c, (n) => {
			var r = [n[0], null].concat(n.slice(1));
			return gt(e, Dt(e, r, null, i, a, o), t - 1), [];
		});
	}, Rt = (e, t, n) => {
		switch (t) {
			case 1: return n ? (e) => x[e] : (e) => T[e];
			case 2: return n ? (e) => y[e >> 1] : (e) => C[e >> 1];
			case 4: return n ? (e) => b[e >> 2] : (e) => w[e >> 2];
			default: throw TypeError(`invalid integer width (${t}): ${e}`);
		}
	}, zt = (e, t, n, r, i) => {
		t = F(t);
		let a = r === 0, o = (e) => e;
		if (a) {
			var s = 32 - 8 * n;
			o = (e) => e << s >>> s, i = o(i);
		}
		R(e, {
			name: t,
			fromWireType: o,
			toWireType: (e, t) => t,
			readValueFromPointer: Rt(t, n, r !== 0),
			destructorFunction: null
		});
	}, Bt = (e, t, n) => {
		let r = (e, t) => {
			let n = 0;
			return {
				next() {
					if (n >= e) return { done: !0 };
					let r = n;
					return n++, {
						value: t(r),
						done: !1
					};
				},
				[Symbol.iterator]() {
					return this;
				}
			};
		};
		e[Symbol.iterator] || (e[Symbol.iterator] = function() {
			let e = this[t]();
			return r(e, (e) => this[n](e));
		});
	}, Vt = (e, t, n, r) => {
		n = F(n), r = F(r), P([], [e, t], (e) => {
			let t = e[0];
			return Bt(t.registeredClass.instancePrototype, n, r), [];
		});
	}, Ht = (e, t, n) => {
		var r = [
			Int8Array,
			Uint8Array,
			Int16Array,
			Uint16Array,
			Int32Array,
			Uint32Array,
			Float32Array,
			Float64Array
		][t];
		function i(e) {
			var t = w[e >> 2], n = w[e + 4 >> 2];
			return new r(x.buffer, n, t);
		}
		n = F(n), R(e, {
			name: n,
			fromWireType: i,
			readValueFromPointer: i
		}, { ignoreDuplicateRegistrations: !0 });
	}, Ut = Object.assign({ optional: !0 }, Nt), Wt = (e, t) => {
		R(e, Ut);
	}, Gt = (e, t, n, r) => {
		if (!(r > 0)) return 0;
		for (var i = n, a = n + r - 1, o = 0; o < e.length; ++o) {
			var s = e.codePointAt(o);
			if (s <= 127) {
				if (n >= a) break;
				t[n++] = s;
			} else if (s <= 2047) {
				if (n + 1 >= a) break;
				t[n++] = 192 | s >> 6, t[n++] = 128 | s & 63;
			} else if (s <= 65535) {
				if (n + 2 >= a) break;
				t[n++] = 224 | s >> 12, t[n++] = 128 | s >> 6 & 63, t[n++] = 128 | s & 63;
			} else {
				if (n + 3 >= a) break;
				t[n++] = 240 | s >> 18, t[n++] = 128 | s >> 12 & 63, t[n++] = 128 | s >> 6 & 63, t[n++] = 128 | s & 63, o++;
			}
		}
		return t[n] = 0, n - i;
	}, Y = (e, t, n) => Gt(e, T, t, n), Kt = (e) => {
		for (var t = 0, n = 0; n < e.length; ++n) {
			var r = e.charCodeAt(n);
			r <= 127 ? t++ : r <= 2047 ? t += 2 : r >= 55296 && r <= 57343 ? (t += 4, ++n) : t += 3;
		}
		return t;
	}, qt = globalThis.TextDecoder && new TextDecoder(), Jt = (e, t, n, r) => {
		var i = t + n;
		if (r) return i;
		for (; e[t] && !(t >= i);) ++t;
		return t;
	}, Yt = function(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 ? arguments[2] : void 0, r = arguments.length > 3 ? arguments[3] : void 0;
		var i = Jt(e, t, n, r);
		if (i - t > 16 && e.buffer && qt) return qt.decode(e.subarray(t, i));
		for (var a = ""; t < i;) {
			var o = e[t++];
			if (!(o & 128)) {
				a += String.fromCharCode(o);
				continue;
			}
			var s = e[t++] & 63;
			if ((o & 224) == 192) {
				a += String.fromCharCode((o & 31) << 6 | s);
				continue;
			}
			var c = e[t++] & 63;
			if (o = (o & 240) == 224 ? (o & 15) << 12 | s << 6 | c : (o & 7) << 18 | s << 12 | c << 6 | e[t++] & 63, o < 65536) a += String.fromCharCode(o);
			else {
				var l = o - 65536;
				a += String.fromCharCode(55296 | l >> 10, 56320 | l & 1023);
			}
		}
		return a;
	}, Xt = (e, t, n) => e ? Yt(T, e, t, n) : "", Zt = (e, t) => {
		t = F(t);
		var n = !0;
		R(e, {
			name: t,
			fromWireType(e) {
				var t = w[e >> 2], r = e + 4, i;
				if (n) i = Xt(r, t, !0);
				else {
					i = "";
					for (var a = 0; a < t; ++a) i += String.fromCharCode(T[r + a]);
				}
				return Z(e), i;
			},
			toWireType(e, t) {
				t instanceof ArrayBuffer && (t = new Uint8Array(t));
				var r, i = typeof t == "string";
				i || ArrayBuffer.isView(t) && t.BYTES_PER_ELEMENT == 1 || L("Cannot pass non-string to std::string"), r = n && i ? Kt(t) : t.length;
				var a = Nn(4 + r + 1), o = a + 4;
				if (w[a >> 2] = r, i) if (n) Y(t, o, r + 1);
				else for (var s = 0; s < r; ++s) {
					var c = t.charCodeAt(s);
					c > 255 && (Z(a), L("String has UTF-16 code units that do not fit in 8 bits")), T[o + s] = c;
				}
				else T.set(t, o);
				return e !== null && e.push(Z, a), a;
			},
			readValueFromPointer: j,
			destructorFunction(e) {
				Z(e);
			}
		});
	}, Qt = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0, $t = (e, t, n) => {
		var r = e >> 1, i = Jt(C, r, t / 2, n);
		if (i - r > 16 && Qt) return Qt.decode(C.subarray(r, i));
		for (var a = "", o = r; o < i; ++o) {
			var s = C[o];
			a += String.fromCharCode(s);
		}
		return a;
	}, en = (e, t, n) => {
		if (n ??= 2147483647, n < 2) return 0;
		n -= 2;
		for (var r = t, i = n < e.length * 2 ? n / 2 : e.length, a = 0; a < i; ++a) {
			var o = e.charCodeAt(a);
			y[t >> 1] = o, t += 2;
		}
		return y[t >> 1] = 0, t - r;
	}, tn = (e) => e.length * 2, nn = (e, t, n) => {
		for (var r = "", i = e >> 2, a = 0; !(a >= t / 4); a++) {
			var o = w[i + a];
			if (!o && !n) break;
			r += String.fromCodePoint(o);
		}
		return r;
	}, rn = (e, t, n) => {
		if (n ??= 2147483647, n < 4) return 0;
		for (var r = t, i = r + n - 4, a = 0; a < e.length; ++a) {
			var o = e.codePointAt(a);
			if (o > 65535 && a++, b[t >> 2] = o, t += 4, t + 4 > i) break;
		}
		return b[t >> 2] = 0, t - r;
	}, an = (e) => {
		for (var t = 0, n = 0; n < e.length; ++n) e.codePointAt(n) > 65535 && n++, t += 4;
		return t;
	}, on = (e, t, n) => {
		n = F(n);
		var r, i, a;
		t === 2 ? (r = $t, i = en, a = tn) : (r = nn, i = rn, a = an), R(e, {
			name: n,
			fromWireType: (e) => {
				var n = w[e >> 2], i = r(e + 4, n * t, !0);
				return Z(e), i;
			},
			toWireType: (e, r) => {
				typeof r != "string" && L(`Cannot pass non-string to C++ string type ${n}`);
				var o = a(r), s = Nn(4 + o + t);
				return w[s >> 2] = o / t, i(r, s + 4, o + t), e !== null && e.push(Z, s), s;
			},
			readValueFromPointer: j,
			destructorFunction(e) {
				Z(e);
			}
		});
	}, sn = (e, t, n, r, i, a) => {
		Ne[e] = {
			name: F(t),
			rawConstructor: K(n, r),
			rawDestructor: K(i, a),
			fields: []
		};
	}, cn = (e, t, n, r, i, a, o, s, c, l) => {
		Ne[e].fields.push({
			fieldName: F(t),
			getterReturnType: n,
			getter: K(r, i),
			getterContext: a,
			setterArgumentType: o,
			setter: K(s, c),
			setterContext: l
		});
	}, ln = (e, t) => {
		t = F(t), R(e, {
			isVoid: !0,
			name: t,
			fromWireType: () => void 0,
			toWireType: (e, t) => void 0
		});
	}, un = [], dn = (e) => {
		var t = un.length;
		return un.push(e), t;
	}, fn = (e, t) => {
		var n = N[e];
		return n === void 0 && L(`${t} has unknown type ${St(e)}`), n;
	}, pn = (e, t) => {
		for (var n = Array(e), r = 0; r < e; ++r) n[r] = fn(w[t + r * 4 >> 2], `parameter ${r}`);
		return n;
	}, mn = (e, t, n) => {
		var r = [], i = e(r, n);
		return r.length && (w[t >> 2] = J.toHandle(r)), i;
	}, hn = {}, gn = (e) => {
		var t = hn[e];
		return t === void 0 ? F(e) : t;
	}, _n = (e, t, n) => {
		var [r, ...i] = pn(e, t), a = r.toWireType.bind(r), o = i.map((e) => e.readValueFromPointer.bind(e));
		e--;
		var s = Array(e);
		return dn(Ze(`methodCaller<(${i.map((e) => e.name)}) => ${r.name}>`, (t, r, i, c) => {
			for (var l = 0, u = 0; u < e; ++u) s[u] = o[u](c + l), l += 8;
			var d;
			switch (n) {
				case 0:
					d = J.toValue(t).apply(null, s);
					break;
				case 2:
					d = Reflect.construct(J.toValue(t), s);
					break;
				case 3:
					d = s[0];
					break;
				case 1: d = J.toValue(t)[gn(r)](...s);
			}
			return mn(a, i, d);
		}));
	}, vn = (e) => e ? (e = gn(e), J.toHandle(globalThis[e])) : J.toHandle(globalThis), yn = (e) => {
		e > 9 && (q[e + 1] += 1);
	}, bn = (e, t, n, r, i) => un[e](t, n, r, i), xn = (e) => {
		Pe(J.toValue(e)), Mt(e);
	}, Sn = (e, t, n, r) => {
		var i = (/* @__PURE__ */ new Date()).getFullYear(), a = new Date(i, 0, 1), o = new Date(i, 6, 1), s = a.getTimezoneOffset(), c = o.getTimezoneOffset(), l = Math.max(s, c);
		w[e >> 2] = l * 60, b[t >> 2] = Number(s != c);
		var u = (e) => {
			var t = e >= 0 ? "-" : "+", n = Math.abs(e);
			return `UTC${t}${String(Math.floor(n / 60)).padStart(2, "0")}${String(n % 60).padStart(2, "0")}`;
		}, d = u(s), f = u(c);
		c < s ? (Y(d, n, 17), Y(f, r, 17)) : (Y(d, r, 17), Y(f, n, 17));
	}, Cn = () => 2147483648, wn = (e, t) => Math.ceil(e / t) * t, Tn = (e) => {
		var t = (e - Wn.buffer.byteLength + 65535) / 65536 | 0;
		try {
			return Wn.grow(t), ne(), 1;
		} catch {}
	}, En = (e) => {
		var t = T.length;
		e >>>= 0;
		var n = Cn();
		if (e > n) return !1;
		for (var r = 1; r <= 4; r *= 2) {
			var i = t * (1 + .2 / r);
			if (i = Math.min(i, e + 100663296), Tn(Math.min(n, wn(Math.max(e, i), 65536)))) return !0;
		}
		return !1;
	}, Dn = {}, On = () => c || "./this.program", X = () => {
		if (!X.strings) {
			var e, t, n = {
				USER: "web_user",
				LOGNAME: "web_user",
				PATH: "/",
				PWD: "/",
				HOME: "/home/web_user",
				LANG: ((e = (t = globalThis.navigator) == null ? void 0 : t.language) == null ? "C" : e).replace("-", "_") + ".UTF-8",
				_: On()
			};
			for (var r in Dn) Dn[r] === void 0 ? delete n[r] : n[r] = Dn[r];
			var i = [];
			for (var r in n) i.push(`${r}=${n[r]}`);
			X.strings = i;
		}
		return X.strings;
	}, kn = (e, t) => {
		var n = 0, r = 0;
		for (var i of X()) {
			var a = t + n;
			w[e + r >> 2] = a, n += Y(i, a, Infinity) + 1, r += 4;
		}
		return 0;
	}, An = (e, t) => {
		var n = X();
		w[e >> 2] = n.length;
		var r = 0;
		for (var i of n) r += Kt(i) + 1;
		return w[t >> 2] = r, 0;
	}, jn = (e) => e;
	if (Xe(), ht(), i.noExitRuntime && i.noExitRuntime, i.print && i.print, i.printErr && (m = i.printErr), i.wasmBinary && (h = i.wasmBinary), i.arguments && i.arguments, i.thisProgram && (c = i.thisProgram), i.preInit) for (typeof i.preInit == "function" && (i.preInit = [i.preInit]); i.preInit.length > 0;) i.preInit.shift()();
	var Mn, Z, Nn, Pn, Q, Fn, In, Ln, Rn, zn, Bn, Vn, Hn, Un, Wn, Gn;
	function Kn(e) {
		Mn = e.za, Z = i._free = e.Aa, Nn = i._malloc = e.Ca, Pn = e.Da, Q = e.Ea, Fn = e.Fa, In = e.Ga, Ln = e.Ha, Rn = e.Ia, zn = e.Ja, Bn = e.Ka, W.viijii = e.La, Vn = W.viijjijjjjjj = e.Ma, Hn = W.iiijj = e.Na, Un = W.jiiii = e.Oa, W.iiiiij = e.Pa, W.iiiiijj = e.Qa, W.iiiiiijj = e.Ra, Wn = e.xa, Gn = e.Ba;
	}
	var qn = {
		q: xe,
		x: Se,
		a: Te,
		i: Ee,
		m: De,
		S: Oe,
		p: ke,
		fa: Ae,
		d: je,
		ba: Me,
		ua: Re,
		aa: ze,
		oa: Ve,
		sa: wt,
		ra: Ot,
		H: At,
		ma: Pt,
		X: It,
		Y: Lt,
		A: zt,
		qa: Vt,
		u: Ht,
		ta: Wt,
		na: Zt,
		T: on,
		I: sn,
		va: cn,
		pa: ln,
		O: _n,
		wa: Mt,
		F: vn,
		U: yn,
		N: bn,
		ha: xn,
		ca: Sn,
		ga: En,
		da: kn,
		ea: An,
		ka: mr,
		M: _r,
		B: Cr,
		P: tr,
		V: Tr,
		s: Er,
		b: Xn,
		C: gr,
		ia: xr,
		c: Qn,
		Q: Sr,
		h: er,
		j: sr,
		r: cr,
		R: hr,
		t: ur,
		G: dr,
		D: fr,
		K: Dr,
		_: Ar,
		Z: jr,
		f: nr,
		l: Jn,
		e: Zn,
		W: vr,
		g: $n,
		L: wr,
		k: Yn,
		ja: yr,
		o: lr,
		y: ir,
		v: pr,
		E: or,
		w: br,
		n: rr,
		J: Or,
		la: ar,
		$: kr,
		z: jn
	};
	function Jn(e, t) {
		var n = D();
		try {
			G(e)(t);
		} catch (e) {
			if (E(n), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function Yn(e, t, n, r, i) {
		var a = D();
		try {
			G(e)(t, n, r, i);
		} catch (e) {
			if (E(a), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function Xn(e, t) {
		var n = D();
		try {
			return G(e)(t);
		} catch (e) {
			if (E(n), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function Zn(e, t, n) {
		var r = D();
		try {
			G(e)(t, n);
		} catch (e) {
			if (E(r), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function Qn(e, t, n) {
		var r = D();
		try {
			return G(e)(t, n);
		} catch (e) {
			if (E(r), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function $n(e, t, n, r) {
		var i = D();
		try {
			G(e)(t, n, r);
		} catch (e) {
			if (E(i), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function er(e, t, n, r) {
		var i = D();
		try {
			return G(e)(t, n, r);
		} catch (e) {
			if (E(i), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function tr(e, t, n, r, i, a) {
		var o = D();
		try {
			return G(e)(t, n, r, i, a);
		} catch (e) {
			if (E(o), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function nr(e) {
		var t = D();
		try {
			G(e)();
		} catch (e) {
			if (E(t), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function rr(e, t, n, r, i, a, o, s, c, l, u) {
		var d = D();
		try {
			G(e)(t, n, r, i, a, o, s, c, l, u);
		} catch (e) {
			if (E(d), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function ir(e, t, n, r, i, a, o) {
		var s = D();
		try {
			G(e)(t, n, r, i, a, o);
		} catch (e) {
			if (E(s), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function ar(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g) {
		var _ = D();
		try {
			G(e)(t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g);
		} catch (e) {
			if (E(_), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function or(e, t, n, r, i, a, o, s, c) {
		var l = D();
		try {
			G(e)(t, n, r, i, a, o, s, c);
		} catch (e) {
			if (E(l), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function sr(e, t, n, r, i) {
		var a = D();
		try {
			return G(e)(t, n, r, i);
		} catch (e) {
			if (E(a), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function cr(e, t, n, r, i, a) {
		var o = D();
		try {
			return G(e)(t, n, r, i, a);
		} catch (e) {
			if (E(o), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function lr(e, t, n, r, i, a) {
		var o = D();
		try {
			G(e)(t, n, r, i, a);
		} catch (e) {
			if (E(o), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function ur(e, t, n, r, i, a, o) {
		var s = D();
		try {
			return G(e)(t, n, r, i, a, o);
		} catch (e) {
			if (E(s), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function dr(e, t, n, r, i, a, o, s) {
		var c = D();
		try {
			return G(e)(t, n, r, i, a, o, s);
		} catch (e) {
			if (E(c), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function fr(e, t, n, r, i, a, o, s, c) {
		var l = D();
		try {
			return G(e)(t, n, r, i, a, o, s, c);
		} catch (e) {
			if (E(l), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function pr(e, t, n, r, i, a, o, s) {
		var c = D();
		try {
			G(e)(t, n, r, i, a, o, s);
		} catch (e) {
			if (E(c), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function mr(e, t, n) {
		var r = D();
		try {
			return G(e)(t, n);
		} catch (e) {
			if (E(r), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function hr(e, t, n, r, i, a, o) {
		var s = D();
		try {
			return G(e)(t, n, r, i, a, o);
		} catch (e) {
			if (E(s), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function gr(e, t, n, r) {
		var i = D();
		try {
			return G(e)(t, n, r);
		} catch (e) {
			if (E(i), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function _r(e, t, n, r) {
		var i = D();
		try {
			return G(e)(t, n, r);
		} catch (e) {
			if (E(i), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function vr(e, t, n, r, i, a, o, s, c) {
		var l = D();
		try {
			G(e)(t, n, r, i, a, o, s, c);
		} catch (e) {
			if (E(l), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function yr(e, t, n, r, i, a, o, s) {
		var c = D();
		try {
			G(e)(t, n, r, i, a, o, s);
		} catch (e) {
			if (E(c), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function br(e, t, n, r, i, a, o, s, c, l) {
		var u = D();
		try {
			G(e)(t, n, r, i, a, o, s, c, l);
		} catch (e) {
			if (E(u), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function xr(e, t, n) {
		var r = D();
		try {
			return G(e)(t, n);
		} catch (e) {
			if (E(r), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function Sr(e, t, n, r, i) {
		var a = D();
		try {
			return G(e)(t, n, r, i);
		} catch (e) {
			if (E(a), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function Cr(e, t, n, r, i, a) {
		var o = D();
		try {
			return G(e)(t, n, r, i, a);
		} catch (e) {
			if (E(o), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function wr(e, t, n, r, i, a, o) {
		var s = D();
		try {
			G(e)(t, n, r, i, a, o);
		} catch (e) {
			if (E(s), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function Tr(e, t, n, r) {
		var i = D();
		try {
			return G(e)(t, n, r);
		} catch (e) {
			if (E(i), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function Er(e) {
		var t = D();
		try {
			return G(e)();
		} catch (e) {
			if (E(t), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function Dr(e, t, n, r, i, a, o, s, c, l, u, d) {
		var f = D();
		try {
			return G(e)(t, n, r, i, a, o, s, c, l, u, d);
		} catch (e) {
			if (E(f), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function Or(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		var g = D();
		try {
			G(e)(t, n, r, i, a, o, s, c, l, u, d, f, p, m, h);
		} catch (e) {
			if (E(g), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function kr(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, ee, te) {
		var ne = D();
		try {
			Vn(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, ee, te);
		} catch (e) {
			if (E(ne), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function Ar(e, t, n, r, i, a, o) {
		var s = D();
		try {
			return Hn(e, t, n, r, i, a, o);
		} catch (e) {
			if (E(s), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function jr(e, t, n, r, i) {
		var a = D();
		try {
			return Un(e, t, n, r, i);
		} catch (e) {
			if (E(a), e !== e + 0) throw e;
			Q(1, 0);
		}
	}
	function Mr() {
		re();
		function e() {
			var e, t;
			i.calledRun = !0, !g && (ie(), (e = _) == null || e(i), (t = i.onRuntimeInitialized) == null || t.call(i), ae());
		}
		i.setStatus ? (i.setStatus("Running..."), setTimeout(() => {
			setTimeout(() => i.setStatus(""), 1), e();
		}, 1)) : e();
	}
	var $ = await pe();
	return Mr(), t = te ? i : new Promise((e, t) => {
		_ = e, ee = t;
	}), t;
}
function S(e) {
	return q(x, e);
}
async function T(e, t) {
	return X(x, e, t);
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
	return (await T(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height), readerOptions))[0];
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
		this.zxingReady = null;
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
		if (!this.options.container) throw new Error("Container is required");
		this.options.container.appendChild(this.cameraCanvasNode);
	}
	ready() {
		if (!this.zxingReady) {
			const wasmUrl = this.options.zxingWASMUrl;
			const initialization = wasmUrl ? S({
				fireImmediately: true,
				overrides: { locateFile: (path, prefix) => {
					if (path.endsWith(".wasm")) return wasmUrl;
					return prefix + path;
				} }
			}) : S({ fireImmediately: true });
			this.zxingReady = initialization.then(() => void 0, (error) => {
				this.zxingReady = null;
				throw error;
			});
		}
		return this.zxingReady;
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
			await Promise.all([requestCameraPermission(), this.ready()]);
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
					decoded.position.degree = -30;
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

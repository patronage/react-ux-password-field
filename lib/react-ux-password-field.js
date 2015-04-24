/*!
 * React UX Password Field
 * version: 0.9.4
 * 
 * MIT Licensed
 * github: https://github.com/seethroughtrees/react-ux-password-field/
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-ux-password-field"] = factory(require("react"));
	else
		root["react-ux-password-field"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1),
	    RP = React.PropTypes,
	    config = __webpack_require__(2),
	    debounce = __webpack_require__(4);

	__webpack_require__(3);

	var InputPassword = React.createClass({
	  displayName: 'InputPassword',

	  /*==========  VALIDATE  ==========*/

	  propTypes: {
	    infoBar: RP.bool,
	    statusColor: RP.string,
	    statusInactiveColor: RP.string,
	    minScore: RP.number,
	    changeCb: RP.func,
	    toggleMask: RP.bool,
	    unMaskTime: RP.number,
	    minLength: RP.number,
	    strengthLang: RP.array
	  },

	  /*==========  DEFAULTS  ==========*/

	  getDefaultProps: function getDefaultProps() {
	    return {
	      infoBar: true,
	      statusColor: config.statusColor,
	      statusInactiveColor: config.statusInactiveColor,
	      zxcvbn: config.zxcvbnSrc,
	      minScore: 0,
	      toggleMask: true,
	      unMaskTime: config.unMaskTime,
	      strengthLang: config.strengthLang
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      value: '',
	      score: 0,
	      entropy: 0,
	      isPassword: true,
	      isValid: false
	    };
	  },

	  /*==========  STYLES  ==========*/

	  getMeterStyle: function getMeterStyle(score) {
	    var width = 24 * score + 4;
	    return {
	      width: this.props.zxcvbn ? width + '%' : '100%',
	      maxWidth: '85%',
	      opacity: this.props.zxcvbn ? width * 0.01 + 0.5 : '1',
	      background: this.state.isValid ? this.props.statusColor : this.props.statusInactiveColor,
	      height: 5,
	      transition: 'all 400ms linear',
	      display: 'inline-block',
	      marginRight: '1%'
	    };
	  },

	  unMaskStyle: {
	    color: config.unMaskColor,
	    fontStyle: 'italic',
	    fontWeight: 200
	  },

	  infoStyle: {
	    position: 'absolute',
	    top: '100%',
	    width: '100%',
	    overflow: 'hidden',
	    height: 24
	  },

	  iconStyle: {
	    display: 'inline-block',
	    opacity: 0.25,
	    position: 'relative',
	    top: 2,
	    width: '3%'
	  },

	  strengthLangStyle: {
	    fontSize: 12,
	    position: 'relative',
	    top: 2 },

	  /*==========  METHODS  ==========*/

	  addPasswordType: function addPasswordType() {
	    this.setState({
	      isPassword: true
	    });
	  },

	  /*==========  HANDLERS  ==========*/

	  handleInputType: function handleInputType() {
	    this.setState({
	      isPassword: !this.state.isPassword
	    });
	  },

	  handleChange: function handleChange(e) {
	    e.preventDefault();
	    var val = e.target.value;

	    this.setState({
	      value: val,
	      isValid: e.target.validity.valid
	    });

	    // call onChange prop passed from parent
	    if (this.props.onChange) {
	      this.props.onChange(val, this.state.isValid, this.state.score);
	    }

	    if (this.props.toggleMask) {
	      this.handleToggleMask();
	    }

	    if (this.props.zxcvbn) {
	      this.handleZxcvbn(val);
	    }

	    if (this.props.minLength) {
	      this.handleMinLength(e.target.value.length);
	    }
	  },

	  handleToggleMask: function handleToggleMask() {

	    // display password, then
	    this.setState({
	      isPassword: false
	    });

	    // debounce remasking password
	    this.maskPassword();
	  },

	  handleZxcvbn: function handleZxcvbn(val) {
	    var stats = zxcvbn(val),
	        currentScore = stats.score;

	    this.setState({
	      score: currentScore,
	      entropy: stats.entropy
	    });

	    if (currentScore < this.props.minScore) {
	      this.setState({
	        isValid: false
	      });
	    }

	    // if score changed and callback provided
	    if (this.props.changeCb && this.state.score !== currentScore) {
	      this.props.changeCb(this.state.score, currentScore);
	    }

	    if (this.props.zxcvbn === 'debug') {
	      console.debug(stats);
	    }
	  },

	  handleMinLength: function handleMinLength(len) {
	    if (len <= this.props.minLength) {
	      this.setState({
	        isValid: false
	      });
	    }
	  },

	  componentWillMount: function componentWillMount() {

	    // set debouncer for password
	    if (this.props.toggleMask) {
	      this.maskPassword = debounce(this.addPasswordType, this.props.unMaskTime);
	    }
	  },

	  getValue: function getValue() {
	    return this.state.value;
	  },

	  render: function render() {
	    var infoBar;

	    if (this.props.infoBar) {
	      infoBar = React.createElement(
	        'div',
	        { className: 'passwordField__info', style: this.infoStyle },
	        React.createElement(
	          'span',
	          { style: this.iconStyle, className: 'passwordField__icon' },
	          React.createElement('img', { src: __webpack_require__(5), height: '10', width: '10' })
	        ),
	        React.createElement('span', { style: this.getMeterStyle(this.state.score), className: 'passwordField__meter' }),
	        React.createElement(
	          'span',
	          { style: this.strengthLangStyle, className: 'passwordField__strength' },
	          this.props.zxcvbn && this.state.value.length > 0 && this.props.strengthLang.length > 0 ? this.props.strengthLang[this.state.score] : null
	        )
	      );
	    }

	    // allow onChange to be passed from parent and not override default prop
	    var _props = this.props;
	    var onChange = _props.onChange;

	    var props = _objectWithoutProperties(_props, ['onChange']);

	    return React.createElement(
	      'div',
	      {
	        style: { position: 'relative', marginBottom: '25px' },
	        className: 'passwordField form-group',
	        'data-valid': this.state.isValid,
	        'data-score': this.state.score,
	        'data-entropy': this.state.entropy
	      },
	      React.createElement(
	        'label',
	        { className: 'control-label' },
	        this.props.label
	      ),
	      React.createElement('input', _extends({
	        ref: this.props.id,
	        className: 'passwordField__input form-control',
	        type: this.state.isPassword ? 'password' : 'text',
	        value: this.state.value,
	        placeholder: this.props.placeholder ? this.props.placeholder : null,
	        style: this.state.isPassword ? null : this.unMaskStyle,
	        onChange: this.handleChange
	      }, props)),
	      infoBar
	    );
	  }
	});

	module.exports = InputPassword;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  statusColor: '#5CE592',
	  statusInactiveColor: '#FC6F6F',
	  unMaskColor: '#c7c7c7',
	  unMaskTime: 1400,
	  strengthLang: ['Weak', 'Okay', 'Good', 'Strong', 'Great']
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	(function () {
	  var e, t, i, n, r, s, o, a, l, c, h, u, d, p, m, f, g, y, v, b, w;h = function (e) {
	    var t, i;i = [];for (t in e) i.push(t);return 0 === i.length;
	  }, d = function (e, t) {
	    return e.push.apply(e, t);
	  }, b = function (e, t) {
	    var i, n, r, s, o;for (s = e.split(""), o = [], n = 0, r = s.length; r > n; n++) i = s[n], o.push(t[i] || i);return o.join("");
	  }, f = function (e) {
	    var t, i, n, r;for (i = [], n = 0, r = q.length; r > n; n++) t = q[n], d(i, t(e));return i.sort(function (e, t) {
	      return e.i - t.i || e.j - t.j;
	    });
	  }, l = function (e, t) {
	    var i, n, r, s, o, a, l;for (a = [], r = e.length, s = e.toLowerCase(), i = 0; r >= 0 ? r > i : i > r; r >= 0 ? i++ : i--) for (n = i; r >= i ? r > n : n > r; r >= i ? n++ : n--) s.slice(i, n + 1 || 9000000000) in t && (l = s.slice(i, n + 1 || 9000000000), o = t[l], a.push({ pattern: "dictionary", i: i, j: n, token: e.slice(i, n + 1 || 9000000000), matched_word: l, rank: o }));return a;
	  }, i = function (e) {
	    var t, i, n, r, s;for (i = {}, t = 1, r = 0, s = e.length; s > r; r++) n = e[r], i[n] = t, t += 1;return i;
	  }, t = function (e, t) {
	    return function (i) {
	      var n, r, s;for (n = l(i, t), r = 0, s = n.length; s > r; r++) i = n[r], i.dictionary_name = e;return n;
	    };
	  }, m = { a: ["4", "@"], b: ["8"], c: ["(", "{", "[", "<"], e: ["3"], g: ["6", "9"], i: ["1", "!", "|"], l: ["1", "|", "7"], o: ["0"], s: ["$", "5"], t: ["+", "7"], x: ["%"], z: ["2"] }, g = function (e) {
	    var t, i, n, r, s;for (i = {}, s = e.split(""), n = 0, r = s.length; r > n; n++) e = s[n], i[e] = !0;e = {};for (t in m) {
	      r = m[t];var o = s = void 0,
	          a = void 0,
	          a = [];for (s = 0, o = r.length; o > s; s++) n = r[s], n in i && a.push(n);n = a, n.length > 0 && (e[t] = n);
	    }return e;
	  }, u = function (e) {
	    var t, i, n, r, s, o, a, l, c, h, u, d, p;s = (function () {
	      var t;t = [];for (r in e) t.push(r);return t;
	    })(), c = [[]], i = function (e) {
	      var t, i, n, r, s, o, a, l, c;for (i = [], s = {}, l = 0, c = e.length; c > l; l++) o = e[l], t = (function () {
	        var e, t;for (t = [], a = 0, e = o.length; e > a; a++) n = o[a], t.push([n, a]);return t;
	      })(), t.sort(), r = (function () {
	        var e, i;for (i = [], a = 0, e = t.length; e > a; a++) n = t[a], i.push(n + "," + a);return i;
	      })().join("-"), r in s || (s[r] = !0, i.push(o));return i;
	    }, n = function (t) {
	      var r, s, o, a, l, h, u, d, p, m, f, g;if (t.length) {
	        for (s = t[0], l = t.slice(1), a = [], f = e[s], u = 0, p = f.length; p > u; u++) for (t = f[u], d = 0, m = c.length; m > d; d++) {
	          for (h = c[d], r = -1, o = 0, g = h.length; g >= 0 ? g > o : o > g; g >= 0 ? o++ : o--) if (h[o][0] === t) {
	            r = o;break;
	          }-1 === r ? (r = h.concat([[t, s]]), a.push(r)) : (o = h.slice(0), o.splice(r, 1), o.push([t, s]), a.push(h), a.push(o));
	        }return (c = i(a), n(l));
	      }
	    }, n(s), l = [], h = 0;for (d = c.length; d > h; h++) {
	      for (o = c[h], a = {}, u = 0, p = o.length; p > u; u++) t = o[u], s = t[0], t = t[1], a[s] = t;l.push(a);
	    }return l;
	  }, v = function (e, t, i) {
	    var n, r, s, o, a, l, c, h, u, d, p, m, f;for (u = [], l = 0; e.length - 1 > l;) for (c = l + 1, h = null, d = p = 0;;) {
	      if ((n = e.charAt(c - 1), a = !1, o = -1, r = t[n] || [], e.length > c)) for (s = e.charAt(c), m = 0, f = r.length; f > m; m++) if ((n = r[m], o += 1, n && -1 !== n.indexOf(s))) {
	        a = !0, 1 === n.indexOf(s) && (d += 1), h !== o && (p += 1, h = o);break;
	      }if (!a) {
	        c - l > 2 && u.push({ pattern: "spatial", i: l, j: c - 1, token: e.slice(l, c), graph: i, turns: p, shifted_count: d }), l = c;break;
	      }c += 1;
	    }return u;
	  }, e = { lower: "abcdefghijklmnopqrstuvwxyz", upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", digits: "01234567890" }, y = function (e, t) {
	    var i, n;for (n = [], i = 1; t >= 1 ? t >= i : i >= t; t >= 1 ? i++ : i--) n.push(e);return n.join("");
	  }, p = function (e, t) {
	    var i, n;for (n = []; i = e.match(t), i;) i.i = i.index, i.j = i.index + i[0].length - 1, n.push(i), e = e.replace(i[0], y(" ", i[0].length));return n;
	  }, c = /\d{3,}/, w = /19\d\d|200\d|201\d/, a = function (e) {
	    var t, i, r, s, o, a, l, c, h, u, d, m, f, g;for (s = [], g = p(e, /\d{4,8}/), u = 0, m = g.length; m > u; u++) {
	      for (a = g[u], l = [a.i, a.j], a = l[0], l = l[1], r = e.slice(a, l + 1 || 9000000000), t = r.length, i = [], 6 >= r.length && (i.push({ daymonth: r.slice(2), year: r.slice(0, 2), i: a, j: l }), i.push({ daymonth: r.slice(0, t - 2), year: r.slice(t - 2), i: a, j: l })), r.length >= 6 && (i.push({ daymonth: r.slice(4), year: r.slice(0, 4), i: a, j: l }), i.push({ daymonth: r.slice(0, t - 4), year: r.slice(t - 4), i: a, j: l })), r = [], d = 0, f = i.length; f > d; d++) switch ((t = i[d], t.daymonth.length)) {case 2:
	          r.push({ day: t.daymonth[0], month: t.daymonth[1], year: t.year, i: t.i, j: t.j });break;case 3:
	          r.push({ day: t.daymonth.slice(0, 2), month: t.daymonth[2], year: t.year, i: t.i, j: t.j }), r.push({ day: t.daymonth[0], month: t.daymonth.slice(1, 3), year: t.year, i: t.i, j: t.j });break;case 4:
	          r.push({ day: t.daymonth.slice(0, 2), month: t.daymonth.slice(2, 4), year: t.year, i: t.i, j: t.j });}for (d = 0, f = r.length; f > d; d++) t = r[d], o = parseInt(t.day), c = parseInt(t.month), h = parseInt(t.year), o = n(o, c, h), i = o[0], h = o[1], o = h[0], c = h[1], h = h[2], i && s.push({ pattern: "date", i: t.i, j: t.j, token: e.slice(a, l + 1 || 9000000000), separator: "", day: o, month: c, year: h });
	    }return s;
	  }, s = /(\d{1,2})(\s|-|\/|\\|_|\.)(\d{1,2})\2(19\d{2}|200\d|201\d|\d{2})/, r = /(19\d{2}|200\d|201\d|\d{2})(\s|-|\/|\\|_|\.)(\d{1,2})\2(\d{1,2})/, o = function (e) {
	    var t, i, o, a, l, c, h, u, d, m;for (a = [], d = p(e, s), c = 0, u = d.length; u > c; c++) o = d[c], m = (function () {
	      var e, t, n, r;for (n = [1, 3, 4], r = [], e = 0, t = n.length; t > e; e++) i = n[e], r.push(parseInt(o[i]));return r;
	    })(), o.day = m[0], o.month = m[1], o.year = m[2], o.sep = o[2], a.push(o);for (d = p(e, r), c = 0, u = d.length; u > c; c++) o = d[c], m = (function () {
	      var e, t, n, r;for (n = [4, 3, 1], r = [], e = 0, t = n.length; t > e; e++) i = n[e], r.push(parseInt(o[i]));return r;
	    })(), o.day = m[0], o.month = m[1], o.year = m[2], o.sep = o[2], a.push(o);for (m = [], u = 0, d = a.length; d > u; u++) o = a[u], t = n(o.day, o.month, o.year), c = t[0], h = t[1], t = h[0], l = h[1], h = h[2], c && m.push({ pattern: "date", i: o.i, j: o.j, token: e.slice(o.i, o.j + 1 || 9000000000), separator: o.sep, day: t, month: l, year: h });return m;
	  }, n = function (e, t, i) {
	    return (t >= 12 && 31 >= t && 12 >= e && (t = [t, e], e = t[0], t = t[1]), e > 31 || t > 12 || !(i >= 1900 && 2019 >= i) ? [!1, []] : [!0, [e, t, i]]);
	  };var x, C, L, E, S, _, k, O, T, P, A, M, N, R, D, I, F, B, j, G, z, X;F = function (e, t) {
	    var i, n;if (t > e) return 0;if (0 === t) return 1;for (i = n = 1; t >= 1 ? t >= i : i >= t; t >= 1 ? i++ : i--) n *= e, n /= i, e -= 1;return n;
	  }, D = function (e) {
	    return Math.log(e) / Math.log(2);
	  }, I = function (e, t) {
	    var i, n, r, s, o, a, l, c, h, u, d;for (n = S(e), h = [], i = [], s = 0, u = e.length; u >= 0 ? u > s : s > u; u >= 0 ? s++ : s--) for (h[s] = (h[s - 1] || 0) + D(n), i[s] = null, l = 0, c = t.length; c > l; l++) a = t[l], a.j === s && (o = [a.i, a.j], r = o[0], o = o[1], r = (h[r - 1] || 0) + _(a), h[o] > r && (h[o] = r, i[o] = a));for (l = [], s = e.length - 1; s >= 0;) (a = i[s]) ? (l.push(a), s = a.i - 1) : s -= 1;for (l.reverse(), i = function (t, i) {
	      return { pattern: "bruteforce", i: t, j: i, token: e.slice(t, i + 1 || 9000000000), entropy: D(Math.pow(n, i - t + 1)), cardinality: n };
	    }, s = 0, c = [], u = 0, d = l.length; d > u; u++) a = l[u], o = [a.i, a.j], r = o[0], o = o[1], r - s > 0 && c.push(i(s, r - 1)), s = o + 1, c.push(a);return (e.length > s && c.push(i(s, e.length - 1)), l = c, a = h[e.length - 1] || 0, s = M(a), { password: e, entropy: j(a, 3), match_sequence: l, crack_time: j(s, 3), crack_time_display: A(s), score: k(s) });
	  }, j = function (e, t) {
	    return Math.round(e * Math.pow(10, t)) / Math.pow(10, t);
	  }, M = function (e) {
	    return 0.00005 * Math.pow(2, e);
	  }, k = function (e) {
	    return Math.pow(10, 2) > e ? 0 : Math.pow(10, 4) > e ? 1 : Math.pow(10, 6) > e ? 2 : Math.pow(10, 8) > e ? 3 : 4;
	  }, _ = function (e) {
	    var t;return null != e.entropy ? e.entropy : (t = (function () {
	      switch (e.pattern) {case "repeat":
	          return B;case "sequence":
	          return G;case "digits":
	          return P;case "year":
	          return X;case "date":
	          return O;case "spatial":
	          return z;case "dictionary":
	          return T;}
	    })(), e.entropy = t(e));
	  }, B = function (e) {
	    var t;return (t = S(e.token), D(t * e.token.length));
	  }, G = function (e) {
	    var t;return (t = e.token.charAt(0), t = "a" === t || "1" === t ? 1 : t.match(/\d/) ? D(10) : t.match(/[a-z]/) ? D(26) : D(26) + 1, e.ascending || (t += 1), t + D(e.token.length));
	  }, P = function (e) {
	    return D(Math.pow(10, e.token.length));
	  }, X = function () {
	    return D(119);
	  }, O = function (e) {
	    var t;return (t = 100 > e.year ? D(37200) : D(44268), e.separator && (t += 2), t);
	  }, z = function (e) {
	    var t, i, n, r, s, o, a, l;for ("qwerty" === (n = e.graph) || "dvorak" === n ? (a = V, i = J) : (a = $, i = W), s = 0, t = e.token.length, l = e.turns, n = 2; t >= 2 ? t >= n : n >= t; t >= 2 ? n++ : n--) for (o = Math.min(l, n - 1), r = 1; o >= 1 ? o >= r : r >= o; o >= 1 ? r++ : r--) s += F(n - 1, r - 1) * a * Math.pow(i, r);if ((i = D(s), e.shifted_count)) {
	      for (t = e.shifted_count, e = e.token.length - e.shifted_count, n = s = 0, r = Math.min(t, e); r >= 0 ? r >= n : n >= r; r >= 0 ? n++ : n--) s += F(t + e, n);i += D(s);
	    }return i;
	  }, T = function (e) {
	    return (e.base_entropy = D(e.rank), e.uppercase_entropy = R(e), e.l33t_entropy = N(e), e.base_entropy + e.uppercase_entropy + e.l33t_entropy);
	  }, E = /^[A-Z][^A-Z]+$/, L = /^[^A-Z]+[A-Z]$/, C = /^[^a-z]+$/, x = /^[^A-Z]+$/, R = function (e) {
	    var t, i, n, r, s, o;if ((s = e.token, s.match(x))) return 0;for (r = [E, L, C], t = 0, n = r.length; n > t; t++) if ((e = r[t], s.match(e))) return 1;for (t = (function () {
	      var e, t, n, r;for (n = s.split(""), r = [], e = 0, t = n.length; t > e; e++) i = n[e], i.match(/[A-Z]/) && r.push(i);return r;
	    })().length, e = (function () {
	      var e, t, n, r;for (n = s.split(""), r = [], e = 0, t = n.length; t > e; e++) i = n[e], i.match(/[a-z]/) && r.push(i);return r;
	    })().length, n = r = 0, o = Math.min(t, e); o >= 0 ? o >= n : n >= o; o >= 0 ? n++ : n--) r += F(t + e, n);return D(r);
	  }, N = function (e) {
	    var t, i, n, r, s, o, a, l, c;if (!e.l33t) return 0;s = 0, l = e.sub;for (o in l) for (a = l[o], t = (function () {
	      var t, i, r, s;for (r = e.token.split(""), s = [], t = 0, i = r.length; i > t; t++) n = r[t], n === o && s.push(n);return s;
	    })().length, i = (function () {
	      var t, i, r, s;for (r = e.token.split(""), s = [], t = 0, i = r.length; i > t; t++) n = r[t], n === a && s.push(n);return s;
	    })().length, r = 0, c = Math.min(i, t); c >= 0 ? c >= r : r >= c; c >= 0 ? r++ : r--) s += F(i + t, r);return D(s) || 1;
	  }, S = function (e) {
	    var t, i, n, r, s, o, a;for (r = [!1, !1, !1, !1], n = r[0], s = r[1], i = r[2], r = r[3], a = e.split(""), e = 0, o = a.length; o > e; e++) t = a[e], t = t.charCodeAt(0), t >= 48 && 57 >= t && (i = !0), t >= 65 && 90 >= t && (s = !0), t >= 97 && 122 >= t ? n = !0 : r = !0;return (e = 0, i && (e += 10), s && (e += 26), n && (e += 26), r && (e += 33), e);
	  }, A = function (e) {
	    return 60 > e ? "instant" : 3600 > e ? "" + (1 + Math.ceil(e / 60)) + " minutes" : 86400 > e ? "" + (1 + Math.ceil(e / 3600)) + " hours" : 2678400 > e ? "" + (1 + Math.ceil(e / 86400)) + " days" : 32140800 > e ? "" + (1 + Math.ceil(e / 2678400)) + " months" : 3214080000 > e ? "" + (1 + Math.ceil(e / 32140800)) + " years" : "centuries";
	  };var H,
	      U,
	      J,
	      V,
	      W,
	      $,
	      q,
	      Y,
	      K,
	      Z,
	      Q = { "!": ["`~", null, null, "2@", "qQ", null], "\"": [";:", "[{", "]}", null, null, "/?"], "#": ["2@", null, null, "4$", "eE", "wW"], $: ["3#", null, null, "5%", "rR", "eE"], "%": ["4$", null, null, "6^", "tT", "rR"], "&": ["6^", null, null, "8*", "uU", "yY"], "'": [";:", "[{", "]}", null, null, "/?"], "(": ["8*", null, null, "0)", "oO", "iI"], ")": ["9(", null, null, "-_", "pP", "oO"], "*": ["7&", null, null, "9(", "iI", "uU"], "+": ["-_", null, null, null, "]}", "[{"], ",": ["mM", "kK", "lL", ".>", null, null], "-": ["0)", null, null, "=+", "[{", "pP"], ".": [",<", "lL", ";:", "/?", null, null], "/": [".>", ";:", "'\"", null, null, null], 0: ["9(", null, null, "-_", "pP", "oO"], 1: ["`~", null, null, "2@", "qQ", null], 2: ["1!", null, null, "3#", "wW", "qQ"], 3: ["2@", null, null, "4$", "eE", "wW"], 4: ["3#", null, null, "5%", "rR", "eE"], 5: ["4$", null, null, "6^", "tT", "rR"], 6: ["5%", null, null, "7&", "yY", "tT"], 7: ["6^", null, null, "8*", "uU", "yY"], 8: ["7&", null, null, "9(", "iI", "uU"], 9: ["8*", null, null, "0)", "oO", "iI"], ":": "lL,pP,[{,'\",/?,.>".split(","), ";": "lL,pP,[{,'\",/?,.>".split(","), "<": ["mM", "kK", "lL", ".>", null, null], "=": ["-_", null, null, null, "]}", "[{"], ">": [",<", "lL", ";:", "/?", null, null], "?": [".>", ";:", "'\"", null, null, null], "@": ["1!", null, null, "3#", "wW", "qQ"], A: [null, "qQ", "wW", "sS", "zZ", null], B: ["vV", "gG", "hH", "nN", null, null], C: ["xX", "dD", "fF", "vV", null, null], D: "sS,eE,rR,fF,cC,xX".split(","), E: "wW,3#,4$,rR,dD,sS".split(","), F: "dD,rR,tT,gG,vV,cC".split(","), G: "fF,tT,yY,hH,bB,vV".split(","), H: "gG,yY,uU,jJ,nN,bB".split(","), I: "uU,8*,9(,oO,kK,jJ".split(","), J: "hH,uU,iI,kK,mM,nN".split(","), K: "jJ iI oO lL ,< mM".split(" "), L: "kK oO pP ;: .> ,<".split(" "), M: ["nN", "jJ", "kK", ",<", null, null], N: ["bB", "hH", "jJ", "mM", null, null], O: "iI,9(,0),pP,lL,kK".split(","), P: "oO,0),-_,[{,;:,lL".split(","), Q: [null, "1!", "2@", "wW", "aA", null], R: "eE,4$,5%,tT,fF,dD".split(","), S: "aA,wW,eE,dD,xX,zZ".split(","), T: "rR,5%,6^,yY,gG,fF".split(","), U: "yY,7&,8*,iI,jJ,hH".split(","), V: ["cC", "fF", "gG", "bB", null, null], W: "qQ,2@,3#,eE,sS,aA".split(","), X: ["zZ", "sS", "dD", "cC", null, null], Y: "tT,6^,7&,uU,hH,gG".split(","), Z: [null, "aA", "sS", "xX", null, null], "[": "pP,-_,=+,]},'\",;:".split(","), "\\": ["]}", null, null, null, null, null], "]": ["[{", "=+", null, "\\|", null, "'\""], "^": ["5%", null, null, "7&", "yY", "tT"], _: ["0)", null, null, "=+", "[{", "pP"], "`": [null, null, null, "1!", null, null], a: [null, "qQ", "wW", "sS", "zZ", null], b: ["vV", "gG", "hH", "nN", null, null], c: ["xX", "dD", "fF", "vV", null, null], d: "sS,eE,rR,fF,cC,xX".split(","), e: "wW,3#,4$,rR,dD,sS".split(","), f: "dD,rR,tT,gG,vV,cC".split(","), g: "fF,tT,yY,hH,bB,vV".split(","), h: "gG,yY,uU,jJ,nN,bB".split(","), i: "uU,8*,9(,oO,kK,jJ".split(","), j: "hH,uU,iI,kK,mM,nN".split(","), k: "jJ iI oO lL ,< mM".split(" "), l: "kK oO pP ;: .> ,<".split(" "), m: ["nN", "jJ", "kK", ",<", null, null], n: ["bB", "hH", "jJ", "mM", null, null], o: "iI,9(,0),pP,lL,kK".split(","), p: "oO,0),-_,[{,;:,lL".split(","), q: [null, "1!", "2@", "wW", "aA", null], r: "eE,4$,5%,tT,fF,dD".split(","), s: "aA,wW,eE,dD,xX,zZ".split(","), t: "rR,5%,6^,yY,gG,fF".split(","), u: "yY,7&,8*,iI,jJ,hH".split(","), v: ["cC", "fF", "gG", "bB", null, null], w: "qQ,2@,3#,eE,sS,aA".split(","), x: ["zZ", "sS", "dD", "cC", null, null], y: "tT,6^,7&,uU,hH,gG".split(","), z: [null, "aA", "sS", "xX", null, null], "{": "pP,-_,=+,]},'\",;:".split(","), "|": ["]}", null, null, null, null, null], "}": ["[{", "=+", null, "\\|", null, "'\""], "~": [null, null, null, "1!", null, null] },
	      et = { "*": ["/", null, null, null, "-", "+", "9", "8"], "+": ["9", "*", "-", null, null, null, null, "6"], "-": ["*", null, null, null, null, null, "+", "9"], ".": ["0", "2", "3", null, null, null, null, null], "/": [null, null, null, null, "*", "9", "8", "7"], 0: [null, "1", "2", "3", ".", null, null, null], 1: [null, null, "4", "5", "2", "0", null, null], 2: ["1", "4", "5", "6", "3", ".", "0", null], 3: ["2", "5", "6", null, null, null, ".", "0"], 4: [null, null, "7", "8", "5", "2", "1", null], 5: "4,7,8,9,6,3,2,1".split(","), 6: ["5", "8", "9", "+", null, null, "3", "2"], 7: [null, null, null, "/", "8", "5", "4", null], 8: ["7", null, "/", "*", "9", "6", "5", "4"], 9: ["8", "/", "*", "-", "+", null, "6", "5"] };K = {}, H = [t("passwords", i("password,123456,12345678,1234,abcd,abcde,abcdef,qwerty".split(","))), t("user_inputs", K)], q = H.concat([function (e) {
	    var t, i, n, r, s, o, a, l, c, d, p, m, f, y, v, w;
	    for (s = [], v = u(g(e)), c = 0, m = v.length; m > c && (o = v[c], !h(o)); c++) for (d = 0, f = H.length; f > d; d++) for (n = H[d], r = b(e, o), w = n(r), p = 0, y = w.length; y > p; p++) if ((n = w[p], l = e.slice(n.i, n.j + 1 || 9000000000), l.toLowerCase() !== n.matched_word)) {
	      r = {};for (a in o) t = o[a], -1 !== l.indexOf(a) && (r[a] = t);n.l33t = !0, n.token = l, n.sub = r, l = n;var x = void 0,
	          x = [];for (i in r) t = r[i], x.push("" + i + " -> " + t);l.sub_display = x.join(", "), s.push(n);
	    }return s;
	  }, function (e) {
	    var t, i, n, r, s, o;for (s = p(e, c), o = [], n = 0, r = s.length; r > n; n++) t = s[n], i = [t.i, t.j], t = i[0], i = i[1], o.push({ pattern: "digits", i: t, j: i, token: e.slice(t, i + 1 || 9000000000) });return o;
	  }, function (e) {
	    var t, i, n, r, s, o;for (s = p(e, w), o = [], n = 0, r = s.length; r > n; n++) t = s[n], i = [t.i, t.j], t = i[0], i = i[1], o.push({ pattern: "year", i: t, j: i, token: e.slice(t, i + 1 || 9000000000) });return o;
	  }, function (e) {
	    return a(e).concat(o(e));
	  }, function (e) {
	    var t, i, n;for (n = [], t = 0; e.length > t;) {
	      for (i = t + 1;;) {
	        if ((e.slice(i - 1, i + 1 || 9000000000), e.charAt(i - 1) !== e.charAt(i))) {
	          i - t > 2 && n.push({ pattern: "repeat", i: t, j: i - 1, token: e.slice(t, i), repeated_char: e.charAt(t) });break;
	        }i += 1;
	      }t = i;
	    }return n;
	  }, function (t) {
	    var i, n, r, s, o, a, l, c, h, u, d, p, m;for (c = [], o = 0; t.length > o;) {
	      a = o + 1, p = m = h = null;for (d in e) if ((u = e[d], r = (function () {
	        var e, n, r, s;for (r = [t.charAt(o), t.charAt(a)], s = [], e = 0, n = r.length; n > e; e++) i = r[e], s.push(u.indexOf(i));return s;
	      })(), s = r[0], r = r[1], s > -1 && r > -1 && (s = r - s, 1 === s || -1 === s))) {
	        h = u, m = d, p = s;break;
	      }if (h) for (;;) {
	        if ((s = t.slice(a - 1, a + 1 || 9000000000), l = s[0], n = s[1], r = (function () {
	          var e, t, r, s;for (r = [l, n], s = [], e = 0, t = r.length; t > e; e++) i = r[e], s.push(u.indexOf(i));return s;
	        })(), s = r[0], r = r[1], r - s !== p)) {
	          a - o > 2 && c.push({ pattern: "sequence", i: o, j: a - 1, token: t.slice(o, a), sequence_name: m, sequence_space: h.length, ascending: 1 === p });break;
	        }a += 1;
	      }o = a;
	    }return c;
	  }, function (e) {
	    var t, i, n;n = [];for (i in U) t = U[i], d(n, v(e, t, i));return n;
	  }]), U = { qwerty: Q, dvorak: { "!": ["`~", null, null, "2@", "'\"", null], "\"": [null, "1!", "2@", ",<", "aA", null], "#": ["2@", null, null, "4$", ".>", ",<"], $: ["3#", null, null, "5%", "pP", ".>"], "%": ["4$", null, null, "6^", "yY", "pP"], "&": ["6^", null, null, "8*", "gG", "fF"], "'": [null, "1!", "2@", ",<", "aA", null], "(": ["8*", null, null, "0)", "rR", "cC"], ")": ["9(", null, null, "[{", "lL", "rR"], "*": ["7&", null, null, "9(", "cC", "gG"], "+": ["/?", "]}", null, "\\|", null, "-_"], ",": "'\",2@,3#,.>,oO,aA".split(","), "-": ["sS", "/?", "=+", null, null, "zZ"], ".": ",< 3# 4$ pP eE oO".split(" "), "/": "lL,[{,]},=+,-_,sS".split(","), 0: ["9(", null, null, "[{", "lL", "rR"], 1: ["`~", null, null, "2@", "'\"", null], 2: ["1!", null, null, "3#", ",<", "'\""], 3: ["2@", null, null, "4$", ".>", ",<"], 4: ["3#", null, null, "5%", "pP", ".>"], 5: ["4$", null, null, "6^", "yY", "pP"], 6: ["5%", null, null, "7&", "fF", "yY"], 7: ["6^", null, null, "8*", "gG", "fF"], 8: ["7&", null, null, "9(", "cC", "gG"], 9: ["8*", null, null, "0)", "rR", "cC"], ":": [null, "aA", "oO", "qQ", null, null], ";": [null, "aA", "oO", "qQ", null, null], "<": "'\",2@,3#,.>,oO,aA".split(","), "=": ["/?", "]}", null, "\\|", null, "-_"], ">": ",< 3# 4$ pP eE oO".split(" "), "?": "lL,[{,]},=+,-_,sS".split(","), "@": ["1!", null, null, "3#", ",<", "'\""], A: [null, "'\"", ",<", "oO", ";:", null], B: ["xX", "dD", "hH", "mM", null, null], C: "gG,8*,9(,rR,tT,hH".split(","), D: "iI,fF,gG,hH,bB,xX".split(","), E: "oO,.>,pP,uU,jJ,qQ".split(","), F: "yY,6^,7&,gG,dD,iI".split(","), G: "fF,7&,8*,cC,hH,dD".split(","), H: "dD,gG,cC,tT,mM,bB".split(","), I: "uU,yY,fF,dD,xX,kK".split(","), J: ["qQ", "eE", "uU", "kK", null, null], K: ["jJ", "uU", "iI", "xX", null, null], L: "rR,0),[{,/?,sS,nN".split(","), M: ["bB", "hH", "tT", "wW", null, null], N: "tT,rR,lL,sS,vV,wW".split(","), O: "aA ,< .> eE qQ ;:".split(" "), P: ".>,4$,5%,yY,uU,eE".split(","), Q: [";:", "oO", "eE", "jJ", null, null], R: "cC,9(,0),lL,nN,tT".split(","), S: "nN,lL,/?,-_,zZ,vV".split(","), T: "hH,cC,rR,nN,wW,mM".split(","), U: "eE,pP,yY,iI,kK,jJ".split(","), V: ["wW", "nN", "sS", "zZ", null, null], W: ["mM", "tT", "nN", "vV", null, null], X: ["kK", "iI", "dD", "bB", null, null], Y: "pP,5%,6^,fF,iI,uU".split(","), Z: ["vV", "sS", "-_", null, null, null], "[": ["0)", null, null, "]}", "/?", "lL"], "\\": ["=+", null, null, null, null, null], "]": ["[{", null, null, null, "=+", "/?"], "^": ["5%", null, null, "7&", "fF", "yY"], _: ["sS", "/?", "=+", null, null, "zZ"], "`": [null, null, null, "1!", null, null], a: [null, "'\"", ",<", "oO", ";:", null], b: ["xX", "dD", "hH", "mM", null, null], c: "gG,8*,9(,rR,tT,hH".split(","), d: "iI,fF,gG,hH,bB,xX".split(","), e: "oO,.>,pP,uU,jJ,qQ".split(","), f: "yY,6^,7&,gG,dD,iI".split(","), g: "fF,7&,8*,cC,hH,dD".split(","), h: "dD,gG,cC,tT,mM,bB".split(","), i: "uU,yY,fF,dD,xX,kK".split(","), j: ["qQ", "eE", "uU", "kK", null, null], k: ["jJ", "uU", "iI", "xX", null, null], l: "rR,0),[{,/?,sS,nN".split(","), m: ["bB", "hH", "tT", "wW", null, null], n: "tT,rR,lL,sS,vV,wW".split(","), o: "aA ,< .> eE qQ ;:".split(" "), p: ".>,4$,5%,yY,uU,eE".split(","), q: [";:", "oO", "eE", "jJ", null, null], r: "cC,9(,0),lL,nN,tT".split(","), s: "nN,lL,/?,-_,zZ,vV".split(","), t: "hH,cC,rR,nN,wW,mM".split(","), u: "eE,pP,yY,iI,kK,jJ".split(","), v: ["wW", "nN", "sS", "zZ", null, null], w: ["mM", "tT", "nN", "vV", null, null], x: ["kK", "iI", "dD", "bB", null, null], y: "pP,5%,6^,fF,iI,uU".split(","), z: ["vV", "sS", "-_", null, null, null], "{": ["0)", null, null, "]}", "/?", "lL"], "|": ["=+", null, null, null, null, null], "}": ["[{", null, null, null, "=+", "/?"], "~": [null, null, null, "1!", null, null] }, keypad: et, mac_keypad: { "*": ["/", null, null, null, null, null, "-", "9"], "+": ["6", "9", "-", null, null, null, null, "3"], "-": ["9", "/", "*", null, null, null, "+", "6"], ".": ["0", "2", "3", null, null, null, null, null], "/": ["=", null, null, null, "*", "-", "9", "8"], 0: [null, "1", "2", "3", ".", null, null, null], 1: [null, null, "4", "5", "2", "0", null, null], 2: ["1", "4", "5", "6", "3", ".", "0", null], 3: ["2", "5", "6", "+", null, null, ".", "0"], 4: [null, null, "7", "8", "5", "2", "1", null], 5: "4,7,8,9,6,3,2,1".split(","), 6: ["5", "8", "9", "-", "+", null, "3", "2"], 7: [null, null, null, "=", "8", "5", "4", null], 8: ["7", null, "=", "/", "9", "6", "5", "4"], 9: "8,=,/,*,-,+,6,5".split(","), "=": [null, null, null, null, "/", "9", "8", "7"] } }, t = function (e) {
	    var t, i, n, r, s;t = 0;for (n in e) s = e[n], t += (function () {
	      var e, t, i;for (i = [], e = 0, t = s.length; t > e; e++) (r = s[e]) && i.push(r);return i;
	    })().length;return t /= (function () {
	      var t;t = [];for (i in e) t.push(i);return t;
	    })().length;
	  }, J = t(Q), W = t(et), V = (function () {
	    var e;e = [];for (Y in Q) e.push(Y);return e;
	  })().length, $ = (function () {
	    var e;e = [];for (Y in et) e.push(Y);return e;
	  })().length, Z = function () {
	    return new Date().getTime();
	  }, window.zxcvbn = function (e, t) {
	    var i, n, r;if ((n = Z(), null != t)) for (i = 0, r = t.length; r >= 0 ? r > i : i > r; r >= 0 ? i++ : i--) K[t[i]] = i + 1;return (i = f(e), i = I(e, i), i.calc_time = Z() - n, i);
	  }, "function" == typeof zxcvbn_load_hook && zxcvbn_load_hook();
	})();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var isNative = __webpack_require__(6);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeNow = isNative(nativeNow = Date.now) && nativeNow;

	/**
	 * Gets the number of milliseconds that have elapsed since the Unix epoch
	 * (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @category Date
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => logs the number of milliseconds it took for the deferred function to be invoked
	 */
	var now = nativeNow || function () {
	  return new Date().getTime();
	};

	/**
	 * Creates a function that delays invoking `func` until after `wait` milliseconds
	 * have elapsed since the last time it was invoked. The created function comes
	 * with a `cancel` method to cancel delayed invocations. Provide an options
	 * object to indicate that `func` should be invoked on the leading and/or
	 * trailing edge of the `wait` timeout. Subsequent calls to the debounced
	 * function return the result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the the debounced function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.leading=false] Specify invoking on the leading
	 *  edge of the timeout.
	 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
	 *  delayed before it is invoked.
	 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	 *  edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // avoid costly calculations while the window size is in flux
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
	 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // ensure `batchLog` is invoked once after 1 second of debounced calls
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', _.debounce(batchLog, 250, {
	 *   'maxWait': 1000
	 * }));
	 *
	 * // cancel a debounced call
	 * var todoChanges = _.debounce(batchLog, 1000);
	 * Object.observe(models.todo, todoChanges);
	 *
	 * Object.observe(models, function(changes) {
	 *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
	 *     todoChanges.cancel();
	 *   }
	 * }, ['delete']);
	 *
	 * // ...at some point `models.todo` is changed
	 * models.todo.completed = true;
	 *
	 * // ...before 1 second has passed `models.todo` is deleted
	 * // which cancels the debounced `todoChanges` call
	 * delete models.todo;
	 */
	function debounce(func, wait, options) {
	  var args,
	      maxTimeoutId,
	      result,
	      stamp,
	      thisArg,
	      timeoutId,
	      trailingCall,
	      lastCalled = 0,
	      maxWait = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = wait < 0 ? 0 : +wait || 0;
	  if (options === true) {
	    var leading = true;
	    trailing = false;
	  } else if (isObject(options)) {
	    leading = options.leading;
	    maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
	    trailing = 'trailing' in options ? options.trailing : trailing;
	  }

	  function cancel() {
	    if (timeoutId) {
	      clearTimeout(timeoutId);
	    }
	    if (maxTimeoutId) {
	      clearTimeout(maxTimeoutId);
	    }
	    maxTimeoutId = timeoutId = trailingCall = undefined;
	  }

	  function delayed() {
	    var remaining = wait - (now() - stamp);
	    if (remaining <= 0 || remaining > wait) {
	      if (maxTimeoutId) {
	        clearTimeout(maxTimeoutId);
	      }
	      var isCalled = trailingCall;
	      maxTimeoutId = timeoutId = trailingCall = undefined;
	      if (isCalled) {
	        lastCalled = now();
	        result = func.apply(thisArg, args);
	        if (!timeoutId && !maxTimeoutId) {
	          args = thisArg = null;
	        }
	      }
	    } else {
	      timeoutId = setTimeout(delayed, remaining);
	    }
	  }

	  function maxDelayed() {
	    if (timeoutId) {
	      clearTimeout(timeoutId);
	    }
	    maxTimeoutId = timeoutId = trailingCall = undefined;
	    if (trailing || maxWait !== wait) {
	      lastCalled = now();
	      result = func.apply(thisArg, args);
	      if (!timeoutId && !maxTimeoutId) {
	        args = thisArg = null;
	      }
	    }
	  }

	  function debounced() {
	    args = arguments;
	    stamp = now();
	    thisArg = this;
	    trailingCall = trailing && (timeoutId || !leading);

	    if (maxWait === false) {
	      var leadingCall = leading && !timeoutId;
	    } else {
	      if (!maxTimeoutId && !leading) {
	        lastCalled = stamp;
	      }
	      var remaining = maxWait - (stamp - lastCalled),
	          isCalled = remaining <= 0 || remaining > maxWait;

	      if (isCalled) {
	        if (maxTimeoutId) {
	          maxTimeoutId = clearTimeout(maxTimeoutId);
	        }
	        lastCalled = stamp;
	        result = func.apply(thisArg, args);
	      } else if (!maxTimeoutId) {
	        maxTimeoutId = setTimeout(maxDelayed, remaining);
	      }
	    }
	    if (isCalled && timeoutId) {
	      timeoutId = clearTimeout(timeoutId);
	    } else if (!timeoutId && wait !== maxWait) {
	      timeoutId = setTimeout(delayed, wait);
	    }
	    if (leadingCall) {
	      isCalled = true;
	      result = func.apply(thisArg, args);
	    }
	    if (isCalled && !timeoutId && !maxTimeoutId) {
	      args = thisArg = null;
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  return debounced;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return type == 'function' || !!value && type == 'object';
	}

	module.exports = debounce;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCRkNDMzg4M0FFN0IxMUU0OTE2RkY5MzYyMkI3QTVDMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCRkNDMzg4NEFFN0IxMUU0OTE2RkY5MzYyMkI3QTVDMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJGQ0MzODgxQUU3QjExRTQ5MTZGRjkzNjIyQjdBNUMyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJGQ0MzODgyQUU3QjExRTQ5MTZGRjkzNjIyQjdBNUMyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+NkztvAAAAc9JREFUeNq8lk8oBFEcx2fG5k+0HJRQ/iVy2U1tUsjBzYnI2cUWJyl3XJRSkgOtxEU4keLgQP6kuColoeQgEkXWand8X/3UNM28Z56Z961PO2/fb9535r3f/N7TTdPUnBSLxTSBcsEA6AW1IAw+wD3YAtPg0+1mXdK4DJyAKk7MM+gE506dhuZdleBSYMpUDM5Ah1NnyKOpDnZpWn91C/ZBksZrBhFL/zaopyWQNh4HDZZ2AsQd4kbBFF3ngRnQ8581vgHVdH0M2jgPeWjpz1BePMqscdRiyrQhiF+25VK7bHI12toXgvg9+yTKGpc6TDtPD+DJ0i6RNS6ytZOC+IwtpkA2q1epKLyDb/D2h3uGQQXIBqcyWd1FBeEOZNFM1YEckHYpTGzgKyqbpmWp1kEq9IeCcQRaNP80CZoMQclb8NmUqRys8IxZpenTglHUEOxAhQEZ5/OM01qAMnwah+3Ng2BTpTGr2a1gHnSDCVXGs7Z2QpVxjUNSKjGeo29T+RuHqaRqtOdGVGZ1in6/VH9OYZet01Uhnx5qBLyAIT+MvVQulslLflWuazq+BKFXnvEaWAzI+IA31ezUMEaJE6dDQYb+9yrdMrs7oP9HgAEAXmVa5ulD/g0AAAAASUVORK5CYII="

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	'use strict';

	var funcTag = '[object Function]';

	/**
	 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
	 * In addition to special characters the forward slash is escaped to allow for
	 * easier `eval` use and `Function` compilation.
	 */
	var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
	    reHasRegExpChars = RegExp(reRegExpChars.source);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Converts `value` to a string if it is not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  if (typeof value == 'string') {
	    return value;
	  }
	  return value == null ? '' : value + '';
	}

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + escapeRegExp(objToString).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (objToString.call(value) == funcTag) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	/**
	 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
	 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escapeRegExp('[lodash](https://lodash.com/)');
	 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
	 */
	function escapeRegExp(string) {
	  string = baseToString(string);
	  return string && reHasRegExpChars.test(string) ? string.replace(reRegExpChars, '\\$&') : string;
	}

	module.exports = isNative;

/***/ }
/******/ ])
});
;
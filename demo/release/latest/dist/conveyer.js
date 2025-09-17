(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Conveyer = factory());
})(this, (function() {
  "use strict";/*!
 * @egjs/conveyer v1.8.0
 * (c) 2025 NAVER Corp.
 * @license MIT
 */

  function some(arr, callback) {
    var length = arr.length;
    for (var i = 0; i < length; ++i) {
      if (callback(arr[i], i)) {
        return true;
      }
    }
    return false;
  }
  function find(arr, callback) {
    var length = arr.length;
    for (var i = 0; i < length; ++i) {
      if (callback(arr[i], i)) {
        return arr[i];
      }
    }
    return null;
  }
  function getUserAgentString(agent2) {
    var userAgent = agent2;
    if (typeof userAgent === "undefined") {
      if (typeof navigator === "undefined" || !navigator) {
        return "";
      }
      userAgent = navigator.userAgent || "";
    }
    return userAgent.toLowerCase();
  }
  function execRegExp(pattern, text) {
    try {
      return new RegExp(pattern, "g").exec(text);
    } catch (e) {
      return null;
    }
  }
  function hasUserAgentData() {
    if (typeof navigator === "undefined" || !navigator || !navigator.userAgentData) {
      return false;
    }
    var userAgentData = navigator.userAgentData;
    var brands = userAgentData.brands || userAgentData.uaList;
    return !!(brands && brands.length);
  }
  function findVersion(versionTest, userAgent) {
    var result = execRegExp("(" + versionTest + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", userAgent);
    return result ? result[3] : "";
  }
  function convertVersion(text) {
    return text.replace(/_/g, ".");
  }
  function findPreset(presets, userAgent) {
    var userPreset = null;
    var version = "-1";
    some(presets, function(preset) {
      var result = execRegExp("(" + preset.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", userAgent);
      if (!result || preset.brand) {
        return false;
      }
      userPreset = preset;
      version = result[3] || "-1";
      if (preset.versionAlias) {
        version = preset.versionAlias;
      } else if (preset.versionTest) {
        version = findVersion(preset.versionTest.toLowerCase(), userAgent) || version;
      }
      version = convertVersion(version);
      return true;
    });
    return {
      preset: userPreset,
      version
    };
  }
  function findPresetBrand(presets, brands) {
    var brandInfo = {
      brand: "",
      version: "-1"
    };
    some(presets, function(preset) {
      var result = findBrand(brands, preset);
      if (!result) {
        return false;
      }
      brandInfo.brand = preset.id;
      brandInfo.version = preset.versionAlias || result.version;
      return brandInfo.version !== "-1";
    });
    return brandInfo;
  }
  function findBrand(brands, preset) {
    return find(brands, function(_a) {
      var brand = _a.brand;
      return execRegExp("" + preset.test, brand.toLowerCase());
    });
  }
  var BROWSER_PRESETS = [{
    test: "phantomjs",
    id: "phantomjs"
  }, {
    test: "whale",
    id: "whale"
  }, {
    test: "edgios|edge|edg",
    id: "edge"
  }, {
    test: "msie|trident|windows phone",
    id: "ie",
    versionTest: "iemobile|msie|rv"
  }, {
    test: "miuibrowser",
    id: "miui browser"
  }, {
    test: "samsungbrowser",
    id: "samsung internet"
  }, {
    test: "samsung",
    id: "samsung internet",
    versionTest: "version"
  }, {
    test: "chrome|crios",
    id: "chrome"
  }, {
    test: "firefox|fxios",
    id: "firefox"
  }, {
    test: "android",
    id: "android browser",
    versionTest: "version"
  }, {
    test: "safari|iphone|ipad|ipod",
    id: "safari",
    versionTest: "version"
  }];
  var CHROMIUM_PRESETS = [{
    test: "(?=.*applewebkit/(53[0-7]|5[0-2]|[0-4]))(?=.*\\schrome)",
    id: "chrome",
    versionTest: "chrome"
  }, {
    test: "chromium",
    id: "chrome"
  }, {
    test: "whale",
    id: "chrome",
    versionAlias: "-1",
    brand: true
  }];
  var WEBKIT_PRESETS = [{
    test: "applewebkit",
    id: "webkit",
    versionTest: "applewebkit|safari"
  }];
  var WEBVIEW_PRESETS = [{
    test: "(?=(iphone|ipad))(?!(.*version))",
    id: "webview"
  }, {
    test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
    id: "webview"
  }, {
    // test webview
    test: "webview",
    id: "webview"
  }];
  var OS_PRESETS = [{
    test: "windows phone",
    id: "windows phone"
  }, {
    test: "windows 2000",
    id: "window",
    versionAlias: "5.0"
  }, {
    test: "windows nt",
    id: "window"
  }, {
    test: "win32|windows",
    id: "window"
  }, {
    test: "iphone|ipad|ipod",
    id: "ios",
    versionTest: "iphone os|cpu os"
  }, {
    test: "macos|macintel|mac os x",
    id: "mac"
  }, {
    test: "android|linux armv81",
    id: "android"
  }, {
    test: "tizen",
    id: "tizen"
  }, {
    test: "webos|web0s",
    id: "webos"
  }];
  function isWebView(userAgent) {
    return !!findPreset(WEBVIEW_PRESETS, userAgent).preset;
  }
  function getLegacyAgent(userAgent) {
    var nextAgent = getUserAgentString(userAgent);
    var isMobile = !!/mobi/g.exec(nextAgent);
    var browser = {
      name: "unknown",
      version: "-1",
      majorVersion: -1,
      webview: isWebView(nextAgent),
      chromium: false,
      chromiumVersion: "-1",
      webkit: false,
      webkitVersion: "-1"
    };
    var os = {
      name: "unknown",
      version: "-1",
      majorVersion: -1
    };
    var _a = findPreset(BROWSER_PRESETS, nextAgent), browserPreset = _a.preset, browserVersion = _a.version;
    var _b = findPreset(OS_PRESETS, nextAgent), osPreset = _b.preset, osVersion = _b.version;
    var chromiumPreset = findPreset(CHROMIUM_PRESETS, nextAgent);
    browser.chromium = !!chromiumPreset.preset;
    browser.chromiumVersion = chromiumPreset.version;
    if (!browser.chromium) {
      var webkitPreset = findPreset(WEBKIT_PRESETS, nextAgent);
      browser.webkit = !!webkitPreset.preset;
      browser.webkitVersion = webkitPreset.version;
    }
    if (osPreset) {
      os.name = osPreset.id;
      os.version = osVersion;
      os.majorVersion = parseInt(osVersion, 10);
    }
    if (browserPreset) {
      browser.name = browserPreset.id;
      browser.version = browserVersion;
      if (browser.webview && os.name === "ios" && browser.name !== "safari") {
        browser.webview = false;
      }
    }
    browser.majorVersion = parseInt(browser.version, 10);
    return {
      browser,
      os,
      isMobile,
      isHints: false
    };
  }
  function getClientHintsAgent(osData) {
    var userAgentData = navigator.userAgentData;
    var brands = (userAgentData.uaList || userAgentData.brands).slice();
    var isMobile = userAgentData.mobile || false;
    var firstBrand = brands[0];
    var platform = (userAgentData.platform || navigator.platform).toLowerCase();
    var browser = {
      name: firstBrand.brand,
      version: firstBrand.version,
      majorVersion: -1,
      webkit: false,
      webkitVersion: "-1",
      chromium: false,
      chromiumVersion: "-1",
      webview: !!findPresetBrand(WEBVIEW_PRESETS, brands).brand || isWebView(getUserAgentString())
    };
    var os = {
      name: "unknown",
      version: "-1",
      majorVersion: -1
    };
    browser.webkit = !browser.chromium && some(WEBKIT_PRESETS, function(preset) {
      return findBrand(brands, preset);
    });
    var chromiumBrand = findPresetBrand(CHROMIUM_PRESETS, brands);
    browser.chromium = !!chromiumBrand.brand;
    browser.chromiumVersion = chromiumBrand.version || "-1";
    if (!browser.chromium) {
      var webkitBrand = findPresetBrand(WEBKIT_PRESETS, brands);
      browser.webkit = !!webkitBrand.brand;
      browser.webkitVersion = webkitBrand.version || "-1";
    }
    var platfomResult = find(OS_PRESETS, function(preset) {
      return new RegExp("" + preset.test, "g").exec(platform);
    });
    os.name = platfomResult ? platfomResult.id : "";
    {
      var browserBrand = findPresetBrand(BROWSER_PRESETS, brands);
      browser.name = browserBrand.brand || browser.name;
      browser.version = browserBrand.brand && osData ? osData.uaFullVersion : browserBrand.version;
    }
    if (browser.webkit) {
      os.name = isMobile ? "ios" : "mac";
    }
    if (os.name === "ios" && browser.webview) {
      browser.version = "-1";
    }
    os.version = convertVersion(os.version);
    browser.version = convertVersion(browser.version);
    os.majorVersion = parseInt(os.version, 10);
    browser.majorVersion = parseInt(browser.version, 10);
    return {
      browser,
      os,
      isMobile,
      isHints: true
    };
  }
  function agent(userAgent) {
    if (hasUserAgentData()) {
      return getClientHintsAgent();
    } else {
      return getLegacyAgent(userAgent);
    }
  }
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.
  
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.
  
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return {
          value: o && o[i++],
          done: !o
        };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = {
        error
      };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  }
  function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
  }
  var isUndefined = function(value) {
    return typeof value === "undefined";
  };
  var ComponentEvent = /* @__PURE__ */ (function() {
    function ComponentEvent2(eventType, props) {
      var e_1, _a;
      this._canceled = false;
      if (props) {
        try {
          for (var _b = __values(Object.keys(props)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            this[key] = props[key];
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }
      this.eventType = eventType;
    }
    var __proto = ComponentEvent2.prototype;
    __proto.stop = function() {
      this._canceled = true;
    };
    __proto.isCanceled = function() {
      return this._canceled;
    };
    return ComponentEvent2;
  })();
  var Component = /* @__PURE__ */ (function() {
    function Component2() {
      this._eventHandler = {};
    }
    var __proto = Component2.prototype;
    __proto.trigger = function(event) {
      var params = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
      }
      var eventName = event instanceof ComponentEvent ? event.eventType : event;
      var handlers = __spread(this._eventHandler[eventName] || []);
      if (handlers.length <= 0) {
        return this;
      }
      if (event instanceof ComponentEvent) {
        event.currentTarget = this;
        handlers.forEach(function(handler) {
          handler(event);
        });
      } else {
        handlers.forEach(function(handler) {
          handler.apply(void 0, __spread(params));
        });
      }
      return this;
    };
    __proto.once = function(eventName, handlerToAttach) {
      var _this = this;
      if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
        var eventHash = eventName;
        for (var key in eventHash) {
          this.once(key, eventHash[key]);
        }
        return this;
      } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
        var listener_1 = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          handlerToAttach.apply(void 0, __spread(args));
          _this.off(eventName, listener_1);
        };
        this.on(eventName, listener_1);
      }
      return this;
    };
    __proto.hasOn = function(eventName) {
      return !!this._eventHandler[eventName];
    };
    __proto.on = function(eventName, handlerToAttach) {
      if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
        var eventHash = eventName;
        for (var name in eventHash) {
          this.on(name, eventHash[name]);
        }
        return this;
      } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
        var handlerList = this._eventHandler[eventName];
        if (isUndefined(handlerList)) {
          this._eventHandler[eventName] = [];
          handlerList = this._eventHandler[eventName];
        }
        handlerList.push(handlerToAttach);
      }
      return this;
    };
    __proto.off = function(eventName, handlerToDetach) {
      if (isUndefined(eventName)) {
        this._eventHandler = {};
        return this;
      }
      if (isUndefined(handlerToDetach)) {
        if (typeof eventName === "string") {
          delete this._eventHandler[eventName];
          return this;
        } else {
          var eventHash = eventName;
          for (var name in eventHash) {
            this.off(name, eventHash[name]);
          }
          return this;
        }
      }
      var handlerList = this._eventHandler[eventName];
      if (handlerList) {
        var length = handlerList.length;
        for (var i = 0; i < length; ++i) {
          if (handlerList[i] === handlerToDetach) {
            handlerList.splice(i, 1);
            if (length <= 1) {
              delete this._eventHandler[eventName];
            }
            break;
          }
        }
      }
      return this;
    };
    Component2.VERSION = "3.0.5";
    return Component2;
  })();
  var ComponentEvent$1 = ComponentEvent;
  function keys(obj) {
    return Object.keys(obj);
  }
  var OBSERVERS_PATH = "__observers__";
  var COMPUTED_PATH = "__computed__";
  var CFCS_DETECTED_DEPENDENCIES_VERSION = 1;
  var CFCS_DETECTED_DEPENDENCIES = "__CFCS_DETECTED_DEPENDENCIES__";
  var extendStatics$1 = function(d, b) {
    extendStatics$1 = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics$1(d, b);
  };
  function __extends$1(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics$1(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  function getDetectedStack() {
    Object[CFCS_DETECTED_DEPENDENCIES] = Object[CFCS_DETECTED_DEPENDENCIES] || {};
    var versionList = Object[CFCS_DETECTED_DEPENDENCIES];
    versionList[CFCS_DETECTED_DEPENDENCIES_VERSION] = versionList[CFCS_DETECTED_DEPENDENCIES_VERSION] || [];
    return versionList[CFCS_DETECTED_DEPENDENCIES_VERSION];
  }
  function getCurrentDetected() {
    var stack = getDetectedStack();
    return stack[stack.length - 1];
  }
  function detectDependencies(host) {
    var stack = getDetectedStack();
    var observers = [];
    var detected = {
      host,
      observers,
      push: function(observer) {
        if (host !== observer && observers.indexOf(observer) === -1) {
          observers.push(observer);
        }
      }
    };
    stack.push(detected);
    return detected;
  }
  function endDetectDependencies() {
    var stack = getDetectedStack();
    return stack.pop();
  }
  var Observer = /* @__PURE__ */ (function() {
    function Observer2(value) {
      this._emitter = new Component();
      this._current = value;
    }
    var __proto = Observer2.prototype;
    Object.defineProperty(__proto, "current", {
      /**
       * return the current value.
       */
      get: function() {
        var currentDetected = getCurrentDetected();
        currentDetected === null || currentDetected === void 0 ? void 0 : currentDetected.push(this);
        return this._current;
      },
      set: function(value) {
        this._setCurrent(value);
      },
      enumerable: false,
      configurable: true
    });
    __proto.subscribe = function(callback) {
      this.current;
      this._emitter.on("update", callback);
      return this;
    };
    __proto.unsubscribe = function(callback) {
      this._emitter.off("update", callback);
      return this;
    };
    __proto._setCurrent = function(value) {
      var prevValue = this._current;
      var isUpdate = value !== prevValue;
      this._current = value;
      if (isUpdate) {
        this._emitter.trigger("update", value, prevValue);
      }
    };
    __proto.toString = function() {
      return "".concat(this.current);
    };
    __proto.valueOf = function() {
      return this.current;
    };
    return Observer2;
  })();
  var ComputedObserver = /* @__PURE__ */ (function(_super) {
    __extends$1(ComputedObserver2, _super);
    function ComputedObserver2(_computedCallback) {
      var _this = _super.call(this) || this;
      _this._computedCallback = _computedCallback;
      _this._registered = [];
      _this._onCheckUpdate = function() {
        _this._setCurrent(_this.current);
      };
      _this._current = _this.current;
      return _this;
    }
    var __proto = ComputedObserver2.prototype;
    Object.defineProperty(__proto, "current", {
      get: function() {
        var _this = this;
        detectDependencies(this);
        var value = this._computedCallback();
        var results = endDetectDependencies();
        this._registered.forEach(function(observer) {
          observer.unsubscribe(_this._onCheckUpdate);
        });
        results.observers.forEach(function(observer) {
          observer.subscribe(_this._onCheckUpdate);
        });
        this._registered = results.observers;
        return value;
      },
      enumerable: false,
      configurable: true
    });
    return ComputedObserver2;
  })(Observer);
  function injectObserve(prototype, memberName, publicName) {
    if (publicName === void 0) {
      publicName = memberName;
    }
    var nextAttributes = {
      configurable: true,
      get: function() {
        return getObserver(this, publicName).current;
      },
      set: function(value) {
        getObserver(this, publicName, value).current = value;
      }
    };
    Object.defineProperty(prototype, memberName, nextAttributes);
    if (publicName !== memberName) {
      Object.defineProperty(prototype, publicName, {
        configurable: true,
        get: function() {
          return getObserver(this, publicName).current;
        }
      });
    }
  }
  function Observe() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (args.length > 1) {
      return injectObserve(args[0], args[1]);
    }
    return function(prototype, memberName) {
      return injectObserve(prototype, memberName, args[0]);
    };
  }
  function Reactive() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return Observe.apply(void 0, args);
  }
  function injectReactiveSubscribe(object) {
    object["subscribe"] = function(name, callback) {
      this[name];
      getObserver(this, name).subscribe(callback);
    };
    object["unsubscribe"] = function(name, callback) {
      var _this = this;
      if (!name) {
        keys(getObservers(this)).forEach(function(observerName) {
          _this.unsubscribe(observerName);
        });
        return;
      }
      if (!(name in this)) {
        return;
      }
      getObserver(this, name).unsubscribe(callback);
    };
  }
  function ReactiveSubscribe(Constructor) {
    var prototype = Constructor.prototype;
    injectReactiveSubscribe(prototype);
  }
  function observe(defaultValue) {
    return new Observer(defaultValue);
  }
  function computed(computedCallback) {
    return new ComputedObserver(computedCallback);
  }
  function defineObservers(instance) {
    var observers = {};
    Object.defineProperty(instance, OBSERVERS_PATH, {
      get: function() {
        return observers;
      }
    });
    return observers;
  }
  function getObservers(instance, isComputed) {
    var _a, _b;
    if (!instance[OBSERVERS_PATH]) {
      defineObservers(instance);
    }
    var observers = instance[OBSERVERS_PATH];
    if (!isComputed) {
      var computedList = (_b = (_a = instance === null || instance === void 0 ? void 0 : instance.constructor) === null || _a === void 0 ? void 0 : _a.prototype) === null || _b === void 0 ? void 0 : _b[COMPUTED_PATH];
      if (computedList) {
        computedList.forEach(function(name) {
          if (!(name in observers) && name in instance) {
            instance[name];
          }
        });
      }
    }
    return observers;
  }
  function getObserver(instance, name, defaultValue) {
    var observers = getObservers(instance);
    if (!observers[name]) {
      observers[name] = observe(defaultValue);
    }
    return observers[name];
  }
  function Computed(prototype, memberName, attributes) {
    var get = attributes.get;
    function getComputed() {
      var observers = getObservers(this, true);
      if (!(memberName in observers)) {
        observers[memberName] = computed(get.bind(this));
      }
      return getObserver(this, memberName).current;
    }
    var nextAttributes = {
      configurable: true,
      get: getComputed
    };
    prototype[COMPUTED_PATH] || (prototype[COMPUTED_PATH] = []);
    var computedList = prototype[COMPUTED_PATH];
    if (computedList.indexOf(memberName) === -1) {
      computedList.push(memberName);
    }
    Object.defineProperty(prototype, memberName, nextAttributes);
    return nextAttributes;
  }
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0
  
    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.
  
    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  var __assign = function() {
    __assign = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }
  var win;
  if (typeof window === "undefined") {
    win = {
      navigator: {
        userAgent: ""
      }
    };
  } else {
    win = window;
  }
  var DIRECTION_NONE = 1;
  var DIRECTION_LEFT = 2;
  var DIRECTION_RIGHT = 4;
  var DIRECTION_HORIZONTAL = 2 | 4;
  var DIRECTION_UP = 8;
  var DIRECTION_DOWN = 16;
  var DIRECTION_VERTICAL = 8 | 16;
  var DIRECTION_ALL = 2 | 4 | 8 | 16;
  var MOUSE_LEFT = "left";
  var MOUSE_RIGHT = "right";
  var MOUSE_MIDDLE = "middle";
  var MOUSE_BUTTON_CODE_MAP = {
    1: MOUSE_LEFT,
    2: MOUSE_MIDDLE,
    3: MOUSE_RIGHT
  };
  var ANY = "any";
  var NONE = "none";
  var SHIFT = "shift";
  var CTRL = "ctrl";
  var ALT = "alt";
  var META = "meta";
  var VELOCITY_INTERVAL = 16;
  var IOS_EDGE_THRESHOLD = 30;
  var IS_IOS_SAFARI = "ontouchstart" in win && agent().browser.name === "safari";
  var TRANSFORM = (function() {
    if (typeof document === "undefined") {
      return "";
    }
    var bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
    var target = ["transform", "webkitTransform", "msTransform", "mozTransform"];
    for (var i = 0, len = target.length; i < len; i++) {
      if (target[i] in bodyStyle) {
        return target[i];
      }
    }
    return "";
  })();
  var PREVENT_DRAG_CSSPROPS = {
    "-webkit-user-select": "none",
    "-ms-user-select": "none",
    "-moz-user-select": "none",
    "user-select": "none",
    "-webkit-user-drag": "none"
  };
  var toArray = function(nodes) {
    var el = [];
    for (var i = 0, len = nodes.length; i < len; i++) {
      el.push(nodes[i]);
    }
    return el;
  };
  var $ = function(param, multi) {
    if (multi === void 0) {
      multi = false;
    }
    var el;
    if (typeof param === "string") {
      var match = param.match(/^<([a-z]+)\s*([^>]*)>/);
      if (match) {
        var dummy = document.createElement("div");
        dummy.innerHTML = param;
        el = toArray(dummy.childNodes);
      } else {
        el = toArray(document.querySelectorAll(param));
      }
      if (!multi) {
        el = el.length >= 1 ? el[0] : void 0;
      }
    } else if (param === win) {
      el = param;
    } else if ("value" in param || "current" in param) {
      el = param.value || param.current;
    } else if (param.nodeName && (param.nodeType === 1 || param.nodeType === 9)) {
      el = param;
    } else if ("jQuery" in win && param instanceof jQuery || param.constructor.prototype.jquery) {
      el = multi ? param.toArray() : param.get(0);
    } else if (Array.isArray(param)) {
      el = param.map(function(v) {
        return $(v);
      });
      if (!multi) {
        el = el.length >= 1 ? el[0] : void 0;
      }
    }
    return el;
  };
  var raf = win.requestAnimationFrame || win.webkitRequestAnimationFrame;
  var caf = win.cancelAnimationFrame || win.webkitCancelAnimationFrame;
  if (raf && !caf) {
    var keyInfo_1 = {};
    var oldraf_1 = raf;
    raf = function(callback) {
      var wrapCallback = function(timestamp) {
        if (keyInfo_1[key]) {
          callback(timestamp);
        }
      };
      var key = oldraf_1(wrapCallback);
      keyInfo_1[key] = true;
      return key;
    };
    caf = function(key) {
      delete keyInfo_1[key];
    };
  } else if (!(raf && caf)) {
    raf = function(callback) {
      return win.setTimeout(function() {
        callback(win.performance && win.performance.now && win.performance.now() || (/* @__PURE__ */ new Date()).getTime());
      }, 16);
    };
    caf = win.clearTimeout;
  }
  var requestAnimationFrame = function(fp) {
    return raf(fp);
  };
  var cancelAnimationFrame = function(key) {
    caf(key);
  };
  var map = function(obj, callback) {
    var tranformed = {};
    for (var k in obj) {
      if (k) {
        tranformed[k] = callback(obj[k], k);
      }
    }
    return tranformed;
  };
  var filter = function(obj, callback) {
    var filtered = {};
    for (var k in obj) {
      if (k && callback(obj[k], k)) {
        filtered[k] = obj[k];
      }
    }
    return filtered;
  };
  var every = function(obj, callback) {
    for (var k in obj) {
      if (k && !callback(obj[k], k)) {
        return false;
      }
    }
    return true;
  };
  var equal = function(target, base) {
    return every(target, function(v, k) {
      return v === base[k];
    });
  };
  var roundNumFunc = {};
  var roundNumber = function(num, roundUnit) {
    if (!roundNumFunc[roundUnit]) {
      roundNumFunc[roundUnit] = getRoundFunc(roundUnit);
    }
    return roundNumFunc[roundUnit](num);
  };
  var roundNumbers = function(num, roundUnit) {
    if (!num || !roundUnit) {
      return num;
    }
    return map(num, function(value, key) {
      return roundNumber(value, typeof roundUnit === "number" ? roundUnit : roundUnit[key]);
    });
  };
  var getDecimalPlace = function(val) {
    if (!isFinite(val)) {
      return 0;
    }
    var v = "".concat(val);
    if (v.indexOf("e") >= 0) {
      var p = 0;
      var e = 1;
      while (Math.round(val * e) / e !== val) {
        e *= 10;
        p++;
      }
      return p;
    }
    return v.indexOf(".") >= 0 ? v.length - v.indexOf(".") - 1 : 0;
  };
  var inversePow = function(n) {
    return 1 / Math.pow(10, n);
  };
  var getRoundFunc = function(v) {
    var p = v < 1 ? Math.pow(10, getDecimalPlace(v)) : 1;
    return function(n) {
      if (v === 0) {
        return 0;
      }
      return Math.round(Math.round(n / v) * v * p) / p;
    };
  };
  var getAngle = function(posX, posY) {
    return Math.atan2(posY, posX) * 180 / Math.PI;
  };
  var isCssPropsFromAxes = function(originalCssProps) {
    var same = true;
    Object.keys(PREVENT_DRAG_CSSPROPS).forEach(function(prop) {
      if (!originalCssProps || originalCssProps[prop] !== PREVENT_DRAG_CSSPROPS[prop]) {
        same = false;
      }
    });
    return same;
  };
  var getDirection = function(useHorizontal, useVertical) {
    if (useHorizontal && useVertical) {
      return DIRECTION_ALL;
    } else if (useHorizontal) {
      return DIRECTION_HORIZONTAL;
    } else if (useVertical) {
      return DIRECTION_VERTICAL;
    } else {
      return DIRECTION_NONE;
    }
  };
  var useDirection = function(checkType, direction, userDirection) {
    if (userDirection) {
      return !!(direction === DIRECTION_ALL || direction & checkType && userDirection & checkType);
    } else {
      return !!(direction & checkType);
    }
  };
  var setCssProps = function(element, option, direction) {
    var _a;
    var touchActionMap = (_a = {}, _a[DIRECTION_NONE] = "auto", _a[DIRECTION_ALL] = "none", _a[DIRECTION_VERTICAL] = "pan-x", _a[DIRECTION_HORIZONTAL] = "pan-y", _a);
    var oldCssProps = {};
    if (element && element.style) {
      var touchAction = option.touchAction ? option.touchAction : touchActionMap[direction];
      var newCssProps_1 = __assign(__assign({}, PREVENT_DRAG_CSSPROPS), {
        "touch-action": element.style["touch-action"] === "none" ? "none" : touchAction
      });
      Object.keys(newCssProps_1).forEach(function(prop) {
        oldCssProps[prop] = element.style[prop];
      });
      Object.keys(newCssProps_1).forEach(function(prop) {
        element.style[prop] = newCssProps_1[prop];
      });
    }
    return oldCssProps;
  };
  var revertCssProps = function(element, originalCssProps) {
    if (element && element.style && originalCssProps) {
      Object.keys(originalCssProps).forEach(function(prop) {
        element.style[prop] = originalCssProps[prop];
      });
    }
    return;
  };
  var EventManager = /* @__PURE__ */ (function() {
    function EventManager2(_axes) {
      this._axes = _axes;
      this.holdingCount = 0;
    }
    var __proto = EventManager2.prototype;
    __proto.hold = function(pos, option) {
      var roundPos = this._getRoundPos(pos).roundPos;
      this._axes.trigger(new ComponentEvent$1("hold", {
        pos: roundPos,
        input: option.input || null,
        inputEvent: option.event || null,
        isTrusted: true
      }));
    };
    __proto.triggerRelease = function(param) {
      var _a = this._getRoundPos(param.destPos, param.depaPos), roundPos = _a.roundPos, roundDepa = _a.roundDepa;
      param.destPos = roundPos;
      param.depaPos = roundDepa;
      param.setTo = this._createUserControll(param.destPos, param.duration);
      this._axes.trigger(new ComponentEvent$1("release", __assign(__assign({}, param), {
        bounceRatio: this._getBounceRatio(roundPos)
      })));
    };
    __proto.triggerChange = function(pos, depaPos, option, holding) {
      var _this = this;
      if (holding === void 0) {
        holding = false;
      }
      var animationManager = this.animationManager;
      var axisManager = animationManager.axisManager;
      var eventInfo = animationManager.getEventInfo();
      var _a = this._getRoundPos(pos, depaPos), roundPos = _a.roundPos, roundDepa = _a.roundDepa;
      var moveTo = axisManager.moveTo(roundPos, roundDepa);
      var inputEvent = (option === null || option === void 0 ? void 0 : option.event) || (eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.event) || null;
      var param = {
        pos: moveTo.pos,
        delta: moveTo.delta,
        bounceRatio: this._getBounceRatio(moveTo.pos),
        holding,
        inputEvent,
        isTrusted: !!inputEvent,
        input: (option === null || option === void 0 ? void 0 : option.input) || (eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.input) || null,
        set: inputEvent ? this._createUserControll(moveTo.pos) : function() {
        }
        // eslint-disable-line @typescript-eslint/no-empty-function
      };
      var event = new ComponentEvent$1("change", param);
      this._axes.trigger(event);
      Object.keys(moveTo.pos).forEach(function(axis) {
        var p = moveTo.pos[axis];
        getObserver(_this._axes, axis, p).current = p;
      });
      if (inputEvent) {
        axisManager.set(param.set().destPos);
      }
      return !event.isCanceled();
    };
    __proto.triggerAnimationStart = function(param) {
      var _a = this._getRoundPos(param.destPos, param.depaPos), roundPos = _a.roundPos, roundDepa = _a.roundDepa;
      param.destPos = roundPos;
      param.depaPos = roundDepa;
      param.setTo = this._createUserControll(param.destPos, param.duration);
      var event = new ComponentEvent$1("animationStart", param);
      this._axes.trigger(event);
      return !event.isCanceled();
    };
    __proto.triggerAnimationEnd = function(isTrusted) {
      if (isTrusted === void 0) {
        isTrusted = false;
      }
      this._axes.trigger(new ComponentEvent$1("animationEnd", {
        isTrusted
      }));
    };
    __proto.triggerFinish = function(isTrusted) {
      if (isTrusted === void 0) {
        isTrusted = false;
      }
      this._axes.trigger(new ComponentEvent$1("finish", {
        isTrusted
      }));
    };
    __proto.setAnimationManager = function(animationManager) {
      this.animationManager = animationManager;
    };
    __proto.destroy = function() {
      this._axes.off();
    };
    __proto._createUserControll = function(pos, duration) {
      if (duration === void 0) {
        duration = 0;
      }
      var userControl = {
        destPos: __assign({}, pos),
        duration
      };
      return function(toPos, userDuration) {
        if (toPos) {
          userControl.destPos = __assign({}, toPos);
        }
        if (userDuration !== void 0) {
          userControl.duration = userDuration;
        }
        return userControl;
      };
    };
    __proto._getRoundPos = function(pos, depaPos) {
      var roundUnit = this._axes.options.round;
      return {
        roundPos: roundNumbers(pos, roundUnit),
        roundDepa: roundNumbers(depaPos, roundUnit)
      };
    };
    __proto._getBounceRatio = function(pos) {
      return this._axes.axisManager.map(pos, function(v, opt) {
        if (v < opt.range[0] && opt.bounce[0] !== 0) {
          return (opt.range[0] - v) / opt.bounce[0];
        } else if (v > opt.range[1] && opt.bounce[1] !== 0) {
          return (v - opt.range[1]) / opt.bounce[1];
        } else {
          return 0;
        }
      });
    };
    __decorate([Observe], EventManager2.prototype, "holdingCount", void 0);
    return EventManager2;
  })();
  var InterruptManager = /* @__PURE__ */ (function() {
    function InterruptManager2(_options) {
      this._options = _options;
      this._prevented = false;
    }
    var __proto = InterruptManager2.prototype;
    __proto.isInterrupting = function() {
      return this._options.interruptable || this._prevented;
    };
    __proto.isInterrupted = function() {
      return !this._options.interruptable && this._prevented;
    };
    __proto.setInterrupt = function(prevented) {
      if (!this._options.interruptable) {
        this._prevented = prevented;
      }
    };
    return InterruptManager2;
  })();
  var getInsidePosition = function(destPos, range, circular, bounce) {
    var toDestPos = destPos;
    var targetRange = [circular[0] ? range[0] : bounce ? range[0] - bounce[0] : range[0], circular[1] ? range[1] : bounce ? range[1] + bounce[1] : range[1]];
    toDestPos = Math.max(targetRange[0], toDestPos);
    toDestPos = Math.min(targetRange[1], toDestPos);
    return toDestPos;
  };
  var isOutside = function(pos, range) {
    return pos < range[0] || pos > range[1];
  };
  var isEndofBounce = function(pos, range, bounce, circular) {
    return !circular[0] && pos === range[0] - bounce[0] || !circular[1] && pos === range[1] + bounce[1];
  };
  var getDuration = function(distance, deceleration) {
    var duration = Math.sqrt(distance / deceleration * 2);
    return duration < 100 ? 0 : duration;
  };
  var isCircularable = function(destPos, range, circular) {
    return circular[1] && destPos > range[1] || circular[0] && destPos < range[0];
  };
  var getCirculatedPos = function(pos, range, circular) {
    var toPos = pos;
    var min = range[0];
    var max = range[1];
    var length = max - min;
    if (circular[1] && pos > max) {
      toPos = (toPos - max) % length + min;
    }
    if (circular[0] && pos < min) {
      toPos = (toPos - min) % length + max;
    }
    return toPos;
  };
  var AxisManager = /* @__PURE__ */ (function() {
    function AxisManager2(_axis) {
      var _this = this;
      this._axis = _axis;
      this._complementOptions();
      this._pos = Object.keys(this._axis).reduce(function(pos, v) {
        pos[v] = _this._axis[v].startPos;
        return pos;
      }, {});
    }
    var __proto = AxisManager2.prototype;
    __proto.getDelta = function(depaPos, destPos) {
      var fullDepaPos = this.get(depaPos);
      return map(this.get(destPos), function(v, k) {
        return v - fullDepaPos[k];
      });
    };
    __proto.get = function(axes) {
      var _this = this;
      if (axes && Array.isArray(axes)) {
        return axes.reduce(function(acc, v) {
          if (v && v in _this._pos) {
            acc[v] = _this._pos[v];
          }
          return acc;
        }, {});
      } else {
        return __assign(__assign({}, this._pos), axes || {});
      }
    };
    __proto.moveTo = function(pos, depaPos) {
      if (depaPos === void 0) {
        depaPos = this._pos;
      }
      var delta = map(this._pos, function(v, key) {
        return key in pos && key in depaPos ? pos[key] - depaPos[key] : 0;
      });
      this.set(this.map(pos, function(v, opt) {
        return opt ? getCirculatedPos(v, opt.range, opt.circular) : 0;
      }));
      return {
        pos: __assign({}, this._pos),
        delta
      };
    };
    __proto.set = function(pos) {
      for (var k in pos) {
        if (k && k in this._pos) {
          this._pos[k] = pos[k];
        }
      }
    };
    __proto.every = function(pos, callback) {
      var axisOptions = this._axis;
      return every(pos, function(value, key) {
        return callback(value, axisOptions[key], key);
      });
    };
    __proto.filter = function(pos, callback) {
      var axisOptions = this._axis;
      return filter(pos, function(value, key) {
        return callback(value, axisOptions[key], key);
      });
    };
    __proto.map = function(pos, callback) {
      var axisOptions = this._axis;
      return map(pos, function(value, key) {
        return callback(value, axisOptions[key], key);
      });
    };
    __proto.isOutside = function(axes) {
      return !this.every(axes ? this.get(axes) : this._pos, function(v, opt) {
        return !isOutside(v, opt.range);
      });
    };
    __proto.getAxisOptions = function(key) {
      return this._axis[key];
    };
    __proto.setAxis = function(axis) {
      var _this = this;
      Object.keys(axis).forEach(function(key) {
        if (!_this._axis[key]) {
          throw new Error("Axis ".concat(key, " does not exist in Axes instance"));
        }
        _this._axis[key] = __assign(__assign({}, _this._axis[key]), axis[key]);
      });
      this._complementOptions();
    };
    __proto._complementOptions = function() {
      var _this = this;
      Object.keys(this._axis).forEach(function(axis) {
        _this._axis[axis] = __assign({
          range: [0, 100],
          startPos: _this._axis[axis].range[0],
          bounce: [0, 0],
          circular: [false, false]
        }, _this._axis[axis]);
        ["bounce", "circular"].forEach(function(v) {
          var axisOption = _this._axis;
          var key = axisOption[axis][v];
          if (/string|number|boolean/.test(typeof key)) {
            axisOption[axis][v] = [key, key];
          }
        });
      });
    };
    return AxisManager2;
  })();
  var SUPPORT_TOUCH = "ontouchstart" in win;
  var SUPPORT_POINTER = "PointerEvent" in win;
  var SUPPORT_MSPOINTER = "MSPointerEvent" in win;
  var SUPPORT_POINTER_EVENTS = SUPPORT_POINTER || SUPPORT_MSPOINTER;
  var isValidKey = function(event, inputKey) {
    if (!inputKey || inputKey.indexOf(ANY) > -1 || inputKey.indexOf(NONE) > -1 && !event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey || inputKey.indexOf(SHIFT) > -1 && event.shiftKey || inputKey.indexOf(CTRL) > -1 && event.ctrlKey || inputKey.indexOf(ALT) > -1 && event.altKey || inputKey.indexOf(META) > -1 && event.metaKey) {
      return true;
    }
    return false;
  };
  var EventInput = /* @__PURE__ */ (function() {
    function EventInput2() {
      var _this = this;
      this._stopContextMenu = function(event) {
        event.preventDefault();
        win.removeEventListener("contextmenu", _this._stopContextMenu);
      };
    }
    var __proto = EventInput2.prototype;
    __proto.extendEvent = function(event) {
      var _a;
      var prevEvent = this.prevEvent;
      var center = this._getCenter(event);
      var movement = prevEvent ? this._getMovement(event) : {
        x: 0,
        y: 0
      };
      var scale = prevEvent ? this._getScale(event) : 1;
      var angle = prevEvent ? getAngle(center.x - prevEvent.center.x, center.y - prevEvent.center.y) : 0;
      var deltaX = prevEvent ? prevEvent.deltaX + movement.x : movement.x;
      var deltaY = prevEvent ? prevEvent.deltaY + movement.y : movement.y;
      var offsetX = movement.x;
      var offsetY = movement.y;
      var latestInterval = this._latestInterval;
      var timeStamp = Date.now();
      var deltaTime = latestInterval ? timeStamp - latestInterval.timestamp : 0;
      var velocityX = prevEvent ? prevEvent.velocityX : 0;
      var velocityY = prevEvent ? prevEvent.velocityY : 0;
      var directionX = prevEvent ? prevEvent.directionX : 1;
      var directionY = prevEvent ? prevEvent.directionY : 1;
      if (offsetX > 0) {
        directionX = 1;
      } else if (offsetX < 0) {
        directionX = -1;
      }
      if (offsetY > 0) {
        directionY = 1;
      } else if (offsetY < 0) {
        directionY = -1;
      }
      if (!latestInterval || deltaTime >= VELOCITY_INTERVAL) {
        if (latestInterval) {
          _a = [(deltaX - latestInterval.deltaX) / deltaTime, (deltaY - latestInterval.deltaY) / deltaTime], velocityX = _a[0], velocityY = _a[1];
        }
        this._latestInterval = {
          timestamp: timeStamp,
          deltaX,
          deltaY
        };
      }
      return {
        srcEvent: event,
        scale,
        angle,
        center,
        deltaX,
        deltaY,
        offsetX,
        offsetY,
        directionX,
        directionY,
        velocityX,
        velocityY,
        preventSystemEvent: true
      };
    };
    __proto._getDistance = function(start, end) {
      var x = end.clientX - start.clientX;
      var y = end.clientY - start.clientY;
      return Math.sqrt(x * x + y * y);
    };
    __proto._getButton = function(event) {
      var buttonCodeMap = {
        1: MOUSE_LEFT,
        2: MOUSE_RIGHT,
        4: MOUSE_MIDDLE
      };
      var button = this._isTouchEvent(event) ? MOUSE_LEFT : buttonCodeMap[event.buttons];
      return button ? button : null;
    };
    __proto._isTouchEvent = function(event) {
      return event.type && event.type.indexOf("touch") > -1;
    };
    __proto._isValidButton = function(button, inputButton) {
      return inputButton.indexOf(button) > -1;
    };
    __proto._isValidEvent = function(event, inputKey, inputButton) {
      return (!inputKey || isValidKey(event, inputKey)) && (!inputButton || this._isValidButton(this._getButton(event), inputButton));
    };
    __proto._preventMouseButton = function(event, button) {
      if (button === MOUSE_RIGHT) {
        win.addEventListener("contextmenu", this._stopContextMenu);
      } else if (button === MOUSE_MIDDLE) {
        event.preventDefault();
      }
    };
    return EventInput2;
  })();
  var MouseEventInput = /* @__PURE__ */ (function(_super) {
    __extends(MouseEventInput2, _super);
    function MouseEventInput2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.start = ["mousedown"];
      _this.move = ["mousemove"];
      _this.end = ["mouseup"];
      return _this;
    }
    var __proto = MouseEventInput2.prototype;
    __proto.onEventStart = function(event, inputKey, inputButton) {
      var button = this._getButton(event);
      if (!this._isValidEvent(event, inputKey, inputButton)) {
        return null;
      }
      this._preventMouseButton(event, button);
      return this.extendEvent(event);
    };
    __proto.onEventMove = function(event, inputKey, inputButton) {
      if (!this._isValidEvent(event, inputKey, inputButton)) {
        return null;
      }
      return this.extendEvent(event);
    };
    __proto.onEventEnd = function() {
      return;
    };
    __proto.onRelease = function() {
      this.prevEvent = null;
      return;
    };
    __proto.getTouches = function(event, inputButton) {
      if (inputButton) {
        return this._isValidButton(MOUSE_BUTTON_CODE_MAP[event.which], inputButton) && this.end.indexOf(event.type) === -1 ? 1 : 0;
      }
      return 0;
    };
    __proto._getScale = function() {
      return 1;
    };
    __proto._getCenter = function(event) {
      return {
        x: event.clientX,
        y: event.clientY
      };
    };
    __proto._getMovement = function(event) {
      var prev = this.prevEvent.srcEvent;
      return {
        x: event.clientX - prev.clientX,
        y: event.clientY - prev.clientY
      };
    };
    return MouseEventInput2;
  })(EventInput);
  var TouchEventInput = /* @__PURE__ */ (function(_super) {
    __extends(TouchEventInput2, _super);
    function TouchEventInput2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.start = ["touchstart"];
      _this.move = ["touchmove"];
      _this.end = ["touchend", "touchcancel"];
      return _this;
    }
    var __proto = TouchEventInput2.prototype;
    __proto.onEventStart = function(event, inputKey) {
      this._baseTouches = event.touches;
      if (!this._isValidEvent(event, inputKey)) {
        return null;
      }
      return this.extendEvent(event);
    };
    __proto.onEventMove = function(event, inputKey) {
      if (!this._isValidEvent(event, inputKey)) {
        return null;
      }
      return this.extendEvent(event);
    };
    __proto.onEventEnd = function(event) {
      this._baseTouches = event.touches;
      return;
    };
    __proto.onRelease = function() {
      this.prevEvent = null;
      this._baseTouches = null;
      return;
    };
    __proto.getTouches = function(event) {
      return event.touches.length;
    };
    __proto._getScale = function(event) {
      if (event.touches.length !== 2 || this._baseTouches.length < 2) {
        return null;
      }
      return this._getDistance(event.touches[0], event.touches[1]) / this._getDistance(this._baseTouches[0], this._baseTouches[1]);
    };
    __proto._getCenter = function(event) {
      return {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    };
    __proto._getMovement = function(event) {
      var prev = this.prevEvent.srcEvent;
      if (event.touches[0].identifier !== prev.touches[0].identifier) {
        return {
          x: 0,
          y: 0
        };
      }
      return {
        x: event.touches[0].clientX - prev.touches[0].clientX,
        y: event.touches[0].clientY - prev.touches[0].clientY
      };
    };
    return TouchEventInput2;
  })(EventInput);
  var PointerEventInput = /* @__PURE__ */ (function(_super) {
    __extends(PointerEventInput2, _super);
    function PointerEventInput2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.start = SUPPORT_POINTER ? ["pointerdown"] : ["MSPointerDown"];
      _this.move = SUPPORT_POINTER ? ["pointermove"] : ["MSPointerMove"];
      _this.end = SUPPORT_POINTER ? ["pointerup", "pointercancel"] : ["MSPointerUp", "MSPointerCancel"];
      _this._firstInputs = [];
      _this._recentInputs = [];
      return _this;
    }
    var __proto = PointerEventInput2.prototype;
    __proto.onEventStart = function(event, inputKey, inputButton) {
      var button = this._getButton(event);
      if (!this._isValidEvent(event, inputKey, inputButton)) {
        return null;
      }
      this._preventMouseButton(event, button);
      this._updatePointerEvent(event);
      return this.extendEvent(event);
    };
    __proto.onEventMove = function(event, inputKey, inputButton) {
      if (!this._isValidEvent(event, inputKey, inputButton)) {
        return null;
      }
      this._updatePointerEvent(event);
      return this.extendEvent(event);
    };
    __proto.onEventEnd = function(event) {
      this._removePointerEvent(event);
    };
    __proto.onRelease = function() {
      this.prevEvent = null;
      this._firstInputs = [];
      this._recentInputs = [];
      return;
    };
    __proto.getTouches = function() {
      return this._recentInputs.length;
    };
    __proto._getScale = function() {
      if (this._recentInputs.length !== 2) {
        return null;
      }
      return this._getDistance(this._recentInputs[0], this._recentInputs[1]) / this._getDistance(this._firstInputs[0], this._firstInputs[1]);
    };
    __proto._getCenter = function(event) {
      return {
        x: event.clientX,
        y: event.clientY
      };
    };
    __proto._getMovement = function(event) {
      var prev = this.prevEvent.srcEvent;
      if (event.pointerId !== prev.pointerId) {
        return {
          x: 0,
          y: 0
        };
      }
      return {
        x: event.clientX - prev.clientX,
        y: event.clientY - prev.clientY
      };
    };
    __proto._updatePointerEvent = function(event) {
      var _this = this;
      var addFlag = false;
      this._recentInputs.forEach(function(e, i) {
        if (e.pointerId === event.pointerId) {
          addFlag = true;
          _this._recentInputs[i] = event;
        }
      });
      if (!addFlag) {
        this._firstInputs.push(event);
        this._recentInputs.push(event);
      }
    };
    __proto._removePointerEvent = function(event) {
      this._firstInputs = this._firstInputs.filter(function(x) {
        return x.pointerId !== event.pointerId;
      });
      this._recentInputs = this._recentInputs.filter(function(x) {
        return x.pointerId !== event.pointerId;
      });
    };
    return PointerEventInput2;
  })(EventInput);
  var TouchMouseEventInput = /* @__PURE__ */ (function(_super) {
    __extends(TouchMouseEventInput2, _super);
    function TouchMouseEventInput2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.start = ["mousedown", "touchstart"];
      _this.move = ["mousemove", "touchmove"];
      _this.end = ["mouseup", "touchend", "touchcancel"];
      return _this;
    }
    var __proto = TouchMouseEventInput2.prototype;
    __proto.onEventStart = function(event, inputKey, inputButton) {
      var button = this._getButton(event);
      if (this._isTouchEvent(event)) {
        this._baseTouches = event.touches;
      }
      if (!this._isValidEvent(event, inputKey, inputButton)) {
        return null;
      }
      this._preventMouseButton(event, button);
      return this.extendEvent(event);
    };
    __proto.onEventMove = function(event, inputKey, inputButton) {
      if (!this._isValidEvent(event, inputKey, inputButton)) {
        return null;
      }
      return this.extendEvent(event);
    };
    __proto.onEventEnd = function(event) {
      if (this._isTouchEvent(event)) {
        this._baseTouches = event.touches;
      }
      return;
    };
    __proto.onRelease = function() {
      this.prevEvent = null;
      this._baseTouches = null;
      return;
    };
    __proto.getTouches = function(event, inputButton) {
      if (this._isTouchEvent(event)) {
        return event.touches.length;
      } else {
        return this._isValidButton(MOUSE_BUTTON_CODE_MAP[event.which], inputButton) && this.end.indexOf(event.type) === -1 ? 1 : 0;
      }
    };
    __proto._getScale = function(event) {
      if (this._isTouchEvent(event)) {
        if (event.touches.length !== 2 || this._baseTouches.length < 2) {
          return 1;
        }
        return this._getDistance(event.touches[0], event.touches[1]) / this._getDistance(this._baseTouches[0], this._baseTouches[1]);
      }
      return this.prevEvent.scale;
    };
    __proto._getCenter = function(event) {
      if (this._isTouchEvent(event)) {
        return {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      }
      return {
        x: event.clientX,
        y: event.clientY
      };
    };
    __proto._getMovement = function(event) {
      var _this = this;
      var prev = this.prevEvent.srcEvent;
      var _a = [event, prev].map(function(e) {
        if (_this._isTouchEvent(e)) {
          return {
            id: e.touches[0].identifier,
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
          };
        }
        return {
          id: null,
          x: e.clientX,
          y: e.clientY
        };
      }), nextSpot = _a[0], prevSpot = _a[1];
      return nextSpot.id === prevSpot.id ? {
        x: nextSpot.x - prevSpot.x,
        y: nextSpot.y - prevSpot.y
      } : {
        x: 0,
        y: 0
      };
    };
    return TouchMouseEventInput2;
  })(EventInput);
  var toAxis = function(source, offset) {
    return offset.reduce(function(acc, v, i) {
      if (source[i]) {
        acc[source[i]] = v;
      }
      return acc;
    }, {});
  };
  var convertInputType = function(inputType) {
    if (inputType === void 0) {
      inputType = [];
    }
    var hasTouch = false;
    var hasMouse = false;
    var hasPointer = false;
    inputType.forEach(function(v) {
      switch (v) {
        case "mouse":
          hasMouse = true;
          break;
        case "touch":
          hasTouch = SUPPORT_TOUCH;
          break;
        case "pointer":
          hasPointer = SUPPORT_POINTER_EVENTS;
      }
    });
    if (hasPointer) {
      return new PointerEventInput();
    } else if (hasTouch && hasMouse) {
      return new TouchMouseEventInput();
    } else if (hasTouch) {
      return new TouchEventInput();
    } else if (hasMouse) {
      return new MouseEventInput();
    }
    return null;
  };
  function getAddEventOptions(eventName) {
    return eventName.indexOf("touch") > -1 ? {
      passive: false
    } : false;
  }
  var InputObserver = /* @__PURE__ */ (function() {
    function InputObserver2(_a) {
      var options = _a.options, interruptManager = _a.interruptManager, eventManager = _a.eventManager, axisManager = _a.axisManager, animationManager = _a.animationManager;
      this._isOutside = false;
      this._moveDistance = null;
      this._isStopped = false;
      this.options = options;
      this._interruptManager = interruptManager;
      this._eventManager = eventManager;
      this._axisManager = axisManager;
      this._animationManager = animationManager;
    }
    var __proto = InputObserver2.prototype;
    __proto.get = function(input) {
      return this._axisManager.get(input.axes);
    };
    __proto.hold = function(input, event) {
      if (this._interruptManager.isInterrupted() || !input.axes.length) {
        return;
      }
      var changeOption = {
        input,
        event
      };
      this._isStopped = false;
      this._interruptManager.setInterrupt(true);
      this._animationManager.stopAnimation(changeOption);
      ++this._eventManager.holdingCount;
      if (!this._moveDistance) {
        this._eventManager.hold(this._axisManager.get(), changeOption);
      }
      this._isOutside = this._axisManager.isOutside(input.axes);
      this._moveDistance = this._axisManager.get(input.axes);
    };
    __proto.change = function(input, event, offset, useAnimation) {
      if (this._isStopped || !this._interruptManager.isInterrupting() || this._axisManager.every(offset, function(v) {
        return v === 0;
      })) {
        return;
      }
      var nativeEvent = event.srcEvent ? event.srcEvent : event;
      if (nativeEvent.__childrenAxesAlreadyChanged) {
        return;
      }
      var depaPos = this._moveDistance || this._axisManager.get(input.axes);
      var destPos;
      destPos = map(depaPos, function(v, k) {
        return v + (offset[k] || 0);
      });
      if (this._moveDistance) {
        this._moveDistance = this._axisManager.map(destPos, function(v, _a) {
          var circular = _a.circular, range = _a.range;
          return circular && (circular[0] || circular[1]) ? getCirculatedPos(v, range, circular) : v;
        });
      }
      if (this._isOutside && this._axisManager.every(depaPos, function(v, opt) {
        return !isOutside(v, opt.range);
      })) {
        this._isOutside = false;
      }
      depaPos = this._atOutside(depaPos);
      destPos = this._atOutside(destPos);
      if (!this.options.nested || !this._isEndofAxis(offset, depaPos, destPos)) {
        nativeEvent.__childrenAxesAlreadyChanged = true;
      }
      var changeOption = {
        input,
        event
      };
      if (useAnimation) {
        var duration = this._animationManager.getDuration(destPos, depaPos);
        this._animationManager.animateTo(destPos, duration, changeOption);
      } else {
        var isCanceled = !this._eventManager.triggerChange(destPos, depaPos, changeOption, true);
        if (isCanceled) {
          this._isStopped = true;
          this._moveDistance = null;
          this._animationManager.finish(false);
        }
      }
    };
    __proto.release = function(input, event, velocity, inputDuration) {
      if (this._isStopped || !this._interruptManager.isInterrupting() || !this._moveDistance) {
        return;
      }
      var nativeEvent = event.srcEvent ? event.srcEvent : event;
      if (nativeEvent.__childrenAxesAlreadyReleased) {
        velocity = velocity.map(function() {
          return 0;
        });
      }
      var pos = this._axisManager.get(input.axes);
      var depaPos = this._axisManager.get();
      var displacement = this._animationManager.getDisplacement(velocity);
      var offset = toAxis(input.axes, displacement);
      var destPos = this._axisManager.get(this._axisManager.map(offset, function(v, opt, k) {
        if (opt.circular && (opt.circular[0] || opt.circular[1])) {
          return pos[k] + v;
        } else {
          return getInsidePosition(pos[k] + v, opt.range, opt.circular, opt.bounce);
        }
      }));
      nativeEvent.__childrenAxesAlreadyReleased = true;
      var duration = this._animationManager.getDuration(destPos, pos, inputDuration);
      if (duration === 0) {
        destPos = __assign({}, depaPos);
      }
      var param = {
        depaPos,
        destPos,
        duration,
        delta: this._axisManager.getDelta(depaPos, destPos),
        inputEvent: event,
        input,
        isTrusted: true
      };
      --this._eventManager.holdingCount;
      this._eventManager.triggerRelease(param);
      if (this._eventManager.holdingCount === 0) {
        this._moveDistance = null;
      }
      var userWish = this._animationManager.getUserControl(param);
      var isEqual = equal(userWish.destPos, depaPos);
      var changeOption = {
        input,
        event
      };
      if (isEqual || userWish.duration === 0) {
        if (!isEqual) {
          this._eventManager.triggerChange(userWish.destPos, depaPos, changeOption, true);
        }
        this._interruptManager.setInterrupt(false);
        if (this._axisManager.isOutside()) {
          this._animationManager.restore(changeOption);
        } else {
          this._eventManager.triggerFinish(true);
        }
      } else {
        this._animationManager.animateTo(userWish.destPos, userWish.duration, changeOption);
      }
    };
    __proto._atOutside = function(pos) {
      var _this = this;
      if (this._isOutside) {
        return this._axisManager.map(pos, function(v, opt) {
          var tn = opt.range[0] - opt.bounce[0];
          var tx = opt.range[1] + opt.bounce[1];
          return v > tx ? tx : v < tn ? tn : v;
        });
      } else {
        return this._axisManager.map(pos, function(v, opt) {
          var min = opt.range[0];
          var max = opt.range[1];
          var out = opt.bounce;
          var circular = opt.circular;
          if (circular[0] && v < min || circular[1] && v > max) {
            return v;
          } else if (v < min) {
            return min - _this._animationManager.interpolate(min - v, out[0]);
          } else if (v > max) {
            return max + _this._animationManager.interpolate(v - max, out[1]);
          }
          return v;
        });
      }
    };
    __proto._isEndofAxis = function(offset, depaPos, destPos) {
      return this._axisManager.every(depaPos, function(value, option, key) {
        return offset[key] === 0 || depaPos[key] === destPos[key] && isEndofBounce(value, option.range, option.bounce, option.circular);
      });
    };
    return InputObserver2;
  })();
  var clamp = function(value, min, max) {
    return Math.max(Math.min(value, max), min);
  };
  var AnimationManager = /* @__PURE__ */ (function() {
    function AnimationManager2(_a) {
      var options = _a.options, interruptManager = _a.interruptManager, eventManager = _a.eventManager, axisManager = _a.axisManager;
      this._options = options;
      this.interruptManager = interruptManager;
      this.eventManager = eventManager;
      this.axisManager = axisManager;
      this.animationEnd = this.animationEnd.bind(this);
    }
    var __proto = AnimationManager2.prototype;
    __proto.getDuration = function(depaPos, destPos, wishDuration) {
      var _this = this;
      var duration;
      if (typeof wishDuration !== "undefined") {
        duration = wishDuration;
      } else {
        var durations_1 = map(destPos, function(v, k) {
          return getDuration(Math.abs(v - depaPos[k]), _this._options.deceleration);
        });
        duration = Object.keys(durations_1).reduce(function(max, v) {
          return Math.max(max, durations_1[v]);
        }, -Infinity);
      }
      return clamp(duration, this._options.minimumDuration, this._options.maximumDuration);
    };
    __proto.getDisplacement = function(velocity) {
      var totalVelocity = Math.pow(velocity.reduce(function(total, v) {
        return total + v * v;
      }, 0), 1 / velocity.length);
      var duration = Math.abs(totalVelocity / -this._options.deceleration);
      return velocity.map(function(v) {
        return v / 2 * duration;
      });
    };
    __proto.stopAnimation = function(option) {
      if (this._animateParam) {
        var orgPos_1 = this.axisManager.get();
        var pos = this.axisManager.map(orgPos_1, function(v, opt) {
          return getCirculatedPos(v, opt.range, opt.circular);
        });
        if (!every(pos, function(v, k) {
          return orgPos_1[k] === v;
        })) {
          this.eventManager.triggerChange(pos, orgPos_1, option, !!option);
        }
        this._animateParam = null;
        if (this._raf) {
          cancelAnimationFrame(this._raf);
        }
        this._raf = null;
        this.eventManager.triggerAnimationEnd(!!(option === null || option === void 0 ? void 0 : option.event));
      }
    };
    __proto.getEventInfo = function() {
      if (this._animateParam && this._animateParam.input && this._animateParam.inputEvent) {
        return {
          input: this._animateParam.input,
          event: this._animateParam.inputEvent
        };
      } else {
        return null;
      }
    };
    __proto.restore = function(option) {
      var pos = this.axisManager.get();
      var destPos = this.axisManager.map(pos, function(v, opt) {
        return Math.min(opt.range[1], Math.max(opt.range[0], v));
      });
      this.stopAnimation();
      this.animateTo(destPos, this.getDuration(pos, destPos), option);
    };
    __proto.animationEnd = function() {
      var beforeParam = this.getEventInfo();
      this._animateParam = null;
      var circularTargets = this.axisManager.filter(this.axisManager.get(), function(v, opt) {
        return isCircularable(v, opt.range, opt.circular);
      });
      if (Object.keys(circularTargets).length > 0) {
        this.setTo(this.axisManager.map(circularTargets, function(v, opt) {
          return getCirculatedPos(v, opt.range, opt.circular);
        }));
      }
      this.interruptManager.setInterrupt(false);
      this.eventManager.triggerAnimationEnd(!!beforeParam);
      if (this.axisManager.isOutside()) {
        this.restore(beforeParam);
      } else {
        this.finish(!!beforeParam);
      }
    };
    __proto.finish = function(isTrusted) {
      this._animateParam = null;
      this.interruptManager.setInterrupt(false);
      this.eventManager.triggerFinish(isTrusted);
    };
    __proto.getUserControl = function(param) {
      var userWish = param.setTo();
      userWish.destPos = this.axisManager.get(userWish.destPos);
      userWish.duration = clamp(userWish.duration, this._options.minimumDuration, this._options.maximumDuration);
      return userWish;
    };
    __proto.animateTo = function(destPos, duration, option) {
      var _this = this;
      this.stopAnimation();
      var param = this._createAnimationParam(destPos, duration, option);
      var depaPos = __assign({}, param.depaPos);
      var retTrigger = this.eventManager.triggerAnimationStart(param);
      var userWish = this.getUserControl(param);
      if (!retTrigger && this.axisManager.every(userWish.destPos, function(v, opt) {
        return isCircularable(v, opt.range, opt.circular);
      })) {
        console.warn("You can't stop the 'animation' event when 'circular' is true.");
      }
      if (retTrigger && !equal(userWish.destPos, depaPos)) {
        var inputEvent = (option === null || option === void 0 ? void 0 : option.event) || null;
        this._animateLoop({
          depaPos,
          destPos: userWish.destPos,
          duration: userWish.duration,
          delta: this.axisManager.getDelta(depaPos, userWish.destPos),
          isTrusted: !!inputEvent,
          inputEvent,
          input: (option === null || option === void 0 ? void 0 : option.input) || null
        }, function() {
          return _this.animationEnd();
        });
      }
    };
    __proto.setTo = function(pos, duration) {
      if (duration === void 0) {
        duration = 0;
      }
      var axes = Object.keys(pos);
      var orgPos = this.axisManager.get(axes);
      if (equal(pos, orgPos)) {
        return this;
      }
      this.interruptManager.setInterrupt(true);
      var movedPos = filter(pos, function(v, k) {
        return orgPos[k] !== v;
      });
      if (!Object.keys(movedPos).length) {
        return this;
      }
      movedPos = this.axisManager.map(movedPos, function(v, opt) {
        var range = opt.range, circular = opt.circular;
        if (circular && (circular[0] || circular[1])) {
          return v;
        } else {
          return getInsidePosition(v, range, circular);
        }
      });
      if (equal(movedPos, orgPos)) {
        return this;
      }
      if (duration > 0) {
        this.animateTo(movedPos, duration);
      } else {
        this.stopAnimation();
        this.eventManager.triggerChange(movedPos);
        this.finish(false);
      }
      return this;
    };
    __proto.setBy = function(pos, duration) {
      if (duration === void 0) {
        duration = 0;
      }
      return this.setTo(map(this.axisManager.get(Object.keys(pos)), function(v, k) {
        return v + pos[k];
      }), duration);
    };
    __proto.setOptions = function(options) {
      this._options = __assign(__assign({}, this._options), options);
    };
    __proto._createAnimationParam = function(pos, duration, option) {
      var depaPos = this.axisManager.get();
      var destPos = pos;
      var inputEvent = (option === null || option === void 0 ? void 0 : option.event) || null;
      return {
        depaPos,
        destPos,
        duration: clamp(duration, this._options.minimumDuration, this._options.maximumDuration),
        delta: this.axisManager.getDelta(depaPos, destPos),
        inputEvent,
        input: (option === null || option === void 0 ? void 0 : option.input) || null,
        isTrusted: !!inputEvent,
        done: this.animationEnd
      };
    };
    __proto._animateLoop = function(param, complete) {
      var _this = this;
      if (param.duration) {
        this._animateParam = __assign(__assign({}, param), {
          startTime: (/* @__PURE__ */ new Date()).getTime()
        });
        var originalIntendedPos_1 = map(param.destPos, function(v) {
          return v;
        });
        var state_1 = this._initState(this._animateParam);
        var loop_1 = function() {
          _this._raf = null;
          var animateParam = _this._animateParam;
          var nextState = _this._getNextState(state_1);
          var isCanceled = !_this.eventManager.triggerChange(nextState.pos, state_1.pos);
          state_1 = nextState;
          if (nextState.finished) {
            animateParam.destPos = _this._getFinalPos(animateParam.destPos, originalIntendedPos_1);
            if (!equal(animateParam.destPos, _this.axisManager.get(Object.keys(animateParam.destPos)))) {
              _this.eventManager.triggerChange(animateParam.destPos, nextState.pos);
            }
            complete();
            return;
          } else if (isCanceled) {
            _this.finish(false);
          } else {
            _this._raf = requestAnimationFrame(loop_1);
          }
        };
        loop_1();
      } else {
        this.eventManager.triggerChange(param.destPos);
        complete();
      }
    };
    __proto._getFinalPos = function(destPos, originalIntendedPos) {
      var _this = this;
      var ERROR_LIMIT = 1e-6;
      var finalPos = map(destPos, function(value, key) {
        if (value >= originalIntendedPos[key] - ERROR_LIMIT && value <= originalIntendedPos[key] + ERROR_LIMIT) {
          return originalIntendedPos[key];
        } else {
          var roundUnit = _this._getRoundUnit(value, key);
          var result = roundNumber(value, roundUnit);
          return result;
        }
      });
      return finalPos;
    };
    __proto._getRoundUnit = function(val, key) {
      var roundUnit = this._options.round;
      var minRoundUnit = null;
      if (!roundUnit) {
        var options = this.axisManager.getAxisOptions(key);
        minRoundUnit = inversePow(Math.max(getDecimalPlace(options.range[0]), getDecimalPlace(options.range[1]), getDecimalPlace(val)));
      }
      return minRoundUnit || roundUnit;
    };
    return AnimationManager2;
  })();
  var EasingManager = /* @__PURE__ */ (function(_super) {
    __extends(EasingManager2, _super);
    function EasingManager2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this._useDuration = true;
      return _this;
    }
    var __proto = EasingManager2.prototype;
    __proto.interpolate = function(displacement, threshold) {
      var initSlope = this._easing(1e-5) / 1e-5;
      return this._easing(displacement / (threshold * initSlope)) * threshold;
    };
    __proto.updateAnimation = function(options) {
      var _a;
      var animateParam = this._animateParam;
      if (!animateParam) {
        return;
      }
      var diffTime = (/* @__PURE__ */ new Date()).getTime() - animateParam.startTime;
      var pos = (options === null || options === void 0 ? void 0 : options.destPos) || animateParam.destPos;
      var duration = (_a = options === null || options === void 0 ? void 0 : options.duration) !== null && _a !== void 0 ? _a : animateParam.duration;
      if ((options === null || options === void 0 ? void 0 : options.restart) || duration <= diffTime) {
        this.setTo(pos, duration - diffTime);
        return;
      }
      if (options === null || options === void 0 ? void 0 : options.destPos) {
        var currentPos = this.axisManager.get();
        this._initialEasingPer = this._prevEasingPer;
        animateParam.delta = this.axisManager.getDelta(currentPos, pos);
        animateParam.destPos = pos;
      }
      if (options === null || options === void 0 ? void 0 : options.duration) {
        var ratio = (diffTime + this._durationOffset) / animateParam.duration;
        this._durationOffset = ratio * duration - diffTime;
        animateParam.duration = duration;
      }
    };
    __proto._initState = function(info) {
      this._initialEasingPer = 0;
      this._prevEasingPer = 0;
      this._durationOffset = 0;
      return {
        pos: info.depaPos,
        easingPer: 0,
        finished: false
      };
    };
    __proto._getNextState = function(prevState) {
      var _this = this;
      var animateParam = this._animateParam;
      var prevPos = prevState.pos;
      var destPos = animateParam.destPos;
      var directions = map(prevPos, function(value, key) {
        return value <= destPos[key] ? 1 : -1;
      });
      var diffTime = (/* @__PURE__ */ new Date()).getTime() - animateParam.startTime;
      var ratio = (diffTime + this._durationOffset) / animateParam.duration;
      var easingPer = this._easing(ratio);
      var toPos = this.axisManager.map(prevPos, function(pos, options, key) {
        var nextPos = ratio >= 1 ? destPos[key] : pos + animateParam.delta[key] * (easingPer - _this._prevEasingPer) / (1 - _this._initialEasingPer);
        var circulatedPos = getCirculatedPos(nextPos, options.range, options.circular);
        if (nextPos !== circulatedPos) {
          var rangeOffset = directions[key] * (options.range[1] - options.range[0]);
          destPos[key] -= rangeOffset;
          prevPos[key] -= rangeOffset;
        }
        return circulatedPos;
      });
      this._prevEasingPer = easingPer;
      return {
        pos: toPos,
        easingPer,
        finished: easingPer >= 1
      };
    };
    __proto._easing = function(p) {
      return p > 1 ? 1 : this._options.easing(p);
    };
    return EasingManager2;
  })(AnimationManager);
  var Axes = /* @__PURE__ */ (function(_super) {
    __extends(Axes2, _super);
    function Axes2(axis, options, startPos) {
      if (axis === void 0) {
        axis = {};
      }
      if (options === void 0) {
        options = {};
      }
      if (startPos === void 0) {
        startPos = {};
      }
      var _this = _super.call(this) || this;
      _this.axis = axis;
      _this._inputs = [];
      _this.options = __assign({
        easing: function(x) {
          return 1 - Math.pow(1 - x, 3);
        },
        interruptable: true,
        maximumDuration: Infinity,
        minimumDuration: 0,
        deceleration: 6e-4,
        round: null,
        nested: false
      }, options);
      Object.keys(startPos).forEach(function(key) {
        _this.axis[key].startPos = startPos[key];
      });
      _this.interruptManager = new InterruptManager(_this.options);
      _this.axisManager = new AxisManager(_this.axis);
      _this.eventManager = new EventManager(_this);
      _this.animationManager = new EasingManager(_this);
      _this.inputObserver = new InputObserver(_this);
      _this.eventManager.setAnimationManager(_this.animationManager);
      _this.eventManager.triggerChange(_this.axisManager.get());
      return _this;
    }
    var __proto = Axes2.prototype;
    Object.defineProperty(__proto, "holding", {
      /**
       * @name Axes#holding
       * @desc Returns true if at least one input is in progress.
       * @ko 입력이 하나 이상 진행 중인지 여부를 반환한다.
       *
       * @readonly
       * @type {boolean}
       * @example
       * ```js
       * const axes = new eg.Axes({
       *  x: {
       *    range: [0, 100],
       *  },
       * });
       *
       * axes.holding
       * ```
       */
      get: function() {
        return this.eventManager.holdingCount > 0;
      },
      enumerable: false,
      configurable: true
    });
    __proto.connect = function(axes, inputType) {
      var mapped;
      if (typeof axes === "string") {
        mapped = axes.split(" ");
      } else {
        mapped = axes.concat();
      }
      if (~this._inputs.indexOf(inputType)) {
        this.disconnect(inputType);
      }
      inputType.mapAxes(mapped);
      inputType.connect(this.inputObserver);
      this._inputs.push(inputType);
      return this;
    };
    __proto.disconnect = function(inputType) {
      if (inputType) {
        var index = this._inputs.indexOf(inputType);
        if (index >= 0) {
          this._inputs[index].disconnect();
          this._inputs.splice(index, 1);
        }
      } else {
        this._inputs.forEach(function(v) {
          return v.disconnect();
        });
        this._inputs = [];
      }
      return this;
    };
    __proto.get = function(axes) {
      return this.axisManager.get(axes);
    };
    __proto.setTo = function(pos, duration) {
      if (duration === void 0) {
        duration = 0;
      }
      this.animationManager.setTo(pos, duration);
      return this;
    };
    __proto.setBy = function(pos, duration) {
      if (duration === void 0) {
        duration = 0;
      }
      this.animationManager.setBy(pos, duration);
      return this;
    };
    __proto.setOptions = function(options) {
      this.options = __assign(__assign({}, this.options), options);
      this.animationManager.setOptions(options);
      return this;
    };
    __proto.setAxis = function(axis) {
      this.axisManager.setAxis(axis);
      return this;
    };
    __proto.stopAnimation = function() {
      this.animationManager.stopAnimation();
      this.animationManager.finish(false);
      return this;
    };
    __proto.updateAnimation = function(options) {
      this.animationManager.updateAnimation(options);
      return this;
    };
    __proto.isBounceArea = function(axes) {
      return this.axisManager.isOutside(axes);
    };
    __proto.destroy = function() {
      this.disconnect();
      this.eventManager.destroy();
    };
    Axes2.VERSION = "3.9.2";
    Axes2.TRANSFORM = TRANSFORM;
    Axes2.DIRECTION_NONE = DIRECTION_NONE;
    Axes2.DIRECTION_LEFT = DIRECTION_LEFT;
    Axes2.DIRECTION_RIGHT = DIRECTION_RIGHT;
    Axes2.DIRECTION_UP = DIRECTION_UP;
    Axes2.DIRECTION_DOWN = DIRECTION_DOWN;
    Axes2.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
    Axes2.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
    Axes2.DIRECTION_ALL = DIRECTION_ALL;
    __decorate([Computed], Axes2.prototype, "holding", null);
    Axes2 = __decorate([ReactiveSubscribe], Axes2);
    return Axes2;
  })(Component);
  var getDirectionByAngle = function(angle, thresholdAngle) {
    if (thresholdAngle < 0 || thresholdAngle > 90) {
      return DIRECTION_NONE;
    }
    var toAngle = Math.abs(angle);
    return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ? DIRECTION_VERTICAL : DIRECTION_HORIZONTAL;
  };
  var PanInput = /* @__PURE__ */ (function() {
    function PanInput2(el, options) {
      var _this = this;
      this.axes = [];
      this.element = null;
      this._enabled = false;
      this._activeEvent = null;
      this._atRightEdge = false;
      this._rightEdgeTimer = 0;
      this._dragged = false;
      this._isOverThreshold = false;
      this._preventClickWhenDragged = function(e) {
        if (_this._dragged) {
          e.preventDefault();
          e.stopPropagation();
        }
        _this._dragged = false;
      };
      this._voidFunction = function() {
      };
      this.element = $(el);
      this.options = __assign({
        inputType: ["touch", "mouse", "pointer"],
        inputKey: [ANY],
        inputButton: [MOUSE_LEFT],
        scale: [1, 1],
        thresholdAngle: 45,
        threshold: 0,
        preventClickOnDrag: false,
        preventDefaultOnDrag: false,
        iOSEdgeSwipeThreshold: IOS_EDGE_THRESHOLD,
        releaseOnScroll: false,
        touchAction: null
      }, options);
      this._onPanstart = this._onPanstart.bind(this);
      this._onPanmove = this._onPanmove.bind(this);
      this._onPanend = this._onPanend.bind(this);
    }
    var __proto = PanInput2.prototype;
    __proto.mapAxes = function(axes) {
      this._direction = getDirection(!!axes[0], !!axes[1]);
      this.axes = axes;
    };
    __proto.connect = function(observer) {
      if (this._activeEvent) {
        this._detachElementEvent();
        this._detachWindowEvent(this._activeEvent);
      }
      this._attachElementEvent(observer);
      return this;
    };
    __proto.disconnect = function() {
      this._detachElementEvent();
      this._detachWindowEvent(this._activeEvent);
      this._direction = DIRECTION_NONE;
      return this;
    };
    __proto.destroy = function() {
      this.disconnect();
      this.element = null;
    };
    __proto.enable = function() {
      var activeEvent = convertInputType(this.options.inputType);
      if (!activeEvent) {
        throw new Error("PanInput cannot be enabled if there is no available input event.");
      } else if (!this._enabled) {
        this._enabled = true;
        this._originalCssProps = setCssProps(this.element, this.options, this._direction);
      }
      return this;
    };
    __proto.disable = function() {
      if (this._enabled) {
        this._enabled = false;
        if (!isCssPropsFromAxes(this._originalCssProps)) {
          revertCssProps(this.element, this._originalCssProps);
        }
      }
      return this;
    };
    __proto.isEnabled = function() {
      return this._enabled;
    };
    __proto.release = function() {
      var activeEvent = this._activeEvent;
      var prevEvent = activeEvent.prevEvent;
      activeEvent.onRelease();
      this._observer.release(this, prevEvent, [0, 0]);
      this._detachWindowEvent(activeEvent);
      return this;
    };
    __proto._onPanstart = function(event) {
      var _a = this.options, inputKey = _a.inputKey, inputButton = _a.inputButton, preventDefaultOnDrag = _a.preventDefaultOnDrag;
      var activeEvent = this._activeEvent;
      var panEvent = activeEvent.onEventStart(event, inputKey, inputButton);
      if (!panEvent || !this._enabled || activeEvent.getTouches(event, inputButton) > 1) {
        return;
      }
      if (panEvent.srcEvent.cancelable !== false) {
        var edgeThreshold = this.options.iOSEdgeSwipeThreshold;
        this._dragged = false;
        this._isOverThreshold = false;
        this._observer.hold(this, panEvent);
        this._atRightEdge = IS_IOS_SAFARI && panEvent.center.x > window.innerWidth - edgeThreshold;
        this._attachWindowEvent(activeEvent);
        preventDefaultOnDrag && panEvent.srcEvent.type !== "touchstart" && panEvent.srcEvent.preventDefault();
        activeEvent.prevEvent = panEvent;
      }
    };
    __proto._onPanmove = function(event) {
      var _this = this;
      var _a = this.options, iOSEdgeSwipeThreshold = _a.iOSEdgeSwipeThreshold, preventClickOnDrag = _a.preventClickOnDrag, releaseOnScroll = _a.releaseOnScroll, inputKey = _a.inputKey, inputButton = _a.inputButton, threshold = _a.threshold, thresholdAngle = _a.thresholdAngle;
      var activeEvent = this._activeEvent;
      var panEvent = activeEvent.onEventMove(event, inputKey, inputButton);
      var touches = activeEvent.getTouches(event, inputButton);
      if (touches === 0 || releaseOnScroll && panEvent && !panEvent.srcEvent.cancelable) {
        this._onPanend(event);
        return;
      }
      if (!panEvent || !this._enabled || touches > 1) {
        return;
      }
      var userDirection = getDirectionByAngle(panEvent.angle, thresholdAngle);
      var useHorizontal = useDirection(DIRECTION_HORIZONTAL, this._direction, userDirection);
      var useVertical = useDirection(DIRECTION_VERTICAL, this._direction, userDirection);
      if (activeEvent.prevEvent && IS_IOS_SAFARI) {
        var swipeLeftToRight = panEvent.center.x < 0;
        if (swipeLeftToRight) {
          this.release();
          return;
        } else if (this._atRightEdge) {
          clearTimeout(this._rightEdgeTimer);
          var swipeRightToLeft = panEvent.deltaX < -iOSEdgeSwipeThreshold;
          if (swipeRightToLeft) {
            this._atRightEdge = false;
          } else {
            this._rightEdgeTimer = window.setTimeout(function() {
              return _this.release();
            }, 100);
          }
        }
      }
      var distance = this._getDistance([panEvent.deltaX, panEvent.deltaY], [useHorizontal, useVertical]);
      var offset = this._getOffset([panEvent.offsetX, panEvent.offsetY], [useHorizontal, useVertical]);
      var prevent = offset.some(function(v) {
        return v !== 0;
      });
      if (prevent) {
        if (panEvent.srcEvent.cancelable !== false) {
          panEvent.srcEvent.preventDefault();
        }
        panEvent.srcEvent.stopPropagation();
      }
      panEvent.preventSystemEvent = prevent;
      if (prevent && (this._isOverThreshold || distance >= threshold)) {
        this._dragged = preventClickOnDrag;
        this._isOverThreshold = true;
        this._observer.change(this, panEvent, toAxis(this.axes, offset));
      }
      activeEvent.prevEvent = panEvent;
    };
    __proto._onPanend = function(event) {
      var inputButton = this.options.inputButton;
      var activeEvent = this._activeEvent;
      activeEvent.onEventEnd(event);
      if (!this._enabled || activeEvent.getTouches(event, inputButton) !== 0) {
        return;
      }
      this._detachWindowEvent(activeEvent);
      clearTimeout(this._rightEdgeTimer);
      var prevEvent = activeEvent.prevEvent;
      var velocity = this._isOverThreshold ? this._getOffset([Math.abs(prevEvent.velocityX) * prevEvent.directionX, Math.abs(prevEvent.velocityY) * prevEvent.directionY], [useDirection(DIRECTION_HORIZONTAL, this._direction), useDirection(DIRECTION_VERTICAL, this._direction)]) : [0, 0];
      activeEvent.onRelease();
      this._observer.release(this, prevEvent, velocity);
    };
    __proto._attachWindowEvent = function(activeEvent) {
      var _this = this;
      activeEvent === null || activeEvent === void 0 ? void 0 : activeEvent.move.forEach(function(event) {
        window.addEventListener(event, _this._onPanmove, getAddEventOptions(event));
      });
      activeEvent === null || activeEvent === void 0 ? void 0 : activeEvent.end.forEach(function(event) {
        window.addEventListener(event, _this._onPanend, getAddEventOptions(event));
      });
    };
    __proto._detachWindowEvent = function(activeEvent) {
      var _this = this;
      activeEvent === null || activeEvent === void 0 ? void 0 : activeEvent.move.forEach(function(event) {
        window.removeEventListener(event, _this._onPanmove);
      });
      activeEvent === null || activeEvent === void 0 ? void 0 : activeEvent.end.forEach(function(event) {
        window.removeEventListener(event, _this._onPanend);
      });
    };
    __proto._getOffset = function(properties, direction) {
      var scale = this.options.scale;
      return [direction[0] ? properties[0] * scale[0] : 0, direction[1] ? properties[1] * scale[1] : 0];
    };
    __proto._getDistance = function(delta, direction) {
      return Math.sqrt(Number(direction[0]) * Math.pow(delta[0], 2) + Number(direction[1]) * Math.pow(delta[1], 2));
    };
    __proto._attachElementEvent = function(observer) {
      var _this = this;
      var activeEvent = convertInputType(this.options.inputType);
      var element = this.element;
      if (!activeEvent) {
        return;
      }
      if (!element) {
        throw new Error("Element to connect input does not exist.");
      }
      this._observer = observer;
      this.enable();
      this._activeEvent = activeEvent;
      element.addEventListener("click", this._preventClickWhenDragged, true);
      activeEvent.start.forEach(function(event) {
        element.addEventListener(event, _this._onPanstart);
      });
      activeEvent.move.forEach(function(event) {
        element.addEventListener(event, _this._voidFunction);
      });
    };
    __proto._detachElementEvent = function() {
      var _this = this;
      var activeEvent = this._activeEvent;
      var element = this.element;
      if (element) {
        element.removeEventListener("click", this._preventClickWhenDragged, true);
        activeEvent === null || activeEvent === void 0 ? void 0 : activeEvent.start.forEach(function(event) {
          element.removeEventListener(event, _this._onPanstart);
        });
        activeEvent === null || activeEvent === void 0 ? void 0 : activeEvent.move.forEach(function(event) {
          element.removeEventListener(event, _this._voidFunction);
        });
      }
      this.disable();
      this._observer = null;
    };
    return PanInput2;
  })();
  var WheelInput = /* @__PURE__ */ (function() {
    function WheelInput2(el, options) {
      this.axes = [];
      this.element = null;
      this._enabled = false;
      this._holding = false;
      this._timer = null;
      this.element = $(el);
      this.options = __assign({
        inputKey: [ANY],
        scale: 1,
        releaseDelay: 300,
        useNormalized: true,
        useAnimation: false
      }, options);
      this._onWheel = this._onWheel.bind(this);
    }
    var __proto = WheelInput2.prototype;
    __proto.mapAxes = function(axes) {
      this._direction = getDirection(!!axes[1], !!axes[0]);
      this.axes = axes;
    };
    __proto.connect = function(observer) {
      this._detachEvent();
      this._attachEvent(observer);
      return this;
    };
    __proto.disconnect = function() {
      this._detachEvent();
      return this;
    };
    __proto.destroy = function() {
      this.disconnect();
      this.element = null;
    };
    __proto.enable = function() {
      this._enabled = true;
      return this;
    };
    __proto.disable = function() {
      this._enabled = false;
      return this;
    };
    __proto.isEnabled = function() {
      return this._enabled;
    };
    __proto._onWheel = function(event) {
      var _this = this;
      if (!this._enabled || !isValidKey(event, this.options.inputKey)) {
        return;
      }
      var offset = this._getOffset([event.deltaY, event.deltaX], [useDirection(DIRECTION_VERTICAL, this._direction), useDirection(DIRECTION_HORIZONTAL, this._direction)]);
      if (offset[0] === 0 && offset[1] === 0) {
        return;
      }
      event.preventDefault();
      if (!this._holding) {
        this._observer.hold(this, event);
        this._holding = true;
      }
      this._observer.change(this, event, toAxis(this.axes, offset), this.options.useAnimation);
      clearTimeout(this._timer);
      this._timer = setTimeout(function() {
        if (_this._holding) {
          _this._holding = false;
          _this._observer.release(_this, event, [0]);
        }
      }, this.options.releaseDelay);
    };
    __proto._getOffset = function(properties, direction) {
      var scale = this.options.scale;
      var useNormalized = this.options.useNormalized;
      return [direction[0] && properties[0] ? (properties[0] > 0 ? -1 : 1) * (useNormalized ? 1 : Math.abs(properties[0])) * scale : 0, direction[1] && properties[1] ? (properties[1] > 0 ? -1 : 1) * (useNormalized ? 1 : Math.abs(properties[1])) * scale : 0];
    };
    __proto._attachEvent = function(observer) {
      var element = this.element;
      if (!element) {
        throw new Error("Element to connect input does not exist.");
      }
      this._observer = observer;
      element.addEventListener("wheel", this._onWheel);
      this._enabled = true;
    };
    __proto._detachEvent = function() {
      var element = this.element;
      if (element) {
        this.element.removeEventListener("wheel", this._onWheel);
      }
      this._enabled = false;
      this._observer = null;
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
    };
    return WheelInput2;
  })();
  var PolyMap = /* @__PURE__ */ (function() {
    function PolyMap2() {
      this.keys = [];
      this.values = [];
    }
    var __proto = PolyMap2.prototype;
    __proto.get = function(key) {
      return this.values[this.keys.indexOf(key)];
    };
    __proto.set = function(key, value) {
      var keys2 = this.keys;
      var values = this.values;
      var prevIndex = keys2.indexOf(key);
      var index = prevIndex === -1 ? keys2.length : prevIndex;
      keys2[index] = key;
      values[index] = value;
    };
    return PolyMap2;
  })();
  var HashMap = /* @__PURE__ */ (function() {
    function HashMap2() {
      this.object = {};
    }
    var __proto = HashMap2.prototype;
    __proto.get = function(key) {
      return this.object[key];
    };
    __proto.set = function(key, value) {
      this.object[key] = value;
    };
    return HashMap2;
  })();
  var SUPPORT_MAP = typeof Map === "function";
  var Link = /* @__PURE__ */ (function() {
    function Link2() {
    }
    var __proto = Link2.prototype;
    __proto.connect = function(prevLink, nextLink) {
      this.prev = prevLink;
      this.next = nextLink;
      prevLink && (prevLink.next = this);
      nextLink && (nextLink.prev = this);
    };
    __proto.disconnect = function() {
      var prevLink = this.prev;
      var nextLink = this.next;
      prevLink && (prevLink.next = nextLink);
      nextLink && (nextLink.prev = prevLink);
    };
    __proto.getIndex = function() {
      var link = this;
      var index = -1;
      while (link) {
        link = link.prev;
        ++index;
      }
      return index;
    };
    return Link2;
  })();
  function orderChanged(changed, fixed) {
    var fromLinks = [];
    var toLinks = [];
    changed.forEach(function(_a) {
      var from = _a[0], to = _a[1];
      var link = new Link();
      fromLinks[from] = link;
      toLinks[to] = link;
    });
    fromLinks.forEach(function(link, i) {
      link.connect(fromLinks[i - 1]);
    });
    return changed.filter(function(_, i) {
      return !fixed[i];
    }).map(function(_a, i) {
      var from = _a[0], to = _a[1];
      if (from === to) {
        return [0, 0];
      }
      var fromLink = fromLinks[from];
      var toLink = toLinks[to - 1];
      var fromIndex = fromLink.getIndex();
      fromLink.disconnect();
      if (!toLink) {
        fromLink.connect(void 0, fromLinks[0]);
      } else {
        fromLink.connect(toLink, toLink.next);
      }
      var toIndex = fromLink.getIndex();
      return [fromIndex, toIndex];
    });
  }
  var Result = /* @__PURE__ */ (function() {
    function Result2(prevList, list, added, removed, changed, maintained, changedBeforeAdded, fixed) {
      this.prevList = prevList;
      this.list = list;
      this.added = added;
      this.removed = removed;
      this.changed = changed;
      this.maintained = maintained;
      this.changedBeforeAdded = changedBeforeAdded;
      this.fixed = fixed;
    }
    var __proto = Result2.prototype;
    Object.defineProperty(__proto, "ordered", {
      get: function() {
        if (!this.cacheOrdered) {
          this.caculateOrdered();
        }
        return this.cacheOrdered;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(__proto, "pureChanged", {
      get: function() {
        if (!this.cachePureChanged) {
          this.caculateOrdered();
        }
        return this.cachePureChanged;
      },
      enumerable: true,
      configurable: true
    });
    __proto.caculateOrdered = function() {
      var ordered = orderChanged(this.changedBeforeAdded, this.fixed);
      var changed = this.changed;
      var pureChanged = [];
      this.cacheOrdered = ordered.filter(function(_a, i) {
        var from = _a[0], to = _a[1];
        var _b = changed[i], fromBefore = _b[0], toBefore = _b[1];
        if (from !== to) {
          pureChanged.push([fromBefore, toBefore]);
          return true;
        }
      });
      this.cachePureChanged = pureChanged;
    };
    return Result2;
  })();
  function diff$1(prevList, list, findKeyCallback2) {
    var mapClass = SUPPORT_MAP ? Map : findKeyCallback2 ? HashMap : PolyMap;
    var callback = findKeyCallback2 || function(e) {
      return e;
    };
    var added = [];
    var removed = [];
    var maintained = [];
    var prevKeys = prevList.map(callback);
    var keys2 = list.map(callback);
    var prevKeyMap = new mapClass();
    var keyMap = new mapClass();
    var changedBeforeAdded = [];
    var fixed = [];
    var removedMap = {};
    var changed = [];
    var addedCount = 0;
    var removedCount = 0;
    prevKeys.forEach(function(key, prevListIndex) {
      prevKeyMap.set(key, prevListIndex);
    });
    keys2.forEach(function(key, listIndex) {
      keyMap.set(key, listIndex);
    });
    prevKeys.forEach(function(key, prevListIndex) {
      var listIndex = keyMap.get(key);
      if (typeof listIndex === "undefined") {
        ++removedCount;
        removed.push(prevListIndex);
      } else {
        removedMap[listIndex] = removedCount;
      }
    });
    keys2.forEach(function(key, listIndex) {
      var prevListIndex = prevKeyMap.get(key);
      if (typeof prevListIndex === "undefined") {
        added.push(listIndex);
        ++addedCount;
      } else {
        maintained.push([prevListIndex, listIndex]);
        removedCount = removedMap[listIndex] || 0;
        changedBeforeAdded.push([prevListIndex - removedCount, listIndex - addedCount]);
        fixed.push(listIndex === prevListIndex);
        if (prevListIndex !== listIndex) {
          changed.push([prevListIndex, listIndex]);
        }
      }
    });
    removed.reverse();
    return new Result(prevList, list, added, removed, changed, maintained, changedBeforeAdded, fixed);
  }
  var findKeyCallback = typeof Map === "function" ? void 0 : /* @__PURE__ */ (function() {
    var childrenCount = 0;
    return function(el) {
      return el.__DIFF_KEY__ || (el.__DIFF_KEY__ = ++childrenCount);
    };
  })();
  function diff(prevList, list) {
    return diff$1(prevList, list, findKeyCallback);
  }
  const IS_IE = /msie|trident/g.test(
    typeof window !== "undefined" && window?.navigator?.userAgent?.toLowerCase() || ""
  );
  function isString(val) {
    return typeof val === "string";
  }
  function instanceOfElement(el) {
    return el instanceof Element || el instanceof Node;
  }
  function isIntersection(pos1, pos2, target, intersection) {
    if (!intersection) {
      return false;
    }
    const intersectionRatio = intersection === true ? 1 : intersection;
    const size = intersectionRatio * Math.abs(pos2 - pos1);
    if (target === "end") {
      return pos1 < 0 && pos1 + size > 0;
    }
    return pos2 - size < 0 && pos2 > 0;
  }
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp(target, key, result);
    return result;
  };
  let Conveyer = class extends Component {
    /**
     * @param - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
     * @param - The option object of the InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 옵션 객체</ko>
     */
    constructor(scrollArea, options = {}) {
      super();
      this._axes = null;
      this._items = [];
      this._size = 0;
      this._scrollSize = 0;
      this._animateParam = null;
      this._resizeObserver = null;
      this._scrollTimer = 0;
      this._isWheelScroll = false;
      this._isDragScroll = false;
      this._isAnimationScroll = false;
      this._panInput = null;
      this._wheelInput = null;
      this._isReachStart = true;
      this._isReachEnd = false;
      this._pos = 0;
      this.update = () => {
        this.updateItems();
        this.updateContainer();
      };
      this._onScroll = (e) => {
        if (e) {
          this._debounceScroll();
        }
        this._refreshScroll();
        const size = this._size;
        const scrollSize = this._scrollSize;
        const pos = this._pos;
        const boundaryMargin = this._options.boundaryMargin ?? 0;
        if (pos <= boundaryMargin && this.isReachStart !== true) {
          this._isReachStart = true;
          this.trigger("reachStart");
        } else if (pos > boundaryMargin && this.isReachStart !== false) {
          this._isReachStart = false;
          this.trigger("leaveStart");
        }
        if (scrollSize - size - pos < 1 + boundaryMargin && this.isReachEnd !== true) {
          this._isReachEnd = true;
          this.trigger("reachEnd");
        } else if (!(scrollSize - size - pos < 1 + boundaryMargin) && this.isReachEnd !== false) {
          this._isReachEnd = false;
          this.trigger("leaveEnd");
        }
      };
      this._options = {
        horizontal: true,
        useDrag: true,
        useSideWheel: false,
        autoInit: true,
        boundaryMargin: 0,
        scrollDebounce: 100,
        useResizeObserver: false,
        ...options
      };
      this._scrollArea = scrollArea;
      if (this._options.autoInit) {
        this.init();
      }
    }
    /**
     * Finds an element for that direction.
     * @ko 해당 방향에 대해 엘리먼트를 찾는다.]
     * @see {@link /docs/examples/Methods direction's example} page for detailed information
     * @param - direction of the element. "start" and "end" find inside. "prev" and "next" find outside. <ko>엘리먼트의 방향. "start", "end"는 안쪽으로 찾는다. "prev", "next"는 바깥쪽으로 찾는다.</ko>
     * @param - Options for the `findElement` method. <ko>findElement 메서드의 옵션</ko>
     * @example
     * <p align="center">
     *  <img src="https://naver.github.io/egjs-conveyer/img/scrollIntoView1.png" height="200" />
     * </p>
     * <p align="center">
     *   <img src="https://naver.github.io/egjs-conveyer/img/scrollIntoView2.png" height="210" />
     * </p>
     */
    findElement(direction, options = {}) {
      return this.findItem(direction, options)?.element || null;
    }
    /**
     * Finds an item for an element or its direction.
     * @ko 엘리먼트 또는 해당 방향에 대해 아이템을 찾는다.
     * @see {@link /docs/examples/Methods direction's example} page for detailed information
     * @param - direction of the element. "start" and "end" find inside. "prev" and "next" find outside. <ko>엘리먼트의 방향. "start", "end"는 안쪽으로 찾는다. "prev", "next"는 바깥쪽으로 찾는다.</ko>
     * @param - Options for the `findItem` method. <ko>`findItem` 메서드의 옵션</ko>
     * @example
     * <p align="center">
     *  <img src="https://naver.github.io/egjs-conveyer/img/scrollIntoView1.png" height="200" />
     * </p>
     * <p align="center">
     *   <img src="https://naver.github.io/egjs-conveyer/img/scrollIntoView2.png" height="210" />
     * </p>
     */
    findItem(target, options = {}) {
      const pos = this._pos;
      const scrollSize = this._scrollSize;
      const size = this._size;
      const hitTest = options?.hitTest ?? 1;
      const items = [...this._items];
      const length = items.length;
      const endPos = pos + size;
      const sibling = options.sibling;
      const intersection = options.intersection;
      const startVirtualItem = { pos: 0, size: 0 };
      const endVirtualItem = { pos: scrollSize, size: 0 };
      if (items[0].pos > 0) {
        items.unshift(startVirtualItem);
      }
      if (length && items[length - 1].pos + items[length - 1].size < scrollSize) {
        items.push(endVirtualItem);
      }
      let selectedItem;
      if (target === "start") {
        if (pos < 0) {
          return null;
        }
        const selectedItems = items.filter((item) => {
          const itemSize = item.size;
          const dist = item.pos - pos;
          const dist2 = dist + itemSize;
          return dist >= 0 || dist2 > 0 && isIntersection(dist, dist2, "end", intersection) || dist2 >= 0 && (!itemSize || Math.abs(dist2) / itemSize >= hitTest);
        });
        selectedItem = selectedItems[0] === startVirtualItem && selectedItems[1] || selectedItems[0];
      } else if (target === "end") {
        if (pos > scrollSize - size) {
          return null;
        }
        const selectedItems = items.filter((item) => {
          const itemSize = item.size;
          const dist = item.pos + itemSize - endPos;
          const dist2 = dist - itemSize;
          return dist <= 0 || dist2 < 0 && isIntersection(dist2, dist, "start", intersection) || dist2 <= 0 && (!itemSize || Math.abs(dist2) / itemSize >= hitTest);
        }).reverse();
        selectedItem = selectedItems[0] === endVirtualItem && selectedItems[1] || selectedItems[0];
      } else if (target === "prev") {
        selectedItem = items.filter((item) => {
          const itemSize = item.size;
          const dist = item.pos + itemSize - pos;
          const dist2 = dist - itemSize;
          return dist <= 0 || dist2 < 0 && isIntersection(dist2, dist, "start", intersection) || dist2 <= 0 && (!itemSize || Math.abs(dist2) / itemSize >= hitTest);
        }).reverse()[0] || startVirtualItem;
      } else if (target === "next") {
        selectedItem = items.filter((item) => {
          const itemSize = item.size;
          const dist = item.pos - endPos;
          const dist2 = dist + itemSize;
          return dist >= 0 || dist2 > 0 && isIntersection(dist, dist2, "end", intersection) || dist2 >= 0 && (!itemSize || Math.abs(dist2) / itemSize >= hitTest);
        })[0] || endVirtualItem;
      } else {
        return this._getItem(target);
      }
      if (sibling && selectedItem) {
        const selectedIndex = items.indexOf(selectedItem);
        if (selectedIndex > -1) {
          selectedItem = items[selectedIndex + sibling];
        }
      }
      return selectedItem || null;
    }
    /**
     * Scrolls an element or an item in that direction into the view.
     * @ko 엘리먼트나 해당 방향에 있는 아이템을 뷰안으로 스크롤을 한다.
     * @see {@link /docs/examples/Methods target's example} page for detailed information
     * @param - direction of the element. "start" and "end" find inside. "prev" and "next" find outside. <ko>엘리먼트의 방향. "start", "end"는 안쪽으로 찾는다. "prev", "next"는 바깥쪽으로 찾는다.</ko>
     * @param - Options for the `scrollIntoView` method. <ko>`scrollIntoView` 메서드의 옵션</ko>
     * @example
     * <p align="center">
     *  <img src="https://naver.github.io/egjs-conveyer/img/scrollIntoView1.png" height="200" />
     * </p>
     * <p align="center">
     *   <img src="https://naver.github.io/egjs-conveyer/img/scrollIntoView2.png" height="210" />
     * </p>
     */
    scrollIntoView(target, options = {}) {
      let item = this.findItem(target, options);
      if (!item) {
        return;
      }
      const duration = options.duration || 0;
      let nextScrollPos = this._getNextScrollPos(item, options);
      if (isString(target) && options.excludeStand && nextScrollPos === this._pos) {
        const selectedIndex = this._items.indexOf(item);
        if (selectedIndex === -1) {
          return;
        }
        const sibling = target === "start" || target === "prev" ? -1 : 1;
        item = this._items[selectedIndex + sibling];
        if (!item) {
          return;
        }
        nextScrollPos = this._getNextScrollPos(item, options);
      }
      this.scrollBy(nextScrollPos - this._pos, duration);
    }
    /**
     * Scrolls by the given position amount.
     * @ko 주어진 위치 양만큼 스크롤한다.
     * @param - Amount of position to scroll by. <ko>스크롤할 위치의 양.</ko>
     * @param - Duration to scroll by that position. <ko>해당 위치만큼 스크롤하는 시간</ko>
     */
    scrollBy(pos, duration = 0) {
      this._createAnimationParam(pos);
      this._axes.setBy({ scroll: -pos }, duration);
    }
    /**
     * Scroll to the given position.
     * @ko 주어진 위치로 스크롤한다.
     * @param - Amount of position to scroll to. <ko>스크롤할 위치의 양.</ko>
     * @param - Duration to scroll to that position. <ko>해당 위치로 스크롤하는 시간</ko>
     */
    scrollTo(pos, duration = 0) {
      this.scrollBy(pos - this._pos, duration);
    }
    /**
     * Set the items directly to the Conveyer.
     * @ko Conveyer에 아이템들을 직접 설정한다.
     * @param - Items to set on Conveyer <ko>Conveyer에 설정할 아이템들</ko>
     */
    setItems(items) {
      this._items = items;
    }
    /**
     * Update the position and size information of items.
     * @ko 아이템들의 포지션, 사이즈 정보를 업데이트 한다.
     */
    updateItems() {
      const scrollAreaElement = this._scrollAreaElement;
      const itemSelector = this._options.itemSelector;
      const resizeObserver = this._resizeObserver;
      const prevItemElements = this._items.map((item) => item.element);
      const itemElements = [].slice.call(
        itemSelector ? scrollAreaElement.querySelectorAll(itemSelector) : scrollAreaElement.children
      );
      this.setItems(itemElements.map((el) => this._getItem(el)));
      if (resizeObserver) {
        const changed = diff(prevItemElements, itemElements);
        const removed = changed.removed;
        const added = changed.added;
        removed.forEach((index) => resizeObserver.unobserve(changed.prevList[index]));
        added.forEach((index) => resizeObserver.observe(changed.list[index]));
      }
    }
    /**
     * Update container size and scroll size.
     * @ko 컨테이너의 크기, 스크롤 사이즈를 업데이트 한다.
     */
    updateContainer() {
      const scrollAreaElement = this._scrollAreaElement;
      const horizontal = this._options.horizontal;
      const size = horizontal ? scrollAreaElement.clientWidth : scrollAreaElement.clientHeight;
      let scrollSize = horizontal ? scrollAreaElement.scrollWidth : scrollAreaElement.scrollHeight;
      if (IS_IE && scrollSize === size + 1) {
        const style = getComputedStyle(scrollAreaElement);
        const boxSizing = style.boxSizing;
        const borderSize = horizontal ? (parseFloat(style.borderLeftWidth) || 0) + (parseFloat(style.borderRightWidth) || 0) : (parseFloat(style.borderTopWidth) || 0) + (parseFloat(style.borderBottomWidth) || 0);
        const cssSize = parseFloat(horizontal ? style.width : style.height) || 0;
        const contentSize = cssSize - (boxSizing === "border-box" ? borderSize : 0);
        if (size < contentSize && contentSize < size + 1) {
          scrollSize = size;
        }
      }
      this._size = size;
      this._scrollSize = scrollSize;
      this._refreshScroll();
      this._onScroll();
    }
    /**
     * Enables PanInput and WheelInput operations in mouse case.
     * @ko mouse 케이스에서 PanInput, WheelInput의 동작을 활성화한다.
     */
    enableInput() {
      this._panInput?.enable();
      this._wheelInput?.enable();
    }
    /**
     * Disables PanInput and WheelInput operations in mouse case.
     * @ko mouse 케이스에서 PanInput, WheelInput의 동작을 비활성화한다.
     */
    disableInput() {
      this._panInput?.disable();
      this._wheelInput?.disable();
    }
    /**
     * If you use the autoInit option as false, you can initialize it directly through the init method.
     * @ko autoInit 옵션을 false로 사용하는 경우 직접 init 메서드를 통해 초기화 할 수 있다.
     */
    init() {
      if (this._axes) {
        return;
      }
      const scrollArea = this._scrollArea;
      let el;
      if (isString(scrollArea)) {
        el = document.querySelector(scrollArea);
      } else if (instanceOfElement(scrollArea)) {
        el = scrollArea;
      } else if ("value" in scrollArea || "current" in scrollArea) {
        el = scrollArea.value || scrollArea.current;
      }
      if (!el) {
        return;
      }
      this._scrollAreaElement = el;
      let isDrag = false;
      const scrollAreaElement = this._scrollAreaElement;
      const options = this._options;
      const axes = new Axes({
        scroll: {
          range: [-Infinity, Infinity]
        }
      }, {
        deceleration: 5e-3,
        round: 1,
        nested: options.nested
      }, {
        scroll: 0
      });
      let isHold = false;
      axes.on({
        "hold": (e) => {
          isHold = true;
          isDrag = false;
          const nativeEvent = this._getNativeEvent(e);
          if (!nativeEvent) {
            return;
          }
          if (options.preventDefault) {
            nativeEvent.preventDefault();
          }
        },
        "change": (e) => {
          const nativeEvent = this._getNativeEvent(e);
          const animateParam = this._animateParam;
          if (options.useSideWheel && this._isMixedWheel(nativeEvent)) {
            return;
          }
          this._isWheelScroll = !!nativeEvent && nativeEvent.type === "wheel";
          this._isDragScroll = !!nativeEvent && !this._isWheelScroll;
          this._isAnimationScroll = !this._isWheelScroll && !isHold;
          isDrag = true;
          const scroll = e.delta.scroll;
          if (!e.isTrusted && animateParam) {
            animateParam.expectedPos -= scroll;
            if (options.horizontal) {
              scrollAreaElement.scrollLeft = animateParam.expectedPos + animateParam.offset;
            } else {
              scrollAreaElement.scrollTop = animateParam.expectedPos + animateParam.offset;
            }
          } else {
            this._animateParam = null;
            if (options.horizontal) {
              scrollAreaElement.scrollLeft -= scroll;
            } else {
              scrollAreaElement.scrollTop -= scroll;
            }
          }
          if (options.nested) {
            this._checkNestedMove(nativeEvent);
          }
        },
        "release": (e) => {
          if (!isDrag) {
            e.setTo({ ...e.depaPos }, 0);
          }
          isHold = false;
          isDrag = false;
        }
      });
      this._axes = axes;
      if (options.useDrag) {
        this._panInput = new PanInput(scrollAreaElement, {
          preventClickOnDrag: options.preventClickOnDrag,
          preventDefaultOnDrag: options.preventDefaultOnDrag,
          inputType: ["mouse"],
          touchAction: "auto"
        });
        axes.connect(options.horizontal ? ["scroll", ""] : ["", "scroll"], this._panInput);
      }
      if (options.useSideWheel) {
        this._wheelInput = new WheelInput(scrollAreaElement, {
          useNormalized: false
        });
        axes.connect(options.horizontal ? ["scroll", ""] : ["", "scroll"], this._wheelInput);
      }
      if (options.useResizeObserver && window.ResizeObserver) {
        this._resizeObserver = new ResizeObserver((entries) => {
          const items = this._items;
          const length = items.length;
          let index = length;
          entries.forEach((entry) => {
            if (entry.target !== this._scrollAreaElement) {
              for (let i = 0; i < length; i++) {
                if (items[i].element === entry.target) {
                  index = Math.min(index, i);
                  break;
                }
              }
            }
          });
          for (let i = index; i < length; i++) {
            items[i] = this._getItem(items[i].element);
          }
          this.updateContainer();
        });
      }
      this.update();
      this._resizeObserver?.observe(scrollAreaElement);
      scrollAreaElement.addEventListener("scroll", this._onScroll);
      window.addEventListener("resize", this.update);
    }
    /**
     * Releases the instnace and events.
     * @ko 인스턴스와 이벤트를 해제한다.
     */
    destroy() {
      this._axes?.destroy();
      this.unsubscribe();
      this._scrollAreaElement?.removeEventListener("scroll", this._onScroll);
      this._resizeObserver?.disconnect();
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", this.update);
      }
      this.off();
      this._panInput = null;
      this._wheelInput = null;
      this._axes = null;
      this._resizeObserver = null;
    }
    _refreshScroll() {
      const horizontal = this._options.horizontal;
      const scrollAreaElement = this._scrollAreaElement;
      this._pos = Math.min(
        this._scrollSize - this._size,
        horizontal ? scrollAreaElement.scrollLeft : scrollAreaElement.scrollTop
      );
    }
    _getItem(element) {
      const horizontal = this._options.horizontal;
      return {
        element,
        pos: horizontal ? element.offsetLeft : element.offsetTop,
        size: horizontal ? element.offsetWidth : element.offsetHeight
      };
    }
    _getNativeEvent(e) {
      return e?.inputEvent?.srcEvent ? e.inputEvent?.srcEvent : e?.inputEvent;
    }
    _getNextScrollPos(item, options) {
      const size = this._size;
      const scrollSize = this._scrollSize;
      const align = options.align || "start";
      const padding = options.offset || 0;
      const itemPos = item.pos;
      const itemSize = item.size;
      let scrollPos = 0;
      if (align === "start") {
        scrollPos = itemPos - padding;
      } else if (align === "end") {
        scrollPos = itemPos + itemSize - size + padding;
      } else if (align === "center") {
        scrollPos = itemPos + itemSize / 2 - size / 2 + padding;
      }
      scrollPos = Math.max(0, Math.min(scrollPos, scrollSize - size));
      return scrollPos;
    }
    _isMixedWheel(nativeEvent) {
      return !!nativeEvent && nativeEvent?.type === "wheel" && nativeEvent?.deltaX && nativeEvent?.deltaY;
    }
    _checkNestedMove(nativeEvent) {
      if (this.isReachStart || this.isReachEnd) {
        nativeEvent.__childrenAxesAlreadyChanged = false;
      }
    }
    _debounceScroll() {
      if (!this._scrollTimer) {
        this.trigger("beginScroll");
      }
      window.clearTimeout(this._scrollTimer);
      this._scrollTimer = window.setTimeout(() => {
        const isWheelScroll = this._isWheelScroll;
        const isDragScroll = this._isDragScroll;
        const isAnimationScroll = this._isAnimationScroll;
        this._scrollTimer = 0;
        this.trigger("finishScroll", {
          isWheelScroll,
          isDragScroll,
          isAnimationScroll,
          isTrusted: isWheelScroll || isDragScroll || !isAnimationScroll
        });
        this._isWheelScroll = false;
        this._isDragScroll = false;
        this._isAnimationScroll = false;
      }, this._options.scrollDebounce);
    }
    _createAnimationParam(pos) {
      this._animateParam = {
        expectedPos: this._pos,
        offset: pos % 1
      };
    }
  };
  __decorateClass([
    Reactive("isReachStart")
  ], Conveyer.prototype, "_isReachStart", 2);
  __decorateClass([
    Reactive("isReachEnd")
  ], Conveyer.prototype, "_isReachEnd", 2);
  __decorateClass([
    Reactive("scrollPos")
  ], Conveyer.prototype, "_pos", 2);
  Conveyer = __decorateClass([
    ReactiveSubscribe
  ], Conveyer);
  const Conveyer$1 = Conveyer;
  const CONVEYER_METHODS = [
    "update",
    "findElement",
    "findItem",
    "scrollBy",
    "scrollTo",
    "scrollIntoView",
    "setItems",
    "updateContainer",
    "updateItems",
    "init",
    "enableInput",
    "disableInput"
  ];
  const CONVEYER_EVENTS = [
    "reachStart",
    "reachEnd",
    "leaveStart",
    "leaveEnd",
    "beginScroll",
    "finishScroll"
  ];
  const REACTIVE_CONVEYER = {
    methods: CONVEYER_METHODS,
    events: CONVEYER_EVENTS,
    created(data) {
      return new Conveyer$1(data.container, { ...data.props, autoInit: false });
    },
    init(instance, data) {
      if (data.props.autoInit !== false) {
        instance.init();
      }
    },
    on(instance, name, callback) {
      instance.on(name, callback);
    },
    off(instance, name, callback) {
      instance.off(name, callback);
    },
    destroy(instance) {
      instance.destroy();
    }
  };
  const modules = /* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    CONVEYER_EVENTS,
    CONVEYER_METHODS,
    REACTIVE_CONVEYER,
    default: Conveyer$1
  }, Symbol.toStringTag, { value: "Module" });
  for (const name in modules) {
    Conveyer$1[name] = modules[name];
  }
  return Conveyer$1;
}));
//# sourceMappingURL=conveyer.js.map

/*!
 * cobra-utils v1.0.1
 * (c) 2019-2020
 * https://github.com/xbc30/cobra-utils
 * Released under the MIT License.
 */
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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var BaseError = (function (_super) {
    __extends(BaseError, _super);
    function BaseError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.name = _newTarget.name;
        if (typeof Object.setPrototypeOf === 'function') {
            Object.setPrototypeOf(_this, _newTarget.prototype);
        }
        else if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(_this, (_newTarget));
        }
        else {
            _this.__proto__ = _newTarget.prototype;
        }
        return _this;
    }
    return BaseError;
}(Error));
var NodeError = (function (_super) {
    __extends(NodeError, _super);
    function NodeError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NodeError;
}(BaseError));
var ResError = (function (_super) {
    __extends(ResError, _super);
    function ResError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResError;
}(BaseError));
var UnhandleError = (function (_super) {
    __extends(UnhandleError, _super);
    function UnhandleError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UnhandleError;
}(BaseError));

var _toString = Object.prototype.toString;
var isOfType = function (type) { return function (x) { return typeof x === type; }; };
var getRawType = function (x) { return _toString.call(x).slice(8, -1); };
var isObjectOfType = function (type) { return function (x) { return getRawType(x) === type; }; };
var isFunction = isOfType('function');
var isString = isOfType('string');
var isBoolean = isOfType('boolean');
var isPlainObject = isObjectOfType('Object');
var isUndefined = isOfType('undefined');
var isNull = function (x) { return x === null; };
var isNullOrUndefined = function (x) { return isUndefined(x) || isNull(x); };
var isValid = function (x) { return !isUndefined(x) && !isNull(x); };
var isValidString = function (x) { return x != null && typeof x === "string" && x.length > 0; };
var isValidDate = function (d) { return Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d.getTime()); };
function isPc() {
    var userAgentInfo = window.navigator.userAgent;
    var agentType;
    (function (agentType) {
        agentType["Android"] = "Android";
        agentType["iPhone"] = "iPhone";
        agentType["SymbianOS"] = "SymbianOS";
        agentType["iPad"] = "iPad";
        agentType["iPod"] = "iPod";
    })(agentType || (agentType = {}));
    for (var item in agentType) {
        if (userAgentInfo.includes(item)) {
            return false;
        }
    }
    return true;
}
function isBrowser() {
    return (typeof window !== 'undefined' &&
        typeof window.document !== 'undefined' &&
        typeof window.document.createElement !== 'undefined');
}
var cityNumberList = [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82, 91];
function isCardID(id) {
    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(id)) {
        return { flag: false, msg: '你输入的身份证长度或格式错误' };
    }
    if (!cityNumberList.includes(parseInt(id.substr(0, 2)))) {
        return { flag: false, msg: '你的身份证地区有误' };
    }
    var birthday = (id.substr(6, 4) + "-" + Number(id.substr(10, 2)) + "-" + Number(id.substr(12, 2))).replace(/-/g, "/");
    var d = new Date(birthday);
    if (birthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
        return { flag: false, msg: '身份证上的出生日期非法' };
    }
    var sum = 0;
    var weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var codes = "10X98765432";
    for (var i = 0; i < id.length - 1; i++) {
        sum += parseInt(id[i]) * weights[i];
    }
    var last = codes[sum % 11];
    if (id[id.length - 1] != last) {
        return { flag: false, msg: '你输入的身份证号有误' };
    }
    return { flag: true, msg: '输入有效' };
}

var deepClone = function (target) {
    var limitTypes = ['Object', 'Array'];
    var dataType = getRawType(target);
    if (!limitTypes.includes(dataType))
        throw new BaseError('params invalid: it must one of ["Object, "Array]');
    var count = 0;
    var _clone = function (originObj) {
        if (count > 5000)
            return originObj;
        count++;
        var newObj = getRawType(originObj) === 'Array' ? [] : {};
        return Object.entries(originObj).reduce(function (prve, next) {
            var _a = __read(next, 2), key = _a[0], value = _a[1];
            var originType = isFunction(value) ? 'Function' : getRawType(value);
            switch (originType) {
                case 'Array':
                    prve[key] = __spread(value);
                    break;
                case 'Object':
                    prve[key] = _clone(value);
                    break;
                case 'Date':
                    prve[key] = new Date(value.getTime());
                    break;
                case 'Function':
                    prve[key] = new Function("return " + value.toString() + ";")();
                    break;
                default:
                    prve[key] = value;
            }
            return prve;
        }, newObj);
    };
    var duplicate = _clone(target);
    return duplicate;
};
var shuffle = function (arr) {
    var _a;
    var newArr = __spread(arr);
    var _b = __read([newArr.length, 0], 2), m = _b[0], i = _b[1];
    while (m) {
        i = (Math.random() * m--) >>> 0;
        _a = __read([newArr[i], newArr[m]], 2), newArr[m] = _a[0], newArr[i] = _a[1];
    }
    return newArr;
};
var compose = function () {
    var processors = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        processors[_i] = arguments[_i];
    }
    if (processors.length === 0)
        return function (input) { return input; };
    if (processors.length === 1)
        return processors[0];
    return processors.reduce(function (prev, next) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return next(prev.apply(void 0, __spread(args)));
        };
    });
};
var qsParse = function (str) {
    var obj = {};
    decodeURIComponent(str)
        .split('&')
        .forEach(function (item) {
        var arr = item.split('=');
        obj[arr[0]] = arr[1];
    });
    return obj;
};
var qsStringify = function (obj, encode) {
    if (obj === void 0) { obj = {}; }
    if (encode === void 0) { encode = false; }
    var str = Object.entries(obj).reduce(function (prev, next) {
        var _a = __read(next, 2), key = _a[0], value = _a[1];
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        if (prev) {
            prev += '&';
        }
        return "" + prev + key + "=" + value;
    }, '');
    return encode ? encodeURIComponent(str) : str;
};

var filterTag = function (str) {
    return str.replace(/&/ig, "&amp;").replace(/</ig, "&lt;").replace(/>/ig, "&gt;").replace(" ", "&nbsp;");
};
var filterSpecial = function (str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    var result = "";
    for (var i = 0; i < str.length; i++) {
        result = result + str.substr(i, 1).replace(pattern, '');
    }
    return result;
};

var _padStart = function (value) { return value.toString().padStart(2, '0'); };
function formatDateCus(date, format) {
    return format
        .replace(/yyyy/g, _padStart(date.getFullYear()))
        .replace(/dd/g, _padStart(date.getDate()))
        .replace(/mm/g, _padStart(date.getMonth() + 1))
        .replace(/hh/g, _padStart(date.getHours()))
        .replace(/ii/g, _padStart(date.getMinutes()))
        .replace(/ss/g, _padStart(date.getSeconds()));
}
function formatDateNumCus(date, format) {
    var datetime = new Date(date.toString().length === 10 ? date * 1000 : date);
    return isValidDate(datetime) ? format
        .replace(/yyyy/g, _padStart(datetime.getFullYear()))
        .replace(/dd/g, _padStart(datetime.getDate()))
        .replace(/mm/g, _padStart(datetime.getMonth() + 1))
        .replace(/hh/g, _padStart(datetime.getHours()))
        .replace(/ii/g, _padStart(datetime.getMinutes()))
        .replace(/ss/g, _padStart(datetime.getSeconds())) : '';
}
function formatDate(date) {
    var datetime = new Date(date.toString().length === 10 ? date * 1000 : date);
    return isValidDate(datetime) ? formatDateCus(datetime, 'yyyy-mm-dd hh:ii:ss') : '';
}
function formatCountdownCus(end, format) {
    var left = end.getTime() - Date.now();
    return format
        .replace(/d/g, parseInt((left / 1000 / 60 / 60 / 24).toString(), 10).toString())
        .replace(/h/g, parseInt((left / 1000 / 60 / 60 % 24).toString(), 10).toString())
        .replace(/m/g, parseInt((left / 1000 / 60 % 60).toString(), 10).toString())
        .replace(/s/g, parseInt((left / 1000 % 60).toString(), 10).toString());
}
function formatCountdownNumCus(end, format) {
    var left = (end.toString().length === 10 ? end * 1000 : end) - Date.now();
    return format
        .replace(/d/g, parseInt((left / 1000 / 60 / 60 / 24).toString(), 10).toString())
        .replace(/h/g, parseInt((left / 1000 / 60 / 60 % 24).toString(), 10).toString())
        .replace(/m/g, parseInt((left / 1000 / 60 % 60).toString(), 10).toString())
        .replace(/s/g, parseInt((left / 1000 % 60).toString(), 10).toString());
}
function formatCountdown(end) {
    var endtime = new Date(end.toString().length === 10 ? end * 1000 : end);
    return isValidDate(endtime) ? formatCountdownCus(endtime, 'd天h小时m分s秒') : '';
}
function formatHiddenPhone(phone) {
    var len = phone.length;
    return len <= 11 ? phone.substr(0, 3) + "****" + phone.substring(7) : phone.substr(len - 11, 3) + "****" + phone.substring(len - 4);
}
function formatHiddenEmail(email) {
    var emailStr = email.split('@');
    return emailStr[0].length > 3 ? emailStr[0].substr(0, 3) + "****@" + emailStr[1] : "***@" + emailStr[1];
}
function formatPercentage(portion, total) {
    return parseFloat(((portion / total) * 100).toFixed(2)) + '%';
}
function formatThousands(num) {
    var regulateArr = (num || 0).toString().split('.');
    var regulateNum = regulateArr[0];
    var result = '';
    while (regulateNum.length > 3) {
        result = ',' + regulateNum.slice(-3) + result;
        regulateNum = regulateNum.slice(0, regulateNum.length - 3);
    }
    if (regulateNum) {
        result = regulateNum + result;
    }
    return result + (regulateArr[1] ? '.' + regulateArr[1] : '');
}
var ordinalSuffixOf = function (i, lower) {
    if (lower === void 0) { lower = true; }
    var _a = __read([i % 10, i % 100, 'th'], 3), j = _a[0], k = _a[1], res = _a[2];
    if (j == 1 && k != 11) {
        res = 'st';
    }
    if (j == 2 && k != 12) {
        res = 'nd';
    }
    if (j == 3 && k != 13) {
        res = 'rd';
    }
    return i + (lower ? res : res.toLocaleUpperCase());
};

var getRandom = function (max, min, int) {
    if (min === void 0) { min = 0; }
    if (int === void 0) { int = true; }
    min = Math.ceil(min);
    max = Math.floor(max);
    var res = Math.random() * (max - min + 1) + min;
    return int ? Math.floor(res) : res;
};
var getBase64 = function (imgSrc) {
    return new Promise(function (resolve, reject) {
        if (typeof FileReader !== 'undefined') {
            var xhr_1 = new XMLHttpRequest();
            xhr_1.open('GET', imgSrc, true);
            xhr_1.responseType = 'blob';
            xhr_1.onreadystatechange = function () {
                if (xhr_1.readyState === 4) {
                    if (xhr_1.status === 200 || (xhr_1.status === 0 && xhr_1.response)) {
                        var reader_1 = new FileReader();
                        reader_1.readAsDataURL(xhr_1.response);
                        reader_1.onloadend = function () { return resolve(reader_1.result); };
                        reader_1.onerror = function (error) { return reject(error); };
                    }
                }
            };
            xhr_1.send(null);
        }
        else {
            var img_1 = new Image();
            img_1.src = imgSrc;
            img_1.crossOrigin = 'Anonymous';
            img_1.onload = function () {
                try {
                    var canvas = document.createElement('canvas');
                    canvas.width = img_1.width;
                    canvas.height = img_1.height;
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(img_1, 0, 0, img_1.width, img_1.height);
                    var dataURL = canvas.toDataURL('image/png');
                    resolve(dataURL);
                }
                catch (error) {
                    console.log(error);
                    reject(error);
                }
            };
            img_1.onerror = function (error) { return reject(error); };
        }
    });
};

var Debounced = (function () {
    function Debounced() {
        var _this = this;
        this.use = function (func, delay, immediate) {
            if (immediate === void 0) { immediate = false; }
            var timer;
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (immediate) {
                    func.apply(_this, args);
                    immediate = false;
                    return;
                }
                clearTimeout(timer);
                timer = setTimeout(function () {
                    func.apply(_this, args);
                }, delay);
            };
        };
    }
    return Debounced;
}());
var Throttle = (function () {
    function Throttle() {
        this.stop = false;
        this.death = false;
    }
    Throttle.prototype.use = function (func, delay, immediate) {
        var _this = this;
        if (immediate === void 0) { immediate = false; }
        var flag = true;
        var self = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this.death) {
                func.apply(_this, args);
                return;
            }
            if (_this.stop) {
                func.apply(_this, args);
                return;
            }
            if (immediate) {
                func.apply(_this, args);
                immediate = false;
                return;
            }
            if (!flag) {
                return;
            }
            flag = false;
            self.timer = setTimeout(function () {
                func.apply(_this, args);
                flag = true;
            }, delay);
        };
    };
    Throttle.prototype.destroy = function () {
        this.death = true;
        this.stop = true;
        if (!!this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
    };
    Throttle.prototype.open = function () {
        if (!this.death) {
            this.stop = false;
        }
    };
    Throttle.prototype.close = function () {
        this.stop = true;
    };
    return Throttle;
}());

var tuple = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args;
};
var tupleNum = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args;
};

function validateStr(str, type) {
    switch (type) {
        case 'phone':
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'card':
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        case 'pwd':
            return /^[a-zA-Z]\w{5,17}$/.test(str);
        case 'postal':
            return /[1-9]\d{5}(?!\d)/.test(str);
        case 'qq':
            return /^[1-9][0-9]{4,9}$/.test(str);
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'money':
            return /^\d*(?:\.\d{0,2})?$/.test(str);
        case 'URL':
            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
        case 'IP':
            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
        case 'date':
            return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str);
        case 'number':
            return /^[0-9]$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        case "alphabets":
            return /^[A-Za-z]+$/.test(str);
        case "special":
            return /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/.test(str);
        case 'html':
            return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
        default:
            return true;
    }
}

export { BaseError, Debounced, NodeError, ResError, Throttle, UnhandleError, compose, deepClone, filterSpecial, filterTag, formatCountdown, formatCountdownCus, formatCountdownNumCus, formatDate, formatDateCus, formatDateNumCus, formatHiddenEmail, formatHiddenPhone, formatPercentage, formatThousands, getBase64, getRandom, getRawType, isBoolean, isBrowser, isCardID, isFunction, isNull, isNullOrUndefined, isPc, isPlainObject, isString, isUndefined, isValid, isValidDate, isValidString, ordinalSuffixOf, qsParse, qsStringify, shuffle, tuple, tupleNum, validateStr };
//# sourceMappingURL=index.es.js.map

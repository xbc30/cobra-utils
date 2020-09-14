// 通用类
import { BaseError } from './error';
import { getRawType, isFunction } from './is';
import { TAnyObject } from './types';

export type TTarget = TAnyObject;
export type TDeepClone = (target: TTarget) => TTarget;
/**
 * @description 深拷贝，未考虑循环引用
 * @param {(object|array)} target - 要深拷贝的目标
 * @returns {(object|array)} - 返回 深拷贝
 */
export const deepClone: TDeepClone = (target) => {
    // 如果是json格式,调用原生JSON方法,
    // NOTES: 会忽略函数、symbol等属性,弃用
    // if (JSON.stringify(target)) {
    //   return JSON.parse(JSON.stringify(target));
    // }
    const limitTypes = ['Object', 'Array'];
    const dataType = getRawType(target);
    if (!limitTypes.includes(dataType))
        throw new BaseError('params invalid: it must one of ["Object, "Array]');

    // 统计递归次数
    let count = 0;
    const _clone = (originObj: TTarget): TTarget => {
        // 防止 循环引用，引起爆栈
        if (count > 5000) return originObj;
        count++;
        const newObj: TTarget = getRawType(originObj) === 'Array' ? [] : {};

        return Object.entries(originObj).reduce((prve, next) => {
            const [key, value] = next;
            const originType = isFunction(value) ? 'Function' : getRawType(value);
            switch (originType) {
                case 'Array':
                    prve[key] = [...value];
                    break;
                case 'Object':
                    prve[key] = _clone(value);
                    break;
                case 'Date':
                    prve[key] = new Date(value.getTime());
                    break;
                case 'Function':
                    // console.log('key:::', key);
                    // console.log('value:::', value.toString());
                    // prve[key] = eval(value.toString())
                    prve[key] = new Function(`return ${value.toString()};`)();
                    break;
                default:
                    prve[key] = value;
            }
            return prve;
        }, newObj);
    };
    const duplicate = _clone(target);
    // console.log(count);
    return duplicate;
};

export type TShuffle = <T>(arr: T[]) => T[];

/**
 * @description 随机打乱数组
 * @param {array} arr - 要打乱的原数组
 * @returns 返回打乱后的新数组
 */
export const shuffle: TShuffle = (arr) => {
    const newArr = [...arr];
    let [m, i] = [newArr.length, 0];
    while (m) {
        i = (Math.random() * m--) >>> 0; //取整
        [newArr[m], newArr[i]] = [newArr[i], newArr[m]];
    }
    return newArr;
};

export type TPipe<T, U> = (...args: T[]) => U;
/**
 * @description 函数柯里化
 * @param Array<TPipe<any, T>> - ...processors
 * @returns TPipe<any, T>
 */
export const compose = <T>(...processors: Array<TPipe<any, T>>): TPipe<any, T> => {
  if (processors.length === 0) return (input: T) => input;
  if (processors.length === 1) return processors[0];
  return processors.reduce((prev, next) => {
    return (...args: any[]) => next(prev(...args));
  });
};

export type TQsParse = (str: string) => TAnyObject;

/**
 * @description url query 参数字符串转json对象
 * @param {string} str - 参数字符串
 * @returns {object} 返回 json对象
 */
export const qsParse: TQsParse = (str) => {
  const obj: TAnyObject = {};
  decodeURIComponent(str)
    .split('&')
    .forEach((item) => {
      const arr = item.split('=');  
      obj[arr[0]] = arr[1];
    });
  return obj;
};

export type TQsStringify = (obj: TAnyObject, encode: boolean) => string | '';

/**
 * @description url query json对象转参数字符串
 * @param {object} obj - json对象
 * @param {bool} encode - 是否进行encode编码，默认false
 * @returns {string} - 返回 参数字符串
 */
export const qsStringify: TQsStringify = (obj = {}, encode = false) => {
  const str = Object.entries(obj).reduce((prev, next) => {
    let [key, value] = next;
    if (typeof value === 'object') {
      // NOTE: 如果 value 对象含有 NaN、Infinity、symbol、func等会转化成 null
      // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
      value = JSON.stringify(value);
    }

    if (prev) {
      prev += '&';
    }
    return `${prev}${key}=${value}`;
  }, '');
  return encode ? encodeURIComponent(str) : str;
};

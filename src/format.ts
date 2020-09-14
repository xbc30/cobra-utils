// 格式化类
import {isValidDate} from "./is"

const _padStart = (value: number): string => value.toString().padStart(2, '0');

/**
 * @description 格式化时间(自定义格式)
 * @param {Date} - date
 * @param {string} - format
 * @returns {string}
 */
export function formatDateCus (date: Date, format: string): string  {
    return format
        .replace(/yyyy/g, _padStart(date.getFullYear()))
        .replace(/dd/g, _padStart(date.getDate()))
        .replace(/mm/g, _padStart(date.getMonth() + 1))
        .replace(/hh/g, _padStart(date.getHours()))
        .replace(/ii/g, _padStart(date.getMinutes()))
        .replace(/ss/g, _padStart(date.getSeconds()));
}

/**
 * @description 格式化时间(自定义格式)
 * @param {number} - date
 * @param {string} - format
 * @returns {string}
 */
export function formatDateNumCus (date: number, format: string): string {
    const datetime = new Date(date.toString().length === 10 ? date * 1000 : date);

    return isValidDate(datetime) ? format
        .replace(/yyyy/g, _padStart(datetime.getFullYear()))
        .replace(/dd/g, _padStart(datetime.getDate()))
        .replace(/mm/g, _padStart(datetime.getMonth() + 1))
        .replace(/hh/g, _padStart(datetime.getHours()))
        .replace(/ii/g, _padStart(datetime.getMinutes()))
        .replace(/ss/g, _padStart(datetime.getSeconds())) : '';
}

/**
 * @description 格式化时间(标准格式)
 * @param {number} - date
 * @returns {string}
 */
export function formatDate (date: number): string {
    const datetime = new Date(date.toString().length === 10 ? date * 1000 : date);
    return isValidDate(datetime) ? formatDateCus(datetime, 'yyyy-mm-dd hh:ii:ss') : '';
}

/**
 * @description 格式化倒计时(自定义格式)
 * @param {Date} - end
 * @param {string} - format
 * @returns {string}
 */
export function formatCountdownCus (end: Date, format: string): string {
    const left = end.getTime() - Date.now();
    return format
        .replace(/d/g, parseInt((left / 1000 / 60 / 60 / 24).toString(), 10).toString())
        .replace(/h/g, parseInt((left / 1000 / 60 / 60 % 24).toString(), 10).toString())
        .replace(/m/g, parseInt((left / 1000 / 60 % 60).toString(), 10).toString())
        .replace(/s/g, parseInt((left / 1000 % 60).toString(), 10).toString())
}

/**
 * @description 格式化倒计时(自定义格式)
 * @param {number} - end
 * @param {string} - format
 * @returns {string}
 */
export function formatCountdownNumCus (end: number, format: string): string {
    const left = (end.toString().length === 10 ? end * 1000 : end) - Date.now();
    return format
        .replace(/d/g, parseInt((left / 1000 / 60 / 60 / 24).toString(), 10).toString())
        .replace(/h/g, parseInt((left / 1000 / 60 / 60 % 24).toString(), 10).toString())
        .replace(/m/g, parseInt((left / 1000 / 60 % 60).toString(), 10).toString())
        .replace(/s/g, parseInt((left / 1000 % 60).toString(), 10).toString())
}

/**
 * @description 格式化倒计时(标准格式)
 * @param {number} - end
 * @returns {string}
 */
export function formatCountdown (end: number): string {
    const endtime = new Date(end.toString().length === 10 ? end * 1000 : end);
    return isValidDate(endtime) ? formatCountdownCus(endtime, 'd天h小时m分s秒') : '';
}

/**
 * @description 格式化隐藏手机号
 * @param {string} - phone
 * @returns {string}
 */
export function formatHiddenPhone (phone: string): string {
    const len = phone.length
    return len <= 11 ? `${phone.substr(0, 3)}****${phone.substring(7)}` : `${phone.substr(len - 11, 3)}****${phone.substring(len - 4)}`
}

/**
 * @description 格式化隐藏邮箱
 * @param {string} - email
 * @returns {string}
 */
export function formatHiddenEmail (email: string): string {
    const emailStr = email.split('@')
    return emailStr[0].length > 3 ? `${emailStr[0].substr(0, 3)}****@${emailStr[1]}` : `***@${emailStr[1]}`
}


/**
 * @description 格式化百分比
 * @param {string} - 分子
 * @param {string} - total 分母
 * @returns {string}
 */
export function formatPercentage (portion: number, total: number): string {
    return parseFloat(((portion/total) * 100).toFixed(2)) + '%'
}

/**
 * @description 格式化千分位
 * @param {string}
 * @returns {string}
 */
export function formatThousands (num: string): string {
    const regulateArr = (num || 0).toString().split('.')
    let regulateNum = regulateArr[0];
    let result = '';
    while (regulateNum.length > 3) {
        result = ',' + regulateNum.slice(-3) + result;
        regulateNum = regulateNum.slice(0, regulateNum.length - 3);
    }
    if (regulateNum) { result = regulateNum + result; }
    return result + (regulateArr[1] ? '.' + regulateArr[1] : '');
}
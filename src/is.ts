const _toString = Object.prototype.toString;
const isOfType = (type: string) => (x: any) => typeof x === type;

export const getRawType = (x: any) => _toString.call(x).slice(8, -1);
const isObjectOfType = (type: string) => (x: string) => getRawType(x) === type;

export const isFunction = isOfType('function');
export const isString = isOfType('string');
export const isBoolean = isOfType('boolean');
export const isPlainObject = isObjectOfType('Object');
export const isUndefined = isOfType('undefined');
export const isNull = (x: any) => x === null;
export const isNullOrUndefined = (x: any) => isUndefined(x) || isNull(x);
export const isValid = (x: any) => !isUndefined(x) && !isNull(x);
export const isValidString = (x: string): boolean => x != null && typeof x === "string" && x.length > 0;
export const isValidDate = (d: Date): boolean => Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d.getTime());

declare const window: Window;
export function isPc(): boolean {
    const userAgentInfo = window.navigator.userAgent;
    enum agentType {
        Android = "Android",
        iPhone = "iPhone",
        SymbianOS = "SymbianOS",
        iPad = "iPad",
        iPod = "iPod"
    }

    for (let item in agentType) {
        if (userAgentInfo.includes(item)) {
            return false
        }
    }
    return true;
}

export function isBrowser() {
    return (
        typeof window !== 'undefined' &&
        typeof window.document !== 'undefined' &&
        typeof window.document.createElement !== 'undefined'
    );
};

/**
 * @description 判断身份证是否输入得当，并给予提示信息
 * @param {string} - id 身份证号
 * @returns {isCardIDReturn}
 */
interface isCardIDReturn {
    flag?: boolean,
    msg?: string
}
const cityNumberList: number[] = [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82, 91];

export function isCardID(id: string): isCardIDReturn {
    // 验证长度格式
    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(id)) {
        return { flag: false, msg: '你输入的身份证长度或格式错误' }
    }
    // 验证身份证城市
    if (!cityNumberList.includes(parseInt(id.substr(0, 2)))) {
        return { flag: false, msg: '你的身份证地区有误' }
    }
    // 验证出生日期
    const birthday = (id.substr(6, 4) + "-" + Number(id.substr(10, 2)) + "-" + Number(id.substr(12, 2))).replace(/-/g, "/");
    const d = new Date(birthday);
    if (birthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
        return { flag: false, msg: '身份证上的出生日期非法' }
    }

    // 身份证号码校验
    let sum = 0;
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const codes = "10X98765432";
    for (let i = 0; i < id.length - 1; i++) {
        sum += parseInt(id[i]) * weights[i];
    }
    const last = codes[sum % 11]; //计算出来的最后一位身份证号码
    if (id[id.length - 1] != last) {
        return { flag: false, msg: '你输入的身份证号有误' }
    }

    return { flag: true, msg: '输入有效' }
}
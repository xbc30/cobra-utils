// 过滤类

/**
 * @description 过滤html标签
 * @param {string} str
 * @returns {string}
 */
export const filterTag = (str: string): string => {
    return str.replace(/&/ig, "&amp;").replace(/</ig, "&lt;").replace(/>/ig, "&gt;").replace(" ", "&nbsp;");
}

/**
 * @description 过滤特殊字符
 * @param {string} - str
 * @returns {string} 
 */
export const filterSpecial = (str: string): string => {
    const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
    let result = "";
    for (let i = 0; i < str.length; i++) {
        result = result + str.substr(i, 1).replace(pattern, '');
    }
    return result;
}

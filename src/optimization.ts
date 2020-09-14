
/**
 * @description Anti-shake 防抖
 * @param {class} - new Class
 * @returns {Function} .use() return
 */
export class Debounced {
    /**
         * @param func need to wrap the function
         * @param delay Delay time, unit ms
         * @param immediate is executed once by default (no delay for the first time)
     */
    public use = (func: Function, delay: number, immediate: boolean = false): Function => {
        let timer: number | any
        return (...args: any) => {
            if (immediate) {
                func.apply(this, args) // Make sure that the referenced function is pointing correctly and that the function parameters are also unchanged
                immediate = false
                return
            }
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }
}

/**
 * @description Throttling 节流
 * @param {class} - new Class
 * @returns {Function} .use() return
 */
export class Throttle {
    private timer: number | any
    private stop: boolean = false
    private death: boolean = false
    /**
         * @param func need to wrap the function
         * @param delay Delay time, unit ms
         * @param immediate is executed once by default (no delay for the first time)
     */
    public use(func: Function, delay: number, immediate: boolean = false): Function {
        let flag = true
        const self = this
        return (...args: any) => {
            if (this.death) {
                func.apply(this, args)
                return
            }
            if (this.stop) {
                func.apply(this, args)
                return
            }
            if (immediate) {
                func.apply(this, args)
                immediate = false
                return
            }
            if (!flag) {
                return
            }
            flag = false
            self.timer = setTimeout(() => {
                func.apply(this, args)
                flag = true
            }, delay)
        }
    }

    // destroy
    public destroy() {
        this.death = true
        this.stop = true
        if (!!this.timer) {
            clearTimeout(this.timer)
            this.timer = undefined
        }
    }
    // turn on
    public open() {
        if (!this.death) {
            this.stop = false
        }
    }
    // shut down
    public close() {
        this.stop = true
    }
}

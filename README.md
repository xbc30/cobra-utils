## Cobra-Utils

Common Tool Functions (based on Typescript to build and realize)

### Installation

You can install and save an entry to your package.json with the following command:

```shell
$ npm i cobra-utils -D
```

### Usage

```Vue
<template>
  <div class="hello">
    <h2>{{"18912345678" | hiddenPhone}}</h2>
  </div>
</template>

<script>
import { formatHiddenPhone } from "cobra-utils"

export default {
  name: 'HelloWorld',
  filters: {
    hiddenPhone(value) {
      return formatHiddenPhone(value)
    }
  }
}
</script>
```

## OverView

### [common - 通用类](https://github.com/xbc30/cobra-utils/blob/master/src/common.ts)

* deepClone - 深拷贝
* shuffle - 随机打乱数组
* compose - 柯里化
* qsParse - 参数字符串转json对象
* qsStringify - json对象转参数字符串

### [filter - 过滤类](https://github.com/xbc30/cobra-utils/blob/master/src/filter.ts)

* filterTag - 过滤html标签
* filterSpecial - 过滤特殊字符

### [format - 格式化类](https://github.com/xbc30/cobra-utils/blob/master/src/format.ts)

* formatDateCus formatDateNumCus formatDate
* formatCountdownCus formatCountdownNumCus formatCountdown
* formatHiddenPhone formatHiddenEmail
* formatPercentage formatThousands

### [get - 获取类](https://github.com.xbc30/cobra-utils/blob/master/src/get.ts)

* getRandom - 获取某个区间[min=0, max]的随机数
* getBase64 - 获取图片base64

### [is - 判断类](https://github.com/xbc30/cobra-utils/blob/master/src/is.ts)

* isFunction isString isBoolean isPlainObject
* isUndefined isNull isNullOrUndefined
* isValid isValidString isValidDate
* isPc isBrowser
* isCardID

### [optimization - 优化类](https://github.com/xbc30/cobra-utils/blob/master/src/optimization.ts)

* Debounced - 防抖
* Throttle - 节流

### [validate - 验证类](https://github.com/xbc30/cobra-utils/blob/master/src/validate.ts)

* validateStr - 匹配验证类型

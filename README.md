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

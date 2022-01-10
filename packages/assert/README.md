# Astro Import Assertions

```sh
npm install @astropub/assert
```

```js
// astro.config.js
import { assertPlugin } from '@astropub/assert'

export default {
  vite: {
    plugins: [
      assertPlugin()
    ]
  }
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/astro-community/assert)



## Configuration

You can pass in special handlers for `load` and `transform` when imports with assertions are encountered.

```js
import { assertions } from '@astropub/assert'

// astro.config.js
export default {
  vite: {
    plugins: [
      load(id, assert) {
        console.log(assert)
        // e.g. { type: "json" }
        // e.g. { type: "react-component", client: "load" }
      }
    ]
  }
}
```

### `load(id, assertions, )



## License

**Codecs** is a remix of [Squoosh!](https://github.com/GoogleChromeLabs/squoosh). 

Code original to this project is licensed under the CC0-1.0 License.

Code from [Squoosh!](https://github.com/GoogleChromeLabs/squoosh) is licensed under the Apache-2.0 License, Copyright Google Inc.


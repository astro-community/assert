# Astro Assert

**Astro Assert** lets you use [Import Assertions](https://github.com/tc39/proposal-import-assertions#readme) in Astro.

```astro
---
import page from '../data/pages/index.json' assert { type: 'json' }
---
<title>{page.pageTitle} - {page.siteTitle}</title>

<body>
  <h1>{page.pageTitle}</h1>
</body>
```



## Usage

Install **Astro Assert** to your project.

```sh
npm install @astropub/assert
```

You can use **Astro Assert** with defaults as a **renderer**.

```js
// astro.config.js
export default {
  renderers: [
    '@astropub/assert'
  ]
}
```

You can also configure **Astro Assert** as a **Vite Plugin**.

```js
// astro.config.js
import { assertPlugin } from '@astropub/assert'

export default {
  vite: {
    plugins: [
      assertions()
    ]
  }
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/astro-community/assert)

## 🚀 Project Structure

```
/
├── demo/
│   ├── public/
│   └── src/
│       └── pages/
│           └── index.astro
└── packages/
  └── assert/
    ├── index.js
    └── package.json
```

This project uses **workspaces** to develop a single plugin, `@astropub/assert-component`, from `packages/assert`. This project also includes a `demo` Astro site for testing and demonstrating the plugin.



## Configuration

```js
import { assertions } from '@astropub/assert'
// astro.config.js
export default {
  vite: {
    plugins: [
      load(id, assert) {
        console.log(assert) // { type: ?, etc: ? }
      }
    ]
  }
}
```



## Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                                       |
|:--------------  |:-------------------------------------------- |
| `npm install`   | Installs dependencies                        |
| `npm run start` | Starts local dev server at `localhost:3000`  |
| `npm run build` | Build your production site to `./dist/`      |
| `npm run serve` | Preview your build locally, before deploying |

## 👀 Want to learn more?

Feel free to check [our documentation](https://github.com/withastro/astro) or jump into our [Discord server](https://astro.build/chat).

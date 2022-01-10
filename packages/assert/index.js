import { astroRenderer } from './lib/astro-renderer.js'
import { vitePlugin } from './lib/vite-plugin.js'

export const name = '@astropub/assert'

export { vitePlugin as assertPlugin }

export default astroRenderer

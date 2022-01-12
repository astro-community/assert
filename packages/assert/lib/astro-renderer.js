import { defaultOptions } from './vite-plugin-default-options.js'
import { vitePlugin } from './vite-plugin.js'

export const name = '@astropub/assert'

export const astroRenderer = {
	name,
	server: './server.js',
	viteConfig() {
		return {
			plugins: [
				vitePlugin(defaultOptions),
			],
		}
	},
}

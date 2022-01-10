import * as fs from 'node:fs/promises'
import { vitePlugin } from './vite-plugin.js'
import * as transforms from './transforms.js'

export const name = '@astropub/assert'

export const astroRenderer = {
	name,
	server: './server.js',
	viteConfig() {
		return {
			plugins: [
				vitePlugin({
					load(id, assert) {
						if (assert.type === 'json') {
							return fs.readFile(id, 'utf-8').then(
								data => {
									return {
										code: `export default ${JSON.stringify(JSON.parse(data))}`
									}
								}
							)
						}

						if (assert.type === 'text') {
							return fs.readFile(id, 'utf-8').then(
								data => {
									return {
										code: `export default ${JSON.stringify(data.replace(/</g, '&lt;'))}`
									}
								}
							)
						}

						if (assert.type === 'web-component') {
							return {
								code: transforms.toWebComponent(id, assert)
							}
						}

						if (id.endsWith('.jsx') && assert.client) {
							return {
								code: transforms.toClientDirectiveComponent(id, assert)
							}
						}
					},
				}),
			],
		}
	},
}

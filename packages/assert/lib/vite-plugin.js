import acornImportAssertionsPlugin from './acorn-plugin.js'

export const name = '@astropub/assert'

/** @type {PluginFactory} */
export const vitePlugin = (handlers) => {
	/** @type {Plugin} */
	const plugin = {
		name,
		enforce: 'pre',
		options() {
			return {
				acornInjectPlugins: [
					acornImportAssertionsPlugin,
				],
			}
		},
		configResolved(config) {
			const index = config.plugins.indexOf(plugin)

			config.plugins.splice(index, 1)
			config.plugins.unshift(plugin)
		},
		resolveId(sourceId, importerId, options) {
			return this.resolve(sourceId, importerId, { skipSelf: true, ...options }).then(
				resolution => {
					// skip null resolutions
					if (resolution == null) return resolution

					const [ resolveId, search ] = resolution.id.split(/(?<=^[^?]+)\?/)
					const params = new URLSearchParams(search)
		
					if (params.has('assert')) {
						const assertionJSON = params.get('assert')

						/** @type {AssertionData} */
						const assertionData = JSON.parse(assertionJSON)
		
						params.delete('assert')
		
						const searchParams = [ ...params ].length ? `?${params}` : ''

						setModuleAssertions(resolution.id, resolveId + searchParams, assertionData)

						return resolution
					}
				}
			)
		},
		load(id, ssr) {
			const assert = getModuleAssertions(id)

			if (assert && typeof handlers.load === 'function') {
				return handlers.load.call(this, assert.id, assert.assert, ssr)
			}
		},
		transform(code, id, ssr) {
			const assert = getModuleAssertions(id)

			if (assert && typeof handlers.transform === 'function') {
				return handlers.transform.call(this, code, assert.id, assert.assert, ssr)
			}
		},
	}

	return plugin
}

const getModuleAssertions = (
	/** @type {string} */ resolveId
) => moduleAssertions[resolveId] || null

const setModuleAssertions = (
	/** @type {string} */ resolveId,
	/** @type {string} */ id,
	/** @type {AssertionData} */ assert
) => {
	moduleAssertions[resolveId] = { id, assert }
}

/** @type {AssertionMap} */
const moduleAssertions = Object.create(null)

/** @typedef {import('./vite-plugin').AssertionData} AssertionData */
/** @typedef {import('./vite-plugin').AssertionMap} AssertionMap */
/** @typedef {import('./vite-plugin').JsonLike} JsonLike */
/** @typedef {import('./vite-plugin').Plugin} Plugin */
/** @typedef {import('./vite-plugin').PluginFactory} PluginFactory */

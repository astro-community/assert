import acornImportAssertionsPlugin from './acorn-plugin.js'

export const name = '@astropub/assert'

/** @type {PluginFactory} */
export const vitePlugin = (handlers) => {
	handlers = Object(handlers)

	/** @type {Plugin} */
	const plugin = {
		name,
		enforce: 'pre',
		options(options) {
			options = Object(options)

			options.acornInjectPlugins = options.acornInjectPlugins || []
			options.acornInjectPlugins.push(acornImportAssertionsPlugin)

			return options
		},
		configResolved(config) {
			const index = config.plugins.indexOf(plugin)

			config.plugins.splice(index, 1)
			config.plugins.unshift(plugin)
		},
		resolveId(sourceId, importerId, options) {
			if (!sourceId || !sourceId.includes('assert=')) return

			const [ resolveId, assert ] = withModuleAssertions(sourceId)

			return this.resolve(resolveId, importerId, { skipSelf: true, ...options }).then(
				resolution => {
					// skip null resolutions
					if (resolution == null) return resolution

					setModuleAssertions(sourceId, resolution.id, assert)

					resolution.id = sourceId

					return resolution
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

const withModuleAssertions = (
	/** @type {string} */ id
) => {
	const [ resolveId, search ] = id.split(/(?<=^[^?]+)\?/)
	const params = new URLSearchParams(search)

	if (!params.has('assert')) return [ resolveId, null ]

	const assertionJSON = params.get('assert')

	/** @type {AssertionData} */
	const assertionData = JSON.parse(assertionJSON)

	params.delete('assert')

	const searchParams = [ ...params ].length ? `?${params}` : ''

	return [ resolveId + searchParams, assertionData ]
}

/** @type {AssertionMap} */
const moduleAssertions = Object.create(null)

/** @typedef {import('./vite-plugin').AssertionData} AssertionData */
/** @typedef {import('./vite-plugin').AssertionMap} AssertionMap */
/** @typedef {import('./vite-plugin').JsonLike} JsonLike */
/** @typedef {import('./vite-plugin').Plugin} Plugin */
/** @typedef {import('./vite-plugin').PluginFactory} PluginFactory */

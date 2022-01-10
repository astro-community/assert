export const toClientDirectiveComponent = (
	/** @type {string} */ id,
	/** @type {AssertionData} */ assert
) => `import { render, createComponent, renderComponent, createMetadata } from 'astro/internal'

import Module from '${id}'

import * as module from '${id}'

export const metadata = createMetadata(import.meta.url, { modules: [{ module, specifier: '${id}', assert: {} }], hydratedComponents: [ Module ], hydrationDirectives: new Set(['${assert.client}']), hoisted: [] })

// @ts-ignore

const Component = createComponent(async (result, props, slots) => {
	return render\`\${renderComponent(result,'Module',Module,{"client:${assert.client}":true,"client:component-hydration":"${assert.client}","client:component-path":(metadata.getPath(Module)),"client:component-export":(metadata.getExport(Module))})}\`
})

export default Component
`

export const toWebComponent = (
	/** @type {string} */ id,
	/** @type {AssertionData} */ assert
) => `import { render, createComponent, renderSlot, createMetadata } from 'astro/internal'

import Module from '${id}'

import * as module from '${id}'

export const metadata = createMetadata(import.meta.url, { modules: [{ module, specifier: '${id}', assert: {} }], hydratedComponents: [ Module ], hydrationDirectives: new Set(['${assert.client}']), hoisted: [] })

// @ts-ignore

const Component = createComponent(async ($$result, $$props, $$slots) => {
	const name = customElements.getName(Module)
	const observedAttributes = Array.isArray(Module.observedAttributes) ? Module.observedAttributes : []
	const slots = { ...$$props }

	$$result.scripts.add({
		props: { type: 'module' },
		children: \`import "${id}";\`,
	});

	let attrHTML = ''
	let slotHTML = ''

	for (const attr of observedAttributes) {
		if (attr in $$props) {
			attrHTML += \` \${attr}="\${toAttributeString($$props[attr])}"\`

			delete slots[attr]
		}
	}

	return render\`<\${name}\${attrHTML}>\${renderSlot($$result,$$slots.default)}</\${name}>\`
})

const toAttributeString = (value) => String(value).replace(/&/g, '&#38;').replace(/"/g, '&#34;')

export default Component
`

/** @typedef {import('./vite-plugin').AssertionData} AssertionData */

const rtf = new Intl.RelativeTimeFormat('en', {
	localeMatcher: 'best fit',
	numeric: 'always',
	style: 'long',
})

export default class HTMLTimeStampElement extends HTMLElement {
	connectedCallback() {
		this.textContent = rtf.format(
			Math.floor(
				(new Date(this.attributes.datetime.value) - Date.now()) /
					1000 /
					60 /
					60 /
					24
			),
			'day'
		)
	}

	static observedAttributes = [ 'datetime' ]
}

customElements.define('time-stamp', HTMLTimeStampElement)

<template>
	<svg v-show="path"></svg>
</template>

<script>
export default {
	name: 'SvgIcon',
	props: {
		iconName: {
			type: String,
			required: true
		},
		path: {
			type: String,
			required: true
		},
		stroke: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			src: null
		}
	},
	watch: {
		iconName() {
			this.loadSVG()
		}
	},
	mounted() {
		this.loadSVG()
	},
	methods: {
		requestSVG(path) {
			return new Promise((resolve, reject) => {
				//const cachedSVG = this.$store.getters.cachedSVG[path]
				//if (cachedSVG) {
				//	resolve(cachedSVG)
				//}
				const request = new XMLHttpRequest()
				request.open('GET', path, true)
				request.onload = () => {
					if (request.status >= 200 && request.status < 400) {
						// cache SVG here -> this.$store.dispath('svg/addSVGToCache', request.responseText)
						resolve(request.responseText)
					} else {
						console.error('There was an error retrieving the source of the SVG in: ' + path)
						reject()
					}
				}
				request.onerror = () => {
					console.error('XML Http Request error retrieving SVG in: ' + path)
					reject()
				}

				request.send()
			})
		},
		loadSVG() {
			// Reset SVG component
			this.cleanSVGComponent()
			if (!this.path) {
				console.error('The name of the icon ' + this.iconName + ' is not a valid one')
				return
			}
			// Get the content of the SVG file
			this.requestSVG(this.path).then((responseText) => {
				// Setup a DOM parser to convert the response to text/xml
				const domParser = new DOMParser()
				const result = domParser.parseFromString(responseText, 'text/xml')
				const loadedSVG = result.getElementsByTagName('svg')[0]

				if (!loadedSVG) {
					console.error('No SVG element found in: ' + this.path)
					return
				}
				const svgElement = this.$el
				// Add attributes from imported SVG
				const attributeNames = loadedSVG.getAttributeNames()
				for (const name of attributeNames) {
					const value = loadedSVG.getAttribute(name)
					svgElement.setAttribute(name, value)
				}
				if (this.iconName) svgElement.id = this.iconName
				// Add child nodes from imported SVG
				const domN = loadedSVG.children.length
				for (let i = domN - 1; i >= 0; i--) {
					const node = loadedSVG.children.item(i)
					svgElement.appendChild(node)
				}
				// Cascade colors from vuetify
				this.$el.style.fill = 'currentColor'
				if (this.stroke) {
					this.$el.style.stroke = 'currentColor'
					this.$el.style['stroke-width'] = '6px'
				}
				this.$emit('load')
			})
		},
		cleanSVGComponent() {
			while (this.$el.firstChild) {
				this.$el.removeChild(this.$el.firstChild)
			}
			const attributeNames = this.$el.getAttributeNames()
			for (const name of attributeNames) {
				this.$el.removeAttribute(name)
			}
		}
	}
}
</script>


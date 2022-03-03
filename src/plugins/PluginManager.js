class PluginManager {
	suffix = '-plugin-manager'
	/* Example: localplugin: `${require('@/url_base_deploy.json').web}/plugins/example-local-plugin.js`*/
	availablePlugins = {
		googleMapsApi: 'http://maps.googleapis.com/maps/api/js'
	}
	pluginsLoaded = {}

	constructor() {
		// do nothing
	}

	mount(plugin) {
		return new Promise((resolve, reject) => {
			if (!this.pluginsLoaded[plugin]) {
				this.pluginsLoaded[plugin] = document.createElement('script')
				this.pluginsLoaded[plugin].type = 'text/javascript'
				this.pluginsLoaded[plugin].src = this.availablePlugins[plugin]
				this.pluginsLoaded[plugin].async = true
				//this.pluginsLoaded[plugin].defer=true;
				this.pluginsLoaded[plugin].id = plugin + this.suffix
				if (!document.getElementById(plugin + this.suffix)) {
					document.head.insertBefore(this.pluginsLoaded[plugin], document.head.firstElementChild)
				}
				this.pluginsLoaded[plugin].addEventListener('load', () => {
					resolve(this.pluginsLoaded[plugin])
				})
				this.pluginsLoaded[plugin].addEventListener('error', () => reject(this.destroy(plugin)))
				this.pluginsLoaded[plugin].addEventListener('abort', () => reject(this.destroy(plugin)))
			} else resolve
		})
	}

	destroy(plugin) {
		if (this.pluginsLoaded[plugin]) {
			this.pluginsLoaded[plugin].remove()
			this.pluginsLoaded[plugin] = undefined
			delete this.pluginsLoaded[plugin]
		} else {
			let scriptTag = document.getElementById(plugin + this.suffix)
			if (scriptTag) scriptTag.remove()
		}
	}
}

export default new PluginManager()

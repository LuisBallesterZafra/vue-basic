import Vue from 'vue'

import store from './store'
import router from './router'
import i18n from './i18n'
import vuetify from './plugins/vuetify'
import notify from 'vue2-notify'
import notification from './plugins/notification'
import eventBus from './bus'
import validations from './utils/validations'
import dateUtils from './utils/date'
import device from './utils/device'
import utils from './utils'
import PluginManager from './plugins/PluginManager'

import App from './App.vue'

import './components/formfields'
import './permission'

import './styles/variables/colors.css'
import './styles/variables/font.css'

import './styles/global.scss'
import './styles/font-sizes.pcss'
import './styles/elements.pcss'
import './styles/colors.pcss'
import './styles/scrollbar.css'
import './styles/notification.pcss'

import './icons/lib'

Vue.config.productionTip = false

function defineNotificationPlugin() {
	Vue.use(notify, {
		visibility: 5000,
		permanent: false,
		itemClass: 'notification',
		position: 'bottom-right'
	})
	Vue.$notify.setTypes({
		info: { itemClass: 'notification-info elevation-4' },
		error: { itemClass: 'notification-error elevation-4' },
		warning: { itemClass: 'notification-warning elevation-4' },
		success: { itemClass: 'notification-success elevation-4' }
	})
	Object.defineProperty(Vue.prototype, '$notify', { value: notification })
}

function definePlugins() {
	defineNotificationPlugin()
}

function definePrototypes() {
	Object.defineProperty(Vue.prototype, '$utils', { value: utils })
	Object.defineProperty(Vue.prototype, '$eventBus', { value: eventBus })
	Object.defineProperty(Vue.prototype, '$validations', { value: validations })
	Object.defineProperty(Vue.prototype, '$dateUtils', { value: dateUtils })
	Object.defineProperty(Vue.prototype, '$device', { value: device })
	Object.defineProperty(Vue.prototype, '$pluginManager', { value: PluginManager })
}

;(async () => {
	definePlugins()
	definePrototypes()

	const vm = new Vue({
		vuetify,
		store,
		router,
		i18n,
		render: (h) => h(App)
	})

	store.$app = vm

	vm.$mount('#app')
})()

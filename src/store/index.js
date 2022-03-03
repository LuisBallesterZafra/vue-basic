import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import i18n from '@/i18n'
import { _ } from 'core-js'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	const value = modulesFiles(modulePath)
	modules[moduleName] = value.default
	return modules
}, {})

modules.state = { ...modules.state, i18n }

export default new Vuex.Store({
	modules,
	getters,
	mutations: {
		resetState(state) {
			_.forOwn(modules, (value, key) => {
				state[key] = _.cloneDeep(value.state)
			})
		}
	}
})

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'
import es from 'vuetify/es5/locale/es'
import en from 'vuetify/es5/locale/en'
import '@mdi/font/css/materialdesignicons.css'
import customIcons from '@/icons/lib'

Vue.use(Vuetify)

const opts = {
	theme: {
		light: true,
		themes: {
			light: {
				primary: '#166bf2',
				secondary: '#e56208',
				accent: colors.orange.darken1,
				error: colors.red.darken1
			}
		}
	},
	icons: {
		iconfont: 'mdi',
		values: customIcons
	},
	lang: {
		locales: { en, es },
		current: 'es'
	}
}

export default new Vuetify(opts)

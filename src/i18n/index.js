import Vue from 'vue'
import VueI18n from 'vue-i18n'
import * as deepmerge from 'deepmerge';

import enGlobal from './en.json'
import esGlobal from './es.json'

import accEn from './modules/accessibility/en.json'
import accEs from './modules/accessibility/es.json'

import compEn from './modules/components/en.json'
import compEs from './modules/components/es.json'

import viewsEn from './modules/views/en.json'
import viewsEs from './modules/views/es.json'

import routerEn from './modules/router/en.json'
import routerEs from './modules/router/es.json'

const en = deepmerge.all([enGlobal, accEn, compEn, viewsEn, routerEn])
const es = deepmerge.all([esGlobal, accEs, compEs, viewsEs, routerEs])

Vue.use(VueI18n)

export default new VueI18n({
	locale: 'es',
	fallbackLocale: 'es',
	silentFallbackWarn: true,
	messages: { en: en, es: es }
})

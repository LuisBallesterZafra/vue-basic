import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const errorRoutes = [
	{
		name: 'notfound',
		path: '*',
		component: () => import('@/components/error/NotFound/index')
	}
]

const viewRoutes = [
	{
		name: 'base',
		path: '/',
		redirect: 'home'
	},
	{
		name: 'home',
		path: '/home',
		component: () => import('@/views/home'),
		meta: { functionalities: ['BASIC_USER'] }
	},
	{
		name: 'weather',
		path: '/weather',
		component: () => import('@/views/weather/index'),
		meta: { functionalities: ['BASIC_USER'] }
	},
	{
		name: 'users',
		path: '/users',
		component: () => import('@/views/users/UserGrid'),
		meta: { functionalities: ['ADMIN'] }
	},
	{
		name: 'usersform',
		path: '(.*/)?/users/form=:pk',
		props: true,
		component: () => import('@/views/users/UserForm'),
		meta: { functionalities: ['ADMIN'] }
	}
]

function setAuthRequired(route) {
	return { ...route, meta: { ...route.meta, requiresAuth: true } }
}

export const mainRoutes = [
	{
		name: 'login',
		path: '/login',
		component: () => import('@/views/login')
	}
]

const routerObject = {
	mode: 'history',
	hash: false,
	base: process.env.VUE_APP_BASE_WEB,
	routes: mainRoutes
}

const newVueRouter = () => new VueRouter(routerObject)

const router = newVueRouter()

export const resetRouter = () => (router.matcher = newVueRouter().matcher)

export const securedRoutes = viewRoutes.concat(errorRoutes).map(setAuthRequired)

export default router

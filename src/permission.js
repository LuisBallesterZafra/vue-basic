import router, { resetRouter } from './router'
import store from './store'
import notification from './plugins/notification'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
	// start progress bar
	NProgress.start()
	const hasToken = store.getters.jwt
	if (hasToken) {
		if (to.path === '/login') {
			// if is logged in, redirect to the home
			next({ path: '/' })
			NProgress.done()
		} else {
			// determine whether the user has obtained his permission roles through getInfo
			const hasRoutesLoaded = store.getters.addedRoutes && store.getters.addedRoutes.length > 0
			const hasFunctionalities = store.getters.functionalities && store.getters.functionalities.length > 0
			if (!hasFunctionalities || (hasFunctionalities && hasRoutesLoaded)) {
				next()
			} else {
				try {
					resetRouter()
					// generate accessible routes map based on roles
					const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.functionalities)
					// dynamically add accessible routes
					accessRoutes.forEach(function (route) {
						router.addRoute(route)
					})
					next({ ...to, replace: true })
				} catch (error) {
					// remove token and go to login page to re-login
					await store.dispatch('session/clean')
					notification.error(error || 'Has Error')
					next(`/login?redirect=${to.path}`)
					NProgress.done()
				}
			}
		}
	} else {
		const notRequiresAuth = to.matched.length > 0 && !to.matched.some((route) => route.meta.requiresAuth)
		if (notRequiresAuth) {
			next()
		} else {
			next(`/login?redirect=${to.path}`)
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	// finish progress bar
	NProgress.done()
})

import { securedRoutes, mainRoutes } from '@/router'

/**
 * Use meta.functionalities to determine if the current user has permission to access
 * @param functionalities
 * @param route
 */
function hasFunctionality(functionalities, route) {
	if (route.meta && route.meta.functionalities) {
		return functionalities.some((functionality) => route.meta.functionalities.includes(functionality))
	} else {
		return true
	}
}

/**
 * Filter authorized routes
 * @param routes securedRoutes
 * @param functionalities
 */
export function filterSecuredRoutes(routes, functionalities) {
	const res = []
	routes.forEach((route) => {
		const tmp = { ...route }
		if (hasFunctionality(functionalities, tmp)) {
			if (tmp.children) {
				tmp.children = filterSecuredRoutes(tmp.children, functionalities)
			}
			res.push(tmp)
		}
	})

	return res
}

const state = {
	routes: [],
	addedRoutes: []
}

const mutations = {
	SET_ROUTES: (state, routes) => {
		state.addedRoutes = routes
		state.routes = mainRoutes.concat(routes)
	}
}

const actions = {
	generateRoutes({ commit }, functionalities) {
		return new Promise((resolve) => {
			let accesibleRoutes
			if (functionalities.includes('ROUTER_ALL')) {
				accesibleRoutes = securedRoutes || []
			} else {
				accesibleRoutes = filterSecuredRoutes(securedRoutes, functionalities)
			}
			commit('SET_ROUTES', accesibleRoutes)
			resolve([
				{
					path: '/',
					component: () => import('@/layout'),
					hidden: true,
					children: accesibleRoutes
				}
			])
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

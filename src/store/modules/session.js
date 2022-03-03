import { signin, signout } from '@/api/session'
import { getSession, setSession, removeSession } from '@/utils/auth'

const getSessionTemplate = () => {
	return {
		usr: null,
		name: null,
		language: null,
		email: null,
		jwt: null,
		functionalities: null
	}
}

const state = getSessionTemplate()

const getStoredSession = (state, session) => {
	const activeSession = session || getSession()
	if (activeSession != null) {
		state.usr = activeSession.usr
		state.name = activeSession.name
		state.language = activeSession.language
		state.email = activeSession.email
		state.jwt = activeSession.jwt
		state.functionalities = activeSession.functionalities
	}
}

getStoredSession(state)

const mutations = {
	SET_SESSION: (state, session) => {
		getStoredSession(state, session)
	},
	SET_JWT: (state, jwt) => {
		state.jwt = jwt
	},
	RESET_STATE: (state) => {
		Object.assign(state, getSessionTemplate())
	}
}

const actions = {
	// user login
	signin({ dispatch, commit }, { usr, password }) {
		return new Promise((resolve, reject) => {
			signin(usr, password)
				.then((response) => {
					dispatch('clean')
					if (response) {
						setSession(response)
						commit('SET_SESSION', response)
						resolve()
					}
					reject()
				})
				.catch(reject)
		})
	},

	signout({ dispatch, state }) {
		return new Promise((resolve, reject) => {
			signout(state.jwt)
				.then(() => {
					dispatch('clean')
					resolve()
				})
				.catch((error) => {
					reject(error)
				})
		})
	},

	// remove token
	clean({ commit }) {
		return new Promise((resolve) => {
			commit('RESET_STATE')
			commit('permission/SET_ROUTES', [], { root: true })
			removeSession()
			resolve()
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

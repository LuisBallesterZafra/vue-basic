const KEY = window.btoa('vue-basic-session')

export function getSession() {
	const cookie = window.localStorage.getItem(KEY)
	return !cookie ? null : JSON.parse(window.atob(cookie))
}

export function setSession(session) {
	return window.localStorage.setItem(KEY, window.btoa(JSON.stringify(session)))
}

export function removeSession() {
	return window.localStorage.removeItem(KEY)
}

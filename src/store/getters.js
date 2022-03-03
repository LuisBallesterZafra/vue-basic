const getters = {
	jwt: (state) => state.session.jwt,
	appVersion: (state) => state.app.version,
	functionalities: (state) => state.session.functionalities,
	addedRoutes: (state) => state.permission.addedRoutes,
	userName: (state) => state.session.name,
	userEmail: (state) => state.session.email
}
export default getters

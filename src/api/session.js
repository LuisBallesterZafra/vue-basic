import { signin as signInService } from './mock/authenticate'

export async function signin(usr, password) {
	return await signInService(usr, password)
}

export async function signout(/*jwt*/) {
	return await Promise.resolve()
}

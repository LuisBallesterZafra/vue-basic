import { mockRequest } from './utils/index'
import { get } from './users'

const active_jwt = [
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
]

export const signin = async (usr, password) => {
	const userInfo = await get(usr)
	if (userInfo.password != password) {
		return mockRequest()
	}
	userInfo.jwt = active_jwt[0]
	return mockRequest(userInfo)
}

export const list = () => {
	new Promise((resolve) => setTimeout(resolve(active_jwt), 1000))
}

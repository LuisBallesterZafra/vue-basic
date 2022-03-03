import { generateAlphanumeric, mockRequest } from './utils/index'
const users = []
const admin = {
	usr: 'admin',
	password: 'admin',
	name: 'Administrator',
	language: 'es',
	email: 'admin@vue.es',
	functionalities: ['ADMIN', 'BASIC_USER']
}
for (let index = 0; index < 15; index++) {
	const newUser = {
		usr: `user${index}`,
		password: `user${index}`,
		name: `User${index} ${generateAlphanumeric(8)} ${generateAlphanumeric(6)}`,
		language: 'es',
		email: `${generateAlphanumeric(22)}@gmail.com}`,
		functionalities: ['BASIC_USER']
	}
	users.push(newUser)
}

users.push(admin)

export const list = () => {
	return mockRequest(users)
}

export const get = (usr) => {
	return mockRequest(users.find((user) => user.usr == usr))
}

export const update = (data) => {
	var userIndex = users.findIndex((x) => x.usr == data.usr)
	if (userIndex < 0) return mockRequest()
	for (var key of Object.keys(users[userIndex])) {
		const newValue = data[key]
		if (newValue) users[userIndex][key] = newValue
	}
	return mockRequest(users[userIndex])
}

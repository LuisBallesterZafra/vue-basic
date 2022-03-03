export const generateAlphanumeric = (length) => {
	var result = ''
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}

export const getRandomArrayElement = (array) => {
	return array[Math.floor(Math.random() * array.length)]
}

export const randomNumber = (min = -99999999, max = 99999999) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export const mockRequest = (response) => {
	return new Promise((resolve, reject) => setTimeout(response ? resolve(response) : reject(), randomNumber(50, 1000)))
}

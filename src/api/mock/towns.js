import { mockRequest, randomNumber } from './utils/index'
import townsData from './townsData'
import utils from '@/utils'
const PROVINCE_TOWNS = townsData

const generateSearchRegExFromWord = (word, strict) => {
	const matchCharacter = "[A-zÀ-ÿ' ]"
	if (strict) return new RegExp(`^${matchCharacter}{0,5}${word}${matchCharacter}{0,5}$`)

	let regExpStr = strict ? `^${matchCharacter}{0,3}` : ''
	for (let index = 0; index < word.length; index++) {
		if (index % 2 != 0 || randomNumber(0, 20) > 2) {
			const character = word.charAt(index)
			regExpStr += character
		} else {
			regExpStr += matchCharacter
		}
	}
	return new RegExp(regExpStr)
}
const normalizeTrimLowerString = (str) => {
	return utils.normalizeString(str.replace(/ +/g, '').toLowerCase())
}
export const get = (town) => {
	if (!town) return
	// maybe you will get a wrong one if 'town' is not specific, will be better to use the town_id if we have it
	const normalizedTown = normalizeTrimLowerString(town)
	let regExp = generateSearchRegExFromWord(normalizedTown, true)
	return mockRequest(PROVINCE_TOWNS.find((item) => regExp.test(normalizeTrimLowerString(item.name))))
}

export const search = (town) => {
	if (!town) return
	const normalizedTown = generateSearchRegExFromWord(town)
	let regExp = generateSearchRegExFromWord(normalizedTown)
	return mockRequest(PROVINCE_TOWNS.filter((item) => regExp.test(generateSearchRegExFromWord(item.name))))
}

export const list = () => {
	return mockRequest(PROVINCE_TOWNS)
}

export default {
	isEmpty(...values) {
		return values.some(
			(value) =>
				value === undefined ||
				value === null ||
				(typeof value === 'string' && value.trim() === '') ||
				(Array.isArray(value) && value.length === 0)
		)
	},
	getCssVariable(key) {
		return getComputedStyle(document.documentElement).getPropertyValue(key)
	},
	normalizeString(str) {
		return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
	},
	utf8ToB64: (str) => {
		if (str) {
			return window.btoa(unescape(encodeURIComponent(str)))
		}
	},
	b64ToUtf8: (str) => {
		if (str) {
			return decodeURIComponent(escape(window.atob(str)))
		}
	}
}

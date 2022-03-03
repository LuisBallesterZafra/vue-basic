export default {
	/**
	 * Format a date to server format (date)
	 * @param  {Date} dateX the date to format
	 * @return {String} the date formated to server format -> ISO UTC
	 * @throws return date formated or null
	 */
	toServerFormat: (date) => {
		return !date ? null : date.toISOString()
	},

	/**
	 * Compare 2 dates (dateX, dateY)
	 * @param  {Date} dateX the first date to compare
	 * @param  {Date} dateY the second date to compare
	 * @return {Numeric} the value 0 if dateX == dateY;a value less than 0 if dateX < dateY; anda value greater than 0 if dateX > dateY
	 * @throws return null or error in case of impossible operation
	 */
	compare: (dateX, dateY) => {
		if (!dateX || !dateY) return null
		if (dateX.getTime() === dateY.getTime()) return 0
		if (dateX < dateY) return -1
		if (dateX > dateY) return 1
		return null
	},

	/**
	 * Format a date using the format given (date, format)
	 * @param  {Date} date date to format
	 * @param  {String} format example: dd/MM/yyyy mm:HH
	 * @return {String} the date formated
	 * @throws return null or error in case of impossible operation
	 */
	format: (date, format) => {
		if (!date || !format) return null
		let dateFormated = format
		const formaters = [
			{ format: ['dd', 'DD'], function: (date) => date.getDate().toString().padStart(2, '0') },
			{ format: ['d', 'd'], function: (date) => date.getDate().toString() },
			{ format: ['MM'], function: (date) => (date.getMonth() + 1).toString().padStart(2, '0') },
			{ format: ['M'], function: (date) => (date.getMonth() + 1).toString() },
			{ format: ['YYYY'], function: (date) => date.getFullYear().toString() },
			{ format: ['YY'], function: (date) => Math.trunc(date.getFullYear()).toString().substring(2) },
			{ format: ['hh', 'HH', 'kk'], function: (date) => date.getHours().toString().padStart(2, '0') },
			{ format: ['h', 'H', 'k'], function: (date) => date.getHours().toString() },
			{ format: ['mm'], function: (date) => date.getMinutes().toString().padStart(2, '0') },
			{ format: ['m'], function: (date) => date.getMinutes().toString() },
			{ format: ['ss'], function: (date) => date.getSeconds().toString().padStart(2, '0') },
			{ format: ['s'], function: (date) => date.getSeconds().toString() },
			{ format: ['S', 'SS', 'SSS'], function: (date) => date.getMilliseconds().toString() }
		]
		formaters.forEach((formater) => formater.format.forEach((token) => (dateFormated = dateFormated.replace(token, formater.function(date)))))
		return dateFormated
	}
}

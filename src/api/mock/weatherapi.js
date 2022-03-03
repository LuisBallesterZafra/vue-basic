import { getRandomArrayElement, randomNumber, mockRequest } from './utils/index'
const TYPE_MEASSURE = {
	celsius: 'ºC',
	percent: '%',
	velocity: 'm / seg'
}
const WEATHER_TYPE = [
	{ value: 'sunny', icon: 'mdi-weather-sunny' },
	{ value: 'cloudy', icon: 'mdi-weather-cloudy' },
	{ value: 'rainy', icon: 'mdi-weather-rainy' },
	{ value: 'snowy', icon: 'mdi-weather-snowy' },
	{ value: 'wind', icon: 'mdi-weather-windy-variant' }
]

const generateWeather = (location, date) => {
	const type_weather = getRandomArrayElement(WEATHER_TYPE)
	return {
		location: location,
		temp: randomNumber(-12, 45),
		temp_meassure: TYPE_MEASSURE.celsius,
		wind_speed: randomNumber(0, 40),
		wind_meassure: TYPE_MEASSURE.velocity,
		rain_probability: ['rainy', 'snowy'].includes(type_weather.value) ? randomNumber(23, 100) : randomNumber(0, 10),
		type_weather,
		timestamp: date || new Date().toISOString()
	}
}
export const searchWeather = (location, days) => {
	if (!location) return null
	const predictions = []
	for (let index = days; index >= 0; index--) {
		const timestamp = new Date()
		timestamp.setDate(-index)
		predictions.push(generateWeather(location, timestamp.toISOString()))
	}
	return mockRequest({ ...generateWeather(location), predictions })
}

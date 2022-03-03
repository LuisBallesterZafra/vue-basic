import { searchWeather as searchWeatherService } from './mock/weatherapi'

export async function searchWeather(location, days) {
	return await searchWeatherService(location, days)
}

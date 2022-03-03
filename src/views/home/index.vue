<template>
	<div class="vb-expand-y">
		<v-row>
			<v-col cols="12" sm="8" md="6" lg="4" xl="3" class="mx-auto">
				<v-autocomplete
					v-model="selected"
					:items="items"
					:loading="loading"
					hide-no-data
					hide-selected
					:item-text="(item) => `${item.province} - ${item.name}`"
					:label="$t('')"
					placeholder="Search"
					prepend-icon="mdi-magnify"
					return-object
					clearable
					@click="loadPlaces"
				>
					<template #append-outer>
						<v-btn icon>
							<v-icon @click="getPosition">mdi-crosshairs-gps</v-icon>
						</v-btn>
					</template>
				</v-autocomplete>
			</v-col>
		</v-row>
		<v-row v-if="!$utils.isEmpty(selected)">
			<v-col cols="12" sm="8" md="6" lg="4" xl="3" class="mx-auto">
				<weatherinfo v-model="weatherData"></weatherinfo>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { getTown, listTowns } from '@/api/geo'
import { searchWeather } from '@/api/weather'
import Weatherinfo from '@/components/weather/weatherinfo'

export default {
	name: 'Home',
	components: { Weatherinfo },
	data: () => ({ loading: false, selected: null, items: [], weatherData: null }),
	computed: {},
	watch: {
		selected(town) {
			if (town)
				searchWeather(town.name, 5).then((weather) => {
					console.log(weather)
					this.weatherData = weather
				})
		}
	},
	mounted() {
		this.$pluginManager.mount('googleMapsApi').then(console.log('google maps api loaded'))
	},
	destroyed() {
		this.$pluginManager.destroy('googleMapsApi')
	},
	methods: {
		async loadPlaces() {
			if (this.$utils.isEmpty(this.items)) {
				this.loading = true
				this.items = await listTowns()
				this.loading = false
			}
		},
		getPosition() {
			navigator.geolocation.getCurrentPosition(
				(position) => this.calculateCityFromLatLong(position),
				(b) => console.log(b)
			)
		},
		async calculateCityFromLatLong(position) {
			console.log(position, 'Si la api fuese gratis sabriamos donde estamos, como no es el caso, hardcodear siempre es gratis')
			await this.loadPlaces()
			this.selected = await getTown('valencia')
			console.log(this.selected)
		}
	}
}
</script>

<style lang="postcss" scoped>
.appHome {
	height: 100%;
}
</style>

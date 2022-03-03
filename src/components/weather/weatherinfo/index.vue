<template>
	<v-card width="400">
		<v-card height="200px" dark>
			<v-card-title class="white--text mt-8">
				<v-avatar>
					<v-icon x-large>{{ value.type_weather.icon }}</v-icon>
				</v-avatar>
				<h2 class="ml-5">{{ value ? value.location : '_______' }}</h2>
				<weatherbasic outlined tile :data="value" full-date />
			</v-card-title>
		</v-card>
		<v-card-text class="fit-content">
			<v-timeline align-top dense>
				<v-timeline-item v-for="weather in value.predictions" :key="weather.timestamp" fill-dot :icon="weather.type_weather.icon">
					<v-card class="pa-3">
						<weatherbasic :data="weather" />
					</v-card>
				</v-timeline-item>
			</v-timeline>
		</v-card-text>
	</v-card>
</template>

<script>
import Weatherbasic from '../weatherbasic'
export default {
	components: {
		Weatherbasic
	},
	props: {
		value: {
			type: Object,
			default: () => {}
		}
	},
	computed: {},
	methods: {}
}
</script>
<style scoped>
.fit-content {
	max-height: 400px;
	overflow: auto;
}
</style>

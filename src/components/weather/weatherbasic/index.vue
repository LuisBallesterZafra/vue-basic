<template>
	<div style="width: 100%">
		<div class="d-flex">
			<span class="px-1">{{ `${data.temp} ${data.temp_meassure}` }}</span>
			<strong class="ml-auto">{{ $dateUtils.format(new Date(data.timestamp), fullDate ? 'dd/MM/YYYY' : 'dd') }}</strong>
		</div>
		<div>
			<span class="px-1">{{ `${$t('components.weatherinfo.rainchance')}: ${data.rain_probability}%` }}</span>
		</div>
		<div>
			<span class="px-1">{{ `${$t('components.weatherinfo.windspeed')}: ${data.wind_speed} ${data.wind_meassure}` }}</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			default: () => {}
		},
		fullDate: {
			type: Boolean
		}
	}
}
</script>

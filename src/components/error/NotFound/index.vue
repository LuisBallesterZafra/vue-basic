<template>
	<v-container fluid fill-height>
		<div class="d-flex flex-column ma-auto">
			<slot name="body">
				<div class="mx-auto">
					<v-icon color="blue darken-4" class="mt-n12 mb-8" size="280">$vb-404</v-icon>
				</div>
			</slot>
			<slot name="actions">
				<div class="mx-auto">
					<v-btn class="mx-4" :aria-label="$t('global.back')" text outlined @click="back()">{{ $t('global.back') }}</v-btn>
					<v-btn class="mx-4" :aria-label="$t('views.notfound.home')" text outlined @click="goToHomePage()">
						{{ $t('views.notfound.home') }}
					</v-btn>
				</div>
			</slot>
		</div>
	</v-container>
</template>
<script>
export default {
	name: 'NotFound',
	methods: {
		goToHomePage() {
			this.$router.push({ path: '/home' })
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

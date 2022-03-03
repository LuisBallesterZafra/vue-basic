<template>
	<v-main class="app-background">
		<topbar />
		<breadcrumb />
		<main-container />
		<label class="app-version--label">{{ $store.getters.appVersion }}</label>
	</v-main>
</template>

<script>
import { Topbar, MainContainer } from './components'
import Breadcrumb from '@/components/breadcrumb'

export default {
	name: 'Layout',
	components: {
		Topbar,
		MainContainer,
		Breadcrumb
	},
	data: () => ({}),
	computed: {},
	methods: {}
}
</script>

<style lang="postcss" scoped>
.app-background {
	background-color: var(--background);
}
.header-margin {
	margin-top: var(--app-header-height);
}
</style>

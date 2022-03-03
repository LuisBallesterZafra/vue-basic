<template>
	<section class="vb-fixed-window-y">
		<transition name="fade-transform" mode="out-in">
			<keep-alive>
				<router-view :key="key" />
			</keep-alive>
		</transition>
	</section>
</template>

<script>
export default {
	name: 'AppMain',
	computed: {
		key() {
			return this.$route.path
		}
	}
}
</script>

<style lang="postcss" scoped>
.containerParent {
	padding: 0px;
	background-color: var(--background);
}
</style>

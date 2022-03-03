export default {
	computed: {
		allProps() {
			return { ...this.$attrs, ...this.$props }
		}
	}
}

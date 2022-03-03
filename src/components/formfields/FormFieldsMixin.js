import MergePropsMixin from '../mixins/MergePropsMixin'
export default {
	mixins: [MergePropsMixin],
	props: {
		required: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {}
	},
	computed: {
		getRulesProps() {
			return this.$props.rules || []
		}
	},
	methods: {
		getMixedRules(rules) {
			const mergedRules = [...rules, ...this.getRulesProps]
			const requireRule = (v) => !this.$utils.isEmpty(v) || this.$t('components.formfields.required')
			if (this.required) mergedRules.push(requireRule)
			return mergedRules
		}
	}
}

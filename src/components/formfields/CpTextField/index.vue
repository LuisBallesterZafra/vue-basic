<template>
	<v-text-field v-model="internalValue" v-bind="allProps" :rules="getRules()" @update:error="internalError = $event">
		<template v-for="(index, name) in $scopedSlots" #[name]="data"> <slot :name="name" v-bind="data" /></template>
		<template v-for="(index, name) in $slots" #[name]><slot :name="slotName" /></template>
	</v-text-field>
</template>

<script>
import FormFieldsMixin from '../FormFieldsMixin'

export default {
	name: 'CpTextField',
	mixins: [FormFieldsMixin],
	props: {
		value: {
			type: String,
			default: null
		}
	},
	data: () => ({ internalValue: null, internalError: false }),
	watch: {
		value: {
			immediate: true,
			handler(newValue) {
				this.internalValue = newValue
			}
		},
		internalValue(newVal) {
			if (!this.internalError) this.$emit('input', newVal)
		}
	},
	methods: {
		getRules() {
			const specificRules = []
			return this.getMixedRules(specificRules)
		}
	}
}
</script>

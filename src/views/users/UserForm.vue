<template>
	<v-form v-if="user" ref="form" v-model="valid" class="pa-6" lazy-validation>
		<v-row>
			<v-col cols="12" lg="6">
				<v-text-field v-model="user.usr" label="Name" disabled />
			</v-col>
			<v-col cols="12" lg="6">
				<v-text-field v-model="user.name" label="Name" required />
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" lg="6">
				<v-text-field v-model="user.email" label="E-mail" required />
			</v-col>
			<v-col cols="12" lg="6">
				<v-select v-model="user.language" :items="['es', 'en']" />
			</v-col>
		</v-row>
		<v-select v-model="user.functionalities" :items="user.functionalities" multiple disabled />
		<v-row>
			<v-btn color="warning" @click="back">{{ $t('global.back') }}</v-btn>
			<v-spacer />
			<v-btn :disabled="!valid" color="success" class="mr-4" @click="save">{{ $t('global.save') }}</v-btn>
		</v-row>
	</v-form>
</template>
<script>
import { update, get } from '@/api/user'
export default {
	props: {
		pk: {
			type: String,
			required: true
		}
	},
	data() {
		return { user: null, valid: true }
	},
	computed: {},
	created() {
		get(this.pk).then((data) => (this.user = data))
	},
	methods: {
		save() {
			if (this.$refs.form.validate()) {
				update(this.user).then(() => this.back())
			}
		},
		goToHomePage() {
			this.$router.push({ path: '/home' })
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="postcss" scoped>
</style>

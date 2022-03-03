<template>
	<v-main>
		<v-container fluid fill-height>
			<v-row class="align-center justify-center">
				<v-col cols="12" sm="8" md="6" lg="5" xl="3">
					<login-form></login-form>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
</template>
<script>
import LoginForm from './components/LoginForm'

export default {
	components: {
		LoginForm
	},
	data() {
		return {}
	},
	computed: {},
	mounted() {},
	methods: {}
}
</script>
<style lang="postcss" scoped>
</style>

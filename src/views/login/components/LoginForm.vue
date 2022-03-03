<template>
	<v-card class="elevation-12">
		<v-toolbar dark color="primary">
			<v-toolbar-title>Login form</v-toolbar-title>
		</v-toolbar>
		<v-card-text>
			<v-form>
				<v-text-field
					v-model="formData.usr"
					prepend-icon="mdi-account"
					name="login"
					:aria-label="$t('accessibility.fill') + $t('accessibility.username')"
					:label="$t('views.login.username')"
					type="text"
				></v-text-field>
				<cp-text-field
					v-model="formData.password"
					prepend-icon="mdi-lock"
					name="password"
					:aria-label="$t('accessibility.fill') + $t('accessibility.password')"
					:label="$t('views.login.password')"
					type="password"
					required
				></cp-text-field>
			</v-form>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
				class="ma-2"
				color="primary"
				:aria-label="$t('accessibility.login')"
				:loadgin="loading"
				:disabled="!loginFormFilled"
				@click="doLogin"
			>
				{{ $t('views.login.do') }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { debounce } from 'lodash'

export default {
	name: 'LoginForm',
	data() {
		return {
			formData: {
				usr: null,
				password: null
			},
			loading: false,
			debouncedEnterKeyEvent: null
		}
	},
	computed: {
		loginFormFilled() {
			return !this.$utils.isEmpty(this.formData.usr, this.formData.password)
		}
	},
	mounted() {
		this.watchEnterKey()
	},
	destroyed() {
		document.removeEventListener('keypress', this.debouncedEnterKeyEvent)
	},
	methods: {
		doLogin() {
			this.loading = true
			this.$store
				.dispatch('session/signin', this.formData)
				.then(() => {
					const query = this.$route.query
					if (query) {
						this.redirect = query.redirect
						this.otherQuery = this.getOtherQuery(query)
					}
					this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
				})
				.catch(() => {
					this.$notify.error('Error contraseña')
					this.loading = false
				})
			// do login
		},
		getOtherQuery(query) {
			return Object.keys(query).reduce((acc, cur) => {
				if (cur !== 'redirect') {
					acc[cur] = query[cur]
				}
				return acc
			}, {})
		},
		watchEnterKey() {
			this.debouncedEnterKeyEvent = debounce((e) => {
				if (e.key === 'Enter' && this.loginFormFilled && !this.loading) {
					this.doLogin()
				}
			}, 300)
			document.addEventListener('keypress', this.debouncedEnterKeyEvent)
		}
	}
}
</script>

<style scoped>
</style>

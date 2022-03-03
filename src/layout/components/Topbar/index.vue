<template>
	<v-app-bar :height="$utils.getCssVariable('--app-header-height')" color="black">
		<v-icon size="40">$vb-app</v-icon>
		<v-btn text color="white" @click="$router.push({ name: 'home' })">
			<v-icon>mdi-home</v-icon>
		</v-btn>
		<v-btn v-if="isAdmin" text color="white" @click="$router.push({ name: 'users' })">
			<span>Users</span>
			<v-icon>mdi-person</v-icon>
		</v-btn>
		<v-spacer />
		<span class="cursor-pointer" @click="doLogout">
			<v-icon ref="logout-person" class="ml-n2" color="white">mdi-run</v-icon>
			<v-icon color="white">mdi-logout</v-icon>
		</span>
	</v-app-bar>
</template>

<script>
export default {
	components: {},
	data: () => ({
		homeRoute: 'home'
	}),
	computed: {
		isAdmin() {
			return this.$store.getters.functionalities?.includes('ADMIN')
		}
	},
	methods: {
		doLogout() {
			this.$refs['logout-person'].$el.classList.add('logout-animation')
			setTimeout(() => {
				this.$store.dispatch('session/signout').finally(() => {
					this.$router.push('login')
				})
			}, 600)
		}
	}
}
</script>

<style lang="postcss" scoped>
.logout-animation {
	-webkit-animation-name: logoutAnimation;
	-webkit-animation-duration: 1s;
	-webkit-animation-iteration-count: 1;
}
@keyframes logoutAnimation {
	from {
		left: 0px;
	}
	to {
		left: 25px;
	}
}
</style>

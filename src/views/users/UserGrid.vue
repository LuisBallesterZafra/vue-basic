<template>
	<v-main>
		<v-data-table class="elevation-1 ma-4" :headers="getHeaders()" :items="users" item-key="usr" @dblclick:row="goToForm"></v-data-table>
	</v-main>
</template>
<script>
import { list } from '@/api/user'
export default {
	data() {
		return {
			users: []
		}
	},
	computed: {},
	created() {
		this.loadUsers()
	},
	methods: {
		getHeaders() {
			return [
				{ text: this.$t('views.user.grid.usr'), value: 'usr' },
				{ text: this.$t('views.user.grid.name'), value: 'name' },
				{ text: this.$t('views.user.grid.language'), value: 'language' },
				{ text: this.$t('views.user.grid.email'), value: 'email' }
			]
		},
		async loadUsers() {
			this.users = await list()
		},
		goToForm(MouseEvent, { item }) {
			this.$router.push({ name: 'usersform', params: { pk: item.usr } })
		}
	}
}
</script>
<style lang="postcss" scoped>
</style>

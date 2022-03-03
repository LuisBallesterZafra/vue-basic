<template>
	<v-breadcrumbs v-if="!$utils.isEmpty(breadCrumbItems)" :items="breadCrumbItems">
		<template #divider>
			>
			<!--<v-icon color="var(--primary)">fas fa-caret-right</v-icon>-->
		</template>
		<template #item="{ item }">
			<v-breadcrumbs-item :to="item.to" class="text-subtitle-2 crumb-item" :disabled="item.disabled" exact>
				{{ item.text }}
			</v-breadcrumbs-item>
		</template>
	</v-breadcrumbs>
</template>

<script>
export default {
	computed: {
		breadCrumbItems() {
			let breadCrumbItems = []
			if (this.$route.name !== 'home') {
				const homeBreadCrumb = { text: this.$t('router.home'), to: { name: 'home' } }
				breadCrumbItems.push(homeBreadCrumb)
				const subRoutes = this.$route.path.split('/')
				subRoutes.forEach((route, index, array) => {
					if (route !== '') {
						if (route.startsWith('form=')) {
							const routerName = `${array[index - 1]}form`
							breadCrumbItems.push({
								text: this.$t(`router.${routerName}`),
								to: { name: routerName, params: { pk: route.substring(5) } }
							})
						} else {
							breadCrumbItems.push({ text: this.$t(`router.${route}`), to: { name: route } })
						}
					}
				})
			}
			return breadCrumbItems
		}
	}
}
</script>

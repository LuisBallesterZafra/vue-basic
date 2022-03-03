module.exports = {
	transpileDependencies: ['vuetify'],
	chainWebpack: (config) => {
		config.plugin('html').tap((args) => {
			args[0].title = 'Vue Basic'
			return args
		})
		// it can improve the speed of the first screen, it is recommended to turn on preload
		config.plugin('preload').tap(() => [
			{
				rel: 'preload',
				// to ignore runtime.js
				// https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
				fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
				include: 'initial'
			}
		])

		// when there are many pages, it will cause too many meaningless requests
		config.plugins.delete('prefetch')
	},
	lintOnSave: process.env.NODE_ENV === 'localhost',
	productionSourceMap: false,
	devServer: {
		port: 8082,
		overlay: {
			warnings: false,
			errors: true
		}
	},
	publicPath: process.env.VUE_APP_BASE_WEB
}

const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => {
	const folderPath = requireContext.keys().map(requireContext)
	return Object.assign(
		{},
		...requireContext.keys().map((key, index) => {
			return { [key.replace('./', '').replace('.svg', '')]: folderPath[index] }
		})
	)
}
const icons = requireAll(req)
const loadStroke = true

const getVuetifyIconConfig = () => {
	let customIcons = {}
	for (const key in icons) {
		if (Object.hasOwnProperty.call(icons, key)) {
			customIcons[key] = {
				component: () => import('./SvgIcon'),
				props: {
					iconName: key,
					path: icons[key]
				}
			}
			if (loadStroke) {
				customIcons['w-' + key] = {
					component: () => import('./SvgIcon'),
					props: {
						iconName: 'w-' + key,
						path: icons[key],
						stroke: true
					}
				}
			}
		}
	}
	return customIcons
}

export default getVuetifyIconConfig()

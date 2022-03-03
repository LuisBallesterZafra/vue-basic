import device from 'current-device'

export default {
	device: () => {
		return device
	},
	isMobile: () => {
		return device.type === 'mobile'
	},
	isTablet: () => {
		return device.type === 'tablet'
	},
	isDesktop: () => {
		return device.type === 'desktop'
	},
	isPortrait: () => {
		return device.orientation === 'portrait'
	},
	isLandscape: () => {
		return device.orientation === 'landscape'
	}
}

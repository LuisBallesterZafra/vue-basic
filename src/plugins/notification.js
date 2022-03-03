import Vue from 'vue'
export default {
	/**
	 * Show notification (message, title, visibility, closeable)
	 * @param  {String} message the message to show
	 * @param  {String} title the title to show
	 * @param  {Numeric} visibility the time till notification dissapear. Minnor than 0 means -> permanent, min value is 2000
	 * @param  {Boolean} closeable if is a closable notification
	 */
	info: (message, title, visibility, closeable) => {
		const type = 'info'
		createNotification(message, title, visibility, closeable, type)
	},

	success: (message, title, visibility, closeable) => {
		const type = 'success'
		createNotification(message, title, visibility, closeable, type)
	},

	warning: (message, title, visibility, closeable) => {
		const type = 'warning'
		createNotification(message, title, visibility, closeable, type)
	},

	error: (message, title, visibility, closeable) => {
		const type = 'error'
		createNotification(message, title, visibility, closeable, type)
	}
}

function createNotification(message, title, visibility, closeable, type) {
	const config = {
		mode: 'html',
		visibility: message && message.length > 0 ? 2000 + message.length * 15 : 2000
	}

	if (visibility && !isNaN(parseInt(visibility))) {
		if (parseInt(visibility) > 2000) {
			config.visibility = visibility
		} else if (parseInt(visibility) < 0) {
			config.permanent = true
			config.closeButtonClass = 'notification-message__closepanel'
		}
	}

	if (closeable) {
		config.closeButtonClass = 'notification-message__closepanel'
	}

	const html = createHtmlPanel(title, message, type)
	Vue.$notify(html, type, config)
}

function createHtmlPanel(title, message) {
	const showTitle = title && title.length > 0
	const showMessage = message && message.length > 0

	// prettier-ignore
	return `
	<div class="notification-message">
		<div class="notification-message__bodypanel">
		${showTitle
			? `<div class="notification-message__title">${title}</div>`
			: ''
		}

		${showMessage
			? `<div class="notification-message__message">${message}</div>`
			: ''
		}
		</div>
		<div class="notification-message__leftpanel"><div class="type-color"></div></div>
	</div>
`
}

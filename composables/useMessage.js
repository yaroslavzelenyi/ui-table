import { useMessage as useMessageProvider } from "naive-ui"
import { h } from "vue"
import UiIcon from "../UiIcon.vue"

export function useMessage() {
	const message = useMessageProvider()
	const duration = 5000

	const contentRenderer = (content) => {
		if (typeof content === "string") {
			return content
		}

		return () => [
			content?.title &&
				h(
					"div",
					{
						class: "ui-message-title",
					},
					content?.title,
				),
			content?.content &&
				h(
					"div",
					{
						class: "ui-message-content",
					},
					content?.content,
				),
		]
	}

	function info(content, options) {
		message.info(contentRenderer(content), {
			icon: () => h(UiIcon, { name: "info-circle" }),
			duration,
			closable: false,
			...options,
		})
	}

	function success(content, options) {
		message.success(contentRenderer(content), {
			icon: () => h(UiIcon, { name: "circle-check" }),
			duration,
			closable: false,
			...options,
		})
	}

	function warning(content, options) {
		message.warning(contentRenderer(content), {
			icon: () => h(UiIcon, { name: "alert-triangle" }),
			duration: duration * 2,
			closable: false,
			...options,
		})
	}

	function error(content, options) {
		message.error(contentRenderer(content), {
			icon: () => h(UiIcon, { name: "exclamation-circle" }),
			duration: duration * 2,
			closable: false,
			...options,
		})
	}

	return {
		...message,
		info,
		success,
		warning,
		error,
	}
}

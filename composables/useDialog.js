import { inject, useId } from "vue"

export const DIALOG_LIST_INJECTION_KEY = Symbol("dialog-list")

export function useDialog() {
	const dialogList = inject(DIALOG_LIST_INJECTION_KEY)
	const id = useId()

	function create(type, { slots, ...props }) {
		dialogList.value.push({
			id,
			type,
			props: {
				...props,
				show: true,
				accent: type,
				onAfterClose: async () => {
					await props?.onAfterClose?.()

					dialogList.value = dialogList.value.filter((dialog) => dialog.id !== id)
				},
			},
			slots,
		})

		return {
			close: () => {
				const dialogItem = dialogList.value.find((dialog) => dialog.id === id)

				if (dialogItem) {
					dialogItem.props.show = false
				}
			},
		}
	}

	function success(options) {
		return create("success", options)
	}

	function warning(options) {
		return create("warning", options)
	}

	function error(options) {
		return create("error", options)
	}

	function info(options) {
		return create("info", options)
	}

	return {
		success,
		warning,
		error,
		info,
	}
}

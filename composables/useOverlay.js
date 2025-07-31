import { inject, useId } from "vue"

export const OVERLAY_LIST_INJECTION_KEY = Symbol("overlay-list")

export function useOverlay() {
	const overlayList = inject(OVERLAY_LIST_INJECTION_KEY)
	const id = useId()

	function add() {
		overlayList.value.push(id)
	}

	function remove() {
		overlayList.value = overlayList.value.filter((item) => item !== id)
	}

	function isLast() {
		return overlayList.value.at(-1) === id
	}

	return {
		add,
		remove,
		isLast,
	}
}

<script setup>
	import { computed, nextTick } from "vue"
	import { useI18n } from "vue-i18n"
	import { UiBadge, UiButton, UiForm, UiIcon, UiPopover, UiTooltip } from "./ui"

	const props = defineProps({
		defaults: {
			type: Object,
			default: () => ({}),
		},

		// Events
		onApply: {
			type: Function,
			default: null,
		},
		onReset: {
			type: Function,
			default: null,
		},
	})

	const filters = defineModel("filters", {
		type: Object,
		default: () => ({}),
	})
	const applyLoading = defineModel("loading-apply", { default: false })
	const resetLoading = defineModel("loading-reset", { default: false })

	const { t } = useI18n()

	const selectedFiltersCount = computed(() => {
		let count = 0

		for (const key in props.defaults.filters) {
			if (filters.value[key] !== undefined && filters.value[key] !== props.defaults.filters[key]) {
				count += 1
			}
		}

		return count
	})

	async function resetFilters() {
		try {
			resetLoading.value = true
			filters.value = { ...props.defaults.filters }

			if (typeof props.onReset === "function") {
				await props.onReset()
				await nextTick()
			}
		} finally {
			resetLoading.value = false
		}
	}

	async function applyFilters() {
		try {
			applyLoading.value = true

			if (typeof props.onApply === "function") {
				await props.onApply()
				await nextTick()
			}
		} finally {
			applyLoading.value = false
		}
	}
</script>

<template>
	<UiPopover>
		<template #trigger>
			<UiBadge :show="Boolean(selectedFiltersCount)" type="warning" dot>
				<UiTooltip>
					<template #trigger>
						<UiButton>
							<template #icon>
								<UiIcon name="filter" />
							</template>
						</UiButton>
					</template>
					Filters
				</UiTooltip>
			</UiBadge>
		</template>

		<UiForm>
			<slot></slot>

			<template #actions>
				<UiButton :loading="resetLoading" block @click="resetFilters">
					<template #icon>
						<UiIcon name="restore" />
					</template>

					{{ t("form.action.reset") }}
				</UiButton>

				<UiButton :loading="applyLoading" accent="primary" block @click="applyFilters">
					<template #icon>
						<UiIcon name="filter-check" />
					</template>

					{{ t("form.action.apply") }}
				</UiButton>
			</template>
		</UiForm>
	</UiPopover>
</template>

<script setup>
	import { useHead } from "@unhead/vue"
	import { useSlots } from "vue"
	import { useI18n } from "vue-i18n"
	import { UiButton, UiDivider, UiIcon, UiTooltip } from "../ui"

	const props = defineProps({
		title: {
			type: String,
			default: "",
		},
		icon: {
			type: String,
			default: "",
		},
		loading: {
			type: Boolean,
			default: false,
		},
		refresh: {
			type: Function,
			default: null,
		},
	})

	const slots = useSlots()
	const { t } = useI18n()

	useHead({
		title: () => props.title,
	})
</script>

<template>
	<div class="page-template">
		<div class="page-header">
			<h1 v-if="props.title || slots.title">
				<div v-if="props.icon" class="icon">
					<UiIcon :name="props.icon" />
				</div>

				<slot name="title">
					{{ props.title }}
				</slot>
			</h1>

			<div v-if="slots['actions-start']" class="actions-start">
				<UiDivider />
				<slot name="actions-start"></slot>
			</div>

			<div v-if="slots['actions-end'] || props.refresh" class="actions-end">
				<UiTooltip v-if="props.refresh">
					<template #trigger>
						<UiButton :loading="props.loading" icon-only @click="props.refresh">
							<template #icon>
								<UiIcon name="reload" />
							</template>
						</UiButton>
					</template>

					{{ t("actions.refresh") }}
				</UiTooltip>

				<slot name="actions-end"></slot>
			</div>
		</div>

		<div class="page-content">
			<slot></slot>
		</div>
	</div>
</template>

<i18n lang="json">
{
	"en": {
		"actions": {
			"refresh": "Refresh"
		}
	},
	"uk": {
		"actions": {
			"refresh": "Оновити"
		}
	},
	"ru": {
		"actions": {
			"refresh": "Обновить"
		}
	}
}
</i18n>

<style lang="scss" scoped>
	.page-template {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		gap: 1.75rem;

		.page-header {
			display: flex;
			gap: 1rem;
			align-items: center;
			padding-bottom: 1.75rem;
			border-bottom: 1px solid #e2e8f0;

			h1 {
				display: flex;
				gap: 1rem;
				align-items: center;
				margin: 0;
				font-size: 1.75rem;
				font-weight: 700;

				.icon {
					display: flex;
					flex-shrink: 0;
					align-items: center;
					justify-content: center;
					width: 2.5rem;
					height: 2.5rem;
					color: #fff;
					background-color: #030517;
					border-radius: 0.5rem;

					:deep(svg) {
						--ui-icon-size: 1.5rem;
					}
				}
			}

			.actions-start,
			.actions-end {
				display: flex;
				gap: 1rem;
				align-items: center;
			}

			.actions-end {
				margin-left: auto;
			}
		}

		.page-content {
			display: flex;
			flex-grow: 1;
			flex-direction: column;
			width: 100%;
		}
	}
</style>

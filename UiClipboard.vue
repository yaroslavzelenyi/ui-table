<script setup>
	import { useI18n } from "vue-i18n"
	import { useMessage } from "./composables/useMessage"
	import UiIcon from "./UiIcon.vue"
	import UiTooltip from "./UiTooltip.vue"

	const props = defineProps({
		text: {
			type: String,
			default: "",
		},
	})
	const message = useMessage()

	const { t } = useI18n()

	const copyHandler = async () => {
		if (!props.text) {
			return
		}

		try {
			await window.navigator.clipboard.writeText(props.text)
			message.success(t("status.success"))
		} catch {
			message.error(t("status.failed"))
		}
	}
</script>

<template>
	<div class="ui-clipboard">
		<slot></slot>

		<UiTooltip v-if="props.text">
			<template #trigger>
				<button type="button" class="copy-button" @click.stop="copyHandler">
					<UiIcon name="files" class="icon" />
				</button>
			</template>

			{{ t("tooltip") }}
		</UiTooltip>
	</div>
</template>

<i18n lang="json">
{
	"en": {
		"tooltip": "Copy to clipboard",
		"status": {
			"success": "Copied to clipboard!",
			"failed": "Сannot be copied to clipboard!"
		}
	},
	"uk": {
		"tooltip": "Копіювати",
		"status": {
			"success": "Скопійовано в буфер обміну!",
			"failed": "Неможливо скопіювати в буфер обміну!"
		}
	},
	"ru": {
		"tooltip": "Копировать",
		"status": {
			"success": "Скопировано в буфер обмена!",
			"failed": "Невозможно скопировать в буфер обмена!"
		}
	}
}
</i18n>

<style lang="scss" scoped>
	.ui-clipboard {
		position: relative;
		display: inline-flex;
		align-items: center;
		vertical-align: middle;

		&::before {
			position: absolute;
			inset: -0.25rem;
			z-index: -1;
			display: block;
			content: "";
			opacity: 0.5;
		}

		.copy-button {
			position: absolute;
			left: calc(100% + 0.25rem);
			z-index: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 1.625rem;
			height: 1.625rem;
			padding: 0;
			margin-top: -0.125rem;
			line-height: 1;
			color: #030517;
			cursor: pointer;
			background-color: #fff;
			border: none;
			border: 1px solid #d5dee9;
			border-radius: 0.25rem;
			box-shadow: 0 1px 0.125rem rgb(0 0 0 / 5%);
			opacity: 0;
			transform: translateX(-0.5rem) scale(0.8);
			transition:
				border-color 0.25s ease-out,
				opacity 0.25s 0.25s ease-out,
				transform 0.25s 0.25s ease-out;

			&::before {
				position: absolute;
				inset: -0.25rem;
				z-index: -1;
				display: block;
				content: "";
				opacity: 0.5;
			}

			&:hover {
				border-color: #030517;
			}

			.icon {
				--ui-icon-size: 1.125rem;
			}
		}

		&:hover .copy-button {
			opacity: 1;
			transform: translateX(0.125rem) scale(1);
		}
	}
</style>

<script setup>
	import { computed, useSlots } from "vue"

	const props = defineProps({
		accent: {
			type: String,
			default: "",
		},
		accentIcon: {
			type: String,
			default: "",
		},
		text: {
			type: Boolean,
		},
		closable: {
			type: Boolean,
		},
	})
	const emit = defineEmits(["close"])
	const slots = useSlots()
	const statuses = ["neutral", "info", "success", "warning", "danger"]
	const accents = ["white", "black", "grey", "violet", "blue", "sky", "green", "yellow", "orange", "coral", "red"]

	const color = computed(() => {
		if (statuses.includes(props.accent) || accents.includes(props.accent)) {
			return {
				class: `is-${props.accent}-accent`,
			}
		}

		if (statuses.includes(props.accentIcon) || accents.includes(props.accentIcon)) {
			return {
				class: `is-${props.accentIcon}-accent-icon`,
			}
		}

		return {
			style: `background-color: ${props.accent};`,
		}
	})

	function closeHandler() {
		emit("close")
	}
</script>

<template>
	<span :class="props.text ? 'is-text-tag' : 'is-block-tag'" class="ui-tag" v-bind="color">
		<span v-if="slots['icon-start']" class="icon-start">
			<slot name="icon-start"></slot>
		</span>
		<span class="content"><slot></slot></span>
		<span v-if="slots['icon-end']" class="icon-end">
			<slot name="icon-end"></slot>
		</span>

		<span v-if="props.closable" class="close" @click="closeHandler">
			<svg viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path
					d="M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"
				/>
			</svg>
		</span>
	</span>
</template>

<style lang="scss" scoped>
	.ui-tag {
		--ui-tag-color: var(--text-color);
		--ui-tag-icon-color: currentcolor;

		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 1.25rem;
		font-size: 0.75rem;
		font-weight: 600;
		line-height: 1;
		vertical-align: middle;

		.content {
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.close {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 1rem;
			height: 100%;
			margin: 0 -0.25rem 0 0;
			color: #fff;
			cursor: pointer;
			opacity: 0.4;

			&:hover {
				opacity: 0.8;
			}

			svg {
				width: 0.875rem;
				height: 0.875rem;
				fill: currentcolor;
			}
		}

		.icon-start,
		.icon-end {
			flex-shrink: 1;
		}

		&.is-block-tag {
			--icon-size: 0.875rem;

			display: inline-flex;
			gap: 0.25rem;
			align-items: center;
			padding: 0 0.5rem;
			color: #030517;
			white-space: nowrap;
			background-color: #f5f7fb;
			border: 1px solid #e2e8f0;
			border-radius: 0.25rem;
		}

		&.is-text-tag {
			--icon-size: 1rem;

			display: inline-flex;
			gap: 0.375rem;
			align-items: center;
			font-size: 0.8125rem;
			color: var(--ui-tag-color);

			:deep(svg) {
				color: var(--ui-tag-icon-color);
			}
		}

		// @each $name, $color in $statuses {
		// 	&.is-#{$name}-accent {
		// 		--ui-tag-color: #{$color};
		// 	}
		// }

		// @each $name, $color in $colors {
		// 	&.is-#{$name}-accent {
		// 		--ui-tag-color: #{$color};
		// 	}
		// }

		// @each $name, $color in $colors {
		// 	&.is-#{$name}-accent-icon {
		// 		--ui-tag-icon-color: #{$color};
		// 	}
		// }
	}
</style>

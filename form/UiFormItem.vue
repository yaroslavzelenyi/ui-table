<script setup>
	import { useSlots } from "vue"

	const props = defineProps({
		required: {
			type: Boolean,
			default: false,
		},
		inline: {
			type: Boolean,
			default: false,
		},
	})

	const slots = useSlots()
</script>

<template>
	<div :class="{ 'is-inline': props.inline }" class="ui-form-item">
		<div class="label">
			<div v-if="slots.label" class="title">
				<slot name="label"></slot>
				<span v-if="props.required" class="asterisk">&nbsp;*</span>
			</div>

			<div class="content">
				<slot></slot>
			</div>
		</div>

		<div v-if="slots.feedback" class="feedback">
			<slot name="feedback"></slot>
		</div>

		<div v-if="slots.description" class="description">
			<slot name="description"></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.ui-form-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		line-height: 1.5;

		.label {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.title {
			display: inline-flex;
			align-items: center;
			align-self: flex-start;
			font-style: normal;
			font-weight: 600;
			line-height: normal;

			.asterisk {
				color: #dc2626;
			}
		}

		.description {
			font-size: 0.8125rem;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			color: #71717b;
		}

		.feedback {
			font-size: 0.8125rem;
			font-style: normal;
			font-weight: 400;
			font-weight: 500;
			line-height: normal;
			color: #dc2626;

			&::first-letter {
				text-transform: uppercase;
			}
		}

		&.is-inline {
			.label {
				flex-direction: row;
				align-items: center;

				.title {
					align-self: center;
				}

				.content {
					margin-left: auto;
				}
			}
		}
	}
</style>

<script setup>
	import { useSlots } from "vue"

	const slots = useSlots()
</script>

<template>
	<div class="ui-form">
		<slot></slot>

		<div v-if="slots.actions" class="actions">
			<slot name="actions"></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.ui-form {
		--ui-form-gap: 1.5rem;

		display: flex;
		flex-direction: column;
		gap: var(--ui-form-gap);
		align-items: flex-start;
		width: 100%;
		min-width: 0;
		container-name: ui-form;
		container-type: inline-size;

		.actions {
			display: flex;
			gap: 1rem;
			justify-content: flex-end;
			width: 100%;

			& > * {
				flex: auto;
			}
		}
	}
</style>

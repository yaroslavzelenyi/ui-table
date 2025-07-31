<script setup>
	import { NPerformantEllipsis } from "naive-ui"

	const props = defineProps({
		width: {
			type: String,
			default: "100%",
		},
	})
</script>

<template>
	<NPerformantEllipsis
		:tooltip="{
			showArrow: true,
			delay: 500,
			keepAliveOnHover: false,
			class: 'ui-tooltip',
			trigger: 'hover',
			placement: 'top',
		}"
		:style="{ maxWidth: props.width }"
	>
		<slot></slot>

		<template #tooltip>
			<div class="ui-ellipsis-tooltip">
				<slot></slot>
			</div>
		</template>
	</NPerformantEllipsis>
</template>

<style lang="scss">
	.ui-ellipsis-tooltip {
		max-width: 22rem;
	}
</style>

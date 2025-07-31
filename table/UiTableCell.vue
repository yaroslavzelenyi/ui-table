<script setup>
	import { computed } from "vue"

	const props = defineProps({
		tag: {
			type: String,
			default: "td",
			validator: (value) => ["td", "th"].includes(value),
		},
		align: {
			type: String,
			default: "left",
			validator: (value) => ["left", "center", "right"].includes(value),
		},
		compressed: {
			type: Boolean,
			default: false,
		},
	})

	const classes = computed(() => {
		return {
			"is-compressed": props.compressed,
			[`is-align-${props.align}`]: props.align !== "left",
		}
	})
</script>

<template>
	<component :is="props.tag" :class="classes" class="ui-table-cell">
		<div v-if="props.tag === 'th'" class="inner">
			<slot></slot>
		</div>
		<div v-else class="inner">
			<slot></slot>
		</div>
	</component>
</template>

<style lang="scss" scoped>
	.ui-table-cell {
		padding: 0.375rem 1rem;
		vertical-align: middle;

		.inner {
			display: flex;
			gap: 0.5rem;
			align-items: center;
		}

		& > * {
			vertical-align: middle;
		}

		&.is-compressed {
			width: 0;
			white-space: nowrap;
		}

		&.is-align-left,
		&.is-align-left .inner {
			justify-content: flex-start;
			text-align: left;
		}

		&.is-align-center,
		&.is-align-center .inner {
			justify-content: center;
			text-align: center;
		}

		&.is-align-right,
		&.is-align-right .inner {
			justify-content: flex-end;
			text-align: right;
		}
	}

	th.ui-table-cell {
		height: 2.5rem;
		font-weight: 600;
		color: #807f84;
		text-align: left;
		white-space: nowrap;
		border-bottom: 1px solid var(--ui-table-row-border-color);

		&:first-child {
			width: 3rem;
			padding: 0.5rem;
			border-left: 0;
		}

		&:last-child {
			width: 3rem;
			padding: 0.5rem;
			border-right: 0;
		}
	}

	td.ui-table-cell {
		text-align: left;
		border: 1px solid var(--ui-table-row-border-color);
		border-width: 0 1px 1px 0;

		&:first-child {
			width: 3rem;
			padding: 0.375rem 0.5rem;
			border-left: 0;
		}

		&:last-child {
			width: 3rem;
			padding: 0.375rem 0.5rem;
			border-right: 0;
		}

		.inner {
			min-height: 2rem;
		}
	}
</style>

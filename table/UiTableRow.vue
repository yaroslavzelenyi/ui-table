<script setup>
	const props = defineProps({
		sticky: {
			type: Boolean,
			default: false,
		},
		accent: {
			type: String,
			default: null,
			validator: (value) => !value || (value && ["muted", "info", "success", "warning", "error"].includes(value)),
		},
	})
</script>

<template>
	<tr :class="{ 'is-sticky': props.sticky, [`is-${props.accent}-accent`]: props.accent }" class="ui-table-row">
		<slot></slot>
	</tr>
</template>

<style lang="scss" scoped>
	.ui-table-row {
		--ui-table-row-background-color: var(--background-color);
		--ui-table-row-border-color: var(--border-color);
		--ui-table-row-background-hover-color: var(--color-slate-50);

		background-color: var(--ui-table-row-background-color);
		border-color: var(--ui-table-row-border-color);
		transition:
			background-color 0.125s ease-out,
			border-color 0.125s ease-out;

		&.is-sticky {
			:deep(th),
			:deep(td) {
				position: sticky;
				top: var(--top-offset);
				z-index: 100;
				background-color: var(--ui-table-row-background-color);
				border-color: var(--ui-table-row-border-color);
				transition: top 0.25s linear;
				will-change: top;
			}
		}

		&:hover {
			background-color: var(--ui-table-row-background-hover-color);
		}

		&.is-muted-accent {
			--ui-table-row-background-color: var(--color-slate-50);
			--ui-table-row-border-color: var(--color-slate-200);
			--ui-table-row-background-hover-color: var(--color-slate-100);
		}

		&:has(+ .ui-table-row.is-muted-accent) :deep(td) {
			border-bottom-color: var(--color-slate-200);
		}

		&.is-info-accent {
			--ui-table-row-background-color: var(--color-blue-50);
			--ui-table-row-border-color: var(--color-blue-200);
			--ui-table-row-background-hover-color: var(--color-blue-100);
		}

		&:has(+ .ui-table-row.is-info-accent) :deep(td) {
			border-bottom-color: var(--color-blue-200);
		}

		&.is-success-accent {
			--ui-table-row-background-color: var(--color-green-50);
			--ui-table-row-border-color: var(--color-green-200);
			--ui-table-row-background-hover-color: var(--color-green-100);
		}

		&:has(+ .ui-table-row.is-success-accent) :deep(td) {
			border-bottom-color: var(--color-green-200);
		}

		&.is-warning-accent {
			--ui-table-row-background-color: var(--color-amber-50);
			--ui-table-row-border-color: var(--color-amber-200);
			--ui-table-row-background-hover-color: var(--color-amber-100);
		}

		&:has(+ .ui-table-row.is-warning-accent) :deep(td) {
			border-bottom-color: var(--color-amber-200);
		}

		&.is-error-accent {
			--ui-table-row-background-color: var(--color-red-50);
			--ui-table-row-border-color: var(--color-red-200);
			--ui-table-row-background-hover-color: var(--color-red-100);
		}

		&:has(+ .ui-table-row.is-error-accent) :deep(td) {
			border-bottom-color: var(--color-red-200);
		}
	}
</style>

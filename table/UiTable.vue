<script setup>
	import { useSlots } from "vue"
	import { useI18n } from "vue-i18n"
	import { ITEMS_PER_PAGE } from "../../../../constants"
	import { numberFormat } from "../../../../utils/formatters"
	import UiEmpty from "../UiEmpty.vue"
	import UiPagination from "../UiPagination.vue"
	import UiSkeleton from "../UiSkeleton.vue"
	import UiTableCell from "./UiTableCell.vue"
	import UiTableRow from "./UiTableRow.vue"

	const props = defineProps({
		pagination: {
			type: Object,
			default: () => ({}),
		},
		loading: {
			type: Boolean,
			default: false,
		},
		error: {
			type: Object,
			default: () => ({}),
		},
	})

	const page = defineModel("page", {
		type: Number,
	})

	const slots = useSlots()

	const { t } = useI18n()

	function paginationHandler(selectedPage) {
		page.value = selectedPage
		window.scrollTo({ top: 0, behavior: "instant" })
	}
</script>

<template>
	<div :class="{ 'is-loading': props.loading }" class="ui-table">
		<table v-if="props.loading">
			<thead>
				<UiTableRow>
					<UiTableCell tag="th" compressed><UiSkeleton /></UiTableCell>
					<UiTableCell v-for="index in 5" :key="index" tag="th"><UiSkeleton /></UiTableCell>
					<UiTableCell tag="th" compressed><UiSkeleton /></UiTableCell>
				</UiTableRow>
			</thead>
			<tbody>
				<UiTableRow v-for="index in ITEMS_PER_PAGE" :key="index">
					<UiTableCell compressed><UiSkeleton /></UiTableCell>
					<UiTableCell v-for="index in 5" :key="index"><UiSkeleton /></UiTableCell>
					<UiTableCell compressed><UiSkeleton /></UiTableCell>
				</UiTableRow>
			</tbody>
		</table>
		<div v-else-if="pagination.total === 0 || Object.keys(props.error || {}).length" class="empty">
			<slot name="empty">
				<UiEmpty v-if="Object.keys(props.error || {}).length" variant="error">
					<template #title>{{ t("empty.title") }}</template>
					<template #description>{{ props.error }}</template>
				</UiEmpty>
				<UiEmpty v-else variant="warning">
					<template #title>{{ t("empty.title") }}</template>
					<template #description>{{ t("empty.description") }}</template>
				</UiEmpty>
			</slot>
		</div>
		<div v-else class="inner">
			<table>
				<thead v-if="slots.head">
					<slot name="head"></slot>
				</thead>

				<tbody v-if="slots.default">
					<slot></slot>
				</tbody>

				<tfoot v-if="slots.foot">
					<tr>
						<slot name="foot"></slot>
					</tr>
				</tfoot>
			</table>

			<div v-if="pagination?.pages > 1" class="pagination">
				<div class="summary">
					<div>
						<strong>Page:</strong>
						{{ numberFormat(pagination.page) }} of {{ numberFormat(pagination.pages) }}
					</div>
					<div>
						<strong>Total items:</strong>
						{{ numberFormat(pagination.total) }}
					</div>
				</div>
				<UiPagination :page="pagination.page" :page-count="pagination.pages" @update:page="paginationHandler" />
			</div>
		</div>
	</div>
</template>

<i18n lang="json">
{
	"en": {
		"empty": {
			"title": "No data to display",
			"description": "There are no records in the table. Try changing the filtering parameters or adding new data."
		}
	},
	"uk": {
		"empty": {
			"title": "Немає даних для відображення",
			"description": "У таблиці відсутні записи. Спробуйте змінити параметри фільтрації або додати нові дані."
		}
	},
	"ru": {
		"empty": {
			"title": "Нет данных для отображения",
			"description": "В таблице отсутствуют записи. Попробуйте изменить параметры фильтрации или добавьте новые данные."
		}
	}
}
</i18n>

<style lang="scss" scoped>
	.ui-table {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 1.75rem;
		width: 100%;
		height: 100%;

		table {
			width: 100%;
			vertical-align: middle;
			word-break: break-all;
			border-spacing: 0;
			border-collapse: separate;
		}

		.inner {
			display: flex;
			flex-direction: column;
			gap: 1.75rem;
			width: 100%;
		}

		.empty {
			display: flex;
			flex: 1;
			flex-direction: column;
			gap: 1.75rem;
			width: 100%;
			margin-top: -1.75rem;
		}

		.pagination {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.summary {
				display: flex;
				gap: 1.75rem;
			}
		}
	}
</style>

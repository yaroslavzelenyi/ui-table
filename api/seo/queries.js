import { useQuery } from "@pinia/colada"
import { ref } from "vue"
import { useApi } from "../../../composables/useApi"
import { defineCustomQuery } from "../.."
import { ITEMS_PER_PAGE } from "../../../constants"
import { SEO_KEYS } from "./keys"

export const useSeoPages = defineCustomQuery((options = {}) => {
	const { API } = useApi()

	const STATUSES = Object.freeze({
		active: "active_only",
		deactivated: "deactivated_only",
		all: "all",
		duplicates: "duplicates",
	})

	const defaults = {
		search: "",
		page: 1,
		perPage: ITEMS_PER_PAGE,
		filters: {
			status: STATUSES.all,
		},
	}
	const params = ref(structuredClone(defaults))

	const query = useQuery({
		key: () => SEO_KEYS.pages(params.value.page),
		query: () => {
			return API.seo
				.getPages({
					search: params.value.search,
					skip: (Number(params.value.page) - 1) * ITEMS_PER_PAGE,
					limit: params.value.perPage || ITEMS_PER_PAGE,
					status: params.value.filters.status,
				})
				.then((response) => response.data?.data)
		},
		...options,
	})

	return { ...query, params, defaults, STATUSES }
})

/* ------------------------------------------ */

export const useSeoPage = defineCustomQuery((options = {}) => {
	const { API } = useApi()
	const params = ref({ id: null })

	const query = useQuery({
		key: () => SEO_KEYS.page(params.value.id),
		query: () => API.seo.getPage(params.value.id).then((response) => response.data?.data),
		...options,
	})

	return { ...query, params }
})

/* ------------------------------------------ */

export const useSeoRobotsDomains = defineCustomQuery((options = {}) => {
	const { API } = useApi()

	const query = useQuery({
		key: () => SEO_KEYS.robotsDomains(),
		query: () => API.seo.getRobotsDomains().then((response) => response.data?.data),
		...options,
	})

	return query
})

/* ------------------------------------------ */

export const useSeoRobotsData = defineCustomQuery((options = {}) => {
	const { API } = useApi()
	const params = ref({ domain: null })

	const query = useQuery({
		key: () => SEO_KEYS.robotsData(params.value.domain),
		query: () => API.seo.getRobotsData(params.value.domain).then((response) => response.data?.data),
		...options,
	})

	return { ...query, params }
})

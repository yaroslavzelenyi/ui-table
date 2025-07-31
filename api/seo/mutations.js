import { defineMutation, useMutation, useQueryCache } from "@pinia/colada"
import { useApi } from "../../../composables/useApi"
import { mutateCachedData } from "../../index"
import { SEO_KEYS } from "./keys"

// export const useUpdateSeoPages = defineMutation(() => {
// 	const { API } = useApi()
// 	const queryCache = useQueryCache()

// 	const mutation = useMutation({
// 		mutation: (d) => null, // console.log(d), // API.seo.updateRobotsData(data),
// 		onMutate: (params) => {
// 			const key = ["seo-pages", 1, null]
// 			const cachedData = queryCache.getQueryData(key)
// 			const newData = { ...cachedData }
// 			const index = newData.items.findIndex((value) => value.id === params.id)

// 			if (index !== -1) {
// 				newData.items[index] = {
// 					...newData.items[index],
// 					...params,
// 				}

// 				queryCache.setQueryData(key, newData)
// 				queryCache.cancelQueries({ key })
// 			}

// 			return { ...cachedData, ...newData }
// 		},

// 		onSuccess: (_, params, newData) => {
// 			// queryCache.invalidateQueries({ key: ["seo-pages", 1, null] })
// 		},
// 	})

// 	return mutation
// })

/* ------------------------------------------ */

export const useCreateSeoPage = defineMutation(() => {
	const { API } = useApi()
	const queryCache = useQueryCache()

	const mutation = useMutation({
		mutation: (data) => API.seo.createPage(data),
		onSuccess: () => {
			queryCache.invalidateQueries({ key: SEO_KEYS.pages() })
		},
	})

	return mutation
})

export const useUpdateSeoPage = defineMutation(() => {
	const { API } = useApi()
	const queryCache = useQueryCache()

	const mutation = useMutation({
		mutation: ({ id, ...data }) => {
			return API.seo.updatePage(id, data)
		},
		onSuccess: () => {
			queryCache.invalidateQueries({ key: SEO_KEYS.pages() })
		},
	})

	return mutation
})

export const useActivateSeoPage = defineMutation(() => {
	const { API } = useApi()

	const mutation = useMutation({
		mutation: (id) => API.seo.activatePage(id),
		onMutate: (id) => {
			return mutateCachedData(SEO_KEYS.pages(), id, (value) => {
				return {
					...value,
					is_active: true,
				}
			})
		},
	})

	return mutation
})

export const useDeactivateSeoPage = defineMutation(() => {
	const { API } = useApi()

	const mutation = useMutation({
		mutation: (id) => API.seo.deactivatePage(id),
		onMutate: (id) => {
			return mutateCachedData(SEO_KEYS.pages(), id, (value) => {
				return {
					...value,
					is_active: false,
				}
			})
		},
	})

	return mutation
})

export const useDeleteSeoPage = defineMutation(() => {
	const { API } = useApi()
	const queryCache = useQueryCache()

	const mutation = useMutation({
		mutation: (id) => API.seo.deletePage(id),
		onSuccess: () => {
			queryCache.invalidateQueries({ key: SEO_KEYS.pages() })
		},
	})

	return mutation
})

/* ------------------------------------------ */

export const useUpdateSeoRobotsData = defineMutation(() => {
	const { API } = useApi()

	const mutation = useMutation({
		mutation: (data) => API.seo.updateRobotsData(data),
	})

	return mutation
})

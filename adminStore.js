import { useQueryCache } from "@pinia/colada"
import { defineStore } from "pinia"
import { computed, shallowRef } from "vue"
import { useApi } from "../composables/useApi"

export const useAdminStore = defineStore("admin", () => {
	const { API } = useApi()
	const queryCache = useQueryCache()

	/* STATE */

	const token = shallowRef(window.localStorage.getItem("bo_token") || null)
	const loading = shallowRef(false)
	const info = shallowRef({})
	const settings = shallowRef({})

	/* GETTERS */

	const isAuthorized = computed(() => token.value)
	const allowedRoutes = computed(() => {
		return ["home", "login", "not-found", ...(info.value.permissions || []).map((permission) => permission.term)]
	})

	/* ACTIONS */

	async function login(parameters = {}) {
		try {
			loading.value = true
			const { data } = await API.admin.login(parameters)

			token.value = data.data.token
			window.localStorage.setItem("bo_token", token.value)

			return data
		} catch (error) {
			throw new Error(error?.response?.data?.error?.message)
		} finally {
			loading.value = false
		}
	}

	function logout() {
		token.value = false
		info.value = {}

		window.localStorage.removeItem("bo_token")

		queryCache.invalidateQueries()
	}

	async function getInfo() {
		try {
			const { data } = await API.admin.getInfo()

			info.value = data?.data || {}

			return data
		} catch (error) {
			throw new Error(error?.response?.data?.error?.message)
		}
	}

	async function getSettings() {
		try {
			const { data } = await API.admin.getSettings()

			settings.value = data?.data || {}

			return settings
		} catch (error) {
			throw new Error(error?.response?.data?.error?.message)
		}
	}

	function hasPermission(term, type) {
		const permissions = info.value?.permissions
		if (!Array.isArray(permissions) || !permissions.length) {
			return false
		}

		if (type && !["read", "write"].includes(type)) {
			type = null
		}

		return permissions.some((permission) => {
			return permission.term === term && (!type || permission.permission_type.includes(type))
		})
	}

	function getMainRole() {
		if (!info.value?.permissions?.length) {
			return null
		}

		return info.value.permissions[0]
	}

	function $reset() {
		logout()
	}

	return {
		token,
		isAuthorized,
		allowedRoutes,
		info,
		settings,

		login,
		logout,
		getInfo,
		getSettings,
		hasPermission,
		getMainRole,

		$reset,
	}
})

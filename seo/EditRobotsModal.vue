<script setup>
	import { toTypedSchema } from "@vee-validate/valibot"
	import * as v from "valibot"
	import { useForm } from "vee-validate"
	import { computed, onMounted } from "vue"
	import { useI18n } from "vue-i18n"
	import { useUpdateSeoRobotsData } from "../../../../api/fetchers/seo/mutations"
	import { useSeoRobotsData, useSeoRobotsDomains } from "../../../../api/fetchers/seo/queries"
	import { fieldValidationConfig } from "../../../../utils/validation"
	// import { isRequired, isRequiredIf, isString, trim } from "../../../../utils/validators"
	import { UiButton, UiForm, UiFormItem, UiIcon, UiInput, UiModal, UiSelect, useMessage } from "../../ui"

	const {
		data: robotsDomainsData,
		isLoading: isLoadingRobotsDomains,
		refresh: refreshRobotsDomains,
	} = useSeoRobotsDomains()
	const {
		params: RobotsDataParams,
		data: RobotsDataData,
		isLoading: isLoadingRobotsData,
		refresh: refreshRobotsData,
	} = useSeoRobotsData()
	const { mutateAsync: updateRobotsData, isLoading: isLoadingUpdateRobotsData } = useUpdateSeoRobotsData()

	const message = useMessage()
	const { t } = useI18n()

	const domainsOptions = computed(() => {
		return robotsDomainsData.value?.domains?.map((domain) => ({ label: domain, value: domain }))
	})

	/* ------------------------------------------ */

	const FormSchema = toTypedSchema(
		v.object({
			domain: v.pipe(v.string(), v.trim(), v.nonEmpty()),
			content: v.pipe(v.string(), v.trim(), v.nonEmpty()),
		}),
	)
	const { meta, defineField, handleSubmit, resetForm, errors } = useForm({
		validationSchema: FormSchema,
		// validationSchema: {
		// 	domain: [isString(), isRequired(), trim()],
		// 	content: [isString(), isRequired()],
		// },
		initialValues: {
			domain: "",
			content: "",
		},
	})
	const [domain, domainProps] = defineField("domain", fieldValidationConfig)
	const [content, contentProps] = defineField("content", fieldValidationConfig)

	const submitHandler = handleSubmit(async (values) => {
		await updateRobotsData({
			domain: values.domain,
			content: values.content,
		})
		resetForm({ values })

		message.success({ content: t("message.success") })
	})

	/* ------------------------------------------ */

	async function selectDomainHandler(domainValue) {
		RobotsDataParams.value.domain = domainValue

		await refreshRobotsData()
		resetForm(
			{
				values: {
					domain: domainValue,
					content: RobotsDataData.value?.content || "",
				},
			},
			{
				force: true,
			},
		)
	}

	/* ------------------------------------------ */

	onMounted(async () => {
		await refreshRobotsDomains()
		await selectDomainHandler(domainsOptions.value[0]?.value || "")
	})
</script>

<template>
	<UiModal
		:content-loading="isLoadingRobotsDomains || isLoadingRobotsData || isLoadingUpdateRobotsData"
		:title="t('title')"
		:has-unsaved-changes="meta?.dirty"
		icon="robot"
	>
		<UiForm>
			<UiFormItem required>
				<template #label>{{ t("form.label.domain") }}:</template>
				<UiSelect
					v-model:value="domain"
					:options="domainsOptions"
					v-bind="domainProps"
					@update:value="selectDomainHandler"
				/>
				<template v-if="errors.domain" #feedback>{{ errors.domain }}</template>
			</UiFormItem>

			<UiFormItem required>
				<template #label>{{ t("form.label.content") }}:</template>
				<UiInput
					v-model:value="content"
					:autosize="{ minRows: 6, maxRows: 24 }"
					v-bind="contentProps"
					type="textarea"
				/>
				<template v-if="errors.content" #feedback>{{ errors.content }}</template>
			</UiFormItem>
		</UiForm>

		<template #footer-end>
			<UiButton
				:disabled="isLoadingRobotsDomains || isLoadingRobotsData"
				:loading="isLoadingUpdateRobotsData"
				accent="success"
				@click="submitHandler"
			>
				<template #icon>
					<UiIcon name="device-floppy" />
				</template>
				{{ t("form.action.save") }}
			</UiButton>
		</template>
	</UiModal>
</template>

<i18n lang="json">
{
	"en": {
		"title": "Edit Robots data",
		"message": {
			"success": "Robots data updated"
		}
	},
	"uk": {
		"title": "Редагувати дані Robots",
		"message": {
			"success": "Дані Robots оновлено"
		}
	},
	"ru": {
		"title": "Редактировать данные Robots",
		"message": {
			"success": "Данные Robots обновлены"
		}
	}
}
</i18n>

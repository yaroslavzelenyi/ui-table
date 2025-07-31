<script setup>
	import { toTypedSchema } from "@vee-validate/valibot"
	import * as v from "valibot"
	import { useForm } from "vee-validate"
	import { computed, onMounted } from "vue"
	import { useI18n } from "vue-i18n"
	import { useCreateSeoPage, useUpdateSeoPage } from "../../../../api/fetchers/seo/mutations"
	import { useSeoPage } from "../../../../api/fetchers/seo/queries"
	import { fieldValidationConfig } from "../../../../utils/validation"
	import { UiButton, UiForm, UiFormItem, UiIcon, UiInput, UiModal, useMessage } from "../../ui"

	const props = defineProps({
		id: {
			type: [String, Number],
			default: null,
		},
	})

	const message = useMessage()
	const { t } = useI18n()

	const modalMeta = computed(() => {
		if (props.id) {
			return {
				title: t("title.editPage"),
				icon: "pencil",
			}
		}

		return {
			title: t("title.createPage"),
			icon: "circle-plus",
		}
	})

	/* ------------------------------------------ */

	const {
		params: seoPageParams,
		data: seoPageData,
		isLoading: isLoadingSeoPage,
		refresh: refreshSeoPage,
	} = useSeoPage()
	const { mutateAsync: createSeoPage, isLoading: isLoadingCreateSeoPage } = useCreateSeoPage()
	const { mutateAsync: updateSeoPage, isLoading: isLoadingUpdateSeoPage } = useUpdateSeoPage()

	/* ------------------------------------------ */

	const FormSchema = toTypedSchema(
		v.object({
			url_mask: v.pipe(
				v.string(),
				v.nonEmpty("URL is required"),
				v.trim(),
				v.toLowerCase(),
				v.startsWith("/", 'URL must start with "/"'),
				v.custom(
					(value) => value !== "" && /^[\w\-.~/]+$/.test(value),
					"Недопустимые символы в URL. Разрешены: a-z 0-9 - _ . ~ /",
				),
			),
			page_title: v.pipe(v.string(), v.trim(), v.nonEmpty()),
			page_description: v.pipe(v.optional(v.string()), v.trim()),
			page_h1: v.pipe(v.optional(v.string()), v.trim()),
			page_footer: v.pipe(v.optional(v.string()), v.trim()),
		}),
	)
	const { meta, defineField, handleSubmit, resetForm, errors } = useForm({
		validationSchema: FormSchema,
		initialValues: {
			url_mask: "",
			page_title: "",
			page_description: "",
			page_h1: "",
			page_footer: "",
		},
	})
	const [urlMask, urlProps] = defineField("url_mask", fieldValidationConfig)
	const [pageTitle, titleProps] = defineField("page_title", fieldValidationConfig)
	const [pageDescription, descriptionProps] = defineField("page_description", fieldValidationConfig)
	const [pageH1, h1Props] = defineField("page_h1", fieldValidationConfig)
	const [pageFooter, footerTextProps] = defineField("page_footer", fieldValidationConfig)

	const submitHandler = handleSubmit(async (values) => {
		await (props.id
			? updateSeoPage({
					id: seoPageParams.value.id,
					...values,
				})
			: createSeoPage(values))

		resetForm({ values })

		message.success({ content: props.id ? t("message.saved") : t("message.added") })
	})

	onMounted(async () => {
		if (!props.id) {
			return
		}

		seoPageParams.value.id = props.id

		await refreshSeoPage()
		resetForm(
			{
				values: {
					url_mask: seoPageData.value?.url_mask,
					page_title: seoPageData.value?.page_title,
					page_description: seoPageData.value?.page_description,
					page_h1: seoPageData.value?.page_h1,
					page_footer: seoPageData.value?.page_footer,
				},
			},
			{
				force: true,
			},
		)
	})
</script>

<template>
	<UiModal
		:content-loading="isLoadingSeoPage || isLoadingCreateSeoPage || isLoadingUpdateSeoPage"
		:has-unsaved-changes="meta?.dirty"
		:title="modalMeta.title"
		:icon="modalMeta.icon"
	>
		<!--
			<template v-if="props.id" #actions>
			<UiButton icon-only>
			<template #icon>
			<UiIcon name="dots-vertical" />
			</template>
			</UiButton>
			</template>
		-->

		<UiForm>
			<UiFormItem required>
				<template #label>{{ t("form.label.url") }}:</template>

				<UiInput v-model:value="urlMask" v-bind="urlProps" />
				<template v-if="errors.url_mask" #feedback>{{ errors.url_mask }}</template>
			</UiFormItem>

			<UiFormItem required>
				<template #label>{{ t("form.label.title") }}:</template>

				<UiInput v-model:value="pageTitle" v-bind="titleProps" />
				<template v-if="errors.page_title" #feedback>{{ errors.page_title }}</template>
			</UiFormItem>

			<UiFormItem>
				<template #label>{{ t("form.label.description") }}:</template>

				<UiInput
					v-model:value="pageDescription"
					:autosize="{ minRows: 2, maxRows: 12 }"
					type="textarea"
					v-bind="descriptionProps"
				/>
				<template v-if="errors.page_description" #feedback>{{ errors.page_description }}</template>
			</UiFormItem>

			<UiFormItem>
				<template #label>{{ t("form.label.h1") }}:</template>

				<UiInput v-model:value="pageH1" v-bind="h1Props" />
				<template v-if="errors.page_h1" #feedback>{{ errors.page_h1 }}</template>
			</UiFormItem>

			<UiFormItem>
				<template #label>{{ t("form.label.footerText") }}:</template>

				<UiInput
					v-model:value="pageFooter"
					:autosize="{ minRows: 5, maxRows: 24 }"
					type="textarea"
					v-bind="footerTextProps"
				/>
				<template v-if="errors.page_footer" #feedback>{{ errors.page_footer }}</template>
			</UiFormItem>
		</UiForm>

		<template #footer-end>
			<UiButton
				:loading="isLoadingCreateSeoPage || isLoadingUpdateSeoPage"
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
		"title": {
			"createPage": "Create SEO page",
			"editPage": "Edit SEO page"
		},
		"message": {
			"added": "Page successfully created",
			"saved": "Page successfully saved"
		}
	},
	"uk": {
		"title": {
			"createPage": "Створити SEO сторінку",
			"editPage": "Редагувати SEO сторінку"
		},
		"message": {
			"added": "Сторінка успішно створена",
			"saved": "Сторінка успішно збережена"
		}
	},
	"ru": {
		"title": {
			"createPage": "Создать SEO страницу",
			"editPage": "Редактировать SEO страницу"
		},
		"message": {
			"added": "Страница успешно создана",
			"saved": "Страница успешно сохранена"
		}
	}
}
</i18n>

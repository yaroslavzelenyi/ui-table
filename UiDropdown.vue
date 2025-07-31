<script setup>
	import { NDropdown } from "naive-ui"
	import { h } from "vue"
	import UiIcon from "./UiIcon.vue"
	import UiLink from "./UiLink.vue"

	const props = defineProps({
		options: {
			type: Array,
			default: () => [],
		},
	})

	function renderIcon(option) {
		return option.icon ? h(UiIcon, { name: option.icon }) : null
	}

	function renderOption({ node, option }) {
		// optionData.node.children[0].children[0] = [] // prefix
		// optionData.node.children[0].children[1] = [] // label
		// properties.node.children[0].children[2] = [] // suffix

		const optionNode = node?.children?.[0]

		if (option.to) {
			node.children[0] = h(
				UiLink,
				{
					...(optionNode.props || {}),
					to: option.to,
				},
				{
					default: () => optionNode?.children,
				},
			)
		}

		const optionChildren = optionNode?.children

		if (!optionChildren || optionChildren.length < 3) {
			return node ? h(node) : null
		}

		const suffixNode = optionChildren[2]
		const suffixProps = suffixNode?.props || {}

		optionChildren[2] = [
			h("div", suffixProps, [option?.children?.length ? h(UiIcon, { name: "chevron-right" }) : null]),
		]

		return h(node)
	}

	function findOptionByKey(options, key) {
		for (const option of options) {
			if (option.key === key) {
				return option
			}

			if (option.children) {
				const found = findOptionByKey(option.children, key)

				if (found) {
					return found
				}
			}
		}

		return null
	}

	function selectHandler(key) {
		const option = findOptionByKey(props.options, key)

		if (option?.props?.onSelect && typeof option.props.onSelect === "function") {
			option.props.onSelect(option)
		}
	}
</script>

<template>
	<NDropdown
		:options="props.options"
		:show-arrow="false"
		:render-option="renderOption"
		:render-icon="renderIcon"
		:delay="200"
		trigger="hover"
		class="ui-dropdown"
		scrollable
		@select="selectHandler"
	>
		<slot></slot>
	</NDropdown>
</template>

<style lang="scss">
	.ui-dropdown.n-dropdown-menu {
		// --n-color: #0b57d0;
		// --n-color: #0c66e4;
		// --n-color: oklch(54.19% 0.2065 259.4deg);
		// --n-color: #206cff;
		--n-color: #2563eb;
		--n-option-text-color: #fff;
		--n-prefix-color: #fff;
		--n-suffix-color: #fff;
		--n-option-height: 2rem;
		--n-option-color-hover: #172554;
		--n-option-text-color-hover: #fff;
		--n-padding: 0.25rem 0;
		--n-divider-color: rgb(0 0 0 / 20%);
		--n-option-opacity-disabled: 0.4;

		&.n-dropdown-menu,
		.n-dropdown-menu {
			min-width: 12rem;
			max-height: max(64vmin, 30rem);
			border: 1px solid rgb(0 0 0 / 16%);
			border-radius: 0.6875rem;
			box-shadow:
				0 0.125rem 0.25rem rgb(0 0 0 / 5%),
				0 0.625rem 1.75rem rgb(0 0 0 / 10%);
		}

		.n-dropdown-option {
			& + .n-dropdown-option {
				margin-top: 1px;
			}

			.n-dropdown-option-body {
				padding: 0 0.25rem;

				&::before {
					right: 0.25rem;
					left: 0.25rem;
					border-radius: 0.4375rem;
				}

				&:not(.n-dropdown-option-body--disabled).n-dropdown-option-body--pending::before {
					box-shadow:
						0 0 0 1px rgb(7 22 49 / 6%),
						0 0.125rem 0.25rem rgb(7 22 49 / 10%);
				}

				.n-dropdown-option-body__prefix {
					--ui-icon-size: 1.125rem;

					opacity: 0.6;
				}
			}

			.n-dropdown-option-body__label {
				font-weight: 600;
			}
		}

		.n-dropdown-divider {
			height: auto;
			margin: 0.25rem 1rem;
			background: none;
			border-top: 1px solid var(--n-divider-color);
			transition: background-color 0.3s var(--n-bezier);
		}
	}
</style>

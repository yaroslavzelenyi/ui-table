<template>
	<div class="ui-form-group">
		<slot></slot>
	</div>
</template>

<style lang="scss" scoped>
	.ui-form-group {
		display: flex;
		gap: var(--ui-form-gap, 1.5rem);
		width: 100%;
		container-type: inline-size;
	}

	@container ui-form (width <= 30rem) {
		.ui-form-group {
			flex-wrap: wrap;
		}
	}
</style>

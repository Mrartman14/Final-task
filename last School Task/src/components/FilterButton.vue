<template>

	<button @click="changeSortType()" class="option-button">
		Сортировать по: {{ sortBy[sortParam][0] }}
	</button>

</template>

<script>

	import { mapActions, mapGetters } from 'vuex';

	export default {
		name: 'FilterButton',
		data() {
			return {
				sortBy: [
					['Дате', 'dete'],
					['Заголовкам', 'title'],
					['Описанию', 'description']
				]
			}
		},
		computed: {
			...mapGetters([
				'sortParam', 'search', 'searchParam'
			])
		},
		methods: {
			...mapActions([
				'setQueryParams'
			]),
			changeSortType() {
				let shadowSortParam = this.sortParam + 1;
				if(shadowSortParam + 1 > this.sortBy.length) {
					shadowSortParam = 0
				}
				this.setQueryParams({
					search: this.search,
					searchParam: this.searchParam,
					sort: `&sortBy=${this.sortBy[shadowSortParam][1]}&order=${this.sortBy[shadowSortParam][1]}`,
					sortParam: shadowSortParam
				})
			}
		}
	}

</script>

<style lang="scss">

	@import '../helpers/common-styles.scss';

	.option-button{
		box-sizing: border-box;
		padding: 9px;
		background: $primary-background-button-color;
		border: 1px solid #000;
		border-radius: 20px;
		&:hover {
			color: $secondary-font-color;
			border: 1px solid $secondary-font-color;
		}
	}

</style>
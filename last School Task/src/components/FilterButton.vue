<template>

	<button @click="changeSortType()" class="option-button">
		Сортировать по: {{ sortBy[index][0] }}
	</button>

</template>

<script>

	import { mapActions } from 'vuex';

	export default {
		name: 'filterButton',
		data() {
			return {
				sortBy: [
					['Дате', 'dete'],
					['Заголовкам', 'title'], 
					['Описанию', 'description']
				],
				index: 0
			}
		},
		methods: {
			...mapActions([
				'createSortQuery'
			]),
			changeSortType() {
				this.index += 1;
				if(this.index > (this.sortBy.length - 1)) {
					this.index = 0;
				}
				this.createSortQuery({
					sort: `&sortBy=${this.sortBy[this.index][1]}&order=${this.sortBy[this.index][1]}`
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
	}
</style>
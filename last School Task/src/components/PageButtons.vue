<template>

	<div class="btn_container">
		<button @click="pagination( (page - 1) )" class="page-button">Пред.стр.</button> 

		<button v-for="(item, i) in numberOfbuttons()" :key="i" 
		@click="pagination( (i + 1) )"
		:class="buttonClass(i)">
			{{ i + 1 }}
		</button>

		<button @click="pagination( (page + 1) )" class="page-button">Сл.стр.</button>
	</div>

</template>

<script>

	import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'PageButtons',
		computed: {
			...mapGetters([
				'fullDataLength', 'page', 'limit'
			])
		},
		methods: {
			...mapActions([
				'getFullDataLength', 'createPaginationQuery'
			]),
			pagination(pageNumber) {
				if(pageNumber < 1) {
					pageNumber = 1;
				}else if(pageNumber > this.numberOfbuttons().length) {
					pageNumber = this.numberOfbuttons().length;
				}
				this.createPaginationQuery({
					pagination: `&page=${pageNumber}&limit=${this.limit}`,
					currentPage: pageNumber
				})
			},
			numberOfbuttons() {
				this.getFullDataLength();
				let buttonCount = [];
				buttonCount.length = Math.ceil(this.fullDataLength / this.limit);
				return buttonCount
			},
			buttonClass(i) {
				if((i + 1) === this.page) {
					return `page-button page-button-created page-button-active`
				}else return `page-button page-button-created`
			}
		},
		mounted() {
			this.numberOfbuttons();
		}
		
	};
</script>

<style lang="scss">
	.btn_container {
		padding-top: 30px;
	}
	.page-button {
		box-shadow: 0px 0px 4px 0px rgba(50, 50, 50, 0.41);//$box-shadow
		padding: 5px;
		margin: 0 5px;
		background: #fff;
		border: 1px solid #000;
		border-radius: 5px;
	}
	.page-button-created{
		padding: 5px 10px;
	}
	.page-button-active {
		background: rgb(199, 199, 199);
	}
</style>

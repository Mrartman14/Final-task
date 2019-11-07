<template>

	<div class="btn_container">
		<button @click="pagination( (page - 1) )" class="page-button">Туда</button> 

		<button v-for="(item, i) in numberOfbuttons()" :key="i" 
		@click="pagination( (i + 1) )"
		:class="buttonClass(i)">
			{{ i + 1 }}
		</button>

		<button @click="pagination( (page + 1) )" class="page-button">Сюда</button>
	</div>

</template>

<script>

	import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'PageButtons',
		computed: {
			...mapGetters([
				'data'
			])
		},
		methods: {
			...mapActions([
				//????
			]),
			pagination(pageNumber) {
				if(pageNumber < 1) {
					pageNumber = 1;
				}else if(pageNumber > this.numberOfbuttons().length) {
					pageNumber = this.numberOfbuttons().length;
				}
			},
			numberOfbuttons() {
				let buttonCount = [];
				//buttonCount.length = Math.ceil(this.data.length / this.limit);
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
@import '../helpers/common-styles.scss';
	.btn_container {
		padding-top: 30px;
	}
	.page-button {
		box-shadow: $box-shadow;
		padding: 5px;
		margin: 0 5px;
		background: $primary-background-button-color;
		border: 1px solid #000;
		border-radius: 5px;
	}
	.page-button-created{
		padding: 5px 10px;
	}
	.page-button-active {
		background: $secondary-background-button-color;
	}
</style>

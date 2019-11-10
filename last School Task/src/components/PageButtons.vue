<template>

	<div class="btn_container" v-if="buttonsExist">
		<button @click="pagination( (currentPage - 1) )" class="page-button">Сюда</button> 

		<button v-for="(item, i) in numOfButtons" :key="i" 
		@click="pagination( (i + 1) )"
		:class="buttonClass(i)">
			{{ i + 1 }}
		</button>

		<button @click="pagination( (currentPage + 1) )" class="page-button">Туда</button>
	</div>

</template>

<script>

	import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'PageButtons',
		props: {
			numOfButtons: Number
		},
		computed: {
			...mapGetters([
				'data', 'currentPage'
			]),
			buttonsExist() {
				return this.numOfButtons > 1 ? true : false
			}
		},
		methods: {
			...mapActions([
				'setCurrentPage'
			]),
			pagination(pageNumber) {
				if(pageNumber < 1) {
					pageNumber = 1;
				}
				if(pageNumber > this.numOfButtons) {
					pageNumber = this.numOfButtons;
				}
				this.setCurrentPage(pageNumber);
			},
			buttonClass(i) {
				return (i + 1) === this.currentPage ? `page-button page-button-created page-button-active` : `page-button page-button-created`
			}
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
		padding: 10px;
		margin: 0 5px;
		background: $primary-background-button-color;
		border: 1px solid #000;
		border-radius: 5px;
		&:hover {
			color: $secondary-font-color;
			border: 1px solid $secondary-font-color;
		}
	}
	.page-button-created{
		padding: 10px 15px;
	}
	.page-button-active {
		background: $secondary-background-button-color;
		&:hover {
			color: $primary-font-color;
			border: 1px solid $primary-font-color;
		}
	}

</style>

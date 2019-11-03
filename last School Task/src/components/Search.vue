<template>
	<div class="search">
		<button v-if="searchExistence" @click="reset()" class="search__reset">
			{{ searchParam }}
		</button>

		<input type="text"
		placeholder="Поиск..."
		class="search__input"
		v-model="searchValue"
		@keyup.enter="search()">
	</div>
</template>

<script>

	import { mapActions, mapGetters } from 'vuex';

	export default {
		name: 'search',
		data() {
			return {
				searchValue: ``,
				placeholder: ``,
				searchExistence: false
			}
		},
		computed: {
			...mapGetters([
				'searchParam'
			])
		},
		methods: {
			...mapActions([
				'createSearchQuery'
			]),
			checksearchExistence() {
				if(this.searchParam !== ``) {
					this.searchExistence = true;
				}
			},
			search() {
				this.createSearchQuery({
					search: `?search=${this.searchValue}`,
					searchParam: this.searchValue
				});
				this.checksearchExistence();
				//и команду на то чтобы убрать фокус с инпута
				this.searchValue = ''; 
			},
			reset() {
				this.searchValue = ``;
				this.search();
				this.searchExistence = false;
			}
		}
	}

</script>

<style lang="scss">
	.search {
		display: flex;
		align-items: center;
		&__input {
			border: none;
			padding: 4px 0 4px 25px;
			width: 90px;
			box-shadow: 0px 0px 2px 0px rgba(50, 50, 50, 0.41) inset; //$box-shadow
			border-radius: 10px;
			background-image: url('../images/magnifying-glass.png');
			background-size: 14px 14px;
			background-repeat: no-repeat;
			background-position: 5px 50%;
			&:focus {
				width: 170px;
				background: none;
				padding-left: 10px;
			}
		}
		&__glass {
			padding: 0 5px;
			opacity: 0.6;
			width: 14px;
			height: 14px;
			cursor: pointer;
		}
		&__reset {
			border: none;
			background: none;
			opacity: 0.2;
			&:hover {
				opacity: 1;
				color: #ff0000;
			}
		}
	}
</style>
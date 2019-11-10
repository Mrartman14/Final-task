<template>

	<div class="search">
		<button
		v-if="searchParamExist"
		@click="reset()"
		class="search__reset">
			Поиск по: {{ searchParam }}
		</button>

		<input type="text"
		placeholder="Поиск..."
		class="search__input"
		v-model="searchValue"
		@keyup.enter="searchCreate()">
	</div>

</template>

<script>

	import { mapActions, mapGetters } from 'vuex';

	export default {
		name: 'Search',
		data() {
			return {
				searchValue: '',
			}
		},
		computed: {
			...mapGetters([
				'search', 'searchParam', 'sort', 'sortParam'
			]),
			searchParamExist() {
				if(this.searchParam === '') {
					return false
				}else return true
			}
		},
		methods: {
			...mapActions([
				'setQueryParams'
			]),
			searchCreate() {
				this.setQueryParams({
					search: `?search=${this.searchValue}`,
					searchParam: this.searchValue,
					sort: this.sort,
					sortParam: this.sortParam
				})
				this.searchValue = '';
			},
			reset() {
				this.searchValue = ``;
				this.searchCreate();
			}
		}
	}

</script>

<style lang="scss">

	@import '../helpers/common-styles.scss';

	.search {
		display: flex;
		align-items: center;
		padding-right: 10px;
		&__input {
			border: none;
			padding: 4px 0 4px 25px;
			width: 90px;
			box-shadow: $mini-box-shadow inset;
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
				color: $delete-color;
			}
		}
	}

</style>
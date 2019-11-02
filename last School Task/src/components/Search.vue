<template>
	<div class="search-wrapper">
		<input type="text" placeholder="Поиск..." class="search"
		v-model="searchValue" @keyup.enter="search()">
	</div>
</template>

<script>

	import { mapActions } from 'vuex';

	export default {
		name: 'search',
		data() {
			return {
				searchValue: ''
			}
		},
		methods: {
			...mapActions([
				'createSearchQuery',// 'getSearchContent'
			]),
			search() {
				//this.getSearchContent(searchValue);
				this.createSearchQuery({
					search: `?search=${this.searchValue}`
				});
				this.searchValue = '';
			}
		}
	}

</script>

<style lang="scss">

</style>
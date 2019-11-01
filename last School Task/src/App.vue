<template>
	<div id="app">
		<router-link to="/past-events"> Прошедшие </router-link>
		<router-link to="/current-events"> Текущие </router-link>
		<router-link to="/nearest-events"> Ближайшие </router-link>

		<router-view />
	</div>
</template>

<script>
//поставить ESlint
//	import { mapActions } from 'vuex';

	export default {
		name: 'app',
		// methods: {
		// 	...mapActions([
		// 		'loadData'
		// 	]),
		// },
		// mounted() {
		// 	this.loadData();
		// },
	}

</script>

<style lang="scss">

</style>

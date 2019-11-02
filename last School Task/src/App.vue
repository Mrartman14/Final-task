<template>
	<div id="app">
		<div class="nav">
			<div class="nav__links">
				<router-link to="/past-events"> Прошедшие </router-link>
				<router-link to="/current-events"> Текущие </router-link>
				<router-link to="/nearest-events"> Ближайшие </router-link>
			</div>
			<search />
		</div>

		<router-view />
	</div>
</template>

<script>
//поставить ESlint
//	import { mapActions } from 'vuex';
	import search from './components/Search'

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
		components: {
			search
		}
	}

</script>

<style lang="scss">
.nav {
	display: flex;
	justify-content: space-between;
}
</style>

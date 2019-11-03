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
	import search from './components/Search'

	export default {
		name: 'app',
		components: {
			search
		}
	}

</script>

<style lang="scss">
	#app {
		max-width: 1000px;
		margin: 0 auto;
	}
	.nav {
		display: flex;
		justify-content: space-between;
	}
</style>

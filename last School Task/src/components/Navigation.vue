<template>

	<div class="nav_wrapper">
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

	import search from './Search';

	export default {
		name: 'Navigation',
		components: {
			search
		}
	}

</script>

<style lang="scss">
@import '../helpers/common-styles.scss';
	.nav {
		display: flex;
		justify-content: space-between;
	}
</style>

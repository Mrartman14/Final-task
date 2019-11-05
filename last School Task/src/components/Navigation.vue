<template>

	<div class="nav_wrapper">
		<nav class="navigation">
			<div class="navigation__link-container">
				<router-link :to="{ 
					path: '/events/past',
					params: {
						conditionProp: 'someParam'
					}
				}"
				class="navigation__link">
					Прошедшие 
				</router-link>
				<router-link :to="{ 
					path: '/events/current',
					params: {
						conditionProp: 'someParam'
					}
				}"
				class="navigation__link">
					Текущие
				</router-link>
				<router-link :to="{ 
					path: '/events/nearest',
					params: {
						conditionProp: 'someParam'
					}
				}"
				class="navigation__link">
					Ближайшие
				</router-link>
			</div>
			<search />
		</nav>
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
	.navigation {
		display: flex;
		justify-content: space-between;
		box-shadow: 0 5px 5px -5px #333;
	}
</style>

<template>
	<div class="fullPage">
		<div class="navigation-layout">
			<div class="navigation-wrapper">
				<Navigation />
			</div>
		</div>	
		<div class="main-content-wrapper">
			<router-view />
		</div>
	</div>
</template>

<script>

	import Navigation from './Navigation'

	export default {
		name: 'app',
		components: {
			Navigation
		}
	}

</script>

<style lang="scss">

	@import '../helpers/common-styles.scss';

	.navigation-layout {
		overflow: hidden;
		padding-bottom: 5px;
	}
	.navigation-wrapper {
		box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
		overflow: hidden;
	}
	.main-content-wrapper {
		min-width: 500px;
		max-width: 1000px;
		margin: 0 auto;
		padding: 10px;
	}

</style>

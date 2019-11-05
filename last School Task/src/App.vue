<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	//поставить ESlint
	import Layout from './components/Layout'

	export default {
		name: 'app',
		components: {
			Layout
		}
	}

</script>

<style lang="scss">
	@import './helpers/common-styles.scss';
	#app {
		max-width: 1000px;
		margin: 0 auto;
	}
</style>

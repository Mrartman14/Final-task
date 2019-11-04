<template>

	<div id="app">
		<navigation/>
	</div>

</template>

<script>
	//поставить ESlint
	import navigation from './components/Navigation'

	export default {
		name: 'app',
		components: {
			navigation
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

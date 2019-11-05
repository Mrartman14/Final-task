<template>
    <div>
        <navigation />
        <router-view />
    </div>  
</template>

<script>

	import navigation from './Navigation'

	export default {
		name: 'app',
		components: {
			navigation
		}
	}

</script>

<style lang="scss">

</style>

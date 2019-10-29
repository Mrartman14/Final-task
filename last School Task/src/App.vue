<template>
	<div id="app">
		<!--тут только роутер -->
		<eventCreate />
		<currentEventList />
	</div>
</template>

<script> //не забывать использовать одинарные кавычки
		 //поставить ESlint
import eventCreate from './components/EventCreate';
import currentEventList from './components/CurrentEventList';

export default {
	name: 'app',
	data () {
		return {

		}
	},
	components: {
		currentEventList: currentEventList,//вроде можно без дублирований
		eventCreate: eventCreate
	}
}
</script>

<style lang="scss">

</style>

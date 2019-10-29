<template>

	<div class="eventsContainer">
		<event v-for="(item, i) in data" :key="i"
		:dataIndex = i
		class="event-wrapper"/>
	</div>

</template>

<script>

	import event from './Event';
	import { mapActions, mapGetters } from 'vuex';

	export default {
		name: 'currentEventList',
		props: {
		},
		computed: {
			...mapGetters([
				'data'
			])
		},
		methods: {
			...mapActions([
				'loadData'
			]),
		},
		mounted() {
			this.loadData(); //это надо вынести в более глобальный  компонент
		},
		components: {
			event: event
		}
    };
    
</script>

<style lang="scss">
.event-wrapper{
	margin: 10px;
}


</style>
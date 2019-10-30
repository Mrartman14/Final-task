<template>

	<div class="current-event-list-contaiter">
		<router-link to="/current-events/event-create"> + Добавить событие </router-link>
		<router-view/>

		<div class="events-container">
			<event v-for="(item, i) in data" :key="i"
			:dataIndex = i
			class="event-wrapper"/>
		</div>
	</div>

</template>

<script>

	import event from './Event';
	import eventCreate from './EventCreate';//скорее всего не нужен
	import { mapGetters } from 'vuex';

	export default {
		name: 'currentEventList',
		props: {
		},
		computed: {
			...mapGetters([
				'data'
			])
		},
		components: {
			event: event,
			eventCreate: eventCreate
		}
    };
    
</script>

<style lang="scss">
.event-wrapper{
	margin: 10px;
}


</style>
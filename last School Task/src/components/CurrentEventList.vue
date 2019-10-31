<template>

	<div class="current-event-list-contaiter">
		<router-link to="/create-event"> + Добавить событие </router-link>
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
	import { mapGetters } from 'vuex';

	export default {
		name: 'currentEventList',
		data() {
			return {
				dataIndex: 0
			}
		},
		computed: {
			...mapGetters([
				'data'
			])
		},
		components: {
			event: event
		}
    };
    
</script>

<style lang="scss">
	.event-wrapper{
		margin: 10px 0;
		
		&:first-child {
			margin-top: 0;
		}
		&:last-child {
			margin-bottom: 0;
		}
	}
</style>
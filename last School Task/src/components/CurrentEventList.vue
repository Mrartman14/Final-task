<template>

	<div class="current-event-list-contaiter">
		<router-link to="/create-event"> + Добавить событие </router-link>
		<router-view/>

		<div class="events-container">
			<event v-for="(item, i) in data" :key="i"
			:dataIndex = i
			class="event-wrapper"/>
		</div>

		<div class="btn_container">
			<button @click="changePage( (page - 1) )">Пред.стр.</button> <!--добавить валидацию от 1 до numberOfbuttons()-->

			<button v-for="(item, i) in numberOfbuttons()" :key="i" 
			@click="changePage( (i + 1) )">{{ i + 1 }}</button>

			<button @click="changePage( (page + 1) )">Сл.стр.</button>
		</div>
	</div>

</template>

<script>

	import axios from 'axios';
	import event from './Event';
	import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'currentEventList',
		data() {
			return {
				//dataLenght: []
			}
		},
		computed: {
			...mapGetters([
				'data', 'limit', 'fullDataLength', 'page'
			])
		},
		methods: {
			...mapActions([
				'loadData', 'getPageContent', 'changePage', 'getFullDataLength'
			]),
			numberOfbuttons() {
				let partOfData = [];
				partOfData.length = Math.ceil((this.fullDataLength.length + 1) / this.limit);
				return partOfData
			},
		},
		components: {
			event: event
		},
		mounted() {
			//this.loadData();
			this.getPageContent();
			this.getFullDataLength();
			//this.numberOfbuttons();
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

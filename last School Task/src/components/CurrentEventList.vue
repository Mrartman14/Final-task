<template>

	<div class="current-event-list-contaiter">
		<div class="current-event-list-options">
			<router-link to="/create-event"> + Добавить событие </router-link>
			<filterButton />
		</div>	
		<router-view /><!-- А он здесь нужен вообще? -->

		<div class="events-container">
			<event v-for="(item, i) in data" :key="i"
			:dataIndex = i
			class="event-wrapper"/>
		</div>

		<div class="btn_container">
			<!-- <button @click="changePage( (page - 1) )">Пред.стр.</button> 
			добавить валидацию от 1 до numberOfbuttons()
			<button v-for="(item, i) in numberOfbuttons()" :key="i" 
			@click="changePage( (i + 1) )">{{ i + 1 }}</button>

			<button @click="changePage( (page + 1) )">Сл.стр.</button> -->

			<button @click="pagination( (pagee - 1) )">Пред.стр.</button> 
			<!--ADD VALIDATION -->
			<button v-for="(item, i) in numberOfbuttons()" :key="i" 
			@click="pagination( (i + 1) )">{{ i + 1 }}</button>

			<button @click="pagination( (pagee + 1) )">Сл.стр.</button>
		</div>
	</div>

</template>

<script>

	import axios from 'axios';
	import event from './Event';
	import filterButton from './FilterButton';
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
				'data', 'limit', 'fullDataLength', 'page',
				'limitt', 'pagee'
			])
		},
		methods: {
			...mapActions([
				'loadData', 'getPageContent', 'changePage', 'getFullDataLength',
				'createPaginationQuery'
			]),
			pagination(pageNumber) {
				this.createPaginationQuery({
					pagination: `&page=${pageNumber}&limit=${this.limitt}`,
					currentPage: pageNumber
				})
			},







			numberOfbuttons() {
				this.getFullDataLength();
				let partOfData = [];
				partOfData.length = Math.ceil(this.fullDataLength.length / this.limit);
				console.log(this.fullDataLength.length);// everytime must be 6!!!
				return partOfData
			},
		},
		components: {
			event: event,
			filterButton: filterButton
		},
		mounted() {
			//this.loadData();
			this.getPageContent();
			//this.getFullDataLength();
			//this.numberOfbuttons();
		}
	};
</script>

<style lang="scss">
	.current-event-list-options {
		display: flex;
		justify-content: space-between;
	}
	.event-wrapper {
		margin: 10px 0;
		
		&:first-child {
			margin-top: 0;
		}
		&:last-child {
			margin-bottom: 0;
		}
	}
</style>

<template>

	<div class="event-list-contaiter">
		<div class="event-list-options">
			<router-link to="/event-create">
				<button class="event-create__option-button">+ Добавить событие</button>
			</router-link>
			<filterButton />
		</div>

		<div class="events-container"><!-- filteredData -->
			<event v-for="(item, i) in filteredData" :key="i"
			:dataIndex = i
			class="event-wrapper"/>
		</div>

		<div class="page-buttons">
			<pageButtons />
		</div>
	</div>

</template>

<script>

	import { mapGetters, mapActions } from 'vuex';

	import pageButtons from './PageButtons';
	import event from './Event';
	import filterButton from './FilterButton';


	export default {
		name: 'eventList',
		props: {
			sortByDateType: Array
		},
		computed: {
			...mapGetters([
				'data'
			]),
			filteredData() {
				let minDate = new Date();
				minDate.setMonth(minDate.getMonth() + this.sortByDateType[0]);
				let maxDate = new Date();
				maxDate.setMonth(maxDate.getMonth() + this.sortByDateType[1]);
				let filteredData = this.data.filter((event) => {
					return event.dete > minDate.toISOString() && event.dete < maxDate.toISOString() ? true : false
				})
				return filteredData
			}
		},
		methods: {
			...mapActions([
				'getQuery', 'setSortByDate'
			]),
		},
		components: {
			event: event,
			filterButton: filterButton,
			pageButtons: pageButtons
		},
		mounted() {
			this.getQuery();
			//console.log(this.sortByDateType);
		}
	};
</script>

<style lang="scss">
	@import '../helpers/common-styles.scss';
	.event-list-options {
		display: flex;
		justify-content: space-between;
		padding: 20px 0;
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
	.event-create__option-button {
		color: #fff;
		background: $additional-background-button-color;
		padding: 10px 20px;
		border: none;
		border-radius: 20px;
	}
	.page-buttons {
		display: flex;
		justify-content: center;
	}
</style>

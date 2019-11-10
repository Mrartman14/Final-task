<template>

	<div class="event-list-contaiter">
		<div class="event-list-options">
			<router-link to="/event-create">
				<button class="event-create__option-button">+ Добавить событие</button>
			</router-link>
			<FilterButton />
		</div>

		<div class="events-container">
			<Event v-for="(item, i) in filteredData.data" :key="i"
			:item = item
			class="event-wrapper" />
		</div>

		<div class="page-buttons">
			<PageButtons :numOfButtons="numOfButtons"/>
		</div>
	</div>

</template>

<script>

	import { mapGetters, mapActions } from 'vuex';

	import PageButtons from './PageButtons';
	import Event from './Event';
	import FilterButton from './FilterButton';

	export default {
		name: 'EventList',
		props: {
			sortByDateType: Array
		},
		computed: {
			...mapGetters([
				'data', 'contentLimit', 'currentPage'
			]),
			eventsRange() {
				return [this.contentLimit * this.currentPage - (this.contentLimit - 1), this.contentLimit * this.currentPage]
			},
			minDate() {
				let minDate = new Date();
				minDate.setMonth(minDate.getMonth() + this.sortByDateType[0]);
				return minDate
			},
			maxDate() {
				let maxDate = new Date();
				maxDate.setMonth(maxDate.getMonth() + this.sortByDateType[1]);
				return maxDate
			},
			filteredData() {
				let filteredData = this.data.filter((event) => event.dete > this.minDate.toISOString() && event.dete < this.maxDate.toISOString());
				let paginatedData = filteredData.slice((this.contentLimit * this.currentPage) - this.contentLimit, this.contentLimit * this.currentPage);
				if(paginatedData.length === 0 && this.currentPage !== 1) {
					this.setCurrentPage(this.currentPage - 1);
					this.getQuery();
				}
				return { data: paginatedData, fullLength: filteredData.length }
			},
			numOfButtons() {
				return Math.ceil(this.filteredData.fullLength / this.contentLimit);
			}
		},
		methods: {
			...mapActions([
				'getQuery', 'setCurrentPage'
			])
		},
		components: {
			Event,
			FilterButton,
			PageButtons
		},
		mounted() {
			this.getQuery();
		}
	};
</script>

<style lang="scss">

	@import '../helpers/common-styles.scss';

	.event-list-options {
		display: flex;
		justify-content: space-between;
		padding: 15px 0 25px 0;
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
		border: 1px solid $additional-background-button-color;
		border-radius: 20px;
		&:hover {
			opacity: 0.8;
		}
	}
	.page-buttons {
		display: flex;
		justify-content: center;
	}

</style>

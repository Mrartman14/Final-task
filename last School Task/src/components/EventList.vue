<template>

	<div class="event-list-contaiter">
		<div class="event-list-options">
			<router-link to="/event-create">
				<button class="event-create__option-button">+ Добавить событие</button>
			</router-link>
			<filterButton />
		</div>

		<div class="events-container">
			<event v-for="(item, i) in data" :key="i"
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
			eventDateCondition: String//past, current or nearest
		},
		computed: {
			...mapGetters([
				'data', 'page', 'limit', 'fullDataLength'
			])
		},
		methods: {
			...mapActions([
				'createPaginationQuery'
			]),
		},
		components: {
			event: event,
			filterButton: filterButton,
			pageButtons: pageButtons
		},
		mounted() {
			this.createPaginationQuery({ //делает самый первый запрос
				pagination: `&page=${this.page}&limit=${this.limit}`,
				currentPage: this.page,
				requiredData: this.eventDateCondition
			})
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

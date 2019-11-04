<template>

	<div class="event">
		<div class="event__heading">
			<router-link :to="{ 
				name: 'eventInfo',
				params: {
					id: data[dataIndex].title,
					dataIndex: dataIndex
				}
			}">
				<h1 class="event__title">{{ data[dataIndex].title }}</h1> 
			</router-link>
			<button class="event__delete" @click="deleteEvent( {id: data[dataIndex].id} )">Удалить</button>
		</div>
		<p class="event__description">{{ data[dataIndex].description }}</p>
		<div class="event__info">
			<span class="event__date">Дата публикации: {{ validDate(data[dataIndex].dete) }}</span>
			<span class="event__comments">Комментарии: {{ data[dataIndex].comments.length }}</span>
		</div>
	</div>

</template>

<script>

	import { validDate } from '../helpers/validDate';
	import axios from 'axios';
	import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'Event',
		props: {
			dataIndex: Number
		},
		computed: {
			...mapGetters([
				'data'
			]),
		},
		methods: {
			...mapActions([
				'deleteEvent'
			]),
			validDate(date) {
				return validDate(date);
			}
		}
	};
	
</script>

<style lang="scss">
@import '../helpers/common-styles.scss';
	.event{
		box-shadow: $box-shadow;
		border-radius: 5px;
		padding: 15px;
		&__heading {
			display: flex;
			justify-content: space-between;
			padding-bottom: 20px;
		}
		&__title {
			font-weight: bold;
		}
		&__info {
			display: flex;
			justify-content: space-between;
			color: $secondary-font-color;
			padding-top: 20px;
		}
		&__description {
			padding: 0;
		}
		&__delete {
			background: none;
			border: none;
			color: $delete-color;
		}
	}
</style>
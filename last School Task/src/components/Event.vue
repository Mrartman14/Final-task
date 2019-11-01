<template>

	<div class="event">
		<div class="event__heading">
				<router-link :to="/events/ + (dataIndex + 1)">
					<h1 class="event__title">{{ data[dataIndex].title }}</h1> 
				</router-link>
			<button class="event__delete" @click="deleteEvent( {id: data[dataIndex].id} )">Удалить</button>
		</div>
		<p class="event__description">{{ data[dataIndex].description }}</p>
		<div class="event__info">
			<span class="event__date">Дата публикации: {{ data[dataIndex].dete }}</span>
			<span class="event__comments">Комментарии: {{ data[dataIndex].comments.length }}</span>
		</div>
	</div>

</template>

<script>

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
			])
		}
	};
	
</script>

<style lang="scss">
.event{
	box-shadow: 0px 0px 2px 0px rgba(50, 50, 50, 0.41);
	border-radius: 5px;
	padding: 10px;
	&__heading {
		display: flex;
		justify-content: space-between;
	}
	&__title {
		font-weight: bold;
	}
	&__info {
		display: flex;
		justify-content: space-between;
	}
}



</style>
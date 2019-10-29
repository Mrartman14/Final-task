<template>

	<div class="event">
		<div class="event__heading">
			<h1 class="event__title">{{ data[dataIndex].title }}</h1>
			<button class="event__delete" @click="deleteEvent( {id: data[dataIndex].id, number: dataIndex} )">Удалить</button>
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
		data() {
			return {

			}
		},
		computed: {
			...mapGetters([
				'data', 'comments'
			])
		},
		methods: {
			...mapActions([
				'loadData', 'deleteEvent'
			])
		}
	};
	
</script>

<style lang="scss">
.event{
	box-shadow: 0px 0px 2px 0px rgba(50, 50, 50, 0.41);
	border-radius: 5px;
	padding: 5px;
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
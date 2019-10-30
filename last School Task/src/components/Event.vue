<template>

	<div class="event">
		<div class="event__heading">
			<h1 class="event__title">
				<!-- <router-link to="/events/:id"> -->
					{{ data[dataIndex].title }}
				<!-- </router-link> -->
			</h1>
			<!-- <button @click="showId(data[dataIndex].id)">show id</button> -->
			<button @click="goToInfo(data[dataIndex].id)">goToinfo</button>
			<button class="event__delete" @click="deleteEvent( {id: data[dataIndex].id, number: dataIndex} )">Удалить</button>
		</div>
		<p class="event__description">{{ data[dataIndex].description }}</p>
		<div class="event__info">
			<span class="event__date">Дата публикации: {{ data[dataIndex].dete }}</span>
			<span class="event__comments">Комментарии: {{ data[dataIndex].comments.length }}</span>
		</div>

		<!-- <eventInfo :dataIndex="dataIndex" />  -->
		<!--UBRAT -->

	</div>

</template>

<script>

	import eventInfo from './EventInfo';//ubrat
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
			showId(test){
				console.log(test);//test
			},
			goToInfo(id) {// new test
				this.$router.push('/events/'+ id);
			}
		},
		components: {
			eventInfo: eventInfo//ubrat
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
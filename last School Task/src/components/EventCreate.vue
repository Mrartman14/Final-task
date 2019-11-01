<template>

	<div class="create-event">
		<h1 class="create-event__heading">Создание мероприятия</h1>
		<router-link to="/current-events">Назад</router-link>
		<div class="create-event__title">
			<p>Заголовок:</p>
			<input type="text" v-model ="title" placeholder="Введите название мероприятия">
		</div>
		<div class="create-event__description">
			<p>Описание:</p>
			<input type="text" v-model ="description" placeholder="Опишите Ваше мероприятие">
		</div>
		<div class="create-event__submit">
			<p>Дата</p>
			<button @click="createEvent()"> test {{  }} </button>
			<!-- в кнопке текущая дата связанная v-model с event.dete -->
		</div>
	</div>

</template>

<script>

	import axios from 'axios';
	import { mapActions } from 'vuex';

	export default {
		name: 'CreateEvent',
		props: {

		},
		data() {
			return {
				title: '',
				description: '',
			}
		},
		computed: {

		},
		methods: {
			...mapActions([
				'addEvent'
			]),
			createEvent() {
				let newEvent = {
					//dete: - выводить текущую дату
					title: this.title,
					description: this.description,
					important: true,
					comments: [], //не работает как надо
					user: {}, //не работает как надо
				};
				this.addEvent(newEvent);
				this.$router.go(-1);
			}
		}
	};
	
</script>

<style lang="scss">

</style>
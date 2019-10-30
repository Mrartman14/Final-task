<template>
	<div class="event-info-wrapper">
		<button>Вернуться к списку</button>

		<div class="event">
			<div class="event__heading">
				<h1 class="event__title">{{ data[dataIndex].title }}</h1>
				<span class="event__date">Дата публикации:{{ data[dataIndex].dete }}</span>
			</div>	
			<div class="event__info">	
				<p class="event__description">{{ data[dataIndex].description }}</p>
			</div>
		</div>

		<h2>Комментарии:</h2>
		<eventComment 
		v-for="(comment, commentIndex) in data[dataIndex].comments" 
		:key="commentIndex"
		:commentIndex="commentIndex"
		:dataIndex="dataIndex"/>

	</div>

</template>

<script>

	import { mapGetters } from 'vuex';
	import eventComment from './EventComment';

	//КАЖДОМУ ТАКОМУ ЭЛЕМЕНТУ НУЖЕН ID : data[dataIndex].id ЧТОБЫ НАЗНАЧИТЬ КАЖДОМУ ТАКОМУ ЭЛЕМЕНТУ СВОЙ РОУТ

	export default {
		name: 'EventInfo',
		props: {
			dataIndex: Number
		},
		data() {
			return {
				id: '' //НАВЕРНОЕ СЮДА? ХЗ
			}
		},
		computed: {
			...mapGetters([
				'data'
			]),
		},
		components: {
			eventComment: eventComment
		}
	};

</script>

<style lang="scss">

</style>
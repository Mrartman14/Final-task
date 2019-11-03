<template>

	<div class="event-info-wrapper">
		<div class="event__back-btn-wrapper">
			<button @click="goBack()" class="event__back-btn">Вернуться к списку</button>
		</div>	
		<div class="event">
			<div class="event__heading">
				<h1 class="event__title">{{ data[id].title }}</h1>
				<span class="event__date">Дата публикации: {{ data[id].dete }}</span>
			</div>	
			<div class="event__info">	
				<p class="event__text">{{ data[id].description }}</p>
			</div>
		</div>
		<h2 class="event__comments-title">Комментарии:</h2>
		<eventComment v-for="(comment, commentIndex) in data[id].comments" 
		:key="commentIndex"
		:commentIndex="commentIndex"
		:dataIndex="id"/>
	</div>

</template>

<script>

	import { mapGetters } from 'vuex';
	import eventComment from './EventComment';

	export default {
		name: 'EventInfo',
		computed: {
			...mapGetters([
				'data'
			]),
			id() {
				return this.$route.params.id - 1
			}
		},
		components: {
			eventComment: eventComment
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			}
		}
	};

</script>

<style lang="scss">
	.event__text {
		padding-top: 25px;
	}
	.event__comments-title {
		padding-top: 35px;
		font-size: 1.3em;
		font-weight: bold;
	}

</style>
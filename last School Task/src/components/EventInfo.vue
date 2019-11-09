<template>

	<div class="event-info-wrapper">
		<div class="event__back-btn-wrapper">
			<button @click="goBack()" class="event__back-btn">Вернуться к списку</button>
		</div>	
		<div class="event">
			<div class="event__heading">
				<h1 class="event__title">{{ item.title }}</h1>
				<span class="event__date">Дата публикации: {{ validDate(item.dete) }}</span>
			</div>	
			<div class="event__info">	
				<p class="event__text">{{ item.description }}</p>
			</div>
		</div>
		<h2 class="event__comments-title">Комментарии:</h2>
		<eventComment v-for="(comment, commentIndex) in item.comments" 
		:key="commentIndex"
		:commentIndex="commentIndex"
		:item="item"/>
	</div>

</template>

<script>

	import { validDate } from '../helpers/validDate';
	import { mapGetters } from 'vuex';
	import eventComment from './EventComment';

	export default {
		name: 'eventInfo',
		props: {
			item: Object
		},
		computed: {
			...mapGetters([
				'data'
			])
		},
		components: {
			eventComment: eventComment
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			validDate(date) {
				return validDate(date);
			}

		}
	};

</script>

<style lang="scss">
@import '../helpers/common-styles.scss';
	.event__text {
		color: $primary-font-color;
	}
	.event__date {
		color: $secondary-font-color;
	}
	.event__comments-title {
		padding-top: 35px;
		font-size: 1.3em;
		font-weight: bold;
	}

</style>
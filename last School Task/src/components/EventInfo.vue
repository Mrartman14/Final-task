<template>

	<div class="event-info-wrapper" v-if="eventExist">
		<div class="event__back-btn-wrapper">
			<button @click="goBack()" class="event__back-btn">Вернуться к списку</button>
		</div>	
		<div class="event">
			<div class="event__heading">
				<h1 class="event__title">{{ currentEvent.title }}</h1>
				<span class="event__date">Дата публикации: {{ validDate(currentEvent.dete) }}</span>
			</div>	
			<div class="event__info">	
				<p class="event__text">{{ currentEvent.description }}</p>
			</div>
		</div>
		<h2 class="event__comments-title">Комментарии:</h2>
		<EventComment v-for="(comment, commentIndex) in currentEvent.comments" 
		:key="commentIndex"
		:commentIndex="commentIndex"
		:item="currentEvent"/>
	</div>

</template>

<script>

	import { validDate } from '../helpers/validDate';
	import { mapGetters, mapActions } from 'vuex';
	import EventComment from './EventComment';

	export default {
		name: 'EventInfo',
		computed: {
			...mapGetters([
				'data'
			]),
			currentEvent() {
				return this.data.filter(event => event.title === this.$route.params.id)[0];
			},
			eventExist() {
				return this.currentEvent === undefined ? false : true
			}
		},
		components: {
			EventComment
		},
		methods: {
			...mapActions([
				'getQuery'
			]),
			goBack() {
				this.$router.go(-1);
			},
			validDate(date) {
				return validDate(date);
			}
		},
		async mounted() {
			await this.getQuery();
		}
	};

</script>

<style lang="scss">

	@import '../helpers/common-styles.scss';

	.event {
		box-shadow: $box-shadow;
		border-radius: 5px;
		padding: 15px;
		&__text {
			color: $primary-font-color;
		}
		&__date {
			color: $secondary-font-color;
		}
		&__comments-title {
			padding-top: 35px;
			font-size: 1.3em;
			font-weight: bold;
		}
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
	}

</style>
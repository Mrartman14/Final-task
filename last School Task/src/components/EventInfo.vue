<template>

	<!-- <div class="event-info-wrapper">
		<button @click="goBack()" class="event__back-btn">Вернуться к списку</button>
		<div class="event">
			<div class="event__heading">
				<h1 class="event__title">{{ data[dataId].title }}</h1>
				<span class="event__date">Дата публикации:{{ data[dataId].dete }}</span>
			</div>	
			<div class="event__info">	
				<p class="event__description">{{ data[dataId].description }}</p>
			</div>
		</div> -->
	<div class="event-info-wrapper">
		<button @click="goBack()" class="event__back-btn">Вернуться к списку</button>
		<div class="event">
			<h1> this.$route.params.id : {{this.$route.params.id}} </h1>
			<div class="event__heading">
				<h1 class="event__title">{{ data[(this.$route.params.id) - 1].title }}</h1>
				<span class="event__date">Дата публикации:{{ data[(this.$route.params.id) - 1].dete }}</span>
			</div>	
			<div class="event__info">	
				<p class="event__description">{{ data[(this.$route.params.id) - 1].description }}</p>
			</div>
		</div>

		<!-- <h2 class="event__title">Комментарии:</h2>
		<eventComment 
		v-for="(comment, commentIndex) in data[dataId].comments" 
		:key="commentIndex"
		:commentIndex="commentIndex"/> -->
		<h2 class="event__title">Комментарии:</h2>
		<eventComment 
		v-for="(comment, commentIndex) in data[(this.$route.params.id) - 1].comments" 
		:key="commentIndex"
		:commentIndex="commentIndex"
		:id="id"/>
	</div>

</template>

<script>

	import { mapGetters } from 'vuex';
	import eventComment from './EventComment';

	export default {
		name: 'EventInfo',
		data() {
			return {
				id: this.$route.params.id - 1
			}
		},
		computed: {
			...mapGetters([
				'data', 'dataId'
			])
		},
		components: {
			eventComment: eventComment
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			}
		},
		mounted() {
			//this.$route.params.id = this.dataId;
		}
	};

</script>

<style lang="scss">


	.event__back-btn {
		background: none;
		border: none;
		padding: 0;
	}

</style>
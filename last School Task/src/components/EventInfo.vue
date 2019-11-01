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
			<div class="event__heading">
				<h1 class="event__title">{{ data[id].title }}</h1>
				<span class="event__date">Дата публикации:{{ data[id].dete }}</span>
			</div>	
			<div class="event__info">	
				<p class="event__description">{{ data[id].description }}</p>
			</div>
		</div>

		<!-- <h2 class="event__title">Комментарии:</h2>
		<eventComment 
		v-for="(comment, commentIndex) in data[dataId].comments" 
		:key="commentIndex"
		:commentIndex="commentIndex"/> -->
		<h2 class="event__title">Комментарии:</h2>
		<eventComment 
		v-for="(comment, commentIndex) in data[id].comments" 
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
		data() {
			return {
				//id: this.$route.params.id - 1
			}
		},
		computed: {
			...mapGetters([
				'data'//, 'dataId'
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
		},
		mounted() {
			//this.$route.params.id = this.dataId;
			//console.log(this.$route.params.id);
			//this.id = this.$route.params.id - 1;
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
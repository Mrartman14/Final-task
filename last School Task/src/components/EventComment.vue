<template>

	<!-- <div class="event__comment-wrapper">
		<div class="event__comment__info">
			<div class="event__comment__author">
				<div class="event__comment__author__avatar">
					<img :src="data[dataId].comments[commentIndex].avatar">
				</div>
				{{ data[dataId].comments[commentIndex].name }}
			</div>
			<div class="event__comment__date">{{ data[dataId].comments[commentIndex].date }}</div>
		</div>
		<p class="event__comment__text">{{ data[dataId].comments[commentIndex].text }}</p>
		<button class="event__comment__delete">Удалить</button>
	</div> -->
		<div class="event__comment-wrapper">
		<div class="event__comment__info">
			<div class="event__comment__author">
				<div class="event__comment__author__avatar">
					<img :src="data[id].comments[commentIndex].avatar">
				</div>
				{{ data[id].comments[commentIndex].name }}
			</div>
			<div class="event__comment__date">{{ data[id].comments[commentIndex].date }}</div>
		</div>
		<p class="event__comment__text">{{ data[id].comments[commentIndex].text }}</p>
		<button class="event__comment__delete">Удалить</button>
	</div>

</template>

<script>

	import { mapGetters } from 'vuex';

	export default {
		name: 'EventComment',
		props: {
			id: Number, //назвать по-нормальному
			commentIndex: Number
		},
		computed: {
			...mapGetters([
				'data', 'dataId'
			])
		},
		methods: {
			toLocalString(){
				//сделац
			}
		}
	};

</script>

<style lang="scss">
	.event__comment-wrapper {
		border: 1px solid #000;
		margin: 20px 10px;
	}
	.event__comment__info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 10px 0;
	}
	.event__comment__author {
		display: flex;
		align-items: center;
		color: #8f8f8f;
		&__avatar {
			width: 100px;
			height: 100px;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 20px;
		}
	}
	.event__comment__delete {
		background: none;
		border: none;
		padding: 0;
		color: #ff0000;
	}
</style>
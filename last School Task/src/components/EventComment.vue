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
					<img :src="data[dataIndex].comments[commentIndex].avatar">
				</div>
				{{ data[dataIndex].comments[commentIndex].name }}
			</div>
			<div class="event__comment__date">{{ data[dataIndex].comments[commentIndex].date }}</div>
		</div>
		<p class="event__comment__text">{{ data[dataIndex].comments[commentIndex].text }}</p>
		<!-- <button 
		@click="deleteComment({
			id: data[dataIndex].id,
			index: dataIndex,
			commentId: data[dataIndex].comments[commentIndex].id,
			commentIndex: commentIndex
			})"
		class="event__comment__delete">Удалить</button> -->
		<button 
		@click="deleteComment( {id: data[dataIndex].id, commentId: data[dataIndex].comments[commentIndex].id,} )"
		class="event__comment__delete">Удалить</button>
	</div>

</template>

<script>

	import { mapGetters, mapActions } from 'vuex';
	import axios from 'axios';

	export default {
		name: 'EventComment',
		props: {
			dataIndex: Number,
			commentIndex: Number
		},
		computed: {
			...mapGetters([
				'data', 'dataId'
			])
		},
		methods: {
			...mapActions([
				'deleteComment'
			]),
			toLocalString(){
				//сделац
			}
		},
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
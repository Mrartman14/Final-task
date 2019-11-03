<template>

	<div class="event__comment">
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
		<div class="event__comment__delete-wrapper">
			<button @click="deleteComment({
				id: data[dataIndex].id, 
				commentId: data[dataIndex].comments[commentIndex].id,})"
			class="event__comment__delete">Удалить</button>
		</div>	
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
				'data'
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
	.event__comment {
		border: 1px solid #000;
		margin: 20px 0;
		padding: 15px;
		&__info {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		&__author {
			display: flex;
			align-items: center;
			color: #8f8f8f; //$link-color
			&__avatar {
				width: 45px;
				height: 45px;
				border-radius: 50%;
				border: 1px solid #000;
				overflow: hidden;
				margin-right: 20px;
			}
		}
		&__text {
			padding: 25px 0 10px 0;
		}
		&__delete {
			background: none;
			border: none;
			padding: 0;
			color: #ff0000;
		}
	}
	.event__comment__delete-wrapper {
		display: flex;
		justify-content: flex-end;
	}
</style>
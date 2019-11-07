<template>

	<div class="event__comment">
		<div class="event__comment__info">
			<div class="event__comment__author">
				<div class="event__comment__author__avatar-wrapper">
					<a href="">
						<img :src="data[dataIndex].comments[commentIndex].avatar"
							class="event__comment__author__avatar">
					</a>	 
				</div>
				<a href="" class="event__comment__author__name">
					{{ data[dataIndex].comments[commentIndex].name }}
				</a>
			</div>
			<div class="event__comment__date">{{ validDate(data[dataIndex].comments[commentIndex].date) }}</div>
		</div>
		<p class="event__comment__text">{{ data[dataIndex].comments[commentIndex].text }}</p>
		<div class="event__comment__delete-wrapper">
			<button
			@click="deleteQuery(`${defaultQuery}/${data[dataIndex].id}/comments/${data[dataIndex].comments[commentIndex].id}`)"
			class="event__comment__delete">
				Удалить
			</button>
		</div>	
	</div>

</template>

<script>

	import { validDate } from '../helpers/validDate';
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
				'data', 'defaultQuery'
			])
		},
		methods: {
			...mapActions([
				'deleteQuery'
			]),
			validDate(date) {
				return validDate(date);
			}
		},
	};

</script>

<style lang="scss">
@import '../helpers/common-styles.scss';
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
			&__name {
				color: $secondary-font-color;
			}
			&__avatar {
				height: 100%;
				width: 100%;
				&-wrapper{
					width: 50px;
					height: 50px;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 20px;
				}
			}
		}
		&__text {
			padding: 25px 0 10px 0;
		}
		&__date {
			color: $secondary-font-color;
		}
		&__delete {
			background: none;
			border: none;
			padding: 0;
			color: $delete-color;
		}
	}
	.event__comment__delete-wrapper {
		display: flex;
		justify-content: flex-end;
	}
</style>
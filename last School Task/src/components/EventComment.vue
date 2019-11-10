<template>

	<div class="event__comment">
		<div class="event__comment__info">
			<div class="event__comment__author">
				<div class="event__comment__author__avatar-wrapper">
						<img :src="item.comments[commentIndex].avatar"
							class="event__comment__author__avatar">	 
				</div>
				<span class="event__comment__author__name">
					{{ item.comments[commentIndex].name }}
				</span>
			</div>
			<div class="event__comment__date">{{ validDate(item.comments[commentIndex].date) }}</div>
		</div>
		<p class="event__comment__text">{{ item.comments[commentIndex].text }}</p>
		<div class="event__comment__delete-wrapper">
			<button
			@click="deleteQuery(`${defaultQuery}/${item.id}/comments/${item.comments[commentIndex].id}`)"
			class="event__comment__delete">
				Удалить
			</button>
		</div>	
	</div>

</template>

<script>

	import { validDate } from '../helpers/validDate';
	import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'EventComment',
		props: {
			commentIndex: Number,
			item: Object
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
		}
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
				cursor: pointer;
				&:hover {
					color: $primary-font-color;
				} 
			}
			&__avatar {
				height: 100%;
				width: 100%;
				cursor: pointer;
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
			&:hover {
				opacity: 0.7;
			}
		}
	}
	.event__comment__delete-wrapper {
		display: flex;
		justify-content: flex-end;
	}

</style>
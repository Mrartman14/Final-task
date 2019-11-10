<template>

	<div class="event">
		<div class="event__heading">
			<router-link :to="{ 
				name: 'eventInfo',
				params: {
					id: item.title
				}
			}" class="event__link">
				<h1 class="event__title">{{ item.title }}</h1>
			</router-link>

			<button class="event__delete"
			@click="deleteQuery(`${defaultQuery}/${item.id}`)">
				Удалить
			</button>
		</div>
		<p class="event__description">{{ item.description }}</p>
		<div class="event__info">
			<span class="event__date">Дата публикации: {{ validDate(item.dete) }}</span>
			<span class="event__comments">Комментарии: {{ item.comments.length }}</span>
		</div>
	</div>

</template>

<script>

	import { validDate } from '../helpers/validDate';
	import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'Event',
		props: {
			item: Object
		},
		computed: {
			...mapGetters([
				'data', 'defaultQuery'
			]),
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

	.event{
		box-shadow: $box-shadow;
		border-radius: 5px;
		padding: 15px;
		&__heading {
			display: flex;
			justify-content: space-between;
			padding-bottom: 20px;
		}
		&__link:hover {
			.event__title {
				opacity: 0.6;
			}
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
		&__description {
			padding: 0;
		}
		&__delete {
			background: none;
			border: none;
			color: $delete-color;
			&:hover {
				opacity: 0.7;
			}
		}
	}

</style>
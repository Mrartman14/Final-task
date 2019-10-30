<template>

	<div class="event__comment-wrapper">
		<div class="event__comment__info">
			<div class="event__comment__author">
				<div class="event__comment__author__avatar">
					ava 
				</div>
				{{ data[dataIndex].comments[commentIndex].name }}
			</div>
			<div class="event__comment__date">{{ data[dataIndex].comments[commentIndex].date }}</div>
		</div>
		<p class="event__comment__text">{{ data[dataIndex].comments[commentIndex].text }}</p>
		<div class="event__comment__delete">
			<button>Удалить</button>
		</div>
		

	</div>

</template>

<script>

	import { mapGetters } from 'vuex';

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
			toLocalString(){
				//сделац
			}
		}
	};

</script>

<style lang="scss">
	.event__comment-wrapper {
		border: 1px solid #ff0000;
	}
	.event__comment__info {
		display: flex;
		justify-content: space-between;
	}
	.event__comment__author {
		display: flex;
	}
</style>
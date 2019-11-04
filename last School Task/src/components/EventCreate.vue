<template>

	<div class="create-event">
		<div class="event__back-btn-wrapper">
			<button @click="goBack()" class="event__back-btn">Назад</button>
		</div>

		<h1 class="create-event__heading">Создание мероприятия</h1>

		<div class="create-event__title">
			<span class="create-event__input__heading">Заголовок:</span>
			<input type="text"
			v-model ="title"
			class="create-event__input-head" 
			placeholder="Введите название мероприятия">
		</div>

		<div class="create-event__description">
			<span class="create-event__input__heading">Описание:</span>
			<label for="create-event__input-description" class="create-event__input-description__label">
				<div class="create-event__input-desc-wrapper">
					<input type="text"
					v-model ="description"
					class="create-event__input-desc"
					id="create-event__input-description"
					placeholder="Опишите Ваше мероприятие">
				</div>	
			</label>
		</div>

		<div class="create-event__submit">
			<span class="create-event__input__heading">Дата</span>
			<button 
			@click="createEvent()"
			class="create-event__submit__input">
				test {{  }}
			</button>
			<!-- в кнопке текущая дата связанная v-model с event.dete -->
		</div>
	</div>

</template>

<script>

	import { mapActions } from 'vuex';

	export default {
		name: 'CreateEvent',
		data() {
			return {
				title: '',
				description: '',
			}
		},
		methods: {
			...mapActions([
				'addEvent'
			]),
			createEvent() {
				let newEvent = {
					//dete: - выводить текущую дату
					title: this.title,
					description: this.description,
					important: true,
					comments: [], //не работает как надо
					user: {}, //не работает как надо
				};
				this.addEvent(newEvent);
				this.$router.go(-1);
			},
			goBack() {
				this.$router.go(-1);
			}
		}
	};
	
</script>

<style lang="scss">
@import '../helpers/common-styles.scss';
	
	.create-event{
		&__heading {
			font-size: 1.3em;
			font-weight: bold;
			padding-bottom: 20px;
		}
		&__title {
			display: flex;
			flex-direction: column;
			align-items: stretch;
		}
		&__description {
			display: flex;
			flex-direction: column;
			align-items: stretch;
		}	
		&__input__heading {
			display: block;
			padding: 10px 0;
			font-weight: bold;
			font-size: 1.1em;
		}
		&__input {
			&-head {
				padding-left: 15px;
				height: 30px;
				box-shadow: $box-shadow;
				padding: 5px 0 5px 10px;
				border: none;
				border-radius: 8px;
				background: none;
			}
			&-desc {
				border: none;
				width: calc(100% - 10px);
				&-wrapper {
					height: 100px;
					box-shadow: $box-shadow;
					border-radius: 8px;
					padding: 10px;
				}
			}
			&-description__label {
				cursor: text;
			}
		}
		&__submit {
			padding: 10px 0;
			&__input {
				margin-top: 5px;
				box-shadow: $box-shadow;
				padding: 5px 10px;
				border: none;
				border-radius: 8px;
				background: none;
				color: $secondary-font-color;
			}
		}
	}

</style>
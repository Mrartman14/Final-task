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
			class="create-event__input create-event__input-head" 
			placeholder="Введите название мероприятия">
		</div>

		<div class="create-event__description">
			<span class="create-event__input__heading">Описание:</span>
			<input type="text"
			v-model ="description"
			class="create-event__input create-event__input-desc"
			placeholder="Опишите Ваше мероприятие">
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
	.event__back-btn {
		position: relative;
		background: none;
		border: none;
		padding: 0;
		color: #8f8f8f; //$link-color
		&-wrapper {
			padding: 20px 0 30px 27px;
		}
		&:before {
			content: '<';
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 0.7em;
			color: #8f8f8f; //$link-color 
			position: absolute;
			width: 16px;
			height: 16px;
			box-shadow: 0px 0px 4px 0px rgba(50, 50, 50, 0.41);//$box-shadow
			border: 0.5px solid #8f8f8f;
			border-radius: 50%;
			top: 0;
			left: -27px;
		}
	}

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
			box-shadow: 0px 0px 4px 0px rgba(50, 50, 50, 0.41);//$box-shadow
			padding: 5px;
			border: none;
			border-radius: 8px;
			background: none;
			&-head {
				padding-left: 15px;
				height: 30px;
			}
			&-desc {
				height: 100px;
				padding-left: 15px;
				// display: flex;
				// flex-direction: column;
				// justify-content: flex-start;
			}	
		}

		&__submit {
			padding: 10px 0;
			&__input {
				margin-top: 5px;
				box-shadow: 0px 0px 4px 0px rgba(50, 50, 50, 0.41);//$box-shadow
				padding: 5px 10px;
				border: none;
				border-radius: 8px;
				background: none;
				color: #8f8f8f; //$link-color 
			}
		}
	}



</style>
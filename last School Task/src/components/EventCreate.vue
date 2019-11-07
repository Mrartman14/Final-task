<template>

	<div class="event-create">
		<div class="event__back-btn-wrapper">
			<button @click="goBack()" class="event__back-btn">Назад</button>
		</div>

		<h1 class="event-create__heading">Создание мероприятия</h1>

		<div class="event-create__title">
			<span class="event-create__input__heading">Заголовок:</span>
			<input type="text"
			v-model ="title"
			class="event-create__input-head" 
			placeholder="Введите название мероприятия">
		</div>

		<div class="event-create__description">
			<span class="event-create__input__heading">Описание:</span>
			<label for="event-create__input-description" class="event-create__input-description__label">
				<div class="event-create__input-desc-wrapper">
					<input type="text"
					v-model ="description"
					class="event-create__input-desc"
					id="event-create__input-description"
					placeholder="Опишите Ваше мероприятие">
				</div>	
			</label>
		</div>

		<div class="event-create__submit">
			<span class="event-create__input__heading">Дата</span>
			<input type="text"
			v-model ="date"
			class="event-create__input-date"
			:placeholder="dateNow"
			@keyup.enter="dateValidation()"
			>
			<span :class="alarmClass"> {{ alarm }} </span>
		</div>
	</div>

</template>

<script>

	import { mapActions, mapGetters } from 'vuex';

	export default {
		name: 'eventCreate',
		data() {
			return {
				title: '',
				description: '',
				date: '',
				dateNow: new Date().toLocaleString('ru', {day: 'numeric', month: 'numeric', year: 'numeric'}),
				alarm: '',
				alarmClass: ''
			}
		},
		computed: {
			...mapGetters([
				'defaultQuery'
			])
		},
		methods: {
			...mapActions([
				'postQuery'
			]),
			createEvent() {
				let newEvent = {
					//dete: new Date(this.date).toISOString(), //2019-12-19T23:20:02.356Z
					title: this.title,
					description: this.description,
					//important: true,
					comments: [],
					user: {},
				};
				this.postQuery({ query: this.defaultQuery, value: newEvent});
				//console.log(newEvent);
			},
			dateValidation() {
				let valid = this.date.match(/([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})/);
				if(valid !== null) {
					this.date = `${valid[2]}.${valid[1]}.${valid[3]}`;
					this.createEvent(); //может часть из этого можно перенести в computed?
					this.date = ''; this.title = ''; this.description = '';
					this.alarm = 'Ваше событие успешно создано';
					this.alarmClass = 'event-create__input-date__alarm-complited';
				} else {
					this.alarmClass = 'event-create__input-date__alarm-failed';
					this.alarm = `Введите дату формата ${this.dateNow}`;
				}
			},
			goBack() {
				this.$router.go(-1);
			}
		}
	};
	
</script>

<style lang="scss">
@import '../helpers/common-styles.scss';
	
	.event-create{
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
			&-date {
				box-shadow: $box-shadow;
				padding: 10px 5px 10px 18px;
				border: none;
				border-radius: 8px;
				background: none;
				width: 100px;
				&__alarm-complited {
					color: $additional-background-button-color;
				}
				&__alarm-failed {
					padding-left: 10px;
					color: $delete-color;
				}
				&::placeholder {
					color: $secondary-font-color;
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
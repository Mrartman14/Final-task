<template>

	<div class="nav-wrapper">
		<nav class="navigation">
			<div class="navigation__link-container">
				<!-- <router-link :to="{ 
					path: '/events/past',
					/*params: {
						eventDateCondition: '123'
					}*/
				}"
				class="navigation__link">
					Прошедшие 
				</router-link>
				<router-link :to="{ 
					path: '/events/current',
					/*params: {
						eventDateCondition: '456'
					}*/
				}"
				class="navigation__link">
					Текущие
				</router-link>
				<router-link :to="{ 
					path: '/events/nearest',
					/*params: {
						eventDateCondition: '789'
					}*/
				}"
				class="navigation__link">
					Ближайшие
				</router-link> -->
				<button @click="click(0)" :class="selected[index[0]]">
					<router-link to='/events/past'    >Прошедшие</router-link>
				</button>

				<button @click="click(1)" :class="selected[index[1]]">
					<router-link to='/events/current' >Текущие</router-link>
				</button>

				<button @click="click(2)" :class="selected[index[2]]">
					<router-link to='/events/nearest' >Ближайшие</router-link>
				</button>
			</div>
			<search />
		</nav>
	</div>

</template>

<script>

	import search from './Search';

	export default {
		name: 'Navigation',
		data() {
			return {
				selected: ['navigation__link', 'navigation__link navigation__link-selected'],
				index: [0, 1, 0]
			}
		},
		methods: {
			click(i) {
				this.index = this.index.map((i) => i = 0);
				this.index[i] = 1;
			}
		},
		components: {
			search
		}
	}

</script>

<style lang="scss">
@import '../helpers/common-styles.scss';
	.nav-wrapper {
		min-width: 500px;
		max-width: 1000px;
		margin: 0 auto;
	}
	.navigation {
		display: flex;
		justify-content: space-between;
		&__link {
			padding: 10px;
			border: none;
			background: none;
			&:hover {
				a{
					color: $secondary-font-color;
				}
			}
			&-selected {
				background: #f0eeee;
			}
			&-container {
				display: flex;
				align-items: stretch;
			}
		}
	}
</style>

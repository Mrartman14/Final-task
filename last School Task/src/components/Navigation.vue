<template>

	<div class="nav-wrapper">
		<nav class="navigation">
			<div class="navigation__link-container">
				<button v-for="(button, i) in routes" :key="i" @click="activate(i)" :class="selected[index[i]]">
					{{ routes[i][1] }}
				</button>	
			</div>
			<Search />
		</nav>
	</div>

</template>

<script>

	import Search from './Search';

	export default {
		name: 'Navigation',
		data() {
			return {
				selected: ['navigation__link', 'navigation__link navigation__link-selected'],
				routes: [['past', 'Прошедшие'], ['current', 'Текущие'], ['nearest', 'Ближайшие']],
				index: []
			}
		},
		methods: {
			activate(i) {
				this.index = this.index.map((i) => i = 0);
				this.index[i] = 1;
				this.$router.push(`/events/${this.routes[i][0]}`);
			}
		},
		mounted() {
			switch (this.$route.fullPath) {
				case '/events/past': this.index = [1, 0, 0]; break;
				case '/events/current': this.index = [0, 1, 0]; break;
				case '/events/nearest': this.index = [0, 0, 1]; break;
			}
		},
		components: {
			Search
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
			height: 40px;
			width: 120px;
			border: none;
			background: none;
			&:hover {
				color: $secondary-font-color;
			}
			&-selected {
				background: #f0eeee;
				&:hover {
					color: $primary-font-color;
				}
			}
			&-container {
				display: flex;
				align-items: stretch;
			}
		}
	}

</style>

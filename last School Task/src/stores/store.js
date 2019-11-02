import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex, axios);

let store = new Vuex.Store({
	state: {
		data: [],
		fullDataLength: [],
		page: 1,
		limit: 5,
		defaultQuery: 'http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events',
		buildQuery: '',
		queryParams: {
			page: 1,
			limit: 3,
			search: `?search=`,
			sort: `&sortBy=dete&order=desc`,
			pagination: `&page=&limit=`,
		}
	},
	getters: {
		data: state => state.data,
		fullDataLength: state => state.fullDataLength,
		page: state => state.page,
		limit: state => state.limit,
		defaultQuery: state => state.defaultQuery,//скорее всего он не нужен
		buildQuery: state => state.buildQuery,
		limitt: state => state.queryParams.limit,
		pagee: state => state.queryParams.page
	},
	mutations: {
		SET_DATA(state, response) {
			state.data = response;
		},
		BUILD_NEW_QUERY(state) {
			state.buildQuery = `${state.defaultQuery}` + `${state.queryParams.search}` + `${state.queryParams.sort}` + `${state.queryParams.pagination}`;
		},
		CREATE_SEARCH_QUERY(state, queryParams) {
			state.queryParams.search = queryParams.search;
		},
		CREATE_PAGINATION_QUERY(state, queryParams) {
			state.queryParams.pagination = queryParams.pagination;
			state.queryParams.page = queryParams.currentPage;
		},
		CREATE_SORT_QUERY(state, queryParams) {
			state.queryParams.sort = queryParams.sort;
		},







		CHANGE_PAGE(state, num) {
			state.page = num;
		},
		SET_FULL_DATA_LENGTH(state, num) {
			state.fullDataLength.length = num;
		}
	},
	actions: {
		createNewQuery: ({ commit, dispatch }, queryParams) => {
			commit('BUILD_NEW_QUERY', queryParams);
		},
		createSearchQuery: ({ commit, dispatch }, queryParams) => {
			commit('CREATE_SEARCH_QUERY', queryParams);
			commit('BUILD_NEW_QUERY');//эту мутацию можно сразу же положить внуть мутации CREATE_SEARCH_QUERY
			dispatch('doNewGetQuery', { value: this.a.getters.buildQuery });
		},
		createPaginationQuery: ({ commit, dispatch }, queryParams) => {
			commit('CREATE_PAGINATION_QUERY', queryParams);
			commit('BUILD_NEW_QUERY');
			dispatch('doNewGetQuery', { value: this.a.getters.buildQuery });
		},
		createSortQuery: ({ commit, dispatch }, queryParams) => {
			commit('CREATE_SORT_QUERY', queryParams);
			commit('BUILD_NEW_QUERY');
			dispatch('doNewGetQuery', { value: this.a.getters.buildQuery });
		},
		doNewGetQuery: ({ commit }, query) => {
			console.log(query.value);
			axios
			.get(query.value)
			.then(response => {
				commit('SET_DATA', response.data);
				// console.log(response.data);
				// console.log('');
			})
			.catch((error) => {
				console.log(error);
			});
		},














		getFullDataLength: ({ commit }) => { //в mount компонента
			axios//может быть есть get-запрос, позволяющий узнать кол-во page ?
			.get('http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events')
			.then(response => {
				commit('SET_FULL_DATA_LENGTH', response.data.length);
			})
			.catch((error) => {
				console.log(error);
			});
		},	
		getPageContent: ({ commit, dispatch }) => {
			dispatch('getFullDataLength');
			axios
			.get(`http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events?page=${this.a.getters.page}&limit=${this.a.getters.limit}`)
			.then(response => {
				commit('SET_DATA', response.data);
			})
			.catch((error) => {
				console.log(error);
			})
		},
		getSearchContent: ({ commit, dispatch }, searchValue) => {
			dispatch('changePage', 1);
			axios
			.get(`http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events?search=${searchValue}&page=${this.a.getters.page}&limit=${this.a.getters.limit}`)
			.then(response => {
				commit('SET_DATA', response.data);
				dispatch('getFullDataLength');
				//console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			})
		},
		changePage: ({ commit, dispatch }, num) => {
			commit('CHANGE_PAGE', num );
			dispatch('getPageContent');
		},




		addEvent: ({ dispatch }, event) => {
			axios.post('http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events', event)
			.then(() => {
				//dispatch('loadData');
				dispatch('getPageContent');
			})
			.catch((error) => {
				console.log(error);
			})
		},
		deleteEvent: ({ dispatch }, event) => {
			axios
			.delete(`http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events/${event.id}`)
			.then(() => {
				//dispatch('loadData');
				dispatch('getFullDataLength');
				dispatch('getPageContent');
			})
			.catch((error) => {
				console.log(error);
			})
		},
		deleteComment: ({ dispatch }, event) => {
			axios
			.delete(`http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events/${event.id}/comments/${event.commentId}`)
			.then(() => {
				//dispatch('loadData');
				dispatch('getPageContent');
			})
			.catch((error) => {
				console.log(error);
			})
		},
		loadData: ({commit}) => { //оставить здесь только экшон который коммитит SET_DATA, ВСЁ остальное разбросать по компонентам
			axios
			.get('http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events')//вроде можно вынести в переменную
			.then(response => {
				commit('SET_DATA', response.data.reverse());
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		},
	}
})

export default store;

// async loadData({ commit }) {
// 	let response = await axios.get('http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events');
// 	commit('SET_DATA', response.data.reverse());
// },
// async addEvent({ commit }, event) {
// 	const responce = await axios.post('http://5db050f78087400014d37dc5.mockapi.io/api/users/2/events', event);
// 	commit('ADD_EVENT', responce.data);
// },
// async deleteEvent({ dispatch }, event) {
// 	await axios.delete(`http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events/${event.id}`);
// 	dispatch('loadData');
// },
// async deleteComment({ dispatch }, event) {
// 	await axios.delete(`http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events/${event.id}/comments/${event.commentId}`);
// 	dispatch('loadData');
// }
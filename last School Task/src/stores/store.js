import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex, axios);

let store = new Vuex.Store({
	state: {
		data: [],
		fullDataLength: 0,
		defaultQuery: `http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events`,
		buildQuery: ``,
		queryParams: {
			page: 1,
			limit: 5,
			searchParam: ``,
			search: `?search=`,
			sort: `&sortBy=dete&order=desc`,
			pagination: `&page=1&limit=`
		}
	},
	getters: {
		data: state => state.data,
		fullDataLength: state => state.fullDataLength,
		defaultQuery: state => state.defaultQuery,
		buildQuery: state => state.buildQuery,
		page: state => state.queryParams.page,
		limit: state => state.queryParams.limit,
		searchParam: state => state.queryParams.searchParam,
		search: state => state.queryParams.search,
		sort: state => state.queryParams.sort
	},
	mutations: {
		BUILD_NEW_QUERY(state) {
			state.buildQuery = state.defaultQuery + state.queryParams.search + state.queryParams.sort + state.queryParams.pagination;
		},
		CREATE_SEARCH_QUERY(state, queryParams) {
			state.queryParams.search = queryParams.search;
			state.queryParams.searchParam = queryParams.searchParam;
		},
		CREATE_PAGINATION_QUERY(state, queryParams) {
			state.queryParams.pagination = queryParams.pagination;
			state.queryParams.page = queryParams.currentPage;
		},
		CREATE_SORT_QUERY(state, queryParams) {
			state.queryParams.sort = queryParams.sort;
		},
		SET_DATA(state, response) {
			state.data = response;
		},
		SET_FULL_DATA_LENGTH(state, num) {
			state.fullDataLength = num;
		}
	},
	actions: {
		doNewGetQuery: ({ commit, dispatch }, query) => {
			console.log(query.value);
			axios
			.get(query.value)
			.then(response => {
				if(response.data.length === 0 && this.a.getters.page !== 1) {
					dispatch('createPaginationQuery', {
						pagination: `&page=${this.a.getters.page - 1}&limit=${this.a.getters.limit}`,
						currentPage: this.a.getters.page - 1
					})
				}
				commit('SET_DATA', response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		},
		createSearchQuery: ({ commit, dispatch }, queryParams) => {
			commit('CREATE_SEARCH_QUERY', queryParams);
			commit('BUILD_NEW_QUERY');
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
		addEvent: ({ dispatch }, event) => {
			axios.post(this.a.getters.defaultQuery, event)
			.then(() => {
				dispatch('doNewGetQuery', { value: this.a.getters.buildQuery });
			})
			.catch((error) => {
				console.log(error);
			})
		},
		deleteEvent: ({ dispatch }, event) => {
			axios
			.delete(`${this.a.getters.defaultQuery}/${event.id}`)
			.then(() => {
				dispatch('getFullDataLength');
				dispatch('doNewGetQuery', { value: this.a.getters.buildQuery });
			})
			.catch((error) => {
				console.log(error);
			})
		},
		deleteComment: ({ dispatch }, event) => {
			axios
			.delete(`${this.a.getters.defaultQuery}/${event.id}/comments/${event.commentId}`)
			.then(() => {
				dispatch('getFullDataLength');
				dispatch('doNewGetQuery', { value: this.a.getters.buildQuery });
			})
			.catch((error) => {
				console.log(error);
			})
		},
		getFullDataLength: ({ commit }) => {
			if(this.a.getters.searchParam === ``) {
				axios
				.get(this.a.getters.defaultQuery)
				.then(response => {
					commit('SET_FULL_DATA_LENGTH', response.data.length);
				})
				.catch((error) => {
					console.log(error);
				});
			} else {
				axios
				.get(this.a.getters.defaultQuery + this.a.getters.search + this.a.getters.sort)
				.then(response => {
					commit('SET_FULL_DATA_LENGTH', response.data.length);
				})
			}
		}
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

// createNewQuery: ({ commit, dispatch }, queryParams) => {
// 	commit('BUILD_NEW_QUERY', queryParams);
// },
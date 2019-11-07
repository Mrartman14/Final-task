import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex, axios);

let store = new Vuex.Store({
	state: {
		data: [],
		defaultQuery: `http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events`,
		buildQuery: ``,
		queryParams: {
			searchParam: ``,
			search: `?search=`,
			sortParam: 0,
			sort: `&sortBy=dete&order=dete`
		}
	},
	getters: {
		data: state => state.data,
		defaultQuery: state => state.defaultQuery,
		buildQuery: state => state.buildQuery,
		searchParam: state => state.queryParams.searchParam,
		search: state => state.queryParams.search,
		sortParam: state => state.queryParams.sortParam,
		sort: state => state.queryParams.sort
	},
	mutations: {
		BUILD_NEW_GET_QUERY(state) {
			state.buildQuery = state.defaultQuery + state.queryParams.search + state.queryParams.sort
		},
		SET_DATA(state, data) {
			state.data = data;
		},
		SET_QUERY_PARAMS(state, params) {
			state.queryParams.search = params.search;
			state.queryParams.searchParam = params.searchParam
			state.queryParams.sort = params.sort;
			state.queryParams.sortParam = params.sortParam;
		}
	},
	actions: {
		setQueryParams( { commit, dispatch }, params ) {
			commit('SET_QUERY_PARAMS', params);
			dispatch('getQuery');
		},
		getQuery( { commit } ) {
			commit('BUILD_NEW_GET_QUERY');
							console.log(this.getters.buildQuery);
			axios.get(this.getters.buildQuery)
			.then(response => {
				commit('SET_DATA', response.data);
			})
		},
		postQuery: ({ dispatch }, post) => {
			axios.post(post.query, post.value)
			.then(() => {
				dispatch('getQuery');
			})
		},
		deleteQuery: ( { dispatch }, query) => {
			axios.delete(query)
			.then(() => {
				dispatch('getQuery');
			})
		}
	}
})

export default store;
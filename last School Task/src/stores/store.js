import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex, axios);

let store = new Vuex.Store({
	state: {
		data: [],
		dataSorting: ``,
		fullDataLength: 0,
		defaultQuery: `http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events`,
		buildQuery: ``,
		queryParams: {
			page: 1,
			limit: 5,
			searchParam: ``,//[['Дате', 'dete'], ['Заголовкам', 'title'], ['Описанию', 'description']]
			search: `?search=`,
			sort: `&sortBy=dete&order=dete`,
			pagination: `&page=1&limit=`
		}
	},
	getters: {
		data: state => state.data,
		dataSorting: state => state.dataSorting,
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
		},
		SET_DATASORTING(state, sortCondition) {
			state.dataSorting = sortCondition;
		},


		SET_LIMIT(state, num) {
			state.queryParams.limit += num;
		}
	},
	actions: {
		doNewGetQuery: ({ dispatch, commit }, query) => {
			//console.log(query.value);
			axios
			.get(query.value)
			.then(response => {
				if(response.data.length === 0 && this.a.getters.page !== 1) {//если страница пуста - переход на предыдущую страницу
					dispatch('createPaginationQuery', {
						pagination: `&page=${this.a.getters.page - 1}&limit=${this.a.getters.limit}`,
						currentPage: this.a.getters.page - 1
					})
				}
				let filteredData = response.data.filter((event) => { //фильтрация на прошедшие, текущие и ближайшие эвенты
					return event.dete.match('2019') !== null //query.requiredData или this.a.getters.dataSorting
				})

				//let shadowLimit = this.a.getters.limit;
				console.log(response.data.length);
				console.log(filteredData.length);


				// if(this.a.getters.limit < 20){
				// 	if(filteredData.length < response.data.length) {
				// 		commit('SET_LIMIT', 1);
				// 		commit('BUILD_NEW_QUERY');
				// 		dispatch('doNewGetQuery', { value: this.a.getters.defaultQuery + this.a.getters.search + this.a.getters.sort +
				// 		`&page=${this.a.getters.page}&limit=${this.a.getters.limit}` })
				// 	}
				// }


				// if(filteredData.length < response.data.length) {
				// 	while(filteredData.length < response.data.length) {
				// 		commit('SET_LIMIT', this.a.getters.limit + 1);
				// 		commit('BUILD_NEW_QUERY');
				// 		axios.get(this.a.getters.buildQuery).then(response => console.log(response.data))
				// 		filteredData.length +=1;
				// 	}
				// }else console.log('все совпадения!');


				// if (filteredData.length < response.data.length) {
				// 	let difference = response.data.length - filteredData.length;
				// 	axios.get(this.a.getters.defaultQuery + this.a.getters.search + this.a.getters.sort +
				// 	`&page=${this.a.getters.page}&limit=${this.a.getters.limit + difference}`)
				// 	.then
				// }

				
				//state.defaultQuery + state.queryParams.search + state.queryParams.sort + state.queryParams.pagination;















				//commit('SET_DATA', filteredData);
				//console.log(filteredData);
			})
			.catch((error) => {
				console.log(error);
			});
		},
		createPaginationQuery: ({ commit, dispatch }, queryParams) => {
			commit('SET_DATASORTING', queryParams.requiredData);
			commit('CREATE_PAGINATION_QUERY', queryParams);
			commit('BUILD_NEW_QUERY');
			dispatch('doNewGetQuery', { value: this.a.getters.buildQuery });
		},
		createSearchQuery: ({ commit, dispatch }, queryParams) => {
			commit('CREATE_SEARCH_QUERY', queryParams);
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
		},
		setDataSorting: ({ commit }, sortCondition) => {
			commit('SET_DATASORTING', sortCondition);
		},
		


		DELETE: ({ dispatch }, event) => {
			axios
			.delete(`${this.a.getters.defaultQuery}/80`)
			.then(() => {
				dispatch('getFullDataLength');
				dispatch('doNewGetQuery', { value: this.a.getters.buildQuery });
			})
			.catch((error) => {
				console.log(error);
			})
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
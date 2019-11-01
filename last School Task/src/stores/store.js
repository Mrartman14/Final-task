import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex, axios);

let store = new Vuex.Store({//test
	state: {
		data: [],
		fullDataLength: [],
		page: 1,
		limit: 3
	},
	getters: {
		data: state => state.data,
		fullDataLength: state => state.fullDataLength,
		page: state => state.page,
		limit: state => state.limit
	},
	mutations: {
		SET_DATA(state, payload) {
			state.data = payload;
		},
		CHANGE_PAGE(state, num) {
			state.page = num;
		},
		SET_FULL_DATA_LENGTH(state, num) {
			state.fullDataLength.length = num;
		}
	},
	actions: {
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
		getFullDataLength: ({ commit }) => { //в mount компонента
			axios
			.get('http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events')
			.then(response => {
				commit('SET_FULL_DATA_LENGTH', (response.data.length - 1));
			})
			.catch((error) => {
				console.log(error);
			});
		},	
		getPageContent: ({ commit, dispatch }) => {
			axios
			.get(`http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events?page=${this.a.getters.page}&limit=${this.a.getters.limit}`)
			.then(response => {
				commit('SET_DATA', response.data);
				dispatch('getFullDataLength');
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
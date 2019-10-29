import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex, axios); //Vue.use(Vuex, axios);



let store = new Vuex.Store({
	state: {
		data: null
	},
	getters: {
		data: state => state.data
	},
	mutations: {
		SET_DATA(state, payload) {
			state.data = payload;
		},
		ADD_EVENT(state, event) {
			state.data.push(event);
		},
		DELETE_EVENT(state, number) {
			state.data.splice(number, 1);
		}
	},
	actions: {
		loadData: ({commit}) => {
			axios
			.get('http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events')//вроде можно вынести в переменную
			.then(response => {
				commit('SET_DATA', response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		},
		addEvent: ({commit}, event) => {
			axios.post('http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events', event)
			.then(response => {
				commit('ADD_EVENT', response.data);
			})
			.catch((error) => {
				console.log(error);
			})
		},
		async deleteEvent({ commit }, event) {
			await axios.delete(`http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events/${event.id}`);
			commit('DELETE_EVENT', event.number);
		},

	},
})

export default store;

// async loadData({ commit }) {
// 	let response = await axios.get('http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events');
// 	commit('SET_DATA', response.data);
// },
// async addEvent({ commit }, event) {
// 	const responce = await axios.post('http://5db050f78087400014d37dc5.mockapi.io/api/users/2/events', event);
// 	commit('ADD_EVENT', responce.data);
// },
// deleteEvent: ({commit}, index)	=> {
// 	axios
// 	.delete('http://5db050f78087400014d37dc5.mockapi.io/api/users/2/events' + index)
// 	.then(response => {
// 		commit('DELETE_EVENT', index);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	})
// },
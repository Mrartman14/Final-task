import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex, axios);



// let store = new Vuex.Store({
// 	state: {
// 		data: null,
// 		// dataId: 0
// 	},
// 	getters: {
// 		data: state => state.data,
// 		dataId: state => state.dataId
// 	},
// 	mutations: {
// 		SET_DATA(state, payload) {
// 			state.data = payload;
// 		},
// 		ADD_EVENT(state, event) {
// 			state.data.unshift(event);
// 		},
// 		DELETE_EVENT(state, number) {
// 			state.data.splice(number, 1);
// 		},
// 		DELETE_COMMENT(state, eventIndex, commentIndex) {
// 			state.data[eventIndex].comments.splice(commentIndex, 1);
// 		}
// 		// SET_DATA_ID(state, id) {
// 		// 	state.dataId = id;
// 		// }
// 	},
// 	actions: {
// 		// setDataId({ commit }, id) {
// 		// 	commit('SET_DATA_ID', id);
// 		// },
// 		loadData: ({commit}) => {
// 			axios
// 			.get('http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events')//вроде можно вынести в переменную
// 			.then(response => {
// 				commit('SET_DATA', response.data.reverse());
// 				console.log(response.data); 
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 		},
// 		addEvent: ({commit}, event) => {
// 			axios.post('http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events', event)
// 			.then(response => {
// 				commit('ADD_EVENT', response.data);
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			})
// 		},
// 		//при таком подходе изменения в стейте произойдут даже если аксиос-запрос не будет выполнен, а это очень нехорошо
// 		async deleteEvent({ commit }, event) {
// 			await axios.delete(`http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events/${event.id}`);
// 			commit('DELETE_EVENT', event.number);
// 		},
// 		async deleteComment({ commit }, event) {
// 			await axios.delete(`http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events/${event.id}/comments/${event.commentId}`);
// 			commit('DELETE_COMMENT', event.index, event.commentIndex);
// 		}
// 	},
// })

// export default store;



let store = new Vuex.Store({
	state: {
		data: null,
	},
	getters: {
		data: state => state.data,
		dataId: state => state.dataId
	},
	mutations: {
		SET_DATA(state, payload) {
			state.data = payload;
		}
	},
	actions: {
		loadData: ({commit}) => {
			axios
			.get('http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events')//вроде можно вынести в переменную
			.then(response => {
				commit('SET_DATA', response.data.reverse());
			})
			.catch((error) => {
				console.log(error);
			});
		},
		addEvent: ({dispatch}, event) => {
			axios.post('http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events', event)
			.then(response => {
				dispatch('loadData');
			})
			.catch((error) => {
				console.log(error);
			})
		},
		async deleteEvent({ dispatch }, event) {
			await axios.delete(`http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events/${event.id}`);
			dispatch('loadData');
		},
		async deleteComment({ dispatch }, event) {
			await axios.delete(`http://5db050f78087400014d37dc5.mockapi.io/api/users/5/events/${event.id}/comments/${event.commentId}`);
			dispatch('loadData');
		}
	},
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
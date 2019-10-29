import Vue from 'vue';
// import VueRouter from 'vue-router';
import store from './stores/store';
// import router from './routers/routes';
// Vue.use(VueRouter);

import App from './App.vue';

new Vue({
	store,
	// router,
	render: h => h(App)
}).$mount('#app');
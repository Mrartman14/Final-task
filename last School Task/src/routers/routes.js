import Vue from 'vue';
import VueRouter from 'vue-router';

import eventList from '../components/EventList';
import eventCreate from '../components/EventCreate';
import eventInfo from '../components/EventInfo';
import Layout from '../components/Layout';

Vue.use(VueRouter);

let routes = [
	{
		path: '/',
		redirect: '/events',
		component: Layout,
		children: [
			// {
			// 	path:'events',
			// 	component: eventList,
			// 	redirect: '/events/current',
			// 	children: [
			// 		{
			// 			path:'past',
			// 			component: eventList,
			// 			props: {
			// 				eventDateCondition: 'test1'
			// 			}
			// 		},
			// 		{
			// 			path:'current',
			// 			component: eventList,
			// 			props: {
			// 				eventDateCondition: 'test2'
			// 			}
			// 		},
			// 		{
			// 			path:'nearest',
			// 			component: eventList,
			// 			props: {
			// 				eventDateCondition: 'test3'
			// 			}
			// 		}
			// 	]
			// },
			{
				path:'events/past',
				component: eventList,
				props: {
					sortByDateType: [-200, 0]//все прошедшие ивенты
				}
			},
			{
				path:'events/current',
				component: eventList,
				props: {
					sortByDateType: [0, 200]//все текущие ивенты
				}
			},
			{
				path:'events/nearest',
				component: eventList,
				props: {
					sortByDateType: [0, 6]//все ивенты в ближайшие полгода
				}
			},


			{
				path: '/event-create',
				component: eventCreate
			},
			{
				path: '/events/:id',
				component: eventInfo,
				name: 'eventInfo',
				props: true
			}
		]
	},
	
];


let router = new VueRouter({
	mode: 'history',
	routes
});

export default router;
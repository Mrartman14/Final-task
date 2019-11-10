import Vue from 'vue';
import VueRouter from 'vue-router';

import EventList from '../components/EventList';
import EventCreate from '../components/EventCreate';
import EventInfo from '../components/EventInfo';
import Layout from '../components/Layout';

Vue.use(VueRouter);

let routes = [
	{
		path: '/',
		redirect: '/events/current',
		component: Layout,
		children: [
			{
				path:'events/past',
				component: EventList,
				props: {
					sortByDateType: [-10000, 0]//все прошедшие эвенты
				}
			},
			{
				path:'events/current',
				component: EventList,
				props: {
					sortByDateType: [0, 10000]//все текущие эвенты
				}
			},
			{
				path:'events/nearest',
				component: EventList,
				props: {
					sortByDateType: [0, 6]//все эвенты в ближайшие полгода
				}
			},
			{
				path: '/event-create',
				component: EventCreate
			},
			{
				path: '/events/:id',
				component: EventInfo,
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
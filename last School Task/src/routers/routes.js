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
			{
				path:'events',
				component: eventList,
				redirect: '/events/current',
				children: [
					{
						path:'past',
						component: eventList,
						props: true
					},
					{
						path:'current',
						component: eventList,
						props: true
					},
					{
						path:'nearest',
						component: eventList,
						props: true
					}
				]
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
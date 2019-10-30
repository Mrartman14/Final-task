import Vue from 'vue';
import VueRouter from 'vue-router';

import сurrentEventList from '../components/CurrentEventList';
import pastEventList from '../components/PastEventList';
import nearestEventList from '../components/NearestEventList';
import eventCreate from '../components/EventCreate';
import eventInfo from '../components/EventInfo';



Vue.use(VueRouter);

let routes = [
	{
		path:'/',
		component: сurrentEventList
	},
	{ 
		path: '/past-events',
		component: pastEventList
	},
	{ 
		path: '/current-events',
		component: сurrentEventList,
	},
	{ 
		path: '/nearest-events',
		component: nearestEventList 
	},
	{
		path: '/current-events/event-create',
		component: eventCreate
	},
	{
		path: '/events/:id',
		component: eventInfo
	}
];


let router = new VueRouter({
	mode: 'history',
	routes
});

export default router;
//该文件专门用来创建整个应用的路由器
import VueRouter from 'vue-router'
import Vue from 'vue'
import replace from 'core-js/library/fn/symbol/replace'
Vue.use(VueRouter)
import {
	push
} from 'core-js/fn/array'
//创建并暴露一个路由器
export default new VueRouter({
	routes: [{
			name: 'gomusic',
			path: '/music',
			redirect:'/music/recommend',
			components: {
				music: () => import('../pages/routes/music.vue')
			},
			children: [{
					name: 'gorecommend',
					path: 'recommend',
					components: {
						recommend: () => import('../pages/music/recommend.vue')
					}
				},
				{
					name: 'gosonglist',
					path: 'songlist',
					components: {
						songlist: () => import('../pages/music/songlist.vue')
					}
				},
				{
					name: 'gorankinglist',
					path: 'rankinglist',
					components: {
						rankinglist: () => import('../pages/music/rankinglist.vue')
					}
				},
				{
					name: 'gosinger',
					path: 'singer',
					components: {
						singer: () => import('../pages/music/singer.vue')
					}
				},
				{
					name: 'gonewest',
					path: 'newest',
					components: {
						newest: () => import('../pages/music/newest.vue')
					}
				}
			]
		},
		{
			name: 'gopodcast',
			path: '/podcast',
			components: {
				podcast: () => import('../pages/routes/podcast.vue')
			},
			children: [
				{
					name: 'gomore',
					path: 'more',
					components: {
						more: () => import('../pages/podcast/more.vue')
					}
				}
			]
		},
		{
			name: 'govideo',
			path: '/video',
			redirect:'/video/vi',
			components: {
				video: () => import('../pages/routes/video.vue')
			},
			children: [{
					name: 'govi',
					path: 'vi',
					components: {
						vi: () => import('../pages/video/vi.vue')
					}
				},
				{
					name: 'gomv',
					path: 'mv',
					components: {
						mv: () => import('../pages/video/mv.vue')
					}
				},
				{
					name: 'goallmv',
					path: 'allmv',
					components: {
						allmv: () => import('../pages/video/allmv.vue')
					}
				}
			]
		},
		{
			name: 'gopage',
			path: '/page',
			components: {
				page: () => import('../pages/details/songlist/page.vue')
			}
		},
		{
			name: 'goDetails',
			path: '/Details',
			components: {
				Details: () => import('../pages/details/singer/Details.vue')
			}
		},
		{
			name: 'gopodcastPage',
			path: '/podcastPage',
			components: {
				podcastPage: () => import('../pages/details/podcast/podcastPage.vue')
			}
		},
		{
			name: 'goplay',
			path: '/play',
			components: {
				play: () => import('../pages/details/videoormv/play.vue')
			}
		},
		{
			name: 'gosearch',
			path: '/search',
			redirect:'/search/single',
			components: {
				search: () => import('../pages/routes/search.vue')
			},
			children: [{
					name: 'goalbum',
					path: 'album',
					components: {
						album: () => import('../pages/search/album.vue')
					}
				},
				{
					name: 'gosingle',
					path: 'single',
					components: {
						single: () => import('../pages/search/single.vue')
					}
				},
				{
					name: 'gosearchSinger',
					path: 'searchSinger',
					components: {
						searchSinger: () => import('../pages/search/searchSinger.vue')
					}
				},
				{
					name: 'gosearchVideo',
					path: 'searchVideo',
					components: {
						searchVideo: () => import('../pages/search/searchVideo.vue')
					}
				},
				{
					name: 'gosongList',
					path: 'songList',
					components: {
						songList: () => import('../pages/search/songList.vue')
					}
				},
				{
					name: 'gosearchPodcast',
					path: 'searchPodcast',
					components: {
						searchPodcast: () => import('../pages/search/searchPodcast.vue')
					}
				},
				{
					name: 'gouser',
					path: 'user',
					components: {
						user: () => import('../pages/search/user.vue')
					}
				},
			]
		},
		{
			name: 'gomylive',
			path: '/mylive',
			components: {
				mylive: () => import('../pages/myLive/mylive.vue')
			}
		},
		{
			name: 'gorecentlyPlay',
			path: '/recentlyPlay',
			components: {
				recentlyPlay: () => import('../pages/recentlyPlay/recentlyPlay.vue')
			}
		},
		{
			name: 'goprivateFM',
			path: '/privateFM',
			components: {
				privateFM: () => import('../pages/privateFM/privateFM.vue')
			}
		},
		// {
		// 	name: 'gologin',
		// 	path: '/login',
		// 	components: {
		// 		login: () => import('../pages/login/login.vue')
		// 	},
		// 	children:[
		// 		{
		// 			name:'gozhuce',
		// 			path:'zhuce',
		// 			components:{
		// 				zhuce:()=>import('../pages/login/zhuce.vue')
		// 			}
		// 		},
		// 		{
		// 			name:'godenglu',
		// 			path:'denglu',
		// 			components:{
		// 				login:()=>import('../pages/login/denglu.vue')
		// 			}
		// 		}
		// 	]
		// }
	]
})

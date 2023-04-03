import Vue from 'vue'
import App from './App.vue'
import './assets/styles/index.css'
import './assets/zititubiao/css/all.css'
import './assets/font_3648493_h8aqgr1314b/iconfont.css'
import VueRouter from 'vue-router'
import router from './router'
import Axios from 'axios'
import store from './store'
//引入ui插件
import {
	Carousel,
	CarouselItem,
	Pagination,
	InfiniteScroll,
	Drawer,
	Slider,
	Empty,
	Dropdown,
	DropdownMenu,
	DropdownItem
} from 'element-ui';
Vue.config.productionTip = false
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(VueRouter)
Vue.use(Pagination)
Vue.use(InfiniteScroll)
Vue.use(Drawer)
Vue.use(Slider)
Vue.use(Empty)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
new Vue({
	render: h => h(App),
	router,
	store,
	beforeCreate() {
		Vue.prototype.bus = new Vue();
	}
}).$mount('#app')

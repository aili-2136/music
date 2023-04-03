<template>
	<div class="app">
		<div class="Header">
			<Header @onlogin='onlogin' />
		</div>
		<div class="Aside">
			<Aside />
		</div>
		<div class="Footer">
			<Footer />
		</div>
		<div class="login" v-if="islogin">
			<login></login>
		</div>
	</div>
</template>

<script>
	import Header from './pages/frame/header.vue'
	import Aside from './pages/frame/aside.vue'
	import Footer from './pages/frame/footer.vue'
	import login from './pages/login/login.vue'
	export default {
		name: 'app',
		components: {
			Header,
			Aside,
			Footer,
			login
		},
		data() {
			return {

			}
		},
		methods: {
			//记得改回来
			onlogin(value) {
				// if(localStorage.getItem('accoun')!==null){
				// 	this.$store.dispatch('login',true)
				// }else{
				// 	this.$store.dispatch('login',false)
				// 	this.$router.push({
				// 		name:'gologin'
				// 	})
				// }
				this.$store.dispatch('login', value)
			}
		},
		mounted() {
			// if(localStorage.getItem('accoun')!==null){
			// 	this.$store.dispatch('login',true)
			// }else{
			// 	this.$store.dispatch('login',false)
			// }
		},
		computed: {
			islogin() {
				return this.$store.state.login
			}
		},
		watch: {
			islogin: {
				handler(value) {
					if (value) {

					}
				}
			}
		}

	}
</script>

<style>
	html,
	body {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}


	.app {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.app .Header {
		width: 100%;
		height: 50px;
	}

	.app .Aside {
		flex: 1;
	}

	.app .Footer {
		width: 100%;
		height: 70px;
	}

	.login {
		z-index: 999;
		width: 800px;
		height: 400px;
		display: flex;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>

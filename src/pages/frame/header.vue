<template>
	<div class="header-box">
		<div class="left">
			<i class="iconfont icon--huli" id="logo"></i>
			<span id="title">小罗音乐</span>
			<div id="router">
				<span id="enter" @click="onretreat">
					<i class="iconfont icon-fanhui1"></i>
				</span>
				<span id="quit" @click="onadvance">
					<i class="iconfont icon-fanhui2"></i>
				</span>
			</div>
			<div id="search-box">
				<i class="iconfont icon-sousuo"></i>
				<input ref="input" type="text" v-model="inputValue" @keyup.enter='submit' @blur="blur" @focus="focus"
					:placeholder="defaultKey"></input>
			</div>
		</div>

		<div class="reigth">
			<div id="user">
				<div id="backimg" @click="onclick">
					<!-- 头像 -->
					<i class="iconfont icon-ziyuanxhdpi"></i>
				</div>

				<el-dropdown trigger='click'>
					<span class="el-dropdown-link">
						{{user.name}}<i class="iconfont icon-icon_sanjiaoxing"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click="out">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>

			</div>
			<!-- <div id="console">
				<span id="lessen">
					<i class="iconfont icon-jianhao"></i>
				</span>
				<span id="large">
					<i class="iconfont icon-quanping"></i>
				</span>
				<span id="over">
					<i class="iconfont icon-chacha"></i>
				</span>
			</div> -->
		</div>
	</div>
</template>

<script>
	import {
		readData,
		saveData,
		deleteData
	} from '../../general/regular.js'
	import {
		getSearchDefault
	} from '../../plugins/search.js'
	import {
		getLogout,getUserDetail
	} from '../../plugins/user.js'
	export default {
		name: "header-box",
		data() {
			return {
				inputValue: '',
				defaultKey: '', //默认搜索关键字
				user: {
					name: '',
					img: ''
				},
				cookie: readData('cookie')
			}
		},
		methods: {
			submit() {
				if (this.inputValue == '') {
					saveData('SearchHistory', this.defaultKey)
					this.$store.dispatch('search', false)
					this.$store.dispatch('keyword', {
						open: true,
						key: this.defaultKey
					})
				} else {
					saveData('SearchHistory', this.inputValue)
					this.$store.dispatch('search', false)
					this.$store.dispatch('keyword', {
						open: true,
						key: this.inputValue
					})
				}
			},
			//失去焦点
			blur() {
				this.$store.dispatch('search', false)
			},
			//获取焦点
			focus() {
				this.$store.dispatch('search', true)
			},
			//点击登录
			onclick() {
				this.$emit('onlogin', true)
			},
			//后退
			onretreat() {
				this.$router.back()
			},
			//前进
			onadvance() {
				this.$router.forward()
			},
			//退出登录
			out() {
				getLogout({
					cookie: this.cookie
				}).then(res => {
					deleteData('cookie')
				})
			}
		},
		computed: {
			iskey() {
				return this.$store.state.keyword
			},
		},
		watch: {
			iskey: {
				deep: true,
				handler(value) {
					this.inputValue = value.key
				}
			},
			cookie:{
				deep:true,
				handler(value){
					if(value!==[]){
						this.getUserDetail({
							cookie:value
						}).then(res=>{
							this.user.name=res.data.profile.nickname
							this.user.img=res.data.profile.avatarUrl
						})
					}else{
						this.user.name='未登录'
					}
				}
			}
		},
		created() {
			getSearchDefault().then(res => {
				this.defaultKey = res.data.data.showKeyword
			})
			
			if(readData('cookie')!==[]){
				this.user.name='未登录'
			}	

		}
	}
</script>

<style scoped>
	.el-dropdown-link {
		margin-left: 5px;
		cursor: pointer;
		color: #fff;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	.header-box {
		width: 100%;
		height: 100%;
		display: flex;
		color: #fff;
		background-color: #FF7A9E;
		justify-content: space-between;
	}

	.left {
		width: auto;
		height: 100%;
		display: flex;
		align-items: center;
	}

	#logo {
		font-size: 22px;
		margin-left: 15px;
	}

	#title {
		font-size: 16px;
		margin-left: 5px;
	}

	#router {
		margin-left: 110px;
		width: 50px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	#router i {
		position: absolute;
		font-size: 12px;
	}

	#enter {
		display: inline-block;
		width: 22px;
		height: 22px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 11px;
		background-color: rgba(255, 255, 255, .2);
	}

	#quit {
		display: inline-block;
		width: 22px;
		height: 22px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 11px;
		background-color: rgba(255, 255, 255, .2);
	}

	#search-box {
		width: 142px;
		height: 28px;
		border-radius: 14px;
		margin-left: 20px;
		display: flex;
		line-height: 28px;
		background-color: rgba(255, 255, 255, .2);
	}

	#search-box i {
		font-size: 14px;
		margin-left: 5px;
	}

	#search-box input {
		margin-left: 5px;
		width: 115px;
		border: none;
		color: #fff;
		font-size: 12px;
		background-color: rgba(255, 255, 255, 0);
	}

	.reigth {
		width: 230px;
		height: 100%;
		margin-right: 20px;
		/* display: flex;
		align-items: center; */
	}

	#user {
		float: right;
		width: 135px;
		height: 100%;
		line-height: 50px;
		display: flex;
	}

	#user #backimg {
		position: relative;
		margin-top: 12.5px;
		width: 25px;
		height: 25px;
		border-radius: 50%;
	}

	#user #backimg i {
		display: inline-block;
		position: absolute;
		top: -12.5px;
		font-size: 25px;
	}

	#user #nickname {
		margin-left: 5px;
		font-size: 12px;
	}

	#user #nickname i {
		font-size: 12px;
	}


	#user #info li {
		height: 40px;
	}

	#console {
		flex: 1;
		display: flex;
		justify-content: space-between;
	}

	::-webkit-input-placeholder {
		color: #FABACC;
	}

	:-moz-placeholder {
		color: #FABACC;
	}

	::-moz-placeholder {
		color: #FABACC;
	}

	:-ms-input-placeholder {
		color: #FABACC;
	}
</style>

<template>
	<div class="log-in">
		<div class="login-xz">
			<img :src="img1" alt="">
			<span>Login....</span>
			<div id="butt">
				<my-button :params='buttpar' @onclick='onclick'></my-button>
			</div>
		</div>
		<div class="login-page">
			<i id="close" class="iconfont icon-cha" @click="onclose"></i>
			<div class="card">
				<denglu v-if="isLogin&&!isQRcode" @onerweima='onerweima'></denglu>
				<zc v-if="!isLogin&&!isQRcode"></zc>
				<QRcode v-if="isQRcode" @onerweima='onerweima'></QRcode>
			</div>			
		</div>
	</div>
</template>

<script>
	import zc from './zhuce/zc.vue'
	import denglu from './denglu/denglu.vue'
	import QRcode from './denglu/QRcode.vue'
	import myButton from '../../components/mybutton/my-button.vue'
	export default {
		name: "login",
		components: {
			'zc': zc,
			'denglu': denglu,
			'QRcode': QRcode,
			'my-button': myButton
		},
		data() {
			return {
				img1: require('../../../public/image/img1.png'),
				buttpar: '注册',
				isLogin:true,	//true=>登录  !true==>注册
				isQRcode:false,		//是否二维码登录
			}
		},
		methods: {
			onclick() {
				this.isLogin=!this.isLogin
				if(this.isLogin){
					this.buttpar='注册'
				}else{
					this.buttpar='登录'
				}
			},
			//二维码登录
			onerweima(){
				this.isQRcode=!this.isQRcode
			},
			onclose(){
				this.$store.dispatch('login',false)
			}
		},
		mounted() {

		}
	}
</script>

<style scoped>
	.log-in {
		width: 100%;
		height: 100%;
		box-shadow: 10px 10px 64px 0px rgba(180, 180, 207, 0.75);
		-webkit-box-shadow: 10px 10px 64px 0px rgba(186, 186, 202, 0.75);
		-moz-box-shadow: 10px 10px 64px 0px rgba(208, 208, 231, 0.75);


		border-radius: 10px;
		background-image: linear-gradient(170deg, #aaffff 0%, #ff7da0 100%);
		display: flex;
	}

	.login-xz {
		width: 280px;
		height: 100%;
		border-radius: 10px 0 0 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.login-xz i {
		font-size: 50px;
		margin-top: 30px;
		color: #ffaecb;
	}

	.login-xz img:nth-child(1) {
		width: 117px;
		height: 156px;
		position: absolute;
		right: 0px;
		bottom: 0px;
	}

	span {
		display: inline-block;
		position: absolute;
		top: 35%;
		font-size: 45px;
		background: linear-gradient(90deg,
				#ff94ab,
				#ea60da,
				#ff8394,
				#ffffff,
				#ffaaff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;
	}

	#butt {
		position: absolute;
		bottom: 70px;
	}

	.login-page {
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.login-page >i{
		position: absolute;
		z-index: 9 !important;
		cursor: pointer;
		right: 10px;
		top: 10px;
		font-size: 18px;
		color: #ff7da0;
	}
	

	.card {
		width: 80%;
		height: 80%;
		background-image: linear-gradient(163deg, #ff94ab 0%, #aaffff 100%);
		border-radius: 1.5rem;
	}
</style>

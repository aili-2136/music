<template>
	<div class="denglu">
		<div id="img" @click="showQRcode">
			<i class="iconfont icon-erweima1" style="font-size: 30px;"></i>
		</div>
		<i v-show="wjMm" class="iconfont icon-fanhui1" @click="retLogin">返回登录</i>
		<my-input :placeholder='phonoePar' @onblur='getphone' @onfocus='onfocus'></my-input>
		<my-input :placeholder='passwordPar' @onblur='getpassword' @onfocus='onfocus' v-show="loginFs&&!wjMm">
		</my-input>
		<my-input :placeholder='setPasswordPar' v-show="wjMm" @onblur='getnewpassword' @onfocus='onfocus'></my-input>
		<my-yzm1 v-show="!loginFs||wjMm" style="margin-top: 10px;" @onsubmit='onsubmit' @ongain='gainCode'></my-yzm1>
		<span id="span1" class='wbutt' @click="forgetMm" v-show="loginFs&&!wjMm">忘记密码</span>
		<span id="span2" class='wbutt' @click="loginMt" v-show="loginFs&&!wjMm">验证码登录</span>
		<span id="span3" class='wbutt' @click="loginMt" v-show="!loginFs">密码登录</span>
		<div id="err">{{error}}</div>
		<my-button :params='buttpar' style="margin-top: 5px;" @onclick="denglu"></my-button>
	</div>
</template>

<script>
	import mybutton from '../../../components/mybutton/my-button.vue'
	import myinput from '../../../components/myinpot/my-input.vue'
	import myyzm from '../../../components/myinpot/my-yzm.vue'
	import myyzm1 from '../../../components/myinpot/my-yzm1.vue'
	import {
		getLoginCellphone,
		getCaptchaSent,
		getCaptchaVerify
	} from '../../../plugins/register.js'
	import {
		checkout,
		readData,
		saveData,
		chckphone
	} from '../../../general/regular.js'
	export default {
		name: 'denglu',
		components: {
			'my-button': mybutton,
			'my-input': myinput,
			'my-yzm': myyzm,
			'my-yzm1': myyzm1,
		},
		data() {
			return {
				phonoePar: '请输入手机号',
				passwordPar: '请输入密码',
				buttpar: '登录',
				setPasswordPar: '请设置新密码',
				getCodeTime: null, //获取验证码定时器
				yzmTime: 60, //验证码时间
				error: null,
				phone: null,
				password: null,
				newPassword: null, //新的密码
				Code: null,
				loginFs: true, //登录方式:true>密码,false>验证码
				wjMm: false, //忘记密码
				phone: null,

			}
		},
		methods: {
			getphone(value) {
				this.phone = value
			},
			getpassword(value) {
				this.password = value
			},
			getnewpassword(value) {
				this.newPassword = value
			},
			//获取输入的验证码
			onsubmit(value) {
				this.Code = value
			},
			onfocus(value) {
				this.error = value
			},
			//忘记密码
			forgetMm() {
				this.wjMm = true
				this.buttpar = '确认'
			},
			//登录方式
			loginMt() {
				this.wjMm = false
				this.buttpar = '登录'
				this.loginFs = !this.loginFs
			},
			//获取验证码  有效
			gainCode() {
				if (chckphone(this.phone) == true) {
					getCaptchaSent({
						phone: this.phone
					}).then(res => {
						if (res.data.code == 200) {
							// let i=0
							// this.getCodeTime=setInterval(t=>{
							// 	i++
							// 	console.log(i);
							// },1000)
						} else {
							this.error = res.data.message
						}
					})
				} else {
					this.error = chckphone(this.phone)
				}
				// let i=60
				// this.getCodeTime = setInterval(t => {
				// 	i--

				// }, 1000)
			},
			//返回登录
			retLogin() {
				this.wjMm = false
				this.loginFs = true
			},
			//二维码登录
			showQRcode() {
				this.$emit('onerweima')
			},
			//登录
			denglu() {
				//密码登录
				if (this.loginFs&&!this.wjMm) {
					if (checkout(this.phone, this.password) == true) {
						getLoginCellphone({
							phone: this.phone,
							password: this.password
						}).then(res => {
							if (res.data.code == 200) {
								saveData('account', res.data.account)
								saveData('token', res.data.token)
								saveData('cookie', res.data.cookie)
								//登录成功
							} else {
								this.error = res.data.message
							}
						})
					} else {
						this.error = checkout(this.phone, this.pass)
					}
				}

				//验证码登录
				if (!this.loginFs) {
					if (chckphone(this.phone) && this.Code !== null) {
						getLoginCellphone({
							phone:this.phone,
							captcha:this.Code
						}).then(res=>{
							if(res.data.message){
								this.error=res.data.message
							}else{
								saveData('account', res.data.account)
								saveData('token', res.data.token)
								saveData('cookie', res.data.cookie)
							}
						})
					} else {
						if (chckphone(this.phone)) {
							this.error='验证码错误'
						} else {
							this.error = chckphone(this.phone)

						}
					}
				}

				//忘记密码
				if (this.wjMm) {
					
				}


			}
		}
	}
</script>

<style scoped>
	.denglu {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.denglu>#img{
		position: absolute;
		width: 50px;
		height: 50px;
		text-align: center;
		line-height: 50px;
		top: 0px;
		right:0px;
		border-radius: 9999px;
		box-shadow: inset 2px 2px 10px rgb(255, 255, 255);
	}
	
	.denglu>#img:active{
		transform: scale(0.99);
		box-shadow: inset 3px 3px 15px rgb(255, 255, 255);
	}
	
	.denglu>#img>i{
		background: linear-gradient(40deg,
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

	.denglu>i {
		display: inline-block;
		font-size: 16px;
		font-variant-caps: all-small-caps;
		font-weight: 500;
		margin-left: -320px;
		margin-top: -50px;
		cursor: pointer;
	}

	.denglu>span {
		display: inline-block;
		font-size: 16px;
		font-variant-caps: all-small-caps;
		background: linear-gradient(90deg,
				#ff5500,
				#aa55ff,
				#ff8394,
				#ff55ff,
				#aa55ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;
		cursor: pointer;
	}

	#span1 {
		margin-left: 30px;
		margin-top: -10px;
	}

	#span2 {
		margin-left: 150px;
		margin-top: -25px;
	}

	#span3 {
		margin-left: 150px;
		margin-top: -1px;
	}

	#err{
		width: auto;
		height: 24px;
		font-size: 16px;
		font-variant-caps: all-small-caps;
		color: red !important;
	}

	.wbutt:active {
		background: linear-gradient(90deg,
				#aa55ff,
				#ffffff,
				#ff8394,
				#ffffff,
				#ff5500);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;
	}
</style>

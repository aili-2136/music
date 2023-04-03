<template>
	<div class="zc">
		<my-input :placeholder='phoneParams' style="margin-top: 50px;"></my-input>
		<my-input :placeholder='passwordParams'></my-input>
		<my-yzm1 style="margin-top: 10px;"></my-yzm1>
		<my-button :params='buttpar' style="margin-top: 20px;"></my-button>
	</div>
</template>

<script>
	import mybutton from '../../../components/mybutton/my-button.vue'
	import myinput from '../../../components/myinpot/my-input.vue'
	import myyzm1 from '../../../components/myinpot/my-yzm1.vue'
	import {
		getCaptchaSent,
		getCellphoneExistenceCheck,
		getNicknameCheck,
		getCaptchaVerify,
		getRegisterCellphone
	} from '../../../plugins/register.js'
	import {
		checkout
	} from '../../../general/regular.js'
	export default {
		name: 'myinput',
		components: {
			'my-button': mybutton,
			'my-input': myinput,
			'my-yzm1': myyzm1
		},
		data() {
			return {
				phoneParams: '请输入手机号',
				passwordParams: '请设置新密码',
				buttpar:'注册',
				phone: null,
				password: null,
				nickname: null,
				error: null,
				VcCode: false
			}
		},
		methods: {
			// getnickNmae(value) {
			// 	this.nickname = value
			// },
			// getphone(value) {
			// 	this.phone = value
			// },
			// getpassword(value) {
			// 	this.password = value
			// },
			// onfocus(value) {
			// 	this.error = value
			// },
			//获取验证码
			gainCode() {
				// getNicknameCheck({
				// 	nickname: this.nickname
				// }).then(res => {
				// 	if (res.data.duplicated) {
				// 		this.error = '该昵称已被占用'
				// 	} else {
				// 		if (checkout(this.phone, this.password) == true) {
				// 			getCellphoneExistenceCheck({
				// 				phone: this.phone
				// 			}).then(res => {
				// 				if (res.data.nickname == null) {
				// 					getCaptchaSent({
				// 						phone: this.phone
				// 					})
				// 				} else {
				// 					this.error='该手机号已注册'
				// 				}
				// 			})
				// 		}else{
				// 			this.error=checkout(this.phone, this.password)
				// 		}
				// 	}
				// })
			},
			//已经输入完验证码
			getVcCode(value) {
				// if (checkout(this.phone, this.password) == true) {
				// 	getCaptchaVerify({
				// 		phone: this.phone,
				// 		captcha: value
				// 	}).then(res => {
				// 		if(res.code=='ERR_BAD_RESPONSE'){
				// 			this.error='验证码错误'
				// 		}else{
				// 			//注册
				// 			getRegisterCellphone({
				// 				captcha:value,
				// 				phone:this.phone,
				// 				password:this.password,
				// 				nickname:this.nickname
				// 			}).then(res=>{
				// 				//注册成功
				// 			})
				// 		}
				// 	}).catch(err=>{
						
				// 	})
				// }
			},
			gologin() {
				this.$emit('gologin', '登录')
			}
		},
	}
</script>

<style scoped>
	.zc {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>

<template>
	<div class="QRcode">
		<i class="iconfont icon-fanhui1" @click="retLogin">返回登录</i>
		<div id="img">
			<img :src="imgpar" alt="">
		</div>
		<div id="shade" :style="shadeSty">
			请在手机上确认
		</div>
	</div>
</template>

<script>
	import {
		getLoginQrKey,
		getLoginQrCreate,
		getLoginQrCheck
	} from '../../../plugins/register.js'
	import baseimg from '../../../general/regular.js'
	import {saveData} from '../../../general/regular.js'
	export default {
		name: 'QRcode',
		props: {},
		data() {
			return {
				imgpar: null, //二维码图片
				imgkey: null,
				take_time: null, //轮询定时器
				backlog:false,	//待确认
				timestamp:new Date().getTime(),
				shadeSty:{
					display:'none'
				},
			}
		},
		methods: {
			retLogin() {
				this.$emit('onerweima')
				clearInterval(this.take_time)
			},
			take() {
				getLoginQrKey({
					timestamp:this.timestamp
				}).then(res => {
					this.imgkey = res.data.data.unikey
					getLoginQrCreate({
						key: res.data.data.unikey,
						qrimg: true
					}).then(res => {
						this.imgpar = res.data.data.qrimg
						this.take_time = setInterval(i => {
							getLoginQrCheck({
								key: this.imgkey,
								timestamp:new Date().getTime()
							}).then(res => {
								if(res.data.code==800){
									//过期
									this.shadeSty={
										dispaly:'none'
									}
									this.take()
								}
								if(res.data.code==801){
									
								}
								if(res.data.code==802){
									//待确认
									this.shadeSty={
										dispaly:'block'
									}
								}
								if(res.data.code==803){
									//登录成功
									this.$store.dispatch('login',false)
									saveData('cookie',res.data.cookie)
									clearInterval(this.take_time)
								}
							})
						}, 2000)
					})
				})
			}
		},
		created() {
			this.take()
		}
	}
</script>

<style scoped>
	.QRcode {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.QRcode #img {
		width: 180px;
		height: 180px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.QRcode #shade{
		width: 180px;
		height: 180px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		line-height: 180px;
		font-size:18px;
		background-color: rgba(208, 208, 208, 0.9);
	}

	.QRcode>i {
		display: inline-block;
		font-size: 16px;
		font-variant-caps: all-small-caps;
		font-weight: 500;
		margin-left: 15px;
		cursor: pointer;
	}
</style>

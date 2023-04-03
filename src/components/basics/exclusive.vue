<!-- 
	参数
	obj:{
		play:true,			//播放按键是否显示
		location:'centre',		//播放按钮的位置 centre/rightlow/lefttop
		time:false,			//时长
	}
 
 -->
<template>
	<div class="exclusive" ref="box">
		<div class="exclusive-img">
			<div id="img">
				<img :src="params[0]" alt="">
			</div>
			<div id="play" v-show="obj.play" :style="place">
				<i class="iconfont icon-bofang5"></i>
			</div>
		</div>
		<div class="exclusive-text">
			<p id="tag">
				{{params[1]}}
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'exclusive',
		props: {
			obj:Object,
			params:Array
		},
		data() {
			return {
				place: {
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)'
				},
				
			}
		},
		created() {
			switch (this.obj.location) {
				case 'centre':
					this.place = {
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)'
					}
					break;
				case 'rightlow':
					this.place = {
						position: 'absolute',
						bottom: '5px',
						right: '5px'
					}
					break
				case 'lefttop':
					this.place = {
						position: 'absolute',
						top:'5px',
						left:'5px'
					}
					break
				default:
					break;
			}
		},
	}
</script>

<style scoped>
	img{
		top: 0;
		width: 100%;
		height: 100%;
	}
	
	.exclusive {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	.exclusive-img{
		width: 100%;
		aspect-ratio: 100/56;
		border-radius: 5px;
		position: relative;
	}

	.exclusive-img #img{
		width: 100%;
		height: 100%;
	}
	
	img {
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
	
	.exclusive-img #play {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: rgba(255, 255, 255, .2);
		border: 1px #fff solid;
		text-align: center;
		line-height: 18px;
	}

	.exclusive-img #play i {
		font-size: 14px;
		color: #ffffff;
		font-variant-caps: all-small-caps;
	}

	
	.exclusive-text {
		display: flex;
		font-size: 13px;
		margin-top: 5px;
		line-height: 18px;
		flex-direction: column;
	}
	

</style>

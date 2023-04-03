<!-- 
	参数
	obj:{
		count:true,			//观看人数
		play:true,			//播放按键是否显示
		location:'centre',		//播放按钮的位置 centre/rightlow/lefttop
		time:false,			//时长
		type:'video'    //类型		video/mv/MV(歌手详情里的MV)
		
	}
	data:图片 标题 作者 时长 播放数
 -->
<template>
	<div class="video-mv" ref="box">
		<div class="video-mv-img">
			<div id="img">
				<img :src="params[0]+'?param=227y134'" alt="">
			</div>
			<div id="count" v-show="obj.count">
				<i class="iconfont icon-xiangyousanjiaoxing"></i>
				<i>{{isplaycount}}</i>
			</div>
			<div id="play" v-show="obj.play" :style="place">
				<i class="iconfont icon-bofang5"></i>
			</div>
			<div id="time" v-show="obj.time">
				{{istime}}
			</div>
		</div>
		<div class="video-mv-text">
			<p id="tag">
				<span>
					{{params[1]}}
				</span>
			</p>
			<p id="name">
				<span v-for="(item,index) in params[2]" v-if="obj.type=='mv'">
					{{item.name}}
				</span>
				<span v-for="(item,index) in params[2]" v-if="obj.type=='search'">
					{{index==0?item.userName:'/'+item.userName}}
				</span>
				<span v-if="obj.type=='video'">
					{{params[2]}}
				</span>
			</p>
		</div>
	</div>
</template>

<script>
	import {getwang1,getmiao} from '../../general/regular.js'
	export default {
		name: 'videoormv',
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
		computed:{
			isplaycount(){
				return getwang1(this.params[4])
			},
			istime(){
				return getmiao(this.params[3])
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
	
	.video-mv {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	

	.video-mv-img{
		width: 100%;
		aspect-ratio: 100/56;
		border-radius: 5px;
		position: relative;
	}

	.video-mv-img #img {
		width: 100%;
		height: 100%;
	}

	img {
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}

	.video-mv-img #count {
		position: absolute;
		font-size: 16px;
		font-variant-caps: all-small-caps;
		line-height: 12px;
		padding-right: 5px;
		color: #fff;
		right: 0;
		top: 0;
	}


	.video-mv-img #count i:nth-child(1) {
		margin-right: 3px;
	}

	.video-mv-img #play {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		text-align: center;
		line-height: 22px;
		background-color: #E9E7E7;
	}

	.video-mv-img #play i {
		font-size: 18px;
		color: #ff9ead;
		font-variant-caps: all-small-caps;
	}

	.video-mv-img #time {
		position: absolute;
		bottom: 0;
		right: 3px;
		font-size: 16px;
		color: #fff;
		font-variant-caps: all-small-caps;
	}

	.video-mv-text {
		display: flex;
		font-size: 13px;
		margin-top: 5px;
		line-height: 18px;
		flex-direction: column;
	}
	
	#tag{
		flex: 1;
		display: flex;
	}
		
	#tag span{
		flex: 1;
		width: 0px;
		display: inline-block;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}	
		
	#name{
		flex: 1;
		font-size: 16px;
		font-variant-caps: all-small-caps;
		color: #a6a6a6;
	}
	
	
</style>

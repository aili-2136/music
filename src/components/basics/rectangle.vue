<!-- 
	参数
	 type:'newmusic'/'hotpodcast'/'recommend'
	 data:图片  	标题  标签  作者 播放数 时长
 -->
<template>
	<div class="rectangle">
		<div class="rectangle-img">
			<img :src="params[0]" alt="">
			<div id="play" :style="location">
				<i class="iconfont icon-bofang5"></i>
			</div>
		</div>
		<div class="rectangle-text" v-if="obj.type!=='recommend'">
			<div id="name">
				<p>{{params[1]}}
					<span v-show="obj.type=='newmusic'" v-for="(item,index) in params[2]">
						{{'('+item+')'}}
					</span>
				</p>
			</div>
			<div id="label" v-show="obj.type=='hotpodcast'">
				<span>{{params[2]}}</span>
			</div>
			<div id="info">
				<span id="intro" v-show="obj.type=='hotpodcast'">
					{{params[3]}}
				</span>
				<span id="intro1" v-show="obj.type=='newmusic'">
					<span v-for="(item,index) in params[3]">
						{{index==0?item.name:'/'+item.name}}
					</span>
				</span>
				<span id="count" v-show="obj.type=='hotpodcast'">
					<i class="iconfont icon-xiangyousanjiaoxing"></i>
					<i>{{iswang(params[4])}}</i>
				</span>
				 <span id="time" v-show="obj.type=='hotpodcast'">
				 	<i class="iconfont icon-31shijian"></i>
					<i>{{istime(params[5])}}</i>
				 </span>
			</div>
		</div>
		
		<div class="recommend-text" v-if="obj.type=='recommend'">
			<div id="recommend-name">
				<p>{{params[1]}}</p>
			</div>
			<div id="recommend-info">
				<span id="play">
					<i class="iconfont icon-bofangsanjiaoxing"></i>
					{{iswang(params[2])}}
				</span>
				<span id="voice">
					<i class="iconfont icon-dianbo01"></i>
					{{params[3]}}
				</span>
				<span id="nickname">
					{{params[4]}}
				</span>
			</div>
		</div>
		
		
	</div>
</template>

<script>
	import {getwang1,getmiao} from '../../general/regular.js'
	export default{
		name:'rectangle',
		props:{
			obj:Object,
			params:Array
		},
		data() {
			return {
				location:{
					position: '',
					right: '',
					bottom: ''
				}
			}
		},
		methods:{
			iswang(value){
				return getwang1(value)
			},
			istime(value){
				return getmiao(value)
			}
		},
		mounted() {
			switch (this.obj.type){
				case 'hotpodcast':
						this.location={
							position: 'absolute',
							right: '3px',
							bottom: '3px'
						}
					break;
				case 'newmusic':
						this.location={
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)'
						}
					break;
				default:
					break;
			}
		}
	}
	
</script>

<style scoped>
	img{
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
	.rectangle{
		width: 100%;
		height: 100%;
		display: flex;
	}
	
	.rectangle-img{
		height: 100%;
		aspect-ratio: 1/1;
		position: relative;
		border-radius: 5px;
	}
	
	.rectangle-img #play{
		width: 25px;
		height: 25px;
		border-radius: 50%;
		position:absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		line-height: 20px;
		opacity: 0.9;
		background-color: #E9E7E7;
	}
	
	.rectangle-img #play i{
		font-size: 18px;
		color: #ff9ead;
		font-variant-caps: all-small-caps;
	}
	
	.rectangle-text{
		flex: 1;
		margin-left: 5px;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}
	
	#name{
		flex: 1;
		font-size: 13px;
		display: flex;
		justify-content: center;
	}
	
	#name p{
		flex: 1;
		width: 0px;
		display: inline-block;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	#name span{
		color: #989898;
	}
	
	#label{
		flex: 1;
		color: #989898;
		font-size: 12px;
	}
	
	#label span{
		display: inline-block;
		line-height: 12px;
		margin-left: -4px;
		transform: scale(0.8);
		padding: 3px 4px;
		border-radius: 2px;
		border: 1px #ECECEC solid;
	}
	
	#info{
		flex: 1;
		color: #9F9F9F;
		display: flex;
		align-items: center;
	}
	
	#info >span{
		display: inline-block;
		font-size: 16px;
		font-variant-caps: all-small-caps;
		margin-right: 8px;
	}
	
	#info i{
		font-size: 16px;
		transform: scale(0.9);
	}
	
	#info #intro{
		max-width: 105px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	#info #intro1{
		flex: 1;
		width: 0px;		
		display: inline-block;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.recommend-text{
		flex: 1;
		margin-left: 5px;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	
	#recommend-name{
		font-size: 12px;
	}
	#recommend-info{
		font-size: 16px;
		font-variant-caps: all-small-caps;
	}
	
	#recommend-info span{
		margin-right: 10px;
	}
	
</style>
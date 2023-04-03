<!-- 
 参数：
	obj:{
		type:'song'/'ranking'/'newmusic'/'album'
		count:true,			//观看人数
		play:true,			//播放按键是否显示
		location:'centre',		//播放按钮的位置 centre/rightlow/lefttop
	}
	
	params:[
		图片，播放数，描述
	]
 -->
<template>
	<div class="song-list">
		<div class="song-list-img">
			<div id="img">
				<img :src="params[0]" alt="">
			</div>
			<div id="play" v-show="obj.play" :style="place">
				<i class="iconfont icon-bofang5"></i>
			</div>
			<div id="count" v-show="obj.count">
				<i class="iconfont icon-xiangyousanjiaoxing"></i>
				<i>{{obj.type=='ranking'?isplaycount1:isplaycount}}</i>
			</div>
		</div>
		<div class="song-list-text">
			<p id="tag">
				<span v-if="obj.type=='podcast'">
					{{params[3]}}
				</span>
				{{params[2]}}
			</p>
		</div>
		<div class="song-list-name">
			<p id="name" v-if="obj.type=='newmusic'">
				<span>
					{{params[3][0].name}}
				</span>
			</p>
			<p id="name" v-if="obj.type=='album'">
				<span>
					{{istime(params[3])}}
				</span>
			</p>
		</div>
	</div>
</template>

<script>
	import {
		getwang1,
		getwang,
		gettime
	} from '../../general/regular.js'
	export default {
		name: 'songlist',
		props: {
			obj: Object,
			params: Array
		},
		data() {
			return {
				place: {
					position: '',
					top: '',
					left: '',
					transform: ''
				},
			}
		},
		methods:{
			istime(time){
				return gettime(time)
			}
		},
		computed: {
			isplaycount() {
				return getwang1(this.params[1])
			},
			isplaycount1() {
				return getwang(this.params[1])
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
						bottom: '10px',
						right: '5px'
					}
					break
				case 'lefttop':
					this.place = {
						position: 'absolute',
						top: '5px',
						left: '5px'
					}
					break
				default:
					break;
			}
		},
	}
</script>

<style scoped>
	.song-list {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	.song-list-img {
		width: 100%;
		height: auto;
		border-radius: 5px;
		position: relative;
	}


	.song-list-img #img {
		width: 100%;
		aspect-ratio: 1/1;
	}

	img {
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}

	.song-list-img #count {
		position: absolute;
		font-size: 16px;
		font-variant-caps: all-small-caps;
		line-height: 12px;
		padding-right: 5px;
		color: #fff;
		right: 3px;
		top: 2px;
	}


	.song-list-img #count i:nth-child(1) {
		margin-right: 3px;
	}

	.song-list-img #play {
		position: absolute;
		display: none;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		text-align: center;
		line-height: 22px;
		background-color: #ffffff;
	}

	.song-list-img #play i {
		font-size: 18px;
		color: #ff9ead;
		font-variant-caps: all-small-caps;
	}

	#img:hover+#play {
		display: block;
	}

	.song-list-text {
		width: 100%;
		max-height: 39px;
		font-size: 13px;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
	}

	.song-list-text #tag span{
		display: inline-block;
		color: #989898;
		line-height: 12px;
		margin-left: -8px;
		margin-right: -6px;
		transform: scale(0.8);
		padding: 3px 4px;
		border-radius: 2px;
		border: 1px #EBEBEB solid;
	}

	.song-list-name {
		width: 100%;
		max-height: 39px;
		font-size: 12px;
		color: #9F9F9F;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
	}
</style>

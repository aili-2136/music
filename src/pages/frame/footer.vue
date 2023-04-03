<template>
	<div class="footer-box">
		<div class="song">
			<div id="img" @mouseover="display">
				<img :src="SongDetail.img" alt="">
			</div>
			<div id="yy" :style="block" @mouseout="none" @click="goup">
				<i class="iconfont icon-xiangshangjiantou" style="pointer-events: none;" v-show="!drawer"></i>
				<i class="iconfont icon-xiangxiajiantou" style="pointer-events: none;" v-show="drawer"></i>
			</div>

			<div id="name">
				<div id="songname">
					<div id="text">
						{{SongDetail.name}}
					</div>
					<i class="iconfont icon-xihuan"></i>
				</div>
				<div id="nickname">
					<span v-for="(item,index) in SongDetail.nickname">
						{{index==0?item.name:'/'+item.name}}
					</span>
				</div>
			</div>

			<div class="Drawer">
				<drawer :sync='drawer' :play='ofno' @onclick="onclick" :musicid='musicid' :params='SongDetail' :playtime='audio.currentTime'>
				</drawer>
			</div>
		</div>
		<div class="player">
			<div id="console">
				<audio ref="audio" @ended="ended" :src="SongDetail.url" @timeupdate="ontimeupdate"
					@loadedmetadata="onloadedmetadata" @canplay='oncanplay'>

				</audio>
				<i v-show="cycle==1" @click="iscycle(2)" class="iconfont icon-24gl-repeat2"></i>
				<i v-show="cycle==2" @click="iscycle(3)" class="iconfont icon-danquxunhuan"></i>
				<i v-show="cycle==3" @click="iscycle(1)" class="iconfont icon-24gl-repeatInfinite2"></i>
				<i class="iconfont icon-shangyishou"></i>
				<p id="p" @click="ztbf">
					<span v-show="ofno==true" class="iconfont icon-zanting3" style="font-size: 12px;"></span>
					<span v-show="ofno==false" class="iconfont icon-24gf-play" style="font-size: 12px;"></span>
				</p>
				<i class="iconfont icon-xiayishou"></i>
				<i>词</i>
			</div>
			<div id="bar">
				<span>{{audio.currentTime|formatSecond}}</span>
				<div class="slider">
					<el-slider 
						@change="progressChange" 
						v-model="audio.currentTime" 
						:max="audio.maxTime"
						:format-tooltip="realFormatSecond"
						@mouseup.native="mouseupChangeTime"
						:show-tooltip="false"></el-slider>
				</div>
				<span>{{audio.maxTime|formatSecond}}</span>
			</div>
		</div>
		<div class="key">
			<i class="iconfont icon-bofangliebiao" style="font-size: 22px; font-weight: 500;"></i>
			<i id="volume" class="iconfont icon-weibiaoti-2" v-if="!audio.muted"
				style="font-size: 22px; font-weight: 600;" @click="mute"></i>
			<i id="volume" class="iconfont icon-weibiaoti-"	v-if="audio.muted"
				style="font-size: 22px; font-weight: 600;" @click="cancelMute"></i>
			<div id="control">
				<el-slider 
				v-model="audio.volume" 
				vertical 
				height="70px" 
				:show-tooltip='hint' 
				@input="volumeChange()"
				:step='0.01'
				:max="1">
				</el-slider>
				<span></span>
			</div>
		</div>
	</div>
</template>

<script>
	import slider from '../../components/slider/slider.vue'
	import {
		readData,
		saveData,
		getlyric,
		getmiao
	} from '../../general/regular.js'
	import {
		getSongDetail,
		getSongUrl,
		getLyric
	} from '../../plugins/music.js'
	import drawer from '../../pages/details/lyric/drawer.vue'

	function realFormatSecond(second) {
		var secondType = typeof second;

		if (secondType === 'number' || secondType === 'string') {
			second = parseInt(second);

			var hours = Math.floor(second / 3600);
			second = second - hours * 3600;
			var mimute = Math.floor(second / 60);
			second = second - mimute * 60;

			return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
		} else {
			return '00:00'
		}
	}

	export default {
		name: 'footer-box',
		components: {
			'slider': slider,
			'drawer': drawer
		},
		data() {
			return {
				musicid: '', //音乐id
				ofno: false, //播放按钮的状态
				canplay: false, //是否可以播放
				playing: false, //歌曲是否播放
				cycle: 1, //循环播放状态
				hint: false,
				SongDetail: {
					url: '',
					img: '',
					name: '',
					nickname: [],
					time: '',
					lyric: ''
				},
				block: {
					display: 'block'
				},
				drawer: false,
				audio: {
					// 播放状态
					playing: false,
					// 静音状态
					muted: false,
					// 音频当前播放时长
					currentTime: 0,
					// 音量
					volume: 0.3,
					// 音频最大播放时长
					maxTime: 0
				},
				cacheCurrent:0,
				cacheVoice:1
			}
		},
		methods: {
			iscycle(id) {
				this.cycle = id
			},
			ztbf() {
				this.ofno = !this.ofno
			},
			display() {
				this.block.display = 'block'
			},
			none() {
				this.block.display = 'none'
			},
			goup() {
				this.drawer = !this.drawer
			},
			onclick(value) {
				this.drawer = value
			},
			/*audio*/
			//播放完后触发事件
			ended() {

			},
			//可以播放了
			oncanplay() {
				if (this.audio.playing) {
					this.$refs.audio.play()
				}
			},
			//timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
			ontimeupdate() {
				this.audio.currentTime = this.$refs.audio.currentTime
			},
			onloadedmetadata() {
				this.audio.maxTime = parseInt(this.$refs.audio.duration)
			},

			/*progress*/
			//拖动进度条
			progressChange(value){
				this.$refs.audio.currentTime = value >= 0 ? value : this.cacheCurrent;
				this.audio.currentTime = value >= 0 ? value : this.cacheCurrent	
			},
			mouseupChangeTime(){
				this.progressChange(this.cacheCurrent)
			},
			realFormatSecond(second) {
			        this.cacheCurrent = second;
			        return realFormatSecond(second);
			},
			
			/*volume*/
			volumeChange(){
				this.cancelMute(false);
				  if (this.audio.volume === 0) {
				    this.mute(false)
				  }
				  this.$refs.audio.volume = this.audio.volume;
			},
			mute(event) {
			  // 正常点击静音和取消静音的时候把当前音量存下来，拖动触发的静音方法只需要改变状态
			  event && (this.cacheVoice = this.audio.volume);
			  this.audio.volume = 0;
			  this.audio.muted = true;
			  this.$refs.audio.muted = true;
			},
			// 取消静音
			cancelMute(event) {
			  event && (this.audio.volume = this.cacheVoice);
			  this.audio.muted = false;
			  this.$refs.audio.muted = false;
			},
			
		},
		filters: {
		      // 将整数转化成时分秒
		      formatSecond(second = 0) {
		        return realFormatSecond(second)
		      }
		 },
		computed: {
			ismusicid() {
				return this.$store.state.musicid
			},
			isofno() {
				return this.ofno
			}
		},
		watch: {
			ismusicid: {
				handler(value) {
					this.musicid = value
					getSongUrl({
						id: value,
						level: 'higher'
					}).then(res => {
						this.SongDetail.url = res.data.data[0].url
						this.SongDetail.time = res.data.data[0].time
						this.sliderParams.time = res.data.data[0].time
					})

					getSongDetail({
						ids: value
					}).then(res => {
						this.SongDetail.img = res.data.songs[0].al.picUrl
						this.SongDetail.name = res.data.songs[0].name
						this.SongDetail.nickname = res.data.songs[0].ar
					})

					getLyric({
						id: value
					}).then(res => {
						this.SongDetail.lyric = getlyric(res.data.lrc.lyric)
					})
					this.ofno = true
				}
			},
			isofno: {
				handler(value) {
					if (value) {
						this.$refs.audio.play()
						this.audio.playing = true
					} else {
						this.$refs.audio.pause()
						this.audio.playing = false
					}
				}
			}
		},
		mounted() {
			let id=null
			if(localStorage.getItem("RecentlyPlayed")){
				id=JSON.parse(localStorage.getItem("RecentlyPlayed"))[0]
			}else{
				id=this.$store.state.musicid
			}
			this.musicid = id
			getSongUrl({
				id: id,
				level: 'higher'
			}).then(res => {
				this.SongDetail.url = res.data.data[0].url
				this.SongDetail.time = res.data.data[0].time
			})

			getSongDetail({
				ids: id
			}).then(res => {
				this.SongDetail.img = res.data.songs[0].al.picUrl
				this.SongDetail.name = res.data.songs[0].name
				this.SongDetail.nickname = res.data.songs[0].ar
			})

			getLyric({
				id: id
			}).then(res => {
				this.SongDetail.lyric = getlyric(res.data.lrc.lyric)
			})
		}

	}
</script>

<style scoped>
	.footer-box {
		width: 100%;
		height: 100%;
		background-color: #ffffff;
		border-top: 1px #e1e1e1 solid;
		display: flex;
		justify-content: space-between;
	}

	img {
		top: 0;
		width: 100%;
		height: 100%;
	}

	.song {
		width: 210px;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.song #img {
		width: 43px;
		height: 43px;
		margin-left: 10px;
		border-radius: 5px;
	}

	.song #yy {
		width: 43px;
		height: 43px;
		text-align: center;
		line-height: 42px;
		border-radius: 3px;
		margin-left: -43px;
		color: #fff;
		background: rgba(0, 0, 0, 0.5);
	}

	img {
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}

	.song #name {
		flex: 1;
		margin-left: 10px;
		display: flex;
		font-size: 16px;
		font-variant-caps: all-small-caps;
		flex-direction: column;
	}

	.song #name #songname {
		flex: 1;
		display: flex;
	}

	.song #name #songname>i {
		display: inline-block;
		font-size: 24px;
		height: 24px;
		margin-top: -8px;
		margin-left: 5px;
	}

	.song #name #songname #text {
		max-width: 120px;
		height: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.song #name #nickname {
		flex: 1;
		max-width: 120px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.player {
		width: 420px;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}


	.player #console {
		width: 195px;
		height: 32px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.player #console i {
		font-size: 18px;
		color: #313131;
	}

	.player #button i:hover {
		color: #FF7A9E;
	}

	.player #console #p {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		line-height: 32px;
		text-align: center;
		background-color: #F5F5F5;
	}

	.player #bar {
		width: 100%;
		height: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.player #bar>span {
		display: inline-block;
		height: 20px;
		font-size: 16px;
		line-height: 17px;
		color: #737373;
		font-variant-caps: all-small-caps;
	}

	.slider {
		flex: 1;
		width: 100%;
		height: 20px;
		display: flex;
		justify-content: center;
	}

	/deep/ .el-slider {
		cursor: default;
		width: 97%;
		height: 20px;
	}
	
	
	/deep/.el-slider__runway {
		width: 100%;
		height: 6px;
		cursor: default;
		margin-top: 8px;
	}

	/deep/ .el-slider__bar {
		background-color: #FF7A9E;
		cursor: default;
	}

	/deep/.el-slider__button-wrapper {
		cursor: default;
	}

	/deep/.el-slider__button {
		margin-top: -1px;
		width: 8px;
		height: 8px;
		border: none;
		background-color: #FF7A9E;
		cursor: default;
	}


	.key {
		width: 210px;
		height: 100%;
		line-height: 70px;
		position: relative;
	}

	.key>i {
		float: right;
		margin-right: 25px;
	}

	.key #control {
		position: relative;
		top: -80px;
		left: 110px;
		z-index: 3;
		width: 30px;
		height: 90px;
		box-shadow: 0px 2px 7px 0px #cecece;
		background-color: #fff;
		border-radius: 3px;
		display: none;
	}

	.key #control>span {
		position: absolute;
		top: 70px;
		left: 10px;
		display: block;
		width: 10px;
		height: 7px;
		position: relative;
		overflow: hidden;
		background-color: transparent;
	}


	#control>span::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		transform-origin: right top;
		transform: rotate(45deg);
	}

	.key #control:active {
		display: block;
	}

	.key #control:hover {
		display: block;
	}

	#volume:hover+#control {
		display: block;
	}

	/deep/ #control .el-slider__button {
		width: 8px !important;
		height: 8px !important;
		margin-top: -14px;
		background-color: #FF7A9E;
		border: none;
		cursor: default;
	}

	/deep/ #control .el-slider__button-wrapper {
		z-index: 9;
		margin-left: 12px;
		cursor: default;
		width: 10px;
		height: 10px;
	}

	/deep/ #control .el-slider__runway {
		width: 4px !important;
		margin-left: 12px;
		margin-top: 10px;
	}

	/deep/ #control .el-slider__bar {
		width: 4px !important;
		background-color: #FF7A9E;
	}
</style>

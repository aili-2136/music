<template>
	<div class="private-fm">
		<div class="ov">
			<div class="main">
				<div id="lyric">
					<div id="left">
						<div id="img">
							<img :src="FM.img[index]" alt="">
						</div>
						<div id="but">
							<span><i class="iconfont icon-48shangyishou" @click="shangyishou"></i></span>
							<span><i class="iconfont icon-xihuan2"></i></span>
							<span><i class="iconfont icon-49xiayishou" @click="xiayishou"></i></span>
							<span><i class="iconfont icon-fenxiang"></i></span>
						</div>
					</div>
					<div id="reght">
						<div id="name">
							<span>
								{{FM.name[index]}}
							</span>
							<span>
								<div>
									<span>专辑:</span>
									<span>{{FM.album[index]}}</span>
								</div>
								<div>
									<span>歌手:</span>
									<span v-for="(item,index) in FM.song[index]">
										{{index==0?item.name:'/'+item.name}}
									</span>
								</div>
							</span>
						</div>
						<div id="lyric">
							<div id="parcel" ref="parcel">
								<p>
									<i></i>
									<i></i>
									<i></i>
									<span v-for="(item,key,index) in FM.lyric" :ref="'i'+index">
										{{item}}
									</span>
									<i></i>
									<i></i>
									<i></i>
									<i></i>
									<i></i>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getPersonalFm
	} from '../../plugins/personalfm.js'
	import {
		getSongUrl,
		getLyric
	} from '../../plugins/music.js'
	import {
		getmiao,
		getlyric,
		gettime1,
		getcopy
	} from '../../general/regular.js'
	import {
		getCommentNew
	} from '../../plugins/comment.js'
	export default {
		name: 'privateFM',
		components: {},
		data() {
			return {
				time: +new Date(),
				cookie: localStorage.getItem('cookie'),
				FM: {
					img: [], //图片
					song: [], //歌手信息
					album: [], //专辑信息
					name: [], //歌名
					id: [], //id
					lyric: '', //歌词		一首一首请求，多了顺序会乱
					url: [], //播放地址
					time: [] //歌曲时长
				},
				index: 0, //目前是第几首
				fm: {
					url: '',
					img: '',
					song: '',
					name: ''
				},
				text: '', //播放时间定时器
				playtime: 0, //当前播放时间
				playindex: 0, //当前在第几句
			}
		},
		watch:{
			index:{
				handler(value){
					this.$store.dispatch('musicid',this.FM.id[value])
				}
			}
		},
		methods: {
			shangyishou() {
				if (this.index > 0) {
					this.index--
				}
			},
			xiayishou() {
				if (this.index >= 0 && this.index < this.FM.id.length-1) {
					this.index++
				} else {
					this.time = +new Date()
					this.FM = {
						img: [],
						song: [],
						album: [],
						name: [],
						id: [],
						lyric: '',
						url: [],
						time: []
					}
					getPersonalFm({
						cookie: this.cookie,
						timestamp: this.time
					}).then(res => {
						res.data.data.forEach((a, index) => {
							this.FM.img[index] = a.album.picUrl
							this.FM.song[index] = a.artists
							this.FM.album[index] = a.album.name
							this.FM.name[index] = a.name
							this.FM.id[index] = a.id
							this.index=0
							getSongUrl({
								id: a.id,
								level: 'higher'
							}).then(res => {
								let url = JSON.stringify(res.data.data[0].url)
								let url1 = JSON.parse(url)
								this.FM.url[index] = url1
								this.FM.time[index] = getmiao(res.data.data[0].time)
							})
						})
						getLyric({
							id: this.FM.id[this.index]
						}).then(res => {
							this.FM.lyric = getlyric(res.data.lrc.lyric)
						})
					})
				}
			}
		},
		mounted() {
			getPersonalFm({
				cookie: this.cookie,
				timestamp: this.time
			}).then(res => {
				res.data.data.forEach((a, index) => {
					this.FM.img[index] = a.album.picUrl
					this.FM.song[index] = a.artists
					this.FM.album[index] = a.album.name
					this.FM.name[index] = a.name
					this.FM.id[index] = a.id
					getSongUrl({
						id: a.id,
						level: 'higher'
					}).then(res => {
						let url = JSON.stringify(res.data.data[0].url)
						let url1 = JSON.parse(url)
						this.FM.url[index] = url1
						this.FM.time[index] = getmiao(res.data.data[0].time)
					})


				})
				getLyric({
					id: this.FM.id[this.index]
				}).then(res => {
					this.FM.lyric = getlyric(res.data.lrc.lyric)
				})
				this.$store.dispatch('musicid', this.FM.id[0])
			})
		},
		activated() {
			this.$store.dispatch('catalog','privatefm')
		}
	}
</script>

<style scoped>
	.private-fm {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.ov {
		flex: auto;
		height: 0;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.ov::-webkit-scrollbar {
		width: 6px;
		border-radius: 4px;
		background-color: #ffffff;
	}

	.ov::-webkit-scrollbar-thumb {
		border-radius: 4px;
		height: 2px;
		background-color: #e1e1e1;
	}

	img {
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}


	.private-fm .main {
		width: 674px;
		height: auto;
		margin: 0 auto;
		margin-top: 40px;
	}

	.private-fm .main #lyric {
		width: 100%;
		height: 410px;
		display: flex;
		justify-content: space-between;
	}

	#left {
		width: 265px;
		height: 100%;
		margin-left: 50px;
		display: flex;
		flex-direction: column;
	}

	#left #img {
		width: 265px;
		height: 265px;
		margin-top: 30px;
		border-radius: 5px;
	}

	#left #but {
		width: 100%;
		height: 37px;
		margin-top: 30px;
		display: flex;
		justify-content: space-between;
	}

	#left #but span {
		display: inline-block;
		text-align: center;
		line-height: 39px;
		width: 37px;
		height: 37px;
		border: 1px #E2E2E2 solid;
		border-radius: 50%;
		cursor: pointer;
	}

	#left #but span:hover{
		background-color: #F5F5F5;
	}

	#left #but span i {
		font-size: 20px;
		color: #666666;
	}

	#reght {
		width: 262px;
		height: 100%;
		margin-right: 50px;
		display: flex;
		flex-direction: column;
	}

	#reght #name {
		width: 100%;
		height: 60px;
		display: flex;
		flex-direction: column;
	}

	#reght #name>span:nth-child(1) {
		font-size: 20px;
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	#reght #name>span:nth-child(2) {
		display: flex;
		justify-content: space-between;
		margin-top: 8px;
		font-size: 12px;
		color: #A4A4A4;
	}

	#reght #name>span span:nth-child(2n-1) {
		margin-right: 5px;
	}

	#reght #name>span:nth-child(2) div {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}


	#reght #lyric {
		position: relative;
		width: 100%;
		height: 340px;
		display: flex;
		flex-direction: column;
		border-right: 1px #F2F2F2 solid;
	}

	#parcel {
		flex: 1;
		width: 100%;
		height: auto;
		font-weight: 300;
		margin-top: 40px;
		overflow-y: auto;
		overflow-x: hidden;
	}


	#parcel::-webkit-scrollbar {
		width: 6px;
		border-radius: 4px;
		background-color: #ffffff;
	}

	#parcel::-webkit-scrollbar-thumb {
		border-radius: 4px;
		height: 2px;
		background-color: #e1e1e1;
	}

	#parcel p {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	#parcel i {
		display: block;
		width: 100%;
		height: 34px;
	}

	#parcel span {
		display: block;
		width: 100%;
		height: auto;
		font-size: 14px;
		line-height: 34px;
		text-align: center;
	}




	.time {
		font-size: 15px;
		font-weight: 600;
	}
</style>

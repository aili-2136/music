<template>
	<div class="play">
		<div class="ov">
			<div class="content">
				<div id="main">
					<div id="left">
						<div id="header">
							<i class="iconfont icon-fanhui1"></i>
							{{play.type=='视频'?'视频详情':'MV详情'}}
						</div>
						<div id="video">
							<video :src="url" controls autoplay muted></video>
						</div>
						<div id="user">
							<div id="head">
								<div>
									<div id="img">
										<img :src="detail.nickurl" alt="">
									</div>
									<div id="name">
										<span v-for="(item,index) in detail.nickname" v-show="play.type==='MV'">
											{{index===0?item+'/':item}}
										</span>
										<span v-show="play.type==='视频'">
											{{detail.nickname}}
										</span>
									</div>
								</div>
								<div id="gz" v-show="play.type==='视频'">
									<i>+</i>关注
								</div>
							</div>
							<h1>{{play.type==='视频'?detail.data.title:detail.data.name}}
								<span v-show="play.type==='MV'">
									<i @click="show" class="iconfont icon-sanjiaoxing_shang" v-show="isshow===true"></i>
									<i @click="show" class="iconfont icon-sanjiaoxing_shang-copy"
										v-show="isshow===false"></i>
								</span>
							</h1>
							<div id="fbbf">
								<span>发布:</span>
								<span>{{detail.publishTime}}</span>
								<span>播放:</span>
								<span>{{detail.playTime}}次</span>
							</div>
							<div id="label" v-show="true">
								<span v-for="(item,index) in detail.data.videoGroup" v-show="play.type==='视频'">
									{{item.name}}
								</span>
								<p v-show="play.type=='MV'&&isshow==false">
									所谓卡通风格和网卡偶尔替换啊为哦好疼阿尔文肉片和认同问题后阿伟
									所谓卡通风格和网卡偶尔替换啊为哦好疼阿尔文肉片和认同问题后阿伟
									所谓卡通风格和网卡偶尔替换啊为哦好疼阿尔文肉片和认同问题后阿伟
								</p>
							</div>
							<div id="record">
								<span class="iconfont icon-dianzan"><span>赞{{'('+info.likedCount+')'}}</span></span>
								<span
									class="iconfont icon-24gl-folderPlus"><span>收藏{{'('+detail.data.subscribeCount+')'}}</span></span>
								<span class="iconfont icon-fenxiang"><span>分享{{'('+info.shareCount+')'}}</span></span>
								<span class="iconfont icon-xiazai1" v-show="play.type==='mv'"><span>下载</span></span>
							</div>
						</div>


						<div class="comment">
							<i>评论<span style="font-size: 12px; color: #b3b3b3;font-weight: 300; ">
									{{'('+info.commentCount+')'}}</span></i>
							<div id="text">
								<div contenteditable="true">

								</div>
								<div>
									<p>
										<i class="iconfont icon-xiaolian"></i>
										<i class="iconfont icon-aite"></i>
										<i class="iconfont icon-hashjinghao"></i>
									</p>
									<p>
										评论
									</p>
								</div>
							</div>

							<div id="excellent">
								<p>精彩评论</p>
								<comm :params='comment.hot'></comm>
							</div> 
							<div id="new">
								<p>最新评论</p>
								<comm :params='comment.new'></comm>
							</div>

						</div>

					</div>


					<div id="right">
						<div id="header">
							相关推荐
						</div>
						<ul>
							<li v-for="(item,index) in related.data">
								<div id="img">
									<img :src="play.type==='MV'?item.cover:item.coverUrl" alt="">
								</div>
								<div id="name">
									<span>{{play.type==='MV'?item.name:item.title}}</span>
									<span>{{play.type==='MV'?item.artistName:item.creator[0].userName}}</span>
								</div>
							</li>
						</ul>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getPersonalizedMv,
		getMvDetail,
		getMvDetailInfo,
		getMvUrl,
		getSimiMv
	} from '../../.././plugins/mv.js'
	import {
		getRelatedAllvideo,
		getVideoDetail,
		getVideoDetailInfo,
		getVideoUrl
	} from '../../.././plugins/videos.js'
	import {
		gettime,
		getmiao,
		getwang1,
		gettime1
	} from '../../.././general/regular.js'
	import {
		getCommentNew
	} from '../../.././plugins/comment.js'
	import comm from '../../../components/comment/comm.vue'
	export default {
		name: 'play',
		components: {
			'comm':comm
		},
		data() {
			return {
				play: {},
				//视频详情
				detail: {
					data: '', //数据
					dt: '', //时长
					playTime: '', //播放次数
					publishTime: '', //发布时间
					resolutions: [], //清晰度
					nickname: [], //创作者
					nickurl: '' //创作者头像

				},
				//相关视频
				related: {
					data: '', //数据
					dt: [], //时长
					playTime: [], //播放次数
					id: [] //视频id
				},
				//视频播放地址
				url: '',
				//视频点赞转发评论数数据
				info: {
					commentCount: '',
					liked: '',
					likedCount: '',
					shareCount: ''
				},
				comment: {
					new: {},
					hot: {},
				},
				isshow: true
			}
		},
		methods: {
			show() {
				this.isshow = !this.isshow
			}
		},
		beforeDestroy() {
			this.$store.dispatch('play', false)
		},
		created() {
			if (this.$store.state.page.type !== undefined) {
				this.play = this.$store.state.page
				switch (this.$store.state.page.type) {
					case '视频':
						//视频详情
						getVideoDetail({
							id: this.$store.state.page.id
						}).then(res => {
							this.detail.data = res.data.data
							this.detail.dt = getmiao(res.data.data.durationms)
							this.detail.playTime = getwang1(res.data.data.playTime)
							this.detail.publishTime = gettime(res.data.data.publishTime)
							this.detail.resolutions = res.data.data.resolutions
							this.detail.nickname = res.data.data.creator.nickname
							this.detail.nickurl = res.data.data.creator.avatarUrl
						})
						//相关视频
						getRelatedAllvideo({
							id: this.$store.state.page.id
						}).then(res => {
							this.related.data = res.data.data
							res.data.data.forEach(a => {
								this.related.dt.push(getmiao(a.durationms))
								this.related.playTime.push(getwang1(a.playTime))
								this.related.id.push(a.vid)
							})
						})
						//视频点赞转发评论数数据
						getVideoDetailInfo({
							vid: this.$store.state.page.id
						}).then(res => {
							this.info.liked = res.data.liked
							this.info.likedCount = res.data.likedCount
							this.info.commentCount = res.data.commentCount
							this.info.shareCount = res.data.shareCount
						})
						//视频播放地址
						getVideoUrl({
							id: this.$store.state.page.id
						}).then(res => {
							this.url = res.data.urls[0].url
						})

						//评论
						getCommentNew({
							id: this.$store.state.page.id,
							type: 5,
							sortType: 2,
							pageSize: 10
						}).then(res => {
							this.comment.hot =res.data.data
						})

						getCommentNew({
							id: this.$store.state.page.id,
							type: 5,
							sortType: 3
						}).then(res => {
							this.comment.new =res.data.data		
						})
						break;
					case 'MV':
						getMvDetail({
							mvid: this.$store.state.page.id
						}).then(res => {
							this.detail.data = res.data.data
							this.detail.dt = getmiao(res.data.data.durationms)
							this.detail.playTime = getwang1(res.data.data.playCount)
							this.detail.publishTime = res.data.data.publishTime
							this.detail.resolutions = res.data.mp
							res.data.data.artists.forEach(a => {
								this.detail.nickname.push(a.name)
							})
							this.detail.nickurl = res.data.data.artists[0].img1v1Url
						})
						getMvDetailInfo({
							mvid: this.$store.state.page.id
						}).then(res => {
							this.info.liked = res.data.liked
							this.info.likedCount = res.data.likedCount
							this.info.commentCount = res.data.commentCount
							this.info.shareCount = res.data.shareCount
						})
						getMvUrl({
							id: this.$store.state.page.id
						}).then(res => {
							this.url = res.data.data.url
						})

						getSimiMv({
							mvid: this.$store.state.page.id
						}).then(res => {
							this.related.data = res.data.mvs
							res.data.mvs.forEach(a => {
								this.related.dt.push(getmiao(a.duration))
								this.related.playTime.push(getwang1(a.playCount))
								this.related.id.push(a.id)
							})
						})

						getCommentNew({
							id: this.$store.state.page.id,
							type: 1,
							sortType: 2,
							pageSize: 10
						}).then(res => {
							this.comment.hot =res.data.data		
						})

						getCommentNew({
							id: this.$store.state.page.id,
							type: 1,
							sortType: 3
						}).then(res => {
							this.comment.new =res.data.data
						})

						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style scoped>
	.play {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
	}

	.ov {
		flex: auto;
		height: 0;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.ov::-webkit-scrollbar {
		width: 4px;
		border-radius: 4px;
		background-color: #ffffff;
	}

	.ov::-webkit-scrollbar-thumb {
		border-radius: 4px;
		height: 2px;
		background-color: #e1e1e1;
	}

	video {
		top: 0;
		width: 100%;
		height: 100%;
	}

	img {
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}

	.content {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
	}

	#main {
		width: 860px;
		height: auto;
		display: flex;
	}

	#main #left {
		width: 548px;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	#left #header,
	#right #header {
		width: 100%;
		height: 45px;
		line-height: 45px;
		font-size: 15px;
		font-weight: 600;
		cursor: pointer;
	}

	#left #header i {
		font-size: 14px;
	}

	#left #video {
		margin-top: -4px;
		width: 100%;
		height: 320px;
	}

	#left #user {
		width: 100%;
		height: auto;
		margin-top: 15px;
		margin-bottom: 45px;
		display: flex;
		flex-direction: column;
	}

	#left #user #head {
		width: 100%;
		height: 45px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	#left #user #head #img {
		width: 45px;
		height: 45px;
		border-radius: 50%;
		cursor: pointer;
	}

	#left #user #head>div:nth-child(1) {
		flex: 1;
		display: flex;
		align-items: center;
	}

	#left #user #head #name {
		font-size: 13px;
		cursor: pointer;
	}

	#left #user #head #img img {
		border-radius: 50%;
	}

	#left #user #gz {
		width: 75px;
		height: 26px;
		font-size: 12px;
		line-height: 26px;
		text-align: center;
		border-radius: 13px;
		background-color: #FDF5F4;
		color: #FE3A6E !important;
		cursor: pointer;
		margin-right: 10px;
	}


	h1 {
		font-size: 20px;
		font-weight: 600;
		margin-top: 20px;
	}

	#left #user #fbbf {
		font-size: 13px;
		transform: scale(0.9);
		margin-left: -28px;
		color: #CFCFCF;
		margin-top: 5px;
	}

	#left #user #fbbf span:nth-child(2n-1) {
		margin-right: 8px;
	}

	#left #user #fbbf span:nth-child(2) {
		margin-right: 20px;
	}


	#left #user #label span {
		float: left;
		margin-top: 8px;
		font-size: 12px;
		transform: scale(0.9);
		padding: 0 8px 0 8px;
		border-radius: 10px;
		line-height: 20px;
		color: #626262;
		background-color: #f1f1f1;
		cursor: pointer;
	}

	#left #user #label p {
		width: 605px;
		margin-left: -29px;
		margin-top: 10px;
		font-size: 12px;
		transform: scale(0.9);
	}

	#left #user #record {
		margin-top: 20px;
	}

	#left #user #record>span {
		font-size: 15px;
		margin-right: 10px;
		padding: 5px 20px 5px 20px;
		border: 1px #D9D9D9 solid;
		border-radius: 27px;
		position: relative;
		cursor: pointer;
	}

	#left #user #record>span:hover {
		background-color: #f2f2f2;
	}

	#left #user #record>span span {
		margin-left: 5px;
		font-size: 12px;
	}

	#main #right {
		width: 250px;
		height: auto;
		margin-left: 25px;
		display: flex;
		flex-direction: column;
	}

	#main #right>ul li {
		width: 100%;
		height: 70px;
		display: flex;
		margin-bottom: 10px;
	}



	#main #right>ul li #img {
		width: 124px;
		height: 100%;
		border-radius: 5px;
	}

	#main #right>ul li #name {
		flex: 1;
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	#main #right>ul li #name span:nth-child(1) {
		display: inline-block;
		font-size: 12px;
		max-height: 39px;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
		margin-top: 5px;
	}



	#main #right>ul li #name span:nth-child(2) {
		display: inline-block;
		font-size: 16px;
		color: #b6b6b6;
		font-variant-caps: all-small-caps;
		margin-bottom: 5px;
	}

	.comment {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	.comment>i:nth-child(1) {
		font-size: 18px;
		font-weight: 600;
	}

	.comment #text {
		height: 120px;
		display: flex;
		font-size: 12px;
		flex-direction: column;
	}

	.comment #text div:nth-child(1) {
		height: 60px;
		border: 1px #E5E5E5 solid;
		border-radius: 3px;
	}

	.comment #text div:nth-child(2) {
		height: 30px;
		margin-top: 5px;
		display: flex;
		justify-content: space-between;
	}

	.comment #text div p:nth-child(1) {
		width: 76px;
		height: 100%;
		display: flex;
		justify-content: space-around;
	}

	.comment #text div p i {
		font-size: 18px;
		color: #8c8c8c;
	}


	.comment #text div p:nth-child(2) {
		width: 52px;
		height: 24px;
		border: 1px #e5e5e5 solid;
		border-radius: 12px;
		font-size: 14px;
		line-height: 24px;
		text-align: center;
		cursor: pointer;
	}

	.comment #text div p:nth-child(2):hover {
		background-color: #f2f2f2;
	}

	.comment #excellent,
	.comment #new {
		display: flex;
		flex-direction: column;
		margin-top: 20px;
	}
	
	.comment>div>p{
		font-size: 15px;
		font-weight: 700;
	}
	
	
</style>

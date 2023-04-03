<template>
	<div class="recommend">
		<!-- 轮播图 -->
		<div id="carousel">
			<el-carousel :interval="4000" type="card" height="175px">
				<el-carousel-item v-for="(item,index) in banners" :key="index">
					<img :src="item.imageUrl">
				</el-carousel-item>
			</el-carousel>
		</div>

		<div class="recommend-list">
			<div id="recommend">
				<span @click="goSongList">推荐歌单&nbsp;<i class="iconfont icon-fanhui2"></i></span>
				<ul>
					<li v-for="(item,index) in songlist" @click="getpage(item.id,'歌单')">
						<song-list :obj='songlistobj' :params='[item.picUrl,item.playCount,item.name]'></song-list>
					</li>
				</ul>
			</div>
			<div id="hot">
				<span @click="goPodcast">热门播客&nbsp;<i class="iconfont icon-fanhui2"></i></span>
				<ul>
					<li v-for="(item,index) in hotlist" :key="index">
						<rectangle :obj='hotobj' :params='[
							item.picUrl,item.name,item.program.radio.category,
							item.program.radio.name,item.program.listenerCount,item.program.duration
						]'></rectangle>
					</li>
				</ul>
			</div>
			<div id="exclusive">
				<span>独家放送&nbsp;<i class="iconfont icon-fanhui2"></i></span>
				<ul>
					<li v-for="(item,index) in exclusivelist">
						<exclusive :obj='exclusiveobj' :params='[
							item.picUrl,item.name
						]'></exclusive>
					</li>
				</ul>
			</div>
			<div id="newest" style="margin-bottom: 50px;">
				<span @click="goNewMusic">最新音乐&nbsp;<i class="iconfont icon-fanhui2"></i></span>
				<ul>
					<li v-for="(item,index) in newestlist" :key="index">
						<rectangle :obj='musicobj' :params='[
							item.picUrl,item.name,item.song.alias,item.song.artists
						]'></rectangle>
					</li>
				</ul>
			</div>
			<div id="mv">
				<span @click="goMv">推荐MV&nbsp;<i class="iconfont icon-fanhui2"></i></span>
				<ul>
					<li v-for="(item,index) in mvlist">
						<video-mv :obj='mvobj' :params='[
							item.picUrl,item.name,item.artists,
							item.duration,item.playCount
						]'></video-mv>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import songlist from '../../components/basics/songlist.vue'
	import rectangle from '../../components/basics/rectangle.vue'
	import exclusive from '../../components/basics/exclusive.vue'
	import videoormv from '../../components/basics/videoormv.vue'
	import {
		getBanner,
		getPersonalized,
		getPersonalizedDjprogram,
		getPersonalizedPrivatecontent,
		getPersonalizedNewsong,
		getPersonalizedMv
	} from '../../plugins/recommend.js'
	export default {
		name: 'recommend',
		components: {
			'song-list': songlist,
			'rectangle': rectangle,
			'exclusive': exclusive,
			'video-mv': videoormv
		},
		data() {
			return {
				songlistobj: {
					count: true,
					play: true,
					location: 'rightlow',
					time: false,
					type: 'list'
				},

				hotobj: {
					type: 'hotpodcast'
				},

				exclusiveobj: {
					play: true,
					location: 'lefttop',
				},

				musicobj: {
					type: 'newmusic'
				},

				mvobj: {
					type: 'mv',
					count:true,
					play:false,
					location:'centre',
					time:false,
				},

				banners: [], //轮播图
				songlist: [], //推荐歌单
				hotlist: [], //推荐播客
				exclusivelist: [], //独家放送
				newestlist: [], //最新音乐
				mvlist: [], //推荐mv
			}
		},
		methods:{
			getpage(id,type){
				this.$store.dispatch('page',{
					id:id,
					type:type
				})
			},
			goSongList(){
				this.$router.push({
					name:'gosonglist'
				})
			},
			goPodcast(){
				this.$router.push({
					name:'gopodcast'
				})
			},
			goNewMusic(){
				this.$router.push({
					name:'gonewest'
				})
			},
			goMv(){
				this.$router.push({
					name:'gomv'
				})
			}
		},
		mounted() {
			// 轮播图请求
			getBanner().then(res => {
				this.banners = res.data.banners
			})

			// 请求获取推荐歌单			
			getPersonalized().then(res => {
				this.songlist = res.data.result
			})

			// 获取推荐播客			
			getPersonalizedDjprogram().then(res => {
				this.hotlist = res.data.result
			})

			// 获取独家放送轮播图				
			getPersonalizedPrivatecontent().then(res => {
				this.exclusivelist = res.data.result
			})

			// 获取最新音乐			
			getPersonalizedNewsong().then(res => {
				const arr = res.data.result
				this.newestlist = arr.splice(0, 9)
			})
			// 推荐mv						
			getPersonalizedMv().then(res => {
				this.mvlist = res.data.result
			})
		},
		activated() {
			this.bus.$emit('navig','个性推荐')
			this.$store.dispatch('catalog','music')
		},
		
	}
</script>

<style scoped>
	.recommend {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 175px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	img {
		top: 0;
		width: 100%;
		height: 100%;
	}

	.recommend-list ul {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: auto;
		margin-top: 10px;
		justify-content: space-between;
	}

	.recommend-list>div {
		margin-top: 20px;
	}

	.recommend-list>div>span {
		font-size: 18px;
		font-weight: 600;
		cursor: pointer;
	}

	.recommend {
		width: 100%;
		height: auto;
	}

	#recommend li {
		flex: 0 0 18.5%;
		margin-bottom: 10px;
		font-size: 14px;
		cursor: pointer;
	}

	#hot {
		width: 100%;
		height: 290px;
	}


	#hot li {
		flex: 0 0 49%;
		height: 67px;
		display: flex;
		border-radius: 4px;
		float: left;
		margin-bottom: 20px;
	}

	#hot li:hover {
		background-color: #eaeaea;
	}


	#exclusive {
		width: 100%;
		max-height: 280px;
		min-height: 240px;
	}

	#exclusive li {
		flex: 0 0 32%;
		font-size: 14px;
		display: flex;
		flex-direction: column;
		border-radius: 4px;
		cursor: pointer;
	}

	#newest {
		width: 100%;
		height: 180px;
		margin-bottom: 20px;
	}

	#newest li {
		flex: 0 0 32%;
		height: 42px;
		display: flex;
		margin-bottom: 15px;
		border-radius: 4px;
	}

	#newest li:hover {
		background-color: #eaeaea;
	}

	#mv {
		width: 100%;
		max-height: 245px;
		min-height: 222px;
		margin-bottom: 30px;
	}

	#mv li {
		flex: 0 0 24%;
		border-radius: 4px;
		width: 100%;
		cursor: pointer;
	}
</style>

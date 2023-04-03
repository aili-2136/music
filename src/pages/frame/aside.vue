<template>
	<div class="aside-box">
		<div class="content" v-if="!isplay">
			<div class="left">
				<ul id="Find">
					<li id="one" @click="music('music')" :class="{'click':click=='music'}">发现音乐</li>
					<li @click="podcast('podcast')" :class="{'click':click=='podcast'}">播客</li>
					<li @click="video('video')" :class="{'click':click=='video'}">视频</li>
					<li @click="privatefm('privatefm')" :class="{'click':click=='privatefm'}">私人FM</li>
				</ul>
				<ul id="my">
					<li id="one">我的音乐</li>
					<li @click="mylive('mylive')" :class="{'my':click=='mylive'}"><i class="iconfont icon-aixin"
							style="margin-right: 2px;"></i>我喜欢的音乐</li>
					<li @click="recently('recently')" :class="{'my':click=='recently'}"><i class="iconfont icon-shijian"
							style="margin-right: 2px;"></i>最近播放</li>
				</ul>
				<ul id="found">
					<li @click="more">创建的歌单
						<i :class="[ismore?'iconfont icon-24gf-play':'iconfont icon-sanjiaoxing']" id="yyy"></i>
					</li>
					<i id="jjj" class="iconfont icon-jiahao1" @click="newGd"></i>
					<li v-for="(time,index) in mySongList" id="new" @click="xjgd(index)" :class="{'click':click==index}">
						<i class="iconfont icon-swticonyinle2"></i>
						{{time.name}}
					</li>
				</ul>
			</div>
			<div class="right">
				<div class="ov">
					<div class="content">
						<div class="router">
							<div class="search" v-if="issearch" @mousedown.prevent>
								<search-box></search-box>
							</div>
							<keep-alive>
								<router-view name="music"></router-view>
								<router-view name="podcast"></router-view>
								<router-view name="video"></router-view>
								<router-view name="privateFM"></router-view>
								<router-view name="recentlyPlay"></router-view>
								<router-view name="mylive"></router-view>
								<router-view name="page"></router-view>
								<router-view name="Details"></router-view>
								<router-view name="podcastPage"></router-view>
								<router-view name="search"></router-view>
							</keep-alive>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="play" v-if="isplay">
			<router-view name="play">

			</router-view>
		</div>
		<div class="newGD" v-show="isfound">
			<found @onclose='onclose' @onfound='onfound'></found>
		</div>
	</div>
</template>

<script>
	import play from '../../pages/details/videoormv/play.vue'
	import searchbox from '../../components/search/search-box.vue'
	import found from '../../components/foundGd/found.vue'
	import {
		getPlaylistCreate,
		getPlaylistDelete
	} from '../../plugins/song.js'
	export default {
		name: 'aside-box',
		components: {
			'play': play,
			'search-box': searchbox,
			'found': found
		},
		data() {
			return {
				click: 'music',
				ismore: false,
				isfound: false, //创建歌单
				mySongList:[],	//歌单
			}
		},
		methods: {
			music(type) {
				this.$store.dispatch('catalog',type)
				this.$router.push({
					name: 'gomusic'
				})
			},
			podcast(type) {
				this.$store.dispatch('catalog',type)
				this.$router.push({
					name: 'gopodcast'
				})
			},
			video(type) {
				this.$store.dispatch('catalog',type)
				this.$router.push({
					name: 'govideo'
				})
			},
			privatefm(type) {
				this.$store.dispatch('catalog',type)
				this.$router.push({
					name: 'goprivateFM'
				})
			},
			recently(type) {
				this.$store.dispatch('catalog',type)
				this.$router.push({
					name: 'gorecentlyPlay'
				})
			},
			mylive(type) {
				this.$store.dispatch('catalog',type)
				this.$router.push({
					name: 'gomylive'
				})
			},
			more() {
				this.ismore = !this.ismore
			},
			back(value) {
				this.click = value
			},
			//新建歌单
			newGd() {
				this.isfound = true
			},
			//关闭
			onclose(value) {
				this.isfound = false
			},
			//提交
			onfound(value) {
				//创建歌单
				// this.getPlaylistCreate({
				// 	name:value.name,
				// 	privacy:value.pri
				// }).then(res=>{
				// 	this.mySongList.push(value)
				// })
				this.mySongList.push(value)
			},
			xjgd(id){
				this.click=id
				
			}
		},
		mounted() {
			this.$router.push({
				name: 'gomusic'
			})
		},
		computed: {
			getcatalog() {
				return this.$store.state.catalog
			},
			ispage() {
				return this.$store.state.page
			},
			isplay() {
				return this.$store.state.play
			},
			issearch() {
				return this.$store.state.search
			},
			iskeyword() {
				return this.$store.state.keyword
			}
		},
		watch: {
			getcatalog: {
				handler(value) {
					this.click = value
				}
			},
			iskeyword: {
				deep: true,
				handler(value) {
					if (value !== null) {
						switch (value.open) {
							case true:
								this.$router.push({
									name: 'gosearch'
								})
								break;
							default:
								break;
						}
					}
				}
			},
			ispage: {
				deep: true,
				handler(value) {
					if (value !== null) {
						switch (value.type) {
							case '歌单':
								this.$router.push({
									name: 'gopage'
								})
								break;
							case '歌手':
								this.$router.push({
									name: 'goDetails'
								})
								break;
							case '播客':
								this.$router.push({
									name: 'gopodcastPage'
								})
								break;
							case '视频':
								this.$router.push({
									name: 'goplay'
								})
								break;
							case 'MV':
								this.$router.push({
									name: 'goplay'
								})
								break;
							default:
								break;
						}
					}
				}
			}
		}
	}
</script>

<style scoped>
	.aside-box {
		width: 100%;
		height: 100%;
	}

	.content {
		width: 100%;
		height: 100%;
		background-color: #ffffff;
		display: flex;
	}

	.left {
		width: 175px;
		height: 100%;
		border-right: 2px #E0E0E0 solid;
	}

	ul {
		margin-top: 10px;
	}	
	
	#Find li,
	#my li,
	#found li {
		width: 158px;
		height: 30px;
		margin-left: 10px;
		padding-left: 5px;
		border-radius: 2px;
		margin-bottom: 3px;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 30px;
		cursor: pointer;
	}

	#Find li:hover{
		background-color:#f6f6f7 !important;
	}
	
	#my #one:hover{
		background-color:#ffffff !important;
	}
	
	#my li:hover{
		background-color: #f6f6f7 !important;
	}
	
	#new:hover{
		background-color: #f6f6f7 !important;
	}

	#Find li {
		margin-bottom: 3px;
	}

	#found li:nth-child(1) {
		font-size: 12px;
		color: #9f9f9f;
	}

	#found li:nth-child(1):hover #yyy {
		color: #595959;
	}

	#my #one {
		font-size: 12px;
		color: #9f9f9f;
	}

	.click {
		background-color: #f6f6f7 !important;
		font-size: 15px !important;
		font-weight: 600;
	}

	.my {
		background-color: #f6f6f7 !important;
	}

	.right {
		flex: 1;
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
		width: 4px;
		border-radius: 4px;
		background-color: #ffffff;
	}

	.ov::-webkit-scrollbar-thumb {
		border-radius: 4px;
		height: 2px;
		background-color: #e1e1e1;
	}

	.content {
		width: 100%;
		height: 100%;
	}

	.router {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.play {
		width: 100%;
		height: 100%;
	}

	.search {
		position: fixed;
		z-index: 9;
		width: 312px;
		margin: 5px 0 0 20px;
		height: 70%;
		background-color: #ffffff;
		box-shadow: 0px 0px 2px 2px #f7f7f7;
		border-radius: 5px;
	}

	#yyy {
		display: inline-block;
		text-align: center;
		font-size: 12px;
		color: #d4d4d4;
		transform: scale(0.5);
	}


	#jjj {
		margin-top: -30px;
		float: right;
		margin-right: 10px;
	}

	#hint {
		z-index: 9;
		position: relative;
		float: right;
		margin-top: -5px;
		margin-right: -28px;
		width: 40px;
		height: 18px;
		line-height: 16px;
		border: 1px #000 solid;
		font-size: 14px;
		background-color: #fff;
		font-variant-caps: all-small-caps;
		display: none;
	}

	.newGD {
		z-index: 9;
		width: 418px;
		height: 200px;
		position: absolute;
		top: 30%;
		left: 40%;
	}
	
	#new{
		font-size: 12px;
	}
	
	#new i{
		font-size: 12px;
		font-weight:500;
	}
</style>

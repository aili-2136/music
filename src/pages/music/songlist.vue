<template>
	<div class="songlist">
		<loading></loading>
		<div v-if="complete" class="boutique" :style="{background:'url('+highqualit.img+')'}">				
				<div id="content">
					<div id="img">
						<img :src="highqualit.img" alt="">
					</div>
					<div id="text">
						<span id="p1" style="cursor: pointer;">
							<p class="iconfont icon-huangguan"></p>
							<span>精品歌单</span>
						</span>
						<span id="p2">
							<p>{{highqualit.name}}</p>
						</span>
					</div>	
				</div>	

		</div>
		<div v-if="complete" class="label">
			<!-- 标签导航 -->
			<div style="cursor: pointer;">
				<span @click="none">{{dome}}</span>
				<p class="fas fa-angle-right"></p>
			</div>
			<div id="table">
				<span v-for="(item,index) in hotarr" :key="index" @click="show(item.name)"
				 style="cursor: pointer;" :class="{'table':dome==item.name}">
					{{item.name}}
				</span>
			</div>
		</div>
		<!-- 隐藏的导航 -->
		<my-label :obj='labelobj' :label='label' @onclick='onclick' v-show="disp" :dome='dome'></my-label>

		<div v-if="complete" class="content" :style="mt">
			<!-- 内容 -->
			<ul>
				<li v-for="(item,index) in playlist" :key="index" @click="getpage(item.id,'歌单')">
					<song-list :obj='songlistobj' :params='[
						item.coverImgUrl,item.playCount,item.name
					]'></song-list>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {
		getPlaylistCatlist,
		getPlaylistHot,
		getTopPlaylist,
		getPlaylistHighqualityTags,
		getTopPlaylistHighquality
	} from '../../plugins/song.js'
	import mylabel from '../../components/basics/mylabel.vue'
	import songlist from '../../components/basics/songlist.vue'
	import loading from '../../components/loading/loading.vue'
	export default {
		name: 'songlist',
		components:{
			'my-label':mylabel,
			'song-list':songlist,
			'loading':loading
		},
		data() {
			return {
				complete:false,		//数据未加载完成时
				dome: '全部歌单',
				songlistobj:{
					count:true,
					play:true,
					location:'rightlow'
				},
				sub: [], //具体分类
				hotarr: [], //热门分类
				playlist: [], //歌单
				highqualitytags: [], //精品歌单分类
				highqualit: {
					data:[],
					name:'',
					img:''
				}, 
				labelobj:['语种','风格','场景','情感','主题'],
				label:[
					[], //语种
					[], //风格
					[], //场景
					[], //情感
					[], //主题
				],
				disp: false, //判断隐藏导航是否出现
				mt: {},		
			}
		},
		mounted() {
			this.bus.$emit('loading',true)
			//获取分类和具体分类
			getPlaylistCatlist().then(res => {
				this.sub = res.data.sub
				//将具体分类划分开
				const a = () => {
					for (let i = 0; i < this.sub.length; i++) {
						if (this.sub[i].category === 0) {
							this.label[0].push(this.sub[i].name)
						}
						if (this.sub[i].category === 1) {
							this.label[1].push(this.sub[i].name)
						}
						if (this.sub[i].category === 2) {
							this.label[2].push(this.sub[i].name)
						}
						if (this.sub[i].category === 3) {
							this.label[3].push(this.sub[i].name)
						}
						if (this.sub[i].category === 4) {
							this.label[4].push(this.sub[i].name)
						}
					}
				}
				a()

			})


			//获取热门分类
			getPlaylistHot().then(res => {
				this.hotarr = res.data.tags
			})


			//获取歌单
			getTopPlaylist({
				limit: 100
			}).then(res => {
				this.bus.$emit('loading',false)
				this.complete=true
				this.playlist = res.data.playlists
			})

			//获取精品歌单标签列表
			getPlaylistHighqualityTags().then(res => {
				this.highqualitytags = res.data.tags
			})

			//获取精品歌单
			getTopPlaylistHighquality().then(res => {
				this.highqualit.data = res.data.playlists
				this.highqualit.img=res.data.playlists[0].coverImgUrl
				this.highqualit.name=res.data.playlists[0].name
			})

		},
		methods: {
			onclick(value){
				this.dome=value
			},
					
			//根据标签获取歌单
			show(name) {
				this.dome = name
				this.disp=false
			},
			none() {
				this.disp = !this.disp
				if (this.disp === true) {
					this.mt = {
						marginTop: '-658px'
					}
				} else {
					this.mt = {}
				}
			},
			getpage(id,type){
				this.$store.dispatch('page',{
					id:id,
					type:type
				})
			}
		},
		watch:{
			dome:{
				handler(value){
					this.disp=false
					if (this.disp === true) {
						this.mt = {
							marginTop: '-679px'
						}
					} else {
						this.mt = {}
					}
					getTopPlaylist({
						limit: 100,
						cat: value
					}).then(res => {
						this.playlist = res.data.playlists
					})
					
					//根据标签获取精品歌单	
					getTopPlaylistHighquality({
						limit: 100,
						cat: value
					}).then(res => {
						this.highqualit.data = res.data.playlists
						this.highqualit.img=res.data.playlists[0].coverImgUrl
						this.highqualit.name=res.data.playlists[0].name
					})
				}
			},
		},
		activated() {
			this.bus.$emit('navig','歌单')
		}
	}
</script>

<style scoped>
	.songlist {
		display: flex;
		flex-direction: column;
	}

	img {
		top: 0;
		width: 100%;
		height: 100%;
	}

	.boutique {
		height: 150px;
		width: 100%;
		display: flex;
		align-items: center;
		border-radius: 5px;
		background-repeat: no-repeat !important;
		background-size: cover !important;
		background-position: 0% 52%!important;		
		position: relative;
	}

	
	
		.boutique #content{
			width: 100%;
			height: 101%;
			display: flex;
			border-radius: 5px;
			backdrop-filter: blur(20px);
			align-items: center;
			z-index: 3;
		}
		
		
	.boutique #content #img {
		width: 125px;
		height: 125px;
		margin-left: 15px;
		border-radius: 5px;
		
	}

	.boutique #content #img img {
		border-radius: 5px;
		
	}

	.boutique #content #text {
		flex: 1;
		margin-left: 15px;
		position: relative;
	
	}

	.boutique #content #text #p1 {
		display: block;
		width: 88px;
		height: 26px;
		border: 1px #E7AA5A solid;
		border-radius: 13px;
		margin-top: -45px;
		color: #E7AA5A;
		
	}

	.boutique #content #text #p1 p {
		font-size: 14px;
		margin-left: 4px;
		margin-top: 3px;
	
	}

	.boutique #content #text #p1 span {
		display: block;
		font-size: 12px;
		margin: -19px 0 0 25px;
	
	}

	.boutique #content #text #p2 {
		position: absolute;
		top: 10px;
		display: block;
		height: 16px;
		color: #ffffff;

	} 


	.label {
		display: flex;
		height: 54px;
		width: 100%;
		align-items: center;
		justify-content: space-between;
	}

	.label div:nth-child(1) {
		width: 88px;
		height: 24px;
		font-size: 14px;
		line-height: 24px;
		border: 1px #d9d9d9 solid;
		border-radius: 12px;
		text-align: center;
	}

	.label div p {
		margin-left: 5px;
		color: #7d7d7d;
	}

	.label > #table {
		width: 460px;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		display: flex;		
	}

	.label > #table span{
		font-size: 12px;
		display: inline-block;
		transform: scale(0.9);
		color: #676767;
		padding: 1.5px 6px 0 6px;
		border-radius: 19px;
	}
	
	.table{
		color: #FF7AB5 !important;
		background-color: #FFF8FA !important;
		
	}
	
	
	.content {
		flex: 1;
	}

	.content ul {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
		justify-content: space-between;
	}

	@media screen and (min-width:960px){
		.content li {
			flex: 0 0 19%;
			margin-bottom: 10px;
			height: auto;
		}
	}

	@media screen and (max-width:960px){
		.content li {
			flex: 0 0 23.5%;
			margin-bottom: 10px;
			height: auto;
		}
	}
	
</style>

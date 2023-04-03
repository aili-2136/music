<template>
	<div class="vi-video">
		<div id="tag">
			<p @click="tag">{{table.name}}<i class="iconfont icon-fanhui2"></i></p>
			<ul>
				<li v-for="(item,index) in categorylist" @click="tagli(item.id,item.name)">
					<span :class="{'tag':table.name==item.name}">{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="box" v-show="isbox">
			<menus :params='grouplist' @onclick='onclick' :text='table.name'></menus>
		</div>
		
		<div class="content">
			<ul :class="{'shang':isbox}" class="viofmv" v-infinite-scroll="load">
				<li v-for="(item,index) in videolist.data" :key="index" @click="getpage(videolist.uid[index],'视频')">
					<video-mv :obj='videoobj' :params='[
						item.data.coverUrl,item.data.title,videolist.nickname[index],
						videolist.time[index],videolist.gktime[index]
					]'></video-mv>			
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {
		getVideoGroupList,
		getVideoCategoryList,
		getVideoGroup,
		getVideoTimelineAll
	} from '../../plugins/videos.js'
	import menus from '../../components/basics/menus.vue'
	import videoormv from '../../components/basics/videoormv.vue'
	export default{
		name:'vi',
		components:{
			'menus':menus,
			'video-mv':videoormv
		},
		data() {
			return {
				cookie: localStorage.getItem('cookie'),
				grouplist: [],
				videoobj:{
					type:'video',
					count:true,
					play:false,
					time:true,
				},
				categorylist: [{
						id: 58100,
						name: '现场'
					},
					{
						id: 60100,
						name: '翻唱'
					},
					{
						id: 1101,
						name: '舞蹈'
					},
					{
						id: 58101,
						name: '听BGM'
					},
					{
						id: 1000,
						name: 'MV'
					},
					{
						id: 2100,
						name: '生活'
					},
					{
						id: 2103,
						name: '游戏'
					},
					{
						id: 57104,
						name: 'ACG音乐'
					},
					{
						id: 1105,
						name: '最佳饭制'
					}
				],
				table: {
					id: -1,
					name: '全部视频'
				},
				isbox: false,
				videolist: {
					data: [],
					time: [],
					gktime: [],
					nickname: [],
					uid: [],
				}, //视频
				pages: 1, //页数		
			}
		},
		methods:{
			getpage(id,type){
				this.$store.dispatch('page',{
					id:id,
					type:type
				})
				this.$store.dispatch('play',true)
			},
			tag(){
				this.isbox = !this.isbox
			},
			tagli(id,name){
				this.videolist.data = []
				this.videolist.gktime = []
				this.videolist.nickname = []
				this.videolist.time = []
				this.videolist.uid = []
				if(this.isbox){
					this.isbox=!this.isbox
				}
				this.table.id=id
				this.table.name=name
			},
			onclick(value){
				if(this.isbox){
					this.isbox=!this.isbox
				}
				this.table.name=value
			},
			load(){
				if (this.table.id == -1) {
					getVideoTimelineAll({
						offset: this.pages,
						cookie: this.cookie
					}).then(res => {
						res.data.datas.forEach(a => {
							if (a.data.liveData == undefined) {
								this.videolist.data.push(a)
								this.videolist.nickname.push(a.data.creator
									.nickname)
								this.videolist.uid.push(a.data.vid)
								this.videolist.gktime.push(a.data.playTime)
								this.videolist.time.push(a.data.durationms)
							}
						})
						this.pages++
					})
				} else {
					getVideoGroup({
						id: this.table.id,
						offset: this.pages,
						cookie: this.cookie
					}).then(
						res => {
							res.data.datas.forEach(a => {
								if (a.data.liveData == undefined) {
									this.videolist.data.push(a)
									this.videolist.nickname.push(a.data.creator
										.nickname)
									this.videolist.uid.push(a.data.vid)
									this.videolist.gktime.push(a.data.playTime)
									this.videolist.time.push(a.data.durationms)
								}
							})
							this.pages++
						})
				}
			}
		},
		watch:{
			table:{
				deep:true,
				handler(value){
					if (this.value.id == -1) {
						getVideoTimelineAll({
							offset: 0,
							cookie: this.cookie
						}).then(res => {
							res.data.datas.forEach(a => {
								if (a.data.liveData == undefined) {
									this.videolist.data.push(a)
									this.videolist.nickname.push(a.data.creator
										.nickname)
									this.videolist.uid.push(a.data.vid)
									this.videolist.gktime.push(getwang1(a.data.playTime))
									this.videolist.time.push(getmiao(a.data.durationms))
								}
							})
						})
					} else {
						getVideoGroup({
							id: this.value.id,
							offset: 0,
							cookie: this.cookie
						}).then(
							res => {
								res.data.datas.forEach(a => {
									if (a.data.liveData == undefined) {
										this.videolist.data.push(a)
										this.videolist.nickname.push(a.data.creator
											.nickname)
										this.videolist.uid.push(a.data.vid)
										this.videolist.gktime.push(getwang1(a.data.playTime))
										this.videolist.time.push(getmiao(a.data.durationms))
									}
								})
							})
					}
				}
			}
		},
		created() {
			getVideoGroupList().then(res => {
				this.grouplist = res.data.data
			})
		
			getVideoTimelineAll({
				offset: 0,
				cookie: this.cookie
			}).then(res => {
				res.data.datas.forEach(a => {
					if (a.data.liveData == undefined) {
						this.videolist.data.push(a)
						this.videolist.nickname.push(a.data.creator
							.nickname)
						this.videolist.uid.push(a.data.vid)
						this.videolist.gktime.push(a.data.playTime)
						this.videolist.time.push(a.data.durationms)
					}
				})
		
			})
		
		},
		activated() {
			this.$store.dispatch('catalog','video')
		}
	}
</script>

<style scoped>
	.vi-video{
		width: 100%;
		height: auto;
	}
	
	.vi-video #tag {
		width: 100%;
		height: 64px;
		display: flex;
		justify-content: space-between;
	}
	
	.vi-video #tag>p {
		width: 90px;
		height: 24px;
		line-height: 24px;
		margin-top: 20px;
		text-align: center;
		border: 1px #D9D9D9 solid;
		border-radius: 12px;
		font-size: 13px;
		color: #373737;
		cursor: pointer;
	}
	
	.vi-video #tag>p:hover {
		background-color: #F2F2F2;
	}
	
	.vi-video #tag p i {
		font-size: 13px;
		color: #373737;
	}
	
	.vi-video #tag ul li {
		line-height: 64px;
		font-size: 12px;
		transform: scale(0.9);
		float: left;
		margin-left: 10px;
	}
	
	.vi-video #tag ul li span {
		padding: 1px 10px 2px 10px;
		color: #676767;
		border-radius: 17px;
		cursor: default;
	}
	
	.tag {
		background-color: #FDEBEB;
		color: #FF7A9E !important;
	}
	
	.s {
		border-radius: 17px;
		color: #EC4141;
		background-color: #FDEBEB;
	}
	
	.box{
		position: relative;
		z-index: 2;
		width: 575px;
		height: 435px;
	}
	
	.content >ul {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.shang {
		margin-top: -435px;
	}
	
	@media screen and (min-width:1180px) {
		 .content>ul li {
			flex: 0 0 23.5%;
			margin-bottom: 10px;
		}
	}
	
	@media screen and (max-width:1180px) {
		.content>ul li {
			flex: 0 0 32%;
			margin-bottom: 10px;
		}
	}
	
	
</style>
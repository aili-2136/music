<template>
	<div class="mylive">
		<div class="mylive-top">
			<div class="mylive-info">
				<info :obj='myliveobj' :params='mylive'></info>
			</div>
		</div>
		<div class="mylive-table" v-cloak>
			<navigation :list='navlist' @onclick='onclick' :type='navtype'></navigation>
		</div>
		<div class="mylive-content">
			<my-song-list :params='songlist' v-if="cut==0"></my-song-list>
			<my-comment v-if="cut==1" :newcomment='newcomment' :hotcomment='hotcomment'></my-comment>
			<my-collector v-if="cut==2" :collectors="collectors"></my-collector>
		</div>
	</div>
</template>

<script>
	import srcimg from '../../../public/image/a2.jpg'
	import {readData} from '../../general/regular.js'
	import info from '../../components/songlist/info.vue'
	import navigation from '../../components/basics/navigation.vue'
	import mysonglist from './mysonglist.vue'
	import mycomment from './mycomment.vue'
	import mycollector from './mycollector.vue'
	export default {
		name: 'mylive',
		components: {
			'info': info,
			'navigation': navigation,
			'my-song-list':mysonglist, 
			'my-comment':mycomment,
			'my-collector':mycollector
		},
		data() {
			return {
				navlist: ['歌曲列表','评论(0)','收藏者'],
				navtype:'details',
				myliveobj: {
					type: '歌单'
				},
				mylive:{
					img:srcimg,			//歌单背景图
					name:'我喜欢的音乐',		//歌单名
					nickimg:null,		//歌单创建者头像
					nickname:'未登录>',	//歌单创建者
					cjtime:'',		//创建时间
					bookedCount:0, //收藏人数
					playCount:0, //播放人数
					shareCount: 0 ,//分享人数
					tags:null,		//歌单标签
					songlength:'',	//歌曲数
					front:null,		//开头内容
					followup:null,	//后续内容
					iszhansi:null	//是否展示后续
				},
				gdparticulars: '', //歌单详情
				gdstate: {				
					commentCount: '', //评论数									
				},							
				cut:0,		//切换
				songlist: { //全部歌曲
					privileges: [],
					songs: []
				},
				isc: '', //li点击之后添加样式
				songtime: [], //歌曲时长
				hotcomment: '', //热门评论
				newcomment: '', //最新评论
				collectors:[],	//歌单收藏者
			}
		},
		computed: {
			// ismylive() {
			// 	return JSON.parse(JSON.stringify(this.$store.state.mylive))
			// }
		},
		methods: {
			onclick(value) {
				this.cut=value
			},
		},
		watch: {
			// ismylive: {
			// 	deep: true,
			// 	handler(value) {
			// 		this.myliveobj.type = value.type

			// 		getPlaylistDetail({
			// 			id: value.id
			// 		}).then(res => {
			// 			this.mylive.img=res.data.playlist.coverImgUrl
			// 			this.mylive.name=res.data.playlist.name
			// 			this.mylive.nickimg= res.data.playlist.creator.avatarUrl
			// 			this.mylive.nickname = res.data.playlist.creator.nickname
			// 			this.mylive.followup = getaddbr(res.data.playlist.description).t
			// 			this.mylive.front= getaddbr(res.data.playlist.description).d
			// 			this.mylive.iszhansi = getaddbr(res.data.playlist.description).zhansi
			// 			this.mylive.cjtime = gettime(res.data.playlist.createTime)
			// 		})
			// 		getPlaylistDetailDynamic({
			// 			id: value.id
			// 		}).then(res => {
			// 			this.mylive.bookedCount = getwang(res.data.bookedCount)
			// 			this.navlist=['歌曲列表','评论('+(res.data.commentCount)+')','收藏者']
			// 			this.mylive.playCount = getwang(res.data.playCount)
			// 			this.mylive.shareCount = getwang(res.data.shareCount)
			// 		})
			// 		getPlaylistTrackAll({
			// 			id: value.id
			// 		}).then(res => {
			// 			this.songlist.privileges = res.data.privileges
			// 			this.songlist.songs = res.data.songs
			// 			this.mylive.songlength=res.data.songs.length
			// 			res.data.songs.forEach(a => {
			// 				this.songtime.push(getmiao(a.dt))
			// 			})
			// 		})
			// 		getCommentNew({
			// 			id: value.id,
			// 			type: 2,
			// 			myliveSize: 10,
			// 			sortType: 2
			// 		}).then(res => {
			// 			this.hotcomment = res.data.data
			// 		})
			// 		getCommentNew({
			// 			id: value.id,
			// 			type: 2,
			// 			myliveSize: 60,
			// 			sortType: 3
			// 		}).then(res => {
			// 			this.newcomment = res.data.data
			// 		})
			// 		getPlaylistSubscribers({
			// 			id:value.id
			// 		}).then(res=>{
			// 			this.collectors=res.data.subscribers
			// 		})
			// 	}
			// }
		},
		mounted() {
			let musicIds=readData('livemusic')
			let idStr=musicIds.toString()
			this.mylive.songlength=musicIds.length
		},
	}
</script>

<style scoped>
	.mylive {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	.mylive-top {
		width: 100%;
		height: auto;
		display: flex;
	}

	.mylive-info {
		width: 100%;
		height: auto;
		margin: 25px 28px 0 28px;
	}

	.mylive-table {
		width: 100%;
		height: auto;
		margin-top: 10px;
	}
	
	.mylive-content{
		flex: 1;
		width: 100%;
		height: 100%;
	}
</style>

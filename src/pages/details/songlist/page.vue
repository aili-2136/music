<template>
	<div class="page">
		<div class="page-top">
			<div class="page-info">
				<info :obj='pageobj' :params='page'></info>
			</div>
		</div>
		<div class="page-table" v-cloak>
			<navigation :list='navlist' @onclick='onclick' :type='navtype'></navigation>
		</div>
		<div class="page-content">
			<page-song-list :params='songlist' v-if="cut==0"></page-song-list>
			<comment v-if="cut==1" :newcomment='newcomment' :hotcomment='hotcomment'></comment>
			<collector v-if="cut==2" :collectors="collectors"></collector>
		</div>
	</div>
</template>

<script>
	import {
		getPlaylistDetail,
		getPlaylistDetailDynamic,
		getPlaylistTrackAll,
		getPlaylistSubscribers
	} from '../../../plugins/particulars.js'
	import {
		gettime,
		getwang,
		getaddbr,
		getmiao,
		gettime1
	} from '../../../general/regular.js'
	import {
		getCommentNew
	} from '../../../plugins/comment.js'
	import info from '../../../components/songlist/info.vue'
	import navigation from '../../../components/basics/navigation.vue'
	import songlist from './songlist.vue'
	import comment from './comment.vue'
	import collector from './collector.vue'
	export default {
		name: 'page',
		components: {
			'info': info,
			'navigation': navigation,
			'page-song-list':songlist,
			'comment':comment,
			'collector':collector
		},
		data() {
			return {
				navlist: [],
				navtype:'details',
				pageobj: {
					type: ''
				},
				page:{
					img:'',			//歌单背景图
					name:'',		//歌单名
					nickimg:'',		//歌单创建者头像
					nickname:'',	//歌单创建者
					cjtime:'',		//创建时间
					bookedCount: '', //收藏人数
					playCount: '', //播放人数
					shareCount: '' ,//分享人数
					tags:[],		//歌单标签
					songlength:'',	//歌曲数
					front:'',		//开头内容
					followup:'',	//后续内容
					iszhansi:''		//是否展示后续
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
			ispage() {
				return JSON.parse(JSON.stringify(this.$store.state.page))
			}
		},
		methods: {
			onclick(value) {
				this.cut=value
			},
		},
		watch: {
			ispage: {
				immediate:true,
				deep: true,
				handler(value) {
					this.pageobj.type = value.type

					getPlaylistDetail({
						id: value.id
					}).then(res => {
						this.page.img=res.data.playlist.coverImgUrl
						this.page.name=res.data.playlist.name
						this.page.nickimg= res.data.playlist.creator.avatarUrl
						this.page.nickname = res.data.playlist.creator.nickname
						this.page.followup = getaddbr(res.data.playlist.description).t
						this.page.front= getaddbr(res.data.playlist.description).d
						this.page.iszhansi = getaddbr(res.data.playlist.description).zhansi
						this.page.cjtime = gettime(res.data.playlist.createTime)
					})
					getPlaylistDetailDynamic({
						id: value.id
					}).then(res => {
						this.page.bookedCount = getwang(res.data.bookedCount)
						this.navlist=['歌曲列表','评论('+(res.data.commentCount)+')','收藏者']
						this.page.playCount = getwang(res.data.playCount)
						this.page.shareCount = getwang(res.data.shareCount)
					})
					getPlaylistTrackAll({
						id: value.id
					}).then(res => {
						this.songlist.privileges = res.data.privileges
						this.songlist.songs = res.data.songs
						this.page.songlength=res.data.songs.length
						res.data.songs.forEach(a => {
							this.songtime.push(getmiao(a.dt))
						})
					})
					getCommentNew({
						id: value.id,
						type: 2,
						pageSize: 10,
						sortType: 2
					}).then(res => {
						this.hotcomment = res.data.data
					})
					getCommentNew({
						id: value.id,
						type: 2,
						pageSize: 60,
						sortType: 3
					}).then(res => {
						this.newcomment = res.data.data
					})
					getPlaylistSubscribers({
						id:value.id
					}).then(res=>{
						this.collectors=res.data.subscribers
					})
				}
			}
		},
		mounted() {},
	}
</script>

<style scoped>
	.page {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	.page-top {
		width: 100%;
		height: auto;
		display: flex;
	}

	.page-info {
		width: 100%;
		height: auto;
		margin: 25px 28px 0 28px;
	}

	.page-table {
		width: 100%;
		height: auto;
		margin-top: 10px;
	}
	
	.page-content{
		flex: 1;
		width: 100%;
		height: 100%;
	}
</style>

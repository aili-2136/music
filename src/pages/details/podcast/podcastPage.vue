<template>
	<div class="podcast-page">
		<div class="podcast-info">
			<info :obj='infoobj' :params='podcast'></info>
		</div>
		<div class="podcast-nav">
			<navigation :type='navtype' :list='navlist' @onclick='onclick'></navigation>
		</div>
		<div class="podcast-content">
			<voice v-if="cut==0" :params='podcastlist'></voice>
			<collect v-if="cut==1" :params='collect'></collect>
			<recommend v-if="cut==2" :params='recommendlist'></recommend>
		</div>
	</div>
</template>

<script>
	import {
		getDjDetail,
		getDjProgramDetail,
		getDjProgram,
		getDjSubscriber,
		getDjRecommend
	} from '../../../plugins/dj.js'
	import {
		getaddbr
	} from '../../../general/regular.js'
	import navigation from '../../../components/basics/navigation.vue'
	import info from '../../../components/songlist/info.vue'
	import collect from './collect.vue'
	import voice from './voice.vue'
	import recommend from './recommend.vue'
	export default {
		name: 'podcastPage',
		components: {
			'info': info,
			'navigation':navigation,
			'voice':voice,
			'collect':collect,
			'recommend':recommend
		},
		data() {
			return {
				infoobj: {
					type: '播客',
				},
				podcast: {
					img: '', //播客背景图
					name: '', //播客创建者
					nickimg: '', //作者头像
					nickname: '', //作者名
					bookedCount: '', //收藏数
					shareCount: '', //分享数
					front: '', //开头内容
					followup: '', //后续内容
					category: '', //播客类型
					iszhansi: 1 //是否有后续内容要展示				
				}, //播客数据
				navtype:'details',
				navlist:[],
				cut:0,
				podcastlist:[],		//声音列表
				collect:[],			//收藏者		
				recommendlist:[]	//推荐
			}
		},
		methods: {
			onclick(value){
				this.cut=value
			}
		},
		computed: {
			ispage() {
				return JSON.parse(JSON.stringify(this.$store.state.page))
			}
		},
		deactivated(){
			this.$store.dispatch('more',true)
		},
		watch: {
			ispage: {
				immediate:true,
				deep: true,
				handler(value) {
					getDjDetail({
						rid: value.id
					}).then(res => {
						this.podcast.img = res.data.data.picUrl
						this.podcast.name = res.data.data.name
						this.podcast.nickimg = res.data.data.dj.avatarUrl
						this.podcast.nickname = res.data.data.dj.nickname
						this.podcast.bookedCount = res.data.data.subCount
						this.podcast.shareCount = res.data.data.shareCount
						this.podcast.category = res.data.data.category
						this.podcast.front = getaddbr(res.data.data.desc).d
						this.podcast.followup = getaddbr(res.data.data.desc).t
						this.podcast.iszhansi = getaddbr(res.data.data.desc).zhansi
						this.navlist=['声音('+res.data.data.programCount+')','收藏者('+res.data.data.subCount+')','推荐']
					})
					
					getDjProgram({rid:value.id}).then(res=>{
						this.podcastlist=res.data.programs
					})
					
					getDjSubscriber({id:value.id}).then(res=>{
						this.collect=res.data.subscribers
					})
					
					getDjRecommend().then(res=>{
						this.recommendlist=res.data.djRadios
					})
					
				}
			}
		},
	}
</script>

<style scoped>
	.podcast-page {
		width: 100%;
		height: auto;
	}
	
	.podcast-info{
		height: auto;
		margin: 25px 28px 0 28px;
	}
	
	.podcast-nav{
		height: auto;
		margin-left: -8px;
	}
	
	.podcast-content{
		width: 100%;
		height: auto;
		margin-top: 15px;
	}
</style>

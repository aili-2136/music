<template>
	<div class="homepage">
		<loading></loading>
		<div class="homepage-content">
			<!-- <div class="banner">
				<div id="banner">
					<el-carousel height="150px" direction="vertical" :autoplay="true" indicator-position='none'>
						<el-carousel-item v-for="(item,index) in ban" :key="index">
							<img :src="item.pic" alt="">
						</el-carousel-item>
					</el-carousel>
				</div>
				<div id="classify">

				</div>
			</div> -->
			<div id="tulist">
				<p>猜你喜欢</p>
				<ul>
					<li v-for="(item,index) in personalize.data" @click="getpage(item.id,'播客')">
						<song-list :obj='liveobj' :params='[
							item.picUrl,item.subCount,item.name,item.category
						]'></song-list>
					</li>
				</ul>
			</div>
			<div id="list">
				<p @click="gomore('情感',3)">情感<i class="iconfont icon-fanhui2"></i></p>
				<ul>
					<li v-for="(item,index) in emotion.particulars">
						<rectangle :obj='rectangleobj' :params='[
							item.radio.picUrl,item.name,item.secondCategoryName,
							item.dj.nickname,item.listenerCount,emotion.time[index]
						]'></rectangle>
					</li>
				</ul>
				<p @click="gomore('故事',3080097)">故事<i class="iconfont icon-fanhui2"></i></p>
				<ul>
					<li v-for="(item,index) in storyz.particulars">
						<rectangle :obj='rectangleobj' :params='[
							item.radio.picUrl,item.name,item.secondCategoryName,
							item.dj.nickname,item.listenerCount,emotion.time[index]
						]'></rectangle>
					</li>
				</ul>
				<p @click="gomore('生活',6)">生活<i class="iconfont icon-fanhui2"></i></p>
				<ul>
					<li v-for="(item,index) in life.particulars">
						<rectangle :obj='rectangleobj' :params='[
							item.radio.picUrl,item.name,item.secondCategoryName,
							item.dj.nickname,item.listenerCount,emotion.time[index]
						]'></rectangle>
					</li>
				</ul>
			</div>
			<div id="tulist">
				<p @click="gomore('二次元',3001)">二次元<i class="iconfont icon-fanhui2"></i></p>
				<ul>
					<li v-for="(item,index) in ercy.particulars" @click="getpage(item.id,'播客')">
						<song-list :obj='liveobj' :params='[
							item.dj.backgroundUrl,item.duration,item.name,item.secondCategoryName
						]'></song-list>
					</li>
				</ul>
				<p @click="gomore('音乐推荐',2)">音乐推荐<i class="iconfont icon-fanhui2"></i></p>
				<ul>
					<li v-for="(item,index) in musictj.particulars" @click="getpage(item.id,'播客')">
						<song-list :obj='liveobj' :params='[
							item.dj.backgroundUrl,item.duration,item.name,item.secondCategoryName
						]'></song-list>
					</li>
				</ul>
				<p @click="gomore('创作翻唱',2001)">创作翻唱<i class="iconfont icon-fanhui2"></i></p>
				<ul>
					<li v-for="(item,index) in create.particulars" @click="getpage(item.id,'播客')">
						<song-list :obj='liveobj' :params='[
							item.dj.backgroundUrl,item.duration,item.name,item.secondCategoryName
						]'></song-list>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {getDjBanner,
	getDjCatelist,getDjRecommendType,
	getDjProgramDetail,getDjgxtj
	} from '../../plugins/dj.js'
	import {deepClone} from '../../general/regular.js'
	import songlist from '../../components/basics/songlist.vue'
	import rectangle from '../../components/basics/rectangle.vue'
	import loading from '../../components/loading/loading.vue'
	export default {
		name: 'homepage',
		components:{
			'song-list':songlist,
			'rectangle':rectangle,
			'loading':loading
		},
		data(){
			return {
				complete:false,		//数据未加载完成时
				moreparams:{
					name:'',
					id:''
				},		//参数
				liveobj:{
					type:'podcast',
					count:true,
					play:false
				},
				rectangleobj:{
					type:'hotpodcast'		
				},				
				ban:''	  ,//轮播图
				podcast:{
					emotion:'',		//情感
					storyz:'',		//故事
					life:'',		//生活
					ercy:'',		//二次元
					musictj:'',		//音乐推荐
					create:''		//创作翻唱
				},
				emotion:{
					id:[],
					particulars:[],
					time:[],
				},
				storyz:{
					id:[],
					particulars:[],
					time:[]
				},
				life:{
					id:[],
					particulars:[],
					time:[]
				},
				ercy:{
					id:[],
					particulars:[],
					time:[]
				},
				musictj:{
					id:[],
					particulars:[],
					time:[]
				},
				create:{
					id:[],
					particulars:[],
					time:[]
				},
				personalize:{
					id:[],
					data:[],
				}
			}
		},
		methods:{
			gomore(name,id){
				this.$store.dispatch('more',true)
				this.$router.push({
					name:'gomore',
					query:{
						name:name,
						id:id
					}
				})
			},
			closeMore(value){
				this.ismore=value
			},
			getpage(id,type){
				this.$store.dispatch('page',{
					id:id,
					type:type
				})
			}
		},
		created() {
			getDjBanner({limit:6}).then(res=>{
				this.ban=res.data.data
			})
			
			getDjRecommendType({type:3}).then(res=>{
				this.podcast.emotion=res.data.djRadios.slice(0,6)
				res.data.djRadios.slice(0,6).forEach(a=>{
					this.emotion.id.push(a.lastProgramId)
					getDjProgramDetail({id:a.lastProgramId}).then(res=>{
						this.emotion.particulars.push(res.data.program)
						this.emotion.time.push(res.data.program.duration)
					})
				})
			})
			
			
			getDjRecommendType({type:3080097,limit:0}).then(res=>{
				this.podcast.storyz=res.data.djRadios.slice(0,6)
				res.data.djRadios.slice(0,6).forEach(a=>{
					this.storyz.id.push(a.lastProgramId)
					getDjProgramDetail({id:a.lastProgramId}).then(res=>{
						this.storyz.particulars.push(res.data.program)
						this.storyz.time.push(res.data.program.duration)
					})
				})
			})
					
			getDjRecommendType({type:6}).then(res=>{
				this.podcast.life=res.data.djRadios.slice(0,6)
				res.data.djRadios.slice(0,6).forEach(a=>{
					this.life.id.push(a.lastProgramId)
					getDjProgramDetail({id:a.lastProgramId}).then(res=>{
						this.life.particulars.push(res.data.program)
						this.life.time.push(res.data.program.duration)
					})
				})
			})
			
			getDjRecommendType({type:3001}).then(res=>{
				this.podcast.ercy=res.data.djRadios.slice(1,7)
				res.data.djRadios.slice(1,7).forEach(a=>{
					this.ercy.id.push(a.lastProgramId)
					getDjProgramDetail({id:a.lastProgramId}).then(res=>{
						this.ercy.particulars.push(res.data.program)
						this.ercy.time.push(res.data.program.listenerCount)
					})
				})
			}) 		
			getDjRecommendType({type:2}).then(res=>{
				this.podcast.musictj=res.data.djRadios.slice(0,6)
				res.data.djRadios.slice(0,6).forEach(a=>{
					this.musictj.id.push(a.lastProgramId)
					getDjProgramDetail({id:a.lastProgramId}).then(res=>{
						this.musictj.particulars.push(res.data.program)
						this.musictj.time.push(res.data.program.listenerCount)
					})
				})
			})
			getDjRecommendType({type:2001}).then(res=>{
				this.podcast.create=res.data.djRadios.slice(0,6)
				res.data.djRadios.slice(0,6).forEach(a=>{
					this.create.id.push(a.lastProgramId)
					getDjProgramDetail({id:a.lastProgramId}).then(res=>{
						this.create.particulars.push(res.data.program)
						this.create.time.push(res.data.program.listenerCount)
					})
				})
			})
			getDjgxtj().then(res=>{
				this.personalize.data=res.data.data
				res.data.data.forEach(a=>{
					// this.bus.$emit('loading',false)
					// this.complete=true
					this.personalize.id.push(a.lastProgramId)
				})
			})
			
		},
	}
</script>

<style scoped>
	.homepage{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
	}
	
	img{
		top: 0;
		width: 100%;
		height: 100%;
	}
	
	@media screen and (max-width:1205px) {
		.homepage-content{
			width: 100%;
			height: auto;
			margin: 0 28px 0 28px;
		}	
	}
	
	@media screen and (min-width:1205px) {
		.homepage-content{
			width: 973px;
			height: auto;
		}
	}

	.homepage-content .banner {
		width: 100%;
		height: 150px;
		border: 1px #000000 solid;
		margin-top: 30px;
		display: flex;
		justify-content: space-between;
		position: relative;
	}

	.banner #banner {
		width: 455px;
		height: 100%;
		border-radius: 10px;
	}

	.banner #classify {
		margin-left: 18px;
		flex: 4;
		border: 1px #000000 solid;
	}

	.el-carousel__item h3 {
		color: #ffffff;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #ffffff;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #ffffff;
	}

	#list ul,
	#tulist ul {
		width: 100%;
		height: auto;
		margin-bottom: 20px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	#list>p,
	#tulist>p {
		margin-top: 20px;
		font-size: 18px;
		font-weight: 600;
		margin-bottom: 10px;
		cursor: pointer;
	}

	#list>p:nth-child(1) {
		margin-top: 0px;
	}


	#list>p i,
	#tulist>p i {
		margin-left: 5px;
	}

	#list li {
		width: 49%;
		height: 67px;
		margin-bottom: 15px;
		display: flex;
	}

	#tulist li {
		flex: 0 0 15%;
		cursor: pointer;
	}
</style>

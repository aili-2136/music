<template>
	<div class="newest">
		<loading></loading>
		<div v-if="complete" class="select">
			<div id="song" @click="gosong" :class="[geordie?'a':'b']">
				新歌速递
			</div>
			<div id="plate" @click="goplate" :class="[geordie?'b':'a']">
				新碟上架
			</div>
		</div>
		
		<div v-if="complete" class="navigation">
			<div id="list">				
					<span v-for="(item,index) in navigationlist" @click="showsong(item,index)"
						:class="{'fontw':(isw==index&&song==item&&geordie)||(isw==index&&plate==item&&!geordie)}">
						{{item}}
					</span>					
			</div>
			<div id="bfsc" v-show="geordie">
				<div id="bf">
					<p class="iconfont icon-bofang3"></p>
					播放全部
				</div>
				<div id="sc">
					<p class="iconfont icon-24gl-folderPlus"></p>
					收藏全部
				</div>
			</div>
		</div>
		
		
		<div v-if="complete" class="song" v-show='geordie'>		
				<single :obj='singleobj' :params='songlist'></single>		
		</div>
		
		<div v-if="complete" class="plate" v-show="!geordie">
			<ul>
				<li v-for="(item,index) in platelist">
					<song-list :obj='songlistobj' :params='[
						item.picUrl,null,item.name,item.artists
					]'></song-list>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {
		getTopSong,
		getTopAlbum,
		getAlbumNew
	} from '../../plugins/newest.js'
	import {
		getsongnumber,
		getareanumber,
		gettypenumber,
	} from '../../general/regular.js'
	import single from '../../components/basics/single.vue'
	import songlist from '../../components/basics/songlist.vue'
	import loading from '../../components/loading/loading.vue'
	export default{
		name:'newest',
		components:{
			'single':single,
			'song-list':songlist,
			'loading':loading
		},
		data() {
			return {
				complete:false,		//数据未加载完成时
				singleobj:{
					type:'newmusic'				
				},
				songlistobj:{
					type:'plate',
					play:true,
					location:'centre'
				},
				navigationlist: ['全部', '华语', '欧美', '韩国', '日本'],
				geordie:null, //	新歌和新碟的切换
				song:'',		//分类
				plate:'',
				isw:0,				
				songlist: [], //	歌单
				platelist: [], //碟
			}
		},
		methods: {
			gosong() {
				this.geordie = true
			},
			goplate() {
				this.geordie = false
			},
			showsong(item, index) {
				if(this.geordie){
					this.song=item
				}else{
					this.plate=item
				}
				this.isw = index
			},
		},
		watch:{
			geordie:{
				handler(value){
					this.bus.$emit('loading',true)
					this.isw=0
					if(value){
						this.plate='全部'
						getTopSong({
							type: getsongnumber(this.song)
						}).then(res => {
							this.complete=true
							this.bus.$emit('loading',false)
							this.songlist = res.data.data
						})
					}else{
						this.song='全部'
						getAlbumNew({
							limit:30,
							area:getareanumber(this.plate)
						}).then(res=>{
							this.complete=true
							this.bus.$emit('loading',false)
							this.platelist=res.data.albums
						})
					}
				}
			},
			song:{
				handler(value){
						getTopSong({
							type: getsongnumber(value)
						}).then(res => {
							this.songlist = res.data.data
						})			
				}
			},
			plate:{
				handler(value){
					getAlbumNew({
						limit:30,
						area:getareanumber(value)
					}).then(res=>{
						this.platelist=res.data.albums
					})
				}
			}
		},
		mounted() {
			this.song='全部'
			this.geordie=true
		},
		activated() {
			this.bus.$emit('navig','最新音乐')
		}
	}
	
</script>

<style scoped>
	.newest {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.select {
		width: 204px;
		height: 24px;
		border: 1px #BBBBBB solid;
		border-radius: 12px;
		margin: auto;
	}
	
	.select #song,
	.select #plate {
		width: 102px;
		border-radius: 12px;
		float: left;
		text-align: center;
		font-size: 12px;
		cursor: default;
	}
	
	.a {
		background-color: #BBBBBB;
		color: #ffffff;
		height: 26px;
		line-height: 26px;
		margin-top: -1px;
	}
	
	.b {
		background-color: #ffffff;
		color: #5a5a5a;
		height: 24px;
		line-height: 24px;
	}
	
	.navigation {
		width: 100%;
		height: 48px;
		display: flex;
		justify-content: space-between;
		margin-top: 30px;
	}
	
	.navigation #list {
		flex: 1;
	}
	
	.navigation #list span {
		display: inline-block;
		font-size: 12px;
		margin-right: 25px;
		cursor: pointer;
	}
	
	.fontw {
		font-weight: 550;
	}
	
	
	.navigation #bfsc {
		width: 178px;
		height: 100%;
		display: flex;
	}
	
	
	.navigation #bfsc #bf,
	.navigation #bfsc #sc {
		width: 80px;
		height: 22px;
		border: 1px #DDDDDD solid;
		border-radius: 11px;
		margin-left: 8px;
		font-size: 12px;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	
	.navigation #bfsc #bf {
		background-color: #FF7A9E;
		color: #ffffff;
		border: none;
	}
	
	.navigation #bfsc #bf p,
	.navigation #bfsc #sc p {
		font-size: 14px;
		margin-left: 5px;
		margin-right: 5px;
	}
	
	
	.song {
		flex: 1;
		width: 100%;
		height: 100%;
		margin-top: 15px;
		display: flex;
		flex-direction: column;
	}
	
	
	.plate{
		flex: 1;
	}
	
	.plate ul{
		margin-top: 10px;
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	@media screen and (min-width:1050px) {
		.plate ul li{
			flex: 0 0 18%;
		}
	}
	
	@media screen and (max-width:1050px) {
		.plate ul li{
			flex: 0 0 23%;
		}
	}
	
</style>
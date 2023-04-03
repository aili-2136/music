<template>
	<div class="recentlyPlay">
		<div class="hander">
			<div id="text">
				<div>
					最近播放
					<span>共{{Songlist.length}}首</span>
				</div>
				<div @click="empty">清空列表</div>
			</div>
			<div id="button">
				<i class="iconfont icon-shipinbofangshibofang"></i>
				播放全部
				<i class="iconfont icon-jiahao"></i>
			</div>
		</div>
		<div class="list">
			<div id="table">
				<span>音乐标题</span>
				<span>歌手</span>
				<span>播放时间</span>
			</div>
			<ul>
				<list :obj='listObj' :params="Songlist"></list>
			</ul>
			<div id="img" v-if="Songlist.length==0">
				<el-empty description="你还没播放任何音乐"></el-empty>
			</div>
		</div>
	</div>
</template>

<script>	
import {readData,saveData,deleteData} from '../../general/regular.js'
import {getSongDetail} from '../../plugins/music.js'
import list from '../../components/songlist/list.vue'
	export default{
		name:'recentlyPlay',
		components:{
			list
		},
		data() {
			return {
				Songlist:[],
				listObj:{
					type:'song'
				}
			}
		},	
		methods:{
			//清空列表
			empty(){
				deleteData('RecentlyPlayed').then(res=>{
					this.Songlist=[]
				})
			}
		},
		created() {
			let ids=readData('RecentlyPlayed')
			if(ids.length!==0){
				getSongDetail({
					ids:ids.toString()
				}).then(res=>{
					this.Songlist=res.data.songs
				})
			}
		}
	}
	
</script>

<style scoped>
	
	img{
		top: 0;
		width: 100%;
		height: 100%;
	}
	
	.recentlyPlay{
		height: auto;
		margin: 26px 28px 0 28px;
	}
	
	.recentlyPlay .hander{
		width: 100%;
		height: 90px;
		display: flex;
		flex-direction: column;
		cursor: default;
	}
	
	.recentlyPlay .hander #text{
		width: 100%;
		height: 20px;
		line-height:20px;
		display: flex;
		justify-content: space-between;
	}
	
	.recentlyPlay .hander #text div:nth-child(1){
		font-size: 18px;
		font-weight: 700;
		display: flex;
		align-items: center;
	}
	
	.recentlyPlay .hander #text span{
		display: inline-block;
		color: #9F9F9F;
		font-weight: 300;
		margin-left: 10px;
		font-size: 14px;
	}
	
	.recentlyPlay .hander #text div:nth-child(2){
		font-size: 14px;
		color: #507DAF;
		cursor: pointer;
	}
	
	#button{
		display: block;
		width: 120px;
		height: 30px;
		margin-top: 30px;
		border-radius: 15px;
		background-color: #FF7A9E;
		line-height: 30px;
		color: #ffffff;
		padding-left: 10px;
		font-size: 14px;
		cursor: pointer;
	}
	
	.list{
		flex: 1;
	}
	
	.list #table{
		width: 100%;
		height: 34px;
		font-size: 12px;
		color: #888888;
		margin-left: 30px;
		display: flex;
		align-items: center;
	}
	
	.list #table span{
		display: inline-block;
	}
	
	.list #table span:nth-child(1){
		flex: 5;
	}
	
	.list #table span:nth-child(2){
		flex: 3;
	}
	.list #table span:nth-child(3){
		flex: 2;
	}
	
	#img{
		margin: 0 auto;
		width: 400px;
		height:400px;
	}
</style>
<template>
	<div class="search-box">
		<div class="ov">
			<div id="history">
				<p>
					<span style="cursor: default;">搜索历史</span>
					<a href="javascript: ;">
						<i class="iconfont icon-huishou" @click="Delete"></i>
					</a>
					<span style="cursor:pointer;">查看全部</span>
				</p>
				<ul>
					<li v-for="(item,index) in record" @click="history(item)">
						{{item}}
					</li>
				</ul>
			</div>
			<div id="content">
				<p>热搜榜</p>
				<ul>
					<li v-for="(item,index) in hotSearch" @click="hot(item.searchWord)">
						<div id="index" :class="{'hot':index<3}">
							{{index+1}}
						</div>
						<div id="text">
							<p>
								<span id="name">{{item.searchWord}}</span>
								<span id="count">{{item.score}}</span>
							</p>
							<p style="color: #acacac;">
								{{item.content}}
							</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import {getSearchHotDetail} from '../../plugins/search.js'
import {saveData,readData} from '../../general/regular.js'
	export default{
		name:'searchBox',
		data() {
			return {
				record:readData('SearchHistory'),
				hotSearch:[],			//热搜列表
			}
		},
		methods:{
			Delete(){
				localStorage.setItem('SearchHistory',[])
			},
			history(value){
				this.$store.dispatch('search',false)
				this.$store.dispatch('keyword',{
					open:true,
					key:value
				})
			},			
			hot(value){				
				saveData('SearchHistory', value)
				this.$store.dispatch('search',false)
				this.$store.dispatch('keyword',{
					open:true,
					key:value
				})
			}
		},
		watch:{
			record:{
				deep:true,
				handler(value){
					
				}
			}
		},
		mounted() {
			getSearchHotDetail().then(res=>{
				this.hotSearch=res.data.data
			})
		}
	}
	
</script>

<style scoped>
	.search-box{
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
	
	#history{
		margin: 8px 0 0 20px;
		font-size: 14px;
		color: #666666;
	}
	
	#history i{
		margin-left: 5px;
		font-size: 14px;
		cursor: pointer;
	}
	
	#history i:hover{
		color: #000;
	}
	
	#history span:nth-child(3){
		font-size: 17px;
		font-variant-caps: all-small-caps;
		float: right;
		margin: -4px 8px 0 0;
	}
	
	#history span:nth-child(3):hover{
		color: #000;
	}
	
	#history ul{
		width: 100%;
		height: auto;
		display: flex;
		flex-wrap: wrap;
		margin-top: 10px;
	}
	
	#history ul li{
		display: inline-block;
		font-size: 16px;
		font-variant-caps: all-small-caps;
		border: 1px #CECECE solid;
		color: #555555;
		margin: 0 10px 10px 0;
		line-height: 16px;
		padding: 0 15px 4px 15px;
		border-radius: 20px;
		cursor: pointer;
	}
	
	#history ul li:hover{
		background-color: #F2F2F2;
	}
	
	#content{
		width: 100%;
		height: auto;
		margin: 10px 0 0 0;
	}
	
	#content>p{
		margin-left: 20px;
		font-size: 14px;
		color: #666666;
	}
	
	#content ul li{
		width: 100%;
		height: 48px;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	
	#content ul li #index{
		font-size: 12px;
		width: 15px;
		margin: 0 20px 0 20px;
	}
	
	.hot{
		color: #FD5656;
	}
	
	#content ul li #text{
		flex: 1;
		display: flex;
		font-size: 16px;
		font-variant-caps: all-small-caps;
		flex-direction: column;
	}
	
	#content ul li #text #name{
		margin-right: 15px;
		font-weight: 700;
	}
	
	#content ul li:hover{
		background-color: #F2F2F2;
	}
</style>
<template>
	<div class="list">
		<ul>
			<li v-for="(item,index) in params" @click="click(index)" :class="{'click':show==index}" @dblclick="setid(item.id)" :key="item.id">
				<div>
					<p :class="[obj.type=='song'?'song':'ranking']" id="cz">
						<span id="index" :style="{color:((index<3&&obj.type=='ranking')?'#FF7AA9':'#9F9F9F')}"
						>
							{{obj.type!='ranking'&&index<9?'0'+(index+1):(index+1)}}
						</span>
						<span id="live" v-show="obj.type=='song'">
							<i class="iconfont icon-aixin1" v-show="obj.live==true" style="color: red;"></i>
							<i  class="iconfont icon-aixin" @click="addlive(item.id,index)" :ref="'live'+index" v-show="obj.live!==true"></i>
						</span>
						<span id="down" v-show="obj.type=='song'">
							<i class="iconfont icon-xiazai"></i>
						</span>
					</p>
					<p id="name">
						<span id="a">{{item.name}}</span>
					</p>
					
					<p id="nickname" :style="{textAlign:obj.type=='ranking'?'right':''}">
						<i v-for="(a,index) in item.ar">
							{{index==0?a.name:'/'+a.name}}
						</i>
					</p>
					<p id="album" v-show="obj.type=='song'">
						<span>{{item.al.name}}</span>
					</p>
					<p id="time" v-show="obj.type=='song'">
						{{istime(item.dt)}}
					</p>
				</div>
			</li>
			<span id="lookall" v-show="obj.type=='ranking'">
				查看全部
				<i class="iconfont icon-fanhui2"></i>
			</span>
		</ul>
	</div>
</template>

<script>
	import {saveData,readData} from '../../general/regular.js'
	import {
		getmiao
	} from '../../general/regular.js'
	export default {
		name: 'list',
		props: {
			obj: Object,
			params: Array,
		},
		data() {
			return {
				show: '',
				livemusic:readData('livemusic'),	//本地储存
				musicids:[],						//音乐id
			}
		},
		methods: {
			click(item) {
				this.show = item
			},
			istime(time) {
				return getmiao(time)
			},
			setid(id){
				if(this.obj.type=='song'){
					saveData('RecentlyPlayed',id)
				}
				this.$store.dispatch('musicid',id)
			},
			addlive(id,index){
				if(this.obj.type=='song'){
					saveData('livemusic',id)
					// this.livedata.push(id)
					this.$refs[`${'live'+index}`][0].classList.value='iconfont icon-aixin1'
					this.$refs[`${'live'+index}`][0].style.color='red'
				}
			},		
		},
		mounted() {
			if(this.obj.type=='song'){
				var list=JSON.parse(JSON.stringify(this.params))
				list.forEach(a=>{
					this.musicids.push(a.id)
				})
				
				for(var i=0;i<this.musicids.length;i++){
					if(this.livemusic.indexOf(this.musicids[i])!==-1){
						this.$refs[`${'live'+i}`][0].classList.value='iconfont icon-aixin1'
						this.$refs[`${'live'+i}`][0].style.color='red'
					}
				}
			}
		}		
	}
</script>

<style scoped>
	img {
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
		
	}

	.list {
		width: 100%;
		height: auto;
	}

	.list ul {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	.list ul li {
		width: 100%;
		height: 30px;
		font-size: 16px;
		line-height: 30px;
		border-radius: 3px;
		font-size: 16px;
		font-variant-caps: all-small-caps;
	}


	.list ul li div{
		width: 100%;
		height: 100%;
		display: flex;
	}

	.song{
		width: 96px;
		height: 100%;
		display: flex;
		justify-content: space-evenly;
		text-align: center;
	}

	.ranking{
		width: 20px;
		height: 100%;
		text-align: center;
	}

	#live{
		cursor: pointer;
	}
	
	#live>i:hover{
		font-weight:600;
		color: #303030;
	}
	
	#cz span{
		color: #f5f5f5;
		font-size: 17px;
		font-weight: 300;
	}

	#cz span i{
		color: #919191;
		font-size: 20px;
	}

	#name {
		flex: 39;
		height: 100%;
		width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	#nickname {
		flex: 19;
		height: 100%;
		color: #616262;
		padding-right: 5px;
		width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
	}

	#album {
		flex: 25;
		height: 100%;
		color: #616262;
		width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
	}

	#time {
		flex: 10;
		height: 100%;
		color: #969797;
		line-height: 30px;
	}

	.list ul li:nth-child(2n-1) {
		background-color: #FAFAFA;
	}

	.list ul li:hover {
		background-color: #F5F5F5;
	}

	.click {
		background-color: #F0F0F0 !important;
	}

	#lookall,
	#lookall i {
		font-size: 16px;
		color: #555555;
		font-variant-caps: all-small-caps;
	}
</style>

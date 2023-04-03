<!-- 
	参数:
	obj:{
		type:'newmusic'/'podcast'
	}
	
	params:[
		
	]
 -->
<template>
	<div class="single">
		<ul>
			<li v-for="(item,index) in params" @click="click(index)" :class="{'click':show==index}">
				<div id="left">
					<span id="index" :class="[obj.type=='newmusic'?'indexnew':'index']">
						{{obj.type=='newmusic'&&index<9?'0'+(index+1):(index+1)}}
					</span>
					<span id="img" v-if="obj.type=='newmusic'">
						<img :src="item.album.picUrl" alt=""> 
						<div id="play" v-show="obj.type=='newmusic'">
							<i class="iconfont icon-bofang5"></i>
						</div>
					</span>
					<span id="img" v-if="obj.type=='podcast'">
						<img :src="item.blurCoverUrl" alt=""> 
						<div id="play" v-show="obj.type=='podcast'">
							<i class="iconfont icon-bofang5"></i>
						</div>
					</span>
					<span id="name">
						<span id="b" v-if="obj.type=='newmusic'">{{item.name}}</span>
						<span id="b" v-if="obj.type=='podcast'">{{item.name}}</span>
					</span>
				</div>

				<div id="right" v-if="obj.type=='newmusic'">
					<span id="nickname" :class="{'newnickname':obj.type=='newmusic'}">
						<i v-for="(a,index) in item.artists" v-if="obj.type=='newmusic'">
							{{index==item.artists.length-1?a.name:a.name+'/'}}
						</i>
					</span>
					<div id="album" v-if="obj.type!=='ranking'">
						<span v-if="obj.type=='newmusic'">{{item.album.name}}</span>
					</div>
					<div id="time" v-if="obj.type!=='ranking'">
						{{obj.type=='song'?istime(item.dt):istime(item.duration)}}
					</div>
				</div>
				
				<div id="right" v-if="obj.type=='podcast'">
					<div id="listener">
						<i class="iconfont icon-bofang4"></i>
						{{iswang(item.listenerCount)}}
					</div>
					<div id="liked">
						<i class="iconfont icon-dianzan"></i>
						{{item.likedCount}}
					</div>
					<div id="createTime">
						{{istime1(item.createTime)}}
					</div>
					<div id="podcast-time">
						{{istime(item.duration)}}
					</div>
				</div>
				
			</li>
		</ul>
	</div>
</template>

<script>
	import {
		getmiao,getwang1,gettime
	} from '../../general/regular.js'
	export default {
		name: 'single',
		props: {
			obj: Object,
			params: Array,
		},
		data() {
			return {
				show: '',
			}
		},
		methods: {
			click(item) {
				this.show = item
			},
			istime(time) {
				return getmiao(time)
			},
			iswang(value){
				return getwang1(value)
			},
			istime1(value){
				return gettime(value)
			}
		},
		mounted() {
			if (this.obj.type == 'newmusic') {
				this.li = {
						fontSize: '18px',
						height: '70px',
						lineHeight: '65px'
					},
					this.nickname = {

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

	.single {
		width: 100%;
		height: auto;
	}

	.single ul {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	.single ul li {
		position: relative;
		width: 100%;
		height: 70px;
		line-height: 70px;
		display: flex;
		border-radius: 3px;
		font-size: 16px;
		font-variant-caps: all-small-caps;
	}

	li #left,
	li #right {
		flex: 1;
		display: flex;
	}


	.index {
		margin: 0 20px 0 30px;
	}

	.indexnew {
		margin-left: 25px;
	}

	#img {
		position: relative;
		margin-left: 15px;
		margin-top: 8.5px;
		width: 53px;
		height: 53px;
		border-radius: 5px;
	}

	#img #play {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 25px;
		height: 25px;
		border-radius: 50%;
		text-align: center;
		line-height: 20px;
		opacity: 0.8;
		background-color: #ffffff;
	}

	#img #play i {
		color: #FF7A9E;
	}

	#name {
		flex: 1;
		width: 0;
		font-size: 18px;
		margin-left: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	#name #b {
		color: #b3b3b3;
	}

	#nickname{
		font-size: 17px;
	}

	.newnickname {
		flex: 4;
		color: #616262;
		width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
		margin-left: 20px !important;
	}

	#album {
		flex: 6;
		color: #616262;
		width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
	}

	#time {
		width: 80px;
		height: 70px;
		color: #969797;
		line-height: 70px;
		text-align: center;
	}

	.single ul li:nth-child(2n-1) {
		background-color: #FAFAFA;
	}

	.single ul li:hover {
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
	
	#listener,#liked,#createTime,#podcast-time{
		flex: 1;
		font-size: 14px;
		width: 100%;
		height: 100%;
		line-height: 70px;
	}
	
	#listener{
		margin-left: 150px;
	}
</style>

<template>
	<div class="mv">
		<div id="newmv">
			<div id="table">
				<p @click="goallmv(['最新',newname])">最新MV<i class="iconfont icon-fanhui2"></i></p>
				<ul>
					<li v-for="(item,index) in table">
						<span @click="tab(index,item)" :class="{'tab':istab==index}">{{item}}</span>
						<p v-if="index!=4"></p>
					</li>
				</ul>
			</div>
			<ul>
				<li v-for="(item,index) in newmv.data" @click="getpage(item.id,'MV')">
					<video-mv :obj='mvobj' :params='[
						item.cover,item.name,item.artists,null,item.playCount
					]'></video-mv>
				</li>
			</ul>
		</div>
		
		<div id="newmv">
			<div id="table">
				<p @click="goallmv(['最热'])">热播MV<i class="iconfont icon-fanhui2"></i></p>
			</div>
			<ul>
				<li v-for="(item,index) in hotmv.data" @click="getpage(item.id,'MV')">
					<video-mv :obj='mvobj' :params='[
						item.cover,item.name,item.artists,null,item.playCount
					]'></video-mv>
				</li>
			</ul>
		</div>
		
		<div id="newmv">
			<div id="table">
				<p @click="goallmv(['网易出品'])">网易出品<i class="iconfont icon-fanhui2"></i></p>
			</div>
			<ul>
				<li v-for="(item,index) in original.data" @click="getpage(item.id,'MV')">
					<video-mv :obj='mvobj' :params='[
						item.cover,item.name,item.artists,null,item.playCount
					]'></video-mv>
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	import {
		getMvFirst,
		getMvAll,
		getMvExclusiveRcmd,
		getPersonalizedMv,
		getTopMv
	} from '../../plugins/mv.js'
	import videoormv from '../../components/basics/videoormv.vue'
	export default {
		name: 'mv',
		components: {
			'video-mv': videoormv
		},
		data() {
			return {
				mvobj: {
					type: 'mv',
					count: true,
					play: false,
					time: false,
				},
				table: ['内地', '港台', '欧美', '日本', '韩国'],
				istab: 0,
				newname:'内地',
				newmv: {
					data: [],
					time: []
				},
				hotmv: {
					data: [],
					time: []
				},
				original: {
					data: [],
					time: []
				}
			}
		},
		methods: {
			getpage(id,type){
				this.$store.dispatch('page',{
					id:id,
					type:type
				})
				this.$store.dispatch('play',true)
			},
			tab(id, area) {
				this.istab = id
				this.newname=area
				getMvFirst({
					area: area,
					limit: 8
				}).then(res => {
					this.newmv.data = res.data.data
					res.data.data.forEach(a => {
						this.newmv.time.push(a.playCount)
					})
				})
			},
			goallmv(value){
				this.$store.dispatch('allmv',value)
			}
		},
		mounted() {
			getMvFirst({
				area: '内地',
				limit: 8
			}).then(res => {
				this.newmv.data = res.data.data
				res.data.data.forEach(a => {
					this.newmv.time.push(a.playCount)
				})
			})
			
			getMvAll({
				order: '最热',
				limit: 8
			}).then(res => {
				this.hotmv.data = res.data.data
				res.data.data.forEach(a => {
					this.hotmv.time.push(a.playCount)
				})
			})
			
			getMvExclusiveRcmd({
				limit: 8
			}).then(res => {
				this.original.data = res.data.data
				res.data.data.forEach(a => {
					this.original.time.push(a.playCount)
				})
			})
		}
}
</script>

<style scoped>
	.mv {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.mv #newmv #table {
		width: 100%;
		height: 50px;
		line-height: 50px;
		display: flex;
		justify-content: space-between;
	}

	.mv #newmv #table p {
		font-size: 15px;
		font-weight: 600;
		color: #3a3a3a;
		cursor: pointer;
	}

	.mv #newmv #table ul li {
		float: left;
		font-size: 12px;
		transform: scale(0.9);
	}

	.mv #newmv #table ul li span {
		padding: 0 10px 1px 10px;
		border-radius: 8px;
		margin: 0 6px 0 5px;
		color: #9F9F9F;
		cursor: pointer;
	}

	.mv #newmv #table ul li span:hover {
		color: #282828;
	}

	.tab {
		background-color: #FDEBEB;
		color: #EC4141 !important;
	}

	.mv #newmv #table ul li p {
		width: 1px;
		height: 15px;
		display: inline-block;
		position: absolute;
		top: 18px;
		background-color: #F2F2F2;
	}

	#newmv>ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}


	@media screen and (min-width:1180px) {
		#newmv>ul li {
			flex: 0 0 23.5%;
			margin-bottom: 10px;
		}
	}

	@media screen and (max-width:1180px) {
		#newmv>ul li {
			flex: 0 0 32%;
			margin-bottom: 10px;
		}
	}
</style>

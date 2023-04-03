<template>
	<div class="rankinglist">
		<loading></loading>
		<span v-if="complete" id="notice">官方榜</span>
		<div id="official">
			<ul>
				<li v-for="(item,index) in official.img" :key="index">
					<div class="img">
						<img :src="item" alt="">
					</div>
					<div class="list">
						<list :obj='singleobj' :params='musiclist[index]'></list>
					</div>
				</li>
			</ul>
		</div>
		<span v-if="complete" id="notice" style="margin-top: 20px;">全球榜</span>
		<div id="global">
			<ul>
				<li v-for="(item,index) in global" :key="index">
					<song-list :obj='songlistobj' :params='[
						item.coverImgUrl,item.playCount,item.name
					]'></song-list>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {
		getToplist,
		getPlaylistDetail,
		getSongDetail,
		getPlaylistTrackAll
	} from '../../plugins/rankinglist.js'
	import {
		getwang
	} from '../../general/regular.js'
	import list from '../../components/songlist/list.vue'
	import songlist from '../../components/basics/songlist.vue'
	import loading from '../../components/loading/loading.vue'
	export default {
		name: 'rankinglist',
		components: {
			'list': list,
			'song-list': songlist,
			'loading': loading
		},
		data() {
			return {
				complete:false,		//数据未加载完成时
				singleobj: {
					type: 'ranking'
				},
				songlistobj: {
					type: 'ranking',
					count: true,
					play: true,
					location: 'centre'
				},
				official: {
					id: [],
					img: []
				}, //官方榜
				global: [], //全球榜
				offsongid: [], //官方榜歌单id				
				musiclist: [
					[],
					[],
					[],
					[]
				], //官方榜音乐前5
				time: [],
				clickcolor: {
					id: '',
					index: ''
				},
			}
		},
		created() {
			//获取所有榜单
			this.bus.$emit('loading',true)
			getToplist().then(res => {
				this.complete=true
				this.bus.$emit('loading',false)
				res.data.list.slice(0, 4).forEach(a => {
					this.official.id.push(a.id)
					this.official.img.push(a.coverImgUrl)
				})
				this.global = res.data.list.splice(4, 37)
				this.global.forEach(a => {
					this.time.push(getwang(a.playCount))
				})
				this.official.id.forEach(data => {
					var a = JSON.stringify(data)
					var b = JSON.parse(a)
					this.offsongid.push(b)
				})
			})

			// 获取官方榜歌单里前5首歌曲详情
			getPlaylistTrackAll({
				id: 19723756,
				limit: 5
			}).then(res => {
				this.$set(this.musiclist, 0, res.data.songs)
			})

			getPlaylistTrackAll({
				id: 3779629,
				limit: 5
			}).then(res => {
				this.$set(this.musiclist, 1, res.data.songs)
			})

			getPlaylistTrackAll({
				id: 2884035,
				limit: 5
			}).then(res => {
				this.$set(this.musiclist, 2, res.data.songs)
			})

			getPlaylistTrackAll({
				id: 3778678,
				limit: 5
			}).then(res => {
				this.$set(this.musiclist, 3, res.data.songs)
			})

		},
		activated() {
			this.bus.$emit('navig','排行榜')
		}
	}
</script>

<style scoped>
	.rankinglist {
		display: flex;
		flex-direction: column;
	}

	img {
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}

	.rankinglist #notice {
		display: block;
		width: 100%;
		height: 45px;
		font-size: 19px;
		font-weight: 600;
	}

	.rankinglist #official {
		width: 100%;
		height: 720px;
		margin-bottom: 25px;
	}

	.rankinglist #official ul {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.rankinglist #official ul li {
		width: 100%;
		height: 152px;
		display: flex;
		margin-bottom: 45px;
	}

	.rankinglist #official ul li>.list {
		flex: 1;
		margin-left: 30px;
	}


	.rankinglist #global {
		flex: 1;
	}

	.rankinglist #global ul {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
		justify-content: space-between;
	}

	.rankinglist #global li {
		flex: 0 0 18.5%;
		margin-bottom: 10px;
		height: auto;
		width: 100%;
		height: 100%;
	}
</style>

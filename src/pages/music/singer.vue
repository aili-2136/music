<template>
	<div class="singer">
		<div class="singer-sizer">
			<sizer :params='sizerparam' @onclick='onclick' :sizerobj='click'></sizer>
		</div>
		<loading></loading>
		<div class="content" v-show="complete">
			<ul v-infinite-scroll="load">
				<li v-for="(item,index) in singlist" :key="index" @click="getpage(item.id,'歌手')">
					<song-list :obj='songlistobj' :params='[
						item.picUrl,null,item.name
					]'></song-list>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {
		getArtistList
	} from '../../plugins/singer.js'
	import {
		getnumber
	} from '../../general/regular.js'
	import sizer from '../../components/basics/sizer.vue'
	import songlist from '../../components/basics/songlist.vue'
	import loading from '../../components/loading/loading.vue'
	export default {
		name: 'singer',
		components: {
			'sizer': sizer,
			'song-list': songlist,
			'loading':loading
		},
		data() {
			return {
				complete:false,		//数据未加载完成时
				songlistobj: {
					type: 'song'
				},
				sizerparam: [
					['语种', '分类', '筛选'],
					["全部", "华语", "欧美", "日本", "韩国", "其他"],
					["全部", "男歌手", "女歌手", "乐队"],
					["热门"],
				],
				click: {
					clicka:'全部',
					clickb:'全部',
					clickc:'热门'
				},
				singlist: [], //数据
				yeshu: 0, //页数
			}
		},
		methods: {
			onclick(value) {
				this.click = value
			},
			load() {
				this.bus.$emit('loading',true)
				getArtistList({
					area: getnumber(this.click.clicka),
					type: getnumber(this.click.clickb),
					initial: getnumber(this.click.clickc),
					offset: (this.yeshu) * 30
				}).then(res => {
					this.singlist = this.singlist.concat(res.data.artists)
					this.bus.$emit('loading',false)
					this.complete=true
				})
				this.yeshu++
			},
			getpage(id,type){
				this.$store.dispatch('page',{
					id:id,
					type:type
				})
			}
		},
		mounted() {
			for (let i = 0; i < 26; i++) {
				this.sizerparam[3].push(String.fromCharCode(65 + i))
			}
			this.sizerparam[3].push('#')
		},
		watch: {
			click: {
				deep: true,
				handler(value) {
					this.bus.$emit('loading',true)
					this.singlist = []
					this.yeshu = 0
					getArtistList({
						area: getnumber(value.clicka),
						type: getnumber(value.clickb),
						initial: getnumber(value.clickc),
						offset: (this.yeshu) * 30
					}).then(res => {
						this.singlist = this.singlist.concat(res.data.artists)
						this.bus.$emit('loading',false)
						this.complete=true
					})
					this.yeshu++
				}
			}
		},
		deforeDestroy() {
			this.singlist = []
		},
		activated() {
			this.bus.$emit('navig','歌手')
		}
	}
</script>

<style scoped>
	.singer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.singer-sizer {
		margin-top: 5px;
	}

	.content {
		flex: 1;
		width: 100%;
		height: 100%;
	}

	.content ul {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
		justify-content: space-between;
	}

	@media screen and (min-width:960px) {
		.content ul li {
			flex: 0 0 15.4% !important;
			margin-top: 10px;
		}
	}

	@media screen and (max-width:960px) {
		.content ul li {
			flex: 0 0 18.5% !important;
			margin-top: 10px;
		}
	}
</style>

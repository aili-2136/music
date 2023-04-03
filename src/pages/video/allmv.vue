<template>
	<div class="allmv">
		<div class="allmv-sizer">
			<sizer :params='params' @onclick='onclick' :sizerobj='click'></sizer>
		</div>
		<div class="content">
			<ul v-infinite-scroll="load" infinite-scroll-distance='1'>
				<li v-for="(item,index) in mvlist.data" @click="getpage(item.id,'MV')">
					<video-mv :obj='mvobj' :params='[
						item.cover,item.name,item.artists,null,mvlist.gktime[index]
					]'></video-mv>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import sizer from '../../components/basics/sizer.vue'
	import videoormv from '../../components/basics/videoormv.vue'
	import {
		getMvFirst,
		getMvAll,
		getMvExclusiveRcmd,
		getPersonalizedMv,
		getTopMv
	} from '../../plugins/mv.js'
	export default {
		name: 'allmv',
		components: {
			'sizer': sizer,
			'video-mv': videoormv
		},
		data() {
			return {
				mvobj: {
					type: 'mv',
					count: true,
					play: false
				},
				params: [
					['地区', '类型', '排行'],
					['全部', '内地', '港台', '欧美', '日本', '韩国'],
					['全部', '官方版', '原声', '现场版', '网易出品'],
					['上升最快', '最热', '最新']
				],
				click: {
					clicka: '',
					clickb: '',
					clickc: ''
				},
				mvlist: {
					data: [],
					time: [],
					gktime: []
				},
				pages: 1, //页数
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
			onclick(value) {
				this.click = value
			},
			load() {
				getMvAll({
					area: this.click.clicka,
					type: this.click.clickb,
					order: this.click.clickc,
					offset: this.pages
				}).then(res => {
					this.mvlist.data.concat(res.data.data)
					this.pages++
				})
			}
		},
		computed: {
			type() {
				return this.$route.query.type
			}
		},
		watch: {
			istab: {
				deep: true,
				handler() {
					getMvAll({
						area: this.click.clicka,
						type: this.click.clickb,
						order: this.click.clickc,
						limit: 120
					}).then(res => {
						this.mvlist.data = res.data.data
					})
				}
			},
			type: {
				handler(value) {
					switch (value) {
						case '最新':
							this.click.clicka = this.$route.query.name
							this.click.clickc = '最新'
							this.click.clickb = '全部'
							break;
						case '最热':
							this.click.clicka = '全部'
							this.click.clickb = '全部'
							this.click.clickc = '最热'
							break;
						case '网易出品':
							this.click.clicka = '全部'
							this.click.clickb = '网易出品'
							this.click.clickc = '最新'
							break;
						default:
							break;
					}
				}
			},
			click: {
				deep: true,
				handler(value) {
					getMvAll({
						area: this.click.clicka,
						type: this.click.clickb,
						order: this.click.clickc,
						limit: 120
					}).then(res => {
						this.mvlist.data = res.data.data
					})
				}
			}
		},
		deactivated() {
			this.$store.dispatch('allmv', null)
		},
		mounted() {
			switch (this.$route.query.type) {
				case '最新':
					this.click.clicka = this.$route.query.name
					this.click.clickc = '最新'
					this.click.clickb = '全部'
					break;
				case '最热':
					this.click.clicka = '全部'
					this.click.clickb = '全部'
					this.click.clickc = '最热'
					break;
				case '网易出品':
					this.click.clicka = '全部'
					this.click.clickb = '网易出品'
					this.click.clickc = '最新'
					break;
				default:
					break;
			}

			getMvAll({
				area: this.click.clicka,
				type: this.click.clickb,
				order: this.click.clickc
			}).then(res => {
				this.mvlist.data = res.data.data
				res.data.data.forEach(a => {
					this.mvlist.time.push(a.duration)
					this.mvlist.gktime.push(a.playCount)
				})
			})
		},
	}
</script>

<style scoped>
	.allmv {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.allmv-sizer {
		width: 100%;
		height: auto;
	}

	.content {
		flex: 1;
	}

	.content ul {
		width: 100%;
		height: 100%;
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
		overflow-y: auto;
		justify-content: space-between;
	}

	@media screen and (min-width:1180px) {
		.content>ul li {
			flex: 0 0 23.5%;
			margin-bottom: 20px;
		}
	}

	@media screen and (max-width:1180px) {
		.content>ul li {
			flex: 0 0 32%;
			margin-bottom: 20px;
		}
	}
</style>

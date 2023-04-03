<template>
	<div class="podcast">
		<ul>
			<li v-for="(item,index) in podcasts">
				<div id="left">
					<div id="img">
						<img :src="item.picUrl" alt="">
					</div>
					<div id="name">
						{{item.name}}
					</div>
				</div>
				<div id="reight">
					<div id="playcount">
						<i class="iconfont icon-bofang4" style="margin-right: 5px;"></i>
						<span>{{iswang(item.playCount)}}</span>
					</div>
					<div id="voice">
						声音{{item.programCount}}
					</div>
					<div id="nickname">
						{{item.dj.nickname}}
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {
		getwang1
	} from '../../general/regular.js'
	import {
		getCloudsearch
	} from '../../plugins/search.js'
	export default {
		name: 'searchPodcast',
		data() {
			return {
				podcasts: [],
				key:this.$store.state.keyword.key
			}
		},
		created() {
			getCloudsearch({
				keywords: this.key,
				type: 1009
			}).then(res => {
				this.podcasts = res.data.result.djRadios
			})
		},
		methods: {
			iswang(value){
				return getwang1(value)
			}
		}
	}
</script>

<style scoped>
	.podcast {
		width: 100%;
		height: 100%;
	}

	img {
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}

	.podcast ul {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	.podcast ul li {
		width: 100%;
		height: 70px;
		display: flex;
		justify-content: space-between;
		line-height: 70px;
	}

	.podcast ul li:hover{
		background-color: #F1F2F3;
	}

	.podcast ul li #img {
		width: 53px;
		height: 53px;
		border-radius: 5px;
	}

	.podcast ul li #left {
		flex: 6;
		display: flex;
		align-items: center;
	}

	.podcast ul li #left #name {
		margin-left: 15px;
		font-size: 12px;
	}

	.podcast ul li:nth-child(2n) {
		background-color: #fafafa;
	}

	.podcast ul li #reight {
		flex: 4;
		display: flex;
		font-size: 16px;
		font-variant-caps: all-small-caps;
		align-items: center;
	}

	.podcast ul li #reight #playcount {
		flex: 3;
		color: #C3C3C3;
	}

	.podcast ul li #reight #voice {
		flex: 3;
		color: #666666;
	}

	.podcast ul li #reight #nickname {
		flex: 3;
		color: #C3C3C3;
	}
</style>

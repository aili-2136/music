<template>
	<div class="song-list">
		<ul>
			<li v-for="(item,index) in list">
				<div id="left">
					<div id="img">
						<img :src="item.coverImgUrl" alt="">
					</div>
					<div id="name">
						{{item.name}}
					</div>
				</div>
				<div id="reight">
					<div id="count">
						{{item.trackCount}}首
					</div>
					<div id="nickname">
						{{item.creator.nickname}}
					</div>
					<div id="playcount">
						<i class="iconfont icon-bofang4" style="margin-right: 5px;"></i>
						<span>{{iswang(item.playCount)}}</span>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {getwang1} from '../../general/regular.js'
	import {
		getCloudsearch
	} from '../../plugins/search.js'
	export default{
		name:'songList',
		data() {
			return {
				list: [],
				key:this.$store.state.keyword.key
			}
		},
		created() {
			getCloudsearch({
				keywords: this.key,
				type: 1000
			}).then(res => {
				this.list = res.data.result.playlists
			})
		},
		methods:{
			iswang(value){
				return getwang1(value)
			}
		}
	}
	
</script>

<style scoped>
	.song-list {
		width: 100%;
		height: 100%;
	}
	
	img {
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
	
	.song-list ul {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}
	
	.song-list ul li {
		width: 100%;
		height: 70px;
		display: flex;
		justify-content: space-between;
		line-height: 70px;
	}
	
	
	.song-list ul li:hover{
		background-color: #F1F2F3;
	}
	
	.song-list ul li #img {
		width: 53px;
		height: 53px;
		border-radius: 5px;
	}
	
	.song-list ul li #left {
		flex: 1;
		display: flex;
		align-items: center;
	}
	
	.song-list ul li #left #name {
		margin-left: 15px;
		font-size: 12px;
	}
	
	.song-list ul li:nth-child(2n) {
		background-color: #fafafa;
	}
	
	.song-list ul li #reight {
		flex: 1;
		display: flex;
		font-size: 16px;
		font-variant-caps: all-small-caps;
		align-items: center;
	}
	
	.song-list ul li #reight #count{
		flex: 1;
		color: #C3C3C3;
	}
	.song-list ul li #reight #nickname{
		flex: 3;
		color: #666666;
	}
	.song-list ul li #reight #playcount{
		flex: 2;
		color: #C3C3C3;
	}
	
</style>
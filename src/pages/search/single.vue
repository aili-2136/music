<template>
	<div class="single">
		<div class="hander">
			<span id="a">
				<i class="iconfont icon-shipinbofangshibofang"></i>
				播放全部
				<i class="iconfont icon-jiahao"></i>
			</span>
			<span id="b">
				<i class="iconfont icon-xiazai1"></i>
				下载全部
			</span>
		</div>
		<div class="content">
			<div class="header">
				<p></p>
				<p>音乐标题</p>
				<p>歌手</p>
				<p>专辑</p>
				<p>时长</p>
			</div>
			<div class="list">
				<ul>
					<list :obj='singleobj' :params='songs'></list>				
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getCloudsearch
	} from '../../plugins/search.js'
	import list from '../../components/songlist/list.vue' 
	export default {
		name: 'single',
		components:{
			'list':list
		},
		data() {
			return {
				singleobj: {
					type: 'song'
				},
				songs: [],
				key:this.$store.state.keyword.key
			}
		},
		created() {
			getCloudsearch({
				keywords:this.key,
				type: 1
			}).then(res => {
				this.songs = res.data.result.songs
			})
		}
	}
</script>

<style scoped>
	.single {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.hander {
		width: 100%;
		height: 30px;
		display: flex;
	}

	.hander #a {
		display: block;
		width: 120px;
		height: 28px;
		border-radius: 15px;
		background-color: #FF7A9E;
		line-height: 30px;
		color: #ffffff;
		padding-left: 10px;
		font-size: 14px;
		cursor: pointer;
	}

	.hander #a i:nth-child(2) {
		margin-left: 10px;
	}

	.hander #b {
		display: inline-block;
		padding: 0 10px 0 8px;
		height: 26px;
		border: 1px #D9D9D9 solid;
		border-radius: 14px;
		margin-left: 10px;
		font-size: 14px;
		line-height: 28px;
		color: #4b4b4b;
		cursor: pointer;
	}

	.content {
		flex: 1;
		display: flex;
		margin-top: 20px;
		flex-direction: column;
		align-items: center;
	}

	.content .header {
		display: flex;
		width: 100%;
		height: 30px;
		color: #888888;
		line-height: 30px;
		font-size: 12px;
	}

	.header p:nth-child(1) {
		width: 96px;
		height: 100%;
		text-align: center;
	}

	.header p:nth-child(2) {
		flex: 39;
		height: 100%;
	}

	.header p:nth-child(3) {
		flex: 19;
		height: 100%;
	}

	.header p:nth-child(4) {
		flex: 25;
		height: 100%;
	}

	.header p:nth-child(5) {
		flex: 10;
		height: 100%;
	}

	.content .list {
		width: 100%;
		height: auto;
	}

	.list ul {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.list ul li{
		width: 100%;
		height: auto;
	}
</style>

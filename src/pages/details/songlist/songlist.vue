<template>
	<div class="page-song-list">
		<div class="header">
			<p>操作</p>
			<p>标题</p>
			<p>歌手</p>
			<p>专辑</p>
			<p>时间</p>
		</div>
		<div class="list">
			<ul>			
					<list :obj='singleobj' :params='params.songs'></list>				
			</ul>
		</div>
	</div>
</template>

<script>
	import list from '../../../components/songlist/list.vue'
	export default{
		name:'songlist',
		props:{
			params:Object,
		},
		components:{
			'list':list
		},
		data() {
			return {
				singleobj:{
					type:'song'
				}
			}
		},
	}
	
</script>

<style scoped>
	.page-song-list{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}
	
	.header{
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
	
	.list{
		flex: 1;
	}
	
	.list ul{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
</style>
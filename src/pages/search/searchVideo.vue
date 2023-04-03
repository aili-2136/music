<template>
	<div class="search-video">
		<ul>
			<li v-for="(item,index) in videos">
				<video-mv :obj='videoobj' :params='[
					item.coverUrl,item.title,item.creator,
					item.durationms,item.playTime	
				]'></video-mv>
			</li>
		</ul>
	</div>
</template>

<script>
	import {
		getCloudsearch
	} from '../../plugins/search.js'
	import videoormv from '../../components/basics/videoormv.vue'
	export default{
		name:'searchVideo',
		components:{
			'video-mv':videoormv
		},
		data() {
			return {
				videos:[],
				key:this.$store.state.keyword.key,
				videoobj:{
					type:'search',
					count:true,
					play:false,
					time:true,
				},
			}
		},
		created() {
			getCloudsearch({
				keywords: this.key,
				type: 1014
			}).then(res => {
				this.videos = res.data.result.videos
			})
		}
	}
	
</script>

<style scoped>
	.search-video{
		width: 100%;
		height: 100%;
	}
	
	.search-video ul{
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.search-video ul li{
		flex: 0 0 23%;
		margin-bottom: 20px;
	}
</style>
<template>
	<div class="MV">
		<ul>
			<li v-for="(item,index) in params">
				<video-mv :obj='vimvobj' :params='[
					item.imgurl,item.name,null,item.duration,item.playCount
				]'></video-mv>
			</li>
		</ul>
	</div>
</template>

<script>	
import videoormv from '../../../components/basics/videoormv.vue'
	export default{
		name:'MV',
		components:{
			'video-mv':videoormv
		},
		props:{
			params:Array
		},
		data() {
			return {
				vimvobj:{
					type:'MV',
					count:true,
					time:true,
				}
			}
		},
	}
	
</script>

<style scoped>
	.MV{
		width: 100%;
		height: auto;
	}
	
	.MV ul{
		width: 100%;
		height: auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	@media screen and (min-width:1100px) {
		.MV ul li{
			flex: 0 0 19%;
			height: auto;
			margin-bottom: 20px;
		}
	}
	
	@media screen and (max-width:1100px) {
		.MV ul li{
			flex: 0 0 40%;
			height:auto;
			margin-bottom: 20px;
		}
	}
	
</style>
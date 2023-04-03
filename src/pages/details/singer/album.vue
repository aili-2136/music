<template>
	<div class="album">
		<ul v-infinite-scroll="load">
			<li v-for="(item,index) in params">
				<song-list :obj='obj' :params='[
					item.blurPicUrl,null,item.name,item.publishTime
				]'></song-list>
			</li>
		</ul>
	</div>
</template>

<script>
	import {getArtistAlbum} from '../../../plugins/artist.js'
	import songlist from '../../../components/basics/songlist.vue'
	export default{
		name:'album',
		props:{
			params:Array
		},
		components:{
			'song-list':songlist
		},
		data() {
			return {
				obj:{
					type:"album"
				}
			}
		},
		methods:{
			load(){
				this.$emit('onload','album')
			}
		}
	}
	
</script>

<style scoped>
	.album{
		width: 100%;
		height: auto;
	}
	
	.album ul{
		width: 100%;
		height: auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	@media screen and (min-width:1100px) {
		.album ul li{
			flex: 0 0 15%;
			height: auto;
			margin-bottom: 20px;
		}
	}
	
	@media screen and (max-width:1100px) {
		.album ul li{
			flex: 0 0 18%;
			height: auto;
			margin-bottom: 20px;
		}
	}
	
</style>
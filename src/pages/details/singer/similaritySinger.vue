<template>
	<div class="similaritySinger">
		<ul>
			<li v-for="(item,index) in params">
				<song-list :obj='songobj' :params='[
					item.picUrl,null,item.name
				]'></song-list>
			</li>
		</ul>
	</div>
</template>

<script>
	import songlist from '../../../components/basics/songlist.vue'
	export default {
		name: 'similaritySinger',
		props: {
			params: Array
		},
		components: {
			'song-list': songlist
		},
		data() {
			return {
				songobj: {
					type: 'song'
				}
			}
		},
	}
</script>

<style scoped>
	.similaritySinger {		
		width: 100%;
		height: auto;
	}

	ul {
		width: 100%;
		height: auto;
		display: flex;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.similaritySinger>ul li {
		flex: 0 0 18.5%;
		margin-bottom: 20px;
	}
	
</style>

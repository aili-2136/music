<template>
	<div class="recommend">
		<ul>
			<li v-for="(item,index) in params">
				<rectangle :obj='recobj' :params='[
					item.picUrl,item.name,item.playCount,item.programCount,
					item.dj.nickname
				]'></rectangle>
			</li>
		</ul>
	</div>
</template>

<script>
	import rectangle from '../../../components/basics/rectangle.vue'
	export default {
		name: 'recommend',
		props: {
			params:Array
		},
		components: {
			'rectangle': rectangle,
		},
		data() {
			return {
				recobj:{
					type:'recommend'
				}
			}
		},
	}
</script>

<style scoped>
	.recommend{
		height: auto;
		margin: 0 28px 0 28px;
	}
	
	.recommend ul{
		width: 100%;
		height: auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.recommend ul li{
		flex: 0 0 49%;
		height: 53px;
		margin-bottom: 12px;
	}

</style>

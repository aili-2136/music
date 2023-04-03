<template>
	<div class="voice">
		<single :obj='singleobj' :params='params'></single>
	</div>
</template>

<script>	
import single from '../../../components/basics/single.vue'
	export default{
		name:'voice',
		props:{
			params:Array
		},
		components:{
			'single':single
		},
		data() {
			return {
				singleobj:{
					type:'podcast'
				}
			}
		},
	}
	
</script>

<style scoped>
	.voice{
		
	}
	
</style>
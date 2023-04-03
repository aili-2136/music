<template>
	<div class="collect">
		<coll :params='params'></coll>
	</div>
</template>

<script>	
import coll from '../../../components/collector/coll.vue'
	export default{
		name:'collect',
		props:{
			params:Array
		},
		components:{
			'coll':coll
		},
		data() {
			return {
				
			}
		},
	}
	
</script>

<style scoped>
	
	
</style>
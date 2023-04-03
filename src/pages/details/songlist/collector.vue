<template>
	<div class="collector">
		<coll :params='params'></coll>
	</div>
</template>

<script>
	import coll from '../../../components/collector/coll.vue'
	export default {
		name: 'collector',
		components:{
			'coll':coll
		},
		data() {
			return {
				params:[]
			}
		},
		created() {
			this.params=this.$attrs.collectors
		}
	} 
</script>

<style scoped>
	.collector{
		width: 100%;
		height: auto;;
	}

</style>

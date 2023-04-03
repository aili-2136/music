<template>
	<div class="singe-details">
		<p id="intro">
			<i>{{params.name}}简介</i>
			<i>{{params.briefDesc}}</i>
		</p>
		<div id="introduction">
			<div v-for="(item,index) in params.introduction">
				<i>{{item.ti}}</i>
				<p v-html="params.txt[index]"></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'singerDetails',
		props:{
			params:Object
		},
		data() {
			return {
				 
			}
		},
	}
	
</script>

<style scoped>
	.singe-details{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.singe-details #intro,.singe-details #introduction div{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		margin-bottom: 30px;
	}
	
	 i:nth-child(2n-1){
		font-size: 14px;
		font-weight: 600;
	}
	
	#introduction p, i:nth-child(2n){
		font-size: 12px;
		text-indent: 2em;
		letter-spacing: 2px;
		line-height: 25px;
		color: #848484;
	}
	
</style>
<template>
	<div class="singer-info">
		<div id="img">
			<img :src="params.img1v1Url">
		</div>
		<div class="intro">
			<p id="name">
				{{params.name}}
			</p>
			<p id="nickname">
				<span v-for="(item,index) in params.alias">
					{{index==0?item:'；'+item}}
				</span>
			</p>
			<p id="behavior">
				<span>
					<i class="iconfont icon-24gl-folderPlus"></i>
					收藏
				</span>
			</p>
			<p id="info">
				<span>单曲数:</span>
				<span>{{params.musicSize}}</span>
				<span>专辑数:</span>
				<span>{{params.albumSize}}</span>
				<span>MV数:</span>
				<span>555</span>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'singer-info',
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
	.singer-info {
		width: 100%;
		height: 100%;
		display: flex;
	}
	
	img{
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
	
	.singer-info #img {
		width: 163px;
		height: 163px;
		border-radius: 3px;
		border: 1px #F1F1F1 solid;
		border-radius: 5px;
	}
	
	.intro {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 16px;
	}
	
	#name{
		font-size: 20px;
		font-weight: 600;
	}
	
	#nickname{
		margin-top: 5px;
		font-size: 12px;
		font-weight: 400;
		color: #5f5f5f;
	}
	
	#behavior span{
		display: inline-block;
		padding: 0 15px 0 15px;
		margin-top: 8px;
		height: 30px;
		border: 1px #D9D9D9 solid;
		border-radius: 30px;
		font-size: 14px;
		line-height: 30px;
		color: #4b4b4b;
		cursor: pointer;
	}
	
	#info{
		margin-top: 5px;
		font-size:17px;
		font-variant-caps: all-small-caps;
	}
	
	#info span:nth-child(2n){
		margin-right: 20px;
	}
	
</style>

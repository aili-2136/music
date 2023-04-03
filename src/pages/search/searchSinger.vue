<template>
	<div class="singer">
		<ul>
			<li v-for="(item,index) in singers">
				<div id="left">
					<div id="img">
						<img :src="item.picUrl" alt="">
					</div>
					<div id="name">
						{{item.name}}
					</div>
				</div>
				<i class="iconfont icon-ziyuanxhdpi"></i>
			</li>
		</ul>
	</div>
</template>

<script>
	import {
		getCloudsearch
	} from '../../plugins/search.js'
	export default {
		name: 'searchSinger',
		data() {
			return {
				singers:[],
				key:this.$store.state.keyword.key
			}
		},
		created() {
			getCloudsearch({
				keywords:this.key,
				type: 100
			}).then(res => {
				this.singers = res.data.result.artists
			})
		}
	}
</script>

<style scoped>
	.singer{
		width: 100%;
		height:100%;
	}
	
	img{
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
	
	.singer ul {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	.singer ul li{
		width: 100%;
		height: 70px;
		display: flex;
		justify-content: space-between;
		line-height: 70px;
	}
	
	.singer ul li:hover{
		background-color: #F1F2F3;
	}
	
	.singer ul li #img{
		width: 53px;
		height: 53px;
		border-radius: 5px;
	}
	
	.singer ul li #left{		
		flex: 1;
		display: flex;
		align-items: center;
	}
	
	.singer ul li #left #name{
		margin-left: 15px;
		font-size: 12px;
	}
	
	.singer ul li:nth-child(2n){
		background-color: #fafafa;
	}
	
	.singer ul li >i{
		color: #FA5044;
		margin-right: 5px;
	}
</style>

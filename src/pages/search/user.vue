<template>
	<div class="user">
		<ul>
			<li v-for="(item,index) in users">
				<div id="left">
					<div id="img">
						<img :src="item.backgroundUrl" alt="">
					</div>
					<div id="name">
						{{item.nickname}}
					</div>
				</div>
				<span>{{item.authStatus==1?'小罗音乐人':''}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import {
		getCloudsearch
	} from '../../plugins/search.js'
	export default{
		name:'user',
		data() {
			return {
				users:[],
				key:this.$store.state.keyword.key
			}
		},
		created() {
			getCloudsearch({
				keywords: this.key,
				type: 1002
			}).then(res => {
				this.users = res.data.result.userprofiles
			})
		}
	}
	
</script>

<style scoped>
	.user{
		width: 100%;
		height:100%;
	}
	
	img{
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	.user ul {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}
	
	.user ul li{
		width: 100%;
		height: 70px;
		display: flex;
		justify-content: space-between;
		line-height: 70px;
	}
	
	.user ul li:hover{
		background-color: #F1F2F3;
	}
	
	.user ul li #img{
		width: 53px;
		height: 53px;
		border-radius:53px;
	}
	
	.user ul li #left{		
		flex: 1;
		display: flex;
		align-items: center;
	}
	
	.user ul li #left #name{
		margin-left: 15px;
		font-size: 12px;
	}
	
	.user ul li:nth-child(2n){
		background-color: #fafafa;
	}
	
	.user ul li >span{
		font-size: 16px;
		font-variant-caps: all-small-caps;
		color: #666666;
		margin-right: 10px;
	}
	
</style>
<template>
	<div class="coll">
		<ul>
			<li v-for="(item,index) in params">
				<div class="left">
					<div id="img">
						<img :src="item.avatarUrl" alt="小罗">
					</div>
				</div>
				<div class="right">
					<div class="box">
						<div class="name">
							{{item.nickname}}
						</div>
						<div class="text">
							{{item.signature}}
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>	
	export default{
		name:'coll',
		props:{
			params:Array
		},
		data() {
			return {
				
			}
		}
	}
	
</script>

<style scoped>
	.coll{
		height: auto;
		margin: 0 28px 0 28px;
	}
	
	.coll ul{
		width: 100%;
		height: auto;
		display: flex;
		flex-wrap: wrap;
	}
	
	img{
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	@media screen and (min-width:1100px){
		.coll ul li{
			flex: 0 0 33%;
			height: 98px;
			display: flex;
		}
	}
	
	@media screen and (max-width:1100px){
		.coll ul li{
			flex: 0 0 49.5%;
			height: 98px;
			display: flex;
		}
	}
	
	ul li .left{
		width: 78px;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	ul li .left #img{
		width: 78px;
		height: 78px;
		border-radius: 50%;
	}
	
	ul li .right{
		flex: 1;
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	ul li .right div{
		width: 100%;
		height: auto;
	}
	
	ul li .right .box{
		font-size: 12px;
	}
	
	ul li .right .box .text{
		height: 24px;
		font-size: 16px;
		font-variant-caps: all-small-caps;
		overflow: hidden;
	}
	
</style>
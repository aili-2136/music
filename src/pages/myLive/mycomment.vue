<template>
	<div class="my-comment">
		<div class="text">
			<div contenteditable="true">
						
			</div>
			<div>
				<p>
					<i class="iconfont icon-xiaolian"></i>
					<i class="iconfont icon-aite"></i>
					<i class="iconfont icon-hashjinghao"></i>
				</p>
				<p>
					评论
				</p>
			</div>
		</div>
		<div class="comment">
			呀~没有评论呢，你要来试试吗？
		</div>
	</div>
</template>

<script>	
	import comm from '../../components/comment/comm.vue'
	export default{
		name:'mycomment',
		components:{
			'comm':comm
		},
		data() {
			return {
				
			}
		},	
	}
	
</script>

<style scoped>
	.my-comment{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}
	
	.my-comment .text {
		height: 110px;
		margin: 0 28px 0 28px;
		display: flex;
		font-size: 12px;
		flex-direction: column;
	}
	
	.my-comment .text div:nth-child(1) {
		height: 60px;
		border: 1px #E5E5E5 solid;
		border-radius: 3px;
	}
	
	.my-comment .text div:nth-child(2) {
		height: 30px;
		margin-top: 5px;
		display: flex;
		justify-content: space-between;
	}
	
	.my-comment .text div p:nth-child(1) {
		width: 76px;
		height: 100%;
		display: flex;
		justify-content: space-around;
	}
	
	.my-comment .text div p i {
		font-size: 18px;
		color: #8c8c8c;
	}
	
	
	.my-comment .text div p:nth-child(2) {
		width: 52px;
		height: 24px;
		border: 1px #e5e5e5 solid;
		border-radius: 12px;
		font-size: 14px;
		line-height: 24px;
		text-align: center;
	}
	
	.comment{
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #9F9F9F;
	}
	
</style>
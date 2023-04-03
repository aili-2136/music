<template>
	<div class="comment">
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
		<div class="hot">
			<p>最热评论{{'('+hotcomment.comments.length+')'}}</p>
			<comm :params='hotcomment'></comm>
		</div>
		<div class="new">
			<p>最新评论{{'('+newcomment.comments.length+')'}}</p>
			<comm :params='newcomment'></comm>
		</div>
	</div>
</template>

<script>
	import comm from '../../../components/comment/comm.vue'
	export default{
		name:'comment',
		components:{
			'comm':comm
		},
		data() {
			return {
				hotcomment:{},
				newcomment:{}
			}
		},
		created() {
			this.hotcomment=this.$attrs.hotcomment
			this.newcomment=this.$attrs.newcomment
		}
	}
	
</script>

<style scoped>
	.comment{
		width: 100%;
		height: auto;
	}
	
	.comment .text {
		height: 110px;
		margin: 0 28px 0 28px;
		display: flex;
		font-size: 12px;
		flex-direction: column;
	}
	
	.comment .text div:nth-child(1) {
		height: 60px;
		border: 1px #E5E5E5 solid;
		border-radius: 3px;
	}
	
	.comment .text div:nth-child(2) {
		height: 30px;
		margin-top: 5px;
		display: flex;
		justify-content: space-between;
	}
	
	.comment .text div p:nth-child(1) {
		width: 76px;
		height: 100%;
		display: flex;
		justify-content: space-around;
	}
	
	.comment .text div p i {
		font-size: 18px;
		color: #8c8c8c;
	}
	
	
	.comment .text div p:nth-child(2) {
		width: 52px;
		height: 24px;
		border: 1px #e5e5e5 solid;
		border-radius: 12px;
		font-size: 14px;
		line-height: 24px;
		text-align: center;
	}
	
	.hot,.new{
		width: 100%;
		height: auto;
	}
	
	.hot p,.new p{
		font-size: 13px;
		font-weight: 700;
		margin:20px 0 0 28px;
	}
</style>
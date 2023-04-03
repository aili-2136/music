<template>
	<div class="music">
		<navigation :list='navigation' @onclick='onclick' :type='navtype'></navigation>
		<div class="ov">
			<div class="main">
				<keep-alive>
					<router-view name="recommend"></router-view>
					<router-view name="songlist"></router-view>
					<router-view name="rankinglist"></router-view>
					<router-view name="singer"></router-view>
					<router-view name="newest"></router-view>
				</keep-alive>
			</div>
		</div>
	</div>
</template>

<script>
	import navigation from '../../components/basics/navigation.vue'
	export default{
		name:'music',
		components:{navigation},
		data() {
			return {
				navigation:['个性推荐','歌单','排行榜','歌手','最新音乐'],
				path:0,		//跳转去哪个页面
				navtype:'music'
			}
		},
		methods:{
			onclick(value){
				this.path=value
			}
		},		
		watch: {
			path:{
				handler(value){
					switch (value){
						case 0:
							this.$router.push({
								name:'gorecommend'
							})
							break;
						case 1:
							this.$router.push({
								name:'gosonglist'
							})
							break;
						case 2:
							this.$router.push({
								name:'gorankinglist'
							})
							break;
						case 3:
							this.$router.push({
								name:'gosinger'
							})
							break;
						case 4:
							this.$router.push({
								name:'gonewest'
							})
							break;
						default:
							break;
					}
				}
			}
		},
	}
	
</script>

<style scoped>
	.music{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	
	.ov{
		flex: auto;
		height: 0;
		margin-top: 10px;
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		justify-content: center;
	}
	
	.ov::-webkit-scrollbar{
		width: 4px;
		border-radius: 4px;
		background-color: #ffffff;
	}
	
	.ov::-webkit-scrollbar-thumb{
		border-radius: 4px;
		height: 2px;
		background-color: #e1e1e1;
	}
	
	@media screen and (max-width:1205px) {
		.main{
			width: 100%;
			height: auto;
			margin: 0 28px 0 28px;
		}	
	}
	
	@media screen and (min-width:1205px) {
		.main{
			width: 973px;
			height: auto;
		}
	}
	
</style>
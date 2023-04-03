<template>
	<div class="video">
		<navigation :list='list' :pointer='vi_mv' @onclick='onclick' :type='navtype' v-show="isallmv==null"></navigation>
		<div class="video-allmv" v-show="isallmv!==null">
			<p>全部MV</p>
		</div>
		<div class="vi_mv">
			<div class="content">
				<keep-alive>
					<router-view name="vi"></router-view>
					<router-view name="mv"></router-view>
					<router-view name="allmv"></router-view>
				</keep-alive>
			</div>
		</div>
	</div>
</template>

<script>
	import navigation from '../../components/basics/navigation.vue'
	export default {
		name: 'myvideo',
		components: {
			'navigation': navigation,
		},
		data() {
			return {
				list: ['视频', 'MV'],
				vi_mv: 0, //视频还是
				navtype:'details'
			}
		},
		methods: {
			onclick(value) {
				this.vi_mv = value
			}
		},
		computed:{
			isallmv(){
				return this.$store.state.allmv
			}
		},
		watch: {
			vi_mv: {
				handler(value) {
					if (value == 0) {
						this.$router.push({
							name: 'govi'
						})
					} else {
						this.$router.push({
							name: 'gomv'
						})
					}
				}
			},
			isallmv:{
				handler(value){
					if(value!==null){
						switch (value[0]){
							case '最新':
								this.$router.push({
									name:'goallmv',
									query:{
										type:value[0],
										name:value[1]
									}
								})
								break;							
							default:
								this.$router.push({
									name:'goallmv',
									query:{
										type:value[0]
									}
								})
								break;
						}
					}
				}
			},
			  $route: {
			    handler: function(val, oldVal){
			      if(val.name=='gomv'){
					  this.vi_mv=1
				  }else{
					  this.vi_mv=0
				  }
			    },
			    // 深度观察监听
			    deep: true
			  }
		},
	}
</script>

<style scoped>
	.video {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.video-allmv{
		width: 100%;
		height: 55px;
		margin: 0 28px 0 28px;
		line-height: 55px;
		font-size: 18px;
		font-weight: 600;
	}
	
	.vi_mv {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
	}

	@media screen and (max-width:1205px) {
		.content {
			width: 100%;
			height: auto;
			margin: 0 28px 0 28px;
		}
	}

	@media screen and (min-width:1205px) {
		.content {
			width: 973px;
			height: auto;
		}
	}
</style>

<template>
	<div class="podcast">
		<div class="ov" ref="ov">
			<div class="main">
				<div id="homepage" v-show="!ismore">
					<homepage></homepage>
				</div>
				<div id="more" v-show="ismore">
					<keep-alive>
						<router-view name="more"></router-view>
					</keep-alive>
				</div>
			</div>
		</div>
	</div>
</template>

<script>	
import homepage from '../podcast/homepage.vue'
	export default{
		name:'podcast',
		components:{
			'homepage':homepage
		},
		data() {
			return {
				
			}
		},
		watch:{
			ismore:{
				handler(value){
					this.$refs.ov.scrollTop=0
				}
			}
		},
		computed:{
			ismore(){
				return this.$store.state.more
			}
		},
		activated() {
			this.$store.dispatch('catalog','podcast')
		}
	}
	
</script>

<style scoped>
	.podcast{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.ov{
		flex: auto;
		height: 0;
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
	
	.main{
		width: 100%;
		height: 100%;
	}
	
	#homepage,#more{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
	}
	
	
</style>
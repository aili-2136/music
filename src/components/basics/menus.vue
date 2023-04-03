<template>
	<div class="menus">
		<div class="ov">
			<div class="menus-top">
				<span @click="click('全部视频')" :class="{'click':name=='全部视频'}">全部视频</span>
			</div>
			<div class="menus-cross-line">
				
			</div>
			<div class="menus-content">
				<ul>
					<li v-for="(item,index) in params" 
					@click="click(item.name)"
					:class="{'click':name==item.name}"
					>
						{{item.name}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>	
	export default{
		name:'menus',
		data(){
			return {
				name:''
			}
		},
		props:{
			params:Array,
			text:String
		},
		methods:{
			click(item){
				this.name=item
				this.$emit('onclick',item) //触发父组件方法，并传递参数
			}
		},
		watch:{
			text:{
				handler(value){
					this.name=value
				}
			}
		}
	}
	
</script>

<style scoped>
	.menus{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		border-radius: 5px;
		background-color: #ffffff;
		box-shadow: -2px 1px 0px 0px #f7f7f7;
		-webkit-box-shadow: 0px 2px 2px #d9d9d9;
		-moz-box-shadow: 0px 2px 2px #d9d9d9;
		overflow-y: auto;
	}
	
	.ov{
		flex: auto;
		height: 0;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}
	
	.ov::-webkit-scrollbar {
		width: 4px;
		border-radius: 4px;
		background-color: #ffffff;
	}

	.ov::-webkit-scrollbar-thumb {
		border-radius: 4px;
		height: 2px;
		background-color: #e1e1e1;
	}
	
	.menus-top{
		width: 100%;
		height: 54px;
		font-size: 16px;
		font-variant-caps: all-small-caps;
		line-height: 54px;
		margin-left: 20px;
		cursor: pointer;
	}
	
	.menus-top span{
		display: inline-block;
		padding: 0 10px 5px 10px;
		line-height: 20px;
		border-radius: 23px;
	}
	
	.menus-cross-line{
		width: 100%;
		height: 1px;
		background-color: #d9d9d9;
	}
	
	.menus-content{
		flex: 1;
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
	}
	
	.menus-content ul{
		width: 504px;
		height: 100%;
		margin-top: 18px;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	
	.menus-content ul li{
		width: 84px;
		height: 26px;
		font-size: 16px;
		margin-bottom:18px;
		line-height: 21.5px;
		color: #6c6c6c;
		display: flex;
		justify-content: center;
		cursor: pointer;
		border-radius: 26px;
		font-variant-caps: all-small-caps;
	}
	
	
	.menus-top span:hover{
		color: #FF7A9E;
	}
	
	.menus-content ul li:hover{
		color: #FF7A9E;
	}
	
	.click{
		background-color: #FDEBEB;
		color: #EC4141;
	}

</style>
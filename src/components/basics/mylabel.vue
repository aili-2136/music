<template>
	<div class="my-label">
		<div class="my-label-top">
			<span @click="click('全部歌单')" :class="{'click':name=='全部歌单'}">全部歌单</span>
		</div>
		<div class="my-label-cross-line">

		</div>
		<div class="my-label-content">
			<ul>
				<li v-for="(item,index) in obj">
					<div id="classify">
						<i class="iconfont icon-diqiu" v-show="index==0"></i>
						<i class="iconfont icon-chongwufuzhuang" v-show="index==1"></i>
						<i class="iconfont icon-kafei" v-show="index==2"></i>
						<i class="iconfont icon-xiaolian-" v-show="index==3"></i>
						<i class="iconfont icon-fengge" v-show="index==4"></i>
						<span>{{item}}</span>
					</div>
					<div id="content">
						<span v-for="(item,index) in label[index]" @click="click(item)">
							<span id="text" :class="{'click':name==item||dome==item}">{{item}}</span>
						</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'mylabel',
		props: {
			obj: Array,
			label:Array,
			dome:String
		},
		data(){
			return {
				name:''
			}
		},
		methods:{
			click(item){
				this.name=item
				this.$emit('onclick',item)
			}
		}
	}
</script>

<style scoped>
	.my-label {
		z-index: 2;
		width: 658px;
		height: 658px;
		display: flex;
		flex-direction: column;
		border-radius: 5px;
		background-color: #ffffff;
		box-shadow: -2px 1px 0px 0px #f7f7f7;
		-webkit-box-shadow: 0px 2px 2px #d9d9d9;
		-moz-box-shadow: 0px 2px 2px #d9d9d9;
	}

	.my-label-top {
		width: 100%;
		height: 54px;
		font-size: 17px;
		font-variant-caps: all-small-caps;
		line-height: 54px;
		margin-left: 20px;
	}

	.my-label-top span{
		display: inline-block;
		line-height: 16px;
		padding: 0 10px 5px 10px;
		cursor: pointer;
		border-radius: 25px;
	}

	.my-label-top span:hover{
		color: #FF7A9E;
	}

	.my-label-cross-line {
		width: 100%;
		height: 1px;
		background-color: #d9d9d9;
	}
	
	.my-label-content{
		flex: 1;
	}
	
	.my-label-content ul{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.my-label-content ul li{
		width: 100%;
		height: auto;
		display: flex;
		margin-top: 15px;
	}
	
	#classify{
		width: 120px;
		height: 100%;
		position: relative;
		padding-top: -10px;
		font-size: 12px;
		text-align: center;
	}
	
	#classify i{
		color: #999999;
		font-size: 24px;
		margin-right: 5px;
	}
	
	#classify span{
		color: #CFCFCF;
		position: absolute;
		display: inline-block;
		top: 10px;
	}
	
	#content{
		flex: 1;
	}
	
	#content >span{
		display: inline-block;
		width:89px;
		height: 26px;
		color: #373737;
		text-align: center;
		line-height: 22px;
		margin: 7px 0 8px 0;
		font-size: 17px;
		font-variant-caps: all-small-caps;
		cursor: pointer;
	}
	
	#content >span:hover{
		color: #FF7A9E;
	}
	
	#text{
		display: inline-block;
		line-height: 12px;		
		padding: 0 5px 5px 5px;
		border-radius: 19px;
	}
	
	.click{
		background-color: #FFF8FA;
		color: #FF7A9E;
	}
	
</style>

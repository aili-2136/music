<template>
	<div class="sizer">
		<ul>
			<li v-for="(item,index1) in params[0]">
				<div id="left">
					{{item+':'}}
				</div>
				<div id="option">
			<li v-for="(item,index2) in params[index1+1]" @click="onclick(index1,item)">
				<span id="text"
					:class="{'click':(index1==0&&click.clicka==item)||(index1==1&&click.clickb==item)||(index1==2&&click.clickc==item)}">
					{{item}}
				</span>
			</li>
	</div>
	</li>
	</li>
	</ul>
	</div>
</template>

<script>
	export default {
		name: 'sizer',
		props: {
			params: Array,
			sizerobj:Object
		},
		data() {
			return {
				click: {
					clicka: '',
					clickb: '',
					clickc: ''
				}
			}
		},
		methods: {
			onclick(id1, item) {
				switch (id1) {
					case 0:
						this.click.clicka = item
						break;
					case 1:
						this.click.clickb = item
						break;
					case 2:
						this.click.clickc = item
						break;
					default:
						break;
				}
			}
		},
		watch: {
			click: {
				deep: true,
				handler(value) {
					this.$emit('onclick', value)
				}
			}
		},
		mounted() {
			this.click=this.sizerobj
		}
	}
</script>

<style scoped>
	.sizer {
		width: 100%;
		height: auto;
	}
	
	.sizer >ul{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}
	
	.sizer >ul >li{
		width: 100%;
		height: auto;
		display: flex;
		font-size: 16px;
		font-variant-caps: all-small-caps;
	}
	
	#left{
		width: 30px;
		height: 100%;
		line-height: 15px;
	}
	
	#option{
		flex: 1;
		width: 100%;
		height: auto;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	} 
	
	#option li{
		display: inline-block;
		width: 68px;
		height: 15px;
		margin-bottom: 10px;
		display: flex;
		border-right: 1px #F2F2F2 solid;
		justify-content: center;
		position: relative;
		cursor: pointer;
	}
	
	#option >li:hover #text{
		color: #373737;
	}
	
	#option >li:last-of-type {
		border-right: none;
	}
	
	#option li span{
		display: inline-block;
		position: absolute;
		line-height: 15px;
	}
	
	#text {
		display: inline-block;
		line-height: 10px;
		color: #676767;
		padding: 0 10px 4px 10px;
		border-radius: 10px;
	}
	
	.click{
		background-color: #FFF3F6;
		color: #FF7A9E !important;
	}
	
</style>


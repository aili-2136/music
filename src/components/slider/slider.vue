<template>
	<div class="slider">
		<el-slider v-model="coefficient" :show-tooltip="false"></el-slider>
	</div>
</template>
<script>
	import {getmiao1} from '../../general/regular.js'
	export default {
		name: 'slider',
		props: {
			playing:Boolean,
			currentTime:Number
		},
		data() {
			return {
				coefficient:0,//(时长/进度条长度)
				timer:null,		//播放定时器
				playtime:0		//已播放时长
			}
		},
		methods: {

			// //点击进度条跳转
			// enterSlider(e) {
			// 	e.preventDefault() //阻止默认事件
			// 	if (!this.vertical) {
			// 		this.coverStyle.width = e.offsetX + 'px'
			// 		this.wheelStyle.left = e.offsetX - 4 + 'px'
			// 		this.playtime=Math.floor(e.offsetX/this.coefficient)
			// 		this.$emit('updadteCurrentTime',this.playtime)
			// 	}
			// },

			// //拖动
			// handleSliderMouseDown(event) {
			// 	event.preventDefault() 
			// 	const offsetX=event.offsetX
			// 	document.onmousemove = (e) => {	
			// 		e.preventDefault()
			// 		const X=e.clientX
			// 		const cl=X-offsetX
			// 		const {
			// 			left,
			// 			width
			// 		} = this.slider
			// 		const ml=cl-left
			// 		let progressWidth
			// 		if (ml <= 0) {
			// 			progressWidth = 0
			// 		} else if (ml >= width) {
			// 			progressWidth = width
			// 		} else {
			// 			progressWidth = ml
			// 		}
			// 		this.coverStyle.width = progressWidth + 'px'
			// 		this.wheelStyle.left = progressWidth - 4 + 'px'
			// 		this.playtime=Math.floor(progressWidth/this.coefficient)
			// 		this.$emit('updadteCurrentTime',this.playtime)
			// 	}
			// 	document.onmouseup = () => {
			// 		document.onmousemove = null
			// 		document.onmouseup = null					
			// 	}
			// },
		},
		mounted() {
			
			
		},
		computed:{
			isplaying(){
				return this.playing
			},
			isparams(){
				return this.params
			}
		},
		watch:{
			// isplaying:{
			// 	handler(value){
			// 		if(value){
			// 			this.timer=setInterval(e=>{
			// 				this.playtime++
			// 				this.$emit('getPlaytime',this.playtime)
			// 				this.coverStyle.width=(this.coefficient*this.playtime)+'px'
			// 				this.wheelStyle.left=(this.coefficient*this.playtime)-4+'px'				
			// 			},1000)
			// 		}else{
			// 			clearInterval(this.timer)
			// 		}
			// 	}
			// },
			// isparams:{
			// 	deep:true,
			// 	handler(value){
			// 		this.coefficient=(this.params.width/getmiao1(value.time)).toFixed(6)
			// 	}
			// }
		},
	}
</script>

<style scoped>
	.slider{
		flex: 1;
		width: 100%;
		height: 20px;
		display: flex;
		justify-content: center;
	}

	/deep/ .el-slider{
		cursor: default;
		width: 97%;
		height: 20px;
	}

	/deep/.el-slider__runway{
		width: 100%;
		height: 4px;
		cursor: default;
		margin-top: 8px;
	}
	
	/deep/ .el-slider__bar{
		background-color: #FF7A9E;
		cursor: default;
	}
	
	/deep/.el-slider__button-wrapper{
		cursor: default;
	}
	
	/deep/.el-slider__button{
		margin-top: -1px;
		width: 8px;
		height: 8px;
		border: none;
		background-color: #FF7A9E;
		cursor: default;
	}

</style>

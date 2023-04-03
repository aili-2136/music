<template>
	<div class="yzm">
		
		<div id="input" @keyup="fnCheckCodeKeyup" @keydown="fnCheckCodeKeydown">
			<input class="input"  maxlength="1" max="9" min="0" data-index="0"
				v-model.number="aCheckCodeInput[0]" :style="[aCheckCodeInput[0]==''?'':inputSty]">
			<input class="input"  maxlength="1" max="9" min="0" data-index="1"
				v-model.number="aCheckCodeInput[1]" :style="[aCheckCodeInput[1]==''?'':inputSty]">
			<input class="input"  maxlength="1" max="9" min="0" data-index="2"
				v-model.number="aCheckCodeInput[2]" :style="[aCheckCodeInput[2]==''?'':inputSty]">
			<input class="input"  maxlength="1" max="9" min="0" data-index="3"
				v-model.number="aCheckCodeInput[3]" :style="[aCheckCodeInput[3]==''?'':inputSty]">
		</div>
		
		<div id="butt" @click="hqyzm">
			获取验证码
		</div>
	</div>
</template>

<script>	
	export default{
		name:'yzm',
		props:{
			
		},
		data() {
			return {
				aCheckCodeInput:['','','',''],
				inputSty:{
					boxShadow: "inset 2px 2px 10px rgb(255, 255, 255)"
				}
			}
		},
		methods: {
			hqyzm(){
				this.$emit('ongain')
			},
			fnCheckCodeKeyup(e) {
				let index = e.target.dataset.index * 1;
				let el = e.target;
				// 解决输入e的问题
				el.value = el.value
					.replace(/Digit|Numpad/i, "")
					.slice(0, 1);
				if (/Digit|Numpad/i.test(e.code)) {
					// 必须在这里赋值，否则输入框会是空值
					this.aCheckCodeInput.splice(index, 1, e.code.replace(/Digit|Numpad/i, ""));
					el.nextElementSibling && el.nextElementSibling.focus();
					if (index === 3) {
						if (this.aCheckCodeInput.join("").length === 4) document.activeElement.blur();
					}
				}
			},
			// 输入验证码，检测位置变化
			fnCheckCodeKeydown(e) {
				let index = e.target.dataset.index * 1;
				let el = e.target;
				if (e.key === "Backspace") {
					if (this.aCheckCodeInput[index].length > 0) {
						this.aCheckCodeInput.splice(index, 1, '');
					} else {
						if (el.previousElementSibling) {
							el.previousElementSibling.focus();
							this.aCheckCodeInput[index - 1] = '';
						}
					}
				} else if (e.key === 'Delete') {
					if (this.aCheckCodeInput[index].length > 0) {
						this.aCheckCodeInput.splice(index, 1, '');
					} else {
						if (el.nextElementSibling) {
							el.nextElementSibling.focus();
							this.aCheckCodeInput[++index] = '';
						}
					}
				} else if (e.key === "Home") {
					el.parentElement.children[0] && el.parentElement.children[0].focus();
				} else if (e.key === "End") {
					el.parentElement.children[this.aCheckCodeInput.length - 1] &&
						el.parentElement.children[this.aCheckCodeInput.length - 1].focus();
				} else if (e.key === "ArrowLeft") {
					if (el.previousElementSibling) el.previousElementSibling.focus();
				} else if (e.key === "ArrowRight") {
					if (el.nextElementSibling) el.nextElementSibling.focus();
				}
			},
		},
		watch:{
			aCheckCodeInput:{
				deep:true,
				handler(value){
					if(value.indexOf('')==-1){
						var reg1 = new RegExp(",","g")
						let Code=value.toString()
						this.$emit('onsubmit',Code)
					}
				}
			}
		}
	}
	
</script>

<style scoped>
	.yzm{
		display: flex;
		height: 39px;
	}
	
	#input{
		background: none;
		border: none;
		outline: none;
		width: 140px;
		height: 39px;
		font-size: 12px;
		border-radius: 9999px;
		box-shadow: inset 2px 2px 10px rgb(255, 255, 255);
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	input{
		position: relative;
		width:20px;
		height: 30px;
		border-radius: 30px;
		border: none;
		outline: none;
		padding-left: 10px;
		color: #fff;
		background: none;	
	}
	
	
	#butt{
		background: none;
		border: none;
		outline: none;
		height: 38px;
		line-height: 36px;
		padding: 1px 15px;
		font-size: 12px;
		border-radius: 9999px;
		box-shadow: inset 2px 2px 10px rgb(255, 255, 255);
		color: #fff;
		cursor: pointer;
	}
	
	#butt:active{
		transform: scale(0.95);
	}
	
</style>
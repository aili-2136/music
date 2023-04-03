<template>
	<div class="box" @keyup="fnCheckCodeKeyup" @keydown="fnCheckCodeKeydown">
		<input class="input"  maxlength="1" max="9" min="0" data-index="0"
			v-model.number="aCheckCodeInput[0]">
		<input class="input"  maxlength="1" max="9" min="0" data-index="1"
			v-model.number="aCheckCodeInput[1]">
		<input class="input"  maxlength="1" max="9" min="0" data-index="2"
			v-model.number="aCheckCodeInput[2]">
		<input class="input"  maxlength="1" max="9" min="0" data-index="3"
			v-model.number="aCheckCodeInput[3]">
	</div>
</template>
<script>
	import {
		getCaptchaVerify
	} from '../../plugins/register.js'
	export default {
		name: 'myyzm',
		props: {
			phone: String
		},
		data() {
			return {
				aCheckCodeInput: ['', '', '', ''],
			}
		},
		methods: {
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
		computed: {

		},
		watch: {

		},
		mounted() {

		}
	}
</script>

<style scoped>
	.box {
		width: 200px;
		height: 40px;
		display: flex;
		justify-content: space-between;
	}

	.input {
		position: relative;
		width: 25px;
		height: 40px;
		border-radius: 5px;
		border: none;
		outline: none;
		background-color: rgb(235, 235, 235);
		box-shadow: inset 3px 3px 6px #d1d1d1,
			inset -3px -3px 6px #ffffff;
		padding-left: 20px;
		transition: .4s ease-in-out;
	}

	/* .input:hover {
	  box-shadow: inset 0px 0px 0px #d1d1d1,
	            inset 0px 0px 0px #ffffff;
	  background-color: #ababab;
	}
	
	.input:focus {
	  box-shadow: inset 0px 0px 0px #d1d1d1,
	            inset 0px 0px 0px #ffffff;
	  background-color: #ababab;
	}
 */
</style>

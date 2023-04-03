<template>
		<input :placeholder="placeholder" class="input" v-model="inputValue" @blur="onblur" @focus="onfocus">
</template>

<script>
	export default {
		name: 'myinput',
		props: {
			placeholder: String,
		},
		data() {
			return {
				inputValue: ''
			}
		},
		methods: {
			onblur() {
				if (this.inputValue !== '') {
					this.$emit('onblur', this.inputValue)
				}
			},
			onfocus() {
				this.$emit('onfocus', '')
			}
		},
		mounted() {
			// switch (this.params) {
			// 	case '账号':
			// 		this.placeholder = '请输入手机号'
			// 		break;
			// 	case '设置密码':
			// 		this.placeholder = '请设置登录密码'
			// 		break;
			// 	case '密码':
			// 		this.placeholder = '请输入密码'
			// 		break;
			// 	case '昵称':
			// 		this.placeholder = '设置昵称'
			// 		break;
			// 	default:
			// 		break;
			// }
		}
	}
</script>

<style scoped>
	.input {
	  margin: 10px 0 10px 0;
	  background: none;
	  border: none;
	  outline: none;
	  max-width: 190px;
	  padding: 10px 20px;
	  font-size: 16px;
	  border-radius: 9999px;
	  box-shadow: inset 2px 2px 10px rgb(255, 255, 255);
	  color: #fff;
	}
	
	::-ms-input-placeholder{
		color: #e5e5e5;
	}
	
	::-webkit-input-placeholder{
		color: #e5e5e5;
	}

	input::placeholder{
		color: #e5e5e5;
	}
</style>

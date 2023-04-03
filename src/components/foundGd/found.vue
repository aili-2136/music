<template>
	<div class="found">
		<i class="iconfont icon-chacha1" id="cha" @click="close"></i>
		<i id="new">新建歌单</i>
		<input type="text" placeholder="请输入新歌单标题" v-model="gdName" />
		<div id="pri">
			<input type="checkbox" v-model="pri">
			设置为隐私歌单
		</div>
		<button style="margin-top: 20px;" :disabled=ban @click="found" :style="jia">创建</button>
	</div>
</template>

<script>
	export default {
		name: 'found',
		props: {

		},
		data() {
			return {
				gdName: null,
				ban: true, //true则禁用按钮
				pri: false, //是否是隐私歌单
				jia: null
			}
		},
		methods: {
			//关闭
			close() {
				this.$emit('onclose', 'true')
			},
			//提交
			found() {
				this.$emit('onfound', {
					name: this.gdName,
					pri: this.pri
				})
			}
		},
		watch: {
			gdName: {
				handler(value) {
					if (value) {
						this.ban = false
						this.jia = {
							backgroundColor: '#FF7A9E'
						}
					} else {
						this.ban = true
						this.jia=null
					}
				}
			},

		}
	}
</script>

<style scoped>
	.found {
		width: 100%;
		height: 100%;
		background: #fff;
		display: flex;
		flex-direction: column;
		position: relative;
		align-items: center;
		border-radius: 5px;
		box-shadow: 5px 5px 10px rgba(0, 0, 0, .1), -5px -5px 10px rgba(0, 0, 0, .11);
	}

	.found #cha {
		position: absolute;
		right: 5px;
	}

	.found>input {
		width: 90%;
		border-radius: 3px;
		height: 24px;
		font-size: 12px;
		padding-left: 5px;
		margin-top: 10px;
		border: 1px #E0E0E0 solid;
	}

	.found #new {
		font-size: 15px;
		font-weight: 600;
		margin-top: 30px;
	}

	.found #pri {
		width: 90%;
		margin-top: 5px;
		font-size: 12px;
		position: relative;
		padding-left: 30px;
	}

	.found #pri input {
		position: absolute;
		top: 2px;
		left: 12px;
	}

	.found button {
		width: 80px;
		height: 30px;
		border-radius: 30px;
		border: none;
		background-color: #FFBDCF;
		color: #fff;
	}

	.found button:active{
		background-color: #FFBDCF !important;
	}
	
	input::-webkit-input-placeholder {
		/* WebKit browsers */
		font-size: 15px;
		font-variant-caps: all-small-caps;
		color: #c6c6c6;
	}

	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		font-size: 15px;
		font-variant-caps: all-small-caps;
		color: #c6c6c6;
	}

	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		font-size: 15px;
		font-variant-caps: all-small-caps;
		color: #c6c6c6;
	}

	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		font-size: 15px;
		font-variant-caps: all-small-caps;
		color: #c6c6c6;
	}
</style>

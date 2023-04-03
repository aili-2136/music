<template>
	<div class="drawer">
		<el-drawer :visible.sync="drawer" :with-header="false" :direction="direction" :size='drawerSize' @open='open'
			ref="drawerRef">
			<div class="box">
				<div id="shade" :style="{backgroundImage:'url('+SongDetail.img+')'}">
					<div class="text">
						<i class="iconfont icon-xiangxiajiantou" @click="colse"></i>
						<div class="hander">
							<div id="name">
								{{SongDetail.name}}
							</div>
							<div id="nickname">
								<div>
									<span v-for="(item,index) in SongDetail.nickname">
										{{index==0?item.name:'/'+' '+item.name}}
									</span>
								</div>
							</div>
						</div>
						<div class="content">
							<div id="img" :class="isplay?'':'toggleAudioAni'">
								<div id="outer">
									<div id="inside">
										<img :src="SongDetail.img" alt="">
									</div>
								</div>
							</div>
							<div id="lyric">
								<div id="parcel" ref="parcel">
									<p>
										<i></i>
										<i></i>
										<i></i>
										<span v-for="(item,key,index) in SongDetail.lyric" :ref="'i'+index">
											{{item}}
										</span>
										<i></i>
										<i></i>
										<i></i>
										<i></i>
										<i></i>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="inner">

					</div>
				</div>
			</div>
		</el-drawer>

	</div>
</template>

<script>
	export default {
		name: 'drawer',
		props: {
			play:Boolean,
			sync: Boolean,
			params: Object,
			playtime: Number
		},
		data() {
			return {
				drawer: false,
				direction: 'btt',
				drawerSize: '100%',
				SongDetail: {},
				scale: 0, //刻度
				refname: [], //
				refHeight: [] //
			}
		},
		methods: {
			colse() {
				this.$refs.drawerRef.closeDrawer()
				this.$emit('onclick', false)
			},
			open(index) {
				this.$nextTick(() => {
					if (this.$refs[`${this.refname[index]}`] !== undefined) {
						if (this.$refs[`${this.refname[index]}`][0].clientHeight == 34) {
							this.$refs.parcel.scrollTop = index * 34
						} else {
							this.$refs.parcel.scrollTop = (index + 1) * 34
						}
						this.$refs[`${this.refname[index-1]}`][0].style.fontSize = '16px'
						this.$refs[`${this.refname[index-1]}`][0].style.fontWeight = 300
						this.$refs[`${this.refname[index-1]}`][0].style.color = '#d1d1d1'
						this.$refs[`${this.refname[index]}`][0].style.fontSize = '17px'
						this.$refs[`${this.refname[index]}`][0].style.fontWeight = 700
						this.$refs[`${this.refname[index]}`][0].style.color = '#ff557f'
					}
				})
			}
		},
		computed: {
			issync() {
				return this.sync
			},
			isparams() {
				return this.params
			},
			isplay(){
				return this.play
			},
			isplaytime() {
				return parseInt(this.playtime)
			},
			isscale() {
				return this.scale
			}
		},
		watch: {
			issync: {
				handler(value) {
					this.drawer = value
				}
			},
			isparams: {
				deep: true,
				handler(value) {
					this.SongDetail = value
					for (var i = 0; i < Object.keys(this.SongDetail.lyric).length; i++) {
						this.refname.push('i' + i)
					}
				}
			},
			isplaytime: {
				handler(value) {
					let i = 0
					for (let key in this.SongDetail.lyric) {
						if (+key == value) {
							this.scale = i
						}
						i++
					}
				}
			},
			isscale: {
				handler(value) {
					this.open(value)
				}
			}
		},

	}
</script>

<style scoped>
	.el-drawer__wrapper {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: hidden;
		height: calc(100% - 70px);
	}

	img {
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.ov {
		flex: auto;
		height: auto;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.ov::-webkit-scrollbar {
		display: none;
	}

	.ov::-webkit-scrollbar-thumb {
		border-radius: 4px;
		height: 2px;
		background-color: #e1e1e1;
	}

	.box {
		width: 100%;
		height: 100%;
		background-repeat: no-repeat !important;
		background-size: 100% 100% !important;
		display: flex;
		flex-direction: column;
	}

	.box #shade {
		width: 100%;
		height: 100%;
		position: relative;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		overflow: hidden;
		z-index: 1;
	}

	.box #shade .inner {
		position: absolute;
		top: -35px;
		left: -30px;
		width: 105%;
		height: 100vh;
		background: inherit;
		-webkit-filter: blur(20px);
		-moz-filter: blur(20px);
		-ms-filter: blur(20px);
		-o-filter: blur(20px);
		filter: blur(20px);
		filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false);
		z-index: 1;
	}

	.box #shade .text {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 9;
		color: #d1d1d1;
	}

	.box #shade .text>i {
		display: inline-block;
		margin: 10px 0 0 30px;
	}

	.hander {
		margin-top: 50px;
		text-align: center;
	}

	.hander #name {
		font-size: 24px;
		font-weight: 500;
	}

	.hander #nickname {}

	.content {
		flex: 1;
		display: flex;
		justify-content: center;
	}

	.content #img {
		width: 230px;
		height: 310px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		-webkit-animation: audio_icon 2s linear infinite;
		animation: audio_icon 2s linear infinite;
	}

	.content #img #outer {
		width: 230px;
		height: 230px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		background-image: url('../../../../public/image/guangpan.png');
		background-size: 440px 1734px;
		background-position: 273.5px 1057px;
	}

	.content #img #inside {
		width: 152px;
		height: 152px;
		border-radius: 50%;
	}

	.content #lyric {
		width: 420px;
		height: 380px;
		margin-left: 80px;
		display: flex;
	}

	#parcel {
		flex: 1;
		width: 100%;
		height: auto;
		font-weight: 300;
		margin-top: 40px;
		overflow-y: hidden;
		overflow-x: hidden;
		padding-right: 20px
	}

	#parcel:hover {
		overflow-y: auto;
		margin-left: 6px;
	}

	#parcel::-webkit-scrollbar {
		width: 6px;
		border-radius: 4px;
		background-color: #ffffff;
	}

	#parcel::-webkit-scrollbar-thumb {
		border-radius: 4px;
		height: 2px;
		background-color: #e1e1e1;
	}

	#parcel p {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	#parcel i {
		display: block;
		width: 100%;
		height: 34px;
	}

	#parcel span {
		display: block;
		width: 100%;
		height: auto;
		font-size: 14px;
		line-height: 34px;
		text-align: center;
	}

	@-webkit-keyframes audio_icon {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	.toggleAudioAni {
		animation-play-state: paused !important;
		-webkit-animation-play-state: paused !important;
	}
</style>

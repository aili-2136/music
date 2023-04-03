<template>
	<div class="more" v-if="ismore">
		<p>{{ this.$route.query.name}}</p>
		<ul v-infinite-scroll="load">
			<li v-for="(item,index) in djRadios" @click="getpage(item.id,'播客')">
				<div id="img">
					<img :src="item.picUrl" alt="">
				</div>
				<div id="name">
					<div>
						<p>{{item.name}}</p>
						<p>{{item.rcmdtext}}</p>
						<p>
							<span>声音</span>
							<span>:</span>
							<span>{{item.programCount}}</span>
							<span>收藏</span>
							<span>:</span>
							<span>{{item.subCount}}</span>
						</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {
		getDjRadioHot
	} from '../../plugins/dj.js'
	export default {
		name: 'more',
		props: {
			params: Object
		},
		data() {
			return {
				ys: 0,
				djRadios: [],
			}
		},
		methods: {
			load() {
				getDjRadioHot({
					cateId: this.$route.query.id,
					limit: 30,
					offset: (this.ys * 30)
				}).then(res => {
					this.djRadios = this.djRadios.concat(res.data.djRadios)
				})
				this.ys++
			},
			getpage(id, type) {
				this.$store.dispatch('page', {
						id: id,
						type: type
					})
				}
			},
			computed: {
				ismore() {
					return this.$store.state.more
				}
			},
			created() {
				getDjRadioHot({
					cateId: this.$route.query.id,
					limit: 30,
					offset: (this.ys * 30)
				}).then(res => {
					this.djRadios = this.djRadios.concat(res.data.djRadios)
				})
				this.ys++
			},
			activated() {
				this.$store.dispatch('more',true)
			},
			deactivated(){
				this.$store.dispatch('more',false)
			},
		}
</script>

<style scoped>
	.more {
		width: 100%;
		height: 100%;
		margin: 0 28px 0 28px;
		display: flex;
		margin-top: 20px;
		flex-direction: column;
	}

	img {
		top: 0;
		width: 100%;
		height: 100%;
	}

	.more>p {
		font-size: 18px;
		font-weight: 600;
	}


	.more ul {
		display: flex;
		margin-top: 10px;
		width: 100%;
		height: 100%;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.more ul li {
		flex: 0 0 49%;
		height: 119px;
		display: flex;
		margin-bottom: 15px;
	}

	.more ul li #img {
		width: 119px;
		height: 100%;
	}

	.more ul li #img img {
		border-radius: 5px;
	}

	.more ul li #name {
		flex: 1;
		width: 100%;
		height: 100%;
		margin-left: 5px;
		position: relative;
	}

	.more ul li #name>div {
		position: absolute;
		width: 100%;
		height: auto;
		top: 22px;
	}

	.more ul li #name>div p:nth-child(1) {
		color: #373737;
		font-size: 13px;
		margin-bottom: 15px;
	}

	.more ul li #name>div p:nth-child(2) {
		color: #9F9F9F;
		font-size: 13px;
		transform: scale(0.9);
		margin-left: -23px;
	}

	.more ul li #name>div p:nth-child(3) {
		color: #9F9F9F;
		font-size: 13px;
		transform: scale(0.9);
		margin-left: -23px;
	}

	.more ul li #name span:nth-child(2),
	.more ul li #name span:nth-child(5) {
		margin: 0 2px 0 2px;
	}

	.more ul li #name span:nth-child(3) {
		margin-right: 15px;
	}
</style>

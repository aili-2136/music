<template>
	<div class="album">
		<ul>
			<li v-for="(item,index) in albums">
				<div id="left">
					<div id="img">
						<img :src="item.picUrl" alt="">
					</div>
					<div id="name">
						{{item.name}}
					</div>
				</div>
				<div id="reight">
					<span>{{item.artist.name}}</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {
		getCloudsearch
	} from '../../plugins/search.js'
	export default {
		name: 'album',
		data() {
			return {
				albums: [],
				key: this.$store.state.keyword.key
			}
		},
		created() {
			getCloudsearch({
				keywords: this.key,
				type: 10
			}).then(res => {
				this.albums = res.data.result.albums
			})
		}
	}
</script>

<style scoped>
	.album {
		width: 100%;
		height: 100%;
	}

	img {
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}

	.album ul {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	.album ul li {
		width: 100%;
		height: 70px;
		display: flex;
		justify-content: space-between;
		line-height: 70px;
	}

	.album ul li:hover{
		background-color: #F1F2F3;
	}

	.album ul li #img {
		width: 53px;
		height: 53px;
		border-radius: 5px;
	}

	.album ul li #left {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.album ul li #left #name {
		margin-left: 15px;
		font-size: 12px;
	}

	.album ul li:nth-child(2n) {
		background-color: #fafafa;
	}

	.album ul li #reight {
		flex: 1;
		display: flex;
		font-size: 12px;
		align-items: center;
	}
</style>

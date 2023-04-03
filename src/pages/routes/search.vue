<template>
	<div class="Mysearch">
		<div class="headline">
			<span style="margin-right: 10px;">搜索</span><span>{{keyword}}</span>
		</div>
		<div class="nav">
			<ul>
				<li v-for="(item,index) in navlist" @click="disp(index)">
					<span :class="{'click':isnone==index}">{{item}}</span>
					<i v-show="isnone==index"></i>
				</li>
			</ul>
		</div>
		<div class="content">
				<keep-alive>
					<router-view name="single"></router-view>
					<router-view name="searchSinger"></router-view>
					<router-view name="album"></router-view>
					<router-view name="searchVideo"></router-view>
					<router-view name="songList"></router-view>
					<router-view name="searchPodcast"></router-view>
					<router-view name="user"></router-view>
				</keep-alive>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'search',
		data() {
			return {
				keyword: '',
				navlist: ['单曲', '歌手', '专辑', '视频', '歌单', '播客','用户'],
				isnone: 0
			}
		},
		methods: {
			disp(index) {
				this.isnone = index

				switch (index) {
					case 0:
						this.$router.push({
							name: 'gosingle'
						})
						break;
					case 1:
						this.$router.push({
							name: 'gosearchSinger'
						})
						break;
					case 2:
						this.$router.push({
							name: 'goalbum'
						})
						break;
					case 3:
						this.$router.push({
							name: 'gosearchVideo'
						})
						break;
					case 4:
						this.$router.push({
							name: 'gosongList'
						})
						break;
					case 5:
						this.$router.push({
							name: 'gosearchPodcast'
						})
						break;
					case 6:
						this.$router.push({
							name: 'gouser'
						})
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style scoped>
	.Mysearch {
		height: auto;
		margin: 0 28px 0 28px;
	}

	.headline {
		width: 100%;
		height: 60px;
		line-height: 60px;
		font-size: 19px;
		font-weight: 600;
	}

	.nav {
		width: 100%;
		height: 40px;
	}

	.nav ul {
		width: 100%;
		height: 100%;
		display: flex;
	}

	.nav ul li {
		margin-right: 20px;
		display: flex;
		font-size: 15px;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
	}

	.click {
		font-weight: 700;
	}

	.nav ul li i {
		width: 80%;
		height: 2px;
		background-color: #FF7A9E;
	}
</style>

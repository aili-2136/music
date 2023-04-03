<template>
	<div class="comm">
		<ul>
			<li v-for="(item,index) in params.comments">
				<div id="img">
					<img :src="item.user.avatarUrl">
				</div>
				<div id="content">
					<div id="text">
						<div id="a">
							<span>{{item.user.nickname}}</span>
							<span>:</span>
							<span>
								{{item.content}}
							</span>
						</div>
						<div v-show="false" id="b">

						</div>
					</div>
					<div id="dt">
						<div id="time">
							{{gettime(item.time)}}
						</div>
						<div id="cz">
							<i style="visibility: hidden;">举报</i>
							<i style="visibility: hidden;"></i>
							<i class="iconfont icon-dianzan"></i>
							<i></i>
							<i class="iconfont icon-fenxiang"></i>
							<i></i>
							<i class="iconfont icon-pinglun-"></i>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {gettime1} from '../../general/regular.js'
	export default {
		name: 'comm',
		props:{
			params:Object
		},
		data() {
			return {
				
			}
		},
		methods:{
			gettime(time){
				return gettime1(time)
			}
		}
	}
</script>

<style scoped>
	.comm {
		width: 100%;
		height: auto;
	}
	
	img{
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.comm ul {
		height: auto;
		display: flex;
		flex-direction: column;
		margin: 0 28px 0 28px;
	}

	.comm ul li {
		width: 100%;
		min-height: 66px;
		height: auto;
		display: flex;
		border-bottom: 1px #F2F2F2 solid;
	}

	.comm ul li #img {
		width: 32px;
		height: 32px;
		margin-top: 18px;
		border-radius: 50%;
	}

	.comm ul li #content {
		flex: 1;
		display: flex;
		margin: 12px 0 12px 12px;
		flex-direction: column;
		justify-content: center;
	}

	.comm ul li #text {
		height: auto;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		font-variant-caps: all-small-caps;
	}

	#text #a {
		width: 100%;
		height: auto;
		display: flex;
	}

	#text #a span {
		display: block;
	}

	#text #a span:nth-child(1) {
		display: inline-block;
		height: auto;
		margin-right: 5px;
		color: #507DAF;
	}

	#text #a span:nth-child(2) {
		margin-right: 5px;
		color: #507DAF;
	}

	#text #a span:nth-child(3) {
		flex: 1;
		white-space: normal;
		word-break: break-all;
		word-wrap: break-word;
	}

	.comm ul li #dt {
		flex: 1;
		display: flex;
	}

	.comm ul li #dt #time{
		flex: 1;
		font-size: 16px;
		color: #9F9F9F;
		font-variant-caps: all-small-caps;
	}


	.comm ul li #dt i {
		font-size: 12px;
		line-height: 15px;
		margin: 0 5px 0 5px;
	}

	.comm ul li #dt i:nth-child(2n) {
		display: inline-block;
		width: 1px;
		height: 10px;
		background-color: #CFDFEF;
		margin-top: 2px;
	}
</style>

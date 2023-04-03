<!-- 
	obj:{
		type:'歌单'/'播客'/'喜欢'
	}
	params:{
		
	}
 -->
<template>
	<div class="info">
		<div id="img">
			<img :src="params.img" v-show="params.img!==null">
			<img src="public/image/a1.jpg" v-show="params.img==null">
		</div>
		<div id="intro">
			<p id="songlist">
				<span id="a">{{obj.type}}</span>
				<span id="b">
					{{params.name}}
				</span>
			</p>
			<p id="newtime">
				<span id="a">
					<img :src="params.nickimg" v-show="params.nickimg!==null">
					<i class="iconfont icon-ziyuanxhdpi" v-show="params.nickimg==null"></i>
				</span>
				<span id="b">{{params.nickname}}</span>
				<span id="c" v-if="obj.type=='歌单'">{{params.cjtime}}创建</span>
			</p>
			<p id="behavior">
				<span id="a">
					<i class="iconfont icon-shipinbofangshibofang"></i>
					播放全部
					<i class="iconfont icon-jiahao"></i>
				</span>
				<span id="b">
					<i class="iconfont icon-24gl-folderPlus"></i>
					收藏{{'('+params.bookedCount+')'}}
				</span>
				<span id="c">
					<i class="iconfont icon-fenxiang1"></i>
					分享{{'('+params.shareCount+')'}}
				</span>
				<span id="d" v-if="obj.type=='歌单'">
					<i class="iconfont icon-xiazai1"></i>
					下载全部
				</span>
			</p>
			<p id="label" v-if="obj.type=='歌单'&&params.tags!==null">
				标签
				<span>:</span>
				<span v-for="(item,index) in params.tags">
					{{index==params.tags.length-1?item:item+'/'}}
				</span>
			</p>
			<p id="song" v-if="obj.type=='歌单'">
				歌曲
				<span>:</span>
				<span style="margin-right: 5px; color: #676767;">{{params.songlength}}</span>
				播放
				<span>:</span>
				<span style="color: #676767;">{{params.playCount}}</span>
			</p>
			
			<span id="jianjie" v-if="obj.type=='歌单'&&params.front!==null">
				<span>简介:</span>
				<span v-html="params.front"></span>
				<i class="iconfont icon-sanjiaoxing_shang" v-show="iszhansi" @click="zhansi"></i>
				<i class="iconfont icon-sanjiaoxing_shang-copy" v-show="!iszhansi" @click="zhansi"></i>
			</span>
			
			<span id="boke" v-if="obj.type=='播客'&&params.front!==null">
				<div>
					<span id="table">{{params.category}}</span>
					<span v-html="params.front"></span>
				</div>
				<div>
					<i class="iconfont icon-sanjiaoxing_shang" v-show="iszhansi" @click="zhansi"></i>
					<i class="iconfont icon-sanjiaoxing_shang-copy" v-show="!iszhansi" @click="zhansi"></i>
				</div>
			</span>
			
			<p id="surplus" v-html="params.followup" v-show="!iszhansi" v-if="obj.type=='歌单'">
			</p>
			<p id="surplus" v-html="params.followup" v-show="!iszhansi" v-if="obj.type=='播客'">
			</p>
		</div>
	</div>
</template>

<script>	
	export default{
		name:'info',
		props:{
			obj:Object,
			params:Object
		},
		data() {
			return {
				iszhansi:true,		
			}
		},
		methods:{
			zhansi(){
				this.iszhansi=!this.iszhansi
			}
		}
	}
	
</script>

<style scoped>
	.info{
		width: 100%;
		height: 100%;
		display: flex;
	}
	
	.info #img {
		width: 163px;
		height: 163px;
		border-radius: 3px;
		border: 1px #F1F1F1 solid;
		border-radius: 5px;
	}
	
	/* .particulars .introduce #img img {
		border-radius: 5px;
	} */
	
	img {
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
	
	#intro {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 16px;
	}
	
	#intro #songlist #a {
		display: block;
		float: left;
		width: 32px;
		height: 16px;
		font-size: 12px;
		border: 1px #FF7A9E solid;
		border-radius: 3px;
		color: #FF7A9E;
		line-height: 16px;
		text-align: center;
		margin-top: 6px;
	}
	
	#intro #songlist {
		width: 100%;
		height: 25px;
	}
	
	#intro #songlist #b {
		margin-left: 10px;
		font-size: 20px;
		font-weight: 700;
		align-items: center;
	}
	
	#intro #newtime {
		width: 100%;
		height: 25px;
		margin-top: 5px;
		font-size: 12px;
	}
	
	#intro #newtime #a {
		float: left;
		display: block;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		line-height: 25px;
	}
	
	#intro #newtime #a img {
		border-radius: 50%;
	}
	
	#intro #newtime #a i{
		font-size: 22px;
		color: #9a9a9a;
	}
	
	#intro #newtime #b,
	#intro #newtime #c {
		height: 25px;
		line-height: 25px;
	}
	
	#intro #newtime #b {
		margin-left: 5px;
		color: #507DAF;
	}
	
	#intro #newtime #c {
		margin-left: 5px;
		color: #676767;
	}
	
	#intro #behavior {
		width: 100%;
		height: 30px;
		display: flex;
		margin-top: 5px;
	}
	
	#intro #behavior #a {
		display: block;
		width: 120px;
		height: 30px;
		border-radius: 15px;
		background-color: #FF7A9E;
		line-height: 30px;
		color: #ffffff;
		padding-left: 10px;
		font-size: 14px;
		cursor: pointer;
	}
	
	#intro #behavior #a i:nth-child(2) {
		margin-left: 10px;
	}
	
	#intro #behavior #b,
	#intro #behavior #c,
	#intro #behavior #d {
		display: inline-block;
		padding: 0 8px 0 8px;
		height: 28px;
		border: 1px #D9D9D9 solid;
		border-radius: 14px;
		margin-left: 10px;
		font-size: 14px;
		line-height: 28px;
		color: #4b4b4b;
		cursor: pointer;
	}
	
	#intro #behavior #d {
		width: 92px;
	}
	
	#intro #behavior>span:hover{
		background-color: #F2F2F2;
	}
	
	#intro #label {
		width: 100%;
		height: 20px;
		display: flex;
		font-size: 12px;
		margin-top: 10px;
	}
	
	#intro #label span:nth-child(1) {
		margin: 0 3px 0 3px;
	}
	
	#intro #label span {
		color: #507DAF;
	}
	
	#intro #song,
	#intro #jianjie {
		width: 100%;
		height: 18px;
		display: flex;
		font-size: 12px;
		margin-top: 5px;
	}
	
	#intro #jianjie span:nth-child(1){
		display: inline-block;
		width: 27px;
		height: 18px;
	}
	
	#intro #jianjie span:nth-child(2){
		flex: 1;
		width: 0;
		height: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	#intro #jianjie span:nth-child(3){
		flex: 1;
	}
	
	#intro #jianjie i{
		width: auto;
		height: 100%;
	}
	
	#surplus{
		font-size: 12px;
		line-height: 16px;
	}
	
	#boke{
		width: 100%;
		height: auto;
		display: flex;
		margin-top: 15px;
	}
	
	#boke div:nth-child(1){
		flex: 1;
		width: 100%;
		height: auto;
		color: #565656;
		line-height: 18px;
		font-size: 17px;
		font-variant-caps: all-small-caps;
	}
	
	#boke div:nth-child(2){
		width: 16px;
		height: auto;
	}
	
	#boke #table{
		display: inline-block;
		font-size: 14px;
		line-height: 12px;
		font-variant-caps: all-small-caps;
		padding: 0 3px 2px 3px;
		color: #FF7A9E;
		border: 1px #FF7A9E solid;
		border-radius: 2px;
		margin-right: 3px;
	}
	
	.live{
		margin-top: 20px;
	}
</style>
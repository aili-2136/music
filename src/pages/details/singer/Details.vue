<template>
	<div class="Details">
		<div class="Details-info">
			<singer-info :params='artist'></singer-info>
		</div>
		<div class="Details-table">
			<navigation :list='navlist' @onclick='onclick' :type='navtype'></navigation>
		</div>
		<div class="Details-content">
			<album v-if="cut==0" :params='hotAlbum' @onload='onload'></album>
			<MV v-if="cut==1" :params='MV'></MV>
			<singer-details v-if="cut==2" :params='xqparams'></singer-details>
			<similarity-singer v-if="cut==3" :params='xsartists'></similarity-singer>
		</div>
	</div>
</template>

<script>
	import {
		getArtistAlbum,getArtistMv,getArtistDesc,getSimiArtist
	} from '../../../plugins/artist.js'
	import {getbr} from '../../../general/regular.js'
	import singerinfo from '../../../components/singer/singerInfo.vue'
	import navigation from '../../../components/basics/navigation.vue'
	import album from './album.vue'
	import MV from './MV'
	import singerDetails from './singerDetails.vue'
	import similaritySinger from './similaritySinger.vue'
	export default {
		name: "Details",
		components: {
			'singer-info': singerinfo,
			'navigation': navigation,
			'album': album,
			'MV': MV,
			'singer-details':singerDetails,
			'similarity-singer':similaritySinger
		},
		data() {
			return {
				cookie: localStorage.getItem('cookie'),
				infoobj: {
					type: '歌手'
				},
				page: {
					id: '',
					type: ''
				},
				artist: {}, //歌手信息 
				hotAlbum: [], //热门专辑
				MV: [], //MV
				navlist: ['专辑', 'MV', '歌手详情', '相似歌手'],
				navtype: 'details',
				cut: 0,
				xqparams:{
					name:'',
					briefDesc:'',
					introduction:'',
					txt:[],	
				},	
				xsartists:[],	//相似歌手	
			}
		},
		methods: {
			onclick(value) {
				this.cut = value
			},
			onload(value) {
				console.log('记得完善');
			}
		},
		computed: {
			ispage() {
				return this.$store.state.page
			},			
		},
		watch: {
			ispage: {
				immediate:true,
				deep: true,
				handler(value) {
					this.page.id = value.id,
						this.page.type = value.type
					getArtistAlbum({
						id: value.id
					}).then(res => {
						this.hotAlbum = res.data.hotAlbums
						this.artist=res.data.artist
						this.xqparams.name=res.data.artist.name
					})
					getArtistMv({
						id: value.id,
						limit: 30
					}).then(res => {
						this.MV = res.data.mvs
					})
					getArtistDesc({id:value.id}).then(res=>{
						this.xqparams.briefDesc=res.data.briefDesc
						this.xqparams.introduction=res.data.introduction
						res.data.introduction.forEach(a=>{
							this.xqparams.txt.push(getbr(a.txt.replace(/\n/g,'<br>')))
						})
					})
					getSimiArtist({id:value.id,cookie:this.cookie}).then(res=>{
						this.xsartists=res.data.artists
					})
				}
			}
		},
	}
</script>

<style scoped>
	.Details {
		margin: 26px 28px 0 28px;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	.Details-info {
		width: 100%;
		height: auto;
	}

	.Details-table {
		width: 100%;
		height: auto;
	}
	.Details-content{
		flex: 1;
		margin-top: 15px;
	}
</style>

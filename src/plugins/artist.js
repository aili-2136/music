import request from './request'

//获取歌手单曲
export function getArtists(params){
	return request({
		method:'GET',
		url:'/artists',
		params
	})
}

//获取歌手MV
export function getArtistMv(params){
	return request({
		method:'GET',
		url:'/artist/mv',
		params
	})
}


//获取歌手专辑
export function getArtistAlbum(params){
	return request({
		method:'GET',
		url:'/artist/album',
		params
	})
}

//获取歌手描述
export function getArtistDesc(params){
	return request({
		method:'GET',
		url:'/artist/desc',
		params
	})
}

//获取歌手详情
export function getArtistDetali(params){
	return request({
		method:'GET',
		url:'/artist/detail',
		params
	})
}


//获取相似歌手
export function getSimiArtist(params){
	return request({
		method:'GET',
		url:'/simi/artist',
		params
	})
}
import request from './request'

//新歌速递
export function getTopSong(params){
	return request({
		method:"GET",
		url:'/top/song',
		params
	})
}

//新碟上架
export function getTopAlbum(params){
	return request({
		method:'GET',
		url:'/top/album',
		params
	})
}

//全部新碟
export function getAlbumNew(params){
	return request({
		method:'GET',
		url:'/album/new',
		params
	})
}
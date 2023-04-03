import request from './request'

//获取榜单
export function getToplist(){
	return request({
		method:'GET',
		url:'/toplist'
	})
}

//获取歌单所有歌曲
export function getPlaylistDetail(params){
	return request({
		method:'GET',
		url:'/playlist/detail',
		params
	})
}

//获取歌单里指定几首歌曲
export function getPlaylistTrackAll(params){
	return request({
		method:'GET',
		url:'/playlist/track/all',
		params
	})
}


//获取歌曲详情
export function getSongDetail(params){
	return request({
		method:'GET',
		url:'/song/detail',
		params
	})
}

//获取歌曲url
export function getSongUrl(params){
	return request({
		method:'GET',
		url:'/song/url',
		params
	})
}
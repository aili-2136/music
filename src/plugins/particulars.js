import request from './request'

//获取歌单详情
export function getPlaylistDetail(params){
	return request({
		method:'GET',
		url:'/playlist/detail',
		params
	})
}


//获取歌单所有歌曲
export function getPlaylistTrackAll(params){
	return request({
		method:'GET',
		url:'/playlist/track/all',
		params
	})
}

//歌单详情动态
export function getPlaylistDetailDynamic(params){
	return request({
		method:'GET',
		url:'/playlist/detail/dynamic',
		params
	})
}

//歌单更新播放量
export function getPlaylistUpdatePlaycount(params){
	return request({
		method:'GET',
		url:'/playlist/update/playcount',
		params
	})
}

//歌单收藏者
export function getPlaylistSubscribers(params){
	return request({
		method:'GET',
		url:'/playlist/subscribers',
		params
	})
}
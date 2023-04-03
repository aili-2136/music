import request from './request'

//歌曲评论
export function getCommentMusic(params){
	return request({
		method:'GET',
		url:'/comment/music',
		params
	})
}

//楼层评论
export function getCommentFloor(params){
	return request({
		method:'GET',
		url:'/comment/floor',
		params
	})
}

//专辑评论
export function getCommentAlbum(params){
	return request({
		method:'GET',
		url:'/comment/album',
		params
	})
}

//歌单评论
export function getCommentPlaylist(params){
	return request({
		method:'GET',
		url:'/comment/playlist',
		params
	})
}

//mv 评论
export function getCommentMv(params){
	return request({
		method:'GET',
		url:'/comment/mv',
		params
	})
}

//电台节目评论
export function getCommentDj(params){
	return request({
		method:'GET',
		url:'/comment/dj',
		params
	})
}

//视频评论
export function getCommentVideo(params){
	return request({
		method:'GET',
		url:'/comment/video',
		params
	})
}

//热门评论
export function getCommentHot(params){
	return request({
		method:'GET',
		url:'/comment/hot',
		params
	})
}

//新版评论接口
export function getCommentNew(params){
	return request({
		method:'GET',
		url:'/comment/new',
		params
	})
}

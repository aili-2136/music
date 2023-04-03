import request from './request'

////获取歌单分类
export function getPlaylistCatlist(){
	return request({
		method:'GET',
		url:'/playlist/catlist'
	})
}
//获取热门分类
export function getPlaylistHot(){
	return request({
		method:'GET',
		url:'/playlist/hot'
	})
}

//获取歌单
export function getTopPlaylist(params){
	return request({
		method:'GET',
		url:'/top/playlist',
		params
	})
}

//获取精品歌单标签列表
export function getPlaylistHighqualityTags(){
	return request({
		method:'GET',
		url:'/playlist/highquality/tags'
	})
}

//获取精品歌单
export function getTopPlaylistHighquality(params){
	return request({
		method:'GET',
		url:'/top/playlist/highquality',
		params
	})
}

//创建歌单
export function getPlaylistCreate(params){
	return request({
		method:'GET',
		url:'/playlist/create',
		params
	})
}

//删除歌单
export function getPlaylistDelete(params){
	return request({
		method:'GET',
		url:'/playlist/delete',
		params
	})

}

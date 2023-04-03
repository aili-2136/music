import request from './request'

//获取歌手
export function getArtistList(params){
	return request({
		method:'GET',
		url:'/artist/list',
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
export function getArtistDetail(params){
	return request({
		method:'GET',
		url:'/artist/detail',
		params
	})
}
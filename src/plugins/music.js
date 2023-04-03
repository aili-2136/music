import request from './request'

//获取歌曲播放地址
export function getSongUrl(params){
	return request({
		method:'GET',
		url:'/song/url/v1',
		params
	})
}

//获取歌词
export function getLyric(params){
	return request({
		method:'GET',
		url:'/lyric',
		params
	})
}

//歌曲详情
export function getSongDetail(params){
	return request({
		method:'GET',
		url:'/song/detail',
		params
	})
}
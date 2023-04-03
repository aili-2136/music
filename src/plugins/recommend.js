import request from './request'

// 轮播图请求
export function getBanner(){
	return request({
		method:'GET',
		url:'/banner'
	})
}

// 请求获取推荐歌单
export function getPersonalized(limit=10){
	return request({
		method:'GET',
		url:'/personalized',
		params:{
			limit
		}
	})
}

// 获取推荐播客
export function getPersonalizedDjprogram(){
	return request({
		method:'GET',
		url:'/personalized/djprogram'
	})
}

// 获取独家放送轮播图
export function getPersonalizedPrivatecontent(){
	return request({
		method:'GET',
		url:'/personalized/privatecontent'
	})
}

// 获取最新音乐
export function getPersonalizedNewsong(){
	return request({
		method:'GET',
		url:'/personalized/newsong'
	})
}

// 推荐mv
export function getPersonalizedMv(){
	return request({
		method:'GET',
		url:'/personalized/mv'
	})
}
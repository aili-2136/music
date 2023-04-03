import request from './request'
//最新 mv
export function getMvFirst(params){
	return request({
		method:'GET',
		url:'/mv/first',
		params
	})
}

//全部 mv
export function getMvAll(params){
	return request({
		method:'GET',
		url:'/mv/all',
		params
	})
}

//网易出品 mv
export function getMvExclusiveRcmd(params){
	return request({
		method:'GET',
		url:'/mv/exclusive/rcmd',
		params
	})
}

//推荐 mv
export function getPersonalizedMv(params){
	return request({
		method:'GET',
		url:'/personalized/mv',
		params
	})
}

//mv 排行
export function getTopMv(params){
	return request({
		method:'GET',
		url:'/top/mv',
		params
	})
}

//获取 mv 数据
export function getMvDetail(params){
	return request({
		method:'GET',
		url:'/mv/detail',
		params
	})
}

//获取 mv 点赞转发评论数数据
export function getMvDetailInfo(params){
	return request({
		method:'GET',
		url:'/mv/detail/info',
		params
	})
}

//mv 地址
export function getMvUrl(params){
	return request({
		method:'GET',
		url:'/mv/url',
		params
	})
}

//相似mv
export function getSimiMv(params){
	return request({
		method:'GET',
		url:'/simi/mv',
		params
	})
}

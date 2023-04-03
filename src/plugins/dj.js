import request from './request'

//电台 banner
export function getDjBanner(params){
	return request({
		method:'GET',
		url:'/dj/banner',
		params
	})
}


//电台 - 分类
export function getDjCatelist(params){
	return request({
		method:'GET',
		url:'/dj/catelist',
		params
	})
}

//电台 - 获取
export function getDjRecommendType(params){
	return request({
		method:'GET',
		url:'/dj/recommend/type',
		params
	})
}

//电台 - 详情
export function getDjDetail(params){
	return request({
		method:'GET',
		url:'/dj/detail',
		params
	})
}




//电台 - 节目详情
export function getDjProgramDetail(params){
	return request({
		method:'GET',
		url:'/dj/program/detail',
		params
	})
}


//电台 - 类别热门电台
export function getDjRadioHot(params){
	return request({
		method:'GET',
		url:'/dj/radio/hot',
		params
	})
}

//电台-个性推荐
export function getDjgxtj(params){
	return request({
		method:'GET',
		url:'/dj/personalize/recommend',
		params
	})
}

//电台收藏者
export function getDjSubscriber(params){
	return request({
		method:'GET',
		url:'/dj/subscriber',
		params
	})
}

//电台节目
export function getDjProgram(params){
	return request({
		method:'GET',
		url:'/dj/program',
		params
	})
}

//电台推荐
export function getDjRecommend(params){
	return request({
		method:'GET',
		url:'/dj/recommend',
		params
	})
}
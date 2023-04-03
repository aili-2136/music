import request from './request'

//热搜列表
export function getSearchHotDetail(params){
	return request({
		method:'GET',
		url:'/search/hot/detail',
		params
	})
}

//默认搜索关键词
export function getSearchDefault(params){
	return request({
		method:'GET',
		url:'/search/default',
		params
	})
}

//搜索
export function getCloudsearch(params){
	return request({
		method:'GET',
		url:'/cloudsearch',
		params
	})
}

//搜索建议
export function getSearchSuggest(params){
	return request({
		method:'GET',
		url:'/search/suggest',
		params
	})
}

//搜索多重匹配
export function getSearchMultimatch(params){
	return request({
		method:'GET',
		url:'/search/multimatch',
		params
	})
}
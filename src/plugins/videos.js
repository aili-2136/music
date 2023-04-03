import request from './request'

//获取视频标签列表
export function getVideoGroupList(params){
	return request({
		method:'GET',
		url:'/video/group/list',
		params
	})
}

//获取视频分类列表
export function getVideoCategoryList(params){
	return request({
		method:'GET',
		url:'/video/category/list',
		params
	})
}

//获取视频标签/分类下的视频
export function getVideoGroup(params){
	return request({
		method:'GET',
		url:'/video/group',
		params
	})
}


//获取全部视频列表
export function getVideoTimelineAll(params){
	return request({
		method:'GET',
		url:'/video/timeline/all',
		params
	})
}

//相关视频
export function getRelatedAllvideo(params){
	return request({
		method:'GET',
		url:'/related/allvideo',
		params
	})
}

//视频详情
export function getVideoDetail(params){
	return request({
		method:'GET',
		url:'/video/detail',
		params
	})
}

//获取视频点赞转发评论数数据
export function getVideoDetailInfo(params){
	return request({
		method:'GET',
		url:'/video/detail/info',
		params
	})
}

//获取视频播放地址
export function getVideoUrl(params){
	return request({
		method:'GET',
		url:'/video/url',
		params
	})
}

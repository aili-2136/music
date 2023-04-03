import request from './request'

//获取账号信息
export function getUserAccount(params){
	return request({
		method:'GET',
		url:'/user/account',
		params
	})
}

//获取用户详情
export function getUserDetail(params){
	return request({
		method:'GET',
		url:'/user/detail',
		params
	})
}


//退出登录
export function getLogout(params){
	return request({
		method:'GET',
		url:'/logout',
		params
	})
}
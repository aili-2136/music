import request from './request'

export function getPersonalFm(params){
	return request({
		method:'GET',
		url:'/personal_fm',
		params
	})
}
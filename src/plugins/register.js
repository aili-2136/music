import request from './request'

//手机登录
export function getLoginCellphone(params) {
	return request({
		method: 'GET',
		url: '/login/cellphone',
		params
	})
}

//注册/修改密码
export function getRegisterCellphone(params) {
	return request({
		method: 'GET',
		url: '/register/cellphone',
		params
	})
}


//发送验证码
export function getCaptchaSent(params) {
	return request({
		method: 'GET',
		url: '/captcha/sent',
		params
	})
}

//验证验证码
export function getCaptchaVerify(params) {
	return request({
		method: 'GET',
		url: '/captcha/verify',
		params
	})
}


//游客登录
export function getRegisterAnonimous() {
	return request({
		method: 'GET',
		url: '/register/anonimous'
	})
}

//退出登录
export function getLogin() {
	return request({
		method: 'GET',
		url: '/login'
	})
}

//刷新登录
export function getLoginRefresh() {
	return request({
		method: 'GET',
		url: '/login/refresh'
	})
}

//登录状态
export function getLoginStatus() {
	return request({
		method: 'GET',
		url: '/login/status'
	})
}

//用户详情
export function getUserDetail(params) {
	return request({
		method: 'GET',
		url: '/user/detail',
		params
	})
}

//检测手机号是否被注册
export function getCellphoneExistenceCheck(params) {
	return request({
		method: 'GET',
		url: '/cellphone/existence/check',
		params
	})
}
//检测昵称是否被占用
export function getNicknameCheck(params) {
	return request({
		method: 'GET',
		url: '/nickname/check',
		params
	})
}

//获取二维码的key
export function getLoginQrKey(params) {
	return request({
		method: 'GET',
		url: '/login/qr/key',
		params
	})
}

//二维码生成
export function getLoginQrCreate(params) {
	return request({
		method: 'GET',
		url: '/login/qr/create',
		params
	})
}

//轮询二维码
export function getLoginQrCheck(params) {
	return request({
		method:'GET',
		url:'/login/qr/check',
		params
	})
}

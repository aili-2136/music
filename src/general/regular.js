export function checkout(phone, password) {
	let a = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
	let m = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
	if (phone === '' && !m.test(password) || phone === '' && m.test(password)) {
		return '手机号不能为空！'
	}
	if (!a.test(phone) && m.test(password)) {
		return '请输入正确的手机号'
	}
	if (password === '' && m.test(password) || password === '' && !m.test(password)) {
		return '密码不能为空！'
	}
	if (!m.test(password) && a.test(phone)) {
		return '请输入由数字和英文组成的6~10位密码'
	}
	if (!a.test(phone) && !m.test(password)) {
		return '手机号或密码错误'
	}
	return true
}

export function chckphone(phone){
	let a = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
	if(!a.test(phone)){
		return '请输入正确的手机号'
	}
	
	if(phone==null||phone==''){
		return '手机号不能为空'
	}
	
	return true
}


export function getnumber(item) {
	if (item === '全部') {
		return -1
	}
	if (item === '男歌手') {
		return 1
	}
	if (item === '女歌手') {
		return 2
	}
	if (item === '乐队') {
		return 3
	}
	if (item === '华语') {
		return 7
	}
	if (item === '欧美') {
		return 96
	}
	if (item === '日本') {
		return 8
	}
	if (item === '韩国') {
		return 16
	}
	if (item === '其他') {
		return 0
	}
	if (item === '热门') {
		return -1
	}
	if (item === '#') {
		return 0
	}
	return item
}

export function getsongnumber(item) {
	if (item === '全部') {
		return 0
	}
	if (item === '华语') {
		return 7
	}
	if (item === '欧美') {
		return 96
	}
	if (item === '日本') {
		return 8
	}
	if (item === '韩国') {
		return 16
	}
}

export function getareanumber(area) {
	if (area === '全部') {
		return 'ALL'
	}
	if (area === '华语') {
		return 'ZH'
	}
	if (area === '欧美') {
		return 'EA'
	}
	if (area === '日本') {
		return 'JP'
	}
	if (area === '韩国') {
		return 'KR'
	}
}


export function gettypenumber(type) {
	if (type === true) {
		return 'new'
	}
	if (type === false) {
		return 'hot'
	}
}


export function gettime(time) {
	var date = new Date(time);
	let Y = date.getFullYear() + '-';
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	let D = date.getDate() + ' ';
	let h = date.getHours() + ':';
	let m = date.getMinutes() + ':';
	let s = date.getSeconds();
	return Y + M + D
}


export function getwang(numbur) {
	let num = Math.floor(numbur / 10000)
	if (num > 0) {
		if (Math.floor(num / 10000) > 0) {
			return Math.floor(num / 10000) + '亿'
		} else {
			return num + '万'
		}
	} else {
		return numbur
	}

}

export function getwang1(numbur) {
	let num = Math.floor(numbur / 10000)
	if (num >= 10) {
		return Math.floor(numbur / 10000) + '万'
	} else {
		return numbur
	}

}

export function getaddbr(text) {
	let a = text
	let b = a.replace(/\n/g, '<br>')
	let c, d, i, t
	let zhansi
	//如果字符串里没有<
	if (b.indexOf('<') === -1) {
		c = b.indexOf('<')
		d = text
		zhansi = 1
	} else {
		c = b.indexOf('<')
		d = b.substring(0, c)
		i = b.indexOf('>')
		t = b.substr(i + 1, b.length)
		zhansi = 2
	}
	return {
		b,
		d,
		t,
		zhansi
	}
}


export function getmiao(time) {
	let a = time
	let b = Math.floor(a % 86400000 % 3600000 / 60000)
	let c = Math.floor(a % 86400000 % 3600000 % 60000 / 1000)
	if (b <= 9) {
		b = "0" + b
	}
	if (c <= 9) {
		c = "0" + c
	}
	let t = b + ":" + c
	return t
}

export function getmiao1(time) {
	let a = time
	let b = Math.floor(a % 86400000 % 3600000 / 60000)
	let c = Math.floor(a % 86400000 % 3600000 % 60000 / 1000)
	let d = (b * 60) + c
	return d
}


export function gettime1(time) {
	var date = new Date(time);
	let Y = date.getFullYear();
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	let D = date.getDate();
	let h = date.getHours() + ':';
	if (h <= 9) {
		h = '0' + h
	}
	let m = date.getMinutes();
	if (m <= 9) {
		m = '0' + m
	}
	let s = date.getSeconds();
	return Y + '年' + M + '月' + D + '日' + ' ' + h + m
}

export function getbr(text) {
	let a = text
	let index = 1
	let b = a.replace(/<br>/g, '</p><p>')
	let s = b.replace('</p>', '')
	return s
}


export function getlyric(data) {
	// 处理歌词，转化成key为时间，value为歌词的对象
	let lyricArr = data.split('[').slice(1); // 先以[进行分割
	let lrcObj = {};
	lyricArr.forEach(item => {
		let arr = item.split(']'); // 再分割右括号
		// 时间换算成秒
		let m = parseInt(arr[0].split(':')[0])
		let s = parseInt(arr[0].split(':')[1])
		arr[0] = m * 60 + s;
		if (arr[1] != '\n') { // 去除歌词中的换行符
			lrcObj[arr[0]] = arr[1];
		}
	})
	return lrcObj
}

//读取数据
export function readData(key) {
	return JSON.parse(window.localStorage.getItem(key) || '[]')
}

//保存数据
export function saveData(key, data) {
	var SearchHistory = JSON.parse(window.localStorage.getItem(key) || '[]')
	SearchHistory.unshift(data)
	window.localStorage.setItem(key, JSON.stringify(SearchHistory))
}

//清空数据
export async function deleteData(key){
	window.localStorage.removeItem(key)
}

//秒数转换成00:00格式
export function getMiao(value) {
	let m = Math.floor(value / 60)
	if (m == 0 || m < 10) {
		m = '0' + m
	}
	let s = value % 60
	if (s == 0 || s < 10) {
		s = '0' + s
	}
	return m + ':' + s
}

// base64转图片资源
export function baseimg(dataurl) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}
	return new Blob([u8arr], {
		type: mime
	})
}

//深拷贝
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
module.exports = {
	pages: {
		index: {
			entry: 'src/main.js'
		}
	},
	css: {
		extract: false
	},
	lintOnSave: false,
	publicPath: './',
	//开启代理服务器（方式1）
	// devServer:{
	// 	proxy:'http://121.196.234.83:3000/'
	// }
	//开启代理服务器(方式2)
	/*devServer:{
		proxy:{
			'/xs':{
				target:'http://localhost:5000',
				pathRewrite:{'^/xs':''},
				//ws:true   用来支持websocket
				//changeOrigin:true   用于控制请求头中的post值
			},
			'/qc':{
				target:'http://localhost:5001',
				pathRewrite:{'^/qc':''},
				//ws:true   用来支持websocket
				//changeOrigin:true   用于控制请求头中的post值
			}
		}
			
		}*/
}

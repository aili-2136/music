//用于响应组件中的动作
const actions={
	catalog(context,value){
		context.commit('CATALOG',value)
	},
	more(context,value){
		context.commit('MORE',value)
	},
	allmv(context,value){
		context.commit('ALLMV',value)
	},
	page(context,value){
		context.commit('PAGE',value)
	},
	play(context,value){
		context.commit('PLAY',value)
	},
	search(context,value){
		context.commit('SEARCH',value)
	},
	keyword(context,value){
		context.commit('KEYWORD',value)
	},
	musicid(context,value){
		context.commit('MUSICID',value)
	},
	account(context,value){
		context.commit('ACCOUNT',value)
	},
	login(context,value){
		context.commit('LOGIN',value)
	},
}

export default actions
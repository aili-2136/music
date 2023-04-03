//用于操作数据(state)
const mutations={
	CATALOG(state,value){
		state.catalog=value
	},
	MORE(state,value){
		state.more=value
	},
	ALLMV(state,value){
		state.allmv=value
	},
	PAGE(state,value){
		state.page=value
	},
	PLAY(state,value){
		state.play=value
	},
	SEARCH(state,value){
		state.search=value
	},
	KEYWORD(state,value){
		state.keyword=value
	},
	MUSICID(state,value){
		state.musicid=value
	},
	ACCOUNT(state,value){
		state.account=value
	},
	LOGIN(state,value){
		state.login=value
	},
}
	
export default mutations
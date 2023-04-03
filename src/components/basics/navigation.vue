<template>
	<div class="navigation">
		<div class="option">
			<ul>
				<li v-for="(item,index) in list" @click="onclick(index,item)"
					:class="{'music':option==index&&type=='music','click':option==index&&type=='details','noclick':option!==index}"
					:style="{fontSize:'14px'}"
					>
					<i>{{item}}</i>
					<p v-show="option==index"></p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'navigation',
		props: {
			type:String,
			list: Array,
			pointer:Number
		},
		data() {
			return {
				option: '',
				style: {

				}
			}
		},
		methods: {
			onclick(index,item) {
				this.option = index
				this.$emit('onclick', index)
			},		
		},
		mounted() {
			this.option =0
		},
		created() {
			this.bus.$on('navig',data=>{
				this.option=this.list.indexOf(data)
			})
		},
		watch:{
			pointer:{
				handler(value){
					this.option=value
				}
			}
		}
	}
</script>

<style scoped>
	.navigation {
		margin: 0 28px 0 28px;
		height: 50px;
		display: flex;
		flex-direction: column;
	}

	.navigation .option {
		width: 100%;
		height: 40px;
		color: #373737;
	}

	.navigation .option ul {
		/* width: 100%; */
		height: 100%;
		display: flex;
		align-items: flex-end;
	}

	.navigation .option ul li {
		display: flex;
		margin: 0 10px 0 10px;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
	}
	
	.noclick {
		
	}

	.navigation .option ul li p {
		width: 75%;
		height: 1.5px;
		background-color: #FF7A9E;
	}

	.music {
		margin: 0 20px 0 20px !important;
		transform: scale(1.3);
		font-weight: 600;
		color: #000;
	}
	
	.click{
		margin: 0 15px 0 15px !important;
		transform: scale(1.2);
		font-weight: 600;
		color: #000;
	}
</style>

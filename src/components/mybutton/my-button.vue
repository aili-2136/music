<template>
	<button> <span class="text" @click="onclick">{{params}}</span>
	  <span class="blob"></span>
	  <span class="blob"></span>
	  <span class="blob"></span>
	  <span class="blob"></span>
	</button>
</template>

<script>
	export default {
		name: 'mybutton',
		props: {
			params: String
		},
		data() {
			return {

			}
		},
		methods: {
			onclick() {
				this.$emit('onclick')
			}
		}
	}
</script>

<style scoped>
	button {
	 position: relative;
	 font-family: inherit;
	 font-size: 12px;
	 border-radius: 40em;
	 width: 8em;
	 height: 3em;
	 z-index: 1;
	 color: white;
	 overflow: hidden;
	 border: none;
	}
	
	button .text {
	 position: absolute;
	 left: 0;
	 top: 0;
	 width: 100%;
	 height: 100%;
	 line-height: 3em;
	 border-radius: 40em;
	 border: none;
	 background: linear-gradient(rgba(255, 255, 255, 0.473), rgba(150, 150, 150, 0.25));
	 z-index: 1;
	 backdrop-filter: blur(10px);
	 -webkit-backdrop-filter: blur(10px);
	}
	
	button .blob {
	 position: absolute;
	 z-index: -1;
	 border-radius: 5em;
	 width: 5em;
	 height: 3em;
	 transition: transform .3s ease-in-out, background .3s ease-in-out;
	}
	
	button .blob:nth-child(2) {
	 left: 0em;
	 top: 0;
	 background: #ff55ff;
	}
	
	button .blob:nth-child(3) {
	 left: 1.8em;
	 top: 0;
	 z-index: -1;
	 background: #ff94ab;
	}
	
	button .blob:nth-child(4) {
	 left: 4em;
	 top: -1em;
	 background: #ff1b6b;
	}
	
	button .blob:nth-child(5) {
	 left: 4.3em;
	 top: 1.6em;
	 background: #ffffff;
	}
	
	button:hover .blob:nth-child(2) {
	 background: #ff55ff;
	}
	
	button:hover .blob:nth-child(3) {
	 background: #ff94ab;	 
	}
	
	button:hover .blob:nth-child(4) {
	background: #ff1b6b;	 
	}
	
	button:hover .blob:nth-child(5) {
	background: #ffffff;
	}
	
	button:hover .blob {
	 transform: scale(1.3);
	}
	
	button:active {
	 border: 2px solid white;
	}

</style>

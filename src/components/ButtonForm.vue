<template>
	<button class="button" @click="clicado" :disabled="desabilitado">
		<span class="icon">
			<i :class="icone"></i>
		</span>
		<span>{{texto}}</span>
	</button>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
	name: 'ButtonForm',
	emits: ['clicado'],
	props: {
		desabilitado: {
			type: Boolean,
		},
		icone: {
			type: String,
			require: true,
		},
		texto: {
			type: String,
			require: true
		}
	},
	methods: {
		clicado() {
			this.$emit('clicado')
			console.log(this.desabilitado)
		}
	}
})
</script>

<style>
</style>
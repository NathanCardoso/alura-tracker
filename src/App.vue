<template>
	<main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuroAtivo}">
		<div class="column is-one-quarter">
			<BarraLateral @aoTemaAlterado='trocarTema'/>
		</div>
		<div class="column is-three-quarter conteudo">
			<RouterView/>
		</div>
	</main>
</template>

<script>
import { defineComponent } from 'vue'
import BarraLateral from '@/components/BarraLateral.vue'

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral
},
	data() {
		return {
			modoEscuroAtivo: false
		}
	},
	methods: {
		trocarTema(modoEscuroAtivo) {
			this.modoEscuroAtivo = modoEscuroAtivo
		}
	}
})
</script>

<style>
.lista {
	padding: 0 20px;
}
main {
	--bg-primario: #fff;
	--texto-primario: #000;
}
main.modo-escuro {
	--bg-primario: #2b2d42;
	--texto-primario: #ddd;
}

.conteudo {
	background: var(--bg-primario);
}
</style>

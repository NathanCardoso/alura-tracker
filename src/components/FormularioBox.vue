<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulario para criação de uma nova tarefa"
      >
        <input type="text" class="input" placeholder="Qual tarefa deseja iniciar?" v-model='descricao' />
      </div>
      <div class="column">
        <TemporizadorForm @aoTemporizadorFinalizado="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TemporizadorForm from "./TemporizadorForm.vue";

export default defineComponent({
  name: "FormularioBox",
	emits: ['aoSalvarTarefa'],
  components: {
    TemporizadorForm,
  },
	data() {
		return  {
			descricao: ''
		}
	},
	methods: {
		finalizarTarefa(tempoDecorrido) {
			this.$emit('aoSalvarTarefa', {
				duracaoEmSegundos: tempoDecorrido,
				descricao: this.descricao
			})
			this.descricao = ''
		}
	}
});
</script>

<style>
.formulario {
	color: var(--texto-primario);
	background: var(--bg-primario);
}
</style>

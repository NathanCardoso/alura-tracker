<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulario para criação de uma nova tarefa"
      >
        <input type="text" class="input" placeholder="Qual tarefa deseja iniciar?" v-model='descricao' />
      </div>
				<div class="column is-3">
					<div class="select">
						<select v-model="idProjeto">
							<option value="">Selecione o projeto</option>
							<option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">{{projeto.nome}}</option>
						</select>
					</div>
				</div>
      <div class="column is-3">
        <TemporizadorForm @aoTemporizadorFinalizado="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import TemporizadorForm from "./TemporizadorForm.vue";
import { lidarComSucesso, lidarComFalha } from "@/hooks/tratamento-de-notificacao";
import { OBTER_PROJETOS } from "@/store/tipo-acoes-projetos";
import { useStore } from 'vuex'
import { key } from '@/store'

export default defineComponent({
  name: "FormularioBox",
	emits: ['aoSalvarTarefa'],
  components: {
    TemporizadorForm,
  },
	data() {
		return  {
			descricao: '',
			idProjeto: ''
		}
	},
	methods: {
		finalizarTarefa(tempoDecorrido) {
			const projeto = this.projetos.find(proj => proj.id == this.idProjeto)

			if(projeto) {
				lidarComSucesso('SUCESSO', 'Parabéns', 'Sua tarefa foi adicionada com sucesso!') 
			} else {
				lidarComFalha('FALHA', 'Ops!', 'Selecione um projeto para finalizar a sua tarefa',)
				return
			}
			
			this.$emit('aoSalvarTarefa', {
				duracaoEmSegundos: tempoDecorrido,
				descricao: this.descricao,
				projeto: projeto
			})
			this.descricao = ''
		}
	},
	setup() {
		const store = useStore(key)
		store.dispatch(`projeto/${OBTER_PROJETOS}`)

		return {
			projetos: computed(() => store.state.projeto.projetos),
			store
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

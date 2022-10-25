import {createStore, useStore as vuexUseStore} from 'vuex'
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO } from '@/store/tipo-de-mutacoes'
import { ADICIONA_TAREFA, ATUALIZAR_TAREFA, REMOVER_TAREFA } from '@/store/tipo-de-mutacoes-tarefa'

export const key = Symbol()

export const store = createStore({
	state: {
		projetos: [],
		tarefas: []
	},
	mutations: {
		[ADICIONA_PROJETO](state, nomeDoProjeto) {
			const projeto = {
				id: new Date().toISOString(),
				nome: nomeDoProjeto
			}
			state.projetos.push(projeto)
		},
		[ALTERA_PROJETO](state, projeto) {
			const index = state.projetos.findIndex(proj => proj.id == projeto.id)
			state.projetos[index] = projeto
		},
		[EXCLUIR_PROJETO](state, id) {
			state.projetos = state.projetos.filter(proj => proj.id != id)
		},
		[ADICIONA_TAREFA](state, tarefa) {
			tarefa.id = new Date().toISOString()
			state.tarefas.push(tarefa)
		},
		[ATUALIZAR_TAREFA](state, tarefa) {
			const index = state.tarefas.findIndex(taref => taref.id == tarefa.id)
			state.tarefas[index] = tarefa
		},
		[REMOVER_TAREFA](state, id) {
			state.tarefas = state.tarefas.filter(taref => taref.id != id)
		}
	}
})

export function useStore() {
	return vuexUseStore(key)
}
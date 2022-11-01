import {createStore, useStore as vuexUseStore} from 'vuex'
import { NOTIFICAR, DEFINIR_TAREFAS, ALTERA_TAREFA } from '@/store/tipo-de-mutacoes'
import { ADICIONA_TAREFA, ATUALIZAR_TAREFA, REMOVER_TAREFA } from '@/store/tipo-de-mutacoes-tarefa'
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "@/store/tipo-acoes"
import projeto from "@/store/modulos/projeto/index.js"
import http from "@/http"

export const key = Symbol()

export const store = createStore({
	modules: {
		projeto
	},
	state: {
		tarefas: [],
		notificacoes: [],
	},
	mutations: {
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
		},
		[NOTIFICAR](state, novaNotificacao) {
			novaNotificacao.id = new Date().getTime()
			state.notificacoes.push(novaNotificacao)

			setTimeout(() => {
				state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
			}, 3000)
		},
		[ADICIONA_TAREFA](state, tarefa) {
			state.tarefas.push(tarefa)
		},
		[ALTERA_TAREFA](state, tarefa) {
			const index = state.tarefas.findIndex(proj => proj.id == tarefa.id)
			state.projetos[index] = tarefa
		},
		[DEFINIR_TAREFAS](state, tarefas) {
			state.tarefas = tarefas
		},
	},
	actions: {
		[OBTER_TAREFAS]({ commit }) {
			http.get('tarefas').then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
		},
		[CADASTRAR_TAREFA](contexto, tarefa) {
			return http.post('tarefas', tarefa).then(resposta => this.commit(ADICIONA_TAREFA, resposta.data))
		},
		[ALTERAR_TAREFA]({ commit }, tarefa) {
			return http.put(`tarefas/${tarefa.id}`, tarefa).then(() => commit(ALTERA_TAREFA, tarefa))
		},
	}
})

export function useStore() {
	return vuexUseStore(key)
}
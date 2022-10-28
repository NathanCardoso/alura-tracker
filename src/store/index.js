import {createStore, useStore as vuexUseStore} from 'vuex'
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETO, NOTIFICAR } from '@/store/tipo-de-mutacoes'
import { ADICIONA_TAREFA, ATUALIZAR_TAREFA, REMOVER_TAREFA } from '@/store/tipo-de-mutacoes-tarefa'
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/store/tipo-acoes"
import http from "@/http"

export const key = Symbol()

export const store = createStore({
	state: {
		projetos: [],
		tarefas: [],
		notificacoes: []
	},
	mutations: {
		[ADICIONA_PROJETO](state, nomeDoProjeto) {
			const projeto = {
				id: new Date().toISOString(),
				nome: nomeDoProjeto
			}
			state.projetos.push(projeto)
			console.log([OBTER_PROJETOS])
		},
		[ALTERA_PROJETO](state, projeto) {
			const index = state.projetos.findIndex(proj => proj.id == projeto.id)
			state.projetos[index] = projeto
		},
		[EXCLUIR_PROJETO](state, id) {
			state.projetos = state.projetos.filter(proj => proj.id != id)
		},
		[DEFINIR_PROJETO](state, projetos) {
			state.projetos = projetos
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
		},
		[NOTIFICAR](state, novaNotificacao) {
			novaNotificacao.id = new Date().getTime()
			state.notificacoes.push(novaNotificacao)

			setTimeout(() => {
				state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
			}, 3000)
		}
	},
	actions: {
		[OBTER_PROJETOS]({ commit }) {
			http.get('projetos').then(resposta => commit(DEFINIR_PROJETO, resposta.data))
		},
		[CADASTRAR_PROJETO](contexto, nomeDoProjeto) {
			return http.post('projetos', {
				nome: nomeDoProjeto
			})
		},
		[ALTERAR_PROJETO](contexto, projeto) {
			return http.put(`projetos/${projeto.id}`, projeto)
		},
		[REMOVER_PROJETO]({ commit }, id) {
			return http.delete(`projetos/${id}`).then(() => commit(EXCLUIR_PROJETO, id))
		}
	}
})

export function useStore() {
	return vuexUseStore(key)
}
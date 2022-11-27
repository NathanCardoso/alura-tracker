
import { ADICIONA_TAREFA, ATUALIZAR_TAREFA, REMOVER_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS } from '@/store/tipo-de-mutacoes-tarefas'
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA, EXCLUIR_TAREFA } from '@/store/tipo-acoes-tarefas'
import http from '@/http'

export default {
	namespaced: true,
	state: {
		tarefas: []
	},
	mutations: {
		[ADICIONA_TAREFA](state, tarefa) {
			state.tarefas.push(tarefa)
		},
		[ATUALIZAR_TAREFA](state, tarefa) {
			const index = state.tarefas.findIndex(taref => taref.id == tarefa.id)
			state.tarefas[index] = tarefa
		},
		[REMOVER_TAREFA](state, id) {
			state.tarefas = state.tarefas.filter(taref => taref.id != id)
		},
		[ALTERA_TAREFA](state, tarefa) {
			const index = state.tarefas.findIndex(proj => proj.id == tarefa.id)
			state.tarefas[index] = tarefa
		},
		[DEFINIR_TAREFAS](state, tarefas) {
			state.tarefas = tarefas
		},
	},
	actions: {
		[OBTER_TAREFAS]({ commit }, filtro) {
			let url = 'tarefas'
			
			filtro ? url += '?descricao=' + filtro : ''
			http.get(url).then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
		},
		[CADASTRAR_TAREFA]({ commit }, tarefa) {
			return http.post('tarefas', tarefa).then(resposta => commit(ADICIONA_TAREFA, resposta.data))
		},
		[ALTERAR_TAREFA]({ commit }, tarefa) {
			return http.put(`tarefas/${tarefa.id}`, tarefa).then(() => commit(ALTERA_TAREFA, tarefa))
		},
		[EXCLUIR_TAREFA]({ commit }, id) {
			return http.delete(`tarefas/${id}`).then(() => commit(REMOVER_TAREFA, id))
		},
	}
}
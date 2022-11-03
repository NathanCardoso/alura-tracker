import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETO } from "@/store/tipo-de-mutacoes-projetos"
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/store/tipo-acoes-projetos"
import http from "@/http"

export default {
	namespaced: true,
	state: {
		projetos: []
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
		[DEFINIR_PROJETO](state, projetos) {
			state.projetos = projetos
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
		},
	}
}
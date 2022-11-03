import {createStore, useStore as vuexUseStore} from 'vuex'
import { NOTIFICAR } from '@/store/tipo-de-mutacoes'
import projeto from "@/store/modulos/projeto/index.js"
import tarefa from "@/store/modulos/tarefa/index.js"

export const key = Symbol()

export const store = createStore({
	modules: {
		projeto,
		tarefa
	},
	state: {
		notificacoes: [],
	},
	mutations: {
		[NOTIFICAR](state, novaNotificacao) {
			novaNotificacao.id = new Date().getTime()
			state.notificacoes.push(novaNotificacao)

			setTimeout(() => {
				state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
			}, 3000)
		}
	},
})

export function useStore() {
	return vuexUseStore(key)
}
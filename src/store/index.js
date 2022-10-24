import {createStore} from 'vuex'
import {injectionKey} from 'vue'

const estado = {
	projetos: []
}

export const key = new injectionKey(estado)

export const store = createStore({
	state: {
		projetos: [
			{
				id: new Date().toDateString(),
				nome: 'TypeScript'
			},
			{
				id: new Date().toDateString(),
				nome: 'Vue'
			},
			{
				id: new Date().toDateString(),
				nome: 'Vuex'
			}
		]
	}
})
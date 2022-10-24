import {createRouter, createWebHashHistory} from 'vue-router'
import TarefasTracker from '@/views/TarefasTracker.vue'
import ProjetosTracker from '@/views/ProjetosTracker.vue'

const rotas = [
	{
		path: '/',
		name: 'Tarefas',
		component: TarefasTracker
	},
	{
		path: '/projetos',
		name: 'Projetos',
		component: ProjetosTracker
	}
]

const roteador = createRouter({
	history: createWebHashHistory(),
	routes: rotas
})

export default roteador;
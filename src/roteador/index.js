import { createRouter, createWebHashHistory } from "vue-router";
import TarefasTracker from "@/views/TarefasTracker.vue";
import ProjetosTracker from "@/views/ProjetosTracker.vue";
import FormularioTracker from "@/views/Projetos/FormularioTracker.vue";
import ListaTracker from '@/views/Projetos/ListaTracker.vue'

const rotas = [
  {
    path: "/",
    name: "Tarefas",
    component: TarefasTracker,
		children: [
			{
				path: ':id',
				name: 'Editar Tarefa',
				component: TarefasTracker,
				props: true
			}
		]
  },
  {
    path: "/projetos",
    component: ProjetosTracker,
    children: [
      {
        path: "",
        name: "Projetos",
        component: ListaTracker,
      },
      {
        path: "novo",
        name: "Novo Projeto",
        component: FormularioTracker,
      },
      {
        path: ":id",
        name: "Editar Projetos",
        component: FormularioTracker,
        props: true,
      },
    ],
  },
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;

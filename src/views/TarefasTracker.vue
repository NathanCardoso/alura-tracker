<template>
  <FormularioBox @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <TarefaForm v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    <BoxForm v-if="listaVazia">
      <p>Você não estar muito produtivo hoje :(</p>
    </BoxForm>
  </div>
</template>

<script>
import { useStore } from "@/store";
import { ADICIONA_TAREFA } from '@/store/tipo-de-mutacoes-tarefa'
import { defineComponent, computed } from "vue";
import FormularioBox from "@/components/FormularioBox.vue";
import TarefaForm from "@/components/TarefaForm.vue";
import BoxForm from "@/components/BoxForm.vue";

export default defineComponent({
  name: "App",
  components: {
    FormularioBox,
    TarefaForm,
    BoxForm,
  },
  data() {
    return {
      tarefa: [],
    };
  },
  computed: {
    listaVazia() {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa) {
      // this.tarefas.push(tarefa);
      // console.log(tarefa);
			this.store.commit(ADICIONA_TAREFA, tarefa)
    }
  },
	setup() {
		const store = useStore();
    return {
      tarefas: computed(() => store.state.tarefas),
			store
    };
	}
});
</script>

<style>
</style>

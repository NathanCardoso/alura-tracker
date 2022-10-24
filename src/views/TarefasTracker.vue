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
import { defineComponent } from "vue";
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
      tarefas: [],
    };
  },
  computed: {
    listaVazia() {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa) {
      this.tarefas.push(tarefa);
      console.log(this.tarefa);
    }
  },
});
</script>

<style>
</style>

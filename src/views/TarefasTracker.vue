<template>
  <FormularioBox @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <TarefaForm
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <BoxForm v-if="listaVazia">
      <p>Você não estar muito produtivo hoje :(</p>
    </BoxForm>
    <div
      class="modal"
      :class="{ 'is-active': tarefaSelecionada }"
      v-if="tarefaSelecionada"
    >
      <div class="modal-background" @click="fecharModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma tarefa</p>
          <button class="delete" aria-label="close" @click="fecharModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label">Descricao</label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="descricaoDaTarefa"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="alterarTarefa">
            Salvar altereações
          </button>
          <button class="button is-danger" @click="fecharModal">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/store";
import {
  OBTER_TAREFAS,
  CADASTRAR_TAREFA,
  ALTERAR_TAREFA,
} from "@/store/tipo-acoes-tarefas";
import { defineComponent, computed } from "vue";
import FormularioBox from "@/components/FormularioBox.vue";
import TarefaForm from "@/components/TarefaForm.vue";
import BoxForm from "@/components/BoxForm.vue";
import { lidarComSucesso, lidarComFalha } from "@/hooks/tratamento-de-notificacao";

export default defineComponent({
  name: "App",
  components: {
    FormularioBox,
    TarefaForm,
    BoxForm,
  },
  data() {
    return {
      tarefaSelecionada: null,
      nomeDoProjeto: "",
    };
  },
  computed: {
    listaVazia() {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa) {
      this.store.dispatch(`tarefa/${CADASTRAR_TAREFA}`, tarefa);
    },
    selecionarTarefa(tarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store
        .dispatch(`tarefa/${ALTERAR_TAREFA}`, this.tarefaSelecionada)
        .then(() => {
          this.fecharModal();
          lidarComSucesso(
            "SUCESSO",
            "Excelente!",
            "Prontinho :) sua tarefa foi atualizada!"
          );
        })
        .catch(() => {
          lidarComFalha("FALHA", "Ops!", "Não conseguimos cadastrar o seu projeto.");
        });
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(`tarefa/${OBTER_TAREFAS}`);
    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
    };
  },
});
</script>

<style></style>

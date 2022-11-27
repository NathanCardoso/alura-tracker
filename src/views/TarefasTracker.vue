<template>
  <FormularioBox @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left">
        <input
          type="text"
          class="input"
          placeholder="Digite para filtrar"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <TarefaForm
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <BoxForm v-if="listaVazia">
      <p>Você não estar muito produtivo hoje :(</p>
    </BoxForm>
    <ModalTracker :mostrar="tarefaSelecionada != null">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editando uma tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
          <label for="descricaoDaTarefa" class="label">Descricao</label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="descricaoDaTarefa"
          />
        </div>
      </template>
      <template v-slot:rodape>
        <button class="button is-success" @click="alterarTarefa">
          Salvar altereações
        </button>
        <button class="button is-danger" @click="fecharModal">Cancelar</button>
      </template>
    </ModalTracker>
  </div>
</template>

<script>
import { useStore } from "@/store";
import {
  OBTER_TAREFAS,
  CADASTRAR_TAREFA,
  ALTERAR_TAREFA,
} from "@/store/tipo-acoes-tarefas";
import { defineComponent, computed, ref, watchEffect } from "vue";
import FormularioBox from "@/components/FormularioBox.vue";
import TarefaForm from "@/components/TarefaForm.vue";
import BoxForm from "@/components/BoxForm.vue";
import { lidarComSucesso, lidarComFalha } from "@/hooks/tratamento-de-notificacao";
import ModalTracker from "@/components/ModalTracker.vue"
export default defineComponent({
  name: "App",
  components: {
    FormularioBox,
    TarefaForm,
    BoxForm,
		ModalTracker
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
    const filtro = ref("");

    watchEffect(() => {
      store.dispatch(`tarefa/${OBTER_TAREFAS}`, filtro.value);
    });

    return {
      filtro,
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
    };
  },
});
</script>

<style></style>

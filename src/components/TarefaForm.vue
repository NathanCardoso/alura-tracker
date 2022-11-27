<template>
  <BoxForm>
    <div
      class="columns is-flex is-align-items-center is-justify-content-space-between clicavel"
    >
      <div class="column is-7 is-flex" @click="tarefaClicada">
        <div class="column is-5">
          {{ tarefa.descricao || "Tarefa sem descrição" }}
        </div>
        <div class="column is-3">
          {{ tarefa.projeto.nome }}
        </div>
      </div>
      <div class="column is-3">
        <CronometroForm :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
      <div>
        <button class="button ml-2 is-danger" @click="excluir(tarefa.id)">
          <span class="icon is-small">
            <i class="fas fa-trash"></i>
          </span>
        </button>
      </div>
    </div>
  </BoxForm>
</template>

<script>
import { useStore } from "@/store";
import { EXCLUIR_TAREFA } from "@/store/tipo-acoes-tarefas";
import { defineComponent, computed, ref } from "vue";
import CronometroForm from "./CronometroForm.vue";
import BoxForm from "./BoxForm.vue";
import { lidarComSucesso, lidarComFalha } from "@/hooks/tratamento-de-notificacao";

export default defineComponent({
  name: "TarefaForm",
  emits: ["aoTarefaClicada"],
  props: {
    tarefa: {
      type: Object,
      required: true,
    },
  },
  components: {
    CronometroForm,
    BoxForm,
  },
  setup(props, { emit }) {
    const store = useStore();
    const editarTarefa = ref(true);
		const tarefas = computed(() => store.state.tarefa.tarefas)
		
    const tarefaClicada = () => {
      emit("aoTarefaClicada", props.tarefa);
    };
    const excluir = (id) => {
      store
        .dispatch(`tarefa/${EXCLUIR_TAREFA}`, id)
        .then(() =>
          lidarComSucesso(
            "SUCESSO",
            "Parabéns!",
            " :) Sua tarefa foi excluida com sucesso!"
          )
        )
        .catch(() =>
          lidarComFalha("FALHA", "Ops!", ":( Não conseguimos excluir a sua tarefa!")
        );
    };

    return {
      editarTarefa,
      tarefaClicada,
      excluir,
      tarefas
    };
  },
});
</script>

<style scoped>
.clicavel {
  cursor: pointer;
}
</style>

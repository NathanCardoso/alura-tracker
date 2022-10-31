<template>
  <BoxForm>
    <div class="columns is-flex is-align-items-center is-justify-content-space-between clicavel">
      <div class="column is-7 is-flex" v-if="editarTarefa" @click="tarefaClicada">
        <div class="column is-5">
          {{ tarefa.descricao || "Tarefa sem descrição" }}
        </div>
        <div class="column is-3">
          {{ tarefa.projeto.nome }}
        </div>
      </div>
      <div
        class="column is-7 is-flex is-align-items-center is-justify-content-space-between"
        v-else
      >
        <div class="column">
          <input
            type="text"
            class="input"
            placeholder="Digite..."
            v-model.lazy="descricao"
          />
        </div>
        <div class="column is-2">
          <button type="submit" class="button" @click="alterarTarefa(tarefa)">
            Salvar
          </button>
        </div>
      </div>

      <div class="column is-3">
        <CronometroForm :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
      <div>
        <button class="button" @click="editarTarefa = !editarTarefa">
          <span class="icon is-small">
            <i class="fas fa-pencil-alt"></i>
          </span>
        </button>
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
import {
  REMOVER_TAREFA,
  ATUALIZAR_TAREFA,
  ADICIONA_TAREFA,
} from "@/store/tipo-de-mutacoes-tarefa";
import { defineComponent } from "vue";
import CronometroForm from "./CronometroForm.vue";
import BoxForm from "./BoxForm.vue";

export default defineComponent({
  name: "TarefaForm",
	emits: ['aoTarefaClicada'],
  data() {
    return {
      editarTarefa: true,
      descricao: "",
    };
  },
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
  methods: {
		tarefaClicada() {
			this.$emit('aoTarefaClicada', this.tarefa)
		},
    excluir(id) {
      this.store.commit(REMOVER_TAREFA, id);
    },
    alterarTarefa(tarefa) {
      if (tarefa.id) {
        this.store.commit(ATUALIZAR_TAREFA, {
          id: tarefa.id,
          descricao: this.descricao,
          duracaoEmSegundos: tarefa.duracaoEmSegundos,
          projeto: {
            id: tarefa.projeto.id,
            nome: tarefa.projeto.nome,
          },
        });
        this.editarTarefa = !this.editarTarefa;
      } else {
        this.store.commit(ADICIONA_TAREFA, this.descricao);
      }
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>

<style scoped>
	.clicavel {
		cursor: pointer;
	}
</style>

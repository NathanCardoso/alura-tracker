<template>
  <BoxForm>
    <div class="columns is-flex is-align-items-center is-justify-content-space-between">
      <div class="column is-7" v-if="editarTarefa">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div
        class="column is-7 is-flex is-align-items-cetner is-justify-content-space-between"
        v-else
      >
        <div class="column">
          <input type="text" class="input" v-model="description" />
        </div>
        <div class="column is-2">
          <button type="submit" class="button" @click="editarTarefa = !editarTarefa">Salvar</button>
        </div>
      </div>

      <div class="column is-3">
        <CronometroForm :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
      <div>
        <router-link
          :to="`${tarefa.id}`"
          class="button"
          @click="editarTarefa = !editarTarefa"
        >
          <span class="icon is-small">
            <i class="fas fa-pencil-alt"></i>
          </span>
        </router-link>
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
import { REMOVER_TAREFA } from "@/store/tipo-de-mutacoes-tarefa";
import { defineComponent } from "vue";
import CronometroForm from "./CronometroForm.vue";
import BoxForm from "./BoxForm.vue";

export default defineComponent({
  name: "TarefaForm",
  data() {
    return {
      editarTarefa: true,
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
    excluir(id) {
      this.store.commit(REMOVER_TAREFA, id);
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

<style></style>

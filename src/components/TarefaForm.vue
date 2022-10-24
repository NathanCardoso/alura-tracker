<template>
  <BoxForm>
    <div class="columns">
      <div class="column is-7">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column">
        <CronometroForm :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </BoxForm>
</template>

<script>
import { defineComponent } from "vue";
import CronometroForm from "./CronometroForm.vue";
import BoxForm from "./BoxForm.vue";

export default defineComponent({
  name: "TarefaForm",
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
});
</script>

<style></style>

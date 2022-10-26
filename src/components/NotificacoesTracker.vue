<template>
  <div class="notificacoes">
    <article class="message" :class="contexto[notificacao.tipo]" v-for="notificacao in notificacoes" :key="notificacao.id">
      <div class="message-header">{{notificacao.titulo}}</div>
      <div class="message-body">{{notificacao.texto}}</div>
    </article>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "NotificacoesTracker",
	data() {
		return {
			contexto: {
				SUCESSO: 'is-success', 
				ATENCAO: 'is-warning', 
				FALHA: 'is-danger' 
			}
		}
	},
  setup() {
    const store = useStore();

    return {
      notificacoes: computed(() => store.state.notificacoes),
    };
  },
});
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 1;
}
</style>

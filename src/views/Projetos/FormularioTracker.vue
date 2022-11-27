<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto" />
      </div>
      <div class="field">
        <button type="submit" class="button">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script>
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from "@/store/tipo-acoes-projetos";
import { lidarComSucesso, lidarComFalha } from "@/hooks/tratamento-de-notificacao";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FormularioTracker",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
		const router = useRouter()
    const store = useStore();
    const nomeDoProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find((proj) => proj.id == props.id);
      nomeDoProjeto.value = projeto.nome || "";
    }

		const salvar = () => {
      if (props.id) {
        store
          .dispatch(`projeto/${ALTERAR_PROJETO}`, {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => {
            lidarComSucesso(
              "SUCESSO",
              "Excelente!",
              "Prontinho :) seu projeto foi atualizado!"
            );
            nomeDoProjeto.value = "";
            router.push("/projetos");
          })
          .catch(() =>
            lidarComFalha("FALHA", "Ops!", "Não conseguimos atualizar o seu projeto.")
          );
      } else {
        store
          .dispatch(`projeto/${CADASTRAR_PROJETO}`, nomeDoProjeto.value)
          .then(() => {
            lidarComSucesso(
              "SUCESSO",
              "Excelente!",
              "Prontinho :) seu projeto já estar disponível."
            );
            nomeDoProjeto.value = "";
            router.push("/projetos");
          })
          .catch(() =>
            lidarComFalha("FALHA", "Ops!", "Não conseguimos cadastrar o seu projeto.")
          );
      }
    }
    return {
      nomeDoProjeto,
			salvar
    };
  },
});
</script>

<style></style>

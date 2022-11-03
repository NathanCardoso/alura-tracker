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
import { defineComponent } from "vue";
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from "@/store/tipo-acoes-projetos";
import useNotificador from "@/hooks/notificador";
import { lidarComSucesso, lidarComFalha } from "@/hooks/tratamento-de-notificacao";

export default defineComponent({
  name: "FormularioTracker",
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projeto.projetos.find(
        (proj) => proj.id == this.id
      );
      this.nomeDoProjeto = projeto.nome || "";
    }
  },
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store
          .dispatch(`projeto/${ALTERAR_PROJETO}`, {
            id: this.id,
            nome: this.nomeDoProjeto,
          })
          .then(() => {
            lidarComSucesso(
              "SUCESSO",
              "Excelente!",
              "Prontinho :) seu projeto foi atualizado!"
            );
            this.nomeDoProjeto = "";
            this.$router.push("/projetos");
          })
          .catch(() =>
            lidarComFalha("FALHA", "Ops!", "Não conseguimos atualizar o seu projeto.")
          );
      } else {
        this.store
          .dispatch(`projeto/${CADASTRAR_PROJETO}`, this.nomeDoProjeto)
          .then(() => {
            lidarComSucesso(
              "SUCESSO",
              "Excelente!",
              "Prontinho :) seu projeto já estar disponível."
            )
						this.nomeDoProjeto = "";
						this.$router.push("/projetos");
					}
          )
          .catch(() =>
            lidarComFalha("FALHA", "Ops!", "Não conseguimos cadastrar o seu projeto.")
          );
      }
    },
  },
  setup() {
    const store = useStore();
    const notificar = useNotificador();
    return {
      store,
      notificar,
    };
  },
});
</script>

<style></style>

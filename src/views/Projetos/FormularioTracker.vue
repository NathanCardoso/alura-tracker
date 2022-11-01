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
// import { ALTERAR_PROJETO } from "@/store/tipo-acoes";
import { CADASTRAR_PROJETO } from "@/store/tipo-acoes";
import useNotificador from "@/hooks/notificador";

export default defineComponent({
  name: "FormularioTracker",
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projeto.projetos.find((proj) => proj.id == this.id);
			console.log(projeto.nome)
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
			const lalala = 'projeto/ALTERAR_PROJETO'
      if (this.id) {
        this.store
          .dispatch(lalala, {
            id: this.id,
            nome: this.nomeDoProjeto,
          })
          .then(() =>
            this.lidarComSucesso(
              "SUCESSO",
              "Excelente!",
              "Prontinho :) seu projeto foi atualizado!."
            )
          )
          .catch(() =>
            this.lidarComFalha("FALHA", "Ops!", "Não conseguimos atualizar o seu projeto")
          );
      } else {
        this.store
          .dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() =>
            this.lidarComSucesso(
              "SUCESSO",
              "Excelente!",
              "Prontinho :) seu projeto já estar disponível."
            )
          )
          .catch(() =>
            this.lidarComFalha("FALHA", "Ops!", "Não conseguimos cadastrar o seu projeto")
          );
      }
    },
    lidarComSucesso(tipo, titulo, mensagem) {
      this.nomeDoProjeto = "";
      this.notificar(tipo, titulo, mensagem);
      this.$router.push("/projetos");
    },
    lidarComFalha(tipo, titulo, mensagem) {
      this.notificar(tipo, titulo, mensagem);
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

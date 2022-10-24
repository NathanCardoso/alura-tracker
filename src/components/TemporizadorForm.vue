<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <CronometroForm :tempoEmSegundos="tempoEmSegundos" />
		<ButtonForm @clicado='iniciar' icone='fas fa-play' texto='play' :desabilitado='cronometroRodando'/>
		<ButtonForm @clicado='finalizar' icone='fas fa-stop' texto='stop' :desabilitado='!cronometroRodando'/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CronometroForm from "@/components/CronometroForm.vue";
import ButtonForm from "./ButtonForm.vue";

export default defineComponent({
  name: "TemporizadorForm",
	emits: ['aoTemporizadorFinalizado'],
  components: {
    CronometroForm,
    ButtonForm
},
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
			cronometroRodando: false
    };
  },
  methods: {
    iniciar() {
			this.cronometroRodando = true
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos++;
      }, 1000);
    },
    finalizar() {
			this.cronometroRodando = false
      clearInterval(this.cronometro);
			this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
			this.tempoEmSegundos = 0
    },
  },
});
</script>

<style></style>

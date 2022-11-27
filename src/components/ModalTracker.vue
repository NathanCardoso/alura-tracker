<template>
  <div class="modal" :class="{ 'is-active': mostrar }" v-if="mostrar">
    <div class="modal-background" @click="fecharModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
				<slot name="cabecalho"></slot>
			</header>
			<section class="modal-card-body">
				<slot name="corpo"></slot>
			</section>
			<footer class="modal-card-foot">
				<slot name="rodape"></slot>
			</footer>
    </div>
		{{mostrar}}
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalTracker",
  props: {
    mostrar: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style></style>

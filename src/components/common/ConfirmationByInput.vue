<template>
  <ModalDefault>
    <template v-slot:header> <h1>{{ modalTitle }}</h1></template>
    <section >
      <slot name="top-content"></slot>

      <div class="mt-4">
        <label>
          {{ confirmationMessage ? confirmationMessage : 'Para confirmar a ação, escreva:' }}
          <strong>{{ ' ' + checkToken }}</strong>
        </label>
        <input type="text" v-model="checkStr" class="input-primary w-full" />
      </div>
    </section>
    <template v-slot:footer>
      <footer class="flex justify-between">
        <button @click="$emit('close')" class="btn border-0">Cancelar</button>
        <Spinner v-if="isLoading" />
        <button v-else @click="$emit('save')" :disabled="!isValid" class="btn-danger">Salvar</button>
      </footer>
    </template>
  </ModalDefault>
</template>

<script>
import ModalDefault from "../common/Modal.vue";
import Spinner from "../common/Spinner.vue";
export default {
  name: "ConfirmationByInput",
  props: {
    modalTitle: { type: String, required: true },
    confirmationMessage: { type: String, required: false },
    checkToken: { type: String, required: true },
    isLoading: { type: Boolean, required: false },
  },
  components: { ModalDefault, Spinner },
  data: () => ({
    checkStr: "",
  }),
  computed: {
    isValid() {
      return this.checkToken === this.checkStr
    }
  },
};
</script>

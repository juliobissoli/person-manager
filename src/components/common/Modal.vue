<template>
  <div class="modal" v-on:click.self="$emit('close')">
    <div>
      <div class="modal_body bg-white dark:bg-zinc-900 mt-[10vh] w-[90vw] md:w-[500px] h-auto">
        <header class="flex justify-between header px-6 py-2 pt-4 border-b dark:border-zinc-700">
          <div class="d-flex align-items-end ">
            <slot name="header"></slot>
          </div>
          <div class="d-flex justify-content-end">
            <button class="" @click="$emit('close')" style="border: none">
              <i class="ph ph-x "></i>
            </button>
          </div>
        </header>

        <div class="body ">
          <div class="px-6 py-4 max-h-[60vh] box-limited">
            <slot></slot>
          </div>
        </div>
        <div class="">
          <div class="p-4 border-t  dark:border-zinc-700 pt-4 px-6">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalDefult",
  //   props: ["small"],
  watch: {
    // messageError() {
    //   setTimeout(() => {
    //     this.messageError = "";
    //   }, 3000);
    // },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: start;
  opacity: 1;
  z-index: 20;
}
.modal_body {
  /* background-color: #ffffff; */
  height: auto;
  overflow-y: auto;
  border-radius: 10px;
}

.header {
  font-weight: 300;
  font-size: 20px;
}

.footer {
  border-top: 1px solid #f1f1f1;
}
@media (max-width: 765px) {
  .modal_body {
    width: 100% !important;
  }
}
.animate-start {
  animation: traslateLeft 1000ms;
}
@keyframes traslateLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100);
  }
}
</style>

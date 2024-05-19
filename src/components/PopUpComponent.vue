<template>
    <div
      v-if="getPopupMessage"
      class="md:ml-[9vw] box-border fixed border-black top-0 z-50 max-w-[280px] md:max-w-[400px]  text-center border-red-100 shadow-sm left-1/2 transform -translate-x-1/2 mt-4 rounded-md"
      :class="
        !getPopupIsDanger
          ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500'
          : 'bg-red-400'
      "
    >
      <p class="w-full text-zinc-50 text-sm p-4 rounded-b-md text-truncate">
        {{ getPopupMessage }}
      </p>
      <div class="w-full h-1 bg-zinc-300 rounded-b-xl">
        <div class="h-full  box-animate rounded-b-md"
        :class="
        !getPopupIsDanger
          ? 'bg-purple-700'
          : 'bg-red-600'
      "
        ></div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    name: "PopUpComponent",
    computed: {
      ...mapGetters(["getPopupMessage", "getPopupIsDanger"]),
    },
  };
  </script>
  
  <style scoped>
  .box-animate {
    animation: expandWidth 4s linear;
  }
  @keyframes expandWidth {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  </style>
  
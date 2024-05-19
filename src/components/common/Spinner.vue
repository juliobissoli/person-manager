<template>
    <div class=" flex flex-col justify-center items-center">
  
      <div class="animate-spi">
        <div
        class="animate-spi animate-spin h-[24px] w-[24px] rounded-full border-4 border-l-zinc-300"
        ></div>
      </div>
      <span v-show="message">carregando</span>
    </div>
  </template>
  
  <script>
  export default {
    name: "SpinnerAnimation",
    props: {message: {type: String, required: false}}
  };
  </script>
  
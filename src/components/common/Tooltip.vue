<template>
  <div class="relative flex flex-col justify-center hover-show">
      <slot></slot>
      <div
      class="z-20 absolute hover-content opacity-70 p-1 inset-center arrow-top mt-[34px] rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-black"
    >
    <small class="inline-block whitespace-nowrap" >
        {{ text }}
    </small>
    </div>
  </div>
</template>

<script>
export default {
  name: "TooltipComponent",
  props: {
    text: {typeof: String, required: true}
  }
};
</script>

<style scoped>

.hover-show .hover-content {
  display: none;
}

.hover-show:hover .hover-content {
  display: flex;
}

.inset-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


.arrow-top:before {
  content: '';

  top: -8%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  border-bottom: 5px solid rgba(0, 0, 0, 0.6);
  border-right:  4px solid transparent;
  border-left:   4px solid transparent;
}
</style>

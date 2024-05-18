<template>
    <div
      class="w-full flex border rounded-lg overflow-auto"
      :class="disabled ? 'dark:border-zinc-800' : 'dark:border-zinc-600'"
    >
      <button
        v-for="(item, i) in data"
        class="p-1 px-2 text-center"
        :key="item.value"
        :class="[
          getBackground(item.value),
          `w-1/${data.length}`
        ]"
        :disabled="disabled"
        @click="select(item.value)"
      >
        <i
          v-if="item.icon"
          class="ph text-xl"
          :class="[
            item.icon,
            item.value === selected ? 'text-zinc-50 dark:text-zinc-900' : 'text-zinc-900 dark:text-zinc-100'
          ]"
        >
        </i>
        <span v-else>{{ item.label }}</span>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "BtnToggle",
    props: {
      data: { type: Array, required: true },
      first: { required: false },
      disabled: { type: Boolean, default: false, required: false },
    },
    data: () => ({
      selected: undefined,
    }),
    created() {
      this.selected = this.first;
      //   this.selected = JSON.parse(JSON.stringify(this.first))
    },
    methods: {
      select(value) {
        this.selected = value
        this.$emit("select", value);
      },
      getBackground(value) {
        if (value === this.selected) {
          if (this.disabled) {
            return 'bg-zinc-500 dark:bg-zinc-400 text-zinc-500 dark:text-zinc-900';
          } else {
            return 'bg-zinc-800 dark:bg-zinc-50 text-zinc-100 dark:text-zinc-900';
          }
        } else {
          if (this.disabled) {
            return 'bg-zinc-200 dark:bg-zinc-700';
          } else {
            return 'hover:bg-zinc-100 dark:hover:bg-zinc-800';
          }
        }
      },
    },
  };
  </script>
  
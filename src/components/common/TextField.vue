<script>
export default {
  name: "TextField",
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      required: true,
      default: "text",
    },
    isError: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false
    }
  },

  methods: {
    handleChange(event) {
      this.$emit("update", event);
    },
  },
};
</script>

<template>
  <label class="w-full flex flex-col">
   <span class="text-sm text-zinc-500"> {{ label }} </span>
    <input
      class="input-primary"
      :class="{ 'border-red-500': isError }"
      :type="type || 'text'"
      :disabled="disabled"
      :value="modelValue"
      @input="handleChange"
    />
  </label>
</template>

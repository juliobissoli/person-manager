<template>
    <div
      class="h-10 flex items-center text-sm m-0"
      :class="!isExpanded ? 'w-1' : 'input-primary'"
    >
      <input
        ref="input"
        type="text"
        @focus="isExpanded = true"
        @blur="handleBlur"
        class="h-9 "
        :class="isExpanded ? 'w-full' : 'w-[1px]'"
        v-model="inputValue"
        @input="handleInput"
        :placeholder="isExpanded ? 'Pesquisar' : ''"
      />
  
      <button
        v-if="inputValue.length > 0 && iconSuffix"
        class="btn border-0"
        @click="$emit('clickSuffix')"
      >
        <i
          class="icon bg-zinc-500  hover:bg-zinc-50"
          :class="iconSuffix"
        ></i>
      </button>
      <i v-else class="ph ph-magnifying-glass text-zinc-500 " :class="isExpanded ? '' : 'hidden'"></i>
    </div>
  
    <button v-show="!isExpanded" class="btn  text-xl" @click="handleFocus()">
      <i class="ph ph-magnifying-glass text-zinc-300"></i>
    </button>
  </template>
  
  <script>
  import debounce from "lodash.debounce";
  
  export default {
    name: "SearchInput",
    emits: ["changeInput", "clickSuffix"],
    props: { value: String, iconSuffix: String, defaultExpanded: Boolean },
  
    data: () => ({
      isExpanded: false,
      inputValue: "",
    }),
    watch: {
      defaultExpanded(newValue) {
        this.isExpanded = newValue || false;
      },
    },
    mounted() {
      this.isExpanded = this.defaultExpanded || false;
    },
  
    methods: {
      handleFocus() {
        this.$refs.input.focus();
        this.isExpanded = true;
      },

      handleBlur() {
        if(!this.defaultExpanded) {
          this.isExpanded = this.inputValue.length > 0;
        }
      },
  
      debounceChangeInput: debounce(function (value) {
        this.$emit("changeInput", value);
      }, 500),
  
      handleInput() {
        this.debounceChangeInput(this.inputValue);
      },
    },
  };
  </script>
  
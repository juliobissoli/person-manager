<template>
  <div>
    Arquivo ({{ accept }})
    <label
      for="fileInputId"
      class="border-dashed border-4 flex flex-col items-center justify-center rounded-lg w-full text-center p-8"
    >
      Selecione ou arraste o arquivo aqui!
      <input
        id="fileInputId"
        name="fileInputId"
        type="file"
        class="invisible h-0"
        :accept="accept"
        @change="getFile"
      />
    </label>
    <div
      v-show="file"
      class="flex mt-2 justify-between p-2 bg-secondary rounded-lg border"
    >
      {{ file?.name }}
      <button @click="file = undefined">
        <i class="icon icon-delete-outlined h-5 w-5 bg-red-500"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputFile",
  props: {
    accept: {
      type: String,
      default: ".zip,.rar,.7zip,.bin,.apk",
    },
  },
  data: () => ({
    file: undefined,
  }),
  methods: {
    getFile(data) {
      const value = data.target.files;
      if (value.length > 0) {
        this.file = value[0];
        this.$emit("change", this.file);
      }
    },
  },
};
</script>

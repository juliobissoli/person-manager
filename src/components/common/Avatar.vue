<template>
    <div class="w-full h-full p-[2px] bg-zinc-200" :class="`rounded-${rounded || 'lg'}`">
        <img class="w-full h-full object-cover" :class="`rounded-${rounded || 'lg'}`" :src="url" alt="" />
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
export default {
    name: "Avatar",
    props: {
        rounded: { default: "lg" },
        avatar_url: { type: String, default: "", required: false },
        imageID: { default: '', required: false },
    },
    data: () => ({
        localAvatar: "",
    }),
    created() {
        if (this.imageID) {
            this.getUrlAvatar(this.imageID);
        }
    },
    watch: {
        imageID: function (newVal) {
            if (newVal) {
                this.getUrlAvatar(newVal);
            }
        }
    },
    computed: {
        ...mapGetters("person", {avatarUrl: "personAvatarUrl"}),
        url() {
            return this.avatar_url ? this.avatar_url : this.avatarUrl(this.imageID)
        },

    },
    methods: {
        /**
         * ACTION: getUrlAvatar
         * MODULO: person
         * 
         * Esse método tem o obejtovop de criar um cache de imagens para o avatar da pessoa
         * De forma que o avatar fique salvo no store e não precisando fazer uma requisição para o servidor
         */
    ...mapActions("person", ["getUrlAvatar"])
    }
};
</script>
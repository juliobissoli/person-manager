<script>
// import { ref } from "vue";
import InputFile from "../common/InputFile.vue";
import Modal from "../common/Modal.vue";
import Avatar from "../common/Avatar.vue";
import api from "../../service/api";
import { mapActions } from "vuex";

export default {
    name: 'ModalUploadImage',
    components: {
        InputFile,
        Modal,
        Avatar,
    },
    props: {
        personId: {
            required: true,
        },
        currentUrl: {
            type: String,
            default: null,
        }
    },
    data() {
        return {
            file: null,
            imageUrl: null,
            fileData: null,
            requestStatus: 'empty',
        }
    },
    methods: {
        ...mapActions('person', ['removeAvatar', 'getUrlAvatar']),

        handleSetFile(value) {
            this.file = value;
            const imageFile = new FormData();

            if (this.file) {
                let imageUrl = '';
                if (this.file instanceof Blob) {
                    imageFile.append("foto", this.file, this.file.name);
                    this.fileData = imageFile;
                    const url = URL.createObjectURL(this.file);
                    this.imageUrl = url.toString();
                }
            }
        },

        handleSave() {

            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            };

            this.requestStatus = 'loading';
            api.post(`/foto/upload/${this.personId}`, this.fileData, config).then(
                response => {
                    this.removeAvatar(this.personId);
                    this.getUrlAvatar(this.personId);
                    this.$emit('save');
                    this.requestStatus = 'success';
                },
                error => {
                    this.requestStatus = 'error';
                });
        }
    }

}

</script>

<template>
    <Modal>
        <template v-slot:header>
            Alterar avatar
        </template>
        <div class="mb-16 flex flex-col items-center">
            <div class="w-60 h-60">
                <Avatar rounded="full" :avatar_url="imageUrl || currentUrl" />
            </div>
        </div>
        <InputFile accept="img, png, jpg, jpeg, webp" @change="handleSetFile" />

        <template v-slot:footer>
            <div class="w-full flex justify-between">
                <button class="border-transparent btn-danger">Cancelar</button>
                <button :disabled="!file" @click="handleSave" class=" btn">Salvar</button>
            </div>
        </template>
    </Modal>

</template>
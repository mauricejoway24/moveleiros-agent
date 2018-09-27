<template>
  <div class="upload-icon" @click="openFileDialog">
    <cloud-upload 
      class="icon" 
      :title="'Upload de arquivos'">
    </cloud-upload>
  </div>
</template>

<script>
import CloudUpload from 'icons/cloud-upload.vue'
import Vue from 'vue'

export default {
  props: ['uploadfile'],

  components: {
    CloudUpload
  },

  methods: {
    openFileDialog () {
      Vue.notify.swal({
        title: 'Selecione o arquivo',
        input: 'file',
        inputAttributes: {
          'accept': 'image/jpeg,image/jpg,image/png,application/pdf,.promob,.zip',
          'aria-label': 'Envie seu arquivo'
        },
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true
      })
      .then(options => {
        if (options.value) {
          this.uploadfile(options.value)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/_vars'

.upload-icon
  padding 0 $default-padding
  display flex
  align-items center
  .icon
    fill: $gray-scale-secondary
    cursor pointer
</style>

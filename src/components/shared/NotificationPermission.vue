<template>
  <div class="flash-message error" v-if="!showMessage">
    As notificações estão desativadas. Ative-as em seu navegador para receber novos contatos de clientes.
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { PERMISSION } from '@/store'

export default {
  computed: {
    ...mapGetters({
      showMessage: PERMISSION
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/_vars'

.flash-message
  padding $default-padding
  align-items center
  display flex
  color $white
  justify-content center

.error
  background $danger-color

.button
  margin-left $default-padding
</style>

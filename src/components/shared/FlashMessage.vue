<template>
  <div class="flash-message" v-bind:class="flashType" v-if="showMessage">
    {{flashMessage}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      flashMessage: 'flashMessage',
      showMessage: 'showFlashMessage',
      flashType: 'flashType'
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

.warn
  background $error-color

.success
  background $success-color
</style>

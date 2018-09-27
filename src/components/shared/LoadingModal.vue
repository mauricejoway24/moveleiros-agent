<template>
  <div class="loading vbox">
      <p>{{message}}</p>
      <p><loading class="loading-icon"></loading></p>
    </div>
</template>

<script>
import Loading from 'icons/loading.vue'

export default {
  components: { Loading },

  props: {
    message: {
      type: String,
      default: 'Aguarde, por favor.'
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '../styles/_vars.styl'

.loading
  position absolute
  display flex
  align-items center
  justify-content center
  top 0
  bottom 0
  left 0
  right 0
  background rgba(255, 255, 255, 0.95)
  z-index 1000
  font-family Arial

  p
    margin-top 5px

  .loading-icon
    fill $gray-scale-secondary
    animation rotating 1s linear infinite
    margin-top 10px

@keyframes rotating
  from
    transform rotate(0deg)

  to
    transform rotate(360deg)
</style>

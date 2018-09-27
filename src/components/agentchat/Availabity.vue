<template>
  <span class="availabity">
    <span 
      class="status-icon"
      v-bind:class="status"
      >
    </span>

    <span>{{ content }}</span>
  </span>
</template>

<script>
export default {
  props: ['status', 'content']
}
</script>

<style lang="stylus" scoped>
@import '../styles/_vars'

.availabity
  display flex
  align-items center

  .status-icon
    width 10px
    height 10px
    display block
    margin-right 5px
    border-radius 50%

  .available
    background $available-color

  .offline
    background $offline-color

  .away
    background $away-color
</style>


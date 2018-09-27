<template>
  <span v-if="count > 0" class="count">{{count}}</span>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/_vars'

.count
  background $toolbar-color
  padding 5px 10px
  font-size $default-font-size - 4
  border-radius 10px
</style>

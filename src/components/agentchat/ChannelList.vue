<template>
  <div class="channel">
    <p>Canais</p>
    <ul class="list">
      <li># Novidades</li>
    </ul>
  </div>
</template>

<style lang="stylus" scoped>
@import '../styles/_vars'

.channel
  margin-top 10px
  flex 1

  p
    text-transform uppercase
    padding $default-padding

  .list
    margin-top 5px

    li
      cursor pointer
      padding 10px $default-padding
      display flex
      align-items center
      transition $default-duration

      &.active
        background darken($inverse-color, 5)

      &:hover
        background darken($inverse-color, 5)
        transition $default-duration
</style>

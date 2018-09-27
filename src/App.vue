<template>
  <div id="app" class="vbox">
    <router-view/>
  </div>
</template>

<script>
import { UiButton } from 'keen-ui'

export default {
  name: 'app',
  components: { UiButton }
}
</script>

<style lang="stylus">
@import "./components/styles/_reset.styl"
@import "./components/styles/_fonts.styl"
@import "./components/styles/_vars.styl"

html, body, #app
  width 100%
  height 100%
  margin 0
  overflow hidden
  
body
  font-family $font-family-regular, Helvetica, Arial, sans-serif
  font-size $default-font-size

#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  background-color #fff
  overflow-y auto

.vbox
  display flex
  flex-direction column

.first-letter-capitalize
  text-transform capitalize

@media (min-width: 768px) and (min-height: 600px)
  #app
    justify-content center

@media (max-width: 320px)
  #app
    overflow-x auto
</style>

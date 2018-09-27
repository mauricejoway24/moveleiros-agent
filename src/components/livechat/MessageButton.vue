<template>
  <div class="button-root" @click="buttonClick">
    <!-- <svg>
      <image xlink:href="/static/img/paper-plane-filled.svg" class="send-button"/>
    </svg> -->
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	  viewBox="0 0 486.736 486.736" style="enable-background:new 0 0 486.736 486.736; fill: currentColor;" class="hack-send-button" xml:space="preserve">
      <g>
        <path d="M481.883,61.238l-474.3,171.4c-8.8,3.2-10.3,15-2.6,20.2l70.9,48.4l321.8-169.7l-272.4,203.4v82.4c0,5.6,6.3,9,11,5.9
          l60-39.8l59.1,40.3c5.4,3.7,12.8,2.1,16.3-3.5l214.5-353.7C487.983,63.638,485.083,60.038,481.883,61.238z"/>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: ['sendmessage'],
  methods: {
    buttonClick (e) {
      e.preventDefault()

      this.sendmessage()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/_vars'

.button-root
  padding 0 $default-padding
  font-size 1em
  color $primary-color
  display flex
  align-items center
  background $white
  cursor pointer
  transition-duration $default-duration
  user-select none

  svg,
  .send-button
    width $send-button-size
    height $send-button-size
    transition-duration $default-duration
    color $gray-scale-secondary

    &:hover
      color darken($gray-scale-secondary, 5)
</style>

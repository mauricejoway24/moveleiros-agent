<template>
  <span class="button-margin">
    <ui-button
      v-if="type === 'button'"
      raised
      color="default" 
      :size="'normal'" 
      type="primary"
      @click="onActionClick"
      >
      {{text}}
    </ui-button>
    <div 
      v-else-if="type === 'file'"
      class="file">
      <a class="file-content vbox" :href="value" @click="openFile" target="_blank" :download="text">
        <file-cloud class="icon" :title="text"></file-cloud>
        <span :aria-label="text">{{text}}</span>
      </a>
    </div>
  </span>
</template>

<script>
import { UiButton } from 'keen-ui'
import FileCloud from 'icons/file-cloud.vue'

export default {
  props: [
    'value',
    'text',
    'type'
  ],

  components: {
    UiButton,
    FileCloud
  },

  methods: {
    onActionClick () {
      this.$emit('click', this.value)
    },

    openFile () {
      if (window.cordova) {
        event.preventDefault()
        window.open(this.value, '_system')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/_vars'

.button-margin
  margin-right 5px

.file
  display flex
  cursor pointer

  span
    width 60px
    line-height 1.2em
    overflow hidden
    text-overflow ellipsis

.file-content
  display flex
  align-items center
  justify-content center
  background lighten($primary-color, 10)
  border-radius 5px
  padding 15px
  max-height 100px
  overflow hidden
  text-decoration none
  color $inverse-color

  .icon
    fill $gray-scale-secondary
</style>

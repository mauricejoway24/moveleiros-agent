<template>
  <div class="root">
    <div ref="messagebox" class="message-box" v-chat-scroll="{always: true}">
      <ul>
        <li v-bind:key="message.id" 
          v-for="message in messages" 
          class="message vbox" 
          v-bind:class="{ 'pull-right': message.livechatUserId === currentUserId }">

          <span class="message-title"><span class="username">{{ message.userName }}</span><span class="sent-at">{{ message.sentAt | moment('HH:mm') }}</span></span>
          <span class="message-content">{{ message.content }}</span>
          <span class="message-ui">
            <dyn-element v-for="(element, index) in message.elements" 
              :key="index" 
              :value="element.value"
              :text="element.text"
              :type="element.elementType"
              @click="sendButtonAction">
            </dyn-element>
          </span>
        </li>
      </ul>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { ALL_MESSAGES, GET_USER_ID, SEND_BUFFER_MESSAGE } from '@/store'
import { mapGetters } from 'vuex'
import DynElement from './DynElement'

export default {
  mounted () {
    this.$parent.$on('updateChatListChild', () => {
      setTimeout(() => {
        let mbox = this.$refs.messagebox
        if (mbox) mbox.scrollTop = mbox.scrollHeight
      }, 500)
    })
  },
  computed: {
    ...mapGetters({
      messages: ALL_MESSAGES,
      currentUserId: GET_USER_ID
    })
  },
  components: {
    DynElement
  },
  methods: {
    sendButtonAction (message) {
      this.$store.commit(SEND_BUFFER_MESSAGE, {
        message
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/_vars'

.root
  flex 1
  display flex
  overflow-y auto

.message-box
  flex 1
  padding $default-padding
  overflow-y auto

  &::-webkit-scrollbar
    width .5em
    background lighten($primary-color, 30)

    &-track
      box-shadow inset 0 0 2px darken($primary-color, 10)
    
    &-thumb
      background darken($primary-color, 20)

  .message
    padding 10px 0
    display flex

  .username
    font-weight 600
    margin-right 10px

  .sent-at
    font-weight 400
    font-size .6em
    color $gray-scale

  .message-title
    display flex
    align-items center

  .message-content
    margin-top 5px
    padding-right 10%

  .pull-right
    align-items flex-end

    .username
      margin-left 10px
      margin-right 0

    .message-title
      flex-direction row-reverse

    .message-content
      padding-right 0
      padding-left 10%
      text-align right

  .message-ui
    margin-top 8px
</style>

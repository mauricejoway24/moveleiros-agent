<template>
  <div class="main">
      <div id="menu" class="left-main vbox">
        <menu-root></menu-root>
      </div>

      <div id="panel" class="right-main vbox">
        <div class="overlay" @click="leftNavHandler"></div>
        <notification-permission></notification-permission>
        <flash-message></flash-message>

        <header-toolbar
          :inverse-color="true"
          @hamburgerTriggered="leftNavHandler">
          <span v-if="currentChannel !== {}">{{currentChannel.name}}
            <span v-if="$store.state.isTyping" class="istyping"> está digitando</span>
          </span>
        </header-toolbar>

        <message-box v-if="channels.length > 0">
          <right-toolbar></right-toolbar>
        </message-box>
        <message-input @updatemessagebox="updateChatList"
          v-if="channels.length > 0">
        </message-input>

        <div v-if="channels.length == 0" class="no-chat">
          Sem nenhuma conversa ativa ;)
        </div>
      </div>

  </div>
</template>

<script>
import MessageBox from '@/components/livechat/MessageBox'
import MessageInput from '@/components/livechat/MessageInput'
import HeaderToolbar from '@/components/livechat/HeaderToolbar'
import MenuRoot from '@/components/agentchat/MenuRoot'
import FlashMessage from '@/components/shared/FlashMessage'
import RightToolbar from '@/components/agentchat/RightToolbar'
import NotificationPermission from '@/components/shared/NotificationPermission'
import { START_CONNECTION, ACTIVE_CHANNELS, ACTIVE_CHANNEL } from '@/store'
import { mapGetters } from 'vuex'

export default {
  components: {
    MessageBox,
    MessageInput,
    HeaderToolbar,
    MenuRoot,
    FlashMessage,
    NotificationPermission,
    RightToolbar
  },
  mounted () {
    this.$nextTick(() => {
      this.$store.commit(START_CONNECTION, true)
    })
  },
  computed: {
    ...mapGetters({
      channels: ACTIVE_CHANNELS,
      currentChannel: ACTIVE_CHANNEL
    })
  },
  methods: {
    leftNavHandler () {
      const menu = document.getElementById('menu')
      const panel = document.querySelector('.right-main')
      if (menu.classList.contains('opened')) {
        menu.classList.remove('opened')
        panel.classList.remove('opened')
        panel.classList.remove('menu-open')
      } else {
        menu.classList.add('opened')
        panel.classList.add('opened')
        panel.classList.add('menu-open')
      }
    },

    updateChatList () {
      this.$emit('updateChatListChild')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/_vars'

.main
  flex 1
  display flex
  min-height 300px
  > div // Slideout hack
    display flex
    flex 1

.istyping
  color $gray-scale

.no-chat
  flex 1
  display flex
  padding $default-padding
  font-size 20px
  justify-content center
  align-items center

.left-main
  max-width 300px

.overlay
  display none

.right-main.menu-open
  position relative

  .overlay
    display block
    cursor pointer
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    background transparent

@media screen and (max-width: $mobile)
  .main
    overflow hidden

  .left-main
    margin-left -300px
  
  .left-main
    backface-visibility hidden
    perspective 1000
    transform translateX(-300px)
    transition transform $default-duration

  .opened
      backface-visibility hidden
      perspective 1000
      transform translateX(300px)
      transition transform $default-duration

@media screen and (min-width: $mobile)
  .btn-hamburger
    display none

@media (min-width: 1200px)
  .main
    max-width 1200px
    width 100%
    max-height 800px
    align-self center
    justify-self center
    box-shadow 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
</style>

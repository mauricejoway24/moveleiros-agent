<template>
  <div class="conversation">
    <p>Conversas</p>
    <ul class="list">
      <li v-if="channels.length === 0">Sem contatos</li>
      <li v-bind:key="channel.id" 
        v-for="channel in channels"
        @click="channelClick(channel)"
        :class="{ 'active': currentChannel === channel.id }">
        <availabity :content="channel.name" :status="getStatus(channel.hasOnlineUsers)" class="full"></availabity>
        <message-count :count="messageCountOnChannel(channel.id)"></message-count>
      </li>
    </ul>
  </div>
</template>

<script>
import Availabity from '@/components/agentchat/Availabity'
import { ACTIVE_CHANNELS, CURRENT_CHANNEL_ID, CHANGE_CHANNEL, ALERT_ON_CHANNEL } from '@/store'
import { mapGetters } from 'vuex'
import MessageCount from '@/components/agentchat/MessageCount'

export default {
  components: { Availabity, MessageCount },

  methods: {
    getStatus (currentStatus) {
      return currentStatus ? 'available' : 'offline'
    },

    channelClick (channel) {
      this.$store.commit(CHANGE_CHANNEL, channel)
    },

    messageCountOnChannel (channelId) {
      return this.alertOnChannels
        .filter(id => id === channelId)
        .length
    }
  },

  computed: {
    ...mapGetters({
      channels: ACTIVE_CHANNELS,
      currentChannel: CURRENT_CHANNEL_ID,
      alertOnChannels: ALERT_ON_CHANNEL
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/_vars'

.conversation
  margin-top 20px
  overflow-y auto

  p
    text-transform uppercase
    padding $default-padding

  .list
    margin-top 5px

    .status
      width 10px
      height 10px
      display block
      margin-right 5px
      border-radius 50%

    .available
      background $available-color

    .offline
      background $offline-color

    li
      cursor pointer
      padding 10px $default-padding
      display flex
      align-items center
      transition $default-duration
      min-height 25px

      &.active
        background darken($inverse-color, 5)

      &:hover
        background darken($inverse-color, 5)
        transition $default-duration

.full
  flex 1
</style>

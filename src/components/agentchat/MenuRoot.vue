<template>
  <nav class="vbox">
    <profile></profile>
    <conversation-list></conversation-list>
    <channel-list></channel-list>
    <footer-logo></footer-logo>
  </nav>
</template>

<script>
import Profile from '@/components/agentchat/Profile'
import ConversationList from '@/components/agentchat/ConversationList'
import FooterLogo from '@/components/agentchat/FooterLogo'
import ChannelList from '@/components/agentchat/ChannelList'

export default {
  components: { Profile, ConversationList, FooterLogo, ChannelList }
}
</script>

<style lang="stylus" scoped>
@import '../styles/_vars'

nav
  background $inverse-color
  flex 1
  display flex
  color $white
  min-width $min-nav-width
</style>

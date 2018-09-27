<template>
  <ul>
    <li @click="changeStatus('available')"><availabity :content="'Disponível'" :status="'available'"></availabity></li>
    <li @click="changeStatus('away')"><availabity :content="'Ausente'" :status="'away'"></availabity></li>
    <li @click="changeStatus('offline')"><availabity :content="'Indisponível'" :status="'offline'"></availabity></li>
    <li class="no-hover"><div class="divider"></div></li>
    <li class="hbox" @click="signout"><icon name="sign-out" label="Sair"></icon> <span>Sair</span></li>
  </ul>
</template>

<script>
import 'vue-awesome/icons/sign-out'
import Availabity from '@/components/agentchat/Availabity'
import { SIGN_OUT, CHANGE_STATUS } from '@/store'

export default {
  components: { Availabity },

  methods: {
    signout () {
      this.$store.commit(SIGN_OUT)
    },

    changeStatus (status) {
      this.$store.commit(CHANGE_STATUS, status)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/_vars'

ul
  padding 10px 5px

  li
    padding 7px $default-padding
    cursor pointer
    transition $default-duration

    &.no-hover:hover
      background transparent
      cursor default

    .divider
      cursor default
      border 0
      height 1px
      background $primary-color
      margin 6px 0

    &:hover
      background lighten($primary-color, 10)
      transition $default-duration

    &.hbox
      display flex
      align-items center

      span
        margin-left 1px
</style>

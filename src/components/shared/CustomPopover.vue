<template>
  <div class="custom-popover-wrapper">
    <div :class="`${side} custom-popover`">
      <ul class="icon-list">
        <li class="list-item" @click="openUserDetails">
          <user-details-icon
            :title="'Detalhes do usuário'" />
          Informações do Usuário
        </li>
        <li class="list-item" @click="endChat">
          <close-circle-icon
            :title="'Encerrar atendimento'" />
          Encerrar atendimento
        </li>
      </ul>
    </div>
    <div class="overlay" @click="$emit('close')"></div>
  </div>
</template>

<script>
import UserDetailsIcon from 'icons/account-card-details.vue'
import CloseCircleIcon from 'icons/close-circle-outline.vue'
import { GET_CUSTOMER_PROFILE, END_CHAT } from '@/store'

export default {
  name: 'custom-popover',
  components: {
    UserDetailsIcon,
    CloseCircleIcon
  },
  props: {
    side: { type: String, default: 'right' },
    opened: { type: Boolean, default: false }
  },
  methods: {
    openUserDetails () {
      this.$store.commit(GET_CUSTOMER_PROFILE)
    },

    endChat () {
      this.$store.commit(END_CHAT)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/_vars'

.custom-popover
  position absolute
  right 10px
  top 50px
  width 50vw
  background-color $white
  border 1px solid $primary-color
  border-radius 5px
  text-align center
  padding-bottom $default-padding
  z-index 99

.custom-popover-wrapper
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  
.overlay
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  opacity 1
  background-color transparent
  width 100%
  height 100%
  z-index 0 !important

.icon-list
  fill $gray-scale-secondary
  text-align center
  padding $default-padding

.list-item
  padding 10px 0
  

</style>

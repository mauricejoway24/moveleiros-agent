<template>
  <div class="toolbar-container" v-popover:foo2>
    <span @click="openUserDetails" v-tooltip.left="'Detalhes do usuário'">
      <user-details-icon
        class="icon"/>
    </span>
    <span @click="editUserDetails" v-tooltip.left="'Editar usuário'">
      <account-edit
        class="icon siblings"/>
    </span>
    <span @click="endChat" v-tooltip.left="'Encerrar atendimento'">
      <close-circle-icon
        class="icon siblings"/>
    </span>
    <span @click="sendCustomerToWebhook" v-tooltip.left="'Enviar cliente para SN'">
      <account-plus-icon
        class="icon siblings"/>
    </span>
  </div>
</template>

<script>
import UserDetailsIcon from 'icons/account-card-details.vue'
import CloseCircleIcon from 'icons/close-circle-outline.vue'
import AccountPlusIcon from 'icons/account-plus'
import AccountEdit from 'icons/account-edit'
import { GET_CUSTOMER_PROFILE, END_CHAT, SEND_CUSTOMER_INTEGRATION, EDIT_USER_INFO } from '@/store'

export default {
  components: {
    UserDetailsIcon,
    CloseCircleIcon,
    AccountPlusIcon,
    AccountEdit
  },

  methods: {
    openUserDetails () {
      this.$store.commit(GET_CUSTOMER_PROFILE)
    },

    endChat () {
      this.$store.commit(END_CHAT)
    },

    sendCustomerToWebhook () {
      this.$store.commit(SEND_CUSTOMER_INTEGRATION)
    },

    editUserDetails () {
      this.$store.commit(EDIT_USER_INFO)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/_vars'

.toolbar-container
  padding $default-padding
  border-left 1px solid $primary-color

  span
    display block

  .icon
    fill $gray-scale-secondary
    cursor pointer
  
  .icon.siblings
    margin-top $default-padding

@media screen and (max-width $mobile)
  .toolbar-container
    display none

</style>

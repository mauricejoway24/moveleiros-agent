<template>
  <div class="main vbox">
    <div class="center-box vbox">
      <ui-alert @dismiss="showFatalError = false" type="error" v-show="showFatalError">
        Usuário ou senha incorreto(s), tente novamente.
      </ui-alert>

      <div class="logo">
        <img src="static/img/logo_stretch.svg" alt="Moveleiros Logo">
      </div>

      <ui-textbox
        ref="emailText"
        label="Email*" 
        placeholder="meuemail@email.com.br" 
        :invalid="!valid && !emailValid && this.email.length === 0"
        error="O e-mail é obrigatório"
        v-model="email">
      </ui-textbox>

      <ui-textbox
        label="Senha*"
        placeholder="Digite sua senha aqui"
        type="password"
        @keyup.enter="sendInformation"
        :invalid="!valid && !passwordValid && this.password.length === 0"
        error="A senha é obrigatória"
        v-model="password">
      </ui-textbox>

      <ui-button
        color="primary" 
        :loading="loading" 
        :size="'normal'" 
        type="primary"
        @click="sendInformation"
        >
          Acessar
      </ui-button>
    </div>
  </div>
</template>

<script>
import { UiTextbox, UiButton, UiAlert } from 'keen-ui'
import axios from 'axios'
import config from '@/../config'
import { SET_USER_DATA } from '@/store'

export default {
  components: { UiTextbox, UiButton, UiAlert },

  data () {
    return {
      loading: false,
      valid: true,
      email: '',
      password: '',
      showFatalError: false,
      emailValid: true,
      passwordValid: true
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.$refs.emailText.$el.focus()
    })
  },

  methods: {
    sendInformation () {
      if (!this.validate()) return

      this.loading = true

      const email = this.email
      const password = this.password

      let information = {
        email,
        password,
        device: 'desktop',
        version: '1.0.1'
      }

      axios
        .post(`${config.getConfig('BASE_HUB_URL')}livechat/login`, information)
        .then(result => {
          this.$store.commit(SET_USER_DATA, result.data)
          this.$router.push('agent')
        })
        .catch(_ => {
          this.showFatalError = true
          this.loading = false
        })
    },

    validate () {
      let valid = true

      if (this.email.length === 0) {
        this.emailValid = false
        valid = false
      }

      if (this.password.length === 0) {
        this.passwordValid = false
        valid = false
      }

      this.valid = valid
      return valid
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/_vars'

.main
  display flex
  flex 1
  align-items center
  justify-content center

  .center-box
    width 400px
    max-height 400px
    display flex
    flex 1
    padding $default-padding*2
    justify-content center

    @media screen and (max-width: $mobile)
      width 250px
      min-width 250px

  .logo
    display flex
    align-items center
    justify-content center
    margin-bottom 20px

    img
      width 100%
</style>

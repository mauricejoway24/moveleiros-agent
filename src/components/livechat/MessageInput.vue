<template>
  <div class="message-input">
    <input-text
      ref="inputtext"
      :content="content" 
      :sendmessage="sendMessage"
      :bufferMessage="bufferMessage">
    </input-text>
    <file-input-button :uploadfile="uploadFile" v-if="content.length == 0"></file-input-button>
    <message-button :sendmessage="sendButtonClick" v-if="content.length > 0"></message-button>
  </div>
</template>

<script>
import InputText from './InputText'
import MessageButton from './MessageButton'
import FileInputButton from './FileInputButton'
import { SEND_MESSAGE, SEND_BUFFER_MESSAGE, UPLOAD_FILE } from '@/store'

export default {
  components: {
    InputText,
    MessageButton,
    FileInputButton
  },

  data () {
    return {
      content: ''
    }
  },

  mounted () {
    this.content = this.$store.state.bufferMessage
    this.$nextTick(() => {
      this.$refs.inputtext.$el.addEventListener('focus', () => {
        this.$emit('updatemessagebox')
      })
    })
  },

  methods: {
    bufferMessage (e) {
      this.content = e.target.value

      this.$store.commit(SEND_BUFFER_MESSAGE, this.content)
    },

    sendMessage () {
      this.$store.commit(SEND_MESSAGE)

      this.content = ''

      this.$nextTick(() => {
        this.$refs.inputtext.$el.focus()
      })
    },

    sendButtonClick () {
      let e = document.createEvent('Event')
      e.initEvent('keypress')
      e.which = e.keyCode = 13
      this.$refs.inputtext.$el.dispatchEvent(e)
    },

    uploadFile (file) {
      this.$store.commit(UPLOAD_FILE, file)
    }
  }
}
</script>

<style lang="stylus" scoped>
.message-input
  display flex
  background white
  box-shadow 0 0 30px 0 rgba(150,165,190,.24)
  border-top 1px solid #eee
</style>

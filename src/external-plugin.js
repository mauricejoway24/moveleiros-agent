class MovLivechatPlugin {
  constructor () {
    this.init()
    this.bindVars()
    this.bindEvents()
    this.bindParentObj()
    if (this.shouldCreateIFrame && !window.location.href.includes('dicasaitalinea.com.br')) {
      this.createIframe({
        target: this.defaultTarget,
        url: this.iframeUrl || '',
        border: 'none',
        width: this.defaultWidth || '100%',
        height: this.defaultHeight || '100%',
        borderRadius: '0',
        destroyAfterClose: false
      }, this)
    }
    this._dispatchLoad()
  }

  init () {
    this.onLoadCallback = null
    this.MoveleirosChat = window.MoveleirosChat || {}
    this._defaults = {}
    this.currentIframe = null
  }

  bindVars () {
    let ctx = this
    this.shouldCreateIFrame = this.MoveleirosChat.ci
    this.defaultTarget = this.MoveleirosChat.dt
    this.defaultWidth = this.MoveleirosChat.w
    this.defaultHeight = this.MoveleirosChat.h
    this.iframeUrl = this.MoveleirosChat.iframeUrl
    this.MoveleirosChat.createIframe = params => { 
      ctx.createIframe(params, ctx)
    }
    this.MoveleirosChat.setDefaultValues = d => {
      ctx.setDefaultValues(d)
    }
    this.MoveleirosChat.closeChat = _ => {
      ctx._closeChat(ctx)
    }
    this.MoveleirosChat.isOpen = _ => ctx.currentIframe !== null
    this.sendDefaults = this._sendDefaults
  }

  bindEvents () {
    window.addEventListener('message', (e) => {
      this._handlePluginMessage(e, this)
    })

    this.onLoadCallback = this.MoveleirosChat.onChatLoad
    this.onCloseCallback = this.MoveleirosChat.onChatClose
  }

  bindParentObj () {
    window.MoveleirosChat = this.MoveleirosChat
  }

  createIframe (params, ctx) {
    if (this.shouldCreateIFrame || params) {
      let i = document.createElement('iframe')
      let target = params.target ? document.body.querySelector(params.target) : document.body

      i.src = params.url || this.iframeUrl || ''
      i.style.border = params.border || 'none'
      i.style.width = params.width || '100%'
      i.style.height = params.height || '100%'
      i.style.borderRadius = params.borderRadius || '0'
      i.addEventListener('load', function () {
        ctx.currentIframe = this
        ctx.destroyAfterClose = params.destroyAfterClose || false
        ctx._sendDefaults(ctx) 
      })

      // Clear internal html and append the element
      target.innerHTML = ''
      target.appendChild(i)

      if (target.offsetWidth < 450 && document.body.offsetWidth > 600) {
        target.style.width = '450px'
        target.style.minWidth = '450px'
      }

      if (target.offsetHeight < 500 && document.body.offsetHeight > 700) {
        target.style.height = '500px'
        target.style.minHeight = '500px'
      }
    }
  }

  setDefaultValues (defaults) {
    this._defaults = defaults || {}
  }

  _handlePluginMessage (e, ctx) {
    switch (e.data.event) {
      case 'onMoveleirosPluginLoad':
        ctx._onScriptLoad(ctx)
        break

      case 'onMoveleirosPluginClose':
        ctx._onChatClose(ctx)
        break
    
      default:
        break
    }
  }

  _onScriptLoad (ctx) {
    if (ctx.onLoadCallback) {
      ctx.onLoadCallback()
    }
  }

  _onChatClose (ctx) {
    if (ctx.onCloseCallback) {
      ctx.onCloseCallback()
      if (ctx.destroyAfterClose) {
        if (ctx.currentIframe) {
          ctx.currentIframe.remove()
          ctx.currentIframe = null
        }
      }
    }
  }

  _sendDefaults (ctx) {
    // Set defaults inside chat
    ctx
      .currentIframe
      .contentWindow
      .postMessage(
        { 
          event: '_onScriptLoad', 
          payload: ctx._defaults 
        }, 
        '*'
      )
  }

  _closeChat (ctx) {
    ctx._onChatClose(ctx)
  }

  _dispatchLoad () {
    if (this.MoveleirosChat.onScriptLoad) {
      this.MoveleirosChat.onScriptLoad()
    }
  }
}

window.addEventListener('load', _ => new MovLivechatPlugin())
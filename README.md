# moveleiros-chat-livechat

> Livechat Moveleiros

## Build Setup

### DOT NOT USE NPM

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Script documentation

### On client side:

All scripts should be called using ```MoveleirosChat``` object like

``` javascript
MoveleirosChat['methodName']
```

| Method | Description |
| ------ | ----------- |
| **onScriptLoad** | It dispatches when the client js is loaded. |
| **onChatLoad** | It dispatches when the entire chat is loaded. |
| **createIframe** | It creates an iframe and calls the chat script |
| **setDefaultValues** | It sets default values inside Mov's chat |

## On startup events inside the client side:

All properties should be passed throw the async client side script.

You should have something like this as startup script 

``` javascript
<script type="text/javascript">
  (function(w, d, s, u) {
    w.MoveleirosChat = {}; 
    /* [INCLUDE PROPERTIES HERE] */
    var h = d.getElementsByTagName(s)[0], j = d.createElement(s);
    j.async = true; j.src = "http://localhost:8080/external-plugin.js";
    h.parentNode.insertBefore(j, h);
  })(window, document, "script", "https://chat.moveleiros.com.br/#/livechat");
</script>
```

### Props

| Name | Description |
| ---- | ----------- |
| **w.MoveleirosChat.iframeUrl** | Base iframe script  |
| **w.MoveleirosChat.ci** | When true, it automatically opens a new iframe |

### iframUrl payload example
```javascript
{
  width: '100%',
  height: '100%',
  border: 'none',
  url: 'https://chat.moveleiros.com.br/#/livechat?storeId=YOUR_STORE_ID',
  target: '#someId'
}
```
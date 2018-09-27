const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const loadLivechatPlugin = () => {
  if (getParameterByName('standalone') != null) {
    let app = document.getElementById('app')
    let main = document.querySelector('.main')
    app.style.alignItems = 'center'
    app.style.justifyContent = 'center'
    app.style.background = '#f8f8f8'
    main.style.maxWidth = '500px'
    main.style.maxHeight = '600px'
    main.style.width = '100%'
    main.style.height = '100%'
    main.style.background = '#fff'
    main.style.borderRadius = '8px'
  }

  if (window.parent && window.parent != window.self) {
    window.parent.postMessage({ event: 'onMoveleirosPluginLoad' }, '*')
  }
}

window.addEventListener('load', loadLivechatPlugin)

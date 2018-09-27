import axios from 'axios'
import { toObject, toPlainString } from './message-template'

const sendSlackMessage = function (err, forceDev) {
  console.log('sending to slack', err)

  if ((err && err.code && err.code === 'messaging/notifications-blocked') ||
    (process.env.NODE_ENV === 'development' && !forceDev)) return

  const SLACK_WEBHOOK_URI = 'https://hooks.slack.com/services/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'
  const text = formatError(err)
  const channel = '#front-debug-logs'
  const payload = {
    'username': 'webhookbot',
    'icon_emoji': ':ghost:',
    channel,
    text
  }

  function formatError (payloadError) {
    if (Object.keys(payloadError).length === 0) return toPlainString(payloadError)

    const { request = {}, response = {}, config = {} } = payloadError

    const payload = {
      requestFormated: JSON.stringify(request, null, 2),
      responseFormated: JSON.stringify(response, null, 2),
      configFormated: JSON.stringify(config, null, 2)
    }

    return toObject(response, payload)
  }

  axios.post(SLACK_WEBHOOK_URI, payload, {
    transformRequest: [(data, headers) => {
      delete headers.common.contentType

      return JSON.stringify(data)
    }]
  })
  .catch((sendSlackLoggerError) =>
    console.error('[[ LOGGER ]] Error on logger sender', sendSlackLoggerError)
  )
}

export default sendSlackMessage

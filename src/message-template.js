export const toObject = (rawResponseError, errorFormated) =>
`*Some thing happened* => \`${rawResponseError.status} - ${rawResponseError.statusText}\`

*Config payload*
\`\`\`${errorFormated.configFormated}\`\`\`

*Response payload*
\`\`\`${errorFormated.responseFormated}\`\`\`

*Request payload*
\`\`\`${errorFormated.requestFormated}\`\`\``

export const toPlainString = (errorFormated) =>
`*Some thing happened* => \`${errorFormated}\``

const LOG_ENDPOINT = ''

export function raiseError(error) {
  return reportError(error)
}

export function withErrorLog(func) {
  return function () {
    try {
      func()
    } catch (error) {
      raiseError(error)
    }
  }
}

function encodeParams(params) {
  return Object.keys(params).map(key => `${key}=${encodeURIComponent(JSON.stringify(params[key]))}`).join('&')
}

function reportError(error) {
  return fetch(`${LOG_ENDPOINT}?${encodeParams({
    error: error && error.message || error,
    path: window.location.href,
  })}`)
}

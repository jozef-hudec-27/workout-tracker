export function request(url, method = 'GET', options = {}, successCb = function () {}, errorCb = function () {}) {
  fetch(url, { method: method, ...options })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Error')
      }
    })
    .then(successCb)
    .catch(errorCb)
}

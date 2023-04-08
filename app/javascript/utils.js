import CryptoJS from 'crypto-js'

export function request(url, method = 'GET', options = {}, successCb = function () {}, errorCb = function () {}) {
  fetch(url, { method: method, ...options })
    .then((response) => {
      return response.json().then((json) => {
        if (response.ok) {
          return json
        } else {
          throw json
        }
      })
    })
    .then((data) => successCb(data))
    .catch((error) => errorCb(error))
}

export function arrOfLength(n) {
  const arr = []

  for (let i = 0; i < n; i++) {
    arr.push(i)
  }

  return arr
}

export function findMaxSets(sessions) {
  return Math.max(...sessions.map((session) => session.series.length))
}

export function blockBtnSpam(event, callback) {
  event.target.disabled = true
  callback()
  event.target.disabled = false
}

// export function encrypt(string, key) {
//   return CryptoJS.AES.encrypt(string, key).toString()
// }

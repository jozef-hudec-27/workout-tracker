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

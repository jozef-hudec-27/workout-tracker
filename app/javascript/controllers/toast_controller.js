import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  connect() {
    setTimeout(() => {
      // Hide toast
      const a = this.element.animate([{ bottom: '30px' }, { bottom: '-100%' }], {
        duration: 1000,
        iterations: 1,
        easing: 'ease-in',
      })
      a.onfinish = () => {
        this.element.remove()
      }
    }, 4000)
  }
}

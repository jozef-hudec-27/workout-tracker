export default function useToast(message, className = '') {
  const toast = document.createElement('div')
  toast.classList.add('toast')
  if (className) toast.classList.add(className)

  const para = document.createElement('p')
  para.textContent = message
  toast.appendChild(para)

  document.body.appendChild(toast)

  setTimeout(() => {
    const a = toast.animate([{ bottom: '30px' }, { bottom: '-100%' }], {
      duration: 1000,
      iterations: 1,
      easing: 'ease-in',
    })
    a.onfinish = () => {
      toast.remove()
    }
  }, 3000)
}

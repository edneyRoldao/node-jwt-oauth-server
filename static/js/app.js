const form = document.querySelector('form')
const btn = document.querySelector('#submit-form')
const loadingEl = document.querySelector('#submit-form div')

form.addEventListener('submit', (e) => {
    btn.disabled = true
    loadingEl.classList.add('btn-submit-loading')
    setTimeout(() => console.log('delay'), 1000)
})

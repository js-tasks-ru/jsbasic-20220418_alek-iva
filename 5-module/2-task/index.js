function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let text = document.querySelector('#text');

  button.addEventListener('click', () => {
    if (text.hasAttribute('hidden')) text.removeAttribute('hidden')
    else text.setAttribute('hidden', true)
  })
}

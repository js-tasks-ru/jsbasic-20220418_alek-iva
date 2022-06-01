import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.element = createElement(`
          <div class="modal">
          <div class="modal__overlay"></div>
          <div class="modal__inner">
            <div class="modal__header">
              <button type="button" class="modal__close">
                <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>
              <h3 class="modal__title"></h3>
            </div>
            <div class="modal__body"></div>
          </div>
        </div>
    `)
    this.element.querySelector('.modal__close').addEventListener('click', () => {this.close()});
  }

  open = () => {
    document.body.classList.add('is-modal-open');
    document.body.append(this.element);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  close = () => {
    this.element.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  setBody = (body) => {
    this.element.querySelector('.modal__body').append(body);
  }

  setTitle = (title) => {
    this.element.querySelector('.modal__title').textContent = title;
  }

}

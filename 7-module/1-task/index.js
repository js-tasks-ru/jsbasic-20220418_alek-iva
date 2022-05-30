import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.createRibbon();
    this.buttonLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.buttonRight = this.elem.querySelector('.ribbon__arrow_right');
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.createListeners();
  }

  createRibbon = () => {
    let ribbonInnerHTML = ''
    this.categories.forEach(category => {
      ribbonInnerHTML += `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`
    });
    this.elem = createElement(`
       <div class="ribbon">
       <button class="ribbon__arrow ribbon__arrow_left">
         <img src="/assets/images/icons/angle-icon.svg" alt="icon">
       </button>
       <nav class="ribbon__inner">
         ${ribbonInnerHTML}
       </nav>
       <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
         <img src="/assets/images/icons/angle-icon.svg" alt="icon">
       </button>
     </div>
    `)
   }

   createListeners = () => {
    this.buttonLeft.addEventListener('click', () => {this.ribbonInner.scrollBy(-350, 0)});
    this.ribbonInner.addEventListener('scroll', () => {this.currentPosition()});
    this.buttonRight.addEventListener('click', () => {this.ribbonInner.scrollBy(350, 0)});
    const categories = Array.from(this.elem.querySelectorAll('.ribbon__item'));
    categories.forEach((category) => {
      category.addEventListener('click', (e) => {
        e.preventDefault();
        this.changeActiveCategory(e.target);
        this.onClick(e.target);
      })
    })
  }

  currentPosition = () => {
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (this.ribbonInner.scrollLeft == 0) {
      this.buttonLeft.classList.remove('ribbon__arrow_visible')
    } else {
      this.buttonLeft.classList.add('ribbon__arrow_visible')
    }

    if (scrollRight == 0 || scrollRight < 0) {
      this.buttonRight.classList.remove('ribbon__arrow_visible')
    } else {
      this.buttonRight.classList.add('ribbon__arrow_visible')
    }
  }

  changeActiveCategory = (target) => {
    let activeCategory = this.elem.querySelector('.ribbon__item_active');
    if ((activeCategory !== null)) {
      activeCategory.classList.remove('ribbon__item_active');
    }
    target.classList.add('ribbon__item_active');
  }

  onClick = (target) => {
    let id = target.dataset.id;
    let event = new CustomEvent("ribbon-select", {
      detail: id,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  };
}

import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let carouselContainer = document.querySelector('.container[data-carousel-holder]');
    let sliderContainer = document.querySelector('div[data-slider-holder]');
    let ribbonContainer = document.querySelector('div[data-ribbon-holder]');
    let cartIconContainer = document.querySelector('div[data-cart-icon-holder]');
    let productsGridContainer = document.querySelector('div[data-products-grid-holder]');

    this.carousel = new Carousel(slides);
    this.slider = new StepSlider({steps: 5, value: 3});
    this.ribbon = new RibbonMenu(categories);
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);

    carouselContainer.append(this.carousel.elem);
    ribbonContainer.append(this.ribbon.elem);
    sliderContainer.append(this.slider.elem);
    cartIconContainer.append(this.cartIcon.elem);

    let data = await fetch ('products.json').then((res) => res.json()).catch((err) => {console.log(err)});

    productsGridContainer.innerHTML = '';
    this.productsGrid = new ProductsGrid(data);
    productsGridContainer.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.slider.value,
      category: this.ribbon.value
    });
    
    document.body.addEventListener('product-add', (e) => {
      let currentProduct = data.find(product => product.id === e.detail);
      this.cart.addProduct(currentProduct);
    })

    this.slider.elem.addEventListener('slider-change', (e) => {
      this.productsGrid.updateFilter({maxSpiciness: e.detail});
    })

    this.ribbon.elem.addEventListener('ribbon-select', (e) => {
      this.productsGrid.updateFilter({category: e.detail});
    })

    document.getElementById('nuts-checkbox').addEventListener('change', () => {
      this.productsGrid.updateFilter({noNuts: document.getElementById('nuts-checkbox').checked})
    })

    document.getElementById('vegeterian-checkbox').addEventListener('change', () => {
      this.productsGrid.updateFilter({vegeterianOnly: document.getElementById('vegeterian-checkbox').checked
  })
})
}
}

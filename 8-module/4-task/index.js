import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let cartItem = {}
    if (product !== null && product !== undefined) {
      let position = this.cartItems.find((position) => position.product.id === product.id);
      if (position) {
        this.cartItems.forEach(item => {
          if (item.product.id === position.product.id) {
            item.count = item.count + 1;
            cartItem = item;
          }
        });
      }
      else {
        cartItem = {
          product: product,
          count: 1
        }
        this.cartItems.push(cartItem)
      }
    }
    this.onProductUpdate(this.cartItem);
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item => {
      if (item.product.id === productId) {
        item.count += amount;
        this.cartItem = item;
        if (item.count === 0) {
          this.cartItems = this.cartItems.filter((item) => item.product.id !== productId);
        }
      }
    }));

    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    return this.cartItems.length == 0;
  }

  getTotalCount() {
    let count = 0
    this.cartItems.forEach(item => {
      count += item.count
    })
    return count
  }

  getTotalPrice() {
    let price = 0
    this.cartItems.forEach(item => {
      price += item.count * item.product.price
    })
    return price
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal()
    this.modal.setTitle("Your order");
    let modalBody = document.createElement('div')
    
    this.cartItems.forEach(item => {
      modalBody.append(this.renderProduct(item.product, item.count))
    });
    modalBody.append(this.renderOrderForm())
    
    this.modal.setBody(modalBody);

    let minButtons = Array.from(modalBody.querySelectorAll('.cart-counter__button_minus'));
    let plusButtons = Array.from(modalBody.querySelectorAll('.cart-counter__button_plus'));

    minButtons.forEach((button)=> {
      button.addEventListener('click', (event) => {
        let productId = event.target.closest('div[data-product-id]').getAttribute('data-product-id');
        this.updateProductCount(productId, -1);
      });
    });

    plusButtons.forEach((button)=> {
      button.addEventListener('click', (event) => {
        let productId = event.target.closest('div[data-product-id]').getAttribute('data-product-id');
        this.updateProductCount(productId, 1);
      });
    });

    let form = modalBody.querySelector('.cart-form');
    form.addEventListener('submit', (event) => this.onSubmit(event));
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    let modalBody = document.body;
    let modalOpen = document.querySelector('.is-modal-open');
    if (modalOpen) {
      let cartItemsIsEmpty = this.isEmpty();
      if (!cartItemsIsEmpty) {
        if (cartItem.count > 0) {
          let productId = cartItem.product.id;
          let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
          let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
          let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
          productCount.innerHTML = cartItem.count;
          productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
          infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
        }
      } else {
        this.modal.close();
      }
    }
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    let submit = document.body.querySelector('.cart-buttons__button');
    submit.classList.add('is-loading');
    let form = document.querySelector('.cart-form');

    const post = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form),

    });
    post.then(() => {
      this.modal.setTitle('Success!');
      this.cartItems = [];
      this.modal.setBody(createElement(
        `<div class="modal__body-inner">
              <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
              </p>
           </div>`)
      );
    });
  };
  

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}


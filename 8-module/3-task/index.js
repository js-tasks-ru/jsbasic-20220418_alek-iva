export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}


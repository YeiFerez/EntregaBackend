import fs from 'fs';

class CartManager {
  constructor() {
    this.path = './data/carrito.json';
    this.carts = [];
  }

  async loadData() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf8');
      this.carts = JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar los datos de carrito:', error);
    }
  }

  async saveData() {
    try {
      const data = JSON.stringify(this.carts, null, 2);
      await fs.promises.writeFile(this.path, data, 'utf8');
      console.log('Datos de carrito guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar los datos de carrito:', error);
    }
  }

  getAllCarts() {
    return this.carts;
  }

  getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  createCart() {
    const newCart = { id: this.carts.length + 1, products: [] };
    this.carts.push(newCart);
    return newCart;
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCartById(cartId);
    if (cart) {
      const existingProduct = cart.products.find((product) => product.id === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ id: productId, quantity });
      }
      return cart;
    }
    return null;
  }
}

export default new CartManager();

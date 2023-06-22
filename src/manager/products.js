import fs from 'fs';

class ProductsManager {
  constructor() {
    this.path = './data/productos.json';
    this.products = [];
  }

  async loadData() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar los datos de productos:', error);
    }
  }

  async saveData() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, data, 'utf8');
      console.log('Datos de productos guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar los datos de productos:', error);
    }
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  addProduct(product) {
    const newProduct = { ...product, id: this.products.length + 1 };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      return this.products[index];
    }
    return null;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1);
      return deletedProduct[0];
    }
    return null;
  }
}

export default new ProductsManager();

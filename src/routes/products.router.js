import { Router } from "express";
import productsManager from '../manager/products.js';

const router = Router();

// Ruta para obtener todos los productos
router.get('/', (req, res) => {
  const products = productsManager.getAllProducts();
  res.json(products);
});

// Ruta para obtener un producto por su ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = productsManager.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
  const product = req.body;
  const newProduct = productsManager.addProduct(product);
  productsManager.saveData();
  res.status(201).json(newProduct);
});

// Ruta para actualizar un producto
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const product = productsManager.updateProduct(id, updatedProduct);
  if (product) {
    productsManager.saveData();
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Ruta para eliminar un producto
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const product = productsManager.deleteProduct(id);
  if (product) {
    productsManager.saveData();
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

export default router;

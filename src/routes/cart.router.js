import { Router } from "express";
import cartManager from '../manager/cart.js';

const router = Router();

// Ruta para obtener todos los carritos
router.get('/', (req, res) => {
  const carts = cartManager.getAllCarts();
  res.json(carts);
});

// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
  const cart = cartManager.createCart();
  cartManager.saveData();
  res.status(201).json(cart);
});

// Ruta para agregar un producto a un carrito
router.post('/:cartId/product/:productId', (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity } = req.body;
  const cart = cartManager.addProductToCart(cartId, productId, quantity);
  if (cart) {
    cartManager.saveData();
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

export default router;

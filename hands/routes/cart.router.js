import { Router } from 'express';
import fs from 'fs';

const router = Router();


let lastCartId = 0; // 


router.post('/', (req, res) => {
  const newCart = {
    id: ++lastCartId,
    products: [],
  };

  fs.readFile('carrito.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el carrito');
    } else {
      const carts = JSON.parse(data);
      carts.push(newCart);
      fs.writeFile('carrito.json', JSON.stringify(carts), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error al guardar el carrito');
        } else {
          res.json(newCart);
        }
      });
    }
  });
});




router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  fs.readFile('carrito.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el carrito');
    } else {
      const carts = JSON.parse(data);
      const cart = carts.find((c) => c.id === cartId);
      if (cart) {
        res.json(cart.products);
      } else {
        res.status(404).send('Carrito no encontrado');
      }
    }
  });
});


router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  fs.readFile('carrito.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el carrito');
    } else {
      let carts = JSON.parse(data);
      const cartIndex = carts.findIndex((c) => c.id === cartId);
      if (cartIndex !== -1) {
        const cart = carts[cartIndex];
        const existingProduct = cart.products.find((p) => p.product === productId);
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          cart.products.push({
            product: productId,
            quantity: 1,
          });
        }
        fs.writeFile('carrito.json', JSON.stringify(carts), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error al agregar el producto al carrito');
          } else {
            res.json(cart.products);
          }
        });
      } else {
        res.status(404).send('Carrito no encontrado');
      }
    }
  });
});

export default router;

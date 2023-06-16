import { Router } from 'express';
import fs from 'fs';

const router = Router();


router.get('/', (req, res) => {
  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer los productos');
    } else {
      const products = JSON.parse(data);
      res.json(products);
    }
  });
});


router.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer los productos');
    } else {
      const products = JSON.parse(data);
      const product = products.find((p) => p.id === productId);
      if (product) {
        res.json(product);
      } else {
        res.status(404).send('Producto no encontrado');
      }
    }
  });
});



let lastProductId = 0; // 

router.post('/', (req, res) => {
  const newProduct = {
    id: ++lastProductId,
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails,
  };

  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer los productos');
    } else {
      const products = JSON.parse(data);
      products.push(newProduct);
      fs.writeFile('productos.json', JSON.stringify(products), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error al guardar el producto');
        } else {
          res.json(newProduct);
        }
      });
    }
  });
});





router.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer los productos');
    } else {
      let products = JSON.parse(data);
      const productIndex = products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        const updatedProduct = {
          id: productId,
          title: req.body.title,
          description: req.body.description,
          code: req.body.code,
          price: req.body.price,
          status: req.body.status,
          stock: req.body.stock,
          category: req.body.category,
          thumbnails: req.body.thumbnails,
        };
        products[productIndex] = updatedProduct;
        fs.writeFile('productos.json', JSON.stringify(products), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error al actualizar el producto');
          } else {
            res.json(updatedProduct);
          }
        });
      } else {
        res.status(404).send('Producto no encontrado');
      }
    }
  });
});


router.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer los productos');
    } else {
      let products = JSON.parse(data);
      const productIndex = products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        const deletedProduct = products.splice(productIndex, 1)[0];
        fs.writeFile('productos.json', JSON.stringify(products), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error al eliminar el producto');
          } else {
            res.json(deletedProduct);
          }
        });
      } else {
        res.status(404).send('Producto no encontrado');
      }
    }
  });
});

export default router;

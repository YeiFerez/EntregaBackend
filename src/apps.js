import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/cart.router.js';
import __dirname from "./utils.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+'/data'))
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);



const port = 8080;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

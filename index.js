const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/products', require('./router/products'));
app.use('/categories', require('./router/categories'));
app.use('/orders', require('.router/orders'));

app.listen(PORT, () => console.log('Servidor levantado en el puerto ' + PORT));

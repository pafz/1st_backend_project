const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));
app.use('/categories', require('./routes/categories'));
app.use('/orders', require('./routes/orders'));

app.listen(PORT, () => console.log('Server up on port ' + PORT));
//TODO:!add every status in controllers
//TODO:check route is admin or user inside a router without permissions, extra
//TODO: tbl delivery add create routes etc

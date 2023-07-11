const express = require('express');
const { typeError } = require('./middleware/errors');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/categories', require('./routes/categories'));
app.use('/companies', require('./routes/companies'));
app.use('/deliveries', require('./routes/deliveries'));
app.use('/orders', require('./routes/orders'));
app.use('/products', require('./routes/products'));
app.use('/reviews', require('./routes/reviews'));
app.use('/users', require('./routes/users'));

app.use(typeError);

app.listen(PORT, () => console.log('Server up on port ' + PORT));

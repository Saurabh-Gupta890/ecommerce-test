const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let cart = {
    items: [],
    total: 0
};

app.post('/add-to-cart', (req, res) => {
    const { id, price, quantity } = req.body;
    const newItem = { id, price, quantity };
    cart.items.push(newItem);
    cart.total += price * quantity;
    res.json(cart);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

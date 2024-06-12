const request = require('supertest');
const express = require('express');

const app = express();
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

describe('POST /add-to-cart', () => {
    beforeEach(() => {
        cart = {
            items: [],
            total: 0
        };
    });

    it('should add item to cart and update total', async () => {
        const item = { id: 1, price: 100, quantity: 2 };
        
        const response = await request(app)
            .post('/add-to-cart')
            .send(item);
        
        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(1);
        expect(response.body.total).toBe(200);
    });

    it('should correctly update total with multiple items', async () => {
        const item1 = { id: 2, price: 50, quantity: 1 };
        const item2 = { id: 3, price: 30, quantity: 3 };
        
        await request(app)
            .post('/add-to-cart')
            .send(item1);
        const response = await request(app)
            .post('/add-to-cart')
            .send(item2);
        
        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(2);
        expect(response.body.total).toBe(140);
    });
});

const express = require('express')

const router = express.Router()

const Order = require('../models/orderModel')

router.post('/add-order', async (req, res) => {
    try {
        const { user, orderItems, shippingAddress, totalPrice } = req.body;

        const order = new Order({
            user,
            orderItems,
            shippingAddress,
            totalPrice
        });

        await order.save();

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get all orders
router.get('/orders', async (req, res) => {
    try {
        // Retrieve all orders from the database
        const orders = await Order.find().populate('user', 'username email').populate('orderItems.product', 'name');

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/payment', async(req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.total,
        currency: "usd",
      });

      res.status(201).send({
        clientSecret: paymentIntent.client_secret
      })
})

// router.get('/:id', async (req, res) => {
//     try {
//         const orderId = req.params.id;

//         const order = await Order.findById(orderId).populate('user', 'username email').populate('orderItems.product', 'name');

//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         res.status(200).json(order);
//     } catch (error) {
//         console.error('Error fetching order:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

module.exports = router;
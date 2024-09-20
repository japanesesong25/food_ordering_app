const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const Product = require('../models/productModel')


// Route to create a new cart or update existing cart
router.post('/new-cart', async (req, res) => {
    // try {
        const { user, items } = req.body;
        

        // Check if the user already has a cart
        let cart = await Cart.findOne({ user });

        // If the user doesn't have a cart, create a new one
        if (!cart) {
            cart = new Cart({
                user,
                items
            });
        } else {
               
             // If the user already has a cart, check each item from frontend against the cart items
             for (const frontendItem of items) {
                let found = false;
                // Check if the frontend item matches any item in the cart
                for (const cartItem of cart.items) {
                    if (cartItem.product.toString() === frontendItem.product.toString()) {
                        // If the item matches, increase its quantity and mark as found
                  //  console.log("sssss")

                        cartItem.amount += frontendItem.amount;
                        found = true;
                        break;
                    }
                    else {
                        cart.items.push(frontendItem);
                    }
                } 
                // if (!found) {
                //     cart.items.push(frontendItem);

                    
                
            }
        }

            // If the user already has a cart, check if the item already exists in the cart
            
           // const existingItemIndex = cart.items.findIndex(item => item.product === items.product[0]);
           // console.log(existingItemIndex, cart.items,items)   MEEEE


            // // If the item doesn't exist in the cart, add it
            // if (existingItemIndex === -1) {
            //     cart.items.push(items);
            // } else {
            //     // If the item exists in the cart, increment its quantity
            //     cart.items[existingItemIndex].amount += items.amount;
            // }
            // res.status(201).json({ message: 'Cart updated successfully', cart });
        

        // Save the cart to the database
        await cart.save();

        res.status(201).json({ message: 'Cart updated successfully', cart });
    // } 
    // catch (error) {
    //     console.error('Error updating cart:', error);
    //     res.status(500).json({ message: 'Internal server error', error });
    // }
});

// Route to get all carts
router.get('/all-carts', async (req, res) => {
    try {
        const id = req.query.user
        // Retrieve all carts from the database
        const carts = await Cart.findOne({user: id}).populate('user', 'username email');
        res.status(200).json(carts);
        // const carts = await Cart.findOne().populate('user', 'username email');
        // res.status(200).json(carts);

    } catch (error) {
        console.error('Error fetching carts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get a specific cart by ID
router.get('/:id', async (req, res) => {
    try {
        const cartId = req.params.id;

        // Retrieve the cart by ID from the database
        const cart = await Cart.findById(cartId).populate('user', 'username email');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('./', async (req, res)=>{

}
)

// Add more routes as needed (e.g., update cart, delete cart, etc.)

module.exports = router;
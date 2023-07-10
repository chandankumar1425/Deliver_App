const express = require('express');
const { OrderModel } = require("../model/order.model");
const OrderRouter = express.Router();


//to place the order
OrderRouter.post("/order", async (req, res) => {
    const { user, restaurant, items, deliveryAddress } = req.body;
    const total_price = items.reduce((price, items) => price + items.price * items.quantity, 0)
    try {
        const data = new OrderModel({
            user: user,
            restaurant: restaurant,
            items: items,
            total_price: total_price,
            deliveryAddress: deliveryAddress,
        });
        await data.save();
        return res.status(201).json({ "Ok": true, "msg": "Order Placed" });

    } catch (error) {
        return res.status(400).json({ "Ok": false, "msg": err.message });

    }

})
//to get all the order details
OrderRouter.get("/orders/:id", async (req, res) => {
    const id=req.params.id;
    try {
        const data = new OrderModel.findById({id});
        await data.save();
        return res.status(200).json({ "Ok": true,data});

    } catch (error) {
        return res.status(400).json({ "Ok": false, "msg": err.message });

    }
})

//to know order status
OrderRouter.patch("/orders/:id", async (req, res) => {
    const {status}=req.body;
    const id=req.params.id;
    try {
        const data = new OrderModel.findByIdAndUpdate(id,{$set: {status:status}});
        await data.save();
        return res.status(204).json({ "Ok": true,data});
    } catch (error) {
        return res.status(400).json({ "Ok": false, "msg": err.message });

    }
})
module.exports = { OrderRouter }
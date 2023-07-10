const express = require('express');
const { ResturantModel } = require("../model/resturant.model");
const ResturantRouter = express.Router();

//This endpoint should return the details of a specific restaurant identified by its ID.
ResturantRouter.get("/restaurants", async (req, res) => {
    try {
        const data = await ResturantModel.find();
        res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ "Ok": false, "msg": err.message });
    }
});

//This endpoint should return the details of a specific restaurant identified by its ID.
ResturantRouter.get("/restaurants/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await ResturantModel.findById(id);
        res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ "Ok": false, "msg": err.message });
    }
});

//This endpoint should return the menu of a specific restaurant identified by its ID.
ResturantRouter.get("/restaurants/:id/menu", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await ResturantModel.findById(id);
        res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ "Ok": false, "msg": err.message });
    }
});

//To add Resturant
ResturantRouter.post("/restaurants", async (req, res) => {
    try {
        const data = new ResturantModel(req.body);
        await data.save();
        return res.status(201).json({ "Ok": true, "msg": "Resturant Added Sucessfully" });

    } catch (error) {
        return res.status(400).json({ "Ok": false, "msg": err.message });

    }

})

//This endpoint should allow the user to add a new item to a specific restaurants menu identified by it id.
ResturantRouter.post("/restaurants/:id/menu", async (req, res) => {
    const id = req.params.id;
    const { name, description, price, image } = req.body
    try {
        const data = { name: name, description: description, price: price, image: image };
        let add = await ResturantModel.findByIdAndUpdate(id, { $push: { data: data } }, { new: true });
        return res.status(201).json({ "Ok": false, add });

    } catch (error) {
        return res.status(400).json({ "Ok": false, "msg": err.message });

    }

})

//This endpoint should allow the user to delete a particular menu item identified by its id from a specific restaurant.
ResturantRouter.delete("/restaurants/res_id/menu/menu_id", async (req, res) => {
    const res_id = req.params.res_id;
    const menu_id = req.params.menu_id;
    try {
        const data = await ResturantModel.findById(res_id);
        if(data){
            const deleted = await ResturantModel.findByIdAndDelete(menu_id);
        }
        return res.status(202).json({ "Ok": false, "msg":"Menu Deleted"});

    } catch (error) {
        return res.status(400).json({ "Ok": false, "msg": err.message });

    }

})
module.exports ={ResturantRouter}
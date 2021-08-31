const express = require("express")
const router = express.Router();
const auth = require("../../middleware/auth")

//Item Model
const Item = require("../../Models/item")
    // @route GET api/items
    // @desc GET All Items
    // @access Public
router.get("/", (req, res) => {
        Item.find().sort({ date: -1 })
            .then(items => res.json(items))
    })
    // @route POST api/items
    // @desc Create An Item
    // @access Private
router.post("/", auth, (req, res) => {
        const newItem = new Item({ name: req.body.name });
        newItem.save().then(items => res.json(items));
    })
    // @route Delete api/items/:id
    // @desc Delete An Item
    // @access Private
router.delete("/:id", auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            item.remove().then(() => res.json({ success: true }))
        })
        .catch(err => res.status(404).json({ success: false }))
})




module.exports = router
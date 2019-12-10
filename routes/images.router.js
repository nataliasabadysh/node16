const router = require("express").Router()

const { getImages } = require("../controllers/images")

/*
    @route http://localhost:3000  api/images/:imageName
    @desc Отримати картинку
    @access private
*/
router.get("/:imageName", getImages) // http://localhost:3000/images/cats.jpg

module.exports = router

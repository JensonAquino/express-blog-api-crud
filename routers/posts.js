const express = require("express")
const router = express.Router();
//const posts = require("../data")spostato su controller
//logiche implementate nel controller
const postController = require("../controllers/postController")
const checkPostExists = require("../middlewares/postsExists")
//index - operzione dove leggiamo tutti i dati = read
 router.get("/", postController.index);

//show - operzione di lettura dei dettagli di un solo elemento = read
//:id e una sintassi variabbile es: posts/2
router.get("/:id", checkPostExists, postController.show)

//create/store - operzione che crea un nuovo elemento nei dati
router.post("/", postController.create);

//update - operzione che crea un nuovo elemento nei dati(sovrascrive i dati)
router.put("/:id", checkPostExists, postController.update)
//modify
router.patch("/:id", checkPostExists, postController.modify)

//destroy 
router.delete("/:id", checkPostExists, postController.destroy)

module.exports = router
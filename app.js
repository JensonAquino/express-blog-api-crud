const express = require("express");
const app = express()
const port = 3003;
const postsRouter = require("./routers/posts")
//const posts = require("./data") importato nel router

//middlewere globale a livello globale
const handleError = require("./middlewares/handleError");

//includere il body-parser per leggere il req.body sempre prima del router
app.use(express.json());

app.use(express.static("public"))


//includo tutte le rotte dei post con prefisso posts
app.use("/posts", postsRouter)

app.get("/", (req, res) => {
    res.json({
        message: "Server del mio blog"
    })
});

//eseguito alla fine delle rotte perche deve essere esguito dopo
app.use(handleError)

app.listen(port, () => {
    console.log("listener on");
    
})
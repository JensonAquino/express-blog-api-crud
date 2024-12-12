const express = require("express");
const app = express()
const port = 3003;
const postsRouter = require("./routers/posts")
//const posts = require("./data") importato nel router

app.use(express.static("public"))

//includere il body-parser per leggere il req.body sempre prima del router
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Server del mio blog"
    })
});
//includo tutte le rotte dei post con prefisso posts
app.use("/posts", postsRouter)

app.listen(port, () => {
    console.log("listener on");
    
})
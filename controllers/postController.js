const posts = require("../data")

const index = (req, res) => {
    const queryString = req.query;
    let postInviato = posts
    if (queryString.tag !== undefined) {
        //eseguo filtro
        postInviato = posts.filter((curPost) => curPost.tags.includes(queryString.tag));
    }

    const result = {
        post: postInviato,
        totale: postInviato.length
    }



     res.json(result);
}

const show = (req, res) => {
    const postsID = parseInt(req.params.id);//richiesta per il n.ID
    const post = posts.find((curPost) => curPost.id === postsID);
    //se e error
    if (post === undefined) {
        res.statusCode = 404;
        res.json({
            error: true,
            message: "post non esistente"
        })
    } else {
        res.json(post)
    }

    // res.json("qui prelevo i dettagli di un singolo post " + "numero " + postsID)

}

const create = (req, res) => {  
    res.send("qui aggiungo un nuovo post")
}

const update = (req, res) => {
    const postsID = req.params.id;
    res.send("qui aggiorno tutti i dati di un post con id " + "numero " + postsID)
}

const modify = (req, res) => {
    const postsID = req.params.id;
    res.send("qui aggiorno solo alcuni dati di un post " + "numero " + postsID)
}

const destroy = (req, res) => {
    const postsID = parseInt(req.params.id);
    //trovo l'indice del post
    const postIndex = posts.findIndex((curPost) => curPost.id === postsID)
    //se non trovato, ti da valore -1
    if (postIndex === -1) {
        res.statusCode = 404;
        res.json({
            error: true,
            message: "post non esistente"
        })
    } else {
        posts.splice(postIndex, 1);
        res.sendStatus(204);
    }

    //res.send("qui cancello il post " + "numero " + postsID)

}

module.exports = {
    index,
    show,
    create,
    update,
    modify,
    destroy
};
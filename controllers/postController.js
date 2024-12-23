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
    console.log(req.body);
    
    const newPost = req.body;
    //calcolo id 
    newPost.id = posts[posts.length - 1].id + 1;
    console.log(newPost.id)
    
    //pusho loggetto nel array
    posts.push(newPost);
    console.log(posts);
    
    //restituiamo stato coretto e elemnto aggiunto
    res.status(201);
    res.json(newPost)
    //res.send("qui aggiungo un nuovo post")
}

const update = (req, res) => {
    const postsID = parseInt(req.params.id);
    const newData = req.body;
    //aggiungo la key id a newData
    newData.id = postsID;
    //trovo indice da trovare
    const indexUpdated = posts.findIndex((curPost) => curPost.id === postsID)
    console.log(indexUpdated);
    //gestione errore notFound
    if(indexUpdated === -1){
        res.statusCode = 404;
        res.json({
            error: true,
            message: "post non esistente"
        })
    } else {
        
        //sostitusci vecchio con nuovo elemento
        posts[indexUpdated] = newData;
        
        console.log(newData);
        
        res.json(newData)
    }
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
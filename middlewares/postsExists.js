const posts = require("../data");

const checkPostExists = (req, res, next) => {
    console.log("funge")
    const postsID = parseInt(req.params.id);
    const post = posts.find((curPost) => curPost.id === postsID);

    if (post !== undefined) {
        next()
    } else {
        res.statusCode = 404;
        res.json({
            error: true,
            message: "post non esistente"
        })
    }
}
module.exports = checkPostExists
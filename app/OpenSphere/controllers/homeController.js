const Post = require("../models/Post");
const User = require("../models/User");

async function showHome(req, res){
    try{
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: ["username"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });
    
        res.render("home.ejs", {session: req.session, posts: posts.map(post => post.get({ plain: true }))});
    }catch(error){
        return res.status(500).render("error.ejs", { error: "An error occurred. Please try again." });
    }
}

module.exports = {showHome};
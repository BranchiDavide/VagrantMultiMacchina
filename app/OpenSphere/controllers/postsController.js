const Post = require("../models/Post");
const Category = require("../models/Category");
const User = require("../models/User");
const Comment = require("../models/Comment");

async function showCreate(req, res){
    try{
        const categories = await Category.findAll();

        res.render("posts/create.ejs", { categories: categories, session: req.session});
    }catch(error){
        console.error(error);
        return res.status(500).render("error.ejs", { error: "An error occurred. Please try again." });
    }
}

async function create(req, res){
    try{
        let categories = await Category.findAll();
        let {title, content, categoryId} = req.body;
        title = title.trim();
        content = content.trim();

        if(!title){
            return res.status(400).render("posts/create.ejs", { error: "Titlke is required.", categories: categories });
        }
        if(!content){
            return res.status(400).render("posts/create.ejs", { error: "Category is required.", categories: categories });
        }
        if(!categoryId){
            return res.status(400).render("posts/create.ejs", { error: "Category is required.", categories: categories });
        }
        if(! await Category.findOne({where: {id: categoryId}})){
            return res.status(400).render("posts/create.ejs", { error: "Invalid category", categories: categories });
        }

        await Post.create({
            title: title,
            content: content,
            categoryId: categoryId,
            authorId: req.session.userId
        });

        req.session.successMsg = "Post created successfully.";
        res.redirect("/");
    }catch (error){
        console.error(error);
        return res.status(500).render("error.ejs", { error: "An error occurred. Please try again." });
    }
}

async function showView(req, res){
    try{
        const {id} = req.params;
        const post = await Post.findOne({
            where: {id},
            include: [
                {
                    model: Comment,
                    as: "comments",
                    include: [
                        {
                            model: User,
                            as: "author",
                            attributes: ["username"]
                        }
                    ]
                },
                {
                    model: User,
                    as: "author",
                    attributes: ["username"]
                },
                {
                    model: Category,
                    as: "category",
                    attributes: ["name"]
                }
            ],
        });
        if(!post){
            return res.status(404).render("error.ejs", { error: "Post not found." });
        }

        res.render("posts/view.ejs", {session: req.session, post: post});
    }catch(error){
        console.error(error);
        return res.status(500).render("error.ejs", { error: "An error occurred. Please try again." });
    }
}

async function comment(req, res){
    try{
        const {id} = req.params;
        let {content} = req.body;
        content = content.trim();

        const post = await Post.findOne({where: {id}});
        if(!post){
            return res.status(404).render("error.ejs", { error: "Post not found." });
        }
    
        if(!content){
            return res.status(400).render("error.ejs", { error: "Content of the comment is required." });
        }

        await Comment.create({
            content,
            postId: id,
            authorId: req.session.userId
        });


        req.session.successMsg = "Comment added successfully.";
        res.redirect(`/posts/${id}`);
    }catch (error){
        console.error(error);
        return res.status(500).render("error.ejs", { error: "An error occurred. Please try again." });
    }
}

async function showUpdate(req, res){
    try {
        const {id} = req.params;
        const post = await Post.findOne({
            where: {id},
            include: [{ model: User, as: "author", attributes: ["id", "username"] }]
        });

        if (!post) {
            return res.status(404).render("error.ejs", { error: "Post not found." });
        }

        if(post.author.id != req.session.userId){
            return res.status(403).render("error.ejs", { error: "You don't have the permission to access this post!" });
        }

        res.render("posts/update.ejs", { post, session: req.session });
    } catch (error) {
        console.error(error);
        return res.status(500).render("error.ejs", { error: "An error occurred. Please try again." });
    }
}

async function update(req, res){
    try {
        let {id} = req.params;
        let { title, content } = req.body;
        title = title.trim();
        content = content.trim();

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).render("error", { error: "Post not found." });
        }

        if(!title){
            return res.status(400).render("error.ejs", { error: "Titlke is required." });
        }
        if(!content){
            return res.status(400).render("error.ejs", { error: "Content is required." });
        }

        post.title = title;
        post.content = content;
        await post.save();

        req.session.successMsg = "Post updated successfully.";
        res.redirect(`/posts/${id}`);
    } catch (error) {
        console.error(error);
        return res.status(500).render("error.ejs", { error: "An error occurred. Please try again." });
    }
}

async function deletePost(req, res) {
    try {
        const { id } = req.params;
        const post = await Post.findOne({ where: { id } });

        if (!post) {
            return res.status(404).render("error.ejs", { error: "Post not found." });
        }

        if (post.authorId !== req.session.userId) {
            return res.status(403).render("error.ejs", { error: "You don't have permission to delete this post." });
        }

        await Comment.destroy({ where: { postId: id } });
        await post.destroy();
        req.session.successMsg = "Post deleted successfully.";
        res.status(200).send("Post deleated successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).render("error.ejs", { error: "An error occurred. Please try again." });
    }
}


module.exports = {showCreate, create, showView, comment, showUpdate, update, deletePost};
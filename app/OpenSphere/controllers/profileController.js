const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

async function showProfile(req, res) {
    try {
        const userId = req.session.userId;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).render("error", { error: "User not found." });
        }
        res.render("profile/profile.ejs", { user, session: req.session });
    } catch (error) {
        console.error(error);
        return res.status(500).render("error.ejs", { error: "An error occurred. Please try again." });
    }
}

async function showManagePosts(req, res) {
    try {
        const userId = req.session.userId;
        const posts = await Post.findAll({
            where: { authorId: userId },
            include: [{ model: User, as: "author", attributes: ["username"] }],
            order: [["createdAt", "DESC"]]
        });
        res.render("profile/managePosts.ejs", { posts, session: req.session });
    } catch (error) {
        console.error(error);
        return res.status(500).render("error.ejs", { error: "An error occurred. Please try again." });
    }
}

async function showManageComments(req, res) {
    try {
        const userId = req.session.userId;
        const comments = await Comment.findAll({
            where: { authorId: userId },
            include: [
                {
                    model: Post,
                    as: "post",
                    attributes: ["title"],
                },
                {
                    model: User,
                    as: "author",
                    attributes: ["username"],
                },
            ],
            order: [["createdAt", "DESC"]]
        });
        res.render("profile/manageComments.ejs", { comments, session: req.session });
    } catch (error) {
        console.error(error);
        return res.status(500).render("error.ejs", { error: "An error occurred. Please try again." });
    }
}

module.exports = {showProfile, showManagePosts, showManageComments};

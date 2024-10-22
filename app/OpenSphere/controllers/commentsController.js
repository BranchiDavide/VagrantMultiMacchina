const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

async function showUpdateComment(req, res) {
    try {
        const { id } = req.params;
        const comment = await Comment.findOne({
            where: { id },
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
        });

        if (!comment) {
            return res.status(404).render("error.ejs", { error: "Comment not found." });
        }

        if (comment.authorId != req.session.userId) {
            return res.status(403).render("error.ejs", { error: "You don't have permission to edit this comment." });
        }

        res.render("comments/update.ejs", { comment, session: req.session });
    } catch (error) {
        console.error(error);
        return res.status(500).render("error.ejs", { error: "An error occurred. Please try again." });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        let { content } = req.body;
        content = content.trim();

        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).render("error.ejs", { error: "Comment not found." });
        }

        if (!content) {
            return res.status(400).render("error.ejs", { error: "Content is required." });
        }

        comment.content = content;
        await comment.save();

        req.session.successMsg = "Comment updated successfully.";
        res.redirect("/profile/comments");
    } catch (error) {
        console.error(error);
        return res.status(500).render("error.ejs", { error: "An error occurred. Please try again." });
    }
}

async function deleteComment(req, res) {
    try {
        const { id } = req.params;
        const comment = await Comment.findOne({ where: { id } });

        if (!comment) {
            return res.status(404).render("error.ejs", { error: "Comment not found." });
        }

        if (comment.authorId !== req.session.userId) {
            return res.status(403).render("error.ejs", { error: "You don't have permission to delete this comment." });
        }

        await comment.destroy();
        req.session.successMsg = "Comment deleted successfully.";
        res.status(200).send("Comment deleted successfully.");
    } catch (error) {
        console.error(error);
        return res.status(500).render("error.ejs", { error: "An error occurred. Please try again." });
    }
}

module.exports = {showUpdateComment,update,deleteComment};
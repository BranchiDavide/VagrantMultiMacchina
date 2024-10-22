const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Post = require("./Post");

const Comment = sequelize.define("Comment", {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: "id"
        }
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    }
});

Comment.belongsTo(User, { foreignKey: "authorId", as: "author" });
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });

Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });
User.hasMany(Comment, { foreignKey: "authorId", as: "comments" });

module.exports = Comment;

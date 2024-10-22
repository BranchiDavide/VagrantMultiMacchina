const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Category = require("./Category");

const Post = sequelize.define("Post", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
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

Post.belongsTo(User, { foreignKey: "authorId", as: "author" });
Post.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

Category.hasMany(Post, { foreignKey: "categoryId" });

module.exports = Post;
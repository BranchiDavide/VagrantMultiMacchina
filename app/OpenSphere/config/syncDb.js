const sequelize = require("./db");

const User = require("../models/User");
const Category = require("../models/Category");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

async function syncDb(){
    try {
        await sequelize.sync({ force: false });
        await seedCategories();
    } catch (error) {
        console.error("Unable to create tables:", error);
    }
};

const seedCategories = async () => {
    const categories = ["Technology", "Health", "Finance", "Education", "Lifestyle"];
    
    for (const categoryName of categories) {
        await Category.findOrCreate({
            where: { name: categoryName },
        });
    }
};

module.exports = { syncDb };

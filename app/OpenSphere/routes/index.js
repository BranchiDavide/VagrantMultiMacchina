const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const homeRoutes = require("./homeRoutes");
const postsRoutes = require("./postsRoutes");
const profileRoutes = require("./profileRoutes");
const commentsRoutes = require("./commentsRoutes");

const {isAuthenticated} = require("../middlewares/authMiddleware");

router.use("/", homeRoutes);
router.use("/auth", authRoutes);
router.use("/posts", postsRoutes);
router.use("/profile", isAuthenticated, profileRoutes);
router.use("/comments", isAuthenticated, commentsRoutes);

module.exports = router;
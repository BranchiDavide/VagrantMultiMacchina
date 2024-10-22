const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

const {isAuthenticated} = require("../middlewares/authMiddleware");

router.get("/create", isAuthenticated, postsController.showCreate);

router.post("/create", isAuthenticated, postsController.create);

router.get("/:id", postsController.showView)
router.post("/:id/comment", isAuthenticated, postsController.comment);

router.get("/:id/edit", isAuthenticated, postsController.showUpdate);
router.post("/:id/edit", isAuthenticated, postsController.update);

router.delete("/:id/delete", isAuthenticated, postsController.deletePost);

module.exports = router;
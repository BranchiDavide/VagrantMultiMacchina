const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

router.get("/:id/edit", commentsController.showUpdateComment);

router.post("/:id/edit", commentsController.update);

router.delete("/:id/delete", commentsController.deleteComment);

module.exports = router;
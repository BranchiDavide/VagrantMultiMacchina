const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/", profileController.showProfile);
router.get("/posts", profileController.showManagePosts);
router.get("/comments", profileController.showManageComments);

module.exports = router;
const router = require("express").Router();
const {
  createProject,
  getProjects,
  likeProject,
  dislikeProject
} = require("../controllers/projectController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.post("/", auth, role("admin"), createProject);
router.get("/", getProjects);
router.put("/like/:id", likeProject);
router.put("/dislike/:id", dislikeProject);

module.exports = router;
const Project = require("../models/Project");

// Create project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      user: req.user.id
    });
    res.json(project);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  const projects = await Project.find().populate("user", "name");
  res.json(projects);
};

// Like
exports.likeProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  project.likes += 1;
  await project.save();
  res.json(project);
};

// Dislike
exports.dislikeProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  project.dislikes += 1;
  await project.save();
  res.json(project);
};
import React from "react";
import "../../styles/Dashboard/myProjects.scss";

const MyProjectsPage = () => {
  // Sample projects (replace with actual data later)
  const projects = [
    { title: "React Dashboard", desc: "A responsive dashboard project" },
    { title: "Portfolio Website", desc: "Showcasing my work" },
    { title: "E-commerce App", desc: "Online shopping platform" },
  ];

  return (
    <div className="my-projects-page">
      <h2>My Projects</h2>
      <div className="projects-grid">
        {projects.map((proj, i) => (
          <div className="project-card" key={i}>
            <h3>{proj.title}</h3>
            <p>{proj.desc}</p>
            <button className="view-btn">View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjectsPage;

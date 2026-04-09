import React, { useState } from "react";
import "../../styles/Dashboard/dashboardHome.scss";
import { FaStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const DashboardHome = () => {
  const initialProjects = [
    {
      id: 1,
      title: "Global Carbon Tracker",
      author: "Jane Doe",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      description:
        "A real-time dashboard tracking carbon emissions across 150 countries.",
      tags: ["React", "D3.js", "Environment"],
      likes: 124,
      dislikes: 12,
      comments: [],
    },
    {
      id: 2,
      title: "Neural Music Gen",
      author: "Alex Rivers",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
      description:
        "AI-powered music generator that creates lo-fi beats.",
      tags: ["TensorFlow", "Python", "Music"],
      likes: 89,
      dislikes: 4,
      comments: [],
    },
    {
      id: 3,
      title: "Stock Market Predictor",
      author: "abc",
      rating: 4.2,
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      description:
        "Using LSTM networks to predict short-term stock movements.",
      tags: ["ML", "FinTech", "GraphQL"],
      likes: 231,
      dislikes: 45,
      comments: [],
    },
  ];

  const [projects, setProjects] = useState(initialProjects);
  const [commentInputs, setCommentInputs] = useState({});

  const handleLike = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const handleDislike = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, dislikes: p.dislikes + 1 } : p
      )
    );
  };

  const handleInputChange = (id, value) => {
    setCommentInputs({ ...commentInputs, [id]: value });
  };

  const handleAddComment = (id) => {
    if (!commentInputs[id]) return;

    const newComment = {
      name: "You",
      avatar: "https://i.pravatar.cc/40",
      text: commentInputs[id],
    };

    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, comments: [...p.comments, newComment] }
          : p
      )
    );

    setCommentInputs({ ...commentInputs, [id]: "" });
  };

  return (
    <div className="dashboard-home">
      <h1>Welcome To Project Library</h1>

      <div className="project-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            
            {/* IMAGE */}
            <div className="card-image">
              <img src={project.image} alt={project.title} />
              <div className="rating">
                <FaStar /> {project.rating}
              </div>
            </div>

            {/* CONTENT */}
            <div className="card-content">
              <h3>{project.title}</h3>
              <span className="author">by {project.author}</span>

              <p>{project.description}</p>

              <div className="tags">
                {project.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>

              <div className="card-footer">
                <div className="reactions">
                  <span onClick={() => handleLike(project.id)}>
                    <FaThumbsUp /> {project.likes}
                  </span>
                  <span onClick={() => handleDislike(project.id)}>
                    <FaThumbsDown /> {project.dislikes}
                  </span>
                </div>
                <button>View Details</button>
              </div>

              {/* COMMENTS */}
              <div className="comments-section">
                <div className="comment-input">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentInputs[project.id] || ""}
                    onChange={(e) =>
                      handleInputChange(project.id, e.target.value)
                    }
                  />
                  <button onClick={() => handleAddComment(project.id)}>
                    Post
                  </button>
                </div>

                <div className="comment-list">
                  {project.comments.map((cmt, i) => (
                    <div className="comment-item" key={i}>
                      <img src={cmt.avatar} alt="user" />
                      <div className="comment-body">
                        <span className="comment-name">{cmt.name}</span>
                        <p>{cmt.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
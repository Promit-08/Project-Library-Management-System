import React, { useState } from "react";
import "../../styles/Dashboard/myProjects.scss";
import { FaStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const MyProjectsPage = () => {
  const initialProjects = [
    {
      id: 1,
      title: "Global Carbon Tracker",
      author: "Jane Doe",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
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
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
      description:
        "AI-powered music generator that creates lo-fi beats.",
      tags: ["TensorFlow", "Python", "Music"],
      likes: 89,
      dislikes: 4,
      comments: [],
    },
  ];

  const [projects, setProjects] = useState(initialProjects);
  const [commentInputs, setCommentInputs] = useState({});

  // 👍 Like
  const handleLike = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  // 👎 Dislike
  const handleDislike = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, dislikes: p.dislikes + 1 } : p
      )
    );
  };

  // 💬 Input change
  const handleInputChange = (id, value) => {
    setCommentInputs({ ...commentInputs, [id]: value });
  };

  // ➕ Add comment
  const handleAddComment = (id) => {
  if (!commentInputs[id]) return;

  const newComment = {
    name: "You", // later you can replace with logged-in user
    avatar: "https://i.pravatar.cc/40", // random avatar
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
    <div className="my-projects-page">
      <h2>MY PROJECTS</h2>

      <div className="projects-grid">
        {projects.map((proj) => (
          <div className="project-card" key={proj.id}>
            
            {/* IMAGE */}
            <div className="card-image">
              <img src={proj.image} alt={proj.title} />

              <div className="rating">
                <FaStar /> {proj.rating}
              </div>
            </div>

            {/* CONTENT */}
            <div className="card-content">
              <h3>{proj.title}</h3>
              <span className="author">by {proj.author}</span>

              {/* ✅ FIXED BUG HERE */}
              <p>{proj.description}</p>

              <div className="tags">
                {proj.tags.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>

              {/* 👍 👎 */}
              <div className="card-footer">
                <div className="stats">
                  <span onClick={() => handleLike(proj.id)}>
                    <FaThumbsUp /> {proj.likes}
                  </span>

                  <span onClick={() => handleDislike(proj.id)}>
                    <FaThumbsDown /> {proj.dislikes}
                  </span>
                </div>

                <button>View Details</button>
              </div>

              {/* 💬 COMMENTS */}
              <div className="comments-section">
                <div className="comment-input">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentInputs[proj.id] || ""}
                    onChange={(e) =>
                      handleInputChange(proj.id, e.target.value)
                    }
                  />
                  <button onClick={() => handleAddComment(proj.id)}>
                    Post
                  </button>
                </div>

                <div className="comment-list">
  {proj.comments.map((cmt, i) => (
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

export default MyProjectsPage;
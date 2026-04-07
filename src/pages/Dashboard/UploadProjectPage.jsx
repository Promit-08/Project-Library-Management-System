import React, { useState } from "react";
import "../../styles/Dashboard/uploadProject.scss";

const UploadProjectPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const projectData = {
      title,
      category,
      date,
      desc,
      isPrivate,
      image,
    };

    console.log(projectData);
    alert(`Project "${title}" uploaded!`);

    // reset
    setTitle("");
    setCategory("Web Development");
    setDate("");
    setDesc("");
    setIsPrivate(false);
    setImage(null);
  };

  return (
    <div className="upload-project-wrapper">
      <div className="upload-card">
        <div className="header">
          <h2>Upload New Project</h2>
          <p>Fill in the details to showcase your work to the community.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Left side */}
            <div className="left">
              <label>Project Title</label>
              <input
                type="text"
                placeholder="Awesome App"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Web Development</option>
                <option>Mobile App</option>
                <option>AI / ML</option>
                <option>UI / UX</option>
              </select>

              <label>Start Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Right side */}
            <div className="right">
              <label>Project Preview (Upload files)</label>
              <label className="image-upload">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <span>
                  {image ? image.name : "Click to upload project"}
                </span>
              </label>
            </div>
          </div>

          <label>Project Description</label>
          <textarea
            placeholder="Tell us about the core features, tech stack used, and problems solved..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />

          <div className="footer">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={() => setIsPrivate(!isPrivate)}
              />
              Keep this project private (for my portfolio only)
            </label>

            <button type="submit">Create Project</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProjectPage;

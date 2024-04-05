// ImageUpload.js
import React, { useState } from "react";
import "./ImageUpload.css";

const ImageUpload = ({ onUpload, setIsSuccessful_prop }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    setIsSuccessful_prop(0);
    const file = event.target.files[0];
    if (file && file.type.includes("image")) {
      setSelectedFile(file);
      setErrorMessage("");
    } else {
      setSelectedFile(null);
      setErrorMessage(
        "Please select a valid image file (JPEG, PNG, JPG, etc.)"
      );
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
    } else {
      setErrorMessage("Please select an image to upload");
    }
  };

  function handlemptyfile() {
    alert("please select a valid image");
  }

  return (
    <div className="image-upload-container">
      <div className="file-input">
        <p>Choose your file:</p>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div className="privacy-options">
        <p>Upload image:</p>
      </div>
      {errorMessage !== "" ? (
        <button onClick={handlemptyfile} className="grey">
          Upload
        </button>
      ) : (
        <button onClick={handleUpload}>Upload</button>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ImageUpload;

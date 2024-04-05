import React, { useState } from "react";
import Modal from "react-modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./ViewImagePage.css";

Modal.setAppElement("#root");
function ViewImagePage(props) {
  const arr = props.imageArraystring_prop.split(",");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const handleDownload = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={props.back_to_uploadpage_prop}>Back</button>
      <div className="image-container-wrapper">
        {arr.length === 0 && <p>No Image to show</p>}
        {arr.length > 0 &&
          arr.map((link, index) => (
            <div
              key={index}
              className="image-container"
              onClick={() => openModal(link)}
            >
              <LazyLoadImage
                alt={`Image ${index}`}
                src={link}
                width={300}
                height={350}
                effect="blur"
              />
            </div>
          ))}
      </div>

      <Modal
        className="bleh"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Selected Image"
      >
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          {selectedImage && (
            <>
              <img src={selectedImage} alt="Selected" className="modal-image" />
              <button
                className="download-btn"
                onClick={() => handleDownload(selectedImage)}
              >
                Download
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ViewImagePage;

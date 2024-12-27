import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../assets/css/modal.css';

const Modal = ({ isOpen, content, onClose }) => {
  if (!isOpen) return null; 

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{content.title}</h2>
        <p>{content.especialidad}</p>
        <p>{content.resumen}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    especialidad: PropTypes.string.isRequired,
    resumen: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

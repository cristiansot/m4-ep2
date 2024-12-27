import React, { memo } from 'react';
import PropTypes from 'prop-types';
import withModal from '../hoc/withModal';
import Modal from './Modal';

const DoctorCard = ({ doctor, isModalOpen, openModal, closeModal }) => {
  const modalContent = {
    title: `${doctor.nombre}`,
    especialidad: `Especialidad: ${doctor.especialidad}`,
    resumen: `${doctor.resumen}`,
  };

  return (
    <React.Profiler id="DoctorCard" onRender={(id, phase, actualDuration) => {
      console.log(`Componente ${id} renderizado en ${actualDuration} ms en la fase ${phase}`);
    }}>
      <div className="doctor-card">
        <img
          src={doctor.imagen}
          alt={`Foto de ${doctor.nombre}`}
          className="doctor-image"
          style={{ height: 400, borderRadius: 30 }}
        />
        <div className="doctor-info">
          <h2>{doctor.nombre}</h2>
          <button onClick={openModal} style={{ marginTop: 10, padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 5 }}>
            Ver detalles
          </button>
        </div>

        <Modal isOpen={isModalOpen} content={modalContent} onClose={closeModal} />
      </div>
    </React.Profiler>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    especialidad: PropTypes.string.isRequired,
    resumen: PropTypes.string.isRequired,
  }).isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default withModal(DoctorCard);






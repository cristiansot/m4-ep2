import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const DoctorCard = ({ doctor }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = () => {
      if (doctor.imagen) {
        setImageUrl(doctor.imagen); 
      } else {
        console.warn(`No se encontró imagen para el doctor: ${doctor.nombre}`);
        setImageUrl("/default-image.jpg"); 
      }
    };

    fetchImage();
  }, [doctor.imagen]);

  return (
    <div className="doctor-card">
      <img
        src={imageUrl}
        alt={`Foto de ${doctor.nombre}`}
        className="doctor-image"
        style={{ height: 400, borderRadius: 30 }}
      />
      <div className="doctor-info">
        <h2 className="doctor-name">{doctor.nombre}</h2>
        <p className="doctor-specialty">Especialidad: {doctor.especialidad}</p>
        <p className="doctor-experience">
          Años de experiencia: {doctor.años_experiencia}
        </p>
      </div>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    especialidad: PropTypes.string.isRequired,
    años_experiencia: PropTypes.number.isRequired,
  }).isRequired,
};

export default DoctorCard;

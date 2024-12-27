import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ServiceList = ({ onServiceSelect }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/assets/servicios.json"); 
        if (!response.ok) {
          throw new Error("Error al cargar los servicios");
        }
        const data = await response.json();
        setServices(data.servicios);
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
        setServices(["Urgencias", "Consultas Médicas", "Hospitalización", "Toma de Muestras"]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <p>Cargando servicios...</p>;
  }

  return (
    <> 
      <h2>Lista de Servicios</h2>
      <select style={{ alignItems: "center", marginBottom: "20px" }} onChange={(e) => onServiceSelect(e.target.value)}>
        <option value="">Seleccionar un servicio</option>
        {services.map((service, index) => (
          <option key={index} value={service}>
            {service}
          </option>
        ))}
      </select>
    </>
  );
};

ServiceList.propTypes = {
  onServiceSelect: PropTypes.func.isRequired, 
  services: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ServiceList;

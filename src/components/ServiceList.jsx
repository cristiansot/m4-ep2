import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ServiceList = ({ onServiceSelect }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulación de API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("../assets/servicios.json");
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
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <h3>Lista de Servicios</h3>
      <select onChange={(e) => onServiceSelect(e.target.value)}>
        <option value="">Seleccionar un servicio</option>
        {services.map((service, index) => (
          <option key={index} value={service}>
            {service}
          </option>
        ))}
      </select>
    </div>
  );
};

ServiceList.propTypes = {
  onServiceSelect: PropTypes.func.isRequired,
};

export default ServiceList;

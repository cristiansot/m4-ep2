import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [resolvedTeamData, setResolvedTeamData] = useState([]);
  const [medicalServices, setMedicalServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const addAppointment = (newAppointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const resolveImagePaths = (data) => {
    return data.map((doctor) => ({
      ...doctor,
      imagen: new URL(`../assets/img/${doctor.imagen.split('/').pop()}`, import.meta.url).href,
    }));
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('/assets/servicios.json');
      if (!response.ok) {
        throw new Error('Error al cargar los servicios');
      }
      const data = await response.json();
      setMedicalServices(data.servicios);
    } catch (error) {
      console.error('Error al cargar los servicios:', error);
      setMedicalServices(["Urgencias", "Consultas Médicas", "Hospitalización", "Toma de Muestras"]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        resolvedTeamData,
        setResolvedTeamData,
        medicalServices,
        setMedicalServices,
        appointments,
        addAppointment,
        handleServiceSelect,
        resolveImagePaths,
        fetchServices,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

import React, { useEffect, useState } from 'react';
import './App.css';
import DoctorCard from './components/DoctorCard';
import ServiceList from './components/ServiceList';
import AppointmentForm from './components/AppointmentForm';
import teamData from './assets/equipo.json';

const App = () => {
  const [resolvedTeamData, setResolvedTeamData] = useState([]);
  const [medicalServices, setMedicalServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const resolveImagePaths = (data) => {
      return data.map((doctor) => ({
        ...doctor,
        imagen: new URL(`./assets/img/${doctor.imagen.split('/').pop()}`, import.meta.url).href,
      }));
    };

    const initialMedicalServices = ["Urgencias", "Consultas Médicas", "Hospitalización", "Toma de Muestras"];
    setMedicalServices(initialMedicalServices);
    setResolvedTeamData(resolveImagePaths(teamData));
  }, []);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const addAppointment = (newAppointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
  };

  const specialties = [...new Set(resolvedTeamData.map((doctor) => doctor.especialidad))];

  return (
    <div className="App">
      <div className="service-list-container">
        <ServiceList
          services={medicalServices}
          onServiceSelect={handleServiceSelect}
        />
      </div>

      <AppointmentForm
        specialties={specialties}
        doctors={resolvedTeamData}
        onAppointmentSubmit={addAppointment}
      />

      {appointments.length > 0 && (
        <div className="appointments">
          <h2>Citas Agendadas</h2>
          <ul>
            {appointments.map((appointment, index) => (
              <li key={index}>
                <strong>Paciente:</strong> {appointment.patientName} | <strong>Doctor:</strong> {appointment.doctor} | <strong>Fecha:</strong> {appointment.appointmentDate}
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2>Equipo Médico</h2>
      <div className="doctor-list">
        {resolvedTeamData.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>

      
    </div>
  );
};

export default App;

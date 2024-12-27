import React, { useEffect } from 'react';
import './App.css';
import DoctorCard from './components/DoctorCard';
import ServiceList from './components/ServiceList';
import AppointmentForm from './components/AppointmentForm';
import { AppProvider, useAppContext } from './components/AppContext';
import teamData from './assets/equipo.json';

const App = () => {
  const {
    resolvedTeamData,
    setResolvedTeamData,
    medicalServices,
    handleServiceSelect,
    appointments,
    addAppointment,
    resolveImagePaths,
    fetchServices,
  } = useAppContext();

  useEffect(() => {
    fetchServices(); 
    setResolvedTeamData(resolveImagePaths(teamData)); 
  }, [fetchServices, resolveImagePaths, setResolvedTeamData]);

  return (
    <div className="App">
      <div className="service-list-container">
        <ServiceList
          services={medicalServices}
          onServiceSelect={handleServiceSelect}
        />
      </div>

      <AppointmentForm
        specialties={medicalServices}
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

const AppWithProvider = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default AppWithProvider;

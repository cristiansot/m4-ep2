import React, { useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import '../assets/css/form.css';

const AppointmentForm = ({ doctors, onAppointmentSubmit }) => {
  const patientNameRef = useRef(null);

  const validationSchema = Yup.object({
    patientName: Yup.string()
      .required("El nombre del paciente es obligatorio")
      .min(3, "Debe tener al menos 3 caracteres"),
    doctor: Yup.string().required("Debes seleccionar un doctor"),
    appointmentDate: Yup.date()
      .required("Debes seleccionar una fecha")
      .min(new Date(), "La fecha no puede ser en el pasado"),
  });

  useEffect(() => {
    if (patientNameRef.current) {
      patientNameRef.current.focus();
    }
  }, []);

  return (
    <div className="formContainer">
      <h2>Agendar Cita</h2>
      <Formik
        initialValues={{
          patientName: "",
          doctor: "",
          appointmentDate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onAppointmentSubmit(values);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="appointmentForm">
            <div>
              <label className="titleLabel" htmlFor="patientName">Nombre del Paciente</label>
              <Field
                type="text"
                id="patientName"
                name="patientName"
                placeholder="Nombre completo"
                innerRef={patientNameRef} 
              />
              <ErrorMessage
                name="patientName"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div>
              <label className="titleLabel" htmlFor="doctor">Seleccionar Doctor</label>
              <Field as="select" id="doctor" name="doctor">
                <option value="" label="Seleccionar doctor" />
                {doctors.map((doc, index) => (
                  <option key={index} value={doc.nombre}>
                    {doc.nombre} ({doc.especialidad})
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="doctor"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div>
              <label className="titleLabel" htmlFor="appointmentDate">Fecha de la Cita</label>
              <Field type="date" id="appointmentDate" name="appointmentDate" />
              <ErrorMessage
                name="appointmentDate"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Agendar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

AppointmentForm.propTypes = {
  specialties: PropTypes.arrayOf(PropTypes.string).isRequired,
  doctors: PropTypes.arrayOf(
    PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      especialidad: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAppointmentSubmit: PropTypes.func.isRequired,
};

export default AppointmentForm;

import PropTypes from "prop-types";

const ServiceList = ({ services, onServiceSelect }) => {
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
  services: PropTypes.arrayOf(PropTypes.string).isRequired,
  onServiceSelect: PropTypes.func.isRequired,
};

export default ServiceList;

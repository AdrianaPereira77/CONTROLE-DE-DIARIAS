import React from 'react';
import './CampoCustomizado.css';

function CampoCustomizado({ label, type = 'text', placeholder, value, onChange, name, required, className = '' }) {
  return (
    <div className={`campo-customizado ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input 
        id={name}
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        name={name}
        required={required}
      />
    </div>
  );
}

export default CampoCustomizado;
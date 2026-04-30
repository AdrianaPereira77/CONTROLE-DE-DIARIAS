import React from 'react';
import './BotaoCustomizado.css';

function BotaoCustomizado({ children, onClick, tipo = 'primario', icone, className = '' }) {
  return (
    <button className={`botao-customizado ${tipo} ${className}`} onClick={onClick}>
      {icone && <i className={icone}></i>}
      {children}
    </button>
  );
}

export default BotaoCustomizado;
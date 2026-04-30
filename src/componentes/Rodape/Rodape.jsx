import React from 'react';
import './Rodape.css';

function Rodape() {
  return (
    <footer className="rodape-app">
      <p>&copy; {new Date().getFullYear()} Sistema de Diárias. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Rodape;
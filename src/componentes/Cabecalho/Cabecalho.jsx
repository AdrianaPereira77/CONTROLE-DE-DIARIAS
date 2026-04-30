import React from 'react';
import './Cabecalho.css';
import Avatar from '../Avatar/Avatar';
import BotaoCustomizado from '../BotaoCustomizado/BotaoCustomizado';

function Cabecalho({ userName, userEmail, onLogout }) {
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <header className="cabecalho-app">
      <div className="cabecalho-esquerda">
        <h1>Prestação de Contas de Diárias</h1>
        <div className="info-usuario">
          <Avatar nome={userName} iniciais={getInitials(userName)} />
          <span className="email-usuario">{userEmail}</span>
        </div>
      </div>
      <BotaoCustomizado tipo="perigo" icone="fas fa-sign-out-alt" onClick={onLogout}>
        Sair
      </BotaoCustomizado>
    </header>
  );
}

export default Cabecalho;

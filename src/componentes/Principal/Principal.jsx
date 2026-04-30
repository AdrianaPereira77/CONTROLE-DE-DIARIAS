// ...existing code...
import React, { useState } from 'react';
import './App.css'; // Estilos globais
import Cabecalho from './componentes/Cabecalho/Cabecalho';
import Principal from './componentes/Principal/Principal';
import Rodape from './componentes/Rodape/Rodape';

function App() {
  const [diarias, setDiarias] = useState([
    { id: "001/2026", agente: "Maria Santos", dataPagamento: "14/04/2026", situacao: "Pendente" },
    { id: "002/2026", agente: "Carlos Oliveira", dataPagamento: "19/04/2026", situacao: "Pago" },
    { id: "003/2026", agente: "Ana Paula Costa", dataPagamento: "24/04/2026", situacao: "Pendente" },
    { id: "004/2026", agente: "João Silva", dataPagamento: "25/04/2026", situacao: "Pago" }
  ]);

  // Funções de CRUD
  const adicionarDiaria = (novaDiaria) => {
    setDiarias(prevDiarias => [
      ...prevDiarias,
      { ...novaDiaria, id: `00${prevDiarias.length + 1}/2026` }
    ]);
  };

  const atualizarDiaria = (id, diariaAtualizada) => {
    setDiarias(prevDiarias =>
      prevDiarias.map(diaria =>
        diaria.id === id ? { ...diaria, ...diariaAtualizada } : diaria
      )
    );
  };

  const excluirDiaria = (id) => {
    setDiarias(prevDiarias => prevDiarias.filter(diaria => diaria.id !== id));
  };

  const handleLogout = () => {
    alert("Funcionalidade de Sair implementada aqui!");
    // Lógica para deslogar o usuário
  };

  return (
    <div className="app-container">
      <Cabecalho 
        userName="João Silva" 
        userEmail="joao@exemplo.com" 
        onLogout={handleLogout} 
      />
      <Principal 
        diarias={diarias} 
        onAdicionar={adicionarDiaria} 
        onAtualizar={atualizarDiaria} 
        onExcluir={excluirDiaria} 
      />
      <Rodape />
    </div>
  );
}

export default App;
// ...existing code...
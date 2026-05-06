import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Principal from "../../componentes/Principal/Principal";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import ItemDiaria from "./ItemDiaria"; // Importa o componente ItemDiaria
import "./ListaDiarias.css"; // Importa o CSS da lista

function ListaDiarias() {
  const navigate = useNavigate();
  const [diarias, setDiarias] = useState([]);

  // useEffect para carregar as diárias do localStorage quando o componente for montado
  useEffect(() => {
    carregarDiarias();
  }, []);

  const carregarDiarias = () => {
    const diariasDoLocalStorage = JSON.parse(localStorage.getItem("diarias")) || [];
    setDiarias(diariasDoLocalStorage);
  };

  const excluirDiaria = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta diária?")) {
      const diariasAtualizadas = diarias.filter((diaria) => diaria.id !== id);
      localStorage.setItem("diarias", JSON.stringify(diariasAtualizadas));
      setDiarias(diariasAtualizadas);
      toast.success("Diária excluída com sucesso!");
    }
  };

  const editarDiaria = (id) => {
    navigate(`/cadastro-diaria/${id}`);
  };

  const adicionarDiaria = () => {
    navigate("/cadastro-diaria");
  };

  return (
    <Principal titulo="Lista de Diárias" voltarPara="/">
      {diarias.length === 0 ? (
        <p className="lista-diarias__mensagem-vazia">
          Nenhuma diária cadastrada. Adicione uma nova diária!
        </p>
      ) : (
        <div className="lista-diarias__lista">
          {diarias.map((diaria) => (
            <div key={diaria.id} className="lista-diarias__item-container">
              {/* Renderiza o ItemDiaria passando os dados */}
              <ItemDiaria diaria={diaria} />
              
              {/* Botões de ação para cada diária */}
              <div className="lista-diarias__item-acoes">
                <BotaoCustomizado tipo="secundario" aoClicar={() => editarDiaria(diaria.id)}>
                  Editar
                </BotaoCustomizado>
                <BotaoCustomizado tipo="erro" aoClicar={() => excluirDiaria(diaria.id)}>
                  Excluir
                </BotaoCustomizado>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="lista-diarias__botao-adicionar">
        <BotaoCustomizado tipo="primario" aoClicar={adicionarDiaria}>
          Adicionar Diária
        </BotaoCustomizado>
      </div>
    </Principal>
  );
}

export default ListaDiarias;

import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import { toast } from "react-toastify";
// import "./LancamentoRapidoDiarias.css"; // CSS para este componente

function LancamentoRapidoDiarias() {
  const [novaDiariaDescricao, setNovaDiariaDescricao] = useState("");
  const [novaDiariaValor, setNovaDiariaValor] = useState("");
  const [diariasRapidas, setDiariasRapidas] = useState([]);

  useEffect(() => {
    carregarDiariasRapidas();
  }, []);

  const carregarDiariasRapidas = () => {
    const diariasDoLocalStorage = JSON.parse(localStorage.getItem("diariasRapidas")) || [];
    setDiariasRapidas(diariasDoLocalStorage);
  };

  const adicionarDiariaRapida = () => {
    if (novaDiariaDescricao.trim() === "" || novaDiariaValor.trim() === "") {
      toast.error("Descrição e Valor são obrigatórios para o lançamento rápido!");
      return;
    }

    if (isNaN(parseFloat(novaDiariaValor))) {
      toast.error("O valor deve ser um número!");
      return;
    }

    const novaDiaria = {
      id: crypto.randomUUID(),
      data: new Date().toISOString().split('T')[0], // Data atual no formato YYYY-MM-DD
      descricao: novaDiariaDescricao,
      valor: parseFloat(novaDiariaValor).toFixed(2),
      status: "pendente", // 'pendente' ou 'paga'
    };

    const diariasAtualizadas = [novaDiaria, ...diariasRapidas];
    localStorage.setItem("diariasRapidas", JSON.stringify(diariasAtualizadas));
    setDiariasRapidas(diariasAtualizadas);
    toast.success("Diária adicionada rapidamente!");
    setNovaDiariaDescricao("");
    setNovaDiariaValor("");
  };

  const removerDiariaRapida = (id) => {
    if (window.confirm("Tem certeza que deseja remover esta diária?")) {
      const diariasAtualizadas = diariasRapidas.filter((diaria) => diaria.id !== id);
      localStorage.setItem("diariasRapidas", JSON.stringify(diariasAtualizadas));
      setDiariasRapidas(diariasAtualizadas);
      toast.success("Diária removida!");
    }
  };

  const alternarStatusDiaria = (id) => {
    const diariasAtualizadas = diariasRapidas.map((diaria) =>
      diaria.id === id
        ? { ...diaria, status: diaria.status === "pendente" ? "paga" : "pendente" }
        : diaria
    );
    localStorage.setItem("diariasRapidas", JSON.stringify(diariasAtualizadas));
    setDiariasRapidas(diariasAtualizadas);
    toast.info("Status da diária atualizado!");
  };

  return (
    <Principal voltarPara="/" titulo={`Lançamento Rápido de Diárias (${diariasRapidas.length})`}>
      <div className="lancamento-rapido__campo-adicionar">
        <CampoCustomizado
          label="Descrição da Diária"
          id="nova-diaria-descricao"
          type="text"
          placeholder="Ex: Reunião com cliente X"
          value={novaDiariaDescricao}
          onChange={(event) => setNovaDiariaDescricao(event.target.value)}
          onKeyPress={(event) => {
            if (event.code === "Enter") {
              adicionarDiariaRapida();
            }
          }}
        />
        <CampoCustomizado
          label="Valor"
          id="nova-diaria-valor"
          type="number"
          placeholder="Ex: 150.00"
          value={novaDiariaValor}
          onChange={(event) => setNovaDiariaValor(event.target.value)}
          onKeyPress={(event) => {
            if (event.code === "Enter") {
              adicionarDiariaRapida();
            }
          }}
        />
        <BotaoCustomizado tipo="primario" aoClicar={adicionarDiariaRapida}>
          +
        </BotaoCustomizado>
      </div>

      {!diariasRapidas.length ? (
        <p className="lancamento-rapido__mensagem-vazia">
          Nenhum lançamento rápido de diária. Adicione um!
        </p>
      ) : (
        <ul className="lancamento-rapido__lista">
          {diariasRapidas.map((item) => (
            <li key={item.id} className="lancamento-rapido__item">
              <input
                type="checkbox"
                checked={item.status === "paga"}
                onChange={() => alternarStatusDiaria(item.id)}
              />
              <span
                className="lancamento-rapido__item-descricao"
                style={{ textDecoration: item.status === "paga" ? "line-through" : "none" }}
              >
                {item.descricao} ({item.data}) - R$ {item.valor}
              </span>
              <FaTrashAlt onClick={() => removerDiariaRapida(item.id)} />
            </li>
          ))}
        </ul>
      )}
    </Principal>
  );
}

export default LancamentoRapidoDiarias;

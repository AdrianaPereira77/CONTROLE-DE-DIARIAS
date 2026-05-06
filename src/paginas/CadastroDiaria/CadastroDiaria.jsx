import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
// Remover imports de máscaras e validações de CPF/Email
// import formatarComMascara, { MASCARA_CELULAR, MASCARA_CPF } from "../../utils/formatarComMascara";
// import validarCPF from "../../utils/validarCPF";
// import validarEmail from "../../utils/validarEmail";
import { useNavigate, useParams } from "react-router-dom";

function CadastroDiaria() {
  const navigate = useNavigate();
  const params = useParams();

  const [diaria, setDiaria] = useState({
    data: "",
    descricao: "",
    valor: "",
    projeto: "",
    observacoes: "",
  });

  useEffect(() => {
    if (params.diariaId) {
      const diariasDoLocalStorage = JSON.parse(localStorage.getItem("diarias")) || [];
      const diariaEncontrada = diariasDoLocalStorage.find(
        (itemDiaria) => itemDiaria.id === params.diariaId
      );

      if (diariaEncontrada) {
        setDiaria(diariaEncontrada);
      }
    }
  }, [params]);

  const salvar = () => {
    if (!diaria.data?.trim() || !diaria.descricao?.trim() || !diaria.valor?.trim()) {
      toast.error("Data, Descrição e Valor são obrigatórios!");
      return;
    }

    if (isNaN(parseFloat(diaria.valor))) {
      toast.error("O valor da diária deve ser um número!");
      return;
    }

    const diariasDoLocalStorage = JSON.parse(localStorage.getItem("diarias")) || [];

    if (diaria.id) {
      const indexDaDiaria = diariasDoLocalStorage.findIndex(
        (itemDiaria) => itemDiaria.id === diaria.id
      );

      diariasDoLocalStorage[indexDaDiaria] = diaria;
    } else {
      const novaDiaria = { id: crypto.randomUUID(), ...diaria };
      diariasDoLocalStorage.push(novaDiaria);
    }

    localStorage.setItem("diarias", JSON.stringify(diariasDoLocalStorage));

    toast.success("Diária salva com sucesso!");
    navigate("/lista-diarias");
  };

  const titulo = diaria.id ? "Editar Diária" : "Nova Diária";

  return (
    <Principal titulo={titulo} voltarPara="/lista-diarias">
      <CampoCustomizado
        type="date"
        label="Data"
        value={diaria.data}
        onChange={(e) => setDiaria({ ...diaria, data: e.target.value })}
        obrigatorio
      />
      <CampoCustomizado
        label="Descrição"
        value={diaria.descricao}
        onChange={(e) => setDiaria({ ...diaria, descricao: e.target.value })}
        obrigatorio
      />
      <CampoCustomizado
        type="number"
        label="Valor"
        value={diaria.valor}
        onChange={(e) => setDiaria({ ...diaria, valor: e.target.value })}
        obrigatorio
      />
      <CampoCustomizado
        label="Projeto"
        value={diaria.projeto}
        onChange={(e) => setDiaria({ ...diaria, projeto: e.target.value })}
      />
      <CampoCustomizado
        label="Observações"
        value={diaria.observacoes}
        onChange={(e) => setDiaria({ ...diaria, observacoes: e.target.value })}
      />
      <BotaoCustomizado tipo="primario" aoClicar={salvar}>
        Salvar
      </BotaoCustomizado>
    </Principal>
  );
}

export default CadastroDiaria;

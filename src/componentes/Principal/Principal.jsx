import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Principal.css"; // Mantém o CSS original, que já foi adaptado

function Principal({ children, titulo, voltarPara }) {
  const navigate = useNavigate();

  return (
    <div className="principal__root">
      <div className="principal__titulo">
        {voltarPara && (
          <FaArrowLeft
            className="principal__titulo-icone-voltar"
            onClick={() => navigate(voltarPara)}
          />
        )}
        <h2>{titulo}</h2>
      </div>
      {children}
    </div>
  );
}

export default Principal; // Mantém o nome original para reutilização, ou pode ser renomeado para PrincipalDiarias se preferir
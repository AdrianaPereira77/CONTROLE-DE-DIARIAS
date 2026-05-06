// imports de bibliotecas externas, instaladas via npm
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// imports de arquivos de estilos (CSS)
import "./App.css";
// imports de componentes/paginas internas do projeto React (arquivos .jsx)
import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import Rodape from "./componentes/Rodape/Rodape";
// imports de páginas para o controle de diárias
import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import ListaDiarias from "./paginas/ListaDiarias/ListaDiarias"; // Você precisará criar este componente
import CadastroDiaria from "./paginas/CadastroDiaria/CadastroDiaria"; // Você precisará criar este componente

const roteador = createBrowserRouter([
  {
    path: "",
    element: <PaginaInicial />,
  },
  {
    path: "lista-diarias",
    element: <ListaDiarias />,
  },
  {
    path: "cadastro-diaria/:diariaId?", // Parâmetro opcional para criar (sem id) ou editar (com id)
    element: <CadastroDiaria />,
  },
  {
    path: "*", // Rota coringa para páginas não encontradas
    element: <h3>Página não encontrada!!</h3>,
  },
]);

function App() {
  return (
    <>
      <Cabecalho />
      <RouterProvider router={roteador} />
      <Rodape />
      <ToastContainer />
    </>
  );
}

export default App;

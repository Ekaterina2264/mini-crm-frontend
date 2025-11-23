import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClientsPage } from "./pages/ClientsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

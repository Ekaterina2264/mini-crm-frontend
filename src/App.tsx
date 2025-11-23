import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClientsPage } from "./pages/ClientsPage";
import { ClientDetailsPage } from "./pages/ClientDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* редирект с корня на /clients */}
        <Route path="/" element={<Navigate to="/clients" replace />} />

        {/* список клиентов */}
        <Route path="/clients" element={<ClientsPage />} />

        {/* страница конкретного клиента */}
        <Route path="/clients/:id" element={<ClientDetailsPage />} />

        {/* на случай неверного адреса */}
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

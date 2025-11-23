import { useMemo, useState } from "react";
import { clients as initialClients } from "../data/clients";
import type { Client } from "../types/Client";
import { Link } from "react-router-dom";

type StatusFilter = "all" | Client["status"];

const statusLabels: Record<Client["status"], string> = {
  new: "Новый",
  "in-progress": "В работе",
  done: "Завершен",
};

export const ClientsPage = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");

  const filteredClients = useMemo(() => {
    return initialClients.filter((client) => {
      const matchesStatus =
        statusFilter === "all" ? true : client.status === statusFilter;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0
          ? true
          : client.name.toLowerCase().includes(query) ||
            client.company.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, search]);

  return (
    <div className="app-container">
      <h1 className="page-title">Clients</h1>

      <div className="toolbar">
        <input
          className="input"
          type="text"
          placeholder="Поиск по имени или компании"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
        >
          <option value="all">Все статусы</option>
          <option value="new">Новые</option>
          <option value="in-progress">В работе</option>
          <option value="done">Завершённые</option>
        </select>
      </div>

      {filteredClients.map((client) => (
        <div key={client.id} className="card">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>
                <Link to={`/clients/${client.id}`}>{client.name}</Link>
              </strong>
              <div style={{ fontSize: 14, color: "#555" }}>
                {client.email} · {client.phone}
              </div>
            </div>
            <span className={`status-badge status-${client.status}`}>
              {statusLabels[client.status]}
            </span>
          </div>

          {client.notes && (
            <div style={{ marginTop: 8, fontSize: 14 }}>{client.notes}</div>
          )}
        </div>
      ))}

      {filteredClients.length === 0 && (
        <p>Клиенты не найдены. Попробуйте изменить фильтры.</p>
      )}
    </div>
  );
};

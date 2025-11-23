import { clients } from "../data/clients";

export const ClientsPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Clients</h1>

      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <strong>{client.name}</strong> — {client.company} ({client.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

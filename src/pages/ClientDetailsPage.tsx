import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { clients } from "../data/clients";
import type { Client } from "../types/Client";

type FormState = Omit<Client, "id">;

export const ClientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // ищем клиента по id из URL
  const client = useMemo(() => clients.find((c) => c.id === id), [id]);

  // режим редактирования / просмотра
  const [isEditing, setIsEditing] = useState(false);

  // состояние формы
  const [form, setForm] = useState<FormState>(() => {
    if (!client) {
      return {
        name: "",
        company: "",
        email: "",
        phone: "",
        status: "new",
        notes: "",
      };
    }

    const { name, company, email, phone, status, notes = "" } = client;
    return { name, company, email, phone, status, notes };
  });

  // если клиента нет
  if (!client) {
    return (
      <div className="details-page">
        <div className="details-card">
          <p>Клиент не найден.</p>
          <button
            type="button"
            className="btn-secondary back-btn"
            onClick={() => navigate("/clients")}
          >
            ← Назад к списку
          </button>
        </div>
      </div>
    );
  }

  // обработчик изменения полей формы
  const handleChange =
    (field: keyof FormState) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // тут можно будет отправлять данные на сервер
    console.log("Сохраняем клиента: ", { id: client.id, ...form });

    setIsEditing(false);
  };

  const handleCancel = () => {
    // откат к исходным данным
    const { name, company, email, phone, status, notes = "" } = client;
    setForm({ name, company, email, phone, status, notes });
    setIsEditing(false);
  };

  return (
    <div className="details-page">
      <div className="details-card">
        <button
          type="button"
          className="btn-secondary back-btn"
          onClick={() => navigate("/clients")}
        >
          ← Назад к списку
        </button>

        <h1 className="details-title">{client.name}</h1>

        {!isEditing ? (
          <>
            <dl className="details-list">
              <div className="details-row">
                <dt>Компания</dt>
                <dd>{client.company}</dd>
              </div>

              <div className="details-row">
                <dt>Email</dt>
                <dd>{client.email}</dd>
              </div>

              <div className="details-row">
                <dt>Телефон</dt>
                <dd>{client.phone}</dd>
              </div>

              <div className="details-row">
                <dt>Статус</dt>
                <dd>{client.status}</dd>
              </div>

              {client.notes && (
                <div className="details-row">
                  <dt>Заметки</dt>
                  <dd>{client.notes}</dd>
                </div>
              )}
            </dl>

            <button
              type="button"
              className="btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </button>
          </>
        ) : (
          <form className="details-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label className="field">
                <span>Имя</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                />
              </label>

              <label className="field">
                <span>Компания</span>
                <input
                  type="text"
                  value={form.company}
                  onChange={handleChange("company")}
                />
              </label>

              <label className="field">
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                />
              </label>

              <label className="field">
                <span>Телефон</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                />
              </label>

              <label className="field">
                <span>Статус</span>
                <select value={form.status} onChange={handleChange("status")}>
                  <option value="new">Новый</option>
                  <option value="in-progress">В работе</option>
                  <option value="done">Завершён</option>
                </select>
              </label>

              <label className="field field-notes">
                <span>Заметки</span>
                <textarea value={form.notes} onChange={handleChange("notes")} />
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Сохранить
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancel}
              >
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

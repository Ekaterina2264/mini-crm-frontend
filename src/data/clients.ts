import type { Client } from "../types/Client";

export const clients: Client[] = [
  {
    id: "1",
    name: "Иван Петров",
    company: "СтройПроф",
    email: "ivan.petrov@example.com",
    phone: "+7 999 222-33-11",
    status: "new",
    notes: "Хочет расчёт фасада",
  },
  {
    id: "2",
    name: "Анна Смирнова",
    company: "РемСтрой",
    email: "anna.smirnova@example.com",
    phone: "+7 900 111-22-33",
    status: "in-progress",
    notes: "Перезвонить завтра",
  },
  {
    id: "3",
    name: "Екатерина Соколова",
    company: "ФасадЭксперт",
    email: "ek.sokolova@example.com",
    phone: "+7 901 555-44-32",
    status: "done",
    notes: "Успешно завершено",
  },
];

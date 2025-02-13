import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("todo", { migrations: "./migrations" });

interface Todo {
  title: string;
  completed: boolean;
}

interface ListResponse {
  todos: Todo[];
}

// `list` retrieves all todo items
export const list = api(
  { expose: true, method: "GET", path: "/todo" },
  async (): Promise<ListResponse> => {
    const rows = db.query`
        SELECT title, completed
        FROM todo
        `;
    const todos: Todo[] = [];
    for await (const row of rows) {
      todos.push({ title: row.title, completed: row.completed });
    }
    return { todos };
  }
);

// `create` inserts a new item into the table
export const create = api(
  { expose: true, method: "POST", path: "/todo" },
  async ({ title, completed }: Todo): Promise<Todo> => {
    await db.exec`
        INSERT INTO todo (title, completed)
        VALUES (${title}, ${completed})
    `;
    return { title, completed };
  }
);

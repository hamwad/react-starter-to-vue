import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("todo", { migrations: "./migrations" });

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

interface ListResponse {
  todos: Todo[];
}

// `list` retrieves all todo items
export const list = api(
  { expose: true, method: "GET", path: "/todo" },
  async (): Promise<ListResponse> => {
    const rows = db.query`
        SELECT id, title, done
        FROM todo
        `;
    const todos: Todo[] = [];
    for await (const row of rows) {
      todos.push({ id: row.id, title: row.title, done: row.done });
    }
    return { todos };
  }
);

// `create` inserts a new item into the table
export const create = api(
  { expose: true, method: "POST", path: "/todo" },
  async ({ id, title, done }: Todo): Promise<Todo> => {
    await db.exec`
        INSERT INTO todo (id, title, done)
        VALUES (${id}, ${title}, ${done})
    `;
    return { id, title, done };
  }
);

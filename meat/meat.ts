import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

// 'meat' database is used to store the meats that are being shortened.
const db = new SQLDatabase("meat", { migrations: "./migrations" });

interface Meat {
  id: string;
  meat_name: string;
}

export const create = api(
  { expose: true, auth: false, method: "POST", path: "/meat" },
  async ({ id, meat_name }: Meat): Promise<Meat> => {
    await db.exec`
        INSERT INTO meat (id, meat_name)
        VALUES (${id}, ${meat_name})
    `;
    return { id, meat_name };
  }
);

import connection from "../../src/database";

export async function clearDatabase() {
  await connection.query(`TRUNCATE items RESTART IDENTITY`);
}

export async function closeConnection() {
  await connection.end();
}

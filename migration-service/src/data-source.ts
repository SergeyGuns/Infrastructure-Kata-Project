import { DataSource } from "typeorm";
import { resolve } from "path";
import { Migration002AddNameToUsers } from "./migrations/002MigrationAddNameToUsers";
import { Migration001InitialSchema } from "./migrations/001MigrationInitialSchema";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "postgres",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "kata_db",
  synchronize: false,
  logging: true,
  migrations: [ Migration001InitialSchema, Migration002AddNameToUsers],
});
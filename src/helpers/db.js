import knex from "knex";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "db.sqlite",
  },
  useNullAsDefault: true,
});

const createTables = async () => {
  const notesTableExist = await db.schema.hasTable("notes");
  if (!notesTableExist) {
    await db.schema.createTable("notes", (table) => {
      table.increments("id").primary();
      table.string("title");
      table.string("content");
      table.timestamps();
    });
  }
};

createTables();

export default db;

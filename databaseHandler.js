import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import fs from "node:fs";

export default class DatabaseHandler {
  dataSql = fs.readFileSync("leagueStatDBFe.sql").toString();
  /**@type {Database} */
  db;

  constructor() { }

  static async init() {
    const handler = new DatabaseHandler();

    const dbExists = fs.existsSync("./database.db");
    if (!dbExists) {
      // Create and initialize DB
      fs.writeFileSync("./database.db", ""); // ensure file exists
    }

    handler.db = await open({
      filename: "database.db",
      driver: sqlite3.Database,
    });

    if (!dbExists) {
      await handler.db.exec(handler.dataSql);
    }

    return handler;
  }

  async addRecord(data) {
    const { puuid, games, wins, losses, date } = data;
    await this.db.run(
      `INSERT INTO records (puuid, games, wins, losses, date) VALUES (?, ?, ?, ?, ?)`,
      [puuid, games, wins, losses, date],
    );
    return "Record inserted";
  }

  async getAllRecords() {
    return await this.db.all("SELECT * FROM records");
  }

  async getRecordsByPuuid(puuid) {
    const records = await this.db.all("SELECT * FROM records WHERE puuid = ?", [
      puuid,
    ]);
    if (!records) throw new Error("No records found");
    return records;
  }
}

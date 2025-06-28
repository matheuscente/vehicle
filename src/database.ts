import Database from "better-sqlite3";
import { DbManager } from "./dbUtils/database.utils";

const database = new Database('teste.db')
database.pragma('journal_mode = WAL')

 const dbManager = new DbManager()
 dbManager.createAllTables(database)


 export default database

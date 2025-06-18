import Database from "better-sqlite3";
export class DB {
  db: Database.Database;
  constructor() {
    this.db = new Database("teste.db");
    this.db.pragma("journal_mode = WAL");
  }

  private createTable(
    tableName: string,
    settings: string
  ): { success: true } | { success: false; error: Error } {
    try {
      this.db
        .prepare(
          `
                CREATE TABLE IF NOT EXISTS ${tableName} (
                ${settings}
            )
                `
        )
        .run();
      return { success: true };
    } catch (err) {
        return { success: false, error: (err as Error) };
    
    }
  }

  init(): { success: true } | { success: false; error: Error } {
    try {
      const vehicle = this.createTable(
        "vehicle",
        `   
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                placa TEXT UNIQUE NOT NULL,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    ano_fabricacao INT NOT NULL`
      );

      const car = this.createTable(
        "car",
        `
         id INTEGER PRIMARY KEY,
        num_portas INTEGER NOT NULL,
    combustivel TEXT NOT NULL,
    CONSTRAINT fk_carro_veiculo FOREIGN KEY (id)
        REFERENCES vehicle(id)
        ON DELETE CASCADE`
      );

      const bus = this.createTable(
        "bus",
        `
         id INTEGER PRIMARY KEY,

        num_assentos INTEGER NOT NULL,
    tem_banheiro BOOLEAN NOT NULL,
    CONSTRAINT fk_onibus_veiculo FOREIGN KEY (id)
        REFERENCES vehicle(id)
        ON DELETE CASCADE`
      );

      const moto = this.createTable(
        "moto",
        `  
         id INTEGER PRIMARY KEY,
        cilindradas INTEGER NOT NULL,
    tipo_partida TEXT NOT NULL,
    CONSTRAINT fk_moto_veiculo FOREIGN KEY (id)
        REFERENCES vehicle(id)
        ON DELETE CASCADE`
      );

      if('error' in car){
        return car
      } else if ('error' in bus){
        return bus
      } else if ('error' in moto){
        return moto
      }else if ('error' in vehicle){
        return vehicle
      }

      const allTables = this.db
        .prepare("SELECT name FROM sqlite_master WHERE type='table';")
        .all();
        const acceptNames: string[] = [
        "vehicle",
        "bus",
        "moto",
        "car",
        "sqlite_sequence",
      ];

      const hasErrors = allTables.filter(
        (table) => !acceptNames.includes((table as { name: string }).name)
      );
      if (hasErrors.length >= 1 || allTables.length < 5) {
        return { success: false, error: new Error("invalid table name") };
      }
      return { success: true };
    } catch (err) {
        return { success: false, error: (err as Error) };
      
    }
  }
}


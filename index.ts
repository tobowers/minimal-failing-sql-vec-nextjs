import * as sqliteVec from "sqlite-vec";
import { Database } from 'bun:sqlite';
import { join } from 'path';

Database.setCustomSQLite("/opt/homebrew/Cellar/sqlite/3.46.0/lib/libsqlite3.dylib");

export const getDatabase = (path: string) => {
  const db = new Database(path);
  db.exec("PRAGMA journal_mode = WAL;");

  sqliteVec.load(db);
  const { vec_version } = db.prepare("select vec_version() as vec_version;").get() as any;
  console.log(`vec_version=${vec_version}`);

  return db;
}

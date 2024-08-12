"use server";
import Database from 'better-sqlite3';
import * as sqliteVec from "sqlite-vec";

export const getDatabase = (path: string) => {
  const db = new Database(path);
  // db.pragma('journal_mode = WAL');
  sqliteVec.load(db);
  const { vec_version } = db.prepare("select vec_version() as vec_version;").get() as any;
  console.log(`vec_version = ${ vec_version }`);

  return db;
}

export default async function Home() {
  try {
    const db = getDatabase(":memory:");

    console.log("db", db);
  
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table';").all();
    console.log("Tables in the database:", tables);

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>tables: {JSON.stringify(tables, null, 2)}</p>
      </main>
    );
  } catch (err) {
    console.error(err);
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>It did not work</p>
      </main>
    );
  }
 
}

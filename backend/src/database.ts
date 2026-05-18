import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '..', 'tasks.db');
export const db = new sqlite3.Database(dbPath);

export function initDatabase() {
  db.serialize(() => {
    // Tasks table
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pending',
        priority TEXT DEFAULT 'medium',
        dueDate TEXT,
        qrCode TEXT UNIQUE,
        familyId TEXT,
        createdBy TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        completedAt DATETIME,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Families table
    db.run(`
      CREATE TABLE IF NOT EXISTS families (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Family members table
    db.run(`
      CREATE TABLE IF NOT EXISTS family_members (
        id TEXT PRIMARY KEY,
        familyId TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT,
        role TEXT DEFAULT 'member',
        joinedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(familyId) REFERENCES families(id)
      )
    `);

    console.log('✅ Database initialized');
  });
}

export function runAsync(sql: string, params: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

export function getAsync(sql: string, params: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function allAsync(sql: string, params: any[] = []): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}

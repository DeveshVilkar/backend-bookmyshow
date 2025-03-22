const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');

const db = new sqlite3.Database('./bookmyshow.db', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
    db.run(`
      CREATE TABLE IF NOT EXISTS movies (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        poster TEXT,
        rating REAL,
        votes INTEGER,
        content_rating TEXT,
        languages TEXT,
        status TEXT,
        available_formats TEXT,
        length TEXT,
        genre TEXT,
        release_date TEXT,
        description TEXT
      )
    `);
    
    db.run(`
      CREATE TABLE IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY,
        movie_id TEXT,
        user_id TEXT,
        rating REAL,
        hashtags TEXT,
        review_text TEXT,
        posted_date TEXT DEFAULT (datetime('now')),
        likes INTEGER DEFAULT 0,
        dislikes INTEGER DEFAULT 0,
        FOREIGN KEY (movie_id) REFERENCES movies(id)
      )
    `);
  }
});

module.exports = db;
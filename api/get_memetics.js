import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  try {
    // Traemos los datos directamente de Neon
    const memetics = await pool.query('SELECT * FROM memetics ORDER BY name ASC');
    const groups = await pool.query('SELECT * FROM groups ORDER BY id ASC');

    res.status(200).json({
      memetics: memetics.rows,
      groups: groups.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

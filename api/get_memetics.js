import pg from 'pg';
const { Pool } = pg;

// Conector a Neon usando la variable de entorno
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  try {
    // Obtenemos los datos de las dos tablas
    const memeticsRes = await pool.query('SELECT * FROM memetics');
    const groupsRes = await pool.query('SELECT * FROM groups ORDER BY id ASC');

    // Estructuramos la data para que el index.html la entienda
    const groups = {};
    const groupMeta = {};

    groupsRes.rows.forEach(g => {
      groupMeta[g.id] = { title: g.name, color: g.color || 'text-amber-500' };
      groups[g.id] = memeticsRes.rows
        .filter(m => m.group_id === g.id)
        .map(m => ({
          name: m.name,
          desc: m.description,
          levels: m.levels,
          image: m.image
        }));
    });

    res.status(200).json({ groups, groupMeta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

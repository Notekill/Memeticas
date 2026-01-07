const { Client } = require('pg');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const client = new Client({ connectionString: process.env.DATABASE_URL });
    const item = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    try {
        await client.connect();
        await client.query(
            `INSERT INTO memetics (id, group_id, name, description, levels)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (id) DO UPDATE SET
             group_id = EXCLUDED.group_id, 
             name = EXCLUDED.name, 
             description = EXCLUDED.description, 
             levels = EXCLUDED.levels`,
            [item.id, item.group_id, item.name, item.description, item.levels]
        );
        res.status(200).send("Guardado");
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await client.end();
    }
}
const { Client } = require('pg');

export default async function handler(req, res) {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    try {
        await client.connect();
        const groups = await client.query('SELECT * FROM groups ORDER BY id');
        const memetics = await client.query('SELECT * FROM memetics ORDER BY name');
        res.status(200).json({ 
            groups: groups.rows, 
            memetics: memetics.rows 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await client.end();
    }
}
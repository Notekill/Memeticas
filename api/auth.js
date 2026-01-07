const { Client } = require('pg');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Solo POST');

    const client = new Client({ connectionString: process.env.DATABASE_URL });
    const { user, pass } = req.body;

    try {
        await client.connect();
        // LOGIN CONFIGURADO: electro995 / electro995
        if (user === 'electro995' && pass === 'electro995') { 
            return res.status(200).json({ auth: true });
        } else {
            return res.status(401).json({ auth: false });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    } finally {
        await client.end();
    }
}

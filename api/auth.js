const { Client } = require('pg');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Método no permitido');

    const client = new Client({ connectionString: process.env.DATABASE_URL });
    const { user, pass } = req.body;

    try {
        await client.connect();
        
        // CAMBIO CRÍTICO: Ahora la contraseña es 'electro995'
        if (user === 'electro995' && pass === 'electro995') { 
            res.status(200).json({ auth: true });
        } else {
            res.status(401).json({ auth: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await client.end();
    }
}

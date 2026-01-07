const { Client } = require('pg');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const client = new Client({ connectionString: process.env.DATABASE_URL });
    
    // En Vercel, el body ya viene como objeto si envías JSON
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { user, pass } = body;

    try {
        await client.connect();
        // Usa tus credenciales: electro995
        if (user === 'electro995' && pass === 'tu_password_aqui') { 
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
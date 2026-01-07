import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const sql = neon(process.env.DATABASE_URL);
    const { id, name, desc, image, auth_token } = req.body;

    // Validación de seguridad: Verifica que el usuario esté logueado
    if (auth_token !== 'is_admin_true') {
        return res.status(401).json({ error: "No autorizado" });
    }

    try {
        // Actualiza el nombre, descripción e imagen en la tabla memetics
        await sql`
            UPDATE memetics 
            SET name = ${name}, "desc" = ${desc}, image = ${image}
            WHERE id = ${id}
        `;
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al guardar en Neon" });
    }
}

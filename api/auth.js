export default function handler(req, res) {
  const { user, pass } = req.body;

  // IMPORTANTE: Los nombres deben coincidir con Vercel
  const validUser = process.env.ADMIN_USER;
  const validPass = process.env.ADMIN_PASS;

  if (user === validUser && pass === validPass) {
    return res.status(200).json({ auth: true });
  } else {
    // Esto es lo que ves en el alert cuando falla
    return res.status(401).json({ auth: false, error: "Acceso Denegado" });
  }
}

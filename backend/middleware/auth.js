import jwt from "jsonwebtoken";

export default function auth(req,res,next){

  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json({ error:"No token" });

  try {

    const token = header.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret123"
    );

    req.user = decoded;

    next();

  } catch {
    res.status(401).json({ error:"Invalid token" });
  }
}

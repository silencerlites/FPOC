// middleware/authenticate.js (your current middleware)
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Invalid token format' });

  const db = readDb();
  const userId = Buffer.from(token, 'base64').toString('ascii');
  const user = db.users.find(u => u.id == userId);

  if (!user) return res.status(403).json({ message: 'Invalid token' });

  req.user = user;
  next();
};

export default authenticate;

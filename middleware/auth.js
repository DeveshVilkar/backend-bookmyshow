// Simple admin check (you can enhance this with JWT or other auth methods)
const isAdmin = (req, res, next) => {
  // For now, using a simple header check. In production, use proper auth
  if (req.headers["x-admin-key"] === "admin123") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

module.exports = { isAdmin };

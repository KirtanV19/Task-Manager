module.exports = (req, res, next) => {
  if (req.method === "POST") {
    if (req.path === "/auth/login") {
      return res.status(200).json({ message: "User registered successfully" });
    }

    if (req.path === "/auth/register") {
      return res.status(200).json({ message: "User registered successfully" });
    }

    if (req.path === "/auth/forgot-password") {
      return res.status(200).json({ message: "Reset email sent" });
    }
  }

  next();
};

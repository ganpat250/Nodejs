import jwt from "jsonwebtoken";
export const login = (req, res) => {
  const { username, password } = req.body;
  const correctUser = "admin";
  const correctPass = "123";
  if (username !== correctUser || password !== correctPass) {
    return res.status(401).json({
      message: "❌Access denied❌",
      details: "Wrong username or password!!!",
    });
  }
  const token = jwt.sign(
    {
      username: username,
      role: "admin",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10Min",
    }
  );
  res.status(200).json({
    message: "✅Login successfully✅",
    token: token,
  });
};

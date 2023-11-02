export const signIn = async (req, res) => {
  const { email, password } = req.body;

  //   const hashPassword = await bcrypt.hash(password, SALT);

  res.status(200).json({
    email: email,
    status: "loged in",
  });
};
export const signUp = async (req, res) => {
  const { email, password } = req.body;

  res.status(201).json({
    email: email,
    status: "registered",
  });
};

export const currentUser = async (req, res) => {
  const { email } = req.user || { email: "unauthorized" };

  res.status(200).json({
    email: email,
  });
};

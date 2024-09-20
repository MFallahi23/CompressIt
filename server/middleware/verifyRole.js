const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role) {
      return res.sendStatus(401);
    }
    const role = req.role;
    console.log(role);

    const roles = [...allowedRoles];
    if (!roles.includes(role)) return res.sendStatus(401);
    next();
  };
};

export default verifyRole;

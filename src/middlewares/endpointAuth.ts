import { Request, Response, NextFunction } from "express";

function endpointAuth(requiredRoles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    const { user, admin } = req.session;
    // ADMIN
    if (requiredRoles.includes("admin") && admin) {
      return next();
    }
    // USERS
    if (user) {
      const { rol } = user;
      if (requiredRoles.includes(rol)) {
        return next();
      }
    }

    return res.status(403).json({ message: "Unauthorized" });
  };
}

export default endpointAuth;

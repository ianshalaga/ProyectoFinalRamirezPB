import { Request, Response } from "express";
import { mailService, userService } from "../services/services";
import { successStatus, failureStatus } from "../utils/statuses";
import { DbUser } from "../interfaces/user.interface";
import { password } from "../utils/mailing";
import { createHash, isValidPassword } from "../utils/passwordHashing";
import { generatePasswordResetToken } from "../utils/resetToken";
import config from "../config/env.config";
import { MulterFiles } from "../interfaces/file.interface";
import fs from "fs";
import ApiUsersDTO from "../dao/dto/apiUsers.dto";

class UserController {
  constructor() {}

  /** CREATE */

  /** READ */

  // @@@@
  async getAllUsers(req: Request, res: Response) {
    try {
      const dbUsers: DbUser[] = await userService.getAllUsers();
      const users = new ApiUsersDTO(dbUsers);
      res.status(200).json(users);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  /** UPDATE */

  // @@@@
  async updateUserRolById(req: Request, res: Response) {
    try {
      const uid: string = req.params.uid;
      const dbUser: DbUser = await userService.getUserById(uid);
      const requiredDocuments = [
        "identificacion",
        "comprobante-domicilio",
        "comprobante-estado-cuenta",
      ];
      let rol = "";
      // user -> premium
      if (dbUser.rol === "user") {
        const userDocuments = dbUser.documents.map((doc) =>
          doc.name.split(".").slice(0, -1).join(".")
        );
        const hasAllDocuments = requiredDocuments.every((doc) =>
          userDocuments.includes(doc)
        );
        if (hasAllDocuments) {
          rol = "premium";
        } else {
          return res.status(400).json({
            message: "El usuario no ha terminado de procesar su documentación.",
          });
        }
      }
      // premium -> user
      if (dbUser.rol === "premium") {
        rol = "user";
      }
      await userService.updateUserRolById(uid, rol);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async createNewPasswordUser(req: Request, res: Response) {
    try {
      const { password } = req.body;
      const token: string = req.query.token as string;
      const dbUser: DbUser = await userService.getUserByToken(token);
      if (!dbUser || dbUser.resetTokenExpires < Date.now()) {
        res.render("resetPassword", {
          title: "Reset Password",
          style: "app.css",
        });
      }
      if (isValidPassword(dbUser, password)) {
        req.logger.error("You can't use the same password than before.");
        return res
          .status(400)
          .json({ message: "You can't use the same password than before." });
      }
      await userService.updateUserPasswordByToken(token, createHash(password));
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async uploadDocumentsByIdUser(req: Request, res: Response) {
    try {
      // const linkBase: string = "http://localhost:8080/uploads/";
      const linkBase: string =
        "https://proyectofinalramirezpb-production.up.railway.app/uploads/";

      const uid: string = req.params.uid;
      const dbUser: DbUser = await userService.getUserById(uid);
      if (!dbUser) {
        return res.status(400).json({ message: "Usuario no encontrado." });
      }

      const files = req.files as MulterFiles;
      if (!files) {
        return res
          .status(400)
          .json({ message: "No fue subido ningún archivo." });
      }

      const currentDocumentsName = dbUser.documents.map((doc) => doc.name);
      const newDocuments = [];

      Object.keys(files).forEach((field) => {
        files[field].forEach((file) => {
          if (!currentDocumentsName.includes(file.originalname)) {
            newDocuments.push({
              name: file.originalname,
              reference: `${linkBase}${file.fieldname}/${file.filename}`,
            });
          } else {
            fs.unlink(file.path, (error) => {
              if (error) {
                res.json(failureStatus(error.message));
              }
            });
          }
        });
      });

      if (newDocuments.length > 0) {
        await userService.addDocumentsById(uid, newDocuments);
      }

      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async resetPasswordUser(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const { token, expires } = generatePasswordResetToken();
      await userService.updateUserTokenByEmail(email, token, expires);
      await mailService.googleMailService(
        email,
        password.subject,
        // `<a href="http://localhost:${config.port}/create-new-password?token=${token}"><button>Recuperar contraseña</button></a>`
        `<a href="https://proyectofinalramirezpb-production.up.railway.app/create-new-password?token=${token}"><button>Recuperar contraseña</button></a>`
      );
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  /** DELETE */

  // @@@@
  async deleteDocumentsByIdUser(req: Request, res: Response) {
    try {
      const uid: string = req.params.uid;
      await userService.deleteDocumentsByIdUser(uid);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async clearInactiveUsers(req: Request, res: Response) {
    try {
      const timeNowMilliseconds = new Date().getTime();
      const twoDaysMilliseconds = 2 * 24 * 60 * 60 * 1000;
      const dbUsers: DbUser[] = await userService.getAllUsers();
      for (let i = 0; i < dbUsers.length; i++) {
        if (dbUsers[i].last_connection != null) {
          if (
            timeNowMilliseconds -
              new Date(dbUsers[i].last_connection).getTime() >
            twoDaysMilliseconds
          ) {
            await userService.deleteUserByIdUser(dbUsers[i]._id);
            await mailService.googleMailService(
              dbUsers[i].email,
              "Cuenta eliminada por inactividad",
              "<p>Estimado usuario, su cuenta ha sido eliminada por estar inactiva por más de dos días.</p>"
            );
          }
        }
      }
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async deleteUserByIdUser(req: Request, res: Response) {
    try {
      const uid: string = req.params.uid;
      await userService.deleteUserByIdUser(uid);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }
}

export default new UserController();

import { Router } from "express";
import userController from "../controllers/user.controller";
import endpointAuth from "../middlewares/endpointAuth";
import { uploadFields } from "../middlewares/uploadFields";

const usersRouter: Router = Router();

/** POST ENPOINTS */
usersRouter.post(
  "/:uid/documents",
  uploadFields,
  userController.uploadDocumentsByIdUser
);

/** PUT ENPOINTS */
usersRouter.put(
  "/premium/:uid",
  endpointAuth(["admin"]),
  userController.updateUserRolById
);
usersRouter.put("/reset-password", userController.resetPasswordUser);
usersRouter.put("/create-new-password", userController.createNewPasswordUser);

/** DELETE ENPOINTS */
usersRouter.delete("/:uid/documents", userController.deleteDocumentsByIdUser);

export default usersRouter;

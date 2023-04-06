import { Router } from "express";
import {
  contactCreateController,
  contactDeleteController,
  contactGetIdController,
  contactListController,
  contactUpdateController,
} from "../controllers/contact.controller";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.middleware";

const routerContact = Router();

routerContact.post("", verifyTokenMiddleware, contactCreateController);
routerContact.get("", verifyTokenMiddleware, contactListController);
routerContact.get("/:id", verifyTokenMiddleware, contactGetIdController);
routerContact.delete("/:id", verifyTokenMiddleware, contactDeleteController);
routerContact.patch("/:id", verifyTokenMiddleware, contactUpdateController);

export default routerContact;

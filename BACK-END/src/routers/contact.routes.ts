import { Router } from "express";
import {
  contactCreateController,
  contactDeleteController,
  contactListController,
  contactUpdateController,
} from "../controllers/contact.controller";

const routerContact = Router();

routerContact.post("", contactCreateController);
routerContact.get("", contactListController);
routerContact.delete("/:id", contactDeleteController);
routerContact.patch("/:id", contactUpdateController);

export default routerContact;

import { Router } from "express";
import {
  userActivatedController,
  userCreateController,
  userdisabledController,
  userIdController,
  userListController,
  userUpdateController,
} from "../controllers/user.controller";

const routerUser = Router();

routerUser.post("", userCreateController);
routerUser.get("", userListController);
routerUser.get("/:id", userIdController);
routerUser.delete("/:id", userdisabledController);
routerUser.patch("/:id/activated", userActivatedController);
routerUser.patch("/:id", userUpdateController);

export default routerUser;

import express, { json } from "express";
import "express-async-errors";
import errorHandler from "./errors/errorHandle";
import routerContact from "./routers/contact.routes";
import routerLogin from "./routers/login.routes";
import routerUser from "./routers/user.routes";

const app = express();

app.use(json());
app.use("/user", routerUser);
app.use("/login", routerLogin);
app.use("/contact", routerContact);

app.use(errorHandler);

export default app;

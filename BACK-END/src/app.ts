import express, { json } from "express";
import routerContact from "./routers/contact.routes";
import routerLogin from "./routers/login.routes";
import routerUser from "./routers/user.routes";

const app = express();

app.use(json());
app.use("/user", routerUser);
app.use("/login", routerLogin);
app.use("/contact", routerContact);

export default app;

import "dotenv/config";
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import "dotenv/config";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(express.json());
console.log(process.env.FRONTEND_URL)  
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
 
  );
  const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
console.log(process.env.FRONTEND_URL)
app.use(session(sessionOptions));
console.log(CONNECTION_STRING)  


UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
HelloRoutes(app);

app.listen(process.env.PORT || 4000);
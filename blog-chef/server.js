import express from "express";
import compression from "compression";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import morgan from "morgan";
import session, { Cookie } from "express-session";
import protectRoute from "./utils/protectRoute.js";
import home from "./routes/home/home.js";
import admin from "./routes/admin/index.js";
import api from "./routes/api/index.js";
import connectToDb from "./db/index.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/assets", express.static(join(__dirname, "public")));

//configure application level middlewares
app.use(compression());
app.use(morgan(":method - :url - :date - :response-time ms"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "pug");

app.use(
  "/admin",
  session({
    name: "sessId", //cookie name to be set in the user's browser
    resave: false, //
    saveUninitialized: true,
    secret: process.env.sessionSecret,
    cookie: {
      httpOnly: true,
      maxAge: 18000000,
      secure: app.get("env") === "production" ? true : false,
    },
  })
);

//mounts the middleware functions to specific routes
app.use("/", home);
app.use("/admin", admin);
app.use("/api", api);

//instantiate database before the Express server goes online
Promise.all([connectToDb()])
  .then(() =>
    app.listen(3000, () =>
      console.log(
        "express started on http://localhost:3000; press ctrl-c to terminate."
      )
    )
  )
  .catch((error) => {
    console.error("mongoDB atlas error: ${error}");
    process.exit();
  });

//should be written at the bottom of the script...
//custom 404 page
// app.use(function(req, res, next){
//     res.type('text/plain');
//     res.status(500);
//     res.send('404 - not found');
// })

// app.use(function(req, res){
//     res.type('text/plain');
//     res.status(404);
//     res.send('404 - Not Found');
// });

// app.use(function(err, req, res, next){
//     console.error(err.stack);
//     res.type('text/plain');
//     res.status(500);
//     res.send('500 - server error');
// });

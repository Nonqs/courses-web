const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const session = require("express-session");
const cookieParser = require("cookie-parser")
const MySQLStore = require('express-mysql-session')(session);
const passport = require("passport")

const app = express()


// Middlewares


const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: 'Jctmjj1543**',
  database: "courses"
};

const sessionStore = new MySQLStore(options);
module.exports.sessionStore = sessionStore;

app.use(cookieParser())
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
  }
  })
)
app.set('trust proxy', 1);
app.use(cors({
  origin: true,
  credentials: true
}))
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));


// Optionally use onReady() to get a promise that resolves when store is ready.
sessionStore.onReady().then(() => {
  // MySQL session store ready for use.
  console.log('MySQLStore ready');


}).catch(error => {
  // Something went wrong.
  console.error(error);
});

// Routes

app.use(require("./routes/auth.routes.js"))
app.use(require("./routes/courses.routes.js"))

// Server listen

app.listen(3000)
console.log("server listen")
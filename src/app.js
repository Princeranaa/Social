const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("../src/routes/auth.routes")
const postRoutes = require("../src/routes/post.routes");

/* middlewares */
app.use(cookieParser());
app.use(express.json());


/* mounted routes */
app.use("/api/auth", authRoutes)
app.use("/api/post", postRoutes)


module.exports = app;

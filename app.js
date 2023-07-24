// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
// const todolistRouter = require("./routes/todolist");

// var app = express();

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/todolist", todolistRouter); // 为todolist路由添加前缀
// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// module.exports = app;
const express = require("express");

const mysql = require("mysql");
const cors = require("cors");
const app = express();

const port = 3000;

/**连接数据库 */
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0990lk",
  database: "todolist",
});
connection.connect((err) => {
  if (err) {
    console.log(err + "数据库连接失败" + err.stack);
    return;
  }
  console.log("数据库连接成功" + "/n");
});

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("connect success");
});
// 数据库查询操作部分
app.get("/todos", (req, res) => {
  //console.log("connect success");
  connection.query("SELECT * from mylist ", (err, results) => {
    if (err) {
      console.log(err + err.stack);
      res.status(500).send("数据库查询失败");
      return;
    }
    // 2s后返回数据
    setTimeout(() => {
      res.status(200).send(results);
    }, 500);
  });
});

// 插入数据
app.post("/todos", (req, res) => {
  console.log(req.body);
  const { text, done, time } = req.body;
  console.log(text, done, time);
  const sqlStr = `INSERT INTO mylist (text,done,time) VALUES ('${text}',${done},'${time}')`;
  connection.query(sqlStr, (err, results) => {
    if (err) {
      console.log("err" + err.message);
      res.status(err.code).json({ message: "数据库插入失败" });
      return;
    }
    res.status(200).send(results);
  });
});
// 删除数据
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const sqlStr = `DELETE FROM mylist WHERE id = ${id}`;
  connection.query(sqlStr, (err, results) => {
    if (err) {
      console.log(err.message);
      res.status(err.code).json({ message: "删除失败" });
    }
    res.status(200).send({ message: "删除成功" });
  });
});
// 更新数据
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  console.log(id, done);
  const sqlStr = `UPDATE mylist SET done = ${done} WHERE id = ${id}`;
  connection.query(sqlStr, (err, results) => {
    if (err) {
      console.log(err.message);
      res.status(err.code).json({ message: "更新失败" });
    }
    res.status(200).send({ message: "更新成功" });
  });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

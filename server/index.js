const express = require("express");
// const assert = require('http-assert')
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(require("cors")());
app.use("/uploads", express.static(__dirname + "/uploads")); //静态文件
app.use("/admin", express.static(__dirname + "/admin")); //静态文件
app.use("/", express.static(__dirname + "/web")); //静态文件

// 中间件处理token
app.use("/admin/api", async (req, res, next) => {
    const token = String(req.headers.authorization).split(" ").pop();
    if (token == "undefined") {
        return res.status(401).send({
            message: "请先登录",
        });
    } else {
        const {
            id
        } = jwt.verify(token, app.get("secret"));
        if (id == "undefined") {
            return res.status(401).send({
                message: "请先登录",
            });
        }
    }
    await next();
});

require("./routes/admin/articles")(app);
require("./routes/web/articles")(app);
require("./routes/admin/comments")(app);
require("./routes/web/comments")(app);
require("./routes/admin/messages")(app);
require("./routes/web/messages")(app);
require("./routes/admin/notices")(app);
require("./routes/web/notices")(app);
require("./routes/admin/informations")(app);
require("./routes/web/informations")(app);
require("./routes/admin/links")(app);
require("./routes/web/links")(app);
require("./routes/admin/admins")(app);
require("./routes/admin/login")(app);
require("./routes/admin/life")(app);
require("./routes/web/life")(app);
require("./routes/web/commentReply")(app);
require("./routes/web/messageReply")(app);
require("./routes/admin/commentReply")(app);
require("./routes/admin/messageReply")(app);

app.set("secret", "jfdsijf^&T(&UGFU0y80ydsf08;.]s.f");

// 上传文件接口
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/uploads");
    },
    // filename: function (req, file, cb) {
    //   cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    // },
});
const upload = multer({
    storage: storage,
});
app.post("/admin/api/upload", upload.single("file"), async (req, res) => {
    // console.log(req.file)
    const file = req.file;
    file.url = `http://localhost:3002/uploads/${file.filename}`;
    res.send(file);
});

app.listen(3002, () => {
    console.log("http://localhost:3002/");
});
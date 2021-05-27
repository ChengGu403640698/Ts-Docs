const express = require('express')
const app = express()
const port = 1022
let data = [];
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type")
    next();
});
app.use(express.static('dist'));
app.get("/", (req, res) => {
    res.sendFile("dist/index.html", { root: __dirname });
})
app.get("/getTodoAppData", (req, res) => {
    res.send([]);
})
app.listen(port, () => {
    console.log(`the server is listening port --${port}`);
})
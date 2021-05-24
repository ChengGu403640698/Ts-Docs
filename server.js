const express = require('express')
const app = express()
const port = 1022
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express.static('dist'));
app.get("*", (req, res) => {
    res.sendFile("dist/index.html", { root: __dirname });
})
app.listen(port, () => {
    console.log(`the server is listening port --${port}`);
})
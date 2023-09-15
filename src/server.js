require("express-async-errors");
const AppError = require("./utils/AppError");
const express = require('express');
const routes = require("./routes");
const app = express();



const PORT = 3000;
app.use(express.json());
app.use(routes);
app.use((error, req, res, next) => {
    if(error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error);

    return res.status(500).json({
        status: "error",
        message: "internal server error"
    })
});

app.listen(PORT, () => {
    console.log(`rodando em http://localhost:${PORT}`);
})
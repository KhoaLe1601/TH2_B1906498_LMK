const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const app = express();
const contactsRouter = require("./app/routes/contact.route");

app.use("/api/contacts", contactsRouter);
app.use(cors());
app.use(express.json());
//handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    return res.status( err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

app.use("/api/contacts", contactsRouter);

module.exports = app;
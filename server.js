const express = require("express");
const mongoose = require("mongoose");
const items = require("./Routes/API/items")
const users = require("./Routes/API/users")
const auth = require("./Routes/API/auth")
const path = require('path')
const app = express();
const config = require("config")
    //Body Parser
app.use(express.json());
//Mongo URI
const DB = config.get("mongoURI")
    //Connect to Mongo
mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log("Mongo DB connected")
    })
    .catch(err => {
        console.log(err)
    })
    //Use Routes for Items,Users
app.use("/api/items", items)
app.use("/api/users", users)
app.use("/api/auth", auth)
    //PORT(THE FORMER FOR THE heroko's hosting and the latter for the dev)
    //Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}
const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
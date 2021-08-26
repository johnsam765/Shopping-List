const express = require("express");
const mongoose = require("mongoose");
const items = require("./Routes/API/items")
const path = require('path')
const app = express();
//Body Parser
app.use(express.json());
//Mongo URI
const DB = require("./Config/keys").mongoURI;
//Connect to Mongo
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Mongo DB connected") })
    .catch(err => { console.log(err) })
    //Use Routes
app.use("/api/items", items)
    //PORT(THE FORMER FOR THE heroko's hosting and the latter for the dev)
    //Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}
const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Server started on port ${port}`); })
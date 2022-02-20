import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import usersRoutes from "./routes/users.js";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.get("/intro", (req, res) => res.send("<h1>get request on /transaction/date return all the transacton on that date</h1> <h1>get request on /balance/Date return balance amount remainign at the end of day</h1> <h1>get request on /details/:ID return all transaction details of particular ID</h1> <h1>Post request on /add allow to add additional transaction data with apropriate fields</h1>"));
app.use("/", usersRoutes);
app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));



app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));

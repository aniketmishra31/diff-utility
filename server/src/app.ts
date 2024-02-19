import express from "express";
import cors from "cors";
import diffRouter from "./route/diffRouter";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({
    // Add the "Content-Type" header to CORS headers
    exposedHeaders: ["Content-Type"],
}));

app.use(express.json());
app.use("/", diffRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log("Server started at port 8080");
});
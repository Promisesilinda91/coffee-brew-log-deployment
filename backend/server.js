import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
let brews = [];
app.get("/brews", (req,res)=>res.json(brews));
app.post("/brews", (req,res)=>{const b={id:Date.now(),...req.body}; brews.push(b); res.json(b)});
app.listen(3000);
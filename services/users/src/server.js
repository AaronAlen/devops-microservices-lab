import express from "express";
const app = express();
app.use(express.json());
const port = Number(process.env.PORT || 3001);

app.get("/health", (_req,res)=>res.json({service:"users",status:"ok"}));
app.get("/api/users", (_req,res)=>res.json([{id:1,name:"Demo User"}]));

app.listen(port, "0.0.0.0", ()=>console.log(`users-service listening on ${port}`));

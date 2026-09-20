import express from "express";
const app = express();
app.use(express.json());
const port = Number(process.env.PORT || 3002);

app.get("/health", (_req,res)=>res.json({service:"orders",status:"ok"}));
app.get("/api/orders", (_req,res)=>res.json([{id:101,status:"created"}]));

app.listen(port, "0.0.0.0", ()=>console.log(`orders-service listening on ${port}`));

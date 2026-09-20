import express from "express";
const app = express();
app.use(express.json());
const port = Number(process.env.PORT || 3003);

app.get("/health", (_req,res)=>res.json({service:"inventory",status:"ok"}));
app.get("/api/inventory", (_req,res)=>res.json([{sku:"SKU-001",stock:25}]));

app.listen(port, "0.0.0.0", ()=>console.log(`inventory-service listening on ${port}`));

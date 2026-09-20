import express from "express";
const app = express();
const port = Number(process.env.PORT || 8080);

const targets = {
  users: process.env.USERS_URL || "http://localhost:3001",
  orders: process.env.ORDERS_URL || "http://localhost:3002",
  inventory: process.env.INVENTORY_URL || "http://localhost:3003"
};

app.get("/health", (_req,res)=>res.json({service:"gateway",status:"ok"}));

async function proxy(path, target, res) {
  try {
    const response = await fetch(`${target}${path}`);
    const body = await response.text();
    res.status(response.status).type(response.headers.get("content-type") || "application/json").send(body);
  } catch {
    res.status(502).json({error:"upstream service unavailable"});
  }
}

app.get("/api/users", (_req,res)=>proxy("/api/users", targets.users, res));
app.get("/api/orders", (_req,res)=>proxy("/api/orders", targets.orders, res));
app.get("/api/inventory", (_req,res)=>proxy("/api/inventory", targets.inventory, res));

app.listen(port, "0.0.0.0", ()=>console.log(`gateway listening on ${port}`));

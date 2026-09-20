import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 5 },
    { duration: "90s", target: 30 },
    { duration: "90s", target: 60 },
    { duration: "30s", target: 0 }
  ]
};

export default function () {
  const base = __ENV.BASE_URL || "http://localhost:8080";

  // 1. Gateway Health Check
  const resHealth = http.get(`${base}/health`);
  check(resHealth, { "Gateway Health is 200": (r) => r.status === 200 });

  // 2. Users Service API
  const resUsers = http.get(`${base}/api/users`);
  check(resUsers, { "Users API is 200": (r) => r.status === 200 });

  // 3. Orders Service API
  const resOrders = http.get(`${base}/api/orders`);
  check(resOrders, { "Orders API is 200": (r) => r.status === 200 });

  // 4. Inventory Service API
  const resInventory = http.get(`${base}/api/inventory`);
  check(resInventory, { "Inventory API is 200": (r) => r.status === 200 });

  // Print live responses to terminal cleanly
  if (__ITER % 5 === 0) {
    console.log(
      `\n--- [LIVE API RESPONSES | VU: ${__VU} | Iteration: ${__ITER}] ---\n` +
      `🟢 Gateway   : ${resHealth.body ? resHealth.body.trim() : ""}\n` +
      `🟢 Users     : ${resUsers.body ? resUsers.body.trim() : ""}\n` +
      `🟢 Orders    : ${resOrders.body ? resOrders.body.trim() : ""}\n` +
      `🟢 Inventory : ${resInventory.body ? resInventory.body.trim() : ""}`
    );
  }

  sleep(0.3);
}

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
  const res = http.get(`${base}/api/orders`);
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(0.2);
}

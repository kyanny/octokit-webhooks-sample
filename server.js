// install with: npm install @octokit/webhooks
import { Webhooks, createNodeMiddleware } from "@octokit/webhooks";
import { createServer } from "node:http";

const webhooks = new Webhooks({
    secret: "mysecret",
});

webhooks.onAny(({ id, name, payload }) => {
  console.log(name, "event received");
});

webhooks.onError(({ id, name, error }) => {
  console.error(name, error.message);
});

createServer(createNodeMiddleware(webhooks)).listen(3000);
// can now receive webhook events at /api/github/webhooks
console.log("Listening on http://localhost:3000/api/github/webhooks");

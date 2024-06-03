import express from "express";
import { Webhooks, createNodeMiddleware } from "@octokit/webhooks";

const expressApp = express();
const webhooks = new Webhooks({
    secret: "mysecret",
});

webhooks.onAny(({ id, name, payload }) => {
  console.log(name, "event received");
});

webhooks.onError(({ id, name, error }) => {
  console.error(name, error.message);
});

expressApp.use(createNodeMiddleware(webhooks));

expressApp.listen(3000, () => {
  console.log(`Listening on http://localhost:3000/api/github/webhooks`);
});

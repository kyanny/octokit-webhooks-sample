# octokit webhook sample app

Working sample nodejs application implementations of [octokit.js](https://github.com/octokit/octokit.js) ([octokit/webhooks.js](https://github.com/octokit/webhooks.js)) for a demo.

- [server.js](https://github.com/kyanny/octokit-webhooks-sample/blob/main/server.js) for a standalone `@octokit/webhooks` app implementation
- [express-server.js](https://github.com/kyanny/octokit-webhooks-sample/blob/main/express-server.js) for [expressjs](https://expressjs.com/) app implementation

## Setup

```
npm install
npm run server
# or
# npm run express-server
```

Webhook server listens on `http://localhost:3000/api/github/webhooks`.

## Proxying webhook deliveries with smee.io

```
❯ npx smee --path /api/github/webhooks
Forwarding https://smee.io/cy6ZJeF2F2q3JS to http://127.0.0.1:3000/api/github/webhooks
Connected https://smee.io/cy6ZJeF2F2q3JS
```

Or you can create a new channel via https://smee.io/new or manually from https://smee.io/.

```
❯ npx smee --path /api/github/webhooks --url https://smee.io/B8GACQU4Yxig7Q
Forwarding https://smee.io/B8GACQU4Yxig7Q to http://127.0.0.1:3000/api/github/webhooks
Connected https://smee.io/B8GACQU4Yxig7Q
```

At this point, smee client is ready to proxy webhook deliveries.

[Create a webhook on GitHub.com](https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks).

- Payload URL should be `https://smee.io/B8GACQU4Yxig7Q` or whatever channel URL smee.io issues
- Content type **MUST BE** `application/json`
- Secret **MUST BE** equal to a secret hard-coded in `server.js` / `express-server.js`

At this point, smee client starts proxying webhook deliveries.

Based on your activities on GitHub.com, webhook events are sent to smee.io and smee client will proxy it to local webhook server. You will see logs like followings.

From smee client:

```
POST http://127.0.0.1:3000/api/github/webhooks - 200
```

From webhook server:

```
issues event received
```

Note that in this demo I reopened a closed issue on a repo, so that `issues` event was sent.

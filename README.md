# valt-demo-app

Tiny Express service used to dogfood [Valt](https://usevalt.io). On
purpose:

- **`lodash@4.17.10`** — has known prototype-pollution + ReDoS CVEs the
  SCA scanner should flag.
- **`express@4.17.1`** — old; SCA should flag at least one CVE.
- **`stripe`** SDK + `STRIPE_*` env vars in `.env.example` so detection
  + Stripe twin spin-up exercise.
- **`pg`** + `DATABASE_URL` so the Postgres sidecar fires.
- **`Dockerfile`** + `/api/health` route for Valt's deploy + healthcheck
  step.

## Local

```bash
npm install
cp .env.example .env
node src/server.js
```

## Valt scanning

Add the `valt` workflow at `.github/workflows/valt.yml` after registering
the GitHub App and getting an org API key from the Valt dashboard.

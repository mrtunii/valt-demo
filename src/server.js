/* eslint-disable */
const express = require('express');
const Stripe = require('stripe');
const _ = require('lodash');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16',
  // Hint to Stripe SDK: when STRIPE_API_URL is set (Valt twin), use it.
  host: process.env.STRIPE_API_URL ? new URL(process.env.STRIPE_API_URL).hostname : 'api.stripe.com',
  protocol: process.env.STRIPE_API_URL?.startsWith('http://') ? 'http' : 'https',
  port: process.env.STRIPE_API_URL ? new URL(process.env.STRIPE_API_URL).port : 443,
});

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'valt-demo-app' });
});

app.get('/', (_req, res) => {
  res.send('<h1>Valt demo app</h1><p>Try /api/health or /api/charge.</p>');
});

app.post('/api/charge', async (req, res) => {
  // Intentionally uses lodash so the SCA scanner picks up the vuln.
  const amount = _.get(req.body, 'amount', 999);
  try {
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      confirm: true,
    });
    res.json(intent);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`valt-demo-app listening on :${port}`);
});
// trigger valt scan 1776394634
// retrigger 1776394999
// retrigger 1776395127
// retrigger 1776395222

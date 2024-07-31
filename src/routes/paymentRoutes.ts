import express from 'express';

const routerPayments = express.Router();

routerPayments
  .get('/payment', (_req, res) => {
    res.send('Return all payments');
  })
  .post('/payment', (_req, res) => {
    res.send('Create a new payment');
  })

  .get('/interest', (_req, res) => {
    res.send('Calculate interest');
  })

export { routerPayments };
import express from 'express';

const routerUser = express.Router();

routerUser
  .get('/login', (_req, res) => {
    res.send(`Welcome`)
  })
  .get('/logout', (_req, res) => {
    res.send(`You have been logged out`)
  })

  .get('/clients', (_req, res) => {
    res.send(`return all clients`)
  })

  .get('/client:term', (_req, res) => {
    res.send(`return one client`)
  })
  .post('/create', (_req, res) => {
    res.send(`Create a new inserted item`)
  })


export { routerUser };



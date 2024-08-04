import express from 'express';
import {
  createNewClient,
  // deleteUser,
  getAllClients,
  // getClientById,
  // updateClient
} from '../controllers/clientController';

const routerClient = express.Router();

routerClient
  .get('/login', (_req, res) => {
    res.send(`Welcome`)
  })
  .get('/logout', (_req, res) => {
    res.send(`You have been logged out`)
  })

  .get('/clients', getAllClients)

  .get('/client:term', (_req, res) => {
    res.send(`return one client`)
  })
  .post('/create', createNewClient)


export { routerClient };



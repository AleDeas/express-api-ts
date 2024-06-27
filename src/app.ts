import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import bodyParser from 'body-parser';
import sequelize from './database';
import Table from './models/table';
import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import Customer from './models/customer';
import Reservation from './models/reservation';

require('dotenv').config();

const app: Application = express();
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

// CRUD Tavoli
app.get('/tables', async (req: Request, res: Response) => {
  const tables = await Table.findAll();
  res.json(tables);
});

app.post('/tables', async (req: Request, res: Response) => {
  const table = await Table.create(req.body);
  res.json(table);
});

app.put('/tables/:id', async (req: Request, res: Response) => {
  const table = await Table.findByPk(req.params.id);
  if (table) {
    await table.update(req.body);
    res.json(table);
  } else {
    res.status(404).send('Table not found');
  }
});

app.delete('/tables/:id', async (req: Request, res: Response) => {
  const table = await Table.findByPk(req.params.id);
  if (table) {
    await table.destroy();
    res.send('Table deleted');
  } else {
    res.status(404).send('Table not found');
  }
});

// CRUD Prenotazioni
app.get('/reservations', async (req: Request, res: Response) => {
  const reservations = await Reservation.findAll();
  res.json(reservations);
});

app.post('/reservations', async (req: Request, res: Response) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

app.put('/reservations/:id', async (req: Request, res: Response) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (reservation) {
    await reservation.update(req.body);
    res.json(reservation);
  } else {
    res.status(404).send('Reservation not found');
  }
});

app.delete('/reservations/:id', async (req: Request, res: Response) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (reservation) {
    await reservation.destroy();
    res.send('Reservation deleted');
  } else {
    res.status(404).send('Reservation not found');
  }
});

// CRUD Clienti
app.get('/customers', async (req: Request, res: Response) => {
  const customers = await Customer.findAll();
  res.json(customers);
});

app.post('/customers', async (req: Request, res: Response) => {
  try {
    const customer = await Customer.create(req.body);
    res.json(customer);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

app.put('/customers/:id', async (req: Request, res: Response) => {
  const customer = await Customer.findByPk(req.params.id);
  if (customer) {
    await customer.update(req.body);
    res.json(customer);
  } else {
    res.status(404).send('Customer not found');
  }
});

app.delete('/customers/:id', async (req: Request, res: Response) => {
  const customer = await Customer.findByPk(req.params.id);
  if (customer) {
    await customer.destroy();
    res.send('Customer deleted');
  } else {
    res.status(404).send('Customer not found');
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`Server is running on port ${PORT}`);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;

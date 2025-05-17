import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import v1Router from './src/routers/root.js';

const app = express();

const serviceID = process.env.SERVICE_ID;
app.use(cors());
app.use(express.json());

app.use('/api/v1/contact', v1Router);
app.use('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Email Service API',
    serviceID: serviceID,
  });
});


const port = process.env.EMAIL_SERVICE_PORT || 49152;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port http://localhost:${port}/`);
});

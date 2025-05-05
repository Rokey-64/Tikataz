import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import v1Router from './src/routers/root.js';

const app = express();

const serviceID = process.env.SERVICE_ID;
app.use(cors());
app.use(express.json());

app.use('/api/v1/contact', v1Router);

const port = process.env.EMAIL_SERVICE_PORT || 5052;
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}/`);
});

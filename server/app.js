import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './config/connection.js';

import dashboardRoutes from './routes/dashboardRoutes.js';
import surveyRoutes from './routes/surveyRoutes.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT; 

app.use(cors());
app.use(express.json());

console.log('Setting up the routes...');
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/surveys', surveyRoutes);
console.log('Routes configured');


connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Database connection failed', error);
    process.exit(1);
  });
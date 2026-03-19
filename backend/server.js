import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js'
import { errorHandler } from './middleware/middleware.js';

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());

app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
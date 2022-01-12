import express from 'express';
import saveEmployeeDetails from './employee';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log('req.originalUrl :>> ', req.originalUrl);
  next();
});
app.get('/', (req, res) => {
  res.json(process.uptime());
});

app.get('/empDetails/:id', async (req, res) => {
  try {
    const { id = null } = req.params;
    const { error, data } = await saveEmployeeDetails(id);
    if (error) throw error;
    return res.send({ data });
  } catch (error) {
    const message = error.message || error.toString();
    const { status = 500 } = error;
    return res.status(status).send({ status, message });
  }
});

export default app;

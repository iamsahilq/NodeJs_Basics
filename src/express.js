import express from 'express';
import saveEmployeeDetails from './assignments/employee';
import salesTaxRoute from './routes/salesTaxRoute';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('req.originalUrl :>> ', req.originalUrl);
  next();
});
app.get('/', (req, res) => {
  res.json(process.uptime());
});

app.get('/empDetails/:id', async (req, res, next) => {
  try {
    const { id = null } = req.params;
    const { data } = await saveEmployeeDetails(id);
    return res.send({ data });
  } catch (error) {
    return next(error);
  }
});

app.use('/salesTax', salesTaxRoute);

// Some error
app.use((req, res, next) => {
  const error = new Error('404 NOT FOUND');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (error.isAxiosError) {
    console.log('Axios error :>> ', error.toJSON());
    const message = error.response.data?.message || error?.statusText || error.toString();
    const status = error.response.status || 500;
    return res.status(status).send({ status, message });
  }
  console.log('error :>> ', error);
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});

export default app;

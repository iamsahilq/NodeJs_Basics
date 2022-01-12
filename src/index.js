// import server from './server';

// const port = 3000;
// server.listen(port);
// console.log(`http://localhost:${port}/`);

// import saveEmployeeDetails from './employee';

// const id = '1';

// saveEmployeeDetails(id);

// Server

import dotenv from 'dotenv';

import app from './express';

dotenv.config();

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

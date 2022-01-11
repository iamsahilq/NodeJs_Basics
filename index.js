import http from 'http';

const port = 3000;
const server = http.createServer((req, res) => {
  res.end('Hello World');
}).listen(port);
console.log(`http://localhost:${port}/`);
export default server;

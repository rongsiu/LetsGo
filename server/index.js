const app = require('./server.js');

const port = 3005;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
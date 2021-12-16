const app = require('./server');

const PORT = 3000;
app.listen(PORT, () => console.log(`Sever listening at http://localhost:${PORT}`));
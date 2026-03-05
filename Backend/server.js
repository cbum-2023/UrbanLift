const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

console.log(process.env.JWT_SECRET);  //just for testing

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
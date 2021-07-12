import dotenv from 'dotenv';
import express from 'express';
import MainRouter from './routers/MainRouter';
import errorMiddleware from './middleware/ErrorMiddleware'

// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
  public app = express();
  public router = MainRouter;
}

// initialize server app
const server = new Server();

server.app.use('/api', server.router);

// make server app handle any error
server.app.use(errorMiddleware);

// make server listen on some port
((port = process.env.APP_PORT || 5000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();
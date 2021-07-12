import dotenv from 'dotenv';
import express from 'express';
import MainRouter from './routers/MainRouter';
import errorMiddleware from './middleware/ErrorMiddleware'
import { Sequelize } from "sequelize"

// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

/**
 * Express server application class.
 */
class Server {
  public app = express();
  public router = MainRouter;
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});

// initialize server app
const server = new Server();

server.app.use('/api', server.router);

// make server app handle any error
server.app.use(errorMiddleware);

// make server listen on some port
const port = process.env.APP_PORT || 5000; 
server.app.listen(port, () => console.log(`> Listening on port ${port}`));
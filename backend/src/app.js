import dotenv from 'dotenv';
import express from 'express';
import MainRouter from './routers/MainRouter.js';
import errorMiddleware from './middleware/ErrorMiddleware.js'
import models from "./models/index.cjs";

// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

const app = express();
( async () => await models.sequelize.sync())()

app.use('/api', MainRouter);

// make server app handle any error
app.use(errorMiddleware);

// make server listen on some port
const port = process.env.APP_PORT || 5000; 
app.listen(port, () => console.log(`> Listening on port ${port}`));
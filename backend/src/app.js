import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express'
import MainRouter from './routers/MainRouter.js';
import errorMiddleware from './middleware/ErrorMiddleware.js'
import models from "./models/index.js";

// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

const port = process.env.APP_PORT || 3000; 

const app = express();
await models.sequelize.sync()

app.use(express.json())
app.use('/api', MainRouter);

// Docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, {
  swaggerOptions: {
    url: '/api/openapi.json'
  }
}));
app.use('/', (req, res, next)=>{
  if (req.url === '/'){
    res.redirect('/docs')
  } else {
    next()
  }
})

// make server app handle any error
app.use(errorMiddleware);

// make server listen on some port
app.listen(port, () => console.log(`> Listening on port ${port}`));
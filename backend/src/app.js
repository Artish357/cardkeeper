import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express'
import MainRouter from './routers/MainRouter.js';
import errorMiddleware from './middleware/ErrorMiddleware.js'
import models from "./models/index.js";
import YAML from 'yamljs'

// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

const port = process.env.APP_PORT || 5000; 
const swaggerDocument = YAML.load('./src/swagger.yaml');
//swaggerDocument.servers[0].url=`http://localhost:${port}/api`

const app = express();
( async () => await models.sequelize.sync())()

app.use(express.json())
app.use('/api', MainRouter);

// Docs
app.use('/docs', function(req, res, next){
  swaggerDocument.servers[0] = {url: `http://${req.get('host')}/api`};
  req.swaggerDoc = swaggerDocument;
  next();
}, swaggerUi.serve, swaggerUi.setup());
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
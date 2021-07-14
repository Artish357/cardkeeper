import { readdirSync } from 'fs';
import { basename as _basename, join, dirname } from 'path';
import Sequelize from 'sequelize';
import fs from "fs";
const basename = dirname(import.meta.url).slice(7);
const env = process.env.NODE_ENV || 'development';
const { [env]: config } = JSON.parse(fs.readFileSync('config/config.json'));
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const promises = readdirSync(basename)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== _basename(import.meta.url)) && (file.slice(-3) === '.js');
  })
  .map(file => {
    return import(join(basename, file)).then(modelFn => {
      const model = modelFn.default(sequelize, Sequelize.DataTypes);
      db[model.name] = model
    })
  });
await Promise.all(promises) //eslint-disable-line
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

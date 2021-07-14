'use strict'
import sequelize from 'sequelize';
const { Model } = sequelize

export default function (sequelize, DataTypes) {
  class MonsterThreat extends Model {
    static associate({Mystery, MonsterThreat}) { //eslint-disable-line
      Mystery.hasMany(MonsterThreat),
      MonsterThreat.belongsTo(Mystery)
    }
  }
  MonsterThreat.init({
    name: {type: DataTypes.STRING, defaultValue: ""},
    type: {type: DataTypes.STRING, defaultValue: "Monster"},
    subtype: {type: DataTypes.STRING, defaultValue: ""},
    motivation: {type: DataTypes.STRING, defaultValue: ""},
    powers: {type: DataTypes.TEXT, defaultValue: ""},
    weaknesses: {type: DataTypes.TEXT, defaultValue: ""},
    attacks: {type: DataTypes.TEXT, defaultValue: ""},
    armour: {type: DataTypes.STRING, defaultValue: ""},
    harm: {type: DataTypes.INTEGER, defaultValue: 0},
    harmCap: {type: DataTypes.INTEGER, defaultValue: 10}
  },
  {
    sequelize,
    modelName: 'MonsterThreat'
  })
  return MonsterThreat
}
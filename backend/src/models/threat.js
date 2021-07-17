'use strict'
import sequelize from 'sequelize';
const { Model } = sequelize

export default function (sequelize, DataTypes) {
  class Threat extends Model {
    static associate({Mystery, Threat}) { //eslint-disable-line
      Mystery.hasMany(Threat, {
        as: 'threats'
      }),
      Threat.belongsTo(Mystery, {'as': 'foo'})
    }
  }
  Threat.init({
    name: {type: DataTypes.STRING, defaultValue: ""},
    type: {type: DataTypes.STRING, defaultValue: "Monster"},
    subtype: {type: DataTypes.STRING, defaultValue: ""},
    motivation: {type: DataTypes.STRING, defaultValue: ""},
    isMonster: {type: DataTypes.BOOLEAN, defaultValue: true},
    powers: {type: DataTypes.TEXT, defaultValue: ""},
    weaknesses: {type: DataTypes.TEXT, defaultValue: ""},
    attacks: {type: DataTypes.TEXT, defaultValue: ""},
    armour: {type: DataTypes.STRING, defaultValue: ""},
    harm: {type: DataTypes.INTEGER, defaultValue: 0},
    harmCap: {type: DataTypes.INTEGER, defaultValue: 10}
  },
  {
    sequelize,
    modelName: 'Threat'
  })
  return Threat
}
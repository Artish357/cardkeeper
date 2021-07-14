'use strict';
const {
  Model
} = require('sequelize');
let ServerError = null;
import('../ServerError.js').then((se) => {
  ServerError = se.default;
})

const phases = ["day", "shadows", "sunset", "dusk", "nightfall", "midnight"]
module.exports = (sequelize, DataTypes) => {
  class Mystery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { //eslint-disable-line
      // define association here
    }


    toJSON() {
      const json = super.toJSON()
      for (const phase of phases) {
        delete json["countdown_" + phase]
      }
      return json
    }
  }
  Mystery.init({
    concept: { type: DataTypes.TEXT, defaultValue: "" },
    hook: { type: DataTypes.TEXT, defaultValue: "" },
    countdown_day: { type: DataTypes.STRING, defaultValue: "" },
    countdown_shadows: { type: DataTypes.STRING, defaultValue: "" },
    countdown_sunset: { type: DataTypes.STRING, defaultValue: "" },
    countdown_dusk: { type: DataTypes.STRING, defaultValue: "" },
    countdown_nightfall: { type: DataTypes.STRING, defaultValue: "" },
    countdown_midnight: { type: DataTypes.STRING, defaultValue: "" },
    notes: { type: DataTypes.TEXT, defaultValue: "" },
    countdown: {
      type: DataTypes.VIRTUAL,
      get() {
        const countdown = phases.reduce(
          (obj, phase) => Object.assign(obj, { [phase]: this.getDataValue("countdown_" + phase) }),
          {}
        )
        return countdown
      },
      set(value) {
        phases.forEach((phase) => {
          if (!(phase in value)) {
            throw new ServerError(500, "Bad countdown received")
          }
        })
        for (const phase of phases) {
          this.setDataValue('countdown_' + phase, value[phase])
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Mystery',
  })
  return Mystery;
};
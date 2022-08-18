"use strict";
const { Model } = require("sequelize");

class Status extends Model {
  static associate(models) {
    // Status.belongsTo(models.User)
    Status.hasMany(models.User);
    Status.hasMany(models.Card);
    Status.hasMany(models.Deck);
    Status.hasMany(models.StarsPack);
    Status.hasMany(models.CardPacks);
    Status.hasMany(models.Opinion);
  }
}

module.exports = (sequelize, DataTypes) => {
  Status.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "active",
        validate: {
          customValidator: (value) => {
            const enums = ["active", "inactive"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Status",
    }
  );
  return Status;
};

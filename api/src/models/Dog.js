const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING,
    },
    minHeight: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 100 },
      allowNull: false,
    },
    maxHeight: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 100 },
      allowNull: false,
    },
    minWeight: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 100 },
      allowNull: false,
    },
    maxWeight: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 100 },
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false,
  }
  );
};

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dogs', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    minHeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxHeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxWeight: {
      type: DataTypes.INTEGER,
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

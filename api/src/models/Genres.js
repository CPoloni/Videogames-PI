const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Genres",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.ENUM(
          "Action",
          "Strategy",
          "Role playing game",
          "Shooter",
          "Adventure",
          "Puzzle",
          "Careers",
          "Sports"
        ),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

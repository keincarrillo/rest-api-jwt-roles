import sequelize from '../db/database.js'
import { DataTypes } from 'sequelize'

const Product = sequelize.define(
  'product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imgURL: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
)

export default Product

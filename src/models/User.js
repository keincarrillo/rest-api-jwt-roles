import sequelize from '../db/database.js'
import { DataTypes } from 'sequelize'

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true
  }
)

export default User

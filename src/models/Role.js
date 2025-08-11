import sequelize from '../db/database.js'
import { DataTypes } from 'sequelize'

const Role = sequelize.define(
  'role',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

export default Role

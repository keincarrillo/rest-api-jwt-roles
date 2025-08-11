import sequelize from '../db/database.js'
import { DataTypes } from 'sequelize'
import User from './User'

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

// Establece la relacion de muchos a muchos
Role.belongsToMany(User, { through: 'user_roles' }) // 'user_roles' sera el nombre de la tabla intermedia

export default Role
